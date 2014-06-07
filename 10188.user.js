// ==UserScript==

// @name           KuKu Comics 優化閱讀器

// @namespace      mailto:ch_xxvi@yahoo.com.hk

// @include        http://comic*.kukudm.com/comiclist/*/*/*.htm

// @include        http://mh.sh.com/comiclist/*/*/*.htm

// @include        http://mh.socomic.com/comiclist/*/*/*.htm

// @version        1.4.6

// ==/UserScript==







boxWindow = window;

window = unsafeWindow;

function $(id) {return window.document.getElementById(id)}  

function $$(tagname) {return window.document.getElementsByTagName(tagname)}  





pageMeta = $$('td')[1].childNodes[0].textContent.split('|');

onPage = Number(pageMeta[2].substr(4).substr(0,pageMeta[2].length-6));

pageTotal = Number(pageMeta[1].substr(2).substr(0,pageMeta[1].length-4));

realTitle = document.title;



$$('table')[0].style.display = 'none';

$$('table')[2].style.display = 'none';

$$('iframe')[2].style.display = 'none';

$$('iframe')[3].style.display = 'none';

$$('td')[1].childNodes[0].textContent=

  document.title+' | KuKu Comics 優化閱讀器 1.4 by XXVi | 共'+pageTotal+'頁 | 跳到第';

$$('td')[1].childNodes[1].value=$$('td')[1].childNodes[1].defaultValue=onPage;





function aniScrollTo(endX, endY) {

  fps=5;

  delay=20;

  function linePnt(Start,End,Step) {return Start+(End-Start)*Step/fps}

  startX = window.scrollX;

  startY = window.scrollY;

  for (i=1; i<=fps; i++) {

    setTimeout(

      'scrollTo('+linePnt(startX,endX,i)+', '+linePnt(startY,endY,i)+')',

      delay*(i-1));

  }

}



function goScroll(portionNum) {

  if (!portionNum) {

    onLeftSide = (window.scrollX == 0);

    onVert = Math.round(window.scrollY/window.scrollMaxY*2);

    portionNum = (onLeftSide?3:0)+onVert+2;

  }

  switch (portionNum) {

    case 1: aniScrollTo(window.scrollMaxX,0); break;

    case 2: aniScrollTo(window.scrollMaxX,window.scrollMaxY/2); break;

    case 3: aniScrollTo(window.scrollMaxX,window.scrollMaxY); break;

    case 4: aniScrollTo(0,0); break;

    case 5: aniScrollTo(0,window.scrollMaxY/2); break;

    case 6: aniScrollTo(0,window.scrollMaxY); break;

    case 7: goNextPage(); break;

  }

}

function goNextPage() {

  if (onPage<pageTotal) {

    tmp1 = window.location.href.lastIndexOf('/')+1;

    window.open(

      window.location.href.substr(0,tmp1)+(onPage+1)+'.htm', '_self');

  }

  else {

    if (confirm('這已是最後一頁了。要關閉視窗嗎？')) {

      window.close();

    }

  } 

}


if (window.scrollX==0 && window.scrollY==0) {

  scrollTo(window.scrollMaxX,0);

}




//==== Blacking Out Module (Boss key function) ====

blackMask = document.createElement('div');

blackMask.style.position = 'fixed';

blackMask.style.backgroundColor = '#CCCCCC';

blackMask.style.left = 0;

blackMask.style.top = 0;

blackMask.style.width = document.width;

blackMask.style.height = document.height;



function blackout(flag) {

  if (flag==null) {flag=true}

  if (flag) {

    document.body.appendChild(blackMask);

    document.title = ':-)';

    if (AutoHide) {

      AutoHide.stop();

      GM_setValue('isAutohideEnabled', true);

    }

  }

  else {

//    if (blackMask.parentNode) {

//      document.body.removeChild(blackMask);

//      document.title = realTitle;

//    }

    if (AutoHide) {

      if (blackMask.parentNode) {

        document.body.removeChild(blackMask);

        document.title = realTitle;

        AutoHide.mayStart();

      }

      else {

        AutoHide.stop();

        document.title = realTitle;

        GM_setValue('isAutohideEnabled', false);

      }

    }

  }

}





//==== AutoHide Module ====

var AutoHide = new Object();

AutoHide = {

  timeout: 15,

  timeleft: null,

  timerId: null,

  mayStart:

    function() {

      if (GM_getValue('isAutohideEnabled', true)) {

        AutoHide.start();

      }

    },

  start:

    function() {

      AutoHide.timeleft = AutoHide.timeout;

      AutoHide.timerId = setInterval(AutoHide.timer,1000);

    },

  stop:

    function() {

      clearInterval(AutoHide.timerId);

    },

  renew:

    function() {

        AutoHide.timeleft = AutoHide.timeout;

    },

  timer:

    function() {

      AutoHide.timeleft--;

      tmpStr = '';

      for (i=1;i<=AutoHide.timeout;i++)

      { tmpStr += i<=AutoHide.timeleft? '.' : ' ' }

      document.title = realTitle+'  ['+tmpStr+']';

      if (AutoHide.timeleft<=0) {

        AutoHide.stop();

        blackout(true);

      }

    }

};



AutoHide.mayStart();





//==== Hotkey and window event listener ====

window.onkeydown = function(e) {

  switch (e.keyCode) {

    case 32:

    case 101:    goScroll();        break;  // smart scroll

    case 104:    blackout(true);    break;

    case 98:     blackout(false);   break;

    case 96:     goNextPage();      break;  // turn page

    case 97:     goScroll(6);       break;  // left-bottom

    case 99:     goScroll(3);       break;  // right-bottom

    case 100:    goScroll(5);       break;  // left-middle

    case 102:    goScroll(2);       break;  // right-middle

    case 103:    goScroll(4);       break;  // left-top

    case 105:    goScroll(1);       break;  // right-top

    default:     return (true);

  }

  AutoHide.renew();

  return (false);

}

window.document.ondblclick = function(e) {

  goScroll();

  AutoHide.renew();

}

window.document.onmousedown = function(e) {

  if (e.button==2) {return false}

  AutoHide.renew();

}

window.document.onselect = function(){return false}

window.document.onclick = null;

window.document.onkeydown = null;
