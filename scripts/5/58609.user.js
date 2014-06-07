// ==UserScript==
// @name        travian attack waves builder
// @author      oke
// @email       XKX@W.CN
// @version     0.2.3
// @source      http://userscripts.org/scripts/show/49249
// @include 	http://*.travian*.*/a2b.php*
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

var form_count = 0;


var html = '<br><div style="border:1px dashed #C0C0C0; padding:8px; background-color:#FFFFFF;">'+
'<div style="padding-bottom:8px;"><span style="float:left; width:40%">Debug:</span> <input type="checkbox" name="debug" value="1" id="debug"></div>'+
'<div style="padding-bottom:8px;"><span style="float:left; width:40%">Time delay beetwen waves:</span> <input type="text" class="text" name="timebetween" value="100" maxlength="4" style="width:40px" id="timebetween"> in ms (experimental)</div>'+
'<div style="padding-bottom:8px;"><span style="float:left; width:40%">Amount of waves:</span> <input type="text" class="text" name="amount" value="1" maxlength="2" style="width:20px" id="amount"> (experimental)</div>'+
'<input type="button" name="btn_eta" value="GET ETA" id="btn_eta">' +
'<input type="button" name="btn_attack" value="ATTACK NOW !" id="btn_attack"></div>' +
'<br><div id="s_time"></div><div id="wave"></div>' +
'<br><div id="err"></div>';

var attackInterface = document.createElement("div");
attackInterface.innerHTML = html;
var interfaceStart = document.evaluate(
	"//form[@action='a2b.php'][@name='snd']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

interfaceStart = interfaceStart.snapshotItem(0);
var InGameDiv = interfaceStart.parentNode;
InGameDiv.insertBefore(attackInterface, interfaceStart.nextSibling);

var debug = false;
var timebetween = 100;
var amount = 1;
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
function btnAddEvent(tbl, data, ind){
	newdiv = document.createElement('div');
	html = '<div id="form_'+ ind +'" ><table id="short_info"><tr><th>Attack at:</th><td><input type="text" style="width:80px" class="text" name="date_attack">&nbsp;<input type="text" style="width:50px" class="text" name="time_attack"><input type="hidden" name="input" value="'+data+'">&nbsp;&nbsp;<span id="div_time_attack"></div></td></tr><tr><th></th><td style="font-style:italic;font-size:13px;">&nbsp;&nbsp;dd-mm-yyyy&nbsp;&nbsp;&nbsp;hh:mm:ss</td></tr></table><form class="frmHeader" action="#" method="post">' + tbl + '</form></div><br/>';
	newdiv.innerHTML = html;
	document.getElementById('wave').appendChild(newdiv);
	
	ex = "//div[@id='form_"+ ind +"']//input[@id='btn_ok'][@name='s1']";
    f = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
	f = f.snapshotItem(0);
	f.type = 'hidden';
}

function timeAttackEvent(){
    ex = "//div[@id='form_"+ form_count +"']//input[@name='time_attack']";
    f = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
	f = f.snapshotItem(0);
	f.addEventListener('change',function(e){	
	    try{		
		    setTimeAttack(this);
		}catch(e){alert(e)}
	},false);
	
	ex = "//div[@id='form_"+ form_count +"']//input[@name='date_attack']";
    d = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
	d = d.snapshotItem(0);
	d.addEventListener('change',function(e){	
	    try{		
		    setTimeAttack(this);
		}catch(e){alert(e)}
	},false);
}

function catasEvent(){
    ex = "//div[@id='form_"+ form_count +"']//select[@class='dropdown']";
    tag = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		

	if(tag.snapshotLength){
	    for(var i = 0; i < tag.snapshotLength; i++){
	        f = tag.snapshotItem(i);
	        f.addEventListener('change',function(e){
	            try{
                    f_div = document.evaluate("../../../../../../..", this, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    f = document.evaluate("../../../../..", this, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (f_div.snapshotLength && f.snapshotLength ){
                        f_div = f_div.snapshotItem(0).innerHTML;
	                    div = f_div.match(/form_([0-9]{1,2})/i);
	                    no = div[0].replace(/form_/, '');	    
	                    
	                    form_data[no]["output"] = getFormElements(f.snapshotItem(0));
                    }
	            }catch(e){
			        alert("catas event : "+e);
		        }finally{
		            logMsg('.: get data form '+no+' :.');
                    logMsg('input data  : '+form_data[no]["input"]);
                    logMsg('output data : '+form_data[no]["output"]);
                    logMsg('arrive in   : '+form_data[no]["arrive_in"]);
                    logMsg('arrive at   : '+form_data[no]["arrive_at"]);
                    logMsg('time attack : '+form_data[no]["time_attack"] + "<hr>");
                    
		        }
	        },false);
	    }
	}
}


try{
    var index_amount = 1;
	btn_eta.addEventListener('click',function(e){
	    //getArrivalTime();
	    
	    if( index_amount <= amount ){
	        getArrivalTime();
	        index_amount++;
	        setTimeout(function(){btn_eta.click()},10000);            
	    }else{
	        index_amount = 1;
	    }
	},false);
	
	var index = 1;
	btn_attack.addEventListener('click',function(e){
	    //for( var i in form_data ){		    
		    //post3(document.location.href.split('?')[0], form_data[i]["output"] )
	    //}
	    
	    if( index < form_data.length ){
	        //logMsg(form_data.length +" = "+ index +" = "+ form_data[index]["output"]);
            post3(document.location.href.split('?')[0], form_data[index]["output"] );
            reloadForm(index);
            //alert(index +"="+ form_data.length +"="+ form_data[index]["input"]);
            index++;            
	        setTimeout(function(){btn_attack.click()},timebetween);            
	    }else{
	        index = 1;
	    }
	},false);
	document.getElementById("debug").addEventListener('click',function(e){ debug = this.checked;},false);
	document.getElementById("timebetween").addEventListener('change',function(e){ 
	    if(this.value > 0)
	        timebetween = this.value; 
	    else
	        timebetween = 100; 
    },false);
    document.getElementById("amount").addEventListener('change',function(e){ 
	    if(this.value > 0)
	        amount = this.value; 
	    else
	        amount = 1; 
    },false);
    
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
			addCount("<a href='build.php?id=39'>Send "+numberattacks+" of "+ (form_count) +" waves</a><br/>");  //legg inn delay her					
		}
	});
}

