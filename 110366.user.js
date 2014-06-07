// ==UserScript==
// @name			Wowhead - Update Avatar Icon From Anywhere
// @namespace			RVCA18
// @description			Adds the ability to set an icon as your avatar from any icon dialog box
// @include			http://*.wowhead.com/*
// @exclude			https://*.wowhead.com/account#community
// @exclude                     http://*.wowhead.com/user=*
// @version			1.0.7.1
// ==/UserScript==


function WH_UPDATE_AVATAR_ANYWHERE(f) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = '(' + f.toString() + ')(jQuery)';
    document.body.appendChild(script);
}

WH_UPDATE_AVATAR_ANYWHERE(function ($) {
    //--------------------------------------------------------------
    //setup initial bind to icon dialog click source
    $('div.iconsmall, div.iconmedium, div.iconlarge').click(function () {
    });

    //--------------------------------------------------------------
    function create_update_elements() {
        var original_icon, dialog_icon_bg = $('div.dialog div.iconlarge ins').css('background-image'),

            //create a status container
            status_container = $(document.createElement('div')).attr('id', 'wowicon-status').css({
                'width': '100%',
                'text-align': 'right',
                'position': 'absolute',
                'top': '22px',
                'right': '25px'
            }),

            //create update avatar button
            new_button = $(document.createElement('div')).text('Update Avatar: ').attr('id', 'wowicon-update-container').css({
                'text-align': 'right',
                'margin': '5px 0 0 0',
                'padding': '0px',
                'height': '21px'
            }).append($(document.createElement('input')).attr({
                'id': 'wowicon-submit',
                'type': 'button',
                'value': 'Submit'
            }).click(function () {
                    //clear status & disable submit
                    $('#wowicon-status').empty();
                    $('#wowicon-submit').attr('disabled', 'true');
                    //set status as loading
                    $('#wowicon-status').css({
                        'color': '#d0a530',
                        'font-weight': 'bold',
                        'font-size': '11px'
                    }).text('Updating Avatar ').append($(document.createElement('img')).attr('src', 'http://i.imgur.com/wSLDZ.gif').css({
                        'position': 'relative',
                        'top': '3px'
                    }));
                    //automagically set avatar... or stand in the fire
                    $.ajax({
                        //$('pseudo:validation').contains('lawl').text('ps used small icon for less server load')
                        url: 'http://static.wowhead.com/images/wow/icons/small/' + $('input[name="icon"]').val() + '.jpg',
                        success: function () {
                            //okay maybe not so magical
                            $(document.createElement('iframe')).css('display', 'none').attr({
                                'id': 'wowicon-frame',
                                'src': 'https://www.wowhead.com/account=forum-avatar?avatar=1&wowicon=' + $('input[name="icon"]').val()
                            }).insertAfter($('#wowicon-update-container')).load(function () {
                                    $(this).remove();
                                    $('#wowicon-status').text('Your avatar has been updated sucessfully').css('color', '').attr('class', 'msg-success');
                                    //re-enable submit
                                    $('#wowicon-submit').removeAttr('disabled');
                                });
                        },
                        error: function () {
                            $('#wowicon-status').text('Icon not found.').css('color', '').attr('class', 'msg-failure');
                            //re-enable submit
                            $('#wowicon-submit').removeAttr('disabled');
                        }
                    });
                }));

        //remove dialog icon's ins and replace with div (ins was breaking script on click)
        $('div.dialog div.iconlarge ins').remove();
        $('div.dialog div.iconlarge').append($(document.createElement('div')).css({
            'background-image': dialog_icon_bg,
            'background-repeat': 'no-repeat',
            'display': 'block',
            'position': 'absolute',
            'z-index': 5,
            'height': '56px',
            'width': '56px',
            'top': '6px',
            'left': '6px'
        }));

        //reassign input to original icon name when clicked (the same feature as ins)
        $('div.dialog div.iconlarge a').click(function () {
            original_icon = $('div.dialog div.iconlarge div').css('background-image');
            original_icon = $.trim(original_icon.substring(original_icon.indexOf('http') + 26, original_icon.indexOf('.jpg')).replace(/.*\/(small|medium|large)\/(.*)/g, '$2'));
            $('input[name="icon"]').val(original_icon);
        });

        //add status container
        $('h1:contains("Icon")').append(status_container);

        //only show update button if player is signed in
        if ($('#toplinks-user').length) {
            $('div.dialog input[name="icon"]').after(new_button);
        } else {
            $('#wowicon-status').css('font-size', '11px').append($(document.createElement('a')).attr('href', 'https://www.wowhead.com/account=signin').text('Sign in')).append(' to update your avatar from here');
        }

        //adjust some design stuff
        $('div.dialog div.iconlarge').parent().css('top', '-7px');
    }

    //--------------------------------------------------------------
    //listens for lightbox dialog creation
    $('body').bind('DOMSubtreeModified', function () {
        if ($('div.lightbox-outer').length) {
            //unbind from body since the lightbox is now in dom
            $('body').unbind();
            //add to initial icon dialog's bind
            $('div.iconsmall, div.iconmedium, div.iconlarge').click(function () {
                create_update_elements();
            });
        }
    });


    //--------------------------------------------------------------
    //check for updates
    var userscript = '110366',
        version = '1071',
        imagelocation = 'left -56px';
    $.ajax({
        url : 'http://query.yahooapis.com/v1/public/yql/RVCA18/userscriptVersion?userscript=' + userscript,
        success : function(scriptversion) {
            var _update_table = ''
                + '<div id="userscript-update" style="position: fixed; bottom: 0; left: 50px; border: 1px solid #FF8000; border-bottom: none; border-radius:2px; -webkit-border-radius: 2px; -moz-border-radius: 2px;">'
                + '<table style="border-collapse: collapse;"><tbody></tbody></table>'
                + '</div>',
                _update_btn = ''
                    + '<tr><td style="width: 297px; border-bottom: 1px solid #404040; background: url(\'http://i.imgur.com/3XiBs.png\') ' + imagelocation + '">'
                    + '<a href="http://userscripts.org/scripts/source/' + userscript + '.user.js" target="_self"><img src="http://i.imgur.com/L7wtF.gif" style="margin-bottom:-4px; height:26px; width:100%"/></a>'
                    + '</td></tr>';

            //append update alert
            scriptversion = $.trim($(scriptversion).find('results').text()).replace(/\./g, '');
            if (version < scriptversion) {
                if ($('#userscript-update').length == 0) {
                    $('body').append(_update_table);
                }
                $('#userscript-update table tbody').append(_update_btn)
            }
        }
    })
});