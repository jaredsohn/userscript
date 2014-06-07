// ==UserScript==
// @name           Lucky Cat @ Felix-Halim .NET
// @namespace      Darkpi
// @description    Add Lucky Cat links to "Problem Title", and much more...
// @include        http://uhunt.felix-halim.net/id/*
// ==/UserScript==

var hide_chat = true;
var hide_book = true;
var add_tool = true;
var add_lucky_cat = true;
var default_ext = true; //use external page (i.e. http://uva.onlinejudge.org/external/1/100.html) as default url

var divs = document.getElementsByTagName('div')[0];
if( hide_chat ){
	divs.removeChild(divs.childNodes[3]);
}

if( hide_book ){
	var i;
	var tit = document.getElementsByTagName('h2');

	for( i = 0; i < tit.length; i++ ){
		if( tit[i].innerHTML === 'Competitive Programming Exercises') break;
	}

	var tt = tit[i],tmt;
	var f = 1;
	while( f == 1 ){
		if( tt.nodeName == 'HR') f = 0;
		tmt = tt.nextSibling;
		divs.removeChild( tt );
		tt = tmt;
	}
}
/*
var newE;
var body = document.getElementsByTagName('body')[0];
if( add_lucky_cat ){
	function change_title($){
		$.problem_a = function(p,w){
			return '<span class="problem_title" style="display:inline-block; width:'+w+'px">'+'<a href=http://luckycat.kshs.kh.edu.tw/homework/q'+p[1]+'.htm target=_blank>'+p[2]+'</a>'+'</span>';
		}
	}
	newE = document.createElement('script');
	newE.appendChild(document.createTextNode('(' + change_title + ')(jQuery);$.render_next();'));
	body.appendChild(newE);
}

if( default_ext ){
	function change_link($){
		var isCtrl = false;
		$(document)
			.keydown(function(e){ if (e.ctrlKey) isCtrl = true; return true; })
			.keyup(function(e){ if (!e.ctrlKey) isCtrl = false; return true; });
		$.pid_check_ctrl_click = function(lid){
			if (isCtrl){
				var url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem='+lid;
				window.open(url,'_blank');
				isCtrl = false;
			}else{
				var v = Math.floor(lid/100);
				var url = 'http://uva.onlinejudge.org/external/'+v+'/'+lid+'.html';
				window.open(url,'_blank');
			}
			return false;
		}
	}
}else{
	function change_link($){
		var isCtrl = false;
		$(document)
			.keydown(function(e){ if (e.ctrlKey) isCtrl = true; return true; })
			.keyup(function(e){ if (!e.ctrlKey) isCtrl = false; return true; });
		$.pid_check_ctrl_click = function(lid){
			if (isCtrl){
				var v = Math.floor(lid/100);
				var url = 'http://uva.onlinejudge.org/external/'+v+'/'+lid+'.html';
				window.open(url,'_blank');
				isCtrl = false;
			}else{
				var url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem='+lid;
				window.open(url,'_blank');
			}
			return false;
		}
	}
}
newE = document.createElement('script');
newE.appendChild(document.createTextNode('(' + change_link + ')(jQuery);'));
body.appendChild(newE);

if( add_tool ){
	function ACM(num){
		var url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem='+num;
		window.open(url,'_blank');
		return false;
	}
	function ACMext(num){
		var v = Math.floor(num/100);
		var url = 'http://uva.onlinejudge.org/external/'+v+'/'+num+'.html';
		window.open(url,'_blank');
		return false;
	}
	newE = document.createElement('script');
	newE.appendChild(document.createTextNode(ACM));
	newE.appendChild(document.createTextNode(ACMext));
	body.appendChild(newE);
	var tool = document.createElement('form');
	tool.innerHTML = 'ACM Tool : <input type="text" size="7" name="num" onkeypress="if(event.keyCode == 13)return ACM' + (default_ext?'ext':'')+'(form.num.value)"/> <input type="button" id="ACMbtn" value="Go!" onClick="ACM(form.num.value)"> <input type="button" id="ACMbtn" value="external" onClick="ACMext(form.num.value)">';
	var user = document.getElementsByTagName('form')[0];
	user.parentNode.insertBefore(tool, user.nextSibling);
}
*/
