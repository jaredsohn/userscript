// ==UserScript==
// @name           FOR HRS
// @namespace      twonlyu@gmail.com
// @description    Book hotels
// ==/UserScript==


function check(){
a=(new Date()).getTime()/1000;
if(a<1337259600){ location.reload();return;}
else {
$('#edit-msname').attr('value','xxxxx')
$('#edit-msaddress').attr('value','xxxxx')
$('#edit-mszip').attr('value','510000')
$('#edit-msmobile').attr('value','18000000000')
$('#edit-msemail').attr('value','tfgsddu@gmail.com')
$('#checkbox').attr('checked','1')
$('#edit-legal').val(1)
$('#edit-submit').click()
}
}
t=setInterval('check()', 5000)