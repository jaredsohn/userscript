// ==UserScript==
// @name           Group 3 Final Iteration Script Loader
// @description    Makes The FuMP more accessible to blind users
// @include        *
// ==/UserScript==

// * @author clchen@google.com (Charles L. Chen, author, unless otherwise noted)
// * @author jigear@bgsu.edu (Jon Gear, modifier -- see line comments)
// * @author  mooreba@bgsu.edu(Bret Moore, modifier -- see line comments)
// * @author  vryan@bgsu.edu(Ryan Vermillion, modifier -- see line comments)
// * @author  lsommer@bgsu.edu(Luke Sommer, modifier -- see line comments)
// * @author  alsalbj@bgsu.edu(Bader Alsaloom, modifier -- see line comments)
// * @author bmonday@bgsu.edu (Brett Monday, modifier -- see line comments)


// Copyright 2008 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//All code written by Google unless otherwise noted!


//Inject the necessary AxsJAX library scripts
var theLib = document.createElement('script');
theLib.type = 'text/javascript';
theLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsJAX.js';
var navLib = document.createElement('script');
navLib.type = 'text/javascript';
navLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsNav.js';
var lensLib = document.createElement('script');
lensLib.type = 'text/javascript';
lensLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsLens.js';
var sndLib = document.createElement('script');
sndLib.type = 'text/javascript';
sndLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsSound.js';
var pkLib = document.createElement('script');
pkLib.type = 'text/javascript';
pkLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/PowerKey.js';

document.getElementsByTagName('head')[0].appendChild(theLib);
document.getElementsByTagName('head')[0].appendChild(navLib);
document.getElementsByTagName('head')[0].appendChild(lensLib);
document.getElementsByTagName('head')[0].appendChild(sndLib);
document.getElementsByTagName('head')[0].appendChild(pkLib);

var myScript = document.createElement('script');
myScript.type = 'text/javascript';

// code below added by Jon Gear, Ryan Vermillion, Bret Moore, Brett Monday, Luke Sommer April 2nd, 2009 7:50pm unless otherwise noted
if(window.location.href == "http://thefump.com/sideshow.php") //href location added by Dan Netry April 23rd 3:50pm
{
	myScript.src = 'http://127.0.0.1:4001/axsSkel1.js'; //script location added by Dan Netry April 23rd 3:50pm


	document.getElementsByTagName('head')[0].appendChild(myScript);
}
else 
{
	myScript.src = 'http://127.0.0.1:4001/axsSkel.js'; // script location added by Dan Netry April 23rd 3:50pm

	document.getElementsByTagName('head')[0].appendChild(myScript);
}