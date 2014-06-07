{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           Updated Mousehunt Showtimer\par
// @namespace      Wr3cktangle\par
// @include        http://apps.facebook.com/mythmonger/*\par
// @include        http://apps.new.facebook.com/mythmonger/*\par
// @description\tab    Shows the hidden timer field for the Mousehunt Facebook application. This does not automatically sound the horn, it just shows the hidden timer so you can see when you will be able too within the page.\par
// ==/UserScript==\par
\par
//get all the input tags\par
//the id has a random (?) value appended onto it, i believe, so i just get all input tags.\par
inputs = document.getElementsByTagName("input");\par
\par
//check to make sure we found some - should find several (~7 on /index.php for MH)\par
if(inputs)\par
\{\par
   //loop through and find the hornWaitValue input box, assuming it was found\par
   for(i = 0; i < inputs.length; i++)\par
   \{\par
      if(inputs[i].id.indexOf("TurnWaitValue") != -1)\par
      \{\par
         //change the input field in a few ways:\par
         //1: Change type from "hidden" to "text", making it visible\par
         //2: Set Readonly to true. Changing the value provides no benefit, as the actual\par
         //   timer is tracked on their server. At best, changing\par
         //   this value causes the horn to be shown early, but clicking it accomplishes nothing.\par
         //3: Change the font color to red, to make it pop a little more\par
         //4: Set width to 30px, a magic number slightly wider than 3 characters.\par
         inputs[i].type="text";\par
         inputs[i].readOnly=true;         \par
         inputs[i].style.color="red";\par
         inputs[i].style.width="30px";         \par
         \par
         break;\par
      \}\par
   \}   \par
\}\par
}
