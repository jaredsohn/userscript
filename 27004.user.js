// ==UserScript==
// @name           bash.hu ajax rate
// @author         Ajnasz
// @description    This script allows you to rate without page reloading on bash.hu
// @namespace      http://ncore.hu/bash-hu-ajax-rate
// @include        http://bash.hu/
// ==/UserScript==
(function(){
  var a = Array.prototype.slice.call(document.getElementById('box').getElementsByTagName('a'));
  a.map(function(b){
    if(b.innerHTML == '-' || b.innerHTML == '+') {
      b.addEventListener('click', function(event){
        var element = event.target;
        if(element.innerHTML == '-') {
          var vote = '-';
        } else if(element.innerHTML == '+') {
          var vote = '+'
        }
        element.innerHTML = '⊙';
        GM_xmlhttpRequest({
          method: 'GET',
          url: this.href,
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          },
          onload: function(resp) {
            if(resp.status == 200) {
              element.innerHTML = vote;
              if(vote == '-') {
                element.setAttribute('style', 'color:#e00;font-size:20px;font-weight:bold;');
              } else if(vote == '+') {
                element.setAttribute('style', 'color:#00E200;font-size:20px;font-weight:bold;');
              }
            } else {
              alert('Error while voting');
            }
          }
        });
        event.preventDefault();
        event.stopPropagation();
        return false
      },false);
    }
  });
})();
