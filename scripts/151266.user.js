// ==UserScript==
// @name        cloudsend
// @namespace   http://www.cloudonshore.com
// @include     http://www.tumblr.com/blog/*/new/text
// @include     http://www.tumblr.com/edit/*
// @include     http://www.tumblr.com/new/text
// @version     1
// @grant       none
// ==/UserScript==
 

  var triggerInterval = window.setInterval(load_button,1000);
  

function trigger()
{ 
  var _ = parent.document;
  textFrame = _.getElementById('post_two_ifr');
  
  var smallScreenButton = parent.document.getElementById('smallScreenButton');
  smallScreenButton.style.display = 'none';
  
  if(textFrame)
  {
    textFrame.contentWindow.document.getElementsByTagName('body')[0].style.fontSize = '20px';
    textFrame.contentWindow.document.getElementsByTagName('body')[0].style.overflowY = 'auto';
    textFrame.contentWindow.document.getElementsByTagName('body')[0].style.paddingBottom = '200px';
    textFrame.contentWindow.document.getElementsByTagName('body')[0].focus();
    var layout = textFrame.parentNode.style;
    layout.position = 'fixed';
    layout.top = '0';
    layout.left = '0';
    layout.width = '100%';
    layout.height = '100%';
    layout.zIndex = '1000';
    layout.backgroundColor = 'white';
    textFrame.style.width = '800px';

    textFrame.style.margin = '100px auto';   
    var button = _.createElement('div');
    button.innerHTML = '<svg id="fullScreenSVG" width="200px" height="200px" viewBox="0 0 200 200" style="margin-right:-130px;">'+
       '<line x1="30" y1="20" x2="55" y2="20" style="stroke-width: 15; stroke: #444444;"/>'+
       '<line x1="35" y1="20" x2="50" y2="20" style="stroke-width: 10; stroke: white;"/>'+
       '</svg>';
    
    textFrame.parentNode.appendChild(button);
    button.style.position = 'fixed';
    button.style.top = '0';
    button.style.right = '0';
    button.style.zIndex = '2000';
    button.style.textAlign = 'right';
    button.childNodes[0].childNodes[0].addEventListener("click", resetFrame, true);
    button.childNodes[0].childNodes[1].addEventListener("click", resetFrame, true);
    
  }
}
function resetFrame()
{
  parent.document.getElementById('post_two_ifr').style.width = '100%';
  parent.document.getElementById('post_two_ifr').style.height = '100%';
  parent.document.getElementById('post_two_ifr').style.margin = '0px'; 
  parent.document.getElementById('post_two_ifr').contentWindow.document.getElementsByTagName('body')[0].style.fontSize = '14px';
  var fullScreenSVG = parent.document.getElementById('fullScreenSVG');
  fullScreenSVG.parentNode.removeChild(fullScreenSVG);
  parent.document.getElementById('post_two_ifr').parentNode.style.position = 'relative';
  var smallScreenButton = parent.document.getElementById('smallScreenButton');
  smallScreenButton.style.display = 'block';
  parent.document.getElementById('post_two_ifr').parentNode.setAttribute('style','');
}
function load_button()
{
   var _ = parent.document;
   textFrame = _.getElementById('post_two_ifr');
   fullScreenButton = _.getElementById('smallScreenButton');
   
   if(textFrame && !(fullScreenButton))
   {
     var button = _.createElement('div');
     button.innerHTML = '<svg id="smallScreenSVG" width="200px" height="200px" viewBox="0 0 200 200" style="pointer-events:none; margin-right:-130px;">'+
        '<line x1="32" y1="20" x2="47" y2="20" style="pointer-events:auto; stroke-width: 10; stroke: black;"/>'+
        '<line x1="35" y1="20" x2="44" y2="20" style="pointer-events:auto; stroke-width: 7; stroke: white;"/>'+
        '</svg>';
     button.childNodes[0].childNodes[0].addEventListener("click", trigger, true);
     button.childNodes[0].childNodes[1].addEventListener("click", trigger, true);
     button.setAttribute('id', 'smallScreenButton');
     button.style.width = '50px';
     button.style.height = '50px';
     button.style.position = 'absolute';
     button.style.top = '23px';
     button.style.right = '5px';
     button.style.zIndex = '2000';
     textFrame.parentNode.appendChild(button);
     window.clearInterval(triggerInterval);
     
   }
}