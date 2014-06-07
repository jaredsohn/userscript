// ==UserScript==
// @name           ReiDoCrime
// @namespace      Elisson
// @autor          Elisson Santos
// @description    Basicamente exibe algumas informações de forma amigável e tem o recurso AutoPlay que joga para você. [ Script em desenvolvimento ]
// @include        http://*reidocrime.com/*
// @matches        http://*reidocrime.com/*
// ==/UserScript==

/*

-------------------------
Pessoal,

Voltei a analisar o script .. está funcionando e com melhorias
-------------------------

Este script está em desenvolvimento mas já tem algumas coisas legais:

1) Mostra a hora no Brasil que você vai sair do Hospital ou da Cadeia

2) Recursos AutoPlay que joga pra você
- Toma café automaticamente
- Faz os principais roubos (que dão mais lucro) até chegar no limite do risco
- Quando chega no limite do risco ele faz as principais atividades que diminuem o risco (ajudar as pessoas)
- Se tiver policial, mudar de mapa (exceto se estiver diminuindo o rsico)
- Quando acabar as opções de ação (roubo/ajuda), mudar de mapa
- Quando não está no mapa (prisão,hospital,...) ele espera 1 minuto e clica no link Minha Rua ... e vai tentando até chegar no seu mapa.

-----------------------------------------------------
Melhorias das ultimas versões

[ 24/05/2012 ]

 - Ajustes para o script voltar a funcionar (sem melhorias)
 - Funciona no Google Chrome 

[ 30/12/2010 ]

 - Correção do bug de Subir Risco e Diminuir risco ... Informado por Jean The Guy 
 - Entra no tumulto automaticamente quando vai preso ...
 - Melhorias internas ...
 
[ 21/12/2010 ]

 - FINALMENTE !!!! O script agora pode subir a stamina tomando drinks no seu bar !!!
   Abra a configuração e mude a opção na linha 'Mínimo para subir a stamina' para 'Drink no Bar' em vez de 'Maquina de Café'
   Precisa do código do bar e do código do dink. Para recuperar estes códigos apenas siga as instruções no texto que estará do lado direito dos input text ....
 - Bug fixies   

 - Sugestão do Kdra182 e Gabriel Silva (Jun 17, 2009 8:46am )
   Beber wisk no proprio bar em vez de café ...

[ 18/12/2010 ]

 - Bug Fixies
 - Inclusão do limite máximo de intoxicação (autoPlayMaxToxic) que dá uma pausa no jogo até chegar no limite mínimo de intoxicação (autoPlayMinToxic)
 - Variável para configurar o tempo de espesa da desintoxicação (autoPlayToxicWait)
 - Cura automaticamente quando chega no nivel minimo de vida (autoPlayMinLife)

 - Sugestão do scriptrafael (Jun 16, 2009 12:15pm )
   Seria interessante colocar um código para tirar a intoxicação; renovar a vida

[ 14/12/2010 ]

- Tela de configuração
- Utilização de jQuery em algumas partes
- Inclusão da lista manual de ações ... pode escolher manual ou automática (ver as configurações)

- Sugestão do fafnir (Jun 10, 2009 12:26am )
  Tenho mais uma coisa que tava pensando.. o script sempre foge dos policiais, porem, se ele fizer uma ação boa na frente dos policiais, os pontos sao dobrados. Entao, se ao inves de fugir, quando estiver abaixo de 200 PROCURAR policiais e fazer ações boas. Senao, gasta muito dinheiro e tempo ;)

[ 13/12/2010 ]

- Correções na nova estrutura do site
- Retirada da lista de ações fixas. Agora ele analisa todas as ações do mapa para ver qual é a de maior risco e a de menor risco (função 'getUpDownRiskObj()').
- Inclusão da variável 'attackProportion' que é a porcentagem em relação ao seu poder de ataque que a ação pode exigir. O padrão é 90%. Por exemplo: Se o seu poder de ataque é 100, então o script vai selecionar ações que exigem no máximo 90 de ataque.
- Inclusão de um contador para saber quando a ação será executada (função 'counter()').
- Quando tem policial no mapa ele faz uma analise do mapa adjacente. Se o link do mapa do adjacente cair na Cidade, então ele volta para a Minha Rua e tenta outra direção. A idéia é dar a volta em todos os mapas adjacentes até voltar para a Minha Rua.
- Exibindo mais dados, exibie o nome da ação e o link que será utilizado

*/

