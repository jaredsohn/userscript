// ==UserScript==
// @name           abs posting style improver
// @namespace      http://absforums.com/
// @include        http://www.absforums.com/?act=Post*
// @include        http://www.absforums.com/?showtopic=*
// @description    improve your posting style. completely free of charge!
// ==/UserScript==
var javaScrit = document.body.appendChild(document.createElement('script'));
javaScrit.type = 'text/javascript';
javaScrit.innerHTML = "var colors = ['blue','red','purple','orange','yellow','gray','green','black','white'];var fonts = ['Arial','Times','Courier','Impact','Geneva','Optima'];var icons = document.getElementsByName('iconid');var fixForm = function(){if(icons.length > 0 ){icons[Math.floor(Math.random()*icons.length)].checked = true;}  var textarea = document.getElementsByName('Post')[0];  var randColor = colors[Math.floor(Math.random()*colors.length)];  var randFont = fonts[Math.floor(Math.random()*fonts.length)];  textarea.value = '[FONT='+randFont+'][COLOR='+randColor+']'+textarea.value+'[/COLOR][/FONT]';};document.getElementsByName('submit')[0].onclick = fixForm;"
