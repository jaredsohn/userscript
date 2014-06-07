// ==UserScript==
// @name    	Facebook Emotikon Baru 2013 by Agan Juna
// @namespace	Facebook Emotikon Baru 2013 by Agan Juna
// @description	Smile dan Tambahan Emotikon lengkapi chat dan komentar kamu :D
// @version 	6.0.5
// @author  	Agan Juna
// @homepageURL	http://www.facebook.com/koisuke11
// @include 	http://www.facebook.com/*
// @include 	https://www.facebook.com/*
// ==/UserScript==
(function() {
	// Active only in main frame
	if (!document.querySelector("#pageNav")) {
		return;
	}
	//console.info("FB CHat Emoticon COdes");

	// = Data =======
	// Emoticon data; +5 text-base, +218 unicode from Android app.
	var emoticons = [ { // Text to picture emoticons
"chars" : " :) ",
		"class" : "emoticon_smile",
		"name" : "Sonriente"
	}, {
		"chars" : " :( ",
		"class" : "emoticon_frown",
		"name" : "Triste"
	}, {
		"chars" : " :P ",
		"class" : "emoticon_tongue",
		"name" : "Lengua afuera"
	}, {
		"chars" : " =D ",
		"class" : "emoticon_grin",
		"name" : "Reir"
	}, {
		"chars" : " :o ",
		"class" : "emoticon_gasp",
		"name" : "Asombrado"
	}, {
		"chars" : " ;) ",
		"class" : "emoticon_wink",
		"name" : "Guiño"
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
		"name" : "Inseguro"
	}, {
		"chars" : " :'( ",
		"class" : "emoticon_cry",
		"name" : "Llorando"
	}, {
		"chars" : " ^_^ ",
		"class" : "emoticon_kiki",
		"name" : "Kiki"
	}, {
		"chars" : " 8) ",
		"class" : "emoticon_glasses",
		"name" : "Lentes"
	}, {
		"chars" : " B| ",
		"class" : "emoticon_sunglasses",
		"name" : "Gafas de sol"
	}, {
		"chars" : " <3 ",
		"class" : "emoticon_heart",
		"name" : "Corazón"
	}, {
		"chars" : " 3:) ",
		"class" : "emoticon_devil",
		"name" : "Demonio"
	}, {
		"chars" : " O:) ",
		"class" : "emoticon_angel",
		"name" : "Ángel"
	}, {
		"chars" : " -_- ",
		"class" : "emoticon_squint",
		"name" : "Bizco"
	}, {
		"chars" : " o.O ",
		"class" : "emoticon_confused",
		"name" : "Confundido"
	}, {
		"chars" : " >:o ",
		"class" : "emoticon_upset",
		"name" : "Alterado"
	}, {
		"chars" : " :3 ",
		"class" : "emoticon_colonthree",
		"name" : "Dudando"
	}, {
		"chars" : " (y) ",
		"class" : "emoticon_like",
		"name" : "Me gusta"
	}, {
		"chars" : " :* ",
		"class" : "emoticon emoticon_kiss",
		"name" : "Beso"
	}, {
		"chars" : " (^^^) ",
		"class" : "emoticon_shark",
		"name" : "Tiburón"
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
		"name" : "Mierda"
        }, {
		"chars" : " :putnam: ",
		"class" : "emoticon_putnam",
		"name" : "Putman"
	}, {
		"chars" : " \ud83c\udf02 ",
		"class" : "_1az _1a- _2c0",
		"name" : "Sombrilla cerrada"
	}, {
		"chars" : " \ud83c\udf0a ",
		"class" : "_1az _1a- _2c1",
		"name" : "Ola de mar"
	}, {
		"chars" : " \ud83c\udf19 ",
		"class" : "_1az _1a- _2c2",
		"name" : "Luna cuarto creciente"
	}, {
		"chars" : " \ud83c\udf1f ",
		"class" : "_1az _1a- _2c3",
		"name" : "Estrella brillante"
	}, {
		"chars" : " \ud83c\udf31 ",
		"class" : "_1az _1a- _2c4",
		"name" : "Semillero"
	}, {
		"chars" : " \ud83c\udf34 ",
		"class" : "_1az _1a- _2c5",
		"name" : "Mata de palma"
	}, {
		"chars" : " \ud83c\udf35 ",
		"class" : "_1az _1a- _2c6",
		"name" : "Captus"
	}, {
		"chars" : " \ud83c\udf37 ",
		"class" : "_1az _1a- _2c7",
		"name" : "Tulipán"
	}, {
		"chars" : " \ud83c\udf38 ",
		"class" : "_1az _1a- _2c8",
		"name" : "Flor de cereza"
	}, {
		"chars" : " \ud83c\udf39 ",
		"class" : "_1az _1a- _2c9",
		"name" : "Rosa"
	}, {
		"chars" : " \ud83c\udf3a ",
		"class" : "_1az _1a- _2ca",
		"name" : "Cayena"
	}, {
		"chars" : " \ud83c\udf3b ",
		"class" : "_1az _1a- _2cb",
		"name" : "Girasol"
	}, {
		"chars" : " \ud83c\udf3e ",
		"class" : "_1az _1a- _2cc",
		"name" : "Espiga de arroz"
	}, {
		"chars" : " \ud83c\udf40 ",
		"class" : "_1az _1a- _2cd",
		"name" : "Trébol de cuatro hojas"
	}, {
		"chars" : " \ud83c\udf41 ",
		"class" : "_1az _1a- _2ce",
		"name" : "Hoja de arce"
	}, {
		"chars" : " \ud83c\udf42 ",
		"class" : "_1az _1a- _2cf",
		"name" : "Hoja caída"
	}, {
		"chars" : " \ud83c\udf43 ",
		"class" : "_1az _1a- _2cg",
		"name" : "Hoja flotando en el viento"
	}, {
		"chars" : " \ud83c\udf4a ",
		"class" : "_1az _1a- _2ch",
		"name" : "Mandarina"
	}, {
		"chars" : " \ud83c\udf4e ",
		"class" : "_1az _1a- _2ci",
		"name" : "Manzana roja"
	}, {
		"chars" : " \ud83c\udf53 ",
		"class" : "_1az _1a- _2cj",
		"name" : "Fresa"
	}, {
		"chars" : " \ud83c\udf54 ",
		"class" : "_1az _1a- _2ck",
		"name" : "Hamburguesa"
	}, {
		"chars" : " \ud83c\udf78 ",
		"class" : "_1az _1a- _2cl",
		"name" : "Copa de cóctel"
	}, {
		"chars" : " \ud83c\udf7a ",
		"class" : "_1az _1a- _2cm",
		"name" : "Jarra de cerveza"
	}, {
		"chars" : " \ud83c\udf81 ",
		"class" : "_1az _1a- _2cn",
		"name" : "Regalo envuelto"
	}, {
		"chars" : " \ud83c\udf83 ",
		"class" : "_1az _1a- _2co",
		"name" : "Calabaza con vela"
	}, {
		"chars" : " \ud83c\udf84 ",
		"class" : "_1az _1a- _2cp",
		"name" : "Árbol de navidad"
	}, {
		"chars" : " \ud83c\udf85 ",
		"class" : "_1az _1a- _2cq",
		"name" : "Padre en navidad"
	}, {
		"chars" : " \ud83c\udf88 ",
		"class" : "_1az _1a- _2cr",
		"name" : "Globo"
	}, {
		"chars" : " \ud83c\udf89 ",
		"class" : "_1az _1a- _2cs",
		"name" : "Corchete de fiesta"
	}, {
		"chars" : " \ud83c\udf8d ",
		"class" : "_1az _1a- _2ct",
		"name" : "Pino de decoración"
	}, {
		"chars" : " \ud83c\udf8e ",
		"class" : "_1az _1a- _2cu",
		"name" : "Muñecas japonesas"
	}, {
		"chars" : " \ud83c\udf8f ",
		"class" : "_1az _1a- _2cv",
		"name" : "Serpentina de carpas"
	}, {
		"chars" : " \ud83c\udf90 ",
		"class" : "_1az _1a- _2cw",
		"name" : "Carrillón de viento"
	}, {
		"chars" : " \ud83c\udf93 ",
		"class" : "_1az _1a- _2cx",
		"name" : "Gorro de graduación"
	}, {
		"chars" : " \ud83c\udfb5 ",
		"class" : "_1az _1a- _2cy",
		"name" : "Nota musical"
	}, {
		"chars" : " \ud83c\udfb6 ",
		"class" : "_1az _1a- _2cz",
		"name" : "Múltiples notas musicales"
	}, {
		"chars" : " \ud83c\udfbc ",
		"class" : "_1az _1a- _2c-",
		"name" : "Partitura musical"
	}, {
		"chars" : " \ud83d\udc0d ",
		"class" : "_1az _1a- _2c_",
		"name" : "Serpiente"
	}, {
		"chars" : " \ud83d\udc0e ",
		"class" : "_1az _1a- _2d0",
		"name" : "Caballo"
	}, {
		"chars" : " \ud83d\udc11 ",
		"class" : "_1az _1a- _2d1",
		"name" : "Oveja"
	}, {
		"chars" : " \ud83d\udc12 ",
		"class" : "_1az _1a- _2d2",
		"name" : "Mono"
	}, {
		"chars" : " \ud83d\udc14 ",
		"class" : "_1az _1a- _2d3",
		"name" : "Gallina"
	}, {
		"chars" : " \ud83d\udc17 ",
		"class" : "_1az _1a- _2d4",
		"name" : "Jabalí"
	}, {
		"chars" : " \ud83d\udc18 ",
		"class" : "_1az _1a- _2d5",
		"name" : "Elefante"
	}, {
		"chars" : " \ud83d\udc19 ",
		"class" : "_1az _1a- _2d6",
		"name" : "Pulpo"
	}, {
		"chars" : " \ud83d\udc1a ",
		"class" : "_1az _1a- _2d7",
		"name" : "Concha de caracol"
	}, {
		"chars" : " \ud83d\udc1b ",
		"class" : "_1az _1a- _2d8",
		"name" : "Insecto"
	}, {
		"chars" : " \ud83d\udc1f ",
		"class" : "_1az _1a- _2d9",
		"name" : "Pez"
	}, {
		"chars" : " \ud83d\udc20 ",
		"class" : "_1az _1a- _2da",
		"name" : "Pez tropical"
	}, {
		"chars" : " \ud83d\udc21 ",
		"class" : "_1az _1a- _2db",
		"name" : "Pez globo"
	}, {
		"chars" : " \ud83d\udc25 ",
		"class" : "_1az _1a- _2dc",
		"name" : "Pollito de frente"
	}, {
		"chars" : " \ud83d\udc26 ",
		"class" : "_1az _1a- _2dd",
		"name" : "Ave"
	}, {
		"chars" : " \ud83d\udc27 ",
		"class" : "_1az _1a- _2de",
		"name" : "Pingüino"
	}, {
		"chars" : " \ud83d\udc28 ",
		"class" : "_1az _1a- _2df",
		"name" : "Koala"
	}, {
		"chars" : " \ud83d\udc29 ",
		"class" : "_1az _1a- _2dg",
		"name" : "Perro de lanas"
	}, {
		"chars" : " \ud83d\udc2b ",
		"class" : "_1az _1a- _2dh",
		"name" : "Camello bactriano"
	}, {
		"chars" : " \ud83d\udc2c ",
		"class" : "_1az _1a- _2di",
		"name" : "Delfín"
	}, {
		"chars" : " \ud83d\udc2d ",
		"class" : "_1az _1a- _2dj",
		"name" : "Cara de ratón"
	}, {
		"chars" : " \ud83d\udc2e ",
		"class" : "_1az _1a- _2dk",
		"name" : "Cara de vaca"
	}, {
		"chars" : " \ud83d\udc2f ",
		"class" : "_1az _1a- _2dl",
		"name" : "Cara de tigre"
	}, {
		"chars" : " \ud83d\udc30 ",
		"class" : "_1az _1a- _2dm",
		"name" : "Cara de conejo"
	}, {
		"chars" : " \ud83d\udc31 ",
		"class" : "_1az _1a- _2dn",
		"name" : "Cara de gato"
	}, {
		"chars" : " \ud83d\udc33 ",
		"class" : "_1az _1a- _2do",
		"name" : "Ballena escupiendo agua"
	}, {
		"chars" : " \ud83d\udc34 ",
		"class" : "_1az _1a- _2dp",
		"name" : "Cara de caballo"
	}, {
		"chars" : " \ud83d\udc35 ",
		"class" : "_1az _1a- _2dq",
		"name" : "Cara de mono"
	}, {
		"chars" : " \ud83d\udc37 ",
		"class" : "_1az _1a- _2dr",
		"name" : "Cara de cerdo"
	}, {
		"chars" : " \ud83d\udc38 ",
		"class" : "_1az _1a- _2ds",
		"name" : "Cara de rana"
	}, {
		"chars" : " \ud83d\udc39 ",
		"class" : "_1az _1a- _2dt",
		"name" : "Cara de hamster"
	}, {
		"chars" : " \ud83d\udc3a ",
		"class" : "_1az _1a- _2du",
		"name" : "Cara de lobo"
	}, {
		"chars" : " \ud83d\udc3b ",
		"class" : "_1az _1a- _2dv",
		"name" : "Cara de oso"
	}, {
		"chars" : " \ud83d\udc3e ",
		"class" : "_1az _1a- _2dw",
		"name" : "Huellas"
	}, {
		"chars" : " \ud83d\udc40 ",
		"class" : "_1az _1a- _2dx",
		"name" : "Ojos"
	}, {
		"chars" : " \ud83d\udc42 ",
		"class" : "_1az _1a- _2dy",
		"name" : "Oreja"
	}, {
		"chars" : " \ud83d\udc43 ",
		"class" : "_1az _1a- _2dz",
		"name" : "Nariz"
	}, {
		"chars" : " \ud83d\udc44 ",
		"class" : "_1az _1a- _2d-",
		"name" : "Boca"
	}, {
		"chars" : " \ud83d\udc45 ",
		"class" : "_1az _1a- _2d_",
		"name" : "Lengua"
	}, {
		"chars" : " \ud83d\udc46 ",
		"class" : "_1az _1a- _2e0",
		"name" : "Mano blanca indicando hacia arriba"
	}, {
		"chars" : " \ud83d\udc47 ",
		"class" : "_1az _1a- _2e1",
		"name" : "Mano blanca indicando hacia abajo"
	}, {
		"chars" : " \ud83d\udc48 ",
		"class" : "_1az _1a- _2e2",
		"name" : "Mano blanca indicando hacia la izquierda"
	}, {
		"chars" : " \ud83d\udc49 ",
		"class" : "_1az _1a- _2e3",
		"name" : "Mano blanca indicando hacia la derecha"
	}, {
		"chars" : " \ud83d\udc4a ",
		"class" : "_1az _1a- _2e4",
		"name" : "Puño"
	}, {
		"chars" : " \ud83d\udc4b ",
		"class" : "_1az _1a- _2e5",
		"name" : "Mano en movimiento"
	}, {
		"chars" : " \ud83d\udc4c ",
		"class" : "_1az _1a- _2e6",
		"name" : "Mano indicando todo bien"
	}, {
		"chars" : " \ud83d\udc4d ",
		"class" : "_1az _1a- _2e7",
		"name" : "Mano con pulgar arriba"
	}, {
		"chars" : " \ud83d\udc4e ",
		"class" : "_1az _1a- _2e8",
		"name" : "Mano con pulgar abajo"
	}, {
		"chars" : " \ud83d\udc4f ",
		"class" : "_1az _1a- _2e9",
		"name" : "Manos aplaudiendo"
	}, {
		"chars" : " \ud83d\udc50 ",
		"class" : "_1az _1a- _2ea",
		"name" : "Manos abiertas"
	}, {
		"chars" : " \ud83d\udc66 ",
		"class" : "_1az _1a- _2eb",
		"name" : "Chico"
	}, {
		"chars" : " \ud83d\udc67 ",
		"class" : "_1az _1a- _2ec",
		"name" : "Chica"
	}, {
		"chars" : " \ud83d\udc68 ",
		"class" : "_1az _1a- _2ed",
		"name" : "Hombre"
	}, {
		"chars" : " \ud83d\udc69 ",
		"class" : "_1az _1a- _2ee",
		"name" : "Mujer"
	}, {
		"chars" : " \ud83d\udc6b ",
		"class" : "_1az _1a- _2ef",
		"name" : "Hombre y mujer agarrados de las manos"
	}, {
		"chars" : " \ud83d\udc6e ",
		"class" : "_1az _1a- _2eg",
		"name" : "Oficial de policía"
	}, {
		"chars" : " \ud83d\udc6f ",
		"class" : "_1az _1a- _2eh",
		"name" : "Mujer con orejas de conejo"
	}, {
		"chars" : " \ud83d\udc71 ",
		"class" : "_1az _1a- _2ei",
		"name" : "Persona con pelo rubio"
	}, {
		"chars" : " \ud83d\udc72 ",
		"class" : "_1az _1a- _2ej",
		"name" : "Hombre con gua pi mao"
	}, {
		"chars" : " \ud83d\udc73 ",
		"class" : "_1az _1a- _2ek",
		"name" : "Hombre con turbante"
	}, {
		"chars" : " \ud83d\udc74 ",
		"class" : "_1az _1a- _2el",
		"name" : "Hombre viejo"
	}, {
		"chars" : " \ud83d\udc75 ",
		"class" : "_1az _1a- _2em",
		"name" : "Mujer vieja"
	}, {
		"chars" : " \ud83d\udc76 ",
		"class" : "_1az _1a- _2en",
		"name" : "Bebé"
	}, {
		"chars" : " \ud83d\udc77 ",
		"class" : "_1az _1a- _2eo",
		"name" : "Trabajador de construcción"
	}, {
		"chars" : " \ud83d\udc78 ",
		"class" : "_1az _1a- _2ep",
		"name" : "Princesa"
	}, {
		"chars" : " \ud83d\udc7b ",
		"class" : "_1az _1a- _2eq",
		"name" : "Fantasma"
	}, {
		"chars" : " \ud83d\udc7c ",
		"class" : "_1az _1a- _2er",
		"name" : "Ángel bebé"
	}, {
		"chars" : " \ud83d\udc7d ",
		"class" : "_1az _1a- _2es",
		"name" : "Extraterrestre"
	}, {
		"chars" : " \ud83d\udc7e ",
		"class" : "_1az _1a- _2et",
		"name" : "Monstruo Extraterrestre"
	}, {
		"chars" : " \ud83d\udc7f ",
		"class" : "_1az _1a- _2eu",
		"name" : "Diablillo"
	}, {
		"chars" : " \ud83d\udc80 ",
		"class" : "_1az _1a- _2ev",
		"name" : "Cráneo"
	}, {
		"chars" : " \ud83d\udc82 ",
		"class" : "_1az _1a- _2ew",
		"name" : "Guardia"
	}, {
		"chars" : " \ud83d\udc83 ",
		"class" : "_1az _1a- _2ex",
		"name" : "Bailarina"
	}, {
		"chars" : " \ud83d\udc85 ",
		"class" : "_1az _1a- _2ey",
		"name" : "Esmalte de uñas"
	}, {
		"chars" : " \ud83d\udc8b ",
		"class" : "_1az _1a- _2ez",
		"name" : "Marca de beso"
	}, {
		"chars" : " \ud83d\udc8f ",
		"class" : "_1az _1a- _2e-",
		"name" : "Beso pareja"
	}, {
		"chars" : " \ud83d\udc90 ",
		"class" : "_1az _1a- _2e_",
		"name" : "Ramo de flores"
	}, {
		"chars" : " \ud83d\udc91 ",
		"class" : "_1az _1a- _2f0",
		"name" : "Pareja con corazón"
	}, {
		"chars" : " \ud83d\udc93 ",
		"class" : "_1az _1a- _2f1",
		"name" : "Corazón latiendo"
	}, {
		"chars" : " \ud83d\udc94 ",
		"class" : "_1az _1a- _2f2",
		"name" : "Corazón roto"
	}, {
		"chars" : " \ud83d\udc96 ",
		"class" : "_1az _1a- _2f3",
		"name" : "Corazón brillante"
	}, {
		"chars" : " \ud83d\udc97 ",
		"class" : "_1az _1a- _2f4",
		"name" : "Corazón creciente"
	}, {
		"chars" : " \ud83d\udc98 ",
		"class" : "_1az _1a- _2f5",
		"name" : "Corazón con flecha"
	}, {
		"chars" : " \ud83d\udc99 ",
		"class" : "_1az _1a- _2f6",
		"name" : "Corazón azul"
	}, {
		"chars" : " \ud83d\udc9a ",
		"class" : "_1az _1a- _2f7",
		"name" : "Corazón verde"
	}, {
		"chars" : " \ud83d\udc9b ",
		"class" : "_1az _1a- _2f8",
		"name" : "Corazón amarillo"
	}, {
		"chars" : " \ud83d\udc9c ",
		"class" : "_1az _1a- _2f9",
		"name" : "Corazón morado"
	}, {
		"chars" : " \ud83d\udc9d ",
		"class" : "_1az _1a- _2fa",
		"name" : "Corazón con lazo"
	}, {
		"chars" : " \ud83d\udca2 ",
		"class" : "_1az _1a- _2fb",
		"name" : "Símbolo de enojo"
	}, {
		"chars" : " \ud83d\udca4 ",
		"class" : "_1az _1a- _2fc",
		"name" : "Durmiendo"
	}, {
		"chars" : " \ud83d\udca6 ",
		"class" : "_1az _1a- _2fd",
		"name" : "Símbolo de gotas de sudor"
	}, {
		"chars" : " \ud83d\udca8 ",
		"class" : "_1az _1a- _2fe",
		"name" : "Símbolo de arranque rápido"
	}, {
		"chars" : " \ud83d\udca9 ",
		"class" : "_1az _1a- _2ff",
		"name" : "Pila de cacá"
	}, {
		"chars" : " \ud83d\udcaa ",
		"class" : "_1az _1a- _2fg",
		"name" : "Bícep flexionado"
	}, {
		"chars" : " \ud83d\udcbb ",
		"class" : "_1az _1a- _2fh",
		"name" : "Computadora personal"
	}, {
		"chars" : " \ud83d\udcbd ",
		"class" : "_1az _1a- _2fi",
		"name" : "Minidisco"
	}, {
		"chars" : " \ud83d\udcbe ",
		"class" : "_1az _1a- _2fj",
		"name" : "Disco flexible"
	}, {
		"chars" : " \ud83d\udcbf ",
		"class" : "_1az _1a- _2fk",
		"name" : "Disco óptico"
	}, {
		"chars" : " \ud83d\udcc0 ",
		"class" : "_1az _1a- _2fl",
		"name" : "DVD"
	}, {
		"chars" : " \ud83d\udcde ",
		"class" : "_1az _1a- _2fm",
		"name" : "Receptor de teléfono"
	}, {
		"chars" : " \ud83d\udce0 ",
		"class" : "_1az _1a- _2fn",
		"name" : "Fax"
	}, {
		"chars" : " \ud83d\udcf1 ",
		"class" : "_1az _1a- _2fo",
		"name" : "Teléfono móvil"
	}, {
		"chars" : " \ud83d\udcf2 ",
		"class" : "_1az _1a- _2fp",
		"name" : "Teléfono móvil con flecha de izquierda a derecha"
	}, {
		"chars" : " \ud83d\udcfa ",
		"class" : "_1az _1a- _2fq",
		"name" : "Televisión"
	}, {
		"chars" : " \ud83d\udd14 ",
		"class" : "_1az _1a- _2fr",
		"name" : "Campana"
	}, {
		"chars" : " \ud83d\ude01 ",
		"class" : "_1az _1a- _2fs",
		"name" : "Cara de mueca con ojos sonrientes"
	}, {
		"chars" : " \ud83d\ude02 ",
		"class" : "_1az _1a- _2ft",
		"name" : "Cara con lágrimas de alegría"
	}, {
		"chars" : " \ud83d\ude03 ",
		"class" : "_1az _1a- _2fu",
		"name" : "Cara sonriente con boca abierta"
	}, {
		"chars" : " \ud83d\ude04 ",
		"class" : "_1az _1a- _2fv",
		"name" : "Cara y ojos sonrientes con boca abierta"
	}, {
		"chars" : " \ud83d\ude06 ",
		"class" : "_1az _1a- _2fw",
		"name" : "Cara sonriente con boca abierta y ojos bien cerrados"
	}, {
		"chars" : " \ud83d\ude09 ",
		"class" : "_1az _1a- _2fx",
		"name" : "Cara guiñando ojo"
	}, {
		"chars" : " \ud83d\ude0b ",
		"class" : "_1az _1a- _2fy",
		"name" : "Cara saboreando una comida deliciosa"
	}, {
		"chars" : " \ud83d\ude0c ",
		"class" : "_1az _1a- _2fz",
		"name" : "Cara de alivio"
	}, {
		"chars" : " \ud83d\ude0d ",
		"class" : "_1az _1a- _2f-",
		"name" : "Cara sonriente con ojos en forma de corazón"
	}, {
		"chars" : " \ud83d\ude0f ",
		"class" : "_1az _1a- _2f_",
		"name" : "Cara de sonrisa burlona"
	}, {
		"chars" : " \ud83d\ude12 ",
		"class" : "_1az _1a- _2g0",
		"name" : "Cara de aburrimiento"
	}, {
		"chars" : " \ud83d\ude13 ",
		"class" : "_1az _1a- _2g1",
		"name" : "Cara con sudor frio"
	}, {
		"chars" : " \ud83d\ude14 ",
		"class" : "_1az _1a- _2g2",
		"name" : "Cara pensativa"
	}, {
		"chars" : " \ud83d\ude16 ",
		"class" : "_1az _1a- _2g3",
		"name" : "Cara de confundido"
	}, {
		"chars" : " \ud83d\ude18 ",
		"class" : "_1az _1a- _2g4",
		"name" : "Cara arrojando beso"
	}, {
		"chars" : " \ud83d\ude1a ",
		"class" : "_1az _1a- _2g5",
		"name" : "Cara besando con ojos cerrados"
	}, {
		"chars" : " \ud83d\ude1c ",
		"class" : "_1az _1a- _2g6",
		"name" : "Cara con lengua afuera y guiñando un ojo"
	}, {
		"chars" : " \ud83d\ude1d ",
		"class" : "_1az _1a- _2g7",
		"name" : "Cara con lengua afuera y ojos muy cerrados"
	}, {
		"chars" : " \ud83d\ude1e ",
		"class" : "_1az _1a- _2g8",
		"name" : "Cara desanimada"
	}, {
		"chars" : " \ud83d\ude20 ",
		"class" : "_1az _1a- _2g9",
		"name" : "Cara de enojo"
	}, {
		"chars" : " \ud83d\ude21 ",
		"class" : "_1az _1a- _2ga",
		"name" : "Cara de mucho enojo"
	}, {
		"chars" : " \ud83d\ude22 ",
		"class" : "_1az _1a- _2gb",
		"name" : "Cara llorando"
	}, {
		"chars" : " \ud83d\ude23 ",
		"class" : "_1az _1a- _2gc",
		"name" : "Cara de perseverancia"
	}, {
		"chars" : " \ud83d\ude24 ",
		"class" : "_1az _1a- _2gd",
		"name" : "Cara de triunfo"
	}, {
		"chars" : " \ud83d\ude25 ",
		"class" : "_1az _1a- _2ge",
		"name" : "Cara desanimada pero aliviada"
	}, {
		"chars" : " \ud83d\ude28 ",
		"class" : "_1az _1a- _2gf",
		"name" : "Cara de miedoso"
	}, {
		"chars" : " \ud83d\ude29 ",
		"class" : "_1az _1a- _2gg",
		"name" : "Cara de fatigado"
	}, {
		"chars" : " \ud83d\ude2a ",
		"class" : "_1az _1a- _2gh",
		"name" : "Cara de dormido"
	}, {
		"chars" : " \ud83d\ude2b ",
		"class" : "_1az _1a- _2gi",
		"name" : "Cara de cansado"
	}, {
		"chars" : " \ud83d\ude2d ",
		"class" : "_1az _1a- _2gj",
		"name" : "Cara gritando"
	}, {
		"chars" : " \ud83d\ude30 ",
		"class" : "_1az _1a- _2gk",
		"name" : "Cara con boca abierta y sudor frio"
	}, {
		"chars" : " \ud83d\ude31 ",
		"class" : "_1az _1a- _2gl",
		"name" : "Cara aterrada de miedo"
	}, {
		"chars" : " \ud83d\ude32 ",
		"class" : "_1az _1a- _2gm",
		"name" : "Cara de muy sorprendido"
	}, {
		"chars" : " \ud83d\ude33 ",
		"class" : "_1az _1a- _2gn",
		"name" : "Cara sonrojada"
	}, {
		"chars" : " \ud83d\ude35 ",
		"class" : "_1az _1a- _2go",
		"name" : "Cara mareada"
	}, {
		"chars" : " \ud83d\ude37 ",
		"class" : "_1az _1a- _2gp",
		"name" : "Cara con mascarilla médica"
	}, {
		"chars" : " \ud83d\ude38 ",
		"class" : "_1az _1a- _2gq",
		"name" : "Cara de gato haciendo muecas y ojos cerrados"
	}, {
		"chars" : " \ud83d\ude39 ",
		"class" : "_1az _1a- _2gr",
		"name" : "Cara de gato con lágrimas de risa"
	}, {
		"chars" : " \ud83d\ude3a ",
		"class" : "_1az _1a- _2gs",
		"name" : "Cara de gato sonriente con boca abierta"
	}, {
		"chars" : " \ud83d\ude3b ",
		"class" : "_1az _1a- _2gt",
		"name" : "Cara de gato sonriente con corazones en los ojos"
	}, {
		"chars" : " \ud83d\ude3c ",
		"class" : "_1az _1a- _2gu",
		"name" : "Cara de gato con sonrisa torcida"
	}, {
		"chars" : " \ud83d\ude3d ",
		"class" : "_1az _1a- _2gv",
		"name" : "Cara de gato besando con ojos cerrados"
	}, {
		"chars" : " \ud83d\ude3f ",
		"class" : "_1az _1a- _2gw",
		"name" : "Cara de gato llorando"
	}, {
		"chars" : " \ud83d\ude40 ",
		"class" : "_1az _1a- _2gx",
		"name" : "Cara de gato aterrada de miedo"
	}, {
		"chars" : " \ud83d\ude4b ",
		"class" : "_1az _1a- _2gy",
		"name" : "Persona feliz levantando una mano"
	}, {
		"chars" : " \ud83d\ude4c ",
		"class" : "_1az _1a- _2gz",
		"name" : "Persona levantando ambas manos en celebración"
	}, {
		"chars" : " \ud83d\ude4d ",
		"class" : "_1az _1a- _2g-",
		"name" : "Persona frunciendo el ceño"
	}, {
		"chars" : " \ud83d\ude4f ",
		"class" : "_1az _1a- _2g_",
		"name" : "Persona en plegaria"
	}, {
		"chars" : " \u261d ",
		"class" : "_1az _1a- _2h0",
		"name" : "Dedo índice señalando hacia arriba"
	}, {
		"chars" : " \u263a ",
		"class" : "_1az _1a- _2h1",
		"name" : "Cara blanca sonriendo"
	}, {
		"chars" : " \u26a1 ",
		"class" : "_1az _1a- _2h2",
		"name" : "Símbolo de alto voltaje"
	}, {
		"chars" : " \u26c4 ",
		"class" : "_1az _1a- _2h3",
		"name" : "Muñeco de nieve sin nieve"
	}, {
		"chars" : " \u270a ",
		"class" : "_1az _1a- _2h4",
		"name" : "Puño hacia arriba"
	}, {
		"chars" : " \u270b ",
		"class" : "_1az _1a- _2h5",
		"name" : "Mano hacia arriba"
	}, {
		"chars" : " \u270c ",
		"class" : "_1az _1a- _2h6",
		"name" : "Mano de victoria"
	}, {
		"chars" : " \u2600 ",
		"class" : "_1az _1a- _2h7",
		"name" : "Sol con rayos solares"
	}, {
		"chars" : " \u2601 ",
		"class" : "_1az _1a- _2h8",
		"name" : "Nube"
	}, {
		"chars" : " \u2614 ",
		"class" : "_1az _1a- _2h9",
		"name" : "Sombrilla con gotas de lluvia"
	}, {
		"chars" : " \u2615 ",
		"class" : "_1az _1a- _2ha",
		"name" : "Bebida caliente"
	}, {
		"chars" : " \u2728 ",
		"class" : "_1az _1a- _2hb",
		"name" : "Brillo"
	}, {
		"chars" : " \u2764 ",
		"class" : "_1az _1a- _2hc",
		"name" : "Corazón negro pesado"
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
	html += '<a class="navLink" title="FB CHat Emoticon COdes">'; // var navLink
	html += '<span class="emoticon emoticon_kiki" style="vertical-align: middle;"></span>';
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
	html += '<a class="jewelFooter" href="http://www.facebook.com/koisuke11" target="_blank">» Emoticon Fesbuk by Agan Juna «</a>';
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
// ==UserScript==
// @name    	Facebook Emotikon Baru 2013 by Agan Juna
// @namespace	Facebook Emotikon Baru 2013 by Agan Juna
// @description	Smile dan Tambahan Emotikon lengkapi chat dan komentar kamu :D
// @version 	6.0.5
// @author  	Agan Juna
// @homepageURL	http://www.facebook.com/koisuke11
// @include 	http://www.facebook.com/*
// @include 	https://www.facebook.com/*
// ==/UserScript==

(function() {
	// Active only in main frame
	if (!document.querySelector("#pageNav")) {
		return;
	}
	//console.info("FB CHat Emoticon COdes");

	// = Data =======
	// Emoticon data; +5 text-base, +206 unicode from Android app.
	var emoticons = [ { // Text to picture emoticons
		"chars" : " :) ",
		"class" : "emoticon_smile",
		"name" : "Send It"
	}, {
		"chars" : " :( ",
		"class" : "emoticon_frown",
		"name" : "Send It"
	}, {
		"chars" : " :P ",
		"class" : "emoticon_tongue",
		"name" : "Send It"
	}, {
		"chars" : " =D ",
		"class" : "emoticon_grin",
		"name" : "Send It"
	}, {
		"chars" : " :o ",
		"class" : "emoticon_gasp",
		"name" : "Send It"
	}, {
		"chars" : " ;) ",
		"class" : "emoticon_wink",
		"name" : "Send It"
	}, {
		"chars" : " :v ",
		"class" : "emoticon_pacman",
		"name" : "Send It"
	}, {
		"chars" : " >:( ",
		"class" : "emoticon_grumpy",
		"name" : "Send It"
	}, {
		"chars" : " :/ ",
		"class" : "emoticon_unsure",
		"name" : "Send It"
	}, {
		"chars" : " :'( ",
		"class" : "emoticon_cry",
		"name" : "Send It"
	}, {
		"chars" : " ^_^ ",
		"class" : "emoticon_kiki",
		"name" : "Send It"
	}, {
		"chars" : " 8) ",
		"class" : "emoticon_glasses",
		"name" : "Send It"
	}, {
		"chars" : " B| ",
		"class" : "emoticon_sunglasses",
		"name" : "Send It"
	}, {
		"chars" : " <3 ",
		"class" : "emoticon_heart",
		"name" : "Send It"
	}, {
		"chars" : " 3:) ",
		"class" : "emoticon_devil",
		"name" : "Send It"
	}, {
		"chars" : " O:) ",
		"class" : "emoticon_angel",
		"name" : "Send It"
	}, {
		"chars" : " -_- ",
		"class" : "emoticon_squint",
		"name" : "Send It"
	}, {
		"chars" : " o.O ",
		"class" : "emoticon_confused",
		"name" : "Send It"
	}, {
		"chars" : " >:o ",
		"class" : "emoticon_upset",
		"name" : "Send It"
	}, {
		"chars" : " :3 ",
		"class" : "emoticon_colonthree",
		"name" : "Send It"
	}, {
		"chars" : " (y) ",
		"class" : "emoticon_like",
		"name" : "Send It"
	}, {
		"chars" : " :* ",
		"class" : "emoticon emoticon_kiss",
		"name" : "Send It"
	}, {
		"chars" : " (^^^) ",
		"class" : "emoticon_shark",
		"name" : "Send It"
	}, {
		"chars" : " :|] ",
		"class" : "emoticon_robot",
		"name" : "Send It"
	}, {
		"chars" : " <(\") ",
		"class" : "emoticon_penguin",
		"name" : "Send It"
	}, {
		"chars" : " :poop: ",
		"class" : "emoticon_poop",
		"name" : "Send It"
	}, {
		"chars" : " [[458744944169938]] ",
		"class" : "_1az _1a- _2c0",
		"name" : "Send It"
	}, {
		"chars" : " [[458744920836607]]  ",
		"class" : "_1az _1a- _2c1",
		"name" : "Send It"
	}, {
		"chars" : " [[458744897503276]] ",
		"class" : "_1az _1a- _2c2",
		"name" : "Send It"
	}, {
		"chars" : " [[458744894169943]]  ",
		"class" : "_1az _1a- _2c3",
		"name" : "Send It"
	}, {
		"chars" : " [[458744967503269]] ",
		"class" : "_1az _1a- _2c4",
		"name" : "Send It"
	}, {
		"chars" : " [[458744874169945]]  ",
		"class" : "_1az _1a- _2c5",
		"name" : "Send It"
	}, {
		"chars" : " [[458744854169947]] ",
		"class" : "_1az _1a- _2c6",
		"name" : "Send It"
	}, {
		"chars" : " [[458744844169948]]  ",
		"class" : "_1az _1a- _2c7",
		"name" : "Send It"
	}, {
		"chars" : " [[458744837503282]]  ",
		"class" : "_1az _1a- _2c8",
		"name" : "Send It"
	}, {
		"chars" : " [[458744824169950]]  ",
		"class" : "_1az _1a- _2c9",
		"name" : "Send It"
	}, {
		"chars" : " [[458744837503282]] ",
		"class" : "_1az _1a- _2ca",
		"name" : "Send It"
	}, {
		"chars" : "  [[479165765470926]]  ",
		"class" : "_1az _1a- _2ci",
		"name" : "Send It"
	}, {
		"chars" : " [[460472437330522]] ",
		"class" : "_1az _1a- _2cj",
		"name" : "Send It"
	}, {
		"chars" : "  [[479166372137532]]  ",
		"class" : "_1az _1a- _2ck",
		"name" : "Send It"
	}, {
		"chars" : " [[460472413997191]] ",
		"class" : "_1az _1a- _2cm",
		"name" : "Send It"
	}, {
		"chars" : " [[460472423997190]] ",
		"class" : "_1az _1a- _2cn",
		"name" : "Send It"
	}, {
		"chars" : "   [[479520475435455]]  ",
		"class" : "_1az _1a- _2cy",
		"name" : "Send It"
	}, {
		"chars" : "   [[460457547332011]]  ",
		"class" : "_1az _1a- _2c_",
		"name" : "Send It"
	}, {
		"chars" : "   [[479523612101808]] ",
		"class" : "_1az _1a- _2dg",
		"name" : "Send It"
	}, {
		"chars" : "   [[460457397332026]] ",
		"class" : "_1az _1a- _2dh",
		"name" : "Send It"
	}, {
		"chars" : " [[460457430665356]] ",
		"class" : "_1az _1a- _2di",
		"name" : "Send It"
	}, {
		"chars" : " [[460457413998691]]  ",
		"class" : "_1az _1a- _2dl",
		"name" : "Send It"
	}, {
		"chars" : "   [[479526335434869]] ",
		"class" : "_1az _1a- _2dw",
		"name" : "Send It"
	}, {
		"chars" : " [[445015122219324]]   ",
		"class" : "_1az _1a- _2dx",
		"name" : "Send It"
	}, {
		"chars" : " [[445014572219379]]   ",
		"class" : "_1az _1a- _2d-",
		"name" : "Send It"
	}, {
		"chars" : " [[458743794170053]]  ",
		"class" : "_1az _1a- _2d_",
		"name" : "Send It"
	}, {
		"chars" : " [[479529205434582]]  ",
		"class" : "_1az _1a- _2e0",
		"name" : "Send It"
	}, {
		"chars" : "   [[479530815434421]] ",
		"class" : "_1az _1a- _2e2",
		"name" : "Send It"
	}, {
		"chars" : "   [[479531175434385]] ",
		"class" : "_1az _1a- _2e3",
		"name" : "Send It"
	}, {
		"chars" : "   [[479532652100904]] ",
		"class" : "_1az _1a- _2e7",
		"name" : "Send It"
	}, {
		"chars" : "[[479533058767530]] ",
		"class" : "_1az _1a- _2e8",
		"name" : "Send It"
	}, {
		"chars" : " [[479534202100749]] ",
		"class" : "_1az _1a- _2eq",
		"name" : "Send It"
	}, {
		"chars" : " [[479534652100704]] ",
		"class" : "_1az _1a- _2es",
		"name" : "Send It"
	}, {
		"chars" : " [[479535305433972]] ",
		"class" : "_1az _1a- _2ez",
		"name" : "Send It"
	}, {
		"chars" : " [[479535728767263]] ",
		"class" : "_1az _1a- _2e-",
		"name" : "Send It"
	}, {
		"chars" : " [[479536225433880]]  ",
		"class" : "_1az _1a- _2e_",
		"name" : "Send It"
	}, {
		"chars" : " [[458743760836723]] ",
		"class" : "_1az _1a- _2f1",
		"name" : "Send It"
	}, {
		"chars" : " [[458743927503373]] ",
		"class" : "_1az _1a- _2f2",
		"name" : "Send It"
	}, {
		"chars" : " [[458743934170039]]",
		"class" : "_1az _1a- _2f3",
		"name" : "Send It"
	}, {
		"chars" : " [[458743957503370]] ",
		"class" : "_1az _1a- _2f4",
		"name" : "Send It"
	}, {
		"chars" : " [[458744247503341]] ",
		"class" : "_1az _1a- _2f5",
		"name" : "Send It"
	}, {
		"chars" : " [[458744467503319]] ",
		"class" : "_1az _1a- _2f7",
		"name" : "Send It"
	}, {
		"chars" : " [[458744484169984]] ",
		"class" : "_1az _1a- _2f8",
		"name" : "Send It"
	}, {
		"chars" : " [[458744507503315]] ",
		"class" : "_1az _1a- _2f9",
		"name" : "Send It"
	}, {
		"chars" : " [[458744524169980]] ",
		"class" : "_1az _1a- _2fa",
		"name" : "Send It"
	}, {
		"chars" : " [[458744540836645]] ",
		"class" : "_1az _1a- _2fb",
		"name" : "Send It"
	}, {
		"chars" : " [[458744554169977]] ",
		"class" : "_1az _1a- _2fc",
		"name" : "Send It"
	}, {
		"chars" : " [[458744580836641]] ",
		"class" : "_1az _1a- _2fd",
		"name" : "Send It"
	}, {
		"chars" : " [[458744587503307]] ",
		"class" : "_1az _1a- _2fe",
		"name" : "Send It"
	}, {
		"chars" : " :poop: ",
		"class" : "_1az _1a- _2ff",
		"name" : "Send It"
	}, {
		"chars" : " [[458744607503305]] ",
		"class" : "_1az _1a- _2fg",
		"name" : "Send It"
	}, {
		"chars" : " [[458744614169971]] ",
		"class" : "_1az _1a- _2fh",
		"name" : "Send It"
	}, {
		"chars" : " [[458744620836637]] ",
		"class" : "_1az _1a- _2fi",
		"name" : "Send It"
	}, {
		"chars" : " [[458744630836636]] ",
		"class" : "_1az _1a- _2fk",
		"name" : "Send It"
	}, {
		"chars" : " [[458744644169968]] ",
		"class" : "_1az _1a- _2fl",
		"name" : "Send It"
	}, {
		"chars" : " [[458744650836634]] ",
		"class" : "_1az _1a- _2fm",
		"name" : "Send It"
	}, {
		"chars" : " [[458744660836633]] ",
		"class" : "_1az _1a- _2fn",
		"name" : "Send It"
	}, {
		"chars" : " [[458744687503297]] ",
		"class" : "_1az _1a- _2fo",
		"name" : "Send It"
	}, {
		"chars" : " [[458744700836629]] ",
		"class" : "_1az _1a- _2fp",
		"name" : "Send It"
	}, {
		"chars" : " [[458744714169961]] ",
		"class" : "_1az _1a- _2fq",
		"name" : "Send It"
	}, {
		"chars" : " [[458744724169960]] ",
		"class" : "_1az _1a- _2fr",
		"name" : "Send It"
	}, {
		"chars" : " [[458744597503306]] ",
		"class" : "_1az _1a- _2fs",
		"name" : "Cara de mueca con ojos sonrientes"
	}, {
		"chars" : " [[458743470836752]] ",
		"class" : "_1az _1a- _2ft",
		"name" : "Cara con lágrimas de alegría"
	}, {
		"chars" : " [[458743477503418]] ",
		"class" : "_1az _1a- _2fu",
		"name" : "Cara sonriente con boca abierta"
	}, {
		"chars" : " [[458743480836751]] ",
		"class" : "_1az _1a- _2fv",
		"name" : "Cara y ojos sonrientes con boca abierta"
	}, {
		"chars" : " [[458743684170064]] ",
		"class" : "_1az _1a- _2fw",
		"name" : "Cara sonriente con boca abierta y ojos bien cerrados"
	}, {
		"chars" : " [[458743647503401]] ",
		"class" : "_1az _1a- _2fx",
		"name" : "Cara guiñando ojo"
	}, {
		"chars" : " [[458743664170066]]  ",
		"class" : "_1az _1a- _2fy",
		"name" : "Cara saboreando una comida deliciosa"
	}, {
		"chars" : " [[458743684170064]] ",
		"class" : "_1az _1a- _2fz",
		"name" : "Cara de alivio"
	}, {
		"chars" : " [[458743697503396]] ",
		"class" : "_1az _1a- _2f-",
		"name" : "Cara sonriente con ojos en forma de corazón"
	}, {
		"chars" : " [[458743710836728]] ",
		"class" : "_1az _1a- _2f_",
		"name" : "Cara de sonrisa burlona"
	}, {
		"chars" : " [[458743727503393]] ",
		"class" : "_1az _1a- _2g0",
		"name" : "Cara de aburrimiento"
	}, {
		"chars" : " [[458743744170058]] ",
		"class" : "_1az _1a- _2g1",
		"name" : "Cara con sudor frio"
	}, {
		"chars" : " [[440983009289202]] ",
		"class" : "_1az _1a- _2g2",
		"name" : "Cara pensativa"
    }, {
		"chars" : " [[458743767503389]] ",
		"class" : "_1az _1a- _2g4",
		"name" : "Cara arrojando beso"
	}, {
		"chars" : " [[458743777503388]] ",
		"class" : "_1az _1a- _2g5",
		"name" : "Cara besando con ojos cerrados"
	}, {
		"chars" : " [[458743787503387]] ",
		"class" : "_1az _1a- _2g6",
		"name" : "Cara con lengua afuera y guiñando un ojo"
	}, {
		"chars" : " [[458743794170053]] ",
		"class" : "_1az _1a- _2g7",
		"name" : "Cara con lengua afuera y ojos muy cerrados"
	}, {
		"chars" : " [[458743797503386]] ",
		"class" : "_1az _1a- _2g8",
		"name" : "Cara desanimada"
	}, {
		"chars" : " [[458743814170051]] ",
		"class" : "_1az _1a- _2g9",
		"name" : "Cara de enojo"
	}, {
		"chars" : " [[458743834170049]] ",
		"class" : "_1az _1a- _2ga",
		"name" : "Cara de mucho enojo"
	}, {
		"chars" : " [[458743840836715]] ",
		"class" : "_1az _1a- _2gb",
		"name" : "Cara llorando"
	}, {
		"chars" : " [[458744994169933]] ",
		"class" : "_1az _1a- _2gc",
		"name" : "Cara de perseverancia"
	}, {
		"chars" : " [[458744597503306]] ",
		"class" : "_1az _1a- _2gd",
		"name" : "Cara de triunfo"
	}, {
		"chars" : " [[458743870836712]] ",
		"class" : "_1az _1a- _2ge",
		"name" : "Cara desanimada pero aliviada"
	}, {
		"chars" : " [[458743887503377]] ",
		"class" : "_1az _1a- _2gf",
		"name" : "Cara de miedoso"
	}, {
		"chars" : " [[458744877503278]] ",
		"class" : "_1az _1a- _2gg",
		"name" : "Cara de fatigado"
	}, {
		"chars" : " [[458744974169935]] ",
		"class" : "_1az _1a- _2gh",
		"name" : "Cara de dormido"
	}, {
		"chars" : " [[458744994169933]] ",
		"class" : "_1az _1a- _2gi",
		"name" : "Cara de cansado"
	}, {
		"chars" : " [[458745007503265]] ",
		"class" : "_1az _1a- _2gj",
		"name" : "Cara gritando"
	}, {
		"chars" : " [[458745020836597]] ",
		"class" : "_1az _1a- _2gk",
		"name" : "Cara con boca abierta y sudor frio"
	}, {
		"chars" : " [[458745024169930]] ",
		"class" : "_1az _1a- _2gl",
		"name" : "Cara aterrada de miedo"
	}, {
		"chars" : " [[458745034169929]] ",
		"class" : "_1az _1a- _2gm",
		"name" : "Cara de muy sorprendido"
	}, {
		"chars" : " [[458745047503261]]",
		"class" : "_1az _1a- _2gn",
		"name" : "Cara sonrojada"
	}, {
		"chars" : " [[458745084169924]] ",
		"class" : "_1az _1a- _2gp",
		"name" : "Cara con mascarilla médica"
	}, {
		"chars" : " \u263a ",
		"class" : "_1az _1a- _2h1",
		"name" : "Cara blanca sonriendo"
	}, {
		"chars" : " \u26a1 ",
		"class" : "_1az _1a- _2h2",
		"name" : "Símbolo de alto voltaje"
	}, {
		"chars" : " \u26c4 ",
		"class" : "_1az _1a- _2h3",
		"name" : "Muñeco de nieve sin nieve"
	}, {
		"chars" : " \u270a ",
		"class" : "_1az _1a- _2h4",
		"name" : "Puño hacia arriba"
	}, {
		"chars" : " \u270b ",
		"class" : "_1az _1a- _2h5",
		"name" : "Mano hacia arriba"
	}, {
		"chars" : " \u270c ",
		"class" : "_1az _1a- _2h6",
		"name" : "Mano de victoria"
	}, {
		"chars" : " \u2600 ",
		"class" : "_1az _1a- _2h7",
		"name" : "Sol con rayos solares"
	}, {
		"chars" : " \u2601 ",
		"class" : "_1az _1a- _2h8",
		"name" : "Nube"
	}, {
		"chars" : " \u2614 ",
		"class" : "_1az _1a- _2h9",
		"name" : "Sombrilla con gotas de lluvia"
	}, {
		"chars" : " \u2615 ",
		"class" : "_1az _1a- _2ha",
		"name" : "Bebida caliente"
	}, {
		"chars" : " \u2728 ",
		"class" : "_1az _1a- _2hb",
		"name" : "Brillo"
	}, {
		"chars" : " \u2764 ",
		"class" : "_1az _1a- _2hc",
		"name" : "Corazón negro pesado"
	}, { // Text emoticons
		"chars" : "\u2190",
		"name" : "Izquieda"
	}, {
		"chars" : "\u2191",
		"name" : "Arriba"
	}, {
		"chars" : "\u2192",
		"name" : "Derecha"
	}, {
		"chars" : "\u2193",
		"name" : "Abajo"
	}, {
		"chars" : "\u2194",
		"name" : "Izquierda-derecha"
	}, {
		"chars" : "\u2195",
		"name" : "Arriba-Abajo"
	}, {
		"chars" : "\u2196",
		"name" : "Noroeste"
	}, {
		"chars" : "\u2197",
		"name" : "Noreste"
	}, {
		"chars" : "\u2198",
		"name" : "Sureste"
	}, {
		"chars" : "\u2199",
		"name" : "Suroeste"
	}, {
		"chars" : "\u2620",
		"name" : "Cráneo y huesos"
	}, {
		"chars" : "\u2622",
		"name" : "Símbolo radioactivo"
	}, {
		"chars" : "\u2623",
		"name" : "Símbolo biohazard"
	}, {
		"chars" : "\u2624",
		"name" : "Símbolo medicina"
	}, {
		"chars" : "\u2629",
		"name" : "Cruz de Jerusalén"
	}, {
		"chars" : "\u262A",
		"name" : "Estrella y luna creciente"
	}, {
		"chars" : "\u262D",
		"name" : "Martillo y hoz"
	}, {
		"chars" : "\u262E",
		"name" : "Símbolo de la paz"
	}, {
		"chars" : "\u262F",
		"name" : "Símbolo YIN YANG"
	}, {
		"chars" : "\u263F",
		"name" : "Mercurio"
	}, {
		"chars" : "\u2641",
		"name" : "Tierra"
	}, {
		"chars" : "\u2643",
		"name" : "Júpiter"
	}, {
		"chars" : "\u2644",
		"name" : "Saturno"
	}, {
		"chars" : "\u2645",
		"name" : "Urano"
	}, {
		"chars" : "\u2646",
		"name" : "Neptuno"
	}, {
		"chars" : "\u2647",
		"name" : "Plutón"
	}, {
		"chars" : "\u2648",
		"name" : "Aries"
	}, {
		"chars" : "\u2649",
		"name" : "Tauro"
	}, {
		"chars" : "\u264A",
		"name" : "Géminis"
	}, {
		"chars" : "\u264B",
		"name" : "Cáncer"
	}, {
		"chars" : "\u264C",
		"name" : "Leo"
	}, {
		"chars" : "\u264D",
		"name" : "Virgo"
	}, {
		"chars" : "\u264E",
		"name" : "Libra"
	}, {
		"chars" : "\u264F",
		"name" : "Escorpión"
	}, {
		"chars" : "\u2650",
		"name" : "Sagitario"
	}, {
		"chars" : "\u2651",
		"name" : "Capricornio"
	}, {
		"chars" : "\u2652",
		"name" : "Acuario"
	}, {
		"chars" : "\u2653",
		"name" : "Piscis"
	}, {
		"chars" : "\u2654",
		"name" : "Rey blanco"
	}, {
		"chars" : "\u2655",
		"name" : "Reina blanca"
	}, {
		"chars" : "\u2656",
		"name" : "Torre blanca"
	}, {
		"chars" : "\u2657",
		"name" : "Alfil blanco"
	}, {
		"chars" : "\u2658",
		"name" : "Caballo blanco"
	}, {
		"chars" : "\u2659",
		"name" : "Peón blanco"
	}, {
		"chars" : "\u265A",
		"name" : "Rey negro"
	}, {
		"chars" : "\u265B",
		"name" : "Reina negra"
	}, {
		"chars" : "\u265C",
		"name" : "Torre negra"
	}, {
		"chars" : "\u265D",
		"name" : "Alfil negro"
	}, {
		"chars" : "\u265E",
		"name" : "Caballo negro"
	}, {
		"chars" : "\u265F",
		"name" : "Peón negro"
	}, {
		"chars" : "\u2640",
		"name" : "Femenino"
	}, {
		"chars" : "\u2642",
		"name" : "Masculino"
	}, {
		"chars" : "\u2660",
		"name" : "Pica"
	}, {
		"chars" : "\u2663",
		"name" : "Trébol"
	}, {
		"chars" : "\u2666",
		"name" : "Diamante"
	}, {
		"chars" : "\u2669",
		"name" : "Negra"
	}, {
		"chars" : "\u266a",
		"name" : "Corchea"
	}, {
		"chars" : "\u266b",
		"name" : "Seminegra"
	}, {
		"chars" : "\u266c",
		"name" : "Semicorchea"
	}, {
		"chars" : "\u26F2",
		"name" : "Fuente"
	}, {
		"chars" : "\u2714",
		"name" : "Correcto"
	}, {
		"chars" : "\u2718",
		"name" : "Incorrecto"
	}, {
		"chars" : "\u0295\u2022\u1d25\u2022\u0294",
		"name" : "Oso Ted"
	}, {
		"chars" : "\u10da(\u0ca0\u76ca\u0ca0\u10da)",
		"name" : "Y U NO"
	}, {	
		"chars"  : "@",
		"name"  : "@"
	}, {	
		"chars"  : "©",
		"name"  : "©"
	}, {	
		"chars"  : "®",
		"name"  : "®"
	}, {	
		"chars"  : "º",
		"name"  : "º"
	}, {	
		"chars"  : "¹",
		"name"  : "¹"
	}, {	
		"chars"  : "²",
		"name"  : "²"
	}, {	
		"chars"  : "³",
		"name"  : "³"
	}, {	
		"chars"  : "<",
		"name"  : "<"
	}, {	
		"chars"  : ">",
		"name"  : ">"
	}, {	
		"chars"  : "#",
		"name"  : "#"
	}, {	
		"chars"  : "$",
		"name"  : "$"
	}, {	
		"chars"  : "%",
		"name"  : "%"
	}, {	
		"chars"  : "\u0026",
		"name"  : "\u0026"
	}, {	
		"chars"  : "«",
		"name"  : "«"
	}, {	
		"chars"  : "»",
		"name"  : "»"
	}, {	
		"chars"  : "ª",
		"name"  : "ª"
	}, {	
		"chars"  : "§",
		"name"  : "§"
	}, {	
		"chars"  : "¦",
		"name"  : "¦"
	}, {	
		"chars"  : "µ",
		"name"  : "µ"
	}, {	
		"chars"  : "¶",
		"name"  : "¶"
	}, {	
		"chars"  : "¢",
		"name"  : "¢"
	}, {	
		"chars"  : "£",
		"name"  : "£"
	}, {	
		"chars"  : "¤",
		"name"  : "¤"
	}, {	
		"chars"  : "¥",
		"name"  : "¥"
	}, {	
		"chars"  : "Á",
		"name"  : "Á"
	}, {	
		"chars"  : "À",
		"name"  : "À"
	}, {	
		"chars"  : "Â",
		"name"  : "Â"
	}, {	
		"chars"  : "¿",
		"name"  : "¿"
	}, {	
		"chars"  : "Ã",
		"name"  : "Ã"
	}, {	
		"chars"  : "Ä",
		"name"  : "Ä"
	}, {	
		"chars"  : "Å",
		"name"  : "Å"
	}, {	
		"chars"  : "Æ",
		"name"  : "Æ"
	}, {	
		"chars"  : "Ç",
		"name"  : "Ç"
	}, {	
		"chars"  : "È",
		"name"  : "È"
	}, {	
		"chars"  : "É",
		"name"  : "É"
	}, {	
		"chars"  : "Ê",
		"name"  : "Ê"
	}, {	
		"chars"  : "Ë",
		"name"  : "Ë"
	}, {	
		"chars"  : "Ì",
		"name"  : "Ì"
	}, {	
		"chars"  : "Í",
		"name"  : "Í"
	}, {	
		"chars"  : "Î",
		"name"  : "Î"
	}, {	
		"chars"  : "Ï",
		"name"  : "Ï"
	}, {	
		"chars"  : "Ð",
		"name"  : "Ð"
	}, {	
		"chars"  : "Ñ",
		"name"  : "Ñ"
	}, {	
		"chars"  : "Ò",
		"name"  : "Ò"
	}, {	
		"chars"  : "Ó",
		"name"  : "Ó"
	}, {	
		"chars"  : "Ô",
		"name"  : "Ô"
	}, {	
		"chars"  : "Õ",
		"name"  : "Õ"
	}, {	
		"chars"  : "Ö",
		"name"  : "Ö"
	}, {	
		"chars"  : "×",
		"name"  : "×"
	}, {	
		"chars"  : "Ø",
		"name"  : "Ø"
	}, {	
		"chars"  : "Ù",
		"name"  : "Ù"
	}, {	
		"chars"  : "Ù",
		"name"  : "Ù"
	}, {	
		"chars"  : "Û",
		"name"  : "Û"
	}, {	
		"chars"  : "Ü",
		"name"  : "Ü"
	}, {	
		"chars"  : "Ý",
		"name"  : "Ý"
	}, {	
		"chars"  : "Þ",
		"name"  : "Þ"
	}, {	
		"chars"  : "ß",
		"name"  : "ß"
	}, {	
		"chars"  : "à",
		"name"  : "à"
	}, {	
		"chars"  : "á",
		"name"  : "á"
	}, {	
		"chars"  : "â",
		"name"  : "â"
	}, {	
		"chars"  : "ã",
		"name"  : "ã"
	}, {	
		"chars"  : "ä",
		"name"  : "ä"
	}, {	
		"chars"  : "å",
		"name"  : "å"
	}, {	
		"chars"  : "æ",
		"name"  : "æ"
	}, {	
		"chars"  : "ç",
		"name"  : "ç"
	}, {	
		"chars"  : "é",
		"name"  : "é"
	}, {	
		"chars"  : "è",
		"name"  : "è"
	}, {	
		"chars"  : "ê",
		"name"  : "ê"
	}, {	
		"chars"  : "ë",
		"name"  : "ë"
	}, {	
		"chars"  : "ë",
		"name"  : "ë"
	}, {	
		"chars"  : "ì",
		"name"  : "ì"
	}, {	
		"chars"  : "í",
		"name"  : "í"
	}, {	
		"chars"  : "î",
		"name"  : "î"
	}, {	
		"chars"  : "ï",
		"name"  : "ï"
	}, {	
		"chars"  : "ð",
		"name"  : "ð"
	}, {	
		"chars"  : "ð",
		"name"  : "ð"
	}, {	
		"chars"  : "ñ",
		"name"  : "ñ"
	}, {	
		"chars"  : "ò",
		"name"  : "ò"
	}, {	
		"chars"  : "ó",
		"name"  : "ó"
	}, {	
		"chars"  : "ô",
		"name"  : "ô"
	}, {	
		"chars"  : "õ",
		"name"  : "õ"
	}, {	
		"chars"  : "ö",
		"name"  : "ö"
	}, {	
		"chars"  : "÷",
		"name"  : "÷"
	}, {	
		"chars"  : "ø",
		"name"  : "ø"
	}, {	
		"chars"  : "ù",
		"name"  : "ù"
	}, {	
		"chars"  : "ú",
		"name"  : "ú"
	}, {	
		"chars"  : "û",
		"name"  : "û"
	}, {	
		"chars"  : "ü",
		"name"  : "ü"
	}, {	
		"chars"  : "ý",
		"name"  : "ý"
	}, {	
		"chars"  : "þ",
		"name"  : "þ"
	}, {	
		"chars"  : "ÿ",
		"name"  : "ÿ"
	}, {	
		"chars"  : "\u0100",
		"name"  : "\u0100"
	}, {	
		"chars"  : "\u0101",
		"name"  : "\u0101"
	}, {	
		"chars"  : "\u0102",
		"name"  : "\u0102"
	}, {	
		"chars"  : "\u0104",
		"name"  : "\u0104"
	}, {	
		"chars"  : "\u0105",
		"name"  : "\u0105"
	}, {	
		"chars"  : "\u0106",
		"name"  : "\u0106"
	}, {	
		"chars"  : "\u0107",
		"name"  : "\u0107"
	}, {	
		"chars"  : "\u0108",
		"name"  : "\u0108"
	}, {	
		"chars"  : "\u0109",
		"name"  : "\u0109"
	}, {	
		"chars"  : "\u010A",
		"name"  : "\u010A"
	}, {	
		"chars"  : "\u010B",
		"name"  : "\u010B"
	}, {	
		"chars"  : "\u010C",
		"name"  : "\u010C"
	}, {	
		"chars"  : "\u010D",
		"name"  : "\u010D"
	}, {	
		"chars"  : "\u010E",
		"name"  : "\u010E"
	}, {	
		"chars"  : "\u010F",
		"name"  : "\u010F"
	}, {	
		"chars"  : "\u0111",
		"name"  : "\u0111"
	}, {	
		"chars"  : "\u0112",
		"name"  : "\u0112"
	}, {	
		"chars"  : "\u0113",
		"name"  : "\u0113"
	}, {	
		"chars"  : "\u0114",
		"name"  : "\u0114"
	}, {	
		"chars"  : "\u0115",
		"name"  : "\u0115"
	}, {	
		"chars"  : "\u0116",
		"name"  : "\u0116"
	}, {	
		"chars"  : "\u0117",
		"name"  : "\u0117"
	}, {	
		"chars"  : "\u0118",
		"name"  : "\u0118"
	}, {	
		"chars"  : "\u0119",
		"name"  : "\u0119"
	}, {	
		"chars"  : "\u011A",
		"name"  : "\u011A"
	}, {	
		"chars"  : "\u011B",
		"name"  : "\u011B"
	}, {	
		"chars"  : "\u011C",
		"name"  : "\u011C"
	}, {	
		"chars"  : "\u011D",
		"name"  : "\u011D"
	}, {	
		"chars"  : "\u011E",
		"name"  : "\u011E"
	}, {	
		"chars"  : "\u011F",
		"name"  : "\u011F"
	}, {	
		"chars"  : "\u0120",
		"name"  : "\u0120"
	}, {	
		"chars"  : "\u0121",
		"name"  : "\u0121"
	}, {	
		"chars"  : "\u0122",
		"name"  : "\u0122"
	}, {	
		"chars"  : "\u0123",
		"name"  : "\u0123"
	}, {	
		"chars"  : "\u0124",
		"name"  : "\u0124"
	}, {	
		"chars"  : "\u0125",
		"name"  : "\u0125"
	}, {	
		"chars"  : "\u0126",
		"name"  : "\u0126"
	}, {	
		"chars"  : "\u0127",
		"name"  : "\u0127"
	}, {	
		"chars"  : "\u0128",
		"name"  : "\u0128"
	}, {	
		"chars"  : "\u0129",
		"name"  : "\u0129"
	}, {	
		"chars"  : "\u012A",
		"name"  : "\u012A"
	}, {	
		"chars"  : "\u012B",
		"name"  : "\u012B"
	}, {	
		"chars"  : "\u012C",
		"name"  : "\u012C"
	}, {	
		"chars"  : "\u012D",
		"name"  : "\u012D"
	}, {	
		"chars"  : "\u012E",
		"name"  : "\u012E"
	}, {	
		"chars"  : "\u012F",
		"name"  : "\u012F"
	}, {	
		"chars"  : "\u0130",
		"name"  : "\u0130"
	}, {	
		"chars"  : "\u0131",
		"name"  : "\u0131"
	}, {	
		"chars"  : "\u0132",
		"name"  : "\u0132"
	}, {	
		"chars"  : "\u0133",
		"name"  : "\u0133"
	}, {	
		"chars"  : "\u0134",
		"name"  : "\u0134"
	}, {	
		"chars"  : "\u0135",
		"name"  : "\u0135"
	}, {	
		"chars"  : "\u0136",
		"name"  : "\u0136"
	}, {	
		"chars"  : "\u0137",
		"name"  : "\u0137"
	}, {	
		"chars"  : "\u0138",
		"name"  : "\u0138"
	}, {	
		"chars"  : "\u0139",
		"name"  : "\u0139"
	}, {	
		"chars"  : "\u013A",
		"name"  : "\u013A"
	}, {	
		"chars"  : "\u013B",
		"name"  : "\u013B"
	}, {	
		"chars"  : "\u013C",
		"name"  : "\u013C"
	}, {	
		"chars"  : "\u013D",
		"name"  : "\u013D"
	}, {	
		"chars"  : "\u013E",
		"name"  : "\u013E"
	}, {	
		"chars"  : "\u013F",
		"name"  : "\u013F"
	}, {	
		"chars"  : "\u0140",
		"name"  : "\u0140"
	}, {	
		"chars"  : "\u0141",
		"name"  : "\u0141"
	}, {	
		"chars"  : "\u0142",
		"name"  : "\u0142"
	}, {	
		"chars"  : "\u0143",
		"name"  : "\u0143"
	}, {	
		"chars"  : "\u0144",
		"name"  : "\u0144"
	}, {	
		"chars"  : "\u0145",
		"name"  : "\u0145"
	}, {	
		"chars"  : "\u0146",
		"name"  : "\u0146"
	}, {	
		"chars"  : "\u0147",
		"name"  : "\u0147"
	}, {	
		"chars"  : "\u0148",
		"name"  : "\u0148"
	}, {	
		"chars"  : "\u0149",
		"name"  : "\u0149"
	}, {	
		"chars"  : "\u014A",
		"name"  : "\u014A"
	}, {	
		"chars"  : "\u014B",
		"name"  : "\u014B"
	}, {	
		"chars"  : "\u014C",
		"name"  : "\u014C"
	}, {	
		"chars"  : "\u014D",
		"name"  : "\u014D"
	}, {	
		"chars"  : "\u014E",
		"name"  : "\u014E"
	}, {	
		"chars"  : "\u014F",
		"name"  : "\u014F"
	}, {	
		"chars"  : "\u0150",
		"name"  : "\u0150"
	}, {	
		"chars"  : "\u0151",
		"name"  : "\u0151"
	}, {	
		"chars"  : "Œ",
		"name"  : "Œ"
	}, {	
		"chars"  : "œ",
		"name"  : "œ"
	}, {	
		"chars"  : "\u0154",
		"name"  : "\u0154"
	}, {	
		"chars"  : "\u0155",
		"name"  : "\u0155"
	}, {	
		"chars"  : "\u0156",
		"name"  : "\u0156"
	}, {	
		"chars"  : "\u0157",
		"name"  : "\u0157"
	}, {	
		"chars"  : "\u0158",
		"name"  : "\u0158"
	}, {	
		"chars"  : "\u0159",
		"name"  : "\u0159"
	}, {	
		"chars"  : "\u015A",
		"name"  : "\u015A"
	}, {	
		"chars"  : "\u015B",
		"name"  : "\u015B"
	}, {	
		"chars"  : "\u015C",
		"name"  : "\u015C"
	}, {	
		"chars"  : "\u015D",
		"name"  : "\u015D"
	}, {	
		"chars"  : "\u015E",
		"name"  : "\u015E"
	}, {	
		"chars"  : "\u015F",
		"name"  : "\u015F"
	}, {	
		"chars"  : "Š",
		"name"  : "Š"
	}, {	
		"chars"  : "š",
		"name"  : "š"
	}, {	
		"chars"  : "\u0162",
		"name"  : "\u0162"
	}, {	
		"chars"  : "\u0163",
		"name"  : "\u0163"
	}, {	
		"chars"  : "\u0164",
		"name"  : "\u0164"
	}, {	
		"chars"  : "\u0165",
		"name"  : "\u0165"
	}, {	
		"chars"  : "\u0166",
		"name"  : "\u0166"
	}, {	
		"chars"  : "\u0167",
		"name"  : "\u0167"
	}, {	
		"chars"  : "\u0168",
		"name"  : "\u0168"
	}, {	
		"chars"  : "\u0169",
		"name"  : "\u0169"
	}, {	
		"chars"  : "\u016A",
		"name"  : "\u016A"
	}, {	
		"chars"  : "\u016B",
		"name"  : "\u016B"
	}, {	
		"chars"  : "\u016C",
		"name"  : "\u016C"
	}, {	
		"chars"  : "\u016D",
		"name"  : "\u016D"
	}, {	
		"chars"  : "\u016E",
		"name"  : "\u016E"
	}, {	
		"chars"  : "\u016F",
		"name"  : "\u016F"
	}, {	
		"chars"  : "\u0170",
		"name"  : "\u0170"
	}, {	
		"chars"  : "\u0171",
		"name"  : "\u0171"
	}, {	
		"chars"  : "\u0172",
		"name"  : "\u0172"
	}, {	
		"chars"  : "\u0173",
		"name"  : "\u0173"
	}, {	
		"chars"  : "\u0174",
		"name"  : "\u0174"
	}, {	
		"chars"  : "\u0175",
		"name"  : "\u0175"
	}, {	
		"chars"  : "\u0176",
		"name"  : "\u0176"
	}, {	
		"chars"  : "\u0177",
		"name"  : "\u0177"
	}, {	
		"chars"  : "Ÿ",
		"name"  : "Ÿ"
	}, {	
		"chars"  : "\u0179",
		"name"  : "\u0179"
	}, {	
		"chars"  : "\u017A",
		"name"  : "\u017A"
	}, {	
		"chars"  : "\u017B",
		"name"  : "\u017B"
	}, {	
		"chars"  : "\u017C",
		"name"  : "\u017C"
	}, {	
		"chars"  : "Ž",
		"name"  : "Ž"
	}, {	
		"chars"  : "ž",
		"name"  : "ž"
	}, {	
		"chars"  : "\u017F",
		"name"  : "\u017F"
	}, {	
		"chars"  : "\u018F",
		"name"  : "\u018F"
	}, {	
		"chars"  : "ƒ",
		"name"  : "ƒ"
	}, {	
		"chars"  : "\u01A0",
		"name"  : "\u01A0"
	}, {	
		"chars"  : "\u01A1",
		"name"  : "\u01A1"
	}, {	
		"chars"  : "\u01AF",
		"name"  : "\u01AF"
	}, {	
		"chars"  : "\u01B0",
		"name"  : "\u01B0"
	}, {	
		"chars"  : "\u01CD",
		"name"  : "\u01CD"
	}, {	
		"chars"  : "\u01CE",
		"name"  : "\u01CE"
	}, {	
		"chars"  : "\u01CF",
		"name"  : "\u01CF"
	}, {	
		"chars"  : "\u01D0",
		"name"  : "\u01D0"
	}, {	
		"chars"  : "\u01D1",
		"name"  : "\u01D1"
	}, {	
		"chars"  : "\u01D2",
		"name"  : "\u01D2"
	}, {	
		"chars"  : "\u01D3",
		"name"  : "\u01D3"
	}, {	
		"chars"  : "\u01D4",
		"name"  : "\u01D4"
	}, {	
		"chars"  : "\u01D5",
		"name"  : "\u01D5"
	}, {	
		"chars"  : "\u01D6",
		"name"  : "\u01D6"
	}, {	
		"chars"  : "\u01D7",
		"name"  : "\u01D7"
	}, {	
		"chars"  : "\u01D8",
		"name"  : "\u01D8"
	}, {	
		"chars"  : "\u01D9",
		"name"  : "\u01D9"
	}, {	
		"chars"  : "\u01DA",
		"name"  : "\u01DA"
	}, {	
		"chars"  : "\u01DB",
		"name"  : "\u01DB"
	}, {	
		"chars"  : "\u01DC",
		"name"  : "\u01DC"
	}, {	
		"chars"  : "\u01FA",
		"name"  : "\u01FA"
	}, {	
		"chars"  : "\u01FB",
		"name"  : "\u01FB"
	}, {	
		"chars"  : "\u01FC",
		"name"  : "\u01FC"
	}, {	
		"chars"  : "\u01FD",
		"name"  : "\u01FD"
	}, {	
		"chars"  : "\u01FE",
		"name"  : "\u01FE"
	}, {	
		"chars"  : "\u01FF",
		"name"  : "\u01FF"
	}, {	
		"chars"  : "\u0259",
		"name"  : "\u0259"
	}, {	
		"chars"  : "\u0386",
		"name"  : "\u0386"
	}, {	
		"chars"  : "\u0388",
		"name"  : "\u0388"
	}, {	
		"chars"  : "\u0389",
		"name"  : "\u0389"
	}, {	
		"chars"  : "\u038A",
		"name"  : "\u038A"
	}, {	
		"chars"  : "\u038C",
		"name"  : "\u038C"
	}, {	
		"chars"  : "\u038E",
		"name"  : "\u038E"
	}, {	
		"chars"  : "\u038F",
		"name"  : "\u038F"
	}, {	
		"chars"  : "\u0390",
		"name"  : "\u0390"
	}, {	
		"chars"  : "\u0391",
		"name"  : "\u0391"
	}, {	
		"chars"  : "\u0392",
		"name"  : "\u0392"
	}, {	
		"chars"  : "\u0393",
		"name"  : "\u0393"
	}, {	
		"chars"  : "\u0394",
		"name"  : "\u0394"
	}, {	
		"chars"  : "\u0395",
		"name"  : "\u0395"
	}, {	
		"chars"  : "\u0396",
		"name"  : "\u0396"
	}, {	
		"chars"  : "\u0397",
		"name"  : "\u0397"
	}, {	
		"chars"  : "\u0398",
		"name"  : "\u0398"
	}, {	
		"chars"  : "\u0399",
		"name"  : "\u0399"
	}, {	
		"chars"  : "\u039A",
		"name"  : "\u039A"
	}, {	
		"chars"  : "\u039E",
		"name"  : "\u039E"
	}, {	
		"chars"  : "\u03A0",
		"name"  : "\u03A0"
	}, {	
		"chars"  : "\u03A3",
		"name"  : "\u03A3"
	}, {	
		"chars"  : "\u03A6",
		"name"  : "\u03A6"
	}, {	
		"chars"  : "\u03A8",
		"name"  : "\u03A8"
	}, {	
		"chars"  : "\u03A9",
		"name"  : "\u03A9"
	}, {	
		"chars"  : "\u03AA",
		"name"  : "\u03AA"
	}, {	
		"chars"  : "\u03AB",
		"name"  : "\u03AB"
	}, {	
		"chars"  : "\u03AC",
		"name"  : "\u03AC"
	}, {	
		"chars"  : "\u03AD",
		"name"  : "\u03AD"
	}, {	
		"chars"  : "\u03AE",
		"name"  : "\u03AE"
	}, {	
		"chars"  : "\u03AF",
		"name"  : "\u03AF"
	}, {	
		"chars"  : "\u03B0",
		"name"  : "\u03B0"
	}, {	
		"chars"  : "\u03B1",
		"name"  : "\u03B1"
	}, {	
		"chars"  : "\u03B2",
		"name"  : "\u03B2"
	}, {	
		"chars"  : "\u03B3",
		"name"  : "\u03B3"
	}, {	
		"chars"  : "\u03B4",
		"name"  : "\u03B4"
	}, {	
		"chars"  : "\u03B5",
		"name"  : "\u03B5"
	}, {	
		"chars"  : "\u03B6",
		"name"  : "\u03B6"
	}, {	
		"chars"  : "\u03B7",
		"name"  : "\u03B7"
	}, {	
		"chars"  : "\u03B8",
		"name"  : "\u03B8"
	}, {	
		"chars"  : "\u03B9",
		"name"  : "\u03B9"
	}, {	
		"chars"  : "\u03BA",
		"name"  : "\u03BA"
	}, {	
		"chars"  : "\u03BB",
		"name"  : "\u03BB"
	}, {	
		"chars"  : "\u03BD",
		"name"  : "\u03BD"
	}, {	
		"chars"  : "\u03BE",
		"name"  : "\u03BE"
	}, {	
		"chars"  : "\u03BF",
		"name"  : "\u03BF"
	}, {	
		"chars"  : "\u03C0",
		"name"  : "\u03C0"
	}, {	
		"chars"  : "\u03C2",
		"name"  : "\u03C2"
	}, {	
		"chars"  : "\u03C3",
		"name"  : "\u03C3"
	}, {	
		"chars"  : "\u03C4",
		"name"  : "\u03C4"
	}, {	
		"chars"  : "\u03C5",
		"name"  : "\u03C5"
	}, {	
		"chars"  : "\u03C6",
		"name"  : "\u03C6"
	}, {	
		"chars"  : "\u03C7",
		"name"  : "\u03C7"
	}, {	
		"chars"  : "\u03C8",
		"name"  : "\u03C8"
	}, {	
		"chars"  : "\u03C9",
		"name"  : "\u03C9"
	}, {	
		"chars"  : "\u03CA",
		"name"  : "\u03CA"
	}, {	
		"chars"  : "\u03CB",
		"name"  : "\u03CB"
	}, {	
		"chars"  : "\u03CC",
		"name"  : "\u03CC"
	}, {	
		"chars"  : "\u03CD",
		"name"  : "\u03CD"
	}, {	
		"chars"  : "\u03CE",
		"name"  : "\u03CE"
	}, {	
		"chars"  : "\u0401",
		"name"  : "\u0401"
	}, {	
		"chars"  : "\u0402",
		"name"  : "\u0402"
	}, {	
		"chars"  : "\u0403",
		"name"  : "\u0403"
	}, {	
		"chars"  : "\u0404",
		"name"  : "\u0404"
	}, {	
		"chars"  : "\u0405",
		"name"  : "\u0405"
	}, {	
		"chars"  : "\u0406",
		"name"  : "\u0406"
	}, {	
		"chars"  : "\u0407",
		"name"  : "\u0407"
	}, {	
		"chars"  : "\u0408",
		"name"  : "\u0408"
	}, {	
		"chars"  : "\u0409",
		"name"  : "\u0409"
	}, {	
		"chars"  : "\u040A",
		"name"  : "\u040A"
	}, {	
		"chars"  : "\u040B",
		"name"  : "\u040B"
	}, {	
		"chars"  : "\u040C",
		"name"  : "\u040C"
	}, {	
		"chars"  : "\u040E",
		"name"  : "\u040E"
	}, {	
		"chars"  : "\u040F",
		"name"  : "\u040F"
	}, {	
		"chars"  : "\u0410",
		"name"  : "\u0410"
	}, {	
		"chars"  : "\u0411",
		"name"  : "\u0411"
	}, {	
		"chars"  : "\u0412",
		"name"  : "\u0412"
	}, {	
		"chars"  : "\u0413",
		"name"  : "\u0413"
	}, {	
		"chars"  : "\u0414",
		"name"  : "\u0414"
	}, {	
		"chars"  : "\u0415",
		"name"  : "\u0415"
	}, {	
		"chars"  : "\u0416",
		"name"  : "\u0416"
	}, {	
		"chars"  : "\u0419",
		"name"  : "\u0419"
	}, {	
		"chars"  : "\u041B",
		"name"  : "\u041B"
	}, {	
		"chars"  : "\u0426",
		"name"  : "\u0426"
	}, {	
		"chars"  : "\u0427",
		"name"  : "\u0427"
	}, {	
		"chars"  : "\u0428",
		"name"  : "\u0428"
	}, {	
		"chars"  : "\u0429",
		"name"  : "\u0429"
	}, {	
		"chars"  : "\u042A",
		"name"  : "\u042A"
	}, {	
		"chars"  : "\u042B",
		"name"  : "\u042B"
	}, {	
		"chars"  : "\u042C",
		"name"  : "\u042C"
	}, {	
		"chars"  : "\u042D",
		"name"  : "\u042D"
	}, {	
		"chars"  : "\u042E",
		"name"  : "\u042E"
	}, {	
		"chars"  : "\u042F",
		"name"  : "\u042F"
	}, {	
		"chars"  : "\u0430",
		"name"  : "\u0430"
	}, {	
		"chars"  : "\u0431",
		"name"  : "\u0431"
	}, {	
		"chars"  : "\u0432",
		"name"  : "\u0432"
	}, {	
		"chars"  : "\u0433",
		"name"  : "\u0433"
	}, {	
		"chars"  : "\u0434",
		"name"  : "\u0434"
	}, {	
		"chars"  : "\u0438",
		"name"  : "\u0438"
	}, {	
		"chars"  : "\u0439",
		"name"  : "\u0439"
	}, {	
		"chars"  : "\u044C",
		"name"  : "\u044C"
	}, {	
		"chars"  : "\u044E",
		"name"  : "\u044E"
	}, {	
		"chars"  : "\u044D",
		"name"  : "\u044D"
	}, {	
		"chars"  : "\u044F",
		"name"  : "\u044F"
	}, {	
		"chars"  : "\u0452",
		"name"  : "\u0452"
	}, {	
		"chars"  : "\u0459",
		"name"  : "\u0459"
	}, {	
		"chars"  : "\u045A",
		"name"  : "\u045A"
	}, {	
		"chars"  : "\u045B",
		"name"  : "\u045B"
	}, {	
		"chars"  : "\u045C",
		"name"  : "\u045C"
	}, {	
		"chars"  : "\u044A",
		"name"  : "\u044A"
	}, {	
		"chars"  : "\u044B",
		"name"  : "\u044B"
	}, {	
		"chars"  : "\u0490",
		"name"  : "\u0490"
	}, {	
		"chars"  : "\u0491",
		"name"  : "\u0491"
	}, {	
		"chars"  : "\u0492",
		"name"  : "\u0492"
	}, {	
		"chars"  : "\u0493",
		"name"  : "\u0493"
	}, {	
		"chars"  : "\u0496",
		"name"  : "\u0496"
	}, {	
		"chars"  : "\u0497",
		"name"  : "\u0497"
	}, {	
		"chars"  : "\u049A",
		"name"  : "\u049A"
	}, {	
		"chars"  : "\u049B",
		"name"  : "\u049B"
	}, {	
		"chars"  : "\u049C",
		"name"  : "\u049C"
	}, {	
		"chars"  : "\u049D",
		"name"  : "\u049D"
	}, {	
		"chars"  : "\u04A2",
		"name"  : "\u04A2"
	}, {	
		"chars"  : "\u04A3",
		"name"  : "\u04A3"
	}, {	
		"chars"  : "\u04AF",
		"name"  : "\u04AF"
	}, {	
		"chars"  : "\u04B0",
		"name"  : "\u04B0"
	}, {	
		"chars"  : "\u04B2",
		"name"  : "\u04B2"
	}, {	
		"chars"  : "\u04B3",
		"name"  : "\u04B3"
	}, {	
		"chars"  : "\u04B8",
		"name"  : "\u04B8"
	}, {	
		"chars"  : "\u04B9",
		"name"  : "\u04B9"
	}, {	
		"chars"  : "\u04BA",
		"name"  : "\u04BA"
	}, {	
		"chars"  : "\u04BB",
		"name"  : "\u04BB"
	}, {	
		"chars"  : "\u04D8",
		"name"  : "\u04D8"
	}, {	
		"chars"  : "\u04D9",
		"name"  : "\u04D9"
	}, {	
		"chars"  : "\u04EB",
		"name"  : "\u04EB"
	}, {	
		"chars"  : "\u04E9",
		"name"  : "\u04E9"
	}, {	
		"chars"  : "\u05E9",
		"name"  : "\u05E9"
	}, {	
		"chars"  : "\u05E8",
		"name"  : "\u05E8"
	}, {	
		"chars"  : "\u05E7",
		"name"  : "\u05E7"
	}, {	
		"chars"  : "\u05E6",
		"name"  : "\u05E6"
	}, {	
		"chars"  : "\u05E5",
		"name"  : "\u05E5"
	}, {	
		"chars"  : "\u05E4",
		"name"  : "\u05E4"
	}, {	
		"chars"  : "\u05E3",
		"name"  : "\u05E3"
	}, {	
		"chars"  : "\u05E2",
		"name"  : "\u05E2"
	}, {	
		"chars"  : "\u05E1",
		"name"  : "\u05E1"
	}, {	
		"chars"  : "\u05E0",
		"name"  : "\u05E0"
	}, {	
		"chars"  : "\u05DF",
		"name"  : "\u05DF"
	}, {	
		"chars"  : "\u05DE",
		"name"  : "\u05DE"
	}, {	
		"chars"  : "\u05DD",
		"name"  : "\u05DD"
	}, {	
		"chars"  : "\u05DC",
		"name"  : "\u05DC"
	}, {	
		"chars"  : "\u05DB",
		"name"  : "\u05DB"
	}, {	
		"chars"  : "\u05DA",
		"name"  : "\u05DA"
	}, {	
		"chars"  : "\u05D9",
		"name"  : "\u05D9"
	}, {	
		"chars"  : "\u05D8",
		"name"  : "\u05D8"
	}, {	
		"chars"  : "\u05D7",
		"name"  : "\u05D7"
	}, {	
		"chars"  : "\u05D6",
		"name"  : "\u05D6"
	}, {	
		"chars"  : "\u05D5",
		"name"  : "\u05D5"
	}, {	
		"chars"  : "\u05D4",
		"name"  : "\u05D4"
	}, {	
		"chars"  : "\u05D3",
		"name"  : "\u05D3"
	}, {	
		"chars"  : "\u05D2",
		"name"  : "\u05D2"
	}, {	
		"chars"  : "\u05D1",
		"name"  : "\u05D1"
	}, {	
		"chars"  : "\u05D0",
		"name"  : "\u05D0"
	}, {	
		"chars"  : "\u0644",
		"name"  : "\u0644"
	}, {	
		"chars"  : "\u0632",
		"name"  : "\u0632"
	}, {	
		"chars"  : "\u0633",
		"name"  : "\u0633"
	}, {	
		"chars"  : "\u0634",
		"name"  : "\u0634"
	}, {	
		"chars"  : "\u0637",
		"name"  : "\u0637"
	}, {	
		"chars"  : "\u0638",
		"name"  : "\u0638"
	}, {	
		"chars"  : "\u0625",
		"name"  : "\u0625"
	}, {	
		"chars"  : "\u0663",
		"name"  : "\u0663"
	}, {	
		"chars"  : "\u0671",
		"name"  : "\u0671"
	}, {	
		"chars"  : "\u06F5",
		"name"  : "\u06F5"
	}, {	
		"chars"  : "\u06F7",
		"name"  : "\u06F7"
	}, {	
		"chars"  : "\u06F8",
		"name"  : "\u06F8"
	}, {	
		"chars"  : "\u06F3",
		"name"  : "\u06F3"
	}, {	
		"chars"  : "†",
		"name"  : "†"
	}, {	
		"chars"  : "‡",
		"name"  : "‡"
	}, {	
		"chars"  : "•",
		"name"  : "•"
	}, {	
		"chars"  : "‰",
		"name"  : "‰"
	}, {	
		"chars"  : "‹",
		"name"  : "‹"
	}, {	
		"chars"  : "›",
		"name"  : "›"
	}, {	
		"chars"  : "\u203C",
		"name"  : "\u203C"
	}, {	
		"chars"  : "\u206A",
		"name"  : "\u206A"
	}, {	
		"chars"  : "\u206B",
		"name"  : "\u206B"
	}, {	
		"chars"  : "\u20A3",
		"name"  : "\u20A3"
	}, {	
		"chars"  : "\u20A7",
		"name"  : "\u20A7"
	}, {	
		"chars"  : "\u20A4",
		"name"  : "\u20A4"
	}, {	
		"chars"  : "\u20AA",
		"name"  : "\u20AA"
	}, {	
		"chars"  : "\u20AB",
		"name"  : "\u20AB"
	}, {	
		"chars"  : "\u2113",
		"name"  : "\u2113"
	}, {	
		"chars"  : "\u2116",
		"name"  : "\u2116"
	}, {	
		"chars"  : "™",
		"name"  : "™"
	}, {	
		"chars"  : "\u2126",
		"name"  : "\u2126"
	}, {	
		"chars"  : "\u212E",
		"name"  : "\u212E"
	}, {	
		"chars"  : "\u2105",
		"name"  : "\u2105"
	}, {	
		"chars"  : "€",
		"name"  : "€"
	}, {	
		"chars"  : "\u2153",
		"name"  : "\u2153"
	}, {	
		"chars"  : "\u2154",
		"name"  : "\u2154"
	}, {	
		"chars"  : "\u215B",
		"name"  : "\u215B"
	}, {	
		"chars"  : "\u215C",
		"name"  : "\u215C"
	}, {	
		"chars"  : "\u215D",
		"name"  : "\u215D"
	}, {	
		"chars"  : "\u215E",
		"name"  : "\u215E"
	}, {	
		"chars"  : "\u2202",
		"name"  : "\u2202"
	}, {	
		"chars"  : "\u2206",
		"name"  : "\u2206"
	}, {	
		"chars"  : "\u220F",
		"name"  : "\u220F"
	}, {	
		"chars"  : "\u2211",
		"name"  : "\u2211"
	}, {	
		"chars"  : "\u221A",
		"name"  : "\u221A"
	}, {	
		"chars"  : "\u221E",
		"name"  : "\u221E"
	}, {	
		"chars"  : "\u221F",
		"name"  : "\u221F"
	}, {	
		"chars"  : "\u2229",
		"name"  : "\u2229"
	}, {	
		"chars"  : "\u222B",
		"name"  : "\u222B"
	}, {	
		"chars"  : "\u2248",
		"name"  : "\u2248"
	}, {	
		"chars"  : "\u2260",
		"name"  : "\u2260"
	}, {	
		"chars"  : "\u2261",
		"name"  : "\u2261"
	}, {	
		"chars"  : "\u2264",
		"name"  : "\u2264"
	}, {	
		"chars"  : "\u2265",
		"name"  : "\u2265"
	}, {	
		"chars"  : "\u2302",
		"name"  : "\u2302"
	}, {	
		"chars"  : "\u250C",
		"name"  : "\u250C"
	}, {	
		"chars"  : "\u2510",
		"name"  : "\u2510"
	}, {	
		"chars"  : "\uFB38",
		"name"  : "\uFB38"
	}, {	
		"chars"  : "\uFB36",
		"name"  : "\uFB36"
	}, {	
		"chars"  : "\uFB34",
		"name"  : "\uFB34"
	}, {	
		"chars"  : "\uFB33",
		"name"  : "\uFB33"
	}, {	
		"chars"  : "\uFB32",
		"name"  : "\uFB32"
	}, {	
		"chars"  : "\uFB31",
		"name"  : "\uFB31"
	}, {	
		"chars"  : "\uFB30",
		"name"  : "\uFB30"
	}, {	
		"chars"  : "\uFB2F",
		"name"  : "\uFB2F"
	}, {	
		"chars"  : "\uFB2E",
		"name"  : "\uFB2E"
	}, {	
		"chars"  : "\uFB2B",
		"name"  : "\uFB2B"
	}, {	
		"chars"  : "\uFB2C",
		"name"  : "\uFB2C"
	}, {	
		"chars"  : "\uFE86",
		"name"  : "\uFE86"
	}, {	
		"chars"  : "\uFEBE",
		"name"  : "\uFEBE"
	}, {	
		"chars"  : "\uFB48",
		"name"  : "\uFB48"
	}, {	
		"chars"  : "\uFB46",
		"name"  : "\uFB46"
	}, {	
		"chars"  : "\uFEA2",
		"name"  : "\uFEA2"
	}, {	
		"chars"  : "\uFB3E",
		"name"  : "\uFB3E"
	}, {	
		"chars"  : "\uFB44",
		"name"  : "\uFB44"
	}, {
		"chars" : "(¯`·._.·[",
		"name" : "(¯`·._.·["
	}, {
		"chars" : "]·._.·´¯)",
		"name" : "]·._.·´¯)"
	}, {
		"chars" : "¨°o.O",
		"name" : "¨°o.O"
	}, {
		"chars" : "O.o°¨",
		"name" : "O.o°¨"
	}, {
		"chars" : "×÷·.·´¯`·)»",
		"name" : "×÷·.·´¯`·)»"
	}, {
		"chars" : "«(·´¯`·.·÷×",
		"name" : "«(·´¯`·.·÷×"
	}, {
		"chars" : "· ··^v´¯`×)",
		"name" : "· ··^v´¯`×)"
	}, {
		"chars" : "(×´¯`v^·· ·",
		"name" : "(×´¯`v^·· ·"
	}, {
		"chars" : ",.-~*'¨¯¨'*·~-.¸-(_",
		"name" : ",.-~*'¨¯¨'*·~-.¸-(_"
	}, {
		"chars" : "_)-,.-~*'¨¯¨'*·~-.¸",
		"name" : "_)-,.-~*'¨¯¨'*·~-.¸"
	}, {
		"chars" : "- - --^[",
		"name" : "- - --^["
	}, {
		"chars" : "]^-- - -",
		"name" : "]^-- - -"
	}, {
		"chars" : "•·.·´¯`·.·•",
		"name" : "•·.·´¯`·.·•"
	}, {
		"chars" : "`·.¸¸.·´´¯`··._.·",
		"name" : "`·.¸¸.·´´¯`··._.·"
	}, {
		"chars" : "(¯`·._)",
		"name" : "(¯`·._)"
	}, {
		"chars" : "(_.·`¯)",
		"name" : "(_.·`¯)"
	}, {
		"chars" : "¯¨'*·~-.¸¸,.-~*'",
		"name" : "¯¨'*·~-.¸¸,.-~*'"
	}, {
		"chars" : "Oº°‘¨",
		"name" : "Oº°‘¨"
	}, {
		"chars" : "¨‘°ºO",
		"name" : "¨‘°ºO"
	}, {
		"chars" : "×º°”˜`”°º×",
		"name" : "×º°”˜`”°º×"
	}, {
		"chars" : "×º°”˜`”°º×",
		"name" : "×º°”˜`”°º×"
	}, {
		"chars" : ".·´¯`·->",
		"name" : ".·´¯`·->"
	}, {
		"chars" : "<-·´¯`·.",
		"name" : "<-·´¯`·."
	}, {
		"chars" : "<º))))><.·´¯`·.",
		"name" : "<º))))><.·´¯`·."
	}, {
		"chars" : "¸.·´¯`·.¸><((((º>",
		"name" : "¸.·´¯`·.¸><((((º>"
	}, {
		"chars" : "- -¤--^]",
		"name" : "- -¤--^]"
	}, {
		"chars" : "[^--¤- -",
		"name" : "[^--¤- -"
	}, {
		"chars" : "~²º¹²~",
		"name" : "~²º¹²~"
	}, {
		"chars" : "~²º¹³~",
		"name" : "~²º¹³~"
	}, {
		"chars" : "._|.<(+_+)>.|_.",
		"name" : "._|.<(+_+)>.|_."
	}, {
		"chars" : "..|..<(+_",
		"name" : "..|..<(+_"
	}, {
		"chars" : "_+>..|..",
		"name" : "_+>..|.."
	}, {
		"chars" : "-·=»‡«=·-",
		"name" : "-·=»‡«=·-"
	}, {
		"chars" : "•°o.O",
		"name" : "•°o.O"
	}, {
		"chars" : "O.o°•",
		"name" : "O.o°•"
	}, {
		"chars" : "––––•(-•",
		"name" : "––––•(-•"
	}, {
		"chars" : "•-)•––––",
		"name" : "•-)•––––"
	}, {
		"chars" : "(¯`•¸·´¯)",
		"name" : "(¯`•¸·´¯)"
	}, {
		"chars" : "(¯`·¸•´¯)",
		"name" : "(¯`·¸•´¯)"
	}, {
		"chars" : "··¤(`×[¤",
		"name" : "··¤(`×[¤"
	}, {
		"chars" : "¤]×´)¤··",
		"name" : "¤]×´)¤··"
	}, {
		"chars" : "—(•·÷[",
		"name" : "—(•·÷["
	}, {
		"chars" : "]÷·•)—",
		"name" : "]÷·•)—"
	}, {
		"chars" : "·ï¡÷¡ï·",
		"name" : "·ï¡÷¡ï·"
	}, {
		"chars" : "·!¦[·",
		"name" : "·!¦[·"
	}, {
		"chars" : "·]¦!·",
		"name" : "·]¦!·"
	}, {
		"chars" : "°º¤ø,¸¸,ø¤º°`°º¤ø,¸",
		"name" : "°º¤ø,¸¸,ø¤º°`°º¤ø,¸"
	}, {
		"chars" : "»-(¯`v´¯)-»",
		"name" : "»-(¯`v´¯)-»"
	}, {
		"chars" : "°l||l°",
		"name" : "°l||l°"
	}, {
		"chars" : "•°¤*(¯`°(",
		"name" : "•°¤*(¯`°("
	}, {
		"chars" : ")°´¯)*¤°•",
		"name" : ")°´¯)*¤°•"
	}, {
		"chars" : "—¤÷(`[¤*",
		"name" : "—¤÷(`[¤*"
	}, {
		"chars" : "*¤]´)÷¤—",
		"name" : "*¤]´)÷¤—"
	}, {
		"chars" : "¸.´)(`·[",
		"name" : "¸.´)(`·["
	}, {
		"chars" : "]·´)(` .¸",
		"name" : "]·´)(` .¸"
	}, {
		"chars" : "·÷±‡±",
		"name" : "·÷±‡±"
	}, {
		"chars" : "±‡±÷",
		"name" : "±‡±÷"
    }, {
		"chars" : "+*¨^¨*+",
		"name" : "+*¨^¨*+"
	}, {
		"chars" : "Agan Juna",
		"name" : "Agan Juna"
	} ];

	// = Variables =======
	var lastActiveElement = document.activeElement;
	var openFlyoutCommand = undefined;

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
		html = '<li class="fbNubFlyoutTitlebar" style="display: table-cell;">';
		html += '<div class="titlebarLabel">';
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
						this.style.background = "#ebeef4";
						this.firstChild.style.color = "inherit";
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

		html = '<div style="max-height: 259px; padding-right: 17px; overflow-x: hidden; line-height: 1em;">';
		html += '<div style="padding: 5px; width: 175px; font-size: 15px;">';
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
						lastActiveElement.setSelectionRange(start
								+ chars.length, start + chars.length);
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
	html += '<a class="navLink" title="FB CHat Emoticon COdes">'; // var navLink
	html += '<span class="emoticon emoticon_smile" style="vertical-align: middle;"></span>';
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
	html += '<ul style="display: table; width: 100%; text-align: center;">';
	html += '</ul>';

	// Bodies
	html += '<div>'; // var bodyContainer
	html += '</div>';

	// Footer
	html += '<div class="_26y3">';
	html += '<a class="_8-c" href="http://www.agan-juna.blogspot.com" target="_blank">Kunjungi Blog ku, dan dapatkan Script lainnya</a>';
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
	picEmoTab.title.innerHTML = '<span class="emoticon emoticon_kiki"></span>';
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

	// Text emoticon tab
	var textEmoTab = createTab(titleContainer, bodyContainer);
	textEmoTab.title.innerHTML = '<span style="font-size: 21px;">\u263a</span>';
	textEmoTab.body.appendChild(createTabListBody(emoticons,
			function(emoticon) {
				if (emoticon.class !== undefined) { // Picture
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
b
