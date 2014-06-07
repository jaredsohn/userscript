// ==UserScript==
// @name           FurAffinity Deleted Post Hider
// @namespace      http://userscripts.org/users/208586
// @description    Hides the deleted submission/journal entries
// @include        http://www.furaffinity.net/msg/submissions*
// @include        http://www.furaffinity.net/msg/others*
// @include        http://www.furaffinity.net/favorites*
// ==/UserScript==

// Version 1.4

// Cache is necessary because certain elements of an XPathResult cannot
// be accessed without invalidating it
var paths=[],cache=[],checks=[],exec,elem;
if (exec=(/(submissions|others|favorites)/i).exec(window.location+"")) {
   switch (exec[1].toLowerCase()) {
      case 'submissions':
      case 'favorites':
         paths.push("//span[text()='Submission has been deleted']/following::small[text()='by the owner.']/ancestor::li");
         break;
      case 'others':
         paths.push("//strong[text()='Comment']/following::strong[text()='Journal']/ancestor::li");
         paths.push("//span[text()='Removed']/following::small[text()='by the user']/ancestor::li");
         paths.push("//li[text()='The favorite has been removed by the user.']");
         paths.push("//strong[text()='Journal has been deleted']/following::strong[text()='the poster']/ancestor::li");
         break;
   }
   for (var i=0; i<paths.length; i++) {
      var elems=document.evaluate(
         paths[i],
         document,
         null,
         XPathResult.ANY_TYPE,
         null
      );
      while (elem=elems.iterateNext()) {
         cache.push(elem);
      }
   }
}
for (var i=0; i<cache.length; i++) {
   checkChecks(cache[i]);
   cache[i].style.display='none';
}
function checkChecks(elem) {
   if (typeof elem.tagName!="undefined"&&(/^input$/i).test(elem.tagName)&&elem.type=='checkbox') {
      elem.checked=true;
      return;
   }
   for (var i=0; i<elem.childNodes.length; i++) {
      checkChecks(elem.childNodes[i]);
   }
}