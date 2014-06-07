// ==UserScript==
// @name           Keraj Kurwa
// @namespace      kurwa
// @description    Keraj Kurwa - http://dev.keraj.net/kurwa/?url=http://wykop.pl/
// @include       *
// ==/UserScript==

{
/**
 * Made by kurwa Kerai
 * chcesz rozpowszechniac? podawaj źródło
 * i wszystkie komentarze pisz w komentarzach wieloliniowych, bo sie moze popsuc pod chrome i opera...
 */
	var whitespace = "\/|.,!:;'\" \t\n\r";
	var stack = new Array();
	var curNIndex = 0;
	var curNode = null;
	var curIndex = -1;
	var state = 1;
	var lastword = '';
 
	function nextLetter()
	{
		if(curNode==null)
			return null;
		if(curIndex >= curNode.data.length)
		{
			curNode = stack[++curNIndex];
			curIndex = -1;
			if(curNode==null)
				return null;
		}
		
		curIndex++;
		if(curIndex >= curNode.data.length)
		{
			return ' ';
		}
		return curNode.data[curIndex];
	}
	
	function nextAfterWord()
	{
		/* lastword = ''; */
		/* szukamy poczatku kurwa wyrazu */
var lett = null;
		dupa:while(true)
		{
			do {
				lett = nextLetter();
				if(lett==null)
					return false;
			} while(whitespace.indexOf(lett)!=-1);
			
			if(state==1)
			{
				/* byliszmy na poczatku, teraz kurwa bedziemy szukac konca wyrazu */
				state = 2;
				return true;
			}
			state = 3;
			
			var starting = curIndex;
			do {
				lett = nextLetter();
				if(lett==null)
					return false;
				if(state==1)
					continue dupa;
			} while(whitespace.indexOf(lett)==-1);
			
			/* ostatni wyraz, moze sie kurwa przydac pozniej zeby nasz algorytm byl bardziej inteligentny */
			/* trza to jeszcze kurwa usprawnic */
			lastword = curNode.data.substr(starting,curIndex-starting);
			return true;
		}
	}
	
	function putHere(text)
	{
		if(curNode==null)
			return;
															/** oj, trzeba to kurwa fixnąć kiedyś */
		curNode.data = curNode.data.substr(0,curIndex) + (state!=2?' ':'') +text+ (state==2?' ':'') + curNode.data.substr(curIndex);
		curIndex += text.length + 2;
	}
	
	
	/** rekurencyjnie szukamy tylko tekstu kurwa */
	function przelec(node)
	{
		if(typeof node != "object" || typeof node.childNodes != "object")
			return;
		var children = node.childNodes;
		
		for (var i = 0; i < children.length; i++)
		{
			var child = children[i];
			/* nie IFRAME, bo sie moze kurwa crashnąć, nie SCRIPT... wiadomo, nie PRE - bo to moze byc kurwa kod źródłowy... chociaż może fajnie by było widzieć coś w stylu std:kurwa:cout */
			if(child.nodeType==1 && child.tagName!="SCRIPT" && child.tagName!="IFRAME" && child.tagName!="PRE")
			{
				przelec(child);
			}
			if(child.nodeType==3)
			{
				stack.push(child);
			}
		}
	}
	
	przelec(document.body);
	curNode = stack[0];
	
	var i = Math.floor(Math.random()*9);
	while(nextAfterWord())
	{
		if(i--<=0)
		{
			if(lastword=='na')
				continue;
			putHere("kurwa");
			var i = 2 + Math.floor(Math.random()*8);
			var i = 2 + Math.floor(Math.random()*8);
		}
	}
}