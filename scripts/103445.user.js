//Copyright 2011 Guatec
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
// @name          Anti-BI-otico
// @namespace     http://www.guatec.com
// @description   Re-habilitar el boton derecho en paginas del banco industrial
// @include       *
// ==/UserScript==

//don't append the bar if it's an iframe
if (window.top != window.self)
{
  exit;
}

base_url = getBaseURL();

//don't display the bar on facebook.com
if (location.href.indexOf('bi.com.gt/') <= 0)
{
  exit;
}

var scriptCode = new Array();   // this is where we are going to build our new script

// here's the build of the new script, one line at a time
scriptCode.push('function whichButton(){'        );
scriptCode.push('  window.status ="Se aplico el Anti-BI-otico";'  );
scriptCode.push('}');

// now, we put the script in a new script element in the DOM
var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;                            // recover the memory we used to build the script