// ==UserScript==
// @name           Multi login no orkut by Teo
// @namespace      Modificado por Teo
// @description    Multiplos login no orkut
// @include        http://*.orkut.*/*
/*
 *Criado por Andre 
 *Modificado por Teodorak
 */
// ==/UserScript==

try
{
	data = GM_getValue('data', '').split("][");
}
catch(ex){}

function xTry( n )
{
	if (n-1 in data){
	var x = data[n-1].split("|");
	return {"email" : x[0], "senha" : x[1]};
	}
	return {"email" : "- not inserted -", "senha" : null};
}

//Get logins and passwords from about:config
var emaildata = [
	xTry(1).email,
	xTry(2).email,
	xTry(3).email,
	xTry(4).email,
	xTry(5).email
	];
	
var passdata = [
	xTry(1).senha,
	xTry(2).senha,
	xTry(3).senha,
	xTry(4).senha,
	xTry(5).senha
	];

	function showdiv(close, id){
		div = document.getElementById(id);
		if(div.style.display=='none'){
			div.style.display='';
		}
		else{
			div.style.display='none';
		}
		if(close){
			document.getElementById('SteinnScriptId').getElementsByTagName('select')[0].selectedIndex=0;
		}
	}
	function deletecookie(email, pass){
		GM_xmlhttpRequest({
		  method: "GET",
		  url: "https://www.google.com/accounts/ClientLogin?service=orkut&Email="+email+"&Passwd="+pass+"&skipvpage=true",
		  onload: function(response){
				try{
					location.href="http://www.orkut.com/RedirLogin?auth="+response.responseText.match(/Auth=(.*)\n/i)[1]+'&page='+(location.href).replace('&', '%26');
				}
				catch(ex){
					alert('\t\tOrkut Multi-Login:\n\n\tError: Wrong Login/Senha');
					document.getElementById('SteinnScriptId').getElementsByTagName('select')[0].selectedIndex=0;
				}
		  }
		});
	}
	function login(){
		base = document.getElementById('formEAM');
		deletecookie(base.getElementsByTagName('input')[0].value, base.getElementsByTagName('input')[1].value);
	}
	function save(){
		idbase = document.getElementById('configEAM');
		Email1 = idbase.getElementsByTagName('input')[0].value;
		Senha1 = idbase.getElementsByTagName('input')[1].value;
		Account1 = [Email1,Senha1].join('|');
		
		Email2 = idbase.getElementsByTagName('input')[2].value;
		Senha2 = idbase.getElementsByTagName('input')[3].value;
		Account2 = [Email2,Senha2].join('|');

		Email3 = idbase.getElementsByTagName('input')[4].value;
		Senha3 = idbase.getElementsByTagName('input')[5].value;
		Account3 = [Email3,Senha3].join('|');
		
		Email4 = idbase.getElementsByTagName('input')[6].value;
		Senha4 = idbase.getElementsByTagName('input')[7].value;
		Account4 = [Email4,Senha4].join('|');
		
		Email5 = idbase.getElementsByTagName('input')[8].value;
		Senha5 = idbase.getElementsByTagName('input')[9].value;
		Account5 = [Email5,Senha5].join('|');
		
		Final = [Account1,Account2,Account3,Account4,Account5].join('][');
		GM_setValue('data', Final);
		location.reload();
	}
