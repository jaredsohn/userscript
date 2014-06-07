// ==UserScript==
// @name           cltf
// @namespace      test
// @include        https://cusis.cuhk.edu.hk/*
// ==/UserScript==

var place4short = [];
function addPlace4Short(p, p_short)
{
	place4short[p] = p_short;
}
addPlace4Short("Hui Yeung Shing Bldg", "HYS");
addPlace4Short("William M W Mong Eng Bldg", "ERB");
addPlace4Short("Lee Shau Kee Building", "LSK");
addPlace4Short("Mong Man Wai Bldg", "MMW");
addPlace4Short("Chung Chi College Chapel", "CCCC");
addPlace4Short("Chen Kou Bun Bldg", "CKB");
addPlace4Short("Lady Shaw Bldg", "LSB");
addPlace4Short("Ho Tim Building","HTB");
addPlace4Short("Institute of Chinese Studies", "ICS");
addPlace4Short("Shaw College Lecture Theatre", "SWC LT");
addPlace4Short("Sino Building", "SB");
addPlace4Short("T.C. Cheng Building", "UCC");
addPlace4Short("Tsang Shiu Tim Building", "UCA");
addPlace4Short("University Science Centre", "SC");
addPlace4Short("Wen Lan Tang", "WLS");
addPlace4Short("Wong Foo Yuan Building", "FYB");
addPlace4Short("Ho Sin-Hang Engg Bldg", "SHB");
addPlace4Short("Y.C. Liang Hall", "LHC");
addPlace4Short("Sir Run Run Shaw Hall", "SRR");
addPlace4Short("Humanities Building", "NAH");
addPlace4Short("Li Koon Chun Hall", "LKC");
addPlace4Short("Esther Lee Bldg", "ELB");
addPlace4Short("Science Centre", "SC");
addPlace4Short("T.C. Cheng Bldg", "UCC");

var targetTable = document.getElementById('WEEKLY_SCHED_HTMLAREA');

targetTable.cellSpacing = 4;

var targetTableStyle = targetTable.style;
targetTableStyle.tableLayout = 'fixed';
//targetTableStyle.wordWrap = 'break-word';
//targetTableStyle.wordBreak = 'break-all';

var targetRows = targetTable.rows;
var firstRow = targetRows[0];

var ncFixColor = "#79C1F1";
var ncFixFont = "Century Gothic,arial,sans-serif"


function ncFixCourseCode(courseCode)
{
	var parts = courseCode.split(" ");
	return parts[0] + '<br>' + parts[1] + ((parts[3]=='-')?"":parts[3]);
}

function ncFixCoursePlace(coursePlace)
{
	var l = coursePlace.length;
	var bldg = null;
	var room = null;
	for(var i = l-1; i >=0; i--) {
		if(coursePlace.charAt(i) == ' ') {
			bldg = coursePlace.substring(0, i);
			room = coursePlace.substr(i+1);
			break;
		}
	}
	bldg = place4short[bldg];
	return (bldg + " " + room);
}

function ncFixCourseTime(courseTime)
{
	//return courseTime;
	//return null;
}

function ncFixCourseType(courseType)
{
	// return courseType
	//if(courseType == 'Interactive Tutorial') {
	//	return '';
	//}
    //    return content;
	//return null;
}

function ncFixContent(content)
{
	var parts = content.split('<br>');
	
	/* 
	** 0 => course code
	** 1 => course type
	** 2 => course time
	** 3 => course place
	*/
	var courseCode = parts[0];
	var courseType = parts[1];
	var courseTime = parts[2];
	var coursePlace = parts[3];

	// fix each part
	courseCode = ncFixCourseCode(courseCode);
	//courseType = ncFixCourseType(courseType);
	coursePlace = ncFixCoursePlace(coursePlace);
	//courseTime = ncFixCourseTime(courseTime);
	
	
	if(courseType == 'Interactive Tutorial') {
		return "";
	}
	
	var res = courseCode+'<br>'+coursePlace;
	return res;
}

function ncFixFirstRow()
{	
	firstRow.style.height = 30;
	var firstRowChildren = firstRow.childNodes;
	var weekNames = ["", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
	for(var i = 0; i < 8; i++) {
		var currentTH = firstRowChildren[i];
		
		currentTH.style.border = "0px";
		currentTH.style.backgroundColor = "white";
		currentTH.style.color = ncFixColor;
		currentTH.style.fontSize = "30";
		currentTH.style.fontWeight = "normal";
		currentTH.style.fontFamily = ncFixFont;
		
		currentTH.innerHTML = weekNames[i]; // show week only
	}
}

function ncFixCellStyle(cell)
{
	var cellStyle = cell.style;
	var tmp = cell.getAttribute('class');
	if(tmp == 'PSLEVEL3GRID') {
	} else if(tmp == 'SSSWEEKLYBACKGROUND') {
		cellStyle.backgroundColor = ncFixColor;
		
		var cellSpan = cell.firstChild;
		cellSpan.style.color = 'white';
		cellSpan.style.fontSize = '18';
		cellSpan.style.fontWeight = 'normal';
		cellSpan.style.fontFamily = ncFixFont;
	}
	cellStyle.border = "0px";
}

function ncFixOtherRows()
{
	// iteration on each row
	for(var i = 1; i < 11; i++) {
		var currentRow = targetRows[i];
		currentRow.style.height = 60;
		
		/* fix first cell for time */
		var targetTH = currentRow.firstChild;
		var targetSpan = targetTH.firstChild;
		// fix style content
		var currentTime = targetSpan.firstChild.nodeValue;
		var parts = currentTime.split(':');
		var tmp = parseInt(parts[0]);
		//alert(tmp);
		var res = ((tmp+1)>12)?1:(tmp+1);
		var newTimeStr = currentTime+'-'+'<br>'+res+':'+'15'+((res>11)?'AM':'PM');
		//targetSpan.innerHTML = '<b>'+i+'</b>'+'<br>'+newTimeStr;
		// fix cell style
		targetTH.style.border = "0px";
		targetTH.style.backgroundColor = "white";
		targetSpan.style.backgroundColor = "white";
		targetSpan.style.color = ncFixColor;
		targetSpan.style.fontSize = '21';
		targetSpan.style.fontWeight = 'normal';
		targetSpan.style.fontFamily = ncFixFont;
		
		// iteration on each cell		
		var cellCnt = currentRow.cells.length;
		for(var j = 1; j < cellCnt; j++) {
			var currentCell = currentRow.cells[j];
			
			ncFixCellStyle(currentCell);

			
			var tmp = currentCell.getAttribute('class');
			if(tmp == 'SSSWEEKLYBACKGROUND') {
				var targetSpan = currentCell.firstChild;
				var content = targetSpan.innerHTML;
				content = ncFixContent(content);
				if(content == "") {
					targetSpan.parentNode.removeChild(targetSpan);
					currentCell.style.backgroundColor = 'white';
				} else {
					ncFixCellStyle(currentCell);
					targetSpan.innerHTML = content;
				}
			}
		}
	}
}

function ncFix()
{
	ncFixFirstRow();
	ncFixOtherRows();
}



ncFix();