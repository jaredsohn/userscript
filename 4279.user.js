// ==UserScript==
// @author Socket462
// @name SpacePioneers Power Stat
// @description Enhance overview table
// @include http://*.space-pioneers.*statistik.shtml*
// ==/UserScript==
	// features
	
	var macroDiff = true;							// Set to true to enable macro difference display on default
	
	// style
	var textColor = 'black';
	maxRed = 255;
	minGreen = 32;
	
	var red_1 = 150;								//first color for example a nice red (255,32,32)
	var gre_1 = 66;
	var blu_1 = 255;
	
	var red_2 = 255;								//median color for example a nice yellow (255,255,32)
	var gre_2 = 66;
	var blu_2 = 76;
	
	var red_3 = 76;									//last color for example a nice green (32,255,32)
	var gre_3 = 255;
	var blu_3 = 66;
	
	// language specific
	var sviluppo = 'Sviluppo';						// Row title in which is displaied number of used/free place
	var minieraMetallo = 'Miniera di Metallo'; 		// Row title in which is displaied your metal cave
	var punti = 'Punti';							// Row title in which is displaied planet score
	
	
	// Do not edit beyond this point, unless you know what you do
	var el = document.createElement('div');
	el.innerHTML = "PowerStat by Socket462<br>Press <span style=\"color:red;\">m</span> to activate and then toggle Macro Difference Vision";
	el.className = 'tdark';
	document.body.appendChild(el);
	
	window.addEventListener(
    "keyup",
    function f(e){
      	//alert(macroDiff);
        if(e.keyCode==77){
		macroDiff=!macroDiff;
		//vars
		var tds = document.getElementsByTagName('td');
		var i = 0, j;
		var numeroPianeti = 0;
		var red, green;
		var zero = '0';
		
		while(tds[i].className!="tdark"){i++;}
		while(tds[i].className=="tdark"){i++;numeroPianeti++;}
		// generazione colori

		var zero = "0";
		var steps = 30;
		var col = new Array();//
		var red_step_1 = Math.abs(red_2-red_1)/(steps/2);//
		var gre_step_1 = Math.abs(gre_2-gre_1)/(steps/2);
		var blu_step_1 = Math.abs(blu_2-blu_1)/(steps/2);
		var red_step_2 = Math.abs(red_3-red_2)/(steps/2);//
		var gre_step_2 = Math.abs(gre_3-gre_2)/(steps/2);
		var blu_step_2 = Math.abs(blu_3-blu_2)/(steps/2);
		var	red_now = red_1;//
		var gre_now = gre_1;
		var blu_now = blu_1;
		var i = 0;
	
		while(i < steps/2){
	
			red_out = Math.floor(red_now);
			gre_out = Math.floor(gre_now);
			blu_out = Math.floor(blu_now);
			red_out = red_out.toString(16);
			if(red_out.length==1){red_out=zero.concat(red_out);}
			gre_out = gre_out.toString(16);
			if(gre_out.length==1){gre_out=zero.concat(gre_out);}
			blu_out = blu_out.toString(16);
			if(blu_out.length==1){blu_out=zero.concat(blu_out);}
			col_out = "#"+red_out+gre_out+blu_out;
			col.push(col_out);
			
			//red
			if(red_1 > red_2){
				red_now -= red_step_1;
				if(red_now<0){red_now = 0;}
			}else if(red_1 < red_2){
			  	red_now += red_step_1;
			  	if(red_now>red_2){red_now = red_2;}
			}
			//green
			if(gre_1 > gre_2){
				gre_now -= gre_step_1;
				if(gre_now<0){gre_now = 0;}
			} else if(gre_1 < gre_2){
				gre_now += gre_step_1;
				if(gre_now>gre_2){gre_now = gre_2;}
			}
			//blue
			if(blu_1 > blu_2){
				blu_now -= blu_step_1;
				if(blu_now<0){blu_now = 0;}
			} else if(blu_1 < blu_2){
				blu_now += blu_step_1;
				if(blu_now>blu_2){blu_now = blu_2;}
			}
			i++;
		}
		
		while(i < steps){
			if(red_2 > red_3){
				red_now -= red_step_2;
				if(red_now<0){red_now = 0;}
			}else if(red_2 < red_3){
			  	red_now += red_step_2;
			  	if(red_now>red_3){red_now = red_3;}
			}
			
			if(gre_2 > gre_3){
				gre_now -= gre_step_2;
				if(gre_now<0){gre_now = 0;}
			} else if(gre_2 < gre_3){
				gre_now += gre_step_2;
				if(gre_now>gre_3){gre_now = gre_3;}
			}		
	
			if(blu_2 > blu_3){
				blu_now -= blu_step_2;
				if(blu_now<0){blu_now = 0;}
			} else if(blu_2 < blu_3){
				blu_now += blu_step_2;
				if(blu_now>blu_3){blu_now = blu_3;}
			}
			red_out = Math.floor(red_now);
			gre_out = Math.floor(gre_now);
			blu_out = Math.floor(blu_now);
			red_out = red_out.toString(16);
			if(red_out.length==1){red_out=zero.concat(red_out);}
			gre_out = gre_out.toString(16);
			if(gre_out.length==1){gre_out=zero.concat(gre_out);}
			blu_out = blu_out.toString(16);
			if(blu_out.length==1){blu_out=zero.concat(blu_out);}
			col_out = "#"+red_out+gre_out+blu_out;
			col.push(col_out);
			i++;
		}
		// fine generazione colori
		while(tds[i].innerHTML!=sviluppo){i++;}
		for(j = 1; j <= numeroPianeti; j++){
			var bad = eval(tds[i+j].firstChild.innerHTML);
			var indexOfColor = steps - (steps-1)*bad;
			tds[i+j].style.backgroundColor = col[Math.ceil(indexOfColor)];
			tds[i+j].style.color = textColor;
		};
		
		while(tds[i].innerHTML!=minieraMetallo){i++;} 	// si posiziona sulla prima cella dopo miniera di metallo
		while(tds[i].innerHTML!=punti){					// continua finch� non trova la casella punti
			var max = 0;
			var min = 100;
			for(var j = 1; j <= numeroPianeti; j++){
				if(eval(tds[i+j].firstChild.innerHTML)>max){
					max = eval(tds[i+j].firstChild.innerHTML);
				}
				if(eval(tds[i+j].firstChild.innerHTML)<min){
					min = eval(tds[i+j].firstChild.innerHTML);
				} else if(eval(tds[i+j].firstChild.innerHTML)==undefined){
					min = 0;
				}
			}
			if(macroDiff){min = 0;}
			for(j = 1; j <= numeroPianeti; j++){
				var level = eval(tds[i+j].firstChild.innerHTML);
				if(level==undefined){level=0;}
				var indexOfColor = Math.ceil((steps-1) * ((level-min)/(max-min)));
				if(indexOfColor<0){
					indexOfColor = 0;
				} else if(indexOfColor>col.length){
					indexOfColor = col.length-1;
				}
				tds[i+j].style.backgroundColor=col[indexOfColor];
				tds[i+j].style.color=textColor;
			}
			i+=numeroPianeti+1;
		}
    }},
	true);