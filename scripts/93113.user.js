// ==UserScript==
// @name           ReiDoCrime
// @namespace      Elisson
// @autor          Elisson Santos
// @description    Basicamente exibe algumas informaçÃµes de forma amigável e tem o recurso AutoPlay que joga para você. [ Script em desenvolvimento ]
// @include        http://*reidocrime.com/*
// ==/UserScript==

/*

-------------------------
Pessoal,

Voltei a analisar o script e vou ver se consigo fazer ele funcionar denovo ...
-------------------------

Este script está em desenvolvimento mas já tem algumas coisas legais:

1) Mostra a hora no Brasil que você vai sair do Hospital ou da Cadeia

2) Recursos AutoPlay que joga pra você
- Toma café automaticamente
- Faz os principais roubos (que dão mais lucro) até chegar no limite do risco
- Quando chega no limite do risco ele faz as principais atividades que diminuem o risco (ajudar as pessoas)
- Se tiver policial, mudar de mapa
- Quando acabar as opções de ação (roubo/ajuda), mudar de mapa
- Quando não está no mapa (prisão,hospital,...) ele espera 1 minuto e clica no link Minha Rua ... e vai tentando até chegar no seu mapa.

-----------------------------------------------------
Melhorias da Ultima versão

[ 13/12/2010 ]

- Correções na nova estrutura do site
- Retirada da lista de ações fixas. Agora ele analisa todas as ações do mapa para ver qual é a de maior risco e a de menor risco (função 'getUpDownRiskObj()').
- Inclusão da variável 'attackProportion' que é a porcentagem em relação ao seu poder de ataque que a ação pode exigir. O padrão é 90%. Por exemplo: Se o seu poder de ataque é 100, então o script vai selecionar ações que exigem no máximo 90 de ataque.
- Inclusão de um contador para saber quando a ação será executada (função 'counter()').
- Quando tem policial no mapa ele faz uma analise do mapa adjacente. Se o link do mapa do adjacente cair na Cidade, então ele volta para a Minha Rua e tenta outra direção. A idéia é dar a volta em todos os mapas adjacentes até voltar para a Minha Rua.
- Exibindo mais dados, exibie o nome da ação e o link que será utilizado

[ 14/12/2010 ]

- Tela de configuração
- Utilização de jQuery em algumas partes
- Inclusão da lista manual de ações ... pode escolher manual ou automática (ver as configurações)

-----------------------------------------------------
TO-DO

- Montar tela de configuração na página do profile
. Editar link do café
. Timezone para converter as horas

- Sugestão do fafnir (Jun 10, 2009 12:26am )
Tenho mais uma coisa que tava pensando.. o script sempre foge dos policiais, porem, se ele fizer uma ação boa na frente dos policiais, os pontos sao dobrados. Entao, se ao inves de fugir, quando estiver abaixo de 200 PROCURAR policiais e fazer ações boas. Senao, gasta muito dinheiro e tempo ;)

- Sugestão do scriptrafael (Jun 16, 2009 12:15pm )
Seria interessante colocar um código para tirar a intoxicação; renovar a vida

- Sugestão do Kdra182 e Gabriel Silva (Jun 17, 2009 8:46am )
Beber wisk no proprio bar em vez de café ...

*/

var $ = unsafeWindow.jQuery;

var userLife;
var userStamina;
var userRisk;
var userToxic;
var userQuest;

var userAttack;
var userRespect;
var userIntelect;
var userStrength;
var userSexapeal;
var userCash;

// Flag se AutPlay está ativo
var autoPlay;

// Proporção de ataque necessário para considerar que a ação terá sucesso
// Ou seja: O valor de attack necessário para executar a ação deve ser no máximo 90% em relação ao nível de attack do personagem
var attackProportion = parseInt(getValue("config_attackProportion__", "90"));

// Intervalo entre uma jogada e outra (milisegundos)
var autoPlayInterval = getValue("config_autoPlayInterval__", 10000);

// Nivel minimo para tomar café
var autoPlayMinStamina = getValue("config_autoPlayMinStamina__", 30);

// Nivel maximo e mínimo do risco para começar a ajudar ou roubar as pessoas
var autoPlayUpRiskLimit = getValue("config_autoPlayUpRiskLimit__", 200);
var autoPlayDownRiskLimit = getValue("config_autoPlayDownRiskLimit__", 100);

