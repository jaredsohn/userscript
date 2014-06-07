// ==UserScript==
// @name           Add Timeline and Revisions Links
// @namespace      http://stackoverflow.com/users/390278
// @description    Add Timeline and Revisions links to questions and answers
// @include        http://stackoverflow.com/*
// @include        http://*.stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://*.superuser.com/*
// @include        http://serverfault.com/*
// @include        http://*.serverfault.com/*
// @include        http://stackapps.com/*
// @include        http://*.stackapps.com/*
// @include        http://askubuntu.com/*
// @include        http://*.askubuntu.com/*
// @include        http://*.stackexchange.com/*
// ==/UserScript==

(function () { var $;
    var sep = '<span class="lsep">|</span>';
    
    function createTimeline(text, id, cls) {
        var $timeline = $('<a>').html(text)
            .attr({
                'id':    'timeline-'+id,
                'title': 'view question timeline',
                'href':  '/posts/'+id+'/timeline',
                'class': 'timeline'
            });
        if (cls !== undefined)
            $timeline.addClass(cls);
        return $timeline;
    }

    function createRevisions(text, id, cls) {
        var $revisions = $('<a>').html(text)
            .attr({
                'id':    'revisions-'+id,
                'title': 'view revisions history',
                'href':  '/posts/'+id+'/revisions',
                'class': 'revisions'
            });
        if (cls !== undefined)
            $revisions.addClass(cls);
        return $revisions;
    }

    function addHomepageLinks() {
        $('.question-summary', '.home-page,.questions-page,.unanswered-page,.search-page').each(function () { var $summary = $(this);
            var id = $summary.attr('id').replace(/\D+(\d+)/, '$1');
            var $timeline = createTimeline('&Delta;', id, 'started-link');
            var $revisions = createRevisions('&real;', id, 'started-link');
            var $container = $summary.find('.started');

            // questions view
            if ($summary.find('.user-info').length) {
                // should be written out
                $timeline.text('timeline');
                $revisions.text('revisions');
                
                // put the links in a container
                var $div = $('<div>').addClass('time-rev-links');
                $container.append($div);
                $container = $div;
            }
            
            $container.append($timeline).append(sep).append($revisions);
        });
    }
    
    function addQuestionAnswerLinks() {
        $('.post-menu', '.question-page').each(function () { var $menu = $(this);
            var id = $menu.find('a[id^="flag-post-"]').attr('id').replace(/\D+(\d+)/, '$1');

            // question timeline
            if (!$menu.parents('#answers').length) {
                var $timeline = createTimeline('timeline', id);
                $menu.append(sep).append($timeline);
            }

            // needs revisions link
            if ($menu.parent().siblings('.post-signature').length === 1) {
                var $revisions = createRevisions('revisions', id);
                $menu.append(sep).append($revisions);
            }
        });
    }
    
    function addModLinks($link) {
        var id = $link.attr('href').replace(/\D+(\d+).*/g, '$1');
        var $timeline = createTimeline('&Delta;', id, $link.attr('class'));
        var $revisions = createRevisions('&real;', id, $link.attr('class'));

        var $span = $('<div>').addClass('time-rev-links')
            .css({ 'margin-left': '4px', 'float': 'right' })
            .append($timeline).append(sep).append($revisions);
        $link.parent().append($span);
    }
    
    function tryAction(query, action) {
            var retryCount = 0;
            const retryMax = 3;
            const delay = 1000;
            
            function doAction() {
                var $query = query();
                
                if ($query.length > 0) {
                    retryCount = 0;
                }

                action($query);

                // schedule for doing again
                if (retryCount++ < retryMax) {
                    window.setTimeout(doAction, delay);
                }
            }
            
            window.setTimeout(doAction, delay);
    }

    function addReviewLinks() {
        tryAction(function () {
            return $('.question-hyperlink,.answer-hyperlink', '.tools-page,.review-page').filter(function () { var $link = $(this);
                return !$link.hasClass('timeline') && !$link.hasClass('revisions') && !$link.siblings('.time-rev-links').length;
            });
        },
        function ($query) {
            $query.each(function () { var $link = $(this);
                addModLinks($link);
            });
        });
    }
    
    function letsJQuery() {
        addHomepageLinks();
        addQuestionAnswerLinks();
        addReviewLinks();
    }
    
    function ensureUnsafeWindow() {
        var greasemonkeyServiceDefined = false;
        try {
            if (typeof Components.interfaces.gmIGreasemonkeyService === 'object') {
                greasemonkeyServiceDefined = true;
            }
        }
        catch (err) {
            //Ignore.
        }

        if (typeof unsafeWindow === 'undefined' || !greasemonkeyServiceDefined) {
            unsafeWindow = (function () {
                var dummy = document.createElement('p');
                dummy.setAttribute('onclick', 'return window;');
                return dummy.onclick();
            })();
        }
    }

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery;
            letsJQuery();
        }
    }
    
    ensureUnsafeWindow();
    GM_wait();
})();
