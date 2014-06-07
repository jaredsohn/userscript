// ==UserScript==
// @name        Pandora Freemium
// @namespace   http://userscripts.org/users/469064
// @description Download button. Hide advertisements panel. Block audio advertisements. Search buttons. Enable copying lyrics & track info. Extend play automatically. Show current track info on window title.
// @author      ifugu
// @version     3.6.5
// @downloadURL https://userscripts.org/scripts/source/134176.user.js
// @updateURL   https://userscripts.org/scripts/source/134176.meta.js
// @credits     Site searches based off http://userscripts.org/scripts/show/20252
// @credits     HTML5 download attribute code by http://userscripts.org/users/505436
// @credits     Artwork download code by http://userscripts.org/users/505436
// @credits     Download filename bugfix by http://userscripts.org/users/495672
// @credits     Search engine updates and settings contributions from Timothy Zorn http://userscripts.org/topics/126206
// @credits     Audio ad blocking inspired by Swyter http://userscripts.org/users/511278 from http://userscripts.org/scripts/show/163408
// @include     http://*pandora.com/*
// @include     https://*pandora.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @history     3.6.5 Disabled audio ad blocking in all browsers. I think it was the source of interuptions in audio playback.
// @history     3.6.4 Disabled audio ad blocking in webkit (Chrome). It prevented audio ads, but then halted all audio.
// @history     3.6.3 Fixed search links.
// @history     3.6.2 Added ability to customize filename format for downloaded tracks. Requested by several users.
// @history     3.6.1 Changed file extension to CSV for track digest
// @history     3.6.0 Added ability to generate digest of tracks played (enable shortcut keys and press L). Suggestion from e56ythh http://userscripts.org/users/539326
// @history     3.5.2 Prevented shortcut keys from interfering with inputs. Added shortcut key for next station. Added download button glow to indicate download shortcut working.
// @history     3.5.1 Fixed problem with forward slash character not being encoded properly which causes downloads to fail. Converting to hyphen.
// @history     3.5.0 Added keyboard shortcuts. Suggestion from e56ythh http://userscripts.org/users/539326
// @history     3.4.6 Retrieving lyrics from a secondary service when they are missing. Suggestion from JamesTGriffing http://userscripts.org/users/533823
// @history     3.4.5 Fixed problem with some characters not being encoded properly which caused downloads to fail
// @history     3.4.4 Added setting to disable analytics
// @history     3.4.3 Added analytics since install counts are broken on userscripts.org
// @history     3.4.2 Added option to download using window.open() for users having trouble with the download attribute, especially Firefox users waiting for blob (used to get around FF's same-origin restriction on download attribute).
// @history     3.4.1 Added support for downloading tracks automatically only when liked already. Requested by Fing3rZ http://userscripts.org/topics/134826
// @history     3.4.0 Added option to automatically skip video ads in free Pandora (once skip option is shown).
// @history     3.3.1 Added small delay before automatically downloading tracks to reduce load on browser at start of play and to allow artwork to load.
// @history     3.3.0 Added support for downloading tracks automatically when they start playing. Requested by Fing3rZ http://userscripts.org/topics/134826
// @history     3.2.0 Added support for blocking audio advertisements. Original code from Swyter http://userscripts.org/scripts/show/163408
// @history     3.1.1 Removed album art overlays that prevented saving artwork by right-clicking images. Requested by mcrandello http://userscripts.org/topics/125389
// @history     3.1.0 Added TPB search engine and updated a few others. Added ability to customize search engine URLs through settings dialog. Thanks to Timothy Zorn.
// @history     3.0.3 Added right-click support to download button. Also adds support for download managers like DownThemAll! (when initiated by right-clicking button).
// @history     3.0.2 Fixed ad hiding in Firefox
// @history     3.0.1 Added GM_addStyle() polyfill to fix script in Firefox
// @history     3.0.0 Removed Freemium drop-down menu and replaced it with a settings dialog. Enabled settings for all features.
// @history     2.9.0 Added history to metadata. Added timestamps to auto-continue logging to help debug future issues. Changed version format to standard convention.
// @history     2.8.2 Fixed download button (Pandora made layout changes).
// @history     2.8.1 Add artwork filename as query string when downloading artwork on older browsers. You'll still need to copy and paste, but this should make it less painful.
// @history     2.8.0 Using HTML5 download attribute of anchor tags to automatically download track with correct filename. Added an option to download album artwork.
// @history     2.7.0 Minor code refactoring to make maintaining the search sites easier.
// @history     2.6.0 Fixed bug that generated garbled filenames when saving.
// ==/UserScript==


/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function($) {

    $.fn.reveal = function(options) {

        var defaults = {
            animation: 'fadeAndPop', //fade, fadeAndPop, none
            animationspeed: 300, //how fast animtions are
            closeonbackgroundclick: true, //if you click background will modal close?
            dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
        };

        var options = $.extend({}, defaults, options);

        return this.each(function() {

            var modal = $(this),
                topMeasure  = parseInt(modal.css('top')),
                topOffset = modal.height() + topMeasure,
                locked = false,
                modalBG = $('.reveal-modal-bg');

            if(modalBG.length == 0) {
                modalBG = $('<div class="reveal-modal-bg" />').insertAfter(modal);
            }

            modal.bind('reveal:open', function () {
                modalBG.unbind('click.modalEvent');
                $('.' + options.dismissmodalclass).unbind('click.modalEvent');
                if(!locked) {
                    lockModal();
                    if(options.animation == "fadeAndPop") {
                        modal.css({'top': $(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible'});
                        modalBG.fadeIn(options.animationspeed/2);
                        modal.delay(options.animationspeed/2).animate({
                            "top": $(document).scrollTop()+topMeasure + 'px',
                            "opacity" : 1
                        }, options.animationspeed,unlockModal());
                    }
                    if(options.animation == "fade") {
                        modal.css({'opacity' : 0, 'visibility' : 'visible', 'top': $(document).scrollTop()+topMeasure});
                        modalBG.fadeIn(options.animationspeed/2);
                        modal.delay(options.animationspeed/2).animate({
                            "opacity" : 1
                        }, options.animationspeed,unlockModal());
                    }
                    if(options.animation == "none") {
                        modal.css({'visibility' : 'visible', 'top':$(document).scrollTop()+topMeasure});
                        modalBG.css({"display":"block"});
                        unlockModal()
                    }
                }
                modal.unbind('reveal:open');
            });

            modal.bind('reveal:close', function () {
                if(!locked) {
                    lockModal();
                    if(options.animation == "fadeAndPop") {
                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                        modal.animate({
                            "top":  $(document).scrollTop()-topOffset + 'px',
                            "opacity" : 0
                        }, options.animationspeed/2, function() {
                            modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
                            unlockModal();
                        });
                    }
                    if(options.animation == "fade") {
                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                        modal.animate({
                            "opacity" : 0
                        }, options.animationspeed, function() {
                            modal.css({'opacity' : 1, 'visibility' : 'hidden', 'top' : topMeasure});
                            unlockModal();
                        });
                    }
                    if(options.animation == "none") {
                        modal.css({'visibility' : 'hidden', 'top' : topMeasure});
                        modalBG.css({'display' : 'none'});
                    }
                }
                modal.unbind('reveal:close');
            });

            modal.trigger('reveal:open')

            var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
                modal.trigger('reveal:close')
            });

            if(options.closeonbackgroundclick) {
                modalBG.css({"cursor":"pointer"})
                modalBG.bind('click.modalEvent', function () {
                    modal.trigger('reveal:close')
                });
            }
            $('body').keyup(function(e) {
                if(e.which===27){ modal.trigger('reveal:close'); }
            });

            function unlockModal() {
                locked = false;
            }
            function lockModal() {
                locked = true;
            }

        });
    }
})(jQuery);


// polyfill for GM_addStyle
if (typeof GM_addStyle === 'undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css}
        catch(x) {style.innerText = css}
        head.appendChild(style);
    };

var tracksPlayedDigest = [],
    searches = [];

