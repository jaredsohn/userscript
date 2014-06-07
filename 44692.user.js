// DirBrowsing
// version 1.2
// 2009-05-27
// Copyright (c) 2009, LudoO
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DirBrowsing", and click Uninstall.
//
// Changelog : 
// 1.0 : 2009-03-19 - Creation 
// 1.1 : 2009-05-27 - Added Table format (Directory Listing For )
// 1.2 : 2009-06-09 - Added even row color
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DirBrowsing
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

function getFormatPage(){
    var titles = document.getElementsByTagName('title');
    // if page has no title, bail
    if (!titles.length) 
        return 0;
    
    var t = titles[0].textContent;
    // if page title does not start with "Index of /", bail
    if (/Index of \//.test(t)) 
        return 1;
    if (/^Directory Listing For/.test(t)) 
        return 2;
    
    return 0;
}

function getRoot(format){
    //Retrieve root node
    var root = document.getElementsByTagName('pre')[0];
    if (!root) 
        root = document.getElementsByTagName('ul')[0];
    if (!root) 
        root = document.getElementsByTagName('table')[0];
    if (!root) {
        debug('Root not found ; format: '+format);
        return;
    }
    return root;
}


function render(format){
    debug('render :' + format);
    var root = getRoot(format);
    
    if (format == 1) {
        var roottext = root.innerHTML;  
        
        //isolate header after 1st hr
        if (/<hr/.test(roottext)) {
            roottext = roottext.split(/<hr.*?>/)[1];
        }
        //clean <tr><td> if table
        roottext = roottext.replace(/<\/?[trd]+.*?>/ig, "");
        var rows = roottext.split(/\n/);
        debug("rows="+rows.length);
        items = getObject(rows);
    }else if (format == 2){
        var rows = root.getElementsByTagName("tr");
        debug("rows[tr]="+rows.length);
        items = getObjectNode(rows);
    }else {
        //XPATH
        debug('cannot render this format : dev!');
    }
    
    var div = document.createElement('div');
    div.setAttribute("id", "main");
    
    var intro = renderIntro(root);
    if (intro)
      div.appendChild(intro);

    var table = renderTable(items);
    if (table)
      div.appendChild(table);
      
    //preview image
    var preview = renderPreview(preview);
    if (preview)
      div.appendChild(preview);
      
    return div;
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

function renderPreview(){
    var div = document.createElement('div');
    div.setAttribute("id", "preview");
    div.setAttribute("style", "display: none; position: absolute; top:0; left:0; ");
    
    var img = document.createElement('img');
    img.setAttribute("id", "imgpreview");
    div.appendChild(img);
    
    //<object data="img/butterfly_vector.svg" type="image/svg+xml"

    return div;
}

function renderIntro(root){
  debug('renderIntro');
  var siblings = previousSiblings(root);
  var div = document.createElement('div');
  div.setAttribute("id", "intro");
  
  for (var i = 0; i < siblings.length; i++) {
    //Except title already in caption
    if (siblings[i].tagName!="H1")
      div.appendChild(siblings[i]);
  }
  
  return div;
}

function renderHeaders(table){
    debug('renderHeaders');
    
    // find the column headers, or bail
    var headers = document.evaluate("//a[contains(@href, '?')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    thead.appendChild(tr);
    
    var headersPresent = {};
    if (!headers || headers.snapshotLength == 0) {
        debug('default headers');
        //Default columns
        var defaultHeadersPresent = [{
            id: 'N',
            text: 'Name',
            dir: 'D'
        }, {
            id: 'M',
            text: 'Last modified'
        }, {
            id: 'S',
            text: 'Size'
        }, {
            id: 'D',
            text: 'Description'
        }];
        for (var i = 0; i < defaultHeadersPresent.length; i++) {
            var header = defaultHeadersPresent[i];
            debug(header);
            headersPresent[header.text.toLowerCase()] = header.text;
            // column headers go into TH elements, for accessibility
            var th = document.createElement('th');
            scope="col"
            var a = document.createElement('a');
            a.href = '?C=' + header.id + ';O=' + (header.dir || 'A');
            a.className=(header.dir?"sort-desc":"sort-asc");
            debug(header.dir+"="+a.className);
            a.textContent = header.text;
            a.title = "Sort by " + header.text.toLowerCase();
            th.appendChild(a);
            tr.appendChild(th);
        }
        debug('default headers done');
        
    }
    else {
        debug('with headers');
        for (var i = 0; i < headers.snapshotLength; i++) {
            var header = headers.snapshotItem(i);
            headersPresent[header.textContent.toLowerCase()] = header.textContent;
            // column headers go into TH elements, for accessibility
            var th = document.createElement('th');
            var a = document.createElement('a');
            a.href = header.href;
            a.className=(/O=D/.test(header.href)?"sort-desc":"sort-asc");
            debug(header.textContent+"="+a.className);
            a.textContent = header.textContent;
            a.title = "Sort by " + header.textContent.toLowerCase();
            th.appendChild(a);
            tr.appendChild(th);
        }
    }
    table.appendChild(tr);
    return headersPresent;
}

function renderTable(items){
    debug('renderTable');
    var table = document.createElement('table');
    table.setAttribute('summary', 'Directory listing');
    var caption = document.createElement('caption');
    caption.textContent = document.evaluate("//head/title", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    table.appendChild(caption);
    
    var headersPresent = renderHeaders(table);
    
    var nItems = items.length;
    var odd = true;
    var tr;
    var p = document.getElementById('preview');
    var imgpreview = document.getElementById('imgpreview');
    
    for (var i = 0; i < nItems; i++) {
        var cols = items[i];
        if (cols) {
            tr = document.createElement('tr');
 
            //Detect picture/folder
            var isDir = /\/$/.test(cols[regexConstants.name]);
            //var clsDir = isdir?'dir':'';
            //var isDir2 = cols[regexConstants.type] && cols[regexConstants.type].toLowerCase()=="dir";
            //TODO : svg support
            var isPic = /\.(png|bmp|gif|jpg|jpeg|ico)$/.test(cols[regexConstants.name]);
            
            var cls=(odd?'odd':'even')+(isDir?' dir':'');
            if (cls!='')
              tr.setAttribute("class", cls);
            
            //Name
            var html = "<a href='" + cols[regexConstants.link] + "'>" + cols[regexConstants.name] + "</a>";
            if (isPic & options.displayPictures)
              html = "<img width='32' height='32' src='"+ cols[regexConstants.name] +"'/>" + html;
            var td = createTd(tr, html);
            if (isPic){
              td.addEventListener('mousemove', function(e){ 
                p = document.getElementById('preview');
                if (p){
                  p.style.top=(e.pageY+10)+'px';
                  p.style.left=(e.pageX+10)+'px';
                }
              }, false);
              td.addEventListener('mouseout', 
                function(){ 
                  p = document.getElementById('preview');
                  if (p)
                      p.style.display = "none"; 
              }, false);
              td.addEventListener('mouseover', function(){ 
                  var pic = this.childNodes[this.childNodes.length-1].href;
                  p = document.getElementById('preview');
                  if (p){
                    imgpreview = document.getElementById('imgpreview');
                    imgpreview.src=pic;                                      
                    p.style.display = "block";
                    }
              }, false);
            }
            
            //Last modified
            if (headersPresent['last modified']) {
                createTd(tr, cols[regexConstants.date]);
            }
            //Size
            if (headersPresent['size']) {
                createTd(tr, cols[regexConstants.size]);
            }
            //Description
            if (headersPresent['description']) {
                createTd(tr, cols[regexConstants.description]);
            }
            
            tr.addEventListener('click', function(){ window.location= cols[regexConstants.link]; }, true);
            
            table.appendChild(tr);
            
            odd = !odd;
        }
    }
    
    var ncols = tr.childNodes.length; //headersPresent.length;
    debug("cols="+ncols);
    renderFooters(table, ncols);
        
    debug('return table');
    return table;
}

function createTd(tr, html, cls){
    td = document.createElement('td');
    if (cls && cls!='')
      tr.setAttribute("class", cls);
    td.innerHTML = html || '';
    tr.appendChild(td);
    return td;
}

function renderFooters(table, ncols){
    debug('renderFooters');

    var footer = getFooter();
    if (footer) {
      var tfoot = document.createElement('tfoot');
      var tr = document.createElement('tr');
      tfoot.appendChild(tr);
      
      var td = document.createElement('td');
      td.setAttribute("colspan", ncols);
      tr.appendChild(td);
      table.appendChild(footer);
    }
}

function getFooter(){
    var footer, footertext;
    // copy address footer -- probably a much easier way to do this,
    // but it's not always there (depends on httpd.conf options)
    footertext = document.getElementsByTagName('address')[0];
    if (footertext) {
        footer = document.createElement('address');
        footer.innerHTML = footertext.innerHTML;
    }
    return footer;
}

function previousSiblings(node){
  var siblings = [];
  while(node){
    node = node.previousSibling;
    if (node)
      siblings.push(node);
  }
  return siblings;
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
  'img {border:medium none;display:block;}'+
  '.sort-asc {width:13px; height:5px; background-position:0 30px;background-repeat:no-repeat; background-image:url(data:image/gif;base64,R0lGODlhDQAFAIcAAGGQzUD/QOPu+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAEALAAAAAANAAUAAAgbAAMIDABgoEGDABIeRJhQ4cKGEA8KmEiRosGAADs%3D);}'+
  '.sort-desc {width:13px;  height:5px; background-position:0 30px;background-repeat:no-repeat; background-image:url(data:image/gif;base64,R0lGODlhDQAFAIcAAGGQzUD/QOPu+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAEALAAAAAANAAUAAAgeAAUAGEgQgIAACBEKLHgwYcKFBh1KFNhQosOKEgMCADs%3D);}'
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