// Direção do AutoPlay (upRisk = Roubar / downRisk = Ajudar)
var autoPlayDirection;

// Id do elemento HTML que exibe o log
var autoPlayLogId;

// URL ativo que será disparado
var autoPlayActiveUrl;

// Método de localização de ação ( 'auto' - Automatico / 'manual' - Manual via lista fixa )
var autoPlayUpDownRiskMethod = getValue("config_autoPlayUpDownRiskMethod__", "auto");

// Lista das ações para subir o risco (roubar)
var autoPlayUpRiskList = new Array();

autoPlayUpRiskList = getValue("config_autoPlayUpRiskList__", 
"taxi.rob"      + "\n" +
    "newcar.rob"    + "\n" +
    "manager.rob"   + "\n" +
    "manager.steal" + "\n" +
    "newcar.steal"  + "\n" +
    "phone.steal"   + "\n" +
    "punk.rob").split("\n");

// Lista das ações para descer o risco (ajudar)
var autoPlayDownRiskList = new Array();

autoPlayDownRiskList = getValue("config_autoPlayDownRiskList__", 
"kid.school"     + "\n" +
    "mother.help"    + "\n" +
    "drunk.soberize" + "\n" +
    "shaft.move"     + "\n" +
    "garbage.clean").split("\n");
                                
// Lista de URL para subir o risco (roubar)
var autoPlayUpRiskObj = {
    "nome"   : "",
    "url"    : "",
    "stamina": 0,
    "risk"   : 0
};

// Lista de URL para baixar o risco (ajudar)
var autoPlayDownRiskObj = {
    "nome"   : "",
    "url"    : "",
    "stamina": 0,
    "risk"   : 0
};

// Lista de direção para percorrer os mapas
var autoPlayMapOrderIdx;
var autoPlayMapOrder = new Array();

// Ele vai dar a volta nos mapas adjacentes e voltar para sua rua
autoPlayMapOrder = getValue("config_autoPlayMapOrder__", 
"west"  + "\n" +
    "north" + "\n" +
    "east"  + "\n" +
    "east"  + "\n" +
    "south" + "\n" +
    "south" + "\n" +
    "west"  + "\n" +
    "west"  + "\n" +
    "north-east").split("\n");

var tempCounter = -1;

function counter()
{
    var div = document.getElementById('autoPlay_timerDiv');

    // Se o autoPlay estiver desligado .. zera tudo
    if( !autoPlay )
    {
        div.innerHTML = "";
        tempCounter = -1;
        return;
    }

    // Se zerar o contador .. para tudo
    if( tempCounter == 0 )
    {
        return;
    }

    // Inicializa o contador na primeira vez ...
    if( tempCounter < 0 )
    {
        tempCounter = autoPlayInterval / 1000;
    }

    // Atualiza div com o contador
    div.innerHTML = (tempCounter--) + "s";

    // Chama o contador depois de 1 segundo ....
    setTimeout( counter, 1000 );
}

// ============================================================= [ Configuration ] ===

function getValue(key, defaultValue)
{
    return GM_getValue(key, defaultValue);
}

function setValue(key, value)
{
    // esse setTimeout é por causa de uma questão de segurança do Greaseonkey
    // como eu inclui o jQuery no script, tive que fazer ese ajuste
    // http://wiki.greasespot.net/0.7.20080121.0_compatibility
    setTimeout(function() {
        GM_setValue(key, value);
    }, 0);
}

// ============================================================= [ Data Function ] ===

function getDateOld( sDate ) {

    /*
    28.05.2009 10:26:08 ???
    01234567891111111111222
              0123456789012
     */

    var nDay = parseInt(sDate.substr(0,2));
    var nMon = parseInt(sDate.substr(3,2)) - 1; // os meses no javascript começam no 0
    var nYea = parseInt(sDate.substr(6,4));

    // A hora do jogo está em +2 ..
    //     só que no Brasil é -3 ..
    //           por isso faz -5 horas ...
    var nHou = parseInt(sDate.substr(11,2)) - 5;
    var nMin = parseInt(sDate.substr(14,2));
    var nSec = parseInt(sDate.substr(17,2));

    var dDate = new Date();
    dDate.setDate(nDay);
    dDate.setMonth(nMon);
    dDate.setFullYear(nYea);
    dDate.setHours(nHou);
    dDate.setMinutes(nMin);
    dDate.setSeconds(nSec);

    return dDate;

}

