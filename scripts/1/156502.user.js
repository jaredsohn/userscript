// ==UserScript==
// @name        webSudokuSolver
// @namespace   webSudokuSolver
// @description solves websudoku 
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @include     *.websudoku.com/*
// @version     1
// ==/UserScript==
// macroblock == a 3x3 group of cells - A standard sudoku has 9 macroblocks

//-----------------------------------------------------------------------------
//Demonstrates 2 methods for determining values for empty cells in a sudoku 
//And 1 algorithm (backtracking variation) for completely solving sudoku
//I know the solution is present in the site, but hidden, so it can be easily 
//extracted from there, but the goal is to demonstrate algorithms for teaching pourpose 
//
//Author Socianu Costin - (please do not remove this credit)
//-----------------------------------------------------------------------------

//Utility function:
//creates an array of len elementseach set to val
function newFilledArray(len, val) {
    var rv = new Array(len);
    while (--len >= 0) {
        rv[len] = val;
    }
    return rv;
}

//It determins a set of possible values, for each cell
//by takeing into account values in the rows, columns and macroblocks
function cicleaza(){
	//construct sets for each line, column and macroblock
	//containing values from 1 to 9 present in the respective line, column and macroblock
	//Sets are stored in a bytes where 1'st bit coresponds to value 1 and 9'th bit to value 9
	//The rest of bits (10-16) are not used.
	var lipsa_linii = newFilledArray(9,0);//sets for lines
	var lipsa_coloane = newFilledArray(9,0);//sets for columns
	var lipsa_blocuri = newFilledArray(9,0);//sets for macroblocks
	
	for (var linie = 0; linie<9; linie++){
		for (var coloana = 0; coloana<9; coloana++){
			var valoare = $('#f'+coloana+linie).val();
			if (valoare) {
				lipsa_linii[linie]+=Math.pow(2,valoare-1);
				lipsa_coloane[coloana]+=Math.pow(2,valoare-1);
				lipsa_blocuri[Math.floor(linie/3)*3 + Math.floor(coloana/3)]+=Math.pow(2,valoare-1);
			}
		}
	}
	
	//determine missing values from sets using binary negation
	for (var i=0;i<9;i++){
		lipsa_linii[i]=~lipsa_linii[i];
		lipsa_coloane[i]=~lipsa_coloane[i];
		lipsa_blocuri[i]=~lipsa_blocuri[i];
	}
			
	//determine sets of posible values for each cell through intersection
	for (linie = 0; linie<9; linie++){
		for (coloana = 0; coloana<9; coloana++){
			var valoare = $('#f'+coloana+linie).val();
			if (valoare == '') {
				repeta=true;
				$('#f'+coloana+linie).data('multime',
						lipsa_linii[linie] & 
						lipsa_coloane[coloana] & 
						lipsa_blocuri[Math.floor(linie/3)*3 + Math.floor(coloana/3)] &
						(Math.pow(2,9)-1));//ignore 10-16 bits
				//if there is only a value in set weinscribe that value
				switch($('#f'+coloana+linie).data('multime')){
					case 1:$('#f'+coloana+linie).val(1);break;
					case 2:$('#f'+coloana+linie).val(2);break;
					case 4:$('#f'+coloana+linie).val(3);break;
					case 8:$('#f'+coloana+linie).val(4);break;
					case 16:$('#f'+coloana+linie).val(5);break;
					case 32:$('#f'+coloana+linie).val(6);break;
					case 64:$('#f'+coloana+linie).val(7);break;
					case 128:$('#f'+coloana+linie).val(8);break;
					case 256:$('#f'+coloana+linie).val(9);break;
				}
			}
		}
	}
}

//Determine values for empty cells through exclusion
function CompleteazaPrinTaiere(cifra){
	return function(){
		
		//strikethrough lines and columns by adding special HTML class
		for (linie = 0; linie<9; linie++){
			for (coloana = 0; coloana<9; coloana++){
				var valoare = $('#f'+coloana+linie).val();
				$('#f'+coloana+linie).addClass('macrobloc_' + (Math.floor(linie/3)*3 + Math.floor(coloana/3)));//adaugam clasa macrobloc_in functie de carui macrobloc apartine imputul (de la 1 la 9)
				if (valoare == cifra) {
					for (var i = 0;i<9;i++){
						$('#f' + coloana + i).addClass('taiat_' + cifra);//exclude column
						$('#f' + i + linie).addClass('taiat_' + cifra);//exclude line
					}
				}
			}
		}
		
		//Fill empty cell with cifra where it is the case
		for (var macrobloc=0;macrobloc<9;macrobloc++){
			//all elements that are in the current macrobloc, are empty, and are not excluded(strikethrough)
			var element_de_completat = $('.macrobloc_' + macrobloc + ':not(.taiat_'+cifra+')input[value=""]');
			if (element_de_completat.length==1){//if it is a single element respecting the above gondition
				if ($('.macrobloc_'+macrobloc+':input[value='+cifra+']').length==0){//make sure cifra isn't included in this macroblock
					element_de_completat.val(cifra);
				}
			}
		}
	}
}

//---------------------------------------------
//Start of Backtracking section

//Gets Next possible value given the curent value inscribed or not inscribed in a cell
function GetNextValue(patratica){
	if (patratica.val()==9){
		return false;//No greater posible value
	}else{
		var min_value;
		if (patratica.val()==''){
			min_value = 1;
		}else{
			min_value = Number(patratica.val())+1;
		}
		var coloana = patratica.attr('id').charAt(1);//column index of patratica cell
		var linie = patratica.attr('id').charAt(2);//rom index of patratica cell

		var i,j;
		search:	while(true){
			//searching next posible value by line and column
			for (i=0;i<=8;i++){
				j=i;
				if (patratica.attr('id')!='f'+i+linie && $('#f'+i+linie).val()==min_value){
					min_value++;continue search;//restart search with new min_value
				}
				if (patratica.attr('id')!='f'+coloana+j && $('#f'+coloana+j).val()==min_value){
					min_value++;continue search;//restart search with new min_value
				}
				if (min_value==10) return false;
			}

			//cautam in macrobloc
			var coloana_stanga_sus = Math.floor(coloana/3)*3;//first's column index of the cell's macroblock
			var linie_stanga_sus = Math.floor(linie/3)*3;//first's row index of the cell's macroblock
			
			MB_search:
			for (i=coloana_stanga_sus;i<=coloana_stanga_sus+2;i++){
				for (j=linie_stanga_sus;j<=linie_stanga_sus+2;j++){
					if (patratica.attr('id')!='f'+i+j && $('#f'+i+j).val()==min_value){//do not search in the patratica cell
						min_value++;
						if (min_value==10) return false;//no greater posible value
						continue search;//restart search with new min_value
					}
				}
			}
			return min_value;
		}
	}
}

//Obs: Just realised I could simply get next input box in the DOM tree
//Next non readonly square folowing patratica
function GetNextSquare(patratica){
	if (!patratica){
		coloana=-1;linie=0;
	}else{
		var coloana = patratica.attr('id').charAt(1);
		var linie = patratica.attr('id').charAt(2);
	}
	do{
		coloana++;
		if (coloana==9) {
			coloana = 0;
			linie++;
		}
		if (linie==9) return null;
		else patratica = $('#f'+coloana+linie);
	}while (patratica.is('[readonly]'))
	return patratica;
}

//previous non readonly square folowing patratica
//Obs: the observation on the above function applies to this one, too
function GetPreviousSquare(patratica){
	if (!patratica) return null;
	var coloana = patratica.attr('id').charAt(1);
	var linie = patratica.attr('id').charAt(2);	
	do{
		coloana--;
		if (coloana==-1){
			coloana = 8;
			linie--;
		}
		if (linie>=0) {
			patratica=$('#f'+coloana+linie);
		}else return null;
	}while(patratica.is('[readonly]'))
	return patratica;
}

//Main backtracking algorithm
function CompleteazaPrinBackTracking(){
	var patratica = GetNextSquare(null);
	start = new Date().getTime();
	var timer = setInterval(Cicle,0); //executes one cicle and than yields control to the browser for user input processing
	
	//one cicle function
	function Cicle(){
		//classic backtracking
		while (true){
			//executes for maximum 40 miliseconds so that user experience is not worsened (25 frames / second)
			now = new Date().getTime();
			if (now-start>40){
				start = now;return;
			}
			if (valoare = GetNextValue(patratica)){
				patratica.val(valoare);
				if (patratica.attr('id')=='f88'){
					clearInterval(timer);//just processed last square - work done
					return;
				}
				patratica = GetNextSquare(patratica);
			}else{
				patratica.val('');
				patratica = GetPreviousSquare(patratica);
			}
		}
	}
}

$(function(){
		//check for the right frame
		if ($('#f00').length === 0) return;
		
		$('head').prepend('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />');
		$('body').append('<div id="sudokuSolverDialog" title="Web Sudoku Solver"></div>'); //Dialog window
		$('#sudokuSolverDialog').dialog();
		
		$('#sudokuSolverDialog').append('<button id="cycle_var">Cicleaza!</button>'); //Cicleaza button
		$('#cycle_var').click(cicleaza);
		
		//Taie
		for(var i=1;i<=9;i++){
			$('#sudokuSolverDialog').append('<button id="taie_' + i + '">Taie ' + i + '!</button>');
			$('#taie_' + i).click(CompleteazaPrinTaiere(i));
		}
		
		$('#sudokuSolverDialog').append('<button id="backtrack">BackTrack!</button>'); //Backtrack button
		$('#backtrack').click(CompleteazaPrinBackTracking);		
})
