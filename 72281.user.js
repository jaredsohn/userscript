// ==UserScript==
// @name           Aggiungi Vicini Farmville
// @description    Aggiungi i vicini di farmville
// @include        http://apps.facebook.com/onthefarm/neighbors.php*
// @copyright      Sisko
// @author         Sisko
// @version        1.0
// @require        http://sizzlemctwizzle.com/updater.php?id=72281
// ==/UserScript==

var versione = '1.0';
var procedi = true;
var logo= '<img id="hc_icon_here" src=http://img404.imageshack.us/img404/6315/logo3ar.jpg' + ' alt="HC Logo" hspace="0" vspace="0" align="left" border="0">';

(function() {
var head = document.getElementsByTagName('head')[0], 
    style = document.createElement('style'), 
    css = '#right_column { width: 77% !important; }' +
          ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
          ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
          ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
          '.PYMK_Reqs_Sidebar, .LSplitPage_Right { display:' +
          ' none !important; } #wallpage { width: 700px !important; }' +
          ' .LSplitView_ContentWithNoLeftColumn, ' +
          '.FN_feedbackview { width: 100% !important; }';
if (!head || self.location != top.location) {return}
style.type = 'text/css';
try {style.innerHTML = css}
catch(x) {style.innerText = css}
head.appendChild(style);
})();

function primo(i) { 
document.getElementById('app102452128776_neighbor_all_cont').children[0].children[i].getElementsByClassName('inputbutton request_form_submit')[0].click();
window.setTimeout(secondo, 2000);
}

function secondo() { 
if(document.getElementsByClassName('UIButton_Text')[0].value=="OK"){ 
	procedi = false;
	document.getElementById('messaggio').innerHTML = "RICHIESTE ESAURITE";
}
var a = document.getElementsByClassName('UIButton_Text')[0];
a.click();
}

function parti() { 

	var n = document.getElementById('app102452128776_neighbor_all_cont').children[0].children.length;

  for (var i=0; ((i< n) && (procedi)) ; i++ ) {
		var livello = parseInt(document.getElementById('app102452128776_neighbor_all_cont').children[0].children[i].getElementsByTagName('span')[0].innerHTML);
		var ribbon = parseInt(document.getElementById('app102452128776_neighbor_all_cont').children[0].children[i].getElementsByTagName('span')[1].innerHTML);
		var vicini = parseInt(document.getElementById('app102452128776_neighbor_all_cont').children[0].children[i].getElementsByTagName('span')[2].innerHTML);
		if(livello > 0)
			window.setTimeout(primo(i), 2000);
  };


}

var outFrame = '<table border="0" cellspacing="0" cellpadding="2"><tr><td id="data" width="47">' + logo + '</td><td><h2><b>Aggiungi <br>Vicini <br>Farmville<br>&nbsp&nbsp&nbsp v. '+versione+'<br><img id="hc_my" src=http://img104.imageshack.us/img104/3499/imgjy.png></b></h2></td></tr><tr><td colspan="2"><center><h2 id="messaggio" style="color:red">ATTIVO</h2></center></td></tr></table>';

var outData=document.createElement("div");
	outData.setAttribute("style", "border: 3px solid rgb(59, 89, 152); padding: 5px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; position: fixed; right: 150px; top: 70px; width: 150px;");

	outData.innerHTML=outFrame;

document.body.appendChild(outData);
window.setTimeout(parti, 2000);
