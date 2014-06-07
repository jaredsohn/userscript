// ==UserScript==

// @name           Expand Paws.ru Images FIXED BY SPEK! original - https://userscripts.org/scripts/show/67320

// @namespace      

// @description    Expands images on click at this site. sorry about the bastardisation of the script. I'll do it better later.

// @include        http://pawsru.org/*
// ==/UserScript==

var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'postblock';
document.getElementsByTagName('body')[0].appendChild(iDiv);
iDiv.style.position='absolute';
iDiv.style.top='50px';
iDiv.style.padding='10px';
iDiv.innerHTML="<a href='#' onClick=\"var ratio;var image_elements = document.getElementsByTagName('img');for(var i=1; i<image_elements.length; i++) {var image_element = image_elements[i],InnerWidth = window.innerWidth,InnerHeight = window.innerHeight;image_element.src = image_element.src.replace('/thumb','/src');var dot = image_element.src.lastIndexOf('.');image_element.src = image_element.src.substring(0,dot-1)+image_element.src.substring(dot,image_element.src.length);if (image_element.src.substring(16,19) != 'fcp'){ratio = Math.min(InnerWidth / image_element.width, InnerHeight / image_element.height);image_element.removeAttribute('height');image_element.removeAttribute('width');}}\">EXPAND ALL IMAGES</a>";