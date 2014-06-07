// ==UserScript==
// @name           OpenGL Extensions Navigator
// @namespace      http://userscripts.org/users/349545
// @description    Create links to the specification document of the extensions referenced in the text.
// @include        http://www.opengl.org/registry/specs/*.txt
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/([^_])((3DL|3DFX|AMD|ATI|APPLE|ARB|EXT|GREMEDY|HP|I3D|IBM|INGR|INTEL|KHR|MESA|MESAX|OML|PGI|NV|REND|S3|SGI|SGIS|SGIX|SUN|SUNX|WIN)_(\w+))/g, '$1<a href="../$3/$4.txt">$2</a>');
