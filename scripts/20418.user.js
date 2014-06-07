// ==UserScript==
// @name          Order NFL Names By Points
// @description   Orders the NFL Names By Points
// @include       http://www.nflonline.org/points_application/schoolprofile.php?id=*
// ==/UserScript==

function getNextSibling(startBrother){
  endBrother=startBrother.nextSibling;
  while(endBrother.nodeType!=1){
    endBrother = endBrother.nextSibling;
  }
  return endBrother;
}

var link, name, id, degree, date, student;
var html = "<td colspan='2'><table   class='subitem'width='100%'>"+
"<tr class='colhead'>"+
"<td>Name</td>"+
"<td class='center'>Degrees</td>"+
"<td class='center'>Merit Date</td>"+
"<td class='center'>Points</td></tr>";
var students = new Array();
var keys = new Array()
var links = document.evaluate( '//a[contains(@href,"studentprofile.php")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i ++) {
link = links.snapshotItem(i);
id = link.href.split('id=')[1];
name = link.innerHTML;
degree = getNextSibling(link.parentNode);
date = getNextSibling(degree);
points = getNextSibling(date);
if (students[points.innerHTML] != null) {
students[points.innerHTML].push(new Array(name, id, degree.innerHTML, date.innerHTML, points.innerHTML));
} else {
students[points.innerHTML] = new Array(new Array(name, id, degree.innerHTML, date.innerHTML, points.innerHTML));
keys[i] = points.innerHTML;
}
}
keys = keys.sort(function(a,b){return b - a});

for(var i=0; i<keys.length; i++){
if (students[keys[i]] != null) {
for(var j=0; j<students[keys[i]].length; j++){
student = students[keys[i]][j];
name = student[0];
id = student[1];
degree = student[2];
date = student[3];
points = student[4];
html += '<tr><td><a href="studentprofile.php?id='+id+'">'+name+'</td><td class="center">'+degree+'</td><td class="center">'+date+'</td><td class="center">'+points+'</td></tr>';
}
}
}
document.getElementById('schlist').innerHTML = html+'</table></td>';