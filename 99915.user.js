// ==UserScript==
// @name          BleachGet
// @namespace     -X-BleachGet
// @description   Redesigns the page for easy watching. Removes ads, Modifies title, adds navigational buttons
// @include       http://www.bleachget.com/*
// @include       http://www.bleachget.com/watch/*
// @version       1.1
// @history	  1.1 FIX: Updates a cache of episode numbers every time you visit the main page, to fix the navigation going
//                  Haywire because the id's are not in perfect sequence
// @history	  1.0 Modifies Title; [Epi]-Title
// @history	  1.0 Removes clutter
// @history	  1.0 Removes ads
// @history	  1.0 Adds navigational buttons for next and previous show.
// ==/UserScript==
function getCache () {
    return GM_getValue ('episodes', '').split (String.fromCharCode(036));
}
function cacheEpisodeList () {

    var episodeResult = document.evaluate('/html/body/center/div/div/div[4]/div[2]/div/div/div/table/tbody/tr/td/table/tbody/tr/td/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var cache = [];
    if (GM_getValue ('episodes.length' , 0) < episodeResult.snapshotLength) {

        for (var i = (episodeResult.snapshotLength-1); i >= 0; i--) {
            var item = episodeResult.snapshotItem (i);
            cache [cache.length] = parseInt (item.href.split ('/')[4]);
        }

        GM_setValue ('episodes' , cache.join (String.fromCharCode(036)));
        GM_setValue ('episodes.length' , cache.length);
    }
}

function refactorPage () {

    AREA_NODE.removeChild(AREA_NODE.getElementsByTagName ('iframe')[0]);
    SPAM_NODE.parentNode.removeChild(SPAM_NODE);

    VIDEO_SPAM_NODE.parentNode.removeChild(VIDEO_SPAM_NODE);

    VIDEO_AREA_NODE.removeChild (VIDEO_AREA_NODE.getElementsByTagName('table')[0]);
    VIDEO_AREA_NODE.getElementsByTagName ('p')[0].innerHTML = "";

    TITLE_NODE.innerHTML = EPISODE_NUMBER + ': ' + DISPLAY_TITLE;
    FOOTER_NODE.innerHTML = "";


    AREA_NODE.style.width = "100%";
    TITLE_NODE.style.textAlign = "center";

    addNavigation ();
}
function getOtherEpisodes (episodeId) {

    var cache = getCache();
    var cacheSize = (cache.length-1);

    var rtn = {prev: -1 , next: -1};

    if (cacheSize > 0)
        for (var i = (cache.length-1); i >= 0; i--) {

            if (episodeId != cache [i]) continue;

            if (i < cacheSize)
                rtn['next'] = cache [(i+1)];

            if (i > 1)
                rtn['prev'] = cache [(i-1)];
        }

    else
        rtn = {next:(episodeId+1) , prev: (episodeId-1)};

    return rtn;
}
function addNavigation () {

    navigation = getOtherEpisodes (EPISODE_ID);

	AREA_NODE.innerHTML += "<a href='http://www.bleachget.com/watch/"+(navigation['prev'])+"----------' id='-x-prev'><span style='left:30px;position:relative;top:150px;'>"+(EPISODE_NUMBER-1)+"</span></a>";
	AREA_NODE.innerHTML += "<a href='http://www.bleachget.com/watch/"+(navigation['next'])+"----------' id='-x-next'><span style='left:30px;position:relative;top:150px;'>"+(EPISODE_NUMBER+1)+"</span></a>";

	prev = document.getElementById ('-x-prev');
	next = document.getElementById ('-x-next');

	prev.style.position = "absolute";
	prev.style.background = "#0D3E88";
	prev.style.color = "white";
	prev.style.width = "100px";
	prev.style.height = "300px";
	prev.style.top = "320px";
	prev.style.left = "30px";


	next.style.position = "absolute";
	next.style.background = "#0D3E88";
	next.style.color = "white";
	next.style.width = "100px";
	next.style.height = "300px";
	next.style.top = "320px";
	next.style.left = "813px";


}

if (document.location.href == "http://www.bleachget.com/") {

    cacheEpisodeList();

} else {

    var DISPLAY_TITLE = document.evaluate('/html/body/center/div/div/div[4]/div[2]/div/div/div/center/table/tbody/tr/td/table/tbody/tr/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    var EPISODE_NUMBER = parseInt(document.title.split(' ')[3]);



    var EPISODE_ID = parseInt(document.location.pathname.split('watch/')[1]);

    var AREA_NODE = document.getElementById ('side-a');
    var SPAM_NODE = document.getElementById ('side-b');
    var FOOTER_NODE = document.getElementById ('footer');

    var TITLE_NODE = AREA_NODE.getElementsByTagName('h1')[0];

    var VIDEO_AREA_NODE = AREA_NODE.getElementsByTagName('center')[0];
    var VIDEO_SPAM_NODE = VIDEO_AREA_NODE.getElementsByTagName('embed')[1];

    refactorPage ();
}