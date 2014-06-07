// Sourceforge.net - Human readable file size
// V. 0.1 2006-04-24
// Copyright (c) 2006, Juan Manuel Caicedo
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Este es un script de Greasemonkey
//
// Para instalarlo, usted necesita Greasemonkey: http://greasemonkey.mozdev.org/
// Despu de reiniciar Firefox, entre de nuevo a este script:
//  http://labs.cavorite.com/greasemonkey/sourceforge-filesize.user.js
// En el menú Herramientas  (Tools), selecciones "Install User Script".
// Acepte la configuración inicial que se presenta.
//
// Para desinstalarlo, vaya a Herramientas (Tools) / "Manage User Scripts",
// seleccione "Human readable file size" y haga click en "Uninstall"
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script:
//  http://labs.cavorite.com/greasemonkey/sourceforge-filesize.user.js
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Human readable file size", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Texto basado en los ejemplos de Mark Pilgrim, publicados en 
// http://diveintogreasemonkey.org
//
// Text based on sample scripts by Mark Pilgrim, published in
// http://diveintogreasemonkey.org
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Human readable file size
// @namespace     http://labs.cavorite.com/greasemonkey
// @description   Displays a user friendly file size when downloading files from Sf.net
// @include       http://sourceforge.net/project/showfiles.php?*
// ==/UserScript==


// Wrapper function, taken from http://kb.mozillazine.org/XPath
function $XP(aNode, aExpr) {
  var xpe = new XPathEvaluator();
  var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
    aNode.documentElement : aNode.ownerDocument.documentElement);
  var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
  var found = [];
  var res;
  while (res = result.iterateNext())
    found.push(res);
  return found;
}
//based on Prototype
function $(name){
    return document.getElementById(name);
}

/*
Returns a human readable size
http://www.php.net/manual/en/function.filesize.php#64387
*/
function formatSize(size){
  var i = 0;
  units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  while ((size/1024)>1) {
   size = size/1024;
   i++;
  }
  size = new String(size);
  return size.substring(0,size.indexOf('.') + 4) + ' ' + units[i]
}

for (h=0, morePkg=true; morePkg; h++){
    pkg = 'pkg' + h + '_'
    pk = $(pkg + '1')
    for (i=1, more=true; pk && more; i++){
        p = $(pkg + i)
        //GM_log('pck:' + p)
        for(j=0, moreRels=true; p && moreRels; j++){
            rel = $(pkg + i + 'rel' + j)
            tx = pkg + i + 'rel' + j
            //GM_log('rel: (' + tx+ ') = ' + rel)
            for(k=1, moreFiles=true; rel && moreFiles; k++){
                //file = $XP('pkg' + i + '_rel' + j + '_' + k)
                id = pkg + i + 'rel' + j + '_' + k
                file = $XP(document, "id('"+id+"')/td[3]")
                //GM_log('td: ' + id + "=" + file);
                if (file.length > 0){
                    size = formatSize(parseFloat(file[0].innerHTML))
                    file[0].style.textAlign = 'right'
                    file[0].innerHTML = '<span title="' + file[0].innerHTML + ' bytes">' + size + '</span>'
                }else{
                    moreFiles = false
                }
            }
            moreRels = (rel != null)
        }
        more = (p != null)
    }
    morePkg = (pk != null)
}