    // ==UserScript==

// @name        travian attack waves builder (arabic)

// @author      oke

// @TRANSLATED BY       3MOUDY

// @email       amoudy82@hotmail.com

// @Team       BuShiDo3   server9

// @version     0.1.0

// @source      http://userscripts.org/scripts/show/49249

// @include 	http://*.travian*.*/*.php*

// @exclude 	http://*.travian*.*/hilfe.php*

// @exclude  	http://*.travian*.*/log*.php*

// @exclude 	http://*.travian*.*/form_count.php*

// @exclude 	http://*.travian*.*/anleitung.php*

// @exclude 	http://*.travian*.*/impressum.php*

// @exclude 	http://*.travian*.*/anmelden.php*

// @exclude 	http://*.travian*.*/gutscheine.php*

// @exclude 	http://*.travian*.*/spielregeln.php*

// @exclude 	http://*.travian*.*/links.php*

// @exclude 	http://*.travian*.*/geschichte.php*

// @exclude 	http://*.travian*.*/tutorial.php*

// @exclude 	http://*.travian*.*/manual.php*

// @exclude 	http://*.travian*.*/ajax.php*

// @exclude 	http://*.travian*.*/ad/*

// @exclude 	http://*.travian*.*/chat/*

// @exclude 	http://forum.travian*.*

// @exclude 	http://board.travian*.*

// @exclude 	http://shop.travian*.*

// @exclude 	http://*.travian*.*/activate.php*

// @exclude 	http://*.travian*.*/support.php*

// @exclude  	http://help.travian*.*/*log

// @exclude     *.css

// @exclude     *.js

// ==/UserScript==



document.getElementsByClassName = function(clsName){

    var retVal = new Array();

    var elements = document.getElementsByTagName("*");

    for(var i = 0;i < elements.length;i++){

        if(elements[i].className.indexOf(" ") >= 0){

            var classes = elements[i].className.split(" ");

            for(var j = 0;j < classes.length;j++){

                if(classes[j] == clsName)

                    retVal.push(elements[i]);

            }

        }

        else if(elements[i].className == clsName)

            retVal.push(elements[i]);

    }

    return retVal;

}



var injector = function(url) {

	var s = document.createElement('script');

	s.src = url;

	document.getElementsByTagName('head')[0].appendChild(s);

};

//injector("http://s1.travian.co.id/mt-full.js");



function setEvent( obj, type, fn ) {

  if ( obj.attachEvent ) {

    obj['e'+type+fn] = fn;

    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}

    obj.attachEvent( 'on'+type, obj[type+fn] );

  } else

    obj.addEventListener( type, fn, false );

}



var form_count = 1;





var html = '<br><div id="s_time"></div><div id="wave"><div id="form_'+ form_count +'">' +

	'<table id="troops">' +

	'<tr><td>وقت الهجمة:</td><td><input type="text" class="text time_attack" name="time_attack" style="width:50px" id="time_attack"></td></tr>' +

	'<tr><td>الارسال:</td><td><input type="text" class="text disabled" name="input" style="width:350px" id="input"></td></tr>' +

	'<tr><td>الرد</td><td><input type="text" class="text disabled" name="output" style="width:350px" id="output"></td></tr>' +

	'<tr><td>الوقت المقدر للوصول</td><td><div id="arrive_in"></div></td></tr>' +

	'<tr><td>القوات سوف تصل في :</td><td><div id="arrive_at"></div></td></tr>' +

	'</table>' +

	'</div></div><br>' +

'<input type="button" name="btn_eta" value="هجمة آخرى" id="btn_eta">' +

'<input type="button" name="btn_attack" value="اهجم الآن" id="btn_attack">' +

'<div id="err"></div>';



var attackInterface = document.createElement("div");

attackInterface.innerHTML = html;

var interfaceStart = document.evaluate(

	"//form[@action='a2b.php'][@name='snd']",

	document,

	null,

	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

	null);



