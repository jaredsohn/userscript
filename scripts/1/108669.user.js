// Last Updated: 7th August 2011
// Lead Programmer: Waser Lave
//
// ==UserScript==
// @name          Neopets Automatic Krawk Island Recovery
// @namespace     http://www.neocodex.us
// @description   Automatically solves the Island recovery puzzle
// @include       http://www.neopets.com/pirates/disappearance/inside-ship.phtml
// ==/UserScript==

var day = prompt("Which day's puzzle are you on?");

var daySelect = 0;
var sideCells = 0;
var totalCells = 0;
var numTypes = 0;

switch(day)
{
	case "1":
		var cells = [[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]],[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]],[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]],[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]];

		var redCells = [[0,0],[1,0],[0,1],[1,1]];
		var greenCells = [[2,0],[3,0],[2,1],[3,1]];
		var blueCells = [[2,2],[3,2],[2,3],[3,3]];
		var yellowCells = [[0,2],[1,2],[0,3],[1,3]];
		totalCells = 16;
		sideCells = 4;
		daySelect = 1;
		numTypes = 4;
		break;
	case "2":
		var cells = [[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]],[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]],[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]],[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]];

		var redCells = [[0,0],[1,0],[2,0],[2,1]];
		var greenCells = [[1,0],[2,0],[3,0],[1,1]];
		var blueCells = [[2,1],[3,1],[3,2],[3,3]];
		var yellowCells = [[0,3],[1,3],[2,3],[2,2]];
		totalCells = 16;
		sideCells = 4;
		daySelect = 1;
		numTypes = 4;
		break;	
	case "3":
		var cells = [[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]];
		var redCells = [[0,0],[1,0],[2,0],[0,1],[1,1]];
		var greenCells = [[3,0],[4,0],[3,1],[4,1],[4,2]];
		var blueCells = [[2,4],[3,3],[3,4],[4,3],[4,4]];
		var yellowCells = [[0,2],[0,3],[0,4],[1,3],[1,4]];
		var cyanCells = [[1,2],[2,1],[2,2],[2,3],[3,2]];
		totalCells = 25;
		sideCells = 5;
		daySelect = 1;
		numTypes = 5;
		break;
	case "4":
		var cells = [[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]];
		var redCells = [[0,0],[1,0],[2,0],[0,1],[2,1]];
		var greenCells = [[3,0],[4,0],[4,1],[3,2],[4,2]];
		var blueCells = [[2,3],[2,4],[3,4],[4,3],[4,4]];
		var yellowCells = [[0,2],[0,3],[0,4],[1,2],[1,4]];
		var mauveCells = [[1,1],[3,1],[2,2],[1,3],[3,3]];
		totalCells = 25;
		sideCells = 5;
		daySelect = 1;
		numTypes = 5;
		break;
	case "5":
		var cells = [[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]]];
		var redCells = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]];
		var greenCells = [[3,0],[4,0],[5,0],[3,1],[4,1],[5,1]];
		var blueCells = [[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]];
		var yellowCells = [[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]];
		var mauveCells = [[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]];
		var orangeCells = [[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]];
		totalCells = 36;
		sideCells = 6;
		daySelect = 1;
		numTypes = 6;
		break;
	case "6":
		var cells = [[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]],[[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6]]];
		var redCells = [[0,0],[1,0],[0,1],[1,1],[0,2],[0,3]];
		var greenCells = [[2,0],[3,0],[4,0],[5,0],[4,1],[5,1]];
		var blueCells = [[1,2],[1,3],[2,1],[2,2],[3,1],[3,2]];
		var yellowCells = [[0,4],[0,5],[1,4],[1,5],[2,5],[3,5]];
		var mauveCells = [[2,3],[2,4],[3,3],[3,4],[4,2],[4,3]];
		var cyanCells = [[4,4],[4,5],[5,2],[5,3],[5,4],[5,5]];
		totalCells = 36;
		sideCells = 6;
		daySelect = 1;
		numTypes = 6;
		break;
	case "7":
		var cells = [[[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]],[[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]],[[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]],[[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]],[[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]],[[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]],[[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]]];
		var redCells = [[0,0],[1,0],[0,1],[1,1],[2,1],[1,2],[2,2]];
		var greenCells = [[2,0],[3,0],[4,0],[5,0],[3,1],[4,1],[5,1]];
		var blueCells = [[4,4],[4,5],[5,4],[5,5],[5,6],[6,5],[6,6]];
		var yellowCells = [[6,0],[6,1],[6,2],[6,3],[6,4],[5,2],[5,3]];
		var mauveCells = [[2,3],[2,4],[3,2],[3,3],[3,4],[4,2],[4,3]];
		var cyanCells = [[0,2],[0,3],[0,4],[0,5],[0,6],[1,3],[1,4]];
		var orangeCells = [[1,5],[1,6],[2,5],[2,6],[3,5],[3,6],[4,6]];
		totalCells = 49;
		sideCells = 7;
		daySelect = 1;
		numTypes = 7;
		break;
	case "8":
		var cells = Array();		
		
		for (var i=0;i<8;i++)
		{
			var cellsRow = Array();
			for (var j=0;j<8;j++)
			{
				cellsRow.push([1,2,3,4,5,6,7,8]);
			}
			cells.push(cellsRow);
		}
		var redCells = [[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[0,2]];
		var greenCells = [[4,0],[5,0],[6,0],[7,0],[5,1],[6,1],[7,1],[7,2]];
		var blueCells = [[4,7],[5,6],[5,7],[6,6],[6,7],[7,5],[7,6],[7,7]];
		var yellowCells = [[0,5],[0,6],[0,7],[1,6],[1,7],[2,6],[2,7],[3,7]];
		var mauveCells = [[1,2],[2,2],[3,1],[3,2],[4,1],[4,2],[5,2],[6,2]];
		var cyanCells = [[0,3],[0,4],[1,3],[1,4],[2,3],[2,4],[3,3],[4,3]];
		var orangeCells = [[3,4],[4,4],[5,3],[5,4],[6,3],[6,4],[7,3],[7,4]];
		var pinkCells = [[1,5],[2,5],[3,5],[3,6],[4,5],[4,6],[5,5],[6,5]];
		totalCells = 64;
		sideCells = 8;
		daySelect = 1;
		numTypes = 8;	
		break;
	case "9":
		var cells = Array();		
		
		for (var i=0;i<8;i++)
		{
			var cellsRow = Array();
			for (var j=0;j<8;j++)
			{
				cellsRow.push([1,2,3,4,5,6,7,8]);
			}
			cells.push(cellsRow);
		}
		var redCells = [[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[0,2]];
		var greenCells = [[4,0],[5,0],[6,0],[7,0],[5,1],[6,1],[7,1],[7,2]];
		var blueCells = [[4,7],[5,6],[5,7],[6,6],[6,7],[7,5],[7,6],[7,7]];
		var yellowCells = [[0,5],[0,6],[0,7],[1,6],[1,7],[2,6],[2,7],[3,7]];
		var mauveCells = [[1,2],[2,2],[3,1],[3,2],[4,1],[4,2],[5,2],[6,2]];
		var cyanCells = [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4]];
		var orangeCells = [[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3]];
		var pinkCells = [[1,5],[2,5],[3,5],[3,6],[4,5],[4,6],[5,5],[6,5]];
		totalCells = 64;
		sideCells = 8;
		daySelect = 1;
		numTypes = 8;	
		break;
	case "10":
		var cells = Array();		
		
		for (var i=0;i<9;i++)
		{
			var cellsRow = Array();
			for (var j=0;j<9;j++)
			{
				cellsRow.push([1,2,3,4,5,6,7,8,9]);
			}
			cells.push(cellsRow);
		}
		var redCells = [[0,3],[1,3],[2,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]];
		var greenCells = [[6,0],[7,0],[8,0],[6,1],[7,1],[8,1],[6,2],[7,2],[8,2]];
		var blueCells = [[6,6],[7,6],[8,6],[6,7],[7,7],[8,7],[6,8],[7,8],[8,8]];
		var yellowCells = [[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]];
		var mauveCells = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]];
		var cyanCells = [[6,3],[7,3],[8,3],[6,4],[7,4],[8,4],[6,5],[7,5],[8,5]];
		var orangeCells = [[3,6],[4,6],[5,6],[3,7],[4,7],[5,7],[3,8],[4,8],[5,8]];
		var pinkCells = [[3,3],[4,3],[5,3],[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]];
		var beigeCells = [[0,6],[1,6],[2,6],[0,7],[1,7],[2,7],[0,8],[1,8],[2,8]];
		totalCells = 81;
		sideCells = 9;
		daySelect = 1;
		numTypes = 9;	
		break;
	default:
		alert("What have you been smoking? We aren't even up to that day yet...");
		break;
}

