// ==UserScript==
// @name           Metafilter Next Post Timer
// @namespace      http://plutor.org/
// @description    Tells you how long until you can post next on Metafilter
// @include        http://metafilter.com/contribute/post.cfm
// @include        http://*.metafilter.com/contribute/post.cfm
// ==/UserScript==

var days = 24 * 60 * 60 * 1000          // A day in milliseconds
var nextpost = {
      "www": 1 * days,
      "ask": 14 * days,
      "metatalk": 4 * days,
      "music": 1 * days,
      "projects": 30 * days,
      "jobs": 1 * days
}
var postsrss = {
      "www": "postsrss",
      "ask": "askpostsrss",
      "metatalk": "metatalkpostsrss",
      "music": "musicpostsrss"
      // XXX - no RSS feed for projects
      // XXX - no RSS feed for jobs
}
var lastpost = new Date()
var whatsite

function init() {
    whatsite = getwhatsite()

    if (whatsite && hasnopostform()) {
        var userid = getuserid()
        if (userid)
            getpostsrss(userid, whatsite)
    }
}

// Figure out what subdomain we're in (no subdomain == "www")
function getwhatsite() {
    var loc = String(location.href);
    var subdomain = loc.replace(/^[^:]*:\/\//, "").replace(/\..*/, "");

    if (subdomain == "metafilter")
        return "www"
    else if (nextpost[subdomain] && postsrss[subdomain])
        return subdomain
    else
        return null
}

// Check to see if the posting form is there or not
function hasnopostform() {
    if (whatsite == "music") {
        // Music has an input[type="file"], not a textarea
        var inputs = document.getElementsByTagName("input")
        for (i in inputs)
            if (inputs[i].type == "file") return 0
        return 1
    } else {
        // Are there zero text areas on the contribute page?
        var textareas = document.getElementsByTagName("textarea")
        return (textareas && textareas.length > 0) ? 0 : 1
    }
}

// Get the user id from the cookie
function getuserid() {
    return getCookie("USER_ID")
}
/* From http://www.netspade.com/articles/javascript/cookies.xml */
function getCookie(name)
{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

// Get the RSS for the right subsite - parse it once we have it
function getpostsrss(userid, whatsite) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.metafilter.com/user/' + userid + '/' + postsrss[whatsite],
        onload: parsepostsrss
    });
}

// GM_xmlhttprequest onload function
// Get the first pubdate inside the first item
function parsepostsrss(responseDetails) {
    //var beforefirstitem = new Regex(//, "i")
    var pubdate = new RegExp( "<pubdate>([^<]*)</pubdate>", "i" )
    var text = responseDetails.responseText

    var pdmatches = text.match( pubdate )

    if (pdmatches && pdmatches.length >= 2) {
        lastpost.setTime( Date.parse(pdmatches[1]) )

        createtimer()
    }
}

// Create timer just above the footer
function createtimer() {
    var footer = document.getElementById("footer");
    if (!footer) return

    for (var bf = footer.previousSibling; bf && bf.nodeType != 1; bf = bf.previousSibling) {}
    if (!bf) return

    var timerdiv = document.createElement("div")
    timerdiv.id = "timer";
    timerdiv.style.fontSize = "200%";
    timerdiv.style.fontWeight = "bold";
    timerdiv.style.margin = "1em";
    timerdiv.style.padding = "1em";
    timerdiv.style.lineHeight = "140%";
    timerdiv.style.textAlign = "center";
    bf.appendChild(timerdiv)

    updatetimer();
}

// Timer continuous-update function.  Whee!
// FIXME - Time zones?  Ow my freaking head.
function updatetimer() {
    var n, f, s, t;
    n = new Date()
    f = new Date()
    f.setTime( Date.parse(lastpost) + nextpost[whatsite] );
    s = document.getElementById("timer");
    t = Math.floor((f - n) / 1000);

    if (t > 0) {
        var td, th, tm, ts;
        td = Math.floor(t/86400);
        th = Math.floor(t/3600) % 24;
        tm = Math.floor(t/60) % 60;
        ts = t % 60;

        var ta = new Array;
        if (td > 0) ta.push("" + td + " day" + (td==1 ? "" : "s"));
        if (th > 0) ta.push("" + th + " hour" + (th==1 ? "" : "s"));
        if (tm > 0) ta.push("" + tm + " minute" + (tm==1 ? "" : "s"));
        if (ts > 0) ta.push("" + ts + " second" + (ts==1 ? "" : "s"));

        var tal = ta.pop();
        var v = ""

        if (ta.length > 0) {
            v += ta.join(", ") + " and ";
        }
        v += tal;
        v += "<br />until you can post again.";

        s.innerHTML = v;
        s.parentNode.style.display = "block";

        setTimeout( updatetimer, 1000 );
    }
    else {
        // FIXME - Maybe we should reload the page instead?
        s.innerHTML = "";
        s.style.display = "none";
    }
}

init();



