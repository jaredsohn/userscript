// ==UserScript==
// @name        PubMed Quick-Link to the BibTex citation
// @namespace   http://biophysengr.net/tm/pmidbib
// @version     1.0
// @description Adds a link to PubMed articles (near the PubmedID) to get the BibTex-formatted citation from TexMed
// @include     http://www.ncbi.nlm.nih.gov/pubmed/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @grant	    none
// @copyright   2014 Daniel J. Parente
// ==/UserScript==


var elementWindow = $("dl.rprtid dd");
var pmidElement = $("dl.rprtid dd");
var pmid = pmidElement.html();

var newAnch = $('<a></a>');
newAnch.html("[Get BibTex]");
newAnch.attr('href','http://www.bioinformatics.org/texmed/cgi-bin/list.cgi?PMID=' + pmid);

pmidElement.parent().append(newAnch);