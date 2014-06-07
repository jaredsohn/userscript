// ==UserScript==
// @name           Menel Szukacz
// @version        0.1.5b
// @namespace      http://userscripts.org/users/101110
// @description    Wyszukuje przeciwników do zaatakowania wg podanych kryteriów
// @author         lobo16
// @copyright      2010, lobo16 
// @include        http://*menelgame.pl/fight/*
// ==/UserScript==

//#Region Global Variables
var link = 'http://www.menelgame.pl';
var siglink = 'http://img.menelgame.pl';
//#EndRegion Global Variables

//#Region Test Functions
/** Funkcja wykonuje test mający na celu określenie czy z podanej zmiennej 
  * można bezpiecznie korzystać.
  * @param variable - zmienna do przetestowania
  * @returns 0 - zmienna niezdefiniowana bądź nie zainicjowana
  * @returns 1 - zmienna zainicjowana
  */
function varTest(variable){
  if ((variable == null)||(variable == undefined)) return 0;

  return 1;
}

function testInputs(){
  var minPoints = Number(document.getElementById('min_points').value);
  var maxPoints = Number(document.getElementById('max_points').value);
  var minCash = Number(document.getElementById('min_cash').value);
  var maxSites = Number(document.getElementById('max_sites').value);
  var alertMsg ='Błędne dane w:';
  var showAlert =false;
  
  if((isNaN(minPoints))||(minPoints < 0)){
    alertMsg += '\n- minimalnej ilości punktów';
    
    showAlert = true;
  }

  if((isNaN(maxPoints))||(maxPoints < 0)){
    alertMsg += '\n- maksymalnej ilości punktów';
    
    showAlert = true;
  }

  if((isNaN(minCash))||(minCash < 0)){
    alertMsg += '\n- minimalnej ilości pieniędzy';
    
    showAlert = true;
  }
  
  if((isNaN(maxSites))||(maxSites < 1)){
    alertMsg += '\n- ilości stron';
    
    showAlert = true;
  }

  if(showAlert){
    alert(alertMsg);
    showAlert = false;

    return 0;
  }

  if(minPoints > maxPoints){
    alert('Wartość minimalna punktów większa od maksymalnej.');
    
    return 0;
  }

  GM_setValue('minPoints', minPoints);
  GM_setValue('maxPoints', maxPoints);
  GM_setValue('minCash', minCash);
  GM_setValue('maxSites', maxSites);
  
  return 1;
}
//#EndRegion Test Functions

//#Region Opponent Data
function readUserInfo(xml){
  var userInfo = xml.getElementsByTagName('user')[0];
  var gangInfo = xml.getElementsByTagName('gang')[0];
  var user = {}; //new Object();
  var cash;
  
  user.id = userInfo.getElementsByTagName('id')[0].textContent;
  user.name = userInfo.getElementsByTagName('name')[0].textContent;
  user.gangId = gangInfo.getElementsByTagName('id')[0].textContent;
  user.gangName = gangInfo.getElementsByTagName('name')[0].textContent;
  user.position = userInfo.getElementsByTagName('position')[0].textContent;
  user.points = userInfo.getElementsByTagName('points')[0].textContent;
 
  try{
    user.cash = userInfo.getElementsByTagName('cash')[0].textContent;
  }catch(e){
    user.cash = '-';
  }

  if(!isNaN(Number(user.cash))){
    user.cash = Number(user.cash)/100;
  }
  
  return user;
}

function getOpponentInfo(id, minCash, attempt){
  GM_xmlhttpRequest({
    method: 'GET',
    url:    link + '/dev/api/user.' + id + '.xml',
    onload: function(response){
      if(response.responseText.search(/<\/Pennergame>/i) == -1){
        if(attempt > 5){
          return 0;
        }

        getOpponentInfo(id, minCash, attempt+1);
        
        return 0;
      }

      var opponentsTab = document.getElementById('opponentsTab').getElementsByTagName('tbody')[0];
      var parser = new DOMParser();
      var xml = parser.parseFromString(response.responseText, 'application/xml');
      var tr = document.createElement('tr');
      var user = readUserInfo(xml);
      
      if(user.cash >= minCash){
        tr.setAttribute('style', 'background-color: #444444;');

        tr.appendChild(createTableCell(user.position, 'style', 
          'font-weight: bold; color: white;'));
        tr.appendChild(createTableCell('<a href="/profil/id:' + user.id + '/" ' + 
          'style="text-decoration: none;">' + user.name + '</a>'));
        tr.appendChild(createTableCell('<a href="/profil/bande:' + user.gangId + '/" ' +
          'style="text-decoration: none;">' + user.gangName + '</a>'));
        tr.appendChild(createTableCell(user.points));
        tr.appendChild(createTableCell(user.cash.toFixed(2).replace('.', ',') + ' zł', 'style', 'text-align: right;'));
        tr.appendChild(createTableCell(' '));
        tr.appendChild(createTableCell('<a href="/messages/write/?to=' + user.id + '">' +
          '<img width="17" height="10" border="0" ' +
          'src="http://media.pennergame.de/img/overview/new_msg.gif"/></a>'));
        tr.appendChild(createTableCell('<a href="/fight/?to=' + user.name + '">' +
          '<img border="0" src="http://media.pennergame.de/img/att.gif"/></a>'));

        opponentsTab.appendChild(tr);
      }
    }
  });
}
//#EndRegion Opponent Data

