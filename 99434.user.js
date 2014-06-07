
   1.
      // ==UserScript==
   2.
      // @name notifications_jvc
   3.
      // @namespace notifications_jvc
   4.
      // @include http://www.jeuxvideo.com/forums/1*
   5.
      // @include http://www.jeuxvideo.com/forums/3*
   6.
      // ==/UserScript==
   7.
       
   8.
      // Developed by Simon Vieille
   9.
      //
  10.
      // Website: http://www.deblan.fr/
  11.
      // Blog: http://blog.deblan.fr/
  12.
      //
  13.
      // To contact me: http://www.deblan.fr/contact.html
  14.
      //
  15.
      // LICENCE: GNU General Public License - http://www.opensource.org/licenses/gpl-2.0.php
  16.
       
  17.
      String.prototype.trim = function() {
  18.
      return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
  19.
      }
  20.
       
  21.
      var Quote = {
  22.
      init: function() {
  23.
      GM_addStyle('.ancre a {padding-left:10px;}');
  24.
       
  25.
      if(GM_getValue('toPost') && (document.location).toString().indexOf('/forums/3') != -1) {
  26.
      this.putQuoteIntoForm();
  27.
      } else {
  28.
      this.addLinks();
  29.
      }
  30.
       
  31.
      this.clearGMValues();
  32.
      },
  33.
       
  34.
      clearGMValues: function() {
  35.
      GM_deleteValue('toPost');
  36.
      GM_deleteValue('author');
  37.
      GM_deleteValue('date');
  38.
      GM_deleteValue('message');
  39.
      GM_deleteValue('link');
  40.
      },
  41.
       
  42.
      addLinks: function() {
  43.
      var li = document.getElementsByTagName('li');
  44.
       
  45.
      for(var u=0, c=li.length; u<c; u++) {
  46.
      if(li[u].getAttribute('class')) {
  47.
      if(li[u].getAttribute('class') == 'ancre') {
  48.
      var a = document.createElement('a');
  49.
      a.textContent = 'Citer ce message';
  50.
      a.setAttribute('href', '#form_post');
  51.
      a.addEventListener('click', this.eventQuote, false);
  52.
      li[u].appendChild(a);
  53.
      }
  54.
      }
  55.
      }
  56.
      },
  57.
       
  58.
      putQuoteIntoForm: function() {
  59.
      var textarea = document.getElementById('newmessage');
  60.
      var message = GM_getValue('message').trim().replace(/<img src="[^"]+" alt="([^"]+)" \/>/g, '$1').replace(/<[^>]+>/g, '').replace(/\n/g, "\n| ").trim();
  61.
      textarea.value = '# Citation de '+GM_getValue('author')+'. '+GM_getValue('date')+"\n";
  62.
      textarea.value+= '# Lien du message : '+GM_getValue('link')+"\n";
  63.
      textarea.value+= message+"\n\n";
  64.
      },
  65.
       
  66.
      eventQuote: function(e) {
  67.
      var li = e.target.parentNode.parentNode.getElementsByTagName('li');
  68.
      GM_setValue('author', li[0].getElementsByTagName('strong')[0].innerHTML);
  69.
      GM_setValue('date', (li[1].innerHTML).replace(/<(.*)/g, '').replace("\n", '').replace('&nbsp;', '').trim());
  70.
      GM_setValue('message', li[2].innerHTML);
  71.
      GM_setValue('link', li[3].getElementsByTagName('a')[0].getAttribute('href'));
  72.
      GM_setValue('toPost', 1);
  73.
       
  74.
      document.location.href = (document.location).toString().replace('/forums/1', '/forums/3')+'#form_post';
  75.
      }
  76.
      }
  77.
       
  78.
      Quote.init();
