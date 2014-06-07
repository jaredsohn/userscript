// ==UserScript==
// @name release:txt
// @id   release_txt
// @namespace   http://userscripts.org/scripts/show/156420
// @homepageURL http://userscripts.org/scripts/show/156420
// @downloadURL http://userscripts.org/scripts/source/156420.user.js
// @updateURL   http://userscripts.org/scripts/source/156420.meta.js
// @author  DMBoxer
// @version 2014.04.25.01
// @description Get a music release info and tracklist from discogs.com, beatport.com, mixcloud.com, junodownload.com, bandcamp.com and soundcloud.com [BETA]
// @grant   none
// @run-at  document-end
// @include http*://*.bandcamp.com/*
// @include http*://www.beatport.com/*
// @include http*://mixes.beatport.com/*
// @include http*://www.discogs.com/*/release/*
// @include http*://www.discogs.com/release/*
// @include http*://www.junodownload.com/charts/mixcloud/*
// @include http*://www.junodownload.com/charts/dj/*
// @include http*://www.junodownload.com/charts/juno-recommends/*
// @include http*://www.junodownload.com/products/*
// @include http*://www.mixcloud.com/*
// @include http*://soundcloud.com/*
// ==/UserScript==


/*jslint browser: true, passfail: false, sloppy: true, nomen: false, vars: true, white: true, todo: false*/

// BEGIN CONFIGURATION
var releaseLineFormat = '%artist% - %title% (by %by%) [%label% %catalog%] (%year%)';
var sectionLineSeparator = '_';
var textWidth = 90;
// END CONFIGURATION


// ==================================================================================================================
// Debugging/Text patterns analysis
// ==================================================================================================================

String.prototype.anal = function anal(prefix) {
    // return text showing text linefeeds, carriage returns, tabs, non-breaking spaces
    var text = this.replace(/[\xA0\u200e]/g, '_').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    console.log(((prefix === undefined) ? '' : prefix + ': ') + text);
    return text;
};


// ==================================================================================================================
// JAVASCRIPT OBJECTS PROTOTYPE FUNCTIONS TOOLBOX
// String, data/time... objects extensions.
// ==================================================================================================================



/* FIREFOX COMPATIBILITY - PARTIAL EMULATION with .textContent of Chrome's elegant .innerText property
   based on tags seen in the target sites descriptions: this does NOT aim at being a spec-abiding emulation !
   Native browser or added prototype .innerText are NOT overriden if present. Used only for description texts */
if (!HTMLElement.prototype.hasOwnProperty("innerText")) {
    Object.defineProperty(HTMLElement.prototype, "innerText", {
        get: function () {
            // linebreaks optimization before .textContent with support for just a few very basic HTML tags.
            var thisHTML = this.innerHTML, text;
            thisHTML = thisHTML.replace(/\s+/g, ' '); // discogs.com: in-text multiple space+tabs+linebreaks mess fixed to single-space chars
            thisHTML = thisHTML.replace(/<\/p>/ig, '\n\n</p>'); // 2x linebreaks before element closing
            thisHTML = thisHTML.replace(/<\/(li|ul|ol|table|tr)>/ig, '\n</$1>'); // 1 linebreak before element closing
            thisHTML = thisHTML.replace(/<br>/ig, '\n<br>'); // 1 linebreak
            //thisHTML.anal('innerHTML');
            this.innerHTML = thisHTML;
            text = this.textContent;
            //text.anal('innerText');
            return text;
        }
    });
} else {
    console.log('HTMLElement.prototype.innerText overwrite skipped');
}

if (!HTMLElement.prototype.hasOwnProperty("expandLinks")) {
    HTMLElement.prototype.expandLinks = function expandLinks() {
        // reveal links url in description text - side effect: FIXES THE HTML SOURCE PAGE TOO.
        var l, links = this.getElementsByTagName('a'), linkurl, r1, r2;
        for (l = 0; l < links.length; l += 1) {
            if (links[l].href.substr(0, 4) === 'http') {
                // split link url on '…' & '...' plus '%', ';', '+' as at least mixcloud somehow messes up link label html chars
                r1 = new RegExp('^' + (links[l].textContent.tidyurl(true).split(new RegExp('…|\\.\\.\\.|%|;|\\+'))[0]).escapeRegExp(), 'i');
                r2 = new RegExp((links[l].textContent.tidyurl(true)).escapeRegExp() + '$', 'i');
                linkurl = links[l].href.tidyurl(true); // stripping protocol prefix, ? arguments and # anchors
                if (linkurl.match(r1) !== null || linkurl.match(r2) !== null) {
                    // link label is part of start or end of its href url => substitute link label with href url
                    links[l].textContent = links[l].href.tidyurl(false);
                } else {
                    // link label not derived from its truncated url => append ' [href]' to it
                    links[l].textContent += ' [' + links[l].href.tidyurl(false) + ']';
                }
            }
        }
        return this;
    };
} else {
    console.log('HTMLElement.prototype.expandLinks() overwrite skipped');
}

