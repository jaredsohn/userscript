// iRacing Online Friends
// Copyright (c) 2013, Rob Kodey
//
var RK_DEBUG            = 0;
var RK_FRIENDS          = 1;    // Set to 0 to turn off online friends
var RK_SERIES_FILTER    = 1;    // Set to 0 to turn off the series drop-down filter
var RK_SET_SELECTS      = 1;    // Set to 0 to turn off the other automatic select-box selections
//
// ==UserScript==
// @name          iRacing Online Friends
// @version       1.15
// @copyright     2013, Rob Kodey
// @namespace     http://www.kodey.com/
// @description   Highlight your Friends and Watched Drivers on the Dashboard and Series Session pages, so you know where they are driving.
// @include       http://members.iracing.com/membersite/member/*
// @grant         GM_xmlhttpRequest
// ==/UserScript==
//
// Changes:
//  TODO
//        Favorite series instead of filter?  http://members.iracing.com/jforum/posts/list/0/1973793.page
//        http://members.iracing.com/jforum/posts/list/0/1975064.page
//        Show time to upcoming session
//        http://members.iracing.com/membersite/member/GetDriverStatus?friends=1&studied=1

var RK_Version        = 1.15;
//  v1.15 04/27/2013
//        Updated to support the new iRacing Build
//  v1.14 04/08/2013
//        Increased the delay between calls, based on some code warnings coming back from iRacing (sorry!)
//  v1.13 09/10/2012
//        Re-wrote, and hopefully fixed, the Hosted Sessions support, as iRacing organizes the info very differently on that page
//  v1.12 06/09/2012
//        Wow - it's been almost a year since the last update, with 2300 installs!!  Thanks!
//        Fixed: Hosted sessions work again, and show where your friends and studied drivers are registered
//        Re-Added: Mixed-Class stats page car auto-selection - needed for Firefox
//        Fixed: Major Chrome issue by changing the core system that pulls javascript variables out of the page
//  v1.11 06/20/2011
//        Added: Support for Spectator Sessions screen
//        Added: Driver helmets
//        Added: The series filter is back, now with an all new selection dialog to let you choose what you want to see
//  v1.10 12/23/2010
//        Fixed: Detection of the Dashboard page, since iRacing's URL structure changes slightly
//        Temporarily removed: The Series filter, until iRacing brings back the Ticker settings
//  v1.9  11/07/2010
//        Fixed: The "Planner" & "Standings" dashboard widgets automatically select your active Race-Panel series
//  v1.8  11/02/2010
//        Fixed: "Hide yourself"
//        Updated: The Update check dialog, and added option to turn it off.  (Delete the cookie to turn back on)
//        Added: Series filter for Race Panel, Series Stats, and Race Planner Widget so they match your ticker series preferences
//  v1.7  10/30/2010
//        Updated: Support for Season-4 web updates from iRacing
//        Added: Friend highlighting for Races & Qualifiers to Series Sessions Page and Race Widget
//        Added: "Personal Best" stats will automatically select your active Race-Panel car
//        Added: Update check for new versions of the script
//  v1.6  06/02/2010
//        This release has nothing to do with friends - perhaps I should rename the script?
//        (Retired) Added: The "Sereis Stats" page will automatically select your active Race-Panel car
//        Added: Filter the Race Panel's "Series Selection" drop-down so that it matches your ticker series preferences
//  v1.5  05/05/2010
//        Added: support for the new iRacing site design
//        Added: support for the Join a Hosted session page
//        Added: (optional) support for past events pages: Hosted (Results), Events (Results, Replays),
//              Stats (Personal, Friends, Studied)
//        Added: options to turn on/off highlighting for any individual page
//        Fixed: minor bug in the filter that skipped querying empty sessions
//        Fixed: friend/watched matching of members with customer IDs < 10000 (aka shorter than 5 digits!)
//  v1.1  04/26/2010
//        Fixed: encoding issue for driver names with extended characters
//  v1.0  04/18/2010
//        Chrome and Opera support!
//        Driver names now link to Career Stats
//        New display formatting looks much better! (hopefully!!)
//        Where possible, the callback to retrieve the driver list is skipped, to be nice to the servers
//        Friends are now re-highlighted when iRacing refreshes panels, after a couple seconds delay
//  v0.3  04/13/2010
//        Detection of "slow widgets" on the Dashboard should be 100% reliable now
//        Getting closer to supporting Chrome, and Opera...
//  v0.2  04/11/2010
//        Fixed Dashboard detection vs. Press Room
//        session info requests are now spread out a bit, to be nice to the servers
//
//


var RK_oGlobals;
var RK_sPage;
var RK_MaxLoops         = 50;
var RK_LoopWait         = 1000;
var RK_DriverWait       = 1000;
var RK_Update           = 86400000;     // Check once per day
var RK_Script           = 74072;
var RK_sImages          = ".//IMG[@name]";
var RK_sLinks           = ".//A[@href]";
var RK_oRows            = new Object();
var RK_oIDs             = new Object();
var RK_oDriverTR        = new Object();
var RK_oDriverTD        = new Object();
var RK_sStyleTD         = 'padding:2px; border-bottom:2px solid #000000;';
var RK_Cookie           = 'OnlineFriendsPrefs';
var RK_SELECT           = 'PARENT_SELECT';
var RK_FILTER           = 'SeriesFilter';
var RK_FILTER_LIST      = 'SeriesFilterList';
var RK_FILTERSELECT     = 'RK_FILTER_SELECT';
var RK_ImgPop           = '<img src="http://www.kodey.com/iRacing/new_window.gif">';
var RK_Z                = 1000;
var RK_LicIcons         =
{
  1 : '/member_images/widgets/licenses/stats_licence_r.png',
  2 : '/member_images/widgets/licenses/stats_licence_d.png',
  3 : '/member_images/widgets/licenses/stats_licence_c.png',
  4 : '/member_images/widgets/licenses/stats_licence_b.png',
  5 : '/member_images/widgets/licenses/stats_licence_a.png',
  6 : '/member_images/widgets/licenses/stats_licence_p.png',
  7 : '/member_images/widgets/licenses/stats_licence_pwc.png'
}
var RK_oSessionCellLookup = { 3:1, 4:3, 5:2 };
    // var oRK_SessionDivOffset    = { 1:2, 2:2, 3:2 };  // div offset

var RK_oPrefs     =
{
  Self            : true,
  Dashboard       : true,
  Sessions        : true,
  Join            : true,
  Hosted          : false,
  Results         : false,
  Replays         : false,
  Stats           : true,
  Spectator       : true,
  SeriesFilter    : false,
  SkipUpdateCheck : false,
  LastUpdate      : 0
};

