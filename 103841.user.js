// ==UserScript==
// @name           LoL Tribunal Enhancement
// @namespace      http://plune.fr
// @description    Allows to hide enemies/allies chat, alerts you when the timer is finished, and display how many cases you've judged today
// @include        http://leagueoflegends.com/tribunal/case/*/review
// @include        http://*.leagueoflegends.com/tribunal/case/*/review
// ==/UserScript==


(function() {

  /*** Global ***/

    var chatContainer = document.querySelector('#judger_report .judger_chat_container');

    var options = chatContainer.querySelector('h3').appendChild(document.createElement('div'));
    options.style.cssFloat = 'right';
    options.style.textAlign = 'right';


  /*** Counter ***/

    if(!localStorage['lolcases']) {
      localStorage['lolcases'] = '';
    }

    var date = new Date().getDate(),
        judgerTitle = document.querySelector('#judger_title div'),
        cases = localStorage['lolcases'].split('|');

    if(cases[0] == date) {

      if(!~cases.indexOf(location.pathname)) {
        cases.push(location.pathname);
        localStorage['lolcases'] = cases.join('|');
      }

      judgerTitle.innerHTML = 'Cases reviewed today : '+ (cases.length - 1) +'/10';

    } else {

      localStorage['lolcases'] = date +'|'+ location.pathname;

      judgerTitle.innerHTML = 'Cases reviewed today : 1/10';

    }

    document.querySelector('#judger_skip a').addEventListener('click', function() {

      var lolcases = localStorage['lolcases'].split('|');
      lolcases.pop();
      localStorage['lolcases'] = lolcases.join('|');

    }, true);


  /*** Games ***/

    var filterType = document.querySelector('#filter_type'),
        judgerGames = document.querySelector('#judger_games');

    var gamesInterval = setInterval(function() {

      var gamesNbr = filterType.options.length;

      if(gamesNbr) {
        judgerGames.innerHTML = gamesNbr + ' games for<br />this player';
        clearInterval(gamesInterval);
      }

    }, 50);


  /*** Timer ***/

    var judgerClock = document.querySelector('#judger_clock').style,
        title = document.querySelector('title'),
        alertState = 1;

    setInterval(function() {

      if(judgerClock.display == 'none') {

        if(alertState) {
          alertState = 0;
          title.innerHTML = 'PUNISH !!!';
        } else {
          alertState = 1;
          title.innerHTML = ' ';
        }

      }

    }, 500);


  /*** Enemies Chat ***/

    var enemiesChat = options.appendChild(document.createElement('label'));
    enemiesChat.style.marginRight = '40px';

    var enemiesCheckbox = enemiesChat.appendChild(document.createElement('input'));
    enemiesCheckbox.type = 'checkbox';
    enemiesCheckbox.checked = true;

    enemiesChat.appendChild(document.createTextNode('Enemies chat'));

    enemiesChat.addEventListener('click', function() {
      var messages = chatContainer.querySelectorAll('.enemy');

      for(var i = 0, el ; el = messages[i++] ;) {
        el.parentNode.style.display = enemiesCheckbox.checked ? 'block' : 'none';
      }
    }, true);


  /*** Allies Chat ***/

    var alliesChat = options.appendChild(document.createElement('label'));

    var alliesCheckbox = alliesChat.appendChild(document.createElement('input'));
    alliesCheckbox.type = 'checkbox';
    alliesCheckbox.checked = true;

    alliesChat.appendChild(document.createTextNode('Allies chat'));

    alliesChat.addEventListener('click', function() {
      var messages = chatContainer.querySelectorAll('.allied');

      for(var i = 0, el ; el = messages[i++] ;) {
        el.parentNode.style.display = alliesCheckbox.checked ? 'block' : 'none';
      }
    }, true);


  /*** Game change events ***/

    function resetCheckboxes(e) {
      if(!e.target.classList.contains('disable')) {
        enemiesCheckbox.checked = true;
        alliesCheckbox.checked = true;
      }
    }

    document.querySelector('#filter_type').addEventListener('change', resetCheckboxes, true);
    document.querySelector('#judger_previous').addEventListener('click', resetCheckboxes, true);
    document.querySelector('#judger_next').addEventListener('click', resetCheckboxes, true);

})();