interfaceStart = interfaceStart.snapshotItem(0);

//alert(interfaceStart.parentNode.parentNode.id);

var InGameDiv = interfaceStart.parentNode;

InGameDiv.insertBefore(attackInterface, interfaceStart.nextSibling);



var DID = getActiveDid();

var referenceSeconds = 0;

var numberattacks = 0;

var timedAttacktimer = new Array();
var form_data = new Array();

timerIntervalId = 0;

var btn_eta = document.getElementById("btn_eta");

var btn_attack = document.getElementById("btn_attack");

var btn_wave = document.getElementById("btn_wave");

var pulled = pulleddoc = ex = err = tag = sTim = aTim = t = h = m = s = minutes = seconds = at = st = ta = null;

var x = new Array();

// event start here //

function btnAddEvent(ind){

	newdiv = document.createElement('div');

	html =

	'<br>' +

	'<div id="form_'+ ind +'">' +

	'<table id="troops">' +

	'<tr><td>وقت الهجمة </td><td><input type="text" class="text time_attack" name="time_attack" style="width:50px" id="time_attack"></td></tr>' +

	'<tr><td>الارسال:</td><td><input type="text" class="text disabled" name="input" style="width:350px" id="input"></td></tr>' +

	'<tr><td>الاستجابة:</td><td><input type="text" class="text disabled" name="output" style="width:350px" id="output"></td></tr>' +

	'<tr><td>الوقت المقدر للوصول</td><td><div id="arrive_in"></div></td></tr>' +

	'<tr><td>القوات سوف تصل في :</td><td><div id="arrive_at"></div></td></tr>' +

	'</table>' +

	'</div>';



	newdiv.innerHTML = html;

	document.getElementById('wave').appendChild(newdiv);



}



function btnEtaEvent(){

	f = interfaceStart;

	val = getFormElements(f);

	btnAddEvent(form_count+1);
	form_data[form_count] = new Array();

	setInput(val, form_count);

	getArrivalTime(val, form_count);
	form_count++;

}



function btnAttackEvent(){

	var v = new Array();



		for(i = 1; i < form_count; i++){

			var ex = "//div[@id='form_"+ i +"']//input[@id='output'][@name='output']";

			var output = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

			output = output.snapshotItem(0);

			if(output.value != ""){

				v[i] = output.value;

			}

		}
		for ( var ind in v ){
	        //alert(v.length +"="+ v[ind]);

    		post3(document.location.href.split('?')[0], v[ind] );

	    }

}



function timeAttackEvent(first){

	var f = document.getElementsByClassName("time_attack");

	f[form_count-1].addEventListener('change',function(e){

		v = this.value;

		if(v.match(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/i)){

			setTimeAttack(this);
		}else{

			alert("format jam salah")

		}

	},false);

}



try{

	btn_eta.addEventListener('click',function(e){btnEtaEvent();  timeAttackEvent(false);},false);

	btn_attack.addEventListener('click',function(e){btnAttackEvent();},false);

	//btn_wave.addEventListener('click',function(e){btnAddEvent()},true);

	//window.addEvent('domready', function(){alert("ttes");});

	window.addEventListener('load', function(e){timeAttackEvent(true);}, false);



	//time_attack.addEventListener('change',function(e){timeAttackEvent(this.value)},true);



}catch(e){

	alert(e);

}

//event end here//



function post3 (url, data) {

	GM_xmlhttpRequest({

		method: "POST",

		url: url,

		headers:{'Content-type':'application/x-www-form-urlencoded'},

		data:encodeURI(data),

		onload: function(responseDetails) {



				numberattacks++;

				addCount("<a href='build.php?id=39'>تم ارسال  "+numberattacks+" من "+ (form_count-1) +" قطار</a><br/>");  //legg inn delay her



		}

	});

}