function getDate( sDate ) {

    /*
    10:26:08
    01234567
     */

    var nHou = parseInt(sDate.substr(0,2));
    var nMin = parseInt(sDate.substr(3,2));
    var nSec = parseInt(sDate.substr(6,2));

    var dDate = new Date();
    dDate.setHours(dDate.getHours() + nHou - 1);
    dDate.setMinutes(dDate.getMinutes() + nMin);
    dDate.setSeconds(dDate.getSeconds() + nSec);

    return dDate;
    //return dDate.format('dd/mm');
}

// ============================================================= [ Extract User Data ] ===

function extractUserProps (sSearch) {

    var item = $(".right-col .b-links ." + sSearch);
    return item[0].firstChild.data.replace(" ","");
}

function extractUserValue (sSearch) {

    var item = $(".right-col .user-properties ." + sSearch);

    if( item.length > 0 )
    {
        var value = item.next().text();
        return value;
    }

    return null;
}

// ============================================================= [ Get UpRisk / DownRisk actions ] ===

function getUpDownRiskObj()
{
    GM_log("Buscando UpRisk e DownRisk");

    if( !unsafeWindow.MAP ) return;

    // Existe uma variável global dentro do site do jogo .. nessa variável MAP estão todos os links de ação
    var MAP = unsafeWindow.MAP.data;
    
    
    // Se a configuração for de busca automática, então busca pelas ações disponíveis ...
    if( autoPlayUpDownRiskMethod == "auto" )
    {
        for( var i = 0; i < MAP.length; i++ )
        {
            for( var j = 1; j < MAP[i].length; j++)
            {

                // Se o nível de attack que a ação exige for maior do que ó mínimo necessário, então vai para o próximo
                if( parseInt(MAP[i][0][2]) > (userAttack * (parseInt(attackProportion)/100)) ) continue;

                // MAIOR
                if( parseInt(MAP[i][j][4]) > autoPlayUpRiskObj.risk )
                {
                    autoPlayUpRiskObj.nome = MAP[i][0][1] + " (" + MAP[i][j][1] + ")";
                    autoPlayUpRiskObj.url = "/map/" + MAP[i][j][0] + "?z=" + unsafeWindow.req_id;
                    autoPlayUpRiskObj.stamina = MAP[i][j][2];
                    autoPlayUpRiskObj.risk = MAP[i][j][4];
                }

                // MENOR
                if( parseInt(MAP[i][j][4]) < autoPlayDownRiskObj.risk )
                {
                    autoPlayDownRiskObj.nome = MAP[i][0][1] + " (" + MAP[i][j][1] + ")";
                    autoPlayDownRiskObj.url = "/map/" + MAP[i][j][0] + "?z=" + unsafeWindow.req_id;
                    autoPlayDownRiskObj.stamina = MAP[i][j][2];
                    autoPlayDownRiskObj.risk = MAP[i][j][4];
                }
            }
        }
    }
    else if( autoPlayUpDownRiskMethod == "manual" )
    {
        // Se a configuração for manual, então busca pela lista configurada...
        // Ficou meio ruim, mas ta funcionado ...
        // 
        // Ele busca na ordem pela lista configurada e busca no MAP até achar ...
        //

        var sairLoop = false;
        for( var list = 0; list < autoPlayUpRiskList.length; list++)
        {
            for( var i = 0; i < MAP.length; i++ )
            {
                for( var j = 1; j < MAP[i].length; j++)
                {                    
                    if( MAP[i][j][0].search(autoPlayUpRiskList[list]) >= 0 )
                    {
                        autoPlayUpRiskObj.nome = MAP[i][0][1] + " (" + MAP[i][j][1] + ")";
                        autoPlayUpRiskObj.url = "/map/" + MAP[i][j][0] + "?z=" + unsafeWindow.req_id;
                        autoPlayUpRiskObj.stamina = MAP[i][j][2];
                        autoPlayUpRiskObj.risk = MAP[i][j][4];
                        sairLoop = true;
                        break;
                    }
                }
                if( sairLoop ) break;
            }
            if( sairLoop ) break;
        }

        var sairLoop = false;
        for( var list = 0; list < autoPlayDownRiskList.length; list++)
        {
            for( var i = 0; i < MAP.length; i++ )
            {
                for( var j = 1; j < MAP[i].length; j++)
                {
                    if( MAP[i][j][0].search(autoPlayDownRiskList[list]) >= 0 )
                    {
                        autoPlayDownRiskObj.nome = MAP[i][0][1] + " (" + MAP[i][j][1] + ")";
                        autoPlayDownRiskObj.url = "/map/" + MAP[i][j][0] + "?z=" + unsafeWindow.req_id;
                        autoPlayDownRiskObj.stamina = MAP[i][j][2];
                        autoPlayDownRiskObj.risk = MAP[i][j][4];
                        sairLoop = true;
                        break;
                    }
                }
                if( sairLoop ) break;
            }
            if( sairLoop ) break;
        }

    }

}

