// ==UserScript==
// @name           Melhoria WP
// @author         Rodrigo Pan
// @namespace      Melhoria WP
// @description    Melhoria WP
// @version        1.3.4
var $versao     = '1.3.4';
// @include        http://app3*:8081/wpp/servlet/hwpp112
// @include        http://app3*:8081/wpp/servlet/hnuc011*
// @include        http://app3*:8081/wpp/servlet/tsol080*
// @include        http://app3*:8081/wpp/servlet/hwpp111
// @include        http://app3*:8081/wpp/servlet/hwpp210*
// @include        http://app3*:8081/wpp/home/
// @require        http://app3.focco.com.br:8081/wpp/sflselect.js
// ==/UserScript==

/*******************************************************************
*****************             Histórico            *****************
********************************************************************
* Versão         Data             Alterações
* 1.0.0          12/04/2013       Versão inicial
*                                 *****Remover o frame de bugs
*                                 Abrir o frame de projetos sobre o Frama de bugs
*                                 ***Remover a coluna de Status do grid de projetos
*                               
* 1.0.1          14/04/2013       ***Ao colocar uma solicitação em aprovação colocar um histórico padrão
*                                 ***Ao colocar uma solicitação em aprovação mudar o responsável para Leandro Schio
*                               
* 1.0.2          15/04/2013       Ao colocar uma solicitação de script em aprovação colocar um histórico padrão
*                                 Se o tempo não estiver informado, considera RAT, do contrário coloca uma observação padrão.
*                               
* 1.0.3          16/04/2013       Caso não tenha informado horas numa solicitação que está indfo para aprovação, dá erro informando.
*                               
* 1.0.4          16/04/2013       Ajuste nos Includes para considerar tanto o endereço interno quanto o externo.
*
* 1.0.5          29/05/2013       Ao colocar uma solicitação de script em aprovação no modelo RAT, só é informado o campo "Horas Desenvolvimento"
*                                 *Incluído o campo para filtro de projetos no grid de tarefas
*
* 1.0.6          31/05/2013       Ao colocar uma solicitação em aprovação, concatena o texto padrão com o já digitado
*
* 1.0.7          06/06/2013       Ao abrir a tela de geração de tarefas já seta por default o processo e o tipo de tarefa para Desenvolvimento.
*                                 *****Incluídos as funcionalidades dos filtros de projeto nome da tarefa, na tela de tarefas
*                                 Ao setar os filtros de seleção da tela de tarefas, estes ficarão gravados
* 1.0.8          25/07/2013       *****Incluídos as funcionalidades dos filtros de projeto e descrição do projeto, na tela de projetos
*                                 Ao setar os filtros de seleção da tela de projetos, estes ficarão gravados
*                                 *****Removida a Coluna custos da Tela de Projetos
* 1.0.9          07/10/2013       *****Adiconada lupa ao lado do número do projeto. ao clicar nesta lupa, filtra as tarefas daquele projeto.
*                                 *****Filtro nas tarefas para listar todas as tarefas que ainda tem tempo a lançar.
*--------------------------------------
* 1.1.0          14/11/2013       *****Filtro de projetos que NÃO devem ser listados
*--------------------------------------
* 1.2.0          14/11/2013       *****Implementação de atualização automática.
*--------------------------------------
* 1.3.0          14/11/2013       *****Implementação de atualização automática. Parte 2
*
* 1.3.1          20/02/2014       *Ajuste de Versionamento On-Line
*
* 1.3.2          12/03/2014       Eliminar a Pagina inicial de Navegador Inválido
*
* 1.3.3          18/03/2014       Alterar qualquer solicitação quando colocada em aprovação para o nome do Schio
*
* 1.3.4          14/05/2014       **Ao trocar status da solicitação, quando o e-mail estiver vazio, setar um "."(Ponto)
*                                 **No grid de Projetos, pintar data de projetos conforme datas de entrega do mesmo.
*                                 **Somente alterar a descrição quando colocar uma solicitação em aprovação se o texto estiver vazio.
*******************************************************************/


