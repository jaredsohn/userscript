// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Sensible Mafia Voting", and click Uninstall.
//
// ==UserScript==
// @name	Sensible Mafia Voting 1.07
// @namespace	http://sensibleerection.com/profile.php/28323
// @description	Scans Sensible Erection Mafia Game posts, and displays a tally of each player's most recent votes in the Voting Thread.  Voting Thread must be defined with the text <b>Voting Thread</b> (including bold tags).  All votes in the Voting Thread need to be bolded, and spelled exactly the same.  Bolded comments in the voting thread need to be avoided.
// @include	http://sensibleerection.com/entry.php/*
// @include	http://*.sensibleerection.com/entry.php/*
// ==/UserScript==


// REPLACE WITH REGEXP !!!!!!!!!!
var url = document.location.href;
var postnumber = url.substring(url.length-5,url.length);

var options = [];
const option_collapse_totals = 0;
const option_collapse_history = 1;
const option_collapse_options = 2;
const option_collapse_manual = 3;
const option_highlight_target = 4;
const option_strikethru = 5;
const option_cancelvotes = 6;
const option_warnoncancelvote = 7;
const option_show_html = 9;
const option_dateorder = 10;
const option_count = 12;
const option_hideoptions = 13;
const option_hidechange = 14;
const option_hidecommentcount = 15;
const option_showvotefixes = 16;
const option_showteams = 17;


options[option_collapse_totals] = false;
options[option_collapse_history] = true;
options[option_collapse_options] = true;
options[option_collapse_manual] = true;
options[option_show_html] = false;
options[option_highlight_target ] = true;
options[option_strikethru ] = true;
options[option_cancelvotes ] = false;
options[option_warnoncancelvote ] = true;
options[option_dateorder ] = false;
options[option_hideoptions  ] = true;
options[option_hidechange ] = true;
options[option_hidecommentcount ] = false;
options[option_showvotefixes] = true;
options[option_showteams] = true;


var arrayTotals = [];
var FullPosterList = [];
var sections = [];
var arrayList_sorted = [];
var arrayAllPosters = [];

function compare_posters(a,b) {
	
	return(a.toLowerCase().replace(/_/g,"") == b.toLowerCase().replace(/_/g,"") );
}

function sortListByDate(a,b)
{
return a[0] - b[0];
}



function bubbleSortCommentObjects(o) {

	var list = [];

	for (key in o)
		list[list.length] = key;

	list = nested_bubbleSortCommentObjects(o, list, 0 , list.length - 1);

	return(list);
}

function nested_bubbleSortCommentObjects(o,inputArray, start, rest) {
	for (var i = rest - 1; i >= start;  i--) {
		for (var j = start; j <= i; j++) {
			if (o[inputArray[j+1]].commentcount < o[inputArray[j]].commentcount) {
				var tempValue = inputArray[j];
				inputArray[j] = inputArray[j+1];
				inputArray[j+1] = tempValue;
      			}
   		}
	}
	return inputArray;
}




function getcorrectname(a) {
	for(var i = 0 ; i < LivePlayerList.length ; i++)
		if ( compare_posters(a,LivePlayerList[i]) ) {
			return(LivePlayerList[i])
		}
	return(a)
}

function sortTotalsbyTotal(a,b)
{
	return b[1].length - a[1].length;
}

function sortCommentsByDate(a,b) {
	return(b[1] - a[1]);
}
	
function getCommentDate(AttributeDetails) {
	var str = AttributeDetails.nodeValue.replace(/GMT on/g,"on").split(/\s/g);
	var hr = parseInt(str[4].substring(0,str[4].length-5),10);
	var min = parseInt(str[4].substring(str[4].length-4,str[4].length-2),10);
	var hr12 = str[4].substring(str[4].length-2,str[4].length);

	if (hr==12 && hr12 == "am")
		hr = 0;
	if (hr12 == "pm" && hr != 12)
		hr += 12;

	return(new Date(str[7]+" "+str[6].substring(0,str[6].length - 2)+", "+new Date().getFullYear()+" "+hr+":"+min));
}

function concat_collection(obj1, obj2) {
	var i;
	var arr = new Array();
	var len1 = obj1.length;
	var len2 = obj2.length;
	for (i=0; i<len1; i++) {
		arr.push(obj1[i]);
	}
	for (i=0; i<len2; i++) {
		arr.push(obj2[i]);
	}
	return arr;
}


