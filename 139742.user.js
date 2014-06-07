// ==UserScript==
// @name        Multiple Imprs
// @namespace   Thewa
// @description One of each City Improvement in PixelNations with one click
// @include     http://www.pixelnations.net/beta/index.php?id=8&*
// @include     http://www.pixelnations.net/beta/index.php?id=8
// @version     2.2
// ==/UserScript==

act = document.getElementsByTagName("table")[2].firstElementChild.action
regex = new RegExp("Price:[^\\d]*([\\d,]+)[^M]*Maximum:[^\\d]*(\\d)[^B]*Built:[^\\d]+(\\d)","g")
regex2 = new RegExp("Price:[^\\d]*([\\d,]+)[^M]*Maximum:[^\\d]*(\\d)[^B]*Built:[^\\d]+(\\d)")
gmatches = document.getElementsByTagName("table")[2].textContent.match(regex)
submit = document.createElement("input")
submit.setAttribute("type", "submit")
submit.setAttribute("value", "Build One Of Each")
fields = []
fields[0] = submit
cash = 0
names = ["police", "prison", "supreme", "library", "university", "research", "landfill", "sanitation", "subway", "hospital", "zoo", "stadium"]
j = 1
for (var i = 0; i < gmatches.length; i++)
{
	matches = gmatches[i].match(regex2)
	if (matches[3]<matches[2])
	{
		field = document.createElement("input")
		field.setAttribute("name", names[i])
		field.setAttribute("type", "hidden")
		field.setAttribute("value", "Build New")
		fields[j] = field
		j = j+1
		mregex = new RegExp("(\\d+),(\\d+),(\\d+)")
		s = new String()
		mmatches = matches[1].match(mregex)
		m = s.concat(mmatches[1],mmatches[2])
		m = s.concat(m,mmatches[3])
		cash = cash+(m*1)
	}
}
f = document.createElement("form")
f.setAttribute("action", act)
f.setAttribute("method", "post")
br = document.createElement("br")
for (var i = 0; i < fields.length; i++)
{
	f.appendChild(fields[i])
}
cash = formatCost(cash)
t = document.createTextNode(cash)
f.appendChild(t)
f.appendChild(br)
document.getElementsByTagName("table")[2].parentElement.insertBefore(f, document.getElementsByTagName("table")[2])