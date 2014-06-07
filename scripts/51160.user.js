// ==UserScript==
// @name           GoogleAutoPager by Mohit
// @namespace      MOhit
// @author         Mohit
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

(function(){
  
  // <Configuration>
  //
  // Change the following "true" to "false" if you don't want to enable it automatically.
  var GOOGLE_AUTO_PAGER_DEFAULT_ENABLE = true;
  //
  // </Configuration>
  
  var base = "http://"+location.host+"/search";
  var offset;
  var num;
  var query;
  var insertPoint;
  var Enable = GOOGLE_AUTO_PAGER_DEFAULT_ENABLE ? 1 : -1;
  var watch_scroll = function(){
    try{
      var sc = document.body.scrollTop;
      var wh = window.innerHeight ? window.innerHeight : document.body.clientHeight;
      var total = (document.body.scrollHeight - wh);
      var remain = total - sc;
      // window.status = remain;
      if(remain < 500 && Enable == 1){
        do_request()
      }
    }catch(e){
    
    }
    var self = arguments.callee;
    setTimeout(self,100);
  };
  
  var do_request = function(){
    if(this.requested == offset){return}
    this.requested = offset;
    var xmlhttp;
    var on_load = function(v){
      var end_flag = 0;
      var head_start = v.indexOf('<table border=0 cellpadding=0 cellspacing=0 width=100% class="t bt">');
      var head_end = v.indexOf("</table>",head_start) + "</table>".length;
      var start = v.indexOf("<div class=g>");
      var end = v.indexOf("<div id=navbar class=n>");
      if(v.indexOf("<div id=nn>") == -1){
        end_flag = 1;
      }
      //unsafeWindow.console.log([head_start, head_end, start, end]);
      var head = v.slice(head_start,head_end);
      v = v.slice(start,end);
      var div = document.createElement("div");
      div.innerHTML = head + v;
      insertPoint.parentNode.insertBefore(div,insertPoint);
      set_links_target();
      window.status = "loading ... " + offset +" - " + (offset+num) + " done.";
      if(!end_flag){
        offset += num;
      }
    }
    try{
      try{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }catch(e){
        xmlhttp = new XMLHttpRequest();
      }
      xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4) on_load(xmlhttp.responseText);
      };
      xmlhttp.open("GET", base+query.replace(/start=\d*/,"start="+offset), true);
      window.status = "loading ... " + offset +" - " + (offset+num);
      xmlhttp.send(null);
    }catch (e){
      GM_xmlhttpRequest({
        method:"GET",
        url:base + query.replace(/start=\d*/,"start=" + offset),
        onload: function(d){ on_load(d.responseText); }
      });
    }
  };
  
  var set_links_target = function() {
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; ++i) {
        links[i].setAttribute('target', '_blank');
    }
  };
  
  var init_autopager = function(){
    var div = document.getElementsByTagName("div");
    var len = div.length;
    for(var i=0;i<len;i++){
      if(div[i].className == "n"){
        insertPoint = div[i];
      }
    }

	  // find <div id="nn"> or nav_next.gif 
    var img = document.images;
    var len = img.length;
    var next = document.getElementById("nn");
    if (!next){
      for(var i=0;i<len;i++){
        if(img[i].src.indexOf("nav_next") != -1){
          next = img[i];
        }
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
