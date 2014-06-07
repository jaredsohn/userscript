// ==UserScript==
// @name           Stop gif animations on escape
// @namespace      http://github.com/johan/
// @description    Implements the "stop gif animations on hitting the escape key" feature that all browsers except Safari and Google Chrome have had since forever. Now also for Google Chrome!
// ==/UserScript==

document.addEventListener('keydown', freeze_gifs_on_escape, true);

function freeze_gifs_on_escape(e) {
  if (e.keyCode == 27 && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
    [].slice.apply(document.images).filter(is_gif_image).map(freeze_gif);
  }
}

function is_gif_image(i) {
  return /^(?!data:).*\.gif/i.test(i.src);
}

function freeze_gif(i) {
  var c = document.createElement('canvas');
  var w = c.width = i.width;
  var h = c.height = i.height;
  c.getContext('2d').drawImage(i, 0, 0, w, h);
  try {
    i.src = c.toDataURL("image/gif"); // if possible, retain all css aspects
  } catch(e) { // cross-domain -- mimic original with all its tag attributes
    for (var j = 0, a; a = i.attributes[j]; j++)
      c.setAttribute(a.name, a.value);
    i.parentNode.replaceChild(c, i);
  }
}
