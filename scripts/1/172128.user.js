// ==UserScript==
// @name		TexBook
// @namespace		TheGame
// @description	Add laTex to facebook
// @include			http://*facebook.com/*
// @include			https://*facebook.com/*
// @version			3
// @author			Jaume
// ==/UserScript==



console.log("TeXBook: version 0.3.0.0")
window.onload=function(){TexBooker(document, "messages", false); 
						 TexBooker(document, "UFICommentContent", false); 
						 TexBigMessager(document);
						 TexStatusser(document,false);
						 createtry();
						 texBoxer(document);
			};
document.addEventListener('DOMNodeInserted', TexHandler, false);

function TexHandler(event) {
	if(event.target.getElementsByClassName){ 
		setTimeout(function() {TexBooker(event.target.parentNode, "messages", true); 
			                   TexBooker(document, "UFICommentContent", false);
							   TexBigMessager(event.target.parentNode);
							   TexStatusser(event.target,true);
							}
		,200); 
		setTimeout(function() {TexBooker(event.target.parentNode, "messages", true);
							   TexBooker(document, "UFICommentBody", false);
							   TexBigMessager(event.target.parentNode);
							   TexStatusser(event.target,true);
							   createtry();
							   texBoxer(event.target);
							}
		,1000); 
	}
};

//funció específica per als estats i publicacions al mur

function TexStatusser (thetarget,realtime) {
	if(thetarget==null || !thetarget.parentNode) return;
	if(realtime) thetarget=thetarget.parentNode;
	vector=thetarget.getElementsByClassName("userContent");
	for(i=0;i<vector.length;i++){
		var htm=vector[i].innerHTML;
		var nhtm=superparser(htm);
		if(nhtm!=htm) {
			vector[i].innerHTML=nhtm;
			addevents(vector[i]);
		}
	}
}


//funció per als missatges vistos en la pantalla gran (la vaig suar molt!)

function TexBigMessager(thetarget, realtime){
	if(thetarget==null) return;
	var vector=thetarget.getElementsByClassName("webMessengerMessageGroup");
	for(var i=0; i<vector.length;i++) {
		var thelol=vector[i];
		if( thelol!=null &&
			thelol.getElementsByClassName &&
			thelol.getElementsByClassName("clearfix")[0] &&
			thelol.getElementsByClassName("clearfix")[0].lastChild &&
			thelol.getElementsByClassName("clearfix")[0].lastChild.lastChild &&
			thelol.getElementsByClassName("clearfix")[0].lastChild.lastChild.lastChild &&
			thelol.getElementsByClassName("clearfix")[0].lastChild.lastChild.lastChild.childNodes[1]
		   ) {
		   	thelol=thelol.getElementsByClassName("clearfix")[0].lastChild.lastChild.lastChild.childNodes[1]; 
			
			for (var j = thelol.childNodes.length - 1; j >= 0; j--) {
				var a=thelol.childNodes[j].innerHTML;
				var b=superparser(a);
				if(a!=b) {
					thelol.childNodes[j].innerHTML=b;
					addevents(thelol.childNodes[j]);
				}
			};
		}
	}
	
}

//en general, per a les estructures que el facebook guarda com a array últim (comentaris i xat petit)

function TexBooker(thetarget, theclass, realtime){
	if (thetarget==null)return;
	if(realtime && !thetarget.parentNode ) return;
	if(realtime) thetarget=thetarget.parentNode;
	var vector=thetarget.getElementsByClassName(theclass);
	if(!vector[0]) return;
	var toreader=vector;
	for(var j=0; j<toreader.length; j++) {
		var toread=toreader[j];
		var i=0;
		while (toread.childNodes[i]) {
			var a=toread.childNodes[i].innerHTML;
			var b=superparser(a);
			if(a!=b) {
				toread.childNodes[i].innerHTML=b;
				addevents(toread.childNodes[i]);
			}
			i++;
		};
	}

}


//va modificant i arreglant el codi que li arriba, i el va enviant a la funció transformadora, que només fa una operació de cada tipus per execució.

function superparser (thing) {
		var newthing=thing;
		var othing;
		do{
			othing=newthing;
			newthing=transformer(newthing);
		} while (othing!=newthing && newthing!=42)
		if(newthing==42) {
			return "<span name='TexError' style='color:red'>TexBook: <i>error al compilar</i></span> <span class=\"\[literal]\" style='color:#AAAAAA;'><i>"+thing+"</i></span>";
		}
		return newthing;
	}

//busca el codi i el substitueix per la imatge corresponent, o pel literal corresponent si hi ha un literal (un pel de recursivitat a la vista!)

