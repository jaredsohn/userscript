// ==UserScript==
// @name       Moodle Magische Navigation
// @namespace  http://lauinger-it.de
// @version    0.1
// @description  erweitert die Informatik Moodle Startseite um eine Auto-Login-Funktion, die direkt einen Kurs wählt
// @match      https://moodle.informatik.tu-darmstadt.de/*
// @require	   http://code.jquery.com/jquery-2.0.3.min.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js
// @require	   http://netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js
// @resource   bootstrap http://netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css
// @copyright  2014 Johannes Lauinger
// ==/UserScript==

/* VORSICHT: UNSICHERE DATENSPEICHERUNG! */

// Bootstrap CSS laden
var namespacedBootstrap = GM_getResourceText("bootstrap").replace(/}/g, '}.tb-styled ');
GM_addStyle (namespacedBootstrap);

(function(window){

	/* Konfiguration ------------------------------------------------------------------- */
    var TuId = 'ab12cdef';
    var username = 'Max Maximilian Mustermann';
    var showname = 'Max Mustermann';
    var courses = [
        {
            'name': 'GdI 1 WS13/14',
            'hotkey': 'g'.charCodeAt(0),
            'courseId': '299'
        },
        {
            'name': 'TGdI',
            'hotkey': 't'.charCodeAt(0),
            'courseId': '296'
        },
        {
            'name': 'Mathe 1',
            'hotkey': 'm'.charCodeAt(0),
            'courseId': '280'
        }
    ];
    
    /* Implementierung ----------------------------------------------------------------- */
    var flag_login_required = false;
    var sesskey = '';
    
    $(function(){        
        // Ist momentan kein Benutzer angemeldet?
        if ($('.logininfo a').text() === 'Login') {
            flag_login_required = true;
        }
        // ist ein falscher Benutzer angemeldet?
        else if ($('.logininfo a:eq(0)').text() !== username) {
            // Falscher Benutzer Meldung anzeigen
            // nichts weiter tun
            return 0;
        }
        else {
            // Sesskey speichern
            sesskey = $('.logininfo a:eq(1)').attr('href').substr($('.logininfo a:eq(1)').attr('href').indexOf('=') + 1);
        }
            
        // Die erweiterte Navigation anzeigen
        addNavbox();
        
        // Eventlistener hinzufügen
        $(document).keydown(function(e){
            // enter?
            if (e.keyCode === 13) {
                // ist auch kein Benutzer angemeldet?
                if (flag_login_required === true) {
                    // Login-Seite aufrufen
                    location.href = 'https://sso.hrz.tu-darmstadt.de/login?service=https%3A%2F%2Fmoodle.informatik.tu-darmstadt.de%2Flogin%2Findex.php%3FauthCAS%3DCAS';
                }
            }
            // escape?
            else if (e.keyCode === 27) {
                // Keylistener entfernen
                $(document).unbind('keypress').unbind('keydown');
            }
            // entfernen?
            else if (e.keyCode === 46) {
                // Popover schließen
                $('#MIN_label').popover('hide');
            }
        });
        $(document).keypress(function(e){
            // nach einem Hotkey suchen
            var course = _.find(courses, function(c){
                return c.hotkey === e.charCode;
            });
            if (typeof course !== 'undefined') {
                // muss noch angemeldet werden?
                if (flag_login_required === true) {
                	// Login-Seite für diesen Kurs aufrufen
                	$.ajax({
                    	url: 'https://moodle.informatik.tu-darmstadt.de/course/view.php?id=' + course.courseId,
                    	success: function(data){
                			location.href = 'https://sso.hrz.tu-darmstadt.de/login?service=https%3A%2F%2Fmoodle.informatik.tu-darmstadt.de%2Flogin%2Findex.php%3FauthCAS%3DCAS';
                    	}
                	});
                }
                else {
                    // einfach die Kurs-Seite aufrufen
                    location.href = 'https://moodle.informatik.tu-darmstadt.de/course/view.php?id=' + course.courseId;
                }
            }
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        });
        
        // wenn vorhanden, Abmelden Button registrieren
        if (flag_login_required === false) {
            $('#MIN_logout').click(function(){
                // Vom Moodle abmelden
                $.ajax({
                    url: 'https://moodle.informatik.tu-darmstadt.de/login/logout.php',
                    type: 'get',
                    data: {
                        'sesskey': sesskey
                    },
                    success: function(){
                        location.href = 'https://sso.hrz.tu-darmstadt.de/logout';
                    }
                });
            });
        }
    });
    
    function addNavbox() {
        $('.logininfo').addClass('tb-styled').html('<div id="MIN_container" class="pull-right"><span id="MIN_label" class="label label-success">&gt; Moodle Magische Navigation</span></div><div class="clearfix"></div>');
        $('#MIN_container').css({
            'width': '208px',
            'text-align': 'right',
            'font-size': '1.5em',
            'cursor': 'default'
        });
        // Popover hinzufügen
        $('#MIN_label').popover({
            html: true,
            placement: 'bottom',
            content: generateNavboxContent()
        }).popover('show');
    }
    
    function generateNavboxContent() {
        var content = '';
       
        // ist ein Benutzer angemeldet?
        if (flag_login_required === false) {
            // dann die Version mit Namen anzeigen
            content = '<h4><strong>Angemeldet: ' + showname + ' (' + TuId + ')</strong></h4><p>Drücke, um zu navigieren:</p><ul style="list-style-type: none;">';
            _.each(courses, function(c){
                content += '<li><span class="label label-primary">' + String.fromCharCode(c.hotkey) + '</span>\t' + c.name + '</li>';
            });
            content += '<li><span class="label label-warning">Entf</span>\tPopover schließen</li>';
            content += '<li><span class="label label-warning">Esc</span>\tKeylistener entfernen</li></ul>';
            content += '<button id="MIN_logout" class="btn btn-xs btn-danger" style="width: 100%;">Abmelden</button>';
        }
        else {
            // die Version mit Einloggen anzeigen
            content = '<h4><strong>Magische Navigation verfügbar für: ' + showname + ' (' + TuId + ')</strong></h4><p>Drücke, um anzumelden und zu navigieren:</p><ul style="list-style-type: none;">';
            _.each(courses, function(c){
                content += '<li><span class="label label-primary">' + String.fromCharCode(c.hotkey) + '</span>\t' + c.name + '</li>';
            });
            content += '<li><span class="label label-success">Return</span>\tNur anmelden</li>';
            content += '<li><span class="label label-warning">Entf</span>\tPopover schließen</li>';
            content += '<li><span class="label label-warning">Esc</span>\tKeylistener entfernen</li></ul>';
        }
        
        return content;
    }

})(window);