function getUpStaminaUrl()
{
    GM_log("Recuperando o link do café");

    if( !unsafeWindow.MAP ) return null;

    // Existe uma variável global dentro do site do jogo .. nessa variável MAP estão todos os links de ação
    var MAP = unsafeWindow.MAP.data;

    for( var i = 0; i < MAP.length; i++ )
    {
        for( var j = 1; j < MAP[i].length; j++)
        {
            // Recupera o link do café
            if( MAP[i][j][0].search('cofemachine.drink-cafe/5') >= 0 )
            {
                return "/map/" + MAP[i][j][0] + "?z=" + unsafeWindow.req_id;
            }
        }
    }

    return null;
}

function isCopHere()
{
    GM_log("Verifica se tem policial");

    if( !unsafeWindow.MAP ) return false;

    // Existe uma variável global dentro do site do jogo .. nessa variável MAP estão todos os links de ação
    var MAP = unsafeWindow.MAP.data;

    for( var i = 0; i < MAP.length; i++ )
    {
        for( var j = 1; j < MAP[i].length; j++)
        {
            // Ver se tem policial no mapa
            if( MAP[i][j][0].search('cop.give') >= 0 )
            {
                setValue("AutoPlayCopEscape__",1);
                return true;
            }
        }
    }

    setValue("AutoPlayCopEscape__",0);
    return false;
}

// ============================================================= [ Get Action Link ] ===

function getUserMapUrl() {
    var link = $(".left-col .main-menu .mm-street");
    return ( link.length > 0 ) ? link[0].href : null;
}

function getMapDirectionUrl() {
    var link = $("#map ." + autoPlayMapOrder[autoPlayMapOrderIdx]);

    if( link.length > 0 )
    {
        // seta a proxima direção
        autoPlayMapOrderIdx = (autoPlayMapOrderIdx + 1) % autoPlayMapOrder.length;
        setValue("AutoPlayMapIdx__",autoPlayMapOrderIdx);

        return link[0].href;
    }

    return null;
}

// ============================================================= [ Auto Play ON ] ===

function activeLink(sObj)
{
    window.location.href = sObj;
}

