// ==UserScript==
// @name           大连海事大学教务系统显示课程表
// @namespace      
// @include        http://jwc.dlmu.edu.cn/*
// ==/UserScript==

window.addEventListener('load', show, false);
function InsertSchedule(TableID, TaskID, CourseName, TeacherName, TaskObject, ResultWeeks, WeekTypeName, ClassroomName) {
	var TargetTable = document.getElementById(TableID);
	if (TargetTable != null) {
		var newRow = TargetTable.insertRow( - 1);
		newRow.innerHTML += "<br><br><br>";
		var newCell = newRow.insertCell( - 1);
		newCell.title = CourseName;
		newCell.setAttribute("nowrap", "nowrap");
		newCell.innerHTML = CourseName + " " + TeacherName + "<br/>" + ResultWeeks + "周 " + WeekTypeName + " " + ClassroomName + "<br/>"
	}
}
function show() {
	var script = document.evaluate("//script/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	 if (script.snapshotLength) {
		for (var i = 1; i < script.snapshotLength; i++) {
			var arr = script.snapshotItem(i).data.split('"');
			InsertSchedule(arr[1], arr[3], arr[5], arr[7], arr[9], arr[11], arr[13], arr[15]);
		}
	}
}