searches.push({
    alt: '4shared',
    template: 'http://search.4shared.com/q/CKADAw/1/%artist%+%song%+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABtElEQVR4nKWTv2tTURTHP99LKVKc8oLEWeif4OImjq4OOjg4uDj0ZVZBBEfRSZCCCQWlg6h1tKKI7axDyeAi1KXaNmli8pq83HuPQ14k8VeEHjhwONxzvj8uR2bGUcIdaRqYm/WgvPTotJxbk1kFiwwaGyc7r+t7ZuZnMiintfNy7p1izLGILJJvN0rA/EwJ5bR+VdKagv/Ufb96QRZRDNigtzDJ/I8Lymn9jsRDfL7Rfnn/4uGH9R3FABbhF9OnPJA0nyzVliUuMzh82lq9fT20djKgg0WI/u8LJB1P0tpzwTnrtR/sL6d3gT7QATKihxCA6QUOIKmuVJK0tik4G9u7N4vhDDgAMjOLhABx+DuDpLqyKGxd2Inwbfta68mtV0C3QM7NLAKj4eBHPkzKTtL6vrASftiw/vctyXnnXI6IioEJ5CsKntg7eCGpg5n/+uxeVeW0ZjJj/M8/3R5rLpAVPIRRbWGIgqfz8e0pAQtACThWsIpFTkXl0o3PBE/zzeMz+e6XPSAH+nNF0WTWXYyRJT82F4jOzLyZZWbW/WcWtJEi0C/6mf73nCWNpQI0zSwD+AGkvCdYQgyatwAAAABJRU5ErkJggg%3D%3D'
});
searches.push({
    alt: 'allmusic',
    artistTemplate: 'http://allmusic.com/search/artist/%artist%',
    albumTemplate: 'http://allmusic.com/search/album/%album%',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAr52Nba+djdWvnY3wr52N8K+djfCvnY3wr52N8K+djfCvnY3wr52N8K+djfCvnY3wr52N26+djYWvnY0Fr52NXK+djf+vnY3/r52N/6+djf+vnY3/r52N/6+djf+vnY3/r52N/6+djf+vnY3/r52N/6+djf+vnY3/r52NjK+djc2vnY3/rZuK/6qWhf+rmIf/rpyL/6uYh/+tm4v/r52N/6yZif+rmIf/r52N/66cjP+ql4b/rZqK/6+djeKvnY3xrZuK/7iomf/Z0cr/0si//7Oik//Mwbf/vK2f/6uZiP/CtKj/zsO6/66ci/+yoZH/0ce+/8Gzp/+tmorxrpuL8Laml//y7+3/6+fj/97X0f/z8O7/9vXz/7ammP/Ctaj//f38/+Td1/+tm4r/5N7Y///////Guq7/q5iI8KyZifDDtqr//f38/7Khkf+jj33/2dHJ/+3o5P+ploX/1czE//Hu6/+vno7/tKOT//7+/v/Qxrz/q5iH/6+djfCtm4vwtaSV//Pw7v/o49//uqqd/9rSyv/r5uL/qpeF/9XMxP/s6OT/rJqK/7SjlP/7+vn/xbit/6uZiP+vnY3wr52N8K2aiv+3p5j/29PL/+bg2//v7On/6ubh/6qXhv/VzMT/7enl/62bi/+0o5T/+/r5/8e6r/+rmYj/r52N8K+djfCunIz/vq+i/7SjlP+yoJH/6OLe/+rl4P+plYP/1szE/+3p5f+tm4v/tKOU//v6+f/Huq//q5mI/6+djfCvnY3wrZqK/93Wz//39fP/8u/s//Xz8v/CtKj/qJSC/9bNxf/t6eX/rZuL/7SjlP/7+vn/x7qv/6uZiP+vnY3wr52N8K+cjP+xoJD/wLGk/8O2qv+2ppf/rJmJ/6qXhv/WzcX/7enl/62bi/+0o5T/+/r5/8e6r/+rmYj/r52N8K+djfGvnY3/rpyM/6yaif+smYn/rZuL/6+djf+ql4b/2dDJ//Hu6/+tm4v/tKOU///////JvLH/q5mI/6+djfCvnY3vr52N/6+djf+vnY3/r52N/6+djf+vnY3/rZqK/8O1qf/Ow7n/rpyM/7Kgkf/VzMP/u6ye/62bi/+vnY3xr52Nv6+djf+vnY3/r52N/6+djf+vnY3/r52N/6+djf+smon/q5iH/6+djf+vnY3/qpaF/62bi/+vnY3/r52N3a+djUqvnY39r52N/6+djf+vnY3/r52N/6+djf+vnY3/r52N/6+djf+vnY3/r52N/6+djf+vnY3/r52N/6+djXQAAAAAr52NRK+djbqvnY3wr52N8K+djfCvnY3wr52N8K+djfCvnY3wr52N8K+djfCvnY3wr52Nxa+djWEAAAAAwAH//4AA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//+AAf//wAP//w%3D%3D'
});
searches.push({
    alt: 'Amazon',
    template: 'http://www.amazon.com/s/?search-alias=popular&field-keywords=%artist%+%song%+%album%',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAA1NTcA////ADyn8QCampsANkNOADqLwwDZ2doAO5LOADhgfQA5daAAO5naAE5OUAA8oOUANTxDAEJCRADm5uYAOoO3AMrKygBoaGkAW1tdADdSZgA3WXEAgYGCAKenqADy8vMAdHR2ADZKWgA5bpQAhcHqAI2NjwCzs7QAOGeIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAUJCAQAAAAAAAAAAAAAFgICAgICCgkEAAAAAB8NAAAFCgICAgICAgUUAAAJBwAAAAAAGhUJBwICAhAEGgIIAAAAAAAAAAAECAUCDAQKBwAAAAAAAAAAAAAABBsNBQINAAsDAxYAHQ4VBQUbEAwCFAAPAQEBDwEGAAgQDAICBwQSAQEDFwEBBgAAAAAAAAAAEwEBGQABAQMAAAAAAAAAAAAGARgXAQEDAAAAAAAAAAAADgMRGAEBAwAAAAAAAAAAABERCwABAQMAAAAAAAAAAAARAQ8GAQEZAAAAAAAAAAAAEwYBAQEeAAAAAAAAAAAAAwAACxIOAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D'
});
searches.push({
    alt: 'Bit-Torrent.bz',
    template: 'http://www.bit-torrent.bz/browse.php?c36=1&search=%artist%+%song%+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH2AgNAgArX5uK0AAAABd0RVh0U29mdHdhcmUAR0xEUE5HIHZlciAzLjRxhaThAAAACHRwTkdHTEQzAAAAAEqAKR8AAAAEZ0FNQQAAsY8L/GEFAAACfElEQVR4nJVTT0jaURxPHME6mJ6UpSSyJEuwUEvzT2K5MtwUTYUt9yvJiCJR2xpCrBoYCzsE67BDh50lBEHx5OjY1cMOHZyHeesw2K3D/Oz73khjENsefHj/vu/zPu/z/b6ent/t4cTExIeRkZHXarVaR3NRz/80kUj0zGQyoV6vo1AotIeGhr7odLr3MpnMQtsP/krQ19f3djWx2ga109NT5PN5tNttJBIJzM/PfzMYDB+VSqWXKb2PQzwwMGCcnp5+p1Ao6pVK5Wej0cDY2BiazSZarRYmJyexu7v7fWZmpjA+Pv6CFMvufRHd9piIMhR4cXl5ebO3t4d0KsUE4uzsDKFQCLOe2R+CINj4CXrrc71eL4yOjgpkpECSBTYnHwSVSvVGLpdfpFKpm3K5DK/Xi3g8jrm5ORCBlRMEAgG+yLCysoLl5WXe387vjtleKp2G76nvumOwx+PBwsICotFoB5FIBOFwGIuLYQSDQfj9fvh8Pq7A5XKBvGh2Hm2327mk8/NzVKtVXF1doVgsolQqIZfLoVar4eTkBEwpI3E6nYyoS2A2mznr+vo6l7m2tsZVbG5u8p7JZirYYc8TDywWC9xud5eAjOOLsZcxvNrextbWFpLJJMfGxgbid3xhBCy9FN8loPIFOY/EagLHx8c4OjrCwcEBL6jD3CGf7+/vI5vNkhcBsAuJpEtAeQelDEtLMezs7CCTySBIuXY4HLDZbJiamoLVauUqWUENDw+D0twloKJpazQa0IfiAX+CrbO/YjQaQcUFFqvVar92Kq+3t/ezRCJBf38/qKhwO76FVCrtjNkeg1gs/tRRMDg4qCbYCPZ/hJXwiJ39BU+5Xm9kka0mAAAAAElFTkSuQmCC'
});
searches.push({
    alt: 'BitTorrentMonster',
    template: 'http://www.btmon.com/torrent/?f=%artist%+%song%+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgElEQVR4nG2TIYgbaRTHfzv9xEcJZSjH8YmKEStGrBjRg+9gRURExIqIiogNjCgl0FIiTkTcwXCsiDgRygYiToSrGVGxogeREcduuC5cRMWIFSMWOmLFJyI+Mcs7kW2SO/rEgwfv/fjz3v8diAj7MbnqCQqiKMZ8F+K9pyhLvHOg4PUP7w/2+w/2AZNPPbHP7UOlt9njAU11V1HeFLz+cQfZAv788osYYwBN53BIUznMzQYQA0k9fQDBcrncQgKAyT89MSbaDTdgcQOjDwOSn7tEQKb6W2VJkjD51BOAYHLVE5vYrVxz55hlKd0jGM7muLMce5aQ9i2kU8bPM7QOoYZ7uZcAtVvI8GRMvAayOeFRl/HHgjQfMr4o0Xee4raiXVeAx1rLdJkSxIcxoFmkM+bzghzQviDLc0KA24L82tHsdljVIXY+3i1ZQRCGIQBFqOkmEavTCN+O8JnFPbRmaZPcFfBXyejZYCe5hsB7jwb64w6J0Qw/lmASIKTIOqA80/WKxaqElsHsm0BBUJblw3E05WHCygHVCu9KXKNkaS0X+ZLotmAUO9oa9BrAbxS4tdsUQPdlSuckYnaU4AZTksGSsOHRKmZ4HDNaeIbHTZpmSP77BRsf1ODWDl2HNJM2Ixtjqwp3vaJvNX4wI4sjuKlYmDb+zkFDEx0Z+nYGIsL55alc/30tKlCiAiXnT5WcPVXyU6Dk5LGSOqilfteSxveH0nis5PzyVM4vT0VENoCvkMYTJfW7lqhXLTkOlPwWKKnfNqT1x0upfz3ewPeGReR/z3S1sadpppR1m+aLkPyzo2OgetOmMpuTf/OZvsa93Mt0mfKt6NsZjw4e/eed/wWAtTQMX7dAZAAAAABJRU5ErkJggg%3D%3D'
});
searches.push({
    alt: 'Demonoid',
    template: 'http://www.demonoid.ph/files/?category=2&query=%artist%+%song%+%album%',
    imgsrc: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBmRXhpZgAASUkqAAgAAAAEABoBBQABAAAAPgAAABsBBQABAAAARgAAACgBAwABAAAAAgAAADEBAgAQAAAATgAAAAAAAABgAAAAAQAAAGAAAAABAAAAUGFpbnQuTkVUIHYzLjM2AP/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABAAEAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP1X/Ze/av8A+Cg/jrw14gPhH9r74b694Q1X46/tNeDtU8c/Fn4FeEPiWngDTPhX8fvir4V8OX/wi+IXgb4ufBfQ/F3w+8ceGPCWiWvhy+1zQvjLf6NBr+kzWM1l4ai0WJvN/wBsb9tr9vX4bfAT4maxrX7ZfgK4+H/hz4YeOPG9r43+DP7O0nwd+O3irxHYWDp4c+FuseLtU+Mnxi8OeBNK8Qautldatr/g34Y+FPifpOkanc6P4I8TeEvEGljxBbfL/wAJPjR+yB+xv8U/it+yv+1NceMPHLeBfi/8Qv2fIPjtrHhjVPFXwZ8TfCrw9e+FfGGhQ6Pa+GtFs/BHw/8AHPgK0hPwi+IfgHwF4YS+8K/ElfibFc6pD4WvrG2usn9qX9uT9jT9pdbLTvAGieDfgjNrtn4j1T4iftMeMfD3hz4c/DX4Z/Cv4KoyeJrrS5tU0BrP9oPx74u8BXHj3UPAf7Mfg3QfF7/FPxFq1hH4m8NSaRoeqalpX8xLh7xVxOcVKtPx14ceFxWayngeC8LhuHcxxNGhGrLESwKzfEwWcU6kcNCpD29BOvGMG1GzkjaX1blahJudrJtvR6LRdO9ujsf/2Q%3D%3D'
});
searches.push({
    alt: 'Discogs',
    artistTemplate: 'http://www.discogs.com/artist/%artist%',
    template: 'http://www.discogs.com/advanced_search?artist=%artist%&release_title=%album%&track=%song%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAABTUlEQVR42o1SLWwCMRT+YIiee5WVzB2OEyQgV4kDiZydnJxEImcnkeA2s9CJJSBxdw7MkhqSVpyoWNKJkrtyIFbTvr7ve+97Py3vPS7Py/NT9Z4vXhveVkwYjXoAikIHUwguRBfAZrO5QZBSKqWIKECJWJKIYT9tpGqHq9e7V0o1sg/76Xg6AaC2SkpZE6SURXFsoJNEANB6vdsXSSK0PgZOy3vPObfWVlAimk0ZgOXKZVkGQOtzuDw/3P2Wp8+v7xi9/bCDrBxk5ePMzRcGcAC0NmXpytNPu6EkxI5NrY3WpvrpxG7GcH1itXWXiIiIGKPlysXut6W9MTjOuRAcABELgwvCAtq5OoT3vhOPKfT+YQS1VdY6xlysJ027Z0l5frDWxZOy1sWFBs15fqhrCMZ4OnlfrXf7oqGbiIwxF0WHDavQoZhrdHNb/7Pef+sDpJ9L+f94AAAAAElFTkSuQmCC'
});
searches.push({
    alt: 'Fenopy',
    template: 'http://fenopy.eu/?keyword=%artist%+%song%+%album%',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAADy8vIMjIvJjkFCr/pBQq7/QEGr/z9AqP8+PqX/Pj6l/z4/pv8/QKn/QEGs/0FCr/9CQ7L/QkOz+o+OzY329vYHjIvKjkFDr/81NaP/JyOW/yAbjv8fGor/HhmH/x4Zhv8eGYf/HxqK/yAajv8hHJL/KSab/zk4qv9DRLX/kZDPi0FCr/o1NKP/IBuP/x8ai/8eGYb/KyeK/1VRnv9VUZ7/VVKf/x0Ygv8eGYb/HxqL/yAbkP8hHJT/OTiq/0JDtfpBQ67/JSGT/x8aiv8dGYT/HBh//1RRm/////////////////8bF3r/HBh//x0ZhP8fGor/IBuQ/ykmnP9DRbT/QEKr/yAbjP8eGYb/HBiA/xsWeP9TUJb/////////////////GhVz/xsWeP8cGH//HhmF/x8ajP8iHZP/QkSx/z9Bqf8fGor/HRiC/xsXe/8aFnT/U1CS/////////////////xgUbf8aFXP/Gxd6/x0Ygv8eGon/IBuQ/0JDsP8+QKf/HhmI/x0YgP8bFnj/GRVx/1JPj/////////////////8XE2j/GRVv/xoWdv8cGH7/HhmG/yAajv9BQ67/PkCm/x4Zhv8cGH7/GhZ2/xgUbf9RTo3/////////////////FhNl/xgUa/8aFnT/HBd8/x0ZhP8fGoz/QEKs/z4/pf8eGYb/HBd9/xoWdf/Gxdv/////////////////////////////////GRVy/xsXev8dGIL/HxqL/0BCq/8+QKb/HhmG/xwYfv8aFnb/xsXb/////////////////////////////////xkVcv8bF3r/HRiC/x8ai/9AQqv/PkCn/x4ZiP8dGID/GxZ4/0RBi/99e6v/////////////////YF2W/1JPkf8aFnX/HBd8/x0ZhP8fGoz/QEKs/0BBqv8fGov/HRmD/xwXfP8aFnX/REGK////////////////////////////GxZ4/xwYf/8eGYb/IRyP/0BCrf9BQq3/JCCS/x4ZiP8dGIL/Gxd7/xoWdf+bmcH/4+Lu/////////////////xwXfP8dGYP/HxqK/ycklf9BQ6//QUKu+jMxof8fG43/HhmI/x0Ygv8cF37/Gxd6/xsWeP8bFnj/Gxd6/xwYfv8dGYP/HhqJ/yAbjv81NaT/QkKw+oyLyY5BQq//NDOh/yMfkP8fGon/HhmF/x0Ygv8dGID/HRiA/x0Ygv8eGYX/HxqK/yUgkv81NKH/QkKw/4yLyo7y8vIMionHkUBBrfpAQqv/PkCn/z0+o/88PqD/Oz2e/zs9nv88PqD/PT6j/z5Ap/9AQqv/QEGt+ouLyI7y8vIMgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA=='
});
searches.push({
    alt: 'Google',
    template: 'https://google.com/search?q=%artist%+%song%+%album%',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8A//3/AP39/wD6/f8A+P3/AP/8/wD9/P8A+vz/AP/7/wD/+v8A/vr/APz6/wD4+v8A+/n/APP5/wD/+P8A+vj/AO/4/wDm+P8A2fj/AP/3/wD/9v8A9vb/AP/1/wD69f8A9PT/AO30/wD/8/8A//L/APnx/wD28P8A///+APj//gD2//4A9P/+AOP//gD//f4A6f/9AP///AD2//wA8//8APf9/AD///sA/v/7AOD/+wD/+vsA9/X7APr/+gDv/voA///5AP/9+QD/+/kA+e35AP//+ADm//gA4f/4AP/9+AD0+/gA///3APv/9wDz//cA8f/3AO3/9wD/8fcA//32AP369gDr+vYA8f/1AOv/9QD/+/UA///0APP/9ADq//QA///zAP/18wD///IA/fzyAP//8QD///AA9//wAPjw8AD//+8A8//vAP//7gD9/+4A9v/uAP/u7gD//+0A9v/tAP7/6wD/+eoA///pAP//6AD2/+gA//nnAP/45wD38eYA/fblAP/25AD29uQA7N/hAPzm4AD/690AEhjdAAAa3AAaJdsA//LXAC8g1gANH9YA+dnTAP/n0gDh5dIADyjSABkk0gAdH9EABxDRAP/l0AAAJs4AGRTOAPPczQAAKs0AIi7MAA4UywD56soA8tPKANTSygD/18kA6NLHAAAjxwDj28QA/s7CAP/1wQDw3r8A/9e8APrSrwDCtqoAzamjANmPiQDQj4YA35mBAOmefgDHj3wA1qR6AO+sbwDpmm8A2IVlAKmEYgCvaFoAvHNXAEq2VgA5s1UAPbhQAFWtTwBStU0ARbNNAEGxTQA7tEwAObZIAEq5RwDKdEYAULhDANtuQgBEtTwA1ls3ALhgMQCxNzEA2FsvAEC3LQB0MCkAiyYoANZTJwDLWyYAtjMlALE6JACZNSMAuW4iANlgIgDoWCEAylwgAMUuIAD3Vh8A52gdALRCHQCxWhwAsEkcALU4HACMOBwA0V4bAMYyGgCPJRoA218ZAJM7FwC/PxYA0msVAM9jFQD2XBUAqioVAIAfFQDhYRQAujMTAMUxEwCgLBMAnxIPAMsqDgCkFgsA6GMHALE2BAC9JQAAliIAAFYTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AsbGxsbGxsbGxsbGxsbGxd7IrMg8PDw8PDw8PUBQeJXjQYE9PcKPM2NfP2sWhcg+BzTE7dLjbmG03YWaV4JYye8MPbsLZlEouKRRCg9SXMoW/U53enGRAFzCRtNO7mTiAyliw30gRTg9VbJCKfYs0j9VmuscfLTFbIy8SOhA0Inq5Y77GNBMYIxQUJzM2Vxx2wEmfyCYWMRldXCg5MU0aicRUms58SUVeRkwjPBRSNIfBMkSgvWkyPxVHFIaMSx1/0S9nkq7WdWo1a43Jt2UqgtJERGJ5m6K8y92znpNWIYS1UQ89Mmg5cXNaX0EkGyyI3KSsp6mvpaqosaatq7axsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D'
});
searches.push({
    alt: 'Google Blogspot',
    template: 'https://www.google.com/search?q=site%3Ablogspot.com+%artist%+%song%+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCDwkVGYdJ0SoAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA0klEQVQ4y2NkgIJ/aUz/GUgATLP+MTIwMDAwkqMZ2RBGcjXDAAuGSEQPA4NFAgMDhwBC7MIGBoYlKQwMXz5gugJDs0MBqmYGBgYGgwAGhow12L2BwrNIQLAXJEDwD6itKg4MDDIGBLwAs3lNAQPDiSUI8YQFCJcwMDAwPLkAl0INxBl/iAu5DBYcXqBKLMC8sGcKqphLDgNDyAQCBvz4AAmHkAmYUQbT/OMDHgNOLIBEI3LAoYMTC/AYsKIEEZ3oaeHHB4hmmBqssUAGoDwzUZqdAUkvQ+WlCtraAAAAAElFTkSuQmCC'
});
searches.push({
    alt: 'Google Direct Downloads',
    template: 'https://www.google.com/search?q=4shared|indomp3z|indowebster|ziddu|megaupload|rapidshare|mediafire|rayfile|sharebee|zshare|badongo|rayfile|brsbox|asianload|japanimusic|japandata+%artist%+%song%+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAKXwAdrtEfK9jesBGfcRJ/2YAgchMhMxPi9JXl9llo+F0r9aStd2Xr+iCt+CZveWfvPSYw+mnyu6v0fK32Pa/3vnGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwezBmQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAB9SURBVChTXY0LDgIhDAVblj8iIMj9b1rbhTWukwDp5PEK9AccDC7IWktwtNbwIdyEUuomstY6/yayMeYrpLQ458pOyFYs3nsWAsi+WkMItZ6rgfDFxBjl4RDwh957Solv+cSCcIzx5HOWiCB8C7v0rMY555pXQsyeL0HXTB/wOmoV0sRHwQAAAABJRU5ErkJggg%3D%3D'
});
searches.push({
    alt: 'Google Guitar Tablature',
    artistSongTemplate: 'https://www.google.com/search?q=%artist%+%song%+"tablature"',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAQAAEAEAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAgICAAMDAwAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8A//+AB///////8QmZf/////8JmQkH////8JmQmfCP//8JmZmf+Q///wmZl4/5CP//CZn4eP8AD/8Jmf+H//8P//CZmf9wDw///wAJnwcf/////4CZB3D//////wkPB2//////9w/wAP////////8AA/////////sw////////9wsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
});
searches.push({
    alt: 'Google Lyrics',
    template: 'https://google.com/search?q=%artist%+-+%song%+lyrics',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8A//3/AP39/wD6/f8A+P3/AP/8/wD9/P8A+vz/AP/7/wD/+v8A/vr/APz6/wD4+v8A+/n/APP5/wD/+P8A+vj/AO/4/wDm+P8A2fj/AP/3/wD/9v8A9vb/AP/1/wD69f8A9PT/AO30/wD/8/8A//L/APnx/wD28P8A///+APj//gD2//4A9P/+AOP//gD//f4A6f/9AP///AD2//wA8//8APf9/AD///sA/v/7AOD/+wD/+vsA9/X7APr/+gDv/voA///5AP/9+QD/+/kA+e35AP//+ADm//gA4f/4AP/9+AD0+/gA///3APv/9wDz//cA8f/3AO3/9wD/8fcA//32AP369gDr+vYA8f/1AOv/9QD/+/UA///0APP/9ADq//QA///zAP/18wD///IA/fzyAP//8QD///AA9//wAPjw8AD//+8A8//vAP//7gD9/+4A9v/uAP/u7gD//+0A9v/tAP7/6wD/+eoA///pAP//6AD2/+gA//nnAP/45wD38eYA/fblAP/25AD29uQA7N/hAPzm4AD/690AEhjdAAAa3AAaJdsA//LXAC8g1gANH9YA+dnTAP/n0gDh5dIADyjSABkk0gAdH9EABxDRAP/l0AAAJs4AGRTOAPPczQAAKs0AIi7MAA4UywD56soA8tPKANTSygD/18kA6NLHAAAjxwDj28QA/s7CAP/1wQDw3r8A/9e8APrSrwDCtqoAzamjANmPiQDQj4YA35mBAOmefgDHj3wA1qR6AO+sbwDpmm8A2IVlAKmEYgCvaFoAvHNXAEq2VgA5s1UAPbhQAFWtTwBStU0ARbNNAEGxTQA7tEwAObZIAEq5RwDKdEYAULhDANtuQgBEtTwA1ls3ALhgMQCxNzEA2FsvAEC3LQB0MCkAiyYoANZTJwDLWyYAtjMlALE6JACZNSMAuW4iANlgIgDoWCEAylwgAMUuIAD3Vh8A52gdALRCHQCxWhwAsEkcALU4HACMOBwA0V4bAMYyGgCPJRoA218ZAJM7FwC/PxYA0msVAM9jFQD2XBUAqioVAIAfFQDhYRQAujMTAMUxEwCgLBMAnxIPAMsqDgCkFgsA6GMHALE2BAC9JQAAliIAAFYTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AsbGxsbGxsbGxsbGxsbGxd7IrMg8PDw8PDw8PUBQeJXjQYE9PcKPM2NfP2sWhcg+BzTE7dLjbmG03YWaV4JYye8MPbsLZlEouKRRCg9SXMoW/U53enGRAFzCRtNO7mTiAyliw30gRTg9VbJCKfYs0j9VmuscfLTFbIy8SOhA0Inq5Y77GNBMYIxQUJzM2Vxx2wEmfyCYWMRldXCg5MU0aicRUms58SUVeRkwjPBRSNIfBMkSgvWkyPxVHFIaMSx1/0S9nkq7WdWo1a43Jt2UqgtJERGJ5m6K8y92znpNWIYS1UQ89Mmg5cXNaX0EkGyyI3KSsp6mvpaqosaatq7axsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D'
});
searches.push({
    alt: 'Grooveshark',
    artistTemplate: 'http://listen.grooveshark.com/#/search/artists/?query=%artist%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADAklEQVR4nI2NTWhcVRxHz73vzczLTD4abT6IlujC2loCIlq7qBZUjFR3giAGwVXpThTdaMG2IGJRFLsU3Yko6MKF0I20YAmt1dpYbUxNJsnkTdJkPt58vnffu/fvolBcenY/OPyOaoXzB73F9z8t6qVDBEUY3AvFFhSB4EkghvgidHageQ2aKbRguzdxMd7/0XHicw9UXfit/D8yESmLSEXcymlpf16s+qrzz6QkTdzyJygvgNwwKlcCVkEWAUBNg+khxoG1oAfARORNPOkTK6S7CroAvgM1gKTriF1CqQwQxN1EySgiwe3z/CDSLOMS0JlVOGsRbxCXpdjoT868eIZff7xOFrVxUQ3XauO6FcQ0EN8HP8NpDzeo8F2mkMygvAJ253eUH3B9tc3Cu7/x8MwQc2/tY3QIJLMoqUNtAz06jd3ZwqyAziIFXgFVMuixB3E6oCUQiXBhoc07r19loxxjuwYbG9LaLWy9gkge21fodE1Iw79JK8uYlQXqNxdpOuhoTVsplhsZb5+6wXY1JutnuH6KCdfI6lWyRKFNQ2HjPunmGrbd4MLlOj2l6AAdoKsUa5Hl1BdVTJySdRJsbMl6MXFF0FkCkRvG9lNWNvqc/W6NntboiXHU+Bg9relpzaWVhLPfbxOpe7GJxZEjaYJubMD8oyc5+dU6cx/+QdgxdF3GgZfnmHnlVbouo4fQE8c3CxlXnvqMX65ZzFYDUwPvnnM/v3d5Yy/3Pf8MqlDAGxpk9o03GZ09xsxjhynu2YVVwkNHj/Ls6Q8om2mKR17g4/M1djevooonQnlpdgSTOI7sD7ilYXMzo9txbFZTnn5kgLikGXdw/q+YJBG0B4cPBPyUCqp4Yl0e3xcwMZXnv2yFhompPFuhIRjQxH1HLqe4ayx3x/lhvoPvL0VhfZdMjUx4pIkjV9DsrMfs3hNQKXfx85rCsEe/bzEpVMoGACl5eFdqoTr0dfjcjaXel8a4SXcpQh8cAcDNN6Dko2eGbu+F9p2yKnl4rXTz/ifufu1fYt/KJ9f1tE4AAAAASUVORK5CYII%3D'
});
searches.push({
    alt: 'isoHunt',
    template: 'http://isohunt.com/torrents/?iht=2&ihq=%artist%+%song%+%album%',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39vX28e/5+fUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkimdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N/Mu6xmMwCgfl8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7+viadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYAAAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAAAADJvKtsPQujh2n7+/qUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj/l2NMAAAAAAAAAAADk1c5wQBGNZ0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNpNwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMAAAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC/rZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx/wAA8f8AAPH/AACR/wAAAf8AAAHHAACAxwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA//EAAP/wAAD/+QAA'
});
searches.push({
    alt: 'iTunes',
    template: 'http://www.apple.com/search/?q=%artist%+%song%+%album%',
    imgsrc: 'data:image/x-icon;base64,AAABAAQAICAAAAEACACoCAAARgAAABAQAAABAAgAaAUAAO4IAAAgIAAAAQAgAKgQAABWDgAAEBAAAAEAIABoBAAA/h4AACgAAAAgAAAAQAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAABCQkIAnp6eAHJycgDOzs4AWlpaALa2tgDm5uYAkpKSAE5OTgB+fn4AZmZmAKqqqgDa2toAwsLCAPLy8gBKSkoApqamAHp6egBiYmIAVlZWAIaGhgBubm4A4uLiAMrKygBGRkYAoqKiAHZ2dgDS0tIAXl5eALq6ugDq6uoAmpqaAFJSUgCCgoIAampqAK6urgDe3t4AxsbGAPb29gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJwYLDScnJycnFwsXJycnJycnJycnJycnJycnJycnJycFIAQcHAcjGRUEHBwRJycnJycnJycnJycnJycnJycnDSAEHBwcHBwcHBwcHBwUJycnJycnJycnJycnJycnJwYTBBISEhISEhISEhISEhIdJycnJycnJycnJycnJycnCRMSEhISEhISEhISEhISEhUnJycnJycnJycnJycnJwwIHBISEhISEhISEhISEhISEhAnJycnJycnJycnJycnFBMSCgoKCgoKCgoKCgoKCgoSEicnJycnJycnJycnJycgBAoKCgoKCgoKCgoKCgoKCgQZJycnJycnJycnJycnAwgSCgoKCgoKCgoKCgoKCgoSJCcnJycnJycnJycnJycBCBIiIiIiIiIiIiIiIiIiIiMnJycnJycnJycnJycnJwEICiIiIiIiIiIiIiIiIiIiJycnJycnJycnJycnJycnASAKFRUVFRUVFRUVFRUVFRUnJycnJycnJycnJycnJycBCAoVFRUVFRUVFRUVFRUVFScnJycnJycnJycnJycnJwEPEhUCAgICAgICAgICAgICFicnJycnJycnJycnJycnDAAEFQICAgICAgICAgICAgIBJycnJycnJycnJycnJycnFQgSAgICAgICAgICAgICAgINJycnJycnJycnJycnJycMACASFQICAhUKCgoVAgICFQoNJycnJycnJycnJycnJycNCAgEHBIcEwoTBBIKCgocBycnJycnJycnJycnJycnJycnBwIaGiMnJycFCRMEIRsnJycnJycnJycnJycnJycnJycnJycnJycPFSUnJycnJycnJycnJycnJycnJycnJycnJycnJycnJwQEAh8nJycnJycnJycnJycnJycnJycnJycnJycnJycnAQgKGh0nJycnJycnJycnJycnJycnJycnJycnJycnJycnBCAKIScnJycnJycnJycnJycnJycnJycnJycnJycnJycMCggEJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnBQkMJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJ///////////////////////4+P//8AB//+AAP//AAB//wAAf/4AAD/+AAA//gAAP/wAAH/8AAD//AAB//wAAf/8AAH//AAA//wAAP/+AAB//gAAP/8AAH//wcD///8f////D////wf///+H////h////+P/////////////////KAAAABAAAAAgAAAAAQAIAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAEZGRgCioqIAcnJyAMrKygBeXl4Atra2AIaGhgDi4uIAUlJSANbW1gBqamoAsrKyAIKCggC+vr4ATk5OAKqqqgB6enoA0tLSAGZmZgCSkpIAWlpaAEpKSgCmpqYAdnZ2AM7OzgBiYmIAurq6AOrq6gBWVlYA2traAG5ubgDCwsIAlpaWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhISEhISEhISEhISEhISEhISEhISEHGCEhIRghISEhISEhISEFFBQQDBIEECEhISEhISEJCBQEBAQEBAQWISEhISEhBgQZGRkZGRkZGR0hISEhBwAEEhISEhISEgQaISEhIR8OGQoKCgoKChIDISEhISEgDhIKCgoKCgoGISEhISEhARUZHh4eHh4eEyEhISEhIRgAFAoCAh4eHgIJISEhISEhCgAUGRkZCgoKCiEhISEhIRsMCBwLGA8SCg0hISEhISEhISEhERUPISEhISEhISEhISEhISEUCA8hISEhISEhISEhISEhERQXISEhISEhISEhISEhISEh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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQDBERETPTU1N/1lZWf94eHgxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBgREREr0VFRTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////j4///wAD//4AA//8AAH//AAA//gAAP/4AAD/+AAA//AAAf/wAAP/8AAD//AAB//wAAf/8AAD//AAA//4AAH/+AAA//wAAf/+BgP///x////8P////B////4f///+D////4/////////////////8oAAAAEAAAACAAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjIyMM1tbWzgAAAAAAAAAAAAAAABQUFAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPT09UFBQUO9bW1v/XFxcz1xcXL9cXFzvXV1d/1xcXM8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAODg4IEpKSu9bW1v/YGBg/2BgYP9gYGD/YGBg/2BgYP9gYGD/X19fjwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8/P59VVVX/YmJi/2NjY/9jY2P/Y2Nj/2NjY/9jY2P/Y2Nj/2FhYf9ycnIxAAAAAAAAAAAAAAAAAAAAADAwMBBGRkb/XFxc/2ZmZv9mZmb/ZmZm/2ZmZv9mZmb/ZmZm/2VlZf9dXV3/VVVVVwAAAAAAAAAAAAAAAAAAAAA8PDxATU1N/2FhYf9paWn/aWlp/2lpaf9paWn/aWlp/2lpaf9nZ2f/bGxsTgAAAAAAAAAAAAAAAAAAAAAAAAAAPDw8gE5OTv9kZGT/bGxs/2xsbP9sbGz/bGxs/2xsbP9sbGz/aWlpzwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk5OXBKSkr/YmJi/25ubv9vb2//b29v/29vb/9vb2//b29v/21tbb8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OjowRERE/1lZWf9qamr/cHBw/3BwcP9ubm7/bW1t/29vb/9xcXH/ampqMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD09Pb9KSkr/WVlZ/2NjY/9jY2P/Y2Nj/2hoaP9ra2v/aGho/2BgYO8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmZmYZPz8/n0VFRe9KSkrvS0tLc1VVVUtmZmaCZ2dn/1dXV99JSUlQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQDBKSkr/YmJijQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ0ND31NTU/9iYmKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQDBDQ0PfS0tLvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFdXVykAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD535dD8A/53+AH8A/gA+AHwAPgA8AHwAPAD8AHwA/AD8AHwA/gB8AH4AfgB/4/4Af/H/4//x//H//fBAA='
});
searches.push({
    alt: 'jpopsuki',
    artistTemplate: 'http://jpopsuki.eu/artist.php?name=%artist%',
    artistAlbumTemplate: 'http://jpopsuki.eu/torrents.php?action=advanced&artistname=%artist%&torrentname=%album%',
    imgsrc: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA8Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gMTAwCv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABAAEAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP200Kx/aP8A2v8AxD4k+Dnxr+Ifi64k8KZ8TeNPAGueGtFsdO8OePo7qWKHw/F4V0fRQ93a6PFYQaxo8moav4k8OaPZSDVdEW81W6Ouz/OXg/wH44+FXjvwr421Gy1iw+EHwY+PPh9L34haJYW/9n+D/Emqa74fu/FNzpukm7jsLDV9U8N2Uia9q+maLaprYj0zQdf1W5S8tLC4+o/23PCnxc/Z8/aC+LHxA0W2l/4Vl8e7W0e61m5i1P8AsGeVodDvbvw/f63pV5pc/hzX9H8T6JNqVkr6lZNrGg6hZrZRa5bR+I9Nsvkf4a+H/jN+0n47Pw50HUJtWvvHepXw8S3lhYWup2+haP4l1vRdW8YeIPEevRW/meH/AAwt/oWi+KNT09JbWDxDr/hvw5p9lBeai9lYSf3Vkdenisgjm+CxGQZXwfjspwmLxeEweGp0cDlVWvhFDiCVOGHhCnSxsFVxGEtXVSNKNOCxTxEpToQ/nLMMBkdPBTwWLwdDG8X4KhXy+OMx84YvPMbjsNKrRy2Snj3icwnUxDpYPHYF0a8Xiq+IdTBQw1JYapL/2Q%3D%3D'
});
searches.push({
    alt: 'Last.fm',
    artistTemplate: 'http://www.last.fm/music/%artist%',
    artistAlbumTemplate: 'http://www.last.fm/music/%artist%/%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeElEQVR4nJ2SS0iUYRSGn/+bcaYcZ3B0rOyimWlBRVRaIZUJKRWiQZdNBFGbFi3auAm6CNWigoQiaRO1aRWtisxd10UuMnOki5hlOEMpMo5z+S/ff9qMZrUIe+FdHJ5zzuKc19B9PTv0nY4rfIpuZi6qWvPac/RUm5E53BBjYnzRnIanFS6OG8mmtfJfwzl5bUfPFAJIbp1hgDGrUQA3x9Qs5rVsjQtktUtKC8aSMiSTxjMxRsCjyFMGjitMaRe3vBJcjRoZpiDHGN5aKQO1FfL+fJvYqSmZ1uTgB+k90iLR2grpba2XqS+fZ1jq21fpa62XoS0rRGVMm0zVOladu0z85TOe1m/g1aE9iPKwuuM2cfESPnYSNT+f7qY6XhzcjaEU+TV1mJaDSpqaYGMzojUfz7YRGv+BL/qO/vbT+IuKCTUfwMUgLxiiYM16sqMxXuysYezeXWzLRWUsG9+ChVjJSZzvPxBbYzia9KvnpOIxlu5tIdpxheTwEHXXOtn18i3Vl29ghorIWg7KtjRmIoG/MEwmz0fKdEibDnbW5MvjhyzcWIt2XJ43bqdrWw09l9opb91PybETTJk2yrU1se4nAFSducio8pFYspyKMxcYuHkdbVts6ehEyiqYGBzkc1cX2rLwhovJ2hqelATlQaRA3ly7Kq7jzFx6PNov91cuk+6D+yQx/OsDIiKTI1/lUcM2eRQJivGwMF9cICuCDobIX1FJ5tsIMj6GHwMBsgjzVlajAgHQmnR/H/MxyDPAeBDwy29pAxR/p3Da/MG9nsiC0Wwstnh2vt1/5H+azystHVWbOm8d90ZK4o52mYu9kZL4ps5bx38CB8BuS5VfuXIAAAAASUVORK5CYII%3D'
});
searches.push({
    alt: 'Myspace',
    template: 'http://www.myspace.com/search/music?q=%artist%+%song%+%album%',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAABNTU1qTU1N/01NTf9NTU3/TU1N/01NTf9NTU3/TU1N/01NTf9NTU3/TU1N/01NTf9NTU3/TU1N/01NTf9NTU1qTU1N/zMzM/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8zMzP/TU1N/01NTf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/01NTf9NTU3/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/MzMz/7Ozs/8ODg7/AAAA/wAAAP9NTU3/TU1N/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP//////AAAA/wAAAP8AAAD/TU1N/01NTf8AAAD//////2ZmZv8AAAD//////2ZmZv8AAAD//////zMzM/8AAAD//////2ZmZv8AAAD/AAAA/01NTf9NTU3/AAAA//////9mZmb/AAAA//////9mZmb/AAAA//////8zMzP/aWlp//////+zs7P/AgIC/wAAAP9NTU3/TU1N/wAAAP//////ZmZm/wAAAP//////ZmZm/wAAAP//////AAAA/7y8vP+8vLz//////wAAAP8AAAD/TU1N/01NTf8AAAD//////2ZmZv8AAAD//////2ZmZv8AAAD//////wAAAP//////ZmZm//////9mZmb/AAAA/01NTf9NTU3/AAAA////////////s7Oz////////////s7Oz//////9mZmb//////wgICP+8vLz/vLy8/wAAAP9NTU3/TU1N/wAAAP+8vLz/aWlp/7y8vP9paWn/aWlp/7y8vP8zMzP/vLy8/01NTf8AAAD/AAAA/7y8vP8AAAD/TU1N/01NTf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/01NTf9NTU3/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9NTU3/TU1N/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/TU1N/01NTf8zMzP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/MzMz/01NTf9NTU1qTU1N/01NTf9NTU3/TU1N/01NTf9NTU3/TU1N/01NTf9NTU3/TU1N/01NTf9NTU3/TU1N/01NTf9NTU1qgAFWZAAAVgMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6QwAABEQAAEZDAAAAAAAA+kMAAAAAgAEAAA=='
});
searches.push({
    alt: 'MusicBrainz',
    artistTemplate: 'http://www.musicbrainz.org/search/textsearch.html?type=artist&limit=25&handlearguments=1&query=%artist%',
    artistAlbumTemplate: 'http://musicbrainz.org/search/textsearch.html?type=release&adv=on&handlearguments=1&query=artist:%artist%+AND+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA3UlEQVR4nIWRMQrCMBiFcwoHZ5cuHsFVFD2AY8VRujh4AI/gKoLgIognsAcQBzdvU+LXvvITQk3DayDJ95L3/3Xe+9328U/Dwcg5N13MsmzMEth1chzDQRfF/v39VHCuJWODUObT+Qhn6jbA8XpZPkM0ZWA3pAmTr1dspgy+QcljZfQbBGFYzjeo38AMJ5tGv0G9V0Pjov0rN5mBPGGLcNZHYvjuh4kFkIHl5Xatggag1iCaP0pDkS5Ti2wYrRQuzKq4Yc5IsYFaeTBlIJIeBVX6BN0UzWjqRmm0lvc/AwuT4n8BncUAAAAASUVORK5CYII%3D'
});
searches.push({
    alt: 'Rate Your Music',
    artistTemplate: 'http://rateyourmusic.com/search?searchtype=a&searchterm=%artist%',
    artistAlbumTemplate: 'http://rateyourmusic.com/search?searchtype=l&searchterm=%artist%+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXUlEQVQoz8WSuQ0AIAwDvX/NFmySpUCAxGMSvgYr5R2gYIQx3gsNAVigqgaiRRwNObBo5MxOE+jgQpOTBOslFSXnu1Dpixs2ArroQr9WjJlp5eMWdBOuq/FSvvN6R6LnF2dpV3xmAAAAAElFTkSuQmCC'
});
searches.push({
    alt: 'RuTracker',
    template: 'http://rutracker.org/forum/search.php?nm=%artist%+%song%+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHGggCHa3WoeEAAAJ0SURBVDhPjZJNSJNxHMc/z/bAprOZs5aP0xH5LMXEPHQRbTOQpBUKnaTwkB7qYgRCRnTo6MEIxC5StAIJu4xeIMjDQjBECk0wfMH15GLw+OgK3RrsxX+Hcmov2Of6+34//Pj9/7AHs7OzQtd1sVfuDwzDEFuEQiGxvLwsYrHY/4uWlpZEYnBEfG2/IXYSDodFJBLJiUy/FzVNE2tra0JRFL4/fEbq9QQrxadYrToPQCAQIJVK5fK7BJFIRLjdbhYXF1m4fJvNT9HczD5wHb//LKWlpVRUVEh/FZSXl0uXPtbj8XiYaDjCZmHBz9DBItIfFmhra0VV1Z0V5Lm5OfG+8BXf0qsY6SihWBCHw4Hdbkd3FqAO9mLzN5J89JIWXw0zMzO7BCbDMLhQco2n+j1CsSAATe+KWK4f5/jEE4a/LOL1+rg6/pyNjQ0SiQSapuWOKLvdbrLZLCbJzKbIAtDlukWH0kN3dzeB4RX2F1/EWa4yFNC50lnL2NjY9gZCCMxmM5X5dXS6bgLQofTg9foIvVlAyCdJpE4QeqvS0lxHOp3GZNo+nclms7G+vo53uot9EypD1SEAamqOUVXbi8XWimQuA8nKuTMH6Ovro6qqelug6zrBYJB4PE40GmXkzgvi8Tia9pm7fR4sFislhyT8py3cf5ykv78fszn3isiKotDY2Igsy2QyGSYnJ5mensbn8yJJEpVHZR4MFHLksPlXpYz5+fmcYFu1g3A4LLLZLMlkElVVaW9vx+VykZeXR35+Pk1NTTQ3N0v/FGwxNTUlRkdHcTqdNDQ0YLVayWQy2Gw2nE7n3gJN04RhGDgcjl3fdyc/AGM4B8aQvyP0AAAAAElFTkSuQmCC'
});
searches.push({
    alt: 'Spotify',
    template: 'spotify:search:%artist%+%song%+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAArFJREFUOE+NU+0vlXEYvnDk7FAkOyTvL2WOlSbTpKQtbSFmXkMvmJgcUpOwc4gjcx7y0iiyJEKFDqGmPvQX+NiH/oC2VvnUh9aHq/s5yjTZerZrz/3cz++67vu+fr+fA7Z7zHDMXtP6aVw1ui9r/LZy//vnbddu/pFt1vk0jbmsdtgc2D7rQMusE9tmNWyzubB60HUwMRGabYWMvboyqxCtNmcqNi2VeTd2Lbiza96T1nkvdrz0YuusO3PN7kFbRMqt2jxFiD2v3Ni/7MG+xT3sXfTmvWVfDrwOkFwwe5fC2L0YxrY5PZNLdnluiKSWQacsaGka92BQOrj3DLgvBQxIBQPPSiwIzXRgVrOXdGVg11Ikb457ftoQqFC0/b1LejaM+jC+VMtSRc/WyRC2TweybmQn05rAoBzQOQHUnQDDcrW0zAcxoWjHfrvI7Sl3Dr4J59DbSD5YMbBxTM+iTjD/DljcA9aOguYXoElQoID+aeC1CYk7dXMq31FZ0Av5IIdXIhicDRqKwJgyMLZc4mKpngf6ZIJRJWDNY/D6JFg9DhbexQe7gNXmLSaFsnUG4jRk68BWqdbyB5JvmALjqkRIPLohcZUInFfw0T6CacKTpudgsxAuSMvp7WCGtJ/RAaZZwJQ2yfcJ8ek62SjkyjH534L3doGcBrxrfCYzCppVIYEaq7kmwa1p8PIAmGyWEUSk8gl4RUaJyUSGXeBIJkLqRLVRFqrvpHoxKh/0k9mP1oDlD3/PLcZdFXKFVM/vwY+/DlOqETOhF0Gc2oQkiVUkgq6n1yur5JJh8FAqkrecRo0Bq+piFb6yG2oHmpPyfVxwDHSMk1GGxMwC1G97H3ZHoPZSN35WPpJ2pZrqdlSpCMSCTgfw1TcS0f91K8MTER2bBUt8IUaiz8Hofxi+/yL+Au/OXt9xQVOtAAAAAElFTkSuQmCC',
    samewindow: true
});
searches.push({
    alt: 'The Pirate Bay',
    template: 'https://thepiratebay.sx/search/%artist%+-+%album%/0/7/0',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAATN8AAEzfAfWGCicAAAIQSURBVDhPjZM7aGJBFIavBisJarQRwQeCgYitQVB8VbYS8FUYCzsRtAlYGggGwVYL7XwR0aCFYCGiEEirBIKFjSA2gohdDP7LnMW7bsySHTjce+ae882d/5/h8GXs93v8FMct3CF5f3+Hx+OB0+mE2+3+NlwuF1jU63WewQMajQY4jvuvuLm5OQU8Pz/zzSKRCEKhEHK5HFKpFGdnZxQCgYBqgsHgvwEmkwmTyQThcBidTgfT6RTRaJTeM5kMAQKBwCmg1WrRR7PZjMViQUUajQaXl5fQ6/UYj8d4eHigGp/PdwooFov8FiQSyYkW5+fntI3DIh8fHwThRTwGsCK2ulgspgaDwQCmy0Fko9EIHvD29oZEIoFCocCvcH19Daa0SqWiJqaH1WqFTCajnFnNzsrn5ye4wWBAk+l0GrlcDpVKBd1uF09PT6hWq5SXy2U0m00wp9rtNmmUz+cRCoXApVIpnmq323F7e0sgJtput+PFWq/XeHl5QalUwv39PVnscDjA9Xo9xGIxSmq1Gu7u7qBQKAjKnhaLBTqdDkqlEjabjdxhp/Hq6oocIhGXyyUdGK1WSx+ZTcz7bDaLx8dHeL1eamCAeDwOtVqNSCSC4XD4G7DdbnFxcYFkMonNZvP1flHO5kejEfx+P/3d6+vrHxuZmv1+H6vV6tvm48n5fE6Xbjab/X0Ofuw8KmAWHsYvPk6hhyLKHvMAAAAASUVORK5CYII='
});
searches.push({
    alt: 'Torrent Meta Search',
    template: 'http://metasearch.torrentproject.com/#!search=%artist%+%song%+%album%',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBQUAEQ8XANbLhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzMAACIiMzMzMwAAIiIzMzMzAAAiIjMzMzMAACIiMzMAADMzIiIzMwAAMzMiIjMzAAAzMyIiMzMAADMzIiIzMzMzIiIiIiIiMzMiIiIiIiIzMyIiIiIiIjMzIiIiIiIiEREzMwAAMzMRETMzAAAzMxERMzMAADMzEREzMwAAMzPwDwAA8A8AAPAPAADwDwAADw8AAA8PAAAPDwAADw8AAPAAAADwAAAA8AAAAPAAAAAPDwAADw8AAA8PAAAPDwAA'
});
searches.push({
    alt: 'Torrentz',
    template: 'http://torrentz.com/search?q=%artist%+%song%+%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZElEQVR4nGP8//8/g2n63P8MZIDTM5MZGU3S5pClGQaYKNHMwMDAwAJzCroEurdwqWHCJkEsOD0zmZFiL4waQK10QCzAluRJMgA5zZimz/1PdjqAaWZgICMMkDUzMJAZBshhAQDsRilZfCOEMAAAAABJRU5ErkJggg%3D%3D'
});
searches.push({
    alt: 'What',
    artistTemplate: 'http://what.cd/artist.php?artistname=%artist%',
    artistAlbumTemplate: 'http://what.cd/torrents.php?action=advanced&artistname=%artist%&torrentname=%album%',
    imgsrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA6ElEQVR4nNVTLQ/CMBB9JRUnJxBIBKI/AjHCL1j6O5cJsmSCBQRiEoGoQEwgJidPNCmirNnSJYgZONPLfbx77yUVzjksidWi7Z8AkEOSF3lkhs60+NaTw8BmvYFSCpAASUJ1riYLaZqCJIGZYYxBXuROZ1oECdvd1icWYOaYqwXYMiBHs2MJgB9ommZW6/V29Uz2nkkMYP2TJAmOh6OY01tfasfMk7MhHRp93wfT5kxky+FYBEBEUEqBJOH+uE8kDPXgxSeCie2r9Sy+mMjM6F7dlIHOtChPpTNPEy9+YtwjSUGe+P/P9AaVLHC/vqb8mAAAAABJRU5ErkJggg%3D%3D'
});
searches.push({
    alt: 'Wikipedia',
    template: 'http://en.wikipedia.org/wiki/Special:Search?search=%artist%',
    imgsrc: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1rUfGfiC2k8Y2ENnYz6zooS7toRHIEurRxnP3/v8ADj0yPer1l4t1DW9F/tTQ2sTa300EGmNNE/7zdjzGPzDIHz9MH5DTPH+iasfE2g674agEt6m7TbwF8D7NJzvI6fIRkfWoPh34V1Lw/rFzpV2DJoWlSNLpUztlpPOHzA/7nzj/ALaUAf/Z'
});
searches.push({
    alt: 'YouTorrent',
    template: 'http://www.youtorrent.com/tag/?q=%artist%+%song%+%album%',
    imgsrc: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAeP/PAHj//wB4//8AeP//AHj//wB4//8AeP//AHj//wB4//8AeP//AHj//wB4//8AeP//AHj//wB4//8AeP/VAHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//AF9//8Bff//AX3//wF9//8BZc//AV6//wF17/8Bff//AX3//wF9//8hjf//QZ7//yGN//8Bff//AX3//wF9//8BgP//AYD//wGA//8BgP//ACBA/wAAAP8BYL//AYD//wGA//8BgP//gMD///////+AwP//AYD//wGA//8BgP//AYP//wGD//8Bg///AYP//wAhQP8AAAD/AWK//wGD//8Bg///AYP//4DB////////gMH//wGD//8Bg///AYP//wKH//8Ch///Aof//wKH//8BIkD/AAAA/wFlv/8Ch///Aof//wKH//+Bw////////4HD//8Ch///Aof//wKH//8Ci///Aov//wKL//8Ci///ASNA/wAAAP8BaL//Aov//wKL//8Ci///gcX///////+Bxf//Aov//wKL//8Ci///A4///wOP//8Dj///A4///wASIP8AAAD/Almf/wOP//8Dj///A4///4HH////////gcf//wOP//8Dj///A4///wOT//8Dk///A5P//wJ3z/8AAAD/AAAA/wEuUP8Dk///A5P//wOT//+Byf///////4HJ//8Dk///A5P//wOT//8El///BJf//wSX//8CS3//AAAA/wAAAP8ACRD/BJf//wSX//8El///gsv///////+Cy///BJf//wSX//8El///BJv//wSb//8Em///AR0w/wAAAP8AChD/AAAA/wNqr/8Em///BJv//4LN////////gs3//wSb//8Em///BJv//wWf//8Fn///BIvf/wAAAP8AChD/Ak9//wAAAP8CRnD/BZ///0S3//+h2////////6Hb//9Et///FaX//wWf//8Fov//BaL//wNbj/8AAAD/AjNQ/wR5v/8AAAD/ARQg/wWi/////////////////////////////0S5//8Fov//BaX//wWl//8DZ5//AlJ//wR8v/8Fpf//AlJ//wJSf/8Fpf//gtL//4LS//+C0v//gtL//4LS//8ksP//BaX//wao//8GqP//Bqj//wao//8GqP//Bqj//wao//8GqP//Bqj//wao//8GqP//Bqj//wao//8GqP//Bqj//wao//8Gqv/hBqr//waq//8Gqv//Bqr//waq//8Gqv//Bqr//waq//8Gqv//Bqr//waq//8Gqv//Bqr//waq//8Gqv/nAABpYwAAdC4AAGF0AABsYQAAL2sAAD4KAAAJCQAAbnQAAGVyAAA8LwAAdGUAAHI+AAAJCQAAZGkAAD4KAAA8Lw%3D%3D'
});
searches.push({
    alt: 'YouTube',
    template: 'http://www.youtube.com/results?search_query=%artist%+-+%song%',
    imgsrc: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8AEiP//xIj//8SI///EyP//xIj//8SI///EiP//xIj//8SI///EyP//xIj//8SI///EiP//xIj//////8AEiP//wAc7v8AHO7/AB3v/wAc7v8AHO7/ABzu/wAc7v8AHO7/ABzu/wAd7/8AHe//ABzu/wAc7/8AHe//EiP//xIj//8SI////////09V//+6uv////////////9PVf//z87///////+ysv//EiP//5ub////////0tH//xIj//8SI///EiP///////9PVf///////xIj////////T1X///////8SI////////5qZ////////EiP//xIj//8TI///EiP//xIj////////T1X///////8TI////////09V////////EiP///////+amf/////////////S0f//EiP//xIj//8SI////////09V////////EiL///////9PVf////////////+6uv//EiP//7q6///v8P//0tH//xIj//8SI///EyP///////8SI///EiP//xIj//8SI///EiP///////8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiP//////////////////xIj//8SI///EiP//xMj////////EiP//xIj//8SI///EiP//xIj//8SI///EiP//9nZ//8SI///EiP//xMj//8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiL//9na//////////////////////////////////////////////////////////////////////////////////////////////////+r5/b/AAAA//372P//////R5K5/wAAAP/IiWb//////26v1f8AAAD/rGZE////////////////////////////qub1/wAAAP/+/Nj/qub2/wAAAP//////AAAA//782P8TcJ3//vzY/wAAAP///////////////////////////6rm9f8AAAD//vzY/6rm9v8AAAD//////wAAAP/+/Nj/AAAA//////8AAAD///////////////////////////9ur9b/AAAA/+PFov//////R5K6/wAAAP/JiWb//////wAAAP//////AAAA////////////////////////////AAAA//+p7/8AAAD/////////////////////////////////////////////////////////////////bq7V/wxKf///////rGZE/+PFov//////////////////////////////////////////////////////gAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=='
});


