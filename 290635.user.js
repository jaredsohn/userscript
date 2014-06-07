// ==UserScript==
// @name        Linkomanija.net Watchlist
// @namespace   LM_Watchlist
// @include     http://www.linkomanija.net/browse.php*
// @include     http://www.linkomanija.net/torrents.php*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant  GM_xmlhttpRequest
// @grant  GM_getValue
// @grant  GM_setValue
// ==/UserScript==
jQuery.noConflict();

function _d(data) {
    console.log(data);
}

var Watchlist_Patterns = GM_getValue("Watchlist_Patterns", false);
var Watchlist_Enable = GM_getValue("Watchlist_Enable", true);
var Watchlist_Background = GM_getValue("Watchlist_Background", '#90EE90');
var container_bg = '#F2F7F8';

jQuery(document).ready(function() {

    try {
        // LM browse container
        var Container = jQuery('#content').find('table:eq(3)');
        if (Container.length <= 0) {
            // 5 zona container
            Container = jQuery('#content').find('table:eq(1)');
        }
        var Heading = Container.find('tr:eq(0)');

        if (Container.length > 0 && !Container.hasClass('bottom')) {
            // Settings container
            var Settings_container = jQuery('<div />')
                    .attr({
                        'id' : 'watchlist-settings-container'
                    })
                    .css({
                        'position' : 'absolute',
                        'background-color' : container_bg,
                        'width' : Heading.find('td:eq(1)').width() + Heading.find('td:eq(0)').outerWidth(true),
                        'margin' : '5px -5px',
                        'margin-left' : '-' + (Heading.find('td:eq(0)').outerWidth(true) + 5) + 'px',
                        'padding' : '3px 5px',
                        'padding-bottom' : '5px',
                        'border-top' : '1px solid #AACDED',
                        'border-bottom' : '1px solid #AACDED',
                        'display' : 'none'
                    })
                ;
            // Separator
            var Settings_separator = jQuery('<hr />').css({
                'border' : '0',
                'border-top' : '1px dotted #AACDED',
                'margin' : '2px 0'
            });

            // Enable watchlist checkbox
            Settings_container.append('<label for="Watchlist_Enable">Įjungti stebėjimą:</label>');
            Settings_container.append(jQuery('<input />')
                .attr({
                    'type' : 'checkbox',
                    'checked' : Watchlist_Enable,
                    'name' : 'Watchlist_Enable',
                    'id' : 'Watchlist_Enable'
                })
                .css({
                    'vertical-align' : 'middle'
                })
            );
            Settings_container.append(Settings_separator.clone());

            // Watchlist items backgound
            Settings_container.append('<label for="Watchlist_Background">Spalva:</label>');
            Settings_container.append(jQuery('<input />')
                .attr({
                    'checked' : Watchlist_Background,
                    'name' : 'Watchlist_Background',
                    'id' : 'Watchlist_Background'
                })
                .css({
                    'vertical-align' : 'middle',
                    'border' : '1px solid #AACDED',
                    'margin-left' : '5px',
                    'width' : '100px'
                })
                .val(Watchlist_Background)
            );
            Settings_container.append(Settings_separator.clone());

            // Patterns list
            Settings_container.append('<label>Pavadinimų sąrašas (<small>po vieną eilutėje</small>):</label><br />');
            var textarea = jQuery('<textarea />').attr({
                'name' : 'Watchlist_Patterns'
            })
                .css({
                    'display' : 'block',
                    'width' : '100%',
                    'height' : '200px',
                    'border' : '1px solid #AACDED',
                    'font-weight' : 'bold',
                    'padding' : '3px',
                    'box-sizing': 'border-box',
                    '-moz-box-sizing': 'border-box',
                    '-webkit-box-sizing': 'border-box'
                })
                .val('');
            if (Watchlist_Patterns instanceof Array) {
                textarea.val(Watchlist_Patterns.join('\n'));
            }
            Settings_container.append(textarea);
            Settings_container.append(Settings_separator.clone());

            // Save / Cancel buttons
            Settings_container.append(jQuery('<button />')
                .attr('id', 'watchlist-settings-submit')
                .css({'float' : 'right', 'margin-left' : '5px'})
                .text('Išsaugoti')
            );
            Settings_container.append(jQuery('<button />')
                .attr('id', 'watchlist-settings-cancel')
                .css({'float' : 'right'})
                .text('Atšaukti')
            );

            // Settings link
            var Settings_link = jQuery('<a />').text('Watchlist nustatymai').css({
                'cursor' : 'pointer',
                'float' : 'right',
                'display' : 'block',
                'padding' : '0 5px',
                'position' : 'relative',
                'margin-right' : '-5px'
            }).attr({
                    id : 'watchlist-settings-link'
                });


            // Append everyting to Headings
            Heading.find('td:eq(1)').append(Settings_link);
            Heading.find('td:eq(1)').append(Settings_container);

            // Search for patterns
            if (Watchlist_Enable && Watchlist_Patterns instanceof Array && Watchlist_Patterns.length > 0) {
                jQuery.each(Container.find('tr'), function() {
                    var el = jQuery(this);
                    var title = el.find('td:first-child + td > a').text().toLowerCase();
                    Watchlist_Patterns = Watchlist_Patterns.join('|').toLowerCase().split('|');
                    if( (new RegExp(  Watchlist_Patterns.join('|\\b') ) ).test(title) ){
                        el.find('td').css({'background-color' : Watchlist_Background});
                        el.find('td:first-child').css({'background-color' : 'transparent'});
                        var wl_rows = Container.find('tr.watchlist-row');
                        el.addClass('watchlist-row');
                        if (wl_rows.length > 0) {
                            el.insertAfter(wl_rows.last());
                        } else {
                            el.insertAfter(Heading);
                        }
                    }
                });
            }

            // Toggle show settings
            jQuery('#watchlist-settings-link').on('click', function() {
                var link = jQuery(this);
                if (jQuery('#watchlist-settings-container').is(':hidden')) {
                    link.css('text-decoration' , 'underline');
                }
                else { link.css('text-decoration' , '') }
                jQuery('#watchlist-settings-container').slideToggle( "fast" , function() {
                    jQuery("#watchlist-settings-container textarea[name='Watchlist_Patterns']").focus();
                });
            });


            // Save settings
            jQuery('#watchlist-settings-submit').on('click', function(e) {
                e.preventDefault();
                var enable = jQuery("#watchlist-settings-container input[name='Watchlist_Enable']").is(':checked');
                var patterns = jQuery("#watchlist-settings-container textarea[name='Watchlist_Patterns']").val().split('\n').filter(function(n){return n});
                var background = jQuery("#watchlist-settings-container input[name='Watchlist_Background']").val();
                GM_setValue("Watchlist_Patterns", patterns);
                GM_setValue("Watchlist_Enable", enable);
                GM_setValue("Watchlist_Background", background);
                jQuery('#watchlist-settings-container').slideToggle( "fast", function() {
                    jQuery('#watchlist-settings-link').css('text-decoration', 'none');
                    location.reload();
                });
            });

            // Cancel button
            jQuery('#watchlist-settings-cancel').on('click', function(e) {
                e.preventDefault();
                jQuery('#watchlist-settings-container').slideToggle( "fast" );
                jQuery('#watchlist-settings-link').css('text-decoration', 'none');
            });
        }

    } catch (e) {
        _d('Error with Greasemonkey Watchlist userscript: '+e);
    }

});
