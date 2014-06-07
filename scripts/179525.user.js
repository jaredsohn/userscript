// ==UserScript==
// @name            Disable Twitch Emotes
// @version         0.2
// @author          wayedt
// @namespace       http://wayedt.com
// @description     Prevents emotes from being displayed in Twitch.tv chat
// @include         http://www.twitch.tv/*
// @grant           none
// ==/UserScript==


var code = '(' + (function ()
{
    function filter_emotes()
    {
        var ALLOWED_EMOTES = {
            'SMSkull': true,
            'KZskull': true,
        };

        var allowed_ids = {};
        var emotes = window.App.__container__.lookup('controller:emoticons').emoticons;

        _.each(emotes, function(emote)
        {
            if(ALLOWED_EMOTES[emote.regex])
                _.each(emote.images, function(image)
                {
                    allowed_ids[image.id] = true;
                });
        });

        emote_sets = window.App.__container__.lookup('controller:emoticons').emoticonSets;

        _.each(emote_sets, function(set, index)
        {
            emote_sets[index] = _.filter(set, function(emote)
            {
                return allowed_ids[emote.cls.slice(4)];
            });
        });

        var desc = this[Ember.META_KEY].descs['tokenizedMessage'];
        desc.func = desc.original_func;
        return desc.func.call(this);
    }

    var lc = window.App.__container__.lookup('controller:line');
    var desc = lc[Ember.META_KEY].descs['tokenizedMessage'];
    desc.original_func = desc.func;
    desc.func = filter_emotes;

}).toString() + ')();';


var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.textContent = code;
document.body.appendChild(script);