// Some processing needs to be done after the page has rendered.  This is necessary to work-around certain changes that 
// Sensible Facial makes to a page.
function post_render_processing() {


	// Create Event Listeners for the sections
	for(var i = 0 ; i < sections.length ; i++) {
		var button = document.getElementById("VOTINGPLUSMINUS"+i);
		if (button != null) {
			button.addEventListener('click', function(event) {
				i = event.target.id;
				var section = document.getElementById("VOTINGSECTIONID_"+i);
				if (section == null) {
					window.addEventListener('load', function() { post_render_processing() }, true);
					return;
				}
				trig=section.style.display;
				if (trig=="block" || trig=="") { 
					trig="none";
					event.target.innerHTML = "+"
				}
				else {
					trig="block";
					event.target.innerHTML = "-"
				}		
				section.style.display = trig;
			
			},false);
			button.id = i;
		}
	}


}


function everything() {

var firstSpan;
firstSpan= document.evaluate(
    "//span[@class='entry_details_text']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

if (firstSpan.snapshotItem(0).firstChild.nextSibling.innerHTML != "mafia game") {
	return;
}
var GM = firstSpan.snapshotItem(0).firstChild.nextSibling.nextSibling.nextSibling.innerHTML;

var allDivs, thisDiv , commentDiv;



allDivs = document.evaluate(
    "//div[@class='date_header_text']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
commentDiv = null;



if (allDivs.snapshotItem(1).innerHTML == "Comments") {
	commentDiv = allDivs.snapshotItem(1);
}
else
{
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		if (thisDiv.innerHTML == "Comments")
			commentDiv = thisDiv; 
	}
}

if (commentDiv == null) {
	alert("Please ensure that 'Sensible Mafia Voting' runs before 'Sensible Facial'.  Choose 'Manage User Scripts' and drag 'Sensible Mafia Voting' above 'Sensible Facial'.  If you still see this message, please contact cb361.");
	return;
}


mainpostDiv = document.evaluate(
    "//div[@class='text_12px']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var PosterCommentCount = [];
var LivePlayers = mainpostDiv.snapshotItem(0).getElementsByTagName('strong')
var lp_count = 0;
var teams = [];
for (var i = 0 ; i < LivePlayers.length ; i++ ) {
	lp = LivePlayers[i].innerHTML;

	if (lp.length > 6 && lp.substring(0,5) == "TEAM=") {

		var team = [];
		team[0] = "?"; // team name
		team[1] = "?"; // team colour
		team[2] = "?"; // team logo
		team[3] = "?"; // team members

		alp = lp.split(";");
		for (var i2 = 0 ; i2 < alp .length ; i2++ ) {
			var t = -1;
			a = alp[i2].split("=");
			if (a[0].toUpperCase() == "TEAM") t = 0;
			if (a[0].toUpperCase() == "COLOR") t = 1;
			if (a[0].toUpperCase() == "LOGO") t = 2;
			if (a[0].toUpperCase() == "MEMBERS") t = 3;
				
			if (t > -1)
				team[t] = a[1].replace(/<br>/g,"").replace(/<BR>/g,"").replace(/\n/g,"").replace(/\r/g,"");

		}
		teams[teams.length]=team;
	}	
	else {
		LivePlayerList[lp_count] = lp.replace(/^\s+|\s+$/g,"");
		lp_count++;
	}

}



// Style information taken from Sensible Facial, for visual consistency
	var st = document.createElement('style');
	// favorite colors: #f3f0e8 #e7e4dd #f3f3df #e3e3cf
	st.innerHTML = ['.plusminus { background-color: #fff; border: 1px solid black; '
	,'float: left; margin-right: 5px; line-height: 8px; font-family: "Courier New","Courier",serif;}'
	,'.plusminus td { text-align: center; vertical-align: 50%; text-size: 8px; cursor: pointer; }'
	,'.infin { text-decoration: none; font-size: 14px; margin: -4px 0; }'].join('\n');
	document.body.appendChild(st);


var tablePointer = commentDiv.nextSibling.nextSibling.nextSibling.nextSibling;
var currentRootComment
var votingComment = null;
var votingCommentSpan , CommentSpan;


// Identify most likely voting thread
var max = 0;
while (tablePointer.tagName == "TABLE") {

	bolded_subcomments = 0;

	sub_tablePointer = tablePointer.nextSibling.nextSibling;

	while (sub_tablePointer.tagName == "TABLE" && sub_tablePointer.firstChild.nextSibling.firstChild.firstChild.nextSibling.firstChild.width != "0") {

		var allBoldareas = sub_tablePointer.getElementsByTagName('b');
		if (allBoldareas.length == 1)
			bolded_subcomments++;
		sub_tablePointer = sub_tablePointer.nextSibling.nextSibling;

	}

	if (sub_tablePointer.tagName == "TABLE") {
		if (bolded_subcomments > max) {
			votingComment = tablePointer;
			cell1 = tablePointer.getElementsByTagName("td")[1];
			votingCommentSpan = cell1.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
			max = bolded_subcomments
		}	
	}
	
	tablePointer = sub_tablePointer;
}




var tablePointer = commentDiv.nextSibling.nextSibling.nextSibling.nextSibling;

var GMthreadCount = 0;
while (tablePointer.tagName == "TABLE") {
	var cell1 = tablePointer.getElementsByTagName("td")[1];
	var AttributesSpan = cell1.getElementsByTagName('span')[0];
	var CommentNumber = AttributesSpan.getElementsByTagName('a')[1].href;
	CommentNumber = CommentNumber.substring(CommentNumber.length - 6 , CommentNumber.length)
	var Poster = AttributesSpan.getElementsByTagName('a')[0].innerHTML;
	var PosterNumber = parseInt(AttributesSpan.getElementsByTagName('a')[0].href.replace(/(.*)profile.php\//g,""),10);


	CommentSpan = cell1.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;



	tablePointer = tablePointer.nextSibling.nextSibling;
	CommentSpan = null;

	// Collect data for comment count and vote fix identification
	if ( undefined == PosterCommentCount[PosterNumber] ) {
		PosterCommentCount[PosterNumber] = Object();
		PosterCommentCount[PosterNumber].commentcount = 0;
		PosterCommentCount[PosterNumber].poster = Poster;
		PosterCommentCount[PosterNumber].election = []
	}
	PosterCommentCount[PosterNumber].commentcount++;
	if (PosterCommentCount[PosterNumber].poster != Poster) {
		
		if ( PosterCommentCount[PosterNumber].poster != "(unknown)" )
			PosterCommentCount[PosterNumber].election[PosterCommentCount[PosterNumber].poster] = PosterCommentCount[PosterNumber].commentcount;

		if ( isNaN (PosterCommentCount[PosterNumber].election[Poster]) )
			PosterCommentCount[PosterNumber].election[Poster] = 0;
		PosterCommentCount[PosterNumber].poster = "(unknown)";
		PosterCommentCount[PosterNumber].election[Poster]++;
	}
}


// Sort out people putting in the wrong username via an election
for (key in PosterCommentCount) {
	if (PosterCommentCount[key].poster == "(unknown)" ) {
		var iMax = 0;
		var sCandidate = "who knows?";
		for (key2 in PosterCommentCount[key].election) {
			//alert(key+" : "+key2 + " - "+PosterCommentCount[key].election[key2]+" votes");
			if (PosterCommentCount[key].election[key2] == iMax)
				sCandidate = sCandidate +" or "+key2;
			if (PosterCommentCount[key].election[key2] > iMax) {
				sCandidate = key2;
				iMax = PosterCommentCount[key].election[key2];
			}

		}
		PosterCommentCount[key].poster = sCandidate;
	}
}


if (votingComment == null) {

	window.addEventListener('load', function() { post_render_processing() }, true);
	return;
}


var arrayList = [];
var arrayPoster = [];
var arrayRecentDate = [];
var arrayTarget = [];
var iListCount = 0;

for(var i = 0 ; i < LivePlayerList.length ; i++) {
	arrayAllPosters[arrayAllPosters.length] = LivePlayerList[i];
}

// Pass through the comments to identify people commenting under other people's names
if (options[option_showvotefixes]) {
	tablePointer = commentDiv.nextSibling.nextSibling.nextSibling.nextSibling;
	while (tablePointer.tagName == "TABLE") {
		var cell1 = tablePointer.getElementsByTagName("td")[1];
		var AttributesSpan = cell1.getElementsByTagName('span')[0];
		var Poster = AttributesSpan.getElementsByTagName('a')[0].innerHTML;
		var PosterNumber = parseInt(AttributesSpan.getElementsByTagName('a')[0].href.replace(/(.*)profile.php\//g,""),10);

		if (Poster != PosterCommentCount[PosterNumber].poster) {
			AttributesSpan.getElementsByTagName('a')[0].innerHTML = Poster +" <i>(really "+PosterCommentCount[PosterNumber].poster+")</i>";
		}
		tablePointer = tablePointer.nextSibling.nextSibling;
	}
}

// Pass through the voting thread
tablePointer = votingComment .nextSibling.nextSibling;
while(tablePointer.tagName == "TABLE" && (tablePointer.getElementsByTagName("td")[0].firstChild.width > 0) ) {
	var cell1 = tablePointer.getElementsByTagName("td")[1];
	var CommentSpan = cell1.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
	var AttributesSpan = cell1.getElementsByTagName('span')[0];
	var Poster = AttributesSpan.getElementsByTagName('a')[0].innerHTML;
	Poster = Poster.replace(/ <(i|I)>\(really(.*)/g,"");
	var PosterCosmetic = AttributesSpan.getElementsByTagName('a')[0].innerHTML;
	var CommentNumber = AttributesSpan.getElementsByTagName('a')[1].href;
	CommentNumber = CommentNumber.substring(CommentNumber.length - 6 , CommentNumber.length)

	var CommentObjects = concat_collection(CommentSpan.getElementsByTagName('strong'),CommentSpan.getElementsByTagName('b'));


	var bFound = false;
	for(var i = 0 ; i < arrayAllPosters.length ; i++) 
		if ( arrayAllPosters[i] == Poster ) {
			bFound = true;
			break;
		}

	if (!bFound && Poster != GM) 
		arrayAllPosters[arrayAllPosters.length] = Poster;
		
	if ( CommentObjects.length > 0 && Poster != GM ) {
		for (var ii = 0; ii < (CommentObjects.length); ii++) {
		   if (CommentObjects[ii].childNodes.length == 1) {
		   	var Target = CommentObjects[ii].innerHTML.replace(/^\s+|\s+$/g,"");
						
			if (compare_posters(Target,"face"))  Target = "-_-";
			if (Target.toLowerCase().indexOf("-_-") > -1) Target = "-_-";
				
			var AttributeDetails = AttributesSpan.firstChild.nextSibling.nextSibling;


			var CommentDate = getCommentDate(AttributeDetails);


			// My attempts to use hashtables or associative arrays didn't work like the examples, so we'll do this the old fashioned way.		
			var iPosition = -1;
			for (var ip = 0; ip < arrayPoster.length; ip++) {
				if (arrayPoster[ip] == Poster)
					iPosition = ip;
			}
				
			arrayList[iListCount] = [];
			arrayList[iListCount][0] = CommentDate;
			arrayList[iListCount][1] = Poster;
			arrayList[iListCount][2] = Target;
			arrayList[iListCount][3] = CommentObjects[ii];
			arrayList[iListCount][4] = CommentNumber;
			arrayList[iListCount][5] = false
			arrayList[iListCount][6] = PosterCosmetic
			iListCount++;

			if (iPosition == -1  ||  arrayRecentDate [iPosition] <= CommentDate ) {
				if (iPosition == -1) {
					iPosition = arrayPoster.length;
					arrayPoster[iPosition] = Poster;
				}
				arrayRecentDate[iPosition] = CommentDate;
				arrayTarget[iPosition] = Target;
			}
		   }
		}			
	}
	tablePointer = tablePointer.nextSibling.nextSibling;
}


var arrayTargetList = [];
for (var i = 0 ; i < arrayTarget.length ; i++) {
	var iii = -1;
	for (var ii = 0 ; ii < arrayTargetList.length ; ii++) {

		if (compare_posters(arrayTarget[i],arrayTargetList[ii])) {
			iii = ii;
			break;
		}
	}
	if (iii == -1) {
		iii = arrayTargetList.length;
		arrayTargetList[iii] = arrayTarget[i];		
	}

}


var arrayTargetListCount = [];
var arrayTargetListPosters = [];
for (var ii = 0 ; ii < arrayTargetList.length ; ii++) {
	arrayTargetListCount[ii] = 0;
	arrayTargetListPosters[ii] = "";

	for (var i = 0 ; i < arrayTarget.length ; i++) {

		if ( compare_posters(arrayTarget[i],arrayTargetList[ii])) {
			arrayTargetListCount[ii]++;
			if (arrayTargetListPosters[ii] != "")
				arrayTargetListPosters[ii] = arrayTargetListPosters[ii] + " , ";
			arrayTargetListPosters[ii] = arrayTargetListPosters[ii] +  arrayPoster[i] ;
		}
	}

}

var output = "";


arrayList_sorted = arrayList.sort(sortListByDate);


// Produce output for voting totals
output =  "";
for ( var i = 0 ; i < arrayAllPosters.length ; i++) {
	
	var bFoundVote = false;
	var target="";
	for( var k = arrayList_sorted.length - 1 ; k >= 0 ; k--) {
		
		if (arrayList_sorted[k][1] == arrayAllPosters[i]) {
			bFoundVote = true;
			target = arrayList_sorted[k][2]
			break;	
		}
	}

	var j = 0;
	var bFoundTarget = false;
	if (!bFoundVote) {
		if (target != "") {		
			for( var j = 0 ; j < arrayTotals.length ; j++ ) {
				if (arrayTotals[j][0] == target) {
					bFoundTarget = true;
					break;
				}
			}
		}
	}
	if (target != "") {
		if (bFoundVote) {		
			for( var j = 0 ; j < arrayTotals.length ; j++ ) {
				if (compare_posters(arrayTotals[j][0],target)) {
					bFoundTarget = true;
					break;
				}
			}
		}
		if (!bFoundTarget) {
			arrayTotals[j] = [];
			arrayTotals[j][0] = target;
			arrayTotals[j][1] = [];
		}
		arrayTotals[j][1][arrayTotals[j][1].length] = arrayAllPosters[i];
	}

}

var arrayTotals_sorted = arrayTotals.sort(sortTotalsbyTotal);
sections[0] = [];
sections[0][0] = "Voting Totals";

// Calculate players left to vote, if data is available
if (LivePlayerList.length > 0) {
	var yettovote = [];
	for ( var i = 0 ; i < LivePlayerList.length ; i++ ) {
		var bFound=false;
		for ( var j = 0 ; j < arrayList.length ; j++)
			if ( compare_posters(arrayList[j][1],LivePlayerList[i]) )
				bFound=true;
		if (!bFound )
			yettovote[yettovote.length]=LivePlayerList[i];

	}
	if (yettovote.length > 0) {
		if (teams.length == 0) {		
			arrayTotals[arrayTotals.length] = [];
			arrayTotals[arrayTotals.length-1][0]="Yet to vote";
			arrayTotals[arrayTotals.length-1][1] = yettovote;
		}
		else
		{
			for(var t = 0 ; t < teams.length ; t++) {

				team_yettovote = [];
				for(var y = 0 ; y< yettovote.length ; y++) {
					if (teams[t][3].indexOf(yettovote[y]) > -1)
						team_yettovote[team_yettovote.length]=yettovote[y]
				}
				arrayTotals[arrayTotals.length] = [];
				arrayTotals[arrayTotals.length-1][0]="<img border=0 src=\"http://"+teams[t][2]+"\"> Yet to vote";
				arrayTotals[arrayTotals.length-1][1] = team_yettovote;

			}
		}
	}
}



for ( var j = 0 ; j < arrayTotals.length ; j ++ ) {

	var newline = "<b>";
	newline = newline + getcorrectname(arrayTotals[j][0]);
	newline = newline + "</b>&nbsp;";
	if (arrayTotals[j][1].length < 10) newline = newline + "&nbsp;";
	newline = newline + arrayTotals[j][1].length + "&nbsp;";

	newline = newline + "&nbsp;( <i>";
	for (var l = 0 ; l < arrayTotals[j][1].length ; l++) {
		newline = newline + arrayTotals[j][1][l];
		if ( l < arrayTotals[j][1].length - 1)
			newline = newline + ", ";
	}
	newline = newline + "</i>&nbsp;)<br>";
	if (arrayTotals[j][0] != "-- ignore --" && arrayTotals[j][1].length > 0) output = output + newline;

}
sections[0][1] = output;

if (options[option_show_html])
	sections[0][1] = sections[0][1] + "<br><textarea rows='5' cols='80'>"+output.replace(/&nbsp;/g,"&amp;nbsp;")+"</textarea>";




// Produce output for chonological list of all votes
sections[1] = [];
sections[1][0] = "Voting History";
output = "";

for (var k = 0 ; k < arrayList_sorted.length ; k++) {

	var bChanged = false;
	for (var kk=k+1 ; kk < arrayList_sorted.length ; kk++)
		if (arrayList_sorted [k][1] == arrayList_sorted [kk][1]) bChanged = true;

	if (!bChanged)
		FullPosterList[FullPosterList.length] = arrayList_sorted [k][1];

	var hr = arrayList_sorted [k][0].getHours();
	var min = arrayList_sorted [k][0].getMinutes();
	if (hr < 10) hr = "0"+hr;
	if (min < 10) min = "0"+min;

	if (! bChanged) output = output + "<b>";
	output = output + hr+ ":" + min + "&nbsp;&nbsp;&nbsp;"+arrayList_sorted [k][6]+" votes for "+arrayList_sorted [k][2]+"<br>";
	if (! bChanged) output = output + "</b>";

	// Rewrite target for colours etc.
	var targettext = arrayList_sorted [k][3].innerHTML;
	if (bChanged && options[option_strikethru]) {
		targettext = "<del>"+targettext+"</del>";
	}
	else {
		if (!bChanged && options[option_highlight_target ])
			targettext = "<font id="+k+" color='brown'>"+targettext+"</font>";
	}
	arrayList_sorted [k][3].innerHTML = "<span id=VOTEINSORTEDARRAY"+k+">" + targettext + "</span>";
	if (options[option_cancelvotes ] && !bChanged)
		arrayList_sorted [k][5] = true;  


}
sections[1][1] = output;
if (options[option_show_html])
	sections[1][1] = sections[1][1] + "<br><textarea rows='5' cols='80'>"+output.replace(/&nbsp;/g,"&amp;nbsp;")+"</textarea>";

	
// Produce output for comment count
sections[2] = [];
sections[2][0] = "Comment Count";
output="";

var k = bubbleSortCommentObjects(PosterCommentCount);

//PosterCommentCount.badSort(sortCommentCount);
for (var key = k.length -1 ; key >= 0 ; key--)
{
	output = output + "<b>" + PosterCommentCount[k[key]].poster + "</b> : " +PosterCommentCount[k[key]].commentcount  +"<br>"
}
	
sections[2][1] = output;
if (options[option_show_html])
	sections[2][1] = sections[2][1] + "<br><textarea rows='5' cols='80'>"+output.replace(/&nbsp;/g,"&amp;nbsp;")+"</textarea>";

var SECTION_OPTIONS = 3;
sections[SECTION_OPTIONS] = [];
sections[SECTION_OPTIONS][0] = "Options";
output = "";




sections[SECTION_OPTIONS][1] = output;




// ASSIGN VOTES MANUALLY
var SECTION_ASSIGN_VOTES = 4;
sections[SECTION_ASSIGN_VOTES] = [];
sections[SECTION_ASSIGN_VOTES][0] = "Assign votes [<font color='blue'><b onClick=\"alert('Use this section to manually assign votes to particular players.  This may be necessary if a vote is not being properly identified by this script.  Click on the voter from the top list, then select their target from the bottom list.  You can reset assigned votes in the Options menu.')\">?</b></font>]";
output = "";
if (arrayTotals.length > 0) {
	for (var i = 0 ; i < arrayTotals[arrayTotals.length-1][1].length ; i ++) {
		output = output + "<font color='black' id='yettovote"+i+"'>"+arrayTotals[arrayTotals.length-1][1][i] + "</font><br>";
		FullPosterList[FullPosterList.length]=arrayTotals[arrayTotals.length-1][1][i];
	}
	for (var i = 0 ; i < arrayTotals.length ; i ++) {
		var bFound = false
		for (var j = 0 ; j < FullPosterList .length ; j ++) {
			if (arrayTotals[i][0] == FullPosterList [j]) {
				bFound = true;
				break;
			}
		}
		if (!bFound)
			FullPosterList[FullPosterList.length]=arrayTotals[i][0];

	}
}
FullPosterList[FullPosterList.length] = "-- ignore --";
output = output + "<br><br>";
for (var i = 0 ; i < arrayAllPosters .length ; i ++) {
	output = output + "<font color='black' id='yettovotetarget"+i+"'>"+arrayAllPosters [i] + "</font><br>";
}

	sections[SECTION_ASSIGN_VOTES][1] = output;


var votingDiv = document.createElement('div');
votingDiv.id = "votingdiv";

votingCommentSpan.insertBefore(document.createElement('hr'),CommentSpan.lastChild.nextSibling);
votingCommentSpan.insertBefore(votingDiv,CommentSpan.lastChild.nextSibling);

for(var i = 0 ; i < sections.length ; i++) {
	if (options[option_hidechange] && i == SECTION_ASSIGN_VOTES) 
		break;

	if (options[option_hideoptions] && i == SECTION_OPTIONS) 
		break;

	var button = document.createElement('span');
	button.innerHTML = "<br><table class='plusminus'><tbody><tr><td id="+i+">"+ (options[i] ? "+" : "-") +"</td></tr></tbody></table>";


	button.id = "VOTINGPLUSMINUS"+i;
	sections[i][2] = button
	
	var title = document.createElement('span');
	title.innerHTML = "<b>"+sections[i][0]+"</b><br>";
	sections[i][3] = title

	var section = document.createElement('span');
	section.innerHTML = "<br><table><tr><td><font size='2'>"+sections[i][1]+"</font></td></tr></table>";
	section.style.display = (options[i] ? "none" : "block")
	section.id = "VOTINGSECTIONID_"+i;
	sections[i][4] = section;
	votingDiv.appendChild(sections[i][2]);
	votingDiv.appendChild(sections[i][3]);
	votingDiv.appendChild(sections[i][4]);
}


var yettovote = -1;
var yettovote_element;


if (options[option_dateorder ]) {

	var commentarray = []; 
	i = 0;
	tablePointer = commentDiv.nextSibling.nextSibling.nextSibling.nextSibling;
	var parent = tablePointer.ParentNode;
	while (tablePointer.tagName == "TABLE") {
		var img = tablePointer.getElementsByTagName("td")[0].firstChild;
		img.width = 0;
		
		var cell1 = tablePointer.getElementsByTagName("td")[1];
		var AttributesSpan = cell1.getElementsByTagName('span')[0];
		var AttributeDetails = AttributesSpan.firstChild.nextSibling.nextSibling;

		commentarray[i] = [];
		commentarray[i][0] = tablePointer;
		commentarray[i][1] = getCommentDate(AttributeDetails); 

		tablePointer = tablePointer.nextSibling.nextSibling;
		commentarray[i][0].parentNode.removeChild(commentarray[i][0]);
		i++;
	}
	tablePointer = commentDiv.nextSibling.nextSibling.nextSibling.nextSibling;
	commentarray.sort(sortCommentsByDate);
	for (i = 0 ; i < commentarray.length ; i++) {		
		tablePointer.parentNode.insertBefore(commentarray[i][0], tablePointer.nextSibling);
	}	
}


window.addEventListener('load', function() { post_render_processing() }, true);

if (options[option_showteams]) {

	allLinks = document.getElementsByTagName('a');
	for (var i = 0; i < allLinks .length; i++) {

	link = allLinks[i];
	link.style.textDecoration = "none";

	var x0 = link.innerHTML
		for(var t = 0 ; t < teams.length ; t++) {

 			if (teams[t][3].indexOf(x0) > -1) {
				if ( undefined != teams[t][1] )
					x0 = "<font color=\""+teams[t][1]+"\">"+x0+"</font>";
				if ( undefined != teams[t][2] )
					x0 = "<img border=0 src=\"http://"+teams[t][2]+"\">&nbsp;&nbsp;" + x0;
				link.innerHTML = x0;
			}
		}
	}
	
	
	s = votingCommentSpan.innerHTML
	//alert(s);
	for(var t = 0 ; t < teams.length ; t++) {
		a_p = teams[t][3].split(",");	
		for (var p = 0 ; p < a_p.length ; p++) {
			a = "<b>"+a_p[p]+"</b>";
			var e_v = new RegExp("<(B|b)>"+a_p[p]+"<\\/(B|b)>","g");
			s = s.replace(e_v,"<img border=0 src=\"http://"+teams[t][2]+"\">&nbsp;&nbsp;" + "<b>"+a_p[p]+"</b>");

			a = "&lt;b&gt;"+a_p[p]+"&lt;/b&gt;";
			var e_v = new RegExp(a,"g");
			s = s.replace(e_v,"<img border=0 src=\"http://"+teams[t][2]+"\">&nbsp;&nbsp;" + a);

		}
		
	}
	votingCommentSpan.innerHTML = s;
}

}


var GMthreadRecord = [];
var LivePlayerList = [];
everything();

