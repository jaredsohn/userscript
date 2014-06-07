// ==UserScript==
// @name          /b/ackwash revolutions
// @namespace     http://www.4chan.org
// @description   Add tooltips to 4chan quotes (>>).
// @author        tkirby, aeosynth, VIPPER
// @include       *.4chan.org/*
// @include       *suptg.thisisnotatrueending.com/archive/*
// @exclude       *dis.4chan.org/*
// @version       0.172
// @update        https://userscripts.org/scripts/source/113401.user.js
// @grant         GM_xmlhttpRequest
// ==/UserScript==

const TIP_X_OFFSET = 40;        // in pixels
const BACKLINKS = true;         // 4chan imageboards only
const ISOP = ">>POST (OP)";     // style for links to OP
const ISOUT = ">>>POST";        // style for links to other threads
const ISBACK = ">>POST";        // style for backlinks
const SEPARATOR = " ";          // backlink separator (a single space)

function bw_wash(post) {
    qts = d.evaluate(".//a[contains(@class, 'quotelink')][starts-with(text(), '>>')]", post, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    backlinkid = "";
    
    for(var i = 0, qt = null; qt = qts.snapshotItem(i++); ) {
        id = qt.toString().split("#")[1];
        
        if(/>>\/(rs|\w+\/([a-zA-Z]+|$))/i.test(qt.textContent) || /dis.4chan.org/i.test(qt.href)) { // >>/rs || >>/board/text || >>/board/ || /textboard/
            continue;
        } else if(id == "p" + op) {
            qt.textContent = ISOP.replace("POST", id.replace("p", ""));
        } else if(!d.getElementById(id)) {
            getPost(qt.toString());
            out = qt.textContent.match(/\/.+\//) || "";
            qt.textContent = ISOUT.replace("POST", id.replace("p", out));
        }
        
        if(BACKLINKS) backlink(qt, id);
        qt.addEventListener("mouseover", function(e) { bw_show(e, this) }, false);
        qt.addEventListener("mousemove", function(e) { bw_track(e) }, true);
        qt.addEventListener("mouseout", function() { bw_hide() }, false);
        qt.addEventListener("mousedown", function() { bw_hide() }, false);
    }

}

function bw_hide() {
    bw_tooltip.style.setProperty("display", "none", "important");
}

function bw_show(e, me) {
    id = me.hash.split("#")[1];
    posthtml = "";
    
    try {
        posthtml = d.getElementById(id).innerHTML;
    } catch(err) {
        posthtml = checkCache(id, me);
    }
    
    // Code cleaning: [Reply], inputs, ids
    //posthtml = posthtml.replace(/<\/a>.*?Reply<.*?<\/a>]/, "</a>");
    posthtml = posthtml.replace(/<input.*?>/ig, "");
    posthtml = posthtml.replace(/ id=.[ ^>]+/ig, "");
    bw_tipcell.innerHTML = posthtml;
    
    reply = d.evaluate(".//a[text()='Reply']", bw_tipcell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(reply && reply.parentNode) reply.parentNode.parentNode.removeChild(reply.parentNode);
    
    // Fix OP
    if(/^<div.*\"file\".*<div.*\"postInfo desktop\"/.test(posthtml)) {
        post = d.evaluate(".//div[contains(@class, 'postInfo ')]", bw_tipcell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        file = d.evaluate(".//div[contains(@class, 'file')]", bw_tipcell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        file.parentNode.insertBefore(post, file);
    }
    
    bw_track(e);
}

function bw_track(e) {
    bw_tooltip.style.setProperty("display", "", "important");
    tip_height = bw_tooltip.clientHeight / 2;
    vp_height = Math.min(d.documentElement.clientHeight, d.body.clientHeight);
    vp_width = Math.min(d.documentElement.clientWidth, d.body.clientWidth);
    vp_bottom = window.scrollY + vp_height;
    
    if(e.pageY - tip_height < window.scrollY || bw_tooltip.clientHeight > vp_height)
        tip_y_offset = window.scrollY;
    else if(e.pageY + tip_height >= vp_bottom)
        tip_y_offset = vp_bottom - bw_tooltip.clientHeight;
    else
        tip_y_offset = e.pageY - tip_height;
    
    bw_tooltip.style.top = tip_y_offset + "px";
    if(e.pageX + TIP_X_OFFSET > vp_width * 0.6) {
        bw_tooltip.style.right = vp_width + TIP_X_OFFSET - e.pageX + "px";
        bw_tooltip.style.left = "";
    } else {
        bw_tooltip.style.left = e.pageX + TIP_X_OFFSET + "px";
        bw_tooltip.style.right = "";
    }
}

function backlink(post, id) { // CLUSTERFUCK
    if(!d.getElementById(id)) return;
    if(id == "p" + op)
        nid = d.evaluate(".//div[contains(@class, 'fileText')]", d.getElementById(id), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    else
        nid = d.evaluate(".//div[contains(@class, 'postInfo')][2]", d.getElementById(id), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var pid = d.evaluate("ancestor::div[@id][1]/@id", post, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    if(new RegExp("#" + pid + "\"").test(nid.innerHTML) || !/[0-9]/.test(pid)) return;
    
    link = d.createElement("A");
    link.setAttribute("href", "#" + pid); // (/\/res\//.test(window.location) ? "" : "res/") + post.toString().match(/[0-9]+#(?=p[0-9]+)/) + pid
    link.setAttribute("onclick", "replyhl('" + pid.replace("p", "") + "')");
    link.textContent = ISBACK.replace("POST", pid.replace("p", ""));
    link.addEventListener("mouseover", function(e) { bw_show(e, this) }, false);
    link.addEventListener("mousemove", function(e) { bw_track(e) }, true);
    link.addEventListener("mouseout", function() { bw_hide() }, false);
    link.addEventListener("mousedown", function() { bw_hide() }, false);
    
    nid.appendChild(d.createTextNode(SEPARATOR));
    nid.appendChild(link);
}

function checkCache(id, url) {
    if(!id) id = "p" + url.pathname.match(/[0-9]+_?[0-9]+/);
    for(var i in cache) {
        if(url.href.split("#")[0] == cache[i].url) {
            var responseText = cache[i].post;
            if(responseText == "Loading post")
                return ("<h3>Loading post #" + id + "...</h3>");
            var expr = new RegExp("<div class=\"postInfoM mobile\" id=\"" + id.replace("p", "pim") + ".*?<\/blockquote>");
            responseText = responseText.match(expr);
            responseText = responseText ? responseText[0] : "<h3>Error: Post not found</h3>";
            return responseText;
        }
    }
    return "<h3>Error: Post not found</h3>"; // Should never happen
}

function getPost(id) {
    link = id.split("#")[0];
    for(var i in cache)
        if(link == cache[i].url)
            return;
    
    cache.push({ url : link, post : "Loading post" });
    
    GM_xmlhttpRequest({
        method : "GET",
        url : link,
        headers: { "Accept" : "application/xml" },
        onload : function(response) {
            for(var i in cache)
                if(id.split("#")[0] == cache[i].url)
                    cache[i].post = response.responseText;
        }
    });
}

const d = document;
var op = window.location.pathname.match(/thread\/([0-9]+)/) || window.location.search.match(/[0-9]+(?:$|#)/) || "";
if(op[1]) op = op[1];
var cache = [];

var bw_tipcell = d.createElement("DIV");
bw_tipcell.setAttribute("id", "bw_tipcell");
bw_tipcell.setAttribute("class", "post reply preview");
bw_tipcell.setAttribute("style", "padding: 5px; margin: 0px; border-width: 1px !important; opacity: inherit !important");

var bw_tooltip = d.createElement("DIV");
bw_tooltip.setAttribute("id", "bw_tooltip");
bw_tooltip.setAttribute("class", "postContainer");
bw_tooltip.setAttribute("style", "display: none; position: absolute; margin: 0px 1px; padding: 0px");
bw_tooltip.appendChild(bw_tipcell);
d.body.appendChild(bw_tooltip);

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        for(var i = 0, newpost = null; newpost = mutation.addedNodes[i++]; )
            if(newpost.nodeName.toLowerCase() == "div") bw_wash(newpost);
    });
});

observer.observe(d.body, { childList : true, subtree : true });

window.onload = function() {
    var posts = d.evaluate(".//blockquote[contains(@class, 'postMessage')]", d.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0, post = null; post = posts.snapshotItem(i++); )
        bw_wash(post);
}