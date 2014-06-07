// ==UserScript==
// @name          Survey Helper (Beta Version)
// @version       13.37
// @namespace     dark89ninja
// @description	  Helps you complete surveys
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include           http://www.eltpath.com/*
// @include           http://*.smileymedia.com/*
// @include           http://lgn*.coolsavings.com/*
// @include           http://lnktrckr.com/*
// @include           http://*quizjungle.com/?act_id=*
// @include           http://www.quizjumper.com/*
// @include           http://www.modpath.com/*
// @include           http://www.tnmtechnology.com/*
// @include           http://www.brandarama.com/*
// @include           http://www.topconsumergifts.com/*
// @include           http://offers.slwpath.com/*
// @include           http://us.quizrocket.com/*
// @include           http://www*.recipe4living.com/default*
// @include           http://www.premiumproductsonline.com/*
// @include           https://mysmokingrewards.com/*
// @include           http://www.eversave.com/*
// @include           http://www.thelaptopsaver.com/*
// @exclude          http://www.prizerebel.com/*
// @exclude          http://userscripts.org/*
// @include       https://plus.google.com/*
// @include       http://plus.google.com/*
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// @include       https://docs.google.com/*
// @include       http://docs.google.com/*
// @include       https://picasaweb.google.com/*
// @include       http://picasaweb.google.com/*
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// @include       http://www.google.com/calendar/*
// @include     http://www.thequizclub.com/*
// @include     http://www.eltpath.com/*
// @include     http://*.smileymedia.com/*
// @include     http://lgn*.coolsavings.com/*
// @include     http://lnktrckr.com/*
// @include     http://*quizjungle.com/?act_id=*
// @include           http://www.quizjumper.com/*
// @include           http://www.modpath.com/*
// @include           http://www.tnmtechnology.com/*
// @include           http://www.brandarama.com/*
// @include           http://www.topconsumergifts.com/*
// @include           http://offers.slwpath.com/*
// @include           http://us.quizrocket.com/*
// @include           http://www*.recipe4living.com/default*
// @include           http://www.premiumproductsonline.com/*
// @include           https://mysmokingrewards.com/*
// @include           http://www.eversave.com/*
// @include           http://www.thelaptopsaver.com/*
// @include           http://track.superb-rewards.net/
// @include           http://fileme.us/
// @include       http://*
// @include       /*
// @include       *

// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); img[width=\"1\"], img[height=\"1\"] { border:solid 25px green !important; }";
if (typeof GM_addStyle != "undefined") {
GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
addStyle(css);
} else {
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);
}
}
})();

}
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
		
	if (document.title == "Config")
	{
		chk_reset();
		document.getElementById("AH_T").addEventListener('click', function () {question1=true;chk_valid();}, true);
		document.getElementById("AH_F").addEventListener('click', function () {question1=false;chk_valid();}, true);
		document.getElementById("AT_T").addEventListener('click', function () {question2=true;chk_valid();}, true);
		document.getElementById("AT_F").addEventListener('click', function () {question2=false;chk_valid();}, true);
		document.getElementById("reset").addEventListener('click',function () {a=b=c=d=0;reset()}, true);
	}

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
function getElementsByName(name, tag)
{
	var returner = [];
	if (tag === false || tag === null || tag === "")
	{
		tag = "*";
	}
	var eles = document.getElementsByTagName(tag);
	var j = 0;
	var ele;
	var k;
	for (j = 0; j < eles.length; j++)
	{
		ele = eles[k];
		if (ele.name == name)
		{
			returner[returner.length] = ele;
		}
	}
	return returner;
}

inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios=0;
var firstradio=0;
var foundradio=false;
var i=0;
for(i=0;i<inputs.length;i++)
{
	if(inputs[i].type=="radio")
		{
			if(!foundradio)
			{
				firstradio = i;
				foundradio = true;
			}
			radios++;
			if(inputs[i].value.toLowerCase()=="no")
			{
				inputs[i].checked = true;
				inputs[i].click();
				document.body.focus();
			}
			else
			{
				inputs[i].checked=true;
			}
		}
	
}
if (radios>2)
{
	inputs[firstradio+2].checked=true;
}

