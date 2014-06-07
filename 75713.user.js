// ==UserScript==
// @name           randompics
// @namespace      randompics.user.js
// @description    searchs and displays random pics in google
// ==/UserScript==
<!-- Begin
//Random Personal Picture Finder script by Dave Mattson diddly.com
//Feel free to copy this code, it sucks though

var types = 25;
var cams = new Array(types);


cams[0] = "dcp0"; // Kodak
cams[1] = "dsc0"; // Nikon
cams[2] = "dscn"; // Nikon
cams[3] = "mvc-"; //Sony Mavica 1
cams[4] = "mvc0"; //Sony Mavica
cams[5] = "P101"; // Olympus?  First 3 are dates, work on this...
cams[6] = "P";    //PMDD where M is hex
cams[7] = "IMG_"; // Canon
cams[8] = "imag"; // RCA and Samsung
cams[9] = "1";     // Canon 1TH-TH##  thousands, hundreds
cams[10] = "dscf";// Fuji Finepix
cams[11] = "pdrm"; // Toshiba PDR
cams[12] = "IM00"; // HP Photosmart
cams[13] = "EX00"; // HP Photosmart timelapse?
cams[14] = "dc"; // Kodak dc-40,50,120 dc####(l|m|s)
cams[15] = "pict"; // Minolta Dimage pict####.jpg
cams[16] = "P00"; //Kodak DC290 p#######.jpg
cams[17] = ""; // Casio QV3000 mmdd####.jpg
cams[18] = ""; // Casio QV-7000: YYMDD###.JPG
cams[19] = "imgp"; // pentax optio S: imgp####.jpg
cams[20] = "pana"; // Panasonic video camera still PANA####.jpg
cams[21] = "1";     // Canon 1TH-TH##  thousands, hundreds, with _IMG tacked on
cams[22] = "HPIM"; // HP Photosmart HPIM####.jpg
cams[23] = "PCDV"; // Cheap camera pcdv####.jpg
cams[24] = "_MG_"; // Canon Raw conversion

//cams[16] = ""; //photobucket "## site:photobucket.com"


site="http://images.google.com/images?q=";

function getRandomIndex(max) {
 var randomNum = Math.random();
 randomNum = randomNum * max;
 randomNum = parseInt(randomNum);
 if(isNaN(randomNum)) randomNum = 0; // for Netscape
 return randomNum;
}


function fmt00000(x, width){
 count = 0;
if (Math.abs(parseInt(x, 10)) < 100000){

	if (Math.abs(parseInt(x, 10)) < 10000){
		if(Math.abs(parseInt(x, 10)) < 1000){
			if (Math.abs(parseInt(x, 10)) < 100){
				if (Math.abs(parseInt(x, 10)) < 10){
					if (width > 1) count++;
				}
				if (width > 2) count++;
			}
			if (width > 3) count++;
		}
		if (width > 4) count++;
	}
}
	for (var i = 0; i < count; i++) {
		x = "0" + x;
	}
	return x;
}

function combineMenus(frm, menu1, menu2) {
	//with (frm) {
	//for (var i = 0; i < document.menufrm.menu1.length; i++) {
	//	if (document.menufrm.menu1[i].checked) {
	//	//str = document.menufrm.menu1[i].value;
	//	break;
	//}
	//}
	//strfoo = fmt00000(strtemp);
	var range = 4000;
	var choice = getRandomIndex(types);
	if (choice > 0) range = 3;
	str = choice;
	str += cams[choice];

	strfoo = getRandomIndex(range);
	strfoo = fmt00000(strfoo, width);
	str += strfoo;
	
	url = site + str + ".jpg&num=20&btnG=Google+Search&as_epq=&as_oq=&as_eq=&imgsz=" + size+ "&as_filetype=jpg&imgc=&as_sitesearch=&imgsafe=off";
	parent.display.location.href = url;
   //}
}

