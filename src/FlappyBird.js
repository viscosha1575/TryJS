import Phaser from 'phaser';

class FlappyBird extends Phaser.Scene {
    constructor() {
        super({ key: 'FlappyBird' });
    }

    preload() {
        this.load.image('bird1', 'assets/car.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('floor', 'assets/grnd.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('backgroundMirror', 'assets/background_mirror.png');
        this.load.css('customFont', 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'); // Подключаем шрифт через CSS
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Массив для чередования фона
        this.backgrounds = [
            this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0),
            this.add.tileSprite(width, 0, width, height, 'backgroundMirror').setOrigin(0),
            this.add.tileSprite(width * 2, 0, width, height, 'background').setOrigin(0),
            this.add.tileSprite(width * 3, 0, width, height, 'backgroundMirror').setOrigin(0)
        ];

        this.currentBackgroundIndex = 0; // Индекс текущего фона
        this.backgroundChangeInterval = 2000; // Интервал смены фона в миллисекундах
        this.time.addEvent({
            delay: this.backgroundChangeInterval,
            callback: this.changeBackground,
            callbackScope: this,
            loop: true
        });

        // Создаем трубы
        this.pipes = this.physics.add.group();
        this.sensors = this.physics.add.group();

        // Создаем птицу
        this.bird = this.physics.add.sprite(width / 2, height / 2, 'bird1');
        this.bird.setCollideWorldBounds(true);
        this.bird.setGravityY(1000);
        this.anims.create({
            key: 'flap',
            frames: [{ key: 'bird1' }],
            frameRate: 10,
            repeat: -1
        });

        this.bird.play('flap');
        const floorY = height - 100;
        const floorHeight = height - floorY;
        this.floor = this.add.tileSprite(width / 2, height, width, floorHeight, 'floor').setOrigin(0.5, 1);
        this.physics.add.existing(this.floor, true);
        this.floor.setDepth(1);

        // Создаем счет и задаем кастомный шрифт
        this.score = 0;
        this.scoreText = this.add.text(width / 2, height - 50, '0', {
            fontSize: '50px',
            fill: '#fff',
            fontFamily: '"Press Start 2P"',  // Используем кастомный шрифт
        }).setOrigin(0.5);
        this.scoreText.setDepth(2);

        // Таймер для спавна труб
        this.time.addEvent({
            delay: 4000,
            callback: this.spawnPipes,
            callbackScope: this,
            loop: true
        });

        this.isGameOver = false;

        // Обработчик кликов
        this.input.on('pointerdown', this.handlePointerDown, this);

        // Столкновения
        this.physics.add.collider(this.bird, this.floor, this.gameOver, null, this);
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);

        // Сенсоры
        this.physics.add.overlap(this.bird, this.sensors, this.updateScore, null, this);
    }

    update() {
        const width = this.cameras.main.width;

        // Перемещаем фон
        this.backgrounds.forEach((bg) => {
            bg.tilePositionX += 2;
        });

        // Удаление труб и сенсоров, если они выходят за экран
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.x < -pipe.width) {
                pipe.destroy();
            }
        });

        this.sensors.getChildren().forEach(sensor => {
            if (sensor.x < -sensor.width) {
                sensor.destroy();
            }
        });

        // Проверка на вылет птицы за экран
        if (this.bird.y < 0 || this.bird.y > this.cameras.main.height) {
            this.gameOver();
        }
        
        // Проверка на достижение счета 100
        if (this.score >= 10) {
            this.gameOver();
        }
    }

    flap() {
        this.bird.setVelocityY(-500);
    }

    handlePointerDown() {
        if (!this.isGameOver) {
            this.flap();
        }
    }

    spawnPipes() {
        const minGap = 600;
        const maxGap = 700;
        const gap = Phaser.Math.Between(minGap, maxGap);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const floorHeight = 100;

        const minTopPipeHeight = 200;
        const maxTopPipeHeight = height - floorHeight - gap-100;
        const topPipeHeight = Phaser.Math.Between(minTopPipeHeight, maxTopPipeHeight);

        const bottomPipeY = topPipeHeight + gap;

        const topPipe = this.pipes.create(width, topPipeHeight, 'pipe');
        const bottomPipe = this.pipes.create(width, bottomPipeY, 'pipe');

        topPipe.setOrigin(0.5, 1);
        topPipe.setFlipY(true);
        bottomPipe.setOrigin(0.5, 0);

        topPipe.setVelocityX(-200);
        bottomPipe.setVelocityX(-200);

        const sensor = this.sensors.create(width, topPipeHeight + gap / 2, null);
        sensor.setDisplaySize(10, gap);
        sensor.setVisible(false);
        sensor.body.setAllowGravity(false);
        sensor.setVelocityX(-200);
    }

    updateScore(bird, sensor) {
        this.score += 1;
        this.scoreText.setText(this.score);
        sensor.destroy();
    }

    gameOver() {
        if (!this.isGameOver) {
            this.isGameOver = true;
            
            if (this.score >= 10) {
                // Если счет больше или равен 10, перейти на SecondaryMenu
                this.scene.start('SecondaryMenu');
            } else {
                // В противном случае перейти на MainMenu
                this.scene.start('MainMenu');
            }
        }
    }

    changeBackground() {
        this.currentBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgrounds.length;
        const width = this.cameras.main.width;

        // Перемещаем все фоны на 2 пикселя влево
        this.backgrounds.forEach((bg) => {
            bg.tilePositionX += 2;
        });

        // Если фонов меньше ширины экрана, создаем новый фон
        if (this.backgrounds[0].tilePositionX <= -width) {
            const removedBackground = this.backgrounds.shift();
            removedBackground.setTilePositionX(width * (this.backgrounds.length - 1)); // Переместить фон в конец
            this.backgrounds.push(removedBackground); // Добавляем фон в конец массива
        }
    }
}

export default FlappyBird;