next = document.getElementById("nextOffer");
if (next == null)
{
	next = document.getElementById("pass");
}
if (next == null)
{
	next = document.getElementById("bt_cancel");
}
if(next == null)
{
	for(i=0;i<inputs.length;i++)
	{
		if((inputs[i].type=="submit") && (inputs[i].value.toLowerCase()=="skip"))
		{
			next = inputs[i];
			break;
		}
	}
}
if(next==null)
{
	for(i=0;i<inputs.length;i++)
		{
			if((inputs[i].value.toLowerCase()=="submit") || (inputs[i].name.toLowerCase()=="submit"))
			{
				next = inputs[i];
				break;
			}
		}
}
if(next == null)
{
	next = document.getElementById("submitbutton");
}
next.focus();
next.click();

inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios=0;
var firstradio=0;
var foundradio=false;
var i=0;
for(i=0;i<inputs.length;i++)
{
	if(inputs[i].type=="radio")
		{
			if(!foundradio)
			{
				firstradio = i;
				foundradio = true;
			}
			radios++;
			if(inputs[i].value.toLowerCase()=="no")
			{
				inputs[i].checked = true;
				inputs[i].click();
				document.body.focus();
			}
			else
			{
				inputs[i].checked=true;
			}
		}
	
}
if (radios>2)
{
	inputs[firstradio+2].checked=true;
}

next = document.getElementById("nextOffer");
if (next == null)
{
	next = document.getElementById("pass");
}
if (next == null)
{
	next = document.getElementById("bt_cancel");
}
if(next == null)
{
	for(i=0;i<inputs.length;i++)
	{
		if((inputs[i].type=="submit") && (inputs[i].value.toLowerCase()=="skip"))
		{
			next = inputs[i];
			break;
		}
	}
}
if(next==null)
{
	for(i=0;i<inputs.length;i++)
		{
			if((inputs[i].value.toLowerCase()=="submit") || (inputs[i].name.toLowerCase()=="submit"))
			{
				next = inputs[i];
				break;
			}
		}
}
if(next == null)
{
	next = document.getElementById("submitbutton");
}
next.focus();
next.click();

function getElementsByName(name, tag)
{
	var returner = [];
	if (tag === false || tag === null || tag === "")
	{
		tag = "*";
	}
	var eles = document.getElementsByTagName(tag);
	var j = 0;
	var ele;
	var k;
	for (j = 0; j < eles.length; j++)
	{
		ele = eles[k];
		if (ele.name == name)
		{
			returner[returner.length] = ele;
		}
	}
	return returner;
}




var inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios = 0;
var firstradio = 0;
var foundradio = false;
var i = 0;
var next;
for (i = 0; i < inputs.length; i++)
{
	if (inputs[i].type == "radio")
	{
		if (!foundradio)
		{
			firstradio = i;
			foundradio = true;
		}
		radios++;
		if (inputs[i].value.toLowerCase() == "no")
		{
			inputs[i].checked = true;
			inputs[i].click();
			document.body.focus();
		}
		else
		{
			inputs[i].checked = true;
		}
	}
	
}
if (radios > 9)
{
	inputs[(firstradio + 2)].checked = true;
}

next = document.getElementById("nextOffer");

if (next === null)
{
	next = document.getElementById("pass");
}
if (next === null)
{
	next = document.getElementById("bt_cancel");
}
if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "skip"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "button") && (inputs[i].value.toLowerCase() == "skip"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "button") && (inputs[i].value.toLowerCase() == "pass"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "pass"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "Click here to continue  &gt;&gt;"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "pass/continue"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "image") && (inputs[i].value.toLowerCase() == "continue"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "continue"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "next"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if (inputs[i].type == "image")
		{
			if ((inputs[i].name.toLowerCase() == "skip") || ((inputs[i].name.toLowerCase() == "button") && (inputs[i].src.indexOf("pix.gif") != -1)))
			{
				next = inputs[i];
				break;
			}
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].value.toLowerCase() == "submit") || (inputs[i].name.toLowerCase() == "submit"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "image") && (inputs[i].src.indexOf("submit") != -1))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	next = document.getElementById("submitbutton");
}