function generateFileName() {
	var size = document.menufrm.imgsz.value;

	//choice = getRandomIndex(types);
	var range = 4000;
	var width = 4;
	var choice = getRandomIndex(types);
	//choice = 21;
	str = cams[choice];
	if (choice == 3) {
	range = 400; //Mavica doesn't have many pictures
	width = 3;
	}
	if (choice == 4) {
	range = 500; //Mavica doesn't have many pictures
	width = 4;
	}
	if (choice == 6) {
	range = 50; // PMDD
	width = 4;
	strmonth = getRandomIndex(13);
	if (strmonth == 10) strmonth = "a";
	if (strmonth == 11) strmonth = "b";
	if (strmonth == 12) strmonth = "c";
	strdate = getRandomIndex(31);
	strdate = fmt00000(strdate, 2);
	str += strmonth;
	str += strdate;
	}
	if (choice == 8) {
	range = 130; //Not a lot of RCA pics
	width = 4;
	}
	if (choice == 9) {
	range = 100; // 1TH-TH##
	width = 2;
	strthou = getRandomIndex(3);
	strthou = fmt00000(strthou, 2);
	str += strthou;
	str += "-";
	str += strthou;
	}
	if (choice == 11) {
	range = 600; //Not a lot of Toshiba pics
	width = 4;
	}
	if (choice == 12) {
	range = 850; //Not a lot of HP pics
	width = 4;
	}
	if (choice == 13) {
	range = 100; //Not a lot of HP pics
	width = 4;
	}

	if (choice == 15) {
	range = 600; 
	width = 4;
	}

	if (choice == 16) {
	range = 12000; 
	width = 5;
	}

	if (choice == 17) {
	range = 30; // PMDD
	width = 4;
	strmonth = getRandomIndex(13);
	strmonth = fmt00000(strmonth, 2);

	strdate = getRandomIndex(31);
	strdate = fmt00000(strdate, 2);
	str += strmonth;
	str += strdate;
	}

	if (choice == 18) {
	range = 50; // PMDD
	width = 3;
	stryear = getRandomIndex(3);
	stryear = fmt00000(stryear, 2);
	strmonth = getRandomIndex(13);
	if (strmonth == 10) strmonth = "a";
	if (strmonth == 11) strmonth = "b";
	if (strmonth == 12) strmonth = "c";
	strdate = getRandomIndex(31);
	strdate = fmt00000(strdate, 2);
	str += stryear;
	str += strmonth;
	str += strdate;	}

	if (choice == 19) {
	range = 2000; 
	width = 4;
	}

	if (choice == 20) {
	range = 200; 
	width = 4;
	}

	if (choice == 22) {
        range = 3700;
        width = 4;
        }
	if (choice == 23) {
        range = 300;
        width = 4;
        }



	strfoo = getRandomIndex(range);
	strfoo = fmt00000(strfoo, width);
	str += strfoo;

	if (choice == 14) {
	strsize = getRandomIndex(3);
	if (strsize == 0) strsize = "s";
	if (strsize == 1) strsize = "m";
	if (strsize == 2) strsize = "l";
	strnumber= getRandomIndex(190);
	strnumber= fmt00000(strnumber, 4);
	str = cams[choice];	
	str += strnumber;
	str += strsize;
	}

	if (choice == 21) {
	range = 100; // 1TH-TH##
	width = 2;
	strthou = getRandomIndex(90);
	strthou = fmt00000(strthou, 2);
	str = "1";
	str += strthou;
	str += "-";
	str += strthou;
	strfoo = getRandomIndex(range);
	strfoo = fmt00000(strfoo, width);
	str += strfoo;
	str += "_IMG";
	}


	
	url = site + str + ".jpg&num=20&btnG=Google+Search&as_epq=&as_oq=&as_eq=&imgsz=" + size + "&as_filetype=jpg&imgc=&as_sitesearch=&imgsafe=off";

	if (choice == 30) {
	strnumber= getRandomIndex(99);
	strnumber= fmt00000(strnumber, 2);
	str = cams[choice];	
	str += strnumber;
	url = site + str + "+site%3Apbase.com&hl=en&imgsz=" + size + "&imgsafe=off";
	}

	parent.display.location.href = url;
   //}
}

//  End -->
</script>