function getArrivalTime() {
    form_count++;
	f = interfaceStart;
	data = getFormElements(f);
	ind = form_count;
	//btnAddEvent(form_count+1);
	form_data[form_count] = new Array();
	//setInput(val, form_count);
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
		    try{
			    pulled = document.createElement('div');
			    pulled.innerHTML = responseDetails.responseText;
			
			    var pulleddoc = document.implementation.createDocument("", "", null);
			    pulleddoc.appendChild(pulled);		
			
			    ex = ".//p[@class='error']";
			    err = pulleddoc.evaluate(ex,pulled,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			
			    ex = ".//div[@class='in']";
			    tag = pulleddoc.evaluate(ex,pulled,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

			    if (tag.snapshotLength && !err.snapshotLength){
			        ex = ".//form";
			        var info = pulleddoc.evaluate(ex,pulled,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			        if (info.snapshotLength){			    
			            btnAddEvent(info.snapshotItem(0).innerHTML, data, ind)
			        }
				    tag = tag.snapshotItem(0).textContent;
				    t = tag.match(/([0-9]{1,2}):([0-9]{2}):([0-9]{2})/i);
				    form_data[ind]["arrive_in"] = parseInt(t[1],10)*60*60+parseInt(t[2],10)*60+parseInt(t[3],10);
				    form_data[ind]["output"] = getFormElements(info.snapshotItem(0));
				    form_data[ind]["input"] = data;

				    timeAttackEvent();
					catasEvent();
					
				    clearInterval(timerIntervalId);
				    timerIntervalId = setInterval(function(){arrivalCounter()},100);
				    arrivalCounter();				
				
			    }else{
				    errorMsg ("cannot send request form");
				    alert(err.snapshotItem(0).textContent);
				    catchError();
			    }
			}catch(e){
				alert(e);
			}finally{
			    logMsg('.: add new form :.');
                logMsg('input data  : '+form_data[ind]["input"]);
                logMsg('output data : '+form_data[ind]["output"]);
                logMsg('arrive in   : '+form_data[ind]["arrive_in"]);
                logMsg('arrive at   : '+form_data[ind]["arrive_at"]);
                logMsg('time attack : '+form_data[ind]["time_attack"] + "<hr>");                
			}
			
		}
	});
	
}

function reloadForm(i) {
    ex = "//div[@id='form_"+ i +"']//input[@name='input']";
    data = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
    //data = data.snapshotItem(0).value;
    data = form_data[i]["input"];
	
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
		    try{
			    pulled = document.createElement('div');
			    pulled.innerHTML = responseDetails.responseText;

			    var pulleddoc = document.implementation.createDocument("", "", null);
			    pulleddoc.appendChild(pulled);		
			
			    ex = ".//p[@class='error']";
			    err = pulleddoc.evaluate(ex,pulled,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			
			    ex = ".//div[@class='in']";
			    tag = pulleddoc.evaluate(ex,pulled,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

			    if (tag.snapshotLength && !err.snapshotLength){
			        ex = "//div[@id='form_"+ i +"']//form[@class='frmHeader']";
                    f = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
                    f = f.snapshotItem(0);

			        ex = ".//form";
			        var info = pulleddoc.evaluate(ex,pulled,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			        if (info.snapshotLength) f.innerHTML = info.snapshotItem(0).innerHTML

                    ex = "//div[@id='form_"+ i +"']//input[@id='btn_ok'][@name='s1']";
                    f = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
	                f = f.snapshotItem(0);
	                f.type = 'hidden';
	                form_data[i]["output"] = getFormElements(info.snapshotItem(0));
			    }else{			    
				    errorMsg ("cannot send request form");
				    alert(err.snapshotItem(0).textContent);
				    catchError();
			    }
			}catch(e){
			    alert("reload form : "+e)
			}finally{
			    logMsg('.: reload form '+i+':.');
                logMsg('input data  : '+form_data[i]["input"]);
                logMsg('output data : '+form_data[i]["output"]);
                logMsg('arrive in   : '+form_data[i]["arrive_in"]);
                logMsg('arrive at   : '+form_data[i]["arrive_at"]);
                logMsg('time attack : '+form_data[i]["time_attack"] + "<hr>");			
			}
		}
	});
}

