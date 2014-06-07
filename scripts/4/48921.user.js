// ==UserScript==
// @name				 EasyRead
// @namespace		namespace
// @include			 *
// ==/UserScript==




var EasyReadIsOn=false,
	EasyReadTargetDepth=1,
	EasyReadCurrDepth=0,
	EasyReadElement=document.getElementsByTagName('body')[0],
	ElementsToSkip='A',
	ElementsToClick='P.DIV.TD.DT.DD.LI.PRE.BLOCKQUOTE.H1.H2.H3.H4.H5.H6.H7',
	EasyFontFamily='sans-serif',
	EasyFontFamilyFixed='Monaco',
	EasyFontSizes={h1:'22px', h2: '20px', h3: '18px', h4: '16px', normal: '14px', big: '105%', small: '95%'},
	EasyFontWeight='inherit',
	EasyTextColor='black',
	EasyBackgroundColor='white',
	EasyReadInactivator=null,
	EasyReadTimer=undefined,
	EasyReadSpeed = 5000;

function EasyRead(el,EasyReadEvent) {
	//alert('Running EasyRead');
	window.clearTimeout(EasyReadInactivator);
	if (EasyReadIsOn) {
		EasyReadCurrDepth++;
		//alert('Current depth is '+EasyReadCurrDepth+' and target depth is '+EasyReadTargetDepth);
		//document.getElementById('_EasyReadButton').textContent='EasyRead '+EasyReadCurrDepth+' '+el.nodeName;
		if (!el.EasyReadable) {
			EasyReadStyle(el);
			if (el.getElementsByTagName('*').length) {
				EasyReadStyle(el.getElementsByTagName('*'));
			}
			el.EasyReadable=true;
		}
		if (EasyReadCurrDepth >= EasyReadTargetDepth || !el.parentNode || el.tagName.toLowerCase()=='body') {
			//el.style.border='solid blue 0px';
			//el.style.borderLeft=(10+10*EasyReadCurrDepth)+'px solid red';
			//el.style.borderRight=(10+10*EasyReadTargetDepth)+'px solid purple';
			EasyReadInactivator=window.setTimeout(EROff,EasyReadSpeed);
			EasyReadEvent.stopPropagation();
			return false;
		} else {
			return EasyRead(el.parentNode,EasyReadEvent);
		}
	} else {
		//alert('Its off');
		return true;
	}
}

function EasyReadStyle(obj) {
	var x=0, currentFont="";
	if (obj.length > 0) {
		//alert(obj.length);
		for (x=0; x < obj.length; x++) {
			EasyReadStyle(obj[x]);
		}
		return true;
	}
	if (!obj.tagName) {
		alert(obj + ' is a ' + typeof obj);
	}
	if (('.'+ElementsToClick+'.').indexOf('.'+obj.tagName.toUpperCase()+'.')==-1) {
		return false;
	}
	if (obj.style && obj.id.indexOf('_EasyRead') == -1) {
		//document.getElementById('_EasyReadButton').textContent='EasyRead '+EasyReadCurrDepth+' '+obj.nodeName;
		//obj.style.border='black solid '+EasyReadCurrDepth+'px';
		obj.style.fontSize=EasyFontSizes[obj.tagName.toLowerCase()]?EasyFontSizes[obj.tagName.toLowerCase()]:EasyFontSizes['normal'];
		//alert('font weight was '+obj.style.fontWeight);
		//obj.style.fontWeight=EasyFontWeight;
		//alert('font weight is now '+EasyFontWeight);
		obj.style.lineHeight='normal';
		currentFont=document.defaultView.getComputedStyle(obj,null).getPropertyValue("font-family");
		if (currentFont.toLowerCase().indexOf('courier') > -1 || currentFont.toLowerCase().indexOf('monospace') > -1 || obj.nodeName=='PRE'||obj.nodeName=='TT'||obj.nodeName=='CODE') {
			obj.style.fontFamily=EasyFontFamilyFixed;
		} else {
			//alert();
			obj.style.fontFamily=EasyFontFamily;
		}
		if (('.'+ElementsToSkip+'.').indexOf('.'+obj.nodeName+'.') == -1) {
			obj.style.color=EasyTextColor;
			obj.style.backgroundColor=EasyBackgroundColor;
		}
	};
}

