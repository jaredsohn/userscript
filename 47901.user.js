// ==UserScript==
// @name           Google Profile PayScale Salary Tool
// @namespace      http://www.payscale.com/tools
// @include        http://www.google.com/profiles/*
// @description    When you're viewing someone's Google Profile (http://www.google.com/profiles), this script will read their job title and link to a page on PayScale with more information. 
// ==/UserScript==

function findName() 
{
	divs = document.getElementsByTagName('span');
	for (var i=0; i<divs.length; i++)
	{

		if (divs[i].className == 'fn')
		{
			//alert('found it');
			return divs[i];
		}
	}
	return null;
}

function createLinkNode(job)
{

	var linkToPayScale = document.createElement('a');
	linkToPayScale.setAttribute('href','http://www.payscale.com/af/calc.aspx?job='+job);
	linkToPayScale.setAttribute('style','font-size: 12px;');
	linkToPayScale.setAttribute('target', '_blank');
	linkToPayScale.innerHTML = " Research Salary <img src='http://www.payscale.com/images/dots_bug.gif' align='absmiddle' border=0> ";
	return linkToPayScale;
}

var tagline = document.getElementById('basics');

var job; var loc;
if (tagline)
{
	//alert(tagline.innerHTML);
	jobElements = tagline.getElementsByTagName("span");	
	for (var i=0; i<jobElements.length; i++)
	{
		if (jobElements[i].className == 'title')
		{
			job = jobElements[i].innerHTML;
		}
		if (jobElements[i].className == 'adr')
		{
			loc = jobElements[i].innerHTML;
		}
	}
	var nameNode = findName();
	var linkToPayScale = createLinkNode(job);
	nameNode.parentNode.insertBefore(linkToPayScale,nameNode.nextSibling);
}

