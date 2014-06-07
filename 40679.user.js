// ==UserScript==
// @name           Mousehunt Showtimer
// @namespace      Wr3cktangle
// @include        http://apps.facebook.com/mousehunt/*
// @description	   Shows the hidden timer field for the Mousehunt Facebook application. This does not automatically sound the horn, it just shows the hidden timer so you can see when you will be able too within the page.
// ==/UserScript==

//get all the input tags
//the id has a random (?) value appended onto it, i believe, so i just get all input tags.
inputs = document.getElementsByTagName("input");

//check to make sure we found some - should find several (~7 on /index.php for MH)
if(inputs)
{
   //loop through and find the hornWaitValue input box, assuming it was found
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("hornWaitValue") != -1)
      {
         //change the input field in a few ways:
         //1: Change type from "hidden" to "text", making it visible
         //2: Set Readonly to true. Changing the value provides no benefit, as the actual
         //   timer is tracked on their server. At best, changing
         //   this value causes the horn to be shown early, but clicking it accomplishes nothing.
         //3: Change the font color to red, to make it pop a little more
         //4: Set width to 30px, a magic number slightly wider than 3 characters.
         inputs[i].type="text";
         inputs[i].readOnly=true;         
         inputs[i].style.color="red";
         inputs[i].style.width="30px";         
         
         break;
      }
   }   
}
