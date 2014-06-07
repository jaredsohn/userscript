// ==UserScript==
// @name         The DailyProgrammer Medal Helper
// @description  Edit user's medals more easily.
// @version      1.0.3
// @license      Public Domain
// @include      http*://*.reddit.com/r/dailyprogrammer*
// @include      http*://*.reddit.com/r/skeeto*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// ==/UserScript==

/**
 * Basic reddit information and functions.
 * @namespace
 */
var Reddit = Reddit || {};

/**
 * The current user's modhash.
 * @type String
 */
Reddit.modhash = null;

/**
 * The current reddit user.
 * @type String
 */
Reddit.user = null;

/**
 * The current reddit user's thing ID.
 * @type String
 */
Reddit.id = null;

/**
 * Initialize everything that needs to be initialized.
 * @param {Function} [callback]
 */
Reddit.init = function(callback) {
    $.getJSON('/api/me.json', function(me) {
        Reddit.modhash = me.data.modhash;
        Reddit.user = me.data.name;
        Reddit.id = me.data.id;
        if (callback) callback(me.data);
    });
};

/**
 * @param {String} api
 * @param {String} [subreddit]
 * @returns {String} an API URL for the requested API.
 */
Reddit.api = function(api, subreddit) {
    subreddit = subreddit || Reddit.subreddit();
    return '/r/' + subreddit + '/api/' + api + '.json';
};

/**
 * @returns {String} the current subreddit name, null for no subreddit.
 */
Reddit.subreddit = function() {
    var match = location.pathname.match(/\/r\/([^/]+)/);
    if (match) {
        return match[1].toLowerCase();
    } else {
        return null;
    }
};

/**
 * Represent's a user's flair on the current subreddit.
 * @param {String} user
 * @constructor
 * @namespace
 */
function Flair(user) {
    this.user = user;
}

/**
 * Get/set the text for this flair.
 * @param {String} [text] Sets the user's flair text.
 * @param {Function} [callback] Getting/setting is asynchronous.
 */
Flair.prototype.text = function(text, callback) {
    if (Object.prototype.toString.call(text) === "[object String]") {
        /* Set */
        $.post(Reddit.api('flair'), {
            name: this.user,
            text: text,
            uh: Reddit.modhash
        }, function() {
            if (callback) {
                callback(text);
            }
        });
    } else {
        /* Get */
        callback = text;
        $.getJSON(Reddit.api('flairlist'), {
            name: this.user
        }, function(data) {
            if (callback) {
                callback(data.users[0].flair_text);
            }
        });
    }
};

/**
 * Represent's a users medals on r/dailyprogrammer.
 * @param {jQuery} $flair jQuery DOM node for the flair.
 * @constructor
 * @namespace
 */
function Medals($flair) {
    this.$flair = $flair;
    this.values = $flair.text().split(/ +/).map(parseFloat);
    var subreddit = Reddit.subreddit();
    var author = $flair.parent().find('.author:first');
    this.id = author.attr('class').split(/ +/).filter(function(c) {
        return /id-t2_([a-z0-9]+)/.exec(c);
    })[0];
    this.flair = new Flair(author.text());
}

/**
 * Modify a user's medals asynchronously, locally and on the server.
 * @param {number} type 0 for gold, 1 for silver.
 * @param {number} [amount] Default 1.
 * @returns {number} The new medal total for that type.
 */
Medals.prototype.modify = function(type, amount) {
    amount = amount != null ? amount : 1;
    this.values[type] += amount;
    this.flair.text(this.values.join(' '), function(text) {
        $('.' + this.id).parent().find('.flair:first').text(text);
    }.bind(this));
    return this.values[type];
};


/* Attach a click event handler to modify medals. */
Reddit.init(function() {
    $('.flair').css('cursor', 'pointer').each(function() {
        var $flair = $(this);
        var medals = new Medals($flair);
        $flair.click(function(event) {
            event.offsetX = event.offsetX ||
                (event.clientX - $(this).offset().left);
            var type = Math.round(event.offsetX / $(this).width());
            medals.modify(type, 1);
        });
        $flair.bind('contextmenu', function(event) {
            event.offsetX = event.offsetX ||
                (event.clientX - $(this).offset().left);
            var type = Math.round(event.offsetX / $(this).width());
            medals.modify(type, -1);
            return false;
        });
    });
});
