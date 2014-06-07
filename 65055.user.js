// ==UserScript==
// @name           Orkut - Old Smileys
// @author         Siva
// @namespace      steinn
// @description    Replaces the new images for old images
// @include        http*.orkut.*
// ==/UserScript==

for each(i in document.getElementsByTagName('img')){ 
i.src= i.src.replace('/smiley/', '/');
i.src = i.src.replace(/r_cool.png/i, 'i_cool.gif');
i.src = i.src.replace(/r_smile.png/i, 'i_smile.gif');
i.src = i.src.replace(/r_wink.png/i, 'i_wink.gif');
i.src = i.src.replace(/r_bigsmile.png/i, 'i_bigsmile.gif');
i.src = i.src.replace(/r_funny.png/i, 'i_funny.gif');
i.src = i.src.replace(/r_confuse.png/i, 'i_confuse.gif');
i.src = i.src.replace(/r_surprise.png/i, 'i_surprise.gif');
i.src = i.src.replace(/r_angry.png/i, 'i_angry.gif');
i.src = i.src.replace(/r_heart.png/i, 'i_heart.gif');
}