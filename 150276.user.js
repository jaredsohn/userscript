// ==UserScript==
// @name                LiveMap UR Overlay
// @namespace           http://greasemonkey.chizzum.com
// @description         Overlays UR markers onto Livemap
// @include             https://*.waze.com/*livemap*
// @include             http://*.waze.com/*livemap*
// @grant               none
// @version             2.7
// ==/UserScript==

function lmurGlobals()
{
   lmurVersion = '2.7';
   lmurData = null;
   lmurDoOnload = true;
   lmurDiv = document.createElement('div');
   lmurPopup = document.createElement('div');
   lmurUI = document.createElement('div');
   lmurMarkerList = false;
   lmurUserID = undefined;
   lmurIsLoggedIn = undefined;
   lmurMarkers = new Array();
   lmurAreasGrabbed = ':';
   lmurPrevCentre = null;
   lmurInhibitNudgeDetection = true;
   lmurControlsHidden = true;
   lmurControlsEnabled = false;
   lmurPlayModeEnabled = false;
   lmurInhibitSave = true;
   lmurInnerHeight = -1;
   lmurUIHeight = 0;
   lmurCacheExpiryPeriod = 300;
   lmurInhibitCacheRefresh = false;
   lmurNoForcedRefreshThisCycle = true;
   
   lmurDebugCount = 0;
}

function lmurBootstrap()
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
   lmurInitialise();
}

function lmurSaveSettings()
{
   if(lmurInhibitSave) return;

   if (localStorage)
   {
      var options = '';
      var lmurOptions = document.getElementById('lmurCtrls').getElementsByTagName('input');
      for (var optIdx=0;optIdx<lmurOptions.length;optIdx++)
      {
         var id = lmurOptions[optIdx].id;
         if((id.indexOf('_cb') == 0)||(id.indexOf('_text') == 0)||(id.indexOf('_input') == 0)||(id.indexOf('_radio') == 0))
         {
            options += ':' + id;
            if((lmurOptions[optIdx].type == 'checkbox')||(lmurOptions[optIdx].type == 'radio')) options += ',' + lmurOptions[optIdx].checked.toString();
            else if((lmurOptions[optIdx].type == 'text')||(lmurOptions[optIdx].type == 'number')) options += ',' + lmurOptions[optIdx].value.toString();
         }
      }
      var lmurOptions = document.getElementById('lmurCtrls').getElementsByTagName('select');
      for (var optIdx=0;optIdx<lmurOptions.length;optIdx++)
      {
         var id = lmurOptions[optIdx].id;
         if(id.indexOf('_select') == 0)
         {
            options += ':' + id;
            options += ',' + lmurOptions[optIdx].selectedIndex.toString();
         }
      }
      localStorage.LMUROverviewOptions = options;
   }
}

function lmurLoadSettings()
{
   lmurAddLog('loadSettings()');
   if (localStorage.LMUROverviewOptions)
   {
      var options = localStorage.LMUROverviewOptions.split(':');
      for(var optIdx=0;optIdx<options.length;optIdx++)
      {
         var fields = options[optIdx].split(',');
         if(document.getElementById(fields[0]) != undefined)
         {
            if((fields[0].indexOf('_cb') == 0)||(fields[0].indexOf('_radio') == 0)) document.getElementById(fields[0]).checked = (fields[1] == 'true');
            else if(fields[0].indexOf('_select') == 0) document.getElementById(fields[0]).selectedIndex = fields[1];
            else if((fields[0].indexOf('_input') == 0)||(fields[0].indexOf('_text') == 0)) document.getElementById(fields[0]).value = fields[1];
         }
      }
   }
   lmurInhibitSave = false;
}

function lmurAddLog(logtext)
{
   console.log('LMUR: '+logtext);
}


function lmurMarker(markerPos, markerObj, markerType, markerSquare, nComments, userLastComment, ageLastComment, loggedInUserComments, isFollowing)
{
   this.markerPos = markerPos;
   this.markerObj = markerObj;
   this.markerType = markerType;
   this.markerSquare = markerSquare;
   this.markerHidden = false;
   this.px = -1;
   this.py = -1;
   this.nComments = nComments;
   this.userLastComment = userLastComment;
   this.ageLastComment = ageLastComment;
   this.loggedInUserComments = loggedInUserComments;
   this.isFollowing = isFollowing;
}

function lmurUpdateMarkerObj(markerID, nComments, userLastComment, ageLastComment, loggedInUserComments, isFollowing)
{
   for(var objID=0; objID < lmurMarkers.length; objID++)
   {
      if(lmurMarkers[objID].markerObj.id == markerID)
      {
         lmurMarkers[objID].nComments = nComments;
         lmurMarkers[objID].userLastComment = userLastComment;
         lmurMarkers[objID].ageLastComment = ageLastComment;
         lmurMarkers[objID].loggedInUserComments = loggedInUserComments;
         lmurMarkers[objID].isFollowing = isFollowing;
         break;
      }
   }     
}


function lmurSquareIsCached(thisSquare)
{
   return (lmurAreasGrabbed.indexOf(':'+thisSquare) != -1);
}


function lmurGetSquareAge(thisSquare)
{
   squarePos = lmurAreasGrabbed.indexOf(':'+thisSquare);
   squareLength = lmurAreasGrabbed.indexOf(':',squarePos+1) - squarePos;
   squareData = lmurAreasGrabbed.substr(squarePos,squareLength);
   sdBits = squareData.split(',');
   timeNow = Math.floor(new Date().getTime() / 1000);
   return (timeNow - parseInt(sdBits[2]));
}


function lmurRemoveSquareFromCacheList(thisSquare)
{
   for(i=lmurMarkers.length-1;i>=0;i--)
   {
      var ureq = lmurMarkers[i];
      if(ureq.markerSquare == thisSquare)
      {
         lmurMarkers.splice(i,1);
      }
   } 
      
   squareStart = lmurAreasGrabbed.indexOf(':'+thisSquare);
   squareEnd = lmurAreasGrabbed.indexOf(':',squareStart+1);
   preList = lmurAreasGrabbed.substr(0,squareStart);
   postList = lmurAreasGrabbed.substr(squareEnd);
   lmurAreasGrabbed = preList + postList;
}


function lmurGetMarkerAge(ureq)
{
   return lmurGetSquareAge(ureq.markerSquare);
}  


