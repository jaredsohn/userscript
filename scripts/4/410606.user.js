// ==UserScript==
// @name        FlashbackImprover
// @namespace   https://www.flashback.org/u783327
// @include     https://www.flashback.org/*
// @version     1.1
// @grant       none
// ==/UserScript==


// Skriptinställningar
var flashSettings = {
    // Samlar de senaste händelserna "live"
    activityMonitor: {
        // Ska den vara aktiv? Ange "true" eller "false"
        active: true,
        // Hur många händelser ska visas? Ange en siffra
        maxNumberOfEvents: 50,
        // Hämta nya trådar?  Ange "true" eller "false"
        newThreads: true,
        // Ett slags simpelt "intressefilter". Ange hur många läsare + visningar som ska krävas för att tråden ska kunna dyka upp i ditt flöde. Ange "false" eller en siffra
        newThreadsFilter: 200,
        // Uppvadatera var X sekund. Ange en siffra
        timerSeconds: 30,
        // Hämta citat?  Ange "true" eller "false"
        quotes: true,
        // Hämta prenumerationer?  Ange "true" eller "false"
        subscriptions: true
    },
    // Ändra utseende
    css: {
        custom: true,
        // Detta är standard-css som är "kodad" för att man inte kan skriva CSS-kod i javascriptkod. För att avkoda om du är nojjig, gå hit: http://www.motobit.com/util/base64-decoder-encoder.asp eller sök på "base64 decode"
        defaultCustom: 'LyogQW5pbmdlbiBkaXNrcmV0YXJlIEZsYXNoYmFja3Zhcm5pbmcgZOUgYW5ub25zZXIgaW50ZSBzeW5zICovDQojdG9wLWJhbm5lci1jb250YWluZXIgew0KCXBhZGRpbmc6IDEuNjE4ZW0gIWltcG9ydGFudDsNCgloZWlnaHQ6IGF1dG8gIWltcG9ydGFudDsNCglmb250LXNpemU6IDFlbSAhaW1wb3J0YW50Ow0KfQ0KDQovKiBMaXRlbiBhZGFwdGlvbiBm9nIgRmxhc2hiYWNrSW1wcm92ZXIgKi8NCi51c2Vybm90ZSB7DQoJd2lkdGg6IDEyMHB4Ow0KCW1hcmdpbjogMS42MThlbSAwOw0KCWZvbnQtc2l6ZTogMWVtOw0KCWhlaWdodDogMTBlbTsNCn0NCg0KI2ZsYXNoU2V0dGluZ3MgdGV4dGFyZWEgew0KCXdpZHRoOiAxMDAlOw0KCWhlaWdodDogNDBlbTsNCglmb250LXNpemU6IC45ZW07DQoJcGFkZGluZzogMS42MThlbTsNCn0NCg0KLnRocmVhZC1zdGFydGVyIC50aGVhZCB7DQoJYmFja2dyb3VuZDogI0FEQ0JERTsNCn0=',
        // Ta bort den vanliga CSS:en från sidan
        removeDefault: false
    },
    notes: {
        // Aktivera noteringar
        active: true
    },
    // Egna menyknappar. Ange "false" för att inaktivera, eller ange egna knappar såhär "'Prenumerationer': '/subscription.php?folderid=all'" och separera med komma.
    tabs: {
        'Prenumerationer':   '/subscription.php?folderid=all',
        'Citat':             '/sok/quote=FlashbackImprover?sp=1&so=d',
        'Nya ämnen':         '/nya-amnen',
        'Aktuella ämnen':    '/aktuella-amnen',
        'Regler':            '/regler',
        'CSS':     '/?' + Date.now() + '#settings'
    },
    threads: {
        // Markera TS i trådar du läser?  Ange "true" eller "false"
        tsMarker: true
    }
};
// Snabbt som attan tar vi bort eventuell gammal CSS-kod om det är så att vi ska ha en egen
if (flashSettings.css.removeDefault) {
    var links = document.getElementsByTagName('link');
    for (i in links) {
        links[i].disabled = true;
    }
}
// Egen CSS

