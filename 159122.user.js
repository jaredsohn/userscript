// ==UserScript==
// @name       Script Chat Terra
// @fullname      Script Chat Terra
// @version    1.6.1.2
// @description  Adiciona novas funções ao chat Terra, como mudar cor da fonte, enviar imagem, video, musica, colocar foto no avatar, etc. ATUALIZADO DIA: 28/set/2012 19:37
// @author       Pepsi Twist (hpr_cod@msn.com)
// @homepage      http://userscripts.org/scripts/show/142721
// @namespace     http://userscripts.org/scripts/show/142721
// @downloadURL   http://userscripts.org/scripts/source/142721.user.js
// @updateURL   http://userscripts.org/scripts/source/142721.user.js
// @include      http://novochat.terra.com.br
// @include      http://novochat.terra.com.br/*
// @copyright  2012, Pepsi Twist (hpr_cod@msn.com)
// ==/UserScript==

//CARREGA JSCOLOR
var jscolor = document.createElement('script');
jscolor.src = 'http://dl.dropbox.com/u/102225056/PepsiTwist/jscolor/jscolor.js';
jscolor.language='javascript';
jscolor.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jscolor);
        
//CARREGA MODS
var mods = document.createElement('script');
mods.src = 'http://dl.dropbox.com/u/102225056/PepsiTwist/mods/mods.js';
mods.language='javascript';
mods.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(mods);

