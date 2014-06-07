// ==UserScript==
// @include        http://ninova.itu.edu.tr/tr/
// @name Ninova Kızını Değiştirin
// ==/UserScript==




//Aşağıdaki adresi kendi resminize ayarlarsanız benden kurtulursunuz

var yeniResimAdres='http://www.students.itu.edu.tr/~karcim/ninovahack.jpg';


//Alt taraftaki algoritmaya dokunmayın (algoritma değil o kod [arisliğine öyle dedim (orrayt then)])


document.body.innerHTML=document.body.innerHTML.replace('/images/kapak01.jpg',yeniResimAdres);


