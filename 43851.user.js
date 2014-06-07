// ==UserScript==
// @name           Filmtipset Vill Se Ajax
// @namespace      DScript
// @description    Ta bort filmer från vill se-listan, utan att ladda om den.
// @include        http://www.filmtipset.se/yourpage.cgi?page=package_view*package=1
// ==/UserScript==

Function.prototype.bind = function(context)
{
   var __method = this;
   var __args = new Array();

   for(it = 1; it < arguments.length; it++)
      __args.push(arguments[it]);

   return function() {
      for(ait = 0; ait < arguments.length; ait++)
         __args.push(arguments[ait]);

      __method.apply(context, __args)
   };
}

var grades = document.getElementsByClassName('grade');

for(i = 0; i < grades.length; i++)
{

	var a = grades[i].getElementsByTagName('a')[0];
	a = a.wrappedJSObject || a;

	var href = a.href;

	a.href = 'javascript:void(0);';

	a.addEventListener('click', function(a, href) {
		a.parentNode.parentNode.style.display = 'none';
		GM_xmlhttpRequest({ method: 'GET', url: href });
	}.bind(this, a, href), false);
}