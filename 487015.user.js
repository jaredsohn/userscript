// ==UserScript==
// @name       Captcha Counter
// @version    0.3
// @match      https://www.mturk.com/mturk/*
// @copyright  2014+, Tjololo
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

var hitId = "";
if (document.getElementsByName("hitId")[0])
    hitId = document.getElementsByName("hitId")[0].value;
var captchanum = 35;
if (GM_getValue("captcha_number")){
    captchanum = GM_getValue("captcha_number");
}
var count = 0;
if (GM_getValue("captcha_counter")){
    count = GM_getValue("captcha_counter");
    console.log("Count: "+count);
}


if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
        };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
        };
}

if(window.location.href.indexOf("accept") > -1) {
    if ($('input[name="userCaptchaResponse"]').length > 0) {
    	count = 0;
    	GM_setValue("captcha_counter",count);
        console.log("Captcha found: "+count);
	}
    else{
    	if (hitId != "" && $('div[class="message error"]').length == 0){
	        console.log("Accepted Hit");
	        count+=1;
	        GM_setValue("captcha_counter",count);
            console.log((captchanum-count)+" hits left until captcha!");
            if (count == captchanum)
                alert("Next hit is a captcha!");
	        //alert((captchanum-count)+" hits left until captcha!");
	    }
	    else{
	        console.log("No hit accepted");
	    }
    }
    
}
if (captchanum-count == 1)
    captchaCountStr = (captchanum-count)+" hit left until captcha!";
else if (captchanum-count == 0)
    captchaCountStr = "Last hit before captcha!";
else
    captchaCountStr = (captchanum-count)+" hits left until captcha!";

var row = document.createElement("tr");
var cell = document.createElement("td");
var table = $('#theTime').parents('table')[0];
cell.className = "title_orange_text";
cell.setAttribute("align","left");
cell.setAttribute("valign","top");
cell.setAttribute("nowrap","");
cell.style.paddingTop = "3px";
cell.style.paddingLeft = "5px";
cell.addEventListener("click", function clickCell(e) {
    var num_str=prompt("How many hits do you accept before you get a captcha? Note: This includes returns","35");
    var num = parseint(num_str);
    if (num){
        GM_setValue("captcha_number",num);
    	alert("Captcha number saved as "+num);
    }
});
cell.innerHTML="<b>Captcha:</b> <span>"+captchaCountStr+"</span>";
row.appendChild(cell);
table.appendChild(row);