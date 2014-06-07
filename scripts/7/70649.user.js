// ==UserScript==
// @name           PlayerLogCHARTGoalies
// @namespace      thenuckman
// @description    Player (Goalie) GameLog Charts ESPN nhl stats
// @include        http://*go.com/nhl/players/gamelog?*
// ==/UserScript==

var allTables = document.body.getElementsByTagName("table");

	for(var j = 0; j < allTables.length; j++)
	{
		if(allTables[j].innerHTML.search(/Game Log/) != -1)
		{
		var games = 0;
		var points = "";	var p_accum=0; var p_accum_str="";
		var maxpoints = 0;
		var assists = ""; var a_accum =0; var a_accum_str="";
		var goals = ""; var g_accum = 0;		var g_accum_str="";
		var month = 7;
		var chm = ""; 	//chart markers
		var chs = "700x150";	//chart size
		var chd = "";	//chart data
		var cht = "";	//chart type
		var chdl = "Goals|Assits|Points";	//chart labels
		var chco = "ff0000,00ff00,0000ff";	//chart colors
		var chartURL = "http://chart.apis.google.com/chart?";
		
			for(var i = (allTables[j].rows.length) -2; i >=0; i--)
			{
				if(allTables[j].rows[i].cells[0].innerHTML.match(/\d{1,2}\/\d{1,2}/))							//if the first column has a date in month/day form
				{
					games++;
					if(month != parseInt(allTables[j].rows[i].cells[0].innerHTML.match(/\d{1,2}/)))				//find the month and see if its same as stored month
					{
						month = parseInt(allTables[j].rows[i].cells[0].innerHTML.match(/\d{1,2}/));				// if not same then store it
						if(chm == "")																			// also set that data spot as a marker for beginning of new month
							{
								chm = chm+"o,000000,0,"+((allTables[j].rows.length-1)-i)+",7,1";
								chm = chm+"|o,000000,1,"+((allTables[j].rows.length-1)-i)+",7,1";
								chm = chm+"|o,000000,2,"+((allTables[j].rows.length-1)-i)+",7,1";
							}
						else
							{
								chm = chm+"|o,000000,0,"+((allTables[j].rows.length-1)-i)+",7,1";
								chm = chm+"|o,000000,1,"+((allTables[j].rows.length-1)-i)+",7,1";
								chm = chm+"|o,000000,2,"+((allTables[j].rows.length-1)-i)+",7,1";
							}
						
					}
					
				if(goals == "")
					{goals = goals+allTables[j].rows[i].cells[12].innerHTML;
					g_accum += parseInt(allTables[j].rows[i].cells[12].innerHTML);
					g_accum_str += g_accum;
					}
				else
					{goals = goals+","+allTables[j].rows[i].cells[12].innerHTML;
					g_accum += parseInt(allTables[j].rows[i].cells[12].innerHTML);
					g_accum_str += ","+g_accum;
					}
				if(assists == "")
					{assists = assists+allTables[j].rows[i].cells[12].innerHTML;
					a_accum += parseInt(allTables[j].rows[i].cells[12].innerHTML);
					a_accum_str += a_accum;
					}
				else
					{assists = assists+","+allTables[j].rows[i].cells[12].innerHTML;
					a_accum += parseInt(allTables[j].rows[i].cells[12].innerHTML);
					a_accum_str += ","+a_accum;
					}
				if(points == "")
					{	
						points = points+allTables[j].rows[i].cells[12].innerHTML;
						p_accum += parseInt(allTables[j].rows[i].cells[12].innerHTML);
						p_accum_str += p_accum;
						if(parseInt(allTables[j].rows[i].cells[12].innerHTML) > maxpoints)
							maxpoints = parseInt(allTables[j].rows[i].cells[12].innerHTML);
					}
				else
					{
						points = points+","+allTables[j].rows[i].cells[12].innerHTML;
						p_accum += parseInt(allTables[j].rows[i].cells[12].innerHTML);
						p_accum_str += ","+p_accum;
						if(parseInt(allTables[j].rows[i].cells[12].innerHTML) > maxpoints)
							maxpoints = parseInt(allTables[j].rows[i].cells[12].innerHTML);
					}
				}
			}
			chd = chd+"t:"+goals+"|"+assists+"|"+points;
			cht = cht+"ls";
			chartURL = chartURL+"&cht="+cht+"&chd="+chd+"&chds=0,"+maxpoints+"&chco="+chco+"&chs="+chs+"&chdl="+chdl+"&chm="+chm+"&chxt=x,y,r,t";		
			allTables[j].insertRow(allTables[j].rows.length);
			allTables[j].insertRow(allTables[j].rows.length);
			allTables[j].rows[allTables[j].rows.length-1].insertCell(0);
			allTables[j].rows[allTables[j].rows.length-2].insertCell(0);
			allTables[j].rows[allTables[j].rows.length-1].cells[0].colSpan = 18;
			allTables[j].rows[allTables[j].rows.length-2].cells[0].colSpan = 18;
			allTables[j].rows[allTables[j].rows.length-2].cells[0].innerHTML = "<img src=\""+chartURL+"\" />";
			
			chd = ""+"t:"+g_accum_str+"|"+a_accum_str+"|"+p_accum_str;
			var chs = "700x428";	//chart size max supported 300k pixels
			chartURL = "http://chart.apis.google.com/chart?"+"&cht="+cht+"&chd="+chd+"&chds=0,"+p_accum+"&chco="+chco+"&chs="+chs+"&chdl="+chdl+"&chm="+chm+"&chxt=x,y,r,t";		
			allTables[j].rows[allTables[j].rows.length-1].cells[0].innerHTML = "<img src=\""+chartURL+"\" />";
			
		}
	}