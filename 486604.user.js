// ==UserScript==
// @name         JVRadio
// @namespace    JeanIceTea/Naptu
// @description  Intégrez le player de la 15-18 radio sur les forums !
// @include      *
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

// Merci à Naptu pour sa grande aide et dédicace à lui :cute:
// Vous pouvez vous débarassay de la version ForumsJV puisqu'elle est comprise dans cette version
// Plus de problème de compatibilité avec AdBlock ! :ok:
$(function()
{
    var object = $('<object>', {
        width: '280',
        height: '250',
        html: [
            '<param name="allowscriptaccess" value="always" />',
            '<param name="movie" value="http://static.radionomy.com/cdn/flash/BannerEmbed.swf?RadUID=a8874b07-1474-4892-8322-e6831828516c&amp;titlesColor=ffffff&amp;color=7d7d7d&amp;autoPlay=no&amp;lang=fr" />',
            '<param name="wmode" value="transparent" />',
            $('<embed', {
                src: 'http://static.radionomy.com/cdn/flash/BannerEmbed.swf?RadUID=a8874b07-1474-4892-8322-e6831828516c&amp;titlesColor=ffffff&amp;color=7d7d7d&amp;autoPlay=no&amp;lang=fr',
                wmode: 'transparent',
                type: 'application/x-shockwave-flash',
                allowscriptaccess: 'always',
                width: '240',
                height: '300'
            })
        ]      
    })
    
    if(/^www\.jeuxvideo\.com$/.test(location.hostname) || /^.{3,15}\.forumjv.com$/.test(location.hostname))
    {
        $('#col2').append(object);
    }
});