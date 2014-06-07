// ==UserScript==
// @name           Virtuate Oracle EBS Homepage Menu
// @namespace      http://www.virtuate.com/greasemonkey
// @description    Oracle eBusiness Suite OAF Framework Homepage Menu enhancement
// @include        http://*:*/OA_HTML/OA.jsp?OAFunc=OAHOMEPAGE&akRegionApplicationId=*
// @include        http://*:*/OA_HTML/OA.jsp?page=/oracle/apps/fnd/framework/navigate/webui/HomePG*
// ==/UserScript==

// Version History
// Date        Author     Description
// =========== ========== =========================
// 11-NOV-2008 G. Roberts Created
// 12-NOV-2008 G. Roberts Introduced basePath variable, enabled Release 12 support
// 13-NOV-2008 G. Roberts Remove alert on check of 11i/12

// Changeable parameters

var defCollapse = 1; // 1 = Collapse All by default, 0 = Expand All
var strID = 'XXV8ID'; // Parent Menus are given an ID with this prefix for easy reference

// No. 8 Wire solution starts from here!
// Check whether release 11i or 12 and set basePath accordingly
var basePath = ""; // Container for release dependent path to responsibility menu
if ( document.getElementsByTagName('head')[0].innerHTML.indexOf("oafcoreR12") > 0 ) {
  //alert("Set R12");
  basePath = "/html/body/form/span[2]/div/div[3]/table[2]/tbody/tr/td/table/tbody/tr/td/div/div[2]/table[2]/tbody/tr/td[2]/table/tbody";
}
else {
  //alert("Set R11i");
  basePath = "/html/body/form/span[2]/div/table[4]/tbody/tr/td/table/tbody/tr[3]/td/span/table/tbody/tr/td[2]/table/tbody";
}

const MYSCRIPT1 = 'function xxv8_showhide(id){' +
'  var xpathResult = document.evaluate(' + "'" + basePath + '/tr[count(td)=2]/td/span/a[@id="' + "' + " + 'id' + " + '" + '"]/../../../following-sibling::tr' + "'" + ', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); ' +
'  for (var i=0; i<xpathResult.snapshotLength; i++) { ' +
'      var nodeToHide = xpathResult.snapshotItem(i); ' +
'      if (nodeToHide.childNodes.length == 3) {' +
'        if ( nodeToHide.style.display == "none" ) { ' +
'          nodeToHide.style.display = "" ' +
'        } ' +
'        else { ' +
'          nodeToHide.style.display = "none"; ' +
'        } ' +
'      }' +
'      else {' +
'        break;' +
'      }' +
'  } ' +
'}';

const MYSCRIPT2 = 'function xxv8_collapse() {' +
'  var xpathResult = document.evaluate(' + "'" + basePath + '/tr[count(td)!=2]' + "'" + ', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); ' +
'  for (var i=0; i<xpathResult.snapshotLength; i++) { ' +
'      var nodeToHide = xpathResult.snapshotItem(i); ' +
'      if ( nodeToHide.style.display == "" && nodeToHide.innerHTML.indexOf("Collapse") == -1 ) { ' +
'        nodeToHide.style.display = "none" ' +
'      } ' +
'  } ' +
'}';

const MYSCRIPT3 = 'function xxv8_expand() {' +
'  var xpathResult = document.evaluate(' + "'" + basePath + '/tr[count(td)!=2]' + "'" + ', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); ' +
'  for (var i=0; i<xpathResult.snapshotLength; i++) { ' +
'      var nodeToHide = xpathResult.snapshotItem(i); ' +
'      if ( nodeToHide.style.display == "none" ) { ' +
'        nodeToHide.style.display = "" ' +
'      } ' +
'  } ' +
'}';

// Add the custom javascript functions to the page
function addScripts()
{
    var myscript = document.createElement('script');
    myscript.innerHTML = MYSCRIPT1;
    document.getElementsByTagName('head')[0].appendChild(myscript);

    myscript = document.createElement('script');
    myscript.innerHTML = MYSCRIPT2;
    document.getElementsByTagName('head')[0].appendChild(myscript);

    myscript = document.createElement('script');
    myscript.innerHTML = MYSCRIPT3;
    document.getElementsByTagName('head')[0].appendChild(myscript);
}

// Find the first row of the table and insert row above with Collapse/Expand links
function addExpandCollapse()
{
                   
  var expr_find = basePath;
  var xpathResult = document.evaluate(expr_find, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0; i<xpathResult.snapshotLength; i++) {
      var nodeToProcess = xpathResult.snapshotItem(i);
      var newRow = nodeToProcess.insertRow(0);
      var newCell0 = newRow.insertCell(0);
      newCell0.setAttribute("colspan","3");
      newCell0.innerHTML = '<a href=# class="x2o" style="text-decoration:none;" onclick="xxv8_expand()">&nbsp;Expand All</a>&nbsp;|&nbsp;<a href=# class="x2o" style="text-decoration:none;" onclick="xxv8_collapse()">Collapse All</a>';
      break;
  }
}

// Loop through all parents: add id and call to show children on click, plus indent based on number of colons
function processParents()
{
  var indent = "";
  var expr_find = basePath + '/tr[count(td)=2]/td/span';
  var xpathResult = document.evaluate(expr_find, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0; i<xpathResult.snapshotLength; i++) {
      var nodeToHide = xpathResult.snapshotItem(i);
      nodeToHide.innerHTML=indent + '<a href=# class="x55" style="text-decoration:none;" id="' + strID + i + '" onclick="xxv8_showhide(' + "'" + strID + i + "'" + ')">' + nodeToHide.innerHTML + "</a>";
  }
}

// Loop through and hide children
function hideLeafs()
{
  var expr_find = basePath + '/tr[count(td)!=2]';
  var xpathResult = document.evaluate(expr_find, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0; i<xpathResult.snapshotLength; i++) {
      var nodeToHide = xpathResult.snapshotItem(i);
      nodeToHide.style.display='none';
  }
}

// MAIN PROCEDURES
addScripts();
processParents();
if ( defCollapse == 1 ) { 
  hideLeafs();
}
addExpandCollapse();

// ==/UserScript==