function autoPlayOn()
{
    if( autoPlay )
    {
        GM_log("Processando Auto Play");

        // Se tem um link definido, então roda ele ...
        if( autoPlayActiveUrl )
        {
            activeLink( autoPlayActiveUrl );
            return;
        }

        getUpDownRiskObj();

        // ******************************************
        //
        // Se não tem link definido ... então analisa cenário para on AutoPlay
        //

        var oLog = document.getElementById(autoPlayLogId);
        var success = false;

        oLog.innerHTML = "AutoPlay ON (Analisando ...)";

        // verifica se está na tela da Minha Rua
        if( !document.getElementById('map') || (unsafeWindow.MAP && unsafeWindow.MAP.map == 'city') )
        {
            oLog.innerHTML = "AutoPlay ON (Não está na sua rua!)<br>";
            autoPlayActiveUrl = getUserMapUrl();

            // Se não estiver no mapa da rua, então zera tudo para começar denovo
            if( !document.getElementById('map') )
            {
                oLog.innerHTML += "Tentando ir para lá ...";
                autoPlayInterval = 60000; // espera 1 minuto para tentar novamente
                setValue("AutoPlayMapIdx__",0); // zera a direção do mapa
            }
            else if( unsafeWindow.MAP && unsafeWindow.MAP.map == 'city' && getValue("AutoPlayCopEscape__") == 1 )
            {
                // Se esta na cidade e estava fugindo da policia, entã significa que aquela direção não leva a outro mapa ..
                // por isso faz esse ajuste na próxima direção ...

                oLog.innerHTML += "Tentando outra direção ...";
                setValue("AutoPlayCopEscapeFail__",1);
            }
        }

        // verifica se tem policia
        else if( isCopHere() )
        {
            oLog.innerHTML = "AutoPlay ON (Policial!)<br>Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx] + "<br>";
            autoPlayActiveUrl = getMapDirectionUrl();
            oLog.innerHTML += autoPlayActiveUrl;
        }

        // verifica se precisa de café
        else if( userStamina < autoPlayMinStamina )
        {
            autoPlayActiveUrl = getUpStaminaUrl();
            oLog.innerHTML = "AutoPlay ON (Café!)<br>" + autoPlayActiveUrl;
        }

        // verifica se é para abaixar o risco
        else if( autoPlayDirection == "downRisk" )
        {
            autoPlayActiveUrl = autoPlayDownRiskObj.url;

            if( autoPlayActiveUrl )
            oLog.innerHTML = "AutoPlay ON (Diminuindo Risco)<br>" + autoPlayDownRiskObj.nome + "<br>" + autoPlayActiveUrl;
            else {
                oLog.innerHTML = "AutoPlay ON (Diminuindo Risco)<br>Nenhuma ação localizada...<br>Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx] + "<br>";
                autoPlayActiveUrl = getMapDirectionUrl();
            }
        }

        // verifica se é para aumentar o risco
        else if( autoPlayDirection == "upRisk" )
        {
            autoPlayActiveUrl = autoPlayUpRiskObj.url;

            if( autoPlayActiveUrl )
            oLog.innerHTML = "AutoPlay ON (Aumentando Risco)<br>" + autoPlayUpRiskObj.nome + "<br>" + autoPlayActiveUrl;
            else {
                oLog.innerHTML = "AutoPlay ON (Aumentando Risco)<br>Nenhuma ação localizada...<br>Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx] + "<br>";
                autoPlayActiveUrl = getMapDirectionUrl();
            }
        }

        // se passou por tudo e chegou até aqui, então alguma coisa deu errado
        else
        {
            autoPlayStartStop();
            oLog.innerHTML += " (Sem tratamento!)";
        }

        // Iniciar contador ....
        counter();

        // Aguarda o tempo definido para refazer a análise
        setTimeout( autoPlayOn, autoPlayInterval );
    }
}

// ============================================================= [ Auto Play Start/Stop ] ===

function autoPlayStartStop()
{
    GM_log("Ligando/Desligando o Auto Play");

    autoPlay = !autoPlay;

    setValue("AutoPlay__",((autoPlay)?"1":"0"));

    GM_log("Resultado = " + autoPlay);

    if( autoPlay )
    {
        autoPlayOn();
    }
    else
    {
        document.getElementById(autoPlayLogId).innerHTML = "AutoPlay OFF";

        // Zera indice do mapa
        autoPlayMapOrderIdx = 0;
        setValue("AutoPlayMapIdx__",autoPlayMapOrderIdx);
    }

}

// ============================================================= [ Get Status ] ===

function getStatus() {

    var success = false;
    var newText = $("<span></span>")[0];

    var aA = $(".right-col .mystatus a");

    if( aA.length > 0 )
    {
        if( aA[0].href.search("hospital") >= 0 )
        {
            newText.innerHTML = "No hospital";

            var div = document.getElementById('msgbox');
            if( div )
            {
                div = div.getElementsByClassName('minfo');
                if( div.length > 0 )
                {
                    var tempo = div[0].getElementsByTagName('span')[0].innerHTML;
                    newText.innerHTML += " até " + getDate(tempo);
                }
            }
        }
        else if( aA[0].href.search("jail") >= 0 )
        {
            newText.innerHTML = "Na cadeia";

            var div = document.getElementById('msgbox');
            if( div )
            {
                div = div.getElementsByClassName('minfo');
                if( div.length > 0 )
                {
                    var tempo = div[0].getElementsByTagName('span')[0].innerHTML;
                    newText.innerHTML += " até " + getDate(tempo);
                }
            }
        }
        else if( aA[0].href.match("map") )
        {
            var text = aA[0].innerHTML;
            newText.innerHTML = "Status " + text;
        }

        success = ( newText.innerHTML.length > 0 )
    }

    if( !success ) newText.innerHTML = "Status não identificado";

    return newText;

}

// ============================================================= [ Get Log Object ] ===

function getLogObj() {

    autoPlayLogId = Date();

    var newText = $("<span id='" + autoPlayLogId + "'>" + ((autoPlay)?"AutoPlay ON (Inicializando...)":"AutoPlay OFF") + "</span>")[0]

    return newText;

}

