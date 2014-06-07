// ==UserScript==
// @name          Boing Boing Comments
// @description	  Includes comments link to boing boing entries
// @namespace     http://concer.ning.com/tools
// @include       http://www.boingboing.net/*
// @include       http://boingboing.net/*

//by Fabricio Zuardi (http://www.hideout.com.br)
// ==/UserScript==
var page_links = document.links;
var permalinks = []
function showComments(){
    var currentpage = window.location.href;
    var pagetitle = document.title;
        GM_xmlhttpRequest({
        method:"GET",
        url:"http://concer.ning.com/view/?auth=no&fmt=monkey&url="+escape(currentpage)+"&pagetitle="+escape(pagetitle),
        headers:{
            "User-Agent":"monkeyagent",
            "Accept":"text/monkey,text/xml",
            },
          onload:function(details) {
            var divelement = document.createElement('div');
            var html = "<hr><h3>Discuss!</h3>";
            html += details.responseText;
            divelement.innerHTML = html;
            divelement.className = "concern-container"
            posted_p_element.parentNode.insertBefore(divelement,posted_p_element.nextSibling);
    GM_addStyle('.concern-comment { border-bottom:thin dashed grey; margin-bottom:0px;}');
    GM_addStyle('.concern-comment img { width: 30px; height:30px; margin-right:5px;}');
    GM_addStyle('.concern-comment-footer { color:grey;margin-top:0px;font-size:small;font-style:italic;}');
    GM_addStyle('.concern-container li{margin-right:15px; list-style-type: none;}');
    GM_addStyle('.concern-comment-title {  font-size:1.1em;  font-weight:bold;}');
    GM_addStyle('.concern-container img{border: none;}');
    GM_addStyle('.concern-container hr{border: none; border-top:thin dashed grey;}');
    GM_addStyle('.mod-buttons{float:left;}');
    GM_addStyle('.mod-button{float:left;display:block;overflow:hidden;padding-top: 16px;width:16px;height:0px;background-repeat:no-repeat;}');
    GM_addStyle('.mod-approve{background-image:url(http://concer.ning.com/html/skins/default/approve.png);}');
    GM_addStyle('.mod-disapprove{background-image:url(http://concer.ning.com/html/skins/default/disapprove.png);}');
    GM_addStyle('.mod-button:hover, .mod-button-on {background-position:-16px;}');
    GM_addStyle('.concern-add-form textarea{width:100%;height:8em;}');
    GM_addStyle('.concern-add-form .title-field{width:100%;}');
        }
        });
}

for (var i=0; i<page_links.length; i++){
    if (page_links[i].innerHTML.match(/permalink/i)) {
        //permalinks.push(page_links[i].href.substring(11,page_links[i].href.length));
        permalinks.push(page_links[i]);
    }
}
if (permalinks.length == 1) {
    posted_p_element = permalinks[0].parentNode;
    showComments();
} else {
    for ( var i in permalinks) {
        permalinks[i].innerHTML = "comments"
    }
}
