// ==UserScript==
// @name            HideSectionsAndUsers
// @namespace       hidesectionsandusers
// @description     Скрывает темы указанных разделов на главной странице или сообщения указанных пользователей
// @include         http://86hm.ru/forum/*
// @version         1.0
// @icon            http://www.admhm.ru/upload/rtf/111/792_gerb.gif
// ==/UserScript==

// V 1.0 (at 9 Dec 2010)

  var sectionsToBlock = [ 'Раздел1','Раздел2' ]; // список блокируемых разделов
  var registeredUsersToBlock = [ 'User1','Пользователь2' ]; // список блокируемых зарегистрированных пользователей
  var unregisteredUsersToBlock = [ 'User3','Пользователь4' ]; // список блокируемых незарегистрированных пользователей

  var sectionsToBlockQuery = '//tr[contains(td[1]/span[2]/text(),"('
                + sectionsToBlock.join(')") or contains(td[1]/span[2]/text(),"(') + ')")]';
  var regUsersToBlockQuery = '|//tr[td/@class="info-user" and (td/a/text()="'
                + registeredUsersToBlock.join('" or td/a/text()="') + '")]';
  var unregUsersToBlockQuery = '|//tr[td/@class="info-user" and (contains(td/text()[2]," '
                + unregisteredUsersToBlock.join(' ") or contains(td/text()[2]," ') + ' "))]';

  var hideLinks = document.evaluate( 
                sectionsToBlockQuery + regUsersToBlockQuery + unregUsersToBlockQuery
                ,document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

  var grayLinks = document.evaluate(
                '//a[../../@id="sidebar-menu" and (text()="' + sectionsToBlock.join('" or text()="') + '")]'
                ,document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

  for (var i = 0; i < hideLinks.snapshotLength; i++)
                hideLinks.snapshotItem(i).style.display="none"; 

  for (var i = 0; i < grayLinks.snapshotLength; i++)
                grayLinks.snapshotItem(i).style.color="#D3D3D3"; 
