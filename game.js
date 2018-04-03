/*jslint devel: true, browser: true */
/*global $*/
$(function () {
    "use strict";

    var container = $("#container");
    var player = $("#player");
    var wall = $(".wall");
    var wall_1 = $("#wall_1");
    var wall_2 = $("#wall_2");
    var score_span = $("#score");
    var restart = $("#restart");

    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var wall_initial_position = parseInt(wall.css("top"));
    var wall_initial_width = parseInt(wall.css("width"));
    var player_left = parseInt(wall.css("left"));
    var player_height = parseInt(wall.height());
    var speed = 10;
    var score = 0;
    var moveLeft = true;
    var moveRight = true;


    var game = setInterval(function () {

      var wall_current_position = parseInt(wall.css("top"));

      // check whether the walls went out of the container, if so then set to wall initial position

      // TODO: if not(!) player hit wall, continue making walls, to add score each time wall is created
      if (wall_current_position > container_height) {
        var new_width = parseInt(Math.random() * 100);

        // change the wall's width randomly
        wall_1.css("width", wall_initial_width + new_width);
        wall_2.css("width", wall_initial_width - new_width);
        wall_current_position = wall_initial_position;

        score++;
        score_span.text(score);

        // increasing wall generation speed to 70
        if (speed < 70) {
          speed = speed +2;
        }

      }

      // move the walls
      wall.css("top", wall_current_position + speed); //increased wall speed by 10

    }, (40)); // every 40 milliseconds

    // allows the player to move right or left if key(s) is pressed
    $(document).on("keydown", function(e){
      var key = e.keyCode;
      if (key === 37 && moveLeft === false) {
        moveLeft = setInterval(left, 50);
      }
      if (key === 39 && moveRight === false) {
        moveRight = setInterval(right, 50);
      }
    });

    // stops the player from moving right or left if key(s) is released
    $(document).on("keyup", function(e){
      var key = e.keyCode;
      if (key === 37) {
        clearInterval(moveLeft);
        moveLeft = false;
      }
      if (key === 39) {
        clearInterval(moveRight);
        moveRight = false;
      }
    });

    // left movement speed
    var left = function () {
      player.css("left", parseInt(player.css("left")) - 60);
    };

    // right movement speed
    var right = function () {
      player.css("left", parseInt(player.css("left")) + 60);
    };

});
