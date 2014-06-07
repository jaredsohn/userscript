// ==UserScript==
// @name           Uploaded.to Hide Ads
// @namespace      http://
// @description    Automatically hide the moving ads
// @include        http://*uploaded.to/*
// @author		   bosam
// ==/UserScript==

/*
 You are tired of that inner popup showing on top of the download button on Uploaded.to ?
 
 That's the solution: It simply removes every javascript codes included in the website.
 Don't worry the download function still works.
 
 I coded a first version that dealt with random naming divs such as (roll, rollAd, close) in order to shut down the popup before it came, but that wasn't proper and that left a large hidden width that overloaded the browser width. I left the first version commented in case removing scripts is too intrusive or breaks the browsing experience.
 
 Cheers and download safe! :p
 
  - bosam
*/

function removeScript(body)
{
	reg = new RegExp('\\s*<script[^>]*>[\\s\\S]*?</script>\\s*','ig');
	
    return body.replace(reg,'');
}

var body = document.getElementsByTagName('body');

var script = body[0];
script.innerHTML = removeScript(script.innerHTML);

/* FIRST VERSION

// The website name its adverts divs as such rollAd and 4 random capital letters (ie: . At first i thought using regular expressions to catch those 4 random letters but i remembered that seeking the unchanged letter could be less painful for the browser.
//rollAdVNQX

var list_div = document.getElementsByTagName('div');

for (var i = 0; i < list_div.length; i++)
{
	var div = list_div[i];
	var id = new String(div.id);
	
	if (id.match('roll')){
		div.setAttribute('style', 'display: none');
		div.width = 0;
	}
	if (id.match('close')){
		div.setAttribute('style', 'display: none;');
	}
}
*/