// ==UserScript==
// @name   GLB Management Name Change 
// @namespace Laser cats
// @description Replace OC and DC on team page
// @include  http://goallineblitz.com/game/team.pl?team_id=4557*
// ==/UserScript==

var e = document.getElementsByTagName("body")[0].getElementsByTagName("*");
            for(var i=0;i<e.length;i++) {
                  if(e[i].innerHTML) {
                        e[i].innerHTML = e[i].innerHTML.replace(/OC:/g,"The Wise one:").replace(/DC:/g,"Head of the Iron Laser:").replace(/CFO:/g,"Stadium Guru:").replace(/Recruiters:/g,"Spammers:").replace(/Co Owned by/g,"He Can't Fap--->:").replace(/GMs:/g,"Forum Cats:").replace(/Owned by/g,"lol:").replace(/Head Coach/g,"Chop Suey aka").replace(/ST Coach:/g,"RIP:").replace(/Scouts:/g,"Fags:").replace(/Asst OC/g,"Srs OC").replace(/Asst DC/g,"2nd in command");
                  }
            }