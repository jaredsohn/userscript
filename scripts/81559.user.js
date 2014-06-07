// ==UserScript==
// @name           Comic-Con Schedule Analyzer
// @author         Charles Eubanks
// @version        0.1
// @namespace      http://www.frameadvance.com
// @description    Show room capacity information on the SCHED Comic-Con site
// @include        http://sched.comic-con.org/*
// ==/UserScript==


////////////////////////////////////////////////////////////////////////////////

// Map of room capacities
// Capacity information.  Sources:
// http://www.sdccc.org/meetingplanners/floorplans.cfm
// http://www.hilton.com/en/hi/hotels/meeting_space.jhtml;jsessionid=EXCSVRNMBOLAYCSGBJC2VCQ?ctyhocn=SANCCHH
// http://www.marriott.com/hotels/event-planning/floor-plans/sandt-san-diego-marriott-hotel-and-marina/
//
// NOTE: Marriott Hall 2 capacity computed using approximate square footage (109x52) and
//          http://www.marriott.com/meetings/tools/people-calc.mi
// assuming stage depth of 20 ft.
var capacity_by_venue = new Array();
capacity_by_venue["Ballroom 20"] = 4908;
capacity_by_venue["Hall H"] = 6700;
capacity_by_venue["Room 3"] = 280;
capacity_by_venue["Room 4"] = 280;
capacity_by_venue["Room 5AB"] = 504;
capacity_by_venue["Room 6A"] = 1040;
capacity_by_venue["Room 6BCF"] = 2160;
capacity_by_venue["Room 6DE"] = 884;
capacity_by_venue["Room 7AB"] = 480;
capacity_by_venue["Room 8"] = 340;
capacity_by_venue["Room 9"] = 280;
capacity_by_venue["Room 12"] = 105;
capacity_by_venue["Room 13"] = 75;
capacity_by_venue["Room 18"] = 105;
capacity_by_venue["Room 24ABC"] = 420;
capacity_by_venue["Room 25ABC"] = 480;
capacity_by_venue["Room 26AB"] = 340;
capacity_by_venue["Room 30CDE"] = 504;
capacity_by_venue["Room 32AB"] = 350;
capacity_by_venue["Sails Pavilion"] = 8700;
capacity_by_venue["Santa Rosa Room; Marriott Hotel and Marina"] = 150;
capacity_by_venue["Marriott Hall 2"] = 291;
capacity_by_venue["Indigo Ballroom, San Diego Hilton Bayfront"] = 2663;

////////////////////////////////////////////////////////////////////////////////

	var snapVenueResults = document.evaluate("//table[@class='eventlist']//a[@title='View events at this venue']", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var snapAttendeesResults = document.evaluate("//table[@class='eventlist']//a[@class='attendeesnum']", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if( snapVenueResults.snapshotLength != snapAttendeesResults.snapshotLength )
		return;

	for (var i = snapVenueResults.snapshotLength - 1; i >= 0; i--)
	{
		var venueElm = snapVenueResults.snapshotItem(i);

		// The capacity for this venue
		var capacity=capacity_by_venue[venueElm.innerHTML];

		if( capacity==undefined )
			continue;

		// Create a new capacity string and insert it
		var elmNewContent = document.createElement('i');
		elmNewContent.appendChild(document.createTextNode('(capacity: '+capacity+')'));
		venueElm.parentNode.appendChild(elmNewContent);

		// The attendees for this event
		var attendeesElm = snapAttendeesResults.snapshotItem(i);
		var attendeesText = attendeesElm.innerHTML;
		var numRegex = /\d+/;
		var attendeesNum = attendeesText.match(numRegex);

		// Compute the percent capacity
		var pct = 100 * attendeesNum / capacity;

		// Create a new attendance percentage string and insert it
		var elmNewAttendancePct = document.createElement('div');
		elmNewAttendancePct.setAttribute("align", "center");
		elmNewAttendancePct.appendChild(document.createTextNode('('+pct.toFixed(0)+'% capacity)'));
		attendeesElm.parentNode.appendChild(elmNewAttendancePct);
	}

////////////////////////////////////////////////////////////////////////////////
