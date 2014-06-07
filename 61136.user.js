// ==UserScript==
// @name           Mafia Wars Spam Filter (Facebook)
// @namespace      mafiawars
// @author         ziren
// @version        0.3.2
// @description    Hides the stories related to icing people and other stupid shit.
// @include        http://www.facebook.com/home.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
//
// Changelog 
// --------------
// 2009.11.27  v0.3.2       added a rule that filters 'looking for items' posts.  uncomment it
//                          to enable that feature, as its disabled by default
// 2009.11.23  v0.3.1       minor cleanup
// 2009.11.23  v0.3.0       no new functionality, but significant changes addressing performance.
//                          filtration code is more efficient; show/hide spam now in constant
//                          time; userscript activity now throttled to ensure the page 
//                          doesn't lock up
// 2009.11.08  v0.2.1       gdi somehow reverted to old @name value in the last version, so 
//                          this version readopts the friendlier @name (no underscores)
// 2009.11.08  v0.2.0       now also filters the worthless secondhand job help links  
//                          as well as msgs regarding 'episode completed'
// 2009.11.03  v0.1.1       changed the @name of the script
// 2009.11.03  v0.1.0       first upload.

var throttle = (function () {
    var cooldown = 3,           // an awfully short interval, but because fb generates 
        ready = true;           //   so many dom insertion events at once, the callback 
                                //   executes approx 3+plentyotime later        
    // enforces a maximum action rate.  
    // returns true if at least cooldown milliseconds have passed since
    // the last successful action.
    // 
    // the opportunity to act is consumed when throttle() returns true.
    return function () {
        if (!ready) {
            return false;
        }
        ready = false;
        window.setTimeout(function () {
            ready = true;
        },cooldown);
        return true;
    }
})();

$(document).ready(function() {
    // mw_spam_button copied from the sexy_button style as found on the moscow homepage.
    $('head').append('<style> #mw_spam_button { border: 1px solid #ffd927; padding: 5px; color: #ffd927; width: auto; font-size: 14px; cursor:pointer; font-weight: bold; display: block; float: left; background-image: url(http://mwfb.static.zynga.com/mwfb/graphics/moscow_red_button_bg.gif);}'
        + '#mw_button_foil {padding: 10px; height: 30px; background-color: #000;}'
        + '</style>'
        + '<style id="mw_style"> .mw_spam { background-color: #ddd; }'
        + '</style>\n');                
    // add button
    $('#home_sidebar').append('<div id="mw_button_foil"><div id="mw_spam_button"><span id="mw_spam_state">Hide </span><span id="mw_spam_count"></span> Mafia Wars spam.</div></div>');
        
    var filter = (function () {
        var selector = ['div.GenericStory:has(img[src*=nothingpersonal])',
                        'div.GenericStory:has(img[src*=leveledup])',
                        'div.GenericStory:has(img[src*=episodecompleted])',
                        'div.GenericStory:has(img[src*=socialjobagain])',
                        'div.GenericStory:has(h3:contains("are now friends"))',
                        'div.GenericStory:has(h3:contains("is now friends"))',
                        'div.GenericStory:has(h3:contains("became a fan of"))',
                        'div.GenericStory:has(h3:contains("became fans of"))',
                        'div.GenericStory:has(h3:contains("joined the group"))',
//                        'div.GenericStory:has(img[src*=lookingforsomeitems])',  //<------  UNCOMMENT TO ENABLE FILTERING 'LOOKING FOR SOME ITEMS'
                      ],
            selectStr = selector.join(', '),
            spams = {},
            c = 0;
        return {
            count: function () {
                return c;
            },
            markSpams: function () {        
                if(!throttle()) {
                    return;
                }            
                spams = $(selectStr);     
                c = spams.length;            
                $('#mw_spam_count').text(c);  
                spams = spams.not('.mw_spam');
                spams.addClass('mw_spam');                  
            },
        };                    
    })();    
    var toggle = (function () {
        var shown = $('#mw_style').text(),
            regex = /(\{)([^\}]*?)[; ]*(\})/,
            hidden = shown.replace(regex,'$1$2; display:none;$3'),
            hide = false;
        
        return function () {            
            hide = !hide;
            $('#mw_style').text( (hide) ? hidden : shown );
            $('#mw_spam_state').text( (hide) ? 'Show ' : 'Hide ');
            GM_log(filter.count() + ' spams now ' + ((hide) ? 'hidden' : 'shown.'));
        };
    })();
    
    filter.markSpams();                     // initially spams are marked, but not hidden
    toggle();                               // here we hide them
    $('#mw_spam_button').click(toggle);     
    $('#home_left_column').get(0).addEventListener("DOMSubtreeModified", filter.markSpams, false);
});
    