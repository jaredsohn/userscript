// ==UserScript==
// @name           RemoveHatebuUser
// @namespace      http://polog.org
// @description    remove hatebu user on each individual entry page
// @include        http://b.hatena.ne.jp/entry/*
// ==/UserScript==

/*

var w = unsafeWindow;

// $X() coded by cho45
var $X = function (exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);

    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for (var i = 0, len = result.snapshotLength; i < len ; i++) {
            ret.push(result.snapshotItem(i));
        }
        return ret;
    }
    }
    return null;
}


var user_name = w.Hatena.id;
var rkm = w.Hatena.rkm;
var config_url = 'http://b.hatena.ne.jp/' + user_name + '/config';
var ignore_users = '';
function init(){
    GM_xmlhttpRequest({
        method : "GET",
        url : config_url,
        onload : function(res) {
            ignore_users = res.responseText.match(/<input value="(.*?)" name="ignore_users" type="text" size="30">/)[1];
            links_init();
        }
    });
}

function links_init(){
    $X('id("bookmarked_user")/li').forEach(append_remove_link);
}


function append_remove_link(e){
    var id = e.id.replace('bookmark-user-', '');
    var link = document.createElement('a');
    link.innerHTML = '[このユーザを非表示]';
    link.href = 'javascript:void(0);';
    link.rel = id; // いいのかなこれ
    link.addEventListener('click', remove_him, id);
    e.appendChild(link);
}

function remove_him(e){
    ignore_users += '|' + this.rel;
    var data = 'mode=enter&ignore_users=' + encodeURIComponent(ignore_users) + '&rkm=' + encodeURIComponent(rkm);
    var self = this;
    GM_xmlhttpRequest({
        method : "POST",
        url : config_url,
        headers : {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        onload : function() {
            self.parentNode.style.display = 'none';
        }
    });
}

if(user_name)
    init();

*/