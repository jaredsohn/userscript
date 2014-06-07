// ==UserScript==
// @name           Multi-column IBM Documents
// @namespace      srawlins
// @description    Multi-columns IBM Support Documents
// @include        http://www-01.ibm.com/support/docview.wss*
// ==/UserScript==


// Todo:


// Current (Jan 26, 2010) v14 Horizontal Layout of this page:

// ________________________________#v14-body-table (770px)________________________________
//
//   #navigation   .no-print ________________#content-table.parent (610px)________________
// ___(150 px)____ _(10 px)_
// |-------------|
// |             |           ___________________#content-table (610px)____________________
// |             |
// |             |           spacer             #content             spacer   #right-nav
// |             |           (10px) ____________(443 px)____________ (7 px) ___(150 px)___
// |             |                  |------------------------------|        |------------|
// |             |                  |                              |        |            |
// |             |                  |                              |        |            |
// |             |                  |                              |        |            |
// |-------------|                  |------------------------------|        |------------|


// 2 column (Jan 26, 2010) v14 Horizontal Layout of this page:

// ______________________________________#v14-body-table (1246px)_______________________________________
//
//   #navigation   .no-print ______________________#content-table.parent (1086px)_______________________
// ___(150 px)____ _(10 px)_
// |-------------|
// |             |           __________________________#content-table (1086px)__________________________
// |             |
// |             |           spacer                    #content                    spacer   #right-nav
// |             |           (10px) ___________________(919 px)___________________ (7 px) ___(150 px)___
// |             |                  |----------------------|---------------------|        |------------|
// |             |                  |  443px + 10px gap    | 443px + 10px gap    |        |            |
// |             |                  |                      |                     |        |            |
// |             |                  |                      | padding-right:13px; |        |            |
// |-------------|                  |----------------------|---------------------|        |------------|


// 2 column (Jan 26, 2010) v14 Horizontal Layout of this page, navigation removed:

// _________________#v14-body-table (936px)_____________________
//
// ________________#content-table.parent (936px)________________
//  
// 
// ___________________#content-table (936px)____________________
// 
//  spacer                    #content                    spacer
//  (10px) ___________________(919 px)___________________ (7 px)
//         |----------------------|---------------------|
//         |  443px + 10px gap    | 443px + 10px gap    |
//         |                      |                     |
//         |                      | padding-right:13px; |
//         |----------------------|---------------------|


// 3 column (Jan 26, 2010) v14 Horizontal Layout of this page:

// ______________________________________________#v14-body-table (1709px)_______________________________________________
//
//   #navigation   .no-print ______________________________#content-table.parent (1549px)_______________________________
// ___(150 px)____ _(10 px)_
// |-------------|
// |             |           __________________________________#content-table (1549px)__________________________________
// |             |
// |             |           spacer                           #content                             spacer   #right-nav
// |             |           (10px) __________________________(1382 px)___________________________ (7 px) ___(150 px)___
// |             |                  |--------------------|-------------------|-------------------|        |------------|
// |             |                  |  443px + 10px gap  | 443px + 20px gap  | 443px + 10px gap  |        |            |
// |             |                  |                    |                   |                   |        |            |
// |             |                  |                    |                   | pad-right:13px;   |        |            |
// |-------------|                  |--------------------|-------------------|-------------------|        |------------|


// 3 column (Jan 26, 2010) v14 Horizontal Layout of this page, navigation removed:

// _________________________#v14-body-table (1399px)____________________________
//
// _______________________#content-table.parent (1399px)________________________
// 
// 
// ___________________________#content-table (1399px)___________________________
// 
// spacer                           #content                             spacer
// (10px) __________________________(1382 px)___________________________ (7 px)
//        |--------------------|-------------------|-------------------|
//        |  443px + 10px gap  | 443px + 20px gap  | 443px + 10px gap  |
//        |                    |                   |                   |
//        |                    |                   | pad-right:13px;   |
//        |--------------------|-------------------|-------------------|