function EasyReadInit() {
	if(top != self) return;
	var EasyReadButton=document.createElement('div'), 
		g=null,
		x=0,
		thisTag=null,
		thisTagName='',
		currentElement=null;
	EasyReadButton.style.position='fixed';
	EasyReadButton.active=false;
	EasyReadButton.id='_EasyReadButton';
	EasyReadButton.style.display='block';
	EasyReadButton.style.bottom=0;
	EasyReadButton.style.cursor='pointer';
	EasyReadButton.style.right="-2em";
	EasyReadButton.style.padding="3px";
	EasyReadButton.style.fontSize='14px';
	EasyReadButton.style.lineHeight='14px';
	EasyReadButton.style.color='white';
	EasyReadButton.style.background='black';
	EasyReadButton.appendChild(document.createTextNode('Easy'));
	EasyReadButton.appendChild(document.createElement('br'));
	EasyReadButton.appendChild(document.createTextNode('Read'));
	document.getElementsByTagName('body')[0].appendChild(EasyReadButton);
	EasyReadButton.addEventListener("mouseover",function (e) {
		this.style.right=0;
	},true);
	EasyReadButton.addEventListener("mouseout",function (e) {
		this.style.right="-2em";
	},true);
	EasyReadButton.addEventListener("click",function (e) {
		if (!this.EasyReadActive) {
			EROn();
			EasyReadInactivator=window.setTimeout(EROff,EasyReadSpeed);
		} else {
			EROff();
		}
	}, true);
	g=document.getElementsByTagName('*');
	for (x=0; x < g.length; x++) {
		thisTag=g[x];
		thisTagName=thisTag.tagName.toLowerCase();
		if (('.'+ElementsToClick+'.').indexOf('.'+thisTag.tagName.toUpperCase()+'.') > -1 && thisTag.id != "_EasyReadButton" ) {
			thisTag.addEventListener("click",EasyReadCapture, false);
			thisTag.addEventListener("dblclick",EasyReadCapture, false);
			currentElement=thisTag;
			while(currentElement.parentNode) {
				currentElement=currentElement.parentNode;
				currentElement.removeEventListener("click",EasyReadCapture,false);
				currentElement.removeEventListener("dblclick",EasyReadCapture,false);
			}
		}
	}
}

function EROn() {
	var that=document.getElementById('_EasyReadButton');
	that.EasyReadActive=true;
	EasyReadIsOn=true;
	that.style.background='#900';
}

function EROff() {
	var that=document.getElementById('_EasyReadButton');
	that.EasyReadActive=false;
	EasyReadIsOn=false;
	that.style.background='black';
}


function EasyReadCapture(e){
	if (EasyReadIsOn) {
		e.preventDefault();
		if (( e.detail > 0 )|| EasyReadElement!=this) {
			//alert('setting the timer');
			/*
			EasyReadTargetDepth=e.detail;
			//alert(EasyReadTargetDepth);
			*/
			EasyReadCurrDepth=0;
			EasyReadTargetDepth=e.detail;
			EasyReadElement=this;
			//this.style.background='pink';
			//this.style.fontSize=(60*e.detail) + '%';
			//EasyReadTimer = setTimeout(function(){alert(12);}, EasyReadSpeed);
			//alert(EasyReadTimer);
			EasyRead(this,e);
		}
		else {
			//alert(e.detail + ' ' + EasyReadTimer + ' ' + (EasyReadElement!=this));
			//this.style.background='orange';
			EasyReadTargetDepth++;
			clearTimeout(EasyReadTimer);
			EasyReadTimer = undefined;
		}
	}
}

EasyReadInit();