// ==UserScript==
// @name           Tatoeba Search Language List Truncate
// @author         Christophe HENRY (sbgodin.fr)
// @copyright      Christophe HENRY <siteweb@sbgodin.fr>
// @license        Creative Commons Attribution 3.0 Unported (CC BY 3.0) http://creativecommons.org/licenses/by/3.0/
// @namespace      http://sbgodin.fr
// @description    Keeps only some of the languages searched from and to on tatoeba.org.                                                                                    
// @include        http://tatoeba.org/*
// @run-at         document-end
// ==/UserScript==

// TO UPDATE / ĜISDATIGU / METTRE À JOUR
var tsl_userLanguagesToKeep = [];
// Ex. ['fra', 'epo', 'eng', 'deu', 'jbo']


//TODO: is hidding this from global context necessary? I use tsl_ as an object prefix.
// $(document).ready(function () {
//TODO: maybe a last option in the list to display the other languages  

if (tsl_userLanguagesToKeep.length==0) {
  alert('Tatoeba Search Language List Truncate\n\nPlease update the list of list of languages.\nBonvolu ĝisdatigi la lingvan liston.\nMerci de mettre à jour la liste des langues.');
  return;
}

var tsl_builtInLanguagesToKeep = ['und']; // undefined / all languages
tsl_languagesToKeep = tsl_builtInLanguagesToKeep.concat(tsl_userLanguagesToKeep);

function tsl_removeLanguagesNotInList(node) {
  $(node).children().each(function(){
    if (-1==tsl_languagesToKeep.indexOf(this.value)) {
      $(this).remove();
    }
  });
}

tsl_removeLanguagesNotInList($('#SentenceFrom'));
tsl_removeLanguagesNotInList($('#SentenceTo'));
