// ==UserScript==
// @id             launchpad_translate_batchsize
// @name           Launchpad Translation Batchsize
// @namespace      
// @author         Joel Addison
// @description    Changes the link to untranslated packages to increase the batch size
// @include        https://translations.launchpad.net/*
// @include        https://launchpad.net/*
// ==/UserScript==

var batchsize;
batchsize = 50;
 
var a, links, newLink;
links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) {
    a = links[i];
    if (a.href.indexOf("show=untranslated") != -1 && a.href.indexOf("batch=") == -1) {
      newLink = a.href + "&batch=" + batchsize;
      a.href = newLink;
    }
}

//
// ChangeLog
// 2011-08-04 - 1.0 - Initial version

