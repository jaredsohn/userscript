// ==UserScript==
// @name		   Makes coords of your villages as target for trade/rally (v2.1)
// @version 	   2.1
// @date          2009-06-16
// @author        Anton Fedorov <datacompboy@a-koss.ru>
// @include       http://*.travian.*/*
// ==/UserScript==
// (c) Anton Fedorov aka DataCompBoy, 2006-2007
// Clan S4 <KazakiYuV2>.

(function(){
  getElementsByClass = function (searchClass,node,tag) {
	  var classElements = new Array();
	  if ( node == null )
		  node = document;
	  if ( tag == null )
		  tag = '*';
	  var els = node.getElementsByTagName(tag);
	  var elsLen = els.length;
	  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	  for (var i = 0, j = 0; i < elsLen; i++) {
		  if ( pattern.test(els[i].className) ) {
			  classElements[j] = els[i];
			  j++;
		  }
	  }
	  return classElements;
  }

var _setValue, _getValue, _removeValue, glStorage, nameSpace = 'TGT.';

function initSaveValue() {
	if (typeof GM_setValue != "undefined") {
		_setValue = function(name, value) { GM_setValue(name, value)};
		_getValue = function(name,defaultValue) { return GM_getValue(name, defaultValue)};
		_removeValue = function(name) { GM_setValue(name, '')};
	} else {
		_setValue = function(name, value) {
			document.cookie = nameSpace + name + '=' + escape(value) + ';expires="";path=/';
		};
		_getValue = function(name, defaultValue) {
			var reg = new RegExp(nameSpace + name + "=([^;\n\r]*);?", "i");
			var data = reg.exec(document.cookie);
			if (data == null || data.length <= 1) {
			return defaultValue;
			} else	return unescape(data[1]);
		};
		_removeValue = function(name) {
			_setValue(name, '');
		};
	}
}

  var timer=1; for(; document.getElementById("tp"+timer); timer++) ;
  function travtmfmt(hrs) {
	  var h = Math.floor(hrs);
	  var m = Math.floor((hrs-h)*60);
	  var s = Math.ceil(((hrs-h)*60-m)*60);
	  return h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
  }
  var travDate = new Date((new Date).toDateString()+" "+document.getElementById("tp1").innerHTML);
  function travtmenfmt(hrs) {
	  var date = new Date(travDate);
	  var futdate = new Date(travDate);
	  var expdate = futdate.getTime();
	  expdate += hrs*3600*1000; //expires in 1 hour(milliseconds)
	  futdate.setTime(expdate);
	  var ds = "";
	  if (futdate.getDate()!=date.getDate() && hrs > 24) {
		  ds += futdate.getYear() + "-";
		  var m = futdate.getMonth()+1;
		  ds += (m<10?"0":"")+m + "-";
		  var d = futdate.getDate();
		  ds += (d<10?"0":"")+d + " ";
	  }
	  var h=futdate.getHours();
	  var m=futdate.getMinutes();
	  var s=Math.max(0, futdate.getSeconds());
	  return /*ds+*/ h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
  }
  function travtime(wait, space) {
	  var st = "";
	  if (wait<0) {
		wait = -wait;
		st = " style='color:red;'";
	  }
	  if(!space) space = " ";
	  if (wait!=null) {
		return " (" + travtmfmt(wait) + space + "<span id=tp" + (timer++) + st + ">" + travtmenfmt(wait)+ "</span>" + ")";
	  } else {
		return "(-never-)";
	  }
  }

  var f = document.forms[0]; if (f.wrappedJSObject) f=f.wrappedJSObject;
  if (f && f.x && f.y) {
    var navi = document.getElementById("navi_table");
	if (!navi) navi = document.getElementById("sleft");
	var uid = navi.innerHTML.match(/spieler\.php\?uid=([0-9]+)/)[1];
	initSaveValue();
	GM_registerMenuCommand('Transfer speed - ' + (_getValue('tgt_race_'+uid, '1') == '0' ? '+' : '-') + "OFF",	  function(){if(_getValue('tgt_race_'+uid, '1')!='0') {_setValue('tgt_race_'+uid, '0');window.location.reload()}});
	GM_registerMenuCommand('Transfer speed - ' + (_getValue('tgt_race_'+uid, '1') == '1' ? '+' : '-') + "Gally",  function(){if(_getValue('tgt_race_'+uid, '1')!='1') {_setValue('tgt_race_'+uid, '1');window.location.reload()}});
	GM_registerMenuCommand('Transfer speed - ' + (_getValue('tgt_race_'+uid, '1') == '2' ? '+' : '-') + "Teuton", function(){if(_getValue('tgt_race_'+uid, '1')!='2') {_setValue('tgt_race_'+uid, '2');window.location.reload()}});
	GM_registerMenuCommand('Transfer speed - ' + (_getValue('tgt_race_'+uid, '1') == '3' ? '+' : '-') + "Rome",   function(){if(_getValue('tgt_race_'+uid, '1')!='3') {_setValue('tgt_race_'+uid, '3');window.location.reload()}});
	GM_registerMenuCommand('Transfer speed - target: ' + (_getValue('tgt_target', '(-114|-39)')),
	   function(){
		 var target1 = _getValue('tgt_target', '(-114|-39)');
		 var target2 = prompt("Input target coords:", target1);
		 var xy = target2.match(/([-0-9]+)[^-0-9]+([-0-9]+)/);
		 target2 = "("+xy[1]+"|"+xy[2]+")";
		 if (target2!=target1) {
		   _setValue('tgt_target', target2);
		   window.location.reload()
		 }
	   });
	var Speed = 0;
	var bxy = _getValue('tgt_target', '(-114|-39)').match(/([-0-9]+)[^-0-9]+([-0-9]+)/);
	var bx=parseInt(bxy[1]), by=parseInt(bxy[2]);
	if (_getValue('tgt_race_'+uid, '1')=='0') Speed = 0;
	if (_getValue('tgt_race_'+uid, '1')=='1') Speed = 24;
	if (_getValue('tgt_race_'+uid, '1')=='2') Speed = 12;
	if (_getValue('tgt_race_'+uid, '1')=='3') Speed = 16;
	if (document.location.href.match('speed')) Speed *= 3;

	if (Speed && (f.x.value=='' || f.y.value=='')) { f.x.value = bx; f.y.value = by; }
	var lr = document.getElementById("lright1");
	if(!lr) lr = document.getElementById("vlist");
	var as = lr.getElementsByTagName("a");
	var M = (as[1].getAttribute('href').match(/gid=17/));
	for (var i=as.length-1; i>=0; i--) {
	  var url = as[i].getAttribute('href');
	  if (url) {
		var m=url.match(/[?]newdid=([0-9]+)/);
		if (m && m[1]) {
		  var tbl = as[i].parentNode ? as[i].parentNode.parentNode : as[i].parentElement.parentElement;
		  var xcoord = getElementsByClass("dlist1", tbl, "td")[0]; if (!xcoord) xcoord = getElementsByClass("cox", tbl)[0];
		  var ycoord = getElementsByClass("dlist3", tbl, "td")[0]; if (!ycoord) ycoord = getElementsByClass("coy", tbl)[0];
		  var x = parseInt(xcoord.innerHTML.substr(1));
		  var y = parseInt(ycoord.innerHTML);
		  var c = document.createElement("a");
		  c.setAttribute("href", "#");
		  var cc = c.wrappedJSObject ? c.wrappedJSObject : c;
		  cc.onclick = (function(f,x,y){ return function() { f.x.value = x; f.y.value = y; return false; } })(f,x,y);
		  c.innerHTML = xcoord.innerHTML;
		  xcoord.innerHTML = ""; xcoord.appendChild(c);
		  c = document.createElement("a");
		  c.setAttribute("href", "#");
		  var cc = c.wrappedJSObject ? c.wrappedJSObject : c;
		  cc.onclick = (function(f,x,y){ return function() { f.x.value = x; f.y.value = y; return false; } })(f,x,y);
		  c.innerHTML = ycoord.innerHTML;
		  ycoord.innerHTML = ""; nobr=document.createElement('nobr');
		  ycoord.appendChild(nobr);
		  nobr.appendChild(c);
		  var t = document.createElement('span');
		  nobr.appendChild(t);
		  if (Speed && M && !(x==bx && y==by))
			t.innerHTML = travtime( Math.round(Math.sqrt( (bx-x)*(bx-x)+(by-y)*(by-y) )/Speed * 3600)/3600 );
		}
	  }
	}
  }

})();
