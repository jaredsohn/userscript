var metadata = <><![CDATA[
// ==UserScript==
// @name          DS Koordinaten in Berichteübersicht
// @version       0.5.4
// @author        Samuel Essig (http://c1b1.de)
// @description   Veränderung der Berichtetitel nach eigenem Muster
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     (c) 2009, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://ae*.tribalwars.ae/game.php?*screen=report*view=*
// @include       http://de*.die-staemme.de/game.php?*screen=report*
// @include       http://de*.die-staemme.de/game.php?*screen=info_village*
// @exclude       http://forum.die-staemme.de*
// ==/UserScript==
]]></>;

/*

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
          تعريب أخوكم : محمد احمد 20
######################################################

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en


##################### Description ####################


*/



// Anzeige in der Berichteübersicht
var pattern = '(%x2%|%y2%) %kont2% %defender% von (%x1%|%y1%) %attacker% - Beute: %haul%';

// Anzeige im Menü
var menu_pattern1 = '%date%';                                                       // Datum
var menu_pattern2 = '%x1%|%y1% von %attacker% nach %x2%|%y2% von %defender%';       // Titel

/*
  Erklärung
  - %id%                   ID des Berichts
  - %x1%                   x-Koordinate des Angreiferdorfs
  - %y1%                   y-Koordinate des Angreiferdorfs
  - %name1%                Name des Angreiferdorfs
  - %kont1%                Kontinent des Angreiferdorfs
  - %attacker%             Spielername des Angreifers
  - %attacker_id%          ID des Angreifers
  - %x2%                   x-Koordinate des Verteidigerdorfs
  - %y2%                   y-Koordinate des Verteidigerdorfs
  - %name2%                Name des Verteidigerdorfs
  - %kont2%                Kontinent des Verteidigerdorfs
  - %defender%             Spielername des Verteidigers
  - %defender_id%          ID des Verteidigers
  - %sent%                 Timestamp
  - %date%                 Datum im Format DD:MM:YY hh:mm
  - %haul%                 Beute im Format Holz,Lehm,Eisen
  - %haul_wood%            Beute nur Holz
  - %haul_clay%            Beute nur Lehm
  - %haul_iron%            Beute nur Eisen
  - %scouted_res%          Erspähte Rohstoffe im Format Holz,Lehm,Eisen
  - %scouted_res_wood%     Erspähte Rohstoffe nur Holz
  - %scouted_res_clay%     Erspähte Rohstoffe nur Lehm
  - %scouted_res_iron%     Erspähte Rohstoffe nur Eisen
  - %scout?x:y%            Spähbericht? Wenn ja, wird x gezeigt, wenn nicht y   Beispiel: %scout?Spähbericht:kein Spähbericht%

*/


var world = document.location.href.split('.').shift().split('de').pop()+'_';

var now = new Date();
var timestamp = Math.round(now.getTime() / 1000);

if(GM_getValue(world+'reports') == undefined || GM_getValue(world+'lastTidyUp')+(60*60*24*14) < timestamp )
  {
  // First Start Fill Config

  GM_setValue(world+'reports','?-?');
  GM_setValue(world+'lastTidyUp',timestamp);

  alert('DS Koordinaten in Berichteübersicht ist jetzt initialisiert bzw. aufgeräumt!');
  document.location.reload();

  }

