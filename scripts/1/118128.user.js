// ==UserScript==
// @name          PPS test
// @namespace     andrewsokolov_pps
// @description	  Page Performance Score Test
// @author        Andrew Sokolov
// @homepage      http://andrewsokolov.com/
// @include       http://traveo.lc/*
// ==/UserScript==


var GM_log = function(){}; 

if(unsafeWindow.console){
GM_log = unsafeWindow.console.log;
}

window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};

var timing = performance.timing || {};
var navigation = performance.navigation || {};

timing.legacyNavigationStart = new Date().getTime();

function getTiming(timingStr) {
  if (!timing) return 0;
  return timing[timingStr];
}

function getStartTiming() {
  return getTiming('navigationStart');
}

function getEndTiming() {
  return getTiming('loadEventEnd');
}

function getDelta(startTimingStr, endTimingStr) {
  var begin = getTiming(startTimingStr);
  var end = getTiming(endTimingStr);
  if (!begin || !end) return "n/a";
  return (end - begin) + "ms";
}


function logTiming(timingStr) {
  if (timing) {
    var absTiming = getTiming(timingStr);
    var deltaTiming = getDelta('navigationStart', timingStr);
    GM_log(timingStr, absTiming + ' ' + deltaTiming);
  }
}

 var metrics = new Object();
 
 metrics.timer = now(); 
 metrics.iframes = document.getElementsByTagName('iframe');  
 metrics.links = document.getElementsByTagName('link');
 metrics.scripts = document.getElementsByTagName('script');  
 metrics.imgs = document.body.getElementsByTagName('img'); 
 
 metrics.ajax_calls = 0;
 metrics.is_ajax = 0;
 metrics.e_ajax = 0;
 
 metrics.ajax_load_time = 0;
 metrics.iframe_load_time = 0;
 metrics.image_load_time = 0;
 
 metrics.s_iframes = 0;
 metrics.s_links = 0;
 metrics.s_images = 0;
 metrics.e_imgs = [];
 
  
 metrics.ajax_good_time = 200;
 metrics.page_good_time = 1500;
 
 metrics.check_dom_load = setTimeout(checkDomLoad,15000);
 
 for (i=0; i<metrics.iframes.length; i++){
     iframe = metrics.iframes[i];    
     if (iframe.getAttribute('src') != "") {
         iframe.addEventListener('load', function (e)
         {            
            GM_log('iframe '+this.getAttribute('src')+" loaded in "+(now()-metrics.timer)+" ms");         
            metrics.s_iframes++;
            metrics.iframe_load_time += (now()-metrics.timer);
         }, 'false');
     }     
 }
 
 metrics.css = [];
 
 for (i=0; i<metrics.links.length; i++){
      lnk = metrics.links[i];    
      if (lnk.getAttribute('rel') == 'stylesheet') {
          CSSload(lnk, function(){
            metrics.s_links++;
          });  
          metrics.css.push(lnk);
      } 
 }
 
 metrics.links = metrics.css;
 
 for (i=0; i<metrics.imgs.length; i++) {
     img = metrics.imgs[i];   
     img.addEventListener('load', function (e)
     {             
       metrics.image_load_time += now() - timing.domContentLoadedEventEnd;      
     }, 'false');
 }
    
window.addEventListener('load', function(event) {      

   writeTiming();        
   
}, 'false');

function writeTiming() {
    
  if (!timing.loadEventEnd) {
      setTimeout(writeTiming, 100);
      return;
  }
  
  if (timing.loadEventEnd > 0) {
      metrics.page_load_time = timing.loadEventEnd - timing.navigationStart;
      metrics.dom_load_time = timing.domComplete - timing.domLoading;  
      GM_log("DOM load time "+metrics.dom_load_time);  
      GM_log("Page load time "+metrics.page_load_time);      
  }      
  
  pps_test();  
}

