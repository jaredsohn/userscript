// ==UserScript==
// @name                DrivesTabEnhancer
// @namespace           http://greasemonkey.chizzum.com
// @description         Enhances Drives tab in WME
// @include             https://*.waze.com*editor*
// @include             https://editor-beta.waze.com/*
// @grant               none
// @version             0.6
// ==/UserScript==

function dteGlobals()
{
   dteVersion = "v0.6";
   dteWazeBitsPresent = 0;
   dteControlsIdx = -1;
   dteOldestFullDrive = new Date(0);
   dteEpoch = new Date(0);
}


function dteBootstrap()
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
   dteInitialise();
}

function dteAddLog(logtext)
{
   console.log('DriveTabEnhancer: '+logtext);
}

function dteWazeBits()
{
   dteAddLog('getting WazeBits...');
   if((dteWazeBitsPresent & 0x01) == 0)
   {
      if(typeof unsafeWindow.wazeMap != "undefined")
      {
         dteAddLog('   wazeMap OK');
         wazeMap = unsafeWindow.wazeMap;
         dteWazeBitsPresent |= 0x01;
      }
   }
   
   if((dteWazeBitsPresent & 0x02) == 0)
   {
      if(document.getElementById('user-tabs') != null)
      {
         dteAddLog('   user-tabs OK');
         document.getElementById('user-tabs').style.display = 'none';
         dteWazeBitsPresent |= 0x02;
      }
   }
   
   if((dteWazeBitsPresent & 0x04) == 0)
   {
      if(document.getElementById('sidepanel-drives') != null)
      {
         dteAddLog('   sidepanel-drives OK');
         dteWazeBitsPresent |= 0x04;
      }
   }

   if((dteWazeBitsPresent & 0x08) == 0)
   {
      if(typeof unsafeWindow.loginManager != "undefined")
      {
         dteAddLog('   loginManager OK');
         loginManager = unsafeWindow.loginManager;
         dteWazeBitsPresent |= 0x08;
      }
   }

   if(dteWazeBitsPresent != 0x0F) setTimeout(dteWazeBits,250);
   else if(loginManager.isLoggedIn() == false)
   {
      dteAddLog('Waiting for user log-in...');
      setTimeout(dteWazeBits,1000);
   }
   else
   {
      dteAddLog('All WazeBits present and correct...');

      for(i=0;i<wazeMap.controls.length;i++)
      {
         if(wazeMap.controls[i].CLASS_NAME == 'Waze.View.ArchivePanel') dteControlsIdx = i;
      }

      if(dteControlsIdx != -1) dteSetNewTabLength();
      else
      {
         dteAddLog('ERROR - archive panel not found!');
         document.getElementById('user-tabs').style.display = '';
      }
   }
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
   dteAddLog('altering ResultsPerPage parameter...');

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
      document.getElementById('user-tabs').style.display = 'none';
      var loc = baseloc+'&offset='+fullDrives+'&count=5';
      dteAddLog('requesting '+loc);
      a.open('GET',loc,false);
      a.send();
      var b = JSON.parse(a.responseText);
      var loadedDrives = b.archives.objects.length;
      dteAddLog('received '+loadedDrives+' drives');
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

   dteAddLog(fullDrives+' full drives in history');
   dteAddLog('oldest drives are on '+dteOldestFullDrive.toDateString());
   if(fullDrives < 5)
   {
      fullDrives = 5;
      dteAddLog('insufficient full drives, using standard drives tab');
   }
   else if(fullDrives > 50)
   {
      dteAddLog('too many full drives for a single tab page, splitting over multiple pages...');
      fullDrives = Math.ceil(fullDrives/Math.ceil(fullDrives/50));
   }
   document.getElementById('user-tabs').style.display = '';
   if((dteOldestFullDrive - dteEpoch) > 0)
   {
      dteAddLog('updating drives tab...');
      wazeMap.controls[dteControlsIdx].sidePanelView.ResultsPerPage = fullDrives;
      setInterval(dteAddHeader,250);
   }
}

function dteInitialise()
{
   dteGlobals();
   dteWazeBits();
}

dteBootstrap();
