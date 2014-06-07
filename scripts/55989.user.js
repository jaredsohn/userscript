// ==UserScript==
// @name           New XPlanner Task for me
// @namespace      http://userscripts.org/users/anCuasan
// @description    Create a link on XPlanner pages to create a new task which is by default assigned to you. Handy when entering a batch of tasks for yourself.
// @include        http*://xplanner*/xplanner/do/view/userstory*
// ==/UserScript==

XplannerNewTaskForMe = {};
XplannerNewTaskForMe.AcceptorId = '001';						// Your XPlanner acceptor ID
XplannerNewTaskForMe.LinkName = "New task for me";				// The text for the link
XplannerNewTaskForMe.TitleTweak = ' | (NewTaskLinkInserted)';	// optional title tweak, leave blank for nothing

function addCTFM(){
  var newLink = document.createElement('a');
  newLink.setAttribute('title', 'ALT+X');
  newLink.setAttribute('accesskey', 'X');
  newLink.setAttribute('id', 'aKX-ancuasan');

  var oldLink = document.getElementById('aKC');
  var oldLinkHref = oldLink.getAttribute('href');
  var newLinkHref = oldLinkHref + "&acceptorId=" + XplannerNewTaskForMe.AcceptorId ;
  newLink.setAttribute('href',newLinkHref);

  var newLinkSpan = document.createElement('span');
  newLinkSpan.setAttribute('class', 'mnemonic');
  var txtNode = document.createTextNode(XplannerNewTaskForMe.LinkName); 
  
  newLinkSpan.appendChild(txtNode);
  newLink.appendChild(newLinkSpan);
    oldLink.parentNode.appendChild(document.createTextNode(" | "));
    oldLink.parentNode.appendChild(newLink);

}


function doitonload(){
	addCTFM();
	document.title += XplannerNewTaskForMe.TitleTweak;
}


window.addEventListener("load",
		function(e){
			doitonload();
		},
		false
);

