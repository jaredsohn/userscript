// ==UserScript==
// @name           Lock hide
// @namespace      My Prizee
// @include        http://www.prizee.com/forum/index.php?/forum/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
$(".altrow > img[alt='Sujet fermé']").parent().parent().hide();
nb = $(".altrow > img[alt='Sujet fermé']").length;
$("#forum_table tbody").html($("#forum_table tbody").html()+'<tr class="row2"><td class="short altrow"><img alt="Sujet fermé" src="http://media.prizee.com/pz2/forum/public/style_images/ShodowImage/t_closed.png"/></td><td><span class="topic_title">'+nb+' topic(s) vérrouillé(s) - <a style="cursor:pointer;" onclick="jQuery(\'.altrow > img[alt=Sujet fermé]\').parent().parent().show();">Afficher</a></span></td><td class="short altrow">Script by matheod</td><td class="stats"></td><td class="altrow"></td></tr>');