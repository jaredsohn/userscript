// ==UserScript==
// @name           waffles.fm utorrent interface
// @namespace      moozilla
// @include        http://waffles.fm/*
// ==/UserScript==

var interfaceUrl = "http://127.0.0.1:8080/gui/";
var wafflesLabel = "Waffles";

var wafflesUrl = "http://waffles.fm/";

var uticon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAMpJREFUKM9jYGBgmL1iO5GIAaL6/suPIPTiPT4EVpNW2Q/VkLAhgWEeKx4EVICiASHXxwJC0xhBCM4GS2HT0MfyHwwgShHsQaAB6MX55xdA2AazDCHewKcBAt5/f49sCZoGHhDq44KoaNjX6rDQw2CeBZABRAyTuIGyqBrmSoBQjxjUyB4xqAgSQtOgB0K9WvvvnQYiIAMqgoRQNawPAKG1/gzLfUAIyICIICEUDSCH3q7Hg4AKUDTgRC/e33v2Fo5AGoAASBGJgIoByFqh5bQ7r3UAAAAASUVORK5CYII%3D";

if(location.href.match(/userdetails\.php\?id=\d+&seeding=1/)) {

var newCss = ".filelist a:hover span { display: none ;} .filelist a div { display:none; position: absolute; right:8em; text-decoration:none; color: #000; cursor: default; border:1px solid #000; background-color:#E4ADED; padding:.5em;} .filelist a:hover div { display: block ;}";
addGlobalStyle(newCss);

doWafflesTorrents();

}

if(location.href.match(/snatches.php/)) {

allElems = document.evaluate(
   '//table[@cellpadding=5]',
   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allElems.snapshotLength; i++) {
    thisElem = allElems.snapshotItem(i);
    var trs = thisElem.rows;
    for (var i = 0; i < trs.length; i++) {
        var row = trs[i];
        var cell = document.createElement('td');
        if (i==0) {
            cell.setAttribute('class','colhead');
            cell.setAttribute('align','center');        
            cell.innerHTML = 'Download Torrent';
        } else {
            var matches = row.innerHTML.match(/<a href="(details\.php\?id=\d+)">/)
            if (matches) {
                var theUrl = wafflesUrl + matches[1];
                doSnatches(theUrl, cell);
            }
        }
        row.appendChild(cell);
    }        
}

}

if(location.href.match(/bookmarks.php/)) {

allElems = document.evaluate(
   '//table[@cellpadding=5]',
   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allElems.snapshotLength; i++) {
    thisElem = allElems.snapshotItem(i);
    var trs = thisElem.rows;
    for (var i = 0; i < trs.length; i++) {
        var row = trs[i];
        var cell = document.createElement('td');
        if (i==0) {
            cell.setAttribute('class','colhead');
            cell.setAttribute('align','center');        
            cell.innerHTML = 'Download Torrent';
        } else {
            var matches = row.innerHTML.match(/<a href="\/(download\.php\/\d+\/\d+\/.+\.torrent)">/);
            if (matches) {
                var theUrl = wafflesUrl + matches[1];
                doBookmarks(theUrl, cell);
            }
        }
        row.appendChild(cell);
    }        
}

}

