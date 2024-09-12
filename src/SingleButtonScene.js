import Phaser from 'phaser';

class SingleButtonScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SingleButtonScene' }); // Название новой сцены
    }

    preload() {
        this.load.image('Background', 'assets/BG_end_screen.png'); // Загрузка фона
        this.load.image('startButton', 'assets/wantplay.png'); // Загрузка изображения кнопки
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Добавляем фон
        this.add.image(width / 2, height / 2, 'Background');

        // Создаем кнопку по центру экрана
        const startButton = this.add.image(width / 2, height / 2, 'startButton')
            .setInteractive({ useHandCursor: true }); // Добавляем интерактивность

        // Обработчик клика по кнопке
        startButton.on('pointerdown', () => {
            console.log('Start Button clicked');
            this.scene.start('FlappyBird'); // Переключение на сцену FlappyBird
        });

        // Визуализация области кнопки для отладки (опционально)
        this.add.rectangle(
            startButton.x, 
            startButton.y, 
            startButton.displayWidth, 
            startButton.displayHeight, 
            0xff0000, 
            0 // Прозрачность
        ).setOrigin(0.5, 0.5); // Центрирование прямоугольника
    }
}

export default SingleButtonScene;