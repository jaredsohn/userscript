// ==UserScript==
// @name           starly_include
// @namespace      http://www.darkztar.com
// @description    include for my gm scripts
// @author         BackslashN aka starly
// @include        nowhere
// ==/UserScript==

function StarInclude()
{
  this.saveTimestamp = function()
  {
    GM_setValue('StarInclude_lastcheck', new Date().getTime().toString());
  }
  
  this.lastCheckLonger24H = function()
  {
    return ((GM_getValue('StarInclude_lastcheck', '0') + 86400) < new Date().getTime());
  }
  
  this.requestData = function(surroundingtag, continueFunction)
  {
    GM_xmlhttpRequest(
      {
        method: 'GET',
        url: 'http://starly.bplaced.net/GM.txt',
        onload: function(responseDetails)
        {
          if(responseDetails.status != 200)
          {
            alert('Couldn\'t fetch data...');
            continueFunction('');
          }
          else
          {
            var before_string = '{' + surroundingtag + '}';
            var after_string = '{/' + surroundingtag + '}';
            var in_string = responseDetails.responseText;
            var startpos = in_string.indexOf(before_string) + before_string.length;
            continueFunction(in_string.substring(startpos, in_string.indexOf(after_string, startpos)));
          }
        }
      }
    );
  }
}