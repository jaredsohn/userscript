// ==UserScript==
// @name        Gladiatus Notify
// @namespace   http://fluidapp.com
// @description Notifies you when you have a new message or package in Gladiatus. Also refreshes the page every 3 minutes to ensure notifications are recieved. For Fluid users. **REQUIRES USER MODIFICATION**
// @version        1.2
// @include     http://*.gladiatus.*
// @exclude     http://*.gladiatus.*/game/index.php?mod=messages*
// @author      Kahil Young
// ==/UserScript==


// Enter the server you play on here. Will look like http://s3.gladiatus.us

var svrname = "YOUR SERVER GOES HERE";


// Sets the refresh of the page ever 3 minutes.

var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var INTERVAL = 3 * ONEMIN ;			// How often is page refreshed (in ms)

window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;


// Looks for the notification images and displays a dock badge in Fluid

var imgmsg = '/game/img/interface/messages.gif';
var imgpack = '/game/img/interface/packages.gif';
var i = -1;
while (i<200){
i++;
if(document.images[i].src==svrname + imgpack){
	window.fluid.dockBadge = "!";
	//fluid.showGrowlNotification({
	//title: "Gladiatus",
	//description: "You have a new package.",
	//priority: 0,
	//sticky: false});
	}
if(document.images[i].src==svrname + imgmsg){
	window.fluid.dockBadge = "!";
	//fluid.showGrowlNotification({
	//title: "Gladiatus",
	//description: "You have a new message.",
	//priority: 0,
	//sticky: false});
	}
}
