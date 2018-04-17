/*jslint devel: true, browser: true */
/*global $*/
$(function() {
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
  var player_left = parseInt(player.css("left"));
  var player_height = parseInt(player.css("height"));
  var player_width = parseInt(player.css("width"));
  var game_speed = 10;
  var player_speed = 30;
  var playerImgNumber = 1;
  var score = 0;
  var bonusPoints = 0;
  var moveLeft = false;
  var moveRight = false;
  var gameOver = false;

  var game = setInterval(function() {

    if (collision(player, wall_1) || collision(player, wall_2)) {

      stopGame();
    }

    var wall_current_position = parseInt(wall.css("top"));

    // check whether the walls went out of the container, if so then set to wall initial position
    if (wall_current_position > container_height) {
      var new_width = parseInt(Math.random() * 100);

      // change the wall's width randomly
      wall_1.css("width", wall_initial_width + new_width);
      wall_2.css("width", wall_initial_width - new_width);
      wall_current_position = wall_initial_position;

      if (wall_current_position < container_height - player_height) {

        // everytime player reaches 5 points (when dice face turns 6) consecutively they get a bonus of 10 pts plus
        bonusPoints++;
        if (bonusPoints > 5) {
          bonusPoints = 0;
          score = score + 10;
          console.log("10 Bonus Points Added to Score!");
          backgroundColorChanger(); // change background color
        } else {
          score++;
        }
        updateScore(score);
        playerImg(); // change player image based on score
      }

      // increasing wall generation speed to 70
      if (game_speed < 70) {
        game_speed = game_speed + 2;
      }

    }

    // move the walls
    wall.css("top", wall_current_position + game_speed);

  }, (40)); // every 40 milliseconds

  // allows the player to move right or left if key(s) is pressed
  $(document).on("keydown", function(e) {
    var key = e.keyCode;
    if (parseInt(player.css("left") < 0)) {}
    if (key === 37 && moveLeft === false && gameOver === false) {
      moveLeft = setInterval(left, 50);
    }
    if (key === 39 && moveRight === false && gameOver === false) {
      moveRight = setInterval(right, 50);
    }
  });

  // stops the player from moving right or left if key(s) is released
  $(document).on("keyup", function(e) {
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
  var left = function() {
    player.css("left", parseInt(player.css("left")) - player_speed);
  };

  // right movement speed
  var right = function() {
    player.css("left", parseInt(player.css("left")) + player_speed);
  };

  // collision detection
  var collision = function(div1, div2) {
    var x1 = div1.offset().left;
    var y1 = div1.offset().top;
    var h1 = div1.outerHeight(true);
    var w1 = div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = div2.offset().left;
    var y2 = div2.offset().top;
    var h2 = div2.outerHeight(true);
    var w2 = div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    // if player tries to go out of bounds
    if (parseInt(player.css("left")) > (container_width - player_width)) {
      player.css("left", (container_width / player_width));
    } else if (parseInt(player.css("left")) <= 0) {
      player.css("left", (container_width - player_width));
    }

    if (b1 <= y2 || y1 >= b2 || r1 <= x2 || x1 >= r2) {
      return false;
    } else {
      return true;
    }

  };

  var updateScore = function(score) {
    score_span.text(score);
  };

  // change player dice image if pass walls
  var playerImg = function() {
    if (playerImgNumber > 6) { // number of dice images
      playerImgNumber = 1;
      $("#player").attr('src', "./assets/dice" + playerImgNumber + ".png");
      playerImgNumber++;
    } else {
      $("#player").attr('src', "./assets/dice" + playerImgNumber + ".png");
      playerImgNumber++;
    }
  };

  // generating light colors for container background color
  var backgroundColorChanger = function () {
    var red = parseInt(Math.random() * 255 + 100);
    var green  = parseInt(Math.random() * 255 + 100);
    var blue  = parseInt(Math.random() * 255 + 100);
    var new_color = "rgb("+red+", "+green+", "+blue+")";
    container.css("background-color", new_color);
  };

  var stopGame = function() {
    gameOver = true;
    clearInterval(game);
  };

  var gameRestart = function() {
    gameOver = false;

    window.location.reload();
  };

  restart.on("click", function() {
    gameRestart();
  });

});
