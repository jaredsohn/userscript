// ==UserScript==
// @name				Final Fantasy XIV Lodestone Progress Bars
// @namespace			http://www.TailsArchive.net/
// @description			Adds progress bars to stat pages on FF14 Lodestone user pages
// @version				2011 Jul 21st
// @include				http://lodestone.finalfantasyxiv.com/rc/character/status?cicuid=*
// @include				http://lodestone.finalfantasyxiv.com/rc/personal/character
// ==/UserScript==

function gid(_X){return document.getElementById(_X);}
function gtni(_X,_Y,_Z){return (arguments.length==2)?document.getElementsByTagName(_X).item(_Y):_X.getElementsByTagName(_Y).item(_Z);}
function ce(_X){return document.createElement(_X);}
function ctn(_X){return document.createTextNode(_X);}

Jobs=gid('azone-contents').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes[3];
if(Jobs.nodeName!='TABLE'){Jobs=Jobs.nextSibling;}

prbox=ce('div');
prbox.style.width='112px';
prbox.style.padding='0.5em';
prbox.style.display='inline';

fill=ce('img');
fill.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGCAYAAAACEPQxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAASSURBVBhXY2BY8%2BA%2FEwMQYCMARQoCloVO%2F%2BsAAAAASUVORK5CYII%3D';
fill.style.height='6px';
fill.style.position='relative';
fill.style.zIndex='1';
fill.style.top='1px';

pbar=ce('img');
pbar.src='data:image/gif;base64,R0lGODlhcAAIANMAAAAAACAgQCBAQEBAQGBgQICAgKCgpOCgwMDAwMDcwAAAAAAAAAAAAAAAAAAAAAAAACH5BAkZAAcALAAAAABwAAgAAARi8MgjRrg46827/2AogtM0EAVRrmzrvnAsz/QxWIFZIIla/8CgkHa65QIDgwExGDqfUGKKgDuhmtGsNjpAKC0HZHFLLv8ICUQBGxab3/AWisq6AO74vH7P7/v/gIGCfgMCJREAOw==';
pbar.style.position='relative';
pbar.setAttribute('alt','Skill Points');


for(i=2;i<57;i+=3)
	{
	gtni(Jobs,'tr',i).removeChild(gtni(Jobs,'tr',i).firstChild);
	gtni(Jobs,'tr',i).removeChild(gtni(Jobs,'tr',i).firstChild);
	}

for(i=5;i<119;i+=6)
	{
	gtni(Jobs,'td',i).style.whiteSpace='nowrap';
	gtni(Jobs,'td',i).style.fontFamily='monospace';
	SP=gtni(Jobs,'td',i).firstChild.nodeValue;
	
	if(gtni(Jobs,'td',i).firstChild.nodeValue.length>1)
		{
		SPx=SP.split('/');
		for(j=SPx[0].length;j<6;j++){SPx[0]='\u00a0'+SPx[0];}
		for(j=SPx[1].length;j<6;j++){SPx[1]='\u00a0'+SPx[1];}
		Perc=Math.floor(eval(gtni(Jobs,'td',i).firstChild.nodeValue)*100);
		X=gtni(Jobs,'td',i);
		X.replaceChild(ctn(SPx[0]+'/'+SPx[1]),X.firstChild)
		if(isNaN(Perc))
			{
			X.replaceChild(ctn('*** MASTERED ***'),X.firstChild)
			X.style.fontWeight='bold';
			X.style.fontSize='large';
			continue;
			}
		}
	else{continue;}

	fillcopy=fill.cloneNode(0);
	fillcopy.style.width=Perc+'px';

	prboxcopy=prbox.cloneNode(0);
	prboxcopy.appendChild(fillcopy);

	pbarcopy=pbar.cloneNode(0);
	pbarcopy.style.right=Perc+6+'px';


	prboxcopy.appendChild(pbarcopy);

	gtni(Jobs,'td',i).appendChild(ctn(' ('+((Perc<10)?' ':'')+Perc+'%)'));
	gtni(Jobs,'td',i).appendChild(ce('br'));
	gtni(Jobs,'td',i).appendChild(prboxcopy);
	}