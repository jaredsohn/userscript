// ==UserScript==
// @name			BYOB: the Script
// @version			0.3.4
// @description		Does a bunch of stuff to BYOB
// @include			http://forums.somethingawful.com/*.php*
// @include			http://forums.somethingawful.com/
// @require         https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_log
// @updateURL		https://gist.githubusercontent.com/eclecto/9663576/raw/8c9199d92576b783671c1bf90263735b01ec9148/byob.user.js
// @copyright		2014+, Jett
// ==/UserScript==

(function($) {    
    $(document).ready(function() {
        GM_config.init({
            'id': 'GM_config',
            'title': 'BYOB Settings',
            'fields':
            {
                // Aesthetic/fixes/visual customization
                'spacing': {
                    'label': 'Line Spacing:',
                    'section': ['Aesthetic', 'Fix or customize the style of the BYOB pages'],
                    'type': 'float',
                    'default': 1.25,
                    'title': 'BYOB\'s line spacing is currently set to exactly character height. This setting will let you give that poor text some space.'
                },
                'color': {
                    'label': 'Text Color:',
                    'type': 'text',
                    'default': '#111111',
                    'title': 'Use any valid CSS3 color value.'
                },
                'quote_color': {
                    'label': 'Quote Color:',
                    'type': 'text',
                    'default': '#444444',
                    'title': 'Use any valid CSS3 color value.'
                },
                'bc_color': {
                    'label': 'Breadcrumb Color:',
                    'type': 'text',
                    'default': '#003366',
                    'title': 'Use any valid CSS3 color value.'
                },
                'chilled': {
                    'label': 'Chilled By:',
                    'type': 'checkbox',
                    'default': true,
                    'title': 'Replaces "Killed By" with "Chilled By"'
                },
                'byobuttons': {
                    'label': 'BYOButtons:',
                    'type': 'checkbox',
                    'default': true,
                    'title': 'Much more chill Report, Edit, and Quote buttons'
                },
                'background': {
                    'label': 'Background:',
                    'type': 'radio',
                    'options': ['Default', 'Cat only','Lasers only','Cat and lasers'],
                    'default': "Default",
                    'title': '"Default" uses the white background on other forums when you select "BYOBScript is leaking."'
                },
                'imagespam': {
                    'label': 'Prevent Image Spam:',
                    'type': 'checkbox',
                    'default': true,
                    'title': 'Attempts to prevent image spam by blocking multiple references to the same image.'
                },
                
                // "Wacky" stuff
                'quokka': {
                    'label': 'Quokkaquote:',
                    'section': ['"Funny"', 'Do amusing or "random" things to BYOB.'],
                    'type': 'checkbox',
                    'default': false,
                    'title': 'Replaces the quote button with a quokka.'
                },
                'hammocktar': {
                    'label': 'Everyone is a Cat:',
                    'type': 'checkbox',
                    'default': false,
                    'title': 'Replaces all avatars with Hammock Cat.'
                },
                'joint': {
                    'label': 'BYOB is a Cool Joint:',
                    'type': 'checkbox',
                    'default': false,
                    'title': 'Whoa, like, man.'
                },
                'zboe': {
                    'label': 'Z-Boe 2.0:',
                    'type': 'checkbox',
                    'default': false,
                    'title': 'Makes one of BYOB\'s best posters even better!'
                },
                'leaking': {
                    'label': 'BYOBScript is Leaking:',
                    'type': 'checkbox',
                    'default': false,
                    'title': 'Applies the settings here anywhere on SA.'
                },
                'byobleaking': {
                    'label': 'BYOB is Leaking:',
                    'type': 'checkbox',
                    'default': false,
                    'title': 'Adds the BYOB stylesheet to all forums.'
                }
            },
            'events': {
                'save':  function() { window.location.reload(); },
            }
        });
        
        
        // Remember whether we are browsing in BYOB or not.
        var isByob = $('body').hasClass('forum_268');
        
        // Create a button to open the settings dialog.
        var byoButton = $('<div style="position:fixed; top:0; right:0; padding:.5em">'
                          +'<a href="#" style="display:block; width:82px; height:19px; background-image: url(\'http://i.imgur.com/pYwt5sf.gif\'); background-repeat:no-repeat; text-decoration:none">'
                          +'&nbsp;</a></div>').appendTo('body');
        byoButton.find('a').click(function() {GM_config.open();});

        // If BYOB is leaking, add the stylesheet to other forums
        if(!isByob && GM_config.get('byobleaking')) {
            $('link:last').after('<link rel="stylesheet" type="text/css" href="/css/byob.css?1348360344">');
        }
        
        // Apply all active settings if we're browsing BYOB or we have a leaking script.
        if(isByob || GM_config.get('leaking')) {
            // Chilled by
            if(GM_config.get('chilled'))
                $('th.lastpost a:first').text('Chilled By');
            
            // BYOButtons, apply images and css (TODO: create an external stylesheet)
            if(GM_config.get('byobuttons')) {
                $('.postdate a, .profilelinks a').css({
                    'border': 'none',
                    'padding': '0',
                    'border-radius': '0',
                    'box-shadow': 'none',
                    'background-image': 'none',
                    'vertical-align': 'middle'
                });
                
                $('.postdate a').css({'width':'19px'});
                
                $('.postbuttons img[alt="Alert Moderators"]').attr('src','http://i.imgur.com/ML5IK4w.png').attr('title','Alert Moderators');
                $('.postbuttons img[alt="Edit"]').attr('src','http://i.imgur.com/Nltj4s4.png').attr('title','Edit');
                $('.postbuttons img[alt="Quote"]').attr('src','http://i.imgur.com/xkg4i6P.png').attr('title','Quote');                
                $('.postbuttons input[alt="Close thread"]').attr('src','http://i.imgur.com/MHdlPi6.png').attr('title','Close thread');
                
                $('.profilelinks a:contains("Profile")').html('<img src="http://i.imgur.com/AptdDHC.png" alt="Profile" title="Profile" />');
                $('.profilelinks a:contains("Message")').html('<img src="http://i.imgur.com/PsSETJx.png" alt="Message" title="Message" />');
                $('.profilelinks a:contains("Post History")').html('<img src="http://i.imgur.com/KdV1MOh.png" alt="Post History" title="Post History" />');
                
                $('.postdate a:contains("#")').html('<img src="http://i.imgur.com/7ZelCUc.png" />');
                $('.postdate a:contains("?")').html('<img src="http://i.imgur.com/V7aFdkF.png" />');
                
                $('.postdate a img').css({
                    'margin': '0',
                    'position': 'relative',
                    'top': '-.25em'
                });
                
                $('.postbuttons img[alt="Post"]').attr('title','Post');
                $('.postbuttons img[alt="Reply"]').attr('title','Reply');
            }
            
            // Quokkaquote
            if(GM_config.get('quokka'))
                $('.postbuttons img[alt="Quote"]').attr('src','http://i.imgur.com/bFZ8CKt.png');
            
            // Everyone's a cat
            if(GM_config.get('hammocktar'))
                $('dd.title').html('<img src="http://fi.somethingawful.com/byob/cat.gif" style="width:180px" />');
            
            // A cool joint
            if(GM_config.get('joint'))
                $('td.icon img').attr('src','http://i.imgur.com/ELuUyQP.png');
            
            // Imagespam (TODO: block all spammed images in one go, sometimes this "clumps")
            if(GM_config.get('imagespam')) {
                $('.postbody').each(function() {
                    var post = $(this), images = post.find('img').not('[src*="i.somethingawful.com"]'), sources = [];
                    images.each(function() {
                        var source = $(this).attr('src');
                        console.log(source);
                        if($.inArray(source, sources) == -1) {
                            sources.push(source);
                            var toRemove = images.not(this).filter('[src="'+source+'"]');
                            if(toRemove.length > 0) {
                                $(this).after("<br><sub>("+toRemove.length+" duplicate images removed for your browsing pleasure.)</sub>");
                                toRemove.remove();
                            }
                        }
                        console.log(sources);
                    });
                });
            }
            
            // Z-Boe 2.0
            if(GM_config.get('zboe')) {
                $('.post').has('.author:contains("zimboe")').find('.postbody').each(function() {
                    var zimboe = $(this).html();
                    $(this).html('<object width="466" height="105">'+
                                 '<param name="movie" value="http://tindeck.com/player/v1/player.swf?trackid=rznv"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param>'+
                                 '<embed src="http://tindeck.com/player/v1/player.swf?trackid=rznv" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" allowfullscreen="true" width="466" height="105"></embed>'+
                                 '</object>'+
                                 '<div class="zimboe-post"><a href="javascript:void()" onclick ="$(this).next().slideToggle()" style="font-size:10px; font-family: Verdana, Arial, sans-serif">Fine, click here if you really want to read this asinine post.</a><div style="display:none"><br>'+zimboe+'</div></div>');
                });
            }
            
            // Apply line spacing and color settings.
            $('.postbody').css('line-height',GM_config.get('spacing')+'em');
            $('#thread table.post td').css('color',GM_config.get('color'));
            $('.bbc-block blockquote').css('color',GM_config.get('quote_color'));
            $('div.breadcrumbs').find('a, a:link').andSelf().css('color',GM_config.get('bc_color'));
            // Use events to change the breadcrumb hover colors.
            $('div.breadcrumbs a').mouseenter(function() {$(this).css('color',(GM_config.get('lasers') == 'Cat and lasers' || GM_config.get('lasers') == 'Lasers only') ? '#FFFFFF' : '#a7392b')}).mouseleave(function() {$(this).css('color',GM_config.get('bc_color'))});
            
            // Apply cat and/or laser background
            switch(GM_config.get('background')) {
                case "Default":
                    if(isByob) {
                        $('#navigation, #nav_purchase').css('margin-left','200px');
                    }
                    break;
                case "Cat only":
                    $('#container').css('background-image','none');
                   	$('#navigation, #nav_purchase').css('margin-left','200px');
                    if(!isByob) {
                        $('body').css('background','#99f url("http://fi.somethingawful.com/byob/cat.gif") top left no-repeat');
                    }
                    break;
                case "Cat and lasers":
                    $('#navigation, #nav_purchase').css('margin-left','200px');
                    $('div.breadcrumbs').find('a, a:link').andSelf().css({'text-shadow': '0px 1px 2px rgba(0,0,0,0.75)'});
                    $('div.breadcrumbs span span').css({'background-color':'#333333','border-color':'#666666'});
                    $('#container').css({
                        'background-image' : "url('http://fi.somethingawful.com/byob/cat.gif'), url('http://i.somethingawful.com/images/0B5QF8I1rNFsHbnU5MGpvekJTME0.jpg')",
                        'background-size': 'auto, 69% 69%',
                        'background-repeat': 'no-repeat, repeat'
                    });
                    break;
                case "Lasers only":
                    $('div.breadcrumbs').find('a, a:link').andSelf().css({'text-shadow': '0px 1px 2px rgba(0,0,0,0.75)'});
                    $('div.breadcrumbs span span').css({'background-color':'#333333','border-color':'#666666'});
                    $('#container').css({
                        'background-image' : "url('http://i.somethingawful.com/images/0B5QF8I1rNFsHbnU5MGpvekJTME0.jpg')",
                        'background-size': '69% 69%',
                    });
                default:
                    break;
            }
        }
    });
})(jQuery);