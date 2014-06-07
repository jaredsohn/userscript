// ==UserScript==
// @name           FireDogLake ignore list
// @namespace      http://www.adjustablelabs.info/projects/fdl-ignorelist
// @description    Hides comments written by selected users.
// @include        http://*.firedoglake.com/*
// @include        http://firedoglake.com/*
// ==/UserScript==

var $ = unsafeWindow.$;

var fdl_ign_blocks = GM_getValue ("hides");


function fdl_ign_cleanup() {
	$(".comment").removeClass("fdl_ign_ fdl_ign_hide fdl_ign_dim");
	$(".comment").each (fdl_ign_cleanupOne);
}

function fdl_ign_cleanupOne () {
	var n = this.id.split ("-")[1];
	var user = document.getElementById("commentAuthor-" + n).innerHTML;
	
	if (fdl_ign_blocks [user]) {
		$(this).addClass ("fdl_ign_").
				addClass ("fdl_ign_" + fdl_ign_blocks[user]);
	}
}

function fdl_ign_toggleControls (event) {
	var ctls = document.getElementById ("fdl_ign_controls");
	ctls.style.display = (ctls.style.display ? '' : 'none');
	return true;
}

var respond = document.getElementById("Respond");
if (!document.getElementById ("fdl_ign_controls")) {
	var link = document.createElement ("div");
	respond.parentNode.insertBefore (link, respond.nextSibling);

	var linky = document.createElement ("a");
	linky.href = "javascript:;";
	linky.addEventListener ('click', fdl_ign_toggleControls, true);
	linky.appendChild (document.createTextNode ("Ignore list options >>"));
	linky.style.align = "center";

	link.appendChild (linky);

	var ctls = document.createElement ("div");
	ctls.id = "fdl_ign_controls";
	ctls.style.display = "none";
	ctls.style.border = "2px dashed #98b1c9";
	ctls.style.margin = "3px";

	ctls.innerHTML = 
'<div>Enter users to hide, one per line.  Precede username with "dim:" to'+
'fade users&apos; posts instead of hiding altogether.</div>'+
'<div>'+
'  <textarea id="fdl_ign_names" rows="7" cols="30"></textarea>'+
'  <br><input id="fdl_ign_save" type="button" value="Save ignore info">'+
'</div>'+
'<style type="text/css">'+
'.fdl_ign_hide .commentBody,.commentReply {'+
'	display: none;'+
'}'+
'.fdl_ign_dim .commentBody {'+
'	opacity: 0.3;'+
'}'+
'</style>';
	link.appendChild (ctls);

	document.getElementById("fdl_ign_save").addEventListener (
		'click', fdl_ign_formToConfig, true
	);
	fdl_ign_configToForm ();
}

function fdl_ign_formToConfig () {
	var items = document.getElementById("fdl_ign_names").value;
	var spl = items.split("\n");
	fdl_ign_blocks = { };
	for (var i = 0; i < spl.length; i++) {
		var ln = spl[i].split (":").reverse ();
		if (!ln[1])
			ln[1] = 'hide';
		fdl_ign_blocks[ln[0].trim()] = ln[1].trim().toLowerCase ();
	}
	GM_setValue ("hides", JSON.stringify(fdl_ign_blocks));
	fdl_ign_cleanup ();
	return true;
}

function fdl_ign_configToForm () {
	var hides = GM_getValue ("hides");
	if (hides)
		fdl_ign_blocks = JSON.parse (hides);

	var names = [];
	for (var k in fdl_ign_blocks) {
		v = fdl_ign_blocks [k];
		names.push ([k, v]);
	}
	names.sort (function (a,b) {
		return (a[0] < b[0] ? -1 :
			(a[0] > b[0] ? 1 : 0))
	});
	var ntext = "";
	for (var i = 0; i < names.length; i++) {
		var name = names[i];
		if (name[1] != 'hide')
			ntext += name[1] + ":" + name[0];
		else
			ntext += name[0];
		ntext += "\n";
	}
	document.getElementById ("fdl_ign_names").value = ntext;
}


fdl_ign_cleanup();

