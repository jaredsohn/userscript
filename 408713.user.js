// ==UserScript==
// @name		迅雷云播 ed2k
// @namespace	
// @version		E.1.0
// @description	Add Xunlei Vod play button for search results.
// @include		*ED2000.COM*
// @include		http://donkey4u.com/search*
// @copyright	2013, Eric
// ==/UserScript==
GM_addStyle(".CommonListCell td div {margin-left: 10px; white-space: nowrap; !important; }");

var results = document.querySelectorAll('.CommonListCell>td>div,#btns')

for(var i in results) {
    var link = results[i].querySelector('a[href^=ed2k]');
    //document.write(results);
    if(link != undefined) {
        var a = document.createElement('a');
        a.class='vod';
        a.innerHTML = '<img src="http://fc04.deviantart.net/fs70/f/2014/001/8/d/xunleicloud_by_dyinginthesun-d70c6ut.png" style="float: left; margin: -13px 18px 0px -14px; boarder: 10px;">';
        a.href='http://vod.xunlei.com/nplay.html?uvs=274996076_5_24907A01C33BB5A9DEF9BF4354BAECF48527E43301A7AB80C2ADCC96B5B6D58524367D8538D61D73724AC06C1D7753A930CBB82BA25C2055C187CF7E3BBE232C3A2C6659A8615E017DC079590899F666&from=vlist&url=' + encodeURIComponent(link);
        a.target='blank';
        results[i].appendChild(a);
    }
}
