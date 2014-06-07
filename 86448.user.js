// ==UserScript==
// @name           favstar style change to like favotter
// @namespace      pastak.cosmio.net
// @include        http://favstar.fm/*
// ==/UserScript==
function setStyle(){
var mode=document.getElementById("setMode").value;
var current;
var container=document.getElementsByClassName("tweetContainer");
for(var i=0;i<container.length;i++){
	current=container[i];
	var fav=rt=count=0;
	var setfav=setrt=false;
	var fc=current.getElementsByClassName("favouritesCount");
	for(var j=0;j<fc.length;j++){
		if(!setfav && fc[j].className.replace(/favouritesCount/,"").match(/fav/)){
			fav=fc[j].textContent;
			setfav=true;
		}else if(!setrt && fc[j].className.match(/retweet/)){
			rt=fc[j].textContent;
			setrt=true;
		}
	}
	if(mode==="0"){
		//both (fav+RT)
		count=(parseInt(fav)+parseInt(rt));
	}else if(mode==="1"){
		//only fav
		count=parseInt(fav);
	}else if(mode==="2"){
		//only RT
		count=parseInt(rt);
	}
	//console.log("fav:"+fav+" RT:"+rt+" sum:"+count)
	//for debug
	var tweet=document.getElementsByClassName("theTweet")[i];
	var color="";
	if(count>=5){
		color="#FF0000";
	}else if(count>=3){
		color="#660099";
	}else if(count===2){
		color="#009900";
	}else{
		color="#000000";
	}
	tweet.style.color=color;
}
}

(function(){
	var s=document.createElement("select");
	var o1=document.createElement("option");
	var o2=document.createElement("option");
	var o3=document.createElement("option");
	
	o1.value="0";
	o1.textContent="fav+RT";
	o2.value="1";
	o2.textContent="fav";
	o3.value="2";
	o3.textContent="RT";
	
	s.appendChild(o1);
	s.appendChild(o2);
	s.appendChild(o3);
	s.addEventListener("change",setStyle,false);
	s.id="setMode";
	document.getElementById("nowShowing").appendChild(s);
	
	setStyle();
})();