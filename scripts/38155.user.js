// ==UserScript==
// @name           linkToMap
// @namespace      http://localhost/lee/scripts
// @description    linkToMap
// @include        *new.realmofempires.com/BrowseThreads.aspx*
// @include        *new.realmofempires.com/ShowThread.aspx*
// @include        *www.realmofempires.com/ShowThread.aspx*
// @include        *www.realmofempires.com/BrowseThreads.aspx*
// @include        *.realmofempires.com/messageDetail.aspx*
// @include        *.realmofempires.com/mail.aspx*
// 
// ==/UserScript==
// version 1 - links in forum from forum titles
// version 2 - added links in forums threads, in posts
// version 3 - added links in mail subjects, and mail contents
// version 4 - added support, attack and send silver to links
// version 5 - added links inline rather than end of body for forum and messages
// version 5.1 - removed a few bugs 
//
var allLinks, thisLink, s;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//	alert(allLinks.snapshotLength);
	for (var i = 0; i < allLinks.snapshotLength; i++) 
	{
		thisLink = allLinks.snapshotItem(i);
		var insert = thisLink.nextSibling;
		if (thisLink.href.indexOf('ShowThread') != -1 || thisLink.href.indexOf('messageDetail') != -1)
		{
			s = thisLink.innerHTML;
			var index1 = s.indexOf('(', 0);
			var index2 =  s.indexOf(',', index1);
			var index3 = s.indexOf(')', index2);

			while (( index1 != -1) &&
			 	(index2 != -1) &&
			 	(index3 != -1))
			{
				var x = s.substring( index1 + 1, index2);
				var y = s.substring( index2 + 1, index3);
				add_link(x,y,thisLink);
				index1 = s.indexOf('(', index3);
				index2 = s.indexOf(',', index1);
				index3 = s.indexOf(')', index2);

			}
		
    	//	thisLink.href += '#';
		}
	}

