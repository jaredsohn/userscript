// ==UserScript==
// @name      		The West knockout timer
// @include		http://*.the-west.*/game.php*
// @author		Slygoxx
// @grant		none
// @version    		1.3
// @description  	Shows the amount of time left until you can duel again.
// @updateURL           http://userscripts.org/scripts/source/474582.meta.js
// @installURL          http://userscripts.org/scripts/source/474582.user.js
// ==/UserScript==

function runScript(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

run = function(){
    KOtimer = new Object();
	KOtimer.timeleft = 0;
	KOtimer.aliveAgain = 0;
    KOtimer.image = "<div style='position:relative;display:block;width:59px;height:59px;cursor:pointer;' id='knockouttimer'><div id='timer'></div></div>";
    
    KOtimer.firstrun = function(){
    
        if($('.game_notification_area').length > 0)
        {
           $('.game_notification_area').append(KOtimer.image);
        }
        else
        {
           setTimeout(KOtimer.firstrun,3000);
           console.log('Couldn\'t find the notification area, trying again soon...');
           return;
        }
        $('#knockouttimer').css('background-image','url("http://i300.photobucket.com/albums/nn22/qwexrty/knockout_sprite_zps97503234.png")');
        
        $('#knockouttimer #timer').css({'position':'absolute','bottom':'0px','left':'0px','right':'0px','color':'white','text-align':'center','font-size':'11px','height':'30px','line-height':'30px'});
    
       KOtimer.retrieveTimeleft();
       KOtimer.update();
    }
    
	KOtimer.retrieveTimeleft = function(){
		if(Character.homeTown.town_id != 0)
		{
			$.post( "game.php?window=building_sheriff&mode=index",{town_id:Character.homeTown.town_id},function( data ) {
				KOtimer.timeleft = data.timeleft;
				KOtimer.aliveAgain = Math.round(new Date().getTime()/1000)+data.timeleft;
				console.log("Server query successful");
			});
		}
		else
		{
			KOtimer.aliveAgain = 0;
			$('#knockouttimer').hide();
			
		}
		setTimeout(KOtimer.retrieveTimeleft,300000);
	}
	KOtimer.update = function(){
		
		var unix = Math.round(new Date().getTime()/1000);
		aliveAgain = KOtimer.aliveAgain;
		if (aliveAgain < unix)
		{
			$('#knockouttimer').hide();
			setTimeout(KOtimer.update,10000);
			return;
		}
		else
			$('#knockouttimer').show();
		
		difference = aliveAgain - unix;
		hours = Math.floor(difference/60/60);
			difference -= hours*60*60;
		minutes = Math.floor(difference/60);
			difference -= minutes*60;
		
		if(hours == 0 && minutes ==0)
			$('#knockouttimer #timer').html(Math.round(difference)+'s');
		else
			$('#knockouttimer #timer').html(hours+'h:'+minutes+'m');
		
		setTimeout(KOtimer.update,1000);
		
	}
    KOtimer.firstrun();
};

runScript(run);