// ==UserScript==
// @name           Cahoot Webcard enabler
// @namespace      http://ashbysoft.com
// @description    Creates Gecko engine compatible embed tag for Cahoot webcard
// @include        https://ibank.cahoot.com/orbis/webcard/slimclient.html
// ==/UserScript==

// First find the OBJECT tag
var obj = document.getElementById("webcard");

// check it and build compatible OBJECT tag
if (obj) {
	GM_log ("Found webcard - creating compatible Object");
	var emb = document.createElement("object");
	emb.type = "application/x-shockwave-flash";
	emb.id = obj.id;
	emb.name = obj.id;
	emb.width = obj.width;
	emb.height = obj.height;
	// dummy the SetVariable method.. it seems not to do anything useful..
	emb.SetVariable = function(ver, val) { GM_log('SetVariable:' + ver +'=' + val); };
	emb.innerHTML = "<param name=\"swLiveConnect\" value=\"true\">";
	emb.data = "cahoot.swf?langcode=en&slim=false&insideslim=false&formfill=false&base=&cfg=mycards_ie.txt";
	// replace object with compatible one.. and it works :)
	obj.parentNode.replaceChild(emb, obj);
}
