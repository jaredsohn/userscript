// ==UserScript==
// @name       Duolingo Weekly Progress
// @namespace  http://code-poet.net
// @version    0.1
// @description  Shows weekly progress on Duolingo
// @match      http://www.duolingo.com/*
// @match      https://www.duolingo.com/*
// @copyright  2014, Vaughan Chandler, Creative Commons Attribution-ShareAlike 4.0 International License
// ==/UserScript==

(function() {
    
    var
        username,	// The username to lookup.
        mode,		// Descibes the page being viewed, eg 'home', 'profile'.
        dwp,		// The element that shows the progress chart.
        language;	// The language to display output in (localization).
    
    // Localization data.
    var strings = {
        'en': {
            dow0: 'S',
            dow1: 'M',
            dow2: 'T',
            dow3: 'W',
            dow4: 'T',
            dow5: 'F',
            dow6: 'S',
            loading: 'Loading progress for %username%...',
            noprogress: 'No progress for this week.',
            progress: 'Progress',
        },
        'es': {
            dow0: 'D',
            dow1: 'L',
            dow2: 'M',
            dow3: 'M',
            dow4: 'J',
            dow5: 'V',
            dow6: 'S',
            loading: 'Cargando progreso para %username%...',
            noprogress: 'Ningún progreso para esta semana.',
            progress: 'Progreso',
        },
        'fr': {
            dow0: 'D',
            dow1: 'L',
            dow2: 'M',
            dow3: 'M',
            dow4: 'J',
            dow5: 'V',
            dow6: 'S',
        },
    };
    
    // Localization detection.
    var bodyElm = document.querySelector('body');
    if (bodyElm && (m=bodyElm.className.match(/global-(\w+)/))) { language = m[1]; }
    
    // Localization function.
    // If the string doesn't exist for the language it defaults to English.
    // If the string doesn't exist for English it's returned unchanged.
    function _(s) {
        return (strings[language] && strings[language][s] ? strings[language][s] : (strings.en[s] ? strings.en[s] : s)).replace('%username%', username);
    }
    
    // CSS.
    GM_addStyle(
        '.dwp-progress { padding-top: 30px; }'+
        '.dwp-day { display: inline-block; margin: 0 6px; width: 22px; }'+
        '.dwp-bar { background-color: #ffc10d; background-image: linear-gradient(135deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent); }'+
        '.dwp-bar:hover { opacity: 0.85; }'+
        '.dwp-dow { text-align: center; }'+
        '.dwp-points { text-align: center; color: #999; font-weight:300; }'+
        '#app.home .dwp-progress { margin: 0 0 25px 0; border-top: 2px solid #efefef; text-align:center; }'+
        '#app.profile .dwp-progress { margin: 19px 0 0 0;  }'+
    '');
    
    // Analyze the page and initialize the AJAX request if it makes sense.
    function process() {
        
        // Check is progress has already been shown on the page.
        if (document.querySelector('.dwp-progress')) { return; }
        
        // Get the #app element which has classes we can use to determine what page we're on.
        var appElm = document.querySelector('#app');
        if (!appElm) { return; }
        
        if (appElm.className.match(/\bhome\b/)) {
            
            // Set mode.
            mode = 'home';
            
            // Get the username of the person who's logged in. Die if we can't get it.
            var usernameElm = document.querySelector('.topbar-username .name');
            if (!usernameElm) { return; }
            username = usernameElm.innerHTML;
            
            // Add progress element to page.
            createDWP('#app .sidebar-progress');
            
            // Make AJAX request.
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://www.duolingo.com/users/" + username,
                onload: handleResponse
            });
            
        } else if (appElm.className.match(/\bprofile\b/)) {
            
            // Set mode.
            mode = 'profile';
            
            // Get the username of the person whose profile is being viewed. Die if we can't get it.
            var usernameElm = document.querySelector('#app .profile-header-username');
            if (!usernameElm) { return; }
            username = usernameElm.innerHTML;
            
            // Add progress element to page.
            createDWP('#app .level-badge-grid');
            
            // Make AJAX request.
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://www.duolingo.com/users/" + username,
                onload: handleResponse
            });
            
        }
        
    }
    
    // Creates elmements from HTML.
    function create(html) {
        var parent = document.createElement('div');
        parent.innerHTML = html;
        return parent.firstChild;
    }
    
    // Selector matches the element to insert the graph after.
    function createDWP(selector) {
        dwp = create('<div class="dwp-progress">' + _('loading') + '</div>');
        var elm = document.querySelector(selector);
        elm && elm.parentNode.insertBefore(dwp, elm.nextSibling);
    }
    
    // Convert a Date object to an ISO-formatted date string.
    function isoDate(d) {
        return '' + d.getFullYear() + ('0'+(d.getMonth()+1)).slice(-2) + ('0'+d.getDate()).slice(-2);
    }
    
    // Parse AJAX response and show chart.
    function handleResponse(response) {
        
        try {
            
            var
                data = JSON.parse(response.responseText),	// The parsed JSON.
                lang,										// Stores the language the data is for as a 2-character code.
                max = 0,									// Tracks the greatest amount of points earned in a single day.
                progress = {},								// Associative array of with ISO dates as keys. The values are objects with a 'date' atrribute (a Date object) and a 'points' attribute (an integer). Only days where points where earned are present.
                now = (new Date()).getTime(),				// The current date/time. Used to reference 'today'.
                dates = [];									// A numeric array of Date objects representing the last week, whether or not points where earned on any/all of days.
                
            // Determine which language the data is for. It should be the first/only attribute.
            for (key in data.language_data) { lang=key; break; }
            
            // If there was no progress, show an appropriate message and then die.
            if (data.language_data[lang].calendar.length==0) {
                dwp.innerHTML = _('noprogress');
                return;
            }
            
            // Determine the number of points earned on each day.
            for (key in data.language_data[lang].calendar) { // datetime improvement
                var item = data.language_data[lang].calendar[key];
                var date = new Date(item.datetime);
                var day = isoDate(date);
                if (progress[day]) { progress[day].points += item.improvement; }
                else { progress[day] = {date:date, points:item.improvement}; }
            }
            
            // Determine the dates to show in the chart.
            for (i = now - (6 * 86400*1000); i<=now; i+=86400*1000) { dates.push(new Date(i)); }
            
            // Clear the chart (it should have a 'loading' message).
            dwp.innerHTML = '';
            
            // Show heading if on a profile (for consistency).
            if (mode=='profile') { dwp.appendChild(create('<h3 class="gray">' + _('progress') + ' &nbsp;<span title="' + data.language_data[lang].language_string + '" class="flag flag-' + lang + '-micro"></span> ' + data.language_data[lang].level + '</h3>')); }
            
            // Get the max number of points earned on a single day.
            for (var i=0; i<dates.length; i++) {
                var date = isoDate(dates[i]);
                if (progress[date] && progress[date].points > max) { max = progress[date].points; }
            }
            
            // Generate the chart.
            for (var i=0; i<dates.length; i++) {
                var date = isoDate(dates[i]);
                var dow = _('dow'+[dates[i].getDay()]);
                var points = progress[date] ? progress[date].points : 0;
                var height = points / max * 120; // This integer is the maximum height of the bar in pixels.
                dwp.appendChild(create('<div class="dwp-day"><div class="dwp-bar" style="height:' + (points / max * 120) + 'px"></div><div class="dwp-dow">' + dow + '</div><div class="dwp-points">' + points + '</div></div>'));
            }
            
        } catch(x) {
            console.log('DWP: An error occured');
            console.log(x.message);
            if (x.stack) { console.log(x.stack); }
        }
        
    }
    
    
    window.setInterval(process, 2000);	// Process every 2 seconds since the site uses AJAX to switch pages.
    window.setTimeout(process, 1000);	// Also process 1 second after the initial page load for the benefit of those with faster connections.
    process();							// Process immediately just in case, but the page probably isn't ready for this yet.
    
})();
