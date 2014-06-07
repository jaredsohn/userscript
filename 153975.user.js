// ==UserScript==
// @name         Extra Bitcointip Support on Reddit
// @description  Add a tipping button (/u/bitcointip) and shrinks verifications
// @version      2.1.0
// @license      Public Domain
// @include      http*://*.reddit.com/*
// @exclude      http*://*.reddit.com/user/bitcointip
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

/* ## ChangeLog
 * * 2.1.0
 *   * Merge in changes/fixes from RES
 *   * Subreddit-enabled icon off by default
 * * 2.0.2
 *   * Support for new +/u/bitcointip keyword
 *   * Small fixes
 * * 2.0.0
 *   * Refactor the entire script for RES
 * * 1.5.2
 *   * Bug fix
 * * 1.5.1
 *   * Bug fixes
 *   * Tweaked the preferences page styling
 * * 1.5.0
 *   * Added a preferences page
 *   * Tip button does both public and private tipping
 *   * Switch to HTTPS for API
 * * 1.4.5
 *   * Fix currency display precision
 * * 1.4.4
 *   * Fix cancelled icon bug
 *   * Update to latest tip regexp
 * * 1.4.3
 *   * Fix subreddit case-sensitivity bug
 *   * Adjusted "pending" icon color
 * * 1.4.2
 *   * Bug fixes with balances
 * * 1.4.0
 *   * Subreddit support indicator
 *   * Current balance display
 *   * New icons for richer status indicators
 *   * Support for reddit https (https everywhere).
 * * 1.3.5
 *   * Drop JSONP for CORS to increase safety.
 *   * Attempt to link to source tip from tipped icons.
 * * 1.3.4
 *   * Inject the bot status into r/bitcointip's sidebar
 * * 1.3.3
 *   * Fix API URL.
 *   * Finer tip rejection control
 *   * Small bug fixes
 * * 1.3.1
 *   * A tip button on posts
 *   * Verification icons on posts
 *   * Small display tweaks
 * * 1.3.0
 *   * New verification and rejection markings
 *   * Use the new gettipped API
 *   * All new jQuery reddit plugin
 * * 1.2.1
 *   * More efficient validation marking
 *   * Fixed status names
 *   * Run on all of reddit, including user pages
 * * 1.2
 *   * Use the new bitcointip API to get status information
 *   * https://github.com/NerdfighterSean/bitcointip/blob/master/src/api/
 * * 1.1.4
 *   * Don't hide verification when it has children
 *   * Don't hide verification when it's the URL target
 * * 1.1.3
 *   * Fix case insensitivity in regex
 * * 1.1.2
 *   * Display tipping amount
 * * 1.1.1
 *   * Support the full tipping syntax
 * * 1.1
 *   * Hide verification posts, inlining the verification
 * * 1.0
 *   * Add a "tip bitcoins" button.
 */

