// ==UserScript==
// @name           Vorlesungsskript
// @namespace      w3studi.informatik.uni-stuttgart.de/~muelletm
// @description    Fügt ein sehr gutes Skript der Uni Bielefeld zur Seite hinzu.
// @include        http://www.iis.uni-stuttgart.de/lehre/ss09/NeuronaleNetze/
// ==/UserScript==

h4 = document.createElement('h4')
h4.appendChild(document.createTextNode('Skript'))
ul = document.createElement('ul')
li = document.createElement('li')
a = document.createElement('a')
a.setAttribute('href','https://www.techfak.uni-bielefeld.de/ags/ni/lectures/lectures-w05/NeuroI/media/NeuroI.pdf')
a.appendChild(document.createTextNode('Gutes Skript / stimmt zu großen Teilen mit der Vorlesung überein.'))
li.appendChild(a)
ul.appendChild(li)    

h4s = document.getElementsByTagName('h4')

for (i=0;i<h4s.length;i++)
{

	if (h4s[i].childNodes[0].data == 'Dozent')
	{
		dozentH4 = h4s[i]
		parent = dozentH4.parentNode
	
		parent.insertBefore( h4, dozentH4 )
		parent.insertBefore( ul, dozentH4 )

		break
	}

}