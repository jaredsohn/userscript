// ==UserScript==
// @name Travian3 Title Timer
// @author Vincente Tsou
// @include http://*.travian*.*/dorf1.php*
// @include http://*.travian*.*/dorf2.php*
// @include http://*.travian*.*/build.php*
// @version	0.1
// @description show timer on title
// ==/UserScript==


	/**
	TSOU: set timer1 on title
	**/
	
	var V=A();
	var timer = document.getElementById("timer1");
	if (timer == null) return;
	var sec = Z(timer);
	
	function Q(){
		return new Date().getTime();
	};

	function A(){
		return Math.round(Q()/1000);
	};	
	
	function Z(c){
		var p=c.innerHTML.split(":");
		var aY=p[0]*3600+p[1]*60+p[2]*1;
		return aY;
	};

	function aa(s){
		if(s> -2){
			az=Math.floor(s/3600);
			an=Math.floor(s/60)%60;
			af=s%60;
			t=az+":";
			if(an<10){t+="0";}
			t+=an+":";
			if(af<10){t+="0";}
			t+=af;
		}else{
			t="0:00:0";
		}
		return t;
	};

	function titleTimer(){
		// If you want to keep original title, you can unmark following code.
		//var t=document.getElementsByTagName("title");
		var o=A()-V;		
		var ae = sec - o;	
		var U=aa(ae);
		
		//U = (t[0].textContent + " " + U);
		document.title = U;
	}

	
	setInterval(function() {titleTimer();},1000);

