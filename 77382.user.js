// ==UserScript==
// @name           Devtoolbar V2
// @description    Deviantart
// @namespace      devbar
// @include        *
// @exclude		   *deviantart*
// @version        2.1
// @contributor    dotSilver
// ==/UserScript==

// This script was created by Dediggefedde
// and has been highly modified by dotSilver.
// http://dot-silver.deviantart.com 

var logobild="<div id='devinfoimg'><img src='http://www.digitalflow.org/dABar/dA.jpg' /></div><div id='devinfotext'>";//HTML-Logo
	
function laden(){
	var wartezeit=10000; //10 Sekunden
	setTimeout(laden, wartezeit);
	var nun = new Date();
	if((pInt(GM_getValue('devakt'))+wartezeit)<pInt(nun.getTime())){
		var x=1;
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://my.deviantart.com/messages/',
				onload: function(responseDetails){
					if(responseDetails.status==403){
						if(GM_getValue('devLogin'+x)!=1){GM_setValue('devLogin'+x,1);}
					}else{
							GM_setValue('devakt',new Date().getTime()+'');
							if(GM_getValue('devLogin'+x)){GM_deleteValue('devLogin'+x);}
							var patterndev=/\d+","display_class":\[("stack",)?"deviation","thumbnail"/ig;
							var patternjorn=/\d+","watching":true,"app":"deviantWATCH"/ig;
							var patterncom=/original_type":"comment_parent","stack_count":"\d+/ig;
							var patternpoll=/\d+","display_class":\["poll","text",/ig;
							var patternfav=/"ts":"\d+","stack_count":"\d+/ig;
							var texx =responseDetails.responseText;
							var amountdev = addid(texx.match(patterndev))+0;
							var amountjorn = addid(texx.match(patternjorn))+0;
							var amountpoll = addid(texx.match(patternpoll))+0;
							var amountcom = addidlast(texx.match(patterncom))+0;
							var amountfav = addidlast(texx.match(patternfav))+0;
							var amountnote = texx.split("display_class\":[\"note\",\"line").length-1;
							var amountbadge = texx.split("display_class\":[\"badge\",\"activity").length-1;
							var amountcont = texx.split("display_class\":[\"contest\",\"text").length-1;
							var amountnews = texx.split("display_class\":[\"news\",\"text").length-1;
							if(amountfav==0){amountfav=texx.split("display_class\":[\"collect\",\"activity").length-1;}
							if(amountdev==0){amountdev=texx.split("display_class\":[\"deviation").length-1;}
							amountcom+=texx.split("display_class\":[\"comment\",").length-1;
							if(amountjorn==0){amountjorn=texx.split("display_class\":[\"journal").length-1;}
							if(amountpoll==0){amountpoll=texx.split("display_class\":[\"poll").length-1;}
							var amount = new Array(new Array(amountdev,"Deviation","messages/#view=deviations"),new Array(amountjorn,"Journal","messages/#view=journals"),new Array(amountpoll,"Poll","messages/#view=polls"),new Array(amountcom,"Comment","messages/#view=feedback"),new Array(amountnote,"Note","notes/"),new Array(amountbadge,"Badge","messages/#view=activity"),new Array(amountcont, "Contest","messages/#view=contests"),new Array(amountnews, "Hottopic","messages/#view=hottopics"),new Array(amountfav, "Favorite","messages/#view=activity"));
							var total = amountdev + amountjorn + amountpoll + amountcom + amountfav + amountnote + amountbadge + amountcont + amountnews;
							var texxt = logobild + messer(amount, total) + "</div>";
							document.getElementById('devinfo').innerHTML=texxt;
							GM_setValue('devtext',texxt);
					}		
				}
			});
	}else{
		document.getElementById('devinfo').innerHTML=GM_getValue('devtext');
	}
}
function messer(ress, total){//sums the ressource-array up in a nice text
	var raus = "";
	var plur = "";
	var mehr = "";
	var zwiar=new Array()
	if( total > 0 ) {
		raus += "<a href='http://my.deviantart.com/messages/' target='_blank'><strong>" + total + " Messages:</strong></a>";
	}
	for (var i = 0; i < ress.length; i++){
		if(ress[i][0]!=0){zwiar.push(ress[i]);}
	}
	var anz = zwiar.length-1;
	for (var i = 0; i < zwiar.length-1; i++){
		if(zwiar[i][0]!=0){ 
			if(zwiar[i][0]!=1){plur='s';}else{plur='';}
			raus += "<a href='http://my.deviantart.com/" + zwiar[i][2] +"'>"+ zwiar[i][0] +" "+ zwiar[i][1]+ plur +"</a> ";
		}
	}
	if(anz>=0){
	if(anz>=1){mehr="";}else{mehr="";}
	if(zwiar[i][0]!=1){plur='s';}else{plur='';}
	raus = raus.substr(0,raus.length-2) + mehr + "<a href='http://my.deviantart.com/" + zwiar[anz][2] +"'>"+ zwiar[anz][0] +" "+ zwiar[anz][1]+ plur +"</a>";
	}else{raus="Currently no messages "}
	return raus;
}
function pInt(zahl){ //get Integer from String, empty string->0
var a = parseInt(zahl);
if(a*0!=0){a=0;}
return a;
}
function addid(werte){ //Sum up the leading integer of every Element in a Array. useful for counting the different stack-type-contents...
var aus=0;
var x;
for (x in werte)
  {
  aus+=pInt(werte[x]);
  }
return aus;
}
function addidlast(werte){ //Sum up the by " leading integer at the end of every Element in a Array. useful for counting the different stack-type-contents...
var aus=0;
var x;
for (x in werte)
  {
  aus+=pInt(werte[x].substr(werte[x].lastIndexOf("\"")+1));
  }
return aus;
}
function addGlobalStyle(css) { //Toolbar get its appearence
    var head = document.getElementsByTagName("head")[0];
    if (!head){return;}
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
}
function keyHandler(e){ //you can hide it by pressing alt+n!
if (e.which ==78 &&e.altKey){verschw();return false;}else{return true;}
}
function layouter(){ //Toolbarappearence is defined.
	var devbar =document.createElement('div');//Toolbar
	var anz=pInt(GM_getValue('devLogin1'));//pInt(GM_getValue('devCounter'));//Amount of registered Accounts
	var neustil=''; //New css style
	var inhalt='';//Content of toolbar (elements)
	neustil="#devinfo{width: 100% !important; font-family: Verdana, Arial, Tahoma !important; font-size: 12px !important;height:43px !important;background: url('http://www.digitalflow.org/dABar/background.jpg') repeat-x !important;color:#eaf2ee !important;line-height:20px !important;"
	switch (anz) {
		case 1:
			if(location.href.indexOf('deviantart')!=-1){
				//On Deviantart
				//var speisrc="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%01%FA%8E-%9B%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DA%04%04%12%00%3B%AB%3A%3AD%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%02%ACIDAT8%CB%A5%94_HSq%14%C7%3FwZ%B2%945%91%FE%A0%A3%84%3D%C8z%F0Of%22K_z%89%F6%1C%3D%19%22%96Q%94%88%F4P%B3%97%15%1A%24d%8D%04u*%CD%22d%D0%83%0F%16%14%89Y%3D%04%05%19%FD!_%F6%20%AE%C2%D2%C6%BD%5E6%5D%A7%07%DBm%D7%CD%11v%9E~%F7%FC%BE%F7%7B~%E7%9C%EF9%90b%0A%80%D7%E7%91%C8%97%A95%CFL%C4.%98%20a%CD!O%26T%C3%F1%F7z%26b%97%CB%DD6%01%B0%00%845%87%F4t%BA%D8Y%B2bFf2%19%099%0D%84%05%90%B0%E6%20%C1w*%AA%8B%0DN%25%89%A8%AD_0%FF%EF%0FZ3%07X%92%8E%D3%80%D4%D4%ED%CA%FA%02%09k%0E%F1%FA%3C%12%08%D9%A5%A2%BAXZ%CE%D9%C4T%99%B9e%B7%3C%7C%E0%04%60zr%16M%8B%A3X~%01%C2%F6%A2%0F%0C%F9%E3f%CA%B0%E6%90%99%88%5D%FCA%ABT%EC%2F%16%40%1A%DA%9A%83%26%D0%A24u%2CJSGZ%3D7e-%E3C%5D%C9%B3%D7%E7%11%40%FAG%EBol%08Nf%FD%A7%CA%99%C1%A9%89%8C%84%9Cr%F2%7C%8E)%19%25%09%02%88FU%A6%1E%C7%B0Z%F3%C8%A1%88%97%D3a%06o%25%00%14%05%90%B9e7%E9uL0%FB%E9%1B5n%95%80%3F%AA()%5D!%1AUy%F5%1Ct%3DF%A0%B7%90%CA%9A%25%EE%F4%2F%2B%86%D2%00%A54%7F%0E%9B%AD%80g%8F%5C%00%D4%B8U%03%94Vp%40%BC%3E%8F%94W%95%FCS%C1%05%60%E0%EC%F1%E0fz%22u%87%F6m%18%25M%0F%D9%88f%22v%F1%FA%3C2%12r%8A%B3%ACH%D6%EBe%FD%0B-)%03%40%AA%C8%C2%9AC%C2%9A%C3%00%AA%FA%3C%9DW%EDTT%17%D3%7C%A6%C0%20%3Eu%7B%ECD%DA%86%00%D0B%D7%BB%F2%8F%5D%B8%98J%12%8D%AA%8C%0D%BA%D9%5D%FA%14%AB5%0F%80%1C%8A%E8%BD%A6s%D0%FD%95%C4%AA%95%E1%3E%D5%C4c%F4y%F0%EEZ%A0%DA%C3%E3%06%E1%D8%A0%9B%3De%93%AC%AE%E4%02%90%97g1%EE%92%C4I%7B%FBz%DEPX%EAH%93%AB%EC%E5%C7%CF%F7%86%B3%A7%D3E%C3%91%8F%C6%B7%AE%C7%00%08%DC%2C%A4%B6~%81%D5%F8V%86%FBT%FAG%EB%7B%5B%1B%A7%DB-%00%F7g%3Fw%01%CA%8E%89%B6n%C7%B6%17%D8l%05%D8l%05%A6%EE%E8z%0C%5D%8F%D1%7Di%0B%EF%DE%24%A8%3C%B0%C4%40o%9C%E1%3EU%01%94%D6%C6%E9%F6%C0%BD%A3W%B2%CD%AC%24'%CD%EB%F3%88%3Fh%95%F2%AA%92%E4%22%12%80%8C%04%EB%94%9DQ%3A%5E%9FG%1A%5B%5C%B2%D1%8A%C9J%FC%BF%F6%1B%08%22MH%16%2B%06%C5%00%00%00%00IEND%AEB%60%82";
				//inhalt="<img id='speiid' src="+ speisrc +"/>"; //save cookies
				inhalt="<div id='devinfo'>"+logobild+"Please login first!</div></div>";
				neustil+="padding-left:10px;}"; //#speiid{cursor:pointer;float:left;margin-left:5px;}";
				//A Link to save the cookie and a text.
			}else{
				//Somewhere else
				inhalt+="<div id='devinfo'>"+logobild+"Please visit <a href='http://www.deviantart.com/users/login'>Deviantart</a> to login!</div></div>";
				neustil+="padding-left:10px;}";
				//Link to Deviantart
			}
			break;
		case 0:
			inhalt+="<div id='devinfo'>"+logobild+"Loading. Please wait.</div></div>";
			neustil+="padding-left:10px;}";
			break;
		default:
			inhalt+="<div id='devinfo'>"+logobild+"Error!</div></div>";
			neustil+="padding-left:10px;}";
			break;
	}
	neustil+="#devtoolbar{height:43px !important;margin:0px !important;padding:0px !important;position:fixed !important;bottom:0px !important;left:0px !important;z-index:999999 !important;width:100% !important;}"; //ToolbarCSS
	neustil+="body{height:100% !important; padding-bottom: 43px !important;}";//To set the toolbar at the bottom

	neustil+="#devinfoimg{ display:inline !important;float:left !important;width:136px !important; padding: 0 !important;}";
	neustil+="#devinfotext{ display:inline !important;float:left !important;width:700px !important;margin: 14px 0 !important;text-align:left !important;}";

	neustil+="#devtoolbar a{color:#eaf2ee !important;text-decoration:none !important;font-family: Verdana, Tahoma, Arial !important; font-size: 12px !important;margin: 5px 0 !important;padding: 17px !important;} #devtoolbar a:hover{background: #3d423f !important;}";
	
	var bildres = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%14%08%06%00%00%01%C3%E9%9C%C0%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DA%04%05%16%0B%23%E4%17%B4%60%00%00%01)IDAT(%CF%8D%911K%C3%40%18%86%9F%8B%87%B8%F8%13%C4I%9D%1D%3A%B8%88mA%EA%A6%FF%A6%FFB%FD%09%ED%A0H%07%85%D0%22%8A%1AS%D0%C1!%A3H(%A5%BA%B6i%5Dr%A7%18%CE%A1%A9%A6I%94%3C%E3%7B%EF%F7~w%EF%E1zN%08%20%1Av%D3%00%9F%D2%EF%F7%00%16%01%A0a7%8D%E5%F7%7B%D0%EE%DA%A6%DD%B5%0D%808l%1E%19f%B8%9E%D3%01%10%F1q%24%87%931%C0%82%0C%C6%01%00r4U%10%B7O7%B3I%0D%1CWJ%D5%BAh%5D%B7~%E3%A6%0C%E4(%9EM%B0*%838'%C9O%F8%1C%AE%E7%0C%D2%DAl%BB%01%FCJ%A9%BA%01%60)%1D%A2t(%94%0E%D7%DB%5D%FB%05%40%86Z''%D7%92%25%25y%95J%A9%F4%9E%15%A9tF%14R%CDg%12%2FRY1%CF)%5C%CF%89%80%2F%40%01%13%E0y%7Bsg%2Fc%BCz%BC4%D9B%88%807%E0lw%ABV%07%10%17w%E7yF%12%1Ft%BF_%3E%A8%89%D3%CE%C9%7FF%80w%E0!%F7%E2)%96%81r%EE%B3SX%C0R%11%E3%DF%9D%E5%1BU%D1%C4%8Fb%C6o%8C%1F%90%D4%8F%26%3C%0A%00%00%00%00IEND%AEB%60%82"; //rounded edge
	devbar.innerHTML =inhalt+"<img src="+bildres+" />";//put Elements into Toolbar
	devbar.id="devtoolbar";
	
	addGlobalStyle(neustil);//add CSS-Styles
	document.body.insertBefore(devbar, document.body.firstChild); //create Toolbar
	if(pInt(GM_getValue('devvisib'))!=1){document.getElementById('devtoolbar').style.height="20px";}else{document.getElementById('devtoolbar').style.height="0px";}
	//funktionszuweiser();//adding functions
}
function verschw(){ //hide... show... use GM-Button or alt+n. it will be memorized
	if(pInt(GM_getValue('devvisib'))!=0){
		document.getElementById('devtoolbar').style.height="20px";
		GM_setValue('devvisib',0);
	}else{
		document.getElementById('devtoolbar').style.height="0px";
		GM_setValue('devvisib',1);
	}
}
	if(window!=top){return;} //Don't use it in Framesets. Otherwise each Frameset will include the Toolbar!
	if(GM_getValue('devvers')!="1.2"){ //reset the GM-Values when a new Version comes out!
		GM_setValue('devvisib','');
		GM_setValue('devakt','');
		GM_setValue('devtext','');
		GM_setValue('devvers',"1.2");
	}
	window.addEventListener('keydown', keyHandler, false);
	layouter();
	laden();
	GM_registerMenuCommand("disable/enable Devbar", verschw,"N","","D");