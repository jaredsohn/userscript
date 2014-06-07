// ==UserScript==
// @name           TheMostClickedButton AutoClicker
// @namespace      http://userscripts.org/users/Hamza7
// @description    Automatically click the button in TheMostClickedButton.com
// @include        http://themostclickedbutton.com/
// @author         Hamza Abbad
// @license        GNU General Public License
// @version        1.1
// @icon           http://themostclickedbutton.com/images/btnUp.png
// ==/UserScript==
var AC={};
AC.every=1/5; //The ratio of clicks in one second the default is 1/5 (or 0.2).
AC.button=document.getElementById("clicks");
AC.e=document.createEvent("MouseEvents");
AC.e.initMouseEvent("mousedown", false, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
window.setInterval(function (){AC.button.dispatchEvent(AC.e);},AC.every*1000);