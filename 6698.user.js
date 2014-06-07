// ==UserScript==
// @name           finalJS
// @description    dummy one
// @include http://bug.corp.yahoo.com/*
// ==/UserScript==

var styles = '<style type="text/css">span.yregfloathelp{ border: 1px solid #FFC30E; padding:2px 2 2 2px;background-color: #FFFBB8;text-align: left;color: #9C7600;width: 24em;font-size: 11px;font-family: arial, sans-serif;display:none;position:absolute;z-index:3;}</style>';
 document.body.innerHTML += styles;
 
   var tp = document.getElementsByTagName('table');
   var tpp = tp[3].getElementsByTagName('tbody');
   var tppp = tpp[0].getElementsByTagName('tr');

var ifl=document.createElement("SPAN");
ifl.setAttribute("id","popup");
ifl.setAttribute("class","yregfloathelp");

  for(var i=1;i<tppp.length;i++)
 { 
  var tpppp = tppp[i].getElementsByTagName('td');
   var bugnumber = tpppp[0].innerHTML;
alert(tpppp[0].innerHTML);

 tpppp[0].innerHTML="<a href='www.google.com' id='"+bugnumber+"'>"+bugnumber+"</a>";

var queryBox=document.getElementById(bugnumber);
var anchor = queryBox.innerHTML
var wholeCell=queryBox.parentNode;
wholeCell.appendChild(ifl);

   document.getElementById(anchor).addEventListener("mouseover",function() {
	
      document.getElementById('popup').style.display = 'block';
	alert(anchor);      	 
      GM_xmlhttpRequest({     method:'GET',  
      url:'http://csathya.bangalore.corp.yahoo.com/hacks/call.php?user=manchala&bug='+bugnumber,  
      headers:{      
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',  
         'Accept': 'application/atom+xml,application/xml,text/xml',
       }, 
       onload: function(responseDetails) {   
     document.getElementById('popup').innerHTML = responseDetails.responseText;
       }
    });
   },false);     
   
    document.getElementById(anchor).addEventListener("mouseout",function() {
		document.getElementById('popup').style.display = 'none';
	},false);
}
