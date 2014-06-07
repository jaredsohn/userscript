// ==UserScript==
// @name           Paticik ignore
// @namespace      http://gobekdeligi.com
// @description    Paticik.com'da sectiginiz insanlarin mesajlarini gostermiyor
// @include        http://*.paticik.com/konu*
// @include        http://*.paticik.com/view*
// ==/UserScript==

function readCookie(name){ // by .fm
    var c=document.cookie ; 
    if (c.indexOf(name)!=-1) { 
        pos1=c.indexOf("=", c.indexOf(name))+1; 
        pos2=c.indexOf(";",pos1);  
            // If last cookie
            if(pos2==-1)    pos2=c.length;;
        
        data=c.substring(pos1,pos2); 
        
        return data;
    }
}
 
var numb3rs = 0;
var tables = document.getElementsByTagName('table');
for(j=0;j<tables.length;j++) {
  if(tables[j].align=="center" && tables[j].width=="680") numb3rs++;
}
var i = 4;
while(i<(4+numb3rs)) {
    var hata=false;    
    if(hata!=true) {
      var message = tables[i].getElementsByTagName('td')[1].innerHTML;
      var user = tables[i].getElementsByTagName('td')[0].getElementsByTagName('span')[0].getElementsByTagName('b')[0].innerHTML;
      var uCookie = readCookie(user);
      if(uCookie=='ignored') {
        tables[i].getElementsByTagName('td')[1].getElementsByTagName('div')[1].style.display = "none";
        tables[i].getElementsByTagName('td')[1].getElementsByTagName('div')[2].style.display = "none";
        try {
        tables[i].getElementsByTagName('td')[1].getElementsByTagName('div')[3].style.display = "none";
        } catch(err){}
        tables[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('small')[0].getElementsByTagName('span')[0].innerHTML = '<a href="javascript:;" onClick="try { document.getElementsByTagName(\'table\')['+i+'].getElementsByTagName(\'td\')[1].getElementsByTagName(\'div\')[3].style.display = \'\'; } catch(err){} document.getElementsByTagName(\'table\')['+i+'].getElementsByTagName(\'td\')[1].getElementsByTagName(\'div\')[2].style.display = \'\'; document.getElementsByTagName(\'table\')['+i+'].getElementsByTagName(\'td\')[1].getElementsByTagName(\'div\')[1].style.display = \'\'; this.nextSibling.style.display = \'\'; this.style.display = \'none\';">[ goster ]</a><a href="javascript:;" style="display: none;" onClick="try{ document.getElementsByTagName(\'table\')['+i+'].getElementsByTagName(\'td\')[1].getElementsByTagName(\'div\')[3].style.display = \'none\'; } catch(err){} document.getElementsByTagName(\'table\')['+i+'].getElementsByTagName(\'td\')[1].getElementsByTagName(\'div\')[2].style.display = \'none\'; document.getElementsByTagName(\'table\')['+i+'].getElementsByTagName(\'td\')[1].getElementsByTagName(\'div\')[1].style.display = \'none\'; this.previousSibling.style.display = \'\'; this.style.display = \'none\';">[ gizle ]</a>';

        var bar = tables[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('small')[0].getElementsByTagName('span')[0];
        bar.innerHTML = bar.innerHTML + ' <a href="javascript:;" onClick="var username = document.getElementsByTagName(\'table\')['+i+'].getElementsByTagName(\'td\')[0].getElementsByTagName(\'span\')[0].getElementsByTagName(\'b\')[0].innerHTML; var d=new Date(); d.setTime(d.getTime()+(-500*24*60*60*1000)); var expires=\'; expires=\'+d.toGMTString(); var value = \'ignored\'; document.cookie = username+\'=\'+value+expires+\'; path=/\'; alert(username+\' icin olan ignore kaldirildi!\')">[ no ignore ]</a>';
      }
      else {
        var bar = tables[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('small')[0].getElementsByTagName('span')[0];
        bar.innerHTML = bar.innerHTML + ' <a href="javascript:;" onClick="var username = document.getElementsByTagName(\'table\')['+i+'].getElementsByTagName(\'td\')[0].getElementsByTagName(\'span\')[0].getElementsByTagName(\'b\')[0].innerHTML; var d=new Date(); d.setTime(d.getTime()+(365*24*60*60*1000)); var expires=\'; expires=\'+d.toGMTString(); var value = \'ignored\'; document.cookie = username+\'=\'+value+expires+\'; path=/\'; alert(username+\' ignorelandi!\')">[ ignore ]</a>';
      }
    }
  i++;
}