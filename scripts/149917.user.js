// ==UserScript==
// @name           showBR info
// @namespace      www.google.com
// @description    Actually display information you'd want to see on this screen.
// @include        https://previewwebcenter.applyyourself.com/AYConfigBusRules/BRDispAll.asp?*
// ==/UserScript==

console.log('test?');
mainForm = document.getElementById('contentCol').getElementsByTagName('form')[0];
savedPNode = mainForm.getElementsByTagName('tbody')[0];
allTheTrs = mainForm.getElementsByTagName('tr');
mainTrs = [];
for(i=0;i<allTheTrs.length;i++)
{
	if(allTheTrs[i].parentNode == savedPNode && allTheTrs[i].id.indexOf('row') != -1)
	{
		mainTrs.push(allTheTrs[i-1]);
		mainTrs.push(allTheTrs[i]);
	}
}

for(i=0;i<mainTrs.length;i++)
{
	if(mainTrs[i].id.indexOf('row') != -1)
	{
		number = mainTrs[i].getElementsByTagName('tr').length;
		mainTrs[i-1].getElementsByTagName('td')[1].innerHTML = mainTrs[i-1].getElementsByTagName('td')[1].innerHTML + " - ("+number+")";
	}
}