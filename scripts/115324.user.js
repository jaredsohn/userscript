// ==UserScript==
// @name           Dojo Integration Test
// @namespace      test
// @description    Proof Of Concept To Integrate Dojo And Greasemonkey
// @include        *
// ==/UserScript==
 
function startup(){
	dojo = unsafeWindow["dojo"];
	dijit = unsafeWindow["dijit"];
 
	dojo.addClass(dojo.body(), 'tundra');
	dojo.require("dijit.Dialog");
 
	//Don't do anything until "Dijit.Dialog" has been loaded
	dojo.addOnLoad(function(){
		//Actually Create The Dialog
		new dijit.Dialog({
			id: 'test',
			title: "Dojo Integration Test",
			content: 'Dojo lives... In Greasemonkey'
		});
 
		dijit.byId('test').show();
	});
};
 
//include flags to djConfig to tell dojo its being used after its been loaded
unsafeWindow.djConfig = {
	afterOnLoad: true,
	addOnLoad: startup
};
 
//Include Dojo from the AOL CDN
var script = document.createElement('script');
script.src="http://o.aolcdn.com/dojo/1.4/dojo/dojo.xd.js.uncompressed.js";
document.getElementsByTagName('head')[0].appendChild(script);
 
//Include the Tundra Theme CSS file
var link = document.createElement('link');
link.rel = "stylesheet";
link.type= "text/css";
link.href="http://o.aolcdn.com/dojo/1.4/dijit/themes/tundra/tundra.css";
document.getElementsByTagName('head')[0].appendChild(link);