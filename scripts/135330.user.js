// ==UserScript==
// @name        Tyranu Evavu Smart Player
// @namespace   http://userscripts.org/users/46514
// @description Autoplays Tyranu Evavu, but remembers which cards have been played
// @include     http://www.neopets.com/games/tyranuevavu.phtml*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

function startGame() {
  if ($('form input[value="Play Now!"]').length) {
    GM_setValue('cards', 
                JSON.stringify([
                "2_hearts",
                "2_clubs",
                "2_diamonds",
                "2_spades",
                "3_hearts",
                "3_clubs",
                "3_diamonds",
                "3_spades",
                "4_hearts",
                "4_clubs",
                "4_diamonds",
                "4_spades",
                "5_hearts",
                "5_clubs",
                "5_diamonds",
                "5_spades",
                "6_hearts",
                "6_clubs",
                "6_diamonds",
                "6_spades",
                "7_hearts",
                "7_clubs",
                "7_diamonds",
                "7_spades",
                "8_hearts",
                "8_clubs",
                "8_diamonds",
                "8_spades",
                "9_hearts",
                "9_clubs",
                "9_diamonds",
                "9_spades",
                "10_hearts",
                "10_clubs",
                "10_diamonds",
                "10_spades",
                "11_hearts",
                "11_clubs",
                "11_diamonds",
                "11_spades",
                "12_hearts",
                "12_clubs",
                "12_diamonds",
                "12_spades",
                "13_hearts",
                "13_clubs",
                "13_diamonds",
                "13_spades",
                "14_hearts",
                "14_clubs",
                "14_diamonds",
                "14_spades"]));
    $('form input[value="Play Now!"]').parent().submit();
  }
}

function playGame() {
  if ($('img[src="http://images.neopets.com/prehistoric/tyranu.gif"]').length) {
    var url = $('img[src^="http://images.neopets.com/games/cards/"]:first').attr("src");
    var card = url.match('cards\/(.+)\.gif');
    var length = JSON.parse(GM_getValue('cards')).length;
    var index = JSON.parse(GM_getValue('cards')).indexOf(card[1]);
    var array = JSON.parse(GM_getValue('cards'));
    array.splice(index, 1);
    GM_setValue('cards', JSON.stringify(array));
    if (length > 1) {
      if (index/(length - 1) > 0.5) {
        window.location = 'http://www.neopets.com/games/tyranuevavu.phtml?type=play&action=lower&bs=1';
      } else {
        window.location = 'http://www.neopets.com/games/tyranuevavu.phtml?type=play&action=higher&bs=1';
      }
    } else {
      alert("You have won the game");
    }
  }
}

function endGame() {
  if ($('form input[value="Play Again"]').length) {
    GM_deleteValue('cards');
    $('form input[value="Play Again"]').parent().submit();
  }
}

$('.content').prepend('<button id="autoplayer">Toggle AP</button>');

$('#autoplayer').live("click", function() {
  $('#autoplayer').css("display", "none");
  if (!GM_getValue('play', 0)) {
    GM_setValue('play', 1);
    startGame();
    playGame();
    endGame();
  } else {
    GM_deleteValue('cards');
    GM_setValue('play', 0);
  }
});

if (GM_getValue('play', 0)) {
  setTimeout( function() {
    startGame();
    playGame();
    endGame();
  },1000*(1+Math.random()));
}
