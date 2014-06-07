// ==UserScript==
// @version    1.3
// @name       Erepublik Jobs Feed for Erepublik
// @namespace  http://erepjobs.tk
// @description  Display the Latest jobs available from Erepublik Jobs on your Erepublik homepage!
// @match      http://www.erepublik.com/*
// @exclude    http://www.erepublik.com/*/*
// @downloadURL		http://userscripts.org/scripts/source/171142.user.js
// @updateURL		http://userscripts.org/scripts/source/171142.meta.js
// @copyright  2013+, Mike Ontry
// ==/UserScript==

var p = unsafeWindow;
function waitForFeed() {
    if (typeof p.jobs=='undefined')
	// set to check every 100 milliseconds if the libary has loaded
        window.setTimeout(waitForFeed, 100);
    else
        // insert style into head
    	var style = document.createElement('style');
    style.innerHTML = '.erepJobs li {width: 318px; padding: 7px; float: left; clear: both; border-bottom: 1px solid #efeded; position: relative; }';
        document.getElementsByTagName('head')[0].appendChild(style);
    	// create container
    	var title_line = document.createElement('h1');
    	title_line.setAttribute("class", "noborder");
    	title_line.setAttribute("style", "clear:left");
    	title_line.innerHTML = "Latest Jobs Available on Erepublik Jobs"
		document.getElementsByClassName("column")[0].appendChild(title_line);
    	var container = document.createElement('div');
    	container.setAttribute('class', 'media_widget erepJobs');
    	container.innerHTML = '<div id="jobber-container"></div><a href="http://www.erepjobs.tk" target="_blank" class="more_news" title="More Jobs">More Jobs</a>';
        document.getElementsByClassName("column")[0].appendChild(container);
   
    	// display jobs
    	window.onload = showJobs("jobber-container", "citizenship_news");
    	var joblist = document.getElementById("jobber-container");
    	var item = joblist.getElementsByTagName("li");
    	var content = '';
        content = item[0].innerHTML;
        item[0].innerHTML = '<div class="article_entry erepJobs_items"><div>'+content+'</div>';   
        content = item[1].innerHTML;
        item[1].innerHTML = '<div class="article_entry erepJobs_items"><div>'+content+'</div>';
        content = item[2].innerHTML;
        item[2].innerHTML = '<div class="article_entry erepJobs_items"><div>'+content+'</div>';
        content = item[3].innerHTML;
        item[3].innerHTML = '<div class="article_entry erepJobs_items"><div>'+content+'</div>';
        content = item[4].innerHTML;
        item[4].innerHTML = '<div class="article_entry erepJobs_items"><div>'+content+'</div>';
        content = item[5].innerHTML;
        item[5].innerHTML = '<div class="article_entry erepJobs_items"><div>'+content+'</div>';
        content = item[6].innerHTML;
        item[6].innerHTML = '<div class="article_entry erepJobs_items"><div>'+content+'</div>';
}
function loadFeed() {
		// insert feed script into head
        var proto = document.createElement('script');
        proto.type = 'text/javascript';
        proto.src = 'http://erepjobs.tk/api/api.php?action=getJobs&type=0&category=0&count=7&random=0&days_behind=14&response=js';
        document.getElementsByTagName('head')[0].appendChild(proto);
        waitForFeed();
}
window.addEventListener('load', loadFeed(), false);