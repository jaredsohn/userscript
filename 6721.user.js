// ==UserScript==
// @name           MusicBrainz links at Last.fm
// @description    Adds MusicBrainz links to Last.fm artist pages
// @include        http://www.last.fm/music/*
// ==/UserScript==

var name = document.getElementById('LastHeadline').childNodes[1].childNodes[0].textContent;
var link = '<a href="http://musicbrainz.org/search/textsearch.html?query='+name+'&type=artist">MusicBrainz</a>';
var featurepanel = document.getElementById('c_featurepanel');
if (featurepanel) {
    var li = document.createElement('li');
    li.innerHTML = link;
    featurepanel.childNodes[1].childNodes[3].childNodes[1].appendChild(li);
}
else {
    var simpanel = document.getElementById('f_simpanel');
    featurepanel = document.createElement('div');
    featurepanel.innerHTML = '<div id="featurepanel" class="lastPanel"><div class="h" id="h_featurepanel">' + 
        '<h2>Artist Details</h2>' +
		'<a href="javascript:;" class="tog collapseTog" id="statetog_featurepanel" title="Collapse Panel"  onclick="return collapseBox(\'featurepanel\', this)" onfocus="blur()"></a>' +   
		'<br style="clear:both;" />' +
        '</div><div class="c" id="c_featurepanel"><dl class="sidebarInfoList">'+
        '<dt>Links:</dt><dd><ul><li>'+link+'</li></ul></dd></dl>'+
        '</div><div class="f" id="f_featurepanel"> <span class="iesucks" style="display:block;">&nbsp;</span></div></div>';
    simpanel.parentNode.insertBefore(featurepanel, simpanel.nextSibling);
}


