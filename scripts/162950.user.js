// ==UserScript==
// @name        TV Arsivi Listeleme
// @namespace   tv.tvarsivi.listeleme
// @description TVArsivi.com'da listeleme sayfası içermeyen kanalların listeleme işlevini tekrar geri getirir.
// @include     http://*tvarsivi.com/?y=*&z=*
// @include     https://*tvarsivi.com/?y=*&z=*
// @author      sanilunlu
// @version		1.0
// ==/UserScript==

function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  return new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function getDatePart(date) {
	return date.getFullYear() + '-' 
	+ padStr(date.getMonth()+1) + '-' 
	+ padStr(date.getDate());
}

function getTimePart(date) {
	return padStr(date.getHours()) + ':' 
	+ padStr(date.getMinutes()) + ':' 
	+ padStr(date.getSeconds());
}

var alink = window.location.href;
var qstr = 'y=' + alink.substr(alink.indexOf('y=') + 2, alink.indexOf('&', alink.indexOf('y=')) - alink.indexOf('y=') - 2) + '&z=';
var alink1 = alink.substr(0, alink.indexOf('&z=') + 3);
var alink2 = alink.indexOf('&', alink.indexOf('&z=')+1) > 0 ? alink.substr(alink.indexOf('&', alink.indexOf('&z=')+1)) : '';
var datetime = alink.substr(alink.indexOf('&z=') + 3, alink.indexOf('&', alink.indexOf('&z=')+1) > 0 ? alink.indexOf('&', alink.indexOf('&z=')+1) : alink.length).replace(/\%\d\d/g, ' ');
var date = parseDate(datetime);

var str =
'<td><table cellspacing="4" cellpadding="0" align="center"><tbody>' +
'	<tr><td height="2" bgcolor="#808080" colspan="6"></td></tr>';
for (var i = 0; i < 20; i++) {
	str +=
'	<tr>';
	for (var j = 0; j < 3; j++) {
		str +=
'		<td><table cellspacing="0" cellpadding="0"><tbody>' +
'			<tr><td align="center">' + getDatePart(date) + ' <b>' + getTimePart(date) + '</b></td></tr>' +
'			<tr><td><a href="javascript:pac(\'' + qstr.replace(/ /g, '%20') + getDatePart(date) + '%20' + getTimePart(date) + '\')"><img width="320" height="240" border="0" name="" id="" src="' + ('/resimver.php?' + qstr.replace(/ /g, '%20') + getDatePart(date) + '%20' + getTimePart(date) + '&duvarkagidi&s=0&vidcoz=800x600') + '"></a></td></tr>' +
'		</tbody></table></td>';
		date = new Date(date.getTime() + 60000);
	}
	str +=
'	</tr>' +
'	<tr><td height="10" colspan="6"></td></tr>';
}
str +=
'</tbody></table></td>';

document.body.onload = function() {
	var tel = document.querySelectorAll("body table#distablo > tbody > tr")[1];
	tel.innerHTML = str;
}
