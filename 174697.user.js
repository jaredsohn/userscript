// ==UserScript==
// @name        Univis Prüfungskalender
// @namespace   hbb_works
// @include     https://univis.univie.ac.at/*
// @description Fügt dem Menü im Univis einen Prüfungskalender-Eintrag hinzu, der einen Kalender öffnet, in welchem Prüfungstermine angezeigt werden.
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0r131101
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @require     http://arshaw.com/js/fullcalendar-1.6.2/fullcalendar/fullcalendar.min.js
// ==/UserScript==

// popup code based on jQuery Bubble Popup v.2.3.1 , (c) 2012 Max Vergelli, http://www.maxvergelli.com/jquery-bubble-popup/
// calendar from FullCalendar v.1.6.2 , (c) 2013 Adam Shaw, http://arshaw.com/fullcalendar/

var studies = [
//  "426.28",        // Afrikawissenschaften - STEOP
//  "382.28",        // Ägyptologie
//  "263.28",        // Altertumswissenschaften
//  "281.28",        // Altertumswissenschaften - Ergänzungsprüfungen
//  "467.28",        // An- und Abmeldefristen Masterstudium Pflegewissenschaft SS2012
//  "251.28",        // Anglistik
//  "327.28",        // Astronomie
//  "380.28",        // Aufnahmeverfahren
//  "299.28",        // Biologie
    "307.28",        // Biologie Prüfungstermine
    "318.28",        // Biologie Prüfungstermine zmb
//  "208.28",        // BIWI
//  "224.28",        // BIWI Prüfungen
//  "413.28",        // Chemie
//  "264.28",        // Deutsche Philologie
//  "291.28",        // Deutsche Philologie - Prüfungstermine
//  "340.28",        // DoktorandInnenzentrum
//  "443.28",        // Doktorat Sozialwissenschaften
//  "435.28",        // Doktorats-LVs Erdwissenschaften, Meterologie, Astronomie, SPL 45
//  "496.28",        // DSPL 43 - Philosophie und Bildungswissenschaft
//  "488.28",        // East Asian Economy and Society
//  "499.28",        // East Asian Economy and Society exams
//  "498.28",        // Environmental Sciences Prüfungstermine
//  "308.28",        // Erdwissenschaften
//  "472.28",        // Erdwissenschaften (Prüfungstermine Sekretariat)
//  "292.28",        // Ernährungswissenschaften
//  "309.28",        // Ernährungswissenschaften - Prüfungen
//  "247.28",        // Europäische Ethnologie
//  "277.28",        // Europäische Ethnologie - Prüfungen
//  "384.28",        // Evangelische Theologie
//  "385.28",        // Evangelische Theologie - Prüfungen
//  "465.28",        // Finno-Ugristik
//  "473.28",        // Finno-Ugristik - StEOP
//  "485.28",        // Gender Studies
//  "463.28",        // Geographie
//  "446.28",        // Geographie - Prüfungsanmeldung
//  "260.28",        // Geschichte
//  "476.28",        // Geschichte - Prüfungsanmeldungen
//  "395.28",        // Historisch-Kulturwissenschaftliches Doktoratsstudium - Interdisziplinäre Veranstaltungen
//  "481.28",        // Informatik und Wirtschaftsinformatik
//  "482.28",        // Informatik und Wirtschaftsinformatik VO-Prüfungstermine
//  "255.28",        // Internationale Entwicklung
//  "452.28",        // Internationale Entwicklung - Prüfungstermine
//  "365.28",        // Japanologie
//  "372.28",        // Japanologie - Prüfungsanmeldung
//  "383.28",        // Judaistik
//  "389.28",        // Katholische Theologie
//  "326.28",        // Katholische Theologie Prüfungstermine
//  "367.28",        // Koreanologie
//  "374.28",        // Koreanologie - Prüfungsanmeldung
//  "439.28",        // Kultur- und Sozialanthropologie
//  "449.28",        // Kultur- und Sozialanthropologie - Prüfungsanmeldung
//  "412.28",        // Kunstgeschichte
//  "359.28",        // Kunstgeschichte - Prüfungstermine
//  "226.28",        // LehrerInnenbildung
//  "407.28",        // LehrerInnenbildung - PÄP
//  "278.28",        // LehrerInnenbildung - Prüfungen
//  "503.28",        // Mathematik
//  "509.28",        // Mathematik Fachdidaktik
//  "363.28",        // Meteorologie
//  "456.28",        // Meteorologie (Prüfungstermine Sekretariat)
//  "511.28",        // Musikwissenschaft
//  "506.28",        // Nederlandistik
//  "453.28",        // Nederlandistik - Prüfungen
//  "337.28",        // Orientalistik
//  "376.28",        // Orientalistik - Prüfungen
//  "348.28",        // Pflegewissenschaft
//  "357.28",        // Pflegewissenschaft - Prüfungen
//  "391.28",        // Pharmazie
//  "490.28",        // Pharmazie Prüfungstermine
//  "396.28",        // Philologisch-Kulturwissenschaftliches Doktoratsstudium-SPL 42
//  "212.28",        // Philosophie
//  "223.28",        // Philosophie - Prüfungen
//  "433.28",        // Physik
//  "406.28",        // Physik - Prüfungen
//  "261.28",        // Politikwissenschaft - LV-Anmeldung
//  "311.28",        // Politikwissenschaft - Meldung der kleinen BA-Arbeit
//  "290.28",        // Politikwissenschaft - Prüfungsanmeldung
//  "386.28",        // Psychologie
//  "387.28",        // Psychologie - Prüfungen
//  "328.28",        // Publizistik- und Kommunikationswissenschaft
//  "333.28",        // Publizistik- und Kommunikationswissenschaft - Prüfungstermine
//  "214.28",        // Rechtswissenschaften
//  "375.28",        // Rechtswissenschaften - Prüfungen
//  "238.28",        // REWI Restplätze
//  "229.28",        // Romanistik
//  "402.28",        // Romanistik - Prüfungen
//  "366.28",        // Sinologie
//  "461.28",        // Sinologie - Prüfungen
//  "408.28",        // Skandinavistik
//  "454.28",        // Skandinavistik - Prüfungen
//  "419.28",        // Slawistik
//  "420.28",        // Slawistik Prüfungstermine
//  "331.28",        // Soziologie
//  "345.28",        // Soziologie - Prüfungsanmeldung
//  "257.28",        // Sportwissenschaften
//  "288.28",        // Sportwissenschaften - Prüfungen
//  "504.28",        // Sprachwissenschaft
//  "505.28",        // Sprachwissenschaft Prüfungen
//  "425.28",        // Südasien - StEOP
//  "450.28",        // Südasienkunde - Prüfungen
//  "510.28",        // Theater-, Film- und Medienwissenschaft
//  "362.28",        // Theater-, Film- und Medienwissenschaft - Prüfungen
//  "350.28",        // Theater-, Film- und Medienwissenschaft bis SoSe 2013
//  "304.28",        // Translationswissenschaft
//  "320.28",        // Translationswissenschaft - Prüfungen
//  "381.28",        // Ur- und Frühgeschichte
//  "448.28",        // Ur- und Frühgeschichte - Prüfungen
//  "427.28",        // Vergleichende Literaturwissenschaft
//  "447.28",        // Vergleichende Literaturwissenschaft - Prüfungsanmeldung
//  "379.28",        // Wissenschaftsforschung - Prüfungsanmeldung Vorlesung
//  "338.28",        // Wissenschaftsforschung - Social Studies of Science / LV-Anmeldung
//  "210.28",        // WIWI
//  "240.28",        // WIWI Prüfungen
//  "477.28",        // WIWI-Summerterm
//  "245.28",        // Z1-
//  "269.28",        // Z10 -
//  "249.28",        // Z11 -
//  "250.28",        // Z12
//  "355.28",        // Z13-
//  "253.28",        // Z2-
//  "271.28",        // Z3-
//  "274.28",        // Z4-
//  "297.28",        // Z5-
//  "315.28",        // Z6-
//  "335.28",        // Z7-
//  "325.28",        // Z8-
//  "228.28",        // Z9 -
    ""
];
studies.splice(studies.length - 1, 1);

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */
var hexcase=0;var b64pad="";function hex_sha1(a){return rstr2hex(rstr_sha1(str2rstr_utf8(a)))}function hex_hmac_sha1(a,b){return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(a),str2rstr_utf8(b)))}function sha1_vm_test(){return hex_sha1("abc").toLowerCase()=="a9993e364706816aba3e25717850c26c9cd0d89d"}function rstr_sha1(a){return binb2rstr(binb_sha1(rstr2binb(a),a.length*8))}function rstr_hmac_sha1(c,f){var e=rstr2binb(c);if(e.length>16){e=binb_sha1(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binb_sha1(a.concat(rstr2binb(f)),512+f.length*8);return binb2rstr(binb_sha1(d.concat(g),512+160))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binb(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(24-c%32)}return a}function binb2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(24-c%32))&255)}return a}function binb_sha1(v,o){v[o>>5]|=128<<(24-o%32);v[((o+64>>9)<<4)+15]=o;var y=Array(80);var u=1732584193;var s=-271733879;var r=-1732584194;var q=271733878;var p=-1009589776;for(var l=0;l<v.length;l+=16){var n=u;var m=s;var k=r;var h=q;var f=p;for(var g=0;g<80;g++){if(g<16){y[g]=v[l+g]}else{y[g]=bit_rol(y[g-3]^y[g-8]^y[g-14]^y[g-16],1)}var z=safe_add(safe_add(bit_rol(u,5),sha1_ft(g,s,r,q)),safe_add(safe_add(p,y[g]),sha1_kt(g)));p=q;q=r;r=bit_rol(s,30);s=u;u=z}u=safe_add(u,n);s=safe_add(s,m);r=safe_add(r,k);q=safe_add(q,h);p=safe_add(p,f)}return Array(u,s,r,q,p)}function sha1_ft(e,a,g,f){if(e<20){return(a&g)|((~a)&f)}if(e<40){return a^g^f}if(e<60){return(a&g)|(a&f)|(g&f)}return a^g^f}function sha1_kt(a){return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};