/**********************************************************************
                              SUGESTOES
-----------------------------------------------------------------------
** enviar e-mail ao colocar em aprovação:  window.location.href = "mailto:teste@teste.com?body="+mensagem+"&subject="+assunto;
** Na tela de tarefas
   ** fazer um somatório dos tempos totais e tempos apontados
   ** remover as colunas %, fechar, e iniciar apontamento
   ** filtrar somente tarefas com tempo em aberto
**colocar o “macaquinho” na página "Minhas Solicitações".

**Se possível ordenar o grid dos projetos primeiramente por projetos que tem data prometida, depois pela data prometida, a fim de ordená-los conforme a ordem provável de desenvolvimento dos mesmos.
**Alterar Grids da tela principal para poder mover as mesmas e dimensionar o tamanho das telas de solicitação, projeto e tarefas.
**Criar Ordenação no grid de projetos por data de Entrega
**Alterar para quando botar a extenção de um novo programa já popular as informações, na criação de objetos.
**Ao colocar solicitações de visita já coloca o histórico na solicitação.
**********************************************************************/

var v_img_gif = 'data:image/gif;base64,';
var v_img_png = 'data:image/png;base64,';

var v_images = {
   "Fechar": v_img_png + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABMZJREFUSEu1lXtQlFUYxg+jIIXoBMw04vpH2i6sOoIkDgTeYBAFC2uhsBKScNcJqqGRSwiKEitXEa8tStSMOYOQkaloIFPCtGDo4AUQBANUZIGNm6i7sDy956yidvurvtlnzvu9531+z5z9vtm12BXoBVuryczG0oqNjBrFOtVqErOxsmTTabW1tmTiAn1gIQpYgJnGLdj4OJjRNMYM4+PswZiJ3Tea2LBxlN0zjhFjsljvEZPFrvTG6OgoxsbGJlZe/1cK91sBlrTKG0MXtejS5EB/rBD9pCHSSMmXeFBSCMO3hTCSRo//SY/6Bpq5T7pH80PFZr++qFDw+s+dQrjPUrDtq5dMhPTQRl9+NgZIw4ezcZ/0sCDnH2UoyBl5SDMjpCES93E/5zwOCVvuBZYW8OQkui+y0KfJQr8mE8P5mdBsjkXw26oJaWJjYSzIQn5s3LN9mhuiee7rI4buYNZEyPqlHmBqChmsqcKt3FTc3Z2KnrxU6PfswODeHVC8pYTJZMI4PWEuHqiJifnb/gB5uI/7u4hzO/dz6E8fx3uei8AyVnuhv/oc2tPicUsdjy5Sz854/J4ejwPR0QLMXwIexld+z18Ufs8VErpJzPXRvI58Xeo4dBKrXZ2A3tKjeNfdFSzd3wN9FafQHKdEW7wKHQlK3PlMCV2iEoPJKhxQKQXYYDDAaDROrLzmAfuVGzGQpEQ3zd8mXzv5OaclToW73xxGqIucvi5fd9w9WYL6SAXqw9eg4f1ANJNuRgSiN0qBvqhg7AsPE0Hd3d3Q6XRCPGAv9Xs/5DMKtG0w+66FB6I+bA0uE689PxfBzrPBUjzlaNifjWNSO5QtdEQF6bzbDNS+MgPXFkxDIylz5QrxHJ4O4aEZ1G+gfS4tzXMf9592dUSx9AVoYyLhN20KhXg442peOo5IrPHd7Odxcs5zKH/ZGuel1rgsnYRMX28R0N7eic7OJ+ro6KTTKZHh4y3mfqL5H+dYC/9x4hydNQXV0WHwtZn06CQHslAkm4bv59qibJ4tKufboHqBDTJWLRMBLS2taG01KyRUiRs3zDVfRRDNVdH8OfJxfylxiomn/TQCftOtwLZ5yXH90C6ULnRA2WIHVHja47yXPWqW2omAhsYmNDWZxQMyg3wEuPFRv5H6/F67xE74KjzsBeeEmwPqElXwd7Cmn5VX5Wg9sgdnfGahcpUE1YES1AZJcOnNmcgKXSkAj8Xvm99xRPa6v/YvvjETta9JUBUgQaW/BOX+L6F+ZwxenzkVbIv3XHSUHESVwhk165xQF+aEyx/I0LBJhuaPZGiLkf6rWj+R4nqUDFdVMtRHyFC33gla4mg3LMbFfdsQNv9FOsmyebhzQoNfI91Qt9ENlzYtRFOCC1qSXNCR7YLf0l1wM80FrSnmHt9riHXF1RjXZ+orH7uiPnoRrmz2FRzO4yGcz75WeGPk9FfoLdqKntIU9P6QAv2pbeg/m4z+ymQMVpFqkzB8KRFDF5Iw+EsyBn6mvXLqP1Xrz2yF/qxa+AWHeJzL+Wx3gDuKQ5fg0Fp3JCyXYouPFNtXO0GtkCMjRI70YLmo1WvlSAtyRuoaZ7G/1V/2TJ3kJ0Wir1mcw3mcy/nmf73/4bqQlzr1MfYPNcKdTI8iX3wAAAAASUVORK5CYII=',
   "Config": v_img_gif + 'R0lGODlhEAAQAOZ/AP/x5P7z6v7t3/SdBv/8+fq3hv/lzv/69P/cvP/17PiYUffYS/VuCfpzBfhuAfV5HfVqAffZhf/Fkfq8jvmqcf/7+f7p2PZ/KfV2Gf+3d/K/NvVqBPeuKP738fu+j//+/fZyEP/38f/Djv+cRfngqP/38PVzE/nplfbcb/+zb/isMf/Hlv+9hPXaZvTCSPTRYfnWZfeCKvXHWf+4efq6jPffefp+HP+gS/WcEfXTav/o0/jhiPbcaf+MJ/7IkvrbofVxEP/GkvXUJP/Qpv/TrPyrVfLMJf+uZvfQPPfhZvmwevz03P7v5P7m1P/Ytf7ox/PCQvadIvzJovLLQvjNTvnaafjWUvveqvjaU/G4Hf/XtO/DHP1+EPixNf2gUfu5XP+oW//jyv/kyvzln/2xcfZxEPdvBv+SMvqdMPSYFPafF/u9jPjUX/XMLf53Af+8f/qHKvnnifvqw/SeCv7q3P+JIP/u3/+fS/nWbPnfo/vuzP7uz//Il//LnP/o1P///yH5BAEAAH8ALAAAAAAQABAAAAfYgH+CgwRBd3aDiX8fJYs6TiIsBH8Jk4IJWnxhRAgAe24jK2deAoIARwB9Fno5UzVPEmNmTYNDGSdQUSBlaRpJHBSJGWIaGxMBARMbWW0xlwYpcg4TiR4OLQ5rATdvBi8gHYkhXBFVag82aFRbQOGDB3URC3MmAVIMRhAeiQg9KBAFLAiCg8dFAxEhDhiQ8IPNhURkvsSRUQTMDB9XlqhQMshPgwUckPDIQ2IHjC5CMAj8I0DBAwoXIGCxguMCBQYKSgkiwORPhQIDBtCo8IeOJUUsMTxwlygQADs=',
}


