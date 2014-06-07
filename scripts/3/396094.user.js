// ==UserScript==
// @name        VKSLayer
// @namespace   *
// @include     http://vk.com/*
// @include     https://vk.com/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://andrewdunai.com/files/prng4.js
// @require     http://andrewdunai.com/files/rng.js
// @require     http://andrewdunai.com/files/jsbn.js
// @require     http://andrewdunai.com/files/jsbn2.js
// @require     http://andrewdunai.com/files/rsa.js
// @require     http://andrewdunai.com/files/rsa2.js
// @require     http://andrewdunai.com/files/base64.js
// @require     http://andrewdunai.com/files/rsasync.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==

if(window.top != window.self) {
    return;
}

this.$ = this.jQuery = jQuery.noConflict(true);

window.vksl = {
    init: function() {
        $(window).keypress(function(e) {
            if(e.ctrlKey && e.shiftKey && ((e.keyCode || e.which) == 86 || (e.keyCode || e.which) == 118)) {
                window.vksl.patch();
                return false;
            } else if(e.keyCode == 27) {
                return false;
            }
        });
        window.vksl.notify('VKSL loaded.', true);
    },
    notify: function(msg, success) {
        if(!$('.vksl-area').length)
        {
            var area = $('<div/>')
                .addClass('vksl-area')
                .css({
                    position: 'fixed',
                    top: 10,
                    right: 10,
                    width: 200,
                })
                .appendTo($('body'))
            ;
        }
        var msg = $('<div/>')
            .css({
                display: 'block',
                background: '#CCC',
                color: '#333',
                border: '1px solid #BBB',
                borderRadius: 3,
                marginBottom: 5,
                overflow: 'hidden',
                cursor: 'pointer',
                color: success ? '#007700' : '#770000',
            })
            .append($('<div/>')
                .html(msg)
                .css({
                    padding: 10,
                    borderRadius: 3,
                })
            )
            .fadeIn(500)
            .appendTo($('.vksl-area'))
            .click(function(){
                $(this)
                    .animate({
                        opacity: 0,
                        height: 0,
                        marginBottom: 0,
                    }, 500, function(){
                        $(this).remove();
                    })
                ;
            })
        ;
        window.setTimeout(function(){
            msg.click();
        }, 5000);
    },
    patch: function() {
        var match = /sel=([0-9]+)/gi.exec(window.location);
        if(!match) {
            window.vksl.notify('Failed to patch, are you on chat page?');
            return;
        }
        var chat_id = match[1];
        var editable = $('#im_editable' + chat_id);
        if(editable.hasClass('vksl-patched'))
        {
            window.vksl.notify('VKSL already patched for this chat!');
            return;
        }
//        $('.im_in .im_msg_text:not(.vksl-patched)').each(function() {
//            $(this).addClass('vksl-patched');
//        });
        $('html').on('keydown', '.im_editable.vksl-patched', function(e) {
            if(e.which == 13 || e.keyCode == 13) {
                return false;
            }
        });
        editable
            .addClass('vksl-patched')
            .css('border', '1px solid #AA0000')
            .keypress(function(e) {
                if(e.which == 13 || e.keyCode == 13) {
                    return false;
                }
            })
            .after($('<div/>')
                .append(
                    $('<div/>')
                        .css({
                            display: 'block',
                            padding: '5px 0 0',
                        })
                        .addClass('button_gray')
                        .append(
                            $('<button/>')
                                .css({
                                    display: 'inline-block',
                                    padding: '3px 5px',
                                })
                                .html('SEND ENCRYPTED')
                                .click(function() {
                                    if(window.vksl.their_key) {
                                        var data = editable.html();
                                        var encrypted = window.vksl.their_key.encrypt(data);
                                        editable.html('%m:' + encrypted);
                                        $('#im_send').click();
                                        window.vksl.outgoing.push(['msg', data]);
                                    }
                                    else {
                                        window.vksl.notify('ERROR: Partner\'s public key not yet received! Ask him to regenerate keys!');
                                    }
                                })
                            )
                    )
                .append(
                    $('<div/>')
                        .css({
                            display: 'inline-block',
                            padding: '5px 8px 0 0',
                        })
                        .html('Powered by VKSL.')
                    )
                .append($('<a/>')
                    .attr('href', '#')
                    .css({
                        fontWeight: 'bold',
                    })
                    .html('GENERATE KEYS NOW')
                    .click(function() {
                        var $that = $(this);
                        $that
                            .html('IN PROCESS...')
                            .css('pointer-events', 'none')
                        ;
                        window.vksl.key = new RSAKey();
                        window.vksl.key.generateAsync(512, "03", function(){
                            var pubKey = hex2b64(window.vksl.key.n.toString(16));
                            $that
                                .html('Regenerate public key')
                                .css('pointer-events', 'all')
                            ;
                            window.vksl.notify('Key regenerated!<br />Key: ' + window.vksl.key.n.toString(16) + '<br />Base64\'ed: ' + pubKey);
                            editable.html('%n:' + window.vksl.key.n.toString(16));
                            $('#im_send').click();
                            window.vksl.outgoing.push(['key', '&lt;PUBLIC KEY&gt;']);
                        });
                        return false;
                    })
                )
            )
        ;
        window.vksl.checkNewMessages(true);
        window.vksl.notify('<b>VKSL injected!</b>', true);
    },
    checkNewMessages: function(onlyKeys) {
        $('.im_in .im_msg_text:not(.vksl-patched)').each(function() {
            if($(this).html().indexOf('%n:') != -1) {
                var data = $(this).html().substr(3);
                window.vksl.their_key = new RSAKey();
                window.vksl.their_key.setPublic(data, '03');
                window.vksl.notify('Received partner\'s public key. You can now send messages.', true);
                $(this)
                    .html('&lt;PUBLIC KEY&gt;')
                    .css({
                        color: '#0000CC',
                        fontWeight: 'bold',
                    })
                ;
            }
            if(!onlyKeys) {
                if($(this).html().indexOf('%m:') != -1) {
                    var data = $(this).html().substr(3);
                    if(window.vksl.key) {
                        data = window.vksl.key.decrypt(data);
                        $(this)
                            .html(data)
                            .css({
                                color: '#CC0000',
                                borderLeft: '5px solid #CC0000',
                                paddingLeft: '5px',
                            })
                        ;
                    }
                    else {
                        window.vksl.notify('ERROR: No private key! Please regenerate keys!');
                    }
                }
            }
            $(this).addClass('vksl-patched');
        });
        $('.im_out .im_msg_text:not(.vksl-patched)').each(function() {
            if(!onlyKeys) {
                var msg = window.vksl.outgoing.shift();
                if(msg) {
                    $(this)
                        .html(msg[1])
                        .css(msg[0] == 'msg' ? {
                            color: '#CC0000',
                            borderLeft: '5px solid #CC0000',
                            paddingLeft: '5px',
                        } : {
                            color: '#0000CC',
                            fontWeight: 'bold',
                        })
                    ;
                }
            }
            $(this).addClass('vksl-patched');
        });
        window.setTimeout(window.vksl.checkNewMessages, 500);
    },
    key: null,
    their_key: null,
    outgoing: [],
};

(function() {
    window.vksl.init();
})();
