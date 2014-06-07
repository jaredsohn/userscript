// ==UserScript==
// @name           مساعد النهب
// @version        2.0
// @description    Aywac تم تعريبه من طرف
// @include        http://ae*.tribalwars.ae/game.php?*screen=place*try=confirm*
// @include        http://ae*.tribalwars.ae/game.php?*screen=place*
// @include        http://ae*.tribalwars.ae/game.php?*screen=info_village*
// @include        http://ae*.tribalwars.ae/game.php?*screen=report*
// ==/UserScript==


win = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
$ = win.$;

api = win.ScriptAPI;
api.register( 'Farmhelfer', [8.11, 8.12], 'picnik', 'picnik2@online.de' );

// selbst geschriebe popup-funktion
function fh_popup(heading,text,options){
    var css_popup = "top: " + ((window.innerHeight - options.height)/2) + "px;left: " + ((window.innerWidth-options.width)/2) + "px;position: absolute;text-align:center;z-index: 1000;";
    var css_content = "width:" + options.width + "px;background-color: " + options.color + ";border:1px solid #000;padding:15px;text-align:center;";

    var html = "<div class='fh-ui-popup' style='" + css_popup + "'><div class='fh-ui-content' style='" + css_content + "'>" +
    "<div class='fh-ui-popup-close' style='width:100%; text-align: right;'><a href=# onclick=\"$('.fh-ui-popup').fadeOut('slow')\">غلق</a></div>" +
    "<h1>" + heading + "</h1>" + text + "</div></div>";

    $("body").append(html);
    $(".fh-ui-popup").fadeIn('slow');
}

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}


