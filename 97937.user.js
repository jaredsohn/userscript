// ==UserScript==
// @name           Devtoolbar 2
// @description    Deviantart
// @namespace      devbar2
// @include        *
// @exclude        *.deviantart.*
// @version        2.4
// @contributor    Dediggefedde
// @grant		   GM_registerMenuCommand
// @grant		   GM_setValue
// @grant		   GM_getValue
// @grant		   GM_xmlhttpRequest
// @grant		   GM_log
// ==/UserScript==

if(navigator.appName=="Opera"){window.onload=laden;}else{laden();}
function laden(){ 
var alt="";
var wartezeit = 10000;
var akthigh=true;
var akthighcol="#ff7878";
var textcol="#BBD99C";
var hauptlink="http://www.deviantart.com";
var ins = true;
var userid;
//All Icons Copyright to DeviantArt
var backicon="url(data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00H%00H%00%00%FF%FE%00%13Created%20with%20GIMP%FF%DB%00C%00%05%03%04%04%04%03%05%04%04%04%05%05%05%06%07%0C%08%07%07%07%07%0F%0B%0B%09%0C%11%0F%12%12%11%0F%11%11%13%16%1C%17%13%14%1A%15%11%11%18!%18%1A%1D%1D%1F%1F%1F%13%17%22%24%22%1E%24%1C%1E%1F%1E%FF%DB%00C%01%05%05%05%07%06%07%0E%08%08%0E%1E%14%11%14%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%1E%FF%C0%00%11%08%00%14%00%01%03%01%22%00%02%11%01%03%11%01%FF%C4%00%17%00%01%00%03%00%00%00%00%00%00%00%00%00%00%00%00%00%00%04%05%07%FF%C4%00%17%10%01%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%14a%01%FF%C4%00%16%01%01%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%01%03%04%FF%C4%00%15%11%01%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%11%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%CD%E6%C1w6tJ%B1T%F0%00%7F%FF%D9)";

var barhotico="data:image/gif,GIF89a%12%00%13%00%A5%26%00%00%00%00%E2S%1C%E6l'%82%87%82%8C%8C%8C%EC%80(%93%94%93%EB%874%F1%8C%25%9A%9C%9A%EA%8FC%E7%90C%EE%957%A3%A3%A3%F3%98-%AD%AD%AD%F1%A7A%B5%B5%B5%F2%B1M%BA%BA%BA%C0%C0%C0%BE%C5%BE%CB%CB%CB%D5%D5%D5%DA%DA%DA%DE%DE%DE%E2%E2%E2%E4%E4%E4%F4%E8%9D%E6%E6%E6%E8%E8%E8%EA%EA%EA%F8%ED%A7%ED%ED%ED%F7%F0%B2%FC%F3%A4%F3%F3%F3%FD%FA%FA%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%3F%00%2C%00%00%00%00%12%00%13%00%00%06%B4%C0%9Fp%F8%03%10%8F%C8%A21y4%02%10K%A6%10P%A0%3A%01%D8%2Cv%EA%80%40%1CYR%C9D.c%05%12%91H%E2%80%5E%3C%A4P%E8%E3%A1%60%0B%A0%3C%88%01%A8%5C%3Art%1D%13g%20%23%23%20%07%00%16%19%1Fs%1E%1D%1B%11X%01%0A%1C%1C%0B%02%8B%1A%8F%91%1A%0FN%01%02%02%01%00%14%16%1A%82%1B%1A%19%A0SY%A7%19%1D%90%AB%19%19%0DK%00%19%16%BC%B2%B4%AC%19%18%B8S%24%AB%1A%B3%9E%B6%18%18%09%B9%26%81%BF%CA%18%17%06%CE%9D%B5%C1%D3%D4%CE%AA%C0%CB%17%E0%04%CE%D1%D9%E0%E1%B9%16%14%13%11%0F%0F%0D%0D%09%06%06%04%04%03QZ%F8%F8%3FA%00%3B";
var bardevico="data:image/gif,GIF89a%0E%00%0F%00%84%1E%005%1F%0DI-%10J8)%84A%00bJ2jR%40%92M%00%99V%01v%5B%3E%88kN%CA%60%00%D5n%00%DCu%00%A0%80Y%E9x%01%B1%90l%C9%92Y%C5%A2r%CB%A9%82%F6%A6G%D5%B9%85%EC%B8%8F%CE%C5%99%D4%CA%A5%E5%D2%A8%DD%D5%AB%E7%E0%B7%F1%E6%B8%EF%EA%C8%F6%EF%CB%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%0E%00%0F%00%00%05%88%E0%24%8Edy%9Chz%3A%D3!I%14%D54%0Fg%1F%ECAi%14A%08%82%C6%8D%D1%A2p%12%89%0E%26%20%C0t%0CD%9DF%90%E0P%12%01%84%C6%B0hI4%81%C4%A3%82%00%142%DC%D6%C3%02%D0%3C6%11%80%E0%92%3E%3C%24%E1%7B%02%10%B8%0C%BAv%3DT%09%3F%01%12%7Fj%0F%3E%09%18%0F%05%04%11%03%0A%89%04%08%10p%08%05%91%93v%08%90%1D%1D%10%08%08%0F%92-%06%A8%A9%03%AB%AB%0A%0C%0C%0E%AF%0B%B3%0A%B5%B6!%00%3B";
var barmesico="data:image/gif,GIF89a%10%00%0C%00%E3%08%00%00%00%00%00%15%B1%20)6%007%E0%3CGLX%86xl%81x%00%D3%EA%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%08%00%2C%00%00%00%00%10%00%0C%00%00%04L%10I%04%AA%AC%60j%20z%EDB%B6%19%A4%D1%95%86H%19DKt.%91%5E%AF%D0%C25%91%01%FA%97%87%95%1E%A0%40%E4%80%86%C5J%E10%08%14%8CC%A6S9%A8%3E1%85%EA%E0Z%084%9F%97%EEwG%04O%90f%8AE%A3%16E%00%00%3B";
var barcomico="data:image/gif,GIF89a%10%00%0F%00%84%13%00%00%00%00%A9%9Ao%B1%A3%7B%B6%A8%86%BE%B3%92%D6%C9%AD%D7%CB%B0%D9%CD%B4%DB%D0%B8%DC%D2%BA%DD%D3%BC%DE%D4%BE%DF%D5%C0%E0%D7%C2%E2%D9%C5%E3%DB%C8%F7%F3%E3%F9%F6%E9%FA%F7%EC%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%10%00%0F%00%00%05d%E0'~%40i%96%E3XJ%2C%1B%BD%A8%08%B0%CF%E38%0D%B3(0)%D56%9CN%91%40%1C%04%AB%DA-%B7%2B%1E%8EIG%89QJ%94%9E%C8%D9%AD%B4(!%AE%86%C0J%D84%3E%0D%05%F1%8CI4%1F%D0i%00%89%40h%3F%DF%85%B8%0A0%E8%0B%04pb)2'%10z%83%88%00%10%82%88%89%8C%8D%831%1F!%00%3B";
var barnotico="data:image/gif,GIF89a%10%00%0F%00%84%01%00%00%00%00%10%0E%10%AC%03%00%A0%80Y%DB%AE%00%EA%B2%00%F8%AEg%DB%CC%00%FF%C3%03%F9%C8s%DC%D6%5B%FE%D5%03%D9%D9%D9%ED%E3c%FB%E0n%FE%F0%07%FD%EBy%EF%EA%C8%F9%F4c%F6%EF%CB%F8%F6%D6%FB%F8%CC%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10%10%0E%10!%F9%04%01%0A%00%1F%00%2C%00%00%00%00%10%00%0F%00%00%05m%E0'%8E%22%60%0C%00%F9%01l%0BT%83%E0~%01e%DB%00%05%25%00%13M%94%40MB%CC%ED%00%0AEC%B2%10R%24%0Fc%22p%20%14%88%CDan%C0%3B%1C%96X%A7%040p%20%95%C4%B0%96U-%20%1E%08%F5S%A2%F0.%88%8F%87%3C%0DN%A7%B3s%08o%82pqLbxzyP%7B~%8Ej%0B%91%92%93%93%014B%98%99%99%1F!%00%3B";
var barhauptico="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0B%08%06%00%00%00%A0G%D7%5C%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DB%03%06%10%24%2B%97%94%D8%D6%00%00%00%1DiTXtComment%00%00%00%00%00Created%20with%20GIMPd.e%07%00%00%02%20IDAT(%CF5%92KHTa%00F%CF%BD%FFu%AE%F8%E86%9AY%C3LHB%A0%ADB%B2%89%22%0A%8B%16B%12%E1F%91%04i%D3%A2MR%90%ABZ%B8%EAAd%09%11%09S!%ED%CA20%8BB%0CLZ%B4J%09m%C4nNS%A9%F3%BA%93%F7%F9%B7%98%3C%9B%C3%B7%3E%9F%D2z%0Afg%00%B6%E8(%B9(%01P%191Q%A4%8D*%01%01%5E%00%AA%04%D7%01O%02%EB%C4%0F%80%86%A4%84%C8E%E7%3Eq%A3%B8%81%DE%DD%BBrk%FEk%BD%89%9A%A6%BE%16%D6s%E0X%06%B0%15%02%DBF%C5%C4%C7%D6D%00%80%8E%5B%D981i5%C7%E3%C4%9E%26%88%D9N%DA%CC%17%A8%F3%5C%D0C%98%95UY%BBP%C8%EA%D3%1F%60j%9A%9B%99%3C3%22%D2%88%5Ec%10%7F%92p%2F%EDi%A4%26%080%7C%89%7B%A4%8D7%D1%9D%EC%5BIQ%D5%7F%85%C4%EDa%7Dt1%E9%CF%F5%F5%D2v%E28-%2F%C6%99%11%DBb4%3C~%C4%A0%B7A%A4%FB%1CC%15%3AFs%13%BB*%CA1%8A%1B%ACvv%12%AD%AEf%FB%D4%FB%D8%E7%E5%E5L%CEq%A8%3At%90%DD%CF_2%A1)%A0%5B%16%B5c%AFXH.%84%DF%5D%1Bt%16%CF%9C%B6%86%BA%BA%08%1F%3B%C9%B3%9E%1E%8C%8EvZ%8E%1E%5E%BA%1E%0E%93%B4%1DB%96%C5%9A%12%E0h(%A0%AA%AC-%24y%BD%A3~%BD%BCu%3Fz*%0D%86AmO%17%7B%EF%DEc%F2%C2y%8A%1Fg)L%BE%E5%CE%97y~%14%0A%D8%CDM%7C%D7P%20%08%A8%BB%3A%40%BFZFFz%FC%F9%BDF%FE%DB%12%F9%90%A08%94%A8%1B%1D%19Q%1F%A2%E0%23m%13%E9%DB%88%3C%8A%82%D4%00%3B%14%C2%CC%E6i%18%1Bg%F9%FE%03%86s%05-EP.A%B3P%DC%14%02%F7%7FP%09%02%A1%96%86V%A6a%B6wp%F1g%3A%12%02%F9%17%E9%AC%80%E7%94%DA%03%BE%DC%7CB%09%15%7C_%03%3CTOb%F7%9De%11%F9kN%C8%D4%92%60%D5%16d%252%2B%85%9F%91%82%2C%82%2Cl%3A%B0%18%B8%EC%E1%B8%F0%0F%14%FB%F7E%E4%E6%FE%06%00%00%00%00IEND%AEB%60%82";
//green bg: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%06%00%00%00%3B%D6%95J%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DB%02%1A%0F(%19%C3%23%E3%80%00%00%00%1DiTXtComment%00%00%00%00%00Created%20with%20GIMPd.e%07%00%00%02%AEIDAT(%CFE%92Mh%5Ce%18F%CF%FB%FD%CC%9D%B4%99L%12%5B%DA%18ZP%90%C6%EE%AA%D4%0E%01%05%15%C5%A2%E2%A6nDA%A8%0B%5D%14%AA%0BQ%14)%82%0B%A1%E2B%B4%0A%12%FCC(X%F1%0F%11%DB%AA%A5%04%0DR%C5%8D%D9X%2B%816%1D5%ED%CC%9DLr%EFw%BF%FB%BD.%82%F4l%CE%F6%3C%F0%08%60n%DD%CF%C7%8D%11%DAb%08%E2)%B1%04%B1%04%1C%D1(%26Ux%12%9E%9Af%AA%F0e%C1%89s%A7y%CF%DDr%1F%C7%0F%3C%C0%E2%F3%2Fg%FB0A1%08%CE%18P%87%88%00BR%83%8A%C1%00%C1%BBW_*%82%26NI%E7A%BE%FFi%C1%D7%F8v%891%05%DE%AD%93%D9%12kK%8CT%08B%24%A3%8A%19E%D5Dc%930%D8%DC%D9WZ%A7%82%11%A9%82%C6%E0%84%7C%5CK%19%25M%F501CH%60%A0V%87%A8'U%96Z%BDHY%8B%E0%0C%0A%80%88%CD%D7%7F%FF%95%5D%E7~%D4%5D3%3B.%8D3L%D3%AC-%8Fm%DBtq2%D3K-%86k%93%84%D1)b%A3%85%22%9A%10g%14A%11%ADF%DB%DF%9E%5C%5D%E9th%1F%FF%90%99%10%BAu%3E%A0%AE%23d%1E%DD%DC%EA%DB%C1j%3F%CD%CF3%3Cs%96Fo%40)%B7%ED%E7l%B1%86%BEv%94%EB%C7%C7p%B1F%AD%83%3B%EEf%F1%D9%A7%B9%CE%3A%FC%1Bos%F9%DF%2BMn%9F-%FC%2BG%B8!%CBpO%1Eb%C9n%D9%C9%C1%8F%3E%60g%2CI%8F%3E%C1%F9MM%D2%EE%19FGF0k%05%3C%7C%80-c-%EC%99%1Fv%B4%96%96%FA%C3%10%88%B3%1DZ_%7CE.%7B%EEb%FE%D8%5BL%7Fr%82%95%A3%AFO%AC%23%A1%FA%ED%E7%E1%8DI%D1%3B%EF%E5%8F%D3%DFp%93%26%B4%9F%13''%F0EI%0A%01%3D%FC%0C%CB%0E%01c%D0%F3%17%88S%DB%AFV%7B%F7%D2%B8%DC%25%B4%DB%B8%C7%1Ea%E2%CDct%0F%3D%C5%D6%85%05%F2%93%DF%B1%BE%B8HX%1D%A2%BBo%A6%E9%14%24%258%F2%02%DB%ADCR%8D%FE%B3B%F8%F3%02%85w%E8%DC%FB%5B%EB%B99%F37%82%40%09%9A%1Ab%F3R%04q%00%0D%8F%E9%E7T_~%CD%95w%DE%A5%9F%0F%BCA%9B%0E%B5%06%A9%C0%22%80%02%02F%8DA%00%5C%C3%C3%FD%0F%F1%D7rw%DA%22%0948%A8%15%A8%B1%92H%BA%F1%84%FF%11%B4%AE%9D%87%88%89%09%0E%3E%CE%E7h7Y%5D%AE%2C%2BXz%22%DA%C3%A6%ABXzb%E9%89l%18%D2%AA%7F%F1%B9%F8Y%A8%E8%0A%60%F6%DC%C3%A7%99g%1B%D7%DA%AEYP%12ll%06U4V%F0%CB)f%FF%03%3D%A5A%3D%23%3D-%F4%00%00%00%00IEND%AEB%60%82";

function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');
            body = doc.createElement('body');
			body.innerHTML =  responseDetails.responseText;
			html.appendChild(body);

          // html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
        }
    });
}


