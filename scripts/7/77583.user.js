// ==UserScript==
// @name          Ban Users
// @namespace     http://www.prachataiwebboard.com
// @description   Ban Topics posted by some idiot users on prachataiwebboard.com
// @include       http://www.prachataiboard.com/*
// @include       http://www.prachataiwebboard.com/*
// @include       http://www.prachataiboard.info/*
// ==/UserScript==
// https://addons.mozilla.org/en-US/firefox/addon/748

/* วิธีเพิ่มชื่อ
พิมพ์ชื่อที่จะแบน  ลงในเครื่องหมายคำพูดแล้วตามด้วยเครื่องหมาย,
เช่น 
"จำลองห้าขัน",

ถ้าจะไม่แบนชั่วคราว ให้ใส่เตรื่องหมาย // ข้างหน้า เช่น
//"จีรนุช",

หมายเหตุ ชื่อสุดท้ายไม่ควรใส่ , ตามหลัง
*/
var username=new Array(
"กูรักประชาธิป",
"กุหลาบสีน้ำเงิน",
"maxx",
"bigfather",
"นิธิพจน์comeback",
"เดฟ",
"giggu555",
"สี่ตาพาเพลิน",
"jegkabot",
"Zedane",
"จsะเข้",
"กิ๊กRavild",
"นักล่าโจร",
"gruff_nb_2",
//"จีรนุช",
//"LandOfSiam",
//"noname",
"lastdummy"
);


/*--------------------------------------------------------*/
// logged in
var td = document.getElementsByTagName('td');
for (i=0; i<td.length; i++)
{
	for (j=0; j<username.length; j++)
	{
		var tempstr = "title=\"View user profile.\">" + username[j];
		if (td[i].innerHTML.search(tempstr) != -1) td[i-2].style.visibility = 'hidden';
	}
}

// not logged in
var td = document.getElementsByTagName('td');
for (i=0; i<td.length; i++)
{
	for (j=0; j<username.length; j++)
	{
		var tempstr = 'by ' + username[j];
		if (td[i].innerHTML.search(tempstr) != -1) td[i-2].style.visibility = 'hidden';
	}
}