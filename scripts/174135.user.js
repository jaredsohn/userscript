// ==UserScript==
// @name WaniKani Improve
// @namespace http://www.michaelfrank.com.br/wanikani_improve/
// @include https://www.wanikani.com/review/session
// @include http://www.wanikani.com/review/session
// @version 2.2.2
// @grant GM_addStyle
// @grant GM_getResourceText
// @run-at document-end
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.min.js
// @resource qtipCSS https://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.min.css
// ==/UserScript==

var qtipCSS = GM_getResourceText("qtipCSS");
GM_addStyle(qtipCSS);

$.jStorage = unsafeWindow.$.jStorage;

var wki_settings = $.jStorage.get('wki_settings');

if(wki_settings === null)
{
    wki_settings = ({
        'wki_timer_show_next_item' : 0,
        'wki_button_label_bgcolor': '#A2A2A2',
        'wki_button_label_textcolor' : '#FFFFFF',
        'wki_combo_display' : true,
        'wki_srs_levelup_display' : true,
        'wki_auto_show_info' : true,
        'wki_audio_autoplay' : false
    });
    console.log('WKI: Settings not found');
}
else
{
    console.log('WKI: Settings found');
    wki_settings = $.parseJSON(wki_settings);
}

var wki_hit_combo = 0;
var wki_combo_record = $.jStorage.get('wki_combo_record');

var wki_current_item = '';
var wki_current_type = '';
var wki_current_question_type = '';
var wki_previous_item = '';
var wki_previous_type = '';
var wki_previous_question_type = '';
var wki_previous_item_url = '';
var wki_submitted_answer = '';

var wki_jstored_current_item = '';
var wki_jstored_previous_item = '';

var wki_items_array = new Array();

var wki_exception_message_received = false;
var wki_exception_message_type = 0;
var wki_answer_exception_message = new Array();
wki_answer_exception_message[0] = 'Check the previous item';
wki_answer_exception_message[1] = 'Your answer was a bit off';
wki_answer_exception_message[2] = 'There are other possible readings';
wki_answer_exception_message[3] = 'There are other possible meanings';

var wki_srs_level = new Array();
wki_srs_level[0] = ''; // Every item starts on 1
wki_srs_level[1] = '';
wki_srs_level[2] = '';
wki_srs_level[3] = '';
wki_srs_level[4] = '';
wki_srs_level[5] = 'guru';
wki_srs_level[6] = '';
wki_srs_level[7] = 'master';
wki_srs_level[8] = 'enlightned';
wki_srs_level[9] = 'burned';
wki_srs_level[10] = ''; // SRS 10 does not exist

var srs_wrapper_top = 0;
var srs_wrapper_upper = 0;

$('<li id="wki_button" class="wki_default_cursor disabled"><div id="wki_mimic_button"><div class="wki_item_wrapper"><div lang="ja" class="wki_button_item_label"><div class="wki_start_message">Previous item</div></div></div><i class="icon-info-sign"></i></li>').insertAfter('#option-wrap-up');
$('<div id="wki_srs_popup_wrapper"><div class="wki_srs_popup_icon"><i class="icon-arrow-up"></i></div><div id="wki_srs_popup_message"></div></div>').appendTo('body');

$('<span id="wki_combo_display"><i class="icon-trophy"></i><span id="wki_combo" title="Current combo of right answers">0</span> <span id="wki_combo_record" title="Record of right answers in a row"></span></span> ').insertBefore('#stats i.icon-thumbs-up');

$('<div id="wki_config_button"><span class="wki_tooltip" rel="wki_settings_info"><span id="wki_settings_info" class="wki_hidden">Click to access WaniKani Improve settings menu</span><i class="icon-cogs"></i> WKI 2.2.2</span></div>').insertBefore('#hotkeys');

$('<div id="wki_modal_background"></div>').css({ position: 'absolute', top: $(document).scrollTop(), left: 0, height: $(document).height(), width: '100%', opacity: 0.7, backgroundColor: '#000000', zIndex: 5000, display: 'none' }).appendTo('body');

