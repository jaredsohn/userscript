// ==UserScript==
// @name        Achievement Icons
// @namespace   popmundo
// @match	http://*.popmundo.com/Common/*
// @grant       none
// @version     1.6.1
// @author      Feeney Danielson
// ==/UserScript==
var a = document.getElementsByTagName('img'), gradient;
try {
	var bgr = window.getComputedStyle(document.querySelector('.DarkColumnHeader'),null).backgroundColor.toString();
	var bgr2 = window.getComputedStyle(document.querySelector('.DarkColumn'),null).backgroundColor.toString();
}
catch (e) { return }
if (navigator.userAgent.toLowerCase().indexOf('firefox')>-1) gradient = '-moz-linear-gradient';
else gradient = '-webkit-linear-gradient';
for (i=a.length-1;i>=0;i--) {
	var iconnr = a[i].src.match(/AchIcon_(\d+)/i);
	if (!iconnr) continue;
	iconnr = iconnr[1];
	if (iconnr < 114) continue;
	--iconnr;
	var x = (parseInt(iconnr%10,10))*35*-1,	y = (Math.floor(iconnr/10))*35*-1; // why not zoidberg
	replace(a[i],x,y);
}
if (document.location.href.indexOf('CharacterDetails.asp?action=Achievements')>-1){
	var row = document.querySelector('html body table.Paper tbody tr td.DarkColumn table:nth-of-type(3)');
	if ((row == null) || (row.rows[0].cells.length<16)) return;
	var newrow = document.createElement('table');
	newrow.innerHTML = row.innerHTML;
	newrow.width = "489";
	newrow.cellSpacing = "0";
	newrow.cellPadding = "0";
	newrow.border = "0";
	for (var i = 14;row.rows[0].cells[i] != null;) row.rows[0].removeChild(row.rows[0].cells[i]);
	for (var i = 13, j=newrow.rows[0].cells.length;i>0;i--) newrow.rows[0].removeChild(newrow.rows[0].cells[i]);
	row.parentNode.insertBefore(newrow, row.nextSibling);
}
function replace (n, p) {
	var div = document.createElement('div');
	div.style.width = '32px';
	div.style.height = '34px';
	div.style.background = gradient + '(bottom, '+bgr2+', '+bgr2+' 10px, '+bgr+' 10px) repeat scroll 0 0 transparent';
	var divIMG = document.createElement('div');
	divIMG.textContent = '';
	divIMG.style.background = 'url("http://www.popmundo.com/App_Themes/PPM2/Images/Achievements.png") no-repeat scroll '+x + 'px '+y+'px transparent';
	divIMG.title = a[i].title;
	divIMG.style.width = '32px';
	divIMG.style.height = '34px';
	div.appendChild(divIMG);
	n.parentNode.insertBefore(div,n);
	n.parentNode.removeChild(n);
	return true;
}