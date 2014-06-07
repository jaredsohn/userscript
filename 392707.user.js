// ==UserScript==
// @name AMS Ad Configuration Quicky
// @namespace http://rya.rockyou.com/adsdashscripts
// @description set options for ad configurations
// @grant none
// @include     /^https:..ams\.rockyou\.com.ams.(.+).builder.\?adTypeId/
// @include     /nterstitial/
// ==/UserScript==
// 

// console.info("Loading grease monkey script");
if( ! window.AmsLibrary ) {
    var AmsLibrary = new (function(win) {
        // console.info("Loading AmsLibrary");
        var self = this;
        var w = win;
        var menuId = "AmsLibrary-menu-object";
        var type = "interstitial";
        var $menuObj = null;

        this.SetMediabrixScheme = function() {
            // alert("SetMediabrixScheme");
            var color = "rgba(200,200,200,0)";
            var elementsList = { 'interstitial' : ['INPUT#external_content_unit_headerTextColor', 
                                                   'INPUT#external_content_unit_unitBorderColor',
                                                   'INPUT#external_content_unit_unitInnerBorderColor',
                                                   'INPUT#external_content_unit_unitBgColor',
                                                   'INPUT#external_content_unit_inactiveCloseBtnBgColor',
                                                   'INPUT#external_content_unit_inactiveCloseBtnTextColor',
                                                   'INPUT#external_content_unit_closeBtnBgColor',
                                                   'INPUT#external_content_unit_closeBtnTextColor',
                                                   'INPUT#external_content_unit_closeBtnCountdownTextColor'
                                                   ] };
            var elements = elementsList[type];
            for( index in elements ) {
                // console.error("Walking elements " + elements[index]);
                var selector = elements[index];
                $(selector).val( color );
            }
        };

        var createMenuObject = function() {
            if( $( "#" + menuId ).length != 0 ) {
                return false;
            }
            $menuObj = $('<div>',{id:menuId});
            $menuObj.css( {position : 'fixed', top : '10px', left : '10px', margin : '1px', backgroundColor : '#ccc'} );
            return true;
        };

        var actions = [
            { ads: /interstitial/i, type: "<button>", onclick: this.SetMediabrixScheme, text: "Mediabrix" }
        ];

        var createClosure = function(event) {
            var e = event;
            return function() {e();};
        };

        var initialize = function(){   // Initialize menu items
            // console.info("Jquery is loaded : " + $.fn.jquery + " " + document.location);
            var matches = /ams.rockyou.com.ams.([^\/]+).builder./i.exec(document.location);
            type = matches[1];
            if( createMenuObject() ) {
                // alert("Loading actions");
                for( i in actions ) {
                    var action = actions[i];
                    if( action.ads.test(type) ) {
                        // console.warn( "Action ("+i+") " + action.type );
                        $menuObj.append($(action.type, { text: action.text, onclick: createClosure(action.onclick) }));
                    }
                }
                $('body').prepend($menuObj);
            }
        };

        initialize();
    })( window );
}