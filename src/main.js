import Phaser from 'phaser';
import FlappyBird from './FlappyBird';
import MainMenu from './MainMenu';
import SingleButtonScene from './SingleButtonScene';
import SecondaryMenu from './SecondaryMenu';

const config = {
    type: Phaser.AUTO,
    width: Math.min(window.innerWidth, 1080),
    height: Math.max(window.innerHeight, 1600),
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [SingleButtonScene,MainMenu, FlappyBird, SecondaryMenu]
};

const game = new Phaser.Game(config);