/**************************************************
            A R E A   D E   T E S T E S
**************************************************/
//GM_registerMenuCommand("Hello, world (simple)", xxx);
//GM_registerMenuCommand("Hello, world!", xxx, "h");
//GM_registerMenuCommand("Hello, world! (again)", xxx, "e", "shift alt", "w");
//GM_setClipboard('rodriformiga');

function xxx(){
   alert('exec');
}
function aa(){
   alert('exec');
   var win_app = new ActiveXObject (WScript.Shell);
   win_app.run (notepad.exe, 1, True);
   alert('fim exec');
}

function markarow(color, tableName, oldRowCtrl, row)
{
//color = '#b5d4f9';
var oldRow;
if( row != lastSelRow || tableName != lastSelTable)
{
initcolor( tableName, row);
paintrow(tableName, row, color);
oldRow = parseInt(document.getElementsByName(oldRowCtrl).item(0).value, 10);
document.getElementsByName(oldRowCtrl).item(0).value = row;
if (oldRow > 0 && oldRow < document.getElementById(tableName).rows.length)
paintrow(tableName, oldRow, origcolor( lastSelRow));
lastSelRow = row;
lastSelTable = tableName;
}
} 

/**************************************************
        F I M   A R E A   D E   T E S T E S
**************************************************/


