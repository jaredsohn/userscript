// ==UserScript==
// @name          	Original RTM GTD Extension adapted for me
// @namespace	http://www.rememberthemilk.com
// @description    	Creates a GTD-centric view of tasks within Remember The Milk
// @include       	http://www.rememberthemilk.com/*
// @include       	https://www.rememberthemilk.com/*
// ==/UserScript==

/* Remember The Milk GTD extension

 * v1.03 - fixed a small bug with displaying the first next action list (calls)
 *       - added font weight (boldness) configuration settings for most lists.
 * v1.02 - fixed a few bugs that caused the tasks not to display properly (eg next next action lists with no items, and/or without the "@"
 *       - added new configuration settings for inbox, and tickler font size when they have items in them - ie you can make it really obvious when you have items
 *	   in these buckets that need attention before anything else if you want - I've set them pretty large, but you can tweak to your taste.
 *
 * 
 * v1.01 - fixed an issue with the Next Actions Header showing up as "Other Buckets."
 *
 * v1.0
 * 
 * Created by Levi Wallach but based largely on the script "A Bit Better RTM" by Andrew Paprotsky
 *
 * This script is based on an implementation of David Allen's Getting Things Done (GTD).  If you are unfamiliar with its workings
 * you should read up on it on the web or by the book.  What follows will only make sense to those with some familiarity with   
 * GTD concepts.
 * 
 * There are many ways to implement a GTD system within Remember The Milk.  I've implemented it in a way I believe works well 
 * and this script is based on that method.  If your own implementation works very differently this script probably won't be applicable, but if 
 * the only real differences for you are some list names, then the script is easy to modify and future versions may even let you set the 
 * names for the different "bucket" lists.
 *
 * Ok, so here's how to implement this GTD system:
 *
 * Lists:
 *
 * Hardscaped (non-smartlist) Lists:  Other than the already existant Inbox, the other hardscape list is "Lone Action" for non-project-related tasks.
 * there is also a variable number of hardcaped lists for different projects you might have.  For the list name, I prefix it with "p." for programmatic
 * reasons.  So "p.Annual Report" etc.  This will be displayed without the prefix within the app.
 *
 * Smartlists: 
 * "!Misstagged" : "(not(list:inbox) and not(tag:project) and not(tag:tickler) and not(tag:calendar) and not(tag:wait) and not(tag:project) and not(tag:nextaction) and not(tag:someday)) or (not(list:inbox) and not(tag:project) and not(tag:someday) and not(tag:wait) and not(timeEstimate:"> 0")) or (not(list:inbox) and not(tag:project) and not(tag:someday) and not(tag:wait) and not(tagContains:"@@")) or ((tag:tickler or tag:calendar) and due:never) or (not(tag:tickler or tag:calendar) and not(due:never)) or (tag:nextaction and not(tag:@call or tag:@web or tag:@errand or tag:@home or tag:@work))"
 * Comment: the misstagged smartlist is a list that becomes visible in a noticeable way (red with white letters) when a task is not tagged and have other fields filled in appropriately.  Please see below for how these tags need to be filled in.
 *  "*Calendar" : "not(due:never) and tag:calendar"
 * Comment: this is for the calendar bucket in GTD, but it's a bucket that I haven't found a good use for yet mainly because much of what I might put in here (meetings, events, etc., I normally put in Google Calendar anyway.
 * "*SomeDay-Maybe" : "tag:someday"
 * "*Tickler" : "(tag:tickler)  and (dueBefore:now)"
 * "Waiting For" : "tag:wait"
 * "@Calls" : "tag:@call and tag:nextaction"
 * "@Home" : "tag:@home and tag:nextaction"
 * "@Web" : "tag:@web and tag:nextaction"
 * "@Work" : "tag:@work and tag:nextaction"
 * "@Errands" : "tag:@errand and tag:nextaction"
 *
 * Adding Tasks:
 * The workflow I've created is that if I don't have the time to enter all the info about a task, but just want to do a quick brain dump, I add the task into 
 *  the Inbox list.  When doing this, the Inbox display becomes larger to call attention to itself, since generally you want to try to keep your inbox empty.
 *
 *  If you want to enter all the info about a task that's already in your Inbox (or you are entering it for the first time and have the time to add all the info, you 
 *  first need to add it to one of the hardscaped lists.  If it is part of a project, add it to that project's list.  If it doesn't have to do with a project, add it to your
 *  Lone Actions list.  
 * 
 * Next, you need to specify a "bucket" to put the task into.  You do this by tagging it with one (and only one) of the following: nextaction, tickler, calendar, wait, or someday.
 * if you are putting it into the calendar or tickler bucket, you need to add a due date, however, that due date will mean different things for each.  For the Calendar, the 
 * due date is when the event, etc. happens, and the item will always show up in your calendar list.  For Tickler's, the due date really takes on the meaning of "show date" - ie
 * the task will not even be visible in the list until the date that you specify in the due date field.
 * For the next action bucket, there are two additional pieces of information that needs to be filled in.  One is a time estimate, and the other is "energy level."
 * Both of these are part of what David Allen specifies as ways that can help you determine what your next action next action will be.  Time estimate has a normal field in RTM
 * but energy level doesn't so what I do is specify it with a tag.  The tags I use for energy level (that is the mental and/or physical energy level necessary for completing the task)
 * are @@high, @@medium, and @@low.
 *
 * I think this basically lays out how the implementation works, but if there's something that's not clear, please post any questions you have at the script's page on userscripts.org 
 * and I'll try to answer them and add to this description.
 *
 * Here are some basic settings for fonts and background colors.  Eventually I will try to increase the number of these to add more flexibility:
 */
