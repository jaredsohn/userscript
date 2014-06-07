// ==UserScript==
// @name           LEON TNL Estimator Class/machaon saver
// @namespace      tag://kongregate
// @description    Save your options on LEON's TNL Estimator
// @author         YepoMax
// @version        0.2
// @date           03/13/2013
// @grant          None
// @include		   *leon-dotd.clanteam.com/pages/tnl.htm*
// @include		   *leon-dotd.clanteam.com/pages/tnl_mini.htm*
// ==/UserScript==


// Define the functions that save your options
function saveclass(){
	localStorage.setItem("lastclass",document.getElementById('current_class').selectedIndex);
}
function savemach(){
	localStorage.setItem("machused",document.getElementById("machaon_general_used").checked);
}

document.getElementById('current_class').addEventListener("change",saveclass,false);
document.getElementById("machaon_general_used").addEventListener("click",savemach,false);
if(localStorage.getItem("lastclass") !== null){document.getElementById('current_class').options[localStorage.getItem("lastclass")].selected = true;}
if(localStorage.getItem("machused") !== null){document.getElementById("machaon_general_used").checked = JSON.parse(localStorage.getItem("machused"))}