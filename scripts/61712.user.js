// ==UserScript===
// @name                Diferenciador Plus!
// @namespace           Juampi_Mix
// @description         Enumera y Resalta, las diferencias entre 2 versiones del script (o sea un antes y despues, para resaltar los cambios y/o modificaciones)
// @include             http://userscripts.org/scripts/diff/*
// @version             1.10
// @require             http://userscripts.org/scripts/source/60663.user.js
// @history             1.10 Agregada informacion para el actualizador
// @history             1.00 Creacion del script

// ==/UserScript==

var UDE = {
	init: function(){
		if((pre=$xs("//div[@id='content']/pre"))){
			$sa(pre,"style","padding-left:15px;");
			
			$addCSS(<style><![CDATA[
				.diff{
					float:				left;
					margin-top:			12px;
					padding-top:		6px;
				}
				.diffNr{
					text-align:			center !important;
					font-size:			1.1em !important;
					font-family:		monospace !important;
				}
				.diffNr td{
					padding:			0px !important;
					border-color:		#DDDDDD;
					border-style:		none none none solid;
					border-width:		0 0 0 3px;
				}
				.diffMeta{
					background-color:	#CCCCCC;
				}
				.diffAdd{
					background-color:	#F84343;
				}
				.diffDel{
					background-color:	#99FF99;
				}
				.diffSim{
					padding:			0px 5px 0px 4px;
					margin-right:		5px;
					float:				left;
				}
			]]></style>.toString(),false,top.document);
			
			var div=$ib(pre,$ce("DIV"));
			$sa(div,"class","diff");
			 var table=$ac(div,$ce("TABLE"));
			 $sa(table,"width","100%");
			 $sa(table,"border","0");
			 $sa(table,"cellspacing","0");
			 $sa(table,"cellpadding","0");
			 $sa(table,"class","diffNr");
			 
			$x(".//div[@class='meta']",pre).forEach(function(meta){
				$sa(meta,"style","margin-left:-15px;");
				
				var tr=$ac(table,$ce("TR"));
				 var tdDel=$ac(tr,$ce("TD"));
				 $ac(tdDel,$ct("-"));
				 $sa(tdDel,"class","diffMeta");
				 $sa(tdDel,"width","50%");
				 var tdAdd=$ac(tr,$ce("TD"));
				 $ac(tdAdd,$ct("+"));
				 $sa(tdAdd,"class","diffMeta");
				 $sa(tdAdd,"width","50%");
				
				var iOld=meta.textContent.match(/^@@\s\-(\d+),\d+\s\+(\d+),\d+\s@@/)[1];
				var iNew=meta.textContent.match(/^@@\s\-(\d+),\d+\s\+(\d+),\d+\s@@/)[2];
				while(meta.nextSibling && meta.nextSibling.className!="meta"){
					var temp=meta.nextSibling.textContent.split(/\n/);
					temp.splice(-1, 1);
					var tdDel,tdAdd;
					temp.forEach(function(item){
						var tr=$ac(table,$ce("TR"));
						 tdDel=$ac(tr,$ce("TD"));
						 tdAdd=$ac(tr,$ce("TD"));
						if(!item.match(/^\+/)){
							$sa(tdDel,"class","diffAdd");
							$ac(tdDel,$ct(iOld));
							iOld++;
						}
						if(!item.match(/^\-/)){
							$sa(tdAdd,"class","diffDel");
							$ac(tdAdd,$ct(iNew));
							iNew++;
					}	});
					if(meta.nodeType===3){
						tdDel.style.borderTop="1px solid #FF8888";
						tdAdd.style.borderTop="1px solid #99FF99";
					}
					if(meta.nextSibling.nextSibling && meta.nextSibling.nextSibling.nodeType===3){
						tdDel.style.borderBottom="1px solid #FF8888";
						tdAdd.style.borderBottom="1px solid #99FF99";
					}
					meta=meta.nextSibling;
			}	});
			
			$x(".//div[@class='del' or @class='add']",pre).forEach(function(del){
				var temp = del.textContent;
				$sa(del,"style",""+
					"margin-left:		-15px;"+
					"border:			"+(/^\-/.test(temp)?"#AA3333":"#33AA33")+" solid;"+
					"border-width:		"+(del.previousSibling.nodeType==3?"1px":"0px")+" 1px "+(del.nextSibling.nodeType==3?"1px":"0px")+" 1px;");
				$rc(del);
				$ac(del,$ct(temp.replace(/^[\+\-]/,"")));
				var span=$ce("SPAN");
				$sa(span,"class",(/^\-/.test(temp)?"diffAdd":"diffDel")+" diffSim");
				$ih(span,temp.match(/^[\+\-]/));
				$af(del,span);
});	}	}	}
UDE.init();  // execute;

ScriptUpdater.check(61712, '1.10');
ScriptUpdater.forceNotice(61712, '1.10');
ScriptUpdater.forceCheck(61712, '1.10');
function handleReturnedVersion(v) {
}
ScriptUpdater.check(61712, "1.10", handleReturnedVersion);