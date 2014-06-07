// ==UserScript==
// @name           gwOutAutoloot
// @namespace      http://userscripts.org/users/krychek
// @description    GanjaWars: autoloot
// @include        http://www.ganjawars.ru/me/*
// @author         Alex Krychek
// ==/UserScript==

(function() {
  var timeout = 3;
  var loot = false;
  var flag = false;
  var selfname = /Alphonse Capone/i;
  var selfpos = 0;
  var selfftr = 0;
  var fblocksub = 0;

  var root = typeof unsafeWindow != 'undefined' ? unsafeWindow:window;

  if (root.location.href.indexOf('http://quest.ganjawars.ru') >= 0) {
    var fld_trs = root.document.getElementsByTagName('table')[4].getElementsByTagName('tr');
    var curtrtds;
    var fieldsize = fld_trs.length;
    var i, j, l, k;

    for(i=0; i<fieldsize; i++) {
      curtrtds = fld_trs[i].getElementsByTagName('td');

      for(j=0, k=curtrtds.length; j<k; j++)
        if(selfname.test(curtrtds[j].getElementsByTagName('img')[0].alt)) {
          selfftr=i;
          selfpos=j;
          break;
        }

      if(selfftr!=0 || selfpos!=0) break;
    }
    if(selfftr==0 && selfpos==0) {
      root.setInterval(function() { root.location = root.location; }, timeout * 700);
    } else {

    var cimg=curtrtds[selfpos-1].getElementsByTagName('img')[0];
    if (/rwater/.test(cimg.src) || /weedset/.test(cimg.src) || /perch/.test(cimg.src) || /mushroom/.test(cimg.src) || /old_rgd5/.test(cimg.src)) {
      loot=true;
      cimg.border=2;
      cimg.width-=4;
      cimg.height-=4;
    } else {
      cimg.border=1;
      cimg.width-=2;
      cimg.height-=2;
    }

    cimg=curtrtds[selfpos+1].getElementsByTagName('img')[0];
    if (/rwater/.test(cimg.src) || /weedset/.test(cimg.src) || /perch/.test(cimg.src) || /mushroom/.test(cimg.src) || /old_rgd5/.test(cimg.src)) {
      loot=true;
      cimg.border=2;
      cimg.width-=4;
      cimg.height-=4;
    } else {
      cimg.border=1;
      cimg.width-=2;
      cimg.height-=2;
    }

//*
    if(selfftr<fieldsize) {
      fblocksub=0;
//      curtrtds = fld_trs[selfftr].getElementsByTagName('td');
      for(i=0; i<selfpos; i++) {
        if(curtrtds[i].rowSpan==2) fblocksub++;
        if(curtrtds[i].colSpan==2 && curtrtds[i].rowSpan!=2) fblocksub--;
      }
      curtrtds = fld_trs[selfftr-1].getElementsByTagName('td');
      i=0; l=selfpos;
      while(i<=l) {
        if(curtrtds[i].rowSpan==2) {
          fblocksub--; l++;
          if(curtrtds[i].colSpan==2) { fblocksub--; l++; }
        }
        i++;
     }
      curtrtds = fld_trs[selfftr+1].getElementsByTagName('td');
      i=0;
      while(i<=l) {
        if(curtrtds[i].colSpan==2) {
          fblocksub++;
          l--;
        }
        i++;
      }
      cimg=curtrtds[selfpos-fblocksub].getElementsByTagName('img')[0];
      if (/rwater/.test(cimg.src) || /weedset/.test(cimg.src) || /perch/.test(cimg.src) || /mushroom/.test(cimg.src) || /old_rgd5/.test(cimg.src)) {
        loot=true;
        cimg.border=2;
        cimg.width-=4;
        cimg.height-=4;
      } else {
        cimg.border=1;
        cimg.width-=2;
        cimg.height-=2;
      }
    }
/*
    if(selfftr>0) {
      fblocksub=0; l=selfpos;
      curtrtds = fld_trs[selfftr].getElementsByTagName('td');
      for(i=0; i<selfpos; i++)
        if(curtrtds[i].colSpan==2) {
          fblocksub--;
          l++;
        }
      curtrtds = fld_trs[selfftr-2].getElementsByTagName('td');
      i=0;
      while(i<l) {
        if(curtrtds[i].rowSpan==2) {
          fblocksub++; l++;
          if(curtrtds[i].colSpan==2) { fblocksub++; l++; }
        }
        i++;
      }
      curtrtds = fld_trs[selfftr-1].getElementsByTagName('td');
      i=0;
      while(i<=l) {
        if(curtrtds[i].colSpan==2) {
          fblocksub--;
          l--;
        }
        if(curtrtds[i].rowSpan==2 && curtrtds[i].colSpan!=2) {
          fblocksub--;
          l--;
        }
        i++;
      }
      cimg=curtrtds[selfpos-fblocksub].getElementsByTagName('img')[0];
      if (/rwater/.test(cimg.src) || /weedset/.test(cimg.src) || /perch/.test(cimg.src) || /mushroom/.test(cimg.src) || /old_rgd5/.test(cimg.src)) {
        loot=true;
        cimg.border=2;
        cimg.width-=4;
        cimg.height-=4;
      } else {
        cimg.border=1;
        cimg.width-=2;
        cimg.height-=2;
      }
    }
//*/
    }
  }


  if(loot) {
    root.setInterval(function() { root.location = root.location; }, timeout * 1000);

    var frm = root.document.getElementsByTagName('form');

// If the "take item" form appears then submit
    if(frm[1]) {
//      frm[0].newline.value="test";
      frm[1].submit();
      alert('ok');
//      frm[0].submit();
    }
  } else {
    root.setInterval(function() { root.location = root.location; }, 30000+Math.random()*10000);
  }

/*
function TakeItem() {
  var frm = root.document.getElementsByTagName('form');

  if(frm[1]) {
    frm[0].newline.value="test";
    frm[1].submit();
    frm[0].submit();
  } else
    root.setInterval(TakeItem() { root.location = root.location; }, timeout * 1000);
}*/
}
)();