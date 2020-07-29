import "phaser";
import Menu from "./menu";
var config = {
  // Modo renderización del Canvas.
  type: Phaser.AUTO,
  // El elemento del DOM que contendra el canvas, usando el atributo "id".
  parent: "containerGame",
  // Ancho del canvas.
  width: 800,
  // Alto del canvas.
  height: 600,
  // Título que se mostrara en la ventana del navegador
  title: "Creando videojuegos con Phaser 3",
  // URL del juego
  utl: "https://tecnops.es",
  // Versión del juego
  version: "0.0.1",
  /* 
    En la consola del navegador se muestra cierta información.
    Con esta configuración se puede modificar
  */
  banner: {
    text: "#000000",
    background: ["#ff0000", "#ff5500", "#ffaa00"],
    hidePhaser: true,
  },
  // Phaser trabaja mediante escenas (scene). Podríamos decir que esta escena equivale a un nivel, pantalla o mundo donde se desarrolla el videojuego
  scene: [Menu],
};

var game = new Phaser.Game(config);

