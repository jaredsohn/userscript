// ==UserScript==
// @name        Chat.SE FATE Dice
// @namespace   http://userscripts.org/users/168580
// @description Convert RPG.SE chat d6 to Fate
// @include     http://chat.stackexchange.com/rooms/8403/fae-game-room
// @version     1.1
// ==/UserScript==

//Thanks to Sohum (http://rpg.stackexchange.com/users/792/sohum) for the chrome fix
var main = function () {
		// load jQuery and execute the main function

		function convertDice(){
				$('.six-sided-die').each(function() {
						var die = $(this);
						//It does something strange when I try to use the :not selector,
						//   So go old school
						if (die.hasClass('fate-die')){
								return;
						}
						var count = $('.dot:contains("•")', die).length;
						die.empty();
						die.attr('data-d6-roll', count);
						if (count < 3){
								die.html('<span style="display: table-cell; vertical-align: middle">-</span>');
								die.attr('data-fate-roll', -1);
						}else if (count > 4){
								die.html('<span style="display: table-cell; vertical-align: middle">+</span>');
								die.attr('data-fate-roll', 1);
						}else {
								die.text(' ');
								die.attr('data-fate-roll', 0);
						}

						die.css('display', 'table');
						die.css('text-align','center');
						die.css('font-size','24px');

						//Add class to prevent re-processing
						die.addClass('fate-die')
				});
		}
		
		function add4dFMeta(){
		  $('.content').each(function() {
		      var content = $(this);
		      if ($('.fate-die', content).length == 4 && !content.hasClass('.fate-roll')) { 
		          content.addClass('.fate-roll');
		          var total = 0;
		          $('.fate-die', content).each(function() {
		              var die = $(this);
		              total = total + parseInt(die.attr('data-fate-roll'));
		          });
		          if (total > 0){
		              total = '+' + total;
		          }
		          content.attr('title', '4dF = ' + total);
		      }
		  });
		}

		$(window).load(function() {
				$(document).on('DOMNodeInserted', '#chat', function() {
						$(function() { 
						convertDice();
						add4dFMeta();
					}); // this is a document.ready handler to let the dice load first
				});
		});

};

var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);

