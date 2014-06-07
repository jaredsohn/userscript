// ==UserScript==
          // @name           DoubanFloorNumberDisplayer
          // @namespace      http://phill84.org
          // @description    顯示樓層數
          // @include        http://www.douban.com/group/topic/*
          // ==/UserScript==
          
          /* get parameters from URL */
          function gup( name )
          {
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( window.location.href );
            if( results == null )
              return "";
            else
              return results[1];
          }
          
          /* add numbers to h4 element in all table.wr and also the css style to the head */
          var style = document.createElement('style');
          style.setAttribute('type', 'text/css');
          style.innerHTML = 'h4 p.floor{float: right;position: relative;top: -2.75em;right: 0.5em}';
          document.getElementsByTagName('head')[0].appendChild(style);
          var threads = document.getElementsByClassName('wr');
          var start = gup('start');
          for(i=1;i<threads.length;i++) {
          	if(start == '')
          		threads[i].childNodes[0].childNodes[0].childNodes[3].childNodes[1].childNodes[1].innerHTML += "<p class='floor'>"+i+"楼</p>";
          	else
          		threads[i].childNodes[0].childNodes[0].childNodes[3].childNodes[1].childNodes[1].innerHTML += "<p class='floor'>"+(i+parseInt(start, 10))+"楼</p>";
          }