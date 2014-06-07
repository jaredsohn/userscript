// ==UserScript==
// @name           Detector
// @version        0.3
// @namespace      xeoos.fr
// @author         LudoO
// @description    Detects frameworks and libraries used in current page ; Enhanced with Builtwith.com service ; Now uses JQuery.
// @include        *
// ==/UserScript==

/* Changelog : 
0.1 : creation
0.2 : scope conflict (with google reader)
0.3 : +SWFObject

*/
/* credits go to : WTFramework (powell.matt) : */
/* and original script : http://blog.olicio.us/2008/11/08/wtframework-bookmarklet/ */

var detector = {
  fm:[], 
  jq:'', 
  self: this,
  init: function(){
    loadJQuery(detectWT);
  }
};

function loadJQuery(cb){
  var forceJQuery = true;
  if(forceJQuery || (typeof unsafeWindow.jQuery == 'undefined')) {
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
  }else{
    letsJQuery(); 
  }

  function letsJQuery() {
    detector.jq = unsafeWindow.jQuery;
    //Top frame only
    if (unsafeWindow.parent == unsafeWindow){
      cb.call();
    }
  }
}

function detectJQ(){
  //predetect jquery before load it
  if (unsafeWindow['window'].jQuery) detector.fm.push("jQuery ("+unsafeWindow['window'].jQuery.fn.jquery+")"); 
}

function detectWT(){
    addGlobalStyle(  
    "#__wtframework #__wtclose  {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:transparent url('http://digitarald.de/project/remooz/1-0/assets/closebox.png') no-repeat scroll center center;border:0 none;cursor:pointer;height:30px;left:-15px;position:absolute;text-decoration:none;top:-15px;width:30px;}"+
    ".__bwwaiting { background:transparent url('http://extjs.com/deploy/dev/resources/images/default/grid/wait.gif') no-repeat scroll center center;} "+
    "#__wtfh {visible:hidden; display:none; top:-10000px; left:-10000px;} "+
    "#__wtframework{border: 2px solid rgb(255, 255, 255); padding: 7px 10px; background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0.7; position: fixed; z-index: 99999; top: 15px; right: 20px; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: rgb(255, 255, 255); text-decoration: none; text-align: left; font-family: Lucida Grande,Helvetica,Tahoma; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; -moz-border-radius-topleft: 5px; -moz-border-radius-topright: 5px; -moz-border-radius-bottomright: 5px; -moz-border-radius-bottomleft: 5px; -moz-box-shadow: 0px 0px 20px rgb(0, 0, 0);} "+
    "#__wtframework a:link {color:#ccccff; background-color:transparent; text-decoration:none; font-weight:bold;} "
    );


    if (unsafeWindow['window'].MooTools) detector.fm.push("MooTools ("+unsafeWindow['window'].MooTools.version+")");
    if (unsafeWindow['window'].Jx) detector.fm.push("Jx");
    if (unsafeWindow['window'].YAHOO) detector.fm.push("YUI ("+unsafeWindow['window'].YAHOO.util.Dom.VERSION+")");
    if (unsafeWindow['window'].Prototype && unsafeWindow['window'].Scriptaculous) detector.fm.push("Prototype ("+unsafeWindow['window'].Prototype.Version+") & Script.aculo.us ("+unsafeWindow['window'].Scriptaculous.Version+")")
    else{
      if (unsafeWindow['window'].Prototype) detector.fm.push("Prototype ("+unsafeWindow['window'].Prototype.Version+") ")
      if (unsafeWindow['window'].Scriptaculous)detector.fm.push("Script.aculo.us ("+unsafeWindow['window'].Scriptaculous.Version+")")
    }
    if (unsafeWindow['window'].dojo) detector.fm.push("Dojo Toolkit ("+unsafeWindow['window'].dojo.version+")");
    if (unsafeWindow['window'].MochiKit) detector.fm.push("MochiKit ("+unsafeWindow['window'].MochiKit.MochiKit.VERSION+")");
    if (unsafeWindow['window'].base2) detector.fm.push("Base2 ("+unsafeWindow['window'].base2.version+")");
    if (unsafeWindow['window'].Ext) detector.fm.push("ExtJS ("+unsafeWindow['window'].Ext.version+")");
    if (unsafeWindow['window'].sIFR) detector.fm.push("sIFR ("+unsafeWindow['window'].sIFR.VERSION+")");
    if (unsafeWindow['window'].gaGlobal || unsafeWindow['window']._gat) detector.fm.push("Google Analytics ("+unsafeWindow['window']._gat.lb+")");
    
    if(unsafeWindow['window'].SWFObject) detector.fm.push("SWFObject");
    
    if (detector.fm.length>0) {       
        detector.jq(document.body).append("<div id='__wtframework'><a id='__wtclose' href='#'>&nbsp;</a><div id='__bwa' class='wtclose'></div><a href='javascript:void(0);' id='__bwmore'>Built With...</a><div id='__bwb'>&nbsp;</div></div>");
        detector.jq('#__bwa').html(detector.fm.join("<br/>"));
        
        //detector.jq('#__wtframework').click(function(){detector.jq(this).fadeOut(1000, function(){this.style.display='block'; this.style.visibility='hidden';});});
        //detector.jq('#__wtframework').bind('click', detector.self, killme);
        
        //TODO : Re-show it
        //detector.jq('#__wtframework').mouseenter(function(){detector.jq(this).show();});
        
        detector.jq('#__wtframework').hide().fadeIn(1500).fadeIn(6000); 
        setTimeout(function(){ killme(); }, 10000);
        
        detector.jq('#__wtclose').bind('click', detector.self, killme);
        detector.jq('#__bwmore').bind('click', detector.self, detectBW);
    }

}
function clearLoading(){
  detector.jq('#__bwb').removeClass("__bwwaiting");
}
function removeLinkBW(){
  
  detector.jq('#__bwmore').remove();
}
function killme(){
  detector.jq('#__wtframework').fadeOut(4000).remove(); //hide?
}

function detectBW() {
  detector.jq('#__bwb').addClass("__bwwaiting");

  var urlsite = "http://builtwith.com?";
  //var zones = ["seo", "server", "javascript", "cms", "framework", "feeds", "docinfo", "encoding"];
  var zones = ["javascript", "cms", "framework"];
  var urlb = urlsite + escape(window.location.href);
  window.setTimeout(function() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: urlb,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8'
        },
        onerror: function(res) {
          clearLoading();
        },
        onload: function(res) {
            var fm2=[];
            var h = detector.jq('#__wtfh');
            if (!h || h.length==0){
              h = detector.jq(document.body).append("<div id='__wtfh'></div>");
            }
            detector.jq('#__wtfh').html(res.responseText);

            for(zone in zones){
              var el = detector.jq('#__wtfh').find("a[name='"+zones[zone]+"']").next("fieldset").find("h3");
              if (el){
                detector.jq(el).find("a").each(function(){
                  var value = detector.jq(this).text();
                  if (value){
                    fm2.push(value);
                  }
                });
              }
            }
            
            clearLoading();
            
            if (fm2.length>1){
              detector.jq("#__bwb").append("<br/>").append(fm2.join("<br/>"));
            }
            
            removeLinkBW();
            
        }
    });
  }, 0);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

detector.init();