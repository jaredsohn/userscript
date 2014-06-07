// ==UserScript==
// @name Orkut Login
// @author Moises Lima (Portuguese version) | Mr Nobody (English Version Translation)
// @version 0.1
// @description Creates a menu to switch user quickly using cookies 
// @include http://*orkut.com*
// ==/UserScript==

function sc() {
if (location.hostname.indexOf('orkut.com') >-1 ) {
(function () {
	var userAtual=document.getElementsByTagName("b")[0].innerHTML;

	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; domain=.orkut.com; ";
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

	saveUser =function() {
		var users=readCookie("users");
		if(users){
			users=users.replace(userAtual+",","");
			createCookie("users",(userAtual+((users)?","+users:",")),500);
		}else createCookie("users",userAtual+",",500);
		createCookie(userAtual,readCookie("orkut_state"),500);
		location.reload();
	}
	deleteUser =function(mail) {
		if(confirm("Are u sure u want to delete this user?")){
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
		newuser=readCookie(mail)
		eraseCookie("orkut_state");
		createCookie("orkut_state",newuser,500);
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
	var linkConfig = document.createElement("a") ; 
	linkConfig.href = "Javascript:void(0)";
	linkConfig.innerHTML =" | Users";
	linkConfig.id="Linkconfig"
	linkConfig.addEventListener('mouseover',function () {
		var menuRollOver=document.getElementById('menuRollOver')
		if(menuRollOver){
	        if(menuRollOver.style.display=="block"){
	            menuRollOver.style.display="none"
			}else{
				menuRollOver.style.display="block"
	            menuRollOver.style.cssText="position:absolute;left:"+(findPos(linkConfig)[0])+"px;"
			}
		}else{
			var users=readCookie("users");
			
			var menuRollOver = document.createElement("table") ; 
			menuRollOver.innerHTML ='<tr style="background: #BFD0EA;"><td><a  href="javascript:void(0)" onclick="saveUser()">Add current user</a></td><td></td></tr>';
			menuRollOver.id="menuRollOver"
			menuRollOver.className="panel"
			menuRollOver.style.display="block"
			menuRollOver.style.cssText="position:absolute;left:"+(findPos(linkConfig)[0])+"px;"
			linkConfig.appendChild(menuRollOver);
			if(users){
				var users=users.split(",")
				var usersMenu=document.getElementById("usersMenu");
				for( var i = 0, mail; mail = users[i]; i++ ) {
					menuRollOver.innerHTML+=''
					+'<tr style="background: #BFD0EA;"><td><a  href="javascript:void(0)" id="'+mail+'" onclick="loginUser(this.id)">'+mail+'</a></td>'
					+'<td><a  href="javascript:void(0)" id="'+mail+'" onclick="deleteUser(this.id)">'
					+'<img src="http://www.orkut.com/img/pres2.gif" /></a></td></tr>';
				}
			}
		}
	},false);
	linkConfig.addEventListener('mouseout',function () {
		document.getElementById('menuRollOver').style.display	= "none";
	},false);
	document.getElementsByTagName('table')[0].getElementsByTagName('td')[2].appendChild(linkConfig)

})();
}
}

sc=String(sc);
sc=sc.substring(16,sc.length-1);
script=document.createElement('script');
script.textContent=sc;
document.getElementsByTagName('head')[0].appendChild(script);

