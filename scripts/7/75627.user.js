//Copyright 2010 Facebook, Inc.
//
//Licensed under the Apache License, Version 2.0 (the "License"); you may
//not use this file except in compliance with the License. You may obtain
//a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
//WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
//License for the specific language governing permissions and limitations
//under the License.

// ==UserScript==
// @name          Facebook Like
// @namespace     http://www.facebook.com
// @description   Like any page on the web!
// @include       *
// ==/UserScript==

//don't append the bar if it's an iframe
if (window.top != window.self)
{
  exit;
}

base_url = getBaseURL();

//don't display the bar on facebook.com
if (base_url == 'http://www.facebook.com/' || base_url == '/')
{
  exit;
}

//assigning event handlers need a timeout so they don't die
setTimeout(assignClickHandler, 100);

var base_url = getBaseURL(window.location);

//define the HTML/CSS that needs to be prepended to the current page
var output_markup = '';
output_markup = '<div style="z-index: 9999; position: fixed; width: 100%; top: 0px; left: 0px; height: 23px; padding: 3px; background-color: #E5E5E5; font-family: tahoma; color: #3B5998; font-size: 13px; opacity: 0.90; filter:alpha(opacity=90);">' +
         '<div style="float: left; font-weight: bold; margin: 2px 15px 0px 0px;"><div style="color: #fff; margin: 0px 5px 0px 5px; float: left;"><a href="#" onclick="return false;" id="socialInfo" style="color: #9E9E9E;"><div style="border: 1px solid #cfcfcf; background-color: #fff; color: #000; width: 16px; height: 16px; line-height: 1.2em; font-size: 1em; font-family: Tahoma; font-weight: bold; text-align: center; text-decoration: none;">+</div></a></div><div style="float: left; clear: none;">' + document.title.substring(0,60) + '...</div></div>' +
         '<div style="float: left;"><iframe src="http://www.facebook.com/plugins/like.php?href=' + window.location + '&layout=standard&show_faces=false&width=450&action=like&colorscheme=light&height=25" scrolling="no" frameborder="0" style="border: none; width: 450px; height: 40px;" allowTransparency="true"></iframe></div>' +
         '</div>' +
         '<div id="extra-info" style="display: none;">' +
         '  <div style="z-index: 9999; margin-top: 5px; position: fixed; top: 23px; left: 0px; width: 300px; height: 580px; padding: 0px 3px 3px 3px; background-color: #E5E5E5; font-family: tahoma; color: #3B5998; font-size: 13px;">' +
         '  <iframe src="http://www.facebook.com/plugins/activity.php?site=' + base_url + '&width=300&height=580&header=true&colorscheme=light&recommendations=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:580px;" allowTransparency="true"></iframe>' +
         '  </div>' +
         '</div>';

output = document.createElement('div');
output.innerHTML = output_markup;

//prepend the markup to the body
body = document.getElementsByTagName('body')[0];
body.appendChild(output);

//buffer the top of the page so the bar doesn't overlap any content on initial load
body.style.marginTop = '29px';

//toggle Recent Activity/Recommendations sidebar on and off
function showExtraInfo() {
  obj = document.getElementById("extra-info");
  
  if (obj.style.display == "none")
  {
    obj.style.display = "";
  }
  else {
    obj.style.display = "none";
  }
  
  return false;
}

//track the click event on the plus ([+]) button in order to toggle showExtraInfo
function assignClickHandler() { 
  var clickDiv = document.getElementById('socialInfo');
  clickDiv.addEventListener("click", showExtraInfo, true);
}

//get the base URL of the site the user is currently on
function getBaseURL () {
  var url = location.href;
  var baseURL = url.substring(0, url.indexOf('/', 14));
  
  if (baseURL.indexOf('http://localhost') != -1) {
    var url = location.href;
    var pathname = location.pathname;
    var index1 = url.indexOf(pathname);
    var index2 = url.indexOf("/", index1 + 1);
    var baseLocalUrl = url.substr(0, index2);

    return baseLocalUrl + "/";
  }
  else {
    return baseURL + "/";
  }
}