// ==UserScript==
// @name           Google docs - Word Count Improved
// @namespace      http://userscripts.org/users/117199
// @description    Adding a "WC" comment in Google docs will return the word count to the upto the next "WC"
// @include        http://docs.google.com/Doc?docid=*
// @include        http://docs.google.com/Doc?id=*
// @version        11 Nov 2009 v2
// ==/UserScript==
(function (){

  window.updatewccomments = function() {
      function replaceHtmlEntites(s) {
          var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
          var translate = {
              "nbsp": " ", 
              "amp" : "&", 
              "quot": "\"",
              "lt"  : "<", 
              "gt"  : ">"
          };
          return s.replace(translate_re, function(o,i){return translate[i]});
      }

      function getElementsByClass(node,searchClass,tag) {
          var classElements = new Array();
          var els = node.getElementsByTagName(tag);
          var elsLen = els.length;
          var pattern = new RegExp(searchClass);
          for (i = 0, j = 0; i < elsLen; i++) {
              if ( pattern.test(els[i].className) ) {
                  classElements[j] = els[i];
                  j++;
              }
          }
      return classElements;
      }

      textareanode = window.parent.document.getElementById('wys_frame').contentDocument.body;

      text = textareanode.innerHTML.match(/(.*?<span.*?class=\"writely-comment\".*?>WC.*?<\/span.*?>)/g);
      comments = getElementsByClass(textareanode,'writely-comment','span');
      var wccomments = new Array();
      var pattern = new RegExp('WC.*?');
      var j = 0;
      for (var i=0; i<comments.length; i++) {
          if (pattern.test(comments[i].innerHTML)){
              wccomments[j] = comments[i];
              j++;
          }
      }
      var pattern2 = new RegExp('WC-END');
      for (var i=0; i<text.length; i++) { 
          if (i > 0 && !pattern2.test(wccomments[i-1].innerHTML)) {
              //remove comment
              //remove html tags
              text[i] = text[i].replace(/<span.*?class=\"writely-comment\".*?>.*?<\/span.*?>/g, '').replace(/<.*?>|\'/g, ' ');
              //remove &XXX;  
              text[i] = replaceHtmlEntites(text[i]); 
              //get words
              words = text[i].match(/(\w+)/g);	
              count = 0;
              if(words){
                count = words.length;
              }
              
              wccomments[i-1].innerHTML = 'WC:'+count;
          }
      } 
      wccomments[wccomments.length-1].innerHTML = 'WC-END';
    }


    window.addEventListener("load", function() {
      div = document.createElement('div');
      div.id = 'wc-improved';
      innerText = document.createTextNode('Word Count Improved Update');
      document.getElementById('editor-toolbar').appendChild(div);
      div.appendChild(innerText); 
	    document.getElementById('wc-improved').addEventListener("click",updatewccomments,false);
      updatewccomments();
    }, false);

})();