function lmurGetCommentsData(idList)
{
   var lmurRequest = new XMLHttpRequest();
   var timeNow = new Date().getTime();
   
   lmurFetchURL = 'https://www.waze.com/' + W.location.getUrlPrefix() + 'Descartes-live/app/MapProblems/UpdateRequests?ids='+idList;
   lmurAddLog('requesting '+lmurFetchURL);
   lmurRequest.open('GET', lmurFetchURL, false);
   try
   {
      lmurRequest.send();
      lmurAddLog('response '+lmurRequest.status+' received');
      if (lmurRequest.status === 200)
      {
         var lmurData = JSON.parse(lmurRequest.responseText);
         for(var ursObj in lmurData.updateRequestSessions.objects)
         {
            urSesh = lmurData.updateRequestSessions.objects[ursObj];
            var nComments = urSesh.comments.length;
            var userLastComment = urSesh.comments[nComments-1].userID;
            var ageLastComment = Math.floor((timeNow - urSesh.comments[nComments-1].createdOn) / 86400000);
            var loggedInUserComments = false;
            for(var loop=0;loop<nComments;loop++)
            {
               if(urSesh.comments[loop].userID == lmurUserID)
               {
                  loggedInUserComments = true;
                  break;
               }
            }
            var isFollowing = urSesh.isFollowing;
            lmurUpdateMarkerObj(urSesh.id,nComments,userLastComment,ageLastComment,loggedInUserComments,isFollowing);
         }
      }
      else
      {
         lmurAddLog('request failed (status != 200)');
         alert('Unable to access comments data on server');
      }
   }
   catch(err)
   {
      lmurAddLog('request failed (exception '+err+' caught)');
   }
}

  
function lmurGetMarkers()
{
   var lmurRequest = new XMLHttpRequest();

   lmurCentre = new L.LatLng(W.controller._mapView.map.getCenter().lng,W.controller._mapView.map.getCenter().lat);
   timeNow = Math.floor(new Date().getTime() / 1000);

   fetchLeft = Math.floor(lmurCentre.lng)-1;
   for(loop1=0; loop1<3; loop1++)
   {
      fetchBottom = Math.floor(lmurCentre.lat)-1;
      for(loop2=0; loop2<3; loop2++)
      {
         thisSquare = fetchLeft+','+fetchBottom;
         
         var isCached = lmurSquareIsCached(thisSquare);         
         if(isCached)
         {
            // change for 2.7 - no longer force reload squares that are still in the cache at this
            // point.  This prevents the constant cache reloads that occur whenever the mapview
            // is relocated within the already cached area or when filter settings are changed.
            // The exception to this rule is that the square at the centre of the mapview will be
            // reloaded if it's at least 60s old.
            if((loop1 == 1) && (loop2 == 1) && (lmurGetSquareAge(thisSquare) >= 60))
            {
               isCached = false;
               lmurAddLog('focussed square '+thisSquare+' is 60+s old, reloading...');
               lmurRemoveSquareFromCacheList(thisSquare);
            }

            if(isCached)
            {
               lmurAddLog('square '+thisSquare+' already cached, skipping...');
            }
         }
         if(!isCached)
         {
            lmurAddLog('square '+thisSquare+' not in cache, requesting from server...');
          
            var withCommentsCount = 0;
            var withCommentsIDs = '';
            
            thisSquareWithTime = thisSquare + ','+timeNow+':';
            var fetchTop = parseFloat(fetchBottom)+0.999;
            var fetchRight = parseFloat(fetchLeft)+0.999;
            lmurFetchURL = 'https://www.waze.com/' + W.location.getUrlPrefix() + 'Descartes-live/app/Features?language=en&mapUpdateRequestFilter=0&problemFilter=0&turnProblemFilter=0';
            if(document.getElementById('_cbEnablePlayMode').checked == true) lmurFetchURL += '&sandbox=true';
            lmurFetchURL += '&bbox=';
            lmurFetchURL += fetchBottom + ',' + fetchLeft + ',' + fetchTop + ',' + fetchRight;
            lmurAddLog('requesting '+lmurFetchURL);
            lmurRequest.open('GET', lmurFetchURL, false);

            try
            {
               lmurRequest.send();
               lmurAddLog('response '+lmurRequest.status+' received');
               if (lmurRequest.status === 200)
               {
                  lmurAreasGrabbed += thisSquareWithTime;
                  var lmurData = JSON.parse(lmurRequest.responseText);
                  lmurAddLog(lmurData.mapUpdateRequests.objects.length+' URs, '+lmurData.problems.objects.length+' problems and '+lmurData.turnProblems.objects.length+' turn problems in this area');

                  for(var useridx = 0; useridx < lmurData.users.objects.length; useridx++) if(lmurData.users.objects[useridx].isStaff != null) break;

                  // store URs
                  for(var urobj in lmurData.mapUpdateRequests.objects)
                  {
                     var ureq = lmurData.mapUpdateRequests.objects[urobj];
                     var urpos = new L.LatLng(ureq.geometry.coordinates[1],ureq.geometry.coordinates[0]);
                     lmurMarkers.push(new lmurMarker(urpos, ureq, 1, thisSquare, 0, -1, -1, false, false));
                     
                     if(lmurUserID != undefined)
                     {
                        if(ureq.hasComments == true)
                        {
                           if(++withCommentsCount > 1)
                           {
                              withCommentsIDs += ',';
                           }   
                           withCommentsIDs += ureq.id;
            
                           if(withCommentsCount == 50)
                           {
                              lmurAddLog('Getting a block of comments data...');
                              lmurGetCommentsData(withCommentsIDs);
                              withCommentsCount = 0;
                              withCommentsIDs = '';
                           }
                        }  
                     }
                  }
                  if(lmurUserID != undefined)
                  {
                     if(withCommentsCount > 0)
                     {
                        lmurAddLog('Getting a block of comments data...');
                        lmurGetCommentsData(withCommentsIDs);
                     }
                  }
                  
                  // store map problems
                  for(var urobj in lmurData.problems.objects)
                  {
                     var ureq = lmurData.problems.objects[urobj];
                     var urpos = new L.LatLng(ureq.geometry.coordinates[1],ureq.geometry.coordinates[0]);
                     lmurMarkers.push(new lmurMarker(urpos, ureq, 2, thisSquare, 0, -1, -1, false, false));
                  }
                  // store turn problems
                  for(var urobj in lmurData.turnProblems.objects)
                  {
                     var ureq = lmurData.turnProblems.objects[urobj];
                     var urpos = new L.LatLng(ureq.geometry.coordinates[1],ureq.geometry.coordinates[0]);
                     lmurMarkers.push(new lmurMarker(urpos, ureq, 3, thisSquare, 0, -1, -1, false, false));
                  }
               }
               else
               {
                  lmurAddLog('request failed (status != 200)');
                  alert('Unable to access UR/problem data on server');
               }
            }
            catch(err)
            {
               lmurAddLog('request failed (exception '+err+' caught)');
               document.getElementById('_cbShowURs').checked = false;
               alert('Unable to access UR/problem data on server');
            }
         }
 
         fetchBottom = parseFloat(fetchBottom) + 1;
      }
      fetchLeft = parseFloat(fetchLeft) + 1;
   }
}


function lmurKeywordPresent(desc, keyword)
{
   if(document.getElementById('_cbURCaseInsensitive').checked == true) re = RegExp(keyword,'i'); 
   else re = RegExp(keyword);
   if(desc.search(re) == -1) return false;
   else return true;
}


