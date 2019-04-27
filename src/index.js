import 'phaser';
import {
  ScreenConfig,
} from './classes/util/screenConfig';

import {
  SimpleScene,
} from './scenes/simple-scene';
import {
  SceneOver,
} from './scenes/scene-over';
import {
  SceneTitle,
} from './scenes/scene-title';
import {
  SceneLoad,
} from './scenes/scene-load';

const gameConfig = {
  width: ScreenConfig.width(),
  height: ScreenConfig.height(),
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: [SceneLoad, SceneTitle, SimpleScene, SceneOver],
};

new Phaser.Game(gameConfig);
