// ==UserScript==
// @name          The new toonami
// @version       1.0
// @author        120percent
// @description   Changes subreddit theme from retro to modern
// @include       http://*.reddit.com/r/BringBackToonami/*
// @include       https://*.reddit.com/r/BringBackToonami/*
// @include       http://*.reddit.com/r/toonami*
// @include       https://*.reddit.com/r/toonami*
// ==/UserScript==

GM_addStyle (GM_getResourceText ("myCustomCss") );

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	return unless head;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss ('*

div#header-bottom-right {
    z-index: 3 !important
    }
/* To keep the top bar visible */
div#header {
    z-index: 2;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    color: pink; 
    background:url(%%header2%%);
    background-position:top left;
    border:red
    }
/* adjusts spacing without upsetting RES */
BODY:before {
    content: "hidden";
    display:block;
    color: white;
    font-size: 600%;
    text-align: right
    }
/* Renaming readers */
.titlebox .word {
    display: none
    }
.titlebox .number:after {
    content: " Toonami faithful"
    }
.titlebox .number{color:black}
/* header edits */
.pagename {
    vertical-align: top;
    margin-left: 5px;
    background: red;
    border-radius: 4px
    }
.pagename a {
    vertical-align: top;
    left: 0px;
    margin-left: 5px;
    margin-right: 5px;
    background: red;
    color: white
    }
div#header-bottom-left .tabmenu {
    position: absolute;
    left: 135px;
    top: 42px
    }
div#header ul.tabmenu a{background:red; color:black; border-radius:4px}
.tabmenu li.selected a {background:white!important; border-color:red; border-radius:4px; border-bottom-color:white; color:red}
#header-img {
    margin-left: 2px
    }
/* add footers 
.footer-parent {
    background: url(http://b.thumbs.redditmedia.com/lZLjhJXMf4O4IZTC.png) no-repeat bottom right;
    display: block
    }
.footer-parent:before {
    content: url(http://d.thumbs.redditmedia.com/wgJEfKWe-5tckaP-.png);
    float: left;
    position: relative;
    display: inline;
    bottom: -87px
    }
*/

/*default styles*/
BODY {
    color: #a00000;
    background: url(%%bg2%%) no-repeat fixed bottom left white
    }
div.commentarea {color:#a00000}
/* What appears #00FF00 */
.link {color:black}
a.title:visited{color: grey!important}
.thing .title.imgScanned {color:black}
div.usertext-body a {color:black}
a.author, a.visited, .md p, md H1, .tagline .submitter, .thing .title.click {
    color: black
    }
.md p{color:#a00000}
div.side .usertext .md {background:white}
div.side .usertext p, div.side .usertext li {color:#a00000}
div.thing.self .usertext .md p{color:black}
.thing .title.loggedin.click {
    color: black;
    display: inline-block
    }
/* queue items */
.odd, .even {
    background: url(%%st1%%)
    }
.odd:hover, .even:hover, .odd:hover p, .even:hover p {
    background: url(%%header2%%);
    color: white;
    }
.odd:hover a, .even:hover a {color:black!important}
/* sidebar styles */
div.side {
    background: white;
    border-color:red;
    color: white;
    padding: 5px 5px 0pt;
    display: inline-block
    }
div.sidecontentbox {background:white}
.linkinfo {background: #a00000}


.titlebox form.flairtoggle, .tabmenu li a {
    background: white;
    color: #a00000
    }
.titlebox H1 a, .thing .title.loggedin {
    color: black
    }
.sidebox .spacer {
    background: transparent
    }

.tabmenu.formtab a {
    font-size: 120%
    }
.tabmenu.formtab.selected a {
    font-size: 150%
    }
.approval-checkmark {
    display: none
    }
.morelink .nub {
    background-color: white
    }
div.sidebox.create {display:none}
div#link-desc.infobar {background:red}
div#text-desc.infobar {background:red}

/* Chrome bug fix for emotes */
.usertext-body a {
    display: inline-block
    }
')