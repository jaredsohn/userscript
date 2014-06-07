// ==UserScript==
// @name       GR-ReloadInterval-changer
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  My first example script - sets the GayRomeo-ReloadInterval
// @match      *://*.gayromeo.com/
// @match      *://*.planetromeo.com/
// @match      *://83.98.143.20/
// @copyright  2012+, You
// ==/UserScript==
//if (location.pathname == "/") {
/*    

Function.prototype.TryCatchWrap: function() {
    var __method = this;
    return function() {
    		try { __method.apply(this, arguments) } catch(ex) { ErrorHandler.Exception(ex); }
    }
  }
*/
// Install
    old_changeReloadInterval = top.changeReloadInterval;
    top.changeReloadInterval = mychangeReloadInterval;
    
    var ReloadInterval_new;
    function mychangeReloadInterval(i) {
        
     // We'll work with seconds  
        if (i < 1000)
            i /= 1000;
        
        if (ReloadInterval_new)
            i = ReloadInterval_new;
        else {
         // ReloadInterval_new is undefined so => do init
            ReloadInterval_new = i;
            
         // Click handler   
            Get_ReloadAnchor_TitleElement().addEventListener("click", cb_Set_ReloadInterval, false);
        }    
      
        
        TitleText =  "ReloadInterval: " + i;
        Set_ReloadAnchor_Title(TitleText); 
        
        old_changeReloadInterval(i);
    }
    
    function Get_ReloadAnchor_TitleElement() {
        
        FrameUnten = top.frames.frames.unten.frameElement;
        ReloadAnchor_Title = FrameUnten.contentDocument.getElementsByClassName("reloadIcon");
        return ReloadAnchor_Title[0];
        
    }
    
    function Set_ReloadAnchor_Title(TitleText) {
        Get_ReloadAnchor_TitleElement().setAttribute("Title", TitleText);
        
    }
    
    function cb_Set_ReloadInterval() {
        
        ReloadInterval_new = 
            prompt("New ReloadInterval (in Sec's); ", (ReloadInterval_new) );
        
    }
//}