function isFilled(seat)
{
	var item = document.evaluate("id('puzzle-seat-"+seat+"')",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);	
	if(item.innerHTML.indexOf("puzzle-character") > -1)
	{
		var patt = new RegExp("puzzle\-character\-([0-9])");
		return patt.exec(item.innerHTML)[1];
	}else{
		return 0;
	}	
}	

function parseStart()
{
	for(var i=1;i<=totalCells;i++)
	{
		var filled = isFilled(i);

		if(filled > 0)
		{
			var row = Math.ceil(i/sideCells)-1;
			var col = ((i)-(((row)*sideCells)))-1;	
			
			for (var j=1;j<=sideCells;j++)
			{
				for (var k=0;k<sideCells;k++)
				{
					if(j!=filled)
					{
						if(cells[col][row][k] == j)
						{
							cells[col][row].splice(k,1);	
						}
					}
				}
			}			
		}
	}
}

function checkCells(cells)
{	
	for (var i=0;i<sideCells;i++)
	{
		for (var j=0;j<sideCells;j++)
		{
			if (cells[i][j].length > 1)
			{
				return 0;
			}
		}
	}
				
	return 1;
}

function parseCells(cells)
{
	var newCells = cells;
	
	for (var i=0;i<sideCells;i++)
	{
		for (var j=0;j<sideCells;j++)
		{
			for (var k=1;k<(numTypes+1);k++)
			{
				if (newCells[i][j].length == 1)
				{
					for (var l=0;l<sideCells;l++)
					{
						for (var m=0;m<sideCells;m++)
						{
							if (i == l || j == m)
							{
								for(var n=0;n<numTypes;n++)
								{		
									if(newCells[l][m][n] == newCells[i][j][0])
									{
										if(newCells[l][m].length > 1)
										{
											newCells[l][m].splice(n,1);
										}
									}				
								}								
							}	
						}
					}									
				}	
			}										
		}
	}	
	
	for (var i=0;i<sideCells;i++)
	{		
		if(newCells[redCells[i][0]][redCells[i][1]].length == 1)
		{
			for (var j=0;j<sideCells;j++)
			{
				if(i != j)
				{
					for(var k=0;k<sideCells;k++)
					{
						if (newCells[redCells[j][0]][redCells[j][1]][k] == newCells[redCells[i][0]][redCells[i][1]][0])
						{
							if(newCells[redCells[j][0]][redCells[j][1]].length > 1)
							{
								newCells[redCells[j][0]][redCells[j][1]].splice(k,1);
							}
						}
					}
				}
			}
		}		
		
		if(newCells[greenCells[i][0]][greenCells[i][1]].length == 1)
		{
			for (var j=0;j<sideCells;j++)
			{
				if(i != j)
				{
					for(var k=0;k<sideCells;k++)
					{
						if (newCells[greenCells[j][0]][greenCells[j][1]][k] == newCells[greenCells[i][0]][greenCells[i][1]][0])
						{
							if(newCells[greenCells[j][0]][greenCells[j][1]].length > 1)
							{
								newCells[greenCells[j][0]][greenCells[j][1]].splice(k,1);
							}
						}
					}
				}
			}
		}		
		
		if(newCells[yellowCells[i][0]][yellowCells[i][1]].length == 1)
		{
			for (var j=0;j<sideCells;j++)
			{
				if(i != j)
				{
					for(var k=0;k<sideCells;k++)
					{
						if (newCells[yellowCells[j][0]][yellowCells[j][1]][k] == newCells[yellowCells[i][0]][yellowCells[i][1]][0])
						{
							if(newCells[yellowCells[j][0]][yellowCells[j][1]].length > 1)
							{
								newCells[yellowCells[j][0]][yellowCells[j][1]].splice(k,1);
							}
						}
					}
				}
			}
		}		

		if(newCells[blueCells[i][0]][blueCells[i][1]].length == 1)
		{
			for (var j=0;j<sideCells;j++)
			{
				if(i != j)
				{
					for(var k=0;k<sideCells;k++) 
					{
						if (newCells[blueCells[j][0]][blueCells[j][1]][k] == newCells[blueCells[i][0]][blueCells[i][1]][0])
						{
							if(newCells[blueCells[j][0]][blueCells[j][1]].length > 1)
							{
								newCells[blueCells[j][0]][blueCells[j][1]].splice(k,1);
							}
						}
					}
				}
			}
		}		
		
		if(day == "3")
		{
			if(newCells[cyanCells[i][0]][cyanCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[cyanCells[j][0]][cyanCells[j][1]][k] == newCells[cyanCells[i][0]][cyanCells[i][1]][0])
							{
								if(newCells[cyanCells[j][0]][cyanCells[j][1]].length > 1)
								{
									newCells[cyanCells[j][0]][cyanCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}			
		}
		
		if(day == "4")
		{
			if(newCells[mauveCells[i][0]][mauveCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[mauveCells[j][0]][mauveCells[j][1]][k] == newCells[mauveCells[i][0]][mauveCells[i][1]][0])
							{
								if(newCells[mauveCells[j][0]][mauveCells[j][1]].length > 1)
								{
									newCells[mauveCells[j][0]][mauveCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}			
		}
		
		if(day == "5")
		{
			if(newCells[mauveCells[i][0]][mauveCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[mauveCells[j][0]][mauveCells[j][1]][k] == newCells[mauveCells[i][0]][mauveCells[i][1]][0])
							{
								if(newCells[mauveCells[j][0]][mauveCells[j][1]].length > 1)
								{
									newCells[mauveCells[j][0]][mauveCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}	
			
			if(newCells[orangeCells[i][0]][orangeCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[orangeCells[j][0]][orangeCells[j][1]][k] == newCells[orangeCells[i][0]][orangeCells[i][1]][0])
							{
								if(newCells[orangeCells[j][0]][orangeCells[j][1]].length > 1)
								{
									newCells[orangeCells[j][0]][orangeCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}			
		}
		
		if(day == "6")
		{
			if(newCells[mauveCells[i][0]][mauveCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[mauveCells[j][0]][mauveCells[j][1]][k] == newCells[mauveCells[i][0]][mauveCells[i][1]][0])
							{
								if(newCells[mauveCells[j][0]][mauveCells[j][1]].length > 1)
								{
									newCells[mauveCells[j][0]][mauveCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}	
			
			if(newCells[cyanCells[i][0]][cyanCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[cyanCells[j][0]][cyanCells[j][1]][k] == newCells[cyanCells[i][0]][cyanCells[i][1]][0])
							{
								if(newCells[cyanCells[j][0]][cyanCells[j][1]].length > 1)
								{
									newCells[cyanCells[j][0]][cyanCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}			
		}
		
		if(day == "7")
		{
			if(newCells[mauveCells[i][0]][mauveCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[mauveCells[j][0]][mauveCells[j][1]][k] == newCells[mauveCells[i][0]][mauveCells[i][1]][0])
							{
								if(newCells[mauveCells[j][0]][mauveCells[j][1]].length > 1)
								{
									newCells[mauveCells[j][0]][mauveCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}	
			
			if(newCells[cyanCells[i][0]][cyanCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[cyanCells[j][0]][cyanCells[j][1]][k] == newCells[cyanCells[i][0]][cyanCells[i][1]][0])
							{
								if(newCells[cyanCells[j][0]][cyanCells[j][1]].length > 1)
								{
									newCells[cyanCells[j][0]][cyanCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}	
			
			if(newCells[orangeCells[i][0]][orangeCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[orangeCells[j][0]][orangeCells[j][1]][k] == newCells[orangeCells[i][0]][orangeCells[i][1]][0])
							{
								if(newCells[orangeCells[j][0]][orangeCells[j][1]].length > 1)
								{
									newCells[orangeCells[j][0]][orangeCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}			
		}
		
		if(day == "8" || day == "9")
		{
			if(newCells[mauveCells[i][0]][mauveCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[mauveCells[j][0]][mauveCells[j][1]][k] == newCells[mauveCells[i][0]][mauveCells[i][1]][0])
							{
								if(newCells[mauveCells[j][0]][mauveCells[j][1]].length > 1)
								{
									newCells[mauveCells[j][0]][mauveCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}	
			
			if(newCells[cyanCells[i][0]][cyanCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[cyanCells[j][0]][cyanCells[j][1]][k] == newCells[cyanCells[i][0]][cyanCells[i][1]][0])
							{
								if(newCells[cyanCells[j][0]][cyanCells[j][1]].length > 1)
								{
									newCells[cyanCells[j][0]][cyanCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}	
			
			if(newCells[orangeCells[i][0]][orangeCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[orangeCells[j][0]][orangeCells[j][1]][k] == newCells[orangeCells[i][0]][orangeCells[i][1]][0])
							{
								if(newCells[orangeCells[j][0]][orangeCells[j][1]].length > 1)
								{
									newCells[orangeCells[j][0]][orangeCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}			
			
			if(newCells[pinkCells[i][0]][pinkCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[pinkCells[j][0]][pinkCells[j][1]][k] == newCells[pinkCells[i][0]][pinkCells[i][1]][0])
							{
								if(newCells[pinkCells[j][0]][pinkCells[j][1]].length > 1)
								{
									newCells[pinkCells[j][0]][pinkCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}		
		}
		
		if (day == "10")
		{
			if(newCells[mauveCells[i][0]][mauveCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[mauveCells[j][0]][mauveCells[j][1]][k] == newCells[mauveCells[i][0]][mauveCells[i][1]][0])
							{
								if(newCells[mauveCells[j][0]][mauveCells[j][1]].length > 1)
								{
									newCells[mauveCells[j][0]][mauveCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}	
			
			if(newCells[cyanCells[i][0]][cyanCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[cyanCells[j][0]][cyanCells[j][1]][k] == newCells[cyanCells[i][0]][cyanCells[i][1]][0])
							{
								if(newCells[cyanCells[j][0]][cyanCells[j][1]].length > 1)
								{
									newCells[cyanCells[j][0]][cyanCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}	
			
			if(newCells[orangeCells[i][0]][orangeCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[orangeCells[j][0]][orangeCells[j][1]][k] == newCells[orangeCells[i][0]][orangeCells[i][1]][0])
							{
								if(newCells[orangeCells[j][0]][orangeCells[j][1]].length > 1)
								{
									newCells[orangeCells[j][0]][orangeCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}			
			
			if(newCells[pinkCells[i][0]][pinkCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[pinkCells[j][0]][pinkCells[j][1]][k] == newCells[pinkCells[i][0]][pinkCells[i][1]][0])
							{
								if(newCells[pinkCells[j][0]][pinkCells[j][1]].length > 1)
								{
									newCells[pinkCells[j][0]][pinkCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}		
			
			if(newCells[beigeCells[i][0]][beigeCells[i][1]].length == 1)
			{
				for (var j=0;j<sideCells;j++)
				{
					if(i != j)
					{
						for(var k=0;k<sideCells;k++) 
						{
							if (newCells[beigeCells[j][0]][beigeCells[j][1]][k] == newCells[beigeCells[i][0]][beigeCells[i][1]][0])
							{
								if(newCells[beigeCells[j][0]][beigeCells[j][1]].length > 1)
								{
									newCells[beigeCells[j][0]][beigeCells[j][1]].splice(k,1);
								}
							}
						}
					}
				}
			}		
		}
	}

	return newCells;	
}

if(daySelect == "1")
{
	var count = 0;
	var complete = 1;
	
	parseStart();
	
	while (checkCells(cells) == 0)
	{
		cells = parseCells(cells);
		count = count + 1;
		
		if(count == 20)
		{
			complete = 0;
			break;	
		}
	}

	var completeCheck = 1;
	
	for (var i=0;i<sideCells;i++)
	{
		for (var j=0;j<sideCells;j++)
		{
			if(cells[i][j].length > 1)
			{
				completeCheck = 0;	
			}
		}	
	}
	
	if(complete == 1)
	{
		var count = 1;
	
		var submitForm = document.getElementById("krawk-seats-form");
		
	    var newInput = document.createElement("input");
	    newInput.type="hidden";
	    newInput.name="action";
	    newInput.value="check";
	
	    submitForm.appendChild(newInput);
		
		for (var j=0;j<sideCells;j++)
		{
			for (var i=0;i<sideCells;i++)
			{
	            var newInput = document.createElement("input");
	            newInput.type="hidden";
	            newInput.name="coord["+count+"]";
	            newInput.value=cells[i][j];
	  
	            submitForm.appendChild(newInput);
				count = count + 1;
			}	
		}
		if(completeCheck == 0)
		{
			alert("Might not have been able to complete puzzle but did some of it, you can complete it by hand if not... :/");
		}
		submitForm.submit();	
	}else{
		alert("Couldn't solve puzzle at all... :/");
	}
}