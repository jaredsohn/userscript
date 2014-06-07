// ==UserScript==
// @name           Subs import
// @namespace      Импорт субтитров
// @include        http://notabenoid.com/book/*/*/*
// @description    Импорт перевода субтитров на сайт notabenoid.com
// @author         Plavozont
// @homepage       http://www.liveinternet.ru/users/plavozont/post157074967/
// ==/UserScript==

function subs_import_init()
{ window.subs_inc=undefined;
  if ($('#subs_import_button').length==0)
  { if ($('#subs_tools').length==0) $('#content').children('table:first').after("<table><tr id='subs_tools'></tr></table>");
    $('#subs_tools').append("<td><span style='display:table-cell;'><textarea id='subs_import_textarea' class='f' style='margin-right:3px;background-color:LightSkyBlue;' cols='60' rows='3' name='body'></textarea><br><input type='button' class='f' id='subs_import_button' value='\u0438\u043C\u043F\u043E\u0440\u0442' onclick='subs_import()'></span></td>");
    
  }
}

if (typeof($)!='undefined') subs_import_init()

function subs_import()
{ if (window.subs_inc==undefined)
  { var sit=$("#subs_import_textarea").val(); if (sit=='') { window.subs_inc=undefined; return; };
    window.subs_lines=sit.split("\n");
    window.subs_inc=0; window.subs_control=0; window.callback_control=0; window.control_end=false;
  }
  var subt_ind; var j; var text;
  i=window.subs_inc;
  while(isNaN(parseInt(window.subs_lines[i])) && i<window.subs_lines.length) i++;
  //if (i>=window.subs_lines.length) { window.subs_inc=undefined; window.control_end=true; return; }
  
  //console.log('subt_ind: '+subs_lines[i])
  subt_ind=subs_lines[i];
  window.subs_control++;
  //console.log('subs_control: '+window.subs_control);
  j=i+2;
  text='';
  while(window.subs_lines[j]!=="" && j<window.subs_lines.length)
  { //console.log("!: "+subs_lines[j])
    text+=window.subs_lines[j];
    if (window.subs_lines[j+1]!="") text+="\n";
    j++;
  } i=j;
  
  //console.log(text)
  var args={act: 'tr_add', book_id: Book.id, chap_id: Book.chap_id, aid: subt_ind, body: text};
  var callback=function(){ window.callback_control++; if (window.control_end && window.subs_control==window.callback_control) { window.location=window.location; } }
  $.postJSON(location.href, args, callback);
  //console.log('callback_control: '+window.callback_control+" "+window.subs_control+" "+((window.control_end) ? "true" : false));
  window.subs_inc=i; window.subs_inc++;
  $('#subs_import_button')[0].value=subt_ind;
  if (window.subs_inc==window.subs_lines.length || i>=window.subs_lines.length) { window.subs_inc=undefined; window.control_end=true; return; }
  window.subs_timeout=setTimeout("subs_import()", 100);
}

if (typeof($)=='undefined')
{ // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = subs_import+"\n("+subs_import_init+")()";
  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  //document.body.removeChild(script);
}
