// ==UserScript==
// @name           My Yahoo! Japan Auctions
// @namespace      http://auctions.yahoo.co.jp/
// @include        http://page*.auctions.yahoo.co.jp/show/contact*
// @include        http://page*.auctions.yahoo.co.jp/jp/show/contact*
// @author         chrono-meter@gmx.net
// @url            http://userscripts.org/scripts/show/48339
// @version        1.3.0
// ==/UserScript==


function rewrite_contact(){

    //
    // get auction id
    //

    var aID = getFirstElementByXPath('//input[@name="aID"]/@value');


    //
    // replace selectbox to links
    //

    var users = getFirstElementByXPath('//select[@name="target"]');
    if (users && users.options.length > 1){

        var baseurl = users.form.action;
        var index = baseurl.substr(baseurl.search('#'));
        baseurl = baseurl.substr(0, baseurl.search('#')) + '?aID=' + aID;

        var contactlist = '<ul class="ex_contact">';
        for (var i = 0; i < users.options.length; i++){
            var userid = users.options[i];
            var url = baseurl + '&target=' + userid.value + index;
            contactlist += '<li><a href="' + url + '">' + userid.text
                        + '</a></li>';
        }
        contactlist += '</ul>';
        users.parentNode.innerHTML += contactlist;

    }


    //
    // append private comment
    //
    /*

    var commentid = 'auctions.yahoo.co.jp/private_comment/' + aID;

    var users = getFirstElementByXPath('//select[@name="target"]');
    if (users){
        commentid += '/' + users.options[users.selectedIndex].value;
    }

    var table = getElementsByXPath(
        '//textarea[@name="comment"]/ancestor::table')[1];

    var commentarea = document.createElement('textarea');
    commentarea.cols = 80;
    commentarea.rows = 5;
    commentarea.setAttribute('class', 'ex_contact');
    table.parentNode.insertBefore(commentarea, table);
    commentarea.value = GM_getValue(commentid, '');
    commentarea.addEventListener('keyup', function(event){
        GM_setValue(commentid, commentarea.value);
    }, false);

    /*
    var savebtn = document.createElement('input');
    savebtn.type = 'button';
    savebtn.value = 'Save comment';
    savebtn.setAttribute('class', 'ex_contact');
    table.parentNode.insertBefore(savebtn, table);
    savebtn.addEventListener('click', function(event){
        GM_setValue(commentid, commentarea.value);
    }, false);
    */


    //
    // label
    //

    var radios = getElementsByXPath(
        '//input[@type="radio" and @name="subject"]');
    for (var i = 0; i < radios.length; i++){
        var radio = radios[i];
        radio.id = 'subject_' + radio.value;
        radio.nextSibling.innerHTML = '<label for="' + radio.id + '">'
                                    + radio.nextSibling.innerHTML + '</label>';
    }


    //
    // template
    //

    var comment = getFirstElementByXPath('//textarea[@name="comment"]');
    if (comment){
        var valname_prefix = 'auctions.yahoo.co.jp/template';

        // template selectbox
        var tmpl_title = document.createElement('select');
        comment.parentNode.insertBefore(tmpl_title, comment);
        var names = GM_getValue(valname_prefix + '.names', '');
        names = names.split('\n');
        for (var i = 0; i < names.length; i++){
            var option = document.createElement('option');
            option.value = names[i];
            option.text = names[i];
            tmpl_title.add(option, null);
        }
        tmpl_title.addEventListener('change', function(event){
            var name = tmpl_title.options[tmpl_title.selectedIndex].value;
            comment.value = GM_getValue(valname_prefix + '/' + name, '');
        }, false);

        // save template
        var btn = document.createElement('input');
        with (btn){
            type = 'button';
            value = '\u65b0\u3057\u3044\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8\u3068\u3057\u3066\u4fdd\u5b58';
        }
        comment.parentNode.insertBefore(btn, comment);
        btn.addEventListener('click', function(event){
            var name = window.prompt('\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8\u306e\u540d\u524d\u3092\u5165\u529b\u3057\u3066\u4e0b\u3055\u3044\u3002', '');
            if (name){
                GM_setValue(valname_prefix + '/' + name, comment.value);

                var option = document.createElement('option');
                option.value = name;
                option.text = name;
                tmpl_title.add(option, null);

                var names = Array();
                for (var i = 0; i < tmpl_title.options.length; i++){
                    names.push(tmpl_title.options[i].value);
                }
                GM_setValue(valname_prefix + '.names', names.join('\n'));

                //tmpl_title.selectedIndex = tmpl_title.options.length;
            }
        }, false);

        // update template
        var btn = document.createElement('input');
        with (btn){
            type = 'button';
            value = '\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8\u3092\u66f4\u65b0';
        }
        comment.parentNode.insertBefore(btn, comment);
        btn.addEventListener('click', function(event){
            var name = tmpl_title.options[tmpl_title.selectedIndex].value;
            GM_setValue(valname_prefix + '/' + name, comment.value);
        }, false);

        // remove template
        var btn = document.createElement('input');
        with (btn){
            type = 'button';
            value = '\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8\u3092\u524a\u9664';
        }
        comment.parentNode.insertBefore(btn, comment);
        btn.addEventListener('click', function(event){
            var name = tmpl_title.options[tmpl_title.selectedIndex].value;
            var confirm = window.confirm(name + '\u3092\u524a\u9664\u3057\u307e\u3059\u3002');
            if (confirm){
                // gm doesn't support removing value.
                GM_setValue(valname_prefix + '/' + name, '');

                tmpl_title.remove(tmpl_title.selectedIndex)

                var names = Array();
                for (var i = 0; i < tmpl_title.options.length; i++){
                    names.push(tmpl_title.options[i].value);
                }
                GM_setValue(valname_prefix + '.names', names.join('\n'));
            }
        }, false);

        comment.parentNode.insertBefore(document.createElement('br'), comment);
    }


    //
    // expand contact page detail
    //

    function expandContactPage(anchor){
        var tbody = anchor.parentNode.parentNode.parentNode;
        GM_xmlhttpRequest({
            method: 'GET',
            url: anchor.href,
            onload: function(details){
                var doc = createHTMLDocumentByString(details.responseText);
                var content = getFirstElementByXPath(
                    '//*[contains(@style, "line-height")]', doc);
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                GM_log(details.responseText);
                td.innerHTML = content.innerHTML;
                td.setAttribute('class', 'ex_contact');
                td.setAttribute('colspan', 4);
                tr.appendChild(td);
                tbody.insertBefore(tr,
                                   anchor.parentNode.parentNode.nextSibling);
            }
            });
    }

    var pages = getElementsByXPath(
        '//a[starts-with(@href, "/show/contact_detail")]');
    for (var i = 0; i < pages.length; i++){
        expandContactPage(pages[i]);
    }


}


