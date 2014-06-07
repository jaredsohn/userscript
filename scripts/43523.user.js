// ==UserScript==
// @name           Search Topics
// @namespace      http://www.google.com/reader/
// @description    Stores searches for google reader.
// @include        http://www.google.com/reader/
// ==/UserScript==

var smarttopics = new Array;
smarttopics = {
"<b>Buzz</b>" : "leak|deadpool|acquisition|rumor|layoff|merger",
"Apple" : "apple|iphone",
"Microsoft" : "microsoft|windows"
};

var t=setInterval(function() {
   var tabmenu
   var searchhtml;
   tabmenu = document.getElementById('lhn-friends');
   if (tabmenu) {
      searchhtml = document.createElement('div');
      var class = document.createAttribute('class');
      class.nodeValue = 'lhn-section';
      searchhtml.setAttributeNode(class);
      var style = document.createAttribute('style');
      style.nodeValue = 'background-color:#eeffee;';
      searchhtml.setAttributeNode(style);
      searchhtml.innerHTML = '<div style="font-weight:bold;padding-left:10px">Search Topics</div>'
            
      for (topic in smarttopics)
         searchhtml.innerHTML += '<div class="selector" style="padding-left:23px;" onClick="document.location=\'http://www.google.com/reader/view/#search/'+ smarttopics[topic] +'/\'">'+ topic +'</div>';
      
      tabmenu.parentNode.insertBefore(searchhtml, tabmenu);
      clearInterval(t);
   }
},1000);


