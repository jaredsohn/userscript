// ==UserScript==
// @name       PCI Concursos - Ajustar scroll
// @version    0.1
// @description  PCI Concursos - Ajustar scroll
// @match      http://www.pciconcursos.com.br/concursos/nacional/
// @copyright  2014, Ivan
// ==/UserScript==

var top = jQuery(".listageral").position().top;
jQuery(window).scrollTop(top);