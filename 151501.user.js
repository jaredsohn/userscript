// ==UserScript==
// @name        porevo.info user album all
// @namespace   text_album_porevo_info
// @description альбом пользователя (все фото)
// @include     http://porevo.info/view.php*
// @include     http://www.porevo.info/view.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @version     1
// ==/UserScript==


$("table.item_prop tbody tr td.tab_line1:first").append(' <a href="http://porevo.info/index.php?action=photos&filter=user&id='+$("a.usernick").attr("href").split('=')[2]+'&album=all" title="Общий альбом пользователя" target="_blank">Альбом</a>');

