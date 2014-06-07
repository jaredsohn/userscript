// ==UserScript==
// @name          my pretty image replace for VK
// @namespace     http*://vk.com/*
// @description   my pretty image replace for VK
// @include       http*://vk.com/*
// ==/UserScript==

/*--- To "refire" our Greasemonkey code on AJAX changes, we wrap it in
    a function and call it on a DOM change event.
*/

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;


/*--- Run everything after the document has loaded.  Avoids race-
      conditions and excessive "churn".
*/
window.addEventListener ("load", MainAction, false);

{
   var images = document.getElementsByTagName ("img");
   var x=0;
   while(x<images.length)
   {
   	if(	images[x].src == "http://cs540109.vk.me/c608822/v608822130/b1b/WDp74tpZgx8.jpg" ||
   		images[x].src == "http://cs540109.vk.me/c608822/v608822130/b17/cxDQv_oBzsk.jpg" ||
   		images[x].src == "http://cs540109.vk.me/c608822/v608822130/b1a/0PlT_bOHXwY.jpg"
          )
   {
	images[x].src = "http://i.piccy.info/i9/1573d033938083f72ba223709ab8f42e/1389729168/40143/681623/APbjQOnp1Eg.jpg";
   }
        x=x+1;
   }

}


function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;

        /*--- Notes:
                (1) If the ajax loads to a specific node, add this
                    listener to that, instead of the whole body.
                (2) iFrames may require different handling.
        */
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

    //--- ****************************
    //--- *** YOUR CODE GOES HERE. ***
    //--- ****************************

   var images = document.getElementsByTagName ("img");
   var x=0;
   while(x<images.length)
   {
   	if(	images[x].src == "http://cs540109.vk.me/c608822/v608822130/b1b/WDp74tpZgx8.jpg" ||
   		images[x].src == "http://cs540109.vk.me/c608822/v608822130/b17/cxDQv_oBzsk.jpg" ||
   		images[x].src == "http://cs540109.vk.me/c608822/v608822130/b1a/0PlT_bOHXwY.jpg"
          )
   {
	images[x].src = "http://i.piccy.info/i9/1573d033938083f72ba223709ab8f42e/1389729168/40143/681623/APbjQOnp1Eg.jpg";
   }
        x=x+1;
   }

}


function HandleDOM_ChangeWithDelay (zEvent)
{
    /*--- DOM changes will come hundreds at a time, we wait a fraction
          of a second after the LAST change in a batch.
    */
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 1); //-- 1 milliseconds
}