$('<style type="text/css">.wki_hidden { display: none; } .wki_settings_saved { width: 350px; padding: 10px; font-size: 16px; display: none; } .wki_settings_discarded { width: 350px; padding: 10px; font-size: 16px; display: none;  }  .wki_clear { clear: both;} .wki_btn { color: rgb(153, 153, 153); font-family: "Ubuntu",Helvetica,Arial,sans-serif; border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.25); display: inline-block; padding: 4px 12px; margin: 5px 0 0; font-size: 14px; line-height: 20px; text-align: center; vertical-align: middle; cursor: pointer;  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.75); background-color: rgb(245, 245, 245); background-image: linear-gradient(to bottom, rgb(255, 255, 255), rgb(230, 230, 230)); background-repeat: repeat-x; border-width: 1px; border-style: solid; border-color: rgb(187, 187, 187) rgb(187, 187, 187) rgb(162, 162, 162); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none; border-radius: 4px; box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2) inset, 0px 1px 2px rgba(0, 0, 0, 0.05);} .wki_btn:hover { color: #777777; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3); } .wki_settings_form { width: 350px; margin: 0; padding: 0; list-style-type: none;} .wki_settings_form li { padding: 10px 0px; border-bottom: 1px solid #ededed; } .wki_settings_form li:last-child { border-bottom: 0;} .wki_settings_form input[type="text"] { width: 98%; margin: 8px 0 0 0; } .wki_settings_form input[type="checkbox"] { margin: 3px 5px 5px; vertical-align: middle; }  #wki_config_button {cursor: pointer; display: inline-block; padding: 10px; color: rgb(136, 136, 136); font-size: 0.8125em; vertical-align: bottom;} #wki_srs_popup_wrapper {width: 121px; height: 30px; position: absolute; z-index: 11; opacity: 0; } .wki_srs_popup_icon { width: 30px; background-color: #efefef; text-align: center; padding: 5px 0; float: left; } #wki_srs_popup_message { text-align: center; color: white; float: right; padding: 5px; width: 81px; text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1); } .wki_srs_apprentice { background-color: #F300A2; } .wki_srs_guru { background-color: #9E34B7; } .wki_srs_master { background-color: #4967E0; } .wki_srs_enlightned { background-color: #00A2F3; } .wki_srs_burned { background-color: #4E4E4E; } .wki_default_cursor { cursor: default !important; } .wki_start_message{ color: black; display: inline;}  #wki_button { vertical-align: bottom; cursor: pointer; } #wki_button i {margin: 13px auto; width: 18%; position: absolute; right: 10px; top: 0; } #wki_mimic_button {margin-right: 10px; background-color: rgb(251, 251, 251); color: rgb(136, 136, 136); text-decoration: none; box-shadow: 3px 3px 0px rgb(225, 225, 225);} .wki_button_item_label { padding: 10px 0 6px; text-align: center; color: ' + wki_settings.wki_button_label_textcolor + '; text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; opacity: 0.5; } .wki_button_item_label:hover { opacity: 1; } .wki_item_wrapper { background-color: #FFFFFF; width: 80%; } .wki_vocabulary { background-color: #AA00FF; } .wki_kanji { background-color: #FF00AA; } .wki_radical { background-color: #00AAFF; } .wki_cinza { background-color: ' + wki_settings.wki_button_label_bgcolor + '; } .qtip{ max-width: 380px !important; } #additional-content ul li { width: 16.6% !important; } #additional-content {text-align: center;} #wki_button img { max-width: 14%; margin: -10px; } #additional-content #answer-exception {left: 8.3% !important;} @media (max-width: 767px) {#wki_mimic_button {padding: 5px; font-size: 0.75em;} .wki_item_wrapper { display: none; padding: 4px 4px 3px; margin: -4px; } #wki_button i { position: relative; width: auto; right: auto; margin: 0; } } @media (max-width: 1280px) { #wki_button img { max-width: 22%; margin: -11px; } @media (max-width: 1024px) { #wki_button img { max-width: 29%; margin: -11px; }}  } </style>').appendTo('head');


if(wki_settings.wki_combo_display !== true)
{
    $('#wki_combo_display').hide();
}

if(wki_settings.wki_srs_levelup_display !== true)
{
    $('#wki_srs_popup_wrapper').hide();
}