varMisstaggedBackgroundColor = "red";  			// Background color for Misstagged list
varProjectsSectionBackgoundColor = "#DFDFDF";		// Backgound color for Project list section
varOtherBucketsSectionBackgroundColor = "#B1E5FB";	// Backgound color for 'Other Buckets' list section
varNextActionsSectionBackgroundColor = "#EEE67B";	// Background color for Next Actions list section
varEmptyInboxFontSize ="14px";				// font size of Inbox list item when it  doesn't contain any tasks
varEmptyInboxFontWeight= "normal";			// font "weight" (ie boldness) of Inbox list item when it  doesn't contain any tasks - possible values are "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"
varNonEmptyInboxFontSize = "30px";			// font size of Inbox list item when it has some tasks in it - by default doubled in size to call attention to itself
varNonEmptyInboxFontWeight= "bold";			// font "weight" (ie boldness) of Inbox list item when it has some tasks in it - - possible values are "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"
varMisstaggedFontSize = "16px";				// font size of Misstagged list
varMisstaggedFontWeight= "bold";			// font "weight" (ie boldness) of Misstagged list - possible values are "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"
varLoneActionsFontSize = "8px";				// font size of Lone Actions list - made small by default since this generally won't be a list that you look at often or at all.
varLoneActionsFontWeight= "normal";			// font "weight" (ie boldness) of Lone Actions list - - possible values are "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"
varNonEmptySentFontSize = "8px";			// font size of Sent list that has some items in it (empty sent list doesn't display at all) - by default this font is small because (at least for me) this list is almost never used 
varNonEmptySentFontWeight= "normal";			// font "weight" (ie boldness) of Sent list that has some items in it (empty sent list doesn't display at all) - - possible values are "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"
varEmptyProjectListFontSize = "16px";			// font size for a project list item that has no tasks in it - this is a way to call attention to project lists that have nothing in them.
varEmptyProjectListFontWeight= "bold";			// font "weight" (ie boldness) for a project list item that has no tasks in it - - possible values are "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"
varOtherBucketsFontSize = "14px";			// font size for list items within the "Other Buckets" section (aside from the section header & tickler).
varOtherBucketsFontWeight= "normal";			// font "weight" (ie boldness) for list items within the "Other Buckets" section (aside from the section header & tickler) - possible values are "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"
varNextActionFontSize = "14px";				// font size for list items within the "Next Actions" section (aside from the section header).
varNextActionFontWeight = "normal";			// font "weight" (ie boldness) for list items within the "Next Actions" section (aside from the section header).- possible values are "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"
varTicklerFontSize = "14px";				// font size for Tickler File link - make larger to make a more obvious "alert"
varTicklerFontWeight = "bold";				// font "weight" (ie boldness) for Tickler File link - possible values are "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"