(function () {
    addStyles();
    addBodyClasses();
    toggleAdvertisementsPanel();
    removeCoverArtOverlays();
//    blockAudioAds();
    autoSkipVideoAds();
    insertSettings();
    insertSearchEngineLinks();
    toggleAllowingTrackInfoToBeCopiedToClipboard();
    extendPlayTime();
    detectSongPlayed('_');
    determineInstallCount();
    toggleKeyboardShortcuts();
})();


function addBodyClasses() {
    if (isSettingChecked('download_button'))
        $('BODY').removeClass('freemium-no-download');
    else
        $('BODY').addClass('freemium-no-download');

    if (isSettingChecked('search_buttons'))
        $('BODY').removeClass('freemium-no-search');
    else
        $('BODY').addClass('freemium-no-search');

    if (isSettingChecked('hide_ads_panel'))
        $('BODY').addClass('freemium-hide-ads');
    else
        $('BODY').removeClass('freemium-hide-ads');
}

function determineInstallCount() {
    if (!isSettingChecked('no_analytics')) {
        $('BODY').prepend('<img height="1" width="1" alt="" src="http://e0.extreme-dm.com/s9.g?login=ifugupf&amp;j=n&amp;jv=n" />');
        /*
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-45783848-1']);
        _gaq.push(['_setDomainName', 'pandora.com']);
        _gaq.push(['_setAllowLinker', true]);
        _gaq.push(['_trackPageview']);

        (function() {
            var document = unsafeWindow.document;
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
        */
        //$('BODY').append('<img height="1" width="1" alt="" src="http://www.google-analytics.com/__utm.gif?utmhn=pandora.com&utmac=UA-45783848-1" />');
    }
}

