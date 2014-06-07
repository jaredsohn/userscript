// ==UserScript==
// @name           TF2R.com - Hide Chat
// @namespace      spafic/tf2rhidechat
// @description    Hides the chat on TF2R raffle pages.
// @author         Spafic
// @copyright      Spafic 2012 (http://userscripts.org/users/Spafic)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see <http://www.gnu.org/licenses/>. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.tf2r.com/k*.html
// @version        1.0.0
//
// @history        1.0.0 - Script created
// ==/UserScript==

(function(){

var hidden,worker;
worker = document.getElementById("newfeed");
document.getElementsByClassName("userfeed")[0].style.display = "none";
hidden=true;
worker.addEventListener("click",function() {
	if(hidden==false) {
		document.getElementsByClassName("userfeed")[0].style.display = "none";
		hidden = true;
	} else {
		document.getElementsByClassName("userfeed")[0].style.display = "block";
		hidden = false;
	}
},true);

}());