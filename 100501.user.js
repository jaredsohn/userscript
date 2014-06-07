// ==UserScript==
// @name           DO User Spy
// @namespace      http://grimpow.lescigales.org/
// @include        http://game.desert-operations.*/world*/userdetails.php?user=*
// @version        1.0
// ==/UserScript==
function randomInt(mini, maxi) {
	var nb = mini + (maxi+1-mini)*Math.random();
	return Math.floor(nb);
} if (UserId = document.location.href.match(/user=([0-9]+)/)) {
	var ConvertDay = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
	var ConvertMonth = new Array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
	function setCookie(sName, sValue) {
		var today = new Date(), expires = new Date();
		expires.setTime(today.getTime() + (24*60*60*1000));
		document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString();
	} function getCookie(sName) {
		var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
		if (oRegex.test(document.cookie)) {
			return decodeURIComponent(RegExp["$1"]);
		} else {
			return null;
		}
	} function ConvertDate(Time) {
		var End = new Date(Time);	
		message = ConvertDay[End.getDay()] + ' ' + End.getDate() + ' ' + ConvertMonth[End.getMonth()] + ' | ';
		var minutes = End.getMinutes();
		if(minutes < 10) minutes = "0" + minutes;
		message += End.getHours() + 'H' + minutes;
		return message;
	} Cookie = getCookie(UserId);
	if (document.body.innerHTML.match(/images\/classic\/icons\/bullet_green.png/g)) {
		if (Cookie == null) {
			Cookie = new Date();
			Table = new Array(Cookie);
		} else {
			Cookie += ';' + new Date();
			var Table = Cookie.split(';');
		}
		setCookie(UserId, Cookie);
	} else {
		if (Cookie == null) {
			Table = new Array();
		} else {
			var Table = Cookie.split(';');
		}
	} Add =   '<table width="100%" border="0" cellpadding="3" cellspacing="1"><tr bgcolor="#4D4D4D">'
		+ '<td  style="height:15px;"><strong> - Connexion - </strong></td></tr>';
	for (i = 0, c = Table.length; i < c; i++) {
		if (ConvertDate(Table[i]) != ConvertDate(Table[(i-1)])) {
			Add += '<tr bgcolor="#333333"><td>' + ConvertDate(Table[i]) + '</td></tr>';
		}
	} document.body.innerHTML += Add + '</table>';
}
setTimeout('window.location.reload(true);', randomInt(300000,600000));