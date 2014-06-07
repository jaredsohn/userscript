// ==UserScript==
// @name           Redirect to last page on Orkut Forum!
// @version        1.0 Date: 12/05/2010
// @author         Prashant P Patil
// @profile        http://www.orkut.co.in/Profile?uid=17618220612205038709
// @scripturl      
// @Siteurl       https://www.chat32.com/
// @namespace      Redirects you to last page of forum topics!
// @description    This scripts redirects you from first page to last page after replying to any topic!
// @include        http://www.orkut.*
// ==/UserScript==


function on_ld(){
	var d = decodeURI(window.location); 
	var lp = d.split("na="); 
	var rwa_lp = lp[1]; 
	var lpn = rwa_lp.split("&"); 
	var flp = lpn[0];
	
	if(flp == "4"){
	var new_url = lp[0];
	window.location = new_url+"na=2";
	}

}

document.body.onload = on_ld();