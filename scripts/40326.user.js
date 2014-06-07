//BTDD Plus
// version 0.1 
// 2008-01-11
// Released under the GPL license


// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BTPD Plus," and click Uninstall.


// ==UserScript==
// @name          BTPD Plus
// @description   Adds estimated completion time, total up/down speed
// @include       http://*:8883/torrent/bt.cgi

// ==/UserScript==

var IsFound = 0;
var AllDescs;
var allTDs;

var namesize, perctdown, rx, tx
var totalup=0
var totaldown=0
var secsleft=0
var allTDs=document.getElementsByTagName('td');
var dhms
var totaltarget = 0


//alert(allTDs.length)



for (var i = 0; i < allTDs.length; i++) 
{	
	var thisTD = allTDs[i];

	

	if (thisTD.height == "30" && totaltarget == 0)
	{ totaltarget = i }


	if (thisTD.className == "desc")
	{	
		namesize = thisTD.innerHTML
		var patt1 = new RegExp("[(]");
		var filesize
		var matched
		var size
		var multiplier
		size=0
		matched = patt1.test(namesize);

		while (matched == true)
		{
			filesize=RegExp.rightContext;
			matched = patt1.test(filesize);
		}

		size=filesize.substring(0,filesize.length -3)

		switch(filesize.substring(filesize.length -2, filesize.length -3))
		{
			case "G":
				multiplier=1048576;
  				break;    
			case "M":
  				multiplier=1024;
  				break;
			default:
  				multiplier=1
		}

		size=multiplier*size

		perctdown = allTDs[i+14].innerHTML
		patt1.test(perctdown);
		var downsize;
		var dsize;

		dsize = RegExp.leftContext;
		
		downsize = dsize.substring(1,dsize.length-2);
		
		switch (dsize.substring(dsize.length -2, dsize.length-1))
		{
		case "G":
		  	multiplier=1048576;
		  	break;    
		case "M":
			multiplier=1024;
			break;
		default:
  			multiplier=1
		}

		downsize=multiplier*downsize
		
		//alert(downsize)
				
		
		rx=allTDs[i+18].innerHTML
		var patt2 = new RegExp("kB");
		var downspeed
		patt2.test(rx);
		downspeed= RegExp.leftContext
		totaldown=parseFloat(downspeed) + parseFloat(totaldown)		
		tx=allTDs[i+31].innerHTML

		var upspeed
		patt2.test(tx);
		upspeed= RegExp.leftContext
		totalup=parseFloat(upspeed) + parseFloat(totalup)
		
		//alert(size)
		//alert(downsize)
		//alert(downspeed)
		
		secsleft = (size-downsize)/downspeed
		//alert(secsleft)

		if (secsleft > 0)
		{
			var days=Math.floor(secsleft/ 86400);
			// After deducting the days calculate the number of hours left
			var hours = Math.floor((secsleft - (days * 86400 ))/3600)
			// After days and hours , how many minutes are left
			var minutes = Math.floor((secsleft - (days * 86400 ) - (hours *3600 ))/60)
			// Finally how many seconds left after removing days, hours and minutes.
			var secs = Math.floor((secsleft - (days * 86400 ) - (hours *3600 ) - (minutes*60)))

			dhms = days + "d:" + hours + "h:" + minutes + "m:" + secs + "s"
			allTDs[i].innerHTML = "<b>" + allTDs[i].innerHTML + "</b><br>" + dhms 
		}
		


	}


}
totalup=Math.round(totalup*100)/100
totaldown=Math.round(totaldown*100)/100

allTDs[totaltarget].colSpan="9"
allTDs[totaltarget].align="right"
allTDs[totaltarget].className = "submenu txt"

allTDs[totaltarget].innerHTML = "<b>Down: " + totaldown + " kB/s; Up: " + totalup + " kB/s<b>"
