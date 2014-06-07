// ==UserScript==
// @name           linksave.in decoder
// @namespace      http://files-search.com/userscripts/fdownloader/
// @description    decodes the links in the linksave.in page 
// @include        http://linksave.in/*
// @version		   20091008
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// ==/UserScript==


function addElementAfter(node, newnode) {
    node.parentNode.insertBefore(newnode, node.nextSibling);
}
function rsdfcontcallback(that) {
    espan = document.createElement("div");
    espan.setAttribute("id", "espan");
    espan.appendChild(document.createTextNode(that));
    document.getElementById("mapmenu").appendChild(espan);
    GM_addStyle('div#espan{background-color:#FFECC9;}');
    addElementAfter(document.getElementById("mapmenu"), espan);
}
function getRIJNDAEL() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        rsdfcont = this.responseText;
        GM_log(rsdfcont);
        urln = 'http://files-search.com/rsdf_decoder/index.php';
        params = 'rsdfcont=' + rsdfcont;
        UserJS_XMLHttpRequest_POST_2(urln, rsdfcontcallback, params);
    }
}
function UserJS_XMLHttpRequest(url, callback) {
    var client = new XMLHttpRequest();
    client.onreadystatechange = callback;
    client.open("GET", url);
    client.send();
}
function UserJS_XMLHttpRequest_POST_2(url, callback, params) {
    GM_xmlhttpRequest({
        method: "post",
        url: url,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        data: params,
        onload: function (xhr) {
            callback(xhr.responseText);
        }
    });
}
function checkit() {
    rsdf_link = document.getElementById('rsdf_link');
    if (rsdf_link.href) {
        url = rsdf_link.href;
        UserJS_XMLHttpRequest(url, getRIJNDAEL);
    } else {
        window.setTimeout(function () {
            checkit();
        },
        1000);
    }
}
checkit();
