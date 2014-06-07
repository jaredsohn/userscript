// ==UserScript==
// @name Orkut Login
// @author Moises Lima | Translation - Jerry (http://orkutplus.blogspot.com)
// @version 0.5
// @description One Time Login for all your profiles and then you can switch between them with a single click. 
// @include http://*orkut.com*
// ==/UserScript==

if (location.hostname.indexOf('orkut.com') >-1 ) {
addEventListener('DOMContentLoaded',function(){

	var userAtual=document.getElementsByTagName("b")[0].innerHTML;
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; domain=.orkut.com; ";
		document.cookie = name+"="+value+expires+"; domain=www.orkut.com; ";
	}
	
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
	
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
	
	function packCookie(cookie){
		var cookie=cookie.split("ORKUTPREF=")[1].split(":");
		var pf=[];
		for(var i=0;i < cookie.length-1;i++) {
			var orkutPref=cookie[i].split("=");
			if(orkutPref.length==1){
				pf[orkutPref[1]] ="";
			}else if(orkutPref.length==2){
				pf[orkutPref[1]] = pf[orkutPref[1]] ||"";
				pf[orkutPref[1]] +=((pf[orkutPref[1]]!="")?"$":"")+orkutPref[0];
			}else if(orkutPref.length>2){
				var tempPref="";
				for(var j=1;j < orkutPref.length;j++) {
					tempPref+=orkutPref[j]+((tempPref.length >=1)?"=":"");
				}
				if(typeof pf[tempPref] =="undefined"){
					pf[tempPref] =orkutPref[0];
				}else{
					pf[tempPref] +="$"+orkutPref[0];
				}
			}
		}
		var pfString="";
		for(var x in pf){
			pfString+=((pfString !="")?",":"")+x+":"+pf[x];
		}
		return pfString;
	}
	
	function unpackCookie(cookie){
		var cookie=cookie.split(",");
		var pf={ID:"",INF:"",SET:"",LNG:"",CNT:"",RM:"",USR:"",PHS:"",TS:"",LCL:"",NET:"",TOS:"",GC:"",PE:"",GTI:"",GID:"",VER:"",S:""};
		for(var i=0;i < cookie.length;i++) {
			var vars=cookie[i].split(":");
			var varsN=vars[1].split("$");
			if(varsN.length >1){
				for(var j=0;j < varsN.length;j++) {
					pf[varsN[j]]=vars[0];
				}
			}else pf[vars[1]]=vars[0];
		}
		var pfString="ORKUTPREF=";
		for(x in pf){
			pfString+=x+"="+pf[x]+":";
		}
		return pfString;
	}
	
	saveUser =function(r) {
		
		var divLoad = document.createElement("div");
		divLoad.id="divLoad";
		divLoad.style="display:block; position:fixed;background:#E5ECF4; padding:5px; border:solid #BFD0EA 2px;margin-left:40%;  top:150px;";
		divLoad.innerHTML ="<img src='http://img1.orkut.com/img/spin.gif' ><b>Loading…</b> ";
		document.body.appendChild(divLoad);
		var ajax = new XMLHttpRequest();
		ajax.open("GET","http://www.orkut.com/FriendAdd.aspx");
		ajax.onload=function(){
			var userPhoto=this.responseText.match(/(\d+\/\d+)/i)[0];
			if(!userPhoto){
				var userPhoto="no";
			}
			var users=readCookie("users");
			if(users){
				users=users.replace(userAtual+",","");
				createCookie("users",(userAtual+((users)?","+users:",")),500);
			}else createCookie("users",userAtual+",",500);
			createCookie(userAtual,packCookie(readCookie("orkut_state"))+"::"+userPhoto,500);
			if(!r)location.reload();
		}
		ajax.send(null);
	}
	deleteUser =function(mail) {
		if(confirm("Are You Sure You Want To Delete This User?")){
			var users=readCookie("users");
			if(users){
				users=users.replace(mail+",","");
				createCookie("users",users,500);
				eraseCookie(mail);
				location.reload();
			}
		}
	}
	loginUser =function(mail) {
		eraseCookie("orkut_state");
		eraseCookie("orkut_state");
		createCookie("orkut_state",unpackCookie(readCookie(mail).split("::")[0]),500);
		location.reload();
	}

    function findPos(obj) {
	    var curleft = curtop = 0;
		if (obj.offsetParent) {
		    curleft = obj.offsetLeft
			curtop = obj.offsetTop
			while (obj = obj.offsetParent) {
			    curleft += obj.offsetLeft
				curtop += obj.offsetTop
			}
		}
		return [curleft,curtop];
	}

	
	var linkLogin = document.createElement("li") ; 
	linkLogin.innerHTML ='&nbsp;|&nbsp;<a href="Javascript:void(0);">Users</a>';
	linkLogin.id="linkLogin"
	linkLogin.addEventListener('mouseover',function () {
		var menuRollOverU=document.getElementById('menuRollOverU');
		var pos=findPos(this);
		if(menuRollOverU){
			menuRollOverU.style.visibility= "visible";
			menuRollOverU.style.left=pos[0];
			menuRollOverU.style.top=(pos[1]+20);
		}else{
			var users=readCookie("users");
			
			var menuRollOverU = document.createElement("table") ; 
			menuRollOverU.innerHTML ='<tr><td><a  class="userbutton" href="javascript:void(0)" onclick="saveUser()">Add User</a></td><td class="listitem" style="border:1px #d9e6f7 solid;">&nbsp;</td></tr>';
			menuRollOverU.id="menuRollOverU";
			menuRollOverU.style.visibility= "visible";
			menuRollOverU.style.backgroundColor="white";
			menuRollOverU.style.position="absolute";
			menuRollOverU.style.left=pos[0];
			menuRollOverU.style.top=(pos[1]+20);
			document.body.appendChild(menuRollOverU);
			menuRollOverU.addEventListener('mouseover',function () {
				this.style.visibility= "visible";
			},false);
			menuRollOverU.addEventListener('mouseout',function () {
				this.style.visibility= "hidden";
			},false);
			if(users){
				var users=users.split(",")
				var usersMenu=document.getElementById("usersMenu");
				for( var i = 0, mail; mail = users[i]; i++ ) {
					var userCookie=readCookie(mail);
					if(userCookie !=null && !userCookie.match(/no$/gi)){
						var userPhoto = "http://img3.orkut.com/images/small/"+userCookie.split("::")[1]+".jpg";
					}else var userPhoto="http://img3.orkut.com/img/i_nophoto64.gif";
					menuRollOverU.innerHTML+=''
					+'<tr><td><a style="height:100%;" class="userbutton"  href="javascript:void(0)" onclick="loginUser(\''+mail+'\')">'
					+'<img style="max-width:30px;" src="'+userPhoto+'"  />'+mail+'</a></td>'
					+'<td class="listitem" style="border:1px #d9e6f7 solid;"><a href="javascript:void(0)" onclick="deleteUser(\''+mail+'\')">'
					+'<img src="http://www.orkut.com/img/pres2.gif" /></a></td></tr>';
				}
			}
		}
	},false);
	
	document.getElementsByTagName('ul')[1].appendChild(linkLogin)

},false);
}