function getElementsByClassName(classname, node) {
    if(!node){node = document.getElementsByTagName("body")[0];}
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++){
		if(re.test(els[i].className)){a.push(els[i]);}
	}
    return a;
}
function addGlobalStyle(css) {
    var head = document.getElementsByTagName("head")[0];
    if (!head){return;}
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;

    head.appendChild(style);
	return style
}
var sty
function layouter(){ 
	var newdiv=document.createElement('div');
	newdiv.id="devbar";
	newdiv.height='20px;';

	newdiv.innerHTML=""+
		"<ul><a href='"+ hauptlink +"'><li class='devbreit'><img src=\""+ barhauptico +"\" /></li></a><li class='devbreit'><a href='http://my.deviantart.com/messages/#view=notices'>" +
		"<img src=\""+ barhotico +"\"> <span class='devam' id='devnote' >0</span></a>"+
		"<ul><li><a href='http://my.deviantart.com/messages/#view=hottopics'><div id=\"devnote1\">Hot topics</div></a></li>"+
		"<li><a href='http://my.deviantart.com/messages/#view=contests'><div id=\"devnote2\">Contests</div></a></li>"+
		"<li><a href='http://my.deviantart.com/messages/#view=bulletins'><div id=\"devnote3\">Bulletins</div></a></li></ul>"+
		"</li><li class='devbreit'><a href='http://my.deviantart.com/messages/#view=deviations'>" +
		"<img src=\""+ bardevico +"\"> <span class='devam' id='devdev'>0</span></a>"+
		"</li><li class='devbreit'><a href='http://my.deviantart.com/messages/#view=deviantwatch'>" +
		"<img src=\""+ barmesico +"\"> <span class='devam' id='devmes' >0</span></a>"+
		"<ul><li><a href='http://my.deviantart.com/messages/#view=journals'><div id=\"devmes1\">Journals</div></a></li>"+
		"<li><a href='http://my.deviantart.com/messages/#view=critiques'><div id=\"devmes2\">Critiques</div></a></li>"+
		"<li><a href='http://my.deviantart.com/messages/#view=news'><div id=\"devmes3\">News</div></a></li>"+
		"<li><a href='http://my.deviantart.com/messages/#view=polls'><div id=\"devmes4\">Polls</div></a></li>"+
		"</ul>"+
		"</li><li class='devbreit'><a href='http://my.deviantart.com/messages/#view=feedback'>" +
		"<img src=\""+ barcomico +"\"> <span class='devam' id='devfeed'>0</span></a>"+
		"<ul><li><a href='http://my.deviantart.com/messages/#view=comments'><div id=\"devfeed1\">Comments</div></a></li>"+
		"<li><a href='http://my.deviantart.com/messages/#view=replies'><div id=\"devfeed2\">Replies</div></a></li>"+
		"<li><a href='http://my.deviantart.com/messages/#view=activity'><div id=\"devfeed3\">Activities</div></a></li>"+
		"<li><a href='http://my.deviantart.com/messages/#view=activity'><div id=\"devfeed4\">Own Critiques</div></a></li>"+
		"<li><a href='http://my.deviantart.com/messages/#view=correspondence'><div id=\"devfeed5\">Correspondence</div></a></li></ul>"+
		"</li><li class='devbreit'><a href='http://my.deviantart.com/notes/'>" +
		"<img src=\""+ barnotico +"\"> <span class='devam' id='devnach'>0</span></a>"+
		"<ul><li><a href='http://my.deviantart.com/notes/#1_0'><div id='devnach1'>Inbox</div></a></li>"+
		"<li><a href='http://my.deviantart.com/notes/#2_0'><div id='devnach2'>Send Notes</div></a></li>"+
		"<li><a href='http://my.deviantart.com/notes/#new-note'><div id='devnach3'>Create new Note</div></a></li>"+
		"</ul></li></ul>";
	document.body.insertBefore(newdiv, document.body.firstChild);
	sty = addGlobalStyle("body {height:100%;}" +
		"#devbar {text-align:center!important;width:500px!important;margin:0 0 0 0px!important;position:fixed!important;bottom:0px!important;left:0px!important;z-index:999999!important;}\n"+

		"#devbar ul {list-style-type:none!important;border-top-left-radius:25px!important;border-top-right-radius:25px!important;"+
		"background-image:" + backicon + "!important;background-repeat:repeat-x!important;font:bold 14px Helvetica!important;margin:0 0 0 0px!important;"+
		"width:500px!important;padding:5px!important;height:10px!important;}\n"+
		"#devbar ul li{padding-left:7px!important;float:left!important;margin:0!important;font:bold 14px Helvetica!important;}\n"+
		"#devbar ul li:hover ul, #devbar ul a:hover ul{visibility:visible!important;}\n"+
		"#devbar ul ul{visibility:hidden!important;position:absolute!important;height:0px!important;left:0px!important;}\n"+
		"#devbar ul ul li{margin-top:-42px!important; float:none!important;margin-bottom:5px!important;"+
		"background-image:"+ backicon +"; border-color:"+ textcol +"!important;-moz-border-radius: 25px!important; border-style:solid!important;"+
		"border-width: 1px 2px 2px 1px!important; color:"+ textcol +"!important;}"+
		"#devbar ul ul li:last-child {border-top-left-radius: 15px;border-top-right-radius: 15px;}"+
		"#devbar ul ul li:hover{border-color:#C00!important;color:#92b89e!important;}\n"+
		"#devbar a{color:"+ textcol +"!important;text-decoration:none!important;}\n"+
		"#devbar a:hover{color:#e1ef46!important;background:none!important;}\n"+
		"#devbar ul li a{padding-top:5px!important;}"+
		"#devbar ul li a img{border-style:none!important;height:15px!important;margin-bottom:-1px!important;margin-top:-2px!important;}\n"+
		".devam {margin-left:5px!important;font-weight:bold!important; color:"+ textcol +"!important;}"+
		"#devnote{color:"+ textcol +" !important;}#devdev{color:"+ textcol +" !important;}#devmes{color:"+ textcol +" !important;}#devfeed{color:"+ textcol +" !important;}#devnach{color:" + textcol + " !important;}");
		verschw();
		verschw();
		setTimeout(su, 100);
}
function pInt(zahl){
	var a = parseInt(zahl);
	if(a*0!=0){a=0;}
	return a;
}