if(document.location.href.indexOf('screen=report') != -1 && document.location.href.indexOf('view=') != -1)
  {
  var report_id = document.location.href.split('=').pop();

  var reports = unpack(GM_getValue(world+'reports'));
  var index = getReportById(reports,report_id);

  if(index == -1)
    {
    var table = findByInner(document,'Betreff')[0].parentNode.parentNode;

    var att_village_element = findByInner(table.parentNode,'Dorf:')[0].nextSibling.firstChild;
    var att_village = att_village_element.innerHTML.match(/(\(\d{1,3}\|\d{1,3}\))/g)[0].split('|');

    att_village[0] = att_village[0].substr(1);                                       // x

    att_village[1] = att_village[1].substr(0,att_village[1].length - 1);             // y

    att_village[2] = att_village_element.innerHTML.split('(');                       // name
    att_village[2].pop();
    att_village[2] = att_village[2].join('(');
    att_village[2] = escape(trim(att_village[2]));


    att_village[3] = att_village_element.innerHTML.split(')').pop();                 // kontinent
    att_village[3] = trim(att_village[3]);

    var attacker_element = findByInner(table.parentNode,'Angreifer:')[0].nextSibling.firstChild;
    att_village[4] = escape(attacker_element.firstChild.data);                       // attacker  name

    att_village[5] = attacker_element.href.split('=').pop();                         // attacker id


    var def_village_element = findByInner(table.parentNode,'Dorf:')[1].nextSibling.firstChild;
    var def_village = def_village_element.innerHTML.match(/(\(\d{1,3}\|\d{1,3}\))/g)[0].split('|');

    def_village[0] = def_village[0].substr(1);

    def_village[1] = def_village[1].substr(0,def_village[1].length - 1);

    def_village[2] = def_village_element.innerHTML.split('(');
    def_village[2].pop();
    def_village[2] = def_village[2].join('(');
    def_village[2] = escape(trim(def_village[2]));

    def_village[3] = def_village_element.innerHTML.split(')').pop();
    def_village[3] = trim(def_village[3]);

    var defender_element = findByInner(table.parentNode,'Verteidiger:')[0].nextSibling.firstChild;
    if(defender_element.nodeType == 3)  // if player is unknown
      {
      def_village[4] = escape(defender_element.data);
      def_village[5] = '0';
      }
    else
      {
      def_village[4] = escape(defender_element.firstChild.data);
      def_village[5] = defender_element.href.split('=').pop();
      }

    // Get sent time
    var time = findByInner(table.parentNode,'Gesendet')[0].nextSibling.firstChild.data.split(' ');
    var date = time[0].split('.');
    var time = time[1].split(':');

    if(date[0][0] == '0')
      date[0] = date[0][1];
    if(date[1][0] == '0')
      date[1] = date[1][1];
    if(date[2][0] == '0')
      date[2] = date[2][1];

    var sent = new Date();
    with(sent) {
      setDate(parseInt(date[0]));
      setMonth(-1+parseInt(date[1]));
      setFullYear(2000+parseInt(date[2]));
      setHours(parseInt(time[0]));
      setMinutes(parseInt(time[1]));
      setSeconds(0);
      setMilliseconds(0); }
    report_sent = Math.round(sent.getTime() / 1000);

    // Get haul
    var haul_node = findByInner(table.parentNode,'Beute:')[0];
    if(haul_node)
      {
      var haul_text = grabText(haul_node.nextSibling.nextSibling,1);
      var haul = haul_text.split(' ');
      haul.pop();
      haul = haul.join(',');
      }
    else
      {
      haul = 'false';
      }

    // Check for scout report
    if(findByInner(table.parentNode,'Spionage')[0])
      {
      var scout = 1;

      // Get resources
      var scouted_resources_node = findByInner(table.parentNode,'Erspähte Rohstoffe:')[0];
      var scouted_resources_text = grabText(scouted_resources_node.nextSibling,1);
      var scouted_resources = scouted_resources_text.split(' ');
      scouted_resources.pop();
      scouted_resources = scouted_resources.join(',');
      }
    else
      {
      var scout = 0;
      var scouted_resources = '0,0,0';
      }

    // Put it 2gether
    var att_village = att_village.concat(def_village);  // Concat Arrays

    void att_village.unshift(report_id);                // ID to [0]

    var report_data = att_village;                      // Data:
    report_data.push(report_sent);                      //  + Sent
    report_data.push(haul);                             //  + Haul   "w,c,i"
    report_data.push(scout);                            //  + Scout report true/false
    report_data.push(scouted_resources);                //  + Scouted resources left in the village  "w,c,i"

    reports.push(report_data);                          // Append the thing

    GM_setValue(world+'reports',pack(reports));
    }
  }
