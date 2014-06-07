// ==UserScript==
// @name           Subs Delete
// @namespace      Удаление субтитров
// @include        http://notabenoid.com/book/*/*/*
// @description    Очистка перевода субтитров сделанного на сайте notabenoid.com
// @author         Plavozont
// @homepage       http://www.liveinternet.ru/users/plavozont/post157074967/
// ==/UserScript==

function subs_delete_init()
{ window.subs_inc=undefined;
  
  if ($('#subs_delete_button').length==0) 
  { 
    if ($('#subs_tools').length==0) $('#content').children('table:first').after("<table><tr id='subs_tools'></tr>");
    
    $('#Translator tr').each(function()
    { var v;
      if(this.id.match(/v[0-9]+/))
      { v=this.id.match(/[0-9]+/);
        if (typeof(v_min)=='undefined') window.v_min=v;
        window.v_max=v;
      }
    })
    
    $('#subs_tools').append("<td><span><textarea id='subs_delete_textarea' class='f' style='margin-right:3px;background-color:#FFAA77;' cols='60' rows='3'>"+window.v_min+"-"+window.v_max+"</textarea><br><input type='button' class='f' id='subs_delete_button' value='\u043E\u0447\u0438\u0441\u0442\u043A\u0430' onclick='subs_delete()'></span></td>");
  }
  
}

if (typeof($)!='undefined') subs_delete_init()

function subs_delete()
{ 
  if (window.subs_inc==undefined)
  { window.subs_inc=0; window.subs_control=0; window.callback_control=0; window.control_end=false;window.subs_tds=[];
    //var tds=$('#Translator tr'); 
    
    vv=$('#subs_delete_textarea').val().match(/[0-9]+-[0-9]+(?:\s+,\s+|,\s+|\s+,|,*)|[0-9]+(?:\s+,\s+|,\s+|\s+,|,*)/g);
    if ($('#subs_delete_textarea').val()!=vv.join('')) { alert('Неверно указан диапазон'); window.subs_inc=undefined; return; }
    
    var v1;
    window.lines=[];
    for (var i=0; i<vv.length; i++)
    { vv1=vv[i].match(/[0-9]+/g);
      if (vv1[0]>vv1[1]) {alert('в диапазоне M-N, M должна быть меньше N'); window.subs_inc=undefined; return;}
      for (var j=vv1[0]; j<=((vv1[1]==undefined) ? vv1[0] : vv1[1]); j++) if ((window.lines.join('|')+'|').indexOf(j+"|")==-1) window.lines.push(j)
    }
    
    $('#Translator td').each(function()
    { 
      if(this.id.match(/t[0-9]+/)) 
      { var rn=$('#'+$('#'+this.id).closest('table').closest('tr')[0].id+" [class=n]")[0].innerHTML;
        if ((window.lines.join('|')+'|').indexOf(rn+'|')!=-1)
        { var wstl=window.subs_tds.length;
          window.subs_tds[wstl]=[];
          window.subs_tds[wstl][0]=this.id.match(/[0-9]+/);
          window.subs_tds[wstl][1]=rn;
        }
      }
    })
    if (window.subs_tds.length==0) { alert('В указанных строках нет ваших субтитров.'); window.subs_inc=undefined; return; }
    //console.log(window.subs_tds.join("|"))
      
    //window.lines=window.lines.join('|')+"|"
    //window.l_max=window.lines.sort()[window.lines.length-1];
  }
  
  
  var s_tds=window.subs_tds[window.subs_inc];
  var td_id=parseInt(s_tds[0]); var tr_id=parseInt(s_tds[1]);
  
  //console.log("window.subs_inc: "+window.subs_inc+" td_id: "+td_id+" td_id: "+tr_id)
  
  if ((window.lines.join('|')+'|').indexOf(tr_id+'|')!=-1)
  { window.subs_control++;
    
    var args={act: 'tr_rm', aid: tr_id, id: td_id};
    var callback=function(){ window.callback_control++; if (window.control_end && window.subs_control==window.callback_control) { alert('OK'); window.location=window.location; } }
    $.postJSON(location.href, args, callback);
  }
  
  window.subs_inc++; $('#subs_delete_button')[0].value=tr_id;
  
  //console.log(window.subs_inc)
  
  if (window.subs_inc==window.subs_tds.length)
  { window.subs_inc=undefined; window.subs_tds=undefined;
    $('#subs_counter').remove();
    window.control_end=true;
    //console.log("control_end");
    return;
  }
  
  
  window.subs_timeout=setTimeout("subs_delete()", 100);
}

if (typeof($)=='undefined')
{ // Create a script node holding this source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = subs_delete+"\n("+subs_delete_init+")()";
  // Insert the script node into the page, so it will run, and immediately remove it to clean up.
  document.body.appendChild(script);
  //document.body.removeChild(script);
}