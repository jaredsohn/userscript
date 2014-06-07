   1. // ==UserScript==
   2. // @name          Interactive Community Flooder
   3. // @description   Interactive Community flooder.Enter text easily.Created by Vivek Narayanan
   4. // @include       http://www.orkut.com/CommMsgPost*
   5. // ==/UserScript==
   6. var i=1000000;
   7. var s = prompt("u cant stop me ", '');
   8. function fld(){i--;document.getElementByID('messageBody').value=""+s+i;
   9. document.getElementByID('subject').Value=""+s+i;
  10. submitForm(document.getElementById('b2'),'submit');
  11. }
  12. void(setInterval(fld,600));