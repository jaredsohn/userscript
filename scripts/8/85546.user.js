// ==UserScript==
// @name           Crossfire Blue
// @namespace      kra
// @description    Blue Crossfire Theme
// @include        http://www.crossfire.nu/*
// @include        http://www.xfire.be/*
// ==/UserScript==

var tds = document.getElementsByTagName("td");
		var j = 0;
		for(var i=0;i<tds.length;i++) {
			if(tds[i].className == "SexyWhiteBG") {
				j++; // we start with newClass1
				tds[i].className = "b" + j;
				//j++; // we start with newClass0
			}
		}
		
var tds = document.getElementsByTagName("table");
		var j = 0;
		for(var i=0;i<tds.length;i++) {
			if(tds[i].className == "SexyColumnList") {
				j++; // we start with newClass1
				tds[i].className = "c" + j;
				//j++; // we start with newClass0
			}
		}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body { font-family:tahoma; font-size:10px; background:#111;}');
addGlobalStyle('A, A:link, A:visited, A:active, A:hover, #navMiddle a:hover { color:#0060c6; }');
addGlobalStyle('A:hover { color:#999; }');
addGlobalStyle('.b1, .b2, .b3, .b5, .b6, .b7, .b8, .b9, .b11, .b12, .b13 { padding-top:0px; padding-left:10px; line-height:24px; color:#0060c6; border-bottom:0px solid #fff; }');
addGlobalStyle('.b1, .b6, .b9 { background: url(http://dl.dropbox.com/u/4224739/cf/b1.png); padding-left:20px; }');
addGlobalStyle('.b6 { background: url(http://dl.dropbox.com/u/4224739/cf/b6.png); padding-left:22px; }');
addGlobalStyle('.b2 { background: url(http://dl.dropbox.com/u/4224739/cf/b2.png); }');
addGlobalStyle('.b3 { background: url(http://dl.dropbox.com/u/4224739/cf/b3.png); padding-left:22px; }');
addGlobalStyle('.b7, .b13 { background: url(http://dl.dropbox.com/u/4224739/cf/b7.png); }');
addGlobalStyle('.b5 { background: url(http://dl.dropbox.com/u/4224739/cf/b5.png); }');
addGlobalStyle('.b4 { background: url(http://dl.dropbox.com/u/4224739/cf/b4.png); border-bottom:3px solid #fff; }');
addGlobalStyle('.b8 { background: url(http://dl.dropbox.com/u/4224739/cf/b8.png); padding-left:22px; }');
addGlobalStyle('.b10 td { background: #fff !important; border-bottom:1px dotted #d4d4d4 !important; }');
addGlobalStyle('.b10 { background: url(http://dl.dropbox.com/u/4224739/cf/b10.png); padding-top:5px; padding-left:15px; line-height:18px; color:#222; }');
addGlobalStyle('.b11 { background: url(http://dl.dropbox.com/u/4224739/cf/b11.png); padding-left:8px; }');
addGlobalStyle('.b12 { background: url(http://dl.dropbox.com/u/4224739/cf/b11.png);line-height:23.6px; }');
addGlobalStyle('#leftMenuBar { border:none !important; width:226px; background: #fff; padding:3px; margin-top:-3px; }');
addGlobalStyle('#rightMenuBar { border:none !important; width:226px; background: #fff; padding:3px; margin-top:-3px; }');
addGlobalStyle('#leftMenuBar .SexyWhiteHeader { height:30px; color:#eee; text-align:right; font-size:11px; background-image: url(http://dl.dropbox.com/u/4224739/cf/bar1.png); padding-right:20px; }');
addGlobalStyle('#rightMenuBar .SexyWhiteHeader { height:30px; color:#ddd; text-align:left; font-size:11px; background-image: url(http://dl.dropbox.com/u/4224739/cf/bar2.png); padding-left:20px;  }');
addGlobalStyle('.b1 a:link, .b2 a:link, .b3 a:link, .b4 a:link, .b5 a:link, .b6 a:link, .b7 a:link, .b8 a:link, .b9 a:link, .b10 a:link, .b11 a:link, .b12 a:link, .b13 a:link { color:#111 !important; text-decoration: none !important; }');
addGlobalStyle('.b1 a:visited, .b2 a:visited, .b3 a:visited, .b4 a:visited, .b5 a:visited, .b6 a:visited, .b7 a:visited, .b8 a:visited, .b9 a:visited, .b10 a:visited, .b11 a:visited, .b12 a:visited, .b13 a:visited { color:#111 !important; text-decoration: none !important; }');
addGlobalStyle('.b1 a:hover, .b2 a:hover, .b3 a:hover, .b4 a:hover, .b5 a:hover, .b6 a:hover, .b7 a:hover, .b8 a:hover, .b9 a:hover, .b10 a:hover, .b11 a:hover, .b12 a:hover, .b13 a:hover { color:#0060c6 !important; text-decoration: none !important; }');
addGlobalStyle('.SexyWhiteHeaderText { line-height:30px; color:#fff; }');
addGlobalStyle('.SexyWhiteHeaderText a:hover { color:#0060c6; }');
addGlobalStyle('.SexyWhiteBGNews { background: #fff url(http://dl.dropbox.com/u/4224739/cf/bigbar3.png) no-repeat; color:#ccc; padding-top:0px; padding-bottom:10px; vertical-align: middle; }');
addGlobalStyle('.SexyContentTitle { height:31px; background: #333 url(http://dl.dropbox.com/u/4224739/cf/cbar.png) no-repeat; color:#fff; }');
addGlobalStyle('.SexyContent { padding:10px; background:#fff url(http://dl.dropbox.com/u/4224739/cf/nbg.png) no-repeat bottom; }');
addGlobalStyle('.SexyTable { border: none; border:1px solid #ccc; }');
addGlobalStyle('.mainContentBox { background: #fff url(http://dl.dropbox.com/u/4224739/cf/mbg.png); }');
addGlobalStyle('.SexyColumnList { background: #fff url(http://dl.dropbox.com/u/4224739/cf/col.png) no-repeat; width:613px; padding:5px; margin-top:-3px; margin-bottom:6px; margin-left:0px; }');
addGlobalStyle('.SexyColumnList img { width:100px; height:60px; padding-right:20px; }');
addGlobalStyle('.b5 img { width:130px; height:130px; }');
addGlobalStyle('.SexyColumnList A:link, .SexyColumnList A:visited { color:#0060c6; font-size:11px; line-height:30px;}');
addGlobalStyle('#navContainer { height:50px; background:#fff url(http://dl.dropbox.com/u/4224739/cf/nav.png) no-repeat; width:100%; }');
addGlobalStyle('#navLeft, #navRight, #topNavSpace, #topBar, #headerAD, iframe, #bigAds { display:none; }');
addGlobalStyle('#navMiddle { background:none; width:1086px !important; padding-top:12px; }');
addGlobalStyle('#navMiddle div { margin-left:0px !important; width: 100% !important; }');
addGlobalStyle('#navMiddle li { margin-left:50px !important; margin-right:40px !important; }');
addGlobalStyle('#navMiddle span { display:none; }');
addGlobalStyle('#bannerLinks { height:120px; }');
addGlobalStyle('li.sepMenu { background:none; margin-left:27px !important; font-size:11px; }');
addGlobalStyle('.stickySmall { background: url(http://i40.tinypic.com/2ahgl54.jpg) no-repeat !important; color:#e8e6e7 !important; margin-right:-20px; padding-left:3px; }');
addGlobalStyle('.myxfUser { font-size:11px !important; }');
addGlobalStyle('.quote { border:1px solid #ccc !important; background: #eee !important; }');
addGlobalStyle('.quoteTitle { color:#0060c6 !important; }');
addGlobalStyle('.hilightcoms, .SexyArticleContent, .SexyContentAlt { background:#fff !important; }');
addGlobalStyle('#banner { border:none !important; background: url(http://dl.dropbox.com/u/4224739/cf/cf2.png) no-repeat center !important; height:120px !important; }');
addGlobalStyle('.c1 { background: #fff url(http://dl.dropbox.com/u/4224739/cf/c1.png) no-repeat; width:613px; height:102px; padding:10px; padding-top:32px; margin-top:-3px; line-height:20px; }');
addGlobalStyle('.c2 { background: #fff url(http://dl.dropbox.com/u/4224739/cf/c2.png) bottom; width:613px; height:70px; padding:10px; margin-top:-4px; line-height:20px; }');
addGlobalStyle('.c3 { background: #fff url(http://dl.dropbox.com/u/4224739/cf/c3.png) bottom;; width:613px; height:70px; padding:10px; margin-top:-4px; line-height:20px; }');
addGlobalStyle('.c1 img, .c2 img, .c3 img { width:80px; height:50px; padding-right:10px; }');
addGlobalStyle('img[src="/images/bdot.gif"] { display:none !important; }');
addGlobalStyle('#footertable span { color:#0060c6 !important; }');