// ============================================================= [ Get Buttons ] ===

function getStartStopButton() {

    var buttonStartStop = $("<input type='button' id='autoPlay_startStopButton' value='AutoPlay'>");
    
    buttonStartStop.click(autoPlayStartStop);

    return buttonStartStop[0];

}

function getConfigButton() {

    var buttonConfig = $("<input type='button' id='autoPlay_configButton' value='Config'>");

    buttonConfig.click(buildConfigDialog);

    return buttonConfig[0];
}

// ============================================================= [ Get Next Map Direction ] ===

function getNextMapDirection() {

    var newText = $("<span>Próxima direção do mapa: " + autoPlayMapOrder[autoPlayMapOrderIdx] + "</span>")[0];

    return newText;
}

// ============================================================= [ Config Div ] ===

function exibeOcultaLista()
{
    var div = document.getElementById("autoPlay_configDiv");
    var value = $("input.autoPlay_config_listaAcoes:checked",div).val();
    
    if( value == "auto" )
    {
        $("span.autoPlay_config_listaAcoes",div).css("display","block");
        $("table.autoPlay_config_listaAcoes",div).css("display","none");
    }
    else
    {
        $("span.autoPlay_config_listaAcoes",div).css("display","none");
        $("table.autoPlay_config_listaAcoes",div).css("display","block");
    }
}

function configDialogSave()
{
    var div = document.getElementById("autoPlay_configDiv");
    var tempList;

    autoPlayInterval = $(".autoPlay_config_intervalo",div).val();
    attackProportion = $(".autoPlay_config_proporcao",div).val();
    autoPlayMinStamina = $(".autoPlay_config_cafe",div).val();
    autoPlayUpRiskLimit = $(".autoPlay_config_riscoMax",div).val();
    autoPlayDownRiskLimit = $(".autoPlay_config_riscoMin",div).val();
    autoPlayUpDownRiskMethod = $("input.autoPlay_config_listaAcoes:checked",div).val();

    // ---
    
    tempList = $(".autoPlay_config_navegacao",div).val();
    setValue("config_autoPlayMapOrder__", tempList);

    autoPlayMapOrder = new Array();
    tempList = tempList.split("\n");
    for( i=0; i<tempList.length; i++)
        autoPlayMapOrder[i] = tempList[i];
    
    // ---
    
    tempList = $(".autoPlay_config_listaAcoes.up",div).val();
    setValue("config_autoPlayUpRiskList__", tempList);

    autoPlayUpRiskList = new Array();
    tempList = tempList.split("\n");
    for( i=0; i<tempList.length; i++)
        autoPlayUpRiskList[i] = tempList[i];
      
    // ---
    
    tempList = $(".autoPlay_config_listaAcoes.down",div).val();
    setValue("config_autoPlayDownRiskList__", tempList);

    autoPlayDownRiskList = new Array();
    tempList = tempList.split("\n");
    for( i=0; i<tempList.length; i++)
        autoPlayDownRiskList[i] = tempList[i];

    // ---

    setValue("config_autoPlayInterval__", autoPlayInterval);
    setValue("config_attackProportion__", attackProportion);
    setValue("config_autoPlayMinStamina__", autoPlayMinStamina);
    setValue("config_autoPlayUpRiskLimit__", autoPlayUpRiskLimit);
    setValue("config_autoPlayDownRiskLimit__", autoPlayDownRiskLimit);
    setValue("config_autoPlayDownRiskLimit__", autoPlayDownRiskLimit);
    setValue("config_autoPlayUpDownRiskMethod__", autoPlayUpDownRiskMethod);

    $(div).remove();
}

function configDialogCancel()
{
    var div = document.getElementById("autoPlay_configDiv");

    $(div).remove();
}

