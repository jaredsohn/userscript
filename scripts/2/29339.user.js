// ==UserScript==
// @name          4chan thread updater
// @author        anon404
// @date	  12-21-2008
// @namespace     http://4chan.org/
// @version	  v0.3.0
// @description   Script to update 4chan threads whenever you want them to.
// @include       http://*.4chan.org/*/res/*.html
// @include       http://*.4chan.org/*/res/*.html#*
// @include       *.4chan.org/*/res/*.html#*
// @include       *.4chan.org/*/res/*.html
// @include       http://*.niggertits.org/*/res/*.html
// @include       http://*.niggertits.org/*/res/*.html#*
// @include       *.niggertits.org/*/res/*.html#*
// @include       *.niggertits.org/*/res/*.html
// ==/UserScript==

// Yeah, I know this is a blatant rip-off, I have some ideas that I have yet to implement.

(function() {  // fixes vim indent -> )

    var DEBUG = false; // turn this on to get log messages

    var updater = {

            last_update : null,

            init : function() {
                // bail if called on a framed document
                if (window.frameElement &&
                        window.parent.location.href.replace(/#.*/, '') == location.href) {
                    return;  
                }

                this.last_update = new Date(document.lastModified);

                timer.init(updater.poll_server, prefs.poll_interval.get());

                updater_control.init(updater.control_clicked);

                prefs.auto_update.get() && this.start();
            },
   
            start : function() {
                updater_control.set_started();
                timer.start();
            },

            stop : function() {
                updater_control.set_stopped();
                timer.stop();
            },

            toggle : function() {
                timer.is_running() ? this.stop() : this.start();
            },

            poll_server : function() {
                log_msg('polling server...');
                var request = new XMLHttpRequest();

                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        switch (request.status) {
                            case 200: // OK
                                log_msg('updating page');
                                updater.update_page(request); 
                                // NOTE: update_page is responsible
                                // for restarting timer when it's done
                                break;
                            case 304: // Not Modified
                                log_msg('page not modified');
                                timer.start();
                                break;
                            case 404: // Not Found
                                log_msg('thread died');
                                updater.do_thread_died();
                                break;
                            default:
                                log_msg('unhandled server response: ' + request.status);
                                timer.start();
                                break;
                        }
                    }
                }

                try {
                    timer.stop(); // until request is handled

                    req_type = prefs.run_scripts.get() ? 'HEAD' : 'GET';

                    request.open(req_type, window.location.href.replace(/#.*/, ''), true);
                    request.setRequestHeader('If-Modified-Since', updater.last_update.toUTCString());
                    request.send(null);
                }  catch (e) {
                    log_msg('Error connecting to server: ' + e.toString());
                }
            },

            update_page : function (request) {
                  if (request.responseText) {

                      updater.last_update = new Date(request.getResponseHeader('Last-Modified'));

                      document.getElementsByName('delform')[0].innerHTML = 
                          request.responseText.split(/<form .*?name=["]delform["].*?>/i)[1];

                      // rerun 4chan's script to highlight replies
                      unsafeWindow.init();

                      timer.start();
                  } else {
                      // HACK HACK: we can't reload the main page into an iframe due to 
                      // a recursion guard mechanism in Fireflodge so we call
                      // 'dat.4chan.org' and let it redirect back to img.4chan.org.
                      // This both bypasses the guard and makes me cringe.
                      url = window.location.href.replace(/#.*/, '').replace('img','dat');

                      dom_from_hidden_iframe(url, updater.handle_iframe_loaded); // NOTE: handle_iframe_loaded restarts timer when page rendering is done.
                  }    
              },

            do_thread_died : function() {
                     updater.stop();

                     // display thread died message
                     var delform = document.getElementsByName('delform')[0];
                     thread_died_message = document.createElement('h2');
                     thread_died_message.style.color = 'red'; 
                     thread_died_message.style.textAlign = 'center';
                     thread_died_message.innerHTML = prefs.thread_died_notice.get();
                     delform.parentNode.insertBefore(thread_died_message, delform);

                     updater_control.set_died();

                     // add thread died message to page title
                     document.title = prefs.thread_died_title.get();

                     // disable forms if the user requested
                     prefs.disable_forms.get() && updater.disable_forms();

                     // do alert dialog if the user requested one
                     prefs.thread_died_alert.get() && alert(prefs.thread_died_notice.get());
           },

           handle_iframe_loaded : function(iframe_doc) {
                          var container, last_item;

                          // dont try to run on 404'd pages
                          if (!$X("/html/body/div[@id='header']")) {
                              return;
                          }

                          updater.last_update = new Date(iframe_doc.lastModified);

                          if ( (container = $X("//div[@class='4chan_ext_thread_replies']")) ) {
                              add_post = function(item, cont) { cont.appendChild(item); };
                          } else {
                              container = $X("//form[@name='delform']");
                              last_item = $X("//form[@name='delform']//table[last()-1]", document);

                              add_post = function(item, cont) { cont.insertBefore(item, last_item.nextSibling); };
                          }

                          current_reply_count = 
                              $X("count(//form[@name='delform']//td[@class='reply' or @class='replyhl'])", document); 

                          new_replies = $x("//form[@name='delform']//table[position() > " +
                                  current_reply_count +
                                  "]//td[@class='reply' or @class='replyhl']/ancestor::table", 
                                  iframe_doc);

                          for (var i = 0, il = new_replies.length; i < il; i++) {
                              add_post(new_replies[i], container);
                          }

                          timer.start();
                      },

                      control_clicked :function(e) { 
                             e.ctrlKey ? prefs_panel.show() : updater.toggle();
                      },

                    disable_forms : function() {
                    // change submit button title so the user knows why it's disabled
                    $X("/html/body//form[@name='post']//input[@type='submit']").value = 
                        prefs.thread_died_title.get();
                    // disable all inputs but textarea so the user can copy their text still
                    // if they want to save or use it somewhere else.
                    inputs = $x("/html/body//form[@name='post']//input");
                    for (i = 0; i < inputs.length; i++) {
                        inputs[i].disabled = true;
                    }
                }


    };

    // PROGRAM OBJECTS
    
    // timer object literal
    var timer = { 
        id : null,
        callback : null,
        interval : 0,

        init : function(callback, interval) {
           this.callback = callback;
           this.interval = interval;
        },

        is_running : function() { 
            return this.id;
        },

        set_interval : function(new_interval) {
            this.interval = new_interval;
        },

        start : function() { 
            if (this.is_running()) {
                log_msg('timer already started { %s }, skipping', this.id);
           } else {
                log_msg('starting timer');
                this.id = window.setInterval(this.callback, 1000 * this.interval);
            }
        },

        stop : function() { 
            log_msg('stop timer');
            clearInterval(this.id); 
            this.id = null; 
        },

        restart : function () {
            this.stop();
            this.start();
        }
    };

    function Pref(name, default_value) {
        this.default_value = default_value;
        this.name = name;
        this.set = function(val) { GM_setValue(this.name, val); };
        this.get = function() { return GM_getValue(this.name, this.default_value); };
    }

    var prefs = {
        auto_update :           new Pref('auto_update',         true), 
        thread_died_alert :     new Pref('thread_died_alert',   false), 
        disable_forms :         new Pref('disable_forms',       true), 
        run_scripts :           new Pref('run_scripts',         false), 
        poll_interval :         new Pref('poll_interval',       10), 
        thread_died_title :     new Pref('thread_died_title',   '(saged)'), 
        thread_died_notice :    new Pref('thread_died_notice',  'This thread no longer exists') 
    };

    var prefs_panel = { 

        prefs_div : null,

        init : function(callback)
        {
            GM_addStyle(prefs_panel_css);
            GM_addStyle('#tu_updater_prefs { text-align: left; position:fixed; bottom:25px; right:0px; display: block}');
            this.prefs_div = document.createElement('div');
            this.prefs_div.id = 'tu_updater_prefs';
            this.prefs_div.innerHTML = prefs_panel_html;
            $X('/html/body').appendChild(this.prefs_div);

            $X("//input[@id='tu_updater_prefs_submit']").addEventListener('click', prefs_panel.do_save, true);
            $X("//input[@id='tu_updater_prefs_cancel']").addEventListener('click', prefs_panel.do_cancel, true);
        },

        do_save : function() {
            prefs_panel.save();
            prefs_panel.hide();
        },

        do_cancel : function() {
            prefs_panel.hide();
        },

        save : function() {
            poll_interval_select = $X("//select[@id='poll_interval_select']");
            old_poll_interval = prefs.poll_interval.get();
            new_poll_interval = poll_interval_select[poll_interval_select.selectedIndex].value;
            if (old_poll_interval != new_poll_interval) {
                prefs.poll_interval.set(new_poll_interval);
                timer.set_interval(new_poll_interval);
                timer.restart();
            }
            prefs.auto_update.set($X("//input[@id='auto_update_checkbox']").checked);
            prefs.disable_forms.set($X("//input[@id='disable_forms_checkbox']").checked);
            prefs.run_scripts.set($X("//input[@id='run_scripts_checkbox']").checked);
        },

        load : function() {
           $X("//input[@id='auto_update_checkbox']").checked = prefs.auto_update.get();
           $X("//input[@id='disable_forms_checkbox']").checked = prefs.disable_forms.get();
           $X("//input[@id='run_scripts_checkbox']").checked = prefs.run_scripts.get();
           $X("//select[@id='poll_interval_select']//option[@value='" + 
                   prefs.poll_interval.get() + "']").selected = true;
           $X("//input[@id='auto_update_checkbox']").checked = prefs.auto_update.get();
       },

        hide : function() {
            prefs_panel.prefs_div.style.display = 'none';
        },

        show : function() {
           if (!this.inited()) {
               this.init();
           }
           prefs_panel.load();
           this.prefs_div.style.display = 'block';
        },

        inited : function() {
            return this.prefs_div != null;
        }
    }

    // updater_control object literal
    var updater_control = { 
        STARTED_LABEL : 'Updater Running',
        STOPPED_LABEL : 'Updater Stopped',
        THREAD_DIED_LABEL : ';_;',

        div : null,
        link : null,

        init : function(callback)
        {
            GM_addStyle('#updater_container { position:fixed; bottom:2px; right:0px;}');
            GM_addStyle('#updater_control { color: #FFF; padding: 3px; border: 1px; }');
            GM_addStyle('div.running { background-color: #0A0; }');
            GM_addStyle('div.thread404d { background-color: #A00; }');
            GM_addStyle('div.stopped { background-color: #000; }');

            this.link = document.createElement('a');
            this.link.id = 'updater_link';
            this.link.title = 'Ctrl-Click for Settings';
            this.link.addEventListener('click', callback, false);
            this.link.style.cursor = 'pointer';
            this.link.style.color = 'white';


            this.div = document.createElement('div');
            this.div.id = 'updater_control';
            this.div.appendChild(this.link);

            this.container_div = document.createElement('div');
            this.container_div.id = 'updater_container';
            this.container_div.appendChild(this.div);
            $X('/html/body').appendChild(this.container_div);

            this.set_stopped();
        },

        set_started : function() { 
            this.link.innerHTML = this.STARTED_LABEL;
            this.div.className = 'running';
        },

        set_stopped : function() { 
            this.link.innerHTML = this.STOPPED_LABEL;
            this.div.className = 'stopped';
        },

        set_died : function() {
            this.link.innerHTML = this.THREAD_DIED_LABEL;
            this.div.className = 'thread404d';
        }
    }

    // UTILITY FUNCTIONS

    // list nodes matching this expression, optionally relative to the node `root'
    function $x(xpath, root)
    {
        var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
        var got = doc.evaluate(xpath, root||doc, null, 0, null), result = [];

        switch (got.resultType) {
            case got.STRING_TYPE:
                return got.stringValue;
            case got.NUMBER_TYPE:
                return got.numberValue;
            case got.BOOLEAN_TYPE:
                return got.booleanValue;
            default:
                while ((next = got.iterateNext()))
                    result.push(next);
                return result;
        }
    }

    function $X(xpath, root)
    {
        var got = $x(xpath, root);
        return got instanceof Array ? got[0] : got;
    }

    function log_msg(msg)
    {
        DEBUG && console.log(msg);
    }

    function dom_from_hidden_iframe(url, callback/*( document )*/)
    {
        function loaded() {
            doc = iframe.contentDocument;
            iframe.removeEventListener('load', loaded, 0);
            doc.removeEventListener('DOMContentLoaded', loaded, 0);
            // avoid racing with GM's DOMContentLoaded callback
            setTimeout(function() { callback(doc); }, 10);
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

        iframe.addEventListener('load', loaded, 0);
        log_msg('loading new content into iframe');
    
        try {
            iframe.src = url;
        } catch(e) {
            log_msg('Error in another script in the iframe');
        }
    }

    // RESOURCES 

    const prefs_panel_css = '#tu_prefs_title { color: #444; font-weight: bold;  background-color:#dedede; margin:0; padding:7; min-height:0; text-align: center; text-decoration:none;}\
select.tu_select { color:#333; font-size:100%; margin:1px 0; padding:1px 0 0; border-bottom:1px solid #ddd; border-left:1px solid #c3c3c3; border-right:1px solid #c3c3c3; border-top:1px solid #7c7c7c; }\
input.tu_checkbox { display:block; height:13px; line-height:1.4em; margin:6px 0 0 3px; width:13px; }\
label.choice { color:#444; display:block; font-size:100%; line-height:1.4em; margin:-1.55em 0 0 25px; padding:4px 0 5px; width:90%; }\
.tu_outerpair1 { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yNS8wNk7vxRQAAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAAAGdJREFUeJxNzksKAkEMhOGvHzqKC126c87g/e8kuFIYpt2kJYEfAlVJVcEZA3swd9BwQ0cN5hSMhhVLMpVk0vDECYckjknHA2+84kDqs3fc4wNs+OITkVvFFZdgiah/n4pj0IOWupQfFtoS9rTbP5UAAAAASUVORK5CYII%3D) right top no-repeat;}\
.tu_outerpair2 {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yNS8wNk7vxRQAAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAAAGZJREFUeJxNzsEKwkAMhOFvu2tVBI/iRfr+D6il2m69pJDAkIH5maTgihseeGHCE3eMFS10xgUjKlYsFUOo4RS+44dPRUlQwY4NM94HIO2Obwby7AlYMLcUbBH0+GcQ5qjNDWucLH966BpsOjDX/QAAAABJRU5ErkJggg%3D%3D) left bottom no-repeat; padding-top: 8px; padding-left: 8px; }\
.tu_shadowbox { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYCAYAAACadoJwAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yNS8wNk7vxRQAAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAADUxJREFUeJzt3btO41AUQNGTUf6/4xcRBRWCgREPT5EYMkGiIdoRmbUky47SnHbr3mtvlmUZAACAU9hsNlczczszNzNzvb/fzszdzDz+OuNsAADAf0aAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAABkBAgAAJARIAAAQEaAAAAAGQECAACc0vLVJUAAAIBTWr76U4AAAACntK52vB08vxMgAADAKb3MzOvsAuRThAgQAADglP7sr+f5CJH3CNluNpur880GAAD8cOt2q5fZhcfDzPyemaf973VFZJmZZTszt+eZEwAA+OHWrVXrdqs/s4uPu5m5n88R8radmZt+TgAA4AIcB8jz7KLjfnYR8jBH27G2M3PdzwkAAFyIw7devc4uOJ5mFx/rKsgaIIsVEAAA4DsO33L1Oh9nQdYQeZqDcyDOgAAAAN91uBVrjZDn/bU+v81+C9bdOSYEAAAuynGErG/G+uebINuZeTzLeAAAwKU5/gr68X3+AiuZhS0L93K2AAAAAElFTkSuQmCC) bottom right;\
}\
.tu_innerbox { position: relative; left: -8px; top: -8px; }\
.tu_shadowbox img {border: 10px solid #fff; vertical-align: bottom;}';

    const prefs_panel_html = '<div style="z-index:10;" class="tu_outerpair1"><div class="tu_outerpair2"><div class="tu_shadowbox"><div class="tu_innerbox">\
<table cellpadding="0" cellspacing="0" style="margin: 0; padding 0"><tr><td align="center">\
<div id="tu_form_container" style="background:#fff;border:1px solid #ccc;margin:0 auto;text-align:left;font-family:Lucida Grande, Tahoma, Arial, Verdana, sans-serif; font-size:small;">\
    <div id="tu_prefs_title">Settings</div>\
    <div style="margin:10px">\
                <span style="color:#444;margin:-1.55em 0 0 0; ">Check for new posts every </span><select class="element tu_select" id="poll_interval_select" name="poll_interval_select"> \
                    <option value="3" >3 seconds</option>\
                    <option value="5" >5 seconds</option>\
                    <option value="6" >6 seconds</option>\
                    <option value="7" >7 seconds</option>\
                    <option value="8" >8 seconds</option>\
                    <option value="9" >9 seconds</option>\
                    <option value="10" >10 seconds</option>\
                    <option value="15" >15 seconds</option>\
                    <option value="20" >20 seconds</option>\
                    <option value="30" >30 seconds</option>\
                    <option value="45" >45 seconds</option>\
                    <option value="60" >minute</option>\
                    <option value="120" >2 minutes</option>\
                    <option value="300" >5 minutes</option>\
                    <option value="600" >10 minutes</option>\
                    <option value="1800" >30 minutes</option>\
                    <option value="3600" >hour</option>\
                </select>\
            <span>\
            <div style="margin:15px;"></div>\
                <input id="auto_update_checkbox" name="auto_update_checkbox" class="element tu_checkbox" type="checkbox" value="" />\
                <label class="choice" for="auto_update_checkbox">Start updating when page loads</label>\
            </span>\
            <span>\
                <input id="disable_forms_checkbox" name="disable_forms_checkbox" class="element tu_checkbox" type="checkbox" value="1" />\
                <label class="choice" for="disable_forms_checkbox">Disable forms when thread 404s</label>\
            </span>\
            <span>\
                <input id="run_scripts_checkbox" name="run_scripts_checkbox" class="element tu_checkbox" type="checkbox" value="1" />\
                <label class="choice" for="run_scripts_checkbox">Run scripts on new posts</label>\
            </span>\
            </div>\
           <div style="margin: 5px" align="center">\
            <input id="tu_updater_prefs_submit" class="button_text" type="button" name="submit" value="Save" />\
            <input id="tu_updater_prefs_cancel" class="button_text" type="button" name="cancel" value="Cancel" />\
            </div>\
</div>\
</td></tr></table>\
</div></div></div></div>';

    // SCRIPT ENTRY POINT
    window.addEventListener("load", updater.init(), false);
})();
