// ==UserScript==
// @name           vote_pro
// @namespace      xiaonei
// @include        http://*.xiaonei.com/knowabc/*/Voted.action*
// ==/UserScript==

function toggle_func()
{
	var v = 4*(document.getElementById("chk_nor").checked);
	v += 2*(document.getElementById("chk_log").checked);
	v += (document.getElementById("chk_dc").checked);
	//alert(v);
	
	switch (v) {
	case 1: l = getlength(0,0,1);
			break;
	case 2: if (this.id == "chk_nor") {
				document.getElementById("chk_log").checked=false;
				l = getlength(0,0,0);
			}else {
				document.getElementById("chk_nor").checked=true;
				l = getlength(1,1,0);
			}
			break;
	case 3: if (this.id == "chk_nor") {
				document.getElementById("chk_log").checked=false;
				l = getlength(0,0,1);
			}else {
				document.getElementById("chk_nor").checked=true;
				l = getlength(1,1,1);
			}
			break;
	case 4:	l = getlength(1,0,0);
			break;
	case 5:	l = getlength(1,0,1);
			break;
	case 6:	l = getlength(1,1,0);
			break;
	case 7:	l = getlength(1,1,1);
			break;
	default:
			l = getlength(0,0,0);
	}
	for (var i in l) {
		//if (!oldlength[i]) oldlength[i]= parseInt(document.getElementById(i).style.width);
		document.getElementById(i).style.width = l[i]+"px";
	}
}

function getlength(n,l,d)
{
	var rec = document.getElementsByClassName("record");
	var lengthdata = new Array();
	for (var i=0; i<rec.length; i++) {
		var v = parseInt(rec[i].textContent);
		lengthdata["bg"+(i+1)] = v;
	}
	if (l) {
		for (var i in lengthdata) {
			lengthdata[i] = (lengthdata[i]==0)?0:1+Math.log(lengthdata[i])*Math.LOG10E;
		}
	}
	var mx = 0;
	var mn = 1e10;
	var tot = 0;
	for (var i in lengthdata) {
		if (lengthdata[i]>mx) mx = lengthdata[i];
		if (lengthdata[i]<mn) mn = lengthdata[i];
		tot += lengthdata[i];
	}
	if (d) {
		for (var i in lengthdata) {
			lengthdata[i] -= mn;
			tot -= mn;
		}
		mx -= mn;
	}
	for (var i in lengthdata) {
		if (n) {
			lengthdata[i] /= mx;
		}else {
			lengthdata[i] /= tot;
		}
		lengthdata[i] *= 156;
	}
	return lengthdata;
}

function main()
{
	var opt_div = document.createElement("div");
	var htm = "";
	
	htm += '<input id="chk_nor" type="checkbox"/> Normalize ';
	htm += '<input id="chk_log" type="checkbox"/> Logarithm ';
	htm += '<input id="chk_dc" type="checkbox"/> DC Filter ';
	
	opt_div.innerHTML = htm;
	opt_div.style.textAlign = "center";
	var tmp = document.getElementsByClassName("poll_my_summary");
	if (tmp.length)
		tmp = tmp[0];
	else
		tmp = document.getElementById("poll_log");
	tmp.parentNode.insertBefore(opt_div, tmp);
	
	document.getElementById("chk_nor").addEventListener("change", toggle_func, false);
	document.getElementById("chk_log").addEventListener("change", toggle_func, false);
	document.getElementById("chk_dc").addEventListener("change", toggle_func, false);

}

var oldlength = new Array();

window.addEventListener("load", main, false);
