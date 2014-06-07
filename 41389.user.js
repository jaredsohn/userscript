// ==UserScript==
// @name           score_stat
// @namespace      thu
// @include        http://*.tsinghua.edu.cn/pls/wwwbks/bks_cjcx1.curscopre*
// ==/UserScript==

var current_ctime;
var loadingtime = 0;
var topZindex = 0;
var topX = 250;
var topY = 200;

var arrpool = [];
var pool_idx = 0;

var server = "59.66.141.237";

function main()
{
    var chkbox = document.getElementsByName("p_pm");
    var ctime = "";
    for (var i=0; i<chkbox.length; i++) {
        var chk = chkbox[i];
//        var value = chk.value;
        var btn = document.createElement("INPUT");
	
//		if (value.length<10) {
			var tr = chk.parentNode.parentNode.parentNode;

			var cid = tr.childNodes[3].textContent;
			var cidx = tr.childNodes[9].textContent;
			ctime= tr.childNodes[13].textContent;
			var cname_ch = tr.childNodes[5].textContent;
			var cname_en = tr.childNodes[7].textContent;
			var score = tr.childNodes[15].textContent;
//		}

        btn.setAttribute("type","button");
        btn.setAttribute("value","St");
        btn.setAttribute("cidtag",cid);
        btn.setAttribute("cidxtag",cidx);
        btn.setAttribute("ctimetag",ctime);
        btn.setAttribute("cname_chtag",cname_ch);
        btn.setAttribute("cname_entag",cname_en);
        btn.setAttribute("scoretag",score);
        chk.parentNode.appendChild(btn);
        btn.addEventListener("click", do_stat, false);
    }
    current_ctime = ctime;
    
    var frm = document.getElementsByTagName("form")[0];
    var newdiv = document.createElement("div");
    var htm = "";
    htm += '课程号<input type="text" id="txt_extcid" size="10"/>&nbsp;';
    htm += '课序号<input type="text" id="txt_extcidx" size="3"/>&nbsp;';
    htm += '考试时间<input type="text" id="txt_extctime" size="10" value="'+current_ctime+'"/>&nbsp;';
    htm += '<input type="button" id="extbtn" value="手动查询"/>';
    newdiv.innerHTML = htm;
    frm.parentNode.appendChild(newdiv);
    
    var btn = document.getElementById("extbtn");
    btn.addEventListener("click", ext_stat, false);

    newdiv = document.createElement("div");
    var htm = "";
    htm += '<img src="data:image/gif;base64,R0lGODlhEAAQAIAAAFLOQv///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgABACwJAAIAAgACAAACAoRRACH5BAUKAAEALAwABQACAAIAAAIChFEAIfkEBQoAAQAsDAAJAAIAAgAAAgKEUQAh+QQFCgABACwJAAwAAgACAAACAoRRACH5BAUKAAEALAUADAACAAIAAAIChFEAIfkEBQoAAQAsAgAJAAIAAgAAAgKEUQAh+QQFCgABACwCAAUAAgACAAACAoRRACH5BAkKAAEALAIAAgAMAAwAAAINjAFne8kPo5y02ouzLQAh+QQJCgABACwCAAIADAAMAAACF4wBphvID1uCyNEZM7Ov4v1p0hGOZlAAACH5BAkKAAEALAIAAgAMAAwAAAIUjAGmG8gPW4qS2rscRPp1rH3H1BUAIfkECQoAAQAsAgACAAkADAAAAhGMAaaX64peiLJa6rCVFHdQAAAh+QQJCgABACwCAAIABQAMAAACDYwBFqiX3mJjUM63QAEAIfkECQoAAQAsAgACAAUACQAAAgqMARaol95iY9AUACH5BAkKAAEALAIAAgAFAAUAAAIHjAEWqJeuCgAh+QQJCgABACwFAAIAAgACAAACAoRRADs=" />Loading...';
    newdiv.innerHTML = htm;
    newdiv.setAttribute("id", "loading");
    newdiv.style.position = "absolute";
    newdiv.style.left = document.body.clientWidth-100;
    newdiv.style.top = "0px";
    newdiv.style.height = "20px";
    newdiv.style.width  = "100px";
    newdiv.style.opacity = 0.8;
    newdiv.style.visibility = "hidden"
    frm.parentNode.appendChild(newdiv);

    newdiv = document.createElement("div");
    var htm = "";
    htm += '&nbsp;&nbsp;Warning: Database currently unavalilable. Your edit will not be updated.&nbsp;&nbsp;';
    newdiv.innerHTML = htm;
    newdiv.setAttribute("id", "dbfail");
    newdiv.style.position = "absolute";
    newdiv.style.left = "50px";
    newdiv.style.top = "30px";
    newdiv.style.height = "20px";
    newdiv.style.fontWeight = "bold";
//    newdiv.style.width  = "100px";
//    newdiv.style.opacity = 1;
    newdiv.style.border = "2px solid";
    newdiv.style.backgroundColor = "yellow";    
    newdiv.style.visibility = "hidden"
    frm.parentNode.appendChild(newdiv);
}

function get_query(btn, score)
{
	var value = "";
	value += btn.getAttribute("cidtag");
	value += "1";
	var tmp = ("00"+btn.getAttribute("cidxtag"));
	value += tmp.substr(tmp.length-2,2);
	value += btn.getAttribute("ctimetag");
	value += String(score);
	return value;
}

function ext_stat()
{
	this.setAttribute("cidtag", document.getElementById("txt_extcid").value);
	this.setAttribute("cidxtag", document.getElementById("txt_extcidx").value);
	this.setAttribute("ctimetag", document.getElementById("txt_extctime").value);
    this.setAttribute("cname_chtag","");
    this.setAttribute("cname_entag","");
	this.setAttribute("scoretag", "");
	request_db(this, ext_stage2);
}

function ext_stage2(arr, btn)
{
	if (arr==null) {
		if (btn.getAttribute("ctimetag") != current_ctime) {
			alert("No record in database.");
		}else{
			request_info(btn, show_result);
		}
	}else
		show_result(arr);
}

function do_stat()
{
	request_db(this, normal_stage2);
}

function normal_stage2(arr, btn)
{
	if (arr==null)
		request_info(btn, show_result);
	else
		show_result(arr);
}

