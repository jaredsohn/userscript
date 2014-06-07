// ==UserScript==
// @name        ListLiberate
// @namespace   tag:neonpaul@gmail.com,1988-06-25:ListLiberate
// @description	Right-click on any select box to add a custom option to it, shift+right-click to list the box's contents in a textarea
// @include     *
// @version	2.0
// ==/UserScript==

(function() {

	function findPos(obj) {
	// http://www.quirksmode.org/js/findpos.html
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			curleft = obj.offsetLeft
			curtop = obj.offsetTop
			while (obj = obj.offsetParent) {
				curleft += obj.offsetLeft
				curtop += obj.offsetTop
			}
		}
		return [curleft,curtop];
	}


	function resize(e){
	   var llc=document.getElementById("listLibContainer");
	   llc.style.height=(e.pageY-parseInt(llc.style.top)-20);
	   llc.style.width=(e.pageX-parseInt(llc.style.left)-20);
	}



  function liberate(e){

	var ll=this.options.length;

	if(e.shiftKey){

		var container=document.createElement("div");
		container.id="listLibContainer";
		container.className="listLibEl";
		container.style.background="#FFFFCC";
		container.style.border="#CC9933 1px solid";
		container.style.display="block";
		container.style.padding="10px";
		container.style.height="100px";
		container.style.width="200px";
		container.style.position="absolute";
		t=findPos(e.target);
		container.style.top=t[1]+20;
		container.style.left=t[0];

		
		var txta=document.createElement("textarea");
		txta.setAttribute("wrap","off");
		txta.readOnly=true;
		txta.className="listLibEl";
		txta.style.width="100%";
		txta.style.height="100%";

		container.appendChild(txta);

		var rszBut=document.createElement("div");
		rszBut.className="listLibEl";
		rszBut.style.display="block";
		rszBut.style.cursor="se-resize";
		rszBut.style.overflow="hidden";
		rszBut.style.color="#CCCC00";
		rszBut.style.fontSize="8pt";
		rszBut.style.textAlign="right";
		rszBut.innerHTML="#";
		rszBut.style.height="10px";
		rszBut.style.width="10px";
		rszBut.style.position="absolute";
		rszBut.style.right=0;
		rszBut.style.bottom=0;

		rszBut.addEventListener("mousedown",function(e){document.addEventListener("mousemove",resize,true);e.stopPropagation();e.preventDefault();},true);
		document.addEventListener("mouseup",function(){document.removeEventListener("mousemove",resize,true);},true);

		container.appendChild(rszBut);

		var txt=document.createElement("a");
		txt.href="http://userscripts.org/scripts/show/3172";
		txt.className="listLibEl";
		txt.style.display="block";
		txt.style.color="#999999";
		txt.style.position="absolute";
		txt.style.right=0;
		txt.style.top=0;
		txt.style.fontSize="7pt";
		txt.style.textDecoration="none";
		txt.style.fontStyle="italic";
		txt.innerHTML="ListLiberate";

		container.appendChild(txt);

		for(var i=0; i<ll; i++){
			txta.value+=(i==0?"":"\n")+this.options[i].text;
		}
		document.body.appendChild(container);
		txta.select();
		document.addEventListener("click",
			function(e){
				if((e.target.className!="listLibEl")&&(llc=document.getElementById("listLibContainer"))){
					document.body.removeChild(llc);
				}
			},true);


	}else if((e.button==2)&&(p=prompt("New option value:",""))){
		this.options[ll]=new Option(p,p);
		this.value=p;
	}else{
		return;
	}

	e.stopPropagation();
	e.preventDefault();
  }

  var l = document.getElementsByTagName("SELECT").length;

  for(var i=0; i<l; i++){

	document.getElementsByTagName('SELECT')[i].addEventListener("contextmenu", liberate, false);

  }


})();