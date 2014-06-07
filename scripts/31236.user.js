// ==UserScript==
// @name           GoogleAutoPager
// @namespace      http://ma.la/
// @author         ma.la <timpo@ma.la>
// @include        http://www.google.*/search*
// @description Add autoloading for next page to Google search result. DblClick to enable/disable it. Demo at http://la.ma.la/misc/demo/googleautopager.htm (Working in Trixie and captured by Wink)
// ==/UserScript==

// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html

// ver 0.1 @ 2005-06-23
//  experimental release
// ver 0.2 @ 2005-06-23
//  double click to start.
// ver 0.3 @ 2005-12-02 - modified by beerboy <http://beerboy.org/>
//  convert XMLHttpRequest to GM_xmlhttpRequest.
// ver 0.4 @ 2006-02-04 - modified by Gimite <http://gimite.ddo.jp/>
//  support Opera 8.5.
//  looks better.
//  enable to configure whether automatically enable it.
// ver 0.5 @ 2006-10-22 - modified by Gimite <http://gimite.ddo.jp/>
//  support new HTML of Google search results.
// ver 0.6 @ 2006-11-19 - modified by Gimite <http://gimite.ddo.jp/>
//  support new HTML of Google search results.
// ver 0.7 @ 2006-11-20 - apply patch provided by macaw <http://wildlifesanctuary.blog38.fc2.com/>
//  support Safari 2.0
// ver 0.8 @ 2007-01-14 - modified by Gimite <http://gimite.ddo.jp/>
//  open all links in new tab or window.
// ver 0.9 @ 2008-08-04 - modified by Suiren
//  - support new HTML of Google search results.
//  - merge Gimite's one & Takayama Fumihiko's one
//  - remove "Hatena Bookmark","loading effect","end text". Sorry I don't need
//  - thanks to ALL Developers
// ver 0.9.1 @ 2008-08-18 - modified by Suiren
//  - solution for JavaScript "ManyBox.register".  but, this is a stopgap measures.
//  - remove "ManyBox.register"
// ver 0.9.2 @ 2008-08-21 - modified by Suiren
//  - support new HTML of Google search results.
// ver 0.9.3 @ 2008-08-21 - modified by Suiren
//  - support JavaScript "ManyBox.register"
//  - Fix Bug - " the page turns blank "
// ver 0.9.4 @ 2008-10-27 - modified by Suiren
//  - support new HTML of Google search results.
//  - Code Sniffing

(function(){
  
  // <Configuration>
  //
  // Change the following "true" to "false" if you don't want to enable it automatically.
  var GOOGLE_AUTO_PAGER_DEFAULT_ENABLE = true;
  var IS_OPEN_NEW_TABS = true;
  //
  // </Configuration>
  
  var base = "http://"+location.host+"/search";
  var offset;
  var num;
  var query;
  var insertPoint;
  var Enable = GOOGLE_AUTO_PAGER_DEFAULT_ENABLE ? 1 : -1;  
  
  var Remain = {
    valueOf: function(){
      // Standard Mode / Quirks Mode
      var sc = document.documentElement.scrollTop;
      var wh = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
      var total = (document.body.scrollHeight - wh);
      var remain = total - sc;
      return remain
    }
  };
  
  var watch_scroll = function(){
    if(Remain < 500 && Enable == 1){
      do_request()
    }
    var self = arguments.callee;
    setTimeout(self,100);
  };
  
  var appendSearchResult = function(googleResult) {
    var html = '';
    var isNextExist = false;
    
    var ol = googleResult.getElementsByTagName("ol");
    for (var i = 0; i < ol.length;i++) {
      if (ol[i].className != "nobr") {
        set_links_target(ol[i]);
        html += '<div><ol>' + ol[i].innerHTML + '</ol></div>';
      }
    }
    var span = googleResult.getElementsByTagName("span");
    for (var i = 0;i < span.length;i++) {
      if (span[i].className = "csb ch") {
        isNextExist = true;
      }
    }
    html += addScriptTag(googleResult);
    
    var div = document.createElement('div');
    div.className = "med";
    div.id = "res";
    div.innerHTML = html;
    insertPoint.parentNode.insertBefore(div,insertPoint);
    if (isNextExist) {
      offset += num;
    }
  };
  
  var do_request = function(){
    if (this.requested == offset) {return;}
    var xmlhttp;
    this.requested = offset;
    try{
      try{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }catch(e){
        xmlhttp = new XMLHttpRequest();
      }
      xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4){
          var googleResult = document.createElement('div');
          googleResult.innerHTML += xmlhttp.responseText;
          appendSearchResult(googleResult);
        } 
      };
      xmlhttp.open("GET", base+query.replace(/start=\d*/,"start="+offset), true);
      xmlhttp.send(null);
    }catch (e){
      GM_xmlhttpRequest({
        method:"GET",
        url:base + query.replace(/start=\d*/,"start=" + offset),
        onload:function(details){
          var googleResult = document.createElement('div');
          googleResult.innerHTML += details.responseText;
          appendSearchResult(googleResult);
        }
      });
    }
  };
  
  var set_links_target = function() {
    if (IS_OPEN_NEW_TABS) {
      var links = document.getElementsByTagName('a');
      for (var i = 0; i < links.length; ++i) {
        links[i].setAttribute('target', '_blank');
        links[i].setAttribute('onmousedown', '');
      }
    }
  };
  
  var addScriptTag = function(googleResult) {
    var html = '';
    var scriptTag = googleResult.getElementsByTagName('script');
    for(var i = 1; i<scriptTag.length;i++) {
      html += "<script>" + scriptTag[i].innerHTML + "</script>";
    }
    return html;
  }
  
  var init_autopager = function(){
    insertPoint = document.getElementById("nav");
    
    var span = document.getElementsByTagName("span");
    for (var i=0;i < span.length;i++) {
      if (span[i].className == "csb ch") {
        next = span[i];
      }
    }
    var href = next.parentNode.href;
    query = href.substr(href.indexOf("?"));
    offset = (query.match(/start=(\d*)/))[1] - 0;
    var tmp = query.match(/num=(\d*)/);
    num = tmp?tmp[1]-0:10;
  };

  // init 
  if(window.location.href.indexOf(base) != -1){
    if(document.body.attachEvent){
      document.body.attachEvent(
        'ondblclick',function(){
          Enable *= -1;
          window.status = (Enable==1)?"Enabled":"Disabled"
        }
      );
    }else{
      document.body.addEventListener(
        'dblclick',function(){
          Enable *= -1;
          window.status = (Enable==1)?"Enabled":"Disabled"
        },true
      );
    }
    init_autopager();
    set_links_target();
    watch_scroll();
  }
})();
