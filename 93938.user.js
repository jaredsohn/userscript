// ==UserScript==
// @name           Fc
// @namespace      Fc
// @description    FC
// @include        http://10.150.0.7/ari.html
// ==/UserScript==

var container;
var Doc = {
	New : function(tt,attrs){
		newElement = document.createElement(tt);
		if (attrs !== undefined) {
			for(var xi = 0; xi < attrs.length; xi++) {
				newElement.setAttribute(attrs[xi][0], attrs[xi][1]);
		};
	};
	return newElement;
	}, 
	Element : function(eid){
		return document.getElementById(eid);	
	}
};



function GM_Init(){
	container = Doc.New("span",[['id','filet_cont'],['style','position:absolute; z-index:2; top:0px;right:0px ']]);

	var Mybutton = Doc.New('a',[['href','javascript:void(0);']]);
	Mybutton.innerHTML = "Do Filter"
	
	Mybutton.addEventListener("click",function(){GM_MyFilter();},false);
	
	document.body.appendChild(container);
	container.appendChild(Doc.New("input",[['type','text'],['id','GM_cond']]));
	container.appendChild(Mybutton);
	container.appendChild(Doc.New("input",[['type','text'],['id','GM_res']]));
}

function GM_MyFilter(){
	var myVal = Doc.Element("GM_cond").value;
	var	sum = 0;
	vTable = document.getElementById("maincont");
	vTr = vTable.getElementsByTagName("tr");
	if (vTr !== undefined  && vTr.length > 0){
		for (var i = 0 ; i < vTr.length ; i++){
			tr = vTr[i];
			td = tr.getElementsByTagName("td");
			if(td[3].innerHTML != myVal ){
				tr.style.display='none';
			}else{
				sum += parseFloat(td[4].innerHTML);
			}
		}
		Doc.Element("GM_res").value = sum;
	}

}

GM_Init();
