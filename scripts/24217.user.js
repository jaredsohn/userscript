// ==UserScript==
// @name           Score Hero - Gold Star Cutoffs
// @version        1.0
// @description    Adds a field to show the goldstar cutoff
// @include        http://rockband.scorehero.com/manage_scores.php?platform=2&size=1&team=0&group=3&diff=4
// @author         Jason MacLean
// @author         lightdarkness@gmail.com
// ==/UserScript==
function removeCommas( strValue ) {
  var objRegExp = /,/g; //search for commas globally
  //replace all matches with empty strings
  return strValue.replace(objRegExp,'');
}
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
var cutoffs = new Array(5);
cutoffs[0] = 89300;
cutoffs[1] = 111050;
cutoffs[2] = 134225;
cutoffs[3] = 140650;
cutoffs[4] = 123150;
cutoffs[5] = 181100;
cutoffs[6] = 185050;
cutoffs[7] = 175875;
cutoffs[8] = 99425;
cutoffs[9] = 91375;
cutoffs[10] = 124395;
cutoffs[11] = 106851;
cutoffs[12] = 129935;
cutoffs[13] = 131275;
cutoffs[14] = 148695;
cutoffs[15] = 182400;
cutoffs[16] = 99200;
cutoffs[17] = 188625;
cutoffs[18] = 174625;
cutoffs[19] = 210400;
cutoffs[20] = 92050;
cutoffs[21] = 127425;
cutoffs[22] = 126550;
cutoffs[23] = 155300;
cutoffs[24] = 163725;
cutoffs[25] = 143079;
cutoffs[26] = 178045;
cutoffs[27] = 149073;
cutoffs[28] = 92131;
cutoffs[29] = 138972;
cutoffs[30] = 155289;
cutoffs[31] = 194473;
cutoffs[32] = 225775;
cutoffs[33] = 126874;
cutoffs[34] = 96571;
cutoffs[35] = 229993;
cutoffs[36] = 136086;
cutoffs[37] = 186814;
cutoffs[38] = 206461;
cutoffs[39] = 162393;
cutoffs[40] = 440227;
cutoffs[41] = 187258;
cutoffs[42] = 113776;
cutoffs[43] = 200578;
cutoffs[44] = 166945;
cutoffs[45] = 251971;
cutoffs[46] = 199135;
cutoffs[47] = 319347;
cutoffs[48] = 215674;
cutoffs[49] = 234988;
cutoffs[50] = 258853;
cutoffs[51] = 298923;
cutoffs[52] = 320235;




var rowNum = 0;
var score = 0;
var diff = 0;
for(i = 0; i < cutoffs.length; i++)
{
	rowNum = (i * 4) + 17;
	if(i > 5){
		rowNum++;
		if(i > 13){
			rowNum++;
		}
		if(i > 20){
			rowNum++;
		}
		if(i > 27){
			rowNum++;
		}
		if(i > 34){
			rowNum++;
		}
		if(i > 40){
			rowNum++;
		}
		if(i > 46){
			rowNum++;
		}
	}
	score = removeCommas(document.getElementsByTagName('tr')[rowNum].getElementsByTagName('td')[7].innerHTML);
	if(score < cutoffs[i]){
		diff = cutoffs[i] - score;
		document.getElementsByTagName('tr')[rowNum].getElementsByTagName('td')[7].innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutoffs[i]) + '</font> <font color="red" style="font-size:8px">(' + addCommas(diff) + ')</font>';
	}
}