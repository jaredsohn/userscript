// ==UserScript==
// @name        RealRecTm
// @namespace   Real Rec
// @include     http://trophymanager.com/players/*
// @exclude     http://trophymanager.com/players
// @version     1
// ==/UserScript==

var positionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "F", "GK"];
var positionFullNames = ["Goleiro","Atacante","Meia Ofensivo Central","Meia Ofensivo Direito","Meia Ofensivo Esquerdo","Meio-Campista Central","Meio-Campista Esquerdo","Meio-Campista Direito","Volante Esquerdo","Volante Direito","Volante Central","Zagueiro Central","Zagueiro Direito","Zagueiro Esquerdo"];

if (location.href.indexOf("/players/") != -1){

	// positionIndex is the array of skill priority for this player.
	// skills is an array of skills for each user
	
/*


*/	
	
document.calculateSkill = function(positionIndex, skills) {
		
		var totSkill = 0;
		for (var i=0; i< positions[positionIndex].length; i++) {
			if (skills[i]>0) {
				totSkill += skills[i]*document.calculateSkillWeight(positions[positionIndex], weights[positionIndex], i);
			}
		}
		
		totSkill = totSkill / 200; 
		totSkill = Math.round(totSkill*1000)/1000;
		
		return totSkill;
	};
/*


*/	
document.calculateSkillWeight = function(positionWeightLevels, weights, index) {
		var weight = 0;
		weight = weights[positionWeightLevels[index]-1] / document.numberAtWeight(positionWeightLevels, positionWeightLevels[index]) * 10;
		return weight;
	};
/*


*/		
document.numberAtWeight = function(positionWeightLevels, value) {
		var count = 0;
		for (var i=0; i< positionWeightLevels.length; i++) {
			if (positionWeightLevels[i] == value) {
				count++;
			}
		}
		return count;
	};
/*


*/	
document.findPositionIndex = function(position) {
		var index = -1;
		for (var k=0; k< positionFullNames.length; k++) {
			if (position.indexOf(positionFullNames[k]) == 0) {
				index = k;
				k = positionFullNames.length;
			}
		}
		return index;
	};
/*


*/		
document.getSkills = function(table) {
		var skillArray = [];
		var tableData = table.getElementsByTagName("td");
		if (tableData.length > 1) {
			for (var i = 0; i < 2; i++) {
			
				for (var j = i; j < tableData.length; j += 2) {
					if (tableData[j].innerHTML.indexOf("star.png") > 0) {
						skillArray.push(20);
					}
					else if (tableData[j].innerHTML.indexOf("star_silver.png") > 0) {
						skillArray.push(19);
					}
					else if (tableData[j].textContent.length != 0) {
						skillArray.push(tableData[j].textContent);
					}
				}
			}
		}
		return skillArray;
	};

function computeSK(skills){
	var SKs = [0, 0];
	   var positionCell = document.getElementsByClassName("favposition long")[0].childNodes;
	var positionArray = [];
	if (positionCell.length == 1){
			positionArray[0] = positionCell[0].textContent;
	} else if (positionCell.length == 2){
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
	} else if (positionCell[1].className == "split"){
			positionArray[0] = positionCell[0].textContent + positionCell[3].textContent;
			positionArray[1] = positionCell[2].textContent + positionCell[3].textContent;
	} else if (positionCell[3].className == "f"){
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
			positionArray[1] = positionCell[3].textContent;
	} else {
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
			positionArray[1] = positionCell[0].textContent + positionCell[3].textContent;
	}
	for (var i = 0; i < positionArray.length; i++){
			var positionIndex = document.findPositionIndex(positionArray[i]);
			if (positionIndex > -1) {
				SKs[i] = document.calculateSkill(positionIndex, skills);
			}
	}
	return SKs;
	}
/*


*/	
document.createTR = function(table, Asiarray, skillArray) {
		
	var positionCell = document.getElementsByClassName("favposition long")[0].childNodes;
	var positionArray = [];
	if (positionCell.length == 1){
			positionArray[0] = positionCell[0].textContent;
	} 
	else if (positionCell.length == 2){
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
	} 
	else if (positionCell[1].className == "split"){
			positionArray[0] = positionCell[0].textContent + positionCell[3].textContent;
			positionArray[1] = positionCell[2].textContent + positionCell[3].textContent;
	} 
	else if (positionCell[3].className == "f"){
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
			positionArray[1] = positionCell[3].textContent;
	} 
	else {
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
			positionArray[1] = positionCell[0].textContent + positionCell[3].textContent;
	}
	for (var i = 0; i < positionArray.length; i++){
			var positionIndex = document.findPositionIndex(positionArray[i]);
			}	
		

        var RecReal;
        i=0;
        
        var recArray = [];
        
        while (positionArray[i] != undefined){        	
        	
        	RecReal = document.getRealRec ( positionArray[i], Asiarray, skillArray );
        	
        	var rec = RecReal;
        	recArray[i] = rec;
        	
        	document.createTabela( table, rec, positionArray[i]);
        	
        	i++;
        	
        }//fim do while	
	
	    var melhorRec = 0;
	    var posicaoMelhor;
	    var recAux;
	    for( i=0; i < positionFullNames.length; i++ )
	    {
	       recAux = document.getRealRec ( positionFullNames[i], Asiarray, skillArray );       	
	       if ( recAux >= melhorRec ) {
	           melhorRec = recAux;
	           posicaoMelhor = positionFullNames[i];
	    }
	       
	    }
	    
	    if ( ((recArray[0].toFixed(3) < melhorRec.toFixed(3)) && (recArray[1].toFixed(3) != melhorRec.toFixed(3))) || ((recArray[1].toFixed(3) < melhorRec.toFixed(3) ) && (recArray[0].toFixed(3) != melhorRec.toFixed(3))) )
	    {
	       	document.createTabela( table, melhorRec, posicaoMelhor );
	        var tabela = document.getElementsByClassName("float_left info_table zebra")[0].getElementsByTagName("tr")[positionArray.length + 9].getElementsByTagName("th")[0];
	       // var th = tabela.getElementsByTagName("tr")[tabela.length].getElementsByTagName("th")[0];
	        tabela.innerHTML = "Melhor Posição";
	        tabela.setAttribute("style","color:#FFFF00");
	        document.getElementsByClassName("float_left info_table zebra")[0].getElementsByTagName("tr")[positionArray.length + 9].getElementsByTagName("th")[1].setAttribute("style","color:#FFFF00");
	        	       	       
	    }
	
	
	};

/*




*/

document.getRealRec = function( positionArray, Asiarray, skillArray ){

                var ASI = 0;		
        		Asiarray[3] = (Asiarray[3].replace(",",""));		
        		ASI = parseFloat(Asiarray[3]);
    		
        		var FC  =[0.493917051093474, 0.370423904816088 , 0.532148929996192 , 0.0629206658586336 , 0.0904950078155216 , 0.415494774080483 , 0.54106107545574 , 0.4681811460958 , 0.158106484131194 , 0.461125738338018 , 0.83399612271067 , 0.999828328674183 , 0.827171977606305 , 0.253225855459207 ];
        	    var OMC =[0.656437768926678, 0.617260722143117 , 0.656569986958435 , 0.637410545206289 ,  0.55148452726771 ,   0.922379789905246 , 0.790553566121791 ,0.999688557334153 ,0.426203575603164 ,0.778770912265944 , 0.652374065121788 ,0.662264393455567 , 0.73120100926333   ,0.274563618133769];        
                var OMLR=[0.483341947292063, 0.494773052635464, 0.799434804259974, 0.628789194186491, 0.633847969631333, 0.681354437033551, 0.671233869875345, 0.536121458625519, 0.849389745477645, 0.684067723274814, 0.389732973354501, 0.499972692291964, 0.577231818355874, 0.272773352088982];
                var MC  =[0.578431939417021, 0.778134685048085, 0.574726322388294, 0.71400292078636, 0.635403391007978, 0.822308254446722, 0.877857040588334, 0.864265671245476, 0.433450219618618, 0.697164252367046, 0.412568516841575, 0.586627586272733, 0.617905053049757, 0.308426814834866 ];
                var MLR =[0.497429376361348, 0.545347364699553, 0.788280917110089, 0.578724574327427, 0.663235306043286, 0.772537143243647, 0.638706135095199, 0.538453108494387, 0.887935381275257, 0.572515970409641, 0.290549550901104, 0.476180499897665, 0.526149424898544, 0.287001645266184];        
                var DMLR =[0.582074038075056, 0.420032202680124, 0.7887541874616, 0.726221389774063, 0.722972329840151, 0.737617252827595, 0.62234458453736, 0.466946909655194, 0.814382915598981, 0.561877829393632, 0.367446981999576, 0.360623408340649, 0.390057769678583, 0.249517737311268];
                var DMC =[0.55838825558912, 0.603683502357502, 0.563792314670998, 0.770425088563048, 0.641965853834719, 0.675495235675077, 0.683863478201804, 0.757342915150728, 0.473070797767482, 0.494107823556837, 0.397547163237438, 0.429660916538242, 0.56364174077388, 0.224791093448809];
                var DC  =[0.653962303361921, 0.330014238020285, 0.562994547223387, 0.891800163983125, 0.871069095865164, 0.454514672470839, 0.555697278549252, 0.42777598627972, 0.338218821750765, 0.134348455965202, 0.796916786677566, 0.048831870932616, 0.116363443378865, 0.282347752982916];
                var DLR =[0.565605120229193, 0.430973382039533, 0.917125432457378, 0.815702528287722, 0.99022325015212, 0.547995876625372, 0.522203232914265, 0.309928898819518, 0.837365352274204, 0.483822472259513, 0.656901420858592, 0.137582588344562, 0.163658117596413, 0.303915447383549];
                var GK  =[0.5, 0.333, 0.5, 1, 0.5, 1, 0.5, 0.5, 0.333, 0.333, 0.333];

                var Soma = 0;
        	    var PotenciaAsi = 0;
        		var Skill=0;
        		var SkillSun=0;
        		var Remainder=0;
        		var Weightings = [];
        		var SomaWeightings = 0;
        		var Score = 0;        		
        		var SomaF = 0;
        		var REC=[];
        		
        		switch (positionArray){
        		      
        		      case "Goleiro":
        		          Weightings = GK;
        		          break;
        		      case "Atacante": 
        		          Weightings = FC;
        		          REC = [13.2762119 , 19.5088591];
        		          break;
        		      case "Meia Ofensivo Central":
        		          Weightings = OMC;
        		          REC = [18.1255351 , 27.8974544];        		          
        		          break;
        		      case "Meia Ofensivo Direito":
        		          Weightings = OMLR;
        		          REC = [15.6304867 , 24.54323];        		          
        		          break;
        		      case "Meia Ofensivo Esquerdo":
        		          Weightings = OMLR;
        		          REC = [15.6304867 , 24.54323];        		          
        		          break;
        		     case "Meio-Campista Central":
        		          Weightings = MC ;
        		          REC = [17.6955092 , 26.8420884];        		          
        		          break;
        		      case "Meio-Campista Esquerdo":
        		          Weightings = MLR;
        		          REC = [16.6189141 , 23.9940623];        		          
        		          break;
        		      case "Meio-Campista Direito":
        		          Weightings = MLR;
        		          REC = [16.6189141 , 23.9940623];        		          
        		          break;
        		      case "Volante Esquerdo":
        		          Weightings = DMLR;
        		          REC = [15.5835325 , 23.2813871];        		          
        		          break;
        		      case "Volante Direito":
        		          Weightings = DMLR;
        		          REC = [15.5835325 , 23.2813871];        		          
        		          break;
        		      case "Volante Central":
        		          Weightings = DMC;
        		          REC = [15.8932675 , 23.1801296];        		          
        		          break;
        		      case "Zagueiro Central":
        		          Weightings = DC;
        		          REC = [14.866375 , 18.95664];        		          
        		          break;
        		      case "Zagueiro Direito":
        		          Weightings = DLR;
        		          REC = [15.980742 , 22.895539];        		          
        		          break;
        		      case "Zagueiro Esquerdo":
        		          Weightings = DLR;
        		          REC = [15.980742 , 22.895539];        		          
        		          break;
        		      default:
        		          Weightings = null;
        		          REC = null;
        		          break;
        		  
        		}
        		
        		
        		
        		if (positionArray == "Goleiro"){
        		  SkillSun = Math.pow(ASI,0.143)/0.02979;        		  
        		  var h = 0;
            		for(var j=0; j<=15; j++){        		
                		if ((skillArray[j] < 21) && (skillArray[j] != "N/A" )){                		
                    		SomaWeightings += Weightings[h];
                    		Skill = parseFloat( skillArray[j] );
                    	    SomaF += ( Skill * Weightings[h] );
                    	    Soma = Soma + Skill;
                    	    h++;
                    	    }            	
                	}
            	    Remainder = SkillSun - Soma;
            	    Score = SomaF + (Remainder *(SomaWeightings/11));
            	    RecRealArray = (Score*1.27-15)/22.3;
            		i++;
        		          		  
        		}
        		else{
        		    SkillSun = Math.pow(ASI,1/6.99194)/0.02336483;//*1.0000848155;
        		    
            		var h = 0;
            		for(var j=0; j<=15; j++){        		
                		if ((skillArray[j] < 21) && (skillArray[j] != "N/A" )){
                		
                    		SomaWeightings += Weightings[h];
                    		Skill = parseFloat( skillArray[j] );
                    	    SomaF += ( Skill * Weightings[h] );
                    	    Soma = Soma + Skill;
                    	    h++;
                    	    }            	
                	}
            	    Remainder = SkillSun - Soma;
            	    Score = SomaF + (Remainder *(SomaWeightings/14));
            	    RecRealArray = (Score - REC[0])/REC[1];
            		i++;
            		}
            		
            		return RecRealArray;

}

/*



*/


document.createTabela = function( table, rec , positionArray){
                
                var tr = document.createElement("tr");
        		var th = document.createElement("th");
        		th.innerHTML = " ";
        		tr.appendChild(th);
        		var th = document.createElement("th");
        		
        		th.innerHTML = positionArray;
        		tr.appendChild(th);
        		var td = document.createElement("td");
        	    // td.setAttribute("class", "align_center");
        		//td.innerHTML = Asiarray[3];
                td.innerHTML = rec.toFixed(3);        		
        		tr.appendChild(td);
        		table.appendChild(tr);

}


    function Precision( num, nDecimals ) { 
        var i = Math.floor( num ); 
        var f = Math.round( ( num - i ) * Math.pow( 10, nDecimals) ); 
        return i + "." + f;
}
	
	(function() {
	       	    	       
		var playerTable = document.getElementsByClassName("skill_table zebra")[0];
		var skillArray = document.getSkills(playerTable);
				
		var AsiTable = document.getElementsByClassName("float_left info_table zebra")[0];
		var AsiArray = document.getSkills(AsiTable);
		 	
		document.createTR(AsiTable, AsiArray, skillArray);
		
		
	//	document.getElementsByClassName("odd").getElementsByClassName("megastar recomendation_potential").style.background-position= "0px -200px";	
		return 0;
	})();
}