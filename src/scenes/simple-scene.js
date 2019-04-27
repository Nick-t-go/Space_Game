import {
  ScreenConfig,
} from '../classes/util/screenConfig';
import {
  AlignGrid,
} from '../classes/util/alignGrid';
import {
  FlatButton,
} from '../classes/ui/flatButton';

import {
  Controller,
} from '../classes/mc/controller';

import {
  MediaManager,
} from '../classes/util/mediaManager';

import {
  Constants,
} from '../constants';

import {
  Model,
} from '../classes/mc/model';

import {
  SoundButtons,
} from '../classes/ui/soundButtons';

import {
  Align,
} from '../classes/util/align';

class SimpleScene extends Phaser.Scene {

  constructor() {
    super('SceneMain');
  }

  create() {
    this.add.text(100, 100, 'Hello Phaser!', {
      fill: '#0f0',
    });
    const gridConfig = {
      rows: 5,
      cols: 5,
      scene: this,
    };

    this.emitter = new Phaser.Events.EventEmitter();
    this.G = new Constants();
    this.model = new Model(this.emitter, this.G);
    this.controller = new Controller(this.emitter, this.G, this.model);
    this.mediaManager = new MediaManager({
      scene: this,
      model: this.model,
    });
    //this.mediaManager.setBackgroundMusic('backgroundMusic');

    const alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    alignGrid.showNumbers();
    this.sb = new SoundButtons(this, ScreenConfig.width());
    alignGrid.placeAtIndex(0, this.sb.musicToggle);
    alignGrid.placeAtIndex(4, this.sb.sfxToggle);

    this.centerX = ScreenConfig.width() / 2;
    this.centerY = ScreenConfig.height() / 2;
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.ship = this.physics.add.sprite(this.centerX, this.centerY, 'ship');
    Align.scaleToGameW(this.ship, 0.125, ScreenConfig.width());

    this.background.scaleX = this.ship.scaleX;
    this.background.scaleY = this.ship.scaleY;
    
    this.background.setInteractive();
    this.background.on('pointerdown', this.backgroundClicked, this);

    this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.cameras.main.startFollow(this.ship, true);
  }

  backgroundClicked() {
    this.tx = this.background.input.localX;
    this.ty = this.background.input.localY;
    const radians = this.physics.moveTo(this.ship, this.tx, this.ty, 60);
    const angle = this.toDegrees(radians);
    this.ship.angle = angle;
  }

  toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  update() {
    const distX = Math.abs(this.ship.x - this.tx);
    const distY = Math.abs(this.ship.y - this.ty);
    if (distX < 10 && distY < 10){
      this.ship.body.setVelocity(0, 0);
    }
  }

}

export {
  SimpleScene
};