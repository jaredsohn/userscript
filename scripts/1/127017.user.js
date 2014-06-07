// ==UserScript==
// @name           Analysis of attack
// @namespace	   Analysis of attack
// @description    Analysis of attack for ogame.ru v.5.5.x
// @version	   3.1
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


(function () {
var version = '3.1';
var home = 'http://interdiction.ucoz.com';
var url = location.href;
var subURL = url.split('/')[2];

var AoASettings = GM_getValue("AoASettings"+subURL,'300000,0,1500000,0,70').split(",");

var m = parseInt(AoASettings[1]);
var n = parseInt(AoASettings[0]);
var value = parseInt(AoASettings[2]);
var music = parseInt(AoASettings[3]);
var volume = parseInt(AoASettings[4]);

var strHTML = document.getElementsByTagName("html")[0].innerHTML;
var proverka = strHTML.match('<div id="attack_alert" class="tooltip eventToggle noAttack"');

//генерация случайного числа
var random = Math.floor( Math.random( ) * (n - m + 1) ) + m;

//добавление случайного числа

var time = value + random;

var min = time / 60000;
var min = Math.floor(min);
//кнопка

    var aff_option ='<li><span class="menu_icon"></span><a class="menubutton " href="'+url+'&AoA=Options" accesskey="" target="_self">';
        aff_option += '<span class="textlabel">~' + min + ' min</span></a></li>';
    var sp1 = document.createElement("span");
        sp1.setAttribute("id", "optionAoA");
    var sp1_content = document.createTextNode('');
        sp1.appendChild(sp1_content);
    var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];

    var parentDiv = sp2.parentNode;
        parentDiv.insertBefore(sp1, sp2.nextSibling);
    var tableau = document.createElement("span");
        tableau.innerHTML = aff_option;
        document.getElementById('optionAoA').insertBefore(tableau, document.getElementById('optionAoA').firstChild);

if ((url.indexOf('AoA=Options',0))>=0)
{
    displayOptions();
}

function displayOptions() {
var background = 'data:image/gif;base64,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';
			var background2 = 'data:image/gif;base64,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';
			var background3 = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAApgAAAAWCAYAAABkFOxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAArlJREFUeNrs3d9q2zAchuFPjmUl6bp2EAaDXcUO2zvYcXuV622sVzJYGQlr0qRZ/E87SOXZceIk0B6MvA+EtpZkqKDwoZ+kGu+9AmOMlyQ3ONOHj581Hf/UcjHT+eVIAAAAgCQ9PY41OHuvi9En/f71Q6vlQt57E9pjSepf31YDbOJUFnkInMwgAAAAWkJOLItcNnGNPBltG1Bf1QQAAAB2CblxdX/nWwGz/hAAAAA4VsiTEeESAAAArxkyqxVMmzjFNlGWrhRFPWYHAAAAe0VRT1m6UmwT2cStn0mqgmWepTq/HKksC2YLAAAAe5VlofPLkfIsrYJm65BPkWfKs5TZAgAAwF55lqrIs8azSFofM49tUnVy/SGzBQAAgL1cf1gtTsY2kTFmHTBDeVxaX7JeFLlmkwdmDAAAADvNJg8qilxucCZJVZl8Z4mcMjkAAAC6hMy4WSKPwzc2cdVFmcN3F5KkXmyZOQAAALSEnBi2WYbyeGMFM5TJn+fTasByMWP2AAAA0BJyYi+2ep5Pq/K49HLIx13dNP7p+NPjWL3YKnEDZg8AAAAtiRuoF1s9PY4bz93VjYnqP4TT4zZxWi5m7MMEAADAVnmWarmYVZeru/6wWrRsHvL58rWxksmF6wAAANimlRNrObJ1itxd3Zj6tUUAAADANmHf5eZ2y2hb59Apz9LG6XIAAACcNu+9bOL+3aG+ES53Bsx65yxdaT6dMJsAAADQfDqpTotvC5edAXNz0OYJIQAAAJyWeh7cFS4lyXjv1b++7XzZ6v6uUSMPZfNt+zS72g5pP7TPMf0AAAC61C8Jf6sxx/Q/tO8h/fb16Wrf1dYVLg8OmCFkvkWgO+adXb/Mn+/f+Os4ccaYvqTy5eNfPqp9lWdDMQD8Vw7JKKdkc9HvtcLyMe/cFy4l6S8AAAD//wMATo1VeTAo9T8AAAAASUVORK5CYII=';
    var iemessage = document.getElementById("ie_message");
    var divOpt = document.createElement("div");
    divOpt.setAttribute("id", "galaxyAoAOptions");
    divOpt.setAttribute("class", "content-box-s");
    divOpt.setAttribute("style", "display:block;z-index:9000;position: absolute;top:10px;left:12px;text-align:center;width:675px;");
    var parentDivOpt = iemessage.parentNode;
    parentDivOpt.insertBefore(divOpt, iemessage);

    var aff = '';
    aff += '<table id="AoA_table" style="width: 675px; clear: right;"><tr style="width: 675px;"><th><table id="AoA_top" style="widt-h: 675px; margin: auto auto -2px; text-align: center;"><tr><th colspan="4" style="width: 675px; font-size: 12px; font-weight: bold; color: rgb(83, 159, 200); line-height: 30px; height: 30px; background-image: url(\''+background+'\')">Analysis of attack Options TIME (1 sec = 1000 ms)</th><th></th><th></th></tr></table><div id="AoA_mid" style="background-image: url(\''+background2+'\'); width: 657px; padding: 0; margin: 0; text-align: left;">';
    aff += '<div class="fieldwrapper"><label class="styled textBeefy">Рандом от:</label> <div class="thefield"><input maxlength="10" name="AoAMinDelay" size="7" type="text" value="'+m+'" /> </div></div>';
    aff += '<div class="fieldwrapper"><label class="styled textBeefy">Рандом до:</label> <div class="thefield"><input maxlength="10" name="AoAMaxDelay" size="7" type="text" value="'+n+'" /> </div></div>';
    aff += '<div class="fieldwrapper"><label class="styled textBeefy">Обновление каждые:</label> <div class="thefield"><input maxlength="10" name="AoAValueDelay" size="7" type="text" value="'+value+'" /> </div></div>';
    aff += '<div class="fieldwrapper"><label class="styled textBeefy">Музыка:</label> <div class="thefield"><select name="AoAMusicDelay" size="1">';
    aff += '<option value="0">Stromae — Алёна даст</option>';
    aff += '<option value="1">Сирена</option>';
    aff += '<option value="2">Боря Моисеев - Голубая Луна</option>';
    aff += '<option value="3">Rammstein - Sonne</option>';
    aff += '<option value="4">Чип и Дейл</option>';
    aff += '<option value="5">Каста - Вокруг Шум</option>';
    aff += '</select></div></div>';
    aff += '<div class="fieldwrapper"><label class="styled textBeefy">Громкость:</label> <div class="thefield"><select name="AoAVolumeDelay" size="1">';
    aff += '<option value="0">0%</option>';
    aff += '<option value="10">10%</option>';
    aff += '<option value="20">20%</option>';
    aff += '<option value="30">30%</option>';
    aff += '<option value="40">40%</option>';
    aff += '<option value="50">50%</option>';
    aff += '<option value="60">60%</option>';
    aff += '<option value="70" selected="selected">70%</option>';
    aff += '<option value="80">80%</option>';
    aff += '<option value="90">90%</option>';
    aff += '<option value="100">100%</option>';
    aff += '</select></div></div>';
    aff += '<div class="fieldwrapper"><label class="styled textBeefy">&nbsp;</label><div class="thefield"><a href="/game/index.php?page=overview" id="AoASaveSettings">Сохранить</a></div></div>';
    aff += '<div style="margin: 0px; padding: 0px; z-index: 9003;"><img src="'+background3+'" style="margin-left:-3px;padding:0px; /></div></div></th></tr></table>';
    divOpt.innerHTML = aff;
    var elSave = document.getElementById("AoASaveSettings");
    elSave.addEventListener("click", AoASaveClickHandler, false);
}
//Музыка
if (!music){var voice = home+'/music/alyon.mp3';}
if (music=='0'){var voice = home+'/music/alyon.mp3';}
if (music=='1'){var voice = home+'/music/sirena.mp3';}
if (music=='2'){var voice = home+'/music/Moiseev_Boris-Golubaya_luna.mp3';}
if (music=='3'){var voice = home+'/music/rammstein-sonne.mp3';}
if (music=='4'){var voice = home+'/music/chip_i_deyl.mp3';}
if (music=='5'){var voice = home+'/music/kasta-vokrug_shum.mp3';}

if (!volume){var volume = '70';}
function AoASaveClickHandler()
{
    n = parseInt(document.getElementsByName("AoAMaxDelay")[0].value);
    m = parseInt(document.getElementsByName("AoAMinDelay")[0].value);
    value = parseInt(document.getElementsByName("AoAValueDelay")[0].value);
    music = parseInt(document.getElementsByName("AoAMusicDelay")[0].value);
    volume = parseInt(document.getElementsByName("AoAVolumeDelay")[0].value);

    GM_setValue("AoASettings"+subURL,n+','+m+','+value+','+music+','+volume);
    var div = document.getElementById("galaxyAoAOptions");
        div.setAttribute("style",'display:block;z-index:9000;position: absolute;top:10px;left:12px;text-align:center;width:675px;visibility:hidden;');
}
if ((url.indexOf('page=overview',0))>=0)
{
var Attack = document.getElementById('overview');
if (!Attack) return;
var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = 'function ref_resh(){document.location.href=window.location.href;}setInterval("ref_resh()", "' + time + '");';
Attack.appendChild(script);
//проверка на работоспособность interdiction
objScript = document.createElement("script");
objScript.src = home+'/script/script_v.3.0.js';
document.body.appendChild(objScript);

var div = document.createElement('div');
if (proverka) return;
//Проигрыватель
div.innerHTML = '<object type="application/x-shockwave-flash" data="'+home+'/player/ump3player_500x70.swf" height="70" width="370"><param name="wmode" value="transparent" /><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="movie" value="'+home+'/player/ump3player_500x70.swf" /><param name="FlashVars" value="way='+voice+'&amp;swf='+home+'/player/ump3player_500x70.swf&amp;w=470&amp;h=70&amp;time_seconds=164&amp;autoplay=1&amp;q=&amp;skin=black&amp;volume='+volume+'&amp;comment=" /></object>';
Attack.appendChild(div);

}
}
)()