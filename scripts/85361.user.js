// ==UserScript==
// @name           GLB Management Name Change 
// @namespace      ErDrRon
// @description    Replace management titles on lolgm Trophy Whores team page
// @version        1.1.0
// @date           2010-09-05
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://goallineblitz.com/game/team.pl?team_id=6144
// ==/UserScript==

var gms = document.evaluate( 'count(//div[@id = "team_gms"]//a)', document, null, XPathResult.NUMBER_TYPE, null).numberValue;

var e = document.getElementsByTagName("body")[0].getElementsByTagName("*");
            for(var i=0;i<e.length;i++) {
                  if(e[i].innerHTML) {
                        e[i].innerHTML = e[i].innerHTML.replace(/OC:/g,"Bartender:").replace(/DC:/g,"Bouncer:").replace(/CFO:/g,"Mr. Money Bags:").replace(/Recruiters:/g,"Pimps:").replace(/Co Owned by/g,"lolowners bitch:").replace(/GMs:/g,"Whores (" + gms + "):").replace(/Owned by/g,"lolowner:").replace(/Head Coach/g,"Disc Jockey:").replace(/ST Coach:/g,"Yoga Instructer:").replace(/Scouts:/g,"Talent Evaluators:").replace(/Asst OC/g,"Janitor").replace(/Asst DC/g,"Security").replace(/Note from the Owner/g,"Note from the lolowner");
                  }
            }
