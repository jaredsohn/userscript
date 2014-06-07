// ==UserScript==
// @name                UROverview Plus (URO+)
// @namespace           http://greasemonkey.chizzum.com
// @description         Adds filtering and pop-up infobox for UR, MP and camera markers
// @include             https://*.waze.com/*editor*
// @include             https://editor-beta.waze.com/*
// @grant               none
// @version             3.7
// ==/UserScript==

function uroGlobals()
{
   uroVersion = "3.7";
   uroCtrlsHidden = false;
   uroCurrentTab = 1;
   uroFID = -1;
   uroShownFID = -1;
   uroInhibitSave = true;
   uroPopupTimer = -2;
   uroPopupShown = false;
   uroSetupListeners = true;
   uroRootContainer = null;
   uroURvroot = null;
   uroMPvroot = null;
   uroMaskLayer = null;
   uroCamLayer = null;

   uroCamvroot = null;
   uroURLayerIdx = null;
   uroProblemLayerIdx = null;
   uroMouseInPopup = false;
   uroURControlsIdx = null;
   uroProblemControlsIdx = null;
   uroMaskActive = false;

   uroNullCamLayer = false;
   uroNullOpenLayers = false;
   uroNullRootContainer = false;
   uroNullURLayer = false;
   uroNullProblemLayer = false;
   uroNullMapViewport = false;
   
   uroUserID = -1;
   uroURSCurrentCount = 0;
   uroURSPrevCount = 0;
   
   uroBetaEditor = false;
   uroWazeBitsPresent = 0;
   
   uroCamWatchObjects = new Array();
   uroCWLGroups = new Array();
   
   dteControlsIdx = -1;
   dteOldestFullDrive = new Date(0);
   dteEpoch = new Date(0);
   
   uroUserTabId = '';

   // uroIcons
   // 0 = group collapse/group expand
   // 1 = addtogroup active/addtogroup idle
   // 2 = goto active/goto idle
   uroIcons = 
   [
      ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94CAhYRIqo78SIAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAADtJREFUKM9j/P//PwNJgCQN////ZyFeGyMjIwMDAxMDiWAQamDB9Bb+kKTMBmICdxgFK64AxZKiSE3eAAOXFRnJRfN6AAAAAElFTkSuQmCC","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94CAhYRDHbt/O0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAE5JREFUKM+9UkEKACAMcmP//7IdgghqMQvytoOKTiMJCRKBZNRpZgbAIcIzsa5XJcgOB8Qaaz3nSt4chlLX3nb9OXRlL7cO2V83I1Dn3QDKfhshMqWScAAAAABJRU5ErkJggg=="],
      ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94BGhYVKhKBubQAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAEZJREFUOMtjYBjygBHB/P8fjzJGIszCZQA+gxkYWIjTABPDdAkL8U7G7hIcYcDISEGYwDQSFyZM5AQckYA4F7CQZ8goQAYAMCsd/TxbqrwAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94DAw0tDee2t8AAAABPSURBVDjL7ZAxCgAgDAMT6cP6dH+mUwfBaugmeFMpbTgCPA9j6H2M7MidvCZlAadgADDlIXY7E1OVM5NtB+5kuZN4VDtpleIkVAOrhHxWJoJkNv2QAd51AAAAAElFTkSuQmCC"],
      ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94BGhYfLAEN9AsAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAGdJREFUOMutk+EKACEIg7fD93/l3Y+uP5kmeYMgkH0NTUpCRw+acgBynHaCKsgBlpaIhDJQtQchaAtIBuNAlAQSV7OUwPYYGX2kL6Zi37hYYk6NU1ZPui/Y4XWeVsWSDpdkt8bftvEFOy0jJkeygWMAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94DAw0tFm3TfiwAAABySURBVDjLrZNRDsAgCEPp4r306HKy7sMsMRMckZH4ZfqoYEFSMnVJshYAME7aQRS0AOaR9C5UFe5AoRnsQCbAW4wFAklRlaNd1ipIrxHeRwKGZeuuNcEjK554J5x7lohNS+g+4d39Kyqug2jGyqnwtzTengM2Gxwa0GsAAAAASUVORK5CYII="]
   ];      
}


function uroBootstrap()
{
   var bGreasemonkeyServiceDefined = false;
   try {
      bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
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
   uroInitialise();
}


function uroAddLog(logtext)
{
   console.log('URO+: '+logtext);
}

function uroGatherSettings(container)
{
   var options = '';
   var urOptions = document.getElementById(container).getElementsByTagName('input');
   for (var optIdx=0;optIdx<urOptions.length;optIdx++)
   {
      var id = urOptions[optIdx].id;
      if((id.indexOf('_cb') == 0)||(id.indexOf('_text') == 0)||(id.indexOf('_input') == 0))
      {
         options += ':' + id;
         if(urOptions[optIdx].type == 'checkbox') options += ',' + urOptions[optIdx].checked.toString();
         else if((urOptions[optIdx].type == 'text')||(urOptions[optIdx].type == 'number')) options += ',' + urOptions[optIdx].value.toString();
      }
   }
   return options;
}


function uroGatherCamWatchList()
{
   var liststr = '';
   for(var loop=0;loop<uroCamWatchObjects.length;loop++)
   {
      camObj = uroCamWatchObjects[loop];
      if((camObj.fid != undefined) && (camObj.persistent == true))
      {
         if(loop > 0) liststr += ':';

         liststr += camObj.fid+',';
         liststr += camObj.watchLon+',';
         liststr += camObj.watchLat+',';
         liststr += camObj.watchType+',';
         liststr += camObj.watchAzymuth+',';
         liststr += camObj.watchSpeed+',';
         liststr += camObj.watchValidated+',';
         liststr += camObj.groupID;
      }
   }
   return liststr;
}

function uroGatherCWLGroups()
{
   var liststr = '';
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      groupObj = uroCWLGroups[loop];
      if(groupObj.groupID != -1)
      {
         if(loop > 0) liststr += ':';

         liststr += groupObj.groupID+',';
         liststr += groupObj.groupName+',';
         liststr += groupObj.groupCollapsed;
      }
   }
   return liststr;
}

function uroSaveSettings()
{
   if(uroInhibitSave) return;

   if (localStorage)
   {
      localStorage.UROverviewUROptions = uroGatherSettings('uroCtrlURs');
      localStorage.UROverviewMPOptions = uroGatherSettings('uroCtrlMPs');
      localStorage.UROverviewCameraOptions = uroGatherSettings('uroCtrlCameras');
      localStorage.UROverviewMiscOptions = uroGatherSettings('uroCtrlMisc');
      localStorage.UROverviewCamWatchList = uroGatherCamWatchList();
      localStorage.UROverviewCWLGroups = uroGatherCWLGroups();
   }
}

function uroApplySettings(settings)
{
   var options = settings.split(':');
   for(var optIdx=0;optIdx<options.length;optIdx++)
   {
      var fields = options[optIdx].split(',');
      if(fields[0].indexOf('_cb') == 0)
      {
         if(document.getElementById(fields[0]) != null) document.getElementById(fields[0]).checked = (fields[1] == 'true');
      }
      else if((fields[0].indexOf('_input') == 0)||(fields[0].indexOf('_text') == 0))
      {
         if(document.getElementById(fields[0]) != null) document.getElementById(fields[0]).value = fields[1];
      }
   }
}


function uroApplyCamWatchList()
{
   var objects = localStorage.UROverviewCamWatchList.split(':');
   uroCamWatchObjects = new Array();

   for(var objIdx=0;objIdx<objects.length;objIdx++)
   {
      var fields = objects[objIdx].split(',');
      if(fields.length == 7)
      {
         fields.push(0);
      }
      if(fields[7] == -1) fields[7] = 0;
      uroCamWatchObjects.push(new uroCamWatchObj(true,fields[0],fields[1],fields[2],fields[3],fields[4],fields[5],fields[6],fields[7]));
   }
}

function uroApplyCWLGroups()
{
   var objects = localStorage.UROverviewCWLGroups.split(':');
   uroCWLGroups = new Array();

   for(var objIdx=0;objIdx<objects.length;objIdx++)
   {
      var fields = objects[objIdx].split(',');
      if(fields.length < 2)
      {
         fields.push(false);
      }
      uroCWLGroups.push(new uroCWLGroupObj(fields[0],fields[1],(fields[2] == 'true')));
   }
}

function uroLoadSettings()
{
   uroAddLog('loadSettings()');
   if (localStorage.UROverviewUROptions)
   {
      uroAddLog('recover UR tab settings');
      uroApplySettings(localStorage.UROverviewUROptions);
   }
   
   if (localStorage.UROverviewCameraOptions)
   {
      uroAddLog('recover camera tab settings');
      uroApplySettings(localStorage.UROverviewCameraOptions);
   }

   if (localStorage.UROverviewMPOptions)
   {
      uroAddLog('recover MP tab settings');
      uroApplySettings(localStorage.UROverviewMPOptions);
   }

   if (localStorage.UROverviewMiscOptions)
   {
      uroAddLog('recover misc tab settings');
      uroApplySettings(localStorage.UROverviewMiscOptions);
   }
   
   if(localStorage.UROverviewCamWatchList)
   {
      uroAddLog('recover camera watchlist');
      uroApplyCamWatchList();
      uroGetCurrentCamWatchListObjects();
   }
   
   if(localStorage.UROverviewCWLGroups)
   {
      uroAddLog('recover CWL groups');
      uroApplyCWLGroups(); 
   }   
   else
   {
      uroAddLog('set default CWL group');
      uroCWLGroups.push(new uroCWLGroupObj(0,'No group',false));
   }
   
   uroInhibitSave = false;
}

function uroSettingsToText()
{
   var txtSettings = '';
   
   uroSaveSettings();
   
   if (localStorage.UROverviewUROptions)
   {
      txtSettings += '[UROverviewUROptions][len=' + localStorage.UROverviewUROptions.length + ']' + localStorage.UROverviewUROptions + '[END]';
   }
   if (localStorage.UROverviewCameraOptions)
   {      
      txtSettings += '[UROverviewCameraOptions][len=' + localStorage.UROverviewCameraOptions.length + ']' + localStorage.UROverviewCameraOptions + '[END]';
   }
   if (localStorage.UROverviewMPOptions)
   {
      txtSettings += '[UROverviewMPOptions][len=' + localStorage.UROverviewMPOptions.length + ']' + localStorage.UROverviewMPOptions + '[END]';
   }
   if (localStorage.UROverviewMiscOptions)
   {
      txtSettings += '[UROverviewMiscOptions][len=' + localStorage.UROverviewMiscOptions.length + ']' + localStorage.UROverviewMiscOptions + '[END]';
   }
   if (localStorage.UROverviewCamWatchList)
   {
      txtSettings += '[UROverviewCamWatchList][len=' + localStorage.UROverviewCamWatchList.length + ']' + localStorage.UROverviewCamWatchList + '[END]';
   }
   if (localStorage.UROverviewCWLGroups)
   {
      txtSettings += '[UROverviewCWLGroups][len=' + localStorage.UROverviewCWLGroups.length + ']' + localStorage.UROverviewCWLGroups + '[END]';
   }
   
   document.getElementById('_txtSettings').value = txtSettings;
   document.getElementById('_txtSettings').focus();
   document.getElementById('_txtSettings').select();
}  

function uroTextToSettings()
{
   var txtSettings = '';
   txtSettings = document.getElementById('_txtSettings').value;
   if(txtSettings.indexOf('[END]') == -1) return;
   
   var subText = txtSettings.split('[END]');
   for(var i=0;i<subText.length;i++)
   {
      var bPos = subText[i].indexOf(']');
      if(bPos != -1)
      {
         var settingID = subText[i].substr(1,bPos-1);
         subText[i] = subText[i].substr(bPos+1);
         bPos = subText[i].indexOf(']');
         if(bPos != -1)
         {
            var settingLength = subText[i].substr(5,bPos-5);
            subText[i] = subText[i].substr(bPos+1);
            if(subText[i].length == settingLength)
            {
               if(settingID == 'UROverviewCamWatchList') localStorage.UROverviewCamWatchList = subText[i];
               if(settingID == 'UROverviewCWLGroups') localStorage.UROverviewCWLGroups = subText[i];
               if(settingID == 'UROverviewUROptions') localStorage.UROverviewUROptions = subText[i];
               if(settingID == 'UROverviewCameraOptions') localStorage.UROverviewCameraOptions = subText[i];
               if(settingID == 'UROverviewMPOptions') localStorage.UROverviewMPOptions = subText[i];
               if(settingID == 'UROverviewMiscOptions') localStorage.UROverviewMiscOptions = subText[i];
            }
         }
      }
   }  
   uroLoadSettings();
}

function uroClearSettingsText()
{
   document.getElementById('_txtSettings').value = '';
}


function uroDateToDays(dateToConvert, ticksPerDay)
{
   var dateNow = new Date();
   return Math.floor((dateNow.getTime() - dateToConvert) / 86400000);
}

function uroGetURAge(urObj,ageType)
{
   if(ageType == 0)
   {
      if((urObj.attributes.driveDate == null)||(urObj.attributes.driveDate == 0)) return -1;
      return uroDateToDays(urObj.attributes.driveDate, urObj.ONE_DAY);
   }
   else
   {
      if((urObj.attributes.resolvedOn == null)||(urObj.attributes.resolvedOn == 0)) return -1;
      return uroDateToDays(urObj.attributes.resolvedOn, 86400000);
   }
}

function uroGetCameraAge(camObj, mode)
{
   if(mode == 0)
   {
      if(camObj.attributes.updatedOn == null) return -1;
      return uroDateToDays(camObj.attributes.updatedOn, 86400000);
   }
   if(mode == 1)
   {
      if(camObj.attributes.createdOn == null) return -1;
      return uroDateToDays(camObj.attributes.createdOn, 86400000);
   }
}

function uroGetCommentAge(commentObj)
{
   if(commentObj.createdOn == null) return -1;
   return uroDateToDays(commentObj.createdOn, 86400000);
}

function uroParseDaysAgo(days)
{
  if(days == 0) return 'today';
  else if(days == 1) return '1 day ago';
  else return days+' days ago';
}

function uroIsCameraSpeedValid(camObj)
{
   // returns 1 if the entered speed converts correctly into a multiple of 10MPH
   // returns -1 if the entered speed does not convert correctly
   // returns 0 if no speed data is present, or if the entered speed is 0
   if(camObj.attributes.speed != null)
   {
      var speed = Math.round(camObj.attributes.speed /1.609);
      if(speed == 0) return 0;
      else if(speed % 10 == 0) return 1;
      else return -1;
   }
   else return 0;
}


