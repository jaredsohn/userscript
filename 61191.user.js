// ==UserScript==
// @name           estiah-menu
// @namespace      http://www.estiah.com/character
// @include        http://www.estiah.com/*
// ==/UserScript==
//MENU
element = document.evaluate('/html/body/div/div/div/div[4]/div[5]/div/div/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Zwiedzaj miasto';

element = document.evaluate('/html/body/div/div/div/div[4]/div[3]/div/div/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Ekwipunek';

element = document.evaluate('/html/body/div/div/div/div[4]/div[5]/div/div[2]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Targowisko';

element = document.evaluate('/html/body/div/div/div/div[4]/div[5]/div/div[5]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Zobacz Mapę Świata';

element = document.evaluate('/html/body/div/div/div/div[4]/div[5]/div/div[3]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Dom Aukcyjny';

element = document.evaluate('/html/body/div/div/div/div[4]/div[5]/div/div[4]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Łowcy głów';

element = document.evaluate('/html/body/div/div/div/div[4]/div[9]/div/div/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Zmień pracę';

element = document.evaluate('/html/body/div/div/div/div[4]/div[9]/div/div[2]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Szkolenie w Akademii';

element = document.evaluate('/html/body/div/div/div/div[4]/div[9]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Job', 'Praca:');
element.innerHTML=s;

element = document.evaluate('/html/body/div/div/div/div[4]/div[9]/div/div[7]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Pet', 'Zwierzak:');
element.innerHTML=s;

element = document.evaluate('/html/body/div/div/div/div[4]/div[9]/div/div[4]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Wyścig zwierząt';

element = document.evaluate('/html/body/div/div/div/div[4]/div[9]/div/div[5]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Walka zwierząt';

element = document.evaluate('/html/body/div/div/div/div[4]/div[3]/div/div[2]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Pozbieraj przedmioty';

element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Bohater';

element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div[2]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Przeglądaj Skille';

element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div[3]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Historia walk';

element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div[4]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Przeglądaj Czary';

element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div[5]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Prywatne wiadomości';

element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div[6]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Wesprzyj grę';

element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div[8]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Gear', 'Zestaw');
element.innerHTML=s;
element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div[9]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Gear', 'Zestaw');
element.innerHTML=s;
element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div[10]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Gear', 'Zestaw');
element.innerHTML=s;
element = document.evaluate('/html/body/div/div/div/div[4]/div/div/div[11]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Gear', 'Zestaw');
element.innerHTML=s;

element = document.evaluate('/html/body/div/div/div/div[4]/div[7]/div/div[3]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Zbieranie';

element = document.evaluate('/html/body/div/div/div/div[4]/div[11]/div/div/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Stwórz nową Gildie';

element = document.evaluate('/html/body/div/div/div/div[4]/div[11]/div/div[2]/div/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Przeglądaj listę Gildii';