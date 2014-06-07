// ==UserScript==
// @name        NitroTypeCheatScript
// @namespace   shivnarr
// @description This script displays the text to type in nitrotype.com - S. S. Narr
// @include     http://www.nitrotype.com/race/*
// @version     1
// ==/UserScript==

window.addEventListener("load", function(e) {
	var temp1 = "";
	function crack(){
		var text = document.getElementsByClassName('text');
		var t = text[0].innerHTML;
		var i = 0;
		var tm;
		var x = 1;
		var temp = "";
		
		while(i++<t.length-1)
		{
			if(t[i] == ">")
			{
				x = 2;
			}
			else if(t[i] == "<" && x==2)
			{
				x = 1;
			}
			else if(x == 2)
			temp += t[i];
		}
		var d = document.getElementsByClassName('footerLinks');
		d[0].innerHTML = "<div style='color:white'>"+temp+"</div>";
		if(temp1.length != temp.length && temp1.length >1)
		{
			return false;
		}
		else {temp1 = temp;
			
		}
	}
	alert("Click OK when text appears below!");
	crack();	
}, false);
