// ==UserScript==
// @name           Kapi Hospital - Asystent menedżera
// @namespace      http://userscripts.org/scripts/show/100952
// @description    Asystent menedżera dla Kapi Hospital
// @version        0.1.2011041102
// @include        http://pl.kapihospital.com/
// @include        http://pl.kapihospital.com/logout.php
// @include        http://s*.pl.kapihospital.com/main.php
// ==/UserScript==

window.addEventListener("load", dispatch, false);

//*** Global variables *********************************************************

const VERSION = '0.1.2011041102';
const USO_ID = '100952';
const USO_URL = 'http://userscripts.org/scripts/show/'+USO_ID;
var nodeMainContainer;
var nodeInfoBox;
var nodeStausBar;
var objImages;
var objDivImages;

//*** Functions ****************************************************************

function dispatch() {
  strURL = document.location.href;
  if (strURL == 'http://pl.kapihospital.com/logout.php') {
    if (!GM_getValue("isManualLogout", false)) {
      login();
    }
    else {
      GM_setValue("isManualLogout", false);
    }
  }
  else if (strURL == 'http://pl.kapihospital.com/') {
    login();
  }
  else if ((/^http\:\/\/s\d+\.pl\.kapihospital\.com\/main\.php$/).test(strURL)) {
    main();
  }
}

function main() {
  populateDataObjects();
  nodeMainContainer = $('toplevel').parentNode;
  nodeInfoBox = createElement('div', {class: 'customInfoBox'}, document.body);
  nodeStatusBar = createElement('div', {class: 'customStatusBar'}, nodeMainContainer);
  GM_addStyle("\
    .customInfoBox { float:left; position:absolute; display:none; z-index:100; padding:5px; background-color:#def; border:1px solid #48f; border-radius:10px; } \
    .customStatusBar { float:left; height:20px; position:absolute; bottom:0; right:0; padding:0 5px; text-align: right; color:yellow; font-weight:bold; line-height:20px; } \
  ");
  $('logout').addEventListener("click", manualLogout, false);
  addCustomMiniIcons();
  checkUpdate();
}

function login() {
  if ($("l_loginname").value != "") {
	$("login_form").getElementsByClassName("kh_btn")[0].click();
  }
}

function manualLogout() {
  GM_setValue("isManualLogout", true);
}

function addCustomMiniIcons() {
  GM_addStyle(".customMiniIcon { width:16px; height:16px; margin-bottom:5px; } .customLocationName { padding: 0 10px; line-height: 50px; font-size: 1.5em; font-weight: bold; }");
  var nodeCustomIcons = createElement('div', {id: 'customMiniIcons', style: 'height: 600px; position: absolute; width: 16px; z-index: 10; top: 130px; left: 741px;'}, nodeMainContainer);
  nodeCustomIcons.appendChild(createMiniIcon('city1',          'Katarowice',                 "Map.jumpTo('city1');"));
  nodeCustomIcons.appendChild(createMiniIcon('garage',         'Garaż',                      "show_page('garage');"));
  nodeCustomIcons.appendChild(createMiniIcon('shop1',          'Apteka Szałpiguł',           "show_page('shop1');"));
  nodeCustomIcons.appendChild(createMiniIcon('shop2',          'Hurtownia G.Rypa',           "show_page('shop2');"));
  nodeCustomIcons.appendChild(createMiniIcon('exchange',       'Giełda pacjentów',           "show_page('exchange');"));
  nodeCustomIcons.appendChild(createMiniIcon('office',         'Biuro',                      "PlayersOffice.open();"));
  nodeCustomIcons.appendChild(createMiniIcon('bank',           'Bank',                       "show_page('bank');"));
  nodeCustomIcons.appendChild(createMiniIcon('guildhouse',     'Zwiazek lekarzy i konkursy', "show_page('guildhouse');"));
  nodeCustomIcons.appendChild(createMiniIcon('speakers',       'M. Gafon',                   "show_page('speakers');"));
  nodeCustomIcons.appendChild(createMiniIcon('townhall',       'Ratusz',                     "show_page('townhall');"));
  nodeCustomIcons.appendChild(createMiniIcon('busstop',        'Przystanek autobusowy',      "show_page('busstop');"));
  nodeCustomIcons.appendChild(createMiniIcon('goodgirl',       'Panienka z okienka',         "show_page('goodgirl');"));

  nodeCustomIcons.appendChild(createMiniIcon('city2',          'Złamkowo',                   "Map.jumpTo('city2');", "margin-top: 16px;"));
  nodeCustomIcons.appendChild(createMiniIcon('shop3',          'Kafejka internetowa',        "show_page('shop3');"));
  nodeCustomIcons.appendChild(createMiniIcon('shop4',          'Sklepik pani Wandzi',        "show_page('shop4');"));
  nodeCustomIcons.appendChild(createMiniIcon('architect',      'Biuro architektoniczne',     "show_page('architect');"));
  nodeCustomIcons.appendChild(createMiniIcon('ambulancestore', 'Autokomis',                  "show_page('ambulancestore');"));
  nodeCustomIcons.appendChild(createMiniIcon('rcenter',        'Instytut badawczy',          "show_page('rcenter');"));
  nodeCustomIcons.appendChild(createMiniIcon('badboy',         'Dr S. Raczek',               "show_page('badboy');"));
  
  nodeCustomIcons.appendChild(createMiniIcon('about',          'Asystent menedżera v'+VERSION, function() { GM_openInTab(USO_URL); }, "margin-top: 16px;"));
}

function createDivImage(strName, strStyles) {
  if (!objDivImages.hasOwnProperty(strName)) {
    return createElement('div');
  }
  var objDivImage = objDivImages[strName];
  return createElement('div', {style: "\
    width:"+objDivImage.width+"px; \
    height:"+objDivImage.height+"px; \
    background-image:url("+objImages.get(objDivImage.image)+"); \
    background-position:-"+(objDivImage.width*objDivImage.x)+"px -"+(objDivImage.height*objDivImage.y)+"px;\
    " + (strStyles ? ' '+strStyles : '')
    }
  );
}

function createMiniIcon(strImageName, strTitle, varOnClick, strStyles) {
  var nodeIcon = createDivImage(strImageName+'_16', strStyles);
  nodeIcon.setAttribute('class', 'customMiniIcon cursorclickable');
  if (typeof(varOnClick) == 'function') {
    nodeIcon.addEventListener('click', varOnClick, false);
  }
  else if (typeof(varOnClick) == 'string') {
    nodeIcon.setAttribute('onclick', varOnClick);
  }
  var nodeContent = createElement('div', {style:"width:auto; height:auto;"});
  nodeContent.innerHTML = '<span class="customLocationName">'+strTitle+'</span>';
  nodeContent.appendChild(createDivImage(strImageName+'_50', 'float:right;'));
  nodeIcon.addEventListener('mouseover', function() { var objPosition = relativePosition(this); showInfoBox({ right:(document.body.offsetWidth-objPosition.x+30)+'px', top:(objPosition.y-65)+'px' }, nodeContent); }, false);
  nodeIcon.addEventListener('mouseout', hideInfoBox, false);
  return nodeIcon;
}

function showInfoBox(objPosition, nodeContent) {
  if (objPosition.hasOwnProperty('left')) {
    nodeInfoBox.style.left = objPosition.left;
    nodeInfoBox.style.right = '';
  }
  if (objPosition.hasOwnProperty('right')) {
    nodeInfoBox.style.right = objPosition.right;
    nodeInfoBox.style.left = '';
  }
  if (objPosition.hasOwnProperty('top')) {
    nodeInfoBox.style.top = objPosition.top;
    nodeInfoBox.style.bottom = '';
  }
  if (objPosition.hasOwnProperty('bottom')) {
    nodeInfoBox.style.bottom = objPosition.bottom;
    nodeInfoBox.style.top = '';
  }
  nodeInfoBox.innerHTML = "";
  nodeInfoBox.appendChild(nodeContent);
  nodeInfoBox.style.display = 'block';
}

function hideInfoBox() {
  nodeInfoBox.style.display = 'none';
}

function setStatus(strText, append) {
  nodeStatusBar.innerHTML = (append ? nodeStatusBar.innerHTML : '')+strText;
}

function checkUpdate() {
  var intNow = new Date().getTime();
  if (intNow > parseInt(GM_getValue('lastUpdate', '0')) + 1000*60*60*6) { // 6h
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://userscripts.org/scripts/source/'+USO_ID+'.meta.js?'+intNow,
      headers: {'Cache-Control': 'no-cache'},
      onload: function(objResponse) {
        var strRemoteVersion = /^\/\/\s*@version\s+(.*)\s*$/m.exec(objResponse.responseText)[1];
        if (strRemoteVersion > VERSION) {
          setStatus('<img src="'+objImages.get('warning')+'" style="vertical-align: middle;" /> <span style="text-decoration:blink;">Jest dostępna nowa wersja asystenta!</span> <a href="'+USO_URL+'" target="_blank" style="color:#0f0;">Do strony asystenta...</a>');
        }
        GM_setValue('lastUpdate', ''+intNow);
      }
    });
  }
}