function detectSongPlayed(lastKSN) {
    var ti = getNowPlayingTrackInfo();
    if (ti.keySafeName != lastKSN) {
        allowLyricsToBeCopiedToClipboard();
        updateBrowserTitleWithTrackInfo(ti);
        addTrackToDigest(ti, getNowPlayingStation());
        if (registerCurrentTrack(ti) && isSettingChecked('auto_download'))
            setTimeout(function () {
                if (isSettingChecked('auto_download_liked_only') && !nowPlayingTrackIsLiked())
                    return;
                downloadCurrentTrack();
            }, 2000); // delay auto download to give chance artwork to load if option to d/l artwork is enabled
        removeCoverArtOverlays();
        handleMissingLyrics(ti);
        if (GM_getValue('freemium_playExtendedCount', 0) == -1) {
            console.log('Pandora Freemium: ' + (new Date()) + ' - Song played after maximum extensions (3). User must be interacting. So, we can resume extending play.');
            GM_setValue('freemium_playExtendedCount', 0);
            extendPlayTime();
        }
    }
    setTimeout(function () { detectSongPlayed(ti.keySafeName); }, 750);
}

GM_setValue('freemium_playExtendedCount', 0);
function extendPlayTime() {
    if (isSettingChecked('auto_continue')) {
        var playExtendedCount = GM_getValue('freemium_playExtendedCount', 0);
        var $stillListeningEl = $('A.still_listening');
        if ($stillListeningEl.length) {
            if (playExtendedCount > -1 && playExtendedCount < 3) {
                $stillListeningEl[0].click();
                playExtendedCount++;
                console.log('Pandora Freemium: ' + (new Date()) + ' - play extended ' + playExtendedCount + ' time(s)');
            }
            else
                playExtendedCount = -1;
            GM_setValue('freemium_playExtendedCount', playExtendedCount);
        }
        if (playExtendedCount > -1)
            setTimeout(extendPlayTime, 2000);
    }
}

