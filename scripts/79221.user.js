// ==UserScript==
// @name             solo_war
// @namespace        solo_war_ns
// @description      выбор одиночки для 2х персонажей =)
// @include          http://*ganjawars.ru/warlist.php*
// @version          1.0
// @author           pestO
// ==/UserScript==

//Тут редатируем двух персонажей =)
//1ый - ник, 2ой минмальынй уровень, 3ий-максимальный, 4ый - тип
//1ый
var firstPerson= ["Zarazkaa",17,26,3];
//2ой
var secondPerson= ["pestO",25,35,2];
//типы вооружения
// 0 ВСЕ
// 1 пулемет
// 2 дробовик
// 3 пистолет
// 4 гранатомет
// 5 автомат
// 6 винтовка 


var lvl_min  = document.getElementsByName( 's_lmin' )[0];
var lvl_max  = document.getElementsByName( 's_lmax' )[0];
var weapn = document.getElementsByName( 's_ltype' )[0];

var find = document.getElementsByTagName( 'a' );
for (var i = 0; i < find.length; i++)
	if(find[i].href.indexOf('/warlist.php?war=armed&r=') > -1)
		{
		var p=document.createElement('input');
		p.type='submit';
		p.addEventListener("click", f, false);
		p.value=firstPerson[0];
		find[i].parentNode.parentNode.appendChild(p);
		
		var pp=document.createElement('input');
		pp.type='submit';
		pp.addEventListener("click", ff, false);
		pp.value=secondPerson[0];
		find[i].parentNode.parentNode.appendChild(pp);
		i = find.length
		}

function cl_b()
{
var f = document.getElementsByTagName( 'input' );
f[f.length-3].click()
}

function f()
{
lvl_min.selectedIndex = firstPerson[1];
lvl_max.selectedIndex = firstPerson[2]-5;
weapn.selectedIndex = firstPerson[3];
cl_b()
}

function ff()
{
lvl_min.selectedIndex = secondPerson[1];
lvl_max.selectedIndex = secondPerson[2]-5;
weapn.selectedIndex = secondPerson[3];
cl_b()
}