function lmurFilterMarkers(ureq)
{
   // URs
   if(ureq.markerType == 1)
   {
      if (document.getElementById('_cbShowURs').checked == false) return true;
      
      // resolved filtering
      if(document.getElementById('_cbUREnableResolvedFilter').checked == true)
      {
         if(ureq.markerObj.resolvedOn != null) return true;
      }
        
      // age-based filtering
      var daysOld = lmurGetURAge(ureq.markerObj,0);
      if(daysOld != 999999)
      {
         if(document.getElementById('_cbUREnableMinAgeFilter').checked == true)
         {
            if(daysOld < document.getElementById('_inputURFilterMinDays').value) return true;
         }
         if(document.getElementById('_cbUREnableMaxAgeFilter').checked == true)
         {
            if(daysOld > document.getElementById('_inputURFilterMaxDays').value) return true;
         }
      }
      
      // comment based filtering
      if(lmurIsLoggedIn)
      {
         if(document.getElementById('_cbURHideWithMyComments').checked == true)
         {
            if(ureq.loggedInUserComments) return true;
         }
         if(document.getElementById('_cbURShowWithMyComments').checked == true)
         {
            if(!ureq.loggedInUserComments) return true;
         }
         if(document.getElementById('_cbURHideLastCommentByMe').checked == true)
         {
            if(ureq.userLastComment == lmurUserID) return true;
         }
         if(document.getElementById('_cbURShowLastCommentByMe').checked == true)
         {
            if(ureq.userLastComment != lmurUserID) return true;
         }
         if(document.getElementById('_cbURHideLastCommentByReporter').checked == true)
         {
            if(ureq.userLastComment == -1) return true;
         }
         if(document.getElementById('_cbURShowLastCommentByReporter').checked == true)
         {
            if(ureq.userLastComment != -1) return true;
         }
         if(document.getElementById('_cbURHideWithLessThanComments').checked == true)
         {
            if(ureq.nComments < document.getElementById('_inputFilterMinComments').value) return true;
         }
         if(document.getElementById('_cbURShowWithLessThanComments').checked == true)
         {
            if(ureq.nComments >= document.getElementById('_inputFilterMinComments').value) return true;
         }
         /*
         if(document.getElementById('_cbURHideFollowedURs').checked == true)
         {
            if(ureq.isFollowing) return true;
         }
         if(document.getElementById('_cbURShowFollowedURs').checked == true)
         {
            if(!ureq.isFollowing) return true;
         }
         */
         if(document.getElementById('_cbURHideLastCommentAge').checked == true)
         {
            if(ureq.ageLastComment < document.getElementById('_inputFilterCommentAge').value) return true;
         }
         if(document.getElementById('_cbURShowLastCommentAge').checked == true)
         {
            if(ureq.ageLastComment >= document.getElementById('_inputFilterCommentAge').value) return true;
         }
         
      }
      
      
      // keyword and type-specific filtering
      var cryosphere_link = false;
      var wazeauto_ur = false;
      var ukroadworks_ur = false;
      var desc = '';
      var urFilter = false;

      if(ureq.markerObj.description != null) desc = ureq.markerObj.description;
      if(document.getElementById('_cbUREnableKeywordMustBePresent').checked == 1)
      {
         if(!lmurKeywordPresent(desc,document.getElementById('_textURKeywordPresent').value)) return true;
      }
      if(document.getElementById('_cbUREnableKeywordMustBeAbsent').checked == 1)
      {
         if(lmurKeywordPresent(desc,document.getElementById('_textURKeywordAbsent').value)) return true;
      }


      // for type-based filtering, we need to handle Petrol Station URs first - these (currently)
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
         if(document.getElementById('_cbURFilterCryosphere').checked == 1) urFilter = true;
      }
      else if(wazeauto_ur == true)
      {
         if(document.getElementById('_cbURFilterWazeAuto').checked == 1) urFilter = true;
      }
      else if(ukroadworks_ur == true)
      {
         if(document.getElementById('_cbURFilterRoadworks').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 6)
      {
         if(document.getElementById('_cbURFilterIncorrectTurn').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 7)
      {
         if (document.getElementById('_cbURFilterIncorrectAddress').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 8)
      {
         if(document.getElementById('_cbURFilterIncorrectRoute').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 9)
      {
         if(document.getElementById('_cbURFilterMissingRoundabout').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 10)
      {
         if(document.getElementById('_cbURFilterGeneralError').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 11)
      {
         if(document.getElementById('_cbURFilterTurnNotAllowed').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 12)
      {
         if(document.getElementById('_cbURFilterIncorrectJunction').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 13)
      {
         if(document.getElementById('_cbURFilterMissingBridgeOverpass').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 14)
      {
         if(document.getElementById('_cbURFilterWrongDrivingDirection').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 15)
      {
         if(document.getElementById('_cbURFilterMissingExit').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 16)
      {
         if(document.getElementById('_cbURFilterMissingRoad').checked == 1) urFilter = true;
      }
      else if(ureq.markerObj.type == 19)
      {
         if(document.getElementById('_cbURFilterBlockedRoad').checked == 1) urFilter = true;
      }      
      else if(document.getElementById('_cbURFilterUndefined').checked == 1) urFilter = true;
         

      if(document.getElementsByName('lmurShowURs')[0].checked)
      {
        if(urFilter == true) urFilter = false;
        else urFilter = true;
      }
      return urFilter;
   }

   // Waze-generated problems
   else if(ureq.markerType == 2)
   {
      if (document.getElementById('_cbShowProblems').checked == false) return true;
      
      // resolved filter
      // resolved filtering
      if(document.getElementById('_cbMPEnableResolvedFilter').checked == true)
      {
         if(ureq.markerObj.resolvedOn != null) return true;
      }      

      // filter by severity
      if(ureq.markerObj.weight <= 3)
      {
         if (document.getElementById('_cbMPFilterLowSeverity').checked == 1) return true;
      }
      else if(ureq.markerObj.weight <= 7)
      {
         if (document.getElementById('_cbMPFilterMediumSeverity').checked == 1) return true;
      }
      else if(ureq.markerObj.weight > 7)
      {
         if (document.getElementById('_cbMPFilterHighSeverity').checked == 1) return true;
      }

      var problemFilter = false;

      if(ureq.markerObj.problemType == 101)
      {
         if(document.getElementById('_cbMPFilterDrivingDirectionMismatch').checked == 1) problemFilter = true;
      }
      else if(ureq.markerObj.problemType == 102)
      {
         if(document.getElementById('_cbMPFilterMissingJunction').checked == 1) problemFilter = true;
      }
      else if(ureq.markerObj.problemType == 103)
      {
         if(document.getElementById('_cbMPFilterMissingRoad').checked == 1) problemFilter = true;
      }
      else if(ureq.markerObj.problemType == 104)
      {
         if(document.getElementById('_cbMPFilterCrossroadsJunctionMissing').checked == 1) problemFilter = true;
      }
      else if(ureq.markerObj.problemType == 105)
      {
         if(document.getElementById('_cbMPFilterRoadTypeMismatch').checked == 1) problemFilter = true;
      }
      else if(ureq.markerObj.problemType == 106)
      {
         if(document.getElementById('_cbMPFilterRestrictedTurn').checked == 1) problemFilter = true;
      }
      else if(document.getElementById('_cbMPFilterUnknownProblem').checked == 1) problemFilter = true;

      if(document.getElementsByName('lmurShowProblems')[0].checked)
      {
        if(problemFilter == true) problemFilter = false;
        else problemFilter = true;
      }
      return problemFilter;
   }

   // Waze-generated turn problems
   else if(ureq.markerType == 3)
   {
      // resolved filtering
      if(document.getElementById('_cbTPEnableResolvedFilter').checked == true)
      {
         if(ureq.markerObj.resolvedOn != null) return true;
      }
     
      if (document.getElementById('_cbShowTurnProbs').checked == false) return true;
      else return false;
   }
}


function lmurVisualiseMarkers()
{
   // don't visualise anything if the user isn't logged-in or hasn't asked for anything to be visualised...
   if
   (
      (lmurIsLoggedIn == false) ||
      (
         (document.getElementById('_cbShowURs').checked == false) && 
         (document.getElementById('_cbShowProblems').checked == false) && 
         (document.getElementById('_cbShowTurnProbs').checked == false)
      )
   )
   {
      lmurAddLog('inhibit visualisation');
      lmurDiv.innerHTML = '';
      return;
   }

   lmurAddLog('enabling nudge detection');
   lmurPrevCentre = W.controller._mapView.map.getCenter();
   lmurInhibitNudgeDetection = false;
   if(lmurInhibitCacheRefresh == false)
   {
      document.body.style.opacity = '0.2';
      lmurAddLog('refreshing marker cache, please wait...');
      lmurGetMarkers();
      document.body.style.opacity = '1';
   }

   lmurMarkerList = false;
   lmurAddLog('visualise markers');
   var currentlat = W.controller._mapView.map.getCenter().lat;
   var currentlon = W.controller._mapView.map.getCenter().lng;
   mapObj = document.getElementById("map");
   var currentwidth = mapObj.offsetWidth;
   var currentheight = mapObj.offsetHeight;


   lmurDiv.style.width = currentwidth;
   lmurDiv.style.height = currentheight;
   var svgSrc = '<svg xmlns="http://www.w3.org/2000/svg" width="'+currentwidth+'px" height="'+currentheight+'px" version="1.1">';

   // visualise cached data areas
   var cachedSquares = lmurAreasGrabbed.split(':');
   var csTotal = cachedSquares.length-1;
   var corner1 = new L.LatLng(0,0);
   var corner2 = new L.LatLng(0,0);
   lmurAddLog((csTotal-1)+' cached squares to visualise'); 
   for(sq=1;sq<csTotal;sq++)
   {
      var sqCorner = cachedSquares[sq].split(',');
      corner1.lat = parseFloat(sqCorner[0]);
      corner1.lng = parseFloat(sqCorner[1]);
      thisSquare = corner1.lat+','+corner1.lng;
      sqAge = lmurGetSquareAge(thisSquare);
      if(sqAge > lmurCacheExpiryPeriod)
      {
         lmurRemoveSquareFromCacheList(thisSquare);
      }
      else
      {  
         fillOpacity = 0.2 - ((sqAge * 0.15) / lmurCacheExpiryPeriod);
         corner2.lat = corner1.lat+1;
         corner2.lng = corner1.lng+1;
         pix1 = W.controller._mapView.map.latLngToContainerPoint(corner1);
         pix2 = W.controller._mapView.map.latLngToContainerPoint(corner2);
         svgSrc += '<rect x="'+pix1.x+'" y="'+pix2.y+'" width="'+(pix2.x-pix1.x)+'" height="'+(pix1.y-pix2.y)+'" style="fill:yellow;stroke:none;fill-opacity:'+fillOpacity+'"/>';
      }
   }

   // mark URs and problems
   var urpos = new L.LatLng(0,0);
   var hideMarker;
   for(i=0;i<lmurMarkers.length;i++)
   {
      var ureq = lmurMarkers[i];
      hideMarker = lmurFilterMarkers(ureq);
      if(hideMarker == false)
      {
         urpos.lng = ureq.markerPos.lng;
         urpos.lat = ureq.markerPos.lat;
         var urpix = W.controller._mapView.map.latLngToContainerPoint(urpos);
         lmurMarkers[i].px = urpix.x;
         lmurMarkers[i].py = urpix.y;
         if((urpix.x < 0)||(urpix.x >= W.controller._mapView.map._size.x)||(urpix.y < 0)||(urpix.y >= W.controller._mapView.map._size.y)) hideMarker = true;
      }
      else
      {
         lmurMarkers[i].px = -1;
         lmurMarkers[i].py = -1;
      }
      lmurMarkers[i].markerHidden = hideMarker;
   }

   if(W.controller._mapView.map._zoom < 11)
   {
      var clusterDist = Math.min(Math.floor(W.controller._mapView.map._size.y / 20),Math.floor(W.controller._mapView.map._size.x / 20));
      var marker_rad = clusterDist / 3;
      if(marker_rad < 10) marker_rad = 10;
      var threshold = 1;

      if(lmurMarkers.length > 1)
      {
         for(var i=0;i<lmurMarkers.length-1;i++)
         {
            if(lmurMarkers[i].markerHidden == false)
            {
               fillOpacity = 1 - ((lmurGetMarkerAge(lmurMarkers[i]) * .9) / lmurCacheExpiryPeriod);
               if(fillOpacity < 0.1) fillOpacity = 0.1;
               var clusterSize = 1;
               var clusterX = lmurMarkers[i].px;
               var clusterY = lmurMarkers[i].py;
               var xmin = lmurMarkers[i].px-clusterDist;
               var xmax = lmurMarkers[i].px+clusterDist;
               var ymin = lmurMarkers[i].py-clusterDist;
               var ymax = lmurMarkers[i].py+clusterDist;
               for(var j=i+1;j<lmurMarkers.length;j++)
               {
                  if(lmurMarkers[j].markerHidden == false)
                  {
                     if((lmurMarkers[j].px > xmin)&&(lmurMarkers[j].px < xmax)&&(lmurMarkers[j].py > ymin)&&(lmurMarkers[j].py < ymax))
                     {
                        clusterSize++;
                        clusterX += lmurMarkers[j].px;
                        clusterY += lmurMarkers[j].py;
                        lmurMarkers[j].markerHidden = true;
                     }
                  }
               }
               if(clusterSize > threshold)
               {
                  lmurMarkers[i].markerHidden = true;
                  cx = clusterX / clusterSize;
                  cy = clusterY / clusterSize;
                  svgSrc += '<circle cx="'+cx+'" cy="'+cy+'" r="'+marker_rad+'" style="fill:black;stroke:white;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
                  svgSrc += '<text x="'+cx+'" y="'+cy+'" font-size="12" fill="white" style="text-anchor: middle" dy="5">'+clusterSize+'</text>';
               }
            }
         }
      }
   }

   for(var i=0;i<lmurMarkers.length;i++)
   {
      if(lmurMarkers[i].markerHidden == false)
      {
         var ureq = lmurMarkers[i];
         fillOpacity = 1 - ((lmurGetMarkerAge(ureq) * .9) / lmurCacheExpiryPeriod);
         if(fillOpacity < 0.1) fillOpacity = 0.1;
         if(ureq.markerType == 1)
         {
            if(ureq.markerObj.resolvedOn != null)
            {
               svgSrc += '<circle cx="'+ureq.px+'" cy="'+(ureq.py+7)+'" r="9" style="fill:white;stroke:black;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
            }  
            svgSrc += '<rect x="'+ureq.px+'" y="'+ureq.py+'" transform="rotate(45,'+ureq.px+','+ureq.py+')" width="10" height="10" style="fill:red;stroke:blue;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
         }
         else if(ureq.markerType == 2)
         {
            if(ureq.markerObj.resolvedOn != null)
            {
               svgSrc += '<circle cx="'+ureq.px+'" cy="'+(ureq.py)+'" r="9" style="fill:white;stroke:black;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
            }  
            svgSrc += '<rect x="'+(ureq.px-5)+'" y="'+(ureq.py-5)+'" width="10" height="10" style="fill:green;stroke:red;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
         }
         else if(ureq.markerType == 3)
         {
            if(ureq.markerObj.resolvedOn != null)
            {
               svgSrc += '<circle cx="'+ureq.px+'" cy="'+(ureq.py)+'" r="9" style="fill:white;stroke:black;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
            }  
            svgSrc += '<circle cx="'+ureq.px+'" cy="'+ureq.py+'" r="5" style="fill:blue;stroke:red;fill-opacity:'+fillOpacity+';stroke-opacity:1"/>';
         }
      }
   }

   lmurMarkerList = true;
   svgSrc += '</svg>';
   lmurDiv.innerHTML = svgSrc;
   lmurDiv.style.visibility = '';
}


function lmurInitDrag()
{
   lmurAddLog('inhibiting nudge detection');
   lmurInhibitNudgeDetection = true;
   lmurDiv.style.visibility = 'hidden';
}

function lmurEndDrag()
{
   lmurAddLog('re-enabling nudge detection');
   lmurInhibitNudgeDetection = false;
   lmurDiv.style.visibility = '';
}   

function lmurMouseInUI()
{
   lmurInhibitCacheRefresh = true;
}
function lmurMouseOutUI()
{
   lmurInhibitCacheRefresh = false;
}


function lmurCheckActivation()
{
   mapObj = document.getElementById("map");
   mapObj.onmouseup = null;
   mapObj.onmousedown = null;

   if
   (
      ((document.getElementById('_cbEnablePlayMode').checked == true) && (lmurPlayModeEnabled == false)) ||
      ((document.getElementById('_cbEnablePlayMode').checked == false) && (lmurPlayModeEnabled == true))
   )
   {
      lmurMarkerList = false;
      lmurInhibitCacheRefresh = false;
      lmurMarkers = new Array();
      lmurAreasGrabbed = ':';
   }
   lmurPlayModeEnabled = document.getElementById('_cbEnablePlayMode').checked;
   
   lsp = document.getElementsByClassName('leaflet-shadow-pane');
   lop = document.getElementsByClassName('leaflet-overlay-pane');
   lmp = document.getElementsByClassName('leaflet-marker-pane');
   if(document.getElementById('_cbHideNativeMarkers').checked)
   {
      if(lsp.length > 0) lsp[0].style.visibility = 'hidden';
      //if(lop.length > 0) lop[0].style.visibility = 'hidden';
      if(lmp.length > 0) lmp[0].style.visibility = 'hidden';
   }
   else
   {
      if(lsp.length > 0) lsp[0].style.visibility = '';
      //if(lop.length > 0) lop[0].style.visibility = '';
      if(lmp.length > 0) lmp[0].style.visibility = '';
   }

   if((document.getElementById('_cbShowURs').checked == false) && (document.getElementById('_cbShowProblems').checked == false) && (document.getElementById('_cbShowTurnProbs').checked == false))
   {
      lmurDiv.innerHTML = '';
      return;
   }

   lmurControlsEnabled = true;
   lmurNoForcedRefreshThisCycle = false;
   lmurAddLog('re-visualising after CheckActivation call');
   
   lmurVisualiseMarkers();

   mapObj.onmouseup = lmurEndDrag;
   mapObj.onmousedown = lmurInitDrag;
}

function lmurGetURAge(urObj,whichAgeToGet)
{
   var uroDate = -1;
   if(whichAgeToGet == 0)
   {
      if(urObj.driveDate != null)
      {
         uroDate = urObj.driveDate;
         if(uroDate != 0)
         {
            var dateNow = new Date();
            return Math.floor((dateNow.getTime() - uroDate) / 86400000);
         }
         else return 999999;
      }
      else return 999999;
   }     
   else if(whichAgeToGet == 1)
   {
      if(urObj.updatedOn != null)
      {
         uroDate = urObj.updatedOn;
         if(uroDate != 0)
         {
            var dateNow = new Date();
            return Math.floor((dateNow.getTime() - uroDate) / 86400000);
         }
         else return 999999;
      }
      else return 999999;
   }     
   else if(whichAgeToGet == 2)
   {
      if(urObj.resolvedOn != null)
      {
         uroDate = urObj.resolvedOn;
         if(uroDate != 0)
         {
            var dateNow = new Date();
            return Math.floor((dateNow.getTime() - uroDate) / 86400000);
         }
         else return 999999;
      }
      else return 999999;
   }     
   else return 999999;
}

function lmurParseDaysAgo(days)
{
  if(days == 0) return 'today';
  else if(days == 1) return '1 day ago';
  else return days+' days ago';
}

function lmurCheckOverMarker(e)
{
   mouseX = e.pageX;
   mouseY = e.pageY;
   if(!lmurMarkerList) return;
   result = '';

   var urpos = new L.LatLng(0,0);

   for(i=0;i<lmurMarkers.length;i++)
   {
      if(!lmurMarkers[i].markerHidden)
      {
         var ureq = lmurMarkers[i];
         urpos.lng = ureq.markerPos.lng;
         urpos.lat = ureq.markerPos.lat;
         var urpix = W.controller._mapView.map.latLngToContainerPoint(urpos);
         if(lmurMarkers[i].markerType == 1)
         {
            if((mouseX >= urpix.x - 5) && (mouseX < urpix.x + 10) && (mouseY >= urpix.y - 5) && (mouseY < urpix.y + 10))
            {
               ureq = lmurMarkers[i].markerObj;
               urAge = lmurGetMarkerAge(lmurMarkers[i]);
               if(ureq.type == 6) ureqTypeText = "Incorrect turn";
               else if(ureq.type == 7) ureqTypeText = "Incorrect address"
               else if(ureq.type == 8) ureqTypeText = "Incorrect route"
               else if(ureq.type == 9) ureqTypeText = "Missing roundabout"
               else if(ureq.type == 10) ureqTypeText = "General error"
               else if(ureq.type == 11) ureqTypeText = "Turn not allowed"
               else if(ureq.type == 12) ureqTypeText = "Incorrect junction"
               else if(ureq.type == 13) ureqTypeText = "Missing bridge overpass"
               else if(ureq.type == 14) ureqTypeText = "Wrong driving direction"
               else if(ureq.type == 15) ureqTypeText = "Missing exit"
               else if(ureq.type == 16) ureqTypeText = "Missing road"
               else if(ureq.type == 19) ureqTypeText = "Blocked road"
               else ureqTypeText = "Unknown"

               result = '<b>Update Request: ' + ureqTypeText + '</b>';
               if(ureq.description != null)
               {
                  result += '<br>' + ureq.description;
               }
               var daysOld = lmurGetURAge(ureq,0);
               if(daysOld != 999999)
               {
                  result += '<br><i>Submitted ' + lmurParseDaysAgo(daysOld) + '</i>';
               }
               daysOld = lmurGetURAge(ureq,2);
               if(daysOld != 999999)
               {
                  result += '<br><i>Resolved ' + lmurParseDaysAgo(daysOld) + '</i>';
               }                 
               
               var nComments = lmurMarkers[i].nComments;
               result += '<br><i>UR has ' + nComments + ' comment';
               if(nComments != 1) result += 's';
               result += '</i>';
               result += '<br><small>(Data refreshed '+urAge+'s ago)</small>';
               break;
            }
         }
         else
         {
            if((mouseX >= urpix.x - 5) && (mouseX < urpix.x + 5) && (mouseY >= urpix.y - 5) && (mouseY < urpix.y + 5))
            {
               urAge = lmurGetMarkerAge(lmurMarkers[i]);
               if(lmurMarkers[i].markerType == 2)
               {
                  ureq = lmurMarkers[i].markerObj;
                  result = '<b>Map Problem: ';
                  if(ureq.problemType == 101) result += 'Driving direction mismatch';
                  else if(ureq.problemType == 102) result += 'Missing junction';
                  else if(ureq.problemType == 103) result += 'Missing road';
                  else if(ureq.problemType == 104) result += 'Cross roads junction missing';
                  else if(ureq.problemType == 105) result += 'Road type mismatch';
                  else if(ureq.problemType == 106) result += 'Restricted turn might be allowed';
                  else result += 'Unknown problem type ('+ureq.problemType+')';
                  result += '</b><br>';
                  if(ureq.weight <= 3) result += 'Severity: Low';
                  else if(ureq.weight <= 7) result += 'Severity: Medium';
                  else result += 'Severity: High';
               }
               else 
               {
                  ureq = lmurMarkers[i].markerObj;
                  result = '<b>Turn Problem: The displayed route is frequently not taken by users</b>';
               }
               var daysOld = lmurGetURAge(ureq,2);
               if(daysOld != 999999)
               {
                  result += '<br><i>Resolved ' + lmurParseDaysAgo(daysOld) + '</i>';
               }                 
               result += '<br><small>(Data refreshed '+urAge+'s ago)</small>';
               break;
            }
         }
      }
   }
   if(result == '')
   {
      lmurPopup.style.visibility = 'hidden';
   }
   else if(lmurPopup.style.visibility == 'hidden')

   {
      lmurPopup.innerHTML = result;
      var posX = mouseX;
      var posY = mouseY;
      var mapWidth = W.controller._mapView.map._size.x;
      var mapHeight = W.controller._mapView.map._size.y;
      if((posX + lmurPopup.clientWidth) > mapWidth) posX = mapWidth - lmurPopup.clientWidth;
      if((posY + lmurPopup.clientHeight + 10) > mapHeight) posY = mapHeight - lmurPopup.clientHeight - 10;
      else posY += 10;
      lmurPopup.style.left = posX + 'px';
      lmurPopup.style.top = posY + 'px';
      lmurPopup.style.visibility = 'visible';
   }
}


function lmurShowControls()
{
   lmurControlsHidden = false;
   lmurHeader.innerHTML = '<img id="_minimax" align=left valign=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMBAsgGGkHX7cAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAUUlEQVQoz63SQQqAQAxD0R/xXoIXH/RicaUgtIOdscuE8DaVbaq3ZIWaXB6VJTWZE7TH2j/SrQCwxdq89FLItTkpVBJtXOoqgbY+4fFd0sjDXtyHHG22yaK0AAAAAElFTkSuQmCC" />';
   lmurHeader.innerHTML += '<b><a href="http://userscripts.org/scripts/show/150276" target="_blank">LMUR</a></b> v'+lmurVersion;
   document.getElementById('_minimax').addEventListener('click', lmurHideControls, false);

   if(window.innerHeight != lmurInnerHeight)
   {
      lmurInnerHeight = window.innerHeight;
      var htop = document.getElementsByClassName('leaflet-top')[0].offsetTop + document.getElementById('lmurHeader').offsetTop + 10;
      var hmax = window.innerHeight - htop - 100;
      document.getElementById('lmurCtrls').style.height = 'auto';
      document.getElementById('lmurCtrls').style.height = document.getElementById('lmurCtrls').clientHeight + 1 + 'px';

      if(document.getElementById('lmurCtrls').clientHeight > hmax)
      {
         document.getElementById('lmurCtrls').style.height = hmax+'px';
      }
      lmurUIHeight = document.getElementById('lmurCtrls').style.height;
      document.getElementById('lmurCtrls').scrollTop = 0;
   }
   else
   {
      document.getElementById('lmurCtrls').style.height = lmurUIHeight;
   }
   document.getElementById('lmurCtrls').style.overflow = 'auto';
}


function lmurHideControls()
{
   lmurControlsHidden = true;
   lmurHeader.innerHTML = '<img id="_minimax" align=left valign=middle src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wMBAshHpl/y8MAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAXUlEQVQoz63SQQqAMAxE0T/Fe0k9uNKTjQtBpLZSowOBQBjeJrLN20wA2jTcdLZkGy0y80CjgFcrwbFQxgoAiUDO0qN2Ub5LXa1S/pFuWkMJS9huDhn3biFJkYfdAYUjUx2jRgIlAAAAAElFTkSuQmCC" />';
   lmurHeader.innerHTML += '<b><a href="http://userscripts.org/scripts/show/150276" target="_blank">LMUR</a></b> v'+lmurVersion;
   document.getElementById('_minimax').addEventListener('click', lmurShowControls, false);
   document.getElementById('lmurCtrls').style.height = '0px';
   document.getElementById('lmurCtrls').style.overflow = 'hidden';
}


function lmurFakeOnload()
{
   if(document.getElementsByClassName("map-controls").length < 1) return;

   lmurAddLog('onload');

   if(document.getElementById('lmurUI') == undefined)
   {
      uiObj = document.getElementsByClassName("map-controls")[0];
      uiObj.appendChild(lmurUI);
      lmurUI.id = "lmurUI";
      lmurUI.style.lineHeight = '16px';
      lmurUI.style.overflow = 'hidden';
      document.getElementById('lmurUI').addEventListener('mouseover', lmurMouseInUI, false);
      document.getElementById('lmurUI').addEventListener('mouseout', lmurMouseOutUI, false);
   }
   
   if(lmurIsLoggedIn == false)
   {
      tHTML = '<b><a href="http://userscripts.org/scripts/show/150276" target="_blank">LMUR</a></b> v'+lmurVersion;
      tHTML += ' - Please log-in to the Livemap server to enable LMUR operation.';
      lmurUI.innerHTML = tHTML;
      lmurUI.style.backgroundColor = '#FFAAAA';   
   }
   else if(document.location.protocol == 'https:')
   {
      gmapObj = document.getElementById('map');

      lmurWazeBits();
      
      window.addEventListener("mousemove", lmurCheckOverMarker, false);

      gmapObj.appendChild(lmurDiv);
      gmapObj.appendChild(lmurPopup);

      tHTML = '<div id="lmurHeader">';
      tHTML += '<p><b><a href="http://userscripts.org/scripts/show/150276" target="_blank">LMUR</a></b> v'+lmurVersion;
      tHTML += '</div>';

      tHTML += '<div id="lmurCtrls">';
      tHTML += '<div style="background-color: #DDFFDD; padding: 10px">';
      tHTML += '<input type="checkbox" id="_cbShowURs">Enable</input> and ';
      tHTML += '<input type="radio" name="lmurShowURs" id="_radioShowURs"/>show or ';
      tHTML += '<input type="radio" name="lmurShowURs" id="_radioHideURs" checked/>hide';
      tHTML += ' URs by type:<br>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px;">';
      tHTML += '<input type="checkbox" id="_cbURFilterIncorrectTurn">Incorrect turn</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterIncorrectAddress">Incorrect address</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterIncorrectRoute">Incorrect route</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterIncorrectJunction">Incorrect junction</input><br>';
      tHTML += '</div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px;">';
      tHTML += '<input type="checkbox" id="_cbURFilterMissingRoundabout">Missing roundabout</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterMissingBridgeOverpass">Missing bridge overpass</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterMissingExit">Missing exit</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterMissingRoad">Missing road</input><br>';
      tHTML += '</div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px;">';
      tHTML += '<input type="checkbox" id="_cbURFilterWazeAuto">Waze Automatic</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterGeneralError">General error</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterTurnNotAllowed">Turn not allowed</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterWrongDrivingDirection">Wrong driving direction</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterBlockedRoad">Blocked Road</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterUndefined">Undefined</input><br>';
      tHTML += '</div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px; background-color: #CCEECC">';
      tHTML += '<i>UK Specific types</i><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterCryosphere">Petrol Station Checker</input><br>';
      tHTML += '<input type="checkbox" id="_cbURFilterRoadworks">Roadworks</input><br><br>';
      tHTML += '</div>';
      tHTML += '<div style="clear: both;"></div>';
      tHTML += '<br>';
      tHTML += '<input type="checkbox" id="_cbUREnableResolvedFilter">Hide resolved URs</input><br>';
      tHTML += '<input type="checkbox" id="_cbUREnableMinAgeFilter">Hide URs less than </input>';
      tHTML += '<input type="number" min="1" size="3" style="width:50px;height:100%;" id="_inputURFilterMinDays"> days old<br>';
      tHTML += '<input type="checkbox" id="_cbUREnableMaxAgeFilter">Hide URs more than </input>';
      tHTML += '<input type="number" min="1" size="3" style="width:50px;height:100%;" id="_inputURFilterMaxDays"> days old<br><br>';
      tHTML += '<input type="checkbox" id="_cbUREnableKeywordMustBePresent">Hide URs not including </input>';
      tHTML += '<input type="text" style="line-height:14px;height:100%;margin-bottom:4px;" id="_textURKeywordPresent"> in their description<br>';
      tHTML += '<input type="checkbox" id="_cbUREnableKeywordMustBeAbsent">Hide URs including </input>';
      tHTML += '<input type="text" style="line-height:14px;height:100%;margin-bottom:4px;" id="_textURKeywordAbsent"> in their description<br>';
      tHTML += '<input type="checkbox" id="_cbURCaseInsensitive">Case-insensitive matching</input>';

      tHTML += '<br><br>Filter URs by comments:<br>';
      tHTML += '<input type="checkbox" id="_cbURHideWithMyComments">Hide or <input type="checkbox" id="_cbURShowWithMyComments">show URs with comments from me<br>';
      tHTML += '<input type="checkbox" id="_cbURHideLastCommentByMe">Hide or <input type="checkbox" id="_cbURShowLastCommentByMe">show URs last commented on by me<br>';
      tHTML += '<input type="checkbox" id="_cbURHideLastCommentByReporter">Hide or <input type="checkbox" id="_cbURShowLastCommentByReporter">show URs last commented on by reporter<br>';
      tHTML += '<input type="checkbox" id="_cbURHideWithLessThanComments">Hide or <input type="checkbox" id="_cbURShowWithLessThanComments">show with less than <input type="number" min="0" size="3" id="_inputFilterMinComments"> comments<br>';
      //tHTML += '<input type="checkbox" id="_cbURHideFollowedURs">Hide or <input type="checkbox" id="_cbURShowFollowedURs">show URs I\'m following<br>';
      tHTML += '<input type="checkbox" id="_cbURHideLastCommentAge">Hide or <input type="checkbox" id="_cbURShowLastCommentAge">show if last comment made less than <input type="number" min="0" size="3" id="_inputFilterCommentAge"> days ago<br>';
      tHTML += '<br><input type="checkbox" id="_cbEnablePlayMode">Show UR markers outside my editable area</input><br>';

      tHTML += '</div>';

      tHTML += '<div style="background-color: #DDDDFF; padding: 10px">';
      tHTML += '<input type="checkbox" id="_cbShowProblems">Enable</input> and ';
      tHTML += '<input type="radio" name="lmurShowProblems" id="_radioShowProblems"/>show or ';
      tHTML += '<input type="radio" name="lmurShowProblems" id="_radioHideProblems" checked/>hide';
      tHTML += ' map problems by type:<br>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px;">';
      tHTML += '<input type="checkbox" id="_cbMPFilterMissingJunction">Missing junction</input><br>';
      tHTML += '<input type="checkbox" id="_cbMPFilterMissingRoad">Missing road</input><br>';
      tHTML += '<input type="checkbox" id="_cbMPFilterCrossroadsJunctionMissing">Missing crossroads</input><br>';
      tHTML += '</div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px;">';
      tHTML += '<input type="checkbox" id="_cbMPFilterDrivingDirectionMismatch">Driving direction mismatch</input><br>';
      tHTML += '<input type="checkbox" id="_cbMPFilterRoadTypeMismatch">Road type mismatch</input><br>';
      tHTML += '</div>';
      tHTML += '<div style="float: left; padding-left: 10px; padding-right: 10px;">';
      tHTML += '<input type="checkbox" id="_cbMPFilterRestrictedTurn">Restricted turn might be allowed</input><br>';
      tHTML += '<input type="checkbox" id="_cbMPFilterUnknownProblem">Unknown problem type</input><br>';
      tHTML += '</div>';
      tHTML += '<div style="clear: both;"></div>';
      tHTML += '<br>';
      tHTML += '<input type="checkbox" id="_cbMPEnableResolvedFilter">Hide resolved Problems</input><br>';            
      tHTML += '<br>';
      tHTML += 'Hide problems by severity:<br>';
      tHTML += '<input type="checkbox" id="_cbMPFilterLowSeverity">Low</input> ';
      tHTML += '<input type="checkbox" id="_cbMPFilterMediumSeverity">Medium</input> ';
      tHTML += '<input type="checkbox" id="_cbMPFilterHighSeverity">High</input><br>';
      tHTML += '<br>';
      tHTML += '<input type="checkbox" id="_cbShowTurnProbs">Show Turn Problems</input><br>';
      tHTML += '<input type="checkbox" id="_cbTPEnableResolvedFilter">Hide resolved Turn Problems</input>';      
      tHTML += '</div>';

      tHTML += '<input type="checkbox" id="_cbHideNativeMarkers">Hide Livemap markers</input>';
      tHTML += '</div>';

      lmurUI.innerHTML = tHTML;
      lmurUI.style.backgroundColor = '#FFFFFF';
      
      lmurHideControls();
      document.getElementById('lmurCtrls').addEventListener("click", lmurCheckActivation, true);
      document.getElementById('_cbShowURs').addEventListener("click", lmurCheckActivation, true);
      document.getElementById('_cbShowProblems').addEventListener("click", lmurCheckActivation, true);
      document.getElementById('_cbShowTurnProbs').addEventListener("click", lmurCheckActivation, true);
      lmurPrevCentre = W.controller._mapView.map.getCenter();
      lmurPopup.style.visibility = 'hidden';
      lmurLoadSettings();  
      lmurCheckActivation();
   }
   else
   {
      tHTML = '<b><a href="http://userscripts.org/scripts/show/150276" target="_blank">LMUR</a></b> v'+lmurVersion;
      tHTML += ' - requires a HTTPS connection, please click ';
      tHTML += '<a href="https://' + document.location.host + document.location.pathname + '">here</a> to switch';
      lmurUI.innerHTML = tHTML;

      lmurUI.style.backgroundColor = '#FFAAAA';
   }

   lmurDoOnload = false;
   lmurAddLog('onload complete');
}


function lmurHeartbeat()
{
   var oldLoginState = lmurIsLoggedIn;
   var revisualise = false;
   lmurIsLoggedIn = (document.getElementsByClassName('logged-in-user')[0].innerHTML != '');
   if(oldLoginState != lmurIsLoggedIn)
   {
      if(lmurIsLoggedIn)
      {
         lmurAddLog('user has logged-in, getting user ID');
         while(lmurUserID == undefined)
         {
            lmurUserID = W.userService.getCurrent().id;
         }
         lmurAddLog('userID: '+lmurUserID);
      }
      else
      {
         lmurAddLog('user has logged-out');
         lmurUserID = undefined;
      }  
      lmurDoOnload = true;
      revisualise = true;
   }
   
   if(lmurDoOnload == true)
   {
      lmurFakeOnload();
      if(revisualise == true)
      {
         lmurAddLog('re-visualising after login state change');
         lmurNoForcedRefreshThisCycle = false;
         lmurVisualiseMarkers();
      }
   }
   else 
   {
      if(lmurInhibitNudgeDetection == false)
      {
         nowCentre = W.controller._mapView.map.getCenter();
         var nowLat = Math.floor(nowCentre.lat);
         var nowLng = Math.floor(nowCentre.lng);
         var prevLat = Math.floor(lmurPrevCentre.lat);
         var prevLng = Math.floor(lmurPrevCentre.lng);
      
         if((nowCentre.lat != lmurPrevCentre.lat) || (nowCentre.lng != lmurPrevCentre.lng))
         {
            lmurAddLog('re-visualising after map nudge');
            lmurPrevCentre = nowCentre;
            lmurNoForcedRefreshThisCycle = false;
            lmurVisualiseMarkers();
         }
      }
   }
   setTimeout(lmurHeartbeat,100);
}


function lmurDecayCache()
{
   if(lmurInhibitNudgeDetection) return;
   if(lmurNoForcedRefreshThisCycle == true)
   {
      lmurVisualiseMarkers();
   }
   else
   {
      lmurAddLog('auto cache decay blocked by manual cache reload');
   }
   lmurNoForcedRefreshThisCycle = true;
}  

function lmurWazeBits()
{
   W = unsafeWindow.W;
   L = unsafeWindow.L;
}

function lmurInitialise()
{
   lmurGlobals();
   lmurAddLog('initialisation');
   lmurDiv.id = 'lmurDiv';
   lmurDiv.style.position = 'absolute';
   lmurDiv.style.top = '0';
   lmurDiv.style.left = '0';
   lmurDiv.style.zIndex = 6;
   lmurDiv.style.pointerEvents = 'none';
   lmurPopup.id = 'lmurPopup';
   lmurPopup.style.position = 'absolute';
   lmurPopup.style.top = '0';
   lmurPopup.style.left = '0';
   lmurPopup.style.zIndex = 6;
   lmurPopup.style.pointerEvents = 'none';
   lmurPopup.style.backgroundColor = 'aliceblue';
   lmurPopup.style.border = '1px solid blue';
   lmurPopup.style.boxShadow = '5px 5px 10px Silver';
   lmurPopup.style.padding = '4px';
   
   window.addEventListener("beforeunload", lmurSaveSettings, false);
   setTimeout(lmurHeartbeat,2000);

   setInterval(lmurDecayCache,60000);
}

lmurBootstrap();
