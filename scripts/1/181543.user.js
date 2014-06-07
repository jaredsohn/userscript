// ==UserScript==
// @name            AutoScanning
// @namespace		AutoScanning
// @description     Автоматически сканирует солнечную систему
// @author          KamaZz *edit Interdiction
// @include         http://*-*.ogame.gameforge.com/game/index.php?page=galaxy*
// @version 		1.4.3
// @homepage 		http://userscripts.org/scripts/show/181543
// ==/UserScript==

var document = unsafeWindow.document;
var $ = unsafeWindow.$;
var galaxy = $("#galaxy_input");
var system = $("#system_input");
var rank = $("#bar li:eq(3)").text();

var htmlTable = '';
    htmlTable += '<li>';
    htmlTable += '    <span class="menu_icon">';
    htmlTable += '        <a href="#" class="tooltipRight js_hideTipOnMobile" target="_self" title="Вперёд">';
    htmlTable += '            <div class="menuImage resources" id="scanner"></div>';
    htmlTable += '        </a>';
    htmlTable += '    </span>';
    htmlTable += '      <span class="textlabel">';
    htmlTable += '          <center><input type="text" id="min" size="3" /> ';
    htmlTable += '          <input type="text" id="max" size="3" /></center>';
    htmlTable += '      </span>';
    htmlTable += '</li>';
    htmlTable += '<li>';
    htmlTable += '      <span class="textlabel">';
                                strChecked = getCookie("as_inactive");
                				if (strChecked == "false") strChecked = ""
                				else strChecked = "checked";
    htmlTable += "              <input type='checkbox' id='inactive' " + strChecked + " onchange='document.cookie=\"as_inactive=\"+this.checked+\"; expires=Monday, 01-Sep-2020 10:0:0 GMT\"' /><font color='#808080'>i/I</font>";
                                strChecked = getCookie("as_honorableTarget");
                				if (strChecked == "false") strChecked = ""
                				else strChecked = "checked";
    htmlTable += "              <input type='checkbox' id='honorableTarget' " + strChecked + " onchange='document.cookie=\"as_honorableTarget=\"+this.checked+\"; expires=Monday, 01-Sep-2020 10:0:0 GMT\"' /><font color='#FFFF66'>пп</font>";
                                strChecked = getCookie("as_white");
                				if (strChecked == "false") strChecked = ""
                				else strChecked = "checked";
    htmlTable += "              <input type='checkbox' id='white' " + strChecked + " onchange='document.cookie=\"as_white=\"+this.checked+\"; expires=Monday, 01-Sep-2020 10:0:0 GMT\"' /><font color='#FFFFFF'>бел</font>";
                                strChecked = getCookie("as_ally_own");
                				if (strChecked == "true") strChecked = "checked"
                				else strChecked = "";
    htmlTable += "              <input type='checkbox' id='ally_own' " + strChecked + " onchange='document.cookie=\"as_ally_own=\"+this.checked+\"; expires=Monday, 01-Sep-2020 10:0:0 GMT\"' /><font color='#339966'>соал</font>";
    htmlTable += '      </span>';
    htmlTable += '</li>';
    htmlTable += '<li>';
    htmlTable += '      <span class="textlabel">';
                                strChecked = getCookie("as_sc_galaxytool");
                				if (strChecked == "true") strChecked = "checked"
                				else strChecked = "";
    htmlTable += "              <div style='font-size:10px'><input type='checkbox' id='sc_galaxytool' " + strChecked + " onchange='document.cookie=\"as_sc_galaxytool=\"+this.checked+\"; expires=Monday, 01-Sep-2020 10:0:0 GMT\"' />Режим обн. Galaxytool</div>";
    htmlTable += '      </span>';
    htmlTable += '</li>';
var menuTable = document.getElementById('menuTable');
var div = document.createElement('div');
    div.innerHTML = htmlTable;
menuTable.appendChild(div);

$("#scanner").click((function() {
	var min = $("#min").val().split(':');
	var max = $("#max").val().split(':');
	galaxy.val(min[0]);
	system.val(min[1]);
	unsafeWindow.submitForm();
	setTimeout((function() {
		parse(max[0], max[1]);
	}), randomNumber(200, 1000));
}));

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

function randomNumber(m, n) {
	m = parseInt(m);
	n = parseInt(n);
	return Math.floor(Math.random() * (n - m + 1)) + m;
}

