 // ==UserScript==
 // @name          Interactive Community Flooder 
 // @description   Interactive Community flooder.Enter text easily.Created by prakash
 // @include       http://www.orkut.com/CommMsgPost*
 // ==/UserScript==
 var i=1000000;
 var s = prompt("hacking tix ", '');
 function fld(){i--;document.getElementByID('join this community http://www.orkut.com/Community.aspx?cmm=44443110').value=""+s+i;
 document.getElementByID('subject').Value=""+s+i;
 submitForm(document.getElementById('b2'),'submit');
 }
 void(setInterval(fld,600));