else
  {
  var reports = unpack(GM_getValue(world+'reports'));


  var table = findByInner(document,'Betreff')[0].parentNode.parentNode;
  //alert(table.innerHTML);
  var elist = table.getElementsByTagName('tr');
  for(var i = 1, len = elist.length; len > i; i++)
    {
    var id = elist[i].getElementsByTagName('input')[0].getAttribute('name').split('_').pop();
    var index = getReportById(reports,id);
    if(index != -1)
      {
      var title = parsePattern(pattern,reports[index]);
      document.getElementById('labelText['+id+']').innerHTML = title;
      }
    }

  showNewMenu();

  }

var maintable,menutable,bartable,contenttable,formtable,formtable2;
function showNewMenu()
  {
  var h2 = document.getElementsByTagName('h2')[0];

  maintable = getNextElement(h2,'table');

  menutable = maintable.getElementsByClassName('vis')[0];

  bartable = maintable.getElementsByClassName('vis')[1];

  contenttable = maintable.getElementsByClassName('vis')[2];

  formtable = maintable.getElementsByClassName('vis')[3];

  formtable2 = maintable.getElementsByClassName('vis')[4];

  // new Menu

  var tr = n('tr');

  var td = n('td');
  td.setAttribute('width','100');

  var a = n('a');
  a.setAttribute('href','#');
  a.appendChild(t('Erweitert'));
  a.addEventListener('click',function() {
    for(var i = 0, elist = this.parentNode.parentNode.parentNode.getElementsByTagName('tr'), len = elist.length; len > i; i++)
      elist[i].getElementsByTagName('td')[0].removeAttribute('class');
    this.parentNode.setAttribute('class','selected');
    bartable.parentNode.removeChild(bartable);
    contenttable.parentNode.removeChild(contenttable);
    formtable.parentNode.removeChild(formtable);
    //formtable2.parentNode.removeChild(formtable2);
    createNewContent(maintable.getElementsByTagName('form')[0]);
    },false);
  acs(menutable,tr,td,a);
  }