function verschw(){

	if(pInt(GM_getValue('devvisib'))!=0){
		document.getElementById('devbar').style.height="20px";
		GM_setValue('devvisib',0);

	}else{
		document.getElementById('devbar').style.height="0px";
		GM_setValue('devvisib',1);
	}
}
function su(){
	if(GM_getValue('devein')==""){return;}
	if(alt==""){setTimeout(su,500);return;}

	var newwidth = 10;
	var a =alt;
	// var a =getElementsByClassName('devbreit',document);
	for (var i =0;i< a.length;i++){
	// newwidth += a[i].offsetWidth;
	newwidth += ((pInt(a[i])>9)?Math.floor(Math.log(pInt(a[i]))/Math.log(10)):1)*7;
	}
	newwidth+=10*(a.length-1);
	// GM_log(newwidth);
	var labst = (window.innerWidth -newwidth)/ 2-20;
	sty.innerHTML=sty.innerHTML.replace(/center!important;width:\d+px!important;margin:0 0 0 .+?px!important;/,"center!important;width:" + newwidth+ "px!important;margin:0 0 0 "+ labst + "px!important;");
	sty.innerHTML=sty.innerHTML.replace(/Helvetica!important;margin:0 0 0 0px!important;width:\d+/,"Helvetica!important;margin:0 0 0 0px!important;width:" + newwidth);
}
// function su(){
	// var newwidth = 10;
	// var a =getElementsByClassName('devbreit',document);

	// for (var i =0;i< a.length;i++){
	// newwidth += a[i].offsetWidth;

	// }


	// var labst = (window.innerWidth -newwidth)/ 2-20;
	// sty.innerHTML=sty.innerHTML.replace(/center!important;width:\d+px!important;margin:0 0 0 .+?px!important;/,"center!important;width:" + newwidth+ "px!important;margin:0 0 0 "+ labst + "px!important;");
	// sty.innerHTML=sty.innerHTML.replace(/Helvetica!important;margin:0 0 0 0px!important;width:\d+/,"Helvetica!important;margin:0 0 0 0px!important;width:" + newwidth);
