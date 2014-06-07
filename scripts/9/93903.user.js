// ==UserScript==
// @name           FaceBook high res image viewer.
// @namespace      http://www.richardtphoto.com/fbview.php
// @version 1.1
// @description    Fed up of downloading Facebook's high res images? Use this to view them in your browser.
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @exclude       http://*.facebook.com/ajax/*
// @exclude       https://*.facebook.com/ajax/*
//@author Richard Toolan www.rtoolan.ie
// ==/UserScript==
/*--- To "refire" our Greasemonkey code on AJAX changes, we wrap it in
    a function and call it on a DOM change event.
*/


var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;
var URLset = false;


/*--- Run everything after the document has loaded.  Avoids race-
      conditions and excessive "churn".
*/
window.addEventListener ("load", MainAction, false);


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
if(document.getElementById('fbPhotoSnowlift').currentStyle.visibility == 'visible') alert('visible');
else alert('hidden');
if(document.getElemenentById('fbPhotoSnowlift').getPropertyValue('display')=='none'){
var links = document.getElementsByTagName( 'ul' );
var element;
for ( var i = 0; i < links.length; i++ ) {

    element = links[ i ];

    if (element.className == "uiMenuInner") {
    
        alert("Hi!");
        var a = "http://richardtphoto.com/fbview.php?facebookurl=";
        var b = String(element.href);
        var c = a + b + '&ver=1.1';
		//alert(element);
        element.setAttribute('href', c);
        element.innerHTML ='View in high resolution';
        newElement = document.createElement('a');
        newElement.setAttribute ( 'href', b);
        newElement.innerHTML = 'Download high resolution image';
        element.parentNode.insertBefore(newElement, element.nextSibling);
        break;
      }
}

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
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 222); //-- 222 milliseconds
}