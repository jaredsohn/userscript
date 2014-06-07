// ==UserScript==
// @author      blablubbb
// @name		Travian Tactics Appearance changer
// @description	The Script changes the appearance of Travian Tactics to give the main window more space. It is supposed to run together with the travian tactics script.
// @include 	http://www.traviantactics.com/traviantacticsonline.php?link=http://*.travian.*
// @include 	http://traviantactics.com/traviantacticsonline.php?link=http://*.travian.*
// @version     1.0.1
// ==/UserScript==

document.getElementsByTagName("table")[0].width="100%";
document.getElementsByClassName("Celica2")[0].style.display="none";
document.getElementsByClassName("Celica0")[0].style.display="none";