// ==UserScript==
// @name           EmployeeRecap
// @namespace      EmployeeRecap
// @description    Instant Absence Recap - FY 08-1 @ 2010
// @include        http://employee.binus.edu/Attendance/AttendanceRecap.aspx
// @include        http://employee.binus.edu/Attendance/AttendanceRecapPerPegawai.aspx
// ==/UserScript==

var maxNIM = 20;
var s = document.evaluate("//input[@class='Button01']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if(document.location=="http://employee.binus.edu/Attendance/AttendanceRecap.aspx" && s.snapshotItem(1)!=null)
{
	if(GM_getValue("listNIM")!=null && GM_getValue("listNIM")!="")
	{
		var btnSearch = document.getElementById("ctl00_ContentPlaceHolder1_DatePicker1_txtYear");
		var divText = document.createElement('div');
		divText.innerHTML = "<br />Processing data... Please wait...&nbsp;&nbsp;";
		var btnStop = document.createElement('input');
		btnStop.type = "button";
		btnStop.value = "Stop Recap";
		divText.appendChild(btnStop);

		btnSearch.parentNode.appendChild(divText);
	
		var s = document.evaluate("//input[@class='Button01']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var validNIM = 0;
		for(var i=1;i<s.snapshotLength;i++){
			var element = s.snapshotItem(i);
			var nim = element.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML.trim();
			if(nim==GM_getValue("listNIM").split("#")[0]){
				validNIM = 1;
				element.click();
			}
		}
		
		if(validNIM==0) {
			alert("Invalid NIM (" + GM_getValue("listNIM").split("#")[0] + ")... System will remove NIM and stop recap...");

			var errorNIM = GM_getValue("listNIM").split("#")[0];
			
			var arrayNIM = GM_getValue("allNIM");
			var index = arrayNIM.indexOf(GM_getValue("listNIM").split("#")[0]);
			var newNIM = "";
			for(var i=0;i<arrayNIM.length;i++)
			{
				if(i+1<arrayNIM.length && i+1==index) i+=10;
				else newNIM += arrayNIM.charAt(i);
			}
			
			GM_setValue("allNIM",newNIM);

			for each(dataGM in GM_listValues()) if(dataGM!="allNIM") GM_deleteValue(dataGM);

			location.href = "http://employee.binus.edu/Attendance/AttendanceRecap.aspx";
		}
		
		btnStop.addEventListener("click",function() {
			for each(dataGM in GM_listValues())
				if(dataGM!="allNIM") GM_deleteValue(dataGM);
			
			location.href = "http://employee.binus.edu/Attendance/AttendanceRecap.aspx";
		},false);
	}
	else
	{
		var btnSearch = document.getElementById("ctl00_ContentPlaceHolder1_DatePicker1_txtYear");
		
		var divRecap = document.createElement('div');
		var divButton = document.createElement('div');
		var listRecap = document.createElement('select');
		listRecap.name = "listRecap";
		listRecap.size = "10";

		var dataAllNIM = GM_getValue("allNIM");
		
		if(dataAllNIM==null || dataAllNIM=="")
		{
			var optionRecap = document.createElement('option');
			optionRecap.text = "Insert NIM";
			optionRecap.value = "Insert NIM";
			listRecap.add(optionRecap,null);
		}
		else
		{
			for(var i=0;i<dataAllNIM.split("#").length;i++)
			{
				for(var j=1;j<s.snapshotLength;j++){
					var element = s.snapshotItem(j);
					var nim = element.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML.trim();
					if(nim==dataAllNIM.split("#")[i]){
						var optionRecap = document.createElement('option');
						optionRecap.text = dataAllNIM.split("#")[i];
						optionRecap.value = dataAllNIM.split("#")[i];
						listRecap.add(optionRecap,null);
						break;
					}
				}
			}
			
			if(GM_getValue("allNIM")!=null) GM_setValue("allNIM","");				
			GM_setValue("allNIM",listRecap.options[0].value);
			for(var i=1;i<listRecap.length;i++) GM_setValue("allNIM", GM_getValue("allNIM") + "#" + listRecap.options[i].value);
		}
		var getBtn = document.createElement('input');
		getBtn.type = "button";
		getBtn.value = "Recap All";

		divRecap.innerHTML = "&nbsp;&nbsp;";
		
		var divList = document.createElement('div');
		divRecap.appendChild(divList);
		var divFloatList = document.createElement('div');
		divFloatList.setAttribute("style","float:left;");
		divList.appendChild(divFloatList);
		divFloatList.appendChild(listRecap);
		
		var divFloatButton = document.createElement('div');
		divFloatButton.setAttribute("style","float: none; padding-top: 50px; padding-bottom: 50px;");
		divList.appendChild(divFloatButton);
		var divFloatUp = document.createElement('div');
		divFloatUp.innerHTML = "&nbsp;&nbsp;";
		divFloatButton.appendChild(divFloatUp);
		var upBtn = document.createElement('input');
		upBtn.type = "button";
		upBtn.value = "Up";
		upBtn.setAttribute("style","width:50px;");
		divFloatUp.appendChild(upBtn);
		
		var divFloatDown = document.createElement('div');
		divFloatDown.innerHTML = "&nbsp;&nbsp;";
		divFloatButton.appendChild(divFloatDown);
		var downBtn = document.createElement('input');
		downBtn.type = "button";
		downBtn.value = "Down";
		downBtn.setAttribute("style","width:50px;");
		divFloatDown.appendChild(downBtn);
		
		divButton.innerHTML = "&nbsp;&nbsp;";
		divButton.appendChild(getBtn);

		var deleteBtn = document.createElement('input');
		deleteBtn.type = "button";
		deleteBtn.value = "Delete";
		divButton.appendChild(deleteBtn);

		var tableRecap = document.createElement('table');
		var tr1 = document.createElement('tr');
		var td1 = document.createElement('td');
		tableRecap.appendChild(tr1);
		tr1.appendChild(td1);
		td1.appendChild(divRecap);
		td1.appendChild(divButton);

		var divInput = document.createElement('div');
		var inputRecap = document.createElement('input');
		inputRecap.type = "text";
		inputRecap.setAttribute("maxLength",10);
		divInput.innerHTML = "<br />";
		divInput.appendChild(inputRecap);

		var td2 = document.createElement('td');
		tr1.appendChild(td2);
		td2.appendChild(divInput);

		var divAdd = document.createElement('div');
		var addBtn = document.createElement('input');
		addBtn.type = "button";
		addBtn.value = "Add";
		divAdd.appendChild(addBtn);

		td2.appendChild(divAdd);

		btnSearch.parentNode.appendChild(tableRecap);

		getBtn.addEventListener("click",function() {
			if(listRecap.options[0].value!="Insert NIM")
			{
				if(GM_getValue("listNIM")!=null) GM_setValue("listNIM","");				
				GM_setValue("listNIM",listRecap.options[0].value);
				for(var i=1;i<listRecap.length;i++) GM_setValue("listNIM", GM_getValue("listNIM") + "#" + listRecap.options[i].value);
				
				GM_setValue("allNIM",GM_getValue("listNIM"));
				
				var validNIM = 0;
				for(var i=1;i<s.snapshotLength;i++){
					var element = s.snapshotItem(i);
					var nim = element.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML.trim();
					if(nim==GM_getValue("listNIM").split("#")[0]){
						validNIM = 1;
						element.click();
						break;
					}
				}
				
				if(validNIM==0) {
					alert("Invalid NIM (" + GM_getValue("listNIM").split("#")[0] + ")... System will remove NIM and stop recap...");
					
					listRecap.remove(0);

					if(listRecap.length==0) {
						var optionRecap = document.createElement('option');
						optionRecap.text = "Insert NIM";
						optionRecap.value = "Insert NIM";
						listRecap.add(optionRecap,null);

						GM_setValue("allNIM","");
					}

					listRecap.selectedIndex = 0;

					if(GM_getValue("allNIM")!=null) GM_setValue("allNIM","");				
					GM_setValue("allNIM",listRecap.options[0].value);
					for(var i=1;i<listRecap.length;i++) GM_setValue("allNIM", GM_getValue("allNIM") + "#" + listRecap.options[i].value);					
					
					for each(dataGM in GM_listValues()) if(dataGM!="allNIM") GM_deleteValue(dataGM);
					
				}
			}
			else
				alert("Please insert NIM");
		},false);
		
		upBtn.addEventListener("click",function() {
			var selectedIndex = listRecap.selectedIndex;
			if(selectedIndex!=-1 && selectedIndex!=0) {
				var valueTemp = listRecap.options[selectedIndex].value;
				listRecap.options[selectedIndex].text = listRecap.options[selectedIndex-1].text;
				listRecap.options[selectedIndex].value = listRecap.options[selectedIndex-1].value;
				listRecap.options[selectedIndex-1].text = valueTemp;
				listRecap.options[selectedIndex-1].value = valueTemp;
				
				listRecap.selectedIndex = listRecap.selectedIndex-1;
				
				if(GM_getValue("allNIM")!=null) GM_setValue("allNIM","");				
				GM_setValue("allNIM",listRecap.options[0].value);
				for(var i=1;i<listRecap.length;i++) GM_setValue("allNIM", GM_getValue("allNIM") + "#" + listRecap.options[i].value);
			}
		},false);
		
		downBtn.addEventListener("click",function() {
			var selectedIndex = listRecap.selectedIndex;
			if(selectedIndex!=-1 && selectedIndex!=listRecap.length-1) {
				var valueTemp = listRecap.options[selectedIndex].value;
				listRecap.options[selectedIndex].text = listRecap.options[selectedIndex+1].text;
				listRecap.options[selectedIndex].value = listRecap.options[selectedIndex+1].value;
				listRecap.options[selectedIndex+1].text = valueTemp;
				listRecap.options[selectedIndex+1].value = valueTemp;
				
				listRecap.selectedIndex = listRecap.selectedIndex+1;
				
				if(GM_getValue("allNIM")!=null) GM_setValue("allNIM","");				
				GM_setValue("allNIM",listRecap.options[0].value);
				for(var i=1;i<listRecap.length;i++) GM_setValue("allNIM", GM_getValue("allNIM") + "#" + listRecap.options[i].value);
			}
		},false);

		addBtn.addEventListener("click",function(){
			if(inputRecap.value=="") alert("Please insert NIM");
			else if(isNaN(inputRecap.value)) alert("NIM must be numeric");
			else if(inputRecap.value.length!=10) alert("NIM must be 10 characters");
			else if(listRecap.length==maxNIM) alert("You may insert max " + maxNIM + " NIM");
			else
			{
				for each(NIMinList in listRecap.options)
				{
					if(NIMinList.value==inputRecap.value)
					{
						alert("NIM is already inserted");
						return;
					}
				}
				
				for(var i=1;i<s.snapshotLength;i++){
					var element = s.snapshotItem(i);
					var nim = element.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML.trim();
					if(nim==inputRecap.value){
						if(listRecap.options[0].value=="Insert NIM") listRecap.remove(0);
										
						var option = document.createElement('option');
						option.text = inputRecap.value;
						option.value = inputRecap.value;
						listRecap.add(option,null);
						inputRecap.value = "";
						
						if(GM_getValue("allNIM")!=null) GM_setValue("allNIM","");				
						GM_setValue("allNIM",listRecap.options[0].value);
						for(var i=1;i<listRecap.length;i++) GM_setValue("allNIM", GM_getValue("allNIM") + "#" + listRecap.options[i].value);
						
						return;
					}
				}
				alert("Cannot find the NIM");
			}
		},false);

		deleteBtn.addEventListener("click",function(){
			if(listRecap.options[listRecap.selectedIndex].value!="Insert NIM")
			{
				listRecap.remove(listRecap.selectedIndex);
				
				if(listRecap.length==0) {
					var optionRecap = document.createElement('option');
					optionRecap.text = "Insert NIM";
					optionRecap.value = "Insert NIM";
					listRecap.add(optionRecap,null);
					
					GM_setValue("allNIM","");
				}
				
				listRecap.selectedIndex = 0;
				
				if(GM_getValue("allNIM")!=null) GM_setValue("allNIM","");				
				GM_setValue("allNIM",listRecap.options[0].value);
				for(var i=1;i<listRecap.length;i++) GM_setValue("allNIM", GM_getValue("allNIM") + "#" + listRecap.options[i].value);
			}
		},false);
	}
}
else if(document.location=="http://employee.binus.edu/Attendance/AttendanceRecapPerPegawai.aspx")
{
	if(GM_getValue("listNIM")!=null && GM_getValue("listNIM")!="")
	{
		//RECAP
		var weekday = new Array;
		var date = new Array;
		var inHour = new Array;
		var outHour = new Array;
		var index = 0;
		
		var dataSpan = document.getElementsByTagName('span');
		
		if(GM_getValue("allName")==null || GM_getValue("allName")=="") GM_setValue("allName",dataSpan[2].innerHTML.trim());
		else GM_setValue("allName",GM_getValue("allName") + "#" + dataSpan[2].innerHTML.trim());
		
		for(var i=4;i<dataSpan.length-10;i+=10)
		{
			if(index!=0 && weekday[index-1]==dataSpan[i].innerHTML.trim())
			{
				//Update inHour outHour
				if(outHour[index-1]=="00:00:00")
				{
					for(var j=0;j<3;j++){
						var parse = new Array;
						parse[0] = inHour[index-1].split(":")[j];
						parse[1] = outHour[index-1].split(":")[j];

						for(var k=0;k<2;k++)
						{
							if(parse[k]=="08") parse[k] = 8;
							else if(parse[k]=="09") parse[k] = 9;
							else parse[k] = parseInt(parse[k]);
						}

						if( parse[0] > parse[1] ) {
							outHour[index-1] = inHour[index-1];
							break;
						}
						else if( parse[0] < parse[1] ) break;
					}
				}

				for(var j=0;j<3;j++){
					var parse = new Array;
					parse[0] = dataSpan[i+3].innerHTML.trim().split(":")[j];
					parse[1] = inHour[index-1].split(":")[j];

					for(var k=0;k<2;k++)
					{
						if(parse[k]=="08") parse[k] = 8;
						else if(parse[k]=="09") parse[k] = 9;
						else parse[k] = parseInt(parse[k]);
					}

					if( parse[0] < parse[1] ) {
						inHour[index-1] = dataSpan[i+3].innerHTML.trim();
						break;
					}
					else if( parse[0] > parse[1] ) break;
				}

				if(dataSpan[i+4].innerHTML.trim().split(":")[j]=="")
				{
					for(var j=0;j<3;j++){
						var parse = new Array;
						parse[0] = dataSpan[i+3].innerHTML.trim().split(":")[j];
						parse[1] = outHour[index-1].split(":")[j];

						for(var k=0;k<2;k++)
						{
							if(parse[k]=="08") parse[k] = 8;
							else if(parse[k]=="09") parse[k] = 9;
							else parse[k] = parseInt(parse[k]);
						}

						if( parse[0] > parse[1] ) {
							outHour[index-1] = dataSpan[i+3].innerHTML.trim();
							break;
						}
						else if( parse[0] < parse[1] ) break;
					}
				}
				else
				{
					for(var j=0;j<3;j++){
						var parse = new Array;
						parse[0] = dataSpan[i+4].innerHTML.trim().split(":")[j];
						parse[1] = outHour[index-1].split(":")[j];

						for(var k=0;k<2;k++)
						{
							if(parse[k]=="08") parse[k] = 8;
							else if(parse[k]=="09") parse[k] = 9;
							else parse[k] = parseInt(parse[k]);
						}

						if( parse[0] > parse[1] ) {
							outHour[index-1] = dataSpan[i+4].innerHTML.trim();
							break;
						}
						else if( parse[0] < parse[1] ) break;
					}
				}
			}
			else
			{
				weekday[index] = dataSpan[i].innerHTML.trim();
				date[index] = dataSpan[i+1].innerHTML.trim();
				inHour[index] = dataSpan[i+3].innerHTML.trim();
				outHour[index] = dataSpan[i+4].innerHTML.trim();

				if(inHour[index]==":  :" || inHour[index]=="") inHour[index] = "00:00:00";
				if(outHour[index]==":  :" || outHour[index]=="") outHour[index] = "00:00:00";

				index++;
			}
		}
		
		var data = GM_getValue("listNIM");
		var dataPiece = data.split("#");
		data = dataPiece[1];
		for(var i=2;i<dataPiece.length;i++) data += "#" + dataPiece[i];
		
		GM_setValue(dataPiece[0] + "Weekday",weekday[0]);
		GM_setValue(dataPiece[0] + "Date",date[0]);
		GM_setValue(dataPiece[0] + "InHour",inHour[0]);
		GM_setValue(dataPiece[0] + "OutHour",outHour[0]);
		
		for(var i=1;i<weekday.length;i++)
		{
			GM_setValue(dataPiece[0] + "Weekday",GM_getValue(dataPiece[0] + "Weekday") + "#" + weekday[i]);
			GM_setValue(dataPiece[0] + "Date",GM_getValue(dataPiece[0] + "Date") + "#" + date[i]);
			GM_setValue(dataPiece[0] + "InHour",GM_getValue(dataPiece[0] + "InHour") + "#" + inHour[i]);
			GM_setValue(dataPiece[0] + "OutHour",GM_getValue(dataPiece[0] + "OutHour") + "#" + outHour[i]);
		}
		
		if(data==null) GM_setValue("listNIM","");
		else GM_setValue("listNIM",data);
		
		if(data==null) {
			var dataNIM = GM_getValue("allNIM");
			var allNIM = dataNIM.split("#");
			
			var dataName = GM_getValue("allName");
			var allName = dataName.split("#");
			
			var tableMain = document.createElement('table');
			var trMain1 = document.createElement('tr');
			var tdMain1 = document.createElement('td');
			var tdMain2 = document.createElement('td');
			
			tableMain.appendChild(trMain1);
			trMain1.appendChild(tdMain1);
			trMain1.appendChild(tdMain2);
			
			var tableWeekDate = document.createElement('table');
			tableWeekDate.setAttribute("class","table1");
			tdMain1.appendChild(tableWeekDate);
			
			var trWeekDate = document.createElement('tr');
			var tdWeek = document.createElement('td');
			var tdDate = document.createElement('td');
			tableWeekDate.appendChild(trWeekDate);
			trWeekDate.appendChild(tdWeek);
			trWeekDate.appendChild(tdDate);
			tdWeek.innerHTML = "Day";
			tdWeek.setAttribute("style","height:70px;vertical-align:middle;");
			tdWeek.setAttribute("class","header");
			tdDate.innerHTML = "Date";
			tdDate.setAttribute("style","height:70px;vertical-align:middle;");
			tdDate.setAttribute("class","header");
			
			var dataDateCheck = new Array;
			var dataInHour = new Array;
			var dataOutHour = new Array;
			var dataIndex = new Array;

			var cicle = 0;
			
			for(var i=0;i<allNIM.length;i++)
			{
				dataDateCheck[i] = GM_getValue(allNIM[i] + "Date");
				dataInHour[i] = GM_getValue(allNIM[i] + "InHour");
				dataOutHour[i] = GM_getValue(allNIM[i] + "OutHour");
			}
			
			var datePrint = new Array;
			
			for(var j=0;j<31;j++)
			{
				var weekdayList=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
				
				var trWeekDate = document.createElement('tr');
				if(j%2==0) trWeekDate.setAttribute("class","row0");
				else trWeekDate.setAttribute("class","row1");
				
				var tdWeek = document.createElement('td');
				var tdDate = document.createElement('td');
				tableWeekDate.appendChild(trWeekDate);
				trWeekDate.appendChild(tdWeek);
				trWeekDate.appendChild(tdDate);
				
				var dateGen = new Date(dataDateCheck[0].split("#")[0].split("-")[1] + " " + (j+1) + ", " + dataDateCheck[0].split("#")[0].split("-")[2]);	
				
				if(dateGen.getDate()==1 && cicle==1) break;
				
				cicle = 1;
				if((j+1)<10) datePrint[j] = "0" + (j+1) + "-" + dataDateCheck[0].split("#")[0].split("-")[1] + "-" + dataDateCheck[0].split("#")[0].split("-")[2];
				else datePrint[j] = (j+1) + "-" + dataDateCheck[0].split("#")[0].split("-")[1] + "-" + dataDateCheck[0].split("#")[0].split("-")[2];
				
				tdWeek.innerHTML = weekdayList[dateGen.getDay()];
				tdDate.innerHTML = datePrint[j];
			}

			var divAllRecap = document.createElement('div');
			divAllRecap.setAttribute("style","overflow:auto;width:" + (allNIM.length*206) + "px;");
			tdMain2.appendChild(divAllRecap);
			
			for(var j=0;j<allNIM.length;j++)
			{
				var divTableInOut = document.createElement('div');
				divTableInOut.setAttribute("style","float:left;margin-right:4px");
				
				var tableInOut = document.createElement('table');
				tableInOut.setAttribute("class","table1");
				
				divTableInOut.appendChild(tableInOut);
				divAllRecap.appendChild(divTableInOut);

				var trTitleNIM = document.createElement('tr');
				tableInOut.appendChild(trTitleNIM);
			
				var tdTitleNIM = document.createElement('td');
				tdTitleNIM.setAttribute("colSpan",2);
				tdTitleNIM.innerHTML = allNIM[j] + "<br />" + allName[j];
				tdTitleNIM.setAttribute("style","height:70px;vertical-align:middle;");
				tdTitleNIM.setAttribute("class","header");
				trTitleNIM.appendChild(tdTitleNIM);

				dataIndex[j] = 0;
			
				for(var i=0;i<datePrint.length;i++)
				{
					var trInOut = document.createElement('tr');
					if(i%2==0) trInOut.setAttribute("class","row0");
					else trInOut.setAttribute("class","row1");
					tableInOut.appendChild(trInOut);
				
					var tdInHour = document.createElement('td');
					var tdOutHour = document.createElement('td');
					tdInHour.setAttribute("width",75);
					tdOutHour.setAttribute("width",75);
					trInOut.appendChild(tdInHour);
					trInOut.appendChild(tdOutHour);

					if(dataDateCheck[j].split("#")[dataIndex[j]]==datePrint[i])
					{
						if(dataInHour[j].split("#")[dataIndex[j]]=="00:00:00") tdInHour.innerHTML = "&nbsp;";
						else tdInHour.innerHTML = dataInHour[j].split("#")[dataIndex[j]];
						if(dataOutHour[j].split("#")[dataIndex[j]]=="00:00:00") tdOutHour.innerHTML = "&nbsp;";
						else tdOutHour.innerHTML = dataOutHour[j].split("#")[dataIndex[j]];
						dataIndex[j]++;
					}
					else
					{
						tdInHour.innerHTML = "&nbsp;";
						tdOutHour.innerHTML = "&nbsp;";
					}
				}
			}
			
			var body = document.getElementsByTagName('body')[0];
			body.innerHTML = "<br /><div align='center' style='color:#FFFFFF;font-family:Verdana, Arial, Helvetica, sans-serif;font-size:25px;float:none;'><b>Instant Recap Absence</b></div><br />";
			body.appendChild(tableMain);
			
			var footer = document.createElement('div');
			footer.setAttribute("align","center");
			footer.setAttribute("style","color:#FFFFFF;float:none;");
			footer.innerHTML = "Created by : FY(08-1)&nbsp;&nbsp;&nbsp;&nbsp;Idea and Tester by : ES(09-1)";
			body.appendChild(footer);
			
			for each(dataGM in GM_listValues())
				if(dataGM!="allNIM") GM_deleteValue(dataGM);
		}
		else history.go(-1);
	}
}