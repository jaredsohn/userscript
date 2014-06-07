// Copyright 2010 Vladimir Rutsky
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
//
// ==UserScript==
// @name          RutubeDownloader
// @namespace     http://userscripts.org/users/bob
// @description   Script for downloading video from rutube.ru
// @include       *rutube.ru/tracks/*
// @copyright     2010, Vladimir Rutsky
// @license       Apache License, Version 2.0; http://www.apache.org/licenses/LICENSE-2.0
// @version       0.1
// ==/UserScript==

function findElementToAttach()
{
  var infoPanelElementsSnapshot = 
    document.evaluate("//div[@id='player']/div[2]/div[1]", document, 
                      null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if (infoPanelElementsSnapshot.snapshotLength == 1)
    return infoPanelElementsSnapshot.snapshotItem(0);
  else
    return null;
}

function attachLink(attachElement, ref)
{
  var refElement = document.createElement('a');
  var textElement = document.createTextNode('Download');

  refElement.appendChild(textElement);
  refElement.setAttribute('href', ref);
  attachElement.appendChild(refElement);
}

function decodeScriptArgs(string)
{
  // Based on Steve comment from 
  // http://www.bennadel.com/blog/695-Ask-Ben-Getting-Query-String-Values-In-JavaScript.htm
  var q = (string.length > 1 ? string.substring(1).split("&") : []);
  var qKeys = {};

  for (var i = 0; i < q.length; i++)
    qKeys[q[i].match(/^[^=]+/)] = q[i].replace(/^[^=]+=?/, "");

  return qKeys;
}

function findDirectLink(callback)
{
  var pageArgs = decodeScriptArgs(window.location.search);
  if (pageArgs.v != null)
  {
    var videoXMLURL = 'http://bl.rutube.ru/' + pageArgs.v + '.xml'
    GM_xmlhttpRequest({method: 'GET', url: videoXMLURL,
      onload: function( response ) {
        if (response.readyState == 4)
        {
          var xmlContent = new DOMParser().parseFromString(response.responseText, "text/xml");
          finalAddress = xmlContent.getElementsByTagName('finalAddress')[0].firstChild.nodeValue;
          callback(finalAddress);
        }
      }
    });
  }
  else
    callback(null);
}

function main()
{
  findDirectLink(function( directLink ){
    if (directLink != null)
    {
      var attachElement = findElementToAttach();

      if (attachElement != null)
        attachLink(attachElement, directLink);
      else
        GM_log("Failed to find element to attach.");
    }
    else
      GM_log("Failed to get direct link on video.");  
  });
}

main();
