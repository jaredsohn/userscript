// ==UserScript==
// @name       Libera inputs
// @namespace  http://filipegiusti.com
// @version    0.3
// @description  Retira limitação de colar e de usar o teclado virtual
// @match      https://acessoseguro.gissonline.com.br/index.cfm*
// @copyright  2012+, Filipe Giusti
// ==/UserScript==

document.getElementsByName("TxtIdent")[0].onpaste = undefined;
document.getElementsByName("TxtSenha")[0].onpaste = undefined;
document.getElementsByName("TxtValida")[0].onkeypress = undefined;
