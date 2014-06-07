// ==UserScript==
// @name           TweetEmoticons
// @namespace      uchari
// @description    Easily insert Asian emoticons in your tweets
// @include        http://twitter.com/*
// @version        2010.02.02
// ==/UserScript==

function TweetSymbols
() {
  var $ = unsafeWindow.$;
  var that = this;

  var symbols = {
    smile: '(^_^)',
    happier: '*(^O^)*',
    glad: '(^o^)',
    smile2: '(n_n)',
    i_love_it: '(*-*)',
    incredible: '(*O*)',
    laughing_out_loud: '(^o^)',
    headphones: 'd(^_^)b',
    sad: '(;_;)',
    sad2: '(T_T)',
    sad3: '(!__!)',
    emot: '(ToT)',
    emo: 'm(_ _)m',
    emoon: '(^^;)',
    emocon: '（￣ー￣）',
    emotic: '(≧∇≦)',
    ouch: '(>_<)',
    emoon: '（￣□￣；）',
    boring: '(=_=)',
    emotion: '(#^.^#)',
    sleeping: '(-.-)Zzz',
    sleeping_person: '(Z.Z)',
    hurrah: '\(^_^)/',
    sweating: '(-_-*)',
    Surprise: '(*_*)',
    wink: '(^_~)',
    amazed: '(O_O)',
    confused: '(p_q)',
    astonished: '(*^*)',
    shocked: '(o.O)',
    uh__oh: '(._.)',
    suspicious: '(<.<)',
    mad: '(¬_¬)',
    mad2: '(ò_ó)',
    pissed_off : '(¬_¬")',
    victory: 'v(^_^)v',
    nonsense: '(?_?)',
    sick: '(-__-)',
    dizzy: '(@_@)',
    dead: '(X_X)',
    pretentious: '(-O-)',
    glancing_around: '\\(<.<|>.>)//',
    in_love: '(♥_♥)',
    money_talks: '($_$)',
    what_r_u_looking: '(ô_ô)',
    bye: '(^_^)/~~',
    wtf: '(ò_ô)',
     };

  this.symboltable = '<div id="tweetsymbols"><ol>';
  for (symbolname in symbols) {
    this.symboltable = this.symboltable + '<li><a id="'+symbolname+'" title="'+symbolname.replace(/_/g, ' ')+'">'+symbols[symbolname]+'</a></li>';
  }
  this.symboltable = this.symboltable + '</ol></div>';

  $('head').append('<style type="text/css">'+
  'div#tweetsymbols { position:absolute; display:none; z-index:999; margin: 15px 0 0 15px; text-align:left; background:white; border:1px solid #b5b5b5; width:288px; padding:3px; }'+
  'div#tweetsymbols ol { list-style:none; font-size:10px; } '+
  'div#tweetsymbols ol li { display:inline-block; width:50px; height:24px; }'+
  'div#tweetsymbols ol li a { text-align:center; display:block; width:50px; height:24px; line-height:24px; cursor:pointer; }'+
  'div#tweetsymbols ol li a:hover { background:#f7f7f7; text-decoration:none; }'+
  'input#insert-symbol { width: 25px;  border:1px solid; border-color:#ebebeb #ebebeb #d9d9d9 #d9d9d9; background-position:center center; }'+
  'div#currently { width:335px; }'+
  '</style>');

  this.insertsymbol = function(which) {
    var field = document.getElementById('status');
    field.focus();
    var scrollTop = field.scrollTop,
        scrollLeft = field.scrollLeft,
        selStart = field.selectionStart,
        selEnd = field.selectionEnd;
    field.value = field.value.substring(0, selStart) + symbols[which] + field.value.substring(selEnd);
    field.scrollTop = scrollTop;
    field.scrollLeft = scrollLeft;
    field.selectionEnd = selStart + 7;
    field.selectionStart = field.selectionEnd;
  };
  
  $('div.info div.status-btn').prepend(this.symboltable).append('<input value="☯" id="insert-symbol" class="round-btn" tabindex="3" type="button">');
  $('input#insert-symbol').click(function(e) {
    $('div#tweetsymbols').show();
  });
  $('div#tweetsymbols a').click(function() {
    that.insertsymbol($(this).attr('id'));
    $('strong#status-field-char-counter').html(140-$('textarea#status').val().length);
    //uncomment following line if you want the symbol-table to hide after clicking on a symbol
    //$('div#tweetsymbols').hide();
  })
  $('div#tweetsymbols').hover(null, function() {
    $(this).hide();
  });
}

new TweetSymbols();