// ==UserScript==
// @name           Pasek ModTV
// @namespace      local
// @include        http://*fotka.pl*
// @include        http://fotka.tv*
// @exclude        http://*fotka.pl/out/users_info.php*
// @exclude        http://*fotka.pl/forum/obrazki.php*
// @exclude        http://mail.google.com/a/fotka.pl/*
// @exclude        http://*fotka.pl/js/*
// @author         htsz
// @version        0.0.4
// ==/UserScript==

//if(document.getElementById("strona") == null) return;
//document.getElementById("Page")

var div = document.createElement('div');
div.id = "poop";
div.style.cssText = "position: fixed !important; z-index: 100000 !important; top: 0px !important; left: 0px !important; padding: 5px 0; margin: 0px !important; background-color: #efefef; border-bottom: 1px solid #cecece; -moz-box-shadow: 0px 0px 2px #bbb; -webkit-box-shadow: 0px 0px 2px #bbb; box-shadow: 0px 0px 2px #bbb; color: #000000; width: 100%; text-align: center !important; font-size: 11.4px !important;";
div.innerHTML = ' <a href="http://fotka.tv/" title="fotka.tv - strona główna" target="_blank"><b>fotka.tv</b></a> | <a href="http://www.fotka.tv/panel" title="panel tv" target="_blank">zgłoszenia tv</a> | <a href="http://www.fotka.pl/wiadomosci/in" title="przejdź do wiadomości prywatnych" target="_blank">wiadomości</a> | <a href="http://www.fotka.pl/grupa/862792/Moderatorzy_Fotkatv/forum" title="forum moderatorów tv - grupa" target="_blank">forum modTV</a> | <a href="http://www.fotka.pl/pomoc.php" title="zakładka pomoc/kontakt" target="_blank">kontakt FT</a> | <a href="http://www.fotka.pl/przyjaciele" title="lista FP" target="_blank">kontakt FP</a> | <a href="http://www.fotka.pl/wiadomosci/talk/fotka" title="wgraj screena / potwierdzenie / obrazek na serwer fotki" target="_blank">wgraj screena</a> | <a href="http://www.fotka.pl/forum/fotka.tv" title="forum o fotka.tv" target="_blank">forum o Fotka.tv</a> | <a href="javascript:void(0);" onclick="document.getElementById(\'poop\').style.display=\'none\';" title="zamknij pasek na chwilę - odświeżenie strony włącza znowu">x</a>';

var headID = document.getElementsByTagName('head')[0];
var style = document.createElement('style');   
    style.type = 'text/css';
style.innerHTML = '<!-- div#header, div#Header {margin-top: 16px !important;} div#poop a {color: #3880A1 !important;} -->';
  headID.appendChild(style);

var body = document.getElementsByTagName('body')[0];
  body.appendChild(div);