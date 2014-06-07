// ==UserScript==
// @name           vu_comfort
// @namespace      vegzetur
// @description    Végzetúr komfort kiegészítők
// @version        3.2
// @include        *.vegzetur.hu*
// @exclude        *forum.vegzetur.hu*
// ==/UserScript==

var version = "3.2";

function varSave() { GM_setValue(gname, storedDatas.toSource()); }

function AddStyle(id, style) {
  var block;
  if (block = document.getElementById(id)) block.setAttribute('style', style);
}

function createObject(type, parent, objParams, pos) {
  var object = document.createElement(type);
  for (var i in objParams) object.setAttribute(i, objParams[i]);
  if (parent) {if (pos) parent.insertBefore(object, parent.firstChild); else parent.appendChild(object);}
  return(object);  
}

function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = createObject('style', head, {'type':'text/css'});
    style.innerHTML = css;
}

function SetSet(no, value) {
  while (no > storedDatas.sets.length-1) storedDatas.sets.push(0);
	storedDatas.sets[no] = value;
  varSave();
}  

function TestSet(no) {
  if (storedDatas.sets[no]==0) return(false); 
  if ((typeof (storedDatas.sets[no]) == 'undefined') && (no==13 || no==14 || no==15)) return(false);
  return(true);
}

function GetUrl(method, url, data, callback){
  GM_xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: { 'Content-type':'application/x-www-form-urlencoded', },
    onload: callback
  });
}

function findPos(obj) {
  var curleft = curtop = 0;
  if (obj.offsetParent) {
    do { curleft += obj.offsetLeft; curtop += obj.offsetTop; }
    while (obj = obj.offsetParent);
  }
  return [curleft,curtop];
}

var dragx,dragy;
var dragobj=false;
document.addEventListener('mousemove', function(event) {
  if (dragobj) {
    dragobj.style.left = (dragx + event.clientX) +'px';
    dragobj.style.top  = (dragy + event.clientY) +'px';
  }
  return false;
}, true);
document.addEventListener('mouseup', function(event) {
  if (dragobj) {
    var pos = findPos(dragobj);
    storedDatas['panel_'+dragobj.id] = findPos(dragobj);
    varSave();
    dragobj=false;
    //event.preventDefault();
  }
}, true);
document.addEventListener('mousedown', function(event) {
  dragobj = event.target;
  while (dragobj.tagName != "HTML" && dragobj.tagName != "A" && dragobj.className!="comfortbox" && dragobj.className!="nodrag") { dragobj = dragobj.parentNode;}
  if (dragobj.className=="comfortbox" && dragobj.id) {
    dragx = parseInt(dragobj.style.left || 0) - event.clientX;
    dragy = parseInt(dragobj.style.top || 0) - event.clientY;
    //event.preventDefault();
    return false;
  } else dragobj = false;
}, true);

function ScrollTo(pos) {
  return function () { window.scrollTo(0,pos); }
}

function versionCheck() {
  var url = 'http://userscripts.org/scripts/source/81458';
  if (!storedDatas.version_check_time) { storedDatas.version_check_time=0; }
  if ((storedDatas.time-storedDatas.version_check_time > 4*3600) || (!storedDatas.version) || (storedDatas.version!=version)) {
    daily_routine();
    GetUrl('GET', url, '', function (res) {
      pattern = /version\s+([\d\.]+)/img;
      var result = pattern.exec(res.responseText);
      if (result && result[1]>version) storedDatas.msg_version = '<a href="'+url.replace('source', 'show')+'">VU_Comfort új verzió ('+result[1]+')</a>'; 
      else storedDatas.msg_version = '';
      storedDatas.version = version;
      storedDatas.version_check_time = storedDatas.time; 
      varSave();
    });
  }
}

function Messages() {
  var box = comfortPart('ComfortPanel');
  var msg = createObject('div', box, {'class':'counters'});
  msg.innerHTML = 'Rendszeridő: ';
  if (temp=document.getElementById('rendszerido')) msg.appendChild(temp);
  for (var i in storedDatas) {
    if ((i.substr(0,4) == 'msg_') && (storedDatas[i].length>1)) {
      var msg = createObject('div',box, {'class':'counters'});
      msg.innerHTML = storedDatas[i];
    }
  }
  if (document.location.href.substr(-9) == 'm=allatok') {
    temp =  createObject('li', box);
    animButton = createObject('a', temp, {'title':'Összes állatok adatait bemásolja netes kalkulátorba'});
    animButton.innerHTML = 'Állatfejlődés calc.';
    animButton.addEventListener("click", function() { AnimCalc(); }, true);
  }
}

