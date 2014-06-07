// ==UserScript==
// @name           Player Edit
// @namespace      GLB
// @include        http://test.goallineblitz.com/game/player.pl?player_id=*
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

function redirect() {
	var url = 'http://test.goallineblitz.com/game/edit_player.pl?player_id=' + document.location.href.split('player_id=', 2)[1] + '&strength=' + edit_box[0].value + '&blocking=' + edit_box[1].value + '&speed=' + edit_box[2].value + '&tackling=' + edit_box[3].value + '&agility=' + edit_box[4].value + '&throwing=' + edit_box[5].value + '&jumping=' + edit_box[6].value + '&catching=' + edit_box[7].value + '&stamina=' + edit_box[8].value + '&carrying=' + edit_box[9].value + '&vision=' + edit_box[10].value + '&kicking=' + edit_box[11].value + '&confidence=' + edit_box[12].value +'&punting=' + edit_box[13].value + '&action=Update'
	GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	  	'Accept': 'application/atom+xml,application/xml,text/xml'}
	})
	setTimeout("location.reload(true);",100)
}

var parent = getElementsByClassName('nonalternating_color', document)[0]
var box = parent.getElementsByTagName('td')[1]
var edit_button = document.createElement('a')
edit_button.setAttribute('style', 'position: absolute; left: 300px')
edit_button.innerHTML = 'Edit'
parent.appendChild(edit_button)
var edit_box = [document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input')]
edit_button.addEventListener("click", redirect, false)

var els = getElementsByClassName('stat_head_tall', document)
for(var i=0,j=els.length; i<j; i++) {
	els[i].parentNode.appendChild(edit_box[i])
	edit_box[i].setAttribute('value', els[i].nextSibling.innerHTML)
	edit_box[i].setAttribute('style', 'position: relative; top: 3px; left: 14px; text-align: right; z-index: 2')
	els[i].parentNode.removeChild(els[i].nextSibling)
}