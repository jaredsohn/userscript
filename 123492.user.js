// ==UserScript==
// @name           Userscripts script install counter
// @namespace      http://m0.to/
// @description    Checks if a user's scripts have more/less installs/fans/posts than last time.
// @include        http://userscripts.org/users/*/scripts*
// @include        https://userscripts.org/users/*/scripts*
// @version        1.01
// ==/UserScript==

var m = document.getElementById("main");
var trs = m.getElementsByTagName("tr");

var userID = location.href.match(/\/users\/([0-9]+)\/scripts/)[1];
if(!localStorage)
	localStorage = {};
var scripts;
if(localStorage[userID+"-scripts"]&&JSON&&JSON.parse)
	scripts = JSON.parse(localStorage[userID+"-scripts"]);
else
	scripts = {};
	
function changed(oldVal,newVal){
	var div = document.createElement("div");
	div.className = "CHANGED";
	newVal = parseFloat(newVal);
	oldVal = parseFloat(oldVal);
	if(newVal>oldVal){
		div.style.color = "green";
		div.innerHTML += "+";
	}
	else{
		div.style.color = "red";
	}
	
	div.innerHTML += newVal-oldVal;
	return div;
}
function Script(tr){
	while(tr.getElementsByClassName('CHANGED')[0])
		tr.getElementsByClassName('CHANGED')[0].parentNode.removeChild(tr.getElementsByClassName('CHANGED')[0]);
	this.id = tr.getElementsByClassName("title")[0].href.match(/\/scripts\/show\/([0-9]+)/)[1];
	if(tr.getElementsByClassName("number")[0])
		this.rating = tr.getElementsByClassName("number")[0].innerHTML;
	this.posts = tr.getElementsByClassName("inv lp")[1].innerHTML;
	this.fans = tr.getElementsByClassName("inv lp")[2].innerHTML;
	this.installs = tr.getElementsByClassName("inv lp")[3].innerHTML;
	this.updated = tr.getElementsByClassName("updated")[0].title;
	
	if(scripts[this.id]){
		var other = scripts[this.id];
		if(other.rating)
			if(this.rating!=other.rating){
				tr.getElementsByClassName("inv lp")[0].appendChild(changed(other.rating,this.rating));
			}
		if(this.posts!=other.posts)
			tr.getElementsByClassName("inv lp")[1].appendChild(changed(other.posts,this.posts));
		if(this.fans!=other.fans)
			tr.getElementsByClassName("inv lp")[2].appendChild(changed(other.fans,this.fans));
		if(this.installs!=other.installs)
			tr.getElementsByClassName("inv lp")[3].appendChild(changed(other.installs,this.installs));
	}
	scripts[this.id] = this;
}

for(var i=1;i<trs.length;i++){
	new Script(trs[i]);
}

if(JSON&&JSON.stringify)
	localStorage[userID+"-scripts"] = (JSON.stringify(scripts));