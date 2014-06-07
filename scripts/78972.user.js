// ==UserScript==
// @name ProF_filter_msg_fk
// @delete posts flood.
// @author some@cool.programmer.com
// @include http://forum.fxclub.org/showthread.php?*
// ==/UserScript==

blackList = new Array(6602,54899,57464,39004,84138); //Id users for block.


if(document.getElementsByClassName) {
 
	getElementsByClass = function(classList, node) {
		return (node || document).getElementsByClassName(classList)
	}
 
} else {
 
	getElementsByClass = function(classList, node) {
		var node = node || document,
		list = node.getElementsByTagName('*'),
		length = list.length,
		classArray = classList.split(/\s+/),
		classes = classArray.length,
		result = [], i,j, key
		for(i = 0; length > i; i++) {
			for(j = 0; classes > j; j++)  {
				if(list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {
					result.push(list[i])
					break
				}
			}
		}
 
		return result
	}
}
msg = document.getElementsByClassName('bigusername',false);
for (i=0;msg.length>i;i++)
{
	for (j=0;blackList.length>j;j++)
	{
		if (msg[i].href.search(blackList[j])>7)
		{
			msg

[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
		}
	}
	
}