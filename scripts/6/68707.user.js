// ==UserScript==
// @name           What.CD: Sort files
// @namespace      http://animorc.zapto.org/greasemonkey/scripts
// @description    Make the files tables on the What.CD torrent pages sortable.
// @updateURL      https://userscripts.org/scripts/source/68707.meta.js
// @include        https://www.what.cd/torrents.php?id=*
// @include        https://ssl.what.cd/torrents.php?id=*
// @include        https://what.cd/torrents.php?id=*
// ==/UserScript==

var what_cd_sort = function()
{
  function _(id)
  {
    return document.getElementById(id);
  }

  function sortTable(table_id, col)
  {
    col = Number(col);
    if( sortCols[table_id][0] === col ) {
      filesArray[table_id].reverse();
      sortCols[table_id][1] = 1 - sortCols[table_id][1];
    }
    else {
      sortCol[1] = ( col === sortCols[table_id][0]
        ? 1 - sortCols[table_id][1]
        : ( col === 0
          ? 0
          : 1 ) );
      sortCol[0] = col;
      sortCols[table_id] = sortCol;
      filesArray[table_id].sort(sortTableFunc);
    }
    genTable(table_id);
    sortCol = [];
  }

  function sortTableFunc(a,b)
  {
    var posNumA, posNumB, posStrA, posStrB;
    if( sortCol[0] == 1 ) {
      var ret = ( a[1][1] == b[1][1]
        ? b[1][0] - a[1][0]
        : ( a[1][1] < b[1][1]
          ? 1
          : -1 ) );
      return ( sortCol[1] == 1
        ? ret
        : -ret );
    }
    a = a[0], b = b[0];
    var order = sortCol[1] == 1 ? -1 : 1;
		while( true ) {
			// Both a and b start with numbers => Lowest number gives the lowest value
			if( a.charAt(0) <= '9' && a.charAt(0) >= '0' &&  b.charAt(0) <= '9' && b.charAt(0) >= '0' ) {
				ret = parseInt(a, 10) - parseInt(b, 10);
				if( ret )
					return order * ret;
				// No more letters in a or b => Shortest string has lowest value
				if( (posStrA = a.search(/\D/)) == -1 || (posStrB = b.search(/\D/)) == -1 )
					return ( posStrA ) ? -order : order;
				a = a.substr(posStrA);
				b = b.substr(posStrB);
			}
			else {
				// If none of a and b contain a digits, or one of them starts with a number, compare string values.
				if( (posNumA = a.search(/\d/)) == -1 || (posNumB = b.search(/\d/)) == -1 || !posNumA || !posNumB )
					return ( a < b ) ? -order : ( a > b ) ? order : 0;
				var asub = a.substr(0, posNumA);
				var bsub = b.substr(0, posNumB);
				if( asub == bsub ) {
					a = a.substr(posNumA);
					b = b.substr(posNumB);
				}
				else
					return ( asub < bsub ) ? -order : order;
			}
		}
  }

  function genTable(table_id)
  {
    var filesTableNew = document.createElement('tbody');
    filesTableNew.appendChild(headerRows[table_id]);
    for( var i=0; i<filesArray[table_id].length; i++ )
      filesTableNew.appendChild(filesArray[table_id][i][filesArray[table_id][i].length-1]);
    _('files_'+tIDs[table_id]).firstChild.replaceChild(filesTableNew,_('files_'+tIDs[table_id]).firstChild.firstChild);
  }

  var sortCols = [], sortCol = [], filesArray = [], tIDs = [], headerRows = [], curRow = [], loaded = 0;
  var links = document.links;
  for( var i=0; i<links.length; i++ )
    if( links[i].innerHTML == '(View Filelist)' && links[i].parentNode.parentNode.parentNode.id.indexOf('torrent_') != -1 )
      tIDs.push(links[i].parentNode.parentNode.parentNode.id.replace('torrent_',''));

  for( var j=0; j<tIDs.length; j++ ) {
    var filesTable = _('files_'+tIDs[j]).firstChild.firstChild;
    var newLink = document.createElement('a');
    newLink.href = 'javascript:void(0);';
    newLink.setAttribute('table_id', j);
    for( var linkText = filesTable.rows[0].cells[0].firstChild; linkText.firstChild; linkText=linkText.firstChild )
      ;
    newLink.innerHTML = 'File Name';
    newLink.addEventListener('click', function() { sortTable(this.getAttribute('table_id'), this.parentNode.parentNode.parentNode.cellIndex); }, false);
    var remainingContent = linkText.textContent.substr(String('File Name').length);
    linkText.textContent = remainingContent;
    linkText.parentNode.insertBefore(newLink, linkText);

    newLink = document.createElement('a');
    newLink.href = 'javascript:void(0);';
    newLink.setAttribute('table_id', j);
    for( var linkText = filesTable.rows[0].cells[1].firstChild; linkText.firstChild; linkText=linkText.firstChild )
      ;
    newLink.innerHTML = 'Size';
    newLink.addEventListener('click', function() { sortTable(this.getAttribute('table_id'), this.parentNode.parentNode.cellIndex); }, false);
    remainingContent = linkText.textContent.substr(String('Size').length);
    linkText.textContent = remainingContent;
    linkText.parentNode.insertBefore(newLink, linkText);

    filesArray[j] = [], sortCols[j] = [null,null];
    for( var i=1; i<filesTable.rows.length; i++ ) {
      curRow[0] = filesTable.rows[i].cells[0].innerHTML.toLowerCase();
      var size = filesTable.rows[i].cells[1].innerHTML.split(/ /);
      unit = ( size[1] == "GB"
        ? 3
        : ( size[1] == "MB"
          ? 2
          : ( size[1] == "KB"
            ? 1
            : 0 ) ) );
      filesArray[j][i-1] = [curRow[0], [size[0], unit], filesTable.rows[i]];
    }
    headerRows[j] = filesTable.rows[0];
    sortTable(j,0);
  }

}();
