export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
    this.limit = false;
    this.direcction = 3;
  }
  init() {
    console.log("INIT");
  }
  preload() {
    console.log("PRELOAD");
    // Definimos la ruta base
    this.load.path = "/assets/"

    // Cargamos las imagenes (forma abreviada)
    this.load.image(["ball"]);
  }
  create() {
    console.log('CREATE', this);

    // Obtenemos el ancho y el alto del canvas
    const { game: { config: { height, width } } } = this;
    
    // Añadimos la imagen
    this.ball = this.add.image(width / 2, height, "ball");
    
    // Modificamos las propiedades del elemento
    this.tweens.add({
      targets: this.ball,
      y: 400,
      duration: 600,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    });

    console.log(this.ball);
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
    // console.log(time, delta);
  }
};