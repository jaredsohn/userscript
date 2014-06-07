// ==UserScript==
// @name        Dogetip Allowed Subreddits Indicator
// @description	Shows a DOM indicator that the subreddit currently being views allows/bans tipping
// @author		FoxxMD
// @contributor MaximeKjaer
// @version		0.4
// @source		https://github.com/FoxxMD/dogetip-allowedindicator
// @include		http://reddit.com/r/*
// @include		http://www.reddit.com/r/*
// @include		http://*.reddit.com/r/*
// @resource    suchStyle https://raw.github.com/FoxxMD/dogetip-allowedindicator/master/suchStyle.css
// @downloadURL https://raw.github.com/FoxxMD/dogetip-allowedindicator/master/script.js
// ==/UserScript==

//load css
var suchStyle = GM_getResourceText ("suchStyle");
GM_addStyle (suchStyle);

//wow such time
var d = new Date();


//If the subreddit list isn't already in storage make a request to fetch it
if(GM_getValue('dogetipList', null) === null || GM_getValue('dogetipListExpiresOn', 0)  < d.getTime())
{
    var tempSubList = {},
        firstDone = false;
    //get list of allowed/banned top 200 subreddits from wiki
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.reddit.com/r/dogecoin/wiki/other_subreddit_tipping",
        onload: function(response) {
            var responseHTML = null;
            if (response.responseText && response.status == 200) {
                responseHTML = new DOMParser()
                    .parseFromString(response.responseText, "text/html");
                //such xpath wow very select
                var subreddits = document.evaluate("//table[//thead//th[contains(.,'Subreddit')]]/tbody/tr/td[1]/a",
                        responseHTML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                    subreddit_allowed = document.evaluate("//table[//thead//th[contains(.,'Subreddit')]]/tbody/tr/td[2]",
                        responseHTML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                //iterate through each collection of cells in the DOM table and get subreddit name & tipping permissions
                for(var i = 0; i < subreddits.snapshotLength; i++)
                {
                    var sRawName = subreddits.snapshotItem(i).innerText;
                    var sname = sRawName.slice(sRawName.lastIndexOf("/")+1).toLowerCase();
                    //convert "Yes" and "No" to true/false
                    //such bool
                    tempSubList[sname] = (subreddit_allowed.snapshotItem(i).innerText == "Yes");
                }
                tempSubList['dogecoin'] = true;
                //ensure list is only updated once both pages are parsed
                if(firstDone)
                {
                    persistList(tempSubList);
                }
                else{
                    firstDone = true;
                }
            }
        }
    });
    //get list of doge-related subreddits from wiki
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.reddit.com/r/dogecoin/wiki/index#wiki_dogecoin_related_sub-reddits",
        onload: function(response) {
            var responseHTML = null;
            if (response.responseText && response.status == 200) {
                responseHTML = new DOMParser()
                    .parseFromString(response.responseText, "text/html");
                //such xpath wow very select
                var subreddits = document.evaluate("//ul[preceding::h3[contains(.,'Dogecoin Related Sub-reddits')]]//a[contains(.,'/r/')]/@href",
                        responseHTML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

                //iterate through each collection of cells in the DOM table and get subreddit name
                for(var i = 0; i < subreddits.snapshotLength; i++)
                {
                    var sRawName = subreddits.snapshotItem(i).value;
                    var sname = sRawName.slice(sRawName.lastIndexOf("/")+1).toLowerCase();
                    //only add if not already listed(prevents references to /r/gonewild from overriding)
                    tempSubList[sname] = (tempSubList[sname] == undefined ? true : tempSubList[sname]);
                }
                //ensure list is only updated once both pages are parsed
                if(firstDone)
                {
                    persistList(tempSubList);
                }
                else{
                    firstDone = true;
                }
            }
        }
    });

}

//create a var to hold DOM element for indicator
var dogeIndicator;

if(!document.getElementById('dogetip_check'))
{
    dogeIndicator = document.createElement('div');
    dogeIndicator.setAttribute('id', 'dogetip_check');
}
else
{
    dogeIndicator = document.getElementById('dogetip_check');
}

//Add Event Listeners
//
//Listen for scroll event to minimize impact of the indicator
window.addEventListener('scroll', makeUnobtrusive, false);

//Listen for hover, then show regular style
dogeIndicator.addEventListener('mouseover',
    function() {
        if(dogeIndicator.className.indexOf('muchSmall') > 0)
        {
            removeClass(dogeIndicator,'muchSmall');
        }
    }, false);
dogeIndicator.addEventListener('mouseout', function() {
    makeUnobtrusive();
},false);

//parse current URL and pull subreddit name
function getCurrentSubreddit()
{
    var bIndex,
        eIndex,
        url = window.location.href,
        subName;
    bIndex = url.indexOf('/r/') + 3;
    eIndex = url.indexOf('/',bIndex);

    subName = (eIndex == -1 ? url.slice(bIndex) : url.slice(bIndex,eIndex));

    return subName.toLowerCase();
}

//logic to populate indicator
function canTip(subreddit)
{
    if(subreddit !== 'all')
    {
        //such JSON
        var subredditList = JSON.parse(GM_getValue('dogetipList')),
            tippingStatus = 'Tipping on this subreddit is <b>';

        if(subredditList[subreddit])
        {
            tippingStatus = tippingStatus + 'ALLOWED.</b>';
            dogeIndicator.className += ' soAllowed';
        }
        else if(subredditList[subreddit] === false)
        {
            tippingStatus = tippingStatus + 'BANNED.</b>';
            dogeIndicator.className += ' soBanned';
        }
        else if(subredditList[subreddit] == undefined || subredditList[subreddit] == null)
        {
            tippingStatus = tippingStatus + 'THE WILD WEST.</b></br></br> This subreddit has not explicitly stated whether' +
                ' tipping is okay so please be a respectable shibe and use good judgment!';
            dogeIndicator.className += ' soWild';
        }

        dogeIndicator.innerHTML = tippingStatus;
        //check if indicator doesn't exist(probably doesn't ever, but better safe than sorry)
        if(!document.getElementById('dogetip_check'))
        {
            document.body.appendChild(dogeIndicator);
        }
    }
}

//style indicator to make it less obtrusive once scrolling begins
function makeUnobtrusive()
{
    //wow such arbitrary
    if(window.pageYOffset > 100)
    {
        if(dogeIndicator.className.indexOf('muchSmall') < 0)
        {
            addClass(dogeIndicator,'muchSmall');
        }
    }
    else if(dogeIndicator.className.indexOf('muchSmall') > 0)
    {
        removeClass(dogeIndicator,'muchSmall');
    }
}

//such utility
function removeClass(theObject, theClass)
{
    theObject.className = theObject.className.replace(theClass, "");
}
function addClass(theObject, theClass)
{
    theObject.className += (' ' + theClass);
}
function persistList(listData)
{
    //so JSON
    GM_setValue('dogetipList', JSON.stringify(listData));
    GM_setValue('dogetipListExpiresOn', (d.getTime() + (1000 * 60 * 60 * 24)));
}


//so execute
makeUnobtrusive();
canTip(getCurrentSubreddit());
