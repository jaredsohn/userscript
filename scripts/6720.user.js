// ==UserScript==
// @name           UserNotes2JS
// @description    dummy one
// @include http://bug.corp.yahoo.com/*
// ==/UserScript==


var if2 = document.createElement("TEXTAREA");
var if4 = document.createElement("BR");
if2.setAttribute("id","edit");
var if3 = document.createElement("INPUT");
if3.setAttribute("id","button");             
if3.setAttribute("value","Save Notes");

var queryBox2 = document.getElementById('comment');
var wholeCell2 = queryBox2.parentNode;
wholeCell2.appendChild(if2);
wholeCell2.appendChild(if4);
wholeCell2.appendChild(if3);

var a = document.getElementsByTagName('td');
var b = a[2].getElementsByTagName('b');

var userid = b[0].innerHTML;

var a = document.getElementsByTagName('table');
var c = a[4].getElementsByTagName('a');
var bugId=c[0].innerHTML;
//alert(bugId);

var uurl = "http://csathya.bangalore.corp.yahoo.com/hacks/call.php?user="+userid+"&bug="+bugId;
	
GM_xmlhttpRequest({     method:'GET',  
      url: uurl,
      onload: function(responseDetails) {   
      document.getElementById('edit').value = responseDetails.responseText;
       }
       });


//////////////////////////////////////////
document.getElementById('button').addEventListener("click",function() {
      	var res = document.getElementById('edit').value;
		var uurl = "http://csathya.bangalore.corp.yahoo.com/hacks/call.php?user="+userid+"&bug="+bugId+"&details="+res;
		alert(uurl);

	GM_xmlhttpRequest({     method:'GET',  
      url: uurl 

       });

   },false); 



