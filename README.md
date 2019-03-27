# phaser3-webpack4-template
A template for a Phaser 3 build using Webpack 4.

This was created following this tutorial:
https://snowbillr.github.io/blog/2018-04-09-a-modern-web-development-setup-for-phaser-3/#putting-it-all-together

In the above article the example is done in Webpack 3(WP3). This one attempts to use the newer version, Webpack 4(WP4). There are few setup differences. WP3 used `CommonsChunkPlugin` for seperating concerns(chunks) and WP4 uses `optimization.splitChunks`.

Instructions on giving it a whirl:
1) `yarn install`
2) `yarn webpack-dev-server`
3) `Open up your browser to http://localhost:8080`

# Support Tools & Classes for Game Dev


| Helper Class | README |
| ------ | ------ |
| Bar | [src/classes/components/bar.md](src/classes/components/bar.md]) |
| Scorebox | [src/classes/components/scoreBox.md](src/classes/components/scoreBox.md) |
| Controller | [src/classes/mc/controller.md](src/classes/mc/controller.md) |
| Model | [src/classes/mc/model.md](src/classes/mc/model.md) |
| Flat Button | [src/classes/ui/flatbutton.md](src/classes/ui/flatbutton.md) |
| Sound Buttons | [src/classes/ui/soundButtons.md](src/classes/ui/soundButtons.md) |
| Toggle Button | [src/classes/ui/toggleButton.md](src/classes/ui/toggleButton.md) |
| Align | [src/classes/util/README.md](src/classes/util/README.md) |
| Align Grid | [src/classes/util/README.md](src/classes/util/README.md)  |
| Collision | [src/classes/util/README.md](src/classes/util/README.md)  |
| Media Manager | [src/classes/util/README.md](src/classes/util/README.md)  |
| Screen Config | [src/classes/util/README.md](src/classes/util/README.md)  |



### Todos

 - Write Tests
 - Complete documentation for helper classes (right now they are mostly blank)
 - Follow this [article](https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334) to setup Express dev/prod build options for WP4 


