// ==UserScript==
// @name           filterPolls
// @namespace      #avg
// @description    hides polls from a specific user at irc-galleria.net
// @include        http://irc-galleria.net/*
// ==/UserScript==

function hideUser(username) {
	var removeCount = 0;
	var elements = document.getElementsByTagName('a');
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].href.indexOf("/user/"+username+"/"+area)>-1&&elements[i].href.indexOf('\?')<0){			
			var code = elements[i].href.substr(elements[i].href.lastIndexOf(area)+area.length+1);
			code = code.match(/\d+/);
			//alert(code);
                        if(area=='poll') {
                              document.getElementById("form-"+area+"-"+code).style.display="none";
			      document.getElementById("box-"+area+"-"+code).style.display="none";
                        } else {
			     document.getElementById(area+"-"+code).style.display="none";
                        }	
			removeCount++;		
		}
	}
	alert("Total removals: "+removeCount);
}

function hideData() {


	var hideThese = document.getElementById('usersToHide').value;

	if(location.href.indexOf('polls')>0) {
		area='poll';
	} else {
		if(location.href.indexOf('blogs')>0) {
			area='blog';
		}
	}
	//alert("in hide: area: "+area);

	while(hideThese.indexOf(",")>-1) {
		var user = hideThese.substr(0,hideThese.indexOf(","));		
		//alert(user);
		hideUser(user);
		hideThese = hideThese.substr(hideThese.indexOf(",")+1);
		

	}
	hideUser(hideThese);

}

function attachEvent(element, event, handler)
{
    if (element && element.attachEvent) {
        element.attachEvent("on" + event, handler);
    }
    else if (element && element.addEventListener) {
        element.addEventListener(event, handler, false);
    }
}

var usersToHide = document.createElement('input');
usersToHide.setAttribute('style', "background-color:#FFCC00; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold");
usersToHide.id='usersToHide';
usersToHide.type='text';
usersToHide.size=50;
usersToHide.title="Hides contris from these users";

var hideThemBtn = document.createElement('input');
hideThemBtn.setAttribute('style',"background-color:#cfcfcf; color:#000000; text-shadow:#000000; font-weight:bold");
hideThemBtn.type='button';
hideThemBtn.value="Hide them";
attachEvent(hideThemBtn,"click",hideData);

var hideThemForm = document.createElement('h1');
hideThemForm.align='center';
hideThemForm.appendChild(usersToHide);
hideThemForm.appendChild(hideThemBtn);

//document.body.innerHTML="";
document.body.insertBefore(hideThemForm,document.body.firstChild);


//contact  me at mohit.blue@gmail.com