// one final note:  I've changed some of the attributes in the createleftcolumn function below in order to make this compatible with a wider formatting of RTM.  If this makes your page too wide, you might need to play a little with these settings.
 




var createLeftColumn = function()
{
	var leftColumn = document.createElement('div');
	var appView = document.getElementById("appview");
	var listBox = document.getElementById("listbox");

	leftColumn.setAttribute('id','leftColumn');
	leftColumn.style.cssFloat = "left";
	leftColumn.style.width = "200px";
	leftColumn.style.paddingLeft = "5px";
	leftColumn.style.paddingRight = "8px";
	leftColumn.style.display = "none";

	if (appView && listBox)
		appView.insertBefore(leftColumn, listBox);
}

var createListTabsContainer = function()
{
	var listTabsBox = document.createElement('div');	
	var leftColumn = document.getElementById("leftColumn");

	if (leftColumn)
	{
		listTabsBox.innerHTML = ' <div class="white_rbroundbox"> <div class="white_rbtop"> <div> <div></div> </div> </div> <div class="white_rbcontentwrap"> <div class="white_rbcontent"> <div class="taskcloudcontent" style="padding: 0px 5px 0px 5px;" id="listtabscontainer"> </div> </div> </div> <div class="white_rbbot"> <div><div></div> </div> </div> </div> ';

		leftColumn.appendChild(listTabsBox);
	}
}

var moveListTabs = function()
{
	var listTabs = document.getElementById("listtabs");
	if (listTabs)
	{
		listTabs.className = "";
		listTabs.style.width = "100%";

		var listTabsContainer = document.getElementById("listtabscontainer");

		if (listTabsContainer)
			listTabsContainer.appendChild(listTabs);
	}
}

var hideLeftColumn = function()
{
	var leftColumn = document.getElementById("leftColumn");

	if (leftColumn)
		leftColumn.style.display = "none";
}

var showLeftColumn = function()
{
	var leftColumn = document.getElementById("leftColumn");

	if (leftColumn)
		leftColumn.style.display = "block";
}

var moveTabsToTheLeft = function()
{
    var K = function(d, e) 
	{
		var content = document.getElementById("content");

		if (content)
		{
			if (e[0][1] == "Tasks")
			{
				content.style.width = "1190px";
				hideLeftColumn();
			}
			else if (e[1][1] == "Tasks")
			{
				content.style.width = "1400px";
				showLeftColumn();
			}
		}
    }

	if (window.wrappedJSObject.messageBus)
		window.wrappedJSObject.messageBus.subscribe(K, window.wrappedJSObject.view.getUniqueMessageBusName() + "viewChanged");

	var content = document.getElementById("content");
	var listBox = document.getElementById("listbox");
	var tools_spacer = document.getElementById("tools_spacer");
	var sorting = document.getElementById("sorting");
	var tools = document.getElementById("tools");


	createLeftColumn();
	createListTabsContainer();
	moveListTabs();

	if (tools_spacer)
	{
		tools_spacer.style.paddingTop = "1px";
		tools_spacer.style.borderTop = "1px solid #CACACA";
	}

	if (sorting)
		sorting.style.marginTop = "0px";

	if (tools)
		tools.style.paddingTop = "5px";

	if (content && window.wrappedJSObject.view)
	{
		if (window.wrappedJSObject.view.getSelected() == "Tasks")
		{
			content.style.width = "1400px";
			showLeftColumn();
		}
		else
		{
			content.style.width = "1400px";
			hideLeftColumn();
		}
	}
}

