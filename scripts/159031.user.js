// ==UserScript==
// @name           Oracle Grade Copier
// @namespace      Copier
// @description    AMATarlac
// @include        htt*://oraclecampus1.amaes.com/*
// @include        htt*://oraclecampus2.amaes.com/*
// @include        htt*://oraclecampus3.amaes.com/*
// @grant		   none
// @match          http://*.oraclecampus2.amaes.com/*
// @match          https://*.oraclecampus2.amaes.com/*
// @version        1.0
// @encoding       UTF-8
// ==/UserScript==


// ==START COPY==
var bodyy = document.getElementById('DERIVED_LAM_GRADE_1$0').className;
body = document.body;
if(bodyy == "PSEDITBOX") {
	div = document.createElement("div");
	div.id = "toggleText2"
	div.style.position = "fixed";
	div.style.bottom = "+90px";
	div.style.right = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<input id=\"r_pre\" type=\"radio\" name=\"term\" checked=\"checked\">Prelims<input id=\"r_mid\" type=\"radio\" name=\"term\">Midterm<input id=\"r_pref\" type=\"radio\" name=\"term\">PrefinalsQuiz  <a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">START</a>"

	div2 = document.createElement("div");
	div2.style.position = "fixed";
	div2.style.bottom = "+2px";
	div2.style.right = "+6px";
	div2.style.backgroundColor = "#eceff5";
	div2.style.border = "2px solid #94a3c4";
	div2.style.padding = "2px";
	div2.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:toggle()\">Show|Hide</a>"
	
	div3 = document.createElement("div");
	div3.id = "toggleText"
	div3.style.position = "fixed";
	div3.style.bottom = "+120px";
	div3.style.right = "+6px";
	div3.style.backgroundColor = "#eceff5";
	div3.style.border = "2px solid #94a3c4";
	div3.style.padding = "2px";
	div3.innerHTML = "<textarea id=\"textko\" rows=5 cols=30 placeholder=\"Paste records here...\"></textarea>"

	div4 = document.createElement("div");
	div4.id = "toggleText3"
	div4.style.position = "fixed";
	div4.style.bottom = "+60px";
	div4.style.right = "+6px";
	div4.style.backgroundColor = "#eceff5";
	div4.style.border = "2px solid #94a3c4";
	div4.style.padding = "2px";
	div4.innerHTML = "FOR LEC: <input id=\"r_prefcs\" type=\"radio\" name=\"term\">PrefinalCSExam<input id=\"r_finlab\" type=\"radio\" name=\"term\">Finals with LAB<input id=\"r_fin\" type=\"radio\" name=\"term\">Finals without LAB"
	
	div5 = document.createElement("div");
	div5.id = "toggleText4"
	div5.style.position = "fixed";
	div5.style.bottom = "+30px";
	div5.style.right = "+6px";
	div5.style.backgroundColor = "#eceff5";
	div5.style.border = "2px solid #94a3c4";
	div5.style.padding = "2px";
	div5.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:toggle()\">Show|Hide</a>"
	div5.innerHTML = "FOR LAB: <input id=\"r_Lprefcs\" type=\"radio\" name=\"term\">PrefinalCSExam <input id=\"r_Lfinals\" type=\"radio\" name=\"term\">Finals"

	body.appendChild(div);
	body.appendChild(div2);
	body.appendChild(div3);
	body.appendChild(div4);
	body.appendChild(div5);

unsafeWindow.toggle = function() {
	var ele = document.getElementById("toggleText");
	var ele2 = document.getElementById("toggleText2");
	var ele3 = document.getElementById("toggleText3");
	var ele4 = document.getElementById("toggleText4");
	if(ele.style.display == "none") {
    		ele.style.display = "block";
		ele2.style.display = "block";
			ele3.style.display = "block";
	ele4.style.display = "block";
  	}
	else {
		ele.style.display = "none";
		ele2.style.display = "none";
		ele3.style.display = "none";
		ele4.style.display = "none";
	}
};
	
	unsafeWindow.AutoLike = function() {
	
xx = document.getElementsByTagName("input");
var txtcount = 0;
var str = document.getElementById('textko').value;
var n = new Array();
var y = 0;
n[0]="";

for(iii = 0; iii < str.length; iii++) {

if(str.charCodeAt(iii)==9 || str.charCodeAt(iii)==10){
y = y + 1;
n[y]="";
}
else{
n[y] = n[y] + str.charAt(iii);


}


}




var checkme = 1;

for(i = 0; i < xx.length; i++) {
		
if(xx[i].getAttribute("type") == "text")
{

if (checkme == 1 && document.getElementById("r_pre").checked==true) {
var pqs = 0;
pqs = n[txtcount];
txtcount = txtcount + 1;
pqs = parseFloat(pqs) + parseFloat(n[txtcount]);
pqs = (pqs / 2);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = pqs.toFixed(2);
}

else if (checkme == 2 && document.getElementById("r_pre").checked==true) {
var pcs = 0;
pcs = parseFloat(n[txtcount+1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = pcs.toFixed(2);
}

else if (checkme == 3 && document.getElementById("r_pre").checked==true){
var pex = 0;
pex = parseFloat(n[txtcount-1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = pex.toFixed(2);
}

else if (checkme == 4 && document.getElementById("r_mid").checked==true) {
var mqs = 0;
mqs = n[txtcount];
txtcount = txtcount + 1;
mqs = parseFloat(mqs) + parseFloat(n[txtcount]);
mqs = (mqs / 2);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = mqs.toFixed(2);
}

else if (checkme == 5 && document.getElementById("r_mid").checked==true) {
var mcs = 0;
mcs = parseFloat(n[txtcount+1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = mcs.toFixed(2);
}

else if (checkme == 6 && document.getElementById("r_mid").checked==true){
var mex = 0;
mex = parseFloat(n[txtcount-1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = mex.toFixed(2);
}

else if (checkme == 7 && document.getElementById("r_pref").checked==true) {
var pfqs = 0;
pfqs = n[txtcount];
txtcount = txtcount + 1;
pfqs = parseFloat(pfqs) + parseFloat(n[txtcount]);
pfqs = (pfqs / 2);
txtcount = txtcount + 1;
checkme = 1;
xx[i].value = pfqs.toFixed(2);
}

else if (checkme == 1 && document.getElementById("r_prefcs").checked==true) {
var pfcs = 0;
pfcs = parseFloat(n[txtcount+1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = pfcs.toFixed(2);
}


else if (checkme == 2 && document.getElementById("r_prefcs").checked==true){
var pfex = 0;
pfex = parseFloat(n[txtcount-1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = pfex.toFixed(2);
}

else if (checkme == 6 && document.getElementById("r_prefcs").checked==true){
checkme = 1;
}


else if (checkme == 3 && (document.getElementById("r_finlab").checked==true || document.getElementById("r_fin").checked==true || document.getElementById("r_Lfinals").checked==true)) {
var fqs = 0;
fqs = n[txtcount];
txtcount = txtcount + 1;
fqs = parseFloat(fqs) + parseFloat(n[txtcount]);
fqs = (fqs / 2);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = fqs.toFixed(2);
}

else if (checkme == 4 && (document.getElementById("r_finlab").checked==true || document.getElementById("r_fin").checked==true || document.getElementById("r_Lfinals").checked==true)) {
var fcs = 0;
fcs = parseFloat(n[txtcount+1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = fcs.toFixed(2);
}

else if (checkme == 5 && document.getElementById("r_finlab").checked==true){
var fex = 0;
fex = parseFloat(n[txtcount-1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = fex.toFixed(2);
}

else if (checkme == 5 && (document.getElementById("r_fin").checked==true || document.getElementById("r_Lfinals").checked==true)){
var fex = 0;
fex = parseFloat(n[txtcount-1]);
txtcount = txtcount + 1;
checkme = 1;
xx[i].value = fex.toFixed(2);
}

else if (checkme == 6 && document.getElementById("r_finlab").checked==true){
checkme = 1;
}


else if (checkme == 1 && document.getElementById("r_Lprefcs").checked==true) {
var lpfcs = 0;
lpfcs = parseFloat(n[txtcount+1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = lpfcs.toFixed(2);
}


else if (checkme == 2 && document.getElementById("r_Lprefcs").checked==true){
var lpfex = 0;
lpfex = parseFloat(n[txtcount-1]);
txtcount = txtcount + 1;
checkme = checkme + 1;
xx[i].value = lpfex.toFixed(2);
}

else if (checkme == 5 && document.getElementById("r_Lprefcs").checked==true){
checkme = 1;
}


else if (checkme == 7){
checkme = 1;
}

else{
checkme = checkme + 1;
}

}

			
				}




	};
}
// ==============



