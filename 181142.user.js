// ==UserScript==
// @name        InstaSynch Addons
// @namespace   Bibby
// @description adds lots of features 
// @include     http://*.instasynch.com/*
// @include     http://instasynch.com/*
// @version     1.34.2.4

// @author      faqqq
// @contributor fugXD
// @contributor Rollermiam
// @contributor BigBubba
// @contributor dirtyharry
// @contributor Catmosphere

// @grant       unsafeWindow
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_setClipboard
// @grant       GM_addStyle
// @grant       GM_info
// @grant       GM_log
// @grant       GM_getResourceText

// @require     https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @source      http://github.com/Bibbytube/Instasynch-Addons
// @downloadURL http://userscripts.org/scripts/source/181142.user.js
// @updateURL   http://userscripts.org/scripts/source/181142.meta.js

// @icon        http://i.imgur.com/bw2Zthys.jpg
// @icon64      http://i.imgur.com/f3vYHNNs.jpg

// @resource    fullscreenCSS https://raw.github.com/Bibbytube/Instasynch-Addons/master/General%20Additions/Control%20Bar/fullscreen.css
// @resource    largeLayoutCSS https://raw.github.com/Bibbytube/Instasynch-Addons/master/General%20Additions/Large%20Layout/largeLayout.css
// @resource    GM_configCSS https://raw.githubusercontent.com/Bibbytube/Instasynch-Addons/master/General%20Additions/Settings%20Loader/GMconfig.css
// @resource    bigPlaylistCSS https://raw.github.com/Bibbytube/Instasynch-Addons/master/Playlist%20Additions/BigPlaylist/bigPlaylist.css
// @resource    generalCSS https://raw.githubusercontent.com/Bibbytube/Instasynch-Addons/master/General%20Additions/general.css

// @resource    defaultTheme https://raw.githubusercontent.com/Bibbytube/Instasynch-Addons/master/General%20Additions/Themes/defaultTheme.css
// ==/UserScript==
/*
    <InstaSynch - Watch Videos with friends.>
    Copyright (C) 2014  InstaSynch
 
    <Bibbytube - Modified InstaSynch client code>
    Copyright (C) 2014  Bibbytube
 
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
     
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
    http://opensource.org/licenses/GPL-3.0
*/

var settingsFields = {},
    $ = unsafeWindow.$,
    jQuery = $,
    $f = unsafeWindow.$f,
    events = new(function() {
        var listeners = {};

        this.bind = function(eventName, callback, preOld) {
            if (listeners[eventName] === undefined) {
                listeners[eventName] = [];
            }
            listeners[eventName].push({
                callback: callback,
                preOld: preOld | false
            });
        };
        this.once = function(eventName, callback, preOld) {
            this.unbind(eventName, callback);
            this.bind(eventName, callback, preOld);
        };
        this.unbind = function(eventName, callback) {
            var i;
            if (listeners[eventName] !== undefined) {
                for (i = 0; i < listeners[eventName].length; i += 1) {
                    if (listeners[eventName][i].callback === callback) {
                        listeners[eventName].splice(i, 1);
                        i -= 1;
                    }
                }
            }
        };
        this.fire = function(eventName, parameters, preOld) {
            var i,
                listenersCopy;
            preOld = preOld | false;
            if (listeners[eventName] === undefined) {
                return;
            }
            listenersCopy = [].concat(listeners[eventName]);

            for (i = 0; i < listenersCopy.length; i += 1) {
                if (!(listenersCopy[i].preOld ^ preOld)) {
                    try {
                        listenersCopy[i].callback.apply(this, parameters);
                    } catch (err) {
                        logError(listenersCopy[i].callback, err);
                    }
                }
            }
        };
    })();

function setField(field) {
    if (field.section) {
        settingsFields[field.section] = settingsFields[field.section] || {};
        if (field.subsection) {
            settingsFields[field.section][field.subsection] = settingsFields[field.section][field.subsection] || {};
            settingsFields[field.section][field.subsection][field.name] = field.data;
        } else {
            settingsFields[field.section][field.name] = field.data;
        }
    } else {
        settingsFields[field.name] = field.data;
    }
}

function postConnect() {
    events.fire('onPostConnect');
    events.unbind('onUserlist', postConnect);
}

events.bind('onExecuteOnce', loadNewLoadUserlist);
events.bind('onExecuteOnce', loadGeneralStuff);
events.bind('onExecuteOnce', loadCommandLoaderOnce);
events.bind('onExecuteOnce', loadSettingsLoader);
events.bind('onExecuteOnce', loadThemesOnce);
events.bind('onExecuteOnce', loadBigPlaylistOnce);


events.bind('onPreConnect', loadBigPlaylist);
events.bind('onPreConnect', loadControlBar);
events.bind('onPreConnect', loadEvents);
events.bind('onPreConnect', loadLayout);

