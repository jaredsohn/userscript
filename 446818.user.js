// ==UserScript==
// @name Dnevnik Upgrade
// @namespace absolvo.ru/
// @version b0.05
// @source https://github.com/MineGeekYT/DnevnikUpgrade
// @description just best plug-in ever
// @include *dnevnik.ru*

// ==/UserScript==


//Marks

setTimeout(function() { 
    $('span.mark.mR').css('display', "none"); 
}, 0.01);
//BadMarks = document.getElementsByClassName("mark mR");

//var BadMarks;
/*BadMarks = document.createElement('div');
BadMarks.innerHTML = "<style>.marc mR {display: none; }</slyle>";
document.body.appendChild(BadMarks);
*/

/*
TabBMClass = {}
Classes = {}

BMClass = document.getElementsByClassName("mark mR");

for (i=0; i<BMClass.length; i++) {
//    for (j=0; j<2; j++) {
        TabBMClass[i] = BMClass[i].parentNode;
    	Classes[i] = TabBMClass[i].parentNode;
//    }
}
//Classes1[0] = Classes[0].parentNode;
temp = Classes[0].firstChild;
className = temp.childNodes[0].innerHTML;
//temp.childNodes[1].innerHTML = className;
//style.visibility = "hidden";
*/
//for (i = 0; i<BadMarks.length; i++) {
//    BadMarks[i].style.display = "none";
//}




//Class choice




OptButton = document.getElementsByClassName("col23 first");
//OptButton[0].firstChild.style.visibility = "hidden";
//ClassCh = document.getElementsByClassName('checkcolor')[0];
ClassCh = document.createElement('div')
//ClassCh.innerHTML = "<input type='button' value='Options' onclick='alert(13);'>"
ClassCh.innerHTML = "<li><a id='mAbout2' href='http://company.dnevnik.ru/about/' title='Настройки'>Настройки</a></li>";
//var firstUl = OptButton[0].getElementsByTagName('UL');
OptButton[0].firstChild.appendChild(ClassCh);






