// Ajuste para funcionar GM_getValue no Google Chrome
// http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome
// typeof this.GM_getValue != 'function' 
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}

if (window.chrome) {
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  unsafeWindow = div.onclick();
};

if( typeof($) === 'undefined' ) $ = unsafeWindow.jQuery;

// Só para facilitar a visualização no log de execução do navegador
var debugSessionId = Math.round(Math.random()*1000000000);

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

// Indicador se já está participando do motim da cadeia
var autoPlayRiotIn = getValue("config_autoPlayRiotIn__", 0);
var autoPlayJail = 0;

// Proporção de ataque necessário para considerar que a ação terá sucesso
// Ou seja: O valor de attack necessário para executar a ação deve ser no máximo 90% em relação ao nível de attack do personagem
var attackProportion = parseInt(getValue("config_attackProportion__", "90"));

// Intervalo entre uma jogada e outra (milisegundos)
var autoPlayInterval = getValue("config_autoPlayInterval__", 10000);

// Nivel minimo para subir a stamina
var autoPlayMinStamina = getValue("config_autoPlayMinStamina__", 30);

// Maneira que vai subir a stamina
var autoPlayTypeUpStamina = getValue("config_autoPlayTypeUpStamina__", "cafe");

// Link para subir a stmaina através do café
var autoPlayCofeeLink = getValue("config_autoPlayCofeeLink__", "cofemachine.drink-cafe/5");

// Configurações do bar para subir a stamina
var autoPlayBarId   = getValue("config_autoPlayBarId__", 0);
var autoPlayDrinkId = getValue("config_autoPlayDrinkId__", 0);

// Nivel minimo para ir para o hospital
var autoPlayMinLife = getValue("config_autoPlayMinLife__", 70);

// Nivel mínimo de intoxicação
var autoPlayMinToxic = getValue("config_autoPlayMinToxic__", 50);

// Tempo de espera para desintoxicaão
var autoPlayToxicWait = getValue("config_autoPlayToxicWait__", 60000);

