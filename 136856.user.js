// ==UserScript==
// @name        Tsinghua University calendar outputer
// @namespace   http://zhjwxk.cic.tsinghua.edu.cn/
// @include     http://zhjwxk.cic.tsinghua.edu.cn/syxk.vsyxkKcapb.do*%D5%FB%CC%E5%BF%CE%B1%ED
// @include     http://localhost:8000/syxk.vsyxkKcapb.do.htm
// @version     0.002
// ==/UserScript==

//@license:GPLv2
//@author:HeYSH <wp-heysh.rhcloud.com>

//不支持IE8及以下……等等，IE本来就不支持user.js吧……
//opera没有得到测试
//todo:加入jquery UI，实现日期选择器（datapicker）/浮动窗口（dialog），但是还没有下定决心……
//todo:使生成内容可选
//todo:利用vCal 定义中RRULE规则进行重复，便于管理

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {

	$().ready(function() {
		$("input.button").before('假期最后的周日:<INPUT id="lastSunday" type="text" value="2012-9-9"/>');
		$("input.button").before('<INPUT id="outputCal" type="button" value="生成vCal(请稍等)">');
		var $vCalArea = $('<textarea readonly style="width:60%;height:300px"></textarea>');
		$vCalArea.append('BEGIN:VCALENDAR\nPRODID:-//HeYSH//THU Calendar 0.0002//CN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:课程表\nX-WR-TIMEZONE:Asia/Shanghai\nX-WR-CALDESC:\nBEGIN:VTIMEZONE\nTZID:Asia/Shanghai\nX-LIC-LOCATION:Asia/Shanghai\nBEGIN:STANDARD\nTZOFFSETFROM:+0800\nTZOFFSETTO:+0800\nTZNAME:CST\nDTSTART:19700101T000000\nEND:STANDARD\nEND:VTIMEZONE\n');
		//生成文件头
		var firstSunday = new Date();
		//firstSunday.setFullYear(2012, 8, 9);//2012-9-9

		lSunday = $("#lastSunday").val().split("-");
		firstSunday.setFullYear(lSunday[0], lSunday[1] - 1, lSunday[2]);

		$("#outputCal").click(function() {
			$(".mainHref b").each(function() {//一级选课部分
				var everything = getEverything(this);
				var courseName = everything[0];
				//4output
				var courseInfo = everything[1];
				var day = everything[2];
				//4output
				var classNo = everything[3];
				//4output
				//document.write(courseInfo+"<br>");
				var rawWeek;
				var place;
				// //4output
				//need big change
				for (var i in courseInfo) {
					j = courseInfo[i].toString();
					if (j.charAt(j.length - 1) == "周") {
						rawWeek = j;
						if (i == courseInfo.length - 1) {
							place = "无";
							courseInfo.splice(courseInfo.length - 1, 1);
						} else {
							place = courseInfo[courseInfo.length - 1];
							courseInfo.splice(courseInfo.length - 1, 1);
							courseInfo.splice(i, 1);
						}
					}
				}
				courseInfo = courseInfo.toString();
				//alert(courseInfo);
				var lWeek = changeWeekType(rawWeek);
				//4output
				var Data = {
					'grade' : 1,
					'courseName' : courseName,
					'day' : day,
					'classNo' : classNo,
					'place' : place,
					'lWeek' : lWeek,
					'courseInfo' : courseInfo
				};
				OutputCal(Data);
				//alert(classNo);
			})

			$(".blue_red_none b").each(function() {//二级选课部分
				var everything = getEverything2(this);
				var courseName = everything[0];
				//4output
				var courseInfo = everything[1];
				var day = everything[2];
				//4output
				var classNo = everything[3];
				//4output
				//document.write(escape(courseName) + "<br>");
				var place = courseInfo[0];
				//4output
				var lWeek = changeWeekType(courseInfo[1]);
				//4output
				var newTime = courseInfo[2];
				//4output,may be undefined
				var isTimeChanged = new Boolean(0);
				var lNewTime = [0, 0, 0, 0];
				if (newTime != undefined) {
					isTimeChanged = true;
					var lNewTime = processNewTime(newTime);
				}
				var Data = {
					'grade' : 2,
					'courseName' : courseName,
					'day' : day,
					'classNo' : classNo,
					'place' : place,
					'lWeek' : lWeek,
					'isTimeChanged' : isTimeChanged,
					'lNewTime' : lNewTime,
					'courseInfo' : "实验"
				};
				OutputCal(Data);
				//document.writeln(lWeek);
			})
			addWeekNo();
			$vCalArea.append('END:VCALENDAR');
			$('div.window_neirong').prepend($vCalArea);
			$('div.window_neirong').prepend('<h4>请在此处右击-全选-复制，粘贴到一个文本文件中，并将其扩展名改为.ics</h4>');
		});
		//document.write(listCourse);
		function getEverything(someClassObject) {//get courseName,courseInfo,day,classNo,don't get anything in courseInfo
			var courseName = $(someClassObject).text();
			var courseInfo = $(someClassObject).parent().parent()[0].childNodes[1].nodeValue;
			var idDay_No = $(someClassObject).parent().parent().attr("id");
			var lDay_No = idDay_No.substring(1, idDay_No.length).split("_");

			courseInfo = courseInfo.substring(1, courseInfo.length - 1);
			courseInfo = courseInfo.split("；");
			var day = lDay_No[1];
			var classNo = lDay_No[0];
			return [courseName, courseInfo, day, classNo];
		}

		function getEverything2(someClassObject) {//get courseName,courseInfo,day,classNo,don't get anything in courseInfo
			var courseName = $(someClassObject).text();
			var courseInfo = $(someClassObject).parent().next("font").text();
			var idDay_No = $(someClassObject).parent().parent().attr("id");
			var lDay_No = idDay_No.substring(1, idDay_No.length).split("_");
			courseInfo = courseInfo.split("(");
			courseName = courseName.concat(" ", courseInfo[0]);
			courseInfo = courseInfo[1].substring(0, courseInfo[1].length - 1);
			courseInfo = courseInfo.split("；");
			//alert (courseInfo);
			var day = lDay_No[1];
			var classNo = lDay_No[0];
			return [courseName, courseInfo, day, classNo];
		}

		function changeWeekType(rawWeek) {
			if (rawWeek == "全周") {
				return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
			} else if (rawWeek == "单周") {
				return [1, 3, 5, 7, 9, 11, 13, 15];
			} else if (rawWeek == "双周") {
				return [2, 4, 6, 8, 10, 12, 14, 16];
			} else {
				rawWeek = rawWeek.replace(/[\u4E00-\u9FA5]/g, '');

				if (rawWeek.indexOf("-") != -1) {
					while (rawWeek.indexOf("-") != -1) {
						var i = rawWeek.split("-");
						var x = i[0].split(",");
						var x1 = x.pop();
						var y = i[1].split(",");
						var y1 = y[0];
						var tmp0;
						var tmp1 = [];
						for ( tmp0 = Number(x1); tmp0 <= Number(y1); tmp0++) {
							tmp1.push(tmp0);
						}
						//tmp1 = tmp1.toString();
						//alert(x1);
						//alert(y1);
						//alert(tmp1);
						ltmp2 = rawWeek.split(x1 + "-" + y1);
						rawWeek = ltmp2[0].concat(tmp1, ltmp2[1]).split(",");
						//alert(ltmp2);
					}
				} else {
					rawWeek = rawWeek.split(",");
				}

				return rawWeek;
			}
		}

		function OutputCal(Data) {
			for ( i = 0; i < Data.lWeek.length; i++) {
				var cDate = new Date();
				//Data.lWeek=[1,3,5,7,13];
				cDate.setTime(firstSunday.getTime());
				cDate.setDate(firstSunday.getDate() + Data.lWeek[i] * 7 - 7 + parseInt(Data.day));
				var beginTime = new Date();
				var endTime = new Date();
				beginTime.setTime(cDate.getTime());
				endTime.setTime(cDate.getTime());
				var lTime = CtrlTime(Data.classNo, Data.isTimeChanged, Data.lNewTime);
				beginTime.setHours(lTime[0], lTime[1]);
				endTime.setHours(lTime[2], lTime[3]);
				//document.writeln(beginTime.toLocaleString()+endTime.toLocaleTimeString());
				var uid = escape(Data.courseName) + "@" + i + "@" + Data.day + "@" + Data.classNo;
				function p(s) {//补零
					return s < 10 ? '0' + s : s;
				}

				var strBT = String(beginTime.getFullYear()) + p(beginTime.getMonth() + 1) + p(beginTime.getDate()) + 'T' + p(beginTime.getHours()) + p(beginTime.getMinutes()) + "00";
				var strET = String(endTime.getFullYear()) + p(endTime.getMonth() + 1) + p(endTime.getDate()) + 'T' + p(endTime.getHours()) + p(endTime.getMinutes()) + "00";
				$vCalArea.append("BEGIN:VEVENT\nDTSTART;TZID=Asia/Shanghai:" + strBT + "\nDTEND;TZID=Asia/Shanghai:" + strET + "\nDTSTAMP:20120622T160054Z\nUID:" + uid + "\nCREATED:20120622T154824Z\nDESCRIPTION:" + Data.courseInfo + "\nLAST-MODIFIED:20120622T160041Z\nLOCATION:" + Data.place + "\nSTATUS:CONFIRMED\nSUMMARY:" + Data.courseName + "\nEND:VEVENT\n")

			}
		}

		function CtrlTime(classNo, isTimeChanged, lNewTime) {
			lNewTime = lNewTime || [0, 0, 0, 0];
			if (isTimeChanged == true) {
				return lNewTime;
			} else {
				switch(Number(classNo)) {
					case 1:
						return [8, 0, 9, 35];
						break;
					case 2:
						return [9, 50, 11, 25];
						//三课时怎么办？
						break;
					case 3:
						return [13, 30, 15, 5];
						break;
					case 4:
						return [15, 20, 16, 55];
						//+1
						break;
					case 5:
						return [17, 10, 18, 45];
						break;
					case 6:
						return [19, 20, 20, 55];
						//+2
						break;
					default:
						return [-1, -1, -1, -1];
				}
			}
		}

		function processNewTime(newTime) {
			newTime = newTime.replace(/[\u4E00-\u9FA5]/g, '');
			var lNewTime = newTime.split(/[-:]/);
			//lNewTime=lNewTime.split(":");//四位数数组
			//alert(lNewTime[0]);
			var test = new Date();
			test.setHours(Number(lNewTime[0]), Number(lNewTime[1]));
			//document.writeln(test.toLocaleTimeString());
			test.setHours(Number(lNewTime[2]), Number(lNewTime[3]));
			//document.writeln(test.toLocaleTimeString());
			lNewTime = [Number(lNewTime[0]), Number(lNewTime[1]), Number(lNewTime[2]), Number(lNewTime[3])];
			return lNewTime;
		}

		function addWeekNo() {
			for ( i = 1; i <= 16; i++) {
				var cDate = new Date();
				//Data.lWeek=[1,3,5,7,13];
				var beginTime = new Date();
				var endTime = new Date();
				cDate.setTime(firstSunday.getTime());
				cDate.setDate(firstSunday.getDate() + i * 7 - 7 + 1);
				beginTime.setTime(cDate.getTime());
				endTime.setTime(cDate.getTime());
				beginTime.setHours(1, 0);
				endTime.setHours(2, 0);
				function p(s) {//补零
					return s < 10 ? '0' + s : s;
				}

				var strBT = String(beginTime.getFullYear()) + p(beginTime.getMonth() + 1) + p(beginTime.getDate()) + 'T' + p(beginTime.getHours()) + p(beginTime.getMinutes()) + "00";
				var strET = String(endTime.getFullYear()) + p(endTime.getMonth() + 1) + p(endTime.getDate()) + 'T' + p(endTime.getHours()) + p(endTime.getMinutes()) + "00";
				var uid = strBT + strET;
				var summary = "第" + i + "周";
				var description = "这是" + summary;
				$vCalArea.append("BEGIN:VEVENT\nDTSTART;TZID=Asia/Shanghai:" + strBT + "\nDTEND;TZID=Asia/Shanghai:" + strET + "\nDTSTAMP:20120622T160054Z\nUID:" + uid + "\nCREATED:20120622T154824Z\nDESCRIPTION:" + description + "\nLAST-MODIFIED:20120622T160041Z\nLOCATION:" + "none" + "\nSTATUS:CONFIRMED\nSUMMARY:" + summary + "\nEND:VEVENT\n")

			}
		}

		//alert(processNewTime("时间16:30-18:00"))	;

	})
}

// load jQuery and execute the main function
addJQuery(main);
