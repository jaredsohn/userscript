// ==UserScript==
// @name yes friends
// @author Seal (atualiza��o by Rodrigo Lacerda)(vers�o Ajax  por Moises Lima) ... translated by Mr Nobody
// @version 1.0
// @description Accepts all friend requests automatically 
// @include http://www.orkut.com/Home.aspx*
// ==/UserScript==


var sc = function sc(){//////////////* AQUI � O COME�O *//////////////
	if(document.forms[1] && location.hostname.indexOf('orkut.com') != -1 && location.href.toLowerCase().indexOf("home.asp") >-1){
		var uids=[];//array que vai os uids
		var POST_TOKEN = encodeURIComponent(document.forms[1].elements[0].value);
		var signature=encodeURIComponent(document.forms[1].elements[1].value);
		var params="POST_TOKEN="+POST_TOKEN+"&signature="+signature+"";
		//Aviso de espera
		var divLoad = document.createElement("div");
		divLoad.id="divLoad";
		divLoad.style.cssText="display:block; position:fixed;background:#E5ECF4; padding:5px; border:solid #BFD0EA 2px;margin-left:40%;  top:150px;";
		divLoad.innerHTML ="<img src='http://images3.orkut.com/img/p_friend.gif' ><b>Loading...</b> ";
		//Faz uma fila das requisi��es
		function ajaxFila(){
			if(uids.length>0)ajaxfight(uids.shift());
			else {
				document.body.removeChild(divLoad);
				alert("Yes Friends \n completed");
			}
		}
		//executa as requisi�oes
		function ajaxfight(uid) {
			var ajax = new XMLHttpRequest();
			ajax.open("POST","/FriendAdd.aspx?Action.yes&"+uid+"");
			ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			ajax.onreadystatechange=function(){
				if (ajax.readyState==4 ) {
					if (ajax.status== 200) {
					    document.getElementById(uid).style.display="none";
					} else {
						alert("	error in ajax cod  : "+ajax.status);
					}
					ajaxFila();//vai buscar outra requisi��o na fila
				}
			}
			ajax.send(params);
		}
		
		function init() {
			var rows = document.evaluate('//td[@class="panel"]/table/tbody/tr[contains(@class,"row")]',document,null,7,null);
			for( var i = 0, row; row =rows.snapshotItem(i); i++ ) {
				if(row.getElementsByTagName("form")[0] && row.getElementsByTagName("a")[1]){
					var uid=row.getElementsByTagName("a")[1].search.replace(/^\?/gi,"");
					row.id=uid;
					uids.push(uid);
				}
			}
			if(uid!="undefined"){
				ajaxFila();
				document.body.appendChild(divLoad);
			}
		}
		var botao = document.createElement('a');
		botao.href = 'javascript:void(0)';
		botao.addEventListener('click',function(){init();},false)
		botao.innerHTML = ' | Add all requests';
		document.getElementById('headerMenu').appendChild(botao);
	}
//})();

}//////////////* AQUI � O FIM *//////////////

//--------------------------------------------
// Insere Script na P�gina
//--------------------------------------------
sc=String(sc);
sc=sc.substring(16,sc.length-2);
script=document.createElement('script');
script.textContent=sc;
document.getElementsByTagName('head')[0].appendChild(script);