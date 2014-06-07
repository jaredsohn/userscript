var headers = parseHeaders(<><![CDATA[
// ==UserScript==
// @name            HKGOLDEN Script
// @namespace       http://davewasthere.com/scripts/gm
// @description     Give a better performance of HKGOLDEN website!
// @include         http://m.hkgolden.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @version         0.0.1
// @copyright       C.Y.Fung
// @run-at          document-start
// @uso:script      78146
// ==/UserScript==
// Version History
// 0.0.1 start
//
]]></>.toXMLString().split(/[\r\n]+/).filter(/\/\/ @/));

function parseHeaders(all) {
  var headers = {}, name, value;
  for each (var line in all) {
    [line, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
    headers[name] = value;
  }
  return headers;
} 

var version = headers['version'];
checkForNewVersion();

function checkForNewVersion()
{
    GM_xmlhttpRequest({
      method:"GET",
      url:"http://userscripts.org/scripts/source/" + headers['uso:script'] + ".meta.js",
      headers:{
        "Accept":"text/javascript; charset=UTF-8"
      },
      overrideMimeType:"application/javascript; charset=UTF-8",
      onload:function(response) {
      
        var meta = response.responseText.split(/[\r\n]+/).filter(/\/\/ @/);
        var httpsMETA = parseHeaders(meta);
        var hostedVersion = httpsMETA["uso:version"];
        
        var installedVersion = GM_getValue('installedVersion', hostedVersion);
        if(hostedVersion != installedVersion)
        {
            if(confirm('There\'s a new version of ' + headers['name'] + ' available. Would you like to update to the latest version?'))
            {
                GM_setValue('installedVersion', hostedVersion);
                window.location = 'http://userscripts.org/scripts/source/' + headers['uso:script'] + '.user.js';
            }
        }

      }
    });

}