function buildConfigDialog()
{
    var newDiv = document.createElement('div');
    newDiv.style.display = "none";
    newDiv.style.position = "absolute";
    newDiv.style.top = "90px";
    newDiv.style.left = "-250px";
    newDiv.style.marginTop = "10px";
    newDiv.style.marginLeft = "50%";
    newDiv.style.width = "500px";
    newDiv.style.backgroundColor = "black";
    newDiv.style.border = "solid 10px white";
    newDiv.style.padding = "10px";
    newDiv.style.MozBorderRadius = "15px";
    newDiv.style.zIndex = 1000;
    newDiv.id = "autoPlay_configDiv";

    var table = $("<table width='100%' cellspacing='0' cellpadding='3'>" +
        "<tr><td colspan='2' style='font-size: 18px'><strong>Configurações</strong><hr></td></tr>" +
        "<tr><td width='160'>Intervalo entre Ações:</td><td><input class='autoPlay_config_intervalo' type='text' value='" + autoPlayInterval + "' size='6'> milisegundos</td></tr>" +
        "<tr><td width='160'>Proporção de Ataque:</td><td><input class='autoPlay_config_proporcao' type='text' value='" + attackProportion + "' size='4' maxlngth='3'> % ( = " + (userAttack * (parseInt(attackProportion)/100)) + " no máx. de ataque)</td></tr>" +
        "<tr><td width='160'>Mínimo para tomar café:</td><td><input class='autoPlay_config_cafe' type='text' value='" + autoPlayMinStamina + "' size='4'> stamina</td></tr>" +
        "<tr><td width='160' valign='top'>Limite de Risco:</td><td><table><tr><td>Max</td><td><input class='autoPlay_config_riscoMax' type='text' value='" + autoPlayUpRiskLimit + "' size='4'></td></tr><tr><td>Min</td><td><input class='autoPlay_config_riscoMin' type='text' value='" + autoPlayDownRiskLimit + "' size='4'></td></tr></table></td></tr>" +
        "<tr><td width='160' valign='top'>Lista das Ações:" +
        "<br><input class='autoPlay_config_listaAcoes' type='radio' name='autoPlay_config_listaAcoes' value='auto' " + ((autoPlayUpDownRiskMethod == "auto")?"checked":"") + "> Automático " +
        "<br><input class='autoPlay_config_listaAcoes' type='radio' name='autoPlay_config_listaAcoes' value='manual' " + ((autoPlayUpDownRiskMethod == "manual")?"checked":"") + "> Manual (um em cada linha)</td>" +
        "<td><span class='autoPlay_config_listaAcoes' style='display: none'>AUTOMÁTICO</span>" +
        "    <table width='100%' cellspacing='0' cellpadding='2' class='autoPlay_config_listaAcoes' style='display: none'>"+
        "    <tr><td>Subir Risco (roubar)</td><td>Descer Risco (ajudar)</td></tr>" +
        "    <tr><td><textarea class='autoPlay_config_listaAcoes up' style='width: 100%; height: 100px;'></textarea></td>" +
        "        <td><textarea class='autoPlay_config_listaAcoes down' style='width: 100%; height: 100px;'></textarea></td>" +
        "    </tr></table></td></tr>" +
        "<tr><td width='160' valign='top'>Ordem de Navegação:<br>(um em cada linha)</td><td><textarea class='autoPlay_config_navegacao' style='width: 100%; height: 100px'></textarea></td></tr>" +
        "<tr><td colspan='2' align='right'><input class='autoPlay_config_buttonSave' type='button' value='SALVAR'> &nbsp; <input class='autoPlay_config_buttonCancel' type='button' value='CANCELAR'></td></tr>" +
        "</table>")[0];

    newDiv.appendChild(table);

    document.getElementsByTagName('body')[0].appendChild(newDiv);

    $(".autoPlay_config_buttonSave",newDiv).click(configDialogSave);
    $(".autoPlay_config_buttonCancel",newDiv).click(configDialogCancel);
    $("input.autoPlay_config_listaAcoes",newDiv).click(exibeOcultaLista);
    
    var listaDirecao = "";
    for( i=0; i<autoPlayMapOrder.length; i++)
        listaDirecao += ((listaDirecao.length > 0)?"\n":"") + autoPlayMapOrder[i];
    $(".autoPlay_config_navegacao",newDiv).val(listaDirecao);

    var listaAcoesUp = "";
    for( i=0; i<autoPlayUpRiskList.length; i++)
        listaAcoesUp += ((listaAcoesUp.length > 0)?"\n":"") + autoPlayUpRiskList[i];
    $(".autoPlay_config_listaAcoes.up",newDiv).val(listaAcoesUp);

    var listaAcoesDown = "";
    for( i=0; i<autoPlayDownRiskList.length; i++)
        listaAcoesDown += ((listaAcoesDown.length > 0)?"\n":"") + autoPlayDownRiskList[i];
    $(".autoPlay_config_listaAcoes.down",newDiv).val(listaAcoesDown);
    
    exibeOcultaLista();
    
    $(newDiv).fadeIn();
}