function request_db(btn, callback)
{
	var staturl="http://"+server+"/grade_stat/query.php";
	var data="cid="+btn.getAttribute("cidtag");
	data += "&cidx="+btn.getAttribute("cidxtag");

	var arr=[];
	arr["cid"] = btn.getAttribute("cidtag");
	arr["cidx"] = btn.getAttribute("cidxtag");
	arr["ctime"] = btn.getAttribute("ctimetag");
	arr["score"] = btn.getAttribute("scoretag");
	arr["name_ch"] = btn.getAttribute("cname_chtag");
	arr["name_en"] = btn.getAttribute("cname_entag");
	arr["dirty"] = 0;

 	loadingtime ++;
	document.getElementById("loading").style.visibility = "visible";
	var hwnd = setTimeout(function(){
	 	loadingtime --;
		if (!loadingtime) document.getElementById("loading").style.visibility = "hidden";
		$("dbfail").style.visibility = "visible";
		callback(null, btn);
	}, 2000);
    GM_xmlhttpRequest({
        method: 'GET',
        url: staturl + "?" + data,
        callback: callback,
        dataarr: arr,
        btn: btn,
        tmrhwnd: hwnd,
        onerror: function(res) { 
		 	loadingtime --;
			if (!loadingtime) document.getElementById("loading").style.visibility = "hidden";
			$("dbfail").style.visibility = "visible";
        	this.callback(null, this.btn);
        },
        onload: function(res) {
		 	loadingtime --;
			if (!loadingtime) document.getElementById("loading").style.visibility = "hidden";
			$("dbfail").style.visibility = "hidden";
			clearTimeout(this.tmrhwnd);

			var parser = new DOMParser();
			var arr = this.dataarr;
			var xmldoc = parser.parseFromString(res.responseText, 'application/xml');
        	var callback = this.callback;
        	
//			alert(res.responseText);
			if (!xmldoc || !xmldoc.hasChildNodes) {
				if (callback) callback(null, this.btn);
				$("dbfail").style.visibility = "visible";
				return;
			}

			var cnode = xmldoc.getElementsByTagName("course");
			if (!cnode.length) {
				if (callback) callback(null, this.btn);
				return;
			}
			
			var i;
			for (i=0; i<cnode.length; i++) {
				var tmpcnode = cnode[i];
				var ctime = tmpcnode.getElementsByTagName("time")[0].textContent;
				if (ctime == arr["ctime"]) break;
			}
			if (i == cnode.length) {
				arr["no_match_time"] = 1;
				cnode = cnode[0];
				arr["ctime"] = cnode.getElementsByTagName("time")[0].textContent;
			}else{
				cnode = cnode[i];
			}
			
			arr["teacher"] = cnode.getElementsByTagName("teacher")[0].textContent;
			var tmpstr = cnode.getElementsByTagName("name")[0].textContent;
			if (arr["name_ch"].length) {
				if (arr["name_ch"] != tmpstr) arr["dirty"] = 1;
			}else{
				arr["name_ch"] = tmpstr;
			}
			tmpstr = cnode.getElementsByTagName("name_en")[0].textContent;
			if (arr["name_en"].length) {
				if (arr["name_en"] != tmpstr) arr["dirty"] = 1;
			}else{
				arr["name_en"] = tmpstr;
			}
			arr["max"] = cnode.getElementsByTagName("max")[0].textContent;
			arr["min"] = cnode.getElementsByTagName("min")[0].textContent;
			
			var hist = cnode.getElementsByTagName("histogram")[0].textContent;

			hist = hist.split(",");
			arr["hist"] = hist;
			var avgsum = 0;
			var histsum = 0;
			
        	for (var i=0; i<hist.length; i++) {
        		hist[i] = parseInt(hist[i]);
        		avgsum += (5*(20-i)+2.5) * hist[i];
        		histsum += hist[i];
        	}

        	if (!histsum) {
				if (callback) callback(null, this.btn);
				return;
        	}
        	arr["avg"] = avgsum / histsum;
        	
        	if (callback) callback(arr);
        }
    });	
}

function request_info(btn, callback)
{
    var staturl = location.href;
    staturl = staturl.substr(0,staturl.indexOf("bks_cjcx1"));
    staturl += "bks_cjcx1.cursco";

 	var arr = [];
	arr["cid"] = btn.getAttribute("cidtag");
	arr["cidx"] = btn.getAttribute("cidxtag");
	arr["ctime"] = btn.getAttribute("ctimetag");
	arr["teacher"] = "";
	arr["name_ch"] = btn.getAttribute("cname_chtag");
	arr["name_en"] = btn.getAttribute("cname_entag");
	arr["max"] = 0;
	arr["min"] = 0;
	arr["avg"] = 0;
	arr["score"] = btn.getAttribute("scoretag");
	arr["hist"] = "";
	arr["dirty"] = 2;
   
	if (arr["ctime"] != current_ctime) {
		if(callback) callback(null);
		return;
	}
   
    var data="";
    for (var i=94.5; i>0; i-=5) {
    	data += "p_pm=" + get_query(btn, i) + "    A&";
    }
    data += "p_pm=" + get_query(btn, -0.5) + "    A";
//    alert(data);
	loadingtime ++;
	document.getElementById("loading").style.visibility = "visible";
    GM_xmlhttpRequest({
        method: 'POST',
        url: staturl,
        data: data,
        dataarr: arr,
        btn: btn,
        callback: callback,
        onerror: function(res) {
		 	loadingtime --;
			if (!loadingtime) document.getElementById("loading").style.visibility = "hidden";
        	this.callback(null, this.btn);
        },
        onload: function(res) {
		 	loadingtime --;
			if (!loadingtime) document.getElementById("loading").style.visibility = "hidden";

        	var arr = this.dataarr;
        	var callback = this.callback;
        
			var htm = res.responseText;
			var tempdiv = document.createElement('div');
			tempdiv.innerHTML = htm;
        	
        	var tbl = tempdiv.getElementsByTagName("TABLE")[3];
        	var trs = tbl.getElementsByTagName("TR");
        	
        	var hist=Array(20);    // 0=95+ ...  20=5-
        	var last_rank=0;
        	var avgsum=0;
        	var flag=0;
        	
        	if (trs.length <21) {
        		if (callback) callback(null, this.btn);
        		return;
        	}
        	
        	for (var i=1; i<trs.length; i++) {
        		var tr = trs[i];
        		var paras = tr.getElementsByTagName("P");
        		
        		arr["max"] = paras[4].innerHTML;
        		arr["min"] = paras[5].innerHTML;
        		hist[i-1] = parseInt(paras[6].innerHTML)-last_rank;
        		if (hist[i-1]>0) flag = i;
        		last_rank = parseInt(paras[6].innerHTML);
        		avgsum += (5*(20-i)+2.5) * hist[i-1];
        	}
        	arr["avg"] = avgsum / last_rank;
        	arr["hist"] = hist.slice(0,flag);
        	
	       	if (callback) {
	       		if (last_rank>1)
	       			callback(arr);
	       		else
	       			callback(null, this.btn);
	       	}
        }
    });
}