//#Region Get Opponents
function getOpponentsList(index, min, max, minCash){
  GM_xmlhttpRequest({
    method: 'GET',
    url:    link + '/highscore/user/' + index + '/?max=' + max + '&min=' + min,
    onload: function(response){
      var div = document.createElement('div');
      div.innerHTML = response.responseText;
      var tabs = div.getElementsByTagName('table');
      var tab =null;
      var process = document.getElementById('process');
      var processCounter = document.getElementById('process_counter');
      var processValue =0;
      
      if(!varTest(tabs)){
        getOpponentsList(index, min, max, minCash);

        return 0;
      }

      for(i =0; i < tabs.length; i++){
        if(tabs[i].rows[0].cells[0].innerHTML.search(/ranking/i) != -1){
          tab = tabs[i];
        }
      }      

      if(!varTest(tab)) return 0;

      if(tab.rows.length - 2 < 1){
        return 0;
      }
      
      var reResp ='';
      for(i =1; i < tab.rows.length; i++){
        reResp = tab.rows[i].cells[1].innerHTML.match(/\/id:[\d]+/ig);
        
        if(reResp.length > 0){
          reResp = reResp[0].match(/[\d]+/g);
          
          getOpponentInfo(reResp[0], minCash, 0);
        }
      }
      
      processValue = parseInt(index/GM_getValue('maxSites')*100);
      process.setAttribute('style', 'width: ' + processValue + '%;');
      processCounter.innerHTML = processValue + '%';

      if(index < GM_getValue('maxSites')){
        getOpponentsList(index + 1, min, max, minCash);
      }
    }
  });
}

function searchOpponents(){
  if(!testInputs()){
    return 0;
  }

  document.getElementById('processbar_bg').removeAttribute('style');
  createOpponentsTable();

  getOpponentsList(1, GM_getValue('minPoints'), GM_getValue('maxPoints'),
    GM_getValue('minCash'));
}
//#EndRegion Get Opponents

//#Region SearchDiv
function createTableHeader(text, attrib, attribValue){
  var th = document.createElement('th');
  
  
  if(varTest(attrib)){
    if(attrib.length > 0){
      th.setAttribute(attrib, attribValue);
    }
  }
   
  th.innerHTML = text;

  return th;
}

function createTableCell(text, attrib, attribValue){
  var td = document.createElement('td');
  
  if(varTest(attrib)){
    if(attrib.length > 0){
      td.setAttribute(attrib, attribValue);
    }
  }

  td.innerHTML = text;

  return td;
}

function createOpponentsTable(){
  var opponentsTab = document.getElementById('opponentsTab');
  var tabBody = document.createElement('tbody');
  var row = document.createElement('tr');
  
  if(varTest(opponentsTab)){
    opponentsTab.parentNode.removeChild(opponentsTab);
  }

  opponentsTab = document.createElement('table'); 
  opponentsTab.setAttribute('id', 'opponentsTab');
  opponentsTab.setAttribute('border', '1');
  opponentsTab.setAttribute('style', 'margin-top: 20px;' +
    'border:1px solid #272727;' +
    'border-collapse: collapse;' +
    'table-layout: auto;' +
    'width: 740px;');

  row.setAttribute('bgColor', '#272727');

  row.appendChild(createTableHeader('Miejsce', 'width', '60'));
  row.appendChild(createTableHeader('Menel', 'width', '150'));
  row.appendChild(createTableHeader('Banda', 'width', '200'));
  row.appendChild(createTableHeader('Punkty', 'width', '85'));
  row.appendChild(createTableHeader('Pieniądze', 'width', '85'));
  row.appendChild(createTableHeader('Zwierzak', 'width', '120'));
  row.appendChild(createTableHeader('', 'width', '20'));
  row.appendChild(createTableHeader('', 'width', '20'));
  
  tabBody.appendChild(row);
  opponentsTab.appendChild(tabBody);
  document.getElementById('searchPanel').appendChild(opponentsTab);
}

