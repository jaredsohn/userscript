// ==UserScript==
// @name           Mais de Mil Comunidades
// @author         http://www.orkut.com/Profile.aspx?uid=5796590649311324067
// @namespace      http://notenho.com
// @description    Participe de Maid de Mil Comunidades!
// @include        http://www.orkut.com/Community.aspx*
// @include        http://www.orkut.com/CommLimit.aspx*
// ==/UserScript==

var script_ = function joinComunidade(){

	var d = document.body.innerHTML;
	var p=d.match(/.CommLimit.aspx(.*)cmm=(\d+)/gi);
	for (var i=0 ; i < p.length ; i++){
		javascript = "javascript:sayjoin('"+p[i].match(/cmm.(\d+)/gi)+"')";
		document.body.innerHTML=document.body.innerHTML.replace(p[i],javascript);
	}

	function sayjoin(cmm){
		scrap = window.open("http://www.orkut.com/CommLimit.aspx?"+cmm,'','width=50,height=50');
		setTimeout('joinm("'+cmm+'")',3000);
	}
	function joinm(cmm){
		form=scrap.document.forms[0];
		form.action='CommLimit.aspx?Action.join&'+cmm;
		form.submit();
		setTimeout('scrap.close();',3000);
	}
}

//--------------------------------------------
// Insere Script na pagina
//--------------------------------------------
var sub1="0"+script_+"0";
var sub2=sub1.substring(24,sub1.length - 4);

var script = document.createElement('script');
script.innerHTML = sub2
document.body.insertBefore(script, document.body.firstChild);