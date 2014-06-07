// ==UserScript==
// @version       0.1
// @date        2013-08-20
// @name       Do not install
// @description    Do not install
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @include      http://cloud.feedly.com/*
// @include      https://cloud.feedly.com/*
// @namespace    CustomFeedlyStyles
// @screenshot   http://s3.amazonaws.com/uso_ss/22852/large.png?1377079651
// @icon         http://s3.amazonaws.com/uso_ss/icon/176212/large.png?1377084346
// ==/UserScript==

/** http://userstyles.org/styles/53766/feedly-full-size-clear part **/
(function() {
var css = "\n#mainBar {margin-left: 0px !important;}\n#feedlyPart {width: 100% !important;}\n#feedlyPage, #mainArea, .u100Entry, .selectedEntry {width: 100% !important;}\n.u4Entry {width: 100% !important; max-width: 100%!important;}\n.marginMaker {margin-left: 0px !important; width: 100% !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();

/** http://userscripts.org/scripts/source/171749.user.js part **/
(function (window, unsafeWindow) {

    /** Forbid loading script in sub-frames **/
    var w = unsafeWindow || window;
    if (w.self != w.top) return;

    /** Logical fnctions def - defined; is - is type **/
    var def = function(obj){return obj !== undefined && obj !== null};
    var is = function(obj, type) {
        var clas = def(type) ? Object.prototype.toString.call(obj).slice(8, -1): type;
        return def(obj) && clas !== 'Undefined' && clas === type;
    };

    /** Load script only once**/
    if(is(w.CFS_started)) return;
    w.CFS_started = true;

    /** Logging true/false **/
    var LOG = true;
    var _log = LOG ? function () {
        var a = Array.prototype.slice.apply(arguments);
        a.unshift('[CFS]');
        console && console.log.apply(console, a);
    } : function () {};

    /** Version/Author info **/
    var CFS_info = '<a href="http://userscripts.org/scripts/show/176212">CFS v2.9.51</a> by Rolli ripped from Dexmaster';

    /** GM_fixes for any browser **/
    var GM_fix = function () {
        _log('[GM_fix]: Started GM_ functional fixes');
        if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf('not supported') > -1)) {
            this.GM_getValue = function (key, def) {
                return localStorage[key] || def;
            };
            this.GM_setValue = function (key, value) {
                return localStorage[key] = value;
            };
            this.GM_deleteValue = function (key) {
                return delete localStorage[key];
            };
            _log('[GM_fix]: Fixed GM_ get/set/delete Value');
        } else {
            _log('[GM_fix]: No need to Fix GM_ get/set/delete Value');
        }

        _log('[GM_fix]: Finished GM_ functional fixes');
    };

    /** Colors stuff **/
    var name_to_hex = function (col) {
        if (col) col = col.toLowerCase();
        var cols = {"aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff", "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887", "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff", "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgrey": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f", "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1", "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff", "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff", "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "grey": "#808080", "green": "#008000", "greenyellow": "#adff2f", "honeydew": "#f0fff0", "hotpink": "#ff69b4", "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c", "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2", "lightgray": "#d3d3d3", "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightslategrey": "#778899", "lightsteelblue": "#b0c4de", "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6", "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee", "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5", "navajowhite": "#ffdead", "navy": "#000080", "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6", "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1", "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "slategrey": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4", "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0", "violet": "#ee82ee", "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5", "yellow": "#ffff00", "yellowgreen": "#9acd32"};
        if (col) {
            col = def(cols[col]) ? cols[col] : col;
        }
        return col.toUpperCase();;
    };

    /** Custom Feedly Styles **/
    var CFS = {
        _set: {},
        /**  START of Configuration *( to edit default config, do not remove vars elements only change ) **/
        _set_default: {
            main_css: {use: true, vars: {max_width: '100%', page_font: 'sans-serif'}, text: 'Basic css *(variables: max_width - 00%|00px|00em max window width; page_font - font_name of any font currently present on your computer)'},
            left_menu_css: {use: true, vars: { }, text: 'Always show Left Menu, and fix all misbehaviours of Feedle Left Menu'},
            dark_theme_fix: {use: true, vars: { }, text: 'Fix Left Menu styles for dark theme for any display proportions'},
            cards_view_fix: {use: true, vars: { }, text: 'Cards View Fix *(width, proportions and slimming and decreasing distances of feeds in Cards View )'},
            titles_fix: {use: true, vars: { }, text: 'Title overflow fix *(fixing problem of overflowins of titles and texts, and wrapping every object inside a feed to stay inside)'},
            page_proportions_fixes: {use: true, vars: { }, text: 'Page and side area proportions fix *(fixing proportions to Full Article and Magazine Views, to 68% and 66% of page)'},
            wiki_widget_fix: {use: true, vars: { }, text: 'WikiWidget in Article View Fix *(fixing a problem with WikiWidget in Article View)'},
            title_view_fix: {use: true, vars: { }, text: 'Title View fix *(restyling Title View and sliming out titles and summaries)'},
            condensed_tools_fix: {use: true, vars: { }, text: 'Condensed Tools Fix *(slimmer Condensed Tools)'},
            slim_condensed_tools: {use: false, vars: { }, text: 'Slim Condensed Tools *(Even more slim Condensed Tools for small screens)'},
            some_cleaning: {use: true, vars: {art_padding: "15px", art_color:'#f9f9f9'}, text: 'Some cleaning *(variables: art_padding - Full Article View Feed Padding, art_color - Full Article View Feed background)'},
            remove_breaks: {use: false, vars: { }, text: 'Remove &lt;br&gt; from paragraphs'},
            share_feed_fix: {use: true, vars: { }, text: 'SocialIcons in LifeHacker posts'},
            my_styles: {use: true, vars: {my_css: '/*some css*/'}, text: 'Some User css  *(variables: my_css - you could input here your own css for testing or just something you want)'},
            hotkeys: {use: true, vars: {}, text: '"h" - open feed in new background tab <br /> "Ctrl+n/p" - for next-previous folder'},
            use_full_width: {use: false, vars: { }, text: 'Hide Side Areas in Article and Magazine Views *(use 100% of Right Panel not some proportions)'},
            colors: {use: true, vars: {action_color:'#82BD1A',h1_color: '#000',h2_color: '#36C',unread_color: '#36C', read_color: '#666'}, text: 'Text colors generally for everything *(variables: action_color - action links color, h1_color - h1 color, h2_color - h2 color, unread_color - unread feeds color, read_color - read feeds color)'},
            tview_colors: {use: true, vars: {summary_color:'#999', tview_color:'#777'}, text: 'Title View Text colors *(variables: summary_color - summary text color, tview_color - Title View link color)'},
            background_colors: {use: false, vars: {condtools_color:'#FFF', select_color:'#FFFCDF', hover_color:'#F5F5F4'}, text: 'Background colors *(variables: condtools_color - Condensed Tools background color, select_color - Selected Feed background color, hover_color - Hover Feed background color)'},
            left_menu_colors: {use: false, vars: {ltext_color:'#444',dtext_color:'#AAA',lsel_color:'#000',dsel_color:'#FFF',lcount_color:'#444',lselcount_color:'#000',dcount_color:'#888',dselcount_color:'#FFF',lnempty_color:'#555',dnempty_color:'#DDD'}, text: 'Left Menu colors (variable parts meanings:"l|d" - Ligh/Dark theme, "sel" - selected, "count" - counter, "nempty" - nonEmpty Category)'},
            compact_title_view: {use: false, vars: { }, text: 'Even more Slim Title View and fix for Compact View option in Preferences'},
            custom_icons: {use: false, vars: { }, text: 'Just some additional icons I created, I can apply colors to them later and they are extremely fast, because I created font for them :)'}
        },
        /**  END of Configuration  **/
        _css: {
            main_css: 'body.home{margin: 0 auto;max-width: %max_width;}body, input, span, div, h1, h2, h3, .feedTitle, .u0Entry, .title, .entryBody, .metadata, .summary, .hhint, #messageBarContent, .categoryUnreadCountHint, .dot, a{font-family: %page_font !important;}',
            left_menu_css: '#feedlyTabs {max-width: 200px;opacity: 1 !important;padding-left: 10px !important;padding-right: 55px !important;}#mainBar {margin-left: 225px !important;}#mainBar > #mainArea, #feedlyPage > #mainArea{width:99% !important;}.panels {visibility: visible !important;}#navSelector_my {margin-left: 15px !important;padding-left: 5px !important;text-align: left !important;width: 70px !important;}#feedlyTabsHolder {background: inherit !important;box-shadow: none !important;opacity: 1 !important;width: 220px !important;z-index: 11 !important;}#feedlyTabsHolder div.simpleunreadcount {padding-left: 3px !important;width: 22px !important;}#feedlyTabsHolder:hover #feedlyTabs {overflow-y: auto;padding-right: 10px !important;}#navSelector_store {width: 110px !important;}#feedlyFrame, #feedlyPage, #feedlyPart {margin: auto !important;padding-right: 0 !important;width: 98% !important;}.tab{max-width:183px !important;}',
            dark_theme_fix: '.dark #feedlyTabsHolder {color: rgba(255, 255, 255, 0.7) !important;}.dark #feedlyTabsHolder #addtab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-add-active.png) !important;}.dark #feedlyTabsHolder #exploretab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-explore-active.png) !important;}.dark #feedlyTabsHolder #friendstab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-social-active.png) !important;}.dark #feedlyTabsHolder #historytab_icon_ {background-image: url(http://s3.feedly.com/production/16.0/images/selector-history-active.png) !important;}.dark #feedlyTabsHolder #latesttab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-latest-active.png) !important;}.dark #feedlyTabsHolder #sharedtab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-shared-active.png) !important;}.dark #feedlyTabsHolder .handle {background-image: url(http://s3.feedly.com/production/16.0/images/selector-right-arrow-active.png) !important;}.dark #feedlyTabsHolder .handle.expanded {background-image: url(http://s3.feedly.com/production/16.0/images/selector-down-arrow-active.png) !important;}.dark #feedlyTabsHolder .my_icon, .dark #feedlyTabsHolder #mytab_icon {background-image: url(http://s3.feedly.com/production/16.0/images/selector-my-active.png) !important;}.dark #feedlyTabsHolder #savedtab_icon{background-image: url(http://s3.feedly.com/production/16.0/images/selector-saved-active.png ) !important;}.dark #store .language.selected, .dark .nonEmpty, .dark #feedlyTabsHolder #feedlyTabs .target.selected {color: #FFF !important;}.dark #storeTopics .topic {background: rgba(255, 255, 255, 0.15) !important;color: rgba(255, 255, 255, 0.4) !important;}.dark .navSelector {border-bottom-color: rgba(255, 255, 255, 0.1) !important;}.dark .navSelector.selected {border-bottom-color: rgba(255, 255, 255, 0.3) !important;color: #FFF !important;font-weight: 700 !important;}',
            cards_view_fix: '.u5EntryList .column {padding-right: 2% !important;width: 31% !important;}.u5EntryList .u5Entry, .u100Entry .entryHeader .entryTitle {margin-bottom: 15px !important;}.u5Entry, .u5Entry .visual {background-color: #FFF;position: relative;width: auto !important;z-index: 9;}.u5EntryAnnotationHolder ~ div {margin-top: 10px !important;padding: 0 10px  !important;}.u5EntryAnnotationHolder ~ div ~ div {padding: 0 10px 10px !important;}',
            titles_fix: '.title, .title a,.title div, .content,.content div, .entryBody, .entryBody div {max-width: 100% !important;overflow-wrap: break-word;word-wrap: break-word;}',
            page_proportions_fixes: '#sideArea {margin: 0 15px 0 0 !important;max-width: 28% !important;position: absolute;right: 0;top: 50px;width: 28% !important;}.sideAreaModule{max-width: 100% !important}.u100Entrylist {max-width: 68% !important;width: 68% !important;}.feedIndex {height: auto !important}.u4Entry {margin-bottom: 15px !important;max-width: 66% !important;}.inlineFrame table, .inlineFrame table tbody, .inlineFrame table tbody tr, .inlineFrame table tbody tr td,.u100Frame table, .u100Frame table tbody, .u100Frame table tbody tr, .u100Frame table tbody tr td, .u100EntryList .entryHolder {background-color: transparent !important;display: block; max-width: 100% !important;}.entryBody iframe {margin: 0 !important;max-width: 100%;}',
            wiki_widget_fix: '.WikiWidget > div:first-child > div:nth-child(4), .wikiWidgetShareHolder {position: absolute;}.bottomWikiWidget .abZone .ab{position: absolute;right: 50px;}.bottomWikiWidget{margin-top: 11px!important;}',
            title_view_fix: '.u0Entry {height: 27px !important;padding-left: 0 !important;position: relative !important;}.u0Entry .sourceInfo {width: 120px !important;}.u0Entry .title:hover {z-index: 4;}.u0Entry > div:last-child, .u0Entry div div.sourceInfo + div {display: inline;position: absolute;}.u0Entry, .u0Entry .title {white-space: nowrap;}.u0Summary {color: #999 !important;line-height: 29px;position: absolute;white-space: nowrap;}.entryholder .u100entry,.condensed .entryholder .u100entry{max-width: 99% !important}td.entryHolder{width: 10000px !important;}',
            condensed_tools_fix: '.u0Entry .condensedTools, .u0Entry .lastModified{background-color: #FFF;position: relative;width: auto !important;z-index: 9;}.u0Entry .lastModified {line-height: 31px !important;max-width: 50px;padding: 0 5px !important;width: 50px !important;}',
            slim_condensed_tools: '.u0Entry .condensedTools a,.u0Entry .condensedTools img{margin: 0 -8px;}.u0Entry .lastModified{max-width: 30px;}',
            some_cleaning: '.content img {border: 1px #e9e9e9 solid !important;margin: 0 !important;height: auto !important;max-width: 100% !important;}#feedlyPart0.area {padding: 0 5px 80px 20px !important;}#feedlyPageHeader {margin-top: 10px !important;}#feedlySignPart {position: fixed !important;top: 300px !important;}.u100Frame {background-color: %art_color !important;padding: %art_padding !important;}.u100Entry a.title {font-size: 20px !important; line-height: 20px !important; max-width: 99% !important;}.inlineFrame {padding: 15px !important;}#feedlyTabs > div:first-child {margin: 15px 0 !important;}h2 {margin-top: 2px !important; margin-bottom: 2px !important;height:auto !important}#feedlyPageHeader .hhint{margin-top: -8px; !important;display:inline-block !important;}#floatingBar #cacheRefresh{padding: 0;}',
            remove_breaks: '.content br {display: none !important;}',
            share_feed_fix: '.u100Entry > .entryBody > .content > div > table > tbody > tr > td > a > img {display: inline !important;max-width: 20px !important;width: 20px !important;}',
            my_styles: '/**/ %my_css /**/',
            hotkeys: '/** Hotkeys CSS **/',
            use_full_width: '#sideArea {visibility:hidden;}.u100Entrylist {max-width: 100% !important;width: 100% !important;}.u4Entry {margin-bottom: 15px !important;max-width: 100% !important;}',
            colors: '.categoryUnreadCountHint span,.entryBody a,.action{color: %action_color !important}h1{color: %h1_color !important;}h2{color: %h2_color !important;font-weight: 700 !important;}.unread,.notSubscribed .title{color: %unread_color !important;font-weight: 700 !important;}.title.read {color: %read_color !important;font-weight: 400 !important;}',
            tview_colors:'.u0Summary{color: %summary_color !important;}.u0Entry .sourceTitle a {color: %tview_color !important;}',
            background_colors:'.u0Entry .condensedTools, .u0Entry .lastModified{background-color: %condtools_color !important;}.selectedEntry{background-color: %select_color !important;}.u0Entry:hover {background-color: %hover_color !important;}',
            left_menu_colors:'#feedlyTabsHolder {color: %ltext_color !important;}.dark #feedlyTabsHolder {color: %dtext_color !important;}.navSelector.selected,.tab .selected{color: %lsel_color !important;}.dark .navSelector.selected,.dark .tab .selected,.dark .tab .selected .label, .dark .tab .selected .feedTitle{color: %dsel_color !important;}.tab .simpleUnreadCount{color: %lcount_color !important;}.tab .selected .simpleUnreadCount{color: %lselcount_color !important;}.dark .tab .simpleUnreadCount{color: %dcount_color !important;}.dark .tab .selected .simpleUnreadCount{color: %dselcount_color !important;}.tab .nonEmpty{color: %lnempty_color !important;}.dark .tab .nonEmpty{color: %dnempty_color !important;}',
            compact_title_view:'.u0Entry .title,.u0Entry .sourcetitle a,.u0Entry .sourceInfo,.u0Entry .lastModified,.u0Summary {line-height: 24px !important;}.u0Entry .quicklistHandle,.u0Entry {height: 24px !important;}.u0Entry .condensedTools {top: -3px;}.u0Entry .quicklistHandle:before {bottom: 0 !important;}',
            custom_icons: '@font-face {font-family: "CFS";src:local("☺"),url("data:application/x-font-woff;charset=utf-8;base64,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") format("woff");font-weight: normal;font-style: normal;}#feedlyTabsHolder .label:before,.quicklistHandle:before{text-transform:none;content:" ";font-family:CFS !important;font-size:20px;position:absolute;left:7px;opacity:0.6;transition:opacity 0.2s;font-weight:300;}#feedlyTabsHolder .label:hover:before,#feedlyTabsHolder .selected .label:before{opacity:1;}#feedlyTabsHolder #mytab .label:before{content:"J";}#feedlyTabsHolder #savedtab .label:before{content:"P";font-size:18px;}#feedlyTabsHolder #organizetab .label:before{content:"f";font-size:18px;}#feedlyTabsHolder #latesttab .label:before{content:"K";}#feedlyTabs > div > .tab .label:before{content:"V";}#feedlyTabsHolder .label[data-uri="index"]:before{content:"g";}#feedlyTabsHolder .label[data-uri="cortex"]:before{content:"h";}#feedlyTabsHolder #historytab_header .label:before{content:"i";}#feedlyTabsHolder .target[data-uri="preferences"] .label:before{content:"j";}#feedlyTabsHolder .target[data-uri="themes"] .label:before{content:"k";}#feedlyTabsHolder .label[href="http://blog.feedly.com"]:before{content:"l";}#feedlyTabsHolder .label[href="http://feedly.uservoice.com"]:before{left:11px;content:"m";}.u0Entry .quicklistHandle:before{opacity:1;bottom:4px;content:"O";}.u0Entry .quicklistHandle:hover:before,.u0Entry.quicklisted .quicklistHandle:before{content:"P";}#feedlyTabsHolder .tab,.u0Entry .quicklistHandle,.condensedTools a,#feedlyTabsHolder .label{background-image:none !important;text-decoration:none;position:relative;}#feedlyTabsHolder .label{text-transform: capitalize !important;}#feedlyTabsHolder .label:first-letter{text-transform:uppercase;}#feedlyTabsHolder .tab .header.target .icon,.wide .dark #feedlyTabsHolder .tab .header.target .icon{background-image:none !important;height:28px;opacity:0;position:absolute;text-decoration:none !important;width:28px;z-index:1;}#feedlyTabsHolder .tab .header.target .label{padding-left:32px;}.condensedTools a:before{text-transform:none;content:" ";font-family:CFS !important;font-size:15px;color:#000 !important;position:absolute;right:8px;width: 20px;}.condensedTools a:first-child:before{content:"G";}.condensedTools a:nth-child(2):before{content:"B";}#tagList + div .tab .header.target .label{padding-left:34px;}'/*#tagList + div .tab .header.target .label{ padding-left: 34px;}*/
        },
        _initialized: false,
        _calculated: false,
        _calc_css: {},
        init: function () {
            if (this._initialized) return;
            this._initialized = true;
            _log('[CFS.init]: Script Initialized');
            GM_fix();
            this.init_set();
            this.calc_css();
            document.body.addEventListener("DOMNodeInserted", this.add_tog);
            _log('[CFS.init]: CFS.add_tog on body insert');
        },
        init_set: function (RES) {
            if(!!RES){
                CFS._set = JSON.parse(JSON.stringify(CFS._set_default));
            }else{
                CFS._set = JSON.parse(decodeURI(GM_getValue('_set', encodeURI(JSON.stringify(CFS._set_default)))));
            }
            _log('[CFS.init_set]: Settings init //_set');//_set= ', JSON.stringify(CFS._set));
        },
        calc_css: function () {
            if (this._calculated) return;
            this._calculated = true;
            _log('[CFS.calc_css]: Calculation Started');
            for (var key in this._set_default) {
                this.calc_each(key);
            }
            _log('[CFS.calc_css]: Calculation Finished');
        },
        calc_each: function(key){
            if (!def(CFS._set[key]))CFS._set[key] = CFS._set_default[key];
            _log('[CFS.calc_each]: Adding '+key);
            if (CFS._set[key].use) {
                CFS._calc_css[key] = CFS.css_vars(CFS._css[key], CFS._set_default[key].vars, CFS._set[key].vars);
                _log('[CFS.calc_each]: Added ', key, ' CSS');
            } else {
                CFS._calc_css[key] = '';
                _log('[CFS.calc_each]: Missing ', key, ' CSS');
            }
        },
        css_vars: function (css, vars, vars2) {
            for (var key2 in vars) {
                if (!def(vars2))vars2 = vars;
                if (key2.length > 0) {
                    if (!def(vars2[key2]))vars2[key2] = vars[key2];
                    _log('[CFS.calc_css]: Replacing variable ', key2, ' CSS');
                    css = this.str_mask(css, key2, vars2[key2]);
                }
            }
            return css;
        },
        str_mask: function (str, mask, data) {
            return str.split('%' + mask).join(data);
        },
        open_tab: function (url, back) {
            /** back - background_tab flag, tried more universal approach, but hasn't been tested **/
            if (back) {
                var browser = 'Dunno';
                //if ( typeof GM_openInTab != 'undefined' ){ // SH*Ts chrome and other browsers
                if (navigator.userAgent.indexOf('Firefox') != -1) {
                    browser = 'Firefox!';
                    /** Firefox *( possible need in about:config "browser.tabs.loadInBackground: true", but it is default for a lot of releases )**/
                    res = GM_openInTab(url);
                } else {
                    var el = document.createElement("a");
                    el.href = url;
                    var res = false;
                    if (typeof( document.createEvent ) == "function") {
                        /** Chrome/Opera/?Safari?/?IE10? *( if you'd found some problems please report to Script Discussion section https://userscripts.org/scripts/discuss/171749 )**/
                        var evt = document.createEvent("MouseEvents");
                        browser = 'Chrome/Opera/?Safari?/?IE10+?!';
                        evt.initMouseEvent("click", true, true, w, 0, 0, 0, 0, 0,
                            true, false, false, false, 0, null);  // ctrl+left button
                        res = el.dispatchEvent(evt);
                    } else if (document.createEventObject) {
                        /** ?IE9-? *( if you'd found some problems please report to Script Discussion section https://userscripts.org/scripts/discuss/171749 )**/
                        browser = 'IE < 9!';
                        var evt = document.createEventObject ();
                        evt.ctrlKey = true;
                        evt.button = 1;   // ctrl+left button
                        res = el.fireEvent ("onclick", evt);
                    }
                }
                _log('[CFS.open_tab]: ',(res)?'Opened "':'Forbidden to open "',url,'" (in ',browser,') ',(back)?'new background':'new',' tab ');
            } else {
                w.open(url);
            }
        },
		key_ch_right: function (evt){
			//_log('[CFS.key_ch_right] Proceed!');
			CFS.key_check(evt,true);
		},
		key_ch_left: function (evt){
			//_log('[CFS.key_ch_left] Proceed!');
			CFS.key_check(evt,false);
		},
        key_check: function (evt,right) {
            evt = evt || w.event;

            if (evt.ctrlKey || evt.altKey || evt.metaKey) return;

            var char = String.fromCharCode(evt.keyCode || evt.charCode);
            if ((char.charCodeAt(0)<30)||(char.charCodeAt(0)>111)) return;
			if ((!right)&&(!document.querySelector('#navSelector_my').classList.contains('selected'))) return;
			
            _log('[CFS.key_check]On ',(right)?'Right':'Left',' Panel, Char -',char,'- was pressed! Shift:',(evt.shiftKey)?'Pressed':'Not Pressed',', Ctrl:',(evt.ctrlKey)?'Pressed':'Not Pressed',', Alt:',(evt.altKey)?'Pressed':'Not Pressed',', CharCode:',char.charCodeAt(0),'.');
			var el = null;
			if(document.querySelector('#feedlyTabs > div:last-child .header.target.selected') != null) el = document.querySelector('#feedlyTabs > div:last-child .header.target.selected').parentNode;
			
            switch (char) {
				case 'H':
					if((document.querySelector('.selectedEntry .title') != null)&&(!evt.shiftKey)&&(!evt.ctrlKey)&&(!evt.altKey))
						CFS.open_tab(document.querySelector('.selectedEntry .title').href, true); //open new background tab
					break;
				case 'P':
					if((el != null)&&(evt.shiftKey)&&(!evt.ctrlKey)&&(!evt.altKey))if(el.previousElementSibling != null) {el.previousElementSibling.previousElementSibling.querySelector('.label').click();}else{
						var index = el.parentNode.childElementCount - 4;
						el.parentNode.children[index].querySelector('.label').click();
						};
					break;
				case 'N':
					if((document.querySelector('#feedlyTabs > div:last-child .header.target.selected') != null)&&(evt.shiftKey)&&(!evt.ctrlKey)&&(!evt.altKey))if((el.nextElementSibling != null)&&(el.nextElementSibling.nextElementSibling != null)&&(el.nextElementSibling.nextElementSibling.nextElementSibling != null)&&(el.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
					!= null)){
						el.nextElementSibling.nextElementSibling.querySelector('.label').click();
					}else{
						var index = 0;
						el.parentNode.children[index].querySelector('.label').click()
					};
					break;
            }
        },
        css_join: function (arr){
            var res = '';
            for (var key in arr) res += "/* " + key + " Begin */"+arr[key]+"/* " + key + " end */";
            return res;
        },
        css_add: function (css) {
            var chld = document.createElement('style');
            chld.type = 'text/css';
            chld.appendChild(document.createTextNode(css));
            var hds = document.getElementsByTagName('head')[0];
            var prnt = hds || document.documentElement;
            if (def(CFS._css_el)) CFS._css_el.parentElement.removeChild(CFS._css_el);
            CFS._css_el = (hds) ? prnt.appendChild(chld) : prnt.insertBefore(chld, prnt.firstChild);
        },
        /*CFS w BEGIN*/
        _shown: false,
        _wind: '',
        _wcss: '.CFS_conf{background-color:#FFFFFF;border:1px dashed #000;border-radius:5px;display:none;padding: 5px 5px 50px;position:fixed;right:2%;top:45px;z-index:900;}.CFS_conf.shown{display:block;}.opts,.vars{border:1px dashed #000;display:block;float:right;margin:2px;padding:4px;}.cb{display:inline;margin:0;}.lb{cursor:pointer;display:inline;width:86%;}.vr{margin:2px;padding:0;width:65px;height:16px;border:1px solid black;}.opt .text{background-color: #F9F9F9;bottom:1%;display:none;position:absolute;right:1%;width:59%;height: 45px;}.opt:hover .text{display:block;}.btns{bottom:5%;left:1%;position:absolute;width: 38%;}.bt{cursor:pointer;margin:0 0.5%;width: 24%;}.tg.pageAction{display: inline-block;line-height: 17px;cursor:pointer;opacity: 0.45;transition: opacity 0.2s;vertical-align:top;}#feedlyPageHeader .tg{font-size:15px;line-height:26px;}.tg.selected,.tg:hover{opacity:1}.gray{background-color:#DDD}#CFS_info{position: absolute; bottom: 0; left: 2px;}',
        tog_wind: function () {
            document.querySelector('.CFS_conf').classList.toggle('shown');
            document.querySelector('#feedlyPageHeader .tg').classList.toggle('selected');
            document.querySelector('#floatingBar .tg').classList.toggle('selected');
            this._shown = !this._shown;
        },
        wind_init: function () {
            if (this._calc_css != '') {
                //_log('[CFS.wind_init]: ',this._calc_css);
                this._calc_css['_wcss'] = this._wcss;
                this.css_add(this.css_join(this._calc_css));
                _log('[CFS.wind_init]: CFS._calc_css Added');
                _log('[CFS.wind_init]: Added ws style _wcss');
            }
            this._wind = this.cr_el('div', document.body, 'CFS_conf');
            _log('[CFS.wind_init]: Added cfs_wind');
            var opts = this.cr_el('div', this._wind, 'opts');
            var vars = this.cr_el('div', this._wind, 'vars');
            var vars2 = this.cr_el('div', this._wind, 'vars');
            var count = 0;
            for (var key in this._set_default) {
                _log('[CFS.wind_init]: ',key ,typeof this._set[key]);
                if (!def(this._set[key])) this._set[key] = this._set_default[key];
                var opt = this.cr_el('div', opts, 'opt', key + '_opt');
                if (!this._set[key].use) opt.classList.add('gray');
                this.cr_el('input', opt, 'cb', key + '_use', this._set[key].use);
                this.cr_el('label', opt, 'lb', key + '_lb', key);
                this.cr_el('div', opt, 'text', key + '_text', this._set_default[key].text);
                _log('[CFS.wind_init]: Added option ', key);
                for (var key2 in this._set_default[key].vars) {
                    if (typeof this._set[key].vars[key2] == 'undefined') this._set[key].vars[key2] = this._set_default[key].vars[key2];
                    count += 1;
                    var varo = this.cr_el('div', (count<16)?vars:vars2, 'varo ' + key +'_v', key2 + '_varo');
                    if (!this._set[key].use) varo.classList.add('gray');
                    this.cr_el('input', varo, 'vr', key2 + '_vr', this._set[key].vars[key2]);
                    this.cr_el('div', varo, 'lb', key2 + '_lb', key2 + ' *(' + key + ')');
                    _log('[CFS.wind_init]: Added var ', key2);
                }
            }
            var btns = this.cr_el('div', this._wind, 'btns');
            this.cr_el('input', btns, 'bt', 'save', this.save_set);
            this.cr_el('input', btns, 'bt', 'load', this.res_set);
            this.cr_el('input', btns, 'bt', 'default', this.def_set);
            this.cr_el('input', btns, 'bt', 'close', this.tog_wind);
            _log('[CFS.wind_init]: Added buttons! ');
            var info = this.cr_el('div', this._wind, 'text info', 'CFS_info', CFS_info);
            _log('[CFS.wind_init]: Added info! ');
            this.cr_el('div', document.querySelector('#feedlyPageHeader .pageActionBar'), 'tg', 'CFS');
            this.cr_el('div', document.querySelector('#floatingBar .pageActionBar'), 'tg', 'CFS');
            _log('[CFS.wind_init]: Added toggles! ');
			if (this._set['hotkeys'].use) {
				document.querySelector('#mainBar').onkeyup = CFS.key_ch_right;
				//document.querySelector('#feedlyTabsHolder').onkeyup = CFS.key_ch_left;
				//window.onkeyup = CFS.key_check;
			}
        },
        add_tog: function () {
            document.body.removeEventListener("DOMNodeInserted", CFS.add_tog);
            _log('[CFS.add_tog]: Trying to initialize! ');
            if (document.querySelector('#floatingBar') == null) {
                _log('[CFS.add_tog]: Absent floatingBar! ');
                setTimeout(CFS.add_tog, 200);
            } else {
                _log('[CFS.add_tog]: Present floatingBar! ');
                CFS.wind_init();
            }
        },
        def_set: function () {
            delete this._set;
            _log('[CFS.del_set] Deleting');
            CFS.res_set(true);
        },
        res_set: function (RES) {
            _log('[CFS.res_set] Loading (Reseting?', is(RES,'Boolean'),')');
            CFS.init_set(is(RES,'Boolean'));
            for(var key in CFS._set_default) {
                var rebuild = false;
                if (!def(CFS._set[key])) CFS._set[key] = CFS._set_default[key];
                if (CFS._set[key].use != document.querySelector('#' + key + '_use').checked){
                    document.querySelector('#' + key + '_opt label').click();
                }
                for (var key2 in CFS._set_default[key].vars) {
                    if (!def(CFS._set[key].vars)) CFS._set[key].vars = CFS._set_default[key].vars;
                    if(CFS._set[key].vars[key2] != document.querySelector('#' + key2 + '_vr').value){
                        document.querySelector('#' + key2 + '_vr').value = CFS._set[key].vars[key2];
                        document.querySelector('#' + key2 + '_vr').onblur();
                        rebuild = true;
                    }
                }
                if(rebuild){
                    CFS.calc_each(key);
                    CFS.css_add(CFS.css_join(CFS._calc_css));
                }
            }
            _log('[CFS.apply_set] Applied!');
        },
        save_set: function () {
            GM_deleteValue('_set');
            GM_setValue('_set', encodeURI(JSON.stringify(CFS._set)));
            _log('[CFS.save_set] Saved!');
        },
        colrs: function () {
            var back_col = name_to_hex(this.value);
            this.style.border = '1px solid black';
            if(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(back_col)){
                this.style.backgroundColor = back_col;
                var rgb = this.style.backgroundColor.match(/\d+/g);
                var yiq = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
                var text_col = (yiq >= 128) ? '#000' : '#fff';
                this.style.color = text_col;
                _log('[CFS.colrs] rgb col ', back_col, 'text color', text_col, '( yiq = ', yiq, ')');
                if(def(this.parentElement))CFS.opts(this.parentElement.classList.item(1).replace(/_([a-zA-Z]+)$/, ""),back_col,this.id.replace(/_([a-zA-Z]+)$/, ""));
            }else{
                this.style.border = '1px solid red';
            }
        },
        opts: function (el, val, vr){
            _log('[CFS.opts] ', el, val, vr);
            var rebuild = false;
            if(!def(vr)){
                if(CFS._set[el].use != val) {
                    CFS._set[el].use = val;
                    rebuild = true;
                }
            }else{
                _log(CFS._set[el].vars[vr], val,CFS._set[el].vars[vr] != val);
                if(CFS._set[el].vars[vr] != val) {
                    CFS._set[el].vars[vr] = val;
                    rebuild = true;
                }
            }
            if(rebuild){
                CFS.calc_each(el);
                CFS.css_add(CFS.css_join(CFS._calc_css));
            }
        },
        cr_el: function (type, par, clas, id, val) {
            var el = document.createElement(type);
            el.className = clas || '';
            var id = id || '';
            var val = val || '';
            el.id = id;
            switch (el.classList.item(0)) {
                case 'opt':
                    el.onclick = function(){
                        var sel = this.id.replace(/_([a-zA-Z]+)$/, "");
                        var group = document.querySelectorAll('.'+sel+"_v");
                        _log('.'+sel);
                        if(document.querySelector('#'+sel+"_use").checked){
                            this.classList.remove('gray');
                            Array.prototype.forEach.call(group, function (el) {el.classList.remove('gray')});
                        }else{
                            this.classList.add('gray');
                            Array.prototype.forEach.call(group, function (el) {el.classList.add('gray')});
                        }
                        CFS.opts(sel,document.querySelector('#'+sel+"_use").checked);
                    };
                    break
                case 'lb':
                    el.innerHTML = val;
                    el.htmlFor = val + '_use';
                    break
                case 'cb':
                    el.type = 'checkbox';
                    el.checked = val;
                    el.onblur = this.opts;
                    break
                case 'text':
                    el.innerHTML = val;
                    break
                case 'vr':
                    el.type = 'text';
                    el.value = val;
                    if (id.indexOf('color_vr') > -1) {
                        el.onblur = this.colrs;
                        this.colrs.call(el);
                    }else if (id.indexOf('font_vr') > -1) {
                        el.onblur = function () {
                            this.style.fontFamily = this.value;
                            if(def(this.parentElement))CFS.opts(this.parentElement.classList.item(1).replace(/_([a-zA-Z]+)$/, ""),this.value,this.id.replace(/_([a-zA-Z]+)$/, ""));
                        };
                        el.style.fontFamily = val;
                    }else{el.onblur = function () {if(def(this.parentElement))CFS.opts(this.parentElement.classList.item(1).replace(/_([a-zA-Z]+)$/, ""),this.value,this.id.replace(/_([a-zA-Z]+)$/, ""));};
                    };
                    break
                case 'bt':
                    el.type = 'button';
                    el.value = id;
                    el.id = 'cfs_' + id;
                    el.addEventListener('click', val, false);
                    break
                case 'tg':
                    el.id = 'cfs_toggle';
                    el.classList.add('pageAction');
                    el.innerHTML = id;
                    el.addEventListener('click', CFS.tog_wind, false);
                    break
            }
            if(clas != 'tg'){par.appendChild(el);}else{par.insertBefore(el,par.firstChild);}
            return el;
        }
        /*CFS window END*/
    };

    CFS.init();

})(window);