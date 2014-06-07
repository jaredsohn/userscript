// ==UserScript==
// @name	Basecamp: Replace Event Text w/ Image Bugs
// @namespace	http://www.timelydbs.com
// @description	Replaces event text on the Dashboard & Project Overview pages with the previously used image bugs.  Also incorporates the Private bugs.
// @include	http://*.clientsection.com/*
// @include	http://*.grouphub.com/*
// @include	http://*.projectpath.com/*
// @include	http://*.seework.com/*
// @include	http://*.updatelog.com/*
// @include	https://*.clientsection.com/*
// @include	https://*.grouphub.com/*
// @include	https://*.projectpath.com/*
// @include	https://*.seework.com/*
// @include	https://*.updatelog.com/*
// ==/UserScript==

//define replacement icons
var icons = {
	todo: 'data:image/gif;base64,R0lGODlhGgAJALMKAP%2F%2F%2F750AMx7ALxyAM18AMN1AMh4AMBzAMp6AMZ2AF%2BNpwAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAAaAAkAAARMUJFJq70zKWOE%2F2AoegaCAKiZmiwKtK%2FJGQBX07Ot33fiA7%2BgKwEkGo%2BFJEDJTDaXy0L0QAVQD6jr1bW1UgPgsHhMHisG6LR6zU4rIgA7',
  message:'data:image/gif;base64,R0lGODlhJQAJALMKAP%2F%2F%2FzpYjTVQgDpZjjNOfTZShDhViDZSgzlXizdUhwAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAAlAAkAAARjUI1Jq70Yq8C7%2F2AoBggClKYJnCq7umwrI4ax2oBd63ve1zkfcGdIJADH5Mu4Mh6RzyZS2kwUCoArdqu9ZrXZb9jLvR4OgDMavWKn3ee3fP4W2O%2F4vH7PFygIgIGCg4SFhQoRADs%3D',
  comment:'data:image/gif;base64,R0lGODlhJwAJAMQSAP%2F%2F%2F3Sft3WguGaTrWWSrGSSrGyYsXCctG6as2uYsXKetmaUrWiWr3GctGiVr26asnKdtmmVrwAAAGmWr26Zs3Oetm6ZsnOdtnOet2aUrGaTrGmVsHKdt2iWsAAAAAAAACH5BAEAABIALAAAAAAnAAkAAAWnoCSMZGmeaCpIQeu%2BcCzPrqJcAADZucLpGAigorsIiT2ATaHMKRWHA%2BDQmAIaVek1p61uqVrqVBo9IBCAM%2BWRtgAoADecja476WnAo75PGAB%2BgIB%2FCQAGh4aGiIUJgYiAjAYJGw4MOQ4OEzkMHQAMnwAOABERmpY5EZ6knpaZDgMLsbADtLW2tQsDGbmwvLa8sRoSBcQFBMbIxATHy8fGzczNysoEEiEAOw%3D%3D',
	milestone:'data:image/gif;base64,R0lGODlhKwAJALMKAP%2F%2F%2F2t8S2FwRGx9TF9uQ2R0Rmd4SWZ3SGRzRml6SgAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAArAAkAAARvUI1Jq704WxW6%2F2AojmKSAOapoibgtq%2FLvmp70obh6oDu5z1gbhgs8oTB3OEAYDqbzaVMGnVaoU%2Bma1koALre8Lc7BofP429abUYgAO63XPZ21eFufD0fh9MRAoGCg4SFhoeGCgSLjI2Oj5CRjgoRADs%3D',
  writeboard:'data:image/gif;base64,R0lGODlhMQAJALMJAP%2F%2F%2Fye3rCSpnyi6rySoniazqSWupCWtoiayqP%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAxAAkAAARzMI1Jq70465mC%2F2AojmQpAh8KrJ7Kri7aygFb2%2FBXFADv978dEOgLGnvDIhCBADSfMKbz2VxVp9irM0qdGgwAsDgcFpvL53SZnDYf3oBDXA6n22Hy1Ttfp8%2FjeG8Cg4SFhoeIiYqFCQSOj5CRkpOUlY4JEQA7',
  file:'data:image/gif;base64,R0lGODlhEQAJALMKAP%2F%2F%2F3BEbnxLen1Me25DbHhJdXRGcXNGcXpKd3dIdAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAARAAkAAAQ5UI1Jq1Ui680zQkAIjl8IfEUBpGqbrmySmHMt04lhAPru67ze4QAYEokhZPEQaDqf0KaCQK1ar4oIADs%3D',
  messagepvt:'data:image/gif;base64,R0lGODlhMQAJALMNAP////8AADVQgDpYjTNOfTpZjjZShDhViDZSgzlXizdUh/8BAf8HB////wAAAAAAACH5BAEAAA0ALAAAAAAxAAkAAASIsIVJQ7u36M27/59UVdhgnmiqruwwMQBAXkkC1LYd1/Gt+zverlebLGSyCeZwiDUBTWZUCqUyodWr9ECJzRoKBUBM7oVjYfFYjR630YruCGMwAOr2PL5+x9/7f3x6dXJfCAgAh4iIMYyJjoePkpOPI18CmJmam5ydngIicxgNBKWmp6ipqqoNEQA7',
  commentpvt:'data:image/gif;base64,R0lGODlhMwAJANUgAP////8AAHSft3WguGaTrWWSrGSSrHCctGyYsW6as2uYsXKetmaUrWiWr3GctGiVr26asnKdtmmVr26Zs2mWr26ZsnOetnOdtnOet2aTrGaUrHKdt/8BAWmVsP8HB2iWsP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAAzAAkAAAbXQFBgSAyAjseBcslsOp/QgbBYRAqu2Kx2y+1ihx4AoHpcLC7iiFm82AAimAjA8r7I6WyAeaEX6xdDHGNjQ0gHBwAHDokADouIjWKQi5GKkIqJiIcHRGJkIAkJAKETEKMVABMAqKqmoq9+rqMAEK+1nVRICggAu729vAoACMTDw8XCCr7FvckICrifHQ8NYg8PFGINHwAN3gAPABIS2dViEt3j3dXYD1SfBAzy8QT19vf2DAQa+vH99/3kZZiSCwkIAwgNFFDIEGGBhQ8XKowIMaJDhwVABAEAOw==',
	milestonepvt: 'data:image/gif;base64,R0lGODlhNwAJALMAAP%2F%2F%2F2x9TGt8S2l6Smd4SWZ3SGR0RmRzRmFwRF9uQ%2F8HB%2F8BAf8AAP%2F%2F%2FwAAAAAAACH5BAUUAA0ALAAAAAA3AAkAAASTsLFJWbs36M27%2F2AnVRUmnGiqrmzLTgoAlNcwAPat47bM%2BzdZ75fDAQeU2WyCIRBkT8Bz6pRWnVirNnq1OpNL5qVQAJTPZjPZt1af32l0WUZOkjAGAyCv7%2B%2Fzf3x9g397hYaCdjQNBwcAjY6RPo4ylI%2BNl5SYkI%2BTBySLCKKjpKWmp6inI3cYDQmvsLGys7S1sg0RADs%3D',
  todopvt:'data:image/gif;base64,R0lGODlhJgAJALMNAP8AAP///750ALxyAM18AMx7AMh4AMN1AMBzAMZ2AMp6AP8BAf8HB////wAAAAAAACH5BAEAAA0ALAAAAAAmAAkAAARtsIFJQbuX6M2714lUVZhhFGiqrixqTEwQkJeiyIEt2/y96znbZDGbTUqmQHJpYiqVBihFRmskrgGsFpfIdr/g6QhzKAfM6HL6fD60xVWEPCBHyOp1XJ4uH1UFgIGCg4SDImMYDQOLjI2Oj4wNEQA7',
  writeboardpvt:'data:image/gif;base64,R0lGODlhPQAJALMMAP///ye3rP8AACSpnyi6rySoniazqSWupCWtoiayqP8HB/8BAf///wAAAAAAAAAAACH5BAEAAAwALAAAAAA9AAkAAASXkIlJBbuX6M27/2CoSVWFBWiqrmzrvuqkAIB5oUCa03mw0z4gT9cL4oDB4mRRq00wBgNASp1Wo1Yr9cqdZrdWCs3GSCQA5zTPjE6fae+2PI5eu9viEuZwAPT/fn5/g4KEhoKBhoN5ZAiOAAiQkY+TlTyRNI6YlJOSkJeOJWQDpKWmp6ipqqumJHoYDAWys7S1tre4ubIMEQA7',
  filepvt:'data:image/gif;base64,R0lGODlhHQAJALMNAP8AAP///3xLenBEbn1Me25DbHhJdXRGcXpKd3dIdHNGcf8HB/8BAf///wAAAAAAACH5BAEAAA0ALAAAAAAdAAkAAARYsIFJQbuX6M27rBUmjGRpjtMSBOGFIGsAz2/8TgzLTphhBL6f0AcMUlatRiIRYzqXzcQRhDkcAtar1orNTpMKRSAsFq/MYwUoOWi73/D2h4ppFO74vL4RAQA7'
};

