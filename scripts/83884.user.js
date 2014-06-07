// ==UserScript==
// @name           FlickrDeleteFromGroups
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*/*
// ==/UserScript==

var adminGroups = new Array;
var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oIERI2GVVxoHkAAADqSURBVCjPfdLNSgNRDAXgD/EhighjW1Csts9baTc+jgvrSgVb/KGP4STXxdxpRxcGLlnkJCfn5EpGySqZQDpGqTlogmVwJlkHJXhPFtDWV5uugpegJPeCafCRXdO+5bZnaLmsg0rFTPvComVfC9uWJjkPnvtBPfuBumWe7CrgMXmoq26TedVyENXni+Qpu31Lsmlphmac+h1t4Xto1MkfwKEzuQ5eByttKss2qhExaJoFnxXwFp3oJthVO/fRiw7GVVgJvoLZYNC8gkt29k4ky546uenXjOPhFoM7rQSj4C4Z//M1psE6Gf0ABdugKgi/1GUAAAAASUVORK5CYII='
parsePage=function(){
	var scriptTags = document.getElementsByTagName('script');
	for (i=0;i<scriptTags.length;i++) {
		var re=/var\ yconf\ \=\ \{/m;
		if (re.test(scriptTags[i].innerHTML)) {
			arr = scriptTags[i].innerHTML.split('\n');
			start = 0;
			end = 0;
			for (j=0;j<arr.length;j++) {
				if (arr[j].match(/^F\.intl\ \=\ /))
					start = j+1;
				if (arr[j].match(/\s+YUI\(yconf\)/))
					end = j-1;
			}
			eval(arr.slice(start,end).join('\n'));
		}
	};
	return(yconf);
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
}
addGlobalStyle('#group-placeholder { display:none !important }');
addGlobalStyle('li.sidebar-context-pool { display:block !important }');
addGlobalStyle('img.deleteicon {display:inline;float:right;margin-top:8px}');
addGlobalStyle('#sidebar-contexts li a.context-link {width:280px}');
addGlobalStyle('#sidebar-contexts li.sidebar-context-open a.context-link {width:280px}');
addGlobalStyle('#sidebar-contexts li .context-header {width:292px}');

// Get necessary keys, tokens, hashes etc.
var yconf = parsePage();
// retrieve 
var url = 'http://www.flickr.com/add_to_group_fragment.gne?id='+yconf.flickr.photo.id+'&cachebust='+(new Date()).getTime();
GM_xmlhttpRequest({
	method:"GET",
	url:url,
	onload:function (response) {
		var tempNode = document.createElement("div");
		tempNode.innerHTML = response.responseText;
		adgrp = tempNode.getElementsByTagName('li');
		for (var n in adgrp) {
			if (adgrp[n].getAttribute('data-group-id') != null) {
				adminGroups[adgrp[n].getAttribute('data-group-id')] = 1;
			}
		}
		if (document.getElementById('secondary-contexts') === null) { return; }
		ul = document.getElementById('secondary-contexts');
		var picgroups = ul.getElementsByTagName('li');
		for (var i in picgroups) {
			if (adminGroups[picgroups[i].getAttribute('data-context-group_id')] == 1) {
				var img = document.createElement('img');
				img.setAttribute('src',icon);
				img.setAttribute('class','deleteicon');
				img.setAttribute('data-context-group_id',picgroups[i].getAttribute('data-context-group_id'));
				picgroups[i].insertBefore(img,picgroups[i].getElementsByClassName('context-header')[0]);
				img.addEventListener('click', deletefromgroup, true);
			}
		}
	}
});

function deletefromgroup (e) {
	var myid = this.getAttribute('data-context-group_id');
	url = 'http://www.flickr.com/services/rest/?method=flickr.groups.pools.remove&photo_id='+yconf.flickr.photo.id+'&group_id='+this.getAttribute('data-context-group_id')+'&api_key='+yconf.flickrAPI.api_key+'&auth_hash='+yconf.flickrAPI.auth_hash;
	GM_xmlhttpRequest({
		method:"GET",
		url:url,
		onload:function (response) {
			console.log(response);
			ul = document.getElementById('secondary-contexts');
			var picgroups = ul.getElementsByTagName('li');
			for (var i in picgroups) {
				if (picgroups[i].getAttribute('data-context-group_id')==myid) {
					document.getElementById('secondary-contexts').removeChild(picgroups[i]);
					return;
				}
			}
		}
	});
}
