// ==UserScript==
// @name           $ and \[ to [math] and [eqn] tags
// @namespace      71f8f12556abe601d230ac099af2e207
// @include        http://boards.4chan.org/sci/*
// @include        https://boards.4chan.org/sci/*
// ==/UserScript==

function xeval(xpath, node) {
    return document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var input0 = document.getElementsByName("com")[0];
if (input0.tagName == "TEXTAREA") {
    input0.name = "";
    var output0 = document.createElement("input");
    output0.name = "com";
    output0.type = "hidden";
    input0.parentNode.insertBefore(output0, input0);
    function update(e) {
        var input = xeval('ancestor-or-self::form/descendant::textarea', e.target);
        var output = xeval('ancestor-or-self::form/descendant::*[@name="com"]', e.target);
        if (output) output.value = input.value;
    }
    document.addEventListener("change", update, false);
    document.addEventListener("submit", update, false);
}

function convert(e) {
    var output = xeval('ancestor-or-self::form/descendant::*[@name="com"]', e.target);
    if (output) output.value = output.value.replace(
        /\$((?:[^\$\\]|\\.)*)\$/g,
        function(x, content) {
            return "[math]" + content + "[/math]";
        }
    ).replace(
        /\\\[((?:[^\\]|\\[^\]])*)\\\][ \t]*\n?/g,
        function(x, content) {
            return "[eqn]" + content + "[/eqn]";
        }
    );
}
document.addEventListener("change", convert, false);
document.addEventListener("submit", convert, false);
