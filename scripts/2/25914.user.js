// ==UserScript==
// @name           swear uncensorer
// @namespace      http://absf0rums.com/
// @description    Uncensors swearing on ABS forums!!!! No longer will we be oppressed by Big Brother!!!!!!
// @include        http://www.absforums.com/?*
// ==/UserScript==
var javaScrit = document.body.appendChild(document.createElement('script'));
javaScrit.type = 'text/javascript';
javaScrit.innerHTML = "\
var words = {'fuck':'fuc­k','cunt':'cun­t','nigger':'nigge­r'}; \
var deCensor = function() \
{ \
  var input = document.getElementsByName('Post')[0]; \
  for(var i in words) \
    while(input.value.match(i)) \
      input.value = input.value.replace(i,words[i]); \
  \
}; \
var submits = document.getElementsByName('submit');\
if(submits)\
  for(var i in submits)\
    submits[i].onclick = deCensor;\
";