// Nivel máximo e mínimo de intoxicação
var autoPlayMaxToxic = getValue("config_autoPlayMaxToxic__", 100);
var autoPlayMinToxic = getValue("config_autoPlayMinToxic__", 50);

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
d
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
"kid.school"            + "\n" +
    "mother.help"       + "\n" +
    "drunk.soberize"    + "\n" +
    "garbage.clean"     + "\n" +
    "postman.rob"       + "\n" +
    "postman.cheat"     + "\n" +
    "postman.help"      + "\n" +
    "dog.help"          + "\n" +
    "shaft.move"        + "\n" +
    "drugdealer.police" + "\n" +
    "soccerboy.play"    + "\n" +
    "lazyboy.pillow"    + "\n" +
    "drunk.cash"        + "\n" +
    "kid.school"        + "\n" +
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
        div.style.display = "none";
        tempCounter = -1;
        return;
    }
    else 
    {
        div.style.display = "block";
        div.style.zIndex = 1000;
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

var logCounter = 0;
function printLogMessage(msg)
{
    GM_log("[" + debugSessionId + "] (" + (++logCounter) + ") " + msg);
}

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
    printLogMessage("Buscando UpRisk e DownRisk");

    if( !unsafeWindow.MAP || unsafeWindow.MAP.map != "map" ) return;
    
    // Existe uma variável global dentro do site do jogo .. nessa variável MAP estão todos os links de ação
    var MAP = unsafeWindow.MAP.data;
    
    // Se a configuração for de busca automática, então busca pelas ações disponíveis ...
    if( autoPlayUpDownRiskMethod == "auto" )
    {
        for( var i = 0; i < MAP.length; i++ )
        {
            for( var j = 1; j < MAP[i].length; j++)
            {
                // Recupera o nivel de ataque necessário para esta ação
                var limiteAtaque = parseInt(MAP[i][0][2].replace(" ",""));
                if( !limiteAtaque ) limiteAtaque = 0

                // Se o nível de attack que a ação exige for maior do que ó mínimo necessário, então vai para o próximo
                if( limiteAtaque > (userAttack * (parseInt(attackProportion)/100)) ) continue;

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

        var sairLoop = false;
        for( var list = 0; list < autoPlayUpRiskList.length; list++)
        {
            for( var i = 0; i < MAP.length; i++ )
            {
                for( var j = 1; j < MAP[i].length; j++)
                {                    
                    // Recupera o nivel de ataque necessário para esta ação
                    var limiteAtaque = parseInt(MAP[i][0][2].replace(" ",""));
                    if( !limiteAtaque ) limiteAtaque = 0
                    
                    // Se o nível de attack que a ação exige for maior do que o mínimo necessário, então vai para o próximo
                    if( limiteAtaque > (userAttack * (parseInt(attackProportion)/100)) ) continue;
                    
                    // Se a stamina necssária não for suficiente, pula para o outro
                    if( parseInt(MAP[i][j][2]) > userStamina ) continue;

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
                    // Recupera o nivel de ataque necessário para esta ação
                    var limiteAtaque = parseInt(MAP[i][0][2].replace(" ",""));
                    if( !limiteAtaque ) limiteAtaque = 0
                    
                    // Se o nível de attack que a ação exige for maior do que ó mínimo necessário, então vai para o próximo
                    if( limiteAtaque > (userAttack * (parseInt(attackProportion)/100)) ) continue;
                    
                    // Se a stamina necssária não for suficiente, pula para o outro
                    if( parseInt(MAP[i][j][2]) > userStamina ) continue;

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
    printLogMessage("Recuperando o link do café");

    if( !unsafeWindow.MAP ) return null;

    // Existe uma variável global dentro do site do jogo .. nessa variável MAP estão todos os links de ação
    var MAP = unsafeWindow.MAP.data;

    for( var i = 0; i < MAP.length; i++ )
    {
        for( var j = 1; j < MAP[i].length; j++)
        {        
            // Recupera o link do café
            if( MAP[i][j][0].search(autoPlayCofeeLink) >= 0 )
            {
                return "/map/" + MAP[i][j][0] + "?z=" + unsafeWindow.req_id;
            }
        }
    }

    return null;
}

function isCopHere()
{
    printLogMessage("Verifica se tem policial");

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
    if( sObj == "reload" ) window.location.reload();
    else if( typeof(sObj) == "object" ) { sObj.submit(); }
    else window.location.href = sObj;
}

function autoPlayOn()
{
    if( autoPlay )
    {
        printLogMessage("Processando Auto Play");
        
        // Se tem um link definido, então roda ele ...
        if( autoPlayActiveUrl )
        {
            activeLink( autoPlayActiveUrl );
            return;
        }
        
        // verifica se pode interromper o processo de desintoxicação
        if( autoPlayDirection == "downToxic" && userToxic < autoPlayMinToxic )
        {
            // Volta do jeito que tava
            autoPlayDirection = getValue("AutoPlayDirection__");
        }
        
        getUpDownRiskObj();

        // ******************************************
        //
        // Se não tem link definido ... então analisa cenário para on AutoPlay
        //

        var oLog = document.getElementById(autoPlayLogId);
        var success = false;

        oLog.innerHTML = "AutoPlay ON (Analisando ...)";
        
        // Verifica se está na cadeia ... e se não está no motim ...
        if( autoPlayJail && !autoPlayRiotIn )
        {
            // Se já estiver na tela da prizão, então entra no motim
            if( window.location.href.search(/(jail)/) > 0 )
            {
              oLog.innerHTML = "AutoPlay ON (Cadeia)<br><span class='riot'></span> Entrando no motim ...";
              setValue("config_autoPlayRiotIn__", 1);
              
              var riot_id = $(".content-wrap .body form input[name='riot[id]']").val();
  
              autoPlayActiveUrl = $("<form method='post' action='/jail/do-riot'>" +
                                    "  <input type='hidden' value='" + unsafeWindow.req_id + "' name='z'>" +
                                    "  <input type='hidden' name='riot[submit]' value='Eu estou dentro'>" +
                                    "  <input type='hidden' name='riot[id]' value='" + riot_id + "'>" +
                      						  "</form>").appendTo("body");
            }
            // Se não estiver, entao vai pra lá
            else
            {
              oLog.innerHTML = "AutoPlay ON (Cadeia)<br><span class='u-jl'></span> Entrando no motim ...";
              autoPlayActiveUrl = "/jail/riot?z=" + unsafeWindow.req_id;
            }               
        } 
                
        // verifica se está na tela da Minha Rua
        else if( (!unsafeWindow.MAP || unsafeWindow.MAP.map != 'map') )
        {
            oLog.innerHTML = "AutoPlay ON (Não está na sua rua!)<br>";
            autoPlayActiveUrl = getUserMapUrl();

            // Se não estiver no mapa da rua, então zera tudo para começar denovo
            if( window.location.href.search(/(hospital|bar)/) > 0 )
            {
                oLog.innerHTML += "<span class='map'></span> Voltando para a Minha Rua ...";
                autoPlayMapOrderIdx = 0; // Zera direção do mapa ...
                setValue("AutoPlayMapIdx__",autoPlayMapOrderIdx);
            }
            // Se está na cadeia, deixa na tela de tumulto ...
            else if( autoPlayJail )
            {
                oLog.innerHTML += "<span class='riot'></span> Acompanhando revolta ...";
                autoPlayActiveUrl = "/jail/riot?z=" + unsafeWindow.req_id;
                autoPlayInterval = 15000; // espera 15 seg para tentar novamente
            }
            else if( !document.getElementById('map') )
            {
                oLog.innerHTML += "span class='map'></span> Tentando ir para lá ...";
                autoPlayInterval = 60000; // espera 1 minuto para tentar novamente
                setValue("AutoPlayMapIdx__",0); // zera a direção do mapa
            }
            else if( unsafeWindow.MAP && unsafeWindow.MAP.map == 'city' && getValue("AutoPlayCopEscape__") == 1 )
            {
                // Se esta na cidade e estava fugindo da policia, entã significa que aquela direção não leva a outro mapa ..
                // por isso faz esse ajuste na próxima direção ...

                oLog.innerHTML += "span class='map'></span> Tentando outra direção ...";
                setValue("AutoPlayCopEscapeFail__",1);
            }
        }

        // verifica se precisa renovar a vida
        else if( userLife < autoPlayMinLife )
        {
            // Se já está no hospital, então envia o FORM
            oLog.innerHTML = "AutoPlay ON (Hospital!)<br><span class='life'></span> Curando ...";
            autoPlayActiveUrl = $("<form method='post' action='/hospital/heal'>" +
                                  "  <input type='hidden' value='" + unsafeWindow.req_id + "' name='z'>" +
                                  "  <input type='hidden' name='f[submit]' value='Recuperar vida'>" +
                    						  "</form>").appendTo("body");
        }

        // verifica se tem policia e está subindo o risco ...
        else if( isCopHere() && autoPlayDirection == "upRisk" )
        {
            oLog.innerHTML = "AutoPlay ON (Policial!)<br><span class='cop-on'></span> Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx] + "<br>";
            autoPlayActiveUrl = getMapDirectionUrl();
            oLog.innerHTML += autoPlayActiveUrl;
        }

        // verifica se precisa de café
        else if( userStamina < autoPlayMinStamina )
        {
            if( autoPlayTypeUpStamina == "cafe")
            {
              // Se for tomar café então recupera o link e toma o café
              autoPlayActiveUrl = getUpStaminaUrl();
              oLog.innerHTML = "AutoPlay ON (Café!)<br><span class='stamina'></span> " + autoPlayActiveUrl;
            }
            else
            {
              // Se for tomar o drink, então montar FORM e envia ...
              oLog.innerHTML = "AutoPlay ON (Drink!)<br><span class='drink'></span> Tomando drink...";
              autoPlayActiveUrl = $("<form method='post' action='/bar/use/" + autoPlayBarId + "/drink'>" +
                                    "  <input type='hidden' value='" + unsafeWindow.req_id + "' name='z'>" +
                                    "  <input type='hidden' value='" + autoPlayDrinkId + "' name='biid'>" +
                      						  "</form>").appendTo("body");
            }
        
        }
        
        // verifica se precisa pausar um pouco para desintoxicar
        else if( autoPlayDirection == "downToxic" || userToxic > autoPlayMaxToxic )
        {
            autoPlayActiveUrl = "reload";

            oLog.innerHTML = "AutoPlay ON (Desintoxicando)<br><span class='toxic'></span> Esprando um pouco antes de voltar";
            autoPlayInterval = autoPlayToxicWait;
        }

        // verifica se é para abaixar o risco
        else if( autoPlayDirection == "downRisk" )
        {
            autoPlayActiveUrl = autoPlayDownRiskObj.url;

            if( autoPlayActiveUrl )
            oLog.innerHTML = "AutoPlay ON (Diminuindo Risco)<br><b class='sm_doubt'>&nbsp;</b> " + autoPlayDownRiskObj.nome + "<br>" + autoPlayActiveUrl;
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
            oLog.innerHTML = "AutoPlay ON (Aumentando Risco)<br><span class='gun'></span> " + autoPlayUpRiskObj.nome + "<br>" + autoPlayActiveUrl;
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
    printLogMessage("Ligando/Desligando o Auto Play");

    autoPlay = !autoPlay;

    setValue("AutoPlay__",((autoPlay)?"1":"0"));

    printLogMessage("Resultado = " + autoPlay);

    if( autoPlay )
    {
        autoPlayOn();
    }
    else
    {
        document.getElementById(autoPlayLogId).innerHTML = "AutoPlay OFF";
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
            autoPlayJail = 1;

            var div = document.getElementById('msgbox');
            if( div )
            {
                div = div.getElementsByClassName('minfo');
                if( div.length > 0 )
                {
                    var span = div[0].getElementsByTagName('span');
                    if( span )
                    {
                      var tempo = span[0].innerHTML;
                      newText.innerHTML += " até " + getDate(tempo);
                    }
                }
            }
            
        }
        else if( aA[0].href.match("map") )
        {
            var text = aA[0].innerHTML;
            newText.innerHTML = "Status " + text;

            // Quando não estiver na cadeia ... então zera a variável ...
            setValue("config_autoPlayRiotIn__", 0);
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

function exibeOcultaCafe()
{
    var div = document.getElementById("autoPlay_configDiv");
    var value = $("input.autoPlayTypeUpStamina:checked",div).val();
    
    if( value == "cafe" )
    {
        $(".celula_cafe",div).css("display","block");
        $(".celula_drink",div).css("display","none");
    }
    else
    {
        $(".celula_cafe",div).css("display","none");
        $(".celula_drink",div).css("display","block");
    }
}

function configDialogSave()
{
    var div = document.getElementById("autoPlay_configDiv");
    var tempList;

    autoPlayInterval = $(".autoPlay_config_intervalo",div).val();
    autoPlayToxicWait = $(".autoPlay_config_espera",div).val();
    attackProportion = $(".autoPlay_config_proporcao",div).val();
    // --
    autoPlayMinStamina = $(".autoPlay_config_cafe",div).val();
    autoPlayTypeUpStamina = $(".autoPlayTypeUpStamina:checked",div).val();
    autoPlayCofeeLink = $(".autoPlayCofeeLink",div).val();
    autoPlayBarId   = $(".autoPlayBarId",div).val();
    autoPlayDrinkId = $(".autoPlayDrinkId",div).val();
    // --
    autoPlayMinLife = $(".autoPlay_config_vida",div).val();
    // --
    autoPlayUpRiskLimit = $(".autoPlay_config_riscoMax",div).val();
    autoPlayDownRiskLimit = $(".autoPlay_config_riscoMin",div).val();
    autoPlayUpDownRiskMethod = $("input.autoPlay_config_listaAcoes:checked",div).val();
    // --
    autoPlayMaxToxic = $(".autoPlay_config_toxicMax",div).val();
    autoPlayMinToxic = $(".autoPlay_config_toxicMin",div).val();

    // ------
    
    tempList = $(".autoPlay_config_navegacao",div).val();
    setValue("config_autoPlayMapOrder__", tempList);

    autoPlayMapOrder = new Array();
    tempList = tempList.split("\n");
    for( i=0; i<tempList.length; i++)
        autoPlayMapOrder[i] = tempList[i];
    
    // ------
    
    tempList = $(".autoPlay_config_listaAcoes.up",div).val();
    setValue("config_autoPlayUpRiskList__", tempList);

    autoPlayUpRiskList = new Array();
    tempList = tempList.split("\n");
    for( i=0; i<tempList.length; i++)
        autoPlayUpRiskList[i] = tempList[i];
      
    // ------
    
    tempList = $(".autoPlay_config_listaAcoes.down",div).val();
    setValue("config_autoPlayDownRiskList__", tempList);

    autoPlayDownRiskList = new Array();
    tempList = tempList.split("\n");
    for( i=0; i<tempList.length; i++)
        autoPlayDownRiskList[i] = tempList[i];

    // ------

    setValue("config_autoPlayInterval__", autoPlayInterval);
    setValue("config_autoPlayToxicWait__", autoPlayToxicWait);
    setValue("config_attackProportion__", attackProportion);
    setValue("config_autoPlayMinStamina__", autoPlayMinStamina);
    setValue("config_autoPlayTypeUpStamina__", autoPlayTypeUpStamina); 
    setValue("config_autoPlayCofeeLink__", autoPlayCofeeLink); 
    setValue("config_autoPlayBarId__", autoPlayBarId);
    setValue("config_autoPlayDrinkId__", autoPlayDrinkId); 
    setValue("config_autoPlayMinLife__", autoPlayMinLife);
    setValue("config_autoPlayUpRiskLimit__", autoPlayUpRiskLimit);
    setValue("config_autoPlayDownRiskLimit__", autoPlayDownRiskLimit);
    setValue("config_autoPlayUpDownRiskMethod__", autoPlayUpDownRiskMethod);
    setValue("config_autoPlayMaxToxic__", autoPlayMaxToxic);
    setValue("config_autoPlayMinToxic__", autoPlayMinToxic);

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
    newDiv.style.top = "30px";
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
    
    var ataqueEquivalente = Math.round(userAttack * (parseInt(attackProportion)/100));

    var table = $("<table width='100%' cellspacing='0' cellpadding='3'>" +
        "<tr><td colspan='2' style='font-size: 18px'><strong>Configurações</strong><hr></td></tr>" +
        "<tr><td width='160'>Intervalo entre Ações:</td><td><input class='autoPlay_config_intervalo' type='text' value='" + autoPlayInterval + "' size='6'> milisegundos</td></tr>" +
        "<tr><td width='160'>Espera para baixar intoxicação:</td><td><input class='autoPlay_config_espera' type='text' value='" + autoPlayToxicWait + "' size='6'> milisegundos</td></tr>" +
        "<tr><td width='160'>Proporção de Ataque:</td><td><input class='autoPlay_config_proporcao' type='text' value='" + attackProportion + "' size='2' maxlngth='3'> % ( = " + ataqueEquivalente + " no máx. de ataque)</td></tr>" +
        "<tr><td width='160' valign='top'>Mínimo para subir a stamina:" +
        "  <br><input type='radio' class='autoPlayTypeUpStamina' name='acao_stamina' value='cafe' " + ((autoPlayTypeUpStamina == "cafe")?"checked":"") + ">Maquina de Café" +
        "  <br><input type='radio' class='autoPlayTypeUpStamina' name='acao_stamina' value='drink' " + ((autoPlayTypeUpStamina == "drink")?"checked":"") + ">Drink no Bar</td>" +
        " <td><input class='autoPlay_config_cafe' type='text' value='" + autoPlayMinStamina + "' size='2'> stamina" +
        "     <div class='celula_cafe' style='margin-top: 5px;'>Link para maq. do café: &nbsp; <input type='text' class='autoPlayCofeeLink' value='" + autoPlayCofeeLink + "' size='30'></div>" +
        "     <div class='celula_drink' style='width: 100%'><table width='100%'>" +
        "      <tr><td width='60'>Cód. Bar:</td><td><input type='text' class='autoPlayBarId' value='" + autoPlayBarId + "' size='6'></td><td rowspan='2'>Para recupera os códigos entre<br>na página do bar e na linha do drink desejado clique no link <u>utilizar</u>.</td></tr>" +
        "      <tr><td width='60'>Cód. Drink:</td><td><input type='text' class='autoPlayDrinkId' value='" + autoPlayDrinkId + "' size='6'></td></tr>" +
        "     </table></div>" +
        "</td></tr>" +
        "<tr><td width='160'>Mínimo para ir no hospital:</td><td><input class='autoPlay_config_vida' type='text' value='" + autoPlayMinLife + "' size='2'> life</td></tr>" +
        "<tr><td width='160' valign='top'>Limite de Risco:</td><td><input class='autoPlay_config_riscoMin' type='text' value='" + autoPlayDownRiskLimit + "' size='2'> (mín) até <input class='autoPlay_config_riscoMax' type='text' value='" + autoPlayUpRiskLimit + "' size='2'> (máx)</td></tr>" +
        "<tr><td width='160' valign='top'>Limite de Intoxicação:</td><td><input class='autoPlay_config_toxicMin' type='text' value='" + autoPlayMinToxic + "' size='2'> (mín) até <input class='autoPlay_config_toxicMax' type='text' value='" + autoPlayMaxToxic + "' size='2'> (máx)</td></tr>" +
        "<tr><td width='160' valign='top'>Lista das Ações:" +
        "  <br><input class='autoPlay_config_listaAcoes' type='radio' name='autoPlay_config_listaAcoes' value='auto' " + ((autoPlayUpDownRiskMethod == "auto")?"checked":"") + "> Automático " +
        "  <br><input class='autoPlay_config_listaAcoes' type='radio' name='autoPlay_config_listaAcoes' value='manual' " + ((autoPlayUpDownRiskMethod == "manual")?"checked":"") + "> Manual (um em cada linha)</td>" +
        " <td><span class='autoPlay_config_listaAcoes' style='display: none'>AUTOMÁTICO</span>" +
        "     <table width='100%' cellspacing='0' cellpadding='2' class='autoPlay_config_listaAcoes' style='display: none'>"+
        "     <tr><td>Subir Risco (roubar)</td><td>Descer Risco (ajudar)</td></tr>" +
        "     <tr><td><textarea class='autoPlay_config_listaAcoes up' style='width: 100%; height: 100px;'></textarea></td>" +
        "         <td><textarea class='autoPlay_config_listaAcoes down' style='width: 100%; height: 100px;'></textarea></td>" +
        "     </tr></table></td></tr>" +
        "<tr><td width='160' valign='top'>Ordem de Navegação:<br>(um em cada linha)</td><td><textarea class='autoPlay_config_navegacao' style='width: 100%; height: 100px'></textarea></td></tr>" +
        "<tr><td colspan='2' align='right'><input class='autoPlay_config_buttonSave' type='button' value='SALVAR'> &nbsp; <input class='autoPlay_config_buttonCancel' type='button' value='CANCELAR'></td></tr>" +
        "</table>")[0];

    newDiv.appendChild(table);

    document.getElementsByTagName('body')[0].appendChild(newDiv);

    $(".autoPlay_config_buttonSave",newDiv).click(configDialogSave);
    $(".autoPlay_config_buttonCancel",newDiv).click(configDialogCancel);
    $("input.autoPlay_config_listaAcoes",newDiv).click(exibeOcultaLista);
    $("input.autoPlayTypeUpStamina",newDiv).click(exibeOcultaCafe);
    
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
    exibeOcultaCafe();
    
    $(newDiv).fadeIn();
}

// ============================================================= [ Build Data Div ] ===

function builDataDiv(div) {

    printLogMessage("Construindo DIV");
        
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
    timerDiv.style.display = "none";
    timerDiv.style.position = "absolute";
    timerDiv.style.left = "-67px";
    timerDiv.style.top = "-1px";
    timerDiv.style.border = "solid 1px white";
    timerDiv.style.borderRight = "solid 1px black";
    timerDiv.style.width = "55px";
    timerDiv.style.fontSize = "32px";
    timerDiv.style.textAlign = "right";
    timerDiv.style.paddingRight = "10px";
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

    div.appendChild(newDiv);

}

// ============================================================= [ Initialize ] ===

function init()
{
    if( unsafeWindow.autoPlayInitialized ) return;
    
    unsafeWindow.autoPlayInitialized = true;

    printLogMessage("Inicializando");
    
    try
    {
      userLife    = parseInt(extractUserValue("p-life"));
      userStamina = parseInt(extractUserValue("p-stamina"));
      userRisk    = parseInt(extractUserValue("p-risk"));
      userToxic   = parseInt(extractUserValue("p-toxic"));
      userQuest   = extractUserValue("p-quest");
      
      userAttack   = extractUserProps("attack1");
      userRespect  = extractUserProps("respect");
      userIntelect = extractUserProps("intelect");
      userStrength = extractUserProps("strength");
      userSexapeal = extractUserProps("sexapeal");
      userCash     = extractUserProps("ucash");
    }
    catch(err)
    {
      if(err.description)
      {
        txt="There was an error on this page.\n\n";
        txt+="Error description: " + err.description + "\n\n";
        txt+="Click OK to continue.\n\n";
        alert(txt);
      }
    }

    printLogMessage("Dados coletados");

    // -------------
    
    // Se for a página do bar, então tem um tratamento diferente ...
    if( window.location.href.search("bar") > 0 )
    {
      var posStart   = window.location.href.search("bar") + 5; 
      var posEnd     = window.location.href.search("z=") - 1;
      var codigoDrink, codigoBar = window.location.href.substr(posStart, posEnd - posStart); 

      // Ver se a URL da página tem os parametros configBar e drinkId para configurar as variáveis de subir stamina
      if( window.location.href.search("configDrink") > 0 )                             
      {
        posStart = window.location.href.search("configDrink") + ("configDrink=").length;
        posEnd   = window.location.href.length;
        
        codigoDrink = window.location.href.substr(posStart, posEnd - posStart);
        
        // ----
        
        autoPlayBarId   = codigoBar; 
        autoPlayDrinkId = codigoDrink; 
        
        setValue("config_autoPlayBarId__", autoPlayBarId);
        setValue("config_autoPlayDrinkId__", autoPlayDrinkId);
        
        alert("Codigos configurados.\n\nBar: " + codigoBar + "\nDrink: " + codigoDrink);
      }
      
      // Se não tivr, etão inclue os link de 'utilize'
      else
      {
        var tableDrink = $("table#ttp tr:gt(0)");
        
        tableDrink.each(function() {
          codigoDrink = $(this).find("form input[name=biid]").val();
          $(this).append("<td>(<a href='" + window.location.href + "&configDrink=" + codigoDrink + "'>utilizar</a>)</td>");
        });
      }
                      
    }

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
    
    if( userRisk !== '' )
    {
      var tempDirection = getValue("AutoPlayDirection__");
      autoPlayDirection = ( tempDirection && tempDirection.length > 0 ) ? tempDirection : "upRisk";
  
      if( autoPlayDirection == "upRisk" && userRisk > autoPlayUpRiskLimit ) autoPlayDirection = "downRisk";
      if( autoPlayDirection == "downRisk" && userRisk < autoPlayDownRiskLimit ) autoPlayDirection = "upRisk";
  
      setValue("AutoPlayDirection__",autoPlayDirection);
    }

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
    builDataDivWait();

}

function builDataDivWait()
{
    var oDivProps = document.getElementsByClassName('right-col');
    
    if(oDivProps.length > 0) {
      builDataDiv(oDivProps[0]);
      if( autoPlay ) autoPlayOn();
      return;
    }
    
    setTimeout(builDataDivWait,100);
}

init();