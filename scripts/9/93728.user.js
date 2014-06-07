// ==UserScript==
// @name          Facebook Group Feeds for fullscreen
// @namespace     http://userscripts.org/scripts/new?form=true
// @description	  Facebook ui tweak
// @author        Jordan Amar
// @include       http://www.facebook.com/home.php*sk=*
// @include       https://www.facebook.com/home.php*sk=*
// ==/UserScript==
(function() {
var d=document;
var S=d.createElement('style');
var style = "";
var styles=
[
    '.home #leftCol {display: none;}',
    '.home #rightCol {display: none;}',
    '#contentArea .pbm {display: none;}',
    '#headerArea .rfloat {display: none;}',
    '.hasLeftCol #contentCol {margin-left: 100px;}',
    '#pagelet_group {width: 820px;}',
    '.group_mall {font-size: 13px;}',
    '.mall_post_body_text {font-size: 14px;}',
    '.uiUfi {width: 100%;}',
    '.lfloat {display: none;}',
    '.rfloat {display: none;}',
    '#headNav {margin-left:99px;}',
    '.hasLeftCol #pageFooter {margin-left: 99px;}',
    '#jewelCase {display: none;}',
    '#pageLogo a {background-color:rgb(207, 74, 71); background-image: url(http://kkoo95.noads.biz/wall_logo.png);}',
    '#pageLogo a:hover,#pageLogo a:focus,#pageLogo a:active {background-color:rgb(207, 74, 71); background-image:url(http://kkoo95.noads.biz/wall_logo.png)}',
    '#headNav {background-color:rgb(214, 98, 95);}',
    '#blueBar {background-color:rgb(207, 74, 71);}',
    '.uiTextSubtitle {display: none;}',
    '.groupProfilePic {height: 60px; width: 60px;}',
    '.groupProfileHeader .fsxl {font-size: 22px;}'
]

for (s in styles)
    style += styles[s];
    
S.type = 'text/css';
S.appendChild(d.createTextNode(style));
d.body.appendChild(S);}
)();
