// ==UserScript==
// @name           Douban Quote Button
// @namespace      http://jarodwang.blogcn.com/
// @description    script to add a quote button to douban.com to make quote thread more easily
// @include        http://www.douban.com/review/*
// @include        http://www.douban.com/group/topic/*
// @include        http://www.douban.com/forum/*
// ==/UserScript==

function xpath(query)
{
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function generateQuoteLink(td, txtarea)
{
	var d = document.createElement('div');
	d.align = 'right';
  
	var spn = document.createElement('span');
	spn.style.cssText = 'float: right;';
	spn.className = 'act';
  
	var alink = document.createElement('a');
	alink.href = "javascript:;";
	alink.innerHTML = decodeURI("%E5%BC%95%E7%94%A8");
  
	alink.addEventListener('click', function(event)
	{
		var str = "";
		var maxlength = 250;
		var node = td.childNodes[1];
		
		while (node != null && str.length <= maxlength)
		{
			if (node.nodeType == 3)
				str += node.textContent;
				
			if (node.nextSibling != null &&
            	node.nextSibling.nextSibling != null &&
            	node.nextSibling.nextSibling.nodeType == 1 &&
            	node.nextSibling.nextSibling.tagName.toLowerCase() == 'div')
            	break;
			node = node.nextSibling;
		}
		
		if (str.length > maxlength)
			str = str.substring(0, maxlength) + "...";
					
		// get the author of the quoted thread
		var strAuthor = td.getElementsByTagName('h3')[0].firstChild.childNodes[1].text;
		
		// get the time of the quoted thread
		// here I must use "textContent" other than "text", why?
		var strTime = td.getElementsByTagName('h3')[0].firstChild.childNodes[0].textContent;
		
		// get the content of the quoted thread
		// here I must use "textContent" other than "text", why?
		var strContent = td.getElementsByTagName('p')[0].textContent;
			
		str = strAuthor + " " + strTime + '\n' + strContent + str;
		
		if (txtarea.value != "")
			txtarea.value += "\n";
     	
		txtarea.value += "-----------------------------------";
		txtarea.value += "\n";
		txtarea.value += str;
		txtarea.value += "\n";
		txtarea.value += "-----------------------------------";
	}, true);
	spn.appendChild(alink);
	d.appendChild(spn);
	return d;
}

results = xpath('//TEXTAREA[@name = "rv_comment"]');

if (results.snapshotLength == 0)
	return;

txtarea = results.snapshotItem(0);

arr = document.getElementsByTagName('h3')

for (var i = 0; i < arr.length; ++i)
{
	if (arr[i].childNodes.length != 0)
	{
  		d = generateQuoteLink(arr[i].parentNode, txtarea);
  		arr[i].parentNode.appendChild(d);
	}
}