function transformer(mychain) {
	if(mychain.search("\\[literal]")!=-1) {
		if(mychain.search("class\=\"\\[literal]\"")!=-1) return mychain;
		else if (mychain.search("\\[literal]")>=mychain.search("\\[/literal]")) return 42;
		var beginto=mychain.search("\\[literal]");
		var endto=mychain.lastIndexOf("[/literal]");
		return transformer(mychain.slice(0,beginto))+"<span class=\"\[literal]\" style='color:#8888; font-family: \"Courier New\", Courier, \"Lucida Sans Typewriter\", \"Lucida Typewriter\", monospace;'>"+mychain.slice(beginto+9,endto)+"</span>"+transformer(mychain.slice(endto+10));
	}

	mychain=mychain.replace("\\[tex]  ", "\\[tex]");
	mychain=mychain.replace("\\[tex]\\[/tex]", "THEGAME");
	mychain=mychain.replace("\\[tex] \\[/tex]", "THEGAME");
	mychain=mychain.replace("\\[tex]  \\[/tex]", "THEGAME");
	mychain=mychain.replace("THEGAME", "<img src='https://merch-bot.com/wholesale/wp-content/uploads/2011/05/youjustlostthegamesticker.gif' width='100px'>");
	var isok=1;
	var b=mychain.search("\\[tex]");
	if (b!=-1) isok=0;
	var e=mychain.search("\\[/tex]");
	if(e!=-1) isok++;
	if(e<b) isok=0;
	if(!isok) return 42;
	var trans=mychain.slice(b+5,e);
	if(b!=-1){
		var enc=encoder(trans);
		var newchain=mychain.slice(0,b)+"<img class='TexBook' src='https://chart.googleapis.com/chart?cht=tx&chl="+enc+"&chf=bg,s,00000000'"+
										" style='vertical-align:middle;'>"+
										mychain.slice(e+6);
		return newchain;
	}
	return mychain;
	}

//transforma el codi en tex en una url comprensible per a la API

function encoder(thing){
	var newthing=thing;
	var othing;
	do{
		othing=newthing;
		newthing=newthing.replace("&amp;","&");
	} while (othing!=newthing)
	return encodeURIComponent(newthing);
}

//crea el tryer, la barreta de dalt, amb el botonet i tot, i hi afegeix els eventlisteners

function createtry (){
	if(document.getElementById("TeXtry")) return;
	target=document.getElementById("headNav");
	intruder=document.createElement('div');
	intruder.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"

	thechild=document.createElement('input');
	thechild.type='text';
	thechild.class='inputtext DOMControl_placeholder';
	thechild.id="TeXtry";
	thechild.addEventListener("keydown", function(){if(event.keyCode==13) tryer();}, false);

	intruder.appendChild(thechild);

	image=document.createElement("img");
	image.src="https://lh6.googleusercontent.com/xlHpyxP5PbD0aKlwClSgvwz8F3Dom_S_8UiqU7ogUZ1o2glzqVjkUZyKKoB3MDzjUjlkESSb7MU=s26-h26-e365-rw";
	image.style.verticalAlign="-8px";
	image.addEventListener('click', function(){tryer()});
	intruder.appendChild(image);
	intruder.appendChild(document.createElement('br'));
	target.appendChild(intruder);

	result=document.createElement('div');
	result.id='TeXresult';
	result.style.backgroundColor='white';
	result.style.display='none';
	result.style.margin='10px';
	result.style.border='2px solid black';
	result.style.padding='5px';
	result.addEventListener('click',function(){document.getElementById('TeXresult').style.display='none'});
	target.lastChild.appendChild(result);
}


function tryer () {
	var enc=document.getElementById("TeXtry").value;
	if (enc=="" || enc==" " || enc=="  ") return document.getElementById("TeXresult").style.display='none';
	var enc=encoder(enc);
	document.getElementById('TeXresult').innerHTML="";
	var theimg=document.createElement('img');
	theimg.src='https://chart.googleapis.com/chart?cht=tx&chl='+enc+'&chf=bg,s,00000000';
	theimg.class='TexBook';
	theimg.draggable='true';
	theimg['data-src']=enc;
	document.getElementById('TeXresult').appendChild(theimg);
	theimg.addEventListener('dragstart',function(){
		localStorage.dragged='[tex]'+decodeURIComponent(event.target['data-src'])+'[/tex]';
	});
	document.getElementById('TeXresult').style.display='inline-block';
}

function texBoxer (thetarget) {
	if(!thetarget || !thetarget.getElementsByClassName) return;
	var targets=thetarget.getElementsByClassName("uiTextareaAutogrow");
	for(var i=targets.length-1;i>=0;i--) {
		targets[i].addEventListener('drop', function(){event.target.value+=localStorage.dragged; localStorage.dragged="";});
	}
}

function addevents(thetarget) {
 setTimeout(addeventsmover(thetarget),300);
}

function addeventsmover (thetarget) {
	console.log('lol');
	var targets=thetarget.childNodes;
	for (var i = targets.length - 1; i >= 0; i--) {
		if(true) {
			targets[i].draggable='true';
			targets[i].addEventListener('dragstart',function(){
				console.log(event.target['data-src']);
				localStorage.dragged='[tex]'+decodeURIComponent(event.target.src).replace("https://chart.googleapis.com/chart?cht=tx&chl=","").replace("&chf=bg,s,00000000","")+'[/tex]';
			});
		}
		else console.log(targets[i]);
	};
}