function show_result(arrdata, thediv)
{
	if (arrdata==null) return;
	
    var sum = 0;
    var data = arrdata["hist"];
    var labels = [];
    var labeltext = ['95+', '\n94-90', '89-85', '\n84-80', '79-75', '\n74-70', '69-65', '\n64-60', '59-55', '\n54-50', '49-45', '\n44-40', '39-35', '\n34-30', '29-25', '\n24-20', '19-15', '\n14-10', '9-5', '\n4-0'];
    for (var i=0; i<data.length; i++) {
        labels[labels.length] = labeltext[labels.length];
    }
    var avg = Math.round(arrdata["avg"]*100)/100;

    var newdiv;
    if (thediv) {
    	newdiv = thediv;
		arrpool[newdiv.getAttribute("tag")] = arrdata;
	} else {
		newdiv = document.createElement("div");
	    topX += 20; topY += 20;
		newdiv.setAttribute("tag", pool_idx);
		arrpool[pool_idx++] = arrdata;
	}
    newdiv.style.position="absolute";
    newdiv.style.left=topX+"px";
    newdiv.style.top=topY+"px";
    newdiv.style.height="400px";
    newdiv.style.width="570px";
    newdiv.style.border="dashed 1px grey";
    newdiv.style.backgroundColor="#F0F0F0";
    newdiv.style.padding="20px";
    newdiv.style.zIndex = ++topZindex;
    newdiv.innerHTML="Loading...";
    newdiv.className = "drag";
    document.body.appendChild(newdiv);
	
	var update_fun = function(auto) {
        var arrdata = newdiv.getAttribute("tag");
        arrdata = arrpool[arrdata];
		
		var staturl="http://"+server+"/grade_stat/submit.php";
		
		// NOTE:  Your Student ID will be recorded for security reason!!!
		var data="sid="+getSid();
//		alert(data);
		if (arrdata["dirty"]==2) {
			data += "&action=insert";
			data += "&cid="+ encodeURIComponent(arrdata["cid"]);
			data += "&cidx="+encodeURIComponent(arrdata["cidx"]);
			data += "&ctime="+encodeURIComponent(arrdata["ctime"]);
			data += "&name_ch="+encodeURIComponent(arrdata["name_ch"]);
			data += "&name_en="+encodeURIComponent(arrdata["name_en"]);
			data += "&teacher="+encodeURIComponent(arrdata["teacher"]);
			data += "&hist="+encodeURIComponent(arrdata["hist"].join(","));
			data += "&max="+encodeURIComponent(arrdata["max"]);
			data += "&min="+encodeURIComponent(arrdata["min"]);
			data += "&avg="+encodeURIComponent(arrdata["avg"]);
		}else if (arrdata["dirty"]==1){
			data += "&action=update";
			data += "&cid="+ encodeURIComponent(arrdata["cid"]);
			data += "&cidx="+encodeURIComponent(arrdata["cidx"]);
			data += "&ctime="+encodeURIComponent(arrdata["ctime"]);
			data += "&name_ch="+encodeURIComponent(arrdata["name_ch"]);
			data += "&name_en="+encodeURIComponent(arrdata["name_en"]);
			data += "&teacher="+encodeURIComponent(arrdata["teacher"]);
		}else
			return;

	 	loadingtime ++;
		document.getElementById("loading").style.visibility = "visible";
		var hwnd = setTimeout(function(){
		 	loadingtime --;
			if (!loadingtime) document.getElementById("loading").style.visibility = "hidden";
			if(!auto) alert("Update failed, connection unavailable.");
		}, 2000);
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: staturl + "?" + data,
		    datatag: newdiv.getAttribute("tag"),
		    tmrhwnd: hwnd,
		    onload: function(res) {
			 	loadingtime --;
				if (!loadingtime) document.getElementById("loading").style.visibility = "hidden";
				clearTimeout(this.tmrhwnd);

		    	var arrdata = arrpool[this.datatag];
		    	arrdata["dirty"] = 0;
		    	arrpool[this.datatag] = arrdata;
		    	
//		    	alert(res.responseText);
			}
		});
	};
    
    var edit_fun = function(ch,en,te, auto){
        var arrdata = newdiv.getAttribute("tag");
        arrdata = arrpool[arrdata];
        var ret;
        
        if (ch != 1) {
			ret = prompt("课程中文名:", arrdata["name_ch"]);
			if (ret && ret.length)
				arrdata["name_ch"] = ret;
        }
        if (en != 1) {
		    ret = prompt("课程英文名:", arrdata["name_en"]);
		    if (ret && ret.length)
		    	arrdata["name_en"] = ret;
        }
        if (te != 1) {
			ret = prompt("教师姓名:", arrdata["teacher"]);
			if (ret && ret.length)
				arrdata["teacher"] = ret;
        }
        if (!arrdata["dirty"]) arrdata["dirty"] = 1;
        update_fun(auto);
		if (auto) {
			arrpool[newdiv.getAttribute("tag")] = arrdata;
		}else{
	        show_result(arrdata, newdiv);
	    }
	};
    
    var canvasname = "mybar"+newdiv.getAttribute("tag");
    
    if (thediv==null && (!arrdata["name_ch"].length || !arrdata["name_en"].length || !arrdata["teacher"].length)) {
    	var ch="null",en="null",te="null";
    	if (arrdata["name_ch"].length) ch=1;
    	if (arrdata["name_en"].length) en=1;
    	if (arrdata["teacher"].length) te=1;
    	edit_fun(ch,en,te, 1);
    	arrdata = arrpool[newdiv.getAttribute("tag")];
    }

    var htm="";
    htm += '<p align="right" style="font-weight:bold; margin:3px">';
    htm += '<a href="javascript:;">';
    htm += '<img style="border:none" src="data:image/gif;base64,R0lGODlhFAAUANU/AAFnzPn5+bOzswFqzwF73+vt7fLy8pmZmev1/+Lw/7jb/7LZ/////7/f/1Wb4pK/7I++7Nvt/5G+7KSVrPf7/8fj/xBx0EqT3Lrb/NTp/8nLv4aKjo/B8reLmWyBlsFsbL3JzKasr83l/0+Y4vD4/6jQ+ajT/0eT3y9+yXRxUcmuVnKbxmem5nSMppCpwry8vJQ4M744FAFpzvn8/9xmIrAyJUaFxoRpKqM0MK63v4ODg6+xs+vs7Kqoo7bZ/P///yH5BAEAAD8ALAAAAAAUABQAAAaKwJ9wSCwaj8ikcsksygbQqHRg4RkBhKx2SwAUroGwODxDJLxggXq9Pn+LgLGYZI6g4QG2PtN5E+MGgYIILjowNDVgB4uLLTYrLx8xOGBiDxcQET4eGxN+Q3E7PSkQGSUjDhwKd38MFDcqKCcsGA0KC6ygDDkhGiAiFbYLJrlCAMfIycifTc3Ozz9BADs=" />';
    htm += 'Edit</a>';
    htm += '<a href="javascript:;">';
    htm += '<img style="border:none" src="data:image/gif;base64,R0lGODlhFAAUANU/AJVwd/Pz88kXN9bV1dkWOr4NLeYMNPBzirGcoPz6+p6amsw3Uo02RrqqreqImoxbZePi4vHu7vbV29gNMr2coukoS+IVPKioqOsCLalCVLk1TfMALXdVXMTExIGBgezs7I2NjcSZofAdQ+MDLPJSb7+Tm/3q7ujo6MMhP2dNUczMzNKkrNoJL/s/YsjAwn58fNLQ0Le3t/OWp/7v8rR9h3pFTsNIX85idoiFhcGgpvmmtd61vLNdbLNtenBrbAAAACH5BAEAAD8ALAAAAAAUABQAAAa0wJ9wSCwaj8hjpbJLIi2YhQuZODoImAzMKCNJjIGSAMODDE0HkQYBqRITFGzv85OQLJmXon3MEUY0Ky0EDzgKA25HDSgGBCgAIBcnTj8RNhsbDCAdAZQzBwYFBSwAEZ4HGAIcHAQTIYlGnwYChR1xLCWdRgkOBiw1Hh1VORMTuUY6IhgMPjG6CTkoGDeTRA4WBSkXpkMJLhoTCtVCJw0+LypHAyAg6UQBMAO6Rh8DdJT4+URBADs=" />';
    htm += 'Close</a></p>';
    htm += '<p align="center" style="font-weight:bold; size:1.2em; margin:3px">' + (arrdata["name_ch"].length?arrdata["name_ch"]:"(名称不详)") +" [" + arrdata["ctime"] + ']</p>';
    htm += '<p align="center" style="font-weight:bold; size:1em; margin:3px">' + (arrdata["name_en"].length?arrdata["name_en"]:"(name unavailable)") + '</p>';
    htm += '<p align="center" style="size:1em; margin:3px">by ' + (arrdata["teacher"].length?arrdata["teacher"]:"(teacher name unavailable)") + '</p>';
    htm += '<canvas width="550px" height="250px" id="'+canvasname+'">Please wait...</canvas><br/><br/>';
    htm += '<b>Max: </b> ' + arrdata["max"];
    htm += ' &nbsp;&nbsp;&nbsp;&nbsp;<b>Min: </b> ' + arrdata["min"];
    htm += ' &nbsp;&nbsp;&nbsp;&nbsp;<b>Approx.Avg: </b> ' + avg + '<br/>';
    htm += '<b>Your Score: </b> ' + (arrdata["score"].length?arrdata["score"]:"N/A");
    newdiv.innerHTML = htm;

    newdiv.getElementsByTagName("A")[0].addEventListener("click", edit_fun, false);

    newdiv.getElementsByTagName("A")[1].addEventListener("click", function(){
        update_fun(1);
        document.body.removeChild(newdiv);
    }, false);

    gradient = document.getElementById(canvasname).getContext('2d').createLinearGradient(0,0,0,450);
    gradient.addColorStop(0, '#ff8080');
    gradient.addColorStop(0.6, '#ffcc6f');

    bar = new Bar(canvasname, data);
    bar.Set('labels', labels);
    bar.Set('gutter', 25);
    bar.Set('line', false);
    bar.Set('colors', [gradient]);
    bar.Draw();
}

window.addEventListener("load", main, false);
window.addEventListener("mousedown", OnMouseDown, false);
window.addEventListener("mouseup", OnMouseUp, false);
window.addEventListener("mousemove", OnMouseMove, false);

// this is simply a shortcut for the eyes and fingers
function $(id)
{
	return document.getElementById(id);
}

function getSid() 
{
	var sid = readCookie("ACCOUNT");
	return sid.substring(0,10);
}

//read cookie value by name
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//=====================Drag'n'Drop Code Below============================//
﻿
var _startX = 0;			// mouse starting positions
var _startY = 0;
var _offsetX = 0;			// current element offset
var _offsetY = 0;
var _dragElement;			// needs to be passed from OnMouseDown to OnMouseMove
//var _oldZIndex = 0;			// we temporarily increase the z-index during drag
var _dragMode = false;

