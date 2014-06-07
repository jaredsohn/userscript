// ==UserScript==
// @name ave_grade
// @namespace http://mutoo.im/
// @description Calculate the Average Grade
// @include http://jw.xujc.cn/student/index.php?c=Search&a=cj&tm_id=*
// @include http://jw.xujc.com/student/index.php?c=Search&a=cj&tm_id=*
// @exclude http://jw.xujc.cn/student/index.php?c=Search&a=cj&tm_id=
// @exclude http://jw.xujc.com/student/index.php?c=Search&a=cj&tm_id=
// ==/UserScript==

var data = data_table.getElementsByTagName("tr");
var gradeAll = 0;
var markAll = 0;
for(var i=1;i<data.length;i++){
	var info = data[i].getElementsByTagName("td");
	var grade = info[2].innerHTML;
	var mark = info[3].innerHTML;
	gradeAll += Number(grade);
	markAll += grade*mark;
}
alert("你的平均分是："+markAll/gradeAll);
