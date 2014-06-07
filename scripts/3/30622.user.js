// ==UserScript==
// @name           ezmi
// @namespace      esez
// @description    ezmi
// @include        http://larkinor.index.hu/*
// ==/UserScript==


var objMsg, msg="";
var fonts = document.getElementsByTagName('font');

var body = document.getElementsByTagName('body')[0];
var objOldalTipus = searchDOM('//input[@name="oldalTipus"]').snapshotItem(0);
var oldalTipus=objOldalTipus.getAttribute('value')

var objTajkep = document.getElementsByTagName('img')[1];
var aktMezo = kozte("tajk/",".gif",objTajkep.src);
var aktNegyed = "n"+objTajkep.title[0];

if(!GM_getValue("ossz_"+aktNegyed)) GM_setValue("ossz_"+aktNegyed,0);
if(!GM_getValue("jo_"+aktNegyed)) GM_setValue("jo_"+aktNegyed,0);
if(!GM_getValue("ossz_"+aktMezo)) GM_setValue("ossz_"+aktMezo,0);
if(!GM_getValue("jo_"+aktMezo)) GM_setValue("jo_"+aktMezo,0);



var urlap = searchDOM('//form[@name="urlap"]').snapshotItem(0);
var par1 = searchDOM('//input[@name="par1"]').snapshotItem(0);
var Submit = searchDOM('//input[@name="Submit"]').snapshotItem(0);

