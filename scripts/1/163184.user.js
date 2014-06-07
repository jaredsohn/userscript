// ==UserScript==
// @name		 odd save report
// @namespace		localhost
// @include		http://*.ogame.*/game/index.php?page=combatreport&nID=*
// ==/UserScript==

(function ()
{
function CreateUploadForm() {
	var strLogServerURL = "http://o-o-d.com/processcombatreport.php"
	var combat_round_HTML = document.getElementsByClassName("combat_round");
	var combat_result_HTML = document.getElementById("combat_result").innerHTML;

    var strReplace = '';
        strReplace += '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
        strReplace += '<html xmlns="http://www.w3.org/1999/xhtml">';
        strReplace += '<head>';
        strReplace += '<meta http-equiv="Content-Type" content="text/html; charset=utf8" />';
        strReplace += '<title>Боевой доклад</title>';
        strReplace += '<link rel="stylesheet" type="text/css" href="http://gf1.geo.gfsrv.net/cdn11/69930dcbe1c51ac95476ec3c385e45.css" media="screen" />';
        strReplace += '<link rel="stylesheet" type="text/css" href="http://gf1.geo.gfsrv.net/cdn3a/191b1e4950ccf07fe39a4b339877f7.css" media="screen" />';
        strReplace += '<link rel="stylesheet" type="text/css" href="http://gf1.geo.gfsrv.net/cdn17/1bf56f5bc8552cbbfa3d32d7fdae0f.css" media="screen" />';
        strReplace += '<meta http-equiv="content-type" content="text/html; charset=utf-8"/>';
        strReplace += '<meta http-equiv="X-UA-Compatible" content="IE=7"/>';
        strReplace += '<meta name="ogame-259f9d4278"/>';
        strReplace += '<meta name="ogame-version" content="3.1.4"/>';
        strReplace += '<meta name="ogame-timestamp" content="1334700784"/>';
        strReplace += '<meta name="ogame-universe" content="uni104.ogame.ru"/>';
        strReplace += '<meta name="ogame-universe-speed" content="1"/>';
        strReplace += '<meta name="ogame-language" content="ru"/>';
        strReplace += '<meta name="ogame-player-id" content="101024"/>';
        strReplace += '<meta name="ogame-player-name" content="Tali"/>';
        strReplace += '<meta name="ogame-alliance-id" content="1879"/>';
        strReplace += '<meta name="ogame-alliance-name" content="Dream Сatchers"/>';
        strReplace += '<meta name="ogame-alliance-tag" content="D.C."/>';
        strReplace += '<meta name="ogame-planet-id" content="33734339"/>';
        strReplace += '<meta name="ogame-planet-name" content="AirCastle"/>';
        strReplace += '<meta name="ogame-planet-coordinates" content="2:181:12"/>';
        strReplace += '<meta name="ogame-planet-type" content="moon"/>';
        strReplace += '</head>';
        strReplace+='<body id="combatreport">';
        strReplace+='<div id="master">';

    var reg=/<tbody>/g;
    var regV=/<\/tbody>/g;

    var strHTML = '';
        strHTML += strReplace;
        for (var i=0; i < combat_round_HTML.length; i++)
        {
             var combat_round0=combat_round_HTML[i].innerHTML;
             var combat_round01=combat_round0.replace(reg,'');
              var combat_round02=combat_round01.replace(regV,'');
            strHTML += '<div class="combat_round">' + combat_round02 + '</div>';
        }
        strHTML += '<div class="combat_round">' + combat_result_HTML + '</div></div></body></html>';

	var strUploadDiv = "";
		strUploadDiv += "<form name='upload_form' id='upload_form' enctype='multipart/form-data' action='" + strLogServerURL + "' method='post'>";
		strUploadDiv += "<center>";
		strUploadDiv += "	<table style='background-color:white'>";
        strUploadDiv += "<tbody>";
        strUploadDiv += "<tr>";
        strUploadDiv += "<td colspan=\"4\" class=\"c\">Опции";
        strUploadDiv += "<textarea rows='8' name='report' cols='156' style='display: none; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;'>" + strHTML + "</textarea>";
        strUploadDiv += "</td>";
        strUploadDiv += "</tr>";
        strUploadDiv += "<tr>";
        strUploadDiv += "<th>";
        strUploadDiv += "<div align=\"left\"><input name=\"hidecoords\" type=\"checkbox\">Скрыть координаты</div>";
        strUploadDiv += "</th>";
        strUploadDiv += "<th>";
        strUploadDiv += "<div align=\"left\"><input name=\"hidetechs\" type=\"checkbox\">Скрыть технологии</div>";
        strUploadDiv += "</th>";
        strUploadDiv += "<th>";
        strUploadDiv += "<div align=\"left\"><input name=\"addal\" checked=\"checked\" type=\"checkbox\">Добавить альянсы игроков</div>";
        strUploadDiv += "</th>";
        strUploadDiv += "<th>";
        strUploadDiv += "<div align=\"left\">Учет обороны: <select name=\"defencemode\" disabled=\"disabled\">";
        strUploadDiv += "<option value=\"3\">Нет</option>";
        strUploadDiv += "<option value=\"0\" selected=\"selected\">Из лога</option>";
        strUploadDiv += "<option value=\"1\">Скан</option>";
        strUploadDiv += "<option value=\"2\">Оценить</option>";
        strUploadDiv += "</select></div>";
        strUploadDiv += "</th>";
        strUploadDiv += "</tr>";
        strUploadDiv += "<tr>";
        strUploadDiv += "<th>";
        strUploadDiv += "<div align=\"left\">Вселенная: <select name=\"uni\">";
        strUploadDiv += "<option value=\"100\" selected=\"selected\">Авто</option>";
        strUploadDiv += "<option value=\"0\">Не указана</option>";
        strUploadDiv += "<option value=\"101\">Andromeda</option>";
        strUploadDiv += "<option value=\"102\">Barym</option>";
        strUploadDiv += "<option value=\"103\">Capella</option>";
        strUploadDiv += "<option value=\"104\">Draco</option>";
        strUploadDiv += "<option value=\"105\">Electra</option>";
        strUploadDiv += "<option value=\"106\">Fornax</option>";
        strUploadDiv += "<option value=\"107\">Gemini</option>";
        strUploadDiv += "<option value=\"108\">Hydra</option>";
        strUploadDiv += "<option value=\"1\">1 Вселенная</option>";
        strUploadDiv += "<option value=\"2\">2 Вселенная</option>";
        strUploadDiv += "<option value=\"3\">3 Вселенная</option>";
        strUploadDiv += "<option value=\"4\">4 Вселенная</option>";
        strUploadDiv += "<option value=\"5\">5 Вселенная</option>";
        strUploadDiv += "<option value=\"6\">6 Вселенная</option>";
        strUploadDiv += "<option value=\"7\">7 Вселенная</option>";
        strUploadDiv += "<option value=\"8\">8 Вселенная</option>";
        strUploadDiv += "<option value=\"9\">9 Вселенная</option>";
        strUploadDiv += "<option value=\"10\">10 Вселенная</option>";
        strUploadDiv += "<option value=\"11\">11 Вселенная</option>";
        strUploadDiv += "<option value=\"12\">12 Вселенная</option>";
        strUploadDiv += "<option value=\"13\">13 Вселенная</option>";
        strUploadDiv += "<option value=\"14\">14 Вселенная</option>";
        strUploadDiv += "<option value=\"15\">15 Вселенная</option>";
        strUploadDiv += "<option value=\"16\">16 Вселенная</option>";
        strUploadDiv += "<option value=\"17\">17 Вселенная</option>";
        strUploadDiv += "<option value=\"18\">18 Вселенная</option>";
        strUploadDiv += "<option value=\"19\">19 Вселенная</option>";
        strUploadDiv += "<option value=\"20\">20 Вселенная</option>";
        strUploadDiv += "<option value=\"21\">21 Вселенная</option>";
        strUploadDiv += "<option value=\"22\">22 Вселенная</option>";
        strUploadDiv += "<option value=\"23\">23 Вселенная</option>";
        strUploadDiv += "<option value=\"24\">24 Вселенная</option>";
        strUploadDiv += "<option value=\"25\">25 Вселенная</option>";
        strUploadDiv += "<option value=\"26\">26 Вселенная</option>";
        strUploadDiv += "<option value=\"27\">27 Вселенная</option>";
        strUploadDiv += "<option value=\"28\">28 Вселенная</option>";
        strUploadDiv += "<option value=\"29\">29 Вселенная</option>";
        strUploadDiv += "<option value=\"30\">30 Вселенная</option>";
        strUploadDiv += "<option value=\"31\">31 Вселенная</option>";
        strUploadDiv += "<option value=\"32\">32 Вселенная</option>";
        strUploadDiv += "<option value=\"33\">33 Вселенная</option>";
        strUploadDiv += "<option value=\"34\">34 Вселенная</option>";
        strUploadDiv += "<option value=\"35\">35 Вселенная</option>";
        strUploadDiv += "<option value=\"36\">36 Вселенная</option>";
        strUploadDiv += "<option value=\"37\">37 Вселенная</option>";
        strUploadDiv += "<option value=\"38\">38 Вселенная</option>";
        strUploadDiv += "<option value=\"39\">39 Вселенная</option>";
        strUploadDiv += "<option value=\"40\">40 Вселенная</option>";
        strUploadDiv += "<option value=\"41\">41 Вселенная</option>";
        strUploadDiv += "<option value=\"42\">42 Вселенная</option>";
        strUploadDiv += "<option value=\"43\">43 Вселенная</option>";
        strUploadDiv += "<option value=\"44\">44 Вселенная</option>";
        strUploadDiv += "<option value=\"45\">45 Вселенная</option>";
        strUploadDiv += "<option value=\"46\">46 Вселенная</option>";
        strUploadDiv += "<option value=\"47\">47 Вселенная</option>";
        strUploadDiv += "<option value=\"48\">48 Вселенная</option>";
        strUploadDiv += "<option value=\"49\">49 Вселенная</option>";
        strUploadDiv += "<option value=\"50\">50 Вселенная</option>";
        strUploadDiv += "<option value=\"51\">51 Вселенная</option>";
        strUploadDiv += "<option value=\"52\">52 Вселенная</option>";
        strUploadDiv += "<option value=\"53\">53 Вселенная</option>";
        strUploadDiv += "<option value=\"54\">54 Вселенная</option>";
        strUploadDiv += "<option value=\"55\">55 Вселенная</option>";
        strUploadDiv += "<option value=\"56\">56 Вселенная</option>";
        strUploadDiv += "<option value=\"57\">57 Вселенная</option>";
        strUploadDiv += "<option value=\"58\">58 Вселенная</option>";
        strUploadDiv += "<option value=\"59\">59 Вселенная</option>";
        strUploadDiv += "<option value=\"60\">60 Вселенная</option>";
        strUploadDiv += "<option value=\"61\">61 Вселенная</option>";
        strUploadDiv += "<option value=\"62\">62 Вселенная</option>";
        strUploadDiv += "<option value=\"63\">63 Вселенная</option>";
        strUploadDiv += "<option value=\"64\">64 Вселенная</option>";
        strUploadDiv += "<option value=\"65\">65 Вселенная</option>";
        strUploadDiv += "<option value=\"66\">66 Вселенная</option>";
        strUploadDiv += "<option value=\"67\">67 Вселенная</option>";
        strUploadDiv += "<option value=\"68\">68 Вселенная</option>";
        strUploadDiv += "<option value=\"69\">69 Вселенная</option>";
        strUploadDiv += "<option value=\"70\">70 Вселенная</option>";
        strUploadDiv += "<option value=\"71\">71 Вселенная</option>";
        strUploadDiv += "<option value=\"72\">72 Вселенная</option>";
        strUploadDiv += "<option value=\"73\">73 Вселенная</option>";
        strUploadDiv += "<option value=\"74\">74 Вселенная</option>";
        strUploadDiv += "<option value=\"75\">75 Вселенная</option>";
        strUploadDiv += "<option value=\"76\">76 Вселенная</option>";
        strUploadDiv += "<option value=\"77\">77 Вселенная</option>";
        strUploadDiv += "<option value=\"78\">78 Вселенная</option>";
        strUploadDiv += "<option value=\"79\">79 Вселенная</option>";
        strUploadDiv += "<option value=\"80\">80 Вселенная</option>";
        strUploadDiv += "<option value=\"81\">81 Вселенная</option>";
        strUploadDiv += "<option value=\"82\">82 Вселенная</option>";
        strUploadDiv += "<option value=\"83\">83 Вселенная</option>";
        strUploadDiv += "<option value=\"84\">84 Вселенная</option>";
        strUploadDiv += "<option value=\"85\">85 Вселенная</option>";
        strUploadDiv += "<option value=\"86\">86 Вселенная</option>";
        strUploadDiv += "<option value=\"87\">87 Вселенная</option>";
        strUploadDiv += "<option value=\"88\">88 Вселенная</option>";
        strUploadDiv += "<option value=\"89\">89 Вселенная</option>";
        strUploadDiv += "<option value=\"90\">90 Вселенная</option>";
        strUploadDiv += "<option value=\"91\">91 Вселенная</option>";
        strUploadDiv += "<option value=\"92\">92 Вселенная</option>";
        strUploadDiv += "<option value=\"93\">93 Вселенная</option>";
        strUploadDiv += "<option value=\"94\">94 Вселенная</option>";
        strUploadDiv += "<option value=\"95\">95 Вселенная</option>";
        strUploadDiv += "<option value=\"96\">96 Вселенная</option>";
        strUploadDiv += "<option value=\"97\">97 Вселенная</option>";
        strUploadDiv += "<option value=\"98\">98 Вселенная</option>";
        strUploadDiv += "<option value=\"99\">99 Вселенная</option>";
        strUploadDiv += "</select></div>";
        strUploadDiv += "</th>";
        strUploadDiv += "";
        strUploadDiv += "<th>";
        strUploadDiv += "<div align=\"left\">Сервер:<select name=\"server\">";
        strUploadDiv += "<option value=\"\" selected=\"selected\">Авто</option>";
        strUploadDiv += "<option value=\"ru\">ru</option>";
        strUploadDiv += "<option value=\"org\">org</option>";
        strUploadDiv += "<option value=\"us\">us</option>";
        strUploadDiv += "</select></div>";
        strUploadDiv += "</th>";
        strUploadDiv += "<th>";
        strUploadDiv += "<div align=\"left\">Скин: <select name=\"skin\">";
        strUploadDiv += "<option value=\"0\" selected=\"selected\">По умолчанию</option>";
        strUploadDiv += "<option value=\"1\">Anubis</option>";
        strUploadDiv += "<option value=\"3\">Blueplanet</option>";
        strUploadDiv += "<option value=\"7\">Dark Silence</option>";
        strUploadDiv += "<option value=\"2\">Deep Sunrise (Experimetal)</option>";
        strUploadDiv += "<option value=\"5\">Gold30s (evo)</option>";
        strUploadDiv += "<option value=\"4\">Lightgold</option>";
        strUploadDiv += "<option value=\"6\">Nightvisions</option>";
        strUploadDiv += "<option value=\"8\">Ocean Of Silence</option>";
        strUploadDiv += "<option value=\"14\">Redesign</option>";
        strUploadDiv += "</select></div>";
        strUploadDiv += "</th>";
        strUploadDiv += "";
        strUploadDiv += "<th><input name=\"publiclog\" type=\"checkbox\">Публичный лог</th>";
        strUploadDiv += "</tr>";
        strUploadDiv += "<tr>";
        strUploadDiv += "<td colspan=\"4\" class=\"c\">Вставьте доклад(ы) переработчика(ов):<input name=\"attackerside\" checked=\"checked\"";
        strUploadDiv += "type=\"checkbox\">От атакующего</td>";
        strUploadDiv += "</tr>";
        strUploadDiv += "<tr>";
        strUploadDiv += "<th colspan=\"4\"><textarea cols=\"150\" rows=\"4\" name=\"recycler\"></textarea></th>";
        strUploadDiv += "</tr>";
        strUploadDiv += "<tr>";
        strUploadDiv += "<td colspan=\"4\" class=\"c\">Вставьте свой комментарий:&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0);\"";
        strUploadDiv += "onclick=\"return overlib('<table><tr><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/angel.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/angel.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;O:-)&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/smile.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/smile.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-)&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/sad.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/sad.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-(&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/wink.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/wink.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;;-)&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/blum3.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/blum3.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-P&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/dirol.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/dirol.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;8-)&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/biggrin.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/biggrin.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-D&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/blush2.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/blush2.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-[&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/shok.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/shok.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;=-O&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/kiss.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/kiss.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/cray.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/cray.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:\'(&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/secret.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/secret.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-X&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/aggressive.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/aggressive.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;>:o&quot;)\'></th></tr><tr><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/fool.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/fool.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-|&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/beee.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/beee.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-/&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/mosking.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/mosking.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*JOKINGLY*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/diablo.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/diablo.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;]:->&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/music2.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/music2.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;[:-}&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/air_kiss.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/air_kiss.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*KISSED*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/bad.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/bad.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;:-!&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/boredom.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/boredom.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*TIRED*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/stop.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/stop.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*STOP*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/kiss_3.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/kiss_3.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*KISSING*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/give_rose.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/give_rose.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;@}->--&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/good.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/good.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*THUMBS UP*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/drinks.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/drinks.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*DRINK*&quot;)\'></th></tr><tr><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/man_in_love.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/man_in_love.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*IN LOVE*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/bomb.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/bomb.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;@=&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/wacko.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/wacko.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;%)&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/mamba.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/mamba.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*WASSUP*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/clapping.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/clapping.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*BRAVO*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/rofl.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/rofl.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*ROFL*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/pardon.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/pardon.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*PARDON*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/nea.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/nea.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*NO*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/crazy.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/crazy.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*CRAZY*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/dntknw.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/dntknw.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*DONT_KNOW*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/sorry.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/sorry.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*SORRY*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/yahoo.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/yahoo.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*YAHOO*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/dance4.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/dance4.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*DANCE*&quot;)\'></th></tr><tr><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/help.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/help.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*HELP*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/ok.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/ok.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*OK*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/new_russian.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/new_russian.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;\m/&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/preved.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/preved.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*HELLO*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/acute.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/acute.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*ACUTE*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/bye.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/bye.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*BYE*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/mail1.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/mail1.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*WRITE*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/dash1.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/dash1.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*WALL*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/yes3.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/yes3.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*YES*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/scratch_one-s_head.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/scratch_one-s_head.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*SCRATCH*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/lol.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/lol.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*LOL*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/i-m_so_happy.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/i-m_so_happy.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*HAPPY*&quot;)\'></th><th><img style=\'{cursor:pointer;cursor:hand;}\' src=\'http://ogame.setaron.ru/tool/img/qip/pleasantry.gif\' alt=\'http://ogame.setaron.ru/tool/img/qip/pleasantry.gif\' onclick=\'insert_text(&quot;comment&quot;,&quot;*db*&quot;)\'></th></table>',STICKY, CAPTION,'Смайлы', CENTER, CLOSECLICK, CLOSETEXT ,'[X]',ABOVE)\"";
        strUploadDiv += "onmouseout=\"return nd();\"><img src=\"http://ogame.setaron.ru/tool/img/qip/smile.gif\" alt=\"smile\"></a></td>";
        strUploadDiv += "</tr>";
        strUploadDiv += "<tr>";
        strUploadDiv += "<th colspan=\"4\"><textarea cols=\"150\" rows=\"4\" name=\"comment\"></textarea></th>";
        strUploadDiv += "</tr>";
        strUploadDiv += "<tr>";
        strUploadDiv += "<td colspan=\"4\"><input value=\"Сохранить\" type=\"submit\"></td>";
        strUploadDiv += "</tr>";
        strUploadDiv += "</tbody>";
		strUploadDiv += "	</table>";
		strUploadDiv += "</center>";
		strUploadDiv += "</form>";

	var objDiv = document.createElement("div");
		objDiv.id = 'combat_result';
		objDiv.className = 'upload_div';
		objDiv.style.display = 'none';
		objDiv.innerHTML = strUploadDiv;

	document.body.appendChild(objDiv);
	g_objDiv = objDiv;
}

function CreatePluginButton() {
	var objDiv = document.createElement("div");
		objDiv.id = "combat_result";

	var objCenter = document.createElement("center");

	var objButton = document.createElement("input");
		objButton.id = "logserver_plugin_button";
		objButton.type = "button";
		objButton.value = "OOD plugin";
		objButton.addEventListener("click", ShowHideUploadDiv, false);

	objCenter.appendChild(objButton)
	objDiv.appendChild(objCenter)
	document.body.appendChild(objDiv);
}

function ShowHideUploadDiv() {
	//var objDiv = document.getElementsByClassName('upload_div')[0]; //document.getElementsByName("upload_div")[0];
	var objDiv = g_objDiv;
	var objButton = document.getElementById("logserver_plugin_button");

	if (objDiv.style.display == "none") {
		objDiv.style.display = "";
		objButton.value = objButton.value.replace("a–?", "a–?");
		window.moveTo(0, 0);
		window.resizeTo(screen.availWidth, screen.availHeight);
	}
	else {
		objDiv.style.display = "none";
		objButton.value = objButton.value.replace("a–?", "a–?");
	}
}
CreateUploadForm();
CreatePluginButton();
}) ();
