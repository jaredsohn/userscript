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
 
 var timer = now(); 
 var dom_loaded = 0; 
 
 var iframes = document.getElementsByTagName('iframe');   
 var links = document.getElementsByTagName('link');
 var scripts = document.getElementsByTagName('script');  
 var imgs = document.body.getElementsByTagName('img'); 
 
 var ajax_calls = 0;
 var is_ajax = 0;
 var e_ajax = 0;
 
 var ajax_load_time = 0;
 var iframe_load_time = 0;
 
 var s_iframes = 0;
 var s_links = 0;
 var s_images = 0;
 var e_imgs = [];
 
 
 var ajax_good_time = 200;
 var page_good_time = 1500;
 
 var check_dom_load = setTimeout(checkDomLoad,15000);
 
 for (i=0; i<iframes.length; i++){
     iframe = iframes[i];    
     if (iframe.getAttribute('src') != "") {
         iframe.addEventListener('load', function (e)
         {            
            GM_log('iframe '+this.getAttribute('src')+" loaded in "+(now()-timer)+" ms");         
            s_iframes++;
            iframe_load_time += (now()-timer);
         }, 'false');
     }     
 }
 
 var css = [];
 
 for (i=0; i<links.length; i++){
      lnk = links[i];       
      if (lnk.getAttribute('rel') == 'stylesheet') {
          CSSload(lnk, function(){
            s_links++;
          });  
          css.push(lnk);
      } 
 }
 
 links = css;
 
 for (i=0; i<imgs.length; i++) {
     img = imgs[i];
     value = 100/imgs.length;
     img.addEventListener('load', function (e)
     {  
         if (dom_loaded >= 100) return;
         dom_loaded += value;
         GM_log(dom_loaded.toFixed(2) +"% DOM loaded");
     }, 'false');
 }
    
window.addEventListener('load', function(event) {
    
   dom_loaded = 100; 
   
   GM_log(100 +"% DOM loaded");  
   
   pps_test();   
   
}, 'false');

function checkDomLoad(){
    if (dom_loaded < 100) {
        GM_log('Page load very slow.. only for '+dom_loaded+'%. Page not loaded. Wait 5s more..');
        check_dom_load = setTimeout(checkDomLoad,5000);
    } else {
        clearTimeout(check_dom_load);
    }
}

function pps_test() {
    if (is_ajax) {
       setTimeout(pps_test,100);
    } else {
       
       pps_time = (now()-timer);
        
       GM_log('PPS time '+pps_time+"ms. Page loaded");      
       
       checkImages();
        
       iframe_result = 'iframe count '+iframes.length+'. ';
   
       if (iframes.length > s_iframes) {
           iframe_result +=  (iframes.length - s_iframes)+" with errors."
       }
       
       if (s_iframes > 0) {
           GM_log('average iframe load time is '+(iframe_load_time/s_iframes)+"ms");
       }

       GM_log(iframe_result);

       link_result = 'css count '+links.length+'. ';

       if (links.length > s_links) {
           link_result +=  (links.length - s_links)+" not loaded."
       }

       GM_log(link_result);
       
       ajax_result = 'ajax calls count '+ajax_calls+'. ';
       
       if (e_ajax) {
           ajax_result +=  e_ajax+" ajax calls failed."
       }
       
       GM_log(ajax_result);
       
       if (ajax_calls) {
           GM_log('average ajax call time is '+(ajax_load_time/ajax_calls)+"ms");
       }
       
       pps = 0;
       
       i = 0;
       
       if (iframes.length) {
           i++;
           pps += (s_iframes/iframes.length);
       }
       
       if (links.length) {
           i++;
           pps += (s_links/links.length);
       }
       
       if (imgs.length) {
           i++;
           pps += (imgs.length-e_imgs.length)/imgs.length;
       }
       
       if (ajax_calls) {
           i++;
           pps += (ajax_calls-e_ajax)/ajax_calls;
       }          
       
       /* add ajax time load to score */
       if (ajax_load_time/(ajax_calls-e_ajax) > ajax_good_time) {
           i++;
           pps += ajax_good_time/(ajax_load_time/(ajax_calls-e_ajax));
       }
       
       /* add iframe time load to score */
       if (iframe_load_time/s_iframes > page_good_time) {
           i++;
           pps += page_good_time/(iframe_load_time/s_iframes);
       }
       
       /* add page time load to score */
       if (pps_time > page_good_time) {
           i++;
           pps += page_good_time/pps_time;
       }
       
       if (i > 0) {
         pps = pps/i*100;
       } else {
         pps = 100; 
       }        
       
       GM_log('Page Performance Score is '+(pps.toFixed(2))+'% for '+document.location.href);
       
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
   
    var e_imgs = [];
    
    for (var i = 0; i < document.images.length; i++) {
        if (!IsImageOk(document.images[i])) {    
            e_imgs.push(document.images[i]);           
        }
    }
    
    var result = 'Image count '+document.images.length+". ";
    
    if (e_imgs.length > 0){
        result += e_imgs.length + " with errors.";
        
    } else {
        result += "Without errors.";
    }
    
    GM_log(result)
    
    for (i=0; i<e_imgs.length; i++) {
            GM_log(e_imgs[i]);
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

var ajax_timer = [];
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
        ajax_calls++;
        is_ajax++;       
        GM_log("[" + xhr.prototype.uniqueID() + "] ajax open (" + 
                    method + " , " + 
                    url + " , " + 
                    async + " , " + 
                    user + " , " + 
                    password + ")");
        
        s_ajaxListener.tempOpen.apply(this, arguments);
    };
    
    xhr.prototype.send = function(a) {
        ajax_timer[xhr.prototype.uniqueID] = now();
        id = xhr.prototype.uniqueID();
        GM_log("[" + xhr.prototype.uniqueID() + "] ajax call send (" + a + ")");
        var _xhr = this;    
        var onload = function() {         
            is_ajax--;            
            time = (now() - ajax_timer[xhr.prototype.uniqueID]);                
            ajax_load_time += time;
            GM_log("[" + id + "] ajax call load time: " + time + " ms, status: " +  _xhr.status)   //_xhr.responseText); 
            xhr.prototype.resetUniqueID();
        };
        
        var onerror = function() { 
            e_ajax++;
            time = (now() - ajax_timer[xhr.prototype.uniqueID]);                
            ajax_load_time += time;
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