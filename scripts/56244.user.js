// ==UserScript==
// @name           The Pirate Helper
// @description    Enhances your pirating experience!
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version        5.2
// @date           2013-12-26
// @source         http://userscripts.org/scripts/show/56244
// @identifier     http://userscripts.org/scripts/source/56244.user.js
// @author         Noah Keller
// @namespace      http://userscripts.org/people/105134
// @grant          GM_xmlhttpRequest
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_registerMenuCommand
// @include        *thepiratebay.*
// @include        *://jntlesnev5o7zysa.onion/*
// @include        *://194.71.107.80/*
// @include        *://194.71.107.81/*
// @include        *://*imdb.*/title/tt*
// @include        *rottentomatoes*/m/*
// @include        *watchfreeinhd.com/*
// @include        http*://www.watchfreemovies.ch/*
// @include        *tvmuse.eu/*/*/
// ==/UserScript==

if (GM_getValue('options', null) === null)
    GM_setValue('options', JSON.stringify({
        tpb_location: 'thepiratebay.se',
        tpb_protocol: 'https'
    }));

var
        SCRIPT_VERSION = "5.2",
        //tracker_address = "http://localhost:5581/",
        tracker_address = "http://192.241.151.71:5581/",
        ui = 1000 * 60 * 60 * 24,
        ID = '56244',
        DATE = new Date(),
        $ = jQuery,
        movie = {},
        title, year, add = false, scraped_stream = false, scraped_torrents = false,
        location = '' + document.location,
        options = JSON.parse(GM_getValue('options')),
        holder = $('<span><span id="streamHolder"></span><span id="torrentHolder" style="margin-left: .25em;"></span></span>');

// Credits for this portion go to an unknown person
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || document.documentMode;
/////////////////////////////////////////////////////


var site = function site(check) {
    var s = '';
    var f = location.split(/^http(s)?\:\/\/(www\.)?/)[3];
    if (typeof f !== 'undefined') {
        s = f.split(/.[a-zA-Z](.[a-zA-Z])?\//)[0];
    } else {
        s = null;
    }
    return typeof check === 'undefined' ? s : s === check;
};

var check_version = function check_version(not_needed) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: tracker_address + "version/" + ID,
        onload: function(rD) {
            GM_setValue('lu', Date.now());
            var response_version = parseInt(rD.responseText.replace(/\./g, ''));
            var script_version = parseInt(SCRIPT_VERSION.replace(/\./g, ''));
            if (response_version > script_version)
                update();
            else if (typeof not_needed === 'function')
                not_needed();
        }
    });
};

var get_data = function(link, callback, post) {
    post = typeof post === 'undefined' ? false : post;
    var data = false;
    if (typeof post === 'object') {
        data = post;
        post = true;
    }
    if (typeof callback !== 'function') {
        callback = function(data) {
        };
    }
    var params = {
        method: post ? 'POST' : 'GET',
        url: link,
        onload: function(rD) {
            var xmlDoc = $.parseHTML(rD.responseText);
            callback(xmlDoc, rD);
        },
        ontimeout: function(rD) {
            var xmlDoc = $.parseHTML(rD.responseText);
            callback(xmlDoc, rD);
        },
        onerror: function(rD) {
            var xmlDoc = $.parseHTML(rD.responseText);
            callback(xmlDoc, rD);
        }
    };
    if (typeof data === 'object') {
        var s = '';
        for (var d in data) {
            s += d + '=' + data[d];
        }
        params.data = s;
    }
    GM_xmlhttpRequest(params);
};

var append_stream_link = function(link) {
    $('#streamHolder').css('cursor', 'pointer');
    $('#streamHolder').append('<a href="http://www.watchfreeinhd.com/' + link + '" target="_blank">►Stream</a>');
};

