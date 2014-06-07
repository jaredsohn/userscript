// ==UserScript==
// @name            Politiken.dk video enhancer
// @namespace       http://userscripts.org/users/485730
// @icon            http://politiken.dk/favicon.ico
// @description     Enhanced video player on Politiken.dk
// @include         http://politiken.dk/poltv/*
// @match           http://politiken.dk/poltv/*
// @version         1.2
// ==/UserScript==

ScriptTags = document.getElementsByTagName('script');
try{
	movieUrl = ScriptTags[16].childNodes[0].nodeValue.split("src='")[1].split("'")[0];
}catch(err){
	for(i=0; i<ScriptTags.length; i++){
		for(n=0; n<ScriptTags[i].childNodes.length; n++){
			if(ScriptTags[i].childNodes[n].nodeValue.indexOf("<video") != -1){
				movieUrl = ScriptTags[i].childNodes[n].nodeValue.split("src='")[1].split("'")[0];
			} //if
		} //for n
	} //for i
} //try


var mArr = movieUrl.split("_");
for(i=0; i<mArr.length; i++){
	if(mArr[i].length <= 9 && mArr[i].indexOf("x") != -1){
		var mWidth = parseInt(mArr[i].split("x")[0]);
		var mHeight = parseInt(mArr[i].split("x")[1]);
	}
}
mWidth = (mWidth > 0 ? mWidth : 620);
mHeight = (mHeight > 0 ? mHeight : 370);

var mHTML = "<video width='"+mWidth+"' height='"+mHeight+"' src='"+movieUrl+"' controls='controls' autoplay='autoplay' />";

//$p('#player_container').html(mHTML);

document.getElementById("player_container").innerHTML = mHTML;