var RK_oURLs        =
{
  '/membersite/member/home.do'            : 'Home',
  '/membersite/member/seriessessions.do'  : 'Sessions',
  '/membersite/member/hostedsessions.do'  : 'Join',
  '/membersite/member/hostedresults.jsp'  : 'Hosted',
  '/membersite/member/results.jsp'        : 'Results',
  '/membersite/member/replays.jsp'        : 'Replays',
  '/membersite/member/careerstats.do'     : 'Stats',
  '/membersite/member/spectator.jsp'      : 'Spectator',
  '/membersite/member/seriesstandings.do' : 'Series'
}

var RK_sCustDisplayURL    = 'http://members.iracing.com/membersite/member/GetCustDisplayInfo';
var RK_sDriverStatusURL   = 'http://members.iracing.com/membersite/member/GetDriverStatus';
var RK_sOpenSessionURL    = 'http://members.iracing.com/membersite/member/GetOpenSessionDrivers';
var RK_sPrivateSessionURL = 'http://members.iracing.com/membersite/member/GetPrivateSessionRegistered';
var RK_sSessionDriversURL = 'http://members.iracing.com/membersite/member/GetSessionDrivers';
var RK_sSessionTimesURL   = 'http://members.iracing.com/membersite/member/GetSessionTimes';

//////////////////////////////////////////////////

function RK_log(msg)
{
  if(console && RK_DEBUG)
  {
    console.log(msg);
  }
}

//////////////////////////////////////////////////

function RK_SetCookie(name, value, nDays)
{
  var dt          = new Date();
  dt.setDate(dt.getDate()+nDays);
  document.cookie = name+ "=" +escape(value) + ((nDays==null) ? "" : "; expires="+dt.toUTCString());
  // + "; path=/membersite"
} // RK_SetCookie

//////////////////////////////////////////////////

function RK_ReadCookies()
{
  var oCook       = new Object();
	var aCookies    = document.cookie.split('; ');
	for(var i=0; i < aCookies.length; i++)
  {
    var aNVP      = aCookies[i].split("=");
    oCook[aNVP[0]]= aNVP[1];
	}
  return(oCook);
} // RK_ReadCookies

//////////////////////////////////////////////////

function RK_SetPrefs()
{
  RK_log("RK_SetPrefs: " + RK_oPrefs.LastUpdate);
  RK_SetCookie(RK_Cookie, JSON.stringify(RK_oPrefs), 100);
} // RK_SetPrefs

//////////////////////////////////////////////////

var RK_oCookies   = RK_ReadCookies();
if(RK_oCookies[RK_Cookie])
  RK_oPrefs       = JSON.parse(unescape(RK_oCookies[RK_Cookie]));
RK_SetPrefs();

//////////////////////////////////////////////////

