// ==UserScript==
// @name lepra.newcomments
// @namespace http://leprosorium.ru
// @include http://leprosorium.ru/comments/*
// @include http://*.leprosorium.ru/comments/*
// @include http://leprosorium.ru/my/inbox/*
// ==/UserScript==

(function() {

  var
  new_comments = $$('#js-commentsHolder .new'),
  count = new_comments.length,
  current = -1,
  initialPosition = Cookie.read('newcomments-panel') || 'right',
  _left = 'url(http://lepra-newcomments.googlecode.com/hg/media/left.png) no-repeat center',
  _right = 'url(http://lepra-newcomments.googlecode.com/hg/media/right.png) no-repeat center',

  scrollFx = new Fx.Scroll(document.body, {
    duration: 200,
    wait: false
  }),
  
  scroll = function() {
    scrollFx.start(0, new_comments[current].getTop());
    positionDisplay.firstChild.data = (current + 1) + ' / ' + count;
  },

  toolbar = new Element('div', {
    styles: {
      background: '#fffff0',
      position: 'fixed',
      top: 300,
      left: (initialPosition === 'left') ? 0 : null,
      right: (initialPosition === 'right') ? 0 : null,
      padding: '8px 8px 5px 8px',
      border: '1px solid #ddd',
      'z-index': 5000
    }
  }).inject(document.body),

  nextBtn = new Element('span', {
    styles: {
      padding: '0px 5px',
      margin: '0px 4px 0px 2px',
      cursor: 'pointer',
      background: 'url(http://lepra-newcomments.googlecode.com/hg/media/down.png) no-repeat'
    },
    events: {
      mousedown: function(e) {
        e.stop();
        if (count && (current < (count - 1))) {
          current ++;
          scroll();
        }
      }
    }
  }).inject(toolbar),
  
  prevBtn = new Element('span', {
    styles: {
      padding: '0px 5px',
      margin: '0px 2px 0px 4px',
      cursor: 'pointer',
      background: 'url(http://lepra-newcomments.googlecode.com/hg/media/up.png) no-repeat'
    },
    events: {
      mousedown: function(e) {
        e.stop();
        if (count && (current > 0)) {
          current --;
          scroll();
        }
      }
    }
  }).inject(toolbar),
  
  positionDisplay = new Element('div', {
    styles: {
      color: '#666',
      'font-size': 10,
      'text-align': 'center'
    },
    html: count.toString()
  }).inject(toolbar),
  
  movePanel = function(to) {
    Cookie.write('newcomments-panel', to, {
      path: '/',
      duration: 999
    });
    toolbar.setStyles({
      left: (to === 'left') ? 0 : null,
      right: (to === 'right') ? 0 : null
    });
    moveBtn.setStyle('background', (to === 'left') ? _right : _left);
    initialPosition = to;
  },
  
  moveBtn = new Element('div', {
    styles: {
      cursor: 'pointer',
      'font-size': 12,
      'text-align': 'center',
      height: 12,
      background: (initialPosition === 'left') ? _right : _left
    },
    events: {
      mousedown: function(e) {
        e.stop();
        movePanel((initialPosition === 'right') ? 'left' : 'right');
      }
    }
  }).inject(toolbar);
  
})();