var parse = function(max_galaxy, max_system) {
    var i = 0;
    var interval = setInterval((function() {
        checkSlot();

        var checkPosPlanet = $('a[class*="tooltip js_hideTipOnMobile espionage"]');
        var row = $('tr[class*="row"]');
        if ($('#sc_galaxytool').is(':checked')) {var checkPosPlanet = false;}
        if (checkPosPlanet.length > 0) {
            if (i < row.length) {
                var posPlanet = row[i].getElementsByClassName("tooltip js_hideTipOnMobile espionage")[0];
                if (posPlanet) {
                    //проверка на свои
                    if ($('#ally_own').is(':checked')) {
                        var statusAlliance = false;
                    } else {
                        var statusAlliance = row[i].getElementsByClassName("status_abbr_ally_own")[0];
                    }

                    //var posPlanet = $('span[class*="tooltip js_hideTipOnMobile espionage"]', row[i]);
                    if (!statusAlliance) {
                        //проверка на Белые
                        if ($('#white').is(':checked')) {
                            var active = row[i].getElementsByClassName("status_abbr_active")[0];
                            if (active) {posPlanet.click();}
                        }

                        //проверка на ишки
                        if ($('#inactive').is(':checked')) {
                            var inactive = row[i].getElementsByClassName("status_abbr_inactive")[0];
                            var longinactive = row[i].getElementsByClassName("status_abbr_longinactive")[0];
                            if (inactive || longinactive) {posPlanet.click();}
                        }

                        //проверка на ПП
                        if ($('#honorableTarget').is(':checked')) {
                            var honorableTarget = row[i].getElementsByClassName("status_abbr_honorableTarget")[0];
                            if (honorableTarget) {posPlanet.click();}
                        }
                    }
                }
                row[i].style.backgroundColor = '#66FF00';
                i++;
            } else {
                clearInterval(interval);
                retry();
            }
        } else {
            clearInterval(interval);
            retry();
        }
    }), 300);

	function retry() {
		if (system.val() != max_system) {
			if (system.val() < 499) {
				unsafeWindow.submitOnKey(39);
				setTimeout((function() {
					parse(max_galaxy, max_system);
				}), randomNumber(200, 1000));
			} else {
				if (galaxy.val() != max_galaxy) {
					galaxy.val(galaxy.val() * 1 + 1);
					system.val(1);
					unsafeWindow.submitForm();
					setTimeout((function() {
						parse(max_galaxy, max_system);
					}), randomNumber(200, 1000));
				}
			}
		} else {
			if (galaxy.val() != max_galaxy) {
				galaxy.val(galaxy.val() * 1 + 1);
				system.val(1);
				unsafeWindow.submitForm();
				setTimeout((function() {
					parse(max_galaxy, max_system);
				}), randomNumber(200, 1000));
			}
		}
	}

	function checkSlot() {
        var slots = $('#slotValue').text().trim();
            slots = slots.split('/');
        var slotUsed = slots[0];
        var slotValue = slots[1];
        if (slotUsed == slotValue) {
            var slotErr = true;
        }

        var width = 0;
            width = screen.width/2 - 200;

        var strUploadErr = '';
            strUploadErr += '<div id="as_errorBox" aria-labelledby="ui-id-1" aria-describedby="errorBoxDecision" role="dialog" tabindex="-1" style="height: auto; width: 400px; top: 250px; left: '+width+'px; display: block;" class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front errorBox ui-draggable">';
            strUploadErr += '   <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span class="ui-dialog-title" id="ui-id-1">Ссылка</span><button title="close" aria-disabled="false" role="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"><span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span></button></div><div style="width: auto; min-height: 150px; max-height: none; height: auto;" id="errorBoxDecision" class="errorBox TBfixedPosition ui-dialog-content ui-widget-content">';
            strUploadErr += '   <div class="head"><h4 id="errorBoxDecisionHead">AutoScanning</h4></div>';
            strUploadErr += '   <div class="middle">';

            if (slotErr)
            strUploadErr += '       <span id="errorBoxDecisionContent">Внимание! Скрипт остановлен!<br />Нет свободных слотов для флота!</span>';

            strUploadErr += '       <div class="response">';
            strUploadErr += '           <div style="float:left; width:360px;">';
            strUploadErr += '               <a href="index.php?page=galaxy&galaxy='+galaxy.val()+'&system='+system.val()+'&avtoskan=1" class="yes"><span id="as_errorBoxDecisionYes">Ок</span></a>';
            strUploadErr += '           </div>';
            strUploadErr += '           <br class="clearfloat">';
            strUploadErr += '       </div>';
            strUploadErr += '   </div>';
            strUploadErr += '       <div class="foot"></div>';
            strUploadErr += '   </div>';
            strUploadErr += '</div>';

        if (slotErr){
            var div = document.createElement ('div');
                div.innerHTML = strUploadErr;
            document.body.appendChild(div);
            clearInterval(interval);
        }
        $("#as_errorBoxDecisionYes").click(function() {
            document.getElementById("as_errorBox").style.display = "none";
        });
    }
}
if (document.location.href.indexOf ("&avtoskan=1") > 1) {
    $("#min").val(galaxy.val() + ":" + system.val());
} else {
if (system.val() > 50)
	$("#min").val(galaxy.val() + ":" + parseInt(system.val() - 50));
else
	$("#min").val(galaxy.val() + ":" + 1);
}
if (system.val() < 449)
	$("#max").val(galaxy.val() + ":" + parseInt(system.val() * 1 + 50));
else
	$("#max").val(galaxy.val() + ":" + 499);
