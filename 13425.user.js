// ==UserScript==
// @name           Trac tickets inline images
// @description    Display image attachments in Trac tickets directly in the ticket page
// @namespace      trac
// @author         Francois Zaninotto
// @include        http://*/trac/ticket/*
// ==/UserScript==

(function() {
if(attachments = document.getElementById('attachments'))
{
  attachments = attachments.getElementsByTagName("a");
  for (var i = 0; i < attachments.length; i++)
  {
    attachment = attachments[i];
    src = attachment.href;
    if(src.lastIndexOf('.png') ||
       src.lastIndexOf('.gif') ||
       src.lastIndexOf('.jpg'))
    {
      var image = document.createElement("div");
      image.innerHTML = '<img style="max-width:620px;" src="' + src + '?format=raw" /><br />';
      attachment.parentNode.insertBefore(image, attachment);
    }
  }
}
})();