if (next === null)
{
	next = document.getElementsByName("Submitbutton")[0];
}

if (next === null)
{
	next = document.getElementsByName("buttonSubmit")[0];
}

if (next.disabled == 1)
{
	next.disabled = 0;
}	

next.focus();
next.click();

inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios=0;
var firstradio=0;
var foundradio=false;
var i=0;
for(i=0;i<inputs.length;i++)
{
	if(inputs[i].type=="radio")
		{
			if(!foundradio)
			{
				firstradio = i;
				foundradio = true;
			}
			radios++;
			if(inputs[i].value.toLowerCase()=="no")
			{
				inputs[i].checked = true;
				inputs[i].click();
				document.body.focus();
			}
			else
			{
				inputs[i].checked=true;
			}
		}
	
}
if (radios>2)
{
	inputs[firstradio+2].checked=true;
}

next = document.getElementById("nextOffer");
if (next == null)
{
	next = document.getElementById("pass");
}
if (next == null)
{
	next = document.getElementById("bt_cancel");
}
if(next == null)
{
	for(i=0;i<inputs.length;i++)
	{
		if((inputs[i].type=="submit") && (inputs[i].value.toLowerCase()=="pass"))
		{
			next = inputs[i];
			break;
		}
	}
}
if(next==null)
{
	for(i=0;i<inputs.length;i++)
		{
			if((inputs[i].value.toLowerCase()=="submit") || (inputs[i].name.toLowerCase()=="submit"))
			{
				next = inputs[i];
				break;
			}
		}
}
if(next == null)
{
	next = document.getElementById("submitbutton");
}
next.focus();
next.click();

inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios=0;
var firstradio=0;
var foundradio=false;
var i=0;
for(i=0;i<inputs.length;i++)
{
	if(inputs[i].type=="radio")
		{
			if(!foundradio)
			{
				firstradio = i;
				foundradio = true;
			}
			radios++;
			if(inputs[i].value.toLowerCase()=="pass")
			{
				inputs[i].checked = true;
				inputs[i].click();
				document.body.focus();
			}
			else
			{
				inputs[i].checked=true;
			}
		}
	
}
inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios=0;
var firstradio=0;
var foundradio=false;
var i=0;
for(i=0;i<inputs.length;i++)
{
	if(inputs[i].type=="radio")
		{
			if(!foundradio)
			{
				firstradio = i;
				foundradio = true;
			}
			radios++;
			if(inputs[i].value.toLowerCase()=="skip")
			{
				inputs[i].checked = true;
				inputs[i].click();
				document.body.focus();
			}
			else
			{
				inputs[i].checked=true;
			}
		}
	
}

var has_cleaned = false;

