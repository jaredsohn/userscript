// ==UserScript==
// @name dAmn those links 
// @namespace http://djordjeungar.com/gmscripts
// @description Adds a few handy shortcut links for visiting one's main page, journal, gallery, latest deviation etc.
// @include http://chat.deviantart.com*
// @creator http://artbit.deviantart.com
// ==/UserScript==
function wrapper_function() {
    var SCRIPT_NAME = "dAmn Those Links";
    var SCRIPT_VERSION = "0.27";
    function trim(stringToTrim) {
        return stringToTrim.replace(/^\s+|\s+$/g, "");
    }
    showInfoBox = function(channel, body) {
        var o = dAmn_MakeDiv("userinfo-outer");
        var i = dAmn_AddDiv(o, "userinfo-inner");
        var u = dAmn_AddDiv(i, "userinfo alt0");
        var t = this;
        dAmnChat_AddImgBox(u, "damncr-close", 'close', 'close', function(el) {
            dAmn_DeleteSelf(el);
            t.scroll_once = true;
            dAmn_InvalidateLayout();
        },
        o);
        var r = dAmn_AddDiv(u, 'bodyarea alt1-left-border');
        var b = dAmn_AddDiv(r, 'b read pcusers');
        dAmn_AddDiv(b, 'read', body);
        channel.addDiv(o, null, 0);
    };
    dAmnChatInput_onKey_rewire = dAmnChatInput_onKey;
    dAmnChatInput_onKey = function(e, kc, force) {
        var el = this.chatinput_el;
        var didsmth = false;
        if (kc == 13 && (force || ! this.multiline || e.shiftKey || e.ctrlKey)) {
            var input = el.value;
            var rex = /^\/(\S*)\s*(.*)$/i.exec(input);
            if (rex) {
                var cmd = rex[1];
                var param = trim(rex[2]);
                var link = "";
                //alert("cmd:"+cmd+" param:"+param);
                if (cmd) {
                    switch (cmd) {
                    case 'da':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<b>/da <i>deviant</i></b> Opens a link to the <i>deviant</i>\'s deviantArt main page in a new window.<br />');
                            break;
                        }
                        link = 'http://' + param + '.deviantart.com';
                        break;
                    case 'dab':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<b>/dab <i>deviant</i></b> Opens a form for buying a subscription for the <i>deviant</i>.<br />');
                            break;
                        }
                        link = 'http://my.deviantart.com/services/?subscribe=' + param + '#subscription';
                        break;
                    case 'daf':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<b>/daf <i>deviant</i></b> Opens the <i>deviant</i>\'s list of watchers.<br />');
                            break;
                        }
                        link = 'http://' + param + '.deviantart.com/friends/';
                        break;
                    case 'dag':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<b>/dag <i>deviant</i></b> Opens the <i>deviant</i>\'s gallery in a new window.<br />');
                            break;
                        }
                        link = 'http://' + param + '.deviantart.com/gallery/';
                        break;
                    case 'daj':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<b>/daj <i>deviant</i></b> Opens the journals page for the <i>deviant</i> in a new window.<br />');
                            break;
                        }
                        link = 'http://' + param + '.deviantart.com/journal/';
                        break;
                    case 'dal':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<b>/dal <i>deviant</i></b> Opens the <i>deviant</i>\'s latest deviation in a new window.<br />');
                            break;
                        }
                        link = 'http://' + param + '.deviantart.com/latest/';
                        break;
                    case 'dam':
                        didsmth = true;
                        if (param == "?") {
                            showInfoBox(this.channel, '<b>/dam</b> Opens your message centre page.<br />');
                            break;
                        }
                        link = 'http://my.deviantart.com/messages/';
                        break;
                    case 'dan':
                        didsmth = true;
                        if (!param || trim(param) == dAmn_Client_Username) {
                            showInfoBox(this.channel, '<b>/dan <i>deviant</i></b> Creates a new note to <i>deviant</i>(other than you) in a new window.<br />');
                            break;
                        }
                        link = 'http://my.deviantart.com/notes/?to=' + param;
                        break;
                    case 'dap':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<b>/dap <i>deviant</i></b> Opens a new window with the <i>deviant</i>\'s store front.<br />');
                            break;
                        }
                        link = 'http://' + param + '.deviantart.com/store/';
                        break;
                    case 'dar':
                        didsmth = true;
                        if (param == "?") {
                            showInfoBox(this.channel, '<b>/dar</b> Opens a random deviant page in a new window.<br />');
                            break;
                        }
                        link = 'http://www.deviantart.com/random/deviant';
                        break;
                    case 'das':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<b>/das <i>search_string</i></b> Opens a new window and searches the deviantArt for the <i>search_string</i>.<br />');
                            break;
                        }
                        link = 'http://search.deviantart.com/searchcraft/?cmd=1&offset=0&search=' + param;
                        break;
                    case 'dat':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<b>/dat <i>deviant</i></b> Opens a new window with the <i>deviant</i>\'s scraps (trash not a good word but easy to memorize).<br />');
                            break;
                        }
                        link = 'http://' + param + '.deviantart.com/gallery/scraps/';
                        break;
                    case 'dah':
                    case 'da?':
                        didsmth = true;
                        if (!param) {
                            showInfoBox(this.channel, '<span style="font-size:1.1em;"><a href="http://artbit.deviantart.com/art/dAmn-those-links-v0-21-54306000"><b>' + SCRIPT_NAME + '</b> v' + SCRIPT_VERSION + '</a></span> - adds the functionality to quickly access deviantArt pages using only a few simple commands.<br /><br />' + '<b>Here is the list of commands: </b><br />' + '<table style="padding:5px;"><thead></thead>' + '<tr><td><b>/da deviant</b></td><td> - Opens a link to the <b>deviant</b>\'s deviantArt main page in a new window.</td></tr>' + '<tr><td><b>/dab deviant</b></td><td> - Opens a form for buying a subscription for the <b>deviant</b>.</td></tr>' + '<tr><td><b>/daf deviant</b></td><td> - Opens the <b>deviant</b>\'s list of watchers (friends).</td></tr>' + '<tr><td><b>/dag deviant</b></td><td> - Opens the <b>deviant</b>\'s gallery in a new window.</td></tr>' + '<tr><td><b>/dah</b> or <b>/da?</b></td><td> - Shows this screen.</td></tr>' + '<tr><td><b>/daj deviant</b></td><td> - Opens the journal page for the <b>deviant</b> in a new window.</td></tr>' + '<tr><td><b>/dal deviant</b></td><td> - Opens the <b>deviant</b>\'s latest deviation in a new window.</td></tr>' + '<tr><td><b>/dam</b></td><td> - Opens your message centre in a new window.</td></tr>' + '<tr><td><b>/dan deviant</b></td><td> - Creates a new note to <b>deviant</b>(other than you) in a new window.</td></tr>' + '<tr><td><b>/dap deviant</b></td><td> - Opens a new window with the <b>deviant</b>\'s store front (prints).</td></tr>' + '<tr><td><b>/dar</b></td><td> - Opens a random deviant page in a new window.</td></tr>' + '<tr><td><b>/das query</b></td><td> - Opens a new window and searches the deviantArt for the <b>query</b>.</td></tr>' + '<tr><td><b>/dat deviant</b></td><td> - Opens a new window with the <b>deviant</b>\'s scraps (trash - not a good word but easy to memorize).</td></tr>' + '</tbody></table>');
                            break;
                        }
                        link = 'http://' + param + '.deviantart.com/gallery/scraps/';
                        break;
                    } //end case
                    if (didsmth) {
                        if (el.value) {
                            //add to history array
                            if (this.history_pos != - 1 && this.history[this.history_pos] == el.value) { // posting from history.. move to the end
                                var before = this.history.slice(0, this.history_pos);
                                var after = this.history.slice(this.history_pos + 1);
                                this.history = before.concat(after).concat(this.history[this.history_pos]);
                            } else {
                                // add to history -- limit to 300
                                this.history = this.history.concat(el.value);
                                if (this.history.length > 300) this.history = this.history.slice(1);
                            }
                            this.history_pos = - 1;
                            el.value = '';
                            if (link) window.open(link);
                            el.focus();
                        }
                    }
                }
            }
        }
        if (!didsmth) return this.onKey_rewire(e, kc, force) ? true: false;
        else return false;
    };
    dAmnChatInput.prototype.onKey = dAmnChatInput_onKey;
    dAmnChatInput.prototype.onKey_rewire = dAmnChatInput_onKey_rewire;
} // end wrapper_function
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + wrapper_function + ')();'));
document.body.appendChild(script);