window.addEventListener('load', function(e)
{

    if (document.location.pathname == '/jp/show/contact'){
        rewrite_contact();
    } else if (document.location.pathname == '/show/contact'){
        rewrite_contact();
    }

}, false);


// from autopagerize.user.js
// utility functions.
function strip_html_tag(str) {
    var re = /^[\s\S]*?<html(?:[ \t\r\n][^>]*)?>|<\/html[ \t\r\n]*>[\w\W]*$/ig
    return str.replace(re, '')
}

function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}

function createHTMLDocumentByString(str) {
    if (document.documentElement.nodeName != 'HTML') {
        return new DOMParser().parseFromString(str, 'application/xhtml+xml')
    }
    var html = strip_html_tag(str)
    var htmlDoc = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    try {
        fragment = htmlDoc.adoptNode(fragment)
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true)
    }
    htmlDoc.documentElement.appendChild(fragment)
    return htmlDoc
}

function getElementsByXPath(xpath, node) {
    var nodesSnapshot = getXPathResult(xpath, node,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return data
}

function getFirstElementByXPath(xpath, node) {
    var result = getXPathResult(xpath, node,
        XPathResult.FIRST_ORDERED_NODE_TYPE)
    return result.singleNodeValue
}

function getXPathResult(xpath, node, resultType) {
    var node = node || document
    var doc = node.ownerDocument || node
    var resolver = doc.createNSResolver(node.documentElement || node)
    // Use |node.lookupNamespaceURI('')| for Opera 9.5
    var defaultNS = node.lookupNamespaceURI(null)
    if (defaultNS) {
        const defaultPrefix = '__default__'
        xpath = addDefaultPrefix(xpath, defaultPrefix)
        var defaultResolver = resolver
        resolver = function (prefix) {
            return (prefix == defaultPrefix)
                ? defaultNS : defaultResolver.lookupNamespaceURI(prefix)
        }
    }
    return doc.evaluate(xpath, node, resolver, resultType, null)
}


