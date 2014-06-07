// ==UserScript==
// @name		LogServer.net GM script
// @namespace		localhost
// @description		LogServer.net Greasemonkey script for quick uploading combat reports in OGame v5.x ("redesign")
// @include             http://*.ogame.*/game/index.php?*page=*
// @include             http://*-*.ogame.gameforge.com/game/index.php?page=*
// @exclude		http://board.*.ogame.gameforge.com
// @copyright		2010, Nate River
// @license		GNU
// @version 		3.1
// @author 		Nate River (Skyline Designs)
// @updateURL           http://userscripts.org/scripts/source/69560.user.js
// @installURL          http://userscripts.org/scripts/source/69560.user.js
// @downloadURL         http://userscripts.org/scripts/source/69560.user.js
// @grant               none
// @homepage 		http://logserver.su
// ==/UserScript==

(function ()
{
objScript = document.createElement("script");
objScript.src = "http://logserver.su/plugin/logserver_gms_combatreport.js";
document.body.appendChild(objScript);

objScript = document.createElement("script");
objScript.src = "http://logserver.su/plugin/logserver_gms_menubutton.js";
document.body.appendChild(objScript);

var $ = unsafeWindow.$;
$.getScript( '/cdn/js/greasemonkey/version-check.js', function() {
		(unsafeWindow || window).oGameVersionCheck('LogServer.net GM script', '5.4.3', 'http://userscripts.org/scripts/show/69560');
});

if (document.location.href.indexOf ("/game/index.php?page=messages") < 0) return;
var myFunc = (function ()
{
    var url = location.hostname.search('ru');

    if (url == '-1')
    {
        var LogServer_plugin = 'LogServer plugin';
        var upload_form = 'upload form';
        var Recycler_report = 'Recycler report:';
        var Comment = 'Comment:';
        var Planet_clean_up = 'Planet clean-up:';
        var Public_log = 'Public log';
        var Hide_coordinates = 'Hide coordinates';
        var Hide_technologies = 'Hide technologies';
        var Hide_technologies = 'Hide technologies';
        var Hide_time = 'Hide Time';
        var Hide_comments = 'Ban comments';
        var Calculate_IPMs = 'Calculate IPMs:';
        var Calc_deuterium = 'Calc. deuterium consumption (100%)';
        var Universe = 'Universe';
        var Upload = 'Upload';
    } else {
        var LogServer_plugin = 'LogServer плагин';
        var upload_form = 'форма загрузки';
        var Recycler_report = 'Доклад переработчиков:';
        var Comment = 'Комментарий:';
        var Planet_clean_up = 'Зачистка планеты:';
        var Public_log = 'Публичный лог';
        var Hide_coordinates = 'Скрыть координаты';
        var Hide_technologies = 'Скрыть технологии';
        var Hide_time = 'Скрыть время';
        var Hide_comments = 'Запрет комментариев';
        var Calculate_IPMs = 'Учесть МПР:';
        var Calc_deuterium = 'Рассчитать потр. дейтерия (100%)';
        var Universe = 'Вселенная';
        var Upload = 'Загрузить';
    }

    if (document.location.href.indexOf("page=messages") < 0) return;
        $(document).ajaxSuccess (function(e, xhr, ajaxOptions)
    	{
            if (ajaxOptions.url.indexOf ("page=combatreport") >= 0)
    		{
    	        $ (".overlayDiv > .combatreport").each (function ()
    			{
                	var strLogServerURL = "http://logserver.su/index.php";

                	var strHTML = document.getElementsByClassName("combatreport")[0].innerHTML;

                	strPattern = "<style.+?</style>";
                	while (strHTML.search(new RegExp(strPattern)) != -1)
                		strHTML = strHTML.replace(new RegExp(strPattern), "");

                	strPattern = "<script.+?</script>";
                	while (strHTML.search(new RegExp(strPattern)) != -1)
                		strHTML = strHTML.replace(new RegExp(strPattern), "");

                	strPattern = "<lcs.+?dataexchangeelement>";
                	while (strHTML.search(new RegExp(strPattern)) != -1)
                		strHTML = strHTML.replace(new RegExp(strPattern), "");

                	strHTML = strHTML.replace(new RegExp("<input.+?Shahterov.+?>"), "");

                	var strUploadDiv = "";
                		strUploadDiv += "<form  action='" + strLogServerURL + "' method='post' target='_blank'>";
                		strUploadDiv += "<center>";
                		strUploadDiv += "	<table>";
                		strUploadDiv += "		<tr>";
                		strUploadDiv += "			<center><font color='#00DD00'><b>LogServer.net " + upload_form + "</b></font></center>";
                		strUploadDiv += "		</tr>";
                		strUploadDiv += "		<tr>";
                		strUploadDiv += "			<td align='center'>";
                		strUploadDiv += "				<textarea rows='8' name='log_textarea' cols='156' style='display: none; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;'>" + strHTML +"</textarea>";
                		strUploadDiv += "				<font face='Arial' color='#888888' size='2'>" + Recycler_report + "</font><br>";
                		strUploadDiv += "				<textarea rows='2' name='recycler_textarea' cols='160' style='width: 700px; min-height: 20px; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;' onclick='this.setAttribute(\"rows\", 4); if (this.innerHTML==\"*\") this.innerHTML=\"\"'>*</textarea>";
                		strUploadDiv += "				<br><font face='Arial' color='#888888' size='2'>" + Comment + "</font><br>";
                		strUploadDiv += "				<textarea rows='2' name='comment_textarea' cols='160' style='width: 700px; min-height: 20px; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;' onclick='this.setAttribute(\"rows\", 4);'></textarea>";
                		strUploadDiv += "				<br><font face='Arial' color='#888888' size='2'>" + Planet_clean_up + "</font><br>";
                		strUploadDiv += "				<textarea rows='2' name='clean_up_textarea' cols='160' style='width: 700px; min-height: 20px; font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;' onclick='this.setAttribute(\"rows\", 4);'></textarea>";
                		strUploadDiv += "			</td>";
                		strUploadDiv += "		</tr>";

                													strChecked = getCookie("index_cbx_public");
                													if (strChecked == "false") strChecked = ""
                													else strChecked = "checked";
                		strCheckBoxes = "							<input type='checkbox' name='cbx_public' value='ON' " + strChecked + " onchange='document.cookie=\"index_cbx_public=\"+this.checked+\"; expires=Monday, 01-Sep-2020 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + Public_log + "</font><br>";
                													strChecked = getCookie("index_cbx_hide_coord");
                													if (strChecked == "false") strChecked = ""
                													else strChecked = "checked";
                		strCheckBoxes += "							<input type='checkbox' name='cbx_hide_coord' value='ON' " + strChecked + " onchange='document.cookie=\"index_cbx_hide_coord=\"+this.checked+\"; expires=Monday, 01-Sep-2020 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + Hide_coordinates + "</font><br>";
                													strChecked = getCookie("index_hide_tech");
                													if (strChecked == "false") strChecked = ""
                													else strChecked = "checked";
                		strCheckBoxes += "							<input type='checkbox' name='cbx_hide_tech' value='ON' " + strChecked + " onchange='document.cookie=\"index_hide_tech=\"+this.checked+\"; expires=Monday, 01-Sep-2020 10:0:0 GMT\"'><font color='#888888' face='Arial' size='2'>" + Hide_technologies + "</font><input type=hidden name='submited' value='1'>";

                		strListBoxes = "							<table border='0' style='border-collapse: collapse' cellpadding='2'><tr><td>";
                		strListBoxes += "													<select size='1' name='select_uni' style='font-size: 10px; width: 120px;'>";
                		strListBoxes += "														<option value='0' selected>Universe: auto</option>";
                		strListBoxes += "														<option value='101'>Andromeda</option>";
                		strListBoxes += "														<option value='102'>Barym</option>";
                		strListBoxes += "														<option value='103'>Capella</option>";
                		strListBoxes += "														<option value='104'>Draco</option>";
                		strListBoxes += "														<option value='105'>Electra</option>";
                		strListBoxes += "														<option value='106'>Fornax</option>";
                		strListBoxes += "														<option value='107'>Gemini</option>";
                		strListBoxes += "														<option value='108'>Hydra</option>";
                		strListBoxes += "														<option value='109'>Io</option>";
                		strListBoxes += "														<option value='110'>Jupiter</option>";
                		strListBoxes += "														<option value='111'>Kassiopeia</option>";
                		strListBoxes += "														<option value='112'>Leo</option>";
                		strListBoxes += "														<option value='113'>Mizar</option>";
                		strListBoxes += "														<option value='114'>Nekkar</option>";
                		strListBoxes += "														<option value='115'>Orion</option>";
                		strListBoxes += "														<option value='116'>Pegasus</option>";
                		strListBoxes += "														<option value='117'>Quantum</option>";
                		strListBoxes += "														<option value='118'>Rigel</option>";
                		strListBoxes += "														<option value='119'>Sirius</option>";
                		strListBoxes += "														<option value='120'>Taurus</option>";
                		strListBoxes += "														<option value='121'>Ursa</option>";
                		strListBoxes += "														<option value='122'>Vega</option>";
                		strListBoxes += "														<option value='123'>Wasat</option>";
                		strListBoxes += "														<option value='124'>Xalynth</option>";
                		strListBoxes += "														<option value='125'>Yakini</option>";
                		strListBoxes += "														<option value='126'>Zagadra</option>";
                														for (var i = 1; i < 101; i++)
                															strListBoxes += "<option value='" + i + "'>" + i + ". Universe</option>";
                		strListBoxes += "							</select>";
                		strListBoxes += "													<td></td></td><td>";
                		strListBoxes += "													<select size='1' name='select_domain' style='font-size: 10px; width: 120px;'>";
                		strListBoxes += "														<option value='0' selected>Domain: auto</option>";
                		strListBoxes += "														<option value='AR'>AR</option>";
                		strListBoxes += "														<option value='BG'>BG</option>";
                		strListBoxes += "														<option value='BR'>BR</option>";
                		strListBoxes += "														<option value='HU'>HU</option>";
                		strListBoxes += "														<option value='DE'>DE</option>";
                		strListBoxes += "														<option value='GR'>GR</option>";
                		strListBoxes += "														<option value='DK'>DK</option>";
                		strListBoxes += "														<option value='ES'>ES</option>";
                		strListBoxes += "														<option value='IT'>IT</option>";
                		strListBoxes += "														<option value='LV'>LV</option>";
                		strListBoxes += "														<option value='LT'>LT</option>";
                		strListBoxes += "														<option value='MX'>MX</option>";
                		strListBoxes += "														<option value='NL'>NL</option>";
                		strListBoxes += "														<option value='NO'>NO</option>";
                		strListBoxes += "														<option value='ORG'>ORG</option>";
                		strListBoxes += "														<option value='PL'>PL</option>";
                		strListBoxes += "														<option value='PT'>PT</option>";
                		strListBoxes += "														<option value='RU'>RU</option>";
                		strListBoxes += "														<option value='RO'>RO</option>";
                		strListBoxes += "														<option value='US'>US</option>";
                		strListBoxes += "														<option value='SK'>SK</option>";
                		strListBoxes += "														<option value='SI'>SI</option>";
                		strListBoxes += "														<option value='TW'>TW</option>";
                		strListBoxes += "														<option value='TR'>TR</option>";
                		strListBoxes += "														<option value='FI'>FI</option>";
                		strListBoxes += "														<option value='FR'>FR</option>";
                		strListBoxes += "														<option value='CZ'>CZ</option>";
                		strListBoxes += "														<option value='SE'>SE</option>";
                		strListBoxes += "														<option value='JP'>JP</option>";
                		strListBoxes += "													</select>";
                		strListBoxes += "													</td></tr><tr height='4'><td></td><td width='4'></td><td></td></tr><tr><td>";
                		strListBoxes += "													<select size='1' name='select_skin' style='font-size: 10px; width: 120px;'>";
                		strListBoxes += "														<option value='logserver_v20' selected>Skin: LogServer v2</option>";
                		strListBoxes += "														<option value='0'>Default</option>";
                		strListBoxes += "														<option value='original'>Original</option>";
                		strListBoxes += "														<option value='abstract'>Abstract</option>";
                		strListBoxes += "														<option value='animex'>AnimeX</option>";
                		strListBoxes += "														<option value='animex_2'>AnimeX 2</option>";
                		strListBoxes += "														<option value='chaos'>Chaos</option>";
                 		strListBoxes += "														<option value='destroyer'>Destroyer</option>";
                 		strListBoxes += "														<option value='fallout'>Fallout</option>";
                 		strListBoxes += "														<option value='dead_space'>Dead Space</option>";
                		strListBoxes += "														<option value='ntrvr'>¿ntrvr[!]</option>";
                 		strListBoxes += "														<option value='disturbed'>Disturbed</option>";
                		strListBoxes += "														<option value='staticx'>Static-X</option>";
                		strListBoxes += "														<option value='system_shock'>System shock</option>";
                		strListBoxes += "														<option value='bender'>Bender</option>";
                		strListBoxes += "													</select>";
                		strListBoxes += "													<td></td></td><td>";
                		strListBoxes += "													<select style='display: none' size='1' name='lang' style='font-size: 10px; width: 120px;'>";
                		strListBoxes += "														<option value='0' selected>Language: auto</option>";
                		strListBoxes += "														<option value='bg'>Bulgarian</option>";
                		strListBoxes += "														<option value='de'>German</option>";
                		strListBoxes += "														<option value='en'>English</option>";
                		strListBoxes += "														<option value='ru'>Russian</option>";
                		strListBoxes += "														<option value='ua'>Ukrainian</option>";
                		strListBoxes += "													</select>";
                		strListBoxes += "													</td></tr></table>";

                		strUploadDiv += "		<tr>";
                		strUploadDiv += "									<td align='left'>";
                		strUploadDiv += "										<table border='0' style='border-collapse: collapse' width='754'>";
                		strUploadDiv += "											<tr>";
                		strUploadDiv += "												<td align='left' valign='top'>";
                		strUploadDiv += 													 strCheckBoxes;
                		strUploadDiv += "												</td>";
                		strUploadDiv += "												<td width='10'></td>";
                		strUploadDiv += "												<td align='right' valign='top'>";
                		strUploadDiv += "													<div id='exsettings' style='display: block;'>";
                		strUploadDiv += "														<table border='0' style='border-collapse: collapse'>";
                		strUploadDiv += "															<tr>";
                		strUploadDiv += "																<td>";
                		strUploadDiv += "																	<input type='checkbox' name='cbx_ipm' value='ON' onchange='(this.checked) ? (document.getElementById(\"text_ipm\").disabled = false) : (document.getElementById(\"text_ipm\").disabled = true)'><font color='#888888' face='Arial' size='2'>" + Calculate_IPMs + " </font>";
                		strUploadDiv += "																	<input disabled type='text' id='text_ipm' name='text_ipm' size='5' value='' style='width: 20; font-size: 12px; font-family: Arial; color: #000000; background-color: #ffffff; border: 1px solid #888888;'>";
                		strUploadDiv += "																	<br>";
                		strUploadDiv += "																	<input type='checkbox' name='cbx_fuel' value='ON'><font color='#888888' face='Arial' size='2'>" + Calc_deuterium + "</font>";
                		strUploadDiv += "																</td>";
                		strUploadDiv += "																<td width='10'></td>";
                		strUploadDiv += "																<td>";
                		strUploadDiv += 																	 strListBoxes;
                		strUploadDiv += "																</td>";
                		strUploadDiv += "															</tr>";
                		strUploadDiv += "														</table>";
                		strUploadDiv += "													</div>";
                		strUploadDiv += "												</td>";
                		strUploadDiv += "											</tr>";
                		strUploadDiv += "										</table>";
                		strUploadDiv += "									</td>";
                		strUploadDiv += "								</tr>";

                		strUploadDiv += "		<tr>";
                		strUploadDiv += "			<td>";
                		strUploadDiv += "				<center>";
                		strUploadDiv += "					<input class='btn_blue' type='submit' value='" + Upload + "' name='submit'>";
                		strUploadDiv += "				</center>";
                		strUploadDiv += "			</td>";
                		strUploadDiv += "		</tr>";
                		strUploadDiv += "	</table>";
                		strUploadDiv += "</center>";
                		strUploadDiv += "</form>";

                	var objDiv = document.createElement("div");
                		objDiv.id = 'logserver_combat_result';
                		objDiv.style.display = 'none';
                		objDiv.className = 'upload_div';
                		objDiv.innerHTML = strUploadDiv;

                	var objButton = document.createElement("input");
                		objButton.id = "logserver_plugin_button";
                		objButton.className = "btn_blue";
                		objButton.type = "button";
                		objButton.value = LogServer_plugin + " ▼";
                		objButton.addEventListener("click", ShowHideUploadDiv, false);

                	var objCenter = document.createElement("center");

                    var combat_result = document.getElementById('combat_result');
                	objCenter.appendChild(objButton);
                	combat_result.appendChild(objCenter);
                	combat_result.appendChild(objDiv);
                    });
    			}
    			else if (ajaxOptions.url.indexOf ("page=showmessage") >= 0)
    			{
    				$ (".overlayDiv > .showmessage .note").each (function ()
    				{
    					var attack = document.getElementsByClassName('attack')[0];

                        if (attack) {
                    	var strMsgLogServerURL = "http://msg.logserver.net/index.php";
                    	var theHref = document.location.href;
                    	var strHTML = document.getElementsByClassName("showmessage")[0].innerHTML;

                    	strPattern = "<.+?>";
                    	while (strHTML.search(new RegExp(strPattern)) != -1)
                    		strHTML = strHTML.replace(new RegExp(strPattern), "");

                    	strPattern = "<script.+?</script>";
                    	while (strHTML.search(new RegExp(strPattern)) != -1)
                    		strHTML = strHTML.replace(new RegExp(strPattern), "");

                    	var strUploadDiv = "";
                    		strUploadDiv += "<form name='upload_form' id='upload_form' target='_blank' enctype='multipart/form-data' action='" + strMsgLogServerURL + "' method='post'>";
                    		strUploadDiv += "<textarea rows='1' name='theHref' cols='160' style='display: none;'>" + theHref + "</textarea>";
                    		strUploadDiv += "<textarea rows='1' name='report' cols='160' style='display: none;'>" + strHTML + "</textarea>";
                    		strUploadDiv += "<center>";
                    		strUploadDiv += "	<table border='1'>";
                    		strUploadDiv += "		<tr>";
                    		strUploadDiv += "			<center><font color='#00DD00'><b>LogServer.net " + upload_form + "</b></font></center>";
                    		strUploadDiv += "		</tr>";
                    		strUploadDiv += "		<tr>";
                    		strUploadDiv += "			<td align='center'>";
                    		strUploadDiv +=                 Comment + "<br />";
                    		strUploadDiv += "				<textarea rows='2' name='comment' cols='132' style='font-size: 10px; font-family: Arial; color:#888888; background-color:#000000; border-style:solid; border: 1px solid #888888;' onclick='this.setAttribute(\"rows\", 4); if (this.innerHTML==\"*\") this.innerHTML=\"\"'></textarea>";
                    		strUploadDiv += "			</td>";
                    		strUploadDiv += "		</tr>";
                    		strUploadDiv += "		<tr align='center'>";
                    		strUploadDiv += "			<td>";
                    		strUploadDiv += "					<input class='btn_blue' type='submit' value='" + Upload + "' name='submit'>";
                    		strUploadDiv += "			</td>";
                    		strUploadDiv += "		</tr>";
                    		strUploadDiv += "	</table>";
                    		strUploadDiv += "</center>";
                    		strUploadDiv += "</form>";

                    	var objDiv = document.createElement("div");
                    		objDiv.id = 'logserver_combat_result';
                    		objDiv.style.display = 'none';
                    		objDiv.className = 'upload_div';
                    		objDiv.innerHTML = strUploadDiv;

                    	var objButton = document.createElement("input");
                    		objButton.id = "logserver_plugin_button";
                    		objButton.className = "btn_blue";
                    		objButton.type = "button";
                    		objButton.value = LogServer_plugin + " ▼";
                    		objButton.addEventListener("click", ShowHideUploadDiv, false);

                        var objCenter = document.createElement("center");

                        var message = document.getElementsByClassName('showmessage')[0];
                        if (message)
                        {
                    	    objCenter.appendChild(objButton);
                    	    message.appendChild(objCenter);
                    	    message.appendChild(objDiv);
                        }
                    }
    			});
    		}
    	});

    function ShowHideUploadDiv() {
    	var objDiv = document.getElementById("logserver_combat_result");
    	var objButton = document.getElementById("logserver_plugin_button");

    	if (objDiv.style.display == "none") {
    		objDiv.style.display = "";
    		objButton.value = objButton.value.replace("▼", "▲");
    		window.moveTo(0, 0);
    		window.resizeTo(screen.availWidth, screen.availHeight);
    	}
    	else {
    		objDiv.style.display = "none";
    		objButton.value = objButton.value.replace("▲", "▼");
    	}
    }

    function getCookie(name) {
    	var cookie = " " + document.cookie;
    	var search = " " + name + "=";
    	var setStr = null;
    	var offset = 0;
    	var end = 0;
    	if (cookie.length > 0) {
    		offset = cookie.indexOf(search);
    		if (offset != -1) {
    			offset += search.length;
    			end = cookie.indexOf(";", offset)
    			if (end == -1) {
    				end = cookie.length;
    			}
    			setStr = unescape(cookie.substring(offset, end));
    		}
    	}
    	return(setStr);
    }
}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
}) ();