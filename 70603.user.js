// ==UserScript==
// @name           highnesschart
// @namespace      trees
// @include        http://www.reddit.com/r/trees*
// ==/UserScript==

(function(){
  
  var hashes = ['qnMzT.png', 'KvaDy.png', 'JXujk.png','5JT5a.png', 
    'zpmRw.png', 'PRSO1.png', 'WWCwL.png', 'DBOjf.png', 'OHYe4.png', 
    'ViWxq.png', 'Pe7Fs.png'];
  var re = /\[\d+\]/g;
  
  var highalien = function(str){
    
    var matches = str.match(re), code, num;
    for(var i = 0; matches && i < matches.length; i++){
      code = matches[i];
      num = parseInt(code.substring(1, code.length - 1));
      if(num < hashes.length){
        str = str.replace(code, '<img style="display:inline;" src="http://imgur.com/' + hashes[num] + '" />');
      }
    }
    return str;
    
  };
  
  $ = unsafeWindow.jQuery;
  $("#siteTable a.title").each(function(){
    this.innerHTML = highalien(this.innerHTML);
  });
  $("div.md p").each(function(){
    this.innerHTML = highalien(this.innerHTML);
  });
  
})();
