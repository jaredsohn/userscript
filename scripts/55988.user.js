// ==UserScript==
// @name           Highlight My Xplanner Tasks
// @namespace      http://userscripts.org/users/anCuasan
// @description    Highlights your own XPlanner tasks with a customisable background colour. Uses the 'Acceptor ID' field to isolate your tasks.
// @include        http*://xplanner*/do/view/*
// ==/UserScript==

// config
XplannerHighlightMyTasks = {};
XplannerHighlightMyTasks.TaskAcceptor = 'ancuasan';			// the acceptor text that shows for your tasks, your initials or name generally.
XplannerHighlightMyTasks.TaskColor = '#D0F0FF';				// the color you want to highlight your tasks with 
XplannerHighlightMyTasks.TitleTweak = ' | (Highlight on)';		// optional title tweak, leave blank for nothing

function doHMT(){
  var taskTableNode = document.getElementById('objecttable');
      
  // xpath to get collection of my task rows
  var result = document.evaluate("//tr[td/a[text()='"+XplannerHighlightMyTasks.TaskAcceptor+"']]", 
                                   taskTableNode, 
                                   null, 
                                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
                                   null );
  try {
    var i = 0;
    var thisNode = result.snapshotItem(i);
    while (thisNode) {
      i++;
      thisNode.style.backgroundColor = XplannerHighlightMyTasks.TaskColor;
      thisNode = result.snapshotItem(i);
    }	
  }
  catch (e)   {
    alert( 'Error: Document tree modified during iteration ' + e );
  }  
}



function doitonload(){
	doHMT();
	document.title += XplannerHighlightMyTasks.TitleTweak;
}


window.addEventListener("load",
		function(e){
			doitonload();
		},
		false
);


