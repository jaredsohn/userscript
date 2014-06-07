// ==UserScript==
// @name       PivotalTracker link copier
// @namespace  http://www.eastagile.com
// @version    1.2
// @description  Adds a button for quick copying from PT
// @match      https://www.pivotaltracker.com/projects/*
// @copyright  2012+, Thien Lam
// ==/UserScript==

// access global variable 'app'
function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

var promptBox;

// setup styles
var style = document.createElement('style');
style.innerHTML = ".prompt-box { position: absolute; border: 5px gray solid; border-radius: 5px; width: 500px; height: 300px; z-index: 99; background: white; text-align: center;"
                + "font-size: 12px; font-weight: bold; }"
                + ".copy-textarea { margin-top: 10px; width: 480px; height: 250px; }"
                + ".copy-button {float: left; width: 100px; height: 20px; border: 1px solid #FDA35D; border-radius: 5px; background: #FDA35D; margin-right: 10px; text-align: center; padding-top: 5px;"
                + "font-size: 12px; font-weight: bold; color: white; cursor: pointer; }"
                + ".copy-button:hover { border-color: white; border-width: 3px; }";
document.body.appendChild(style);

// add the button
var copyButton = document.createElement("div");
copyButton.className = "copy-button";
copyButton.textContent = "COPY";
var rightBox = document.querySelector(".right.clearfix");
rightBox.insertBefore(copyButton, rightBox.children[0]);

// when clicking the button
copyButton.onclick = function() {
    exec(function() {
            var stories = app.project.getSelectedModels();
            var completeString = stories.length == 0 ? "No story selected" : "";
            stories.map(function(story) {
                var storyString = story._name + " (https://www.pivotaltracker.com/story/show/" + story.id() + ")";
                completeString += storyString + "\r\n";
            });
            console.log(completeString);
            promptBox = document.createElement("div");
            promptBox.textContent = "Ctrl-C to copy and Enter to close this prompt";
            promptBox.className = "prompt-box";
            promptBox.style.top = ((document.body.clientHeight - 300) / 2) + "px";
            promptBox.style.left = ((document.body.clientWidth - 500) / 2) + "px";
            document.body.appendChild(promptBox);
            textBox = document.createElement("textarea");
            textBox.className = "copy-textarea";
            textBox.value = completeString;
            promptBox.appendChild(document.createElement("br"));
            promptBox.appendChild(textBox);
            textBox.onkeyup = function(event) {
                if(event.keyCode == 13) {
                    document.body.removeChild(promptBox);
                }
            }
            textBox.select();
            textBox.focus();
        });
}