if(oldalTipus=="otVilag"){
	objMsg=fonts[54]; 
	msg=objMsg.innerHTML;
	//GM_log(msg);
	//GM_log('indul'+msg.indexOf(" indul"));
	//GM_log('követ'+msg.indexOf(" követ!"));

	GM_setValue("ossz_"+aktNegyed,GM_getValue("ossz_"+aktNegyed)+1); 
	GM_setValue("ossz_"+aktMezo,GM_getValue("ossz_"+aktMezo)+1);
	
	if(msg.indexOf("tapasztalati pont kell")>-1){
	 GM_log("siker");
		GM_setValue("jo_"+aktNegyed,GM_getValue("jo_"+aktNegyed)+1);
		GM_setValue("jo_"+aktMezo,GM_getValue("jo_"+aktMezo)+1);
	}
	
	var on = GM_getValue("ossz_"+aktNegyed);
	var om = GM_getValue("ossz_"+aktMezo);
	var jn = GM_getValue("jo_"+aktNegyed);
	var jm = GM_getValue("jo_"+aktMezo);
	
	var jon =parseInt(100*jn/on);
	var ojn =parseInt(on/jn);
	ojn=isNaN(ojn)?"-":ojn;
	
	var jom =parseInt(100*jm/om);
	var ojm =parseInt(om/jm);
	ojm=isNaN(ojm)?"-":ojm;
	
		if(msg.indexOf(" indul")==-1 &&  msg.indexOf(" követ!")==-1){
			var srcGomb="data:image/gif,GIF89a0%00%1D%00%D5%00%00%26%24%25A%3F%40%81~%80!%20%22RPT102435%2B*---1%17%17%19ccjBBFKLSnov%88%89%91FGMUV%5C%5B%5Cb%3C%3DAxz%81~%81%8A78%3B%25%26(KzB%C3%C4_E%3A4%3D3.J%40%3B%FF%D4%BF%84%3D%1E)%22%1F%24%1D%1B3%2C*PIG%2C))%C0%C0%C0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%23%00%2C%00%00%00%000%00%1D%00%00%06%FF%C0Q%E2C%F4%18%07%80%A4%12%A4%D1%80%98%9ALF%12XX%1F%04%2C%81%00%81D%BE%E0%AFB!%14%89%9E%85fFS0%A87%F0%0C%1C%1E%22%90%EE%F8%B1%A2%D1%98%F8%F9%80%7C%13%0A%09%22%00%22nQ%01M%8Crx%24tw%18%93%94w%13%7D~%99%98%7D%02%84f%22%8C%8Dj%19%24%1C%A6%1Cx%94%AA%95~%14~%0E%B0%0E%AE%02%02%0D%09%87P%A1%8D%1B%A5%A7%A8%AB%C0%24%02%B0%14%C3%B1%C7%B6%00LkQ%A1R%01%BD%A7%24%C0%AB%24%C7%D7%C7%13%09%07m%CC%BAS%D0%BE%A8%D3%D4%93%D6%D8%D8%B6%DCi%BAM%05%12%0B%D1%1C%1D%F4%E4%D4%E7%E8%C8%DBOOl%05%FC%20%02%3Cx%D0%8B%04%BDz%E5%F0%E5%83%A5%CE%10%3FnN%CE%08%7C%C0%E0%CEA%84%C1%26%18%23v%8C%02%05%07%B6%CC%E0%02!%E2%C0%014%12%F0T%EC%60%F0%A0%3Ds%99%3C%CA%9C)%93%D0!%5C%25%3F%89%A8%10%0D%CFE%FF%96%D50%B5%9A%99%C9O%84B%3A%0D%89%14%91%F2%D4O%97%AAH%04%12Z%F4%12%9F%A3%26M%92%F4%B0%A4%A9%A9%8B%06%2F%88%7D%A4g%AA%D9%06%7B%20l%CBz%C0%D0%A16%12R%3E%BA%23%B6.%89.c%22%8C%E1S%16%AD%9E%B4%09%2Cd%15%E9%A1%40%85%C3q%E3%1E%26Q%D7.%170%7F%23Kf%10Xp%5B%04%86%0C%B79%5CA%02%CF%C6v%BB%84Q%A0%17%B2d%05%94-X%16%81%19%91%81%CE%88S%DAmL%82%8B%E80%5E%F2%86%F9%F2%20pV%0B%08%10p%E3%CC%99%B1%5D%E3%17H0%B0%DD%A5%F9%ED%08%CE%BB%2C%B8eY0fn%AF%8B%D3F%9E%9C%C1%F2-%0C%20ly%DC%9C%B9%84%CA%AA-%9B%2C%C0%FE%B0%01%EEt%8F%0F%A4%E8%BD%3E%01%EF%E3%C1W%08%9CD5%5B%04%05%1C%60%00%7B%C8%91%D0%19%7C%0B%CC%97%E0%7C%DE%0DT%1F%03%0F%18p%0B%00%E9%1D%A0%5Ep%00%C6%97%5Cb%F0%3D%B0%8C%40%5C%F3%85(%E2%03%05%24%80D%7F%16%FAg%12%02%DC%25%D7%99l%B4%7D(%17%1E%22Z%B1%40%89%03%E4%88%84j%14%B2%D5%E2%23%A0%CD%25%A4%8D%1F~%88%80%89%3ARh%81%92%BF%09%E9%E4%93s%25%96%D8%91%3A%9E%B8%A4%92%E9%A9V%12%7Bm%18%E0ev_%C6%96%D8%8BcJp%C0-9%26q%22%12%03%5C%99%5EI%EBq%E9e%05%03fG%1C%99%B1-%80%80%10%09%F4%E9%E7%9F%80%FA%99d%7FY%0A%97%15%86%07%00%88%E1a%23%04%01%00%3B";
			addCSS('.gomb{position: absolute; z-index:4; left:198px; top: 428px;}');	
			
			var gomb = document.createElement('IMG');
			gomb.src = srcGomb;
			gomb.className="gomb";
			gomb.addEventListener('click', function() { par1.setAttribute("value",'rablas'); Submit.setAttribute("value",'svSpecTev'); urlap.submit();}, false);
			body.appendChild(gomb);	
		}
	
	
	var outBox = document.createElement('DIV');
	outBox.className = "outBox"; addCSS('.outBox{position: absolute; z-index:4; left:790px; top: 100px;width: 200px;}');
	body.appendChild(outBox);
	
	outBox.innerHTML=""+objTajkep.title+"<br><b>"+ojn+"</b> katt | "+jon+"% | "+jn+"/"+on+"<br><br>";
	outBox.innerHTML+=""+aktMezo+" kocka<br><b>"+ojm+"</b> katt | "+jom+"% | "+jm+"/"+om+"";

	}
	
function kozte(strNyito, strZaro, str){
	iNyito=str.indexOf(strNyito);
	iZaro=str.indexOf(strZaro); 
	r=str.substring(iNyito+strNyito.length,iZaro);
	return (iZaro>-1 && iNyito>-1 && iNyito<iZaro)?r:"";
}
function searchDOM(X){return document.evaluate(X,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function addCSS(cssString) {
	var style, head;
	head = document.getElementsByTagName('HEAD')[0]; if (!head) { return; }
	style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	head.appendChild(style);
}