// ==UserScript==
          // @name show all photos vkontakte
          // @namespace http://vkontakte.ru/
          // @include http://vkontakte.ru/*
          // @description show all photos
          // ==/UserScript==
          
          if (unsafeWindow.ph.length > 0){
          var s = '';
          for (var i in unsafeWindow.ph) {
          s += '<img src="' + unsafeWindow.ph[i][2] + '" /><br />';
          }
          document.getElementById('myphotolink').innerHTML = s;
          }
          
          