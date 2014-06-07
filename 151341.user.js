// ==UserScript==
// @name                SelectRoundaboutSegments
// @namespace           http://greasemonkey.chizzum.com
// @description         Provides a "Select All" button for roundabouts
// @include             https://*.waze.com/*editor/*
// @include             https://editor-beta.waze.com/*
// @grant               none
// @version             0.6
// ==/UserScript==

var srsVersion = "v0.6";

function srsBootstrap()
{
   var bGreasemonkeyServiceDefined = false;
   try 
   {
		if (typeof Components.interfaces.gmIGreasemonkeyService === "object")
		{
			bGreasemonkeyServiceDefined = true;
		}
   }
   catch (err) { /* Ignore */ }
   if (typeof unsafeWindow === "undefined" || ! bGreasemonkeyServiceDefined) {
      unsafeWindow    = ( function () {
         var dummyElem = document.createElement('p');
         dummyElem.setAttribute('onclick', 'return window;');
         return dummyElem.onclick();
      }) ();
   }
   /* begin running the code! */
   srsInitialise();
}


function srsAddLog(logtext)
{
   console.log('SRS: '+logtext);
}


function srsSelect()
{
   rbtID = selectionManager.selectedItems[0].attributes.junctionID;
   srsAddLog('selecting roundabout ID '+rbtID);
   selectionManager.selectControl.unselectAll();

   for(var seg in wazeModel.segments.objects)
   {
      if(wazeModel.segments.objects[seg].attributes.junctionID == rbtID)
      {
         srsAddLog('...adding segment '+seg);
         selectionManager.selectControl.select(wazeModel.segments.objects[seg]);
      }
   }
}


function srsCheckSidePanel()
{
   if(selectionManager.selectedItems.length == 0) return;

   if(document.getElementById('srsCtrl') != null) return;

   if(selectionManager.selectedItems[0].attributes.junctionID == null) return;

   srsCtrl = document.createElement('section');
   srsCtrl.id = 'srsCtrl';
   srsCtrl.innerHTML = '<button id="srsButton" class="btn">Select roundabout</button>';
   srsCtrl.innerHTML += '&nbsp;<font size="-1">(<b><a href="http://userscripts.org/scripts/show/151341" target="_blank">SRS</a></b> '+srsVersion+')</font>';
   document.getElementById('segment-edit-general').appendChild(srsCtrl);
   document.getElementById('srsButton').onclick = srsSelect;
}


function srsFakeLoad()
{
   srsWazeBits();
   if(selectionManager == null) 
   {
      srsAddLog('selectionManager not found, retrying in 500ms...');
      setTimeout(srsFakeLoad,500);
      return;
   }   
   selectionManager.events.register("selectionchanged", null, srsCheckSidePanel);
   srsAddLog('added event handler');
}
   
function srsWazeBits()
{
   wazeMap = unsafeWindow.wazeMap;
   wazeModel = unsafeWindow.wazeModel;
   loginManager = unsafeWindow.loginManager;
   selectionManager = unsafeWindow.selectionManager;
   OpenLayers = unsafeWindow.OpenLayers;
}

function srsInitialise()
{
   srsAddLog('initialisation');
   srsFakeLoad();
}

srsBootstrap();