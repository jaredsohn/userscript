// ==UserScript==
// @name           Palmbux autoclick by Not@hacker
// @namespace      Palmbux autoclick by Not@hacker
// @description    Palmbux autoclick by Not@hacker
// @author         Not@hacker
// @email          -
// @copyright      Not@hacker 2009
// @license        -
// @homepage       -
// @version        0.01
// @include        http://www.palmbux.com/ads.php
// ==/UserScript==
/**/
 var milisec=0 ;
 var seconds=30 ;
var clickedads = 0;
var noad = 0;
var i = 1; 
	var reloadFunc = function(){
	 if (milisec<=0){ 
    milisec=9 
    seconds-=1 
 } 
 if (seconds<=-1){ 
    milisec=0 
    seconds+=1 
 } 
 else 
    milisec-=1;
	
	msg.textContent = "Reloading... (" + seconds + "." + milisec + ') *-*-*-*Stats: Ads avaible: ' + (i-1) + ', Clicked: '+ clickedads +', Already Clicked: '+ noad+'*-*-*-*';
		if (milisec <=0)
		{
			if (seconds<=0) {
		window.location.href = window.location.href;
			}
			else
			{
			setTimeout(reloadFunc,100);
			}
		}
		else
		{
			    setTimeout(reloadFunc,100); 
		}

	}



var w = document.createElement('div');
w.setAttribute('style','position:fixed; bottom:0px; right:0px; background-color:#000; font-weight:bold; color:#FFF; display:block; padding:4px;');
var close = document.createElement('span');
close.setAttribute('title', 'Close');
close.setAttribute('style', 'cursor:pointer; margin-left:2px; padding:0px 5px 0px 4px; background-color:#FF0000; display:block; float:right; width:10px;');
close.textContent = '×';
close.addEventListener('click', function(e)
{
	with (e.target)
	{
		if (textContent == "×")
		{
			textContent = "+";
			setAttribute("title", "Open");
			parentNode.childNodes[1].style.display = "none";
		}
		else
		{
			textContent = "×";
			setAttribute("title", "Close");
			parentNode.childNodes[1].style.display = "inline";
		}
	}
}, false);
w.appendChild(close);
var msg = document.createElement('span');
msg.setAttribute('style', 'margin-right:2px;');
msg.textContent = 'Made by Not@hacker';
w.appendChild(msg);

document.body.appendChild(w);

// Código Javascript para Aplicación DimeHora.
function getXMLHTTPRequest() {
try {
req = new XMLHttpRequest();
} catch(err1) {
  try {
  req = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (err2) {
    try {
    req = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (err3) {
      req = false;
    }
  }
}
return req;
}

var http = getXMLHTTPRequest();
var mensaje;

function useHttpResponse() {
   if (http.readyState == 4) {
    if(http.status == 200) {
       var timeValue = http.responseText;
       document.getElementById(ids).innerHTML = mensaje;
    }
  } else {
  document.getElementById(ids).innerHTML = 'Sending...';
  }
}

function validclick()
{
			msg.textContent = 'Cashing add ' + i-1;
			mensaje = 'Cash Added';
			  var myurl = 'cmp.php?complete';
			 // ids = 'da' + i-1 + 'a';
			  http.open("GET", myurl, true);
			  http.onreadystatechange = useHttpResponse;
			  http.send(null);
			msg.textContent = 'Cash added for ad('+(i-1)+')';
}



function surfads()
{
//var clickedads = 0;
//var noad = 0;
var str;
if (document.getElementById('da'+i+'a')) 
{

	str = document.getElementById('da'+i+'a').innerHTML;;
	if (str)
	{

		//the number on the 3rd character is the actual element so it will loop while it finds an element x
			if (str.match("You have already clicked"))
			{
			msg.textContent = 'Ad ' + i + ' not avaible';
			i=i+1;
			//alert('will loop' + i);
			noad = noad  +1;
			setTimeout(surfads,1000);
			}
			else
			{
			
			msg.textContent = 'Viewing ad ' + i;
			mensaje = 'Viewing Ad';
					//get the string 
			var formcontent=document.getElementById('da' + i + 'c').innerHTML;
			formcontent=formcontent.split(" ")
			var word = formcontent[2];
			word= word.substring(4,46);
			  var myurl = word + '&cdk=true';
			  ids = 'da' + i + 'a';
			  http.open("GET", myurl, true);
			  http.onreadystatechange = useHttpResponse;
			  http.send(null);
			  //sent
			msg.textContent = 'Waiting to validate ad('+i+')';
			i=i+1;
			clickedads = clickedads+1;
		setTimeout(surfads,70000);
		setTimeout(validclick,50000);
			}
		//msg.textContent = 'kjj ('+i+')';
	}
}
else
{
msg.textContent = 'Finished browsing adds :) (Ads avaible: ' + (i-1) + ', Clicked: '+ clickedads +', Already Clicked: '+ noad+')' ;

		var randomnumber=Math.floor(100000+(Math.random()*500000))
		//setTimeout(reloadFunc,60000);
		seconds = Math.floor(randomnumber/1000);
		//will wait 10 seconds before start
		reloadFunc.timerId = setTimeout(reloadFunc,10000);
}

}



switch (document.domain.replace(/^www\d*\./,''))
{

	case 'palmbux.com':
		if(document.title=="Page Load Error")
		{
		//load this particular page (relative links may not work because of how
		//Page Load Errors are handled)
		window.location.href=window.location.href;
		}
		else
		{
		//continue the script normally
		surfads.timerId = setTimeout(surfads,5000);
		}
	break;

}