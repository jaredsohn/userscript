// ==UserScript==
// @name   TAW Color Coded Attendance
// @namespace  http://taw.net/event/
// @description Color codes the attendance record.
// @include  http://taw.net/event/*
// ==/UserScript==
var html = document.body.innerHTML;
html = html.replace( /attended/g, '<font color="#33cc00">attended</font>' );
html = html.replace( /excused/g, '<font color="#ffff99">excused</font>' );
html = html.replace( /missed/g, '<font color="#ff6666">missed</font>' );
document.body.innerHTML = html;