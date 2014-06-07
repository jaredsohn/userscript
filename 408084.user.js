// ==UserScript==
// @name        Grepolis QuickBar
// @namespace   Raid
// @description Bottom Quickbar for Grepolis 2.0 
// @include     http://*.grepolis.*/game*
// @icon        http://s3.amazonaws.com/uso_ss/icon/408084/large.png?1394391640
// @grant metadata
// @version     0.1.65
// ==/UserScript==

var uwd = unsafeWindow || window, $ = uwd.jQuery, GQB = {
    loaded: false,
    load: function() {
        if (!GQB.loaded && typeof uwd.GameData != "undefined") {

            $('#ui_box').append(
                $('<div id="gqb_bottom_quickbar" style="position: absolute; left:0; bottom: 0; width:100%; z-index: 5;background-color:rgba(127,127,127,0.3);" />').append(
                    '<div class="gqb_links_wrapper" style="color: #ECB44D; cursor: pointer; font-size: 10px; font-weight: 700;text-shadow:0 0 2px #000000;padding:4px 30px;" />'
                )
            );
            var letters = [], num = 1;
            for (var b in uwd.GameData.buildings) {
                var label = uwd.GameData.buildings[b].name.trim(), ak = null;
                for (var l in label) {
                    var s = new String(label.charAt(l)).toUpperCase();
                    if (-1 == letters.indexOf(s)) {
                        letters.push(s);
                        ak = s;
                        break;
                    }
                }

                if (null != ak) {
                    var j = label.toUpperCase().indexOf(ak.toUpperCase());
                    label = label.substr(0, j) + '<span style="text-decoration:underline;">' + label.substr(j, 1) + '</span>' + label.substr(j + 1);
                } else {
                    ak = new String(num++);
                }

                $('.gqb_links_wrapper').append($('<span class="gqb_link" rel="barracks" accesskey="' + ak.toLowerCase() + '" title="Accesskey: ' + ak + '" style="margin:5px 10px;float:left;">' + label + '</span>').attr('rel', b));
            }
            
            $('.gqb_links_wrapper').append('<span class="gqb_link" accesskey="." title="Accesskey: ." id="gqb_toggle_ui" style="margin:2px 10px;position:absolute;top:0;left:0;line-height:22px;text-indent:-50000px;width:22px;height:22px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA2dJREFUSEvFldlKm1EUhZOYuSaS4c9kbE3rmAFJRW1MotEStEGiUcRWEwPthb6Ab6CCeOWFIHjvCwj6APpg/VaGWrFpaW+6YXH2mdZZe599/t/03yydTpsqlYr36OhouFqtDsViMU8ymezM/oM9PDyEbm9vty8uLvZPTk42Dw8PFxuNRj6bzS44HI4iyHq93oHO8j9bJpMx3d/fl8/Pzz+bzeYEQzEQBkYHIRABr/v6+uZcLlfK4/GY6fc2kd7c3GxsbW3N0xVhEPh7IADCHD7hdDpnbTZbb/LLy8vC+vq6SKNAG/2oGQoGg/NsXiH8VRTmwZvuPAhCPs78e/yX5PV6feDg4GADV0oDVqs1mEgkSpB+ZeMWY2VQwl9B3Q7kixaLRWkRuaG0cHAc/7nVarViJ6dSEEDpMgt36eeAcuoCNuAEBgcXmF+SD0Qe48CPtFrTtlQqZXK73Yu4SoGf00dBAz8bCoXcd3d3tdPT010qokzIU4ZhWJiz2e32OVSn8JWWAMTLiJKItrHQw8CcXOBnwSqt1LghrE5OTqbxlSJhBKVaa2GPnbUS1NpHf4q+5tq5Jmwp1WZVgfKrnI5HIhELkSzj/7hMYLBZuW4pQ/UMTStSMNoRZQUtYilRSCIOQlyjjcXjcbNI8LuXJChkjWWBGeJpWu3X3Ah7q7R2wMpAYAAFOrmlmI2faLXYRNgFFr/WOPBDFGPsC/4U42a/31/Al3qlIs3YGn6bmKdpgWwBt6WMC8lAoLo0sTAE0QaXtqxKiUajTeYVUeT4+Hgsl8t9wO/ejdJW1DbQNt0wJ6oOFVIIwhL59eHrIjSuS6oAXWri+vraODs7k3LNBdirEtzBz4Cnh0LBR5mYxe0+40H6ecgT4XBY5aXwXvX39zsfHx/zV1dXDciGu+tRO00kItZ35ZlZCHkBshH8bgUodxM+n6/YbDZXCb3G166xubmpkpLSFimihiHex1danh5I11DghXyNtLyj2yVXKxUqKV2oDlNOW/NcfAI08Vc6Y782yMMQb6BiBvUiFPkLsMbgWzLLy/xGX1U0CHp/4TBNBnnSZdRvc8ASbZJQ34IEOZ/gpS5BWMfXs1dNS8BvSX82fWyUkhKHbINdsEcUe4ytaxyMATf4a5MKXYZ+QcqtwlWuVYYO0EOlyfQdliVyoOm9VEcAAAAASUVORK5CYII=);" accesskey=".">ToggleUI</span>');
            
            $('#gqb_toggle_ui').bind('click.gqb', function(){
                $('#ui_box > div').not('#main_area, #gqb_bottom_quickbar, .btn_close_all_windows').toggle();
            });

            $('.gqb_link').bind('click.gqb', function() {
                if ($(this).attr('rel') && $(this).attr('rel') in uwd.GameData.buildings) {
                    uwd.BuildingWindowFactory.open($(this).attr('rel'));
                }
            }).hover(function() {
                $(this).css('text-decoration', 'underline');
            }, function() {
                $(this).css('text-decoration', 'none');
            });


            GQB.loaded = true;
        }
    }
};


$(document).ajaxComplete(GQB.load);