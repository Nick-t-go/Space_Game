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


    this.emitter = new Phaser.Events.EventEmitter();
    this.G = new Constants();
    this.model = new Model(this.emitter, this.G);
    this.controller = new Controller(this.emitter, this.G, this.model);
    this.mediaManager = new MediaManager({
      scene: this,
      model: this.model,
    });

    this.centerX = ScreenConfig.width() / 2;
    this.centerY = ScreenConfig.height() / 2;
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.ship = this.physics.add.sprite(this.centerX, this.centerY, 'ship');
    this.eShip = this.physics.add.sprite(this.centerX + 220, this.centerY + 220, 'eship');
    this.eShip.body.collideWorldBounds = true;
    this.ship.body.collideWorldBounds = true;
    
    Align.scaleToGameW(this.ship, 0.125, ScreenConfig.width());
    Align.scaleToGameW(this.eShip, 0.25, ScreenConfig.width());

    this.background.scaleX = this.ship.scaleX;
    this.background.scaleY = this.ship.scaleY;
    this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    
    this.background.setInteractive();
    this.background.on('pointerup', this.backgroundClicked, this);
    this.background.on('pointerdown', this.onDown, this);

    this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.cameras.main.startFollow(this.ship, true);

    this.rockGroup = this.physics.add.group({
      key: 'rocks',
      frame: [0, 1, 2],
      frameQuantity: 4,
      bounceX: 1,
      bounceY: 1,
      angularVelocity: 1,
      collideWorldBounds: true,
    });
    this.bulletGroup = this.physics.add.group();
    this.eBulletGroup = this.physics.add.group();
    this.rockGroup.children.iterate((child) => {
      const xx = Math.floor(Math.random() * this.background.displayWidth);
      const yy = Math.floor(Math.random() * this.background.displayHeight);
      child.x = xx;
      child.y = yy;
      Align.scaleToGameW(child, 0.1, ScreenConfig.width());
      let vx = Math.floor(Math.random() * 2) - 1;
      let vy = Math.floor(Math.random() * 2) - 1;
      if (vx === 0 && vy === 0) {
        vx = vy = 1;
      }
      const speed = Math.floor(Math.random() * 200) - 10;
      child.body.setVelocity(vx * speed, vy * speed);
    });
    const frameNames = this.anims.generateFrameNumbers('exp');
    const f2 = frameNames.slice();
    f2.reverse();
    const f3 = f2.concat(frameNames);

    this.anims.create({
      key: 'boom',
      frames: f3,
      frameRate: 48,
      repeat: false,
    });
    this.makeInfo();
    this.setColliders();
  }

  setColliders() {
    this.physics.add.collider(this.rockGroup);
    this.physics.add.collider(this.bulletGroup, this.rockGroup, this.destroyRock, null, this);
    this.physics.add.collider(this.eBulletGroup, this.rockGroup, this.destroyRock, null, this);
    this.physics.add.collider(this.bulletGroup, this.eShip, this.damageEnemy, null, this);
    this.physics.add.collider(this.eBulletGroup, this.ship, this.damagePlayer, null, this);
  }

  makeInfo() {
    const textOptions = {
      align: 'center',
      backgroundColor: '#000000',
      fontSize: ScreenConfig.width() / 30,
    };
    this.text1 = this.add.text(0, 0, 'Shields\n100', textOptions);
    this.text2 = this.add.text(0, 0, 'EnemyShields\n100', textOptions);
    this.text1.setOrigin(0.5, 0.5);
    this.text2.setOrigin(0.5, 0.5);
    const gridConfig = {
      rows: 11,
      cols: 11,
      scene: this,
    };
    const alignGrid = new AlignGrid(
      gridConfig, {
        height: ScreenConfig.height(),
        width: ScreenConfig.width(),
      },
    );
    alignGrid.placeAtIndex(2, this.text1);
    alignGrid.placeAtIndex(9, this.text2);
    this.icon1 = this.add.image(0, 0, 'ship');
    this.icon2 = this.add.image(0, 0, 'eship');
    this.icon1.angle = 270;
    this.icon2.angle = 270;
    Align.scaleToGameW(this.icon1, 0.05, ScreenConfig.width());
    Align.scaleToGameW(this.icon2, 0.05, ScreenConfig.width());
    alignGrid.placeAtIndex(1, this.icon1);
    alignGrid.placeAtIndex(7, this.icon2);
    this.text1.setScrollFactor(0);
    this.text2.setScrollFactor(0);
    this.icon1.setScrollFactor(0);
    this.icon2.setScrollFactor(0);
  }

  destroyRock(bullet, rock) {
    bullet.destroy();
    const explosion = this.add.sprite(rock.x, rock.y, 'exp');
    explosion.play('boom');
    rock.destroy();
  }
  damageEnemy(ship, bullet) {
    const explosion = this.add.sprite(bullet.x, bullet.y, 'exp');
    explosion.play('boom');
    bullet.destroy();
  }

  damagePlayer(ship, bullet) {
    const explosion = this.add.sprite(this.ship.x, this.ship.y, 'exp');
    explosion.play('boom');
    bullet.destroy();
  }

  getTimer() {
    return new Date().getTime()
  }

  onDown() {
    this.downTime = this.getTimer();
  }

  backgroundClicked() {
    const elapsed = Math.abs(this.downTime - this.getTimer());
    if (elapsed < 300) {
      this.tx = this.background.input.localX;
      this.ty = this.background.input.localY;
      const radians = this.physics.moveTo(this.ship, this.tx, this.ty, 100);
      const angle = this.toDegrees(radians);
      this.ship.angle = angle;
    } else {
      this.makeBullet();
    }
    const eRadians = this.physics.moveTo(this.eShip, this.ship.x, this.ship.y, 60);
    const eAngle = this.toDegrees(eRadians);
    this.eShip.angle = eAngle;
  }

  makeBullet() {
    const dirObj = this.getDirFromAngle(this.ship.angle);
    const bullet = this.physics.add.sprite(
      this.ship.x - dirObj.tx * 30,
      this.ship.y - dirObj.ty * 30,
      'bullet',
    );
    this.bulletGroup.add(bullet);
    bullet.angle = this.ship.angle;
    bullet.body.setVelocity(dirObj.tx * 400, dirObj.ty * 400);
  }

  toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  getDirFromAngle(angle) {
    const rads = angle * Math.PI / 180;
    const tx = Math.cos(rads);
    const ty = Math.sin(rads);
    return {
      tx,
      ty,
    }
  }

  fireEBullet() {
    const elapsed = Math.abs(this.lastEBullet - this.getTimer());
    if (elapsed < 500) return;
    this.lastEBullet = this.getTimer();

    const eBullet = this.physics.add.sprite(this.eShip.x, this.eShip.y, 'ebullet');
    this.eBulletGroup.add(eBullet);
    eBullet.body.angularVelocity = 10;
    this.physics.moveTo(eBullet, this.ship.x, this.ship.y, 100);
    // bullet.angle = this.ship.angle;
    // bullet.body.setVelocity(dirObj.tx * 400, dirObj.ty * 400);
  }

  update() {
    const distX = Math.abs(this.ship.x - this.tx);
    const distY = Math.abs(this.ship.y - this.ty);
    if (distX < 10 && distY < 10) {
      this.ship.body.setVelocity(0, 0);
    }

    const eDistX = Math.abs(this.ship.x - this.eShip.x);
    const eDistY = Math.abs(this.ship.y - this.eShip.y);
    if (eDistX < ScreenConfig.width() / 5 && eDistY < ScreenConfig.height() / 5) {
      this.fireEBullet();
    }
  }

}

export {
  SimpleScene
};