String.prototype.escapeRegExp = function escapeRegExp() {
    // stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
    // "$&" inserts the matched substring. http://www.tutorialspoint.com/javascript/string_replace.htm
    return this.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

String.prototype.trim = function trim() {
    // including line feeds, tabs, non-breaking spaces in ASCII & Unicode, ...
    return this.replace(/^[\s\xA0\u200e]+|[\s\xA0\u200e]+$/g, '');
};

String.prototype.tidyline = function tidyline() {
    // to be applied to html node .textContent expected to be one single line of text
    // removes all linebreaks and non-breaking spaces and fuse adjacent spaces into just one
    // trim left+right including line feeds, tabs, non-breaking spaces in ASCII & Unicode, ...
    var text = this.toString();
    text = text.replace(/[\s\xA0\u200e]+/g, ' ').replace(/^\s+|\s+$/g, '');
    return text;
};

String.prototype.tidydate = function tidydate() {
    var date = this.toString(), toDate;
    if (date.match(/[a-z]+/) !== null) {
        // Remove ',' '-' (e.g. in '5 January, 2009', '28-January-2013') + Capitalize month
        date = date.replace(/[,]/g, '').replace(/[\-\.]/g, ' ').toInitials();
    } else {
        // convert to ISO date yyyy-mm-dd - input d/m/y assumed 
        date = date.replace(/[\.\-]/g, '/').split('/').reverse().map(function (n) { return (n.length === 1) ? '0' + n : n; }).join('-');
    }
    return date;
};

String.prototype.tidyurl = function tidyurl(optRemoveArguments) {
    // remove 'http(s)://' protocol from URL
    // optional: 'false' to leave query arguments after '?' and '#' anchor
    var url = this.toString().trim(); // trim() required for .expandLinks() correct operations on link labels.
    if (optRemoveArguments === undefined) { optRemoveArguments = true; }
    url = url.replace(/^http[s]{0,1}\:\/\//i, '');
    if (optRemoveArguments) {
        url = url.split('?')[0]; // keep only the part before the '?' char
        url = url.split('#')[0]; // keep only the part before the '#' char
    }
    if (url.match(/\/$/) !== null) {
        if (url.match(/\//g).length === 1) { url = url.replace(/\/$/, ''); } // domain with trailer '/', no path
    }
    return url;
};

String.prototype.parentDomain = function parentDomain() {
    // input can be any url with or without protocol header
    var url = this.toString().replace(/^http[s]{0,1}\:\/\//i, '').split('/')[0].split('.'); // capture domain members
    return url.slice(url.length - 2).join('.'); // just the last 2 domain members e.g. 'soundcloud' and 'com'
};

String.prototype.toInitials = function toInitials() {
    // convert each word in a string to Proper case
    var text = this.toString();
    text = text.replace(/(\w+)/g, function (word) {
        var exceptions = ['va', 'ep', 'lp', 'dj', 'mc', 'feat', 'ft', 'featuring', 'with', 'and', 'vs'];
        if (exceptions.indexOf(word.toLowerCase()) === -1) {
            word = word.charAt(0).toUpperCase() + word.substring(1, word.length).toLowerCase();
        }
        return word;
    });
    return text;
};

String.prototype.rfill = function rfill(toLength, optFiller) {
    // extend string toLength (required) on the right with optFiller character (optional, default is ' ')
    if (optFiller === undefined) { optFiller = ' '; }
    var text = this, fillerArray = [];
    if (text.length < toLength + 1) {
        fillerArray.length = toLength + 1 - text.length;
        text += fillerArray.join(optFiller);
    }
    return text;
};

String.prototype.lfill = function lfill(toLength, optFiller) {
    // extend string toLength (required) on the left with optFiller character (optional, default is ' ')
    if (optFiller === undefined) { optFiller = ' '; }
    var text = this, fillerArray = [];
    if (text.length < toLength + 1) {
        fillerArray.length = toLength + 1 - text.length;
        text = fillerArray.join(optFiller) + text;
    }
    return text;
};

String.prototype.timecodefill = function timecodefill(toLength) {
// left-fills timecode string using '00:00:00' mask up to toLength argument
// if toLength argument is ommitted, timecode string returns unchanged
    var timecode = this, tcmask = '00:00:00';
    if (toLength === undefined) { toLength = timecode.length; }
    if (timecode.length < toLength) {
        timecode = tcmask.substr(9 - toLength - 1, toLength - timecode.length) + timecode;
    }
    return timecode;
};

String.prototype.headerline = function headerline(toLength, optFiller) {
    // return section title header with line filled with repeated seperator
    if (toLength === undefined) { toLength = textWidth; }
    if (optFiller === undefined) { optFiller = sectionLineSeparator; }
    var fillerArray = [];
    fillerArray.length = toLength - this.length + ((this.toString() === '') ? 1 : 0);
    return ((this.toString() === '') ? '' : this + ' ') + fillerArray.join(optFiller);
};

String.prototype.filesystemsafe = function filesystemsafe() {
    // convert known (windows) forbidden characters: / \ : * ? " < > | to their best possible equivalent
    var name = this.toString();
    name = name.replace(/(\d+)[\/\\\|]([\w\d]+)[\/\\\|](\d+)/g, '$1.$2.$3'); // convert '/' date separator to '.'
    name = name.replace(/[ ]?[\/\\\|][ ]?/g, ', '); // convert '/' '\' '|' (with any surrounding single-space chat) to ', ' 
    name = name.replace(/[\:]/g, ';'); // convert : to ;
    name = name.replace(/[\?]/g, String.fromCharCode(191)); // convert ? to ¿ (upside-down question mark)
    name = name.replace(/[\"]/g, "'"); // convert " to '
    name = name.replace(/[\*<>]/g, '_'); // convert * < > to _ (underscore)
    return name;
};

String.prototype.timeToMillisec = function timeToMillisec() {
    // Input format supported string: hh:mm:ss, mm:ss, ss. +/- sign is stripped out if present.
    // Returns an absolute number in milliseconds for maximum Date/Time js functions compatibility
    var times = this.replace(/^[\-+]/, '').split(':').reverse().map(Number);
    return (times[0] + ((times.length < 2) ? 0 : times[1]) * 60 + ((times.length < 3) ? 0 : times[2]) * 60 * 60) * 1000;
};

Number.prototype.millisecToString = function millisecToString() {
    // Input a number in milliseconds. Returns a string formatted hh:mm:ss
    // !!! for some reason js .toTimeString() gives 1 hour too much and .toGMTString() seems correct,
    // at least with mixcloud.com duration timecodes.
    // not sure this works correctly for all Locales/Timezones and for more than mixcloud   !!!
    return new Date(this).toGMTString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
};

String.prototype.ageToDate = function ageToDate() {
    // transforms age into a date string. e.g. "18 days ago" => "25 December 2012"
    // supports unit singular, plural and shorthand (3 first letters min.)
    // ignores any additional word after 'n [unit]'
    // n minutes, hours, days  =>  day month year
    // n weeks, months         =>  month year
    // n years                 =>  year
    // output: day 1 or 2 digits, month by name, year 4 digits
    var age = this.trim().toLowerCase().split(' '),
        toDate = '',
        monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (age.length > 1) {
        switch (age[1].substr(0, 3)) {
        case 'yea':
            toDate = new Date().getFullYear() - age[0];
            break;
        case 'mon':
            toDate = new Date(new Date().getFullYear() * 12 + new Date().getMonth() - age[0]);
            toDate = monthNames[toDate % 12] + ' ' + Math.floor(toDate / 12);
            break;
        case 'wee':
            toDate = new Date(new Date() - age[0] * 7 * 24 * 60 * 60 * 1000);
            toDate = monthNames[toDate.getMonth()] + ' ' + toDate.getFullYear();
            break;
        case 'day':
            toDate = new Date(new Date() - age[0] * 24 * 60 * 60 * 1000);
            toDate = toDate.getDate() + ' ' + monthNames[toDate.getMonth()] + ' ' + toDate.getFullYear();
            break;
        case 'hou':
            toDate = new Date(new Date() - age[0] * 60 * 60 * 1000);
            toDate = toDate.getDate() + ' ' + monthNames[toDate.getMonth()] + ' ' + toDate.getFullYear();
            break;
        case 'min':
            toDate = new Date(new Date() - age[0] * 60 * 1000);
            toDate = toDate.getDate() + ' ' + monthNames[toDate.getMonth()] + ' ' + toDate.getFullYear();
            break;
        case 'sec':
            toDate = new Date(new Date() - age[0] * 1000);
            toDate = toDate.getDate() + ' ' + monthNames[toDate.getMonth()] + ' ' + toDate.getFullYear();
            break;
        default:
            toDate = this; // unsupported, return input unchanged
        }
    } else {
        toDate = this; // unsupported, return input unchanged
    }
    return toDate.toString();
};


   
// ==================================================================================================================
// DATA COLLECTION Release OBJECT MODEL & PROTOTYPE FUNCTIONS
// this should never be edited with site source-specific code. 
// Any source-specific processing must happen in the getRelease_[source] Release data collectors
// ==================================================================================================================

// RELEASE OBJECT MODEL ===================================================================================
// tracklist is a regular js array of Track() objects
// description is a regular js array of Section() objects
// more properties can be added to the 'Release' main object, just as with any js object.
// user-added properties of type 'string' will show at the end of the release profile section
// in the order they were added to the object

function Track(number, artist, title, time, bpm, credits, release, label) {
    // Release.tracklist() is a regular js array of Track() objects.
    // default all properties to empty string '': we don't want 'undefined' testing in the code
    this.number = number; this.number = '';
    this.artist = artist; this.artist = '';
    this.title = title; this.title = '';
    this.time = time; this.time = '';
    this.bpm = bpm; this.bpm = '';
    this.credits = credits; this.credits = '';
    this.release = release; this.release = '';
    this.label = label; this.label = '';
}

function Section(title, content) {
    // Release.description is a regular js array of additional description Section() objects
    this.title = title; this.title = '';
    this.content = content; this.content = '';
}

function Release(artist, title, by, label, catalog, format, tracks, country, released, genre, style, duration, tracklist, description) {
    // profile properties naming is mostly aligned to discogs.com release profile naming conventions.
    // Release  properties can be added on the fly by code, as js permits with any object: Release.myproperty = 'myvalue'
    // string properties, both pre-defined and user-code added, are all read for release profile information building.

    // string properties
    this.artist = artist; this.artist = '';
    this.title = title; this.title = '';
    this.by = by; this.by = ''; // mix & compilation artist(s)
    this.label = label; this.label = '';
    this.catalog = catalog; this.catalog = '';
    this.released = released; this.released = '';
    this.format = format; this.format = '';
    this.tracks = tracks; this.tracks = '';
    this.country = country; this.country = '';
    this.genre = genre; this.genre = '';
    this.style = style; this.style = '';
    this.duration = duration; this.duration = '';
    // array properties
    this.tracklist = tracklist; this.tracklist = [];
    this.description = description; this.description = [];
    // read-only computed properties 
    Object.defineProperty(this, 'year', { enumerable: true, get: function () {
        var rlsYear = this.released.toString().match(/[\d]{4}/);
        return (rlsYear === null) ? '' : rlsYear[0];
    }});
    Object.defineProperty(this, 'isMix', { enumerable: false, get: function () {
        // returns true if all track.time are set and each track's timecode is > to the previous 
        var areTimecodesIncremental = true, t, previousTimecode = 0;
        if (this.tracklist.length === 0) { areTimecodesIncremental = false; } // empty tracklist
        for (t = 0; t < this.tracklist.length; t += 1) {
            if (this.tracklist[t].time.timeToMillisec() < previousTimecode || this.tracklist[t].time === '') { areTimecodesIncremental = false; break; }
            previousTimecode = this.tracklist[t].time.timeToMillisec();
        }
        return areTimecodesIncremental;
    }});
    Object.defineProperty(this, 'isCompilation', { enumerable: false, get: function () {
        // returns true if for all tracks .artist is set there are different artist names, 
        // that don't contain the release's .artist/.by (case of 'artist ft. xx' album artist tracklists)
        // - strip 'DJ', 'MC' and more to test rls.artist
        // - Remix album => not a VA => add test on track.title for .artist name in Remix etc...
        // - change rule to if >=75% artist names are same as .artist => not a VA (case of artist album + remixes)
        var areTracksOfDifferentArtists = false, t, previousArtist = '', differentArtistCount = 0,
            artistPrefixRexp = new RegExp(((this.artist === '') ? this.by : this.artist).replace(/dj |mc /ig, '').escapeRegExp(), 'i');
        if (this.tracklist.length === 0) { areTracksOfDifferentArtists = false; } // empty tracklist
        for (t = 0; t < this.tracklist.length; t += 1) {
            if (t > 0 &&
                    this.tracklist[t].artist !== '' &&
                    this.tracklist[t].artist.toLowerCase() !== previousArtist &&
                    this.tracklist[t].artist.match(artistPrefixRexp) === null && this.tracklist[t].title.match(artistPrefixRexp) === null) {
                differentArtistCount += 1;
            }
            previousArtist = this.tracklist[t].artist.toLowerCase();
        }
        // more than 25% is from different artists ?
        return (differentArtistCount > t * 0.25) ? true : false;
    }});
    // TEST: nested tracklist2 + tracks object
    
    
    
}


// DEDICATED Release OBJECTS PROTOTYPE METHODS ===============================================================


Release.prototype.normalizeTimecodes = function normalizeTimecodes() {
    // Align all timecodes in tracklist to shortest necessary timecode length
    // if all tracks timecodes start with '00' we strip '00:' out of all time strings
    if (!this.tracklist.some(function (trk) { return (trk.time.substr(0, 2) !== '00'); })) {
        this.tracklist = this.tracklist.map(function (trk) {
            trk.time = trk.time.replace(/^00\:/g, '');
            return trk;
        });
    }
    // if all tracks timecodes start with '0' we strip it out of all time strings
    if (!this.tracklist.some(function (trk) { return (trk.time.substr(0, 1) !== '0'); })) {
        this.tracklist = this.tracklist.map(function (trk) {
            trk.time = trk.time.replace(/^0[:]?/, '');
            return trk;
        });
    }
    // case of tracks broken down in sections with only the main having a duration
    // if at least one track has a duration set, set .time = '-' if empty to tracks with a .number
    if (this.tracklist.some(function (trk) { return (trk.time !== ''); })) {
        this.tracklist = this.tracklist.map(function (trk) {
            if (trk.number !== '' && trk.time === '') { trk.time = '-'; }
            return trk;
        });
    }
};

Release.prototype.normalizeProfile = function normalizeProfile() {
    // HEURISTICS on title, artist, (uploaded) by, label, catalog# based on a set of guesswork rules:
    // - detect if uploader (.by) name is the .artist or .label
    // - remove artist, .label, .catalog redundant info from .title
    // - clean-up .title string from layout remainders such as empty leading/trailing separators, brackets, parenthesis
    // Method best applied after tracklist has been populated (Release.isCompilation property is checked)
    // Most useful for user-contributed content platforms using 'By (username)' syntax such Mixcloud, Souncloud, Bandcamp...
    // EXECUTION ORDER BELOW MATTERS !
    // TODO (mixcloud): add support to heuristics on syntax "Artist At...", "Artist @ ", "Artist Live At "...
    // TODO (mixcloud): add support to heuristics when removespace(lower(rls.Title") includes lower(rls.By) ex. Acidpauli

    var rgxp = '', tmpstr = '';

    // uploader username is at beginning of title => strip it out & set to artist
    // .by plus '-' or '|' with/without surrounding spaces AND .by != .title
    rgxp = new RegExp('^' + this.by.escapeRegExp() + '[ \\-|]*', 'i');
    if (this.by !== '' && this.artist === '' && this.title.toLowerCase() !== this.by.toLowerCase() && this.title.match(rgxp) !== null) {
        this.title = this.title.replace(rgxp, '');
        this.artist = this.by;
        this.by = '';
    }
    // detect if 'artist - title...', 'artist | title...'
    // TODO: add case of artist "title" ..., artist 'title'...
    rgxp = new RegExp(' \\(|@| vol\\.', 'i'); // only part before '(' '@' 'vol.' empirically considered relevant
    tmpstr = this.title.split(rgxp)[0];
    rgxp = new RegExp(' [\\-|] ');
    if (this.artist === '' && tmpstr.split(rgxp).length > 1) {
        this.artist = tmpstr.split(rgxp)[0];
        this.title = this.title.replace(new RegExp('^' + this.artist.escapeRegExp() + ' [\\-|] ', 'i'), '');
    }
    // uploader username same as label or artist => clear redundant .by
    if (this.label.toLowerCase() === this.by.toLowerCase()) { this.by = ''; } // label upload
    if (this.artist.toLowerCase() === this.by.toLowerCase()) { this.by = ''; } // artist upload
    // if this is a compilation and not a mix, set artist to 'VA' and title to 'title (by '.by')'
    rgxp = new RegExp(this.by.escapeRegExp(), 'i');
    // DEACTIVATED - Oneliner was changed to include (by %by%)
    //if (this.artist === '' && this.isCompilation && !this.isMix && this.title.match(rgxp) === null) {
    //    this.title = this.title + ((this.by === '') ? '' : ' (by ' + this.by + ')');
    //    this.artist = 'VA';
    //}
    // artist empty => set to 'by' uploader username by default
    if (this.artist === '' && this.by !== '') {
        this.artist = this.by;
        this.by = '';
    }

    // .tracks empty => set from tracklist length
    if (this.tracks === '' && this.tracklist.length > 0) { this.tracks = this.tracklist.length.toString(); }

    // clean-up: strip duplicate info from .title if already captured in .catalog property
    rgxp = new RegExp('([\\[\\(])' + this.catalog.escapeRegExp() + '|' + this.catalog.escapeRegExp() + '([\\]\\)])', 'i');
    if (this.catalog !== '' && this.title.match(rgxp) !== null) { this.title = this.title.replace(rgxp, '$1'); }
    // clean-up: strip duplicate info from .title if already captured in .label property
    rgxp = new RegExp('([\\[\\(])' + this.label + '|' + this.label + '([\\]\\)])', 'i');
    if (this.label !== '' && this.title.match(rgxp) !== null) { this.title = this.title.replace(rgxp, '$1'); }
    // clean-up: rls.title string
    this.title = this.title.replace(/^[ \-|]*|[ \-|]*$/g, '');             // trim title off of empty leading & trailing space/dash/pipe separator 
    this.title = this.title.replace(/\| *\||\- *\-|\[ *\]|\( *[\)]/g, ''); // empty '[ ]' brackets (\x5B \x5D), '( )' parentheses (\x28 \x29), '- -' (\x2D) and '| |' sections
    this.title = this.title.replace(/([\[\(]) +| +([\)\]])/g, '$1$2');     // trim space before ']', ')' or after '[', '('
    this.title = this.title.replace(/ +/g, ' ');                           // fix multiple contiguous space-chars to one

    // normalize caps for artist, title, by & label
    if (this.artist.toUpperCase() === this.artist || this.artist.toLowerCase() === this.artist) { this.artist = this.artist.toInitials(); }
    if (this.title.toUpperCase() === this.title || this.title.toLowerCase() === this.title) { this.title = this.title.toInitials(); }
    if (this.by.toUpperCase() === this.by || this.by.toLowerCase() === this.by) { this.by = this.by.toInitials(); }
    if (this.label.toUpperCase() === this.label) { this.label = this.label.toInitials(); } // no change on all-lower case: domain name as label allowed & must stay unchanged

};


// DEDICATED Release OBJECTS TEXT FORMAT PROTOTYPE METHODS ====================================================


Track.prototype.TXT = function TXT(fieldsSize, skipartist) {
    // return formatted text line for the Track. we expect each Track to have at least a title.
    // required fieldsSize argument with a Track object providing string size for each property
    // optional skipartist argument to handle the case of single-artist releases
    if (skipartist === undefined) { skipartist = false; }
    var spaceToTrack = ((this.time.toString() === '') ? 0 : fieldsSize.time + 3) + ((this.number.toString() === '') ? 0 : fieldsSize.number + 2);
    return ((this.time.toString() === '') ? '' : ((this.time.toString() === '-') ? ''.lfill(fieldsSize.time + 3) : '[' + this.time.timecodefill(fieldsSize.time) + '] ')) +
               ((this.number.toString() === '') ? '' : this.number.lfill(fieldsSize.number) + '. ') +
               ((skipartist || this.artist.toString() === '') ? '' : this.artist + ' - ') +
               ((this.title === '') ? 'unknown' : this.title) +
               ((this.release + this.label === '') ? '' : ' [' + this.release + ((this.release === '' || this.label === '') ? '' : ', ') + this.label + ']') +
               ((this.bpm.toString() === '') ? '' : ' (' + this.bpm.toString() + ' bpm)') +
               ((this.credits.toString() === '') ? '' : '\n' + ''.headerline(spaceToTrack + 2, ' ') + this.credits.replace(/\n/g, '\n' + ''.headerline(spaceToTrack + 2, ' ')));
};

Release.prototype.TXT_tracklist = function TXT_tracklist() {
    // build tracklist text block
    var trklistTXT = '',
        trklist = this.tracklist, t, trk = new Track(),
        trksfieldsize = new Track(), k, keys = Object.keys(trk);
    // calculate max nb. characters for each Track property in tracklist into a Track object, for text alignment purposes
    for (t = 0; t < this.tracklist.length; t += 1) {
        trk = trklist[t];
        for (k = 0; k < keys.length; k += 1) {
            if (trk[keys[k]].length > trksfieldsize[keys[k]]) {
                trksfieldsize[keys[k]] = trk[keys[k]].length;
            }
        }
    }
    // are all tracks from the same artist as the release artist ?
    var rlsartist = this.artist.toLowerCase(),
        isSingleArtist = !this.tracklist.some(function (trk) { return (trk.artist.toLowerCase() !== rlsartist); });
    // build and return text block
    for (t = 0; t < trklist.length; t += 1) {
        trklistTXT += trklist[t].TXT(trksfieldsize, isSingleArtist) + '\n';
    }
    return trklistTXT;
};

Release.prototype.TXT_oneliner = function TXT_oneliner() {
    // one line release description string, based on mask and Release object properties of type 'string'
    var line = releaseLineFormat, attrib = '', k = 0, keys = Object.keys(this);
    for (k = 0; k < keys.length; k += 1) {
        if (typeof this[keys[k]] === 'string' && this[keys[k]] !== '') {
            // attribute content fixed to single line if needed
            attrib = this[keys[k]].replace(/ \s+\S/g, ', ').trim();
            // substitute %label% with Content into the releasLineFormat pre-formatted mask
            line = line.replace(new RegExp('%' + keys[k] + '%', 'ig'), attrib);
        } else {
            // empty Content => remove %label% section from one-liner if present
            line = line.replace(new RegExp('%' + keys[k] + '%', 'ig'), '');
        }
        // remove empty sections from the result, if any
        line = line.replace(/\(by \)/g, ''); // remove empty '(by )'
        line = line.replace(/ +\]/g, ']'); // space before ]
        line = line.replace(/\[ +/g, '['); // space after [
        line = line.replace(/ +\)/g, ')'); // space before )
        line = line.replace(/\( +/g, '('); // space after (
        line = line.replace(/\[ *\]/g, ''); // empty [ ] brackets. '['=\x5B, ']'=\x5D
        line = line.replace(/\( *\)/g, ''); // empty ( ) parentheses. '('=\x28 ')'=\x29
        line = line.replace(/(^ *\- *|\- *\-| *\- *$)/g, ''); // empty '- -' sections. '-'=\x2D
        line = line.replace(/ +/g, ' '); // fix multiple to single-space
    }
    // convert known characters forbidden in a filename, if any
    line = line.filesystemsafe();
    return line;
};

Release.prototype.TXT_profile = function TXT_profile() {
    // release profile text, based on the non-empty Release object 'string' properties (no arrays, objects...)
    // computed properties such as .year are ignored
    // user added 'string' properties appear in the same order they were added to the Release object. 
    var k, profile = '', keysmaxlenght = 0, keys = Object.keys(this);
    // max profile label string length for text formatting purposes
    for (k = 0; k < keys.length; k += 1) {
        if (typeof this[keys[k]] === 'string' && keys[k].length > keysmaxlenght) {
            keysmaxlenght = keys[k].length;
        }
    }
    // build profile text block using enumerable properties
    for (k = 0; k < keys.length; k += 1) {
        if (typeof this[keys[k]] === 'string' && keys[k] !== 'year' && this[keys[k]] !== '') {
            // Release property content, fixed to single line if needed
            profile += keys[k].replace(/_/g, ' ').toInitials().lfill(keysmaxlenght + 1, ' ') + ': ' + this[keys[k]].replace(/ \s+\S/g, ', ').trim() + '\n';
        }
    }
    return profile;
};

Release.prototype.TXT = function TXT() {
    // full release info returned as formatted text. builds on the other 'TXT_...' prototype methods
    var rlsTXT = '', d = 0;
    // release oneliner
    rlsTXT = this.TXT_oneliner() + '\n';
    // release profile section
    rlsTXT += ''.headerline() + '\n\n';
    rlsTXT += this.TXT_profile() + '\n';
    // tracklist section, with or without artist name, track duration and additional credits
    if (this.tracklist.length > 0) {
        rlsTXT += 'Tracklist'.headerline() + '\n\n';
        rlsTXT += this.TXT_tracklist() + '\n';
    }
    // additional description sections, if any
    for (d = 0; d < this.description.length; d += 1) {
        rlsTXT += this.description[d].title.headerline() + '\n\n';
        rlsTXT += this.description[d].content + '\n\n';
    }
    // final divider line
    rlsTXT += '__ generated by release:txt'.headerline() + '\n';
    // exit
    return rlsTXT;
};


// ==================================================================================================================
// USER INTERFACE WITH BUTTONS & TXTAREA 
// ==================================================================================================================


function releaseTXT_plusminus() {
    // button to expand/collapse the text box vertically
    var htmldoc = window.top.document,
        txtbox = htmldoc.getElementById('releaseTXT_txtbox'),
        plusminus = htmldoc.getElementById('plusminusTXT_button');
    if (plusminus.value === '+') {
        plusminus.value = '-';
        // expand to 80% of the browser's document window height
        // TODO: how to allow user-resize height down (dragging bottom to upwards) in Chrome ?
        // it's possible only if the user has dragged & resized it BEFORE clicking the '+' button ...
        txtbox.style.height = window.innerHeight * 0.8 + 'px';
    } else {
        plusminus.value = '+';
        // collapse text back to its original min-height
        txtbox.style.height = txtbox.style.minHeight;
    }
}

function releaseTXT_buildUI(additionalContainerCSS, insertContainerBeforeNode) {
    // build & insert script's user interface into the web page
    // optional additionalContainerCSS string: UI container styling. 
    // optional insertContainerBeforeNode html node: before which the UI should be inserted
    // style properties passed via this argument take precedence

    var htmldoc = window.top.document,
        UIcontainer = htmldoc.createElement('div'),
        div = htmldoc.createElement('div'),
        gettxt = htmldoc.createElement('input'),
        plusminus = htmldoc.createElement('input'),
        txtbox = htmldoc.createElement('textarea');

    // make way for the UI insert, same height as UI container
    htmldoc.body.style.paddingTop = '24px';

    // insert and style main UI container - default: insert UI before first <div> in <body>
    if (insertContainerBeforeNode === undefined) {
        insertContainerBeforeNode = htmldoc.getElementsByTagName('body')[0].getElementsByTagName('div')[0];
    }
    UIcontainer = insertContainerBeforeNode.parentNode.insertBefore(UIcontainer, insertContainerBeforeNode);
    UIcontainer.id = 'releaseTXT_header';
    UIcontainer.style.cssText = 'position: fixed; z-index: 9999; margin-top: -24px; height: 24px; width: 100%; background-color: #000000; ';
    if (additionalContainerCSS !== undefined) {
        UIcontainer.style.cssText += additionalContainerCSS;

    }

    // build nested div for buttons & text box
    div.id = 'releaseTXT_innerDiv';
    div.style.cssText = 'margin: 0 auto; height: 24px; width: 990px; resize: both; ';

    // build button to trigger main 'releaseTXT_main()' function
    gettxt.type = 'button';
    gettxt.id = 'releaseTXT_button';
    gettxt.value = 'release:txt';
    gettxt.addEventListener('click', function (e) { releaseTXT_main('txt_button'); }, false);
    gettxt.style.cssText = 'margin: 2px 1px 2px 10px; padding: 0px 5px 1px 5px; height: 20px; vertical-align: top; font-family: verdana; font-size: 10px; ';
    //soundcloud COUNTER INHERITED BUTTON STYLE: "color: #333; background: #fff; border: 1px solid #ccc; " border-width: 0px; 
    gettxt.style.cssText += 'color: #000; background-color: buttonface; border: solid 1px #333; border-radius: 6px; ';

    // build plus/minus button
    plusminus.type = 'button';
    plusminus.id = 'plusminusTXT_button';
    plusminus.value = '+';
    plusminus.addEventListener('click', releaseTXT_plusminus, false);
    plusminus.style.cssText = 'margin: 2px 1px; padding: 0px 0px 1px 0px; height: 20px; width: 18px; vertical-align: top; font-family: verdana; font-size: 10px;';
    // soundcloud COUNTER INHERITED BUTTON STYLE: "color: #333; background: #fff; border: 1px solid #ccc; "
    plusminus.style.cssText += 'color: #000; background-color: buttonface; border: solid 1px #333; border-radius: 6px; ';

    // build editable text box to collect release TXT output. ' + UIcontainer.style.backgroundColor + '
    txtbox.id = 'releaseTXT_txtbox';
    txtbox.value = 'click to get the text version of this release...';
    txtbox.spellcheck = false;
    txtbox.style.cssText = 'margin: 2px 1px 2px 1px; padding: 2px 1px 1px 5px; min-height: 15px; height: 15px; width: 750px; vertical-align: top; ' +
                           'resize: both; overflow: none; ' +
                           'font-family: monospace; font-size: 12px; line-height: 15px; ' +
                           'border: solid; border-width: 1px; border-color: #d7d7d7; border-radius: 6px; ' +
                           'box-shadow: inset 1px 1px 3px 0px #333; ';
    // soundcloud COUNTER INHERITED TXTAREA STYLE: "color: #333; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;"
    txtbox.style.cssText += 'color: #000; -webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing: content-box; ';

    // add the elements to the main UI container
    div = UIcontainer.appendChild(div);
    gettxt = div.appendChild(gettxt);
    plusminus = div.appendChild(plusminus);
    txtbox = div.appendChild(txtbox);

    // return the container object to caller
    return UIcontainer;
}



// ==================================================================================================================
// SITE-SPECIFIC RELEASE DATA COLLECTION FUNCTIONS
// add getRelease_[source]() function to add support of other discographic release pages
// raw data only -all formatting stripped- to be fed into the 'Release' object
// ==================================================================================================================


// ====================================
// bandcamp.com release data collection
// ====================================
// CH/Tampermonkey users can add a 'User include' for the private domain bandcamp pages
// FF/Greasemonkey users can add it manually to this script's meta @includes, but will be overwritten by updates...

Release.prototype.get_bandcamp = function getRelease() {

    // page to parse and new Release object to collect data in
    var htmldoc = window.top.document,
        rls = new Release(), rlsDescriptionSection, trackrows, t, trk,
        creditsInfo = '', productInfo = '', isCompilation = true, regxp;

    // PROFILE information
    // note: isCompilation is currently guesswork true if ALL track names formatted as 'artist - title'
    //       can't be sure the 'By' on bandcamp is always a label in that case...
    //       no straightforward way to get an actual label name in case of an artist release either...
    rls.by = htmldoc.getElementById('name-section').querySelector('[itemprop=byArtist]').textContent.tidyline();
    rls.title = htmldoc.getElementById('name-section').getElementsByClassName('trackTitle')[0].textContent.tidyline();
    rls.label = htmldoc.domain.tidyurl();
    rls.catalog = '';
    rls.released = htmldoc.getElementById('trackInfoInner').getElementsByClassName('tralbum-credits')[0].firstChild.textContent.tidyline().replace(/released /i, '');
    creditsInfo = htmldoc.getElementById('trackInfoInner').getElementsByClassName('tralbum-credits')[0].innerText.replace(/released [ \w\d]+/i, '').trim();
    // TODO? support for more than 1 sales item for the release. Digital Download  is managed correctly and seems to always come first so far.
    if (htmldoc.getElementById('trackInfoInner').getElementsByClassName('buyItemPackageTitle')[0] !== undefined) {
        rls.format = htmldoc.getElementById('trackInfoInner').getElementsByClassName('buyItemPackageTitle')[0].textContent.tidyline();
        rls.format += (htmldoc.getElementById('trackInfoInner').getElementsByClassName('compound-button')[0].textContent.tidyline().match(/Free download/i) === null) ?
                      '' : ', ' + htmldoc.getElementById('trackInfoInner').getElementsByClassName('compound-button')[0].textContent.tidyline();
        // product info not the standard 'Immediate download of n-track album in your choice of MP3 320, FLAC,...' => collect for Description
        regxp = new RegExp('Immediate download of \\d+\\-track album in your choice of MP3 320, FLAC, or just about any other format you could possibly desire\\.', 'i');
        productInfo = htmldoc.getElementById('trackInfoInner').getElementsByClassName('bd')[0].innerText.replace(regxp, '').trim();
    }
    // source specific release profile properties
    rls.bandcamp = htmldoc.URL.tidyurl();
    rls.tags = htmldoc.getElementById('trackInfoInner').getElementsByClassName('tralbum-tags')[0].textContent.replace(/^\s+tags\:\s+|\s+$/ig, '').replace(/\n\s+/g, ', ').tidyline();

    // DESCRIPTION Section (optional)
    // note: doing before profile info, as there may be more info to be added parsed for rls.format
    rlsDescriptionSection = new Section();
    rlsDescriptionSection.title = 'Description';
    // special product info captured in the profile format collection (optional)
    if (productInfo !== '') {
        rlsDescriptionSection.content = productInfo;
    }
    // release description (optional)
    if (htmldoc.getElementById('trackInfoInner').getElementsByClassName('tralbum-about')[0] !== undefined) {
        rlsDescriptionSection.content += (rlsDescriptionSection.content === '') ? '' : '\n\n';
        rlsDescriptionSection.content += htmldoc.getElementById('trackInfoInner').getElementsByClassName('tralbum-about')[0].innerText.trim();
    }
    // description text embedded in credits section (optional)
    if (creditsInfo !== '') {
        rlsDescriptionSection.content += (rlsDescriptionSection.content === '') ? '' : '\n\n';
        rlsDescriptionSection.content += creditsInfo;
    }
    // bio band/label - upper right corner of the page (optional)
    if (htmldoc.getElementById('bio-container').querySelector('[itemprop=description]') !== null || htmldoc.getElementById('band-links') !== null) {
        rlsDescriptionSection.content += ((rlsDescriptionSection.content === '') ? '' : '\n\n') + 'ABOUT:\n';
        // bio band/label (optional)
        if (htmldoc.getElementById('bio-container').querySelector('[itemprop=description]') !== null) {
            rlsDescriptionSection.content += '\n' + htmldoc.getElementById('bio-container').querySelector('[itemprop=description]').content;
        }
        // links band/label (optional)
        if (htmldoc.getElementById('band-links') !== null) {
            var l, links = htmldoc.getElementById('band-links').getElementsByTagName('a');
            for (l = 0; l < links.length; l += 1) {
                rlsDescriptionSection.content += '\n' + links[l].href.tidyurl();
            }
        }
    }
    // store description to Release object if any content was collected
    if (rlsDescriptionSection.content !== '') { rls.description.push(rlsDescriptionSection); }

    // TRACKLIST information from <div> list items in div id='track_row_view'
    // note: we begin with traklist as it's the way to detect if it's an artit release or a compilation
    trackrows = htmldoc.getElementById('track_table').getElementsByClassName('track_row_view');
    for (t = 0; t < trackrows.length; t += 1) {
        trk = new Track();
        trk.number = trackrows[t].getElementsByClassName('track_number secondaryText')[0].textContent.tidyline().replace(/\.$/, '');
        trk.title = trackrows[t].querySelector('[itemprop=name]').textContent.tidyline();
        if (trk.title.split(' - ').length > 1) {
            // compilation: .title 'artist - title' => .artist & .title
            trk.artist = trk.title.split(' - ')[0];
            trk.title = trk.title.split(' - ')[1];
        }
        trk.time = trackrows[t].getElementsByClassName('time secondaryText')[0].textContent.tidyline();
        // append to tracklist array
        rls.tracklist.push(trk);
    }

    // return Release object with collected information
    rls.normalizeProfile(); // HEURISTICS on title, artist, by, label, catalog#
    rls.normalizeTimecodes();
    return rls;
};




// ====================================
// beatport.com release data collection
// ====================================
// last updated 30 January 2014

Release.prototype.get_beatport = function getRelease() {

    // capture document & create new Release object instance
    var htmldoc = window.top.document, rls = new Release(), contentType;
    
    // get type of content from main conent player button: release, chart, ...
    contentType = htmldoc.querySelector('span.play-queue-large>a.btn-play').attributes['data-item-type'].value

    // TRACKLIST - collect first, as we need the list of main track artists to determine list of release profile main artists

    var trackrows = htmldoc.querySelectorAll('table[data-module-type=track_grid]>tbody>tr[data-index]'),
        t, trk, a, artists, genres;
    for (t = 0; t < trackrows.length; t += 1) {
        trk = new Track();
        artists = []; // reset for next track
        genres = [];  // reset for next track
        trk.number = trackrows[t].attributes['data-index'].value;
        if (trackrows[t].querySelector('span[data-json]') === null) {
 
            // Mixes: some tracks can be "MIX ONLY" with no data-json to read info from
            // ex.: http://mixes.beatport.com/mix/saga-chapter-one/126414
            trk.time = trackrows[t].querySelector('td.start-time').textContent; // mix timecode
            trk.title = trackrows[t].querySelector('div.mix-track-name').textContent.toInitials();
            trk.artist = trackrows[t].querySelectorAll('td')[5].textContent.toInitials();
            trk.genre = trackrows[t].querySelectorAll('td')[7].textContent;
            if (trackrows[t].querySelector('td.buy>span') !== null) {
                trk.title = trk.title + ' (' + trackrows[t].querySelector('td.buy>span').textContent + ')';
            }

        } else {
            // only present for tracks actually SOLD on beatport, i.e. not for "MIX ONLY" tracks within mixes.
            var trackdata = JSON.parse(trackrows[t].querySelector('span[data-json]').attributes['data-json'].value);
            trk.title = trackdata.title;
            for (a = 0; a < trackdata.artists.length; a += 1) {
                // if >1 track artist, screen artists list and remove any already present in the title (credited remix, etc...)
                // fixing Beatport's not so readable format: track artists are alpha-sorted and main artist isn't highlighted...
                // exception: http://www.beatport.com/release/surf-smurf/1216910
                if (trk.title.match(new RegExp(trackdata.artists[a].name.escapeRegExp(), 'i')) === null) {
                    artists.push(trackdata.artists[a].name);
                }
            }
            trk.artist = artists.join(', ');
            if (contentType === "mix") {
                trk.time = trackrows[t].querySelector('td.start-time').textContent; // mix timecode
            } else {
                trk.time = trackdata.length; // track length
            }
            if (trackdata.bpm !== 0) { trk.bpm = trackdata.bpm; } // 0 means unknown
    
            // currently not in TXT output - could be leveraged later
            for (a = 0; a < trackdata.genres.length; a += 1) { genres.push(trackdata.genres[a].name); }
            trk.genre = genres.join(', ');
            trk.released = trackdata.releaseDate;
            trk.published = trackdata.publishDate; //differs from .releaseDate for compilations ?
            trk.exclusive = trackdata.exclusive;   // only on Beatport
    
            // relevant only for Charts (not Releases) - we don't want release & label repeat in the tracklist in normal releases
            if (contentType === 'chart' || contentType === 'mix') {
                trk.credits = '"' + trackdata.release.name + '" [' + trackdata.label.name.toInitials() + ']';
            }
        }
        
        // capture tracklist info
        rls.tracklist.push(trk);
            
    }

    // RELEASE PROFILE
    
    // set .artist & .by depending on the type or release/chart
    var artistsLinks = htmldoc.querySelector('div[data-mod-name$=Detail] div.block,p.by-dj,span.byline').querySelectorAll('a');
	var artistsProfile = [], genresProfile = [];
    for (a = 0; a < artistsLinks.length; a += 1) {
        if (contentType === "chart" || contentType === "mix") {
            // Chart: add all profile artist(s) without checking against tracklist artists
            artistsProfile.push(artistsLinks[a].textContent);
        } else {
            // Release: check if the profile artist matches one release track MAIN artist, add it to the release artist list if not listed already
            // this is to weed out remix, featuring, etc... artists
            for (t = 0; t < rls.tracklist.length; t += 1) {
                if (rls.tracklist[t].artist.split(', ').indexOf(artistsLinks[a].textContent) !== -1 && artistsProfile.indexOf(artistsLinks[a].textContent) === -1) {
                    artistsProfile.push(artistsLinks[a].textContent); 
                }
            }
        }
    }
    if (contentType === "mix") {
            // Mix
            rls.artist = artistsProfile.join(', ');
    } else if (contentType === "chart") {
            // Chart => .artist=VA + .by=artist(s)
            rls.artist = 'VA';
            rls.by = artistsProfile.join(', ');
    } else if (artistsProfile.length===0) {
            // release with no artists <a>'s => ASSUME only in case of a compilation...
            rls.artist = 'VA';
    } else if (artistsProfile.length <= 3) {
            // release no more tha 3 artists => set to .artist
            rls.artist = artists.join(', ');
    } else {
            // >3 release artists => change to VA and set artists to .by (by = list of artists)
            rls.artist = 'VA';
            rls.by = artistsProfile.join(', ');
    }

    // PROFILE rest of the info
    // beatport (ab)uses all-caps titles => get from main player meta info
    // TODO: get release/chart/mix duration. e.g. for mixes from 'div#mix-meta>span[data-json]' or is it elesewhere ?

    rls.title = htmldoc.querySelector('span.play-queue-large>a.btn-play[data-item-name]').attributes['data-item-name'].value;
    rls.title = rls.title.replace(/ - /, ': '); // fix any " - " in the title to ": ", it's reserved
    rls.format = 'Digital';
    rls.tracks = rls.tracklist.length.toString();
    rls.beatport = htmldoc.URL.tidyurl(true); // beatport specific property

    if (contentType === "mix") {
        // see "badge-date" rls.released = htmldoc.querySelector('div[data-mod-name$=Detail] p.by-dj').lastChild.textContent.trim();
        if (rls.title.match(/ mix|mix /i) === null) { rls.title = rls.title + ' Mix'; }
        rls.label = "beatport.com";
        genresProfile = htmldoc.querySelectorAll('p.genre-list>a');
        genres = []; // clear
        for (a = 0; a < genresProfile.length; a += 1) { genres.push(genresProfile[a].textContent); }
        rls.genre = genres.join(', ');

    } else if (contentType === "chart") {
        // Chart specific profile info
        rls.released = htmldoc.querySelector('div[data-mod-name$=Detail] p.by-dj').lastChild.textContent.trim();
        rls.title = rls.title + ' Chart ' + rls.released;
        rls.label = "beatport.com";
        genresProfile = htmldoc.querySelectorAll('p.genre-list>a');
        genres = []; // clear
        for (a = 0; a < genresProfile.length; a += 1) { genres.push(genresProfile[a].textContent); }
        rls.genre = genres.join(', ');
        
    } else {
        // Release: references & release date are in a special meta data block
        // beatport localizes 'Release Date', 'Label', 'Catalog #' => can't test => assume they always come in the right order
        var r, metadatarows = htmldoc.querySelectorAll('table.meta-data>tbody>tr');
        rls.released = metadatarows[0].getElementsByTagName('td')[1].textContent.trim();
        rls.label = metadatarows[1].getElementsByTagName('td')[1].textContent.trim().toInitials();
        rls.catalog = metadatarows[2].getElementsByTagName('td')[1].textContent.trim();
        // if more unexpected fields after that, add info as new propreties (security, not seen so far)
        for (r = 3; r < metadatarows.length; r += 1) {
            rls[metadatarows[r].getElementsByTagName('td')[0].textContent.trim().toLowerCase()] = metadatarows[r].getElementsByTagName('td')[1].textContent.trim();
        }
    }
    
    // release description - beatport renders all description texts without any linefeeds/layout, no way to restore it :-(
    if (htmldoc.querySelector('div.description, p.description') !== null) {
        var rlsSection = new Section();
        rlsSection.title = 'Description';
        rlsSection.content = htmldoc.querySelector('div.description, p.description').textContent.trim(); // no formatting to preserve in Beatport descriptions...
        rls.description.push(rlsSection);
    }
    // return Release object with collected information
    rls.normalizeTimecodes();
    return rls;
};




// ===================================
// discogs.com release data collection
// ===================================
// last updated 10 Mar. 2014

Release.prototype.get_discogs = function getRelease() {

    // capture document, Base release info node in page & new Release object instance
    var htmldoc = window.top.document,
		rlsDiv = htmldoc.getElementById('page_content'), // target block 
        rls = new Release();

    // release profile
    var rlsProfile = rlsDiv.getElementsByClassName('profile')[0];
    // artist - title - removes artist(s) trailing '*' (what for?), ' (n)' and fixes compilations as Artist = 'VA'
    rls.artist = rlsProfile.querySelector('h1>span[itemprop=byArtist]').textContent.tidyline();
    rls.artist = rls.artist.replace(/[*]| \(\d+\)/g, '').replace(/^Various$/i, 'VA');
    if (rlsProfile.querySelectorAll('h1>span[itemprop=byArtist]>span[itemprop=name]').length > 2) {
	    // >2 album artist => .artist = VA + .by = list of artists)
        rls.by = rls.artist;
        rls.artist = 'VA';
    }
    rls.title = rlsProfile.querySelector('h1>span[itemprop=name]').textContent.tidyline();
    // loop through the nested profile div's to gather the rest: successive pairs or 'head' & 'content'
    var profileProperties = rlsProfile.querySelectorAll('div.head, div.content'),
        d, rlsLabel, lbl, refs;
    for (d = 0; d < profileProperties.length; d += 2) {
        rlsLabel = profileProperties[d].textContent.tidyline().replace(/\:$/, '').toLowerCase();
        if (rlsLabel === 'label') {
            // parse format 'Label - Catalog' (long dash) - it can be multiple 'Label - Catalog' references
            refs = profileProperties[d + 1].getElementsByTagName('a');
            for (lbl = 0; lbl < refs.length; lbl += 1) {
                rls.label += ((rls.label !== '') ? ' / ' : '') + refs[lbl].textContent.tidyline();
                rls.catalog += ((rls.catalog !== '') ? ' / ' : '') + refs[lbl].nextSibling.textContent.tidyline().replace(/^\u2013 /, '').replace(/,$/, '');
            }
        } else {
            // .head = .content default
            rls[rlsLabel] = profileProperties[d + 1].textContent.tidyline().replace(/\u2013/g, '-');
        }
    }
    // discogs specific added Release property: release ID [link]
    rls.discogs = htmldoc.URL.match(/\d+$/g)[0] + ' [www.discogs.com/release/' + htmldoc.URL.match(/\d+$/g)[0] + ']';

    // each track can be with or without artist name, track duration and additional credits
    // tracklist is skipped if tracklist section is hidden/collapsed by user.
    if (rlsDiv.querySelector('#tracklist>div.section_content').style.display !== 'none') {
        var nbtracks = 0, t, trk, c, creditLines, creditType, creditArtist,
            trackrows = htmldoc.querySelectorAll('#tracklist table.playlist>tbody>tr');
        for (t = 0; t < trackrows.length; t += 1) {
            trk = new Track();
            if (trackrows[t].classList.contains('track_heading')) {
                // chapter separator, e.g. with multi-disc and bonus track sections in the tracklist
                trk.title = trackrows[t].querySelector('td.tracklist_track_title').textContent.tidyline();

            } else {
                // collect actual track description row
                // track count, excluding chapter separator
                nbtracks += 1;
                // track index number 
                trk.number = trackrows[t].querySelector('td.track_pos,td.tracklist_track_pos').textContent.tidyline();
                // artist
                if (trackrows[t].querySelector('td.track_artists,td.tracklist_track_artists') !== null) {
                    // artist(s) (optional) - remove leading and trailing '-' (LONG dash \u2013), '*' (what for?), ' (n)' (different artists with the same name)
                    trk.artist = trackrows[t].querySelector('td.track_artists,td.tracklist_track_artists').textContent.tidyline().replace(/^\u2013 | \u2013$|[*]| \(\d+\)/g, '');
                } else {
                    // no artist: assumed single artist album => set to profile artist
                    trk.artist = rls.artist;
                }
                // title - Replace any LONG dash by a regular dash.
                trk.title = trackrows[t].querySelector('td.track>span.track_title,td.track>span.tracklist_track_title').textContent.tidyline();
                // title credits (optional) - ignored if hidden by user in the page
                if (trackrows[t].querySelector('td.track>blockquote') !== null) {
                    if (trackrows[t].querySelector('td.track>blockquote').style.display !== 'none') {
                        creditLines = trackrows[t].querySelectorAll('td.track>blockquote>span.tracklist_extra_artist_span');
                        for (c = 0; c < creditLines.length; c += 1) {
                            // credit line skipped if it is a single artist credit (e.g. remix) already reflected in the title
                            // more than one artist credited or artist+his credit not already in the track title => add to credit list
                            creditType = creditLines[c].firstChild.textContent.tidyline().split(String.fromCharCode(32, 8211))[0].trim();
                            if (creditLines[c].getElementsByTagName('a').length > 0) {
                                // at least one artist in the credit has a link => capture artist name in the first link
                                creditArtist = creditLines[c].getElementsByTagName('a')[0].textContent.tidyline().replace(/[*]| \(\d+\)/g, '');
                            } else {
                                // no linked artist(s) in the artist(s) list => capture full string after '[credit type] - '
                                creditArtist = creditLines[c].firstChild.textContent.tidyline().split(String.fromCharCode(32, 8211, 32))[1].replace(/[*]| \(\d+\)/g, '').trim();
                            }
                            // TODO: fix/refine condition to skip credit line to be: Credit type + Artist name present is track title, not just either as below
                            if (creditLines[c].getElementsByTagName('a').length > 1 ||
                                    (trk.title.match(new RegExp(creditType.escapeRegExp(), 'i')) === null &&
                                     trk.title.match(new RegExp(creditArtist.escapeRegExp(), 'i')) === null)) {
                                // replace ' -' (LONG dash) by ':', remove '*' (what for?) and ' (n)' (different artists with the same name)
                                trk.credits += ((trk.credits === '') ? '' : '\n') +
                                                   creditLines[c].textContent.tidyline().replace(/ \u2013/g, ':').replace(/[*]|\(\d+\)/g, '').trim();
                            }
                        }
                    }
                }
                // duration (optional)
                trk.time = trackrows[t].querySelector('td.track_duration>span,td.tracklist_track_duration>span').textContent.tidyline();
            }
            // append track to tracklist array
            rls.tracklist.push(trk);
        }
        // collect number of tracks, ignoring sub-section title lines
        rls.tracks = nbtracks.toString();
    }
    // add description sections with a 'data-toggle-section-id' attribute
    var sections = rlsDiv.querySelectorAll('div#page_content>div[data-toggle-section-id]'),
        sectionList, s, ln, sectn = new Section(), sectnLines = [];
    for (s = 0; s < sections.length; s += 1) {
        // add we skip user-hidden (collapsed) sections as well as the "recommendations" section
        if (sections[s].querySelector('div.section_content').style.display !== 'none' && sections[s].id.match(/recommendations/) === null) {
            sectn = new Section();
            sectnLines = [];
            // section title text. expand/collapse arrows are ignored
            sectn.title = sections[s].querySelector('h3').firstChild.textContent.tidyline();
            if (sectn.title.substr(0, 14) === 'Other Versions') { // capture and add discogs master release link
                sectn.title = 'Other Versions [www.discogs.com/master/' + sections[s].querySelector('h3>a').href.match(/\d+$/g)[0] + ']';
            }
            // section content, multiline , replacing all LONG dashes with regular dashes & tabs with ' / '
            // FIREFOX special: trim discogs seemingly random white space line-by-line 
            sectionList = sections[s].querySelector('div.section_content').innerText.replace(/\u2013/g, '-').trim().split('\n');
            for (ln = 0; ln < sectionList.length; ln += 1) {
                sectnLines.push(sectionList[ln].trim().replace(/\t/g, ' / '));
            }
            sectn.content = sectnLines.join('\n').trim();
        
            // 'Reviews' section special processing
            if (sections[s].id === "reviews") {
                // remove leading "Add Review" - if no review to begin with, clears out section content
                sectn.content = sectn.content.replace(/^Add Review/i, '').trim();
                
                sectn.content = sectn.content.replace(/Reply\x20+Notify me\x20+Helpful/ig, '');
                // convert 2x linefeeds into just one
                sectn.content = sectn.content.replace(/\n\n/ig, '\n').trim();
            }
        
            // add section to Release.description array, except if section content is empty
            if (sectn.content !== '') {
                rls.description.push(sectn);
            }
        }
    }

    // return Release object with collected information
    rls.normalizeTimecodes();
    return rls;
};




// ========================================
// junodownload.com release data collection
// ========================================
// regular releases: www.junodownload.com/products/*
// mixcloud mixes: www.junodownload.com/charts/mixcloud/*
// DJ charts: www.junodownload.com/charts/dj/*
// TODO? alternate charts: www.beatport.com/chart/*

Release.prototype.get_junodownload = function getRelease() {

    // page to parse and new Release object to collect data in
    var htmldoc = window.top.document,
        rls = new Release(), rlsDescriptionSection, trackrows, t, trk,
        charttype = htmldoc.URL.tidyurl().split('/')[2];

    switch (charttype) {

    case 'dj': case 'juno-recommends': // syntax not strictly adhering to standards

            // release profile information
        rls.artist = htmldoc.getElementById('product_list_dj_banner_dj_name').firstChild.textContent.tidyline().toInitials();
        rls.title = htmldoc.getElementById('product_list_dj_banner_chart_name').textContent.tidyline().toInitials();
        if (charttype === 'juno-recommends' && rls.artist === rls.title.substr(0, rls.artist.length)) {
            rls.artist = 'VA'; // DJ Charts: removing silly prefix repeat between artist & title in favor of 'VA'
        }
        rls.label = 'junodownload DJ Chart';
        rls.released = htmldoc.getElementById('product_list_dj_banner_chart_creation_date').textContent.tidyline().tidydate();
        rls.format = 'Digital';
        // source specific release profile properties
        if (htmldoc.getElementById('product_list_dj_banner_chart_website') !== null) {
            rls.DJ_site = htmldoc.getElementById('product_list_dj_banner_chart_website').firstChild.textContent.tidyline();
        }
        rls.juno = htmldoc.URL.tidyurl(true);

        // description Section (optional)
        if (htmldoc.getElementById('product_list_dj_banner_chart_description').textContent.trim() !== '') {
            rlsDescriptionSection = new Section();
            rlsDescriptionSection.title = 'Description';
            rlsDescriptionSection.content = htmldoc.getElementById('product_list_dj_banner_chart_description').textContent.trim();
            rls.description.push(rlsDescriptionSection);
        }

        // collect tracklist information from <div> list items in div id='product_list_controller_container_top'
        trackrows = htmldoc.getElementById('product_list_controller_container_top').getElementsByClassName('productlist_widget_container');
        for (t = 0; t < trackrows.length; t += 1) {
            trk = new Track();
            // there doesn't seem to be DJ charts with unknown tracks as with mixcloud charts
            trk.number = trackrows[t].getElementsByClassName('productlist_widget_product_sn_tracks')[0].firstChild.textContent.tidyline();
            trk.artist = trackrows[t].getElementsByClassName('productlist_widget_product_artists')[0].textContent.tidyline().toInitials();
            trk.title = trackrows[t].getElementsByClassName('productlist_widget_product_title')[0].getElementsByTagName('a')[0].textContent.tidyline();
            trk.time = trackrows[t].getElementsByClassName('productlist_widget_product_title')[0].getElementsByTagName('a')[0].nextSibling.textContent.tidyline().replace(/^\(|\)$/g, '');
            trk.label = trackrows[t].getElementsByClassName('productlist_widget_product_label')[0].textContent.tidyline();
            trk.label += ' ' + trackrows[t].getElementsByClassName('productlist_widget_product_preview_buy_tracks')[0].firstChild.textContent.tidyline().replace(/^From release\: /i, '');
            trk.release = trackrows[t].getElementsByClassName('productlist_widget_product_from_release')[0].textContent.tidyline().replace(/^From release\: /i, '');
            if (trackrows[t].getElementsByClassName('bpm-value').length > 0) {
                trk.bpm = parseInt(trackrows[t].getElementsByClassName('bpm-value')[0].textContent.tidyline(), 10);
            }
            // Additional track info - currently ignored by TXT rendering
            // TODO? add Release object/TXT methods support to this additional track info
            trk.date = trackrows[t].getElementsByClassName('productlist_widget_product_preview_buy_tracks')[0].getElementsByTagName('span')[0].textContent.tidyline();
            trk.style = trackrows[t].getElementsByClassName('productlist_widget_product_preview_buy_tracks')[0].getElementsByTagName('span')[1].textContent.tidyline();
            // append to tracklist array
            rls.tracklist.push(trk);
        }
        break;

    case 'mixcloud':

        // release profile information
        rls.artist = ''; // TODO? code some guesswork ?
        rls.title = htmldoc.getElementById('mxc_name').textContent.tidyline().toInitials();
        rls.by = htmldoc.getElementById('mxc_author').textContent.tidyline();
        rls.label = 'mixcloud.com';
        rls.format = 'Digital';
        // source specific release profile properties
        rls.mixcloud = htmldoc.getElementById('mxc_play').getElementsByTagName('a')[0].href.tidyurl();
        rls.juno = htmldoc.URL.tidyurl(true);

        // description Section (optional)
        if (htmldoc.getElementById('mxc_descr') !== null) {
            rlsDescriptionSection = new Section();
            rlsDescriptionSection.title = 'Description';
            rlsDescriptionSection.content = htmldoc.getElementById('mxc_descr').textContent.trim();
            rls.description.push(rlsDescriptionSection);
        }

        // collect tracklist information from <div> list items in div id='product_list_controller_container_top'
        trackrows = htmldoc.getElementById('product_list_controller_container_top').getElementsByClassName('productlist_widget_container');
        for (t = 0; t < trackrows.length; t += 1) {
            // clicking 'buy' on a specific track in mixcloud, a duplicate with id='mxc_selected' of the track is added at the tracklist top  
            if (trackrows[t].id !== 'mxc_selected') {
	            trk = new Track();
                if (trackrows[t].id !== '') {
                    // track is identified
                    trk.number = trackrows[t].getElementsByClassName('known_serial')[0].firstChild.textContent.tidyline();
                    trk.time = trackrows[t].getElementsByClassName('known_time')[0].textContent.tidyline();
                    trk.artist = trackrows[t].getElementsByClassName('productlist_widget_product_artists')[0].textContent.tidyline().toInitials();
                    trk.title = trackrows[t].getElementsByClassName('productlist_widget_product_title')[0].textContent.tidyline();
                    trk.release = trackrows[t].getElementsByClassName('productlist_widget_product_from_release')[0].textContent.tidyline().replace(/^From release\: /i, '');
                    trk.label = trackrows[t].getElementsByClassName('productlist_widget_product_label')[0].textContent.tidyline();
                } else {
                    // unidentified tracks have their distinct markup/styles.
                    trk.number = trackrows[t].getElementsByClassName('unknown_serial')[0].firstChild.textContent.tidyline();
                    trk.time = trackrows[t].getElementsByClassName('unknown_time')[0].textContent.tidyline();
                    trk.title = '';
                }
                // append to tracklist array
                rls.tracklist.push(trk);
            }
        }
        break;

    default: // meant for regular release under junodownload.com/products/*

            // release profile information
        rls.artist = htmldoc.getElementById('product_heading_artist').textContent.tidyline().toInitials();
        if (rls.artist.match(/Various$/) !== null) {
            // rls.compiled_by = compilation/mix artist name(s) before '/Various', if any
            if (rls.artist.split('/').length > 1) {
                rls.by = rls.artist.split('/').slice(0, rls.artist.split('/').length - 1).join('/');
            }
            rls.artist = 'VA';
        }
        rls.title = htmldoc.getElementById('product_heading_title').textContent.tidyline();
        rls.label = htmldoc.getElementById('product_heading_label').textContent.tidyline();
        rls.catalog = htmldoc.getElementById('product_info_cat_no').textContent.tidyline();
        rls.released = htmldoc.getElementById('product_info_released_on').textContent.tidyline().tidydate();
        rls.format = 'Digital';
        rls.genre = htmldoc.getElementById('product_info_genre').textContent.tidyline();
        // source specific profile information
        rls.juno = htmldoc.URL.tidyurl(true);

        // description Section (optional)
        if (htmldoc.getElementById('product_release_note') !== null || htmldoc.getElementsByClassName('product_download_dj_links').length > 0) {
            rlsDescriptionSection = new Section();
            rlsDescriptionSection.title = 'Description';
            // review
            if (htmldoc.getElementById('product_release_note') !== null) {
                rlsDescriptionSection.content = htmldoc.getElementById('product_release_note').textContent.trim().replace(/^Review\:\s+/i, 'Review:\n');
            }
            // played by
            if (htmldoc.getElementsByClassName('product_download_dj_links').length > 0) {
                rlsDescriptionSection.content += ((rlsDescriptionSection.content === '') ? '' : '\n\n') +
                                                 'Played by:\n' + htmldoc.getElementsByClassName('product_download_dj_links')[0].getElementsByTagName('i')[0].textContent.tidyline();
            }
            rls.description.push(rlsDescriptionSection);
        }

        // collect tracklist information from items in div id='product_tracklist'
        // note: loop stops at .length - 1 as we skip the last non-track 'Entire Release:' shopping line in the tracklist list
        trackrows = htmldoc.getElementById('product_tracklist').getElementsByClassName('product_tracklist_records');
        for (t = 0; t < trackrows.length - 1; t += 1) {
            trk = new Track();
            trk.number = trackrows[t].getElementsByClassName('product_tracklist_heading_records_sn')[0].textContent.tidyline();
            trk.title = trackrows[t].getElementsByClassName('product_tracklist_heading_records_title')[0].textContent.tidyline();
            if (trk.title.split(' - ').length > 1) {
                // compilation: .title 'artist - title' => .artist & .title
                trk.artist = trk.title.split(' - ')[0];
                trk.title = trk.title.split(' - ')[1];
            }
            trk.time = trackrows[t].getElementsByClassName('product_tracklist_heading_records_length')[0].textContent.tidyline();
            trk.bpm = trackrows[t].getElementsByClassName('product_tracklist_heading_records_bpm')[0].textContent.tidyline();
            // append to tracklist array
            rls.tracklist.push(trk);
        }
    }

    // return Release object with collected information
    rls.tracks = rls.tracklist.length.toString();
    rls.normalizeTimecodes();
    return rls;
};



// ====================================
// mixcloud.com release data collection
// ====================================
// last updated 10 Mar. 2014 - Mixcloud 2014 new layout
    
Release.prototype.get_mixcloud = function getRelease() {

	// Updated to Mixcloud 2014 new layout. Supports mixes with/without timecodes
    // Tracklist/tracks details are presumably sourced from the junodownload database/music recognition service,
    // but experience shows that the related junodownload chart tracklist may diverge from mixcloud's. 
    // Ex. 1: tracklist differing (present upfront, not dynamically built, no ng-init attribute set):
    // http://www.mixcloud.com/acidpauli/weisse-baren-im-schwarzen-schaf/
    // http://www.junodownload.com/charts/mixcloud/acidpauli/weisse-baren-im-schwarzen-schaf/8265422
    // http://www.mixcloud.com/player/details/?key=%2Facidpauli%2Fweisse-baren-im-schwarzen-schaf%2F (simple tracklist + junochart url + guid)
    // http://www.mixcloud.com/tracklist/?guid=BD412BE6-0E9C-4585-92D0-405394A3A4D6 (very detailled tracklist with Juno buy info)
    // Ex. 2: tracklist same (loaded dynamically, ng-init attribute set)
    // http://www.mixcloud.com/falentinvreigeist/kyodai-at-attitude-club-paristokyo-dec-2012-dj-set/
    // http://www.junodownload.com/charts/mixcloud/falentinvreigeist/kyodai-at-attitude-club-paristokyo-dec-2012-dj-set/30160370
    // http://www.mixcloud.com/tracklist/?guid=D2E08B1A-8309-4137-988D-764B15DD95BC (very detailled tracklist with Juno buy info)
    // Ex. 3: no initial tracks timetable, no ng-init junodownload url, no tracklist/timecodes dynamic loading
    // http://www.mixcloud.com/ibizasonica/jose-padilla-bella-musica-ibiza-sonica-29-june/ (11 tracks)
    // http://www.mixcloud.com/player/details/?key=%2Fibizasonica%2Fjose-padilla-bella-musica-ibiza-sonica-29-june%2F (11 tracks, all "start-time" = null)
	// http://www.mixcloud.com/tracklist/?guid=E84F554C-EA3E-461A-A6C8-7FF1A14D1CE1 has "start" & "end" times (10 tracks)
    
    // capture document & create new Release object instance
    var htmldoc = window.top.document, rls = new Release();

    rls.title = htmldoc.querySelector('h1[itemprop=name]').textContent.tidyline().toInitials();
    rls.by = htmldoc.querySelector('h2[itemprop=byArtist] span[itemprop=name]').textContent.tidyline();
    rls.artist = ''; // guessed at the end via heuristics from title/by
    rls.label = 'mixcloud.com';
    rls.format = 'Digital';
    // uploaded/release date. Format is "2013-08-30T18:09:49+00:00" timestamp
    rls.released = htmldoc.querySelector('time[itemprop="dateCreated"]').attributes['datetime'].value.split('T')[0];
    if (htmldoc.querySelector('meta[property="music:duration"]') !== null) {
	    rls.duration = (htmldoc.querySelector('meta[property="music:duration"]').content * 1000).millisecToString();
    }

    // source specific added Release properties

    // tags/style/genre
    var tag, aTags = [], tags = htmldoc.querySelectorAll('div.cloudcast-item-tag-cloud span.tag-wrap');
    for (tag = 0; tag < tags.length; tag += 1) {
        aTags.push(tags[tag].textContent);
    }
    rls.tags = aTags.join(', ');

    // short URL to the cloudcast e.g. "http://i.mixcloud.com/CDUbGe"
    rls.mixcloud = htmldoc.querySelector('span.card-link-url').textContent.tidyurl();

    // Junodownload equivalent page url, only if "ng-init" attribute is found in <div ng-controller="CloudcastHeaderCtrl" ...> tracklist parent tag 
    // Only mixcloud cloudcasts with a dynamically populating tracklist (seem to) have it
    // Ex. ng-init param: <div ng-controller="CloudcastHeaderCtrl" ng-init="juno.replaceTracklist=true;juno.guid='D2E08B1A\u002D8309\u002D4137\u002D988D\u002D764B15DD95BC';
    //       juno.chartUrl='http://www.junodownload.com/charts/mixcloud/falentinvreigeist/kyodai\u002Dat\u002Dattitude\u002Dclub\u002Dparistokyo\u002Ddec\u002D2012\u002Ddj\u002Dset/30160370'" class="ng-scope">
    //TODO: - search for the junodownload url WITH the required cloudcast key in it. It can be in the Player info if the same cloudcast as on screen is being played.
    //		  Ex. http://www.junodownload.com/charts/mixcloud/ibizasonica/jose-padilla-bella-musica-ibiza-sonica-29-june/133183
	//		<a ng-href="http://www.junodownload.com/charts/mixcloud/ibizasonica/jose-padilla-bella-musica-ibiza-sonica-29-june/133183?timein=2142" target="_blank" ng-show="nowPlaying.currentDisplayTrack.buyUrl" class="buy-current-track" href="http://www.junodownload.com/charts/mixcloud/ibizasonica/jose-padilla-bella-musica-ibiza-sonica-29-june/133183?timein=2142" style="">&nbsp; — Buy</a>
	//	 or - load JSON from "www.mixcloud.com/player/details/?key=" url - junodownload (juno.chart_url) and guid (juno.guid) are provided, together with a tracklist optionally w. timecodes
    //		  Ex. http://www.mixcloud.com/player/details/?key=%2Facidpauli%2Fweisse-baren-im-schwarzen-schaf%2F (simple tracklist + junochart url + guid)
    if (htmldoc.querySelector('div[ng-controller=CloudcastHeaderCtrl]').attributes['ng-init'] !== undefined) {

        var junourl;
        // capture ng-init raw string attribute and extract the jundownload url
        junourl = htmldoc.querySelector('div[ng-controller=CloudcastHeaderCtrl]').attributes['ng-init'].value;
        junourl = junourl.substring(junourl.indexOf("juno.chartUrl='")+15);
        junourl = junourl.substring(0, junourl.indexOf("'"));
        // convert all \uHHHH char codes back into unicode char
        //junourl = junourl.replace(/\\u([0-9a-fA-F]{4})/g, function (whole, group1) { return String.fromCharCode(parseInt(group1, 16)); } );
        junourl = JSON.parse('{"url":"' + junourl + '"}').url;		// works on Chrome at least
        // set to rls.juno property, trimming the htpp(s) away
        rls.juno = junourl.tidyurl();
    }

    // description Section (optional) - also available as plain text in a <head> <meta ...>
    var rlsSection = new Section(), descriptionHTML = htmldoc.querySelector('div[itemprop=description]>p');
    if (descriptionHTML !== null) {
        // unfuck links in description html - side effect: FIXES THE HTML SOURCE PAGE TOO.
        rlsSection.content = descriptionHTML.expandLinks().innerText.trim();
        rlsSection.title = 'Description';
        rls.description.push(rlsSection);
    }


    // TRACKLIST ENTRIES & TIMECODES

    // Timecodes for each track - present only if tracklist is NOT sourced from junodownload (TBC)
    // NOTE on mixcloud 'sectionstart' track change timecodes (TBC with mixcloud 2014 revamp):
    // they may differ from the 'Now playing' player tooltip timecodes. The same goes for artist/title info.
    // this is because the mixcloud player sources its tracklist info from the Juno database, which may differ.
    // <div ng-init="tracklistShown=false;audioLength=6873;sectionStartTimes=[0, 368, 575, 1012, 1449, 1833, 2086, 2354, 2584, 2815, 3121, 3428, 3835, 4149, 4349, 4510, 4901, 5185, 5384, 5707, 5960, 6259, 6543]"><div class="tracklist-toggle-container">
    var tracktimecodes = htmldoc.querySelector('div[ng-init*=sectionStartTimes]');
    if (tracktimecodes !== null) {
        // capture sectionStartTimes [] array string within 'ng-init' attribute
        tracktimecodes = tracktimecodes.attributes['ng-init'].value;
        tracktimecodes = tracktimecodes.substring(tracktimecodes.indexOf("sectionStartTimes=[")+19);
        tracktimecodes = tracktimecodes.substring(0, tracktimecodes.indexOf("]"));
        tracktimecodes = tracktimecodes.split(', ');
        console.log(tracktimecodes.length.toString() + ' timecodes found: ' + tracktimecodes);
        // http://www.mixcloud.com/player/details/?key=%2Facidpauli%2Fweisse-baren-im-schwarzen-schaf%2F
        // => http://www.mixcloud.com/tracklist/?guid=BD412BE6-0E9C-4585-92D0-405394A3A4D6 (track details)
        // => http://www.junodownload.com/charts/mixcloud/acidpauli/weisse-baren-im-schwarzen-schaf/8265422 (jd link)

    } else {
        //TODO: go grab tracklist/timecodes from the JSON queries (if really not to be found in the html) or even the junodownload page...
        // Ex.  http://www.mixcloud.com/player/details/?key=%2Ffalentinvreigeist%2Fkyodai-at-attitude-club-paristokyo-dec-2012-dj-set%2F
        //      http://www.mixcloud.com/tracklist/?guid=D2E08B1A-8309-4137-988D-764B15DD95BC

        // set tracktimecodes to an empty array for subsequent code compatibility
        tracktimecodes = [];
        console.log('NO timecodes table found => working from tracklist entries');
    }
 
    // Get tracklist entries nodes within <div class="cloudcast-tracklist" ...>
    var t, trk, trackrows;
    if (htmldoc.querySelector('div[ng-controller=CloudcastHeaderCtrl]').attributes['ng-init'] !== undefined) {
        // - tracklist sourced from jd and tracklist empty/not loaded yet, it's set to a unique track with title same as mix
        //   <div ng-repeat="section in juno.sections" class="track-row cf ng-scope">
        //   ex. http://www.mixcloud.com/falentinvreigeist/kyodai-at-attitude-club-paristokyo-dec-2012-dj-set/
        //   skips first cloudcast tracklist node if present: <div class="track-row cf ng-hide" ng-hide="juno.sections.length">
        //   ex. http://www.mixcloud.com/superbreak/sunday-drift-04-superbreak/  
        trackrows = htmldoc.querySelectorAll('div.cloudcast-tracklist>div.track-row[ng-repeat="section in juno.sections"]');
    } else {
        // - tracklist NOT sourced from jd ex. http://www.mixcloud.com/acidpauli/weisse-baren-im-schwarzen-schaf/
        //   <div class="track-row cf" ng-hide="juno.sections.length">
        //   ex. http://www.mixcloud.com/acidpauli/weisse-baren-im-schwarzen-schaf/
        trackrows = htmldoc.querySelectorAll('div.cloudcast-tracklist>div.track-row');
    }
    console.log(trackrows.length + ' tracks found');
    
    // collect tracklist information into rls.tracklist
    for (t = 0; t < trackrows.length; t += 1) {
        trk = new Track();
        trk.number = trackrows[t].querySelector('span.track-number').textContent.replace(/[.]/, '').trim();
        trk.title = trackrows[t].querySelector('span.chapter-name, span.track-song-name-link, a.track-song-name-link').textContent.tidyline();
        trk.artist = trackrows[t].querySelector('span.artist-name-link, a.artist-name-link').textContent.tidyline();
        if (tracktimecodes.length === trackrows.length) {
            // timecodes to all tracks available (native, not from junodownload case)
            trk.time = (tracktimecodes[t] * 1000).millisecToString(); // hh:mm:ss
        } else if (trackrows[t].querySelector('a[ng-href*="?timein="]') !== null ) {
            // fall back to get if from the track node "?timein=" argument (dynamically generated tracklist use case, for all except for "Unknown" tracks)
            // ex.: http://www.junodownload.com/charts/mixcloud/falentinvreigeist/kyodai-at-attitude-club-paristokyo-dec-2012-dj-set/30160370?timein=1557
            trk.time = trackrows[t].querySelector('a[ng-href]').attributes['ng-href'].value.match(/timein=(\d+)/)[1];
            trk.time = (Number(trk.time) * 1000).millisecToString();
        }

        // append to tracklist array
        rls.tracklist.push(trk);
    }
    rls.tracks = rls.tracklist.length.toString();

    // return Release object with collected information
    rls.normalizeProfile(); // HEURISTICS on title, artist, (uploaded) by, label, catalog#
    rls.normalizeTimecodes();
    return rls;
};




// ======================================
// soundcloud.com release data collection
// ======================================
// last updated 7 december 2013

Release.prototype.get_soundcloud = function getRelease() {

    // page to parse and new Release object to collect data in
    var htmldoc = window.top.document, rlsInfo = htmldoc,
        rls = new Release(), rlsDescription = new Section(),
        i, trackrows, t, trk;

    // RELEASE INFO BLOCK below image (optional) - usually found with label/artist track previews
    rlsInfo = htmldoc.querySelectorAll('dt.listenInfo__releaseTitle, dd.listenInfo__releaseData');
    for (i = 0; i < rlsInfo.length / 2; i += 1) {
        if (rlsInfo[i * 2].textContent.match(/Released by/i) !== null) { rls.label = rlsInfo[i * 2 + 1].textContent.trim().toInitials(); }
        if (rlsInfo[i * 2].textContent.match(/catalog/i) !== null) { rls.catalog = rlsInfo[i * 2 + 1].textContent.trim(); }
        if (rlsInfo[i * 2].textContent.match(/date/i) !== null) { rls.released = rlsInfo[i * 2 + 1].textContent.trim().tidydate(); }
        // no example found with other info fields so far...
    }

    // MAIN CONTENT HEADER
    rlsInfo = htmldoc.getElementById('content');
    // title - LONG dash(es) replaced by regular dash(es) if present
    rls.title = rlsInfo.getElementsByClassName('soundTitle__title')[0].textContent.tidyline().replace(/\u2013/g, '-');
    // uploader username
    rls.by = rlsInfo.querySelector('a.soundTitle__username').textContent.tidyline();

    // duration (track or set)
    //TODO: find an alternative way to get the duration, now fails, soundcloud source changed and generated on the fly somehow it seems...
    if (rlsInfo.querySelector('div.timeIndicator__total') !== null) {
        //rls.duration = rlsInfo.querySelector('div.timeIndicator__total').textContent.trim().replace(/\./, ':');
    } else {
        rls.duration = "0:00";
    }
    
    // format + download // free download & external download/buy link detection
    if (rlsInfo.getElementsByClassName('listenContent')[0].querySelector('button.sc-button-download') !== null) {
        rls.format = 'Free download [' + htmldoc.URL.tidyurl(true) + '/download]';
    } else if (rlsInfo.querySelector('div.sc-button-group>a.soundActions__purchaseLink') !== null) {
        rls.format = rlsInfo.querySelector('div.sc-button-group>a.soundActions__purchaseLink').title.trim() + ' [' + rlsInfo.querySelector('div.sc-button-group>a.soundActions__purchaseLink').href.tidyurl() + ']';
    }
    // default label to soundcloud.com if not set
    if (rls.label === '') { rls.label = 'soundcloud.com'; }

    // source-specific release info - order matters for txt layout
    // source url
    rls.soundcloud = htmldoc.URL.tidyurl();
    // date uploaded - set to .released date if empty
    rls.uploaded = rlsInfo.querySelector('time.relativeTime').title.replace(/ \d\d\:\d\d$/, '').replace(/^Posted on /i, '').trim();
    if (rls.released === '') {
        rls.released = rls.uploaded;
        rls.uploaded = '';
    }

    // description (optional)
    var descriptionDiv;
    if (rlsInfo.querySelector('div.listenDetails__description') !== null) {
        rlsDescription.title = 'Description';
        if (rlsInfo.querySelector('a.truncatedUserText__toggleLink') !== null) {
            // expandable text => get the long version - we MUST expand to get the text with format
            if (rlsInfo.querySelector('a.truncatedUserText__toggleLink').textContent === 'Read full description') {
                rlsInfo.querySelector('a.truncatedUserText__toggleLink').click();
            }
            descriptionDiv = rlsInfo.querySelector('div.userText__expanded');
        } else {
            // standard text
            descriptionDiv = rlsInfo.querySelector('div.listenDetails__description');
        }
        // unfuck links in description text - side effect: FIXES THE HTML SOURCE PAGE TOO.
        descriptionDiv.expandLinks();
        rlsDescription.content = descriptionDiv.innerText.trim();
        if (rlsDescription.content !== '') { rls.description.push(rlsDescription); }
    }

    // tags (optional)
    rlsInfo = rlsInfo.querySelectorAll('div.sc-tag-group>a');
    rls.tags = '';
    for (i = 0; i < rlsInfo.length; i += 1) {
        rls.tags += ((rls.tags === '') ? '' : ', ') + rlsInfo[i].textContent.trim();
    }

	
    // SINGLE TRACK MIXES/LIVES TRACKLIST
    // TODO: detect tracklist in description and feed it to tracklist[]

    // SOUNDCLOUD SET => GET TRACKS TOTAL & TRACKLIST
    // note: for more than artist, title and title url, each title info would need to be loaded/queried for duration, comment...
    if (htmldoc.URL.split('?')[0].match(/\/sets\//) !== null) {

        // Set duration
        if (htmldoc.querySelectorAll('h3.trackListTitle>Strong') !== null) {
            rls.duration = htmldoc.querySelectorAll('h3.trackListTitle>Strong')[1].textContent.trim().replace(/\./, ':');
        }

        // tracks details
        trackrows = htmldoc.querySelectorAll('div.soundBadge__content');
        for (t = 0; t < trackrows.length; t += 1) {
            trk = new Track();
            trk.title = trackrows[t].querySelector('a.soundTitle__title').textContent.tidyline().replace(/\u2013/g, '-');
            // extract track number from title, if present
            if (trk.title.match(/^\d+[ \.\-]+/) !== null) {
                trk.number = trk.title.match(/^\d+/)[0];
                trk.title = trk.title.replace(/^\d+[ \.\-]+/, '');
            } else {
                trk.number = (t + 1).toString();
            }
            // normalize title CAPS
            if (trk.title.toUpperCase() === trk.title || trk.title.toLowerCase() === trk.title) { trk.title = trk.title.toInitials(); }
            // .title='artist - title' => .artist & .title
            if (trk.title.split(' - ').length > 1) {
                trk.artist = trk.title.split(' - ')[0];
                trk.title = trk.title.split(' - ')[1];
            }
            // track URL - unused for now
            trk.url = trackrows[t].querySelector('a.soundTitle__title').href.tidyurl();
            // append to tracklist array
            rls.tracklist.push(trk);
        }
        rls.tracks = t.toString();
    }

    // HEURISTICS on title, artist, (uploaded) by, label, catalog#
    rls.normalizeProfile();
    // return Release object with collected information
    return rls;
};



// ==================================================================================================================
// SITE-SPECIFIC SUPPORT FUNCTIONS
// this section needs amending to add support to other discographic release pages with identification of source
// and call to the appropriate getRelease_[source]() data collection function
// ==================================================================================================================

function releaseTXT_DetectNavChange_soundcloud() {
    // document URL changed by soundcloud script => automatically trigger release text box re-set according to new page/track/set
    // div id=content first child <div> is tagged by releaseTXT_main() with current URL & sound title on first SC page visit
    // TODO? integrate back into releaseTXT_main()
    var htmldoc = window.top.document,
        pageURL = (htmldoc.querySelector('div#content>div').attributes['nav-url'] === undefined) ? '' : htmldoc.querySelector('div#content>div').attributes['nav-url'].value;
    if (pageURL !== htmldoc.URL) {
        console.log('url change: "' + pageURL + '" => "' + htmldoc.URL);
        // handing over to releaseTXT_main => we don't want to trigger url change detection on the current page's every content div change event anymore
        htmldoc.querySelector('div#content').removeEventListener('DOMNodeRemoved', releaseTXT_DetectNavChange_soundcloud, false);
        setTimeout(releaseTXT_main('url-change'), 500); // let's give page div content some time to change unattended
    }
}



// ==================================================================================================================
// SITE-SPECIFIC MAIN FUNCTIONS
// this section needs amending to add support to other discographic release pages with identification of source
// and call to the appropriate getRelease_[source]() data collection function
// ==================================================================================================================

function releaseTXT_main(mode) {

    // main function called by the 'release:txt' button.
    var htmldoc = window.top.document,
        txtbox = htmldoc.getElementById('releaseTXT_txtbox'),
        releaseTXT = 'page loading...',
        pageTitle = '',
        rls = new Release();

    // set UI text box to 'loading...' state
    txtbox.style.backgroundColor = '#FFD700'; // light red-orange wait state
    txtbox.value = releaseTXT;

    // collect release data text version from current page
    switch (htmldoc.domain.parentDomain()) {
    case 'bandcamp.com':
        releaseTXT = rls.get_bandcamp().TXT();
        break;
    case 'beatport.com':
        // UI is included in all pages because beatport implements dynamic content replacement navigation.
        // TODO: implement dynamic url change detection (user just needs to press "release:txt" to refresh the txt until then)
        if (htmldoc.URL.tidyurl().match(/^(www|mixes)\.beatport\.com\/(charts|mix|release)\//i) === null) {

            console.log('fill text box: not a release @ ' + htmldoc.URL);
            pageTitle = 'none';
            releaseTXT = 'not a release';
            txtbox.style.backgroundColor = '#d5d5d5'; // light grey

        } else {
            releaseTXT = rls.get_beatport().TXT();
        }
        break;
    case 'discogs.com':
		releaseTXT = rls.get_discogs().TXT();
        break;
    case 'junodownload.com':
		releaseTXT = rls.get_junodownload().TXT();
        break;

    case 'mixcloud.com':
        // UI is included in all pages because mixcloud 2014 switched to dynamic content replacement navigation.
        // TODO: implement dynamic url change detection (user just needs to press "release:txt" to refresh the txt until then)

        if (htmldoc.URL.tidyurl().match(/^www\.mixcloud\.com$/i) !== null ||
            htmldoc.URL.tidyurl().match(/^www\.mixcloud\.com\/[\w\d\-]+\/$/i) !== null ||
            htmldoc.URL.tidyurl().match(/^www\.mixcloud\.com\/[\w\d\-]+\/(favorites|followers|following|listens|playlists|uploads)\//i) !== null ||
            htmldoc.URL.tidyurl().match(/^www\.mixcloud\.com\/(ads|artist|categories|competitions|dashboard|developers|groups|jobs|media|myaccount|partners|player|projects|tag|terms|track|tracklist|upload)\//i) !== null) {

            console.log('fill text box: not a cloudcast @ ' + htmldoc.URL);
            pageTitle = 'none';
            releaseTXT = 'not a cloudcast';
            txtbox.style.backgroundColor = '#d5d5d5'; // light grey

        } else {

            // If tracklist parent node <div ng-controller="CloudcastHeaderCtrl"..> has a "ng-init" attribute,
            // the <div class="cloudcast-tracklist" ...> tracklist container is populated dynamically after the initial page load
            // => we run this script again until required tracklist info has been loaded.
            if (htmldoc.querySelector('div[ng-controller=CloudcastHeaderCtrl]').attributes['ng-init'] !== undefined) {
                 if (htmldoc.querySelectorAll('div#fb-root>div').length === 0 && htmldoc.querySelectorAll('div.cloudcast-tracklist>div.track-row').length === 0) {
                    // first run => set trigger to run releaseTXT_main() again when <div id="fb-root" ...> tag gets updated with content
                    htmldoc.querySelector('div#fb-root').addEventListener('DOMNodeInserted', releaseTXT_main, false);
                    console.log('cloudcast with dynamically loaded tracklist: detected');
                    releaseTXT = "loading tracklist...";
                } else if (htmldoc.querySelectorAll('div#fb-root>div').length === 1) {
                    // interim re-run, no change to Event listeners
                    console.log('cloudcast with dynamically loaded tracklist: loading');
                    releaseTXT = "loading tracklist...";
                } else if (htmldoc.querySelectorAll('div#fb-root>div').length === 2) {
                    // <div id="fb-root" ...> is populated with all 2 child <div ...> tags, we can expect tracklist to be fully loaded.
                    // remove event listener from <div id="fb-root" ...> tag
                    htmldoc.querySelector('#fb-root').removeEventListener('DOMNodeInserted', releaseTXT_main, false);
                     // security: listen in case tracklist unexpectedly expands anyway after that
                    htmldoc.querySelector('div[ng-controller=CloudcastHeaderCtrl]').addEventListener('DOMNodeInserted', releaseTXT_main, false);
                    console.log('cloudcast with dynamically loaded tracklist: complete (' + htmldoc.querySelectorAll('div#fb-root>div').length.toString() + 'x div#fb-root>div => ok, remove event listener)');
                    // go ahead acquiring cloudcast profile/tracklist
                    releaseTXT = rls.get_mixcloud().TXT();
                }
            } else {
                // all needed info is up already => go ahead acquiring cloudcast profile/tracklist
                console.log('cloudcast with initial tracklist: go ahead');
                releaseTXT = rls.get_mixcloud().TXT();
            }
        }
        break;

    case 'soundcloud.com':
        // UI is included in all pages because of sc's new design dynamic content replacement navigation.
        if (htmldoc.URL.tidyurl().match(/^soundcloud\.com\/[\w\d\-]+\/sets\/|^soundcloud\.com\/[\w\d\-]+\/[\w\d\-]+/i) !== null &&
            htmldoc.URL.tidyurl().match(/^soundcloud\.com\/[\w\d\-]+\/(apps|comments|favorites|following|followers|groups|likes|stats|tracks)[\/]?/i) === null &&
            htmldoc.URL.tidyurl().match(/^soundcloud\.com\/(101|apps|creativecommons|creators|explore|groups|jobs|messages|people|pages|premium|search|settings|sounds|stream|tags|tour|tracks|upload|you)\//i) === null) {
            
            if (htmldoc.querySelector('div#content>div') === null) {
                setTimeout(releaseTXT_main, 500); // execute this _main() again until the page has the required title & html data
            } else if (htmldoc.querySelector('span.soundTitle__title') === null) {
                setTimeout(releaseTXT_main, 500); // execute this _main() again until the page has the required title & html data
            } else if (htmldoc.querySelector('div#content>div').attributes['nav-title'] !== undefined) {
                if (mode === 'url-change' && htmldoc.querySelector('span.soundTitle__title').textContent === htmldoc.querySelector('div#content>div').attributes['nav-title'].value) {
                    setTimeout(releaseTXT_main, 500); // execute this _main() again until the page has the required title & html data
                } else {
                    console.log('fill text box: track or set @ ' + htmldoc.URL);
                    pageTitle = htmldoc.querySelector('span.soundTitle__title').textContent;
                    releaseTXT = rls.get_soundcloud().TXT();
                }
            } else {
                console.log('fill text box: track or set @ ' + htmldoc.URL);
                pageTitle = htmldoc.querySelector('span.soundTitle__title').textContent;
                releaseTXT = rls.get_soundcloud().TXT();
            }
        } else {
            // not a track or set target page
            if (htmldoc.querySelector('div#content>div') === null) {
                console.log('waiting for content div: ' + htmldoc.URL);
                setTimeout(releaseTXT_main, 500); // execute this _main() again until the page has the required title & html data
            } else {
                console.log('fill text box: not a release @ ' + htmldoc.URL);
                pageTitle = 'none';
                releaseTXT = 'not a track or set';
                txtbox.style.backgroundColor = '#d7d7d7'; // light grey
            }
        }
        if (pageTitle !== '') {
            // set custom attribute flags & EventListener used in dynamic url change detection/handling
            htmldoc.querySelector('div#content>div').setAttribute('nav-url', htmldoc.URL);
            htmldoc.querySelector('div#content>div').setAttribute('nav-title', pageTitle); // TODO? do we need to filter/escape some pageTitle characters ?
            htmldoc.querySelector('div#content').addEventListener('DOMNodeRemoved', releaseTXT_DetectNavChange_soundcloud, false);
        }
        break;

    default:
        if (htmldoc.querySelector('head>meta[content*=".bandcamp.com/"]') !== null) {
            // bandcamp.com rebranded domain page has <meta property="og:url" content="http://(...).bandcamp.com/(...)"> in <head>
            // note: we get here only if user added rebranded domain to this script's Settings>User includes (CH/TM)
            releaseTXT = rls.get_bandcamp().TXT();
        } else {
            // else, we're not supposed to be here...
            releaseTXT = 'ERROR, unexpected source page domain: ' + htmldoc.domain.replace(/^(www|\w+)\./, '');
        }
    }

    // fill text box with formatted release information text
    txtbox.value = releaseTXT;
    if (releaseTXT.match(/^(page loading\.\.\.|not a release|not a track or set|not a cloudcast)$/i) === null) { 
        txtbox.style.backgroundColor = '#FFFFFF';
    }

    // TODO: add lightweight error management in case getReleaseData_...() fails
    //txtbox.value = 'Could not collect the data for this release !! Click the + button for more...\n\n' +
    //               'Please report faulty URL below to userscripts.org/scripts/discuss/156420 :\n\n' + htmldoc.URL + '\n\n' +
    //               'Your help improving this script is appreciated.' ;
}


// ==================================================================================================================
// INITIALIZE
// ==================================================================================================================

function releaseTXT_init() {
    
    // insert UI into the site's source page
    var htmldoc = window.top.document;
    switch (htmldoc.domain.parentDomain()) {
    case 'bandcamp.com':
        releaseTXT_buildUI();
        break;
    case 'beatport.com':
        releaseTXT_buildUI('margin-top: 69px; '); // move UI to below the page's menu+player overlay
        break;
    case 'discogs.com':
        releaseTXT_buildUI('background-color: #d7d7d7; ');
        break;
    case 'junodownload.com':
        releaseTXT_buildUI('background-color: #252525; ');
        break;
    case 'mixcloud.com':
        releaseTXT_buildUI('background-color: #25292b; ');
        break;
    case 'soundcloud.com':
        // TODO: detect pages of old (classic) design and skip UI insert & _main() call + remove related @excludes...
        releaseTXT_buildUI('background-color: #333; ');
        break;
    default:
        releaseTXT_buildUI();
    }
    // get release text for current page
    releaseTXT_main('init');
}


/* FIREFOX/GREASEMONKEY: script wrapper to prevent init() execution for each embedded Ad frame
   added security check on title, as ads frames typically have a <body> but no title */
if (window.top === window.self && window.self.document.title !== '') {
    releaseTXT_init();
}