// }

function aktualisieren(){
	//parsing DIFI
	var inboxId=GM_getValue('devuser');
	var queryStr = "?"+
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:fb_comments:0:0:f\"]&"+				// 3.1 main comments
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:fb_replies:0:0:f\"]&"+					// 3.2 main replies
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:notes_unread:0:0:f\"]&"+				// 4 unread notes
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:notices:0:0:f\"]&"+					// 0.1 hot topics
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:contests:0:0:f\"]&"+					// 0.2 contest announcements
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:fb_activity:0:0:f\"]&"+				// 3.3 main activity
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:fb_critiques:0:0:f\"]&"+				// 5->3.5 critiques on your own art
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:correspondence:0:0:f\"]&"+				// 5->3.4 correspondences - people asking for your art in groups/muro "send file"
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=deviations\"]&"+		// 1 devWATCH - deviations
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=forums\"]&"+			// 2.3 devWATCH - forums responses (no news anymore!)
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=journals\"]&"+		// 2.1 devWATCH - journals
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=polls\"]&"+			// 2.4 devWATCH - polls
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:devwatch:0:0:f:tg=critiques\"]&"+		// 2.2 devWATCH - watched critiques from people
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:bulletins:0:0:f\"]&"+					// 0.3 bulletins from groups
	"c[]=\"MessageCenter\",\"get_views\",[\""+inboxId+"\",\"oq:zendesk:0:0:f\"]";			// zendesk replies;	
	var b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	GM_xmlhttpRequest({
        method: 'GET',
        url: 
		"http://www.deviantart.com/global/difi.php" + queryStr + "&t=json",
        onload: function (responseDetails) {
			if(responseDetails.responseText.search('"status":"FAIL"')!=-1){
				usersearch();
				einsetz(b);

				GM_setValue('devtext',b.join('+'));
			}else{
				b = responseDetails.responseText.match(/"matches":"\d+"/ig);
				
				for(var i=0;i<b.length;i++){
				b[i]=b[i].substring(11,b[i].length-1);

				}
				// GM_log(b);

				einsetz(b);
				GM_setValue('devtext',b.join('+'));
			}
		}
    });
	
	////Parsing source-Code
	// getDOC("http://my.deviantart.com/messages/#" ,function (doc) {
	// var a=getElementsByClassName('oh-l',doc);
	// var b=[];
	// var d1=/(<a.*?href="http:\/\/my\.deviantart\.com\/messages\/#view=notices")(.*?)([\d,]+?)(<\/a>)/.exec(doc.body.innerHTML);
	// var d2=/(<a.*?href="http:\/\/my\.deviantart\.com\/messages\/#view=deviations")(.*?)([\d,]+?)(<\/a>)/.exec(doc.body.innerHTML);
	// var d3=/(<a.*?href="http:\/\/my\.deviantart\.com\/messages\/#view=deviantwatch")(.*?)([\d,]+?)(<\/a>)/.exec(doc.body.innerHTML);
	// var d4=/(<a.*?href="http:\/\/my\.deviantart\.com\/messages\/#view=feedback")(.*?)([\d,]+?)(<\/a>)/.exec(doc.body.innerHTML);
	// var d5=/(<a.*?href="http:\/\/my\.deviantart\.com\/notes\/")(.*?)([\d,]+?)(<\/a>)/.exec(doc.body.innerHTML);	
	
	// if(d1==null){b.push(0);}else{b.push(d1[3]);}
	// if(d2==null){b.push(0);}else{b.push(d2[3]);}
	// if(d3==null){b.push(0);}else{b.push(d3[3]);}
	// if(d4==null){b.push(0);}else{b.push(d4[3]);}
	// if(d5==null){b.push(0);}else{b.push(d5[3]);}

	// document.getElementById('devnote').innerHTML=b[0];
	// document.getElementById('devdev').innerHTML=b[1];
	// document.getElementById('devmes').innerHTML=b[2];
	// document.getElementById('devfeed').innerHTML=b[3];
	// document.getElementById('devnach').innerHTML=b[4];		
	
	// var c=GM_getValue('devtext').split('+');
	// if (c[0]<b[0]){	sty.innerHTML=sty.innerHTML.replace('#devnote{color:'+ textcol + ' !important;}','#devnote{color:'+akthighcol+' !important;}');menuhigh(0,doc);}
	// if (c[1]<b[1]){	sty.innerHTML=sty.innerHTML.replace('#devdev{color:'+ textcol + ' !important;}','#devdev{color:'+akthighcol+' !important;}');menuhigh(1,doc);}
	// if (c[2]<b[2]){sty.innerHTML=sty.innerHTML.replace('#devmes{color:'+ textcol + ' !important;}','#devmes{color:'+akthighcol+' !important;}');menuhigh(2,doc);}
	// if (c[3]<b[3]){sty.innerHTML=sty.innerHTML.replace('#devfeed{color:'+ textcol + ' !important;}','#devfeed{color:'+akthighcol+' !important;}');menuhigh(3,doc);}
	// if (c[4]<b[4]){sty.innerHTML=sty.innerHTML.replace('#devnach{color:'+ textcol + ' !important;}','#devnach{color:'+akthighcol+' !important;}');menuhigh(4,doc);}
	
	//	});	
}

