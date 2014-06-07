// ==UserScript==
//
// @name           ePVP Board Configuration
//
// @description    This userscript modifies the ePVP Forum and adds several functions
//
// @namespace      http://github.com/xyNNN
//
// @author         xyNNN
//
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
//
// @version        1.0
//
// @include        http://www.elitepvpers.com/forum/*
//
// @require        http://epvp.development.domainfactory-kunde.de/js/jquery-2.0.2.min.js
// @require        http://epvp.development.domainfactory-kunde.de/js/jquery-cookie.js
//
// @history        1.0 first version
//
// ==/UserScript==

/**
 * The main ePVP Board Configuration Object
 *
 * @author Philipp Bräutigam <developer@philipp-braeutigam.de>
 * @date 03.06.2013
 * @version 1.0
*/
;(function($) {

    $.ePVPBoardConfiguration = function(options) {

        // default plugin configuration
        var defaults = {

        }

        // self reference of the object
        var plugin = this;

        // settings
        plugin.settings = {

        }

        /**
         * Initalize the advanced user bar for the ePVP Board
         *
         * @return null
         */
        var init = function() {
            plugin.settings = $.extend({}, defaults, options);
            console.log('ePVP: initialize ePVP Board Configuration');
        }

        // initialize the object
        init();
    }

})(jQuery);


/**
 * The main ePVP Board Configuration Object
 *
 * @author Philipp Bräutigam <developer@philipp-braeutigam.de>
 * @date 03.06.2013
 * @version 1.0
 */
$(document).ready(function() {

    // load the correct language files
    console.log($.cookie('bblanguageid'));

    // check if a cookie is set and is a valid user session
    if(1 === 1) {
        // create a new instance of the plugin
        var boardConfiguration = new $.ePVPBoardConfiguration();

    }

});
