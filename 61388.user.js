// ==UserScript==
// @name           estiah - bohater
// @namespace      http://www.estiah.com/character
// @include        http://www.estiah.com/character
// ==/UserScript==
var s;

//CHARAKTER
element = document.evaluate('/html/body/div/div/div[2]/div/div/div/div[3]/div[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Current Position', 'Miasto');
element.innerHTML=s;

element = document.evaluate('/html/body/div/div/div[2]/div/div/div/div[3]/div[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Worked', 'Pracowałeś');
s = s.replace('Yes', 'Tak');
s = s.replace('No', 'Nie');
element.innerHTML=s;

element = document.evaluate('/html/body/div/div/div[2]/div/div/div/div[3]/div[3]/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Moved', 'Podróżowałeś');
s = s.replace('Yes', 'Tak');
s = s.replace('No', 'Nie');
element.innerHTML=s;

element = document.evaluate('/html/body/div/div/div[2]/div/div/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Psyhol jest super zajebisty ... Insekt jest prawie tak zajebisty jak Psyhol';


element = document.evaluate('//html/body/div/div/div[2]/div/div/div/div[3]/div[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Class', 'Klasa');
element.innerHTML=s;


element = document.evaluate('/html/body/div/div/div[2]/div/div/div/div[3]/div[3]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Action Points', 'Punkty Akcji');
element.innerHTML=s;


element = document.evaluate('/html/body/div/div/div[2]/div/div/div/div[3]/div[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Progress to next level', 'Do następnego poziomu');
element.innerHTML=s;

element = document.evaluate('/html/body/div/div/div[2]/div/div[2]/div[2]/div[2]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
s=element.innerHTML;
s = s.replace('Requirements', 'Wymagania');
s = s.replace('Rewards', 'Nagroda');
element.innerHTML=s;

element = document.evaluate('/html/body/div/div/div[2]/div/div[2]/div[2]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
element.innerHTML='Praca';


