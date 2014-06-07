// ==UserScript==
// @name              Wykop - Znaleziska od X wykopów:)
// @description       Pozwala ustawić od ilu wykopów widzimy znalezisko na głównej!
// @author            tinker
// @include           http://*.wykop.pl*
// @version           1.0
// ==/UserScript==


$('.diggcount').each(function(a, b) { if (parseInt($.trim($(b).text())) < 200) $(b).closest('.entry').hide() })	