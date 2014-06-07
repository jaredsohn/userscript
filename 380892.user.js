// ==UserScript==
// @name	Podgląd wszystkich powiadomień
// @namespace	http://userscripts.org/scripts/source/380892.user.js
// @author	bruce
// @description	Otwiera wszystkie nieprzeczytane powiadomienia pod linkami.
// @include	http://*.wykop.pl/powiadomienia*
// @downloadURL	http://userscripts.org/scripts/source/380892.user.js
// @version	1.4
// @grant	none
// @run-at	document-end
// ==/UserScript==

function main() {
    var button = '<a class="open" href="javascript: void(0)">podgląd nieprzeczytanych powiadomień <span id="loading" style="display:none;">(Proszę czekać.. <span id="percent">0</span>%)</span></a>';
    
    var loaded_elements = 0; /* The count of currently loaded elements */
    var elements_to_be_loaded = 0; /* All emelements that will be loaded*/
    
    $('div.newtagheader p.normal').prepend(button + " | ");

    $(".open").click(function () {
            
    	var prog_start = 0;
    	var prog_end = 100;
        
        // TEST
        // var unread_elements = $('.brbotte8:eq(1) > p > a:last-child');
        
        var unread_elements = $('.bgfbfbd3 > p > a:last-child');
        
        elements_to_be_loaded = unread_elements.length;
        
        if (elements_to_be_loaded > 0) {
            $('#loading #percent').html(0);
            $('#loading').show();
        }

        unread_elements.each(function () {
            var p = $(this).parent();
            
            $('<iframe class="mikro_ramka" style="width:100%; height:0px; float:left;"></iframe>').appendTo(p).load(function(){
                
                loaded_elements++;
                var percent = parseInt(loaded_elements/elements_to_be_loaded*100);
                
                if (percent < 100) $('#loading #percent').html(percent);
                else $('#loading').html('(Załadowano)');

                var activities = $(this).contents().find("#body-con section .scale");
                var iframe_height = activities.height();
                
                $(this).height(iframe_height+30);
                activities.parents('body').css('height' ,'auto');
                activities.attr('class', '');
                activities.attr('style', 'font-size:12px; text-align:left;');
                $(this).contents().find('body').html(activities);
                
                $(this).css({'float': ''}).show();
            });
            
            p.find('.mikro_ramka').attr('src', $(this).attr('href'));
        });
    });
}

if (typeof $ == 'undefined') {
    if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
        // Firefox
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        // Chrome
        addJQuery(main);
    }
} else {
    // Opera
    main();
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
