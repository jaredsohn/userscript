// ==UserScript==
// @name           DOM ISO.v.0.3.0.7
// @namespace      *
// @include        *.*.*
// @description DOM Mouse-Over Element Selection and Isolation
// ==/UserScript==
(function() {
	//GLOBALS
		//globals for classMausWork
		var gSelectedElement;	//currently only one selection
		var gHoverElement;		//whatever element the mouse is over
		var gHovering=false;	//mouse is over something
		var gObjArrMW=[];	//global array of classMausWork objects.  for removing event listeners when done selecting.
		
		//extended	
		var infoDiv;		//currently just container for InfoDivHover, might add more here
		var infoDivHover;	//container for hoverText text node.
		var hoverText;		//show information about current element that the mouse is over
		//const EXPERIMENTAL_NEW_CODE=true;	//debugging. new features.
	
	
	//START
	SetupDOMSelection();	



		
	//(Section 1) Element Selection
	function SetupDOMSelection()
	{

		{
			//setup event listeners
			//var pathx="//div | //span | //table | //td | //tr | //ul | //ol | //li | //p";
			var pathx="//div | //span | //table | //th | //td | //tr | //ul | //ol | //li | //p | //iframe";
			var selection=$XPathSelect(pathx);
			for(var element, i=0;element=selection(i);i++)
			{			
				if(element.tagName.match(/^(div|span|table|td|tr|ul|ol|li|p)$/i))	//redundant check.
				{
					var m = new classMausWork(element);
					gObjArrMW.push(m);
					attachMouseEventListeners(m);
				}
			}
			document.body.addEventListener('mousedown',MiscEvent,false);
			document.body.addEventListener('mouseover',MiscEvent,false);
			document.body.addEventListener('mouseout',MiscEvent,false);
			document.addEventListener('keypress',MiscEvent,false);
		}
		{
			//setup informational div to show which element the mouse is over.
			infoDiv=document.createElement('div');
			var s=infoDiv.style;
			s.position='fixed';
			s.top='0';
			s.right='0';
			
			s.display='block';
			s.width='auto';
			s.padding='0px';

			document.body.appendChild(infoDiv);
			infoDivHover=document.createElement('div');

			s=infoDivHover.style;
			s.fontWeight='bold';			
			s.padding='3px';
			s.Opacity='0.8';
			s.borderWidth='thin';
			s.borderStyle='solid';
			s.borderColor='white';
			s.backgroundColor='black';
			s.color='white';
			
			infoDiv.appendChild(infoDivHover);			
			hoverText=document.createTextNode('selecting');
			infoDivHover.appendChild(hoverText);
		}
	}
	
	function CleanupDOMSelection()
	{
		for(var m; m=gObjArrMW.pop(); )
		{
			detachMouseEventListeners(m);
		}
		ElementRemove(infoDiv);
		document.body.removeEventListener('mousedown',MiscEvent,false);
		document.body.removeEventListener('mouseover',MiscEvent,false);
		document.body.removeEventListener('mouseout',MiscEvent,false);		
		document.removeEventListener('keypress',MiscEvent,false);
	}	

	function attachMouseEventListeners(c)
	{
		//c is object of class classMausWork
		c.element.addEventListener("mouseover",c.mouse_over,false);				
		c.element.addEventListener("mouseout",c.mouse_out,false);	
		c.element.addEventListener("mousedown",c.mouse_click,false);		
	}

	function detachMouseEventListeners(c)
	{
		//c is object of class classMausWork
		c.resetElementStyle();
		c.element.removeEventListener("mouseover",c.mouse_over,false);				
		c.element.removeEventListener("mouseout",c.mouse_out,false);	
		c.element.removeEventListener("mousedown",c.mouse_click,false);		
	}

	//mouse event  handling class for element, el.
	function classMausWork(element)
	{	
		//store information about the element this object is assigned to handle. element,  original style, etc.	
		this.element=element;
		
		var elementStyle=element.getAttribute('style');
		var target;
		
		this.mouse_over=function(ev)
		{	
			if(gHovering)return;
			var e=element;			
			var s=e.style;
			s.backgroundColor='yellow';
			s.borderWidth='thin';
			s.borderColor='lime';
			s.borderStyle='solid';					
			InfoMSG(ElementInfo(e),'yellow','blue','yellow');
			gHoverElement=e;
			gHovering=true;
			target=ev.target;
			ev.stopPropagation();		
		};
		
		this.mouse_out=function(ev)
		{
			if(!gHovering)return;
			if(gHoverElement!=element ||ev.target!=target)return;
			var e=element;
			e.setAttribute('style',elementStyle);
			InfoMSG('-','white','black','white');	
			gHoverElement=null;
			gHovering=false;
			target=null;
			//ev.stopPropagation();
		};
		
		this.mouse_click=function(ev)
		{
			if(!gHovering)return;
			if(gHoverElement!=element ||ev.target!=target)return;
			var e=element;
			e.setAttribute('style',elementStyle);
			ev.stopPropagation();			
			CleanupDOMSelection();			
			gHoverElement=null;
			gHovering=false;
			target=null;
			
			if(ev.button==0)
			{
				gSelectedElement=e;
				ElementSelected(e);	//finished selecting, cleanup then move to next part (section 2), element isolation.
			}
		};
		
		this.resetElementStyle=function()
		{
			element.setAttribute('style',elementStyle);
		};		
	}

	function MiscEvent(ev)		//keypress, and mouseover/mouseout/mousedown event on body.  cancel selecting.
	{
		if(ev.type=='mouseout' && !gHovering)
		{
			InfoMSG('-','white','black','white');
		}
		else if(ev.type=='mouseover' && !gHovering)
		{
			InfoMSG('cancel','yellow','red','yellow');
		}
		else //keypress on document or mousedown on body, cancel ops.
		{
			CleanupDOMSelection();
		}
	}
	
	function InfoMSG(text,color,bgcolor,border)
	{
		
		var s=infoDivHover.style;
		if(color)s.color=color;
		if(bgcolor)s.backgroundColor=bgcolor;
		if(border)s.borderColor=border;
		if(text)hoverText.data=text;
	}
	


	
	
	//(Section 2) Element Isolation
	function ElementSelected(element)	//finished selecting element.  setup string to prompt user.
	{
		PromptUserXpath(ElementInfo(element));
	}
	
	
	function PromptUserXpath(defaultpath)		//prompt user, isolate element.
	{
		var userpath = prompt("XPath of elements to isolate : ", defaultpath);
		if(userpath && userpath.length>0)
		{
			var addPredicate = "[count(./ancestor-or-self::head)=0][count(./ancestor-or-self::title)=0]";	//exclude head & title elements from selection so they aren't removed
			var addPath = "//script | //form | //object | //embed";	//include these elements in selection for removal
			var pathx=TransformXPath_NoAncestorDescendentSelf(userpath, addPredicate, addPath);		//the xpath selection of all elements to be removed/deleted.
			
			try
			{
				var element;
				var elements=$XPathSelect(pathx);	
				for(var i=0;element=elements(i);i++)
				{			

					if(!element.nodeName.match(/^(head|title)$/i))	//redundant check.
					{
						ElementRemove(element);
					}
				}
			}
			
			catch(err)
			{
				alert("wtf: "+err);
			}
			
		}
	}
	
		
	
	//support
	function $XPathSelect(p, context) 
	{
	  if (!context) context = document;
	  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	  return function(x) { return xpr.snapshotItem(x); };	//closure.  wooot!  returns function-type array of elements (usually elements, or something else depending on the xpath expression).
	}
	
	function ElementRemove(e)
	{
		if(e)e.parentNode.removeChild(e);
	}
	
	function ElementInfo(element)
	{
		var txt='';
		if(element)
		{
			txt=element.tagName.toLowerCase();		//txt=element.tagName;
			txt=attrib(txt,element,'id');
			txt=attrib(txt,element,'class');	
			txt='//'+txt;
		}
		return txt;
		
		function attrib(t,e,a)
		{			
			if(e.hasAttribute(a))
			{
				t+="[@"+a+"='"+e.getAttribute(a)+"']";
			}
			return t;
		}
		
	}


	
	//function to 'invert' the XPath by selecting all elements that are not ancestor and not descendent and not self.
	function TransformXPath_NoAncestorDescendentSelf(u, includePredicates, includePaths)
	{	
		
		//sample input (u):					//div[@class='sortbox']
		//sample output						//*[  not(./descendant-or-self::*=//div[@class='sortbox'])][  not(./ancestor-or-self::*=//div[@class='sortbox'])]
		//sample output with additional conditions:		//*[  not(./descendant-or-self::*=//div[@class='sortbox'])][  not(./ancestor-or-self::*=//div[@class='sortbox'])][count(./ancestor-or-self::head)=0][count(./ancestor-or-self::title)=0]
		
			//obsolete method.  much faster but can only be used for limited types of (simple) xpath expressions -- unlike the current version, which should be able to convert any xpath.
			//input:			table[@id='topbar']
			//output:			//*[not(./descendant-or-self::table[@id='topbar']) and not(./ancestor-or-self::table[@id='topbar'])]
			//output (alternative):	//*[count(./descendant-or-self::table[@id='topbar'])=0 and count(./ancestor-or-self::table[@id='topbar'])=0]
		
		
		var o1=	'./descendant-or-self::*='+gr(u);
		o1=	'not' + gr(o1);
		o1=	nt(o1);	
		var o2= './ancestor-or-self::*='+gr(u);
		o2=	'not' + gr(o2);
		o2=	nt(o2);

		var o=	'//*'+o1+o2;
		if(includePredicates && includePredicates.length>0)	o += includePredicates;
		if(includePaths && includePaths.length>0) o += ' | ' + includePaths;
		return o;
		
		
		function nt(term){return wrap(term,'[]');}	//node test; predicate - enclose with bracket.
		function gr(term){return wrap(term,'()');}	//group - parenthesize.
		function wrap(term, enclosure){return enclosure.charAt(0)+term+enclosure.charAt(1);}
	}	
	


	
})();
