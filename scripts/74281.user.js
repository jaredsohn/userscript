// ==UserScript==
// @name           E-Hentai Highlighter
// @namespace      http://userscripts.org/users/106844
// @description    Highlighter for E-Hentai (e-hentai.org/exhentai.org). Supports regular expressions.
// @include        http://g.e-hentai.org/*
// @include        http://exhentai.org/*
// @version        0.5.2
// ==/UserScript==

// -------------------- DEFAULTS -------------------

var defaults = {
    defaultColor       : '#ec7e7e' ,
    exColor            : '#ed6464' ,
    highlighterEnabled : false     ,
    filterEnabled      : false     ,
    opacityEnabled     : false     ,
    opacity            : 0.1       ,
    showTags           : true      ,
    highlightTags      : true
};

// -------------------- /DEFAULTS -------------------

var EHH = {
    
    init: function() {

        EHH.augmentJS();

        // settings

        EHH.settings = { };
        for (var key in defaults)
            EHH.settings[key] = localStorage.hasOwnProperty(key) ? JSON.parse(localStorage[key]) : defaults[key];

        EHH.dontWalk     = false;
        EHH.onPanda      = document.URL.indexOf('e-hentai') == -1;
        EHH.defaultColor = EHH.settings[EHH.onPanda ? 'exColor' : 'defaultColor'];
        EHH.thumbnails   = document.querySelector('.itg .id1') !== null;
        EHH.gallery      = document.querySelector('#taglist')  !== null;

        // User data
    
        EHH.keywords = JSON.parse(localStorage.getItem('keywords') || '[]');
        EHH.filters  = JSON.parse(localStorage.getItem('filters')  || '[]');
            
        // Permanent style
        
        var style = document.createElement('style');
        style.innerHTML =
            // popup (general)
            '#e-HentaiPopup {' +
                'position: fixed; top: 0; right: 0; padding: 3px;' +
                'border: 1px black solid; background: #686868; z-index: 10;' +
            '}' +
            '#e-HentaiPopup:not(:hover) *:not(:first-child) { display: none; }' +
            '#e-HentaiPopup * {' +
                'font-family: Verdana, Tahoma, Georgia, Dejavu, "Times New Roman", Serif;' +
                'font-size: 10px;' +
            '} #e-HentaiPopup *:not(textarea) { color: white; }' +
            '#e-Header { text-align: center; position: relative; }' +
            '[mode="default"] [mode="settings"], [mode="settings"] [mode="default"] { display: none; }' +
            '#e-ToggleMode {' +
                'cursor: pointer; color: lightblue !important; font-weight: bold;' +
                'position: absolute; right: 5px; border-bottom: 1px dotted;' +
            '}' +
            '#e-ToggleMode:hover { color: lightcyan !important; }' +
            '#e-HentaiPopup div[mode] { width: 350px; text-align: left; }' +
            // popup (default view)
            '#e-HentaiPopup td:nth-child(2) { text-align: right; }' +
            '#e-HentaiPopup td:nth-child(2) a, #e-HentaiPopup tr:last-child a {' +
                'cursor: pointer; font-weight: bold; border-bottom: 1px dotted;' +
            '} #e-HentaiPopup .e-Disable { color: #94de80; }' +
            '#e-HentaiPopup .e-Disable:hover { color: #b9ffa6; }' +
            '#e-HentaiPopup .e-Enable { color: #d98080; }' +
            '#e-HentaiPopup .e-Enable:hover { color: #f1bebe; }' +
            '#e-HentaiPopup tr:last-child a:hover { color: black; }' +
            '#e-HentaiPopup td > span { margin-right: 5px; float: right; }' +
            '#e-HentaiPopup table { width: 100%; }' +
            '#e-HentaiPopup textarea { width: 100%; height: 200px; box-sizing: border-box; -moz-box-sizing: border-box; }' +
            // popup (settings view)
            '#e-HentaiPopup label { display: block; padding: 2px; }' +
            '#e-HentaiPopup input[type="checkbox"] { margin: 0 5px 0 0; float: left; }' +
            '[name="slider"]:not([visible="true"]), [name="slider"]:not([visible="true"]) + span { display: none; }' +
            '[name="slider"] { margin-left: 20px; width: 250px; }' +
            '[name="slider"] + span { position: relative; bottom: 7px; }' +
            '#e-HentaiPopup [mode="settings"] { padding: 10px; box-sizing: border-box; -moz-box-sizing: border-box; }' +
            '#e-Buttons { text-align: center; padding-top: 20px; }' +
            '.e-Button {' +
                'min-width: 100px; height: 25px; line-height: 25px; text-align: center; color: white;' +
                'background: black; display: inline-block; cursor: pointer; margin-right: 10px;' +
            '}' +
            '.e-Button:hover { text-decoration: underline; }' +
            '.e-Button + input { display: none; }' +
            '#e-PickerLabel { margin-top: 10px; }' +
            '#e-ColorPicker + div { width: 30px; height: 18px; display: inline-block; margin-left: 10px; vertical-align: top; }' +
            // highlight/filter style
            '.e-Highlighted b { font-weight: inherit; }' +
            '.e-Highlighted, .e-Highlighted a, [id^="ta_"][style*="background"] { color: black !important; }' +
            '.e-Highlighted b { font-weight: bold !important; font-size: 115%; text-decoration: underline; }' +
            // tag divs
            '.e-Tags { position: absolute; top: 0px; left: 0px; text-align: left; padding: 3px;' + 
                'background: rgba(64,64,255,0.75); color: skyblue; margin-left: 1px;' +
                'text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;' +
                'font-weight: bold; font-family: "Segoe UI"; font-size: 12px; line-height: 11px;' +
            '}';
        document.head.appendChild(style);

        // Mutable style
            
        EHH.opaqueFilterCSS = document.createElement('style');
        EHH.opaqueFilterCSS.id = 'e-OpaqueFilter';
        EHH.opaqueFilterCSSMask = '{0}#toppane ~ .c, .e-Filtered { display: none !important; }\n' +
            '{0}tr.color1 { background: ' + (EHH.onPanda ? '#363940' : '#F2F0E4') + '; }\n' +
            '{0}tr.color0 { background: ' + (EHH.onPanda ? '#4F535B' : '#EDEBDF') + '; }\n' +
            '{1}#toppane ~ .c, .e-Filtered { opacity: {opacity} !important;}\n' +
            '{1}.e-Filtered:hover { opacity: 1 !important; -webkit-transition: opacity .1s linear;' +
                '-moz-transition: opacity .1s linear; -o-transition: opacity .1s linear; }';
        document.head.appendChild(EHH.opaqueFilterCSS);

        // Popup

        EHH.generatePopup();

        // Events
        
        document.addEventListener('DOMNodeInserted',function(e) {
            if (e.target.nodeName == 'TBODY')
                EHH.walk(e.target);
        },false);

        if (EHH.gallery)
            document.addEventListener('DOMNodeInserted',EHH.updateTagList,false);

        if (!EHH.gallery && !EHH.thumbnails)
            EHH.interceptMouseHover();

        // Data synchronization

        EHH.link('keywords'     , 'keywords' , EHH.updatePopup , EHH.clearRegexes  , EHH.walk);
        EHH.link('filters'      , 'filters'  , EHH.updatePopup , EHH.clearRegexes  , EHH.walk);
        EHH.link('defaultColor' , null       , EHH.updatePopup , EHH.walk);

        EHH.settings.link('defaultColor'       , 'defaultColor');
        EHH.settings.link('exColor'            , 'exColor'     );
        EHH.settings.link('filterEnabled'      , 'filterEnabled'      , EHH.updatePopup , EHH.toggleOpacity , EHH.walk);
        EHH.settings.link('highlighterEnabled' , 'highlighterEnabled' , EHH.updatePopup , EHH.walk);
        EHH.settings.link('opacityEnabled'     , 'opacityEnabled'     , EHH.updatePopup , EHH.toggleOpacity , EHH.resize);
        EHH.settings.link('opacity'            , 'opacity'            , EHH.updatePopup , EHH.toggleOpacity , EHH.resize);
        EHH.settings.link('showTags'           , 'showTags'           , EHH.toggleTagDivs);
        EHH.settings.link('highlightTags'      , 'highlightTags'      , EHH.highlightTags);
        
        // Start
        
        EHH.toggleOpacity();
        EHH.walk();

    },
    
    augmentJS: function() {

        Object.getOwnPropertyNames(Array.prototype).forEach(function(x) {
            NodeList.prototype[x] = Array.prototype[x];
        });

        var linkedObjects = { };
        Object.defineProperty(Object.prototype,'link', {
            enumerable   : false,
            configurable : false,
            writable     : false,
            value        : function(localProperty,storedProperty,onChangeCallbacks) {
                var currentValue = this[localProperty], args = arguments;
                var get = function() { return currentValue; };
                var set = function(value)  {
                    currentValue = value;
                    if (storedProperty) localStorage.setItem(storedProperty,JSON.stringify(currentValue));
                    for (var i=2;i<args.length;++i) {
                        if (args[i])
                            args[i](currentValue);
                    }
                };
                delete this[localProperty];
                var descriptor = { get: get, set: set, enumerable: true, configurable: true };
                Object.defineProperty(this,localProperty,descriptor);
                linkedObjects[storedProperty] = { object: this, key: localProperty };
            }
        });

        window.addEventListener('storage',function(e) {
            if (!linkedObjects.hasOwnProperty(e.key)) return;
            var target = linkedObjects[e.key];
            target.object[target.key] = JSON.parse(e.newValue);
        },false);

        HTMLElement.prototype.onClick = function(f) {
            this.addEventListener('click',function(e) {
                if (e.which != 1) return;
                if (f) f.call(this);
            },false);
        };

        HTMLInputElement.prototype.linkCheckbox = function(object,property) {
            if (object && object.hasOwnProperty(property)) this.checked = object[property];
            this.onClick(function() { object[property] = this.checked; });
        };

    },

    generatePopup: function() {
            
        EHH.popup = document.createElement('div');
        EHH.popup.id = 'e-HentaiPopup';
        EHH.popup.setAttribute('mode','default');
        EHH.popup.innerHTML =
            '<div id="e-Header">' +
                '<b>E-H Highlighter</b>' +
                '<a id="e-ToggleMode" target="settings">Show settings</a>' +
            '</div><hr/>' +
            '<div mode="default">' +
                '<table align="right">' +
                    '<tr><td style="text-align:left">Keywords:</td><td><a id="e-HighlighterSwitch">Highlighter: enabled</a></tr>' +
                    '<tr><td colspan="2"><textarea></textarea></td></tr>' +
                    '<tr><td style="text-align:left">Filters:</td><td><a id="e-FilterSwitch">Filter: enabled</a></td></tr>' +
                    '<tr><td colspan="2"><textarea></textarea></td></tr>' +
                    '<tr><td colspan="2"><a id="e-PopupSave">Save changes</a><span><b>Filtered items:</b> <span id="e-FilteredItems"></span></span></td></tr>' +
                '</table>' +
            '</div>' +
            '<div mode="settings">' +
                '<label><input type="checkbox" id="opacitySwitch"> Enable opacity mode for filtered items</label>' +
                '<input type="range" name="slider" min="0" max="100"> <span></span>' +
                '<label><input type="checkbox" id="tagDivSwitch">While doing a search, display any tags matching one or more highlight keywords above the gallery thumbnails</label>' +
                '<label><input type="checkbox" id="highlightTagSwitch">While viewing a gallery, apply highlighting and filters to its tag list</label>' +
                '<label id="e-PickerLabel"><input type="checkbox" style="visibility: hidden">Default highlight color: <input type="color" id="e-ColorPicker"> <div></div></label>' + 
                '<div id="e-Buttons">' +
                    '<div class="e-Button" id="e-Export">Export data</div>' +
                    '<div class="e-Button" id="e-Import">Import data</div><input type="file" accept="application/json">' +
                '</div>' +
            '</div>';
        document.body.appendChild(EHH.popup);
        
        // Popup elements

        EHH.highlighterSwitch = document.getElementById('e-HighlighterSwitch');
        EHH.filterSwitch      = document.getElementById('e-FilterSwitch');

        var textareas         = document.querySelectorAll('#e-HentaiPopup textarea');
        EHH.highlighterArea   = textareas[0];
        EHH.filterArea        = textareas[1];
        
        // Events (default view)

        document.getElementById('e-ToggleMode').onClick(function() {
            EHH.popup.setAttribute('mode',this.getAttribute('target'));
            var showSettings = this.getAttribute('target') == 'settings';
            this.innerHTML = (showSettings ? 'Show keywords' : 'Show settings');
            this.setAttribute('target',showSettings ? 'default' : 'settings');
        });
        
        [EHH.highlighterSwitch,EHH.filterSwitch].forEach(function(x) {
            x.onClick(function() {
                var target = /Highlighter/.test(this.textContent) ? 'highlighterEnabled' : 'filterEnabled';
                var status = /enabled/.test(this.textContent);
                EHH.settings[target] = !status;
            });
        });
        
        document.getElementById('e-PopupSave').onClick(function() {
            EHH.keywords = EHH.highlighterArea.value.split(/[;\n]/).filter(function(x) { return x.length > 0; });
            EHH.filters  = EHH.filterArea.value.split(/[;\n]/).filter(function(x) { return x.length > 0; });
        });

        // Events (settings view)
        
        document.getElementById('opacitySwitch').linkCheckbox(EHH.settings,'opacityEnabled');
        document.getElementById('tagDivSwitch').linkCheckbox(EHH.settings,'showTags');
        document.getElementById('highlightTagSwitch').linkCheckbox(EHH.settings,'highlightTags');

        // Opacity slider

        EHH.slider = EHH.popup.querySelector('[name="slider"]');
        if (EHH.slider.type != 'range') EHH.slider = null; // not supported
        else {
            EHH.slider.value = EHH.settings.opacity * 100;
            EHH.slider.nextElementSibling.innerHTML = (Math.floor(EHH.settings.opacity * 10000) / 100) + '%';
            EHH.slider.addEventListener('change',function(e) {
                e.target.nextElementSibling.innerHTML = e.target.value + '%';
                EHH.settings.opacity = parseInt(e.target.value,10) / 100;
            },false);
        }

        // Color picker

        var picker    = document.getElementById('e-ColorPicker'),
            preview   = picker.nextElementSibling,
            supported = picker.type == 'color';

        picker.value = preview.style.backgroundColor = EHH.defaultColor;
        if (supported) picker.style.cssText = 'padding: 0px; border: 0px; background: none; position: relative; top: 3px';
        else picker.style.cssText = 'width: 60px; color: black';
        preview.style.cssText = (supported ? 'display: none;' : 'background-color: ' + EHH.defaultColor);

        var lastColor = preview.style.backgroundColor;
        picker.addEventListener(supported ? 'change' : 'input',function() {
            preview.style.backgroundColor = picker.value;
            if (preview.style.backgroundColor == lastColor) return;
            lastColor = preview.style.backgroundColor;
            EHH.settings[EHH.onPanda ? 'exColor' : 'defaultColor'] = picker.value;
            EHH.defaultColor = picker.value;
        },false);

        // Import-export functions

        var importButton = document.getElementById('e-Import'), importInput = importButton.nextElementSibling;
        importButton.onClick(function() { importInput.click(); });
        importInput.addEventListener('change',function(e) {
            var reader = new FileReader();
            reader.onerror = function(e) { alert('Couldn\'t read the selected file.'); };
            reader.onload = function(e) {
                try {
                    var data = JSON.parse(this.result);
                    if (!data.keywords || !data.filters || !data.settings) throw null;
                    var confirmation = confirm('This will overwrite your data. Are you sure you want to proceed?');
                    if (confirmation) {
                        EHH.dontWalk = true;
                        EHH.keywords = data.keywords;
                        EHH.filters  = data.filters;
                        for (var key in EHH.settings) EHH.settings[key] = data.settings[key];
                        setTimeout(function() { window.location.reload(); },50);
                    }
                }
                catch (e) { alert('Couldn\'t recognize the selected file.'); }
            };
            reader.readAsText(this.files[0]);
        },false);

        document.getElementById('e-Export').onClick(function() {
            var result = { keywords: EHH.keywords, filters: EHH.filters, settings: EHH.settings };
            var blob = new Blob([JSON.stringify(result,null,2)],{ type: 'application/json' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'EHH.settings.' + (new Date().valueOf()) + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });

        EHH.updatePopup();

    },

    updatePopup: function() {

        var updateSwitch = function(target,enable) {
            target.textContent = target.textContent.replace(/[^\s]+$/,enable ? 'enabled' : 'disabled');
            target.className   = enable ? 'e-Disable' : 'e-Enable';
            var filtered = document.getElementsByClassName('e-Filtered').length;
            document.getElementById('e-FilteredItems').textContent = filtered;
        };

        EHH.highlighterArea.textContent = EHH.keywords.join('\n');
        EHH.filterArea.textContent      = EHH.filters.join('\n');
        updateSwitch(EHH.highlighterSwitch,EHH.settings.highlighterEnabled);
        updateSwitch(EHH.filterSwitch,EHH.settings.filterEnabled);

        document.getElementById('opacitySwitch').checked = EHH.settings.opacityEnabled;

    },

    toggleOpacity: function() {
        // changes the mutable style to enable or disable opacity
        EHH.opaqueFilterCSS.innerHTML = EHH.opaqueFilterCSSMask
                                           .replace(/\{0\}/g,EHH.settings.opacityEnabled ? '//' : '')
                                           .replace(/\{1\}/g,EHH.settings.opacityEnabled ? '' : '//')
                                           .replace(/\{opacity\}/,EHH.settings.opacity);
        if (EHH.slider) EHH.slider.setAttribute('visible',EHH.settings.opacityEnabled);
    },

    toggleTagDivs: function() {
        document.querySelectorAll('.e-Tags').forEach(function(x) {
            x.style.display = EHH.settings.showTags ? null : 'none';
        });
    },

    clearRegexes: function() {
        EHH.parse.regexes = null;
    },
    
    prepareRegexes: function() {
    
        /* returns an object containing two properties:
         *     highlight : an array of keywords; each element is an object with a "type" property ("tag" or "title"),
         *                 a "regex" property and a "color" property (null if no color is specified for that keyword)
         *                 keywords will be checked sequentially; the first matching keyword with a color specified
         *                 will decide the item's color; if no color is found but the item still has to be
         *                 highlighted, EHH.defaultColor will be used instead
         *     filters   : an object with two properties (tag and title), each one a regular expression to
         *                 be applied to the relevant target
         */

        var splitFilter = function(x,target) {
            if (x.length > 0 && x[0] == ':') target.tag.push(x.slice(1));
            else if (x.length > 0) target.title.push(x);
        };

        var highlight = EHH.keywords.map(function(x) {
            var temp = x[0] == ':' ? { keyword : x.slice(1), type : 'tag'   } :
                                     { keyword : x,          type : 'title' };
            var tokens = temp.keyword.match(/^(.+?)(\/[^\/]+)?$/);
            return { regex: new RegExp(tokens[1],'gi'), type: temp.type, color: tokens[2] ? tokens[2].slice(1) : null };
        });

        var filters = { title: [ ], tag: [ ] };
        EHH.filters.forEach(function(x) {
            if (x[0] == ':') filters.tag.push(x.slice(1));
            else filters.title.push(x);
        });

        if (filters.title.length === 0) filters.title.push('EHH: no active title filter');
        if (filters.tag.length === 0) filters.tag.push('EHH: no active tag filter');

        filters.title = new RegExp('(' + filters.title.join('|') + ')','i');
        filters.tag   = new RegExp('(' + filters.tag.join('|') + ')','i');

        return { highlight: highlight, filters: filters };

    },

    parse: function(title,tags) {

        /* title : a string, the title of the gallery item to be parsed
         * tags  : an array of strings, each one a tag contained in a tag flag (can be empty)
         * uses the object built by EHH.prepareRegexes to decide the course of action for each gallery
         * returns an object with a "result" property indicating what has to be done
         * possible values are "highlighted", "filtered" or null for no action
         * filters take precedence over highlight keywords
         * if the gallery item is to be highlighted, the result will also contain three additional properties:
         * - titleKeywords : a list of title substrings that match one or more keywords (can be empty)
         * - tagKeywords   : a list of matching tags (to be passed to EHH.addTagDiv if EHH.settings.showTags is set, can be empty)
         * - color         : the color the gallery needs to be highlighted in (EHH.defaultColor if the user did not specify any color)
         */

        if (!EHH.parse.regexes)
            EHH.parse.regexes = EHH.prepareRegexes();

        var regexes = EHH.parse.regexes;

        if (EHH.settings.filterEnabled) {
            var filtered = regexes.filters.title.test(title) || tags.some(function(x) { return regexes.filters.tag.test(x); });
            if (filtered) return { result: 'filtered' };
        }

        if (EHH.settings.highlighterEnabled) {
            var titleKeywords = { }, tagKeywords = { }, color = null;
            regexes.highlight.forEach(function(data) {
                if (data.type == 'tag') {
                    tags.forEach(function(tag) {
                        if (tagKeywords.hasOwnProperty(tag) || !tag.match(data.regex)) return;
                        tagKeywords[tag] = true;
                        if (!color) color = data.color;
                    });
                } 
                else {
                    var tokens = title.match(data.regex);
                    if (!tokens) return;
                    tokens = tokens.length == 1 ? tokens : tokens.slice(1);
                    for (var i=0;i<tokens.length;++i) titleKeywords[tokens[i]] = true;
                    if (!color) color = data.color;
                }
            });

            titleKeywords = Object.keys(titleKeywords);
            tagKeywords   = Object.keys(tagKeywords);

            if (titleKeywords.length === 0 && tagKeywords.length === 0) return { result: null };
            return { result: 'highlighted', titleKeywords: titleKeywords, tagKeywords: tagKeywords, color: color || EHH.defaultColor };
        }

        return { result: null };

    },

    extractData: function(target) {

        if (!target) return null;

        var title = target.querySelector('.it5 > a, .id2 > a, [class^="t2"] > a') || target.querySelector('.itd a'),
            tags  = target.querySelectorAll('.tft, .tfl');

        if (!title && target.className.indexOf('t2') === 0) title = target.firstChild;
        if (!title) return null;
        
        if (tags.length > 0)
            tags = tags.map(function(x) { return x.title.split(/, /); }).reduce(function(x,y) { return x.concat(y); });

        return { title: title, tags: tags };

    },

    addTagDiv: function(target,tags) {
        if (!tags || tags.length === 0) return;
        var div = document.createElement('div');
        div.className = 'e-Tags';
        div.innerHTML = tags.map(function(x) { return x.replace(/^.+:/,''); }).join('<br>');
        if (!EHH.settings.showTags) div.style.display = 'none';
        var temp = target.getElementsByClassName('id3')[0];
        if (temp) temp.firstElementChild.appendChild(div);
        else target.appendChild(div);
    },
    
    walk: function(root) {

        /* walks the DOM to highlight and filter gallery items (or the taglist) */

        if (EHH.gallery) {
            EHH.highlightTags();
            return;
        }

        if (EHH.dontWalk) return;

        var removeTagDiv = function(target) {
            target.querySelectorAll('.e-Tags').forEach(function(x) { x.parentNode.removeChild(x); });
        };

        var editTitle = function(target,keywords) {
            var temp = target.innerHTML;
            keywords.forEach(function(keyword) {
                var length = keyword.length, n = target.innerHTML.indexOf(keyword);
                while (n != -1) {
                    temp = temp.slice(0,n) + new Array(length+1).join('\0') + temp.slice(n+length);
                    n = target.innerHTML.indexOf(keyword,n+1); 
                }
            });
            return temp.replace(/\0+/g,function(match,start) {
                return '<b>' + target.innerHTML.slice(start,start+match.length) + '</b>';
            });
        };

        // ----------
 
        var flip    = 1,
            targets = document.querySelectorAll('[class^="gtr"], [class^="id1"], [class^="t2"]');

        targets.forEach(function(target) {

            var data = EHH.extractData(target);
            if (data === null) return;

            // reset element
            target.className     = target.className.replace(/\s?e-\w+/g,'');
            target.style.cssText = target.style.cssText.replace(/background-color:.+?;/,'');
            data.title.innerHTML      = data.title.innerHTML = data.title.innerHTML.replace(/<\/?b>/g,'');
            removeTagDiv(target);

            var parsed = EHH.parse(data.title.textContent,data.tags);

            if (parsed.result == 'filtered') target.className += ' e-Filtered';

            if (parsed.result == 'highlighted') {
                target.className     += ' e-Highlighted';
                target.style.cssText += 'background-color: ' + parsed.color + ' !important;'; 
                data.title.innerHTML  = editTitle(data.title,parsed.titleKeywords);
                if (EHH.thumbnails) EHH.addTagDiv(target,parsed.tagKeywords);
            }

            if (!/^gtr/.test(target.className)) return;
            if (parsed.result == 'filtered' && !EHH.opaque) return;
            flip = (flip+1)%2;
            if (target.className.indexOf('color') == -1) target.className += ' color' + flip;
            else target.className = target.className.replace(/color\d/,'color' + flip);

        });
        
        var filtered = document.getElementsByClassName('e-Filtered').length;
        document.getElementById('e-FilteredItems').textContent = filtered;

        EHH.resize();
        
    },

    resize: function() {

        /* makes sure that thumbnails are displayed correctly (only necessary when filtering is enabled) */

        if (!EHH.thumbnails) return;

        var targets = document.getElementsByClassName('id1'), n = targets.length;
        var queue = [];

        for (var i=0;i<n;++i) {

            if (!EHH.settings.filterEnabled || EHH.opaque) {
                targets[i].style.marginBottom = null;
                continue;
            }

            if (targets[i].className.indexOf('e-Filtered') != -1) continue;

            queue.push(targets[i]);
            if (queue.length < 5) continue;

            queue = queue.map(function(x) { return [x,parseInt(x.style.height)]; });
            var max = queue[0][1];
            for (var j=1;j<5;++j) max = Math.max(max,queue[j][1]);
            for (j=0;j<5;++j) {
                if (queue[j][1] == max) queue[j][0].style.marginBottom = null; 
                else queue[j][0].style.marginBottom = (max-queue[j][1]+2) + 'px';
            }
            queue = [];

        }

    },

    highlightTags: function() {
        document.querySelectorAll('[id^="ta_"]').forEach(function(x) {
            if (!EHH.settings.highlightTags) x.style.cssText = '';
            else {
                var fullName = x.id.slice(3).replace(/_/g,' ');
                var data = EHH.parse(fullName,[fullName]);
                x.style.cssText = data.result == 'filtered'    ? 'text-decoration: line-through'                   :
                                  data.result == 'highlighted' ? 'background-color: ' + data.color + ' !important' :
                                                                 '';
            }
        });
    },

    updateTagList: function(e) {
        if (e.target.nodeName != 'TABLE' || e.target.parentNode.id != 'taglist') return;
        if (EHH.settings.highlightTags) EHH.highlightTags();
    },

    interceptMouseHover: function(e) {

        var observer = new MutationObserver(function(e) {
            var thumbnail = e[0].target;
            if (thumbnail.style.visibility == 'hidden')
                thumbnail.querySelectorAll('.e-Tags').forEach(function(x) { x.parentNode.removeChild(x); });
            else if (EHH.settings.showTags) {
                var row  = document.evaluate('ancestor::tr[1]',thumbnail,null,9,null).singleNodeValue,
                    data = EHH.extractData(row);
                if (data === null) return;
                parsed = EHH.parse(data.title.textContent,data.tags);
                if (parsed.result == 'highlighted') EHH.addTagDiv(thumbnail,parsed.tagKeywords);
            }
        });

        document.querySelectorAll('.it2[id^="i"]').forEach(function(x) {
            observer.observe(x,{ attributes: true });
        });
    }
    
};

EHH.init();