// function menuhigh(typ, doc){

	// //initialize zuletzt!
	// var wichtig = doc.body.innerHTML.substring(doc.body.innerHTML.indexOf('DWait.ready(["jms\/pages\/messages.js"]'),doc.body.innerHTML.indexOf(" <div id=\"depths\" class=\"slim-mode\">")).replace(/\"\d+,oq:/g,String.fromCharCode(21)).split(String.fromCharCode(21));
	// // All in section is ... but not all ... is in section! only first 5 pages... so no total counting!
	// // 1->admin
	// // 2->hot topic
	// // 3->contests
	// // 4->bulletins
	// // 5->deviations
	// // 6->compilations (?)
	// // 7->critiques
	// // 8->news
	// // 9->journals
	// // 10->polls
	// // 11->fb_critiques
	// // 12->fb_comments
	// // 13->fb_replies
	// // 14->fb_activity
	// // 15->zendesk (?)
	// // 16->correspondence
	// // 17->notes_unread
	// var zuletzt;
	// if (GM_getValue("devbar_subcat")){
	// zuletzt  = GM_getValue("devbar_subcat").split(String.fromCharCode(21));
	// }else{
	// zuletzt =[,,,,,,,,,,,,,,,,,];
	// }
	// switch (typ) {
		// case 1: break;//Devs - no subcat
			// // suche nach ".deviantart.com/art/"
		// case 2: //
			// var jornletzt = wichtig[9].match(/\w+\.deviantart\.com\/(journal|blog)\/\d+/i); //journals
			// var critletzt = wichtig[7].match(/\w+\.deviantart\.com\/critique\/\d+/i); //critique
			// // news?
			// var pollletzt = wichtig[1].match(/\w+\.deviantart\.com\/journal\/poll\/\d+/i); //polls
			
			// if(jornletzt && jornletzt[0]!=zuletzt[9]){zuletzt[9]=jornletzt[0];document.getElementById('devmes1').style.cssText='color:'+ akthighcol + '!important;';}
			// if(critletzt && critletzt[0]!=zuletzt[7]){zuletzt[7]=critletzt[0];document.getElementById('devmes2').style.cssText='color:'+ akthighcol + '!important;';;}
			// if(pollletzt && pollletzt[0]!=zuletzt[1]){zuletzt[1]=pollletzt[0];document.getElementById('devmes4').style.cssText='color:'+ akthighcol + '!important;';;}
			// break;
		// case 0:
			// var hotoletzt = wichtig[2].match(/\w+\.deviantart\.com\/article\/\d+/i); //hot topics
			// // bulletins?
			// // contests?
			
			// if(hotoletzt && hotoletzt[0]!=zuletzt[2]){zuletzt[2]=hotoletzt[0];document.getElementById('devnote1').style.cssText='color:'+ akthighcol + '!important;';;}
			// break;
		// case 3:
			// var commletzt = wichtig[12].match(/'reportSpam', \[\d+, \d+, \d+\]/i); //comments
			// var replletzt = wichtig[13].match(/'reportSpam', \[\d+, \d+, \d+\]/i); //replies
			// var aktiletzt = wichtig[14].match(/"ts":"\d+"/i); //activities			
			// // support?
			
			// if(commletzt && commletzt[0]!=zuletzt[12]){zuletzt[12]=commletzt[0];document.getElementById('devfeed1').style.cssText='color:'+ akthighcol + '!important;';}
			// if(replletzt && replletzt[0]!=zuletzt[13]){zuletzt[13]=replletzt[0];document.getElementById('devfeed2').style.cssText='color:'+ akthighcol + '!important;';}
			// if(aktiletzt && aktiletzt[0]!=zuletzt[14]){zuletzt[14]=aktiletzt[0];document.getElementById('devfeed3').style.cssText='color:'+ akthighcol + '!important;';}
			// break;
		// case 4:
			// // always inbox
			// document.getElementById('devnach1').style.cssText='color:'+ akthighcol + '!important;';
			// break;
	// }
	// GM_setValue("devbar_subcat",zuletzt.join(String.fromCharCode(21)));
