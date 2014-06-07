// ==UserScript==
// @name          Digg History Search
// @namespace     http://jackyyll.com/digghistorysearch.user.js
// @description   Let's you search through your Digg History using Brian Shaler's Digg Oracle
// @include       http://digg.com/search*
// ==/UserScript==

(function () {
	function getElementsByClass(searchClass,tag) {
		var classElements = new Array();
		node = document;
		if ( tag == null )
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}

	function getActiveTab() {
		var active = getElementsByClass("active", "li")[0].innerHTML;
		if (active.match(/All/)) return "All"
		if (active.match(/News/)) return "News"
		if (active.match(/Videos/)) return "Videos"
		if (active.match(/Podcasts/)) return "Podcasts"
		if (active.match(/History/)) return "History"
	}

	function setActiveTab(tab) {
		var extranav = getElementsByClass("extra-nav", "div")[0];
		var list = extranav.getElementsByTagName("li");
		for (var i=0; i < list.length; i++) {
			if (list[i].className == "active" && list[i].innerHTML.match(tab) != true) {
				list[i].className = null;
			}
			if (list[i].innerHTML.match(tab)) {
				list[i].className = "active";
			}
		}
	}

	var user = document.getElementById("section-profile");
	user = String(user).split("/");
	user = user[user.length-1];
	var divhtml = '\
		<div id="searchform">\n\
			<div class="extra-nav">\n\
		    	<h2>Search Digg</h2>\n\
		        <ul>\n\
					<li><a href="/search?section=podcasts&amp;s=">Podcasts Search</a></li>\n\
					<li><a href="/search?section=videos&amp;s=">Videos Search</a></li>\n\
					<li><a href="/search?section=news&amp;s=">News Search</a></li>\n\
					<li><a href="/search?section=all&amp;s=">All</a></li>\n\
	    			<li class="active"><a href="http://#history">History Search</a></li>\n\
		        </ul>\n\
		        <br />\n\
		  	</div>\n\
			&nbsp;\n\
		    <iframe src="http://brian.shaler.name/digg/oracle/index.php?user='+user+'" \
		      frameborder="0" width="100%" height="1280"/>\n\
		</div>\n\
		\n\
		<script type="text/javascript"><!--\n\
		google_ad_channel = "1931853067";\n\
		//--></script>\n\
		<div id="search_ad" class="stacked_ad_unit"></div>';
	var nav = getElementsByClass("extra-nav", "div")[0];
	var list = nav.getElementsByTagName("ul")[0];
	list.innerHTML = list.innerHTML + '<li><a href="http://#history">History Search</a></li>';

	document.addEventListener("click", function(event) {
		if (event.target == "http:///#history") {
			event.stopPropagation();
			event.preventDefault();
			if (getActiveTab() != "History") {
				setActiveTab("History");
				var wrapper = document.getElementById("wrapper");
				wrapper.innerHTML = divhtml;
			}
		}
	}, true)
})();