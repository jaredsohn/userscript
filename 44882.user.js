// ==UserScript==
// @name SWFObject Plugin Helper
// @namespace http://keyes.ie/greasemonkey/swfobject_plugin_helper/
// @description Copies SWFObject code for the current video page to the clipboard.
// @include http://youtube.com/watch?*
// @include http://www.youtube.com/watch?*
// @include http://www.viddler.com/*
// @include http://viddler.com/*
// @include http://www.vimeo.com/*
// @include http://vimeo.com/*
// @include http://qik.com/video/*
// @include http://12seconds.tv/*
// @version 1.0.2
// ==/UserScript==

// This function was copied from http://kb.mozillazine.org/XPath
// Evaluate an XPath expression aExpression against a given DOM node
// or Document object (aNode), returning the results as an array
// thanks wanderingstan at morethanwarm dot mail dot com for the
// initial work.

function evaluateXPath(aNode, aExpr){
    var xpe = new XPathEvaluator();
    var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ? aNode.documentElement : aNode.ownerDocument.documentElement);
    var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
    var found = [];
    var res;
    while (res = result.iterateNext()) 
        found.push(res);
    return found;
}

/*
 parseUri 1.2.1
 (c) 2007 Steven Levithan <stevenlevithan.com>
 MIT License
 */
function parseUri(str){
    var o = parseUri.options, m = o.parser[o.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14;
    
    while (i--) 
        uri[o.key[i]] = m[i] || "";
    
    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function($0, $1, $2){
        if ($1) 
            uri[o.q.name][$1] = $2;
    });
    
    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

function add_code(site, video_id, width, height){
    var panel = document.createElement('div');
    panel.style.marginTop = "-1px";
    panel.style.borderBottom = "2px solid #555";
    var label = document.createElement("label");
    label.innerHTML = "SWFObject Plugin Code";
    label.style.fontSize = '12px';
    label.style.fontFamily = "Helvetica";
    label.style.fontWeight = 'bold';
    label.style.cssFloat = 'none';
    label.style.color = '#FFF';
    label.style.padding = '0px';
    panel.appendChild(label);
    var swf_input = document.createElement('input');
    swf_input.setAttribute("readonly", "");
    swf_input.setAttribute("type", "text");
    swf_input.value = "[" + site + " " + video_id + " " + width + " " + height + "]";
    swf_input.style.margin = '3px 0px 3px 5px';
    swf_input.style.padding = "3px";
    swf_input.style.width = "400px";
    swf_input.style.border = "1px solid #555";
    swf_input.addEventListener("click", function(event){
        swf_input.focus();
        swf_input.select();
    }, false);
    panel.appendChild(swf_input);
    var header = document.body;
    panel.style.backgroundColor = '#666';
    panel.style.color = '#FFF';
    panel.style.textAlign = 'center';
    panel.style.padding = '4px 0 3px 0';
    header.insertBefore(panel, header.firstChild);
}

function check_youtube(){
    url = parseUri(location.href);
    youtube_re = /.*(youtube\.com)$/;
    m = youtube_re.exec(url.host);
    if (m) {
        video_re = /v=([^\/&]+)/g;
        m = video_re.exec(url.query);
        var vid_id = m[1];
        var embed_input = document.getElementById('embed_code');
        dim_re = /.*width=\"(.*)\".*height=\"(.*)\".*/g;
        m = dim_re.exec(embed_input.value);
        var width = m[1];
        var height = m[2];
        add_code("youtube", vid_id, width, height);
    }
}

function check_vimeo(){
    url = parseUri(location.href);
    vimeo_re = /.*(vimeo\.com)$/;
    m = vimeo_re.exec(url.host);
    if (m) {
        video_re = /^.*\/(\d+)$/;
        m = video_re.exec(url.path);
        if (m) {
            video_id = m[1];
            add_code("vimeo", video_id, 640, 300);
        }
    }
}

function check_qik(){
    url = parseUri(location.href);
    qik_re = /.*(qik\.com)$/;
    m = qik_re.exec(url.host);
    if (m) {
        // find the link
        var link = evaluateXPath(document, '//head/link[@rel="videothumbnail"]')[0];
        video_uri = parseUri(link.href);
        video_re = /(.*)\..*/;
        m = video_re.exec(video_uri.file);
        var video_id = m[1];
        var player = document.getElementById('qik_player');
        add_code("qik", video_id, player.getAttribute("width"), player.getAttribute("height"));
    }
}

function check_12seconds(){
    url = parseUri(location.href);
    qik_re = /.*(12seconds\.tv)$/;
    m = qik_re.exec(url.host);
    if (m) {
        video_re = /^.*\/(\d+)$/;
        m = video_re.exec(url.path);
        if (m) {
            video_id = m[1];
            add_code("12seconds", video_id, 430, 360);
        }
    }
}

function check_viddler(){
    url = parseUri(location.href);
    viddler_re = /.*(viddler\.com)$/;
    m = viddler_re.exec(url.host);
    var vid_id = 'error';
    if (m) {
        var comment_form = document.getElementById('newCommentForm');
        var inputs = comment_form.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if ("movieToken" == input.name) {
                vid_id = input.value;
            }
        }
        var player = document.getElementById('viddler');
        add_code("viddler", vid_id, player.getAttribute("width"), player.getAttribute("height"));
    }
}


check_youtube();
check_vimeo();
check_viddler();
check_qik();
check_12seconds();
