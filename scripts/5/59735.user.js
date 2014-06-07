// ==UserScript==
// @name          APACHE DIRS
// @author        LudoO
// @namespace     http://www.xeoos.fr/greasemonkey
// @description   Enhance directory browsing, based on BetterDir : pretty table, picture preview...
// @include       *
// @include       http://mirror.facebook.com/
// @include       http://www.ibiblio.org/pub/
// @include       http://repo1.maven.org/maven2/
// @include       http://diveintomark.org/projects/greasemonkey/
// @include       http://build.chromium.org/buildbot/snapshots/
// @include       http://www.w3.org/Icons/
// @include       http://perldoc.jp/
// ==/UserScript==


var regexRow = /(?:<img.*alt="\[([\w]*)\]"[^>]*>)?\s*<a\s*href="([%\.\w:_\d\-\/]*)">(.*)<\/a>\s*([\d\w-]+\s+[\d\:]+)?\s*([\.\w\d-]*)?\s*([\.\w\d-]*)?/;
var regexRowTr = /<td\salign="left">&nbsp;&nbsp;(?:<img.*alt="\[([\w]*)\]"[^>]*>)?\s*<a\s*href="([%\.\w:_\d\-\/]*)"><tt>([\w\d\s,&;_\/\-\.]*)<\/tt><\/a><\/td>\s*<td\salign="right"><tt>([\w\d\s,&;_\/\-\.]*)<\/tt><\/td>\s*<td\salign="right"><tt>([^<]*)<\/tt><\/td>/;
var regexConstants = {
    type: 1,
    link: 2,
    name: 3,
    date: 4,
    size: 5,
    description: 6
};
/*
options : 
 * displayPictures : display pictures in the table.
*/
var options = {debug: false, displayPictures: false};

function renderPage(){
    var format = getFormatPage();
    if (format > 0) {
        debug('format=' + format);
        var content = render(format);
        if (content) {
            document.body.innerHTML = '';
            document.body.appendChild(content);
        }
        addZebraHCss();
    }
}


function addGlobalStyle(css){
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



/**
 * Return {type, link, name, date, size}
 * @param {Object} rows
 */
function getObject(rows){
    var nRows = rows.length;
    var items = [];
    for (var i = 0; i < nRows; i++) {
        var row = rows[i];
        var segments = row.match(regexRow);
        if (!segments) {
            debug("Error on row[" + i + "] = " + row);
        }
        else {
            items.push(segments);
        }
    }
    return items;
}

/**
 * Return {type, link, name, date, size}
 * @param {Object} rows
 */
function getObjectNode(rows, asNode){
    var nRows = rows.length;
    var items = [];
    for (var i = 1; i < nRows; i++) {
        var row = rows[i].innerHTML;
        var segments = row.match(regexRowTr);
        if (!segments) {
            debug("Tr:Error on row[" + i + "] = " + row);
        }
        else {
            items.push(segments);
            debug("OK on row[" + i + "] = " + row);
        }
    }
    return items;
}






    

function addZebraHCss(){
  addGlobalStyle(
  '#main{ font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;	font-size: 12px; }' +
  '#intro{ margin: 20px; }' +
  'table{	font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;	font-size: 12px;  margin: 45px;	width: 90%;	text-align: left;	border-collapse: collapse;} ' +
  'tr:hover td{	background: #d0dafd;} ' +
  'th{	font-size: 14px;	font-weight: normal;	padding: 10px 8px;	background: #a8b8ed; color: #039;} ' +
  'th a{ padding:20px; color: #039; } ' +
  'td{	padding: 4px;	color: #669;} ' +
  '.odd{	background: #e8edff; } ' +
  '.even{	background: #f9feff; } ' +
  '.dir{	font-weight:bold; padding-left:20px;} ' +
  'img {border:medium none;display:block;}'
 );
}

function debug(msg){
    if (console && options.debug)
      console.info(msg);
}

//Start
window.addEventListener('load', function(){
    renderPage();
}, true);