v_css = " .MsgPageOff{ visibility:hidden; display:none; position:absolute; top:-100px; left:-100px;}"
      + " .MsgPageOn_1{ position:absolute; top:0px; left:0px; visibility:visible; width:150%; height:150%; background-color:#000; z-index:1998; opacity:0.75; }"
      + " .MsgPageOn_2{ position: absolute; left:73.5%; top:0.2%; visibility:visible; opacity:1; z-index:2000; }"
      + " .MsgPageOn_3{ position: absolute; left:25%; top:2.8%; width:50%; visibility:visible; opacity:1; z-index:1999; }"
      + " table.GMTab1{ width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px; }"
      + " tr.GMLin1{ background-color:#ECECEC; text-align:center; border:1px solid silver; }"
      + " td.GMCel1{ border:1px solid silver; background-color:#ECECEC; padding:2px; }";

GM_addStyle(v_css);

v_div = document.createElement("div");
v_div.innerHTML = '<div id="GMS_rebel_div_1" class="MsgPageOff" style="text-align:right;height=100%"></div>'
                + '<div id="GMS_rebel_div_2" class="MsgPageOff" style="text-align:right;"></div>'
                + '<div id="GMS_rebel_div_3" class="MsgPageOff"></div>';
document.body.insertBefore(v_div, document.body.firstChild);

v_div = get('GMS_rebel_div_3');

v_tab  = newTab(    [['class', 'GMTab1'], ["id", "GMTab_config"]]);
v_lin  = newLin("", [["class", "GMLin1"]]);
v_cel1 = newCel('', [['class', 'GMCel1'], ["width", "30%"]]);
v_cel2 = newCel('', [['class', 'GMCel1'], ["width", "60%"]]);
v_cel3 = newCel("", [['class', 'GMCel1'], ["width", "10%"]]);
v_img  = newImg(    [['src', v_images["Fechar"]], ['style', 'cursor:pointer;'], ['title', 'Fechar']]);
v_img.addEventListener("click", function(){mostra_tab_conf(false)}, true);

v_cel3.appendChild(v_img);
v_lin.appendChild(v_cel1);
v_lin.appendChild(v_cel2);
v_lin.appendChild(v_cel3);
v_tab.appendChild(v_lin);
v_div.appendChild(v_tab);


var v_img = newImg(              [['src', v_images["Config"]], ['style', 'cursor:pointer;'], ['title', 'Configurar']]);
v_img.addEventListener("click", function(){mostra_tab_conf(true)}, true);

//document.body.insertBefore(v_img, document.body.firstChild);