function searchDiv(){
  var lsDivs = document.getElementsByClassName("listshop");
  var contentDiv =null;
  var searchPanel = document.createElement('div');

  for(i =0; i < lsDivs.length; i++){
    if(lsDivs[i].innerHTML.search(/atakuj gracza/i) != -1){
      contentDiv = lsDivs[i];
    }
  }

  if(varTest(contentDiv)){
    var processbar = document.createElement('div');
    var btnSearch = document.createElement('input');

    processbar.setAttribute('class', 'processbar_bg_ov');
    processbar.setAttribute('id', 'processbar_bg');
    processbar.setAttribute('style', 'display: none;');
    processbar.innerHTML = 
      '<div class="processbar_clean" id="process" style="width: 0%;"></div>' +
      ' Postęp: <span id="process_counter">0%</span>' +
      '</div>';

    btnSearch.type = "button";
    btnSearch.value = "Szukaj";
    btnSearch.addEventListener('click', searchOpponents, true);    

    searchPanel.setAttribute('id', 'searchPanel');
    searchPanel.setAttribute('class', 'listshop');
    searchPanel.innerHTML = 
      '       <table class="tieritemA" cellspacing="1" cellpadding="0" border="0">' +
      '         <tbody>' +
      '           <tr>' +
      '             <td colspan="2">' +
      '               <span class="tiername">Zaawansowane wyszukiwanie przeciwników | by lobo16</span>' +
      '               <hr size="1" />' +
      '             </td>' +
      '           </tr>' +
      '           <tr>' +
      '             <td style="width: 230px;">Minimalna ilość punktów przeciwnika:</td>' +
      '             <td><input id="min_points" type="text" value="' + GM_getValue('minPoints') + '" size="7" maxlength="7" style="margin: 0;" /></td>' +
      '           </tr>' +
      '           <tr>' +
      '             <td>Maksymalna ilość punktów przeciwnika:</td>' +
      '             <td><input id="max_points" type="text" value="' + GM_getValue('maxPoints') + '" size="7" maxlength="7" style="margin: 0;" /></td>' +
      '           </tr>' +
      '           <tr>' +
      '             <td>Minimalna  ilość pieniędzy przeciwnika:</td>' +
      '             <td><input id="min_cash" type="text" value="' + GM_getValue('minCash') + '" size="7" maxlength="7" style="margin: 0;" /></td>' +
      '           </tr>' +
      '            <tr>' +
      '             <td>Ilość stron do przejrzenia:</td>' +
      '             <td><input id="max_sites" type="text" value="5" maxlength="5" size="7" style="margin: 0;" /></td>' +
      '           </tr>' +
      '         </tbody>' +
      '       </table>';

    searchPanel.appendChild(btnSearch);
    searchPanel.appendChild(processbar);
    contentDiv.parentNode.insertBefore(searchPanel, contentDiv);
    contentDiv.parentNode.removeChild(contentDiv);
  }
}
//#EndRegion SearchDiv

function extendFightMenu(){
  var subMenus = document.getElementsByClassName('submenu');
  var fightMenu =null;

  for(i =0; i < subMenus.length; i++){
    if(subMenus[i].innerHTML.match(/\/fight\/overview\//ig).length > 0){
      fightMenu = subMenus[i];
    }
  }
  
  if (varTest(fightMenu)){
    var menuItem = document.createElement("li");
    menuItem.innerHTML = "<a style='height: 30px;' href='javascript:void(0);'>Zaawansowane szukanie</a>";
    menuItem.addEventListener("click", searchDiv, false);
    
    fightMenu.appendChild(menuItem);
    
    return 1;
  }
  
  return 0;
}

function getPointsRange(){
  var reRes = document.documentElement.textContent.match(/od [\d]+ do [\d]+ punkt/ig);

  if(varTest(reRes)){
    if(reRes.length > 0){
      reRes = reRes[0].match(/[\d]+/g);

      GM_setValue('minPoints', reRes[0]);
      GM_setValue('maxPoints', reRes[1]);
    }
  }
}

if(GM_getValue('minCash') == undefined){
  GM_setValue('minCash', '50000');
}

getPointsRange();
extendFightMenu();