var RESUtils = {
    currentSubreddit: function() {
        var match = location.pathname.match(/\/r\/([^/]+)/);
        if (match) {
            return match[1].toLowerCase();
        } else {
            return null;
        }
    },
    loggedInUser: function() {
        var user = $('#header-bottom-right span.user a:first').text();
        return user === "login or register" ? null : user;
    },
    isMatchURL: function() {
        return true;
    },
    addCSS: function(css) {
        $(document.body).append($('<style/>').text(css));
    },
    /*
    Iterate through an array in chunks, executing a callback on each element.
    Each chunk is handled asynchronously from the others with a delay betwen each batch.
    If the provided callback returns false iteration will be halted.
    */
    forEachChunked: function(array, chunkSize, delay, call) {
        if (array == null) return;
        if (chunkSize == null || chunkSize < 1) return;
        if (delay == null || delay < 0) return;
        if (call == null) return;
        var counter = 0;
        var length = array.length;
        function doChunk() {
            for (var end = Math.min(array.length, counter+chunkSize); counter < end; counter++) {
                var ret = call(array[counter], counter, array);
                if (ret === false) return;
            }
            if (counter < array.length) {
                window.setTimeout(doChunk, delay);
            }
        }
        window.setTimeout(doChunk, delay);
    },
    notification: function(msg) {
        alert(msg.message);
    },
    commentsRegex: /https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*comments\/[-\w\.\/]*/i,
    friendsCommentsRegex: /https?:\/\/([a-z]+).reddit.com\/r\/friends\/*comments\/?/i,
    inboxRegex: /https?:\/\/([a-z]+).reddit.com\/message\/[-\w\.\/]*/i,
    profileRegex: /https?:\/\/([a-z]+).reddit.com\/user\/[-\w\.#=]*\/?(comments)?\/?(\?([a-z]+=[a-zA-Z0-9_%]*&?)*)?$/i, // fix to regex contributed by s_quark
    submitRegex: /https?:\/\/([a-z]+).reddit.com\/([-\w\.\/]*\/)?submit\/?$/i,
    prefsRegex: /https?:\/\/([a-z]+).reddit.com\/prefs\/?/i,
    commentPermalinkRegex: /comments\/[a-z0-9]+\/[^/]+\/[a-z0-9]+$/,
    pageType: function() {
        if (typeof(this.pageTypeSaved) == 'undefined') {
            var pageType = '';
            var currURL = location.href.split('#')[0];
            if (RESUtils.profileRegex.test(currURL)) {
                pageType = 'profile';
            } else if ((RESUtils.commentsRegex.test(currURL)) || (RESUtils.friendsCommentsRegex.test(currURL))) {
                pageType = 'comments';
            } else if (RESUtils.inboxRegex.test(currURL)) {
                pageType = 'inbox';
            } else if (RESUtils.submitRegex.test(currURL)) {
                pageType = 'submit';
            } else if (RESUtils.prefsRegex.test(currURL)) {
                pageType = 'prefs';
            } else {
                pageType = 'linklist';
            }
            this.pageTypeSaved = pageType;
        }
        return this.pageTypeSaved;
    },
    watchForElement: function() { /* stub */ },
    setCursorPosition: function(form, pos) {
        var elem = $(form)[0];
        if (!elem) return null;

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }

        return form;
    },
    isCommentPermalinkPage: function() {
        var path = document.location.pathname;
        return RESUtils.commentPermalinkRegex.test(path);
    },
    click: function(obj, button) {
        var evt = document.createEvent('MouseEvents');
        button = button || 0;
        evt.initMouseEvent('click', true, true, window.wrappedJSObject, 0, 1, 1, 1, 1, false, false, false, false, button, null);
        obj.dispatchEvent(evt);
    }
};

var RESConsole = {
    getModulePrefs: function () {
        return true;
    }
};

var RESStorage = {
    localStorage: (window.unsafeWindow || window).localStorage,
    setItem: function(key, value) {
        this.localStorage[key] = value;
    },
    getItem: function(key) {
        var value = this.localStorage[key];
        return value != null ? value : null;
    }
};

