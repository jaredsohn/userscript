// ==UserScript==
// @name           ThankYouDude
// @description    Rajoute un bouton merci sur les topic DownParadise
// @author		   Darksheep
// @include       http://forum.downparadise.ws/viewtopic.php*
// ==/UserScript==

function postRequest(url,data,callback)
{
 xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=  function()
{
if(xmlhttp.readyState == 4 ) //  && xmlhttp.status==200
callback(xmlhttp);
};

xmlhttp.open("POST",url,true);

xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.setRequestHeader("Content-length", data.length);
xmlhttp.setRequestHeader("Connection", "close");


xmlhttp.send(data);
}
 
//Variables du POST

var creation_time = document.getElementsByName("creation_time")[0].value;
var form_token = document.getElementsByName("form_token")[0].value;
var lastclick = document.getElementsByName("lastclick")[0].value;
var topic_id =document.getElementsByName("topic_id")[0].value;
var forum_id = document.getElementsByName("forum_id")[0].value;
var topic_cur_post_id = document.getElementsByName("topic_cur_post_id")[0].value;

var subject = escape(document.getElementsByClassName("post")[0].value);
var message = "Merci";
var urlToPost = "http://forum.downparadise.ws/posting.php?mode=reply&f="+forum_id+"&t="+topic_id;
var params = "subject="+subject+"&message="+message+"&creation_time="+creation_time+"&form_token="+form_token+"&topic_cur_post_id="+topic_cur_post_id+"&lastclick="+lastclick+"&topic_id="+topic_id+"&forum_id="+forum_id+"&post=Envoyer";

//Ajouter le TD et le lien 

var parent =document.getElementById("pagecontent").childNodes[1].childNodes[1].childNodes[0];
var td = parent.insertCell(1);
var link = document.createElement("a");
link.href ="#";
link.target = "_self";
link.innerHTML = "Merci&nbsp;!";

link.addEventListener('click', function(e) {
		postRequest(urlToPost,params,
		function(data){
		parent.removeChild(td); 
		});
	e.preventDefault();
}, true);
 
td.appendChild(link);