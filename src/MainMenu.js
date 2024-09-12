import Phaser from 'phaser';

class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('menuBackground', 'assets/examagain.png');
        this.load.image('startButton', 'assets/wantplay.png');
        this.load.image('againButton', 'assets/again.png'); // Загружаем изображение для кнопки "Again"
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Добавляем фон
        this.add.image(width / 2, height / 2, 'menuBackground');

        // Создаем кнопку "Start"
        const startButton = this.add.image(width / 2, height - 195, 'startButton')
            .setInteractive({ useHandCursor: true }); // Курсор "рука"

        // Обработчик кликов на кнопку "Start"
        startButton.on('pointerdown', () => {
            console.log('Start Button clicked');
            this.scene.start('FlappyBird'); // Переключаемся на сцену FlappyBird
        });

        // Создаем кнопку "Again"
        const againButton = this.add.image(width / 2-10, height - 470, 'againButton') // Размещаем кнопку "Again" ниже кнопки "Start"
            .setInteractive({ useHandCursor: true }); // Курсор "рука"

        // Обработчик кликов на кнопку "Again"
        againButton.on('pointerdown', () => {
            console.log('Again Button clicked');
            this.scene.start('FlappyBird'); // Переключаемся на сцену FlappyBird
        });

        // Для отладки визуализируем область кнопки "Start" (необязательно)
        this.add.rectangle(
            startButton.x, 
            startButton.y, 
            startButton.displayWidth, 
            startButton.displayHeight, 
            0xff0000, 
            0 // Прозрачность
        ).setOrigin(0.5, 0.5); // Центрируем прямоугольник по кнопке "Start"

        // Для отладки визуализируем область кнопки "Again" (необязательно)
        this.add.rectangle(
            againButton.x, 
            againButton.y, 
            againButton.displayWidth, 
            againButton.displayHeight, 
            0x00ff00, 
            0 // Прозрачность
        ).setOrigin(0.5, 0.5); // Центрируем прямоугольник по кнопке "Again"
    }
}

export default MainMenu;