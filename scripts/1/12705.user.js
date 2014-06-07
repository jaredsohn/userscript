// Minimum Display Facebook App Request
//
// Version 1.1
//
// Date Written: 2007-10-01
// Last Modified: 2007-12-02 12:02 AM (00:02)
//
// (c) Copyright 2007 Ali Karbassi.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Minimum Display Facebook App Request", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Removes the HUGE list of application requests on the front page, and
// displays one count of all the application requests you may have. You
// can click the link and go to the page of all the requests.
//
// NOTE: This does not alter, delete, edit, add, or anything else to
//       your facebook profile. Just remove or disable this script and
//       everything will be displayed the same as it used to
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Minimum Display Facebook App Request
// @author      Ali Karbassi
// @namespace   http://www.karbassi.com
// @description Removes the HUGE list of application requests on the front page, and displays one count of all the application requests you may have. You can click the link and go to the page of all the requests.
// @include     http://*facebook.tld/home.php*
// ==/UserScript==

// Let's do some work :D
var [ids, count] = findApps();
if(count>0)
{
	createDisplay(ids, count);
	removeApps(ids);
}

// FUNCTIONS
function findApps ()
{
	var anchors = (document.getElementById('home_sidebar')).getElementsByTagName('a');
	var appReqExp = /reqs\.php#confirm_(\d*)_(.*)/;

	var count = 0;
	var ids = '';

	for( var i = 0; i < anchors.length; i++ )
	{
		if( appReqExp.exec( anchors[i].href ) )
		{
			var appID = RegExp.$1;
			ids += appID + ',';
			count += parseInt(document.getElementById('app_' + appID + '_sidebar_count').firstChild.innerHTML);
		}
	}

	ids = ids.split(',');
	ids.pop(); // Last element is empty!
	return [ids, count];
}

function createDisplay (ids, count)
{
	var disp = document.createElement('span');
	disp.innerHTML = '<a href="http://facebook.com/reqs.php" style="background: transparent url(http://photos-339.ll.facebook.com/photos-ll-sctm/v43/55/2345053339/app_2_2345053339_6333.gif) no-repeat scroll 0pt 5px;"><strong>' + count + '</strong> app requests!</a>';
	document.getElementById('app_' + ids[0] + '_sidebar').parentNode.appendChild(disp);
	return 0;
}

function removeApps (ids)
{
	for (var i = ids.length - 1; i >= 0; i--)
	{
		removeElement( document.getElementById( 'app_' + ids[i] + '_sidebar' ) );
	}

	return 0;
}

function removeElement( e )
{
	return (e.parentNode).removeChild( e );
}