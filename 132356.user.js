// ==UserScript==
// @name           Edit Threads
// @namespace      http://userscripts.org/scripts/review/37933
// @include        http://www.frendz4m.com/forum/showforums*
// @include 	   http://www.frendz4m.com/forum/edit.php?*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==



function getForumID() {
	var url = location.href;
	var n = url.indexOf("showforums") + "showforums-".length;
	var str = url.substr(n, url.length - n);
	return str.substr(0, (str.indexOf("-") == -1)? str.indexOf(".htm") : str.indexOf("-"));
}

function getUsername() {
    var text = $("form").text();
    var start = text.indexOf(":") + 1;
    var end = text.indexOf("Topic") - "Topic".length;
    return text.substr(start, end);
}

function getID() {
    var cookies = document.cookie.split(";");
    var id;
    for(i=0;i<cookies.length;i++) {
        if(cookies[i].indexOf("Frendz0") != -1) {
           id = cookies[i].substr(cookies[i].indexOf("Frendz0") + 8);
           return id.replace("'","");
        }
    }
}


function editThread() {
	$("<div id='reason'>Reason</div>").insertAfter($("textarea"));
	$("<input type='text' size='45' id='txtReason'/>").insertAfter($("#reason"));
	$("input[name=edit]").click(function(e) {
		var edit = "\n\n[b][u]Advanced Member Edit:[/u]  [url=profile.php?userID=" + getID() + "][color=#FFA500]" + getUsername() + "[/color][/url][/b]";
		var reason = $("input#txtReason").val();
		var area = document.getElementsByTagName("textarea")[0];
		var str = area.value + edit + "\n[b][u]Reason:[/u] " + reason + "[/b]";		
		area.value = str;
	});
}

$(document).ready(function() {
	$("table").each(function(i) {
		$(this).attr("id","tab" + i);
	});
		var mainTable = ($("table").size() == 7)? "table#tab5" : "table#tab4";
	var mainRows = $(mainTable + " tr.forumrow");
	var str = "List of threads \n";
	var i = 0;
	var links = new Array();
	mainRows.find("a[href*=showthreads]").each(function() {
		if($(this).text().indexOf("(L)") == -1) {
			links[i] = $(this).attr("href");						
			i ++;
		}
		
	});
	var threadIDs = new Array();
	for(j=0;j<links.length; j++) {
		var start = links[j].indexOf("showthreads") + "showthreads-".length;
		
		var end = links[j].indexOf("+") - start;
		str += links[j].substr(start, end) + "\n";
		var temp = links[j].substr(start, end);
		var newStart = temp.lastIndexOf("-") + 1;
		var newEnd = temp.length - newStart;
		threadIDs.push(temp.substr(newStart, newEnd));
	}
	var k = 0;
	$(mainTable + " tr.forumrow").slice(1).each(function() {
		var edit = "http://www.frendz4m.com/forum/edit.php?forumID="+getForumID()+"&ID="+threadIDs[k]+"&start=0";
		$(this).append("<a class='edit' href='"+edit+"'><b>Edit</b></a>");
		k ++;
	});
	
	$("a.edit").css("width","200px").css("height","200px").css("background-color","#dfedff");
	
	editThread();

});