// ==UserScript==
// @name           xkcd avatars
// @namespace      http://userscripts.org/users/120699
// @description    Fixes the avatars on the xkcd mafia forum.
// @include        http://forums.xkcd.com/viewtopic.php?f=53&t=*
// @include        http://www.forums.xkcd.com/viewtopic.php?f=53&t=*
// @include        http://echochamber.me/viewtopic.php?f=53&t=*
// @include        http://www.echochamber.me/viewtopic.php?f=53&t=*
// @include        http://forums3.xkcd.com/viewtopic.php?f=53&t=*
// @include        http://fora.xkcd.com/viewtopic.php?f=53&t=*
// ==/UserScript==

var av_imgs={
	307:"jpg", //misker k
	962:"png", //EstLladon
	6980:"jpg", //oneofthedragon ##MOD
	7424:"png", //Senefen
	10395:"jpg", //cycoden ##OLD
	15511:"png", //existential_elevator
	22750:"png", //VectorZero
	23111:"jpg", //Azrael001
	24789:"jpg", //willwithskills ##OLD
	30597:"jpg", //Gojoe ##MOD
	32219:"jpg", //MartinW
	33247:"png", //Avelion
	34982:"gif", //crucialityfactor
	41220:"jpg", //Kipper
	42178:"jpg", //MasterOfAll
	42678:"jpg", //Brooklynxman
	43917:"Utilities-file-archiver.png", //Furioso ##NEW
	44112:"gif", //Belgarion
	44257:"jpg", //KrazyNerd
	44723:"jpg", //Adacore
	45271:"jpg", //velvet_octopus
	52084:"jpg", //PossibleSloth ##MOD
	54385:"Tennis-ball.png", //Kolko ##NEW
	58040:"jpg", //cellery
	58415:"gif", //Rhyme
	61826:"Hypnotoad.gif", //OMGLOLZORS ##NEW
	61513:"Media-flash-sd-mmc.png", //Andymeo ##NEW
	62333:"Penguin.jpg", //Dr Ug ##NEW
0:""
};

var elinks=document.getElementsByTagName("link");
var prosilver=(elinks[elinks.length-1].href.indexOf("subsilver")==-1);

var al;
if(prosilver){
	al=document.getElementsByTagName("dl"); //Get post 'sidebars'
}
else{
	//(Clearly, subsilver FTFL)
	al=[];
	var tab=document.getElementsByTagName("table");
	for(var i=0;i<tab.length;++i){
		if(tab[i].parentNode.className=="profile"){
			al.push(tab[i]);
		}
	}
}
for(var i=0;i<al.length;++i){
	var a=al[i];
	if(prosilver){
		a=a.getElementsByTagName("dt")[0]; //The part containing name and avatar
		                                   //(in subsilver, it's all unnamed tables)
	}
	
	//Find link to profile
	var pr;
	if(prosilver){
		var li=a.getElementsByTagName("a");
		pr=li[li.length-1];
	}
	else{
		var li=a.parentNode.parentNode.parentNode.getElementsByTagName("a");
		pr=li[li.length-3];
	}
	var id=pr.href.split("&u=")[1]; //Get user id
	
	if(av_imgs[id-0]){ //If user has special id
		
		//Create path to new avatar image
		var ims=av_imgs[id-0];
		var im="http://simonsoftware.se/wiki/images/";
		if(ims.indexOf(':')!=-1) //Absolute URL
			im="";
		else if(ims.indexOf('.')==-1) //Short syntax; add user id to file name
			im+=id+'.';
		im+=ims;
		
		var oldimgs=a.getElementsByTagName("img"), oldimg=0, avp=(prosilver?0:1);
		if(oldimgs.length>avp){
			//User has an avatar, set it to change on error
			(function(){
				var imt=im, ob=oldimgs[avp]; //Make closure for image url
				ob.addEventListener("error", function(){
					ob.src=imt;
					ob.style.width="auto";
					ob.style.height="auto";
				},true);
				ob.src=ob.src; //Reload image, fire onerror if applicable
			})();
		}
		else{
			//User does not have an avatar, create one
			var img=document.createElement("img");
			img.src=im;
			img.alt="User Avatar";
			if(prosilver){
				var br=document.createElement("br");
				a.insertBefore(img,pr);
				a.insertBefore(br,pr);
			}
			else{
				a.insertRow(a.rows.length);
				a.rows[a.rows.length-1].appendChild(img);
			}
		}
	}
}
