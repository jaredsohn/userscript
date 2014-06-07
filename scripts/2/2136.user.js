// ==UserScript==
// @name          360 Tagging 
// @namespace     http://premshree.org/userscripts
// @description	  Gives 360 tagging functionality 
// @include       http://*.360.yahoo.com/*
// ==/UserScript==

/*
 * $premshree$ $2005-11-12 14:49$
 */

/* you need to add your del.icio.us user/pwd here */
/* This script makes a HTTP GET request to premshree.org,
   which means your username and password gets logged in
   the access logs. I don't care for your usernamexs and
   password, but you certainly should. You might want to
   get the source of the PHP proxy from
   http://premshree.org/delicious.phps, and set it up
   on your box or something. If that's what you intend
   to do, remember to change the value of gm_proxy
   (below) to point to the correct location. */
var user = "[username here]";
var pwd = "[password here]";

var gm_proxy = "http://premshree.org/delicious.php";

window.addTags = function(url, desc, tags) {
	var action = "post";
	var req_url = gm_proxy + "?user=" + user + "&pwd=" + pwd + "&action=" + action
			+ "&tags=" + tags + "&url=" + url + "&desc=" + desc;
	MyGM_xmlhttpRequest(req_url);
	return false;
}

window.successAlert = function() {
	alert("Success!");
}

window.getPermalinkTags = function(permalink, i) {
	var action = "get";
	var req_url = gm_proxy + "?user=" + user + "&pwd=" + pwd + "&action=" + action
			+ "&url=" + permalink;
        GM_xmlhttpRequest ( {
                method: "GET",
                url: req_url,
                headers: [{'Content-type': 'application/x-www-form-urlencoded'}],
                onload: function(details) {
                        if (details.readyState == 4) {
                                var text = details.responseText;
				text = (text.split("\n").length>1) ? text.split("\n")[0] : "";
				if (text != "") {
					var tags = text.split(" ");
					for (j=0; j<tags.length; j++) {
						tags[j] = '<a href="?tag='+tags[j]+'">' + tags[j] + '</a>';
					}
					text = tags.join(" ");
					var html = "<span>Tags: " + text + "<br /></span>";
					foots[i].innerHTML = html + foots[i].innerHTML;
				}
                        }
                }
        } );

} 

window.MyGM_xmlhttpRequest = function(url, data) {
	GM_xmlhttpRequest ( {
		method: "GET",
		url: url,
		headers: [{'Content-type': 'application/x-www-form-urlencoded'}],
		onload: function(details) {
			if (details.readyState == 4) {
				successAlert();
			}
		}
	} );
}

var loc = location.href;
if (loc.split("?").length > 1) {
	var args = loc.split("?")[1].split("=");
	if (args[0] == 'tag') {
		var tag = args[1];
		var action = 'geturls';
		var req_url = gm_proxy + "?user=" + user + "&pwd=" + pwd + "&action=" + action
				+ "&tag=" + tag;  
	        GM_xmlhttpRequest ( {
                	method: "GET",
               		url: req_url,
                	headers: [{'Content-type': 'application/x-www-form-urlencoded'}],
                	onload: function(details) {
                      		if (details.readyState == 4) {
					var divs = document.getElementsByTagName('div');
					for (var i=0; i<divs.length; i++) {
						if (divs[i].className == 'body') {
							mainDiv = divs[i];
						}
					}
                                	var text = details.responseText.split("\n");
					var html = "<dt>Posts Tagged: " + tag + "</dt>";
					for (var i=0; i<text.length; i++) {
						var dt = text[i].split("%%")[0];
						var dd = text[i].split("%%")[1];
						html += '<dt><a href="' + dd + '">' + dt + '</dt>' + "\n";
					}
					mainDiv.innerHTML = html;	
                        	}
                	}
        	} );
	}
}

var divs = document.getElementsByTagName('DIV');
var foots = new Array();
var titles = document.getElementsByTagName('dt');
for (var i=0; i<divs.length; i++) {
	if (divs[i].className=='foot') {
		foots[foots.length] = divs[i];
	}
}
for (var i=0; i<foots.length; i++) {
	var footText = foots[i].getElementsByTagName('span')[0].innerHTML;
	var as = foots[i].getElementsByTagName('a');
	var permalink = (as.length==4) ? as[3].getAttribute('href') : as[2].getAttribute('href');
	var permalink_tags = getPermalinkTags(permalink, i);
        var addTagText = '<form method="POST" enctype="application/x-www-form-urlencoded" action="" onsubmit="addTags(this.url.value, this.desc.value, this.tags.value); return false;">';
        addTagText += '<input type="hidden" name="url" value="'+permalink+'" />';
	addTagText += '<input type="hidden" name="desc" value="'+titles[i].innerHTML+'" />';	
	addTagText += '<input type="text" name="tags" value="" />';
	addTagText += ' <input type="submit" value="Add Tags" class="inactive" />';
	addTagText += '</form>';
	foots[i].getElementsByTagName('span')[0].innerHTML = footText + addTagText;
}

