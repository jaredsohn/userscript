/*
 *  Acunote Shortcuts.
 *
 *  Acunote Shortcuts is a greasemonkey script based on
 *  Javascript Keyboard Shortcuts library extracted from Acunote
 *  http://www.acunote.com/open-source/javascript-keyboard-shortcuts
 *
 *  Adds keyboard navigation for:
 *  Reddit           http://reddit.com
 *  Digg             http://digg.com
 *  YCombinator News http://news.ycombinator.com
 *
 *  Shortcuts Library Copyright (c) 2007-2008 Pluron, Inc.
 *  Reddit, Digg and YCNews Scripts Copyright (c) 2008 Pluron, Inc.
 *  Other scripts are copyright of their respective authors.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining
 *  a copy of this software and associated documentation files (the
 *  "Software"), to deal in the Software without restriction, including
 *  without limitation the rights to use, copy, modify, merge, publish,
 *  distribute, sublicense, and/or sell copies of the Software, and to
 *  permit persons to whom the Software is furnished to do so, subject to
 *  the following conditions:
 *
 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OnetPoczta Hotkeys
// @author		  Jaroslaw Kolodziejczyk
// @namespace     http://userscripts.org/users/273006
// @description   Adds cursor and keyboard shortcuts for poczta.onet.pl
// @include       http://beta.poczta.onet.pl*
// @include       https://beta.poczta.onet.pl*
// @copyright	  Pluron, Jaroslaw Kolodziejczyk
// @version		  0.0.1
// ==/UserScript==

// TODO zaznaczanie pierwszego elementu przy listowaniu maili
// TODO help -- z zaznaczeniem aktualnych możliwości w kontekscie folder/mail
// TODO menu GM
// TODO katalog Archiwum -- 'e' przenosi danego maila do tego katalogu
// TODO autoarchiwizacja -- przeniesienie maili starszych niż 1mc do Archiwum

/*
// TODO upload na userscript + zmiana SUC_script_num
var SUC_script_num = 20145; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
*/


var w = null;
//It is not necessary to use unsafeWindow for non-Firefox browsers
//Opera & WebKit/Safari provide full access to window object;
if (typeof unsafeWindow !== 'undefined') {
    w = unsafeWindow;
} else {
    w = window;
}

/*
 *  ===========================================================
 *  Acunote Shortcuts: The Library
 *  Copyright (c) 2007-2008 Pluron, Inc.
 *  Copyright (c) 2011 Jaroslaw Kolodziejczyk
 *  ===========================================================
 */
