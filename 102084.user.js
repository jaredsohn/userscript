// ==UserScript==
// @name           PAPAZ Easy Youtube
// @namespace      *
// @description    Adds some new buttons to facilitate searches on YouTube, plus "Kill List" for playlists and see videos not available in your country.
// @version	3.6
// @include        http://www.youtube.tld/*
// @include        https://www.youtube.tld/*
// ==/UserScript==


var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML =  'var a = new String(document.location);var b = new Array();b = a.split("&search_query=",1);bb = b.join();if(bb==a) { b = a.split("?search_query=",1); qq = "?search_query=";} else {qq = "&search_query=";};c = a.length;d = b[0].length;e = a.substring(d+14, c);var f = new Array();f = e.split("&",1);g = e.length;h = f[0].length;i = e.substring(h+1,g);var k1 = b[0] + qq +  "%22" + f + "%22" + "&" + i;var k2 = b[0] + qq +  f + "&search_sort=video_date_uploaded&" + i;var k3 = b[0] + qq + f + "&hl=en-GB&"  + i;var k4 = b[0] + qq +  "%22" + f + "%22 sample" + "&" + i;var k5 = b[0] + qq +  "%22" + f + "%22 gameplay" + "&" + i;var k6 = "http://www.tubemirror.com/video/" + a.substr(31);var k7 = a.substring(0,a.indexOf("&"));function MakePhrase() {  window.content.location = k1  ;  };var k8 = "http://www.youtube.com/all_comments?&v=" + a.substr(80) + "&maturemode=yes";function MakePhrase() {  window.content.location = k1  ;  };function PDFs() {  window.content.location = k2  ;  };function Fora() {  window.content.location = k3  ;  };function Trailer() {  window.content.location = k4  ;  };function Gameplay() {  window.content.location = k5  ;  };function QuiteTube() {  window.content.location = k6; };function KillList() {  window.content.location = k7; };function Age() {  window.content.location = k8; }'


document.getElementsByTagName("head")[0].appendChild(scriptElement);
window.addButton = function () {

	var targetDiv = document.getElementById('yt-masthead-container'); //tsf, mngb, alerts
	

	
	var aUrl = window.location.href;
	
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'Phraser');
	
	var inputButton1 = document.createElement('input');
	inputButton1.name = 'inputButton';
	inputButton1.type = 'button';
	inputButton1.value = 'Phrase';
	inputButton1.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: rgb(255,255,130);color: #B31804; width: 90px; border:1px solid; border-left-width: 1px;border-color: #777777; ');
	inputButton1.setAttribute("onclick", "MakePhrase();");

	var inputButton2 = document.createElement('input');
	inputButton2.name = 'PhraseButton';
	inputButton2.type = 'button';
	inputButton2.value = 'Sort by Date';
	inputButton2.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #CCDDEB;color: #0000A5; width: 90px; border:1px solid; border-left-width: 0px;border-color: #777777; ');
	inputButton2.setAttribute("onclick", "PDFs();");

	//var inputButton3 = document.createElement('input');
	//inputButton3.name = 'PhraseButton';
	//inputButton3.type = 'button';
	//inputButton3.value = 'English';
	//inputButton3.setAttribute("onclick", "Fora();");

	var inputButton4 = document.createElement('input');
	inputButton4.name = 'PhraseButton';
	inputButton4.type = 'button';
	inputButton4.value = 'Sample';
	inputButton4.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #EDF55B;color: #000065; width: 90px; border:1px solid; border-left-width: 0px;border-color: #777777; ');
	inputButton4.setAttribute("onclick", "Trailer();");

	var inputButton5 = document.createElement('input');
	inputButton5.name = 'PhraseButton';
	inputButton5.type = 'button';
	inputButton5.value = 'Gameplay';
	inputButton5.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #FFCABA; color: #A80000; width: 90px; border:1px solid; border-left-width: 0px;border-color: #777777; ');
	inputButton5.setAttribute("onclick", "Gameplay();");

	var inputButton6 = document.createElement('input');
	inputButton6.name = 'PhraseButton';
	inputButton6.type = 'button';
	inputButton6.value = 'TubeMirror';
	inputButton6.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #EDF55B;color: #0000A5; width: 90px; border:1px solid; border-left-width: 1px;border-color: #777777; ');
	inputButton6.setAttribute("onclick", "QuiteTube();");
	
	var inputButton7 = document.createElement('input');
	inputButton7.name = 'PhraseButton';
	inputButton7.type = 'button';
	inputButton7.value = 'Kill List';
	inputButton7.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #EDF55B;color: #0000A5; width: 90px; border:1px solid; border-left-width: 0px;border-color: #777777; ');
	inputButton7.setAttribute("onclick", "KillList();");
	
	var inputButton8 = document.createElement('input');
	inputButton8.name = 'PhraseButton';
	inputButton8.type = 'button';
	inputButton8.value = '18+';
	inputButton8.setAttribute('style', 'margin-top:5px;font-size:12px;background-color: #EDF55B;color: #0000A5; width: 90px; border:1px solid; border-left-width: 0px;border-color: #777777; ');
	inputButton8.setAttribute("onclick", "Age();");
	
	
	if (aUrl.match("search_query")) {
	newDiv.appendChild(inputButton1); 
	newDiv.appendChild(inputButton2); 
	//newDiv.appendChild(inputButton3); 
	newDiv.appendChild(inputButton4); 
	newDiv.appendChild(inputButton5); 
	}else{ 
	newDiv.appendChild(inputButton6);
  newDiv.appendChild(inputButton7);
  newDiv.appendChild(inputButton8);
}
	targetDiv.appendChild(newDiv);
}
 
addButton();

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('a.papaz {font-weight: bold !important; color: #000088 !important; background-color: #EEFF50 !important; border: 2px solid  #228400 !important; padding-top:2px; padding-bottom:2px; padding-right:4px;padding-left:4px;}; ');


//addGlobalStyle('a.author {font-weight: bold !important; color: #000088 !important; background-color: #EEFF50 !important; border: 2px solid  #228400 !important; padding-top:2px; padding-bottom:2px; padding-right:4px;padding-left:4px;}; ');



// I get the name of the o.p.

//var op = document.getElementById("watch-username").getElementsByTagName("strong")[0].innerHTML;

//if (op.length<3) {var op = document.getElementById("watch-userbanner").getElementsByName("title")[0].innerHTML;};

var op = document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].innerHTML;

//alert(op);

// Σκεπτικό μου είναι να σαρώσω όλους τους author, να συγκρίνω το όνομα κι αν ταιριάζει να αλλάξω το class se papaz

var poster = document.getElementsByClassName("yt-user-name ");
//alert(poster.length);
	

for(i=1;i<poster.length; i++)
{
post1=document.getElementsByClassName("yt-user-name ")[i].innerHTML; // exei to url me to youtube gia ayto ebala to .innerhtml kai egine string kai mono to onoma!!!
post2=document.getElementsByClassName("author ")[i].getElementsByClassName("yt-user-name ")[0].innerHTML;
//alert(post);
//alert(op);
//if (post==op) {poster[i].style.color="red";};
if (post1==op) {poster[i].className="papaz";};
if (post2==op) {poster[i].className="papaz";};
};
