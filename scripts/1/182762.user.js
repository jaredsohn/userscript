// ==UserScript==
// @id             iitc-plugin-highlight-by-energy-and-list-my-portals@Garzon
// @name           IITC plugin: Highlight by Energy and List My Portals 
// @updateURL      https://userscripts.org/scripts/source/182762.meta.js
// @downloadURL    https://userscripts.org/scripts/source/182762.user.js
// @author         Garzon
// @category       Highlighter
// @version        0.1.2.20131112
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @grant          none
// ==/UserScript==


function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};



// PLUGIN START ////////////////////////////////////////////////////////
    
// use own namespace for plugin

window.plugin.myPortalAndEnergy = function() {};
window.plugin.myPortalAndEnergy.isprinted = {};
window.plugin.myPortalAndEnergy._isinjected = false;
window.plugin.myPortalAndEnergy.printedCounter = -1 ;
window.plugin.myPortalAndEnergy.printedPortalsGroupId = 0 ;

window.plugin.myPortalAndEnergy.groupNumber = function(){
    if(window.plugin.myPortalAndEnergy.printedCounter == -1) return 0;
    return Math.floor(window.plugin.myPortalAndEnergy.printedCounter/10);
}
window.plugin.myPortalAndEnergy.refreshMyPortal = function(data){
    
    var d = data.portal.options.details;
    var portalWeakness = 1.0 - (getCurrentPortalEnergy(d)*1.0/getTotalPortalEnergy(d));
    
    if(window.plugin.myPortalAndEnergy.isprinted[data.portal.options.guid] == null){ 
        window.plugin.myPortalAndEnergy.printedCounter++;
        window.plugin.myPortalAndEnergy.isprinted[data.portal.options.guid] = { groupId: window.plugin.myPortalAndEnergy.groupNumber(), data: data , isnotshowed: true }; 
    }
    if(window.plugin.myPortalAndEnergy.isprinted[data.portal.options.guid].groupId == window.plugin.myPortalAndEnergy.printedPortalsGroupId && window.plugin.myPortalAndEnergy.isprinted[data.portal.options.guid].isnotshowed){
          document.getElementById("garzonsPortalList").innerHTML+='<li class="bkmrk" id="garzonsPortalList'+data.portal.options.guid+'"><a class="bookmarksRemoveFrom" onclick="window.plugin.myPortalAndEnergy.removeFromList(\''+data.portal.options.guid+'\');return false;">X</a><a class="bookmarksLink" onclick="window.zoomToAndShowPortal(\''+data.portal.options.guid+'\', ['+d.locationE6.latE6*1.0/1000000+','+d.locationE6.lngE6*1.0/1000000+']);return false;">['+Math.round((1.0-portalWeakness)*100)+'%]'+d.portalV2.descriptiveText.TITLE+'</a></li>';
          window.plugin.myPortalAndEnergy.isprinted[data.portal.options.guid].isnotshowed = false;
    }
}
window.plugin.myPortalAndEnergy.refreshList = function(){
    document.getElementById("garzonsPortalList").innerHTML = "";
    $.each(window.plugin.myPortalAndEnergy.isprinted,function(guid,portalData){
        portalData.isnotshowed = true;
        window.plugin.myPortalAndEnergy.refreshMyPortal(portalData.data);
    });
}
window.plugin.myPortalAndEnergy.removeFromList = function(guid){
    if(guid == ""){
        $.each(window.plugin.myPortalAndEnergy.isprinted,function(guid,portalData){
            portalData.groupId = -1;
        });
        window.plugin.myPortalAndEnergy.printedCounter = -1;
        window.plugin.myPortalAndEnergy.printedPortalsGroupId = 0;
    }else{
        var p = window.plugin.myPortalAndEnergy.isprinted[guid].groupId;
        window.plugin.myPortalAndEnergy.isprinted[guid].groupId = -1;
        while(p < window.plugin.myPortalAndEnergy.groupNumber()){
            $.each(window.plugin.myPortalAndEnergy.isprinted,function(guid,portalData){
                if(portalData.groupId == p + 1){
                    portalData.groupId--;
                    p++;
                }
            });
        }

        window.plugin.myPortalAndEnergy.printedCounter--;
        if(window.plugin.myPortalAndEnergy.printedPortalsGroupId > window.plugin.myPortalAndEnergy.groupNumber()){
            window.plugin.myPortalAndEnergy.printedPortalsGroupId = window.plugin.myPortalAndEnergy.groupNumber();
        }
    }
    window.plugin.myPortalAndEnergy.refreshList();
}
window.plugin.myPortalAndEnergy.resetList = function(){
	document.getElementById("garzonsPortalList").innerHTML = "";
    window.plugin.myPortalAndEnergy.printedCounter = -1 ;
    window.plugin.myPortalAndEnergy.printedPortalsGroupId = 0 ;
	window.plugin.myPortalAndEnergy.isprinted = {};
    window.resetHighlightedPortals();
    alert("Successfully reset the list of your portals.");
}  
window.plugin.myPortalAndEnergy.setDeltaPage = function(dir){
    var newPage = Math.round(dir) + window.plugin.myPortalAndEnergy.printedPortalsGroupId;
    if(newPage >= 0){
        if(newPage <= window.plugin.myPortalAndEnergy.groupNumber()){
            window.plugin.myPortalAndEnergy.printedPortalsGroupId = newPage;
            document.getElementById("pageId").innerHTML="Page " + (newPage + 1).toString() + " / " + (window.plugin.myPortalAndEnergy.groupNumber()+1).toString();
            window.plugin.myPortalAndEnergy.refreshList();
        }
    }
}

