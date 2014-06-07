// ==UserScript==
// @name          4shadow (modified)
// @namespace     http://img.4chan.org/
// @description   One 4chan updater clone to rule them all.
// @include       http://*.4chan.org/*/res/*.html*
// @include       http://*.4chan.org/*/imgboard.php*
// @version       7.0
// @author        Chris Done, Todd Kirby
// ==/UserScript==

// Copyright (c) 2009, Todd Kirby
// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html

// WTF aren't these defined by firefox?
const PAGE_OK = 200, PAGE_NOT_MODIFIED = 304, PAGE_NOT_FOUND = 404;
XMLHttpRequest.DONE = 4;

const INITIAL_POLL_INTERVAL = 10; // if the user doesn't set something else in prefs.

const SEND_DEBUG_MESSAGES_TO_CONSOLE = false;

// if the user wants debug messages, use firebug console if available, else fall back to GM_log.
if (!SEND_DEBUG_MESSAGES_TO_CONSOLE) { GM_log = function(){} }

const HIGHLIGHT_NEW_POSTS = false; // For debugging but may eventually be a user setting. Right now it colors each grab of posts a different random color to allow to see what got picked up at each interval.

function Updater() {
    var me = this;
    var running = false;
    var lastUpdate = null;
    var timer = null;
    var prefsPanel = null;
    var formPanel = null;
    var button = null;
    var prefs = null;

    this.run = function() {
        prefs = new PrefsList();
        // prefs.add('name', default_value, onchange_callback);
        // TODO: callbacks should pass value back
        prefs.add('auto-update',          true);
        prefs.add('disable-forms',        true);
        //prefs.add('run-scripts',          false);
        prefs.add('thread-died-title',    '(THREAD DIED)');
        prefs.add('thread-died-notice',   'This thread no longer exists');
        prefs.add('poll-interval',        INITIAL_POLL_INTERVAL, me.changeInterval);

        timer = new Timer(poll_server, prefs.get('poll-interval'));
        lastUpdate = new Date(document.lastModified);

        formPanel = new FormPanel(prefs);

        //prefs.add('ajax-form-submit',           false);
        prefs.add('show-form-instructions',     false, formPanel.displayFormGarbage);
        prefs.add('popup-reply-form',           false);
        prefs.add('clear-form-after-submit',    true);
        prefs.add('hide-form-after-submit',    true);
 
        prefs.get('popup-reply-form') && formPanel.init();

        prefsPanel = new PrefsPanel(prefs);

        button = new UpdaterButton(function(e) { 
                if (prefs.get('popup-reply-form') && e.shiftKey) {
                    formPanel.show();
                    return;
                }

                if (e.ctrlKey) {
                    prefsPanel.show();
                    return;
                }

                me.toggle();
            },
		//nextpic
		function(){
			// current 
			var current = self.document.location.hash.substring(1);
			// all
			var anchors = $x("//td[@class = 'reply' and a/img]");
			var next;
			for(var i=0; i<anchors.length; i++){
				if(anchors[i].id > current){
					next = anchors[i].id;
				}
			}
			if (next != null){
				self.document.location.hash = next;
			}

		},
		//prevpic
		function(){
			// current 
			var current = self.document.location.hash.substring(1);
			// all
			var anchors = $x("//td[@class = 'reply' and a/img]");
			var prev = 0;
			for(var i=0; i<anchors.length; i++){
				if(anchors[i].id < current && anchors[i].id > prev){
					prev = anchors[i].id;
				}
			}
			if (prev != null){
				self.document.location.hash = prev;
			}

		});

        prefs.get('auto-update') ? start() : stop();
    }

    poll_server = function() {
        var request = new XMLHttpRequest();

	 // Make it text/plain so there's no parsing ahead of it's time
	 request.overrideMimeType('text/plain');

        request.onreadystatechange = function() {
            if (request.readyState == XMLHttpRequest.DONE) {
                switch (request.status) {
                    case PAGE_OK:
                        GM_log('updating page');
                        if (request.responseText) { // GET request
                            updatePageFromText(request.responseText);
                            setLastUpdated(new Date(request.getResponseHeader('Last-Modified')));
                            timer.start();
                        } else { // HEAD request
                            updatePageFromIframe(request);
                            // NOTE: The callback function handleIframeLoaded, set up by 
                            // updatePageFromIframe is responsible for starting timer 
                            // up again when it's done fetching and rendering the iframe.
                        }
                       break;
                    case PAGE_NOT_MODIFIED:
                        GM_log('page not modified');
                        timer.start();
                        break;
                    case PAGE_NOT_FOUND:
                        GM_log('thread died');
                        doThreadDied();
                        break;
                    default:
                        GM_log('unhandled server response');
                        timer.start();
                        break;
                }
            }
        }

        timer.stop(); // ...until request is handled. This stops the update timer until 
                      // the previous page is actually fetched and rendered. This 
                      // insures that no more page requests are fired until the 
                      // previous request is handled completely.  
        //var request_type = prefs.get('run-scripts') ? 'HEAD' : 'GET';
        var request_type = 'GET';

        try {
            request.open(request_type, window.location.href.replace(/#.*/, ''), true);
            request.setRequestHeader('If-Modified-Since', lastUpdate.toUTCString());
            request.send(null);
            GM_log('polling server...');
        }  catch (e) {
            GM_log('Error connecting to server');
            timer.start();
        }
    }

    this.isRunning = function() {
        return running;
    }

    this.changeInterval = function(new_poll_interval) {
        timer.setInterval(new_poll_interval);
        if (me.isRunning()) {
            timer.restart();
        }
    }

    setLastUpdated = function(when) {
        lastUpdate = when;
    }

    start = function() {
        button.setStarted();
        timer.start();
        running = true;
    }

    stop = function() {
        button.setStopped();
        timer.stop();
        running = false;
    }

    this.toggle = function() {
        this.isRunning() ? stop() : start();
    }

    updatePageFromText = function (text) {
        var container, last_item, add_post, current_reply_count, new_replies, buffer;

        //TODO: Test this whole block with 4chan_ext on but 'run scripts' off

        // grab just the element containing the replies
        delform = text.match(/<form name=\"delform\".*?>[\s\S]*?<\/form>/gm);

        current_reply_count = 
            $X("count(//form[@name='delform']//td[@class='reply' or @class='replyhl'])"); 

        // grab each reply row (<tr></tr>) from the reply container 
        // FIXME: This doesn't grab inter-table anchor links.
        // FIXME: Need to deal with potential deleted posts
        replies = delform[0].match(/<tr>[\s\S]*?<\/tr>/gm);

        if (replies.length > current_reply_count) {
            new_replies = replies.slice(current_reply_count);

            new_replies = new_replies.map(
                    function(item) { 
                        // add a new table element around the reply. This is kind of a hack
                        // since we need some element to .innerHTML into, we just pull the row
                        // from the post and then reinsert it into a new <table> element
                        table = document.createElement('table');
                        table.innerHTML = item;

                        if (HIGHLIGHT_NEW_POSTS) {
                            table.setAttribute('style', 'background-color: ' + random_color());
                        }

                        return (table);
                    });

            add_post = function(item) { 
                // 4chan_ext doesn't get to run on ajax requests so we only have to
                // deal with the delform container case.
                container = $X("//form[@name='delform']");
                last_item = $X("//form[@name='delform']//table[last()-1]", document);
                container.insertBefore(item, last_item.nextSibling); 
            };

            new_replies.forEach(add_post);
        }
        
        // run 4chan's script to highlight replies
        try { unsafeWindow.init(); unsafeWindow.expandNewImages(); unsafeWindow.addfilenames();} catch(e) {}
    }

    updatePageFromIframe = function() {

        subdomain = getSubdomain(window.location.href);
        redirector_subdomain = getSubdomain($X("//form[@name='delform']").action);

        // HACK HACK: we can't reload the main page into an iframe due to 
        // a recursion guard mechanism in Fireflodge so we ask for the page from
        // the host that replies get sent to and let it redirect us back to the 
        // current page.
        url = window.location.href.replace(/#.*/, '').replace(subdomain,redirector_subdomain);

        // NOTE: handleIframeLoaded callback restarts timer when page rendering is done.
        dom_from_hidden_iframe(url, 'fs-updater-iframe', me.handleIframeLoaded); 
    }    

    this.handleIframeLoaded = function(iframe_doc) {
        var container, last_item, add_post, current_reply_count, new_replies;

        // dont try to run on pages we don't recognize (404...)
        if (!$X("id('header')")) {
            return;
        }

        // FIXME: We only need to caclulate container once. 4chan extension is either
        // going to be on or off for our whole run.
        if ( (container = $X("//div[@class='4chan_ext_thread_replies']")) ) {
            add_post = function(item) { container.appendChild(item); };
        } else {
            container = $X("//form[@name='delform']");
            last_item = $X("//form[@name='delform']//table[last()-1]");

            add_post = function(item) { container.insertBefore(item, last_item.nextSibling); };
        }

        current_reply_count = 
            $X("count(//form[@name='delform']//td[@class='reply' or @class='replyhl'])"); 

        // FIXME: This doesn't grab inter-table anchor links.
        new_replies = $x("//form[@name='delform']//table[position() > " +
                current_reply_count +
                "]//td[@class='reply' or @class='replyhl']/ancestor::table", 
                iframe_doc);

        if (HIGHLIGHT_NEW_POSTS) {
            new_replies = new_replies.map(function(item) { 
                    item.setAttribute('style', 'background-color: ' + random_color);
                    return item;
                    } );
        }

        new_replies.forEach(add_post);

        this.setLastUpdated(new Date(iframe_doc.lastModified));
        timer.start();
    }

    doThreadDied = function() {
        stop();

        button.setDied();

        // add thread died message to page title
        document.title = prefs.get('thread-died-title');

        // disable forms if the user requested
        prefs.get('disable-forms') && disableForms();
    }

    disableForms = function() {
        // change submit button title so the user knows why it's disabled
        $X("/html/body//form[@name='post']//input[@type='submit']").value = 
            prefs.get('thread-died-title');

        // disable all inputs but textarea so the user can copy their text still
        // if they want to save or use it somewhere else.
        inputs = $x("/html/body//form[@name='post']//input").forEach(
                function(input) { input.disabled = true });
    }
}


function Timer(callback, interval) {
    var callback = callback;
    var interval = interval;
    var id = null;
    const ONE_SECOND_IN_MILLISECONDS = 1000; // milliseconds

    this.isRunning = function() { return id; }
    this.setInterval = function(new_interval) { interval = new_interval; }

    this.start = function() { 
        if (this.isRunning()) {
            GM_log('timer already started, skipping');
        } else {
            id = window.setInterval(callback, ONE_SECOND_IN_MILLISECONDS * interval);
            GM_log('starting timer');
        }
    }

    this.stop = function() { 
        GM_log('stopping timer');
        clearInterval(id); 
        id = null; 
    }

    this.restart = function () {
        GM_log('restarting timer');
        this.stop();
        this.start();
    }
}


function PrefsList() {
    this.add = function(pref_name, default_value, onchange) {
        this[pref_name] = { 'default_value' : default_value };

        if (onchange !== undefined) {
            this[pref_name].onchange = onchange;
        }
    }

    this.get = function(pref_name) { 
        return GM_getValue(pref_name, this[pref_name].default_value);
    }

    this.set = function(pref_name, new_value) {
        if (this[pref_name].onchange !== undefined) {
            this[pref_name].onchange(new_value);
        }
        GM_setValue(pref_name, new_value);
    }
}


function PrefsPanel(prefs) {
    var me = this; // closure magic so we can us this object in event handlers.
    var inited = false;
    var prefs = prefs;

    this.init = function() {
        GM_addStyle(panel_css);
        GM_addStyle(prefs_panel_css);

        prefs_div = document.createElement('div');
        prefs_div.id = 'fs-prefs';
        prefs_div.innerHTML = prefs_panel_html;
        $X('/html/body').appendChild(prefs_div);

        $X("id('fs-prefs-submit')").addEventListener('click', this.save, true);
        $X("id('fs-prefs-cancel')").addEventListener('click', this.cancel, true);
        inited = true;
    }

    this.save = function() {
        // Use 'me' on any functions that may be called by event handlers
        me.store();
        me.hide();
    }

    this.cancel = function() {
        me.hide();
    }

    this.store = function() {
        poll_interval_select = $X("id('poll-interval-select')");
        prefs.set('poll-interval', poll_interval_select[poll_interval_select.selectedIndex].value);
        prefs.set('auto-update', $X("id('auto-update-checkbox')").checked);
        //prefs.set('ajax-form-submit', $X("id('ajax-form-submit-checkbox')").checked);
        prefs.set('disable-forms', $X("id('disable-forms-checkbox')").checked);
        //prefs.set('run-scripts', $X("id('run-scripts-checkbox')").checked);
        //prefs.set('show-form-instructions', $X("id('show-form-instructions-checkbox')").checked);
        prefs.set('popup-reply-form', $X("id('popup-reply-form-checkbox')").checked);
        prefs.set('clear-form-after-submit', $X("id('clear-form-after-submit-checkbox')").checked);
        prefs.set('hide-form-after-submit', $X("id('hide-form-after-submit-checkbox')").checked);
    }

    this.load = function() {
        $X("id('auto-update-checkbox')").checked = prefs.get('auto-update');
        $X("id('popup-reply-form-checkbox')").checked = prefs.get('popup-reply-form');
        //$X("id('show-form-instructions-checkbox')").checked = prefs.get('show-form-instructions');
        $X("id('disable-forms-checkbox')").checked = prefs.get('disable-forms');
        //$X("id('run-scripts-checkbox')").checked = prefs.get('run-scripts');
        //$X("id('ajax-form-submit-checkbox')").checked = prefs.get('ajax-form-submit');
        $X("id('clear-form-after-submit-checkbox')").checked = prefs.get('clear-form-after-submit');
        $X("id('hide-form-after-submit-checkbox')").checked = prefs.get('hide-form-after-submit');
        $X("id('poll-interval-select')//option[@value='" + 
                prefs.get('poll-interval') + "']").selected = true;
    }

    this.hide = function() {
        $X("id('fs-prefs')").style.display = 'none';
    }

    this.show = function() {
        inited || this.init();
        this.load();
        $X("id('fs-prefs')").style.display = 'block';
    }
}


function FormPanel(prefs) {
    var me = this; // closure magic so we can us this object in event handlers.
    var inited = false;
    var prefs = prefs;

    this.setStatus = function(text, color) {
        status_span = $X("id('fs-form-panel-status-text')");
        status_span.innerHTML = text;
        status_span.style.color = color;
    }

    this.submitted = function(doc) {
        GM_log('remove getSubmitResponse message handler');
        window.removeEventListener("message", me.getSubmitResponse, false);
    }

    this.getSubmitResponse = function(e) {
        GM_log('Form posted. Response was: ' + e.data);
        
        if (e.data == 'fs_success') {
            me.setStatus("Reply Posted", "green");
            if (prefs.get('clear-form-after-submit')) {
                $X("//form[@name='post']").reset();
            }
            if (prefs.get('hide-form-after-submit')) {
                me.hide();
            }
        } else {
            me.setStatus(e.data, "red");
        }
    }

    this.handleSubmit = function() {
        dom_from_hidden_iframe("", 'fs-form-submit-iframe', me.submitted);
        window.addEventListener("message", me.getSubmitResponse, false);
        me.setStatus("Posting Reply...", "green");
        return true;
    }

    this.init = function() {
        // TODO: need to check if other panel has added panel_css already
        GM_addStyle(panel_css);
        GM_addStyle(form_panel_css);

        form_div = document.createElement('div');
        form_div.id = 'fs-updater-form';
        form_div.style.display = 'none';
        form_div.innerHTML = form_panel_html;
        $X('/html/body').appendChild(form_div);

        $X("id('fs-form-panel-closebox')").addEventListener('click', this.hide, false);
    
        this.moveFormToUpdater();

        $X("//form[@name='post']").target = 'fs-form-submit-iframe';
        $X("//form[@name='post']").addEventListener('submit', me.handleSubmit, false);

        this.displayFormGarbage(prefs.get('show-form-instructions'));

        inited = true;
    }

    this.hide = function() {
        $X("id('fs-updater-form')").style.display = 'none';
    }

    this.moveFormToUpdater = function() {
        $X("id('fs-form-panel-content')").insertBefore($X("//form[@name='post']"), $X("id('fs-form-panel-status-text')"));
    }

    this.displayFormGarbage = function(value) {
        // FIXME: use better xpath to avoid parentNode crap.
        $X("//td[@class='rules']").parentNode.parentNode.parentNode.style.display = value == true ? 'block' : 'none';
    }

    this.show = function() {
        inited || this.init();
        this.setStatus("","");
        $X("id('fs-updater-form')").style.display = 'block';
    }
}


function UpdaterButton(callback, nextpic, prevpic) { 
    const STARTED_LABEL = 'Updater Running';
    const STOPPED_LABEL = 'Updater Stopped';
    const THREAD_DIED_LABEL = 'Thread Died';

    GM_addStyle('#updater-button, #next-button, #prev-button { font-family:Lucida Grande, Tahoma, Arial, Verdana; font-size: small; position:fixed; bottom:2px; color: #FFF; padding: 1px; border: 1px;}');
    GM_addStyle('#updater-button.fs-button-running { background-color: #0A0; }');
    GM_addStyle('#updater-button.fs-button-died { background-color: #A00; }');
    GM_addStyle('#updater-button.fs-button-stopped { background-color: #000; }');
    GM_addStyle('#updater-button { right:0px; }');
    GM_addStyle('#next-button, #prev-button { background-color: rgb(244,247,172); color:black;}');
    GM_addStyle('#next-button { right:110px; }');
    GM_addStyle('#prev-button { right:170px; }');

    container_div = document.createElement('div');
    container_div.innerHTML = '<button id="prev-button">Prev Pic</button><button id="next-button">Next Pic</button><button id="updater-button" title="Ctrl-Click for Settings"></button>';

    $X('/html/body').appendChild(container_div);

    $X("id('updater-button')").addEventListener('click', callback, true);
    $X("id('next-button')").addEventListener('click', nextpic, true);
    $X("id('prev-button')").addEventListener('click', prevpic, true);

    this.setStarted = function() { 
        butt = $X("id('updater-button')");
        butt.blur();
        butt.innerHTML = STARTED_LABEL;
        butt.className = 'fs-button-running';
    }

    this.setStopped = function() { 
        butt = $X("id('updater-button')");
        butt.blur();
        butt.innerHTML = STOPPED_LABEL;
        butt.className = 'fs-button-stopped';
    }

    this.setDied = function() {
        butt = $X("id('updater-button')");
        butt.blur();
        butt.innerHTML = THREAD_DIED_LABEL;
        butt.className = 'fs-button-died';
    }
}


// UTILITY FUNCTIONS

// list nodes matching this expression, optionally relative to the node `root'
function $x(xpath, root) {
    var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;

    // FIXME: ANY_TYPE returns unordered iterators which can, in theory lead to out of 
    // order posts but I've never seen it happen in practice.
    var got = doc.evaluate(xpath, root||doc, null, XPathResult.ANY_TYPE, null), result = [];

    switch (got.resultType) {
        case got.STRING_TYPE:
            return got.stringValue;
        case got.NUMBER_TYPE:
            return got.numberValue;
        case got.BOOLEAN_TYPE:
            return got.booleanValue;
        default:
            while ((next = got.iterateNext()))
                result.unshift(next);
            return result;
    }
}


function $X(xpath, root) {
    var got = $x(xpath, root);
    return got instanceof Array ? got[0] : got;
}


function getSubdomain(str) {
    var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
    return str.match(re)[1].split('.')[0];
}


function dom_from_hidden_iframe(url, iframe_id, callback)
{
    function loaded(e) {
        try {
            e.target.removeEventListener('load', loaded, false);
            // avoid racing with GM's DOMContentLoaded callback
            setTimeout(function() { callback(e.target.contentDocument); }, 10);
        } catch(e) {
            GM_log('Error in iframe loaded handler');
        }
    };

    var iframe = $X("id('" + iframe_id + "')");
 
    if (iframe == undefined) {
        iframe = document.createElement('iframe');
        iframe.style.height = iframe.style.width;
        iframe.style.visibility = 'hidden';
        iframe.style.position = 'absolute';
        iframe.id = iframe_id;
        iframe.name = iframe_id;
        document.body.appendChild(iframe);

    }

    iframe.addEventListener('load', loaded, false);
    GM_log('loading new content into iframe');

    if (url) {
        try {
            iframe.src = url;
        } catch(e) {
            GM_log('Error in another script in the iframe');
        }
    }
}


function pad(number,length) {
    var str = '' + number;
    while (str.length < length)
        str = '0' + str;
    return str;
}


function random_color() {
    return "#" + 
        pad(Math.floor(Math.random()*256).toString(16),2) + 
        pad(Math.floor(Math.random()*256).toString(16),2) + 
        pad(Math.floor(Math.random()*256).toString(16),2);
}

// RESOURCES
// TODO: define these externally and @resource them in

const prefs_panel_css = (<r><![CDATA[

#fs-prefs { text-align: left; position:fixed; bottom:25px; right:0px; display: block} 
        select.fs_select { color:#333; font-size:100%; margin:1px 0; padding:1px 0 0; border-bottom:1px solid #ddd; border-left:1px solid #c3c3c3; border-right:1px solid #c3c3c3; border-top:1px solid #7c7c7c; }
        input.fs-checkbox { display:block; height:13px; line-height:1.4em; margin:6px 0 0 3px; width:13px; }
        label.choice { color:#444; display:block; font-size:100%; line-height:1.4em; margin:-1.55em 0 0 25px; padding:4px 0 5px; width:90%; }
        
]]></r>).toString();

const form_panel_css = (<r><![CDATA[
    #fs-updater-form { text-align: left; position:fixed; bottom:25px; right:0px; display: block }
]]></r>).toString();

const panel_css = (<r><![CDATA[

.fs-panel-title { color: #444; font-weight: bold; margin:0; min-height:0; text-align: center; text-decoration:none;}

.fs-outerpair1 { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yNS8wNk7vxRQAAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAAAGdJREFUeJxNzksKAkEMhOGvHzqKC126c87g/e8kuFIYpt2kJYEfAlVJVcEZA3swd9BwQ0cN5hSMhhVLMpVk0vDECYckjknHA2+84kDqs3fc4wNs+OITkVvFFZdgiah/n4pj0IOWupQfFtoS9rTbP5UAAAAASUVORK5CYII%3D) right top no-repeat;}
        .fs-outerpair2 {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yNS8wNk7vxRQAAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAAAGZJREFUeJxNzsEKwkAMhOFvu2tVBI/iRfr+D6il2m69pJDAkIH5maTgihseeGHCE3eMFS10xgUjKlYsFUOo4RS+44dPRUlQwY4NM94HIO2Obwby7AlYMLcUbBH0+GcQ5qjNDWucLH966BpsOjDX/QAAAABJRU5ErkJggg%3D%3D) left bottom no-repeat; padding-top: 8px; padding-left: 8px; }
        .fs-shadowbox { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYCAYAAACadoJwAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yNS8wNk7vxRQAAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAADUxJREFUeJzt3btO41AUQNGTUf6/4xcRBRWCgREPT5EYMkGiIdoRmbUky47SnHbr3mtvlmUZAACAU9hsNlczczszNzNzvb/fzszdzDz+OuNsAADAf0aAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAACc0vLVJUAAAIBTWr76U4AAAACntK52vB08vxMgAADAKb3MzOvsAuRThAgQAADglP7sr+f5CJH3CNluNpur880GAAD8cOt2q5fZhcfDzPyemaf973VFZJmZZTszt+eZEwAA+OHWrVXrdqs/s4uPu5m5n88R8radmZt+TgAA4AIcB8jz7KLjfnYR8jBH27G2M3PdzwkAAFyIw7devc4uOJ5mFx/rKsgaIIsVEAAA4DsO33L1Oh9nQdYQeZqDcyDOgAAAAN91uBVrjZDn/bU+v81+C9bdOSYEAAAuynGErG/G+uebINuZeTzLeAAAwKU5/gr68X3+AiuZhS0L93K2AAAAAElFTkSuQmCC) bottom right;
        }
        .fs-innerbox { position: relative; left: -8px; top: -8px; }
        .fs-panel-closebox { float:right; margin-left:-18px; padding-right: 5px }

]]></r>).toString();

const form_panel_html = (<r><![CDATA[
<div class="fs-outerpair1">
    <div class="fs-outerpair2">
        <div class="fs-shadowbox">
            <div class="fs-innerbox" style="border:1px solid">
                <table cellpadding="0" cellspacing="0" style="margin: 0; padding 0">
                    <tr>
                        <td style="border-bottom: 1px solid #000; background-color:#DEDEDE">
                            <div class="fs-panel-title">Reply Form
                        </td>
                        <td width="16" style="border-bottom: 1px solid #000; background-color:#DEDEDE">
                            <img width="16" height="16" class="fs-panel-closebox" id="fs-form-panel-closebox" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9EHDRMNKMuHqnkAAAC2SURBVHicjVKxEcQgDFP+sgMNFSPQsELWyzRAQ8MKNKyQEXCRL5wjHM9zqJJtZFl3bNZaLOM4jh3AuuYRADjPc/7UOcd799q6rmvF5FMZERGREIIa1HIgKKVIKQFIKUspXTl2yDkzV0oppZjnnMcObJ1Sai9OKXUnvaFb30mzd9Bat2Ot9Sy0MYZ5jDHGyNwY8zd0CAFACIG3tuUgA3e99+24K1+Bc+438RCPYP3/bfd9Lz5lfAGcP5gicQQKTAAAAABJRU5ErkJggg==">
                        </td>
                    </tr>
                    <tr style="border-bottom: 1px solid #000">
                        <td style="border-bottom: 1px solid #000; background-color:white" colspan="2" align="center">
                            <div id="fs-form-panel-content" style="margin:10px">
                            <span id="fs-form-panel-status-text" style="font-weight: bold; font-size: 1.2em; margin:10px"></span>
                            </div>
                        </td>
                    <tr>
                <table>
            </div>
        </div>
    </div>
</div>
]]></r>).toString();

const prefs_panel_html = (<r><![CDATA[
      
<div class="fs-outerpair1">
    <div class="fs-outerpair2">
        <div class="fs-shadowbox">
            <div class="fs-innerbox">
                <table cellpadding="0" cellspacing="0" border="1" style="margin: 0; padding 0">
                    <tr>
                        <td align="center">
                            <div id="fs-form-container" style="background:#fff;border:1px solid #ccc;margin:0 auto;text-align:left;font-family:Lucida Grande, Tahoma, Arial, Verdana, sans-serif; font-size:small;">
                                <div style="background-color:#dedede" class="fs-panel-title">4Shadow Settings</div>
                                <div style="margin:10px">
                                <fieldset><legend>Updater Settings</legend>
                                <span style="color:#444;margin:-1.55em 0 0 0; ">Check for new replies every </span><select class="element fs_select" id="poll-interval-select" name="poll-interval-select"> 
                                <option value="5">5 seconds</option>
                                <option value="6">6 seconds</option>
                                <option value="7">7 seconds</option>
                                <option value="8">8 seconds</option>
                                <option value="9">9 seconds</option>
                                <option value="10">10 seconds</option>
                                <option value="15">15 seconds</option>
                                <option value="20">20 seconds</option>
                                <option value="30">30 seconds</option>
                                <option value="45">45 seconds</option>
                                <option value="60">minute</option>
                                <option value="120">2 minutes</option>
                                <option value="300">5 minutes</option>
                                <option value="600">10 minutes</option>
                                <option value="1800">30 minutes</option>
                                <option value="3600">hour</option>
                                </select>
                                <span>
                                <div style="margin:15px;"></div>
                                <input id="auto-update-checkbox" name="auto-update-checkbox" class="element fs-checkbox" type="checkbox" value="" />
                                <label class="choice" for="auto-update-checkbox">Start updating when page loads</label>
                                </span>
                                <span>
                                <input id="disable-forms-checkbox" name="disable-forms-checkbox" class="element fs-checkbox" type="checkbox" value="1" />
                                <label class="choice" for="disable-forms-checkbox">Disable forms when thread 404s</label>
                                </span>
                                
                                <span>
                                <input disabled="disabled" id="run-scripts-checkbox" name="run-scripts-checkbox" class="element fs-checkbox" type="checkbox" value="1" />
                                <label class="choice" for="run-scripts-checkbox">Run scripts (broken by changes to 4chan servers)</label>
                                </span>
                                
                                </fieldset>
                                <p/>
                                <fieldset><legend>Reply Settings</legend>
                                <!--<span>
                                <input id="ajax-form-submit-checkbox" name="ajax-form-submit-checkbox" class="element fs-checkbox" type="checkbox" value="1" />
                                <label class="choice" for="ajax-form-submit-checkbox">Post replies without reloading</label>
                                </span>-->
                                <span>
                                <input id="popup-reply-form-checkbox" name="popup-reply-form-checkbox" class="element fs-checkbox" type="checkbox" value="1" />
                                <label class="choice" for="popup-reply-form-checkbox">Popup reply form on shift-click</label>
                                </span>
                                <span>
                                <input id="clear-form-after-submit-checkbox" name="clear-form-after-submit-checkbox" class="element fs-checkbox" type="checkbox" value="1" />
                                <label class="choice" for="clear-form-after-submit-checkbox">Clear form after successful submit</label>
                                </span>
                                <span>
                                <input id="hide-form-after-submit-checkbox" name="hide-form-after-submit-checkbox" class="element fs-checkbox" type="checkbox" value="1" />
                                <label class="choice" for="hide-form-after-submit-checkbox">Hide form after successful submit</label>
                                </span>
 

                                <!--<span>
                                <input id="show-form-instructions-checkbox" name="show-form-instructions-checkbox" class="element fs-checkbox" type="checkbox" value="1" />
                                <label class="choice" for="show-form-instructions-checkbox">Show Form Instructions</label>
                                </span>-->
                                </fieldset>
                                </div>
                                <div style="margin: 5px" align="center">
                                <input id="fs-prefs-submit" class="button-text" type="button" name="submit" value="Save" />
                                <input id="fs-prefs-cancel" class="button-text" type="button" name="cancel" value="Cancel" />
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
]]></r>).toString();

// SCRIPT ENTRY POINT
window.addEventListener("load", run, false);
        
function run() {

   if (window.frameElement) {
        try {
            if (window.frameElement.id == 'fs-updater-iframe') {
                // bail if called from within fs-updater-iframe since it's just us 
                // loading the page into an iframe to grab new posts.
                return;
            }
        } catch (e) {
            // check for error messages and pass them up
            var message = null;
            var match = document.body.innerHTML.match(/<font .*color="red" size=".*?"><b>(Error:.*?)<br>/);
            if (match) {
                message = match[1];
            } else {
                message = 'fs_success';
            }
            window.parent.postMessage(message, '*');
            return;
        }
   }

    if (!document.getElementById('navtop')) return;

    updater = new Updater();
    updater.run();
}
