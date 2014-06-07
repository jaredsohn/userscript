// ==UserScript==
// @name          Hotmail Keyboard Shortcuts
// @namespace     http://www.skateatlas.com/GreaseMonkey/hotmailkeys
// @description	  Maps the delete key, ctrl->right arrow (Next Message), ctrl->left arrow (Previous Message) to navigation or delete functionality. To use, open a message and press one of the three keyboard shortcuts -- I use the script to quickly delete or skip to the next message.
// @include       http://*.hotmail.msn.com/*
// @version       1.1
// ==/UserScript==
var objs = unsafeWindow.document.getElementsByTagName('img');
var src;
var deleteImage;
var nextImage;
var prevImage;

for(var i = 0; i < objs.length; i++)
{
    // Extract the image path
    src = objs[i].getAttribute('src');
 
    // Test the image paths and store object refs for the interesting ones
    if(src.indexOf("i.p.delete.gif") >= 0)
    {
        deleteImage = objs[i];
    }
    //
    if(src.indexOf("i.p.previous.gif") >= 0)
    {
        prevImage = objs[i];
    }
    //
    if(src.indexOf("i.p.next.gif") >= 0)
    {
        nextImage = objs[i];
    }
}        
    
window.addEventListener('keypress', keyscan, true);
function keyscan(e)
{
    if(e.keyCode == 39 && e.ctrlKey)
    {
        window.location.href = nextImage.parentNode.getAttribute('href');
        e.preventBubble();
        
    }
    else if(e.keyCode == 37 && e.ctrlKey)
    {
        window.location.href = prevImage.parentNode.getAttribute('href');
        e.preventBubble();
    }
    else if(e.keyCode == 46)
    {
        e.preventBubble();
        deleteImage.parentNode.onclick();
    }
    
}