function ShortcutsSource() {

	var version = '20101230 1412';
	//meta http-equiv content-type charset=iso-8859-
	function dbg(msg, label) {
		//@JSD_LOG msg
		//if(window.dump)	{ dump('dump: ' + msg + "\n");	}
		if(typeof window.console !== 'undefined'){
			if(typeof msg == 'string'){
				window.console.log('-> '+ msg)
			}
			else{
				if(label == 'undefined'){
					window.console.dir(msg);
				}
				else{
					window.console.group(label+' '+typeof msg);
					window.console.dir(msg);
					window.console.groupEnd();
				}
			}
		}
		else if(typeof GM_log !== 'undefined')		{ GM_log(label + msg);}
		else if(typeof Common !== 'undefined')		{Common.message_controller.showNotification(label + ': ' + msg);}
		else{	alert(label + ' ' + msg)}
	}


	var shortcutListener = {

        listen: true,

        shortcut: null,
        combination: '',
        lastKeypress: 0,
        clearTimeout: 2000,

        // Keys we don't listen 
        keys: {
            KEY_BACKSPACE: 8,
            KEY_TAB:       9,
//            KEY_ENTER:    13,
            KEY_SHIFT:    16,
            KEY_CTRL:     17,
            KEY_ALT:      18,
            KEY_ESC:      27,
//            KEY_SPACE:    32,
            KEY_LEFT:     37,
            KEY_UP:       38,
            KEY_RIGHT:    39,
            KEY_DOWN:     40,
            KEY_DELETE:   46,
            KEY_HOME:     36,
            KEY_END:      35,
            KEY_PAGEUP:   33,
            KEY_PAGEDOWN: 34
        },

        init: function() {
            if (!window.SHORTCUTS) return false;
            this.createStatusArea();
            this.setObserver();
        },

        isInputTarget: function(e) {
            var target = e.target || e.srcElement;
            if (target && target.nodeName) {
                var targetNodeName = target.nodeName.toLowerCase();
                if (targetNodeName == "textarea" || targetNodeName == "select" ||
                    (targetNodeName == "input" && target.type &&
                        (target.type.toLowerCase() == "text" ||
                            target.type.toLowerCase() == "password"))
                                )  {
                    return true;
                }
            }
            return false;
        },

        stopEvent: function(event) {
            if (event.preventDefault) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.returnValue = false;
                event.cancelBubble = true;
            }
        },


        // shortcut notification/status area
        createStatusArea: function() {
            var area = document.createElement('div');
            area.setAttribute('id', 'shortcut_status');
            area.style.display = 'none';
            document.body.appendChild(area);
        },

        showStatus: function() {
            document.getElementById('shortcut_status').style.display = '';
        },

        hideStatus: function() {
            document.getElementById('shortcut_status').style.display = 'none';
        },

        showCombination: function() {
            var bar = document.getElementById('shortcut_status');
            bar.innerHTML = this.combination;
            this.showStatus();
        },

        // This method creates event observer for the whole document
        // This is the common way of setting event observer that works 
        // in all modern brwosers with "keypress" fix for
        // Konqueror/Safari/KHTML borrowed from Prototype.js
        setObserver: function() {
            var name = 'keypress';
            if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || document.detachEvent) {
            name = 'keydown';
            }
            if (document.addEventListener) {
                document.addEventListener(name, function(e) {shortcutListener.keyCollector(e)}, false);
            } else if (document.attachEvent) {
                document.attachEvent('on'+name, function(e) {shortcutListener.keyCollector(e)});
            }
        },

        // Key press collector. Collects all keypresses into combination 
        // and checks it we have action for it
        keyCollector: function(e) {
            // do not listen if no shortcuts defined
            if (!window.SHORTCUTS) return false;
            // do not listen if listener was explicitly turned off
            if (!shortcutListener.listen) return false;
            // leave modifiers for browser
            if (e.altKey || e.ctrlKey || e.metaKey) return false;
            var keyCode = e.keyCode;
            // do not listen for Ctrl, Alt, Tab, Space, Esc and others
            for (var key in this.keys) {
                if (e.keyCode == this.keys[key]) return false;
            }
            // do not listen for functional keys
            if (navigator.userAgent.match(/Gecko/)) {
                if (e.keyCode >= 112 && e.keyCode <=123) return false;
            }
            // do not listen in input/select/textarea fields
            if (this.isInputTarget(e)) return false;
            // get letter pressed for different browsers
            var code = e.which ? e.which : e.keyCode
            var letter = String.fromCharCode(code).toLowerCase();
            if (e.shiftKey) letter = letter.toUpperCase();
            // IE hack to support "?"
            if (window.ie && (code == 191) && e.shiftKey) {
                letter = '?';
            }
			if(code == 13) {
				letter = 'KEY_ENTER';
			}
            if (shortcutListener.process(letter)) shortcutListener.stopEvent(e);
        },

        // process keys
        process: function(letter) {
            if (!window.SHORTCUTS) return false;
            if (!shortcutListener.listen) return false;
            // if no combination then start from the begining
            if (!shortcutListener.shortcut) { shortcutListener.shortcut = SHORTCUTS; }
            // if unknown letter then say goodbye
            if (!shortcutListener.shortcut[letter]) return false
            if (typeof(shortcutListener.shortcut[letter]) == "function") {
                shortcutListener.shortcut[letter]();
                shortcutListener.clearCombination();
            } else {
                shortcutListener.shortcut = shortcutListener.shortcut[letter];
                // append combination
                shortcutListener.combination = shortcutListener.combination + letter;
                if (shortcutListener.combination.length > 0) {
                    shortcutListener.showCombination();
                    // save last keypress timestamp (for autoclear)
                    var d = new Date;
                    shortcutListener.lastKeypress = d.getTime();
                    // autoclear combination in 2 seconds
                    setTimeout("shortcutListener.clearCombinationOnTimeout()", shortcutListener.clearTimeout);
                };
            }
            return true;
        },

        // clear combination
        clearCombination: function() {
            shortcutListener.shortcut = null;
            shortcutListener.combination = '';
            this.hideStatus();
        },

        clearCombinationOnTimeout: function() {
            var d = new Date;
            // check if last keypress was earlier than (now - clearTimeout)
            // 100ms here is used just to be sure that this will work in superfast browsers :)
            if ((d.getTime() - shortcutListener.lastKeypress) >= (shortcutListener.clearTimeout - 100)) {
                shortcutListener.clearCombination();
            }
        }
    }
}

