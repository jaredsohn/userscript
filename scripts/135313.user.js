// ==UserScript==
// @name            HackForums Utility Pack Fix
// @namespace       Yellows-creditstoxerotic/utilitypack
// @description     Has an assortment of utilities to HF.
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @version         1.5
// ==/UserScript==


var titles = document.title;
var element;
//Start Bans Stats
if ( titles == "Banned Member List" ) {
	var total = document.body.innerHTML.split('trow1').length-1;
	var next = total-1;
	var fin = next/3;
	if(document.body.innerHTML.match(/trow2">Today<\/td>/g)) {
		var all = document.body.innerHTML.match(/trow2">Today<\/td>/g).length;
	} else {
		var all = 0;
	}
	if(document.body.innerHTML.match(/trow1">Today<\/td>/g)) {
		var alls = document.body.innerHTML.match(/trow1">Today<\/td>/g).length;
	} else {
		var alls = 0;
	}
	var regex = /List<\/strong>/;
	var replace = 'List</strong> - '+fin+' Total Banned Members - '+all+' Banned Today - '+alls+' Left To Be Unbanned Today';
	document.body.innerHTML=document.body.innerHTML.replace(regex,replace);
} 
//End Bans Stats


//Start Paid Stickies
if ( titles == "Paid Stickies List" ) {
	var trowTwos = document.body.innerHTML.match(/trow2"><a/g).length;
	var regex = /List<\/strong>/;
	var replace = 'List</strong> - '+trowTwos+' Total Paid Stickies';
	document.body.innerHTML=document.body.innerHTML.replace(regex,replace);
} 
//End Paid Stickies


//Start Neg Rep Counter
if ( titles == "Hack Forums - Negative Reputation Log" ) {
	var trowTwos = document.body.innerHTML.match(/trow2"><a/g).length;
	var regex = /Log<\/strong>/;
	var replace = 'List</strong> - '+trowTwos+' Negative Reputations In The Past 24 Hours';
	document.body.innerHTML=document.body.innerHTML.replace(regex,replace);
} 
//End Neg Rep Counter


//Start Buddy Count
if ( titles == "Buddy List" ) {
	var buddyCnt = document.body.innerHTML.match(/buddy_details/g).length;
	var regex = /Buddy List<\/strong>/;
	var replace = 'Buddy List</strong> - '+buddyCnt+' Buddies';
	document.body.innerHTML=document.body.innerHTML.replace(regex,replace);
} 
//End Buddy Count


//Start Count Groups
if ( titles == "Custom Forum Groups" ) {
	var tableCnt = document.body.innerHTML.match(/<table/g).length;
	tableCnt = tableCnt - 1;
	var regex = /Groups<\/strong>/;
	var replace = 'List</strong> - '+tableCnt+' Joinable Groups';
	document.body.innerHTML=document.body.innerHTML.replace(regex,replace);
} 
//End Count Groups


//Start Index New Post
if ( titles == "Hack Forums" ) {
	var links = document.getElementsByTagName('td');
	var linkcount = 0;
	var newtid;
	var newnode;
	var fintid;
	var finele;
	for (var i = 0; i < links.length; i++) 
	{
		element = links[i];
		if (element.innerHTML.indexOf('&amp;action=lastpost"') != -1)
		{
			newtid = element.innerHTML.match(/tid\=\d*/)
			finele = element.getElementsByTagName('strong')[0];
			fintid = newtid[0].split("=")[1];
			finele.innerHTML='<a href="showthread.php?tid='+fintid+'&amp;action=newpost"><img src="http://cdn2.hackforums.net/images/blackreign/jump.png" alt="Go to first unread post" title="Go to first unread post" /></a>&nbsp;'+finele.innerHTML;
		}
	}
}
//End Index New Post


//Start Count Stafflist
//Commented out due to the fact that the counter depends on Admins always wearing the Admin bar
// if ( titles == "Forum Staff and Admins" ) {
	// var adminCnt = document.body.innerHTML.match(/color: #4DD0FC;/g).length;
	// var allCnt = document.body.innerHTML.match(/member_profile_groupimage/g).length;
	// allCnted = allCnt/2;
	// var staffCnt = allCnted-adminCnt;
	// var regex = /Admins<\/strong>/;
	// var replace = 'Admins</strong> - '+adminCnt+' Admins - '+staffCnt+' Staff';
	// document.body.innerHTML=document.body.innerHTML.replace(regex,replace);
// } 
//End Count Stafflist


//Start Count Modlist
if ( titles == "Forum Moderators" ) {
	var modCnt = document.body.innerHTML.match(/<span><strong>/g).length;
	var regex = /Moderators<\/strong>/;
	var replace = 'Moderators</strong> - '+modCnt+' Forum Moderators';
	document.body.innerHTML=document.body.innerHTML.replace(regex,replace);
} 
//End Count Modlist


//Start Search New Post
var checkIfPostExists = 0;
var tds = document.getElementsByTagName('td');
for ( var i = 0; i < tds.length; i++ ) {
    element = tds[i];
    if ( element.innerHTML.indexOf(">Post<") != -1 ) {
		checkIfPostExists = 1;
    } 
}

if (checkIfPostExists == 1 && document.title=='Hack Forums - Search Results') {
	var imgs = document.getElementsByTagName('img');
	var dotimgs = new Array();
	var dotcount = 0;
	for ( var i = 0; i < imgs.length; i++ ) {
		element = imgs[i];
		if ( element.src.indexOf( "folder" ) != -1 ) {
			dotimgs[dotcount]=element.src;
			dotcount++;
		} 
	}

	var spans = document.getElementsByTagName('span');
	var spanCount = 0;
	for ( var i = 0; i < spans.length; i++ ) {
		element = spans[i];
		if ( element.innerHTML.indexOf( "Thread:" ) != -1 ) {
			var tid = element.innerHTML.match(/tid\=(.*?)"/);
			tid = tid[1];
			var regex = /Thread\:/;
			if (dotimgs[spanCount].indexOf("new") != -1 ) {
				var replace = '<a href="showthread.php?tid='+tid+'&amp;action=newpost"><img src="http://cdn2.hackforums.net/images/blackreign/jump.png" alt="Go to first unread post" title="Go to first unread post" /></a>&nbsp;Thread:';
				element.innerHTML=element.innerHTML.replace(regex,replace);
			}
			
			element.innerHTML=element.innerHTML.replace("</a>","</a><span class=\"smalltext\" style=\"float:right;\">[<a href=\"showthread.php?tid="+tid+"&amp;action=lastpost\">Last Post</a>]</span>");
			spanCount++;
		}
	}
}

//End Search New Post


//Start Post Activity Link
if(document.body.innerHTML.indexOf('<!-- start: showthread_newreply') != -1) {
	function getElementsByClassName(classname, node)  {
		if(!node) node = document.getElementsByTagName("body")[0];
		var a = [];
		var re = new RegExp('\\b' + classname + '\\b');
		var els = node.getElementsByTagName("*");
		for(var i=0,j=els.length; i<j; i++)
			if(re.test(els[i].className))a.push(els[i]);
		return a;
	}

	var tds = getElementsByClassName('smalltext post_author_info');
	var element;
	for ( var i = 0; i < tds.length; i++ ) {
		element = tds[i];
		var links = element.getElementsByTagName('a');
		var all = element.innerHTML.match(/uid\=(\d*)/);
		var fin = all[1];
		element.innerHTML=element.innerHTML.replace(/Posts\: (.*?)</, "Posts: <a href='postactivity.php?uid="+fin+"'>$1</a><");
	}
}
//End Post Activity Link
Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy