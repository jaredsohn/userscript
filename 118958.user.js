// ==UserScript== 
// @name		IndianExpress epaper +
// @description	cleans up http://epaper.indianexpress.com and adds hotkeys for navigation and zooming 
// @namespace	
// @clutter 	free indian express epaper 
// @include		http://epaper.indianexpress.com/*
// @version		1.3 
// ==/UserScript==



var f = document.querySelectorAll('div[id^="de-page-container"]'); 
for(i = 0; i < f.length; i++){
    f[i].style.height = '830px';
}
var f = document.querySelectorAll('div[id^="de-top-banner"]'); 
for(i = 0; i < f.length; i++){
    f[i].parentNode.removeChild(f[i]);
}
var f = document.querySelectorAll('div[id^="de-top-ad"]'); 
for(i = 0; i < f.length; i++){
    f[i].parentNode.removeChild(f[i]);
}
var f = document.querySelectorAll('div[id^="de-page-toolbox"]'); 
for(i = 0; i < f.length; i++){
    f[i].parentNode.removeChild(f[i]);
}
var f = document.querySelectorAll('div[id^="de-side-ad"]'); 
for(i = 0; i < f.length; i++){
    f[i].parentNode.removeChild(f[i]);
}
var f = document.querySelectorAll('div[id^="de-bottom-ad"]'); 
for(i = 0; i < f.length; i++){
    f[i].parentNode.removeChild(f[i]);
}
var f = document.querySelectorAll('div[id^="de-header"]'); 
for(i = 0; i < f.length; i++){
    f[i].style.display = 'none';
}
var f = document.querySelectorAll('div[id^="de-footer"]'); 
for(i = 0; i < f.length; i++){
    f[i].parentNode.removeChild(f[i]);
}


	
//var bb = document.querySelectorAll('.de-top-ad');
//for(var i = 1; i < bb.length; i++){
    //bb[i].parentNode.removeChild(bb[i]);
	//}






(function(){
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 40 && !e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
   location.href = "javascript:function zoomOut(){if(Number(DE.zoom) > 1){window.location.hash = DE.mode+'/'+DE.page+'/'+1;}};zoomOut();";
  }
}, false);
})();

(function(){
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 38 && !e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
   location.href = "javascript:function zoomIn(){if(Number(DE.zoom) < Number(DE.zooms)){window.location.hash = DE.mode+'/'+DE.page+'/'+(Number(DE.zoom)+1)}};zoomIn();";
  }
}, false);
})();

(function(){
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 39 && !e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
  
  
      location.href = "javascript:(" + function() {//following code is run as a string
	  if(Number(DE.zoom) > 1){ 
							  function nextPage(){
								if (DE.mode=='page'){
									var nextP = Number(DE.page) + 1;
								}else{
									if (DE.page==1){
										var nextP = Number(DE.page) + 1;
									}else{
										var nextP = Number(DE.page) + 2;
									}
								}
								if(nextP > DEConfig.numPages) {
									if (DEConfig.numPages%2==0)
										var nextP = DEConfig.numPages;
									else if (de.mode=='dual')
										var nextP = DEConfig.numPages-1;
								}
								window.location.hash = DE.mode+'/'+nextP+'/'+DE.zoom;
							};nextPage()
												} 
   
  }+ ")()";//till here
  }
}, false);
})();

(function(){
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 37 && !e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
  
  
   location.href = "javascript:(" + function() {//following code is run as a string
   if(Number(DE.zoom) > 1){ 
							   function prevPage(){
								if (DE.mode=='page'){
									var prevP = Number(DE.page) - 1;
								}else{
									var prevP = Number(DE.page) - 2;
								}
								  if(prevP < 1) {
									var prevP = 1;
								  }
								  window.location.hash = DE.mode+'/'+prevP+'/'+DE.zoom;
							};prevPage()
												} 
   
  }+ ")()";//till here
  }
}, false);
})();

(function(){
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 83 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
   location.href = "javascript:function zoomOut(){if(Number(DE.zoom) > 1){window.location.hash = DE.mode+'/'+DE.page+'/'+1;}};zoomOut();";
  }
}, false);
})();

(function(){
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 87 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
   location.href = "javascript:function zoomIn(){if(Number(DE.zoom) < Number(DE.zooms)){window.location.hash = DE.mode+'/'+DE.page+'/'+(Number(DE.zoom)+1)}};zoomIn();";
  }
}, false);
})();

(function(){
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 68 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
  
  
   location.href = "javascript:(" + function() {//following code is run as a string
							  function nextPage(){
								if (DE.mode=='page'){
									var nextP = Number(DE.page) + 1;
								}else{
									if (DE.page==1){
										var nextP = Number(DE.page) + 1;
									}else{
										var nextP = Number(DE.page) + 2;
									}
								}
								if(nextP > DEConfig.numPages) {
									if (DEConfig.numPages%2==0)
										var nextP = DEConfig.numPages;
									else if (de.mode=='dual')
										var nextP = DEConfig.numPages-1;
								}
								window.location.hash = DE.mode+'/'+nextP+'/'+DE.zoom;
							};nextPage()
												} + ")()";
   }
  
}, false);
})();

(function(){
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 65 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
  
   location.href = "javascript:(" + function() {//following code is run as a string
							   function prevPage(){
								if (DE.mode=='page'){
									var prevP = Number(DE.page) - 1;
								}else{
									var prevP = Number(DE.page) - 2;
								}
								  if(prevP < 1) {
									var prevP = 1;
								  }
								  window.location.hash = DE.mode+'/'+prevP+'/'+DE.zoom;
							};prevPage()
												} + ")()";//till here
   
  }
}, false);
})();

(function() {
document.addEventListener("DOMSubtreeModified", function(){


var ff = document.querySelectorAll('div[id^="uvTab"]');
for(i = 0; i < ff.length; i++){;
ff[i].style.display = 'none';
};
var f = document.querySelectorAll('div[id^="de-page-container"]'); 
for(i = 0; i < f.length; i++){
var h = window.screen.height+62;
var h2 = h.toString()
var h3 = h2+'px'
    f[i].style.height = h3;
}

}, false);





})();


	

//(function(){
//location.href = "javascript:var ff = document.querySelectorAll('div[id^=\"uvTab\"]'); for(i = 0; i < //ff.length; i++){; ff[i].parentNode.removeChild(ff[i]);};";
//})();


//a[i].style.display = 'none';

//window.onload = function (){
//var ff = document.querySelectorAll('div[id^="uvTab"]'); 
//for(i = 0; i < ff.length; i++){
   // ff[i].parentNode.removeChild(ff[i]);
//}
//}