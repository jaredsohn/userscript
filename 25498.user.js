// ==UserScript==
// @name           Dilbert.com No Flash
// @namespace      http://manuelseeger.de
// @description    Replaces the Flash embedded strip with the plain GIF image on dilbert.com
// @include        http://*dilbert.com*
// ==/UserScript==

(function() {
// my very favorite helper
function xpath(node, expr) {
	var resultSet =  document.evaluate(expr, node, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var found = [];
	var res;
	for (var i = 0; i < resultSet.snapshotLength; i++) {
		found.push(resultSet.snapshotItem(i));
	}
	return found;
}



//
// Edit (24 Apr 2008):
//
// that was fast. Two days in and they removed the Flash navigation.
/*
var menuBackground = "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAqCAIAAAAbNW1vAAAABGdBTUEAALGPC/xhBQAAAF1JREFU"+
					"KFPV0KEOQGAAReHDJpmgi6Iqy5rtn80DiJosS6oseQPvp3GKB/ClU++NQgg8LuEUDmEXNmEVFmEW"+
					"JmEUBqETWqERaqESSqEQciETUiERYiGS98Bf1feEXm6FV13XPnm1QQAAAABJRU5ErkJggg==";


//
// remove navigation flash:
//
//var script = xpath(document.body, "/html/body/div/div/script")[0];
var nav = document.getElementById("SiteNav");

var oldNav = document.createElement("div");
oldNav.setAttribute("id", "SiteNav2");
oldNav.style.paddingTop = "100px";
oldNav.innerHTML = '<ul><li><a href="/">Home</a></li>' +
						'<li><a href="/most_popular/">Most Popular</a></li>'+
						'<li><a href="/strips/">Strips</a></li>'+
						'<li><a href="/animation/">Animation</a></li>'+
						'<li><a href="/mashups/">Mashups</a></li>'+
						'<li><a href="/blog/">Blog</a></li>'+
						'<li><a  href="http://widget.dilbert.com/">Widgets</a></li></ul>'+
						'<style type="text/css">'+
						'#SiteNav2 ul li { display:inline;margin-left:4em;}' +
						'#SiteNav2 a { color:white;letter-spacing:110%;font-weight:400;'+
						'				font-size:large; text-decoration:none;}' +
						'#SiteNav2 ul { padding:1em 1em 1em 0;'+
						'				background-image:url(data:image/png;base64,'
										+menuBackground+');' +
						'			background-repeat: repeat-x;text-transform:uppercase;}'+
						'</style>'+
						'';
nav.parentNode.appendChild(oldNav);
nav.parentNode.removeChild(nav);
*/
//
// remove strip viewing flash
//
var strip_flash = document.getElementById("FeaturedStrip");
if (strip_flash) {

	// get script ID
	var stripId = xpath(strip_flash, "//param[@name = 'flashvars']/@value")[0];

	stripId = stripId.nodeValue.split("?StripID%3D")[1];
	stripId = stripId.split("%26")[0];
	
	var idLength = stripId.length;
	var stripClass = parseInt(stripId[0]);
	
	var subId2 = stripId[0] + "00";
	if (stripId.length < 4) {
		var subId1 = "0000";
	} else {
		var subId1 = stripId[0] +"000";
	}
	
	
	// get possible sources: 
	//
	// if someone could find a definite pattern for these sources, that 
	// would be terrific...
	//
	var src1 = "http://dilbert.com/dyn/str_strip/000000000/00000000/0000000/000000/00000/"
													+subId1+"/"+subId2+"/"
													+stripId+"/"+stripId+".strip.gif";

	// determine weekday
	var sunday = false;
	var dateNode = xpath(document.body, "//h1")[0];
	if (dateNode) {
		// archive
		var dateStr = dateNode.textContent.replace("STRIP FOR ","");
		var date = new Date(Date.parse(dateStr));
		
		if (date.getDay() == 0) {
			// fucking sunday...
			sunday = true;
		}	else {
			sunday = false;
		}
	} else {
		// start page
		if (new Date().getDay == 0) {
			sunday = true;
		} else {
			sunday = false;
		}
	}
	if (sunday) {
		var container = document.createElement("div");
		container.style.width="644px;";
		container.style.paddingTop = "1em;";
		container.innerHTML = '<img src="'+src1+'"/>' + 
							'<img src="'+src1+'" style="margin-left:-665px"/>'+
							'<img src="'+src1+'" style="margin-left:-1329px"/>';

		strip_flash.parentNode.insertBefore( container, strip_flash);
	} else {
		// week day
		var img1 = document.createElement("img");
		
		img1.setAttribute("src", src1);
		
		img1.style.margin = "1.5em;"

		strip_flash.parentNode.insertBefore( img1, strip_flash);
		
	}
	strip_flash.parentNode.removeChild(strip_flash);
}
})();