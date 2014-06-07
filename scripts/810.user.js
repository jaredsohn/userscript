// ==UserScript==
// @name           Mefiquote
// @namespace      http://plutor.org/
// @description    Adds "quote" links to Metafilter comments.
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

//
// DONE 2011-02-23
// * Use MeFi's own jquery object (properly this time)
// * Use a content scope injector instead of unsafeWindow
// * Handle new ajax comments - big thanks to pb
//
// TODO
// * Indicate when "quote" will quote the selection
// * Make it work with epiphany and opera 
// * Ability to link to the original post on preview

// Content Scope 
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ everything.toString() +')();'));
script.setAttribute("type", "application/javascript");
(document.body || document.head || document.documentElement).appendChild(script);

/* ======================================================================== */
function everything() {
    var BUTTONTEXT = 'quote';
    var QUOTEFORMAT = '<a href="%l">%n</a>: "<i>%q</i>"';

    /* ======================================================================== */

    function mq_quotethis(evt) {
        var commenttextarea = $("#comment");
        if (commenttextarea.length < 1) return;

        var quotelink = $(this);
        var metadata = quotelink.parent();
        var comment = metadata.parent();


        // Get all of the data to fill in placeholders
        var quotebits = new Object;
        quotebits['%'] = '%';

        if (mq_selection_within_comment(comment)) {
            quotebits.q = document.getSelection().toString();
        } else {
            quotebits.q = new String(comment.html());
            quotebits.q = quotebits.q.replace(/<br>/ig, '');

            // Remove the trailing metadata
            if (quotebits.q.lastIndexOf('<span class="smallcopy">posted by') > -1)
                quotebits.q = quotebits.q.slice(0,
                                    quotebits.q.lastIndexOf('<span class="smallcopy">posted by'));

            // Remove the player from music
            if (quotebits.q.lastIndexOf('<object ') > -1)
                quotebits.q = quotebits.q.slice(0,
                                    quotebits.q.lastIndexOf('<object '));

            // Remove the more inside junk
            quotebits.q = quotebits.q.replace(/<\/?div[^>]*>/g, '');
            quotebits.q = quotebits.q.replace(/^[ \t\n]*/, '');
            quotebits.q = quotebits.q.replace(/[ \t\n]*$/, '');
        }

        // Default to top of the thread, just in case
        quotebits.l = "" + location.protocol + "//" + location.host + location.pathname;

        // The rest of the data
        metadata.children('a').each( function(i) {
            var url = $(this).attr('href');
            var path = url.replace(/https?:\/\/([^\/]*\.)?metafilter.com/, '');
            if (url == path && path.match('^/'))
                url = "" + location.protocol + "//" + location.host + path;

            if (path.match(/^\/user\/(\d+)/)) {
                quotebits.i = RegExp.$1;
                quotebits.n = $(this).html();
                quotebits.n = quotebits.n.replace(/<.*/, ''); 
                quotebits.p = url;
            } else if (path.match(/#\d+$/)) {
                quotebits.l = url;
            }
        } );

        // Replace all of the placeholders
        var quoteregex = new RegExp('%(.)', 'g');
        var quotehtml = new String();
        var lastIndex = 0;
        while ( quoteregex.exec(QUOTEFORMAT) ) {
            var thisIndex = quoteregex.lastIndex;
            quotehtml = quotehtml.concat( QUOTEFORMAT.substr(lastIndex, thisIndex-lastIndex-2) );
            var val = quotebits[QUOTEFORMAT.substr(thisIndex-1, 1)];
            if (val != undefined) {
                quotehtml = quotehtml.concat( quotebits[QUOTEFORMAT.substr(thisIndex-1, 1)] );
            } else {
                quotehtml = quotehtml.concat( '%' + QUOTEFORMAT.substr(thisIndex-1, 1) );
            }

            lastIndex = thisIndex;
        }
        quotehtml = quotehtml.concat( QUOTEFORMAT.substr(lastIndex) );

        // GM_log( quotehtml );
        var commentval = commenttextarea.val() || "";
        if (commentval != "" && !commentval.match(/\n\n$/)) {
            commentval += "\n\n";
        }
        commentval += quotehtml + "\n\n";

        commenttextarea.val(commentval);
    }

    /* ======================================================================== */

    function mq_load_preferences() {
        BUTTONTEXT = Cookie.get('mefiquote_buttontext') || BUTTONTEXT;
        QUOTEFORMAT = Cookie.get('mefiquote_quoteformat') || QUOTEFORMAT;
    }

    function mq_save_preferences() {
        var buttontext_el = $('#mq_buttontext');
        var quoteformat_el = $('#mq_quoteformat');

        Cookie.set('mefiquote_buttontext', (buttontext_el.val() || BUTTONTEXT),
            24*365*10, '', 'metafilter.com', false);
        Cookie.set('mefiquote_quoteformat', (quoteformat_el.val() || QUOTEFORMAT),
            24*365*10, '', 'metafilter.com', false);

        return true; /* So it actually submits, too */
    }

    /* ======================================================================== */

    function mq_escape(str) {
        return str.replace(/"/g, '&quot;');
    }

    /* ======================================================================== */

    function mq_selection_within_comment(comment) {
        var selection = window.getSelection();

        // an empty selection doesn't count as being within the comment, otherwise
        // the quote button tries to quote it and things behave counterintuitively
        if (selection == null || selection.isCollapsed) {
            return false;
        }

        // check to see if the selection is inside this comment
        var rangeStart = selection.getRangeAt(0).startContainer;
        var rangeEnd = selection.getRangeAt(0).endContainer;

        if (rangeStart != null && rangeEnd != null) {
            var start_found = false;
            var end_found = false;

            // TODO - Why doesn't parents().index() do the right thing?
            $(rangeStart).parents().andSelf().each( function() {
                if (this == comment.get(0)) start_found = true;
            });
            $(rangeEnd).parents().andSelf().each( function() {
                if (this == comment.get(0)) end_found = true;
            });

            return (start_found && end_found);
        }
        return false;
    }

    /* ======================================================================== */
        
    function mq_init_preferences() {
        var inputs = $('input');
        var submit_button = $('input[type=submit]').filter( function() {
            return $(this).val().match(/Save your Preferences/);
        } );
        if (inputs.length < 1 || submit_button.length < 1) return;

        // Create the fieldset
        var mefiquote_fieldset = $('<fieldset>'
                + '<legend>MefiQuote preferences</legend>'
                + '<label for="mq_buttontext">Quote button text: </label>'
                + '<input type="text" id="mq_buttontext" name="mq_buttontext" value="'
                + mq_escape(BUTTONTEXT)
                + '" maxlength="200" size="30" onfocus="this.style.background=\'#ddd\';" onblur="this.style.background=\'#ccc\';" /><br />'
                + '<label for="mq_quoteformat">Quote format:<br />'
                + '<span class="smallcopy" style="text-align: left">%i - commenter\'s user id<br />%l - url of comment<br />%n - commenter\'s name<br />%p - url of commenter\'s profile<br />%q - comment text<br />%% - an actual percent ("%")</span></label>'
                + '<textarea name="mq_quoteformat" id="mq_quoteformat" cols="60" rows="8" wrap="VIRTUAL" style="width:400px;height:200px;" onfocus="this.style.background=\'#ddd\';" onblur="this.style.background=\'#ccc\';">'
                + mq_escape(QUOTEFORMAT) 
                + '</textarea>'
                + '</fieldset>')
            .insertBefore(submit_button);

        // Add javascript to the form
        submit_button.parents('form').submit( mq_save_preferences );
    }

    function mq_init_thread() {
        console.log("init-thread");

        var commenttextarea = $("#comment");
        if (commenttextarea.length < 1) return;

        var n = 0;
        $('span').each( function(i) {
            var curr = $(this);
            if (curr.hasClass('smallcopy') && curr.html().match(/^posted by/) &&
                curr.parents('#prevDiv2, form').length == 0 &&
                curr.find('.quotebutton').length == 0) {
                // Skip the first (post) quote link on preview
                if (location.pathname.match('^/contribute/post_comment_preview.mefi') && n++ == 0)
                    return;

                // Add the button
                var quotebutton = $('<a href="#comment">' + BUTTONTEXT + '</a>')
                    .attr('target', '_self')
                    .addClass('quotebutton');

                curr.append(' [').append( quotebutton ).append(']');
            }
        } );
    }

    function mq_init_newcomments() {
        $("#newcomments").bind('mefi-comments',
            function() {
                console.log("event!");
                mq_init_thread();
            } );
        console.log("init-newcomments");
    }

    /**
     * Modified from cookie-js 0.4 by Maxime Haineault (max@centdessin.com)
     * <http://code.google.com/p/cookie-js/> 
     */
    Cookie = {      
        /** Get a cookie's value */
        get: function(key) {
                // Still not sure that "[a-zA-Z0-9.()=|%/_]+($|;)" match *all* allowed characters in cookies
                tmp =  document.cookie.match((new RegExp(key +'=[a-zA-Z0-9.()=|%/_]+($|;)','g')));
                if(!tmp || !tmp[0]) return null;
                else return unescape(tmp[0].substring(key.length+1,tmp[0].length).replace(';','')) || null;
                
        },      
        
        /** Set a cookie */
        set: function(key, value, ttl, path, domain, secure) {
                cookie = [key+'='+    escape(value),
                                  'path='+    ((!path   || path=='')  ? '/' : path),
                                  'domain='+  ((!domain || domain=='')?  window.location.host : domain)];
                
                if (ttl)         cookie.push('expires=' + Cookie.hoursToExpireDate(ttl));
                if (secure)      cookie.push('secure');
                return document.cookie = cookie.join('; ');
        },
        
        /** Unset a cookie */
        unset: function(key, path, domain) {
                path   = (!path   || typeof path   != 'string') ? '' : path;
        domain = (!domain || typeof domain != 'string') ? '' : domain;
                if (Cookie.get(key)) Cookie.set(key, '', 'Thu, 01-Jan-70 00:00:01 GMT', path, domain);
        },

        /** Return GTM date string of "now" + time to live */
        hoursToExpireDate: function(ttl) {
                if (parseInt(ttl) == 'NaN' ) return '';
                else {
                        now = new Date();
                        now.setTime(now.getTime() + (parseInt(ttl) * 60 * 60 * 1000));
                        return now.toGMTString();                       
                }
        }
    }

    function mq_init() {
        mq_load_preferences();

        var url = location.pathname;

        if (url.match(/^\/(\d+)/) || url.match('^/contribute/post_comment_preview.mefi')) {
            mq_init_thread();
            mq_init_newcomments();

            // Attach a listener to clicks -- just once            
            $("#page").on("click", "a.quotebutton", mq_quotethis)
        } else if (url.match('^/contribute/customize.cfm')) {
            mq_init_preferences();
        }
    }

    mq_init();
}

