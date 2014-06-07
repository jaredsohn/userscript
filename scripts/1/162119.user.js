// ==UserScript==
// @name           glitterhub
// @namespace      http://glitterhub.go-here.nl
// @description    glittering the hub
// @version        1.0.1
// @include        https://raw.github.com*
// @include        http://raw.github.com*
// @downloadURL    https://userscripts.org/scripts/source/162119.user.js
// @updateURL      https://userscripts.org/scripts/source/162119.meta.js
// @icon           data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%03%00%00%00D%A4%8A%C6%00%00%006PLTE%00%00%00%00%80%00%FF%00%00%80%80%00%C0%C0%00%40%40%00%80%00%00%00%FF%00%FF%FF%00%E0%E0%00%FF%FF%80%00%C0%00%40%00%00%00%40%00%60%60%00%FF%FF%C0%C0%00%00%FF%FF%40_u%B61%00%00%00%09pHYs%00%01%CD%5E%00%01%CD%5E%01%B8r%93Z%00%00%00%A1IDATx%5E%A5%D2%EB%0E%83%20%0C%05%60z%E5%A6n%7B%FF%97%1DK%16%B5J%8A%09%E7%9F%E1%E3%B4!%86%A7%91%D1%F9%0D%2C%F6%93n%40G%00%07%40%2F%80%2F%00%DF%A8fH%22%BB%A1%22%E2b%40%3E%D7%ABb%8B%EA%5EB%9C%0A%93%A9%C0c%84%B4%E4%F2b%3A%0B5K%0A%A5R23%8BlG%85y%C7%94%3F%EC%BD%03%11%A7%7D%02t_%92%5B%81%0B%E4%D80%FE%97p%80%FF%3B%AC%11%7C%00%7D%B0%19%E0%04jl%A9%E0%1C%EE%E97%AC%3F%05%E0M%01s%B7%0Bj%F0%13a%1A%84Y%00%13%A0%9B%2FIU%03%93i8JU%00%00%00%00IEND%AEB%60%82
// ==/UserScript==

