// ==UserScript==
// @name           zpovednice obrat poradi
// @namespace      deamonicky script
// @description    obrať pořadí příspěvků na Zpovědnici
// @include        *zpovednice.cz/detail.php?statusik=*
// @include        www.zpovednice.cz/detail.php?statusik=*
// ==/UserScript==

function swap_innerHTML( a, b ) {
 var t = a.innerHTML;
 a.innerHTML = b.innerHTML;
 b.innerHTML = t;
} 

_table = document.querySelectorAll( "html body div table tbody tr td.boxaround table.boxbackgr" )[1]; // prvni tabulkou je prispevek zpovedi
_rows  = _table.rows;
// otoc
for( i = 1, j = _rows.length-1; i < j; i++, j-- ) { // i = 1 <= od zacatku a do konce, prvni ignoruj je to "chces udealt dobry ..."
 swap_innerHTML( _rows[i], _rows[j] );
}
