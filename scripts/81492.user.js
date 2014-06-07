// ==UserScript==
// @name           GetIDs
// @namespace      Magistream
// @include        http://magistream.com/user/*
// ==/UserScript==


var name = document.createElement("textarea");
name.readOnly = true;
name.style.display = "block";
name.addEventListener('focus', function(){name.select();}, true);

var trs  = document.body.getElementsByClassName('row');
var linkListe = new Array();
var longString = "";
for(var i=0; i<trs.length; i++){
	var test = trs[i].getElementsByClassName('usercol2');
	if(!test[2].firstChild.data.match(/Frozen/)){
		var myString = test[0].firstChild;
		myString = myString.toString().split("/")[4];
		linkListe.push(myString);
	}
}

for(var i=0; i<linkListe.length; i++){
	longString = longString+linkListe[i]+",";
}
name.value=longString;

var marker  = document.getElementById('keeptabs');

marker.insertBefore(name, marker.firstChild);

name.focus();