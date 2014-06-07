// ==UserScript==
// @name          4chan toolbox
// @author        Dom
// @date	  09-08-2011
// @namespace     http://www.dominic-uk.com/
// @version	  v1.0.0
// @description   4chan toolbox
// @include       http://*.4chan.org/*/res/*.html
// @include       http://*.4chan.org/*/res/*.html#*
// ==/UserScript==


var Dom = {
	id: function(id) { return document.getElementById(id); },

	new: function(type, attrs, text) {
		if (type=='#')
			type = 'span';
		var e = document.createElement(type);
		if (attrs)
			for (attr in attrs)
				e.setAttribute(attr, attrs[attr]);
		if (text)
			e.textContent = text;
		return e;
	},

	newText: function(text, attrs) { return Dom.new('#', attrs, text); },

	del: function(e) {
		if (e instanceof Array)
			for each (i in e)
				Dom.del(i);
		else if (e&&e.parentNode) e.parentNode.removeChild(e);
	},

	X: function(xpath, root) {
		var nodes = document.evaluate(xpath, root ? root : document.body, null, 0, null);
		var result = [];
		switch (nodes.resultType) {
			case nodes.STRING_TYPE: return nodes.stringValue;
			case nodes.NUMBER_TYPE: return nodes.numberValue;
			case nodes.BOOLEAN_TYPE: return nodes.booleanValue;
			default:
				while (node = nodes.iterateNext())
					result.push(node);
				return result;
		}
	}
};

function postField(field)
{
	return Dom.X("div[@class='postarea'][1]/form[@name='post'][1]//input[@name='"+field+"'][1]")[0];
};

function addbutton(name, anchor)
{
	var button = Dom.new('input', {id: '4sel_post_email_' + name, type: 'button', name: '4sel_post_email_' + name});
	button.value = name; // button caption
	button.addEventListener('click', (function() { emailfield.value = name; }), false);
	anchor.appendChild(button);
};

var emailfield = postField('email');
var anchor = emailfield.parentNode;

emailfield.id = '4sel_post_email';
emailfield.style.width = '300px';