function SetTextArea(no) {
  var id = 'comfort_textarea';
  if (!document.getElementById(id)) {
    if (storedDatas['panel_'+id]==undefined) storedDatas['panel_'+id] = [0,0];
    var areaBox = createObject('div', document.getElementById('jobb'), {'id':id, 'class':'comfortbox'});
    areaBox.style.left = storedDatas['panel_'+id][0] + 'px';
    areaBox.style.top = storedDatas['panel_'+id][1] + 'px';
    var form = createObject('form', areaBox );
    var textBox = createObject('textarea', form, {'name':no, 'value':storedDatas.sets[no], 'class':'nodrag'});
    textBox.value = storedDatas.sets[no];
    textBox.addEventListener('change', function () {SetSet(this.name, this.value);}, true); 
    var closeButton = createObject('input', areaBox, {'type': 'button', 'value': 'Mentés', 'id': 'closeButt'});
    closeButton.addEventListener('click', function () {document.getElementById(id).parentNode.removeChild(areaBox);}, true);
  }
}

function AddSettings(pelem, ss, no ) {
  tmpRow = pelem.insertRow(-1);
  tmpCell=tmpRow.insertCell(-1);
  tmpCell.innerHTML = ss[2];
  tmpCell=tmpRow.insertCell(-1);
  
  if (ss[1]=='checkbox') {
    var input = createObject('input', tmpCell, {'type':ss[1], 'name':ss[0], 'value':storedDatas.sets[ss[0]]});
    if (TestSet(ss[0])) input.setAttribute('checked', true);
    input.addEventListener('change', function () {SetSet(this.name, (this.checked?1:0));}, true); 
  }
  if (ss[1]=='select') {
    var input = createObject('select', tmpCell, {'name':ss[0]});
    for (i in ss[3]) { 
      temp = ss[3][i].split('|');
      if (temp.length == 2) { 
        options = createObject('option', input, {'value':temp[0]});
        options.innerHTML = temp[1];
      }
    }
    for (i in input.options) if (input.options[i].value == storedDatas.sets[ss[0]]) input.selectedIndex = i;
    input.addEventListener('change', function () {SetSet(this.name, this.options[this.selectedIndex].value);}, true); 
  }
  if (ss[1]=='text') {
    var input = createObject('input', tmpCell, {'style':'width:40px;', 'type':ss[1], 'name':ss[0], 'value':storedDatas.sets[ss[0]]});
    input.value = storedDatas.sets[ss[0]];
    input.addEventListener('click', function () {SetTextArea(ss[0]);}, true); 
  }
} 

function Settings() {
  var id = 'comfort_settings';
  if (!document.getElementById(id)) {
    if (storedDatas['panel_'+id]==undefined) storedDatas['panel_'+id] = [0,0];
    var settingsBox = createObject('div', document.getElementById('jobb'), {'id':id, 'class':'comfortbox'});
    settingsBox.style.left = storedDatas['panel_'+id][0] + 'px';
    settingsBox.style.top = storedDatas['panel_'+id][1] + 'px';
    
    var sets = [[18, 'select',   'COMFORT PANEL', ['0|Kikapcsolva', '1|Nyitott', '2|Lenyíló']], 
                [ 0, 'checkbox', 'Állatszakértelmek&nbsp;növelése'], 
                [ 1, 'checkbox', 'Fejléc eltüntetése'],  
                [ 2, 'checkbox', 'Fix (mindig látható) menü'], 
                [ 3, 'select',   'Jegyzetfüzet', ['0|Kikapcsolva', '1|Comfort Panelen', '2|Lap alján']], 
                [ 4, 'checkbox', 'Épületek tömörítve'], 
                [ 5, 'checkbox', 'Elrejtett leírások'], 
                [ 6, 'checkbox', 'Vadászat statisztika'], 
                [ 7, 'checkbox', 'Esszenciák kikapcsolása'], 
                [ 8, 'checkbox', 'Kalandszövegek elrejtése'], 
                [ 9, 'checkbox', 'Kalandpróbák kibontása'], 
                [10, 'text',     'Portya megjelölés'], 
                [11, 'checkbox', 'LE szívás számolás csatákban'], 
                [12, 'checkbox', 'Aktív&nbsp;küldetés&nbsp;kiírása'], 
                [13, 'checkbox', 'Napi rutin: munka aukciósházban'], 
                [14, 'checkbox', 'Napi rutin: lélekkút kisütés'], 
                [15, 'checkbox', 'Napi rutin: gyógyital vásárlás'], 
                [16, 'select',   'Százalékos ÉP/VP/TP kijelzés', ['0|Kikapcsolva', '1|Mind %', '2|Maradék TP']], 
                [17, 'checkbox', 'Tartalomjegyzék'], 
                [19, 'text',     'Linkek'], 
                [20, 'text',     'Tudatturbó'], 
               ];
    var settable = createObject('table', settingsBox, {});
    for (i in sets) AddSettings(settable, sets[i]);  
    var closeButton = createObject('input', settingsBox, {'type': 'button', 'value': 'Bezár', 'id': 'closeButt'});
    closeButton.addEventListener("click", function () {document.getElementById('comfort_settings').parentNode.removeChild(settingsBox);}, true);

    addGlobalStyle(
      '#comfort_settings { z-index:99; width: 400px;}' +
      '#closeButt, .closeButt { margin-top: 10px; }' +
      '#comfort_textarea { z-index:100; width: 700px; height: 400px;  padding: 10px 15px 55px 10px; background-color: black; border: 1px solid silver; color: white; font-family: Verdana, sans-serif; font-size: small; }' +
      '#comfort_textarea textarea {width: 100%; height: 400px;}'
    );  
  }
}

