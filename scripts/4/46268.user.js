// ==UserScript==
// @name           ScrollSlut v0.1
// @namespace      xpsdeset
// @description   This baby Makes it easy to Scroll web.
//Being lazy I hated to Scroll A page especially it was an endless scroll to visit the bottom of page.Also i hated to use my keyboard shortcut keys.
//Why use keyboard when we can do actual surfing with total control of mouse.
//You Screen is divided into 4 logical big button see http://i43.tinypic.com/28bs8s4.jpg
//double click on the button and you can goto start or bottom of the page ,view a page one screen at a time with page up or down...
// @include        *
//bugs dont work propely in embedded frames.
// ==/UserScript==
// Browser Window Size and Position functions provided by 
// copyright Stephen Chapman, 3rd Jan 2005, 8th Dec 2005.




function pageWidth() {return window.innerWidth != null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ?       document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;} 
function pageHeight() {return  window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ?  document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;} 
function posLeft() {return typeof window.pageXOffset != 'undefined' ? window.pageXOffset :document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;} 
function posTop() {return typeof window.pageYOffset != 'undefined' ?  window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;} 
//function posRight() {return posLeft()+pageWidth();} 
function posBottom() {return posTop()+pageHeight();}



//actual working of this code                    
	document.addEventListener('dblclick', function(event) {

	
	ev = event || window.event;
	eX=ev.pageX; 
	eY=ev.pageY;
	pX=pageWidth();
	pb=posBottom();
	pt=posTop();
	ph=pageHeight();
	
	pY=posTop()+ph/2;
	
	goY=0;
	if(eX<=pX/2 && eY<=pY)  //home
	{
	goY=0;
	//alert('home');
	window.scrollTo(0,goY); 
	}
	
	if(eX<=pX/2 && eY>pY)  //end
	{goY=100000;
	
	//alert('end');
	window.scrollTo(0,goY); 
	}

	
	
	if(eX>pX/2 && eY<=pY)  //pageUp
	{
	
	goY=eY-(ph*0.75);
	if(goY<0)
	goY=0;
	
	//alert('pageup');
	window.scrollTo(0,goY); 
	}
	
	
	if(eX>pX/2 && eY>pY)  //pageDown
	{
	//goY=eY+(ph*0.75);
	
	//goY=eY+500;
	
	//alert('pagedown\t' +eY+'\t'+pY);
	window.scrollTo(0,eY);
	
	}

	//window.scrollTo(0,goY);    
	//alert(goY+"\t"+pY+" \t"+eY+"\t"+eX+"\t"+eY);
	
	
	
	
 
					
	
    }, true);



	