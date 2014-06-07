// ==UserScript==
// @name        View All Profile Comments
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Allows you to see all of the current user's profile comments with one click!
// @include     http://www.onverse.com/*
// @version     1
// ==/UserScript==

window.viewAllComments = function viewAllComments(comments) {
    window.findingComments = false;
    if(!comments) {
        alert('No comments to be viewed.');
        return;
    }
    window.allComments = comments;
    if(!document.getElementById('allComments')) {
        var lah = document.createElement('div');
        lah.innerHTML = '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0;"><div id="allComments" style="width: 80%; margin: 0 auto; height: 100%; background-color: white; overflow: auto;"></div></div>';
        document.body.appendChild(lah);
    }
    // Insert them here
    document.getElementById('allComments').innerHTML = '<button onclick="document.body.removeChild(document.getElementById(\'allComments\').parentNode.parentNode);" style="float: right;">Close</button><div style="text-align: center;">' + window.countComments + ' Clicks Saved!</div>' + comments;
}
window.findAllComments = function findAllComments() {
    var url = arguments[0] || "http://www.onverse.com/profile/ajax/getComments.php?id=" + (/\d+$/).exec(document.getElementsByClassName('sideNav')[0].parentNode.parentNode.getElementsByTagName('img')[0].src) + "&last=0";
    var comments = arguments[1] || "";
	window.countComments = window.countComments + 1 || 0;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
    	if(ajax.readyState == 4 && ajax.status == 200) {
			var a = document.createElement('body');
			a.innerHTML = ajax.responseText;
            if(a.getElementsByClassName('more')[0]) {
               var next = (/^\d+/).exec((/\d+\);">More<\/a><\/div>$/).exec(a.innerHTML)); 
               a.removeChild(a.getElementsByClassName('more')[0]);
               comments += a.innerHTML;
               findAllComments((/^.+last=/).exec(url) + next, comments);
            }
            else {
                // No more to search for
                // Place them in view
                viewAllComments(comments+a.innerHTML);
            }
		}
	}
	ajax.open("GET", url, true);
	ajax.send(null);
}
var a = document.getElementsByClassName('sideNav');
if(a.length > 0) {
    var b = document.createElement('a');
    b.href = "javascript:(function(){if(window.findingComments){alert('Please wait, this takes some time!'); return;}window.findingComments = true; if(window.allComments)viewAllComments(window.allComments);else findAllComments();})();";
    b.innerHTML = "View All Profile Comments";
    a[0].appendChild(b);
}