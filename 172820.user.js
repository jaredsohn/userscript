//
//      Embed Image Helper
//      Copyright © 2013    Anton Chugunov
//      
//      This program is free software: you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation, either version 3 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name            Embed Image Helper
// @namespace       http://userscripts.org/scripts/show/172820
// @description     Makes tags for embed image with link to original (full size) image.
// @version         0.04
// @updateURL       http://userscripts.org/scripts/source/172820.user.js
// @downloadURL     http://userscripts.org/scripts/source/172820.user.js
// @include         http://photo.qip.ru/users/*/*/*/*
// @include         https://photo.qip.ru/users/*/*/*/*
// @include         http://fotki.yandex.ru/users/*/album/*/share/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant
// @copyright       2013, Anton Chugunov (http://userscripts.org/users/346172)
// @license         GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var photo_qip_ru = 'photo.qip.ru';
var fotki_yandex_ru = 'fotki.yandex.ru';

/////////////////////////////////////////////////////////////////////////////////////
// photo.qip.ru

function replaceUrls(user, album, photo)
{
    var pattern = 'users\\/' + user + '\\/' + album + '\\/' + photo + '\\/';
    var re = new RegExp(pattern, "igm");

    $('#ff_allGetLinks').find('textarea').each(function() {
        var text = $(this).text();
        text = text.replace(re, 'photo/' + user + '/' + album + '/' + photo + '.jpg');
        $(this).text(text);
    });
}

handler_onPhotopQipRu = function onPhotopQipRu()
{
    var user = '', album = '', photo = '';
    var photoParamsRegex = /\/users\/([^\/]+)\/([^\/]+)\/([^\/]+)/i;
    var match = photoParamsRegex.exec(window.location.pathname);
    if (match != null)
    {
        user = match[1];
        album = match[2];
        photo = match[3];
    }
   
    unsafeWindow.getLink(user, album, photo);
    unsafeWindow.showDiv('ff_get_link');
    $('div.linksbox a.slink[href*="getLink"]').removeAttr('href').click(function(){
        unsafeWindow.showDiv('ff_get_link');
        replaceUrls(user, album, photo);
    });
};


/////////////////////////////////////////////////////////////////////////////////////
// fotki.yandex.ru

function replaceText(viewUrlPattern, previewUrlPattern, removeLinkPattern, embUrls)
{
    replacedText = [];
    for (var i = 0; i < embUrls.length; i++)
    {
        var string = embUrls[i].trim();
        if (!string.length)
            continue;
        if (string.indexOf('[url') != 0 && string.indexOf('<a href') != 0)
            continue;
            
        var baseUrl = null, size = null, ext = null;
        while(match = previewUrlPattern.exec(string))
        {
            baseUrl = match[1];
            size = match[2];
            ext = match[3];
        }
        
        if (size == 'orig')
            string = string.replace(removeLinkPattern, '');
        else
            string = string.replace(viewUrlPattern, baseUrl + '_orig' + ext);
        
        replacedText.push(string);
    }
    
    return replacedText.length ? replacedText : embUrls;
}

function replaceHTMLCodeText(viewUrl, textarea)
{
    var previewUrlPattern = new RegExp('src="(http.+)_(\\w+)(\\.[\\w\\d]+)', 'g');
    var viewUrlPattern = new RegExp(viewUrl + '[^\\"]+', 'ig');
    var removeLinkPattern = new RegExp('(<a[^>]+>|</a>)', 'ig');
    var embUrls = textarea.val().replace('<!--more-->', '<br/>').split('<br/>');
    var text = replaceText(viewUrlPattern, previewUrlPattern, removeLinkPattern, embUrls);
    textarea.val(text.join('<br/>'));
    textarea.select();
}

function replaceBBCodeText(viewUrl, textarea)
{
    var previewUrlPattern = new RegExp('img\\](http.+)_(\\w+)(\\.[\\w\\d]+)', 'g');
    var viewUrlPattern = new RegExp(viewUrl + '[^\\]]+', 'ig');
    var removeLinkPattern = new RegExp('(\\[url[^\\]]+\\]|\\[/url\\])', 'ig');
    var embUrls = textarea.val().split('\n');
    var text = replaceText(viewUrlPattern, previewUrlPattern, removeLinkPattern, embUrls);
    textarea.val(text.join('\n'));
    textarea.select();
}

handler_onFotkiYandexRu = function onFotkiYandexRu()
{
    var shareParamsElem = $('div.share.js-share');
    var shareParams = shareParamsElem.attr('onclick');
    shareParams = shareParams.replace(/^return/, '').replace(/;$/, '');
    var json = jQuery.parseJSON(shareParams);

    var viewUrl = json['url'];
    var idx = viewUrl.indexOf('view');
    if (idx == -1)
        return;    
    viewUrl = viewUrl.substring(0, idx);
    
    $('#codes_bbcode').click(function(){
        replaceBBCodeText(viewUrl, $(this));
    });    
    $('#codes_html').click(function(){
        replaceHTMLCodeText(viewUrl, $(this));
    });
};


/////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function()
{
    var urlHandlers = {};
    urlHandlers[photo_qip_ru] = handler_onPhotopQipRu;
    urlHandlers[fotki_yandex_ru] = handler_onFotkiYandexRu;

    var domain = window.location.hostname.replace('www.', '');
    handler = urlHandlers[domain];
    if(typeof handler === 'function')
        handler();
}); 
