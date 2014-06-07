// =============================================================================
// EchoFilter.user.js
//
// Пользовательский скрипт для GreaseMonkey,
// который автоматически подсвечивает или скрывает комментарии
// отдельных пользователей сайта echo.msk.ru.
// http://userscripts.org./scripts/show/83292
//
// Перед установкой рекомендуется отредактировать списки (через запятую, в двойных кавычках):
// gmHide("comment", [ список тех, чьи сообщения будут скрыты ] );
// gmHide("thread",  [ список тех, чьи ветки будут скрыты ] );
// gmColor("цвет",   [ список тех, чьи комментарии будут подсвечены выбранным цветом ] );
// Не забудьте раскомментировать нужные строки.
//
// Для установки скрипта сохраните его под именем EchoFilter.user.js,
// измените настройки в списках, снова сохраните,
// и перетащите иконку получившегося файла на любую открытую страничку в браузере.
// Естественно, перед этим у Вас должен быть установлен плагин
// GreaseMonkey (http://greasemonkey.mozdev.org/).
// Для обновления любого из списков - отредактируйте файл EchoFilter.user.js,
// и снова перетащите его на любую открытую страничку в браузере
// или отредактируйте его средствами GreaseMonkey.
// 
// История:
//   08-08-2010  Первая редакция, Ярослав Богатов.
//   09-08-2010  Добавлены "зеленый список" и корректная работа с www.echo.msk.ru.
//   10-08-2010  Добавлены разноцветные списки, обработка вынесена в процедуры.
//   11-08-2010  Добавлена возможность интерактивного просмотра скрытых сообщений.
//               Исправлено позиционирование документа после скрытия сообщений.
//   13-08-2010  Добавлена правка верстки сайта:
//               вынос правой панели на всех страницах, кроме главной;
//               расширение полей ввода комментариев.
//   08-01-2011  Добавлена возможность отображать имя и дату регистрации комментаторов.
//               (по умолчанию - отключена, для включения - раскомментируйте gmAddName();)
//               Добавлена возможность отображать все комментарии на первой странице.
//               Правка верстки сайта вынесена в процедуру.
//               Исправлено позиционирование документа после всех изменений.
//   09-01-2011  Оптимизирована подгрузка дополнительных данных о комментаторах.
//               Добавлена возможность скрывать сообщения и ветки вручную.
//               Исправлена очередность исполнения изменений.
// =============================================================================

// ==UserScript==
// @name echo.msk.ru forum filter
// @description echo.msk.ru forum reader's assistance.
// @namespace EchoMsk
// @include http://echo.msk.ru/*
// @include http://www.echo.msk.ru/*
// ==/UserScript==

// Правка верстки сайта.
gaFixLayout();

// Отображать все комментарии на первой странице.
gmAllInOne();

// Отображать имя и дату регистрации комментаторов. ВНИМАНИЕ: Увеличивает время загрузки!
gmAddName();

// Список пользователей, чьи комментарии Вы хотите выделить подсветкой.
//gmColor("#FFDDDD", [ "yaroslav_bogatov", "ivan_ss" ] ); // Красный список
gmColor("#DDFFDD", [ "yaroslav_bogatov", "ivan_ss" ] ); // Зеленый список
//gmColor("#DDDDFF", [ "yaroslav_bogatov", "ivan_ss" ] ); // Синий список
//gmColor("#FFFFDD", [ "yaroslav_bogatov", "ivan_ss" ] ); // Желтый список
//gmColor("#FFDDFF", [ "yaroslav_bogatov", "ivan_ss" ] ); // Коричневый список
//gmColor("#DDFFFF", [ "yaroslav_bogatov", "ivan_ss" ] ); // Бирюзовый список

// Добавить кнопки скрытия сообщений
gmAddCtl();

// Список пользователей, чьи комментарии Вы не хотите видеть.
// gmHide("comment", [ "yaroslav_bogatov", "ivan_ss" ] ); // Черный список комментариев
// gmHide("thread",  [ "yaroslav_bogatov", "ivan_ss" ] ); // Черный список веток

// Позиционирование документа после всех изменений.
gmPos();