var doc = document;

function isLoggedIn (context) {
    context = context || doc;
    // has logout link
    return context.evaluate('.//div[@id="hotlinks"]//td[@class="right"]/a', context.body, null, 0, null).iterateNext() != null
}

if (isLoggedIn()) {
    var user = hex_sha1($('#hotlinks td.right').text().match(/: (a\d{7})/)[1]);
    
    var url = 'https://univis.univie.ac.at/jbrush_portal/flow/customcalendar';

    $('.toplinks').append('<li><a href="' + url + '">Prüfungskalender</a></li>');
    
    if (doc.URL.match(url) != null) {        
        $('.struct-content').html('<div id="content" style="max-width:none"><div id="canvas"><div id="calendar"></div></div><table id="examsList" style="display:none"></table><iframe style="display:none" id="calendarLoadingFrame"></iframe></div>');
        
        /*//////////////
        // iFrame for loading exams (loading through ajax messes up the encoding)
        */
        
        var iframe = document.getElementById('calendarLoadingFrame');
        
        function iframeDoc() {
            return iframe.contentWindow.document;
        }
        function form() {
            return iframeDoc().forms['default'];
        }
        
        /*//////////////
        // Navigating within iFrame to access exams
        */
        
        // simulate click on "Application to courses/exams"
        function applicationToCourses (directorOfStudiesKeys, callback) {
            var i = 0;     
            var url = 'https://univis.univie.ac.at/as_anmeldung/';
            function nextDirector() {
                $(iframe).one('load', function () {
                    // check whether still logged in
                    if (!isLoggedIn(iframeDoc())) {
                        //window.location.href = "https://univis.univie.ac.at";
                        return;
                    }
                    
                    // get exams already applied to
                    if (i == 0) {
                        $('#examsList').append($(form()).find("tr.odd:has(td:contains('PR')), tr.even:has(td:contains('PR'))"));
                    }
                                        
                    newRegistration(directorOfStudiesKeys[i++], function () { 
                        if (i < directorOfStudiesKeys.length)
                            nextDirector();
                        else if (callback != null) {
                            callback.call();
                        }
                    });
                });
                    
                iframe.src = url;
            }
            
            if (typeof(directorOfStudiesKeys) == 'string') {
                directorOfStudiesKeys = [directorOfStudiesKeys];
            }
            if (directorOfStudiesKeys.length == 0)
                return;
            nextDirector();
        }
        
        // simulate click on "new registration"
        function newRegistration (directorOfStudiesKey, callback) {
            form().elements['_eventId'].value = 'new';
            $(iframe).one('load', function () {
                search(false, directorOfStudiesKey, callback);
            });
            form().submit();
        }
        
        // simulate click on "search" or "next", exams are loaded into a hidden table
        function search (nextPage, directorOfStudiesKey, callback) {    
            form().elements['_search_args_select_cluster_objectList'].value = directorOfStudiesKey;
            form().elements['_search_args_select_typ_objectList'].value = '231.0'; // Prüfungstermine
            form().elements['_search_args_select_semester_objectList'].value = ''; // Semester
            form().elements['_eventId'].value = nextPage === true ? 'next' : 'search';
            $(iframe).one('load', function () {
                $('#examsList').append($(form()).find("tr.odd, tr.even"));
                
                // has next page
                if ( $(form()).find("a[href*='next']").length >= 1) {
                    search(true, directorOfStudiesKey, callback);
                }
                else if (callback != null) {
                    callback.call();
                }        
            });
            form().submit();
        }
        
        /*//////////////
        // Calendar
        */
        var minHeight = 400;
        function canvasAspectRatio () {
            return $('#content').width() / 
                    Math.max(
                        ($(window).height() - 
                             $('#header').height() - 
                             $('#balken').height() - 
                             $('#footer').height() - 
                             90), 
                         minHeight
                     ); // 90px cal header, margins, etc.
        }    
            
        $('#calendar').fullCalendar({
            aspectRatio: canvasAspectRatio(),
            firstDay: 1,
            alwaysVisible: false,
            header: { left: 'title', right: 'today prev,next month,basicWeek' },
            eventMouseover: function (event, jsEvent, view) {
                showEventPopup($(jsEvent.delegateTarget), event);
            },
            eventClick: function (event, jsEvent, view) {
                showEventPopup($(jsEvent.delegateTarget), event);
            },
            eventRender: function (event, element, view) {
                element.attr('id', event.id);
            },
            loading: function (isLoading, view) {
                // prevent jumpiness syndrome, fix scrollposition
                if (!isLoading) 
                    $('#canvas').css('height', '');
            }
        })
        
        $(window).resize(function() {
            $('#calendar').fullCalendar('option', 'aspectRatio', canvasAspectRatio());
        });
                
        function toggleEventMarked (eventId) {
            var eventsList = $('#calendar').fullCalendar('clientEvents');
            for (var i = 0; i < eventsList.length; i++) {
                var event = eventsList[i];
                if (event.id == eventId) {
                    if (event.className == null || event.className.indexOf('fc-event-marked') == -1) {
                        if (event.className == null)
                            event.className = ['fc-event-marked'];
                        else 
                            event.className.push('fc-event-marked');
                    }
                    else {
                        event.className.splice(event.className.indexOf('fc-event-marked'), 1);
                    }
                }
                event.source = undefined;
            }
            save('events', eventsList);
            refreshCalendar();
        }
        
        function parse (eventText) {
            var date, type, title, id, applied = null;
            date = eventText.match(/\s((\d\d)\.(\d\d)\.(\d\d\d\d))(&nbsp;|\s)/);
            title = eventText.match(/(Fachprüfung|LV-Prüfung)(&nbsp;)?\s*?((.|\n)*?)(&nbsp;|; \d\d.\d\d.\d\d\d\d)/);
            id = eventText.match(/<a .*?value = (\d+)\.\d\d/);
            if (id == null) {
                id = eventText.match(/'(\d+)\.\d\d|view'/);
                if (id != null) {
                    applied = " ";
                    if (eventText.match(/angemeldet/)) {
                        applied = "status-angemeldet";
                    }
                    else if (eventText.match(/abgeschlossen/)) {
                        applied = "status-abgeschlossen";
                    }
                    else if (eventText.match(/vorgemerkt/)) {
                        applied = "status-vorgemerkt";
                    }
                }
            }
            
            if (date != null && title != null && id != null) {
                date = date[4]+'-'+date[3]+'-'+date[2];
                type = title[1];
                title = title[3].replace(/(<br>|<br\/>|&nbsp;|<b>|<\/b>|\n)/, ' ');
                id = id[1];
                return {
                      id: id,
                      title: title,
                      allDay: true,
                      start: $.fullCalendar.parseDate(date),
                      text: $('<tr>'+eventText+'</tr>').find('td.column.max').html(),
                      className: applied ? ['fc-event-applied', applied] : []
                };
            }
            return null;
        }    
        
        /*//////////////
        // reload button
        */
        
        var reloadButton = $('<span>').addClass('fc-button fc-state-default fc-corner-left fc-corner-right')
                                .append($('<span>').addClass('fc-button-inner')
                                    .append($('<span>').addClass('fc-button-content').text('Update'))
                                    .append($('<span>').addClass('fc-button-effect')
                                        .append($('<span>'))
                                    )
                                );
        $('.fc-header-center').append(reloadButton);
        
        reloadButton.hover(function () {
            $(this).addClass('fc-state-hover');
        }, function () {
            $(this).removeClass('fc-state-hover');
        }).mousedown(function () {
            $(this).addClass('fc-state-down');
        }).mouseup(function () {
            $(this).removeClass('fc-state-down');
        }).mouseleave(function () {
            $(this).removeClass('fc-state-down');
        });
        
        reloadButton.mouseenter(function () {
            showPopup('lastupdate', reloadButton, reloadButton[0].popupText);
        })
        
        reloadButton[0].popupText = 'Letztes Update: nie';
        
        reloadButton.click(function () {
            loadEvents(studies);
        });
        
        /*//////////////
        // unmark new button
        */
        
        var readButton = $('<span>').addClass('fc-button fc-state-default fc-corner-left fc-corner-right')
                                .append($('<span>').addClass('fc-button-inner')
                                    .append($('<span>').addClass('fc-button-content').text('Unmark new'))
                                    .append($('<span>').addClass('fc-button-effect')
                                        .append($('<span>'))
                                    )
                                );
        $('.fc-header-center').append(readButton);
        
        readButton.hover(function () {
            $(this).addClass('fc-state-hover');
        }, function () {
            $(this).removeClass('fc-state-hover');
        }).mousedown(function () {
            $(this).addClass('fc-state-down');
        }).mouseup(function () {
            $(this).removeClass('fc-state-down');
        }).mouseleave(function () {
            $(this).removeClass('fc-state-down');
        });
                
        readButton.click(function () {            
            var eventsList = $('#calendar').fullCalendar('clientEvents');
            for (var i = 0; i < eventsList.length; i++) {
                var event = eventsList[i];
                
                if (event.className != null && event.className.indexOf('fc-event-new') > -1) {
                    event.className.splice(event.className.indexOf('fc-event-new'), 1);
                }
                // prevent circular reference to allow serializing and saving
                event.source = undefined;
            }
            save('events', eventsList);
            refreshCalendar();
        });
        
        /*//////////////
        // Popup
        */
        
        function showEventPopup (target, event) {
            var buttons;
            if (event.className == null || event.className.indexOf('fc-event-marked') == -1) 
                buttons = '<div class="button-bar"><a href="#" id="toggle_marked_button">mark</a></div>';
            else
                buttons = '<div class="button-bar"><a href="#" id="toggle_marked_button">unmark</a></div>';
                
            showPopup('event', target, event.text + buttons);
            
            $('#toggle_marked_button').off('click').click(function (e) {
                var popup = $('#event-popup');
                if (popup.length > 0)
                    popup[0].close();
                toggleEventMarked(event.id);
                e.stopImmediatePropagation()
                e.preventDefault();               
                false;
            });
        }
        
        function showPopup (id, target, innerHtml) {         
            // create popup
            if ($('#'+id+'-popup').length == 0) {
                var mainDiv = $('<div>').attr('id', ''+id+'-popup').addClass('jquerybubblepopup').css({
                    'position': 'absolute',
                    'max-width': '400px',
                    'opacity': 0
                }).append(
                    $('<table>').append(
                        $('<tr>').append(
                            $('<td>').addClass('jquerybubblepopup-top-left'),
                            $('<td>').addClass('jquerybubblepopup-top-middle'),
                            $('<td>').addClass('jquerybubblepopup-top-right')
                        ),                    
                        $('<tr>').append(
                            $('<td>').addClass('jquerybubblepopup-middle-left'),
                            $('<td>').addClass('jquerybubblepopup-innerHtml'),
                            $('<td>').addClass('jquerybubblepopup-middle-right')
                        ),                    
                        $('<tr>').append(
                            $('<td>').addClass('jquerybubblepopup-bottom-left'),
                            $('<td>').addClass('jquerybubblepopup-bottom-middle').append(
                                $('<div>').addClass('jquerybubblepopup-tail').html('&nbsp;')
                            ),
                            $('<td>').addClass('jquerybubblepopup-bottom-right')
                        )                    
                    )
                );
                $(document.body).append(mainDiv);
            }
            
            var popup = $('#'+id+'-popup');
            if (popup[0].target == target[0]) 
                return;
            popup[0].target = target[0];
            
            $('.jquerybubblepopup-innerHtml', popup).html(innerHtml);
            
            // events
            var closePopup = function (e) {
                var popup_pos = popup.offset();
                var target_pos = target.offset();
                // mouse not over popup and not over target
                if (!(popup_pos.left < e.pageX && e.pageX < popup_pos.left + popup.width() && 
                      popup_pos.top < e.pageY && e.pageY < popup_pos.top + popup.height()) &&
                    !(target_pos.left < e.pageX && e.pageX < target_pos.left + target.width() && 
                      target_pos.top < e.pageY && e.pageY < target_pos.top + target.height())) {
                    popup[0].target = null;
                    popup.stop().fadeOut(200);
                    target.unbind('mouseleave', closePopup);
                    popup.unbind('mouseleave', closePopup);
                }
            };
            target.mouseleave(closePopup);
            popup.mouseleave(closePopup);
            popup[0].close = function () {
                popup[0].target = null;
                popup.stop().fadeOut(200);
                target.unbind('mouseleave', closePopup);
                popup.unbind('mouseleave', closePopup);            
            }
            
            // center over target
            var pos = target.offset();
            popup.css('opacity', 0);
            popup.stop().show(0, function () {
                pos.top = pos.top - popup.height() + 7;
                pos.left = pos.left - popup.width()/2 + target.width()/2;
                popup.offset(pos);
                popup.css('opacity', 1);
                popup.hide(0, function () {
                    popup.stop().fadeTo(250, 1);
                });
            });
        }
        
        /*//////////////
        // Convenience functions
        */    
        function showWait () {
            $('#id_tags_wait_div').show();
        }
        function hideWait () {
            $('#id_tags_wait_div').hide();
        }
        function save (property, data) {
            GM_setValue(user + '_' + property, data.toSource());
        }
        function load (property) {
            return eval(GM_getValue(user + '_' + property));
        }
        
        /*//////////////
        // main
        */
        
        function loadEvents (directorOfStudiesKeys) {
            showWait();
            applicationToCourses(directorOfStudiesKeys, function () {
                var eventsList = $('#calendar').fullCalendar('clientEvents');
                var events = [];
                var parseFailedCounter = 0;
                $('#examsList tr.odd, #examsList tr.even').each(function (index, item) {
                    var html = $(item).html();
                    var eventObj = parse(html);
                    if (eventObj != null) {
                        events.push(eventObj);
                        for(var i = 0; i < eventsList.length; i++) {
                            if (eventObj.id == eventsList[i].id) {
                                eventObj.className = eventObj.className.concat(eventsList[i].className);
                                eventsList.splice(i, 1);
                                break;
                            }
                        }
                        if (i == eventsList.length && eventObj.className.indexOf('fc-event-applied') == -1) {
                            eventObj.className.push('fc-event-new');
                        }
                    }
                    else {
                        parseFailedCounter++;
                        console.debug("Failed parse: " + html);
                    }
                });  
                $('#examsList').html('');
                
                if (parseFailedCounter == 1)
                    alert('Achtung! Ein Termin konnte nicht verarbeitet werden und wird im Kalender nicht angezeigt.');
                else if (parseFailedCounter > 1)
                    alert('Achtung! ' + parseFailedCounter + ' Termine konnten nicht verarbeitet werden und werden im Kalender nicht angezeigt.');
                
                for(var i = 0; i < eventsList.length; i++) {
                    if (eventsList[i].className.indexOf('event-custom') != -1) {
                        events.push(eventsList[i]);
                    }
                }
                
                save('events', events);
                refreshCalendar();
                var d = new Date();
                save('lastLoadTime', d);
                setLastLoadTime(d);
                hideWait();
            });
        }
        
        function refreshCalendar (events) {
            events = events || load('events');
            if (events != null) {
                for (var i = 0; i < events.length; i++)
                    events[i].start = new Date(events[i].start);
                // prevent scrolling to top due to shrinking of the calendar after events have been removed
                $('#canvas').css('height', $('#canvas').height());
                $('#calendar').fullCalendar('removeEvents'); 
                $('#calendar').fullCalendar('addEventSource', events);
                $('#canvas').css('height', 'auto');
            }
        }
        
        function setLastLoadTime (date) {      
            date = new Date(date);
            reloadButton[0].popupText = 'Letztes Update: ' + $.fullCalendar.formatDate(date, 'dd.MM.yyyy HH:mm');
        }
        
        setLastLoadTime(load('lastLoadTime'));
        refreshCalendar();
        
        
        /*//////////////
        // styles
        */
        
        var styles = $("<style>").attr({
            type: 'text/css'
        }).text(
         	" /* popup styles*/ \
         	.jquerybubblepopup{width:auto;height:auto;margin:0px;padding:0px;position:absolute;border:0px;z-index:100;text-align:center;background-color:transparent;}  \
         	.jquerybubblepopup table{width:auto;height:auto;margin:0px;padding:0px;display:table;border-collapse:collapse;border-spacing:0px;border:0px;empty-cells:show;background-color:transparent;}  \
         	.jquerybubblepopup tbody{display:table-row-group;vertical-align:middle;border:0px;background-color:transparent;}  \
         	.jquerybubblepopup td{margin:0px;padding:0px;background-color:transparent;}  \
         	.jquerybubblepopup-top-left,    .jquerybubblepopup-top-right,  \
         	.jquerybubblepopup-bottom-left, .jquerybubblepopup-bottom-right{width:21px;height:21px;overflow:hidden;background-repeat:no-repeat;}  \
         	.jquerybubblepopup-top-middle,  .jquerybubblepopup-bottom-middle{overflow:hidden;background-repeat:repeat-x;}  \
         	.jquerybubblepopup-middle-left, .jquerybubblepopup-middle-right{overflow:hidden;background-repeat:repeat-y;}  \
         	.jquerybubblepopup-tail{height:21px;width:19px;overflow:hidden;background-repeat:no-repeat;border:0px;margin:0px;padding:0px;display:inline-block;}  \
         	.jquerybubblepopup .jquerybubblepopup-innerHtml { font-family:'Trebuchet MS',Arial; font-size:11px; font-weight:normal; color:#000000; background-color:#FFFFFF; }  \
            \
            /* popup azure theme images */ "+
         	".jquerybubblepopup-top-left {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAA3NCSVQICAjb4U/gAAAALVBMVEX///9mZmZmZmZmZmZmZmZAeaAfitEQkegFl/j////v+f/f8v+f2f8gpv8Amf8guSCbAAAAD3RSTlMAESIzRFWIu+7///////+gttrKAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADAyLzA0LzEwHztQXwAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAA4SURBVAiZY2AYRIBRUADOFFJSgDOVTRxgbOXwvgdQtpDZnZ0TYOzYlTMnwJTUzESwuxBslZdobADN7hIr35l+zwAAAABJRU5ErkJggg%3D%3D)} "+
         	".jquerybubblepopup-top-middle {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAVBAMAAAB1fJk3AAAAA3NCSVQICAjb4U/gAAAAElBMVEX///9mZmZmZmZmZmb///8Amf/RGe2RAAAABnRSTlMAESJE///wqOn1AAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADAyLzA0LzEwHztQXwAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAAWSURBVAiZY2DACgQYFBgMGAIYHBAQABNaAjFOOWX7AAAAAElFTkSuQmCC)} "+
         	".jquerybubblepopup-top-right {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAA3NCSVQICAjb4U/gAAAALVBMVEX///9mZmZmZmZmZmZmZmZAeaAfitEQkegFl/j////v+f/f8v+f2f8gpv8Amf8guSCbAAAAD3RSTlMAESIzRFWIu+7///////+gttrKAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADAyLzA0LzEwHztQXwAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAA2SURBVAiZY2AYBEBQEMFWUkJwXIwRnHftwYow9sw914wEYOyZa4MQ7DnFinD2rGYEe+YTLGwATc8SK+Yj1PEAAAAASUVORK5CYII%3D)} "+
         	".jquerybubblepopup-middle-left {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAABBAMAAADDfvgoAAAAA3NCSVQICAjb4U/gAAAAElBMVEX///9mZmZmZmZmZmb///8Amf/RGe2RAAAABnRSTlMAESJE///wqOn1AAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADAyLzA0LzEwHztQXwAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAARSURBVAiZY2AAAUblEBcXBwADpQFB6wwtJQAAAABJRU5ErkJggg%3D%3D)} "+
         	".jquerybubblepopup-middle-right {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAABBAMAAADDfvgoAAAAA3NCSVQICAjb4U/gAAAAElBMVEX///9mZmZmZmZmZmb///8Amf/RGe2RAAAABnRSTlMAESJE///wqOn1AAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADAyLzA0LzEwHztQXwAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAAQSURBVAiZY3BxcQlWZAADAAuDAUHMZPYuAAAAAElFTkSuQmCC)} "+
         	".jquerybubblepopup-bottom-left {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAA3NCSVQICAjb4U/gAAAALVBMVEX///9mZmZmZmZmZmZmZmZBeZ4fitEQkegFl/j////v+f/f8v+f2f8fpf8Amf+LppjtAAAAD3RSTlMAESIzRFWIu+7///////+gttrKAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADAyLzA0LzEwHztQXwAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAA+SURBVAiZY2AAAUaVlzNnTmDAZCt3IbFr4GwGodiVCLbZnZ0wNqNyeN8DGFtI2cSBAc5RUmCAcwQFGAYBAACXahIrRLSeLAAAAABJRU5ErkJggg%3D%3D)} "+
         	".jquerybubblepopup-bottom-middle {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAVBAMAAAB1fJk3AAAAA3NCSVQICAjb4U/gAAAAElBMVEX///9mZmZmZmZmZmb///8Amf/RGe2RAAAABnRSTlMAESJE///wqOn1AAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADAyLzA0LzEwHztQXwAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAAWSURBVAiZY3BgQMAABgMGBQYBBqwAAEjaAjFK6/NmAAAAAElFTkSuQmCC)} "+
         	".jquerybubblepopup-bottom-right {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAA3NCSVQICAjb4U/gAAAALVBMVEX///9mZmZmZmZmZmZmZmZBeZ4fitEQkegFl/j////v+f/f8v+f2f8fpf8Amf+LppjtAAAAD3RSTlMAESIzRFWIu+7///////+gttrKAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADAyLzA0LzEwHztQXwAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAA5SURBVAiZY5g5c+YTRQYIQGXPakaw5xQj2GuDBGDsPdeMYOx37cEwJQwuxkqCMLYSgskgiGAOBgAAF0sSK/ettDcAAAAASUVORK5CYII%3D)} "+
         	".jquerybubblepopup-tail {background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVBAMAAABWJ8jiAAAAA3NCSVQICAjb4U/gAAAAGFBMVEX///9mZmZmZmZmZmZmZmZmZmb///8Amf92Mo0OAAAACHRSTlMAESIzRFX//xqMkn4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDIvMDQvMTAfO1BfAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAFlJREFUCJljSIOBBAYymeVlEFZ5AYNrOJiVHurAYOwKFi51NmAQUnYHCTorCTAwCpkAhUuMBBkYGASBwunOigJAJkgYIggUVjI3AgsChQWVFCGCIDaMRQ4AANtXLFGLR1O8AAAAAElFTkSuQmCC)} "+
            
            // calendar styles
         	' .fc { direction: ltr; text-align: left; } .fc table { border-collapse: collapse; border-spacing: 0; } html .fc, .fc table { font-size: 1em; } .fc td, .fc th { padding: 0; vertical-align: top; } .fc-header td { white-space: nowrap; } .fc-header-left { width: 25%; text-align: left; } .fc-header-center { text-align: center; } .fc-header-right { width: 25%; text-align: right; } .fc-header-title { display: inline-block; vertical-align: top; } .fc-header-title h2 { margin-top: 0; white-space: nowrap; } .fc .fc-header-space { padding-left: 10px; } .fc-header .fc-button { margin-bottom: 1em; vertical-align: top; } .fc-header .fc-button { margin-right: -1px; } .fc-header .fc-corner-right, .fc-header .ui-corner-right { margin-right: 0; } .fc-header .fc-state-hover, .fc-header .ui-state-hover { z-index: 2; } .fc-header .fc-state-down { z-index: 3; } .fc-header .fc-state-active, .fc-header .ui-state-active { z-index: 4; } .fc-content { clear: both; } .fc-view { width: 100%; overflow: hidden; } .fc-widget-header, .fc-widget-content { border: 1px solid #ddd; } .fc-state-highlight { background: #fcf8e3; } .fc-cell-overlay { background: #bce8f1; opacity: .3; filter: alpha(opacity=30); } .fc-button { position: relative; display: inline-block; padding: 0 .6em; overflow: hidden; height: 1.9em; line-height: 1.9em; white-space: nowrap; cursor: pointer; } .fc-state-default { border: 1px solid; } .fc-state-default.fc-corner-left { border-top-left-radius: 4px; border-bottom-left-radius: 4px; } .fc-state-default.fc-corner-right { border-top-right-radius: 4px; border-bottom-right-radius: 4px; } .fc-text-arrow { margin: 0 .1em; font-size: 2em; font-family: "Courier New", Courier, monospace; vertical-align: baseline; } .fc-button-prev .fc-text-arrow, .fc-button-next .fc-text-arrow { font-weight: bold; } .fc-button .fc-icon-wrap { position: relative; float: left; top: 50%; } .fc-button .ui-icon { position: relative; float: left; margin-top: -50%; *margin-top: 0; *top: -50%; } .fc-state-default { background-color: #f5f5f5; background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6); background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6)); background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6); background-image: -o-linear-gradient(top, #ffffff, #e6e6e6); background-image: linear-gradient(to bottom, #ffffff, #e6e6e6); background-repeat: repeat-x; border-color: #e6e6e6 #e6e6e6 #bfbfbf; border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); color: #333; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); } .fc-state-hover, .fc-state-down, .fc-state-active, .fc-state-disabled { color: #333333; background-color: #e6e6e6; } .fc-state-hover { color: #333333; text-decoration: none; background-position: 0 -15px; -webkit-transition: background-position 0.1s linear; -moz-transition: background-position 0.1s linear; -o-transition: background-position 0.1s linear; transition: background-position 0.1s linear; } .fc-state-down, .fc-state-active { background-color: #cccccc; background-image: none; outline: 0; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05); } .fc-state-disabled { cursor: default; background-image: none; opacity: 0.65; filter: alpha(opacity=65); box-shadow: none; } .fc-event { border: 1px solid #3a87ad; background-color: #3a87ad; color: #fff; font-size: .85em; cursor: default; } a.fc-event { text-decoration: none; } a.fc-event, .fc-event-draggable { cursor: pointer; } .fc-rtl .fc-event { text-align: right; } .fc-event-inner { width: 100%; height: 100%; overflow: hidden; } .fc-event-time, .fc-event-title { padding: 0 1px; } .fc .ui-resizable-handle { display: block; position: absolute; z-index: 99999; overflow: hidden; font-size: 300%; line-height: 50%; } .fc-event-hori { border-width: 1px 0; margin-bottom: 1px; } .fc-ltr .fc-event-hori.fc-event-start, .fc-rtl .fc-event-hori.fc-event-end { border-left-width: 1px; border-top-left-radius: 3px; border-bottom-left-radius: 3px; } .fc-ltr .fc-event-hori.fc-event-end, .fc-rtl .fc-event-hori.fc-event-start { border-right-width: 1px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; } .fc-event-hori .ui-resizable-e { top: 0 !important; right: -3px !important; width: 7px !important; height: 100% !important; cursor: e-resize; } .fc-event-hori .ui-resizable-w { top: 0 !important; left: -3px !important; width: 7px !important; height: 100% !important; cursor: w-resize; } .fc-event-hori .ui-resizable-handle { _padding-bottom: 14px; } table.fc-border-separate { border-collapse: separate; } .fc-border-separate th, .fc-border-separate td { border-width: 1px 0 0 1px; } .fc-border-separate th.fc-last, .fc-border-separate td.fc-last { border-right-width: 1px; } .fc-border-separate tr.fc-last th, .fc-border-separate tr.fc-last td { border-bottom-width: 1px; } .fc-border-separate tbody tr.fc-first td, .fc-border-separate tbody tr.fc-first th { border-top-width: 0; } .fc-grid th { text-align: center; } .fc .fc-week-number { width: 22px; text-align: center; } .fc .fc-week-number div { padding: 0 2px; } .fc-grid .fc-day-number { float: right; padding: 0 2px; } .fc-grid .fc-other-month .fc-day-number { opacity: 0.3; filter: alpha(opacity=30); } .fc-grid .fc-day-content { clear: both; padding: 2px 2px 1px; } .fc-grid .fc-event-time { font-weight: bold; } .fc-rtl .fc-grid .fc-day-number { float: left; } .fc-rtl .fc-grid .fc-event-time { float: right; } .fc-agenda table { border-collapse: separate; } .fc-agenda-days th { text-align: center; } .fc-agenda .fc-agenda-axis { width: 50px; padding: 0 4px; vertical-align: middle; text-align: right; white-space: nowrap; font-weight: normal; } .fc-agenda .fc-week-number { font-weight: bold; } .fc-agenda .fc-day-content { padding: 2px 2px 1px; } .fc-agenda-days .fc-agenda-axis { border-right-width: 1px; } .fc-agenda-days .fc-col0 { border-left-width: 0; } .fc-agenda-allday th { border-width: 0 1px; } .fc-agenda-allday .fc-day-content { min-height: 34px; _height: 34px; } .fc-agenda-divider-inner { height: 2px; overflow: hidden; } .fc-widget-header .fc-agenda-divider-inner { background: #eee; } .fc-agenda-slots th { border-width: 1px 1px 0; } .fc-agenda-slots td { border-width: 1px 0 0; background: none; } .fc-agenda-slots td div { height: 20px; } .fc-agenda-slots tr.fc-slot0 th, .fc-agenda-slots tr.fc-slot0 td { border-top-width: 0; } .fc-agenda-slots tr.fc-minor th, .fc-agenda-slots tr.fc-minor td { border-top-style: dotted; } .fc-agenda-slots tr.fc-minor th.ui-widget-header { *border-top-style: solid; } .fc-event-vert { border-width: 0 1px; } .fc-event-vert.fc-event-start { border-top-width: 1px; border-top-left-radius: 3px; border-top-right-radius: 3px; } .fc-event-vert.fc-event-end { border-bottom-width: 1px; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; } .fc-event-vert .fc-event-time { white-space: nowrap; font-size: 10px; } .fc-event-vert .fc-event-inner { position: relative; z-index: 2; } .fc-event-vert .fc-event-bg { position: absolute; z-index: 1; top: 0; left: 0; width: 100%; height: 100%; background: #fff; opacity: .25; filter: alpha(opacity=25); } .fc .ui-draggable-dragging .fc-event-bg, .fc-select-helper .fc-event-bg { display: none\9; } .fc-event-vert .ui-resizable-s { bottom: 0 !important; width: 100% !important; height: 8px !important; overflow: hidden !important; line-height: 8px !important; font-size: 11px !important; font-family: monospace; text-align: center; cursor: s-resize; } .fc-agenda .ui-resizable-resizing { _overflow: hidden; } '
         	
         	// calendar styles override
         	+".fc-event { border: 1px solid LightGrey; background-color: White; color: Grey; }  \
         	.fc-event-inner { max-height: 54px }  \
         	.fc-event-new { border: 1px solid Orange; }  \
         	.fc-event-applied { border: 1px solid Crimson; color: Black; }  \
         	.status-angemeldet { border: 1px solid Crimson; color: Black; }  \
         	.status-abgeschlossen { border: 1px solid LightCoral; color: Grey; }  \
         	.status-vorgemerkt { border: 1px solid LightCoral; color: Black; }  \
         	.fc-event-marked { border: 1px solid RoyalBlue; color: Black; } ");
        $('head').append(styles);    
    }
}