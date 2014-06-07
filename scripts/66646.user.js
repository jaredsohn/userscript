// ==UserScript==
// @name           borrarTemas
// @namespace      motos
// @description    Borra temas
// @include        http://debates.motos.coches.net/*
// ==/UserScript==

var nicks=["tengo el poder","Ugachu..."];

var borrarTemas=function(){
	if (document.getElementById("threadbits_forum_3")!=null){
		var base=document.getElementById("threadbits_forum_3");
		var spans=base.getElementsByTagName('span');
		for (var i=0; i<nicks.length; i++){	
			for (var x=spans.length-1; x>=0; x--){
				if (spans[x].innerHTML==nicks[i]){
					var nodeId=spans[x].parentNode.parentNode.id;
					var exp="^td_threadtitle_";
					if (nodeId.search(exp)==0){
						var rIndex = spans[x].parentNode.parentNode.parentNode.sectionRowIndex;
						spans[x].parentNode.parentNode.parentNode.parentNode.deleteRow(rIndex);
					}
				}
			}
		}
	}
	if (document.getElementById("posts")!=null){
		var base=document.getElementById("posts");
		var anchors=base.getElementsByTagName('a');
		for (var i=0; i<nicks.length; i++){	
			for (var x=anchors.length-1; x>=0; x--){
				if (anchors[x].className=="bigusername" && anchors[x].innerHTML==nicks[i]){
					console.log(anchors[x].innerHTML);
					base.removeChild(anchors[x].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
				}
			}
		}
	}
}

borrarTemas();