var append_torrents = function(data) {
    var cname = "", place = null;
    if (site('imdb')) {
        cname = "article";
        place = $("#maindetails_center_top");
    } else if (site('rottentomatoes'))
        place = $('.main_movie_area');
    else if (site('tvmuse.'))
        place = $('div#content');
    var wrapper = $('<div style="display: none" class="' + cname + '"><table width="100%"><tr><th width="6%" id="close"><img src="http://www.freestockphotos.biz/thumbs_0001/thumbsmall_15106.png" style="width: 1.5em; cursor:pointer;"></img></th><th width="82%">Name</th><th width="6%">S</th><th>L</th></tr></table><small><a target="_blank" href="' + options.tpb_protocol + '://' + options.tpb_location + '/search/' + title + ' ' + year + '/0/7/200">All Results</a></small></div>');
    var toggle = function() {
        if (wrapper.css('display') === "none")
            wrapper.slideDown();
        else
            wrapper.slideUp();
    };
    var img = $('<img src="' + options.tpb_protocol + '://' + options.tpb_location + '/static/img/icon-magnet.gif" style="margin-left: .3em; width: .6em; cursor: pointer;"></img>');
    var link = $('<a href="' + data[0].magnet + '"></a>');
    link.append(img);
    for (var d in data) {
        var row = $("<tr style='margin-top: .125em;'><td align='center'><a href='" + data[d].magnet + "'><img src='" + options.tpb_protocol + '://' + options.tpb_location + "/static/img/icon-magnet.gif'></img></a></td><td>" + data[d].name + "</td><td align='center'>" + data[d].seeds + "</td><td align='center'>" + data[d].leeches + "</td></tr>");
        $('table', wrapper).append(row);
    }
    $('th#close', wrapper).click(toggle);
    $('#torrentHolder').click(toggle);
    $('#torrentHolder').css('cursor', 'pointer');
    $('#torrentHolder').append(link).append(' Torrent');
    place.prepend(wrapper);
};

var get_remote = function(title, year) {
    if (typeof title !== 'undefined') {
        if (typeof year === 'undefined') {
            scrape_torrents(title);
        } else {
            get_data(tracker_address + "find/" + title + "/" + year, function(xmlDoc, rD) {
                console.log(rD);
                if (rD.responseText !== 'Not Found' && rD.responseText !== "") {
                    var info = JSON.parse(rD.responseText);
                    if (typeof info.stream !== 'undefined' && info.stream !== null)
                        append_stream_link(info.stream);
                    else
                        scrape_stream(title, year);
                    if (typeof info.torrents !== 'undefined')
                        append_torrents(info.torrents);
                    else
                        scrape_torrents(title, year);
                } else {
                    scrape_stream(title, year);
                    scrape_torrents(title, year);
                    add = true;
                }
            });
        }
    }
};

var scrape_torrents = function(title, year) {
    year = typeof year === 'undefined' ? '' : ' ' + year;
    var category = '200';
    get_data(options.tpb_protocol + '://' + options.tpb_location + '/search/' + title + year + '/0/7/' + category,
            function(xmlDoc, rD) {
                var searchResult = $('#searchResult', xmlDoc);
                var numRows = $('tr', searchResult);
                if (numRows.length > 0) {
                    movie.torrents = [];
                    var torrents = movie.torrents;
                    for (var i = 1; i < numRows.length; i++) {
                        var det_link = $('a.detLink', numRows[i]);
                        var mag_link = $("a[title='Download this torrent using magnet']", numRows[i]);
                        var torrent = {
                            name: det_link.html(),
                            magnet: mag_link.attr('href'),
                            seeds: parseInt($('td:nth-child(3)', numRows[i]).html()),
                            leeches: parseInt($('td:nth-child(4)', numRows[i]).html())
                        };
                        if (torrent.seeds !== 0)
                            torrents.push(torrent);
                    }
                    scraped_torrents = true;
                    report();
                    append_torrents(torrents);
                } else {
                    $('#torrentHolder'.holder).append('No torrent results');
                }
            });
};

var scrape_stream = function(title, year) {
    var search_cb = function(xmlDoc, rD) {
        var items = $('.index_item', xmlDoc);
        var found = false;
        for (var i = 0; i < items.length; i++) {
            var citem = $(items[i]);
            var title_string = $('h2', citem).html();
            var ntitle = title_string.split(' (')[0].trim();
            var link = $('a', citem).attr('href');
            var nyear = title_string.split(' (')[1].replace(/\s*(\(|\))/g, '').trim();
            if ((ntitle === title) && (nyear === year)) {
                get_data(link, list_cb);
                found = true;
                break;
            }

        }
        if (!found) {
            movie.stream = null;
            scraped_stream = true;
            report();
        }
    };
    var list_cb = function(xmlDoc, rD) {
        var hosts = $('.version_host', xmlDoc);
        var found = false;
        for (var i = 0; i < hosts.length; i++) {
            var host = $(hosts[i]);
            var name = host.html().trim();
            if (name === 'watchfreeinhd.com') {
                var prev = host.parent().prev();
                var link = $('a', prev);
                var link_location = 'http://www.watchfreemovies.ch' + link.attr('href');
                found = true;
                get_data(link_location, form_cb);
            }

        }
        if (!found) {
            movie.stream = null;
            scraped_stream = true;
            report();
        }
    };
    var form_cb = function(xmlDoc, rD) {
        append_stream_link(rD.finalUrl.split('.com/')[1].trim());
        movie.stream = rD.finalUrl.split('.com/')[1].trim();
        scraped_stream = true;
        report();
    };
    get_data('http://www.watchfreemovies.ch/search/' + title.replace(/ /g, '-').toLowerCase() + '/', search_cb);
};

