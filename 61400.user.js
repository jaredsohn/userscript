// ==UserScript==
// @name           estiah-gathering
// @namespace      http://www.estiah.com/
// @description    spolszczenie strony estiah/gathering
// @include        http://www.estiah.com/city/gathering
// ==/UserScript==

element = document.evaluate('/html/body/div/div/div[2]/div/div/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Zbieranie';

element = document.evaluate('/html/body/div/div/div[2]/div/div/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Zwiększ swojego ducha przygody i zbieraj skarby w dzikich zakątkach Estiah. Możesz z łatwością znaleźć jakiś przedmiot, lecz możesz również trafić na dzikie zwierze lub innych graczy idących w to samo miejsce ... Życie nie byłoby zabawne bez niespodzianek, prawda?<br/><br/>Poszukiwania kosztują <strong class="c2">10</strong> Punktów Akcji.';

//element = document.evaluate('/html/body/div/div/div[2]/div/div/div/div[3]', document, null, XPathResult.//FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
//s=element.innerHTML;alert(s);
//s = s.replace('You do not have enough action points', 'Nie masz wystarczającej ilości Punktów Akcji');
//element.innerHTML=s;