function allowLyricsToBeCopiedToClipboard() {
    if (isSettingChecked('lyrics_select')) {
        $('.lyricsText')
            .removeClass('unselectable')
            .removeAttr('unselectable')
            .removeAttr('style')
            .prop('onmousedown', null)
            .prop('onclick', null)
            .prop('ondragstart', null)
            .prop('onselectstart', null)
            .prop('onmouseover', null);
    }
}

function toggleAllowingTrackInfoToBeCopiedToClipboard() {
    if (isSettingChecked('lyrics_select'))
        $('#trackInfo').removeClass('unselectable');
    else
        $('#trackInfo').addClass('unselectable');
}

function updateBrowserTitleWithTrackInfo(ti) {
    if (isSettingChecked('window_track_title')) {
        if (ti.song.length && ti.artist.length && ti.album.length)
            document.title = ti.song + ' by ' + ti.artist + ' on ' + ti.album;
        else {
            var station = getNowPlayingStation();
            if (station.length)
                document.title = station + ' on Pandora';
            else
                document.title = 'Pandora';
        }
    }
}

function handleMissingLyrics(ti) {
    var $lyricContainer = $('#trackDetail .nolyrics:visible');
    if ($lyricContainer.length) {
        var lyricsLookupURL = 'http://api.lyricsnmusic.com/songs?api_key=c504d0fe52a2c836cdcd0b3ec4e94c&q=' + fixedEncodeURIComponent(ti.artist) + '%20' + fixedEncodeURIComponent(ti.song);
        GM_xmlhttpRequest({
            method: 'GET',
            url: lyricsLookupURL,
            onload: function (resp) {
                var matchedLyricsHtml = '';
                if (typeof resp.status != 'undefined' && resp.status == 200) {
                    var results = $.parseJSON(resp.responseText);
                    if (results.length) {
                        if (typeof results[0].snippet != 'undefined' && typeof results[0].url != 'undefined') {
                            var matchedTrack = findCorrectLyrics(results, ti.song);
                            if (matchedTrack)
                                matchedLyricsHtml = matchedTrack.snippet
                                                  + '<br /><br />'
                                                  + '<a href="' + matchedTrack.url + '" target="_blank">Full Lyrics</a>'
                                                  + ' &nbsp;|&nbsp; ';
                        }
                    }
                }
                var lyricsHtml = '<div class="heading">Lyrics</div>'
                               + '<div class="itemContent">'
                                    + '<div class="lyricsText">';
                if (matchedLyricsHtml.length)
                    lyricsHtml      += matchedLyricsHtml;
                else
                    lyricsHtml      += 'lyrics not found'
                                    + '<br /><br />';
                    lyricsHtml      += '<a href="http://search.azlyrics.com/search.php?q=' + fixedEncodeURIComponent(ti.artist) + '+' + fixedEncodeURIComponent(ti.song) + '" target="_blank">Alternate lyrics search</a>'
                                    + '</div>'
                                + '</div>'
                                + '<div class="divider"></div>';
                $lyricContainer.html(lyricsHtml);
            }
        });
    }
}

