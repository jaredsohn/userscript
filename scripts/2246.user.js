// Made by Jero
// Version 1.0, 01.12.2005
//
// ==UserScript==
// @name		MyDiscogsCollection v1.0
// @namespace		http://www.x-t-t.com
// @description	See 	your own collection in the label page
// @include		http://www.discogs.com/label/*
// @include		http://discogs.com/label/*
// ==/UserScript==

var a=document.getElementsByTagName("TR");
var cot=0;
var e, e2;
while(cot<1000){
	cot++;
	try{
		var alen=a[cot].innerHTML;
	}
	catch(e){
		var alen="none";
		break;		
	}
	if(alen!="none"){
		try{
			var link=alen.split("/release/")[1].split('"')[0];
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://www.discogs.com/release/"+link,
				onload: OnLoad,
				onerror: OnError
			});
			
		}
		catch(e2){
		}
	}
	
}

function OnLoad(responseDetails){
	var dom=responseDetails.responseText;
	var re=/In&nbsp;Collection&nbsp;/i;
	if(dom.match(re)){
		var relno=dom.split("release_id=")[1].split('"')[0];
		var re2=eval("/"+relno+"/i");		

		var a2=document.getElementsByTagName("TR");
		var cot2=0;
		var e3;
		while(cot2<1000){
			cot2++;
			try{	
				var a3=a2[cot2].innerHTML;
				if(a3.match(re2)){
					a2[cot2].style.backgroundColor="#00ff00";
				}
			}
			catch(e3){
				break;
			}
		}
	}
}

function OnError(responseDetails){
	alert("Error");
}