// ==UserScript==
// @name           z0r.de
// @namespace      Giiid
// @author         Niiid
// @description    Zor shortcut key
// @include        http://z0r.de/*
// ==/UserScript==


  
//document.onkeypress = KeyPressHappened;
window.addEventListener('keydown', KeyPressHappened, true);

//unsafeWindow.document.onkeypress = function (e) {  alert("you pressed key '" + e.which + "'"); 

 

function KeyPressHappened(e)
{
 
  if (!e) e=window.event;
  var code;
  if ((e.charCode) && (e.keyCode==0))
    code = e.charCode
  else
    code = e.keyCode;
       	
	
	var url= document.location.href;
  var tmp = url.split('/');

  var current_page = tmp[3];


  var current_page_int = parseInt(current_page);

  if(code==39)
  {      
    
    window.location = "http://z0r.de/"+(current_page_int+1);

  }
    if(code==37)
  {      
    window.location = "http://z0r.de/"+(current_page_int-1);
  }

}


//37: left
//38: up
//39: right
//40: down