function uroTypeCast(varin)
{
   if(varin == "null") return null;
   if(typeof varin == "string") return parseInt(varin);
   return varin;
}

function uroCWLGroupObj(groupID, groupName, groupCollapsed)
{
   groupID = uroTypeCast(groupID);
   this.groupID = groupID;
   this.groupName = groupName;
   this.groupCount = 0;
   this.groupCollapsed = groupCollapsed;
}
  
function uroCamWatchObj(persistent, fid, lon, lat, type, azymuth, speed, validated, groupID)
{
   fid = uroTypeCast(fid);
   lon = uroTruncate(uroTypeCast(lon));
   lat = uroTruncate(uroTypeCast(lat));
   type = uroTypeCast(type);
   azymuth = uroTruncate(uroTypeCast(azymuth));
   speed = uroTruncate(uroTypeCast(speed));
   groupID = uroTypeCast(groupID);
   
   if(typeof validated == "string") validated = (validated == "true");
   if(typeof persistent == "string") persistent = (persistent == "true");

   this.fid = fid;
   this.persistent = persistent;
   this.loaded = false;
   this.watchType = type;
   this.watchAzymuth = azymuth;
   this.watchSpeed = speed;
   this.watchValidated = validated;
   this.watchLat = lat;
   this.watchLon = lon;
   this.groupID = groupID;
   this.currentType = null;
   this.currentAzymuth = null;
   this.currentSpeed = null;
   this.currentValidated = null;
   this.currentLat = null;
   this.currentLon = null;
}

function uroCamDataChanged(camidx)
{
   camObj = uroCamWatchObjects[camidx];
   if(camObj.loaded == false) return false;
   if(camObj.currentType != camObj.watchType) return true;
   if(camObj.currentAzymuth != camObj.watchAzymuth) return true;
   if(camObj.currentSpeed != camObj.watchSpeed) return true;
   if(camObj.currentValidated != camObj.watchValidated) return true;
   if(camObj.currentLat != camObj.watchLat) return true;
   if(camObj.currentLon != camObj.watchLon) return true;
   return false;
}

function uroAddCurrentCamWatchData(idx, lat, lon, type, azymuth, speed, validated)
{
   camObj = uroCamWatchObjects[idx];
   camObj.loaded = true;
   camObj.currentType = type;
   camObj.currentAzymuth = uroTruncate(azymuth%360);
   camObj.currentSpeed = uroTruncate(speed);
   camObj.currentValidated = validated;
   camObj.currentLat = uroTruncate(lat);
   camObj.currentLon = uroTruncate(lon);
   
   return(uroCamDataChanged(idx));
}

function uroIsCamOnWatchList(fid)
{
   for(var loop=0;loop<uroCamWatchObjects.length;loop++)
   {
      if(uroCamWatchObjects[loop].fid == fid) return loop;
   }
   return -1;
}

function uroAddCamToWatchList()
{
   if(uroIsCamOnWatchList(uroShownFID) == -1)
   {
      camObj = wazeModel.cameras.objects[uroShownFID];
      uroCamWatchObjects.push(new uroCamWatchObj(true, uroShownFID, camObj.geometry.x, camObj.geometry.y, camObj.attributes.type, camObj.attributes.azymuth, camObj.attributes.speed, camObj.attributes.validated, 0));
      uroAddCurrentCamWatchData(uroCamWatchObjects.length-1, camObj.geometry.y, camObj.geometry.x, camObj.attributes.type, camObj.attributes.azymuth, camObj.attributes.speed, camObj.attributes.validated);
      uroAddLog('added camera '+uroShownFID+' to watchlist');
      uroCWLUpdateHTML();
   }
}

function uroRemoveCamFromWatchList()
{
   camidx = uroIsCamOnWatchList(uroShownFID);
   if(camidx != -1)
   {
      uroCamWatchObjects.splice(camidx,1);
      uroAddLog('removed camera '+uroShownFID+' from watchlist');
      uroCWLUpdateHTML();
   }
}

function uroUpdateCamWatchList()
{
   uroRemoveCamFromWatchList();
   uroAddCamToWatchList();
}


function uroClearCamWatchList()
{
   if(confirm('Removing all cameras from the CWL cannot be undone\nAre you sure you want to do this?') == true)
   {
      uroCamWatchObjects = new Array();
      uroCWLUpdateHTML();
   }
}

function uroTruncate(val)
{
   if(val == null) return val;
   if(val < 0) return Math.ceil(val);
   return Math.floor(val);
}


function uroRetrieveCameras(lat, lon)
{
   var camPos = new OpenLayers.LonLat();
   var camChanged = false;
   
   camPos.lon = lon;
   camPos.lat = lat;
   camPos.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));

   var camURL = 'https://' + document.location.host;
   camURL += Waze.Config.api_base;
   camURL += '/Features?language=en&cameras=true&bbox=';
   var latl = camPos.lat - 0.25;
   var latu = camPos.lat + 0.25;
   var lonl = camPos.lon - 0.25;
   var lonr = camPos.lon + 0.25;
   camURL += lonl+','+latl+','+lonr+','+latu;
   uroAddLog('retrieving camera data around '+camPos.lon+','+camPos.lat);

   camReq = new XMLHttpRequest();
   camReq.open('GET',camURL,false);
   try
   {
      camReq.send();
      uroAddLog('response '+camReq.status+' received');
      if (camReq.status === 200)
      {
         camData = JSON.parse(camReq.responseText);
         for(var camIdx = 0; camIdx < camData.cameras.objects.length; camIdx++)
         {
            camObj = camData.cameras.objects[camIdx];
            var listIdx = uroIsCamOnWatchList(camObj.id);
            if(listIdx != -1)
            {
               camPos.lon = camObj.geometry.coordinates[0];
               camPos.lat = camObj.geometry.coordinates[1];
               camPos.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
               camPos.lon = uroTruncate(camPos.lon);
               camPos.lat = uroTruncate(camPos.lat);
               camChanged |= uroAddCurrentCamWatchData(listIdx, camPos.lat, camPos.lon, camObj.type, camObj.azymuth, camObj.speed, camObj.validated);
            }
            else if(camObj.validated == false)
            {

            }
         }  
      }
      else
      {
         uroAddLog('request failed (status != 200)');
      }
   }
   catch(err)
   {
      uroAddLog('camera load request failed (exception '+err+' caught)');
   }
   return camChanged;
}


function uroGetCurrentCamWatchListObjects()
{
   var camChanged = false;
   for(var camidx=0;camidx<uroCamWatchObjects.length;camidx++)
   {
      camObj = uroCamWatchObjects[camidx];
      if(camObj.loaded == false)
      {
         if(typeof wazeModel.cameras.objects[camObj.fid] == 'object')
         {
            if(wazeModel.cameras.objects[camObj.fid].state != "Delete")
            {
               wazeObj = wazeModel.cameras.objects[camObj.fid];
               camChanged |= uroAddCurrentCamWatchData(camidx, wazeObj.geometry.y, wazeObj.geometry.x, wazeObj.attributes.type, wazeObj.attributes.azymuth, wazeObj.attributes.speed, wazeObj.attributes.validated);
            }
            else
            {
               camChanged |= uroRetrieveCameras(camObj.watchLat, camObj.watchLon);
            }
         }
         else
         {
            camChanged |= uroRetrieveCameras(camObj.watchLat, camObj.watchLon);
         }
      }
   }

   var allLoaded = true;
   for(var camidx=0;camidx<uroCamWatchObjects.length;camidx++)
   {
      allLoaded &= uroCamWatchObjects[camidx].loaded;
   }

   if((camChanged)||(!allLoaded))
   {
      alert('One or more cameras on your watchlist have been modified or deleted!');
   }
}

function uroClearDeletedCameras()
{
   for(var camidx=uroCamWatchObjects.length-1;camidx>=0;camidx--)
   {
      if(uroCamWatchObjects[camidx].loaded == false)
      {
         uroShownFID = uroCamWatchObjects[camidx].fid;
         uroRemoveCamFromWatchList();
      }
   }
}

function uroRescanCamWatchList()
{
   for(var camidx=0;camidx<uroCamWatchObjects.length;camidx++)
   {
      uroCamWatchObjects[camidx].loaded = false;
   }
   uroGetCurrentCamWatchListObjects();
   uroCWLUpdateHTML();
}


function uroGotoCam()
{
   var camidx = this.id.substr(13);
   var camPos = new OpenLayers.LonLat();
   camPos.lon = uroCamWatchObjects[camidx].watchLon;
   camPos.lat = uroCamWatchObjects[camidx].watchLat;
   wazeMap.setCenter(camPos,4);
   wazeMap.layers[uroCamLayer].setVisibility(true);
   return false;
}

function uroSetCamGroup()
{
   var camidx = this.id.substr(13);
   
   return false;
}

function uroHighlightCWLEntry()
{
   this.style.backgroundColor = '#FFFFAA';
   return false;
}

function uroUnhighlightCWLEntry()
{
   var camidx = this.id.substr(8);
   var changed = uroCamDataChanged(camidx);
   var deleted = (uroCamWatchObjects[camidx].loaded == false);

   if(changed) this.style.backgroundColor = '#AAAAFF';
   else if(deleted) this.style.backgroundColor = '#FFAAAA';
   else this.style.backgroundColor = '#FFFFFF';
   return false;
}

function uroCWLIconHighlight()
{
   iconType = this.id.substr(11,1);
   this.src = uroIcons[iconType][0];
   return false;
}

function uroCWLIconLowlight()
{
   iconType = this.id.substr(11,1);
   this.src = uroIcons[iconType][1];
   return false;
}

function uroRemoveFromCWL()
{
   uroShownFID = uroCamWatchObjects[this.id.substr(18)].fid;
   uroRemoveCamFromWatchList();
}  


function uroSetCamGroups()
{
   for(var camidx=0;camidx<uroCamWatchObjects.length;camidx++)
   {
      camObj = uroCamWatchObjects[camidx];
      camGroup = parseInt(document.getElementById("_uroGroupSelect-"+camidx).value);
      camObj.groupID = camGroup;
   }  
}


function uroPopulateCWLGroupSelect()
{
   selector = document.getElementById('_uroCWLGroupSelect');
   while(selector.options.length > 0)
   {
      selector.options.remove(0);
   } 
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      groupObj = uroCWLGroups[loop];
      if(groupObj.groupID != -1)
      {
         selector.options.add(new Option(groupObj.groupName,groupObj.groupID));
      }
   }
}

function uroGetNextCWLGroupID()
{
   var nextID = 1;
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      if(uroCWLGroups[loop].groupID >= nextID)
      {
         nextID = uroCWLGroups[loop].groupID + 1;
      }
   }
   return nextID;
}

function uroFindCWLGroupByName(groupName)
{
   var groupID = -1;
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      if((uroCWLGroups[loop].groupName == groupName) && (uroCWLGroups[loop].groupID != -1))
      {
         groupID = uroCWLGroups.groupID;
         break;
      }
   }
   return groupID;
}

function uroAddCWLGroup()
{
   var groupID = uroGetNextCWLGroupID();
   var groupName = document.getElementById('_uroCWLGroupEntry').value;
   if(uroFindCWLGroupByName(groupName) == -1)
   {  
      uroCWLGroups.push(new uroCWLGroupObj(groupID,groupName,false));
      uroPopulateCWLGroupSelect();
   }
}  

function uroRemoveCWLGroup()
{
   selector = document.getElementById('_uroCWLGroupSelect');
   var groupID = parseInt(selector.selectedOptions[0].value);
   if(groupID == 0) return false;   // prevent deletion of the default group
   
   for(var loop=0;loop<uroCamWatchObjects.length;loop++)
   {
      cwObj = uroCamWatchObjects[loop];
      if(cwObj.groupID == groupID)
      {
         cwObj.groupID = 0;
      }   
   }
   for(var loop=0;loop<uroCWLGroups.length;loop++)
   {
      groupObj = uroCWLGroups[loop];
      if(groupObj.groupID == groupID)
      {
         groupObj.groupID = -1;
      }
   }
   uroCWLUpdateHTML();
}

function uroAssignCameraToGroup()
{
   var camidx = this.id.substr(13);
   selector = document.getElementById('_uroCWLGroupSelect');
   uroCamWatchObjects[camidx].groupID = parseInt(selector.selectedOptions[0].value);
   uroCWLUpdateHTML();
   return false;
}   

function uroAddBtnEvl(btnID, evlType, evlFunction)
{
   btnObj = document.getElementById(btnID);
   if(btnObj != null)
   {
      btnObj.addEventListener(evlType, evlFunction, true);
   }
}

function uroCWLGroupCollapseExpand()
{
   var groupidx = this.id.substr(18);
   if(uroCWLGroups[groupidx].groupCollapsed == true) uroCWLGroups[groupidx].groupCollapsed = false;
   else uroCWLGroups[groupidx].groupCollapsed = true; 
   uroCWLUpdateHTML();
   return false;
}   

