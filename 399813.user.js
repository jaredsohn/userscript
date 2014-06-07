// ==UserScript==
// @name            GoogleMusicEnhancer (GME)
// @version         0.1.0
// @namespace       http://www.tobsch.org/
// @author			Tobias Schneider
// @homepage		http://www.tobsch.org
// @licence			http://creativecommons.org/licenses/by-nc-sa/3.0/de/
// @description     Improvements and better usability for google music
//
// @include			http://music.google.com/music/listen*
// @include			https://music.google.com/music/listen*
// @include			http://play.google.com/music/listen*
// @include			https://play.google.com/music/listen*
//
// @require         http://code.jquery.com/jquery-2.1.0.min.js
// @require         https://jquery-json.googlecode.com/files/jquery.json-2.4.min.js
//
// grant            GM_addStyle
// grant            GM_xmlhttpRequest
// grant            GM_setValue
// grant            GM_getValue
// grant            GM_deleteValue
// grant            GM_listValues
// grant            GM_info
// ==/UserScript==

/***************************************************************************************************************************************************************************************************************************
 *
 * Copyright notice
 *
 * (c) 2011-Present Tobias Schneider
 *
 * http://tobsch.org
 *
 * All rights reserved.
 *
 *
 * THIS SOFTWARE IS PROVIDED BY TOBIAS SCHNEIDER ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL TOBIAS SCHNEIDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * This script is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * This copyright notice MUST APPEAR in all copies of this script
 *
 *
 * License: Creative Commons Version 3.0 - http://creativecommons.org/licenses/by-nc-sa/3.0/de/
 **************************************************************************************************************************************************************************************************************************/

GM_addStyle(".lyrics-clip {background-color: #FB8521;color: #FFFFFF;font-size: 16px;height: 25px;left: -63px;margin-top: -10px;position: absolute;text-align: center;top: 47px;transform: rotate(-90deg);transform-origin: 50% 50% 0;width: 100px;}.lyrics-clip:hover {cursor: pointer;}.lyrics-panel {color: #333333;background-color: white;border: 1px solid #D1D1D1;position: fixed;right: -370px;height: 70%;width: 350px;z-index: 1000000;padding: 10px;}.lyrics-header {font-size: 16px;position: relative;min-height: 30px;width: 100%;text-align: center;border-bottom: 1px solid #D1D1D1;}.lyrics-body {color: #707070;font-size: 13px;position: relative;height: 90%;width: 100%;margin-top: 15px;padding-left: 5px;overflow-y: auto;}#lyrics-panel.clicked {right: 0;transition: 0.5s;}#lyrics-panel.un-clicked {right: -370px;transition: 0.3s;}.lyrics-not-found-text {text-align: center;}.lyrics-not-found-link {text-align: center;}.space-top {margin-top: 10px;}.update-box {z-index: 102;border: 1px solid;border-radius: 5px;font-size: 1.1em;width: 400px;height: 400px;position: absolute;top: 15%;background-color: white;}.update-body {text-align: center;}.update-header {text-align: center;}.update-header h2{margin: 20px auto;}");

$(function () {
    "use strict";

    Update.check();

    $('.music-banner-icon').on('click', function () {
        Update.check(true);
    });

    $('#main')
        .append(
            Build.div({class: 'lyrics-panel un-clicked', id: 'lyrics-panel', attr: {title: 'Hit to reload lyric'}})
                .append(
                    Build.div({class: 'lyrics-clip', id: 'lyrics-clip', text: 'Lyric'}).on('click', function () {
                        $(this).parent('div.lyrics-panel').toggleClass("clicked un-clicked");
                    })
                )
                .append(
                    Build.div({class: 'lyrics-header', id: 'lyrics-header', text: 'Lyrics Panel'})
                )
                .append(
                    Build.div({class: 'lyrics-body', id: 'lyrics-body', text: 'I can not hear a sound. Play something loud!' })
                )
        ).on('click', 'div.hover-button[data-id="play"]', function () {
            window.setTimeout(collectAndSearch, 500);
        });

    $('div#lyrics-panel').on('click', function () {
        window.setTimeout(collectAndSearch, 500);
    });
    $('div.player-middle').on('click', 'button[data-id="rewind"], button[data-id="forward"]',function () {
        window.setTimeout(collectAndSearch, 500);
    }).on('click', 'button[data-id="play-pause"]:not(".playing")', function () {
        window.setTimeout(collectAndSearch, 500);
    });

/*    var title = $('#playerSongTitle').text();
    setInterval(function () {
        var $songTitle = $('#playerSongTitle');
        if ($songTitle.text() !== title) {
            collectAndSearch();
            title = $songTitle.html();
        }
    }, 20000);*/

    function collectAndSearch() {
        if ($('#lyrics-panel').hasClass("clicked")) {
            var title = $('#playerSongTitle').text();
            var artist = $('#player-artist').text();

            if (!!title && !!artist) {
                Lyric.search({artist: artist, title: title}, LyricsWiki);
            }
        } else {
            console.log("Lyrics panel closed. Lyric will be get later.");
        }
    }


}); // Ready Function

