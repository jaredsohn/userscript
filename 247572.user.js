// ==UserScript==
// @name       yt2itunes
// @version    3
// @description  Download youtube videos.
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @exclude http://www.youtube.com/embed/*
// @exclude https://www.youtube.com/embed/*
// @match http://www.youtube.com/*
// @match https://www.youtube.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2014+, Enrique Mireles emireles@outlook.com
// @downloadURL     http://userscripts.org/scripts/source/247572.user.js
// @updateURL       http://userscripts.org/scripts/source/247572.meta.js
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAB3RJTUUH2wMOCgIoGUYEAQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAGSUExURfi/JO/v797e3sbGxq2traWlpZSUlJycnNbW1oyEhIRaWow5OZQhIZwYGKUQEKUICK0ICJQxMYxKSoxzc4x7e4RCQpQYGKUAAK0AALUAAL0AAK0QEIxra5QpKa0YGIxSUsYAAKUhIZR7e87Ozr0ICJRSUr29vYxjY6U5OaUpKa0hIb21tZwAALUICO/Ozu/GxqUxMZSEhLUYGO/W1r0YGKVCQpQQEL0pKffe3vfW1pxra5Q5OcZCQvfn585CQr2trZx7e8ZSUs5SUq05Oc5jY9ZjY84AAKWMjM5zc957e60pKdaMjOelpbWcnLWUlLVCQsYYGMYICNbOzpQICMYhIbV7e5xaWt6cnPfv79bGxt6lpe+9vc5KSs6lpb0xMc6EhM69vbUxMbUhIb1aWs61tcZaWuecnMYxMb1KSsZjY96UlNa1td7W1r17e9a9vZwQEN6trb1jY8YQENZra+fOzr1zc85aWufe3t6MjMY5OdZaWt61tdZ7e+/n5+e9vc6MjMZra+/e3ue1tdalpd7GxrUpKalL4aAAAAABdFJOUwBA5thmAAACxklEQVR42uXX/1/SQBgH8NuAoEQ2ijgbBivJLznBAiUUKiyJSgOVAk0tKZKw75mRRt/7v4MBY8ezjW39Vs8v8rqHz/u1jbvbidC/XL8KmcpOqVT6nSjXjooGw8WfFd+QWGfE4oLbtbr++PdMOy0BDYLjEj/0xevfWIyVAI7b/aIj/9WHsRrA8Yf9bqSexVgD4Lic9kWE/LgPwPGfNfJHDO4P8Iuq+S2M9QD8oUp+nxEAcFCtfgIA/14x/9ElAKDQbNQAwN9VAiYEABy0OgsAWAnB/AcBAtVWawkAfJ4CD0BQADZavYcQgI9h3CCQjpD5PcEgwG+SwLRhIL0vz78SjAPEU3hrHODfyX4I6rUJIP0G3oExoNwFXpoB+HwXmDEFpF9IwKA5YK+Tp9fMAdUOsC6YA553gKcmgdTfAhV1oMQqADndQDmJ0AZLAsFnCIV3VYDHJLAjDkZKciAaFz/lCeBJB1glgXBrNLndBWLJ9uZGAI+keTBLANL8SnWAzWRniAC2pG+6lQF0hfjTqCIBrEvjDwiggFSLuIUoLY0vEwAbUcsnc/LlnO02HGvEz+hXEeJ5Yj+4L2vNkxOJDSnlQzliIq2synr3embiUBjmw0FyU83KX04Ob+9aAK/Ppd5deZloz4HFlCHzt3sX0x2a6LcvQb4ab8r7i+DVdqvnCq/D5ZzqdhfAcr5B9wD0PNwPEu0ZnLwK9oPgNfCQJ2fhhhITJ3E8BjeUOXA+QNQlBh5xLjemVCgKjzgzNIJFjWF4yJoKhafgIWt6VHGmjgR0HvMuTipPdWQJ6AImbBRSE8aY/sC4er5xFx5vHyB4YRRpFWUf0AL4c+dHkHZRFo9TDeB9Aa3Llwjr8FlFwB+wO/rHm0VbPae9mPini/O5h/XGxatw2I6fGHAOuhiGZVxO98lTdgutP94yaIvVdqxZdpvFYTT9X9UfqQQlTXlm8wkAAAAASUVORK5CYII=
// ==/UserScript==

