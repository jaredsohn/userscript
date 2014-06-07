// ==UserScript==
// @name           jubegraph new table
// @namespace      s
// @include        http://jubegraph.dyndns.org/jubeat_knit/user/*/*
// @match 	   http://jubegraph.dyndns.org/jubeat_knit/user/*/*
// ==/UserScript==

(function(){
	var DATAObject = new Object;

	function setTable(res){
		var outer = document.getElementById('outerVar');
		var deleted = document.getElementById('innerTable');


		var newNode = document.createElement('table');
		newNode.setAttribute('align','center');
		newNode.setAttribute('border',"1");
		newNode.setAttribute('id','innerTable');
		newNode.setAttribute('cellpadding',"0");

		for(var i = 0 ; i < DATAObject.row ; i++){
			var row = document.createElement("tr");

			for(var s = 0 ; s < DATAObject.col ; s++){
				var cell = document.createElement("td");
				var cellText = document.createTextNode(res[i][s]);
				cell.appendChild(cellText);
				switch(s){
					case 0:
					case 11:
						cell.setAttribute('align','center');
						break;

					case 1:
						cell.style.backgroundColor = "#AAFFAA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;

					case 2:
						cell.style.backgroundColor = "#B8FFAA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;

					case 3:
						cell.style.backgroundColor = "#C6FFAA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;

					case 4:
						cell.style.backgroundColor = "#D4FFAA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;

					case 5:
						cell.style.backgroundColor = "#E2FFAA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;

					case 6:
						cell.style.backgroundColor = "#E7F1AA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;

					case 7:
						cell.style.backgroundColor = "#ECE3AA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;

					case 8:
						cell.style.backgroundColor = "#F1D5AA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;

					case 9:
						cell.style.backgroundColor = "#F6C7AA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;

					case 10:
						cell.style.backgroundColor = "#FFAAAA";
						cell.style.width = "56";
						cell.setAttribute('align','center');
						break;
				}
				row.appendChild(cell);			
			}
			newNode.appendChild(row);
		}
		outer.replaceChild(newNode,deleted);
	}



	function createLinks(func,name){
		var link = document.createElement('a');
		link.setAttribute('href','javascript:void(0)');
		link.addEventListener("click",func,false);
		var linkText = document.createTextNode(name);
		link.appendChild(linkText);
		return link;
	}

	function setTableALL()
	{
		setTable(DATAObject.ALL);
	}
	function setTableBSC()
	{
		if(DATAObject.BSC){
			setTable(DATAObject.BSC);
		}
	}
	function setTableADV()
	{
		if(DATAObject.ADV){
			setTable(DATAObject.ADV);
		}
	}
	function setTableEXT()
	{
		if(DATAObject.EXT){
			setTable(DATAObject.EXT);
		}
	}

	function createArray(){
		var ret= new Array(DATAObject.row);
		for(var i = 0 ; i < ret.length ; i++)
		{
			ret[i] = new Array(DATAObject.col);
			for(var s = 0 ; s < ret[i].length ; s++)
			{
				ret[i][s] = 0;
			}
		}

		ret[0][0] = "";
		ret[0][1] = "Lv.1";
		ret[0][2] = "Lv.2";
		ret[0][3] = "Lv.3";
		ret[0][4] = "Lv.4";
		ret[0][5] = "Lv.5";
		ret[0][6] = "Lv.6";
		ret[0][7] = "Lv.7";
		ret[0][8] = "Lv.8";
		ret[0][9] = "Lv.9";
		ret[0][10] = "Lv.10";
		ret[0][11] = "SUM";

		ret[1][0] = "SUM";
		ret[2][0] = "EXC";
		ret[3][0] = "SSS";
		ret[4][0] = "SS";
		ret[5][0] = "S";
		ret[6][0] = "A";
		ret[7][0] = "B";
		ret[8][0] = "C";
		ret[9][0] = "D/E/noplay";
		ret[10][0] = "AVE";

		ret[11][0] = "";
		ret[11][1] = "Lv.1";
		ret[11][2] = "Lv.2";
		ret[11][3] = "Lv.3";
		ret[11][4] = "Lv.4";
		ret[11][5] = "Lv.5";
		ret[11][6] = "Lv.6";
		ret[11][7] = "Lv.7";
		ret[11][8] = "Lv.8";
		ret[11][9] = "Lv.9";
		ret[11][10] = "Lv.10";
		ret[11][11] = "SUM";



		return ret;
	}

	function calcSum(ret){
		ret[1][11] = ret[1][1] + ret[1][2] + ret[1][3] + ret[1][4] + ret[1][5] + ret[1][6] + ret[1][7] + ret[1][8] + ret[1][9] + ret[1][10];
		for(var i = 1 ; i < 12 ; i++)
		{
			if(ret[1][i] == 0) continue;
			ret[10][i] = Math.round(ret[10][i] / (ret[1][i] - ret[9][i]));
		}
	}

	function parseRANK(rank){
		switch(rank){
			case "EXC":
				return 2;
				break;
			case "SSS":
				return 3;
				break;
			case "SS":
				return 4;
				break;
			case "S":
				return 5;
				break;
			case "A":
				return 6;
				break;
			case "B":
				return 7;
				break;
			case "C":
				return 8;
				break;
			default:
				return 9;
				break;
		}
	}


	function parse(){
		var tables = document.getElementsByTagName("table")
			var ces = tables[tables.length - 1].getElementsByClassName("ce");
		var before = null;
		var center = null;

		var b_rank,b_level,a_rank,a_level,e_rank,e_level;

		var flag = false;

		DATAObject.BSC = createArray();
		DATAObject.ADV = createArray();
		DATAObject.EXT = createArray();
		DATAObject.ALL = createArray();

		for(var i = 0 ; i < ces.length ; i++){
			if(before == null)
			{
				before = ces[i];
				continue;
			}
			if(center == null)
			{
				center = ces[i];
				continue;
			}

			//process
			var btds = before.getElementsByTagName("td");
			var ctds = ces[i].getElementsByTagName("td");


			//BSC
			b_score = parseInt(btds[1].innerHTML);
			b_rank = parseRANK(btds[2].innerHTML);
			b_level = parseInt(ctds[1].innerHTML.replace("Lv ",""));

			if(b_rank == 2)
			{
				DATAObject.BSC[b_rank][b_level] += 1;
				DATAObject.BSC[b_rank][11] += 1;
				DATAObject.ALL[b_rank][b_level] += 1;
				DATAObject.ALL[b_rank][11] += 1;
				b_rank = 3;
			}

			DATAObject.BSC[b_rank][b_level] += 1;
			DATAObject.BSC[b_rank][11] += 1;
			DATAObject.BSC[1][b_level] += 1;
			DATAObject.BSC[10][b_level] += b_score;
			DATAObject.BSC[10][11] += b_score;

			DATAObject.ALL[b_rank][b_level] += 1;
			DATAObject.ALL[b_rank][11] += 1;
			DATAObject.ALL[1][b_level] += 1;
			DATAObject.ALL[10][b_level] += b_score;
			DATAObject.ALL[10][11] += b_score;

			//ADV
			a_score = parseInt(btds[3].innerHTML);
			a_rank = parseRANK(btds[4].innerHTML);
			a_level = parseInt(ctds[3].innerHTML.replace("Lv ",""));

			if(a_rank == 2)
			{
				DATAObject.ADV[a_rank][a_level] += 1;
				DATAObject.ADV[a_rank][11] += 1;
				DATAObject.ALL[a_rank][a_level] += 1;
				DATAObject.ALL[a_rank][11] += 1;
				a_rank = 3;
			}

			DATAObject.ADV[a_rank][a_level] += 1;
			DATAObject.ADV[a_rank][11] += 1;
			DATAObject.ADV[1][a_level] += 1;
			DATAObject.ADV[10][a_level] += a_score;
			DATAObject.ADV[10][11] += a_score;

			DATAObject.ALL[a_rank][a_level] += 1;
			DATAObject.ALL[a_rank][11] += 1;
			DATAObject.ALL[1][a_level] += 1;
			DATAObject.ALL[10][a_level] += a_score;
			DATAObject.ALL[10][11] += a_score;

			//EXT
			e_score = parseInt(btds[5].innerHTML);
			e_rank = parseRANK(btds[6].innerHTML);
			e_level = parseInt(ctds[5].innerHTML.replace("Lv ",""));

			if(e_rank == 2)
			{
				DATAObject.EXT[e_rank][e_level] += 1;
				DATAObject.EXT[e_rank][11] += 1;
				DATAObject.ALL[e_rank][e_level] += 1;
				DATAObject.ALL[e_rank][11] += 1;
				e_rank = 3;
			}

			DATAObject.EXT[e_rank][e_level] += 1;
			DATAObject.EXT[e_rank][11] += 1;
			DATAObject.EXT[1][e_level] += 1;
			DATAObject.EXT[10][e_level] += e_score;
			DATAObject.EXT[10][11] += e_score;

			DATAObject.ALL[e_rank][e_level] += 1;
			DATAObject.ALL[e_rank][11] += 1;
			DATAObject.ALL[1][e_level] += 1;
			DATAObject.ALL[10][e_level] += e_score;
			DATAObject.ALL[10][11] += e_score;

			before = null;
			center = null;
		}

		calcSum(DATAObject.BSC);
		calcSum(DATAObject.ADV);
		calcSum(DATAObject.EXT);
		calcSum(DATAObject.ALL);
	}


	function init(){
		DATAObject.row = 12;
		DATAObject.col = 12;

		var tables = document.getElementsByTagName("table");
		if(tables.length > 2)
		{
			parse();
			var brNode = document.createElement('br');
			var outerVarNode = document.createElement('div');
			outerVarNode.setAttribute('id','outerVar');

			var tmpText = document.createTextNode("Now loading..");
			var tmpNode = document.createElement('div');
			tmpNode.setAttribute('id','innerTable');
			tmpNode.appendChild(tmpText);
			outerVarNode.appendChild(tmpNode);



			var linkDiv = document.createElement('div');
			linkDiv.setAttribute('align','center');

			linkDiv.appendChild(createLinks(setTableALL,"ALL"));
			var slashText = document.createTextNode(" / ");
			linkDiv.appendChild(slashText);
			linkDiv.appendChild(createLinks(setTableBSC,"BSC"));
			var slashText = document.createTextNode(" / ");
			linkDiv.appendChild(slashText);
			linkDiv.appendChild(createLinks(setTableADV,"ADV"));
			var slashText = document.createTextNode(" / ");
			linkDiv.appendChild(slashText);



			linkDiv.appendChild(createLinks(setTableEXT,"EXT"));

			var oldTable = tables[2];
			oldTable.parentNode.insertBefore(linkDiv,oldTable);
			oldTable.parentNode.insertBefore(outerVarNode,oldTable);
			oldTable.parentNode.insertBefore(brNode,oldTable);

			setTable(DATAObject.ALL);
		}
	}

	window.addEventListener("load",init,false);
})();