function populateDataObjects() {
  objImages = {
    get: function(strName) {
      if (this.objImageURL.hasOwnProperty(strName)) {
        return this.objImageURL[strName];
      }
      else {
        return this.objImageURL.blank;
      }
    },
    objImageURL: {
      about:          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAz9JREFUeNpMU1toE0EUPcnuJmmT2qpt0kZqaIOmtr7A+sIX8YWCbRXtTzEqqB+CqPj4ERH11w8RFPFHKEjz0Upa/BBE8YWVxIrRok0TY03Q2KSmSZNN89pNvbOKduDszM7cc+6dO/eqOjo6oFKpoFarlZlQQ1gCwESYgz8jRYjOzMyMECYIKJVKYDOP/0NLWGOxWDZ0dnZ2NTY2LpMkSTngeR7BYHC4t7e3JxQKvaYtDyHPzrimpibmlZF3trW1HXQ4HOeGRmFyPUvi3sMUHr4SEQhlwGv0pq4DW7ZTpJzf72fkEEHmbDYbC2Vje3v7QbvdfujSnSh8kXLoKupQW2tCdXU1ciU93hPnxds4Du+zreA4TiKRCSbCy7Jsamho2LRt21bHxdtRaOeYgWwBN0/PnXU7Pa7czSAYEXD5bhSXj25xeL1efzgc9nFWq3Xt8ePHLgwOF42BaAU0Gi0SiTTi8TjcHycwmZKwyFKBYDiJrz8pm9MlqEtprF5uNrndnncsAnN9fX1Lz9MfMBiMGB+PKz4HXuaQyUxj8/I4jOURBAJJeDxTMJuN+BCQsW5vXQvjqulTlU6L+DwmQZZLyOcLiMYm8T0SQ2OdhK5dlRgNF/Hg+TRUnAZipqDYZrM5MC5PT8VEIEkyUmIOsclpkA6gEnDthEWJ5uq9cXAavbKWZniyVchgXCaQ5jgei+sppckCPXo5uL+p23P225860FX9S2cJkmILqJlAmnmPBAJffEutWqRTSZTpK8mbQTF4071KAVuzPQa5mEVLgwZjY998jMsEPjqdTteOtdWYXyZCyk1B0JKxoPvnla05gcj5NBZUZWFvnYuBAZeLcTmj0SgmEpMCXbrszFF785NXfozHknSTebj/jEP3Y4lCLSAVC6BWH8eN8y3o7+974HYPuqgAvdzfxvgxMvJJTf2hvnSqvalSl0cmPoZh71tMRX1YuTCH/fYanD/SDKezu7+vr8eVzWYfJRIJSaVcENBptdp5BoPBbrM1rzl58sLu1tb11lmliKGhN8Fbt64/Gh397BFF8Xk+n2cFk2MCLOkszfMJBkEQqqj7rNQ0NbPbmaKcoKwHi8Vikv4zhF+E5G8BBgCmR5O7x7m+vQAAAABJRU5ErkJggg==',
      ambulancestore: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwAWCiA3hPwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADkElEQVQ4y12TW0xbdQDGv/+59PTA6fVQLh1tuRQooS0zEDBGlIdtZHtQ4zBGssQXTJx7kERelvhi4pJ5i4kPosPFF43uYfGeOWGZwLgMtriL2wyErmWwltJjS0/L6WlP+/dFl8Xv7Uu+3/f2I/h/5E9sg0Pe7nKlcqzOJYYqoNxOqrCeyerfRGP5BfXP0Z3H5+Tx4n3qzJETo/tP1dda97vdIlRNR6FowDDKeLCVRySa3Zi+HD8dm3l1QgpNInf7tUcHY4z1RXLopTdPOR2iSNmrWF1XaSlHicXhhEO2wOOTqatGIttJDee+3Tid+WP0JOv/DKStvfWDkWOvjBukClZ7DdIaS3Pbt0nDPjd4nsXu32moqo65pW1I3idAaR2VZJDpi+lRY+3EWU522G7V11TDKdthEswA4YjRGoaWU5HcjEEWWewqAbhrXsdzgxdw8VIjScd+hDl7d7wU+v481+jpupfPGzCbC0jEU1heuYne3jDMHEVjexgm2QOLvwZtSR2UljAwcBVG0QmuYg9MrXwXZJZjYZ+ms6CsAMqwWFy6hdm5a/B4G/HW2NsoKhn0B6vh9kXQ3dOP1TtrmLrwOzKJvyAYiaOcyjjCtdEvYF3fgujuRq1UgapTFA2KFr8f/f39sFjsuL+6CpEp4MbKMnS9hOyeBiJ4uziGYcR42zDMu7OwxK/jnVAaMCkozsfRYuFBsw+xR4uYX7yGSo8XZkGATzLQ4KY4e5eInMCR2FqchSc4gGTzIHhdgZDbhqQnEQyYkP7pDehaCbmZDfDWAxhpSsHX3gZF7sasspRnXYFhfTsSPd7oquB+LAV/eytyxAzd4oWvqxdzmwLWS/V44VAvPIKGfEMPFhIm8NU28DxtZtPqQT387L7h1Y2sw84qZGn+CmxWC/SiDo/Hg6HDR+DvCCBrqoMqB5HRyjCJEr13Zw3Tlxc/JwAghT4d6+tJfaxErtOdeIzYnS5wKIJjKPrCzbDbbQh0dqLKVEZaUejE5NdkPdlyXk38+vIjF2zBD6c6/dED5ZKGfDpJOZOZgBDs5bOoKu2gs6MDR59/Gu99dAY3H7RvGU+e8+EHUmbRNAFkfoGefP8rjV+TDV3pI5U0Eaol8LwAhjBIPozAxJQx+eXPSBVDlwrS+DNY8BTQNPGvTE0TQPQ4YPuNE11Xukll912BbB7kSJYFyiiWBLqXpzdKtO4kbEMziIwU/mP+AY+5hb/mhevKAAAAAElFTkSuQmCC',
      architect:      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwEOBqpYOrkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADmklEQVQ4y22PX0wbdQDHv7/eXXttKe0V2tKA/BkMYWPUwgZxY845p4kxoibTaNSYTVnUaWJM5kzcA9EYH7anqagPy0aicYnGTRKNGt3M5sPcQloHjD+lUAR6pbS0tL3r9e5+Px8Mb36eP/kkH4L/5VEOgcdrunp8dkGwWKLTpERnj0kul/lBoVB6FUB+y+QBAM0j+Ph0D04d60ew7+IrLx5pe2F7q7vFpFTSDIMzmSX73aWT1uXImFIo3KIABZpHgMXXQLZK0n3n7fv7A2Mnju44pMNkcqZENksadJMikyth7PK3cLmqUdI65enJzX3G/FtxAFuBDxtOnjl449ADwabZlSyLr+ZIQanApAyEEET/HMfC3AzyRZ0N9NeTbLGqHPunaVCdOPoLB7xnfX34oYsHDwT7ovNrbGY5S5SyAQaAUoayWkEuncfuQBS0YiOiVMV45IVqjxBKac9+w3U+9nZPOOw+M720gr8jcQK1BCWZRJVRQKOjgt+vXEM5m8DNCIeAVIBOLMTmdDOH01FXVEiMcxLz0wN7/R2hJju7N0jIrlY73NY0/J4KAjU8ajwGbt74CR5nAdUuAlmW4a1rIh6fhExK6bAwe0ef1cxiOTFDNrLLiM/exUZ2AzarHQ0NTbAJwLunTsDu4JDPrYGVUpi4+jUoZYwnmXbSe2S0tLdj1eEX//sOh3ZAFEXYRTsi0Si8kgdtbW1gYBj57EtcjyyhyhsEJwhYS2qwWK1iej5tQ0/v/WhuacdKMg1frR+GYSCTzaC7uxuS1wtBEPDU04MItXrBTA2MGihrYJwYfCLMc2po6LkH4ZWqwfE2TE5NIZWS0bVzJ/w+HzRNg9NZBUPXEQ6HEGqvx7XffsV6sT5mWZpLjNTxDDarAFUpoKKV0Lt7D9KpJBhl0HUDoigiHp+HLKdwd3oWF0a/wsJ8AmWj9nMeK58kDu8/m2dg7uHhczj9/nGM37qOfQN7sFk0sLCwiMz6OmILCfx1O4qJyG3kVIBa25cYrOf53t6WUKh7uzsly7j6x494cnAAHZ1d0A2gZVsNfrj8Pb64cAmu2nugbCRR5/ewtTgluvuZN1jizRwePvzIz6puMJ0xpuoGK6hllsnl2NLqCp2JxeidqUn2/EsvUynQyBxSA6v1NTD43hkEAEvjR+BlWU4dHxqao5QaBAyUElZU+VpV1fzU3AQYRblCiKI4Fk3XwDlldXQbcPaKZdc46J0e/Av5oLbayBh4EgAAAABJRU5ErkJggg==',
      badboy:         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwEXKO2Onm4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADVklEQVQ4y3WTTWibdQDGf//3I2myZGm7fndq52xLB3Wum5swHBalMhEPY0Oo9KBMcWrFiezkycuYd+m0ispgnhxeRJwO6cDNareO1pb0K0uTpqFpkiZ9k7x5P/L+PTiKCj635/B7nsvzwD/VNfYv+87AvtDS2LNP2uvftslPeFp+TZD/1Q78etNDx698dPHS1bs/fnohVpy7bMjkePHCG+d/gCs9/y0SdI1B/BxwRhscfuX8i0MPf3x8YBcbGxn6ehdkLZ4RSetReXMyIRLFJu7Ma5fnJgofUno3F+j7DPEgSBn54Kc7w6f3P7FRKLGYzKNW76Fbc0zGDjAY/JWlWjeHOlxm1eeIRo3Ejc/XTuK9Ny9gVD319skv33qtb2QmtsniWp5KxURJXcOqWqQq+4n4LJTGbkJNnYSDOpbtcO+PzOT0hDmoHD11ovfYkeaR+dUcC4k8ll0DBKtTs0RMl3RyhXTRQ9ZchHSx7RqeJ2neUz1Wv5czWs2To63tfmZim1iOSym3TmrmFxzTJRpL4m7ZFF2bYDiCHgxBqB5NVQkGXUKB8vtaW3vdUN4wKZk2meVpNqeusac+TKCzA9d16dar5LeXWfvTQEpobNtLONKA50l8Su5xDWS7YTqYlQorN76gr7uH3bvD+HWNjuYmmlsaiS6vcOv3Kdaid5FeDU1VcW0Lz8oLpWDYadORpOduEgrUoft0VCGIhEMcPdjP2eGXeerwAJFIA04hTj6zjlHIUy5kZblko6XWy9eLJfvN8lZWCiGEYzs4moZRqjCzuEQilSZ6P4YQAs+xqJZLlLdzFFNLomK1zqmB9hcSul49J0RFbMWmkYBtO9iuQzafJ76WIp3ZpGgYZMuSut0teG5FbiTTouJ1j2rpW2IhWJe92tPbPlzVQrJoGKLmSUqmiSIUJB62Y5PZMhC79lGzDZlZiQrT7fnNVvu//3uJgW+CLQdWJzoaZo9sLt6WvlpV+P1+EAperca2LXH9rYAjPSsnTO1EwVSeOUT8bFylawyyrzrl9M/j2+rpUKheP2g6jq9iGhhVm4qn4Sp+HLOE62i26Xv+tqWP93P/cJ6usQdf2DkUqI9c6tSV9SE86yXF235MSlf3CCQ8QtdRw985X11cZlDsMH8B/Fu+pHOyOV8AAAAASUVORK5CYII=',
      bank:           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwEZLHRgd/kAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADrUlEQVQ4y1WMXUxbdQBHf//e2952pbX0E0oLl37RAhNZcAhLNOLmiEwh28wUTZZoTNyMEvegGDUa4xKjEU2WjMQHExdMyMxCFnEhGxCnYtDJ1GUMxhgUaLe2tF3b24/b9t7+ffAj8bycp3MIAIAfxUfv7sLwi52o6zxjbQ1UP0RBD5mMaj8l4KIxcTWXlybTQnHm5sVnt/5tEDwGoqj/EKWNdrCkD7uenBh++aj/xA6dykJIAVkxi0wyDEG8jUi0DFluy88vZM8ufvfMCwAo+FGQ8bmXyPzyovrS+MDE8Inm/UI+TLutQcLdF4CoWobodCOSTsGm1GHy2wWaCPvJ7I+GzVsXUzuB1zMM32qzKznrZte+crO/k6MmJyFqqx41WgFu+wGY6V2sbK4gnkgjHPud0MI6FeKygasz7kzGBs8x8bzHaDDgDd6jRy4TIdGtECanpxFNrWB3ywC2oxHEhEVE81XgG1xQqVTk2s/XwWkMvpyCnWLM3jdfdTsTPUvBWcoossRm0iIdz0DOqFGvk7GeCUFt88DX0gxaIWhuCcDoY9H2YBEdnvw+lm+0HDJWd8NuDhM1o8KV6QQ41oKD3Vq4LAbw1f1AJQya+wW8tQoraREOYwO0JIHPvpl3MIGuwU8cvI27daOMC2O/olyRsHewC1JDABKThab4PZQog9X2gVM4Ydcq4NSHMbXwA679JBM2L0rFkizpeJ8e/gf2oKe3HTUmExbWb2J8bQvPd/dCrhQQWjyDBqsFTbYGMAoPIFymy3+kCLPD2b/XaV90+1s3kM6KiCeyUGtU8Jpr4a+tR7pcwPLVNZQqKmiVSigVSpSzGQwe/oLEBXeGvZcsfnn9RunxUOwydTrrSKWUw8qShLlUEYJYQEEooyPgQnDzNpLmNNwPH0df/2s0FpEIW+MdU0QjdCadxJq3yUHq7Xok793FqZGvsR1cQlfAgY7mRgjxICTcQVOdF4cHhrDw5zbhqltlwmo+ZmjyfD6D3pBBgyOO2goCPh81mhiyuhbC6uodSKKAVHELu+9vw8j7c5i9tErVuloiax/7oGQeOU/wD4zr1H4LNzP1SFcWPQe9WN9cg1yU4XM5odEX8PnbV3B1fgPqaj/EqudOVjbeegf/wY/+bdeYn7E+fUFna08/dbSXDp08QL+aHKJPHNlDFWqnyFkenSONp/sBQMF/CgAg/5sEjwEemVUU37NXChG3y2f3dnfkas9NCL9JlF0u614JY6lFJPxp0OBxAMBflIaRQsLWMWYAAAAASUVORK5CYII=',
      blank:          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwAnNCcLnuUAAAANSURBVAjXY2BgYGAAAAAFAAFe8yo6AAAAAElFTkSuQmCC',
      busstop:        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwEYIGTNCpMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADb0lEQVQ4y12TSWicdQDFf//vm8nMJDPJTDJttsliErLUmNZEW6lSaVFEa1shRaF4c4kVFYQieBVE0IsHMcWDULXiKVqx2mppFSUHi4kVrYlZZ00yyzf7zLfMN38PFay+y3uHx+Md3hP8F64jD3Yfsl2OMx1d3tFSyU6nUuaFxHr7+Vj0VAxeNv7nR9ym1Uce67t638mRQ2abl4pUaG5twqU2IKNK6eKno7/nrJ7LS9+cfAOo0z8Lm6f/DRgaarnx9tzxiS9+zclA0Cd6O9s40NnJn7UK4ZTGSINTfnm2W8RSPdsLi4X7jeWZ9dsauJ74/NLRubmkSXC3T8zsP0xXIIBS76RJ6UGrrXJu5SLxnzdl5PoekTbG9PmfyieMpee/VeBpz7Enj7+4gkPgdorHx/cxEribpWyM3/LLQI1Gh5NXx6bIuati/a8LskFsuvfutd4h9L5faZt6aHz8noGHb2xouKRk2NeClElKZhnTqAA7RHOLvPfHVU7d1UHXPl2sLf4oVTsx0bbbnFZaA8oLwQ6dXFGXbsDjKCLRSGcy5ItxIIao59mJF5jo89AQbMIu3hRmKUKDmnnN0R1qOpwv6FSLVVFM56hZ2+CpkM+kuHJzh0++v06rRyWZ0NDGChj5Mq3dRQrplBQ117BDqKI9mzOoaEUStsXWThif4iUZjTPgMBkIqsyHC+zENbLpOnW9TMG0qBazooYDxdDt1HrEy6DfJhzJM78QZm0jQjyaRBoFJrt1Jv1ZClqRQqFMuaIjpYWll9ErllSSKf2HXGmYdodONlfm3JU4m1vbbKVypLUsyZxG1dCpVE3iW1nSmoG0wDTKGHbzqmIaxqxQfVy77GOiy2ItWuLDSykGdtUIuEzS2RKVUgWzarIaN0hkbBptgWWBJfrOqvnyoxl/u3nQrnnvaOYXMpZkJW7hdtrc2SNRqeHz1OnfBeevmTQ7JeEFJzXHSKTuHJq5tcTgxz2D42sRkf6Isamo/G5ZCKcDXE5BwAc1W5IrgaKAP2PJeGxUGL7Tx2T4la9U+mch8Uwhm3jpA6XNfTC5Gu+5d08eQ0pZ1CWZvBQVQ8oWT134dSeJ6GSi2nLmKTae+1rpffOfJ/XP3uKBz1xK6PUTjaHp+dBwrzxwWJUPHFXl/iMu2THYG/OGpp+l491WAKXvLQD+BlKJunlmUZDCAAAAAElFTkSuQmCC',
      city1:          'data:image/gif;base64,R0lGODlhEAAQAOf/AHx9Y0tMRGJjUS0uGsrKaIOFOFxdOzg5MigpJEtMMWNkS29xVnt8XKmqeoaGJs3NeGBhS5SVJqOjLr+/ej4/LtfYnLq6WdHTpenpqG5vW+HgoYGALkJDKZOScYyMa4KCF4uMd1NTNX19UqSkVdbWare4hDw8Kl1dUjM0Levstn+AZby8bH6BXaipiDs9I39/WoOFbUxOPEtLGtTUfZWVacPDWWNjO4iKQ01PNW5uTYKDY4ODXWtrPW5tUbKzR1paNVNULmZoTOHhZ3p6IODhhNTUi2xtG9zchWNkM0JEMJOTM+vqk+vsoI6QdFRURquqRXR1XEtLLnR1O15fTpiaXlFTRWZoUk5PRYKCVFlaTp2ddOPkqtPTc5qaem9xXKGhQ15fJHV3X1daPW1uVIqMY3V1WWZlR1RWPllbQlBRSmxrRVxeQFJRN4uKVFZXTVBQQVdXSfDxteHikk9RPFFTS1NUIeTknHJ1VXNzTFtdRm9yZGlpVmFfRH5+bjY4JF1fSnFyF3Z6S1VWQklKIWdnQoWJZGNlWe7ufUBCIHFyVnFvUYiFZFZWOHp7S3l8OXR1MVlbRq+vT0hKQpaWeGpqTo2RbWJhRldaTFtXQXRyUuzrdXh5ZEA/KU5OS4mJX3JzX2psVk5RLWptTVdZQ2xtNlpYOzIzJWlpSkRGPEZJKUhHNC4vKFNUTG1xT2lqUVNUSHFyWZCPbXR3VlJUQHd5RFJUPVtbS+Dgi0lKPFlcTMfGR3d3UYmGbfX1oTk4J2xtZHl4VUdJNXFvLqCggO7vrOfnrefmg2doNt/hr0hHLF5gQmlnTOnnkWlnR4eGU9PUhD9APElHQMfHnL+/cY+NQWxpUdzdfGNlGWhpXnJ0W1dZMU1OR1RXRuTid+fmf+7uwJeZb1dbJ1dYKXd5XFxfLWxqTG9vSnFxRqKkZXl3TJqeRqqmHpugR1RQO46PNVlcSXx8RGFiCt7ekHV1DmFkIl1cQVxZQZGRZOfpopuab2JhQ2JmQHF0U4iIa3RyVv///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAP8ALAAAAAAQABAAAAjYABEgMOWHk4soCBNE4UDhwKqHKFBYSTSGhQ4GizzEmnPgQMQDBnbkCaKGBy1aYyA4I+TRVDRCoebggEYT2pwE2kSgQkFBkAlf0HTpoikUmgs2e0yY+KRKVdChRaElYDPFRJIMjIgKHVozQQYKSbyE0Mq1qxcKFDKcIVsWWhRYnJbOfEqXZghYP6ckCFa3qJgzKn5mwMGhpmFoHGpB8IPiABlELubS1JYK0SmPq1CEepHKxaBBMmQgQkQoCorMqzpm6+FqjOtxMBoK/Icgoh8XJjjoNsgYwb+AADs=',
      city1_day:      'data:image/jpg;base64,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',
      city1_icons:    'http://pics.kapihospital.de/city1_icons.3.png',
      city2:          'data:image/gif;base64,R0lGODlhEAAQAOf/AHx9Y0tMRGJjUS0uGsrKaIOFOFxdOzg5MigpJEtMMWNkS29xVnt8XKmqeoaGJs3NeGBhS5SVJqOjLr+/ej4/LtfYnLq6WdHTpenpqG5vW+HgoYGALkJDKZOScYyMa4KCF4uMd1NTNX19UqSkVdbWare4hDw8Kl1dUjM0Levstn+AZby8bH6BXaipiDs9I39/WoOFbUxOPEtLGtTUfZWVacPDWWNjO4iKQ01PNW5uTYKDY4ODXWtrPW5tUbKzR1paNVNULmZoTOHhZ3p6IODhhNTUi2xtG9zchWNkM0JEMJOTM+vqk+vsoI6QdFRURquqRXR1XEtLLnR1O15fTpiaXlFTRWZoUk5PRYKCVFlaTp2ddOPkqtPTc5qaem9xXKGhQ15fJHV3X1daPW1uVIqMY3V1WWZlR1RWPllbQlBRSmxrRVxeQFJRN4uKVFZXTVBQQVdXSfDxteHikk9RPFFTS1NUIeTknHJ1VXNzTFtdRm9yZGlpVmFfRH5+bjY4JF1fSnFyF3Z6S1VWQklKIWdnQoWJZGNlWe7ufUBCIHFyVnFvUYiFZFZWOHp7S3l8OXR1MVlbRq+vT0hKQpaWeGpqTo2RbWJhRldaTFtXQXRyUuzrdXh5ZEA/KU5OS4mJX3JzX2psVk5RLWptTVdZQ2xtNlpYOzIzJWlpSkRGPEZJKUhHNC4vKFNUTG1xT2lqUVNUSHFyWZCPbXR3VlJUQHd5RFJUPVtbS+Dgi0lKPFlcTMfGR3d3UYmGbfX1oTk4J2xtZHl4VUdJNXFvLqCggO7vrOfnrefmg2doNt/hr0hHLF5gQmlnTOnnkWlnR4eGU9PUhD9APElHQMfHnL+/cY+NQWxpUdzdfGNlGWhpXnJ0W1dZMU1OR1RXRuTid+fmf+7uwJeZb1dbJ1dYKXd5XFxfLWxqTG9vSnFxRqKkZXl3TJqeRqqmHpugR1RQO46PNVlcSXx8RGFiCt7ekHV1DmFkIl1cQVxZQZGRZOfpopuab2JhQ2JmQHF0U4iIa3RyVv///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAP8ALAAAAAAQABAAAAjXABEgMOWHk4soCBNE4UDhwKqHKFBYSTSGhQ4GizzEmnPgQMQDBnbkCaKGBy1aYyA4I+TRVDRCoebggEYT2pwE2kSgQkFBkAlf0HQJHQrNBZs9Jkx8UqWqJk2h0BKwmWIiSQZGToPqqpkgA4UkXkI4hcrVCwUKGc7UJFszCixOSmdqzQotBKyfUxIE0zp0q5gzKn5mwMGBLk0OtSD4QXGADCIXcmlqS4XolMdVKEK9SOVi0CAZMhAhIhQFBeZVHbP1cDWm9TgYDQX+QxDRjwsTHHIbXIzgX0AAOw==',
      city2_day:      'data:image/jpg;base64,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',
      exchange:       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBhQ4EQLGKPUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADUElEQVQ4y13TS2xUZQDF8f937zd3pvfOdJ61LS1laIlKEwM2GisYawkriiGkGhNiTBdKwkIXGjcsdKOuNHGHaBSVhbpDo5gYg4+4IAYiBdMHpbZWpp3pTKfT6cy9M/f1udCYxrM6Z3GWP8GOfDLxgHV7y33+bs0+sh1q06WhszeCaKZHSq3gtIKb1y/NrcJr7Z0fsXM8tTf5Tc3Tj1WdNoO5NPnJV8jmhxAyjuNH3dt36rc++2jhVSov/UD+HCyfQQfIjlzAWfuSVvKxk88dMIbdAOrolLdqXJ9fpOl6pHI5ffeezt7B4cTUSn18xp45PQOgkz+HM/sCIye/mpocrp7VyotqpemJFhEkAbPFTUIkwuzCVbqwLIkZ5+mF0tg0tctzGstnAEseOZy5kB47QU8UsTfZQZcBo4O7iNUL2JUVHKeB0/ap257K5AQPPcw7RM4nJMDQ+Pl3D4128dOcph5JWyLeGeHb+SKWLug3QrKqTOq3i7SRBEZMyFicAVcb3Dey9rKE0/KJx3vG1yoNahtVcfOvMj8WbIrbDovFnylE72FpSxDHIp7MYZlJlNemUVmiUVFHJeQT2ZyRqDRcVKi4EjtIOvU7nQmT1cDAcHTaoSJQQCSKqzSUZuDIDtajBx0JfaJaWhOZW99zvL3Omiwx127xZ7XBth8wMdTPQrNFBZv0wH3Ec/0EbQcVehSrninfHHu7u/uql0qbUZq+otV0ma9u0wwEiVSa6aqNUDBAkdjV97D3H0MOjhJ4Pp5vLIlLJx68qIR41vEVaBD4AQiotHw22z6dHVEEAtOIkI4ZoBTvN3Yzu1yg2ho5JetBWN7XlaJht1Uj1NCkL7JRjUd7JU6gMCMSoUUIAMf1mGmGFBauUduUm15m/y/6esO5lskkDqW7u/YoECk9VBqhqNgejq/4o+4ys7HN7KbNrzWXK2VX3VguCTcx+WGw8vrnAmCiL67fVbHjnVHz4z7TTXXIqLL9QFTbIU0vwPZDGq5PteXT9AVB+pmv/dUPnvwPUWdM/lOUQus9dTmaujcwraSyLEvF45bqMC1lWGkVSQw1jF1Tn3JUaXr+rf9p/FcXB5QW2Xjx/jBUU7qqHkY5WYRZ8sl8JyKpL4KVN+7sFPw3zZGK6O/cEyQAAAAASUVORK5CYII=',
      garage:         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwANDRdl2sUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADjklEQVQ4yzWTbWhVdQCHn/85555z7j271+2+LPfidt2c5XRamy85IwcSoRn0AolJsbKiJOibBdKXPoQEfQiiERQDzago0lCJWUg1mWmrxja9vmR3G7dtTr13u+/n7d8X/X1/nk/PTwCQHODwu928s38LLb1Hom3JyCYp5XOJhNmJwJydK13NF50Ttu39nBraN3+PIf0GguQALz2/isH3H2PDrq9f69+z+lBDQ6ilLqpTqNhUHQ9f+szNl/k3nV/89dz8p+Mn9759TyK4u9hDg18cfm/zvkx2idHJjFyazQm74uJLH1VV0S1DKiFdJKIWoyNLY9eHjnbDkC8A2vu+fH3rmomBsbMDsqYmJGrDJqal4/sgpaRqe0QsE8d1ubEQkvdteEXcmNKP/nOm0K8mNn8V29ad+6459IeVujIngpZFNF5LwAxSdQWqbhCL16HqBsWKT++WVlEXsLmRcdcricg3imkUn9LdyUQuuyg1w0BRNWxH4roKSA1VUamUHQJaAM8HTdUImzepkSnhe4VDakf3Mx/2rs2snJtZEC0rYqzuSHDqxzEqZZvUFYHv5WhojLOp536aGhvJ3blFa2ucfL5A5paa1KJRs8vzParlHCyVKJUDbOxJsv1hi9GxdVQWf+D2zSmmL7lMX5smZFlMOyWmUrektI2wki9Vg7/8dhlVeiyPKeiaJLrMIluIUyidx9Wb6O7uopCdwVF1ZgsO/buSxIwqTjmHWpt8cu/ObU59W71k9FqRshT0738ZVXFZHcvQHJM80LODVeu2c2b4dzo6O6joIX46PyNuF+ulaod2tiX1qd7BY6cIx+sIL6shGGxmw/p22oxhNJmlNlLPQjGKrueIJUyOHL3I9esL+MEHR0Tzo593Br2rkz0r/6apMcLpE8O0J+MszGeZms6RsFTyjkdX1wrMugCP9PVyfmSGb4+P44effkFdKu3J1cTcNYXcTOelyTL/zRdR/EUUTeXx3b1s6duIKz2yd4pc/HOWiYk7XLhwGSW0dtxR2w/eTflkbcvWkXSteXmZGgjy19AxAkYEzTQBgaIIfNfBCFmAxBWN5YL67BNkDp4VJD+B9AEwvo8vX3NuMGLd3F1juTjVslQDBkiEXcnLQnZeFAsetuhI5dn9KlMvDiutH9w9U/JjSL8JDZ/pRmh2h8bcIZ25bZqyhJAujh/G9uMpm4bDDk3HSR9YVJIf4aff4n81B4szeO/ttwAAAABJRU5ErkJggg==',
      goodgirl:       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwAQGxzdA4gAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADPUlEQVQ4y1WTW2hcZRSFv/8/58ytk8wlmcnkMpNJm9A0odUKilEELw8VaosPXsAieVAUUXwQUVAq6Eu1D76VIj6Igj5IwViLCrXgLZVWBWPEjEmTmaSdJBOMyUwyl3P5z++DCdQFiw0b9tqLtdkCgPxZ3h1/h5feLLHvvi+SuV5u97V+LN0ZGnGc7dDm8sRcuWKdDyQevvjnV6cqcBnyZ6H0HIKbcPjo6WeP3Jt8rSMQzQU3V6kvzOPlSqxt/MQfCykG7jhT/XHy+nuzF8df3V0s7oRbInB/SKQe3f+ENRYPK6yso8sTDWFkLAaPwMefQHaoXSf3viw8K8OlS9tTi9+t3gZv+MYonExa8mQ4rbKtWkvbEVsUirZgwKD3sIlT9UkbilS9LqoffUm1sqZTg9HMViSxd3vtqc+Nbijl7+p8fuxYH6LhCGeuhVNwaW74JHsChBLQWFJsXPXQW5qOlSWRLfyCEZSHbmR7PjUYeev4QHz++PxnM7o50xRqXRG0IfyPpnbFplXyOHAizPCQSexblz6gTftM5frEqpNJyL6RfSfao71EB03hAUEgDvQAB4DRFZ9bUwYpF0xAAr+3p5gLx7H868dkPLXnoE03wV4TBWSBASADtAEqKPAykvVJFwkEgJ9j3ajtqtbuSpt0PT/sJfvxdy7q8H9oS+BLQeOahwA2gGIkgbKbKHsLuVmzi35+lPp6ECMmaAEGIHaoQ1Bf9/HWfSQwHYkjkPhuSzheWMtyufG1bUb4e/gZzHaNfdMwgJk2qM56aPVfbyaaQuLjtmookbgste99sHRtDbNrlI30IeydoMRu7YDNoqZoRjmXzLEQ60K7dVzbwJO5M+bKlDkXDlTPWSw/wv6HaBQWoV4lAFSQTNe6mL7aSSUbxQ+EEG6DZnUFzxz9TZvZ8ztOL8RzY1dKXem1WLI4wz2zv/J97iB/xTI4to3wFaDxmjWam2U82d1otr34IAtP/iB2vwrrQkdq+JsPQ9bSUdPYRmNo1WrhOrZQTkN79pZwHIkyhgqtPeNPs/D4pOw/tZPVrkjP+4FAaPkBQ9143VDlu4WqoH0PX8RRsqvgyfzbysxNUHqhKvtP4y++wr8XHmvlzFftDgAAAABJRU5ErkJggg==',
      guildhouse:     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwASLw9flb8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADb0lEQVQ4y12T62tbdRzGn985J8k5J+nJpXFJu2bNsra2i5PW0Q431CHbHFPGfKGvBlPQ4ZS9EIZ42fwLJiJMKrI3ghcUQd8MqyLT7iK6DtxCL1nStV2zprFtcnI5OZec3+/ni8wKfl9/P98Hnu/ziPh3kuOAfgnAMTE2+k739t6eg+GO9a9791xgQ4+/pEnR53h5YacNTLr/7QJkE148BQQ+HHz9zMgHe0djY7dz96LG3CeQ0m8hFVehV5r1ubye+ebbpbP07muX5cFPYc2dhAgA0C9Be+Tik+fOjk49eyjRfyVzV/3qozcAVoZbuY7LV7NIPjzk25bUElsT8on8+n6hOXPyVwDtA6mnPj/6/pmRH/sGOnAtU+DTuRKZvX4TpFnFX7kovGIdN/6oYW3DQGooxnt6fft19jSr3RuZFBG/ED59Kv1Folfd8udsEcWyQRTVh0BXGkncQt3Jg5IAdjzaD7NhQQlFiMdHQFu1fYaofCaMjD10YEtMTuful/l6tQnOOQCAM6AlMiSiMpjrgjGKrlQUjFrg1OWdIdsris7bUjjofcUjA6WVJmEPYEYZSrcnoKgMq/YwtLgKzhgC4TiIIMAyDSIIDIpPPy74NfGxSsOC7bjttxACxiiW8vMorEpI7jkGr6yiXi7CalbhlRUoHSFwDi6xDU1wXCoblgPWFgfnHKIkYfjIyxjbHcb85DgoZYhs3QG/FgVAQIgAt2WTllWDUK44+ablbuaJUg7HdqFqQZj1Bqh5H4QI6ErtguTxtUUohaH/DcNgVFotGd+tl5Vh0SPxteUVsjb7G1xbh1eoYqCPIBYJwFz5GQuZBHbufQKu48Iy61gv3IHpbL8i+ruPLAikeVr1E3FjpQhf5RfEgzUElBbcFocW1hCPhVBdnobu9EHrVFDITmFhdhE233ZCbBSeb1B/w69IxX2GXuZOOUtiURlaKIBAhx+RqAYt4MHgYBSV5VvIzZd4YeZ3Um8NTJg4dJ48sI4Ed53/KaZePRB0p/mrx3cTwSeDgYAxBgIBzLWRzVf5xS9vEKq9UDBxNI3FwzWpXSTCqxkcrMbffHeo8845x6WyvlECgwDGCBoWhW0TZGbqZoM88wN8H7+ILGFIjv+vjQD8fv97Pd3xtGF7vAaN9jMx4jFteclx1Ak08t+jNbUEWJvMP9cAnk/l94AHAAAAAElFTkSuQmCC',
      office:         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwEdJ4fea3UAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADe0lEQVQ4y13NW2hbdQDH8e//5JxkubVpk7Zp0mtc69a1ZY24rhSqs+qYbOKDIIibIMzLi+ijoOxZENGX1ReRDQWdA/Eywcsg2LG5tW5ztqOu16S3tPSSpE1ycm5/XyyIn6fv0+8n+Ff/QH9HNB4dUoTcce9TFbNiqdPz1qLpeWR7ZWnFKSzc3oQ724AELMAGUPcGjh4dPHH8+MmPTXRKhU06Dxzi80sp01PbaXp9gdJm/qXMt1eWfkz/dvo9/kPZi6pQINbbc5BIqJaJn8fAJVnJZrS7d0d9heJ6pD3h73vrzc53H3v58hzx800Arv2f4Hr6mT5mp7M0tiQfz+WzQ2Pjv+OOhnkwNc+1sQl2dIkI1FGWXlEoVWSswarp7ii+cHv0+cty62zeNTud5YnhpoP7gvs//OvOaNVA/xGODXQzNHCQRJOPzex9VtNzyN1VBo/0C1melKI4WbWmaYe353+9IE68OHQmHg5dSP3yB36/VwZ8QSEdE1WFM2dOoaoOihampjZCV0cHlnQwKmXZ3XVMlPRCWl3LlL+TuntxZmq5GReiobaG2P4oPsviqy+/xx0IUB2uxbAEPYeTeNw2LYmEcFzXOX8x/Zk6NRt11UdNpT7+EOvLsxQNhaLsoKy4yZsGTraEtpnD7xPkUyk0TSN3ZZzW5n1cG2/rU0s7cUUvP1Dau46wkc1Q3smRuZciduBRWpLDOLaNaVSwjAo5fRfbMGgI6Ui5i5B6vYreYgpl0Yy0PizdXr+olAropQJzt6+y8meK4dffJ9KUAMCxLCzLxO9Mkc/ep2KpWy6cq3pj8p3TsbZwLNzchb+6jkqpQF1LF/FDgxTW0/hrG/EFa/D4gnh8QXyuLJmFDdLLDZ+qALfGjIvxVpLBcFT6q+uEY5lUNbRimQZ6fg3HtrAtA5fmxrZMFNuUq8sFx7TVKy4Auf3DzbLofU1zloMIh0TfMbyBEIoiUHCINB9AKAqKqrG9tiBn794QmfX4zWL+3AcKbSMAzM/snpi8dcOs6GW5tTrPzPhPOI5Je/IpUBRMQyc7d4+J1CUxOV3t5IznnmWzzhIAtI3Awht4er950r3x0RehkFnf3nMUtzcgHccWlWJBFjaWxPrSCrodnc5z8hQLZ/+mbQTB/2idI40eFl/V5NLbbmWrGlnGtj3odnjVJHKuInu+Jv1Kbu/0H+eDoDSaPpIhAAAAAElFTkSuQmCC',
      rcenter:        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwAXBN6UmLoAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADfElEQVQ4y02TW2gcZQBGz//PzF6S3U032d3cumlC3dSmLZpKFCzGlmRDKyhFBC1UwaKCtYqK4AVBERHBy1OqPvZJfRH6INbWSktFoVVLqS25mSZNbLpNNp3d7M7OzuzM/D7YgN/TeTnn7RPcmZTaO5nOzgMQJFeLwbFYQhvW9FjDb2DpTamr9dJkj8JzXMc+7Tru1+ueWAeifDf87Njjczfm2dN3WC0uXRTCD2OaFdKbBigtTVAt3+b61UuTVuXW1siWo9SnXkJb97Ug9/CmL1qGnD6bpW/nRPnWHBWzzMrCFOXCLJpn4zZ85YlUWnS9Ie3JI2eB/wIDY988dujI85/PRL9X1bItvN9sND8AEVC3KuB7xGMGtXJZSL2m2tu93X7LE4G9fOacpGM8+eT+vo+S7YrKP0JIXbChuwUVKFAChMDozxEfHYNcH0JvEgRVUknz3bad41k5eH96NNMR2bZ4s6zq8yBrOiISoJTClyACn8rIXqZG8rgju1GJBEJK1ZpshKRw35LJDaHnVmo1fjlzSWS8FCEzjOPX6Qxl6Wnqp9mI0Sx12g2dsB8QjzYDCCl9ouHSQSkNtVPVC3z46g42p9sQtyTWSo1wI0RTEEESwWmOoqkAZVkI18PzfITUla5WE7rj+ZFIJM6Vv6bZkb6PJq0FI5/APL2EXavR0XsXjXQKtVbGLa5izk6wJz/KzOIN4dVjSLPk/L1SMOnt6eDy9Hlu1q6RThgM7h1ky+7t7Hv6AJnuLIFdp6Mtw9Gvxnn5hUPcXl7Cqga+5sfH2ruS9p62hKsMIyo8I6AwW2T5QgGrZDI9P0F2oJ9tCPLdPQxku/nzj985dfIEthg4J6urhWPLi8vetamiSOotpMqtPJAb4sFHdhFJJdh87yDTuRwnrTV++PUsGxIJSqZJZU3g+8Z7mq9/Ur1RvNhsYe26fHlWuWu3hefU0HXB9qHtxCJh4o0G/dEIXTWbe7bezU+nTnHxivdj0PrMpzrFIb9eVG/Oxj8b7M2sjC6avipYZVG5MIHhH2ff2Ag5CZPT02zMZgmUUq5LgJV/iplHXUHvlzD/IgCR3Advp2OTr4cNO6VrNRqOg7l8k3jI46HhPLuGh6lXS9Zrrxw+CByn6/07b/xfRG76OBOSK3lBY79GtV8FvuH5oeuOI05sjP68JmlMLCwsnNf1GJ5X5V9NupifJfuS+gAAAABJRU5ErkJggg==',
      shop1:          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBg8nNw3i7wcAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADkElEQVQ4yzWTW2xTdQCHv//p6aGXnbZrabe1trs4Jcxx2XRy0UhwiSFOo5FEZSNBJxKN4osPoHiJMQQefDJGnIkxgksILw4x4LJNQQIxRMOwbk5NkXZjG6xu63pbe3rO3wfZ7/33PX2fAKDhGEffbefgS5uIbT3ub2rwdEgpnw0GHS0IHDOzhb9yBeN0qWyOTAz23Fr5cONVBA3H+OTwFl7v2UjrjpP7ep9fcygcdsX8q1exVKiQLRjkl02SU3lyi8XMhYvTfePnug+sQAR31vBI/9dH3ru/JzW/xPkrCZm8NiEsI8X6tWV0V45ovSWHftsg2tZt59x3N68lhvrbYdASALU1e9488uIDH23QCzL0b1oEVwm0Ygm5/1doXEYICZhks9D7zmPSF90mhs9On7jxY+EF1Ua09u0t6gedV0+Ti4+JommSqpgoeZNAU4Cq/TUIy4Oi+NF1SUv1SfH7rXuJxSq7l9ptR1V/6PFnosWMOz02Ic3ZW0IFFLudorBj/8OHhxZMK0+lkkfTisxMZ0lOXsIbrBGKCB5SIw9u3jlb/Jat9TFx0zC47nSQ6+jA1XwPxVqL8ZEBZqb+RFp2pqZsDF6owRVIY1UKOFX5pHjitTNzmkytjnzxIWu2tWJ/6mk0vYpgMIjD4cQy0oxeHaYu3AzSweTNec6c/YHJ+Yq0ue8Ttsb2595v29ykDS2s4uE9nei6l4WFBSKRMAILjzdAKNRMJrOMzxdk/fpWenbtRBpZfhmdEmLTrlNxvz/T2rVOwetxkl1aJBKN4nI6URRB7K46KkaFublZdF3HsiSqakNg0tX9sVRSydz3Tmng9eo4nU5Uu4bD4UBKiabZaWpspmSUcLnc6LqHUE2IcLiOctnCMNXLSsUsf3l9LIXu9YJQ8FX7QYLb7aZtw0ay2SXiY3+TL0tUzYnHW00gUMvln0dZzPs+tRW0VxaLxX/Wzk+eb3m0czvuqipCNbU0NtaTvj1D9+5e4vFxpGVRLJZIJBJ83tfHZyeujGbmogf+V9k+4ou0Dd8Iqz959768D5siGItfo//kAKsbWrEsk4XZJNn0DOXlPDb33YVS9cEdXN99UaxUhXMw4I1985XMXOpSrduUKkJWh6IgTVExStI0SmJ5WVAWDRMlvXcviV2XlNjhOzGtQOqPa3aR6FSMxCHFSD0kzNsIJNJei9RiE4YMHzWVyIBMvpFR6o9gJd/iPwxGicnYm/U0AAAAAElFTkSuQmCC',
      shop2:          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBhIyOckRFDcAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADYUlEQVQ4y1XKS2gcZQDA8f/3fTOzmezszr6T3SSb94PYRwgtFYuvi0LxIkgJ6EGPBT3oxYNU6kWKFRQpPih4MCfxGoXWCNWCtbFqrNGArSZumiyh2c2+nzP7efLg7/wT/J+RyWSCQSeUchxnWAgxW+8Ecg+qic3idnoHPvb+i9l4H7lCCyENpexA4EgikXg0nkicjseji1Iag3ZfIGT32+LgsIHdZ1U6oSf+ub4+8H7rztlPgQRwACCklPax48c+dN3ws/F43JVCYFmmDgQCQiqJ5/uYpkWpWCQbNEjUNui0W/kLK1sZxj5CjoyOSjR2Ipl0HcchkUyiEaLd8fF7oAyLarVGmn2MZEavto5wOfdcAYDtc6iRlBvWwnrFjbhDPQ27e3mKh2VqtSqd8gGH+zukMhnCQ1OYlhKF/I6emY0O5P2zorV/7bp4fC46rnTvTi00EbTsflEplWhXHqCEIuCmkLbL0vNLTE9kScTCRN0I36xe1cVuyDvz5InvjHV32V86veEVfvhEbBcK1OrQC45jhmJYoSiRVJpQJMb07DypuIvWHtV6U4xPT5m+36sZc9lmJP3QY5F2MIle+5aYNJASvMJdbCwGJ44C0Om28TwftEepUmchHuP2+v3vpU9PVuttwqkx5k49TSYV5njaY3Yig+GV2L7xGUopdA9A0+12QShMZfDLnypv3M/r2n6x1hSFNTtuVHj4xBCZoZOE3QhXrixzUDjENBQBy0QIQavRxHYcGi1BLre3ZcwHv5hONyY5enKKaCyG4zhEYzGEEAymB6nUGkgpUYYBQKPZwO4P6kajUVn9/MucDEf63tZS2WMTk4yMZEmlBkAIPM9neDiD73mgQQjQuker1cTu6xPrG3t/wEpODgymV1qeplhu6qATwu9ptAapJGPjWbbyZRqtJpZpoqTi1zsb3Ppxs5NJeq8CiKfOPBNVhrG+sLiQffGFJTrtJqC5eWuNdz5YJuDEGRmfgfKWLhd2xea21SnVTj1C+dJPWmuMa1+tHAKjieTga+Vy6ZyhxNTVr2/U33jz3aAbcQh2BIX9mzTrtWazN/dzx339JXYX7wEIIRDjk9Ns/XUXgIuXLs6YSl94673b5xtde1Sa4XmpLFPg3fNk6vfub+f/JigQY5fR2y8D8C/Wk1pjNk1BcQAAAABJRU5ErkJggg==',
      shop3:          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBhUKIlGkd6UAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADWUlEQVQ4y13RS2xUVRyA8e+cc6d3Hp12OtCWQlstJFRoUR6BCDEopqIRo0uN0YUkJtZXdGdcqYk7TdSNxpjIxsfKRzURdUlUgmBiSvFRah8wnUdppzNz78ydufeevwtc+e2/1U/x//Lv9h6bGr3D8+pPbM2n9yXchFNZby+UCpVPR7LnZ6NwzcZRRNPzpOXX2gpAjX2ALD7DtiNnHnz56ck3U1m9P789QzqVJCRBHMGNlTVsuAZEoASt4viHmS+W4Nb3AUiOf/jkx1/NBd/8PC/Pv/2tfP/rgu2IiGdFREQiEdsUkUBEmlakFYs8evrZBYelaci9M/HGK4fO5LY6+qfLBfnzr6J6+PgelQDmrxS5cHGZRiNQURhz8uQeJvYO0YyESuFaUcNLXaefm3xv9+6svvBHUcpVX4lYsr05fC9gdm6Vvr40954YZ7VYo1Rq0O7EOAlNp9Mq6X2n7hye3Nt3dKFQZW2zqRBBa0UqbahUPA4fvoWzZ+eYmBiiXG7QnXUREZqhxerMNZ1OmYOWOFXa8IliiwDGOKS6FN3dLktL64yPDzJ7eRXfb1MobAJQKZUpb+Rc7TWjfVZb/FZ4k1EpjDG4WtE/kKVWazEykmfn2Bamp49z39RtuK6DV6tS94NdOozilN8OiWK5+QOO0azeqLPpNXnokf1M3r6DTz6/RDqTJJtNopQiEgs6mXKsyPJ6NUAbMBhEhEa9xlOPv8jgNpfB4WEGBvNsHxjg96UqixvL7Bga4uryKrEeXHCUkXPl9RaB57NertKT76En38+WBx7j7/Nfc+mzjzAJl1SmF7FtHMehy3XRWuNdj2rO/JWN653yLyuN4sVRrTysTaB0EsigpEBvrh+lDUpprDK0Wh7NIKRRj5C4s6jcVM9rPX07Xk1nMgmUIo4jsBa0AlFYG6O1JgiaKCDsNPEbG8S2GxvVDhpjzKmE6x4TayLHSWitHSWChJ1Qqf9UwjBEKXCMQ2OzwoG7pjhy9z2sl6+5Jo7DH1v+5lt+fePLWnubbgfeobhdUiIhVmKsjVASoxCMk6RajS+P7BodOHrifoJWc7/J9OQI20EItsSBq9/pcGUmNMOj1qqxMGzrTmhp2z5pseu3VqP+ehzsfKG6dm65UavuKa78M/MvS+nAtvxqPNQAAAAASUVORK5CYII=',
      shop4:          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBhULHIneW08AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADYElEQVQ4y03Ty2scdQDA8e9vZnZ2ks3msXlsN5Fk02gbHzVQg0IlSEGxllpRRJT2pNAaQQVPvhA8+SdE6KEXQfSkUg2FKIUaJG2KaVWMzdbmnd3ua2Z3ZnfePy8W8r1/jx/B/fJzfDI0KwrpqamEqp3oSxsPtj2/T09odrMd7vq+f3W7llhcXFm2yM/B+iwA4v7M+iwzx84fO/N0+XLbc7vqlk/L9ZAIkBFCKCztDqz/Vjrxfnj7/A/G5Je4q2+jAmD+yOMnvzn7/Mkjl1LxHX1iSOXw+ABpLUKNA0yrxbYl6Roe7k0ma2+QPZczf/fnYV6qAEdPf/vupx9MX9CdGzRrFbn4x65Y/qfI9UKNmxsmdyttutM95MdH2SmX5aGp/LTMdA5VC8fn1YEnLh548+zkV661lt6wLRaW1oTtNNGMFHXTxvZDml5MNUzh9Y0xkE6Kvb0SHSlj2tH175Rc1jiTzRm5e9WGzGyt0Ffdo9fQMU2LuNlCM0JkEOAEFsHdFYLyLo5Zlh16BUNvf6YM5zpf90KfHSsWWc3joVGPhFbk4HCb0bxKVyvkyEGVEavEmLtLzWqCEAIZk9RqpxU9KSbrtkuopUhFOwxmEyiViLqMCWsOI/0S+46DMdhBd7cgCkFRFECRIqyomuMGbaftdSVSvfQUXI56DY7vVPlzKMXqkIp502awX0cPI8wAhFDRdAMZR3itFspusXXNcUNAUlWSdD3bi5lUiJUO8qrGjAbNRzMcKPtoRgdeDEJRseslYbcSFcWsuxc2N6rEUYhrK8hfLWxFpW+9SeBILh/KML7VxkhpGBWfSFHwnIYsb2/gRtmLqi1O7ekJ68XOZGsowzZ2f0SmUGFb00jWA8yKS1R12dZVMtkMf9kJ6pUdYbd7iy4Pv6XSuOSVGq9c1/XN1w6LspEIGnKi5Ijo1Syi7uOP6XhpnTjUUToTcnF1S3i+EbYSpz6M1j/6RZES2Du3fOvvkScLJf1WONErbrgCpeiyagXUSiEyraMbqtwsNoQtH6OVfPm5cP3jOQBFiP8x/fvOWqO4MDP6deFK51M9OGgQqPgNleGNFjnUvav1Z+ai3E96tPn5FfJz+zTu66XMePK9LwYeWbrWfsG/7T1wrx1bfuT9XNYnV75fWqjs1wvwHx/9suPorV4cAAAAAElFTkSuQmCC',
      speakers:       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwEeLDsh4T4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADiElEQVQ4y22TW2xTdQCHv/+5dF13elm7wtjFTenKthiIIVwTMTG6xEuiggoPooYXZvCBCA8aTRQNCYaExESIMUYf8IZB0YFEQEk2IDPAkJlMCt1W2a2lHV1v6+30nL8PJsQHf8n39j18Lz9hDxxFZHOI7buo/PCtPjCcbjoW1ddUnMYWT0tjd00odYlkcTy/aJ7SNP38G8/Vz2/d1lcUQgCg5U2Bd/su5PdfPGzN/b2/W9zt3dluBbxukL4gudZuGp3aqmnbu+X25MSikStN5P/SPwUO0/kxAqD826lQeXTk1oGffhFXZhPS1WAIBxKPgC6fh7WrH2K8ro5b0zNsXd3D6YVwfN++yAr4IK/BEXE7mthz5OwQdlsHoaUtor21lXrDTTqTwdvWwrRtUm/bhP1+5M2YzMzHlhnd7m8KtbOblZf729tOjMV3zJuWaPR6yZdKBJcsweP30ftgDxvWrWEqU8AZbGbBaXBwbEKcHzqDVvzzKY8+vFaLpYqvhloyjrm5OblQLIps1eTkuV9JpdP43W4CgQCpZJL41BTVQoFkNodtNKBX41hq9X3FF6zfXMXkTnpBTMZiaHU60fFxJiI3Wba0iasj17hxI8Lx744zePES2TsJ9j7+CLlCDl1JbVJQWd687D4WK1VM00JIQaCpCYeicOrnM6zs7uLY4YN8efQTQu1teJxOWn0eapZEmPOqViiZFV9HrzscDHA9kSIWjfJa/w7yq3pZb1t4Ggwyl37ntquBd97cw/WrV7AbG7EqJVkpl4SWnC9dG5pV+j7c/TrHLlwiWTFpbgqSnk2gblxHPJvB6LiflzasR2o685cv0+PSoFIQ5Yozp6Xvlj6Px+2+3fE5ubWzQ7yysouetRuJPNBJulQkr9gswSQ1+geDYxEaPAb9Xw9IVIcwaf5KLTufvONyZJ9XSftPXxzmzJWrlIoLhNqaMPIZ/Ngoi3kmZmeYmZ7ms3MXGBwZFZorbONo2QaAu/fACys27ZQr1jwqgx29tnAYEvh/hLD1+oBUgy/up2NY+fcRgNr+1rNBd/SEbk9iVmtY1TLVShFp1bBti1qthl0rIxzNmK4nDtmJI3sAVACekcjLj0UKPP2jFDKEVQ6i6HWKrqOoDqRqgOqtKs7QSMXZt1fGPzqktL2LzA1yr+De3O/VqcZcq6ZUltvCFRYoOrIck3YtYlrhGZJvL/5X/wcsbZqbQebm3QAAAABJRU5ErkJggg==',
      townhall:       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sEBwATNwUoPKgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADN0lEQVQ4y22TT2yTdRzGP9/f+/btn3VdtbC2EsiQjM0RjEbUgxhNNGYaYzwRjTGKhyEkcjDGyMVEEkPk5mlREzl40Rg9aCIHcTMoEgEJIUM2OubWDuxot3br2rfvv9/Pw8bN5/48h8/zPMJd7eYke+QI2kSxi4UTL7783W9rrTt7tBHHsuXmQrk1W5q4vggfuwyMw/xhAGTTnpAjsiZHrZhphuSPP8SBBw/Sm8ty/9Be3AA6ndC9NtMof/3twvvezNgPieHP6U6PYW0GhGokc8zeH8aMC+5Py5hqL4tLS/ipPG5giETHCvnElh0DyVeXgmeLjcs3TsM5YwE8c+DM0d2PZl4o7fxdiafQZw29nUFIpMjkB/AjodXxabk+yZRtitti+1wn2b9y86nT9pZHThVGn899cH5+p4UBS4R0FDJ4/nsCYEHlGNz/JEZrgsAQRkaUZSgWvLfrD8c/s4v5xGv9RadYPaONUojEbEbbmvcsm3Xt8+6VHymlQjLZfrbuGEaJIKJMti+QhON/qO4rpl5xQx876pFwBeyY0JENvpEobnUarCyWaFTn0TrawC4iIoa4vfKScuIyvNJyiffE4LpClKGBRhuIMAgCohBl4Xua2pKPlhiAkbBm2e1u4LZdP525Nwn1NJHu0FTQ1h4eQhQGrNdXSSSy1Ce/ZEhNEKRGmPUep9tuo25XOxdanYDMPWno9hFEIV56o90Ag9PdR7zyFuVfHZ7InuWNpwMOv76df679IquNbl01G90vygvLiGWQO32EGrpJwQA+0GMeIGkPoSyNbVq06iE1NzKdVhPPbDulqot6cm5maapZq5BeT0MEXkaIAA/QhETaJ9Q1euMQs+CviiWofNVYuU8VlUNrVy8mD85NV5rWahUMRqcFD4gAMBhjCHSNHmdj/PO3TYQ9elxXPrqljAH+Hbs0Nb39sXYpP8U3yNol34SbG2+hEQzdcJVCGjKFHH9fnv2Z1ZPjALYIMDBOOHuoBOx1lk8cSzh/vPlO4sLWlPZTvqzbXV22xGobx0KcbD+Xp25cvXti4f+0a85BTeQJSylqk3ZPNxVvh3/2PzfsfpLPpUa+OtfZBZQB/gP2UIV9vtL8dwAAAABJRU5ErkJggg==',
      warning:        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABx0lEQVR42qWSP0gbURzHP+eZ1oIZCoprkRAR2g4uUmilDuogGGIKJTgJBQe7OFmw0gyGuGs6dhSENg10EIeIIGQxoJBBBQvapSWNWJs/tWmS9vt6VyylimkffO7u/X7vPr/7vXsW/zmsc+IPRV6k/kXQLDKiXdwR7xoV3L91mzWfD+t1gjeaPxCVRgRLMzOEIxGVV/1MhheKPRLfLyO40dZGNhajNZeDri4YH4dCgcfKxS8jeBYOE4lGwe+HjQ04OADFSsqNiLWLBNfEdjKJPxBwBAsLMDQEY2Pqa4m3yt8T788TjPb08Gp9HbxeGByEiQkIhcC009cHe3usaF1QfP2b4OX8PKHpaWcyNeW8FAw689VVGB6GWg01yNM/Bb6ODrbSaVo7O51ANgvlMvT2nlWYnYW5OWp6VFMs/y54MjlJbHHx11IP8biHVMomkTDzJtFCpeKlv/+YdProowL6PnaNoMW2rc1o9PrN7u4rnJx4KJWaOTy0yeevaj+a9BtNrE6xWGd//wM7Ozlj3RUDRhCwLJK27aFaNZXqomrOjbl8E6ei5FIUBfHZ3cjnPwXirjgSn9zksXs3fBFlV3TqHuvqRUe5ofEDKiaMbRzqM/8AAAAASUVORK5CYII='
    }
  };
  objDivImages = {
    about_16:          { width:  16, height:  16, x:  0, y:  0, image: 'about' },
    ambulancestore_16: { width:  16, height:  16, x:  0, y:  0, image: 'ambulancestore' },
    ambulancestore_50: { width:  50, height:  50, x:  2, y:  1, image: 'city1_icons' },
    architect_16:      { width:  16, height:  16, x:  0, y:  0, image: 'architect' },
    architect_50:      { width:  50, height:  50, x:  0, y:  3, image: 'city1_icons' },
    badboy_16:         { width:  16, height:  16, x:  0, y:  0, image: 'badboy' },
    badboy_50:         { width:  50, height:  50, x:  2, y:  5, image: 'city1_icons' },
    bank_16:           { width:  16, height:  16, x:  0, y:  0, image: 'bank' },
    bank_50:           { width:  50, height:  50, x:  2, y:  4, image: 'city1_icons' },
    busstop_16:        { width:  16, height:  16, x:  0, y:  0, image: 'busstop' },
    busstop_50:        { width:  50, height:  50, x:  2, y:  3, image: 'city1_icons' },
    city1_16:          { width:  16, height:  16, x:  0, y:  0, image: 'city1' },
    city1_50:          { width:  56, height:  50, x:  0, y:  0, image: 'city1_day' },
    city2_16:          { width:  16, height:  16, x:  0, y:  0, image: 'city2' },
    city2_50:          { width:  56, height:  50, x:  0, y:  0, image: 'city2_day' },
    exchange_16:       { width:  16, height:  16, x:  0, y:  0, image: 'exchange' },
    exchange_50:       { width:  50, height:  50, x:  0, y:  5, image: 'city1_icons' },
    garage_16:         { width:  16, height:  16, x:  0, y:  0, image: 'garage' },
    garage_50:         { width:  50, height:  50, x:  1, y:  4, image: 'city1_icons' },
    goodgirl_16:       { width:  16, height:  16, x:  0, y:  0, image: 'goodgirl' },
    goodgirl_50:       { width:  50, height:  50, x:  1, y:  5, image: 'city1_icons' },
    guildhouse_16:     { width:  16, height:  16, x:  0, y:  0, image: 'guildhouse' },
    guildhouse_50:     { width:  50, height:  50, x:  1, y:  0, image: 'city1_icons' },
    office_16:         { width:  16, height:  16, x:  0, y:  0, image: 'office' },
    office_50:         { width:  50, height:  50, x:  0, y:  6, image: 'city1_icons' },
    rcenter_16:        { width:  16, height:  16, x:  0, y:  0, image: 'rcenter' },
    rcenter_50:        { width:  50, height:  50, x:  0, y:  2, image: 'city1_icons' },
    shop1_16:          { width:  16, height:  16, x:  0, y:  0, image: 'shop1' },
    shop1_50:          { width:  50, height:  50, x:  0, y:  0, image: 'city1_icons' },
    shop2_16:          { width:  16, height:  16, x:  0, y:  0, image: 'shop2' },
    shop2_50:          { width:  50, height:  50, x:  0, y:  1, image: 'city1_icons' },
    shop3_16:          { width:  16, height:  16, x:  0, y:  0, image: 'shop3' },
    shop3_50:          { width:  50, height:  50, x:  2, y:  2, image: 'city1_icons' },
    shop4_16:          { width:  16, height:  16, x:  0, y:  0, image: 'shop4' },
    shop4_50:          { width:  50, height:  50, x:  1, y:  3, image: 'city1_icons' },
    speakers_16:       { width:  16, height:  16, x:  0, y:  0, image: 'speakers' },
    speakers_50:       { width:  50, height:  50, x:  0, y:  4, image: 'city1_icons' },
    townhall_16:       { width:  16, height:  16, x:  0, y:  0, image: 'townhall' },
    townhall_50:       { width:  50, height:  50, x:  2, y:  0, image: 'city1_icons' }
  }
}