function OnMouseDown(e)
{
	// IE is retarded and doesn't pass the event object
	if (e == null) 
		e = window.event; 
	
	// IE uses srcElement, others use target
	var target = e.target != null ? e.target : e.srcElement;
	
	while(target && target.tagName != "DIV") target = target.parentNode;
	if (!target) return;
	// for IE, left click == 1
	// for Firefox, left click == 0
	if ((e.button == 1 && window.event != null || 
		e.button == 0) && 
		target.className == 'drag')
	{
		// grab the mouse position
		_startX = e.clientX;
		_startY = e.clientY;
		
		// grab the clicked element's position
		_offsetX = ExtractNumber(target.style.left);
		_offsetY = ExtractNumber(target.style.top);
		
		// bring the clicked element to the front while it is being dragged
//		_oldZIndex = target.style.zIndex;
		target.style.zIndex = ++topZindex;
		
		// we need to access the element in OnMouseMove
		_dragElement = target;

		// tell our code to start moving the element with the mouse
		_dragMode = true;
		
		// cancel out any text selections
		document.body.focus();
		
		// prevent text selection (except IE)
		return false;
	}
}

function ExtractNumber(value)
{
	var n = parseInt(value);
	
	return n == null || isNaN(n) ? 0 : n;
}

function OnMouseMove(e)
{
	if (!_dragMode) return;
	if (e == null) 
		var e = window.event; 

	// this is the actual "drag code"
	topX = (_offsetX + e.clientX - _startX);
	topY = (_offsetY + e.clientY - _startY);
	_dragElement.style.left = topX + 'px';
	_dragElement.style.top = topY + 'px';
}

function OnMouseUp(e)
{
	if (_dragElement != null)
	{
//		_dragElement.style.zIndex = _oldZIndex;

		// we're done with these events until the next OnMouseDown
		_dragMode = false;
//		_dragElement.ondragstart = null;

		// this is how we know we're not dragging
		_dragElement = null;
	}
}


//=====================RGraph Code Below============================//
﻿/**
* Returns five values which are used as a nice scale
*/
function getScale (max)
{
    var numDigits = String(max).length;
    var upper = Math.pow(10, numDigits);

    // Account for values less than 10
    if (max <= 10) {
        return 10;
    }

    for (var i=0; i<3; i++) {
        if (max <= (upper / 2) ) {
            upper = upper / 2;
        }
    }
    
    while (max > upper) {
        upper += (Math.pow(10, numDigits) / 2)
    }
    
    // Corner (? cases
    if (upper > 10 && upper <= 25) return 25;

    return upper;
}

/**
* Returns the maximum value which is in an array
* 
* @param array arr The array
* @param int       Whether to ignore signs
*/
function array_max(arr)
{
    var max = null;
    
    for (i in arr) {
        max = (max ? Math.max(max, arguments[1] ? Math.abs(arr[i]) : arr[i]) : arr[i]);
    }
    
    return max;
}

/**
* An array sum function
* 
* @param array arr The array to calculate the total of
*/
function array_sum (arr)
{
    // Allow integers
    if (typeof(arr) == 'number') {
        return arr;
    }

    var i, sum;

    for(i=0,sum=0;i<arr.length;sum+=arr[i++]);
    return sum;
}


/**
* Converts degrees to radians
* 
* @param int degrees The number of degrees
*/
function degrees2Radians(degrees)
{
    return degrees * (Math.PI / 180);
}



/**
* A function that shows errors
* 
* @param string e The error message
*/
function ShowError (e)
{
    alert('[ERROR] ' + e);
}

/**
* This function draws an angled line. The angle is cosidered to be clockwise
* 
* @param obj context The context object
* @param int x       The Y position
* @param int y       The X position
* @param int angle   The angle in RADIANS
* @param int length  The length of the line
*/
function lineByAngle (ctxt, x, y, angle, length)
{
    ctxt.arc(x, y, length, angle, angle, false);
    ctxt.lineTo(x, y);
    ctxt.arc(x, y, length, angle, angle, false);
}

﻿/**
* o------------------------------------------------------------------------------o
* | This file is part of the RGraph package - you can learn more at:             |
* |                                                                              |
* |                      http://www.phpguru.org/RGraph                           |
* |                                                                              |
* | This package is licensed under the Phpguru license 2008. A quick summary is  |
* | that the code is free top use for non-commercial purposes. For commercial    |
* | purposes there is a small license fee to pay. You can read more at:          |
* |                                                                              |
* |                  http://www.phpguru.org/static/license.html                  |
* o------------------------------------------------------------------------------o
*
* ?Copyright 2008 Richard Heyes
*/

/**
* A bar chart.
*/

/**
* The bar chart constructor
* 
* @param object canvas The cxanvas object
* @param array  data   The chart data
*/
function Bar(id, data)
{
    // Get the canvas and context objects
    this.canvas  = document.getElementById(id);
    this.context = this.canvas.getContext ? this.canvas.getContext("2d") : null;

    // Various config type stuff
    this.barColor1       = '#dce5fe'; // The background
    this.barColor2       = '#eee';
    this.backgroundGrid  = 1;         // Show/hide the background grid
    this.gridColor       = '#ddd';    // The background grid color
    this.yTickGap        = 20;        // The distance (pixels) between the Y tick marks
    this.smallYticks     = 3;         // The height of the smaller Y ticks
    this.largeYticks     = 5;         // The height of the larger Y ticks
    this.margin          = 5;         // The top,left and right margin heights
    this.strokeColor     = '#666';    // The outline colour
    this.line            = true;      // Whether to draw the averaging line or not
    this.gutter          = 15;        // The "margin" of the graph
    this.labels          = null;      // Whether to draw the labels or not
    this.max             = 0;         // Used internally
    this.xaxispos        = 'bottom';  // Where the X axis is positioned
    this.textStyle       = '#000';
    this.textHeight      = 8;
    this.yMax            = null;
    
    this.colors = ['rgba(255,0,0,0.5)', '#0f0', '#00f', '#ff0', '#0ff', '#0f0'];

    // Check for support
    if (!this.canvas) {
        alert('[BAR] No canvas support');
        return;
    }

    // Store the data
    this.data = data;
}

/**
* A peudo setter
* 
* @param name  string The name of the property to set
* @param value mixed  The value of the property
*/
Bar.prototype.Set = function (name, value)
{
    switch (name) {
        case 'barColor1':      this.barColor1 = value;      break;
        case 'barColor2':      this.barColor2 = value;      break;
        case 'backgroundGrid': this.backgroundGrid = value; break;
        case 'gridColor':      this.gridColor = value;      break;
        case 'margin':         this.margin = value;         break;
        case 'colors':         this.colors = value;         break;
        case 'strokeColor':    this.strokeColor = value;    break;
        case 'line':           this.line = value;           break;
        case 'gutter':         this.gutter = value;         break;
        case 'labels':         this.labels = value;         break;
        case 'max':            this.max = value;            break;
        case 'xaxispos':       this.xaxispos = value;       break;
        case 'textStyle':      this.textStyle = value;      break;
        case 'textHeight':     this.textHeight = value;     break;
        case 'yMax':           this.yMax = value;           break;
    }
}

/**
* The function you call to draw the line chart
*/
Bar.prototype.Draw = function ()
{
    /**
    * Work out a few things. They need to be here because they depend on things you can change before you
    * call Draw() but after you instantiate the object
    */
    this.grapharea      = this.canvas.height - ( (2 * this.gutter)) - this.margin;
    this.halfgrapharea  = this.grapharea / 2;
    this.halfTextHeight = this.textHeight / 2;

    // Progressively Draw the chart
    this.DrawBackground();
    this.Drawbars();
    this.DrawAxes();
    this.DrawLabels();
}

