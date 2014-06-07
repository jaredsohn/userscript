// ==UserScript==
// @name Image-links Previewer, saves your precious time
// @match http://*/*
// @match https://*/*
// ==/UserScript==

/*
Use this user script - don't waste time on opening *.jpg *.gif etc links, PREVIEW them!

to check execute it in console on e.g. https://twitter.com/i/#!/search/?q=imgur&src=typd
enjoy
*/
setInterval(function(){
(function(){
var list = document.getElementsByTagName('a');
var reg = /\.(jpg|jpeg|gif|png|ico)\s*$/i;

for(var i=0,size=list.length;i<size;i++){
  var node = list[i];
  var tooltip = false;

  if(reg.test(node.href)){
    tooltip = 'href';
  }else{
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
        if(image.width > 500) image.style['width']='500px'
        image.style['z-index'] = 999999; 
        image.style['position'] = 'fixed';  

        image.style['top'] = '0px';
        image.style[
          (e.clientX < document.body.clientWidth/2) ? 'right' : 'left'
         ] = '0px'; 

        document.body.appendChild(image);
        node.onmouseout = function(){
          document.body.removeChild(image);
        }
      };
    })(tooltip);
  }
}

})();
}, 1000);