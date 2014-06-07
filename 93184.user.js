// ==UserScript==
// @name           Pinboard Improvements
// @description    Perform various tweaks to Pinboard.in's interface
// @lastupdated    2011-1-8
// @namespace      CLkfT5ntJY
// @version        1.4
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.5
// @include        http://pinboard.in/*
// @include        https://pinboard.in/*
// @include        http://www.pinboard.in/*
// @include        https://www.pinboard.in/*
// ==/UserScript==

/*
Features:
 - Blue on white theme, as opposed to orange on white.
 - The leading period in private tags are hidden.
 - Private tags are lighter in color, differentiating them from public tags.
 - You may choose to enable surrounding brackets to make private tags more recognizable.
 - Tags are smaller and tag selection is more apparent.
 - Compresses bookmark height, therefor more information is displayed per page.
 - The 'edit', 'delete', and 'mark as read' options are moved next to the title.
 - Unread items have a dark redish/brownish color, which stands out more.

Version 1.4 2011-1-8
 - Pinboard now specifies some tag colors as inline, overridden tag cloud

Version 1.3 2010-12-21
 - https:// includes

Version 1.2 2010-12-20
 - Drops 'copy to mine' option when viewing public feeds
 - Drops 'by otheruser' option when viewing public feeds
 - Drops 'from twitter'

Version 1.1 2010-12-20
 - Removed some unwanted code

Version 1.0 2010-12-19
 - Initial release

Todo
 - Compatibility testing; only tested with Firefox 3.5.15
 - Wider and/or adjustable margins would be nice
 - Apply to notes

Known Issues
 - When editing a note old tag formatting reappears
*/


// Borrowed from http://diveintogreasemonkey.org/ - Thanks Mark
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Blue theme
addGlobalStyle('a.mark_read {color:#338}');
addGlobalStyle('a.unread {color:#883333}');
addGlobalStyle('a.tag {color:#338 !important;}');

// Wide margins
// This really needs to be worked on...
//addGlobalStyle('#content {width:95%;}');
//addGlobalStyle('#banner {width:100%;}');
//addGlobalStyle('.bookmark {width:95%;}');
//addGlobalStyle('#main_column {width:75%;}');

// Make tags small and tag selection more apparent - will not effect tag cloud
addGlobalStyle('.display a.tag {font-size:x-small;}');
addGlobalStyle('.display a.tag:hover {background:#e6e6ff;}'); // either change the background
//addGlobalStyle('.display a.tag:hover {border-bottom:1px dotted}'); // ...or dotted underline

// Reduce individual bookmark height
addGlobalStyle('.bookmark {margin-bottom:2px;padding:1px;}');

var allLinks = document.getElementsByTagName('a');
for (var i in allLinks) {
    if (typeof allLinks[i] != "undefined") {
    
        // Find username when logged in
        if (allLinks[i].className == "banner_username") {
            var username = allLinks[i].href;
        }

        // Drop 'from twitter' when viewing public feeds
        //if (allLinks[i].innerHTML == "from twitter") { // Anything else uses this?
        if (allLinks[i].className == "source") {
            if (allLinks[i]) {allLinks[i].parentNode.removeChild(allLinks[i]);}
        }
        
        // Drop 'when' when viewing public feeds
        if (allLinks[i].className == "when") {
            //alert(allLinks[i].innerHTML);
            if (allLinks[i]) {allLinks[i].parentNode.removeChild(allLinks[i]);}
        }
        
        // This will only effect the list of bookmarks
        if (allLinks[i].className == "tag private" || allLinks[i].className == "private tag") {
            // Check if the tag starts with a period
            if (allLinks[i].innerHTML.substr(0,1) == ".") {
                // Remove period, add brackets, reduce font size, and give it a lighter color
                allLinks[i].innerHTML = allLinks[i].innerHTML.substr(1);
                // If the lighter color isn't enough you can add brackets too
                //allLinks[i].innerHTML = "["+allLinks[i].innerHTML.substr(1)+"]";
                //allLinks[i].innerHTML = "("+allLinks[i].innerHTML.substr(1)+")";
                allLinks[i].style.color = '#767688';
            }
        }
        
        // This will only effect the tag cloud
        if (allLinks[i].className == "tag") {
            // Check if the tag starts with a period
            if (allLinks[i].innerHTML.substr(0,1) == ".") {
                // Remove period and give it a lighter color
                allLinks[i].innerHTML = allLinks[i].innerHTML.substr(1);
                allLinks[i].style.color = '#767688';
            }
        }
    
    }

}

var allDivs = document.getElementsByTagName('div');
for (var i in allDivs) {
    if (typeof allDivs[i] != "undefined") {
        if (allDivs[i].className == "display") {

            // Drop 'by otheruser' when viewing public feeds
            // Oh f*** me, why couldn't they give this a class or id and make it easy?
            re = RegExp('by <a href="/u:(.*)/">(.*)</a>'); // matches ' by <a href="/u:otheruser/">otheruser</a>'
            allDivs[i].innerHTML = allDivs[i].innerHTML.replace(re,'')

            // Duplicate the edit_links and remove it
            var allDisplayDivs = allDivs[i].getElementsByTagName('div');
            for (var n in allDivs[i].getElementsByTagName('div')) {
                var editDiv = allDisplayDivs[n];
                if (typeof editDiv != "undefined") {
                    if (editDiv.className == "edit_links") {
                        var toCopy = editDiv;
                        if (editDiv) {editDiv.parentNode.removeChild(editDiv);}
                    }
                 }
            }
            
            // Check if viewing your own list, if not then drop the 'copy to mine' option
            // If it is then relocate the 'edit', 'delete', and 'mark as read' options like normal
            username = username.replace("http://www.pinboard.in/", "");
            username = username.replace("https://www.pinboard.in/", "");
            username = username.replace("http://pinboard.in/", "");
            username = username.replace("https://pinboard.in/", "");
            if (RegExp(username).test(window.location.href)) {
                var allLinks = allDivs[i].getElementsByTagName('a');
                allDivs[i].insertBefore(toCopy,allLinks[0].nextSibling);
            }
        }
    }
}
