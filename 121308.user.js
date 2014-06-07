// ==UserScript==
// @name          Donate Changer
// @namespace     http://www.cantr-mmorpg.pl/scripts
// @description   Zmiana donate money na donate items w egovie
// @include       http://egov4you.info/country/mini/35/*
// @version       o7
// ==/UserScript==

function setDof(){
	return function(){
    dofSum = document.getElementById('dofik').value;
    
    var fightersTab = document.getElementById('dataFighters');
    var fighterList = fightersTab.getElementsByClassName('simple')[0];
    var fighters = fighterList.getElementsByTagName('tr');
    
    var fightCount = 0;
    var influCount = 0;
    var legionists = {};
    for (var i=1;i<fighters.length;i++){
      legionists[i] = {};
      legionists[i]['fight'] = parseData(fighters[i].getElementsByTagName('td')[3].innerHTML)*1;
      fightCount += legionists[i]['fight'];
      legionists[i]['influ'] = parseData(fighters[i].getElementsByTagName('td')[4].innerHTML)*1;
      influCount += legionists[i]['influ'];
    }
    
    if (influCount != 0 && fightCount != 0){
      for (var i=1;i<fighters.length;i++){
        var dof = 0;
        dof += (legionists[i]['fight']/fightCount)*dofSum*0.5;
        dof += (legionists[i]['influ']/influCount)*dofSum*0.5;
        fighters[i].getElementsByTagName('td')[5].innerHTML = dof.toFixed(1);
      }
    }
  }
}

function parseData(text){
  return text.replace(/,/g, "");
}


function changeLinks(){
  return function(){
    var dataBox = document.getElementById('dataFighters');
    dataBox = dataBox.getElementsByTagName('td');
    for (var ii in dataBox){
      dataBox[ii].innerHTML = dataBox[ii].innerHTML.replace(/http:\/\/economy\.erepublik\.com\/en\/citizen\/donate\/money\//g, "http://www.erepublik.com/en/economy/donate-money/");
    }
  }
}

var tab = document.getElementsByTagName('table')[2];
var tede = tab.parentNode;
console.log(tede.innerHTML);
var inputNode = document.createElement('input');
inputNode.type = 'text';
inputNode.id = 'dofik';

var clickNode = document.createElement('input');
clickNode.type = 'button';
clickNode.id = 'kliker';
clickNode.value = 'Licz';
clickNode.addEventListener('click', setDof() ,false)

var weAreNode = document.createElement('input');
weAreNode.type = 'button';
weAreNode.id = 'kliker';
weAreNode.value = 'We are 0.99';
weAreNode.addEventListener('click', setDof(0.99) ,false)

tede.insertBefore(inputNode,tab);
tede.insertBefore(clickNode,tab);
tede.insertBefore(weAreNode,tab);

setInterval(changeLinks(), 1000);