// ==UserScript==
// @name           facebook.com - Simplified wall
// @version        1.12
// @description    Simplified (or hide) extra messages as pages, groups, new friendships, applications etc.

// @namespace      http://Kub4jz.cz
// @author         Kub4jz.cz <kub4jz@gmail.com>

// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*

// @exclude        http*://*.facebook.com/login.php
// @exclude        http*://*.facebook.com/sharer*
// @exclude        http*://*.facebook.com/ajax/*
// @exclude        http*://*.facebook.com/plugins/*

// @exclude        http*://apps.facebook.com/*
// @exclude        http*://facebook.com/apps/*
// ==/UserScript==

(function(d){

    var DEBUG = false;


    var script = {
        id: 71542,
        version: '1.12'
    }


    var gm_class = ' gm_simplified_wall';


    /* default settings */
    var extras = {
        'friendships'   : {'hide':false},
        'likes'         : {'hide':false},
        'applications'  : {'hide':true},

        'links'         : {'hide':false},
        'photos'        : {'hide':false},
        'groups'        : {'hide':false},
        'events'        : {'hide':false},
        'questions'     : {'hide':true},
        'places'        : {'hide':false}
    };


    var sty = {
         8  : 'friendships',
        11  : 'likes',         161  : 'likes',
                               245  : 'likes',
                               283  : 'likes',
                                 7  : 'likes',

        316 : 'groups',
         38 : 'events',        178  : 'events',

          6 : 'photos',         60  : 'photos',
                                65  : 'photos',
                               247  : 'photos',

          5 : 'links',         263  : 'links',

        237 : 'applications',  313  : 'applications',
                               360  : 'applications',

        280 : 'questions',     281  : 'questions',
                               286  : 'questions',
                               338  : 'questions',

        278 : 'places',        285  : 'places'
    };


    /* images */
    var image = {
      'friendships'  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABGUlEQVR42mL89/f/fwYKAAsyZ+WO6wxv3n9n+PHzD0NxghlRBjDBGHtOPGR48OQjw5evvxj+/PnHsOfEQ9IMuHrnNYoEOp+gARSHAQsL1CxGBgaG/wh+9lprhntvr6BoUhLWYZgafBSiHBYLD55/ZFi59ToDAwMDw7FfaQy/WBBhsCPjI4oBHjP4GbanfUT1goIkPwMz1NZfLA8ZOn3XMHT6riHeC6t33WA4/C0FxWZkG7G5BG7AhCWnGX7++Au3GRnA+OWbQ7DHAkwz2bGArJntjzzcJkI2e87iZ1AS1mFg+fz1G8Ov338YGBgYGNQZehgYGBgYLvOFoihG9zuM7zGDHxGNyAA97rEFHl4D8BmGnqAYKc3OgAEAcDyFP7wFB6YAAAAASUVORK5CYII=',
      'likes'        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABH0lEQVR42mL8////fwYKAAsDAwPDrFWnGa7cfkWyZh1VMYgBV26/YmjKdWRgZmIiWvPff/8Y6ibvhxjAwMDA8O/ff4Z///5iKPTLWsIgLMDFML8tCKtBeK0s6tjGcGRZOl6X4DXgzqN3DAwMDAxvP3wj3YAV2y4zWBvJExcL2MCyLRdRnO+XtYSBgYGBwdJAjqEyzQ5hQFL1WoZb99/AFcAAsmZktk3UTFQX3Lr/hiHMU5eBgYGBYdX2ywQDDasXnr78RFlKJBU0TD2AmhJJNiDTkoGBgYGBjY0N0wBYIFkbyTP4O2syWBmiRqW8lACDkJAQwgtqiiIMR889hAtsmBrDwMDAwHDmylOGDXuuM5R170DRPLHaB8VARkqzM2AAVfFZlaoTn9QAAAAASUVORK5CYII=',
      'groups'       : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA7ElEQVR42mL8////fwYKAMuWZb0MD26dJ0uzgpohA8uDW+cZkqOdyDJg7tJ9DEwMFAIWBgYGBnZJPTK174MYgAw2r1rNcPrYcQZTK0sG37BQBgYGBoaLZ84yPLp3j0FOSYlB38QYRT2GF04fO45CMzAwMDy6dw+FxmsAqQDDAGlZWRSagYGBgV9QEIXGa0BIXAwKzcDAwGBsaYFCY8QCegAyMDAwTGxtZzC1smSQU1KC+33ftu0YAcmELQCR+egBh85HcUHThD7KA5HklCgho8bQVddIlmYVLVMGxs+fP///9esXWQawsbExAAYAS9RLk0BrJx8AAAAASUVORK5CYII=',
      'events'       : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABEUlEQVR42mL89/f/fwYKAMu6AD+GO5s3k6xRxdeXIWjDJgaWO5s3M9g6O5NswGGopSwMDAwMv3/9It8LlBrAUBkX958cUBkX9//f3///mZANu3DuJENsmAdDbJgHw4olsyEWFKczVBank+6CmFB3rGx0F7CgGxgb5sHAxyfA4O0XTFQQMKELLF61g2HqnBUMWzetJc8AWFjwCwgyXLpwhmFibxMDH78AQ3piCMOlC2ewRyOyxt6OegZ+AUEGGzsnBj0DEwY9AxPC6QAGDIzMGRav2kFaQnr28CHD3g0bSE4/zx4+hBggICzM8PfPHwZhMTGiNb999YpBQFgYYoCknBzDnI4Okl1gbGvLwMDAwAAYAKNFvfW9NNRIAAAAAElFTkSuQmCC',
      'photos'       : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFRQTFRFhlUY8/PztHIg46lhoGYdomcdkVwa6b2Fwnwj46pjp2oe2o0t2o4u46he1YcmlF4bvnkiqmwetnQh6r6Hk5OTflAXnazL7+/v68KP////fX19////U3yTvAAAABx0Uk5T////////////////////////////////////ABey4tcAAABuSURBVHjaVM5ZEoAgDANQFPd9q23h/ve01EEkn29IiblcyuW9Nw45Bp0C3zEcIWsFyFoKTER2ryYiTnAAmPNM0ILE/oAGgPV9gawwG9j0RvgzANUwKhSIjvulbORo2QnIuHyHQL5UQFpfikeAAQDfnBU4ilUuIAAAAABJRU5ErkJggg==',
      'links'        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADlQTFRFxM3g5eXlWXOo3drUXWqIaWZpQF2b8O/wh5m/7e3ttMDX2cOT1Lh2O1mY7OHJcF5Qj4Rv////////mSm1QAAAABN0Uk5T////////////////////////ALJ93AgAAABcSURBVHjadI9bDoAgDARbER9ApXL/wyqWjUTi/HWyabtUKvmFTBzAhDZShDgfNKYqSGQmE5aQEGSSLnGLZRPvv4n1f8dwpRNIOAh82man6ILPmXkvVq5jEJcAAwDJzQ7zfrx8lwAAAABJRU5ErkJggg==',
      'applications' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAE5QTFRF4OTv+LE1enp6i1gAhYyctra2+b1TXlE8MDAwRkZGmJiYf39/rKyswoopAAAAkZGR9fX17+/v68KPODg41tbW3NzciYmJ////a2tr////FPwI9wAAABp0Uk5T/////////////////////////////////wAUIgDaAAAAh0lEQVR42mSO2w6DMAxDA5Rx3QZt0yT//6OLCxoS+KXqiWOHikLFzEp9SHcR2dWBbpsC9CGEXjFnds/f4XNm95BKjFEccNUFHisGD0IftXYTpXVZVktWnW+A7ErJ1KNeTecr3xMQ4e9gynkyOIamQ4vN4zijlD4D6dHSIh0ZcoC2knKe8xNgAEYsFLCnqRP9AAAAAElFTkSuQmCC',
      'questions'    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEX///+ysrJzTVxWcKhVgTNzTVxWcKiysrL///9zTVykpKRVgTNWcKhfd6x6VmSWps5ehz25fJPE2q0Y5MOyAAAAB3RSTlMA8vLy8gAApeUo5QAAAFBJREFUeF5lzFcOwDAIREFSqU67/2FjC6EoMJ8r7YNqsdBEZAKwMxgRYRl+F0Tslx2SmYdDOo/yPTA5rENcsPPoBsmq7oqoPk69UYfvEtHkBREOB5O/SjNzAAAAAElFTkSuQmCC',
      'places'       : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACQUlEQVR42oyST0iTcRjHPxumWzjf5pq6WtO5Fc5/iYJQLUZ4STuEhwrqMDqIBF7KIAi0gxdv2aFDQUHHFgge0kOMioZK9saI8h+TiXvZnGyOrVy+yevbYTBnyuh7+fHw/H6f58vz/WlUVVUpUDqZwu+bYHrKjxQKY3XaOd/dRdf1qwgmI/9KUwhIJ1O8GnlMNhLHbrVhrBBIZdKEpTWOnqrGO3T3AERbWPh9E2QjcdobWzBWCAAYKwTaG1vIRuL4fRMHHOwDTE/5sVttADT0uLn0sI+GHjcAdquN6Sl/cYAUCucnW9pcHNGXYWlz5Z1IoXBxgLO1CUVRAIgFF9j5LRMLLgCgKArO1qYDgJLCos7lZCOWwGKuZnEywOJkIN/b2ExQ53IWd9Db7yUgznGYAuIcvf3e4gBTTRWOjmYi69F9lyLrURwdzZhqqooDAAZGhxGX5tmWZQC2ZRlxaZ6B0eFDnWlUVVXfvnnJ7IdJAHY1uySTvzBtmvF0nuPj5xlC1hBq7W7+UXfnDW5fvp9bYnbrJ8HZ99y59wDBXIss/2FDWsb35DVhKYLWomNk6BFl+lKkTAaAZ+NjXPP0Ua4X0C59F6mtdwBQpjOAso3BUM7NwVt8Wf6Gd9DLMb2RSoMh78B+wom4nEuo5MfXGRxnGnJFqZ7Kmr2onn9yo9HurenC6dypU828E8fxnL1CyWpoHrfnIgDRlcMj1GihyqYlurpDQk2R3kmxuBbMDT1efZIXT8f4X2V0W8SEBPWW3Bf/OwCb1c8dJvZ7AQAAAABJRU5ErkJggg=='
    };



    /* whitelist */
    var whitelist = new Array(
        46, // statuses
        247, // photos
        280, 281, 286, 338,// questions
        278, 285 // places
    );

    var whitelist_regex = new RegExp(whitelist.join("|"));

    /* app whitelist */
    var app_whitelist = new Array(
        87741124305,       // youtube
        202423869273,      // endomondo
        115463795461,      // twitter status update
        56212371378,       // tweetdeck
        183319479511       // hootsuite
    );

    var app_whitelist_regex = new RegExp(app_whitelist.join("|"));



    /**
     * Local storage/greasemonkey Functions
     */
    var storage = 'localstorage';

    if (typeof GM_deleteValue === 'function') {
        storage = 'greasemonkey';
    }


    function setValue(key, value)
    {
        switch (storage) {
            case 'greasemonkey':
                GM_setValue(key, value);
                break;

            case 'localstorage':
                localStorage.setItem(key , value);
                break;
        }
        return false;
    }


    function getValue(key)
    {
        switch (storage) {
            case 'greasemonkey':
                return GM_getValue(key);
                break;

            case 'localstorage':
                var val = localStorage.getItem(key);

                if (val == 'true') {
                    return true;
                } else if (val == 'false') {
                    return false;
                } else {
                    return val||null;
                }
                break;
        }
        return false;
    }


    function deleteValue(key)
    {
        switch (storage) {
            case 'greasemonkey':
                GM_deleteValue(key);
                break;

            case 'localstorage':
                localStorage.removeItem(key);
                break;
        }
        return false;
    }



    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text !== '') {
            GM_log(text);
        }
        return false;
    }



    /**
     * Get Elements by querySelector All
     */
    function g(id, parent)
    {
        if (id && typeof id === 'string') {
            var p = parent||d;
            id = p.querySelectorAll(id);
        }
        return id||null;
    }


    /**
     * Get Elements by className
     */
    function c(id, parent)
    {
        if(id && typeof id === 'string') {
            var p = parent||d;
            id = p.getElementsByClassName(id);
        }
        return id||null;
    }


    /**
     * Hide element
     */
    function hide(el)
    {
        el.style.display = 'none';
    }


    /**
     * Show element
     */
    function show(el, d)
    {
        if (d == null) d = 'block';

        el.style.display = d;
    }



    /**
     * Animate Show/hide element
     */
    var transition = {
        showclassName: 'gm_expanded',
        hideclassName: 'gm_collapsed',

        show: function(el) {
            el.className += ' ' + this.showclassName;
            el.className = el.className.replace(this.hideclassName, '');
        },

        hide: function(el) {
            el.className += ' ' + this.hideclassName;
            el.className = el.className.replace(this.showclassName, '');
        }
    }



    function editWall(stories)
    {
        isBox = promoBox.create();
        if (!isBox) return false;

        var count = stories.length;

        if (count > 0) {
            for (i = 0; i < count; i++) {
                simplified(stories[i]);
            }
        } else {
            simplified(stories);
        }

        return false;
    }


    function simplified(story)
    {
        var story_class = story.className;

        if (story_class.indexOf(gm_class) >= 0) {
            return false;
        }

        try {
            var story_data = story.getAttribute('data-ft');

            if(!story_data) return false;

            story_type = story_data.match(/\"sty\":(\d+)/)[1];
            substories = story_data.match(/\"substories\":(\d+)/);
            app_id = story_data.match(/\"app_id\":(\d+)/);
        } catch(e) {
            log(e);
        }

        var extra_type = sty[story_type];

        /* apps whitelist */
        if (app_whitelist_regex.test(app_id) == true) {
            extra_type = null;
        }

        /* add gm class */
        story.className += extra_type ? gm_class + ' gm_' + extra_type : gm_class;

        /* hide story */
        if (extra_type != null && extras[extra_type].hide == true) {
            transition.hide(story);
        }

        /* update counter */
        counter.update(extra_type);

        if (story_class.indexOf('uiSubStream') >= 0  ||
            c('uiStreamPassive', story).length === 0 ||
            whitelist_regex.test(story_type) === true
        ) {
            return false;
        }

        var story_footer = c('uiStreamFooter', story)[0];

        /* count names in message */
        var names_count  = g('.passiveName, .uiTooltip', story).length;

        try {
            /* get icon */
            var icon = c('UIImageBlock_ICON_Image', story_footer)[0];

            if (icon != null) {

                if (!!(attach = c('uiStreamAttachments', story)[0])) {
                    if (extra_type == 'friendships' ||
                        extra_type == 'groups' ||
                        extra_type == 'events' ||
                        extra_type == 'places'
                    ) {
                        attach.parentNode.removeChild(attach);
                    } else if (names_count <= 1) {
                        return;
                    }
                }

                if (substories || (names_count > 1 && extra_type == 'photos')) {
                    story.className += ' merged';
                } else {
                    story.className += ' simplified';
                }

                /* message */
                header = c('uiStreamMessage', story)[0];
                header.innerHTML = '<span class="icon"></span>' + header.innerHTML;


                /* story type icon manipulation */
                header.firstChild.appendChild(icon);

                /* remove time */
                if (g('.like_link, .comment_link', story_footer).length === 0) {
                    story_footer.parentNode.removeChild(story_footer);
                }

            } else if (names_count > 1 ||
                       substories != null ||
                       story_type == 60 // 60 = xy and x others changed their profile pictures
            ) {
                story.className += substories ? ' substories' : ' no-avatar';
            }

        } catch(e) {log(e);}

        return false;
    }



    function toggleExtras(extra_type)
    {
        var extra_class = 'gm_' + extra_type;

        var els = c(extra_class, content);
        var length = els.length - 1;

        if (length >= 0) {

            var display = '';

            if (extras[extra_type].hide == true) {
                display = 'none';
            }

            for (i = 0; i <= length; i++) {
                var parent = els[i];

                if (display == 'none') {
                    transition.hide(parent);
                } else {
                    transition.show(parent);
                }
                //parent.style.display = display;
            }
        }

        settings.save();

        return false;
    }



    /**
     * Counter
     */
    var counter = {
        update: function(extra_type) {
            var extra_class = 'gm_' + extra_type;

            if (!!(count_el = d.getElementById('sx_' + extra_type + '_count'))) {

                var count = c(extra_class, content).length;

                if (count > 0) {
                    show(count_el.parentNode, 'inline');
                    count_el.innerHTML = count;
                } else {
                    hide(count_el.parentNode);
                }
            }

            return false;
        },

        updateAll: function() {
            for (var extra_type in extras) {
                this.update(extra_type);
            }
        }
    };



    /**
     * Promo Box
     */
    var promoBox = {

        create: function() {
            if (!d.getElementById('home_stream')) return false;

            if (d.getElementById('pagelet_simplifiedwallbox')) {
//                 this.addEvents();
                return true;
            }

            var col = d.getElementById('rightCol');

            if (!!(fixed_elem = c('rightColumnWrapper', col)[0])) {
                col = fixed_elem;
            }

            var box = d.createElement('div');
                box.setAttribute('id', 'pagelet_simplifiedwallbox');

            var boxTitle = d.createElement('div');
                boxTitle.setAttribute(
                    'class',
                    'uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader'
                );

            var boxTitle_HTML  = '<div class="clearfix uiHeaderTop">' +

                                   '<div class="uiTextSubtitle uiHeaderActions rfloat">' +
                                     '<a href="/pages/Simplified-wall-userscript/159277950766563">' +
                                       'Become a Fan' +
                                     '</a>' +
                                   '</div>' +

                                   '<div>' +
                                     '<h4 class="uiHeaderTitle">' +
                                       'Simplified wall ' +
                                       '<small>v' + script.version + '<small>' +
                                     '</h4>' +
                                   '</div>' +

                                 '</div>';

            boxTitle.innerHTML = boxTitle_HTML;
            box.appendChild(boxTitle);

            var boxContent = d.createElement('div');

            box.appendChild(boxContent);
            col.appendChild(box);

            var extra_class, section, section_HTML, input,
                i = 1;

            for (var extra_type in extras) {

                extra_class = 'sx_' + extra_type;

                section = d.createElement('div');
                section.setAttribute('class', 'UIImageBlock mbs phs clearfix');

                if (i > 3) {
                    section.className += ' hidden';
                }

                section_HTML = '' +
                               '<img' +
                               ' class="img UIImageBlock_Image UIImageBlock_ICON_Image"' +
                               ' src="'+ image[extra_type] +'"' +
                               '>' +

                               '<div class="UIImageBlock_Content UIImageBlock_ICON_Content">' +
                                 '<input' +
                                 ' type="checkbox"' +
                                 ' id="'+ extra_class +'"' +
                                 ' data-gm-type="'+ extra_type +'"' +
                                 '>' +

                                 '<label for="'+ extra_class +'">' +
                                   'Hide ' + extra_type +
                                 '</label>' +

                                 ' <small style="display: none;">' +
                                   '<span id="'+ extra_class +'_count">0</span>' +
                                 '</small>' +
                               '</div>';

                section.innerHTML += section_HTML;

                boxContent.appendChild(section);

                if (extras[extra_type].hide == true) {
                    input = section.getElementsByTagName('input')[0];
                    input.setAttribute('checked', 'true');
                }

                i++;
            }

            var moreText = 'More';
            var lessText = 'Less';

            var links_HTML  = '<a href="#"" id="navMoreLess">' +
                              'More' +
                              '</a>';

            box.innerHTML += links_HTML;

            /* set events for checkboxes */
            this.addEvents();

            return true;
        },

        toggle: function(evt) {
            var pagelet = d.getElementById('pagelet_simplifiedwallbox'),
                pagelet_className = pagelet.className;

            var navMoreLess = d.getElementById('navMoreLess'),
                moreText = 'More',
                lessText = 'Less';

            try {
                var action,
                    els = c('hidden', pagelet);

                if (pagelet_className.indexOf('Open') >= 0) {
                    action = 'hide';
                    pagelet.className = pagelet_className.replace(' Open', '');
                    navMoreLess.innerHTML = moreText;
                } else {
                    action = 'show';
                    pagelet.className += ' Open';
                    navMoreLess.innerHTML = lessText;
                }

                for (i = 0; i < els.length; i++) {
                    var el = els[i];

                    if (action == 'show') {
                        show(el);
                    } else {
                        hide(el);
                    }
                }
            } catch(e) {
                log(e);
            }

            evt.preventDefault();

            return false;
        },

        addEvents: function() {
            try {
                for (var extra_type in extras) {
                    var extra_class = 'sx_' + extra_type;

                    d.getElementById(extra_class).addEventListener(
                        'change',
                        function(evt) {
                            settings.change(this.getAttribute('data-gm-type'), this);
                        },
                        false
                    );
                }

                /* More/Less link event */
                d.getElementById('navMoreLess').addEventListener(
                    'click',
                    this.toggle,
                    false
                );
            } catch (e) {
                log(e);
            }

            return false;
        }

    };



    /**
     *  Settings functions
     */
    var settings = {

        save: function() {

            var source;

            for (var extra_type in extras) {

                if (storage == 'greasemonkey') {
                    source = extras[extra_type].toSource();
                } else { // chrome

                    source = '({';

                    for (var val in extras[extra_type]) {
                        source += val + ':' + '"' + extras[extra_type][val] + '", ';
                    }

                    re = new RegExp('[, ]+$', 'g');
                    source = source.replace(re, '');

                    source += '})';
                }

                if (source.length <= 4) continue;

                setValue(extra_type, source);
            }

            return false;

        },

        load: function() {

            for (var extra_type in extras) {

                var value = getValue(extra_type);

                if (value) {
                    extras[extra_type] = eval(value);

                    if (extras[extra_type].hide == 'true') {
                        extras[extra_type].hide = true;
                    }
                }
            }

            return false;

        },

        change: function(extra_type, el) {
            extras[extra_type].hide = el.checked;

            toggleExtras(extra_type);
            this.save();

            return false;
        }

    };



    /**
     * CSS Styles
     */
    function addStyle(css)
    {
        if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
        else if (!!(head = d.getElementsByTagName('head')[0])) {
            var style = d.createElement('style');
            try { style.innerHTML = css; }
            catch(x) { style.innerText = css; }
            style.type = 'text/css';
            head.appendChild(style);
        }

        return false;
    }


    function cssStyles()
    {
        addStyle(
            '' +
            /* box */
            ' #pagelet_simplifiedwallbox{line-height:13px;}' +
            ' #pagelet_simplifiedwallbox .img{height:16px;width:16px;}' +
            ' #pagelet_simplifiedwallbox .UIImageBlock_ICON_Content small{background-color:#D8DFEA;color:#3B5998;font-size:9px;font-weight:bold;float:right;padding:0 4px 2px;border-radius:2px;}' +
            ' #pagelet_simplifiedwallbox input{cursor:pointer;margin:0 5px 0 0;vertical-align:bottom;}' +
            ' #pagelet_simplifiedwallbox .uiHeaderTitle small{font-size:smaller;font-weight:normal;}' +
            ' #pagelet_simplifiedwallbox .hidden{display:none;}' +
            ' #pagelet_simplifiedwallbox #navMoreLess{padding-left:26px;}' +
            ' #pagelet_simplifiedwallbox #navMoreLess:after{border-left:3px solid transparent;border-right:3px solid transparent;border-top:3px solid #3B5998;content:" ";display:inline-block;height:0;margin-left:2px;margin-top:6px;opacity:.8;text-indent:-99999px;vertical-align:top;width:0;}' +
            ' #pagelet_simplifiedwallbox.Open #navMoreLess:after{border-bottom:3px solid #3B5998;border-top:none;}' +

            /* remove avatar */
            ' .gm_simplified_wall.simplified .actorPhoto,' +
            ' .gm_simplified_wall.merged .actorPhoto,' +
            ' .gm_simplified_wall.substories .actorPhoto,' +
            ' .gm_simplified_wall.no-avatar .actorPhoto {display:none;}' +

            /* simplified messages */
            ' .gm_simplified_wall.simplified{min-height:18px;}' +
            ' .gm_simplified_wall.simplified .storyContent{padding:5px 2px 5px 78px;}' +
            ' .gm_simplified_wall.simplified .uiStreamHide{margin:0;}' +
            ' .gm_simplified_wall.simplified .uiStreamMessage{margin:0;margin-left:-25px;}' +
            ' .gm_simplified_wall.simplified .UIImageBlock_ICON_Image{margin:0 10px 0 0;vertical-align:text-top;}' +
            ' .gm_simplified_wall.simplified .uiStreamMessage .text_exposed_link{margin:5px 0;padding-left:20px;}' +
            ' .gm_simplified_wall.simplified .uiStreamSubstories{margin-left:20px;padding:3px 0 0;}' +

            /* messages without avatar */
            ' .gm_simplified_wall.no-avatar{height:auto;min-height:18px;}' +
            ' .gm_simplified_wall.no-avatar.uiListLight{padding:5px 2px 2px 58px;}' +
            ' .gm_simplified_wall.no-avatar .uiStreamHide,' +
            ' .gm_simplified_wall.no-avatar .uiStreamMessage{margin:0;}' +
            ' .gm_simplified_wall.no-avatar .UIImageBlock_MED_Image,' +
            ' .gm_simplified_wall.no-avatar .uiStreamAttachments,' +
            ' .gm_simplified_wall.no-avatar .uiStreamSource{display:none;}' +

            /* merged stories */
            ' .gm_simplified_wall.merged .storyInnerContent{padding-left:58px;}' +
            ' .gm_simplified_wall.merged .uiStreamPassive{margin-left:-25px;}' +
            ' .gm_simplified_wall.merged .UIImageBlock_ICON_Image{margin-right:10px;}' +

            /* substories */
            ' .gm_simplified_wall.substories .uiStreamSubstories{margin-left:35px;}' +

            /* Animate hidding*/
            ' .gm_expanded, .gm_collapsed {overflow:hidden;}' +
            ' .gm_expanded {max-height:1000px;-moz-transition:max-height .2s ease-in-out 0s, opacity .25s ease-in-out .2s;-webkit-transition:max-height .2s ease-in-out 0s, opacity .25s ease-in-out .2s;}' +
            ' .gm_collapsed {max-height:0;min-height:0 !important;opacity:0;-moz-transition:max-height .3s ease-in-out 0s, opacity .25s ease-in-out 0s;-webkit-transition:max-height .3s ease-in-out 0s, opacity .25s ease-in-out 0s;}'
        );

        return false;
    }



    /**
     * Start script
     */
    var content = d.getElementById('content');

    cssStyles();
    settings.load();
    editWall(g('li.uiListLight', d.getElementById('home_stream')));


    function afterDomNodeInserted(e)
    {
        var target = e.target;

        if (target.nodeName == 'LI' && e.relatedNode.id == 'home_stream') {
            editWall(target);
        }

        return false;
    }


    if (content) {
        setTimeout(function() {
            content.addEventListener(
                'DOMNodeInserted',
                afterDomNodeInserted,
                false
            );
        }, 2000);
    }


    /* AutoUpdater */
    if (typeof autoUpdate == 'function' && isBox) {
        autoUpdate (script.id, script.version);
    }

})(document);