// Процедуры
// =============================================================================
function gaFixLayout() {
  if(document.URL.search(/echo\.msk\.ru\/?$/i)==-1)
    document.getElementsByClassName("outer")[0].style.marginRight="0";
  document.getElementById("comment_subject").style.width="700";
  document.getElementById("comment_body").style.width="800";
  document.getElementById("comment_body").style.height="400";
  if(document.getElementById("comment_body").value.indexOf("http://userscripts.org/scripts/show/83292")==-1)
    document.getElementById("comment_body").value += "\u000A\u000A\u0427\u0438\u0442\u0430\u0439 \u0447\u0435\u0442\u0447\u0435: http://userscripts.org./scripts/show/83292";
}

function gmAllInOne() {
  var hRequest = new XMLHttpRequest();
  var aCacheURL = [];
  var aDivs = document.getElementsByTagName('div');
  for(i = aDivs.length-1; i >= 0; --i) {
    if(aDivs[i].className=='pagination') {
      if(aDivs[i].innerHTML.indexOf('<span class="current">1</span>')<0) {
        return;
      }
      var aPages = aDivs[i].getElementsByTagName('a');
    }
    if(aDivs[i].className=='print') {
      var insNode = aDivs[i]; break;
    }
  }
  if(insNode) {
    for(i = 0; i < aPages.length; ++i) {
      if(aCacheURL.indexOf(aPages[i].href) < 0) {
        hRequest.open('GET', aPages[i].href, false);
        hRequest.send(null);
        if(hRequest.readyState==4) {
          aCacheURL.push(aPages[i].href);
          var newDoc = document.createElement('div');
          newDoc.innerHTML = hRequest.responseText;
          var newDivs = newDoc.getElementsByTagName('div');
          for(d = 0; d < newDivs.length; ++d) {
            if((newDivs[d].className=='thread') && (newDivs[d].parentNode.id=='comments')) {
              var addDiv = document.createElement('div');
              addDiv.className = 'thread';
              addDiv.innerHTML = newDivs[d].innerHTML;
              insNode.parentNode.insertBefore(addDiv, insNode);
            }
          }
          aCacheURL.push(aPages[i].href);
        }
      }
    }
  }
}

function gmAddName() {
  var aCacheURL = [];
  var aCacheHit = [];
  var hRequest = [];

  var aLinks = document.links;
  for (i=aLinks.length-1; i>=0; --i) {
    if((aLinks[i].href.search("\/users\/")>0) && (aLinks[i].parentNode.className=='name')) {
      var iCache = aCacheURL.indexOf(aLinks[i].href);
      if(iCache < 0) {
        iCache = aCacheURL.length;
        aCacheURL.push(aLinks[i].href);
        hRequest.push(new XMLHttpRequest());
        hRequest[iCache].open('GET', aCacheURL[iCache], true);

        hRequest[iCache].onreadystatechange = function() {
          if(this.readyState==4) {
            for(r=0; r< hRequest.length; ++r)
              if(hRequest[r]==this)
                break;

            aCacheHit[r] = 
              this.responseText
              .match(/<p>\u0418\u043C\u044F\: <strong>.*<\/strong><\/p>/)[0]
              .replace(/<p>\u0418\u043C\u044F\: <strong>(.*)<\/strong><\/p>/, '$1')
              +this.responseText
              .match(/<p>\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\: .*<\/p>/)[0]
              .replace(/<p>\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\: (.*)<\/p>/, ' ($1)')
            ;

            var acLinks = document.links;
            for (l=acLinks.length-1; l>=0; --l) {
              if(acLinks[l].href==aCacheURL[r]) {
                 acLinks[l].parentNode.innerHTML += aCacheHit[r];
              }
            }
          }
        }
        hRequest[iCache].send(null);
      }
    }
  }
}

function gmColor(inColor, inList) {
  var aLinks = document.links;
  for (i=aLinks.length-1; i>=0; --i) {
    var oElement = aLinks[i];
    var sUserName = oElement.href.substr(oElement.href.search("\/users\/")+7, oElement.href.length-oElement.href.search("\/users\/")-8 );
  
    if (inList.indexOf(sUserName) > -1) {
      while (oElement && oElement.className.search("comment") == -1) 
        oElement = oElement.parentNode;
      if (oElement)
        oElement.style.backgroundColor = inColor;
    }
  }
}