/*----- REGULAR EVENTS -----*/
var todo = document.evaluate("//span[@class='todo']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['todo']);
}
var todo = document.evaluate("//span[@class='post']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['message']);
}
var todo = document.evaluate("//span[@class='comment']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['comment']);
}
var todo = document.evaluate("//span[@class='milestone']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['milestone']);
}
var todo = document.evaluate("//span[@class='writeboard']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['writeboard']);
}
var todo = document.evaluate("//span[@class='file']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['file']);
}


/*----- COMPLETE EVENTS -----*/
var todo = document.evaluate("//span[@class='todo completed']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['todo']);
}
var todo = document.evaluate("//span[@class='todo completed private']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['todopvt']);
}
var todo = document.evaluate("//span[@class='milestone completed']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['milestone']);
}
var todo = document.evaluate("//span[@class='milestone completed private']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['milestonepvt']);
}


/*----- PRIVATE EVENTS -----*/
var todo = document.evaluate("//span[@class='todo private']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['todopvt']);
}
var todo = document.evaluate("//span[@class='post private']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['messagepvt']);
}
var todo = document.evaluate("//span[@class='comment private']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['commentpvt']);
}
var todo = document.evaluate("//span[@class='milestone private']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['milestonepvt']);
}
var todo = document.evaluate("//span[@class='writeboard private']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['writeboardpvt']);
}
var todo = document.evaluate("//span[@class='file private']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (todo.snapshotLength)
{
	process_group (todo, 'To-do', icons['filepvt']);
}


function process_group (group, groupClass, groupImage)
{
	for (var i=0 ; i < group.snapshotLength ; i++)
	{
		var thisGroupMember = group.snapshotItem(i);
		var thisGroupMemberTitle = thisGroupMember.title;
		
		if (thisGroupMemberTitle == "")
		{
		thisGroupMemberTitle = thisGroupMember.innerHTML;
		}
		
		var thisGroupMemberNumber = "";
		var thisGroupMemberInnerHTMLElements = thisGroupMember.innerHTML.split(" ");
		if (isNaN(thisGroupMemberInnerHTMLElements[0]) != true)
		{
		thisGroupMemberNumber = thisGroupMemberInnerHTMLElements[0];
		}
		
		var newGroupMember = document.createElement("span");
		newGroupMember.innerHTML = "<span title='"+thisGroupMemberTitle+"'>"+thisGroupMemberNumber+"<img src='"+groupImage+"'/></span>";
		thisGroupMember.parentNode.replaceChild(newGroupMember, thisGroupMember);
	}
}