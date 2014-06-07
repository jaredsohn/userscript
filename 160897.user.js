// ==UserScript==
// @name         Youtube - Playlist extend
// @namespace    http://eduardocuomo.com.ar/
// @version      1.1
// @description  Add extra funcions to Youtube Playlists.
// @match        http://www.youtube.com/*
// @copyright    2013+, Eduardo Daniel Cuomo <eduardo.cuomo.ar@gmail.com>
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

var URL_TRK = "/watch?v=",
    URL_PL = "/playlist?list=PL", // http://www.youtube.com/playlist?list=PL
    URL_PL_PARAM_EDIT = "action_edit=1",
    ID_MENU = "red7-menu-actions";

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')()';
    document.body.appendChild(script); // Exec script
    //document.body.removeChild(script); // Remove
}

(function(jQuery) {
    exec(function() {
        var input = document.createElement('input');
        input.setAttribute("type", "hidden");
        input.setAttribute("id", "red7YT");
        input.setAttribute("value", yt.tokens_.addto_ajax);
        document.body.appendChild(input);
    });
    
    function deleteMenu() {
        jQuery("#" + ID_MENU).remove();
    }
    
    function getAjaxToken() {
        return $('#red7YT').val();
    }
    
    jQuery(function() {
        function renderMenuItem(text, action) {
            var ac = action;
            return jQuery('<li></li>').append(
                jQuery('<a href="javascript:void(0)"></a>')
                .html(text)
                .click(function(evt) {
                    evt.preventDefault();
                    ac(this, evt);
                    deleteMenu();
                    return false;
                })
            );
        }
        
        function createMenu() {
            return jQuery('<ul></ul>')
            .attr('id', ID_MENU)
            .css({
                'position' : 'relative',
                'background' : '#CCCCCC',
                'width' : '90%',
                'margin' : 'auto',
                'list-style' : 'none'
            })
            ;
        }
        
        function renderMenuPL(e, evt, pl_id) {
            evt.preventDefault();
            deleteMenu();
            
            // Generate menu
            var menu = createMenu()
            .append(renderMenuItem('Open PlayList', function(e, evt) {
                window.open(URL_PL + pl_id);
            }))
            .append(renderMenuItem('Edit PlayList', function(e, evt) {
                window.open(URL_PL + pl_id + "&" + URL_PL_PARAM_EDIT);
            }))
            ;
            
            jQuery(e).append(menu);
            
            return false;
        }
        
        function renderMenuTrk(e, evt, trk_id, trk_name) {
            evt.preventDefault();
            deleteMenu();
            var id = trk_id,
                el = e;
            
            // Generate menu
            var menu = createMenu()
            .append(renderMenuItem('Open Track', function(e, evt) {
                window.open(URL_TRK + trk_id);
            }))
            ;
            
            if (jQuery('#watch7-playlist-data a[href="/my_watch_later_videos"]:visible').length > 0) {
                // Watch later
                menu.append(renderMenuItem('Remove Track from PlayList', function(e, evt) {
                    if (confirm("Delete track '" + trk_name + "' from current PlayList?")) {
                        jQuery.post(
                            "/addto_ajax?action_delete_from_watch_later_list=1",
                            {
                                session_token : getAjaxToken(),
                                video_ids : id
                            }
                        );
                    } else {
                    }
                    el.remove();
                }));
            }
            
            // Add to favorite
            menu.append(renderMenuItem('Add to Favorites', function(e, evt) {
                if (confirm("Add track '" + trk_name + "' to favorites PlayList?")) {
                    jQuery.post(
                        "/addto_ajax?action_add_to_favorites=1",
                        {
                            session_token : getAjaxToken(),
                            video_ids : id
                        }
                    );
                } else {
                }
                el.remove();
            }));
            
            jQuery(e).append(menu);
            
            return false;
        }
        
        // Delete menu
        jQuery(document).bind("click keyup", function() {
            deleteMenu();
        });
        
        // Bottom Playlist
        jQuery(".playlist-items li.playlist-item").live('contextmenu', function(evt) {
            var pl_id = jQuery("form input[name='playlist_id']", this).val();
            return renderMenuPL(this, evt, pl_id);
        });
        
        // Right Playlist
        jQuery("#watch7-playlist-tray li").live('contextmenu', function(evt) {
            var a = jQuery('a:first', this),
                href = a.attr('href'),
                trk_id = href.substr(href.indexOf("v=") + 2);
            
            if (trk_id.indexOf("&") > -1) {
                trk_id = trk_id.substr(0, trk_id.indexOf("&"));
            }
            
            renderMenuTrk(this, evt, trk_id, a.attr('title'));
            
            // http://www.youtube.com/addto_ajax?action_add_to_watch_later_list=1
            //session_token:HtF5eaLpMsVw4IpjLFAeemSZoDN8MTM2MjQ5MDgwOUAxMzYyNDA0NDA5
            //video_ids:PKtrE1x4Pvw
            
            //http://www.youtube.com/addto_ajax?action_delete_from_watch_later_list=1
            //session_token:HtF5eaLpMsVw4IpjLFAeemSZoDN8MTM2MjQ5MDgwOUAxMzYyNDA0NDA5
            //video_ids:PKtrE1x4Pvw
        });
        
        // Confirm add to PlayList
        //jQuery(".playlist-items li").live('click', function(evt) {
        //});
    });
})(jQuery);

/**
* CSS Styles
*/
var menuSelector = "#" + ID_MENU;
GM_addStyle(
    menuSelector + " a:HOVER {color: #FFFFFF;}"
);
