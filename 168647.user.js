// ==UserScript==
// @name        Chat.SE FATE Dice
// @namespace   http://userscripts.org/users/168580
// @description Convert RPG.SE chat d6 to Fate
// @include     http://chat.stackexchange.com/*8403*
// @version     1.3
// ==/UserScript==

// Go install Immortal http://www.bcc.edu.ph/css/fonts/immortal-webfont.ttf

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
                    	var total = 0;
						die.empty();
						die.attr('data-d6-roll', count);
						if (count < 3){
                            
                            die.html('<span style="display: table-cell; vertical-align: middle; font-family: \'Immortal\', \'Finger Paint\', \'Arial Black\', cursive;padding-top:10px;font-size:60px;color:#cc0000;text-shadow:-1px -1px 0 rgba(0,0,0,0.25), 1px 1px 0 rgba(255,255,255,0.8);">–</span>');
								die.attr('data-fate-roll', -1);
						}else if (count > 4){
                            	
								die.html('<span style="display: table-cell; vertical-align: middle; font-family: \'Immortal\', \'Finger Paint\', \'Arial Black\',  cursive;padding-top:10px;font-size:60px;color:#006600;text-shadow:-1px -1px 0 rgba(0,0,0,0.25), 1px 1px 0 rgba(255,255,255,0.8);">+</span>');
								die.attr('data-fate-roll', 1);
						}else {
								die.text(' ');
								die.attr('data-fate-roll', 0);
						}

						die.css('display', 'table');
						die.css('text-align','center');
                  		  die.css('padding-top','1em');
                        die.css('background-image','url(data:image/jpeg;base64,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)');
                    die.css('background-size','64px');
                    
	
						//die.css('font-size','24px');

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


 WebFontConfig = {
    google: { families: [ 'Finger+Paint::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();