/*
 *  ===========================================================
 *  Shortcuts Library: OnetPoczta
 *  Copyright (c) 2010 Jaroslaw Kolodziejczyk
 *  ===========================================================
 */
function OnetPocztaSource() {
    var OPCursorStyles = 
        '#shortcut_status { background: #f00;color: #fff;padding: 5px;position: absolute;top: 40px;right: 10px;}';

    var Cursor = {
		cursor: 0,
		cursors: 0,

        init: function() {
            this.addStyles(OPCursorStyles);
            shortcutListener.init();
			Cursor.cursor_reset();
			Cursor._cursor_move(Cursor.cursor);
        },

        help: function() {
			Popup.showConfirm(
//            alert(
			'? &nbsp; -- help<br>' +
			'h &nbsp; -- prev page/mail<br>' +
			'l &nbsp; -- next page/mail<br>' +
			'c &nbsp; -- compose new mail<br>' +
			'C &nbsp; -- compose new mail in new window<hr>' +
			'g s -- go to Wys\u0142ane<br>' +
			'g i -- go to Odebrane<br>' +
			'g d -- go to Szkice<br>' +
			'g S -- go to SPAM<hr>' +
//			'A   -- mark all as read<br><br>' +
			'm s -- mark as SPAM<br>' +
			'/ &nbsp; -- search<br>' +
			'j &nbsp; -- next mail<br>' +
			'k &nbsp; -- prev mail<hr>' +
			'&lt;space&gt; -- select mail<br>' +
			'&lt;enter&gt; -- read mail<br>' +
			'<br>[version: ' + version + ']'
			);
        },

		gotoPage : function(page) {
			//FIXME ę
			Common.message_controller.showNotification('Odczytuje folder ' + page + '...')
			FolderList.refresh(page);
			Cursor.cursor_reset();
		},

		cursor_reset : function() {
   			Cursor.cursor = 0;
			Cursor.cursors = 0;
		},

		newmail : function(new_window) {
			NewMail.newWindowMail(new_window);
		},

		__where : function() {
			path = window.location.hash;
			return Page.curmodule;
		},

		next : function() {
			if(Cursor.__where() == 'readmail')
					ReadMail.Pager.next();
			else if(Cursor.__where() == 'mails')
					MailListCreator.Pager.next();
		},

		prev : function() {
			if(Cursor.__where() == 'readmail')
					ReadMail.Pager.prev();
			else if(Cursor.__where() == 'mails')
					MailListCreator.Pager.prev();
		},

		search : function() {
			if ($('#searchBoxKeyword')){
				$('#searchBoxKeyword').focus();
			}
		},

//TODO 
		mark_all_as_read : function() {
//			Actiontoolbar.triggerMoreMenu();
			$('#mails-inbox-more').click().delay(100);
			$('mails-menu-unreaded-item').click();
//			$('#mails-inbox-more').click();
//			$('#mails-menu-unreaded-item.mails-menu-item.inactive-menu').click();
		},

		mark_as_spam: function(){
			if(!$("#mails-actions-inbox-spam").attr('class').match('disableButton')) {
//				dbg($("#mails-actions-inbox-spam").attr('class'), 'mark-as-spam');
				MailListCreator.moveToSpamConfirm();
			} else if(!$("#mails-actions-spam-spam").attr('class').match('disableButton')) {
				MailListCreator.restoreFromSpamConfirm();
			}
		},

		_cursor_move : function(move_to) {
//		   dbg(Cursor.cursor + ' => ' + move_to, '_cursor_move');
			if(Cursor.cursors == 0){ //zakladam, ze jeszcze nie bylo liczenia
				Cursor.cursors = $('div').filter(function() { return this.id.match(/mails_div_item_.*/)}).length;
			}

			if(move_to < 0) {
				//return false;
				move_to = 0; //na wypadek wcisniecia najpierw 'k' -- niech sie kursor pokaze
			}

			if(move_to >= Cursor.cursors){
				//return false;
				move_to = Cursor.cursors-1;
			}

			$('#mid_'+Cursor.cursor).parent().parent().css('background-color', '');
		    Cursor.cursor = move_to;
			$('#mid_'+Cursor.cursor).parent().parent().css('background-color', '#ddd37f');
			$('#mid_'+Cursor.cursor).focus();
			//FIXME spacja zaznacza checkboxa i scrolluje okienko
			Cursor._scroll();

		    $('#mid_'+Cursor.cursor).click(function(e) {
					Cursor._scroll();
				});
		},

		_scroll: function () {
			   var offset = window.pageYOffset;
			   var innerHeight = window.innerHeight;

			   cur_off = $('#mid_'+Cursor.cursor).offset().top;
//			   dbg('Scroll? cur='+ Cursor.cursor + ' cur_off=' + cur_off + ' off=' + offset + ' iH=' + innerHeight);

			   if( (cur_off < (offset + 100)) ||
					   (cur_off > (offset - 100 + innerHeight))){
				   window.scrollTo(0, cur_off - (innerHeight/2));
			   }
		   },

		cursor_enter : function() {
		   $('#mid_'+Cursor.cursor).parent().parent().find("li.listSubject").click()
		},

		cursor_next : function() {
			cur_to = Cursor.cursor + 1;
			Cursor._cursor_move(cur_to);
		},

		cursor_prev : function() {
			cur_to = Cursor.cursor - 1;
			Cursor._cursor_move(cur_to);
		},

        addStyles: function(css) {
            var head, style, text;
            head = document.getElementsByTagName('head')[0];
            if (!head) { return; }
            style = document.createElement('style');
            style.type = 'text/css';
            text = document.createTextNode(css);
            style.appendChild(text);
            head.appendChild(style);
        }
    }

    var SHORTCUTS = {
        '?': function() { Cursor.cursor_reset(); Cursor.help(); },
        'h': function() { Cursor.cursor_reset(); Cursor.prev(); },
        'l': function() { Cursor.cursor_reset(); Cursor.next(); },
        '/': function() { Cursor.search(); },
		'g' : {
	        's': function() { Cursor.gotoPage("Wys\u0142ane"); },
	        'S': function() { Cursor.gotoPage("SPAM"); },
	        'i': function() { Cursor.gotoPage('Odebrane'); },
	        'd': function() { Cursor.gotoPage('Szkice'); },
		},
		'm' : {
			's': function() { Cursor.mark_as_spam(); },
		},
		'c': function() { Cursor.cursor_reset(); Cursor.newmail(0); },
		'C': function() { Cursor.cursor_reset(); Cursor.newmail(1); },
		'A': function() { Cursor.mark_all_as_read(); },

		'j': function() { Cursor.cursor_next(); },
		'k': function() { Cursor.cursor_prev(); },
		'KEY_ENTER': function() { Cursor.cursor_enter();},
//		' ': function() { Cursor.cursor_enter();},
    }
}


