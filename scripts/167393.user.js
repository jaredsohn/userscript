// ==UserScript==
// @name        MyAnimeList (MAL) Hide User Posts
// @namespace   http://rainulf.ca/userscripts
// @description Annoying user posts? Block / hide them!
// @include     http://*myanimelist.net/forum/?topicid=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @require     https://raw.github.com/rainulf/mal-hide/master/GM_config.js
// @downloadURL https://raw.github.com/rainulf/mal-hide/master/.user.js
// @updateURL   https://raw.github.com/rainulf/mal-hide/master/.user.js
// @grant       none
// @version     1.0
// ==/UserScript==

$.noConflict();

GM_config.init("MAL Hide User Posts - Settings", {
    'blockedUsers': {
        'section': ['Hide user posts', 'Enter one user per line please?'],
        'type': 'textarea',
        'default': '',
        'cols': 20,
        'rows': 10
    }
});



var malHide = (function() {
    var blockedUsers = [], hiddenPosts = 0
      , // -->

    Init = function() {
        var confText = GM_config.get('blockedUsers');
        blockedUsers = confText.split("\n");
        
        jQuery("#myanimelist").append(jQuery("<div></div>")
                .attr("id", "malHideButtons")
                .attr("style", "position:fixed;bottom:0;right:0;"));

        jQuery("#malHideButtons").append(jQuery("<button></button>")
                .attr("class", "inputButton")
                .text("MAL Hide Settings")
                .click(function(){
                    GM_config.open();
                })
        );

        hidePosts();
    },

    isBlocked = function(username) {
        var i = 0;

        for(i in blockedUsers) {
            if(blockedUsers[i] === username) {
                return true;
            }
        }
        return false;
    },

    hidePosts = function() {
        jQuery(".forum_border_around").each(function(index){
            var currentUsername = "";

            currentUsername = jQuery("table tr:eq(1) td div a strong", this).text();
            if(isBlocked(currentUsername)) {
                hiddenPosts++;
                jQuery(this).attr("class", "toHide");
                jQuery(this).toggle();
                jQuery("table tr:eq(1) *", this).css("background-color", "#808080");
            }
        });

        if(hiddenPosts > 0) {
            jQuery("#malHideButtons").append(
                    jQuery("<button></button>")
                    .attr("class", "inputButton")
                    .text("Toggle " + hiddenPosts + " hidden post" + (hiddenPosts > 1 ? "s" : ""))
                    .click(function(){
                        jQuery(".toHide").toggle();
                    })
            );
        }
    }; // <--

    return {
        init: Init
    }
})();

jQuery(document).ready(function() {
    malHide.init();
});

