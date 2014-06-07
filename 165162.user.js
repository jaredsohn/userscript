// ==UserScript==
// @name       Inject AppDynamics JS agent
// @namespace  http://www.appdynamics.com/
// @version    0.1
// @description  Enable this to test the AppDynamics JS agent on arbitarary websites.
// @match      http://*/*
// @match      https://*/*
// ==/UserScript==
  
(function() {
    if (window["adrum-loaded-tampermonkey-script"])
        return;    
    window["adrum-loaded-tampermonkey-script"] = true;
    window["adrum-start-time"] = new Date().getTime();
     
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.async = true;
    js.src = "http://perf02.saas.appdynamics.com:9999/min/adrum.js";
    var s = document.getElementsByTagName("script")[0];
    if (s)
        s.parentNode.insertBefore(js, s);

    var js1 = document.createElement("script");
    js1.type = "text/javascript";
    js1.async = true;
    js1.innerHTML = 'ADRUM.appKey="AD-AAB-AVR"';
    var s = document.getElementsByTagName("script")[1];
    if (s)
        s.parentNode.insertBefore(js1, s);
   

})();