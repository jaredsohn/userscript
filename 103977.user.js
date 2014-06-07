// ==UserScript==
// @name           140byt.es Gist filter
// @include        https://gist.github.com/962807
// @include        http://gist.github.com/962807
// @author         Kambfhase
// ==/UserScript==

unsafeWindow.jQuery("span.description").filter(":contains('140byt.es -- Click')").closest("li").hide();