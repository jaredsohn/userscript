// ==UserScript==
// @name           What Genre?
// @namespace      google.com
// @description    Describes genres on what.cd with descriptions from last.fm
// @include        http*://*what.cd/torrents.php?*taglist=*
// ==/UserScript==
var lastkey = '3a8d4a41940d14a87b0ede947870e93c'; //Don't steal me, please :(

var genre = unescape(/taglist=([^&]+)/.exec(window.location.search)[1]).replace(/\./g, ' ');
if (genre.indexOf(',') >= 0) { }
else {

//Create a placeholder to put the information into
var content = document.createElement('div');
content.className = 'tagDescription'; //In case you want to style it :)
content.innerHTML = '<!-- Heading --> \
<div class="head colhead_dark"> \
	<strong>'+genre+'</strong> \
	<a href="#" onclick="$(\'#vanityhouse\').toggle();return false;">(View)</a> \
</div> \
 \
<div style="height:30em; overflow:scroll" class="box hidden" id="vanityhouse"><!--Container-->\
<div id="recommended"> \
<p>Loading genre information from Last.fm, please wait...</p> \
\
<div style="width:100%; position:relative;">\
<div style="position:absolute; left:5%;top:0">\
<h3>Top Artists</h3>\
<ul></ul> <!--Top Artists--> \
</div> \
\
<div style="position:absolute; right:55%; top:0"> \
<h3>Similar Tags</h3> \
<ul></ul> <!-- Similar Tags--> \
</div> \
\
</div>\
</div>\
</div>';

//Put it into the page
document.forms[6].parentNode.insertBefore(content, document.forms[6].nextSibling); //We're screwed if another search bar is added.
                                                                                            //Oh well.
//Query Last.fm about it

//Tag description
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.last.fm/tag/'+escape(genre)+'/wiki',
    onload: function(response) {
                var data = response.responseText;
                content.getElementsByTagName('p')[0].innerHTML = /\<div id="wiki"\>([^]+?)\<\/div\>/m.exec(data)[1];
    }
});

//Top Artists
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag='+escape(genre)+'&api_key='+lastkey,
    onload: function(response) {
                var parser = new DOMParser();
                var data = parser.parseFromString(response.responseText, "text/xml");
                
                var topArtists = '';
                var topArtistsTree = data.getElementsByTagName('artist');
                for (var i=0; i<topArtistsTree.length; i++) {
                    var thisArtist = topArtistsTree[i].getElementsByTagName("name")[0].firstChild.nodeValue;
                    topArtists += '<li><a href="artist.php?name='+escape(thisArtist)+'">';
                    topArtists += thisArtist;
                    topArtists += '</a></li>';
                }
                content.getElementsByTagName('ul')[0].innerHTML = topArtists;
    }
});

//Similar Tags
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://ws.audioscrobbler.com/2.0/?method=tag.getsimilar&tag='+escape(genre)+'&api_key='+lastkey,
    onload: function(response) {
                var parser = new DOMParser();
                var data = parser.parseFromString(response.responseText, "text/xml");
                
                var similarTags = '';
                var similarTagsTree = data.getElementsByTagName("tag");
                for (var i=0; i<similarTagsTree.length; i++) {
                    var thisTag = similarTagsTree[i].getElementsByTagName("name")[0].firstChild.nodeValue;
                    similarTags += '<li><a href="torrents.php?taglist=' + escape(thisTag.replace(/ /g,'.')) + '">';
                    similarTags += thisTag
                    similarTags += '</a></li>';
                }
                content.getElementsByTagName('ul')[1].innerHTML = similarTags;
    }
});

} //end if (genre.indexOf(',') >= 0)