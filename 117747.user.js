// ==UserScript==
// @name           Geocaching.com Update all cache Coordinates
// @namespace      geocaching.com
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// @include	http://www.geocaching.com/geocache/*
// ==/UserScript==

if (unsafeWindow.userDefinedCoords == undefined) {
    unsafeWindow.userDefinedCoords = {"status":'success',"data":{"isUserDefined":false,"oldLatLngDisplay":unsafeWindow.$('#uxLatLon').text()}};
    var lnk = unsafeWindow.$('<a href="#" class="edit-cache-coordinates" id="uxLatLonLink" title="Correct these coordinates"></a>');
    unsafeWindow.$('#uxLatLon').wrap(lnk);
    
    unsafeWindow.$('#uxLatLonLink').qtip({
                    suppress:false,
                    content: buildCacheCoordMenu(),
                    position: {
                        my: 'left top',
                        at: 'right top',
                        adjust: {
                            x: 10, y: -10
                        }
                    },
                    show: {
                        ready: false,
                        event: "click",
                        solo: true
                    }, hide: {
                        event: 'unfocus'
                    },
                    style: {
                        tip: {
                            corner: false
                        },
                        classes: 'ui-tooltip-widget'
                    },
                    events: {
                        show: function () {
                            if ($("#uxLatLon").data("isOverridden")) {
                                $("a.ccu-restore").show();
                            } else {
                                $("a.ccu-restore").hide();
                            }

                            if (userDefinedCoords.status != "success") {
                                $("div.ccu-update").hide();
                            } else {
                                $("div.ccu-update").show();
                            }
                        }
                    }
                }).click(function (e) {
                    e.preventDefault();
                    return false;
                });

}