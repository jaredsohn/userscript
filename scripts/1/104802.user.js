// ==UserScript==
// @name           friend.ly Contest Revealer
// @namespace      friend.ly Contest Revealer
// @include        http://www.friend.ly/compare/contest?id=*
// ==/UserScript==

function ajaxRequest(){
 var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
 if (window.ActiveXObject){
  for (var i=0; i<activexmodes.length; i++){
   try{
    return new ActiveXObject(activexmodes[i]);
   }
   catch(e){
   }
  }
 }
 else if (window.XMLHttpRequest)
  return new XMLHttpRequest();
 else
  return false;
}

function ajaxsubmit()
{
	var url = "http://www.friend.ly/compare/contest/vote/json";
	var postdata = "contest_id=" + getcontestid() + "&friend_1=" + getid('1') + "&friend_2=" + getid('2') + "&winner=" + getid('2') + "&form_token=" + getformtoken();
	var mygetrequest=new ajaxRequest();
	mygetrequest.onreadystatechange=function(){
		if (mygetrequest.readyState==4){
			dorepeat();
		}
	}
	mygetrequest.open("POST", url, true);
	mygetrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	mygetrequest.send(postdata);
}

function dorepeat()
{
	if(times < repeatamount)
	{
		if(prog1 - (times + 1) >= 0){
			document.getElementsByClassName('progress_step')[0].innerHTML = prog1 - (times + 1);
		}
		if(prog2 - (times + 1) >= 0){
			document.getElementsByClassName('progress_step')[1].innerHTML = prog2 - (times + 1);
		}
		ajaxsubmit();
		times += 1;
	}
	else{
		location.reload(true);
	}
}

function getcontestid(){
	if(document.location.toString().indexOf('&') != -1){
		return document.location.toString().substring(document.location.toString().indexOf('id=') + 3, document.location.toString().indexOf('&'));
	}
	else{
		return document.location.toString().substring(document.location.toString().indexOf('id=') + 3);
	}
}

function getformtoken(){
	var thead = document.head.innerHTML;
	var thead = thead.substring(thead.indexOf('formToken:') + 13);
	var thead = thead.substring(0, thead.indexOf('"'));
	return thead;
}

function getrepeatamount(){
	if(prog1 > prog2){
		return prog1;
	}
	else{
		return prog2;
	}
}

function getid(id){
	var tbody = document.body.innerHTML;
	var tbody = tbody.substring(tbody.indexOf('friend_' + id + '":{"fbuid":') + 19);
	var tbody = tbody.substring(0, tbody.indexOf(','));
	return tbody;
}

if(document.getElementsByClassName('progress_step').length > 1){
	var prog1 = parseInt(document.getElementsByClassName('progress_step')[0].innerHTML);
	var prog2 = parseInt(document.getElementsByClassName('progress_step')[1].innerHTML);
	var repeatamount = getrepeatamount();
	var times = 0;
	ajaxsubmit();
}