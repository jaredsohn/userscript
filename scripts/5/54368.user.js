// ==UserScript==
// @name           MouseHunt Smart refresh
// @namespace      localhost
// @include        http://apps.facebook.com/mousehunt/*
// @description    Make time counter visible, hunt mouse automatically, handle King reward with tab blinking and sound alarm
// ==/UserScript==

function rand(n){
	return ( Math.floor ( Math.random() * n + 3 ) );	
}

function startBlink(){
    window.blinkInterval = setInterval(function(){
											if(document.title != "-King reward-"){document.title = "-King reward-";}
											else{document.title = "-Mouse hunt-";}
										} , 1000);
}
function blink(){
	document.addEventListener("blur",function(){setTimeout(startBlink(),1000);},false);
    document.addEventListener("focus",function(){clearInterval(window.blinkInterval);},false);
} 

function sendMail(email, name){
	
	GM_xmlhttpRequest({
		method:'POST',
		url:'http://www.privatecritic.com/email.php?quote=Obstacles-are-great-incentives.',
		headers:{
			'User-agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1) Gecko/20090624 Firefox/3.5',
			'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Language':'en-US',
			'Accept-Encoding':'gzip,deflate',
			'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
			'Keep-Alive':'300',
			'Connection':'keep-alive',
			'Referer':'http://www.privatecritic.com/email.php?quote=Obstacles-are-great-incentives.',
			'Content-Type':'application/x-www-form-urlencoded',
			'Content-Length':'84',
		},
		data: 'email='+ email +'&name='+ name +'&content=King+reward&submit=Mail+It'
	});
}

function soundAlarm(){
	var alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://www.ilovewavs.com/Movies/KO/Mission%20Impossible%20-%20Movie%20Theme.wav\" autostart=true hidden=true>";
	document.getElementById("content").appendChild(alarmDiv);
}

//Get all the input elements
var inputs = document.getElementsByTagName("input");

//Get index of king reward string
var kingReward = document.body.innerHTML.indexOf("You must claim your code before you will be allowed to continue hunting");
//See if you have enough cheese to hunt
var noCheese = document.body.innerHTML.indexOf("You are out of cheese");

if (noCheese == -1){
if (inputs){
	//Loop and find the hornWaitValue
	for (i=0; i < inputs.length; i++){
		//Check if it found
		if(inputs[i].id.indexOf("hornWaitValue") != -1){
			//Get the time counter value
			timeCounter = inputs[i].value;
			
			//Make the counter visible
			inputs[i].type = "text";
			inputs[i].readOnly = true;
			inputs[i].style.color = "blue";
			inputs[i].style.fontSize = "x-large"
			inputs[i].style.width = "45px";
			inputs[i].style.height = "30px";

			//Check the king reward existence
	                if (kingReward == -1){		
		        //King reward not found, go on ...
		
		        //Add some more seconds
		        timeCounter = parseInt(timeCounter) + rand(15);	
		        window.setInterval(function(){window.location.href =          "http://apps.facebook.com/mousehunt/soundthehorn.php"}, timeCounter*1000);
                        }

	                //Handle the king reward
	                else {
		        //Tab blinking
		        window.addEventListener("load",blink,false);	
		
		        //Alarm, what a sound !
		        soundAlarm();
		
		        //Send email
		
	                }
                        break;
                        
		}
	}
	
	
}
}

