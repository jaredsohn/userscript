// ==UserScript==
// @name        IRToolbar
// @namespace   tc
// @description IR Toolbar
// @include     http://generator.cxo.name/exec/*
// @version     18.10.2013 13:40
// @grant       none
// ==/UserScript==

if(window.location.href.match(/\/login\.pl$/)) {
	TuneLogo();
} else {

	var zNode       = document.createElement ('div');
	zNode.innerHTML = 
			  '<button id="irtbBtnGeizhals" type="button">GH</button>'
			+ '&nbsp;'
			+ '<button id="irtbBtnTransformation" type="button">Transformation</button>'
			+ '&nbsp;'
			+ '<button id="irtbBtnFreigabe" type="button">Freigabe</button>'
			+ '&nbsp;'
			+ '<button id="irtbBtnBulk" type="button">Bulk edit</button>'
		;

	zNode.setAttribute('id', 'irtbContainer');
	zNode.setAttribute('style', 'position: absolute; top: 5px; left: 700px; width: 400px; height: 20px; z-index: 2000; display: block; padding: 5px; align: center;');
	document.body.appendChild (zNode);

	//--- Activate the newly added buttons
	document.getElementById ("irtbBtnGeizhals").addEventListener ("click", btnGeizhalsAction, false);
	document.getElementById ("irtbBtnTransformation").addEventListener ("click", actionTransformation, false);
	document.getElementById ("irtbBtnFreigabe").addEventListener ("click", actionFreigabe, false);
	document.getElementById ("irtbBtnBulk").addEventListener ("click", actionBulkEdit, false);
}


function TuneLogo() {
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var sel = 'img[alt="IR Versionslogo"]';
	$(sel).attr('src', 'http://testcenter/ir/login-logo.png');
}


function tpdbAction (scriptName, direkt)
{
    if(typeof (sid) == "undefined")
        sid = ir.mainmenu.sid;
	if(direkt) {
		var newtab = window.open("http://tpdb.cxo.name/exec/tpdb/" + scriptName
			+"?sid=" + sid, "_blank");
	} else {
		var newtab = window.open("http://tpdb.cxo.name/exec/tpdb/tpdb_main.pl?" 
			+"sid=" + sid 
			+ "&ir_script=" + scriptName, "_blank");
	}
}


function actionTransformation(zEvent)	{ tpdbAction("tpdb_transformation.pl");	}
function actionFreigabe(zEvent)			{ tpdbAction("tpdb_publikation.pl");	}
function actionBulkEdit(zEvent)			{ tpdbAction("produkte_conf.pl", true);	}


function btnBulkEditAction (zEvent)
{
	var debug = true;
	var currentSID = ir.mainmenu.sid;
	var newtab = window.open("http://tpdb.cxo.name/exec/tpdb/produkte_conf.pl?" 
		+"sid=" + currentSID, "_blank");
}


function btnGeizhalsAction (zEvent)
{
	var debug = false;
	
	var gh = tcGetText('_43739_2_0');				// preislink
	var model = tcGetText('_9_2_0');
	if(gh) {
		var newtab = window.open(gh, "_blank");
	} else {
		if(model) {
			var newtab = window.open("http://gh.de?fs="+model, "_blank");
		} else {
				var newtab = window.open("http://gh.de", "_blank");
		}
	}
}


function tcGetText(ids)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var sel = 'input[name^="IDx"][name$="' + ids + '"]';
	
	if(debug) {
		alert($(sel).attr("id") + ": " + $(sel).val());
	}
	return $(sel).val();
}

