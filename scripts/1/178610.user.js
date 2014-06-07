// ==UserScript==
// @name             Plus [GW]
// @namespace        GW
// @description      Руководитель боя.
// @include          http://www.ganjawars.ru/warlog.php?bid=*
// @version          0.6
// @author           z0man
// ==/UserScript==
(function(){
var sindNumber = 1743;
var sindUrlAll = 'http://www.ganjawars.ru/syndicate.php?id=' + sindNumber + '&page=members';
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var request = new XMLHttpRequest();
var answer_page = new String();
var td = root.document.getElementsByTagName('td');
for (var i = 0; i < td.length; i++) {
    if (td[i].textContent.indexOf('Режим наблюдения за боем')!=-1) {
    var red = new RegExp('<font color="red"><\\!-- s'+sindNumber+' -->.*\\[\\d+\\]<!-- d'+sindNumber+' --><\\/font>(?=.*vs)');
    red = red.exec(td[i].getElementsByTagName('span')[0].innerHTML);
    var blue = new RegExp('<font color="blue"><\\!-- s'+sindNumber+' -->.*\\[\\d+\\]<!-- d'+sindNumber+' --><\\/font>');
    blue = blue.exec(td[i].getElementsByTagName('span')[0].innerHTML);
    if (red) {
      var sideUsers = getUsers(td[i].previousSibling, false);
      var startUsers = (red.toString()).match(/[^>]+(?=\[)/g);
      var colorUser = (red.toString()).match(/[^>]+(?=\<\/font>)/g);
      if (startUsers && colorUser != null) { startUsers = startUsers.concat(colorUser); };
    };
    if (blue) {
      var sideUsers = getUsers(td[i].nextSibling, false);
      var startUsers = (blue.toString()).match(/[^>]+(?=\[)/g);
      var colorUser = (blue.toString()).match(/[^>]+(?=\<\/font>)/g);
      if (startUsers && colorUser != null) { startUsers = startUsers.concat(colorUser); };      
    };
    inUsers = (td[i].getElementsByTagName('span')[0].innerHTML).match(/<font color="#880000">.*?входит в бой.+?<\/font><br>/g);
    plusUsers = (td[i].getElementsByTagName('span')[0].innerHTML).match(/\*\*\*.*?<\/font><br>/g);
    var i0 = 0;
    if (inUsers) {
      var sindAllMain = new Array();
      getSindAllMain();
      for (t = 0; t < inUsers.length; t++) {
        var inStr = inUsers[t].match(/[^<font color="#880000">].+?(?= входит в бой)/g);
        if (!inUsersAll) { var inUsersAll = ''; };
        if ((inStr.toString()).length > 14 && ((inStr.toString()).indexOf('</font>'))!=-1) {
          var meUser = (inStr.toString()).substring(7, parseInt((inStr.toString()).indexOf('</font>')));
          inUsersAll += meUser;
          i0++;
        };
        if (sindAllMain.indexOf(inStr[0])!=-1) { inUsersAll += inStr[0] + ','; i0++; };
      };
    };
    var i1 = 0;
    if (plusUsers) {
      if (!inUsersAll) { var inUsersAll = ''; };
      for (m = 0; m < plusUsers.length; m++) {
        var plusStr = plusUsers[m].match(/[^<b>]+(?=<)/g);
        if (!sindAllMain) { var sindAllMain = new Array(); getSindAllMain(); };
        if (plusStr[3] == '+' && sindAllMain.indexOf(plusStr[1])!=-1 && inUsersAll.indexOf(plusStr[1])==-1 && startUsers.indexOf(plusStr[1])==-1) {
          if (!readyUsers) { var readyUsers = plusStr[1] + getUserInfo(plusStr[1]); i1++; };
          if (readyUsers.indexOf(plusStr[1])==-1) {
            readyUsers += (plusStr[1])+getUserInfo(plusStr[1]); i1++;
          };
        };
      };
    };
    var addInfo = root.document.createElement('table');
    var isButton = '';
    if (startUsers && sideUsers.length!=0 && startUsers.length-sideUsers.length!=0) { isButton = ' || Кнопка есть!'; };
    if (startUsers && startUsers.length > 1) {
      if (readyUsers) {
        addInfo.innerHTML = '<tbody><tr><td><font class=txt>Осталось замен: <b>'+((startUsers.length)-i0)+'</b> || Готовы заменить: <b>'+i1+'</b>'+isButton+'<br><br>'+readyUsers+'</font></td></tr></tbody>';
      } else {
        addInfo.innerHTML = '<tbody><tr><td><font class=txt>Осталось замен: <b>'+((startUsers.length)-i0)+'</b>'+isButton+'<br></font></td></tr></tbody>';
      };
      var center = root.document.getElementsByTagName('center');
      for (var j = 0; j < center.length; j++) {
        if (center[j].textContent.indexOf('Режим наблюдения за боем')!=-1) {
          var parent = center[j];
          break;
        };
      };
      parent.parentNode.replaceChild(addInfo, parent);
      break;
    }
  }
}
function getSindAllMain(){
  REQ(sindUrlAll, 'GET', null, false, function (req) { answer_page = req.responseText });
  var div = root.document.createElement('div');
  div.innerHTML = answer_page;
  var tmp = div.getElementsByTagName('td');
  for (var i = 0; i < tmp.length; i++) {
    if (tmp[i].textContent.indexOf('Состав синдиката')!=-1) {
      sindAllMain = getUsers(tmp[i].parentNode.parentNode, true); // true = проверять значек!
      break;
    };
  };
}
function getUserInfo(name){
  var result = ': без оружия!<br>';
  REQ('http://www.ganjawars.ru/search.php?key='+name, 'GET', null, false, function (req) { answer_page = req.responseText });
  var span = root.document.createElement('span');
  span.innerHTML = answer_page;
  tmp = span.getElementsByTagName('tr');
  for (var i = 0; i < tmp.length; i++) {
    if (tmp[i].textContent.indexOf('Вооружение')!=-1 && tmp[i].nextSibling.nextSibling.textContent.indexOf(' рука: ')!=-1) {
      if (tmp[i].nextSibling.nextSibling.textContent.indexOf(' рука: ') == tmp[i].nextSibling.nextSibling.textContent.lastIndexOf(' рука: ')) {
        result = ': ' + tmp[i].nextSibling.nextSibling.innerHTML.match(/<b>.*?<\/b>/g)[0] + '<br>';
      } else {
        result = ': ' + tmp[i].nextSibling.nextSibling.innerHTML.match(/<b>(.*?)<\/b>/g)[1] + ', '+ tmp[i].nextSibling.nextSibling.innerHTML.match(/<b>(.*?)<\/b>/g)[0] + '<br>';
      };
      break;
		}
	}
  return(result);
}
function getUsers(obj, check){
  var tmpArray = new Array();
  var b = obj.getElementsByTagName('b');
  var j = 0;
  if (!check) {
    for (k = 0; k < b.length; k++) {
      if (b[k].parentNode.href) {
        if (b[k].parentNode.parentNode.innerHTML.indexOf('info\.php\?id=')!=-1) {
          tmpArray[j] = b[k].textContent;
          j++;
        };
      };
    };
  } else {
    for (k = 0; k < b.length; k++) {
      if (b[k].parentNode.previousSibling) {
        if (b[k].parentNode.previousSibling.href == ('http://www.ganjawars.ru/syndicate.php?id=' + sindNumber)) {
          tmpArray[j] = b[k].parentNode.textContent;
          j++;
        }
      }
    }
  }
  return(tmpArray);
}
function REQ(url, method, param, async, onsuccess, onfailure){
	request.open(method, url, async);
	request.send(param);
	if (request.readyState == 4 && request.status == 200 && typeof onsuccess != 'undefined') onsuccess(request);
	else if (request.readyState == 4 && request.status != 200 && typeof onfailure != 'undefined') onfailure(request);
}
})();