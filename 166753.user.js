// ==UserScript==
// @name        Reddit - Highlight comments above threshold
// @namespace   http://userscripts.org/users/115800
// @description Highlights comments with scores above selected threshold
// @icon        http://i.imgur.com/78pKh.png
// @include     http://*.reddit.com/*
// @version     1
// ==/UserScript==

/*jshint globalstrict:true*/

"use strict";

var background, choiceAnchorClick, defaultThreshold, dropDiv, setStyle,
    spacerDiv, style, thresholds;

// Config
thresholds = [10, 20, 30, 40, 50, 100, 200, 300, 400, 500];
defaultThreshold = 500;
background = "#fea";

if (document.body.classList.contains("comments-page")) {
    setStyle = function (threshold) {
        style.textContent =
            '.threshold-' + threshold + ' > .entry {' +
                'background: ' + background + ';' +
            '}';
    };

    // Add style
    style = document.createElement("style");
    setStyle(defaultThreshold);
    document.head.appendChild(style);

    // Add classes to every comment
    Array.prototype.slice.call(
        document.getElementsByClassName("comment")
    ).forEach(
        function (commentDiv) {
            var score, scoreSpan;
            // Get comment's score
            score = 0;
            scoreSpan = commentDiv.querySelector(".score.unvoted");
            if (scoreSpan !== null) {
                score = parseInt(scoreSpan.textContent, 10);
            }
            // Add classes for thresholds below score
            commentDiv.className += " " + thresholds.filter(
                function (threshold) {
                    return score >= threshold;
                }
            ).map(
                function (threshold) {
                    return "threshold-" + threshold;
                }
            ).join(" ");
        }
    );

    // Add menu
    spacerDiv = document.createElement("div");
    spacerDiv.className = "spacer";
    spacerDiv.innerHTML =
        '<span class="dropdown-title lightdrop">' +
            'highlight threshold: ' +
        '</span>' +
        '<div class="dropdown lightdrop" onclick="open_menu(this)">' +
            '<span class="selected">' +
                defaultThreshold +
            '</span>' +
        '</div>';

    dropDiv = document.createElement("div");
    dropDiv.className = "drop-choices lightdrop";
    choiceAnchorClick = function (event) {
        setStyle(event.target.textContent);
        spacerDiv.querySelector(".selected").textContent =
            event.target.textContent;
    };
    thresholds.forEach(function (threshold) {
        var choiceAnchor;
        choiceAnchor = document.createElement("a");
        choiceAnchor.className = "choice";
        choiceAnchor.textContent = threshold;
        choiceAnchor.addEventListener("click", choiceAnchorClick);
        dropDiv.appendChild(choiceAnchor);
    });

    spacerDiv.appendChild(dropDiv);

    document.querySelector(".menuarea").appendChild(spacerDiv);
}
