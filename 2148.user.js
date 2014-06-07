//
// DOM DIDDLER
// 
// press [pause/break] to open the editor
// 
//
// click to move the editor.  shift + click to resize it.
// 
// drag and drop code stolen from dynamic drive then modded for specific non-invasive use. 
// resize code is largely based on drag and drop code from dynamic drive.
// 
//
// GUID: {267d52be-f9e7-469a-9cb0-8eb7524fb287} 
//
//
// ==UserScript==
// @name          dom diddler
// @description   edit local copy of remote sites in real time.  
// @include         *
// @exclude       *.txt
// @exclude       *.js
// ==/UserScript==
	




(function(){



   var ua = navigator.userAgent.toLowerCase(); 

   var isOpera        = (ua.indexOf('opera') != -1); 
   var isIE          = (ua.indexOf('msie') != -1 && !isOpera && (ua.indexOf('webtv') == -1) ); 
	if(isIE){alert("FireFox Only.  You're being redirected to the old version.");window.location="http://gregtaff.com/rendar.html"}

	var lastwidth = '400px';
	var lastheight = '200px';
	var docMM;
	var docMU;
	var startW = 400;
	var StartH = 200;
	var isdrag=false;
	var issize=false;
	var x,y,tx,ty;
	var dobj;
	var eTab = '%09';
	tx=20;

	function ge(theId){return document.getElementById(theId);}
	function getn(tagName,targetIndex){return document.getElementsByTagName(tagName)[targetIndex];}

	function showHide(show, hide1, hide2){
		var bg;
		bg = "#AFFF05"
		if(show == "diddlercss"){bg = "#74D0FF"}
		
		show = "diddler" + show
		hide1 = "diddler" + hide1
		hide2 = "diddler" + hide2

		ge(show + "Div").style.display = "";
		ge(show + "Tab").style.borderBottom  = "1px solid white"
		ge(show + "Tab").style.background  = "white"
		ge(show + "Out").focus();

		ge(hide1 + "Div").style.display = "none";
		ge(hide1 + "Tab").style.borderBottom  = "1px solid black";	
		ge(hide1 + "Tab").style.background  = "#AFFF05";
			
		ge(hide2 + "Div").style.display = "none";
		ge(hide2 + "Tab").style.borderBottom  = "1px solid black";	
		ge(hide2 + "Tab").style.background  = "#AFFF05";	
	}
	function showHideMain(){
		if(ge("diddlercontent").style.display!="none"){
			 lastheight = ge("diddlermain").style.height;
			 lastwidth = ge("diddlermain").style.width;

			 ge("diddlermain").style.height='20px';
			 ge("diddlermain").style.width='15px';
			 ge("diddlercontent").style.display="none";
			 ge("diddlermuTab").style.display="none";
			 ge("diddlercssTab").style.display="none";
			 ge("diddlerhlpTab").style.display="none";
			 ge("diddlersizer").style.display="none";
			 return true;
			}

		ge("diddlermain").style.height=lastheight;
		ge("diddlermain").style.width=lastwidth;
		ge("diddlercontent").style.display="";
		ge("diddlermuTab").style.display="";
		ge("diddlercssTab").style.display="";
		ge("diddlerhlpTab").style.display="";
		ge("diddlersizer").style.display="";
		return true;







	}
	
	function resizeMain(wChange, hChange)
	{
		dobj = ge("diddlermain");
		var newX2;
		var newX =  parseInt(dobj.style.width + 0) + wChange  ;
		var newY =  parseInt(dobj.style.height + 0) + hChange  ; 
		
	    if(newX  > 260){dobj.style.width = newX + "px;";}
	    if(newY  > 80){dobj.style.height  =   newY + "px;";}
	    
		newY = parseInt(dobj.style.height + 0) - 30;
		newX = parseInt(dobj.style.width + 0) - 22
		newX2 = newX + 52
		
	    document.getElementById('diddlermuOut').style.height = newY + "px;";
	    document.getElementById('diddlermuOut').style.width = newX2 + "px;";
	    document.getElementById('diddlercssOut').style.height = newY + "px;";
	    document.getElementById('diddlercssOut').style.width = newX + "px;";
	    document.getElementById('diddlerhlpDiv').style.height = (newY-8) + "px;";
	    document.getElementById('diddlerhlpDiv').style.width = (newX +10) + "px;";
	    document.getElementById('diddlersizer').style.left = (newX - 33) + "px;";

	    return false;
		
	}
	
	function moveMain(wChange, hChange)
	{
		dobj = ge("diddlermain");
		
		var newX =  parseInt(dobj.style.left + 0) + wChange  ;
		var newY =  parseInt(dobj.style.top + 0) + hChange  ; 

	    dobj.style.left = newX + "px;";
	    dobj.style.top  = newY + "px;";
	    return false;
		
	}
	
	
	function movemouse(e)
	{
	
	
	
	
	  if(issize || isdrag){if(dobj.style.opacity != "0.3"){dobj.style.opacity = "0.3"}}
	  if (issize)
	  {
		var newX =  e.clientX + (startW - (x))  ;
		var newY =  e.clientY + (startH - (y))  ; 
	    if(e.clientX + (startW - (x)) > 260){dobj.style.width = (newX) + "px;";}
	    if(e.clientY + (startH - (y)) > 80){dobj.style.height  =   (newY) + "px;";}
		newY = parseInt(dobj.style.height + 0) - 33;
		newX = parseInt(dobj.style.width + 0) - 08
		
	    document.getElementById('diddlermuOut').style.height = newY + "px;";
	    document.getElementById('diddlermuOut').style.width = newX + "px;";
	    document.getElementById('diddlercssOut').style.height = newY + "px;";
	    document.getElementById('diddlercssOut').style.width = newX + "px;";
	    document.getElementById('diddlerhlpDiv').style.height = (newY - 2) + "px;";
	    document.getElementById('diddlerhlpDiv').style.width = (newX - 4) + "px;";
	    document.getElementById('diddlersizer').style.left = (newX - 43) + "px;";

	    return false;
	  }
	  if (isdrag)
	  {
	    
		var newX = tx + e.clientX - x  ;
		var newY =  ty + e.clientY - y  ; 
	    dobj.style.left = newX + "px;";
	    dobj.style.top  = newY + "px;";
	    return false;
	  }
	}
	
	
	
	function MouseRelease(e)
	{
	
	dobj.style.opacity = "1"
	
	isdrag=false;
	issize=false;
	document.wrappedJSObject.onmousemove = docMM
	document.wrappedJSObject.onmouseup = docMU
	
	
	}
	
	function selectmouse(e) 
	{

	  var fobj = document.getElementById("diddlermain").wrappedJSObject
	  fobj.style.zIndex = '1000'

	
	    if(!e.shiftKey || document.getElementById("diddlercontent").style.display == "none"){isdrag = true;}
	    if(e.shiftKey && document.getElementById("diddlercontent").style.display != "none"){issize = true;}
	    if(e.target.id == "diddlersizer" && document.getElementById("diddlercontent").style.display != "none"){issize = true;}
	    if(e.target.id == "diddlersizPic" && document.getElementById("diddlercontent").style.display != "none"){issize = true;}
	


	    dobj = fobj;
	    startW = parseInt(dobj.style.width + 0); 
	    startH = parseInt(dobj.style.height + 0);
	    tx = parseInt(dobj.style.left+0);
	    ty = parseInt(dobj.style.top+0);
	    x = e.clientX
	    y = e.clientY

	    docMM = document.wrappedJSObject.onmousemove;
	    document.wrappedJSObject.onmousemove=movemouse;
	    docMU = document.wrappedJSObject.onmouseup;
	    document.wrappedJSObject.onmouseup=MouseRelease;
	    return false;

	}
	

	
	function handleLoad(){


		document.getElementById("diddlermain").style.width = "406px;"
		document.getElementById("diddlermain").style.height = "200px;"
		document.getElementById("diddlermain").style.top = "50px;"
		document.getElementById("diddlermain").style.left = "50px;"
		tx = 50;
		ty = 50


		var newY = 200 - 33;
		var newX = 400 - 08;
		
	    	document.getElementById('diddlermuOut').style.height = newY + "px;";
	    	document.getElementById('diddlermuOut').style.width = newX + "px;";
	    	document.getElementById('diddlercssOut').style.height = newY + "px;";
	    	document.getElementById('diddlercssOut').style.width = newX + "px;";



		var lt = String.fromCharCode(60);
		var gt = String.fromCharCode(62);
		ge("diddleremail").innerHTML = lt + 'a href="' + unescape('%6d%61%69%6c%74%6f%3A%67%72%65%67%40%67%72%65%67t%61%66%66%2e%63%6f%6d') + '" style="color:#FF2AC2;text-decoration:none;" >'+unescape('%67%72%65%67%20t%61%66%66')+ lt+'/a>' ;

	}


	function insertAdjacentElement(node, newNode, where) {  //this isn't my code... don't remember where i grabbed it.
		if(where == "before")
			node.parentNode.insertBefore(newNode, node);
		else if(node.nextSibling)
			node.parentNode.insertBefore(newNode, node.nextSibling);
		else
			node.parentNode.appendChild(newNode);
	}


	function insert(input, theText) {
	  if(typeof input.selectionStart != 'undefined')
	  {
	    var start = input.selectionStart;
	    var end = input.selectionEnd;
	    input.value = input.value.substr(0, start) + theText + input.value.substr(end);
	   	input.selectionStart = start + theText.length;
	   	input.selectionEnd = start + theText.length;
		input.focus();
	  }
	}

	function keyDownHandler(e){
		
		if(e.keyCode == 9){setTimeout("insert(ge('"+e.target.id+"'), unescape('%09'));", 0);return false;}
	}


	var para = document.getElementsByTagName("body")[0];


	var dConsole = document.createElement("DIV");
	var dStyle = document.createElement("STYLE");
	var dStyleBlank = document.createElement("STYLE");
	dConsole .style.display = "none";
	dStyleBlank.id = "styleBlank"
	dStyle.id = "styleDiddler"

	
	//	escaped text is the poor mans encryption, but im honestly not trying to obfuscate anything here.
	//	this first gob is mark up defining the editor, the second is the CSS of the editor.
	//	the reason its all escaped is because all the quotes and apostrophes in markup make it 
	//	really hard to store in a regular string.
	//	
	//	below is a the markup for a quick and dirty escaper/unescaper
	//
	//	<textarea id=m1 onkeyup="document.getElementById('m2').value = escape(this.value);" style="width:600px;height:200px;"></textarea><br>
	//	<textarea id=m2 onkeyup="document.getElementById('m1').value = unescape(this.value);" style="width:600px;height:200px;"></textarea>

	dConsole.innerHTML = unescape("%3Cdiv%20id%3D%22diddlermain%22%3E%0A%09%3Cdiv%20id%3D%22diddlertopBar%22%20style%3D%22float%3Aleft%3Bwidth%3A100%25%3B%22%3E%0A%09%09%3Ca%20id%3D%22diddlertogg%22%20href%3D%22%23%22%20%20style%3D%22float%3Aleft%3B%22%3E%26%23x25A0%3B%3C/a%3E%0A%09%09%3Cdiv%20id%3D%22diddlermuTab%22%20%20class%3D%22diddlertab%22%20style%3D%22border-bottom%3A1px%20solid%20white%3Bmargin-left%3A4px%3B%22%20%09%3EMarkup%3C/div%3E%0A%09%09%3Cdiv%20id%3D%22diddlercssTab%22%20class%3D%22diddlertab%22%20style%3D%22background%3A%23AFFF05%3B%22%20%09%09%09%09%3ECSS%3C/div%3E%0A%09%09%3Cdiv%20id%3D%22diddlerhlpTab%22%20class%3D%22diddlertab%22%20style%3D%22background%3A%23AFFF05%3B%22%20%09%09%09%09%3EHelp%3C/div%3E%0A%09%3C/div%3E%0A%09%3Cdiv%20id%3D%22diddlercontent%22%3E%0A%09%09%3Cbr%20style%3D%22line-height%3A23px%3B%22%20/%3E%0A%09%09%3Cdiv%20id%3D%22diddlermuDiv%22%20class%3D%22diddlercontainingDiv%22%20%3E%0A%09%09%20%20%3Ctextarea%20id%3D%22diddlermuOut%22%20class%3D%22diddlerCodeTextarea%22%20onkeyup%3D%22document.getElementsByTagName%28%27body%27%29%5B0%5D.innerHTML%20%3D%20this.value%22%20%20wrap%3D%22off%22%3E%3C/textarea%3E%0A%09%09%3C/div%3E%0A%09%09%3Cdiv%20id%3D%22diddlercssDiv%22%20class%3D%22diddlercontainingDiv%22%20style%3D%22display%3Anone%3B%22%3E%0A%09%09%20%20%3Ctextarea%20id%3D%22diddlercssOut%22%20class%3D%22diddlerCodeTextarea%22%20onkeyup%3D%22document.getElementById%28%27styleBlank%27%29.innerHTML%20%3D%20this.value%22%20%20wrap%3D%22off%22%3E%3C/textarea%3E%0A%09%09%3C/div%3E%0A%09%09%3Cdiv%20id%3D%22diddlerhlpDiv%22%20class%3D%22diddlercontainingDiv%22%20style%3D%22border-color%3Ared%3Bmargin-top%3A-1px%3Bfloat%3Aleft%3Bdisplay%3Anone%3Bwhite-space%3Anowrap%3Boverflow%3Ahidden%3Bheight%3A166px%3Bwidth%3A394px%3Bpadding%3A5px%3B%22%3E%0A%09%09%09%09%3Ch1%20style%3D%22font-size%3A114px%3Bline-height%3A100px%3Bdisplay%3Ainline%3Bletter-spacing%3A-15px%3Bcolor%3Ared%3B%22%3Every%20beta%20%3A%29%3C/h1%3E%0A%09%09%09%09%3Cbr/%3E%3Cbr/%3E%0A%09%09%09%09clear%20the%20CSS%20pane%20if%20it%20breaks%20the%20page%20%3A%28%3C/br%3E%0A%0A%09%09%09%09%3Cdiv%20style%3D%22clear%3Aleft%3Bpadding-top%3A10px%3B%22%3ERendar%202.0%20by%20%3Cspan%20id%3D%22diddleremail%22%20style%3D%22font-weight%3Abold%3B%22%20%3Egreg%20gregtaff%3C/span%3E%3C/div%3E%3Cbr/%3E%0A%09%09%09%09%0A%09%09%09%09%0A%09%09%09%09%0A%09%09%20%20%3Ctextarea%20id%3D%22diddlerhlpOut%22%20class%3D%22diddlerCodeTextarea%22%20style%3D%22display%3Anone%3B%22%3E%3C/textarea%3E%0A%09%09%3C/div%3E%0A%0A%09%3Cdiv%20id%3D%22diddlersizer%22%20style%3D%22clear%3Aleft%3Bcursor%3Ase-resize%3Bposition%3Arelative%3Btop%3A-4px%3Bleft%3A355px%3Bdisplay%3Ablock%3Bheight%3A15px%3Bwidth%3A35px%3Bborder%3A1px%20solid%20black%3Bopacity%3A0.6%3Bbackground%3Awhite%22%3E%20%3C/div%3E%0A%09%3C/div%3E%0A%0A%3C/div%3E");

	dStyle.innerHTML = unescape("%09%23diddlercontent%20%7Bmargin%3A0px%3Bfont-family%3A%20trebuchet%20ms%2C%20arial%2C%20helvetica%2C%20sans-serif%3B%7D%0A%09%23diddlertogg%7Bfont-family%3A%20trebuchet%20ms%2C%20arial%2C%20helvetica%2C%20sans-serif%3B%20%0A%09%09font-size%3A%2014px%3B%20%0A%09%09color%3A%23000000%3B%20%0A%09%09text-decoration%3Anone%3B%0A%09%09padding%3A0px%203px%200px%203px%3B%0A%09%09margin%3A0px%0A%09%20%20%20%20%20%20%20%20%7D%0A%09%23diddlertogg%3Ahover%7Bbackground%3A%23AFFF05%7D%0A%0A%09.diddlertab%20%7B%09float%3Aleft%3B%0A%09%09padding%3A2px%3B%0A%09%09margin%3A0xp%0A%09%09margin-right%3A5px%3B%0A%09%09width%3A70px%3B%0A%09%09font-weight%3Abold%3B%0A%09%09cursor%3Apointer%3B%0A%09%09border%3A1px%20solid%20black%3B%0A%09%09background%3Awhite%3B%0A%09%09font-family%3A%20trebuchet%20ms%2C%20arial%2C%20helvetica%2C%20sans-serif%3B%0A%09%20%20%20%20%20%7D%0A%09%23diddlermain%7B%20%20position%3Aabsolute%3B%0A%09%09top%3A20px%3Bleft%3A0px%3B%0A%09%09display%3Ablock%3B%0A%09%09width%3A400px%3B%0A%09%09height%3A200px%3B%0A%09%09border%3A2px%20solid%20black%3B%0A%09%09padding%3A2px%3B%0A%09%09font-family%3A%20trebuchet%20ms%2C%20arial%2C%20helvetica%2C%20sans-serif%3B%20%0A%09%09font-size%3A%2014px%3B%20%0A%09%09color%3A%23000000%3B%20%0A%09%09text-decoration%3Anone%3B%0A%09%09margin%3A0px%3B%0A%09%09background%3Awhite%3B%0A%09%20%20%20%20%20%7D%0A%0A%09.diddlercontainingDiv%20%7Bmargin%3A0px%3Bborder%3A1px%20solid%20black%3Bfont-family%3A%20trebuchet%20ms%2C%20arial%2C%20helvetica%2C%20sans-serif%3B%7D%0A%09.diddlerCodeTextarea%20%20%7Bwidth%3A398px%3Bborder%3A0%3Bheight%3A173px%3Bpadding%3A3px%3Bmargin%3A0px%3Bfont-family%3A%20Lucida%20Console%2C%20Fixedsys%20%3Bfont-size%3A14px%7D%0A%09.diddlertab%20%7B%09margin%3A0px%3B%0A%09%09%09float%3Aleft%3B%0A%09%09%09padding%3A2px%3B%0A%09%09%09margin-right%3A5px%3B%0A%09%09%09width%3A70px%3B%0A%09%09%09font-weight%3Abold%3B%0A%09%09%09cursor%3Apointer%3B%0A%09%09%09border%3A1px%20solid%20black%3B%0A%09%09%09font-family%3A%20trebuchet%20ms%2C%20arial%2C%20helvetica%2C%20sans-serif%3B%0A%09%09%7D");




	insertAdjacentElement(para, dConsole , "before");
	ge("diddlermuOut").wrappedJSObject.value=document.getElementsByTagName("body")[0].innerHTML

	insertAdjacentElement(para, dStyleBlank  , "before");


	ge("diddlercssOut").value="nLoad"

	document.getElementById("diddlermain").wrappedJSObject.style.zIndex = '1000';

	handleLoad();
	

	var cssItm;
	var rlsItm;


	document.addEventListener('keyup',
		function(e){
			if(e.keyCode == 19 ){
				if(ge("diddlercssOut").value=="nLoad"){
					
					var i;
					var k;	
					var c = '';
					var t = '';
					var cr = String.fromCharCode(10);
					var tb = unescape('%09');
					
					for(i = 0; i < document.styleSheets.length - 1; i++){
						
						for(k = 0; k < document.styleSheets[i].cssRules.length; k++){
							if(document.styleSheets[i].cssRules[k].cssText.substr(0,7) != "@import"){
							c = c + document.styleSheets[i].cssRules[k].cssText 
							}
							 
						}
						//document.styleSheets[i].disabled = true;
					}
				
					for(i = 0; i < c.length; i++){
						t = t + c[i]
						if(c[i] == ';'){t = t + cr +  tb}
						if(c[i] == '{'){t = t + cr +  tb}
						if(c[i] == '}'){t = t + cr + cr}		
					}
				
					dStyleBlank.innerHTML = c;

					insertAdjacentElement(para, dStyle , "before");
					document.getElementById("diddlercssOut").value = t;
				}
				//document.getElementById('diddlermain').style.top = window.pageYOffset + 50
				//document.getElementById('diddlermain').style.left = window.pageXOffset + 50
				tx =  window.pageXOffset + 50; ty =  window.pageYOffset + 50;
				dConsole.style.display = '';
				document.getElementById('diddlertogg').onclick();
			}
		},false)


	ge("diddlertopBar").addEventListener("mousedown", selectmouse, false);
	ge("diddlersizer").addEventListener("mousedown", selectmouse, false);

	//ge("diddlercssOut").addEventListener("keydown", keyDownHandler, false);
	//ge("diddlermuOut").addEventListener("keydown", keyDownHandler, false);






	ge("diddlermuOut").addEventListener("keydown", function(e){if(e.keyCode == 9 ){insert(ge(e.target.id), unescape('%09'));setTimeout("document.getElementById('diddlermuOut').focus();", 10);}}, false);
	ge("diddlercssOut").addEventListener("keydown", function(e){if(e.keyCode == 9 ){insert(ge(e.target.id), unescape('%09'));setTimeout("document.getElementById('diddlercssOut').focus();", 10);}}, false);

	ge("diddlermuTab").addEventListener("click", function(e){showHide('mu', 'css', 'hlp')}, false);
	ge("diddlercssTab").addEventListener("click", function(e){showHide('css', 'mu', 'hlp')}, false);
	ge("diddlerhlpTab").addEventListener("click", function(e){showHide('hlp', 'mu', 'css')}, false);
	ge("diddlertogg").addEventListener("click", function(e){showHideMain();return false;}, false);















})();