export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
        this.limit = false;
        this.direcction = 3;
    }
    init() {}
    preload() {
        // Definimos la ruta base
        this.load.path = "/assets/";

        // Cargamos las imagenes (forma abreviada)
        this.load.image(["ball", "spaceship", "ironman"]);
    }
    create() {
        // Obtenemos el ancho y el alto del canvas
        const { game: { config: { height, width } } } = this;
        this.screenWidth = width;
        this.screenHeight = height;

        // Añadimos la imagen
        this.ball = this.add.image(width / 2, height, "ball");
        this.createSprite("spaceship", 10, .15);
        this.createSprite("ironman", 10, .15);

        // Modificamos las propiedades del elemento
        this.tweens.add({
            targets: this.ball,
            y: 400,
            duration: 600,
            ease: "Power2",
            yoyo: true,
            loop: -1,
        });

        const { LEFT, RIGHT, UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;

        this.controls = this.input.keyboard.addKeys({
            LEFT,
            RIGHT,
            UP,
            DOWN,
        });

        this.controls.LEFT.on('down', () => {});
        this.controls.RIGHT.on('down', () => {});
        this.controls.UP.on('down', () => {});
        this.controls.DOWN.on('down', () => {});

        // Eventos del ratón
        const { POINTER_MOVE, GAME_OVER, GAME_OUT, GAMEOBJECT_DOWN, GAMEOBJECT_UP } = Phaser.Input.Events;

        // Movemos el ratón por el canvas

        this.input.on(POINTER_MOVE, evt => {
            if (evt.isDown) {
                this.ironman.x = evt.worldX;
                this.ironman.y = evt.worldY;
            }
        });

        // Controlamos cuando estamos dentro y fuera del canvas
        this.input.on(GAME_OVER, evt => {
            console.log('DENTRO DEL CANVAS');
        });
        this.input.on(GAME_OUT, evt => {
            console.log('FUERA DEL CANVAS');
        });

        // Comprobar que gameObject hemos seleccionado
        this.input.on(GAMEOBJECT_DOWN, (pointer, gameObject) => {
            gameObject.setScale(.50, .50);
        });
        this.input.on(GAMEOBJECT_UP, (pointer, gameObject) => {
            gameObject.setScale(.15, .15);
        });
    }
    update(time, delta) {
        // Vamos a realizar la detección de una forma sencilla, hasta que veamos la parte de físicas
        if (this.ball.x >= this.game.config.width || this.ball.x < 0) {
            this.limit = true;
            this.direcction = this.ball.x >= this.game.config.width ? -3 : 3;
        } else {
            this.limit = false;
        }
        this.ball.x += this.direcction;

        this.spaceship.x -= this.controls.LEFT.isDown ? this.spaceship.speed : 0;
        this.spaceship.x += this.controls.RIGHT.isDown ? this.spaceship.speed : 0;
        this.spaceship.y -= this.controls.UP.isDown ? this.spaceship.speed : 0;
        this.spaceship.y += this.controls.DOWN.isDown ? this.spaceship.speed : 0;

        let limitLEFT = this.spaceship.x < this.spaceship.widthScale / 2;
        let limitRIGHT = this.spaceship.x > this.game.config.width - this.spaceship.widthScale / 2;
        let limitUP = this.spaceship.y < this.spaceship.widthScale / 2;
        let limitDOWN = this.spaceship.y > this.game.config.height - this.spaceship.widthScale / 2;

        this.spaceship.x = limitLEFT ? this.spaceship.widthScale / 2 : this.spaceship.x;
        this.spaceship.x = limitRIGHT ? this.game.config.width - this.spaceship.widthScale / 2 : this.spaceship.x;
        this.spaceship.y = limitUP ? this.spaceship.widthScale / 2 : this.spaceship.y;
        this.spaceship.y = limitDOWN ? this.game.config.height - this.spaceship.widthScale / 2 : this.spaceship.y;
    }
    createSprite(id, speed, scaleFactor) {
        this[id] = this.add.image(0, 0, id).setInteractive();
        this[id].scaleFactor = scaleFactor;
        this[id].x = this.screenWidth / 2;
        this[id].y = this.screenHeight / 2;
        this[id].setScale(this[id].scaleFactor, this[id].scaleFactor);
        this[id].speed = speed;
        this[id].widthScale = this[id].width * this[id].scaleFactor;
    }
};