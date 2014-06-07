// ==UserScript==
// @name           Tweetsymbols
// @namespace      Chilla42o
// @description    Easily insert special symbols in your tweets
// @include        http://twitter.com/*
// @version        0.3.1
// ==/UserScript==



var tweetsymbols_main = function() {

  var tweetsymbols = {
    symbols: {
      black_sun_with_rays: '☀',
      cloud: '☁',
      umbrella: '☂',
      snowman: '☃',
      comet: '☄',
      black_star: '★',
      white_star: '☆',
      lightning: '☇',
      thunderstorm: '☈',
      sun: '☉',
      ascending_node: '☊',
      descending_node: '☋',
      conjunction: '☌',
      opposition: '☍',
      black_telephone: '☎',
      white_telephone: '☏',
      ballot_box: '☐',
      ballot_box_with_check: '☑',
      ballot_box_with_x: '☒',
      saltire: '☓',
      umbrella_with_rain_drops: '☔',
      hot_beverage: '☕',
      white_shogi_piece: '☖',
      black_shogi_piece: '☗',
      shamrock: '☘',
      reversed_rotated_floral_heart_bullet: '☙',
      black_left_pointing_index: '☚',
      black_right_pointing_index: '☛',
      white_left_pointing_index: '☜',
      white_up_pointing_index: '☝',
      white_right_pointing_index: '☞',
      white_down_pointing_index: '☟',
      skull_and_crossbones: '☠',
      caution_sign: '☡',
      radioactive_sign: '☢',
      biohazard_sign: '☣',
      caduceus: '☤',
      ankh: '☥',
      orthodox_cross: '☦',
      chi_rho: '☧',
      cross_of_lorraine: '☨',
      cross_of_jerusalem: '☩',
      star_and_crescent: '☪',
      farsi: '☫',
      adi_shakti: '☬',
      hammer_and_sickle: '☭',
      peace: '☮',
      yin_yang: '☯',
      wheel_of_dharma: '☸',
      white_frowning_face: '☹',
      white_smiling_face: '☺',
      black_smiling_face: '☻',
      white_sun_with_rays: '☼',
      first_quarter_moon: '☽',
      last_quarter_moon: '☾',
      mercury: '☿',
      female_sign: '♀',
      earth: '♁',
      male_sign: '♂',
      jupiter: '♃',
      saturn: '♄',
      uranus: '♅',
      neptune: '♆',
      pluto: '♇',
      aries: '♈',
      taurus: '♉',
      gemini: '♊',
      cancer: '♋',
      leo: '♌',
      virgo: '♍',
      libra: '♎',
      scorpius: '♏',
      sagittarius: '♐',
      capricorn: '♑',
      aquarius: '♒',
      pisces: '♓',
      white_chess_king: '♔',
      white_chess_queen: '♕',
      white_chess_rook: '♖',
      white_chess_bishop: '♗',
      white_chess_knight: '♘',
      white_chess_pawn: '♙',
      black_chess_king: '♚',
      black_chess_queen: '♛',
      black_chess_rook: '♜',
      black_chess_bishop: '♝',
      black_chess_knight: '♞',
      black_chess_pawn: '♟',
      black_spade_suit: '♠',
      white_heart_suit: '♡',
      white_diamond_suit: '♢',
      black_club_suit: '♣',
      white_spade_suit: '♤',
      black_heart_suit: '♥',
      black_diamond_suit: '♦',
      white_club_suit: '♧',
      hot_springs: '♨',
      quarter_note: '♩',
      eighth_note: '♪',
      beamed_eighth_notes: '♫',
      beamed_sixteenth_notes: '♬',
      music_flat_sign: '♭',
      music_natural_sign: '♮',
      music_sharp_sign: '♯',
      west_syriac_cross: '♰',
      east_syriac_cross: '♱',
      universal_recycling: '♲',
      generic_recycling: '♺',
      black_universal_recycling: '♻',
      recycled_paper: '♼',
      partially_recycled_paper: '♽',
      permanent_paper_sign: '♾',
      wheelchair: '♿'
    },
  
    initialize:function() {
      tweetsymbols.symboltable = '<div id="tweet-symbols-table"><ol>';
      for (var symbolname in tweetsymbols.symbols) {
        tweetsymbols.symboltable = tweetsymbols.symboltable + '<li><a rel="'+symbolname+'" title="'+symbolname.replace(/_/g, ' ')+'">'+tweetsymbols.symbols[symbolname]+'</a></li>';
      }
      tweetsymbols.symboltable = tweetsymbols.symboltable + '</ol></div>';

      $('head').append('<style type="text/css" id="tweetsymbols-style">'+
        'div#tweet-symbols-table * { margin:0; padding:0; }'+
        'div#tweet-symbols-table { position:absolute; display:none; z-index:999; text-align:left; background:white; border:1px solid #b5b5b5; width:288px; padding:3px; }'+
        'div#tweet-symbols-table ol { list-style:none; font-size:18px; } '+
        'div#tweet-symbols-table ol li { display:inline-block; width:24px; height:24px; }'+
        'div#tweet-symbols-table ol li a { text-align:center; display:block; width:24px; height:24px; line-height:24px; cursor:pointer; }'+
        'div#tweet-symbols-table ol li a:hover { background:#f7f7f7; text-decoration:none; }'+
        'input.tweet-symbols { width: 25px;  border:1px solid; border-color:#ebebeb #ebebeb #d9d9d9 #d9d9d9; background-position:center center; }'+
        '</style>');
      $('body').append(tweetsymbols.symboltable);
      $('textarea.twitter-anywhere-tweet-box-editor').live('focus', function() {
        if (!tweetsymbols.inserting) {
          tweetsymbols.currenttarget = $(this);
          tweetsymbols.currenttarget.parents('.tweet-box')
                                    .find('.tweet-button-container:not(:has(.tweet-symbols-button))')
                                    .children('.tweet-counter')
                                    .after('<a class="tweet-symbols-button tweet-button button">☆</a> ');
        }
      });

      $('a.tweet-symbols-button').live('click', function(e) {
        $('#tweet-symbols-table').css({top:e.pageY+'px', left:e.pageX+'px' }).show();
        e.stopPropagation();
      });

      $('div#tweet-symbols-table a').click(function() {
        tweetsymbols.insertsymbol($(this).attr('rel'));
        tweetsymbols.currenttarget.parents('.tweet-box')
                                  .find('.tweet-counter')
                                  .html(140-tweetsymbols.currenttarget.val().length);
      });
      $('div#tweet-symbols-table').hover(null, function() {
        $(this).hide();
      });
     
    },

    insertsymbol: function(which) {
      tweetsymbols.inserting = true;
      var field = tweetsymbols.currenttarget.get(0);
      field.focus();
      var scrollTop = field.scrollTop,
      scrollLeft = field.scrollLeft,
      selStart = field.selectionStart,
      selEnd = field.selectionEnd;
      field.value = field.value.substring(0, selStart) + tweetsymbols.symbols[which] + field.value.substring(selEnd);
      field.scrollTop = scrollTop;
      field.scrollLeft = scrollLeft;
      field.selectionEnd = selStart + 1;
      field.selectionStart = field.selectionEnd;
      tweetsymbols.inserting = false;
    },

    inserting: false

  }
  
  function tweetsymbols_init() {
    try { //safely load tweetsymbols
      if (window.top != window.self)
        return; //don't run in iframe
      if (typeof $ == 'undefined' || typeof twttr.currentUser == 'undefined' || !$('a.tweet-button').length) { //ensure it's loaded after required components
        window.setTimeout(tweetsymbols_init, 1000);
        return;
      }
      tweetsymbols.initialize();
    } catch(err) {
      if (typeof console != 'undefined') {
        console.debug(err);
      }
    }
  }

  tweetsymbols_init();
}

function tweetsymbols_load(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
        func();
      }
    }
  }

var tweetsymbols_script = document.createElement("script");
var tweetsymbols_scriptcontent = tweetsymbols_load.toString()+"\n"+
                                 'tweetsymbols_load('+tweetsymbols_main.toString()+');';
tweetsymbols_script.textContent = tweetsymbols_scriptcontent;
document.body.appendChild(tweetsymbols_script);