// ==UserScript==
// @name           Show custom link
// @namespace      *
// @include        *
// @version        0.2
// ==/UserScript==

      
      
        
        function melden(input) {
        var newPopup = document.createElement('div');
        //newPopup.id='rokdd_alert';
        newPopup.setAttribute('class','rokdd_alert');
        newPopup.innerHTML=input;
        document.body.insertBefore(newPopup, document.body.firstChild);
        newPopup.addEventListener('click',function(){
            this.parentNode.removeChild(this);
            },false);
          }
        
        function addGlobalStyle(css) {
        //this is from greasemonkey example page - thanks
            var head, style;
            head = document.getElementsByTagName('head')[0];
            if (!head) { return; }
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            head.appendChild(style);
        }
               


addGlobalStyle('#rokdd_alert, .rokdd_alert { border: 1px dotted rgb(255, 0, 0); padding: 3px; cursor: pointer; position: absolute; z-index: 99999; top: 15px; right: 15px; background-color: rgb(255, 238, 238); color: rgb(255, 0, 0); }');        					
melden('<a align="blank" class="rokdd_alert" style="color: rgb(255, 0, 0)" href="/index.php?pid=3">Login...</a>');