function selected(options)
{
	var pass = true;
	switch(options)
	{
		case 2:
			if(passdata[0])
			{
				var pass = false;
				deletecookie(emaildata[0], passdata[0]);
			}
		break;
		case 3:
			if(passdata[1])
			{
				var pass = false;
				deletecookie(emaildata[1], passdata[1]);
			}
		break;
		case 4:
			if(passdata[2])
			{
				var pass = false;
				deletecookie(emaildata[2], passdata[2]);
			}
		case 5:
			if(passdata[3])
			{
				var pass = false;
				deletecookie(emaildata[3], passdata[3]);
			}
		break;
		case 6:
			if(passdata[4])
			{
				var pass = false;
				deletecookie(emaildata[4], passdata[4]);
			}		
		break;
		case 8:
			showdiv(false, 'configEAM');
			var pass = false;
		break;
		case 10:
			showdiv(false, 'formEAM');
		break;
		default:
			document.getElementById('SteinnScriptId').getElementsByTagName('select')[0].selectedIndex=0;
	}
	if(pass)
	{
		document.getElementById('SteinnScriptId').getElementsByTagName('select')[0].selectedIndex=0;
	}
}
/*Creat config DIV */
NewDiv = document.createElement('div');
NewDiv.setAttribute('id', 'configEAM');
NewDiv.setAttribute('style', 'width: 380px; vertical-align:middle; height: 315px; background-color: #4b4949; border: 1px solid #333333; position: fixed; top: 80px; padding: 3; display: none;');
NewDiv.innerHTML='<div style="color: GRAY;">Editar Emails</div><br>'+
				 'Email &nbsp;1:<input name="email" style="position: relative; left: 22px;" type="text"></input><a style="position: relative; left: 25px;" href="javascript: void(0);">Blank</a><br>'+
				 'Senha 1:<input name="senha" style="position: relative; left: 19px;" type="password"></input><br><hr>'+
				 'Email &nbsp;2:<input name="email" style="position: relative; left: 22px;" type="text"></input><a style="position: relative; left: 25px;" href="javascript: void(0);">Blank</a><br>'+
				 'Senha 2:<input name="senha" style="position: relative; left: 19px;" type="password"></input><br><hr>'+				 
				 'Email &nbsp;3:<input name="email" style="position: relative; left: 22px;" type="text"></input><a style="position: relative; left: 25px;" href="javascript: void(0);">Blank</a><br>'+
				 'Senha 3:<input name="senha" style="position: relative; left: 19px;" type="password"></input><br><hr>'+
				 'Email &nbsp;4:<input name="email" style="position: relative; left: 22px;" type="text"></input><a style="position: relative; left: 25px;" href="javascript: void(0);">Blank</a><br>'+
				 'Senha 4:<input name="senha" style="position: relative; left: 19px;" type="password"></input><br><hr>'+
				 'Email &nbsp;5:<input name="email" style="position: relative; left: 22px;" type="text"></input><a style="position: relative; left: 25px;" href="javascript: void(0);">Blank</a><br>'+
				 'Senha 5:<input name="senha" style="position: relative; left: 19px;" type="password"></input><br><hr>'+ 
				 '<div style="float:left; position: relative; bottom: 5px; font-size: 9px; color: gray;"></div>' +
				 '<div style="float:right; position: relative; bottom: 5px;">' +
				 '<span class="grabtn"><a id="EAMsave" href="javascript: void(0);">Save</a></span>' + 
				 '<span class="btnboxr"><img height="1" width="5" src="http://static1.orkut.com/img/b.gif" alt=""/></span>' + 
				 '<span class="grabtn"><a id="EAMcancel" href="javascript: void(0);">Cancel</a></span>' + 
				 '<span class="btnboxr"><img height="1" width="5" src="http://static1.orkut.com/img/b.gif" alt=""/>' + 
				 '</span></div>';

/*Creat Login Form */

