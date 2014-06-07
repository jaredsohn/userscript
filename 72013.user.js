// ==UserScript==
// @name         Add Pagination For My Gists To Top
// @namespace    gistGithubAddPaginationToTop4MyGists
// @include      /^http:\/\/gist\.github\.com\/mine([?#].*)?$/i
// @include      http://gist.github.com/mine*
// @match        http://gist.github.com/mine*
// @datecreated  2010-03-21
// @lastupdated  2010-03-21
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will add the pagination for the gist.github.com My Gists page.
// ==/UserScript==

(function(d){
  var list=d.getElementById('files');
  if(!list) return;

  var pagination=d.getElementsByClassName('pagination')[0];
  if(!pagination) return;

  list.parentNode.insertBefore(pagination.cloneNode(true),list);
})(document);