var Build = (function () {
    "use strict";

    return {

        div: function (options) {
            var div = $('<div></div>');

            if (!!options.text) {
                div.html(options.text);
            }
            if (!!options.id) {
                div.attr({id: options.id});
            }
            if (!!options.class) {
                div.addClass(options.class);
            }
            if (!!options.attr) {
                div.attr(options.attr);
            }
            return div;
        },

        link: function (options) {
            var link = $('<a></a>');

            if (!!options.text) {
                link.html(options.text);
            }
            if (!!options.id) {
                link.attr({id: options.id});
            }
            if (!!options.class) {
                link.addClass(options.class);
            }
            if (!!options.href) {
                link.attr({href: options.href});
            }
            return link;
        },

        blackOut: function (options) {

            var blackCurtain = jQuery('<div></div>')
                .css({
                    'width': jQuery(document).width(),
                    'height': jQuery(document).height(),
                    'top': '0px',
                    'left': '0px',
                    'position': 'absolute',
                    'z-index': '101',
                    'background-color': 'black'
                })
                .fadeTo('slow', 0.7)
                .click(function () {
                    jQuery(this).hide();
                    jQuery(options.classesToHide).hide();
                });

            jQuery('body').prepend(blackCurtain);
        }
    };

}());

var Lyric = (function () {
    "use strict";

    var baseGoogleUrl = 'http://www.google.com/';
    var parameter;

    return {

        search: function (parameter, strategy) {
            if (typeof parameter === 'undefined' || typeof strategy !== 'object') {
                return;
            }

            this.parameter(parameter);
            this.findBy(strategy);

        },

        findBy: function (strategy) {
            var par = this.parameter();
            if ( par === undefined || typeof strategy !== 'object') {
                return;
            }

            $('#lyrics-header').html(par.artist + ' - ' + par.title);

            var persistLyric = Persist.findBy('lyric:' + par.artist + '-' + par.title);

            if (!!persistLyric) {
                $('#lyrics-body').html(persistLyric.lyric);
            }
            else {
                $('#lyrics-body').append($('#loadingOverlay').clone().show());

                var that = this;
                strategy.execute(par.artist, par.title,
                    function (lyric) {
                        var par = that.parameter();

                        $('#lyrics-body').html(lyric);
                        Persist.persist('lyric:' + par.artist + '-' + par.title, {lyric: lyric});
                    },
                    function (name,url) {
                        var par = that.parameter();
                        var googleSearchString = encodeURI(baseGoogleUrl + '?q=lyrics+' + par.artist + '+"' + par.title + '"#q=lyrics+' + par.artist + '+"' + par.title);

                        $('#lyrics-body').html('')
                            .append(
                                Build.div({text: '<b>Oh No. No lyric found.<b>', class: 'lyrics-not-found-text space-top'})
                            ).append(
                                Build.div({text: 'Add one and make this experience a little bit better!', class: 'lyrics-not-found-text'})
                            ).append(
                                Build.div({text: '<b>First</b> search for the correct lyric. YippieYeah!', class: 'lyrics-not-found-text space-top'})
                            ).append(
                                Build.div({class: 'lyrics-not-found-link'}).append(Build.link({href: googleSearchString, text: 'Search for \'' + par.artist + ' - ' + par.title + '\''}))
                            ).append(
                                Build.div({text: '<b>Then</b> add it to ' + name + '. Awesome!', class: 'lyrics-not-found-text space-top'})
                            ).append(
                                Build.div({class: 'lyrics-not-found-link'}).append(Build.link({href: url, text: 'Add this great song!'}))
                            ).append(
                                Build.div({text: '<b>At Last</b> click here to load the lyric you provided', class: 'lyrics-not-found-text space-top'})
                            );
                    });
            }

        },
        parameter: function(par){
            if (typeof par !== 'undefined') {
                parameter = par;
            }
            return parameter;
        }

    };

}());