function createNewContent(form)
  {

  // ätester Bericht
  // jüngster Bericht
  // (de)select von ... bis ...
  // select älter als
  // select jünger als
  // select all

  function Numsort (a, b)
    {
    return parseInt(b[13]) - parseInt(a[13]);
    }



  var reports = unpack(GM_getValue(world+'reports')).sort(Numsort);

  var table = n('table');
  table.setAttribute('class','vis');

  var tr = n('tr');
  var th0 = n('th');
  th0.appendChild(img('http://www.c1b1.de/smile/dsforum/trash.gif','Alles markieren'));
  th0.setAttribute('style','cursor:pointer; ');
  th0.addEventListener('click',function() {

    var elist = document.getElementsByName('reportId[]');
    for(var i = 0, len = elist.length; len > i; i++)
        {
        elist[i].setAttribute('checked','checked');
        }
   },false);

  var th1 = n('th');
  th1.appendChild(t('Datum'));
  var th2 = n('th');
  th2.appendChild(t('Betreff'));

  acs(table,tr,new Array(th0,th1,th2));

  for(var attr in reports)
    {
    var tr = n('tr');
    tr.setAttribute('style','font-size:smaller; ');
    var td0 = n('td');
    var input = n('input');
    input.setAttribute('type','checkbox');
    input.setAttribute('name','reportId[]');
    input.setAttribute('title',reports[attr][13]);      // Timestamp
    input.setAttribute('value',reports[attr][0]);       // ID
    td0.appendChild( input );

    var td1 = n('td');
    td1.setAttribute('title',reports[attr][13]);
    td1.appendChild(  t(parsePattern(menu_pattern1,reports[attr]))  );
    var td2 = n('td');
    var a = n('a');
    a.setAttribute('href','game.php?screen=report&mode=all&view='+reports[attr][0]);
    a.setAttribute('title','Bericht aufrufen');
    a.appendChild(  t(parsePattern(menu_pattern2,reports[attr]))  );
    td2.appendChild( a );
    acs(table,tr,new Array(td0,td1,td2));
    }

    var tr = n('tr');
    var td = n('td');
    td.setAttribute('colspan','3');

    var input = n('input');
    input.setAttribute('type','button');
    input.setAttribute('value','Löschen');
    input.addEventListener('click',function() {
      var elist = document.getElementsByName('reportId[]');
      for(var i = 0, len = elist.length; len > i; i++)
        {
        if(elist[i].checked)
          {
          for(var attr in reports)
            {
            if(reports[attr][0] == elist[i].value)
              {
              delete(reports[attr]);
              }
            }
          }
        }

      GM_setValue(world+'reports',pack(reports));
      document.location.reload();

      },false);
    td.appendChild( input );


    var input = n('input');
    input.setAttribute('type','button');
    input.setAttribute('value','Selektiere älter als:');
    input.addEventListener('click',function() {
      var elist = document.getElementsByName('reportId[]');

      var time = document.getElementById('dateInput').value.split(' ');

      var date = time[0].split('.');
      var time = time[1].split(':');


      if(date[0][0] == '0')
        date[0] = date[0][1];
      if(date[1][0] == '0')
        date[1] = date[1][1];
      if(date[2][0] == '0')
        date[2] = date[2][1];

      var sent = new Date();
      with(sent) {
        setDate(parseInt(date[0]));
        setMonth(-1+parseInt(date[1]));
        setFullYear(2000+parseInt(date[2]));
        setHours(parseInt(time[0]));
        setMinutes(parseInt(time[1]));
        setSeconds(0);
        setMilliseconds(0); }
      date = Math.round(sent.getTime() / 1000);


      for(var i = 0, len = elist.length; len > i; i++)
        {
        if(parseInt(elist[i].title) < date)
          elist[i].setAttribute('checked','checked');
        else
          elist[i].removeAttribute('checked');
        }
      },false);
    td.appendChild( input );



    var input = n('input');
    input.setAttribute('type','input');
    input.setAttribute('id','dateInput');
    var date = new Date();
    date.setTime(date.getTime() - (1000*60*60*24*7))
    input.setAttribute('value',(date.getDate()>9?date.getDate():'0'+date.getDate()) + '.' + ((date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1)) + '.' + (date.getFullYear().toString(10).substr(2)) + ' ' + (date.getHours()>9?date.getHours():'0'+date.getHours()) + ':' + (date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes()));
    td.appendChild( input );

    acs(table,tr,td);

  form.appendChild(table);

  }


function parsePattern(pattern,arr)
  {
  var result = pattern.replace(/%id%/,arr[0]);
  result = result.replace(/%x1%/,arr[1]);
  result = result.replace(/%y1%/,arr[2]);
  result = result.replace(/%name1%/,unescape(arr[3]));
  result = result.replace(/%kont1%/,arr[4]);
  result = result.replace(/%attacker%/,unescape(arr[5]));
  result = result.replace(/%attacker_id%/,arr[6]);
  result = result.replace(/%x2%/,arr[7]);
  result = result.replace(/%y2%/,arr[8]);
  result = result.replace(/%name2%/,unescape(arr[9]));
  result = result.replace(/%kont2%/,arr[10]);
  result = result.replace(/%defender%/,unescape(arr[11]));
  result = result.replace(/%defender_id%/,arr[12]);
  result = result.replace(/%sent%/,arr[13]);
  if(result.indexOf('%date%') != -1)
    {
    var date = new Date();
    date.setTime(parseInt(arr[13])*1000);
    var datestring = (date.getDate()>9?date.getDate():'0'+date.getDate()) + '.' + ((date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1)) + '.' + (date.getFullYear().toString(10).substr(2)) + ' ' + (date.getHours()>9?date.getHours():'0'+date.getHours()) + ':' + (date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes());
    result = result.replace(/%date%/,datestring);
    }

  // Haul
  if(!arr[14] || arr[14] == 'false' || arr[14] == '')
    {
    result = result.replace(/%haul%/,'');
    result = result.replace(/%haul_wood%/,'');
    result = result.replace(/%haul_clay%/,'');
    result = result.replace(/%haul_iron%/,'');
    }
  else
    {
    result = result.replace(/%haul%/,arr[14]);
    arr[14] = String(arr[14]);
    arr[14] = arr[14].split(',');
    result = result.replace(/%haul_wood%/,arr[14][0]);
    result = result.replace(/%haul_clay%/,arr[14][1]);
    result = result.replace(/%haul_iron%/,arr[14][2]);
    }

  // Scout report?
  var scout_report = arr[15]=='0'?false:true;
  result = result.replace(/%scout\?(.+):(.+)%/,scout_report?'$1':'$2');

  // Scouted resources
  if(!arr[16] || arr[16] == 'false' || arr[16] == '')
    {
    result = result.replace(/%scouted_res%/,'');
    result = result.replace(/%scouted_res_wood%/,'');
    result = result.replace(/%scouted_res_clay%/,'');
    result = result.replace(/%scouted_res_iron%/,'');
    }
  else
    {
    result = result.replace(/%scouted_res%/,arr[16]);
    arr[16] = String(arr[16]);
    arr[16] = arr[16].split(',');
    result = result.replace(/%scouted_res_wood%/,arr[16][0]);
    result = result.replace(/%scouted_res_clay%/,arr[16][1]);
    result = result.replace(/%scouted_res_iron%/,arr[16][2]);
    }

  return result;
  }

