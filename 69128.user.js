// ==UserScript==
// @name           Block Requesters
// @author         Ergo
// @version        1.1.0
// @namespace      http://www.crowdsauced.com/block
// @homepage       http://www.mturkforum.com/showthread.php?t=1088
// @description    Hide HITs from requesters you're not interested in.
// @include        https://www.mturk.com/mturk/findhits*
// @include        https://www.mturk.com/mturk/searchbar*
// @include        https://www.mturk.com/mturk/viewsearchbar*
// @include        https://www.mturk.com/mturk/sorthits*
// @include        https://www.mturk.com/mturk/viewhits*
// @include        https://www.mturk.com/mturk/accept*
// @include        https://www.mturk.com/mturk/preview*
// @include        https://www.mturk.com/mturk/return*
// ==/UserScript==

requesterIndex = GM_getValue("requesterIndex");
if(!requesterIndex) {
  //alert(requesterIndex);
  requesterIndex="";
  
  GM_setValue("requesterIndex","");
}


function showUpdates() {
  updated = GM_getValue('requesterUpdated');
  if (updated) {
    tables = document.evaluate("//table",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    table = tables.snapshotItem(6);
    action = updated.split(',');
    rId = action[1].split('::')[0];
    rName = action[1].split('::')[1];
    div = document.createElement('div');
    div.id = 'updated';
    status = "<div class='message success'><h6><span id='alertboxHeader'>"+action[0]+" "+rName;
    if (action[0]=='Blocked') {
      status+=" <a style='font-size:80%;' href='javascript:unblockRequester(\""+rId+"\",\""+rName+"\");' title='Unblock this requester'>undo</a>";
    }
    div.innerHTML = status + "</h6></span></div>";
      table.parentNode.insertBefore(div, table);
    GM_deleteValue('requesterUpdated');
  }
}

function hideHIT(element) {
  pa=element, step=0;
  while (step++ < 14) {
    ch = pa;
    pa = pa.parentNode;
  }
  pa.className = "blocked";
}

function unhideHIT(element) {
  pa=element, step=0;
  while (step++ < 14) {
    ch = pa;
    pa = pa.parentNode;
  }
  pa.className = "";
}

function hideMatchingHITs() {
  var numBlocked=0;
  theseRequesters = document.evaluate("//a[starts-with(@href,'/mturk/searchbar?selectedSearchType=hitgroups&requesterId=')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (i=0; i<theseRequesters.snapshotLength; i++) {
    rLink = theseRequesters.snapshotItem(i);
	rLink.parentNode.nowrap = false;
	rName = rLink.innerHTML;
    rId = rLink.href.toString().split('=')[2];
    if (requesterIndex.indexOf(rId) != -1 && location.href.indexOf(rId) == -1) {
      newElement = document.createElement('a');
      newElement.innerHTML = "&nbsp;<a style='font-size:80%;' href='javascript:unblockRequester(\""+rId+"\",\""+rName+"\");' title='Unblock this requester'>unblock</a>";
      rLink.parentNode.insertBefore(newElement, rLink.nextSibling);
      hideHIT(rLink);
  	  numBlocked+=1;
    } else {
      newElement = document.createElement('a');
      newElement.innerHTML = "&nbsp;<a href='javascript:blockRequester(\""+rId+"\","+i+");' style='font-size:80%;' title='Block this requester'>x</a>";
      rLink.parentNode.insertBefore(newElement, rLink.nextSibling);
    }
  }
  return numBlocked;
}

unsafeWindow.unhideAllHITs = function () {
	theseRequesters = document.evaluate("//a[starts-with(@href,'/mturk/searchbar?selectedSearchType=hitgroups&requesterId=')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i<theseRequesters.snapshotLength; i++) {
		unhideHIT(theseRequesters.snapshotItem(i));
	}
}

function showNumBlocked(numBlocked) {
  collapseAll = document.getElementById('collapseall');
  showAllBlocked = document.createElement("span");
  showAllBlocked.innerHTML = '&nbsp;&nbsp;<font color="#9ab8ef">|</font>&nbsp;&nbsp;<a href="javascript:unhideAllHITs();" class="footer_links" id="showblocked">Show ' + numBlocked + ' Blocked</a>';
  collapseAll.parentNode.insertBefore(showAllBlocked, collapseAll.nextSibling);
}
           
		   


unsafeWindow.blockRequester = function (rId,i) {
    rName = theseRequesters.snapshotItem(i).innerHTML;
    rEntry = rId+"::"+rName;
    requesterIndex+= rEntry+"}{";
    if (confirm("Hide HITs from "+rName+" ("+rId+")?")) { 
		window.setTimeout(function() {
			GM_setValue("requesterIndex", requesterIndex);
			GM_setValue("requesterUpdated", "Blocked,"+rEntry);
		  }, 0);
      //window.setTimeout(GM_setValue, 0, "requesterIndex", requesterIndex);
      //window.setTimeout(GM_setValue, 0, "requesterUpdated", "Blocked,"+rEntry);
	  
	 
      document.location.reload();
    }
}





unsafeWindow.unblockRequester = function (rId,rName) {
  theseRequesters = document.evaluate("//a[starts-with(@href,'/mturk/searchbar?selectedSearchType=hitgroups&requesterId=')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  rEntry = rId+"::"+rName;
  half = requesterIndex.split(rId+"::");
  left = half[0];
  temp = half[1].split('}{');
  right = temp[1]+"}{";
  if (temp.length>1) {
    for (i=2;i<temp.length-1;i++) {
      right+=temp[i]+"}{";
    }
  }  
  requesterIndex = left + right;
  window.setTimeout(function() {
			GM_setValue("requesterIndex", requesterIndex);
			GM_setValue("requesterUpdated", "Unblocked,"+rEntry);
		  }, 0);
  //window.setTimeout(GM_setValue, 0, "requesterIndex", requesterIndex);
  //window.setTimeout(GM_setValue, 0, "requesterUpdated", "Unblocked,"+rEntry);
  document.location.reload();
}

function addGlobalStyle(css) {
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.blocked { display: none; }');
showUpdates();
showNumBlocked(hideMatchingHITs());
