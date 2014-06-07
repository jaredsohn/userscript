/*===================================================================================*\
| For vBulletin 3.7
|  Google Groups Killfile v3.5.1                                                      |
|    2008 by Damian Penney, Tim & Jeff Ur                                             |
|  This script add a very basic killfile to Google Groups, click on the X by any      |
|  authors name to make them disappear for good. It's essentially the Metafilter      |      
|  killfile script written by Mystyk with a bit of jiggery pokery applied.            |
|                                                                                     |
|  JU: Changed topic list kill to kill-by-topic with RE matching                      |
|      Broke different view type handling into separate functions                     |
\*===================================================================================*/

// ==UserScript==
// @name           vBulletin Ignore List
// @description    Ignore users on vBulletin
// @include        http://forums.*.*/*
// ==/UserScript==

// Start

var showing = false;

unsafeWindow.setOP = function(value){
	window.setTimeout(setOption, 0, value);
}

function setOption(value){
	GM_setValue('IgnoreListOptions', value);
}

unsafeWindow.closeKillList = function() {
  var killDiv = document.getElementById("killList");
  killDiv.style.visibility = "hidden";
}
  
unsafeWindow._Reanimate = function(killspec) {
	window.setTimeout(Reanimate, 0, killspec);
}

unsafeWindow._EditFilter = function(killspec1, killspec2) {
	window.setTimeout(EditFilter, 0, killspec1, killspec2);
}

unsafeWindow._REEditFilter = function(killspec) {
	window.setTimeout(REEditFilter, 0, killspec);
}

unsafeWindow._GoogleKillFile_Set = function(killspec) {
  killspec = killspec.replace(/^\s+|\s+$/g,"");
	window.setTimeout(SetKillFile, 0, killspec);
}


function JavaScriptEscape(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '"', '\'', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return escape(text.replace(arguments.callee.sRE, '\\$1'));
}

function QuoteEscape(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '\''
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return escape(text.replace(arguments.callee.sRE, '\\$1'));
}

function RegExpEscape(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}

function Reanimate(killspec)
{
  var splitCh = String.fromCharCode(255);
  var data = "";
  var list = new Array();
  var newList = new Array();
  
  // initialize variables

  data = unescape(GM_getValue("GoogleKillFile", "-----"));
  list = data.split(splitCh);

  for (var j=0; j<list.length; j++) {
    if (list[j] != killspec) {
      newList.push(list[j]);
    }
  }
  updateKillFile(newList);
  alert(killspec + ' has been removed from the KillFile.\nRefresh page to see changes.');  
}

function EditFilter(killspec1, killspec2)
{
  var splitCh = String.fromCharCode(255);
  var data = "";
  var list = new Array();
  var newList = new Array();
  
  // initialize variables

  data = unescape(GM_getValue("GoogleKillFile", "-----"));
  list = data.split(splitCh);

  for (var j=0; j<list.length; j++) {
    if (list[j] != killspec2) {
      newList.push(list[j]);
    }
  }

  killspec1 = prompt("Edit", killspec1);

  if(killspec1 == null)
    return;

  killspec1 = RegExpEscape(killspec1);
  newList.push(killspec1);

  updateKillFile(newList);
  alert(killspec1 + ' has been added to the KillFile.\nRefresh page to see changes.');  
}

function REEditFilter(killspec)
{
  var splitCh = String.fromCharCode(255);
  var data = "";
  var list = new Array();
  var newList = new Array();
  
  // initialize variables

  data = unescape(GM_getValue("GoogleKillFile", "-----"));
  list = data.split(splitCh);

  for (var j=0; j<list.length; j++) {
    if (list[j] != killspec) {
      newList.push(list[j]);
    }
  }

  killspec = prompt("Edit Regular Expression", killspec);

  if(killspec == null)
    return;

  newList.push(killspec);

  updateKillFile(newList);
  alert(killspec + ' has been added to the KillFile.\nRefresh page to see changes.');  
}