function contentList() {
  var charData = document.evaluate('//div[@class="h3_out"]/h3', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (charData.snapshotLength>0) {
    var box = comfortPart('Oldal tartalom');
    for (i=0; i<charData.snapshotLength; i++) {
      var liElem = createObject('li', box, {});
      var settingsElem = createObject('a', liElem, {'class':'contentlist'});
      settingsElem.innerHTML = charData.snapshotItem(i).textContent.substr(0,20);
      settingsElem.addEventListener("click", ScrollTo(findPos(charData.snapshotItem(i))[1]), true);
    }
  }
}

function Adventure() {
  if (TestSet(8)) {
    var probak = document.evaluate('//div[@class="kaland_proba"]/div[@class="text"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; i<probak.snapshotLength; i++) probak.snapshotItem(i).innerHTML = "";
  }
  if (TestSet(9)) {
    var probak = document.evaluate('//div[@class="kaland_proba"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; i<probak.snapshotLength; i++) probak.snapshotItem(i).setAttribute('style', 'display: block !important');
  }
  GM_xmlhttpRequest({ 
    method:'GET', 
    url:'http://vegzetur.wikidot.com/kalandlista', 
    onload: function (res) {
      kd = new DOMParser().parseFromString(res.responseText.substring(res.responseText.indexOf('<table'), res.responseText.indexOf('</table>')+8), "text/xml");
      wk = kd.getElementsByTagName('tr');
      var sk = document.evaluate("//table[@class='kalandok_lista']/tbody/tr/td[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (i=0; i<wk.length; i++) {
        td = wk[i].getElementsByTagName('td');
        if (td.length>=2) {
          for (var n = 0; n < sk.snapshotLength; n++) {
            kk = sk.snapshotItem(n);
            if (td[1].textContent == kk.textContent) {
              kt = '';
              for (j=2; j<td.length; j++) if (td[j].textContent.length>1) kt += ' | ' + td[j].textContent;
              kk.innerHTML += '<div>' + kt.slice(3) + '</div>';
            }
          }
        }
      }
    }
  });
  patt=/kaland\=(\d+)$/ig;
  var result=patt.exec(window.location.href);
  if (result) {
    patt=storedDatas.lv+'@@@'+result[1]+'@@@'+document.evaluate("//div[@class='kaland']/div/h3", document, null, XPathResult.STRING_TYPE, null).stringValue;
    var probak = document.evaluate('//div[@class="proba_leiras"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; i<probak.snapshotLength; i++) {
      var proba = probak.snapshotItem(i).innerHTML + '>';
      patt += '@@@' + proba.substr(0,proba.indexOf('>'))
    }
    GetUrl('POST', 'http://vgztur.vacau.com/kalandLoad.php', 'd='+encodeURI(patt), function(){});
  }
}

function NotePad() {
  if (storedDatas.sets[3]==1) var notePad = createObject('div', comfortPart('Jegyzetek')); 
                         else var notePad = createObject('div', document.getElementById("jobb_in")); 
  notePad.innerHTML = '<form><textarea id="notepad" cols=24 rows=10 style="width:98%;" class="nodrag">'+storedDatas.notepad+'</textarea><form><br /><input type="button" value="Jegyzet mentése" id="note_save">';
  if (notePadButton = document.getElementById('note_save')) notePadButton.addEventListener("click", saveNote, true);
  function saveNote() {
    storedDatas.notepad = document.getElementById('notepad').value; 
    varSave();
    alert('Jegyzetek elmentve');
  }
}

function EpPercent() {
  var charData = document.evaluate('//div[@id="login_block"]/div[@id="welcome"]/span', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i=1; i<charData.snapshotLength; i++) {
    charData.snapshotItem(i).innerHTML = charData.snapshotItem(i).innerHTML.replace(' ','&nbsp;');
    if (i==3 && storedDatas.sets[16]==2) charData.snapshotItem(i).innerHTML += '&nbsp;(-' + Math.round(storedDatas.ch[i]-parseInt(charData.snapshotItem(i).textContent.replace(/[^\d]+/ig,""))) + ')';
    else charData.snapshotItem(i).innerHTML += '&nbsp;(' + Math.round(parseInt(charData.snapshotItem(i).textContent.replace(/[^\d]+/ig,""))*100/storedDatas.ch[i]) + '%)';
    if (i==1) charData.snapshotItem(i).nextSibling.textContent = ' \n';
  }
}

function AnimCalc() {
  var animdata = new Array(); var animno = 0;
  var animals = document.evaluate('//div[@class="allatok"]/table/tbody/tr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var animrow=0; animrow<animals.snapshotLength; animrow++) {
    temp = animals.snapshotItem(animrow).textContent;
    if (i = temp.match(/[^\d](\d+)\. SzintAlap/i)) { animdata[++animno] = Array(i[1], 0, 0, 0); }
    if (i = temp.match(/([\d\.]+) \/ ([\d\.]+) TP/i)) animdata[animno][1] = i[1].replace('.','');
    if (i = temp.match(/intelligencia(\d+)/i)) animdata[animno][2] = i[1];
    if (i = temp.match(/\+(\d+) TP győz/i)) animdata[animno][3] = i[1];
  }
  url = 'http://jeriko.hu/vu/animals.php?kennel=24&intkedv=55&anim_no='+animno;
  for (i=1;i<=animno;i++) { url +='&animlvl'+i+'='+animdata[i][0]+'&animtp'+i+'='+animdata[i][1]+'&animiq'+i+'='+animdata[i][2]+'&animitem'+i+'='+animdata[i][3]; }
  window.open(url);
}

function Animals() {
  var animals = document.evaluate('//td[@class="center"]/img[contains(@src,"pic/creature/")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var textpos = document.evaluate('//div[@class="allatok"]/div[@class="message_center"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if ((textpos.singleNodeValue) && (animals.snapshotLength>0)) textpos.singleNodeValue.innerHTML += "<br />Összesen " + animals.snapshotLength + " állatod van.";
  
  var animals = document.evaluate('//div[@class="allat_szakertelmek"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var animno=0; animno<animals.snapshotLength; animno++) {
    var animal_no = animals.snapshotItem(animno).id.match(/_(\d+)$/i)[1];
    var skills = document.evaluate(".//table/tbody/tr/td/table/tbody/tr[@class='link_sor']", animals.snapshotItem(animno), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    for (var skillno=0; skillno<skills.snapshotLength; skillno++) {
      var skill = skills.snapshotItem(skillno);
      var skill_name = skill.firstChild.firstChild.innerHTML;
      skill.addEventListener('click', skill_inc(animal_no, skill_name), true);
      var node = skill.lastChild.lastChild;
      if ((node.nodeName=='A') && (skill_name == storedDatas['anim_' + animal_no]) && TestSet(0)) window.location.href = node.href;
      if (skill_name == storedDatas['anim_' + animal_no]) { skill.firstChild.setAttribute('style', 'border: 2px solid #0f0;'); }
    }
  }
  if (document.location.href.substr(-9) == 'm=allatok') {
    var result = document.getElementById('jobb_in').innerHTML.match(/\d{4,9}/g);
    if (result && (result.constructor == Array)) {
      for (i in storedDatas) if (i.indexOf('anim_')==0 && result.indexOf(i.substr(5))==-1) { delete storedDatas[i]; }
    }
  }
  function skill_inc(animal_no, skill_name) {
    return function () {
      storedDatas['anim_' + animal_no] = skill_name;
      varSave();
    }
  }
}

function addStat(statno, le) { stat.num[statno]++; stat.sumle[statno] += parseInt(le); }

function vdStat() {
  var statname = ['apró', 'kisebb', 'normál', 'nagyobb', 'hatalmas', 'óriási', 'elfogott', 'sajtolt', 'kaland', 'kiégett őskő', 'esszencia', '<b>Összes</b>', '<b>Csak vadászat</b>'];
  stat = eval(GM_getValue('vdstat_' + gname, '({display: false, dat: [], num:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], sumle: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})'));
  eredmenyek = document.evaluate("//div[@class='eredmenyek_block']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (eredmenyek) {
    disp = createObject('div', eredmenyek, {'style':'text-align: center; display: ' + ((stat.display)?'block':'none') + ';'}, true);
    table = createObject('table', disp, {'style':'border: gray solid 2px; background-color: #333;'});
    stat.num[11] = 0, stat.num[12] = 0, stat.sumle[11] = 0, stat.sumle[12] = 0;
    for (i=0; i<=7; i++) { 
      stat.num[11] += stat.num[i]; stat.sumle[11] += stat.sumle[i];
      if (i<=5) { stat.num[12] += stat.num[i]; stat.sumle[12] += stat.sumle[i]; }
    }
    table.innerHTML += '<tr><th>Méret/név</th><th>darab</th><th>arány</th><th align="right">átlag</th><th align="right">összes</th></tr>';
    for (i=0; i<statname.length; i++) {
      if (!stat.num[i]) { stat.num[i]=0; stat.sumle[i]=0; }
      table.innerHTML += '<tr><td>'+statname[i]+':</td><td align="right">'+stat.num[i] + '</td><td align="right">' +((stat.num[11]==0)?0:Math.round(stat.num[i]*100/stat.num[11]))+'%</td><td align="right">'+((stat.num[i]>0) ? Math.round(stat.sumle[i]/stat.num[i]) : 0)+'</td><td align="right">'+stat.sumle[i]+'</td></tr>';
    }

    div = createObject('div', eredmenyek, {'style':'text-align: center;'}, true);
    div.innerHTML = 'Összesen: '+stat.num[11]+' állat. Átlag: '+((stat.num[11]==0)?0:Math.round(stat.sumle[11]/stat.num[11]))+' LE ';
    h4_out = createObject('div', eredmenyek, {'class':'h4_out'}, true);
    h4 = createObject('h4', h4_out);
    h4.appendChild(document.createTextNode('Vadászatok'));
    h4.addEventListener('mouseover',function(){ if (!stat.display) disp.style.display = 'block'; }, true);
    h4.addEventListener('mouseout', function(){ if (!stat.display) disp.style.display = 'none';  }, true);
    h4.addEventListener('click',    function(){ stat.display=!stat.display; disp.style.display = ((stat.display)?'block':'none'); }, true);
    gomb = createObject('a', disp, {'class':'gomblink'});
    gomb.innerHTML="<span>Nullázás</span>";
    gomb.addEventListener('click',function(){
      if (confirm('Biztos törlöd a statisztikát?')){
        GM_deleteValue('vdstat_' + gname);
        alert('Statisztikák törölve.');
        table.style.display = 'none';
      }
    },true);
  }

  var vadaszatok = document.evaluate('//div[@class="egyvadaszat"]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while (vd_data = vadaszatok.iterateNext()) {
    var ido = document.evaluate("div[@class='ido']", vd_data, null, XPathResult.STRING_TYPE, null).stringValue; 
    var ma = new Date();
    ido = ido.replace("Ma,", (ma.getMonth()+1) + ' ' + ma.getDate() + ' ' + ma.getFullYear());
    ma.setDate(ma.getDate() - 1);
    ido = ido.replace("Tegnap,", (ma.getMonth()+1) + ' ' + ma.getDate() + ' ' + ma.getFullYear());
    ido = ido.replace(/\./g, '/');
    var utc = Date.parse(ido);
     
    var key = '', found = false; 
    for (key in stat.dat) if (stat.dat[key] === utc) { found = true; break; }
    if (!found) {
      stat.dat.push(utc);
      var le = document.evaluate(".//span[@class='le']", vd_data, null, XPathResult.STRING_TYPE, null).stringValue; 
      var tp = document.evaluate(".//span[@class='tp']", vd_data, null, XPathResult.STRING_TYPE, null).stringValue; 
      var nev = document.evaluate(".//strong", vd_data, null, XPathResult.STRING_TYPE, null).stringValue; 
      if (vd_data.innerHTML.indexOf('egy kalandra bukkantál')>0) addStat(8,0);
      if (vd_data.innerHTML.indexOf('kiégett őskövet')>0) addStat(9,0);
      if (vd_data.innerHTML.indexOf('esszenciát)')>0) addStat(10,0);
      found = false;
      for (i=0; i<=5; i++) if (nev.indexOf(statname[i]+' ')==0) { addStat(i,le); found = true; }
      if  (!found) {
        if (le=='') addStat(6,0);
        else if (tp=='') addStat(7,le);
        else  addStat(2,le);                     
      }
      
    } 
  }
  stat.dat=stat.dat.sort(function (a,b) { return b - a; });
  while (stat.dat.length>60) stat.dat.pop();
  GM_setValue('vdstat_' + gname, stat.toSource());
}

function SetBF(buildingSelect, buildingForm, mode) {
  if (mode>0) buildingSelect.selectedIndex = mode; else { storedDatas.sets[21] = buildingSelect.value; varSave(); } 
  while (buildingForm.childNodes.length >= 1 ) {buildingForm.removeChild(buildingForm.firstChild );} 
  if (bf = document.evaluate('//div[@id="'+buildingSelect.value+'"]/div/form', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
    buildingForm.appendChild(bf.previousSibling.cloneNode(true));
    buildingForm.appendChild(bf.cloneNode(true));
  }
}

function Epuletek() {
  addGlobalStyle('div.egyepulet, div.egyepulet_grey {height: 30px; overflow:hidden; }');  
	var b_node = [];
  var mainDiv = 0;
  var buildCount = 0;
  var patt=/( [\d\.]+)%/;
  divs = document.getElementsByTagName('div');
	for (i=0; i<divs.length; i++) {
    if (divs[i].className=='szovetseg_reszletes') {
      mainDiv = divs[i];
      var buildingDiv = createObject('div', mainDiv, {'class':'message_center'}, true);
      buildingDiv.innerHTML = '<div>ÉPÍTÉS</div>';
      var buildingSel = createObject('form', buildingDiv, {});
      var buildingSelect = createObject('select', buildingSel, {});
      buildingSelect.innerHTML = '<option value="">-- Válassz épületet! --</option>';
      var buildingForm = createObject('div', buildingDiv, {'id':'b_form'});
      buildingSelect.addEventListener('change', function () {SetBF(buildingSelect, buildingForm, 0);}, true);
    }
    if (divs[i].className=='egyepulet' || divs[i].className=='egyepulet_grey' ) {
      nodedata = [divs[i], -1];
      divs[i].addEventListener('mouseover', function () { this.style.height = 'auto'; }, true);
			divs[i].addEventListener('mouseout',  function () { this.style.height = '30px'; }, true);
      kes = divs[i].getElementsByTagName('div');
      for (j=0; j<kes.length; j++) {
        if (kes[j].className=='h3_out') {
          buildCount++;
          divs[i].setAttribute('id', 'bf_' + buildCount);
          buildingSelect.innerHTML += '<option value="bf_'+buildCount+'">' + kes[j].textContent + '</option>'
        }
        if (kes[j].className=='keszultseg') {
          if (result=patt.exec(kes[j].innerHTML)) { 
            divs[i].firstChild.firstChild.innerHTML += '<span style="float: right">' + result[1] + '%</span>';
            nodedata[1] = Number(result[1]);
          }
        }          
      }
      b_node.push(nodedata);
    }
  }
  b_node.sort(function(a, b) {return (a[1]<b[1] ? 1 : -1);});
  for (i=0; i<b_node.length; i++) mainDiv.appendChild(b_node[i][0]);
  var inputs = document.evaluate('//input[@name="epites"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0; i<inputs.snapshotLength; i++) inputs.snapshotItem(i).value = 9999999;
  if (turbo == 'manakonstrukció') {
    var radios = document.evaluate('//input[@name="mibol" and @type="radio" and @value="5"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; i<radios.snapshotLength; i++) { radios.snapshotItem(i).checked = true; }
  }
  for (i in buildingSelect.options) if (buildingSelect.options[i].value == storedDatas.sets[21]) SetBF(buildingSelect, buildingForm, i);
}

function getTurboData() {
  if (!storedDatas.sets[20] || storedDatas.sets[20].length < 3) {
    storedDatas.sets[20] = '';
    var turboOpts = document.evaluate('//div[@class="szakertelmek"]/form[@class="tudatturbo"]/select[@name="szakertelem"]/option', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; i<turboOpts.snapshotLength; i++) storedDatas.sets[20] += turboOpts.snapshotItem(i).value + '|' + turboOpts.snapshotItem(i).innerHTML + '\n';
  }
}

function getUText(element, mode) {
  return element.textContent.substr(mode,22).replace(/[\d\n\r\t\s]+/ig, '');
}

function InfoText() {
  var infoElements = ['//div[@class="jobb_content"]/div/div[starts-with(@class,"text")]', '//div[@class="ajanlas_uzenet"]', '//div[@class="banner"]', '//div[@id="linklista"]'];
  addGlobalStyle('div.info_button { border: 1px solid #568; width: 35px; padding: 2px; color: white; background-color: #568; }');  
  var infoID='info2_';
  for (i in storedDatas) if (i.substr(0,5)=='info_') delete storedDatas[i];
  for (j in infoElements) {
    var headers = document.evaluate(infoElements[j], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; i<headers.snapshotLength; i++) {
      var elem = headers.snapshotItem(i);
      elem.setAttribute('style', 'overflow:hidden; height: '+((storedDatas[infoID + getUText(elem, 0)]) ? 'auto;' : '18px;'));
      var infoButton = createObject('div', elem, {'class':'info_button'}, true);
      infoButton.innerHTML = 'INFO';
      infoButton.addEventListener('click', function () { 
        var pos = getUText(this.parentNode, 4); 
        if (this.parentNode.style.height != 'auto') storedDatas[infoID + pos] = true; else delete storedDatas[infoID + pos];
        this.parentNode.style.height = (storedDatas[infoID + pos] ? 'auto' : '18px');
        varSave();
      }, true);
    }
  }
}

function EsszOff() {
  var essz_links = document.evaluate("//img[@src='pic/add_red.png']/parent::a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i=0; i<essz_links.snapshotLength; i++) essz_links.snapshotItem(i).parentNode.removeChild(essz_links.snapshotItem(i));
}

function CalcRegen() {
  var regT = 'regen_';
  var dT = storedDatas.time - storedDatas[regT + 'time'];
  var charData = document.evaluate('//form[@class="oltozetform"]/select', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null);
  if (charData.singleNodeValue) storedDatas.html_clothes = charData.singleNodeValue.innerHTML;
  var charData = document.evaluate('//div[@class="karakterlap"]/div[@class="h3_out"]/h3', document, null, XPathResult.STRING_TYPE, null).stringValue;
  storedDatas.lv = charData.replace(/.*- (\d+)\..*/ig, '$1');
  storedDatas.ch[0] = parseInt(charData.replace(/.*- (\d+)\..*/ig, '$1'));
  var charData = document.evaluate('//div[@class="avatar_block"]/table/tbody/tr/td/span/span[@class="csik_szoveg"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i=0; i<charData.snapshotLength; i++) {
    temp = charData.snapshotItem(i).innerHTML.replace(/\./ig, "");
    var patt=/([\d\.]+)[^\d]{2,5}([\d\.]+) (..)/i;
    var result=patt.exec(temp);
    if (result[3]) { 
      result[1] = parseInt(result[1]);
      result[2] = parseInt(result[2]);
      storedDatas.ch[i+1] = result[2];
      if (storedDatas[regT + result[3]] && (result[1]>storedDatas[regT + result[3]])) {
        var frtime = dT/(result[1]-storedDatas[regT + result[3]])*result[2]/60;
        var ttmax = frtime*(result[2]-result[1])/result[2];
        charData.snapshotItem(i).setAttribute('title', Math.round(result[2]/frtime) + ' ' + result[3] +'/perc - Regenerálás(hátralévő/teljes): ' + Math.round(ttmax) + ' / ' + Math.round(frtime) + ' perc');
      } else charData.snapshotItem(i).setAttribute('title', 'Az aktuális ' + result[3] + ' adatok alapján a regenerálódás nem számolható.');
      storedDatas.ch[i+4] = result[1];
      storedDatas[regT + result[3]] = result[1]; 
    }
  }
  storedDatas[regT + 'time'] = storedDatas.time;
}

function EnemyClass() {
  if (storedDatas.sets[10]&&storedDatas.sets[10].length>0) {
    var charData = document.evaluate('//div[@class="portyazas"]/div[@class="table_650"]/table[@class="csatalista"]/tbody/tr/td/a/span', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i=0; i<charData.snapshotLength; i++) if (charData.snapshotItem(i).innerHTML==='Támadás') {
      var link = charData.snapshotItem(i).parentNode.href; //
      link = link.match(/tev=portya_sart\&ellenfel\=(\d+)$/);
      patt=new RegExp('([^,:]+)[:,]+[,\\d ]*[^\\d]'+link[1]+'[^\\d]','img');
      var result=patt.exec(storedDatas.sets[10]);
      if (result) charData.snapshotItem(i).innerHTML=result[1];
    }
  } else storedDatas.sets[10] = 'minta1: 111111,222222,444444,666666,\nminta2: 121212, 131313, 123123, 124124,\nminta3: 234234, 234434, 345345,';
}

function panelLinks() {
  var box = comfortPart('Linkek');
  var sets = [['Beállítások', '#'], ['VU info', 'http://vgztur.vacau.com/'], ['VU wiki', 'http://vegzetur.wikidot.com/']];
  if (!storedDatas.sets[19]) storedDatas.sets[19]='Épületek|?m=szovetseg&sub=epuletek\nEpikus|?m=szovetseg&sub=epikus_csata\nBuzogány kézbe|?m=karakterlap&tev=visel&targy=2';
  var links = storedDatas.sets[19].split('\n');
  for (i in links) sets.push(links[i].split('|'));
  for (i in sets) if (sets[i].length==2) {
    var new_link = createObject('div', box);
    if (sets[i][1]=='#') temp = 'id="comf_settings"'; else temp = 'href="'+(sets[i][1].substr(0,1)=='?'?storedDatas.world:'')+sets[i][1]+'"';
    new_link.innerHTML = '<li><a ' + temp + (sets[i][1].substr(0,4)=='http' ?' target="_blank"':'') + '>'+sets[i][0]+'</a></li>';
  }
  box = document.getElementById('comf_settings');
  if (box) box.addEventListener("click", function () { Settings(); }, true);
}

function selectClothes() {
  var form = createObject('form', comfortPart('Öltözetek'));
  var select = createObject('select', form);
  select.innerHTML = '<option></option>' + storedDatas.html_clothes;
  select.addEventListener('change', function () {
    window.location.href = storedDatas.world + "?m=karakterlap&tev=oltozet_valtas&oltozet=" + this.value;
  }, true); 

}

function selectTurbo() {
  var turboInfo = document.evaluate('//div[@class="tudatturbo_info"]/a/script', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!storedDatas.sets[20]) storedDatas.sets[20]='';
  var turbos = storedDatas.sets[20].split('\n');
  if (turbos.length>1 && (turboInfo == null)) {
    var form = createObject('form', comfortPart('Tudatturbó'));
    var select = createObject('select', form, {'class':'nodrag'});
    for (i in turbos) {
      temp = turbos[i].split('|');
      if (temp.length==2) select.innerHTML += '<option value="'+temp[0]+'">'+temp[1]+'</option>';
    }
    select.addEventListener('change', function () {
      window.location.href = storedDatas.world + "?m=szakertelmek&tev=tudatturbo&szakertelem=" + this.value;
    }, true); 
  }
}

function seDrain() {
  var drain = 0;
  var drainData = document.evaluate('//span[@class="drain"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i=0; i<drainData.snapshotLength; i++) drain += parseInt( drainData.snapshotItem(i).innerHTML.replace( /.*\(([+-]\d+) .*/, "$1" ));
  if (TestSet(11) && (drain!=0) && (menuData = document.evaluate('//div[starts-with(@class,"result_")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue)) { 
    menuData.innerHTML = menuData.innerHTML.replace( /(.*? \d+) (.*)/, "$1 (" + (drain>0 ? "+" : "") + drain + ") $2" );
  }
}

var lastKeypressTime = 0;
function KeyHandler(event) {
  if ( String.fromCharCode(event.which).toUpperCase()=='X') {
    var thisKeypressTime = new Date();
      if ( thisKeypressTime - lastKeypressTime <= 500 ) ComfortPanel(1);
    lastKeypressTime = thisKeypressTime;
  }
}

function getMission() {
  var mission = document.evaluate("//div[@class='kuldetesek']/div[@class='h3_out']/following-sibling::div", document, null, XPathResult.STRING_TYPE, null).stringValue;
  if (mission) storedDatas.msg_mission = '<b>Küldetés:</b> ' + mission; else storedDatas.msg_mission = 'NINCS AKTÍV KÜLDETÉS!'; 
}

function setDaily(ii) {
  storedDatas.daily[ii] = storedDatas.day; 
  varSave();
}
function daily_routine() { 
  var sets = [[13, 'm=aukcioshaz&sub=aranydukat&tev=munka2'],
              [14, 'm=lelekkut_kisutese&tev=aktivalas'], 
              [15, 'm=lelekkufar&tev=italvasarlas']]; 
  if (!storedDatas.daily) storedDatas.daily = [0,0,0];
  for (i in sets) if (storedDatas.sets[sets[i][0]]==1 && (!storedDatas.daily[i] || (storedDatas.day != storedDatas.daily[i]))) {
    GetUrl('GET', storedDatas.world + '?' + sets[i][1], '', setDaily(i));
  }
}

function comfortPart(name) {
  var comfortDiv = createObject('div', comfortBox, {'name':name});
  var comfortHeader = createObject('div', comfortDiv, {'class':'fomenu_sor'});
  comfortHeader.innerHTML = name;
  return comfortDiv;
}

function ComfortPanel(set) {
  if (comfortBox!=undefined) { comfortBox.parentNode.removeChild(comfortBox); }
  if (set==1) SetSet(18,(TestSet(18)? 0:1)); 
  if (TestSet(18)) {
    var id = 'fomenu';
    if (storedDatas['panel_'+id]==undefined) storedDatas['panel_'+id] = [0,0];
    comfortBox = createObject('div', document.getElementById("jobb"), {'id':id, 'class':'comfortbox', 'name':'comfortbox'});
    comfortBox.style.left = storedDatas['panel_'+id][0] + 'px';
    comfortBox.style.top = storedDatas['panel_'+id][1] + 'px';
    comfortBox.style.padding = '5px';
    addGlobalStyle(".comfortbox { position: fixed; z-index:99; width: 180px; overflow: hidden; padding: 4px; border: 1px solid silver; color: white; font-family: Verdana, sans-serif; font-size: small;"
                  +" background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAPSURBVHjaYmJgYJgJEGAAAKgAnIV7aYMAAAAASUVORK5CYII=') repeat;}");  
    if (storedDatas.sets[18]==2) {
      comfortBox.style.height = '40px';
      comfortBox.addEventListener('mouseover', function () { this.style.height = 'auto'; }, true);
      comfortBox.addEventListener('mouseout',  function () { this.style.height = '40px'; }, true);
    }
      
    
    Messages();
    panelLinks();
    if (storedDatas.html_clothes) selectClothes();
    selectTurbo();
    if (TestSet(17)) contentList();
    if (TestSet(3)) NotePad();
  } else {
    comfortBox=undefined;
  }
}

var comfortBox;
var patt=/(.{3,7}\/\/(.*)\.[^\/]{2,3})\//ig;
var result=patt.exec(window.location.href);
if (isNaN(chn = document.evaluate("//div[@id='welcome']/span", document, null, XPathResult.STRING_TYPE, null).stringValue.replace(/[\(\)]/gi, ''))) return;
var gname = result[2] + '_' + chn; 
var storedDatas = eval(GM_getValue(gname, '({settings: "0"})'));
storedDatas.world = result[1]+'/index.php';
if (storedDatas.settings) delete storedDatas.settings;
if (storedDatas.sets==undefined) storedDatas.sets = new Array();
if (storedDatas.ch==undefined) storedDatas.ch = new Array();
if (!storedDatas.daily==undefined) storedDatas.daily = new Array(0,0,0);
var f = new Date; 
storedDatas.time = parseInt(f.getTime() / 1000);
storedDatas.day = new Date().getDate();

versionCheck();
GM_registerMenuCommand("VU Comfort Panel", function () { ComfortPanel(1); }, "x", "alt", "x");
window.addEventListener('keydown', KeyHandler, true);

var turbo = document.evaluate("//div[@id='jobb_in']/div[@id='infobox']/div[@class='tudatturbo_info']", document, null, XPathResult.STRING_TYPE, null).stringValue.replace(/.+(\)|:)/i,'');  
if (TestSet(12)) {if (document.location.href.indexOf('m=kuldetesek')>1) getMission();} else delete storedDatas.msg_mission;
if (document.location.href.substr(-13) == 'm=karakterlap') CalcRegen();
if (TestSet(16)) EpPercent();
if (TestSet(6)) vdStat();
if (document.location.href.indexOf('m=kalandok')>1) Adventure();
if (document.location.href.indexOf('m=portyazas')>1) EnemyClass();
if (document.location.href.indexOf('m=allatok')>1) Animals();
if (document.location.href.indexOf('m=szakertelmek')>1) getTurboData();
if (document.location.href.indexOf('m=csataleiras')>1) seDrain();
if (TestSet(1)) AddStyle('header', 'display: none !important;'); 
if (TestSet(2)) { AddStyle('bal', 'position: fixed; '); AddStyle('jobb', 'margin-left: 240px; '); }
if ((document.location.href.indexOf('sub=epuletek')>1 || document.location.href.indexOf('sub=kesz_epuletek')>1)&&TestSet(4)) Epuletek();
if (TestSet(5)) InfoText();
if (TestSet(7)) EsszOff();
if (TestSet(18)) ComfortPanel();
varSave();	