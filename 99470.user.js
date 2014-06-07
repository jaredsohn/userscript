// ==UserScript==
// @name          TvTorrents, Direct download link
// @description   Adds a regular HTML link on the torrent info page to download a torrent file.
// @include       http://tvtorrents.com/loggedin/torrent.do?info_hash=*
// ==/UserScript==

//Parse infoHash
var infoHash_container = document.getElementById('torrentBox');
if (infoHash_container != null) { 
    var hashValues = infoHash_container.innerHTML;   
    var hashMatches = hashValues.match(/getBox\(this,\'(.*)\',\'torrent_completed/);
    infoHash = hashMatches[1];
}
//Parse digest
var scripts = document.getElementsByTagName('script');
//Go through script sections until "digest=" is found
for ( var i = scripts.length-1; 0 <= i;--i) {
     scriptValues = scripts[i].innerHTML;
     digest = scriptValues.match(/digest=\'(.*)\';/);     
     if ( digest != null ) {
        digest = digest[1];
        break;
     }
}

//Construct URL
url = "http://torrent.tvtorrents.com/FetchTorrentServlet?info_hash="+infoHash+"&digest="+digest;
// create our div and align it to right
var recentDiv = document.createElement('div');
recentDiv.setAttribute('class', 'right')

// create our link
var recentLink = document.createElement('a');
recentLink.href = url;

// add text to our link
var recentDivContent = document.createTextNode('Direct download');
recentLink.appendChild(recentDivContent);

var form = document.getElementsByTagName('form')[3]; //Form that has download buttons
//Construct HTML inside our div
recentDiv.innerHTML = '<hr> <font class="head"><a class="list" style="font-size:15px;" href='+url+'>Direct Download</a></font>';
//Add direct download link next to the "add 2 rss" button.
form.parentNode.insertBefore(recentDiv,form);
