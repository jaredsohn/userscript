// ==UserScript==
// @name      penche.com
// @version	1.0
// @author	rotten
// @namespace   http://www.penche.com
// @description  firefox uyumu & arabirim duzenlemesi
// @include    http://www.penche.com/penche.asp?bolum=6*
// @include    http://www.penche.com/penche.asp?detail=&bolum=6*
// @exclude http://www.penche.com/penche.asp?bolum=6
// ==/UserScript==

/************************************************/
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('a { color: #DCC2AB; text-decoration: none; background-color: transparent; }');
addGlobalStyle('body { font-family:arial; font-size: 11px; color: #666; background-color: #000000;}');
addGlobalStyle('td { font-family: arial; font-size: 11px; color: #666; }');
addGlobalStyle('.small { font-size:4pt;}');
addGlobalStyle('.forumHeader { font-weight:bold; background-color: #000; }');
addGlobalStyle('.title {background-color: #000; font-size: 11px;}');
addGlobalStyle('a.title:link   {  color:#A3A3A3;TEXT-DECORATION: none }');
addGlobalStyle('a.title:visited  { color:#A3A3A3;TEXT-DECORATION: none }');
addGlobalStyle('a.title:hover  { color:#FFF;TEXT-DECORATION: none }');

addGlobalStyle('.forumdetail { font-family: arial; font-size: 10pt; color: #fff; }');
addGlobalStyle('.forumsubject { }');
addGlobalStyle('a.forumsubject { color: ; text-decoration: none; }');
addGlobalStyle('a.forumsubject:visited { color: #FFFFFF; text-decoration: none; }');
addGlobalStyle('a.forumsubject:hover { color: #FFFFFF; text-decoration: underline;}');

addGlobalStyle('.forumReply { border-left: 1px solid #c6c6c6; background-color: transparent; font-size: 4pt; }');
addGlobalStyle('.forumDetailreply     { color: #FFFFFF; }');
addGlobalStyle('.forumDetailreply     { color: #A8A8A8; }');

addGlobalStyle('a.forumPageNumbers     { font-family: verdana; font-size: 10px;color:#FFFFFF; text-decoration: none; }');
addGlobalStyle('a.forumPageNumbers:visited     { color:#FFFFFF; text-decoration: none; }');
addGlobalStyle('a.forumPageNumbers:hover     { color:#F9DBC1; text-decoration: none; }');

addGlobalStyle('.formstyle {color: #FFFFFF; font-family: Arial; font-size: 10pt; border: 1px solid #666666; background-color: #000000;}');

addGlobalStyle('.articledetail { font-size: 11px; color: #FFFFFF;}');
addGlobalStyle('.articletitle { }');
addGlobalStyle('.articletitlesub { font-size: 12pt; font-weight:bold; color: #FFFFFF;}');

addGlobalStyle('.articleheader{font-size: 10pt; color: #FFFFFF; background-color: #BF002A; font-weight:bold}');
addGlobalStyle('.articleheaderdetail{font-size: 10pt; color: #FFFFFF }');
addGlobalStyle('a.articleheaderdetail{font-size: 10pt; color: #FFFFFF; text-decoration: none; }');
addGlobalStyle('a.articleheaderdetail:visited{color: #FFFFFF; text-decoration: none; }');
addGlobalStyle('a.articleheaderdetail:hover {color: #F9DBC1; text-decoration: underline; }');
addGlobalStyle('.articleheaderdetailsub{font-size: 8pt; color: #FFFFFF; }');

addGlobalStyle('a.newsprenext, a.newsprenext:visited, a.newsprenext:hover {color: #FFFFFF; text-decoration: none;}');
addGlobalStyle('a.newsprenext:hover {color: #F9DBC1; text-decoration: none; }');
addGlobalStyle('.fixturdatetime{font-size: 8pt; color: #FFFFFF; }');

addGlobalStyle('a { color: #D8A67F; text-decoration: none; background-color: transparent; }');
addGlobalStyle('a:visited { color: #FFFFFF; text-decoration: none; background-color: transparent; }');

addGlobalStyle('a.forumsubject { color: #D8A67F; text-decoration: none; }');
addGlobalStyle('a.forumsubject:visited { color: #FFFFFF; text-decoration: none; }');
addGlobalStyle('a.forumsubject:hover { color: #F9DBC1; text-decoration: underline;}');

addGlobalStyle('img { visibility: hidden; display: none;}');

addGlobalStyle('.forumTable { border-collapse: seperate;border: 1px solid #666; width:100%;}');

addGlobalStyle('.articleheader{color: #FFF; background-color: #000000;}');

addGlobalStyle('html { min-height: 100%; margin-bottom: 1px; }');