// ==UserScript==
// @name          Mozilla Wiki tweaks
// @namespace     http://mozilla.wikicities.com/
// @include       http://wiki.mozilla.org/*
// @include       https://wiki.mozilla.org/*
// @description	  Toggle sidebar on/off on wikimo, make 'edit' links only appear onhover.
// ==/UserScript==
// changelog:
// 20100708:
// - float:none for mainContent, otherwise content doesn't overflow right when it's too wide.
// 20100704:
// - Removed border around mainContent when sidebar is off
// - Made 'edit' links on headlines only appear onhover
// - Removed "Personal tools" hide/show functionality
// - Removed devmo link injection
// - Default sidebar to hidden on pageload
// - Renamed script from "Mozilla Wiki sidebar" to "Mozilla Wiki tweaks"
// 20050723:
// - Changed developer-test.mozilla.org to developer.mozilla.org
// - Added border to the mainContent if sidebar is off
// 20050728:
// - Added custom CSS

(function() {
  var head = document.getElementsByTagName('head')[0];
  var header = document.getElementById('header');

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
    }
  };

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
         ' padding: 1em 1em 1em 1.5em; float: none;");\n' +
    '    f00.setAttribute("title", "Show sidebar");\n' +
    '    f00.parentNode.setAttribute("class", "selected");\n' +
    '  }\n' +
    '}\n';

  var css = '#mozilla-org a:hover { background-position: 0 2px; }' +
     '.editsection { display: none; }' +
     'h1:hover .editsection, h2:hover .editsection, ' +
     'h3:hover .editsection { display: inline;}';

  var article = header.getElementsByTagName('li')[0];

  var f00 = '<a href="javascript:toggleSidebar();" title="Show sidebar" id ="f00">X</a>';

  dt.injectScript(js);
  dt.injectStyle(css);
  dt.injectList(f00, article);

  document.getElementById("side").style.display = "none";
  document.getElementById("mainContent")
     .setAttribute("style", "width: auto; margin: 0; padding: 1em 1em 1em 1.5em; float: none;");
  document.getElementById('f00').parentNode.setAttribute("class", "selected");

})();
