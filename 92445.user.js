// ==UserScript==
// @name          XE JXS
// @version       1.0
// @namespace     http://userscripts.org/users/jaxo
// @description   Auto submits, remembers last amount, filter out non-digits
// @include       http://www.xe.com/ucc/convert.cgi?*
// ==/UserScript==


var from   = document.getElementsByName("From")[0];
var to     = document.getElementsByName("To")[0];
var amount = document.getElementsByName("Amount")[0];


if (from && to && amount)
{
    amount.value = getCookie("lastAmount");
    amount.focus();
    
    var code = "var e=document.getElementsByName('Amount')[0];if(!isNaN(e.value)){\
                document.cookie='lastAmount='+e.value;document.quick.submit();}\
                else{e.value=e.value.replace(/[^0-9]/g,'');}";
    
    amount.setAttribute("onkeyup",code);
    from.setAttribute("onchange",code);
    to.setAttribute("onchange",code);
}


function getCookie(name)
{
   var c = "; "+document.cookie+";";
   var i = c.indexOf("; "+name+"=");
   
   if (c.length-3 && i+1)
      return c.substring(i+3+name.length).split(";")[0];
   return null;
}