var modules = {};
modules['bitcointip'] = {
    moduleID: 'bitcointip',
    moduleName: 'bitcointip',
    category: 'Users',
    disabledByDefault: true,
    description: 'Send <a href="http://bitcoin.org/" target="_blank">' +
        'bitcoin</a> to other redditors  via <a href="/r/bitcointip" ' +
        'target="_blank">bitcointip</a>. <br><br>' +
        'For more information, visit <a href="/r/bitcointip" ' +
        'target="_blank">/r/bitcointip</a>  or <a href="/13iykn" ' +
        'target="_blank">read the documentation</a>.',
    options: {
        baseTip: {
            name: 'Default Tip',
            type: 'text',
            value: '0.01 BTC',
            description: 'Default tip amount in the form of ' +
                '"[value] [units]", e.g. "0.01 BTC"'
        },
        attachButtons: {
            name: 'Add "tip bitcoins" Button',
            type: 'boolean',
            value: true,
            description: 'Attach "tip bitcoins" button to comments'
        },
        hide: {
            name: 'Hide Bot Verifications',
            type: 'boolean',
            value: true,
            description: 'Hide bot verifications'
        },
        status: {
            name: 'Tip Status Format',
            type: 'enum',
            values: [
                { name: 'detailed', value: 'detailed' },
                { name: 'basic', value: 'basic' },
                { name: 'none', value: 'none' }
            ],
            value: 'detailed',
            description: 'Tip status - level of detail'
        },
        currency: {
            name: 'Preferred Currency',
            type: 'enum',
            values: [
                { name: 'BTC', value: 'BTC' },
                { name: 'USD', value: 'USD' },
                { name: 'JPY', value: 'JPY' },
                { name: 'GBP', value: 'GBP' },
                { name: 'EUR', value: 'EUR' }
            ],
            value: 'USD',
            description: 'Preferred currency units'
        },
        balance: {
            name: 'Display Balance',
            type: 'boolean',
            value: true,
            description: 'Display balance'
        },
        subreddit: {
            name: 'Display Enabled Subreddits',
            type: 'boolean',
            value: false,
            description: 'Display enabled subreddits'
        },
        address: {
            name: 'Known User Addresses',
            type: 'table',
            addRowText: '+add address',
            fields: [
                {name: 'user', type: 'text'},
                {name: 'address', type: 'text'}
            ],
            value: [
                /* ['skeeto', '1...'] */
            ],
            description: 'Mapping of usernames to bitcoin addresses'
        },
        fetchWalletAddress: {
            text: 'Search private messages',
            description: "Search private messages for bitcoin wallet associated with the current username." +
            "<p>You must be logged in to search.</p>" +
            "<p>After clicking the button, you must reload the page to see newly-found addresses.</p>",
            type: 'button',
            callback: null // populated when module loads
        }
    },
    isEnabled: function() {
        return RESConsole.getModulePrefs(this.moduleID);
    },
    include: Array(
            /https?:\/\/([a-z]+).reddit.com\/[\?]*/i
    ),
    exclude: Array(
            /https?:\/\/([a-z]+).reddit.com\/[\?]*\/user\/bitcointip\/?/i
    ),
    isMatchURL: function() {
        return RESUtils.isMatchURL(this.moduleID);
    },
    beforeLoad: function() {
        this.options.fetchWalletAddress.callback = this.fetchAddressForCurrentUser.bind(this);
        RESUtils.addCSS('.tip-bitcoins { cursor: pointer; }');
        RESUtils.addCSS('.tips-enabled-icon { cursor: help; }');
        RESUtils.addCSS('#tip-menu { display: none; position: absolute; top: 0; left: 0; }');
        // fix weird z-indexing issue caused by reddit's default .dropdown class
            RESUtils.addCSS('.tip-wrapper .dropdown { position: static; }');
    },

    go: function() {
        if (!this.isEnabled() || !this.isMatchURL()) {
            return;
        }

        if (this.options.status.value === 'basic') {
            this.icons.pending = this.icons.completed;
            this.icons.reversed = this.icons.completed;
        }

        if (this.options.subreddit.value) {
            this.attachSubredditIndicator();
        }

        if (this.options.balance.value) {
            this.attachBalance();
        }

        if (RESUtils.currentSubreddit() === 'bitcointip') {
            this.injectBotStatus();
        }

        if (RESUtils.pageType() === 'comments') {
            if (this.options.attachButtons.value) {
                this.attachTipButtons();
                RESUtils.watchForElement('newComments', modules['bitcointip'].attachTipButtons.bind(this));
                this.attachTipMenu();
            }

            if (this.options.hide.value) {
                this.hideVerifications();
                RESUtils.watchForElement('newComments', modules['bitcointip'].hideVerifications.bind(this));
            }


            if (this.options.status.value !== 'none') {
                this.scanForTips();
                RESUtils.watchForElement('newComments', this.scanForTips.bind(this));
            }
        }
    },

    save: function save() {
        var json = JSON.stringify(this.options);
        RESStorage.setItem('RESoptions.bitcoinTip', json);
    },

    load: function load() {
        var json = RESStorage.getItem('RESoptions.bitcoinTip');
        if (json) {
            this.options = JSON.parse(json);
        }
    },


    /** Specifies how to find tips. */
    tipregex: /\+((\/u\/)?bitcointip|bitcoin|tip|btctip|bittip|btc)/i,
    tipregexFun: /(\+((?!0)(\d{1,4})) (point|internet|upcoin))/i,

    /** How many milliseconds until the bot is considered down. */
    botDownThreshold: 15 * 60 * 1000,

    /** Bitcointip API endpoints. */
    api: {
        gettips: '//bitcointip.net/api/gettips.php',
        gettipped: '//bitcointip.net/api/gettipped.php',
        subreddits: '//bitcointip.net/api/subreddits.php',
        balance: '//bitcointip.net/api/balance.php'
    },

    /** Encoded tipping icons. */
    icons: {
        completed: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROAAAAt1BMVEX///8AAAAAyAAAuwAAwQcAvAcAvwAAwQYAyAUAxAUAxwQAwgQAvAMAxQYAvwYAxQYAxwU5yT060j460j871T89wUE9wkFGokdGu0hIzExJl09JmE9JxExJxE1K1U9K1k5Ll09LmVNMmVNM2FBNmlRRx1NSzlRTqlVUslZU1ldVq1hVrFdV2FhWrFhX21pZqlphrWJh3WRotGtrqm1stW91sXd2t3h5t3urz6zA2sHA28HG3sf4+PhvgZhQAAAAEXRSTlMAARweJSYoLTM0O0dMU1dYbkVIv+oAAACKSURBVHjaVc7XEoIwEIXhFRED1tBUxBaPFSyxK3n/5zIBb/yv9pudnVky2Ywxm345MHkVXByllPm4W24qrLbzdo1sLPPRepc+XlnSIAuz9DQYPtXnkLhUF/ysrndV3CYLRpbg2VtpxFMwfRfEl8IghEPUhB9t9lEQoke6FnzONfpU5kEIoKOn/z+/pREPWTic38sAAAAASUVORK5CYII=",
        cancelled: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROAAAAQlBMVEX///+qAAAAAAC/AADIABSaTU3YMDDcPj7cSEjeUFDiZGTld3fmfHzoiorqkJDqlpbupKTuqqr99fX99/f+/Pz////kWqLlAAAABXRSTlMAAwcIM6KYVMQAAABfSURBVHjaXc7JDsAgCEVRsYpIBzro//9qHyHpond3AgkklIuXPKJcqleIIEB6FwEhQEW0t4rlUtt+22ZTMQ09NqZyiK8BtBCvc9iDWegY526hBVRmdcQ9RgD9f/G+P1+JEwRF2vKhRgAAAABJRU5ErkJggg==",
        tipped: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAMAAACq939wAAAA/FBMVEWqVQCqcQCZZgCLXQCdYgDMjACOXACOXwCacQCfcQCqegCwggChggCnfwCwggCthACtgQC9iACleQC+iwDMlgDJlACmfgDDiwDBjADHlQDJnQDFlQDKmAChfRGjgBOmfhKmghKnghOqhBKthxOviROvjB+vjCGvjCOwiRSwihixixWxjSGziBOzkSmzky+0kSa0kiy3jxW8kxS8mCi8n0i8oEq9lBe9mSvOoBbUrTTUrTjbukXcsTDctDrdtj/exHbexXDfwWXfwmvjrBnksRjksx7lrhnqx17qyWTqymrq377rz3nr2qftuiHtvSv67cD67sj+997/+OX///8rcy1sAAAAHXRSTlMDCQoLDRQkKystMDc5Oj0+QUlKS0tMTVFSV15/i6wTI/gAAACWSURBVHjaHcrnAoFQGADQryI7sjNKN0RKZJVNQ8io938YN+f3ASDp1B9NAhD15UzXNH26KhNQXZyDBxZcNlloKadvFIbR56owUOFV9425ai8PrGwZaITQeisXoKHs7k/MP44ZaHYl54U5El8EdmjNEWbEjesf/Ljd9v0S1ETBtD3PNgUxB8nOQIybOGknAKgMy2FsmoIflIEZdK7PshkAAAAASUVORK5CYII=",
        pending: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABWUlEQVR4nI2Sy0sCURTGD6S2jjYFrdy0DNpEhokb8zFm5YyaO6NFYNGqF/0hPZYtR79FUbgw0BFtDKIgUCSpv8Od3XtGJzWDBj64h/l+954XdbtdGhQZkzNUd7ptifiXZygo0Wz0WsWoyHTMj4Wo6nRLQ7KdRuZz15bWSiF0GQOVXJ4hqP/COGDTjEO9SyByIcDHiUXiT+QsAaW1wabgi4KtVxVqM4lQVcFx4RS5tzy0vIgZFDVTnaYkFG6us2lbTyNws4ZAMYizwjk6nQ7KbQOJfMqCRBlERZpWruJYfvYigx02ZfUDHN2e8Pnpy8T+w6G4MIqI8HFH5Ut9SKZQ/jDYPAh4K36EGzGrkwz1avK8+/jn3n2WzaPASsNnQaJpvYG65ixwFV7Dj7iuQcul+Cwvs4Ga1fafOVUcC31Qpio1BJjO0PiNEJPn9osapeyNqLmW/lyj/+7eN1qRZT0kKLSqAAAAAElFTkSuQmCC",
        reversed: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABOklEQVR42p2SvU4CQRSFj+9h7DQ2VmsDCy0/Cw2wsNtuRwixIiQ8CZaWGDBaaAiJyVAg2xi1AaTQ19jyOHeSIbLBxuIkM7Pn23PvnQHJPSngNAYcK9mnPWng/LpaZVoadg9CC+BSDNsg4FcU7bRpNjkslaiAYAfZhL+AuFbjQ6PBYaXCZ6AK4Mj0IMBGH4rptVjkW73Ote9zUS5z2u/zfTzmRBL1XoNniIFjgdaeZ0yjMORNocCZ1nQwYJIk3CrFSatlIGkDM+BEouNMhndRZEyjTof3vZ5Zfy+XfOp2zQ+ND3BMkoWkhE+lxLwHzPN5rjzPTtLZ9fSRzZqPj+22MaeBlesaSIZmp3dhQZXLcaQHcev7sjZnFngBwr17mgNFC+pSRRawZV0dfBFy89ogDYvEbBMav33/ens/XHaDp7U/bFsAAAAASUVORK5CYII="
    },

    /** Specifies how to display different currencies. */
    currencies: {
        USD: {unit: 'US$', precision: 2},
        BTC: {unit: '฿'},
        JPY: {unit: '¥'},
        GBP: {unit: '£', precision: 2},
        EUR: {unit: '€', precision: 2},
        AUD: {unit: 'A$', precision: 2},
        CAD: {unit: 'C$', precision: 2}
    },

    /** Return a DOM element to separate items in the user bar. */
    separator: function() {
        return $('<span>|</span>').addClass('separator');
    },

    /** Convert a quantity into a string. */
    quantityString: function quantityString(object) {
        var pref = this.options.currency.value.toUpperCase();
        var unit = this.currencies[pref];
        var amount = object['amount' + pref] || object['balance' + pref];
        if (amount == null) {
            amount = object['amountBTC'] || object['balanceBTC'];
            unit = this.currencies['BTC'];
        }
        if (unit.precision) {
            amount = parseFloat(amount).toFixed(unit.precision);
        }
        return unit.unit + amount;
    },

    tipPublicly: function tipPublicly($target) {
        var form = null;
        if ($target.closest('.link').length > 0) { /* Post */
            form = $('.commentarea .usertext:first');
        } else { /* Comment */
            var replyButton = $target.closest('ul').find('a[onclick*="reply"]');
            RESUtils.click(replyButton[0]);
            form = $target.closest('.thing').find('FORM.usertext.cloneable:first');
        }
        var textarea = form.find('textarea');
        if (!textarea.val().match(this.tipregex)) {
            textarea.val(textarea.val() + '\n\n+/u/bitcointip ' +
                         this.options.baseTip.value);
            RESUtils.setCursorPosition(textarea, 0);
        }
    },

    tipPrivately: function tipPrivately($target) {
        var form = null;
        if ($target.closest('.link').length > 0) { /* Post */
            form = $('.commentarea .usertext:first');
        } else {
            form = $target.closest('.thing').find(".child .usertext:first");
        }
        if (form.length > 0 && form.find('textarea').val()) {
            /* Confirm if a comment has been entered. */
            if (!confirm('Really leave this page to tip privately?')) {
                return;
            }
        }
        var user = $target.closest('.thing').find('.author:first').text();
        var msg = encodeURIComponent('+/u/bitcointip @' + user + ' ' +
                                         this.options.baseTip.value);
        var url = '/message/compose?to=bitcointip&subject=Tip&message=' + msg;
        window.location = url;
    },

    attachTipButtons: function attachTipButtons(ele) {
        ele = ele || document.body;
        var module = this;
        if (!module.tipButton) {
            module.tipButton = $(
                '<span class="tip-wrapper">' +
                  '<div class="dropdown">' +
                    '<a class="tip-bitcoins login-required" title="Click to give a bitcoin tip">bitcointip</a>' +
                  '</div>' +
                '</span>');
            module.tipButton.bind('click', function(e) {
                modules['bitcointip'].toggleTipMenu(e.target);
            });
        }


        /* Add the "tip bitcoins" button after "give gold". */
        var allGiveGoldLinks = ele.querySelectorAll('a.give-gold');
        RESUtils.forEachChunked(allGiveGoldLinks, 15, 1000, function(giveGold, i, array) {
            $(giveGold).parent().after($('<li/>')
                .append(modules['bitcointip'].tipButton.clone(true)));
        });

        if (!module.attachedPostTipButton) {
            module.attachedPostTipButton = true; // signifies either "attached button" or "decided not to attach button"

            if (!RESUtils.isCommentPermalinkPage() && $('.link').length === 1) {
                // Viewing full comments on a submission, so user can comment on post
                $('.link ul.buttons .share').after($('<li/>')
                    .append(modules['bitcointip'].tipButton.clone(true)));
            }
        }

    },

    attachTipMenu: function() {
        this.tipMenu =
            $('<div id="tip-menu" class="drop-choices">' +
                '<a class="choice tip-publicly" href="javascript:void(0);">tip publicly</a>' +
                '<a class="choice tip-privately" href="javascript:void(0);">tip privately</a>' +
               '</div>');

        if (modules['settingsNavigation']) { // affordance for userscript mode
            this.tipMenu.append(
                modules['settingsNavigation'].makeUrlHashLink(this.moduleID, null,
                '<img src="' + this.icons.tipped + '"> bitcointip', 'choice')
            );
        }
         $(document.body).append(this.tipMenu);

        this.tipMenu.find('a').click(function(event) {
            modules['bitcointip'].toggleTipMenu();
        });

        this.tipMenu.find('.tip-publicly').click(function(event) {
            event.preventDefault();
            modules['bitcointip'].tipPublicly($(modules['bitcointip'].lastToggle));
        });

        this.tipMenu.find('.tip-privately').click(function(event) {
            event.preventDefault();
            modules['bitcointip'].tipPrivately($(modules['bitcointip'].lastToggle));
        });
    },


    toggleTipMenu: function(ele) {
        var tipMenu = modules['bitcointip'].tipMenu;

        if (!ele || ele.length === 0) {
            tipMenu.hide();
            return;
        }

        var thisXY = $(ele).offset();
        var thisHeight = $(ele).height();
        // if already visible and we've clicked a different trigger, hide first, then show after the move.
        if ((tipMenu.is(':visible')) && (modules['bitcointip'].lastToggle !== ele)) {
            tipMenu.hide();
        }
        tipMenu.css({
            top: (thisXY.top+thisHeight)+'px',
            left: thisXY.left+'px'
        });
        tipMenu.toggle();
        modules['bitcointip'].lastToggle = ele;
    },

    attachSubredditIndicator: function() {
        var subreddit = RESUtils.currentSubreddit();
        if (subreddit && this.getAddress(RESUtils.loggedInUser())) {
            $.getJSON(this.api.subreddits, function(data) {
                if (data.subreddits.indexOf(subreddit.toLowerCase()) !== -1) {
                    $('#header-bottom-right form.logout')
                        .before(this.separator()).prev()
                        .before($('<img/>').attr({
                            'src': this.icons.tipped,
                            'class': 'tips-enabled-icon',
                            'style': 'vertical-align: text-bottom;',
                            'title': 'Tips enabled in this subreddit.'
                        }));
                }
            }.bind(this));
        }
    },

    hideVerifications: function hideVerifications(ele) {
        ele = ele || document.body;

        /* t2_7vw3n is u/bitcointip. */

        var botComments = $(ele).find('a.id-t2_7vw3n').closest('.comment');
        RESUtils.forEachChunked(botComments, 15, 1000, function(botComment, i, array) {
            var $this = $(botComment);
            var isTarget = $this.find('form:first').hasClass('border');
            if (isTarget) return;

            var hasReplies = $this.find('.comment').length > 0;
            if (hasReplies) return;

            $this.find('.expand').eq(2).click();
        });
    },

    toggleCurrency: function() {
        var units = Object.keys(this.currencies);
        var i = (units.indexOf(this.options.currency.value) + 1) % units.length;
        this.options.currency.value = units[i];
        this.save();
    },

    getAddress: function getAddress(user) {
        user = user || RESUtils.loggedInUser();
        var address = null;
        this.options.address.value.forEach(function(row) {
            if (row[0] === user) address = row[1];
        });
        return address;
    },

    setAddress: function setAddress(user, address) {
        user = user || RESUtils.loggedInUser();
        var set = false;
        this.options.address.value.forEach(function(row) {
            if (row[0] === user) {
                row[1] = address;
                set = true;
            }
        });
        if (user && !set) {
            this.options.address.value.push([user, address]);
        }
        this.save();
        return address;
    },

    attachBalance: function attachBalance() {
        var user = RESUtils.loggedInUser();
        var address = this.getAddress(user);
        if (!address) return;
        var bitcointip = this;

        $.getJSON(this.api.balance, {
            username: user,
            address: address
        }, function (balance) {
            if (!('balanceBTC' in balance)) {
                return; /* Probably have the address wrong! */
            }
            $('#header-bottom-right form.logout')
                .before(bitcointip.separator()).prev()
                .before($('<a/>').attr({
                    'class': 'hover',
                    'href': '#'
                }).click(function() {
                    bitcointip.toggleCurrency();
                    $(this).text(bitcointip.quantityString(balance));
                }).text(bitcointip.quantityString(balance)));
        });
    },

    fetchAddressForCurrentUser: function () {
        var user = RESUtils.loggedInUser();
        if (!user) {
            RESUtils.notification({
                moduleID: 'bitcointip',
                optionKey: 'fetchWalletAddress',
                type: 'error',
                message: 'Log in, then try again.'
            });
            return;
        }
        this.fetchAddress(user, function(address) {
            if (address) {
                modules['bitcointip'].setAddress(user, address);
                RESUtils.notification({
                        moduleID: 'bitcointip',
                        optionKey: 'address',
                        message: 'Found address ' + address + ' for user ' + user +
                            '<br><br>Your adress will appear in RES settings after you refresh the page.'
                });
            } else {
                RESUtils.notification({
                        moduleID: 'bitcointip',
                        type: 'error',
                        message: 'Could not find address for user ' + user
                    });
            }

        });
        RESUtils.notification({
                moduleID: 'bitcointip',
                optionKey: 'fetchWalletAddress',
                message: 'Searching your private messages for a bitcoin wallet address. ' +
                        '<br><br>Reload the page to see if a wallet was found.'
         });
    },

    fetchAddress: function fetchAddress(user, callback) {
        user = user || RESUtils.loggedInUser();
        callback = callback || function nop() {};
        if (!user) return;
        $.getJSON('/message/messages.json', function(messages) {
            /* Search messages for a bitcointip response. */
            var address = messages.data.children.filter(function (message) {
                return message.data.author === 'bitcointip';
            }).map(function (message) {
                var pattern = /Deposit Address: \| \[\*\*([a-zA-Z0-9]+)\*\*\]/;
                var address = message.data.body.match(pattern);
                if (address) {
                    return address[1];
                } else {
                    return false;
                }
            }).filter(function(x) { return x; })[0]; // Use the most recent
            if (address) {
                this.setAddress(user, address);
                callback(address);
            } else {
                callback(null);
            }
        }.bind(this));
    },

    scanForTips: function(ele) {
        ele = ele || document.body;
        var tips = this.getTips(this.tipregex, ele);
        var fun = this.getTips(this.tipregexFun, ele);
        var all = $.extend({}, tips, fun);
        if (Object.keys(all).length > 0) {
            this.attachTipStatuses(all);
            this.attachReceiverStatus(this.getTips(/(?:)/, ele));
        }
    },

    /** Return true if the comment node matches the regex. */
    commentMatches: function(regex, $e) {
        unsafeWindow.foo = unsafeWindow.foo || [];
        unsafeWindow.foo.push($e);
        return $e.find('.md:first, .title:first').children().is(function() {
            return regex.test($(this).text());
        });
    },

    /** Find all things matching a regex. */
    getTips: function getComments(regex, ele) {
        var tips = {};
        var items = $(ele);
        if (items.is('.entry')) {
            items = items.closest('div.comment, div.self, div.link');
        } else {
            items = items.find('div.comment, div.self, div.link');
        }
        var module = this;
        items.each(function() {
            var $this = $(this);
            if (module.commentMatches(regex, $this)) {
                var id = $this.attr('data-fullname');
                tips[id.replace(/^t._/, '')] = $this;
            }
        });
        return tips;
    },

    attachTipStatuses: function attachTipStatuses(tips) {
        var iconStyle = 'vertical-align: text-bottom; margin-left: 8px;';
        var icons = this.icons;
        var tipIDs = Object.keys(tips);
        $.getJSON(this.api.gettips, {
            tips: tipIDs.toString()
        }, function(response) {
            var lastEvaluated = new Date(response.last_evaluated * 1000);
            response.tips.forEach(function (tip) {
                var id = tip.fullname.replace(/^t._/, '');
                var tagline = tips[id].find('.tagline').first();
                var icon = $('<a/>').attr({href: tip.tx, target: '_blank'});
                tagline.append(icon.append($('<img/>').attr({
                    src: icons[tip.status],
                    style: iconStyle,
                    title: this.quantityString(tip) + ' → ' + tip.receiver +
                        ' (' + tip.status + ')'
                })));
                tips[id].attr('id', 't1_' + id); // for later linking
                delete tips[id];
            }.bind(this));

            /* Deal with unanswered tips. */
            for (var id in tips) {
                if (this.commentMatches(this.tipregexFun, tips[id])) {
                    continue; // probably wasn't actually a tip
                }
                var date = tips[id].find('.tagline time:first')
                        .attr('datetime');
                if (new Date(date) < lastEvaluated) {
                    var tagline = tips[id].find('.tagline:first');
                    tagline.append($('<img/>').attr({
                        src: icons.cancelled,
                        style: iconStyle,
                        title: 'This tip is invalid.'
                    }));
                }
            }
        }.bind(this));
    },

    attachReceiverStatus: function attachReceiverStatus(things) {
        var iconStyle = 'vertical-align: text-bottom; margin-left: 8px;';
        var icons = this.icons;
        var thingIDs = Object.keys(things);
        $.getJSON(this.api.gettipped, {
            tipped: thingIDs.toString()
        }, function(response) {
            response.forEach(function (tipped) {
                var id = tipped.fullname.replace(/^t._/, '');
                var thing = things[id];
                var tagline = thing.find('.tagline').first();
                var plural = tipped.tipQTY > 1;
                var title = this.quantityString(tipped) + ' to ' +
                        thing.find('.author:first').text() + ' for this ';
                if (plural) {
                    title = 'redditors have given ' + title;
                } else {
                    title = 'a redditor has given ' + title;
                }
                if (thing.closest('.link').length === 0) {
                    title += 'comment.';
                } else {
                    title += 'submission.';
                }
                var icon = $('<img/>').attr({
                    src: icons.tipped,
                    style: iconStyle,
                    title: title
                });
                tagline.append(icon);
                if (plural) {
                    tagline.append($('<span/>').text('x' + tipped.tipQTY));
                }
            }.bind(this));
        }.bind(this));
    },

    injectBotStatus: function injectBotStatus() {
        $.getJSON(this.api.gettips, function(response) {
            var lastEvaluated = new Date(response.last_evaluated * 1000);
            var botStatus = null;
            if (Date.now() - lastEvaluated > this.botDownThreshold) {
                botStatus = '<span class="status-down">DOWN</span>';
            } else {
                botStatus = '<span class="status-up">UP</span>';
            }
            $('.side a[href="http://bitcointip.net/status.php"]').html(botStatus);
        });
    }
};
var bitcointip = modules['bitcointip'];
bitcointip.beforeLoad();
bitcointip.load();
if (!bitcointip.getAddress()) {
    bitcointip.fetchAddress();
}
bitcointip.go();