//events.bind('onPostConnect', );
//----------------- end  deployHeader.js-----------------
//-----------------start autocomplete.js-----------------
setField({
    'name': 'TagsAutoComplete',
    'data': {
        'label': '<a style="color:white;" href="https://github.com/Bibbytube/Instasynch/blob/master/Chat%20Additions/Messagefilter/tags.js" target="_blank">Tags</a> ([)',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Chat Additions',
    'subsection': 'Autocomplete'
});
setField({
    'name': 'EmotesAutoComplete',
    'data': {
        'label': '<a style="color:white;" href="http://dl.dropboxusercontent.com/u/75446821/Bibby/Emotes.htm" target="_blank"> Emotes</a> (/)',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Chat Additions',
    'subsection': 'Autocomplete'
});
setField({
    'name': 'CommandsAutoComplete',
    'data': {
        'label': '<a style="color:white;" href="https://github.com/Bibbytube/Instasynch-Addons#command-list" target="_blank">Commands</a> (\')',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Chat Additions',
    'subsection': 'Autocomplete'
});
setField({
    'name': 'BotCommandsAutoComplete',
    'data': {
        'label': 'Bot Commands ($)',
        'title': '$help for Bot Commands',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Chat Additions',
    'subsection': 'Autocomplete'
});
setField({
    'name': 'NamesAutoComplete',
    'data': {
        'label': 'Names (@)',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Chat Additions',
    'subsection': 'Autocomplete'
});


function loadAutoComplete() {
    var i,
        emotes = [],
        temp = Object.keys(unsafeWindow.$codes),
        tagKeys = Object.keys(tags);

    for (i = 0; i < temp.length; i += 1) {
        emotes.push('/' + temp[i]);
    }

    for (i = 0; i < tagKeys.length; i += 1) {
        tagKeys[i] = tagKeys[i].replace(/\\/g, '');
    }
    autoCompleteData = autoCompleteData.concat(emotes);
    autoCompleteData = autoCompleteData.concat(commands.get('regularCommands'));
    autoCompleteData = autoCompleteData.concat(tagKeys);
    if (isUserMod()) {
        autoCompleteData = autoCompleteData.concat(commands.get('modCommands'));
    }
    autoCompleteData.sort();

    //add the jquery autcomplete widget to InstaSynch's input field
    $("#chat input").bind("keydown", function(event) {
        // don't navigate away from the field on tab when selecting an item
        if (event.keyCode === $.ui.keyCode.TAB && isAutocompleteMenuActive) {
            event.keyCode = $.ui.keyCode.ENTER; // fake select the item
            $(this).trigger(event);
        }
    }).autocomplete({
        delay: 0,
        minLength: 0,
        source: function(request, response) {
            if (!autocomplete) {
                return;
            }
            var message = request.term,
                caretPosition = doGetCaretPosition(unsafeWindow.cin),
                lastIndex = lastIndexOfSet(message.substring(0, caretPosition), ['/', '\'', '[', '@', '$']),
                partToComplete = message.substring(lastIndex, caretPosition),
                matches = [];
            if (partToComplete.length > 0) {
                switch (partToComplete[0]) {
                    case '/':
                        if (!GM_config.get('EmotesAutoComplete') || (lastIndex !== 0 && (!message[lastIndex - 1].match(/\s/) && !message[lastIndex - 1].match(/\]/)))) {
                            return;
                        }
                        break;
                    case '\'':
                        if (!GM_config.get('CommandsAutoComplete') || (lastIndex !== 0 && !message[lastIndex - 1].match(/\s/))) {
                            return;
                        }
                        break;
                    case '[':
                        if (!GM_config.get('TagsAutoComplete')) {
                            return;
                        }
                        break;
                    case '@':
                        if (!GM_config.get('NamesAutoComplete') || (lastIndex !== 0 && !message[lastIndex - 1].match(/\s/))) {
                            return;
                        }
                        break;
                    case '$':
                        if (!GM_config.get('BotCommandsAutoComplete') || (lastIndex !== 0 && !message[lastIndex - 1].match(/\s/))) {
                            return;
                        }
                        break;
                }
                if (partToComplete[0] === '@') {
                    matches = $.map(getUsernameArray(), function(item) {
                        item = '@' + item;
                        if (item.toLowerCase().indexOf(partToComplete.toLowerCase()) === 0) {
                            return item;
                        }
                    });
                } else {
                    matches = $.map(autoCompleteData, function(item) {
                        if (item.toLowerCase().indexOf(partToComplete.toLowerCase()) === 0) {
                            return item;
                        }
                    });
                }
            }
            //show only 7 responses
            response(matches.slice(0, 7));
        },
        autoFocus: true,
        focus: function() {
            return false; // prevent value inserted on focus
        },
        select: function(event, ui) {
            var message = this.value,
                caretPosition = doGetCaretPosition(unsafeWindow.cin),
                lastIndex = lastIndexOfSet(message.substring(0, caretPosition), ['/', '\'', '[', '@', '$']);
            //prevent it from autocompleting when a little changed has been made and its already there
            if (message.indexOf(ui.item.value) === lastIndex && lastIndex + ui.item.value.length !== caretPosition) {
                doSetCaretPosition(unsafeWindow.cin, lastIndex + ui.item.value.length);
                return false;
            }
            //insert the autocompleted text and set the cursor position after it
            this.value = message.substring(0, lastIndex) + ui.item.value + message.substring(caretPosition, message.length);
            doSetCaretPosition(unsafeWindow.cin, lastIndex + ui.item.value.length);
            //if the selected item is a emote trigger a fake enter event
            if (lastIndex === 0 && ((ui.item.value[0] === '/' || ui.item.value[0] === '\'' || ui.item.value[0] === '$') && ui.item.value[ui.item.value.length - 1] !== ' ')) {
                $(this).trigger($.Event('keypress', {
                    which: 13,
                    keyCode: 13
                }));
            }
            return false;
        },
        close: function() {
            isAutocompleteMenuActive = false;
        },
        open: function() {
            isAutocompleteMenuActive = true;
        }
    });
}

function lastIndexOfSet(input, set) {
    var index = -1,
        i;
    for (i = 0; i < set.length; i += 1) {
        index = Math.max(index, input.lastIndexOf(set[i]));
    }
    if (index > 0) {
        if (input[index] === '/' && input[index - 1] === '[') {
            index -= 1;
        }
    }
    return index;
}


var isAutocompleteMenuActive = false,
    autocomplete = true,
    autoCompleteData = [];

events.bind('onResetVariables', function() {
    isAutocompleteMenuActive = false;
    autocomplete = true;
    autoCompleteData = [];
});
//----------------- end  autocomplete.js-----------------
//-----------------start autoscrollFix.js-----------------
function loadAutoscrollFix() {

    //remove autoscroll stop on hover (for now by cloning the object and thus removing all events)
    //could not figure out how to delete an anonymous function from the events
    var old_element = document.getElementById("chat_list"),
        new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    //all not working
    // var eventListeners = jQuery._data( chat_list, "events" );
    // for(var e in eventListeners){
    //     if(e === 'mouseover' || e === 'mouseout'){
    //         $('#chat_list')[0].removeEventListener(e,eventListeners[e][0]['handler']);
    //         $('#chat_list').unbind(e,eventListeners[e][0]['handler']);
    //     }
    // }
    // $('#chat_list').unbind('mouseover');
    // $('#chat_list').unbind('mouseout');
    // $('#chat_list').unbind('hover');


    //add a scrolling event to the chat
    $('#chat_list').on('scroll', function() {
        var scrollHeight = $(this)[0].scrollHeight,
            scrollTop = $(this).scrollTop(),
            height = $(this).height();

        //scrollHeight - scrollTop will be 290 when the scrollbar is at the bottom
        //height of the chat window is 280, not sure where the 10 is from
        if ((scrollHeight - scrollTop) < height * 1.05) {
            unsafeWindow.autoscroll = true;
        } else {
            unsafeWindow.autoscroll = false;
        }
    });

    //overwrite cleanChat Function so it won't clean when autoscroll is off
    //,also clean all the messages until messages === MAXMESSAGES
    unsafeWindow.cleanChat = function cleanChat() {
        var max = unsafeWindow.MAXMESSAGES;
        //increasing the maximum messages by the factor 2 so messages won't get cleared 
        //and won't pile up if the user goes afk with autoscroll off
        if (!unsafeWindow.autoscroll) {
            max = max * 2;
        }
        while (unsafeWindow.windmessages > max) {
            $('#chat_list > :first-child').remove(); //span user
            $('#chat_list > :first-child').remove(); //span message
            $('#chat_list > :first-child').remove(); //<br>
            unsafeWindow.messages -= 1;
        }
    };
}

//now added oficially on InstaSynch
//postConnectFunctions.push(loadAutoscrollFix);
//----------------- end  autoscrollFix.js-----------------
//-----------------start inputHistory.js-----------------
function loadInputHistoryOnce() {
    events.bind('onInputKeypress', function(event, message) {
        if (event.keyCode === 13 && message !== '') {
            if (inputHistoryIndex !== 0) {
                //remove the string from the array
                inputHistory.splice(inputHistoryIndex, 1);
            }
            //add the string to the array at position 1
            inputHistory.splice(1, 0, message);

            //50 messages limit (for now)
            if (inputHistory.length === 50) {
                //delete the last
                inputHistory.splice(inputHistory.length - 1, 1);
            }
        }
        setInputHistoryIndex(0);
    });
}

function loadInputHistory() {
    $("#chat input").bind('keydown', function(event) {
        if (isAutocompleteMenuActive && inputHistoryIndex === 0) {
            return;
        }
        if (event.keyCode === 38) { //upkey
            if (inputHistoryIndex < inputHistory.length) {
                setInputHistoryIndex(inputHistoryIndex + 1);
            } else {
                setInputHistoryIndex(0);
            }
            //insert the string into the text field
            $(this).val(inputHistory[inputHistoryIndex]);

        } else if (event.keyCode === 40) { //downkey
            if (inputHistoryIndex > 0) {
                setInputHistoryIndex(inputHistoryIndex - 1);
            } else {
                setInputHistoryIndex(inputHistory.length - 1);
            }
            //insert the string into the text field
            $(this).val(inputHistory[inputHistoryIndex]);
        }
    });
}

function setInputHistoryIndex(index) {
    inputHistoryIndex = index;
    if (index === 0) {
        autocomplete = true;
    } else {
        autocomplete = false;
    }
}

var inputHistory = [''],
    inputHistoryIndex = 0;
events.bind('onResetVariables', function() {
    inputHistoryIndex = 0;
});
events.bind('onPostConnect', loadInputHistory);
events.bind('onExecuteOnce', loadInputHistoryOnce);
//----------------- end  inputHistory.js-----------------
//-----------------start logInOffMessages.js-----------------
setField({
    'name': 'LogInOffMessages',
    'data': {
        'label': 'Login/off Messages',
        'type': 'checkbox',
        'default': false
    },
    'section': 'Chat Additions'
});

function userLoggedOn(user) {
    if (user.loggedin && GM_config.get('LogInOffMessages')) {
        unsafeWindow.addMessage('', String.format('{0} logged on.', user.username), '', 'hashtext');
    }
}

function userLoggedOff(id, user) {
    if (user.loggedin && GM_config.get('LogInOffMessages')) {
        unsafeWindow.addMessage('', String.format('{0} logged off.', user.username), '', 'hashtext');
    }
}

function loadLogInOffMessages() {
    events.bind('onAddUser', userLoggedOn);
    events.bind('onRemoveUser', userLoggedOff);
}

events.bind('onResetVariables', function() {
    events.unbind('onAddUser', userLoggedOn);
    events.unbind('onRemoveUser', userLoggedOff);
});
events.bind('onDisconnect', function() {
    events.unbind('onAddUser', userLoggedOn);
    events.unbind('onRemoveUser', userLoggedOff);
});
events.bind('onPostConnect', loadLogInOffMessages);
//----------------- end  logInOffMessages.js-----------------
//-----------------start me.js-----------------
function loadMe() {
    autoCompleteData = autoCompleteData.concat(['/me ']);
}

function loadMeOnce() {
    var oldAddMessage = unsafeWindow.addMessage;
    unsafeWindow.addMessage = function(username, message, userstyle, textstyle) {
        if (message.indexOf('/me ') === 0 && message.length > 4) {
            message = String.format('<span style="color:grey;">{0} {1}</span>', username.match(/(\d\d:\d\d - )?([\w\-]+)/)[2], message.substring(3));
            unsafeWindow.addMessage('', message, '', '');
        } else {
            oldAddMessage(username, message, userstyle, textstyle);
        }
    };
}
events.bind('onExecuteOnce', loadMeOnce);
events.bind('onPreConnect', loadMe);
//----------------- end  me.js-----------------
//-----------------start messagefilter.js-----------------
setField({
    'name': 'Tags',
    'data': {
        'label': 'Parse <a style="color:white;" href="https://github.com/Bibbytube/Instasynch/blob/master/Chat%20Additions/Messagefilter/tags.js" target="_blank">tags</a> in the chat',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Chat Additions'
});
setField({
    'name': 'NSFWEmotes',
    'data': {
        'label': 'NSFW Emotes',
        'title': '/meatspin /boobies',
        'type': 'checkbox',
        'default': false
    },
    'section': 'Chat Additions'
});



function loadMessageFilter() {

    var oldLinkify = unsafeWindow.linkify,
        oldAddMessage = unsafeWindow.addMessage,
        oldCreatePoll = unsafeWindow.createPoll,
        oldNSFWEmotes = GM_config.get('NSFWEmotes');

    events.bind('onSettingsOpen', function() {
        oldNSFWEmotes = GM_config.get('NSFWEmotes');
    });
    events.bind('onSettingsSave', function() {
        if (oldNSFWEmotes !== GM_config.get('NSFWEmotes')) {
            toggleNSFWEmotes();
            oldNSFWEmotes = GM_config.get('NSFWEmotes');
        }
    });

    unsafeWindow.linkify = function(str, buildHashtagUrl, includeW3, target) {
        var emotes = [],
            index = -1;
        //remove image urls so they wont get linkified
        str = str.replace(/src=\"([^\"]*)\"/gi, function(match) {
            emotes.push(match);
            return 'src=\"\"';
        });
        str = oldLinkify(str, buildHashtagUrl, includeW3, target);
        //put them back in
        str = str.replace(/src=\"\"/gi, function() {
            index += 1;
            return emotes[index];
        });
        return str;
    };
    //overwrite InstaSynch's addMessage function
    unsafeWindow.addMessage = function(username, message, userstyle, textstyle) {
        oldAddMessage(username, parseMessage(message, true), userstyle, textstyle);
        //continue with InstaSynch's addMessage function
    };
    unsafeWindow.createPoll = function(poll) {
        var i;
        poll.title = unsafeWindow.linkify(parseMessage(poll.title, false), false, true);
        for (i = 0; i < poll.options.length; i += 1) {
            poll.options[i].option = parseMessage(poll.options[i].option, false);
        }
        oldCreatePoll(poll);
    };
}

function toggleNSFWEmotes() {
    if (GM_config.get('NSFWEmotes')) {
        unsafeWindow.$codes.boobies = '<spamtag><img src="http://i.imgur.com/9g6b5.gif" width="51" height="60" spam="1"></spamtag>';
        unsafeWindow.$codes.meatspin = '<img src="http://i.imgur.com/nLiEm.gif" width="30" height="30">';
        if (autoCompleteData.length > 50) {
            autoCompleteData.push('/boobies');
            autoCompleteData.push('/meatspin');
            autoCompleteData.sort();
        }
    } else {
        delete unsafeWindow.$codes.boobies;
        delete unsafeWindow.$codes.meatspin;
        if (autoCompleteData.length > 50) {
            autoCompleteData.splice(autoCompleteData.indexOf('/boobies'), 1);
            autoCompleteData.splice(autoCompleteData.indexOf('/meatspin'), 1);
        }
    }
}

function parseMessage(message, isChatMessage) {
    var emoteFound = false,
        match = message.match(/^((\[[^\]]*\])*)\/([^\[ ]+)((\[.*?\])*)/i),
        emote,
        word,
        greentext,
        i,
        words;
    //if the text matches [tag]/emote[/tag] or /emote
    if (match && isChatMessage) {
        if (unsafeWindow.$codes.hasOwnProperty(match[3].toLowerCase())) {
            emoteFound = true;
            emote = unsafeWindow.$codes[match[3].toLowerCase()];
            message = String.format("<span class='cm'>{0}{1}{2}</span>", match[1], emote, match[4]);
        }
    } else {
        greentext = false;
        //if the text matches [tag]>* or >*
        if (message.match(/^((\[[^\]]*\])*)((&gt;)|>)/)) {
            greentext = true;
        } else {
            //split up the message and add hashtag colors #SWAG #YOLO
            words = message.split(" ");
            for (i = 0; i < words.length; i += 1) {
                if (words[i][0] === "#") {
                    words[i] = String.format("<span class='cm hashtext'>{0}</span>", words[i]);
                }
            }
            //join the message back together
            message = words.join(" ");
        }
        message = String.format("<span class='cm{0}'>{1}</span>", greentext ? ' greentext' : '', message);
    }
    if (!isChatMessage) {
        //filter all emotes
        message = parseEmotes(message);
    }
    //filter words
    for (word in filteredwords) {
        if (filteredwords.hasOwnProperty(word)) {
            message = message.replace(new RegExp(word, 'g'), filteredwords[word]);
        }
    }

    function parseAdvancedTags(match, $0, $1) {
        var ret = '',
            format;
        switch (word) {
            case 'hexcolor':
                format = '<span style="color:{0}">';
                break;
            case 'marquee':
                format = '<MARQUEE behavior="scroll" direction={0} width="100%" scrollamount="{1}">';
                $0 = ($0 ? "left" : "right");
                break;
            case 'alternate':
                format = '<MARQUEE behavior="alternate" direction="right" width="100%" scrollamount="{0}">';
                break;
            case 'spoiler':
                format = '[spoiler]{0}[/spoiler]';
                break;
        }
        ret = String.format(format, $0, $1);
        return GM_config.get('Tags') ? ret : '';
    }
    //filter advancedTags    
    for (word in advancedTags) {
        if (advancedTags.hasOwnProperty(word)) {
            message = message.replace(advancedTags[word], parseAdvancedTags);
        }
    }

    function parseTags() {
        return GM_config.get('Tags') ? tags[word] : '';
    }
    //filter tags
    for (word in tags) {
        if (tags.hasOwnProperty(word)) {
            message = message.replace(new RegExp(word, 'gi'), parseTags);
        }
    }
    //remove unnused tags [asd] if there is a emote
    if (emoteFound && isChatMessage) {
        message = message.replace(/\[[^\]]*\]/, '');
    }
    return message;
}
//parse multiple emotes in a message
function parseEmotes(message) {
    var possibleEmotes = [],
        exactMatches = [],
        emoteStart = -1,
        emote = '',
        end = false,
        i,
        j,
        code;
    while (!end) {
        emoteStart = message.indexOf('/', emoteStart + 1);
        if (emoteStart === -1) {
            end = true;
        } else {
            possibleEmotes = Object.keys(unsafeWindow.$codes);
            exactMatches = [];
            emote = '';
            for (i = emoteStart + 1; i < message.length; i += 1) {
                emote += message[i];
                for (j = 0; j < possibleEmotes.length; j += 1) {
                    if (emote.indexOf(possibleEmotes[j]) === 0) {
                        exactMatches.push(possibleEmotes[j]);
                        possibleEmotes.splice(j, 1);
                        j -= 1;
                    } else if (possibleEmotes[j].indexOf(emote) !== 0) {
                        possibleEmotes.splice(j, 1);
                        j -= 1;
                    }
                }
                if (possibleEmotes.length === 0) {
                    break;
                }
            }
            if (exactMatches.length !== 0) {
                code = unsafeWindow.$codes[exactMatches[exactMatches.length - 1]];
                if (emoteStart !== 0) {
                    if (message[emoteStart - 1] === '\\') {
                        message = message.substring(0, emoteStart - 1) + message.substring(emoteStart);
                        i = emoteStart + exactMatches[exactMatches.length - 1].length;
                    } else {
                        message = message.substring(0, emoteStart) + code + message.substring(emoteStart + exactMatches[exactMatches.length - 1].length + 1);
                        i = emoteStart + code.length;
                    }
                } else {
                    message = message.substring(0, emoteStart) + code + message.substring(emoteStart + exactMatches[exactMatches.length - 1].length + 1);
                    i = emoteStart + code.length;
                }

            }
            emoteStart = i - 1;
        }
    }
    return message;
}

var filteredwords = {
    "skip": "upvote",
    "SKIP": "UPVOTE",
    "gay": "hetero",
    "GAY": "HETERO"
};

events.bind('onExecuteOnce', loadMessageFilter);
events.bind('onPostConnect', toggleNSFWEmotes);
//----------------- end  messagefilter.js-----------------
//-----------------start tags.js-----------------
var advancedTags = {
    'hexcolor': /\[(#[0-9A-F]{1,6})\]/ig, //[#00FFAA] any hex color as tag
    'marquee': /\[marquee(-)?(\d{1,2})\]/ig, //[marquee10] marquee with specified speed
    'alternate': /\[alt(\d{1,2})\]/ig, //[alt10] alternate with specified speed
    'spoiler': /\|([^\|]*)\|/ig // |spoiler| shortcut
},
    tags = {
        '\\[black\\]': '<span style="color:black">', //colors
        '\\[/black\\]': '</span>',
        '\\[blue\\]': '<span style="color:blue">',
        '\\[/blue\\]': '</span>',
        '\\[darkblue\\]': '<span style="color:darkblue">',
        '\\[/darkblue\\]': '</span>',
        '\\[cyan\\]': '<span style="color:cyan">',
        '\\[/cyan\\]': '</span>',
        '\\[red\\]': '<span style="color:red">',
        '\\[/red\\]': '</span>',
        '\\[green\\]': '<span style="color:green">',
        '\\[/green\\]': '</span>',
        '\\[darkgreen\\]': '<span style="color:darkgreen">',
        '\\[/darkgreen\\]': '</span>',
        '\\[violet\\]': '<span style="color:violet">',
        '\\[/violet\\]': '</span>',
        '\\[purple\\]': '<span style="color:purple">',
        '\\[/purple\\]': '</span>',
        '\\[orange\\]': '<span style="color:orange">',
        '\\[/orange\\]': '</span>',
        '\\[blueviolet\\]': '<span style="color:blueviolet">',
        '\\[/blueviolet\\]': '</span>',
        '\\[brown\\]': '<span style="color:brown">',
        '\\[/brown\\]': '</span>',
        '\\[deeppink\\]': '<span style="color:deeppink">',
        '\\[/deeppink\\]': ' </span>',
        '\\[aqua\\]': '<span style="color:aqua">',
        '\\[/aqua\\]': '</span>',
        '\\[indigo\\]': '<span style="color:indigo">',
        '\\[/indigo\\]': '</span>',
        '\\[pink\\]': '<span style="color:pink">',
        '\\[/pink\\]': '</span>',
        '\\[chocolate\\]': '<span style="color:chocolate">',
        '\\[/chocolate\\]': '</span>',
        '\\[yellowgreen\\]': '<span style="color:yellowgreen">',
        '\\[/yellowgreen\\]': '</span>',
        '\\[steelblue\\]': '<span style="color:steelblue">',
        '\\[/steelblue\\]': '</span>',
        '\\[silver\\]': '<span style="color:silver">',
        '\\[/silver\\]': '</span>',
        '\\[tomato\\]': '<span style="color:tomato">',
        '\\[/tomato\\]': '</span>',
        '\\[tan\\]': '<span style="color:tan">',
        '\\[/tan\\]': '</span>',
        '\\[royalblue\\]': '<span style="color:royalblue">',
        '\\[/royalblue\\]': '</span>',
        '\\[navy\\]': '<span style="color:navy">',
        '\\[/navy\\]': '</span>',
        '\\[yellow\\]': '<span style="color:yellow">',
        '\\[/yellow\\]': '</span>',
        '\\[white\\]': '<span style="color:white">',
        '\\[/white\\]': '</span>',

        '\\[/span\\]': '</span>',
        '\\[/\\]': '</span>', //shortcut to close tags

        '\\[rmarquee\\]': '<marquee>', //move text to right
        '\\[/rmarquee\\]': '</marquee>',
        '\\[alt\\]': '<marquee behavior="alternate" direction="right">', //alternate between left and right
        '\\[/alt\\]': '</marquee>',
        '\\[falt\\]': '<marquee behavior="alternate" scrollamount="50" direction="right">', //different speeds etc.
        '\\[/falt\\]': '</marquee>',
        '\\[marquee\\]': '<marquee direction="right">',
        '\\[/marquee\\]': '</marquee>',
        '\\[rsanic\\]': '<MARQUEE behavior="scroll" direction="left" width="100%" scrollamount="50">',
        '\\[/rsanic\\]': '</marquee>',
        '\\[sanic\\]': '<MARQUEE behavior="scroll" direction="right" width="100%" scrollamount="50">',
        '\\[/sanic\\]': '</marquee>',

        '\\[spoiler\\]': "<span class=\"spoiler\">",
        '\\[/spoiler\\]': '</span>',

        '\\[italic\\]': '<span style="font-style:italic">',
        '\\[/italic\\]': '</span>',
        '\\[i\\]': '<span style="font-style:italic">', //shortcut italic
        '\\[/i\\]': '</span>',
        '\\[strike\\]': '<strike>',
        '\\[/strike\\]': '</strike>',
        '\\[-\\]': '<strike>', //shortcut strike
        '\\[/-\\]': '</strike>',
        '\\[strong\\]': '<strong>',
        '\\[/strong\\]': '</strong>',
        '\\[b\\]': '<strong>', //shortcut strong
        '\\[/b\\]': '</strong>'
    };
//----------------- end  tags.js-----------------
//-----------------start ModSpy.js-----------------
setField({
    'name': 'ModSpy',
    'data': {
        'label': 'ModSpy (mod actions will be shown in the chat)',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Chat Additions'
});

function loadModSpy() {
    // Overwriting console.log
    var oldLog = unsafeWindow.console.log,
        filterList = [
            /^Resynch requested\.\./,
            /cleaned the playlist/,
            /Using HTML5 player is not recomended\./
        ],
        filter,
        i,
        match;
    events.bind('onRemoveUser', function(id, user) {
        if (lastAction) {
            unsafeWindow.addMessage('', String.format('{0} has {1} {2}', actiontaker, lastAction, user.username), '', 'hashtext');
            lastAction = undefined;
            actiontaker = undefined;
        }
    });
    events.bind('onMoveVideo', function(vidinfo, position, oldPosition) {
        if (Math.abs(getActiveVideoIndex() - position) <= 10 && Math.abs(oldPosition - position) > 10) { // "It's a bump ! " - Amiral Ackbar
            bumpCheck = true;
        }
    });
    unsafeWindow.console.log = function(message) {
        // We don't want the cleaning messages in the chat (Ok in the console) .
        if (GM_config.get('ModSpy') && message && message.match) {
            filter = false;
            for (i = 0; i < filterList.length; i += 1) {
                if (message.match(filterList[i])) {
                    filter = true;
                    break;
                }
            }
            if (!filter) {
                if (message.match(/ moved a video/g) && bumpCheck) {
                    message = message.replace("moved", "bumped");
                    bumpCheck = false;
                } else if ((match = message.match(/([^\s]+) has banned a user\./))) {
                    lastAction = 'banned';
                    actiontaker = match[1];
                } else if ((match = message.match(/([^\s]+) has kicked a user\./))) {
                    lastAction = 'kicked';
                    actiontaker = match[1];
                }
                if (!lastAction) {
                    unsafeWindow.addMessage('', message, '', 'hashtext');
                }
            }
        }
        oldLog.apply(unsafeWindow.console, arguments);
    };
}
var bumpCheck = false,
    lastAction,
    actiontaker;
events.bind('onResetVariables', function() {
    bumpCheck = false;
});
events.bind('onExecuteOnce', loadModSpy);
//----------------- end  ModSpy.js-----------------
//-----------------start nameAutocomplete.js-----------------
function loadNameAutocomplete() {
    $("#chat input").bind('keydown', function(event) {
        if (event.keyCode === 9) { //tab
            //prevent loosing focus from input
            event.preventDefault();
            //split the message
            var message = $(this).val().split(' '),
                //make a regex out of the last part 
                messagetags = message[message.length - 1].match(/^((\[[^\]]*\])*\[?@?)([\w\-]+)/),
                name,
                partToComplete = '',
                i,
                j,
                sub,
                usernames = getUsernameArray(false);
            if (!messagetags || !messagetags[3]) {
                return;
            }
            if (!messagetags[1]) {
                messagetags[1] = '';
            }
            //make a regex out of the name
            name = new RegExp('^' + messagetags[3], 'i');

            //find matching users
            for (i = 0; i < usernames.length; i += 1) {
                if (usernames[i].match(name)) {
                    if (partToComplete === '') {
                        partToComplete = usernames[i];
                    } else {
                        //check for partial matches with other found users
                        for (j = partToComplete.length; j >= 0; j -= 1) {
                            sub = partToComplete.substring(0, j);
                            if (usernames[i].toLowerCase().indexOf(sub) === 0) {
                                partToComplete = sub;
                                break;
                            }
                        }
                    }
                }
            }
            if (partToComplete !== '') {
                //put messagetags and the autocompleted name back into the message
                message[message.length - 1] = messagetags[1] + partToComplete;
                $(this).val(message.join(' '));
            }

        }
    });
}
events.bind('onPreConnect', loadNameAutocomplete);
//----------------- end  nameAutocomplete.js-----------------
//-----------------start nameNotification.js-----------------
function loadNameNotificationOnce() {
    var found = false,
        oldAddMessage = unsafeWindow.addMessage;
    unsafeWindow.addMessage = function(username, message, userstyle, textstyle) {
        found = false;
        message = message.replace(new RegExp(String.format('@{0}', thisUsername), 'gi'),
            function(match) {
                found = true;
                return String.format('<strong><font color=red>{0}</font></strong>', match);
            });
        oldAddMessage(username, message, userstyle, textstyle);
        if (!unsafeWindow.newMsg) {
            return;
        }
        if (found && !notified) {
            toggleNotify();
        }
    };
    $('link').each(function() {
        if ($(this).attr('href') === '/favicon.ico') {
            $(this).attr('id', 'favicon');
            $(this).attr('type', 'image/png');
            $(this).attr('href', 'http://i.imgur.com/BMpkAgE.png');
        }
    });
}

function loadNameNotification() {
    $('#cin').focus(function() {
        if (notified) {
            toggleNotify();
        }
    });
}
var notified = false;

function toggleNotify() {
    if (unsafeWindow.newMsg && !notified) {
        $('#favicon').attr('href', 'http://i.imgur.com/XciFozw.png');
        notified = true;
    } else {
        $('#favicon').attr('href', 'http://i.imgur.com/BMpkAgE.png');
        notified = false;
    }
}

events.bind('onResetVariables', function() {
    $('head > link:first-of-type')[0].href = "http://i.imgur.com/BMpkAgE.png";
    notified = false;
});
events.bind('onPreConnect', loadNameNotification);
events.bind('onExecuteOnce', loadNameNotificationOnce);
//----------------- end  nameNotification.js-----------------
//-----------------start OnClickKickBan.js-----------------
function loadOnClickKickBanOnce() {

    function kickOrBan(kick, ban, text) {
        if (!kick) {
            return;
        }
        var user = text,
            userFound = false,
            isMod = false,
            userId,
            i,
            action = ban ? 'ban' : 'kick';
        user = user.match(/(\d\d:\d\d - )?([\w\-]+)/)[2];
        for (i = 0; i < unsafeWindow.users.length; i += 1) {
            if (unsafeWindow.users[i].username === user) {
                if (unsafeWindow.users[i].permissions > 0) {
                    isMod = true;
                    break;
                }
                userId = unsafeWindow.users[i].id;
                userFound = true;
                break;
            }
        }
        if (isMod) {
            unsafeWindow.addMessage('', String.format("Can't {0} a mod", action), '', 'hashtext');
        } else {
            if (userFound) {
                unsafeWindow.global.sendcmd(action, {
                    userid: userId
                });
            } else {
                if (ban) {
                    unsafeWindow.global.sendcmd('leaverban', {
                        username: user
                    });
                    unsafeWindow.addMessage('', 'Leaverb& user: ' + user, '', 'hashtext');
                } else {
                    unsafeWindow.addMessage('', "Didn't find the user", '', 'hashtext');
                }
            }
        }
    }
    events.bind('onAddMessage', function(username) {
        if (username === '' || !isUserMod()) {
            return;
        }
        var currentElement,
            //the cursor doesnt need to be changed if the key is still held down
            isCtrlKeyDown = false,
            keyDown = function(event) {
                if (!isCtrlKeyDown && (event.ctrlKey || (event.ctrlKey && event.altKey))) {
                    isCtrlKeyDown = true;
                    currentElement.css('cursor', 'pointer');
                }
            },
            keyUp = function(event) {
                if (isCtrlKeyDown && !event.ctrlKey) {
                    isCtrlKeyDown = false;
                    currentElement.css('cursor', 'default');
                }
            };
        //add the events to the latest username in the chat list
        $('#chat_list > span:last-of-type').prev()
            .on('click', function(event) {
                kickOrBan(event.ctrlKey, event.altKey, $(this)[0].innerHTML);
            })
            .hover(function() {
                currentElement = $(this);
                $(document).bind('keydown', keyDown);
                $(document).bind('keyup', keyUp);
            }, function() {
                currentElement.css('cursor', 'default');
                isCtrlKeyDown = false;
                $(document).unbind('keydown', keyDown);
                $(document).unbind('keyup', keyUp);
            });
    });

}

function loadOnClickKickBan() {
    var chatCtrlDown = false;

    function chatKeyDown(event) {
        if (!chatCtrlDown && (event.ctrlKey || (event.ctrlKey && event.altKey))) {
            unsafeWindow.autoscroll = false;
            $('#chat_list').bind('scroll', blockEvent);
            chatCtrlDown = true;
        }
    }

    function chatKeyUp(event) {
        if (chatCtrlDown && !event.ctrlKey) {
            unsafeWindow.autoscroll = true;
            $('#chat_list').unbind('scroll', blockEvent);
            $('#chat_list').scrollTop($('#chat_list')[0].scrollHeight);
            chatCtrlDown = false;
        }
    }
    $('#chat_list').hover(
        function() {
            $(document).bind('keydown', chatKeyDown);
            $(document).bind('keyup', chatKeyUp);
        },
        function() {
            chatCtrlDown = false;
            $(document).unbind('keydown', chatKeyDown);
            $(document).unbind('keyup', chatKeyUp);
        }
    );
}


events.bind('onPostConnect', loadOnClickKickBan);
events.bind('onExecuteOnce', loadOnClickKickBanOnce);
//----------------- end  OnClickKickBan.js-----------------
//-----------------start playMessages.js-----------------
/*
    Copyright (C) 2014  fugXD
*/

setField({
    'name': 'PlayMessages',
    'data': {
        'label': 'PlayMessages',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Chat Additions'
});

function loadPlayMessages() {
    events.bind('onPlayVideo', function(vidinfo, time, playing, indexOfVid) {
        if (GM_config.get('PlayMessages')) {
            unsafeWindow.addMessage('', 'Now playing: ' + trimTitle(unsafeWindow.playlist[indexOfVid].title, 240), '', 'hashtext');
        }
    });
}
events.bind('onExecuteOnce', loadPlayMessages);
//----------------- end  playMessages.js-----------------
//-----------------start timestamp.js-----------------
setField({
    'name': 'Timestamp',
    'data': {
        'label': 'Timestamp (in front of messages)',
        'type': 'checkbox',
        'default': false
    },
    'section': 'Chat Additions'
});

function loadTimestamp() {
    var oldAddMessage = unsafeWindow.addMessage,
        date,
        hours,
        minutes;

    //overwrite InstaSynch's addMessage function
    unsafeWindow.addMessage = function(username, message, userstyle, textstyle) {
        if (GM_config.get('Timestamp')) {
            date = new Date();
            minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            hours = date.getHours();
            if (hours < 10) {
                hours = "0" + hours;
            }
            username = hours + ":" + minutes + " - " + username;
        }
        oldAddMessage(username, message, userstyle, textstyle);
        //continue with InstaSynch's addMessage function
    };
}

events.bind('onExecuteOnce', loadTimestamp);
//----------------- end  timestamp.js-----------------
//-----------------start botCommands.js-----------------
function loadBotCommands() {
    var emptyFunc = function() {};

    commands.set('modCommands', "$autoclean", emptyFunc);
    commands.set('modCommands', "$addRandom ", emptyFunc);
    commands.set('modCommands', "$addToUserBlacklist ", emptyFunc);
    commands.set('modCommands', "$addToVideoBlacklist ", emptyFunc);
    commands.set('modCommands', "$addAutobanMessage ", emptyFunc);
    commands.set('modCommands', "$clearAutobanMessages", emptyFunc);
    commands.set('modCommands', "$voteBump ", emptyFunc);
    commands.set('modCommands', "$shuffle ", emptyFunc);
    commands.set('modCommands', "$exportUserBlacklist", emptyFunc);
    commands.set('modCommands', "$poll ", emptyFunc);
    commands.set('modCommands', "$mute", emptyFunc);
    commands.set('modCommands', "$bump ", emptyFunc);

    commands.set('regularCommands', "$translateTitle ", emptyFunc);
    commands.set('regularCommands', "$languageCodes", emptyFunc);
    commands.set('regularCommands', "$greet", emptyFunc);
    commands.set('regularCommands', "$derka ", emptyFunc);
    commands.set('regularCommands', "$ask ", emptyFunc);
    commands.set('regularCommands', "$askC ", emptyFunc);
    commands.set('regularCommands', "$askJ ", emptyFunc);
    commands.set('regularCommands', "$eval ", emptyFunc);
    commands.set('regularCommands', "$emotes", emptyFunc);
    commands.set('regularCommands', "$script", emptyFunc);
    commands.set('regularCommands', "$wolfram ", emptyFunc);
    commands.set('regularCommands', "$8Ball ", emptyFunc);
    commands.set('regularCommands', "$roll ", emptyFunc);
    commands.set('regularCommands', "$quote ", emptyFunc);
    commands.set('regularCommands', "$help ", emptyFunc);
    commands.set('regularCommands', "$stats", emptyFunc);
    commands.set('regularCommands', "$skiprate", emptyFunc);
    commands.set('regularCommands', "$mostPlayed", emptyFunc);
    commands.set('regularCommands', "$exportPlaylist ", emptyFunc);
    commands.set('regularCommands', "$rustle ", emptyFunc);
}

events.bind('onExecuteOnce', loadBotCommands);
//----------------- end  botCommands.js-----------------
//-----------------start bump.js-----------------
function loadBumpCommand() {
    commands.set('modCommands', "bump ", bump, 'Bumps a video right under the active video. Parameters: the user to bump, the position to bump to, a url to bump.');
    events.bind('onAddVideo', function(vidinfo) {
        if (videoInfoEquals(vidinfo.info, bumpInfo)) {
            unsafeWindow.global.sendcmd('move', {
                info: vidinfo.info,
                position: bumpTo || getActiveVideoIndex() + 1
            });
            bumpInfo = undefined;
            bumpTo = undefined;
        }
    });

}

function bump(params) {
    var user,
        bumpIndex = -1,
        bumpUrl,
        i,
        activeIndex = getActiveVideoIndex();

    for (i = 1; i < params.length; i += 1) {
        if (isUsername(params[i])) {
            user = params[i];
        } else if (!bumpInfo && (bumpInfo = urlParser.parse(params[i]))) {
            bumpUrl = params[i];
        } else {
            bumpTo = parseInt(params[i], 10);
            if (unsafeWindow.isNaN(bumpTo)) {
                bumpTo = activeIndex + 1;
            } else {
                bumpTo = Math.min(bumpTo, unsafeWindow.playlist.length - 1);
            }
        }
    }
    if (!user && !bumpInfo) {
        unsafeWindow.addMessage('', 'Nothing found to bump: \'bump [user]? [url]? [position]?', '', 'hashtext');
        return;
    }
    for (i = unsafeWindow.playlist.length - 1; i >= 0; i -= 1) {
        if (videoInfoEquals(unsafeWindow.playlist[i].info, bumpInfo) ||
            (user && unsafeWindow.playlist[i].addedby.toLowerCase() === user.toLowerCase())) {
            bumpIndex = i;
            break;
        }
    }
    if (bumpIndex === -1) {
        if (!bumpInfo) {
            unsafeWindow.addMessage('', "The user didn't add any videos", '', 'hashtext');
        }
    } else {
        if (!bumpTo && bumpIndex < activeIndex) {
            bumpTo = activeIndex;
        }
        unsafeWindow.global.sendcmd('move', {
            info: unsafeWindow.playlist[bumpIndex].info,
            position: bumpTo || activeIndex + 1
        });
        bumpTo = undefined;
        bumpInfo = undefined;
    }
    if (bumpInfo) {
        unsafeWindow.global.sendcmd('add', {
            URL: bumpUrl
        });
    }
}

var bumpTo,
    bumpInfo;
events.bind('onExecuteOnce', loadBumpCommand);
//----------------- end  bump.js-----------------
//-----------------start clearChat.js-----------------
function loadClearChatCommand() {
    commands.set('regularCommands', "clearChat", clearChat, 'Clears the chat.');
}

function clearChat() {
    $('#chat_list').empty();
    unsafeWindow.messages = 0;
}

events.bind('onExecuteOnce', loadClearChatCommand);
//----------------- end  clearChat.js-----------------
//-----------------start commandFloodProtect.js-----------------
function loadCommandFloodProtect() {
    var oldsendcmd = unsafeWindow.global.sendcmd;
    unsafeWindow.global.sendcmd = function(command, data) {
        if (command) {
            //add the command to the cache
            commandCache.push({
                command: command,
                data: data
            });
        }
        //are we ready to send a command?
        if (sendcmdReady) {
            if (commandCache.length !== 0) {
                //set not ready
                sendcmdReady = false;
                //send the command
                oldsendcmd(commandCache[0].command, commandCache[0].data);
                //remove the sent command
                commandCache.splice(0, 1);
                //after 400ms send the next command
                setTimeout(function() {
                    sendcmdReady = true;
                    unsafeWindow.global.sendcmd();
                }, 400);
            }
        }
    };
}

var sendcmdReady = true,
    commandCache = [];

events.bind('onResetVariables', function() {
    sendcmdReady = true;
    commandCache = [];
});
events.bind('onExecuteOnce', loadCommandFloodProtect);
//----------------- end  commandFloodProtect.js-----------------
//-----------------start commandLoader.js-----------------
function loadCommandLoaderOnce() {
    var items = {};
    items.regularCommands = [
        "'reload",
        "'resynch",
        "'toggleFilter",
        "'toggleAutosynch",
        "'mute",
        "'unmute"
    ];
    items.modCommands = [
        "'togglePlaylistLock",
        "'ready",
        "'kick ",
        "'ban ",
        "'unban ",
        "'clean",
        "'remove ",
        "'purge ",
        "'move ",
        "'play ",
        "'pause",
        "'resume",
        "'seekto ",
        "'seekfrom ",
        "'setskip ",
        "'banlist",
        "'modlist",
        "'save",
        "'leaverban ",
        //commented those so you can't accidently use them
        //"'clearbans",
        //"'motd ",
        //"'mod ",
        //"'demod ",
        //"'description ",
        "'next"
    ];
    items.commandFunctionMap = {};
    items.descriptionMap = {};

    events.bind('onExecuteCommand', function(data) {
        items.commandFunctionMap[data.parameters[0].toLowerCase()](data.parameters);
    });
    commands = {
        set: function(arrayName, funcName, func, description) {
            if (funcName[0] !== '$') {
                funcName = "'" + funcName;
            }
            items[arrayName].push(funcName);
            items.commandFunctionMap[funcName.toLowerCase()] = func;
            items.descriptionMap[funcName.toLowerCase()] = description;
        },
        get: function(arrayName) {
            return items[arrayName];
        },
        getDescription: function(funcName) {
            funcName = funcName.toLowerCase();
            if (items.descriptionMap.hasOwnProperty(funcName + ' ')) {
                funcName = funcName + ' ';
            } else if (!items.descriptionMap.hasOwnProperty(funcName)) {
                funcName = undefined;
            }
            if (funcName) {
                return items.descriptionMap[funcName.toLowerCase()];
            }
        },
        getAll: function() {
            return items;
        },
        execute: function(funcName, params) {
            funcName = funcName.toLowerCase();
            if (funcName[0] === '$') {
                return;
            }
            if (items.commandFunctionMap.hasOwnProperty(funcName + ' ')) {
                funcName = funcName + ' ';
            } else if (!items.commandFunctionMap.hasOwnProperty(funcName)) {
                funcName = undefined;
            }
            if (funcName) {
                params[0] = funcName;
                //send the event to the site
                unsafeWindow.postMessage(JSON.stringify({
                    action: 'onExecuteCommand',
                    data: {
                        parameters: params
                    }
                }), "*");
                //items.commandFunctionMap[funcName](params);
            }
        }
    };
    events.bind('onInputKeypress', function(event, message) {
        if (event.keyCode === 13) {
            var params = message.split(' ');
            commands.execute(params[0], params);
        }
    });
}

var commands;
//----------------- end  commandLoader.js-----------------
//-----------------start help.js-----------------
function loadHelpCommand() {
    commands.set('regularCommands', "help ", help, 'Prints out all the commands (use $help for bot commands) or prints more info on a specific command. Optional Parameter: the command to get info on.');
}

function help(params) {
    var description,
        output = '';
    if (params[1]) {
        description = commands.getDescription(params[1]);
        if (!description) {
            output = String.format('Command {0} not found', params[1]);
        } else {
            output = String.format('{0}: {1}', params[1], description);
        }
    } else {
        output += commands.get('modCommands').join(' ') + ' ';
        output += commands.get('regularCommands').join(' ') + ' ';
        output = output.replace(/\$[\w]+ /g, '');
    }
    unsafeWindow.addMessage('', output, '', 'hashtext');
}

events.bind('onExecuteOnce', loadHelpCommand);
//----------------- end  help.js-----------------
//-----------------start purgeTooLong.js-----------------
function loadPurgeTooLongCommand() {
    commands.set('modCommands', "purgeTooLong ", purgeTooLong, 'Removes all videos over the timelimit with 1 hour as the standard timelimit. Parameters: timelimit in minutes.');
}

function purgeTooLong(params) {
    var maxTimeLimit = params[1] ? parseInt(params[1], 10) * 60 : 60 * 60,
        videos = [],
        i;

    //get all Videos longer than maxTimeLimit
    for (i = 0; i < unsafeWindow.playlist.length; i += 1) {
        if (unsafeWindow.playlist[i].duration >= maxTimeLimit) {
            videos.push({
                info: unsafeWindow.playlist[i].info,
                duration: unsafeWindow.playlist[i].duration
            });
        }
    }

    function compareVideos(a, b) {
        return b.duration - a.duration;
    }
    videos.sort(compareVideos);

    for (i = 0; i < videos.length; i += 1) {
        unsafeWindow.global.sendcmd('remove', {
            info: videos[i].info
        });
    }
}

events.bind('onExecuteOnce', loadPurgeTooLongCommand);
//----------------- end  purgeTooLong.js-----------------
//-----------------start removeLast.js-----------------
function loadRemoveLast() {
    commands.set('modCommands', "removeLast ", removeLast, 'Removes the last video of a user. Parameters: the user.');
}

// Remove the last video from the user 
function removeLast(params) {
    if (!params[1]) {
        unsafeWindow.addMessage('', 'No user specified: \'removeLast [user]', '', 'hashtext');
        return;
    }
    var user = params[1],
        removeIndex = -1,
        i;

    // Look for the user last added video
    for (i = unsafeWindow.playlist.length - 1; i >= 0; i -= 1) {
        if (unsafeWindow.playlist[i].addedby.toLowerCase() === user.toLowerCase()) {
            removeIndex = i;
            break;
        }
    }

    if (removeIndex === -1) {
        unsafeWindow.addMessage('', "The user didn't add any video", '', 'hashtext');
    } else {
        unsafeWindow.global.sendcmd('remove', {
            info: unsafeWindow.playlist[removeIndex].info
        });
    }
}

events.bind('onExecuteOnce', loadRemoveLast);
//----------------- end  removeLast.js-----------------
//-----------------start shuffle.js-----------------
function loadShuffleCommand() {
    commands.set('modCommands', "shuffle ", shuffle, 'Shuffles the playlist or a wall of a user (prepare for spam combined with ModSpy). Possible parameters: the user');
}

function shuffle(params) {
    var user = params[1],
        i,
        shuffleList = [],
        tempInfo,
        randIndex,
        newPosition;

    for (i = getActiveVideoIndex() + 1; i < unsafeWindow.playlist.length; i += 1) {
        if (!user || unsafeWindow.playlist[i].addedby.toLowerCase() === user.toLowerCase()) {
            shuffleList.push({
                i: i,
                info: unsafeWindow.playlist[i].info
            });
        }
    }
    for (i = 0; i < shuffleList.length; i += 1) {
        randIndex = Math.floor(Math.random() * shuffleList.length);
        tempInfo = shuffleList[i].info;
        newPosition = shuffleList[randIndex].i;
        unsafeWindow.global.sendcmd('move', {
            info: tempInfo,
            position: newPosition
        });
    }
}

events.bind('onExecuteOnce', loadShuffleCommand);
//----------------- end  shuffle.js-----------------
//-----------------start skip.js-----------------
function loadSkipCommand() {
    commands.set('regularCommands', "skip ", skip);
}

function skip() {
    unsafeWindow.global.sendcmd("skip", null);
}

events.bind('onExecuteOnce', loadSkipCommand);
//----------------- end  skip.js-----------------
//-----------------start trimWall.js-----------------
function loadTrimWallCommand() {
    commands.set('modCommands', "trimWall ", trimWall, 'Trims a wall of a user to the timelimit with 1 hour as standard timelimit. Possible parameters: timelimit in minutes.');
}

function trimWall(params) {
    if (!params[1]) {
        unsafeWindow.addMessage('', 'No user specified: \'trimWall [user] [maxMinutes]', '', 'hashtext');
        return;
    }
    resetWallCounter();
    var user = params[1],
        maxTimeLimit = params[2] ? parseInt(params[2], 10) * 60 : 60 * 60,
        currentTime = wallCounter[user],
        videos = [],
        i;

    if (currentTime < maxTimeLimit) {
        unsafeWindow.addMessage('', 'The wall is smaller than the timelimit', '', 'hashtext');
        return;
    }
    //get all Videos for the user
    for (i = 0; i < unsafeWindow.playlist.length; i += 1) {
        if (unsafeWindow.playlist[i].addedby.toLowerCase() === user.toLowerCase()) {
            videos.push({
                info: unsafeWindow.playlist[i].info,
                duration: unsafeWindow.playlist[i].duration
            });
        }
    }

    function compareVideos(a, b) {
        return b.duration - a.duration;
    }
    // function rmVideo(index, vidinfo){
    //     setTimeout(
    //         function(){
    //             sendcmd('remove', {info: vidinfo});
    //         }, 
    //         (index+1) * 750);
    // }
    //sort the array so we will get the longest first
    videos.sort(compareVideos);

    for (i = 0; i < videos.length && currentTime > maxTimeLimit; i += 1) {
        currentTime -= videos[i].duration;
        // rmVideo(i,videos[i].info);
        //delay via commandFloodProtect.js
        unsafeWindow.global.sendcmd('remove', {
            info: videos[i].info
        });
    }
}

events.bind('onExecuteOnce', loadTrimWallCommand);
//----------------- end  trimWall.js-----------------
//-----------------start votePurge.js-----------------
function loadVotePurgeCommand() {
    commands.set('modCommands', "votepurge ", votePurge, 'Creates a poll if the user should be purged (purging still has to be done by hand). Parameters: the user.');
}

function votePurge(params) {
    var user = params[1],
        poll = {},
        option;

    if (!user) {
        unsafeWindow.addMessage('', 'No user specified: \'votePurge [user]', '', 'hashtext');
        return;
    }

    poll.title = "Should we purge " + user + " ? /babyseal";
    poll.options = [];
    option = "Yes !";
    poll.options.push(option);
    option = "No !";
    poll.options.push(option);

    unsafeWindow.global.sendcmd("poll-create", poll);
}

events.bind('onExecuteOnce', loadVotePurgeCommand);
//----------------- end  votePurge.js-----------------
//-----------------start controlBar.js-----------------
setField({
    'name': 'chat-opacity',
    'data': {
        'label': 'Chat',
        'type': 'int',
        'title': '0-100',
        'min': 0,
        'max': 100,
        'default': 30,
        'size': 1
    },
    'section': 'General Additions',
    'subsection': 'Fullscreen Opacity'
});
setField({
    'name': 'poll-opacity',
    'data': {
        'label': 'Poll',
        'type': 'int',
        'title': '0-100',
        'min': 0,
        'max': 100,
        'default': 30,
        'size': 1
    },
    'section': 'General Additions',
    'subsection': 'Fullscreen Opacity'
});
setField({
    'name': 'playlist-opacity',
    'data': {
        'label': 'Playlist',
        'type': 'int',
        'title': '0-100',
        'min': 0,
        'max': 100,
        'default': 30,
        'size': 1
    },
    'section': 'General Additions',
    'subsection': 'Fullscreen Opacity'
});

setField({
    'name': 'button-animations',
    'data': {
        'label': 'Button Animations',
        'type': 'checkbox',
        'default': true
    },
    'section': 'General Additions'
});

function loadControlBar() {
    var skipRate = 0,
        skipText = $('#skip-count').text(),
        playlistLock = $('#toggleplaylistlock img').attr('src');

    $('#resynch').remove();
    $('#reload').remove();

    setUpFullscreen();

    if (isConnected) {
        skipRate = Math.round(parseInt(skipText.split('/')[1], 10) / blacknamesCount * 100 * 100) / 100;
    }
    $('.sliderContainer').prependTo('#playlist');
    $('.playlist-controls').empty().append(
        $('<div>', {
            'id': 'skip-container'
        }).append(
            $('<div>', {
                'id': 'skip',
                'class': 'controlIcon',
                'title': 'Skip'
            }).append(
                $('<div>').addClass('animationContainer')
            ).click(function() {
                if (unsafeWindow.userInfo.loggedin) {
                    unsafeWindow.global.sendcmd('skip', null);
                } else {
                    unsafeWindow.addMessage("", "You must be logged in to vote to skip.", "", "errortext");
                }
            })
        ).append(
            $('<div>', {
                'id': 'skip-count',
                'title': skipRate + '%'
            }).text(skipText)
        )
    ).append(
        $('<div>', {
            'id': 'addVid'
        }).append(
            $('<input>', {
                'name': 'URLinput',
                'id': 'URLinput',
                'type': 'text',
                'title': 'Start typing to search',
                'placeholder': 'Add Video / Search'
            })
        ).append(
            $('<div>', {
                'id': 'addUrl',
                'class': 'controlIcon',
                'title': 'Add Video'
                //.css('background-image', 'url(http://i.imgur.com/Fv1wJk5.png)')
            }).append(
                $('<div>').addClass('animationContainer')
            ).click(function() {
                var url = $('#URLinput').val();
                if ($('#URLinput').val().trim() !== '') {
                    unsafeWindow.global.sendcmd('add', {
                        URL: url
                    });
                }
                $('#URLinput').val('');
            })
        )
    ).append(
        $('<div>', {
            'id': 'toggleplaylistlock'
        }).append(
            $('<img>', {
                'src': playlistLock
            }).css('top', '3px').css('position', 'relative')
        ).click(function() {
            unsafeWindow.global.sendcmd('toggleplaylistlock', null);
        })
    ).append(
        $('<div>', {
            'id': 'reloadPlayer',
            'title': 'Reload',
            'class': 'controlIcon'
        }).append(
            $('<div>').addClass('animationContainer')
        ).click(function() {
            unsafeWindow.video.destroyPlayer();
            unsafeWindow.global.sendcmd('reload', null);
        })
    ).append(
        $('<div>', {
            'id': 'resynchPlayer',
            'title': 'Resynch',
            'class': 'controlIcon'
        }).append(
            $('<div>').addClass('animationContainer')
        ).click(function() {
            unsafeWindow.global.sendcmd('resynch', null);
        })
    ).append(
        $('<div>', {
            'id': 'mirrorPlayer',
            'title': 'Mirror Player',
            'class': 'controlIcon'
        }).append($('<div>').addClass('animationContainer')).click(function() {
            toggleMirrorPlayer();
        })
    ).append(
        $('<div>', {
            'id': 'fullscreen',
            'title': 'Fullscreen',
            'class': 'controlIcon'
        }).append(
            $('<div>').addClass('animationContainer')
        ).click(toggleFullscreen)
    ).append(
        $('<div>', {
            'id': 'nnd-Mode',
            'title': 'NND Mode (scrolling Text)',
            'class': 'controlIcon'
        }).append(
            $('<div>').addClass('animationContainer')
        ).click(function() {
            GM_config.set('NNDMode', !GM_config.get('NNDMode'));
            saveSettings();
        })
    );
    toggleAnimations();
}

function loadControlBarOnce() {
    var oldDisplayAnimations = GM_config.get('button-animations'),
        oldLayoutCSS = '',
        fullscreenCSS = GM_getResourceText('fullscreenCSS');

    events.bind('onSettingsOpen', function() {
        oldDisplayAnimations = GM_config.get('button-animations');
    });
    events.bind('onSettingsSave', function() {
        if (oldDisplayAnimations !== GM_config.get('button-animations')) {
            toggleAnimations();
            oldDisplayAnimations = GM_config.get('button-animations');
        }
    });
    events.bind('onSkips', function(skips, skipsNeeded) {
        $('#skip-count').attr('title', String.format('{0}%', Math.round(skipsNeeded / blacknamesCount * 100 * 100) / 100));
    });

    events.bind('onCreatePoll', function() {
        $('.poll-container').removeClass('poll-container2');
        $('#hide-poll').removeClass('hide-poll2');
    });

    $(document).bind('fscreenchange', function() {
        if ($.fullscreen.isFullScreen()) {
            if (userFullscreenToggle) {
                $('.NND-element').remove();
                oldLayoutCSS = $('#layoutStyles').text();
                $('#layoutStyles').text(fullscreenCSS);
                $('#chat').css('opacity', GM_config.get('chat-opacity') / 100.0);
                $('#playlist').css('opacity', GM_config.get('playlist-opacity') / 100.0);
                $('.poll-container').css('opacity', GM_config.get('poll-opacity') / 100.0);
                $('#chat-slider').slider('option', 'value', GM_config.get('chat-opacity'));
                $('#poll-slider').slider('option', 'value', GM_config.get('poll-opacity'));
                $('#playlist-slider').slider('option', 'value', GM_config.get('playlist-opacity'));
            }
        } else {
            if (userFullscreenToggle) {
                $('#layoutStyles').text(oldLayoutCSS);
                $('#chat').css('opacity', '1');
                $('#playlist').css('opacity', '1');
                $('.poll-container').css('opacity', '1');
            }
            userFullscreenToggle = false;
        }
    });
}

function addAnimation(child, cls) {
    child.unbind('webkitAnimationIteration oanimationiteration MSAnimationIteration animationiteration').addClass(cls);
}

function removeAnimation(child, cls) {
    child.one('webkitAnimationIteration oanimationiteration MSAnimationIteration animationiteration', function() {
        child.removeClass(cls);
    });
}

function toggleAnimations() {
    $('#skip').unbind('mouseenter mouseleave');
    $('#addUrl').unbind('mouseenter mouseleave');
    $('#reloadPlayer').unbind('mouseenter mouseleave');
    $('#resynchPlayer').unbind('mouseenter mouseleave');
    $('#mirrorPlayer').unbind('mouseenter mouseleave');
    $('#fullscreen').unbind('mouseenter mouseleave');
    $('#nnd-Mode').unbind('mouseenter mouseleave');
    if (GM_config.get('button-animations')) {
        $('#skip').hover(function() {
            addAnimation($(this).children().eq(0), 'shake');
        }, function() {
            removeAnimation($(this).children().eq(0), 'shake');
        });
        $('#addUrl').hover(function() {
            addAnimation($(this).children().eq(0), 'pulse');
        }, function() {
            removeAnimation($(this).children().eq(0), 'pulse');
        });
        $('#reloadPlayer').hover(function() {
            addAnimation($(this).children().eq(0), 'spiral');
        }, function() {
            removeAnimation($(this).children().eq(0), 'spiral');
        });
        $('#resynchPlayer').hover(function() {
            addAnimation($(this).children().eq(0), 'spiral');
        }, function() {
            removeAnimation($(this).children().eq(0), 'spiral');
        });
        $('#mirrorPlayer').hover(function() {
            addAnimation($(this).children().eq(0), 'spinner');
        }, function() {
            removeAnimation($(this).children().eq(0), 'spinner');
        });
        $('#fullscreen').hover(function() {
            addAnimation($(this).children().eq(0), 'grow');
        }, function() {
            removeAnimation($(this).children().eq(0), 'grow');
        });
        $('#nnd-Mode').hover(function() {
            addAnimation($(this).children().eq(0), 'marquee');
        }, function() {
            removeAnimation($(this).children().eq(0), 'marquee');
        });
    }
}
var userFullscreenToggle = false;

function toggleFullscreen() {
    if (!$.fullscreen.isFullScreen()) {
        userFullscreenToggle = true;
        $('body').fullscreen();
    } else {
        $.fullscreen.exit();
    }
}

function setUpFullscreen() {
    var opacitySaveTimer;

    function saveOpacity() {
        $('#chat').css('opacity', GM_config.get('chat-opacity') / 100.0);
        $('#playlist').css('opacity', GM_config.get('playlist-opacity') / 100.0);
        $('.poll-container').css('opacity', GM_config.get('poll-opacity') / 100.0);
        if (opacitySaveTimer) {
            clearTimeout(opacitySaveTimer);
            opacitySaveTimer = undefined;
        }
        opacitySaveTimer = setTimeout(function() {
            saveSettings();
        }, 5000);
    }
    $('#stage').append($('<div>', {
        'id': 'block-fullscreen'
    }).click(toggleFullscreen));

    $('.playlist').prepend($('<div>', {
        'id': 'hide-playlist'
    }).append(
        $('<div>').click(function() {
            $('#videos').toggleClass('playlist2');
            $('#hide-playlist').toggleClass('hide-playlist2');
            $('#chat').toggleClass('chat2');
        })
    ));
    $('.poll-container').prepend(
        $('<div>', {
            'id': 'hide-poll'
        }).append(
            $('<div>').click(function() {
                $('.poll-container').toggleClass('poll-container2');
                $('#hide-poll').toggleClass('hide-poll2');
            })
        )
    );

    $('.overall').append(
        $('<div>', {
            'id': 'opacity-sliders'
        }).append(
            $('<span>').text('Opacity')
        ).append(
            $('<div>', {
                'id': 'chat-slider'
            }).slider({
                range: "min",
                value: GM_config.get('chat-opacity'),
                min: 0,
                max: 100,
                slide: function(event, ui) {
                    GM_config.set('chat-opacity', ui.value);
                    saveOpacity();
                }
            }).append(
                $('<span>').text('chat').addClass('text-shadow')
            )
        ).append(
            $('<div>', {
                'id': 'poll-slider'
            }).slider({
                range: "min",
                value: GM_config.get('poll-opacity'),
                min: 0,
                max: 100,
                slide: function(event, ui) {
                    GM_config.set('poll-opacity', ui.value);
                    saveOpacity();
                }
            }).append(
                $('<span>').text('poll').addClass('text-shadow')
            )
        ).append(
            $('<div>', {
                'id': 'playlist-slider'
            }).slider({
                range: "min",
                value: GM_config.get('playlist-opacity'),
                min: 0,
                max: 100,
                slide: function(event, ui) {
                    GM_config.set('playlist-opacity', ui.value);
                    saveOpacity();
                }
            }).append(
                $('<span>').text('playlist').addClass('text-shadow')
            )
        )
    );
}

events.bind('onExecuteOnce', loadControlBarOnce);
//----------------- end  controlBar.js-----------------
//-----------------start Description.js-----------------
function loadDescription() {
    if (!isBibbyRoom()) {
        return;
    }
    var descr = "";
    descr += "<p style=\"font-family: Palatino; text-align: center; \">";
    descr += "  <span style=\"color:#003399;\"><strong style=\"font-size: 20pt; \">Bibbytube<\/strong><\/span><\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 16pt; text-align: center; \">";
    descr += "  <strong>instasynch&#39;s most <img src=\"http:\/\/i.imgur.com\/L1Nuk.gif\" \/> room<\/strong><\/p>";
    descr += "<hr noshade color='black' width='550' size='5' align='center'>";
    descr += "<p style=\"font-family: Palatino; font-size: 14pt; text-align: center; \">";
    descr += "  <span style=\"font-size: 14pt; \">Playlist is always unlocked, so add videos for everyone to watch.<\/span><\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 14pt; text-align: center; \">";
    descr += "  <span style=\"color:#003399;\">New content\/OC is appreciated.<\/span><\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 12pt; text-align: center; \">";
    descr += "  Note: Many of our videos are NSFW.<\/p>";
    descr += "<hr noshade color='black' width='550' size='5' align='center'>";
    descr += "<p style=\"font-family: Palatino; font-size: 18pt; text-align: center; \">";
    descr += "  <span style=\"color:#003399;\"><strong>Rules&nbsp;<\/strong><\/span><\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 14pt; text-align: center; \">";
    descr += "  1. No RWJ, Ponies, or Stale Videos. &nbsp;Insta-skip<\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 14pt; text-align: center; \">";
    descr += "  2. BEGGING FOR SKIPS IS FOR GAYLORDS<\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 14pt; text-align: center; \">";
    descr += "  3. &nbsp;NO SEAL JOKES<\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 14pt; text-align: center; \">";
    descr += "  &nbsp;<\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 14pt; text-align: center; \">";
    descr += "  If your video gets removed and shouldn't have been, try adding it later.<\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 14pt; text-align: center; \">";
    descr += "  MODS=GODS<\/p>";
    descr += "<p style=\"font-family: Palatino; font-size: 14pt; text-align: center; \">";
    descr += "  <strong><span style=\"color:#003399; font-family: Palatino; font-size: 18pt; \">Rules for the Reading Impaired<\/span><\/strong><\/p>";
    descr += "<p style=\"text-align: center; \">";
    descr += "  <a href=\"http:\/\/dl.dropbox.com\/u\/63790091\/BabbyRulesEnglish.mp3\"><img src=\"http:\/\/i.imgur.com\/LIXqI5Q.png?1\" \/><\/a><a href=\"http:\/\/dl.dropbox.com\/u\/63790091\/BabbyRulesDutch.mp3\"><img src=\"http:\/\/i.imgur.com\/giykE7C.jpg?1\" \/><\/a><a href=\"http:\/\/dl.dropbox.com\/u\/63790091\/BabbyRulesFrench.mp3\"><img src=\"http:\/\/i.imgur.com\/BucOmRs.png?1\" \/><\/a><a href=\"http:\/\/dl.dropbox.com\/u\/63790091\/BabbyRulesGerman.mp3\"><img src=\"http:\/\/i.imgur.com\/bTwmX9v.png?1\" \/><\/a><a href=\"http:\/\/dl.dropbox.com\/u\/63790091\/BabbyRulesSpanish.mp3\"><img src=\"http:\/\/i.imgur.com\/aZvktnt.png?1\" \/><\/a><\/p>";
    descr += "<p style=\"text-align: center; \">";
    descr += "  &nbsp;<\/p>";
    descr += "<p style=\"text-align: center; \">";
    descr += "  &nbsp;<\/p>";
    descr += "<p style=\"text-align: center; \">";
    descr += "  &nbsp;<\/p>";
    descr += "<p style=\"text-align: center; \">";
    descr += "  <strong><span style=\"color:#003399;\"><span style=\" font-family: Palatino; font-size: 18pt; \">Connect with Bibbytube in other ways!<\/span><\/span><\/strong><\/p>";
    descr += "<p style=\"text-align: center; \">";
    descr += "  &nbsp;<\/p>";
    descr += "<p style=\"text-align: center; \">";
    descr += "  <a href=\"http:\/\/steamcommunity.com\/groups\/Babbytube\"><img src=\"http:\/\/i.imgur.com\/AZHszva.png?1\" \/><\/a><\/p>";
    descr += "<p style=\"text-align: center; \">";
    descr += "  <a href=\"http:\/\/facebook.com\/babbytube\"><img src=\"http:\/\/i.imgur.com\/NuT2Bti.png?4\" \/><\/a><a href=\"http:\/\/twitter.com\/bibbytube_\/\"><img src=\"http:\/\/i.imgur.com\/T6oWmfB.png?4\" \/><\/a><\/p>";
    descr += "<script type=\"text\/javascript\" src=\"http:\/\/script.footprintlive.com\/?site=www.synchtube.com\"><\/script><noscript><a href=\"http:\/\/www.footprintlive.com\" target=\"_blank\"><img src=\"http:\/\/img.footprintlive.com\/?cmd=nojs&site=www.synchtube.com\" alt=\"user analytics\" border=\"0\"><\/a><\/noscript>";
    $('#roomFooter >').html(descr);
}

events.bind('onPreConnect', loadDescription);
//----------------- end  Description.js-----------------
//-----------------start events.js-----------------
var currentPlayer = '',
    blacknamesCount = 0,
    greynamesCount = 0,
    modsCount = 0;

function loadEventsOnce() {
    var oldAddMessage = unsafeWindow.addMessage,
        oldCreatePoll = unsafeWindow.createPoll,
        oldAddVideo = unsafeWindow.addVideo,
        oldLoadRoomObj = unsafeWindow.global.loadRoomObj,
        oldPlayVideo = unsafeWindow.playVideo,
        oldMoveVideo = unsafeWindow.moveVideo,
        oldAddUser = unsafeWindow.addUser,
        oldRemoveUser = unsafeWindow.removeUser,
        oldSkips = unsafeWindow.skips,
        oldMakeLeader = unsafeWindow.makeLeader,
        oldLoadUserlist = unsafeWindow.loadUserlist,
        i;

    unsafeWindow.loadUserlist = function(userlist) {
        events.fire('onUserlist', [userlist], true);
        oldLoadUserlist(userlist);
        events.fire('onUserlist', [userlist], false);
    };

    unsafeWindow.global.loadRoomObj = function() {
        events.fire('onRoomChange', [], true);
        oldLoadRoomObj();
        events.fire('onRoomChange', [], false);
    };
    unsafeWindow.global.onConnecting = function() {
        events.fire('onConnecting', [], false);
    };
    unsafeWindow.global.onConnected = function() {
        events.fire('onConnect', [], false);
    };
    unsafeWindow.global.onReconnecting = function() {
        events.fire('onReconnecting', [], false);
    };
    unsafeWindow.global.onDisconnect = function() {
        events.fire('onDisconnect', [], false);
    };

    unsafeWindow.playVideo = function(vidinfo, time, playing) {
        if (!vidinfo) {
            return;
        }

        if (GM_config.get('PlayerActive') && currentPlayer !== vidinfo.provider) {
            events.fire('onPlayerChange', [currentPlayer, vidinfo.provider], true);
        }
        var indexOfVid = unsafeWindow.getVideoIndex(vidinfo);
        events.fire('onPlayVideo', [vidinfo, time, playing, indexOfVid], true);
        oldPlayVideo(vidinfo, time, playing);
        if (GM_config.get('PlayerActive') && currentPlayer !== vidinfo.provider) {
            events.fire('onPlayerChange', [currentPlayer, vidinfo.provider], false);
            switch (vidinfo.provider) {
                case 'youtube':
                    var oldAfterReady = $.tubeplayer.defaults.afterReady;
                    $.tubeplayer.defaults.afterReady = function(k3) {
                        events.fire('onPlayerReady', [currentPlayer, vidinfo.provider], false);
                        oldAfterReady(k3);
                    };
                    break;
                case 'vimeo':
                    $f($('#vimeo')[0]).addEvent('ready', function() {
                        events.fire('onPlayerReady', [currentPlayer, vidinfo.provider], false);
                    });
                    break;
            }
            currentPlayer = vidinfo.provider;
        }
        events.fire('onPlayVideo', [vidinfo, time, playing, indexOfVid], false);
    };

    unsafeWindow.moveVideo = function(vidinfo, position) {
        var oldPosition = unsafeWindow.getVideoIndex(vidinfo);
        events.fire('onMoveVideo', [vidinfo, position, oldPosition], true);
        oldMoveVideo(vidinfo, position);
        events.fire('onMoveVideo', [vidinfo, position, oldPosition], false);
    };

    unsafeWindow.addUser = function(user, css, sort) {
        countUser(user, true);
        events.fire('onAddUser', [user, css, sort], true);
        oldAddUser(user, css, sort);
        events.fire('onAddUser', [user, css, sort], false);
    };

    unsafeWindow.removeUser = function(id) {
        var user = unsafeWindow.users[getIndexOfUser(id)];
        countUser(user, false);
        events.fire('onRemoveUser', [id, user], true);
        oldRemoveUser(id);
        events.fire('onRemoveUser', [id, user], false);
    };
    unsafeWindow.skips = function(skips, skipsNeeded) {
        events.fire('onSkips', [skips, skipsNeeded], true);
        oldSkips(skips, skipsNeeded);
        events.fire('onSkips', [skips, skipsNeeded], false);
    };
    unsafeWindow.makeLeader = function(userId) {
        events.fire('onMakeLeader', [userId], true);
        oldMakeLeader(userId);
        events.fire('onMakeLeader', [userId], false);
    };

    unsafeWindow.addMessage = function(username, message, userstyle, textstyle) {
        events.fire('onAddMessage', [username, message, userstyle, textstyle], true);
        oldAddMessage(username, message, userstyle, textstyle);
        events.fire('onAddMessage', [username, message, userstyle, textstyle], false);
    };

    function pollEquals(oldPoll, newPoll) {
        if (oldPoll.title === newPoll.title && oldPoll.options.length === newPoll.options.length) {
            for (i = 0; i < newPoll.options.length; i += 1) {
                if (oldPoll.options[i].option !== newPoll.options[i].option) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    unsafeWindow.createPoll = function(poll) {
        if (!pollEquals(oldPoll, poll)) {
            events.fire('onCreatePoll', [poll], true);
            oldCreatePoll(poll);
            events.fire('onCreatePoll', [poll], false);
        } else {
            oldCreatePoll(poll);
        }
    };

    unsafeWindow.addVideo = function(vidinfo, updateScrollbar) {
        events.fire('onAddVideo', [vidinfo, updateScrollbar], true);
        oldAddVideo(vidinfo, updateScrollbar);
        events.fire('onAddVideo', [vidinfo, updateScrollbar], false);
    };

    //stuff that has to be executed in the scope of greasemonkey for the GM API to work
    unsafeWindow.addEventListener("message", function(event) {
        try {
            var parsed = JSON.parse(event.data);
            if (parsed.action) {
                //own events
                events.fire(parsed.action, [parsed.data], false);
            }
            //all
            events.fire('onPageMessage', [parsed], false);
        } catch (ignore) {}
    }, false);
}

function loadEvents() {
    var oldPlayerDestroy = unsafeWindow.video.destroyPlayer;

    unsafeWindow.video.destroyPlayer = function() {
        events.fire('onPlayerDestroy', [], true);
        oldPlayerDestroy();
        events.fire('onPlayerDestroy', [], false);
        currentPlayer = '';
    };

    $("#chat input").bindFirst('keypress', function(event) {
        events.fire('onInputKeypress', [event, $("#chat input").val()], false);
    });
}

function countUser(user, increment) {
    var val = increment ? 1 : -1;
    if (user.loggedin) {
        if (parseInt(user.permissions, 10) > 0) {
            modsCount += val;
        }
        blacknamesCount += val;
    } else {
        greynamesCount += val;
    }
}

events.bind('onResetVariables', function() {
    currentPlayer = '';
});
//----------------- end  events.js-----------------
//-----------------start General.js-----------------
function loadGeneralStuff() {

    //http://joquery.com/2012/string-format-for-javascript
    String.format = function() {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        var theString = arguments[0],
            i,
            regEx;

        // start with the second argument (i = 1)
        for (i = 1; i < arguments.length; i += 1) {
            // "gm" = RegEx options for Global search (more than one instance)
            // and for Multiline search
            regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            theString = theString.replace(regEx, arguments[i]);
        }
        return theString;
    };

    thisUsername = $.cookie('username');

    // unsafeWindow.addEventListener("message", 
    // function(event){
    //     try{
    //         var parsed = JSON.parse(event.data);
    //         if(parsed.newTabParameters){
    //             openInNewTab(parsed.newTabParameters[0],parsed.newTabParameters[1]);
    //         }
    //     }catch(err){
    //     }
    // }, false);
    // function openInNewTab(url, options){
    //     GM_openInTab(url,options);
    // }
    events.bind('onUserlist', function() {
        isConnected = true;
    });
    events.bind('onDisconnect', function() {
        isConnected = false;
    });
    events.bind('onRoomChange', function() {
        isConnected = false;
    });
    events.bind('onResetVariables', function() {
        if (!isConnected) {
            unsafeWindow.users = new Array();
            unsafeWindow.playlist = new Array();
            unsafeWindow.playlist.move = function(old_index, new_index) //Code is property of Reid from stackoverflow
            {
                if (new_index >= this.length) {
                    var k = new_index - this.length;
                    while ((k--) + 1) {
                        this.push(undefined);
                    }
                }
                this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            };
            unsafeWindow.totalTime = 0;
            unsafeWindow.messages = 0;
            unsafeWindow.MAXMESSAGES = 175;
            unsafeWindow.mouseOverBio = false;
            unsafeWindow.autoscroll = true;
            unsafeWindow.isMod = false;
            unsafeWindow.isLeader = false;
            unsafeWindow.sliderTimer = false;
            unsafeWindow.mutedIps = new Array();
            unsafeWindow.userInfo = null;
            unsafeWindow.newMsg = false;
        }
    });
    //we are already connected
    if (unsafeWindow.userInfo) {
        isConnected = true;
    }

    GM_addStyle(GM_getResourceText('generalCSS'));
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}
var isConnected = false;

function logError(origin, err) {
    unsafeWindow.console.log("Error in %s %o, please check the console (ctrl + shift + j) and make a pastebin of everything in there", origin, err);
}

function isUsername(username) {
    return username.match(/^([A-Za-z0-9]|([\-_](?![\-_]))){5,16}$/) !== null;
}

function getActiveVideoIndex() {
    return $('.active').index();
}

function isUserMod() {
    return unsafeWindow.isMod;
}

function isBibbyRoom() {
    return unsafeWindow.ROOMNAME.match(/bibby/i) ? true : false;
}

function getIndexOfUser(id) {
    var i;
    for (i = 0; i < unsafeWindow.users.length; i += 1) {
        if (id === unsafeWindow.users[i].id) {
            return i;
        }
    }
    return -1;
}

function blockEvent(event) {
    event.stopPropagation();
}

function getUsernameArray(lowerCase) {
    var arr = [],
        i;
    for (i = 0; i < unsafeWindow.users.length; i += 1) {
        if (unsafeWindow.users[i].username !== 'unnamed') {
            if (!lowerCase) {
                arr.push(unsafeWindow.users[i].username);
            } else {
                arr.push(unsafeWindow.users[i].username.toLowerCase());
            }
        }
    }
    return arr;
}

function videoInfoEquals(info1, info2) {
    if (!info1 || !info2) {
        return false;
    }
    if (info1.provider && info1.provider === info2.provider &&
        info1.mediaType && info1.mediaType === info2.mediaType &&
        info1.id && info1.id === info2.id) {
        return true;
    }
    return false;
}

var thisUsername;

/*
 ** Returns the caret (cursor) position of the specified text field.
 ** Return value range is 0-oField.value.length.
 ** http://flightschool.acylt.com/devnotes/caret-position-woes/
 */
function doGetCaretPosition(oField) {

    // Initialize
    var iCaretPos = 0,
        oSel;

    // IE Support
    if (document.selection) {
        // Set focus on the element
        oField.focus();

        // To get cursor position, get empty selection range
        oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
    } else if (oField.selectionStart || oField.selectionStart === '0') { // Firefox support
        iCaretPos = oField.selectionStart;
    }

    // Return results
    return iCaretPos;
}

function doSetCaretPosition(oField, position) {
    //IE
    if (document.selection) {
        var oSel;
        oField.focus();
        oSel = document.selection.createRange();
        oSel.moveStart('character', position);
        oSel.moveEnd('character', position);
    } else if (oField.selectionStart || oField.selectionStart === '0') { // Firefox support
        oField.selectionStart = position;
        oField.selectionEnd = position;
    }
}

function pasteTextAtCaret(text) {
    var sel,
        range,
        textNode;
    if (unsafeWindow.getSelection) {
        // IE9 and non-IE
        sel = unsafeWindow.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            textNode = document.createTextNode(text);
            range.insertNode(textNode);

            // Preserve the selection
            range = range.cloneRange();
            range.setStartAfter(textNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.selection.type !== "Control") {
        // IE < 9
        document.selection.createRange().text = text;
    }
}
//----------------- end  General.js-----------------
//-----------------start greynameCount.js-----------------
function loadGreynameCountOnce() {
    events.bind('onAddUser', setViewerCount);
    events.bind('onRemoveUser', setViewerCount);
}

function setViewerCount() {
    $('#viewercount').html(String.format('{0}/{1}', blacknamesCount, greynamesCount));
}

function loadGreynameCount() {
    blacknamesCount = greynamesCount = modsCount = 0;
    for (i = 0; i < unsafeWindow.users.length; i += 1) {
        countUser(unsafeWindow.users[i], true);
    }
    setViewerCount();
}
events.bind('onDisconnect', function() {
    blacknamesCount = greynamesCount = modsCount = 0;
});
events.bind('onPostConnect', loadGreynameCount);
events.bind('onExecuteOnce', loadGreynameCountOnce);
//----------------- end  greynameCount.js-----------------
//-----------------start largeLayout.js-----------------
setField({
    'name': 'Layout',
    'data': {
        'label': 'Layout',
        'type': 'select',
        'options': ['normal', 'large'],
        'default': 'normal'
    },
    'section': 'General Additions'
});

function loadLayoutOnce() {
    var oldLayout = GM_config.get('Layout');
    events.bind('onSettingsOpen', function() {
        oldLayout = GM_config.get('Layout');
    });
    events.bind('onSettingsSave', function() {
        if (oldLayout !== GM_config.get('Layout')) {
            changeLayout();
            oldLayout = GM_config.get('Layout');
        }
    });

    largeLayoutCSS = GM_getResourceText('largeLayoutCSS');
    $('head').append($('<style>', {
        'id': 'layoutStyles'
    }));
}

function loadLayout() {
    $('#playlistcontrols').css('width', '100%');
    $('.roomFooter ').css('margin-top', '0px');

    function setLayout() {
        if (GM_config.get('Layout') !== $(this).text()) {
            GM_config.set('Layout', $(this).text());
            saveSettings();
        }
    }
    var normal = $('<a>', {
        'id': 'normalLayout'
    }).text('normal').click(setLayout).addClass('layoutClickable'),
        large = $('<a>', {
            'id': 'largeLayout'
        }).text('large').click(setLayout).addClass('layoutClickable');
    switch (GM_config.get('Layout')) {
        case 'normal':
            normal.addClass('layoutNotClickable');
            break;
        case 'large':
            large.addClass('layoutNotClickable');
            break;
    }
    $('<div>', {
        'id': 'layoutSelector'
    }).text('layout:').insertBefore('#roomFooter');
    $('#layoutSelector').append(normal).append(large);

    changeLayout();
}
var largeLayoutCSS;

function changeLayout() {
    $('#layoutSelector').children().each(function() {
        $(this).removeClass('layoutNotClickable');
    });
    $(String.format('#{0}Layout', GM_config.get('Layout'))).addClass('layoutNotClickable');
    $('#layoutStyles').text('');
    switch (GM_config.get('Layout')) {
        case 'large':
            //css by v4c with some minor changes http://userscripts.org/scripts/show/182167
            $('#layoutStyles').text(largeLayoutCSS);
            break;
    }
    setPlayerDimension();
    $("#videos").data("jsp").reinitialise(); //this uses alot of resources
}

function setPlayerDimension() {
    playerWidth = $('#media').width();
    playerHeight = $('#media').height();
}


events.bind('onExecuteOnce', loadLayoutOnce);
//----------------- end  largeLayout.js-----------------
//-----------------start leaderseal.js-----------------
function loadLeaderSeal() {
    var oldMakeLeader = unsafeWindow.makeLeader;
    unsafeWindow.makeLeader = function(userId) {
        oldMakeLeader(userId);
        $('#leaderSymbol').attr('src', 'http://i.imgur.com/BMpkAgE.png');
    };
}

events.bind('onPreConnect', loadLeaderSeal);
//----------------- end  leaderseal.js-----------------
//-----------------start loadUserlist.js-----------------
function loadNewLoadUserlist() {
    unsafeWindow.addUser = function(user, css) {
        user.css = css;
        var muted = unsafeWindow.isMuted(user.ip) ? "muted" : "",
            index = unsafeWindow.users.length,
            i,
            userElement;

        userElement = $('<div/>', {
            "class": "user_list " + muted,
            "data": {
                username: String(user.username),
                id: user.id,
                css: css
            },
            "click": function() {
                $('#cin').val($('#cin').val() + $(this).data('username'));
                $('#cin').focus();
            },
            "css": {
                "cursor": 'default'
            }
        }).append($('<div/>', {
                "class": css
            })
            .append($('<span/>', {
                "html": user.username
            })));
        userElement.hover(function() {
            var thisElement = $(this);
            $(this).data('hover', setTimeout(function() {
                $('#bio .username span').html(thisElement.data('username'));
                //$("#chat").offset().top is the offten from the top of the page, Use turnary operation: If bio goes above chat, minus some pixels
                $('#bio').css('top', ((thisElement.offset().top - $("#chat").offset().top - 15) < -10 ? -10 : thisElement.offset().top - $("#chat").offset().top - 15)); //cant be less than -10 pixels
                $('#bio .avatar img').attr('src', '');
                $('#bio .userinfo').html('');
                $('#bio').show();
                if (thisElement.data('css').indexOf('b') !== -1) {
                    unsafeWindow.getUserInfo(thisElement.data('username'), function(avatar, bio) {
                        $('#bio .avatar img').attr('src', avatar);
                        $('#bio .userinfo').html(bio);
                    });
                } else {
                    $('#bio .userinfo').html('<span style=\'color: grey;\'>Unregistered</span>');
                }
                $('#ban').data('id', user.id);
                $('#kick').data('id', user.id);
                $('#mute').data('ip', user.ip);
                $('#unmute').data('ip', user.ip);
                //show or hide mute/unmute buttons
                if (unsafeWindow.isMuted(user.ip)) {
                    $("#unmute").show();
                    $("#mute").hide();
                } else {
                    $("#mute").show();
                    $("#unmute").hide();
                }
            }, 600));
        }, function() {
            clearTimeout($(this).data('hover'));
            setTimeout(function() {
                if (!unsafeWindow.mouseOverBio) {
                    $('#bio').hide();
                }
            }, 50);
        });
        //Search for the index where we need to insert
        for (i = 0; i < unsafeWindow.users.length; i += 1) {
            if (compareUser(user, unsafeWindow.users[i]) < 0) {
                index = i;
                break;
            }
        }

        //Inserting the users rather than sorting afterwards
        if ($("#chat_users").children().length === 0 || index === unsafeWindow.users.length) {
            $("#chat_users").append(userElement);
        } else {
            $("#chat_users").children().eq(index).before(userElement);
        }
        unsafeWindow.users.splice(index, 0, user);
        $('#viewercount').html(unsafeWindow.users.length);
    };


    unsafeWindow.loadUserlist = function(userlist) {
        unsafeWindow.users = [];
        $('#chat_users').html('');
        var i,
            user,
            css;
        for (i = 0; i < userlist.length; i += 1) {
            user = userlist[i];
            css = '';
            if (user.loggedin) {
                css += 'b ';
                if (user.permissions > 0) {
                    css += 'm ';
                }
            }
            unsafeWindow.addUser(user, css, false);
        }
    };
    unsafeWindow.renameUser = function(id, username) {
        var user,
            i;
        //start from the end since unnamed will be at the end of the list
        for (i = unsafeWindow.users.length - 1; i >= 0; i -= 1) {
            if (unsafeWindow.users[i].id === id) {
                user = unsafeWindow.users[i];
                user.username = username;
                unsafeWindow.removeUser(id);
                unsafeWindow.addUser(user, '', false);
                break;
            }
        }
    };
}

function compareUser(a, b) {
    if (!b) {
        return -1;
    }
    if (a.loggedin !== b.loggedin) {
        return (a.loggedin) ? -1 : 1;
    }
    if (a.permissions !== b.permissions) {
        return parseInt(b.permissions, 10) - parseInt(a.permissions, 10);
    }

    return a.username.localeCompare(b.username);
}
//----------------- end  loadUserlist.js-----------------
//-----------------start logos.js-----------------
function loadLogos() {
    $('.descr-stat-tip :first').empty().append($('<div>', {
        'id': 'viewing-logo'
    })).attr('title', 'viewing');
    $('.descr-stat-tip :last').empty().append($('<div>', {
        'id': 'visits-logo'
    })).attr('title', 'visits');
    if (isBibbyRoom()) {
        var temp = $('.top-descr :first > :first');
        $('.top-descr').empty().append(
            $('<div>', {
                'id': 'room-logo'
            })
        ).append(temp);
    }
}

events.bind('onPreConnect', loadLogos);
//----------------- end  logos.js-----------------
//-----------------start pollMenu.js-----------------
function loadPollMenu() {
    $('#create-pollBtn').text('Poll Menu');
    $('#create-poll').empty().append(
        $('<button>', {
            'id': 'add-poll-options'
        }).text('+').click(function() {
            if ($('#create-poll > .create-poll-option').length < 10) {
                $('#create-poll').append(
                    $('<input/>', {
                        'class': 'formbox create-poll-option',
                        'placeholder': 'Option'
                    }).css('width', '97%')
                ).append($('<br>'));
            }
        }).css('margin-right', '0px')
    ).append(
        $('<button>').text('-').click(function() {
            if ($('#create-poll > .create-poll-option').length > 1) {
                $('#create-poll > :last-child').remove();
                $('#create-poll > :last-child').remove();
            }
        }).css('width', '22px').css('margin-right', '2px')
    ).append(
        $('<button>').text('Copy Old').click(function() {
            if (oldPoll) {
                var i = 0;
                $('#clear-poll-options').click();
                if ($('#create-poll > .create-poll-option').length < oldPoll.options.length) {
                    while (oldPoll.options.length > $('#create-poll > .create-poll-option').length) {
                        $('#add-poll-options').click();
                    }
                }
                $('#create-poll > #title').val(htmlDecode(oldPoll.title));
                $(".create-poll-option").each(function() {
                    $(this).val(htmlDecode(oldPoll.options[i].option));
                    i += 1;
                    if (i >= oldPoll.options.length) {
                        return false;
                    }
                });
            }
        })
    ).append(
        $('<button>', {
            'id': 'clear-poll-options'
        }).text('Clear').click(function() {
            $('#create-poll > #title').val('');
            $(".create-poll-option").each(function() {
                $(this).val('');
            });
        })
    ).append(
        $('<button>').text('Create').click(function() {
            var poll = {};
            poll.title = $("#title").val();
            poll.options = [];
            $(".create-poll-option").each(function() {
                if ($(this).val().trim() !== "") {
                    poll.options.push($(this).val().trim());
                }
            });
            unsafeWindow.global.sendcmd("poll-create", poll);
        })
    ).append(
        $('<br>')
    ).append(
        $('<input/>', {
            'class': 'formbox',
            'id': 'title',
            'placeholder': 'Poll Title'
        }).css('width', '97%')
    ).append(
        $('<br>')
    ).append(
        $('<input/>', {
            'class': 'formbox create-poll-option',
            'placeholder': 'Option'
        }).css('width', '97%')
    ).append(
        $('<br>')
    ).append(
        $('<input/>', {
            'class': 'formbox create-poll-option',
            'placeholder': 'Option'
        }).css('width', '97%')
    ).append(
        $('<br>')
    ).append(
        $('<input/>', {
            'class': 'formbox create-poll-option',
            'placeholder': 'Option'
        }).css('width', '97%')
    ).append(
        $('<br>')
    ).css('width', '400px');

    if (isConnected) {
        var poll = {};
        poll.title = $(".poll-title").text();
        poll.options = [];
        $('.poll-item').each(function() {
            poll.options.push({
                votes: $(this).children().eq(0).text(),
                option: $(this).children().eq(1).text()
            });
        });
        oldPoll = poll;
        if (poll.options.length !== 0) {
            unsafeWindow.createPoll(poll);
        }
    }
}

function loadPollMenuOnce() {
    events.bind('onCreatePoll', function(poll) {
        oldPoll = $.extend(true, {}, poll);
    }, true);
}

var oldPoll = {};

events.bind('onResetVariables', function() {
    oldPoll = {};
});
events.bind('onPreConnect', loadPollMenu);
events.bind('onExecuteOnce', loadPollMenuOnce);
//----------------- end  pollMenu.js-----------------
//-----------------start settingsLoader.js-----------------
function loadSettingsLoader() {
    //add the button
    $('#loginfrm > :first-child').before(
        $('<div>', {
            'id': 'addons-menu'
        }).append(
            $('<div>').append(
                $('<ul>').append(
                    $('<li>').append(
                        $('<a>', {
                            'id': 'addons-clicker'
                        }).append(
                            $('<img>', {
                                'src': 'http://i.imgur.com/V3vOIkS.png'
                            })
                        ).append('Addon Settings').click(function() {
                            if (GM_config.isOpen) {
                                GM_config.close();
                            } else {
                                GM_config.open();
                            }
                        })
                    )
                ).addClass('js')
            ).addClass('click-nav')
        )
    );
    $('.friendsList').detach().appendTo('#loginfrm');
    var fields = {},
        firstMiddle = true,
        firstInner = true,
        configCSS = GM_getResourceText('GM_configCSS'),
        outerProp,
        middleProp,
        innerProp;
    //combine each sections settings with each other
    //first items with no section (is a section when it has no type)
    for (outerProp in settingsFields) {
        if (settingsFields.hasOwnProperty(outerProp)) {
            if (settingsFields[outerProp].type) {
                fields[outerProp] = settingsFields[outerProp];
            }
        }
    }
    //sections
    for (outerProp in settingsFields) {
        if (settingsFields.hasOwnProperty(outerProp)) {
            if (!settingsFields[outerProp].type) {
                firstMiddle = true;
                //items with no sub section
                for (middleProp in settingsFields[outerProp]) {
                    if (settingsFields[outerProp].hasOwnProperty(middleProp)) {
                        if (middleProp !== 'isSection' && settingsFields[outerProp][middleProp].type) {
                            fields[middleProp] = settingsFields[outerProp][middleProp];
                            //first item has to have the section description
                            if (firstMiddle) {
                                firstMiddle = false;
                                fields[middleProp].section = [outerProp];
                            }
                        }
                    }
                } //no subsections
                //subsections
                for (middleProp in settingsFields[outerProp]) {
                    if (settingsFields[outerProp].hasOwnProperty(middleProp)) {
                        if (!settingsFields[outerProp][middleProp].type) {
                            firstInner = true;
                            //all the items in the subsection
                            for (innerProp in settingsFields[outerProp][middleProp]) {
                                if (settingsFields[outerProp][middleProp].hasOwnProperty(innerProp) && innerProp !== 'isSection') {
                                    fields[innerProp] = settingsFields[outerProp][middleProp][innerProp];
                                    //first item has to have the subsection description
                                    if (firstInner) {
                                        fields[innerProp].section = [, middleProp];
                                        firstInner = false;
                                    }
                                    //or both section/subsection description if there has been no item with no subsection
                                    if (firstMiddle) {
                                        firstMiddle = false;
                                        fields[innerProp].section = [outerProp, middleProp];
                                    }
                                } //has property
                            } //items in subsection
                        } //is no section
                    } //has property
                } //subsections
            } //is section
        } //has property
    } //sections

    GM_config.init({
        'id': 'GM_config',
        'title': String.format('<div style="height:50px";><img src="http://i.imgur.com/f3vYHNN.png" style="float:left;" height="50"/> <p style="margin:inherit;">InstaSynch Addon Settings</p><a style="margin:inherit; color:white;" href="https://github.com/Bibbytube/Instasynch-Addons/releases" target="_blank">{0}</a></div>', GM_info.script.version),
        'fields': fields,
        'css': configCSS,
        'events': {
            'open': function(args) {
                $('#GM_config').css('height', '90%').css('top', '55px').css('left', '5px').css('width', '375px');
                //collapse all items in the section
                $('#GM_config').each(function() {
                    $('#GM_config .section_header', this.contentWindow.document || this.contentDocument).click(function() {
                        $(this).nextUntil().slideToggle(250);
                    });
                });
                //collapse all items in the subsection
                $('#GM_config').each(function() {
                    $('#GM_config .section_desc', this.contentWindow.document || this.contentDocument).click(function() {
                        $(this).nextUntil('#GM_config .section_desc').slideToggle(250);
                    });
                });
                //Add a save and close button
                $('#GM_config').each(function() {
                    var saveAndCloseButton = $('#GM_config_closeBtn', this.contentWindow.document || this.contentDocument).clone(false);
                    saveAndCloseButton.attr({
                        id: 'GM_config_save_closeBtn',
                        title: 'Save and close window'
                    }).text("Save and Close").click(function() {
                        saveSettings(true);
                    });

                    $('#GM_config_buttons_holder > :last-child', this.contentWindow.document || this.contentDocument).before(saveAndCloseButton);
                });

                events.fire('onSettingsOpen');
            },
            'save': function(args) {
                events.fire('onSettingsSave');
            },
            'reset': function(args) {
                events.fire('onSettingsReset');
            },
            'close': function(args) {
                events.fire('onSettingsClose');
            }

        }
    });
    events.bind('onSettingsSaveInternal', function(data) {
        GM_config.save();
        if (data.close) {
            GM_config.close();
        }
    });
}

function saveSettings(close) {
    unsafeWindow.postMessage(JSON.stringify({
        action: 'onSettingsSaveInternal',
        data: {
            close: close
        }
    }), "*");
}
//----------------- end  settingsLoader.js-----------------
//-----------------start themes.js-----------------
setField({
    'name': 'Theme',
    'data': {
        'label': '<a style="color:white;" href="https://github.com/Bibbytube/Instasynch-Addons/tree/master/General%20Additions/Themes" target="_blank">Theme</a>',
        'type': 'select',
        'options': ['default'],
        'default': 'default'
    },
    'section': 'General Additions',
    'subsection': 'Themes'
});
setField({
    'name': 'CustomCSS',
    'data': {
        'label': 'Custom CSS url',
        'type': 'text',
        'default': ''
    },
    'section': 'General Additions',
    'subsection': 'Themes'
});
setField({
    'name': 'CustomCSSMode',
    'data': {
        'label': 'Custom CSS mode',
        'type': 'radio',
        'options': ['append', 'replace'],
        'default': 'append'
    },
    'section': 'General Additions',
    'subsection': 'Themes'
});

function loadThemesOnce() {
    $('head').append(
        $('<style>', {
            'id': 'theme'
        })
    ).append(
        $('<link>', {
            type: 'text/css',
            rel: 'stylesheet',
            id: 'theme-append'
        })
    );
    var oldTheme = GM_config.get('Theme'),
        oldCustomCSS = GM_config.get('CustomCSS'),
        oldCustomCSSMode = GM_config.get('CustomCSSMode');

    events.bind('onSettingsOpen', function() {
        oldTheme = GM_config.get('Theme'),
        oldCustomCSS = GM_config.get('CustomCSS'),
        oldCustomCSSMode = GM_config.get('CustomCSSMode');
    });
    events.bind('onSettingsSave', function() {
        if (oldTheme !== GM_config.get('Theme') ||
            oldCustomCSS !== GM_config.get('CustomCSS') ||
            oldCustomCSSMode !== GM_config.get('CustomCSSMode')) {
            applyThemes();
            oldTheme = GM_config.get('Theme'),
            oldCustomCSS = GM_config.get('CustomCSS'),
            oldCustomCSSMode = GM_config.get('CustomCSSMode');
        }
    });

    applyThemes();
}

function applyThemes() {
    $('#theme').text('');
    $('#theme-append').attr('href', '');

    if (GM_config.get('CustomCSS') === '') {
        $('#theme').text(GM_getResourceText(String.format('{0}Theme', GM_config.get('Theme'))));
    } else {
        if (GM_config.get('CustomCSSMode') === 'append') {
            $('#theme').text(GM_getResourceText(String.format('{0}Theme', GM_config.get('Theme'))));
        }
        $('#theme-append').attr('href', GM_config.get('CustomCSS'));
    }
}
//----------------- end  themes.js-----------------
//-----------------start youtubeSearch.js-----------------
function loadYoutbeSearchOnce() {
    searchResultTemplate = $('<a>', {
        'target': '_blank'
    }).append(
        $('<img>').addClass('search-result-thumbnail')
    ).append(
        $('<p>').append(
            $('<span>').addClass('text-shadow')
        ).addClass('search-result-duration')
    ).append(
        $('<div>').append(
            $('<div>', {
                'class': 'controlIcon',
                'title': 'Add Video'
            }).append(
                $('<div>').css('background-image', 'url(http://i.imgur.com/Fv1wJk5.png)').addClass('animationContainer')
            ).addClass('search-result-add')
        ).append(
            $('<span>').addClass('text-shadow').addClass('search-result-title')
        ).addClass('opacity0').addClass('search-result-inf')
    ).addClass('search-result');
}

function loadYoutubeSearch() {
    //insert search result container
    $('.poll-container').before(
        $('<div>', {
            'id': 'search-results'
        }).append(
            $('<div>', {
                'id': 'divmore'
            }).append(
                $('<input>', {
                    'id': 'prevButton'
                }).prop('disabled', true).prop('type', 'button').val('<< Prev').click(prevPage)
            ).append(
                $('<input>', {
                    'id': 'nextButton'
                }).prop('disabled', true).prop('type', 'button').val('Next >>').click(nextPage)
            )
        ).append(
            $('<div>', {
                'id': 'divclosesearch'
            }).addClass('x').click(closeResults)
        )
    );

    // Setting events on the URL input
    $("#URLinput").bind("keydown", function(event) {
        if (event.keyCode === $.ui.keyCode.ESCAPE) {
            closeResults();
        } else {
            if (searchTimeout) {
                clearInterval(searchTimeout);
            }
            searchTimeout = setTimeout(startSearch, 500);
        }
    });
}

function startSearch() {
    searchTimeout = null;
    closeResults();
    searchFirst();
}

function searchFirst() {
    query = $("#URLinput").val();
    if (query && query !== "") {
        urlInfo = urlParser.parse(query);
        entriesHistory = [];
        page = 0;
        $('#divmore').css('display', 'block');
        search(0, true, true);
    }
}

function prevPage() {
    page--;
    showResults(entriesHistory[page], page !== 0);
    $('#nextButton').prop('disabled', false);
}

function nextPage() {
    page++;
    showResults(entriesHistory[page], true);
    if (page === entriesHistory.length - 1) {
        if (entriesHistory[page].length === 9) {
            search((page + 1) * 9, false, false);
        }
    } else {
        $('#nextButton').prop('disabled', false);
    }
}

function search(startIndex, show, nextResults) {
    startIndex = startIndex + 1;
    var entries,
        url,
        prevButtonActive = startIndex !== 1;
    if (!urlInfo) {
        url = String.format("https://gdata.youtube.com/feeds/api/videos?v=2&alt=json&format=5&max-results=9&q={0}&start-index={1}&safeSearch=none", query, startIndex);
    } else { // is a link
        if (urlInfo.playlistId) {
            url = String.format("https://gdata.youtube.com/feeds/api/playlists/{0}?v=2&alt=json&max-results=9&start-index={1}&safeSearch=none", urlInfo.playlistId, startIndex);
        }
    }
    if (!url) {
        return;
    }
    $.getJSON(url, function(data) {
        entries = data.feed.entry;
        if (entries && entries.length !== 0) {
            entriesHistory.push(entries);
            if (show) {
                showResults(entries, prevButtonActive);
            }
            $('#nextButton').prop('disabled', false);
            if (nextResults) {
                search(startIndex + 9, false, false);
            }
        } else {
            $('#nextButton').prop('disabled', true);
        }
    });
}

function showResults(entries, prevButtonActive) {
    $('#prevButton').prop('disabled', !prevButtonActive);
    $('#nextButton').prop('disabled', true);
    $('.search-result').remove();
    $('#search-results').css('display', 'initial');

    var i;
    for (i = 0; i < 9 - entries.length; i += 1) {
        $('#search-results').prepend(
            $('<div>').css('cursor', 'default').addClass('search-result')
        );
    }
    for (i = entries.length - 1; i >= 0; i -= 1) {
        addEntry(entries[i]);
    }

}

function addEntry(entry) {
    var seconds,
        url,
        searchResult = searchResultTemplate.clone(false);

    if (entry.media$group.media$thumbnail === undefined) { //video got removed
        $('#search-results').prepend(
            $('<div>', {
                'class': 'search-result'
            }).text('Video Remove By Youtube').addClass('search-result').css('cursor', 'default')
        );
    } else {
        seconds = entry.media$group.yt$duration.seconds;

        searchResult.attr('href', urlParser.createUrl(urlParser.parse(entry.link[1].href))).hover(toggleElements, toggleElements);
        searchResult.find('>:eq(0)').attr('src', entry.media$group.media$thumbnail[0].url);
        searchResult.find('>:eq(1)>:eq(0)').text(formatTime(seconds)).css('color', getDurationColor(seconds));
        searchResult.find('>:eq(2)>:eq(1)').text(entry.title.$t);

        if (GM_config.get('button-animations')) {
            searchResult.find('>:eq(2)>:eq(0)').hover(function() {
                addAnimation($(this).children().eq(0), 'pulse');
            }, function() {
                removeAnimation($(this).children().eq(0), 'pulse');
            }).click(addSearchResultToPl);
        } else {
            searchResult.find('>:eq(2)>:eq(0)').click(addSearchResultToPl);
        }

        $('#search-results').prepend(searchResult);
    }
}

function getDurationColor(seconds) {
    if (seconds < 60 * 15) {
        return 'white';
    }
    if (seconds < 60 * 25) {
        return 'orange';
    }
    return 'red';
}

function formatTime(seconds) {
    var date = new Date(null),
        duration = '';
    date.setSeconds(seconds);
    if (date.getUTCHours() !== 0) {
        duration = date.getUTCHours() + 'h';
    }
    if ((date.getUTCMinutes() !== 0) || duration) {
        duration += date.getUTCMinutes() + 'm';
    }
    if ((date.getUTCSeconds() !== 0) || duration) {
        duration += date.getUTCSeconds() + 's';
    }
    return duration;
}

function closeResults() {
    $('#search-results').css('display', 'none');
}

function toggleElements() {
    $(this).find('>:eq(2)').toggleClass('opacity0');
}

function addSearchResultToPl(event) {
    unsafeWindow.global.sendcmd('add', {
        URL: $(this).parent().parent().attr('href')
    });
    return false;
}
var page = 0,
    query,
    urlInfo,
    entriesHistory,
    searchResultTemplate,
    searchTimeout;

events.bind('onPreConnect', loadYoutubeSearch);
events.bind('onExecuteOnce', loadYoutbeSearchOnce);
//----------------- end  youtubeSearch.js-----------------
//-----------------start mirrorPlayer.js-----------------
setField({
    'name': 'AutomaticPlayerMirror',
    'data': {
        'label': 'Automatic player mirror',
        'title': 'Mirros the player when the title contains something like [Mirrored]',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Player Additions'
});

function loadMirrorPlayer() {
    commands.set('regularCommands', "mirrorPlayer", toggleMirrorPlayer, 'Mirrors the embedded player.');

    events.bind('onPlayVideo', function(vidinfo, time, playing, indexOfVid) {
        if (containsMirrored(unsafeWindow.playlist[indexOfVid].title)) {
            if (!isPlayerMirrored) {
                toggleMirrorPlayer();
            }
        } else if (isPlayerMirrored) {
            toggleMirrorPlayer();
        }
    }, true);

    //checking the current video after loading the first time
    if (unsafeWindow.playlist.length !== 0) {
        setTimeout(function() {
            if (unsafeWindow.playlist && unsafeWindow.playlist[getActiveVideoIndex()] && containsMirrored(unsafeWindow.playlist[getActiveVideoIndex()].title)) {
                toggleMirrorPlayer();
            }
        }, 4000);
    }
}

function containsMirrored(title) {
    if (!GM_config.get('AutomaticPlayerMirror')) {
        return false;
    }
    var found = false,
        words = [
            'mirrored',
            'mirror'
        ],
        i;
    for (i = 0; i < words.length; i += 1) {
        if (title.toLowerCase().indexOf(words[i]) !== -1) {
            found = true;
            break;
        }
    }
    return found;
}

var isPlayerMirrored = false;


function toggleMirrorPlayer() {
    $('#media > :first-child').toggleClass('mirror');
    $('#block-fullscreen').toggleClass('block-fullscreen2');
    isPlayerMirrored = !isPlayerMirrored;
}

events.bind('onResetVariables', function() {
    isPlayerMirrored = false;
});
events.bind('onExecuteOnce', loadMirrorPlayer);
//----------------- end  mirrorPlayer.js-----------------
//-----------------start mousewheelvolumecontrol.js-----------------
/*
    Copyright (C) 2014  fugXD, filtering duplicate events, scroll speed dependent volume adjustments
*/

setField({
    'name': 'MouseWheelVolumecontrol',
    'data': {
        'label': 'Mousewheel volume control of the player (no ff atm)',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Player Additions',
    'subsection': 'Volume'
});

setField({
    'name': 'Volumebar',
    'data': {
        'label': 'Volume bar when changing volume',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Player Additions',
    'subsection': 'Volume'
});

function loadMouseWheelVolumecontrolOnce() {
    //prevent the site from scrolling while over the player
    function preventScroll(event) {
        if (GM_config.get('MouseWheelVolumecontrol') && mouserOverPlayer) {
            event.preventDefault();
            event.returnValue = !mouserOverPlayer;

            var currentVolumeScrollTime = new Date().getTime(),
                scrollDirection = (1.0 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY))); // -1 or 1 depending on direction, *1.0 forces float div

            if ((currentVolumeScrollTime - previousVolumeScrollTime) > 200) { // 'slow' scrolling
                adjustVolume(scrollDirection);
            } else if ((currentVolumeScrollTime - previousVolumeScrollTime) >= 10) {
                adjustVolume(6.66 * scrollDirection); // faster scrolling
            }
            previousVolumeScrollTime = currentVolumeScrollTime;
        }
    }
    unsafeWindow.onmousewheel = document.onmousewheel = preventScroll;
    if (unsafeWindow.addEventListener) {
        unsafeWindow.addEventListener('DOMMouseScroll', preventScroll, false);
    }

    //message origin = http: //www.youtube.com, data={"event":"infoDelivery","info":{"muted":false,"volume":0},"id":1}
    //listen to volume change on the youtube player
    events.bind('onPageMessage', function(data) {
        if (data.event && data.event === 'infoDelivery' && data.info && data.info.volume) {
            setGlobalVolume(data.info.volume);
        }
    });

    events.bind('onPlayerReady', function(oldPlayer, newPlayer) {
        if (vimeoVolumePollingIntervalId) {
            clearInterval(vimeoVolumePollingIntervalId);
            vimeoVolumePollingIntervalId = undefined;
        }
        initGlobalVolume();
        switch (newPlayer) {
            case 'vimeo':
                //since I didn't find a way to listen to volume change on the vimeo player we have to use polling here
                vimeoVolumePollingIntervalId = setInterval(function() {
                    $f($('#vimeo')[0]).api('getVolume', function(vol) {
                        setGlobalVolume(vol * 100.0);
                    });
                }, 500);
                break;
        }
    });
}

function loadMouseWheelVolumecontrol() {
    $('<div>', {
        'id': 'volumebar-container'
    }).append(
        $('<div>', {
            'id': 'volumebar'
        }).addClass('blur5')
    ).insertBefore('#media');

    //TODO: find firefox fix, mousescroll event doesnt fire while over youtube player

    //add hover event to the player
    $('#media').hover(
        function() {
            mouserOverPlayer = true;
        },
        function() {
            mouserOverPlayer = false;
        }
    );

}

var isPlayerReady = false,
    globalVolume = 50,
    oldGlobalVolume = 50,
    mouserOverPlayer = false,
    vimeoVolumePollingIntervalId,
    previousVolumeScrollTime = new Date().getTime(), // used to measure speed of scrolling
    volumebarFadeoutTimeout;

function setGlobalVolume(val) {
    oldGlobalVolume = globalVolume;
    globalVolume = val;
    if (oldGlobalVolume !== globalVolume) {
        displayVolumebar();
    }
}

function initGlobalVolume() {
    if (isPlayerReady) {
        setVol(globalVolume);
    } else {
        if (currentPlayer === 'youtube') {
            setVol($('#media').tubeplayer('volume'));
        } else if (currentPlayer === 'vimeo') {
            $f($('#vimeo')[0]).api('getVolume', function(vol) {
                setVol(vol * 100.0);
            });
        }
        isPlayerReady = true;
    }
}

// Increments or decrements the volume. This is to keep other code from having to know about globalVolume. Argument is desired change in volume.
function adjustVolume(deltaVolume) {
    setVol(globalVolume + deltaVolume);
}

function setUpVolumebarTimeout() {
    if (volumebarFadeoutTimeout) {
        clearTimeout(volumebarFadeoutTimeout);
    }
    volumebarFadeoutTimeout = setTimeout(function() {
        $('#volumebar').fadeOut("slow", function() {
            $('#volumebar').css('display', 'initial');
            $('#volumebar').css('display', 'none');
        });
    }, 500);
}

function displayVolumebar() {
    if (GM_config.get('Volumebar')) {
        $('#volumebar').stop();
        $('#volumebar').css('top', playerHeight - (globalVolume / 100) * playerHeight).css('height', (globalVolume / 100) * playerHeight).css('opacity', '1').css('display', 'initial');
        setUpVolumebarTimeout();
    }
}
// Set volume to specific value, argument is number 0-100
function setVol(volume) {
    // clamp input value
    volume = Math.max(0, volume);
    volume = Math.min(100, volume);
    setGlobalVolume(volume);

    if (currentPlayer === 'youtube') {
        $('#media').tubeplayer('volume', Math.round(volume));
    } else if (currentPlayer === 'vimeo') {
        $f($('#vimeo')[0]).api('setVolume', volume / 100.0);
    }
}

events.bind('onExecuteOnce', loadMouseWheelVolumecontrolOnce);
events.bind('onPreConnect', loadMouseWheelVolumecontrol);
//----------------- end  mousewheelvolumecontrol.js-----------------
//-----------------start NND-Mode.js-----------------
setField({
    'name': 'NNDMode',
    'data': {
        'label': 'NicoNicoDouga-Mode(scrolling text)',
        'type': 'checkbox',
        'default': false
    },
    'section': 'Player Additions',
    'subsection': 'NicoNicoDouga-Mode'
});
setField({
    'name': 'NNDModeEmotes',
    'data': {
        'label': 'Emotes',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Player Additions',
    'subsection': 'NicoNicoDouga-Mode'
});
setField({
    'name': 'NNDModeLimit',
    'data': {
        'label': 'Message Limit',
        'title': '-1 unlimited',
        'type': 'int',
        'min': -1,
        'default': -1,
        'size': 1
    },
    'section': 'Player Additions',
    'subsection': 'NicoNicoDouga-Mode'
});
setField({
    'name': 'NNDModeSpeed',
    'data': {
        'label': 'Speed',
        'title': '10 - 50',
        'type': 'int',
        'min': 3,
        'max': 50,
        'default': 25,
        'size': 1
    },
    'section': 'Player Additions',
    'subsection': 'NicoNicoDouga-Mode'
});
setField({
    'name': 'NNDModeFontSize',
    'data': {
        'label': 'Font-Size',
        'title': '10 - 50',
        'type': 'int',
        'min': 10,
        'max': 50,
        'default': 13,
        'size': 1
    },
    'section': 'Player Additions',
    'subsection': 'NicoNicoDouga-Mode'
});

function loadNNDModeOnce() {
    events.bind('onAddMessage', function(username, message, userstyle, textstyle) {
        if (GM_config.get('NNDMode') && username !== '' && message[0] !== '$' && !$.fullscreen.isFullScreen()) {
            if (GM_config.get('NNDModeLimit') < 0 || marqueeMessages.length < GM_config.get('NNDModeLimit')) {
                addMarqueeMessage(message);
            }
        }
    });
}

function loadNNDMode() {
    $('#media').css('position', 'relative');
    playerWidth = $('#media').width();
    playerHeight = $('#media').height();
}

var marqueeMessages = [],
    marqueeIntervalId,
    playerHeight,
    playerWidth;


function addMarqueeMessage(message) {
    var i,
        jqueryMessage,
        top;
    message = parseMessageForNND(message);
    jqueryMessage = $('<div>').append(
        $('<marquee direction="left" />').append(
            $('<div/>').html(message).css('font-size', GM_config.get('NNDModeFontSize')).css('opacity', 0.65)
        ).attr('scrollamount', GM_config.get('NNDModeSpeed'))
    ).css('color', 'white').css('position', 'absolute').css('width', playerWidth).css('pointer-events', 'none').addClass('text-shadow').addClass('NND-element');

    top = (Math.random() * (playerHeight - 60));
    jqueryMessage.css('top', top + 'px');
    $('#media').append(jqueryMessage);
    marqueeMessages.push({
        message: $('#media > div:last-Child'),
        min: jqueryMessage.children().eq(0).children().eq(0).position().left
    });
    if (!marqueeIntervalId) {
        marqueeIntervalId = setInterval(function() {
            if (marqueeMessages.length === 0) {
                clearInterval(marqueeIntervalId);
                marqueeIntervalId = undefined;
            }
            for (i = 0; i < marqueeMessages.length; i += 1) {
                marqueeMessages[i].min = Math.min(marqueeMessages[i].min, marqueeMessages[i].message.children().eq(0).children().eq(0).position().left);
                if (marqueeMessages[i].message.children().eq(0).children().eq(0).position().left > marqueeMessages[i].min) {
                    marqueeMessages[i].message.remove();
                    marqueeMessages.splice(i, 1);
                    i -= 1;
                }
            }

        }, 50);
    }
}

function parseMessageForNND(message) {
    var match = message.match(/^((\[[^\]]*\])*)\/([^\[ ]+)((\[.*?\])*)/i),
        word,
        emoteFound = false,
        greentext,
        emote,
        words,
        i,
        excludeTags = {
            '\\[rmarquee\\]': '<marquee>', //move text to right
            '\\[/rmarquee\\]': '</marquee>',
            '\\[alt\\]': '<marquee behavior="alternate" direction="right">', //alternate between left and right
            '\\[/alt\\]': '</marquee>',
            '\\[falt\\]': '<marquee behavior="alternate" scrollamount="50" direction="right">', //different speeds etc.
            '\\[/falt\\]': '</marquee>',
            '\\[marquee\\]': '<marquee direction="right">',
            '\\[/marquee\\]': '</marquee>',
            '\\[rsanic\\]': '<MARQUEE behavior="scroll" direction="left" width="100%" scrollamount="50">',
            '\\[/rsanic\\]': '</marquee>',
            '\\[sanic\\]': '<MARQUEE behavior="scroll" direction="right" width="100%" scrollamount="50">',
            '\\[/sanic\\]': '</marquee>'
        };
    if (match) {
        if (unsafeWindow.$codes.hasOwnProperty(match[3].toLowerCase())) {
            emoteFound = true;
            emote = unsafeWindow.$codes[match[3].toLowerCase()];
            if (GM_config.get('NNDModeEmotes')) {
                message = String.format("{0}{1}{2}", match[1], emote, match[4]);
            } else {
                message = String.format("{0}/{1}{2}", match[1], match[3].toLowerCase(), match[4]);
            }
        }
    } else {
        greentext = false;
        //if the text matches [tag]>* or >*
        if (message.match(/^((\[[^\]]*\])*)((&gt;)|>)/)) {
            greentext = true;
        } else {
            //split up the message and add hashtag colors #SWAG #YOLO
            words = message.split(" ");
            for (i = 0; i < words.length; i += 1) {
                if (words[i][0] === "#") {
                    words[i] = String.format("<span class='cm hashtext'>{0}</span>", words[i]);
                }
            }
            //join the message back together
            message = words.join(" ");
        }
        message = String.format("<span class='cm{0}'>{1}</span>", greentext ? ' greentext' : '', message);
    }
    for (word in filteredwords) {
        if (filteredwords.hasOwnProperty(word)) {
            message = message.replace(new RegExp(word, 'g'), filteredwords[word]);
        }
    }

    function parseAdvancedTags(match, $0, $1) {
        var ret = '',
            format;
        switch (word) {
            case 'hexcolor':
                format = '<span style="color:{0}">';
                break;
            case 'spoiler':
                format = '[spoiler]{0}[/spoiler]';
                break;
            default:
                format = '';
                break;
        }
        ret = String.format(format, $0, $1);
        return GM_config.get('Tags') ? ret : '';
    }

    //filter advancedTags    
    for (word in advancedTags) {
        if (advancedTags.hasOwnProperty(word)) {
            message = message.replace(advancedTags[word], parseAdvancedTags);
        }
    }

    //exclude tags
    for (word in excludeTags) {
        if (excludeTags.hasOwnProperty(word)) {
            message = message.replace(new RegExp(word, 'gi'), '');
        }
    }
    //text in spoilers will be black
    message = message.replace(/\[spoiler\]/gi, "<span style=\"background-color: #000;color:black;\" onmouseover=\"this.style.backgroundColor='#FFF';\" onmouseout=\"this.style.backgroundColor='#000';\">");

    function parseTags() {
        return GM_config.get('Tags') ? tags[word] : '';
    }
    //filter tags
    for (word in tags) {
        if (tags.hasOwnProperty(word) && word !== '\\[spoiler\\]') {
            message = message.replace(new RegExp(word, 'gi'), parseTags);
        }
    }
    if (emoteFound) {
        message = message.replace(/\[[^\]]*\]/, '');
    }
    return message;
}

events.bind('onExecuteOnce', loadNNDModeOnce);
events.bind('onPreConnect', loadNNDMode);
//----------------- end  NND-Mode.js-----------------
//-----------------start progressBar.js-----------------
setField({
    'name': 'ProgressBar',
    'data': {
        'label': 'Progress Bar above the Player',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Player Additions'
});

function loadProgressbarOnce() {
    var maxTime = 0,
        progressbarInterval,
        oldProgressBarSetting = GM_config.get('ProgressBar');

    events.bind('onSettingsOpen', function() {
        oldProgressBarSetting = GM_config.get('ProgressBar');
    });
    events.bind('onSettingsSave', function() {
        if (oldProgressBarSetting !== GM_config.get('ProgressBar')) {
            $("#progressbar-container").css('display', GM_config.get('ProgressBar') ? 'flex' : 'none');
            oldProgressBarSetting = GM_config.get('ProgressBar');
        }
    });

    function setUpInterval() {
        return setInterval(function() {
            unsafeWindow.video.time(function(time) {
                $("#progressbar").css('width', (time / maxTime) * playerWidth);
            });
        }, 200);
    }
    events.bind('onPlayVideo', function(vidinfo, time, playing, indexOfVid) {
        maxTime = unsafeWindow.playlist[indexOfVid].duration;
        $("#progressbar").css('width', '0px');
    });
    events.bind('onPlayerReady', function(oldPlayer, newPlayer) {
        progressbarInterval = setUpInterval();
    });

    function clearProgressbarInterval() {
        if (progressbarInterval) {
            clearInterval(progressbarInterval);
        }
    }
    events.bind('onPlayerChange', clearProgressbarInterval);
    events.bind('onPlayerDestroy', clearProgressbarInterval);
    events.bind('onDisconnect', clearProgressbarInterval);
    events.bind('onRoomChange', clearProgressbarInterval);

    events.bind('onDisconnect', function() {
        currentPlayer = '';
    });
}

function loadProgressbar() {
    $('.stage').prepend(
        $('<div>', {
            'id': 'progressbar-container'
        }).append(
            $('<hr>', {
                'id': 'progressbar'
            }).addClass('blur5')
        ).append(
            $('<div>').addClass('mirror')
        ).css('display', GM_config.get('ProgressBar') ? 'flex' : 'none')
    );
}

events.bind('onExecuteOnce', loadProgressbarOnce);
events.bind('onPreConnect', loadProgressbar);
//----------------- end  progressBar.js-----------------
//-----------------start togglePlayer.js-----------------
setField({
    'name': 'PlayerActive',
    'data': {
        'label': 'Videoplayer active',
        'title': '\'togglePlayer command',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Player Additions'
});

function loadTogglePlayer() {
    if (!GM_config.get('PlayerActive')) {
        setTimeout(unsafeWindow.video.destroyPlayer, 3000);
    }
}

function loadTogglePlayerOnce() {
    var oldPlayerActive = GM_config.get('PlayerActive'),
        oldPlayVideo = unsafeWindow.playVideo;

    commands.set('regularCommands', "togglePlayer", function() {
        toggleSetting();
        togglePlayer();
    }, 'Turns the embedded player on and off.');

    events.bind('onSettingsOpen', function() {
        oldPlayerActive = GM_config.get('PlayerActive');
    });

    events.bind('onSettingsSave', function() {
        if (oldPlayerActive !== GM_config.get('PlayerActive')) {
            togglePlayer();
            oldPlayerActive = GM_config.get('PlayerActive');
        }
    });

    unsafeWindow.playVideo = function(vidinfo, time, playing) {
        if (GM_config.get('PlayerActive')) {
            oldPlayVideo(vidinfo, time, playing);
        } else {
            var indexOfVid = unsafeWindow.getVideoIndex(vidinfo),
                addedby = unsafeWindow.playlist[indexOfVid].addedby,
                title = trimTitle(unsafeWindow.playlist[indexOfVid].title, 240);
            if (indexOfVid > -1) {
                $('.active').removeClass('active');
                if (GM_config.get('BigPlaylist')) {
                    $($('#tablePlaylistBody').children('tr')[indexOfVid]).addClass('active');
                    $('#slider').slider('option', 'max', unsafeWindow.playlist[indexOfVid].duration);
                    $('#sliderDuration').html('/' + unsafeWindow.secondsToTime(unsafeWindow.playlist[indexOfVid].duration));
                } else {
                    $($('#video-list').children('li')[indexOfVid]).addClass('active');
                }
                $('#vidTitle').html(String.format('{0}<div class=\'via\'> via {1}</div>', title, addedby));
            }
        }
    };

    function toggleSetting() {
        oldPlayerActive = !GM_config.get('PlayerActive');
        GM_config.set('PlayerActive', !GM_config.get('PlayerActive'));
        saveSettings();
    }
}

function togglePlayer() {
    if (!GM_config.get('PlayerActive')) {
        unsafeWindow.video.destroyPlayer();
    } else {
        unsafeWindow.global.sendcmd('reload', null);
    }
}

events.bind('onExecuteOnce', loadTogglePlayerOnce);
events.bind('onPostConnect', loadTogglePlayer);
//----------------- end  togglePlayer.js-----------------
//-----------------start bigPlaylist.js-----------------
/*
    Copyright (C) 2014  fugXD, Bibbytube modification
*/

setField({
    'name': 'BigPlaylist',
    'data': {
        'label': 'Big playlist with thumbnails',
        'type': 'checkbox',
        'default': true
    },
    'section': 'Playlist Additions'
});

function loadBigPlaylist() {

    if (GM_config.get('BigPlaylist')) {
        reloadPlaylistHTML();
        if (isConnected) {
            reloadPlaylist();
        }
    }
}

function loadBigPlaylistOnce() {
    var oldMakeLeader = unsafeWindow.makeLeader,
        oldAddVideo = unsafeWindow.addVideo,
        oldPlayVideo = unsafeWindow.playVideo,
        oldRemoveVideo = unsafeWindow.removeVideo,
        oldMoveVideo = unsafeWindow.moveVideo,
        oldPlaylist = $('#video-list').clone(true),
        oldIsLeader,
        oldBigPlaylistSetting = GM_config.get('BigPlaylist'),
        $originals,
        $helper,
        i;
    GM_addStyle(GM_getResourceText('bigPlaylistCSS'));

    events.bind('onConnect', function() {
        $('#tablePlaylistBody').empty();
    });

    function enableSortable() {
        if (GM_config.get('BigPlaylist')) {
            $("#tablePlaylistBody").sortable({
                update: function(event, ui) {
                    unsafeWindow.global.sendcmd('move', {
                        info: ui.item.data("info"),
                        position: ui.item.index()
                    });
                    $("#tablePlaylistBody").sortable("cancel");
                },
                start: function(event, ui) {
                    //Prevents click event from triggering when sorting videos
                    $("#tablePlaylistBody").addClass('noclick');
                },
                helper: function(e, tr) {
                    $originals = tr.children();
                    $helper = tr.clone();
                    $helper.children().each(function(index) {
                        // Set helper cell sizes to match the original sizes
                        $(this).width($originals.eq(index).width());
                    });
                    return $helper;
                },
                opacity: 0.5
            }).disableSelection();
            $("#tablePlaylistBody").sortable("enable");
        } else {
            //core.js, version 0.9.7
            $("#video-list").sortable({
                update: function(event, ui) {
                    unsafeWindow.global.sendcmd('move', {
                        info: ui.item.data("info"),
                        position: ui.item.index()
                    });
                    $("#video-list").sortable("cancel");
                },
                start: function(event, ui) {
                    //Prevents click event from triggering when sorting videos
                    $("#video-list").addClass('noclick');
                }

            });
            $("#video-list").sortable("enable");
        }
    }
    events.bind('onSettingsOpen', function() {
        oldBigPlaylistSetting = GM_config.get('BigPlaylist');
    });

    events.bind('onSettingsSave', function() {
        if (oldBigPlaylistSetting !== GM_config.get('BigPlaylist')) {
            reloadPlaylistHTML(oldPlaylist);
            reloadPlaylist();
            oldBigPlaylistSetting = GM_config.get('BigPlaylist');
            if (unsafeWindow.isLeader) {
                enableSortable();
            }
        }
    });
    events.bind('onMakeLeader', function() {
        oldIsLeader = unsafeWindow.isLeader;
    }, true);
    events.bind('onMakeLeader', function(userId) {
        if (GM_config.get('BigPlaylist')) {
            //InstaSynch core.js, version 0.9.7
            if (userId === unsafeWindow.userInfo.id) {
                enableSortable();
            } else if (oldIsLeader) {
                $("#tablePlaylistBody").sortable("disable");
            }
        }
    });


    function addBigPlaylistVideo(vidinfo) {
        unsafeWindow.playlist.push({
            info: vidinfo.info,
            title: vidinfo.title,
            addedby: vidinfo.addedby,
            duration: vidinfo.duration
        });

        var vidurl = urlParser.createUrl(vidinfo.info),
            vidicon = '',
            removeBtn;

        if (vidinfo.info.provider === 'youtube') {
            vidicon = 'https://www.youtube.com/favicon.ico';
        } else if (vidinfo.info.provider === 'vimeo') {
            vidicon = 'https://vimeo.com/favicon.ico';
        } else if (vidinfo.info.provider === 'twitch' && vidinfo.info.mediaType === 'stream') {
            vidicon = ''; // no need for icon, thumbnail for twitch says 'twitch.tv'
        }

        removeBtn = $('<div/>', {
            'class': 'removeBtn x',
            'title': 'Remove this video.',
            'click': function() {
                unsafeWindow.global.sendcmd('remove', {
                    info: $(this).parent().parent().data('info')
                });
            }
        });
        $('#tablePlaylistBody').append(
            $('<tr>', {
                'data': {
                    info: vidinfo.info
                }
            }).append(
                $('<td>').append(
                    $('<a>', {
                        'href': vidurl,
                        'target': '_blank'
                    }).append(
                        $('<img>', {
                            'src': vidinfo.info.thumbnail
                        })
                    ).append( // overlay icon for youtube or vimeo, bottom right
                        $('<img>', {
                            'src': vidicon
                        })
                    )
                ).addClass('playlist-thumbnail')
            ).append(
                $('<td>', {
                    'title': vidinfo.title
                }).append(
                    $('<div>').text(trimTitle(vidinfo.title, 100))
                ).on('click', function() {
                    //InstaSynch io.js, version 0.9.7
                    if ($("#tablePlaylistBody").hasClass("noclick")) {
                        $("#tablePlaylistBody").removeClass('noclick');
                    } else {
                        if (unsafeWindow.isLeader) {
                            unsafeWindow.global.sendcmd('play', {
                                info: $(this).parent().data('info')
                            });
                        } else {
                            $('#cin').val($('#cin').val() + unsafeWindow.getVideoIndex($(this).parent().data('info')) + ' ');
                            $('#cin').focus();
                        }
                    }
                }).addClass('playlist-title')
            ).append(
                $('<td>').html(unsafeWindow.secondsToTime(vidinfo.duration) + '<br/>' + vidinfo.addedby).addClass('playlist-duration')
            ).append($('<td>')
                .append(removeBtn)
                .append($('<br>')).addClass('table-playlist-controls')
                .append($('<div/>', {
                    "class": "info",
                    "title": "More information about this video.",
                    "click": function() {
                        $(".detailed-info").fadeIn(); //to show loading spinner
                        getVideoInfo(vidinfo.info, function(err, data) {
                            if (err) {
                                //output error
                            } else {
                                showVideoInfo(vidinfo.info, data);
                            }
                        });
                    }
                }))
            )
        );
        unsafeWindow.totalTime += vidinfo.duration;
        $('.total-videos').html(unsafeWindow.playlist.length + ' videos');
        $('.total-duration').html(unsafeWindow.secondsToTime(unsafeWindow.totalTime));
    }
    // override functions from InstaSynch's io.js, version 0.9.7
    // overrides addVideo, removeVideo, moveVideo and playVideo
    unsafeWindow.addVideo = function(vidinfo, updateScrollbar) {
        var timeTo = 0,
            selector = '#video-list';
        if (!GM_config.get('BigPlaylist')) {
            oldAddVideo(vidinfo);
        } else {
            addBigPlaylistVideo(vidinfo);
            selector = '#tablePlaylistBody';
        }
        refreshPlaylistScrollbar(updateScrollbar);
        timeTo = unsafeWindow.totalTime - vidinfo.duration;
        for (i = 0; i < getActiveVideoIndex(); i += 1) {
            timeTo -= unsafeWindow.playlist[i].duration;
        }
        $(selector + ' > :last-child').attr('title', String.format('{0} until this video gets played.', unsafeWindow.secondsToTime(timeTo)));
    };

    unsafeWindow.removeVideo = function(vidinfo, updateScrollbar) {
        var indexOfVid = unsafeWindow.getVideoIndex(vidinfo);
        if (!GM_config.get('BigPlaylist')) {
            oldRemoveVideo(vidinfo);
        } else {
            if (indexOfVid > -1 && indexOfVid < unsafeWindow.playlist.length) {
                unsafeWindow.totalTime -= unsafeWindow.playlist[indexOfVid].duration;
                unsafeWindow.playlist.splice(indexOfVid, 1);
                $($('#tablePlaylistBody').children('tr')[indexOfVid]).remove();
            }
            $('.total-videos').html(unsafeWindow.playlist.length + ' videos');
            $('.total-duration').html(unsafeWindow.secondsToTime(unsafeWindow.totalTime));
        }
        refreshPlaylistScrollbar(updateScrollbar);
        if (indexOfVid > getActiveVideoIndex()) {
            setupTimeTo();
        }

    };

    unsafeWindow.moveVideo = function(vidinfo, position) {
        if (!GM_config.get('BigPlaylist')) {
            oldMoveVideo(vidinfo, position);
        } else {
            var indexOfVid = unsafeWindow.getVideoIndex(vidinfo),
                playlistElements,
                k;
            if (indexOfVid > -1) {
                unsafeWindow.playlist.move(indexOfVid, position);
                playlistElements = $('#tablePlaylistBody tr').clone(true);
                playlistElements.move = function(old_index, new_index) {
                    if (new_index >= this.length) {
                        k = new_index - this.length;
                        while ((k--) + 1) {
                            this.push(undefined);
                        }
                    }
                    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
                };
                playlistElements.move(indexOfVid, position);
                $('#tablePlaylistBody').empty();
                $('#tablePlaylistBody').html(playlistElements);
            }
        }
        setupTimeTo();
    };

    unsafeWindow.playVideo = function(vidinfo, time, playing) {
        if (!GM_config.get('BigPlaylist')) {
            oldPlayVideo(vidinfo, time, playing);
        } else {
            var addedby = '',
                title = '',
                indexOfVid = unsafeWindow.getVideoIndex(vidinfo);
            if (indexOfVid > -1) {
                title = trimTitle(unsafeWindow.playlist[indexOfVid].title, 240);
                addedby = unsafeWindow.playlist[indexOfVid].addedby;
                $('.active').removeClass('active');
                $($('#tablePlaylistBody').children('tr')[indexOfVid]).addClass('active');
                $('#vidTitle').html(title + '<div class="via"> via ' + addedby + '</div>');
                unsafeWindow.video.play(vidinfo, time, playing);
                $('#slider').slider('option', 'max', unsafeWindow.playlist[indexOfVid].duration);
                $('#sliderDuration').html('/' + unsafeWindow.secondsToTime(unsafeWindow.playlist[indexOfVid].duration));
            }
        }
        if (unsafeWindow.playlist) {
            setupTimeTo();
        }
    };
}

function refreshPlaylistScrollbar(updateScrollbar) {
    if (!updateScrollbar) {
        return;
    }
    setTimeout(function() {
        $("#videos").data("jsp").reinitialise(); //this uses alot of resources
    }, 2000);
}

function setupTimeTo() {
    var timeTo = 0,
        i,
        selector = '#video-list';
    if (GM_config.get('BigPlaylist')) {
        selector = '#tablePlaylistBody';
    }

    for (i = 0; i <= getActiveVideoIndex(); i += 1) {
        $(selector).children().eq(i).attr('title', '[00:00] until this video gets played.');
    }
    for (i -= 1; i < unsafeWindow.playlist.length - 1 && i >= 0; i += 1) {
        timeTo += unsafeWindow.playlist[i].duration;
        $(selector).children().eq(i + 1).attr('title', String.format('{0} until this video gets played.', unsafeWindow.secondsToTime(timeTo)));
    }
}

function reloadPlaylistHTML(oldPlaylist) {
    if (!GM_config.get('BigPlaylist')) {
        $('#video-list').replaceWith(oldPlaylist);
    } else {
        // change unsafeWindow.playlist to table based
        $('#video-list').replaceWith(
            $('<table>', {
                'id': 'tablePlaylist'
            }).append(
                $('<tbody>', {
                    'id': 'tablePlaylistBody'
                })
            )
        );
    }
}

function reloadPlaylist(activeIndex) {
    var temp = unsafeWindow.playlist,
        i;
    unsafeWindow.playlist = [];
    unsafeWindow.playlist.move = function(old_index, new_index) //Code is property of Reid from stackoverflow
    {
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    };
    unsafeWindow.totalTime = 0;
    for (i = 0; i < temp.length; i += 1) {
        unsafeWindow.addVideo(temp[i], false);
    }
    refreshPlaylistScrollbar(true);
    unsafeWindow.global.sendcmd('reload', null);
}

function trimTitle(title, length) {
    if (title.length > length) {
        title = title.substring(0, length) + "...";
    }
    return title;
}
//----------------- end  bigPlaylist.js-----------------
//-----------------start ExportPlaylistCommand.js-----------------
function loadExportPlaylist() {
    commands.set('regularCommands', "exportPlaylist ", exportPlaylist, 'Exports the playlist to the clipboard. Optional Parameters: title duration addedby thumbnail all xml');
}


function exportPlaylist(params) {
    var rawOutput = '',
        xmlOutput = $('<playlist>'),
        videoxml = '',
        i = 0,
        options = 1,
        line = '',
        xml = false;

    for (i = 1; i < params.length; i += 1) {
        switch (params[i].toLowerCase()) {
            case 'title':
                options = options | 2;
                break;
            case 'duration':
                options = options | 4;
                break;
            case 'addedby':
                options = options | 8;
                break;
            case 'thumbnail':
                options = options | 16;
                break;
            case 'all':
                options = options | 31;
                break;
            case 'xml':
                xml = true;
                break;
        }
    }

    for (i = 0; i < unsafeWindow.playlist.length; i += 1) {
        line = '';
        videoxml = $('<video>');
        line += urlParser.createUrl(unsafeWindow.playlist[i].info);
        videoxml.append($('<url>').text(line));
        if ((options & 2) !== 0) { //title
            line += " " + unsafeWindow.playlist[i].title;
            videoxml.append($('<title>').text(unsafeWindow.playlist[i].title));
        }
        if ((options & 4) !== 0) { //duration
            line += " " + unsafeWindow.playlist[i].duration;
            videoxml.append($('<duration>').text(unsafeWindow.playlist[i].duration));
        }
        if ((options & 8) !== 0) { //addedby
            line += " " + unsafeWindow.playlist[i].addedby;
            videoxml.append($('<addedby>').text(unsafeWindow.playlist[i].addedby));
        }
        if ((options & 16) !== 0) { //thumbnail
            line += " " + unsafeWindow.playlist[i].info.thumbnail;
            videoxml.append($('<thumbnail>').text(unsafeWindow.playlist[i].info.thumbnail));
        }
        xmlOutput.append(videoxml);
        rawOutput += line + '\n';
    }
    if (xml) {
        rawOutput = $('<div>').append(xmlOutput.clone()).remove().html();
        //format the xml
        rawOutput = rawOutput.replace(/(<\/?video>)/g, '\n\t\$1');
        rawOutput = rawOutput.replace(/((<url>)|(<title>)|(<addedby>)|(<duration>)|(<thumbnail>))/g, '\n\t\t\$1');
        rawOutput = rawOutput.replace(/(<\/playlist>)/g, '\n\$1');
    }

    GM_setClipboard(rawOutput, 'text');
    unsafeWindow.addMessage('', 'Playlist has been copied to the clipboard', '', 'hashtext');
}

events.bind('onExecuteOnce', loadExportPlaylist);
//----------------- end  ExportPlaylistCommand.js-----------------
//-----------------start History.js-----------------
function loadHistory() {
    commands.set('regularCommands', "history", printHistory, 'Shows the last 9 played videos on the YoutubeSearch panel.');
    events.bind('onPlayVideo', function(vidinfo, time, playing, indexOfVid) {
        //Keep the last 9 videos
        if (history.length === 9) {
            history.pop();
        }
        if (history[history.length - 1] !== unsafeWindow.playlist[indexOfVid]) {
            var video = unsafeWindow.playlist[indexOfVid];
            history.splice(0, 0, {
                media$group: {
                    media$thumbnail: [{
                        url: video.info.thumbnail
                    }],
                    yt$duration: {
                        seconds: video.duration
                    }
                },
                title: {
                    $t: video.title
                },
                link: [{}, {
                    href: urlParser.createUrl(video.info)
                }]
            });
        }
    });
}

function printHistory() {
    $('#divmore').css('display', 'none');
    showResults(history);
}

var history = [];

events.bind('onExecuteOnce', loadHistory);
//----------------- end  History.js-----------------
//-----------------start wallcounter.js-----------------
function loadWallCounter() {

    var oldAddMessage = unsafeWindow.addMessage,
        value,
        output;

    //add commands
    commands.set('regularCommands', "printWallCounter", printWallCounter, 'Prints the length of the walls for each user.');
    commands.set('regularCommands', "printMyWallCounter", printMyWallCounter, 'Prints the length of your own wall.');

    events.bind('onAddVideo', function(vidinfo) {
        resetWallCounter();
        value = wallCounter[vidinfo.addedby];
        if (vidinfo.addedby === thisUsername) {
            unsafeWindow.addMessage('', String.format('Video added successfully. WallCounter: [{0}]', unsafeWindow.secondsToTime(value)), '', 'hashtext');
            if (isBibbyRoom() && value >= 3600) {
                output = String.format('Watch out {0} ! You\'re being a faggot by adding more than 1 hour of videos !', thisUsername);
                unsafeWindow.addMessage('', output, '', 'hashtext');
            }
        }
    });

    unsafeWindow.addMessage = function(username, message, userstyle, textstyle) {
        if (!(username === '' && message === 'Video added successfully.')) {
            oldAddMessage(username, message, userstyle, textstyle);
        }
    };

    events.unbind('onPostConnect', loadWallCounter);
    /*
     * Commented since this shit isnt working and I have no idea why
     */
    // //overwrite InstaSynch's removeVideo
    // unsafeWindow.removeVideo = function(vidinfo){
    //     var indexOfVid = getVideoIndex(vidinfo);
    //     video = unsafeWindow.playlist[indexOfVid];
    //     value = wallCounter[video.addedby];
    //     value -= video.duration;

    //     if(value > 0){
    //         wallCounter[video.addedby] = value;
    //     }else{
    //         delete wallCounter[video.addedby];
    //     }

    //     oldRemoveVideo(vidinfo);
    // };    
}
var wallCounter = {};

function resetWallCounter() {
    var video,
        value,
        i;
    wallCounter = {};
    for (i = 0; i < unsafeWindow.playlist.length; i += 1) {
        video = unsafeWindow.playlist[i];
        value = wallCounter[video.addedby];
        value = (value || 0) + video.duration;
        wallCounter[video.addedby] = value;
    }
}

function printWallCounter() {
    resetWallCounter();
    var output = "",
        key,
        strTemp;
    for (key in wallCounter) {
        if (wallCounter.hasOwnProperty(key)) {
            strTemp = '[{0}: {1}]';
            if (wallCounter[key] > 3600) {
                strTemp = "<span style='color:red'>" + strTemp + "</span>";
            }
            output += String.format(strTemp, key, unsafeWindow.secondsToTime(wallCounter[key]));
        }
    }
    unsafeWindow.addMessage('', output, '', 'hashtext');
}

function printMyWallCounter() {
    resetWallCounter();
    var output = "",
        timeToWall = 0,
        i;
    for (i = Math.max(getActiveVideoIndex(), 0); i < unsafeWindow.playlist.length; i += 1) {
        if (unsafeWindow.playlist[i].addedby.toLowerCase() === thisUsername.toLowerCase()) {
            break;
        }
        timeToWall += unsafeWindow.playlist[i].duration;
    }
    output = String.format('[{0}: {1}], {2} till your videos play.', thisUsername, unsafeWindow.secondsToTime(wallCounter[thisUsername] || 0), unsafeWindow.secondsToTime(timeToWall));
    unsafeWindow.addMessage('', output, '', 'hashtext');
}

events.bind('onResetVariables', function() {
    wallCounter = {};
});
events.bind('onPostConnect', loadWallCounter);
//----------------- end  wallcounter.js-----------------
//-----------------start jquery.bind-first-0.2.3.js-----------------
/*
 * jQuery.bind-first library v0.2.3
 * Copyright (c) 2013 Vladimir Zhuravlev
 *
 * Released under MIT License
 * @license
 *
 * Date: Thu Feb  6 10:13:59 ICT 2014
 **/

(function($) {
    var splitVersion = $.fn.jquery.split(".");
    var major = parseInt(splitVersion[0]);
    var minor = parseInt(splitVersion[1]);

    var JQ_LT_17 = (major < 1) || (major == 1 && minor < 7);

    function eventsData($el) {
        return JQ_LT_17 ? $el.data('events') : $._data($el[0]).events;
    }

    function moveHandlerToTop($el, eventName, isDelegated) {
        var data = eventsData($el);
        var events = data[eventName];

        if (!JQ_LT_17) {
            var handler = isDelegated ? events.splice(events.delegateCount - 1, 1)[0] : events.pop();
            events.splice(isDelegated ? 0 : (events.delegateCount || 0), 0, handler);

            return;
        }

        if (isDelegated) {
            data.live.unshift(data.live.pop());
        } else {
            events.unshift(events.pop());
        }
    }

    function moveEventHandlers($elems, eventsString, isDelegate) {
        var events = eventsString.split(/\s+/);
        $elems.each(function() {
            for (var i = 0; i < events.length; ++i) {
                var pureEventName = $.trim(events[i]).match(/[^\.]+/i)[0];
                moveHandlerToTop($(this), pureEventName, isDelegate);
            }
        });
    }

    function makeMethod(methodName) {
        $.fn[methodName + 'First'] = function() {
            var args = $.makeArray(arguments);
            var eventsString = args.shift();

            if (eventsString) {
                $.fn[methodName].apply(this, arguments);
                moveEventHandlers(this, eventsString);
            }

            return this;
        }
    }

    // bind
    makeMethod('bind');

    // one
    makeMethod('one');

    // delegate
    $.fn.delegateFirst = function() {
        var args = $.makeArray(arguments);
        var eventsString = args[1];

        if (eventsString) {
            args.splice(0, 2);
            $.fn.delegate.apply(this, arguments);
            moveEventHandlers(this, eventsString, true);
        }

        return this;
    };

    // live
    $.fn.liveFirst = function() {
        var args = $.makeArray(arguments);

        // live = delegate to the document
        args.unshift(this.selector);
        $.fn.delegateFirst.apply($(document), args);

        return this;
    };

    // on (jquery >= 1.7)
    if (!JQ_LT_17) {
        $.fn.onFirst = function(types, selector) {
            var $el = $(this);
            var isDelegated = typeof selector === 'string';

            $.fn.on.apply($el, arguments);

            // events map
            if (typeof types === 'object') {
                for (type in types)
                    if (types.hasOwnProperty(type)) {
                        moveEventHandlers($el, type, isDelegated);
                    }
            } else if (typeof types === 'string') {
                moveEventHandlers($el, types, isDelegated);
            }

            return $el;
        };
    }

})(jQuery);
//----------------- end  jquery.bind-first-0.2.3.js-----------------
//-----------------start jquery.fullscreen-0.4.1.min.js-----------------
/*
 * jQuery.fullscreen library v0.4.0
 * Copyright (c) 2013 Vladimir Zhuravlev
 *
 * @license https://github.com/private-face/jquery.fullscreen/blob/master/LICENSE
 *
 * Date: Wed Dec 11 22:45:17 ICT 2013
 **/
(function(e) {
    function t(e) {
        return e !== void 0
    }

    function n(t, n, l) {
        var r = function() {};
        r.prototype = n.prototype, t.prototype = new r, t.prototype.constructor = t, n.prototype.constructor = n, t._super = n.prototype, l && e.extend(t.prototype, l)
    }

    function l(e, n) {
        var l;
        "string" == typeof e && (n = e, e = document);
        for (var i = 0; r.length > i; ++i) {
            n = n.replace(r[i][0], r[i][1]);
            for (var o = 0; s.length > o; ++o)
                if (l = s[o], l += 0 === o ? n : n.charAt(0).toUpperCase() + n.substr(1), t(e[l])) return e[l]
        }
        return void 0
    }
    var r = [
        ["", ""],
        ["exit", "cancel"],
        ["screen", "Screen"]
    ],
        s = ["", "o", "ms", "moz", "webkit", "webkitCurrent"],
        i = navigator.userAgent,
        o = l("fullscreenEnabled"),
        u = -1 !== i.indexOf("Android") && -1 !== i.indexOf("Chrome"),
        c = !u && t(l("fullscreenElement")) && (!t(o) || o === !0),
        _ = e.fn.jquery.split("."),
        h = 2 > parseInt(_[0]) && 7 > parseInt(_[1]),
        f = function() {
            this.__options = null, this._fullScreenElement = null, this.__savedStyles = {}
        };
    f.prototype = {
        _DEFAULT_OPTIONS: {
            styles: {
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box"
            },
            toggleClass: null
        },
        __documentOverflow: "",
        __htmlOverflow: "",
        _preventDocumentScroll: function() {
            this.__documentOverflow = e("body")[0].style.overflow, this.__htmlOverflow = e("html")[0].style.overflow, e("body, html").css("overflow", "hidden")
        },
        _allowDocumentScroll: function() {
            e("body")[0].style.overflow = this.__documentOverflow, e("html")[0].style.overflow = this.__htmlOverflow
        },
        _fullScreenChange: function() {
            this.isFullScreen() ? (this._preventDocumentScroll(), this._triggerEvents()) : (this._allowDocumentScroll(), this._revertStyles(), this._triggerEvents(), this._fullScreenElement = null)
        },
        _fullScreenError: function(t) {
            this._revertStyles(), this._fullScreenElement = null, t && e(document).trigger("fscreenerror", [t])
        },
        _triggerEvents: function() {
            e(this._fullScreenElement).trigger(this.isFullScreen() ? "fscreenopen" : "fscreenclose"), e(document).trigger("fscreenchange", [this.isFullScreen(), this._fullScreenElement])
        },
        _saveAndApplyStyles: function() {
            var t = e(this._fullScreenElement);
            this.__savedStyles = {};
            for (var n in this.__options.styles) this.__savedStyles[n] = this._fullScreenElement.style[n], this._fullScreenElement.style[n] = this.__options.styles[n];
            this.__options.toggleClass && t.addClass(this.__options.toggleClass)
        },
        _revertStyles: function() {
            var t = e(this._fullScreenElement);
            for (var n in this.__options.styles) this._fullScreenElement.style[n] = this.__savedStyles[n];
            this.__options.toggleClass && t.removeClass(this.__options.toggleClass)
        },
        open: function(t, n) {
            t !== this._fullScreenElement && (this.isFullScreen() && this.exit(), this._fullScreenElement = t, this.__options = e.extend(!0, {}, this._DEFAULT_OPTIONS, n), this._saveAndApplyStyles())
        },
        exit: null,
        isFullScreen: null,
        isNativelySupported: function() {
            return c
        }
    };
    var p = function() {
        p._super.constructor.apply(this, arguments), this.exit = e.proxy(l("exitFullscreen"), document), this._DEFAULT_OPTIONS = e.extend(!0, {}, this._DEFAULT_OPTIONS, {
            styles: {
                width: "100%",
                height: "100%"
            }
        }), e(document).bind(this._prefixedString("fullscreenchange") + " MSFullscreenChange", e.proxy(this._fullScreenChange, this)).bind(this._prefixedString("fullscreenerror") + " MSFullscreenError", e.proxy(this._fullScreenError, this))
    };
    n(p, f, {
        VENDOR_PREFIXES: ["", "o", "moz", "webkit"],
        _prefixedString: function(t) {
            return e.map(this.VENDOR_PREFIXES, function(e) {
                return e + t
            }).join(" ")
        },
        open: function(e) {
            p._super.open.apply(this, arguments);
            var t = l(e, "requestFullscreen");
            t.call(e)
        },
        exit: e.noop,
        isFullScreen: function() {
            return null !== l("fullscreenElement")
        },
        element: function() {
            return l("fullscreenElement")
        }
    });
    var a = function() {
        a._super.constructor.apply(this, arguments), this._DEFAULT_OPTIONS = e.extend({}, this._DEFAULT_OPTIONS, {
            styles: {
                position: "fixed",
                zIndex: "2147483647",
                left: 0,
                top: 0,
                bottom: 0,
                right: 0
            }
        }), this.__delegateKeydownHandler()
    };
    n(a, f, {
        __isFullScreen: !1,
        __delegateKeydownHandler: function() {
            var t = e(document);
            t.delegate("*", "keydown.fullscreen", e.proxy(this.__keydownHandler, this));
            var n = h ? t.data("events") : e._data(document).events,
                l = n.keydown;
            h ? n.live.unshift(n.live.pop()) : l.splice(0, 0, l.splice(l.delegateCount - 1, 1)[0])
        },
        __keydownHandler: function(e) {
            return this.isFullScreen() && 27 === e.which ? (this.exit(), !1) : !0
        },
        _revertStyles: function() {
            a._super._revertStyles.apply(this, arguments), this._fullScreenElement.offsetHeight
        },
        open: function() {
            a._super.open.apply(this, arguments), this.__isFullScreen = !0, this._fullScreenChange()
        },
        exit: function() {
            this.__isFullScreen = !1, this._fullScreenChange()
        },
        isFullScreen: function() {
            return this.__isFullScreen
        },
        element: function() {
            return this.__isFullScreen ? this._fullScreenElement : null
        }
    }), e.fullscreen = c ? new p : new a, e.fn.fullscreen = function(t) {
        var n = this[0];
        return t = e.extend({
            toggleClass: null,
            overflow: "hidden"
        }, t), t.styles = {
            overflow: t.overflow
        }, delete t.overflow, n && e.fullscreen.open(n, t), this
    }
})(jQuery);
//----------------- end  jquery.fullscreen-0.4.1.min.js-----------------
//-----------------start UrlParser.js-----------------
var urlParser = new(function() {
    var match,
        provider, //the provider e.g. youtube,twitch ...
        mediaType, // stream, video or playlist (no youtube streams)
        id, //the video-id 
        channel, //for twitch and livestream
        playlistId, //youtube playlistId
        providers = {
            'parse': {},
            'createUrl': {}
        },
        result;

    this.parse = function(url) {
        match = url.match(/(https?:\/\/)?([^\.]+\.)?(\w+)\./i);
        provider = match ? match[3] : undefined;
        if (match && provider && providers.parse[provider]) {
            result = providers.parse[provider].call(this, url);
            if (result) {
                return {
                    'provider': result.provider || provider,
                    'mediaType': result.mediaType || 'video',
                    'id': result.id || undefined,
                    'playlistId': result.playlistId || undefined,
                    'channel': result.channel || undefined
                };
            }
        }
        return undefined;
    };
    this.bind = function(names, callbackParse, callbackCreareUrl) {
        for (var i = 0; i < names.length; i += 1) {
            providers.parse[names[i]] = callbackParse;
            providers.createUrl[names[i]] = callbackCreareUrl;
        }
    };
    this.createUrl = function(videoInfo) {
        if (videoInfo.provider && providers.createUrl[videoInfo.provider]) {
            return providers.createUrl[videoInfo.provider].call(this, videoInfo);
        }
        return undefined;
    };
})();

urlParser.bind(['youtu', 'youtube'], function(url) {
    var match,
        mediaType,
        id,
        playlistId;
    match = url.match(/(((v|be|videos)\/)|(v=))([\w\-]{11})/i);
    id = match ? match[5] : undefined;
    match = url.match(/list=([\w\-]+)/i);
    playlistId = match ? match[1] : undefined;

    if (!id && !playlistId) {
        return undefined;
    }
    if (id) {
        mediaType = 'video';
    } else {
        mediaType = 'playlist';
    }
    return {
        'provider': 'youtube',
        'mediaType': mediaType,
        'id': id,
        'playlistId': playlistId
    };
}, function(videoInfo) {
    var url;
    if (videoInfo.mediaType === 'video') {
        if (!videoInfo.playlistId) {
            url = String.format('http://youtu.be/{0}', videoInfo.id);
        } else {
            url = String.format('https://www.youtube.com/watch?v={0}&list={1}', videoInfo.id, videoInfo.playlistId);
        }
    } else if (videoInfo.mediaType === 'playlist') {
        url = String.format('https://www.youtube.com/playlist?feature=share&list={0}', videoInfo.playlistId);
    }
    return url;
});

urlParser.bind(['vimeo'], function(url) {
    var match,
        id;
    match = url.match(/(\/((channels\/[\w]+)|(album\/\d+)?\/video))?\/(\d+)/i);
    id = match ? match[5] : undefined;
    if (!id) {
        return undefined;
    }
    return {
        'id': id
    };
}, function(videoInfo) {
    return String.format('http://vimeo.com/{0}', videoInfo.id);
});

urlParser.bind(['twitch'], function(url) {
    var match,
        mediaType,
        id,
        channel;
    match = url.match(/twitch\.tv\/(\w+)(\/.\/(\d+))?/i);
    channel = match ? match[1] : undefined;
    match = url.match(/((\?channel)|(\&utm_content))=(\w+)/i);
    channel = match ? match[1] : channel;
    if (!channel) {
        return undefined;
    }
    id = match[4];
    if (id) {
        mediaType = 'video';
    } else {
        mediaType = 'stream';
    }
    return {
        'mediaType': mediaType,
        'id': id,
        'channel': channel
    };
}, function(videoInfo) {
    var url;
    if (videoInfo.mediaType === 'stream') {
        url = String.format('http://twitch.tv/{0}', videoInfo.channel);
    } else if (videoInfo.mediaType === 'video') {
        url = String.format('http://twitch.tv/{0}/c/{1}', videoInfo.channel, videoInfo.id);
    }
    return url;
});

urlParser.bind(['dai', 'dailymotion'], function(url) {
    var match,
        id;
    provider = 'dailymotion';
    match = url.match(/((\/video)|(ly))\/([^_]+)/i);
    id = match ? match[4] : undefined;
    if (!id) {
        return undefined;
    }
    return {
        'provider': 'dailymotion',
        'id': id
    };
}, function(videoInfo) {
    return String.format('http://dai.ly/{0}', videoInfo.id);;
});

urlParser.bind(['livestream'], function(url) {
    var match,
        channel;
    //not finished
    match = url.match(/livestream\.com\/(\w+)/i);
    channel = match ? match[1] : undefined;
    if (!channel) {
        return undefined;
    }

    return {
        'mediaType': 'stream',
        'channel': channel
    };
});
//----------------- end  UrlParser.js-----------------
//-----------------start deployFooter.js-----------------
unsafeWindow.addEventListener('load', function() {
    function loadStuff() {
        if (unsafeWindow.global.page.name === 'room') {
            events.fire('onResetVariables');

            events.fire('onPreConnect');

            events.once('onPostConnect', loadAutoComplete);
            events.once('onPostConnect', setPlayerDimension);
            if (isConnected) {
                postConnect();
            } else {
                events.once('onUserlist', postConnect);
            }
            unsafeWindow.addMessage('', String.format('<strong>Script {0} loaded.<br>Changelog: {1}</strong>', GM_info.script.version, 'https://github.com/Bibbytube/Instasynch-Addons/releases'), '', 'hashtext');
        }
    }
    events.bind('onExecuteOnce', loadEventsOnce);
    events.fire('onExecuteOnce');
    loadStuff();
    events.bind('onRoomChange', loadStuff);

}, false);
//----------------- end  deployFooter.js-----------------
