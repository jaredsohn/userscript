// ==UserScript==
// @name           szybkie_menu_fotka_mod
// @namespace      local
// @include        http://*fotka.pl*
// @exclude        http://*fotka.pl/out/users_info.php*
// @exclude        http://*fotka.pl/forum/obrazki.php*
// @exclude        http://mail.google.com/a/fotka.pl/*
// @exclude        http://*fotka.pl/js/*
// @author         htsz
// @version        1.3.6
// ==/UserScript==

if(document.getElementById("strona") == null) return;

var div = document.createElement('div');
div.id = "poop";
div.style.cssText = "position: fixed !important; z-index: 100000 !important; top: 0px !important; left: 0px !important; padding: 5px 0; margin: 0px !important; background-color: #efefef; border-bottom: 1px solid #cecece; -moz-box-shadow: 0px 0px 2px #bbb; -webkit-box-shadow: 0px 0px 2px #bbb; box-shadow: 0px 0px 2px #bbb; color: #000000; width: 100%; text-align: center !important; font-size: 11.4px !important;";
div.innerHTML = ' <strong> | <a href="http://fotka.tv/Meffis" title=" Meffis"> Pokój SZEFA </a> |<a href="http://www.fotka.pl/info/regulamin.php" title="link do regulaminu fotka.pl"> regulamin</a> | <a href="http://www.fotka.pl/forum/fotka.pl/1054222,b_stylecolor_4996BAZ" title="Zasady fotka.pl dodane przez Elę - link do tematu">faq fotka.pl</a> | <a href="http://www.fotka.pl/forum/fotka.tv/1875,NETYKIETA_FAQ_FOTKAT" title="Zasady fotka.tv dodane przez Meffisa - link do tematu">faq fotka.tv</a> | <a href="http://www.fotka.pl/forum/czat/374486,NETYKIETA_FAQ_CZAT" title="Zasady CZAT dodane przez Margotkę - link do tematu">faq czat</a>  | <a href="http://www.fotka.pl/grupa/862792/Moderatorzy_Fotkatv/Forum/157918/Konta_do_BLOKADY" title="Konta Do Blokady"> Konta Do Blokady! </a> | <a href="http://www.fotka.pl/pomoc.php#help_153" title="wgraj screena / potwierdzenie / obrazek na serwer fotki | dział kontakt">Kontakt</a> | <a href="http://www.fotka.pl/forum/fotka.pl" title="forum o fotka.pl">Forum o Fotka.pl</a> | <a href="http://www.fotka.pl/forum/fotka.tv" title="forum o fotka.tv">Forum o Fotka.tv</a> | <a href="http://www.fotka.pl/forum/czat" title="forum Czata">Forum Czat</a> | <a href="http://www.fotka.tv/panel" title="Zgłoszenia FOTKA.TV">zgłoszenia Fotka.tv</a> | <a href="http://www.fotka.pl/grupa/862792/Moderatorzy_Fotkatv/" title="grupa moderatorów fotka.tv">MOD.Fotka.tv</a> | </strong><a href="javascript:void(0);" onclick="document.getElementById(\'poop\').style.display=\'none\';" title="zamknij pasek na chwilę">x</a> ';

var headID = document.getElementsByTagName('head')[0];
var style = document.createElement('style');   
    style.type = 'text/css';
style.innerHTML = '<!-- div#header {margin-top: 16px !important;} div#poop a {color: #3880A1 !important;} -->';
  headID.appendChild(style);

var body = document.getElementsByTagName('body')[0];
  body.appendChild(div);