// ==UserScript==
// @name           C-Intrusion
// @namespace      myprizee
// @include        http://*.prizee.com/prisme.php?intrusion
// @include        http://*.prizee.com/jeux/musee
// ==/UserScript==
$ = unsafeWindow.jQuery;
if(location.toString().search("intrusion")!=-1)
{
flashvars = $("#flashcontent_Container embed").attr("flashvars");
fv = flashvars;
fv = fv.substr(0,fv.search("lang"))+"lang=voir_trad_xml_intrusion_FR.html&old=true&langcode=fr&urlTarget=http%3A%2F%2Fmedia.prizee.com%2Fpz2%2Fswf%2Fjeux%2FIntrusion%2Fintrusion.fr.swf&vTarget=10&vFP=9&version=41&nc=3478&debug=0&canal=1258147388&param=width%3A400%40height%3A400%40target%3Ahttp%3A%2F%2Fmedia.prizee.com%2Fpz2%2Fswf%2Fjeux%2FPrisme%2Fintrusion.fr.swf%40v%3A";
$("#flashcontent_Container embed").attr("flashvars",fv);
$("#flashcontent_Container").html($("#flashcontent_Container").html());
}
else
{
$("#intrusion a").click(function(){location.replace("prisme.php?intrusion");}).removeClass("clubOnly");
$("#modalClubExclusive").text("Chargement ...");
$("#intrusion span").removeClass("clubExlusiveStamp fix_png_ie");
$("#intrusion").click(function(){});
}
