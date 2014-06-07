// ==UserScript==

// @name           Saving articles

// @include        http://rs*.royalsocietypublishing.org/*

// ==/UserScript==


var libros, lib, authors, aut, autores="", titles, titulo, links, enlace, dois, num, doi;

libros = document.evaluate("//li[contains(@class, 'cit toc-cit')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


for (var i = 0; i < libros.snapshotLength; i++) {
  lib = libros.snapshotItem(i);

  titles = document.evaluate(".//h4", lib, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  titulo = titles.snapshotItem(0).textContent;

  authors = document.evaluate(".//span[@class='cit-auth']", lib, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var j = 0; j < authors.snapshotLength; j++) {
      aut = authors.snapshotItem(j);
      autores = autores + " - " + aut.textContent;
    }

  dois = document.evaluate(".//span[@class='cit-doi']", lib, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  num = dois.snapshotItem(0).textContent;
  doi = num.split(/rstl\.|rsta\.|rstb\.|rspb\.|rspa\.|rsnr\.|rsif\.|rsbl\./)[1];

  links = document.evaluate(".//a[contains(@href, 'pdf+html')]", lib, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  enlace = links.snapshotItem(0);
  enlace.textContent = doi + autores;
  enlace.textContent = enlace.textContent.substr(0,140);
  enlace.textContent = enlace.textContent + " - " + titulo;
  enlace.textContent = enlace.textContent.substr(0,250);
  enlace.href = enlace.href.replace(/\.pdf\+html/, '\.pdf');
  autores = "";
}