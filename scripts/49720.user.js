// ==UserScript==
          // @name Super cool first script
          // @namespace GLB
          // @include http://goallineblitz.com/game/forum*
          // ==/UserScript==
          function getElementsByClassName(classname, par){
          var a=[];
          var re = new RegExp('\\b' + classname + '\\b');
          var els = par.getElementsByTagName("*");
          for(var i=0,j=els.length; i<j; i++){
          if(re.test(els.className)){
          a.push(els);
          }
          }
          return a;
          };
          
          function findName(test) {
          if (test.parentNode.parentNode.innerHTML.indexOf('href="/game/home.pl?user_id=149186"', 0)>=0) return 1;
          return 0;
          }
          
          var els = getElementsByClassName('post_content', document);
          for(var i=0,j=els.length; i<j; i++) {
          if (findName(els)){
          els.innerHTML = "I am an old lesbian"
          }