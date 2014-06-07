// ==UserScript==
// @name           Jtv Cleaner -ForoCuak.com-
// @namespace      justin.tv
// @description    Limpia Todo
// @include    *justin.tv/*
// @exclude    *justin.tv/*/old*
// @exclude    *justin.tv/directory*
// @exclude    *justin.tv/home
// @exclude    *justin.tv/*/profile
// @exclude    *justin.tv/settings*
// @exclude    *justin.tv/bulletins*
// @exclude    *justin.tv/inbox*
// @exclude    *justin.tv/messages*
// @exclude    *justin.tv/*/gifts*
// @exclude    *justin.tv/sort*
// @exclude    *justin.tv/search*
// @exclude    *justin.tv/user/*
// @exclude    *justin.tv/p/*
// @exclude    *blog.justin.tv/*
// @exclude    *justin.tv/jobs*
// @exclude    *apiwiki.justin.tv/mediawiki*
// @exclude    *community.justin.tv/mediawiki*
// @exclude    *justin.tv/
// @exclude    *justin.tv/clip*
// @exclude    *justin.tv/*/archive*
// @exclude    *justin.tv/broadcast*
// @exclude    *justin.tv/login*
// @exclude    *justin.tv/*/dmca*
// @exclude    *justin.tv/*/popout*
// @exclude    *justin.tv/*/*/*
// @exclude     justin.tv/*/*
// ==/UserScript==




function cleanup() {
kill(window.document,document.getElementById('header_inside'),null,null,null);
kill(window.document,document.getElementById('action_links'),null,null,null);
kill(window.document,document.getElementById('action_contents'),null,null,null);
kill(window.document,document.getElementById('no_clips'),null,null,null);
kill(window.document,document.getElementById('footer'),null,null,null);
kill(window.document,document.getElementById('lateload0'),null,null,null);
kill(window.document,document.getElementById('status'),null,null,null);
kill(window.document,document.getElementById('info'),null,null,null);
kill(window.document,document.getElementById('banner_custom'),null,null,null);
kill(window.document,document.getElementById('sitenav_dropmenu_toggle'),null,null,null);
kill(window.document,document.getElementById('banner_default'),null,null,null);
kill(window.document,document.getElementById('related'),null,null,null);
kill(window.document,document.getElementById('about'),null,null,null);
kill(window.document,document.getElementById('clips'),null,null,null);
kill(window.document,document.getElementById('admin_nxtchan'),null,null,null);
kill(window.document,document.evaluate('/html/body/div[14]/div[2]/div[2]/div[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[14]/div[2]/div/div[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html[1]/body[1]/div[13]/div[2]/div[2]/div[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[13]/div[2]/div/div[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html[1]/body[1]/div[2]/div[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[13]/div[3]/div[2]/div[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[13]/div[3]/div/div[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[15]/div[3]/div[2]/div[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
style(window.document,document.getElementById('chat_container'),"width: 300px;height: 350px;",null,null);
document.body.style.background="#000000 url()";
};

function kill(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};

function style(doc, element, new_style) {
    element.setAttribute('style', new_style);
};


window.addEventListener("load", function() { cleanup() }, false);