addbutton("sage", anchor);
addbutton("noko", anchor);
var embed = document.getElementsByTagName('embed')[0];
var embed_parent = embed.parentNode;
embed_parent.removeChild(embed);
(function() {  // vim won't indent correctly without this -> )

    // PREFERENCES: Change these to suit your taste.
    const POLL_INTERVAL = 20; // how often to poll the server (in seconds)
    const START_ON_PAGE_LOAD = false; // start updating automatically
    const ALERT_WHEN_THREAD_DIES = true; // show alert dialog when thread dies
    const DISABLE_FORMS_WHEN_THREAD_DIES = true; // prevent submitting to dead thread
    const TITLE_WHEN_THREAD_DIES = '(;_;)'; // window/tab title
    const NOTICE_WHEN_THREAD_DIES = 'This thread no longer exists';
    const STARTED_CAPTION = 'Updating';
    const STOPPED_CAPTION = 'Updating Halted';
    const THREAD_DIED_CAPTION = 'Saged';
    
    // Allow 4chan extension and other Greasemonkey scripts to run on new posts.
    // It takes more a bit more computing so don't use it unless you need it.
    const RUN_SCRIPTS_ON_NEW_POSTS = true; 

    const DEBUG = false; // turn this on to get log messages
    // END PREFERENCES

    var last_update = null;
    var monitor_div = null;
    var monitor_link = null;

    /* poll_timer pseudo-object to get all this shit in one place */
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
(function () {

///////////////////////////////////

var config = {
	'multiLineLinks': true,
	'targetBlank': false
}

///////////////////////////////////

function $ (a, b) { if (a && document.querySelector) return b || (b = document), b.querySelector(a); }
function $$ (a, b) { if (a && document.querySelectorAll) return b || (b = document), b.querySelectorAll(a); }
function foreach (a, f) { if (typeof(a) == 'object' && a.length && typeof(f) == 'function') { for (var i = 0; i < a.length; i++) { a[i] = f(a[i], i) || a[i]; } } }
function ce (a, b) { if (typeof(a) != 'string') return; var c = document.createElement(a); foreach(b, function (d) { if (d.nodeType == 1) { c.appendChild(d); } else if (typeof(d) == 'object' && !d.length) { for (var k in d) { c.setAttribute(k, d[k]); } } else if (typeof(d) == 'string') { c.appendChild(document.createTextNode(d)); } }); return c; }

function checkLinks (a) {
	if (!a) return;
	if (a.nodeType == 3) {
		var b = a.nodeValue.match(/[a-zA-Z]+:\/\/[^\s]+/);
		if (!b) var b = a.nodeValue.match(/mailto:\/\/[^\s]+/);
		if (!b) var b = a.nodeValue.match(/magnet:\/\/[^\s]+/);
		if (b && (a.parentNode.nodeName.toLowerCase() != 'a')) {
			var m = b[0];
			if (a.nodeValue.length == m.length) {
				var el = ce('a', [
					{'href': a.nodeValue,
					'class': 'chanlinkify'},
					a.nodeValue
				]);
				if (config.targetBlank) el.setAttribute('target', 'blank');
				a.parentNode.replaceChild(el, a);
			}
			else {
				var c = a.nodeValue.indexOf(m);
				if (a.nodeValue.substring(c-1, c) == '(') {
					if (/(.*)\x29$/.test(m)) {
						m = m.match(/(.*)\x29$/)[1];
						c = a.nodeValue.indexOf(m);
					}
				}
				if (a.nodeValue.substring(c-2, c) == '("') {
					if (/(.*)\x22\x29$/.test(m)) {
						m = m.match(/(.*)\x22\x29$/)[1];
						c = a.nodeValue.indexOf(m);
					}
				}
				if (a.nodeValue.substring(c-2, c) == '(\'') {
					if (/(.*)\x27\x29$/.test(m)) {
						m = m.match(/(.*)\x27\x29$/)[1];
						c = a.nodeValue.indexOf(m);
					}
				}
				var d = c+m.length;
				if (c != 0) a.parentNode.insertBefore(document.createTextNode(a.nodeValue.substring(0, c)), a);
				var el = ce('a', [
					{'href': m,
					'class': 'chanlinkify'},
					m
				]);
				if (config.targetBlank) el.setAttribute('target', 'blank');
				a.parentNode.insertBefore(el, a);
				if (d == a.nodeValue.length) a.parentNode.removeChild(a);
				else {
					a.nodeValue = a.nodeValue.substring(d);
					checkLinks(a);
				}
			}
		}
	}
	else if (a.className == 'unkfunc' || 'spoiler') checkLinks(a.childNodes[0]);
}

foreach($$('blockquote'), function (a) {
	foreach(a.childNodes, function (b) {
		checkLinks(b);
	});
});

foreach($$('span.filetitle'), function (b) {
	checkLinks(b.childNodes[0]);
});

document.addEventListener('DOMNodeInserted', function (e) {
	var t = e.target;
	if (t.nodeName.toLowerCase() == 'table') {
		foreach($('blockquote', t).childNodes, function (a) {
			checkLinks(a);
		});
	}
	if (t.parentNode.nodeName.toLowerCase() == 'blockquote') {
		checkLinks(t);
	}
	if (t.nodeName.toLowerCase() == 'blockquote') {
		foreach(t.childNodes, function (a) {
			checkLinks(a);
		});
	}
	if ((t.parentNode.id == 'backwash_tipcell') && (t.nodeName.toLowerCase() == 'blockquote')) {
		foreach(t.childNodes, function (a) {
			checkLinks(a);
		});
	}
}, false);

function appendNextTextNode (a) {
	var r = (a.parentNode.className == 'unkfunc') ? a.parentNode : a;
	if (r.nextSibling && (r.nextSibling.nodeName.toLowerCase() == 'br')) {
		if (r.nextSibling.nextSibling && (r.nextSibling.nextSibling.nodeType == 3)) {
			var b = r.nextSibling.nextSibling;
			var c = b.nodeValue.match(/^[^\s]+/);
			if (!c) return;
			a.href += c[0];
			a.childNodes[0].nodeValue += c[0];
			if (b.nodeValue.length == c[0].length) {
				r.parentNode.removeChild(r.nextSibling);
				r.parentNode.removeChild(b);
			}
			else {
				r.parentNode.removeChild(r.nextSibling);
				b.nodeValue = b.nodeValue.substring(c[0].length);
			}
		}
	}
}

if (config.multiLineLinks) document.addEventListener('click', function (e) {
	var t = e.target;
	if ((t.className == 'chanlinkify') && e.shiftKey && e.ctrlKey) {
		e.preventDefault();
		e.stopPropagation();
		appendNextTextNode(t);
	}
}, false);

})();
var links;
var busy=false;
var i=0;
var interval;
var docnode;

function CheckANumber(fp){
	for(var n=0;n<5;n++){
		if(i++<links.length-1){
			var lnk=links[i];
			if(lnk.innerHTML.match(/\d+XXX/)){
				lnk.href.match(/(\d+)('|$)/);
				lnk.innerHTML=RegExp.$1;
			}
		}else{
			links={};
			i=0;
			clearInterval(interval);
			busy=false;	
		}
	}
}

function fixPostNumbers()
{
	if(busy)return;
	links = document.getElementsByTagName("a");
	busy=true;
	interval=setInterval(CheckANumber,1);
}

fixPostNumbers();
document.getElementsByName('delform')[0].addEventListener ('DOMNodeInserted', fixPostNumbers, true);
var posts = document.getElementsByTagName("blockquote");

for(i = 0; i < posts.length; i++)
{
	if (posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=") != -1)
		{
			var oldText;
			var newText;
			var possibleEnd1;
			var possibleEnd2;
			var realEnd;
			var videoCode;

			realEnd = -1;

			oldText = posts[i].innerHTML;
			
			newText = oldText.substring(0, oldText.indexOf("http://www.youtube.com/watch?v="));

			possibleEnd1 = oldText.indexOf(" ", oldText.indexOf("http://www.youtube.com/watch?v="));
			possibleEnd2 = oldText.indexOf("<", oldText.indexOf("http://www.youtube.com/watch?v="));


			if (possibleEnd1 == -1 && possibleEnd2 == -1)
			{
				videoCode = oldText.substr(oldText.indexOf("http://www.youtube.com/watch?v=") + 31, 11);
				posts[i].innerHTML = newText + '<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/' + videoCode + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + videoCode + '&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>';
			}

			if (possibleEnd1 > possibleEnd2)
			{
				realEnd = possibleEnd1;
			}

			if (possibleEnd2 > possibleEnd1)
			{
				realEnd = possibleEnd2;
			}

			if (realEnd != -1)
			{
				videoCode = oldText.substr(oldText.indexOf("http://www.youtube.com/watch?v=") + 31, 11);
				posts[i].innerHTML = newText + '<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/' + videoCode + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + videoCode + '&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>' + oldText.substring(realEnd);

			}			
		}
}