function findCorrectLyrics(lyricsResults, trackTitle) {
    for (var i = 0; i < lyricsResults.length; i++) {
        if (trackTitle.replace(/\W/g, '').toLowerCase() == lyricsResults[i].title.replace(/\W/g, '').toLowerCase())
            return lyricsResults[i];
    }
    return false;
}

function getSearchEngineInfoById(id) {
    for (var i = 0; i < searches.length; ++i)
    {
        if (searches[i].id == id)
            return searches[i];
    }
}

function toggleAdvertisementsPanel() {
    if (isSettingChecked('hide_ads_panel'))
        $('#ad_container').remove();
    else
        $('#ad_container').show();
}

function removeCoverArtOverlays() {
    $('.treatment.current').remove();
}

function blockAudioAds() {
    if (!$.browser.webkit) { // failed in Chrome (successfully prevented audio ad, but the next track would not play ... console shows admanager errors)
        try {
            var proxied = unsafeWindow.XMLHttpRequest.prototype.open;
            unsafeWindow.XMLHttpRequest.prototype.open = function(method, url)
            {
                if (url.match(/proxyAdRequest|mediaserverPublicRedirect|brokenAd/) && isSettingChecked('prevent_audio_ads'))
                {
                    console.info('Pandora Freemium: Audio advertisement blocked.', method, url);
                    this.abort();
                }
                else
                    return proxied.apply(this, [].slice.call(arguments));
            }
        }
        catch (e) {}
    }
}

function autoSkipVideoAds() {
    var $skipHolder = $('DIV.skipHolder');
    if ($skipHolder.length) {
        console.log('Pandora Freemium: Skip option on popup video advertisement detected. Attempting to click "skip".');
        $skipHolder.children('A')[0].click();
    }
    if (isSettingChecked('auto_skip_video_ads'))
        setTimeout(autoSkipVideoAds, 1000);
}

function addStyles() {
    GM_addStyle('.freemium-no-download #freemium_download_button { display: none; } .freemium-no-search #dllinks { display: none; } .freemium-hide-ads.adSupported-layout #adLayout, .freemium-hide-ads.adSupported-layout .footerContainer {width: 800px !important; } .freemium-hide-ads.adSupported-layout .contentContainer {width: 800px !important; float: none !important; } #trackInfo .info DIV#dllinks {padding: 4px 10px 0 0; white-space: normal; } #dllinks .dllink {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)"; cursor: pointer; filter: alpha(opacity=20); height: 16px; margin: 5px 0 0 5px; opacity: 0.2; -webkit-transition: opacity 0.4s; -moz-transition: opacity 0.4s; -o-transition: opacity 0.4s; -ms-transition: opacity 0.4s; transition: opacity 0.4s; width: 16px; } #dllinks:hover .dllink {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)"; filter: alpha(opacity=100); opacity: 1; } #freemium:hover { text-decoration: underline !important; }');
    // add styles for reveal modal
    GM_addStyle('.reveal-modal-bg{position:fixed;height:100%;width:100%;background:#000;background:rgba(0,0,0,.8);z-index:100000;display:none;top:0;left:0}.reveal-modal{visibility:hidden;top:100px;left:50%;margin-left:-300px;width:520px;background:#eee url(data:image/png;base64,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) no-repeat -200px -80px;position:absolute;z-index:100001;padding:30px 40px 34px;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;-moz-box-shadow:0 0 10px rgba(0,0,0,.4);-webkit-box-shadow:0 0 10px rgba(0,0,0,.4);-box-shadow:0 0 10px rgba(0,0,0,.4)}.reveal-modal.small{width:200px;margin-left:-140px}.reveal-modal.medium{width:400px;margin-left:-240px}.reveal-modal.large{width:600px;margin-left:-340px}.reveal-modal.xlarge{width:800px;margin-left:-440px}.reveal-modal .close-reveal-modal{font-size:22px;line-height:.5;position:absolute;top:8px;right:11px;color:#aaa;text-shadow:0 -1px 1px rbga(0,0,0,.6);font-weight:700;cursor:pointer}');
    // add styles for reveal modal content
    GM_addStyle('#freemium_settings{ color: #000; }'
        + '#freemium_settings > h2 { color: #3A5997; margin-top: 0; margin-bottom: 1.1em; font-size: 1.5em; }'
        + '#freemium_settings > div:not(.child-options) { margin-top: 10px; }'
        + '#freemium_settings > div > div:not(.child-options) { padding: 5px; margin-left: 17px; max-height: 125px; overflow-y: scroll; min-width: 200px; display: inline-block; margin-top: 6px; }'
        + '#freemium_settings label { display: block; }'
        + '#freemium_settings input + label { display: inline-block; }'
        + '#freemium_settings > div > label { font-weight: 700; }'
        + '#freemium_settings label span { font-weight: 400; }'
        + '#freemium_settings div.child-options label { padding: 7px 0 0 22px; }'
        + '#freemium_settings input[type="checkbox"] { margin-right: 9px; vertical-align: top; }'
        + '#freemium_settings input:not(:checked) + div.child-options *, #freemium_settings input:not(:checked) + label + div.child-options * { opacity: 0.5; }'
        + '#freemium_enabler label { margin-bottom: 3px; }');
}

