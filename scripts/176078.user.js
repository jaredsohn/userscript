// ==UserScript==
// @name       EA Fastpass hack - BF4 - Autobot
// @namespace  http://godlesz.de
// @version    0.1.1
// @description  First attempt for full automatic fetch of multiple tickets, still WIP
// @match      http://fastpass.ea.de/*
// @copyright  2013, GodLesZ
// @run-at document-end
// ==/UserScript==

// Games..
var GAMES = {
    Fifa: 1,
    Nfs: 2,
    Sims: 4,
    Bf: 6
};

// Times..
var TIMESLOT = {
    T1011: 1,
    T1112: 2,
    T1213: 3,
    T1314: 4,
    T1415: 5,
    T1516: 6,
    T1617: 7,
    T1718: 8,
    T1819: 9,
    T1920: 10
};

// Days..
var DAYSLOT = {
    Donnerstag: 1,
    Freitag: 2,
    Samstag: 3,
    Sonntag: 4
};

var gameSelectionId = GAMES.Bf,
    currentFormState = 0;

if (currentFormState === 0) {
    var $headlines = unsafeWindow.document.getElementsByTagName('h1'),
    $head = ($headlines.length ? $headlines[0] : null),
    pos = ($head ? $head.innerText.indexOf('Du hattest leider kein') : -1);
    
    console.log('Found text on pos:', pos);
    
    // Found => reload
    if (pos !== -1) {
        setTimeout(function() {
            console.log('Try location.replace..');
            window.location.replace('/page1.php?gameselection=' + gameSelectionId);
        }, 1500);
        return;
    } 
    // Not found, but maybe false-positive
    else if (unsafeWindow.location.pathname == '/index.php') {
            console.log('Try location.replace..');
        // EA redirect us to index.php, just restart
        window.location.replace('/page1.php?gameselection=' + gameSelectionId);
        return;
    }
        
    // VALID found! Maybe..
    else if (unsafeWindow.location.pathname != '/') {
        unsafeWindow.document.title = 'GOT A KEY!';
        
        currentFormState = 1;
    }
}

// We are on the time selection page
if (currentFormState === 1) {
    var $ = unsafeWindow.window.$;
    var selector, $slot;
    // @TODO: Find a nice way to fetch users day and time wish
    
    // Selector without pref
    selector = 'input[type="radio"][name="SLOT"]';
    // Try get first free slot in peek times (4-7)
    if (($slot = $(selector).find('[value$="_4"]').first()).length == 0) {
        if (($slot = $(selector).find('[value$="_5"]').first()).length == 0) {
            if (($slot = $(selector).find('[value$="_6"]').first()).length == 0) {
                if (($slot = $(selector).find('[value$="_7"]').first()).length == 0) {
                    // Nothing free in peek times - pick first valid                    
            		$slot = $(selector).first();            
                }
            }
        }
    }
    
    // No free slot left? wtf?
    if (!$slot || !$slot.length) {
        console.error('No free slot found!?');        
        return;
    } else {
        var slotValue = $slot.val();
        
        console.log('Try fetching pdf for slot ', slotValue, '(', $slot.get(0), ')');
        
        // Send a click-fake request
        $.ajax({
            url: '/ajax/HandleSelections.php',
            type: 'post',
            data: {
                selection: 'slot',
                value: slotValue
            },
            success: function() {
                
                // Go request page2
                $.ajax({
                    url: '/page2.php',
                    type: 'post',
                    data: {
                        show: 'fastpass',
                        step: 3,
                        SLOT: slotValue
                    },
                    dataType: 'html',
                    success: function(result) {
                        //console.log('page2 result:', $(result));
						var spoofed_links = [],
                            fail_counter = 0,
                            spoof_count = 20;
                        
                        for (var i = 0; i < spoof_count; i++) {                            
                            var registerData = {
                                show: 'fastpass',
                                step: 4,
                                Vorname: 'ich',
                                Nachname: 'war',
                                Strasse: 'hier 1',
                                PLZ: '23456',
                                Ort: 'hier',
                                Email: 'bla_' + slotValue + '_' + getUnixTimestamp() + '@gmail.com',
                                EmailValidation: '',
                                Telefon: '015784135174',
                                Tag: getRandomInt(1, 28),
                                Monat: getRandomInt(1, 12),
                                Jahr: '19' + getRandomInt(7, 9) + '' + getRandomInt(0, 9),
                                Datenschutz: '1',
                                submitbutton: 'Weiter',
                            };
                    
                            $.ajax({
                                url: '/page3.php',
                                type: 'post',
                                data: registerData,
                                dataType: 'html',
                                success: function(result) {
                                    var $result = $(result),
                                        $dlLink = $result.find('a[href^="download.php?FILE="]:first');
                                    //console.log('register result:', $result);
                                    console.log('[', i, '] dl link:', $dlLink);
                                    // Search download link
                                    if ($dlLink.length) {
                                        spoofed_links.push( $dlLink.val() );
                                    } else {
                                        fail_counter++;
                                    }
                                }
                            });
                            
                        }
                        
                        var timer = setInterval(function() {
                            if (fail_counter + spoofed_links.length == spoof_count) {
                                clearInterval(timer);
                                console.log('done requesting', spoof_count, 'fastpass tickets:', spoofed_links);
                                
                                var download = function() {
                                    for (var i = 0; i < arguments.length; i++) {
                                        var iframe = $('<iframe style="visibility: collapse;"></iframe>');
                                        $('body').append(iframe);
                                        var content = iframe[0].contentDocument;
                                        var form = '<form action="' + arguments[i] + '" method="GET"></form>';
                                        content.write(form);
                                        $('form', content).submit();
                                        setTimeout((function(iframe) {
                                            return function() { 
                                                iframe.remove(); 
                                            }
                                        })(iframe), 2000);
                                    }
                                };
                                
                                //download(spoofed_links);
                            }
                        }, 1000);
                        
                    }
                });
            
            
            }
        });
        
    }
}





function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUnixTimestamp() {
    return Math.round( new Date().getTime() / 1000 );
}

function cookieCreate(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    
    unsafeWindow.document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function cookieRead(name) {
    var nameEQ = escape(name) + "=";
    var ca = unsafeWindow.document.cookie.split(';');
    
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        
        if (c.indexOf(nameEQ) == 0) {
            return unescape(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

function cookieDelete(name) {
    cookieCreate(name, "", -1);
}