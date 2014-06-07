// ==UserScript==
// @name           Gawker Navigation
// @namespace      http://www.bricemciver.com/
// @description    Use keyboard navigation to read Gawker sites. "j"=next, "k"=previous, "v"=view item, "?" or "h"=show help (like Google Reader)
// @include        http://lifehacker.com/*
// @include        http://gawker.com/*
// @include        http://deadspin.com/*
// @include        http://kotaku.com/*
// @include        http://jezebel.com/*
// @include        http://io9.com/*
// @include        http://jalopnik.com/*
// @include        http://gizmodo.com/*
// ==/UserScript==

(function ()
{
    var allPosts, curPost, prevPost, pageOffset, help;
    curPost = -1;
    prevPost = -1;
    pageOffset = 100;

    function addGlobalStyle(css) 
    {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head)
        {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function findPos(obj)
    {
        var curleft, curtop;
        curleft = 0;
        curtop = 0;
        if (obj.offsetParent)
        {
            do 
            {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return [curleft, curtop];
    }


    // Get all posts on page an store in array
    function GetAllPosts()
    {
        allPosts = document.evaluate(
            '//li[contains(@class, "post")]',
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
    }

    function HighlightCurrentPost()
    {
        var theItem, pos;
        if (prevPost >= 0)
        {
            theItem = allPosts.snapshotItem(prevPost);
            theItem.className = theItem.className.replace(" currentPost", "");
        }
        if (curPost >= 0)
        {
            theItem = allPosts.snapshotItem(curPost);
            if (theItem.className.indexOf("currentPost") === -1)
            {
                theItem.className += " currentPost";
                pos = findPos(theItem);
                window.scroll(pos[0], pos[1] - pageOffset);
                theItem.focus();
            }
        }
    }
    
    // Key press action
    function KeyPressed(theKey)
    {
        var postLinks, thisLink, i;
        if (theKey === 107)  // k
        {
            if (curPost > 0)
            {
                prevPost = curPost;
                curPost--;
            }
            else
            {
                curPost = 0;
            }
        }
        else if (theKey === 106)  // j
        {
            if (curPost < (allPosts.snapshotLength - 1))
            {
                prevPost = curPost;
                curPost++;
            }
            else
            {
                curPost = (allPosts.snapshotLength - 1);
            }
        }
        else if (theKey === 118)  // v
        {
            if (curPost >= 0 && curPost < allPosts.snapshotLength)
            {
                postLinks = allPosts.snapshotItem(curPost).getElementsByTagName("a");
                for (i = 0; i < postLinks.length; i++)
                {
                    if (postLinks[i].className === "super-permalink")
                    {
                        window.open(postLinks[i].href);
                        break;
                    }
                }
            }
        }
        else if (theKey === 63 || theKey === 104)  // ? or h
        {
            thisLink = document.evaluate(
                '//div[contains(@class,"banner")]',
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
            if (thisLink !== null)
            {
                document.body.removeChild(thisLink);
            }
            else
            {
                document.body.appendChild(help);
            }
        }
        HighlightCurrentPost();
    }
    
    addGlobalStyle(".currentPost { border: #6688ee 2px solid; } \
                    .banner{position:absolute;top:40%;left:15%;margin:0;width:70%;text-align:center;padding:1em;color:#fff} \
                    .banner-background{background:#000;-moz-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;-moz-opacity:0.8;opacity:0.8;filter:alpha(opacity=80);z-index:1001;overflow:auto} \
                    .banner-foreground{z-index:1002;text-shadow:#000 1px 1px 7px} \
                    .banner .primary-message,.banner .secondary-message{font-weight:bold;font-family:sans-serif;margin:0} \
                    .banner .primary-message{font-size:200%} \
                    .banner .secondary-message{border-top:solid 1px #999;padding-top:0.5em;font-size:150%} \
                    .keyboard-help-banner{top:5%;left:5%;width:90%} \
                    .keyboard-help-banner .secondary-message-parent{padding:0} \
                    .keyboard-help-banner .resized{overflow:auto;overflow-y:auto;overflow-x:hidden} \
                    #keyboard-help{width:100%} \
                    #keyboard-help th{color:#dd0;padding-top:0.5em} \
                    #keyboard-help .key{text-align:right;font-weight:bold;padding-right:0.25em;white-space:nowrap} \
                    #keyboard-help .desc{text-align:left;font-weight:normal} \
                    #keyboard-help-tearoff-link-container{text-align:center;font-size:90%;margin-top:1em} \
                    #keyboard-help-tearoff-link-container .link{color:#dd0}");
    GetAllPosts();
    help = document.createElement("div");
    help.className = "banner banner-background keyboard-help-banner";
    help.innerHTML = "<div class='primary-message'>Keyboard shortcuts</div> \
                      <div style='height: 100px;' class='secondary-message resized'> \
                      <div id='keyboard-help-container'> \
                      <table id='keyboard-help'> \
                      <tbody><tr> \
                      <th colspan='2'>Navigation</th> \
                      <th colspan='2'>Acting on items</th> \
                      </tr><tr> \
                      <td class='key'>j/k:</td><td class='desc'>next/previous item</td> \
                      <td class='key'>v:</td><td class='desc'>view original</td> \
                      </tr></tbody></table></div></div>";
    document.addEventListener('keypress', function(event) { KeyPressed(event.charCode); }, true);

}());