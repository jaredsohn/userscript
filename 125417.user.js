// ==UserScript==
// @name pipo1
// @description pipo2
// ==/UserScript==

window.fluid.dockBadge = '';
setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 5000);

var INBOX_ONLY = false;

function updateDockBadge() {
	var newBadge = 0;
	
	if (INBOX_ONLY)
	{
		var regex = /(Inbox). \((\d+)/;
	} else {
		var regex = /(.*). \((\d+)/;
	}
	
	var tree = document.getElementsByClassName('overflow');
	for (i = 0;  i < tree.length; i++)
	{
		if (tree[i].childNodes[2])
		{
			var text = tree[i].childNodes[0].data;
			//console.log('tree[' + i + '] = ' + text);
			
			var res = text.match(regex);
			if (res && res.length > 1)
			{
				//console.log(res[1] + ': ' + res[2]);
				newBadge += parseInt(res[2]);
			}
		}
	}
	
	if (newBadge)
	{
		window.fluid.dockBadge = newBadge;
	} else {
		window.fluid.dockBadge = '';
	}
}