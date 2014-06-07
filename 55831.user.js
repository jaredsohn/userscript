// ==UserScript==
// @name        FaceBook Requests in New Window
// @namespace   http://userscripts.org/users/75115
// @description Forces gift and other requests on the FaceBook notifications page to open in a new window (or tab depending on browser settings).
// @include     http://www.facebook.com/*
// @exclude     http://apps.facebook.com/*
// ==/UserScript==

// http://userscripts.org/scripts/show/55831
//
// a script that modifies the onclick event for 
// Facebook request buttons.
//
// --------------------------------------------------------


chkReqs();
window.setInterval(function (){chkReqs()}, 5000);

// check for requests
function chkReqs()
{  //fill inputs array with all INPUT elements
   var inputs = document.getElementsByTagName("input");      
   if (inputs.length > 0)
   {
      for (var i = 0; i < inputs.length; i++)
      {  //get the onclick event from the INPUT element
         var nameStr = inputs[i].getAttribute("name");         
         if (nameStr)  //IF name is populated
         {  //only process gift requests and do not process the ignore button         
            if ((nameStr.match("^actions.http")))
            {  
               var buttonVal = inputs[i].getAttribute("value");               
               if (!(buttonVal.match("$-.New.Window")))
               { 
                  inputs[i].setAttribute("onclick",newStr(nameStr));   //set the new onclick
                  inputs[i].setAttribute("value", buttonVal + " - New Window");
                  inputs[i].setAttribute("name", "actions[reject]");
               }
            }
         }
      }
   }
   return null;
}

function newStr(str)
{
   str = str.replace("actions[","window.open('");
   str = str.replace("]","'); return true;");
   return str;
}