colorSet="circus";

	defaultColor="#cccccc";
	defaultFontSet="\'Courier New\', Times, serif";
	defaultBackground="#000000";
	defaultBackgroundGradient="#4D4D4D";
	colorScheme="#C3FF00,#8CFF00,#5DFF00,#00CE29,#00CE97,#00FFF6";
	rainbowFactor=80;
	switch(colorSet){
		case "fire": colorScheme = "#FF006E,#FF0000,#FF6A00,#FFBF00,#FFEE00,#E9FF00,#CCFF00";break;
		case "blueish green": colorScheme = "#C3FF00,#8CFF00,#5DFF00,#00CE29,#00CE97,#00FFF6";break;
		case "purple blue": colorScheme="#00CBFF,#0094FF,#0065FF,#001DFF,#6A00FF,#9000FF,#C300FF,#FF00F2";break;
		case "techno": colorScheme="#00FFD4,#00FF99,#00FF3F,#8BFF6B,#BCFF6B,#BBFF00,#83C1FC,#58DBFC,#09F5F9,#00FF8C,#A5C600,#A5C600";defaultFontSet="Consolas";break;
		case "restfull": colorScheme="#A5C600,#00C475,#00C475,#00C475,#25BC8A,#25BC8A,#25BC8A,#25BC8A,#4800FF,#6474FC,#009DFF,#A24CED,#294BE5,#317237";break;
		case "contrast": colorScheme="#935456,#009DFF,#A24CED,#294BE5,#317237,#935456,#009DFF,#A24CED,#294BE5,#317237,#935456";break;
		case "gray shades": colorScheme="#ffffff,#dddddd,#aaaaaa,#777777,#555555";break;
		case "haxor green":
			defaultBackground="#000000";
			defaultBackgroundGradient="#003303";
			colorScheme="#1C8E31,#16AD43,#1BD352,#18F45A,#54F284,#69D389,#A1EDB8";
			defaultFontSet="Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace,Consolas,Lucida Console,Monaco";break;
		case  "circus":
			colorScheme="#F70000,#CB00FF,#8C8AFC,#00E5FF,#00FF0C,#FAFF00,#AD7824,#E0DA86";
			defaultFontSet="DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace,Consolas,Lucida Console,Liberation Mono,Monaco";break;
		case  "relaxed":
			colorScheme="#689AD6,#6878D8,#3980D6,#72A0E0,#68BEDD,#5E94E0";
			defaultColor="#eeeeee";
			defaultBackground="#13002D";
			defaultBackgroundGradient="#000000";
			defaultFontSet="monospace,Consolas,Lucida Console,Liberation Mono,Monaco,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New";break;

		case  "relaxedB":
			colorScheme="#589AD6,#5878D8,#2980D6,#62A0E0,#58BEDD,#4E94E0";
			defaultColor="#777777";
			defaultBackground="#ffffff";
			defaultBackgroundGradient="#dddddd";
			defaultFontSet="monospace,Consolas,Lucida Console,Liberation Mono,Monaco,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New";
			rainbowFactor=-10;break;



	// put new color sets above this line
	}
	raw = document.getElementsByTagName('pre')[0].innerHTML;
	// raw = raw.substring(24,raw.length-13);
	// style sheet
	dbc=defaultBackground;dbg=defaultBackgroundGradient;
	var hls = document.createElement('style');
	hls.type = 'text/css';
	hls.innerHTML = (('ol.highlighter{ background-image: -ms-radial-xxbackground-image: -moz-radial-xxbackground-image: -o-radial-xxbackground-image: -webkit-gradient(radial, center center, 0, center center, 500, color-stop(0, '+dbg+'), color-stop(1, '+dbc+')); background-image: -webkit-radial-xxbackground-image: radial-gradient(circle farthest-corner at center, '+dbg+' 0%, '+dbc+' 100%);} div.highlighter{font-weight:bold;font-family:'+defaultFontSet+';color:'+defaultColor+';font-size:14px;padding:4px 0px 4px 4px;background-color:'+dbc+';}').split('xx').join('gradient(center, circle farthest-corner, '+dbg+' 0%, '+dbc+' 100%);'));
	document.getElementsByTagName('head')[0].appendChild(hls); // add css
	colorScheme = colorScheme.split(',');
	
	raw = raw.split('\n').join('<br>'); raw = raw.split('\t').join('    ');
	colorArray = new Array();
	for(x=0;x<raw.length;x++){colorArray[x]=defaultColor;}
	rawArr = raw.split('');
	lowercaseRaw=raw.toLowerCase();
	justletters=lowercaseRaw.replace(/[^a-z0-9]/g," ");
	justletters=justletters.replace(/\s+/g," ");
	myarray="&gt; &amp; &amp;lt; &amp;gt; / ' } = ] )"+' " '+justletters;
	myarray=myarray.split(' ');
	result = new Array();
	for(x=0;x<myarray.length;x++){ 
		if(myarray[x]!="" && result.indexOf(myarray[x])==-1){ 
			result.push(myarray[x]);
		}
	}
	if(result!=-1){
		tr=lowercaseRaw; // create temp copy
		tr=tr.replace(/\{/g,'}');
		tr=tr.replace(/\(/g,')');
		tr=tr.replace(/\[/g,']');
		tr=tr.replace(/\&lt\;/g,'&gt;');
		result=result.sort(function(a,b){return a.length - b.length}); // sort the word list by size
		for(x=0;x<result.length;x++){
			locations=findInString(result[x],tr);
				if(locations!=-1){
					for (ww=0;ww<locations.length;ww++) {
						for(zz=0;zz<result[x].length;zz++){
							if(x>=colorScheme.length){
								colorScheme = colorScheme.concat(colorScheme);
							}if("&lt;&gt;&amp;&amp;lt;&amp;gt;".indexOf(result[x])==-1){
								colorArray[1*locations[ww]+zz]=increase_brightness(colorScheme[x],(zz/result[x].length)*rainbowFactor);
							}else{
								colorArray[1*locations[ww]+zz]=colorScheme[x];
							}
						}
					}
				}
			}
		}

	colorArray=unColor('//','<',lowercaseRaw,colorArray,defaultColor);				// uncolor //
	colorArray=unColor('/*','*/',lowercaseRaw,colorArray,defaultColor);				// uncolor /* foo bar */
	colorArray=unColor('&lt;!--','--&gt;',lowercaseRaw,colorArray,defaultColor);	// uncolor <!-- foo bar -->

	var output = '<div class="highlighter"><ol start="0" class="highlighter"><li><span style="color:'+colorArray[0]+'">';
	var theOldColor = colorArray[0];
	for (x=0;x<raw.length;x++){
		theLetter=rawArr[x];
		theColor=colorArray[x];
		theFutureColor=colorArray[1*x+1];
		if(theLetter=="<"){
			if(lowercaseRaw.substring(x, (1*x+4))=="<br>"){		theLetter="</li><li>";x=x*1+3;}
		}
		if(theLetter==" "){										theLetter="&nbsp;<wbr>";}
		if(theColor==theOldColor && theColor==theFutureColor){	output=output+theLetter;
		}else if(theColor==theOldColor && x>1){ 				output=output+theLetter+'</span>';
		}else if(theColor==theFutureColor){ 					output=output+'</span><span style="color:'+theColor+';">'+theLetter;
		}else{ 													output=output+'<span style="color:'+theColor+';">'+theLetter+'</span>';}
		theOldColor=colorArray[x];
	}

	
	
	
(function() {
    window.document.bgColor="fff"
    window.document.fgColor="fff"
    window.document.linkColor="00CC00"
    window.document.vlinkColor="777777"
})();

(function(){

var newSS, styles='* { background: #000 ; color: white  } :link, :link * { color: #B2F58C ; font-family: Verdana, Arial, Helvetica, sans-serif;font-weight: bold;text-decoration: none; } :visited, :visited * { color: #F5E8B3 ; font-family: Verdana, Arial, Helvetica, sans-serif;font-weight: bold;text-decoration: none; }';

if(document.createStyleSheet) {
document.createStyleSheet("javascript:'"+styles+"'"); } else { newSS=document.createElement('link');

newSS.rel='stylesheet'; newSS.href='data:text/css,'+escape(styles);

document.getElementsByTagName("head")[0].appendChild(newSS); } 

})()
	// write results back to the page
	document.getElementsByTagName("body")[0].innerHTML = output+"</span></li></ol></div>";

function findInString(searchFor, searchIn) {
	var results = new Array();
	var yy = 0;
	var aa = searchIn.indexOf(searchFor);
	results[0] = aa;
	searchIn = searchIn.slice(aa * 1 + searchFor.length);
	yy = aa * 1 + searchFor.length;
	if (aa != -1) {
		for (xx = 1; searchIn.indexOf(searchFor) != -1; xx++) {
			yy = searchIn.indexOf(searchFor)
			results[xx] = 1 * results[1 * xx - 1] + searchIn.indexOf(searchFor) + searchFor.length;
			searchIn = searchIn.slice(1 * searchIn.indexOf(searchFor) + searchFor.length);
		}
	}
	return results;
}
function increase_brightness(hex, percent){
    hex = hex.replace(/^\s*#|\s*$/g, ''); // strip the leading # if it's there
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1'); // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    }
    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);
    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
function unColor(startingChars,endingChars,tr,colorArray,defaultColor){
	comment=0; 																// comment pointer
	while(tr.indexOf(startingChars)!=-1){ 									// keep going until no instances of double slash remain
		comment=1*comment+tr.indexOf(startingChars)+startingChars.length; 	// increase the comment pointer to point at the next potential comment
		tr=lowercaseRaw.slice(comment)+"<"; 								// get the part after the potential comment
		trB=lowercaseRaw.substring(0,comment); 								// get the part before the potential comment
		trB=trB.split('\\<br>').join('     '); 								// remove escaped line breaks
		trB=trB.substring(trB.lastIndexOf('>'),trB.length); 				// find the beginning of the line with the potential comment
		sq=trB.split("'").length-1; 										// count the single quotes
		dq=trB.split('"').length-1; 										// count the double quotes
		if(sq%2==0&&dq%2==0
		||sq==1&&dq==2&&trB.indexOf('"')<trB.indexOf("'")&&trB.lastIndexOf('"')>trB.indexOf("'")
		||sq==2&&dq==1&&trB.indexOf("'")<trB.indexOf('"')&&trB.lastIndexOf("'")>trB.indexOf('"')){
		semicol=tr.indexOf(';');
			if(semicol==-1||semicol>tr.indexOf(endingChars)){
				for(x=0;x<tr.indexOf(endingChars);x++){
					colorArray[1*comment+x]=defaultColor;
				}
			}
		} 
	}
return colorArray;
}