allLinks = document.evaluate(
    '//div[@class="postbody"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	//alert(allLinks.snapshotLength);
	for (var i = 0; i < allLinks.snapshotLength; i++) 
	{
		thisLink = allLinks.snapshotItem(i);
		var insert = thisLink.nextSibling;
  	
			s = thisLink.innerHTML;
			var index3 = s.lastIndexOf(')');
			var index2 =  s.lastIndexOf(',', index3);
			var index1 = s.lastIndexOf('(', index2);

			index2 = s.indexOf(',', index1);
			index3 = s.indexOf(')', index2);

			while (( index1 != -1) &&
			 	(index2 != -1) &&
			 	(index3 != -1))
			{
				var x = s.substring( index1 + 1, index2);
				var y = s.substring( index2 + 1, index3);
				thisLink.innerHTML = thisLink.innerHTML.substr(0,index3+1) + return_link(x,y) + thisLink.innerHTML.substr(index3+1)

				index3 = s.lastIndexOf(')', index1);
				index2 = s.lastIndexOf(',', index3);
				index1 = s.lastIndexOf('(', index2);

				index2 = s.indexOf(',', index1);
				index3 = s.indexOf(')', index2);


			}
		
    	//	thisLink.href += '#';
		
	}

//    '//span[@id="*_LblMessage"]',
	
	allLinks = document.evaluate(
    '//span/span',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//	alert(allLinks.snapshotLength);
	for (var i = 0; i < allLinks.snapshotLength; i++) 
	{
		thisLink = allLinks.snapshotItem(i);
		var insert = thisLink.nextSibling;
  	
			s = thisLink.innerHTML;
			var index3 = s.lastIndexOf(')');
			var index2 =  s.lastIndexOf(',', index3);
			var index1 = s.lastIndexOf('(', index2);

			index2 = s.indexOf(',', index1);
			index3 = s.indexOf(')', index2);

			while (( index1 != -1) &&
			 	(index2 != -1) &&
			 	(index3 != -1))
			{
				var x = s.substring( index1 + 1, index2);
				var y = s.substring( index2 + 1, index3);
				
				thisLink.innerHTML = thisLink.innerHTML.substr(0,index3+1) + return_link(x,y) + thisLink.innerHTML.substr(index3+1)
				index3 = s.lastIndexOf(')', index1);
				index2 = s.lastIndexOf(',', index3);
				index1 = s.lastIndexOf('(', index2);

				index2 = s.indexOf(',', index1);
				index3 = s.indexOf(')', index2);


			}
		
    	//	thisLink.href += '#';
		
	}
	function return_link(x,y)
	{
		var   newElement ;
		var   newElement2 ;
				if (isNaN(x)==false &&isNaN(y)==false)
				{

					newElement = document.createElement('span');
					newElement.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
				

					newElement2 = document.createElement('a');
					with(newElement2)
					{	innerHTML = '(' + x + ',' + y + ')<img style="border-width: 0px;" src="images/globeIcon_small.png"/>';
						setAttribute('target', '_blank');
						setAttribute('href', 'Map.aspx?&x='+x+'&y='+y);
					}
					newElement.appendChild(newElement2);
					newElement2 = document.createElement('a');
					with(newElement2)
					{	innerHTML = '<img style="border-width: 0px;" src="images/attack.png"/>';
						setAttribute('target', '_blank');
						setAttribute('href', 'CommandTroops.aspx?x='+x+'&y='+y+'&cmd=1');
					}
					newElement.appendChild(newElement2);
					newElement2 = document.createElement('a');
					with(newElement2)
					{	innerHTML = '<img style="border-width: 0px;" src="images/support.png"/>';
						setAttribute('target', '_blank');
						setAttribute('href', 'CommandTroops.aspx?x='+x+'&y='+y+'&cmd=0');

					}
					newElement.appendChild(newElement2);
					newElement2 = document.createElement('a');
					with(newElement2)
					{	innerHTML = '<img style="border-width: 0px;" src="images/coin_small.png"/>';
						setAttribute('target', '_blank');
						setAttribute('href', 'TransportSilver.aspx?x='+x+'&y='+y);
					}
					newElement.appendChild(newElement2);
				//	alert(newElement.innerHTML);
					return newElement.innerHTML ;
				}
	}
	function add_link(x,y,thisLink)
	{
		var   newElement ;
				if (isNaN(x)==false &&isNaN(y)==false)
				{

					newElement = document.createElement('span');
					newElement.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
					thisLink.parentNode.insertBefore(newElement, insert);

					newElement = document.createElement('a');
					with(newElement)
					{	innerHTML = '(' + x + ',' + y + ')<img style="border-width: 0px;" src="images/globeIcon_small.png"/>';
						setAttribute('target', '_blank');
						setAttribute('href', 'Map.aspx?&x='+x+'&y='+y);
					}
					thisLink.parentNode.insertBefore(newElement, insert);
					newElement = document.createElement('a');
					with(newElement)
					{	innerHTML = '<img style="border-width: 0px;" src="images/attack.png"/>';
						setAttribute('target', '_blank');
						setAttribute('href', 'CommandTroops.aspx?x='+x+'&y='+y+'&cmd=1');
					}
					thisLink.parentNode.insertBefore(newElement, insert);
					newElement = document.createElement('a');
					with(newElement)
					{	innerHTML = '<img style="border-width: 0px;" src="images/support.png"/>';
						setAttribute('target', '_blank');
						setAttribute('href', 'CommandTroops.aspx?x='+x+'&y='+y+'&cmd=0');

					}
					thisLink.parentNode.insertBefore(newElement, insert);
					newElement = document.createElement('a');
					with(newElement)
					{	innerHTML = '<img style="border-width: 0px;" src="images/coin_small.png"/>';
						setAttribute('target', '_blank');
						setAttribute('href', 'TransportSilver.aspx?x='+x+'&y='+y);
					}
					thisLink.parentNode.insertBefore(newElement, insert);

				}
	}