function unpack(string)
  {
  var arr = string.split('?-?');
  var result = new Array();
  for(var i = 0; i < arr.length; i++)
    {
    if(arr[i])
      result.push(arr[i].split('?.?'));
    }
  return result;
  }

function pack(arr)
  {
  var result = new Array();
  for(var i = 0; i < arr.length; i++)
    {
    if(arr[i])
      result.push(arr[i].join('?.?'));
    }
  return result.join('?-?');
  }

function getReportById(arr,id)
  {
  for(var i = 0; i < arr.length; i++)
    {
    if(arr[i][0] == id)
      return i;
    }
  return -1;
  }

function getReportsByCoords(arr,x,y)
  {
  var result = new Array();
  for(var i = 0; i < arr.length; i++)
    {
    if((arr[i][1] == x && arr[i][2] == y) || (arr[i][7] == x && arr[i][8] == y))
      result.push(arr[i]);
    }
  return result;
  }

function n(name) {
  return document.createElement(name); }

function t(text) {
  return document.createTextNode(text); }

function acs() {
  for(var len = arguments.length-1; len > 0; len--)
    {
    if(arguments[len][0])
      {
      for(var i = 0, l = arguments[len].length; i < l; i++)
        {
        arguments[len-1].appendChild(arguments[len][i])
        }
      }
    else
      {
      arguments[len-1].appendChild(arguments[len]);
      }
    }
  }

function img(src,alt) {
  var i = new Image();
  i.src = src;
  i.alt = alt;
  return i;
  }

function getNextElement(obj,tname) {
    var tname = tname.toLowerCase();
    var obj = obj.nextSibling;
    while(true)
      {
      if(!obj)
        return false;
      if(!obj.tagName)
        obj = obj.nextSibling;
      else if(obj.tagName.toLowerCase() == tname)
        return obj;
      else
        obj = obj.nextSibling;
      }
    return obj; }

function findByInner(obj,value) {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++) {
      if(obj.getElementsByTagName('*')[i].firstChild) {
        if(obj.getElementsByTagName('*')[i].firstChild.data) {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
            list[a] = obj.getElementsByTagName('*')[i];
            a++; } } } }
    list['length'] = a;
    return list; }

function findByAttr(obj,attr,value)
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i][attr] == value)
        {
        list[a] = obj.getElementsByTagName('*')[i];
        a++;
        }
      }
    list['length'] = a;
    return list;
    }

function grabText ( node , maxDepth )
  {
  if ( 3 == node . nodeType )
    {
    return node . nodeValue ;
    }
  else if( ( 1 == node . nodeType ) && ( 0 < maxDepth ))
    {
    var result = '' ;
    for(var i = 0 ;i < node . childNodes . length ;i ++)
      {
      result += grabText(node . childNodes [ i ] , maxDepth - 1) ;
      }
    return result ;
    }
  return '';
  }

function trim(str)
  {
  return str.replace(/^\s+/, '').replace(/\s+$/, '');
  }