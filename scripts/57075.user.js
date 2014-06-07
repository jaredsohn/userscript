// ==UserScript==
// @name           MSDN LoBand Search
// @namespace      msdn
// @description    Add search box to MSDN low bandwidth view
// @include        http://msdn.microsoft.com/*
// ==/UserScript==

var headerLinks = document.getElementById('header_links');
if (headerLinks != null)
{
    var imgs = headerLinks.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; ++i)
    {
        if (imgs[i].getAttribute('src').indexOf('LoBand') != -1)
        {
            var scriptNode =
                    'function lobandSearchInputKeyPress(input, e) {' +
                        'var keycode = (e && e.which) ? e.which : event.keyCode;' +
                        'if (keycode == 13) {' +
                            'var searchUrl = "http://social.msdn.microsoft.com/Search/en-US/?query=";' +
                            'location.replace(searchUrl + escape(input.value));' +
                            'return false;' +
                        '}' +
                        'return true;' +
                    '}';
            
            var script = document.createElement('script');
            script.innerHTML = scriptNode;
            try { document.getElementsByTagName('head')[0].appendChild(script); }
            catch(e) { alert(e); }
            
            var inputHtml = '<input type="text" size="55" onKeyPress="return lobandSearchInputKeyPress(this, event);" />';
            headerLinks.innerHTML = inputHtml + headerLinks.innerHTML;

            break;
        }
    }
}
