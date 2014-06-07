// Neopets - Neoboard Fixes
// by nungryscpro (nungryscpro@yahoo.com)
// Version 1.03
// Last Updated: 2008.02.03
//
// ==UserScript==
// @name           Neopets - Neoboard Fixes
// @namespace      http://userscripts.org/users/22349
// @description    V 1.03 Provides fixes and additions to the Neopets NeoBoards.
// @include        http://www.neopets.com/neoboards/*
// @include        http://neopets.com/neoboards/*
// ==/UserScript==
//

if (document.location.href.match('/neoboards/boardlist.phtml')){
  for (x = 0; x < document.getElementsByTagName('table').length; x++){
    var thisTable = document.getElementsByTagName('table')[x];
    if (thisTable.getAttribute('border') == '0' && thisTable.getAttribute('cellpadding') == '2' && thisTable.getAttribute('cellspacing') == '0' && thisTable.getAttribute('width') == '100%'){
      for (y = 1; y < thisTable.getElementsByTagName('tr').length - 1; y++){
        var thisRow = thisTable.getElementsByTagName('tr')[y];
        if (thisRow.getElementsByTagName('td')[0].getElementsByTagName('a')[0].innerHTML == ''){   // invisible topic
          thisRow.getElementsByTagName('td')[0].getElementsByTagName('a')[0].innerHTML = '<b><i>[ Invisible Topic ]</i></b>';
        }
        var replies = parseInt(thisRow.getElementsByTagName('td')[1].innerHTML, 10);               // first resetting reply count catch
        if (replies >= 40 && replies%20 == 0){
          thisLink = thisRow.getElementsByTagName('td')[2].getElementsByTagName('a')[0];
          thisLink.href = thisLink.href.split('next')[0] +'next='+ (replies - 19);
        }
      }
    }
  }
}

// second resetting reply count catch
else if (document.location.href.match('/neoboards/topic.phtml') && document.body.innerHTML.match('javascript:history.go')){
  for (x = 50; x < document.getElementsByTagName('a').length; x++){
    var thisLink = document.getElementsByTagName('a')[x];
    if (thisLink.text == '« Previous'){
      window.location.replace(thisLink.href);
    }
  }
}

// hide font effects
else if (document.location.href.match('/neoboards/topic.phtml') && document.body.innerHTML.match('autoform_abuse')){
  for (x = 0; x < document.getElementsByTagName('table').length; x++){
    if (document.getElementsByTagName('table')[x].getAttribute('cellpadding') == '4' && document.getElementsByTagName('table')[x].getAttribute('border') == '0'){
      thisTable = document.getElementsByTagName('table')[x];
      thisTable.setAttribute('id', 'message_table');
      for (y = 0; y < thisTable.getElementsByTagName('td').length; y++){
        thisDiv = thisTable.getElementsByTagName('td')[y];
        if (thisDiv.getAttribute('width') == '60%'){
          thisDiv.removeAttribute('width');
        }
        else if (thisDiv.getAttribute('width') == '40%'){
          thisDiv.removeAttribute('width');
          username = thisDiv.getElementsByTagName('a')[0].href.split('offender=')[1].split('&')[0];

          thisDiv.innerHTML = thisDiv.innerHTML.replace('[', '<span id="'+username+'">[<a href="javascript:;" class="topicSmall">Hide font effects</a>] </span>[');

          thisDiv.getElementsByTagName('span')[0].addEventListener('click',function(){
            var thisTable = document.getElementById('message_table');
            for (x = 0; x < thisTable.getElementsByTagName('td').length; x++){
              var thisDiv = thisTable.getElementsByTagName('td')[x];
              if (thisDiv.getAttribute('class') == 'topicAuthor sf') {
                if (thisDiv.getElementsByTagName('strong')[0].innerHTML == this.id) {
                  thisDiv.nextSibling.nextSibling.getElementsByTagName('span')[0].innerHTML = '';
                  var topicCell = thisDiv.parentNode.nextSibling.nextSibling.firstChild.nextSibling;
                  for (y = 0; y < topicCell.getElementsByTagName('font').length; y++) {
                    var thisFont = topicCell.getElementsByTagName('font')[y];
                    thisFont.removeAttribute('color');
                    thisFont.removeAttribute('size');
                    thisFont.removeAttribute('face');
                  }
                  topicCell.innerHTML = topicCell.innerHTML.replace(/<\/*((sup)|(sub)|(strong)|(font)|b|i|u)>/gi, '')
                }
                x+=7;
              }
            }
          }, false);
        }
      }
      break;
    }
  }
}

// add Jelly World board
else if (document.location.href.match('/neoboards/index.phtml')){
  for (x = 0; x < document.getElementsByTagName('table').length; x++){
    var thisTable = document.getElementsByTagName('table')[x];
    if (thisTable.getAttribute('border') == '0' && thisTable.getAttribute('cellpadding') == '2' && thisTable.getAttribute('cellspacing') == '0' && thisTable.getAttribute('width') == '100%'){
      for (y = 8; y < 12; y++){
        if (thisTable.getElementsByTagName('tr')[y].innerHTML.match('ideas.gif')){
          thisTable.insertRow(y+1).innerHTML = '<td style="border-top: 1px solid rgb(0, 0, 0);" width="60"><a href="/neoboards/boardlist.phtml?board=18"><img src="http://images.neopets.com/neoboards/boardIcons/jelly.gif" alt="" border="0" height="50" width="50"></a></td><td class="blistSmall" style="border-top: 1px solid rgb(0, 0, 0);"><a href="/neoboards/boardlist.phtml?board=18"><strong>» Jelly World</strong></a><br>Jelly World? That\'s just a myth. It doesn\'t exist. Off-topic boards are considered spam and WILL be deleted. Stick to the topic, please.</td>';
        }
      }
    }
  }
}

// add Jelly World to create a topic
else if (document.location.href.match('/neoboards/create_topic.phtml')){
  for (var x = 0; x < document.forms.length; x++){
    if (document.forms[x].name == 'message_form'){
      for (var y = 0; y < document.forms[x].elements.length; y++){
        if(document.forms[x].elements[y].name == 'board_id'){
          var thisInput = document.forms[x].elements[y];
          var jw = document.createElement('option');
          jw.text = 'Jelly World';
          jw.value = '18';
          for (z = 14; z < 20; z++){
            if (thisInput.options[z-1].value == '17'){
              thisInput.add(jw, thisInput.options[z]);
              if (document.location.href.match('board=18')){
                thisInput.options[z].selected = true; 
                thisInput.options[z].blur();
              }
              break;
            } 
          }
        }
      }
    }
  }
}
