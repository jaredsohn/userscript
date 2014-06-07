// ==UserScript==
// @name           massTaggerT
// @namespace      av.com
// @description    De tagger zoals de tagger ooit bedoeld was.
// @include        http://nl*.tribalwars.nl/game.php?village=*&screen=overview_villages&mode=incomings*
// ==/UserScript==

var mtT_config = {
 'speed': {'Scout':4,'LC':5,'ZC':6,'Bijl':9,'Zwaard':11,'Ram/kata':15,'______________________________EDEL!!':17},
 'texts': {'unknown':'Onbekend: ','estimated':'Geschat: ','hour':'u'},
 'min_attacks': 8,
 'bot_detected': false,
 'surl': (unsafeWindow.game_data.player.sitter_id>0)?'&t='+unsafeWindow.game_data.player.id:''
}

unsafeWindow.mtT_Dec2Hrs = function(d) {
 var m=d-Math.floor(d),
  m=m*60/100;
 return Math.floor(d)+Math.round(m*100)/100;
}
unsafeWindow.mtT_Attacker = function(cmd,lnk,inp,coords,time_known,ms) {
 if (mtT_config.bot_detected) return;
 var sec = inp[0].value.match(/Aanval \{(\d+)s}/);
 if ((sec)&&(sec.length==2)) {
  sec = sec[1];
  var _url = unsafeWindow.game_data.link_base_pure.replace('&screen=','&screen=info_command')+'&id='+cmd+'&type=other';
  lnk.style.fontWeight = 'normal';
  
  setTimeout(function() {
   unsafeWindow.jQuery.ajax({
    url: _url,
    success: function success(data, textStatus, jqXHR) {
     if (mtT_config.bot_detected) return;
     var bot = data.match(/id=.*bot_check_image.*id=.*bot_check_code/);
     if (bot) {
      mtT_config.bot_detected = true;
      alert('bot-detection detected!');
      return;
     }
    
     var v = '';
     var vl = data.match(/<a.*village=\d+.*screen=info_village.*id=\d+.*>.*\((\d+\|\d+)\).*<\/a>/);
     if ((vl)&&(vl.length==2)) {
      var f = coords.split('|'),
       t = vl[1].split('|'),
       q=Math.sqrt(Math.pow(f[0]-t[0],2)+Math.pow(f[1]-t[1],2)),
       m = Math.round((sec/60/q)*100)/100;
    
      for (var key in mtT_config.speed) {
       if (m <= mtT_config.speed[key]) {
        if (!time_known) { v += mtT_config.texts.unknown; }
        v += key+(time_known?'':'+');
        break;
       }
      }
      v += ' ('+vl[1]+')';
     }
     var pl = data.match(/<a.*village=\d+.*screen=info_player.*id=\d+.*>(.*)<\/a>/);
     if ((pl)&&(pl.length==2)) {
      v += ' '+pl[1];
     }
     if (!time_known) v+= ' {T'+unsafeWindow.mtT_Dec2Hrs(sec/3600)+mtT_config.texts.hour+'}';
     if (v != '') {
      inp[0].value = v;
      inp[1].click();
     
      lnk.parentNode.className = 'selected';
     }
     lnk.style.fontWeight = '';
    }
   });
  },ms);
 }
}
unsafeWindow.mtT_Tag = function(time_known) {
 seconds=function(val){
  val=val.split(":");
  return 3600*val[0]+60*val[1]+parseInt(val[2]);
 };
 
 var t = document.getElementById('incomings_table');
 if (t) {
  var lnk,p,m,id,s,c,f,x,att=[];
  for (var i=0;i<t.rows.length;i++) {
   lnk = t.rows[i].cells[0].getElementsByClassName('attack-icon');
   if ((lnk)&&(lnk.length==1)) {
    p = '&screen=info_command'+mtT_config.surl+'&id=(\\d+)&type=other';
    m = lnk[0].href.match(p);
    if ((m)&&(m.length==2)) {
     id = m[1];
     s = lnk[0].getElementsByTagName('span')[0].firstChild.nodeValue;
     if (s.substr(0,6)=='Aanval') {
      c = t.rows[i].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
      f = t.rows[i].cells[0].getElementsByTagName('span')[2].getElementsByTagName('input');
      
      if (s.match(/\{\d+s}/)) {
       att.push([id,lnk[0],f,c]);
      } else if (s.length==6) {
       x = t.rows[i].cells[4].getElementsByClassName('timer');
       if ((x)&&(x.length==1)) {
        s = seconds(x[0].firstChild.nodeValue);
        f[0].value = 'Aanval {'+s+'s}';
        f[1].click();
        att.push([id,lnk[0],f,c]);
       }
      }
     }
    }
   }
  }
  
  if (att.length>0) {
   if (confirm('Er '+(att.length==1?'is ':'zijn ')+att.length+(att.length==1?' aanval':' aanvallen')+' om te taggen, doorgaan?')) {
    var ms = 50;
    for (i=0;i<att.length;i++) {
     unsafeWindow.mtT_Attacker(att[i][0],att[i][1],att[i][2],att[i][3],time_known,ms);
     ms += 50;
    }
   }
  } else {
   alert('Er zijn geen aanvallen om te taggen.');
  }
 }
}
unsafeWindow.mtT_Estimate = function() {
 var t = document.getElementById('incomings_table');
 if (t) {
  var lnk,id,s,c,f,p,k,m,est=[],att=[];
  for (var i=0;i<t.rows.length;i++) {
   lnk = t.rows[i].cells[0].getElementsByClassName('attack-icon');
   if ((lnk)&&(lnk.length==1)) {
    p = '&screen=info_command'+mtT_config.surl+'&id=(\\d+)&type=other';
    m = lnk[0].href.match(p);
    if ((m)&&(m.length==2)) {
     id = m[1];
     s = lnk[0].getElementsByTagName('span')[0].firstChild.nodeValue;
     p = '^(?!'+mtT_config.texts.estimated+')('+mtT_config.texts.unknown+')?.*(';
     for (k in mtT_config.speed) {
      p+= k+'|';
     }
     p = p.slice(0,-1)+')\\+?.* \\((\\d+\\|\\d+)\\)(.*)';
     m = s.match(p);
     if (m) {
      if (m[1]==mtT_config.texts.unknown) {
       est[est.length] = Array(id,-1,-1,i,m[3],m[4]);
      } else {
       att[att.length] = Array(id,m[2],m[3],i,-1);
      }
     }
    }
   }
  }
  
  if (est.length==0) { alert('Er zijn geen onbekende aanvallen om te schatten.'); return; }
  if (att.length<2) { alert('Er zijn niet genoeg bekende aanvallen om te schatten.'); return; }
  if (!confirm('Er '+((est.length==1)?'is ':'zijn ')+est.length+' onbekende '+((est.length==1)?'aanval':'aanvallen')+', doorgaan?')) return;
   
  att.sort();
  var i,y;
  for (i=0;i<att.length;i++) {
   for (y=0;y<est.length;y++) {
    if (est[y][0] > att[i][0]) {
     est[y][1] = i;
    } else {
     est[y][2] = i;
     continue;
    }
   }
  }

  function seconds(val){
   val=val.split(":");
   return 3600*val[0]+60*val[1]+parseInt(val[2]);
  };
  function distance(from,to) {
   var f=from.split('|'),t=to.split('|');
   return Math.sqrt(Math.pow(f[0]-t[0],2)+Math.pow(f[1]-t[1],2));
  };
  function ttime(from,to,unit) {
   return Math.round((mtT_config.speed[unit]*60)*distance(from,to));
  };
  function accuracy(diff,rnd,avg) {
   var c1=5000,c2=100000,c3=c2*10;
   var f1=5,f2=10,f3=50;
   if (avg) diff=diff/(mtT_config.min_attacks/15);
   var ac = (diff<=c1)?(diff/c1)*f1:(diff<=c2)?f1+(diff/c2)*f2:(diff<=c3)?f2+(diff/c3)*70:-1;
   if (ac!=-1) {
    ac = Math.floor((100-ac)*rnd)/rnd;
   } else {
    ac = '<30';
   }
   return ac;
  }
   
  var cnt=0,b,a,c,tm,s;
  for (i=0;i<est.length;i++) {
   if ((est[i][1]!=-1)&&(est[i][2]!=-1)) {
    b = att[est[i][1]];
    if (b[4]==-1) {
     c = t.rows[b[3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
     tm = t.rows[b[3]].cells[4].getElementsByClassName('timer');
     if ((tm)&&(tm.length==1)) {
      s = seconds(tm[0].firstChild.nodeValue);
      tm = ttime(c,b[2],b[1]);
      att[est[i][1]][4] = (tm-s);
      b[4] = (tm-s);
     }
    }

    a = att[est[i][2]];
    if (a[4]==-1) {
     c = t.rows[a[3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
     tm = t.rows[a[3]].cells[4].getElementsByClassName('timer');
     if ((tm)&&(tm.length==1)) {
      s = seconds(tm[0].firstChild.nodeValue);
      tm = ttime(c,a[2],a[1]);
      att[est[i][2]][4] = (tm-s);
      a[4] = (tm-s);
     }
    }
    
    if ((b[4]!=-1)&&(a[4]!=-1)) {
     
     var diff = (b[4]-a[4]),
      tid = (a[0]-b[0]),
      did = (a[0]-est[i][0]),
      pct = (did/tid),
      xx = diff*(did/tid),
      zz = Math.round(a[4]+(diff*pct));
     
     tm = t.rows[est[i][3]].cells[4].getElementsByClassName('timer');
     if ((tm)&&(tm.length==1)) {
      s = seconds(tm[0].firstChild.nodeValue);
      zz += s;
      
      var from = est[i][4];
      var to = t.rows[est[i][3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
      var inp = t.rows[est[i][3]].cells[0].getElementsByTagName('span')[2].getElementsByTagName('input');
      var dist = distance(from,to);
      var mpf = Math.floor(((zz/dist)/60)*100)/100;
      var val = mtT_config.texts.estimated;
      
      for (var key in mtT_config.speed) {
       if (mpf <= mtT_config.speed[key]) {
        val += key;
        break;
       }
      }
      val += ' ('+from+')'+est[i][5];
      
      ac = accuracy(diff,10);
      
      val += ' ['+ac+'%]';
      val += ' {'+unsafeWindow.mtT_Dec2Hrs(zz/3600)+mtT_config.texts.hour+'}';

      inp[0].value = val;
      inp[1].click();
      
      t.rows[est[i][3]].className = 'selected';
      
      cnt++;
     }
    }
   }
  }
  
  var z = est.length-cnt;
  if (z>0) {
   
   if (!confirm('Voor '+z+((z==1)?' aanval':' aanvallen')+' is geen voor of na bekend, schatten o.b.v. gemiddelde?')) return;
   if (att.length<=mtT_config.min_attacks) { alert('Er zijn niet genoeg aanvallen bekend voor een schatting o.b.v. het gemiddelde.'); return; }
   
   var avg=0,tot=0,cnt=0;
   for (z=0;z<att.length;z++) {
    a = att[z];
    if (a[4]==-1) {
     c = t.rows[a[3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
     tm = t.rows[a[3]].cells[4].getElementsByClassName('timer');
     if ((tm)&&(tm.length==1)) {
      s = seconds(tm[0].firstChild.nodeValue);
      tm = ttime(c,a[2],a[1]);
      att[z][4] = (tm-s);
      a[4] = (tm-s);
     }
    }
    if (a[4]!=-1) {
     if (cnt>0) {
      if (att[z-1][4]-a[4]<0) continue;
      avg = (att[z-1][4]-a[4])/(a[0]-att[z-1][0]);
      tot += avg;
     }
     cnt++;
    }
   }
   
   if (cnt>1) {
    avg = tot/(cnt-1);
    cnt = 0;
    
    for (z=0;z<est.length;z++) {
     s = -1;
     diff = -1;
     if (est[z][1]!=-1) {
      b = att[est[z][1]];
      diff = est[z][0]-b[0];
      s = b[4]-avg*diff;
     } else if (est[z][2]!=-1) {
      a = att[est[z][2]];
      diff = a[0]-est[z][0];
      s = a[4]+avg*diff;
     }
     
     if (s!=-1) {
      tm = t.rows[est[z][3]].cells[4].getElementsByClassName('timer');
      if ((tm)&&(tm.length==1)) {
       s += seconds(tm[0].firstChild.nodeValue);
     
       var from = est[z][4];
       var to = t.rows[est[z][3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
       var inp = t.rows[est[z][3]].cells[0].getElementsByTagName('span')[2].getElementsByTagName('input');
       var dist = distance(from,to);
       var mpf = Math.round((s/dist)/60);
       
       var val = mtT_config.texts.estimated;
       for (var key in mtT_config.speed) {
        if (mpf <= mtT_config.speed[key]) {
         val += key;
         break;
        }
       }
       val += ' ('+from+')'+est[z][5];
       
       ac = accuracy(diff,10,true);
       
       val += ' [D'+ac+'%]';
       val += ' {'+unsafeWindow.mtT_Dec2Hrs(s/3600)+mtT_config.texts.hour+'}';
     
       t.rows[est[z][3]].className = 'selected';

       inp[0].value = val;
       inp[1].click();
      
       cnt++;
      }
     }
    }
    if (cnt>0) {
     alert('Er '((cnt==1)?'is ':'zijn ')+cnt+((cnt==1)?' aanval':' aanvallen')+' geschat m.b.v. het gemiddelde verschil.');
    }
   }
  } else {
   alert('Er '((cnt==1)?'is ':'zijn ')+cnt+((cnt==1)?' aanval':' aanvallen')+' geschat m.b.v. voor en na.');
  }
 }
}
unsafeWindow.mtT_Manual = function() {
 seconds=function(val){
  val=val.split(":");
  return 3600*val[0]+60*val[1]+parseInt(val[2]);
 };
 
 var t = document.getElementById('incomings_table');
 if (t) {
  var lnk,p,m,s,c,ids=[];
  c = document.createElement('th');
  c.appendChild(document.createTextNode('#'));
  c.style.textAlign = 'center';
  t.rows[0].insertBefore(c,t.rows[0].cells[0]);
  c = document.createElement('th');
  c.appendChild(document.createTextNode('ID'));
  t.rows[0].insertBefore(c,t.rows[0].cells[1]);
  for (var i=1;i<(t.rows.length-1);i++) {
   c = t.rows[i].insertCell(0);
   c.style.textAlign = 'center';
   c.appendChild(document.createTextNode(''));
   c = t.rows[i].insertCell(1);
   lnk = t.rows[i].cells[2].getElementsByClassName('attack-icon');
   if ((lnk)&&(lnk.length==1)) {
    p = '&screen=info_command'+mtT_config.surl+'&id=(\\d+)&type=other';
    m = lnk[0].href.match(p);
    if ((m)&&(m.length==2)) {
     c.appendChild(document.createTextNode(m[1]));
     ids[ids.length] = [m[1],i];
    }
   }
  }
  c = document.createElement('th');
  c.colSpan = 2;
  t.rows[i].insertBefore(c,t.rows[i].cells[0]);
  
  function moverow(row,idx) {
   t.tBodies[0].insertBefore(t.tBodies[0].removeChild(t.tBodies[0].rows[row]),t.tBodies[0].rows[idx]);
  }
  
  ids.sort(function(a,b){return (a[0]-b[0]);});
  
  for (i=0;i<ids.length;i++) {
   t.rows[ids[i][1]].cells[0].firstChild.nodeValue = (i+1);
  }

  var curr,nrow,prev=-1,loop;
  for (curr=1;curr<(t.rows.length-1);) {
   nrow = t.rows[curr].cells[0].firstChild.nodeValue;
   if (!nrow) { curr++; continue; }
   if (nrow==curr) { curr++; continue; }
   if (curr==prev) { loop++; if(loop>t.rows.length){alert('possible infinite loop: breaking from code!');break;}} else { prev=curr; loop=0; }
   moverow(curr,nrow);
  }
  
  document.getElementById('mtT_btnTagKnown').disabled = true;
  document.getElementById('mtT_btnTagUnknown').disabled = true;
  document.getElementById('mtT_btnEstimate').disabled = true;
  document.getElementById('mtT_btnManual').disabled = true;
 }
}
function mtT_Main() {
 var tbl = document.getElementById('incomings_table');
 if (tbl) {
  t = document.createElement('table');
  t.className = 'vis modemenu';
  
  var r = t.insertRow(-1);
  c = r.insertCell(-1);
  c.style.padding = '3px';
  var img = document.createElement('img');
  img.src = 'graphic/unit/att.png?1';
  c.appendChild(img);

  c = r.insertCell(-1);
  c.style.fontWeight = 'bold';
  c.style.paddingRight = '10px';
  c.appendChild(document.createTextNode('MassTaggerT'));
  
  var b = document.createElement('input');
  b.id = 'mtT_btnTagKnown';
  b.type = 'button';
  b.value = 'Tijden zijn bekend: Taggen!';
  b.setAttribute('onclick','mtT_Tag(true);');
  c = r.insertCell(-1);
  c.appendChild(b);
  
  b = document.createElement('input');
  b.id = 'mtT_btnTagUnknown';
  b.type = 'button';
  b.value = 'Tijden zijn niet bekend: Taggen!';
  b.setAttribute('onclick','mtT_Tag(false);');
  c.appendChild(b);
  
  b = document.createElement('input');
  b.id = 'mtT_btnEstimate';
  b.type = 'button';
  b.value = 'Schat de niet bekende met ID\'s';
  b.setAttribute('onclick','mtT_Estimate();');
  c = r.insertCell(-1);
  c.appendChild(b);
  
  b = document.createElement('input');
  b.id = 'mtT_btnManual';
  b.type = 'button';
  b.value = 'Handmatige schatting (toont ID\'s)';
  b.setAttribute('onclick','mtT_Manual();');
  c.appendChild(b);
  
  b = document.createElement('input');
  b.type = 'button';
  b.value = 'Stop de timers';
  b.setAttribute('onclick','if(timers.length>0){this.value="Start de timers";tmptimers=timers;timers=[];}else{this.value="Stop de timers";timers=tmptimers;}');
  c = r.insertCell(-1);
  c.appendChild(b);
  
  tbl.parentNode.insertBefore(t,tbl);
 }
}

var url = document.location.href;
if (url.match(/village=.*&screen=overview_villages&mode=incomings.*/)) {
 
 mtT_Main();
}