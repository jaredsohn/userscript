// ==UserScript==
// @name           IMDB for SuperFundo
// @description    Attempts to search IMDB for title
// @include        http://superfundo.org/
// ==/UserScript==

var mTable = document.getElementById('tortabl');

for (var i = 1; i < mTable.rows.length; i++){
  var mRow = mTable.rows[i];
  var mCell = mRow.cells[1];
  var mAnchor = mCell.firstChild;
  
  var mTitleStr = mAnchor.innerHTML;

  mTitleStr = mTitleStr.replace(/.(\d{4}).*/,'($1)');

  mTitleStr = mTitleStr.replace(/^\s+|\s+$/g,"");

  mTitleStr = mTitleStr.replace(/(\s|\.)/g,'%20');

  mCell.innerHTML = '<a style="color:#27AAFF;;" href=http://www.imdb.com/find?s=tt&q=' + mTitleStr + '>[IMDB]</a> ' + mCell.innerHTML 
 
}

