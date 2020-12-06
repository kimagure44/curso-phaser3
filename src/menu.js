export default class Menu extends Phaser.Scene {
	constructor() {
		super("Menu");
		this.limit = false;
		this.direcction = 3;
	}
	init() {}
	preload() {
		// Definimos la ruta base
		this.load.path = "./assets/";

		// Cargamos las imagenes (forma abreviada)
		this.load.image(["ball", "spaceship", "ironman", "coin", "closed-chest", "open-chest"]);
	}
	create() {
		// Obtenemos el ancho y el alto del canvas
		const {
			game: {
				config: { height, width },
			},
		} = this;
		this.screenWidth = width;
		this.screenHeight = height;

		// Añadimos la imagen
    this.ball = this.add.image(width / 2, height, "ball");
    this.coin = this.add.image(50, 50, "coin").setInteractive();
    this.closedChest = this.add.image(150, 150, "closed-chest").setDepth(-1).setInteractive();
    this.closedChest.input.dropZone = true;
    this.input.setDraggable(this.coin);
		this.createSprite("spaceship", 10, 0.15);
		this.createSprite("ironman", 10, 0.15);

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

		this.controls.LEFT.on("down", () => {});
		this.controls.RIGHT.on("down", () => {});
		this.controls.UP.on("down", () => {});
		this.controls.DOWN.on("down", () => {});

		// Eventos del ratón
		const {
			POINTER_MOVE,
			GAME_OVER,
			GAME_OUT,
			GAMEOBJECT_DOWN,
      GAMEOBJECT_UP,
      DRAG_START,
      DRAG,
      DRAG_END,
      DROP,
		} = Phaser.Input.Events;

    // Drag & drop
    this.input.on(DRAG_START, (pointer, obj, dragX, dragY) => {
      // Empezamos arrastrar
      console.log('Empezamos arrastrar');
    });
    this.input.on(DRAG, (pointer, obj, dragX, dragY) => {
      // Arrastrando
      obj.x = dragX;
      obj.y = dragY;
    });
    this.input.on(DRAG_END, (pointer, obj, dropZone) => {
      // Arrastrando
      // Si no soltamos en la zona que este habilitada
      if (!dropZone) {
        obj.x = obj.input.dragStartX;
        obj.y = obj.input.dragStartY;
      } else {
        obj.setScale(1.5);
      }
      console.log('Terminamos arrastrar');
    });
    this.input.on(DROP, (pointer, obj, dropZone) => {
      // Soltamos
      obj.x = dropZone.x + 20;
      obj.y = dropZone.y + 20;
    });

		// Movemos el ratón por el canvas

		this.input.on(POINTER_MOVE, (evt) => {
			if (evt.isDown) {
				this.ironman.x = evt.worldX + 50;
				this.ironman.y = evt.worldY + 50;
			}
		});

		// Controlamos cuando estamos dentro y fuera del canvas
		this.input.on(GAME_OVER, (evt) => {
			console.log("DENTRO DEL CANVAS");
		});
		this.input.on(GAME_OUT, (evt) => {
			console.log("FUERA DEL CANVAS");
		});

		// Comprobar que gameObject hemos seleccionado
		this.input.on(GAMEOBJECT_DOWN, (pointer, gameObject) => {
			gameObject.setScale(0.5, 0.5);
		});
		this.input.on(GAMEOBJECT_UP, (pointer, gameObject) => {
			gameObject.setScale(0.15, 0.15);
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
		let limitRIGHT =
			this.spaceship.x > this.game.config.width - this.spaceship.widthScale / 2;
		let limitUP = this.spaceship.y < this.spaceship.widthScale / 2;
		let limitDOWN =
			this.spaceship.y > this.game.config.height - this.spaceship.widthScale / 2;

		this.spaceship.x = limitLEFT
			? this.spaceship.widthScale / 2
			: this.spaceship.x;
		this.spaceship.x = limitRIGHT
			? this.game.config.width - this.spaceship.widthScale / 2
			: this.spaceship.x;
		this.spaceship.y = limitUP ? this.spaceship.widthScale / 2 : this.spaceship.y;
		this.spaceship.y = limitDOWN
			? this.game.config.height - this.spaceship.widthScale / 2
			: this.spaceship.y;
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
}