function checkDomLoad(){
    if (timing.loadEventEnd == 0) {
        GM_log('Page load very slow. Page not loaded. Wait 5s more..');
        metrics.check_dom_load = setTimeout(checkDomLoad,5000);
    } else {
        clearTimeout(metrics.check_dom_load);
    }
}

function pps_test() {
    if (metrics.is_ajax) {
       setTimeout(pps_test,100);
    } else {
       
       pps_time = metrics.page_load_time;     
       
       checkImages();
        
       metrics.iframe_result = 'iframe count '+metrics.iframes.length+'. ';
   
       if (metrics.iframes.length > metrics.s_iframes) {
           metrics.iframe_result +=  (metrics.iframes.length - metrics.s_iframes)+" with errors."
       }
       
       if (metrics.s_iframes > 0) {
           GM_log('average iframe load time is '+(metrics.iframe_load_time/metrics.s_iframes)+"ms");
       }

       GM_log(metrics.iframe_result);

       metrics.link_result = 'css count '+metrics.links.length+'. ';

       if (metrics.links.length > metrics.s_links) {
           metrics.link_result +=  (metrics.links.length - metrics.s_links)+" not loaded."
       }

       GM_log(metrics.link_result);
       
       metrics.ajax_result = 'ajax calls count '+metrics.ajax_calls+'. ';
       
       if (metrics.e_ajax) {
           metrics.ajax_result +=  metrics.e_ajax+" ajax calls failed."
       }
       
       GM_log(metrics.ajax_result);
       
       if (metrics.ajax_calls) {
           GM_log('average ajax call time is '+(metrics.ajax_load_time/metrics.ajax_calls)+"ms");
       }
       
       pps = 0;
       
       i = 0;
       
       metrics.result = {}
       
       if (metrics.iframes.length) {
           i++;
           metrics.result.iframe_pps = (metrics.s_iframes/metrics.iframes.length);
           pps += metrics.result.iframe_pps;
       }
       
       if (metrics.links.length) {
           i++;
           metrics.result.links_pps = (metrics.s_links/metrics.links.length);
           pps += metrics.result.links_pps;
       }
       
       if (metrics.imgs.length) {
           i++;
           metrics.result.imgs_pps = (metrics.imgs.length-metrics.e_imgs.length)/metrics.imgs.length;
           pps += metrics.result.imgs_pps;
       }
       
       if (metrics.ajax_calls) {
           i++;
           metrics.result.ajax_pps = (metrics.ajax_calls-metrics.e_ajax)/metrics.ajax_calls;
           pps += metrics.result.ajax_pps;
       }          
       
       /* add ajax time load to score */
       if (metrics.ajax_load_time/(metrics.ajax_calls-metrics.e_ajax) > metrics.ajax_good_time) {
           i++;
           metrics.result.ajax_load_time_pps = metrics.ajax_good_time/(metrics.ajax_load_time/(metrics.ajax_calls-metrics.e_ajax));
           pps += metrics.result.ajax_load_time_pps;
       }
       
       /* add iframe time load to score */
       if (metrics.iframe_load_time/metrics.s_iframes > metrics.page_good_time) {
           i++;
           metrics.result.iframe_load_time_pps = metrics.page_good_time/(metrics.iframe_load_time/metrics.s_iframes);
           pps += metrics.result.iframe_load_time_pps;
       }
       
       /* add page time load to score */
       if (metrics.page_load_time > metrics.page_good_time) {
           i++;
           metrics.result.page_load_time_pps = metrics.page_good_time/metrics.page_load_time;
           pps += metrics.result.page_load_time_pps;
       }
       
       if (i > 0) {
         pps = pps/i*100;
       } else {
         pps = 100; 
       } 

       metrics.pps = pps;
       metrics.location = document.location.href;
       
       GM_log('Page Performance Score is '+(metrics.pps.toFixed(2))+'% for '+metrics.location);
       
       //GM_log(metrics.result)
       
    }
}

