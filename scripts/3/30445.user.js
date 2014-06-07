// ==UserScript==
// @name          Runescape FULL world access
// @namespace     http://www.trancenotes.com/
// @description	  enables full worlds to have links, as if they where vacant...
// @include       *runescape.com/*
// ==/UserScript==

//--------User setup--------
var defLinkColor="ffEBDA"; // artificial link color in hexdecimal values EG: FFFFFF=white, 0000FF=blue.

var LinkColor = GM_getValue('gmLinkColor', defLinkColor);

var d=document; var r=0; var u="/l0,p0,j1"; var worldprefixes = new Array();
function e(w,h) {
worldprefixes[w]=h;
}
e(1,"world1");
e(2,"world2");
e(3,"world3");
e(4,"world4");
e(5,"world5");
e(6,"world6");
e(7,"world7");
e(8,"world8");
e(9,"world9");
e(10,"me5");
e(11,"world11");
e(12,"jolt9");
e(13,"world13");
e(14,"world14");
e(15,"mn2");
e(16,"mn3");
e(17,"world17");
e(18,"world18");
e(19,"world19");
e(20,"world20");
e(21,"world21");
e(22,"world22");
e(23,"mn4");
e(24,"mn5");
e(25,"me6");
e(26,"world26");
e(27,"world27");
e(28,"world28");
e(29,"world29");
e(30,"world30");
e(31,"world31");
e(32,"world32");
e(33,"world33");
e(34,"world34");
e(35,"world35");
e(36,"world36");
e(37,"world37");
e(38,"world38");
e(39,"world39");
e(40,"world40");
e(41,"world41");
e(42,"world42");
e(43,"world43");
e(44,"world44");
e(45,"world45");
e(46,"world46");
e(47,"world47");
e(48,"world48");
e(50,"ams2");
e(51,"ams3");
e(52,"jolt5");
e(53,"world53");
e(54,"me10");
e(55,"world55");
e(56,"world56");
e(57,"world57");
e(58,"world58");
e(59,"world59");
e(60,"world60");
e(61,"world61");
e(62,"world62");
e(63,"world63");
e(64,"world64");
e(65,"world65");
e(66,"world66");
e(67,"jolt10");
e(68,"jolt11");
e(69,"jolt12");
e(70,"world70");
e(71,"mn1");
e(72,"world72");
e(73,"world73");
e(74,"world74");
e(75,"world75");
e(76,"world76");
e(77,"world77");
e(78,"world78");
e(79,"world79");
e(80,"world80");
e(81,"mn6");
e(82,"world82");
e(83,"world83");
e(84,"world84");
e(85,"world85");
e(86,"world86");
e(87,"world87");
e(88,"world88");
e(89,"world89");
e(90,"world90");
e(91,"world91");
e(92,"world92");
e(93,"world93");
e(94,"world94");
e(95,"world95");
e(96,"world96");
e(97,"world97");
e(98,"world98");
e(99,"world99");
e(100,"world100");
e(101,"world101");
e(102,"world102");
e(103,"world103");
e(104,"world104");
e(105,"mn8");
e(106,"mn9");
e(107,"au1");
e(108,"au2");
e(109,"au3");
e(110,"au4");
e(111,"au5");
e(112,"au6");
e(113,"world113");
e(114,"world114");
e(115,"world115");
e(116,"world116");
e(117,"swe1");
e(118,"swe2");
e(119,"swe3");
e(121,"swe5");
e(123,"swe7");
e(124,"swe8");
e(125,"world125");
e(126,"world126");
e(127,"world127");
e(128,"world128");
e(129,"world129");
e(130,"world130");
e(131,"world131");
e(132,"world132");
e(133,"hel1");
e(134,"hel2");
e(136,"hel4");
e(137,"hel5");
e(138,"hel6");
e(141,"ams7");
e(142,"me2");
e(143,"me3");
e(144,"me4");
e(145,"world145");
e(149,"hel7");
e(151,"hel9");
e(152,"world152");
e(153,"world153");
e(154,"world154");
e(155,"world155");
e(157,"world157");
e(158,"world158");
e(159,"world159");



function WorldLinkFunc(wn,wlffull) {

	var WorldLink = document.createElement('td');
	if(wlffull){
	WorldLink.innerHTML = '<span id=golden>'+
	'<a href="http://'+worldprefixes[wn]+'.runescape.com/l0,p0,j1">World '+wn+'</a></span>'
	} else {
	WorldLink.innerHTML = '<a href="http://'+worldprefixes[wn]+'.runescape.com/l0,p0,j1">World '+wn+'</a>';
	}
	return WorldLink.innerHTML;
}

var currentpage = window.location.href;
if(currentpage.indexOf("slj.ws") != -1 ){ 
	var thiscell;
	var thisworldnumloc;
	var thisworldnum;
	var thiscellstr;
	var thisworldnumendloc;
	var fullbol
    var allPagetags=document.getElementsByTagName("*"); 

         for (i=0; i<allPagetags.length; i++) { 
	 //Pick out the tags with our class name 
	 if (allPagetags[i].className=="slistHeader") { 
	   var table = allPagetags[i].parentNode; 
	   var cells = table.getElementsByTagName("td");
	 } 
	 } 
	for (var i = 0; i < cells.length; i++) {
		thiscell = cells[i];
		thiscellstr = thiscell.innerHTML;
		fullbol = false;
		
		if (thiscellstr.indexOf('World ') != -1){
			thisworldnumloc = thiscellstr.indexOf('World ')+6;

			thisworldnumendloc = thiscellstr.indexOf('</a>');
			if(thisworldnumendloc == -1){
				thisworldnumendloc = thiscellstr.length;
				fullbol = true;
				//alert('loc is = '+thisworldnumloc+'; '+'and endloc is = '+thisworldnumendloc);
				thisworldnum = thiscellstr.slice(thisworldnumloc,thisworldnumendloc);
				//if(i>120 && i<130 {alert(thiscellstr.split(thisworldnumloc,thisworldnumendloc))}
				thiscell.innerHTML = WorldLinkFunc(thisworldnum,fullbol);
			}
		}
		
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#golden a { color: #'+LinkColor+'; }');


GM_registerMenuCommand('White links', function() {

    LinkColor = "FFFFFF";

    GM_setValue('gmLinkColor', LinkColor);

  });
  
GM_registerMenuCommand('Yellow links', function() {

    LinkColor = "FFFF00";

    GM_setValue('gmLinkColor', LinkColor);

  });

GM_registerMenuCommand('Red links', function() {

    LinkColor = "FF0000";

    GM_setValue('gmLinkColor', LinkColor);

  });


GM_registerMenuCommand('Dark Green links', function() {

    LinkColor = "00A05B";

    GM_setValue('gmLinkColor', LinkColor);

  });

GM_registerMenuCommand('Rune links', function() {

    LinkColor = "1E95BC";

    GM_setValue('gmLinkColor', LinkColor);

  });
  
GM_registerMenuCommand('Use default link color', function() {

    GM_setValue('gmLinkColor', defLinkColor);

  });