window.onload = function()
{
    var divCredit = document.createElement('div');
    with(divCredit)
    {
        divCredit.setAttribute('id','credito')
        divCredit.setAttribute('name','credito')
        divCredit.setAttribute('style','background: #D5E9FF; color: #000; width: 180px; text-align: center;font-weight: bold;position: fixed;z-index: 2002;padding: 5px 0px 0px 5px;bottom: 0px;right: 24px;height: 490px;');
    }
    document.getElementsByTagName('body')[0].appendChild(divCredit);

    //TEXTO ID DA SALA
    var textId = document.createTextNode("ID DA SALA");
    divCredit.appendChild(textId);
    
    //INICIO CAIXA DA ID DA SALA
    var inpId = document.createElement('input');
    with(inpId)
    {
        inpId.setAttribute('type','text');
        inpId.setAttribute('name','idsala1');
        inpId.setAttribute('id','idsala');
        inpId.readonly=true;
        inpId.disabled=true;
    }
    divCredit.appendChild(inpId);    
    
    //FIM CAIXA DA ID DA SALA

    //INICIO BOTAO PEGAR ID
    function pegarId()
    {
          if (document.getElementsByName("formMessages")[0] == undefined)
          {
              alert('Você precisa entrar em uma sala');
          }
          else
          {
              if(document.getElementsByName("formMessages")[0].id == "formMessages_${roomId}")
              {
                  alert('Entre primeiro em uma sala');
              }
              else
              {
                  var frmMsgId = document.getElementsByName("formMessages")[0].id;
                  var salaId = frmMsgId.split('_');
                  document.getElementById('idsala').value=salaId[1];
                  var inpMsg = document.getElementById("inpMessage_"+document.getElementById("idsala").value);
                  inpMsg.maxLength="999999";
              }
            
          }
    }    
    var btnPegaId = document.createElement('input');
    with(btnPegaId) 
    {
        btnPegaId.setAttribute('type','button');
        btnPegaId.setAttribute('name','pegaid1');
        btnPegaId.setAttribute('value','CAPTURAR ID');
        btnPegaId.setAttribute('style','background:#FF3300;width:151px;');
        btnPegaId.setAttribute('onmouseover', 'this.style.backgroundColor = "#FF7A00"');
        btnPegaId.setAttribute('onmouseout', 'this.style.backgroundColor = "#FF3300"');
        btnPegaId.setAttribute('onmousedown', 'this.style.backgroundColor = "#EB8038"');
        btnPegaId.setAttribute('onmouseup', 'this.style.backgroundColor = "#FF7A00"');
    }
    divCredit.appendChild(btnPegaId);
    btnPegaId.onclick = pegarId;
    //FIM BOTAO PEGAR ID    
    
     //TEXTO FORMATAÇÃO
    var textFormat = document.createTextNode("FORMATAÇÃO");
    divCredit.appendChild(textFormat);
    
    //INICIO CAIXA DE URL AVATAR
        function alteraAvtr()
    {
        if (event.keyCode == 13) 
        {
            Fonte();
        }
    }
    var inpAvatar = document.createElement('input');
    with(inpAvatar)
    {
        inpAvatar.setAttribute('type','text');
        inpAvatar.setAttribute('name','avatar1');
        inpAvatar.setAttribute('id','avatar');
        inpAvatar.setAttribute('value','url do avatar aqui');
        inpAvatar.setAttribute('onclick','if (this.value=="url do avatar aqui") {this.value="";} this.select();');
        inpAvatar.setAttribute('onblur','if (this.value=="") {this.value="url do avatar aqui";}');
    }
    divCredit.appendChild(inpAvatar);
    inpAvatar.onkeypress=alteraAvtr;
    //FIM CAIXA DE URL AVATAR

 
    //INICIO CAIXA DE CORES
    var inpCor = document.createElement('input');
    with(inpCor)
    {
        inpCor.setAttribute('type','text');
        inpCor.setAttribute('name','cores2');
        inpCor.setAttribute('id','cores1');
        inpCor.setAttribute('value','0066FF');
        inpCor.setAttribute('class','color');
    }
    divCredit.appendChild(inpCor);
    //FIM CAIXA DE CORES
    
    //DIV LABEL NEGRITO, ITALICO E SOMBRA
    var divNIS = document.createElement('div');
    with(divNIS)
    {
        divNIS.setAttribute('id','divNIS1');
        divNIS.setAttribute('name','divNIS2');
    }
    divCredit.appendChild(divNIS);

 
    //INICIO CHECKBOX NEGRITO
    var negrito="font-weight:lighter;";
    function validaNegrito()
    {
        if (document.getElementById('negrito1').checked==true)
        {
            negrito = "font-weight:bold;";
        }
        else
        {
            negrito = "font-weight:lighter;";
        }
    }
    var chkNegrito = document.createElement('input');
    with(chkNegrito)
    {
        chkNegrito.setAttribute('type','checkbox');
        chkNegrito.setAttribute('id','negrito1');
    }
    divNIS.appendChild(chkNegrito);
    chkNegrito.onclick = validaNegrito;
    
    //TEXTO NEGRITO
    var textNegrito = document.createTextNode("Negrito");
    divNIS.appendChild(textNegrito);

    //INICIO CHECKBOX ITALICO
    var italico="";
    function validaItalico()
    {
        if (document.getElementById('italico1').checked==true)
        {
            italico = "font-style:italic;";
        }
        else
        {
            italico = "";
        }
    }
    var chkItalico = document.createElement('input');
    with(chkItalico)
    {
        chkItalico.setAttribute('type','checkbox');
        chkItalico.setAttribute('id','italico1');
    }
    divNIS.appendChild(chkItalico);
    chkItalico.onclick = validaItalico;

    //TEXTO ITALICO
    var textItalico = document.createTextNode("Italico");
    divNIS.appendChild(textItalico);
 
    //INICIO CHECKBOX SOMBRA
    var sombra="";
    function validaSombra()
    {
        if (document.getElementById('sombra1').checked==true)
        {
            sombra = "text-shadow:0px 0px 10px black;";
        }
        else
        {
            sombra = "";
        }
    }
    var chkSombra = document.createElement('input');
    with(chkSombra)
    {
        chkSombra.setAttribute('type','checkbox');
        chkSombra.setAttribute('id','sombra1');
    }
    divNIS.appendChild(chkSombra);
    chkSombra.onclick = validaSombra;

    //TEXTO SOMBRA
    var textSombra = document.createTextNode("Sombra");
    divNIS.appendChild(textSombra);

    //INICIO IMAGEM LEGENDA EMOTICONS
    var imgTabEmo = new Image();
    imgTabEmo.src='http://img440.imageshack.us/img440/585/tabemoticon.gif';
    divNIS.appendChild(imgTabEmo);

    //INICIO CHECKBOX EMOTICONS
    function validaEmoticon()
    {
        if (document.getElementById('idsala').value=='')
        {
            alert("Clique primeiro no Botao Capturar ID");
            document.getElementById('emoticon1').checked=false;
        }
        else
        {
            var frmMsgId8 = document.getElementsByName("formMessages")[0].id;
            var salaId8 = frmMsgId8.split('_');
            if (document.getElementById('idsala').value != salaId8[1])
            {
                alert("ID Invalida! Clique em Capturar ID");
                document.getElementById('emoticon1').checked=false;
            }
            else
            {        
                if (document.getElementById('emoticon1').checked==true)
                {
                    document.getElementById("inpMessage_"+document.getElementById("idsala").value).setAttribute('onkeypress','emoticonOn()');
                }
                else
                {
                    document.getElementById("inpMessage_"+document.getElementById("idsala").value).setAttribute('onkeypress','emoticonOff()');
                }
            }
        }
    }
    var chkEmoticon = document.createElement('input');
    with(chkEmoticon)
    {
        chkEmoticon.setAttribute('type','checkbox');
        chkEmoticon.setAttribute('id','emoticon1');
    }
    divNIS.appendChild(chkEmoticon);
    chkEmoticon.onclick = validaEmoticon;

    //TEXTO ATIVAR EMOTICONS
    var textEmoticon = document.createTextNode("ativar uso de emoticons");
    divNIS.appendChild(textEmoticon);    
    
    //INICIO BOTAO FONTE
    function Fonte()
    {
        if (document.getElementById('idsala').value=='')
        {
            alert("Clique primeiro no Botao Capturar ID");
        }
        else
        {
            var frmMsgId2 = document.getElementsByName("formMessages")[0].id;
            var salaId2 = frmMsgId2.split('_');
            if (document.getElementById('idsala').value != salaId2[1])
            {
                alert("ID Invalida! Clique em Capturar ID");
            }
            else
            {
                // variaveis da opcao de fonte
                var fntArial = "Arial;";
                var fntSize = "font-size: 12px;";
                var fntPos = "background-size: 50px 50px; background-repeat:no-repeat; padding: 30px 25px 10px 92px; margin:0px 0px 0px -90px;";
                var imgAvatar = document.getElementById('avatar').value;
                var fntColor = document.getElementById('cores1').value;
                var fntType = document.getElementById("fontType_"+document.getElementById("idsala").value).options[0]
            
                //instrucao pra alterar type fonte e bgColor da caixa de cores
                fntType.value = fntArial+negrito+italico+sombra+"color:"+"#"+fntColor+"; "+fntSize+fntPos+"background-image: url('"+document.getElementById("avatar").value+"');";
                fntType.text = "Personalizado";
                document.getElementById("fontTextButton_"+document.getElementById("idsala").value).setAttribute('class','btn-save-my-room');
                var menuSalvar = "javascript:TrrChat.ChatInterface.method.showDialog('"+document.getElementById("idsala").value+"','textFormat')";
                window.location.href=menuSalvar;
                document.getElementById("fontTextButton_"+document.getElementById("idsala").value).click();
            }
        }
    }
    var btnFnt = document.createElement('input');
    with(btnFnt) 
    {
        btnFnt.setAttribute('type','button');
        btnFnt.setAttribute('name','personalizartexto');
        btnFnt.setAttribute('value','aplicar na mensagem');
        btnFnt.setAttribute('style','background:#FF3300;width:151px;')
        btnFnt.setAttribute('onmouseover', 'this.style.backgroundColor = "#FF7A00"')
        btnFnt.setAttribute('onmouseout', 'this.style.backgroundColor = "#FF3300"')
        btnFnt.setAttribute('onmousedown', 'this.style.backgroundColor = "#EB8038"')
        btnFnt.setAttribute('onmouseup', 'this.style.backgroundColor = "#FF7A00"')
    }
    divCredit.appendChild(btnFnt);
    btnFnt.onclick = Fonte;
    //FIM BOTAO FONTE
    

    //INICIO BOTAO MUDAR COR DO NICK
    function nickEstiloAplicarA()
    {
            var nickColor = document.getElementById('cores1').value;
            document.getElementById("r1_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r2_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r3_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r4_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r5_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r6_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r7_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r8_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r9_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r10_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r11_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r12_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r13_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r14_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r15_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r16_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r17_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r18_${roomId}").value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
    }
    
    function nickEstiloAplicarB()
    {
            var nickColor = document.getElementById('cores1').value;
            var getIdSala = document.getElementsByName("inpCaptchaKey")[1].id;
            var IdSala = getIdSala.split('_');
            document.getElementById("r1_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r2_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r3_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r4_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r5_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r6_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r7_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r8_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r9_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r10_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r11_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r12_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r13_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r14_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r15_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r16_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r17_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
            document.getElementById("r18_"+IdSala[1]).value="\"style=\"color:#"+nickColor+";"+negrito+italico+sombra;
    }
    
    function nickEstilo()
    {
        if (document.getElementsByName("inpCaptchaKey")[1] == undefined)
        {
            nickEstiloAplicarA();
            alert('Seu nick foi personalizado');
        }
        else
        {
            nickEstiloAplicarA();
            nickEstiloAplicarB();
            alert('Seu nick foi personalizado');
        }
    }
    
    var btnNickEstilo = document.createElement('input');
    with(btnNickEstilo)
    {
        btnNickEstilo.setAttribute('type','button');
        btnNickEstilo.setAttribute('name','nickestilo');
        btnNickEstilo.setAttribute('value','aplicar no nick');
        btnNickEstilo.setAttribute('style','background:#FF3300;width:151px;');
        btnNickEstilo.setAttribute('onmouseover', 'this.style.backgroundColor = "#FF7A00"');
        btnNickEstilo.setAttribute('onmouseout', 'this.style.backgroundColor = "#FF3300"');
        btnNickEstilo.setAttribute('onmousedown', 'this.style.backgroundColor = "#EB8038"');
        btnNickEstilo.setAttribute('onmouseup', 'this.style.backgroundColor = "#FF7A00"');
    }
    divCredit.appendChild(btnNickEstilo);
    btnNickEstilo.onclick = nickEstilo;
    //FIM BOTAO MUDAR COR DO NICK   
    

    //TEXTO ENVIAR MIDIA
    var textMidia = document.createTextNode("ENVIAR PARA O CHAT");
    divCredit.appendChild(textMidia);
    
    //INICIO CAIXA PARA PEGAR LINK DE MUSICA
    function musica()
    {
        if (document.getElementById('idsala').value=='')
        {
            alert("Clique primeiro no Botao Capturar ID");
        }
        else
        {
            var frmMsgId3 = document.getElementsByName("formMessages")[0].id;
            var salaId3 = frmMsgId3.split('_');
            if (document.getElementById('idsala').value != salaId3[1])
            {
                alert("ID Invalida! Clique em Capturar ID");
            }
            else
            {
                if (event.keyCode == 13)
                {
                    var inpMsg2 = document.getElementById("inpMessage_"+document.getElementById("idsala").value);
                    inpMsg2.value="/,, /Hp <iframe src=\'" +this.value+ "\'"+" width=0px height=0px></iframe>";
                    var enviar = document.getElementById("btSendMessage_"+document.getElementById("idsala").value).getAttribute("href");
                    window.location.href=enviar;
                    document.getElementById('musica1').value="";
                }
            }
        }
    }
    var inpMusica = document.createElement('input');
    with(inpMusica)
    {
        inpMusica.setAttribute('type','text');
        inpMusica.setAttribute('name','musica2');
        inpMusica.setAttribute('value','url musica aqui');
        inpMusica.setAttribute('id','musica1');
        inpMusica.setAttribute('onfocus','this.value=""');
        inpMusica.setAttribute('onblur','this.value="url music aqui"');
    }
    divCredit.appendChild(inpMusica);
    inpMusica.onkeypress = musica;
    //FIM CAIXA PARA PEGAR LINK DE MUSICA
    

    //INICIO CAIXA PARA PEGAR LINK DE IMAGEM
    function imagem()
    {
        if (document.getElementById('idsala').value=='')
        {
            alert("Clique primeiro no Botao Capturar ID");
        }
        else
        {
            var frmMsgId4 = document.getElementsByName("formMessages")[0].id;
            var salaId4 = frmMsgId4.split('_');
            if (document.getElementById('idsala').value != salaId4[1])
            {
                alert("ID Invalida! Clique em Capturar ID");
            }
            else
            {        
                if (event.keyCode == 13) 
                {
                    var inpMsg3 = document.getElementById("inpMessage_"+document.getElementById("idsala").value);
                    inpMsg3.value="/,, /Hp <img src=\'" +this.value+ "\'"+" style='float:none; max-width:600px; max-height:400px'>";
                    var enviar2 = document.getElementById("btSendMessage_"+document.getElementById("idsala").value).getAttribute("href");
                    window.location.href=enviar2;
                    document.getElementById('img1').value="";
                }
            }
        }
    }
    var inpImg = document.createElement('input');
    with(inpImg)
    {
        inpImg.setAttribute('type','text');
        inpImg.setAttribute('name','img2');
        inpImg.setAttribute('value','url imagem aqui');
        inpImg.setAttribute('id','img1');
        inpImg.setAttribute('onfocus','this.value=""');
        inpImg.setAttribute('onblur','this.value="url img aqui"');
    }
    divCredit.appendChild(inpImg);
    inpImg.onkeypress = imagem;
    //FIM CAIXA PARA PEGAR LINK DE IMAGEM
        

    //INICIO CAIXA PARA PEGAR LINK DE VIDEO
    function video()
    {
         if (document.getElementById('idsala').value=='')
        {
            alert("Clique primeiro no Botao Capturar ID");
        }
        else
        {
            var frmMsgId5 = document.getElementsByName("formMessages")[0].id;
            var salaId5 = frmMsgId5.split('_');
            if (document.getElementById('idsala').value != salaId5[1])
            {
                alert("ID Invalida! Clique em Capturar ID");
            }
            else
            {
                if (event.keyCode == 13) 
                {
                    var inpMsg4 = document.getElementById("inpMessage_"+document.getElementById("idsala").value);
                    inpMsg4.value="/,, /Hp <iframe src=\'" +this.value+ "\'"+" width=\'400\' height=\'300\' frameborder=\'0\' allowfullscreen></iframe>";
                    var enviar3 = document.getElementById("btSendMessage_"+document.getElementById("idsala").value).getAttribute("href");
                    window.location.href=enviar3;
                    document.getElementById('video1').value="";
                }
            }
        }
    }
    var inpVideo = document.createElement('input');
    with(inpVideo)
    {
        inpVideo.setAttribute('type','text');
        inpVideo.setAttribute('name','video2');
        inpVideo.setAttribute('value','url video aqui');
        inpVideo.setAttribute('id','video1');
        inpVideo.setAttribute('onfocus','this.value=""');
        inpVideo.setAttribute('onblur','this.value="url video aqui"');
    }
    divCredit.appendChild(inpVideo);
    inpVideo.onkeypress = video;
    //FIM CAIXA PARA PEGAR LINK DE VIDEO
        
    //TEXTO OUTROS RECURSOS
    var textOutros = document.createTextNode("OUTROS RECURSOS");
    divCredit.appendChild(textOutros);
        
    //INICIO BOTAO LIMPAR HISTORICO MSGS
    function ClearHistory()
    {
        if (document.getElementById('idsala').value=='')
        {
            alert("Clique primeiro no Botao Capturar ID");
        }
        else
        {
            var frmMsgId6 = document.getElementsByName("formMessages")[0].id;
            var salaId6 = frmMsgId6.split('_');
            if (document.getElementById('idsala').value != salaId6[1])
            {
                alert("ID Invalida! Clique em Capturar ID");
            }
            else
            {
                var Clear = "javascript:TrrChat.ChatInterface.method.clearRoomHistory('"+document.getElementById("idsala").value+"');";
                window.location.href = Clear;
            }
        }
    }
    var btnClearHistory = document.createElement('input');
    with(btnClearHistory) 
    {
        btnClearHistory.setAttribute('type','button');
        btnClearHistory.setAttribute('name','limpamsgs');
        btnClearHistory.setAttribute('value','limpar mensagens');
        btnClearHistory.setAttribute('style','background:#FF3300;width:151px;');
        btnClearHistory.setAttribute('onmouseover', 'this.style.backgroundColor = "#FF7A00"');
        btnClearHistory.setAttribute('onmouseout', 'this.style.backgroundColor = "#FF3300"');
        btnClearHistory.setAttribute('onmousedown', 'this.style.backgroundColor = "#EB8038"');
        btnClearHistory.setAttribute('onmouseup', 'this.style.backgroundColor = "#FF7A00"');
    }
    divCredit.appendChild(btnClearHistory);
    btnClearHistory.onclick = ClearHistory;
    //FIM BOTAO LIMPAR HISTORICO MSGS
    
    //INICIO BOTAO REMOVER AVATAR TERRA
    function RemoveAvtrTerra()
    {
        if (document.getElementById('idsala').value=='')
        {
            alert("Clique primeiro no Botao Capturar ID");
        }
        else
        {
            var frmMsgId7 = document.getElementsByName("formMessages")[0].id;
            var salaId7 = frmMsgId7.split('_');
            if (document.getElementById('idsala').value != salaId7[1])
            {
                alert("ID Invalida! Clique em Capturar ID");
            }
            else
            {
                var rmvAvtrTerra = "javascript:TrrChat.ChatInterface.method.changeMyIcon(\'"+document.getElementById("idsala").value+"\',\'icon-none\');";
                window.location.href = rmvAvtrTerra;
            }
        }
    }
    var btnRmvAvtrTerra = document.createElement('input');
    with(btnRmvAvtrTerra) 
    {
        btnRmvAvtrTerra.setAttribute('type','button');
        btnRmvAvtrTerra.setAttribute('name','RmvAvtrTerra1');
        btnRmvAvtrTerra.setAttribute('value','remover avatar do Terra');
        btnRmvAvtrTerra.setAttribute('style','background:#FF3300;width:151px;');
        btnRmvAvtrTerra.setAttribute('onmouseover', 'this.style.backgroundColor = "#FF7A00"');
        btnRmvAvtrTerra.setAttribute('onmouseout', 'this.style.backgroundColor = "#FF3300"');
        btnRmvAvtrTerra.setAttribute('onmousedown', 'this.style.backgroundColor = "#EB8038"');
        btnRmvAvtrTerra.setAttribute('onmouseup', 'this.style.backgroundColor = "#FF7A00"');
    }
    divCredit.appendChild(btnRmvAvtrTerra);
    btnRmvAvtrTerra.onclick = RemoveAvtrTerra;
    //FIM BOTAO REMOVER AVATAR TERRA