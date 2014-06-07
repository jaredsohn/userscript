// ==UserScript==
// @name           Andy
// @namespace      andy
// @description    Stop dicking around.
// @include        *
// @version        0.11
// ==/UserScript==

(function(window, document) {

  var host = window.location.host;
  var useful = ['appspot',
                'caniuse',
                'chromium',
                'cplusplus',
                'ecmascript',
                'google',
                'googlecode',
                'googleplex',
                'html5rocks',
                'java',
                'mozilla',
                'perl',
                'python',
                'quirksmode',
                'regexpal',
                'tldp.org',
                'webkit',
                'w3'];

  // Ignore seemingly legitimate sites, internal URLs, and <iframe>s.
  var hostChunks = host.split('.').slice(-2, -1);
  if (!hostChunks.length || useful.indexOf(hostChunks[0]) >= 0 || window !== window.top)
    return;

  var growInterval = 100;
  var growStart = 1000 * 60 * 5;
  var growSleep = 1000 * 30;

  function grow() {
    var width = window.parseInt(andy.style.width, 10) + 1;
    var height = width / ratio;
    style(andy, {
      height: height + 'px',
      width: width + 'px'
    });
    if (width >= origWidth)
      stop();
  }
  
  function sleep() {
    style(andy, {
      height: 0,
      width: 0
    });
    stop();
    startIn(growSleep);
  }
  
  var growHandle;
  function start() {
    growHandle = window.setInterval(grow, growInterval);
  }
  
  function startIn(time) {
    window.setTimeout(start, time);
  }
  
  function stop() {
    window.clearInterval(growHandle);
  }
  
  function style(el, styles) {
    for (var i in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, i))
        andy.style[i] = styles[i];
    }
  }
  
  var andy = document.createElement('img');
  
  style(andy, {
    left: 0,
    height: 0,
    position: 'fixed',
    top: 0,
    width: 0,
    zIndex: 1000000
  });

  var origWidth;  
  var ratio;
  andy.onload = function() {
    origWidth = andy.width;
    ratio = origWidth / andy.height;
    document.documentElement.appendChild(andy);
    andy.onclick = sleep;
  };
  
  andy.src = 'http://danbeam.org/images/andy_dick.jpg';
  
  startIn(growStart);

}(this, this.document));