Newform = document.createElement('div');
Newform.setAttribute('id', 'formEAM');
Newform.setAttribute('style', 'width: 250px; vertical-align:middle; height: 120px; background-color: #4b4949; border: 1px solid #333333; position: fixed; top: 80px; padding: 3; display: none;');
Newform.innerHTML = '<div style="color: gray;"><center><B>FAZER LOGIN</b></center></div>' +
					'<hr></hr>'+
					'Login: <input name="login" style="position: relative; left: 6px;" type="text"></input><br><br>' +
					'Senha: <input name="password "type="password"></input><br>' +
					'<div style="float:right; position: relative; top: 10px;">' +
					'<span class="grabtn"><a id="EAMlogin" href="javascript: void(0);">Login</a></span>' + 
					'<span class="btnboxr"><img height="1" width="5" src="http://static1.orkut.com/img/b.gif" alt=""/></span>' + 
					'<span class="grabtn"><a id="EAMformcancel" href="javascript: void(0);">Cancel</a></span>' + 
					'<span class="btnboxr"><img height="1" width="5" src="http://static1.orkut.com/img/b.gif" alt=""/>' + 
					'</span></div>';
	document.body.appendChild(Newform);
	document.body.appendChild(NewDiv);	
	document.getElementById("configEAM").style.left =document.body.clientWidth/2-150;	
	document.getElementById("formEAM").style.left =document.body.clientWidth/2-150;

	/*Get values from about:config and past on textbox*/
	idbase = document.getElementById('configEAM');
	idbase.getElementsByTagName('input')[0].value=emaildata[0];
	idbase.getElementsByTagName('input')[1].value=passdata[0];

	idbase.getElementsByTagName('input')[2].value=emaildata[1];
	idbase.getElementsByTagName('input')[3].value=passdata[1];

	idbase.getElementsByTagName('input')[4].value=emaildata[2];
	idbase.getElementsByTagName('input')[5].value=passdata[2];

	idbase.getElementsByTagName('input')[6].value=emaildata[3];
	idbase.getElementsByTagName('input')[7].value=passdata[3];

	idbase.getElementsByTagName('input')[8].value=emaildata[4];
	idbase.getElementsByTagName('input')[9].value=passdata[4];

	//top bar
	function made(div, email){
	div.setAttribute('id', 'SteinnScriptId');
	div.innerHTML = '<select style="height: 17px; font-size: 10px; color: black;">' + 
				'<option selected="true" style="font-size: 10px; font-color: gray;">'+ email + '</option>' +
				'<option style="font-size: 10px;">───────────────────────────</option>' +
				'<option style="font-size: 10px; color: black;">' + emaildata[0] + '</option>' +
				'<option style="font-size: 10px; color: black;">' + emaildata[1] + '</option>' +
				'<option style="font-size: 10px; color: black;">' + emaildata[2] +'</option>' +
				'<option style="font-size: 10px; color: black;">' + emaildata[3] +'</option>' +
				'<option style="font-size: 10px; color: black;">' + emaildata[4] +'</option>' +
				'<option style="font-size: 10px;">───────────────────────────</option>' +
				'<option style="font-size: 10px; color: gray;">Adcionar emails</option>' +
				'<option style="font-size: 10px;">───────────────────────────</option:>' +
				'<option style="font-size: 10px; color: gray;>Area de Login</option>' +
				'</select>';
				
				div.getElementsByTagName('select')[0].addEventListener('change', function(){ selected(this.selectedIndex);}, true);
		}
		if(document.getElementById('gwtPanel')){
			document.getElementById('gwtPanel').addEventListener('load', function(){
				setTimeout(function(){
				if(!document.getElementById('SteinnScriptId')){
					div = document.getElementsByTagName('center')[0].getElementsByTagName('*')[3].getElementsByTagName('span')[1];
					div.setAttribute('id', 'SteinnScriptId');
					made(div, div.innerHTML);
				}	
				},150)
			}, true);
		}
		else if(neworkut=document.getElementsByClassName('mg-grbar')[0]){
			email2 = neworkut.getElementsByTagName('span')[0];
			email = email2.innerHTML;
			email2.setAttribute('id', 'SteinnScriptId');
			made(email2, email);
		}
		else
		{
			var user = document.getElementById('headerin').getElementsByClassName('login')[0].getElementsByTagName('b')[0].innerHTML;
			var div = document.getElementsByClassName('useremail')[0];
			made(div, user);
		}

		
/*Save/cancel/login/blank Events*/
data = idbase.getElementsByTagName('a');
data[0].addEventListener('click', function(){this.parentNode.getElementsByTagName('input')[0].value='- not inserted -';this.parentNode.getElementsByTagName('input')[1].value='';}, true);
data[1].addEventListener('click', function(){this.parentNode.getElementsByTagName('input')[2].value='- not inserted -';this.parentNode.getElementsByTagName('input')[3].value='';}, true);
data[2].addEventListener('click', function(){this.parentNode.getElementsByTagName('input')[4].value='- not inserted -';this.parentNode.getElementsByTagName('input')[5].value='';}, true);
data[3].addEventListener('click', function(){this.parentNode.getElementsByTagName('input')[6].value='- not inserted -';this.parentNode.getElementsByTagName('input')[7].value='';}, true);
data[4].addEventListener('click', function(){this.parentNode.getElementsByTagName('input')[8].value='- not inserted -';this.parentNode.getElementsByTagName('input')[9].value='';}, true);

document.getElementById('EAMsave').addEventListener('click', function(){save();}, true);
document.getElementById('EAMcancel').addEventListener('click', function(){showdiv(true, 'configEAM');}, true);
document.getElementById('EAMlogin').addEventListener('click', function(){login();}, true);
document.getElementById('EAMformcancel').addEventListener('click', function(){showdiv(true, 'formEAM');}, true);