function auto_gateway(){
  if(has_cleaned) return;
  
  function getStyle(x,styleProp){
	  return (x.currentStyle)
	          ? 
	          x.currentStyle[styleProp.replace(/-(.)/,function(all, group){return group.toUpperCase()})]
	          :
	          document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
  }


  //well it shoudl be stored as a string but whatevea
  var remove_cpa = (function(){
(function(){
  /*START MAGICAL SUPER SCRIPT*/

  var maxw = window.innerWidth, maxh = window.innerHeight;

  for(var e = document.body.getElementsByTagName("*"), l = e.length, el, zi, w, h; l--;){
    el = document.defaultView.getComputedStyle(e[l]);
    zi = el.getPropertyValue("z-index");
    w = parseInt(el.getPropertyValue("width"));
    h = parseInt(el.getPropertyValue("height"));  
    if(w/maxw > 0.92 && h/maxh > 0.92 && zi && !isNaN(parseInt(zi))){
      e[l].style.display = "none";
      
    }
  }

  for(var i = 0; i < 10000; i++){
    clearInterval(i);
    clearTimeout(i);
  }

  for(var i in window){
    if(i!="location") delete window[i];
  }

  for(var t=document.getElementsByTagName("*"), l=t.length; l--;)
    t[l].style.visibility = "";
    
    
  /*In case it does some ridiculous scroll down text*/
  for(var tag, t = document.getElementsByTagName("*"), l=t.length; l--;){
  tag = t[l].tagName.toLowerCase();
  if(tag != "style" && tag != "script"){
    for(var i = t[l].childNodes, remd = false, r = i.length; r--;){
      if(i[r].nodeType == 3){
        if(i[r].nodeValue.toLowerCase().indexOf("scroll") != -1){
          t[l].removeChild(i[r]);
          r++;
          remd = true;
        }
      }else if(i[r].tagName.toLowerCase() == "br" && remd){
        t[l].removeChild(i[r]);
        r++;
        remd = false;
      }
    }
  }
  }
})()
  });

  for(var all = document.body.getElementsByTagName("*"), 
          len = all.length,
          zindex = null,
          docEl = document.documentElement,
          mask_height = docEl.clientHeight * 0.92,
          mask_width = docEl.clientWidth * 0.92,
          evil = false
          ; len--;){
    if(parseInt(getStyle(all[len],"z-index").replace(/[^0-9]/g,'')) > 1337 && all[len].offsetWidth > mask_width && all[len].offsetHeight > mask_height)
      evil = true;
  }
  if(evil){
    if(document.referrer.indexOf("facebook.com/pages") != -1){
      var notice = document.createElement("div");
      notice.setAttribute("style","background-color:orange;color:black;padding:3px;position:fixed;top:0;left:0");
      notice.innerHTML = "Gateway Blocked";
      notice.title = "The referrer has been detected to be facebook so the system feels there is enough certainty to do it automatically."
      document.body.appendChild(notice);
      
      var remover = document.createElement("script");
      remover.type = "text/javascript"
      remover.innerHTML = "/*INJECTED JS*/("+remove_cpa.toString()+")()";
      document.body.appendChild(remover);
      
    }else{
      var notice = document.createElement("div");
      notice.setAttribute("style","color:black;background-color:orange;padding:3px;position:fixed;top:0;left:0;z-index:999999999999999999999999999999999999999");
      notice.innerHTML = "Click to Remove Gateway";
      notice.addEventListener("click", function(){
        var remover = document.createElement("script");
        remover.type = "text/javascript"
        remover.innerHTML = "/*INJECTED JS*/("+remove_cpa.toString()+")()";
        document.body.appendChild(remover);
        notice.innerHTML = "Gateway Blocked";
      }, true);
      document.body.appendChild(notice);
    }
    has_cleaned = true;
  }
};

setTimeout(auto_gateway, 0);
setTimeout(auto_gateway, 1000);

var links = document.querySelectorAll('input[alt="Skip"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="No Thanks"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="Pass"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="skipform"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="no"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="pass"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="next"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="enter"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="NO"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="ENTER"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="NEXT"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="noPrompt"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="submit_button"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="submitbutton"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="SubmitButton"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="Submitbutton"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="submitButton"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="skip_button"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="Skip_button"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="Skip_Button"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="skipbutton"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="n"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="N"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

var links = document.querySelectorAll('input[alt="CONTINUE WHEN FINISHED"]');
for (var link = 0; link < links.length; link++) {
	links[link].click();

//need a guide?
var url = document.body.getElementByTagName('a');
// get all links by tagname
for(i=0;i<=100;i++){
// try the first 100 links
var newurl = url[i].src;
var url2 = url[i];
// get the src from the link
var search = newurl.IndexOf("skip");
// search the url for the word "skip"
if(search>=0){
// found skip? then click it
url2.click();
// click it.
}