function insertSettings() {
    // If user menu is not using all of its available horizontal space, then we'll shrink it
    // so that our new menu will not have an awkward space to the right of it.
    var $userMenu = $('#brandingBar .rightcolumn .user_menu');
    var userMenuCSSWidth = $userMenu.css('width');
    $userMenu.css('width', 'auto');
    if ($userMenu.width() > parseInt(userMenuCSSWidth))
        $userMenu.css('width', userMenuCSSWidth);

    // Add our custom menu item
    $('#brandingBar .rightcolumn').append(
        '<span style="display: inline; float: right;"><a id="freemium" href="#">Freemium</a> &nbsp; | &nbsp; </span>'
    );
    // Add the settings modal
    $('BODY').append(
        '<div id="freemium_settings" class="reveal-modal"><h2>Pandora Freemium Settings</h2>'
        + '<div><label><input type="checkbox" id="freemium_setting__keyboard_shortcuts"/>Enable keyboard shortcuts (<a id="show_shortcuts" href="#shortcuts">list shortcuts</a>)</label></div>'
        + '<div><label><input type="checkbox" id="freemium_setting__download_button"/>Show download button (<a id="edit_ftmpl" href="#edit_filename">edit filename format</a>) <span style="color: #555;">(It is strongly recommended to upgrade to an inexpensive monthly Pandora subscription to support Pandora and receive high quality audio.)</span></label></div>'
        + '<div><label title="Filenames for artwork will be incorrect for older browsers"><input type="checkbox" id="freemium_setting__download_art"/>Download artwork with track</label></div>'
        + '<div>'
        + '<input type="checkbox" id="freemium_setting__auto_download" title="Tracks will be downloaded automatically when they start playing"/><label title="Tracks will be downloaded automatically when they start playing" for="freemium_setting__auto_download">Automatically download tracks</label>'
        + '<div class="child-options"><label title="If you chose to automatically download tracks, select this option to download only tracks that have been previously liked"><input type="checkbox" id="freemium_setting__auto_download_liked_only"/>only if they are liked</label></div>'
        + '</div>'
        + '<div><label title="If downloads lock your browser up for too long or cause it to crash, use this option. Tracks and artwork might open in new tabs or windows. You will need to configure your browser to automatically download the content types."><input type="checkbox" id="freemium_setting__download_via_open"/>Use alternate download method <span>(use this option if you are having problems downloading)</span></label></div>'
        + '<div><label><input type="checkbox" id="freemium_setting__search_buttons"/>Show search buttons</label><div id="freemium_enabler"></div></div>'
        + '<div><label><input type="checkbox" id="freemium_setting__window_track_title"/>Show now-playing track title in tab/window</label></div>'
        + '<div><label title="The &quot;Are you still listening?&quot; button will be clicked automatically for you up to three times"><input type="checkbox" id="freemium_setting__auto_continue"/>Extend playing time</label></div>'
        + '<div><label><input type="checkbox" id="freemium_setting__hide_ads_panel"/>Hide advertisements panel <span>(may require reloading Pandora after changing this setting)</span></label></div>'
//        + '<div><label title="Audio advertisements that play regularly on free Pandora should be blocked, however this does not block video popup ads."><input type="checkbox" id="freemium_setting__prevent_audio_ads"/>Block audio advertisements <span>(experimental; disabled in Chrome)</span></label></div>'
        + '<div><label title="Popup video advertisements will be skipped automatically when the option is shown on Pandora (several seconds into the video)."><input type="checkbox" id="freemium_setting__auto_skip_video_ads"/>Automatically click skip on video advertisements <span>(experimental)</span></label></div>'
        + '<div><label title="Lyric selection will become disabled again when navigating through the track history slider. If this happens, lyric selection will be enabled again when the next track begins."><input type="checkbox" id="freemium_setting__lyrics_select"/>Enable selection/copy of lyrics</label> </div>'
        + '<div><label title="Since userscripts.org install counts are broken, an external service is used just to get a count of how many people are using this script. This count inspires my development. The info is anonymous, but if you want, you can turn it off completely."><input type="checkbox" id="freemium_setting__no_analytics"/>Don\'t send anonymous statistics</label> </div>'
        + ' <a class="close-reveal-modal">&#215;</a> </div>'
    );
    initSearchEngineSettingsControls();

    // Wire up link to change filename template
    $('#edit_ftmpl').click(filenameTemplateEditClicked);

    // Wire up menu item to open the settings modal when clicked
    $('#freemium').click(function(e) {
        e.preventDefault();
        $('#freemium_settings').reveal();
        return false;
    });

    // Wire up settings controls
    $('#freemium_settings INPUT[id^="freemium_setting__"]').each(function () { initSettingControl($(this)); });

    $('#show_shortcuts').click(function (e) {
        e.preventDefault();
        alert('Keyboard Shortcuts:\n--------------------------------------------------\n[UP] = Like\n[DOWN] = Dislike\n[P] = Pause/Play\n[T] = Tired of track\n[S] = Search for track\n[D] = Download\n[SHIFT]-[D] = Like and download\n[N] = Next station\n[L] = List digest of tracks played\n\nBuilt-in Pandora shortcuts:\n--------------------------------------------------\n[RIGHT] = Next track\n[LEFT] = View previous track in play history');
        return false;
    });
}

function isEngineDisabled(id) {
    return GM_getValue('freemium_' + id, false);
}

function searchEngineEnablerChanged() {
    var val = $(this).val(),
        disabled = isEngineDisabled(val),
        $img = $('#' + val + '_img');

    if (disabled) {
        GM_deleteValue('freemium_' + val);
        $(this).attr('checked', 'checked');
        if (isSettingChecked('search_buttons'))
            $img.fadeIn();
        else
            $img.show();
    }
    else {
        GM_setValue('freemium_' + val, true);
        $(this).removeAttr('checked');
        if (isSettingChecked('search_buttons'))
            $img.fadeOut();
        else
            $img.hide();
    }
}

function searchEngineEditClicked(e) {
    var id = $(this).parent().find('INPUT').val(),
        ssId = 'ss_' + id,
        search = getSearchEngineById(id),
        searchString = getSearchTemplate(search),
        response = prompt('Customize the search URL for ' + search.alt + ' (%artist%, %song%, and %album% will be replaced. A blank string will return the search engine to its default.):', searchString),
        newSearchString = $.trim(response);

    if (newSearchString)
        GM_setValue(ssId, newSearchString);
    else if (response != null) // must be blank
        GM_deleteValue(ssId);

    e.stopPropagation();
    return false;
}

function filenameTemplateEditClicked(e) {
    var response = prompt('Customize the filename for downloaded tracks (%artist%, %song%, and %album% will be replaced. A blank string will return the filename to its default.):', getFilenameTemplate()),
        newTemplate = $.trim(response);

    if (newTemplate)
        GM_setValue('freemium_setting__download_filename_template', newTemplate);
    else if (response != null) // must be blank
        GM_deleteValue('freemium_setting__download_filename_template');

    e.stopPropagation();
    return false;
}

function isSettingChecked(sid) {
    return GM_getValue('freemium_setting__' + sid, false);
}

function initSettingControl($input) {
    var cid = $input.attr('id');

    if (GM_getValue(cid, false)) {
        $('#' + cid).attr('checked', 'checked');
    }
    $('#' + cid).click(settingOptionChanged);
}

function settingOptionChanged(e) {
    e.stopPropagation();
    var cid = $(this).attr('id');

    if ($(this).attr('checked') == 'checked') {
        GM_setValue(cid, true);

        if (cid == 'freemium_setting__window_track_title')
            updateBrowserTitleWithTrackInfo(getNowPlayingTrackInfo());
        else if (cid == 'freemium_setting__auto_continue')
            extendPlayTime();
        else if (cid == 'freemium_setting__auto_skip_video_ads')
            autoSkipVideoAds();
    }
    else {
        GM_deleteValue(cid);

        if (cid == 'freemium_setting__window_track_title')
            document.title = 'Pandora';
    }

    if (cid == 'freemium_setting__hide_ads_panel')
        toggleAdvertisementsPanel();
    else if (cid == 'freemium_setting__lyrics_panel') {
        toggleAllowingTrackInfoToBeCopiedToClipboard();
        allowLyricsToBeCopiedToClipboard();
    }
    else if (cid == 'freemium_setting__keyboard_shortcuts')
        toggleKeyboardShortcuts();

    addBodyClasses();
}

function initSearchEngineSettingsControls() {
    var idtxt, alttxt, disabled;
    for (var i = 0, max = searches.length; i < max; ++i)
    {
        searches[i].id = stringToID(searches[i].alt);
        idtxt = searches[i].id;
        alttxt = searches[i].alt;

        disabled = isEngineDisabled(idtxt);

        $('#freemium_enabler').append('<label><input type="checkbox" id="' + idtxt + '_en" value="' + idtxt + '"' + (disabled ? '' : ' checked="checked"') + ' />' + alttxt + ' <a href="#edit">edit</a></label>');
    }
    $('#freemium_enabler INPUT').click(searchEngineEnablerChanged);
    $('#freemium_enabler A').click(searchEngineEditClicked);
}

function insertSearchEngineLinks() {
    $('#trackInfo .info').append('<div id="dllinks" />');
    for (var i = 0; i < searches.length; ++i)
        addLink(searches[i]);
    addDownloadLink();
}

function addLink(search) {
    var $img = $('<img class="dllink" />');
    $img.attr('id', search.id + '_img');
    $img.attr('alt', search.alt);
    $img.attr('title', 'Search on ' + search.alt);
    $img.attr('src', search.imgsrc);
    if (isEngineDisabled(search.id))
        $img.css('display', 'none');
    $img.click(function() {
        var srch = getSearchEngineInfoById($(this).attr('id').replace('_img', ''));
        var srchUrl = makeUrl(search, getNowViewingTrackInfo());
        if (srch.samewindow)
            unsafeWindow.open(srchUrl);
        else
            unsafeWindow.open(srchUrl, '_blank');
    });
    $('#dllinks').append($img);
}

function addDownloadLink() {
    $('#trackInfoButtons .buttons').append(
        $('<a href="#" id="freemium_download_button" class="button btn_bg" style="padding: 5px 7px 6px 6px; width: 50px;"><div class="text" style="font-size: 11px; padding-top: 2px;">Download</div></a>')
          .click(downloadCurrentTrack)
          .mouseover(function () {
              try {
                    var trackInfo = getNowViewingTrackInfo(),
                        trackUrl = tracks[trackInfo.keySafeName].src.replace(/(.+)access.+\?(.+)/g, '$1access/' + fixedEncodeURIComponent(trackInfo.filename()) + '?$2');
              }
              catch (err) {
                    var trackUrl = '#';
              }
              $(this).attr('href', trackUrl);
          })
    );
}

function makeUrl(search, parameters, url) {
    if (!url)
        url = getSearchTemplate(search);
    for (p in parameters) {
        if (typeof parameters[p] === 'string')
            url = url.replace('%' + p + '%', fixedEncodeURIComponent(parameters[p]));
    }
    url = url.replace('%artist%+', '');
    url = url.replace('%song%+', '');
    url = url.replace('+%album%', '');
    return url;
}

function getSearchTemplate(search) {
    var searchString = $.trim(GM_getValue('ss_' + stringToID(search.alt), ''));
    return if2(searchString, if2(search.artistSongTemplate, if2(search.artistAlbumTemplate, if2(search.albumTemplate, if2(search.artistTemplate, search.template)))));
}

function if2(e1, e2) {
    return e1 ? e1 : e2;
}

function downloadNowPlayingTrack() {
    var ti = getNowPlayingTrackInfo();
    if (tracks[ti.keySafeName])
        initiateTrackDownload(ti);
}

function downloadCurrentTrack() {
    var ti = getNowViewingTrackInfo();
    if (tracks[ti.keySafeName]) // track was already registered when it began playing
        initiateTrackDownload(ti);
    else { // track wasn't properly registered when it began playing. Let's try to find the URL now
        var npti = getNowPlayingTrackInfo();
        if (ti.song == npti.song && ti.artist == npti.artist && ti.album == npti.album) {
            var npRemainingTime = runtimeToSeconds($('.progress .remainingTime').text());
            // It can take a few seconds for the player to get the song duration and we need it to determine the current track from the jPlayer media.  So, we'll keep scanning for the track time to load.
            if (!npRemainingTime) {
                alert('Please wait for the remaining track time to be determined and then try again.');
                return;
            }
            var jp = unsafeWindow.$.jPlayer,
                npLen = runtimeToSeconds($('.progress .elapsedTime').text()) + npRemainingTime,
                thisSongDiff,
                lastSongDiff = 100000,
                srcStr;
            $.each(jp.prototype.instances, function(i, el) {
                if (el.data('jPlayer').status.srcSet)
                {
                    thisSongDiff = Math.abs(npLen - el.data('jPlayer').status.duration);
                    if (thisSongDiff < lastSongDiff)
                        srcStr = el.data('jPlayer').status.src;
                    lastSongDiff = thisSongDiff;
                }
            });
            if (srcStr) {
                tracks[ti.keySafeName] = { src: srcStr, artSrc: getNowPlayingArtSrc(ti.keySafeName) };
                initiateTrackDownload(ti);
            }
            else
                alert('Unable to locate URL of current track. Allow track to play for a few seconds and try again.');
        }
        else
            alert('Unable to download this track. The URL wasn\'t registered. Try letting tracks play a little longer before skipping ahead. If this keeps happening, please report the problem.');
    }
    return false;
}

function initiateTrackDownload(trackInfo) {
    markTrackAsDownloadedInDigest(trackInfo);

    var trackUrl = tracks[trackInfo.keySafeName].src.replace(/(.+)access.+\?(.+)/g, '$1access/' + fixedEncodeURIComponent(trackInfo.filename()) + '?$2'),
        artSrc = tracks[trackInfo.keySafeName].artSrc;

    // download by opening a new window if the download attribute is not supported or if the user chose simple downloads in settings
    if (typeof document.createElement('a').download == 'undefined' || isSettingChecked('download_via_open')) {
        unsafeWindow.open(trackUrl, '_blank');
        if (artSrc && GM_getValue('freemium_setting__download_art', false))
            unsafeWindow.open(artSrc + '?filename=' + fixedEncodeURIComponent(trackInfo.artFilename), '_blank');
    }
    // download using the download attribute of an anchor
    else {
        download(trackUrl, trackInfo.filename(), isPandoraOne() ? 'audio/mpeg' : 'audio/mp4a-latm');
        if (artSrc && GM_getValue('freemium_setting__download_art', false))
            download(artSrc, trackInfo.artFilename, 'image/png');
    }
}

// download using the download attribute of an anchor
function download(src, filename, mime) {
    // Firefox does not honor download attribute if content is not from same origin. So we have to create a local blob.
    if ($.browser.mozilla) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: src,
            onload: function (respDetails) {
                var binResp = customBase64Encode(respDetails.responseText);
                clickTempLink('data:' + mime + ';base64,' + binResp, filename);
            },
            overrideMimeType: 'text/plain; charset=x-user-defined'
        });
    }
    else
        clickTempLink(src, filename);
}

function clickTempLink(src, filename) {
    var firstChild = document.querySelector('BODY *'),
        tag = document.createElement('A');
    tag.href = src;
    tag.download = filename;
    tag.target = '_blank';
    firstChild.parentNode.insertBefore(tag, firstChild);
    tag.click();
    firstChild.parentNode.removeChild(tag);
}

