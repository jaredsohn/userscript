// ==UserScript==
// @name Imgurite
// @namespace https://userscript.org/scripts/source/159076.user.js
// @description Changes Imgur's interface
// @icon http://s.imgur.com/images/medal/imgurite.png
// @include http*imgur.com*
// @run-at document-end
// @downloadURL https://userscript.org/scripts/source/159076.user.js
// @updateURL https://userscript.org/scripts/source/159076.user.js
// @version 0.4
// ==/UserScript==

/** First Script : Modification to the interface. Mainly floating parts.**/
/* Second Script (Independent): Loads links to images in the lower right corner */ 


/* Known bugs */
// When resizing your window, elements will get all over the page

/* Future developments */
// Maybe add the option to make Imgur white or any color. Useful for low luminosity or user preference.
// The second script is there until I can figure out how to load and embed all images.
// The arrow next to the username shouldn't be visible and there shouldn't be any border next to the username.
// Add a green or red border on images you've upvoted/downvoted.
// Floating upvote/downvote buttons for the image?



/** Second script **/
setInterval(function(){
(function(){
var list = document.getElementsByTagName('a');
var reg = /\.(jpg|jpeg|gif|png|ico)\s*$/i;

for(var i=0,size=list.length;i<size;i++){
  var node = list[i];
  var tooltip = false;

  if(reg.test(node.href)){
    tooltip = 'href';
  }
  
  else{
    if(reg.test(node.title)){
      tooltip = 'title';
    }
  }

  if(tooltip){
    node.onmouseover = (function(tooltip){
      return function(e){
        node = e.currentTarget;

        var image = document.createElement('img');
        image.src = node[tooltip];
        if(image.width > 500) image.style['width']=document.body.clientWidth/2+"px"
        image.style['z-index'] = 10; 
        image.style['position'] = 'fixed';  
	//	image.style['border'] = 40 +"px";

        image.style['bottom'] = '0px';
        image.style[
          (e.clientX < document.body.clientWidth/2) ? 'right' : 'right'
         ] = '0px'; 

        document.body.appendChild(image);
        node.onmouseout = function(){
          setTimeout(function(){document.body.removeChild(image)},3000);
        }
      };
    })(tooltip);
  }
}

})();
}, 1000);

/** First script **/
document.getElementsByClassName('account-arrow')[0].style.display="none"; 

if((document.getElementById('right-content') == null)&&(true)){ // No "Follow us on FB, Twitter etc...
document.getElementsByClassName('panel')[2].style.display="none";
document.getElementsByClassName('panel')[6].style.display="none";
}

document.getElementById('header-logo').style.position="fixed";  // Floating Imgur Logo on the left.
document.getElementById('header-logo').style.zIndex=5; 
document.getElementById('header-logo').style.top=0+"px"; 
document.getElementById('header-logo').style.left=((window.innerWidth/30)-5)+'px' 
//document.getElementById('content').style.top=500+"px";
//document.getElementById('topbar').style.height=0+"px"; // For the whole top bar to be floating.

/*
for( var i = 0; i < 5 ; i++){
alert(document.getElementsByClassName('panel')[i].value);
}
*/
//alert (document.getElementById('secondary-nav').getElementByClassName('account-arrow'))


document.getElementById('secondary-nav').style.position="fixed";  // Floating Album, Image, Notification and Username
document.getElementById('secondary-nav').style.zIndex=10; 
document.getElementById('secondary-nav').style.top=0+"px"; 
document.getElementById('secondary-nav').style.right=((window.innerWidth*0.11))+'px' 
document.getElementById('secondary-nav').style.borderStyle="hidden"; 

document.getElementById('right-content').style.position="fixed"; // Floating statistical datas and Uploader info
document.getElementById('right-content').style.zIndex=0; 
document.getElementById('right-content').style.top=50+"px"; 
document.getElementById('right-content').style.right=((window.innerWidth*0.10))+'px' 
document.getElementById('right-content').style.borderStyle="hidden"; 

/* //Floating Expand All
document.getElementsByClassName('right small')[0].style.position="fixed";
document.getElementsByClassName('right small')[0].style.zIndex=11; 
document.getElementsByClassName('right small')[0].style.right=(window.innerWidth*0.10)+'px' 
*/

/*
    var parent = document.getElementById('right-content');
    var embedNode = document.createElement("link");
    embedNode.class = "link";
    embedNode.type = "text/html";
    embedNode.width = "10";
    embedNode.height = "10";
    embedNode.frameBorder = "0";
    embedNode.style.marginTop = "10px";
    embedNode.style.marginBottom = "10px";
    embedNode.src = "http://www.youtube.com/";
	embedNode.zIndex = 12;
    parent.appendChild(embedNode);
*/

//document.getElementById('colorbox').style.display="none"; 
//document.getElementById('cboxOverlay').style.display="none"; // doesn't work. Don't know why. Idea : When you click an image it loads but without fogging the screen.




document.getElementsByClassName('account-arrow')[0].style.display="none"; 