var report = function report() {
    if (location.indexOf('imdb.com') !== -1) {
        if (scraped_stream && scraped_torrents) {
            console.log(movie);
            GM_xmlhttpRequest({
                method: 'GET',
                url: tracker_address + "add?data=" + escape(JSON.stringify(movie)),
                onload: function(rD) {
                    console.log(rD.responseText);
                }
            });
        }
    }
};

var update = function update() {
    if (confirm("Update needed for The Pirate Helper\nPress Ok to continue"))
        document.location = 'http://userscripts.org/scripts/source/56244.user.js';
};

var showOptions = function() {
    var wrapper = null, saveButton, updateButton, closeButton, tpb_location_label, tpb_location_input
            , tpb_protocol_label, tpb_protocol_select, set_tpb_location_button;
    var set_tpb_location = function() {
        get_data(tracker_address + 'tpb_location', function(xmlDoc, rD) {
            options.tpb_location = rD.responseText;
            GM_setValue('options', JSON.stringify(options));
            wrapper.hide();
        });
    };
    var createOptions = function() {
        wrapper = $('<div></div>');
        wrapper.css({
            'border-radius': '1em',
            width: '50%',
            position: 'absolute',
            padding: '1em',
            'padding-bottom': '3em',
            left: '25%',
            top: '25%',
            border: '1px solid black',
            'z-index': '1000000',
            'background-color': 'gray'
        });

        saveButton = $('<button>Save</button>');
        saveButton.click(saveOptions);
        saveButton.css({
            position: 'absolute',
            left: '1em',
            bottom: '.75em'
        });
        wrapper.append(saveButton);

        updateButton = $('<button>Update Script</button>');
        updateButton.click(function() {
            check_version(function() {
                alert('No update necessary');
            });
        });
        updateButton.css({
            position: 'absolute',
            right: '1em',
            bottom: '.75em'
        });
        wrapper.append(updateButton);

        closeButton = $('<button>Close</button>');
        closeButton.click(function() {
            wrapper.hide();
        });
        closeButton.css({
            position: 'absolute',
            right: '1em',
            top: '.75em'
        });
        wrapper.append(closeButton);

        set_tpb_location_button = $('<button>Default TPB Location</button>');
        set_tpb_location_button.click(set_tpb_location);
        set_tpb_location_button.css({
            position: 'absolute',
            left: '20%',
            bottom: '.75em'
        });
        wrapper.append(set_tpb_location_button);

        tpb_location_label = $('<label for="tpb_location_input">TPB Address</label>');
        tpb_location_input = $('<input id="tpb_location_input" value="' + options.tpb_location + '"></input>');
        tpb_location_label.append(tpb_location_input);
        wrapper.append(tpb_location_label);
        wrapper.append('<br/>');

        tpb_protocol_label = $('<label for="tpb_protocol_select">TPB Protocol</label>');
        tpb_protocol_select = $('<select id="tpb_protocol_select"><option' + (options.tpb_protocol === 'http' ? ' SELECTED' : '') + '>HTTP</option><option' + (options.tpb_protocol === 'https' ? ' SELECTED' : '') + '>HTTPS</option></select>');
        tpb_protocol_label.append(tpb_protocol_select);
        wrapper.append(tpb_protocol_label);

        $(document.body).append(wrapper);
    };
    var saveOptions = function() {
        options.tpb_location = tpb_location_input.val().replace(/(http(s)?\:|\/|\\)/g, '');
        options.tpb_protocol = tpb_protocol_select.val().toLowerCase();
        GM_setValue('options', JSON.stringify(options));
        wrapper.hide();
    };
    if (wrapper === null)
        createOptions();
    else {
        tpb_location_input.val(options.tpb_location);
        wrapper.show();
    }
};