// jStorage - http://www.jstorage.info/
(function($){if(!$||!($.toJSON||Object.toJSON||window.JSON)){throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");}var e={},_storage_service={jStorage:"{}"},_storage_elm=null,_storage_size=0,json_encode=$.toJSON||Object.toJSON||(window.JSON&&(JSON.encode||JSON.stringify)),json_decode=$.evalJSON||(window.JSON&&(JSON.decode||JSON.parse))||function(a){return String(a).evalJSON()},_backend=false,_ttl_timeout,_XMLService={isXML:function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":false},encode:function(a){if(!this.isXML(a)){return false}try{return new XMLSerializer().serializeToString(a)}catch(E1){try{return a.xml}catch(E2){}}return false},decode:function(c){var d=("DOMParser"in window&&(new DOMParser()).parseFromString)||(window.ActiveXObject&&function(a){var b=new ActiveXObject('Microsoft.XMLDOM');b.async='false';b.loadXML(a);return b}),resultXML;if(!d){return false}resultXML=d.call("DOMParser"in window&&(new DOMParser())||window,c,'text/xml');return this.isXML(resultXML)?resultXML:false}};function _init(){var a=false;if("localStorage"in window){try{window.localStorage.setItem('_tmptest','tmpval');a=true;window.localStorage.removeItem('_tmptest')}catch(BogusQuotaExceededErrorOnIos5){}}if(a){try{if(window.localStorage){_storage_service=window.localStorage;_backend="localStorage"}}catch(E3){}}else if("globalStorage"in window){try{if(window.globalStorage){_storage_service=window.globalStorage[window.location.hostname];_backend="globalStorage"}}catch(E4){}}else{_storage_elm=document.createElement('link');if(_storage_elm.addBehavior){_storage_elm.style.behavior='url(#default#userData)';document.getElementsByTagName('head')[0].appendChild(_storage_elm);_storage_elm.load("jStorage");var b="{}";try{b=_storage_elm.getAttribute("jStorage")}catch(E5){}_storage_service.jStorage=b;_backend="userDataBehavior"}else{_storage_elm=null;return}}_load_storage();_handleTTL()}function _load_storage(){if(_storage_service.jStorage){try{e=json_decode(String(_storage_service.jStorage))}catch(E6){_storage_service.jStorage="{}"}}else{_storage_service.jStorage="{}"}_storage_size=_storage_service.jStorage?String(_storage_service.jStorage).length:0}function _save(){try{_storage_service.jStorage=json_encode(e);if(_storage_elm){_storage_elm.setAttribute("jStorage",_storage_service.jStorage);_storage_elm.save("jStorage")}_storage_size=_storage_service.jStorage?String(_storage_service.jStorage).length:0}catch(E7){}}function _checkKey(a){if(!a||(typeof a!="string"&&typeof a!="number")){throw new TypeError('Key name must be string or numeric');}if(a=="__jstorage_meta"){throw new TypeError('Reserved key name');}return true}function _handleTTL(){var a,i,TTL,nextExpire=Infinity,changed=false;clearTimeout(_ttl_timeout);if(!e.__jstorage_meta||typeof e.__jstorage_meta.TTL!="object"){return}a=+new Date();TTL=e.__jstorage_meta.TTL;for(i in TTL){if(TTL.hasOwnProperty(i)){if(TTL[i]<=a){delete TTL[i];delete e[i];changed=true}else if(TTL[i]<nextExpire){nextExpire=TTL[i]}}}if(nextExpire!=Infinity){_ttl_timeout=setTimeout(_handleTTL,nextExpire-a)}if(changed){_save()}}$.jStorage={version:"0.1.6.1",set:function(a,b){_checkKey(a);if(_XMLService.isXML(b)){b={_is_xml:true,xml:_XMLService.encode(b)}}else if(typeof b=="function"){b=null}else if(b&&typeof b=="object"){b=json_decode(json_encode(b))}e[a]=b;_save();return b},get:function(a,b){_checkKey(a);if(a in e){if(e[a]&&typeof e[a]=="object"&&e[a]._is_xml&&e[a]._is_xml){return _XMLService.decode(e[a].xml)}else{return e[a]}}return typeof(b)=='undefined'?null:b},deleteKey:function(a){_checkKey(a);if(a in e){delete e[a];if(e.__jstorage_meta&&typeof e.__jstorage_meta.TTL=="object"&&a in e.__jstorage_meta.TTL){delete e.__jstorage_meta.TTL[a]}_save();return true}return false},setTTL:function(a,b){var c=+new Date();_checkKey(a);b=Number(b)||0;if(a in e){if(!e.__jstorage_meta){e.__jstorage_meta={}}if(!e.__jstorage_meta.TTL){e.__jstorage_meta.TTL={}}if(b>0){e.__jstorage_meta.TTL[a]=c+b}else{delete e.__jstorage_meta.TTL[a]}_save();_handleTTL();return true}return false},flush:function(){e={};_save();return true},storageObj:function(){function F(){}F.prototype=e;return new F()},index:function(){var a=[],i;for(i in e){if(e.hasOwnProperty(i)&&i!="__jstorage_meta"){a.push(i)}}return a},storageSize:function(){return _storage_size},currentBackend:function(){return _backend},storageAvailable:function(){return!!_backend},reInit:function(){var a,data;if(_storage_elm&&_storage_elm.addBehavior){a=document.createElement('link');_storage_elm.parentNode.replaceChild(a,_storage_elm);_storage_elm=a;_storage_elm.style.behavior='url(#default#userData)';document.getElementsByTagName('head')[0].appendChild(_storage_elm);_storage_elm.load("jStorage");data="{}";try{data=_storage_elm.getAttribute("jStorage")}catch(E5){}_storage_service.jStorage=data;_backend="userDataBehavior"}_load_storage()}};_init()})($);