function SetKillFile(killspec)
{
  var splitCh = String.fromCharCode(255);
  var data = "";
  var list = new Array();
  
  // initialize variables

  killspec = prompt("Add to KillFile", killspec);
  data = unescape(GM_getValue("GoogleKillFile", "-----"));
  list = data.split(splitCh);
  list.push(RegExpEscape(killspec));
  
  updateKillFile(list);
  alert(killspec + ' has been added to the KillFile.\nRefresh page to see  changes.');
  // re-save new list with names added or removed
}

unsafeWindow.ManageKillFile = function() {
  var killDiv = document.getElementById("killList");
  if (showing == false) {
    killDiv.style.visibility = "visible";
    showing = true;
  } else {
    killDiv.style.visibility = "hidden";
    showing = false;
  }
}

function GroupsBeta_Topic_List(list) {  
  // Delete threads / Add ignore topic in Topic List View
  var candidates = document.evaluate("//div[@class='maincontoutboxatt']//td", document, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var foundRow = 0;

  if (candidates.snapshotLength > 0) {
    var topicRE = new RegExp(".");

    for (i=0; i<candidates.snapshotLength; i=i+6) {
      var cand = candidates.snapshotItem(i+1);
      var topic = "Topic:" + cand.textContent;
      
      var candu = candidates.snapshotItem(i+4);
      var user = candu.textContent;
      
      var blocked = false;
      
      for (var j=0; !blocked && j<list.length; j++) {
        	topicRE.compile("^" + list[j]);
        	if (topicRE.test(topic)|| topicRE.test(user)) {
          	var parentRow = cand.parentNode;
          	var parentTable = parentRow.parentNode;
          	parentTable.removeChild(parentRow);
          	blocked = true;
        	}
      }
      
        
      if (!blocked) {
        // Topic wasn't blocked so add the X
        var link = document.createElement("a");
        var linku = document.createElement("a");
        var userName = user.replace(/ \(\d+ author.?\)/, "");
    		var topic = topic.replace(/'/g, "\\'");
    
        link.href = "javascript:_GoogleKillFile_Set('" + topic + "');";
        link.style.color = "#ccc";
        linku.href = "javascript:_GoogleKillFile_Set('" + userName + "');";
        linku.style.color = "#ccc";
          
        if (foundRow < 2) {
          link.appendChild(document.createTextNode(""));
          linku.appendChild(document.createTextNode(""));
          foundRow++;
        }
        else {
          cand.firstChild.backgroundColor = "#f00";
          link.appendChild(document.createTextNode("X"));
          candu.firstChild.backgroundColor = "#f00";
          linku.appendChild(document.createTextNode("X"));
        }
          
        cand.parentNode.insertBefore(link, cand.nextSibling);
        candu.parentNode.insertBefore(linku, candu.nextSibling);
      }
    }
  }
}

function GroupsBeta_Topic_Summary(list) {  
  // Delete threads / Add ignore user option in Topic Summary Mode
  var candidates = document.evaluate("//div[@class='maincontoutboxatt']//td[2]//div [1]/font/font/b[1] | //div[@class='maincontoutboxatt']//td[2]/a[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  if (candidates.snapshotLength > 0) {
    var topicRE = new RegExp(".");

    for (i=0; i<candidates.snapshotLength; i=i+2) {
      var candt = candidates.snapshotItem(i);
      var topic = "Topic:" + candt.textContent;
      var cand = candidates.snapshotItem(i+1);
      var user = cand.textContent;
      var blocked = false;
      
      for (var j=0; !blocked && j<list.length; j++) {

        topicRE.compile("^" + list[j]);
        if (topicRE.test(topic) || topicRE.test(user)) {
          wrappingTable = document.evaluate("ancestor::table[1]", cand, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          GM_log(wrappingTable);
          var pNode = wrappingTable.snapshotItem(0);
          pNode.parentNode.removeChild(pNode);
          blocked = true;
        } 
      }

      if (!blocked) {
        var spacer = document.createTextNode(" ");
        var spacert = document.createTextNode("  ");
        var link = document.createElement("a");
        var bold = document.createElement("b");
        
        link.href = "javascript:_GoogleKillFile_Set('" + user + "');";
                
        link.appendChild(document.createTextNode("Ignore User"));
        bold.appendChild(link);
        
        cand.parentNode.insertBefore(bold, cand.nextSibling);
        cand.parentNode.insertBefore(spacer, cand.nextSibling);         
        blocked = false;

	var boldt = document.createElement("b");
        var linkt = document.createElement("a");
     	var topic = topic.replace(/'/g, "\\'");

        linkt.href = "javascript:_GoogleKillFile_Set('" + topic + "');";
                
        linkt.appendChild(document.createTextNode("[ Kill Thread ]"));
        boldt.appendChild(linkt);


        candt.parentNode.insertBefore(boldt, candt.nextSibling);
        candt.parentNode.insertBefore(spacert, candt.nextSibling);         
        
      }
    }
  }
}

function GroupsBeta_Thread_View(list) {  
  // Delete user from thread index
  GM_log("thread view");
  var candidates = document.evaluate("id('threadslist')//tbody[2]//tr/td[@class='alt1'][2]/div/span[@onclick!='']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  if (candidates.snapshotLength > 0) {
    var topicRE = new RegExp(".");

    GM_log("Found " + candidates.snapshotLength + " authors in the thread index");
    for (var i=0; i<candidates.snapshotLength; i++) {
      var cand = candidates.snapshotItem(i);
      var user = cand.textContent;
      var blocked = false;
      GM_log(user);
	
      for (var j=0; !blocked && j<list.length; j++) {
      	topicRE.compile("^[0-9]+." + list[j]);
		topicRE = new RegExp(list[j]);
        if (topicRE.test(user)) {
          GM_log("Stripping " + user);   


          // Now we need to strip the row
          var authNode = candidates.snapshotItem(i);
          GM_log(authNode);
          var rowNodes = document.evaluate("ancestor::tr", authNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

          if (rowNodes.snapshotLength > 0) {
            for (var u=0; u < rowNodes.snapshotLength; u++) {
              rowNodes.snapshotItem(u).parentNode.removeChild(rowNodes.snapshotItem(u));
            }
            blocked = true;
          } else {
          	GM_log("nothing found");
          }

          //candidates.snapshotItem(i).parentNode.removeChild(candidates.snapshotItem(i));
        }          
      }
    }
  }
}

function GroupsBeta_Thread_Comment_View(list) {  
  // Delete comments in thread comment view

  var posts = document.getElementById('posts');
  if(!posts) return;
  
   var candidates = document.evaluate("id('posts')/div/table/tbody/tr[2]/td[1]/div[1]/a", posts, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  var blocked = false;
  
  if (candidates.snapshotLength > 0) {
    for (var i=0; i<candidates.snapshotLength; i++) {
      var cand = candidates.snapshotItem(i);
      var user = cand.textContent;

      blocked=false;
      
      for (var j=0; !blocked && j<list.length; j++) {
  
        if (user.indexOf(list[j]) >= 0) {
          wrappingTable = document.evaluate("ancestor::table", cand, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					GM_log("stripping comment from thread view");
               
          var pNode = wrappingTable.snapshotItem(0);
          pNode.parentNode.removeChild(pNode);
          blocked = true;
        }
      }
          
      if (!blocked) {
        var spacer = document.createTextNode(" ");
        var link = document.createElement("a");
        link.href = "javascript:_GoogleKillFile_Set('" + user + "');";
                
        cand.appendChild(spacer);
        link.appendChild(document.createTextNode(" [Ignore]"));
                 
        cand.parentNode.insertBefore(link, cand.nextSibling);
        blocked = false;
      }
    }
  }  
}

function updateKillFile(list) {
  var splitCh = String.fromCharCode(255);
  data = list.join(splitCh);
  window.setTimeout(GM_setValue, 0, "GoogleKillFile", escape(data));
  updateKillFileText(list);
}

function updateKillFileText(list) {
  var newDiv = document.getElementById("killList");
  
  var divHtml = "<b>The Ignore List</b>";
   divHtml = divHtml + "<span style='float:right'><a href=\"javascript:closeKillList ();\">CLOSE</a></span>";
   divHtml += '<br/><br/>';
   divHtml += "<form><br/><input id='deleteOP' onclick='setOP(this.checked)' type='checkbox'> Delete opening post</form>";
  divHtml += "<br/><a href=\"javascript:_GoogleKillFile_Set('username');\">Add user</a><br/>";
  divHtml +=
	"X - remove from list<br/>" +
    "E - edit user name<br/><br/>" ;
	
  for (var j=1; j<list.length; j++) {
    divHtml += 
      "<a href=\"javascript:_Reanimate('" + JavaScriptEscape(list[j]) + "');\">X</a> " +
      "<a href=\"javascript:_EditFilter('" + QuoteEscape(list[j]) + "','" + JavaScriptEscape(list[j]) + "');\">E</a> " +
	  list[j] + "<br/>";
  }

  divHtml += "<br/><br/><center><font size=0.5em>Brought to you by <a  href=\"http://www.penney.org/\">penney.org</a></font></center>";
  newDiv.innerHTML = divHtml;
  
  document.getElementById('deleteOP').checked = GM_getValue('IgnoreListOptions',false);
}

function GroupsBeta_Run() {  
   // Add the kill file menu option to the menu bar
  var splitCh = String.fromCharCode(255);
  var list = new Array();
  data = unescape(GM_getValue("GoogleKillFile", "-----"));
  list = data.split(splitCh);

  var titleView = false;
 
  // Determine what view mode we are in
  var candidates = document.evaluate("//DIV[@class='maincontboxhead']//td[2]//span//b",  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0; i<candidates.snapshotLength; i++) {
    var cand = candidates.snapshotItem(i);
    
    if (cand.textContent.indexOf("Topic list") >= 0) {
      titleView = true;
    }
  }
  
  // Add the Killfile Menu Option to the top nav
  //candidates = document.evaluate("//DIV[@class='gtopbar']//nobr//a", document, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  //for (var i=0; i<candidates.snapshotLength; i++) {
   // var cand = candidates.snapshotItem(i);
    //var candParent = cand.parentNode;
    //var linkText = cand.textContent;
    //GM_log(linkText);
	var cand = document.getElementById('navbar_search');
	var candParent = cand.parentNode;
    //if (linkText.indexOf("Help") >= 0) {
      var newLink = document.createElement('a');
      newLink.setAttribute('href', 'javascript:ManageKillFile()');
      var pipe = document.createTextNode(" | ");
      var linkText = document.createTextNode("Ignore List");

	  var tdata = document.createElement('td');
	  tdata.className = 'vbmenu_control';
      candParent.appendChild(tdata);
	  tdata.appendChild(newLink);
      newLink.appendChild(linkText);
      
      // Creat the div that will show all the folks on the killfile
      var newDiv = document.createElement("div");
      newDiv.id = "allfolks";
      var divHtml = "The Morgue";
      newDiv.innerHTML = divHtml;
       
      cand.parentNode.insertBefore(newDiv, cand.nextSibling);
       
      newDiv.style.position = "absolute";
      newDiv.style.top = "10px";
      newDiv.style.left = "10px";
      newDiv.style.backgroundColor = "#fff";
      newDiv.style.fontSize = "12px";
      newDiv.style.fontFamily = "Verdana";
      newDiv.style.padding = "10px";
      newDiv.style.border = "solid 1px #000000";
      newDiv.style.visibility = "hidden";
      newDiv.id = "killList";
      newDiv.style.zIndex = "300";
	  newDiv.style.textAlign = 'left';
      updateKillFileText(list);
    //}
  //}
	var option = GM_getValue('IgnoreListOptions', false);
	if(option) 
		GroupsBeta_Thread_View(list);
    GroupsBeta_Thread_Comment_View(list);
}

// Main routine
GM_log(location.href);
GroupsBeta_Run();
// End