//*** Helper functions *********************************************************

function $(strID) {
  return document.getElementById(strID);
}

function createElement(strType, arrAttributes, nodeAppendTo, strContent){
  var nodeNew = document.createElement(strType);
  for (var strAttribute in arrAttributes) {
    if (arrAttributes.hasOwnProperty(strAttribute)){
      nodeNew.setAttribute(strAttribute, arrAttributes[strAttribute]);
    }
  }
  if (nodeAppendTo) nodeAppendTo.appendChild(nodeNew);
  if (strContent) nodeNew.innerHTML = strContent;
  return nodeNew;
}

function removeElement(nodeToRemove) {
  return nodeToRemove.parentNode.removeChild(nodeToRemove)
}

function redirect(strURL) {
  window.location.href = strURL;
}

function runPageCode (strCode) {
  location.assign("javascript:"+strCode+";void(0)");
}

function relativePosition(nodeToFind, nodeRelativeTo) {
  var x = y = 0;
  var nodeCurrent = nodeToFind;
  if (nodeCurrent.offsetParent) {
    do {
      x += nodeCurrent.offsetLeft;
      y += nodeCurrent.offsetTop;
    } while ((nodeCurrent = nodeCurrent.offsetParent) && (nodeCurrent != nodeRelativeTo));
    return {x: x, y: y};
  }
  return false;
}