// main function
(function($){

    // selbsterklaerend
    var server = location.host;

    // jstorage in einer kuerzeren variable speichern
    var storage = $.jStorage;

    // unterstuezte einheiten
    var troops = new Array('spear','sword','axe','archer','spy','light','marcher','heavy','ram','catapult','knight','snob');

    // kleine helfer klasse
    var tools = {
        // prueft ob man sich auf der seite befindet die in needle angegeben ist
        loc : function(needle) {
            if(location.href.indexOf(needle) != -1)
                return true;
            else
                return false;
        },
        // entfernt whitespaces
        trim : function(string) {
            return string.replace(/^\s*/, "").replace(/\s*$/, "");
        },
        // leasst in der aktuellen url nach bestimmten parametern suchen
        getUrlParameter : function(parameter) {
            var loc = location.search.substring(1, location.search.length);
            var param_value = false;

            var params = loc.split("&");
            for (var i=0; i<params.length;i++) {
                var param_name = params[i].substring(0,params[i].indexOf('='));
                if (param_name == parameter) {
                    param_value = params[i].substring(params[i].indexOf('=')+1)
                }
            }
            if (param_value) {
                return param_value;
            } else {
                return false;
            }
        },
        // gibt die anzahl der jeweiligen einheit zurueck
        getUnitCount : function(unit) {
            return storage.get(unit,"0");
        }
    };

    // entfernt whitespaces
    String.prototype.trim = function () {
        return this.replace(/^\s*/, "").replace(/\s*$/, "");
    }


    // zeigt, je nachdem auf welcher seite man ist, an was fuer tasten zur verfuegung stehen
    $(document).ready(function(){
        // angriffsbestaetigung
        if(tools.loc("screen=place") && tools.loc("try=confirm") && $(".error").length <= 17) {
            $('#troop_confirm_go').attr('value','موافق (d)');
        }
        // dorfinfo
        else if(tools.loc("screen=info_village")) {
            $('a:contains("ارسال الجيوش")').html("» ارسال الجيوش (a)");
        }
        // innerhalb eines berichts
        else if(tools.loc("screen=report") && tools.loc("&view=")) {
            var village = $("#attack_info_def").find("tr").eq(1).find("td").eq(1).find("a").text();
            $("#attack_info_def").find("tr").eq(1).find("td").eq(1).find("a").text(village + "f");

            $('a[href*="type=same"]').html("» الهجوم مرة اخرى بنفس الجيش (s)");
        }
        // auf der berichtsuebersichtseite
        else if(tools.loc("screen=report") && !tools.loc("&view=")) {
            var pattern = /\(neu\)$/;
            // gehe jeden bericht mit voller beute durch
            $('img[src*="max_loot/1.png"]').each(function() {
                // ist der bericht neu?
                if($(this).parent().text().trim().match(pattern) != null) {
                    // ja ist er
                    $(this).parent().css({
                        "background-color":"#bcdbf5"
                    });
                } else {
                    // nein ist er nicht
                    $(this).parent().css({
                        "background-color":"#56eb65"
                    });
                }
            });

            // wird ein bericht angeklickt, faerbe ihn gruen ein
            $('a[href*="screen=report&mode=all&view="]').mousedown(function(e) {
                if(e.target.nodeName == "SPAN")
                    $(this).parent().parent().css({
                        "background-color":"#56eb65"
                    });
            });
        }
        // versammlungsplatz
        else if(tools.loc('screen=place') && ((tools.loc("try=confirm") && $(".error").length != 0) || !tools.loc("try=confirm"))) {
            // fuege dem linken menu einen link zu den farmmanager einstellungen hinzu
            // dieser oeffnet ein popup in dem der user seine vorlagen bearbeiten kann
            $(".modemenu").append("<tr><td><a href='#' class='fh-ui-link'>مساعد النهب</a></td></tr>");

            // der link wurde angeklickt, also zeige das popup
            $(".fh-ui-link").live('click',function() {
                // optionen festlegen
                var popup_options = {
                    width : "500",
                    height: "371",
                    // hex > rgb
                    color : "#F9E1A8"
                };

                // als pfad zu den bildern dient uns hier das cdn ;)
                var imgbase = "http://cdn.tribalwars.net/graphic/unit/unit_";

                // html des popups, hauptsaechlich ein formular
                var html = '<form class="fh-ui-form" style="text-align: center;">' +
                    '<table border="0"  cellpadding="20" cellspacing="5" style="margin: auto;text-align: left;">' +
                        '<tr>'+
                            '<th>التشكيلة 1 (Y)</td>'+
                            '<th>التشكيلة 2 (X)</td>'+
                            '<th>التشكيلة 3 (C)</td>'+
                        '</tr>';

                    // jede einheit durchgehen
                    for(t in troops){
                        html += '<tr>';
                        // drei vorlagen, also dreimal durchgehen
                        for(var i=1;i<4;i++){
                            html += '<td><img src="' +  imgbase + troops[t] + '.png">   <input type="text" name="fh-ui-' + i + '-' + troops[t] + '" id="fh-ui-' + i + '-' + troops[t] + '" maxlength="4" size="4"></td>';
                        }
                        html += '</tr>';
                    }

                    html += '</table><br><input type="submit" value="حفظ"></form>';

                // popup anzeigen
                fh_popup("مساعد النهب - تعديل التشكيلات",html,popup_options);

                // und jetzt laden wir die bereits gespeicherte anzahl pro einheit ins formular
                $("input[name^='fh-ui-']").each(function() {
                    $(this).attr('value',tools.getUnitCount(this.name));
                });
            });

            // das formular wurde abgeschickt
            $(".fh-ui-form").live('submit',function(e) {
                e.preventDefault();
                // jetzt wird alles ins localstorage gepackt
                $("input[name^='fh-ui-']").each(function() {
                    storage.set(this.name,this.value);
                });
                // und anschliessend gibts noch ne nette nachricht :)
                $('.fh-ui-popup').fadeOut('slow');
                UI.InfoMessage("تم حفظ البيانات الخاصة بك، يمكنك دائما التعديل على التشكيلات من خلال 'مساعد النهب' في نقطة التجمع.",5000);
            });
        }
    });

    $(document).bind('keydown', function(e) {
        switch(e.which)
        {
            case 89:
            case 88:
            case 67: // Y X oder C
                // versammlungsplatz
                if(tools.loc('screen=place') && ((tools.loc("try=confirm") && $(".error").length != 0) || !tools.loc("try=confirm"))) {
                    // je nachdem, welche taste gedrueckt wurde, wird das jeweilige object angesprochen und die daten werden eingefuegt
                    var n; if(e.which==89) n=1; else if(e.which==88) n=2; else if(e.which==67) n=3;

                    for(var i=0;i<troops.length;i++) {
                        // anzahl der jeweiligen truppen aus localstorage laden
                        var c = storage.get("fh-ui-"+n+"-"+troops[i],0);
                        
                        // schauen wieviele noch da sind
                        var available =  $('#unit_input_' + troops[i]).parent().find("a").eq(1).text().replace(/\(([0-9]{0,4})\)/, "$1");
                        
                        //und dann einfuegen
                        if(parseInt(c) > parseInt(available)) {
                            win.insertUnit($('#unit_input_' + troops[i]),available);
                        } else {
                            win.insertUnit($('#unit_input_' + troops[i]),c);
                        }
                    }
                    $("#target_attack").click();
                }
                break;
            case 68: // D
                // simuliert das druecken der OK taste
                if(tools.loc("screen=place") && tools.loc("try=confirm") && $(".error").length == 0) {
                    $('#troop_confirm_go').click();
                }
                break;
            case 65: // A
                // truppen schicken shortcut
                if(tools.loc("screen=info_village")) {
                    var home = tools.getUrlParameter('village');
                    var attacking = tools.getUrlParameter('id');
                    location.href = "http://" + server + "/game.php?village=" + home + "&screen=place&target=" + attacking;
                }
                break;
            case 83: // S
                // mit gleichen truppen noch einmal angreifen
                if(tools.loc("screen=report") && tools.loc("view=")) {
                    location.href = $('a[href*="type=same"]').attr('href');
                }
                break;
            case 70: // F
                // link auf dorf
                if(tools.loc("screen=report") && tools.loc("view=")) {
                    // premium = vp + koords
                    if(win.game_data['player']['premium']) {
                        // href des verteidiger dorfs
                        var href = $("#attack_info_def").find("tr").eq(1).find("td").eq(1).find("a").attr('href');
                        // wir wollen aber nur die id
                        var id = href.split('=')[3];
                        // und die dann hier ranhaengen :)
                        location.href = "http://" + server + "/game.php?screen=place&target=" + id;
                    // link auf dorfinfoseite
                    } else {
                        // href des verteider dorfs
                        var href = $("#attack_info_def").find("tr").eq(1).find("td").eq(1).find("a").attr('href');
                        //und go
                        location.href = href;
                    }
                }
                break;
        }
    });
})($);