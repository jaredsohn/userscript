// ==UserScript==
// @name   			Colorize farm space
// @description     Colorizes the farm space if exhausted by more than 75%
// @include			http://ae*.tribalwars.ae/game.php*
// @exclude         http://ae*.tribalwars.ae/game.php*screen=am*
// ==/UserScript==

// Settings for free farm space
// Colors can be assigned by using #FFCC00 etc. also
/*
var limit = '0.75';		// 0.75 means that the color will change at a capacity of 75%
var farbe1 = 'green'	// normal color
var farbe2 = 'orange'	// color limit reached
var farbe3 = 'red'		// color farm full
*/
// No changes from here!!!
// ScriptAPI
var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api.register('colorize_farmspace', [8.3, 8.4], 'fp0815', 'fp0815@team.die-staemme.de');

// Access DS UI for nicer notifications
var UI = typeof unsafeWindow != 'undefined' ? unsafeWindow.UI : window.UI;

// Block other markets
var game_data = typeof unsafeWindow != 'undefined' ? unsafeWindow.game_data : window.game_data;
game_data.market == 'de' ? main() : UI.ErrorMessage('Das Script \'Colorize farm space\' ist für Deine Sprachversion gesperrt!');

function main() {
 var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
 $('#pop_current_label').css('color', '#FFFFFF');
 var farbe = farbe1;
 var current = $('#pop_current_label').text();
 var max = $('#pop_max_label').text();
 if(current > max * limit) {farbe = farbe2};
 if(current == max) {farbe = farbe3};
 $('#pop_current_label').css('background', farbe);
 
 var farm_index = $('#production_table th:contains("المزارع")').index();

 $('#production_table td').each(
     function(){
         if($(this).index() == farm_index)
         {
             $(this).css('color', '#FFFFFF');
              var farbe = farbe1;
             var farm = $(this).text().split('/');
             if(farm[0] > farm[1] * limit) {farbe = farbe2};
             if(farm[0] == farm[1]) {farbe = farbe3};
             $(this).css('color', '#FFFFFF');
             $(this).css('background', farbe);
         }
  })
 $('.warn_90').css('background', farbe2);
 $('.warn_90').css('color', 'white');