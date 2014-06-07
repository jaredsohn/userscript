// ==UserScript==
// @name           iichan captcha reminder
// @namespace      ('__'X)
// @description    Disallows form submit if captcha field is empty. Should work in both Opera and Firefox.
// @include        http://*.iichan.ru/*
// @include        http://iichan.ru/*
// @encoding       utf-8
// ==/UserScript==

if (location.hostname.match(/iichan\.ru$/))
{
    window.addEventListener(
        'load',
        function()
        {
            document.getElementById('postform').addEventListener(
                'submit',
                function(e)
                {
                    if (document.getElementsByName('captcha').length == 1)
                    {
                        var captcha = document.getElementsByName('captcha')[0];
                        if (!captcha.value)
                        {
                            captcha.style.backgroundColor = '#f60';
                            setTimeout(function() {captcha.style.backgroundColor = '#fff'}, 500);
                            captcha.focus();
                            e.preventDefault();
                        }
                    }
                },
                false
            );
        },
        false
    );
}