GM_registerMenuCommand('The Pirate Helper', showOptions);

if (isFirefox) {
    var lu = GM_getValue('lu', '0');
    if ((Date.now() - parseInt(lu)) > ui) {
        check_version();
    }
}

// This part just pings a server so I can count how many people use this script
// It doesn't record any information, just ups the counter
lp = GM_getValue('lp', '0');
cp = '' + DATE.getMonth() + DATE.getFullYear();
if (lp !== cp) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: tracker_address + "count/" + ID,
        onload: function() {
            GM_setValue('lp', cp);
        }
    });
}
////////////////////////////////////////////////////////////

switch (site()) {
    case options.tpb_location:
        $('#sky-right').remove();
        $('iframe').remove();
        $('#tableHead .nohover').parent().remove();
        $('#searchResult').css('width', '100%');
        $('#main-content').css('margin-left', '0');
        $("[name='orderby']").val('7');
        break;
    case 'imdb':
        if ($('#overview-top .infobar').html().indexOf('TV Series') === -1) {
            movie.title = $("[itemprop='name']").html().trim();
            movie.year = $('#overview-top h1.header a').html().trim();
            movie.director = $("[itemprop='name']", $("[itemprop='director']")).html().trim();
            movie.poster = $("img", $("#img_primary")).attr('src');
            movie.description = $("[itemprop='description']").html().trim();
            movie.genres = [];
            var genres = $('a', $("[itemprop='genre']"));
            for (var i = 0; i < genres.length; i++) {
                movie.genres.push($(genres[i]).html().trim());
            }
            movie.writers = [];
            var writers = $("[itemprop='name']", $("[itemprop='creator']")[0]);
            for (var i = 0; i < writers.length; i++) {
                movie.writers.push($(writers[i]).html().trim());
            }
            movie.duration = $("[itemprop='duration']").html().trim();
            movie.uri = 'tt' + location.split('/tt')[1].split('/')[0];
            movie.rating = $('.star-box-giga-star').html().trim();
            movie.mpaa = {
                rating: $("[itemprop='contentRating']").attr('title'),
                text: $($("[itemprop='contentRating']")[1]).html()
            };
            title = movie.title;
            year = movie.year;
            $('h1.header').append('<br/>').append(holder);
            get_remote(movie.title, movie.year);
        }
        break;
    case 'rottentomatoes':
        if (location.indexOf('/m/') !== -1) {
            var title_whole = $("[itemprop='name']").html().trim();
            title = title_whole.split(/\s\(/)[0].trim();
            year = title_whole.split(/\s\(/)[1].replace(/(\(|\))/g, '').trim();
            var desc = $("[itemprop='description']");
            $('script', desc).remove();
            $('a', desc).remove();
            desc.append($('span', desc).text());
            $('span', desc).remove();
            $("[itemprop='name']").append('<br/>').append(holder);
            get_remote(title, year);
        }
        break;
    case 'tvmuse.':
        if (location.match(/\/tv\-shows\/[a-zA-Z0-9\_\-]+\/$/) !== null) {
            var el = $('h1.mb_0');
            title = el.text();
            el.append(holder);
            get_remote(title);
        } else if (location.match(/\/movies\/[a-zA-Z0-9\_\-]+\/$/) !== null) {
            console.log('activated');
            var el = $('h1.mb_0');
            title = el.text().trim();
            var content = $('div#content');
            year = $(content.children()[1].children[3]).text().split(/\s\(/)[1].replace(/(\(|\))/g, '').trim();
            el.append('<br/>').append(holder);
            console.log(title, year);
            get_remote(title, year);
        }
        break;
    case 'watchfreemovies':
        console.log('watch free movies');
        $('.stage_navigation').remove();
        $('.movie_info').remove();
        if (isChrome)
            $('img[title="Putlocker link"]').parent().parent().parent().parent().parent().remove();
        else
            $('img[title="Putlocker link"]').parent().parent().parent().parent().remove();
        $('.choose_tabs').nextAll().remove();
        $('.download_link').remove();
        $('.featured_movies').nextAll().remove();
        $('.featured_movies').remove();
        $('.col2').remove();
        $('.footer').remove();
        $('.header').remove();
        $('script').remove();
        $('div[id="movie"]').remove();
        break;
    default:
        break;
}