var tracks = {};
function registerCurrentTrack(ti) {
    var foundTrackInfo = false;
    $.each(unsafeWindow.$.jPlayer.prototype.instances, function(i, el) {
        if (el.data('jPlayer').status.srcSet && !trackExists(el.data('jPlayer').status.src)) {
            tracks[ti.keySafeName] = { src: el.data('jPlayer').status.src, artSrc: getNowPlayingArtSrc(ti.keySafeName) };
            foundTrackInfo = true;
            return false; // breaks $.each() loop
        }
    });
    return foundTrackInfo;
}

function trackExists(src) {
    for (key in tracks) {
        if (tracks[key].src == src)
            return true;
    }
    return false;
}

function keySafeTrackFilename(ti) {
    var safeStr = (ti.song + ti.artist).toLowerCase();
    return '_' + safeStr.replace(/[^A-Za-z0-9]/g, '');
}

function addTrackToDigest(ti, station) {
    tracksPlayedDigest.push({ station: station, trackInfo: ti, downloaded: false });
}

function markTrackAsDownloadedInDigest(ti) {
    for (var i = tracksPlayedDigest.length - 1; i > -1; i--) {
        var thisTi = tracksPlayedDigest[i].trackInfo;
        if (ti.keySafeName == thisTi.keySafeName) {
            tracksPlayedDigest[i].downloaded = true;
            break;
        }
    }
}

function outputDigest() {
    if (tracksPlayedDigest.length) {
        var outStr = 'Station,Album,Artist,Title,Downloaded\r\n';
        for (var i = 0, max = tracksPlayedDigest.length; i < max; i++) {
            var entry = tracksPlayedDigest[i],
                entryTi = entry.trackInfo;
            outStr += entry.station + ','
                    + entryTi.album + ','
                    + entryTi.artist + ','
                    + entryTi.song + ','
                    + (entry.downloaded ? 'yes' : 'no') + '\r\n';
        }
        clickTempLink('data:text/octet-stream;base64,' + customBase64Encode(outStr), 'pf-digest_' + getFilenameSafeTimestamp(new Date()) + '.csv');
    }
}

function getFilenameSafeTimestamp(dt) {
    return dt.getFullYear() + (dt.getMonth() + 1).pad() + dt.getDate().pad() + '-' + dt.getHours().pad() + dt.getMinutes().pad() + dt.getSeconds().pad();
}

function pad(padLength, padChar) {
    var str = '' + this;

    if (typeof padLength == 'undefined' || padLength == null || padLength == '')
        padLength = 2;
    if (typeof padChar == 'undefined' || padChar == null || padChar == '')
        padChar = '0';

    while (str.length < padLength)
        str = padChar + str;

    return str;
};
Number.prototype.pad = pad;
String.prototype.pad = pad;

function isPandoraOne() {
    return $('DIV.logosubscriber:visible').length;
}

function runtimeToSeconds(runtime) {
    try {
        runtime = $.trim(runtime.replace('-', ''));
        var timeParts = runtime.split(':');
        return (safeParseInt(timeParts[0]) * 60) + safeParseInt(timeParts[1]);
    }
    catch (err) {
        return 0;
    }
}

function safeParseInt(str) {
    var val = parseInt(str);
    return (isNaN(val) ? 0 : val);
}

function getNowViewingTrackInfo() {
    return constructTrackInfo('#trackInfo', 'A.songTitle', 'A.artistSummary', 'A.albumTitle');
}

function getNowPlayingTrackInfo() {
    return constructTrackInfo('#playerBar', 'A.playerBarSong', 'A.playerBarArtist', 'A.playerBarAlbum');
}

function constructTrackInfo(selTrackInfo, selSong, selArtist, selAlbum, artSrc) {
    var $trackInfo = $(selTrackInfo + ':first'),
        trackInfo = new Object();
    trackInfo.song = $.trim($trackInfo.find(selSong + ':first').text());
    trackInfo.artist = $.trim($trackInfo.find(selArtist + ':first').text());
    trackInfo.album = $.trim($trackInfo.find(selAlbum + ':first').text());
    trackInfo.keySafeName = keySafeTrackFilename(trackInfo);
    // TODO: use el.data('jPlayer').status.formatType for filename instead (test with free Pandora first ... m4a)
    trackInfo.filename = function () {
        return constructFilename(trackInfo) + (isPandoraOne() ? '.mp3' : '.m4a');
    };
    trackInfo.artFilename = (trackInfo.artist + ' - ' + trackInfo.album).replace('/', '') + '.jpg';
    return trackInfo;
}

function constructFilename(trackInfo) {
    return getFilenameTemplate()
                .replace(/%artist%/g, trackInfo.artist)
                .replace(/%song%/g, trackInfo.song)
                .replace(/%album%/g, trackInfo.album)
                .replace('/', '');
}

function getFilenameTemplate() {
    return GM_getValue('freemium_setting__download_filename_template', '%artist% - %album% - %song%');
}


// Reliably getting the album art has turned out to be tricky. When a track first starts playing, the text
// describing the track gets updated, but there is sometimes a delay before the image source is updated.
// This results in the album art for the previous track being associated with the current track. To solve the
// problem, I'm going to wait until the album art changes by comparing the current source with the last one.
// It's not airtight, but hopefully it will work most of the time.
var lastArtSrc = null; // seed the last art source value so there's a difference when the first art appears
function getNowPlayingArtSrc(keySafeName, callCount) {
    // since we're going to keep running this routine to check for the source change, we need to know how
    // many times we've checked. If this is the first time running, then we can let the caller register
    // the art source. We'll also use the count to limit how long we'll look for the album art, in case of
    // failure.
    callCount || (callCount = 0);

    // fetch the art album source
    var src = null,
        $img = $('IMG.playerBarArt:first');
    if ($img.length) {
        src = $.trim($img.attr('src'));
        if (src.indexOf('no_album_art') != -1)
            src = null;
    }

    if (src != lastArtSrc) { // detect new album art shown
        lastArtSrc = src;
        if (callCount > 0) // for increased reliability, we'll only update the tracks register if getNowPlayingArtSrc() called itself
            tracks[keySafeName].artSrc = src;
    }
    else {
        if (callCount == 0) // if the old art source is still showing, we want to return null to the initial caller
            src = null;
        if (callCount < 33) // stop checking after 5 seconds, assume failure
            setTimeout(function () { getNowPlayingArtSrc(keySafeName, ++callCount); }, 150); // wait a little while and then check again for the updated art source
    }

    return src; // the return value is only useful for the initial caller (example: registerCurrentTrack()) to initialize artSrc to null or, if art source is already updated, the actual src
}

function getNowPlayingStation() {
    return $.trim($('.stationChangeSelector DIV.textWithArrow P').first().attr('title'));
}

function nowPlayingTrackIsLiked() {
    return $('#playbackControl .buttons .thumbUpButton.indicator').length > 0;
}

function searchForMusic(parameters) {
    var srch = getSearchEngineInfoById(getAdvancedSearchEngineId());

    var url;
    var srchParams = new Object();
    var ti = getNowViewingTrackInfo();
    switch (parameters)
    {
        case 'artist+song+album':
            url = srch.template;
            srchParams.song = ti.song;
            srchParams.artist = ti.artist;
            srchParams.album = ti.album;
            break;
        case 'artist+song':
            url = if2(srch.artistSongTemplate, srch.template);
            srchParams.song = ti.song;
            srchParams.artist = ti.artist;
            break;
        case 'artist+album':
            url = if2(srch.artistAlbumTemplate, srch.template);
            srchParams.artist = ti.artist;
            srchParams.album = ti.album;
            break;
        case 'song':
            url = if2(srch.songTemplate, srch.template);
            srchParams.song = ti.song;
            break;
        case 'album':
            url = if2(srch.albumTemplate, srch.template);
            srchParams.album = ti.album;
            break;
        default:
            url = if2(srch.artistTemplate, srch.template);
            srchParams.artist = ti.artist;
    }
    var srchUrl = makeUrl(srch, srchParams, url);

    if (srch.samewindow)
        unsafeWindow.open(srchUrl);
    else
        unsafeWindow.open(srchUrl, '_blank');

    return false;
}

function stringToID(unsafeString) {
    return '_id_' + unsafeString.replace(/ |\.|-|_/g, '');
}

function getSearchEngineById(id) {
    for (var i = 0, max = searches.length; i < max; ++i)
    {
        var thisId = stringToID(searches[i].alt);
        if (thisId == id)
            return searches[i];
    }
}

function toggleKeyboardShortcuts() {
    if (isSettingChecked('keyboard_shortcuts'))
        $(document).bind('keydown.pf', pfKeydown);
    else
        $(document).unbind('keydown.pf');
}

function pfKeydown(evt) {
    var $target = $(evt.target);
    var kc = evt.keyCode;

    // console.log('pf: ' + kc);

    if ($('INPUT:focus, SELECT:focus, TEXTAREA:focus').length) // disable hotkeys if focused on a form control
        return;


    if (kc == 80) { // P: Pause/Play
        evt.preventDefault();
        pausePlay();
    }
    else if (kc == 38) { // Up Arrow: Like
        evt.preventDefault();
        likeCurrentTrack();
    }
    else if (kc == 40) { // Down Arrow: Dislike
        evt.preventDefault();
        dislikeCurrentTrack();
    }
    else if (kc == 68) { // D: Download
        evt.preventDefault();
        if (evt.shiftKey)
            likeCurrentTrack();
        $('#freemium_download_button').css('box-shadow', '0 0 4px #FC0');
        downloadNowPlayingTrack();
        setTimeout(function () { $('#freemium_download_button').css('box-shadow', 'none') }, 3500);
    }
    else if (kc == 83) { // S: Search
        evt.preventDefault();
        $('DIV.searchBox INPUT.searchInput')[0].click();
    }
    else if (kc == 84) { // T: Tired of track
        evt.preventDefault();
        tiredOfCurrentTrack();
    }
    else if (kc == 78) { // N: Next station
        evt.preventDefault();
        playNextStation();
    }
    else if (kc == 76) { // L: List digest of tracks played
        evt.preventDefault();
        outputDigest();
    }
}

function playNextStation() {
    var $stations = $('#stationList .stationListItem');
    if ($stations.length > 2) { // check to make sure there are more than 2 station items (shuffle is a station item and one station ... need one more in order to have something to switch to)
        var $currentStation = $stations.filter('.selected');
        if ($currentStation.is(':last-child')) // determine if selected station is last station
            $stations.first().next().click(); // if last station, select first station (second station item)
        else
            $currentStation.next().click(); // if not last station, select next station
    }
}

function pausePlay() {
    $('DIV.playButton:visible A, DIV.pauseButton:visible A')[0].click();
}

function likeCurrentTrack() {
    $('DIV.thumbUpButton:visible A')[0].click();
}
function dislikeCurrentTrack() {
    $('DIV.thumbDownButton:visible A')[0].click();
}

function tiredOfCurrentTrack() {
    $('#track_menu_dd').show();
    $('#track_menu_dd').css('visibility', 'visible');
    $('A.tiredOfSong')[0].click();
    $('#track_menu_dd').hide();
    $('#track_menu_dd').css('visibility', 'hidden');
}

// http://emilsblog.lerch.org/2009/07/javascript-hacks-using-xhr-to-load.html
function customBase64Encode(inputStr) {
    var bbLen = 3,
        enCharLen = 4,
        inpLen = inputStr.length,
        inx = 0,
        jnx,
        keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
            + '0123456789+/=',
        output = '',
        paddingBytes = 0,
        bytebuffer = new Array(bbLen),
        encodedCharIndexes = new Array(enCharLen);

    while (inx < inpLen) {
        for (jnx = 0; jnx < bbLen; ++jnx) {
            // Throw away high-order byte, as documented at:
            // https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
            if (inx < inpLen)
                bytebuffer[jnx] = inputStr.charCodeAt(inx++) & 0xff;
            else
                bytebuffer[jnx] = 0;
        }

        /*--- Get each encoded character, 6 bits at a time.
            index 0: first 6 bits
            index 1: second 6 bits
                (2 least significant bits from inputStr byte 1
                + 4 most significant bits from byte 2)
            index 2: third 6 bits
                (4 least significant bits from inputStr byte 2
                + 2 most significant bits from byte 3)
            index 3: forth 6 bits (6 least significant bits from inputStr byte 3)
        */
        encodedCharIndexes[0] = bytebuffer[0] >> 2;
        encodedCharIndexes[1] = ((bytebuffer[0] & 0x3) << 4) | (bytebuffer[1] >> 4);
        encodedCharIndexes[2] = ((bytebuffer[1] & 0x0f) << 2) | (bytebuffer[2] >> 6);
        encodedCharIndexes[3] = bytebuffer[2] & 0x3f;

        //--- Determine whether padding happened, and adjust accordingly.
        paddingBytes = inx - (inpLen - 1);
        switch (paddingBytes) {
            case 1:
                // Set last character to padding char
                encodedCharIndexes[3] = 64;
                break;
            case 2:
                // Set last 2 characters to padding char
                encodedCharIndexes[3] = 64;
                encodedCharIndexes[2] = 64;
                break;
            default:
                // No padding - proceed
                break;
        }

        // Now grab each appropriate character out of our keystring,
        // based on our index array and append it to the output string.
        for (jnx = 0; jnx < enCharLen; ++jnx)
            output += keyStr.charAt(encodedCharIndexes[jnx]);
    }

    return output;
}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str.replace(/\//g, '-')).replace(/[!'().*~]/g, encodeURIChar);
}

function encodeURIChar(str) {
    return '%' + str.charCodeAt(0).toString(16).toUpperCase();
}
