// ==UserScript==

// @name          Charter Redirect Redirector

// @namespace     http://freecog.net/2007/

// @include       http://*.charter.net/search*

// @description   Replaces Charter's irritating "search" page with something useful.

// ==/UserScript==



function sub_template(template, vars, filters) {
    return template.replace(/{{\s*([^}]+?)\s*}}/g, function(match, expr) {
        var chunks = expr.split(/\|/g);
        if (chunks[0] in vars) {
            var value = vars[chunks[0]];
            for (var i = 1; i < chunks.length; i++) {
                value = filters[chunks[i]](value);
            }
            return value;
        } else {
            return match;
        }
    });
}

var search = document.forms[0].elements.namedItem("qf").value;
var url = 'http://' + search;

var template_vars = {
    'url': url,
    'search': search,
};


var page_template = [
'<html><head><title>Charter Redirect: {{ search|escape }}</title></head>',
'<body>',
'<p>Stupid Charter seems to have redirected you.  Here are some useful tools:</p>',
'<p><input type="button" value="Retry" onclick="void(document.location.href = {{ url|string|escape }});" accesskey="r"></p>',
'<form action="http://www.google.com/search">',
'<p style="text-align: center"><input type="text" name="q", size="200" style="width: 90%" value="{{ search|escape }}"><br>',
    '<input type="submit" name="btnG" value="Google Search" accesskey="s">',
    '<input type="submit" name="btnI" value="I\'m Feeling Lucky" accesskey="l">',
'</p>',
'<hr>',
'<p><small><strong>Shortcuts:</strong> [Alt]+[r]: Retry, [Alt]+[s]: Google Search, [Alt]+[l]: I\'m Feeling Lucky</small></p>'
].join('\n');

var template_filters = {
    'escape': function(s) { return s.replace(/&|>|<|"/g, function(m) {
        return '&#' + m.charCodeAt(0) + ';' }); },
    'string': function(s) { return uneval('' + s); }
};

document.body.parentNode.innerHTML = sub_template(page_template, template_vars, template_filters);
