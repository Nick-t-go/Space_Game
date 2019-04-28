import {
  ScreenConfig,
} from '../classes/util/screenConfig';

import {
  Bar,
} from '../classes/components/bar';

class SceneLoad extends Phaser.Scene {
  constructor() {
    super('SceneLoader');
  }

  preload() {
    this.bar = new Bar({
      scene: this,
      x: ScreenConfig.width() / 2,
      y: ScreenConfig.height() / 2,
    });

    this.progText = this.add.text(ScreenConfig.width() / 2, ScreenConfig.height() / 2, '0%', {
      color: '#ffffff',
      fontSize: ScreenConfig.width() / 20,
    });
    this.progText.setOrigin(0.5, 0.5);
    this.load.on('progress', this.onProgress, this);
    this.load.image('ship', 'assets/player.png');
    this.load.image('eship', 'assets/eship.png');
    this.load.image('background', 'assets/background.jpg');
    this.load.spritesheet('rocks', '/assets/rocks.png', { frameWidth: 125, frameHeight: 100 });
    this.load.spritesheet('exp', '/assets/exp.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('ebullet', 'assets/ebullet.png');
    this.load.image('button1', 'assets/ui/buttons/2/1.png');
    this.load.image('button2', 'assets/ui/buttons/2/5.png');
    this.load.audio('cat', ['assets/audio/meow.mp3', 'assets/audio/meow.ogg']);
    this.load.audio('backgroundMusic', ['assets/audio/background.mp3', 'assets/audio/background.ogg']);
    this.load.image('toggleBack', 'assets/ui/toggles/1.png');
    this.load.image('sfxOff', 'assets/ui/icons/sfx_off.png');
    this.load.image('sfxOn', 'assets/ui/icons/sfx_on.png');
    this.load.image('musicOn', 'assets/ui/icons/music_on.png');
    this.load.image('musicOff', 'assets/ui/icons/music_off.png');
  }

  onProgress(value) {
    const per = Math.floor(value * 100);
    this.progText.setText(`${per}%`);
    this.bar.setPercent(value);
  }

  create() {
    this.scene.start('SceneTitle');
  }
}

export {
  SceneLoad,
}