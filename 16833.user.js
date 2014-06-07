// ==UserScript==
// @name          orkut Security
// @namespace     http://www.orkut.com/Community.aspx?cmm=25000000
// @description   Possibilita navegar no orkut com JavaScript desativado.
// @include       http://www.orkut.com/*
// @include       http://images.orkut.com/*
// @include       http://sandbox.orkut.com/*
// ==/UserScript==

/************************************************************************************************
 *
 *   Autor: Asrail (http://www.orkut.com/Profile.aspx?uid=12063090882071243011)
 *   Nome: orkut Security
 *   Versão: 2.0.2c
 *   Última atualização: 15-02-2008, 13:09h (GMT -3)
 *   Tamanho: 52 Kb
 *   Tipo de Licença: GNU GPL
 *
 *   Agradecimentos: Sérgio (uid=18169310566226668758),
 *                   Rodrigo Lacerda (uid=7601737751764072594) e
 *                   Elsio (uid=2884343855476816002).
 *
 *   Acesse a comunidade orkut Security para ficar por dentro das atualizações,
 *   enviar sugestões, dúvidas, elogios e/ou críticas em relação ao script:
 *
 *   http://www.orkut.com/Community.aspx?cmm=25000000
 *
 ************************************************************************************************/


documento = document;
span = documento.getElementsByTagName('span');
s = span.length-1;
locationSearch = documento.location.search;
locationPathname = documento.location.pathname;
locationPathnameLC = locationPathname.toLowerCase();
style = 'background-color: transparent; border: 0px; color: #C40098; font-size: 10; font-weight:700; margin-left: -13px; margin-right: -4px; padding-left:10px; padding-top:0px; cursor:pointer !important';
btnboxr = "<span class='btnboxr'><img src=\"http://img1.orkut.com/img/b.gif\" alt='' height='1' width='5'></span>";
var ul = documento.getElementsByTagName('ul');

if ( ul[1] != undefined ) {
  if ( ul[1].className == 'menu' ) {
    ul[1].innerHTML += "<li>&nbsp;|&nbsp;<a href='/Community.aspx?cmm=25000000'>orkut Security</a></li>";
  }
}