function setsAprovacao() {
   //Se o tipode de status for alterado para "Em Aprovação"
   if (get('SOL_TSS_ID').value == 620 || get('SOL_TSS_ID').value == 635){
      if (get('span_SOL_TSS_TSN_TIS_DESCRICAO').innerHTML == 'Solicitação de Script'){
         //Verifica se tem horas informadas
         if (get('_SOL_ESFORCOTELA').value == ''){
            if (get('_SOH_DESCRICAOTELA').value == '') //so adicona informação se não tiver nada no campo
                                                               get('_SOH_DESCRICAOTELA').value += 'Este trabalho será feito e cobrado via RAT com tempo previsto de 02:00 a 04:00 horas.\nAo iniciarmos os trabalhos, estaremos avisando ao cliente para darmos início e estaremos começando a desenvolver o script para atender a essa demanda. Ao finalizar, será retornado ao cliente aonde o mesmo irá testar, tendo o OK, a RAT será encerrada, dando por fim o trabalho.\nAguardamos aprovação.';
            //get('_SOL_ESFORCOTELA').value = '04:00';
            get('_SOL_HORAS_DESENVOLVIMENTOTELA').value = '04:00';
         }else
            get('_SOH_DESCRICAOTELA').value += 'Aguardamos sua aprovação para execução deste script.';
      }else{
         //Seta o histórico da alteração
         if (get('_SOH_DESCRICAOTELA').value == '') //so adicona informação se não tiver nada no campo
                                               get('_SOH_DESCRICAOTELA').value += 'Segue em anexo o documento de orçamento.\nAguardamos sua aprovação.';

         //if (get('SOL_RES_RESPONSAVEL').value != 346) //Se não for Rodrigo Pan
            //Seta o responsável para Leandro Schio
            //get('SOL_RES_RESPONSAVEL').value = 39; //Seta o Id do Schio

         //Caso não tenha informado horas, dá um erro informando
         if (get('SOL_DESPESAS').value == '' || get('SOL_DESPESAS').value == '0,00' || get('_SOL_HORAS_DESENVOLVIMENTOTELA').value == '')
            alert('CUIDADO!! Você ainda não informou o valor.');
      }

                  //Seta o responsável para Leandro Schio
                  get('SOL_RES_RESPONSAVEL').value = 39; //Seta o Id do Schio
   }
   
   //se o e-mail estiver vazio setar um ponto
   if (get('SOL_SOLICITANTE_EMAIL').value == '')
      get('SOL_SOLICITANTE_EMAIL').value = '.';
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//Tela Home
if (location.href.indexOf("/wpp/home/") > 0){
   //Inibe a mensagem para indicar que o Navegador não é apropriado
   get('transparencia').style.display = 'none';
   get('aviso').style.display = 'none';
   document.body.style.overflow='auto';
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//Tela da Geração de Tarefas
if (location.href.indexOf("hwpp210") > 0){
//Nada a fazer aqui.
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//Tela da Solicitação
if (location.href.indexOf("tsol080") > 0){
   get('SOL_TSS_ID').addEventListener("change", function(){setsAprovacao()}, true);
}

//Rotina que filtra as tarefas e projetos
function testaTecla(e, campo){
   var linhas = get('GRID1').childNodes[1].getElementsByTagName('tr');

   var tela = '';
   if (location.href.indexOf("hwpp111") > 0)
      tela = 'tar';
   else if (location.href.indexOf("hwpp112") > 0)
      tela = 'prj';
   
   //Se for o número do projeto
   if (campo.id == 'GMS_filtro_proj'){
      GM_setValue("GMS_filtro_"+tela+"_proj", campo.value);
      GM_setValue("GMS_filtro_"+tela+"_obj", '');
      get('GMS_filtro_obj').value = '';
   //Se for a descrição da Tarefa
   }else if(campo.id == 'GMS_filtro_obj'){
      GM_setValue("GMS_filtro_"+tela+"_proj", '');
      GM_setValue("GMS_filtro_"+tela+"_obj", campo.value);
      get('GMS_filtro_proj').value = '';
   }else if(campo.id == 'GMS_filtro_tempo'){
      GM_setValue("GMS_filtro_tmp", campo.selectedIndex);
      if (get('GMS_filtro_obj').value != '')
         campo = get('GMS_filtro_obj');
      else if (get('GMS_filtro_proj').value != '')
         campo = get('GMS_filtro_proj');
      else
         campo = get('GMS_filtro_proj');
   }

   for (var i = 1; i < linhas.length; i++) {
      var nome  = '';

      //Se for o número do projeto
      if (campo.id == 'GMS_filtro_proj'){
         nome ='span__PRJTELA_'+('000'+i).slice(-4);
      //Se for a descrição da Tarefa/projeto
      }else if(campo.id == 'GMS_filtro_obj'){
         if (tela == 'tar')
            nome ='span__DSCTAREFA_'+('000'+i).slice(-4);
         else if (tela == 'prj')
            nome ='span__PRJDESC_'+('000'+i).slice(-4);
      }

      //busca o valor do campo
      var valor = get(nome).firstChild.firstChild.innerHTML;
      if (!valor){
         valor = get(nome).firstChild.innerHTML;
      }

      //faz a validação de tarefas com tempo
      var tempo = true;
      if (tela == 'tar'){
         if (get('GMS_filtro_tempo').selectedIndex != 2)
            tempo = false;
      }

      //faz a validação de projetos que não devem ser exibidos
      var proj = true;
      if ((tela == 'prj')&&(GM_getValue("GMS_filtro_nproj", '').length>0)){
         nome = 'span__PRJTELA_'+('000'+i).slice(-4);
         var aux = get(nome).firstChild.firstChild.innerHTML;
         if (!aux){
            aux = get(nome).firstChild.innerHTML;
         }
         //alert(aux);
         var nproj = ','+GM_getValue("GMS_filtro_nproj", '').toUpperCase()+',';
         
         if (nproj.indexOf(','+aux.toUpperCase()+',') >= 0)
            tempo = false;
      }

      //mostra ou não os registros da tabela
      if (((valor.toUpperCase().indexOf(campo.value.toUpperCase()) >= 0)||(campo.value == '')) && tempo && proj)
         linhas[i].style.display = '';
      else
         linhas[i].style.display = 'none';
   }
}

//rotina que recarrega a tela de tarefas conforme o projeto filtrado na aba de projetos(lupa)
function reloadTarefa(campo){
   var valor = campo.parentNode.firstChild.innerHTML; //busca o número do projeto
   var frames = parent.document.getElementsByTagName('iframe'); //busca os frames do mesmo nível deste frame
   var id;
   for (var i = 0; i < frames.length; i++) {
      if (frames[i].name == 'EmpPrograma_A1'){ //busca a janela de tarefas
         id = frames[i];
         break;
      }
   }
   if (id){
      GM_setValue("GMS_filtro_tar_proj", valor); //seta o valor do projeto
      var y=(id.contentWindow || id.contentDocument);
      if (y.document)
         y=y.document
      y.location.reload(); //recarrega a tela de projetos.
   }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//Janela de Tarefas
if (location.href.indexOf("hwpp111") > 0){
   //Coluna de Projetos
   var aux = GM_getValue("GMS_filtro_tar_proj", '');
   get('GRID1').childNodes[1].childNodes[0].childNodes[1].innerHTML += '<input type="text" id="GMS_filtro_proj" class="Attribute" size="5" value="'+aux+'"/>';
   get('GMS_filtro_proj').addEventListener("keyup", function(event){testaTecla(event, this)}, true);
   
   //Coluna de tarefas
   aux = GM_getValue("GMS_filtro_tar_obj", '');
   get('GRID1').childNodes[1].childNodes[0].childNodes[11].innerHTML += '<input type="text" id="GMS_filtro_obj" class="Attribute" size="25" value="'+aux+'"/>'
                                                                     +  '<select id="GMS_filtro_tempo" class="Attribute"><option value="0">Sem Tempo</option><option value="1">Com Tempo</option><option value="2" selected>Todos</option></select>';
   get('GMS_filtro_obj').addEventListener("keyup", function(event){testaTecla(event, this)}, true);
   //Adiciona o filtro de tempo
   get('GMS_filtro_tempo').selectedIndex = GM_getValue("GMS_filtro_tmp", 2);
   get('GMS_filtro_tempo').addEventListener("change", function(event){testaTecla(event, this)}, true);
   //alert('xx='+GM_getValue("GMS_filtro_tmp", 2));
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//Janela de Projetos
if (location.href.indexOf("hwpp112") > 0){
   //Coluna de Projetos
   var aux = GM_getValue("GMS_filtro_prj_proj", '');
   get('GRID1').childNodes[1].childNodes[0].childNodes[1].innerHTML += '<input type="text" id="GMS_filtro_proj" class="Attribute" size="5" value="'+aux+'"/>';
   get('GMS_filtro_proj').addEventListener("keyup", function(event){testaTecla(event, this)}, true);

   //Coluna de tarefas
   aux = GM_getValue("GMS_filtro_prj_obj", '');
   get('GRID1').childNodes[1].childNodes[0].childNodes[9].innerHTML += '<input type="text" id="GMS_filtro_obj" class="Attribute" size="25" value="'+aux+'"/>';
   get('GMS_filtro_obj').addEventListener("keyup", function(event){testaTecla(event, this)}, true);

   var linhas = get('GRID1').childNodes[1].getElementsByTagName('tr');

   //percore todas as linhas do grid e remove as colunas "status" e "Custos"
   for (var i = 1; i < linhas.length; i++) {
      /*span__PRJTELA_
      span__SEQTELA_
      span__PRJDESC_
      span__PRJ_STATUSTELA_
      span__PRJ_ENTREGATELA_
      span__DATANEGOCIADA_
      span__PRJ_PREVISTOGRID_
      span__CUSTOS_*/
      var nome = 'span__PRJ_STATUSTELA_'+('000'+i).slice(-4);
      addAttr(get(nome).parentNode, [['style', 'display:none']]);
      var nome = 'span__CUSTOS_'+('000'+i).slice(-4);
      addAttr(get(nome).parentNode, [['style', 'display:none']]);
      
      //adiciona o atalho para o projeto, para filtrar as tarefas de mesmo projeto
      var nome = 'span__PRJTELA_'+('000'+i).slice(-4);
      var img;
      img = newImg([['src', '/wpp/images/detalhes.gif'], ['style', 'cursor:pointer;'], ['title', 'Lista as tarefas deste projeto']]);
      img.addEventListener("click", function(){reloadTarefa(this)}, true);
      get(nome).appendChild(img);
      
      //Verifica a data de entrega do projeto e:
      //  ==> pinta de verde    caso a entrega está a menos de 7 dias
      //  ==> pinta de azul     caso a entrega está a menos de 2 dias
      //  ==> pinta de vermelho destacado em azul esteja na data
      //  ==> pinta de vermelho tenha passado da data
      var nome = 'span__DATANEGOCIADA_'+('000'+i).slice(-4);
      if (get(nome).innerHTML == '*'){//somente para projetos negociados
         var nome = 'span__PRJ_ENTREGATELA_'+('000'+i).slice(-4);
         var data = get(nome).innerHTML;
         
         var dia = DifDia(new Date('20'+data.substr(6,2), data.substr(3,2)-1, data.substr(0,2)));
         //var dia = DifDias(new Date('20'+data.substr(6,2), data.substr(3,2)-1, data.substr(0,2)),new Date(2014,04,19));

         if (dia < 7)
            addAttr(get(nome), [['style', 'color:green;']]);
         if (dia < 2)
            addAttr(get(nome), [['style', 'color:blue;font-weight: bold;']]);
         if (dia ==0){
            addAttr(get(nome), [['style', 'color:red;font-weight: bold;background-color:red;']]);
            paintrow("GRID1", i, "#0000FF"); //chama a rotina de pintar linhas de tabelas do WP
         }
         if (dia < 0)
            addAttr(get(nome), [['style', 'color:red;font-weight: bold;']]);
      }

   }

   //remove os cabeçalhos das colunas
   for (var i = 1; i < linhas[0].childNodes.length; i++) {
      if ((linhas[0].childNodes[i].innerHTML == 'Status')||linhas[0].childNodes[i].innerHTML == 'Custos')
         addAttr(linhas[0].childNodes[i], [['style', 'display:none']]);
   }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//Janela principal com paineis de tarefas e projetos
if (location.href.indexOf("hnuc011") > 0){
   if (get('Tbl_B_Cell_1')){
      get('Tbl_B_Cell_1').height = '100%';
      addAttr(get('Tbl_B_Cell_2'), [['style', 'display:none']]);
   }
   if (get('TxbDescB1')){      
      get('TxbDescB1').parentNode.appendChild(v_img);
      
      var v_lin  = newLin("",     [["class", "GMLin1"]]);
      var v_cel1 = newCel('Ocultar Projetos<br>(separar por vírgulas)<br>(sem espaços)',[['class', 'GMCel1'], ["align", "right"], ["valign", "top"]]);
      var v_cel2 = newCel('<textarea id="GMS_nproj" cols="50">'+GM_getValue("GMS_filtro_nproj", '')+'</textarea>', [['class', 'GMCel1'], ["align", "left"], ["colspan", "2"]]);
      v_lin.appendChild(v_cel1);
      v_lin.appendChild(v_cel2);
      get('GMTab_config').appendChild(v_lin);

      var v_lin  = newLin("",     [["class", "GMLin1"]]);
      var v_cel1 = newCel('<input type="button" id="GMS_conf_ok" value="Ok"/>',[['class', 'GMCel1'], ["colspan", "3"]]);
      v_lin.appendChild(v_cel1);
      get('GMTab_config').appendChild(v_lin);
      get('GMS_conf_ok').addEventListener("click", function(){GM_setValue('GMS_filtro_nproj', get('GMS_nproj').value)}, true);
      get('GMS_conf_ok').addEventListener("click", function(){location.reload();}, true);
      get('GMS_conf_ok').addEventListener("click", function(){mostra_tab_conf(false)}, true);
   }  
}

function addAttr(pi_elem, pi_att) {
   if (pi_att !== undefined) {
      for (var xi = 0; xi < pi_att.length; xi++) {
         pi_elem.setAttribute(pi_att[xi][0], pi_att[xi][1]);
         if (pi_att[xi][0].toUpperCase() == 'TITLE') pi_elem.setAttribute('alt', pi_att[xi][1]);
      }
   }
}

function newTab(pi_att) {
   var v_tb = document.createElement("TABLE");
   addAttr(v_tb, pi_att);
   return v_tb;
}

function newLin(pi_ihtml, pi_att) {
  var v_row = document.createElement("TR");
   v_row.innerHTML = pi_ihtml;
   addAttr(v_row, pi_att);
   return v_row;
}

function newCel(pi_ihtml, pi_att) {
   var v_cel = document.createElement("TD");
   v_cel.innerHTML = pi_ihtml;
   addAttr(v_cel, pi_att);
   return v_cel;
}

function newImg(pi_att) {
   var v_img = document.createElement("IMG");
   addAttr(v_img, pi_att);
   return v_img;
}

function get(pi_id) {return (pi_id != '' ? document.getElementById(pi_id) : null);}

function $d(iHTML, att) {var aDiv = document.createElement("DIV"); aDiv.innerHTML = iHTML; addAttr(aDiv, att); return aDiv;};

//retorna a diferença de dias entre as duas datas
function DifDias(data1, data2){
   var diferenca = data1.getTime() - data2.getTime();
   var diferenca = Math.floor(diferenca / (1000 * 60 * 60 * 24));
   
   return diferenca;
}

//retorna a diferença de dias entre a data atual e a data passada
function DifDia(data){
   return DifDias(data, new Date());
}


function mostra_tab_conf(pi_mostra) {
   scroll(0,0);
   v_div1 = get('GMS_rebel_div_1');
   v_div2 = get('GMS_rebel_div_2');
   v_div3 = get('GMS_rebel_div_3');

   if (pi_mostra) {
      v_div1.className = 'MsgPageOn_1';
      v_div2.className = 'MsgPageOn_2';
      v_div3.className = 'MsgPageOn_3';

      //v_div1.style.height = (v_div3.firstChild.offsetHeight+300)+'px';
      //alert(v_div3.firstChild.offsetHeight);

      var v_but = get('GMS_rebel_btfecha');
      if (v_but) v_but.addEventListener("click", function(){mostra_tab_conf(false)}, true);
   } else {
      v_div1.className = 'MsgPageOff';
      v_div2.className = 'MsgPageOff';
      v_div3.className = 'MsgPageOff';
   }
}

function depoisLoad(e) {
   if (location.href.indexOf("hnuc011") > 0)
      updScript();

   //Janela de Tarefas
   if (location.href.indexOf("hwpp111") > 0)
      get('GMS_filtro_tempo').selectedIndex = GM_getValue("GMS_filtro_tmp", 2);

   //Janela de Tarefas e Projetos
   if ((location.href.indexOf("hwpp111") > 0)||(location.href.indexOf("hwpp112") > 0)){
      if (get('GMS_filtro_proj').value)
         testaTecla(e, get('GMS_filtro_proj'));
      else if (get('GMS_filtro_obj').value)
         testaTecla(e, get('GMS_filtro_obj'));
      else if(get('GMS_filtro_tempo'))
         testaTecla(e, get('GMS_filtro_tempo'));
      else if (location.href.indexOf("hwpp112") > 0)
         testaTecla(e, get('GMS_filtro_proj'));
   }
   
   //Tela da Geração de Tarefas
   if (location.href.indexOf("hwpp210") > 0){
      //get('SOL_TSS_ID').addEventListener("change", function(){setsAprovacao()}, true);
      var x = document.getElementsByName("_PPR_IDTELA")[0];
      for (i=0;i<x.length;i++){
        if (x.options[i].text == 'Objetos')
           x.options[i].selected=true;
      }
      var x = document.getElementsByName("_TAR_TAREFATELA")[0];
      for (i=0;i<x.length;i++){
        if (x.options[i].text == 'Desenvolvimento e Teste')
           x.options[i].selected=true;
      }
   }
};

function updScript() {
   var txturl = 'http://userscripts.org:8080/scripts/source/182962.user.js';

   GM_xmlhttpRequest({
      method: 'GET',
      url: txturl + '?source', //don't increase the 'installed' count; just checking
      onload: function(result) {
         if (result.status != 200) return;
         if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
         nv = RegExp.$1;
         if (nv > $versao)
            if (window.confirm('Script Melhoria no WP\n\nUma nova versão está disponível:\nVersão atual: '+$versao+'\nVersão nova: '+nv+'\n\n Deseja atualizar a versão?'))
               window.location.href = txturl;
      }});
}

if (window.addEventListener) {
   window.addEventListener('load', depoisLoad, false);
} else {
   window.attachEvent('onload', depoisLoad);
}