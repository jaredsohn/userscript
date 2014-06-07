// ==UserScript==
// @name           more search results
// @namespace      http://userscripts.org/users/164288
// @description    more more
// @include        http://search.yahoo.com/search*
// ==/UserScript==

window.addEventListener("load", function(e) {

  var start = 0;

  var res = document.getElementById('web');
  res.style.cssText += ';overflow-x:visible;';
  var ol = res.getElementsByTagName('ol')[0];
  
  var b = document.createElement('button');
  b.className = 'sbb';
  b.style.cssText = "width: 100%; margin: 10px 0 10px 0;";
  b.innerHTML = '<span id="stoyan-more-label">10 more results...</span><img id="stoyan-more-progress" class="hidden" src="http://a.l.yimg.com/a/i/us/sch/gr4/sp-progress2.gif">';

  b.addEventListener("click", function() {
      var url = 'http://boss.yahooapis.com/ysearch/web/v1/';
      var params = [];
      var query = encodeURIComponent(document.title.replace(" - Yahoo! Search Results", ""));
      start += 10;
      params.push('format=json');
      params.push('callback=STOYAN_MORE_RESULTS');
      params.push('appid=bUUrTUrV34Ft7S4N.8b1C9hoQ7p7XnpGKfGlac4FhDtbNdEDIZzNVp.s64f_A7g-');
      params.push('start=' + start);
      params = "?" + params.join('&');

      var s = document.createElement('script');
      s.src = url + query + params;
      document.documentElement.firstChild.appendChild(s);
      
      document.getElementById('stoyan-more-label').className = "hidden";
      document.getElementById('stoyan-more-progress').className = "";
      
  }, false);
  
  res.appendChild(b);
  var br = document.createElement('br');
  br.style.cssText = "clear: both";
  res.appendChild(br);
  
  var template = '<li><div class="res"><div><h3><a href="{URL}" class="yschttl spt">{TITLE}</a></h3></div><div class="abstr">{ABSTRACT}</div><span class="url">{URL2}</span></div></li>';

  

  unsafeWindow.STOYAN_MORE_RESULTS = function(o) {
      var html = '', tpl;
      var oho = o.ysearchresponse.resultset_web;
      for (var i in oho) {
          html += template.replace("{URL}", oho[i].url).replace("{TITLE}", oho[i].title).replace("{ABSTRACT}", oho[i].abstract).replace("{URL2}", oho[i].dispurl);
      }
      ol.innerHTML += html;
     
      document.getElementById('stoyan-more-label').className = "";
      document.getElementById('stoyan-more-progress').className = "hidden";
     
      
  };


}, false);