/**
* Draws the line charts background
*/
Bar.prototype.DrawBackground = function ()
{
    this.context.beginPath();

    // Draw the horizontal bars
    this.context.fillStyle = this.barColor1;
    for (var i=this.gutter; i < (this.canvas.height - (2 * this.gutter) ); i+=80) {
        this.context.fillRect (this.gutter, i, this.canvas.width - (this.gutter * 2), Math.min(40, this.canvas.height - i) );
    }

    this.context.fillStyle = this.barColor2;
    for (var i= (40 + this.gutter); i < (this.canvas.height - this.gutter); i+=80) {
        this.context.fillRect (this.gutter, i, this.canvas.width - (this.gutter * 2), i + 40 > (this.canvas.height - this.gutter) ? this.canvas.height - (this.gutter + i) : 40);
    }

    // Draw the background grid
    if (this.backgroundGrid) {

        this.context.strokeStyle = this.gridColor;

        // Draw the horizontal lines
        for (y=this.gutter; y < (this.canvas.height - this.gutter); y+=40) {
            this.context.moveTo(this.gutter, y);
            this.context.lineTo(this.canvas.width - this.gutter, y);
        }

        // Draw the vertical lines
        for (x=this.gutter; x <= (this.canvas.width - this.gutter); x+=18) {
            this.context.moveTo(x, this.gutter);
            this.context.lineTo(x, this.canvas.height - this.gutter);
        }
        
        // Make sure a rectangle, the same colour as the grid goes around the graph
        this.context.strokeStyle = this.gridColor;
        this.context.strokeRect(this.gutter,this.gutter,this.canvas.width - (2 * this.gutter), this.canvas.height - (2 * this.gutter));

        this.context.stroke();
    }
}
    
Bar.prototype.DrawAxes = function ()
{
    this.context.beginPath();
    this.context.strokeStyle = '#000';

    // Draw the Y axis
    this.context.moveTo(this.gutter, this.gutter);
    this.context.lineTo(this.gutter, this.canvas.height - this.gutter);
    
    // Draw the X axis
    this.context.moveTo(this.gutter, (this.xaxispos == 'top' ? this.gutter : (this.xaxispos == 'center' ? this.canvas.height / 2 : this.canvas.height - this.gutter) ) );
    this.context.lineTo(this.canvas.width - this.gutter, this.xaxispos == 'top' ? this.gutter : ( this.xaxispos == 'center' ? this.canvas.height / 2 : this.canvas.height - this.gutter) );

    // Draw the Y tickmarks
    for (y=this.gutter + (this.xaxispos == 'top' ? this.yTickGap : 0);
         (this.xaxispos == 'top' || this.xaxispos == 'center') ? (y<=this.canvas.height - this.gutter) : y<this.canvas.height - this.gutter;
         y+=this.yTickGap) {
        
        if (this.xaxispos == 'center' && y == (this.canvas.height / 2)) continue;
        
        this.context.moveTo(this.gutter, y);
        this.context.lineTo(this.gutter  - (y % 60 == 0 ? this.largeYticks : this.smallYticks), y);
    }

    // Draw the X tickmarks
    xTickGap = (this.canvas.width - (2 * this.gutter) ) / this.data.length;
    yStart   = this.xaxispos == 'top' ? this.gutter: this.canvas.height - this.gutter;
    yEnd     = this.xaxispos == 'top' ? this.gutter - 3 : (this.canvas.height - this.gutter) + 3;
    
    //////////////// X TICKS ////////////////

    // Now move the Y start end positions down if the axis is set to center
    if (this.xaxispos == 'center') {
        yStart = (this.canvas.height / 2) + 3;
        yEnd   = (this.canvas.height / 2) - 3;
    }

    for (x=this.gutter + xTickGap; x<=this.canvas.width - this.gutter; x+=xTickGap) {
        this.context.moveTo(x, yStart);
        this.context.lineTo(x, yEnd);
    }

    //////////////// X TICKS ////////////////

    this.context.stroke();
}
    
/**
* Draws the bars
*/
Bar.prototype.Drawbars = function ()
{
    CanvasTextFunctions.enable(this.context);

    this.context.strokeStyle = this.strokeColor;
    this.context.fillStyle   = this.barColor;
    var prevX                = 0;
    var prevY                = 0;

    /**
    * Work out the max value
    */
    if (this.yMax) {
        this.max = this.yMax;
    } else {
        for (i in this.data) {
            this.max = getScale(Math.max(Math.abs(this.max), Math.abs(array_sum(this.data[i]))));
        }
    }

    for (i in this.data) {
    
        if (this.xaxispos != 'center' && this.data[i] < 0) {
            this.data[i] = 0;
            alert("[BAR] Negative values are not allowed unless you set the X axis position to center (it's currently set to '" + this.xaxispos + "')");
        }

        // Work out the width and height
        var width  = (this.canvas.width - (2 * this.gutter) ) / this.data.length;;
        var height = (array_sum(this.data[i]) / this.max) * (this.canvas.height - this.margin - (2 * this.gutter) );

        // Half the height if the Y axis is at the center
        if (this.xaxispos == 'center') {
            height /= 2;
        }

        var x      = (i * width) + this.gutter;
        var y      = this.xaxispos == 'top' ? this.gutter : (this.xaxispos == 'center' ? (this.canvas.height / 2) - height : this.canvas.height - height - this.gutter);
        var margin = this.margin;
        var gutter = this.gutter;

        // Account for negative lengths - Some browsers (Google Chrome) don't like a negative value
        if (height < 0) {
            y += height;
            height = Math.abs(height);
        }

        /**
        * Draw the bar
        */
        this.context.beginPath();
            if (typeof(this.data[i]) == 'number') {
                // Set the fill color
                this.context.fillStyle = this.colors[0]

                // Regular bar
                this.context.fillRect(x + margin, y, width - (2 * margin), height);
                this.context.strokeRect(x + margin, y, width - (2 * margin), height);

                // Draw text :-)
                this.context.drawTextCenter('sans', 10, x + width/2 , y - 8, String(this.data[i]));

            } else if (typeof(this.data[i]) == 'object') {
                // Stacked bar
                for (j in this.data[i]) {
                    // Set the fill color
                    this.context.fillStyle = this.colors[j]

                    var height = (this.data[i][j] / this.max) * (this.canvas.height - this.margin - (2 * this.gutter) );
                    this.context.fillRect(x + margin, y, width - (2 * margin), height);
                    this.context.strokeRect(x + margin, y, width - (2 * margin), height);
                    y += height;
                    
                }
            }
        this.context.closePath();

        if (this.line) {
            this.context.moveTo(prevX + (width / 2), prevY);
            
            if (i > 0 && i < this.data.length) {
                this.context.lineTo(x + (width / 2), y);
                this.context.stroke();
            }
            
            prevX = x;
            prevY = this.canvas.height - height - gutter;
        }
    }
}

/**
* Draws the labels for the graph
*/
Bar.prototype.DrawLabels = function ()
{
    CanvasTextFunctions.enable(this.context);

    // Draw the Y axis labels:
    this.Drawlabels_top();
    this.Drawlabels_center();
    this.Drawlabels_bottom();

    if (this.labels && this.data.length == this.labels.length) {

        // Draw the X axis labels
        this.context.strokeStyle = this.textStyle;
        
        // How wide is each bar
        var barWidth = (this.canvas.width - this.gutter - this.gutter) / this.data.length;

        // Draw the X tickmarks
        var i=0;
        for (x=this.gutter + (xTickGap / 2); x<=this.canvas.width - this.gutter; x+=xTickGap) {
            this.context.drawTextCenter('sans',
                                  8,
                                  x,
                                  this.xaxispos == 'top' ? this.gutter - 6 : (this.canvas.height - this.gutter) + 13 + 
                                  (String(this.labels[i]).charAt(0) == '\n'? 10:0),
                                  String(this.labels[i++]));
        }

        /**
        * Only show the lower sides labels if the X axis is in the centre
        */

    } else if (this.labels) {
            alert('[BAR] Number of labels does not match the number of data points');
    }
}

/**
* Draws the X axis at the top
*/
Bar.prototype.Drawlabels_top = function ()
{
    if (this.xaxispos == 'top') {

        var interval = (this.grapharea) / 5;

        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (this.grapharea + this.gutter +this.halfTextHeight) - (4 * interval), String(Math.round(this.max * (1/5) )) );
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (this.grapharea + this.gutter +this.halfTextHeight) - (3 * interval), String(Math.round(this.max * (2/5) )) );
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (this.grapharea + this.gutter +this.halfTextHeight) - (2 * interval), String(Math.round(this.max * (3/5) )) );
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (this.grapharea + this.gutter +this.halfTextHeight) - interval, String(Math.round(this.max * (4/5) )) );
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, this.grapharea + this.gutter +this.halfTextHeight, String(Math.round(this.max)));
    }
}

