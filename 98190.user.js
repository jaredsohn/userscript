// ==UserScript==
// @name          ReviewLink
// @author        Klaus Byskov Hoffmann
// @namespace     http://not-a-real-namespace.com
// @description   Shows a link to the review page in the top link bar
// @include       http://stackoverflow.com/*
// @include       http://meta.stackoverflow.com/*
// @include       http://superuser.com/*
// @include       http://meta.superuser.com/*
// @include       http://serverfault.com/*
// @include       http://meta.serverfault.com/*
// @include       http://askubuntu.com/*
// @include       http://meta.askubuntu.com/*
// @include       http://answers.onstartups.com/*
// @include       http://meta.answers.onstartups.com/*
// @include       http://nothingtoinstall.com/*
// @include       http://meta.nothingtoinstall.com/*
// @include       http://seasonedadvice.com/*
// @include       http://meta.seasonedadvice.com/*
// @include       http://crossvalidated.com/*
// @include       http://askdifferent.com/*
// @include       http://meta.crossvalidated.com/*
// @include       http://stackapps.com/*
// @include       http://*.stackexchange.com/*
// @exclude       http://chat.stackexchange.com/*
// @exclude       http://api.*.stackexchange.com/*
// @exclude       http://data.stackexchange.com/*
// @exclude       http://area51.stackexchange.com/*
// @exclude       http://*/reputation

// ==/UserScript==

// Here I borrow a couple functions from Nathan Osman
function EmbedFunctionOnPageAndExecute(function_contents)
{
    var exec_script = document.createElement('script');
    exec_script.type = 'text/javascript';
    exec_script.textContent = "(" + function_contents.toString() + ")()";
    document.getElementsByTagName('head')[0].appendChild(exec_script);
}
// ...the other one
function EmbedFunctionOnPage(function_name, function_contents)
{
    var exec_script = document.createElement('script');
    exec_script.type = 'text/javascript';
    exec_script.textContent = function_contents.toString().replace(/function ?/, 'function ' + function_name);
    document.getElementsByTagName('head')[0].appendChild(exec_script);
}

// The code that add the link
EmbedFunctionOnPageAndExecute(function() {    
	$('#hlinks-custom').append($('#hlinks-custom span[class="lsep"]').first().clone())
                       .append('<a href="/review"> review </a>');
});