var v14_body_table = document.getElementById('v14-body-table');
var content_table_parent = document.evaluate("tbody/tr/td[3]",
      v14_body_table, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
content_table_parent.id = "content-table-parent";
var content_table = document.getElementById('content-table');
var content = document.getElementById('content');

var x = self.innerWidth;
var y = self.innerHeight;

makeMultiColumn();
hideNavSetup();
tt2pre();
cleanupBorderedTables();
removeSingleChildUls();
shrinkPres();
squeezeWideTables();

function makeMultiColumn() {
  var rightNav   = document.getElementById('right-nav');
  var widthNeededFor2Columns = 1246;
  var widthNeededFor3Columns = 1709;
  if ( rightNav.style.display == 'none' ) {
    widthNeededFor2Columns =  936;
    widthNeededFor3Columns = 1399;
  }

  var contentTables = document.evaluate("//td[@id='content']/table",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = contentTables.snapshotLength - 1; i >= 0; i--) {
    var table = contentTables.snapshotItem(i);
    
    var contentCells = document.evaluate("tbody/tr/td",
      table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (var j = contentCells.snapshotLength - 1; j >= 0; j--) {
      var cell = contentCells.snapshotItem(j);
      
      var divReplacement = document.createElement('div');
      divReplacement.id = "d" + i + "_" + j
      divReplacement.innerHTML = cell.innerHTML;
      divReplacement.setAttribute("style", cell.getAttribute("style"));
      divReplacement.setAttribute("height", cell.getAttribute("height"));
      divReplacement.setAttribute("class", cell.getAttribute("class"));
      
      tdStyleToDivStyle(cell);
      
      if (j == contentCells.snapshotLength - 1) {
        table.parentNode.replaceChild(divReplacement, table);
      } else {
        var previousDiv = document.getElementById( 'd' + i + "_" + (j+1) );
        previousDiv.parentNode.insertBefore(divReplacement, previousDiv);
      }

      // The divReplacement may contain several nested tables, each with one
      // cell per row. Try to root them out...
      replacePillars(divReplacement);
    }
  }
  
  if ( x > widthNeededFor3Columns ) {
    v14_body_table.setAttribute("width",       770+443+443+40+13);
    content_table_parent.setAttribute("width", 610+443+443+40+13);
    content_table.setAttribute("width",        610+443+443+40+13);
    var content = document.getElementById('content');
    content.setAttribute("width",              443+443+443+40+13);
    content.style.paddingRight = "13px";
    
    if ( document.getElementById('multi-column-div') == null) {
      multiColumnDiv = document.createElement('div');
      content.appendChild(multiColumnDiv);
      multiColumnDiv.id = "multi-column-div";
    }
    
    multiColumnDiv.setAttribute("style",
                                "-moz-column-count: 3; " +
                                "-moz-column-rule: 1px solid #000000; " +
                                "-moz-column-gap: 20px;");
  }
  else if ( x > widthNeededFor2Columns ) {
    v14_body_table.setAttribute("width",       770+443+20+13);
    content_table_parent.setAttribute("width", 610+443+20+13);
    content_table.setAttribute("width",        610+443+20+13);
    var content = document.getElementById('content');
    content.setAttribute("width",              443+443+20+13);
    content.style.paddingRight = "13px";
    
    if ( document.getElementById('multi-column-div') == null) {
      multiColumnDiv = document.createElement('div');
      content.appendChild(multiColumnDiv);
      multiColumnDiv.id = "multi-column-div";
    }
    
    multiColumnDiv.setAttribute("style",
                                "-moz-column-count: 2; " +
                                "-moz-column-rule: 1px solid #000000; " +
                                "-moz-column-gap: 20px;");
  }
  
  content_children = content.childNodes;
  while ( content.firstChild.id != "multi-column-div" ) {
    multiColumnDiv.appendChild(content.firstChild);
  }
}


function adjust_v14_body_table_width( adj ) {
  var v14_body_table = document.getElementById( 'v14-body-table' );
  v14_body_table.setAttribute( "width", v14_body_table.getAttribute( "width" )*1 + adj );
}

function adjust_content_table_width( adj ) {
  var content_table_parent = document.getElementById('content-table-parent');
  var content_table = document.getElementById('content-table');
  content_table.setAttribute( "width", content_table.getAttribute( "width" )*1 + adj );
  content_table_parent.setAttribute( "width", content_table_parent.getAttribute( "width" )*1 + adj );
}

function computedWidth( elm ) {
  width = document.defaultView.getComputedStyle( elm, "" ).getPropertyValue( "width" );
  width = width.split( 'px' )[0]*1;
  return width;
}

function computedLeftGap( elm ) {
  padding = document.defaultView.getComputedStyle( elm, "" ).getPropertyValue( "padding-left" );
  padding = padding.split( 'px' )[0]*1;
  margin  = document.defaultView.getComputedStyle( elm, "" ).getPropertyValue( "margin-left" );
  margin  = margin.split( 'px' )[0]*1;
  return (padding+margin);
}

function tdStyleToDivStyle(cell) {
  var klass = cell.getAttribute("class");
  if ( klass != "v14-header-1" &&
       klass != "v14-header-1efix"
     ) {
    return;
  }
  
  var re  = new RegExp( "td." + klass + "[, ]" );
  var re2 = new RegExp( "td." + klass );
  for (var k = document.styleSheets.length - 1; k >= 0; k--) {
    sheet = document.styleSheets[k];
    try {
      rules = sheet.cssRules;
      for (var l = rules.length - 1; l >= 0; l--) {
        if ( re.test( rules[l].selectorText ) ) {
          var newRule = "div." + klass + " { " + rules[l].style.cssText + " }";
          //sheet.insertRule(newRule, 0);
          addGlobalStyle(newRule);
        }
      }
    } catch(err) {
      //alert(err);
    }
  }
  
  // As a backup, in the case of cross-domain spreadsheets, use computedStyle
  attributesToInherit = [
    "padding-top", "padding-bottom", "padding-left",
    "font-family", "font-size", "font-weight",
    "background-color", "color"
  ];
  newRule = "div." + klass + " {\n";
  for ( var k in attributesToInherit ) {
    newRule += attributesToInherit[k] +
               ": " +
               document.defaultView.getComputedStyle( cell, "" ).getPropertyValue( attributesToInherit[k] ) +
               ";\n";
  }
  newRule += "}";
  addGlobalStyle(newRule);
}

function replacePillars(div) {
  divId = div.id;
  for (var i = div.childNodes.length - 1; i >= 0; i--) {
    if ( div.childNodes[i].nodeName == "#comment" ) {
      div.removeChild( div.childNodes[i] );
      continue;
    }
    if ( div.childNodes[i].nodeName == "#text" ) {
      if ( div.childNodes[i].nodeValue.match(/^\s*$/) ) {
        div.removeChild( div.childNodes[i] );
        continue;
      }
    }
  }
  if ( div.childNodes.length != 1 )         { return false; }
  if ( div.firstChild.nodeName != "TABLE" ) { return false; }
  
  var rows = document.evaluate("tbody/tr",
    div.firstChild, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = rows.snapshotLength - 1; i >= 0; i--) {
    var row = rows.snapshotItem(i);
    removeEmptyChildNodes(row);
    if ( row.childNodes.length > 1 ) {
      return false;
    }
  }
  
  var lastReplacedIdx = -1;
  for (var i = rows.snapshotLength - 1; i >= 0; i--) {
    if ( rows.snapshotItem(i).childNodes.length == 0 ) { continue; }
    var cell = rows.snapshotItem(i).firstChild;
    var divReplacement = document.createElement('div');
    divReplacement.id = divId + "." + i;
    divReplacement.innerHTML = cell.innerHTML;
    divReplacement.setAttribute("style", cell.getAttribute("style"));
    divReplacement.setAttribute("height", cell.getAttribute("height"));
    divReplacement.setAttribute("class", cell.getAttribute("class"));
    
    if ( lastReplacedIdx < 0 ) {
      div.parentNode.replaceChild(divReplacement, div);
      lastReplacedIdx = i;
    } else {
      var previousDiv = document.getElementById( divId + "." + lastReplacedIdx );
      previousDiv.parentNode.insertBefore(divReplacement, previousDiv);
      lastReplacedIdx = i;
    }
  }
  
  xpath = "//div[starts-with(@id,'" + divId + ".')]";
  var newDivs = document.evaluate(xpath,
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = newDivs.snapshotLength - 1; i >= 0; i--) {
    var newDiv = newDivs.snapshotItem(i);
    replacePillars(newDiv);
  }
  
}

function removeEmptyChildNodes(node) {
  for (var i = node.childNodes.length - 1; i >= 0; i--) {
    if ( node.childNodes[i].nodeName == "#comment" ) {
      node.removeChild( node.childNodes[i] );
      continue;
    }
    if ( node.childNodes[i].nodeName == "#text" ) {
      if ( node.childNodes[i].nodeValue.match(/^\s*$/) ) {
        node.removeChild( node.childNodes[i] );
        continue;
      }
    }
    removeEmptyChildNodes( node.childNodes[i] );
    if ( node.childNodes[i].nodeName == "TD" ) {
      if ( node.childNodes[i].childNodes.length == 0 ) {
        node.removeChild( node.childNodes[i] );
        continue;
      }
    }
  }
}

function removeSingleChildUls() {
  var uls = document.evaluate("//ul",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = uls.snapshotLength - 1; i >= 0; i--) {
    var ul = uls.snapshotItem(i);
    var hasLi = false;
    for (var j = ul.childNodes.length - 1; j >= 0; j--) {
      if ( ul.childNodes[j].nodeName == "LI" ) { hasLi = true; }
    }
    if ( hasLi ) { continue; }
    
    ulReplacement = document.createElement('div');
    ulReplacement.style.paddingLeft = "20px";
    ul.parentNode.insertBefore(ulReplacement, ul);
    ulReplacement.innerHTML = ul.innerHTML;
    ul.parentNode.removeChild(ul);
  }
}

function hideNavSetup() {
  var ibmWelcome = document.getElementById('ibm-welcome-message');
  var hideRightNavSpan = document.createElement('span');
  var hideRightNavLink = document.createElement('a');
  hideRightNavLink.href="#";
  hideRightNavLink.id="toggle-right-nav";
  hideRightNavLink.addEventListener(
    'click',
    function(event) {
      rightNav   = document.getElementById('right-nav');
      navigation = document.getElementById('navigation');
      no_print   = document.evaluate("//*[@id='v14-body-table']/tbody/tr/td[@class='no-print']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      toggleNav  = document.getElementById('toggle-right-nav');
      if ( rightNav.style.display == 'none' ) {
        rightNav.style.display='inline';
        navigation.style.display='inline';
        no_print.style.display='inline';
        toggleNav.innerHTML='Hide Navigation';
        makeMultiColumn();
        //adjust_content_table_width( 150 );
        //adjust_v14_body_table_width( 310 );
      } else {
        rightNav.style.display='none';
        navigation.style.display='none';
        no_print.style.display='none';
        toggleNav.innerHTML='Show Navigation';
        makeMultiColumn();
        adjust_content_table_width( -150 );
        adjust_v14_body_table_width( -310 );
      }
    },
    true
  );
  hideRightNavLink.appendChild(document.createTextNode('Hide Navigation'));
  hideRightNavSpan.appendChild(document.createTextNode('[ '));
  hideRightNavSpan.appendChild(hideRightNavLink);
  hideRightNavSpan.appendChild(document.createTextNode(' ]'));

  hideRightNavSpan.style.cssFloat = "right";
  hideRightNavSpan.style.marginLeft = "4px";
  hideRightNavLink.style.color = "black";
  ibmWelcome.appendChild(hideRightNavSpan);
}

function indexUnderParent(node) {
  parent = node.parentNode;
  for (var i = parent.childNodes.length - 1; i >= 0; i--) {
    if ( parent.childNodes[i] == node ) { return i; }
  }
  return -1;
}

function tt2pre() {
  var tts = document.evaluate("//tt",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = tts.snapshotLength - 1; i >= 0; i--) {
    var tt = tts.snapshotItem(i);
    
    var consecutive_siblings = false;
    if ( i != 0 && tt.parentNode == tts.snapshotItem(i-1).parentNode ) {
      var my_idx          = indexUnderParent( tt );
      var younger_bro_idx = indexUnderParent( tts.snapshotItem(i-1) );
      if ( my_idx = younger_bro_idx + 1 ) { consecutive_siblings = true; }
    }
    
    var pre;
    if ( consecutive_siblings ) {
      pre = tts.snapshotItem(i-1);
    } else {
      pre = document.createElement("pre");
      pre.setAttribute("class", "pre-from-tt");
    }
    while ( tt.firstChild != null ) {
      if ( tt.firstChild.nodeName != "BR" ) {
        pre.appendChild( tt.firstChild );
      } else {
        tt.removeChild( tt.firstChild );
      }
    }
    //alert(tt.parentNode.nodeName);
    //alert(tt.parentNode.parentNode.nodeName);
    if ( tt.parentNode.nodeName == "P" ) {
      tt.parentNode.parentNode.replaceChild(pre, tt.parentNode);
    } else {
      tt.parentNode.replaceChild(pre, tt);
      //tt.parentNode.insertBefore(pre, tt);
    }
  }
  
  addGlobalStyle(
    '.pre-from-tt {\n' +
    '  background-color: #DDDDDD;\n' +
    '  border: 1px solid #AAAAAA;\n' +
    '  margin-top: 5px;\n' +
    '  margin-bottom: 8px;\n' +
    '  overflow: auto;\n' +
    '  width: 443px;\n' +
    '}'
  );
}

function shrinkPres() {
  var pres = document.evaluate("//pre",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = pres.snapshotLength - 1; i >= 0; i--) {
    var pre = pres.snapshotItem(i);
    var sumGap = 0;
    var parent = pre.parentNode;
    while ( parent.id == null || !parent.id.match(/^d\d_\d/) ) {
      sumGap += computedLeftGap( parent );
      parent = parent.parentNode;
    }
    pre.style.width = (computedWidth(pre) - sumGap) + "px";
  }
}

function cleanupBorderedTables() {
  var borderedTables = document.evaluate("//table[@border>0]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = borderedTables.snapshotLength - 1; i >= 0; i--) {
    var table = borderedTables.snapshotItem(i);
    table.setAttribute("border", 0);
    table.setAttribute("cellpadding", 0);
    table.setAttribute("cellspacing", 0);
    table.setAttribute("class", "bordered-table");
  }
  
  addGlobalStyle(
    '.bordered-table {\n' +
    '  border: 1px outset black;\n' +
    '  border-collapse: collapse;\n' +
    '  border-spacing: 0px;\n' +
    '}'
  );
  addGlobalStyle(
    '.bordered-table th,\n' +
    '.bordered-table td {\n' +
    '  border: 1px inset black;\n' +
    '  padding: 1px 2px;\n' +
    '}'
  );
}

function addGlobalStyle(css) {
  try {
    var elmHead, elmStyle;
    elmHead = document.getElementsByTagName('head')[0];
    elmStyle = document.createElement('style');
    elmStyle.type = 'text/css';
    elmHead.appendChild(elmStyle);
    elmStyle.innerHTML = css;
  } catch (e) {
    if (!document.styleSheets.length) {
      document.createStyleSheet();
    }
      document.styleSheets[0].cssText += css;
  }
}

function squeezeWideTables() {
  var borderedTables = document.evaluate( "//table[@class='bordered-table']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  for ( var i = borderedTables.snapshotLength - 1; i >= 0; i-- ) {
    var table = borderedTables.snapshotItem( i );
    var width = computedWidth( table );
    if ( width < 443 + 10 ) { continue; }
    
    allCapsRE = new RegExp("^[A-Z]+$");
    var ths = document.evaluate( "tbody/tr[1]/th",
      table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    for ( var j = ths.snapshotLength - 1; j >= 0; j-- ) {
      var th = ths.snapshotItem( j );
      text = th.firstChild.nodeValue;
      
      if ( text.match( /^[A-Z ]+$/ ) ) {
        th.firstChild.nodeValue = text.substring(0, 1) + text.substring(1, text.length).toLowerCase();
      }
      
      if ( text == "SIZE(Bytes)" ) {
        th.firstChild.nodeValue = "Size (bytes)";
      }
    }
    
    width = computedWidth( table );
    if ( width < 443 + 10 ) { continue; }
    
    var size_bytes_idx = -1;
    var size_bytes_th  = null;
    var ths = document.evaluate( "tbody/tr[1]",
      table, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
    for ( var j = 0; j < ths.children.length; j++ ) {
      th = ths.getElementsByTagName("th")[j];
      
      if ( th.firstChild.nodeValue == "Size (bytes)" ) {
        size_bytes_th  = th;
        size_bytes_idx = j;
      }
    }
    
    // size_bytes_idx should be decremented because the first column is <th>s.
    size_bytes_idx -= 1;
    
    var trs = document.evaluate( "tbody",
      table, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
    var byteses = new Array();
    for ( var j = 1; j < trs.children.length; j++ ) {
      tr = trs.getElementsByTagName("tr")[j];
      td = tr.getElementsByTagName("td")[size_bytes_idx];
      byteses.push(td.innerHTML*1);
    }
    var allMoreThan1K = true;
    var allMoreThan1M = true;
    for ( var j = 0; j < byteses.length; j++ ) {
      if ( byteses[j] < 1024 ) {
        allMoreThan1K = false;
      }
      if ( byteses[j] < 1024*1024 ) {
        allMoreThan1M = false;
      }
    }
    if ( allMoreThan1M ) {
      ths.getElementsByTagName("th")[size_bytes_idx+1].firstChild.nodeValue = "Size";
      for ( var j = 1; j < trs.children.length; j++ ) {
        tr = trs.getElementsByTagName("tr")[j];
        td = tr.getElementsByTagName("td")[size_bytes_idx];
        td.innerHTML = "<span style='white-space: nowrap;'>" + Math.round(td.innerHTML*1.0/1024.0/1024.0) + " MB</span>";
        td.style.textAlign = "right";
      }
    } else if ( allMoreThan1K ) {
      ths.getElementsByTagName("th")[size_bytes_idx+1].firstChild.nodeValue = "Size (KB)";
      for ( var j = 1; j < trs.children.length; j++ ) {
        tr = trs.getElementsByTagName("tr")[j];
        td = tr.getElementsByTagName("td")[size_bytes_idx];
        td.innerHTML = td.innerHTML*1.0/1024.0;
      }
    }
    
    width = computedWidth( table );
    if ( width < 443 + 10 ) { continue; }
    
    // Starting at j = 1 skips the Header row
    for ( var j = 1; j < trs.children.length; j++ ) {
      tr = trs.getElementsByTagName("tr")[j];
      ths = tr.getElementsByTagName("th");
      for ( var k in ths ) {
        var td = document.createElement("td");
        td.innerHTML = ths[k].innerHTML;
        ths[k].parentNode.replaceChild(td, ths[k]);
      }
    }
    
    width = computedWidth( table );
    if ( width < 443 + 10 ) { continue; }
    
    dateRe = /^\d{1,2}\/\d{1,2}\/(\d{4})$/
    // Starting at j = 1 skips the Header row
    for ( var j = 1; j < trs.children.length; j++ ) {
      tr = trs.getElementsByTagName("tr")[j];
      tds = tr.getElementsByTagName("td");
      for ( var k in tds ) {
        var match = dateRe.exec( tds[k].innerHTML );
        if ( match != null && match.length > 1 ) {
          tds[k].innerHTML = match[0].replace( match[1], match[1].substr(2,2) );
        }
      }
    }
  }
}