function RK_xpath(query, context)
{
  if(!context) context = document;
	return document.evaluate(query, context, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//////////////////////////////////////////////////

function RK_GetDriverName(oDriver)
{
  var name          = decodeURIComponent(oDriver.displayname || oDriver.dn || oDriver.name);
  name              = name.replace(/\+/g,' ');
  RK_log("RK_GetDriverName: " + name);
  RK_log("RK_GetDriverName driver: " + JSON.stringify(oDriver));
  var oHelmet       = oDriver.helmet || oDriver;
  var sClass        = RK_oIDs[oDriver.custid] || '';
  var sColors       = (oHelmet.c1 || oHelmet.helmcolor1) + ',' + (oHelmet.c2 || oHelmet.helmcolor2) + ',' + (oHelmet.c3 || oHelmet.helmcolor3);
  var sPattern      = oHelmet.p   || oHelmet.helmpattern;
  var sLicense      = oHelmet.ll  || oHelmet.maxlicenselevel;
  var src           = RK_oGlobals.simStatus ? ( 'http://127.0.0.1:32034/helmet.png?size=5&pat='+sPattern+'&lic='+sLicense+'&colors='+sColors) :
                                                '/membersite/images/default/helmet/size_5/helmet.png';
  return( '<div style="padding:0px; text-align:left; height:22px; overflow:hidden;" class="'+sClass+
          '"> <img style="vertical-align: middle; padding:1px;" src="'+src+
          '"> <a class="stats_table_link" href="CareerStats.do?custid='+oDriver.custid+'">'+name+'</a></div>');
} // RK_GetDriverName

//////////////////////////////////////////////////

function RK_InsertDriver(oDriver, cell, oConfig)
{
  // RK_log("RK_InsertDriver");
  if(!RK_oDriverTR[oConfig.name])
  {
    var newTR   = document.createElement('tr');
    while(cell.tagName != 'TD' && cell.parentNode) cell = cell.parentNode;
    cell.parentNode.parentNode.insertBefore(newTR, cell.parentNode.nextSibling);
    newTR.innerHTML  = '<td style="'+RK_sStyleTD+'" colspan="'+oConfig.nSpanL+'"></td><td style="'+RK_sStyleTD+'" colspan="'+oConfig.nSpanR+'"></td>';
    RK_oDriverTD[oConfig.name]  = RK_xpath('.//TD[last()]', newTR).snapshotItem(0);
    RK_oDriverTR[oConfig.name]  = newTR;
  }

  var sPos      = oDriver.pos ? oDriver.pos+'.' : '';
  RK_oDriverTD[oConfig.name].previousSibling.innerHTML  += '<div style="padding:4px 0px 0px 0px; text-align:right; height:18px;">'+sPos+'</div>';
  RK_oDriverTD[oConfig.name].innerHTML                  += RK_GetDriverName(oDriver);
} // RK_InsertDriver

//////////////////////////////////////////////////

function RK_CheckMatch(oDriver, session, oConfig)
{
  if(RK_oIDs[oDriver.custid])
  {
    var tr        = RK_oRows[session];
    var cell      = RK_xpath(RK_sImages, tr).snapshotItem(0) || RK_xpath(RK_sLinks, tr).snapshotItem(0);
    RK_InsertDriver(oDriver, cell, oConfig);
  }
} // RK_CheckMatch

//////////////////////////////////////////////////

function RK_GetDriverInfo(url, delay, oConfig)
{
  window.setTimeout(function()
  {
    RK_log("RK_GetDriverInfo: " + url);
    GM_xmlhttpRequest(
    {
      method: 'GET',
      url: url,
      onload: function(res)
      {
        // RK_log("RK_GetDriverInfo: " + res.responseText);
        var oDrivers = JSON.parse(res.responseText);
        // console.log(JSON.stringify(oDrivers));
        var session;
        if(oDrivers.rows)
        {
          session   = oDrivers.subsessionid;
          oDrivers  = oDrivers.rows;
        }
        else
        {
          session   = oDrivers[0].subsessionid;
        }

        RK_oDriverTR[oConfig.name]  = null;
        RK_oDriverTD[oConfig.name]  = null;
        for(var i=0; i < oDrivers.length; i++)
        {
          oDrivers[i].pos = i+1;
          RK_CheckMatch(oDrivers[i], session, oConfig);
        }
      }
    });
  }, delay);

} // RK_GetDriverInfo

//////////////////////////////////////////////////

function RK_AddClickPref(ele, sName, fnOverride)
{
  ele.style.cursor      = 'pointer';

  var fnToggle          = function()
  {
    RK_oPrefs[sName]    = (RK_oPrefs[sName] ? false : true);
    RK_SetPrefs();
    document.location.reload();
  };

  if(fnOverride) fnToggle = fnOverride;

  ele.addEventListener('click', fnToggle, false);
} // RK_AddClickPref

//////////////////////////////////////////////////

function RK_WriteFriendPref(sName, oParent, sClass)
{
  var oDiv              = document.createElement('div');
  oDiv.className        = sClass;
  oDiv.style.cssText    = 'text-align:right; color:#646464; font-weight:bold; padding:2px;';
  RK_AddClickPref(oDiv, sName);
  oParent.appendChild(oDiv);
  oDiv.innerHTML        = '<span class="stats_table_text" style="padding:2px;">' + (RK_oPrefs[sName] ? 'Hide ' : 'Show ') + (sName == 'Self' ? 'yourself' : 'friends') + '</span>';
} // RK_WriteFriendPref

//////////////////////////////////////////////////

function RK_ProcessDrivers(xRows, oConfig)
{
  RK_log('RK_ProcessDrivers: ' + oConfig.name + ': ' +xRows.snapshotLength);
  xRows.snapshotItem(2).id = 'RK_'+oConfig.name;

  var xLastRow;

  for(var i = 0; i < xRows.snapshotLength; i++)
  {
    var oRow    = xRows.snapshotItem(i);
    var sess    = '';

    // Look for helmet images
    var xImages = RK_xpath(RK_sImages, oRow);
    //RK_log('RK_ProcessDrivers: helmet images: ' + xImages.snapshotLength);
    for(var j = 0; (!sess && j < xImages.snapshotLength); j++)
    {
      //RK_log('RK_ProcessDrivers: helmet name: ' + xImages.snapshotItem(j).name);
      var aMatches = xImages.snapshotItem(j).name.match(/(\d+)/);
      if(aMatches)
      {
        sess    = aMatches[1];
      }
    }

    // Then, if not found, look for results links
    var xLinks  = RK_xpath(RK_sLinks, oRow);
    for(var j = 0; (!sess && j < xLinks.snapshotLength); j++)
    {
      //RK_log('RK_ProcessDrivers: results link: ' + xLinks.snapshotItem(j).href);
      var aMatches = unescape(xLinks.snapshotItem(j).href).match(/launchEventResults?\((\d+),\s*\d+\)/i);
      if(aMatches)
      {
        sess    = aMatches[1];
      }
    }

    //RK_log('RK_ProcessDrivers: session: ' + sess);
    if(sess && RK_oPrefs[RK_sPage])
    {
      RK_oRows[sess] = oRow;
      var reZero  = oConfig.reZero || /[>(]\s*0\/\d+\s*[)<]/;
      if(!(oRow.innerHTML.match(reZero)))
      {
        var url = oConfig.url + '?requestindex='+(i+1)+'&subsessionid='+sess;
        RK_GetDriverInfo(url, i*RK_DriverWait, oConfig);
      }
      else if(RK_DEBUG)
      {
        oRow.childNodes[0].innerHTML += 'skipped'
      }
    }
    
    if(oRow.childNodes.length > 1)
    {
      xLastRow  = oRow;
    }
  }

  var tr                  = document.createElement('tr');
  var tdL                 = document.createElement('td');
  // tdL.style.cssText     = RK_sStyleTD;
  tdL.colSpan             = oConfig.nSpanL;
  tr.appendChild(tdL);
  var tdR                 = document.createElement('td');
  tdR.style.cssText       = RK_sStyleTD;
  tdR.colSpan             = oConfig.nSpanR;
  tr.appendChild(tdR);
  xLastRow.parentNode.insertBefore(tr, xLastRow.nextSibling);

  if(RK_oPrefs[RK_sPage]) RK_WriteFriendPref('Self',    tdR, '');
  RK_WriteFriendPref(RK_sPage,  tdR, 'stats_friend_tr');
  // var oSelfDiv            = document.createElement('div');
  // oSelfDiv.style.cssText  = 'text-align:right; color:#646464; font-weight:bold;';
  // oSelfDiv.addEventListener('click', function()
  // {
    // RK_oPrefs.Self        = !RK_oPrefs.Self
    // RK_SetPrefs();
    // document.location.reload();
  // }, false);
  // tdR.appendChild(oSelfDiv);
  // oSelfDiv.innerHTML      = '<span class="stats_table_text" style="cursor:pointer;">'+(RK_oPrefs.Self ? 'Hide' : 'Show') + ' yourself</span>';

} // RK_ProcessDrivers


//////////////////////////////////////////////////

function RK_ProcessHosted(xRows, oConfig)
{
  RK_log('RK_ProcessHosted: ' + oConfig.name + ': ' +xRows.snapshotLength);
  xRows.snapshotItem(2).id = 'RK_'+oConfig.name;

  RK_log("RK_ProcessHosted: Getting hosted sessions");
  GM_xmlhttpRequest(
  {
    method:   'GET',
    url:      'http://members.iracing.com/membersite/member/GetHostedSessions?ts=0',
    // headers:  { "Content-Type": "application/x-www-form-urlencoded" },
    onload:   function(res)
    {
      RK_log("RK_ProcessHosted: done");
      var tmp1      = res.responseText.replace(/\+/g," ");
      eval("var aHosted="+tmp1+";");

      var oHosted   = {};
      for(var i = 0; i < aHosted.all.length; i++)
      { // cnovert the array into a hash
        oHosted[aHosted.all[i].privatesessionid] = aHosted.all[i];
      }

      var xLastRow;

      for(var i = 0; i < xRows.snapshotLength; i++)
      {
        var oRow      = xRows.snapshotItem(i);
        var hosted    = null;

        // Look for helmet to get the session
        var xImages   = RK_xpath(RK_sImages, oRow);
        for(var j = 0; (j < xImages.snapshotLength); j++)
        {
          RK_log('RK_ProcessHosted: helmet name: ' + xImages.snapshotItem(j).name);
          var aMatches = xImages.snapshotItem(j).name.match(/(\d+)/);
          if(aMatches && !hosted)
          {
            hosted    = oHosted[aMatches[1]];
          }
        }

        if(hosted)
        {
          var pvtid   = hosted.privatesessionid;
          var sess    = hosted.subsessionid;


          RK_log('RK_ProcessHosted: '+i+' session: '+sess+', name: '+hosted.sessionname);
          if(sess && RK_oPrefs[RK_sPage])
          {
            RK_oRows[sess] = oRow;
            var reZero  = oConfig.reZero || /[>(]\s*0\/\d+\s*[)<]/;
            if(!(oRow.innerHTML.match(reZero)))
            {
              var url = oConfig.url + '?requestindex='+(i+1)+'&pvtid='+pvtid+'&ssid='+sess
              RK_GetDriverInfo(url, i*RK_DriverWait, oConfig);
            }
            else if(RK_DEBUG)
            {
              oRow.childNodes[0].innerHTML += 'skipped';
            }
          }
          
          if(oRow.childNodes.length > 1)
          {
            xLastRow  = oRow;
          }
        }
      }

      var tr                  = document.createElement('tr');
      var tdL                 = document.createElement('td');
      // tdL.style.cssText     = RK_sStyleTD;
      tdL.colSpan             = oConfig.nSpanL;
      tr.appendChild(tdL);
      var tdR                 = document.createElement('td');
      tdR.style.cssText       = RK_sStyleTD;
      tdR.colSpan             = oConfig.nSpanR;
      tr.appendChild(tdR);
      xLastRow.parentNode.insertBefore(tr, xLastRow.nextSibling);

      if(RK_oPrefs[RK_sPage]) RK_WriteFriendPref('Self',    tdR, '');
      RK_WriteFriendPref(RK_sPage,  tdR, 'stats_friend_tr');
    }
  });
} // RK_ProcessHosted


//////////////////////////////////////////////////

function RK_GetRegistered(func)
{
  var url         = RK_sDriverStatusURL;
  RK_log("RK_GetRegistered: " + url);
  GM_xmlhttpRequest(
  {
    method:   'POST',
    url:      url,
    data:     'friends=1&studied=1&onlineOnly=1',
    headers:  { "Content-Type": "application/x-www-form-urlencoded" },
    onload:   function(res)
    {
      RK_log("RK_GetRegistered: done");
      var oDrivers = JSON.parse(res.responseText);

      var oDrvSess  = new Object();
      for(var i = 0; i < oDrivers.fsRacers.length; i++)
      {
        var oDriver = oDrivers.fsRacers[i];
        if(oDriver.sessionId)
        {
          // oDriver.sessionId = '12681297';
          RK_log('RK_GetRegistered: ' + oDriver.name + ", Session: " + oDriver.sessionId + ", Status: " + oDriver.subSessionStatus);
          if(!oDrvSess[oDriver.sessionId])
            oDrvSess[oDriver.sessionId] = new Array();
          oDrvSess[oDriver.sessionId].push(oDriver);
          // if(oDriver.subSessionStatus != 'subses_running')
          // {
            // alert('RK_GetRegistered: ' + oDriver.name + ", Session: " + oDriver.sessionId + ", Status: " + oDriver.subSessionStatus);
          // }
        }
      }

      func(oDrivers, oDrvSess);
    }
  });
} // RK_GetRegistered

//////////////////////////////////////////////////

function RK_RaceRegistered(xRows, oConfig)
{
  RK_log('RK_RaceRegistered: ' + oConfig.name + ': ' +xRows.snapshotLength);
  xRows.snapshotItem(2).id = 'RK_'+oConfig.name;

  RK_GetRegistered(function(oDrivers, oDrvSess)
  {
    var xLastRow;

    for(var i = 0; i < xRows.snapshotLength; i++)
    {
      var oRow    = xRows.snapshotItem(i);
      var sess    = '';
      var cell;
      var xDivs   = RK_xpath('.//DIV[@id]', oRow);
      for(var j = 0; (!sess && j < xDivs.snapshotLength); j++)
      {
        var aMatches = xDivs.snapshotItem(j).id.match(/^(\d{7,})$/);
        if(aMatches)
        {
          cell    = xDivs.snapshotItem(j);
          sess    = aMatches[1];
          RK_log('RK_RaceRegistered: ' + sess);
        }
      }

      if(sess && RK_oPrefs[RK_sPage])
      {
        RK_oDriverTR[oConfig.name]  = null;
        RK_oDriverTD[oConfig.name]  = null;
        var aDrivers        = oDrvSess[sess] || new Array();
        for(var j = 0; j < aDrivers.length; j++)
        {
          var oDriver       = aDrivers[j];
          RK_InsertDriver(oDriver, cell, oConfig);
        }
      }
      
      if(oRow.childNodes.length > 1)
      {
        xLastRow  = oRow;
      }
    }

    var tr                  = document.createElement('tr');
    var tdL                 = document.createElement('td');
    tdL.colSpan             = oConfig.nSpanL;
    tr.appendChild(tdL);
    var tdR                 = document.createElement('td');
    tdR.style.cssText       = RK_sStyleTD;
    tdR.colSpan             = oConfig.nSpanR;
    tr.appendChild(tdR);
    xLastRow.parentNode.insertBefore(tr, xLastRow.nextSibling);

    if(RK_oPrefs[RK_sPage]) RK_WriteFriendPref('Self',    tdR, '');
    RK_WriteFriendPref(RK_sPage,  tdR, 'stats_friend_tr');
  });
} // RK_RaceRegistered

//////////////////////////////////////////////////

function RK_WaitForElement(oConfig, fn, min, count)
{
  if(!count)  count = 1;
  if(!min)    min   = 2;
  RK_log('RK_WaitForElement: ' + count + ': ' + oConfig.name);

  var mutex   = document.getElementById('RK_'+oConfig.name);
  if(!mutex)
  {
    var xRes  = RK_xpath('//TABLE[@'+oConfig.type+'="'+oConfig.name+'"]//TR');
    RK_log('RK_WaitForElement: ' + xRes.snapshotLength + ': ' + oConfig.name);
    if(xRes.snapshotLength > min)
    {
      fn(xRes, oConfig);
    }
    else if(count <= RK_MaxLoops)
    {
      window.setTimeout(function() { RK_WaitForElement(oConfig, fn, min, count+1); }, RK_LoopWait);
    }
  }
} // RK_WaitForElement

//////////////////////////////////////////////////

function RK_GetParentSelect(oOption)
{
  if(oOption && oOption.tagName.toLowerCase() == 'option')
  {
    var oSelect = oOption;
    do
    {
      oSelect   = oSelect.parentNode
    } while(oSelect.tagName.toLowerCase() != 'select' && oSelect.parentNode);
    return(oSelect);
  }
} // RK_GetParentSelect

//////////////////////////////////////////////////

function RK_GetDropDown(xContainer)
{
  RK_log('RK_GetDropDown');
  var oOptions                  = new Object();
  if(xContainer.snapshotLength)
  {
    var xGroups                 = RK_xpath('.//OPTGROUP', xContainer.snapshotItem(0));
    for(var i=0; i< xGroups.snapshotLength; i++)
    {
      var oGroup                = xGroups.snapshotItem(i);
      oGroup.style.color        = '#808080';
      oGroup.style.fontStyle    = 'italic';
      // oGroup.style.fontWeight   = 'normal';
      RK_log('RK_GetDropDown: Group: ' + oGroup.label + ':' + oGroup.style.fontWeight);
    }

    var xOptions                = RK_xpath('.//OPTION', xContainer.snapshotItem(0));
    for(var i=0; i< xOptions.snapshotLength; i++)
    {
      var oOption               = xOptions.snapshotItem(i);
      if(oOption.disabled)
      {
        oOption.style.color     = '#808080';
        oOption.style.fontStyle = 'normal';
        // oGroup.style.fontWeight = 'normal';
      }
      else
      {
        oOption.style.color     = '#000000';
        oOption.style.fontStyle = 'normal';
        // oGroup.style.fontWeight = 'bold';
      }
      oOptions[oOption.value]   = oOption;
      oOptions[RK_SELECT]       = RK_GetParentSelect(oOption);
      // RK_log('RK_GetDropDown: Option: ' + oOption.value + ':' + oOption.style.fontWeight);
    }
  }
  return(oOptions);
} // RK_GetDropDown

//////////////////////////////////////////////////

function RK_RemoveOption(oOption)
{
  if(oOption && oOption.parentNode)
  {
    // RK_log('RK_RemoveOption: Removing: ' + oOption.text);
    RK_GetParentSelect(oOption).remove(oOption.index);
  }
} // RK_RemoveOption

//////////////////////////////////////////////////

function RK_GetSeriesSelection(oSeries)
{
  var html          = '';
  var td            = '<td style="vertical-align:middle; padding:2px; white-space:nowrap;">';
  var aFilters      = RK_oPrefs[RK_FILTER_LIST] || (new Array());
  if(oSeries)
  {
    html           += td+'<input type="checkbox" name="'+RK_FILTERSELECT+'" value="'+oSeries.seriesid+'" style="margin:4px; vertical-align:middle;" '+(aFilters[oSeries.seriesid] ? '' : 'checked="true"')+'>';
    html           += '<img src="'+(RK_LicIcons[oSeries.serieslicgroupid]||'')+'" style="vertical-align:middle;"></td>';
    html           += td+'<div style="width:60px; height:22px; background:url(/'+unescape(oSeries.whatshotimg)+');">&nbsp;</div></td>';
    html           += td+oSeries.seriesname.replace(/( race)? series/i,'')+/*' : '+oSeries.seriesid+' : '+oSeries.i+' : '+oSeries.licgroupid+' : '+oSeries.serieslicgroupid+*/'</td>';
  }
  else html        += '<td></td><td></td><td></td>'
  return(html);
} // RK_GetSeriesSelection

//////////////////////////////////////////////////

function RK_ShowSeriesFilter()
{
  RK_log('RK_ShowSeriesFilter');
  var aSeries         = RK_oGlobals.SeasonListing;
  if(aSeries)
  {
    var id              = 'RK_SERIES_FILTER';
    var id_toggle       = id+'_TOGGLE';
    var div             = document.createElement('div');
    div.id              = id;
    div.className       = 'stats_friend_tr';
    div.style.cssText   = 'position:absolute; left:100px; top:100px; border:2px solid #000000; z-index:'+(RK_Z++)+'; padding:3px; text-align:left;';
    var html            = '';
    html               += '<div style="text-align:center;">The following Series are currently displayed.  <b>Uncheck</b> a series to hide it from the Series List.</div>';
    html               += '<div style="text-align:center;">Note: If iRacing adds new series, they will not be hidden by default.</div>';

    var oSeriesTable    = new Object();
    for(var i=0; i<aSeries.length; i++)
    {
      var oSeries       = aSeries[i];
      oSeries.i         = i;
      if(oSeries.active)
      {
        if(!(oSeriesTable[oSeries.category])) oSeriesTable[oSeries.category] = new Array();
        oSeriesTable[oSeries.category].push(oSeries);
      }
    }

    function sortFunc(a,b)
    {
      var ret;
      ret               = a.serieslicgroupid - b.serieslicgroupid;
      if(!ret) ret      = a.licgroupid - b.licgroupid;
      if(!ret) ret      = a.seriesname.toLowerCase() > b.seriesname.toLowerCase();
      return(ret);
    }

    oSeriesTable[1].sort(sortFunc);
    oSeriesTable[2].sort(sortFunc);

    var max             = oSeriesTable[1].length > oSeriesTable[2].length ? oSeriesTable[1].length : oSeriesTable[2].length;
    // html               += '<div style="overflow:auto; height:300px; border:1px solid black;"><table border="0" cellspacing="0" cellpadding="0" style="margin:10px;">';
    html               += '<div><table border="0" cellspacing="0" cellpadding="0" style="margin:10px;">';
    for(var i=0; i<max; i++)
    {
      html             += '<tr>';
      html             += '<td style="width:10px;"></td>';
      html             += RK_GetSeriesSelection(oSeriesTable[1][i]);
      html             += '<td style="width:20px;"></td>';
      html             += RK_GetSeriesSelection(oSeriesTable[2][i]);
      html             += '<td style="width:10px;"></td>';
      html             += '</tr>';
    }
    html               += '</table></div>';

    // html               += '<div>Please visit the <a target="_blank" href="http://userscripts.org/scripts/show/'+RK_Script+'">UserScript page '+RK_ImgPop+'</a> to upgrade.</div>';
    // html               += '<div id="'+whatsnewid+'"></div>';
    // html               += '<br><div>Or, visit the <a target="_blank" href="http://members.iracing.com/jforum/posts/list/1275006.page">iRacing Forum thread '+RK_ImgPop+'</a> for more info.</div>';
    html               += '<div style="text-align:center;"><input type="checkbox" id="RK_FILTER_TOGGLE" style="margin:10px 4px; vertical-align:middle;" '+(RK_oPrefs[RK_FILTER] ? 'checked="true"' : '')+'>Turn on the filter (Uncheck this to show all series)</div>';
    html               += '<div style="text-align:center;"><a id="'+id_toggle+'" onclick="return(false);" href="" style="margin-right:10px;">Save</a>|';
    html               += '<a href="" onclick="javascript:document.getElementById(\''+id+'\').style.display=\'none\'; return(false);" style="margin-left:10px;">Cancel</a></div><br>';
    div.innerHTML       = html;
    var child           = document.body.firstChild;
    if(child)
    {
      child.parentNode.insertBefore(div, child);
    }
    RK_AddClickPref(document.getElementById(id_toggle), RK_FILTER, function()
    {
      var aChecks       = document.getElementsByName(RK_FILTERSELECT);
      var oFilter       = {};
      for(var i=0; i<aChecks.length; i++)
      {
        if(!(aChecks[i].checked))
          oFilter[aChecks[i].value] = 1;
      }
      RK_oPrefs[RK_FILTER_LIST] = oFilter;
      RK_oPrefs[RK_FILTER]      = document.getElementById('RK_FILTER_TOGGLE').checked ? true : false;
      RK_SetPrefs();
      document.location.reload();
    });
  }
} // RK_ShowSeriesFilter

//////////////////////////////////////////////////

function RK_Addfilter(oObj)
{
  if(oObj)
  {
    var oSelect                 = oObj[RK_SELECT];
    if(oSelect)
    {
      var oDiv                  = document.createElement('div');
      oDiv.style.position       = oSelect.style.position;
      oDiv.style.left           = oSelect.style.left;
      oDiv.style.top            = oSelect.style.top;
      // oDiv.style.width          = (parseInt(oSelect.style.width) + 16) + 'px';
      oSelect.style.position    = '';
      oSelect.style.left        = '';
      oSelect.style.top         = '';
      oSelect.style.width       = (parseInt(oSelect.style.width) - 22) + 'px';

      var oFilter               = document.createElement('span');
      // oFilter.className         = '';
      oFilter.innerHTML         = '&nbsp;<a href="" onclick="return(false);" class="racingpanel_link" style="font-weight:'+(RK_oPrefs[RK_FILTER]&&0?'bold':'normal')+'">Filter</a>';
      RK_AddClickPref(oFilter, RK_FILTER, RK_ShowSeriesFilter);

      oSelect.parentNode.insertBefore(oDiv, oSelect.nextSibling);
      oDiv.appendChild(oSelect);
      oDiv.appendChild(oFilter);
    }
  }
} // RK_Addfilter

//////////////////////////////////////////////////

function RK_SeriesFilter()
{
  RK_log('RK_SeriesFilter: ' + RK_oPrefs[RK_FILTER]);

  var aSeries         = RK_oGlobals.SeasonListing;
  if(aSeries)
  {
    // var oRacingSeries = RK_GetDropDown(RK_xpath('.//DIV[@id="racingpanel_inner"]'));
    var oRacingSeries = RK_GetDropDown(RK_xpath('.//DIV[@id="racingpanel_series"]'));
    var oSeriesSelect = RK_GetDropDown(RK_xpath('.//SELECT[@id="series_select"]'));

    if(RK_oPrefs[RK_FILTER])
    {
      var oSeriesList   = new Object();
      for(var i=0; i<aSeries.length; i++)
      {
        if(!(oSeriesList[aSeries[i].seriesid]) || !(oSeriesList[aSeries[i].seriesid].active))
          oSeriesList[aSeries[i].seriesid] = aSeries[i];
      }

      var oExclude      = RK_oPrefs[RK_FILTER_LIST]
      for(var i in oExclude)
      {
        var oExclude  = oSeriesList[i];
        if(oExclude)
        {
          if(oRacingSeries) RK_RemoveOption(oRacingSeries[oExclude.seasonid]);
          if(oSeriesSelect) RK_RemoveOption(oSeriesSelect[oExclude.seriesid]);
        }
      }

      // Now, remove the old inactive series
      for(var nSeries in oSeriesList)
      {
        var oSeries   = oSeriesList[nSeries];
        if(!oSeries.active)
        {
          if(oSeriesSelect) RK_RemoveOption(oSeriesSelect[oSeries.seriesid]);
        }
      }
    }

    RK_Addfilter(oRacingSeries);
    RK_Addfilter(oSeriesSelect);
  }
} // RK_SeriesFilter

//////////////////////////////////////////////////

function RK_Select(xOptions, sValue, sFunction)
{
  RK_log('RK_Select: '+sValue+' : '+xOptions.snapshotLength);
  if(xOptions.snapshotLength)
  {
    // var aOptions    = xSelect.snapshotItem(0).childNodes;
    for(var i=0; i < xOptions.snapshotLength; i++)
    {
      var oOption   = xOptions.snapshotItem(i);
      if(oOption.value == sValue && !oOption.selected)
      {
        RK_GetParentSelect(oOption).selectedIndex = oOption.index;
        document.location.href = sFunction;
      }
    }
  }
} // RK_Select

//////////////////////////////////////////////////

function RK_GetObject(aArray, key, value)
{
  RK_log('RK_GetObject');
  for(var i = 0; i < aArray.length; i++)
  {
    if(aArray[i][key] == value)
    {
      RK_log('RK_GetObject: '+aArray[i][key]);
      return(aArray[i]);
    }
  }
} // RK_GetObject

//////////////////////////////////////////////////

function RK_SetSelectBoxes()
{
  var aTables = RK_oSelectPages[RK_sPage];
  if(aTables)
  {
    for(var i=0; i < aTables.length; i++)
    {
      RK_WaitForElement(aTables[i],
      function(xRes, oConfig)
      {
        RK_log('RK_SetSelectBoxes');

        if(RK_sPage == 'Stats')
        RK_Select(RK_xpath('.//DIV[@id="careerTabContent"]/*/SELECT//OPTION'),  // Personal stats car selection
                  RK_oGlobals['racingpaneldata.car'].id,
                  'javascript:CareerTab.getPersonalBests('+RK_oGlobals['racingpaneldata.car'].id+','+RK_oGlobals.MemBean.custid+')');
        if(RK_sPage == 'Series')
        RK_Select(RK_xpath('.//SELECT[@id="class_select"]//OPTION'),            // Series Stats
                  RK_GetObject(RK_oGlobals.CarClassListing, 'name', RK_oGlobals['racingpaneldata.car'].name).id,
                  'javascript:ajax_filter(0,active_stat)');
        // RK_Select(RK_xpath('.//SELECT[@id="series_select"]//OPTION'),           // Planner Widget
                  // RK_oGlobals.racingpaneldata.series.seriesid,
                  // 'javascript:eventPlannerWidget.update_seriesid()');
        // RK_Select(RK_xpath('.//SELECT[@id="standings_series_select"]//OPTION'), // Standing Widget
                  // RK_oGlobals.racingpaneldata.series.seriesid,
                  // 'javascript:regionStandingsWidget.handleSeriesSelect()');
      }, 1);
    }
    window.setTimeout(function() { RK_OnlineFriends(); }, 5000);
  }
} // RK_SetSelectBoxes

//////////////////////////////////////////////////

/*
function RK_MixedClassStats()
{
  if(RK_oGlobals.racingpaneldata)
  {
    RK_log('RK_MixedClassStats');
    var aNames      = RK_oGlobals.racingpaneldata.car.name.split(/\s+/);
    var nMax        = 0;
    var xSelect     = RK_xpath('.//SELECT[@id="class_select"]');
    if(xSelect.snapshotLength)
    {
      var aOptions  = xSelect.snapshotItem(0).childNodes;
      for(var i=0; i < aOptions.length; i++)
      {
        var nCount  = 0;
        for(var j=0; j < aNames.length; j++)
        {
          if(aOptions[i].textContent.match(new RegExp(aNames[j],'i')))
          {
            nCount++;
          }
        }
        if(nCount > nMax && !(aOptions[i].selected))
        {
          nMax      = nCount;
          RK_log('RK_MixedClassStats: Activating: '+aOptions[i].text);
          aOptions[i].selected  = true;
        }
      }
      if(nMax > 0)
      {
        var xGo     = RK_xpath('.//A[@href="javascript:ajax_filter(0,active_stat)"]');
        if(xGo.snapshotLength)
        {
          var oGo   = xGo.snapshotItem(0);
          document.location.href = oGo.href;
        }
      }
    }
  }
} // RK_MixedClassStats
*/

//////////////////////////////////////////////////

function RK_OnlineFriends()
{
  RK_log('RK_OnlineFriends');
  var aTables = RK_oFriendPages[RK_sPage];
  if(aTables)
  {
    for(var i=0; i < aTables.length; i++)
    {
      RK_WaitForElement(aTables[i],
      function(xRes, oConfig)
      {
        var fn  = oConfig.func || RK_ProcessDrivers;
        fn(xRes, oConfig);
        RK_RegisteredFriends();
      });
    }
    window.setTimeout(function() { RK_OnlineFriends(); }, 5000);
  }
} // RK_OnlineFriends

//////////////////////////////////////////////////

function RK_ProcessRegistered(oDrivers, oDrvSess)
{
  RK_log('RK_ProcessRegistered');

  url = RK_sSessionTimesURL;
  RK_log("RK_ProcessRegistered: " + url);
  GM_xmlhttpRequest(
  {
    method:   'POST',
    url:      url,
    headers:  { "Content-Type": "application/x-www-form-urlencoded" },
    onload:   function(res)
    {
      RK_log("RK_ProcessRegistered: done");
      var oSessions   = JSON.parse(res.responseText);
      RK_log(oSessions);

      var xCell       = RK_xpath('//TABLE[@id="sessions_table"]/TBODY/TR/TD');

      for(var i = 0; i < oSessions.d.r.length; i++)
      {
        var oSession  = oSessions.d.r[i];
        if(oSession[1] > 0)
        {
          RK_log('RK_ProcessRegistered: ' + oSession[1] + " : " + oSession[8]);
          var aDrivers        = oDrvSess[oSession[1]] || new Array();
          for(var j = 0; j < aDrivers.length; j++)
          {
            var oDriver       = aDrivers[j];
            RK_log(oDriver);
            var nCell         = RK_oSessionCellLookup[oSession[8]];
            var oCell         = xCell.snapshotItem(nCell);
            if(oCell)
            {
              RK_log(oCell);
              var oDiv        = RK_xpath('.//DIV[@class="sessiontype_contain"]', oCell).snapshotItem(0);
              // var oDiv        = RK_xpath('.//DIV[@class="sessiontype_contain"]//DIV', oCell).snapshotItem(oDivOffset[nCell]++);
              if(oDiv)
              {
                RK_log(oDiv);
                RK_log(oDriver);
                var div       = document.createElement('div');
                div.id        = 'RK_ProcessRegistered';
                // div.cssText   = 'padding:2px; text-align:left;';
                // div.className = '';
                div.innerHTML = RK_GetDriverName(oDriver);
                oDiv.appendChild(div);
              }
            }
          }
        }
      }
    }
  });
} // RK_ProcessRegistered

//////////////////////////////////////////////////

function RK_RegisteredFriends()
{
  RK_log('RK_RegisteredFriends');
  if(RK_sPage == 'Sessions' && !document.getElementById('RK_RegisteredFriends'))
  {
    window.setTimeout(function()
    {
      RK_GetRegistered(RK_ProcessRegistered);
    }, RK_LoopWait);
  }
} // RK_RegisteredFriends

//////////////////////////////////////////////////

function RK_Begin()
{
  RK_log('RK_Begin');

  for(var id in RK_oGlobals.FriendsListing)
  {
    RK_oIDs[id]   = 'stats_friend_tr';
  }
  for(var id in RK_oGlobals.WatchedListing)
  {
    RK_oIDs[id]   = 'stats_watched_tr';
  }
  if(RK_oPrefs.Self && RK_oGlobals.MemBean)
    RK_oIDs[RK_oGlobals.MemBean.custid] = 'stats_self_tr';

  if(RK_SERIES_FILTER)  RK_SeriesFilter();
  // var RK_MIXED_CLASS      = 0;    // (RETIRED) Set to 0 to turn off the automatic Mixed-Class car selection
  // if(RK_MIXED_CLASS)    RK_MixedClassStats();
  if(RK_SET_SELECTS)    RK_SetSelectBoxes();
  if(RK_FRIENDS)        RK_OnlineFriends();
} // RK_Begin

//////////////////////////////////////////////////

function RK_UpdateCheck()
{ // Based on:  http://userscripts.org/scripts/show/20145
  if(!(RK_oPrefs.SkipUpdateCheck))
  {
    RK_log('RK_UpdateCheck');
    var now             = new Date().getTime();
    var last            = RK_oPrefs.LastUpdate || 0;
    var id              = 'RK_UPDATE';
    var id_toggle       = id+'_TOGGLE';
    var whatsnewid      = 'RK_UPDATE_WHATS_NEW';
    if((last + RK_Update) <= now || RK_DEBUG)
    {
      try
      {
        RK_oPrefs.LastUpdate  = now;
        RK_SetPrefs();

        GM_xmlhttpRequest(
        {
          method: 'GET',
          url: 'http://userscripts.org/scripts/source/'+RK_Script+'.meta.js?'+now,
          headers: {'Cache-Control': 'no-cache'},
          onload: function(resp)
          {
            var res             = resp.responseText;
            if(res)
            {
              var aVer            = res.match(/@version\s*(.*?)\s*$/m);
              var aName           = res.match(/@name\s*(.*?)\s*$/m);

              RK_log('RK_UpdateCheck: Site  Ver: '+aVer);
              RK_log('RK_UpdateCheck: Local Ver: '+RK_Version);
              if((aVer && aVer[1] != RK_Version) || RK_DEBUG)
              {
                var div           = document.createElement('div');
                div.id            = id;
                div.className     = 'stats_friend_tr';
                div.style.cssText = 'position:absolute; left:200px; top:380px; border:2px solid #000000; z-index:'+(RK_Z++)+'; padding:3px; text-align:left;';
                var html          = '';
                html             += '<div>There is a new version of "<b>iRacing Online Friends</b>".</div>';
                html             += '<div>Please visit the <a target="_blank" href="http://userscripts.org/scripts/show/'+RK_Script+'">UserScript page '+RK_ImgPop+'</a> to upgrade.</div>';
                html             += '<div id="'+whatsnewid+'"></div>';
                html             += '<br><div>Or, visit the <a target="_blank" href="http://members.iracing.com/jforum/posts/list/1275006.page">iRacing Forum thread '+RK_ImgPop+'</a> for more info.</div>';
                html             += '<br><a id="'+id_toggle+'" onclick="return(false);" href="">Turn off update checks</a>';
                html             += '<div style="text-align:right; float:right;"><a href="" onclick="javascript:document.getElementById(\''+id+'\').style.display=\'none\'; return(false);">Close [X]</a></div>';
                div.innerHTML     = html;
                var child         = document.body.firstChild;
                if(child)
                {
                  child.parentNode.insertBefore(div, child);
                }
                RK_AddClickPref(document.getElementById(id_toggle), 'SkipUpdateCheck');
              }
            }

            GM_xmlhttpRequest(
            {
              method: 'GET',
              url: 'http://www.kodey.com/iRacing/iracing_online_friends.html',
              headers: {'Cache-Control': 'no-cache'},
              onload: function(resp)
              {
                var msg = resp.responseText;
                var div = document.getElementById(whatsnewid);
                
                if(div && msg)
                {
                  div.innerHTML = msg;
                }
              }
            });
          }
        });
      }
      catch (err){}
    }
  }
} // RK_UpdateCheck

//////////////////////////////////////////////////

var RK_oGlobalElem = document.createElement('div');
RK_oGlobalElem.id = "RK_oGlobalElem";
RK_oGlobalElem.style.visibility = "hidden";
RK_oGlobalElem.style.display = "none";
document.body.appendChild(RK_oGlobalElem);

//////////////////////////////////////////////////

function RK_WaitForGlobals(func, count)
{
  RK_log('RK_WaitForGlobals');
  if(!count) count = 1;
  var ret = RK_oGlobalElem.innerHTML;
  if(!ret)
  {
    if(count < RK_MaxLoops)
      window.setTimeout(function()
      {
        RK_WaitForGlobals(func, count+1);
      }, RK_LoopWait);
  }
  else
  {
    RK_oGlobals = JSON.parse(ret);
    RK_log(RK_oGlobals);
    func();
  }
} // RK_WaitForGlobals

//////////////////////////////////////////////////

function RK_SetGlobal(name, val)
{
  document.location.href = 'javascript:void('+name+'='+JSON.stringify(val)+')';
} // RK_SetGlobal

//////////////////////////////////////////////////

function RK_GetGlobals(aVars, func)
{
  var js = 'javascript:(function(){var x={};var a=function(v){x[v]=eval(v)};';
  for(var i=0; i < aVars.length; i++)
  {
    var name = aVars[i];
    js += 'a("'+name+'");'
  }
  js += 'document.getElementById("RK_oGlobalElem").innerHTML=JSON.stringify(x);void(0);})()';
  RK_log('RK_GetGlobals: '+js.length+': '+js);
  document.location.href = js;
  RK_WaitForGlobals(func);
} // RK_GetGlobals

//////////////////////////////////////////////////

var RK_oSelectPages =
{
  Stats :
  [
    { name: 'personalBestsTable',     type: 'id' }
  ],
  Series :
  [
    { name: 'stats_series_table',     type: 'class' }
  ]
}
var RK_oFriendPages =
{
  Dashboard :
  [
    { name: 'WHPracticeTable',        type: 'id',     nSpanL: 2, nSpanR: 5, url: RK_sOpenSessionURL },
    { name: 'WHEventsTable',          type: 'id',     nSpanL: 4, nSpanR: 5, url: RK_sCustDisplayURL },
    { name: 'WHRaceTable',            type: 'id',     nSpanL: 2, nSpanR: 5, url: RK_sOpenSessionURL,    func: RK_RaceRegistered }
  ],
  Sessions :
  [
    { name: 'openpractice_table',     type: 'id',     nSpanL: 1, nSpanR: 3, url: RK_sOpenSessionURL }
  ],
  Join :
  [
    { name: 'hosted_sessions_current',type: 'id',     nSpanL: 9, nSpanR: 6, url: RK_sPrivateSessionURL, func: RK_ProcessHosted }
  ],
  Hosted :
  [
    { name: 'results_table',          type: 'class',  nSpanL: 9, nSpanR: 4, url: RK_sCustDisplayURL }
  ],
  Results :
  [
    { name: 'results_table',          type: 'class',  nSpanL: 15, nSpanR: 4, url: RK_sCustDisplayURL }
  ],
  Spectator :
  [
    { name: 'spectator_table',        type: 'class',  nSpanL: 3, nSpanR: 5, url: RK_sSessionDriversURL, reZero: /[>(]\s*0\s*[)<]/ }
  ],
  Replays :
  [
    { name: 'replays_data_table',     type: 'class',  nSpanL: 10, nSpanR: 8, url: RK_sCustDisplayURL }
  ],
  Stats :
  [
    { name: 'last10_table',           type: 'class',  nSpanL: 7, nSpanR: 5, url: RK_sCustDisplayURL }
  ]
};  // RK_oFriendPages

//////////////////////////////////////////////////

RK_sPage            = RK_oURLs[document.location.pathname.toLowerCase()];

if(RK_sPage == 'Home')
  if(document.title.match(/Dashboard/i))        RK_sPage  = 'Dashboard';
// if(RK_sPage == 'Stats')
// {
  // if(document.location.href.match(/friendid=/i))        RK_sPage  = 'Friends'
  // else if(document.location.href.match(/watchedid=/i))  RK_sPage  = 'Studied'
  // else if(document.location.href.match(/custid=/i))     RK_sPage  = 'Drivers'
  // else                                                  RK_sPage  = 'Personal'
// }
RK_log('RK_sPage: ' + RK_sPage);

// RK_SetGlobal('ajaxUpdateManager.freqs.whpractice', 300);
RK_GetGlobals([ 'MemBean', 'FriendsListing', 'WatchedListing', 'racingpaneldata.car', 'SeasonListing', 'simStatus', 'CarClassListing'], RK_Begin);
RK_UpdateCheck();
