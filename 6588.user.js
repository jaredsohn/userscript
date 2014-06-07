// ==UserScript==
// @name           Force Gravatar Default Image
// @namespace      http://mattmccray.com/
// @description    Since gravatars aren't working too nicely right now... This will force them to their default images
// @include        *
// ==/UserScript==


var imgs = document.getElementsByTagName('IMG');
var default_image = null;

for(var i=0; i<imgs.length; i++) {
  var img = imgs[i];
  var src = img.src.toString();
  if(/gravatar.com\/avatar.php/.test(src)) {
    if(default_image == null) default_image = get_default_image(src);
    img.src = default_image;
  }
}


function get_default_image(src) {
  var pairs = img.src.split('?')[1].split('&'); 
  for(var i=0;i<pairs.length; i++) { 
    var data = pairs[i].split('='); 
    if(data[0] == 'default') {
      return unescape(data[1]);
    }
  }
}