/* Create the options panel. */
if (location.pathname === '/r/bitcointip/wiki/preferences') {
    var $wiki = $('div.md.wiki');
    var $form = $('<form/>').attr({
        'class': 'tip-preferences roundfield'
    });

    /* Build up the form. */
    for (var item in bitcointip.options) {
        var option = bitcointip.options[item];
        var $label = $('<label/>').text(option.name).addClass('roundfield');
        var $input = null;
        if (option.type === 'text') {
            $input = $('<input/>').attr({
                name: item,
                type: 'text',
                value: option.value
            });
        } else if (option.type === 'boolean') {
            $input = $('<select/>').attr({
                name: item
            });
            var yes = $('<option/>').attr({
                value: 'true'
            }).text('yes');
            var no = $('<option/>').attr({
                value: 'false'
            }).text('no');
            if (option.value) {
                yes.attr('selected', true);
            } else {
                no.attr('selected', true);
            }
            $input.append(yes).append(no);
        } else if (option.type === 'enum') {
            $input = $('<select/>').attr({
                name: item
            });
            for (var i = 0; i < option.values.length; i++) {
                var value = option.values[i];
                var $option = $('<option/>').attr({
                    value: value.value
                }).text(value.value);
                if (option.value === value.value) {
                $option.attr('selected', true);
            }
                $input.append($option);
            }
        }
        if ($input) {
            var $div = $('<div/>');
            $div.append($label).append($input);
            $form.append($div);
        }
    }

    $form.append($('<input/>').attr({
        type: 'submit',
        value: 'Save Preferences'
    }));

    $form.submit(function(event) {
        event.preventDefault();
        for (var item in bitcointip.options) {
            var option = bitcointip.options[item];
            var $input = $('input[name=' + item + '], ' +
                           'select[name=' + item + ']');
            if ($input.length === 1) {
                console.log('Saved ' + item);
                var value = $input.val();
                if (option.type === 'boolean') {
                    value = JSON.parse(value);
                }
                bitcointip.options[item].value = value;
            } else {
                console.log('Skipped ' + item);
            }
        }
        bitcointip.save();
        window.location.reload(true); // Just to provide feedback
    });

    $wiki.empty().append($form);
}


/* ## Test Tips
 *
 * Rejected:
 *   http://www.reddit.com/r/bitcointip/comments/132nhq/_/c7c7iue
 * Rejected flip:
 *   http://www.reddit.com/r/Bitcoin/comments/14i9e7/_/c7dc6w9
 * Combination folding:
 *   http://www.reddit.com/r/bitcointip/comments/13iykn/_/c7dj8ia
 * Multiple tips to one receiver:
 *   http://www.reddit.com/r/bitcointip/comments/12lmut/_/c7ny177
 * Multiple guilded to one receiver (for comparison):
 *   http://www.reddit.com/r/AdviceAnimals/comments/15mk25/_/c7ntrcc
 * Reversed:
 *   http://www.reddit.com/r/IAmA/comments/18tp7t/_/c8i8qto
 * Fun tip to ignore:
 *   http://www.reddit.com/r/gaming/comments/18ihmm/_/c8f54l4
 */