var handleKeyPressEvent = function(ev, ignoreCombo)
{
    ev || (ev = window.event);

	if (ev == null)
		return;

    var target = null;
	
	if (window.wrappedJSObject.utility)
		target = window.wrappedJSObject.utility.getEventTarget(ev);

    if (target == null) 
        return true

    var pressed = (ev.charCode) ? ev.charCode: ((ev.which) ? ev.which: ev.keyCode);

    if (target != null && target.type != null && (target.type == "textarea" || target.type == "input" || target.type.indexOf("select") == 0 || target.type == "button" || target.type === "submit" || target.type == "text" || target.type == "password" || (target.id != null && target.id == "map"))) 
        return true

	var tabs = null;

	if (window.wrappedJSObject.view)
		tabs = window.wrappedJSObject.view.getViewTabs();

	if (tabs)
	{
		switch (pressed) 
		{
			case 74:
				if (ev.shiftKey) 
				{
					tabs.selectRight();
					if (window.wrappedJSObject.utility)
						window.wrappedJSObject.utility.stopEvent(ev);

					return false
				}
				break;
			case 75:
				if (ev.shiftKey) 
				{
					tabs.selectLeft();
					if (window.wrappedJSObject.utility)
						window.wrappedJSObject.utility.stopEvent(ev);

					return false
				}
				break;
		}
	}

	return true;
}

var overrideBodyKeyPressHandler = function()
{
	if (window.wrappedJSObject.eventMgr)
	{
		var oldBodyKeyPressHandler = window.wrappedJSObject.eventMgr.bodyKeyPressHandler;

		window.wrappedJSObject.eventMgr.bodyKeyPressHandler = function(ev, ignoreCombo)
		{
			if (handleKeyPressEvent(ev, ignoreCombo))
				return oldBodyKeyPressHandler.call(window.wrappedJSObject.eventMgr, ev, ignoreCombo);

			return true;
		}	
	}
}

var overrideListTabsBlitDiv = function()
{
	if (window.wrappedJSObject.listTabs)
	{
		var oldBlitDiv = window.wrappedJSObject.listTabs.blitDiv;

		window.wrappedJSObject.listTabs.blitDiv = function()
		{
			oldBlitDiv.call(window.wrappedJSObject.listTabs);
			refreshListTabsStyles();
			showTasksCount();
		}	

		window.wrappedJSObject.listTabs.blitDiv();
	}
}

var refreshListTabsStyles = function()
{
	var divListTabs = document.getElementById("listtabs");

	if (divListTabs)
	{
		divListTabs.firstChild.style.listStyle = "none";
		divListTabs.firstChild.style.padding = "0px 5px 0px 5px";
		divListTabs.firstChild.style.whiteSpace = "nowrap";
	}
}

