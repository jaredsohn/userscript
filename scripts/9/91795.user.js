// ==UserScript==
// @name          Thing-adder
// @description   Adds things
// @include       http://naqt.com/stats/team-performance.jsp*
// ==/UserScript==

t = document.getElementsByClassName("stats")[1];
i = 2;
Psum = 0;
Tsum = 0;
Isum = 0;
while (i < t.rows.length) {
	Psum += Number(t.rows[i].cells[10].innerHTML);
	Tsum += Number(t.rows[i].cells[11].innerHTML);
	Isum += Number(t.rows[i].cells[12].innerHTML);
	i += 1;
}
t.innerHTML +=  "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>"+Psum.toString()+"</td><td>"+Tsum.toString()+"</td><td>"+Isum.toString()+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>"