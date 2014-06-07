// ==UserScript==
// @name		YOSPOS
// @description	YOSPOS, BITCH
// @match 		http://forums.somethingawful.com/*
// @namespace	yospos
// ==/UserScript==

// It will be incredible if this actually works
/*

BIG TO-DO:

Replace images with text equivs -
	* Mod/admin stars
	* That ugly OK button on the jumplist - can't remove because it has no class (heh)
	
Add ">" to unread post count

Turn Profile, History, Rap Sheet li's into buttons - onclick for the area i guess

*/

//so first we need to see if it's in YOSPOS, since @match can't do that for threads obviously
breadcrumbsDiv = getElementsByClass('breadcrumbs')[0];
breadcrumbsString = (new XMLSerializer()).serializeToString(breadcrumbsDiv);
if (breadcrumbsString.indexOf('YOSPOS') != -1) {
	
	//Step one: replace images

	images = document.getElementsByTagName('img');
	//console.log(images);
	for (i=0;i < images.length;i++) {
		//console.log(images[i].getAttribute("src"));
		//since we removed an image, images all get moved down by one... fuckin weird i know... ugh.
		switch (images[i].getAttribute("src")) {
			case "http://fi.somethingawful.com/images/forum-post.gif":
				removeAndReplace(images[i], "Post");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/images/buttons/button-bookmark.gif":
				//I'm just flat removing this because it's weird and JavaScripty... I'll look into it later if people REALLY NEED IT but there's always the link at the bottom of the thread vOv
				images[i].parentNode.innerHTML = "";
				i = i - 1; 
				break;
			case "http://fi.somethingawful.com/images/forum-reply.gif":
				removeAndReplace(images[i], "Reply");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/images/sa-quote.gif":
				removeAndReplace(images[i], "Quote");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/images/sa-edit.gif":
				removeAndReplace(images[i], "Edit");
				i = i - 1;
				break;
			case "http://forumimages.somethingawful.com/images/button-report.gif":
				removeAndReplace(images[i], "Report");
				i = i - 1;
				break;
			//  a whole bunch of vote imgs!!!
			case "http://fi.somethingawful.com/rate/default/1stars.gif":
				removeAndReplace(images[i], "CRAP");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/rate/default/2stars.gif":
				removeAndReplace(images[i], "**");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/rate/default/3stars.gif":
				removeAndReplace(images[i], "***");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/rate/default/4stars.gif":
				removeAndReplace(images[i], "****");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/rate/default/5stars.gif":
				removeAndReplace(images[i], "*****");
				i = i - 1;
				break;
			// sure this image is innocuous enough but since literally no one has ever used it, i think it can be dropped
			case "http://fi.somethingawful.com/images/sortasc.gif":
				images[i].parentNode.innerHTML = "";
				i = i - 1; 
				break;
		}
	}
	
	//TO-DO: '>' sign on unread posts
	
	//TO-DO: make buttons out of replaced images... could be annoying as FUCK. maybe dont do this. :effort:
	
	//i don't edit the css file here obviously; not insane. too bad i can't use firefox's nice e4x thing to just directly embed this because ~chrome~ so i have to run a script to add all those slahes...
	var css = "\
\
		body {\
			color:#57FF57 !important;\
			font: 14px 'consolas', bitch, monospace !important;\
			font-weight:bold;\
			background-color:black;\
		}\
		a {\
			color:#57FF57 !important;\
		}\
		#container {\
			background-color:black;\
		}\
		#mods, div.pages, #copyright, #forum th, #forum td.lastpost, #forum span.pages, #thread div.postbar, td.postdate, td.postlinks, #thread dl.userinfo dd, #thread tr.postbar td, div.threadrate, div.subscribe {\
			color:#57FF57 !important;\
		}\
		#navigation, #nav_purchase, #thread p.editedby, #forum td.title a.pagenumber, #forum td.title, #forums th, #forums div.subforums, #forums td.moderators, #pm, #info {\
			font-size:14px !important;\
		}\
		div.threadbar, #subforums, #subforums td, #forum, #forum th, #forum td, #filter, div.forumbar, #thread table.post, #thread td, #forums, #forums th, #forums td, #pm, #pm th, #pm td, #info, #info th, #info td {\
			background-color: black;\
		}\
		td.title div.lastseen {\
			background:none !important;\
		}\
		#forum td.title div.lastseen a.x {\
			background:none !important;\
		}\
		div.breadcrumbs a.bclast {\
			border-bottom:none !important;\
			text-decoration:underline !important;\
		}\
		#thread td.postbody, #thread dl.userinfo, #forum td.replies, #forum td.views, #forum td.author, #subforums {\
			color:#57FF57 !important;\
			font: 14px 'consolas', bitch, monospace !important;\
		}\
		#mods, div.pages, #copyright, #forum th, #forum td.lastpost, #forum span.pages, #thread div.postbar, td.postdate, td.postlinks, #thread dl.userinfo dd, #thread tr.postbar td, div.threadrate, div.subscribe {\
			color:#57FF57 !important;\
			font: 12px 'consolas', bitch, monospace !important;\
		}\
		div.threadbar, #subforums, #subforums td, #forum, #forum th, #forum td, #filter, div.forumbar, #thread table.post, #thread td, #forums, #forums th, #forums td, #pm, #pm th, #pm td, #info, #info th, #info td {\
			border:1px solid #57FF57 !important;\
		}\
		.author.op {\
			color:#57FF57 !important;\
		}\
		/* jumplist @ bottom */\
		select {\
			background-color:black;\
			color:#57FF57;\
			font: 12px 'consolas', bitch, monospace !important;\
		}\
		#forum td.title div.lastseen a {\
			font-size: 12px !important;\
		}\
		div.breadcrumbs, #subforums td.title dt, #forum td.lastpost a.author, div.threadbar form.threadsearch label, #thread dl.userinfo dt, #forums td.title a.forum {\
			font-weight:bold !important;\
			font-style:itallic !important;\
			font-size:14px !important;\
		}\
		/* #WONTFIX. I guess a case could be made for the archives box but ugh */\
		#filter, #ac_timemachine {\
			display:none !important;\
		}\
		#forum th, div.threadbar, div.forumbar, #forums th, #pm th, #info th {\
			background:black !important;\
		}\
		.profilelinks li {\
			border-right: 1px solid #57FF57 !important;\
			padding-top:8px;\
			padding-bottom:6px;\
			padding-left:10px;\
			padding-right:10px;\
			margin-left:-5px;\
			margin-right:0px;\
		}\
		.bbc-block h4, .bbc-block h5 {\
			color: #57FF57 !important;\
		}\
		.bbc-block h4 {\
			border-top: 1px #57FF57 solid !important;\
		}\
		.bbc-block, .bbc-block h5 {\
			border-bottom: 1px #57FF57 solid !important;\
		}\
		/* Page links */\
		.pages a, .pages .curpage {\
			font-size:14px !important;\
			margin-right:0px !important;\
			color: #57FF57 !important;\
		}\
		.pages.top, .pages.bottom {\
			font-size:14px !important;\
		}\
		div.pages a:hover {\
			background:none !important;\
			padding-right:0px !important;\
			margin-right: 0px;\
		}\
		div.pages a {\
			border-bottom:none !important;\
			text-decoration:underline !important;\
		}\
		#globalmenu, #globalthing {\
			background-color:black !important;\
			border-bottom: 1px #57FF57 solid !important;\
			font: 14px 'consolas', bitch, monospace !important;\
		}\
		/* Personal preference + looks less cluttered like this. Use Buy forum stuff link if you need to do so. */\
		#nav_purchase {\
			display:none;\
			}\
		.title_pages {\
			color: #57FF57 !important;\
		}\
		.title_pages a {\
			text-decoration:underline !important;\
		}\
		.title_pages a:hover {\
			background-color:black !important;\
		}\
		#forum td.title div.lastseen a.count {\
			border-left:1px #57FF57 solid !important;\
		}\
		.lastseen {\
			border:1px #57FF57 solid !important;\
		}\
		div.breadcrumbs h1, input, #forum td.title a {\
			font-size:14px !important;\
		}\
		/* New thread/reply & edit post */\
		table.standard th {\
			background-color:black !important;\
			color: #57FF57 !important;\
		}\
		table.standard td {\
			background-color:black !important;\
		}\
		div.mainbodytextsmall, .smalltext, .smalltext a {\
			font-size: 12px !important;\
		}\
		.bginput {\
			background-color:black;\
			color: #57FF57 !important;\
			border:1px #57FF57 solid;\
			font: 14px 'consolas', bitch, monospace !important;\
		}\
		textarea {\
			background-color:black;\
			color: #57FF57 !important;\
			border:1px #57FF57 solid;\
		}\
		table.standard th, table.standard td {\
			border:1px #57FF57 solid !important;\
		}\
		.standard h2 {\
			background-color:black !important;\
			color: #57FF57 !important;\
			border-bottom:1px #57FF57 solid !important;\
		}\
		div.standard {\
			background-color:black !important;\
			color: #57FF57 !important;\
			border:1px #57FF57 solid !important;\
		}\
		#forum td.replies, #forum td.views, #forum th.rating, #forum td.rating {\
			font: 14px 'consolas', bitch, monospace !important;\
		}\
		ul.postbuttons {\
			padding:5px !important;\
		}\
		.threadbar {\
			padding:0px !important;\
		}\
		.postlinks .postbuttons li a {\
			border-left:1px #57FF57 solid !important;\
			padding:5px !important;\
			margin-right:-6px !important;\
		}\
		.threadbar.top  li a {\
			border-left:1px #57FF57 solid !important;\
			padding:5px !important;\
			margin-right:-6px !important;\
		}\
		.signature {\
			border-top:1px #57FF57 solid !important;\
		}\
		"
		
	//thanks http://www.google.com/support/forum/p/Chrome/thread?tid=661c9da64bd2b38f&hl=en
	if( typeof(GM_addStyle)=='undefined' ){function GM_addStyle(styles){	
	var S = document.createElement('style');
	S.type = 'text/css';
	var T = ''+styles+'';
	T = document.createTextNode(T)
	S.appendChild(T);
	document.body.appendChild(S);
	return;
	}}
	GM_addStyle(css);
}


function removeAndReplace(image, replacementText) {
	console.log("Replacing ");
	console.log(image);
	image.parentNode.innerHTML = replacementText;
}

//thanks first result for get elements by class on google
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}