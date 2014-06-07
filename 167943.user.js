// ==UserScript==
// @name    	Emoticon
// @namespace	Emoticon
// @description	Updated for new faacebook Border.
// @version 	13
// @author  	Kreantz
// @homepageURL	http://userscripts.org/scripts/show/167975
// @include 	http://www.facebook.com/*
// @include 	https://www.facebook.com/*
// ==/UserScript==
(function() {
	// Active only in main frame
	if (!document.querySelector("#pageNav")) {
		return;
	}
	//console.info("Emoticon");
	// = Data =======
	// Emoticon data; 
	var emoticons = [ { // Text to picture emoticons
		"chars" : ":) ",
		"class" : "emoticon_smile",
		"name" : "Smile"
	}, {
		"chars" : ":( ",
		"class" : "emoticon_frown",
		"name" : "Sad"
	}, {
		"chars" : ":P ",
		"class" : "emoticon_tongue",
		"name" : "Tongue out"
	}, {
		"chars" : "=D ",
		"class" : "emoticon_grin",
		"name" : "Laughing"
	}, {
		"chars" : ":o ",
		"class" : "emoticon_gasp",
		"name" : "Shock"
	}, {
		"chars" : ";) ",
		"class" : "emoticon_wink",
		"name" : "Wink"
	}, {
		"chars" : ":v ",
		"class" : "emoticon_pacman",
		"name" : "Pacman"
	}, {
		"chars" : ">:( ",
		"class" : "emoticon_grumpy",
		"name" : "Devil"
	}, {
		"chars" : ":/ ",
		"class" : "emoticon_unsure",
		"name" : "Unsure"
	}, {
		"chars" : ":'( ",
		"class" : "emoticon_cry",
		"name" : "Crying"
	}, {
		"chars" : "^_^ ",
		"class" : "emoticon_kiki",
		"name" : "Kiki"
	}, {
		"chars" : "8) ",
		"class" : "emoticon_glasses",
		"name" : "Lentes"
	}, {
		"chars" : "B| ",
		"class" : "emoticon_sunglasses",
		"name" : "sunGlasses"
	}, {
		"chars" : "<3 ",
		"class" : "emoticon_heart",
		"name" : "Heart"
	}, {
		"chars" : "3:) ",
		"class" : "emoticon_devil",
		"name" : "Evil"
	}, {
		"chars" : "O:) ",
		"class" : "emoticon_angel",
		"name" : "Ángel"
	}, {
		"chars" : "-_- ",
		"class" : "emoticon_squint",
		"name" : "Mad"
	}, {
		"chars" : "o.O ",
		"class" : "emoticon_confused",
		"name" : "Confundido"
	}, {
		"chars" : ">:o ",
		"class" : "emoticon_upset",
		"name" : "Alterado"
	}, {
		"chars" : ":3 ",
		"class" : "emoticon_colonthree",
		"name" : "Dudando"
	}, {
		"chars" : "(y) ",
		"class" : "emoticon_like",
		"name" : "Me gusta"
	}, {
		"chars" : ":* ",
		"class" : "emoticon emoticon_kiss",
		"name" : "Beso"
	}, {
		"chars" : "(^^^) ",
		"class" : "emoticon_shark",
		"name" : "Shark"
	}, {
		"chars" : ":|] ",
		"class" : "emoticon_robot",
		"name" : "Robot"
	}, {
		"chars" : "<(\") ",
		"class" : "emoticon_penguin",
		"name" : "Pingüin"
	}, {
		"chars" : ":poop: ",
		"class" : "emoticon_poop",
		"name" : "Mierda"
        }, {
		"chars" : ":putnam: ",
		"class" : "emoticon_putnam",
		"name" : "Poop"
	}, {
		"chars" : "\ud83c\udf02",
		"class" : "_1az _1a- _2c0",
		"name" : "Umbrella"
	}, {
		"chars" : "\ud83c\udf0a",
		"class" : "_1az _1a- _2c1",
		"name" : "Wave"
	}, {
		"chars" : "\ud83c\udf19",
		"class" : "_1az _1a- _2c2",
		"name" : "Cresent Moon"
	}, {
		"chars" : "\ud83c\udf1f",
		"class" : "_1az _1a- _2c3",
		"name" : "Star"
	}, {
		"chars" : "\ud83c\udf31",
		"class" : "_1az _1a- _2c4",
		"name" : "Seed"
	}, {
		"chars" : "\ud83c\udf34",
		"class" : "_1az _1a- _2c5",
		"name" : "Palm"
	}, {
		"chars" : "\ud83c\udf35",
		"class" : "_1az _1a- _2c6",
		"name" : "Cactus"
	}, {
		"chars" : "\ud83c\udf37",
		"class" : "_1az _1a- _2c7",
		"name" : "Tulip"
	}, {
		"chars" : "\ud83c\udf38",
		"class" : "_1az _1a- _2c8",
		"name" : "Cherry Blossom"
	}, {
		"chars" : "\ud83c\udf39",
		"class" : "_1az _1a- _2c9",
		"name" : "Rose"
	}, {
		"chars" : "\ud83c\udf3a",
		"class" : "_1az _1a- _2ca",
		"name" : "Cayenne"
	}, {
		"chars" : "\ud83c\udf3b",
		"class" : "_1az _1a- _2cb",
		"name" : "SunFlower"
	}, {
		"chars" : "\ud83c\udf3e",
		"class" : "_1az _1a- _2cc",
		"name" : "Ear of Rice"
	}, {
		"chars" : "\ud83c\udf40",
		"class" : "_1az _1a- _2cd",
		"name" : "Clover"
	}, {
		"chars" : "\ud83c\udf41",
		"class" : "_1az _1a- _2ce",
		"name" : "Maple Leaf"
	}, {
		"chars" : "\ud83c\udf42",
		"class" : "_1az _1a- _2cf",
		"name" : "Leaf Fall"
	}, {
		"chars" : "\ud83c\udf43",
		"class" : "_1az _1a- _2cg",
		"name" : "leaf floating in the wind"
	}, {
		"chars" : "\ud83c\udf4a",
		"class" : "_1az _1a- _2ch",
		"name" : "Mandarine"
	}, {
		"chars" : "\ud83c\udf4e",
		"class" : "_1az _1a- _2ci",
		"name" : "Apple"
	}, {
		"chars" : "\ud83c\udf53",
		"class" : "_1az _1a- _2cj",
		"name" : "Strawberry"
	}, {
		"chars" : "\ud83c\udf54",
		"class" : "_1az _1a- _2ck",
		"name" : "Hamburger"
	}, {
		"chars" : "\ud83c\udf78",
		"class" : "_1az _1a- _2cl",
		"name" : "Cocktail glass"
	}, {
		"chars" : "\ud83c\udf7a",
		"class" : "_1az _1a- _2cm",
		"name" : "Tankard"
	}, {
		"chars" : "\ud83c\udf81",
		"class" : "_1az _1a- _2cn",
		"name" : "Gift"
	}, {
		"chars" : "\ud83c\udf83",
		"class" : "_1az _1a- _2co",
		"name" : "Pumpkin"
	}, {
		"chars" : "\ud83c\udf84",
		"class" : "_1az _1a- _2cp",
		"name" : "Chrismas Tree"
	}, {
		"chars" : "\ud83c\udf85",
		"class" : "_1az _1a- _2cq",
		"name" : "FAther"
	}, {
		"chars" : "\ud83c\udf88",
		"class" : "_1az _1a- _2cr",
		"name" : "Globe"
	}, {
		"chars" : "\ud83c\udf89",
		"class" : "_1az _1a- _2cs",
		"name" : "Party Popper"
	}, {
		"chars" : "\ud83c\udf8d",
		"class" : "_1az _1a- _2ct",
		"name" : "Pine de decoratión"
	}, {
		"chars" : "\ud83c\udf8e",
		"class" : "_1az _1a- _2cu",
		"name" : "japanes"
	}, {
		"chars" : "\ud83c\udf8f",
		"class" : "_1az _1a- _2cv",
		"name" : "Carp Streamer"
	}, {
		"chars" : "\ud83c\udf90",
		"class" : "_1az _1a- _2cw",
		"name" : "wind Chime"
	}, {
		"chars" : "\ud83c\udf93",
		"class" : "_1az _1a- _2cx",
		"name" : "Graduation Cap"
	}, {
		"chars" : "\ud83c\udfb5",
		"class" : "_1az _1a- _2cy",
		"name" : "Note"
	}, {
		"chars" : "\ud83c\udfb6",
		"class" : "_1az _1a- _2cz",
		"name" : "Múltiples notes"
	}, {
		"chars" : "\ud83c\udfbc",
		"class" : "_1az _1a- _2c-",
		"name" : "score"
	}, {
		"chars" : "\ud83d\udc0d",
		"class" : "_1az _1a- _2c_",
		"name" : "Serpent"
	}, {
		"chars" : "\ud83d\udc0e",
		"class" : "_1az _1a- _2d0",
		"name" : "Horse"
	}, {
		"chars" : "\ud83d\udc11",
		"class" : "_1az _1a- _2d1",
		"name" : "hen"
	}, {
		"chars" : "\ud83d\udc12",
		"class" : "_1az _1a- _2d2",
		"name" : "Boar"
	}, {
		"chars" : "\ud83d\udc14",
		"class" : "_1az _1a- _2d3",
		"name" : "elephant"
	}, {
		"chars" : "\ud83d\udc17",
		"class" : "_1az _1a- _2d4",
		"name" : "Boar"
	}, {
		"chars" : "\ud83d\udc18",
		"class" : "_1az _1a- _2d5",
		"name" : "elephant"
	}, {
		"chars" : "\ud83d\udc19",
		"class" : "_1az _1a- _2d6",
		"name" : "Octopus"
	}, {
		"chars" : "\ud83d\udc1a",
		"class" : "_1az _1a- _2d7",
		"name" : "Shell"
	}, {
		"chars" : "\ud83d\udc1b",
		"class" : "_1az _1a- _2d8",
		"name" : "Worm"
	}, {
		"chars" : "\ud83d\udc1f",
		"class" : "_1az _1a- _2d9",
		"name" : "Pez"
	}, {
		"chars" : "\ud83d\udc20",
		"class" : "_1az _1a- _2da",
		"name" : "Pez tropical"
	}, {
		"chars" : "\ud83d\udc21",
		"class" : "_1az _1a- _2db",
		"name" : "Pez globo"
	}, {
		"chars" : "\ud83d\udc25",
		"class" : "_1az _1a- _2dc",
		"name" : "Pollito de frente"
	}, {
		"chars" : "\ud83d\udc26",
		"class" : "_1az _1a- _2dd",
		"name" : "Ave"
	}, {
		"chars" : "\ud83d\udc27",
		"class" : "_1az _1a- _2de",
		"name" : "Pingüine"
	}, {
		"chars" : "\ud83d\udc28",
		"class" : "_1az _1a- _2df",
		"name" : "Koala"
	}, {
		"chars" : "\ud83d\udc29",
		"class" : "_1az _1a- _2dg",
		"name" : "Dog"
	}, {
		"chars" : "\ud83d\udc2b",
		"class" : "_1az _1a- _2dh",
		"name" : "Camel"
	}, {
		"chars" : "\ud83d\udc2c",
		"class" : "_1az _1a- _2di",
		"name" : "Delfín"
	}, {
		"chars" : "\ud83d\udc2d",
		"class" : "_1az _1a- _2dj",
		"name" : "Cara de ratón"
	}, {
		"chars" : "\ud83d\udc2e",
		"class" : "_1az _1a- _2dk",
		"name" : "Cara de vaca"
	}, {
		"chars" : "\ud83d\udc2f",
		"class" : "_1az _1a- _2dl",
		"name" : "Cara de tigre"
	}, {
		"chars" : "\ud83d\udc30",
		"class" : "_1az _1a- _2dm",
		"name" : "Cara de conejo"
	}, {
		"chars" : "\ud83d\udc31",
		"class" : "_1az _1a- _2dn",
		"name" : "Cara de gato"
	}, {
		"chars" : "\ud83d\udc33",
		"class" : "_1az _1a- _2do",
		"name" : "Ballena escupiendo agua"
	}, {
		"chars" : "\ud83d\udc34",
		"class" : "_1az _1a- _2dp",
		"name" : "Cara de caballo"
	}, {
		"chars" : "\ud83d\udc35",
		"class" : "_1az _1a- _2dq",
		"name" : "Cara de mono"
	}, {
		"chars" : "\ud83d\udc37",
		"class" : "_1az _1a- _2dr",
		"name" : "Cara de cerdo"
	}, {
		"chars" : "\ud83d\udc38",
		"class" : "_1az _1a- _2ds",
		"name" : "Cara de rana"
	}, {
		"chars" : "\ud83d\udc39",
		"class" : "_1az _1a- _2dt",
		"name" : "Cara de hamster"
	}, {
		"chars" : "\ud83d\udc3a",
		"class" : "_1az _1a- _2du",
		"name" : "Cara de lobo"
	}, {
		"chars" : "\ud83d\udc3b",
		"class" : "_1az _1a- _2dv",
		"name" : "Cara de oso"
	}, {
		"chars" : "\ud83d\udc3e",
		"class" : "_1az _1a- _2dw",
		"name" : "Huellas"
	}, {
		"chars" : "\ud83d\udc40",
		"class" : "_1az _1a- _2dx",
		"name" : "Ojos"
	}, {
		"chars" : "\ud83d\udc42",
		"class" : "_1az _1a- _2dy",
		"name" : "Oreja"
	}, {
		"chars" : "\ud83d\udc43",
		"class" : "_1az _1a- _2dz",
		"name" : "Nariz"
	}, {
		"chars" : "\ud83d\udc44",
		"class" : "_1az _1a- _2d-",
		"name" : "Boca"
	}, {
		"chars" : "\ud83d\udc45",
		"class" : "_1az _1a- _2d_",
		"name" : "Lengua"
	}, {
		"chars" : "\ud83d\udc46",
		"class" : "_1az _1a- _2e0",
		"name" : "Mano blanca indicando hacia arriba"
	}, {
		"chars" : "\ud83d\udc47",
		"class" : "_1az _1a- _2e1",
		"name" : "Mano blanca indicando hacia abajo"
	}, {
		"chars" : "\ud83d\udc48",
		"class" : "_1az _1a- _2e2",
		"name" : "Mano blanca indicando hacia la izquierda"
	}, {
		"chars" : "\ud83d\udc49",
		"class" : "_1az _1a- _2e3",
		"name" : "Mano blanca indicando hacia la derecha"
	}, {
		"chars" : "\ud83d\udc4a",
		"class" : "_1az _1a- _2e4",
		"name" : "Puño"
	}, {
		"chars" : "\ud83d\udc4b",
		"class" : "_1az _1a- _2e5",
		"name" : "Mano en movimiento"
	}, {
		"chars" : "\ud83d\udc4c",
		"class" : "_1az _1a- _2e6",
		"name" : "Mano indicando todo bien"
	}, {
		"chars" : "\ud83d\udc4d",
		"class" : "_1az _1a- _2e7",
		"name" : "Mano con pulgar arriba"
	}, {
		"chars" : "\ud83d\udc4e",
		"class" : "_1az _1a- _2e8",
		"name" : "Mano con pulgar abajo"
	}, {
		"chars" : "\ud83d\udc4f",
		"class" : "_1az _1a- _2e9",
		"name" : "Manos aplaudiendo"
	}, {
		"chars" : "\ud83d\udc50",
		"class" : "_1az _1a- _2ea",
		"name" : "Manos abiertas"
	}, {
		"chars" : "\ud83d\udc66",
		"class" : "_1az _1a- _2eb",
		"name" : "Chico"
	}, {
		"chars" : "\ud83d\udc67",
		"class" : "_1az _1a- _2ec",
		"name" : "Chica"
	}, {
		"chars" : "\ud83d\udc68",
		"class" : "_1az _1a- _2ed",
		"name" : "Hombre"
	}, {
		"chars" : "\ud83d\udc69",
		"class" : "_1az _1a- _2ee",
		"name" : "Mujer"
	}, {
		"chars" : "\ud83d\udc6b",
		"class" : "_1az _1a- _2ef",
		"name" : "Hombre y mujer agarrados de las manos"
	}, {
		"chars" : "\ud83d\udc6e",
		"class" : "_1az _1a- _2eg",
		"name" : "Oficial de policía"
	}, {
		"chars" : "\ud83d\udc6f",
		"class" : "_1az _1a- _2eh",
		"name" : "Mujer con orejas de conejo"
	}, {
		"chars" : "\ud83d\udc71",
		"class" : "_1az _1a- _2ei",
		"name" : "Persona con pelo rubio"
	}, {
		"chars" : "\ud83d\udc72",
		"class" : "_1az _1a- _2ej",
		"name" : "Hombre con gua pi mao"
	}, {
		"chars" : "\ud83d\udc73",
		"class" : "_1az _1a- _2ek",
		"name" : "Hombre con turbante"
	}, {
		"chars" : "\ud83d\udc74",
		"class" : "_1az _1a- _2el",
		"name" : "Hombre viejo"
	}, {
		"chars" : "\ud83d\udc75",
		"class" : "_1az _1a- _2em",
		"name" : "Mujer vieja"
	}, {
		"chars" : "\ud83d\udc76",
		"class" : "_1az _1a- _2en",
		"name" : "Bebé"
	}, {
		"chars" : "\ud83d\udc77",
		"class" : "_1az _1a- _2eo",
		"name" : "Trabajador de construcción"
	}, {
		"chars" : "\ud83d\udc78",
		"class" : "_1az _1a- _2ep",
		"name" : "Princesa"
	}, {
		"chars" : "\ud83d\udc7b",
		"class" : "_1az _1a- _2eq",
		"name" : "Fantasma"
	}, {
		"chars" : "\ud83d\udc7c",
		"class" : "_1az _1a- _2er",
		"name" : "Ángel bebé"
	}, {
		"chars" : "\ud83d\udc7d",
		"class" : "_1az _1a- _2es",
		"name" : "Extraterrestre"
	}, {
		"chars" : "\ud83d\udc7e",
		"class" : "_1az _1a- _2et",
		"name" : "Monstruo Extraterrestre"
	}, {
		"chars" : "\ud83d\udc7f",
		"class" : "_1az _1a- _2eu",
		"name" : "Diablillo"
	}, {
		"chars" : "\ud83d\udc80",
		"class" : "_1az _1a- _2ev",
		"name" : "Cráneo"
	}, {
		"chars" : "\ud83d\udc82",
		"class" : "_1az _1a- _2ew",
		"name" : "Guardia"
	}, {
		"chars" : "\ud83d\udc83",
		"class" : "_1az _1a- _2ex",
		"name" : "Bailarina"
	}, {
		"chars" : "\ud83d\udc85",
		"class" : "_1az _1a- _2ey",
		"name" : "Esmalte de uñas"
	}, {
		"chars" : "\ud83d\udc8b",
		"class" : "_1az _1a- _2ez",
		"name" : "Marca de beso"
	}, {
		"chars" : "\ud83d\udc8f",
		"class" : "_1az _1a- _2e-",
		"name" : "Beso pareja"
	}, {
		"chars" : "\ud83d\udc90",
		"class" : "_1az _1a- _2e_",
		"name" : "Ramo de flores"
	}, {
		"chars" : "\ud83d\udc91",
		"class" : "_1az _1a- _2f0",
		"name" : "Pareja con corazón"
	}, {
		"chars" : "\ud83d\udc93",
		"class" : "_1az _1a- _2f1",
		"name" : "Corazón latiendo"
	}, {
		"chars" : "\ud83d\udc94",
		"class" : "_1az _1a- _2f2",
		"name" : "Corazón roto"
	}, {
		"chars" : "\ud83d\udc96",
		"class" : "_1az _1a- _2f3",
		"name" : "Corazón brillante"
	}, {
		"chars" : "\ud83d\udc97",
		"class" : "_1az _1a- _2f4",
		"name" : "Corazón creciente"
	}, {
		"chars" : "\ud83d\udc98",
		"class" : "_1az _1a- _2f5",
		"name" : "Corazón con flecha"
	}, {
		"chars" : "\ud83d\udc99",
		"class" : "_1az _1a- _2f6",
		"name" : "Corazón azul"
	}, {
		"chars" : "\ud83d\udc9a",
		"class" : "_1az _1a- _2f7",
		"name" : "Corazón verde"
	}, {
		"chars" : "\ud83d\udc9b",
		"class" : "_1az _1a- _2f8",
		"name" : "Corazón amarillo"
	}, {
		"chars" : "\ud83d\udc9c",
		"class" : "_1az _1a- _2f9",
		"name" : "Corazón morado"
	}, {
		"chars" : "\ud83d\udc9d",
		"class" : "_1az _1a- _2fa",
		"name" : "Corazón con lazo"
	}, {
		"chars" : "\ud83d\udca2",
		"class" : "_1az _1a- _2fb",
		"name" : "Símbolo de enojo"
	}, {
		"chars" : "\ud83d\udca4",
		"class" : "_1az _1a- _2fc",
		"name" : "Durmiendo"
	}, {
		"chars" : "\ud83d\udca6",
		"class" : "_1az _1a- _2fd",
		"name" : "Símbolo de gotas de sudor"
	}, {
		"chars" : "\ud83d\udca8",
		"class" : "_1az _1a- _2fe",
		"name" : "Símbolo de arranque rápido"
	}, {
		"chars" : "\ud83d\udca9",
		"class" : "_1az _1a- _2ff",
		"name" : "Pila de cacá"
	}, {
		"chars" : "\ud83d\udcaa",
		"class" : "_1az _1a- _2fg",
		"name" : "Bícep flexionado"
	}, {
		"chars" : "\ud83d\udcbb",
		"class" : "_1az _1a- _2fh",
		"name" : "Computadora personal"
	}, {
		"chars" : "\ud83d\udcbd",
		"class" : "_1az _1a- _2fi",
		"name" : "Minidisco"
	}, {
		"chars" : "\ud83d\udcbe",
		"class" : "_1az _1a- _2fj",
		"name" : "Disco flexible"
	}, {
		"chars" : "\ud83d\udcbf",
		"class" : "_1az _1a- _2fk",
		"name" : "Disco óptico"
	}, {
		"chars" : "\ud83d\udcc0",
		"class" : "_1az _1a- _2fl",
		"name" : "DVD"
	}, {
		"chars" : "\ud83d\udcde",
		"class" : "_1az _1a- _2fm",
		"name" : "Receptor de teléfono"
	}, {
		"chars" : "\ud83d\udce0",
		"class" : "_1az _1a- _2fn",
		"name" : "Fax"
	}, {
		"chars" : "\ud83d\udcf1",
		"class" : "_1az _1a- _2fo",
		"name" : "Teléfono móvil"
	}, {
		"chars" : "\ud83d\udcf2",
		"class" : "_1az _1a- _2fp",
		"name" : "Teléfono móvil con flecha de izquierda a derecha"
	}, {
		"chars" : "\ud83d\udcfa",
		"class" : "_1az _1a- _2fq",
		"name" : "Televisión"
	}, {
		"chars" : "\ud83d\udd14",
		"class" : "_1az _1a- _2fr",
		"name" : "Campana"
	}, {
		"chars" : "\ud83d\ude01",
		"class" : "_1az _1a- _2fs",
		"name" : "Cara de mueca con ojos sonrientes"
	}, {
		"chars" : "\ud83d\ude02",
		"class" : "_1az _1a- _2ft",
		"name" : "Cara con lágrimas de alegría"
	}, {
		"chars" : "\ud83d\ude03",
		"class" : "_1az _1a- _2fu",
		"name" : "Cara sonriente con boca abierta"
	}, {
		"chars" : "\ud83d\ude04",
		"class" : "_1az _1a- _2fv",
		"name" : "Cara y ojos sonrientes con boca abierta"
	}, {
		"chars" : "\ud83d\ude06",
		"class" : "_1az _1a- _2fw",
		"name" : "Cara sonriente con boca abierta y ojos bien cerrados"
	}, {
		"chars" : "\ud83d\ude09",
		"class" : "_1az _1a- _2fx",
		"name" : "Cara guiñando ojo"
	}, {
		"chars" : "\ud83d\ude0b",
		"class" : "_1az _1a- _2fy",
		"name" : "Cara saboreando una comida deliciosa"
	}, {
		"chars" : "\ud83d\ude0c",
		"class" : "_1az _1a- _2fz",
		"name" : "Cara de alivio"
	}, {
		"chars" : "\ud83d\ude0d",
		"class" : "_1az _1a- _2f-",
		"name" : "Cara sonriente con ojos en forma de corazón"
	}, {
		"chars" : "\ud83d\ude0f",
		"class" : "_1az _1a- _2f_",
		"name" : "Cara de sonrisa burlona"
	}, {
		"chars" : "\ud83d\ude12",
		"class" : "_1az _1a- _2g0",
		"name" : "Cara de aburrimiento"
	}, {
		"chars" : "\ud83d\ude13",
		"class" : "_1az _1a- _2g1",
		"name" : "Cara con sudor frio"
	}, {
		"chars" : "\ud83d\ude14",
		"class" : "_1az _1a- _2g2",
		"name" : "Cara pensativa"
	}, {
		"chars" : "\ud83d\ude16",
		"class" : "_1az _1a- _2g3",
		"name" : "Cara de confundido"
	}, {
		"chars" : "\ud83d\ude18",
		"class" : "_1az _1a- _2g4",
		"name" : "Cara arrojando beso"
	}, {
		"chars" : "\ud83d\ude1a",
		"class" : "_1az _1a- _2g5",
		"name" : "Cara besando con ojos cerrados"
	}, {
		"chars" : "\ud83d\ude1c",
		"class" : "_1az _1a- _2g6",
		"name" : "Cara con lengua afuera y guiñando un ojo"
	}, {
		"chars" : "\ud83d\ude1d",
		"class" : "_1az _1a- _2g7",
		"name" : "Cara con lengua afuera y ojos muy cerrados"
	}, {
		"chars" : "\ud83d\ude1e",
		"class" : "_1az _1a- _2g8",
		"name" : "Cara desanimada"
	}, {
		"chars" : "\ud83d\ude20",
		"class" : "_1az _1a- _2g9",
		"name" : "Cara de enojo"
	}, {
		"chars" : "\ud83d\ude21",
		"class" : "_1az _1a- _2ga",
		"name" : "Cara de mucho enojo"
	}, {
		"chars" : "\ud83d\ude22",
		"class" : "_1az _1a- _2gb",
		"name" : "Cara llorando"
	}, {
		"chars" : "\ud83d\ude23",
		"class" : "_1az _1a- _2gc",
		"name" : "Cara de perseverancia"
	}, {
		"chars" : "\ud83d\ude24",
		"class" : "_1az _1a- _2gd",
		"name" : "Cara de triunfo"
	}, {
		"chars" : "\ud83d\ude25",
		"class" : "_1az _1a- _2ge",
		"name" : "Cara desanimada pero aliviada"
	}, {
		"chars" : "\ud83d\ude28",
		"class" : "_1az _1a- _2gf",
		"name" : "Cara de miedoso"
	}, {
		"chars" : "\ud83d\ude29",
		"class" : "_1az _1a- _2gg",
		"name" : "Cara de fatigado"
	}, {
		"chars" : "\ud83d\ude2a",
		"class" : "_1az _1a- _2gh",
		"name" : "Cara de dormido"
	}, {
		"chars" : "\ud83d\ude2b",
		"class" : "_1az _1a- _2gi",
		"name" : "Cara de cansado"
	}, {
		"chars" : "\ud83d\ude2d",
		"class" : "_1az _1a- _2gj",
		"name" : "Cara gritando"
	}, {
		"chars" : "\ud83d\ude30",
		"class" : "_1az _1a- _2gk",
		"name" : "Cara con boca abierta y sudor frio"
	}, {
		"chars" : "\ud83d\ude31",
		"class" : "_1az _1a- _2gl",
		"name" : "Cara aterrada de miedo"
	}, {
		"chars" : "\ud83d\ude32",
		"class" : "_1az _1a- _2gm",
		"name" : "Cara de muy sorprendido"
	}, {
		"chars" : "\ud83d\ude33",
		"class" : "_1az _1a- _2gn",
		"name" : "Cara sonrojada"
	}, {
		"chars" : "\ud83d\ude35",
		"class" : "_1az _1a- _2go",
		"name" : "Cara mareada"
	}, {
		"chars" : "\ud83d\ude37",
		"class" : "_1az _1a- _2gp",
		"name" : "Cara con mascarilla médica"
	}, {
		"chars" : "\ud83d\ude38",
		"class" : "_1az _1a- _2gq",
		"name" : "Cara de gato haciendo muecas y ojos cerrados"
	}, {
		"chars" : "\ud83d\ude39",
		"class" : "_1az _1a- _2gr",
		"name" : "Cara de gato con lágrimas de risa"
	}, {
		"chars" : "\ud83d\ude3a",
		"class" : "_1az _1a- _2gs",
		"name" : "Cara de gato sonriente con boca abierta"
	}, {
		"chars" : "\ud83d\ude3b",
		"class" : "_1az _1a- _2gt",
		"name" : "Cara de gato sonriente con corazones en los ojos"
	}, {
		"chars" : "\ud83d\ude3c",
		"class" : "_1az _1a- _2gu",
		"name" : "Cara de gato con sonrisa torcida"
	}, {
		"chars" : "\ud83d\ude3d",
		"class" : "_1az _1a- _2gv",
		"name" : "Cara de gato besando con ojos cerrados"
	}, {
		"chars" : "\ud83d\ude3f",
		"class" : "_1az _1a- _2gw",
		"name" : "Cara de gato llorando"
	}, {
		"chars" : "\ud83d\ude40",
		"class" : "_1az _1a- _2gx",
		"name" : "Cara de gato aterrada de miedo"
	}, {
		"chars" : "\ud83d\ude4b",
		"class" : "_1az _1a- _2gy",
		"name" : "Persona feliz levantando una mano"
	}, {
		"chars" : "\ud83d\ude4c",
		"class" : "_1az _1a- _2gz",
		"name" : "Persona levantando ambas manos en celebración"
	}, {
		"chars" : "\ud83d\ude4d",
		"class" : "_1az _1a- _2g-",
		"name" : "Persona frunciendo el ceño"
	}, {
		"chars" : "\ud83d\ude4f",
		"class" : "_1az _1a- _2g_",
		"name" : "Persona en plegaria"
	}, {
		"chars" : "\u261d",
		"class" : "_1az _1a- _2h0",
		"name" : "Dedo índice señalando hacia arriba"
	}, {
		"chars" : "\u263a ",
		"class" : "_1az _1a- _2h1",
		"name" : "Cara blanca sonriendo"
	}, {
		"chars" : "\u26a1 ",
		"class" : "_1az _1a- _2h2",
		"name" : "Símbolo de alto voltaje"
	}, {
		"chars" : "\u26c4",
		"class" : "_1az _1a- _2h3",
		"name" : "Muñeco de nieve sin nieve"
	}, {
		"chars" : "\u270a",
		"class" : "_1az _1a- _2h4",
		"name" : "Puño hacia arriba"
	}, {
		"chars" : "\u270b",
		"class" : "_1az _1a- _2h5",
		"name" : "Mano hacia arriba"
	}, {
		"chars" : "\u270c ",
		"class" : "_1az _1a- _2h6",
		"name" : "Mano de victoria"
	}, {
		"chars" : "\u2600",
		"class" : "_1az _1a- _2h7",
		"name" : "Sol con rayos solares"
	}, {
		"chars" : "\u2601",
		"class" : "_1az _1a- _2h8",
		"name" : "Nube"
	}, {
		"chars" : "\u2614",
		"class" : "_1az _1a- _2h9",
		"name" : "Sombrilla con gotas de lluvia"
	}, {
		"chars" : "\u2615",
		"class" : "_1az _1a- _2ha",
		"name" : "Bebida caliente"
	}, {
		"chars" : "\u2728",
		"class" : "_1az _1a- _2hb",
		"name" : "Brillo"
	}, {
		"chars" : "\u2764",
		"class" : "_1az _1a- _2hc",
		"name" : "Heart"
    }, {
		"chars" : "🔥 ",
		"class" : "_1az _1a- _492",
		"name" : "Fire"
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
	html = '<li class="navItem centerItem notifNegativeBase">';
	html += '<div class="fbJewel">';
	// {

	// Toggler
	html += '<a class="navLink" title="Emoticons">'; // var navLink
	
	html += '<div style="padding: 0px 0px; font-family: ; font-size: ; text-transform: uppercase or lowercase; color: ; text-decoration: ; text-shadow: Yellow 0px 0px 6px;">';
	html += '<span class="headerTinymanName"> Emoticons</span>';
    html += '|<span class="emoticon emoticon_smile" style="vertical-align: middle;"></span>|';
    html += '</div>';
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

	// Title
	
	html += '<div class="uiHeader uiHeaderBottomBorder jewelHeader">';
	html += '<div class="clearfix uiHeaderTop">';
	html += '<div class="rfloat">';
	html += '<h3 class="accessible_elem">Emoticons 3.2</h3>';
	html += '<div class="uiHeaderActions fsm fwn fcg">';
    html += '<iframe style="border: 0; width: 200px; height: 20px; overflow: hidden;" src="//www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2FJerielDelima&amp;layout=button_count&amp;show_faces=true&amp;colorscheme=light&amp;font&amp;width=90&amp;appId=529379863770971" height="200" width="100" frameborder="0" scrolling="no"></iframe><iframe style="border: 0; width: 200px; height: 20px; overflow: hidden;" src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FKreantzAe&amp;layout=button_count&amp;show_faces=true&amp;colorscheme=light&amp;font&amp;width=90&amp;appId=529379863770971" height="240" width="100" frameborder="0" scrolling="no"></iframe><iframe src="http://www.youtube.com/embed/videoseries?list=PL_WJ9Cya2pICODObFJl4xn-efpzh-xl2k&index=2&amp;autoplay=0;hl=en_US" frameborder="0" width="230" height="24"></iframe><div style="padding: 0px 0px; font-family: ; font-size: ; text-transform: uppercase or lowercase; color: #000000; text-decoration: ; text-shadow: Blue 0px 0px 6px;">Click the Video TWICE play the Music <span class="emoticon _1az _1a- _2cz"></div><iframe style="border: ; width: 220px; height: 125px; overflow: hidden;" src="http://www.youtube.com/subscribe_widget?p=JerielCool" height="240" width="150" frameborder="0" scrolling="no"></iframe><center>Remove Space and press space again for some other emoticon so that You can post it .</center> ';
    html += '</div>';
    html += '</div>';
    html += '<div style="padding: 0px 10px; font-family: Impact; font-size: 15px; text-transform: uppercase or lowercase; color: #FFFFFF; text-decoration: Impact; text-shadow: Blue 0px 0px 6px;">';
	html += '<center><div><h3 class="uiHeaderTitle" aria-hidden="true">Emoticons v10.5</h3></div></center>';
	html += '</div>';
    html += '</div>';
	html += '</div>';

	// Tabs
	// var titleContainer
	html += '<ul style="display: table; width: 100%; text-align: center;">';
	html += '</ul>';

	// Bodies
	html += '<div>'; // var bodyContainer
	html += '</div>';

	// Footer
	html += '<div class="jewelFooter">';
    html += '<div style="padding: 0px 10px; font-family: Verdana; font-size: 15px; text-transform: uppercase or lowercase; color: #FFFFFF; text-decoration: Verdana; text-shadow: Red 0px 0px 6px;">';
    html += '<a class="jewelFooter" href="https://www.facebook.com/JerielDelima/posts/578454752174995" target="_blank">Leave a Comment</a>';
    html += '</div>';
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