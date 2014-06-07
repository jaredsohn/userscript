// ==UserScript==
// @name           Facebook Demourner
// @description    Usuwa wszystkie posty związane z prezydentem / żałobą
// @version        0.1
// @include        http://facebook.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==

(function(){
  
var contentarea = document.getElementById('contentCol');

if (contentarea) {
  
  var hide = function() {
  
    var textnodes, node, s;
    textnodes = document.evaluate("//text()", contentarea, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var filterString = function(str) {
      var r = false;
      if (s.match(/pre[sz][iy]den|\bL\.?K.?\b|\blech\b|kaczy[nń]ski|[śs]mier[cć]|[zż]a[lł]ob|wawel|\bofiar|tupolew|katastrof|polit[iy][ck]/i)) {
        r = true;
      }
      
      return r;
    };

    var hideElement = function(el) {
      el.style.display = 'none';
      // el.style.opacity = '0.3';
    };

    for (var i = 0; i < textnodes.snapshotLength; i++) {
      
    	node = textnodes.snapshotItem(i);
    	s = node.data;
    	if (filterString(s)) {
    	  function isBody(el) {
    	    return ( (el.nodeType === 1) && (el.nodeName.toLowerCase() === 'body') ) ? true : false;
    	  }
    	  var parent = node.parentNode;
        if (node.parentNode.nodeName.toLowerCase() !== 'script') {
          while (parent && !isBody(parent)) {
            parent = parent.parentNode;        
            if ( (parent.nodeType === 1) && parent.className && (parent.className.indexOf('uiStreamStory') > -1) ) {
      	      hideElement(parent);
      	      break;
      	    }        
          }      
        }

      } 
    }	
  
  };

  hide();
  contentarea.addEventListener('DOMSubtreeModified', hide, false);

}

})();