// ==UserScript==
// @name          Mozilla Wiki sidebar
// @namespace     http://mozilla.wikicities.com/
// @include       http://wiki.mozilla.org/*
// @description	  Toggle sidebar on/off on mozwiki and devmo
// ==/UserScript==
// changelog:
// 20050723:
// - Changed developer-test.mozilla.org to developer.mozilla.org
// - Added border to the mainContent if sidebar is off
// 20050728:
// - Added custom CSS

(function() {
  var head = document.getElementsByTagName('head')[0];
  var header = document.getElementById('header');
  var mofo = document.getElementById('mozilla-org');

  var dt = {
    injectScript:function(js) {
      script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.innerHTML = js;
      head.appendChild(script);
    },
    injectStyle:function(css) {
      style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = css;
      head.appendChild(style);
    },
    injectList:function(list, menu) {
      li = document.createElement('li');
      li.innerHTML = list;
      header.getElementsByTagName('ul')[0].insertBefore(li, menu);
    },
    injectLink:function(link) {
      a = document.createElement('a');
      a.innerHTML = link;
      mofo.appendChild(a);
    }
  }

  var js =
    'function toggleSidebar() {\n' +
    '  var mainContent = document.getElementById("mainContent");\n' +
    '  var side = document.getElementById("side");\n' +
    '  var f00 = document.getElementById("f00");\n' +
    '  if(side.style.display == "none") {\n' +
    '    side.removeAttribute("style");\n' +
    '    mainContent.removeAttribute("style");\n' +
    '    f00.setAttribute("title", "Hide sidebar");\n' +
    '    f00.parentNode.removeAttribute("class");\n' +
    '  } else {\n' +
    '    side.style.display = "none";\n' +
    '    mainContent.setAttribute("style", "width: auto; margin: 0;' +
         ' padding: 1em 1em 1em 1.5em; border: 1px outset #aaa;' +
         ' -moz-border-radius: 1em;");\n' +
    '    f00.setAttribute("title", "Show sidebar");\n' +
    '    f00.parentNode.setAttribute("class", "selected");\n' +
    '  }\n' +
    '}\n\n' +

    'function togglePersonal() {\n' +
    '  var navbar = document.getElementById("nav");\n' +
    '  var pnav = navbar.getElementsByTagName("ul")[0];\n' +
    '  if (pnav.style.display == "") {\n' +
    '    pnav.style.display = "none";\n' +
    '    pnav.parentNode.setAttribute("title", "Show Personal tools");\n' +
    '  } else {\n' +
    '    pnav.style.display = "";\n' +
    '    pnav.parentNode.setAttribute("title", "Hide Personal tools");\n' +
    '  }\n' +
    '}\n';

  var css = '#mozilla-org a:hover { background-position: 0 2px; }';

  var link = '<a href="http://developer.mozilla.org/" title="developer.mozilla.org"' +
    ' style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAZCAMAAADnouuwAAADAFBMVEWSkWiTkmmUkmmUk2qVlGuWlGuXlWyYlm2Zl26amG2amW6bmW%2Bbmm%2Bcm2%2Bdm3CdnHGenHCenHGenXGfnnKgnnKgnnOgn3KioHSjoXSjonSjonWkonalo3ampHanpXenpnenpXiop3ipp3mpqHirqXqsqnusq3utqnytq32urH2vrX6xsH6ysH%2Bzsn%2BysICzsYC0soC2tIK3tIO3toO4t4S6uYS7uYW7uYa8uoa9u4e9u4i9vIi%2BvYm%2FvonAvYnBvorCwIvEwovEwYzEwo3GxI3GxY7EwpXEw5bFxJfHxZvKx5HLyJHNypLNy5LOzJLPzZPPzZTPzpTLyZjMypnQzpTQz5XRz5bS0JfU0pfU0ZjV0pnV05nV05vW05rX1ZnX1JrY1ZvY1prY15vZ15vb2Zzc2p3c2p7d257e257e25%2Ff3J3f3J7OzbHb2aDe26Df3KDS0bXg3Z7h3p%2Fg3qDh36Di36Hi4KHj4KLj4aLk4qPl46Tm5KXo5abp5qfq56jr6Kns6art6qvu66zv7K3w7a7w7q%2Fx7rDy77DV1MnZ2M7b29He3t7i4tjh4eHj4%2BPk5OTl5ubn5%2Bfo6Ojp6enq6urr6%2Bvs7Ozt7e0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACcAbT8AAAAB3RJTUUH1QcSFxUwzhIHdQAAAfBJREFUeJy9zWlbElEUB%2FBz79w7ZiVGmW2UQtGCLVoBMtNiWZBtLsSYRQtaaqVpMQ13BmhfrCwScPi6XfgA3Hl1f8%2Fzf3POef4HfkgF36WCb1LBV6ngi1TwWSr4JBV89ObEgdceL9uCD94c3%2FLE42Vb8N6bYx2PPF62BWUPRsORPR0PymUjEtYKK9qZcvlpWFvRbp0NXy7w8IuCFo4YHpqgJHZabZopXVL9R9RAya%2B%2BKA2pN2da0208V0vvAmrAr94WV0F6uSgwS%2Blsfj%2BdzlM6X4zTiTgdKXbT%2FDTdPT%2FBE6cXiiO0v%2FiQducFTctpWEs7AjoJOU6IGAYhodAuoufIXoMcdQw%2BbkYnOt%2FqjkOIIWhKr0ElaQsklKBtB5VMRlGC3HV7pzKk3LEzfNxMQknwbcK2FSUjaEr%2BhlqSCVzDOxjrw5MLGM8xlmfsIsbbGZvEfa0M42F2Hp9kcxgvCJqSf6GesgSe%2B5CvF6FxaxD5YgMoZ%2BUQGrCscXSolRiKWbmt6FwvGhQ1pf7xd6bI%2FX3Q2QNXTDPaBV3Rx6Z5GO6Z5l042EoUovykBzpPPRMV8XebqbfSpDZgc2zxjSSLY%2FzdavaVJNmlDXDXp7IvpchO%2FaqC666v3pBi6WelBo2GW638kaJSdfm7hluvSVF3G%2F8Buf7RN5YI45oAAAAASUVORK5CYII%3D);">';

  var article = header.getElementsByTagName('li')[0];

  var f00 = '<a href="javascript:toggleSidebar();" title="Hide sidebar" id ="f00">X</a>';

  var navbar = document.getElementById('nav');
      navbar.getElementsByTagName('ul')[0].style.display = 'none';

  var ptool = navbar.getElementsByTagName('ul')[0].parentNode;
      ptool.setAttribute('onclick', 'togglePersonal()');
      ptool.setAttribute('title', 'Show Personal tools');
      ptool.setAttribute('style', 'cursor: pointer;');

  dt.injectScript(js);
  dt.injectStyle(css);
  dt.injectList(f00, article);
  dt.injectLink(link);

})();
