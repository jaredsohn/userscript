// ==UserScript==
// @name           Theme Trick
// @namespace      http://onyxstone.stumbleupon.com/
// @description    ....
// @include        http://www.stumbleupon.com/settings/customize/
// ==/UserScript==

$ = unsafeWindow.$;
cols = {
'3' : 'rgb(43, 85, 128)',
'4' : 'rgb(91, 144, 39)'
}
$('#listThemes').find('input[value="14"]').addClass('trick')


var select = $('<select><option value="3">Blue</option><option value="4">Green</option></select>').appendTo( $('#listThemes') ).bind('change',switchThemes);

function switchThemes( e ) {
  v = select.val();
  col = cols[v]
  $('#listThemes').find('input.trick').val(v).parents('div.theme').addClass('checked').find( 'a.current' )[0]
  .style.backgroundColor = col;

}