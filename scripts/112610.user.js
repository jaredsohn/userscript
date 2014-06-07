// ==UserScript==
// @name          Remove Facebook right sidebar
// @namespace     Mentha
// @description   Uses CSS to remove advertisements and all content of right sidebar.
// @version       1.0
// @run-at        document-start
// @include       http://*.facebook.com/*
// @include       http://*.apps.facebook.com/*
// ==/UserScript==

(function() {
  function appendStyle(h) {
    var head = h || document.getElementsByTagName('head')[0], 
        style = document.createElement('style');
    if (!head || self.location != top.location) {return}
    style.type = 'text/css';
    style.textContent = '.home_right_column  { display:' +
                    ' none !important; } '+
					'#rightCol { display:' +
                    'none !important; } '+
	                '#contentArea  { width: 760px !important;border:none!important  }' +
					'.uiUfi  { width: 460px !important; }' +
                    '.LSplitView_ContentWithNoLeftColumn, ' +
                    '.FN_feedbackview { width: 100% !important; }';				
    head.appendChild(style);
  }

  function nodeInserted(e) {
    if (e.relatedNode.tagName == "HEAD") {
      document.removeEventListener('DOMNodeInserted', nodeInserted, true);
      appendStyle(e.relatedNode);
    }
  }

  // Url matching for Opera
  if (window.opera && 
      !/http:\/\/.*\.facebook\.com\/.*/.test(window.location.href))
    return;

  // Early injection support
  if (document.body === null)
    document.addEventListener('DOMNodeInserted', nodeInserted, true);
  else
    appendStyle();
})();