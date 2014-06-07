// ==UserScript==
// @name        Remove Deleted Threads
// @namespace   n0skillg3t @ userscripts!
// @include     http://forum.sa-mp.de/*

// @include     forum.sa-mp.de/*
// @require     http://code.jquery.com/jquery-latest.js
// @version     1
// ==/UserScript==

var hiddenThreadsCount = 0;
var open = 0;

$(document).ready(function() {
    AddMenuItem();
	$("#normalThreadsStatus").find(".tableList").find('tbody').find('tr').each(function(index) {
		var id;
		id = $(this).attr("id");
		if(id == undefined) {
		  var icon = $(this).find('.columnIcon').find('img').attr('src');
		  if(icon == "icon/threadTrashM.png") {
			var title = $(this).find('.columnTopic').find('span').text();
			var rmv = title.split(':');
			if(rmv[3] == undefined) {
			    var rmv = rmv[1] + ':' + rmv[2];
			} else {
				var rmv = rmv[2] + ':' + rmv[3];
			}
			var rmv = rmv.split('(');
			var startindex = rmv[1];
			var startindex = startindex.split(')');
			var startindex = startindex[0];
			if(startindex.indexOf('Heute') == -1) {
				hiddenThreadsCount = hiddenThreadsCount + 1;
				$(this).attr('id','hiddenThread'+hiddenThreadsCount);
				$(this).hide();
			}		
		  }
		}
	});
	$("#hiddenThreads").click(function(e) {
		e.preventDefault();
		if(open == 0) {
			open = 1;
			AddGlobalAnnouncement();
			$("#threadlog").slideDown();
		} else {
			open = 0;
			$("#threadlog").slideUp(function() {
				$("#threadlog").remove();
			});
		}
	});
	$("#closehidden").click(function(e) {
		e.preventDefault();
		$(this).parent().slideUp();
	});
});

AddMenuItem = function() {
	$("#mainMenu").find('.mainMenuInner').find('ul').find('li').each(function() {
		var clas = $(this).attr("class");
		var str = '<li id="mainMenuItem35" class="last"><a id="hiddenThreads" title="Zeigt ausgeblendete Themen an" href="#"><img alt="" src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/24/Mimetypes-text-x-log-icon.png"><span>Ausgeblendete Threads</span></a></li>';
		if(clas == "last") {
			$(this).removeAttr("class");
			$(this).parent().append(str);
		}
	});
}

AddGlobalAnnouncement = function() {
	var str = '<div id="threadlog" style="display:none;" class="info"><span style="color:#000;">Auf dieser Seite sind keine gelöschten Threads!</span></div>';
	$("#main").prepend(str);
	GetHiddenThreads();
}

GetHiddenThreads = function() {
	var row = 1;
	var hastobe = hiddenThreadsCount;
	var string = "";
	var html = "";
	for(row; row<=hastobe; row++) {
		var id = "#hiddenThread"+row;
		string = $(id).text();
		string = string.split('»');
		string = string[1];
		string = string.split('«');
		string = string[0];
		string = "<span style='color:#000;'>Thema >></span>"+string+"<span style='color:#000;'><< wurde ausgeblendet.</span><br>";
		html = html + string;
		if(row == hastobe) {
			if(html != "")$("#threadlog").empty();
			$("#threadlog").append(html);
		}
	}
}