function IsImageOk(img) {

    if (!img.complete) {
    return false;
    }

    if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
    return false;
    }
    
    return true;
}

function checkImages() {    
    
    for (var i = 0; i <  metrics.imgs.length; i++) {
        if (!IsImageOk( metrics.imgs[i])) {    
            metrics.e_imgs.push(metrics.imgs[i]);           
        }
    }
    
    var result = 'Image count '+ metrics.imgs.length+". ";
    
    if (metrics.e_imgs.length > 0){
        result += metrics.e_imgs.length + " with errors.";
        
    } else {
        result += "Without errors.";
    }
    
    GM_log(result)
    
    for (i=0; i<metrics.e_imgs.length; i++) {
            GM_log(metrics.e_imgs[i]);
    }  
    
    if (metrics.imgs.length >= (metrics.imgs.length-metrics.e_imgs) && metrics.imgs.length != 0) {
         GM_log('average image load time is '+(metrics.image_load_time/(metrics.imgs.length-metrics.e_imgs)).toFixed(2)+"ms");
    }
    
}


function CSSload(link, callback) {
    var cssLoaded = false;
    try{      
        if ( link.sheet && link.sheet.cssRules.length > 0 ){
            cssLoaded = true;
        }else if ( link.styleSheet && link.styleSheet.cssText.length > 0 ){
            cssLoaded = true;
        }else if ( link.innerHTML && link.innerHTML.length > 0 ){
            cssLoaded = true;
        }
    }
    catch(ex){ }
    if ( cssLoaded ){
        callback();
    }else{
        setTimeout(function(){
           CSSload(link);
        }, 100);
    } 
}

metrics.ajax_timer = [];
var xhr = unsafeWindow.XMLHttpRequest;
var s_ajaxListener = new Object();
s_ajaxListener.tempOpen = xhr.prototype.open;
s_ajaxListener.tempSend = xhr.prototype.send;


function now() {
    var currentTime = new Date();
    return currentTime.getTime();
}

var startListenAjax = function () {
    
    xhr.prototype.uniqueID = function() {  
        if (!this.uniqueIDMemo) {
            this.uniqueIDMemo = Math.floor(Math.random() * 1000);
        }
        return this.uniqueIDMemo;
    }
    xhr.prototype.resetUniqueID = function() {          
        this.uniqueIDMemo = false;      
    }
    
    xhr.prototype.open = function(method, url, async, user, password) {
        metrics.ajax_calls++;
        metrics.is_ajax++;       
        GM_log("[" + xhr.prototype.uniqueID() + "] ajax open (" + 
                    method + " , " + 
                    url + " , " + 
                    async + " , " + 
                    user + " , " + 
                    password + ")");
        
        s_ajaxListener.tempOpen.apply(this, arguments);
    };
    
    xhr.prototype.send = function(a) {
        metrics.ajax_timer[xhr.prototype.uniqueID] = now();
        id = xhr.prototype.uniqueID();
        GM_log("[" + xhr.prototype.uniqueID() + "] ajax call send (" + a + ")");
        var _xhr = this;    
        var onload = function() {         
            metrics.is_ajax--;            
            time = (now() - metrics.ajax_timer[xhr.prototype.uniqueID]);                
            metrics.ajax_load_time += time;
            GM_log("[" + id + "] ajax call load time: " + time + " ms, status: " +  _xhr.status)   //_xhr.responseText); 
            xhr.prototype.resetUniqueID();
        };
        
        var onerror = function() { 
            metrics.e_ajax++;
            time = (now() - metrics.ajax_timer[xhr.prototype.uniqueID]);                
            metrics.ajax_load_time += time;
            GM_log("[" + id + "] ajax call load time with error: " + 
                    _xhr.status); 
            xhr.prototype.resetUniqueID();    
        };
        
        this.addEventListener("load", onload, false);
        this.addEventListener("error", onerror, false);
        
        s_ajaxListener.tempSend.apply(this, arguments);    
    }
}

startListenAjax(); 