// ==UserScript==
// @name           ZDW Wasserversand
// @include        http://*kapi-regnum*main.php4?page=*
// ==/UserScript==

var uin;
for(var i = 10; i < 100; i++) {
if(uin = document.getElementsByTagName("a")[i].getAttribute("href").match(/UIN=(.[0-9a-f]*)/i)[1]) {
  break;
}
}
var html = '<br>'+
'<b>Wasserversand - 1.500 K - 0,23</b><br>'+
'<FORM METHOD="POST" ACTION="main.php4?page=lager2&UIN=' + uin + '">'+
'<input type="text" value="" size="20" maxlength="30" name="fname"/>'+
'<input type="hidden" value="1500000" name="p_anz[]"/>'+
'<input type="hidden" value="0,23" name="vbet"/>'+

'<input type="hidden" value="45" name="w_anz[]"/>'+
'<input type="hidden" value="0" name="q_anz[]"/>'+
'<input type="submit" class="send" value="Schicken"/>'+
'</form>'+
'<b>Wasserversand - 150 K - 0,21</b><br>'+
'<FORM METHOD="POST" ACTION="main.php4?page=lager2&UIN=' + uin + '">'+
'<input type="text" value="" size="20" maxlength="30" name="fname"/>'+
'<input type="hidden" value="150000" name="p_anz[]"/>'+
'<input type="hidden" value="0,21" name="vbet"/>'+

'<input type="hidden" value="45" name="w_anz[]"/>'+
'<input type="hidden" value="0" name="q_anz[]"/>'+
'<input type="submit" class="send" value="Schicken"/>'+
'</form>'+
'<br>'+
'<img src=http://www.kapi-regnum.de/pics/trenner.gif>';

var zellen = document.getElementsByTagName("td");
for(var i = 25; i < 35; i++) {
  if(zellen[i].innerHTML.match(/Bargeld/i) && !zellen[i].innerHTML.match(/nachricht/i)) { var zelle = zellen[i]; break; }
}

zelle.innerHTML += html;
//zelle.getElementsByTagName("table")[0].innerHTML += html;