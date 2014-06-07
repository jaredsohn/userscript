// JavaScript Document

// ==UserScript==
// @name 3Estudio Adicionar
// @namespace http://www.orkut.com.br
// @description 3ESTUDIO.COM.BR FADDER
// @include http://www.orkut.com.br/*
// ==/UserScript==


var url=document.location.href;

var userId=url.split('?uid=')[1];

	if(url.indexOf('Main#FriendAdd?')>=0){
		var prfls = new Array();
		var ancrs = document.getElementsByTagName("a");
		var currstat = document.getElementsByTagName('b').item(1).innerHTML;
		
		console.log(currstat);
		//alert(ancrs.length);
		//console.log(ancrs.length);
		
	}
	/*
		if(url.indexOf('alreadyadded')>=0){	
			var j=0;
			for (var xi = 0; xi < ancrs.length ; xi++){
				if(ancrs[xi].href.indexOf("Profile.aspx")>=0&&ancrs[xi].innerHTML.indexOf("<img")==-1){
					prfls[j]=ancrs[xi].href.split('?uid=')[1];
					alert(ancrs[xi].href.split('?uid=')[1]);
					j++;
				}
			}
			//document.location.href='http://www.orkut.com.br/Profile.aspx?uid='+prfls[Math.floor(Math.random()*j)];
		}else{
		//http://www.orkut.com.br/Main#FriendAdd?rl=lo&uid=12979534924821303724
		//document.location.href='http://www.orkut.com.br/Main#FriendAdd.aspx?rl=lo&uid='+userId;
		}
	}
	
if(url.indexOf('FriendAdd.aspx')>=0){
	var currstat = document.getElementsByTagName('b').item(1).innerHTML;
	if(currstat.indexOf('We are awaiting a response')>=0||currstat.indexOf('is already your friend')>=0||currstat.indexOf('add yourself')

>=0){
		//document.location.href='http://www.orkut.com.br/Main#Profile.aspx?uid='+userId+'&alreadyadded';
	}else{
		//document.location.href="javascript:submitForm(document.getElementsByTagName('tr').item(22),'yes','Sou da Vide Model, estarei em 

araraquara no dia 1, posso te add?')";
		alert("Adicionar");
	}
}
*/