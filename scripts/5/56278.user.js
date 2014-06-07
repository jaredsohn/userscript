// ==UserScript==
// @name           Bar-Ilan Grades
// @namespace      adi.lester
// @description    Creates a link to your grades from the Exam Dates page.
// @include        https://dory.os.biu.ac.il/StudentSystem/ExamDates.jsp*
// ==/UserScript==

var myTable = document.getElementsByTagName('table')[7];

var i = 3;
var currentRow = myTable.rows[i];

while (currentRow)
{
    if (currentRow.childNodes.length > 1)
    {
        currentRow.childNodes[9].style.width = '90px';
        currentRow.childNodes[15].style.width = '75px';
    
        var currentCell = currentRow.childNodes[3];
        var text = currentCell.textContent;
        
        var cid1 = text[8] + text[7];
        var cid2 = text[5] + text[4] + text[3];
        var cid3 = text[1] + text[0];
        
        currentCell.innerHTML = '<a href="https://dory.os.biu.ac.il/StudentSystem/FinalGradeInfo.jsp?CourseId1=' + cid1 + '&CourseId2=' + cid2 + '&CourseGrup=' + cid3 + '">' + text + '</a>';
    }
    
    i += 2;
    currentRow = myTable.rows[i];
}