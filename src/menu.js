export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
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
    var ball = this.add.image(width / 2, height, "ball");
    
    // Modificamos las propiedades del elemento
    this.tweens.add({
      targets: ball,
      y: 400,
      duration: 800,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    });
  }
  update(time, delta) {
    // console.log(time, delta);
  }
};