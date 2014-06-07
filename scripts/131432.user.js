// ==UserScript==
// @name           Moderate Threads
// @namespace      http://userscripts.org/scripts/review/37933
// @include        http://www.frendz4m.com/forum/showforums*
// @require	   http://code.jquery.com/jquery-1.7.2.min.js
// @author	   c.P.u1
// ==/UserScript==

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
		var start = links[j].indexOf("showthreads") + 17;
		var end = links[j].indexOf("+") - start;
		str += links[j].substr(start, end) + "\n";
		threadIDs.push(links[j].substr(start, end));
	}
	var k = 0;
	$(mainTable + " tr.forumrow").slice(1).each(function() {
		$(this).append("<td><input type='button' name='move"+k+"' value='Move Thread' id='" + threadIDs[k] + "' /></td>");
		$(this).append("<td><input type='button' name='lock"+k+"' value='Lock Thread' id='" + threadIDs[k] + "' /></td>");
		$(this).append("<td><input type='button' name='delete"+k+"' value='Delete Thread' id='" + threadIDs[k] + "' /></td>");			
		k ++;
	});
	
	$("input[name^=move]").click(function() {
		location.href="http://www.frendz4m.com/forum/movethread.php?ID=" + $(this).attr("id");
	});
	$("input[name^=delete]").click(function() {
		location.href="http://www.frendz4m.com/forum/deletepost.php?ID=" + $(this).attr("id");
	});
	$("input[name^=lock]").click(function() {
		location.href="http://www.frendz4m.com/forum/lockthread.php?ID=" + $(this).attr("id");
	});



});