if(wki_combo_record === null)
{
    wki_combo_record = 0;
}
else
{
    if(wki_combo_record !== 0)
    {
        $('#wki_combo_record').text('(' + wki_combo_record + ')');
    }
}

function checkAnswer()
{
    wki_submitted_answer = $('#user-response').val();

    if(!wki_submitted_answer)
    {
        return false;
    }

    var answerException = $.trim($('#answer-exception').text());

    if(answerException.indexOf('WaniKani is looking for the') !== -1)
    {
        return false;
    }

    console.log('wki_submitted_answer: ' + wki_submitted_answer);

    if(answerException.length > 0)
    {
        wki_exception_message_received = true;

        if(answerException.indexOf('answer was a bit off') !== -1)
        {
            console.log('WKI: [answerException] your answer was a bit off');
            $('#wki_mimic_button').css('background-color', '#F5F7AB'); // yellow
            $('#wki_button i').removeClass().addClass('icon-warning-sign').fadeOut().fadeIn().fadeOut().fadeIn();
            wki_exception_message_type = 1;
        }
        else if(answerException.indexOf('possible readings') !== -1)
        {
            console.log('WKI: [answerException] other possible readings');
            $('#wki_button i').removeClass().addClass('icon-asterisk');
            $('#wki_mimic_button').css('background-color', '#CDE0F7'); // blue
            wki_exception_message_type = 2;
        }
        else if(answerException.indexOf('possible meanings') !== -1)
        {
            console.log('WKI: [answerException] other possible meanings');
            $('#wki_button i').removeClass().addClass('icon-asterisk');
            $('#wki_mimic_button').css('background-color', '#CDE0F7'); // blue
            wki_exception_message_type = 3;
        }
        else if(answerException.indexOf('View the correct') !== -1)
        {
            console.log('WKI: [answerException] wrong answer');
            $('#wki_mimic_button').css('background-color', '#FBFBFB'); // default grey color

            if(wki_settings.wki_auto_show_info === true)
            {
                $('#option-item-info').click();
            }

            wki_exception_message_type = 0;
        }
        else
        {
            // unknown message
            console.log('WKI: [answerException] ' + answerException);
            $('#wki_button i').removeClass().addClass('icon-info-sign');
            $('#wki_mimic_button').css('background-color', '#F7D4CD'); // red
            wki_exception_message_type = 0;
        }
    }
    else
    {
        wki_exception_message_received = false;
        $('#wki_button i').removeClass().addClass('icon-ok');
        $('#wki_mimic_button').css('background-color', '#FBFBFB'); // default grey color
    }

    if(wki_exception_message_received === false || wki_exception_message_type > 0)
    {
        wki_hit_combo++;
        $('#wki_combo').text(wki_hit_combo);
        if(wki_hit_combo > wki_combo_record)
        {
            $.jStorage.set('wki_combo_record', wki_hit_combo);
            $('#wki_combo').fadeOut().fadeIn();
            $('#wki_combo_record').hide();
        }
    }
    else
    {
        wki_hit_combo = 0;
        $('#wki_combo').text(wki_hit_combo);
        $('#wki_combo_record').text('(' + $.jStorage.get('wki_combo_record', wki_hit_combo) + ')').show();
    }

    if ($('#answer-form form fieldset').hasClass('correct'))
    {
        console.log('WKI: Correct answer');

        if (wki_settings.wki_audio_autoplay === true)
        {
            if ($('#option-audio').hasClass('disabled'))
            {
                moveNext();
            }
            else
            {
                $("#option-audio").click();

                $('#option-audio audio').bind("ended", function () {
                    moveNext();
                });
            }
        }
        else
        {
            moveNext();
        }
    }
    else if ($('#answer-form form fieldset').hasClass('incorrect'))
    {
        console.log('WKI: Wrong answer');
    }
}

function moveNext()
{
    console.log('WKI: Moving to next question');
    $('#answer-form button').trigger('click');
}

$('#answer-form button').on('click', function(e){
    if (e.originalEvent !== undefined && e.originalEvent.screenX && e.originalEvent.screenY)
    {
        if($('#user-response').val())
        {
        	setTimeout(checkAnswer, wki_settings.wki_timer_show_next_item);
        }
    }
});