function gmAddCtl() {
  var aLinks = document.links;
  for (i=aLinks.length-1; i>=0; --i) {
    if((aLinks[i].href.search("\/users\/")>0) && (aLinks[i].parentNode.className=='name')) {

      var sUserName = aLinks[i].href.substr(aLinks[i].href.search("\/users\/")+7, aLinks[i].href.length-aLinks[i].href.search("\/users\/")-8 );

      aLinks[i].parentNode.innerHTML =
        '\u00A0<span style="background-color:white; border:solid 1px red; -moz-border-radius:5px; cursor:pointer;" title="\u0421\u043A\u0440\u044B\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435">\u00A0\u2718\u2709\u00A0</span>'+
        '\u00A0<span style="background-color:white; border:solid 1px red; -moz-border-radius:5px; cursor:pointer;" title="\u0421\u043A\u0440\u044B\u0442\u044C \u0432\u0435\u0442\u043A\u0443">\u00A0\u2718\u21B3\u00A0</span>\u00A0'+
        aLinks[i].parentNode.innerHTML;
      aLinks[i].parentNode.getElementsByTagName('span')[0].setAttribute("onClick", "this.parentNode.parentNode.parentNode.previousSibling.style.display=''; this.parentNode.parentNode.parentNode.style.display='none'; return true;");
      aLinks[i].parentNode.getElementsByTagName('span')[1].setAttribute("onClick", "this.parentNode.parentNode.parentNode.parentNode.previousSibling.style.display=''; this.parentNode.parentNode.parentNode.parentNode.style.display='none'; return true;");

      var oReplacement = document.createElement("div");
      oReplacement.style.border = "thin solid #E0E0E0"; oReplacement.style.display = "none"; oReplacement.style.background = "#E0E0E0"; oReplacement.style.maxWidth = "712px"; oReplacement.style.cursor = "pointer"; oReplacement.style.fontSize = "0.75em";
      oReplacement.setAttribute("onClick", "this.nextSibling.style.display = ''; this.style.display = 'none'; return true;");
      oReplacement.innerHTML = "&#1050;&#1086;&#1084;&#1084;&#1077;&#1085;&#1090;&#1072;&#1088;&#1080;&#1081; "+sUserName;
      aLinks[i].parentNode.parentNode.parentNode.parentNode.insertBefore(oReplacement, aLinks[i].parentNode.parentNode.parentNode);

      oReplacement = document.createElement("div");
      oReplacement.style.border = "thin solid #E0E0E0"; oReplacement.style.display = "none"; oReplacement.style.background = "#E0E0E0"; oReplacement.style.maxWidth = "712px"; oReplacement.style.cursor = "pointer"; oReplacement.style.fontSize = "0.75em";
      oReplacement.setAttribute("onClick", "this.nextSibling.style.display = ''; this.style.display = 'none'; return true;");
      oReplacement.innerHTML = "&#1042;&#1077;&#1090;&#1082;&#1072; "+sUserName
      aLinks[i].parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(oReplacement, aLinks[i].parentNode.parentNode.parentNode.parentNode);
    }
  }
}

function gmHide(inWhat, inList) {
  var aLinks = document.links;
  for (i=aLinks.length-1; i>=0; --i) {
    if((aLinks[i].href.search("\/users\/")>0) && (aLinks[i].parentNode.className=='name')) {
      var sUserName = aLinks[i].href.substr(aLinks[i].href.search("\/users\/")+7, aLinks[i].href.length-aLinks[i].href.search("\/users\/")-8 );
      if (inList.indexOf(sUserName) > -1) {
        if (inWhat=="thread") {
          aLinks[i].parentNode.parentNode.parentNode.parentNode.previousSibling.style.display='';
          aLinks[i].parentNode.parentNode.parentNode.parentNode.style.display='none';
        } else {
          aLinks[i].parentNode.parentNode.parentNode.previousSibling.style.display='';
          aLinks[i].parentNode.parentNode.parentNode.style.display='none';
        }
      }
    }
  }
}

function gmPos() {
  if (document.URL.indexOf('#') >= 0) {
    var aAnchors = document.anchors;
    for (i = aAnchors.length-1; i >= 0; --i) {
      if(aAnchors[i].href.indexOf('#') >= 0) {
        if(document.URL.indexOf(aAnchors[i].href) >= 0) {
          oNode = aAnchors[i];
          offset = 0;
          while(oNode) {
            offset += oNode.offsetTop;
            oNode = oNode.offsetParent;
          }
          window.scrollTo(0, offset);
          break;
        }
      }
    }
  }
}

// =============================================================================