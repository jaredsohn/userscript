// ==UserScript==
// @name           ikariam collapse
// @namespace      ikaH3Hide
// version         0.1
// @description    Custom collapse boxes in ikariam
// @include        http://s*.de.ikariam.com/index.php*
// @exclude        http://support*
// ==/UserScript==

// update part 
//-----------------------------------------------------------------------------
var scriptName = "Collapse"
var scriptID = 101960;
var thisVersion="0.1";
var update = "all" // change this if minor updates should be notified


function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = thisVersion; //GM_getValue("newestVersion","");
	var time="";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = /\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("lastUpdateCheck", time);
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
	};
	var needsUpdate;
	if (update == "system") { needsUpdate = (thisVersion.split(".")[0]) != (newestVersion.split(".")[0]) }
	else { needsUpdate = thisVersion != newestVersion }
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>' }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>' };
	return innerHTML;
};

function showScriptLink() {
	// do not waste space if the script is not used
	// show link when the skript is used on this page, but only once
	if (document.getElementById(scriptName)) return;
	var div = document.createElement('div');
	div.className = "dynamic";
	div.id = scriptName;
	div.innerHTML = '<div class="content"><p class="centerButton">'+linkForUpdate()+'</p></div>';
	var breadcrumbs = document.getElementById("breadcrumbs");
	breadcrumbs.parentNode.insertBefore(div,breadcrumbs);
}

// collapse functions
//-----------------------------------------------------------------------------

var sButton = '[+]';
var hButton = '[-]';

function hideH(headerNode) {
	// hide everything that follows the header node
	showScriptLink();
	var node = headerNode.nextSibling;
	while (node) {
		var hidden= document.createElement('hidden');
		var nextNode=node.nextSibling;
		node.parentNode.replaceChild(hidden,node);
		hidden.appendChild(node);
		node = nextNode;
	};
};

function showH(headerNode) {
	// show everything that follows the header node (aka undo hide)
	var hidden = headerNode.parentNode.getElementsByTagName("hidden");
	for (var i=0;i<hidden.length; ) {
		var node = hidden[i].firstChild;
		headerNode.parentNode.removeChild(hidden[i]);
		headerNode.parentNode.appendChild(node);
	}
};

function toggle(event) {
	// hide or show - check and change
	var span = event.target;
	var h3 = span.parentNode;
	if(span.innerHTML==sButton) {
		GM_setValue(span.id,hButton);
		span.innerHTML=hButton;
		showH(h3);
	}
	else {
		GM_setValue(span.id,sButton);
		span.innerHTML=sButton;
		hideH(h3);
	}
};

function augment(hNode,i) {
	// augment the header node 
	// id to distinguish multiple header nodes with the same name on the same page
	var id='hide_'+i+hNode.textContent.replace(/[\s|\d]/g,'');
	var button = GM_getValue(id,hButton);
	hNode.innerHTML+=' <span id="'+id+'">'+button+'</span>';
	document.getElementById(id).addEventListener("click", toggle, true);
	// initital hide if variable is set
	if (button==sButton) {
		hideH(hNode);
	}
}

function mainHide() {
	// hide all the useless boxes
	GM_addStyle('#viewCityImperium *, #viewMilitaryImperium *, #viewDiplomacyImperium *, #premiumOffer tbody {display: none;}');
	// each <hidden/> will contain a hidden node
	GM_addStyle( "hidden { display: none !important;}" );
	var view=document.body.id;
	var h=document.getElementsByTagName("h3");
	for (var i=1; i<h.length; i++) augment(h[i],view+i); //never the first
	// the transport h4 are anoying, too
	if (view=="transport") {
		h=document.getElementsByTagName("h4");
		for (var i=0; i<h.length; i++) augment(h[i],view+i);
	};
};

mainHide();