// ==UserScript==
// @name           Baidu Auto Pager
// @namespace      http://www.QuChao.com/baidu-auto-pager
// @author         Chappell.Wat <Chappell.Wat@Gmail.com>
// @include        http://www.baidu.com/*
// @version        1.2
// @description Add autoloading for next page to Baidu search result. Double Click to enable/disable it.
// ==/UserScript==

// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html

// ver 1.0 @ 2007-6-2
//  experimental release
//	the first version is modified from ma.la's GoogleAutoPager.
// ver 1.1 @ 2007-7-21
//  fixed some bugs
//  added page number
// ver 1.2 @ 2007-7-23
//  copyrights removed

(function(){
  
  // <Configuration>
  //
  // Change the following "true" to "false" if you don't want to enable it automatically.
  var BAIDU_AUTO_PAGER_DEFAULT_ENABLE = true;
  //
  // </Configuration>
  
  var base = "http://"+location.host+"/s";
  var offset;
  var num;
  var query;
  var page = 2;
  var insertPoint;
  var Enable = BAIDU_AUTO_PAGER_DEFAULT_ENABLE ? 1 : -1;
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
      var start = v.indexOf("<DIV id=ScriptDiv></DIV>\r\n</td></tr></table>");
      var end = v.indexOf("<br clear=all>");
      if(v.indexOf("</font></a></div><br>") == -1){
        end_flag = 1;
      }
      var head = "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='0' class='bi'><tr><td nowrap>&nbsp;&nbsp;&nbsp;Page "+page+"</td></tr></table>";
      v = v.slice(start,end);
      var div = document.createElement("div");
      div.innerHTML = head + v;
      insertPoint.parentNode.insertBefore(div,insertPoint);
      set_links_target();
      window.status = "Loading ... " + offset +" - " + (offset+num) + " Done.";
      if(!end_flag){
        offset += num;
		page ++;
      }
    }
    try{
      try{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.setRequestHeader("Content-Type","text/xml");
        xmlhttp.setRequestHeader("Content-Type","gb2312");
      }catch(e){
        xmlhttp = new XMLHttpRequest();
		xmlhttp.overrideMimeType('text/xml; charset=gb2312');
      }
      xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4) on_load(xmlhttp.responseText);
      };
     xmlhttp.open("GET", base+query.replace(/pn=\d*/,"pn="+offset), true);
      window.status = "loading ... " + offset +" - " + (offset+num);
      xmlhttp.send(null);
    }catch (e){
      GM_xmlhttpRequest({
        method:"GET",
        url:base + query.replace(/pn=\d*/,"pn=" + offset),
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
      if(div[i].className == "p"){
        insertPoint = div[i];
		var links = insertPoint.getElementsByTagName('a');
		var llen = links.length;
		var next = links[llen-1];
		var href = next.href;
		query = href.substr(href.indexOf("?"));
		offset = (query.match(/pn=(\d*)/))[1] - 0;
		var tmp = query.match(/rn=(\d*)/);
		num = tmp?tmp[1]-0:10;
      }
    }
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
