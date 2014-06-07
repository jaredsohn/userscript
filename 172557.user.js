// ==UserScript==
// @name       IITC plugin: Ingress Codename to GUID plugin
// @version    0.1
// @description  Codename to GUID plugin in Ingress
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// @copyright  2012+, t2k269
// ==/UserScript==


function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.codenameToGUID = function() {};
    
window.plugin.codenameToGUID.convert = function() {
    document.getElementById("codenameToGUID_playerguid").value=window.playerNameToGuid(document.getElementById("codenameToGUID_playercodename").value);
}

window.plugin.codenameToGUID.setupUI = function() {
    $('#sidebar').append('<div><b>Codename to GUID<b><br/><input id="codenameToGUID_playercodename" style="width:100%;" placeholder="Type player name to convert to GUID" type="text"/><br/><input id="codenameToGUID_playerguid" style="width:100%;" placeholder="Player GUID" type="text" readonly/></div>');
	$('#codenameToGUID_playercodename').keyup(function(event) {
        window.plugin.codenameToGUID.convert();
	});
	$('#codenameToGUID_playercodename').change(function(event) {
        window.plugin.codenameToGUID.convert();
	});
}


var setup =  function() {
  window.plugin.codenameToGUID.setupUI();
}

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