if (flashSettings.css.custom) {
    var head = document.getElementsByTagName('head') [0];
    var cssNode = window.document.createElement('style');
    var customCSS = head.appendChild(cssNode)
    // Egen CSS om det finns
    if (localStorage.getItem('customCSS'))
    customCSS.innerHTML = localStorage.getItem('customCSS');
    // Fanns det inte? Aktivera då default-CSS
     else {
        var decodedCSS = window.atob(flashSettings.css.defaultCustom);
        customCSS.innerHTML = decodedCSS;
        // Spara som inställd CSS
        localStorage.setItem('customCSS', decodedCSS);
    }
}
$(document) .ready(function () {
    // Inställningstabb
    if (flashSettings.tabs) {
       
       $('#top-tabs li.right') .first() .before('<li><a href="/?' + Date.now() + '#settings">' + flashSettings.tabs.settingsTab + '</a></li>');
    
        var $topTabs   = $('#top-tabs');
        
        
        $('li:not(.right)', $topTabs).remove();
        
        for(i in flashSettings.tabs) {
           $topTabs.append('<li><a href="'+flashSettings.tabs[i]+'">'+i+'</a></li>');
        }
    }        
    // Visa inställningar
    if (window.location.hash == '#settings') {
        var $settingsForm = $('<form action="?" method="get" id="flashSettings"></form>');
        $('#site-container') .html($settingsForm);
        $cssTextarea = $('<textarea placeholder="Ange egen CSS...">' + (localStorage.getItem('customCSS') ? localStorage.getItem('customCSS')  : '') + '</textarea>');
        $settingsForm.append($cssTextarea);
        // Uppdatera CSS
        $cssTextarea.on('keydown keyup', function () {
            var val = $(this) .val();
            localStorage.setItem('customCSS', val);
            // Är värdet tomt? Radera värdet!
            if (val == '')
            localStorage.removeItem('customCSS');
            // Uppdatera CSS
            customCSS.innerHTML = val;
        });
    }
    // Ta bort extern CSS
    // $('link').attr("disabled", "disabled");
    // Ta bort top-banner-container
    //$('#top-banner-container').hide();
    /*$temp   = $('<div id="temp"></div>');
    
    $.ajax({
        'url': 'https://www.flashback.org/subscription.php?folderid=all'
    })
    .done(function (data) {
        
        $temp .html($(data) .find('#site-left'));
        
        $new   = $('#threadslist .icon-thread-dot-new, #threadslist .icon-thread-new', $temp);
       
        //alert($new.length+' uppdaterade trådar.');
        
        $('ul#top-tabs > li > a[href="/subscription.php?folderid=all"]').html('Prenumerationer (<b>'+$new.length+'</b>)');
        
        //$('#site-right').prepend($temp.html());
    })
    .fail(function () {
        alert('error');
    })
    .always(function () {
    });
    */

    if (flashSettings.activityMonitor.active) {
        // Spara site-right
        var $siteRight = $('#site-right');
        // Fortsätt endast om site-right finns
        if ($siteRight.length) {
            // Skapa avgränsare för activityBox
            $siteRight.prepend('<div class="break"></div>');
            // Skapa aktivitetbox
            $activityBox = $('<div id="activityBox" class="box-right" style="height:300px; overflow:auto;"><h2>Aktivitet</h2></div>');
            $('#site-right') .prepend($activityBox);
            // Skapa aktivtetshanteraren
            $activities = $('<div id="activites"></div>');
            // Och släng in aktivitetshanteraren i aktivitetsboxen
            $activityBox.append($activities);
            // Anropa direkt hämtning
            activityMonitor($activities);
            // Anropa hämtning var X sekund
            window.setInterval(function () {
                activityMonitor($activities)
            }, flashSettings.activityMonitor.timerSeconds * 1000);
        }
    };
    // Notiser
    if (flashSettings.notes.active) {
        var $posts = getThreadPosts();
        var threadID = getThreadID();
        // Forsätt endast om #posts finns
        if ($posts) {
            $posts.each(function () {
                // Välj vänstersidan
                var $userBox = getPostUserBox(this);
                var userHref = getPostUserID($userBox);
                var $textarea = $('<textarea class="usernote unote' + userHref + '" placeholder="Notis..."></textarea>');
                $userBox.append($textarea);
                // Kolla om info finns sparad
                $textarea.val(localStorage.getItem('unote' + userHref));
                $textarea.on('keydown keyup', function () {
                    var val = $(this) .val();
                    localStorage.setItem('unote' + userHref, val);
                    // Är värdet tomt? Radera värdet!
                    if (val == '')
                    localStorage.removeItem('unote' + userHref);
                    // Uppdatera alla andra poster på sidan av denna användare
                    $('textarea.unote' + userHref) .not(this) .val(val);
                });
            });
        }
    }
    // TS-markör

    if (flashSettings.threads.tsMarker) {
        var $posts = getThreadPosts();
        var threadID = getThreadID();
        
        console.log('Tråd-ID'+threadID);
        // Forsätt endast om #posts finns
        if ($posts) {
            // Har vi sparat denna tråds TS? 
            if (threadID == localStorage.getItem('lastFirstPostThread')) {
                
                console.log('Saved TS - '+localStorage.getItem('lastFirstPost'));
                
                // Markerar vi alla inlägg av TS
                markTS($posts, localStorage.getItem('lastFirstPost'));
            }
            // Är det första inlägget även det första i tråden?
             else if (getFirstPostNO($posts) == '1') {
                console.log('TS hittad');
                // Hämta då inläggets användar-ID
                var tsID = getPostUserID($posts.first());
                markTS($posts, tsID);
                // Ange denna tråden som senast upptittade tråd och TS som TS
                localStorage.setItem('lastFirstPostThread', threadID);
                localStorage.setItem('lastFirstPost', tsID);
            }
            // Hepps. Ingen TS fanns sparad, och vi är inte på förstasidan. Då kollar vi upp förstasidan med ajax
             else {
                console.log('TS ej hittad eller sparad. Kollar upp via ajax');
                $.ajax({
                    'url': '/' + threadID
                }) .done(function (data) {
                    
                    
                    var $ajaxPosts = getThreadPosts(data);
                    var tsID = getPostUserID($ajaxPosts.first());
                    markTS($posts, tsID);
                    // Ange denna tråden som senast upptittade tråd och TS som TS
                    localStorage.setItem('lastFirstPostThread', threadID);
                    localStorage.setItem('lastFirstPost', tsID);
                    console.log('TS är ' + tsID);
                })
            }
        }
    }
});
// Hämta den allra första posten i en tråd
function getFirstPostNO($posts) {
    // Första inläggsnummer
    return no = $('tr:first span.fr:first > a', $posts.first()) .text();
}
// Plocka ut trådens "ID" från en sida med tråd

