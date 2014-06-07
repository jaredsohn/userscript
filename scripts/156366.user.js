// ==UserScript==
// @name        googlecode-comments-cleaner
// @description provides googlecode's wiki with bulk "delete comment" operation
// @namespace   gc-cleaner
// @include     https://code.google.com/p/*
// @version     3
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var gComments;
var gBlockerDiv;
var gDelActionUrl;

var $ = function(id) { 
    return document.getElementById(id);
}

function trim(s) {
    return s.replace(/^\s+|\s+$/g,'');  
}

function getCommentInfo(commentNode) {

    var result = {};

    var as = commentNode.getElementsByTagName("a");

    var i = 0;
    while (!as[i].hasAttribute("onclick") && i < as.length) i++;

    var onclick = as[i].getAttribute('onclick');
    var start = onclick.indexOf('(')+1;
    var a = onclick.substr(start, onclick.length - start - 1).split(',');
    var idStr = trim(a[0]);
    var timeStr = trim(a[1]);
    result['id'] = idStr.substr(1, idStr.length-2);
    result['creation_time'] = timeStr.substr(1, timeStr.length-2);
    return result;
}

function getCommentNodes() {
    var result = new Array();
    var commentsCount = 0;
    var rawChildren = $("commentlist").getElementsByTagName("*");
    for (var i=0; i < rawChildren.length; i++) {
        var commentNode = rawChildren[i];
        if (commentNode.nodeName == 'DIV'
           && commentNode.className.match(/(?:^|\s)artifactcomment(?!\S)/)
           && !commentNode.className.match(/(?:^|\s)delcom(?!\S)/) ) {
            
            commentNode.info = getCommentInfo(commentNode);

            result[commentsCount] = commentNode;

            commentsCount++;
        }
    }
    return result;
}

function buildGetParams(params) {
    var s='';
    for (var key in params) {
        s = s + key + '=' + encodeURIComponent(params[key]) + '&';
    }
    return s;
}


function deleteComment(cid, time, params) {
    params['sequence_num'] = cid;
    params['create_time'] = time;
    
    GM_xmlhttpRequest({
        method: "POST",
        url   : gDelActionUrl,
        data  : buildGetParams(params),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

function deleteComments(ev) {
    gBlockerDiv.style.display='block';
    var forms = document.getElementsByTagName('form');
    var i = 0;
    while (forms[i].getAttribute('name') != 'delcom' && i < forms.length) i++;
    var fields = forms[i].getElementsByTagName('*');
    var params = { 'token'   : fields[4].value,
                   'pagename': fields[3].value,
                   'mode'    : '1',
                   'sequence_num': '',
                   'create_time': '' };

    var comments = gComments;
    var toId = ev.target.info['id'];

    i = 0;
    do {
        var commentNode = comments[i];

        deleteComment(commentNode.info['id'], commentNode.info['creation_time'], params);
        i++;
    } while (commentNode.info['id'] != toId);
    var timeout = (i+1) * 100 < 2000 ? 2000 : (i+1)*100
    setTimeout(function() { location.reload(); }, timeout);

    ev.returnValue = false;

    //e.stopPropagation works only in Firefox.
    if (ev.stopPropagation) {
        ev.stopPropagation();
        ev.preventDefault();
    }
    return false;
}

function init() {
    var url = location.href;

    if (url.match('https\:\/\/code\.google\.com\/p\/[a-zA-Z\-]+\/wiki\/')) {

        var comments = getCommentNodes();
        gComments = comments;

        var blockerDiv = document.createElement('div');
        blockerDiv.style.background='#ffffff';
        blockerDiv.style.width='100%';
        blockerDiv.style.height='100%';
        blockerDiv.style.opacity='0.5';
        blockerDiv.style.left='0px';
        blockerDiv.style.top='0px';
        blockerDiv.style.zIndex='255';
        blockerDiv.style.position='fixed';
        blockerDiv.style.display='none';

        gBlockerDiv = blockerDiv;

        var project = url.split('/')[4];

        gDelActionUrl = 'https://code.google.com/p/'+project+'/w/delComment.do';

        $("commentlist").appendChild(blockerDiv);

        var i=0;
        for (i=0; i < comments.length; i++) {
            var commentNode = comments[i];
            var link = document.createElement('a');
            var textNode = document.createTextNode ("or ");
            link.setAttribute('href', '#');
            link.textContent = 'delete this and all above';
            link.info = commentNode.info;
            link.addEventListener('click', function (ev) { return deleteComments(ev); }, true);

            var nodeAddTo = commentNode.getElementsByTagName('*')[0];
            nodeAddTo.appendChild(textNode);
            nodeAddTo.appendChild(link);
        }
    }
}

init();