switch (locationPathnameLC) {

  case "/home.aspx":

    var formLen = documento.forms.length-1;
    var formAux = 0;
    var spanAux = 0;
    var testimonial = 0;

    while ( ( documento.forms[formAux].innerHTML.indexOf('friendRequestUserId') == -1 ) && ( formAux < formLen ) ) {
      formAux++;
    }

    do {
      if ( span[spanAux].className == 'grabtn' ) {
        if ( span[spanAux].innerHTML.indexOf('window.location=') == 39 ) {
          span[spanAux].innerHTML = "<a href=\"/FriendAdd.aspx?accept=true&uid=" + documento.forms[formAux].elements[2].value + "\" class=\"btn\">sim</a>";
          formAux++;
        } else
        if ( span[spanAux].innerHTML.indexOf('_submitForm(this, \'declineFriend\'') == 39 ) {
          span[spanAux].innerHTML = "<input value='n&atilde;o' name='Action.declineFriend' type='submit' style='"+style+"'>";
        } else
        if ( span[spanAux].innerHTML.indexOf('_submitForm(this, \'handleTestimonial\'') == 39 ) {
          if ( testimonial == 0 ) {
            span[spanAux].innerHTML = "<input value='recusar' name='Action.handleTestimonial' type='submit' style='"+style+"'>";
            testimonial++;
          } else if ( testimonial == 1 ) {
            span[spanAux].innerHTML = "<input value='aceitar' name='Action.handleTestimonial' type='submit' style='"+style+"'>";
            testimonial--;
          }
        }
      }
      spanAux++;
    } while ( spanAux < s );

    break;

  case "/profile.aspx":

    var linksAux = 0;
    var linksLen = documento.links.length;
    var myProfile = 1;

    for ( linksAux; linksAux < linksLen ; linksAux++ ) {
      if ( documento.links[linksAux].href.indexOf('EditSummary.aspx') != -1) {
        myProfile = 0;
      }
    }

    if ( myProfile ) {
      var POST_TOKEN = documento.forms[1].elements[0].value;
      var signature = documento.forms[1].elements[1].value;
      var uid = locationSearch.match(/uid=\d+/gi);
      var menus = "<div class='listdivi' style='height:6px'><table cellpadding='0' cellspacing='0' border='0' class='module' style='width: 100%'><tr><td class='topl'></td><td class='topr'></td></tr><tr><td class='boxmid'><div class='userinfodivi'></div><a href='/Compose.aspx?"+uid+"' class='userbutton' title='enviar mensagem' alt='enviar mensagem'><span class=icon'><span class='p_letter lf'></span></span>&nbsp;enviar mensagem</a><a href='/MsgsTeaser.aspx?"+uid+"' class='userbutton' title='enviar cantada' alt='enviar cantada'><span class='icon'><span class='p_teaser lf'></span></span>&nbsp;enviar cantada</a><a href='/FlagProfile.aspx?"+uid+"' class='userbutton' title='denunciar abuso' alt='denunciar abuso'><span class='icon'><span class='p_flagprofile lf'></span></span>&nbsp;denunciar abuso</a><div class='userinfodivi'></div></td><td class='boxmidr'></td></tr><tr><td class='botl'></td><td class='botr'></td></tr></table>";
	  menus += "<table cellpadding='0' cellspacing='0' border='0' class='module' ><tr><td class='topl_g'><div class='listdivi' style='height:1px'></div><div class='leftnavh'>listas</div></td><td class='topr_g'></td></tr><tr><td class='boxmid'><div class='listdark' style='padding-top:3px;'><form id='addIgnoreList' method='post'><div><input type='hidden' name='POST_TOKEN' value='"+POST_TOKEN+"' /><input type='hidden' name='signature' value='"+signature+"' /><input type='checkbox' name='Action.addBookmark' /><span class='sml_nomargin'>&nbsp;favoritos</span></div><div><input type='checkbox' name='Action.addHot' /><span class='sml_nomargin'>&nbsp;gatos & gatas</span></div><div><input type='checkbox' name='Action.addCrush' /><span class='sml_nomargin'>&nbsp;paqueras</span></div><div><input type='checkbox' name='Action.addIgnoreList' /><span class='sml_nomargin'>&nbsp;ignorados</span></div><div class='listdivi' style='height:3px'></div><div class='inlinebtns'><span class='grabtn'><input value='adicionar' type='submit' style='"+style+"'></span>"+btnboxr+"</form></div></div></td><td class='boxmidr'></td></tr><tr><td class='botl'></td><td class='botr'></td></tr></table></div>";
      documento.getElementById('lbox').getElementsByTagName('table')[0].innerHTML += menus;
    }

    if ( locationSearch.indexOf('uid=') != -1 ) {

      var uid = locationSearch.match(/uid=\d+/gi);

      if ( documento.getElementById('t0') != null ) {
        documento.getElementById('t0').getElementsByTagName('a')[0].href = "Profile.aspx?" + uid;
      }
      if ( documento.getElementById('t1') != null ) {
        documento.getElementById('t1').getElementsByTagName('a')[0].href = "Profile.aspx?" + uid + "&tab=1";
      }
      if ( documento.getElementById('t2') != null ) {
        documento.getElementById('t2').getElementsByTagName('a')[0].href = "Profile.aspx?" + uid + "&tab=2";
      }
    } else {
      if ( documento.getElementById('t0') != null ) {
        documento.getElementById('t0').getElementsByTagName('a')[0].href = "Profile.aspx";
      }
      if ( documento.getElementById('t1') != null ) {
        documento.getElementById('t1').getElementsByTagName('a')[0].href = "Profile.aspx?tab=1";
      }
      if ( documento.getElementById('t2') != null ) {
        documento.getElementById('t2').getElementsByTagName('a')[0].href = "Profile.aspx?tab=2";
      }
    }

    if ( locationSearch.indexOf('tab=1') != -1 ) {
      if ( documento.getElementById('divBody1') != null ) {
        documento.getElementById('divBody0').style.display = "none";
        documento.getElementById('t0').className = "";
        documento.getElementById('divBody1').style.display = "block";
        documento.getElementById('t1').className = "sel";
      }
    } else
      if ( locationSearch.indexOf('tab=2') != -1 ) {
        if ( documento.getElementById('divBody2') != null ) {
          documento.getElementById('divBody0').style.display = "none";
          documento.getElementById('t0').className = "";
          documento.getElementById('divBody2').style.display = "block";
          documento.getElementById('t2').className = "sel";
        }
      }

    break;

  case "/scrapbook.aspx":

    var formLen = documento.forms.length-1;
    var locationHref = documento.location.href;

    if ( formLen < 0 ) {
      documento.location = locationHref.replace(/[?&]+reply=\d+/gi,"");
    }
    if ( formLen > 0 ) {
      var POST_TOKEN = documento.forms[1].elements[0].value;
      var signature = documento.forms[1].elements[1].value;
    }
    var div = documento.getElementsByTagName('div');
    var divLen = div.length-1;
    var td = documento.getElementsByTagName('td');
    var tdLen = td.length-1;
    var replyNum;
    var captcha = "<div><p class='listfl'><br>Preenchimento necess&aacute;rio se a mensagem contiver links.</p><p class='listp'><img src='/CaptchaImage.aspx' width='200' height='70' alt='' align='top' class='capchabox'></p><div class='listdivi'></div><p class='listfl'>digite o texto conforme mostrado na caixa acima:</p><p class='listp'><input name='cs' type='text' maxlength='10' size='10' id='captchaTextbox'></p></div><div class='listdivi'></div>";
    
    if ( locationSearch.indexOf('reply=') != -1 ) {
      reply = locationSearch.match(/reply=\d+/gi)+"";
      reply = reply.replace(/reply=/,"");

      if ( reply > 0 && reply < 31) {
        replyNum = reply;
        documento.getElementById("scrap_"+replyNum).style.display = "block";
      }
    }

	do {
      if ( div[divLen].innerHTML.indexOf('<a class="rbs" href="javascript: void(0);" id="reply_link_') == 1 ) {
        dados = div[divLen].innerHTML.match(/\d+/gi);

        if ( locationSearch.match(/uid=\d+/gi) == null ) {
          div[divLen].innerHTML = "<a href='"+locationPathname+"?reply="+dados[1]+">Responder</a>";
        } else {
          div[divLen].innerHTML = "<a href='"+locationPathname+locationSearch+"&reply="+dados[1]+">Responder</a>";
        }
      } else
      if ( div[divLen].innerHTML.indexOf("<textarea id=\"scrapText_"+replyNum+"\"") == 1 ) {
        var dados = div[divLen].getElementsByTagName('span')[0].innerHTML.match(/\d+/gi);
        var toUserId = dados[1];
        var rawAddedDate = dados[2];
        var replyToken = div[divLen].getElementsByTagName('span')[0].innerHTML.match(/'(.*)'/gi);
        var href = locationHref.replace(/[?|&]reply=\d+/gi,"");
        var captcha_reply = "<div><p class='lf'><img src='/CaptchaImage.aspx' width='200' height='70' alt='' align='top' class='capchabox'></p><div class='listdivi'></div><p class='listp'><input name='cs' type='text' maxlength='10' size='10' id='captchaTextbox'></p><br><br></div><div class='listdivi'></div>";
        div[divLen].innerHTML = "<form><textarea name='scrapText' cols='55' rows='4' ></textarea>"+captcha_reply+"<div class='listdivi'></div><input name='POST_TOKEN' value='"+POST_TOKEN+"' type='hidden'><input name='signature' value='"+signature+"' type='hidden'><input name='toUserId' value='"+toUserId+"' type='hidden'><input name='rawAddedDate' value='"+rawAddedDate+"' type='hidden'><input name='replyToken' value="+replyToken+" type='hidden'><input value='' name='Action.submit' type='hidden'><span class='grabtn'><input value='enviar recado' name='Action.submit' type='submit' style='"+style+"'></span>"+btnboxr+"&nbsp;<span class='grabtn'><a href='"+href+"' class='btn'>cancelar</a></span>"+btnboxr+"<div class='listdivi' style='height:3px'></div></form>";
      } else
      if ( div[divLen].innerHTML.indexOf('<span class=\"rfdte\">') == 1 && div[divLen].innerHTML.indexOf('_singleDelete') != -1 ) {
        var dados = div[divLen].getElementsByTagName('span')[1].innerHTML.match(/\d+/gi);
        var toUserId = dados[1];
        var rawAddedDate = dados[2];
        div[divLen].innerHTML = "<form name='deleteForm' id='deleteForm' method='post'>"+div[divLen].innerHTML+"</form>";
      }
      divLen--;
    } while ( divLen>0 );

    if ( documento.forms[1] != undefined ) {
      if ( documento.forms[1].innerHTML.indexOf('captchaContainer') == 189 ) {
        documento.forms[1].innerHTML += captcha;
      } else if ( documento.forms[5].innerHTML.indexOf('captchaContainer') == 189 ) {
        documento.forms[5].innerHTML += captcha;
      }
    }

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('if (_numChecked') == 39 && span[s].innerHTML.indexOf('\'delete\'') != -1 ) {
          span[s].innerHTML = "<input value='excluir recados selecionados' name='Action.delete' type='submit' style='"+style+"'>";
        }
        if ( span[s].innerHTML.indexOf('if (_numChecked') == 39 && span[s].innerHTML.indexOf('\'report_scraps\'') != -1 ) {
          span[s].innerHTML = "<input value='denunciar spam' name='Action.report_scraps' type='submit' style='"+style+"'>";
        }
        if ( span[s].innerHTML.indexOf('_singleDelete(function()') == 39 ) {
          var dados = span[s].innerHTML.match(/\d+/gi);
          var fromUserId = dados[1];
          var toUserId = dados[2];
          var rawAddedDate = dados[3];
          if ( documento.getElementById('actionMenu') == null ) {
            span[s].innerHTML = "<input name='POST_TOKEN' value='"+POST_TOKEN+"' type='hidden'><input name='signature' value='"+signature+"' type='hidden'><input name='fromUserId' value='"+fromUserId+"' type='hidden'><input name='toUserId' value='"+toUserId+"' type='hidden'><input name='rawAddedDate' value='"+rawAddedDate+"' type='hidden'><input value='apagar' name='Action.deleteSingle' type='submit' style='"+style+"'>";
          } else {
            span[s].style.display = 'none';
            span[s+1].style.display = 'none';
          }
        }
      }
      s--;
    } while ( s > 0 );

    do {
      if ( td[tdLen].innerHTML.indexOf('<form id="inputForm" name="inputForm" method="post"') == 1 ) {
        td[tdLen].innerHTML = "<form id='inputForm' name='inputForm' method='post'><input type='hidden' name='POST_TOKEN' value='"+POST_TOKEN+"'><input type='hidden' name='signature' value='"+signature+"'><div class='lf para' style='margin: 0px 5px 3px 3px;'><textarea id='scrapText' name='scrapText' cols='83' rows='4'></textarea>"+captcha+"<div class='lf'><div id='hosted'></div></div></div><div class='listdivi ln'></div><div class='parabtns'><span class='grabtn'><input name='Action.submit' value='' type='hidden'><input value='enviar recado' name='Action.submit' type='submit' style='"+style+"'></span>"+btnboxr+"&nbsp;<span class='grabtn'><a href='/Format.aspx' class='btn'>dicas de recados</a></span>"+btnboxr+"</div></form>";
      }
      tdLen--;
    } while ( tdLen > 0 );

    break;

  case "/commtopics.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('deleteTopic(document.topicsForm') == 39 ) {
          span[s].style.display = "none";
          span[s+1].style.display = "none";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'\'') == 39 ) {
          span[s].innerHTML = "<input value='pesquisar' type='submit' style='"+style+"'>";
          s = 0;
        } else
        if ( span[s].innerHTML.indexOf('if (_numChecked(document.topicsForm') == 39 && span[s].innerHTML.indexOf('deleteTopics') != -1 ) {
          span[s].innerHTML = "<input value='excluir t&oacute;picos selecionados' name='Action.delete_topics' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('if (_numChecked(document.topicsForm') == 39 && span[s].innerHTML.indexOf('reportTopics') != -1 ) {
          span[s].innerHTML = "<input value='denunciar spam' name='Action.report_topics' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/commmsgs.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'delete\'') == 39 ) {
          span[s].innerHTML = "<input value='excluir' name='Action.delete' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'delete_entire_topic\'') == 39 ) {
          span[s].innerHTML = "<input value='excluir t&oacute;pico' name='Action.delete_entire_topic' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('reportTopics(document.topicsForm') == 39 ) {
          span[s].innerHTML = "<input value='denunciar spam' name='Action.report_topics' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/commmsgpost.aspx":
  case "/commeventpost.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'submit\'') == 39 ) {
          span[s].innerHTML = "<input value='enviar' name='Action.submit' type='submit' style='"+style+"'>";
          s = 0;
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'preview\'') == 39 ) {
          span[s].innerHTML = "<input value='visualizar' name='Action.preview' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/communities.aspx":

    if ( documento.getElementById('t0') != null ) {
      documento.getElementById('t0').getElementsByTagName('a')[0].href = "Communities.aspx";
    }
    if ( documento.getElementById('t1') != null ) {
      documento.getElementById('t1').getElementsByTagName('a')[0].href = "Communities.aspx?tab=1";
    }
    if ( documento.getElementById('t2') != null ) {
      documento.getElementById('t2').getElementsByTagName('a')[0].href = "Communities.aspx?tab=2";
    }

    if ( locationSearch.indexOf('tab=1') != -1 ) {
      if ( documento.getElementById('divBody1') != null ) {
        documento.getElementById('divBody0').style.display = "none";
        documento.getElementById('t0').className = "";
        documento.getElementById('divBody1').style.display = "block";
        documento.getElementById('t1').className = "sel";
      }
    } else
      if ( locationSearch.indexOf('tab=2') != -1 ) {
        if ( documento.getElementById('divBody2') != null ) {
          documento.getElementById('divBody0').style.display = "none";
          documento.getElementById('t0').className = "";
          documento.getElementById('divBody2').style.display = "block";
          documento.getElementById('t2').className = "sel";
        }
      }

    var btns = 0;

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'\'') == 39 && btns == 0 ) {
          span[s].innerHTML = "<input value='criar' type='submit' style='"+style+"'>";
          btns++;
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'\'') == 39 && btns == 1 ) {
          span[s].innerHTML = "<input value='pesquisar' type='submit' style='"+style+"'>";
          btns++;
          s = 0;
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/commmembermanage.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'boot\'') == 39 ) {
          span[s].innerHTML = "<input value='remover da comunidade' name='Action.boot' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'ban\'') == 39 ) {
          span[s].innerHTML = "<input value='expulsar da comunidade' name='Action.ban' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'doDeletePosts\'') == 39 ) {
          span[s].innerHTML = "<input value='excluir todas as postagens do usu&aacute;rio' name='Action.doDeletePosts' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'unBan\'') == 39 ) {
          span[s].innerHTML = "<input value='desfazer expuls&atilde;o da comunidade' name='Action.unBan' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'delModerator\'') == 39 ) {
          span[s].innerHTML = "<input value='revogar privil&eacute;gios de mediador' name='Action.delModerator' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'addModerator\'') == 39 ) {
          span[s].innerHTML = "<input value='conceder privil&eacute;gios de mediador' name='Action.addModerator' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'acceptPending\'') == 39 ) {
          span[s].innerHTML = "<input value='aceitar convite' name='Action.acceptPending' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'declinePending\'') == 39 ) {
          span[s].innerHTML = "<input value='recusar pedido de participa&ccedil;&atilde;o' name='Action.declinePending' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/community.aspx":

    var form = documento.getElementsByTagName('form');
    var formLen = form.length-1;
    var formAux = 1;

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'vote\'') == 39 ) {
          span[s].innerHTML = "<input value='votar' name='Action.vote' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_reportItems(document.pollForm') == 39 ) {
          span[s].innerHTML = "<input value='denunciar spam' name='Action.report_polls' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('if (_numChecked(document.topicsForm') == 39 ) {
          span[s].style.display = 'none';
          span[s+1].style.display = 'none';
        } else
        if ( span[s].innerHTML.indexOf('if (_numChecked(document.pollsForm') == 39 ) {
          span[s].style.display = 'none';
          span[s+1].style.display = 'none';
        } else
        if ( span[s].innerHTML.indexOf('if (_numChecked(document.eventsForm') == 39 ) {
          span[s].style.display = 'none';
          span[s+1].style.display = 'none';
        }
      }
      s--;
    } while ( s > 0 );

    for ( var formAux; formAux <= formLen; formAux++ ) {
      if ( form[formAux].innerHTML.indexOf('Action.remove') != -1 ) {
        form[formAux].style.display = 'block';
   	    form[formAux].innerHTML += "<div align='center' style='margin: 0px 0px 5px 5px;'><span class='grabtn'><input value='X' name='Action.remove' type='submit' style='"+style+"'></span>"+btnboxr+"</div>"
	  }
    }

    break;

  case "/commmembers.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'\'') == 39 ) {
          span[s].innerHTML = "<input value='pesquisar' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'acceptPending\'') == 39 ) {
          span[s].innerHTML = "<input value='aceitar' name='Action.acceptPending' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'declinePending\'') == 39 ) {
          span[s].innerHTML = "<input value='recusar' name='Action.declinePending' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'addModerator\'') == 39 ) {
          span[s].innerHTML = "<input value='conceder privil&eacute;gios de mediador' name='Action.addModerator' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'delModerator\'') == 39 ) {
          span[s].innerHTML = "<input value='revogar privil&eacute;gios de mediador' name='Action.delModerator' type='submit' style='"+style+"'>";
        }
      }
      s--;
   } while ( s > 0 );

    break;

  case "/commapprove":

    documento.getElementsByTagName('form')[h-1].getElementsByTagName('span')[0].innerHTML = "<input value='aceitar todas' name='Action.acceptRequest' type='submit' style='"+style+"'>";
    documento.getElementsByTagName('form')[h].getElementsByTagName('span')[0].innerHTML = "<input value='recusar todas' name='Action.declineRequest' type='submit' style='"+style+"'>";

    break;

  case "/communityedit.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'create\'') == 39 ) {
          span[s].innerHTML = "<input value='criar comunidade' name='Action.create' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'update\'') == 39 ) {
          span[s].innerHTML = "<input value='atualizar' name='Action.update' type='submit' style='"+style+"'>";
        }
      }
	  s--;
    } while ( s > 0 );

    break;

  case "/captchaconfirm.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'submit\'') == 39 ) {
        span[s].innerHTML = "<input value='confirmar' name='Action.submit' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/compose.aspx":
  case "/testimonialwrite.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'submit\'') == 39 ) {
        span[s].innerHTML = "<input value='enviar' name='Action.submit' type='submit' style='"+style+"'>";
      }
      s--;
    } while ( s > 0 );

    break;

  case "/albumlist.aspx":

    var locationHref = documento.location.href;

    if ( documento.forms.length < 1 ) {
      documento.location = locationHref.replace(/[?]aid=\d+/,"");
    } 

    var aid = "00000000";
    var p = documento.getElementsByTagName('p');
    var pLen = p.length-1;
   
    if ( locationSearch.indexOf('aid=') != -1 ) {
      aid = locationSearch.match(/aid=\d+/gi)+"";
      aid = aid.replace(/aid=/,"");
    }
   
    do {
      if ( p[pLen].innerHTML.indexOf('<span class=\"grabtn\">') == 1 && p[pLen].innerHTML.indexOf('_setIdProperty(\'updateAlbumDiv') != -1 ) {
        dados = p[pLen].getElementsByTagName('span')[0].innerHTML.match(/\d+/gi);
        p[pLen].innerHTML = "<form id='delete"+dados[1]+"' method='post' action='/AlbumList.aspx'>"+documento.getElementById('delete'+dados[1]).innerHTML + "<span class='grabtn'><a href='/AlbumList.aspx?aid="+dados[1]+"' class='btn'>editar</a></span>"+btnboxr+"<span class='grabtn'><input value='apagar' name='Action.deleteAlbum' type='submit' style='"+style+"'></span>"+btnboxr+"</form>";
      }
      pLen--;
    } while ( pLen > 0 );

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'\', \'_checkAlbumData(') == 39 ) {
          span[s].innerHTML = "<input value='criar' name='Action.add' type='submit' style='"+style+"'>";
          s = 0;
        } else
	    if ( span[s].innerHTML.indexOf('_updateAlbumData('+aid) == 39 ) {
          documento.getElementById('updateAlbumDiv'+aid).style.display = "block";
          span[s].innerHTML = "<input value='atualizar' name='Action.updateAlbum' type='submit' style='"+style+"'>";
        } else
	    if ( span[s].innerHTML.indexOf('_setIdProperty(\'updateAlbumDiv'+aid) == 39 ) {
          span[s].innerHTML = "<a href='/AlbumList.aspx' class='btn'>cancelar</a>";
        }
      }
      s--;
   } while ( s > 0 );

    break;

  case "/album.aspx":

    var locationHref = documento.location.href;

    if ( documento.forms.length < 1 ) {
      documento.location = locationHref.replace(/[&]pid=\d+/,"");
    } 

    var pid = "00000000";
    var div = documento.getElementsByTagName('div');
    var divLen = div.length-1;

    if ( locationSearch.indexOf('pid=') != -1 ) {
      pid = locationSearch.match(/pid=\d+/gi)+"";
      pid = pid.replace(/pid=/,"");
    }

    do {
      if ( div[divLen].innerHTML.indexOf('<nobr><span class=\"grabtn\">') == 1 && div[divLen].innerHTML.indexOf('_setIdProperty(\'updatePhotoDiv') != -1 ) {
        var dados = div[divLen].getElementsByTagName('span')[0].innerHTML.match(/\d+/gi);
        div[divLen].innerHTML = "<form id='delete"+dados[1]+"' method='post' action='/Album.aspx'>"+documento.getElementById('delete'+dados[1]).innerHTML+"<span class='grabtn'><a href='"+locationHref.replace(/[&]pid=\d+/,"")+"&pid="+dados[1]+"' class='btn'>editar</a></span>"+btnboxr+"<span class='grabtn'><input value='apagar' name='Action.deletePhoto' type='submit' style='"+style+"'></span>"+btnboxr+"<br><br>&nbsp;</form>";
      }
      divLen--;
    } while ( divLen > 0 );

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'\', \'_checkImage()') == 39 ) {
          span[s].innerHTML = "<input value='carregar foto' name='Action.upload' type='submit' style='"+style+"'>";
          s = 0;
        } else
        if ( span[s].innerHTML.indexOf('_updatePhotoData('+pid) == 39 ) {
          documento.getElementById('updatePhotoDiv'+pid).style.display = "block";
          documento.getElementById('setAsCoverPhoto'+pid).name = "setAsAlbumCover";
          documento.getElementById('setAsCoverPhoto'+pid).value = 1;
          span[s].innerHTML = "<input value='atualizar' name='Action.updateAlbum' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_setIdProperty(\'updatePhotoDiv'+pid) == 39 ) {
          span[s].innerHTML = "<a href='"+locationHref.replace(/[&]pid=\d+/,"")+"' class='btn'>cancelar</a>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/friends.aspx":

   locationHref = documento.location.href;

   if ( documento.getElementById('f0') == null && ( documento.getElementById('statusMsgBody').innerHTML.indexOf('An unknown error occured') == 1 || documento.getElementById('statusMsgBody').innerHTML.indexOf('Ocorreu um erro indefinido') == 1 ) ) {
     documento.location = locationHref;
   }

   if ( documento.getElementById('statusMsgBody').innerHTML.indexOf('An unknown error occured') == 1 || documento.getElementById('statusMsgBody').innerHTML.indexOf('Ocorreu um erro indefinido') == 1 ) {
     documento.getElementById('statusMsg').style.display = 'none';
   }

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_editUser') == 39 ) {
        span[s].innerHTML = "<form><input value='remover' name='Action.deleteFriend' type='submit' style='"+style+"'></form>"  
      }
      if ( span[s].className == 'rf' && span[s].innerHTML.indexOf('<input id="searchMyFriends"') == 1 ) {
        span[s].innerHTML = "<input type='hidden' name='show' value='search'><input type='text' name='searchQuery' size=16 maxlength=20 value=''>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/friendslist.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'\'') == 39 ) {
        span[s].innerHTML = "<input value='procurar amigos' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/invite.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'multipleInvite\'') == 39 ) {
        span[s].innerHTML = "<input value='enviar' name='Action.multipleInvite' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/commpollvote.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'vote\'') == 39 ) {
          span[s].innerHTML = "<input value='votar' name='Action.vote' type='submit' style='"+style+"'>";
          s = 0;
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'delete_poll\'') == 39 ) {
          span[s].innerHTML = "<input value='excluir' name='Action.delete_poll' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_reportItems(document.pollForm') == 39 ) {
          span[s].innerHTML = "<input value='denunciar spam' name='Action.report_polls' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/commpolls.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_confirmDelete(') == 39 ) {
          span[s].style.display = 'none';
          span[s+1].style.display = 'none';
        } else
        if ( span[s].innerHTML.indexOf('if (_numChecked(document.pollsForm') == 39 ) {
          span[s].innerHTML = "<input value='denunciar spam' name='Action.report_polls' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/commpollresults.aspx":

    documento.getElementById('replyTopicForm').style.display = 'block';
    documento.getElementById('replyTopicForm').style.visibility = 'visible';
   
    do {
      if ( span[s].className == 'grabtn' ) { 
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'delete\'') == 39 ) {
          span[s].innerHTML = "<input value='excluir' name='Action.delete' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'vote\'') == 39 ) {
          span[s].innerHTML = "<input value='votar' name='Action.vote' type='submit' style='"+style+"'>";
          s = 0;
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'delete_poll\'') == 39 ) {
          span[s].innerHTML = "<input value='excluir' name='Action.delete_poll' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'submit\'') == 39 ) {
          span[s].innerHTML = "<input value='enviar' name='Action.submit' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_reportItems(document.pollForm') == 39 ) {
          span[s].innerHTML = "<input value='denunciar spam' name='Action.report_polls' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/commevents.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'delete_event') == 39 ) {
          span[s].style.display = 'none';
          span[s+1].style.display = 'none';
        } else
        if ( span[s].innerHTML.indexOf('if (_numChecked(document.eventsForm') == 39 ) {
          span[s].innerHTML = "<input value='denunciar spam' name='Action.report_events' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/commevent.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_reportItems(document.eventForm') == 39 ) {
        span[s].innerHTML = "<input value='denunciar spam' name='Action.deleteEvent' type='submit' style='"+style+"'>";
      }
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'deleteEvent\'') == 39 ) {
        span[s].innerHTML = "<input value='excluir' name='Action.deleteEvent' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/universalsearch.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'\'') == 39 ) {
        span[s].innerHTML = "<input value='pesquisar' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/communitysearch.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'addRelated\'') == 39 ) {
          span[s].innerHTML = "<input value='adicionar' name='Action.addRelated' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'\'') == 39 ) {
          span[s].innerHTML = "<input value='pesquisar' type='submit' style='"+style+"'>";
          s = 0;
        }
      }
      s--;
   } while ( s > 0 );

    break;

  case "/friendadd.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'no\'') == 39 ) {
          if ( locationSearch.indexOf('accept=true') != -1 ) {
            span[s].innerHTML = "<input value='recusar' name='Action.no' type='submit' style='"+style+"'>";
          } else {
            span[s].innerHTML = "<input value='cancelar' name='Action.no' type='submit' style='"+style+"'>";
          }
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'yes\'') == 39 ) {
          if ( locationSearch.indexOf('accept=true') != -1 ) {
            span[s].innerHTML = "<input value='aceitar' name='Action.yes' type='submit' style='"+style+"'>";
          } else {
            span[s].innerHTML = "<input value='enviar' name='Action.yes' type='submit' style='"+style+"'>";
          }
          s = 0;
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/commtransfer.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'acceptTransfer\'') == 39 ) {
          span[s].innerHTML = "<input value='aceitar' name='Action.acceptTransfer' type='submit' style='"+style+"'>";
        } else
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'declineTransfer\'') == 39 ) {
          span[s].innerHTML = "<input value='recusar' name='Action.declineTransfer' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/messages.aspx":

    var k = documento.links.length-1;
    var link1 = documento.location.protocol + "//" + documento.location.host + "/Messages.aspx?msg=";
    var link;

    do {
      if ( documento.links[k].href.indexOf('javascript:viewMsg') == 0 ) {
        link = documento.links[k].href.replace(/javascript:viewMsg\('/,"");
        link = link.replace(/'\);/,"");
        link = link.replace(/[\\]+[x]/gi,"%");
        link = link1 + link + locationSearch.replace(/[?]/,"&");;
        documento.links[k].href = link;
      }
      k--;
    } while ( k > 0 );

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('document.forms[\'mf\'].uid.value=') == 39 ) {
          var dados = span[s].innerHTML.match(/\d+/gi);
          span[s].innerHTML = "<a href='/Compose.aspx?uid=" + dados[1] + "' class=\"btn\">responder</a>";
          s = 0;
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/favoritevideos.aspx":

    do {
      if ( span[s].className == 'grabtn' ) {
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'add\'') == 39 ) {
          span[s].innerHTML = "<input value='adicionar v&iacute;deo' name='Action.add' type='submit' style='"+style+"'>";
        }
        if ( span[s].innerHTML.indexOf('_copyFavorite(') == 39 ) {
          span[s].innerHTML = "<input value='adicionar aos meus v&iacute;deo' name='Action.copy' type='submit' style='"+style+"'>";
        }
        if ( span[s].innerHTML.indexOf('_submitForm(this, \'delete\'') == 39 ) {
          span[s].innerHTML = "<input value='excluir' name='Action.delete' type='submit' style='"+style+"'>";
        }
      }
      s--;
    } while ( s > 0 );

    break;

  case "/flagprofile.aspx":

    var uid = locationSearch.match(/uid=\d+/gi);
    var div = documento.getElementsByTagName('div');
    var divLen = div.length-1;

    do {
      if ( div[divLen].innerHTML.indexOf('radioFlagPornographicImage') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagProfile.aspx?" + uid + "&show=bpi\">nudez</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagSpam') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagProfile.aspx?" + uid + "&show=bs\">spam</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagHatefulContent') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagProfile.aspx?" + uid + "&show=bhc\">incita&ccedil;&atilde;o ao &oacute;dio ou conte&uacute;do violento</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagOther') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagProfile.aspx?" + uid + "&show=bo\">conte&uacute;do ilegal</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagFake') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagProfile.aspx?" + uid + "&show=bf\">conta invadida</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagImpersonation') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagProfile.aspx?" + uid + "&show=bim\">roubos de identidade</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagCopyright') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagProfile.aspx?" + uid + "&show=bc\">uso de material protegido por direitos autorais</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagIllegal') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagProfile.aspx?" + uid + "&show=bi\">invas&atilde;o de comunidade</a>";
      }
      divLen--;
    } while ( divLen > 0 );

    if ( locationSearch.indexOf('show=bpi') != -1 ) {
      documento.getElementById('commentsBoxPornographicImage').style.display = 'block';
      documento.getElementById('radioFlagPornographicImage').checked = 'true';
    } else if ( locationSearch.indexOf('show=bs') != -1 ) {
      documento.getElementById('commentsBoxSpam').style.display = 'block';
      documento.getElementById('radioFlagSpam').checked = 'true';
    } else if ( locationSearch.indexOf('show=bhc') != -1 ) {
      documento.getElementById('commentsBoxHatefulContent').style.display = 'block';
      documento.getElementById('radioFlagHatefulContent').checked = 'true';
    } else if ( locationSearch.indexOf('show=bo') != -1 ) {
      documento.getElementById('commentsBoxOther').style.display = 'block';
      documento.getElementById('radioFlagOther').checked = 'true';
    } else if ( locationSearch.indexOf('show=bf') != -1 ) {
      documento.getElementById('commentsBoxFake').style.display = 'block';
      documento.getElementById('radioFlagFake').checked = 'true';
    } else if ( locationSearch.indexOf('show=bim') != -1 ) {
      documento.getElementById('commentsBoxImpersonatingMe').style.display = 'block';
      documento.getElementById('radioFlagImpersonation').checked = 'true';
    } else if ( locationSearch.indexOf('show=bc') != -1 ) {
      documento.getElementById('commentsBoxCopyright').style.display = 'block';
      documento.getElementById('radioFlagCopyright').checked = 'true';
    } else if ( locationSearch.indexOf('show=bi') != -1 ) {
      documento.getElementById('commentsBoxIllegal').style.display = 'block';
      documento.getElementById('radioFlagIllegal').checked = 'true';
    }

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'submit\'') == 39 ) {
        span[s].innerHTML = "<input value='enviar' name='Action.submit' type='submit' style='"+style+"'>";
      }
      s--;
    } while ( s > 0 );

    break;

  case "/flagcommunity.aspx":

    var cmm = locationSearch.match(/cmm=\d+/gi);
    var div = documento.getElementsByTagName('div');
    var divLen = div.length-1;

    do {
      if ( div[divLen].innerHTML.indexOf('radioFlagPornographicImage') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagCommunity.aspx?" + cmm + "&show=bpi\">nudez</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagHatefulContent') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagCommunity.aspx?" + cmm + "&show=bhc\">incita&ccedil;&atilde;o ao &oacute;dio ou conte&uacute;do violento</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagOther') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagCommunity.aspx?" + cmm + "&show=bo\">conte&uacute;do ilegal</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagCopyright') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagCommunity.aspx?" + cmm + "&show=bc\">uso de material protegido por direitos autorais</a>";
      } else
      if ( div[divLen].innerHTML.indexOf('radioFlagIllegal') != -1 ) {
        div[divLen].getElementsByTagName('label')[0].innerHTML = "<a href=\"/FlagCommunity.aspx?" + cmm + "&show=bi\">comunidade invadida</a>";
      }
      divLen--;
    } while ( divLen > 0 );

    if ( locationSearch.indexOf('show=bpi') != -1 ) {
      documento.getElementById('commentsBoxPornographicImage').style.display = 'block';
      documento.getElementById('radioFlagPornographicImage').checked = 'true';
    } else if ( locationSearch.indexOf('show=bhc') != -1 ) {
      documento.getElementById('commentsBoxHatefulContent').style.display = 'block';
      documento.getElementById('radioFlagHatefulContent').checked = 'true';
    } else if ( locationSearch.indexOf('show=bo') != -1 ) {
      documento.getElementById('commentsBoxOther').style.display = 'block';
      documento.getElementById('radioFlagOther').checked = 'true';
    } else if ( locationSearch.indexOf('show=bc') != -1 ) {
      documento.getElementById('commentsBoxCopyright').style.display = 'block';
      documento.getElementById('radioFlagCopyright').checked = 'true';
    } else if ( locationSearch.indexOf('show=bi') != -1 ) {
      documento.getElementById('commentsBoxIllegal').style.display = 'block';
      documento.getElementById('radioFlagIllegal').checked = 'true';
    }

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'submit\'') == 39 ) {
        span[s].innerHTML = "<input value='enviar' name='Action.submit' type='submit' style='"+style+"'>";
      }
      s--;
    } while ( s > 0 );

    break;

  case "/communityunjoin.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'unjoin\'') == 39 ) {
        span[s].innerHTML = "<input value='deixar de participar' name='Action.unjoin' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/communityjoin.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'join\'') == 39 ) {
        span[s].innerHTML = "<input value='participar' name='Action.join' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/generalsettings.aspx":
  case "/notificationssettings.aspx":
  case "/privacysettings.aspx":

    documento.getElementById('saveCell').style.display = "none";
    documento.getElementById('dsaveCell').style.display = "none";
    documento.getElementById('dcancelCell').style.display = "none";
    documento.getElementById('cancelCell').style.display = "none";
    documento.getElementById('form').innerHTML += "<div class='listdivi ln'></div><div class='lf para' style='margin: 10px 0px 10px 5px;'><span class='grabtn'><input value='salvar altera&ccedil;&otilde;es' name='Action.save' type='submit' style='"+style+"'></span>"+btnboxr+"</div>";

    break;

  case "/editsummary.aspx":
  case "/editsocial.aspx":
  case "/editcontact.aspx":
  case "/editprofessional.aspx":
  case "/editemail.aspx":
  case "/editwishlists.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'update\'') == 39 ) {
        span[s].innerHTML = "<input value='atualizar' name='Action.update' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );    

    break;

  case "/marks.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'delete\'') == 39 ) {
        span[s].innerHTML = "<input value='apagar' name='Action.delete' type='submit' style='"+style+"'>";
      }
      s--;
    } while ( s > 0 );

    break;

  case "/profilet.aspx":
  case "/testimonialview.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'delete\'') == 39 ) {
        span[s].innerHTML = "<input value='remover' name='Action.delete' type='submit' style='"+style+"'>";
      }
      s--;
    } while ( s > 0 );

    break;

  case "/editfeeds.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'deleteFeature\'') == 39 ) {
        span[s].innerHTML = "<input value='apagar' name='Action.deleteFeed' type='submit' style='"+style+"'>";
      } else
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'addFeed\'') == 39 ) {
        span[s].innerHTML = "<input value='adicionar' name='Action.addFeed' type='submit' style='"+style+"'>";
      }
      s--;
    } while ( s > 0 );

    break;

  case "/myupdates.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'hideUpdate\'') == 39 ) {
        span[s].innerHTML = "<input value='ocultar atualiza&ccedil;&atilde;o' name='Action.hideUpdate' type='submit' style='"+style+"'>";
      }
      s--;
    } while ( s > 0 );

    break;

  case "/msgsteaser.aspx":

    var link = locationSearch.replace(/&cat=\d+/gi,"");

    documento.getElementById('cat0').getElementsByTagName('a')[0].href = link + "&cat=0";
    documento.getElementById('cat1').getElementsByTagName('a')[0].href = link + "&cat=1";
    documento.getElementById('cat2').getElementsByTagName('a')[0].href = link + "&cat=2";
    documento.getElementById('cat3').getElementsByTagName('a')[0].href = link + "&cat=3";
    documento.getElementById('cat4').getElementsByTagName('a')[0].href = link + "&cat=4";
    documento.getElementById('cat5').getElementsByTagName('a')[0].href = link + "&cat=5";

    if ( locationSearch.indexOf('cat=0') != -1 ) {
      documento.getElementById('data0').style.display = 'block';
    } else if ( locationSearch.indexOf('cat=1') != -1 ) {
      documento.getElementById('data1').style.display = 'block';
    } else if ( locationSearch.indexOf('cat=2') != -1 ) {
      documento.getElementById('data2').style.display = 'block';
    } else if ( locationSearch.indexOf('cat=3') != -1 ) {
      documento.getElementById('data3').style.display = 'block';
    } else if ( locationSearch.indexOf('cat=4') != -1 ) {
      documento.getElementById('data4').style.display = 'block';
    } else if ( locationSearch.indexOf('cat=5') != -1 ) {
      documento.getElementById('data5').style.display = 'block';
    }

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'submit\'') == 39 ) {
        span[s].innerHTML = "<input value='enviar' name='Action.submit' type='submit' style='"+style+"'>";
      }
      s--;
    } while ( s > 0 );

    break;

  case "/communitytransfer.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'\'') == 39 ) {
        span[s].innerHTML = "<input value='sim' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/communityowner.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'becomeModerator\'') == 39 ) {
        span[s].innerHTML = "<input value='sim' name='Action.becomeModerator' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/communitydelete.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'\'') == 39 ) {
        span[s].innerHTML = "<input value='excluir' type='submit' style='"+style+"'>";
        s = 0;
      }
      s--;
    } while ( s > 0 );

    break;

  case "/appdirectory.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'addApp\'') == 39 ) {
        span[s].innerHTML = "<form><input value='adicionar aplica&ccedil;&atilde;o' name='Action.addApp' type='submit' style='"+style+"'></form>";
      }
      s--;
    } while ( s > 0 );

    break;

  case "/myapps.aspx":

    do {
      if ( span[s].className == 'grabtn' && span[s].innerHTML.indexOf('_submitForm(this, \'removeApp\'') == 39 ) {
        span[s].innerHTML = "<form><input value='remover' name='Action.removeApp' type='submit' style='"+style+"'></form>";
      }
      s--;
    } while ( s > 0 );

    break;

  default:

    break;

}