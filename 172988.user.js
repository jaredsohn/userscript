// ==UserScript==
// @name ChaturbateBetterModding
// @namespace http://www.vpycha.com/gmscripts
// @description Provides a better modding interface for the cam girls site of chaturbate.com. This script makes modding faster and easier. Check out the details.
// @include http://chaturbate.com/*
// @include http://*.chaturbate.com/*
// @exclude http://serve.ads.chaturbate.com/*
// @grant none
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version 2.4
// ==/UserScript==

// Author: vlad88x
// First revision created and released on: July 2013

// The home page of this script is: http://userscripts.org/scripts/show/172988
// There is also a detailed description of this script there.

function doBetterModdingChanges() {
  var messagesCountMax = 200;
  var mostRecentMessagesCount = 4;
  var doRealDeleteWhenCollapsingMessages = false;
  var cookieExpirePeriod = 1 * 365;
  var pixelsToScrollOffChatBottom = 5;
  var expandChar = '+';
  var collapseChar = '-';

  var output = document.getElementById('ChaturbateBetterModding');
  output.innerHTML = 'ChaturbateBetterModding user script is active<br /><span title="In simulation mode you can excersize modding without having to be a mod"><label for="ChaturbateBetterModding_SimulationMode">Simulation mode: </label><input id="ChaturbateBetterModding_SimulationMode" type="checkbox" /></span>';

  var $ = jQuery;
  $.error = console.error;

  function strStartsWith(str, prefix) {
    return str.substring(0, prefix.length) === prefix;
  }

  function strEndsWith(str, suffix) {
    return str.substring(str.length - suffix.length) === suffix;
  }

  var oldConfirm = window.confirm;
  var silenceMsgTemplateLocalized = gettext("Silence %(username)s?");
  window.confirm = function(msg) {
    var parts = silenceMsgTemplateLocalized.split('%(username)s');
    if (strStartsWith(msg, parts[0]) && strEndsWith(msg, parts[1])) {
      var userToSilence = msg.substring(parts[0].length, msg.length - parts[1].length);
      var usernameValidationRegExp = /^\S+$/;
      if (userToSilence.replace(usernameValidationRegExp, '') === '') {
        return true;
      }
    }
    return oldConfirm(msg);
  }

  var theElement = document.body;

  var simulationModeCookieName = 'btmd_sim_mode';
  var deletedMessagesShouldBeExpandedCookieName = 'btmd_expand';

  var simulationMode = $.cookie(simulationModeCookieName) == '1';
  var deletedMessagesShouldBeExpanded = $.cookie(deletedMessagesShouldBeExpandedCookieName) == '1';

  setSimulationModeCookie();
  setDeletedMessagesShouldBeExpandedCookie();

  function setSimulationModeCookie() {
    $.cookie(simulationModeCookieName, simulationMode ? '1' : '0', {
        expires: cookieExpirePeriod,
        path: '/'
    });
  }
  function setDeletedMessagesShouldBeExpandedCookie() {
    $.cookie(deletedMessagesShouldBeExpandedCookieName, deletedMessagesShouldBeExpanded ? '1' : '0', {
        expires: cookieExpirePeriod,
        path: '/'
    });
  }

  var simulationModeCheckbox = document.getElementById('ChaturbateBetterModding_SimulationMode');
  simulationModeCheckbox.checked = simulationMode;
  simulationModeCheckbox.onclick = function(evt) {
    simulationMode = this.checked;
    this.blur();
    document.body.focus();
    setSimulationModeCookie();
  }

  var domele = $(theElement.getElementsByClassName('chat-list')[0]);
  var chat = domele.get(0);

  var messagesCount = 0;
  var previousChatOuterWidth = 0;

  var pathArray = window.location.pathname.split('/');
  var broadcaster;
  if (pathArray.length == 3 && pathArray[0] == "" && pathArray[1] != "" && pathArray[2] == "") {
    broadcaster = pathArray[1];
  }
  else
  if (pathArray.length == 4 && pathArray[0] == "" && pathArray[1] == "b" && pathArray[2] != "" && pathArray[3] == "") {
    broadcaster = pathArray[2];
  }
  else {
    return;
  }

  var controlsContainer = document.createElement('div');
  controlsContainer.innerHTML = '<input type="button" id="ChaturbateBetterModding_ChatLength" value="' + messagesCount + '" title="Click to delete all messages except the\nlast page, or except the last ' + mostRecentMessagesCount + ' messages\nif clicked with Shift key down" /><br />' +
    '<input type="button" id="ChaturbateBetterModding_ToggleExpand" value="' + (deletedMessagesShouldBeExpanded ? collapseChar : expandChar) + '" title="Click to toggle the automatic expanding or collapsing of\ndeleted messages and to expand or collapse all of them\n(keyboard shortcut is <), or click it with Shift key down to\ndo it without the toggling (shortcut is >)" />';
  controlsContainer.style.textAlign = 'center';
  document.body.appendChild(controlsContainer);
  var chatLengthButton = document.getElementById('ChaturbateBetterModding_ChatLength');
  var toggleExpandButton = document.getElementById('ChaturbateBetterModding_ToggleExpand');
  chatLengthButton.style.paddingLeft = '1px';
  chatLengthButton.style.paddingRight = '1px';
  toggleExpandButton.style.paddingLeft = '1px';
  toggleExpandButton.style.paddingRight = '1px';
  var origValue = chatLengthButton.value;
  chatLengthButton.value = 266;
  var chatLengthButtonMinWidth = $(chatLengthButton).outerWidth(); // really outer width is correct here, I do not know why not inner width
  chatLengthButton.value = origValue;
  chatLengthButton.style.minWidth = chatLengthButtonMinWidth + 'px';
  toggleExpandButton.style.minWidth = chatLengthButtonMinWidth + 'px';
  setControlsContainerPosition();
  window.ChaturbateBetterModding_updateControlsContainerPosition = setControlsContainerPosition;

  function setControlsContainerPosition() {
    var chatPosition = domele.offset();
    controlsContainer.style.position = 'absolute';
    var chatOuterWidth = domele.outerWidth();
    if (previousChatOuterWidth && previousChatOuterWidth - chatOuterWidth == 1) {
      // this is a work-aroud
      chatOuterWidth = previousChatOuterWidth;
    }
    else {
      previousChatOuterWidth = chatOuterWidth;
    }
    var left = chatPosition.left + chatOuterWidth + 10;
    var top = chatPosition.top;
    if (left + controlsContainer.clientWidth > document.body.scrollWidth) {
      left = chatPosition.left + chatOuterWidth - controlsContainer.clientWidth - 20;
      top -= 9;
    }
    controlsContainer.style.left = left + 'px';
    controlsContainer.style.top = top + 'px';
  }

  var updateChatLength = function() {
    //var length = chat.childNodes.length;
    var length = messagesCount;
    chatLengthButton.value = length.toString();
    if (length >= messagesCountMax) {
      chatLengthButton.style.color = 'rgb(255,0,0)';
    }
    else {
      chatLengthButton.style.color = '';
    }
  }

  chatLengthButton.onclick = function(evt) {
    if (document.activeElement == chatLengthButton) {
      chatLengthButton.blur();
      document.body.focus();
    }

    var bigDelete = evt.shiftKey;

    var recentMessagesCount;
    if (bigDelete) {
      recentMessagesCount = mostRecentMessagesCount;
    }
    else {
      recentMessagesCount = 0;
      var totalHeight = 0;
      var node = chat.lastChild;
      do {
        while (node && node.nodeName != 'DIV') {
          node = node.previousSibling;
        }
        if (!node) {
          break;
        }
        totalHeight += $(node).outerHeight(true);
        recentMessagesCount++;
        node = node.previousSibling;
      } while (totalHeight < chat.clientHeight + pixelsToScrollOffChatBottom);
    }

    while (messagesCount > recentMessagesCount) {
      while (chat.firstChild.nodeName != 'DIV') {
        chat.removeChild(chat.firstChild);
      }
      chat.removeChild(chat.firstChild);
      messagesCount--;
    }

    chat.scrollTop = chat.scrollHeight;
    updateChatLength();
  }

  var messagesToRemove = [];

  chat.addEventListener('scroll', onChatScroll, false);

  var silencedNickAttr = 'data-silenced-nick';
  var silencerNickAttr = 'data-silencer-nick';
  var deletedMessageHeight = '10px';

  function is_at_bottom() {
    return chat.scrollTop >= chat.scrollHeight - chat.clientHeight;
  }

  function onChatScroll(evt) {
    if (messagesToRemove.length > 0 && is_at_bottom()) {
      for (var i = messagesToRemove.length - 1; i >= 0; i--) {
        var msgDiv = messagesToRemove[i];
        messagesToRemove[i] = null;
        if (!deletedMessagesShouldBeExpanded && msgDiv && msgDiv.parentNode) {
          //msgDiv.parentNode.removeChild(msgDiv);
          if (!msgDiv.htmlBeforeDeleting) {
            deleteMessage(msgDiv);
          }
        }
        messagesToRemove.length = i;
      }
    }
  }

  var bannedNickAttr = 'data-banned-nick';

  function getSilencedByTitle(silencer_nick) {
    return 'silenced by ' + silencer_nick;
  }

  var deletedMessageBgColor = 'rgb(225,225,225)';

  var on_user_silenced = function (silenced_nick, silencer_nick) {
    $(".chat-list > div.text > [data-nick='" + silenced_nick + "']").each(function (index, value) {
      //$(this).parent("div.text").remove();

      var msgDiv = this.parentNode;
      if (!msgDiv.getAttribute(silencedNickAttr) && !msgDiv.getAttribute(bannedNickAttr)) {
        msgDiv.setAttribute(silencedNickAttr, silenced_nick);
        msgDiv.setAttribute(silencerNickAttr, silencer_nick);
        msgDiv.setAttribute('title', getSilencedByTitle(silencer_nick));
        msgDiv.style.background = '';
        msgDiv.style.backgroundColor = deletedMessageBgColor;
        messagesToRemove[messagesToRemove.length] = msgDiv;
      }

      onChatScroll(null);
    });
    /*var text = interpolate(gettext("User %(username)s was silenced by %(silencer)s and his/her messages have been removed"), {
        username: silenced_nick,
        silencer: silencer_nick
    }, true);*/
    var text = 'User ' + silenced_nick + ' was silenced by ' + silencer_nick;
    $.add_system_message(text, domele);
  };

  var kickedOutTitle = 'kicked out';

  var on_user_banned = function (username) {
    $(".chat-list > div.text > [data-nick='" + username + "']").each(function (index, value) {
      //$(this).parent("div.text").remove();

      var msgDiv = this.parentNode;
      if (!msgDiv.getAttribute(bannedNickAttr)) {
        if (msgDiv.getAttribute(silencedNickAttr)) {
          msgDiv.removeAttribute(silencedNickAttr);
          msgDiv.removeAttribute(silencerNickAttr);
        }

        msgDiv.setAttribute(bannedNickAttr, username);
        msgDiv.setAttribute('title', kickedOutTitle);
        msgDiv.style.background = '';
        msgDiv.style.backgroundColor = deletedMessageBgColor;
        messagesToRemove[messagesToRemove.length] = msgDiv;

        msgDiv.style.outlineColor = 'rgb(40,40,40)';
        msgDiv.style.outlineWidth = '2px';
        msgDiv.style.outlineStyle = 'solid';
      }

      onChatScroll(null);
    });
    /*var text = interpolate(gettext("User %(username)s was silenced by %(silencer)s and his/her messages have been removed"), {
        username: silenced_nick,
        silencer: silencer_nick
    }, true);*/
    var text = 'User ' + username + ' was kicked out of the room';
    $.add_system_message(text, domele);
  };

  var old_add_message;
  var message_outbound = null;

  setTimeout(function() {
    var message_receiver = flash_handler.defchat_message_receiver;

    message_receiver.on_user_silenced = on_user_silenced;
    message_receiver.on_user_banned = on_user_banned;

    old_add_message = message_receiver.add_message;
    messagesCount = domele.find('> div').length;
    message_receiver.add_message = add_message;

    message_outbound = flash_handler.message_outbound;

    setControlsContainerPosition();
  }, 1);

  function undeleteMessage(msgDiv) {
      msgDiv.style.height = '';
      msgDiv.childNodes[0].style.display = '';
      if (doRealDeleteWhenCollapsingMessages) {
        msgDiv.childNodes[1].innerHTML = msgDiv.htmlBeforeDeleting;
      }
      else {
        msgDiv.childNodes[1].style.display = '';
      }
      msgDiv.htmlBeforeDeleting = '';
      if (msgDiv.hasAttribute(silencedNickAttr)) {
        var silencer_nick = msgDiv.getAttribute(silencerNickAttr);
        msgDiv.setAttribute('title', getSilencedByTitle(silencer_nick));
      }
      else
      if (msgDiv.hasAttribute(bannedNickAttr)) {
        msgDiv.setAttribute('title', kickedOutTitle);
      }
  }

  function deleteMessage(msgDiv) {
    if (doRealDeleteWhenCollapsingMessages) {
      msgDiv.htmlBeforeDeleting = msgDiv.childNodes[1].innerHTML;
      msgDiv.childNodes[1].innerHTML = '';
    }
    else {
      msgDiv.htmlBeforeDeleting = '1';
      msgDiv.childNodes[1].style.display = 'none';
    }
    msgDiv.childNodes[0].style.display = 'none';
    msgDiv.style.height = deletedMessageHeight;
    if (msgDiv.hasAttribute(silencedNickAttr)) {
      var silenced_nick = msgDiv.getAttribute(silencedNickAttr);
      var silencer_nick = msgDiv.getAttribute(silencerNickAttr);
      msgDiv.setAttribute('title', '' + silenced_nick + ', silenced by ' + silencer_nick);
    }
    else
    if (msgDiv.hasAttribute(bannedNickAttr)) {
      var username = msgDiv.getAttribute(bannedNickAttr);
      msgDiv.setAttribute('title', '' + username + ', kicked out');
    }
  }

  function add_message(message, domeleParam) {
    if (!domeleParam) {
      domeleParam = domele;
    }
    if (domeleParam.get(0) != chat) {
      return old_add_message.call(this, message, domeleParam);
    }
    var oldFind = domeleParam.find;
    domeleParam.find = function(selector) {
      if (selector == 'div.text') {
        return [];
      }
      return oldFind.call(this, selector);
    };
    var originalScrollTop = chat.scrollTop;
    var at_bottom = is_at_bottom();
    var result;
    try {
      result = old_add_message.call(this, message, domeleParam);
    }
    finally {
      domeleParam.find = oldFind;
    }
    messagesCount++;
    var totalHeight = 0;
    while (messagesCount > messagesCountMax) {
      var element = chat.firstChild;
      if (!at_bottom) {
        var outerHeight = $(element).outerHeight(true);
        totalHeight += outerHeight;
      }
      chat.removeChild(element);
      messagesCount--;
    }
    if (at_bottom) {
        chat.scrollTop = chat.scrollHeight;
    }
    else {
      chat.scrollTop = originalScrollTop - totalHeight;
    }
    updateChatLength();
    return result;
  }

  chat.addEventListener('dblclick', onChatClick, false);
  chat.addEventListener('click', onChatClick, false);

  function onChatClick(evt) {
    if (evt.button != 0 || evt.shiftKey || evt.altKey || evt.metaKey) {
      return;
    }
    var ban = evt.ctrlKey;
    var nick;
    var par = evt.target; // par means paragraph
    if (par.nodeName == 'IMG') {
      par = par.parentNode;
    }
    var msgDiv;
    if (par.nodeName == 'P') {
      msgDiv = par.parentNode;
    }
    else {
      msgDiv = par;
      par = null;
    }
    var s = msgDiv.firstChild; // s means span
    if (msgDiv.nodeName == 'DIV' && msgDiv.getAttribute('class') == 'text' && s && s.nodeName == 'SPAN' && strStartsWith(s.className, 'username messagelabel')) {
      var nick;
      var banned = msgDiv.hasAttribute(bannedNickAttr);
      var isDeletedMessage = msgDiv.hasAttribute(silencedNickAttr) || banned;
      var isDoubleClick = evt.type == 'dblclick' && evt.detail == 2;
      var togglingExpanded = isDeletedMessage && evt.type == 'click' && !ban;
      var modding = !isDeletedMessage && isDoubleClick || isDeletedMessage && isDoubleClick && ban && !banned;
      if (togglingExpanded || modding) {
        if (!isDeletedMessage) {
          nick = s.getAttribute('data-nick');
        }
        else {
          nick = msgDiv.getAttribute(silencedNickAttr);
          if (!nick) {
            nick = msgDiv.getAttribute(bannedNickAttr);
          }
        }

        if (nick) {
          if (modding) {
            window.getSelection().removeAllRanges();
            evt.stopImmediatePropagation();
            evt.stopPropagation();
            evt.preventDefault();
            if (messagesCount >= messagesCountMax && chat.scrollTop <= 0) {
              alert('The chat box is scrolled to the top and there is also the maximum mumber of messages in it, which is ' + messagesCountMax + '. First, either scroll it a little bit down, or delete some of the messages by clicking on that floating button with the number of messages.');
              return;
            }
            if (is_at_bottom() && chat.scrollHeight > chat.clientHeight) {
              alert('The chat list is scrolled to the bottom. First, scroll it up by pressing SPACE.');
              return;
            }
          }

          if (togglingExpanded) {
            if (msgDiv.htmlBeforeDeleting) {
              undeleteMessage(msgDiv);
            }
            else {
              deleteMessage(msgDiv);
            }
          }
          else {
            if (!simulationMode) {
              if (ban) {
                message_outbound.send_kickban_user(nick);
              }
              var url = '/' + (ban ? 'roomban' : 'roomsilence') + '/' + nick + '/' + broadcaster + '/';
              $.post(url, {
                  'foo': 'bar'
              }, function(data, textStatus, jqXHR) {
                //alert('data: ' + data + ', textStatus: ' + textStatus);
                if (data == 'OK' && textStatus == 'success') {
                }
                else {
                  if (ban) {
                    alert('A ban request has failed.');
                  }
                  else {
                    alert('A silence request has failed.');
                  }
                }
              });
            }
            else {
              window.setTimeout(function() {
                //msgDiv.innerHTML = '<p>It was ' + nick + '</p>';
                if (ban) {
                  on_user_banned(nick);
                }
                else {
                  on_user_silenced(nick, 'nobody');
                }
              }, 700);
            }
            msgDiv.style.outlineColor = ban ? 'rgb(40,40,40)' : 'rgb(150,150,150)';
            msgDiv.style.outlineWidth = '2px';
            msgDiv.style.outlineStyle = ban ? 'dashed' : 'solid';
          }
        }
      }
    }
  }

  function toggleExpand(noStateChange) {
    var expand = !deletedMessagesShouldBeExpanded;
    if (!noStateChange) {
      toggleExpandButton.value = expand ? collapseChar : expandChar;
      deletedMessagesShouldBeExpanded = expand;
      setDeletedMessagesShouldBeExpandedCookie();
    }
    var at_bottom = is_at_bottom();
    domele.find('> div').each(function(index, value) {
      var msgDiv = value;
      if (!msgDiv.getAttribute) {
        alert(msgDiv);
      }
      if (msgDiv.getAttribute(silencedNickAttr) || msgDiv.getAttribute(bannedNickAttr)) {
        if (expand) {
          if (msgDiv.htmlBeforeDeleting) {
            undeleteMessage(msgDiv);
          }
        }
        else {
          if (!msgDiv.htmlBeforeDeleting) {
            deleteMessage(msgDiv);
          }
        }
      }
      msgDiv = msgDiv.nextSibling;
    });
    if (at_bottom) {
      chat.scrollTop = chat.scrollHeight;
    }
  }

  theElement.addEventListener('keypress', function(evt) {
    var nodeName = evt.target.nodeName;
    if (nodeName != "INPUT" && nodeName != "TEXTAREA" && nodeName != "BUTTON") {
      var character = String.fromCharCode(evt.charCode);
      if (character == ' ') {
        if (is_at_bottom()) {
          chat.scrollTop = chat.scrollHeight -
                      chat.clientHeight - pixelsToScrollOffChatBottom;
        }
        else {
          chat.scrollTop = chat.scrollHeight;
        }

        evt.stopImmediatePropagation();
        evt.stopPropagation();
        evt.preventDefault();
      }
      else
      if (character == '<' || character == '>') {
        var noStateChange = character == '>';
        toggleExpand(noStateChange);
      }
    }
  }, false);

  toggleExpandButton.onclick = function(evt) {
    var noStateChange = evt.shiftKey;
    toggleExpand(noStateChange);
    if (document.activeElement == toggleExpandButton) {
      toggleExpandButton.blur();
      document.body.focus();
    }
  }
}

var output = document.createElement('div');
output.setAttribute('id', 'ChaturbateBetterModding');
output.setAttribute('style', 'padding: 0px 8px 10px 8px');
document.body.appendChild(output);

contentEval(doBetterModdingChanges.toString());

if (document.forms.chat_form) {
  contentEval('doBetterModdingChanges();');
}
else {
  output.innerHTML = 'ChaturbateBetterModding user script is on';
}

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}
