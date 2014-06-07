// ==UserScript==
// @name        Bored
// @namespace   http://userscripts.org/O_Lawd
// @grant       none
// @include     http://derpiboo.ru/*
// @include     http://www.derpiboo.ru/*
// @include     http://derpibooru.org/*
// @include     http://www.derpibooru.org/*
// @include     https://derpiboo.ru/*
// @include     https://www.derpiboo.ru/*
// @include     https://derpibooru.org/*
// @include     https://www.derpibooru.org/*
// @include     http://www.trixiebooru.org/*
// @include     https://www.trixiebooru.org/*
// @include     http://trixiebooru.org/*
// @include     https://trixiebooru.org/*
// @version     0.2.8c
// @updateURL   http://userscripts.org/scripts/source/137452.meta.js
// @description Booru On Rails Extension Demo: Various (Likely Temp) Tweaks for Derpiboo.ru
// ==/UserScript==

function BOREDInit() {
    'use strict';
    
    // Options.
    // TODO: I think code will end up cleaner if I make this a function and tie
    // it directly to respective feature functions.
    var BOREDConfig = {
        MOVE_WATCHED_LINK: true,
        AUTO_EXPAND_COMMENT_IMAGES: true,
        HIDE_COMMENT_IMAGES: false,
        SHOW_REVERSE_SEARCH_LINKS: true,
        SHOW_ZOOM_CURSOR: true,
        ENABLE_MARKITUP: true,
        ENABLE_FILE_UPLOAD_PREVIEW: true,
        NOSTALGIA_MODE: false,
        SAVE_DRAFTS: true,
        ENABLE_RANDOM_BUTTON: true,
        SPOILER_ALL_DOWNVOTED: false,
        SPOILER_SELECTED_IMAGES: false,

        PANEL: {
            'Layout': {
                MOVE_WATCHED_LINK: 'Move "Watched" Link to Top-Right Corner',
                NOSTALGIA_MODE: 'Nostalgia Mode (Not Serious!)',
                ENABLE_RANDOM_BUTTON: 'Random Image Link (Fun! Fun! Fun!)'
            },
            'Images': {
                AUTO_EXPAND_COMMENT_IMAGES: 'Click to Expand Comment Images',
                ENABLE_FILE_UPLOAD_PREVIEW: 'Preview Manual File Uploads',
                SHOW_ZOOM_CURSOR: 'Show Zoom Cursors',
                SHOW_REVERSE_SEARCH_LINKS: 'Reverse Image Search Links'
            },
            'Comment Editing': {
                ENABLE_MARKITUP: 'Enable markItUp! WYSIWYM Editing',
                SAVE_DRAFTS: 'Save comment draft on unload. (Recommended!)'
            },
            'Advanced Image Hiding': {
                SPOILER_ALL_DOWNVOTED: 'Spoiler all downvoted images.',
                SPOILER_SELECTED_IMAGES: 'Hide images.'
            }
        },
    }, menusEnabled = false,
        $imageInput,
        // Odd. I thought I long patched this in an earlier BORED iteration.
        zin = "-moz-zoom-in, -webkit-zoom-in",
        zout = "-moz-zoom-out, -webkit-zoom-out";

    BOREDConfig.setOpt = function (optName, val) {
        BOREDConfig[optName] = val;
        BOREDConfig.saveSettings();
    };

    BOREDConfig.makePanel = function () {
        var $settingsLink = $('<a href="#">Ext</a>'),
            $panelDiv = $('<form class="boredpanel"></form>'),
            $submit = $('<input type="submit" value="Save and Reload" />'),
            $cancel = $('<input type="reset" value="Cancel" />'),
            widgets = [];

        if ($('a[href="/users/sign_in"]').length) {
            $settingsLink.insertBefore('.userbox > a[href="/users/sign_in"]');
        } else {
            $settingsLink.insertBefore('.userbox > a[href="/users/sign_out"]');
        }

        // Create the HTML and option widgets.
        $panelDiv.append('<h2>B.O.R.E.D. Settings</h2>');
        $.each(BOREDConfig.PANEL, function (header, options) {
            $panelDiv.append('<h3>' + header + '</h3>');

            // Every option at the moment is a plain Boolean. In the future,
            // I'll make text and integer widgets with tests done with the
            // instanceof operator.
            $.each(options, function (name, description) {
                var widget = new BOREDConfig.BooleanWidget(name, description,
                                                           BOREDConfig[name]);
                $panelDiv.append(widget.element);
                widgets.push(widget);
            });
        });
        $panelDiv.append($submit).append($cancel);

        // Panel CSS.
        $panelDiv.css({
            display: 'none',
            position: 'absolute',
            right: '4px',
            top: '40px',
            width: '400px',
            zIndex: '9001',
            overflow: 'hidden'
        });
        $panelDiv.addClass('image_description');
        $('.field', $panelDiv).css({
            marginTop: '0.5em',
            marginBottom: '0.5em'
        });
        $('.field label', $panelDiv).css('width', '300px');
        $('h2,h3', $panelDiv).css('text-align', 'center');
        $('h2', $panelDiv).css({
            fontWeight: 'bold',
            marginBottom: '0.5em'
        });
        $('h3', $panelDiv).css({
            marginTop: '1em',
            marginBottom: '0.5em'
        });
        $submit.css({
            width: '80%',
            margin: '1em auto 0.5em 10%'
        });
        $cancel.css({
            width: '80%',
            margin: '0 auto 0.3em 10%',
            // It defaults to Courier New, lol
            fontFamily: 'verdana,arial,helvetica,sans-serif'
        });

        $panelDiv.insertAfter('#header');

        $settingsLink.click(function () {
            $('.boredpanel').stop(true, true).slideToggle('fast');
            return false;
        });

        $panelDiv.submit(function () {
            $.each(widgets, function(i, widget) {
                widget.writeSetting();
            });
            BOREDConfig.saveSettings();
            window.location.reload();
            return false;
        });

        $panelDiv.on('reset', function () {
            $settingsLink.click();
        });
    };

    BOREDConfig.BooleanWidget = function (name, label, initial) {
        var id = 'BORED-' + name,
            $el = $('<div class="field"><input type="checkbox" id="' + id +
                    (initial ? '" checked="checked" ' : '" ') + '/>' +
                    '<label for="' + id + '">' + label + '</label></div>');

        this.name = name;
        this.element = $el;
    };

    BOREDConfig.BooleanWidget.prototype.getInput = function () {
        return $('input', this.element);
    };

    BOREDConfig.BooleanWidget.prototype.writeSetting = function () {
        BOREDConfig[this.name] = this.getInput().is(':checked');
    };

    BOREDConfig.loadSettings = function () {
        var cooks = document.cookie.split(/\s*;\s*/).map(function(cook) {
            return cook.substring(0, cook.indexOf("="));
        }).filter(function(cook) {
            return cook.indexOf("BOREDConfig") === 0;
        });
        // Checks if there are still some cookie-based config options
        if (cooks.length) {
            cooks.forEach(function(cook) {
                var value = $.cookie(cook), option = cook.substring(12);
                if (value && option !== "PANEL") {
                    BOREDConfig[option] = JSON.parse(value);
                }
                $.cookie(cook, null); // Erases the cookie.
            });
            this.saveSettings(); // Saves the settings with the new method
        } else {
            $.each(this, function(option, val) {
                var value;
                if (!(val instanceof Function) && option !== 'PANEL') {
                    value = localStorage['BOREDConfig_' + option];
                    if (value && option !== 'PANEL') {
                        BOREDConfig[option] = JSON.parse(value);
                    }
                }
            });
        }
    };

    BOREDConfig.saveSettings = function () {
        $.each(BOREDConfig, function(option, val) {
            if (!(val instanceof Function) && option !== 'PANEL') {
                localStorage['BOREDConfig_' + option] = JSON.stringify(val);
            }
        });
    };

    // Gets the current spoiler setting (click, static...).
    function getSpoilerType() {
        return $('#spoiler-quick-menu').val();
    }

    // Slide-down menu functionality for the metabar.
    function SlideDownMenu($element, minWidth) {
        var $m = $('<div class="slidedownmenu" ' +
                   'style="display:inline;vertical-align:top;' +
                   'margin-right:5px;">' +
                   '<div class="slidedownmenu-inner" ' +
                   'style="position:absolute;display:none;margin-top:-1px;' +
                   'min-width:' + minWidth + '"></div></div>'),
            $menu = $('div.slidedownmenu-inner', $m);

        if (!menusEnabled) {
            $(document).on('mouseenter', 'div.slidedownmenu', function () {
                $(this).find('.slidedownmenu-inner').stop(true, true)
                       .slideDown('fast');
            }).on('mouseleave', 'div.slidedownmenu', function () {
                $(this).find('.slidedownmenu-inner').stop(true, true)
                       .slideUp('fast');
            });
            menusEnabled = true;
        }

        $element.insertBefore($menu);

        this.body = $menu;
        this.top = $m;
    }

    function zoomCursors() {
        $('#image_target').css('cursor', zin).click(function () {
            var $this = $(this);
            if ($this.data('expanded')) {
                $this.data('expanded', false);
                $this.css('cursor', zin);
            } else {
                $this.data('expanded', true);
                $this.css('cursor', zout);
            }
        });
    }

    // Move the "Watched" link to the user nav bar.
    function moveWatched() {
        $('div#navigation > a[href="/images/watched"]')
            .insertBefore('div.userbox > a[href="/messages"]');
    }

    // Related images link. I should probably make this a menu for TinEye, too.
    function relImages() {
        var $metabar = $('div.metabar').first(),
            $insertPoint,
            url,
            $header,
            menu;

        if (!$metabar.data('attachedRel')) {
            $insertPoint = $metabar.find('div.metasection:last-child');
            url =  $insertPoint.children('a:first-child').attr('href');
            $header = $('<a href="#">Rev. Img. Search \u25BC</a>');
            menu = new SlideDownMenu($header, '12em');
        
            $insertPoint.prepend(menu.top);
            
            if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
                url = window.location.protocol + url;
            }
        
            menu.body.append(
                '<a style="display:block" href="https://www.google.com/' +
                    'searchbyimage?num=10&hl=en&site=imghp&image_url=' + url +
                    '" target="_blank">Google</a><a style="display:block" ' +
                    'href="http://www.tineye.com/search/?url=' + url +
                    '" target="_blank">TinEye</a></div></div>'
            );
            $metabar.data('attachedRel', true);
        }
    }
    
    function loadDraft(draftId, txtSel) {
        var draft = localStorage["BOREDDraft_" + draftId];

        if (!draft) return;
        try {
            draft = JSON.parse(draft);
        } catch (e) { // Something wrong has happened
            localStorage.removeItem("BOREDDraft_" + draftId);
            return;
        }

        if (draft.timeStamp < Date.now() - 12096e5) {
            // Drafts older than 2 weeks are trashed
            localStorage.removeItem("BOREDDraft_" + draftId);
            return;
        }
        if (draft.content) {
            // There shouldn't be empty drafts...
            $(txtSel).val(draft.content);
        }
    }

    function saveDraft(draftId, txtSel) {
        var content = $(txtSel).val();
        if (content)
            localStorage["BOREDDraft_" + draftId] = JSON.stringify({
                timeStamp: Date.now(),
                content: content
            });
        else localStorage.removeItem("BOREDDraft_" + draftId);
    }

    function manageDrafts() {
        var txtSel, draftId, $comments, firstTime = true;

        // The assignment in the if condition is intentional
        if (draftId = location.pathname.match(/^\/(?:images\/)?(\d+)$/)) {
            txtSel = "#comment_body";
            draftId = draftId[1];
            $comments = $('#comments');
            $comments.ajaxSend(function(evt, xhr, opts) {
                // Saving the draft when changing comment page
                if (opts.url.indexOf('/images/' + draftId + '/comments')
                        !== -1) {
                    if (firstTime) {
                        firstTime = false;
                    } else if (opts.type === "GET") {
                        saveDraft(draftId, txtSel);
                    }
                }
            });
            $(document).ajaxComplete(function(evt, xhr, opts) {
                // If the request was a POST, then a comment was posted.
                // saveDraft just trashes the draft, then.
                if (opts.type === "POST") {
                    saveDraft(draftId, txtSel);
                }
            });
            loadDraft(draftId, txtSel);
        } else if (draftId
                = location.pathname.match(/^\/messages\/([\da-f]+)$/)) {
            txtSel = "#body";
            draftId = draftId[1];
            loadDraft(draftId, txtSel);
            $($(txtSel)[0].form).submit(function() {
                localStorage.removeItem("BOREDDraft_" + draftId);
            });
        }

        $(window).unload(function() {saveDraft(draftId, txtSel);});
    }

    function ImageResizer($image, maxWidth, maxHeight) {
        var expander = this;

        this.maxWidth = maxWidth || 500;
        this.maxHeight = maxHeight || 500;
        this.image = $image;
        this.domImage = $image[0];
        this.origWidth = this.domImage.naturalWidth || this.domImage.width;
        this.origHeight = this.domImage.naturalHeight || this.domImage.height;
        this.expanded = false;

        // CSS workaround.
        $image.css('max-width', this.origWidth);

        this.shrinkImageSize();

        $image.click(function () {
            if (expander.expanded) {
                expander.shrinkImageSize();
            } else {
                expander.expandImageSize();
            }
        });
    }

    ImageResizer.prototype.shrinkImageSize = function () {
        var domImage = this.domImage,
            maxWidth = this.maxWidth,
            maxHeight = this.maxHeight;

        if (domImage.width > maxWidth) {
            domImage.height = domImage.height / domImage.width * maxWidth;
            domImage.width = maxWidth;
        }

        if (domImage.height > maxHeight) {
            domImage.width = domImage.width / domImage.height * maxHeight;
            domImage.height = maxHeight;
        }

        this.image.parent().css('overflow', '');
        if (BOREDConfig.SHOW_ZOOM_CURSOR) {
            this.image.css('cursor', zin);
        }
        this.expanded = false;
    };

    ImageResizer.prototype.expandImageSize = function () {
        var $img = this.image;

        $img.attr('width', this.origWidth);
        $img.attr('height', this.origHeight);

        if (BOREDConfig.SHOW_ZOOM_CURSOR) {
            $img.css('cursor', zout);
        }
        $img.parent().css('overflow', 'visible');
        this.expanded = true;
    };

    // Image Previewing on upload.
    function imagePreview($imageInput) {
        var fr = new FileReader(),
            readFile = function () {
                var fileArr = $imageInput[0].files;
                if ( fileArr && fileArr.length ) {
                    fr.readAsDataURL(fileArr[0]);
                }
            },
            $clearLink = 
                $('<a href="#" style="margin-left:2em">\u2718 Clear</a>'),
            newImage = function (source) {
                var img = new Image(),
                    $img = $(img);

                img.addEventListener('load', function (e) {
                    this.title = 'Original Dimensions: ' + e.target.width +
                                 'x' + e.target.height;
                    this.alt = 'Image Preview';

                    new ImageResizer($img);

                    $img.addClass('preview');
                    $img.css({
                        display: 'block',
                        margin: '1em 0 1em 5em'
                    });
                    $clearLink.after($img);
                }, false);
               
                img.src = source;
            };
         
        // The clear link.
        $clearLink.click(function () {
            $imageInput.val('');
            $('img.preview').remove();
            return false;
        });
        $imageInput.after($clearLink);
  
        fr.onload = function (e) {
            $('img.preview').remove();
            newImage(e.target.result);
        };

        $imageInput.on('change', readFile);
        readFile();
    }

    function makeCommentImagesExpandable() {
        function bind($img) {
            if (!$img.data('expansionEnabled')) {
                $img.load(function (e) {
                    new ImageResizer($(this), 600, 1000);
                });
                $img.data('expansionEnabled', true);
            }
        }

        function execute() {
            var $commentImages = $('img', 'div[id^="image_comments"]');

            $commentImages.each(function () {
                bind($(this));
            });
        }

        $(document).ajaxComplete(execute);
        execute();
    }

    function CommentImagesToggler() {
        var me = this;
        this.eventsAttached = false;

        function execute() {
            var $ins = $('div.metabar.metabar_redux').first();
            if (!$ins.data('executed')) {
                $ins.css('margin-bottom', 0);
                $ins.after('<form action="#" style="margin-left: 450px;">' + 
                           '<label for="bored-disable-images">No ' +
                           'Images</label><input type="checkbox" ' +
                           'id="bored-disable-images" /></form>');
                $('#bored-disable-images').change(function () {
                    me.toggle($(this).is(':checked'));
                }).prop('checked', BOREDConfig.HIDE_COMMENT_IMAGES);

                $ins.data('executed', true);
            }
        }

        $(document).ajaxComplete(execute);
        execute();

        if (BOREDConfig.HIDE_COMMENT_IMAGES) {
            this.toggle(true);
        }
    }

    CommentImagesToggler.prototype.hideImages = function () {
        var $commentImages = $('img', 'div[id^="image_comments"]');
        $commentImages.each(function () {
            $(this).css('display', 'none');
        });
    };

    CommentImagesToggler.prototype.toggle = function (hide) {       
        if (hide) {
            if (!this.eventsAttached) {
                $(document).on('ajaxComplete', this.hideImages);
            }
            this.eventsAttached = true;
            this.hideImages();
        } else {
            $(document).off('ajaxComplete', this.hideImages);
            this.eventsAttached = false;
            $('img', 'div[id^="image_comments"]').css('display', '');
        }

        BOREDConfig.setOpt('HIDE_COMMENT_IMAGES', hide);
    };

    function doMarkItUp() {
        // TODO: Rewrie this to take advantage of jQuery.

        // data:URIs. This won't be pretty, but it will be fairly efficient
        // bandwidth-wise.
        var handleImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAGAgMAAABROz0wAAAAA3NCSVQICAjb4U/gAAAADFBMVEWwuL/////39/eyub9nsXv9AAAABHRSTlP/AP//07BylAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNy8yMS8wN4dieEgAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAMElEQVQImWNwDBF1DGFgaIwQbYxgYFgaFbo0yoEhlDUglNWBIYw1IQxETc0Mm+oAANc3CrOvsJfnAAAAAElFTkSuQmCC',
            codeImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALtSURBVBgZTcFLaFxVAIDh/5577jwzj0wSUmqMtKIiBltbbJ1FUCxVoQu3FrHGVRU3BVcKrkTcKOhCUOtOAyJ23WIQtFawpoooZWKJpnbsNJN5PzP3PO5xArPo93nOOfasXCgfAz48mE8UhzpiqCN0FLFrog7QA+qABVpAA/gC+FYyERlz/NC+qeIbT85xt4GKckMV5Voju6A09ELLzXqfi38PTgLnJBORMfPZmMeectsSeB7SA19CPBAsxgW+EAQ+PLaQZH8uXTj/S+UDwYTVOitxmAh6yqOjoR1CZwSdETR2Yadv2fPm6i2KB9IszQZzkgkVmvnLZcuP21VeO1rgs+tdAu1YOZxlKiHw8fA9iADPdvn5nxa/3epUBGOH39sqjETu2UJG4oUwDB2RcmRSHuevdtjpWgZhxEBH4KDaDflobbNrlVoRh97demHpgfTth+5J5ZpNw5kjWQxw6mCa7aYlk4bPr7X54XqfkfGIHNjAYpQ6cOH1x9fEw/cnP13M+Ik7bc3ZYxniMR9PQCElObmYptox7E97XK0MscbhHJgwxKrQMiZ+v9Y9u3knHBUCn08ut6m2DQJHe6C5WOqQl4KbVcXR2QSxwENbS38wNEapLmNi4/0Hv/r3zxvHN0p1YnGP1e/r4ODr9TbZlKBTU7xSnKG4lCUZQKMfYkJVvfT2c44xyVjKr6lpEUI3g3UOPIE1lu6O5aUTcyRjPjhISUGttYtVYYUJuXxudRZ4p/jIvZx+eoHvSopmz/Ly8jyJwBFIkD7EfMimYLM8xChVZUJapU4Ap34tbdHalfRDh7aOUHsoE2FsROQchVyOV5/Zx3ZjiFWqxoS0Wh95/qlHk2+9+AR3sw60dSgDOPj4UoVUAL3+EKt1gwlptd7arnf4cq1EfipJPpsgn46TS8fJpGLEY4K4FJxenicuodbsYbX+jwkZGfPNlfWNhSvrG/cBM8AMMA1MA7lELAgSiYBsOkk+m+KPv8o3gJ+Y+B9yFXCQeyJWrQAAAABJRU5ErkJggg==',
            boldImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADCSURBVCjPY/jPgB8yUEtBeUL5+ZL/Be+z61PXJ7yPnB8sgGFCcX3m/6z9IFbE/JD/XucxFOTWp/5PBivwr/f77/gfQ0F6ffz/aKACXwG3+27/LeZjKEioj/wffN+n3vW8y3+z/Vh8EVEf/N8LLGEy3+K/2nl5ATQF/vW+/x3BCrQF1P7r/hcvQFPgVg+0GWq0zH/N/wL1aAps6x3+64M9J12g8p//PZcCigKbBJP1uvvV9sv3S/YL7+ft51SgelzghgBKWvx6E5D1XwAAAABJRU5ErkJggg==',
            italicImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVCjPY/jPgB8yUFtBdkPqh4T/kR+CD+A0Ie5B5P/ABJwmxBiE//f/gMeKkAlB/90W4FHg88Dzv20ATgVeBq7/bT7g8YXjBJf/RgvwKLB4YPFfKwCnAjMH0/8a/3EGlEmD7gG1A/IHJDfQOC4wIQALYP87Y6unEgAAAABJRU5ErkJggg==',
            linkImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVCjPY/jPgB8y0EmBHXdWaeu7ef9rHuaY50jU3J33v/VdVqkdN1SBEZtP18T/L/7f/X/wf+O96kM3f9z9f+T/xP8+XUZsYAWGfsUfrr6L2Ob9J/X/pP+V/1P/e/+J2LbiYfEHQz+ICV1N3yen+3PZf977/9z/Q//X/rf/7M81Ob3pu1EXWIFuZvr7aSVBOx1/uf0PBEK3/46/gnZOK0l/r5sJVqCp6Xu99/2qt+v+T/9f+L8CSK77v+pt73vf65qaYAVqzPYGXvdTvmR/z/4ZHhfunP0p+3vKF6/79gZqzPQLSYoUAABKPQ+kpVV/igAAAABJRU5ErkJggg==',
            pictureImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHwSURBVDjLpZM9a1RBFIafM/fevfcmC7uQjWEjUZKAYBHEVEb/gIWFjVVSWEj6gI0/wt8gprPQykIsTP5BQLAIhBVBzRf52Gw22bk7c8YiZslugggZppuZ55z3nfdICIHrrBhg+ePaa1WZPyk0s+6KWwM1khiyhDcvns4uxQAaZOHJo4nRLMtEJPpnxY6Cd10+fNl4DpwBTqymaZrJ8uoBHfZoyTqTYzvkSRMXlP2jnG8bFYbCXWJGePlsEq8iPQmFA2MijEBhtpis7ZCWftC0LZx3xGnK1ESd741hqqUaqgMeAChgjGDDLqXkgMPTJtZ3KJzDhTZpmtK2OSO5IRB6xvQDRAhOsb5Lx1lOu5ZCHV4B6RLUExvh4s+ZntHhDJAxSqs9TCDBqsc6j0iJdqtMuTROFBkIcllCCGcSytFNfm1tU8k2GRo2pOI43h9ie6tOvTJFbORyDsJFQHKD8fw+P9dWqJZ/I96TdEa5Nb1AOavjVfti0dfB+t4iXhWvyh27y9zEbRRobG7z6fgVeqSoKvB5oIMQEODx7FLvIJo55KS9R7b5ldrDReajpC+Z5z7GAHJFXn1exedVbG36ijwOmJgl0kS7lXtjD0DkLyqc70uPnSuIIwk9QCmWd+9XGnOFDzP/M5xxBInhLYBcd5z/AAZv2pOvFcS/AAAAAElFTkSuQmCC',
            strokeImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfSURBVCjPY/jPgB8yUFNBiWDBzOy01PKEmZG7sSrIe5dVDqIjygP/Y1GQm5b2P7kDwvbAZkK6S8L/6P8hM32N/zPYu2C1InJ36P/A/x7/bc+YoSooLy3/D4Px/23+SyC5G8kEf0EIbZSmfdfov9wZDCvc0uzLYWyZ/2J3MRTYppn/14eaIvKOvxxDgUma7ju1M/LlkmnC5bwdNIoL7BAAWzr8P9A5d4gAAAAASUVORK5CYII=',
            subscriptImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERkYyQjI1ODA4RDNFMTExQTVBRjgxRDBDNDA3RkJBRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NTcyMEQ1RkQzNEMxMUUxOTA2Q0FEQ0FBQTZGRjZEQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NTcyMEQ1RUQzNEMxMUUxOTA2Q0FEQ0FBQTZGRjZEQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFCNjY1QTM0NEFEM0UxMTFBNkYxRURGM0E4QUREQTEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRGRjJCMjU4MDhEM0UxMTFBNUFGODFEMEM0MDdGQkFFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HVL3WgAAAMxJREFUKM9j+M+AHzIMGQVLHJZdWPx/xv+WgGyHoP82D4wdMEyYoTD5Q9v/AoXgCeYXDASwWlHfUPA/7ILFBX0BHG5IEwj9YPVf3wCnI70czP/r/1dfAOOvUKoQRFJgaWD8QNdB7YH8fykFEH9b6IwzgWfgCowM9B5oAg2XLZD4L3IAJNJ9N9ZF6520MViBXoLWB9UL8kCdYguE/gv855/gb2z2Tt1Y4h3UBA0DZQdZBwmg6wUd+B34gFBLUO6dyCr+cjwhKezClwZhAQCz7O+bUgO2KAAAAABJRU5ErkJggg==',
            superscriptImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERkYyQjI1ODA4RDNFMTExQTVBRjgxRDBDNDA3RkJBRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MzYyMzhEQkQzNEMxMUUxQkQyRkMzMTJFQzY1M0MwMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MzYyMzhEQUQzNEMxMUUxQkQyRkMzMTJFQzY1M0MwMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVCNDlCN0Q4MEJEM0UxMTFBNUFGODFEMEM0MDdGQkFFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRGRjJCMjU4MDhEM0UxMTFBNUFGODFEMEM0MDdGQkFFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GdwPmAAAAMxJREFUKM9j+M+AHzKQqWD1u3n/U9P0/yuX41DQaJz4Ti9NuhyPFdrvJM/gdYPUKoE0uIIlDssuLP4/439LQLZD0H+bB8YOioLCZ1AcOUNh8oe2/wUKwRPMLxgIaM6UeidgjOaL+oaC/2EXLC7oC+DwZppA6Aer//oGOMPBy8H8v/5/9QU4FFgaGD/QdVB7IP9fSgGLAiMDvQeaQMNlCyT+ixzAUKCXoPVB9YI8UKfYAqH/Av/5J6Ap0DBQdpB1kAC6XtCB34EPCEmKTQCZjPE4N8a4DgAAAABJRU5ErkJggg==',
            insertImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ODQ5QjdEODBCRDNFMTExQTVBRjgxRDBDNDA3RkJBRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERDFFOThDM0QzNEIxMUUxQjgxNkMyNTE3NDU5NkE1QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERDFFOThDMkQzNEIxMUUxQjgxNkMyNTE3NDU5NkE1QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFBNjY1QTM0NEFEM0UxMTFBNkYxRURGM0E4QUREQTEwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU4NDlCN0Q4MEJEM0UxMTFBNUFGODFEMEM0MDdGQkFFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iqTydQAAATFJREFUeNrMUz1qhGAQHUN6sREvEdjcQDvLHGHrNEntKdKlzQGsbfUIGmyVBQvx/xf8RTMjCEEXdrNJkQFR5pv3vvdmRmaeZ/hNMP+LQNM0EV9i3/dQ1zXkeQ5ZlhlJkpyCIDj6vg9VVcE4jh+WZZ3OKlBV9a3ruhcqTNNUUhTFoLwkSWJZljqePdq2ba71d1tJeGuOt0IURbCCKXRdN9q2he9givstAclsmgZQ9s4vEWxjR+B5HqBUCMPwNgLXdRcC9LorHobhMkEcx0shTWIb2H1rm9s1Ef2b1AN6BEE4rHmO4w7TNOUXCdCnSV5JASoR1zyCX3HkxlWbyPP8Ey0Lglg8X2WbRVEcf7TKLMsuFhBoXrXKDMN8yrL8QN+O4yxjQyVwZleeEff+Jz/TlwADADkE3v7LFnqxAAAAAElFTkSuQmCC',
            draftImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUJEQUVDQkUzMzdGMTFFMkI0MEREODc1RkU2Q0IyNUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUJEQUVDQkQzMzdGMTFFMkI0MEREODc1RkU2Q0IyNUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDpDMTYxRTVFOTdFMzNFMjExODcxRTk4MDIxODdGOEIzNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMTYxRTVFOTdFMzNFMjExODcxRTk4MDIxODdGOEIzNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrJskssAAAGYUExURQQEBPv7+wsLCwwMDAMDA+zs7A0NDQUFBQYGBra2tikpKRQUFPyxG6qqqiMjI2RkZPDw8FxcXCoqKhoaGpqamqyikd3d3aOjo6ioqDEmE8XFxcbGxunp6aurq9bW1kNDQ0dHR+jo6CYmJv77/v3z/fb29v/9//y3PvnKXdDQ0OWeGfbS+f7dnF1aVjs0KP75/v31/hIPDP7Vfvy2O/nHKFtbW/729ayJMXR0dK1fEeDa4f7LKfn5+bSysP7HJKmpqf2/IBsbG8pvFPnBIjo6OhgQCAoKCgcHB3RBDtbSz9LS0hUMA/XJ+BERERgYGP3EI/28HyshEfSsK9nZ2f///z4+PvPz8/arG8xyFFBAIv22Hc7Ozvy1Nr29vWs9D8nJyf3w2P24K8e/szk5OWdaRfbfs/vIQJOTk/Hx8f/36emhMvXI+KSkpOHh4e7W7n19fe67I9/f3/KrI/nn7fPD9/fW+fbt3gEBAQYDAbq6ut7e3tra2urS7MB5FWpqakMkB9bV1Jubmw4ODr15GyAgIP3FIwAAAP///42JeAQAAACIdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAYt9YPAAAA10lEQVQYGQXBA2IDAQBFwb8bO6lt225T27Zt29h37c4IAAAAQJD//DJzFgagYBaR5ntwB2PmDuahqvQO4bAsyy67O3Ol4Xz0JE8YY987cYkh30DFfsvrba4I23qjBjwtXf5t3VQihs2sJAP26jqvNwFRbIukG5S1TpbsAogNW33AqOlYnk4OAgiPGQkUTfhX4/tjAcSpWd7Y46+9D7m8AOKr7+dtofDI06V3ANG+3r14vN00rt8MADH00Tw45ZTLmwqA+KweeZQz58IBAKItIWXtKvsQAOAfF8xWDojKVBgAAAAASUVORK5CYII=',
            spoilerImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzU4QkIwMjIxRTk5MTFFM0FEQURFNTYwQzczQjRCMUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzU4QkIwMjMxRTk5MTFFM0FEQURFNTYwQzczQjRCMUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNThCQjAyMDFFOTkxMUUzQURBREU1NjBDNzNCNEIxQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNThCQjAyMTFFOTkxMUUzQURBREU1NjBDNzNCNEIxQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtNXkLoAAAKVSURBVHjafJJJTBNhFMf/3zcznbZDS6dDZQsQaCWyNopRIxwkYUk4SThVTyZePRgvHjzI1bMHYgx6wANGMcQYY+IBxRhlE/TAElIhImXp3jLtTGfmc2KiiTH6u73De/8lj7DhB3DwuHYBJRNjs8iorGiCI8TnsgghYISjqlrSdEP2uiBwFDkNrVVwCaiQzK76vG7mO2rSjRXxvRxLF4jIQzPcTkU+5gdl0A3ePsYCHqIZyBTQUulurqahWljE3Ph+8HBGXj+06uWtflfliqEkHCA6tVVsURgW8hoXkLUyzLyaHn86dlheqL45XDzZSC+eSrZJyt0RSyi3zVMtpxkpFX43vG5TZ5PPniw74y2R3hfLb+OHu77rQ9kO6dPyIoBMuxPgec7j1Gc38ynVOxQ2C0cJog4MDncET4iCsDS1MFBWlZRSVy5FLLsSFw9mUN4juh2c+PxLcXad97kHenoV2X+k5sNNbVKw2tz+msybJu+lPKUmA0+oYcd1cHYbBmEUrKP1bE25YnHc+7WdjZ192lC5MPd5/PE07IoVCZTSdLoQj+W0wVZ3dxAlujO/sLm67hFdt0dvTU1OkHBDAJone2BncPUfT9m1lpeJdgAxXMv7JSR1MLo2s1jV0hjqrGuvaUasEOkbQVFDNCk0+eVHlwmLTFjfUkc9QU/kNPaycIjp3RgLyXJnCDEdsQOUGFQDTobeJluHh2npxZIV8Nj+7Bkl3VdVjZyF9YQ1v5WIZ+S+Zr7WiwYffsIXonGjOygFKxDLwCngSIdPgMilppboubrA1S78Ccnem5OCCj1fj3dbEAT4RHOvtP9yVblxRqzz4W/Yx132mzfbxuvo/ugd9m9g3l9i9mP+wvrwzVyJ/mfhhwADAOgCYxyY1qX7AAAAAElFTkSuQmCC',
            blockQuoteImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REQ4MzNGRTcxRTkzMTFFM0JBMzU5NDkzNThFQTE1MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REQ4MzNGRTgxRTkzMTFFM0JBMzU5NDkzNThFQTE1MjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERDgzM0ZFNTFFOTMxMUUzQkEzNTk0OTM1OEVBMTUyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERDgzM0ZFNjFFOTMxMUUzQkEzNTk0OTM1OEVBMTUyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtUhxusAAAEfSURBVHjaYvz//z8DJYCJgUIw8AawwBgzZ84MZWFhWXX//n2GM2fO7Llw4UL6ixcv7oHkZsyYEcrKyjrz4cOHgufPn99z7ty59KdPn4LlGEGBmJSUpCQkJHT3x48fDDdv3mS4cuUKA1DzWaCcSVZWliAXF9e7X79+Mdy+fZvh+vXrDECD7gHllME2gwyQkpIyBtoOig50bAyUE+Tk5MQmFwqOQRABjcoOqMRdKAaxXaBy5VD+OyA+A2WnoRiAjIFgFcwFWORmIsthaLawsBCE2nQXm+HAwLyLLMeCHi0cHBwg54IMcUWX8/X1Lf/9+7cSkBkGF4SZ5OnpKaitrT0TarsLus3GxsYzkQMP7iU0v4Ftx+HvDmxyjEM/MwEEGABhvfzSErwk1AAAAABJRU5ErkJggg==',
            header = document.getElementsByTagName('head')[0],
            cssInlineDom = document.createElement('style'),
            id = (
                location.pathname.match(
                    /^\/(?:images\/)?(\d+)$/
                ) || location.pathname.match(
                    /^\/messages\/([\da-f]+)$/
                )
            ),
            markItUp;

        if (id) {
            id = id[1];
        }

        // Execute markItUp! once it's loaded.
        function doMarkItUpInit() {
            var settings = {
                nameSpace: 'bored',
                resizeHandle: true,
                onShiftEnter: {
                    keepDefault: false,
                    replaceWith: '\n\n'
                },
                markupSet: [
                   {name:'Bold', key:'B', closeWith:'(!(*|!|*])!)',
                    openWith:'(!(*|!|[*)!)', multiline: true}, 
                   {name:'Italic', key:'I', closeWith:'(!(_|!|_])!)',
                    openWith:'(!(_|!|[_)!)', multiline: true},
                   {name:'Strike-through', key:'S', closeWith:'(!(-|!|-])!)',
                    openWith:'(!(-|!|[-)!)', multiline: true},
                   {name:'Underline', key:'U', closeWith:'(!(+|!|+])!)',
                    openWith:'(!(+|!|[+)!)', multiline: true},
                   {separator:'---------------'},
                   {name:'Picture', replaceWith:'![![Source:!:http://]!]' +
                                                '([![Alternative text]!])!'},
                   {name:'Link', openWith:'"',
                    closeWith:'([![Title]!])":' +'[![Link:!:http://]!]',
                    placeHolder:'Your text to link here...',
                    multiline: true },
                   {separator:'---------------'},
                   {name:'Superscript', closeWith:'(!(^]|!|^)!)',
                    openWith:'(!([^|!|^)!)', multiline: true},
                   {name:'Subscript', closeWith:'(!(~]|!|~)!)',
                    openWith:'(!([~|!|~)!)', multiline:true},
                   {name:'Code', openWith:'@', closeWith:'@', multiline: true},
                   {separator:'---------------'},
                   {name:'Block Quote', openWith:'[bq="[![Citation]!])"]',
                    placeHolder:'Paste your quotation here....',
                    closeWith:'[/bq]'},
                   {name:'Spoiler', openWith:'[spoiler]',
                    closeWith:'[/spoiler]', placeHolder:'Spike dies.'},
                   {separator:'---------------'},
                   {name:'Save Draft', call:'options.saveDraft',
                    className: 'draftButton'}
                ]
            };
            
            function markCommentBodyUp() {
                $('textarea:not([id $= "tag_list"])').each(function () {
                    var $this = $(this),
                        stsr,
                        el;

                    if (!$this.data('wysiwiymEnabled')) {
                        if (this.id === 'comment_body' || this.id === 'body') {
                            el = this;

                            settings.saveDraft = function () {
                                saveDraft(id, el);
                            };
                        }
                        $this.markItUp(settings);
                        $this.data('wysiwiymEnabled', true);
                    }
                });
            }

            // AJAX binding.
            markCommentBodyUp();
            $(document).ajaxComplete(markCommentBodyUp);
        }

        if (document.getElementsByTagName('textarea').length) {
            // MarkItUp! JS
            markItUp = document.createElement('script');
            markItUp.setAttribute('src', 'https://s3.amazonaws.com/Linkable' +
                                         'Libraries/jquery.markitup.js');
            header.appendChild(markItUp);
            markItUp.addEventListener('load', function () {
                doMarkItUpInit();
            }, false);

            // MarkItUp! CSS
            cssInlineDom.setAttribute('type', 'text/css');
            cssInlineDom.textContent = 
                '.markItUp * {' +
                '    margin: 0px; padding:0px;' +
                '    outline: none;' +
                '}' +
                '.markItUp a:link,' +
                '.markItUp a:visited {' +
                '    color: #000;' +
                '    text-decoration: none;' +
                '}' +
                '.markItUp {' +
                '    width: 700px;' +
                '    margin: 5px 0 5px 180px;' +
                '    border: 5px solid #F5F5F5;    ' +
                '}' +
                '.markItUpContainer {' +
                '    border: 1px solid #3C769D;    ' +
                '    background: #FFF;'+
                '    padding: 5px 5px 2px 5px;' +
                '    font: 11px Verdana, Arial, Helvetica, sans-serif;' +
                '}' +
                '#new_post .markItUp {' +
                '    margin-left: 200px;' +
                '}' +
                '.markItUpEditor {' +
                '    font: 12px "Courier New", Courier, monospace;' +
                '    padding: 5px 5px 5px 5px;' +
                '    border: 3px solid #3C769D;' +
                '    width: 670px !important;' +
                '    height: 320px;' +
                '    clear: both;' +
                '    line-height: 18px;' +
                '    overflow: auto;' +
                '}' +
                '.markItUpPreviewFrame {' +
                '    overflow: auto;' +
                '    background-color: #FFFFFF;' +
                '    border: 1px solid #3C769D;' +
                '    width: 99.9%;' +
                '    height: 300px;' +
                '    margin: 5px 0;' +
                '}' +
                '.markItUpFooter {' +
                '    width: 100%;' +
                '    cursor: n-resize;' +
                '}' +
                '.markItUpResizeHandle {' +
                '    overflow: hidden;' +
                '    width: 22px; height:5px;' +
                '    margin-left: auto;' +
                '    margin-right: auto;' +
                '    background-image: url(' + handleImg + ');' +
                '    cursor: n-resize;' +
                '}' +
                '/* first row of buttons */' +
                '.markItUpHeader ul li {' +
                '    list-style: none;' +
                '    float: left;' +
                '    position: relative;' +
                '}' +
                '.markItUpHeader ul li ul {' +
                '    display: none;' +
                '}' +
                '.markItUpHeader ul li:hover > ul {' +
                '    display: block;' +
                '}' +
                '.markItUpHeader ul .markItUpDropMenu li {' +
                '    margin-right: 0px;' +
                '}' +
                '.markItUpHeader ul .markItUpSeparator {' +
                '    margin: 0 10px;' +
                '    width: 1px;' +
                '    height: 16px;' +
                '    overflow: hidden;' +
                '    background-color: #CCC;' +
                '}' +
                '.markItUpHeader ul ul .markItUpSeparator {' +
                '    width: auto; height:1px;' +
                '    margin: 0px;' +
                '}' +
                '/* next rows of buttons */' +
                '.markItUpHeader ul ul {' +
                '    display: none;' +
                '    position: absolute;' +
                '    top: 18px; left:0px;    ' +
                '    background: #F5F5F5;' +
                '    border: 1px solid #3C769D;' +
                '    height: inherit;' +
                '}' +
                '.markItUpHeader ul ul li {' +
                '    float: none;' +
                '    border-bottom: 1px solid #3C769D;' +
                '}' +
                '/* next rows of buttons */' +
                '.markItUpHeader ul ul ul {' +
                '    position: absolute;' +
                '    top: -1px; left:150px;' +
                '}' +
                '.markItUpHeader ul ul ul li {' +
                '    float: none;' +
                '}' +
                '.markItUpHeader ul a {' +
                '    display: block;' +
                '    width: 16px; height:16px;' +
                '    text-indent: -10000px;' +
                '    background-repeat: no-repeat;' +
                '    padding: 3px;' +
                '    margin: 0px;' +
                '}' +
                '.markItUpHeader ul ul a {' +
                '    display: block;' +
                '    padding-left: 0px;' +
                '    text-indent: 0;' +
                '    width: 120px;' +
                '    padding: 5px 5px 5px 25px;' +
                '    background-position: 2px 50%;' +
                '}' +
                '.markItUpHeader ul ul a:hover {' +
                '    color: #FFF;' +
                '    background-color: #3C769D;' +
                '}' +
                '.bored .markItUpButton1 a {' +
                '    background-image: url(' + boldImg + ');' +
                '}' +
                '.bored .markItUpButton2 a {' +
                '    background-image: url(' + italicImg + ');' +
                '}' +
                '.bored .markItUpButton3 a {' +
                '    background-image: url(' + strokeImg + ');' +
                '}' +
                '.bored .markItUpButton4 a {' +
                '    background-image: url(' + insertImg + ');' +
                '}' +
                '.bored .markItUpButton5 a {' +
                '    background-image: url(' + pictureImg + ');' +
                '}' +
                '.bored .markItUpButton6 a {' +
                '    background-image: url(' + linkImg + ');' +
                '}' +
                '.bored .markItUpButton7 a {' +
                '    background-image: url(' + superscriptImg + ');' +
                '}' +
                '.bored .markItUpButton8 a {' +
                '    background-image: url(' + subscriptImg + ');' +
                '}' +
                '.bored .markItUpButton9 a {' +
                '    background-image: url(' + codeImg + ');' +
                '}' +
                '.bored .markItUpButton10 a {' +
                '    background-image: url(' + blockQuoteImg + ');' +
                '}' +
                '.bored .markItUpButton11 a {' +
                '    background-image: url(' + spoilerImg + ');' +
                '}' +
                '.bored .draftButton a {' +
                '   background-image:url(' + draftImg + ');' +
                '}';

            header.appendChild(cssInlineDom);
        }
    }

    // Random Image Button. (It's fun!)
    function doRandomImage() {
        var $imageList = $('#imagelist_container'),
            apiUrl,
            extractNumber = true;
        
        function makeLink(url, takeFromJson) {
            var biggestNum,
                imgNum,
                maxIndex;

            $.get(url, function(data) {
                if (takeFromJson) {
                    maxIndex = data.images.length - 1;
                    imgNum = data.images[Math.floor(Math.random() * maxIndex)]
                             .id_number;
                } else {
                    biggestNum = data.images[0].id_number;
                    imgNum = Math.floor(Math.random() * biggestNum);
                }
                $('.searchbox').before(
                    '<div class="metasection">' + 
                    '    <a href="/images/' + imgNum +
                         '" title="FUN!" style="background-color: pink">' +
                    '        Random Img.' +
                    '    </a>' +
                    '</div>'
                );
            });
        }

        if ($imageList.find('.metasection').first().text()
                             .indexOf('Top Commented') !== -1) {
            apiUrl = '/lists/top_commented.json';
        } else if ($imageList.find('.metasection').first().text()
                             .indexOf('All Time Top Scoring') !== -1) {
            apiUrl = '/lists/all_time_top_scoring.json';
        } else if ($imageList.find('.metasection').first().text()
                             .indexOf('Top Scoring') !== -1) {
            apiUrl = '/lists/top_scoring.json';
        } else {
            apiUrl = '/images.json';
            extractNumber = false;
        }
        
        apiUrl +=
            '?nocomments=1&nofav=1' + ((extractNumber) ? '' : '&perpage=1');
        makeLink(apiUrl, extractNumber);
    }
    
    function hideImagePreview() {
        var $imageShowContainer = $('div.image_show_container');
        $imageShowContainer.css('display', 'none').after(
            '<div id="image-warning" data-image-hidden="spoiler">' +
            '<strong><a href="#" id="show-img">' +
            'Image spoilered by B.O.R.E.D. - click ' +
            'to show the image anyway</a></strong>' +
            '<p>This image is hidden by B.O.R.E.D. To un-spoiler, ' +
            'remove your downvote or hiding selection, or disable ' +
            'auto-hiding. Alternatively, click the link above to ' +
            'reveal the image just this once.</p></div>'
        );
        $('#show-img').click(function () {
            $('div.image_show_container').css('display', '');
            $(this).closest('div.image-warning').remove();
               return false;
        });
    }

    function doImageAutoHide() {
        // Distinguish image lists.
        var $imageList = $('#imagelist_container');

        $(document).ajaxComplete(function () {
            if ($imageList.length) {
                hideThumb($('.voted_down').closest('.image').find('.thumb'));
            } else if ($('#content .voted_down').length &&
                       !$('#image-warning').length) {
                hideImagePreview();
            }
        });
    }

    function hideThumbElement($thumb) {
        if (!$thumb.hasClass('spoilered')) {
            $thumb.css('background', '#ccc').addClass('spoilered');
            $thumb.children('a').css({
                color: 'white',
                'font-size': '50px',
                'font-weight': 'bold'
            }).children('img').css('display', 'none').before(
                '<span>\u2205</span>'
            );
        }
    }

    function reshowThumbElement($thumb) {
        $thumb.removeAttr('style').removeClass('spoilered');
        $thumb.children('a').removeAttr('style')
                        .children('img').removeAttr('style')
                        .prev('span').remove();
    }

    function hideThumb($thumb) {
        var spoilerType = getSpoilerType();

        hideThumbElement($thumb);

        if (spoilerType === 'click') {
            $thumb.each(function () {
                var $thumbEl = $(this);
                $thumbEl.children('a').click(function (e) {
                    if (e.which === 1 &&
                            $thumbEl.hasClass('spoilered')) {
                        reshowThumbElement($thumbEl);
                      return false;
                    }
                    return true;
                }).mouseleave(function () {
                    if (!$thumbEl.hasClass('spoilered')) {
                        hideThumbElement($thumbEl);
                    }
                });
            });
        } else if (spoilerType === 'hover') {
            $thumb.each(function () {
                var $thumbEl = $(this);
                $thumbEl.children('a').hover(function () {
                    reshowThumbElement($thumbEl);
                }, function () {
                    if (!$thumbEl.hasClass('spoilered')) {
                        hideThumbElement($thumbEl);
                    }
                });
            });
        }
    }

    function doHiderLinks() {
        var inImageList = $('#imagelist_container').length,
            hiddenImages = (localStorage.hiddenImages || '').split(','),
            $div,
            $dataIdThingee;

        // Hide all images stored in hiddenImages array.
        if (inImageList) {
           $('div.image[data-image-id]').each(function () {
               var $div = $(this),
                   imageId = $div.attr('data-image-id');
               if (hiddenImages.indexOf(imageId) !== -1) {
                   hideThumb($div.find('.thumb'));
                   $div.find('.vote_down_link,.voted_down').after(
                       '\u2022 <a href="#" class="unhide-img-link">Hidden</a>'
                   );
               } else {
               	   $div.find('.vote_down_link,.voted_down').after(
                       '\u2022 <a href="#" class="hide-img-link">Hide</a>'
                   );
               }
           });
        } else {
            $div = $('#image_target');
            $dataIdThingee = $('[data-image-id]');
            if (!!$div.length && !!$dataIdThingee.length &&
                    hiddenImages.indexOf(
                    $dataIdThingee.attr('data-image-id')) !== -1) {
                hideImagePreview();
                $('div[id^="image_meta"]').find(
                    'a.vote_down_link'
                ).after(
                    '\n<a href="#" class="unhide-img-link">Hidden</a>'
                );
            } else {
                $('div[id^="image_meta"]').find(
                    'a.vote_down_link'
                ).after(
                    '\n<a href="#" class="hide-img-link">Hide</a>'
                );
            }
        }

        $(document).on('click', 'a.hide-img-link', function () {
            // Image hiding.
            // Store the image ID.
            var $btn = $(this),
                idNumber;
            if (inImageList) {
                idNumber = $btn.closest('div[data-image-id]')
                               .attr('data-image-id');
            } else {
                idNumber = $('#content [data-image-id]').attr('data-image-id');
            }
            hiddenImages.push(idNumber);
            localStorage.hiddenImages = hiddenImages;
            if (inImageList) {
                hideThumb($btn.closest('.image').find('.thumb'));
            } else if (!$('#image-warning').length) {
                hideImagePreview();
            }

            $btn.removeClass('hide-img-link').addClass('unhide-img-link')
                .text('Hidden');

            return false;
        }).on('click', 'a.unhide-img-link', function () {
            // Image unhiding.
            var $btn = $(this),
                idNumber = $btn.closest('[data-image-id]')
                               .attr('data-image-id');

            // Remove image number from hiddenImages array.
            hiddenImages.splice(
            	hiddenImages.indexOf(idNumber), 1
            );
            localStorage.hiddenImages = hiddenImages;

            // Display the image.
            if (inImageList) {
                reshowThumbElement($btn.closest('.image').find('.thumb'));
            } else {
                $('div.image_show_container').removeAttr('style');
                $('#image-warning').remove();
            }

            $btn.removeClass('unhide-img-link').addClass('hide-img-link')
                .text('Hide');

            return false;
        });
    }
   
    // Execution.
    BOREDConfig.loadSettings();
    
    if (BOREDConfig.SPOILER_SELECTED_IMAGES) {
        doHiderLinks();
    }

    if (BOREDConfig.SPOILER_ALL_DOWNVOTED) {
        doImageAutoHide();
    }

    BOREDConfig.makePanel();

    if (BOREDConfig.SHOW_ZOOM_CURSOR) {
        zoomCursors();
    }
  
    if (BOREDConfig.MOVE_WATCHED_LINK) {
        moveWatched();
    }

    if (BOREDConfig.SHOW_REVERSE_SEARCH_LINKS && $('#image_target').length) {
        relImages();
        $(document).ajaxComplete(relImages);
    }
    
    if (BOREDConfig.SAVE_DRAFTS) {
        manageDrafts();
    }

    if (BOREDConfig.ENABLE_FILE_UPLOAD_PREVIEW) {
        $imageInput = $('#image_image');
        if ($imageInput.length) {
            imagePreview($imageInput);
        }
    }

    if ($('textarea').length || $('#comments').length) {
        if ($('#comments').length) {
            new CommentImagesToggler();

            if (!BOREDConfig.HIDE_COMMENT_IMAGES &&
                BOREDConfig.AUTO_EXPAND_COMMENT_IMAGES) {
                makeCommentImagesExpandable();
            }
        }
        if (BOREDConfig.ENABLE_MARKITUP) {
            doMarkItUp();
        }
    }
    
    if (BOREDConfig.ENABLE_RANDOM_BUTTON) {
        doRandomImage();
    }

    // Honestly, this is a bit insulting to the site, but I figured it'd be
    // fun to do and actually looks good with the format. Only the link is
    // changed. I should add the sidebar thing later.
    if (BOREDConfig.NOSTALGIA_MODE) {
        $('#header > a:first-child').text('Ponibooru')
            .css({
                fontWeight: 'bold',
                color: '#006FFA'
            }).hover(function () {
                $(this).css('color', '#33CFFF');
            }, function () {
                $(this).css('color', '#006FFA');
            });
    }
}

// if __name__ == '__main__':
(function () {
    'use strict';

    var script = document.createElement('script');

    script.textContent = '(' + BOREDInit.toString() + ')();';
    document.getElementsByTagName('head')[0].appendChild(script);
}());