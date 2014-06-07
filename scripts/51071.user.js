// ==UserScript==
// @name           My Reroller
// @namespace      Reroller
// @description    Automatic Rerolling for GLB
// @include        http://goallineblitz.com/game/reroll_player.pl?player_id=*
// ==/UserScript==

var NUM_ATTS = 14;
var attributeName = new Array(NUM_ATTS);
var attCtr = 0;
attributeName[attCtr++] = "Strength";
attributeName[attCtr++] = "Speed";
attributeName[attCtr++] = "Agility";
attributeName[attCtr++] = "Jumping";
attributeName[attCtr++] = "Stamina";
attributeName[attCtr++] = "Vision";
attributeName[attCtr++] = "Confidence";
attributeName[attCtr++] = "Blocking";
attributeName[attCtr++] = "Tackling";
attributeName[attCtr++] = "Throwing";
attributeName[attCtr++] = "Catching";
attributeName[attCtr++] = "Carrying";
attributeName[attCtr++] = "Kicking";
attributeName[attCtr++] = "Punting";
var playerId = 0;
var minimumAttribute = new Array(NUM_ATTS);
var maximumAttribute = new Array(NUM_ATTS);

/* 
   delay in milliseconds between rerolls.
   e.g. 1000 would mean you're rerolling every second until the attribute is high enough 
*/
var delayInMilliseconds = 2000;
var rerollcount = 0;
var script = document.createElement('script');
script.src="http://o.aolcdn.com/dojo/1.2.0/dojo/dojo.xd.js";
document.getElementsByTagName('head')[0].appendChild(script);

window.addEventListener('load', function(event) {
    var dojo = unsafeWindow["dojo"];

   dojo.addOnLoad(
        function() {
            var dijit = unsafeWindow["dijit"];
            dojo.addClass(document.getElementsByTagName('body')[0], "tundra");

            var ctr = 0;
            var valid_value = 0;
            for( ctr = 0; ctr < NUM_ATTS; ctr++ )
            {
               minimumAttribute[ctr] = prompt("Enter the minimum desired value for " +
                                              attributeName[ctr] +
                                              "\nValid values are between 8 and 30.\n", "8");
               if( (minimumAttribute[ctr] < 8) || (minimumAttribute[ctr] > 30) )
               {
                  alert('You entered '+minimumAttribute[ctr]+' for '+attributeName[ctr]+'. Please try again.');
                  ctr--;
               }
            }

            for( ctr = 0; ctr < NUM_ATTS; ctr++ )
            {
               maximumAttribute[ctr] = prompt("Enter the maximum desired value for " +
                                              attributeName[ctr] +
                                              "\nValid values are between 8 and 30.\n", "30");
               if( (maximumAttribute[ctr] < 8) || (maximumAttribute[ctr] > 30) )
               {
                  alert('You entered '+maximumAttribute[ctr]+' for '+attributeName[ctr]+'. Please try again.');
                  ctr--;
               }
            }

            var pid = window.location.search;
            pid = pid.slice(pid.indexOf('player_id=')+'player_id='.length);
            if (pid.indexOf('&') > -1) {
               pid = pid.slice(0,pid.indexOf('&'));
            } else {
               pid = pid.slice(0);
            }
            playerId = pid;

            reroll();
        }
    );
}, 'false');

function reroll()
{
   var dojo = unsafeWindow["dojo"];
   dojo.require("dijit.Dialog");
   dojo.xhrPost({
                url: "/game/reroll_player.pl?player_id="+playerId, 
                content : {action: "Re-Roll", player_id: playerId},
                load: parseReloadedPage,
                error : function() {alert('network error')},
                handleAs: "text"
                });
}

function parseReloadedPage(response, ioArgs)
{
   var s = response;

   var rerolling = 0;
   var ctr;
   for( ctr = 0; ctr < NUM_ATTS; ctr++ )
   {

      var s = response;

      // find the attribute name
      s = s.slice(s.indexOf(attributeName[ctr]+':')+attributeName[ctr].length+1);

      // trim off the stuff leading up to the attribute
      s = s.slice(s.indexOf('stat_value_tall')+"stat_value_tall".length+2);
      s = s.slice(0,2);

      if( s[1] == '<' )
      {
         s = s.slice(0,1);
      }

      // log it in firebug so you can get watch what attributes are being rolled
      unsafeWindow.console.log("value: " + s);

      if( (parseInt(s) < parseInt(minimumAttribute[ctr])) ||
          (parseInt(s) > parseInt(maximumAttribute[ctr])) )
      {
         rerolling = 1;

//alert("rerolling because " + attributeName[ctr] + " is " + s + " with a minimum of " + minimumAttribute[ctr] + " and a max of " + maximumAttribute[ctr] + ".");
      }
   }

   if( rerolling == 0 )
   {
      var x = 0;
      var s = "";
      for( x = 0; x < NUM_ATTS; x++ )
      {
         s += (attributeName[x] + ": " + minimumAttribute[x] + "-" +
                                         maximumAttribute[x] + "\n");
      }
      alert("Done rerolling with the following:\n" + s);
      window.location = 'http://goallineblitz.com/game/skill_points.pl?player_id='+playerId;
   }
   else
   {
      // log it in firebug so you can get watch what our count is
      unsafeWindow.console.log("count: " + rerollcount);

      rerollcount++;
      setTimeout(reroll, delayInMilliseconds);
   }
}