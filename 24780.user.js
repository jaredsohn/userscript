// gmCeviri
// 
// version 0.2
// 2008-03-22 1:43 AM
// Copyright (c) 2007, Azer Koçulu
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          gmCeviri
// @namespace     http://azer.kodfabrik.com
// @description   
// @include       *
// @exclude       http://www.hemencevir.com*
// ==/UserScript==

var ceviri = {
	"a":{ enabled:false, firelistener:null, gmKey:0, source:"http://kodfabrik.com/app/ceviri/push.php" },
	"elm":{},
	"init":function(){
		with(ceviri){
			document.body.addEventListener("mouseup",listen,true);
		}
	},
	"listen":function(ev){
		with(ceviri){

			if(ev.ctrlKey){
				createForm();
			}
			if(a.enabled==false)return;
			setTimeout(function(){
				if(document.getElementById("gmceviritextbox").value!="")return;
				var sel = window.getSelection().getRangeAt(0);
				document.getElementById("gmceviritextbox").value = sel;
			},500);
		}
	},
	"createForm":function(){
		with(ceviri){
			if(a.enabled)return;
			// elements: container
			elm.container = document.body.appendChild(document.createElement("div"));
			elm.container.setAttribute("id","gmceviricontainer");
			elm.container.style.position = "fixed";
			elm.container.style.left = "0px";
			elm.container.style.bottom = "0px";
			elm.container.style.opacity = "0.9";
			elm.container.style.borderTop = "1px outset #666";
			elm.container.style.backgroundColor = "#fff8a4";
			elm.container.style.width = window.innerWidth+"px";
			elm.container.style.zIndex = "99999999";
	
			// elements: content
			elm.content = elm.container.appendChild(document.createElement("div"));
			elm.content.style.width = "400px";
			elm.content.style.margin = "0 auto";
			elm.content.style.padding = "3px 20px 3px 20px";
			
			// elements: close button
			elm.content.innerHTML+="<button style='position:absolute; margin-left:335px;' onclick='window._gmCeviri.close()'>Kapat</button>";
			
			// elements: clear button
			elm.content.innerHTML+="<button style='position:absolute; margin-left:260px;' onclick='document.getElementById(\"gmceviritextbox\").value=\"\"'>Temizle</button>";
			
			// elements: title
			elm.title = elm.content.appendChild(document.createElement("div"));
			elm.title.style.font = "bold 13px Verdana,Sans,sans-serif";
			elm.title.innerHTML = "<a style='color:blue; text-decoration:none' href='http://kodfabrik.com/app/ceviri'>gmCeviri</a>";
			
			// elements: form
			elm.form = elm.content.appendChild(document.createElement("form"));
			elm.form.setAttribute("action","http://www.hemencevir.com/default.asp?waiting&");
			elm.form.setAttribute("method","post");
			elm.form.setAttribute("target","tunnel");
			elm.form.innerHTML+="<input type='hidden' name='durum' value='1' />";
			elm.form.innerHTML+="<input type='hidden' name='lambdur' value='-8' />";
			
			// elements: text
			elm.text = elm.form.appendChild(document.createElement("textarea"));
			elm.title.style.margin = "5px 0 5px 0";
			elm.text.style.width = "400px";
			elm.text.style.height = "100px";
			elm.text.style.padding = "3px";
			elm.text.setAttribute("name","metin");
			elm.text.setAttribute("id","gmceviritextbox");
			// elements: translate button
			elm.form.innerHTML+="<button id='gmceviributton' type='submit' onmouseup='_gmCeviri.translate(); return false;'>Cevir</button>";
			elm.container.innerHTML += "<iframe style='position:absolute; visibiltiy:hidden' name='tunnel' ><iframe style='position:absolute; visibiltiy:hidden' name='tunnel2'></iframe><iframe style='position:absolute;  visibiltiy:hidden' name='tunnel80' ></iframe><iframe style='position:absolute;  visibiltiy:hidden' name='tunnel81' ></iframe><iframe style='position:absolute;  visibiltiy:hidden' name='tunnel82' ></iframe><iframe style='position:absolute;  visibiltiy:hidden' name='tunnel83' ></iframe>";
			
			// elements: footer
			elm.footer = elm.content.appendChild(document.createElement("div"));
			elm.footer.style.font = "10px Arial, Tahoma, Verdana";
			elm.footer.innerHTML = "Developer: <a style='color:rgb(0,0,255);' href='http://azer.kodfabrik.com'>Azer Koculu</a>, 22.03.2008.";
			
			
			a.enabled = true;
		}
	},
	"translate":function(){
		with(ceviri){
			
			var button = document.getElementById("gmceviributton");
			
			button.innerHTML="Cevirinizin yapilmasi birkac dakika alabilir, lutfen bekleyin.."; 
			var key = Math.round(Math.random()*10000000); 
			button.parentNode.setAttribute("action",button.parentNode.getAttribute("action").split("gmKey")[0]+"gmKey="+key); 
			var tunnel=document.createElement("script");
			tunnel.setAttribute("src",a.source+"?gmkey="+key); 
			document.body.appendChild(tunnel);
			button.parentNode.setAttribute("target", "tunnel");
			button.parentNode.submit();
	
			button.index = 0;
			button.interval = setInterval(function(){
				if (button.innerHTML == "Cevir") {
					return false;
					clearInterval(button.interval);
				}
				button.index+=1;
				button.innerHTML="Ceviri gecikti (15,"+button.index+",("+button.index*4+")), yeni istekler gonderiliyor..";
				
				button.parentNode.setAttribute("action", button.parentNode.getAttribute("action").replace(".com",".com:"+(79+button.index)));
				button.parentNode.setAttribute("target", "tunnel" + (79+button.index));
				button.parentNode.submit();
				
				if(button.index==4)button.index = 0;
				
			},10000);
			
		}
	},
	"close":function(){
		with (ceviri) {
			document.body.removeChild(elm.container);
			a.enabled = false;
		}
	},
	"get":function(VALUE){
		with(ceviri){
			
			document.getElementById("gmceviritextbox").value = VALUE;
			document.getElementById("gmceviributton").innerHTML = "Cevir";
		}
	}
};

ceviri.init();
unsafeWindow._gmCeviri=ceviri;
