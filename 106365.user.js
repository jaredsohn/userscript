
	// ==UserScript==

	// @name AutoClick highlighter

	// @namespace http://diveintomark.org/projects/greasemonkey/

	// @description hover over links for 0.5 seconds to open in a new tab

	// @include http://*

	// ==/UserScript==


//Open offsite links in new window script- http://www.dynamicdrive.com/
//Created: August 28th, 2007'

var ddwindowlinks={
//1)Enter domains to be EXCLUDED from opening in new window:
excludedomains: ["dynamicdrive.com", "google.com"],

//2) Target for links that should open in a new window (ie: "_blank", "secwin" etc):
linktarget: "Grakk
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1143411884&wid=53
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1143411884&wid=57
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1143411884&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1143411884&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1143411884&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1143411884&wid=286
 
 
Rocko
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1438840791&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1438840791&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1438840791&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1438840791&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1438840791&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1438840791&wid=286
 
 
Domasch
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000497639161&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000497639161&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000497639161&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000497639161&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000497639161&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000497639161&wid=286
 
 
Craig
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=286
 
 
P-40
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=797477484&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=797477484&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=797477484&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=797477484&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=797477484&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=797477484&wid=286
 
 
Your_Master
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001998342647&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001998342647&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001998342647&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001998342647&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001998342647&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001998342647&wid=286
 
 
Andy
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1406926943&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1406926943&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1406926943&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1406926943&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1406926943&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1406926943&wid=286
 
 
Dimsah
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002372776260&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002372776260&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002372776260&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002372776260&wid=196
DiVinci>>yet to be in game
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002372776260&wid=286
 
 
Craig
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1303316371&wid=286
 
 
Amir
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1698557890&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1698557890&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1698557890&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1698557890&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1698557890&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1698557890&wid=286
 
 
GWAR
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000518281786&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000518281786&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000518281786&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000518281786&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000518281786&wid=242
Pharaoh>>Yet to be entered
 
 
Nicholas
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000902086480&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000902086480&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000902086480&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000902086480&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000902086480&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000902086480&wid=286
 
 
Nyabinghi
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000119496439&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000119496439&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000119496439&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000119496439&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000119496439&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000119496439&wid=286
 
 
prnstr666
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=743638119&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=743638119&wid=53
Lyatt>>Yet to be entered
Megasoma>>Yet to be entered
DiVinci>>Yet to be entered
Pharaoh>>Yet to be entered
 
 
Chance
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000726430563&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000726430563&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000726430563&wid=194
Megasoma>>Yet to be entered
DiVinci>>Yet to be entered
Pharaoh>>Yet to be entered
 
 
Phil
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1808997705&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1808997705&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1808997705&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1808997705&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1808997705&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=1808997705&wid=286
 
 
 
Iken
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002465861850&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002465861850&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002465861850&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002465861850&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002465861850&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002465861850&wid=286
 
 
Diseased Spirit
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001198390012&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001198390012&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001198390012&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001198390012&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001198390012&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001198390012&wid=286
 
 
Warin
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000888647087&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000888647087&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000888647087&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000888647087&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000888647087&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100000888647087&wid=286
 
 
Jrsqual
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=41504765&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=41504765&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=41504765&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=41504765&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=41504765&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=41504765&wid=286
 
 
Agrowrath
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001320630255&wid=57
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001320630255&wid=53
Lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001320630255&wid=194
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001320630255&wid=196
DiVinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001320630255&wid=242
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001320630255&wid=286
 
 
Brayden
Stag>>Yet to be entered
Scarab>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100001594517603&wid=53
Lyatt>>Yet to be entered
Megasoma>>Yet to be entered
DiVinci>>Yet to be entered
Pharaoh>>Yet to be entered
 
 
Minminotaur(none activated)
Stag>>
Scarab>>
Lyatt>>
Megasoma>>
DiVinci>>
Pharaoh>>
 
 
Tyler(none activated)
Stag>>
Scarab>>
Lyatt>>
Megasoma>>
DiVinci>>
Pharaoh>>
 
 
Basic layout
Stag>>
Scarab>>
Lyatt>>
Megasoma>>
DiVinci>>
Pharaoh>>
 
 
Reese
Pharaoh>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002521598683&wid=286
Davinci>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002521598683&wid=242
Megasoma>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002521598683&wid=196
lyatt>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002521598683&wid=194
Stag>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002521598683&wid=57
scarab titan>>http://www.ageofchampions.com/game/gift_accept.php?source=190&sourceu=100002521598683&wid=53
 
Jerry
http://tinyurl.com/Jerry-Scarab
http://tinyurl.com/Jerry-Lyatt
http://tinyurl.com/Jerry-Megasoma
http://tinyurl.com/Jerry-Da-vinci
http://tinyurl.com/Jerry-pharaoh
http://tinyurl.com/Jerry-stag
 
Thomas Busch
http://tinyurl.com/Thomas-Scarab-Titan
http://tinyurl.com/Thomas-Stag
http://tinyurl.com/Thomas-Lytta-Magister
http://tinyurl.com/Thomas-megasoma
http://tinyurl.com/Thomas-Da-Vinci
http://tinyurl.com/Thomas-Pharaoh
 
Tophe:
http://tinyurl.com/tophe-scarab
http://tinyurl.com/tophe-stag
http://tinyurl.com/tophe-Lytta
 http://tinyurl.com/tophe-Megasoma
http://tinyurl.com/tophe-Da-Vinci
http://tinyurl.com/tophe-Pharaoh",

//3) Specify operating mode ("auto" or "manual"):
mode: "auto",

//4) If mode is "manual", customize checkbox HTML to show to users (Preserve id attribute):
toggleHTML: '<form><input type="checkbox" id="targetcheckbox" checked="checked" /><label for="targetcheckbox">Open off-site links in new window?</label></form>',

//5) If mode is "manual", enable user persistence so the state of the checkbox is remembered?
persist: true,

assigntarget:function(){
	var rexcludedomains=new RegExp(this.excludedomains.join("|"), "i")
	var all_links=document.getElementsByTagName("a")
	if (this.mode=="auto" || (this.mode=="manual" && this.togglebox.checked)){
		for (var i=0; i<=(all_links.length-1); i++){
			if (all_links[i].hostname.search(rexcludedomains)==-1 && all_links[i].href.indexOf("http:")!=-1)
				all_links[i].target=ddwindowlinks.linktarget
		}
	}
	else{
		for (var i=0; i<=(all_links.length-1); i++)
			all_links[i].target=""
	}
	if (this.mode=="manual" && this.persist)
		this.setCookie("dlinktarget", (this.togglebox.checked)? "yes" : "no", 30) //remember user setting for 30 days (set to -1 then reload page to erase cookie)
},

init:function(){
	if (document.getElementById && this.mode=="manual"){
		document.write(this.toggleHTML)
		this.togglebox=document.getElementById("targetcheckbox")
		this.togglebox.onclick=function(){ddwindowlinks.assigntarget()}
		if (this.persist && this.getCookie("dlinktarget")!="")
			this.togglebox.checked=(this.getCookie("dlinktarget")=="yes")? true : false
	}
	if (window.addEventListener)
		window.addEventListener("load", function(){ddwindowlinks.assigntarget()}, false)
	else if (window.attachEvent)
		window.attachEvent("onload", function(){ddwindowlinks.assigntarget()})
},

getCookie:function(Name){
	var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
	if (document.cookie.match(re)) //if cookie found
		return document.cookie.match(re)[0].split("=")[1] //return its value
	return ""
},

setCookie:function(name, value, days){
	var expireDate = new Date()
	//set "expstring" to either an explicit date (past or future)
		var expstring=expireDate.setDate(expireDate.getDate()+parseInt(days))
		document.cookie = name+"="+value+"; expires="+expireDate.toGMTString()+"; path=/"
}

}

ddwindowlinks.init()