// ==UserScript==
// @name           YouDao Reader Optimized
// @namespace      http://userscripts.org/scripts/show/107917
// @author         umgbbc
// @include        http://reader.youdao.com*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//css changed

 /*隐藏头部*/ 
//addGlobalStyle('#top{ height:5px !important; overflow:hidden}');

 /*设置背景颜色*/ 
addGlobalStyle('#navigation,#contentWrapper {background-color:#EBEFF9;}');
addGlobalStyle('#searchInput,#contentTitle {background-color:#dddddd;}');

/*鼠标悬浮时显示头部*/
//addGlobalStyle('#top:hover{ height:65px !important; overflow: visible}');

/*主区域位置修正*/ 
addGlobalStyle('#main {top:5px !important;}');/*整个页面的移动，用来填补某些空出来的页面*/

 /*增大内容区字体*/ 
addGlobalStyle('.cast-content{font-size:16px !important;}');
addGlobalStyle('.cast-clip-author,.cast-clip-container h2{font-size:16px !important;}');


addGlobalStyle('#top {border-bottom: 0px ;height: 5px;}');
addGlobalStyle('#topSearch {top: 10px;left:550px;}');/*设置搜索的位置*/
addGlobalStyle('#navigationBottom {position:fixed!important;bottom:0px!important;font-size:11px!important;}');
addGlobalStyle('#navigation {position:fixed!important;bottom:0px!important;font-size:11px!important;}');

/*隐藏的元素*/
addGlobalStyle('#webSearchBtn,#topNav,#topBgRight,#topSubNav,#logo {display:none;}');

//addGlobalStyle('#navigation {width:165px;}');/*导航栏宽度*/
//addGlobalStyle('#contentWrapper {margin-left:165px;}');/*缩进栏宽度*/
//addGlobalStyle('#channelActions {float: left;}');

