import Phaser from 'phaser';

class SecondaryMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'SecondaryMenu' });
    }

    preload() {
        this.load.image('backgroundImage', 'assets/100.png');
        this.load.image('playButton', 'assets/wantplay.png');
        this.load.image('retryButton', 'assets/lazy.png'); // Загружаем изображение для кнопки "Retry"
    }

    create() {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        // Добавляем фон
        this.add.image(screenWidth / 2, screenHeight / 2, 'backgroundImage');

        // Создаем кнопку "Play"
        const playButton = this.add.image(screenWidth / 2, screenHeight - 195, 'playButton')
            .setInteractive({ useHandCursor: true }); // Курсор "рука"

        // Обработчик кликов на кнопку "Play"
        playButton.on('pointerdown', () => {
            console.log('Play Button clicked');
            this.scene.start('FlappyBird'); // Переключаемся на сцену FlappyBird
        });

        // Создаем кнопку "Retry"
        const retryButton = this.add.image(screenWidth / 2 - 10, screenHeight - 470, 'retryButton') // Размещаем кнопку "Retry" выше
            .setInteractive({ useHandCursor: true }); // Курсор "рука"

        // Обработчик кликов на кнопку "Retry"
        retryButton.on('pointerdown', () => {
            console.log('Retry Button clicked');
            window.open('https://t.me/@ggersirius55', '_blank'); // Открываем ссылку на Telegram в новой вкладке
        });

        // Для отладки визуализируем область кнопки "Play" (необязательно)
        this.add.rectangle(
            playButton.x, 
            playButton.y, 
            playButton.displayWidth, 
            playButton.displayHeight, 
            0xff0000, 
            0 // Прозрачность
        ).setOrigin(0.5, 0.5); // Центрируем прямоугольник по кнопке "Play"

        // Для отладки визуализируем область кнопки "Retry" (необязательно)
        this.add.rectangle(
            retryButton.x, 
            retryButton.y, 
            retryButton.displayWidth, 
            retryButton.displayHeight, 
            0x00ff00, 
            0 // Прозрачность
        ).setOrigin(0.5, 0.5); // Центрируем прямоугольник по кнопке "Retry"
    }
}

export default SecondaryMenu;