// }

// function einsetz(a){
	// alt =GM_getValue('devtext').split('+');
	// if(!a){a=alt;}
	// if (a.length<13){a=alt;}
	// document.getElementById('devnote').innerHTML=(parseInt(a[3])+parseInt(a[4])+parseInt(a[13]));
	// document.getElementById('devdev').innerHTML=a[8];
	// document.getElementById('devmes').innerHTML=(parseInt(a[9])+parseInt(a[10])+parseInt(a[11])+parseInt(a[12]));
	// document.getElementById('devfeed').innerHTML=(parseInt(a[0])+parseInt(a[1])+parseInt(a[5])+parseInt(a[6])+parseInt(a[7]));
	// document.getElementById('devnach').innerHTML=a[2];

	
	// document.getElementById('devnote1').innerHTML='<span style="position:absolute;right:15px;">' + a[3] + "</span>Hot topics";
	// document.getElementById('devnote2').innerHTML='<span style="position:absolute;right:15px;">' + a[4] + "</span>Contests";
	// document.getElementById('devnote3').innerHTML='<span style="position:absolute;right:15px;">' + a[13] + "</span>Bulletins";

	// document.getElementById('devmes1').innerHTML='<span style="position:absolute;right:15px;">' + a[10] + "</span>Journals";
	// document.getElementById('devmes2').innerHTML='<span style="position:absolute;right:15px;">' + a[12] + "</span>Critiques";
	// document.getElementById('devmes3').innerHTML='<span style="position:absolute;right:15px;">' + a[9] + "</span>News";
	// document.getElementById('devmes4').innerHTML='<span style="position:absolute;right:15px;">' + a[11] + "</span>Polls";

	// document.getElementById('devfeed1').innerHTML='<span style="position:absolute;right:15px;">' + a[0] + "</span>Comments";
	// document.getElementById('devfeed2').innerHTML='<span style="position:absolute;right:15px;">' + a[1] + "</span>Replies";
	// document.getElementById('devfeed3').innerHTML='<span style="position:absolute;right:15px;">' + a[5] + "</span>Activities";
	// document.getElementById('devfeed4').innerHTML='<span style="position:absolute;right:15px;">' + a[6] + "</span>Own Critiques";
	// document.getElementById('devfeed5').innerHTML='<span style="position:absolute;right:15px;">' + a[7] + "</span>Correspondence";

	// su();
	// // Farbe
	// if (alt == a){return;}//SPEED^^
	// if((parseInt(a[3])+parseInt(a[4])+parseInt(a[13]))!=(parseInt(alt[3])+parseInt(alt[4])+parseInt(alt[13]))){document.getElementById('devnote').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[8]!=alt[8]){document.getElementById('devdev').style.cssText='color:'+ akthighcol + '!important;';}
	// if((parseInt(a[9])+parseInt(a[10])+parseInt(a[11])+parseInt(a[12]))!=(parseInt(alt[9])+parseInt(alt[10])+parseInt(alt[11])+parseInt(alt[12]))){document.getElementById('devmes').style.cssText='color:'+ akthighcol + '!important;';}
	// if((parseInt(a[0])+parseInt(a[1])+parseInt(a[5])+parseInt(a[6])+parseInt(a[7]))!=(parseInt(alt[0])+parseInt(alt[1])+parseInt(alt[5])+parseInt(alt[6])+parseInt(alt[7]))){document.getElementById('devfeed').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[2]!=alt[2]){document.getElementById('devnach').style.cssText='color:'+ akthighcol + '!important;';}

	
	// if(a[3]!=alt[3]){document.getElementById('devnote1').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[4]!=alt[4]){document.getElementById('devnote2').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[13]!=alt[13]){document.getElementById('devnote3').style.cssText='color:'+ akthighcol + '!important;';}

	
	// if(a[2]!=alt[2]){document.getElementById('devdev').style.cssText='color:'+ akthighcol + '!important;';}

	
	// if(a[10]!=alt[10]){document.getElementById('devmes1').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[12]!=alt[12]){document.getElementById('devmes2').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[9]!=alt[9]){document.getElementById('devmes3').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[11]!=alt[11]){document.getElementById('devmes4').style.cssText='color:'+ akthighcol + '!important;';}

	
	// if(a[0]!=alt[0]){document.getElementById('devfeed1').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[1]!=alt[1]){document.getElementById('devfeed2').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[5]!=alt[5]){document.getElementById('devfeed3').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[6]!=alt[6]){document.getElementById('devfeed4').style.cssText='color:'+ akthighcol + '!important;';}
	// if(a[7]!=alt[7]){document.getElementById('devfeed5').style.cssText='color:'+ akthighcol + '!important;';}