function getArrivalTime(data, ind) {

	tempWaveNumber = 0;



	var tempUrl = document.location.href.split('?')[0] + '?' +DID;

	var tempPostvar = data;



	GM_xmlhttpRequest({

		method: "POST",

		url: tempUrl,

		headers:{'Content-type':'application/x-www-form-urlencoded'},

		data:encodeURI(tempPostvar),

		onload: function(responseDetails)

		{

			pulled = document.createElement('div');

			pulled.innerHTML = responseDetails.responseText;



			var pulleddoc = document.implementation.createDocument("", "", null);

			pulleddoc.appendChild(pulled);



			ex = ".//p[@class='error']";

			err = pulleddoc.evaluate(ex,pulled,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);



			ex = ".//div[@class='in']";

			tag = pulleddoc.evaluate(ex,pulled,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);



			if (tag.snapshotLength && !err.snapshotLength){

				sTim = tag.snapshotItem(0).textContent;

				aTim = sTim.match(/([0-9]{1,2}):([0-9]{2}):([0-9]{2})/i);

                setArriveIn(aTim[1].replace(/\b(\d)\b/g, '0$1')+":"+aTim[2].replace(/\b(\d)\b/g, '0$1')+":"+aTim[3].replace(/\b(\d)\b/g, '0$1'), ind);



				f = pulleddoc.evaluate("//form[@action='a2b.php']",	pulled,	null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);

                f = f.snapshotItem(0);

				val = getFormElements(f);

				setOutput(val, ind);


				try{

					clearInterval(timerIntervalId);

					timerIntervalId = setInterval(function(){arrivalCounter()},100);

					arrivalCounter();

				}catch(e){

					alert(e);

				}

			}else{

				errorMsg ("cannot send request form");

				alert(err.snapshotItem(0).textContent);

				catchError();

			}

		}

	});

}



function arrivalCounter() {

	try{

		var st = getServerTime();



		for ( i = 1; i < form_count; i++ ){



			var at = getArriveAt(i);

			var aad=0;



			s = (at.getSeconds()+1)%60;

			if(at.getSeconds()+1==60)

				aad=1;



			m = at.getMinutes()+aad;

			h = at.getHours();



			if (form_data[i]["time_attack"]) {

				ta = new Date(form_data[i]["time_attack"]);
				if(at.getTime() == ta.getTime()){
					post3(document.location.href.split('?')[0], form_data[i]["output"]);
					form_data[i]["time_attack"] = false;

				}

			}
			setArriveAt(at, i);
		}

	}catch(e){alert(e)}

}


function setOutput(val, ind){

	var ex = "//div[@id='form_"+ ind +"']//input[@id='output'][@name='output']";

	var output = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	output = output.snapshotItem(0);

	output.value = val;
	form_data[ind]["output"] = val;

}



function setInput(val, ind){

	var ex = "//div[@id='form_"+ ind +"']//input[@id='input'][@name='input']";

	var input = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	input = input.snapshotItem(0);

	input.value = val;
	form_data[ind]["input"] = val;

}


