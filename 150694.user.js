// ==UserScript==
// @name           Antihalloween Script
// @namespace      http://userscripts.org/scripts/show/150694
// @author         panair
// @description    Tauscht das schwule Halloweenbild gegen das Standartbild...Deaktivieren nach dem event
// @include        *pennergame.de*
// @exclude        http://*change_please*
// @exclude        http://*board*
// @exclude        http://*redirect*
// @version        0.0.2


// ==/UserScript==


document.getElementsByTagName('body')[0].style.backgroundColor= "#2c2c2c";

document.getElementsByTagName('body')[0].style.backgroundImage= "url( http://static.pennergame.de/img/pv4/weather/de_DE/bg_body-day-cloud.jpg )";

document.getElementById("content").style.backgroundImage = "url( http://static.pennergame.de/img/pv4/bg_content.png)";

document.getElementById("content-top").style.backgroundImage = "url( http://static.pennergame.de/img/pv4/content_top.png)";

document.getElementById("content-bottom").style.backgroundImage = "url( http://static.pennergame.de/img/pv4/content_bottom.png)";