// }
function einsetz(a){
	alt=GM_getValue('devtext').split('+');
	// GM_log(GM_getValue('devtext'));
	if(!a){a=alt;}else alt=a;
	GM_setValue('devtext',a.join('+'));
	// GM_log(GM_getValue('devtext'));
	if (a.length<13){a=alt;}	
	// if(GM_getValue('devein')=="1"){
		document.getElementById('devnote').innerHTML=(parseInt(a[3])+parseInt(a[4])+parseInt(a[13]));
		document.getElementById('devdev').innerHTML=a[8];
		document.getElementById('devmes').innerHTML=(parseInt(a[9])+parseInt(a[10])+parseInt(a[11])+parseInt(a[12]));
		document.getElementById('devfeed').innerHTML=(parseInt(a[0])+parseInt(a[1])+parseInt(a[5])+parseInt(a[6])+parseInt(a[7]));
		document.getElementById('devnach').innerHTML=a[2];


		document.getElementById('devnote1').innerHTML='<span style="position:absolute;right:15px;">' + a[3] + "</span>Hot topics";
		document.getElementById('devnote2').innerHTML='<span style="position:absolute;right:15px;">' + a[4] + "</span>Contests";
		document.getElementById('devnote3').innerHTML='<span style="position:absolute;right:15px;">' + a[13] + "</span>Bulletins";

		document.getElementById('devmes1').innerHTML='<span style="position:absolute;right:15px;">' + a[10] + "</span>Journals";
		document.getElementById('devmes2').innerHTML='<span style="position:absolute;right:15px;">' + a[12] + "</span>Critiques";
		document.getElementById('devmes3').innerHTML='<span style="position:absolute;right:15px;">' + a[9] + "</span>News";
		document.getElementById('devmes4').innerHTML='<span style="position:absolute;right:15px;">' + a[11] + "</span>Polls";

		document.getElementById('devfeed1').innerHTML='<span style="position:absolute;right:15px;">' + a[0] + "</span>Comments";
		document.getElementById('devfeed2').innerHTML='<span style="position:absolute;right:15px;">' + a[1] + "</span>Replies";
		document.getElementById('devfeed3').innerHTML='<span style="position:absolute;right:15px;">' + a[5] + "</span>Activities";
		document.getElementById('devfeed4').innerHTML='<span style="position:absolute;right:15px;">' + a[6] + "</span>Own Critiques";
		document.getElementById('devfeed5').innerHTML='<span style="position:absolute;right:15px;">' + a[7] + "</span>Correspondence";

		su();
		// Farbe
		if (alt == a){return;}//SPEED^^
		if((parseInt(a[3])+parseInt(a[4])+parseInt(a[13]))!=(parseInt(alt[3])+parseInt(alt[4])+parseInt(alt[13]))){document.getElementById('devnote').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[8]!=alt[8]){document.getElementById('devdev').style.cssText='color:'+ akthighcol + '!important;';}
		if((parseInt(a[9])+parseInt(a[10])+parseInt(a[11])+parseInt(a[12]))!=(parseInt(alt[9])+parseInt(alt[10])+parseInt(alt[11])+parseInt(alt[12]))){document.getElementById('devmes').style.cssText='color:'+ akthighcol + '!important;';}
		if((parseInt(a[0])+parseInt(a[1])+parseInt(a[5])+parseInt(a[6])+parseInt(a[7]))!=(parseInt(alt[0])+parseInt(alt[1])+parseInt(alt[5])+parseInt(alt[6])+parseInt(alt[7]))){document.getElementById('devfeed').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[2]!=alt[2]){document.getElementById('devnach').style.cssText='color:'+ akthighcol + '!important;';}


		if(a[3]!=alt[3]){document.getElementById('devnote1').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[4]!=alt[4]){document.getElementById('devnote2').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[13]!=alt[13]){document.getElementById('devnote3').style.cssText='color:'+ akthighcol + '!important;';}


		if(a[2]!=alt[2]){document.getElementById('devdev').style.cssText='color:'+ akthighcol + '!important;';}


		if(a[10]!=alt[10]){document.getElementById('devmes1').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[12]!=alt[12]){document.getElementById('devmes2').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[9]!=alt[9]){document.getElementById('devmes3').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[11]!=alt[11]){document.getElementById('devmes4').style.cssText='color:'+ akthighcol + '!important;';}


		if(a[0]!=alt[0]){document.getElementById('devfeed1').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[1]!=alt[1]){document.getElementById('devfeed2').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[5]!=alt[5]){document.getElementById('devfeed3').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[6]!=alt[6]){document.getElementById('devfeed4').style.cssText='color:'+ akthighcol + '!important;';}
		if(a[7]!=alt[7]){document.getElementById('devfeed5').style.cssText='color:'+ akthighcol + '!important;';}
	// }
	var i=0;
	while (i<a.length){
		if(a[i]!=alt[i]){document.getElementById('devbar').getElementsByTagName("ul")[0].style.cssText="background-image:" + varbackico + "!important;";neu=true;return}
		if(a[i]!=alt[i]){document.getElementById('devbar').getElementsByTagName("ul")[0].style.cssText="background-image:" + varbackico + "!important;";neu=true;return}
		i++;
	}
}
function timer(){		
	if(ins){setTimeout(aktualisieren,0);}else{ins=true;einsetz();}
	GM_setValue('devakt',new Date().getTime()+'');	
}
function keyHandler(e){
	if (e.which ==78 &&e.altKey){verschw();return false;}else{return true;}
}

