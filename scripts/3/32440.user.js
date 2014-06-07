// ==UserScript==
// @name           Wikipedia related pages
// @namespace      http://ruido-blanco.net/
// @description    Adds a related pages box to the sidebar (uses http://pedia.directededge.com API)
// @include        http://*.wikipedia.org/wiki/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Daniel Rodríguez Troitiño <notzcoolx@yahoo.es>
// ==/UserScript==

;(function() { jQuery(function() {
  var wgPageName = unsafeWindow.wgPageName;
  var wgServer = unsafeWindow.wgServer;
  var wgArticlePath = unsafeWindow.wgArticlePath;
  
  if (wgPageName.indexOf(':') >= 0) return;
  
  var json_url = "http://pedia.directededge.com/api.fcgi" +
    "?format=json&topic=" + escape(wgPageName)
  
  var addRelatedArticlesBox = function(json) {
    var search = jQuery('#p-search');
    
    if (!search) return;
    
    var related = jQuery('<div>');
    related.addClass('portlet');
    related.insertBefore(search);
    
    var label = jQuery('<h5>related articles</h5>');
    related.append(label);
    
    var pBody = jQuery('<div>');
    pBody.addClass('pBody');
    related.append(pBody);
    
    var list = jQuery('<ul>');
    pBody.append(list);
    
    var prefix = wgServer + wgArticlePath;
    
    titles = eval(json);
    for(var idx = 0; idx < titles.length; idx++) {
      var li = jQuery('<li>');
      list.append(li);
      
      var link = jQuery('<a>' + titles[idx] + '</a>');
      li.append(link);
      
      link.attr('href', prefix.replace('$1', escape(titles[idx])));
    }
  };
  
  var jsonOnReadyStateChange = function(response) {
    if (response.readyState == 4 && response.status) {
      addRelatedArticlesBox(response.responseText);
    }
  };
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: json_url,
    onreadystatechange: jsonOnReadyStateChange
    });
})})();