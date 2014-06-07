// ==UserScript==
// @name           LaTeX Matrices for /sci/
// @namespace      71f8f12556abe601d230ac099af2e207
// @description    Converts LaTeX matrices and arrays into a form that works on /sci/.
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
        /\\begin{(?:array|matrix)}[\s\r\n]*(?:{(.*?)})?[\s\r\n]*(?:\[(.*?)\])?([\s\S]*?)\\end{(?:array|matrix)}/g,
        function(x, aligns, spacings, content) {
            var spacings2 = (spacings || "").split(";");
            var hspacings = spacings2[0] ? spacings2[0].split(",") : [];
            var vspacings = spacings2[1] ? spacings2[1].split(",") : [];
            var rows = content.split("\\\\");
            var align = "c";
            var hspacing = "\\qquad";
            var vspacing = 1;
            var outtext = "";
            var vpos = 0;
            for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].split("&");
                var rowtext = "";
                for (var j = 0; j < cells.length; j++) {
                    if (j < hspacings.length) hspacing = hspacings[j];
                    if (aligns && j < aligns.length) align = aligns.charAt(j);
                    if (align == "c") {
                        rowtext += "\\ulap{" + hspacing + "\\atop\\smash{" + cells[j] + "}}\n";
                    } else if (align == "l") {
                        rowtext += "\\rlap{" + cells[j] + "}" + hspacing + "\n";
                    } else if (align == "r") {
                        rowtext += hspacing + "\\llap{" + cells[j] + "}\n";
                    }
                }
                if (i == 0) {
                    outtext += "\\displaystyle{\\vcenter{\\rlap{\\strut\n" + rowtext + "}";
                } else if (i == rows.length - 1) {
                    outtext += "\\lower{" + vpos + "em}{\\strut\n" + rowtext + "}}}";
                } else {
                    outtext += "\\rlap{\\lower{" + vpos + "em}{" + rowtext + "}}";
                }
                if (i < vspacings.length) vspacing = parseFloat(vspacings[i]);
                vpos += vspacing;
            }
            return outtext;
        }
    );
}
document.addEventListener("change", convert, false);
document.addEventListener("submit", convert, false);
