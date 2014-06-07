// ==UserScript==
// @name			Google Apps Email badge for Fluid
// @description	Displays the unread count of selective labels in the OS X Dock
// @author		Ben D'Herville
// ==/UserScript==
window.fluid.dockBadge = '';
setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 5000);

function updateDockBadge() {
	var newBadge = '';

	var anchorEls = document.getElementsByTagName('a');

   // List gmail labels that you want to include in the unread count
   var labels = ['Inbox', 'GitHub Notifications', 'Jira'];

   var totalCount = 0;
   
   for (label in labels) {
     
	  var regex = new RegExp('\\s*' + labels[label] + '\\s*\\((\\d+)\\)[^\\d]*');
	  
	  for (var i = 0; i < anchorEls.length; i++) {
	  	var anchorEl = anchorEls[i];
		
		var text = '' + anchorEl.innerText;
		if (!text.length) continue;
		if (-1 == text.indexOf('(')) continue;
		var res = regex.exec(text);
		if (res && res.length > 1) {
		   totalCount = totalCount + new Number(res[1]);
		}
     }
	}
	
	if (totalCount > 0) {
     newBadge = '' + totalCount;
    }
    
   
	window.fluid.dockBadge = newBadge;
}
