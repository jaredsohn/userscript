// ==UserScript==
//
// @name           Go to page without allowing to app.
//
// @description    Go to page of video without allowing to facebook app for post on your behalf, including videos you watched and more.
//
// @include        https://www.facebook.com/dialog/oauth*
//
// @namespace      http://www.mesuutt.com/userscripts/fbgotopage
//
// @author         Mesut Tasci (http://www.mesuutt.com) 
//
// @license        GNU GPL
//
// @homepage       http://www.mesuutt.com/userscripts/fbgotopage
//
//
//Version Number
// @version        1.0
//
// ==/UserScript==

var url=window.location.href
,idx_r_uri=url.search(/redirect_uri/)
,idx_scope=url.search(/&scope/)
,reload_uri=url.substr(idx_r_uri,idx_scope-idx_r_uri).split('=')[1]
,lbl_goapp=document.getElementById('grant_clicked')
,lbl_gopage=lbl_goapp.cloneNode()
,btn_gopage=lbl_goapp.children[0].cloneNode();

btn_gopage.value="Go to Page";
btn_gopage.type="button";
lbl_gopage.appendChild(btn_gopage);
lbl_gopage.id='lbl_go_page';
lbl_gopage.style.backgroundColor='green';
lbl_gopage.style.backgroundImage='none';

lbl_gopage.addEventListener("click",function(){window.location.href=reload_uri});
lbl_goapp.parentNode.insertBefore(lbl_gopage,lbl_goapp);
