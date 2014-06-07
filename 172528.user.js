// ==UserScript==
// @name       Mod Domain Tagger - /r/LeagueOfLegends version
// @namespace  http://www.reddit.com/r/agentlame
// @grant      none
// @author  agentlame, EnigmaBlade
// @description    Highlight domains for easier moderation
// @include http://www.reddit.com/r/*/about/unmoderated*
// @include http://*.reddit.com/r/*/about/unmoderated*
// @include http://reddit.com/r/*/about/unmoderated*
// @include http://www.reddit.com/r/*/about/modqueue*
// @include http://*.reddit.com/r/*/about/modqueue*
// @include http://reddit.com/r/*/about/modqueue*
// @include *://*.reddit.com/r/*
// @version    2.5
// ==/UserScript==

function domaintagger() {
    if (!reddit.logged) return;

    var YELLOW = '#EAC117',
        GREEN = '#14CC14',
        RED = '#FF0000',
        BLACK = '#000000';

    var enabled = '',
        notEnabled = [],
        subs = [];

    var config = {
        ver: 1,
        domainTags: '',
        removalReasons: '',
        modMacros: ''
    };

    // Prevent page lock while parsing things.  (stolen from RES)

    function forEachChunked(array, chunkSize, delay, call, callback) {
        if (array == null) return;
        if (chunkSize == null || chunkSize < 1) return;
        if (delay == null || delay < 0) return;
        if (call == null) return;
        var counter = 0;
        var length = array.length;

        function doChunk() {
            for (var end = Math.min(array.length, counter + chunkSize); counter < end; counter++) {
                var ret = call(array[counter], counter, array);
                if (ret === false) return;
            }
            if (counter < array.length) {
                window.setTimeout(doChunk, delay);
            } else {
                if (callback) callback();
            }
        }
        window.setTimeout(doChunk, delay);
    }

    run();

    function postToWiki(sub, json) {
        console.log('http://www.reddit.com/r/' + sub + '/wiki/toolbox.json');
        $.post('/r/' + sub + '/api/wiki/edit', {
            content: JSON.stringify(json, undefined, 2),
            page: 'toolbox',
            reason: 'updated via toolbox config',
            uh: reddit.modhash
        })
            .error(function (err) {
                console.log(err.responseText);
            }).success(function () {
                run();
            });

        // hide the page
        $.post('/r/' + sub + '/wiki/settings/toolbox', {
            permlevel: 2,
            uh: reddit.modhash
        })
            .error(function (err) {
                console.log(err.responseText);
            });
    }

    // RES NER support.
    $('div.content').on('DOMNodeInserted', function (e) {
        // Not RES.
        if (e.target.className !== 'NERPageMarker') {
            return;
        }

        // Wait for content to load.
        setTimeout(function () {
            run();
        }, 1000);
    });

    function run() {
        var things = $('div.thing:not(.dt-processed)');

        forEachChunked(things, 15, 500, processThing, function () {
            forEachChunked(subs, 5, 500, processSub);
        });
    }

    function processThing(thing) {
        var tag = '<span style="color:#888888; font-size:x-small;">&nbsp;[<a class="add-domain-tag" "href="javascript:;">T</a>]</span>';

        if ($(thing).hasClass('dt-processed')) {
            return;
        }
        $(thing).addClass('dt-processed');

        var subreddit = $(thing).find('a.subreddit').text() || $('.titlebox h1.redditname a').text();

        $(thing).find('span.domain:first').after(tag);

        if ($.inArray(subreddit, subs) == -1) {
            subs.push(subreddit);
        }
    }

    function processSub(currsub) {
        if (!currsub || notEnabled.indexOf(currsub) != -1) return;

        $.getJSON('http://www.reddit.com/r/' + currsub + '/wiki/toolbox.json', function (json) {

            if (json.data.content_md) {
                config = JSON.parse(json.data.content_md);

                if (!config.domainTags || config.domainTags.length < 1) {
                    return;
                }

                $('div.thing').each(function () {
                    var subreddit = $(this).find('a.subreddit').text() || $('.titlebox h1.redditname a').text();
                    if (subreddit != currsub) return;

                    var domain = $(this).find('span.domain:first').text().replace('(', '').replace(')', '').toLocaleLowerCase();
                    var entry = $(this).find('.entry');
					var domainEntry = $(entry).find('.domain');

                    $.grep(config.domainTags, function (d) {
                        if (domain.indexOf(d.name) !== -1) {
                            //$(entry).attr('style', 'border: 2px solid' + d.color + ' !important');
							$(domainEntry).attr('style',
									'background-color: ' + d.color + ';' + 
									'border-radius: 2px;' + 
									'color: black;' + 
									'padding: 0px 1px;'
							);
							$(domainEntry).find('a').attr('style', 
								'color: black;'
							);
                        }
                    });

                });
            }
        }).error(function (e) {
            var reason = JSON.parse(e.responseText).reason || '';
            if (reason == 'PAGE_NOT_CREATED' || reason == 'WIKI_DISABLED') {
                notEnabled.push(this);
            }
        });
    }

    $('body').delegate('.add-domain-tag', 'click', function (e) {
        var thing = $(e.target).closest('.thing');
        var domain = $(thing).find('span.domain:first').text().replace('(', '').replace(')', '').toLocaleLowerCase();
        var subreddit = $(thing).find('a.subreddit').text() || $('.titlebox h1.redditname a').text();

        // Make box & add subreddit radio buttons
        var popup = $('\
                    <div class="dtagger-popup">\
                    <span><span><input type="text" class="domain-name" value="' + domain + '" subreddit="' + subreddit + '"/>\
                    <select class="domain-color">\
                        <option value="' + GREEN + '">green</option><option value="' + YELLOW + '">yellow</option>\
                        <option value="' + RED + '">red</option><option value="' + BLACK + '">black</option><option value="none">none</option>\
                    </select>\
                    <input class="save-domain" type="button" value="save for /r/' + subreddit + '" title="NOTE: this will tag the domain as shown.\nDon\'t save i.imgur.com if you mean to tag imgur.com"/>\
                    <input class="cancel-domain" type="button" value="cancel"/>\
                    <br><span>This will tag the domain as shown. IE: i.imgur.com is not imgur.com</span>\
                    <div>')
            .appendTo('body')
            .css({
                left: e.pageX - 50,
                top: e.pageY - 10,
                display: 'block'
            });
    });

    $('body').delegate('.save-domain', 'click', function () {
        var popup = $(this).closest('.dtagger-popup'),
            subreddit = popup.find('.domain-name').attr('subreddit');

        var domainTag = {
            name: popup.find('.domain-name').val(),
            color: popup.find('.domain-color option:selected').val()
        };

        config = {
            ver: 1,
            domainTags: [],
            removalReasons: '',
            modMacros: ''
        };

        $(popup).remove();

        if (!domainTag.name || !domainTag.color) {
            return;
        }

        $.getJSON('http://www.reddit.com/r/' + subreddit + '/wiki/toolbox.json', function (json) {

            if (json.data.content_md) {
                config = JSON.parse(json.data.content_md);
            }

            if (config.domainTags) {
                var results = $.grep(config.domainTags, function (d) {
                    if (d.name === domainTag.name) {
                        var idx = config.domainTags.indexOf(d);
                        if (domainTag.color === 'none') {
                            config.domainTags.splice(idx, 1);
                        } else {
                            config.domainTags[idx] = domainTag;
                        }
                        postToWiki(subreddit, config);

                        return d;
                    }
                });

                if (!results || results.length < 1) {
                    config.domainTags.push(domainTag);
                    postToWiki(subreddit, config);
                }
            } else {
                config.domainTags = [];
                config.domainTags.push(domainTag);
                postToWiki(subreddit, config);
            }
        }).error(function (e) {
            if (JSON.parse(e.responseText).reason == 'PAGE_NOT_CREATED') {
                config.domainTags = [];
                config.domainTags.push(domainTag);
                postToWiki(subreddit, config);
            }
        });
    });

    $('body').delegate('.cancel-domain', 'click', function () {
        var popup = $(this).closest('.dtagger-popup');
        $(popup).remove();
    });

}

// Add script to page
(function () {
    var css = '\
        .dtagger-popup { max-width:900px;padding:10px 15px;background-color: #FAFAFA;border: 1px solid #369;position:absolute;z-index:10000} \
        .dtagger-popup .right{ float:right }\
        .dtagger-popup .left{ float:left }\
        .dtagger-popup .status{ display:none; }\
        .dtagger-popup tbody tr{ width: 225px; vertical-align:top; border-bottom:1px solid gray;display:block;padding:5px }\
        .dtagger-popup th{ padding-right:10px }\
        .dtagger-popup .buttons{ padding-top:10px }\
        .add-domain-tag:hover {text-decoration:underline}\
	';

    // Add CSS
    var style = document.createElement('style');
    style.type = "text/css";
    style.textContent = css;
    document.head.appendChild(style);

    var s = document.createElement('script');
    s.textContent = "(" + domaintagger.toString() + ')();';
    document.head.appendChild(s);

})();