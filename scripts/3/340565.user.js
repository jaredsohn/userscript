// ==UserScript==
// @name       YnS improve
// @namespace  MARCO_A
// @version    0.4
// @description  adds missing features to YnS
// @include      http://yume-no-sekai.eu/*
// @include      http://www.yume-no-sekai.eu/*
// @run-at document-end
// @require http://code.jquery.com/jquery-2.1.0.min.js
// downloadURL http://userscripts.org/scripts/source/340565.user.js
// updateURL http://userscripts.org/scripts/source/340565.meta.js
// @copyright  2014+, マルコ
// ==/UserScript==

// WBB is shit and uses its own crap, so we will have to make jQuery compatible
$.noConflict();
var jq = jQuery;

jq(document).ready(function() {
    
    // Spoiler fix
    jq(document).on('click', '.jsSpoiler', function() {
        
       jq(this).children('.quoteBody').stop().toggle(500); 
    });
    
    
    // Aditional tags
    jq('.messageBody').each(function(i,e) {
         
        // HR
        jq(e).html(jq(e).html().replace(/\[HR\]\[\/HR\]/gi, '<hr>'));
        
        // NicoNico JP
        jq(e).html(jq(e).html().replace(/\[video\]http:\/\/www\.nicovideo\.jp\/watch\/(.*?)\[\/video\]/gi, '<script type="text/javascript" src="http://ext.nicovideo.jp/thumb_watch/$1?w=490&h=307"></script>'));
    });
    
    jq('.messageBody hr').css('display','block','important');
    
    
    // Outgoing links in new tab
    jq(document).on('click', 'a', function(e) {
     
        ref = jq(this).attr('href');
        if(!ref.match(/yume-no-sekai\.eu/i) && !ref.match(/^index\.php/i) && !ref.match(/^javascript:/i)) {
            
            e.preventDefault();
            window.open(ref);
        }
    });
    
    
    // Head menu fix
    jq('#userMenu ul')
    	.css('bottom','-18px')
    	.css('right','3px');
    
    
    jq('#userMenu ul li')
    	.css('float','left');
    
    jq('.mainHeadline').css('marginLeft','2px');
    jq('#userNote').css('paddingLeft','2px');
    jq('#search').css('marginRight','242px');
    jq('#userAvatar img').css('left','774px');
    jq('.headlineContainer h2').css('marginBottom','20px');
    
    
    // Improved group colors
    jq('.buddy').css('fontWeight','bold');
    
    
    // Nice patterns
    var stripesW = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAP0lEQVQYV2NkIAL8//9fkpGQOrAiRsbneBXCFIEMw6kQWRFOheiKsCrEpghDIS5FKArxKYIrJKQIrJAYRSCFAKEJJyGkfwClAAAAAElFTkSuQmCC)';
    var stripesR = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAPUlEQVQYV2NkIAL8Z2DwYSSkDqpoC16FMEUgw3AqRFaEUyG6IqwKsSnCUIhLEYpCfIrgCgkpAiskRhFIIQDwKhNWG6f5OAAAAABJRU5ErkJggg==)';
    var crossesW = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQklEQVQYV2P8//+/JCMj43MGPACsBiSPTzFMDqwQl2JkA+AK0RWj24KiEKYYRKO7mzyFyNbhtBqbzzE8Q1TwEBvgADC3RjcXfBsqAAAAAElFTkSuQmCC)';
    
    jq('.messageInner, .container-1').css('backgroundImage',stripesW);    
    jq('.container-1').css('backgroundRepeat','repeat');    
    jq('.error').css('backgroundImage',stripesR).css('backgroundRepeat','repeat');
    
    jq('#shoutboxContent').css('backgroundImage','none');
    
    
    // Better error messages
    jq('.error').css('fontWeight','bold');
});
