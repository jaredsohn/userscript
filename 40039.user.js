// ==UserScript==
// @name           xiami music blog player
// @description	   let user make a player on himself blog
// @namespace      http://xiami.appspot.com
// @include        http://www.xiami.com/*
// @include	   http://xiami.com/*
// ==/UserScript== 

void function (){
    GM_log('OK we are running!!');

    function xpath(query) {
        return document.evaluate(query, document, null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    };

    // get site domain name
    var siteDomainName = window.location.host;
    // GM_log(siteDomainName);

    // Blog this song image 
    // TAG: not useable
    var blogSongIconImg = document.createElement('img');
    blogSongIconImg.src = 'data:image/gif,GIF89a%10%00%10%00%C4%00%00%00%00%00%EF%EF%EF%BD%BD%BD%7B%7B%7B333%AA%AA%AA%D6%D6%D6%5C%5C%5C%FF%FF%FF%0F%0F%0F%F7%F7%F7%E5%E5%E5%99%99%99%C2%C2%C2%1E%1E%1Elll%3D%3D%3D%B7%B7%B7%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%12%00%2C%00%00%00%00%10%00%10%00%00%05d%A0%24%8Ed)%19H%AA%AEk%83%B2%A9%22%CF%AE%1A%08%F8%AC%D7%E9%00%FC%00%C2b%F7B%F8%22%85%07%60%40T%F9d%0B%C0%A3%D9%03%40%08%BF%06%D5h%BD%02%0ET%C5S%06I(%02h%9E%18%80%2B%24%1C%E84J%E6%03%26%18%F1%40Mf%88%F8%23%0Byzs%3Ag%82%83%08%85%87i%0B%0D%8E%8F%90%90%0B!%00%3B';


    // add global CSS
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    };

    // OK. insert my css
    // TAG: cannot working !!!! should be insert at buttom
    //addGlobalStyle('a.amblog { background: transparent url(blogSongIconImg) no-repeat; }');

    // get song id , input should be "play('3338133','collect','20053');" or "play('3338133');"
    var singleSongReg = new RegExp(/^play\(\'\d*\'\);$/);
    var collectSongReg = new RegExp(/^play\(\'\d*\'\,\'collect\'\,\'\d*\'\);$/);
    var numberReg = new RegExp(/\'\d*\'/);
    function getSongID(songStr){
        var thisSongID;
        thisSongID = songStr;

        // test single song id
        if (singleSongReg.test(thisSongID)){
	    var realSongNumber
            realSongNumber = thisSongID.match(numberReg).toString();
            return realSongNumber.replace(/\'/g, "")
           }
        // test collect song id
        else if(collectSongReg.test(thisSongID)){
	    realSongNumber = thisSongID.match(numberReg)[0];
            return realSongNumber.replace(/\'/g, "")
            }
        // oops, Error
        else {
	    return '0'
            }
    } 

    // search all link , add blog this song tag
    var allLinks, thisLink;
    allLinks = document.evaluate(
        "//a[@class='amlisten']",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        // get thisLink onclick attribute
        var songID;
        songID = getSongID(thisLink.getAttribute('onclick'));
        //GM_log(songID);
        // now make a song play info link http://www.xiami.com/song/playlist?id=1283401
        var songInfoLink;
        songInfoLink = 'http://xiami.appspot.com/song/' + songID

        // set my blog this song button attribute
        newBlogElement = document.createElement('a');
        newBlogElement.innerHTML = 'Blog this song';	
        newBlogElement.target = '_blank';
        newBlogElement.href = songInfoLink;
        newBlogElement.setAttribute('title', 'Blog this song');
        // cannot set my custom css style, so let me use amlisten's style
        newBlogElement.setAttribute('class', 'amlisten');
        newBlogElement.style.background = 'transparent url(http://xiami.appspot.com/static/xbs/images/blog_song_icon.gif) no-repeat';

        // instert my blog this song icon
        thisLink.parentNode.insertBefore(newBlogElement, thisLink);
    }
}();