if(location.href.match(/details.php/)) {
allElems = document.evaluate(
   '//a[@class="index"]',
   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var link = allElems.snapshotItem(0);
	var span = document.createElement('span');
	span.setAttribute('style', 'float:right');
	var lnk = document.createElement('a');
    lnk.href = interfaceUrl + '?action=add-url&s=' + escape(link.href);
	lnk.style.display = 'block';
	lnk.style.textAlign = 'center';
	appendIcon(lnk);
	span.appendChild(lnk);
	link.parentNode.insertBefore(span, link);
}

function addTorrents(torrents) {

allElems = document.evaluate(
   '//td[@class=\'rowhead\']',
   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allElems.snapshotLength; i++) {
    thisElem = allElems.snapshotItem(i);
    if (thisElem.innerHTML.match('Seeding torrents')) {
        var tbl = thisElem.parentNode.childNodes[1].firstChild.firstChild;
        for (var j = 0; j < tbl.childNodes.length; j++) {
            var row = tbl.childNodes[j];
            if(row.innerHTML) {
                var cell = document.createElement('td');
                var cell2 = document.createElement('td');
                if (j==0) {
                    cell.setAttribute('class','colhead');
                    cell.setAttribute('align','center');        
                    cell.innerHTML = 'Torrent Name';
                    cell2.setAttribute('class','colhead');
                    cell2.setAttribute('align','center');        
                    cell2.innerHTML = 'File List';
                } else {
                    var torrentName = "Not Found";
                    var regex = /<b>(.+?) - (.+?) \[.+\]/;
                    if (row.childNodes[2].innerHTML.match(regex)) {
                        var album = row.childNodes[2].innerHTML.match(regex)[2];
                        var albumRegex = new RegExp(album.replace(/\s\(.+\)/,'').replace(/((T|t)(H|h)(E|e))?[^a-zA-Z0-9]+/g, '.*'), 'gi');
                        
                        var matched = false;
                        for (var k = 0; k < torrents.length; k++) {
                            if(torrents[k][2].match(albumRegex)) {
                                torrentName = torrents[k][2];
                                var theUrl = interfaceUrl+'?action=getfiles&hash=' +  torrents[k][0];
                                var div = document.createElement('div');
                                div.setAttribute('style','border: 1px solid #000; padding: .5em; margin: 1em; line-height: 1.2em');
                                //row.childNodes[2].appendChild(div);//row.childNodes[2].appendChild(div);
                                doFiles(theUrl, cell2);
                                matched = true;
                                break;
                            }
                        }
                        /*
                        if(!matched) {
                            for (var k = 0; k < torrents.length; k++) {
                                alert("Torrent: " + torrents[k][2] + "\nRegex: " + albumRegex + "\nMatch: " + (torrents[k][2].match(album)) );
                            }
                        }
                        */
                    }
                    cell.innerHTML = torrentName;
                }
                row.appendChild(cell);
                row.appendChild(cell2);
            }
        }
    }
}

}

function doWafflesTorrents() {
    GM_xmlhttpRequest({
      method:"GET",
      url:interfaceUrl+"?list=1",
      headers:{
        "User-Agent":navigator.userAgent,//"Mozilla/5.0",
        "Accept":"text/xml"
      },
      onload:function(response) {
        if(response.status == 200 && response.readyState == 4) {
            eval("var utorrent = " + response.responseText);
            var torrents = utorrent.torrents.filter(isWaffles);
            addTorrents(torrents);
        }
        // if you need a responseXML
        //var responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
      }
    });
}

function doFiles(theurl,obj) {
    GM_xmlhttpRequest({
      method:"GET",
      url:theurl,
      headers:{
        "User-Agent":navigator.userAgent,//"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
        "Accept":"text/xml"
      },
      onload:function(response) {
        if(response.status == 200 && response.readyState == 4) {
            eval("var tfiles = " + response.responseText);
            obj.innerHTML += fileList(tfiles.files[1]);
            //var torrents = utorrent.torrents.filter(isWaffles);
            //addTorrents(torrents);
        }
        // if you need a responseXML
        //var responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
      }
    });
}

function doSnatches(theurl,obj) {
	/*
	var lnk = document.createElement('a');
	lnk.href = 'javascript:void()';
	lnk.style.display = 'block';
	lnk.style.textAlign = 'center';
	
	var handler = makeTorrentHandler(theurl);
	lnk.addEventListener('click', handler, true);
	
	appendIcon(lnk);
	obj.appendChild(lnk);*/

    GM_xmlhttpRequest({
      method:"GET",
      url:theurl,
      headers:{
        "User-Agent":navigator.userAgent,
        "Accept":"text/xml"
      },
      onload:function(response) {
        if(response.status == 200 && response.readyState == 4) {
            var torrentUrlRegex = /<a class="index" href="\/(download\.php\/\d+\/\d+\/.+?\.torrent\?passkey=[0-9a-f]+&uid=\d+)">/;
            var matches = response.responseText.match(torrentUrlRegex);
            if (matches) {
                var theUrl = wafflesUrl + matches[1];
                var lnk = document.createElement('a');
                lnk.href = interfaceUrl + '?action=add-url&s=' + escape(theUrl);
                lnk.style.display = 'block';
                lnk.style.textAlign = 'center';
                appendIcon(lnk);
                obj.appendChild(lnk);
            }
            //eval("var tfiles = " + response.responseText);
            //obj.innerHTML += fileList(tfiles.files[1]);
            //var torrents = utorrent.torrents.filter(isWaffles);
            //addTorrents(torrents);
        }
      }
    });
}

function doBookmarks(theUrl, obj) {
	var lnk = document.createElement('a');
	lnk.href = interfaceUrl + '?action=add-url&s=' + escape(theUrl);
	lnk.style.display = 'block';
	lnk.style.textAlign = 'center';
	
	appendIcon(lnk);
	obj.appendChild(lnk);
}

/*
function makeTorrentHandler(url) {
	var test = null;
	//alert(uneval(addTorrent));
	eval('test = function(event){ajaxAddTorrent(\''+url+'\');}');
	return test;
}

function ajaxAddTorrent(theurl) {
	var req = new XMLHttpRequest();
	req.onload = function() {
        if(req.status == 200 && req.readyState == 4) {/*
            var torrentUrlRegex = /<a class="index" href="\/(download\.php\/\d+\/\d+\/.+?\.torrent\?passkey=[0-9a-f]+&uid=\d+)">/;
            var matches = response.responseText.match(torrentUrlRegex);
            if (matches) {
                var theUrl = interfaceUrl + '?action=add-url&s=' + wafflesUrl + matches[1];/*
				    GM_xmlhttpRequest({
					  method:"GET",
					  url:theUrl,
					  headers:{
						"User-Agent":navigator.userAgent,
						"Accept":"text/xml"
					  },
					  onload:function(response) {
						if(response.status == 200 && response.readyState == 4) {
							alert('Torrent added successfully.');
						}
					  }
					});* /
				alert(theUrl);
            }* /
			alert(req.responseText);
        }
      };
	alert(req.onload);
	req.open("GET", theurl, true);
    req.send(true);
}*/

function isWaffles(obj) {    
    return obj[11] == wafflesLabel;
}

function fileList(files) {
    var ret = '<div class="filelist"<a href="#no"><span>show</span><div>';
    for(var i = 0; i < files.length; i++) {
        ret += (i+1) + '. ';
        ret += files[i][0];
        ret += '<br/>\n';
    }
    ret += '</div></a></div>';
    return ret;
}

function appendIcon(parent) {
	var img = document.createElement('img');
	img.src = uticon;
	img.style.border='1px solid #000';
	parent.appendChild(img);
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