var LyricsWiki = (function () {
    "use strict";

    var name = 'LyricsWiki';
    var baseLyricsWikiUrl = 'http://lyrics.wikia.com/api.php?fmt=realjson';

    return {
        execute: function (artist, title, success, error) {

            GM_xmlhttpRequest({
                method: "GET",
                url: encodeURI(baseLyricsWikiUrl + '&artist=' + toTitleCase(artist) + '&song=' + toTitleCase(title)),
                onload: function (response) {
                    console.log(response);
                    var songObject = $.parseJSON(response.responseText);

                    if (!!songObject.page_id) {
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: songObject.url,
                            onload: function (response) {
                                success(extractLyric(response));
                            }
                        });
                    }
                    else {
                        error(name, songObject.url);
                    }
                }
            });

            function extractLyric(response) {
                var lyricWithComment = $(response.responseText).find('.lyricbox').clone().find('div').remove().end().html();
                return lyricWithComment.substr(0, lyricWithComment.indexOf('<!--'));
            }

            function toTitleCase (str) {
                return str.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1);
                });
            }
        }
    };

}());

var Persist = (function () {
    "use strict";

    var prefix = 'gme:';

    return {
        persist: function (key, value) {
            key = prefix + '' + key;
            GM_setValue(key, jQuery.toJSON(value));
        },

        findBy: function (key) {
            key = prefix + '' + key;
            var storedObject = GM_getValue(key);
            if (!!storedObject) {
                return jQuery.evalJSON(storedObject);
            }
            return undefined;
        },

        remove: function (key) {
            key = prefix + '' + key;
            return GM_deleteValue(key);
        }
    };

}());

var Update = (function () {
    "use strict";

    var version = GM_info.script.version;
    var updateString = "last-update";

    var name = 'GoogleMusicEnhancer (GME)';
    var linkToNewVersion = 'http://www.tobsch.org/downloads/GoogleMusicEnhancer.user.js';
    var newVersionCheckUrl = 'http://tobsch.org/?site=GoogleMusicEnhancer';

    return {
        check: function (force) {

            var lastUpdateTime = Persist.findBy(updateString);

            if (force === true || lastUpdateTime === undefined || parseInt(lastUpdateTime) + parseInt(24 * 60 * 60 * 1000) < parseInt(String(new Date().getTime()))) {

                var newVersion = this.getNewVersion();

                var actVersionStripped = parseInt(version.replace(/\./g, ''));
                var newVersionStripped = parseInt(newVersion.replace(/\./g, ''));

                if (!!newVersionStripped && newVersionStripped > actVersionStripped) {
                    this.draw({'newVersion': newVersion});
                }
                else {
                    console.log('No new version of the ' + name + ' available ' + newVersion + ' <= ' + version);
                }

                Persist.persist(updateString, String(new Date().getTime()));
            }
        },

        draw: function (options) {

            var newVersionText = 'A new version of the ' + name + ' is available.<br><br>';
            newVersionText += "Your version: " + version + "<br>";
            newVersionText += "Brand new version: " + options.newVersion + "<br><br><br>";

            Build.blackOut({classesToHide: '.update-box'});

            var updateDiv = jQuery('<div></div>')
                .css({
                    left: (jQuery(document).width() / 2) - 250
                })
                .attr({
                    id: 'update-box',
                    class: 'update-box'
                })
                .append(jQuery('<div><h2>New version available</h2></div>').addClass("update-header"))
                .append(jQuery('<div>' + newVersionText + '</div>')
                    .addClass("update-body")
                    .append(
                        jQuery('<a>' + name + " " + options.newVersion + '</a>')
                            .attr({href: linkToNewVersion,title: name + ' ' + version})
                    )
                );

            jQuery('body').append(updateDiv);
        },

        getNewVersion: function () {
            var response = GM_xmlhttpRequest({
                method: 'GET',
                synchronous: 'true',
                url: newVersionCheckUrl
            });

            if (response.status === 200) {
                return $('#projectVersion', response.responseText).html();
            }

            return undefined;
        }
    };

}());