var title; // Youtube's Original Video Title
var progessbar;
var original_title;
var host = "ws://localhost:9090/ws";
var socket;
var handshaken = false;
var add_to_playlist = false;

// If the dom has been modified, it inserts the button once and
// grabs the title.
// Handle WebSocket Events

function WebSocketEventHandler() {

    if (socket) {
        socket.onopen = function () {
            sendData();
            handshaken = true;
        };

        socket.onmessage = function (msg) {
            title.text(msg.data);
            setTimeout(function () {
                title.text(original_title);
            }, 1000);
        };

        socket.onclose = function () {
            if (!handshaken) {
                title.text("Server is down.");
            }
            else {
                title.text("Connection closed.");
            }
            handshaken = false;
            socket = undefined;
            setTimeout(function () {
                title.text(original_title);
            }, 1000);
        };

    }

}

// Inserts the button into the DOM.
function DrawButton() {
    
    console.log("insert");
    // Variables
    var url = window.location.href;

    if (url.indexOf("playlist?list=") == -1) {
        // Insert the button
        var button = '<button id="zephyr-btn" class="yt-uix-button-subscribed-branded yt-uix-button"><span id="zephyr-label">Download</span></button>';
        var button2 = '<button id="zephyr-btn2" class="yt-uix-button-subscribed-branded yt-uix-button"><span id="zephyr-label">Download & Add</span></button>';
        $("#watch7-user-header").append(button);
        $("#zephyr-btn").css("margin-left", "10px");
        $("#zephyr-btn").css("margin-right", "10px");
        $("#zephyr-label").css("margin-left", "3px");
        $("#zephyr-btn2").css("display", "inline");
    }
    else {
        // Avoid checking for the button
        $(document).unbind("DOMSubtreeModified");

        // Insert the button
        var button = '<button id="zephyr-btn" class="yt-uix-button  channel-settings-link yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default"><span id="zephyr-label">Download</span></button>';
        $('.playlist-actions').append(button);
        $("#zephyr-btn").css("margin-left", "5px");
        $("#zephyr-label").css("margin-left", "1px");
    }

    // Watch for button clicks
    $("#zephyr-btn").bind("click", function () {
        add_to_playlist = false;
        ButtonClicked();
    });

    // Watch for button clicks
    $("#zephyr-btn2").bind("click", function () {
        add_to_playlist = true;
        ButtonClicked();
    });

}

function HandleDOMChange() {
    button_count = $(document).find("#zephyr-btn").length;

    if (button_count == 0) {
        DrawButton();
        title = $("#eow-title");
        original_title = title.text();
    }
}

function sendData() {
    var url = window.location.href;
    var scripts = $("script");
    scripts.each(

    function () {
        $(this).text("");
    });

    var useful;

    if (url.indexOf("playlist?list=") == -1) {
        useful = $("#watch7-content").html();
    }
    else {
        useful = $("#gh-activityfeed").html();
    }

    useful = useful.replace(/(\r\n|\n|\r)/gm, "");
    useful = useful.replace(/\s+/g, " ");

    if (add_to_playlist) {
        socket.send(url + "-+-+-+-+-+-+-+-+-+-" + useful + "-+-+-+-+-+-+-+-+-+-" + "ok");
    }
    else {
        socket.send(url + "-+-+-+-+-+-+-+-+-+-" + useful);
    }
}

// Handler for button clicks.
function ButtonClicked() {
    // If we havent made a connection with the server, then we try to connect
    // else we sent the url of the page.
    if (!handshaken) {
        // Make a connection with the server
        socket = new WebSocket(host);
        if (socket) {
            WebSocketEventHandler();
        }
    }
    else {
        sendData();
    }
}

// Watch for changes in the DOM.
$(document).bind("DOMSubtreeModified", HandleDOMChange);