$('#question-type').bind('DOMNodeInserted', function (event)
{
    if(event.target.nodeName != 'STRONG')
    {
        return false;
    }

    wki_jstored_current_item = $.jStorage.get('currentItem');
    wki_current_question_type = $.jStorage.get('questionType');

    if(wki_jstored_current_item['kan'])
    {
        wki_current_type = 'kanji';
        wki_current_item = wki_jstored_current_item['kan'];
    }
    else if(wki_jstored_current_item['voc'])
    {
        wki_current_type = 'vocabulary';
        wki_current_item = wki_jstored_current_item['voc'];
    }
    else if(wki_jstored_current_item['rad'])
    {
        wki_current_type = 'radical';
        if(wki_jstored_current_item['rad'].indexOf('.png') !== -1)
        {
            wki_current_item = '<img src="http://s3.wanikani.com/images/radicals/'+wki_jstored_current_item['rad']+'" />';
        }
        else
        {
            wki_current_item = wki_jstored_current_item['rad'];
        }
    }

    console.log('wki_current_item: ' + wki_current_item);
    console.log('wki_current_type: ' + wki_current_type);
    console.log('wki_current_question_type: ' + wki_current_question_type);

    if(wki_srs_level[wki_jstored_current_item['srs'] + 1])
    {
        console.log('WKI: this item will level up to ' + wki_srs_level[wki_jstored_current_item['srs'] + 1] + '');
    }
    else
    {
        console.log('WKI: this item will not level up to a new SRS class');
    }

    if ((wki_previous_item != wki_current_item) || (wki_previous_item == wki_current_item && wki_current_question_type != wki_previous_question_type))
    {
        if (wki_previous_item != '')
        {
            if(!wki_items_array[wki_previous_type + '_' + wki_jstored_previous_item['id']])
            {
                wki_items_array[wki_previous_type + '_' + wki_jstored_previous_item['id']] = {};
                wki_items_array[wki_previous_type + '_' + wki_jstored_previous_item['id']]['views'] = 1;
                wki_items_array[wki_previous_type + '_' + wki_jstored_previous_item['id']]['correct_answers'] = 0;
            }
            else
            {
                wki_items_array[wki_previous_type + '_' + wki_jstored_previous_item['id']]['views']++;
            }

            if(wki_exception_message_received === false || wki_exception_message_type > 0)
            {
                wki_items_array[wki_previous_type + '_' + wki_jstored_previous_item['id']]['correct_answers']++;

                if((wki_items_array[wki_previous_type + '_' + wki_jstored_previous_item['id']]['views'] == 2 && wki_items_array[wki_previous_type + '_' + wki_jstored_previous_item['id']]['correct_answers'] == 2) || wki_jstored_previous_item['rad'])
                {
                    if(wki_srs_level[wki_jstored_previous_item['srs'] + 1])
                    {
                        $('#wki_srs_popup_message').text(wki_srs_level[wki_jstored_previous_item['srs'] + 1]).removeClass().addClass('wki_srs_' + wki_srs_level[wki_jstored_previous_item['srs'] + 1]);

                        $('#wki_srs_popup_wrapper').animate({'top': srs_wrapper_upper, 'opacity': 1}, 800, function() {  $(this).delay(800).animate({'opacity': 0}, 500, function() { $(this).css('top', srs_wrapper_top); } ); });
                    }
                }
            }

            $('#wki_mimic_button').qtip('destroy', true);
            $('#wki_button').removeClass();

            $('#wki_button .wki_button_item_label').html(wki_previous_item).removeClass().addClass('wki_button_item_label wki_cinza');

            if(wki_exception_message_received === true)
            {
                $('#wki_mimic_button').qtip({content: { text: wki_answer_exception_message[wki_exception_message_type] }, position: { my: 'bottom center', at: 'top center', viewport: $(window)}, style: 'qtip-bootstrap'});

                if(wki_exception_message_type == 0)
                {
                    $('#wki_button i').removeClass().addClass('icon-remove');
                }

                //reset the var
                wki_exception_message_received = false;
            }

            wki_previous_item_url = 'https://www.wanikani.com/';

            if (wki_previous_type == 'kanji')
            {
                wki_previous_item_url += 'kanji/' + wki_previous_item + '/';
            }
            else if (wki_previous_type == 'vocabulary')
            {
                wki_previous_item_url += 'vocabulary/' + wki_previous_item + '/';
            }
            else
            {
                var radicalName = wki_jstored_previous_item.en[0];
                wki_previous_item_url += 'radicals/' + radicalName.toLowerCase().replace(' ', '-') + '/';
            }
        }
        else
        {
            srs_wrapper_top = parseInt($("#wki_mimic_button").offset().top + $("#wki_mimic_button").outerHeight());
            srs_wrapper_upper = parseInt(srs_wrapper_top - ($("#wki_mimic_button").outerHeight() * 2));

            $('#wki_srs_popup_wrapper').css({'top': srs_wrapper_top + 'px', 'left': parseInt($("#wki_mimic_button").outerWidth() / 3 + $("#wki_mimic_button").offset().left) + 'px'});
        }


        $('#wki_button').not('.disabled').qtip(
        {
            hide:
            {
                event: 'click unfocus'
            },

            content:
            {
                title: 'Previous ' + wki_previous_type + '. You answered <strong>' + wki_submitted_answer + '</strong>',
                text: '<iframe id="wki_iframe_previous_item" src="' + wki_previous_item_url + '" frameborder="0" marginheight="0" style="width:350px; height: 250px; overflow-x: hidden; overflow-y: scroll; opacity: 0;"></iframe>'
            },
            position:
            {
                my: 'bottom center',
                at: 'top center',
                viewport: $(window),
                adjust: { method: 'shift flip' }
            },
            show:
            {
                event: 'click',
                solo: true
            },
            events:
            {
                visible: function(event, api)
                {
                    $('iframe#wki_iframe_previous_item').load(function()
                    {

                        var wki_iframe_content = $(this).contents().find('body');

                        wki_iframe_content.append('<style>.footer-adjustment, footer {display: none !important} body {margin: 10px !important;} section {margin: 0 !important; } .container {margin: 0 !important; } .level-icon { min-height: 52px; float: left;} .vocabulary-icon, .kanji-icon, .radical-icon {float: right; width: 83%; height: auto; padding-left: 0 !important; padding-right: 0 !important; min-height: 52px;} .wki_iframe_header {font-weight: bold; text-align: center; line-height: 55px} .wki_iframe_section {margin: 30px 0 0 !important} .wki_iframe_section:after {clear: both; } .wki_iframe_section h2 {border-bottom: 1px solid rgb(212, 212, 212) !important; margin: 15px 0 7px !important;} .wki_iframe_header .enlarge-hover { display: none !important; } </style>');

                        var wki_iframe_item = wki_iframe_content.find('header>h1');
                        var wki_iframe_item_progress = wki_iframe_content.find('#progress').addClass('wki_iframe_section').wrap('<div></div>').parent().html();
                        var wki_iframe_item_alternative_meaning = wki_iframe_content.find('#information').addClass('individual-item').wrap('<div></div>').parent();

                        if(wki_items_array[wki_previous_type + '_' + wki_jstored_previous_item['id']]['correct_answers'] == 2)
                        {
                            var wki_readings_and_meanings = wki_iframe_content.find('h2:contains("Reading"),h2:contains("Meaning"),h2:contains("Name")').parent('section').addClass('wki_iframe_section');
                            wki_iframe_content.append('<h2 class="wki_iframe_header">' + wki_iframe_item.html() + '</h2>');
                            wki_iframe_content.append(wki_iframe_item_alternative_meaning);
                            wki_iframe_content.append(wki_readings_and_meanings);

                        }
                        else
                        {

                            if(wki_previous_question_type.indexOf('reading') !== -1)
                            {
                                var wki_iframe_item_reading = wki_iframe_content.find('h2:contains("Reading")').parent('section').addClass('wki_iframe_section');

                                $('<h2>', {'class' : 'wki_iframe_header'}).appendTo(wki_iframe_content).append(wki_iframe_item.children()).append('<br style="clear: both;" />');
                                wki_iframe_content.append(wki_iframe_item_reading);
                            }
                            else if(wki_previous_question_type.indexOf('meaning') !== -1)
                            {
                                if(wki_previous_type == 'radical')
                                {
                                    var wki_iframe_item_meaning = wki_iframe_content.find('h2:contains("Name")').parent('section').addClass('wki_iframe_section');
                                }
                                else
                                {
                                    var wki_iframe_item_meaning = wki_iframe_content.find('h2:contains("Meaning")').parent('section').addClass('wki_iframe_section');
                                }

                                wki_iframe_content.append('<h2 class="wki_iframe_header">' + wki_iframe_item.html() + '</h2>');
                                wki_iframe_content.append(wki_iframe_item_alternative_meaning);
                                wki_iframe_content.append(wki_iframe_item_meaning);
                            }
                        }

                        wki_iframe_content.append(wki_iframe_item_progress);

                        $(this).css('opacity', '1');

                    });
                }
            },
            style: 'qtip-bootstrap'
        });

    }
});


