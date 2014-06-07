// ==UserScript==
// @name iStockGlue 0.2
// @author Dustin Wilson
// @description Creates a composite of the iStockPhoto zoom image slices so it can be downloaded.
// @include http://*.istockphoto.com/stock-photo*.php
// @include http://*.istockphoto.com/stock-illustration*.php
// @include http://*.istockphoto.com/file_closeup.php*
// ==/UserScript==

/*
Copyright (c) 2009 Dustin Wilson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

// To prevent any potential conflicts.
userJS=(typeof userJS=='undefined') ? {} : userJS;
userJS.iStockGlue={};

function hijackZoom(ev)
{
 // Grab the closest zooming level and then determine the images' div id number.
 userJS.iStockGlue.size=zoomFile.availSizes[zoomFile.availSizes.length-1];
 userJS.iStockGlue.div=(zoomFile.availSizes[userJS.iStockGlue.size]) ? zoomFile.availSizes[userJS.iStockGlue.size] : ((userJS.iStockGlue.size == 3) ? 2 : 1);
 
 // Reconstruct the zoom mechanism's events and force it to zoom all the way in.
 if(ev.target.id=='ZoomHoverDiv')
 {
  $("ZoomHoverDiv").stopObserving("mouseover");
  zoomFile.toggleZoomHover(true);
 }

 zoomFile.doMove(ev);
 zoomFile.nextSize=userJS.iStockGlue.size;
 zoomFile.doMove($('ZoomDraggableDiv'));
}

function hijackImages(ev)
{
 // Only do anything if the loading element is one of the zoom image slices.
 var evid=ev.event.target.id;
 if(ev.event.target.id!=null && ev.event.target.id.match(new RegExp('s'+userJS.iStockGlue.div+'r[0-9]+c[0-9]+')))
 {
  // Get the json, and if it's null stop processing to try again.
  userJS.iStockGlue.json=zoomFile.myRequest.transport.responseText;
  if(userJS.iStockGlue.json==null) return;
  
  // Grab all of the zoom image slices.
  userJS.iStockGlue.images=document.querySelectorAll('#ZoomDraggableDiv #s'+userJS.iStockGlue.div+' img');
  
  // Create the canvas element, resize it, but do not add it to the document.
  var c=document.createElement('canvas');
  c.setAttribute('width',/"targetWidth":(\d+),/.exec(userJS.iStockGlue.json)[1]);
  c.setAttribute('height',/"targetHeight":(\d+),/.exec(userJS.iStockGlue.json)[1]);
  var ctx=c.getContext('2d');
  
  var slice=new Array();
  // Iterate through each image and store it in an array.
  for(var loop=0;loop<userJS.iStockGlue.images.length;loop++)
  {
   img=new Array();
   img['obj']=userJS.iStockGlue.images[loop];
   img['id']=img['obj'].id;
   img['width']=img['obj'].style.width;
   img['height']=img['obj'].style.height;
   img['match']=/s[0-9]+r([0-9]+)c([0-9]+)/.exec(img['id']);
   img['x']=img['match'][2]*zoomFile.viewport.width-zoomFile.viewport.width/2;
   img['y']=img['match'][1]*zoomFile.viewport.height-zoomFile.viewport.height/2;
   img['url']=zoomFile.imgURL+'/file_inspector_view/'+zoomFile.fileID+'/'+userJS.iStockGlue.size+'/'+img['x']+'/'+img['y']+'/zoom_'+zoomFile.fileID+'.jpg';
   
   slice[loop]=new Image();
   slice[loop].src=img['url'];
   slice[loop]['position']=Position.positionedOffset(img['obj']);
  }
  
  // Remove the img array from memory.
  delete img;
  
  // Draw each image to the canvas.
  for(loop=0;loop<slice.length;loop++)
  {
   ctx.drawImage(slice[loop],slice[loop]['position'][0],slice[loop]['position'][1]);
   // Removing data from memory as we go.
   delete slice[loop];
  }
  
  // Hopefully remove as much as possible from memory before finishing.
  delete slice;
  
  // Remove the listener so it has no chance of firing again even when navigating history.
  opera.removeEventListener('AfterEvent.load',hijackImages,false);  
  
  document.write('<html><head><link rel="stylesheet" media="screen,projection,tv,handheld" href="opera:style/image.css"/></head><body><div><img src="'+c.toDataURL('image/jpeg',1)+'"/></div></body></html>');
  
  // Fire J. King's imagesizer if available.
  if(userJS.imgSizer)
   userJS.imgSizer.init();
 }
}

opera.addEventListener('AfterEvent.DOMContentLoaded',function(ev)
{
 // Remove the preset events for #ZoomImage and #ZoomHoverDiv then reconstruct them.
 var zoomImg=$('ZoomImage');
 var zoomHoverDiv=$('ZoomHoverDiv');
 
 if(zoomImg && zoomHoverDiv)
 {
  zoomImg.stopObserving('click');
  zoomHoverDiv.stopObserving('click');
  zoomImg.addEventListener('click',hijackZoom,false);
  zoomHoverDiv.addEventListener('click',hijackZoom,false);
 }
},false);

opera.addEventListener('AfterEvent.load',hijackImages,false);