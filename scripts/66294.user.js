// ==UserScript==
// @name           Twitpic checker
// @revision       20100113
// @author         biikame
// @namespace      http://userscripts.org/scripts/show/66294
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function(){
	try{
		var userName = document.getElementsByName("page-user-screen_name")[0].content;
	}catch(e){
		return;
	}
	makeLink();
	
	function makeLink(){

		var setPoint = document.getElementById("profile-image");
		var aTag = document.createElement("a");
		aTag.href = "http://twitpic.com/photos/" + userName;
		aTag.target = "_blank";
		var imgTag = document.createElement("img");
		imgTag.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBDBEUC6xfxHsAAAKLSURBVDjLlZMxTFNRFIb/e99rFS4MQDWxDoU6iCZQBDvIAG2ZgIWNhUUsZTAhkcGwQaJuFMWN4iIsLjCWgdgWh05SJUwy2HYwJrTQFPvs872+exzakpIYgv98/u/c899zGBGhUV8KFU8kY8zEcpWRjCa7AKBT8HTghvox1Glff9CmHjTWszpAM+W1+UN9NZIxZgBw/Fsy6LKtv+lteiZsvHwOKFekfSyp7STyVgBXkM+hxKKDYrRJ5QYHgPlDfSWRtwLDrQaiXhXB25cDEnkrMH+orwAAS52anv54KeVpBX/sJDy924roTwMfflTAOQcRgYjAGDsHZH4ZSJ4pMuVv6VfrM7/uvY4hhw2MMYzfskN8S2Lj/QbK5TLGxscxNTUFRVVAAFKnJrx7v3kkY8zyWK4yAgAKV8AVBYwx7O7u4sn0NIrFIpqFwNLiIsLhMBhj4IyB8WrGsVzFD3W7oGOrQHvHBkkiklLSxMQETU5Okq7rZPwx6NWLl3S/+x7puk6WlPT5xCBsFci+XdAvfFd9ymLxDC6XC0rtRe47bmiaBtM0q1k05KG6BU8flWQ3ANRXKhDwY3NzEz09Pehob8fq6ls89HohhKg2qe1Op+Bp1edQ40clo1tKCZISjDHMzc0hm81iYWEB0rLg8fRhObwMAkBSQtYAPocaZ6lTs68/Xtp/3gX+6GYzqg0kAIbc8TEM04DT6QQAcK4AIBwUDCwdWTLlbxlgRISZfW3tXdYM4T8UdNki6wNilhERNFM2jSW1nU8n1vBVzEMdyl50UIwKGy9zABA2Xo4OitGgy7YGQF7ilUGXba1uvnCNde0XKn2RtBFK5Cv+77Vzdgue9jnUeKjLHhloU7821v8Fsksx4FJz/DQAAAAASUVORK5CYII=";
		imgTag.width = "16";
		imgTag.height = "16";
		aTag.appendChild(imgTag);
		if(setPoint){
			var ins = setPoint.parentNode.parentNode;
		}else{
			var ins = document.getElementsByClassName("thumb clearfix")[0];  
		}
		ins.appendChild(aTag);
	}
})();