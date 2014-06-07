// ==UserScript==
// @name           Wowhead - Armory Import
// @namespace      http://userscripts.org/users/88914
// @description    Highlights items in Wowhead item lists based on multicharacter armory imports
// @include        http://*.wowarmory.com/character-sheet.xml*
// @include        http://*.wowhead.com/*
// ==/UserScript==

var colors = ["#52415F", "#3B434F", "#47454F"];

/// <summary>
/// Inject the JQuery Library into the current page so it can be used.
/// Once it is loaded run the callback so the rest of the script is run
/// </summary>
/// <param name="callback">function to call after JQuery has been loaded</param>
JQuery = function(callback) {
    // Check if jQuery's loaded
    var wait = function() {        
        if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(function() { wait(); }, 100); }
        else {
            jquery = unsafeWindow.jQuery; 
            callback();
        }
    };

    if (typeof unsafeWindow.jQuery == 'undefined') {
        var script = document.createElement('script');
        script.src = 'http://code.jquery.com/jquery-latest.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    wait();
}

Color = {
    /// <summary>
    /// Take a Hex color and multiply it by a number
    /// </summary>
    Shade: function(a, b) {
        var v = Color.RGB(a);
        for (var i = 0; i < 3; i++) {
            v[i] = Math.round(v[i] * b)
            if (v[i] > 255) v[i] = 255
            if (v[i] < 0) v[i] = 0
        }
        return Color.Hex(v);
    },

    /// <summary>
    /// Convert Hex to RGB
    /// </summary>
    RGB: function(a) {
        var o = a.toLowerCase();
        if (o.charAt(0) == '#')
            o = o.substring(1);

        return [parseInt(o.slice(0, 2), 16), parseInt(o.slice(2, 4), 16), parseInt(o.slice(4), 16)]
    },

    /// <summary>
    /// Convert RGB to Hex
    /// </summary>
    Hex: function(a) { return "#" + Color._hex(a[0]) + Color._hex(a[1]) + Color._hex(a[2]) },
    _hex: function(a) { return ('0' + a.toString(16)).slice(-2) }
}



Network = {
    Request: function(url, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(response) {
                var contents = '';
                if (response.status == 200) {
                    contents = response.responseText;
                    GM_setValue(url, contents);
                } else {
                    contents = GM_getValue(url);
                }
                callback(contents);
            }
        });
    }
};

Settings = {
    ToggleCharacter: function(url) {
        window.setTimeout(
            function() {
                var characters = GM_getValue("characters", "");
                url = ',' + url;
                if (characters.indexOf(url) >= 0) {
                    characters = characters.replace(url, "");
                    alert('Removed from Wowhead Character Import');
                } else {
                    characters = characters + url;
                    alert('Added to Wowhead Character Import');
                }
                GM_setValue("characters", characters);
            }
        , 0);
    }
}

/// <summary>
/// Function Library for the Wowhead
/// </summary>
Wowhead = {
    Init: function(armory) {
        if (!/wowhead.com$/.test(window.location.host))
            return;

        var characterLoaded = function(character) {
            Wowhead.OnUpdate(function() {
                var items = [];
                for (var i = 0; i < character.items.length; i++) {
                    items[items.length] = { id: character.items[i], color: character.color, title: character.name };
                }

                jquery.each(items, function(i, item) {
                    Wowhead.ItemList.HighlightItem(item);
                });
            });
        };

        armory.LoadCharacters(characterLoaded);
    },

    /// <summary> 
    /// Raise an alert when a link is clicked
    /// </summary>
    OnUpdate: function(callback) {
        jquery("a").click(function() { callback(); });
        callback();
    },


    ItemList: {
        /// <summary> 
        /// Highlight the table row of any item passed in
        /// </summary>
        HighlightItem: function(item) {
            var itemLink = jquery("a[href='/item=" + item.id + "']");
            var row = itemLink.parents('tr');

            if (row.parents().hasClass('grid') || row.parents().hasClass('icontab')) {
                itemLink.parents('th').css("background", item.color);
                itemLink.parents('td').css("background", item.color);
            } else if (!row.parents().hasClass('tooltip')) {
                row.css("background", item.color);
            }

            //Add player names as tooltips for the rows
            if (!row.attr("title") || row.attr("title").indexOf(item.title) == -1)
                row.attr("title", row.attr("title") + " " + item.title);

            var icon = itemLink.parents("div.iconsmall")
            icon.css("border", "solid 1px " + Color.Shade(item.color, 1.5));

            var iconcontainer = icon.parent();
            iconcontainer.width(iconcontainer.width() + 2);
        }
    }
};


/// <summary>
/// Function Library for the WoWArmory
/// </summary>
WoWArmory = {
    Init: function() {
        var href = window.location;
        if (!/wowarmory.com$/.test(href.host) || !/character-sheet.xml$/.test(href.pathname))
            return;

        var bookmark = jquery('<a href="#"></a>');
        bookmark.click(function() { Settings.ToggleCharacter(window.location); return false; });
        bookmark.html('<span>+</span>');
        jquery('.subTabs').append(bookmark);
    },

    /// <summary> 
    /// Load all defined characters
    /// <s/ummary>
    LoadCharacters: function(characterLoaded) {
        var characters = GM_getValue("characters", "").split(",");
        for (var character = 0; character < characters.length; character++) {
            if(characters[character]) {
                WoWArmory.Character(characters[character], characterLoaded);
            }
        }
    },
    
    LoadedCharacters: 0,

    Character: function(characterUrl, callback) {
        var createCharacter = function(xml) {            
            var ret = [];
            jquery(xml).find('item').each(function() { ret.push(jquery(this).attr('id')); });

            var t = {
                color: colors[WoWArmory.LoadedCharacters++],
                //class: jquery(xml).find('character').attr('class'),
                name: jquery(xml).find('character').attr('name'),
                items: ret
            };

            return t;
        }

        Network.Request(characterUrl, function(response) { callback(createCharacter(response)); });
    }

};


/// <summary> 
/// This is the actual script that does the work
/// </summary>
Script = function(armory, website) {
    var _items = [];
    var _armory = armory;
    var _website = website;
    self = this;

    this.Init = function() {
        _armory.Init();
        _website.Init(armory);        
    }

    JQuery(self.Init);
} (WoWArmory, Wowhead);

