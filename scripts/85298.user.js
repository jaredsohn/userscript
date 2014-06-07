// ==UserScript==

// @name           0chan anti/hw-ish/wipe

// @namespace      userscripts.org

// @description    testing some chan scripts 4wtf

// @include        http://www.0chan.ru/hw/

// ==/UserScript==

		

		exclude = /Мек-бой|Мекбой|([ A-ZА-ЯЖЁ!,.-]{16,})|([мМ][еe]к-?б[oо][йюя])|([^a-zA-ZА-Яа-я][мМM][еeEЕ][кКK]_)|(мeк-рак)/; 

		// looks like wipe with only capital letters ;<

		// all mek with latin/ru characters

		ommit	= /[a-zа-я]{3,}/;

//		re = /Мек-бой|Мекбой|([,. А-Я-!]{8,})|([А-Я-]{6,})/; // looks like wipe with only capital letters ;<

		i=-1; k=0;



		/*



		tab=document.getElementsByTagName('td');



		while(tab[++i]){

			if (tab[i].id.indexOf('reply')!=-1){			

				if (tab[i].innerHTML.search(re)!=-1){			

				//	tab[i].innerHTML='TESTtestTEST'+tab[i].innerHTML;

					tab[i].style.display='none';

				}

			}

		}

		*/

		



		i=-1; k=0;

		tab=document.getElementsByClassName('postnode');

		while(tab[++i]){

			if (tab[i].innerHTML.search(exclude)!=-1){			

			//	tab[i].innerHTML='TESTtestTEST'+tab[i].innerHTML;

			//	tab[i].style.display='none';

					tab[i].innerHTML='hided 4 teh wipe justice';//+tab[i].innerHTML;

			}else if (tab[i].innerHTML.search(ommit)!=-1 && 1){

				tab[i].innerHTML=tab[i].innerHTML.replace(

							/[A-ZА-ЯЖЁ()]{4,}/g, 

							'caps_censored'

						);

				//tab[i].innerHTML="hided 4 teh ^capsing_rage^'"+ tab[i].innerHTML;

			}

		}

