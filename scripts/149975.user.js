// ==UserScript==
// @name           imgureddit
// @namespace      mario
// @description    Appends the correct extension to imgur URLs submitted to news24
// @include        http://www.news24.co.za/*

// ==/UserScript==

(function(){
  
  var hashRe = /imgur.com\/([^.]+)(\..+)?$/;
  
  var typeRe = /image\/(.+)$/;
  
  var forEach = function(path, f){
    
    var xpr = document.evaluate(path, document, null, 
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; item = xpr.snapshotItem(i); i++){
      f(item, i);
    }
    
  };
  
  return {
    
    go: function(){
      
      forEach("//a[contains(@href, 'imgur.com')]", function(n, i){
        
        var href = n.href.replace('gallery/', '');
        var groups = hashRe.exec(href);
        if(groups && !groups[2]){
          
          GM_xmlhttpRequest({ 
            method: 'GET', 
            url: 'http://imgur.com/api/stats/' + groups[1] + '.xml',
            onload: function(response) {
              
              var parser = new DOMParser();
              var xml = parser.parseFromString(response.responseText, "application/xml");
              var type = xml.getElementsByTagName('type')[0].textContent;
              var ext = typeRe.exec(type);
              if(ext){
                n.href = href + '.' + ext[1];
                GM_log(n.href + ' by imgurnews24');
              }
                
            }
            
          });
          
        }
        
      });
      
    }
      
  }
    
})().go();