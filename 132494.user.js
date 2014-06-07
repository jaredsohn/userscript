// ==UserScript==
// @name                Youtube Clean Links (And usable playlists)
// @namespace           YClinks
// @include             http://*youtube.*
// @include             https://*youtube.*
// @description         hides non-functional "&features"
// @license             GPLv3 or none
// @author              papercl1p
// @version             1.42
// ==/UserScript==

// Credits to paka for cleaning up the mess i made.

/*
 * changelog:
 * @ disabled removeEventListener (testing on qupzilla...)
 * + &feature=list_other
 * + /featured
 * + &client=mv-google
 */

(function worker(){
/* window.removeEventListener("DOMNodeInserted", worker, true); */
  var cleanlink, dirtylink, i, x, aXpath;
    aXpath = new Array(44);
    // "&" links
    aXpath[0] = '//a[contains(@href, "&lclk")]';                    // search suggestions
    aXpath[1] = '//a[contains(@href, "/playlist?")]';               // promoted playlists
    aXpath[2] = '//a[contains(@href, "category_name")]';            // edu category from university list
    aXpath[3] = '//a[contains(@href, "feature=artistrec")]';        // recomended artist
    aXpath[4] = '//a[contains(@href, "feature=b-")]';               // videos under "browse"
    aXpath[5] = '//a[contains(@href, "feature=context-shows")]';    // sunken sidebar frame
    aXpath[6] = '//a[contains(@href, "feature=edu")]';              // top "edu" & promoted "edu_spotlight"
    aXpath[7] = '//a[contains(@href, "feature=fv")]';               // fvwrel + fvsr
    aXpath[8] = '//a[contains(@href, "feature=g-")]';               // google botnet
    aXpath[9] = '//a[contains(@href, "feature=music")]';            // music + musicchart
    aXpath[10] = '//a[contains(@href, "feature=rel")]';             // related + relmfu
    aXpath[11] = '//a[contains(@href, "feature=spotlight")]';       // music spotlight
    aXpath[12] = '//a[contains(@href, "feature=showob")]';          // show referer
    aXpath[13] = '//a[contains(@href, "feature=tn")]';              // top news
    aXpath[14] = '//a[contains(@href, "&feature=watch_")]';         // video response, artist, etc
    aXpath[15] = '//a[contains(@href, "search=tag")]';              // tags from video info
    aXpath[16] = '//a[contains(@href, "tracker=show")]';            // show_av + show*[0-9]
    aXpath[17] = '//a[contains(@href, "feature=branded")]';         // branded
    aXpath[18] = '//a[contains(@href, "&feature=channel&")]';       // button above video
    aXpath[19] = '//a[contains(@href, "feature=c-shelf")]';         // not sure yet (geo/balancer?)
    aXpath[20] = '//a[contains(@href, "&client=mv-google")]';       // mobile ver -> desktop
    // "?" links
    aXpath[21] = '//a[contains(@href, "/blog/")]';                  // blog links
    aXpath[22] = '//a[contains(@href, "/music/")]';                 // music tab
    aXpath[23] = '//a[contains(@href, "/ServiceLogin")]';           // login
    aXpath[24] = '//a[contains(@href, "/signup")]';                 // signup
    aXpath[25] = '//a[contains(@href, "=g-logo")]';                 // usernames in front page
    aXpath[26] = '//a[contains(@href, "?feature")]';                // various
    aXpath[27] = '//a[contains(@href, "?ob=")]';                    // some usernames from search
    aXpath[28] = '//a[contains(@href, "?s=")]';                     // show seasons
    // playlists
    aXpath[29] = '//a[contains(@href, "results_")]';                // playlists from search
    aXpath[30] = '//a[contains(@href, "feature=BF")]';              // playlist line. Not done 100%
    aXpath[31] = '//a[contains(@href, "&index=")]';                 // channel playlists
    // unique "&" and "?"
    aXpath[32] = '//a[contains(@href, "feature=plcp")]';            // playlists and videos in channel page
    aXpath[33] = '//a[contains(@href, "feature=results")]';         // channel search results ??? i forgot
    aXpath[34] = '//a[contains(@href, "playnext=")]';               // playlist line "playnext"
    aXpath[35] = '//a[contains(@href, "feature=topics")]';          // topic links
    aXpath[36] = '//a[contains(@href, "/topic/")]';                 // /most-{viewed, recommended, travel, etc}
    aXpath[37] = '//a[contains(@href, "feature=plpp_play_all")]';   // "Play All" button in channels
    aXpath[38] = '//a[contains(@href, "watch_videos?more")]';       // "Play All" button in topics/browse
    aXpath[39] = '//a[contains(@href, "feature=ymg")]'              // recomended music groups
    aXpath[40] = '//a[contains(@href, "feature=whpa")]'             // musicchart top100 "play all"
    aXpath[41] = '//a[contains(@href, "&feature=list_other")]'      // random playlist
    // "#" links
    aXpath[42] = '//a[contains(@href, "#g/u")]'                     // username button
    // "/" links
    aXpath[43] = '//a[contains(@href, "/featured")]'                // channels (front page)
      for(x in aXpath) {
        dirtylink = document.evaluate(aXpath[x], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 0; i < dirtylink.snapshotLength; i++) {
          cleanlink = dirtylink.snapshotItem(i);
          switch (x){
            default :
              cleanlink.href = cleanlink.href.replace(/\&(.*)/,"");
                break;
            case '21':
            case '22':
            case '23':
            case '24':
            case '25':
            case '26':
            case '27':
            case '28':
              cleanlink.href = cleanlink.href.replace(/\?(.*)/,"");
                break;
            case '29':
              cleanlink.href = cleanlink.href.replace(/\&feature(.*&)/,"&");
                break;
            case '30':
              cleanlink.href = cleanlink.href.replace(/\&feature\=BF(..*&)/,"&");
                break;
            case '31':
              cleanlink.href = cleanlink.href.replace(/\&feature(.*)/,"").replace(/\&index(.*)/,"");
                break;
            case '32':
              cleanlink.href = cleanlink.href.replace(/\&feature=plc(.)/,"");
                break;
            case '33':
              cleanlink.href = cleanlink.href.replace(/\&feature=results(.*)/,"");
                break;
            case '34':
              cleanlink.href = cleanlink.href.replace(/\&feature=list_relate(.)/,"").replace(/\&playnext=(.)/,"");
                break;
            case '35':
              cleanlink.href = cleanlink.href.replace(/\&feature=topic(.)/,"");
                break;
            case '36':
              cleanlink.href = cleanlink.href.replace(/^(.*)\/topic\/(.*)\/(.*)$/i, "/topic/$2");
                break;
            case '37':
              cleanlink.href = cleanlink.href.replace(/\&feature=plpp(.*)/,"");
                break;
            case '38':
              cleanlink.href = cleanlink.href.replace(/\&type(.*)/,"");
                break;
            case '39':
              cleanlink.href = cleanlink.href.replace(/\&feature=ym(.)/,"");
                break;
            case '40':
              cleanlink.href = cleanlink.href.replace(/\&feature=whp(.)/,"").replace(/\.2012(.*)/,"");
                break;
            case '41' :
              cleanlink.href = cleanlink.href.replace(/\&feature=list_othe(.)/,"");
                break;
            case '42':
              cleanlink.href = cleanlink.href.replace(/\#(.*)/,"");
                break;
            case '43':
              cleanlink.href = cleanlink.href.replace(/^(.*)\/channel\/(.*)\/(.*)$/i, "/channel/$2");
                break;
      }
    }
  }
 window.addEventListener("DOMNodeInserted", worker, true);
})();
