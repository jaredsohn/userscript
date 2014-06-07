// ==UserScript==
// @name        Chat.SE Typing Indicator
// @namespace   http://userscripts.org/users/520685
// @description Let you know when other users are typing
// @include     http://chat.stackexchange.com/rooms/*
// @version     0.4
// ==/UserScript==

(function () {
    "use strict";

    var debounce = function(func, wait, options) {
      var args, inited, result, thisArg, timeoutId, trailing = true;

      function delayed() {
        inited = timeoutId = null;
        if (trailing) {
          result = func.apply(thisArg, args);
        }
      }
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (options && objectTypes[typeof options]) {
        leading = options.leading;
        trailing = 'trailing' in options ? options.trailing : trailing;
      }
      return function() {
        args = arguments;
        thisArg = this;
        clearTimeout(timeoutId);

        if (!inited && leading) {
          inited = true;
          result = func.apply(thisArg, args);
        } else {
          timeoutId = setTimeout(delayed, wait);
        }
        return result;
      };
    };

    var SERVER_ADDR = 'http://chatse.problematic.io',
        ioscript = document.createElement('script');
    ioscript.src = SERVER_ADDR + '/socket.io/socket.io.js';

    ioscript.addEventListener('load', function () {
        var $input = document.getElementById('input'),
            socket = io.connect(SERVER_ADDR),
            room = window.location.pathname,
            userId = CHAT.user.current().id,
            timeoutId;

        socket.on('connect', function () {
            socket.emit('join', room);
        });

        socket.on('typing', function (userId) {
            document.getElementById('present-user-' + userId).style.border = '2px solid lightgreen';
        });

        socket.on('idletyping', function (userId) {
            document.getElementById('present-user-' + userId).style.border = '2px solid goldenrod';
        });

        socket.on('stoptyping', function (userId) {
            document.getElementById('present-user-' + userId).style.border = '';
        });

        $input.addEventListener('keyup', debounce(function () {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
                timeoutId = null;
            } else {
                socket.emit('typing', room, userId);
            }

            if (!$input.value) {
                socket.emit('stoptyping', room, userId);
            } else {
                timeoutId = window.setTimeout(function () {
                    if (!$input.value) {
                        socket.emit('stoptyping', room, userId);
                    } else {
                        socket.emit('idletyping', room, userId);
                    }

                    timeoutId = null;
                }, 5000);
            }
        }, 250));
    });

    document.body.appendChild(ioscript);
}());