function arrivalCounter() {
	for ( var i = 1; i <= form_count; i++ ){					
		form_data[i]["arrive_at"] = setArriveAt(i);
		if(form_data[i]["arrive_at"] == form_data[i]["time_attack"] - 4000){
		    form_data[i]["time_attack"] = false;
		    post3(document.location.href.split('?')[0], form_data[i]["output"]);
		    reloadForm(i);
		}							
	}
}

function setTimeAttack(content){
    ex = "../../../../../..";
    tag = document.evaluate(ex, content, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    div_ta = document.evaluate("../span", content, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    d = document.evaluate("../input[@name='date_attack']", content, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    t = document.evaluate("../input[@name='time_attack']", content, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (tag.snapshotLength){
	    div = tag.snapshotItem(0).innerHTML;
	    div = div.match(/form_([0-9]{1,2})/i);
	    no = div[0].replace(/form_/, '');
	    
	    date = (d.snapshotItem(0).value).match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/i);	
	    time = (t.snapshotItem(0).value).match(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/i);	
	    if(time && date){	
	        form_data[no]["time_attack"] = getMsTime(date, time, no);
	        div_ta.snapshotItem(0).innerHTML = simpleDateFormat( form_data[no]["time_attack"]);
	        //div_ta.snapshotItem(0).innerHTML = new Date( form_data[no]["time_attack"] );
	    }else{
	        form_data[no]["time_attack"] = false;
            div_ta.snapshotItem(0).innerHTML = '';
	    }
    }
}

function setArriveAt(i){
	var ex = "//div[@id='form_"+ i +"']//span[@id='tp2']";
	var div = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
	if (div.snapshotLength){
		//div.snapshotItem(0).innerHTML = val.getHours()+":"+val.getMinutes()+":"+val.getSeconds();
		val = getServerTime() + form_data[i]["arrive_in"] * 1000;
		div.snapshotItem(0).innerHTML = simpleDateFormat( val); //val.toLocaleString();
		//div.snapshotItem(0).innerHTML = new Date( val );
		return val;
	}
	return null;
}

function getFormElements(f){
	var v = new Array();
	for(i=0; i<f.elements.length; i++){
		if(f.elements[i].type == "text" || f.elements[i].type == "hidden"){
			v[i] = f.elements[i].name +"="+ f.elements[i].value;
		}else if(f.elements[i].type == "radio" && f.elements[i].checked == true){
			v[i] = f.elements[i].name +"="+ f.elements[i].value;				
		}else if(f.elements[i].className == "dropdown"){
			v[i] = f.elements[i].name +"="+ f.elements[i].options[f.elements[i].selectedIndex].value;
		}
	}
	return v.join('&');
}


function getMsTime(d, t, i) {
    //d = new Date(form_data[i]["arrive_at"]);
    dt = new Date();
    dt.setDate(d[1]);
    dt.setMonth(d[2]-1);
    dt.setFullYear(d[3]);
    dt.setHours(t[1]);
    dt.setMinutes(t[2]);
    dt.setSeconds(t[3]);
    dt.setMilliseconds(0);
    return dt.getTime();
}

function simpleDateFormat(ms){
    d = new Date(ms);
    return d.getDate().toString().replace(/\b(\d)\b/g, '0$1') +"/"+ 
    (d.getMonth()+1).toString().replace(/\b(\d)\b/g, '0$1') +"/"+ 
    (d.getFullYear()) +" "+ 
    (d.getHours()).toString().replace(/\b(\d)\b/g, '0$1') +":"+ 
    (d.getMinutes()).toString().replace(/\b(\d)\b/g, '0$1') +":"+ 
    (d.getSeconds()).toString().replace(/\b(\d)\b/g, '0$1');
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

function logMsg (msg) {
	if(debug){
	    errDiv = document.getElementById('err');
	    errDiv.innerHTML = errDiv.innerHTML +  "<br><b>info</b> " + msg;
	}
}

function addCount(msg, br){
	countDiv = document.getElementById('err');
	countDiv.innerHTML = countDiv.innerHTML + (countDiv.innerHTML && br ? '<br>' : '')+msg;
}

function sysTime(){
	var syst=new Date()
	document.getElementById('s_time').innerHTML="server time: " + syst.toLocaleTimeString()
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
