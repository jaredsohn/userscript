// ==UserScript==
// @name           Castle Age Forum Stamina Saver
// @namespace      http://apps.facebook.com/castle_age/forum_stamina_saver
// @description    Stop loosing Stamina in the "Help me with monsters" forum! Using this script, Castle Age Forum's links will be modified to show additional infos, so you'll always know what you're clicking on!
// @include        http://174.37.115.166/cforum/*
// @include        http://www.castleageforums.com/cforum/*
// ==/UserScript==

var a=document.getElementsByTagName("a");
for(var i=0;i<a.length;i++){
	
	if(a[i].href.split("mpool=").length>2||a[i].href.split("http").length>2||a[i].href.indexOf("https")!=-1){
		a[i].innerHTML="<strong>MAYBE A FAKE?</strong><br>"+a[i].href;
	}else{
		
		var SPAN=document.createElement("span");
		var sep0=document.createElement("span");
		sep0.innerHTML=" &#160; &#160; "
		var sep1=document.createElement("span");
		sep1.innerHTML=" &#160; &#160; "
		var sep2=document.createElement("span");
		sep2.innerHTML=" &#160; &#160; "
		var sep3=document.createElement("span");
		sep3.innerHTML=" &#160; &#160; "
		var sep4=document.createElement("span");
		sep4.innerHTML=" &#160; &#160; "
		var sep5=document.createElement("span");
		sep5.innerHTML=" &#160; &#160; "
		var mpool="";	try{mpool=a[i].href.split("?")[1].split("mpool=")[1].match(/\d+/)[0];	}catch(e){}
		var user="";	try{user=a[i].href.split("?")[1].split("user=")[1].match(/\d+/)[0];		}catch(e){}
		var newName="";	try{newName=a[i].href.split("?")[1].split("twt2=")[1].split("&")[0];	}catch(e){}
		if(newName==""&&a[i].href.indexOf("/raid.php?")!=-1)newName="raid";
		
		var oldLink=a[i].href;
		var newLink=a[i].href.replace(/\&action=doObjective/,"").replace(/action=doObjective\&/,"").replace(/\?action=doObjective/,"");
			
		var monsterData="";
		monsterData+=newName!=""?"<strong>"+newName+"</strong>":"";
		monsterData+=mpool!=""?" <em>(mpool="+mpool+")</em>":"";
		var SPANm=document.createElement("span");
		SPANm.innerHTML=monsterData;
		
		var Av=document.createElement("a");
		Av.innerHTML="VISIT &raquo;";
		Av.target="_blank";
		Av.href=newLink;
		
		var Aa=document.createElement("a");
		Aa.innerHTML="ASSIST &raquo;";
		Aa.target="_blank";
		Aa.href=oldLink;
		Aa.style.color="#ff0000";
		
		var Au=document.createElement("a");
		Au.innerHTML="CA PROFILE &raquo;";
		Au.href="http://apps.facebook.com/castle_age/keep.php?user="+user;
		Au.target="_blank";
		
		var Af=document.createElement("a");
		Af.innerHTML="FB PROFILE &raquo;";
		Af.href="http://www.facebook.com/profile.php?id="+user;
		Af.target="_blank";
		
		var SPANu=document.createElement("span");
		SPANu.innerHTML="FACEBOOK ID: "+user;
		
		if(a[i].href.indexOf("&action=doObjective")!=-1){
			
			SPAN.appendChild(SPANm);
			SPAN.appendChild(sep0);
			SPAN.appendChild(Av);
			SPAN.appendChild(sep1);
			SPAN.appendChild(Aa);
			SPAN.appendChild(sep2);
			SPAN.appendChild(Au);
			SPAN.appendChild(sep3);
			SPAN.appendChild(Af);
			SPAN.appendChild(sep4);
			SPAN.appendChild(SPANu);
			
			a[i].parentNode.replaceChild(SPAN,a[i]);
			i+=3
			
		}else if(a[i].href.indexOf("twt2=")!=-1||a[i].href.indexOf("mpool=")!=-1||a[i].href.indexOf("/raid.php?")!=-1){
			
			var SPAN=document.createElement("span");
			SPAN.appendChild(SPANm);
			SPAN.appendChild(sep0);
			SPAN.appendChild(Av);
			SPAN.appendChild(sep2);
			SPAN.appendChild(Au);
			SPAN.appendChild(sep3);
			SPAN.appendChild(Af);
			SPAN.appendChild(sep4);
			SPAN.appendChild(SPANu);
			
			a[i].parentNode.replaceChild(SPAN,a[i]);
			i+=2
			
		}else if(a[i].href.indexOf("http://apps.facebook.com/")!=-1){
			a[i].innerHTML=a[i].href;
		}
	}
}