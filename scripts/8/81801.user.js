// ==UserScript==
// @name           LaTeX Preview for /sci/
// @namespace      71f8f12556abe601d230ac099af2e207
// @include        http://boards.4chan.org/sci/*
// @include        https://boards.4chan.org/sci/*
// @description    Adds a preview button to the posting form.  Hold down this button to see a preview of your post with equations rendered.
// ==/UserScript==

function xeval(xpath, node) {
    return document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function preview_on(e) {
    if (e.target.value == "Preview") {
        var input = xeval('ancestor::form/descendant::textarea', e.target);
        var output = xeval('ancestor::form/descendant::*[@name="com"]', e.target);
        var preview = xeval('ancestor::form/descendant::blockquote[@class="latex_preview"]', e.target);
        var event = document.createEvent("Event");
        event.initEvent("change", true, false);
        input.dispatchEvent(event);
        setTimeout(function() {
            var text = output.value;
            preview.textContent = text;
            var html = preview.innerHTML;
            html = html.replace(/\n/g, "<br>");
            html = html.replace(/\[math\]/g, '<span class="math">');
            html = html.replace(/\[\/math\]/g, "</span>");
            html = html.replace(/\[eqn\]/g, '<div class="math">');
            html = html.replace(/\[\/eqn\]/g, "</div>");
            preview.innerHTML = html;
            input.style.display = "none";
            preview.style.display = "table-cell";
            window.postMessage("latex_update", "*");
        }, 0);
    }
}

function preview_off() {
    var previews = document.getElementsByClassName("latex_preview");
    var inputs = document.getElementsByTagName("textarea");
    for (var i = 0; i < previews.length; i++) previews[i].style.display = "none";
    for (var i = 0; i < inputs.length; i++) inputs[i].style.display = "inline-block";
}

var input0 = document.getElementsByName("com")[0];
var preview0 = document.createElement("blockquote");
preview0.className = "latex_preview";
preview0.style.display = "none";
input0.parentNode.appendChild(preview0);

var pbutton = document.createElement("input");
pbutton.type = "button";
pbutton.value = "Preview";
var email = document.getElementsByName("email")[0];
email.className = "presubmit";
email.parentNode.insertBefore(pbutton, email.nextSibling);
document.addEventListener("mousedown", preview_on, false);
document.addEventListener("mouseup", preview_off, false);

var style = document.createElement("style");
style.textContent = '\
#quickReply input[type="button"] {\
    width: 83px;\
    margin: 0;\
    font-size: 10pt;\
    float: left;\
}\
';
style.type = "text/css";
document.body.appendChild(style);

var script = document.createElement("script");
script.textContent = '\
window.addEventListener("message", function(e) {\
    if (e.data == "latex_update") {\
        jsMath.Autoload.ReCheck();\
        jsMath.Process();\
    }\
}, false);\
';
script.type = "text/javascript";
document.body.appendChild(script);
