// ==UserScript==
// @name           vu_stat
// @namespace      vegzetur
// @description    Vadászat statisztikák a karakterlapon. Részletes adatokhoz kattins rá, vagy vidd a kurzort az új fejléc fölé. Néha nézz be az összes vadászathoz, akkor gyűjti be az adatokat (utólag is).
// @include        http://*.vegzetur.hu/index.php?m=vadaszat*
// @include        http://*.vegzetur.hu/index.php?m=karakterlap
// ==/UserScript==

function addStat(statno, le) { stat.num[statno]++; stat.sumle[statno] += parseInt(le); }
function sortNumber(a,b) { return b - a; }

var patt=/\/\/(.*)\.[^\/]{2,3}\//ig;
var result=patt.exec(window.location.href);
var gname = 'vdstat_' + document.evaluate("//div[@id='welcome']/strong", document, null, XPathResult.STRING_TYPE, null).stringValue + '_'+result[1];
var statname = ['apró', 'kisebb', 'normál', 'nagyobb', 'hatalmas', 'óriási', 'elfogott', 'sajtolt', 'Összes', 'Csak vadászat'];
stat = eval(GM_getValue(gname, '({display: false, dat: [], num:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], sumle: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})'));

eredmenyek = document.evaluate("//div[@class='eredmenyek_block']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (eredmenyek) {
	table = document.createElement('table');
  table.setAttribute('style', ' border: gray solid 2px; background-color: #333; ');

  stat.num[8] = 0, stat.num[9] = 0, stat.sumle[8] = 0, stat.sumle[9] = 0;
  for (i=0; i<=7; i++) { 
    stat.num[8] += stat.num[i]; stat.sumle[8] += stat.sumle[i];
    if (i<=5) { stat.num[9] += stat.num[i]; stat.sumle[9] += stat.sumle[i]; }
  }
  table.innerHTML += '<tr><th>Méret/név</th><th>darab</th><th>arány</th><th align="right">átlag</th><th align="right">összes</th></tr>';
  for (i=0; i<statname.length; i++) {
    table.innerHTML += '<tr><td>'+statname[i]+':</td><td align="right">'+stat.num[i] + '</td><td align="right">' +((stat.num[8]==0)?0:Math.round(stat.num[i]*100/stat.num[8]))+'%</td><td align="right">'+((stat.num[i]>0) ? Math.round(stat.sumle[i]/stat.num[i]) : 0)+'</td><td align="right">'+stat.sumle[i]+'</td></tr>';
  }

  div =  document.createElement('div');
  div.setAttribute('style','text-align: center;');
  div.innerHTML = 'Összesen: '+stat.num[8]+' állat. Átlag: '+((stat.num[8]==0)?0:Math.round(stat.sumle[8]/stat.num[8]))+' LE ';
  h4 = document.createElement('h4');
  h4.addEventListener('mouseover',function(){ if (!stat.display) disp.style.display = 'block'; }, true);
  h4.addEventListener('mouseout', function(){ if (!stat.display) disp.style.display = 'none';  }, true);
  h4.addEventListener('click',    function(){ stat.display=!stat.display; disp.style.display = ((stat.display)?'block':'none'); }, true);
  h4.appendChild(document.createTextNode('Vadászatok'));
  h4_out = document.createElement('div');
  h4_out.className = "h4_out";
  h4_out.appendChild(h4);
  disp = document.createElement('div');
  disp.setAttribute('style', 'text-align: center; display: ' + ((stat.display)?'block':'none') + ';');
  gomb = document.createElement('a');
  gomb.className="gomblink";
  //gomb.setAttribute('style','margin: 10px auto');
  gomb.innerHTML="<span>Nullázás</span>";
  gomb.addEventListener('click',function(){
    if (confirm('Biztos törlöd a statisztikát?')){
      GM_deleteValue(gname);
      alert('Statisztikák törölve.');
      table.style.display = 'none';
    }
  },true);
  disp.appendChild(table);
  disp.appendChild(gomb);
  eredmenyek.insertBefore(disp, eredmenyek.firstChild);
  eredmenyek.insertBefore(div, eredmenyek.firstChild);
  eredmenyek.insertBefore(h4_out, eredmenyek.firstChild);
}

var vadaszatok = document.evaluate('//div[@class="egyvadaszat"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
while (vd_data = vadaszatok.iterateNext()) {
  var ido = document.evaluate("div[@class='ido']", vd_data, null, XPathResult.STRING_TYPE, null).stringValue; 
  var ma = new Date();
  ido = ido.replace("Ma,", (ma.getMonth()+1) + ' ' + ma.getDate() + ' ' + ma.getFullYear());
  ma.setDate(ma.getDate() - 1);
  ido = ido.replace("Tegnap,", (ma.getMonth()+1) + ' ' + ma.getDate() + ' ' + ma.getFullYear());
  ido = ido.replace(/\./g, '/');
  GM_log(ido);
  var utc = Date.parse(ido);
   
  var key = '', found = false; 
  for (key in stat.dat) if (stat.dat[key] === utc) { found = true; break; }
  if (!found) {
    stat.dat.push(utc);
    var le = document.evaluate(".//span[@class='le']", vd_data, null, XPathResult.STRING_TYPE, null).stringValue; 
    var tp = document.evaluate(".//span[@class='tp']", vd_data, null, XPathResult.STRING_TYPE, null).stringValue; 
    var nev = document.evaluate(".//strong", vd_data, null, XPathResult.STRING_TYPE, null).stringValue; 
    found = false;
    for (i=0; i<=5; i++) if (nev.indexOf(statname[i]+' ')==0) { addStat(i,le); found = true; }
    if  (!found) {
      if (le=='') addStat(6,0);
      else if (tp=='') addStat(7,le);
      else  addStat(2,le);                     
    }
    
  } 
}
stat.dat=stat.dat.sort(sortNumber);
while (stat.dat.length>60) stat.dat.pop();

GM_setValue(gname, stat.toSource());