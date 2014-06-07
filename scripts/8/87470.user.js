// ==UserScript==
// @name			IMDb.com Redir
// @namespace		imdb.com
// @description		Redirects imdb.com to imdb.es or other languages / Re-dirige imdb.com a imdb.es u otros idiomas
// @include			*imdb.com*
// ==/UserScript==

newurl=window.location.href.replace(/imdb.com/,"imdb.es");location.replace(newurl)

// Language Variants (between the quotes):
// Variantes de idioma (entre comillas):
// imdb.de (German / Alem.)
// imdb.fr (French / Franc.)
// imdb.it (Italian / Italiano)
// imdb.pt (Portugese / Portug.)