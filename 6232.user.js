// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey
// @name          diggdot.us post to del.icio.us
// @description   Adds an icon to the item that allows you to post the story to del.icio.us
// @include       http://diggdot.us/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var stories = xpath("//div[@class='story']");
for (var i = 0; i < stories.snapshotLength; i++) {
    story = stories.snapshotItem(i);
    link = story.getElementsByTagName('a')[0];
    url = link.getAttribute('href');
    title = link.innerHTML;
    post = 'http://del.icio.us/post?v=4&jump=close&url='+ escape(url)+'&title='+escape(title);
    storymail = story.getElementsByTagName('span')[1];
    del = document.createElement('a');
    del.setAttribute('href',post);
    del.setAttribute('target','_blank');
    del.setAttribute('title','post to del.icio.us');
    del.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAALXRFWHRDcmVhdGlvbiBUaW1lAOMgMzEg4OXi5fHoIDIwMDUgMTI6MjM6MjkgKzAyMDB7NIKBAAAAB3RJTUUH1QgfChcuYu8nuwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAA6SURBVHjaY2xoaGAgBFiAuL6+HlmIkRFFRUNDIxNBY4CAzopYwC5Fcerdu3eRuYsX09tNRCliJCZaAGyhCfvBK6kWAAAAAElFTkSuQmCC" width="12" height="12" border="0" />';
    storymail.appendChild(del);
}
//.user.js