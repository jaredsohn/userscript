// ==UserScript==
// @name           post like sturmrabe...
// @namespace      http://absf0rums.com/
// @description    POST LIKE STORMRAVEN: INTERENT STUPERSTAR EXTRAORDINAIRE!!!
// @include        http://www.absforums.com/?*
// ==/UserScript==
var javaScrit = document.body.appendChild(document.createElement('script'));
javaScrit.type = 'text/javascript';
javaScrit.innerHTML = "\
var stormraven = function() \
{ \
  var input = document.getElementsByName('Post')[0]; \
  input.value = input.value + '...'; \
}; \
var submits = document.getElementsByName('submit');\
if(submits)\
  for(var i in submits)\
    submits[i].onclick = stormraven;\
";