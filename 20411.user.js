// ==UserScript==
// @name           Render links to images inline in Trac. 
// @description    Display images (including attachments) as images directly in a Trac page. Based off of the original work of Francois Zaninotto [http://userscripts.org/users/36420]
// @namespace      trac
// @author         Britt Selvitelle.
// @include        http*://trac*/ticket*
// @include        http*://trac*/wiki*
// ==/UserScript==

addEventListener("load", renderImages, false);

function renderImages() {
  collections = new Array();

  if(content_links = document.getElementById('content')) {
    content_links = content_links.getElementsByTagName("a");
  }


  if(attachments = document.getElementById('attachments'))
    attachments = attachments.getElementsByTagName("a");

  if( content_links != null && attachments != null ) {
    collections.push(content_links);
    collections.push(attachments);
  }
  else if(content_links == null && attachments != null) collections.push(attachments);
  else if(content_links != null && attachments == null) collections.push(content_links);

  if(collections.length != 0) {
  for(var j=0; j < collections.length; j++) {
    links = collections[j];
    for(var i=0; i < links.length; i++) {
      link = links[i];
      src = link.href;

      if( src.lastIndexOf('.png') != -1 ||
          src.lastIndexOf('.gif') != -1 ||
          src.lastIndexOf('.jpg') != -1) {
            var image = document.createElement("div");
            image.innerHTML = '<img style="max-width:620px;" src="' + src + '?format=raw" /><br />';
            link.parentNode.insertBefore(image, link);
          }
      }
    }
  }
}
