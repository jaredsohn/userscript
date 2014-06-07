// ==UserScript==
// @name           Highlight My Bugzilla Bugs
// @namespace      http://userscripts.org/users/anCuasan
// @description    Highlights your own bugzilla bugs with a customisable background colour. Finds your bugs using your login name and the assignee field.
// @include        http*://bugzilla*
// @exclude		   http*://bugzilla*/show_bug.cgi*
// ==/UserScript==


// config
BugzillaHighlightMyBugs = {};
BugzillaHighlightMyBugs.BugAssignee = 'bugzillauser@ancuasan.com';	// your bugzilla login
BugzillaHighlightMyBugs.BugColor = '#E6E6FF';						// the color you want to highlight your bugs with
BugzillaHighlightMyBugs.TitleTweak = ' | (Highlight on)';				// optionall title tweak, leave blank for nothing

function doHMB(){
  var bugBodyNode = document.getElementById('bugzilla-body');
  
  // xpath to get collection of my bug rows
  var result = document.evaluate("//tr[td[contains(.,'"+BugzillaHighlightMyBugs.BugAssignee+"')]]", 
                                   bugBodyNode, 
                                   null, 
                                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
                                   null 
								   );
  try   {
    var i = 0;
    var thisNode = result.snapshotItem(i);
    while (thisNode)     {
      i++;
      thisNode.style.backgroundColor = BugzillaHighlightMyBugs.BugColor  
      thisNode = result.snapshotItem(i);
    }	
  }
  catch (e) {
    alert( 'Error: Document tree modified during iteration ' + e );
  }
}

function doitonload() {
  doHMB();
  document.title += BugzillaHighlightMyBugs.TitleTweak;
}

window.addEventListener("load", 
  function(e)   {
    doitonload();
  }, 
  false
);
