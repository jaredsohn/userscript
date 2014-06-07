// ==UserScript==
// @name          SpreadFirefox Sidebar Toggle
// @namespace     http://loucypher.cjb.net/
// @include       http://www.spreadfirefox.com/*
// @description   Toggle right sidebar on/off. This also makes the table overflow more readable.
// ==/UserScript==

(function() {
  var head = document.getElementsByTagName('head')[0];
  var header = document.getElementById('header');
  var li = header.getElementsByTagName('li');

  var menuFAQ = li[0];
  var menuForums = li[1];
  var menuSpread = li[2];

  var gm = {
    injectStyle:function(css) {
      style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = css;
      head.appendChild(style);
    },
    injectScript:function(js) {
      script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.innerHTML = js;
      head.appendChild(script);
    },
    injectList:function(list, menu) {
      li = document.createElement('li');
      li.innerHTML = list;
      header.getElementsByTagName('ul')[0].insertBefore(li, menu);
    }
  }

  var css = '#image table, #forum table, .project table {\n' +
    '  position: relative;\n' +
    '  z-index: 32768;\n' +
    '  background-color: white;\n' +
  '}';

  var js = '' +
    'function toggleSidebar() {\n' +
    '  var centerColumn = document.getElementById("main").parentNode.parentNode;\n' +
    '  var leftBar = document.getElementById("sidebar-left");\n' +
    '  var rightBar = document.getElementById("sidebar-right");\n' +
    '  if(rightBar.style.display == "") {\n' +
    '    rightBar.style.display = "none";\n' +
    '    centerColumn.setAttribute("style", "margin-left: 150px; margin-right: 0;");\n' +
    '  } else {\n' +
    '    rightBar.style.display = "";\n' +
    '    leftBar.setAttribute("style", "float: left;");\n' +
    '    centerColumn.setAttribute("style", "margin-left: 150px; margin-right: 247px;");\n' +
    '  }\n' +
  '}\n';

  var f00q = '<a href="javascript:toggleSidebar();" title="Toggle right bar">F00Q</a>';

  var wiki = '<a href="http://mozilla.wikicities.com/" title="SFX Projects Wiki">Wiki</a>';

  gm.injectStyle(css);
  gm.injectScript(js);
  gm.injectList(f00q, menuFAQ);
  gm.injectList(wiki, menuForums);

})();
