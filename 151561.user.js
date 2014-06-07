// ==UserScript==
// @name            Group By Subreddit
// @author          Redditlien
// @namespace       groupbysubreddit
// @description     Groups submissions by subreddit on main page
// @include         http://www.reddit.com/*
// @exclude         http://www.reddit.com/message/*
// @exclude         http://www.reddit.com/user/*
// @grant           none
// ==/UserScript==

var atags = document.getElementsByTagName('a');
var sitetable = document.getElementById('siteTable');
var myhash = new Object();
var nextprev;

// build a hash of subreddit => array<submissions from that subreddit>
for(i=0;i<atags.length;i++) {
    var node = atags[i];
    var match = node.className.match(/.*subreddit.*/);
    if(match) {
        var subreddit = node.innerHTML;
        if(!myhash[subreddit]) {
            myhash[subreddit] = new Array();
            myhash[subreddit+"_link"] = node.href;
        }
        var parentdiv = node.parentNode.parentNode.parentNode;
        myhash[subreddit].push(parentdiv);
    }
}

// Clear the sitetable of all links, then store the next/prev links
if (sitetable.hasChildNodes() && Object.keys(myhash).length){
    while(sitetable.childNodes.length > 1){
        sitetable.removeChild(sitetable.firstChild);
    }
    nextprev = sitetable.firstChild;
}

// Rebuild the html from the myhash links with subreddit titles
for(var subreddit in myhash) {
    if(!subreddit.match(/.*_link$/)) {
        var titlenode = document.createElement('a');
        var mybr = document.createElement('br');

        titlenode.setAttribute('href', myhash[subreddit+"_link"]);
        titlenode.setAttribute('style', "color: #336699; font-size: 20px;");
        titlenode.innerHTML = subreddit;

        sitetable.appendChild(titlenode);
        sitetable.appendChild(mybr);

        var submissions = myhash[subreddit];
        for(var i=0;i<submissions.length;i++) {
            submissions[i].style.display = 'inline';
            sitetable.appendChild(submissions[i]);
        }
        sitetable.appendChild(nextprev);
    }
}
