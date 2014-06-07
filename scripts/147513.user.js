// ==UserScript==
// @name       HF Script - Codeblock
// @namespace  theone
// @version    1.1.4
// @description  Code block addition
// @include htt*://www.hackforums.net/*
// @copyright  None
// ==/UserScript==

//Only need this in threads
if(window.location.href.toString().indexOf("showthread.php")!=-1) {	
    var blocks = document.getElementsByClassName("codeblock");
	for(var cBlock in blocks)
	{
		//use second fucntion, else variables will be resetted.
		CreateFunc(cBlock, blocks);
	}
    
}

function CreateFunc(cBlock, blocks)
{
		//set variables
		var id = randomString();
		var id2 = randomString();
		
		//set select button
		var currentVar = blocks[cBlock].getElementsByClassName("title")[0];
		newHTML = 'Code: <a href="javascript:void(0);" id="'+ id +'">[Select All]</a><br>';
		currentVar.innerHTML = newHTML;

		//set code id
		var nextVar =  blocks[cBlock].getElementsByClassName("body")[0];
		newHTML2 = nextVar.innerHTML.replace("<code>", '<code id="'+ id2 +'">');
		nextVar.innerHTML = newHTML2;
		
		//set click event
		var element = document.getElementById(id);
		var doc = document.getElementById(id2);
		element.addEventListener("click", function(){selectCode(doc)}, false);
}

//..
function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring.toString();
}

//mybb.com
function selectCode(a)
{
   var e = a;
   if (window.getSelection)
   {
      var s = window.getSelection();
       if (s.setBaseAndExtent)
      {
         s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);
      }
      else
      {
         var r = document.createRange();
         r.selectNodeContents(e);
         s.removeAllRanges();
         s.addRange(r);
      }
   }
   else if (document.getSelection)
   {
      var s = document.getSelection();
      var r = document.createRange();
      r.selectNodeContents(e);
      s.removeAllRanges();
      s.addRange(r);
   }
   else if (document.selection)
   {
      var r = document.body.createTextRange();
      r.moveToElementText(e);
      r.select();
   }
}