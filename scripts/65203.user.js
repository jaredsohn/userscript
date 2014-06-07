// Arch Forums Page Turner
// Version 0.1 2009-12-29
// Beau Barker (r6 on userscripts.org and bbs.archlinux.org)
// http://userscripts.org/scripts/show/65203
// --------------------------------------------------------------------
// ==UserScript==
// @name          Arch Forums Page Turner
// @namespace     http://userscripts.org/scripts/show/65203
// @description   Adds "Next" and "Prev" links to the Arch Linux forums
// @include       http://bbs.archlinux.org/viewtopic.php*
// @include       http://bbs.archlinux.org/viewforum.php*
// @include       http://bbs.archlinux.org/search.php*
// ==/UserScript==

function getElementsByClassName(className, startnode) {
  var a = [];
  var els = startnode.getElementsByTagName("*");
  for ( var i = 0, j = els.length ; i < j ; i++ ) {
    if (els.item(i).className.indexOf(className) != -1)
      a.push(els.item(i));
  }
  return a;
}

function nextObject(sib)
{
	do sib = sib.nextSibling;
	while (sib && sib.nodeType != "1");
	return sib;
}
 
function prevObject(sib)
{
	do sib = sib.previousSibling;
	while (sib && sib.nodeType != '1');
	return sib;
}

if (pagesections = getElementsByClassName('pagelink', document))
{

	for (i=0; i<pagesections.length; i++)
	{

		var para = pagesections[i];

		if (currentpages = para.getElementsByTagName('strong'))
		{

			curr = currentpages[0];

			if (prevlink = prevObject(curr))
			{
				var links = para.getElementsByTagName('a');
				var firstlink = links[0];
				firstlink.parentNode.insertBefore(p = document.createElement('a'), firstlink);
				firstlink.parentNode.insertBefore(document.createTextNode(' '), firstlink);
				p.setAttribute('name', 'prevlink');
				p.setAttribute('rel', 'prev');
				p.setAttribute('href', prevlink.getAttribute('href'));
				p.appendChild(document.createTextNode('Prev'));
			}

			if (nextlink = nextObject(curr))
			{
				para.appendChild(document.createTextNode(' '));
				para.appendChild(n = document.createElement('a'));
				n.setAttribute('name', 'nextlink');
				n.setAttribute('rel', 'next');
				n.setAttribute('href', nextlink.getAttribute('href'));
				n.appendChild(document.createTextNode('Next'));
			}

			para.setAttribute('style', 'width: auto; padding-right: 3em;');

		} 

	}

}