/**
* Draws the X axis in the middle
*/
Bar.prototype.Drawlabels_center = function ()
{
    if (this.xaxispos == 'center') {
    
        ///////////////////////////////////////////////////////////////////////////////////

        /**
        * Draw the top labels
        */
        var interval = (this.grapharea * (1/10) );

        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5,                this.gutter + this.margin + this.halfTextHeight, String(Math.round(this.max)));
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (1*interval) + this.gutter + this.margin + this.halfTextHeight,String(Math.round(this.max * (4/5) )));
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (2*interval) + this.gutter + this.margin + this.halfTextHeight, String(Math.round(this.max * (3/5) )));
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (3*interval) + this.gutter + this.margin + this.halfTextHeight, String(Math.round(this.max * (2/5) )));
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (4*interval) + this.gutter + this.margin + this.halfTextHeight, String(Math.round(this.max * (1/5) )));

        ///////////////////////////////////////////////////////////////////////////////////

        /**
        * Draw the bottom labels
        */
        var interval = (this.grapharea) / 10;

        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (this.grapharea + this.gutter +this.halfTextHeight) - (4 * interval), String(-1 * Math.round(this.max * (1/5) )) );
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (this.grapharea + this.gutter +this.halfTextHeight) - (3 * interval), String(-1 * Math.round(this.max * (2/5) )) );
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (this.grapharea + this.gutter +this.halfTextHeight) - (2 * interval), String(-1 * Math.round(this.max * (3/5) )) );
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (this.grapharea + this.gutter +this.halfTextHeight) - interval, String(-1 * Math.round(this.max * (4/5) )) );
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, this.grapharea + this.gutter + this.halfTextHeight, String(Math.round(-1 * this.max)));

        ///////////////////////////////////////////////////////////////////////////////////

    }
}

/**
* Draws the X axdis at the bottom (the default)
*/
Bar.prototype.Drawlabels_bottom = function ()
{
    if (this.xaxispos == 'bottom') {
        var interval = (this.grapharea * (1/5) );

        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5,                this.gutter + this.margin + this.halfTextHeight, String(Math.round(this.max)));
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (1*interval) + this.gutter + this.margin + this.halfTextHeight,String(Math.round(this.max * (4/5) )));
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (2*interval) + this.gutter + this.margin + this.halfTextHeight, String(Math.round(this.max * (3/5) )));
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (3*interval) + this.gutter + this.margin + this.halfTextHeight, String(Math.round(this.max * (2/5) )));
        this.context.drawTextRight('sans', this.textHeight, this.gutter - 5, (4*interval) + this.gutter + this.margin + this.halfTextHeight, String(Math.round(this.max * (1/5) )));
    }
}

//
// This code is released to the public domain by Jim Studt, 2007.
// He may keep some sort of up to date copy at http://www.federated.com/~jim/canvastext/
//
var CanvasTextFunctions = { };

