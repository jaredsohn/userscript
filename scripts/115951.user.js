// ==UserScript==
// @name           GLB Management Name Change 
// @namespace      High_Roller74
// @description    Replace management titles on Power House Mercenaries team page
// @version        1.1.0
// @date           2011-10-20
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://goallineblitz.com/game/team.pl?team_id=1224
// ==/UserScript==

var gms = document.evaluate( 'count(//div[@id = "team_gms"]//a)', document, null, XPathResult.NUMBER_TYPE, null).numberValue;

var e = document.getElementsByTagName("body")[0].getElementsByTagName("*");
            for(var i=0;i<e.length;i++) {
                  if(e[i].innerHTML) {
                        e[i].innerHTML = e[i].innerHTML.replace(/OC:/g,"$Money$:").replace(/DC:/g,"Security - ").replace(/CFO:/g,"Mr. Money - ").replace(/Recruiters:/g,"Rich Boyz - ").replace(/Co Owned by/g,"Mercenary Boss - ").replace(/GMs:/g,"$lolGM$:").replace(/Owner:/g,"$Owner$:").replace(/Head Coach/g,"Hustler - ").replace(/ST Coach:/g,"$C-Note$:").replace(/Scouts:/g,"Talent Evaluators - ").replace(/Asst OC/g,"Mr. Money in the Bank").replace(/Asst DC/g,"Security Guard").replace(/Owner Note/g,"Note from Mr. Mercenary:");
                  }
            }