/***********************************************************************************************
/ This is the main section that deals with the display of the lists on the left column 
 * 
 * ************************************************************************************************
*/
 var showTasksCount = function()
{
	if (window.wrappedJSObject.listTabs)
	{
		var listItems = window.wrappedJSObject.listTabs.div.getElementsByTagName("li");
		var firstNA = 0;
		var firstProj = 0;
		var firstOtherBucket = 0;

		for (var i = 0; window.wrappedJSObject.listTabs.data && window.wrappedJSObject.listTabs.data[i]; ++i)
		{
			var tasksCount = 0;

			if (window.wrappedJSObject.listTabs.data[i][2])
			{
				var filter = window.wrappedJSObject.listTabs.data[i][2];

				if (filter && filter.indexOf("status:") < 0)
					filter = "(" + filter + ") and (status:incomplete)";


				if (window.wrappedJSObject.overviewList && filter)
					tasksCount = window.wrappedJSObject.overviewList.getFilteredList(filter).length
			}
			else
			{
				if (window.wrappedJSObject.format)
					tasksCount = window.wrappedJSObject.format.getListStatistics(window.wrappedJSObject.listTabs.data[i][1])[5];

				listItems[i].firstChild.style.color = "black";
                                                       }

			if (listItems[i].firstChild.innerHTML == "Inbox")
                    		 {
				if (tasksCount > 0)
				{
					listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML + " (" + tasksCount + ")";
					listItems[i].style.fontSize = varNonEmptyInboxFontSize;
					listItems[i].style.fontWeight = varNonEmptyInboxFontWeight;
				}
				else
				{
					listItems[i].style.fontSize = varEmptyInboxFontSize;
					listItems[i].style.fontWeight = varEmptyInboxFontWeight;
				}
                    		 }
			else if (listItems[i].firstChild.innerHTML == "!Misstagged")
                 			{
				listItems[i].style.backgroundColor = varMisstaggedBackgroundColor ; 
				if (tasksCount > 0)
				{
					listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML.replace( "!", '<span>&nbsp;</span>');
					listItems[i].firstChild.innerHTML = '<font color=white>' + listItems[i].firstChild.innerHTML + " (" + tasksCount + ")" + '</font>';
					listItems[i].style.fontSize = varMisstaggedFontSize;
				}
				else
				{
					listItems[i].style.display = "none"; 
				}
                     		}
			else if (listItems[i].firstChild.innerHTML == "Lone Actions")
		                  {
				listItems[i].style.fontSize = varLoneActionsFontSize;
				listItems[i].style.fontWeight = varLoneActionsFontWeight;
		                  }
			else if (listItems[i].firstChild.innerHTML == "Sent")
		                  {
				if (tasksCount > 0)
				{
					listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML + " (" + tasksCount + ")";
					listItems[i].style.fontSize = varNonEmptySentFontSize;
					listItems[i].style.fontWeight = varNonEmptySentFontWeight;
				}
				else
				{
					listItems[i].style.display = "none"; 
				}
                  		}
			else if (listItems[i].firstChild.innerHTML.indexOf("p.") == 0)
                  		{
				if (firstProj == 0)
				{
					listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML.replace( "p.", "<span  style=\"font-size:40px;\">&nbsp;</span><span style=\"font-size:20px;font-weight:bold;color:black;\">Projects:<br>&nbsp;&nbsp;&nbsp;</span>");
				}
				else
				{
					listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML.replace( "p.", '<span  style=\"font-size:12px;font-weight:bold;color:black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>');
				}
  				listItems[i].style.backgroundColor = varProjectsSectionBackgoundColor ; 
				
				if (tasksCount >= 1)
				{
					listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML + " (" + tasksCount + ")";
					
				}
				else
				{
					listItems[i].style.fontSize=varEmptyProjectListFontSize;
					listItems[i].style.fontWeight = varEmptyProjectListFontWeight;
				}
				firstProj +=1;
			}
			else if (listItems[i].firstChild.innerHTML.indexOf("*") == 0)
			{
				listItems[i].style.backgroundColor = varOtherBucketsSectionBackgroundColor ; 
				if (tasksCount > 0)
				{
					if (firstOtherBucket == 0)
					{
						listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML.replace( "*", "<span style=\"font-size:20px;font-weight:bold;color:black;\">&nbsp;Other Buckets:<br>&nbsp;&nbsp;&nbsp;</span>");
					}
					else
					{
						listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML.replace( "*", "<span  style=\"font-size:12px;font-weight:bold;color:black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
					}
			 		
			 		
					
				 	listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML + " (" + tasksCount + ")";
					listItems[i].style.fontSize = varOtherBucketsFontSize;
					listItems[i].style.fontWeight = varOtherBucketsFontWeight;

					if (listItems[i].firstChild.innerHTML.indexOf("Tickler") != -1)
					{
						listItems[i].style.fontSize = varTicklerFontSize; 
						listItems[i].style.fontWeight = varTicklerFontWeight;
					}
					else
					{
						listItems[i].style.fontSize = varOtherBucketsFontSize;
						listItems[i].style.fontWeight = varOtherBucketsFontWeight;
					}

				}
				else
				{
					if (firstOtherBucket == 0)
					{
						listItems[i].firstChild.innerHTML = "<span style=\"font-size:20px;font-weight:bold;color:black;\">&nbsp;Other Buckets:&nbsp;&nbsp;&nbsp;</span>";
						listItems[i].style.fontSize = varOtherBucketsFontSize;
						listItems[i].style.fontWeight = varOtherBucketsFontWeight;
					}
					else
					{
					listItems[i].style.display = "none"; 	
					}
				}
				firstOtherBucket +=1;
		        }
			else if (listItems[i].firstChild.innerHTML.indexOf("@") == 0)
                        {
		        	listItems[i].style.backgroundColor = varNextActionsSectionBackgroundColor;
		        	
		        	if (firstNA == 0)
				{
					if (tasksCount > 0)
					{
						listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML.replace( "@", "<span style=\"font-size:20px;font-weight:bold;color:black;\">&nbsp;Next Actions:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>@");
						listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML + " (" + tasksCount + ")";
						listItems[i].style.fontSize = varNextActionFontSize;
						listItems[i].style.fontWeight = varNextActionFontWeight;
					}
					
					else
					{
						listItems[i].firstChild.innerHTML = "<span  style=\"font-size:40px;\">&nbsp;</span><span style=\"font-size:20px;font-weight:bold;color:black;\">Next Actions:<br></span>";
					
					}
				}
				else
				{
					if (tasksCount > 0)
					{
						listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML.replace( "@", "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@</span>");
					 	listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML + " (" + tasksCount + ")";
						listItems[i].style.fontSize = varNextActionFontSize;
						listItems[i].style.fontWeight = varNextActionFontWeight;
					}
					else
					{
						listItems[i].style.display = "none"; 
					}
				}
				
				
				firstNA += 1;
		        }
			else if (tasksCount > 0)
			{
			                  listItems[i].style.fontSize="16px";
				listItems[i].firstChild.innerHTML = listItems[i].firstChild.innerHTML + " (" + tasksCount + ")";
		                   }
		                   else 
		                   {
		                  	 //  listItems[i].style.textAlign = "right";
			                        listItems[i].style.textDecoration = "line-through";
		  		      listItems[i].style.fontSize = "9px";
			                   //   listItems[i].style.cssFloat = "right";
		                   	//  listItems[i].style.display = "none"; 
		                   }
		}
	}
}

var subscribeToFilterEditFinished = function()
{
	if (window.wrappedJSObject.messageBus)
		window.wrappedJSObject.messageBus.subscribe(window.wrappedJSObject.listTabs.blitDiv, window.wrappedJSObject.listList.mbn + "setFilterSuccess");
}


var overrideTaskCloudUpdate = function()
{
	if (window.wrappedJSObject.taskCloud)
	{
		var oldTaskCloudUpdate = window.wrappedJSObject.taskCloud.update;

		window.wrappedJSObject.taskCloud.update = function()
		{
			oldTaskCloudUpdate.call(window.wrappedJSObject.taskCloud);
			
			if (window.wrappedJSObject.listTabs)
				window.wrappedJSObject.listTabs.blitDiv();
		}	
	}
}

window.addEventListener('load', moveTabsToTheLeft, false);
window.addEventListener('load', overrideBodyKeyPressHandler, false);
window.addEventListener('load', overrideListTabsBlitDiv, false);
window.addEventListener('load', overrideTaskCloudUpdate, false);
window.addEventListener('load', subscribeToFilterEditFinished, false);