CanvasTextFunctions.letters = {
    ' ': { width: 16, points: [] },
    '!': { width: 10, points: [[5,21],[5,7],[-1,-1],[5,2],[4,1],[5,0],[6,1],[5,2]] },
    '"': { width: 16, points: [[4,21],[4,14],[-1,-1],[12,21],[12,14]] },
    '#': { width: 21, points: [[11,25],[4,-7],[-1,-1],[17,25],[10,-7],[-1,-1],[4,12],[18,12],[-1,-1],[3,6],[17,6]] },
    '$': { width: 20, points: [[8,25],[8,-4],[-1,-1],[12,25],[12,-4],[-1,-1],[17,18],[15,20],[12,21],[8,21],[5,20],[3,18],[3,16],[4,14],[5,13],[7,12],[13,10],[15,9],[16,8],[17,6],[17,3],[15,1],[12,0],[8,0],[5,1],[3,3]] },
    '%': { width: 24, points: [[21,21],[3,0],[-1,-1],[8,21],[10,19],[10,17],[9,15],[7,14],[5,14],[3,16],[3,18],[4,20],[6,21],[8,21],[10,20],[13,19],[16,19],[19,20],[21,21],[-1,-1],[17,7],[15,6],[14,4],[14,2],[16,0],[18,0],[20,1],[21,3],[21,5],[19,7],[17,7]] },
    '&': { width: 26, points: [[23,12],[23,13],[22,14],[21,14],[20,13],[19,11],[17,6],[15,3],[13,1],[11,0],[7,0],[5,1],[4,2],[3,4],[3,6],[4,8],[5,9],[12,13],[13,14],[14,16],[14,18],[13,20],[11,21],[9,20],[8,18],[8,16],[9,13],[11,10],[16,3],[18,1],[20,0],[22,0],[23,1],[23,2]] },
    '\'': { width: 10, points: [[5,19],[4,20],[5,21],[6,20],[6,18],[5,16],[4,15]] },
    '(': { width: 14, points: [[11,25],[9,23],[7,20],[5,16],[4,11],[4,7],[5,2],[7,-2],[9,-5],[11,-7]] },
    ')': { width: 14, points: [[3,25],[5,23],[7,20],[9,16],[10,11],[10,7],[9,2],[7,-2],[5,-5],[3,-7]] },
    '*': { width: 16, points: [[8,21],[8,9],[-1,-1],[3,18],[13,12],[-1,-1],[13,18],[3,12]] },
    '+': { width: 26, points: [[13,18],[13,0],[-1,-1],[4,9],[22,9]] },
    ',': { width: 10, points: [[6,1],[5,0],[4,1],[5,2],[6,1],[6,-1],[5,-3],[4,-4]] },
    '-': { width: 26, points: [[4,9],[22,9]] },
    '.': { width: 10, points: [[5,2],[4,1],[5,0],[6,1],[5,2]] },
    '/': { width: 22, points: [[20,25],[2,-7]] },
    '0': { width: 20, points: [[9,21],[6,20],[4,17],[3,12],[3,9],[4,4],[6,1],[9,0],[11,0],[14,1],[16,4],[17,9],[17,12],[16,17],[14,20],[11,21],[9,21]] },
    '1': { width: 20, points: [[6,17],[8,18],[11,21],[11,0]] },
    '2': { width: 20, points: [[4,16],[4,17],[5,19],[6,20],[8,21],[12,21],[14,20],[15,19],[16,17],[16,15],[15,13],[13,10],[3,0],[17,0]] },
    '3': { width: 20, points: [[5,21],[16,21],[10,13],[13,13],[15,12],[16,11],[17,8],[17,6],[16,3],[14,1],[11,0],[8,0],[5,1],[4,2],[3,4]] },
    '4': { width: 20, points: [[13,21],[3,7],[18,7],[-1,-1],[13,21],[13,0]] },
    '5': { width: 20, points: [[15,21],[5,21],[4,12],[5,13],[8,14],[11,14],[14,13],[16,11],[17,8],[17,6],[16,3],[14,1],[11,0],[8,0],[5,1],[4,2],[3,4]] },
    '6': { width: 20, points: [[16,18],[15,20],[12,21],[10,21],[7,20],[5,17],[4,12],[4,7],[5,3],[7,1],[10,0],[11,0],[14,1],[16,3],[17,6],[17,7],[16,10],[14,12],[11,13],[10,13],[7,12],[5,10],[4,7]] },
    '7': { width: 20, points: [[17,21],[7,0],[-1,-1],[3,21],[17,21]] },
    '8': { width: 20, points: [[8,21],[5,20],[4,18],[4,16],[5,14],[7,13],[11,12],[14,11],[16,9],[17,7],[17,4],[16,2],[15,1],[12,0],[8,0],[5,1],[4,2],[3,4],[3,7],[4,9],[6,11],[9,12],[13,13],[15,14],[16,16],[16,18],[15,20],[12,21],[8,21]] },
    '9': { width: 20, points: [[16,14],[15,11],[13,9],[10,8],[9,8],[6,9],[4,11],[3,14],[3,15],[4,18],[6,20],[9,21],[10,21],[13,20],[15,18],[16,14],[16,9],[15,4],[13,1],[10,0],[8,0],[5,1],[4,3]] },
    ':': { width: 10, points: [[5,14],[4,13],[5,12],[6,13],[5,14],[-1,-1],[5,2],[4,1],[5,0],[6,1],[5,2]] },
    ',': { width: 10, points: [[5,14],[4,13],[5,12],[6,13],[5,14],[-1,-1],[6,1],[5,0],[4,1],[5,2],[6,1],[6,-1],[5,-3],[4,-4]] },
    '<': { width: 24, points: [[20,18],[4,9],[20,0]] },
    '=': { width: 26, points: [[4,12],[22,12],[-1,-1],[4,6],[22,6]] },
    '>': { width: 24, points: [[4,18],[20,9],[4,0]] },
    '?': { width: 18, points: [[3,16],[3,17],[4,19],[5,20],[7,21],[11,21],[13,20],[14,19],[15,17],[15,15],[14,13],[13,12],[9,10],[9,7],[-1,-1],[9,2],[8,1],[9,0],[10,1],[9,2]] },
    '@': { width: 27, points: [[18,13],[17,15],[15,16],[12,16],[10,15],[9,14],[8,11],[8,8],[9,6],[11,5],[14,5],[16,6],[17,8],[-1,-1],[12,16],[10,14],[9,11],[9,8],[10,6],[11,5],[-1,-1],[18,16],[17,8],[17,6],[19,5],[21,5],[23,7],[24,10],[24,12],[23,15],[22,17],[20,19],[18,20],[15,21],[12,21],[9,20],[7,19],[5,17],[4,15],[3,12],[3,9],[4,6],[5,4],[7,2],[9,1],[12,0],[15,0],[18,1],[20,2],[21,3],[-1,-1],[19,16],[18,8],[18,6],[19,5]] },
    'A': { width: 18, points: [[9,21],[1,0],[-1,-1],[9,21],[17,0],[-1,-1],[4,7],[14,7]] },
    'B': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[13,21],[16,20],[17,19],[18,17],[18,15],[17,13],[16,12],[13,11],[-1,-1],[4,11],[13,11],[16,10],[17,9],[18,7],[18,4],[17,2],[16,1],[13,0],[4,0]] },
    'C': { width: 21, points: [[18,16],[17,18],[15,20],[13,21],[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5]] },
    'D': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[11,21],[14,20],[16,18],[17,16],[18,13],[18,8],[17,5],[16,3],[14,1],[11,0],[4,0]] },
    'E': { width: 19, points: [[4,21],[4,0],[-1,-1],[4,21],[17,21],[-1,-1],[4,11],[12,11],[-1,-1],[4,0],[17,0]] },
    'F': { width: 18, points: [[4,21],[4,0],[-1,-1],[4,21],[17,21],[-1,-1],[4,11],[12,11]] },
    'G': { width: 21, points: [[18,16],[17,18],[15,20],[13,21],[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[18,8],[-1,-1],[13,8],[18,8]] },
    'H': { width: 22, points: [[4,21],[4,0],[-1,-1],[18,21],[18,0],[-1,-1],[4,11],[18,11]] },
    'I': { width: 8, points: [[4,21],[4,0]] },
    'J': { width: 16, points: [[12,21],[12,5],[11,2],[10,1],[8,0],[6,0],[4,1],[3,2],[2,5],[2,7]] },
    'K': { width: 21, points: [[4,21],[4,0],[-1,-1],[18,21],[4,7],[-1,-1],[9,12],[18,0]] },
    'L': { width: 17, points: [[4,21],[4,0],[-1,-1],[4,0],[16,0]] },
    'M': { width: 24, points: [[4,21],[4,0],[-1,-1],[4,21],[12,0],[-1,-1],[20,21],[12,0],[-1,-1],[20,21],[20,0]] },
    'N': { width: 22, points: [[4,21],[4,0],[-1,-1],[4,21],[18,0],[-1,-1],[18,21],[18,0]] },
    'O': { width: 22, points: [[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[19,8],[19,13],[18,16],[17,18],[15,20],[13,21],[9,21]] },
    'P': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[13,21],[16,20],[17,19],[18,17],[18,14],[17,12],[16,11],[13,10],[4,10]] },
    'Q': { width: 22, points: [[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[19,8],[19,13],[18,16],[17,18],[15,20],[13,21],[9,21],[-1,-1],[12,4],[18,-2]] },
    'R': { width: 21, points: [[4,21],[4,0],[-1,-1],[4,21],[13,21],[16,20],[17,19],[18,17],[18,15],[17,13],[16,12],[13,11],[4,11],[-1,-1],[11,11],[18,0]] },
    'S': { width: 20, points: [[17,18],[15,20],[12,21],[8,21],[5,20],[3,18],[3,16],[4,14],[5,13],[7,12],[13,10],[15,9],[16,8],[17,6],[17,3],[15,1],[12,0],[8,0],[5,1],[3,3]] },
    'T': { width: 16, points: [[8,21],[8,0],[-1,-1],[1,21],[15,21]] },
    'U': { width: 22, points: [[4,21],[4,6],[5,3],[7,1],[10,0],[12,0],[15,1],[17,3],[18,6],[18,21]] },
    'V': { width: 18, points: [[1,21],[9,0],[-1,-1],[17,21],[9,0]] },
    'W': { width: 24, points: [[2,21],[7,0],[-1,-1],[12,21],[7,0],[-1,-1],[12,21],[17,0],[-1,-1],[22,21],[17,0]] },
    'X': { width: 20, points: [[3,21],[17,0],[-1,-1],[17,21],[3,0]] },
    'Y': { width: 18, points: [[1,21],[9,11],[9,0],[-1,-1],[17,21],[9,11]] },
    'Z': { width: 20, points: [[17,21],[3,0],[-1,-1],[3,21],[17,21],[-1,-1],[3,0],[17,0]] },
    '[': { width: 14, points: [[4,25],[4,-7],[-1,-1],[5,25],[5,-7],[-1,-1],[4,25],[11,25],[-1,-1],[4,-7],[11,-7]] },
    '\\': { width: 14, points: [[0,21],[14,-3]] },
    ']': { width: 14, points: [[9,25],[9,-7],[-1,-1],[10,25],[10,-7],[-1,-1],[3,25],[10,25],[-1,-1],[3,-7],[10,-7]] },
    '^': { width: 16, points: [[6,15],[8,18],[10,15],[-1,-1],[3,12],[8,17],[13,12],[-1,-1],[8,17],[8,0]] },
    '_': { width: 16, points: [[0,-2],[16,-2]] },
    '`': { width: 10, points: [[6,21],[5,20],[4,18],[4,16],[5,15],[6,16],[5,17]] },
    'a': { width: 19, points: [[15,14],[15,0],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'b': { width: 19, points: [[4,21],[4,0],[-1,-1],[4,11],[6,13],[8,14],[11,14],[13,13],[15,11],[16,8],[16,6],[15,3],[13,1],[11,0],[8,0],[6,1],[4,3]] },
    'c': { width: 18, points: [[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'd': { width: 19, points: [[15,21],[15,0],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'e': { width: 18, points: [[3,8],[15,8],[15,10],[14,12],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'f': { width: 12, points: [[10,21],[8,21],[6,20],[5,17],[5,0],[-1,-1],[2,14],[9,14]] },
    'g': { width: 19, points: [[15,14],[15,-2],[14,-5],[13,-6],[11,-7],[8,-7],[6,-6],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'h': { width: 19, points: [[4,21],[4,0],[-1,-1],[4,10],[7,13],[9,14],[12,14],[14,13],[15,10],[15,0]] },
    'i': { width: 8, points: [[3,21],[4,20],[5,21],[4,22],[3,21],[-1,-1],[4,14],[4,0]] },
    'j': { width: 10, points: [[5,21],[6,20],[7,21],[6,22],[5,21],[-1,-1],[6,14],[6,-3],[5,-6],[3,-7],[1,-7]] },
    'k': { width: 17, points: [[4,21],[4,0],[-1,-1],[14,14],[4,4],[-1,-1],[8,8],[15,0]] },
    'l': { width: 8, points: [[4,21],[4,0]] },
    'm': { width: 30, points: [[4,14],[4,0],[-1,-1],[4,10],[7,13],[9,14],[12,14],[14,13],[15,10],[15,0],[-1,-1],[15,10],[18,13],[20,14],[23,14],[25,13],[26,10],[26,0]] },
    'n': { width: 19, points: [[4,14],[4,0],[-1,-1],[4,10],[7,13],[9,14],[12,14],[14,13],[15,10],[15,0]] },
    'o': { width: 19, points: [[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3],[16,6],[16,8],[15,11],[13,13],[11,14],[8,14]] },
    'p': { width: 19, points: [[4,14],[4,-7],[-1,-1],[4,11],[6,13],[8,14],[11,14],[13,13],[15,11],[16,8],[16,6],[15,3],[13,1],[11,0],[8,0],[6,1],[4,3]] },
    'q': { width: 19, points: [[15,14],[15,-7],[-1,-1],[15,11],[13,13],[11,14],[8,14],[6,13],[4,11],[3,8],[3,6],[4,3],[6,1],[8,0],[11,0],[13,1],[15,3]] },
    'r': { width: 13, points: [[4,14],[4,0],[-1,-1],[4,8],[5,11],[7,13],[9,14],[12,14]] },
    's': { width: 17, points: [[14,11],[13,13],[10,14],[7,14],[4,13],[3,11],[4,9],[6,8],[11,7],[13,6],[14,4],[14,3],[13,1],[10,0],[7,0],[4,1],[3,3]] },
    't': { width: 12, points: [[5,21],[5,4],[6,1],[8,0],[10,0],[-1,-1],[2,14],[9,14]] },
    'u': { width: 19, points: [[4,14],[4,4],[5,1],[7,0],[10,0],[12,1],[15,4],[-1,-1],[15,14],[15,0]] },
    'v': { width: 16, points: [[2,14],[8,0],[-1,-1],[14,14],[8,0]] },
    'w': { width: 22, points: [[3,14],[7,0],[-1,-1],[11,14],[7,0],[-1,-1],[11,14],[15,0],[-1,-1],[19,14],[15,0]] },
    'x': { width: 17, points: [[3,14],[14,0],[-1,-1],[14,14],[3,0]] },
    'y': { width: 16, points: [[2,14],[8,0],[-1,-1],[14,14],[8,0],[6,-4],[4,-6],[2,-7],[1,-7]] },
    'z': { width: 17, points: [[14,14],[3,0],[-1,-1],[3,14],[14,14],[-1,-1],[3,0],[14,0]] },
    '{': { width: 14, points: [[9,25],[7,24],[6,23],[5,21],[5,19],[6,17],[7,16],[8,14],[8,12],[6,10],[-1,-1],[7,24],[6,22],[6,20],[7,18],[8,17],[9,15],[9,13],[8,11],[4,9],[8,7],[9,5],[9,3],[8,1],[7,0],[6,-2],[6,-4],[7,-6],[-1,-1],[6,8],[8,6],[8,4],[7,2],[6,1],[5,-1],[5,-3],[6,-5],[7,-6],[9,-7]] },
    '|': { width: 8, points: [[4,25],[4,-7]] },
    '}': { width: 14, points: [[5,25],[7,24],[8,23],[9,21],[9,19],[8,17],[7,16],[6,14],[6,12],[8,10],[-1,-1],[7,24],[8,22],[8,20],[7,18],[6,17],[5,15],[5,13],[6,11],[10,9],[6,7],[5,5],[5,3],[6,1],[7,0],[8,-2],[8,-4],[7,-6],[-1,-1],[8,8],[6,6],[6,4],[7,2],[8,1],[9,-1],[9,-3],[8,-5],[7,-6],[5,-7]] },
    '~': { width: 24, points: [[3,6],[3,8],[4,11],[6,12],[8,12],[10,11],[14,8],[16,7],[18,7],[20,8],[21,10],[-1,-1],[3,8],[4,10],[6,11],[8,11],[10,10],[14,7],[16,6],[18,6],[20,7],[21,10],[21,12]] }
};

CanvasTextFunctions.letter = function (ch)
{
    return CanvasTextFunctions.letters[ch];
}

CanvasTextFunctions.ascent = function( font, size)
{
    return size;
}

CanvasTextFunctions.descent = function( font, size)
{
    return 7.0*size/25.0;
}

CanvasTextFunctions.measure = function( font, size, str)
{
    var total = 0;
    var len = str.length;

    for ( i = 0; i < len; i++) {
        var c = CanvasTextFunctions.letter( str.charAt(i));
        if ( c) total += c.width * size / 25.0;
    }
    return total;
}

CanvasTextFunctions.draw = function(ctx,font,size,x,y,str)
{
    var total = 0;
    var len = str.length;
    var mag = size / 25.0;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = 2.0 * mag;

    for ( i = 0; i < len; i++) {
	var c = CanvasTextFunctions.letter( str.charAt(i));
	if ( !c) continue;

	ctx.beginPath();

	var penUp = 1;
	var needStroke = 0;
	for ( j = 0; j < c.points.length; j++) {
	    var a = c.points[j];
	    if ( a[0] == -1 && a[1] == -1) {
		penUp = 1;
		continue;
	    }
	    if ( penUp) {
            ctx.moveTo( x + a[0]*mag, y - a[1]*mag);
            penUp = false;
	    } else {
		    ctx.lineTo( x + a[0]*mag, y - a[1]*mag);
	    }
	}
	ctx.stroke();
	x += c.width*mag;
    }
    ctx.restore();
    return total;
}

CanvasTextFunctions.enable = function( ctx)
{
    ctx.drawText = function(font,size,x,y,text) { return CanvasTextFunctions.draw( ctx, font,size,x,y,text); };

    ctx.drawTextVCenter = function(font,size,x,y,text)
    {
        return CanvasTextFunctions.draw( ctx, font,size,x,y + (size / 2),text);
    }

    ctx.measureText = function(font,size,text) { return CanvasTextFunctions.measure( font,size,text); };
    ctx.fontAscent = function(font,size) { return CanvasTextFunctions.ascent(font,size); }
    ctx.fontDescent = function(font,size) { return CanvasTextFunctions.descent(font,size); }

    ctx.drawTextAngle = function(text, size, x, y, angle)
    {
        // arguments[5] is xOffset
        // arguments[6] is background color
        return CanvasTextFunctions.drawTextAngle(ctx, text, size, x, y, angle, arguments[5], arguments[6]);
    }

    ctx.drawTextRight = function(font,size,x,y,text) { 
	var w = CanvasTextFunctions.measure(font,size,text);
	return CanvasTextFunctions.draw( ctx, font,size,x-w,y,text); 
    };
    ctx.drawTextCenter = function(font,size,x,y,text) { 
	var w = CanvasTextFunctions.measure(font,size,text);
	return CanvasTextFunctions.draw( ctx, font,size,x-w/2,y,text); 
    };
}


/**
* Draws text at an angle
* 
* @param object context The context object
* @param string text    The text to write
* @param int    size    The size of the text
* @param int    x       The X coord
* @param int    y       The Y coord
* @param angle  int     The angle to draw the text at (DEGREES)
*/
CanvasTextFunctions.drawTextAngle = function (ctx, text, size, x, y, angle, xOffset, backgroundColor)
{
    /**
    * Measure the size of the text
    */
    var textSize = parseInt(CanvasTextFunctions.measure('sans',size,text));

    // Convert the angle to radians
    angle = Number((Math.PI / 180) * angle);

    // Translate to the given x/y coords
    ctx.translate(x, y);
    
    // Rotate the canvas
    ctx.rotate(angle);
    
    // If a background color is specified, draw arectangle in that color
    if (backgroundColor) {
        var tmp = ctx.fillStyle;
        var tmp2 = ctx.strokeStyle;

        ctx.fillStyle   = backgroundColor;
        ctx.strokeStyle = '#000';

        ctx.strokeRect(0 + xOffset - 2,-12,textSize + 4,14);
        ctx.fillRect(0 + xOffset - 2,-12,textSize + 4,14);
        
        ctx.fillStyle = tmp;
        ctx.strokeStyle = tmp2;
    }

    // Write the text
    ctx.drawText('sans', size, 0 + xOffset,0, text);

    ctx.moveTo(0,0);

    // Rotate the canvas back
    ctx.rotate(0 - angle);
    
    // Translate back
    ctx.translate(0 - x, 0 - y);
}