function setTimeAttack(content){
    ex = "../../../../../..";

	tag = document.evaluate(ex, content, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (tag.snapshotLength){

		div = tag.snapshotItem(0).innerHTML;

		div = div.match(/form_([0-9]{1,2})/i);

		no = div[0].replace(/form_/, '');
		time = (content.value).match(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/i);
		form_data[no]["time_attack"] = getMsTime(time) - 3000;
        data = getFormElements(interfaceStart);
	    getArrivalTime(data, no);

		//form_data[no]["time_attack"] = content.value;
		//alert(new Date(form_data[no]["time_attack"]).toString() +" / "+ form_data[no]["arrive_at"]+"="+(new Date(form_data[no]["arrive_at"])).toLocaleString()+" / "+form_data[no]["arrive_in"]+"="+(new Date(form_data[no]["arrive_in"])).toLocaleString());

	}
}


function setArriveAt(val, ind){

	var ex = "//div[@id='form_"+ ind +"']//div[@id='arrive_at']";

	var div = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (div.snapshotLength){

		//div.snapshotItem(0).innerHTML = getStringTime(val);
		div.snapshotItem(0).innerHTML = val;
		//form_data[ind]["arrive_at"] = val.getTime();

	}

}



function setArriveIn(val, ind){

	var ex = "//div[@id='form_"+ ind +"']//div[@id='arrive_in']";

	var div = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (div.snapshotLength){

		div = div.snapshotItem(0);

		div.innerHTML = val;
		t = val.match(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/i);
		form_data[ind]["arrive_in"] = parseInt(t[1],10)*60*60+parseInt(t[2],10)*60+parseInt(t[3],10);

	}

}

function getArriveIn(ind){

	return form_data[ind]["arrive_in"];
}

function getArriveAt(ind){
    st = getServerTime();

	at = getArriveIn(ind);
	return new Date(st + at * 1000 - 1000);
}

function getStringTime(t){
    return t.getHours().toString().replace(/\b(\d)\b/g, '0$1') +":"+
    t.getMinutes().toString().replace(/\b(\d)\b/g, '0$1') +":"+
    t.getSeconds().toString().replace(/\b(\d)\b/g, '0$1');
}

function getMsTime(t) {
    d = new Date();
    d.setHours(t[1]);
    d.setMinutes(t[2]);
    d.setSeconds(t[3]);
    d.setMilliseconds(0);
    return d.getTime();
}


function getActiveDid() {

	try{

        ex = "//td[@class='dot hl']/following-sibling::td[position()=1]/a[1]";

        tag = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



		if (tag.snapshotLength){

			temp = tag.snapshotItem(0).href.split("?")[1].split('&');

			return temp[0];

		}else{

			errorMsg("unable to get active village");

			return "";

		}

	}catch(e){ alert(e) }

}



function switchActiveVillage(did) {

	if(!did) { return; }

	GM_xmlhttpRequest({method: "GET",url: 'http://' + document.domain + "/dorf1.php?"+did,headers:{'Content-type':'application/x-www-form-urlencoded'}});

	return;

}



function errorMsg (msg) {

	errDiv = document.getElementById('err');

	errDiv.innerHTML = errDiv.innerHTML +  "<br><b>error</b> " + msg;

}



function addCount(msg, br){

	countDiv = document.getElementById('err');

	countDiv.innerHTML = countDiv.innerHTML + (countDiv.innerHTML && br ? '<br>' : '')+msg;

}



function sysTime(){

	var syst=new Date()

	document.getElementById('s_time').innerHTML="server time: " + syst.toLocaleTimeString()

}



function getFormElements(f){

	var v = new Array();

	for(i=0; i<f.elements.length; i++){

		if(f.elements[i].type == "radio" && f.elements[i].checked == true){

			v[i] = f.elements[i].name +"="+ f.elements[i].value;

		}else if(f.elements[i].type == "text" || f.elements[i].type == "hidden"){

			v[i] = f.elements[i].name +"="+ f.elements[i].value;

		}

	}

	return v.join('&');

}



function getServerTime(){
    var sTime = document.evaluate("id('tp1')", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    sTime = sTime.snapshotItem(0).textContent;

    var aMatch = sTime.match(/^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/i);

    var hours = minutes = seconds = 0;

    var sDate = new Date();

    var ad = 1;

    sDate.setHours((parseInt(aMatch[1]) + ((sDate.getSeconds >= (60-ad) && sDate.getMinutes >= 59) ? 1 : 0)) % 24);

    sDate.setMinutes((parseInt(aMatch[2]) + ((sDate.getSeconds >= (60-ad)) ? 1 : 0)) % 60);

    sDate.setSeconds((parseInt(aMatch[3]) ) % 60);

    sDate.setMilliseconds(0);
    return sDate.getTime();
}


function catchError(){

	window.location.reload();

}




