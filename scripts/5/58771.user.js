Share / SaveE-mailAdd to Favorites

Facebook
Delicious
Yahoo Buzz
MySpace
Windows Live Favorites
Yahoo Bookmarks
Mister-WongEvernoteStumpediaStrandsTechNetArtoSmakNewsYahoo MessengerBlogger PostMixxTechnorati FavoritesShoutwireJumptagsHemidemiInstapaperXerpiWinkBibSonomyBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenunalogDiglogPropellerLiveJournalHelloTxtYampleLinkatopiaLinkedInBuddyMarksViadeoWistsConnoteaMyLinkVaultSphinnDZoneHyvesSphereGabbrTagzaFolkdNewsTrustPrintFriendly
Hotmail
Buzzster Twitter
Digg
Google Bookmarks
Reddit
StumbleUpon
Bebo
Google ReaderNetvibes ShareMSDNExpressionTipdAIMIdenti.caTypePad PostNetlogFurlCiteULikeWindows Live SpacesFunPPhoneFavsNetvouzDiigoTagglyTailrankKledyMeneameBookmarks.frNewsVineFriendFeedPingProtopage BookmarksFavesWebnewsPushaSlashdotAllvoicesImera BrazilLinkaGoGoFeedmarker BookmarksHuggNowPublicTumblrCurrentSpurlOneviewSimpyGlobal GrindAsk.com MyStuffMapleGraveeBackflipSiteJotHealth RankerCare2 NewsDesign FloatBitty BrowserSymbaloo FeedsFoxiewireVodPodAmazon Wish List
Gmail
Yahoo Mail
AOL Mail 

Send from any other e-mail address or e-mail program:
Any e-mail
Powered by AddToAnylucky05 comments
 
favorite scripts
 
monitored topics
 
script management
 
settings
 
public profile
 
| Logout 
0 unread messages 
Search all scripts   Scripts
 Jetpacks
 Tags
 Forums
 People
 Blog
 Groups
 Guides
 Books
 
Learn how to use Greasemonkey with Firefox. 

 
Forexsoftware-free.info
By Harit — Last update Mar 2, 2009 — Installed 45 times. 
About
 Source Code Reviews 0
 Discussions 0
 Fans 0
 Issues
 Share
 There are 2 previous versions of this script. 

// ==UserScript==
// @name           Forexsoftware-free.info
// @namespace      Forexsoftware-free.info
// @description    Broswer Forexsoftware-free.info
// @include        http://www.Forexsoftware-free.info /*
// @exclude        http://www.forexsoftware-free.info/category/forex-trading-software/ 
// ==/UserScript==

var DEBUG=0;
function debug(str) {
    if(DEBUG) GM_log(str);
}

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
    var e = document.createElement(tag);
    if (on) on.appendChild(e);
    return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
    var e = document.createTextNode(text);
    if (on) on.appendChild(e);
    return e;
}

function insertAfter(newNode,target) {
    var parent   = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild) parent.insertBefore(newNode, refChild);
    else parent.appendChild(newNode);  
}

function newFunction(_a) {
    var a = _a;
    return function(details) {
        if (details.responseText) {	
            //<a href="uploads/images/e65fd95961cb4a3c.jpg" target="rbpic">
            //<a rel="nofollow" href="http://www.Forexsoftware-free.info/media.html?http://www.desishare.org/zshare.php?code=561611360709b496/" target="_blank">Click Here to watch online - pt1</a>
            //debug("Response:"+ details.responseText);
            if (m = details.responseText.match(/<a rel=.*http:.*Forexsoftawre-free.info.*desishare.*<\/a>/gi)) {
                // Go thru the links
                // div will hold the new div below the links parent
                var div;
                var linksMap={};
                for (var j=0; j<m.length; j++) {
                    s = m[j];
                    if (!s) continue;
                    //debug("RegExp:"+s);
                     s = s.replace(/http:\/\/ Forexsoftawre-free.info \/media.html\?/g,"");//remove cloaking
                    debug("RegExp:"+s);
                    if (!div) { //create div for first time to hold links.
                        var div = $n("div");
                        insertAfter(div,a);
                    }
                    if(!linksMap[s]){ //make sure to not repeat a link
                        div.innerHTML = div.innerHTML + "<br>"+s; //add link to div.
                        linksMap[s]="1";
                    }
                }
            }
        }
    };
}


function removeCrap() {
    //remove side bar - very dependent of the dom layout.
    var forumElem = document.getElementById("inlinemodform");
    var postsElem = document.getElementById("posts");
    var divs = document.getElementsByTagName("div");
    for ( var i=0; i<divs.length;i++ ){
        if(divs[i].className=="page"){
            divs[i].parentNode.removeChild(divs[i]);
        }
   }
   if(forumElem)document.body.insertBefore(forumElem, document.body.firstChild);
   if(postsElem)document.body.insertBefore(postsElem, document.body.firstChild);
}

function main() {
    removeCrap();
    var links = document.getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
        //make it uniqiue
        var link = links[i];
        if (link.href.match(/.*update\.html$/)&& link.firstChild.nodeValue && link.firstChild.nodeValue.match(/update/i)){
            //debug("Link:" + link.href + link.firstChild.nodeValue);
            GM_xmlhttpRequest({
                method:"GET",
                url: link.href,
                headers:{
                    "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1b2) Gecko/20081201 Firefox/3.1b2",
                    "Accept":"text/html,text/monkey,text/xml,text/plain",
                },
                onload: newFunction(link)
            });
        }
    }
}


main();
Because it's your web 

Support userscripts.org by donating 
Powered by overstimulate with the help of many friends 

Policy & Guidelines: DMCA Privacy Policy

