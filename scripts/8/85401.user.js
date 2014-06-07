var fileMETA = parseHeaders(<><![CDATA[
// ==UserScript==
// @name           AutoUpdate Test
// @namespace      http://userscripts.org/users/158890
// @description    A test of autoupdating methods
// @include        *
// @version        4.0.100805.0200

// @resource       myScript 85401.user.js
// @resource       remoteMeta_USO 85401.meta.js
// ==/UserScript==
]]></>.toString());


function parseHeaders(metadataBlock)
{
  var headers = {};
  var line, name, prefix, header, key, value;

    var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
    for each (line in lines) {
      [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);

      switch (name) {
        case "licence":
          name = "license";
          break;
      }

      [key, prefix] = name.split(/:/).reverse();

      if (prefix) {
        if (!headers[prefix])
          headers[prefix] = new Object;
        header = headers[prefix];
      } else
        header = headers;

      if (header[key] && !(header[key] instanceof Array))
        header[key] = new Array(header[key]);

      if (header[key] instanceof Array)
        header[key].push(value);
      else
        header[key] = value;
    }

    headers["licence"] = headers["license"];

  return headers;
}



//var ThisFileSource = GM_getResourceText("myScript");
//console.log (ThisFileSource);

var remoteMeta_USO = parseHeaders(GM_getResourceText("remoteMeta_USO"));
//console.info(remoteMeta_USO);




var UPDATER = {};

var currentTimeMs = new Date().getTime().toString();
var timeSinceLastCheck = currentTimeMs - GM_getValue('lastUpdateCheck',0);


UPDATER.newVersionActions = function(_newHeaders)
{
  var updateMsg ='New version available for your script!\n\n'+
    'Script: '+_newHeaders.name+'\n'+
    'v: '+_newHeaders.version+'\n'+
    '\n'+
    'UpdateNote:\n'+
    _newHeaders.updateNote+'\n'+
    _newHeaders.updateNoteMin+'\n'+
    '\n'+
    'Do you want to install this update?';

  console.info(updateMsg);

  var shouldInstallUpdate = confirm(updateMsg);

  if(shouldInstallUpdate)
  {
    document.location.href = UPDATER.scriptUrl;
  }
  else
  {

    var msToWait = UPDATER.updateFrequency;
    msToWait = (msToWait < 0) ? 0 : msToWait;
    var secsToWait = Math.floor(msToWait / 1000) % 60;
    var minsToWait = Math.floor((msToWait / 1000) / 60) % 60;
    var hoursToWait = Math.floor(((msToWait / 1000) / 60) / 60);


    var denyUpdateMessage = 'Script not updated. \nYou will be reminded in' +
      hoursToWait + 'hours, ' +
      minsToWait + 'mins, ' +
      secsToWait + 'seconds';

    console.info(denyUpdateMessage);
    alert(denyUpdateMessage);
  }

};

UPDATER.isOtherVersionNewer = function(currentVer_input,otherVer_input)
{

  var currentVer = currentVer_input.toString().split('.');
  var otherVer = otherVer_input.toString().split('.');

  var numberOfPieces = (currentVer.length < otherVer.length) ? otherVer.length : currentVer.length;

  var otherVerIsNewer = false;

  for(var i=0; i<numberOfPieces; i++) {
    currentVer[i] = parseInt(currentVer[i]) || 0;
    otherVer[i] = parseInt(otherVer[i]) || 0;

    if(otherVer[i] > currentVer[i]) {
      otherVerIsNewer = true;
    }

    // If we have already determined that the other version number is larger, we do not need to continue testing the remaining components
    if(otherVerIsNewer) { break; }
  }

  return otherVerIsNewer;
};

UPDATER.updateCallback = function(_responseText)
{
  var _newHeaders = parseHeaders(_responseText);
  var isNewVersionAvailable = UPDATER.isOtherVersionNewer(fileMETA.version,_newHeaders.version);

  if(isNewVersionAvailable){
    UPDATER.newVersionActions(_newHeaders);
  }
};

UPDATER.getRemoteMeta = function()
{
  GM_xmlhttpRequest({
    method: 'GET',
    url: UPDATER.metaUrl,
    headers: {
       'User-Agent': navigator.userAgent,
       'Content-Type': 'application/x-www-form-urlencoded'
    },
    onload: function(r) { UPDATER.updateCallback(r.responseText); },
    onerror: function(e) { console.info(e); }
   });

};


UPDATER.check = function(_forceUpdate)
{

  if(timeSinceLastCheck > UPDATER.updateFrequency || _forceUpdate)
  {
    console.info('Checking for updates..');
    UPDATER.getRemoteMeta();
    GM_setValue('lastUpdateCheck',currentTimeMs);

  }
  else
  {
    var msToWait = UPDATER.updateFrequency - timeSinceLastCheck;
    msToWait = (msToWait < 0) ? 0 : msToWait;
    var secsToWait = Math.floor(msToWait / 1000) % 60;
    var minsToWait = Math.floor((msToWait / 1000) / 60) % 60;
    var hoursToWait = Math.floor(((msToWait / 1000) / 60) / 60);


    var denyUpdateMessage = 'Not checking for updates - next check in ' +
      hoursToWait + 'hours, ' +
      minsToWait + 'mins, ' +
      secsToWait + 'seconds';

    console.info(denyUpdateMessage);

  }
};

UPDATER.scriptUrl = 'http://userscripts.org/scripts/source/'+parseInt(remoteMeta_USO.uso.script)+'.user.js';
UPDATER.metaUrl = 'http://userscripts.org/scripts/source/'+parseInt(remoteMeta_USO.uso.script)+'.meta.js';

UPDATER.updateFrequency = 1000 * 60 * 15; // 20mins

UPDATER.check(false);




