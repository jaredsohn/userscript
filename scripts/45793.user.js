// ==UserScript==
// @name           OhioLINK 2.0
// @namespace      CS324 Platypus
// @description    Makes the OhioLINK webpage more accessible to blind users
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

// if/else structure added by Jon Gear, Ryan Vermillion, Bret Moore, Brett Monday, Luke Sommer April 2nd, 2009 7:50pm
if(window.location.href == "http://www.ohiolink.edu/")
{
	//Jon's pride and joy
	// Next 12 lines added by Jon Gear April 2nd, 2009 11:15pm
	//This function strips the focus off the page and allows our AXSJAX script to run properly!
	window.addEventListener('load', 
		function(){ 
			setTimeout( //setTimeout is asynchronous so it will wait 100ms while the page runs onload, tricky  :)
				function () {document.getElementById('qs-search').blur();},
			100); }, false);
   
	// next line edited by Jon Gear April 16th, 2009 8:10pm
	myScript.src = 'http://ohiolink.googlecode.com/files/axsOhioLINKHomepage.js';

	document.getElementsByTagName('head')[0].appendChild(myScript);
}
else if(window.location.host == "olc1.ohiolink.edu")
{
        // next line edited by Jon Gear April 16th, 2009 8:10pm
	myScript.src = 'http://ohiolink.googlecode.com/files/axsOhioLINKbooksearch.js';
        //Next line added by Jon Gear, Ryan Vermillion, Bret Moore, Brett Monday, Luke Sommer April 2nd, 2009 7:50pm
	document.getElementsByTagName('head')[0].appendChild(myScript);
}
//else if Added on by Jon Gear, Ryan Vermillion, Bret Moore, Brett Monday, Luke Sommer, Bader Alsaloom April 9th, 2009 7:25pm
else if(window.location.host == "dmc.ohiolink.edu")
{		
	// next line edited by Jon Gear April 16th, 2009 8:10pm
	myScript.src = 'http://ohiolink.googlecode.com/files/axsOhioLINKvideosearch.js';
	//Added on by Jon Gear, Ryan Vermillion, Bret Moore, Brett Monday, Luke Sommer, Bader Alsaloom April 9th, 2009 7:25pm
	document.getElementsByTagName('head')[0].appendChild(myScript);
}
//else if Added on by Jon Gear April 16th, 2009 8:10pm
//next 26 lines added by Jon Gear April 18th, 2009 10:20pm
else if(window.location.host == "journals.ohiolink.edu")
{	
	var navPath = window.location.href;

	if(navPath.search("letter=") > 0)
	{
		myScript.src = 'http://ohiolink.googlecode.com/files/axsOhioLINKElectricJournalCenterSearchByTitle.js';
		document.getElementsByTagName('head')[0].appendChild(myScript);
	}
	else if(navPath.search("category=") > 0)
	{
		myScript.src = 'http://ohiolink.googlecode.com/files/axsOhioLINKElectricJournalCenterSearchByCategory.js';
		document.getElementsByTagName('head')[0].appendChild(myScript);
	}
	else if(window.location.href == "http://journals.ohiolink.edu/ejc/")
	{
		myScript.src = 'http://ohiolink.googlecode.com/files/axsOhioLINKElectricJournalCenter.js';
		document.getElementsByTagName('head')[0].appendChild(myScript);
	}
	else
	{
		myScript.src = 'http://ohiolink.googlecode.com/files/axsOhioLINKElectricJournalCenterRefinedSearch.js';
		document.getElementsByTagName('head')[0].appendChild(myScript);
	}	
}
//else if added on by Jon Gear May 1st, 2009 11:30am
//next 14 lines added by Jon Gear May 1st, 2009 11:30am
else if(window.location.host == "olc7.ohiolink.edu")
{
	var pathName = window.location.href;
	if(pathName.match("http://olc7.ohiolink.edu/whatsnew/archives/") == "http://olc7.ohiolink.edu/whatsnew/archives/")
	{
		myScript.src = 'http://ohiolink.googlecode.com/files/axsOhioLINKwhatsnewRefinedQuery.js';
		document.getElementsByTagName('head')[0].appendChild(myScript);
	}
	else
	{
		myScript.src = 'http://ohiolink.googlecode.com/files/axsOhioLINKwhatsnew.js';
		document.getElementsByTagName('head')[0].appendChild(myScript);
	}
}