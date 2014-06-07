// ==UserScript==
// @name           IronSudoku Enhancer v.02
// @namespace      http://www.thezikes.com/
// @description    Adds extra functionality to IronSudoku
// @include        http://www.ironsudoku.com/
// ==/UserScript==

var debug=true;

function $(id){
	return document.getElementById(id);
}

function testgrid(){
	if(typeof unsafeWindow.master_grid=='undefined'){
		window.setTimeout(testgrid, 100);
	}else{
		init();
	}
}

function init(){
	GM_registerMenuCommand( "Clear the board", clearAll);
	GM_registerMenuCommand( "Clear all pencilmarks", clearPencils);
	GM_registerMenuCommand( "Clear all red pencilmarks", clearRed);
	GM_registerMenuCommand( "Clear all green pencilmarks", clearGreen);
}

window.setTimeout(testgrid, .500);

function clearAll(){
	for(var x=1;x<=9;x++){
		for(var y=1;y<=9;y++){
			if(!unsafeWindow.master_grid[x][y].value>0)	unsafeWindow.ClearSquare(x,y);
		}
	}
}

function clearRed(){
	for(var x=1;x<=9;x++){
		for(var y=1;y<=9;y++){
			for (i=1; i<=9; i++) {
				var val=unsafeWindow.grid[x][y]['mini'][i];
				if(val==-1){
					unsafeWindow.grid[x][y]['mini'][i]=0;
					if ($('r'+x+'c'+y+'n'+i)) $('puzzle').removeChild($('r'+x+'c'+y+'n'+i));
				}
			}
		}
	}
}

function clearGreen(){
	for(var x=1;x<=9;x++){
		for(var y=1;y<=9;y++){
			for (i=1; i<=9; i++) {
				var val=unsafeWindow.grid[x][y]['mini'][i];
				if(val==1){
					unsafeWindow.grid[x][y]['mini'][i]=0;
					if ($('r'+x+'c'+y+'n'+i)) $('puzzle').removeChild($('r'+x+'c'+y+'n'+i));
				}
			}
		}
	}
}

function clearPencils(){
	for(var x=1;x<=9;x++){
		for(var y=1;y<=9;y++){
			for (i=1; i<=9; i++) {
				var val=unsafeWindow.grid[x][y]['mini'][i];
				unsafeWindow.grid[x][y]['mini'][i]=0;
				if ($('r'+x+'c'+y+'n'+i)) $('puzzle').removeChild($('r'+x+'c'+y+'n'+i));
			}
		}
	}
}

unsafeWindow.ModKey=function(e) {
	if (!e) var e = window.event;
	
	if(e.shiftKey && e.ctrlKey) // Row/Col Green
		return 'green'; 
	else if (e.ctrlKey && e.altKey) // Row/Col Red
		return 'red'; 
	else if (e.shiftKey) // Single cell green
		return 'shift'; 
	else if (e.altKey) // Single cell red
		return 'alt'; 
	else
		return false;
}

unsafeWindow.SetNumber=function(r,c,num,mod_key){
	if ($('r'+r+'c'+c+'n'+num)) $('puzzle').removeChild($('r'+r+'c'+c+'n'+num));
	
	if ((mod_key == 'shift' && unsafeWindow.grid[r][c]['mini'][num] == 1) || (mod_key == 'alt' && unsafeWindow.grid[r][c]['mini'][num] == -1)) { // toggle tiny number off
		unsafeWindow.grid[r][c]['mini'][num] = 0;
		unsafeWindow.CloseBigSquare();
	}else if (mod_key == 'shift' || mod_key == 'alt') { // toggle tiny number on
		if (mod_key == 'shift') {
			unsafeWindow.grid[r][c]['mini'][num] = 1;
		}
		else if (mod_key == 'alt') {
			unsafeWindow.grid[r][c]['mini'][num] = -1;
		}
		unsafeWindow.grid[r][c]['value'] = 0;
		$('r'+r+'c'+c).innerHTML = '<img src="/tiles/blank.gif" height="40" width="40" onClick="PopUpSquare('+r+','+c+')" style="cursor:pointer" />';
		unsafeWindow.CreateTinySquare(r,c,num,mod_key);
		unsafeWindow.CloseBigSquare();
	}else if(mod_key == 'red' || mod_key == 'green'){
		var val=0;
		
		if(mod_key == 'green'){val=1}
		if(mod_key == 'red'){val=-1}
		if(confirm('Ok for row, Cancel for column')){ // Current row
			for(var x=1; x<=9; x++){
				if(unsafeWindow.grid[r][x]['value']==0){
					unsafeWindow.grid[r][x]['mini'][num] = val;
					$('r'+r+'c'+x).innerHTML = '<img src="/tiles/blank.gif" height="40" width="40" onClick="PopUpSquare('+r+','+x+')" style="cursor:pointer" />';
					unsafeWindow.CreateTinySquare(r,x,num, val==1 ? 'shift' : 'alt');
				}
			}
		}else{ // Current column
			for(var x=1; x<=9; x++){
				if(unsafeWindow.grid[x][c]['value']==0){
					unsafeWindow.grid[x][c]['mini'][num] = val;
					$('r'+x+'c'+c).innerHTML = '<img src="/tiles/blank.gif" height="40" width="40" onClick="PopUpSquare('+x+','+c+')" style="cursor:pointer" />';
					unsafeWindow.CreateTinySquare(x,c,num, val==1 ? 'shift' : 'alt');
				}
			}
		}
		unsafeWindow.CloseBigSquare();
	}else{
		if (unsafeWindow.grid[r][c]['value'] == num) { // toggle number off
			unsafeWindow.grid[r][c]['value'] = 0;
			$('r'+r+'c'+c).innerHTML = '<img src="/tiles/blank.gif" height="40" width="40" onClick="PopUpSquare('+r+','+c+')" style="cursor:pointer" />';
			unsafeWindow.CloseBigSquare();
		}
		else { // toggle number on
			unsafeWindow.grid[r][c]['value'] = num;
			unsafeWindow.grid[r][c]['mini'][num] = 0;
			$('r'+r+'c'+c).innerHTML = '<img src="/tiles/' + unsafeWindow.tile_type + '/' + num + '.gif" height="40" width="40" onClick="PopUpSquare('+r+','+c+')" style="cursor:pointer" />';
			unsafeWindow.CloseBigSquare();
			unsafeWindow.ClearTinySquares(r,c);
			unsafeWindow.CheckMove(r,c);
			unsafeWindow.CheckPuzzle();

		}
		unsafeWindow.Blink('r'+r+'c'+c,4);
	}
}