$('#question-type').bind('DOMNodeRemoved', function (event)
{
    if(event.target.nodeName == 'STRONG')
    {
        wki_previous_item = wki_current_item;
        wki_previous_type = wki_current_type;
        wki_previous_question_type = wki_current_question_type;
        wki_jstored_previous_item = wki_jstored_current_item;

        console.log('WKI: Previous item registered');
    }
});

$('#user-response').keydown( function(e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key == 13)
    {
        setTimeout(checkAnswer, wki_settings.wki_timer_show_next_item);
    }
});


var label_toggle = 0;
$("#wki_button").bind({
    mouseenter: function(e) {
        var item_label = $(this).find(".wki_item_wrapper");
        if(item_label.outerWidth() < item_label[0].scrollWidth)
        {
            item_label.animate(
               {
                   width: "100%"
               },
               200
            );
            $(this).find("i").fadeOut(100);
            label_toggle = 1;
        }

    },
    mouseleave: function(e) {
        var item_label = $(this).find(".wki_item_wrapper");
        if(label_toggle === 1)
        {
            item_label.animate(
               {
                   width: "80%"
               },
               200
            );
            $(this).find("i").fadeIn(100);
            label_toggle = 0;
        }
    }
});


$('#wki_config_button').qtip({
    show:
    {
        event: 'click',
        effect: function()
        {
            $('#wki_modal_background').fadeIn();
            $(this).fadeIn();
        }
    },
    hide:
    {
        event: 'unfocus',
        effect: function()
        {
            $('#wki_modal_background').fadeOut();
            $(this).fadeOut();
        }
    },
    events: {
	   render: function(event, api) {
	       $('#wki_settings_cancel').bind('click', settingsCancel);
           $('#wki_settings_save').bind('click', settingsSave);
       }
    },
    content:
    {
        title: '<h2 style="text-align: center;">WaniKani Improve</h2>',
        text: '<ul class="wki_settings_form"><li><input type="checkbox" id="wki_settings_audio_autoplay" '+(wki_settings.wki_audio_autoplay === true ? 'checked' : '')+' /> <label for="wki_settings_audio_autoplay">Play vocabulary audio when available</label></li><li><input type="checkbox" id="wki_settings_combo_display" '+(wki_settings.wki_combo_display === true ? 'checked' : '')+' /> <label for="wki_settings_combo_display">Show combo information</label></li><li><input type="checkbox" id="wki_settings_srs_levelup_display" '+(wki_settings.wki_srs_levelup_display === true ? 'checked' : '')+' /> <label for="wki_settings_srs_levelup_display">When an item level up, display the new SRS level</label></li><li><input type="checkbox" id="wki_settings_auto_show_info" '+(wki_settings.wki_auto_show_info === true ? 'checked' : '')+' /> <label for="wki_settings_auto_show_info">Display the item information after a wrong answer</label></li><li>Button\'s background color (default: #A2A2A2)<br /><input type="text" id="wki_settings_button_label_bgcolor" value="'+wki_settings.wki_button_label_bgcolor+'" /></li><li>Button\'s text color  (default: #FFFFFF)<br /><input type="text" id="wki_settings_button_label_textcolor" value="'+wki_settings.wki_button_label_textcolor+'" /></li><li>Time to wait before moving to the next question (miliseconds, default: 0)<input type="text" id="wki_settings_timer_show_next_item" value="'+wki_settings.wki_timer_show_next_item+'" /></li><li><a id="wki_settings_cancel" class="wki_btn" style="float: left;">Cancel</a><a id="wki_settings_save" class="wki_btn" style="float: right;">Save</a><br class="wki_clear" /></li></ul><div class="wki_settings_saved">Settings saved</div><div class="wki_settings_discarded">Changes discarded</div>'
    },
    position:
    {
        my: 'center', at: 'center',
        target: $(window)
    },
    style: {
        classes: 'qtip-bootstrap'
    }
});