function uroCWLUpdateHTML()
{
   var camTypes = new Array("","","Speed", "Dummy", "Red Light");
   var selectedGroup = 0;
   iHTML = '';
   
   if(document.getElementById('_uroCWLGroupSelect') != null)
   {
      selectedGroup = document.getElementById('_uroCWLGroupSelect').selectedIndex;
   }

   
   iHTML = '<br><b>Camera Watchlist:</b><br><br>';
   iHTML += '<div id="_uroCWLCamList" style="height:65%;overflow:auto;">';
   for(var groupidx=0;groupidx<uroCWLGroups.length;groupidx++)
   {
      var groupObj = uroCWLGroups[groupidx];
      iHTML += '<div id="_uroCWLGroup-'+groupidx+'">';
      if(groupObj.groupCollapsed == true)
      {
         iHTML += '<img src="'+uroIcons[0][1]+'" id="_uroCWLGroupState-'+groupidx+'">';
      }
      else
      {
         iHTML += '<img src="'+uroIcons[0][0]+'" id="_uroCWLGroupState-'+groupidx+'">';   
      }
      iHTML += '<b>'+groupObj.groupName+'</b><br>';
      groupObj.groupCount = 0;
      for(var camidx=0;camidx<uroCamWatchObjects.length;camidx++)
      {
         camObj = uroCamWatchObjects[camidx];
         if(camObj.groupID == groupObj.groupID)
         {
            groupObj.groupCount++;
            var changed = uroCamDataChanged(camidx);
            var deleted = (camObj.loaded == false);
            iHTML += '<div id="_uroCWL-'+camidx+'" style="padding:3px;border-width:2px;border-style:solid;border-color:#FFFFFF;background-color:';
            if(changed) iHTML += '#AAAAFF;';
            else if(deleted) iHTML += '#FFAAAA;';
            else iHTML += '#FFFFFF;';
            
            if(groupObj.groupCollapsed == true) iHTML += 'display:none;">';
            else iHTML += 'display:block;">';

            iHTML += 'ID: '+camObj.fid;
            iHTML += ' Type: '+camTypes[camObj.watchType];
            if(deleted)
            {
               iHTML += '<br>DELETED';
            }
            if(changed) 
            {
               if(camObj.currentType != camObj.watchType) 
               {
                  iHTML += '<br>&nbsp;&nbsp;Type changed';
                  iHTML += ' ('+camObj.watchType+' to '+camObj.currentType+')';
               }   
               if(camObj.currentAzymuth != camObj.watchAzymuth)
               {
                  iHTML += '<br>&nbsp;&nbsp;Azimuth changed';
                  iHTML += ' ('+camObj.watchAzymuth+' to '+camObj.currentAzymuth+')';
               }   
               if(camObj.currentSpeed != camObj.watchSpeed)
               {
                  iHTML += '<br>&nbsp;&nbsp;Speed changed';
                  iHTML += ' ('+camObj.watchSpeed+' to '+camObj.currentSpeed+')';
               }   
               if(camObj.currentValidated != camObj.watchValidated)
               {
                  iHTML += '<br>&nbsp;&nbsp;Approval state changed';
                  iHTML += ' ('+camObj.watchValidated+' to '+camObj.currentValidated+')';
               }   
               if(camObj.currentLat != camObj.watchLat)
               {
                  iHTML += '<br>&nbsp;&nbsp;Latitude changed';
                  iHTML += ' ('+camObj.watchLat+' to '+camObj.currentLat+')';
               }   
               if(camObj.currentLon != camObj.watchLon)
               {
                  iHTML += '<br>&nbsp;&nbsp;Longitude changed';
                  iHTML += ' ('+camObj.watchLon+' to '+camObj.currentLon+')';
               }   
            }   
      
            iHTML += '&nbsp;<img id="_uroCWLIcon1-'+camidx+'" src="'+uroIcons[1][1]+'">';
            iHTML += '&nbsp;<img id="_uroCWLIcon2-'+camidx+'" src="'+uroIcons[2][1]+'">';
            iHTML += '</div>';
         }
      }
      iHTML += '</div>';
   }
   iHTML += '</div><div id="_uroCWLControls">';
   iHTML += '<hr>Group control:<br>';
   iHTML += '<select id="_uroCWLGroupSelect" style="width:40%;height:22px;"></select>&nbsp;<input type="button" id="_btnCWLGroupDel" value="Delete group"><br>';
   iHTML += '<input type="text" id="_uroCWLGroupEntry" style="width:40%;height:22px;">&nbsp;<input type="button" id="_btnCWLGroupAdd" value="Add group">';
   iHTML += '<hr><input type="button" id="_btnRescanCamWatchList" value="Rescan">';
   iHTML += '&nbsp;|&nbsp;<input type="button" id="_btnRemoveDeletedCameras" value="Remove deleted">';
   iHTML += '&nbsp;|&nbsp;<input type="button" id="_btnClearCamWatchList" value="Remove all">';
   iHTML += '</div>';
   uroCamWatchlist.innerHTML = iHTML;
   
   for(var camidx=0;camidx<uroCamWatchObjects.length;camidx++)
   {
      document.getElementById("_uroCWL-"+camidx).onmouseover = uroHighlightCWLEntry;
      document.getElementById("_uroCWL-"+camidx).onmouseleave = uroUnhighlightCWLEntry;

      document.getElementById("_uroCWLIcon1-"+camidx).onmouseover = uroCWLIconHighlight;
      document.getElementById("_uroCWLIcon1-"+camidx).onmouseleave = uroCWLIconLowlight;
      document.getElementById("_uroCWLIcon1-"+camidx).onclick = uroAssignCameraToGroup;

      document.getElementById("_uroCWLIcon2-"+camidx).onmouseover = uroCWLIconHighlight;
      document.getElementById("_uroCWLIcon2-"+camidx).onmouseleave = uroCWLIconLowlight;
      document.getElementById("_uroCWLIcon2-"+camidx).onclick = uroGotoCam;
   }
   
   uroAddBtnEvl('_btnClearCamWatchList', 'click', uroClearCamWatchList);
   uroAddBtnEvl('_btnRemoveDeletedCameras', 'click', uroClearDeletedCameras);
   uroAddBtnEvl('_btnRescanCamWatchList', 'click', uroRescanCamWatchList);
   uroAddBtnEvl('_btnCWLGroupDel', 'click', uroRemoveCWLGroup);
   uroAddBtnEvl('_btnCWLGroupAdd', 'click', uroAddCWLGroup);
   if(document.getElementById('_uroCWLGroupSelect') != null)
   {
      uroAddLog('populating CWL group list');
      uroPopulateCWLGroupSelect();
      selector = document.getElementById('_uroCWLGroupSelect');
      if(selectedGroup >= selector.length)
      {
         selectedGroup = 0;
      }
      selector.selectedIndex = selectedGroup;
   }

   for(var groupidx=0;groupidx<uroCWLGroups.length;groupidx++)
   {   
      if(uroCWLGroups[groupidx].groupCount == 0)
      {
         document.getElementById('_uroCWLGroup-'+groupidx).style.display = 'none';
      }
      else
      {
         document.getElementById('_uroCWLGroupState-'+groupidx).onclick = uroCWLGroupCollapseExpand;
      }
   }
}


function uroIsOnIgnoreList(fid)
{
   if(sessionStorage.UROverview_FID_IgnoreList.indexOf('fid:'+fid) == -1) return false;
   else return true;
}

function uroEnableIgnoreListControls()
{
   var btnState = false;
   if(sessionStorage.UROverview_FID_IgnoreList == '')
   {
      btnState = true;
   }
   document.getElementById('_btnUndoLastHide').disabled = btnState;
   document.getElementById('_btnClearSessionHides').disabled = btnState;
   uroFilterURMarkers();
}

function uroAddToIgnoreList()
{
   if(!uroIsOnIgnoreList(uroShownFID))
   {
      sessionStorage.UROverview_FID_IgnoreList += 'fid:'+uroShownFID;
      uroAddLog('added fid '+uroShownFID+' to ignore list');
      uroAddLog(sessionStorage.UROverview_FID_IgnoreList);
      document.getElementById('_btnUndoLastHide').disabled = false;
      document.getElementById('_btnClearSessionHides').disabled = false;
      uroDiv.style.visibility = 'hidden';
      uroEnableIgnoreListControls();
      wazeMap.events.register("mousemove", null, uroFilterURMarkers5);
   }
   return false;
}

function uroRemoveFromIgnoreList(fid)
{
   var ignorelist = sessionStorage.UROverview_FID_IgnoreList;
   var fidpos = ignorelist.indexOf('fid:'+fid);
   if(fidpos != -1)
   {
      var preFID = ignorelist.slice(0,fidpos);
      ignorelist = ignorelist.slice(fidpos+1);
      fidpos = ignorelist.indexOf('fid:');
      if(fidpos == -1) ignorelist = '';
      else ignorelist = ignorelist.slice(fidpos);
      sessionStorage.UROverview_FID_IgnoreList = preFID + ignorelist;
      uroAddLog('removed fid '+fid+' from ignore list');
      uroAddLog(sessionStorage.UROverview_FID_IgnoreList);
      uroEnableIgnoreListControls();
   }
}

function uroRemoveLastAddedIgnore()
{
   var ignorelist = sessionStorage.UROverview_FID_IgnoreList;
   var fidpos = ignorelist.lastIndexOf('fid:');
   if(fidpos != -1)
   {
      ignorelist = ignorelist.slice(0,fidpos);
      sessionStorage.UROverview_FID_IgnoreList = ignorelist;
      uroAddLog('removed last fid from ignore list');
      uroAddLog(sessionStorage.UROverview_FID_IgnoreList);
      uroEnableIgnoreListControls();
   }
}

function uroRemoveAllIgnores()
{
   sessionStorage.UROverview_FID_IgnoreList = '';
   uroEnableIgnoreListControls();
}


function uroKeywordPresent(desc, keyword)
{
   if(document.getElementById('_cbCaseInsensitive').checked == true) re = RegExp(keyword,'i'); 
   else re = RegExp(keyword);
   if(desc.search(re) == -1) return false;
   else return true;
}


function uroMaskTest()
{
   if(wazeMap.layers[uroMaskLayer].div == null)
   {
      if(uroMaskActive == false)
      {
         uroAddLog('mask layer not found');
         uroMaskActive = true;
      }   
      return true;
   }
   if(wazeMap.layers[uroMaskLayer].div.innerHTML.indexOf('fill="black"') != -1)
   {
      if(uroMaskActive == false)
      {
         uroAddLog('mask layer active');
         uroMaskActive = true;
      }
      return true;
   }
   uroMaskActive = false;
   return false;
}


function uroRefreshUpdateRequestSessions()
{
   var idList = [];
   for (var urID in wazeModel.mapUpdateRequests.objects)
   {
      if(wazeModel.updateRequestSessions.objects[urID] == null) idList.push(urID);
   }
   if(idList.length > 0)
   {
      uroAddLog('grabbing updateRequestSessions with IDs '+idList);
      wazeModel.updateRequestSessions.get(idList);
   }
}

function uroURHasMyComments(fid)
{
   var nComments = wazeModel.updateRequestSessions.objects[fid].comments.length;
   if(nComments == 0) return false;

   for(var cidx=0; cidx<nComments; cidx++)
   {
      if(wazeModel.updateRequestSessions.objects[fid].comments[cidx].userID == uroUserID) return true;
   }
   
   return false;
}
 
function uroAddCommentMarkers(urID, hasMyComments, nComments)
{
   var useDefaultMarker = false;
   
   if((document.getElementById('_cbNativeConvoMarkers').checked) && (uroBetaEditor == false)) useDefaultMarker = true;
   if((document.getElementById('_cbNativeBetaConvoMarkers').checked) && (uroBetaEditor == true)) useDefaultMarker = true;
   
   var divElem = document.getElementById(wazeMap.layers[uroURLayerIdx].id);
   if(divElem.childNodes.length > 0)
   {
      for(var nodeIdx = 0; nodeIdx < divElem.childNodes.length; nodeIdx++)
      {
         if(divElem.childNodes[nodeIdx].getAttribute("data-id") == urID)
         {
            var divHTML = '';

            if(document.getElementById('_cbCommentCount').checked)
            {
               divHTML += '<div style="position:absolute;top:-9px;left:-11px;pointer-events:none;">';
               divHTML += '<img src="https://www.chizzum.com/greasemonkey/images/ur_comment_count.png">';
               divHTML += '</div>';
               divHTML += '<div style="position:absolute;top:-6px;left:-';
               if(nComments < 10) divHTML += '0';
               else if(nComments < 100) divHTML += '3';
               else divHTML += '6';
               divHTML += 'px;font-size:11px;;pointer-events:none;">'+nComments+'</div>';
            }

            if(useDefaultMarker == false)
            {
               divHTML += '<div style="position:absolute;top:-9px;left:18px;pointer-events:none;">';
               if(hasMyComments) divHTML += '<img src="https://www.chizzum.com/greasemonkey/images/ur_own_comment_marker.png">';
               else divHTML += '<img src="https://www.chizzum.com/greasemonkey/images/ur_comment_marker.png">';
               divHTML += '</div>';
               wazeMap.layers[uroURLayerIdx].markers[urID].icon.imageDiv.classList.remove("has-comments")
            }
            else
            {
               wazeMap.layers[uroURLayerIdx].markers[urID].icon.imageDiv.classList.add("has-comments")
            }

            divElem.childNodes[nodeIdx].innerHTML = divHTML;
            return;
         }
      }
   }
}


