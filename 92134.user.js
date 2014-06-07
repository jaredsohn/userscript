// ==UserScript==
// @name           Ogame classification helper
// @namespace      www.userscript.org/sripts/show/92134
// @description    Calculates the point difference between you and other players on the classification list
// @date           2010-12-07
// @creator        mkey
// @include        http://*.ogame.org/game/index.php?page=highscore*
// ==/UserScript==

	var d=document, byId=d.getElementById, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName, create=d.createElement;
	
(function(){
	setInterval(Timer, 500);
	
	function Timer(){
		var t= byClass("changeSite fright");
		// GM_log(5);
		if (!t.length || t[0].id) return;
		t[0].id= "fake";
		// GM_log(6);
		
		t= byClass("myrank");
		
		if (t.length>0){
			t= t[0].getElementsByClassName("score");
			GM_setValue("och", Number(t[0].textContent.trim().replace(/\./g, "")));
			// GM_log(GM_getValue("och",-1));
		}
		
		t= byId("send").getElementsByClassName("score");
		var s, s1, dt, u= GM_getValue("och", 0);
		for (var i=0; i<t.length; i++){
			s= Number(t[i].textContent.replace(/\./g, ""));
			// GM_log(s);
			dt= s-u;
			s= Point(s);
			s1= Point(dt);
			if (dt>0) t[i].innerHTML= s+ ' <br/><span style="color:red;">+'+s1+'</span>';
			else if (dt<0) t[i].innerHTML= s+ ' <br/><span style="color:green;">-'+s1+'</span>';
			// else t[i].innerHTML= s+" +/-0";
		}
	}
	
	function Point(s){
		s= String(s).replace('-', "");
		var i= s.length-1;
		var s1=s.charAt(i);
		for (var j=1; j<=i; j++){ if (j%3==0) s1= "."+s1; s1= s.charAt(i-j)+s1; }
		return s1;
	}
})()