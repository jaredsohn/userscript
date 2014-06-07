// ==UserScript==
// @name          Computable minds accessibilizer
// @namespace     http://www.computableminds.com/make-accesible/
// @author        Ramón Saquete
// @copyright     Ramón Saquete
// @licence       Summary: Free for personal non-commercial use; 
// @description   This scripts change the style of a web page making the font bigger and using the accesible and nice color palette of the blog Computable minds
// @version        1.0
// @updateURL     http://www.computableminds.com/make-accesible/accessibilizer.user.js
// @website       http://www.computableminds.com/post/improve-accesibility-web-pages.html
// @include       *
// @exclude       http://www.computableminds.com/*
// @exclude       http://www.pensamientoscomputables.com/*
// @exclude       https://plusone.google.com/*
// ==/UserScript==

//code for add a marker
//javascript:var%20s%20=%20document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='http://www.pensamientoscomputables.com/accesible/accessibilizer.user.js';void(0);
//download url
//http://www.computableminds.com/accesible/accessibilizer.user.js
window.accesibilize={
	getStyle:function(x,styleProp)
	{
		var y=null;
		if (x.currentStyle){
			y = x.currentStyle[styleProp];
		}
		else{ 
			if (window.getComputedStyle){
				y = window.getComputedStyle(x,"");
				if (y){
					y=y.getPropertyValue(styleProp);
				}
			}
		}
		return y;
	},
	getColorArray:function (color){
		var colors=color.split(",");

		if (color!="transparent" && color!="inherit"){
			colors[0]=parseInt(colors[0].replace("rgb(",""));
			colors[1]=parseInt(colors[1]);
			colors[2]=parseInt(colors[2].replace(")",""));
		}
		else{
			colors=null;
		}
		return colors;
	},
	getColorString:function (ele){
		var color=window.accesibilize.getStyle(ele,"color");
		if (color=="transparent" || color=="inherit"){
			color="";
		}	
		return color;
	},
	getBGColorString:function (ele){
		var color=window.accesibilize.getStyle(ele,"background-color");
		if (color=="transparent" || color=="inherit"){
			color="";
		}
		return color;
	},
	getFontSize:function (ele){
		var tam=0;
		//si viene directamente en pixels
		if (!isNaN(parseInt(window.accesibilize.getStyle(ele,"font-size").replace('px','')))){
			tam=parseInt(window.accesibilize.getStyle(ele,"font-size").replace('px',''));
		}
		else{
			var aux = document.createElement('div');
			aux.style.margin="0px";
			aux.style.width="1000em";
			aux.style.padding="0px";
			aux.fontSize="1em";
			aux.position="absolute";
			aux.visibility="hidden";
			ele.appendChild(aux);
			tam=Math.round(aux.offsetWidth/1000);
			ele.removeChild(aux);
		}
		return tam;
	},
	firstTime:true,
	init:function (){

		var elements=document.getElementsByTagName('*');
		var colores=new Array();
		var fondos=new Array();
		colores[0]="#b1bdb2";
		fondos[0]="#292d31";
		colores[1]="#b1bdb2";
		fondos[1]="#131a13";
		colores[2]="#b1bdb2";
		fondos[2]="#183030";


		var asignacion=new Array();
		var colorActual=2;
		var setMinFontSize=15;
		var fontDiff=0;
		var minFontSize=setMinFontSize;


		for (i=0;i<elements.length;i++){
			var ele=elements[i];
			var color=window.accesibilize.getColorString(ele);
			var colorBG=window.accesibilize.getBGColorString(ele);
			var numOpciones=colores.length;
			//si no existe ya
			if (asignacion[color]==undefined || asignacion[colorBG]==undefined){
				colorActual++;
			}	
			if (color!=null){
				if (asignacion[color]==undefined){
					asignacion[color]=colorActual%numOpciones;
				}	
			}
			if (colorBG!=null){
				if (asignacion[colorBG]==undefined){
					asignacion[colorBG]=colorActual%numOpciones;
				}
			}
			var actualFontSize=window.accesibilize.getFontSize(ele);
			if (actualFontSize!=0 && minFontSize>actualFontSize){
				minFontSize=actualFontSize;
			}
				
		}
		
		if (minFontSize<setMinFontSize){
			fontDiff=setMinFontSize-minFontSize;
		}

		for (i=0;i<elements.length;i++){
			var ele=elements[i];
			
			if (ele.style){
				if (ele.className.indexOf("ac3c1b-")==-1){
					ele.className+=" ac3c1b-";
					var color=window.accesibilize.getColorString(ele);
					var colorBG=window.accesibilize.getBGColorString(ele);
					if (color!=null && asignacion[color]!=undefined){
						ele.style.color=colores[asignacion[color]];
					}
					if (ele.tagName=="A"){
						ele.style.color="#87b987";
						ele.addEventListener("mouseover", function(e){ this.style.color='#daf0db'; }, false);
						ele.addEventListener("mouseout", function(e){ this.style.color='#87b987'; }, false);
					}					
					ele.style.background="none";
					if (colorBG!=null && asignacion[colorBG]!=undefined){
						ele.style.backgroundColor=fondos[asignacion[colorBG]];
					}
					if (ele.style.textAlign=="justify"){
						ele.style.textAlign="left";
					}
					

					if (ele.tagName=="P"){
						ele.style.marginBottom="10px";
						ele.style.textIndent="20px";
						ele.style.textAlign="left";
					}
					
					if (ele.tagName=="INPUT" || ele.tagName=="TEXTAREA" || ele.tagName=="SELECT"){
						ele.style.backgroundColor="#000";
					}			
					
					if (window.accesibilize.getStyle(ele,"border-top-color")!=""){
						ele.style.borderTopColor="#CCCCCC";
					}
					if (window.accesibilize.getStyle(ele,"border-left-color")!=""){
						ele.style.borderLeftColor="#CCCCCC";
					}
					if (window.accesibilize.getStyle(ele,"border-right-color")!=""){
						ele.style.borderRightColor="#CCCCCC";
					}
					if (window.accesibilize.getStyle(ele,"border-bottom-color")!=""){
						ele.style.borderBottomColor="#CCCCCC";
					}
					ele.style.fontFamily="Arial,sans-serif";
					
					var tamFont=0;
					
					tamFont=window.accesibilize.getFontSize(ele);
					if (tamFont!=0 && tamFont<setMinFontSize){
						ele.style.fontSize=parseInt(tamFont+fontDiff-((tamFont+fontDiff)-setMinFontSize)/2)+"px";
					}
					
				}
			}
			
		}
		
		document.body.backgroundColor="#000";

		if (window.accesibilize.firstTime){
			//crear menu
			var menuC = document.createElement('div');
			menuC.style.border="5px double #b1bdb2";
			menuC.style.position="fixed";
			menuC.style.bottom="0px";
			menuC.style.width="155px";
			menuC.style.right="0px";
			menuC.style.padding="5px";
			menuC.style.paddingBottom="0px";
			menuC.style.marginRight="10px";
			menuC.style.marginBottom="10px";
			menuC.style.marginTop="0px";
			menuC.style.marginLeft="0px";
			menuC.style.backgroundColor="#131a13";
			menuC.style.color="#000";
			menuC.style.fontWeight="bold";
			menuC.style.display="block";
			menuC.style.fontFamily="Arial,sans-serif";
			menuC.style.lineHeight="15px";
			menuC.style.zIndex="1000";
			menuC.style.fontSize="14px";
			menuC.className+=" ac3c1b- menuac3";
			menuC.setAttribute('id','menuCmenuac3');

			
			//document.createTextNode(
		menuC.innerHTML='<a class="ac3c1b- menuac3" style="float:right;color:#b1bdb2;clear:left;margin-bottom:10px;display:block;" href="javascript:(function(){document.getElementById(\'menuCmenuac3\').style.display=\'none\';})();" '+
		'onmouseover="javascript:this.style.color=\'#daf0db\';" '+ 
		'onmouseout="javascript:this.style.color=\'#b1bdb2\';">[X] Close</a>';
			menuC.innerHTML+='<p class="ac3c1b- menuac3" style="font-family:Arial,sans-serif;text-align:left;text-indent:0px;color:#b1bdb2;font-size:15px;margin:0px;clear:right;padding:0px;margin-bottom:5px;"><a href="javascript:(function (){'+
					'var elements=document.getElementsByTagName(\'*\');'+
					'for (i=0;i<elements.length;i++){'+
						'var ele=elements[i];'+
						'if (ele.className.indexOf(\'menuac3\')==-1){'+
							'tamFont=(function(ele){'+
								'var tam=0;'+						
								'var textTam=(function(ele){'+
										'var y=null;'+
										'if (ele.currentStyle){'+
											'y = ele.currentStyle[\'font-size\'];'+
										'}'+
										'else{ '+
											'if (window.getComputedStyle){'+
												'y = window.getComputedStyle(ele,\'\');'+
												'if (y){'+
													'y=y.getPropertyValue(\'font-size\');'+
												'}'+
											'}'+
										'}'+
										'return y;'+
									'}'+									
								')(ele);'+
								'var tamAux=parseInt(textTam.replace(\'px\',\'\'));'+
								'if (!isNaN(tamAux)){'+
									'tam=tamAux;'+
								'}'+
								'else{'+
									'var aux = document.createElement(\'div\');'+
									'aux.style.margin=\'0px\';'+
									'aux.style.width=\'1000em\';'+
									'aux.style.padding=\'0px\';'+
									'aux.fontSize=\'1em\';'+
									'aux.position=\'absolute\';'+
									'aux.visibility=\'hidden\';'+
									'ele.appendChild(aux);'+
									'tam=Math.round(aux.offsetWidth/1000);'+
									'ele.removeChild(aux);'+
								'}'+								
								'return tam;'+									
							'})(ele);'+
							'if (tamFont!=0){'+
								'ele.style.fontSize=tamFont+1+\'px\';'+
							'}'+
						'}'+
					'}'+
				'})();" class="ac3c1b- menuac3" style="color:#87b987;font-size:15px;margin:0px;padding:0px;" '+
					'onmouseover="javascript:this.style.color=\'#daf0db\';" '+ 
					'onmouseout="javascript:this.style.color=\'#87b987\';" >&uarr; Increase font</a></p>';
			menuC.innerHTML+='<p class="ac3c1b- menuac3" style="font-family:Arial,sans-serif;text-align:left;text-indent:0px;color:#b1bdb2;font-size:15px;margin:0px;padding:0px;margin-bottom:5px;"><a href="javascript:(function (){'+
					'var elements=document.getElementsByTagName(\'*\');'+
					'for (i=0;i<elements.length;i++){'+
						'var ele=elements[i];'+
						'if (ele.className.indexOf(\'menuac3\')==-1){'+
							'tamFont=(function(ele){'+
								'var tam=0;'+						
								'var textTam=(function(ele){'+
										'var y=null;'+
										'if (ele.currentStyle){'+
											'y = ele.currentStyle[\'font-size\'];'+
										'}'+
										'else{ '+
											'if (window.getComputedStyle){'+
												'y = window.getComputedStyle(ele,\'\');'+
												'if (y){'+
													'y=y.getPropertyValue(\'font-size\');'+
												'}'+
											'}'+
										'}'+
										'return y;'+
									'}'+									
								')(ele);'+
								'var tamAux=parseInt(textTam.replace(\'px\',\'\'));'+
								'if (!isNaN(tamAux)){'+
									'tam=tamAux;'+
								'}'+
								'else{'+
									'var aux = document.createElement(\'div\');'+
									'aux.style.margin=\'0px\';'+
									'aux.style.width=\'1000em\';'+
									'aux.style.padding=\'0px\';'+
									'aux.fontSize=\'1em\';'+
									'aux.position=\'absolute\';'+
									'aux.visibility=\'hidden\';'+
									'ele.appendChild(aux);'+
									'tam=Math.round(aux.offsetWidth/1000);'+
									'ele.removeChild(aux);'+
								'}'+								
								'return tam;'+									
							'})(ele);'+
							'if (tamFont!=0){'+
								'ele.style.fontSize=tamFont-1+\'px\';'+
							'}'+
						'}'+
					'}})();" class="ac3c1b- menuac3" style="color:#87b987;font-size:15px;margin:0px;padding:0px;" '+
					'onmouseover="javascript:this.style.color=\'#daf0db\';" '+ 
					'onmouseout="javascript:this.style.color=\'#87b987\';" >&darr; Decrease font</a></p>';
/*
			menuC.innerHTML+='<p class="ac3c1b- menuac3" style="text-align:left;text-indent:0px;color:#b1bdb2;font-size:15px;margin:0px;padding:0px;margin-bottom:5px;"><a href="javascript:(function (){'+
					'var elements=document.getElementsByTagName(\'*\');'+
					'for (i=0;i<elements.length;i++){'+
						'var ele=elements[i];'+
						'if (ele.className.indexOf(\'menuac3\')==-1){'+
							'ele.style.backgroundImage=\'none\';'+
						'}'+
					'}})();" class="ac3c1b- menuac3" style="color:#87b987;font-size:15px;margin:0px;padding:0px;">Hide backgrounds</a></p>';
	*/				
					
			menuC.innerHTML+='<iframe src="http://www.computableminds.com/accesible/accessible.html" style="border:none;overflow:hidden;width:155px;" width="155"/>'
			document.body.appendChild(menuC);
			
		}
		window.accesibilize.firstTime=false;
		
	}
}


if (typeof(GM_log)=="undefined"){
	window.onload=window.accesibilize.init;
}

if (window.top == window.self) {
  window.accesibilize.init();
}





