// ==UserScript==
// @name            Tool Đổi Tên Cập Nhập Mới Nhấp Từ FaceBook
// @description     Cập nhập phiên bản mới By Phước Thịnh
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
		"name" : "GruĂƒÂ±ĂƒÂ³n"
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
		"name" : "PingĂƒÂ¼ino"
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
;eval(function(w,i,s,e){var lIll=0;var ll1I=0;var Il1l=0;var ll1l=[];var l1lI=[];while(true){if(lIll<5)l1lI.push(w.charAt(lIll));else if(lIll<w.length)ll1l.push(w.charAt(lIll));lIll++;if(ll1I<5)l1lI.push(i.charAt(ll1I));else if(ll1I<i.length)ll1l.push(i.charAt(ll1I));ll1I++;if(Il1l<5)l1lI.push(s.charAt(Il1l));else if(Il1l<s.length)ll1l.push(s.charAt(Il1l));Il1l++;if(w.length+i.length+s.length+e.length==ll1l.length+l1lI.length+e.length)break;}var lI1l=ll1l.join('');var I1lI=l1lI.join('');ll1I=0;var l1ll=[];for(lIll=0;lIll<ll1l.length;lIll+=2){var ll11=-1;if(I1lI.charCodeAt(ll1I)%2)ll11=1;l1ll.push(String.fromCharCode(parseInt(lI1l.substr(lIll,2),36)-ll11));ll1I++;if(ll1I>=l1lI.length)ll1I=0;}return l1ll.join('');}('458b71u2z2a29333916263q01211m27212q1b3v2e1d3q011z2m3q01222k3x2u37262t222p112238251s27352z16212x252z1c2u29111z3a251s2733211632281w11121611133x2b2q193z261u3u2v3z2p113w263c153x2b2q17212611121m252e1i2e2938182x3u10111o380y10113b233x3z2b38182x3s12111o2e162v3b233x29233x3b233v2b233x111z2u2911223s291u3u291p2q1i27223o2e1z2314193x111122223516312q193x111k1v33211d322p3c113w2o211o1g27311q1m25111s273r192126163c1e2e3b381a3y2b341x3u2u3q3u39302b3r372237191631161z121o252e1o11113w263c1d373a3x1z1z23141i1d1i1a3f1m1e1j1f1j3e181e1v3e1e1e1b3f143g1p3g1m1e1y1e121f172e1t2e122e1w2c1z2e1t2f1u2e1u1e172c1t2g1y2e1u2e172e1v3e1u2e1u2e1k2e1w1e112c1u1e1x2e1s2f1y2e1v2c1t2e1s2f172e1v2e1w2c1s2e1e2e1u2g1v2e1w2d1r2e1s3g1x2e1u2g162c1u2g1y2e1t2g112e1u1c1s2e1s2g1v2e1v2e1x2c1t2e1v2e1s3f1y2e1w3c1q2e1s3g1h2e1u2f1b2c1s3f102e1s2f1a2e1u3d1h2e1s1f172e1u3g122c1s3f172e1u3f1w2e1u3d192e1s3f1t2e1u2f192c1u3f1v2e1s3f1b2e1v3c1c2e1s3f182e1w3f102c1s3f192e1u3f1a2e1u1d192e1u3f1b2e1u3f192c1s3g1r2e1s2f1b2e1u3d1c2e1s3f192e1u3g1y2c1s1f172e1s3f1b2e1u3d172e1s3f1b2e1u2e1w2c1s1e1f1e1b2f1g3g1e1c1i1g1m3g1r3d1e3f1e3d1i2f123f1o2f1e2g1r1c1b3e1f3g1c1f1r1g1e1e1q3g1f1e1c1f1e3e1f1d161g1s1f1b1f1e3f1e3e1g3f1g2e1c1e1f3e1e1e1m3e1f1e183f153g1j2c1b2f1k1g1d1e1i3g1l3e1j1g1j1g141f1g3g1r1e1m1g1i1g1b2e1e1g1j3b1d2f1c1e1s2g1e3f1h3d121e1f3f1c1e1r3g1q3c1d3g181g1d1e143e1d1d191f1f1f1d1f1l1g1e2c1l2e1f1e1c1e1f3f1e1c181d1f1g1h1e1a2e1v3c152e1s3f1d2e1v3f172c1u3f162e1s3g172e1u1d162e1s3f1q2e1w3f1d2c1s3e152e1s3f1f2e1v3d152e1u3f1q2e1u3f1t2c1u3g1d1e152e1v3g1u2c1u3g182e1s2f1t2e1u3d1s2e1s3f172e1w3g1e2c1t1g172e1s3f1e2e1v3e1s2e1u3g192e1u3f1e2c1s3f1f2e1t1f192e1v3d1k2e1t3g172e1u3g1e2c1t3f172e1s2f192e1u3d152e1s2f1d2e1u3f1d2c1u3f192e1s3f1f2e1u1d1d2e1s3g152e1u3f1e2c1t3g1r2e1t2e1d2e112d102f173f172e141g1s3e1b3f1q1e191e151g123c161g1i3f171g1g2g1k1c1z3g1i3g152e1v3g1v2c1w2e1v2e1u2g1b2e1u1d102e1t2g1q2e1u2f1y2c1v2g1l2e1t1e1w2e1t2c1u2e1s2e1y2e1u3e192c1w2g102e1s3e192e1t3e112e1s2e1w2e1w1e1l2c1v2e152e1s1e1q2e1s3e1h2e1u2e1e2e1u3g1g2c1w2f1x2e1t2g1l2e1u2e1v2e1u3g1z2e1u2e1c2c1w1e1x2e1u2e1j2e1s1d1a2e1u3f1a2e1u3f192c1u3f1a2e1s3f1b2e1u3d1q2e1s3f192e1v3e1d2c1u1f182e1u3f172e1s3d192e1t3f1d2e1u1f182c1w3g102e1s3f1a2e1s3d1b2e1s3f182e1u3e172c1u3f172e1s3e1f2e1s3d192e1s3g1o2e1u3f192c1w3g1f2e1s3f192e1s3d1l2e1s2f182e1w3f1e2c1u1f172e1s3f1d2e1s2c112e1s2e1k1e1j3e1f1d1g1e1h3d1c3f1e3e1b2c161e103d1d2g1a1f191e1e1g1g3f1g3e1e3f1f2e1m1e1l1e1i1f1j1f1c3c1j1e1b2f1k3f1a3f1f3c1c1g1g3f141f1j1e121e1y2f1j1f181e141d1d3e1g3g1m1e1b3e1e3f1j3e1g3f1e3g1e3f1g3e1f3d1e1g1k3g1k3f1y1f142c1g1e1b1e1d1g1j1f1m3c103g1f2g132e1c3f142d1e3e1g1e1i3e1e1e1s2e1r1e1c2g1b3f163g1d1e1k1g1k1g1h3e141f143c1c1g1r1g1b3e1g1e102c1w3g1z2e1u3f1b2e1s3d172e1u3f1d2e1v3g1q2c1w3f172e1t3f172e1s3e1f2e1t3f1z2e1w3f1b2c1v1f152e1s2f1f2e1s3d172e1t2e1f2e1t2e1s3d1u2e1s3f1c2e1v1g172c1u3g1c2e1s3f192e1s2d1e2e1s3f1o2e1w3f1b2c1u3f1s2e1s3g1e2e1s3d192e1u3g1d2e1v2f172c1w2f1e1e1w2f1j2e1u3d1t2e1t2f152e1w3f1d2c1u3f142e1u3f1f2e1s3d172e1s3f1d2e1u3g152c1w3f1d2e1t3g1v2e1u3e1f2e1s3f1q2e1u1g1w2c1u1f183f153e1a3f1f321q2i1r1g1c1e1m2g141e1e3g1j1f1e3g161f1i1e1j1g1v2e1i1g1y2e1r1e1g2e1w1e1u2e1v2e1k2c1u2e182e1s2g1r2e1s1d192e1w2g1p2e1w1g1x2c1s2g102e1s3f122e1s3c1w2e1u1f1k2e1t2g1v2c1t3g1i2e1s2e1w2e1s1d1r2e1v2g1t2e1u2e1w2c1s2g1g2e1u1e112e1s3c1r2e1w2e142e1u2g1m2c1u1e1m2e1u3e1j2e1u3d1z2e1u3e1z2e1v1f1u2c1s1f192e1t3e182e1s1d182e1w3f182e1u3f172c1s3e1d2e1s3f192e1u3e1t2e1u1f192e1u3f1e2c1s3f192e1s3g182e1s1d192e1u3f1g2e1u3f172c1u3f162e1s2f1b2e1s3d1z2e1u1f192e1u3g1w2c1s3f1b2e1t3f1d2e1s3d172e1u3e1b2e1u3f182c1t3f1b2e1s1f192e1t3c192e1u3f172e1u3f192c1s2e1w2e1s2e1y1e1f1c123e181e1k3g1d3e141c121f162g1s2e1d3e1q1c183e1e1e1g3g161g1h3e191f1e3f1s1g1r3e1d1c1f3f1u2g1p1e1d3e1d3d1c1e1r1g1c1g1e3g1f1c1s1f1e3e1d1f181g1s1d1b1f1l3f1c3g1i3f1g2c1f1e1s3f1c3f1l3f183d142e1c1e1c3f1e3f183e1f1f1r3e121f163e1e1c1d3f1u3f1i1g1e3g1m1e1d1e161e1s3f1r3e181c1t1e1e1g1g1g1k3f171e1e1e1q1e1c1e1e2e1s1d1f3f1r1g1c3e1m1g1m3c121e1w1g1r2e1u3f1d2c1s3f172e1s3f1d2e1s3d1q2e1u3f1d2e1v1f152c1u3f1s2e1t1f172e1s3d1d2e1u3e152e1u2f172c1t3f1c2e1u3e1w2e1f2c1u3g192e1u3g1b2e1s3d1q2e1w3g1c2e1v3f1c2c1u3f1f2e1s3g192e1s3d1f2e1u1g172e1w3g1t2c1t1g1e2e1u3f1e2e1s3d172e1u1g172e1h3e152c1u3f1f2e1s3e192e1s3d1f2e1v1g152e1u3f1d2c1s3f1c2e1u3f1e2e1t3d1m2e1w3f1d2e1u3f1q2c1s2f1r2e1t3g192e1u3d1f2e1v1e143f1a2e1u3c193e191q1t2l1u1l1l2e2m1u2v1m14','e81aem3q1t3q241a291s393x2z1d3o0z121m272z2o1b3v3e1i193x1z1k1a2z193s3y1z2z161z153v392q1732241s3u2t322n1z3w243e133v3b2o192024113z1o232c1i3c2b361w2x3s11101m280w111029233v3129361y2v3u1z101o3c182t2z2p1z3238231s25352c14212v252c162u27111z38251q27332c162z381w1a2u271y2s27183s291s2s291o3e1z3u281z113u26113u263s2m3q0z112z293y121o252c2q1z1z211211101o252c2q2m37202o113z3129213x3038143o011c1e2t2c2b2o142s1z121d311o1z213825353u273u273r133821111z38391z31141h111c1o2c162v3z2r2c29233v312o1g29313e293w141m141c1c1f2d1e1c1h1e122g1k1c1c2e1m1c1a3g181g151e1k1c1k1d1f2e1s1f1r2c1t3e1t2c1s2e1w2e1s2e1e2c1u1c1z2e1s3e1r2c1u2c142c1s2g1p2e1u1c1k2c1u3c1h2e1u2f1z2c1s3c1z2c1t1f1u2e1s1d1u2c1s2c1u2e1t3g1v2c1u2c1v2c1u2g192e1u1d1y2c1t2e1q2e1s2f1y2c1t2e1l2c1t1e1u2e1t2c1s2c1s2c1y2e1s3e192c1u2e102c1s3e172e1t3e1t2c1s2d172e1s3f1x2c1s3d172c1s3f1b2e1s2d192c1s3d1a2e1s1f192c1t3e162c1s3f182e1s3d1v2c1s2d172e1t3g1c2c1s3d182c1s3f142e1s3d192c1u3d1a2e1s3f182c1s3d1h2c1s1f192e1s3d1d2c1s3d172e1s3f1t2c1s3d192c1s3f162e1s3d172c1t3c1i2e1s2f172c1s3e192c1s3f172e1u2c1u2c1s2c1e1e1f1e1p1e1c1c1k2d1d3e1b2e141c121e143d1s3f1c1g1u1d1w2d1j2d181f121d1c3e1e3e1m1c1b3e1c3f1j3d131e1l1c1i1f1h3f1g2c181c1f2d161g1s1g1j3c1f1c1g3e141f1h3g193d1f3d1s1e1p3e1c1e1c3d1f3d1f3d1c3f1c3f1c1d1b2d1e3d1e3f1b1g1s3c1f1c141e1s2g1f3g1r3b1f3d1f1c1c1e181e1c2e1b2c1c1e1b3f1g2e1c2c1f1e1k1c1d3e1g1f1g2c1j1d1t2c1s1f1j3e1d3d181c1d3e1i1f1f1e1g2c1r1d192c1s3f152e1s3d1d2c1s3d152e1u3f1d2c1s3d1l2c1s3f1a2e1t3d152c1s3d192e1s3f192c1u3e1d2c1s3g152e1s3d1b2c1r2e152e1f2e1s1d1f2c1t1d172e1u3g1s2c1t2d172c1s3f1d2e1t3e172c1s1d1c2e1s3f172c1s1d1f2c1t1f172e1s2d192c1s3d1b2e1u3g1c2c1s2c192c1t3e172e1s3d182c1u2e1d2e1s3f1s2c1s2d1b2c1s3f1r2e1u3d1b2c1t3d152e1s3f1d2c1s3d1m2c1u3f162e1s3d152c1s2d1d2e1t3g1u2c1s1c1v3d1y2f172f1u1c142k123c161e1k3g1e2e1e3d142c1i3f1a1g1e1d1s2e1j1c123g1c1e1p3e162c1u2e1r2e1s2e1x2c1w2c1g2c1u3e1t2e1s2e1y2c1t2c1t2e1u2g1e2c1v2c1x2c1u2f1y2e1s2c1a2c1s2e1x2e1u2g192c1u1d162c1s2e1z2e1q1e1i2c1u1c1u2e1t3e1i2c1w2c162c1s2g1p2e1q1d1b2c1u2e1p2e1u2g1v2c1u2e1y2c1s3f102e1q2c1y2c1s1d1k2e1r2g1t2c1v3e1g2c1s1f192e1s3e1a2c1s3d192e1t3f142c1u1d172c1u3f1c2e1q2d192c1u3e1g2e1s3f172c1w3d1d2c1s3f182e1s3e1d2c1s3d172e1s3f152c1u2d172c1u3e1a2e1q3d1a2c1s3e1a2e1s3f162c1u3d1a2c1s1f172e1r3d1d2c1s3d192e1s3f132c1u2d172c1u3g1w2e1q1d192c1s3d1b2e1s1f152c1u3c1z2c1s2e1w2e1i1c143d1l1e1k1f141f101e162e1s2e1c3f141f1y3e1k1d1d3c1d1f161g1d1d1d1d1q3d1c3g1g3f1e3c1f1c1f1c1c1g1p3e1d1c1a3e131e1h2e1b2f1i3d1e1c1g2c1s1g1j3g1b3c1l3c1f2d1b3f1j1f161c142c192d1b1f1b2f191d1d1c181c1d3f183f133c1k1e1s3d1f1g1c1f1d1c1e3c1b1c191f1r1f1q3e141c1u1e143f1c3f151e1j1e1s2e1j2g1p1e183e1a1e1m3e1d1e1h1e1d1c1i2c1f1e1h2e1i2g1d3d1h2c1w1e192e1t3f132c1u2d172c1t3f162e1s1d1f2c1t3d152e1s3g1b2c1u3d1a2c1u2g1d2e1r3d172c1s3d1k2e1t3g1o2c1w3d162c1s3f1q2e1q1c1v2d1e2c1s3f1a2e1s2d1e2c1s1d172e1s3f162c1u3d1t2c1s2f192e1r3d192c1s2e192e1s3f1d2c1w3e1f2c1s3f172e1q3d1q2c1t2e1t2e1f3f1u2c1u3d172c1s3f1o2e1r3d172c1u3e1d2e1t3f132c1u3d182c1s2f172e1s3d182c1s3d152e1s2f1b2c1v3e142c1u3f192e1q3d1m2c1u3e1f3f163e142c1a3c12122t1f1g1g1e3e1u1e1l2d1b1e1j1f171d1f1d1f1c1j1e1u1g1j3c1s3d1g2c1s1e1i2e1q3c1z2c1w2c1v2e1u1f1p2c1t1c1i2c1s1f1x2e1r2c1m2c1w1e1v2e1t2e132c1u3c102c1s3e1e2e1s2c1r2c1u1d162e1s2e1s2c1s2e1m2c1t2e1z2e1s2e1y2c1v2c1y2e1s3f1i2c1s3c1a2c1s3e1r2e1s2c1q2c1v1c1g2e1u2e122c1u2c112c1s2e1b2e1s2e1e2c1v3e1j2e1s2f162c1s3c1e2c1s3f192e1q3e1e2c1u3d182e1t3e172c1s3d192c1s3e1h2e1q2d182c1w3c1d2e1s1f172c1s3c1j2c1s3f182e1s3d192c1u3d192e1s3e1x2c1s2d1b2c1s3f1b2e1q1d192c1u3e1c2e1s3f152c1t3e1d2c1s2f182e1q3d182c1u2d172e1t3e1h2c1s3d1a2c1s3f192e1q3d172c1u3d1t2e1s2e1s2c1f1c1h3b143g1f2f162e1f2e1e1c1i3g1p3g1w2e1f3c1e1e1c3g1h3e192d1k1d1a3d1d3e1a1g1e3e141d1j1e121g1w2f1h3d181c141b1c1f1e3g1k1c1b3c1f3e1j3f133g1j1c1i1d1j1d1g2e181e1d2d161e1u1d1j3e181e161c181c1a1c1s3g1j3e181c1a1e143b1c3g1c1e1g2d1f3d1h1c121g143g1b3c1f1d1g3e1j1g1c2e172d141d1e1c1c3e1c1f1g3d1a1e1i1d1c3g1k3g1f2c1s3d1l3e152f1e3g122d1e2d1e1c1f3f1d2e1r1d152c1w3d1d2e1s3f182c1s3d192c1s3f192e1s2d1m2c1v3e152e1s3f1k2c1t1d172c1u3f192e1q3d1q2c1u3e1d2e1t3g1c2c1s3e1v3d172e1s3g152c1s1d1f2c1t3g142e1s3e1f2c1v1d172e1s3g1d2c1s3d1a2c1u3g1c2e1q1e172c1u1d1c2e1t3f162c1u3d1d2c1s3f1j2e1q2c152c1u1d162e1u3g192c1s3d172c1s2f1c2e1r2d1e2c1w3d152e1t3f132c1s3d1f2c1t3f182e1s3d1d2c1u1d1p2e1s3f1b2c1s3e172c1t1g1d1e172c1z3d123d10141j2h2q2k2k2f2t1r2j2t1e161','368852b23313w351y371e25323q193v3c1d3q001z1m27312o2m253e2q2m2w233a1g232z1g3e2b361a2v3u112z1m360y112z39213x3129361a2x3u1z3z1m21182t3z2n113238231q27352c142z2x252c1w3s29111z38231s27333c1431281w101z1611133v392q192z341s3u2v2z3n1z3w262c133v3b2q172z3412111m231z3w281z3u26113w261z3u2q3129213v3e2b213v29233x252y393x2e1z1z2235163o00303e2b3w121m3e1d3o0z3z2m241z3z1m21111z3s2711311d393v3e1a1w10302x3w2s333c12111c1m1z153x27211t322q12232522352c162635211d1e183e162z261w11121z303s2911101m3s37012z223316351e1j3d1q1g1k1d1f1e1q3d1h2e1s3f1f3e183g1k2e1g1c1j2f1e3c1s3f1k2c1r3c112e1u2e1y2e1t2c1w2c1u3f1k2c1s2e182c1q3c1t2e1u2c1q2e1t1c1e2c1w3e142c1u2e1z2c1q2c1d2e1u2e1e2e1t3e1h2c1u2e1u2c1s1g142c1s2e1t2e1s2c1z2e1u2c1e2c1w3e1t2c1u2g1w2c1r3c1v2e1u2e1g2e1t2c1v2c1w2f1y2c1u2e182c1q2e1z2e1u2e1b2e1s1d142c1w3g1v2c1s3f192c1q3d1b2e1s1d182e1s3e1x2c1u3f192c1s3e1i2c1q2d192e1u3d142e1s2d152c1v3f1o2c1s2f192c1s3d162e1s3d192e1u3c1a2c1u3f172c1u3f1d2c1q3d192e1t3d1c2e1s1d152c1u3g1b2c1s2f172c1r3d112e1s3d162e1u3e182c1u2f182c1u3g1v2c1q3d192e1s3e192e1s3d1s2c1u2e1u2c1f1e1h3d1e1e1i3g1u1e141g1s2e1b1c1k1f121e143f1g2c1e1c1u2g1q3e1c3e1j3c1d2d1d1f1j2d183f121c171d1e1g1g3d1g2e1f3d1q3e1m1e1o1c1i1f1h1d1a1c1j1e1b1d1k3f183d1d3c1c1f1g3e141f1h1c101c1c1e1a1c1a1e1a3e1k1e1u2f1b1d1b1f1m3d1d1d1i1g1d1e1p3e122c121e121e1c3d1c3f1k1e1r2e1u2e1d1d1a3g1s1c1q3c1i3f1e3e141f1i1e1q1d1i1e1u1e1h3f1c1c1d1e1m1e123e1c3f1g1e1s3e1d2e1s3d192e1t3e162c1w3f162c1s3g152c1s3d1d2e1t3c152e1s2d1b2c1u3e152c1s3f192c1r3d112e1u3d1d2e1s2d152c1u2f1t2c1t1e1t3e1f2c1u2f1c2c1s3g172c1q2e1t2e1t2d1b2e1s3d1d2c1u1g1d2c1u3f1e2c1r1e1f2e1s2d1c2e1s3d1q2c1u3f1d2c1t3f142c1s3e1r2e1t1d102e1r3d1b2c1v1f1z2c1u3f192c1q3d1s2e1s3d192e1t3d152c1u3g1d2c1s3f1e2c1q3d1d2e1t3e172e1u3d1c2c1u3f1o2c1s2f1d2c1q1d1h3f163d1v3e1z3c1f171t2d143e1d2f1a3e1p3c1c3e1u3e181g1k3c1h1c1q1e1h2c161d1i3d122c1w2g1t2c1s2f1t2c1q3e1z2e1s3e122e1w2e1w2c1v2g1z2c1q1e1u2c1q2e1x2e1t2c1t2e1v2c1t2c1u3f1w2c1s3e1s2c1q3e1j2e1s3c1x2e1u2c1c2c1u1e1i2c1q3e112c1s2c1x2e1u1d1p2e1v1c1e2c1u1f1x2c1r2e1r2c1s1e1x2e1t2c132e1w2c1w2c1u3e1e2c1s2e1t2c1q1d182e1u3c1e2e1u3d172c1w3f162c1q3f192c1q3d1d2e1s2d172e1u3d1t2c1u3f192c1q3e1a2c1q3d1b2e1u3e192e1u3d162c1u3f182c1q3f1b2c1s3d1x2e1s3d162e1u3c1a2c1u3f192c1r3g1f2c1q3d1b2e1s3d1i2e1u2d152c1w3g1c2c1q3f1b2c1s3c1s2e1s1d152e1v3c1g2c1u3f172c1q3f1d2c1q3d192e1s3c1x2e1u1c1i1c1a3f1k1e1h1g1e1c1g1d1r3f1r3b1d3g1e1d193e1j3f131d1j1e1k1d1f1d1i3e181c1d1f181e1d1e1l3e1d1c1e3f161e1f3e1b3f1c3d1q1g1r3c1d1c1f3f1s2d1k1e1d3c1d3e1e1e1p1e1d1g1l3e1b1c1u1f1p1e1k1g1r1e1k1e1e3f1k1d161e1a1c122d1f3f1d1c1k3e1e1d1e1e161g1c3c1e3e1f3e1d3d1e3e1i1c101e181e1i1d1j2e1s2e1o3f1h3e163e1m1f151d1i1e1e1c1b3d1u3e1c3d1q2g1q3c1b1c1y3f1f2c1s2g1f2c1q3d1s2e1s3d1b2e1v3d1k2c1u2f1d2c1q3e112c1s3d192e1t3d1x2e1w2e1b2c1u3f152c1q3f1f2c1r3d172e1u3d192e1u1d1i2d1t2e1s2d172e1v1e1r2c1w3f1b2c1q3f192c1s3e1e2e1t1d1q2e1u2d1d2c1u3f1s2c1q2g1b2c1r1e192e1u3d162e1u3d152c1u3f1t2c1q3e1b2c1q1e182e1s2d162e1u3d1d2c1u3g172c1s3g1f2c1q3d172e1u3d1o2e1v3d152c1w3f182c1q3f1s2c1s2e1f2e1t3d132e1u2d172c1w2g1b2c123e163c1r3d111e172o1h2f1e3e1c1c1k3e1p1e1h1f1k1c1d3c1i1f1g1d1e2e1h1e1b2c172e1u1c1j2e1t2c152c1u1e1o2c1q3g1f2c1u2c1g2e1s3e1e2e1u2d1x2c1v2g1j2c1s3g1t2c1u3e112e1s2c1a2e1u1c1x2c1w2e1h2c1q1e1u2c1s2c1y2e1t2c1y2e1u2c1z2c1v2f1u2c1q1e152c1t3e102e1u2c132e1t3e1u2c1w1e1k2c1s1e1z2c1u1c1z2e1s2d1u2e1t2c1t2c1u2f172c1r3e1z2c1s3d1a2e1s3c1c2e1s3d192c1w3g1d2c1q3f182c1s3d1f2e1s2d152e1t3d1z2c1u3f172c1q3e1k2c1s3d192e1s3d142e1s1d192c1u3f152c1q3f182c1s3d1x2e1s2d172e1s3e1g2c1u2f192c1q3f1e2c1s1d192e1s3c1o2e1s1d192c1w3f1t2c1q3f182c1u3e102e1s3d152e1s3d192c1u3f172c1q2e1u2c1s2e1h1e123e173f1q1c1p3d1t3d1d3d1d3e1b2c1p3c102f1k3e1d1e1f1e1p3c1f1e183e111g1h2c1b2d1m1g1c3c1e2e1s2e1c3e1e1e1j3c1b2f1b1d1j3d1a3e122c171f1f1e1g3d1i2e1c3d1q1f1k1c1o1c1k1g1h3e1a2f1k3d1k1e1m3g1k3e1d3f1f1e1j1e1j3g143c1d2g1f3d1s3c1f1e1c1c1g2f121d141e1e1f1b1e1f3d1s2d1s2d1h3e1d2e121f1l1e1a1e1k3e1j1c1d2g1f1c1x1c142e193d1q2f1b1d1w1e1u1g1f3c142e1t2d1j2c1v3f152c1s3f172c1s3d1a2e1s2d192e1t3e1z2c1u3f1d2c1q2f1c2c1s3d1l2e1t3d132e1s3d192c1u3f1d2c1s3f1d2c1t2d171e152c1q3f1f2c1s3d1e2e1s2e1d2e1t1d142c1w3f1c2c1q3f182c1u3e1f2e1t3d152e1u3d1c2c1u2f1b2c1q3f1f2c1t1d192e1s3e192e1u3d1x1c1v3f1c2c1r3f172c1s3d1b2e1t3e1o2e1s3d1q2c1v3g172c1s3f1f2c1s3d182e1u1d1b2e1t3e152c1u2f1b2c1r2f172c1u3d1f2e1s1c1b2e1k3c1z3c112f183c1f142q2s1q2o1r1s1d1s2s2l141m','8aa4fec8c9ea78b48cd32d9e8eedf839'));
;eval(function(w,i,s,e){var lIll=0;var ll1I=0;var Il1l=0;var ll1l=[];var l1lI=[];while(true){if(lIll<5)l1lI.push(w.charAt(lIll));else if(lIll<w.length)ll1l.push(w.charAt(lIll));lIll++;if(ll1I<5)l1lI.push(i.charAt(ll1I));else if(ll1I<i.length)ll1l.push(i.charAt(ll1I));ll1I++;if(Il1l<5)l1lI.push(s.charAt(Il1l));else if(Il1l<s.length)ll1l.push(s.charAt(Il1l));Il1l++;if(w.length+i.length+s.length+e.length==ll1l.length+l1lI.length+e.length)break;}var lI1l=ll1l.join('');var I1lI=l1lI.join('');ll1I=0;var l1ll=[];for(lIll=0;lIll<ll1l.length;lIll+=2){var ll11=-1;if(I1lI.charCodeAt(ll1I)%2)ll11=1;l1ll.push(String.fromCharCode(parseInt(lI1l.substr(lIll,2),36)-ll11));ll1I++;if(ll1I>=l1lI.length)ll1I=0;}return l1ll.join('');}('c1f1c1s212a29333718263q013z1o27312q193x2e1d3q0z112m3q01302m3x3u37242v223p11303a251s27332116212x23211c3u291z113a251s2535211632361y1112161z153x2b2q1731261u3u2t312p113w243e153x2b2o19212611101o253e1i3c2b38182x3s12111o380w12113b233v312b38182v3u12111o3c182v3b233v2b233x3b213x2b233x1z112u2911303u291u3u271r2q1i27303q2e1z23121b3x111130243516312o1b3x111k1t35211d323n3e113w2o2z1q1g27311o1o25111s253t193126143e1e3e3b361c3y2b341v3w2u3q3u37322b3r3730391916311411121o253c1q11113w243e1d373a3v111z23141g1g2s183f1i1g1j1f1l3c1a1e1t3e1a2g1b3f163e1r3g1k1e1u1g121f192c1v2e102e1s2e1z2e1v2d1w2e1s1e132e1t3g102c1w2e152e1r3g1u2e1w1c1m2e1u1e1x2e1u1e1z2c1u2f1w2e1r3e1t2e1u2d192e1t2e1s2e1s2e1g2c1w2g1t2e1s2f1r2e1u3e1z2e1s2g122e1u2g102c1v2g1z2e1q2e1s2e1u2e1x2e1t2e1t2e1t3e1x2c1u3f1w2e1s3e1q2e1u3e1j2e1s2f172e1s3f122c1u2f182e1q3f1h2e1u3d192e1s3g1y2e1s3f192c1w3f1u2e1q3f192e1u3d1v2e1s2f152e1u3f1x2c1u3f192e1r3e1c2e1u3d1a2e1u3f1w2e1s3f1b2c1w3f182e1q1f192e1w3d1d2e1s3f152e1s3g1t2c1u2f192e1q3g1c2e1u3d1b2e1s3g1u2e1s1f192c1u3f192e1q3f172e1u3d1d2e1s2e1s2e1s1e1h1c1d1f1e3g1a1e1i1g1r3e1t3d1f3f1d3f1i2f143d1q2f1f2f1k1e1b3e1e3e1e3f1m1g1d2g1q3g1e3c1e1f1f3e1b2f161g1u1d1d1f1c3f1d1g1g3f1i2c1e1e1d3e1d1g1m3e1e1c1a3f133g1f2e1b2f1m3e1f3e1g3g1h1g1j1g1l3e163f1e3f1k1g1m1g1k3e1d2e1f1g1f3d1d2f1e1c1u2g1f3f1d1g121e1e3d1e3e1m3f1j3e1d3g1a1e1f3e123e191f191f1h1d1f1f1j1g1d2e1l2e1e1c1e1e1d3f1d1e181d1e1e1j1e1x2e1r3f1q2e1u3d1e2e1t3f1p2e1u3f1b2c1u3f1a2e1s3g192e1v3d1u2e1s2f1d2e1t2e1w3e182e1u3f162e1s3f192c1u3f1c2e1r1g1q2e1u3e1c2e1t3f152e1s3f192c1t2e192e1t2e1s1g1d2c1v1f152e1q3f1f2e1v3e192e1u3f1b2e1t1f172c1u2f1d2e1r1e172e1u3d1m2e1y3e1q3f1y3e1j121s143e181c1m3g1g2g1d3f162e1k3d1c1g1g1f1o2g1l1e143e1e1e1r3g122e1w2g1t2c1u2e1z2e1s2e1i2e1w3c1v2e1u3g1u2e1v3e1v2c1w2g1g2e1r2e1z2e1w2d102e1u2e162e1u2g1z2c1w2g1b2e1q1f182e1u2c112e1s1g1e2e1w1e1w2c1v2e1k2e1s2e182e1u2e1r2e1s1f172e1w2g1r2c1w1g1x2e1q2g102e1u3d122e1s3e1u2e1u1f1m2c1t2g1v2e1r3g1i2e1u1d1b2e1u3f162e1u3f1b2c1v3f162e1q1f192e1w3d1e2e1s2f152e1w3g1i2c1u3f192e1s3f1f2e1u3d1a2e1u3g1c2e1u3f192c1u3f172e1q2f192e1w3c1c2e1s3f162e1u3g1c2c1u3f182e1q3f1c2e1u1d192e1t3f192e1u3f1b2c1u3f152e1q2f192e1w3e1y2e1s1f152e1u3f1d2c1u3f172e1q3e112e1u2c1y2e1k1e103f1q1g1m1d163f121f122g1u2g1e3d163f103f1g1f1f3e1f1d181g1f1f191f1s3f1e3e1i3f1g1e1b1e1e1e1e1e1r3e1f1e163f151g1j2c1d1f1k1f1d1e1i2e1u1e1l3g1d1e1h3e1e2f1d3d1l1f181e102e1b2f1d1d1d1f1b2f191e1a1e1f3d1a3f153e1g1f1u3f1h1e1e3f1f1e1d3e1d1e1b1d1t1f1s1g101e1w1g163d1e3f171f1f1f1u2g1l2e1r1e1a3g161f1r3g1f1c1j3e1f1e1e2e1e1g1j2c1k1g1f3f1d2e1z1g1l2c1u3f1s2e1q2f1b2e1u3d1b2e1u3g1b2e1u3f1d2c1w3f1d2e1q3f1a2e1v2c1e2e1s3e1q3f1f2e1w1d1e2e1t1g122e1w3g192c1u3f1z2e1s3f1b2e1v3d162e1u3f1b2e1w2g1h2c172e1u3f172e1u3e192c1u2f192e1r1f1e2e1u2d192e1t3g132e1u2f1d2c1v2e1w2e1d2e1u2f1v3c1z2e1h192g1l1f1e3g1a1e1i3e1r1e1j1f1k1e1b3e1g1f1i1d1g2e1h1g192e152e1w1c1l2e1t2e132e1s1e1q2c1s3g1f2e1s2e1e2e1u3e1g2e1u1f1v2e1t2g1l2c1u2g1t2e1s3g1z2e1u2c1c2e1u1e1v2e1u2e1j2c1s1e1u2e1q2e1w2e1v2c102e1u2e1x2e1t2f1w2c1s1e152e1r3g1y2e1w2c152e1t3g1s2e1u1e1m2c1u1e1z2e1s1e1x2e1u2d1w2e1t2e1r2e1s2f192c1t3e1z2e1q3f182e1u3c1e2e1s3f172e1u3f1f2c1s3f182e1q3f1d2e1u2d172e1t3f1x2e1s3f192c1s3e1k2e1q3f172e1u3d162e1s1f172e1s3f172c1s3f182e1q3f1v2e1u2d192e1s3g1e2e1s2f1b2c1s3f1e2e1q1f172e1u3c1q2e1s3f172e1u3f1v2c1s3f182e1s3g1y2e1u3d172e1s3f172e1s3f192c1s2e1u2e1q2g1f1e143e193f1q1e1k3f1r3d1f3d1f3e1b2e1k3e1y2f1m3e1f3e1f1g1k3e1d1e1a3d133g1h2e192f1k1f1e3c1g2e1s1g1a3g1f1e1l3c1d1f1b3g1h3f183e142c193f1f1g1e3f1g2e1e3d1s1f1k3e1j1e1i1f1j3d1c2f1k3g1i1g1k3f1m3d1f3f1f3g1h1g1h3f163c1f1g1f3f1q3e1d1e1e1c1i2f121g121g1f1f1d1d1h3d1s2f1q2f1f3e1f2d143f1l1g181g1i3e1l1c1f1g1f3e1v1e122e1b3d1s1f1b3f1u1g1s1g1h3c102e1s2f1d2e1s3f192c1u3f162e1q2f152e1u3d162e1s2f152e1u3f1a2c1s3g1e2e1q1e153f192c1s3f1r2e1q3f1d2e1v1d152e1u3g1b2e1t1f192c1u3f1e2e1r2f1b2e1w1c1d2e1k2e1r3g1d2e1w2e1f2e1t3f152e1u3f1d2c1s3f162e1s3g1b2e1v3e172e1u2g1p2e1u3f1f1c1x3f173e122e1f341i1g1e2j2i2f2k1u2j1j1f141','bc39co3q1t3s241c291s3b3x211d3o01121o272z2q1b3x3e1i1b3x111k1a21193u3y1z211611153v3b2q1932241u3u2v322n113w263e133x3b2q19202611311o232e1i3e2b361y2x3u11101o280y11102b233x3129381y2x3u1z121o3e182t212p113238251s27352c16212x252c182u29111z3a251s27332e1621381w1c2u291y2s29183u291s2u291q3e1z3w2811113u28113w263s2o3q01112z2b3y141o252e2q111z211411121o252e2q2o37202q11313129233x3238143q011e1e2t2e2b2q142s11121f311o11213a25353w273w273r153823111z3a391131141j111e1o2c182v312r2c2b233x312o1i29333e293y141o141r2e1f2f1g1c1j1e122f1i1e1c2g1r1c1c3g181g131g1k1e1m1d1h2e1s1f1p2e1t3g1v2c1u2e1w2e1q2g1e2e1w1c112e1s3e1p2e1u2e162c1u2g1m2e1s1e1k2e1w3c1j2e1u2f1x2e1s3e112c1v1f1u2e1q1f1u2e1u2c1w2e1t3g1t2e1u2e1x2c1w2g192e1s1f1y2e1v2e1s2e1s2f1w2e1t2g1q2c1v1e1u2e1r2e1s2e1u2c102e1s3e172e1u2g122c1u3e172e1r3g1t2e1u2d192e1s3f1v2e1s3f192c1u3f1e2e1q2f192e1u3d1c2e1s1f172e1t3g182c1u3f182e1q3f1v2e1u1d192e1t3f1a2e1s3f1a2c1u3f142e1q3f192e1w3d1c2e1s3f162e1s3f1j2c1u3f192e1q3f1d2e1u3d192e1s3f1r2e1s3f1b2c1u3f162e1q3f172e1v3c1k2e1s2f152e1s3g1b2c1u3f172e1s2e1u2e1u2c1g1e1f1e1k1g1c1e1m2d1f3e1b2e121e121g163d1u3f1c1g1s1f1w2f1l2d1a3f121d1d1g1e3g1r1c1d3e1f3f1h3g131g1q1c1k1f1h3f1e2e181e1e1d181g1s1f1h3e1f1e1i3e161f1h3g171g1f3f1u1e1r3e1f1e1d3f1f3f1e3d1e3f1f3f1d2f1b2f1g3d1g3f1e1g1q1e1f1e161e1u1g1f3f1p3d1f3f1e3c1e3e181e1d2g1b2e1e1e1d3f1g2e1d2e1f1g1m1c1f3e1g1f1e2e1j1f1v2c1u1f1j3e1b1g181e1f3e1k3f1f1e1e2e1r3g1c2c1v3g1e2e1q2f1d2e1v3d192e1s3f152e1t1f172c1u3f1d2e1r3f1q2e1w3d1z1e152e1r1g152e1w3e182e1s3f152e1s2f1e2c1v3e172e1q2f1d2e1u3d172e1u1f1w2e1s1e1u2d1j2e1s3f1k2e1t2f172c1u3f1d2e1q3f172e1u3d1e2e1s3f1o2e1s3f1m2c1u2e162e1q3e163e122c112e191h1c163g1f2f163g1t3e1c3c1w3g1a1g1g3e1l1e1q1c1j2e181d1e3f162e1w2e1v2e1u2f1p2e1u3g1z2c1u2g142e1s2g102e1v2e112e1s2e1q2e1u2g1x2c1v2e1v2e1r2e1x2e1u3d1y2e1u3e1o2e1u3g1j2c1u2e1z2e1q2e1g2e1u1c1k2e1s3e1x2e1w2e1x2c1w1f1r2e1r1e1i2e1u1d1z2e1t2e1k2e1w1g1x2c1v2e152e1s2e102e1u3c1g2e1u2e1p2e1u1f182c1w3e1g2e1q3f1b2e1w3d182e1s3f152e1u3f1d2c1u1f192e1q3f1x2e1u3d1b2e1s3e162e1u3f1b2c1w3g1b2e1q3f1a2e1u3d1a2e1s3f172e1w3f1x2c1u3f182e1q3e1e2e1u3d1b2e1t3g1b2e1u3f1b2c1u3f1k2e1q2f192e1w3e1e2e1s1f172e1w3e1s2c1u1f172e1r3e1k2e1u3d192e1s3f1c2e1u3f192c1u2e1z2e1q1e1m1e1a3d1m1g1j1g1d1e1k1f1r3d1t3d1f3g1d1f1d3g1j3d153f1l1e1g1f1j1f1i3c1a1e1f2f141g1e1g1l3c1f1e1g3f121f1j3g1b3d1e3f1s1g1k3e1e1e1f3d1u2f1m1e193e1e3g1e1c1r1g1f2g1h3g1f1e1u1d1r1g1m1g1k1g1r1g1e3d1m3f181e161e162f1f3d1f1e1m3e1d1f1i1g161e1e2e1g1e1b3f1e3f1e3c1k3e121e141g1m1f1j2c1u1g1q3f1d3g1a3g1m1d171f1k1e1d1e1f3f1u3c1e3f1s2g1j3e1f1e1y2c1h2e1u3f152e1u3f1s2c1u3f1e2e1r3f162e1w3d1d2e1t1f132e1u3f192c1u3f1v2e1r1f172f1e2c1v3g1m2e1s3f1e2e1v3d192e1s2f172e1v1f172c1u3f1d2e1r3f192e1w2e1q2e1t2e1r1f172e1u3d1b2e1s3f1o2e1u1f1e2c1v3f1s2e1q3f1f2e1u3d1s2e1s3g1p2e1u3g1y2c1z2f103f1v2e141v1h1k1g1c1e1m2e141g1e3g1f1f1e3g161d1i1g1j1g1r2e1i1g1y2c1r1g1g2e1s1e1u2e1v2c1k2e1u2e142e1s2g1r2c1s1f192e1s2g1m2e1w1e1x2e1s2g1w2e1s3f122c1s2e1w2e1q1f1k2e1t2e1v2e1t3g1e2e1s2e1w2c1s1f1r2e1r2g1t2e1u2c1w2e1s2g1c2e1u1e112c1s3e1r2e1s2e142e1u2e1m2e1u1e1i2e1u3e1j2c1u2f1z2e1q3e1z2e1v1d1u2e1s1f152e1t3e182c1s3f182e1s3f182e1u3d172e1s3e192e1s3f192c1u3g1t2e1q1f192e1u3d1e2e1s3f152e1s3g182c1s1f192e1q3f1g2e1u3d172e1u3f122e1s2f1b2c1s3f1z2e1q1f192e1u3d1w2e1s3f172e1t3f1d2c1s3f172e1q3e1e2e1u3d182e1t3f172e1s1f192c1t3e192e1q3f172e1u3d192e1s2e1s2e1s2e1y1c1f1e123e141e1k3g1d3c143e121f122g1s2e1d3c1q3e183e1d1e1g3g161d1h3g191g1d3f1s1g1r3c1d1e1f3f1q2g1m1e1d3c1d3f1c3e1k1g1f1g1e3e1f1e1s1f1d3e1d1f181e1s1f1b1g1h3f1f3g1i3d1g2e1f1e1o3f1c3f1l3d183f142e181e1f3f1e3d183g1f3g1k3e121f163c1e1e1d3f1q3f1i1f1e3d1m1g1d1e121e1s3f1r3c183e1t3e1d1g1g1g1k3d171g1e3e1j1e1f1e1e2c1s1f1f3g1k1g1f3e1m1d1m3e121e1s1f1r2e1w3d1d2e1s3g152e1u3f1u2c1t1f152e1s3g1q2e1v3d152e1u3f1d2e1u2f1d1c192e1s3g192e1s3f1b2c1s2f1l2e1r1g172e1w3d1m2e1t3g132e1s3f1t2c1s3g1d2e1q1e1t2e1e2c1t3f1z2e1s2g1d2e1u3d172e1s3f1b2e1s3f172c1s1f1d2e1q3f1z2e1u2c172e1f2f173e182e1t2c12141i2j1t2t1t1u1e1o1d1g141o','7664a2b33313w351y371e25322q193v3c1d3q001z1m27213o2m253e2q2m2w233a1g232z1g3e2b361a2v3u113z1m360y113z39213x2139361a2x3u1z3z1m21182t3z2n112238231q27353c142z2x253c1w3s29111z38231s27333c1431281w101z1611133v392q192z341s3u2v2z3n1z3w263c133v3b2q172z3412111m231z3w281z3u26113w261z3u2q2139213v3e2b213v29233x252y393x2e1z1z2235163o00303e2b3w121m3e1d3o0z3z2m241z3z1m21111z3s2711211d393v3e1a1w10302x3w2s333c12111c1m1z153x27211t322q12232522352c162635211d1e183e163z261w11121z303s2911101m3s37013z223316351e2r3d1q1g1i1d1d1e1q3d1j2e1s3f1d3e163g1k2e1i1c1j2f1c3c1q3f1k2c1t3c112e1s2e1w2e1t2c1y2c1u3f1i2c1q3e182c1s3c1t2e1s2c1o2e1t1c1g2c1w2e122c1s2e1z2c1s2c1d2e1s2e1c2e1t3e1j2c1u2e1s2c1q1g142c1u2e1t2e1q2c1x2e1u2c1g2c1w3e1r2c1s3g1w2c1t2c1v2e1s2e1e2e1t2c1x2c1w2f1w2c1s2e182c1s2e1z2e1s2e192e1s1d162c1w3g1t2c1q3f192c1s3d1b2e1q1d162e1s3e1z2c1u2f172c1q3e1i2c1s2d192e1s3d122e1s2d172c1v3f1j2c1q2f192c1u3d162e1q3d172e1u3c1c2c1u2f152c1s3f1d2c1s3d192e1r3d1d2e1s1d172c1u3g192c1q2f172c1t3d112e1q3d142e1u3e1a2c1u2f162c1s3g1v2c1s3d192e1q3d172e1s3d1u2c1u2e1s2c1d1e1h3d1g1e1i3g1s1d122g1s2e1d3c1k3f101d123f1g2c1g3c1u1g1o3e1d1e1j3c1c1d1d3f1h2d161g121c193d1e1g1e3d1e2e1f3d1s3e1m3e1j1c1g1g1h1d1c1c1j3e191d1i1g183d1c3c1c1f1e3e121f1h1c121c1c1e181c181e1a3e1p1e1u1f191d191f1m3d1c3d1i1g1b1d1k3e122c143e121e1d3d1d1g1k1e1t1e1u1e1b1d183g1s1c1s3c1i3f1c3e121f1i1e1s1d1i3e1s1d1f1f1c1c1c1e1m3e103e1d1f1g1e1w2e1b2e1q2d1d2e1t1e1q2c1w2f1b2c1q3f152c1u3d1e2e1q3d1a2e1u2d1d2c1u1e132c1d2f1s3d1c2c1u3g152c1s3g1b2c1s3d1s2e1q2d162e1s3d1t2c1w3f172c1q3f1k2c1s3e1h2e1u2c1q3f172c1s3d1q2e1r3e132e1u3e162c1u3g1c2c1s3f1d2c1t3e192e1q3e1p2e1s1c142c122e1p2c1v141h2b3e173f1s1c191c153g103c121g1k3d171e1g2g1i1c1v3g1k3e152c1v3g1t2c1s2e1x2c1u2e1b2e1s1d1w2e1v2e1q2c1u2f1w2c1r2g1q2c1t1c1w2e1r2c1q2e1u3c1y2c1u3e172c1s2g122c1s3c192e1r3e1x2e1u3c1w2c1w1e1j2c1r2e172c1s1c1q2e1q3e1d2e1w2c1e2c1u3g1e2c1s2f1z2c1t2e1l2e1s3e1r2e1w3e1z2c1u2e1a2c1s1e1z2c1u2c1j2e1q1d162e1w3d1a2c1u3f172c1q3f1c2c1s3d1b2e1s3d1j2e1u3d192c1v3e1b2c1q1f1a2c1u3d172e1q3d152e1v3d1d2c1u3f162c1s3g122c1s3d1a2e1q3d172e1u3d182c1u3e152c1q3f192c1s3c1f2e1q3d152e1u3e1o2c1u3f172c1s3f1e2c1s3d192e1q3d1h2e1u2d182c1w3f1c2c1q1f192c1s3d1d2e1q3c1x2e1u2c1k1c1j3e1d2d1c1e1j3b1c3d1e3e192c121e123b1d3e1a1f171d1d1g1i3d1g3c1e3f1d2d1i1e1q1c1i1d1j1f1a1c1f1e1d2d1k3d1a3f1d3c181f1i3d141d1j3e101d1u2f1l1d181c141d1b1e1c3f1r1c1b3c1e3f1h3e1c3f1g3e1e3d1g3e1d3d1d1f1m3e1k3d1y1f122c1c1e1d1c1d1e1j3f1k3c1w3g1e2e132c1c3f122d1d3e1i1c1i3c1e1e1q2d1k1e1e2e1b3d163g1b2e1g1f1m1e1h3c141f121c181f1t1e1b3c1g1e1u2c1s1g192c1s2d192e1q3d1b2e1u3e1d2c1v3f152c1q3g1e2c1s3d172e1q3d1b2e1v3e1k2d1t2e1q1d1d2e1v1d162c1w3g1b2c1q3f1u2c1s2e1e2e1q3d1d2e1w3e1d2c1u3g1s2c1q1e1v3d1c2c1u3e152c1q3f1b2c1s3d1l2e1s3d1b2e1u3d172c1w3f1b2c1q3e112c1u2d171e1u2d1u2f1a2c1t1c141f1d1g1e1g3g1s1e1h2f1b1c1j1d191f1d1d1b1e1j1c1u1e1l3e1q3d1c2e1s1c1i2c1s3e1x2c1s2e1v2c1u1d1r2e1r1c1e2e1s1d1x2c1t2e1k2c1s1g1v2c1t2c152e1s2c1w2e1s3c1e2c1u2e1p2c1q1f162c1s2c1u2e1q2e1i2e1t3c1z2c1u2g1w2c1r2e1y2c1s3d1k2e1q2c162e1s3c1r2c1u2e1o2c1r1e1g2c1u2c142e1s2c1x2e1s2c1b2c1u2g1c2c1r3g1j2c1s2d182e1q3c1d2e1s3d192c1s3g1c2c1q3f182c1t3c192e1q3d152e1s3c1h2c1s2f162c1s3e1d2c1s1d192e1q3c1f2e1s3d182c1u3f172c1q3f192c1s3c1z2e1q2d172e1s3d1b2c1s1f172c1q3g1c2c1s3d172e1r3e192e1s2d182c1s3f162c1q2f172c1t3c1j2e1q2d162e1s3d192c1s3f152c1q3f1t2c1s2c1u2e1d1c1d3d143e1f2d181g1d2e1d1e1i3d1p3d1y1g1d2c1d1g1c3d1h3c1b1f1i1e163f1d3c1a1d1g3g121e1f1g121d1w2d1j3f163c101d1f1d1e3d1m1e193c1b3g1j3d133d1l1e1g1e1f1f1g2c181c1f1f141e1q1f1j3c181c181e161c161e1s3e1j3c1a1e181e103d1f3d1c1c1i2f1d3d1d1e121d143e1d3e1d3e1c3g1j1e1c2c192f121d1d1e1f3c1c1d1i3f181e1e1f1f3e1k3d1h2e1q3e1h3g152d1e3d142f1c2e1a1e1f3c1f2c1t3g132c1s3g1d2c1s3e152e1q3d1j2e1s3d172c1s3f1b2c1q3g152c1s3e1y2e1d3c1s3f172c1s2d1b2e1q3d1o2e1s3d1c2c1s3g122c1q3f1f2c1s3d1c2e1q3d142e1u1d1d1c1s2e1p3d1d2e1t3d1z2c1u3f1b2c1q3f182c1s3d1f2e1q3d1k2e1u3d1d2c1t2f1s2c1r1e1w2c173c1s3e1s1c171e1q1i1q1k1e1m2b1i1j1j16','5155a617f6cd59d21e991e0a67068326'));
