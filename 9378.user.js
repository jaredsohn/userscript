// ==UserScript==
// @name           Intelegent Bookmark
// @namespace      userscripts.org/alien_scum
// @description    Makes it easier to create quicksearches
// @include        http*
// ==/UserScript==

addBook=function(aTitle,aContentURL){
document.body.appendChild(document.createElement('script')).innerHTML='window.sidebar.addPanel("'+aTitle+'","'+aContentURL+'","");'
}


document.addEventListener('keydown',function(e){
    if (e.ctrlKey &&!e.shiftKey && !e.altKey && e.keyCode==68) {
      e.preventDefault();
      doc=document;
      href=doc.location.href;
      q=/(\?|&)(q|query|search|terms)=([^&]*)/;
      h=/https?:\/\/.*\//
      if (q.test(href) && h.test(href))
      window.setTimeout(function(){
        if (confirm("It looks like your are bookmarking some search results do you want to add a quick search instead?")) 
          addBook(doc.title,href.replace(q,'$1$2%s')+'#'+href.match(h))
        else
          addBook(doc.title,href);
      },100);
      else
        addBook(doc.title,href);
    }
  },false);