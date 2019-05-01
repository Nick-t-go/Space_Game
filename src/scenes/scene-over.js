import {
  AlignGrid,
} from '../classes/util/alignGrid';
import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  Align,
} from '../classes/util/align';
import {
  FlatButton,
} from '../classes/ui/flatButton';


class SceneOver extends Phaser.Scene {
  constructor() {
    super('SceneOver');
  }

  init(data) {
    this.playerWon = data.playerWon ? 'ship' : 'eship';
  }

  preload() {
    this.load.image('title', 'assets/title.png');
    this.load.image('button1', 'assets/ui/buttons/2/1.png');
  }

  create() {
    const gridConfig = {
      rows: 11,
      cols: 11,
      scene: this,
    };

    this.emitter = new Phaser.Events.EventEmitter();

    this.alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    // this.alignGrid.showNumbers();

    const title = this.add.image(0, 0, 'title');
    const btnStart = new FlatButton({
      scene: this,
      key: 'button1',
      text: 'Play Again!',
      event: 'start_game',
      emitter: this.emitter,

    });

    Align.scaleToGameW(title, 0.8, ScreenConfig.width());
    this.alignGrid.placeAtIndex(16, title);
    this.alignGrid.placeAtIndex(93, btnStart);

    this.winnerText = this.add.text(0, 0, 'WINNER', {
      fontSize: ScreenConfig.width() / 10,
      color: '#3FE213',
    });
    this.winnerText.setOrigin(0.5, 0.5);
    this.winner = this.add.image(0, 0, this.playerWon);
    this.winner.angle = 270;
    this.alignGrid.placeAtIndex(71, this.winner);
    this.alignGrid.placeAtIndex(49, this.winnerText);

    this.emitter.on('start_game', this.startGame, this);
  }

  startGame() {
    this.scene.start('SceneMain');
  }
  // update() {

  // }
}

export {
  SceneOver
}