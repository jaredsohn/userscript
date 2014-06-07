// ==UserScript==
// @name           Convert Thai Report
// @namespace      
// @description    Convert Thai language report
// @include        http://s1.travian.in.th/berichte.php?id=*
// ==/UserScript==

var thtxt = new Array(41)
var entxt = new Array(41)
thtxt[0] = /กองกำลัง/g;			entxt[0] = "Units";
thtxt[1] = /รางวัล/g;				entxt[1] = "Bounty";
thtxt[2] = /ความเสียหาย/g;		    entxt[2] = "casualties";
thtxt[3] = /จากหมู่บ้าน/g;			entxt[3] = "from the village";
thtxt[4] = /ผู้โจมตี/g;				entxt[4] = "Attacker";
thtxt[5] = /ผู้ป้องกัน/g;				entxt[5] = "Defender";
thtxt[6] = /โจมตี/g;				entxt[6] = " attacks";
thtxt[7] = /เรื่อง/g;				entxt[7] = "Subject";
thtxt[8] = /ส่ง/g;					entxt[8] = "Sent";
thtxt[9] = /ลีเจียนแนร์/g;			entxt[9] = "Legionnaire";
thtxt[10] = /แพรทอเรียน/g;			entxt[10] = "Praetorian";
thtxt[11] = /อิมพีเรียน/g;			entxt[11] = "Imperian";
thtxt[12] = /เอควิทส์ เลกาที/g;		entxt[12] = "Equites Legati";
thtxt[13] = /เอควิทส์ อิมเพอราทอริส/g;	entxt[13] = "Equites Imperatoris";
thtxt[14] = /เอควิทส์ ซีซาริส/g;		entxt[14] = "Equites Caesaris";
thtxt[15] = /เครื่องกระทุ้ง/g;			entxt[15] = "Battering Ram";
thtxt[16] = /เครื่องยิงกระสุนไฟ/g;	    entxt[16] = "Fire catapult";
thtxt[17] = /สมาชิกสภาสูง/g;		entxt[17] = "Senator";
thtxt[18] = /แฟแลงซ์/g;			entxt[18] = "Phalanx";
thtxt[19] = /ซอร์ดแมน/g;			entxt[19] = "Swordfighter";
thtxt[20] = /ผู้เบิกทาง/g;		    entxt[20] = "Pathfinder";
thtxt[21] = /ธูเททส์ ธันเดอร์/g;		entxt[21] = "Theutates Thunder";
thtxt[22] = /ดรูอิทไรเดอร์/g;			entxt[22] = "Druidrider";
thtxt[23] = /แฮดวน/g;				entxt[23] = "Haeduan";
thtxt[24] = /เครื่องกระทุ้ง/g;			entxt[24] = "Ram";
thtxt[25] = /เทรบูเชท/g;			entxt[25] = "Trebuchet";
thtxt[26] = /ดรูอิทไรเดอร์/g;			entxt[26] = "Druidrider";
thtxt[27] = /แฮดวน/g;				entxt[27] = "Haeduan";
thtxt[28] = /เทรบูเชท/g;			entxt[28] = "Trebuchet";
thtxt[29] = /หัวหน้าเผ่า/g;			entxt[29] = "Chieftain";
thtxt[30] = /คลับสวิงเกอร์/g;			entxt[30] = "Clubswinger";
thtxt[31] = /สเปียร์แมน/g;			entxt[31] = "Spearfighter";
thtxt[32] = /แอ็กซ์แมน/g;			entxt[32] = "Axefighter";
thtxt[33] = /หน่วยสอดแนม/g;		entxt[33] = "Scout";
thtxt[34] = /พาลาดิน/g;			entxt[34] = "Paladin";
thtxt[35] = /อัศวินทูทั่นส์/g;			entxt[35] = "Teuton Knight";
thtxt[36] = /เครื่องยิงกระสุน/g;		entxt[36] = "Catapult";
thtxt[37] = /หัวหน้า/g;				entxt[37] = "Chief";
thtxt[38] = /ผู้ตั้งถิ่นฐาน/g;			entxt[38] = "Settler";
thtxt[39] = /ฮีโร่/g;				entxt[39] = "Hero";
thtxt[40] = /นักโทษ/g;				entxt[40] = "Prisoner";
var ele = document.getElementById("lmid2");
var i
for (i = 0;i<=41 ;i++ )
{
	ele.innerHTML = ele.innerHTML.replace(thtxt[i],entxt[i]);
}