function getThreadID() {
    var href = $('#site-left table.forum-navbar:first tr:last td:last a:first') .first() .attr('href');
    if (!href)
    return false;
    // Plocka ut sista delen
    return href.split('/') .pop();
}
// Plocka ut användarens "ID" från en post(box) i en tråd

function getPostUserID($userBox) {
    var href = $('a.bigusername', $userBox) .attr('href');
    // Plocka ut sista delen
    return href.split('/') .pop();
}
function getThreadPosts(data) {
    if (typeof data === 'undefined')
    var $postsContainer = $('#posts');
     else
    var $postsContainer = $(data) .find('#posts');
    // Forsätt endast om #posts finns
    if ($postsContainer.length)
    return $postsContainer.children('div') .children('table');
    // Om ingen hittades, returnera false
    return false;
}
function getPostUserBox($post) {
    return $('div.post-user', $post);
}
function markTS($posts, tsID) {
    $posts.each(function () {
            
        $userBox = getPostUserBox($(this));
        userID = getPostUserID($userBox);
        if (userID == tsID) {
             $(this).addClass('thread-starter');
            $('table.post-user-title', $userBox) .before('<i>Trådstartare</i>');
        }
    });
}
function parseTime(string) {
    // Ta bort eventuell whitespace
    string = $.trim(string);
    var
    absoluteDate = /^(\d{4}-\d{2}-\d{2}),? (\d{2}):(\d{2})$/,
    relativeDate = /^(?:(\Idag|Igår),?\W|^)(\d{2}):(\d{2})$/i;
    // Test för absolut datum
    var match = string.match(absoluteDate);
    if (match) {
        var date = new Date(match[1]);
        date.setHours(match[2]);
        date.setMinutes(match[3]);
        date.setSeconds(0)
        return date;
    }
    // Test för relativt datum

    var match = string.match(relativeDate);
    if (match) {
        // Skapa dagens datum
        var date = new Date();
        // Om igår, minus en dag
        if (match[1] == 'Igår')
        date.setDate(date.getDate() - 1);
        date.setHours(match[2]);
        date.setMinutes(match[3]);
        date.setSeconds(0)
        return date;
    }
    console.log('No match for ' + string);
}
String.prototype.lpad = function (padString, length) {
    var str = this;
    while (str.length < length)
    str = padString + str;
    return str;
}
function activityMonitor($activities) {
    // Functions
    var
    fetchQuotes = {
    },
    fetchSubscriptions = {
    },
    fetchNewThreads = {
    };
    if (flashSettings.activityMonitor.quotes) {
        // Kolla upp citatlänken så att vi kan använda den
        var quoteLink = $('#top-menu ul.top-menu-main a:contains("Mina citerade inlägg")') .first() .attr('href');
        fetchQuotes = $.ajax({
            'url': quoteLink
        }) .done(function (data) {
            $quotes = $(data) .find('#posts > table');
            $quotes.each(function () {
                // Hämta ut tiden (välj ej någon text från barndivar)
                var time = $('tr:first .thead', this) .first() .clone()
                //clone the element
                .children()
                //select all the children
                .remove()
                //remove all the children
                .end()
                //again go back to selected element
                .text();
                var event = [
                    3,
                    $('tr:last td.alt1 a', this) .first() .text(),
                    $('tr:last td.alt1 .smallfont > a', this) .first() .text(),
                    $('tr:last td.alt2 a', this) .first() .attr('href'),
                    parseTime(time)
                ];
                events.push(event);
            });
        });
    }
    if (flashSettings.activityMonitor.subscriptions) {
        fetchSubscriptions = $.ajax({
            'url': '/subscription.php?folderid=all'
        }) .done(function (data) {
            $subs = $(data) .find('#threadslist tr');
            $subs.each(function () {
                // Titelcellen
                $titleCell = $('td.td_title > div', this);
                $entryCell = $('td.td_last_post', this);
                if ($titleCell.length) {
              
                    
                    // Ta endast med om tråden är oläst eller uppdaterad idag
                    var event = [
                        1,
                        $('a', $titleCell) .first() .text(),
                        $('a', $entryCell) .first() .text(),
                        $('a', $entryCell) .last() .attr('href'),
                        parseTime($('.smallfont.alignr div', $entryCell) .first() .text())
                    ];
                    events.push(event);
                }
            });
        });
    }
    if (flashSettings.activityMonitor.newThreads) {
        fetchNewThreads = $.ajax({
            'url': '/nya-amnen'
        }) .done(function (data) {
            var $threads = $(data) .find('#site-main tr');
            $threads.each(function () {
                $titleCell = $('td.td_title', this);
                if ($titleCell.length) {
                    if (flashSettings.activityMonitor.newThreadsFilter) {
                        var readers = parseInt($('td:eq(3)', this) .first() .text());
                        var viewers = parseInt($('td:eq(4)', this) .first() .text());
                        var interactions = readers + viewers;
                    } 
                    else
                    interactions = 0;
                    // Ta reda på antalet läsare just nu + visningar om det är så att det ska avgränsas med ett filter
                    if (interactions >= flashSettings.activityMonitor.newThreadsFilter) {
                        var event = [
                            2,
                            $('a', $titleCell) .first() .text(),
                            0,
                            $('a', $titleCell) .first() .attr('href'),
                            parseTime($('td:first .time', this) .first() .text())
                        ];
                        events.push(event);
                    }
                }
            });
        })
    }
    /*
       Typ (1 = prenumeration, 2 = nytt ämne, 3 = Ny citering)
       Titel
       Användare
       Länk
       Tidpunkt
    */

    var events = [
    ];
    $.when(
    /* Hämta citeringar */
    fetchQuotes,
    /* Hämta prenumerationer */
    fetchSubscriptions,
    /* Hämta nya ämnen */
    fetchNewThreads
    ) .done(function () {
        // Sortera events
        events.sort(function (a, b) {
            return b[4].getTime() >= a[4].getTime();
        });
        // Återställ HTML
        $activities.html('');
        // Gå igenom alla händelser om maxantal inte överstigits
        var length = events.length < flashSettings.activityMonitor.maxNumberOfEvents ? events.length : flashSettings.activityMonitor.maxNumberOfEvents;
        // Gå igenom händelser
        for (var i = 0; i < length; i++) {
            var event = events[i];
            if (event[0] == 1)
            var title = '<b>' + event[2] + '</b> har kommenterat ';
             else if (event[0] == 2)
            var title = '<b>Ny tråd: </b>';
            if (event[0] == 3)
            var title = '<b>' + event[2] + '</b> har citerat dig i ';
            var timestamp = event[4].getHours() .toString() .lpad('0', 2) + ':' + event[4].getMinutes() .toString() .lpad('0', 2);
            $activities.append(title + '<div class="event"><a href="' + event[3] + '">' + event[1] + '</a><br />' + '<span class="smallfont2">' + timestamp + '</span><hr /></div>');
        }
    });
}