function uroFilterURMarkers()
{
   var mapviewport = document.getElementsByClassName("olMapViewport")[0];
   if(mapviewport == null)
   {
      if(uroNullMapViewport == false)
      {
         uroAddLog('caught null mapviewport');
         uroNullMapViewport = true;
      }
      return;
   }
   uroNullMapViewport = false;
  
   if(document.getElementById('_cbWhiteBackground').checked)
   {
      mapviewport.style.backgroundColor = "#FFFFFF";
   }
   else
   {
      mapviewport.style.backgroundColor = "#555555";
   }
 
     
   if(uroMaskTest() == true) return;

   var camLayer = document.getElementById(uroRootContainer+'_svgRoot');
   if(camLayer == null)
   {
      if(uroNullCamLayer == false)
      {
         uroAddLog('caught null camLayer');
         uroNullCamLayer = true;
      }
      return;
   }
   uroNullCamLayer = false;

   uroRefreshUpdateRequestSessions();

   for (var uroCamObj in wazeModel.cameras.objects)
   {
      var uroCam = wazeModel.cameras.objects[uroCamObj];
      var uroCamStyle = 'visible';
      if(wazeModel.users.objects[uroCam.attributes.createdBy] != null)
      {
         var uroCamCreator = wazeModel.users.objects[uroCam.attributes.createdBy].userName;
         var uroCamCreatorRank = wazeModel.users.objects[uroCam.attributes.createdBy].rank;
      }
      else
      {
         var uroCamCreator = '';
         var uroCamCreatorRank = -1;
      }
      if(wazeModel.users.objects[uroCam.attributes.updatedBy] != null)
      {
         var uroCamUpdater = wazeModel.users.objects[uroCam.attributes.updatedBy].userName;
         var uroCamUpdaterRank = wazeModel.users.objects[uroCam.attributes.updatedBy].rank;
      }
      else
      {
         var uroCamUpdater = '';
         var uroCamUpdaterRank = -1;
      }

      var uroCamApproved = uroCam.attributes.validated;
      var uroCamType = uroCam.attributes.type;


      if(document.getElementById('_cbShowOnlyMyCams').checked == true)
      {
         if((uroUserID != uroCam.attributes.createdBy)&&(uroUserID != uroCam.attributes.updatedBy)) uroCamStyle = 'hidden';
      }

      if((document.getElementById('_cbShowWorldCams').checked == false) || (document.getElementById('_cbShowUSACams').checked == false) || (document.getElementById('_cbShowNonWorldCams').checked == false))
      {
         var posWorld = uroCamCreator.indexOf('world_');
         var posUSA = uroCamCreator.indexOf('usa_');

         if((document.getElementById('_cbShowWorldCams').checked == false) && (posWorld == 0)) uroCamStyle = 'hidden';
         if((document.getElementById('_cbShowUSACams').checked == false) && (posUSA == 0)) uroCamStyle = 'hidden';
         if((document.getElementById('_cbShowNonWorldCams').checked == false) && (posWorld != 0) && (posUSA != 0)) uroCamStyle = 'hidden';
      }

      if((document.getElementById('_cbShowApprovedCams').checked == false) || (document.getElementById('_cbShowNonApprovedCams').checked == false))
      {
         if((document.getElementById('_cbShowApprovedCams').checked == false) && (uroCamApproved == true)) uroCamStyle = 'hidden';
         if((document.getElementById('_cbShowNonApprovedCams').checked == false) && (uroCamApproved == false)) uroCamStyle = 'hidden';
      }

      if((document.getElementById('_cbShowNonApprovedCams').checked == true) && (uroCamApproved == false))
      {
         if(((document.getElementById('_cbShowOlderCreatedNonApproved').checked == true)) && (uroGetCameraAge(uroCam,1) <= document.getElementById('_inputCameraMinCreatedDays').value)) uroCamStyle = 'hidden';
         if(((document.getElementById('_cbShowOlderUpdatedNonApproved').checked == true)) && (uroGetCameraAge(uroCam,0) <= document.getElementById('_inputCameraMinUpdatedDays').value)) uroCamStyle = 'hidden';
      }

      if((document.getElementById('_cbShowSpeedCams').checked == false) || (document.getElementById('_cbShowRedLightCams').checked == false) || (document.getElementById('_cbShowDummyCams').checked == false))
      {
         if((document.getElementById('_cbShowSpeedCams').checked == false) && (uroCamType == 2)) uroCamStyle = 'hidden';
         if((document.getElementById('_cbShowRedLightCams').checked == false) && (uroCamType == 4)) uroCamStyle = 'hidden';
         if((document.getElementById('_cbShowDummyCams').checked == false) && (uroCamType == 3)) uroCamStyle = 'hidden';
      }

      if(document.getElementById('_cbShowSpeedCams').checked == true)
      {
         if((document.getElementById('_cbShowIfMPHSpeedSet').checked == false) && (uroIsCameraSpeedValid(uroCam) == 1)) uroCamStyle = 'hidden';
         if((document.getElementById('_cbShowIfNoSpeedSet').checked == false) && (uroIsCameraSpeedValid(uroCam) == 0)) uroCamStyle = 'hidden';
         if((document.getElementById('_cbShowIfKPHSpeedSet').checked == false) && (uroIsCameraSpeedValid(uroCam) == -1)) uroCamStyle = 'hidden';
      }

      if(document.getElementById('_cbHideCreatedByMe').checked == true)
      {
         if(uroUserID == uroCam.attributes.createdBy) uroCamStyle = 'hidden';
      }
      if((document.getElementById('_cbHideCreatedByRank0').checked == true) && (uroCamCreatorRank == 0)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideCreatedByRank1').checked == true) && (uroCamCreatorRank == 1)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideCreatedByRank2').checked == true) && (uroCamCreatorRank == 2)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideCreatedByRank3').checked == true) && (uroCamCreatorRank == 3)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideCreatedByRank4').checked == true) && (uroCamCreatorRank == 4)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideCreatedByRank5').checked == true) && (uroCamCreatorRank == 5)) uroCamStyle = 'hidden';

      if(document.getElementById('_cbHideUpdatedByMe').checked == true)
      {
         if(uroUserID == uroCam.attributes.updatedBy) uroCamStyle = 'hidden';
      }
      if((document.getElementById('_cbHideUpdatedByRank0').checked == true) && (uroCamUpdaterRank == 0)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideUpdatedByRank1').checked == true) && (uroCamUpdaterRank == 1)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideUpdatedByRank2').checked == true) && (uroCamUpdaterRank == 2)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideUpdatedByRank3').checked == true) && (uroCamUpdaterRank == 3)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideUpdatedByRank4').checked == true) && (uroCamUpdaterRank == 4)) uroCamStyle = 'hidden';
      if((document.getElementById('_cbHideUpdatedByRank5').checked == true) && (uroCamUpdaterRank == 5)) uroCamStyle = 'hidden';

      if((document.getElementById('_cbHideCWLCams').checked == true) && (uroIsCamOnWatchList(uroCam.fid) != -1)) uroCamStyle = 'hidden';

      var uroCamGeometryID = uroCam.geometry.id;
      if(camLayer.getElementById(uroCamGeometryID) != null)
      {
         camLayer.getElementById(uroCamGeometryID).style.visibility = uroCamStyle;
      }
   }

   for (var urobj in wazeModel.mapUpdateRequests.objects)
   {
      var ureq = wazeModel.mapUpdateRequests.objects[urobj];
      var urStyle = 'visible';
      var cryosphere_link = false;
      var wazeauto_ur = false;
      var ukroadworks_ur = false;
      var hasMyComments = false;
      var nComments = 0;
      var commentDaysOld = -1;

      var desc = '';
      if(ureq.attributes.description != null) desc = ureq.attributes.description;

      // check UR against current session ignore list...
      if(uroIsOnIgnoreList(ureq.fid)) urStyle = 'hidden';

      // check against closed/not identified filtering if enabled...
      if(document.getElementById('_cbFilterSolved').checked == true)
      {
         if(ureq.attributes.resolution == 0) urStyle = 'hidden';
      }
      if(document.getElementById('_cbFilterUnidentified').checked == true)
      {
         if(ureq.attributes.resolution == 1) urStyle = 'hidden';
      }
      
      if((ureq.attributes.resolvedOn != null) && (document.getElementById('_cbFilterClosedUR').checked == true))
      {
         urStyle = 'hidden';
      }

      if(urStyle == 'visible')
      {
         // check UR against keyword filtering if enabled...
         if(document.getElementById('_cbEnableKeywordMustBePresent').checked == true)
         {
            if(!uroKeywordPresent(desc,document.getElementById('_textKeywordPresent').value)) urStyle = 'hidden';
         }
         if(document.getElementById('_cbEnableKeywordMustBeAbsent').checked == true)
         {
            if(uroKeywordPresent(desc,document.getElementById('_textKeywordAbsent').value)) urStyle = 'hidden';
         }
      }

      if(urStyle == 'visible')
      {
         // do age-based filtering if enabled
         if(document.getElementById('_cbEnableMinAgeFilter').checked == true)
         {
            if(uroGetURAge(ureq,0) < document.getElementById('_inputFilterMinDays').value) urStyle = 'hidden';
         }
         if(document.getElementById('_cbEnableMaxAgeFilter').checked == true)
         {
            if(uroGetURAge(ureq,0) > document.getElementById('_inputFilterMaxDays').value) urStyle = 'hidden';
         }
      }
      
      if(urStyle == 'visible')
      {
         // do comments/following filtering
         if(wazeModel.updateRequestSessions.objects[ureq.fid] != null)
         {
            nComments = wazeModel.updateRequestSessions.objects[ureq.fid].comments.length;
            var commentDaysOld = -1;
            
            
            if(document.getElementById('_cbEnableMinCommentsFilter').checked == true)
            {
               if(nComments < document.getElementById('_inputFilterMinComments').value) urStyle = 'hidden';
            }
            if(document.getElementById('_cbEnableMaxCommentsFilter').checked == true)
            {
               if(nComments > document.getElementById('_inputFilterMaxComments').value) urStyle = 'hidden';
            }
            
              
            if(nComments > 0)
            {
               var reporterIsLastCommenter = false;
               if(wazeModel.updateRequestSessions.objects[ureq.fid].comments[nComments-1].userID == -1) reporterIsLastCommenter = true;
               
               if(document.getElementById('_cbHideIfReporterLastCommenter').checked == true)
               {
                  if(reporterIsLastCommenter == true) urStyle = 'hidden';
               }
               else if(document.getElementById('_cbHideIfReporterNotLastCommenter').checked == true)
               {
                  if(reporterIsLastCommenter == false) urStyle = 'hidden';
               }
               
               hasMyComments = uroURHasMyComments(ureq.fid);
               if(hasMyComments == false)
               { 
                  if(document.getElementById('_cbHideAnyComments').checked == true) urStyle = 'hidden';
                  if(document.getElementById('_cbHideIfNotLastCommenter').checked == true) urStyle = 'hidden';
               }
               else
               {
                  if(document.getElementById('_cbHideMyComments').checked == true) urStyle = 'hidden';
                  
                  var userIsLastCommenter = false;
                  if(wazeModel.updateRequestSessions.objects[ureq.fid].comments[nComments-1].userID == uroUserID) userIsLastCommenter = true;
                  
                  if(document.getElementById('_cbHideIfLastCommenter').checked == true)
                  {
                     if(userIsLastCommenter == true) urStyle = 'hidden';
                  }  
                  else if(document.getElementById('_cbHideIfNotLastCommenter').checked == true)
                  {
                     if(userIsLastCommenter == false) urStyle = 'hidden';
                  }
               }
               commentDaysOld = uroGetCommentAge(wazeModel.updateRequestSessions.objects[ureq.fid].comments[nComments-1]);
               if((document.getElementById('_cbEnableCommentAgeFilter').checked == true) && (commentDaysOld != -1))
               {
                  if(document.getElementById('_inputFilterCommentDays').value < commentDaysOld) urStyle = 'hidden';
               }
               if((document.getElementById('_cbEnableCommentAgeFilter2').checked == true) && (commentDaysOld != -1))
               {
                  if(document.getElementById('_inputFilterCommentDays2').value > commentDaysOld) urStyle = 'hidden';
               }            
            }
            
            
            if(wazeModel.updateRequestSessions.objects[ureq.fid].isFollowing == true)
            {
               if(document.getElementById('_cbHideMyFollowed').checked == true) urStyle = 'hidden';
            }
            else   
            {            
               if(document.getElementById('_cbHideMyUnfollowed').checked == true) urStyle = 'hidden';
            }              
         }
      }

      if(urStyle == 'visible')
      {
         // for type-based filtering, we need to handle Petrol Station Checker URs first - these (currently)
         // appear as URs of either general error or undefined type, and so can't be detected just by type alone.
         if(desc.indexOf('cryosphere') != -1)
         {
            cryosphere_link = true;
         }
         // Waze automatic URs are next - these always (?) get inserted as General Error URs, so we can't filter
         // them by type either.
         else if(desc.indexOf('Waze Automatic:') != -1)
         {
            wazeauto_ur = true;
         }
         // Finally (for now?) UK roadworks URs - provided the editor setting the UR has abided by the guidelines
         // in the UK forum, the description should always include the text '[ROADWORKS]'...
         else if(desc.indexOf('[ROADWORKS]') != -1)
         {
            ukroadworks_ur = true;
         }

         if(cryosphere_link == true)
         {
            if(document.getElementById('_cbFilterCryosphere').checked == true) urStyle = 'hidden';
         }
         else if(wazeauto_ur == true)
         {
            if(document.getElementById('_cbFilterWazeAuto').checked == true) urStyle = 'hidden';
         }
         else if(ukroadworks_ur == true)
         {
            if(document.getElementById('_cbFilterRoadworks').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 6)
         {
            if(document.getElementById('_cbFilterIncorrectTurn').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 7)
         {
            if (document.getElementById('_cbFilterIncorrectAddress').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 8)
         {
            if(document.getElementById('_cbFilterIncorrectRoute').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 9)
         {
            if(document.getElementById('_cbFilterMissingRoundabout').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 10)
         {
            if(document.getElementById('_cbFilterGeneralError').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 11)
         {
            if(document.getElementById('_cbFilterTurnNotAllowed').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 12)
         {
            if(document.getElementById('_cbFilterIncorrectJunction').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 13)
         {
            if(document.getElementById('_cbFilterMissingBridgeOverpass').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 14)
         {
            if(document.getElementById('_cbFilterWrongDrivingDirection').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 15)
         {
            if(document.getElementById('_cbFilterMissingExit').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 16)
         {
            if(document.getElementById('_cbFilterMissingRoad').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 18)
         {
            if(document.getElementById('_cbFilterMissingLandmark').checked == true) urStyle = 'hidden';
         }
         else if(ureq.attributes.type == 19)
         {
            if(document.getElementById('_cbFilterBlockedRoad').checked == true) urStyle = 'hidden';
         }
         else if(document.getElementById('_cbFilterUndefined').checked == true) urStyle = 'hidden';
         
         if(document.getElementById('_cbInvertURFilter').checked == true)
         {
           if(urStyle == 'hidden') urStyle = 'visible';
           else urStyle = 'hidden';
         }
      }
      wazeMap.layers[uroURLayerIdx].markers[urobj].icon.imageDiv.style.visibility = urStyle;
      if(urStyle != 'hidden')
      {
         if(nComments > 0)
         {
            uroAddCommentMarkers(ureq.fid, hasMyComments, nComments);
         }
      }
   }
   
   
   for (var urobj in wazeModel.problems.objects)
   {
      var problem = wazeModel.problems.objects[urobj];
      var problemStyle = 'visible';

      // check problem against current session ignore list...
      if(uroIsOnIgnoreList(problem.fid)) problemStyle = 'hidden';

      // check against closed/not identified filtering if enabled...
      var problem_marker_img = '';
      if(problem.geometry.id != null)
      {
         if(document.getElementById(problem.geometry.id) != null)
         {
            problem_marker_img = document.getElementById(problem.geometry.id).href.baseVal;
            if(document.getElementById('_cbMPFilterSolved').checked == true)
            {
               if(problem_marker_img.indexOf('_solved') != -1) problemStyle = 'hidden';
            }
            if(document.getElementById('_cbMPFilterUnidentified').checked == true)
            {
               if(problem_marker_img.indexOf('_rejected') != -1) problemStyle = 'hidden';
            }
         }
      }
      
      if((problem.attributes.resolvedOn != null) && (document.getElementById('_cbMPFilterClosed').checked == true))
      {
         problemStyle = 'hidden';
      }
            
      if(problemStyle == 'visible')
      {
         if(problem.attributes.problemType == 101)
         {
            if(document.getElementById('_cbMPFilterDrivingDirectionMismatch').checked == true) problemStyle = 'hidden';
         }  
         else if(problem.attributes.problemType == 102)
         {
            if(document.getElementById('_cbMPFilterMissingJunction').checked == true) problemStyle = 'hidden';
         }  
         else if(problem.attributes.problemType == 103)
         {
            if(document.getElementById('_cbMPFilterMissingRoad').checked == true) problemStyle = 'hidden';
         }  
         else if(problem.attributes.problemType == 104)
         {
            if(document.getElementById('_cbMPFilterCrossroadsJunctionMissing').checked == true) problemStyle = 'hidden';
         }  
         else if(problem.attributes.problemType == 105)
         {
            if(document.getElementById('_cbMPFilterRoadTypeMismatch').checked == true) problemStyle = 'hidden';
         }  
         else if(problem.attributes.problemType == 106)
         {
            if(document.getElementById('_cbMPFilterRestrictedTurn').checked == true) problemStyle = 'hidden';
         }
         else if(document.getElementById('_cbMPFilterUnknownProblem').checked == true) problemStyle = 'hidden';
             
         if(document.getElementById('_cbInvertMPFilter').checked == true)
         {
            if(problemStyle == 'hidden') problemStyle = 'visible';
            else problemStyle = 'hidden';
         }
        
              
         if(problem.attributes.weight <= 3)
         {
            if(document.getElementById('_cbMPFilterLowSeverity').checked == true) problemStyle = 'hidden';
         }  
         else if(problem.attributes.weight <= 7)
         {
            if(document.getElementById('_cbMPFilterMediumSeverity').checked == true) problemStyle = 'hidden';
         }
         else if(document.getElementById('_cbMPFilterHighSeverity').checked == true) problemStyle = 'hidden'; 
      }  
      
      wazeMap.layers[uroProblemLayerIdx].markers[urobj].icon.imageDiv.style.visibility = problemStyle;
   }

   for (var urobj in wazeModel.turnProblems.objects)
   {
      var problem = wazeModel.turnProblems.objects[urobj];
      var problemStyle = 'visible';

      // check problem against current session ignore list...
      if(uroIsOnIgnoreList(problem.fid)) problemStyle = 'hidden';

      // check against closed/not identified filtering if enabled...
      var problem_marker_img = '';
      if(problem.geometry.id != null)
      {
         if(document.getElementById(problem.geometry.id) != null)
         {
            problem_marker_img = document.getElementById(problem.geometry.id).href.baseVal;
            if(document.getElementById('_cbMPFilterSolved').checked == true)
            {
               if(problem_marker_img.indexOf('_solved') != -1) problemStyle = 'hidden';
            }
            if(document.getElementById('_cbMPFilterUnidentified').checked == true)
            {
               if(problem_marker_img.indexOf('_rejected') != -1) problemStyle = 'hidden';
            }
         }
      }

      if((problem.attributes.resolvedOn != null) && (document.getElementById('_cbMPFilterClosed').checked == true))
      {
         problemStyle = 'hidden';
      }
      
      if(document.getElementById('_cbMPFilterTurnProblem').checked == true) problemStyle = 'hidden';
             
      if(document.getElementById('_cbInvertMPFilter').checked == true)
      {
         if(problemStyle == 'hidden') problemStyle = 'visible';
         else problemStyle = 'hidden';
      }
                  
      wazeMap.layers[uroProblemLayerIdx].markers[urobj].icon.imageDiv.style.visibility = problemStyle;
   }
}


function uroFilterURMarkers2a()
{
   uroAddLog('catch UR layer change');
   uroFilterURMarkers();
}
function uroFilterURMarkers2b()
{
   uroAddLog('catch UR layer add');
   uroFilterURMarkers();
}
function uroFilterURMarkers2c()
{
   uroAddLog('catch UR layer remove');
   uroFilterURMarkers();
}
function uroFilterURMarkers3a()
{
   uroAddLog('catch camera layer change');
   uroFilterURMarkers();
}
function uroFilterURMarkers3b()
{
   uroAddLog('catch camera layer add');
   uroFilterURMarkers();
}
function uroFilterURMarkers3c()
{
   uroAddLog('catch camera layer remove');
   uroFilterURMarkers();
}
function uroFilterURMarkers4a()
{
   uroAddLog('catch problems layer change');
   uroFilterURMarkers();
}
function uroFilterURMarkers4b()
{
   uroAddLog('catch problems layer add');
   uroFilterURMarkers();
}
function uroFilterURMarkers4c()
{
   uroAddLog('catch problems layer remove');
   uroFilterURMarkers();
}
function uroFilterURMarkers5()
{
   uroAddLog('catch mouse move');
   wazeMap.events.unregister('mousemove',null,uroFilterURMarkers5);
   uroFilterURMarkers();
}


function uroDeleteObject()
{
   uroAddLog('delete camera ID '+uroShownFID);
   if(wazeModel.cameras.objects[uroShownFID] == null) 
   {
      uroAddLog('camera object not found...');
      return false;
   }   

   uroRemoveCamFromWatchList();

   deleteAction = new Waze.Action.DeleteObject(wazeModel.cameras.objects[uroShownFID], null);
   wazeModel.actionManager.add(deleteAction);
   uroExitPopup();
   return false;
}


function uroGetUserNameAndRank(userID)
{
   var userName = wazeModel.users.objects[userID].userName;
   var userLevel = wazeModel.users.objects[userID].rank + 1;
   return userName + ' (' + userLevel + ')';
}
                     
                     
function uroNewLookHighlightedItemsCheck()
{
   if(uroMaskTest() == true) return;

   if(OpenLayers == null) 
   {
      if(uroNullOpenLayers == false)
      {
         uroAddLog('caught null OpenLayers');
         uroNullOpenLayers = true;
      }
      return;
   }
   uroNullOpenLayers = false;

   var rc = document.getElementById(uroRootContainer);
   if(rc == null) 
   {
      if(uroNullRootContainer == false)
      {
         uroAddLog('caught null rootContainer');
         uroNullRootContainer = true
      }
      return;
   }
   uroNullRootContainer = false;
   
   if(wazeMap.layers[uroURLayerIdx] == null) 
   {
      if(uroNullURLayer == false)
      {
         uroAddLog('caught null UR layer');
         uroNullURLayer = true;
      }
      return;
   }
   uroNullURLayer = false;

   if(wazeMap.layers[uroProblemLayerIdx] == null) 
   {
      if(uroNullProblemLayer == false)
      {
         uroAddLog('caught null problem layer');
         uroNullProblemLayer = true;
      }
      return;
   }
   uroNullProblemLayer = false;

   var currentItems = rc.getElementsByTagName('g');

   var result = '';
   var rw;
   var rh;
   var doPopUp = false;
   var popup_loc = new OpenLayers.LonLat(0,0);
   
   var objHasIgnoreLink = false;
   var objHasDeleteLink = false;

   var markerx = null;
   var markery = null;
   var offsetx = rc.getBoundingClientRect().left - rc.offsetLeft;
   var offsety = rc.getBoundingClientRect().top - rc.offsetTop;
   
   var objHasIgnoreLink = false;
   var objHasDeleteLink = false;
   var objHasAddWatchLink = false;
   var objHasRemoveWatchLink = false;
   var objHasUpdateWatchLink = false;

   // look for URs and problems
   var idSrc = null;
   var divIdx = -1;
   var isUR = false;
   var isProblem = false;
   var isTurnProb = false;

   if(document.getElementById('_cbInhibitURPopup').checked == false)
   {
      for(var marker in wazeMap.layers[uroURLayerIdx].markers)
      {
         markerObj = wazeMap.layers[uroURLayerIdx].markers[marker];
         markerImg = window.getComputedStyle(markerObj.icon.imageDiv).getPropertyValue("background-image");
         markerPos = window.getComputedStyle(markerObj.icon.imageDiv).getPropertyValue("background-position");
         markerPos = markerPos.split(' ');
         markerPos = parseInt(markerPos[1].substr(0,markerPos[1].length-2));

         var hovered = false;
         
         // fix for new WME - what possessed the Waze programmers to place the highlighted icon imagery at
         // seemingly random offsets within the iconstrip, rather than having them all grouped neatly together
         // as in previous versions of WME, is yet another design decision that seems to have been made purely
         // for the sake of changing stuff around, rather than for any obviously good reason...
         if(markerImg.indexOf('problems-se224ab677e.png') != -1)
         {
            if((markerPos == -40) || (markerPos == -160) || (markerPos == -200) || (markerPos == -240)) hovered = true;
         }
         else
         {
            if(markerPos > -200) hovered = true;
         }
         if(hovered == true)
         {
            idSrc = markerObj.model.fid;
            markerx = markerObj.icon.imageDiv.offsetLeft;
            markery = markerObj.icon.imageDiv.offsetTop;
            isUR = true;
            uroAddLog('hover over UR ID '+idSrc);
         }
      }
   }
   
   if((isUR == false) && (document.getElementById('_cbInhibitMPPopup').checked == false))
   {
      for(var marker in wazeMap.layers[uroProblemLayerIdx].markers)
      {
         markerObj = wazeMap.layers[uroProblemLayerIdx].markers[marker];
         markerImg = window.getComputedStyle(markerObj.icon.imageDiv).getPropertyValue("background-image");
         markerPos = window.getComputedStyle(markerObj.icon.imageDiv).getPropertyValue("background-position");
         markerPos = markerPos.split(' ');
         markerPos = parseInt(markerPos[1].substr(0,markerPos[1].length-2));
         
         var hovered = false;
         if(markerImg.indexOf('problems-se224ab677e.png') != -1)
         {
            if((markerPos == -320) || (markerPos == -560) || (markerPos == -520) || (markerPos == -440)) hovered = true;
         }
         else
         {
            if(markerPos > -200) hovered = true;
         }
         if(hovered == true)
         {
            idSrc = markerObj.model.fid;
            markerx = markerObj.icon.imageDiv.offsetLeft;
            markery = markerObj.icon.imageDiv.offsetTop;
            isProblem = true;
            uroAddLog('hover over problem ID '+idSrc);            
         }
      }
   }

   if (idSrc != null)
   {
      if(isUR) var ureq = wazeModel.mapUpdateRequests.objects[idSrc];
      else if(isProblem) 
      {
         var ureq = wazeModel.problems.objects[idSrc];
         if(ureq == undefined)
         {
            var ureq = wazeModel.turnProblems.objects[idSrc];
            if(ureq != undefined) isTurnProb = true;
         }
      }
      uroFID = ureq.fid;
      doPopUp = true;
   }
   else
   {
      uroFID = -1;
   }
   if((uroFID != uroShownFID) && (uroFID != -1))
   {
      if(isUR)
      {
         uroAddLog('building popup for UR '+idSrc);
         result = '<b>Update Request ('+idSrc+'): ' + I18n.translations[I18n.locale].update_requests.types[ureq.attributes.type] + '</b><br>';
         if(ureq.attributes.description != null)
         {
            var desc = ureq.attributes.description;
            if(desc != "null")
            {
               var linkStartPos = desc.indexOf('http://');
               if(linkStartPos == -1) linkStartPos = desc.indexOf('https://');
               if(linkStartPos != -1)
               {
                  var descPreLink = desc.slice(0,linkStartPos);
                  var descURL = desc.slice(linkStartPos);
                  var linkEndPos = descURL.indexOf(' ');
                  var descPostLink = '';
                  if(linkEndPos != -1)
                  {
                     descPostLink = descURL.slice(linkEndPos);
                     descURL = descURL.slice(0,linkEndPos);
                  }
                  var linkTarget = '';
                  if(descURL.indexOf('cryosphere') != -1) linkTarget = '_cryosphere';
                  else if(descURL.indexOf('waze.com') != -1) linkTarget = '_wazeUR';
                  desc = descPreLink + '<a target="'+linkTarget+'" href="'+descURL+'">here</a>' + descPostLink;
               }
               result += desc + '<br>';
            }
         }

         var uroDaysOld = uroGetURAge(ureq,0);
         if(uroDaysOld != -1)
         {
            result += '<i>Submitted ' + uroParseDaysAgo(uroDaysOld) + ' ';
            if(ureq.attributes.guestUserName != null)
            {
               result += 'via Livemap';
               if(ureq.attributes.guestUserName != '')
               {
                 result += ' by '+ureq.attributes.guestUserName;
               }
            }
            result += '</i>';
         }
         if(ureq.attributes.resolvedOn != null)
         {
            var uroDaysResolved = uroGetURAge(ureq,1);
            if(uroDaysResolved != -1)
            {
               result += '<br><i>Closed ' + uroParseDaysAgo(uroDaysResolved) + ' ';
               if(ureq.attributes.resolvedBy != null)
               {
                  result += ' by '+uroGetUserNameAndRank(ureq.attributes.resolvedBy);
               }
               result += '</i>';
            }
         }
         
         if(wazeModel.updateRequestSessions.objects[ureq.fid] != null)
         {
            var hasMyComments = uroURHasMyComments(ureq.fid);
            var nComments = wazeModel.updateRequestSessions.objects[ureq.fid].comments.length;
            result += '<br>' + nComments + ' comment';
            if(nComments != 1) result += 's';
            if((hasMyComments == false) && (nComments > 0)) result += ' (none by me)';
            if(nComments > 0)
            {
               var commentDaysOld = uroGetCommentAge(wazeModel.updateRequestSessions.objects[ureq.fid].comments[nComments-1]);
               if(commentDaysOld != -1)
               {
                  result += ', last update '+uroParseDaysAgo(commentDaysOld);
               }
            }
         }
   
      }
      else if(isProblem)
      {
         uroAddLog('building popup for problem '+idSrc);
         if(isTurnProb) result = '<b>Turn Problem ('+idSrc+'): ' + I18n.translations[I18n.locale].problems.types["turn"].title;
         else
         {
            result = '<b>Map Problem ('+idSrc+'): ';
            if(I18n.translations[I18n.locale].problems.types[ureq.attributes.problemType] == undefined) result += 'Unknown problem type ('+ureq.attributes.problemType+')';
            else result += I18n.translations[I18n.locale].problems.types[ureq.attributes.problemType].title;
         }
         result += '</b><br>';
         if(ureq.attributes.resolvedOn != null)
         {
            var uroDaysResolved = uroGetURAge(ureq,1);
            if(uroDaysResolved != -1)
            {
               result += '<br><i>Closed ' + uroParseDaysAgo(uroDaysResolved) + ' ';
               if(ureq.attributes.resolvedBy != null)
               {
                  result += ' by '+uroGetUserNameAndRank(ureq.attributes.resolvedBy);
               }
               result += '</i>';
            }
         }         
      }

      // add "open new WME tab" link
      var urPos=new OpenLayers.LonLat(ureq.geometry.x,ureq.geometry.y);
      urPos.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));
      var urLink = document.location.href;
      if(urLink.indexOf('&layers') != -1)
      {
         var urLayers = urLink.substr(urLink.indexOf('&layers'));
         if(urLayers.indexOf('&show') != -1) urLayers = urLayers.substr(0,urLayers.indexOf('&show'));
      }
      else var urLayers = '';      
      urLink = urLink.substr(0,urLink.indexOf('?zoom'));      
      if(isUR) urLink += '?zoom=5&lat='+urPos.lat+'&lon='+urPos.lon+urLayers+'&showur='+idSrc+'&endshow';
      else if(isTurnProb) urLink += '?zoom=5&lat='+urPos.lat+'&lon='+urPos.lon+urLayers+'&showturn='+idSrc+'&endshow';
      else if(isProblem) urLink += '?zoom=5&lat='+urPos.lat+'&lon='+urPos.lon+urLayers+'&showproblem='+idSrc+'&endshow';      
      result += '<hr><ul><li><a href="'+urLink+'" target="_urTab">Open in new WME tab</a>';
      // add "open new livemap tab" link
      var lmLink = null;
      if(document.getElementsByClassName("waze-header-menu").length == 0)
      {      
         uroAddLog('Livemap link in livemap element');
         lmLink = document.getElementById('livemap').href;     
      }
      else
      {
         uroAddLog('Livemap link in header menu, locating...');
         var menuItems = document.getElementsByClassName("waze-header-menu")[0];
         for(var miloop = 0; miloop<menuItems.childElementCount; miloop++)
         {
            if(menuItems.children[miloop].innerHTML.indexOf('livemap') != -1)
            {
               uroAddLog('found link in menu entry '+miloop);
               lmLink = menuItems.children[miloop].getElementsByTagName('a')[0].href;
               uroAddLog(lmLink);
            }
         }  
      }
      if(lmLink != null)
      {  
         var zpos = lmLink.indexOf('?');      
         if(zpos > -1) lmLink = lmLink.substr(0,zpos);      
         lmLink += '?zoom=17&lat='+urPos.lat+'&lon='+urPos.lon+'&layers=BTTTT';      
         result += '<li><a href="'+lmLink+'" target="_lmTab">Open in new livemap tab</a>';      
      }
      // add "ignore for this session" link
      result += '<li><a href="#" id="_addtoignore">Hide for this session</a></ul>';      
      objHasIgnoreLink = true;      
      //uroFID = ureq.fid;
   }

   // look for cameras
   var vroot = uroCamvroot;
   if((currentItems[vroot] != null) && (doPopUp == false) && (document.getElementById('_cbInhibitCamPopup').checked == false))
   {
      // check for a highlighted camera...
      var currentCameras = currentItems[vroot].getElementsByTagName('image');
      var camIndex = -1;
      for(var loop=0;loop<currentCameras.length;loop++)
      {
          if(currentCameras[loop].getAttribute('width') == 44) camIndex = loop;
      }

      if(camIndex != -1)
      {
         var idSrc = currentCameras[camIndex].id;
         markerx = Math.round(currentCameras[camIndex].getBoundingClientRect().left - offsetx);
         markery = Math.round(currentCameras[camIndex].getBoundingClientRect().bottom - offsety - 25);
         for (var urobj in wazeModel.cameras.objects)
         {
            var ureq = wazeModel.cameras.objects[urobj];
            // test isSelected() so that we only do overview data on cameras that are being hovered over
            if((idSrc == ureq.geometry.id)&&(ureq.isSelected() == false))
            {
               doPopUp = true;
               //if(uroPopupShown == false)
               {
                  uroFID = ureq.fid;
                  uroAddLog('generating popup for camera '+uroFID);
                  result += '<b>Camera: ' + ureq.TYPES[ureq.attributes.type] + '</b><br>';
                  result += 'ID: '+uroFID+'<br>';
                  result += 'Created by ';
                  if(wazeModel.users.get(ureq.attributes.createdBy) != null)
                  {
                     userID = ureq.attributes.createdBy;
                     result += uroGetUserNameAndRank(userID);
                  }
                  else result += 'unknown';
                  result += ', ';
                  var camAge = uroGetCameraAge(ureq,1);
                  if(camAge != -1)
                  {
                     result += uroParseDaysAgo(camAge);
                  }
                  else result += 'unknown days ago';

                  result += '<br>Updated by ';
                  if(wazeModel.users.get(ureq.attributes.updatedBy) != null)
                  {
                     userID = ureq.attributes.updatedBy;
                     userName = wazeModel.users.objects[userID].userName;
                     userLevel = wazeModel.users.objects[userID].rank + 1;
                     result += userName + ' (' + userLevel + ')';
                  }
                  else result += 'unknown';
                  result += ', ';
                  var camAge = uroGetCameraAge(ureq,0);
                  if(camAge != -1)
                  {
                     result += uroParseDaysAgo(camAge);
                  }
                  else result += 'unknown days ago';
                  
                  result += '<br>Speed data: ';

                  if(ureq.attributes.speed != null)
                  {
                     result += ureq.attributes.speed + 'km/h';
                     var speedInMPH = Math.round(ureq.attributes.speed / 1.609);
                     result += ' (' + speedInMPH + 'mph';
                     if((speedInMPH % 10) != 0) result += ' - not valid?';
                     result += ')</i>';
                  }
                  else result += 'unknown';

                  var uid = wazeModel.loginManager.getLoggedInUser().id;
                  
                  result += '<hr><ul>';
                  if(uroIsCamOnWatchList(uroFID) != -1)
                  {
                     result += '<li><a href="#" id="_updatewatchlist">Update watchlist entry</a>';
                     result += '<li><a href="#" id="_removefromwatchlist">Remove from watchlist</a>';
                     objHasUpdateWatchLink = true;
                     objHasRemoveWatchLink = true;
                  }
                  else
                  {
                     result += '<li><a href="#" id="_addtowatchlist">Add to watchlist</a>';
                     objHasAddWatchLink = true;
                  }

                  if(ureq.attributes.permissions != 0)
                  {
                     result += '<li><a href="#" id="_deleteobject">Delete Camera</a>';
                     objHasDeleteLink = true;
                  }
                  result += '</ul>';
               }
            }
         }
      }
   }


   if(doPopUp == true)
   {
      uroPopupX = markerx + offsetx + 15;
      uroPopupY = markery + offsety + 25;
      if(uroFID != uroShownFID)
      {
         uroAddLog('FID mismatch, show popup: '+uroFID+'/'+uroShownFID);
         uroShownFID = uroFID;
         uroPopupShown = false;
      }

      if(uroPopupShown == false)
      {
         uroAddLog('display popup at '+uroPopupX+','+uroPopupY);
         uroPopupShown = true;
         uroDiv.innerHTML = result;
         if((uroFID != -1) && (objHasIgnoreLink == true))
         {
            document.getElementById('_addtoignore').addEventListener('click', uroAddToIgnoreList, true);
         }
         if(objHasDeleteLink == true)
         {
            document.getElementById('_deleteobject').addEventListener('click', uroDeleteObject, true);
         }  
         if(objHasRemoveWatchLink == true)
         {
            document.getElementById('_removefromwatchlist').addEventListener('click', uroRemoveCamFromWatchList, true);
         }  
         if(objHasAddWatchLink == true)
         {
            document.getElementById('_addtowatchlist').addEventListener('click', uroAddCamToWatchList, true);
         }
         if(objHasUpdateWatchLink == true)
         {
            document.getElementById('_updatewatchlist').addEventListener('click', uroUpdateCamWatchList, true);
         }  
         rw = parseInt(uroDiv.clientWidth);
         rh = parseInt(uroDiv.clientHeight);

         if(rw > (window.innerWidth / 2)) rw = (window.innerWidth / 2);
         if(rh > (window.innerHeight / 2)) rh = (window.innerHeight / 2);

         if((uroPopupX + rw) > window.innerWidth)
         {
            uroPopupX = window.innerWidth - (rw + 50);
            if(uroPopupX < 0) uroPopupX = 0;
         }
         if((uroPopupY + rh) > window.innerHeight)
         {
            uroPopupY = window.innerHeight - (rh + 50);
            if(uroPopupY < 0) uroPopupY = 0;
         }

         uroDiv.style.top = uroPopupY+'px';
         uroDiv.style.left = uroPopupX+'px';
         uroDiv.clientWidth = rw+'px';
         uroDiv.clientHeight = rh+'px';
         uroDiv.style.visibility = 'visible';
      }
      uroPopupTimer = -1;
   }
   else
   {
      if(uroPopupTimer == -1)
      {
         uroPopupTimer = 2;
      }
   }

   if(uroPopupTimer > 0)
   {
      if(uroMouseInPopup == false) uroPopupTimer--;
   }
   if(uroPopupTimer == 0)
   {
      uroDiv.style.visibility = 'hidden';
      uroPopupShown = false;
      uroPopupTimer = -2;
      uroShownFID = -1;
   }
}

function uroRestyleWMETabs()
{
   var navTabs = document.getElementById(uroUserTabId).children[1].children;
   for(var loop = 0; loop<navTabs.length; loop++)
   {
      navTabs[loop].children[0].style.padding = "4px";
   }
   setTimeout(uroRestyleWMETabs,1000);
}

function uroExclusiveCB()
{
   cbChecked = document.getElementById(this.id).checked;
   
   if(cbChecked == true)
   {
      if(this.id == '_cbHideMyComments') document.getElementById('_cbHideAnyComments').checked = false;
      if(this.id == '_cbHideAnyComments') document.getElementById('_cbHideMyComments').checked = false;
      if(this.id == '_cbHideIfLastCommenter') document.getElementById('_cbHideIfNotLastCommenter').checked = false;
      if(this.id == '_cbHideIfNotLastCommenter') document.getElementById('_cbHideIfLastCommenter').checked = false;
      if(this.id == '_cbHideIfReporterLastCommenter') document.getElementById('_cbHideIfReporterNotLastCommenter').checked = false;
      if(this.id == '_cbHideIfReporterNotLastCommenter') document.getElementById('_cbHideIfReporterLastCommenter').checked = false;
   }
}

function uroTenthSecondTick()
{
   if(uroSetupListeners)
   {
      if(loginManager.isLoggedIn())
      {
         uroSetupListeners = false;
         
         // filter markers when the marker objects are modified (this happens whenever WME needs to load fresh marker data
         // due to having panned/zoomed the map beyond the extents of the previously loaded data)
         wazeModel.mapUpdateRequests.events.register("objectschanged", null, uroFilterURMarkers2a);
         wazeModel.mapUpdateRequests.events.register("objectsadded", null, uroFilterURMarkers2b);
         wazeModel.mapUpdateRequests.events.register("objectsremoved", null, uroFilterURMarkers2c);
         wazeModel.cameras.events.register("objectschanged", null, uroFilterURMarkers3a);
         wazeModel.cameras.events.register("objectsadded", null, uroFilterURMarkers3b);
         wazeModel.cameras.events.register("objectsremoved", null, uroFilterURMarkers3c);
         wazeModel.problems.events.register("objectschanged", null, uroFilterURMarkers4a);
         wazeModel.problems.events.register("objectsadded", null, uroFilterURMarkers4b);
         wazeModel.problems.events.register("objectsremoved", null, uroFilterURMarkers4c);

         var userTabs = document.getElementById(uroUserTabId);
         var navTabs = uroTimbonesGetElementsByClassName('nav-tabs', userTabs)[0];
         var tabContent = uroTimbonesGetElementsByClassName('tab-content', userTabs)[0];
         newtabUR = document.createElement('li');
         newtabUR.innerHTML = '<a href="#sidepanel-uroverview" data-toggle="tab">URO+</a>';
         navTabs.appendChild(newtabUR);
         uroControls.id = "sidepanel-uroverview";
         uroControls.className = "tab-pane";
         tabContent.appendChild(uroControls);

         document.getElementById('_btnUndoLastHide').addEventListener("click", uroRemoveLastAddedIgnore, true);
         document.getElementById('_btnClearSessionHides').addEventListener("click", uroRemoveAllIgnores, true);
         uroEnableIgnoreListControls();

         document.getElementById('_btnClearCamWatchList').addEventListener("click", uroClearCamWatchList, true);
         
         document.getElementById('_btnSettingsToText').addEventListener("click", uroSettingsToText, true);
         document.getElementById('_btnTextToSettings').addEventListener("click", uroTextToSettings, true);
         document.getElementById('_btnClearSettingsText').addEventListener("click", uroClearSettingsText, true);

         document.getElementById("_linkSelectUserRequests").onclick = uroShowURTab;
         document.getElementById("_linkSelectMapProblems").onclick = uroShowMPTab;
         document.getElementById("_linkSelectCameras").onclick = uroShowCameraTab;
         document.getElementById("_linkSelectMisc").onclick = uroShowMiscTab;
         document.getElementById("_linkSelectCWL").onclick = uroShowCamWatchlistTab;
         
         document.getElementById('_cbHideMyComments').onclick = uroExclusiveCB;
         document.getElementById('_cbHideAnyComments').onclick = uroExclusiveCB;
         document.getElementById('_cbHideIfLastCommenter').onclick = uroExclusiveCB;
         document.getElementById('_cbHideIfNotLastCommenter').onclick = uroExclusiveCB;
         document.getElementById('_cbHideIfReporterLastCommenter').onclick = uroExclusiveCB;
         document.getElementById('_cbHideIfReporterNotLastCommenter').onclick = uroExclusiveCB;        

         uroAddLog('finalise onload');
         uroLoadSettings();
         uroNewLookCheckDetailsRequest();
         
         if(document.getElementById('_cbEnableDTE').checked)
         {
            if(dteControlsIdx != -1) dteSetNewTabLength();
            else
            {
               uroAddLog('ERROR - archive panel not found!');
               document.getElementById(uroUserTabId).style.display = '';
            }      
         }
         
         if(document.getElementById('_cbEnableSRS').checked)
         {
            selectionManager.events.register("selectionchanged", null, srsCheckSidePanel);
            uroAddLog('added SRS event handler');           
         }  

         // filter markers as and when the map is moved
         wazeMap.events.register("move", null, uroFilterURMarkers);

         uroSetStyles(uroCtrlURs);
         uroSetStyles(uroCtrlMPs);
         uroSetStyles(uroCtrlCameras);
         uroSetStyles(uroCtrlMisc);
         uroSetStyles(uroCamWatchlist);

         uroShowURTab();
         uroRestyleWMETabs();
         uroUserID = loginManager.getLoggedInUser().id;
         uroFilterURMarkers();
      }
   }
   else
   {
      uroNewLookHighlightedItemsCheck();
      uroURSCurrentCount = Object.keys(wazeModel.updateRequestSessions.objects).length;
      if(uroURSCurrentCount != uroURSPrevCount)
      {
         uroFilterURMarkers();
         uroURSPrevCount = uroURSCurrentCount;
      }
   }
}

function uroToggleURCtrls()
{
   uroCtrlsHidden = !uroCtrlsHidden;
   if (!uroCtrlsHidden)
   {
      document.getElementById('_hideUCCtrl').innerHTML = "hide";
      if(uroCurrentTab == 1) uroShowURTab();
      else if(uroCurrentTab == 2) uroShowMPTab();
      else if(uroCurrentTab == 3) uroShowCameraTab();
      else if(uroCurrentTab == 4) uroShowCamWatchlistTab();
      else if(uroCurrentTab == 5) uroShowMiscTab();
   }
   else
   {
      document.getElementById('_hideUCCtrl').innerHTML = "show";
      document.getElementById('uroCtrlURs').style.display = 'none';
      document.getElementById('uroCtrlMPs').style.display = 'none';
      document.getElementById('uroCtrlCameras').style.display = 'none';
      document.getElementById('uroCtrlMisc').style.display = 'none';
      document.getElementById('uroCamWatchlist').style.display = 'none';
   }

   return false;
}

function uroActiveTab(_id)
{
   var e = document.getElementById(_id);
   e.style.backgroundColor = "aliceblue";
   e.style.borderTop = "1px solid";
   e.style.borderLeft = "1px solid";
   e.style.borderRight = "1px solid";
   e.style.borderBottom = "0px solid";
}

function uroInactiveTab(_id)
{
   var e = document.getElementById(_id);
   e.style.backgroundColor = "white";
   e.style.borderTop = "0px solid";
   e.style.borderLeft = "0px solid";
   e.style.borderRight = "0px solid";
   e.style.borderBottom = "1px solid";
}


function uroInactiveAllTabs()
{
   uroInactiveTab("_tabSelectCameras");
   uroInactiveTab("_tabSelectMapProblems");
   uroInactiveTab("_tabSelectMisc");
   uroInactiveTab("_tabSelectUserRequests");
   uroInactiveTab("_tabSelectCWL");
   
   if(!uroCtrlsHidden)
   {
      document.getElementById('uroCtrlURs').style.display = 'none';
      document.getElementById('uroCtrlMPs').style.display = 'none';
      document.getElementById('uroCtrlCameras').style.display = 'none';
      document.getElementById('uroCtrlMisc').style.display = 'none';
      document.getElementById('uroCamWatchlist').style.display = 'none';
   }   
}

  
function uroShowURTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectUserRequests");
   uroCurrentTab = 1;
   if(!uroCtrlsHidden) document.getElementById('uroCtrlURs').style.display = 'block';
   return false;
}


function uroShowMPTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectMapProblems");
   uroCurrentTab = 2;
   if(!uroCtrlsHidden) document.getElementById('uroCtrlMPs').style.display = 'block';
   return false;
}


function uroShowCameraTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectCameras");
   uroCurrentTab = 3;
   if(!uroCtrlsHidden) document.getElementById('uroCtrlCameras').style.display = 'block';
   return false;
}

function uroShowCamWatchlistTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectCWL");
   uroCurrentTab = 4;
   if(!uroCtrlsHidden) document.getElementById('uroCamWatchlist').style.display = 'block';
   uroCWLUpdateHTML();
   return false;
}
 
function uroShowMiscTab()
{
   uroInactiveAllTabs();
   uroActiveTab("_tabSelectMisc");
   uroCurrentTab = 5;
   if(!uroCtrlsHidden) document.getElementById('uroCtrlMisc').style.display = 'block';
   return false;
}


function uroTimbonesGetElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++)
    if (re.test(els[i].className)) a.push(els[i]);
  return a;
}

function uroNewLookCheckDetailsRequest()
{
   var thisurl = document.location.href;
   var doRetry = true;
   showurpos = thisurl.indexOf('&showur=');
   showproblempos = thisurl.indexOf('&showproblem=');
   showturnpos = thisurl.indexOf('&showturn=');
   endmarkerpos = thisurl.indexOf('&endshow');
   if(endmarkerpos != -1)
   {
      if(showurpos != -1)
      {
         showurpos += 8;
         uroAddLog('showur tab opened');
         var urID = thisurl.substr(showurpos,endmarkerpos-showurpos);
         uroAddLog(' UR ID = '+urID);
         if(wazeMap.layers[uroURLayerIdx].markers == null)
         {
            uroAddLog('wazeMap.layers not loaded, retrying...');
         }
         else
         {
            for(var marker in wazeMap.layers[uroURLayerIdx].markers)
            {
               markerObj = wazeMap.layers[uroURLayerIdx].markers[marker];
               if (urID == markerObj.model.fid)
               {
                  doRetry = false;
                  markerObj.icon.imageDiv.click();
               }
            }
         }
      }

      else if((showproblempos != -1) || (showturnpos != -1))
      {
         if(showproblempos != -1)
         {
            showproblempos += 13;
            uroAddLog('showproblem tab opened');
            var urID = thisurl.substr(showproblempos,endmarkerpos-showproblempos);
            uroAddLog(' problem ID = '+urID);
         }
         else
         {
            showturnpos += 10;
            uroAddLog('showturn tab opened');
            var urID = thisurl.substr(showturnpos,endmarkerpos-showturnpos);
            uroAddLog(' turn problem ID = '+urID);
         }
         if(wazeMap.layers[uroProblemLayerIdx].markers == null)
         {
            uroAddLog('wazeMap.layers not loaded, retrying...');
         }
         else
         {
            for(var marker in wazeMap.layers[uroProblemLayerIdx].markers)
            {
               markerObj = wazeMap.layers[uroProblemLayerIdx].markers[marker];
               if (urID == markerObj.model.fid)
               {
                  doRetry = false;
                  markerObj.icon.imageDiv.click();
               }
            }
         }
      }
   }

   if(doRetry) setTimeout(uroNewLookCheckDetailsRequest,500);
}


function uroSetStyles(obj)
{
   obj.style.fontSize = '12px';
   obj.style.lineHeight = '100%';
   obj.style.overflow = 'auto';
   obj.style.height = (window.innerHeight * 0.55) + 'px';
}


function uroWazeBits()
{
   uroAddLog('adding WazeBits...');   
   if((uroWazeBitsPresent & 0x01) == 0)
   {
      if(typeof unsafeWindow.wazeMap != "undefined")
      {
         uroAddLog('   wazeMap OK');
         wazeMap = unsafeWindow.wazeMap;
         uroWazeBitsPresent |= 0x01;
      }
      else if(typeof unsafeWindow.W != "undefined")
      {
         if(typeof unsafeWindow.W.controller != "undefined")
         {
            if(typeof unsafeWindow.W.controller.map != "undefined")
            {
               uroAddLog('   wazeMap OK');
               wazeMap = unsafeWindow.W.controller.map;
               uroWazeBitsPresent |= 0x01;
            }
         }
      }
   }  
   if((uroWazeBitsPresent & 0x02) == 0)
   {
      if(typeof unsafeWindow.wazeModel != "undefined")
      {
         uroAddLog('   wazeModel OK');
         wazeModel = unsafeWindow.wazeModel;
         uroWazeBitsPresent |= 0x02;
      }
      else if(typeof unsafeWindow.W != "undefined")
      {
         if(typeof unsafeWindow.W.controller != "undefined")
         {
            if(typeof unsafeWindow.W.controller.model != "undefined")
            {
               uroAddLog('   wazeModel OK');
               wazeModel = unsafeWindow.W.controller.model;
               uroWazeBitsPresent |= 0x02;
            }
         }
      }
   }
   if((uroWazeBitsPresent & 0x04) == 0)
   {
      if(typeof unsafeWindow.loginManager != "undefined")
      {
         uroAddLog('   loginManager OK');
         loginManager = unsafeWindow.loginManager;
         uroWazeBitsPresent |= 0x04;
      }
      else if(typeof unsafeWindow.W != "undefined")
      {
         if(typeof unsafeWindow.W.app != "undefined")
         {
            if(typeof unsafeWindow.W.app.loginManager != "undefined")
            {
               uroAddLog('   loginManager OK');
               loginManager = unsafeWindow.W.app.loginManager;
               uroWazeBitsPresent |= 0x04;
            }
         }
      }
   }
   if((uroWazeBitsPresent & 0x08) == 0)
   {
      if(typeof unsafeWindow.selectionManager != "undefined")
      {
         uroAddLog('   selectionManager OK');
         selectionManager = unsafeWindow.selectionManager;
         uroWazeBitsPresent |= 0x08;
      }
      else if(typeof unsafeWindow.W != "undefined")
      {
         if(typeof unsafeWindow.W.geometryEditing != "undefined")
         {
            if(typeof unsafeWindow.W.geometryEditing.selectionManager != "undefined")
            {
               uroAddLog('   selectionManager OK');
               selectionManager = unsafeWindow.W.geometryEditing.selectionManager;
               uroWazeBitsPresent |= 0x08;
            }
         }
      }
   }
   if((uroWazeBitsPresent & 0x10) == 0)
   {
      if(typeof unsafeWindow.OpenLayers != "undefined")
      {
         uroAddLog('   OpenLayers OK');
         OpenLayers = unsafeWindow.OpenLayers;
         uroWazeBitsPresent |= 0x10;
      }
   }
   if((uroWazeBitsPresent & 0x20) == 0)
   {
      if(typeof unsafeWindow.Waze != "undefined")
      {
         uroAddLog('   Waze OK');
         Waze = unsafeWindow.Waze;
         uroWazeBitsPresent |= 0x20;
      }
   }
   if((uroWazeBitsPresent & 0x40) == 0)
   {
      if(document.getElementById('user-tabs') != null)
      {
         uroUserTabId = 'user-tabs';
         uroAddLog('   user-tabs OK');
         uroWazeBitsPresent |= 0x40;
      }
      else if(document.getElementById('user-info') != null)
      {
         uroUserTabId = 'user-info';
         uroAddLog('   user-info OK');
         uroWazeBitsPresent |= 0x40;
      }
   }
   if((uroWazeBitsPresent & 0x80) == 0)
   {
      if(document.getElementById('sidepanel-drives') != null)
      {
         uroAddLog('   sidepanel-drives OK');
         uroWazeBitsPresent |= 0x80;
      }
   }

   if(uroWazeBitsPresent != 0xFF) setTimeout(uroWazeBits,250);
   else if(loginManager.isLoggedIn() == false)
   {
      uroAddLog('Waiting for user log-in...');
      setTimeout(uroWazeBits,1000);
   }
   else
   {
      uroAddLog('All WazeBits present and correct...');
      uroControls.appendChild(uroCtrlURs);
      uroControls.appendChild(uroCtrlMPs);
      uroControls.appendChild(uroCtrlCameras);
      uroControls.appendChild(uroCamWatchlist);
      uroControls.appendChild(uroCtrlMisc);
      uroControls.appendChild(uroCtrlHides);

      uroCtrlURs.onclick = uroFilterURMarkers;
      uroCtrlMPs.onclick = uroFilterURMarkers;
      uroCtrlCameras.onclick = uroFilterURMarkers;
      uroCtrlMisc.onclick = uroFilterURMarkers;

      for(i=0;i<wazeMap.layers.length;i++)
      {
         if(wazeMap.layers[i].uniqueName == 'update_requests') uroURLayerIdx = i;
         if(wazeMap.layers[i].uniqueName == 'problems') uroProblemLayerIdx = i;
         if(wazeMap.layers[i].name == 'Spotlight') uroMaskLayer = i;
         if(wazeMap.layers[i].uniqueName == 'speed_cameras') 
         {
            uroCamvroot = wazeMap.layers[i].div.id + '_vroot';
            uroCamLayer = i;
         }
         if(wazeMap.layers[i].name.indexOf('Waze.Control.SelectHighlightFeature') != -1) uroRootContainer = wazeMap.layers[i].div.id;
      }

      for(i=0;i<wazeMap.controls.length;i++)
      {
         if(wazeMap.controls[i].CLASS_NAME == 'Waze.View.ArchivePanel') dteControlsIdx = i;
         else if(wazeMap.controls[i].CLASS_NAME == 'Waze.Control.Archive') dteControlsIdx = i;

         if(wazeMap.controls[i].id != null) 
         {
            if(wazeMap.controls[i].id.indexOf('UpdateRequests') != -1) uroURControlsIdx = i;
            if(wazeMap.controls[i].id.indexOf('MapProblems') != -1) uroProblemControlsIdx = i;
         }
      }
      uroAddLog('UR layer at idx '+uroURLayerIdx);
      uroAddLog('Problem layer at idx '+uroProblemLayerIdx);
      uroAddLog('uroMaskLayer at idx '+uroMaskLayer);
      uroAddLog('Camera layer at idx '+uroCamLayer);
      uroAddLog('uroCamvroot = '+uroCamvroot);
      uroAddLog('uroRootContainer = '+uroRootContainer);

      uroDiv.addEventListener("mouseover", uroEnterPopup, false);
      uroDiv.addEventListener("mouseout", uroExitPopup, false);

      if(sessionStorage.UROverview_FID_IgnoreList == null) sessionStorage.UROverview_FID_IgnoreList = '';
      if(sessionStorage.UROverview_FID_WatchList == null) sessionStorage.UROverview_FID_WatchList = '';

      setInterval(uroTenthSecondTick,100);
   }
}

function uroEnterPopup()
{
   uroMouseInPopup = true;
}

function uroExitPopup()
{
   uroMouseInPopup = false;
}

function uroInitialise()
{
   uroGlobals();
   
   if(document.URL.indexOf('editor-beta') != -1) uroBetaEditor = true;

   // create a new div to display the UR details floaty-box
   uroDiv = document.createElement('div');
   uroDiv.id = "uroDiv";
   uroDiv.style.position = 'absolute';
   uroDiv.style.visibility = 'hidden';
   uroDiv.style.top = '0';
   uroDiv.style.left = '0';
   uroDiv.style.zIndex = 100;
   uroDiv.style.backgroundColor = 'aliceblue';
   uroDiv.style.borderWidth = '3px';
   uroDiv.style.borderStyle = 'ridge';
   uroDiv.style.borderRadius = '10px';
   uroDiv.style.boxShadow = '5px 5px 10px Silver';
   uroDiv.style.padding = '4px';
   document.body.appendChild(uroDiv);


   uroControls = document.createElement('section');
   uroControls.style.fontSize = '12px';
   uroControls.id = 'uroControls'; 
   tabbyHTML = '<b><a href="http://userscripts.org/scripts/show/145186" target="_blank">UROverview Plus</a></b> '+uroVersion;
   tabbyHTML += '<p><table border=0 width="100%"><tr>';
   tabbyHTML += '<td valign="center" align="center" id="_tabSelectUserRequests"><a href="#" id="_linkSelectUserRequests" style="text-decoration:none;font-size:12px">URs</a></td>';
   tabbyHTML += '<td valign="center" align="center" id="_tabSelectMapProblems"><a href="#" id="_linkSelectMapProblems" style="text-decoration:none;font-size:12px">MPs</a></td>';
   tabbyHTML += '<td valign="center" align="center" id="_tabSelectCameras"><a href="#" id="_linkSelectCameras" style="text-decoration:none;font-size:12px">Cams</a></td>';
   tabbyHTML += '<td valign="center" align="center" id="_tabSelectCWL"><a href="#" id="_linkSelectCWL" style="text-decoration:none;font-size:12px">CWL</a></td>';   
   tabbyHTML += '<td valign="center" align="center" id="_tabSelectMisc"><a href="#" id="_linkSelectMisc" style="text-decoration:none;font-size:12px">Misc</a></td>';
   tabbyHTML += '</tr></table>';
   uroControls.innerHTML = tabbyHTML;


   uroCtrlURs = document.createElement('p');
   uroCtrlMPs = document.createElement('p');
   uroCtrlCameras = document.createElement('p');
   uroCamWatchlist = document.createElement('p');
   uroCtrlMisc = document.createElement('p');
   uroCtrlHides = document.createElement('div');

   // UR controls tab
   uroCtrlURs.id = "uroCtrlURs";
   uroCtrlURs.innerHTML = '<br>';

   uroCtrlURs.innerHTML += '<b>Hide URs by type:</b><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterWazeAuto">Waze Automatic</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterIncorrectTurn">Incorrect turn</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterIncorrectAddress">Incorrect address</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterIncorrectRoute">Incorrect route</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingRoundabout">Missing roundabout</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterGeneralError">General error</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterTurnNotAllowed">Turn not allowed</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterIncorrectJunction">Incorrect junction</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingBridgeOverpass">Missing bridge overpass</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterWrongDrivingDirection">Wrong driving direction</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingExit">Missing exit</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingRoad">Missing road</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterBlockedRoad">Blocked road</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterMissingLandmark">Missing Landmark</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterUndefined">Undefined</input><br>';

   uroCtrlURs.innerHTML += '&nbsp;&nbsp;<i>UK Specific types</i><br>';
   uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterCryosphere">Petrol Station Checker</input><br>';
   uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbFilterRoadworks">Roadworks</input><br><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbInvertURFilter">Invert operation of type filters?</input><br>';
   
   uroCtrlURs.innerHTML += '<br><b>Hide closed/solved/unidentified URs:</b><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterClosedUR">Closed</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterSolved">Solved</input><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbFilterUnidentified">Not identified</input><br><br>';


   uroCtrlURs.innerHTML += '<br><b>Filter URs by age of submission:</b><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableMinAgeFilter">Hide URs less than </input>';
   uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterMinDays"> days old<br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableMaxAgeFilter">Hide URs more than </input>';
   uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterMaxDays"> days old<br>';

   uroCtrlURs.innerHTML += '<br><b>Filter URs by description keyword:</b><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableKeywordMustBePresent">Hide URs not including </input>';
   uroCtrlURs.innerHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textKeywordPresent"><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableKeywordMustBeAbsent">Hide URs including </input>';
   uroCtrlURs.innerHTML += '<input type="text" style="font-size:14px; line-height:16px; height:22px; margin-bottom:4px;" id="_textKeywordAbsent"><br>';
   uroCtrlURs.innerHTML += '&nbsp;&nbsp;<input type="checkbox" id="_cbCaseInsensitive">Case-insensitive matches?</input><br>';
   
   uroCtrlURs.innerHTML += '<br><b>Hide URs by comments/following:</b><br>';
   uroCtrlURs.innerHTML += '<i>With comments from me?</i><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideMyComments">Yes </input>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideAnyComments">No</input><br>';
   
   uroCtrlURs.innerHTML += '<i>If last comment made by me?</i><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideIfLastCommenter">Yes </input>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideIfNotLastCommenter">No </input><br>';
   
   uroCtrlURs.innerHTML += '<i>If last comment made by UR reporter?</i><br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideIfReporterLastCommenter">Yes </input>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideIfReporterNotLastCommenter">No</input><br>';

   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableMinCommentsFilter">With less than </input>';
   uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterMinComments"> comments<br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableMaxCommentsFilter">With more than </input>';
   uroCtrlURs.innerHTML += '<input type="number" min="0" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterMaxComments"> comments<br>';
   
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideMyFollowed">Ones I am or </input>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbHideMyUnfollowed">am not following</input><br>';

   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableCommentAgeFilter2">Last comment less than </input>';
   uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterCommentDays2"> days ago<br>';
   uroCtrlURs.innerHTML += '<input type="checkbox" id="_cbEnableCommentAgeFilter">Last comment more than </input>';
   uroCtrlURs.innerHTML += '<input type="number" min="1" size="3" style="width:50px;line-height:14px;height:22px;margin-bottom:4px;" id="_inputFilterCommentDays"> days ago<br>';


   // Map problems controls tab
   uroCtrlMPs.id = "uroCtrlMPs";
   uroCtrlMPs.innerHTML = '<br>';

   uroCtrlMPs.innerHTML += '<b>Filter MPs by type:</b><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterMissingJunction">Missing junction</input><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterMissingRoad">Missing road</input><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterCrossroadsJunctionMissing">Missing crossroads</input><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterDrivingDirectionMismatch">Driving direction mismatch</input><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterRoadTypeMismatch">Road type mismatch</input><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterRestrictedTurn">Restricted turn might be allowed</input><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterUnknownProblem">Unknown problem type</input><br><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterTurnProblem">Turn Problems</input><br><br>';
   
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbInvertMPFilter">Invert operation of type filters?</input><br>';

   uroCtrlMPs.innerHTML += '<br><b>Hide closed/solved/unidentified Problems:</b><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterClosed">Closed</input><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterSolved">Solved</input><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterUnidentified">Not identified</input><br><br>';

   uroCtrlMPs.innerHTML += '<br><b>Hide problems (not turn) by severity:</b><br>';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterLowSeverity">Low</input>&nbsp;&nbsp;';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterMediumSeverity">Medium</input>&nbsp;&nbsp;';
   uroCtrlMPs.innerHTML += '<input type="checkbox" id="_cbMPFilterHighSeverity">High</input><br>';



   // Camera controls tab
   uroCtrlCameras.id = "uroCtrlCameras";
   uroCtrlCameras.innerHTML = '<br><b>Show Cameras by creator:</b><br>';
   uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowWorldCams" checked>world_* users</input><br>';
   uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowUSACams" checked>usa_* users</input><br>';
   uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowNonWorldCams" checked>other users</input><br>';
   uroCtrlCameras.innerHTML += '<br><input type="checkbox" id="_cbShowOnlyMyCams">Show ONLY cameras created/edited by me</input><br>';


   uroCtrlCameras.innerHTML += '<br><b>Show Cameras by approval status:</b><br>';
   uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowApprovedCams" checked>approved</input><br>';
   uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowNonApprovedCams" checked>non-approved</input><br>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowOlderCreatedNonApproved"> if created more than </input>';
   uroCtrlCameras.innerHTML += '<input type="number" min="1" size="3" style="width:50px;;line-height:14px;height:22px;margin-bottom:4px;" id="_inputCameraMinCreatedDays"> days ago<br>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowOlderUpdatedNonApproved"> if updated more than </input>';
   uroCtrlCameras.innerHTML += '<input type="number" min="1" size="3" style="width:50px;;line-height:14px;height:22px;margin-bottom:4px;" id="_inputCameraMinUpdatedDays"> days ago<br>';

   uroCtrlCameras.innerHTML += '<br><b>Show Cameras by type:</b><br>';
   uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowSpeedCams" checked>Speed</input><br>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowIfMPHSpeedSet" checked> with MPH speeds</input><br>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowIfKPHSpeedSet" checked> with KM/H speeds</input><br>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbShowIfNoSpeedSet" checked> with no speed</input><br>';
   uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowRedLightCams" checked>Red Light</input><br>';
   uroCtrlCameras.innerHTML += '<input type="checkbox" id="_cbShowDummyCams" checked>Dummy</input><br>';

   uroCtrlCameras.innerHTML += '<br><b>Hide Cameras by creator:</b><br>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByMe">me</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank0">L1</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank1">L2</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank2">L3</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank3">L4</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank4">L5</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideCreatedByRank5">L6</input>';

   uroCtrlCameras.innerHTML += '<br><b>Hide Cameras by updater:</b><br>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByMe">me</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank0">L1</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank1">L2</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank2">L3</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank3">L4</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank4">L5</input>';
   uroCtrlCameras.innerHTML += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="_cbHideUpdatedByRank5">L6</input>';

   uroCtrlCameras.innerHTML += '<br><br><b><input type="checkbox" id="_cbHideCWLCams">Hide cameras on CWL</input></b><br>';

   
   // Camera watchlist tab
   uroCamWatchlist.id = "uroCamWatchlist";
   uroCWLUpdateHTML();
   

   // Misc controls tab
   uroCtrlMisc.id = "uroCtrlMisc";
   uroCtrlMisc.innerHTML = '<br><b>Use default conversation markers:</b><br>';
   uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbNativeConvoMarkers" checked>in public WME</input><br>';
   uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbNativeBetaConvoMarkers" checked>in beta WME</input><br>';
   
   uroCtrlMisc.innerHTML += '<br><br><b><input type="checkbox" id="_cbCommentCount">Show comment count on UR markers</input></b><br>';
   
   uroCtrlMisc.innerHTML += '<br><br><b><input type="checkbox" id="_cbInhibitURPopup">Disable popup for URs</input></b><br>';
   uroCtrlMisc.innerHTML += '<b><input type="checkbox" id="_cbInhibitMPPopup">Disable popup for MPs</input></b><br>';
   uroCtrlMisc.innerHTML += '<b><input type="checkbox" id="_cbInhibitCamPopup">Disable popup for cameras</input></b><br>';

   uroCtrlMisc.innerHTML += '<br><br><b><input type="checkbox" id="_cbWhiteBackground">Use white background</input></b><br>';
   
   uroCtrlMisc.innerHTML += '<br><b>Enable integrated scripts:</b><br>';
   uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbEnableDTE">Drive Tab Enhancement</input><br>';
   uroCtrlMisc.innerHTML += '<input type="checkbox" id="_cbEnableSRS">Select Roundabout Segments</input><br>';

   uroCtrlMisc.innerHTML += '<br><br><b>Settings backup/restore:</b><br>';
   uroCtrlMisc.innerHTML += '<input type="button" id="_btnSettingsToText" value="Backup">&nbsp;&nbsp;&nbsp;';
   uroCtrlMisc.innerHTML += '<input type="button" id="_btnTextToSettings" value="Restore">&nbsp;&nbsp;|&nbsp;&nbsp;';
   uroCtrlMisc.innerHTML += '<input type="button" id="_btnClearSettingsText" value="Clear"><br>';
   uroCtrlMisc.innerHTML += '<textarea id="_txtSettings" value="">';
   


   // footer for tabs container
   uroCtrlHides.id = 'uroCtrlHides';
   uroCtrlHides.innerHTML = '<input type="button" id="_btnUndoLastHide" value="Undo last hide">&nbsp;&nbsp;&nbsp;';
   uroCtrlHides.innerHTML += '<input type="button" id="_btnClearSessionHides" value="Undo all hides">';


   window.addEventListener("beforeunload", uroSaveSettings, false);
   
   uroWazeBits();
}


function dteAddHeader()
{                   
   rlcObj = document.getElementsByClassName("result-list-container");
   if(typeof rlcObj == "undefined") return;
   if(typeof rlcObj[0].children[0] == "undefined") return;
   if(typeof rlcObj[0].children[0].innerHTML == "undefined") return;
   
   var thtml = rlcObj[0].children[0].innerHTML;
   if(thtml.indexOf('Full drive history') == -1)
   {
      thtml += '<br><br><i><small>Full drive history goes back to '+dteOldestFullDrive.toDateString()+'</small></i>';
      rlcObj[0].children[0].innerHTML = thtml;
   }
}


function dteSetNewTabLength()
{
   uroAddLog('altering ResultsPerPage parameter...');

   var t = document.getElementById('sidepanel-drives');
 	t.style.overflow = 'auto';
	t.style.height = (window.innerHeight * 0.6) + 'px';

   baseloc = 'https://'+window.location.hostname+Waze.Config.api_base+'/Archive/MyList?minDistance=1000';

   var a = new XMLHttpRequest();
   var idxCheckFullDrive = 0;
   var fullDrives = 0;
   var foundMissingDrive = false;

   while(!foundMissingDrive)
   {
      document.getElementById(uroUserTabId).style.display = 'none';
      var loc = baseloc+'&offset='+fullDrives+'&count=5';
      uroAddLog('requesting '+loc);
      a.open('GET',loc,false);
      a.send();
      var b = JSON.parse(a.responseText);
      var loadedDrives = b.archives.objects.length;
      uroAddLog('received '+loadedDrives+' drives');
      if(loadedDrives != 5) foundMissingDrive = true;

      for(var loop=0; loop < loadedDrives; loop++)
      {
         if(b.archives.objects[loop].hasFullSession == false) foundMissingDrive = true;
         else
         {
            fullDrives++;
            dteOldestFullDrive = new Date(b.archives.objects[loop].startTime);
         }
      }
   }

   uroAddLog(fullDrives+' full drives in history');
   uroAddLog('oldest drives are on '+dteOldestFullDrive.toDateString());
   if(fullDrives < 5)
   {
      fullDrives = 5;
      uroAddLog('insufficient full drives, using standard drives tab');
   }
   else if(fullDrives > 50)
   {
      uroAddLog('too many full drives for a single tab page, splitting over multiple pages...');
      fullDrives = Math.ceil(fullDrives/Math.ceil(fullDrives/50));
   }
   document.getElementById(uroUserTabId).style.display = '';
   if((dteOldestFullDrive - dteEpoch) > 0)
   {
      uroAddLog('updating drives tab...');
      wazeMap.controls[dteControlsIdx].sidePanelView.ResultsPerPage = fullDrives;
      setInterval(dteAddHeader,250);
   }
}


function srsSelect()
{
   rbtID = selectionManager.selectedItems[0].attributes.junctionID;
   uroAddLog('selecting roundabout ID '+rbtID);
   selectionManager.selectControl.unselectAll();

   for(var seg in wazeModel.segments.objects)
   {
      if(wazeModel.segments.objects[seg].attributes.junctionID == rbtID)
      {
         uroAddLog('...adding segment '+seg);
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
   document.getElementById('segment-edit-general').appendChild(srsCtrl);
   document.getElementById('srsButton').onclick = srsSelect;
}


uroBootstrap();
