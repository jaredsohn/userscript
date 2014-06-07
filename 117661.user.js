// ==UserScript==
// @name           DLP: WBA script
// @namespace      lineape
// @description    Script which hides posts not from the Author.
// @include        http://irc.darklordpotter.net/showthread.php?t=*
// @include        http://forums.darklordpotter.net/showthread.php?t=*
// @include        https://forums.darklordpotter.net/showthread.php?t=*
// @include        https://irc.darklordpotter.net/showthread.php?t=*
// ==/UserScript==

var subForum = document.getElementsByTagName("table")[1].getElementsByTagName("span")[1].getElementsByTagName("a")[0].innerHTML;

//Remove this if you're okay with this script running on all threads and not just on WBA 
if (subForum != "Work By Author") {
	return;
}

if (window.location.hash == "#child-reporter") { // If page is an Iframe
	ReportOpIdToParent();
} else if (document.body.innerHTML.length > 100) { 
	RegularWBAPage();
}

function ReportOpIdToParent() { // Iframe gets id and sends it to the 
	var opId = FetchOpIdFromPage();
	var el = document.createElement('script');
	el.type = "text/javascript";
	el.innerHTML = "window.parent.OpIdReporter("+opId+");";
	document.body.appendChild(el);
}

function FetchOpIdFromPage() {//Fetch Op's ID
	return unsafeWindow.$('td.alt2 .bigusername').attr('href').replace(/^.*u=/, '');
}

unsafeWindow.OpIdReporter = function(id) {// report from child iframe to parent
	DoRegularWBAPage(id);
}

function RegularWBAPage() {// Regular behavior
	if (window.location.href.match(/page=/)) {// Makes Iframe to get OpID
		var url = window.location.href.replace(/&page=.*/g, '');// Url of the first page.
		var el = document.createElement('iframe');
		el.src = url+"#child-reporter";
		el.id = "tempframe";
		document.body.appendChild(el); //...and we wait
	} else {//Fetch OpId
		DoRegularWBAPage(FetchOpIdFromPage());
	}
}

unsafeWindow.KillSidebar = function() {
	var $ = unsafeWindow.$;
	
	var links = $('#posts .alt2 .bigusername');
	for (var i = 0; i < links.length; i++) {
		var el = links[i];
		var alt2_el = $(el).parents('tr > td.alt2');
		
		if (alt2_el.css('display') == "none") {
			$(alt2_el).css('display', '');
			$(alt2_el).siblings('.alt1').attr('colspan',1);
		} else {
			$(alt2_el).css('display', 'none');
			$(alt2_el).siblings('.alt1').attr('colspan',2);
		}
	}
};

function DoRegularWBAPage(opId) {
	var $ = unsafeWindow.$;
	
	$('#tempframe').remove();
	
	$('<style>#gmmenu { position:fixed; top:0; right:0; background-color: #000000; padding: 0 0 5px 5px;} .hide-non-op .non-op { display:none } .hide-sidebar .alt2 * { display:none } .hide-sidebar .alt2 { width:5px }</style>')
		.appendTo($('head'));
		
	$('<div id="gmmenu"><a href="javascript:" onclick="$(document.body).toggleClass(\'hide-non-op\')">Hide Non-OP</a><br /><a href="javascript:" onclick="KillSidebar()">Hide Sidebar</a>')
		.appendTo($('body'));
	
	var links = $('#posts .alt2 .bigusername');
	for (var i = 0; i < links.length; i++) {
		var el = links[i];
		var postUserId = $(el).attr('href').replace(/^.*u=/,'');
		
		if (postUserId != opId) {
			$(el).parents('#posts > div').addClass('non-op');
		}
	}
}