/*
 *  ===========================================================
 *  Shortcuts Library: Supported Sites
 *  This greasemonkey script matches site URL against the
 *  property name and gets the source of the function
 *  specified as property value.
 *  ===========================================================
 */
var SupportedSites = {
	'beta.poczta.onet.pl':	OnetPocztaSource
}

/*
 *  ===========================================================
 *  Shortcuts Library: Loader
 *  Copyright (c) 2008 Pluron, Inc.
 *  ===========================================================
 */
var addScript = function(ShortcutsSource) {
    var getSource = function (func) {
        var js = func.toString(),
            i = js.indexOf('{');
        js = js.substr(i + 1, js.length - i - 2);
        return js;
    }
    var script = document.createElement('script'),
        source = getSource(ShortcutsSource);
    
    for (site in SupportedSites) {
        if (typeof(site) != 'string')
            continue;
        if (location.href.match(site)) {
            source += getSource(SupportedSites[site]) + '\n window.Cursor.init();';
            break;
        }
    }
    
    var text = document.createTextNode(source);
    script.appendChild(text);
    script.setAttribute('id','acunoteKeyboardShortcuts');
    if (!document.getElementById('acunoteKeyboardShortcuts')) {
        document.body.appendChild(script);
    }
}
addScript(ShortcutsSource);