//    Main method start
window.plugin.myPortalAndEnergy.highlight = function(data) {
    
    if(!window.plugin.myPortalAndEnergy._isinjected){
        document.getElementById("bookmarksBox").innerHTML+='<div id="bookmarksTypeBar"><h5 class="bkmrk_portals current">My portals</h5><h5 class="bkmrk_portals current" id="pageId">Page 1</h5><div style="clear:both !important;"></div></div><div id="bookmarksTypeBar"><h5 class="bkmrk_portals"  onclick="window.plugin.myPortalAndEnergy.resetList();return false;">Reset</h5><h5 class="bkmrk_portals"  onclick="window.plugin.myPortalAndEnergy.removeFromList(\'\');return false;">Clear All</h5><div style="clear:both !important;"></div></div><div id="bookmarksTypeBar"><h5 class="bkmrk_portals"  onclick="window.plugin.myPortalAndEnergy.setDeltaPage(1);return false;">Next</h5><h5 class="bkmrk_portals"  onclick="window.plugin.myPortalAndEnergy.setDeltaPage(-1);return false;">Previous</h5><div style="clear:both !important;"></div></div><div class="bookmarkList current"><ul class="ui-sortable"><li class="bookmarkFolder othersBookmarks open"><ul class="ui-sortable" id="garzonsPortalList"></ul></li></ul></div>'; 
        window.plugin.myPortalAndEnergy._isinjected = true;
    }
  
    var d = data.portal.options.details;
    var color='black';
    var portalWeakness = 1.0 - (getCurrentPortalEnergy(d)*1.0/getTotalPortalEnergy(d));
    var portalOwnerId = '';
    if (getTeam(d) !== 0) portalOwnerId = d.captured.capturingPlayerId;
    if(portalOwnerId == PLAYER.guid) {
        color = 'red';
        window.plugin.myPortalAndEnergy.refreshMyPortal(data);
    }
    var params = {fillColor: color, fillOpacity: portalWeakness };
    data.portal.setStyle(params);
    
}

var setup =  function() {
  window.addPortalHighlighter('My Portal and Energy', window.plugin.myPortalAndEnergy.highlight);
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
