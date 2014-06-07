// ==UserScript==
// @name           fm4 nostalgia
// @namespace      http://zero.greynine.at/greasemonkey
// @author         deus  --  http://my.orf.at/deus
// @author         greasefury  --  http://my.orf.at/greasefury
// @description    use verdana font for relaunched fm4.orf.at
// @version        0.3.1 (2009-05-21)
// @include        http://fm4.orf.at/*
// ==/UserScript==

var SUC_script_num = 40972; // for function updateCheck()
var version_timestamp = 1242744681389; // for function (older versions of) updateCheck()  (to be removed with succeding version)

var scriptVersion = "0.3.1";
var modifiedPage = false;

function _fm4_nostalgia() {
	addRetroIcon();
	injectPage();
}
window.addEventListener("load", function() { _fm4_nostalgia(); }, false);
// add style immediatly. prevents visible font change after page display.
addGlobalStyle('.ss { font-family: verdana !important; }\n.ss #navigation a { letter-spacing:0.01em; !important; }');
if (GM_xmlhttpRequest) {
  GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);});
}

function addGlobalStyle(css) {
	var header = document.getElementsByTagName('head')[0];
	if (header) { 
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		header.appendChild(style);
	}
	return;
}

// adds one of the old icons to the forum disclaimer text
function addRetroIcon() {
/* http://fm4v2.orf.at/static/img/
notesicon_11.gif  ' pong ; notesicon_12.gif ' pacman ; notesicon_13.gif ' two wins ; notesicon_14.gif ' tic tac toe ; notesicon_15.gif ' tetris
*/
	var random = Math.ceil( Math.random() * 5 );
	var icon = document.createElement("img");
	icon.src = "http://fm4v2.orf.at/static/img/notesicon_1"+ random +".gif";
	icon.alt = "";
	icon.style.cssFloat = "left";
	icon.style.margin = "2px 5px 5px 1px"; // top right bottom left
	icon.title = "have a nice day! (fm4 enhancer)"; 
	icon.style.cursor = "crosshair";
	var target = document.getElementById("forum_disclaimer");
	if (target) {
		var paragraphs = target.getElementsByTagName("p");
		if (paragraphs) {
			if (paragraphs.length > 0 ) {
				target.insertBefore(icon,paragraphs[0]);
				modifiedPage = true;
			}
		}
	}
	return;
}

function createLink( href, title, tipText ) {
	var link = document.createElement("a");
	if (href.length > 0) { 
		link.href = href; 
	}
	if (tipText.length > 0) { 
		link.title = tipText; 
	}
	if (title.length > 0) { 
		link.appendChild( document.createTextNode( title ) );
	}
	return link;
}

function injectCSS() {
	if (!modifiedPage) { return false };

	addGlobalStyle(".nostalgiaSignature {\n" +
		"  font-family: verdana,arial,helvetica,sans-serif;\n" +
		"  font-style: normal;\n" +
		"  font-size: 0.6em;\n" +
		"  line-height: 0.8em;\n" +
		"  margin-top: 0px;\n" +
		"  margin-bottom: 2px;\n" +
		"  padding: 1px;\n" +
		"}\n");
}

function injectPage() {
	injectSignature();
	injectCSS();
}

function injectSignature() {
	if (!modifiedPage) { return false };

	var signature = document.createElement('p');
	signature.className = "nostalgiaSignature";
	signature.appendChild(document.createTextNode(" |::: this page has been enhanced by "));
	signature.appendChild(createLink("http://userscripts.org/scripts/show/40972","fm4 nostalgia", ""));
	signature.appendChild(document.createTextNode(" (v"+ scriptVersion +")"));
	signature.appendChild(document.createTextNode(". a greasemonkey userscript by "));
	var vcLink = createLink("http://my.orf.at/greasefury","greasefury","VauKah von greasefury");
	if (location.href.indexOf("http://fm4v2.orf.at") == 0) {
		vcLink.setAttribute("onclick", "openVC('greasefury');return false;");
	} else if(location.href.indexOf("http://my.orf.at") == 0) {
		// donothing.
	} else {
		vcLink.setAttribute("rel","visitingcard");
		vcLink.setAttribute("onclick", "var href=$(this).attr(\"href\");globalPopup(href,440,490);return false;");
	}
	signature.appendChild( vcLink );
	signature.appendChild(document.createTextNode("."));
	document.body.appendChild( signature );
	return true;
}


// ==== THIRD PARTY SOURCE CODE =====

/*
Script Update Checker [04/29/09], written by Jarett
Code to add to any Greasemonkey script to let it check for updates.
http://userscripts.org/scripts/show/20145
// NOTES:
// Feel free to copy this into any script you write; that's what it's here for. A credit and/or URL back to here would be appreciated, though.
// I was careful to use as few variables as I could so it would be easy to paste right into an existing script. All the ones you need to set are at the very top.
// The target script needs to be uploaded to a permanent place, preferably userscripts.org. The update checks will -not- increase the install count for the script there.
// Remember to change the version_timestamp every time the script is updated. Really.
// This script is set up to check for updates to itself by default. It may be a good idea to leave it like this; I update my scripts much too often.
*/
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}