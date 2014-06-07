// ==UserScript==
// @name			4chan - quick and dirty exifdata hack
// @namespace		9001
// @description		Adds buttons to search exifdata.com
// @include			http://boards.4chan.org/*
// ==/UserScript==

// this currently only works on chrome..
// if you can get this to work on firefox, contact me.
/*
function submitexif(url) {
	var exifform = document.createElement("form");
	exifform.method = "POST";
	exifform.action = "http://exifdata.com/exif.php";
	exifform.target = "_blank";
	
	var picurl = document.createElement("input");
	picurl.name = 'picurl';
	picurl.type = 'hidden';
	picurl.value = url;
	exifform.appendChild(picurl);
	
	exifform.submit();
}

function exifupdate() {
	var spans=document.getElementsByTagName("span");
	for (i=0; i<spans.length; i++) {
		if(spans[i].className == "filesize") {
			var check = spans[i].getElementsByClassName("exifdata");
			if(check.length == 0) {
				var url = spans[i].getElementsByTagName("a")[0].href;
				var exifdatalink = " <a name=\""+j+"\" href=\"#\" class=\"exifdata\" onClick=\"submitexif('"+url+"');\">Exifdata</a>";
				spans[i].innerHTML+= exifdatalink;
			}
		}
	}
}

var j=0;
exifupdate();
setInterval('exifupdate();',500);
*/