function optionwindow(){
	var opt = document.createElement('div');
	var colytostr;
	if(akthigh=='true'){colytostr='checked="checked"';}else{colytostr='';}
	opt.id="devopts";
	opt.setAttribute('style',"font:10pt Verdana,Arial,Helvetica,sans-serif!important;background-color:#FFF;left:"+ ((window.innerWidth - 300)/2 - 20) +"px;top:"+ ((window.innerHeight - 350)/2 - 20) +"px;width:300px;height:350px;padding:10px;border:1px double black;position:absolute;");
	opt.innerHTML="<h2 align='center'>Options</h2>"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Time untill reload</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input type='text' value='"+ wartezeit +"' id='devoptwait' style='width:50px;background-color:#FFFFFF;' /> (min. 5s)<br>10000 -> 10s</div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Highlight Changes</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input type='checkbox' "+ colytostr +"' id='devoptcoly'/></div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Highlight Color</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input type='text' value='"+ akthighcol +"' id='devoptcolc' style='width:70px;background-color:#FFFFFF;' /> <br />(like #123FED)</div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Text Color</div>"+
	"<div style='width:130px;padding-bottom:10px;padding-right:10px;float:right;'><input type='text' value='"+ textcol +"' id='devopttexc' style='width:70px;background-color:#FFFFFF;' /><br />(like #123FED)</div>"+
	"<br style='clear:both;' />"+
	"<div style='width:150px;padding-bottom:10px;float:left;'>Main-Icon-Link</div>"+
	"<div style='width:280px;padding-bottom:10px;padding-right:10px;float:right;'><input type='text' value='"+ hauptlink +"' id='devoptmain' style='width:280px;background-color:#FFFFFF;' /></div>"+
	"<br style='clear:both;' /><br />"+
	"<input type='button' value='Save' id='devoptsav' style='margin-left:30px;' />"+
	"<input type='button' value='Default' id='devoptdef' style='margin-left:30px;' />"+
	"<input type='button' value='Cancel' id='devoptcan' style='margin-left:30px;' />";
	document.body.appendChild(opt);	
	document.getElementById('devoptsav').addEventListener('click', optsav, false);
	 document.getElementById('devoptdef').addEventListener('click', optdef, false);
	 document.getElementById('devoptcan').addEventListener('click', optcan, false);
}
function optdef(){
	document.getElementById('devoptwait').value='10000';
	document.getElementById('devoptcoly').checked=true;
	document.getElementById('devoptcolc').value="#ff7878";
	document.getElementById('devopttexc').value="#BBD99C";
	document.getElementById('devoptmain').value="http://www.deviantart.com";
}
function optcan(){
	document.body.removeChild(document.getElementById("devopts"));
}
function optsav(){
	var a=[];		
	var wait = document.getElementById('devoptwait');
	var coly = document.getElementById('devoptcoly');
	var colc = document.getElementById('devoptcolc');
	var texc = document.getElementById('devopttexc');
	var maino = document.getElementById('devoptmain');
	wait.style.backgroundColor = "#FFFFFF";
	colc.style.backgroundColor = "#FFFFFF";
	texc.style.backgroundColor = "#FFFFFF";
	maino.style.backgroundColor = "#FFFFFF";
	if (wait.value < 5000){wait.style.backgroundColor = "#FF0000";return;}else{a.push(wait.value);}
	a.push(coly.checked);
	var csspatt = /#(([0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f])|([0-9a-f][0-9a-f][0-9a-f]))/i;
	if (!colc.value.match(csspatt)){colc.style.backgroundColor = "#FF0000";return;}else{a.push(colc.value.match(csspatt)[0]);}
	if (!texc.value.match(csspatt)){texc.style.backgroundColor = "#FF0000";return;}else{a.push(texc.value.match(csspatt)[0]);}
	var httppat=/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
	if (!maino.value.match(httppat)){maino.style.backgroundColor = "#FF0000";return;}else{a.push(maino.value.match(httppat)[0]);}

	GM_setValue('devconf',a.join(String.fromCharCode(21)));
	optload();
	document.body.removeChild(document.getElementById("devopts"));
	document.body.removeChild(document.getElementById("devbar"));
	layouter();
	// timer();
}
function optload(){
	if (GM_getValue('devconf')){
	var opts = GM_getValue('devconf').split(String.fromCharCode(21));
	wartezeit=opts[0];
	akthigh=opts[1];
	akthighcol=opts[2];	
	textcol=opts[3];
	hauptlink=opts[4];
	}
}
function usersearch(){
GM_xmlhttpRequest({
        method: 'GET',
        url: "http://my.deviantart.com/messages/#",
        onload: function (responseDetails) {
			userid = /{"(\d+),oq:/.exec(responseDetails.responseText)[1];

			GM_setValue('devuser',userid);
			if((pInt(GM_getValue('devakt')) + wartezeit)>pInt(new Date().getTime())){
				einsetz();
				ins=false;
				// timer();
			}else{
			// timer();
			}
		}
    });
}
//######START!
if(window.self == window.top ){

if(GM_getValue('devvers')!="2.2"){
	GM_setValue('devuser','')
	GM_setValue('devvisib','');
	GM_setValue('devakt','');
	GM_setValue('devtext','');
	GM_setValue('devconf','');
	GM_setValue('devvers',"2.2");
}
optload();
window.addEventListener('keydown', keyHandler, false);
window.addEventListener('resize', su, false);
layouter();
GM_registerMenuCommand("Disable/Enable Devbar", verschw,"N","","D");
GM_registerMenuCommand("Configurate Devbar", optionwindow);


setInterval(timer, wartezeit);
timer();
if (GM_getValue('devuser')==''){
	usersearch();
}else{
if((pInt(GM_getValue('devakt')) + wartezeit)>pInt(new Date().getTime())){
	einsetz();
	ins=false;
	// timer();
}else{
// timer();
}}}}