function settingsCancel()
{
    console.log('WKI: settings not saved');
    $('.wki_settings_form').slideUp();
    $('.wki_settings_discarded').slideDown();
    setTimeout(function() {
        $('#wki_config_button').qtip("hide");
        setTimeout(function() {
            $('.wki_settings_form').show();
            $('.wki_settings_saved').hide();
            $('.wki_settings_discarded').hide();
        }, 1000);
    }, 1300);
}

function settingsSave()
{
    wki_settings.wki_audio_autoplay = $("#wki_settings_audio_autoplay").is(":checked") ? true : false;
    wki_settings.wki_timer_show_next_item = $('#wki_settings_timer_show_next_item').val();
    wki_settings.wki_button_label_bgcolor = $('#wki_settings_button_label_bgcolor').val();
    wki_settings.wki_button_label_textcolor = $('#wki_settings_button_label_textcolor').val();
    wki_settings.wki_combo_display = $("#wki_settings_combo_display").is(":checked") ? true : false;
    wki_settings.wki_srs_levelup_display = $("#wki_settings_srs_levelup_display").is(":checked") ? true : false;
    wki_settings.wki_auto_show_info = $("#wki_settings_auto_show_info").is(":checked") ? true : false;

    $.jStorage.set('wki_settings', JSON.stringify(wki_settings));

    $('.wki_button_item_label').css({'color' : wki_settings.wki_button_label_textcolor, 'background-color': wki_settings.wki_button_label_bgcolor});

    if(wki_settings.wki_combo_display !== true)
    {
        $('#wki_combo_display').hide();
    }
    else
    {
        $('#wki_combo_display').show();
    }

    if(wki_settings.wki_srs_levelup_display !== true)
    {
        $('#wki_srs_popup_wrapper').hide();
    }
    else
    {
        $('#wki_srs_popup_wrapper').show();
    }

    $('.wki_settings_form').slideUp();
    $('.wki_settings_saved').slideDown();

    console.log('WKI: settings saved');
    setTimeout(function() {
        $('#wki_config_button').qtip("hide");
        setTimeout(function() {
            $('.wki_settings_form').show();
            $('.wki_settings_saved').hide();
            $('.wki_settings_discarded').hide();
        }, 1000);
    }, 1300);
}


$('#report-errors a').attr('href', 'javascript:void(0);');
$('#report-errors').addClass('wki_tooltip').attr('rel', 'wki_bug_message').append('<span class="wki_hidden" id="wki_bug_message">Before sending a bug report, disable WaniKani Improve and all other scripts running in the page. If the error persists, contact WaniKani and report the problem.</span>');

$('.wki_tooltip').each(function() {
    if($(this).attr('rel'))
    {
        var qtip_content = $('#'+$(this).attr('rel')).html();
    }
    else
    {
        var qtip_content = $(this).attr('title');
    }
    $(this).qtip({
           style: {
                classes: 'qtip-bootstrap qtip-shadow'
           },
           hide: {
    			delay: 100,
    			event: 'unfocus mouseleave',
    			fixed: true
    		},
            position:
            {
                my: 'bottom center',
                at: 'top center',
                viewport: $(window),
                method: 'shift none'
            },
            content: qtip_content
    });
});

$(window).unload(function(){
    if(wki_hit_combo > wki_combo_record)
    {
        $.jStorage.set('wki_combo_record', wki_hit_combo);
        console.log('WKI: Combo record saved');
    }
});