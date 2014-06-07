// ==UserScript==
// @name          4chan updater
// @namespace     http://img.4chan.org/
// @description   Script to update 4chan threads at user defined interval
// @include       http://*.4chan.org/*/res/*.html*
// ==/UserScript==
// TODO: Add preference panel so prefs don't have to be hand edited in the source
// TODO: Add out-of-band form submit via ajax so the user can stay on the page.

(function() {  // vim won't indent correctly without this -> )

    // PREFERENCES: Change these to suit your taste.
    const POLL_INTERVAL = 10; // how often to poll the server (in seconds)
    const START_ON_PAGE_LOAD = false; // start updating automatically
    const ALERT_WHEN_THREAD_DIES = false; // show alert dialog when thread dies
    const DISABLE_FORMS_WHEN_THREAD_DIES = true; // prevent submitting to dead thread
    const TITLE_WHEN_THREAD_DIES = '(THREAD DIED)'; // window/tab title
    const NOTICE_WHEN_THREAD_DIES = 'This thread no longer exists';
    const STARTED_CAPTION = 'Updater Running';
    const STOPPED_CAPTION = 'Updater Stopped';
    const THREAD_DIED_CAPTION = 'Thread Died';
    
    // Allow 4chan extension and other Greasemonkey scripts to run on new posts.
    // It takes more a bit more computing so don't use it unless you need it.
    const RUN_SCRIPTS_ON_NEW_POSTS = true; 

    const DEBUG = false; // turn this on to get log messages
    // END PREFERENCES

    var last_update = null;
    var monitor_div = null;
    var monitor_link = null;

    /* poll_timer pseudo-object to get all this shite in one place */
    var poll_timer = { 
        id : null,

        is_running: function() { return this.id },

        start: function() { 
            if (this.is_running()) {
                log_msg('timer already started { %s }, skipping', this.id);
           } else {
                log_msg('starting timer');
                this.id = window.setInterval(poll_server, 1000 * POLL_INTERVAL);
            }
        },

        stop: function() { 
            log_msg('stop timer');
            clearInterval(this.id); 
            this.id = null; 
        }
    }

    // FUNCTIONS
    function init_updater()
    {
        // bail if called on a framed document.
        if (window.frameElement &&
                window.parent.location.href.replace(/#.*/, '') == location.href) {
            return;  
        }

        last_update = new Date(document.lastModified);

        set_up_controls();

        START_ON_PAGE_LOAD && start_updater();
    }

    function set_up_controls()
    {
        GM_addStyle('#bupdater_monitor_div { color: #FFF; padding: 3px; border: 1px; position:fixed; bottom:2px; right:0px; }');
        GM_addStyle('#bupdater_thread_died { color:red; text-align:center }');
        GM_addStyle('div.running { background-color: #0A0; }');
        GM_addStyle('div.thread404d { background-color: #A00; }');
        GM_addStyle('div.stopped { background-color: #000; }');

        monitor_link = document.createElement('a');
        monitor_link.setAttribute('id', 'bupdater_monitor_link');
        monitor_link.addEventListener('click', toggle_updater, false);
        monitor_link.style.cursor = 'pointer';
        monitor_link.style.color = 'white';
        monitor_link.innerHTML = STOPPED_CAPTION;

        monitor_div = document.createElement('div');
        monitor_div.setAttribute('id', 'bupdater_monitor_div');
        monitor_div.setAttribute('class', 'stopped');
        monitor_div.appendChild(monitor_link);

        $X('/html/body').appendChild(monitor_div);
    }

    function toggle_updater() {
        poll_timer.is_running() ? stop_updater() : start_updater();
    }

    function start_updater()
    {
        monitor_link.innerHTML = STARTED_CAPTION;
        monitor_div.setAttribute('class', 'running');
        poll_timer.start();
    }

    function stop_updater()
    {
        monitor_link.innerHTML = STOPPED_CAPTION;
        monitor_div.setAttribute('class', 'stopped');
        poll_timer.stop();
    }

    function poll_server()
    {
        log_msg('polling server...');
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                switch (request.status) {
                    case 200: // OK
                        log_msg('updating page');
                        update_page(request); 
                        // NOTE: update_page is responsible
                        // for restarting timer when it's done
                        break;
                    case 304: // Not Modified
                        log_msg('page not modified');
                        poll_timer.start();
                        break;
                    case 404: // Not Found
                        log_msg('thread died');
                        do_thread_died();
                        break;
                    default:
                        log_msg('unhandled server response: ' + request.status);
                        poll_timer.start();
                        break;
                }
            }
        }

        try {
            poll_timer.stop(); // until request is handled

            req_type = RUN_SCRIPTS_ON_NEW_POSTS ? 'HEAD' : 'GET';

            request.open(req_type, window.location.href.replace(/#.*/, ''), true);
            request.setRequestHeader('If-Modified-Since', last_update.toUTCString());
            request.send(null);
        } catch (e) {
            log_msg('Error connecting to server: ' + e.toString());
        }
    }

    function handle_iframe_loaded(iframe_doc)
    {
        var container = null;
        var insert_func = null;
        var last_item = null;

        // dont try to run on 404'd pages
        if (!iframe_doc.getElementById("navtop")) {
            return;
        }

        last_update = new Date(iframe_doc.lastModified);

        // FIXME: All these xpaths need major optimization
        if ( (container = $X("//div[@class='4chan_ext_thread_replies']")) ) {
            add_post = function(item, cont) { cont.appendChild(item); }
        } else {
            container = $X("//form[@name='delform']");
            last_item = $X("//form[@name='delform']//table[last()-1]", document);

            add_post = function(item, cont) {
                cont.insertBefore(item, last_item.nextSibling);
            }
        }

        current_reply_count = 
            $X("count(//form[@name='delform']//td[@class='reply' or @class='replyhl'])", document); 

        new_replies = $x("//form[@name='delform']//table[position() > " +
                current_reply_count +
                "]//td[@class='reply' or @class='replyhl']/ancestor::table", 
                iframe_doc);

        for (var i = 0; i < new_replies.length; i++) {
            add_post(new_replies[i], container);
        }

        poll_timer.start();
    }

    function update_page(request)
    {
        if (request.responseText) {

            last_update = new Date(request.getResponseHeader('Last-Modified'));

            document.getElementsByName('delform')[0].innerHTML = 
                request.responseText.split(/<form .*?name=["]delform["].*?>/i)[1];

            // rerun 4chan's script to highlight replies
            unsafeWindow.init();
            poll_timer.start();
        } else {
            // HACK HACK: we can't reload the main page into an iframe due to 
            // a recursion guard mechanism in Fireflodge so we call
            // 'dat.4chan.org' and let it redirect back to img.4chan.org.
            // This both bypasses the guard and makes me cringe.
            url = window.location.href.replace(/#.*/, '').replace('img','dat');

            dom_from_hidden_iframe(url, handle_iframe_loaded); // NOTE: handle_iframe_loaded restarts timer when page rendering is done.
        }    
    }

    function do_thread_died() 
    {
        stop_updater();

        // display thread died message
        var delform = document.getElementsByName('delform')[0];
        thread_died_message = document.createElement('h2');
        thread_died_message.setAttribute('id', 'bupdater_thread_died');
        thread_died_message.innerHTML = NOTICE_WHEN_THREAD_DIES;
        delform.parentNode.insertBefore(thread_died_message, delform);

        monitor_link.innerHTML = THREAD_DIED_CAPTION;
        monitor_div.setAttribute('class', 'thread404d');

        // add thread died message to page title
        document.title = TITLE_WHEN_THREAD_DIES;

        // disable forms if the user requested
        DISABLE_FORMS_WHEN_THREAD_DIES && disable_forms();

        // do alert dialog if the user requested one
        ALERT_WHEN_THREAD_DIES && alert(NOTICE_WHEN_THREAD_DIES);
    }

    function disable_forms()
    {
        // change submit button title so the user knows why it's disabled
        $X("/html/body//form[@name='post']//input[@type='submit']").value = 
            TITLE_WHEN_THREAD_DIES;
        // disable all inputs but textarea so the user can copy their text still
        // if they want to save or use it somewhere else.
        inputs = $x("/html/body//form//input");
        for (i = 0; i < inputs.length; i++) {
            inputs[i].disabled='true';
        }
    }

    // list nodes matching this expression, optionally relative to the node `root'
    function $x( xpath, root )
    {
        var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
        var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];

        switch (got.resultType) {
            case got.STRING_TYPE:
                return got.stringValue;
            case got.NUMBER_TYPE:
                return got.numberValue;
            case got.BOOLEAN_TYPE:
                return got.booleanValue;
            default:
                while ((next = got.iterateNext()))
                    result.push( next );
                return result;
        }
    }

    function $X( xpath, root )
    {
        var got = $x( xpath, root );
        return got instanceof Array ? got[0] : got;
    }

    function log_msg(msg)
    {
        DEBUG && console.log(msg);
    }

    function dom_from_hidden_iframe(url, cb/*( xml )*/) {
        function loaded() {
            doc = iframe.contentDocument;
            iframe.removeEventListener('load', loaded, false);
            doc.removeEventListener('DOMContentLoaded', loaded, false);
            // avoid racing with GM's DOMContentLoaded callback
            setTimeout(function() { cb( doc ); }, 10);
        };

        var iframe = null;

        if ( !(iframe = document.getElementById('updater_iframe')) ) {
            iframe = document.createElement('iframe');
            iframe.style.height = iframe.style.width = '0';
            iframe.style.visibility = 'hidden';
            iframe.style.position = 'absolute';
            iframe.id = 'updater_iframe';
            document.body.appendChild(iframe);
        }

        iframe.addEventListener('load', loaded, false);
        log_msg('loading new content into iframe');
    
        try {
            iframe.src = url;
        } catch(e) {
            log_msg('Error in another script in the iframe');
        }
    }

    window.addEventListener("load", function() { init_updater(); }, false);

})();