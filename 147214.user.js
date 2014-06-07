// ==UserScript==
// @name            EB.dk video enhancer
// @namespace       http://userscripts.org/users/485730
// @icon            http://ekstrabladet.dk/favicon.ico
// @description     Enhanced video player on EB.dk
// @include         http://ekstrabladet.dk/*
// @match           http://ekstrabladet.dk/*
// @include         http://eb.dk/*
// @match           http://eb.dk/*
// @version         0.9.2.3B
// ==/UserScript==
window.setTimeout( // NOTICE: THIS SCRIPT DOESN'T WORK AS OF YET.
					// BEMÆRK: DETTE SCRIPT VIRKER IKKE ENDNU.
					// HJÆLP MIG GERNE MED AT FINDE EN LØSNING PÅ EB's NYE ***** DESIGN
(function EBenhancer(){
var d = document;
var objs = d.getElementsByTagName('object');
console.log("has "+objs.length+" object(s)");
if(objs.length > 0){ // Do we have objects?
	for(i=0; i<objs.length; i++){ // Lets find the video in the DOM
		console.log("looking at object: "+objs[i].id);
		if(objs[i].id.toLowerCase().indexOf('tvcontainer') !== -1){ // Wee!
			console.log("has found video: "+objs[i].id);
			// Lets find the movie src
			var flashvars = d.getElementsByName("flashvars");
			if(flashvars.length > 0){  // Do we have flashvars?
				for(ii=0; ii<flashvars.length; ii++){ // Yes, so lets find the one we need
					console.log("looking at flashvars = "+flashvars[ii].value);
					if(flashvars[ii].value.substring(0,4) == 'feed'){
						var movieSrc = decodeURIComponent(flashvars[ii].value).replace('feed=', '');
						console.log("has found movie src = "+movieSrc);
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://ekstrabladet.dk'+movieSrc,
							onload: function(response){
								console.log("got response: "+response.responseText);
								var xmlArr = response.responseText.split('\n'); // why doesn't "\r\n" work?!
								var xmlArrLen = xmlArr.length;
								for(var line=0; line<xmlArrLen; line++){
									if(xmlArr[line] == '<clips>'){
										var xmlLine = xmlArr[line+1]; // clip is at next line
										if(xmlLine.indexOf('large=') != -1){
											xmlLineAtBegin = xmlLine.indexOf('large=')+7; // 7 = length of: large="
											xmlLineAtEnd = xmlLine.indexOf('.mp4', xmlLineAtBegin)+4; // 4 = length of: .mp4
											//var tvcontainer_new = document.createElement('video');
											//tvcontainer_new.src = decodeURIComponent(xmlLine.slice(xmlLineAtBegin, xmlLineAtEnd)); // <-- URL to video
											//tvcontainer_new.controls = true; // we like
											//document.body.appendChild(tvcontainer_new);
											//tvcontainer_new.setAttribute('name', 'tvcontainer_new'); // TODO: use 'id' instead? (for styling)
											console.log("has found video: "+decodeURIComponent(xmlLine.slice(xmlLineAtBegin, xmlLineAtEnd)));
											objs[i].innerHTML = '<video src="'+decodeURIComponent(xmlLine.slice(xmlLineAtBegin, xmlLineAtEnd))+'" controls="controls" autoplay="autoplay"></video>';
											console.log("has created html player");
											break; // stop looping trou' all xml-lines (line)
										}//else if(xmlLine.indexOf("normal") != -1){
											// needed?
										//}
									} // if line = <clips>
								} // XML response for every line
							} // GM response
						}) // GM request
						break; // stop looping trou' all flashvars (ii)
					}
				}
			}
			break; // stop looping trou' all objects (i)
		}
	}
}
console.log("Stopping");
})()
, 2000);