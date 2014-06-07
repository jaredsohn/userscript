// ==UserScript==
// @name           NG autovoter
// @namespace      www.youtube.com/user/DualShooter
// @include        http://www.newgrounds.com/portal/view/*
// ==/UserScript==

//create script element
var script = document.createElement('script');

function add(source) {
	//add to script
	script.textContent = script.textContent+source;
}

function runScript(source) {
	//add main code
	script.textContent = script.textContent+'('+source+')();';
	//set attributes
	script.setAttribute("type", "application/javascript");
	script.setAttribute("id", "NGBot");
	//append to page
	document.body.appendChild(script);
}

//add('var testcookie2 = "NGBotConfig";');

//add the on/off button
add(
	function addController(){
		var navbar = document.getElementById("nav-sub");
		var list = navbar.getElementsByTagName("dl");
		var link = "<dd>|<a id='voteControl' href=''></a></dd>";
		list.item(0).innerHTML = list.item(0).innerHTML + link;
	}
);

//updates the current status of the controller
add(
	function updateController(){
		var status = getCookie("NGBotConfig");
		var controlButton = document.getElementById("voteControl");
		if(status=="false"){
			controlButton.innerHTML = "Auto:OFF";
			controlButton.href = "javascript:setControllerOn()";
		}else{
			controlButton.innerHTML = "Auto:ON";
			controlButton.href = "javascript:setControllerOff()";
		}
	}
);

add(
	function setControllerOff(){
		setCookie("NGBotConfig","false",1000);
		updateController();
	}
);

add(
	function setControllerOn(){
		setCookie("NGBotConfig","true",1000);
		updateController();
	}
);

add(//pinched from w3schools (yes I know they suck :\)
	function setCookie(c_name,value,exdays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}
);

add(//pinched from w3schools
	function getCookie(c_name)
	{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
		{
		return unescape(y);
		}
	  }
	}
);

//find and click the button.
add(
	function findButton(voteLine){
		var status = getCookie("NGBotConfig");
		if (status=="true"){//check if Bot is supposed to be running
			var voteBarWrapperHidden = document.getElementById('votebar_wrapper_hidden');
			var voteBarWrapper = document.getElementById('votebar_wrapper');
			if (voteBarWrapperHidden.clientHeight==0&&voteBarWrapper.clientHeight==31){//make sure the buttons are visible..
				var voteList = document.getElementById(voteLine);
				var voteArray = voteList.getElementsByTagName('a');
				var i = 0
				for (i=0;i<voteArray.length;i++){
					if(voteArray[i].clientHeight!=0){
						voteArray[i].onclick();//hit the vote button
					}
				}//for
			}else{//page is still loading, try again in a few seconds..
				var randNum = Math.floor(Math.random()*4000) + 3000;
				setTimeout('findButton("v" + Math.floor(Math.random()*6))',randNum);
			}//if
		}//if
	}//findButton
);

//add main code
runScript(
	function mainMethod(){
		
		addController();
		updateController();
		var randNum = Math.floor(Math.random()*4000) + 3000;//wait for a random amnout of time between 3 and 7 seconds. That would be a reasonable delay for a human user, right?
		setTimeout('findButton("v" + Math.floor(Math.random()*6))',randNum);//votes randomly from blam to 5.
	}
);
