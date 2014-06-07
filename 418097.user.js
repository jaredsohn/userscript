// ==UserScript==
// @name       BitBucket Pull-Request Title Trimmer
// @namespace  http://web-notes.ru/
// @author     Paul Melekhov <gugglegum@gmail.com>
// @license    WTFPL – Do What the Fuck You Want to Public License (http://www.wtfpl.net/)
// @version    1.2
// @description Fix page titles in BitBucket.org pull-requests pages to be more convenient. Every BitBucket page title looks as follows: "username / reponame / Pull request #ID: Request title". So when you're open several tabs with pull-request, you see only "username / reponame / Pull...". And all browser tabs with different pull-requests look identically. This userscript trims the "username / reponame / Pull request " and leaves "#ID: Request title".
// @match      http://tampermonkey.net/
// @copyright  2014+, Paul Melekhov
// @include    https://bitbucket.org/*
// ==/UserScript==

// Check the location more accuracy (match only pull-request pages like "/username/project/pull-request/123/taskname" optionally with diff/commits/activity and any #anchor)
if ((/^https:\/\/bitbucket\.org\/(\w+)\/(\w+)\/pull-request\/\d+(\/([\w\d\-_]+(?:\/(?:diff|commits|activity)?)?)?)?(?:#.*)?$/).test(location.href)) {
    // Changing the title
    document.title = document.title.replace(/^\w+ \/ \w+ \/ Pull request /, '');
    var m = document.title.match(/^#(\d+): ([A-Z]{2,}-\d+)(.*)$/);
    if (m) {
        document.title = m[2] + ' (' + m[1] + ')' + m[3];
    }
}