// ============================================================= [ Build Data Div ] ===

function builDataDiv() {

    GM_log("Construindo DIV");

    var oDivProps = document.getElementsByClassName('right-col')[0];

    var newDiv = document.createElement('div');
    newDiv.style.position = "absolute";
    newDiv.style.color = "white";
    newDiv.style.left = "0px";
    newDiv.style.marginTop = "10px";
    newDiv.style.width = "94%";
    newDiv.style.backgroundColor = "black";
    newDiv.style.border = "solid 1px white";
    newDiv.style.padding = "5px";
    newDiv.style.opacity = 0.85;
    newDiv.style.filter = "alpha(opacity=85)";

    var timerDiv = document.createElement('div');
    timerDiv.style.position = "absolute";
    timerDiv.style.right = "5px";
    timerDiv.style.bottom = "5px";
    timerDiv.style.fontSize = "32px";
    timerDiv.id = "autoPlay_timerDiv";

    newDiv.appendChild(timerDiv);
    newDiv.appendChild(getLogObj());
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(getNextMapDirection());
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(getStatus());
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(getStartStopButton());
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(getConfigButton());
    
    oDivProps.appendChild(newDiv);

    document.getElementById('autoPlay_startStopButton').focus();

}

// ============================================================= [ Initialize ] ===

function init()
{
    if( unsafeWindow.autoPlayInitialized ) return;

    unsafeWindow.autoPlayInitialized = true;

    GM_log("Inicializando");

    userLife    = parseInt(extractUserValue("p-life"));
    userStamina = parseInt(extractUserValue("p-stamina"));
    userRisk    = parseInt(extractUserValue("p-risk"));
    userToxic   = extractUserValue("p-toxic");
    userQuest   = extractUserValue("p-quest");

    userAttack   = extractUserProps("attack1");
    userRespect  = extractUserProps("respect");
    userIntelect = extractUserProps("intelect");
    userStrength = extractUserProps("strength");
    userSexapeal = extractUserProps("sexapeal");
    userCash     = extractUserProps("ucash");

    // -------------

    var tempIdx = getValue("AutoPlayMapIdx__");
    autoPlayMapOrderIdx = ( tempIdx ) ? parseInt(tempIdx) : 0;

    // Se esta na cidade e estava fugindo da policia, entã significa que aquela direção não leva a outro mapa ..
    // por isso faz esse ajuste na próxima direção ...

    if( getValue("AutoPlayCopEscapeFail__") == 1)
    {
        setValue("AutoPlayCopEscapeFail__",0);

        switch(autoPlayMapOrderIdx)
        {
            case 1:
                autoPlayMapOrder[1] = 'north-west';
                break;
            case 2:
                autoPlayMapOrder[2] = 'north';
                break;
            case 3:
                autoPlayMapOrder[3] = 'north-east';
                break;
            case 4:
                autoPlayMapOrder[4] = 'east';
                break;
            case 5:
                autoPlayMapOrder[5] = 'south-east';
                break;
            case 6:
                autoPlayMapOrder[6] = 'south';
                break;
            case 7:
                autoPlayMapOrder[7] = 'south-west';
                break;
            default:
                autoPlayMapOrderIdx = 0;
                break;
        }
    }

    // -------------

    var tempDirection = getValue("AutoPlayDirection__");
    autoPlayDirection = ( tempDirection && tempDirection.length > 0 ) ? tempDirection : "upRisk";

    if( autoPlayDirection == "upRisk" && userRisk > autoPlayUpRiskLimit ) autoPlayDirection = "downRisk";
    if( autoPlayDirection == "downRisk" && userRisk < autoPlayDownRiskLimit ) autoPlayDirection = "upRisk";

    setValue("AutoPlayDirection__",autoPlayDirection);

    // -------------

    var statusAutoPlay = getValue("AutoPlay__");

    if( statusAutoPlay && statusAutoPlay.length > 0 )
    {
        // Se foi definido, entao considera o que foi definido
        autoPlay = (statusAutoPlay == "1");
    }
    else
    {
        // Senão, considera o AutoPlay desligado (zero)
        setValue("AutoPlay__","0");
        autoPlay = false;
    }

    // -------------
    builDataDiv();
    if( autoPlay ) autoPlayOn();
}

init();
