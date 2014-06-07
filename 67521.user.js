// ==UserScript==
// @name       NeoBux BR
// @namespace    http://userscripts.org/users/129562
// @description  This script provides detailed statistics for your NeoBux account and referrals (ages of referrals, recent income/outcome averages, plus more).
// @include    http://www.neobux.com/c/
// @include    http://www.neobux.com/c/rl/*
// @include    http://www.neobux.com/c/rs/
// @license    GNU General Public License v3.0
// @version    3.4.111214.1600
// ==/UserScript==

(function () {
    var version = "3.4.111214.1600";
    var root = "greasemonkey.scriptvals.http://userscripts.org/users/129562/NeoBux BR.";
    var loggingLevel = [0];
// Log Type
// x = debugging;
// 0 = No Logging;
// 1 = Log Everything;
// 2 = Function Calls;
// 3 = CurrentPage Reasoning;
// 4 = CurrentPage outcome;
// 5 = Account stats;
// 6 = Graph details;
// 7 = Referral details;
// 8 = Manipulating preferences;
// 9 = NumDaysSince();
// 10 = graphProperties();
// 11 = neobuxString();
// 12 = graphProperties() && referral details --> detailed

// DEFINE Language Strings used by NeoBux
    var neobuxLangStrings = {
// Language strings for the actual NeoBux website
// To allow the script to run in English and other languages
        US: {
            "noClicks": "No clicks yet",
            "today": "Today",
            "yesterday": "Yesterday"
        },
        PT: {
            "noClicks": "Sem cliques",
            "today": "Hoje",
            "yesterday": "Ontem"
        },
        ES: {
            "noClicks": "Sin clics aún",
            "today": "Hoy",
            "yesterday": "Ayer"
        },
        GR: {
            "noClicks": "Χωρίς κλικ",
            "today": "Σήμερα",
            "yesterday": "Χθες"
        },
        ID: {
            "noClicks": "Belum ada klik",
            "today": "Hari ini",
            "yesterday": "Kemarin"
        },
        FI: {
            "noClicks": "Ei klikkejä",
            "today": "Tänään",
            "yesterday": "Eilen"
        },
        SE: {
            "noClicks": "Inga klick",
            "today": "Idag",
            "yesterday": "Igår"
        },
        DE: {
            "noClicks": "Keine Klicks",
            "today": "Heute",
            "yesterday": "Gestern"
        },
        FR: {
            "noClicks": "Pas de clics",
            "today": "Aujourd'hui",
            "yesterday": "Hier"
        }
    };

  // DEFINE Language Strings used by the Script
  var scriptLangStrings = {
    // Language Strings used by the script
    // List of country codes: http://www.iso.org/iso/english_country_names_and_code_elements
    US: {
      // English = US
      // REFERRAL STATISTICS PAGE
      "totalClickAvg": "Total Click Avg.",
      "lastdaysClickAvg": "Click Avg.",
      "totalClicks": "Total Clicks",
      "clicked": "Clicked",
      "clickedToday": "Clicked Today",
      "clickedYday": "Clicked Yesterday",
      "others": "Other Day",
      "dailyNetIncome": "Daily Net Income",
      "avgIncome": "Avg. Income",
      "avgExpenses": "Avg. Expenses",
      "avgARecycling": "Avg. A. Recycling",
      "avgTransfersRB": "Avg. Transfers RB",
      "avgTransfersGPB": "Avg. Transfers GPB",
      // GRAPHS
      "DirectReferralclickscredited": "Direct Referral clicks credited",
      "RentedReferralclickscredited": "Rented Referral clicks credited",
      "RecyclingCosts": "Recycling Costs",
      "AutopayCosts": "Autopay Costs",
      "TransfersToRentalBalance": "Transfers To Rental Balance",
      "RenewalCosts": "Renewal Costs",
      "ScheduledRenewals": "Scheduled Renewals",
      "Exportingto": "Exporting to",
      "Exportingastext": "Exporting as Text..",
      "PersonalClicks": "Personal Clicks",
      "OwnClicks": "Own Clicks", 
      // STATISTICS SUMMARY (SIDEBAR)
      "statsSum": "Statistics Summary",
      "today": "Today",
      "yesterday": "Yesterday",
      "rented": "Rented",
      "rentedReferrals": "Rented Referrals",
      "direct": "Direct",
      "directReferrals": "Direct Referrals",
      "clicks": "Clicks",
      "avg": "avg",
      "avgs": "avgs",
      "average": "Average",
      "raverage": "R.Average", // Real Average
      "averages": "Averages",
      "expenses": "Expenses",
      "Recycle": "Recycle",
      "autopay": "Autopay",
      "renew": "Renew",
      "net": "Net",
      "projectedNet": "Projected Net",
      "last": "Last",
      "totals": "Totals",
      "Days": "Days",
      "recycled": "Recycled",
      "autopaid": "Autopaid",
      "updateScript": "Update Script",
      "refferalsToBeRenewed": "Referrals to be Renewed",
      "recycledLast": "Recycled in Last",
      "autopaidLast": "Autopaid in Last",
      "totalReferrals": "Total Referrals:",
      "income": "Income",
      "stats": "Stats",
      "summary": "Summary",
      "projectedIncome": "Projected Income",
      "zeroClickers": "No Day",
      "automaticRecycling": "A. Recycling", // Automatic Recycling
      "Profit": "Profit",
      "ExactAVG": "<i>Appr. | Exact</i>",
      "Exact": "Exact",
      "Exact#": "Exact",
      "Morethan": "More than",
      "Never": "Never <br/>reached a minimum of days required",
      "clicksRemaining": "Remaining",
      "provided": "Provided",
      "remainingNet": "Net Remaining",
      "incomeRemaining": "Remaining",
      "amount": "Amount",    
      // FLAGS
      "W": "W", // White Flag
      "R": "R", // Red Flag
      "O": "O", // Orange Flag
      "Y": "Y", // Yellow Flag
      "G": "G", // Green Flag
      "Bl": "Bl", // Blue Flag
      "P": "P", // Pink Flag
      "Bk": "Bk", // Black Flag 
      // REFERRAL PROFIT POPUP
      "referral": "Referral",
      "expenses": "Expenses",
      "totalexpenses": "Total Expenses",
      "goldenFee": "Golden fee",
      "goldenPackFee": "Golden-Pack fee",
      "totalExpenses": "Total Expenses",
      "perRefPerDay": "per ref per day",
      "minimumAverage": "Minimum average",
      "toBreakEven": "to break even",
      "grossIn": "Gross In",
      "grossOut": "Gross Out",
      "currentProfit": "Current profit",
      "incl": "incl", // Including
      "recycle": "recycle",
      "netProfit": "Net Profit",
      "daysToPayForOwnRecycle": "Days to pay for own recycle",
      "day": "day",
      "hr": "hr",
      "hrs": "hrs",
      "min": "min",
      "mins": "mins",
      "per": "per",
      "day#": "Days that will be or have been spent to <br/>get return on investment and <br/>pay for recycling",
      "months": "months",
      "chosendaily": "Chosen Daily",
      "renewal": "renewal",
      "Renewals": "Renewals",
      "of": "of",
      "and": "and",
      // UPDATES
      "newUpdateFoundFor": "A new update has found for:",
      "updateDesc": "update note",
      "updateNow": "Update Now",
      "remindMeLater": "Remind me Later",
      "dismiss": "Dismiss",
      "forUpdates": "for updates",
      "for": "for",
      "enableUpdates": "%s: Enable updates",
      "disableUpdates": "Disable",
      "updates": "updates",
      "noUpdatesAvailableFor ": "No updates available for %s",
      "autoUpdates": "Automatic update",
        "newVersionAvailable": "A new version of the %s user script is available.",
      "currentVersion": "Current version: %s",
      "availableVersion": "Available version: %s",
      "notesAboutTheAvailableVersion": "Notes about the available version:\n%s",
        "doYouWishToUpdateTo": "Do you wish to update to %s?",
      "doYouWishToTurnOffAutoUpdates": "Do you want to turn off auto updating for this script?",
      "autoUpdatesCanBeReenabled": "Automatic updates can be re-enabled for this script from the User Script Commands submenu.",
      // MENUS
      "setAVGDays": "Set Days value for Average Interval",
      "avgDaysMsg": "Please enter days value for Averages.",
      "showSTD": "Show Standard Deviation",
      "on": "On",
      "off": "Off",
      "error": "Error",
      "days": "days",
      "editUpdateFrequency": "Edit Update Frequency",
      "checkForUpdates": "%s: Check for updates",
      // WINDOWS SETTINGS
      "Settings": "Settings",
      "Options": "Options",
      "MoreScripts": "More Neobux Scripts at",
      "SaveSettings": "Close",
      "NoteSave": "Note: Changes are saved immediately. <br/>You need to refresh the page to see changes. <br/>Press Escape to exit."
    } ,
    PT : {
      //Portugues = PT
      // REFERRAL STATISTICS PAGE
      "totalClickAvg": "M&eacute;dia de Cliques",
      "lastdaysClickAvg": "M&eacute;dia de Cliques",
      "totalClicks": "N&ordm; de Cliques",
      "clicked": "Clicaram",      
      "clickedToday": "Clicaram Hoje",
      "clickedYday": "Clicaram Ontem",
      "others": "Outro Dia",
      "dailyNetIncome": "Ganho Di&aacute;rio",
      "avgIncome": "M&eacute;dia de Ganhos",
      "avgExpenses": "M&eacute;dias de Despesas",
      "avgARecycling": "Avg. A. Recycling",
      "avgTransfersRB": "Avg. Transfers RB",
      "avgTransfersGPB": "Avg. Transfers GPB",
      // GRAPHS
      "DirectReferralclickscredited": "Cliques Creditados dos Referidos Diretos",
      "RentedReferralclickscredited": "Cliques Creditados dos Referidos Alugados",
      "RecyclingCosts": "Valor da Reciclagem",
      "AutopayCosts": "Valor do Autopagamento",
      "TransfersToRentalBalance": "Transfer&ecirc;ncias para o Saldo de Aluguer",
      "RenewalCosts": "Renova&ccedil;&otilde;es",
      "ScheduledRenewals": "Renova&ccedil;&otilde;es Agendadas",
      "Exportingto": "Exportando para",
      "Exportingastext": "Exportando como Texto..",
      "PersonalClicks": "Meus Cliques no Hor&aacute;rio do Meu Computador",
      "OwnClicks": "Meus Cliques no Hor&aacute;rio do Servidor",
      // STATISTICS SUMMARY (SIDEBAR)
      "statsSum": "Estat&iacute;sticas",
      "today": "Hoje",
      "yesterday": "Ontem",
      "rented": "Alugados",
      "rentedReferrals": "Referidos Alugados",
      "direct": "Diretos",
      "directReferrals": "Referidos Diretos",
      "clicks": "N&ordm; de Cliques e Valor Ganho",
      "avg": "M&eacute;dia",
      "avgs": "m&eacute;dias",
      "average": "N&ordm; de Cliques",
      "raverage": "M&eacute;dia Real", // Real Average
      "averages": "M&eacute;dia de Cliques",
      "expenses": "Despesas",
      "Recycle": "Reciclagem",
      "autopay": "AutoPagto.",
      "renew": "Renova&ccedil;&atilde;o",
      "net": "Lucro L&iacute;quido",
      "projectedNet": "Lucro Previsto",
      "last": "&Uacute;ltimos",
      "totals": "Resumo Geral",
      "Days": "Dias",
      "recycled": "Reciclados",
      "autopaid": "Autopagos",
      "updateScript": "Atualize o script",
      "refferalsToBeRenewed": "Referidos para renovar",
      "recycledLast": "Reciclados nos &uacute;ltimos",
      "autopaidLast": "Autopagos nos &uacute;ltimos",
      "totalReferrals": "N&ordm; de Referidos",
      "income": "Ganhos",
      "stats": "M&eacute;dia de Cliques",
      "summary": "Resumo",
      "projectedIncome": "Previsto",
      "zeroClickers": "Nenhum Dia",
      "automaticRecycling": "A. Recycling", // Automatic Recycling
      "Profit": "Lucro",
      "ExactAVG": "<i>Aprox. | Exata</i>",
      "Exact": "Exata",
      "Exact#": "Exata",
      "Morethan": "Mais de",
      "Never": "Nunca atingiu <br/>m&iacute;nimo de dias necess&aacute;rios",
      "clicksRemaining": "Restantes",
      "provided": "Prevista",
      "remainingNet": "Lucro Restante",
      "incomeRemaining": "Restantes",
      "amount": "Quantidade",
      // FLAGS
      "W": "Br", // White Flag
      "R": "Vm", // Red Flag
      "O": "Lr", // Orange Flag
      "Y": "Am", // Yellow Flag
      "G": "Vd", // Green Flag
      "Bl": "Az", // Blue Flag
      "P": "Rs", // Pink Flag
      "Bk": "Pt", // Black Flag 
      // REFERRAL PROFIT POPUP
      "referral": "Referido",
      "expenses": "Despesas",
      "totalexpenses": "Total de Despesas",
      "goldenFee": "Taxa Golden",
      "goldenPackFee": "Taxa Pacote Golden",
      "totalExpenses": "Total de Despesas",
      "perRefPerDay": "por ref. por dia",
      "minimumAverage": "M&eacute;dia M&iacute;nima",
      "toBreakEven": "para Retorno do Investimento",
      "grossIn": "Ganhos com o valor dos Cliques",
      "grossOut": "Gastos para o manter cadastrado",
      "currentProfit": "Lucro Atual",
      "incl": "incluindo", // Including
      "recycle": "reciclagem",
      "netProfit": "Lucro L&iacute;quido",
      "daysToPayForOwnRecycle": "Dias que restam p/ <br/>poder pagar sua reciclagem",
      "day": "dia",
      "hr": "hora",
      "hrs": "horas",
      "min": "minuto",
      "mins": "minutos",
      "per": "por",
      "day#": "Dias que ser&atilde;o ou foram gastos p/ <br/>ter retorno do investimento <br/>e pagar sua reciclagem",
      "months": "m&ecirc;s",
      "chosendaily": "Di&aacute;ria Escolhida",
      "renewal": "renova&ccedil;&atilde;o",
      "Renewals": "Renova&ccedil;&otilde;es",
      "of": "de",
      "and": "e",
      // UPDATES
      "newUpdateFoundFor": "Há uma nova atualização disponível para:",
      "updateDesc": "Notas da atualização",
      "updateNow": "Atualizar agora",
      "remindMeLater": "Lembre-me mais tarde",
      "dismiss": "Recusar",
      "forUpdates": "para atualizações",
      "for": "para",
      "enableUpdates": "%s: atualização ativada",
      "disableUpdates": "Desativada",
      "updates": "atualizações",
      "noUpdatesAvailableFor ": "Nenhuma atualização disponível para %s",
      "autoUpdates": "Atualização Automática",
      "newVersionAvailable": "Uma nova versão %s de script de usuário está disponível",
      "currentVersion": "Versão atual: %s",
      "availableVersion": "Versão Disponível: %s",
      "notesAboutTheAvailableVersion": "Notas sobre a atualização disponível:\n%s",
      "doYouWishToUpdateTo": "Você deseja atualizar para v%s?",
      "doYouWishToTurnOffAutoUpdates": "Deseja desativar a autalização automática para este script?",
      "autoUpdatesCanBeReenabled": "As atualizações automáticas podem ser reativadas para este script no submenu de comandos de script.",
      // MENUS
      "setAVGDays": "Selecione o nº de dias",
      "avgDaysMsg": "Selecione o nº de dias para a média.",
      "showSTD": "Mostrar divergência",
      "on": "Ativado",
      "off": "Desativado",
      "error": "Erro",
      "days": "dias",
      "editUpdateFrequency": "Editar Frequência da Atualização",
      "checkForUpdates": "Verificar Atualizações para %s",
      // WINDOWS SETTINGS
      "Settings": "Configura&ccedil;&otilde;es",
      "Options": "Op&ccedil;&otilde;es",
      "MoreScripts": "Mais Scripts Neobux em",
      "SaveSettings": "Fechar",
      "NoteSave": "Nota: As altera&ccedil;&otilde;es são salvas imediatamente. <br/>Atualize a p&aacute;gina para ver as altera&ccedil;&otilde;es. <br/>Pressione Esc caso queira sair."
    },
    ES : {
      //Spanish = ES
      // REFERRAL STATISTICS PAGE
      "totalClickAvg": "Promedio Total Avg.",
      "lastdaysClickAvg": "Click Avg.",
      "totalClicks": "Total Clicks",
      "clicked": "Clickean",      
      "clickedToday": "Clickean Hoy",
      "clickedYday": "Clickean Ayer",
      "others": "Otro Día",
      "dailyNetIncome": "Ganancia Neta Diaria",
      "avgIncome": "Medias Ganancia",
      "avgExpenses": "Medias Gastos",
      "avgARecycling": "Avg. A. Recycling",
      "avgTransfersRB": "Avg. Transfers RB",
      "avgTransfersGPB": "Avg. Transfers GPB",
      // GRAPHS
      "DirectReferralclickscredited": "Cliques Creditados dos Referidos Directos",
      "RentedReferralclickscredited": "Cliques Creditados dos Referidos Alquilados",
      "RecyclingCosts": "Valor da Reciclagem",
      "AutopayCosts": "Valor do Autopagamento",
      "TransfersToRentalBalance": "Transfer&ecirc;ncias para o Saldo de Aluguer",
      "RenewalCosts": "Renova&ccedil;&otilde;es",
      "ScheduledRenewals": "Renova&ccedil;&otilde;es Agendadas",
      "Exportingto": "Exportando para",
      "Exportingastext": "Exportando como Texto..",
      "PersonalClicks": "Meus Cliques no Hor&aacute;rio do Meu Computador",
      "OwnClicks": "Meus Cliques no Hor&aacute;rio do Servidor",
      // STATISTICS SUMMARY (SIDEBAR)
      "statsSum": "Resumen Estadisticas",
      "today": "Hoy",
      "yesterday": "Ayer",
      "rented": "Rentados",
      "rentedReferrals": "Referidos Alquilados",
      "direct": "Directos",
      "directReferrals": "Referidos Directos",
      "clicks": "Clicks",
      "avg": "Promedio",
      "avgs": "Promedios",
      "average": "Media",
      "raverage": "Media Real", // Real Average
      "averages": "Medias",
      "expenses": "Despesas",
      "Recycle": "Reciclaje",
      "autopay": "Autopago",
      "renew": "Renovación",
      "net": "Neto",
      "projectedNet": "Neto Proyectado",
      "last": "Ultimo",
      "totals": "Totales",
      "Days": "Días",
      "recycled": "Reciclado",
      "autopaid": "Autopago",
      "updateScript": "Actualizar Script",
      "refferalsToBeRenewed": "Referidos para Renovar",
      "recycledLast": "Reciclado en últimos",
      "autopaidLast": "Autopago en últimos",
      "totalReferrals": "Total Referidos:",
      "income": "Ganancia",
      "stats": "Estadísticas",
      "summary": "Resumen",
      "projectedIncome": "Ganancia Proyectada",
      "zeroClickers": "Ningún Día",
      "automaticRecycling": "A. Recycling", // Automatic Recycling
      "Profit": "Ganancia",
      "ExactAVG": "<i>Aprox. | Exacta</i>",
      "Exact": "Exacto",
      "Exact#": "Exacta",
      "Morethan": "Mais de",
      "Never": "Nunca atingiu <br/>m&iacute;nimo de dias necess&aacute;rios",
      "clicksRemaining": "Restantes",
      "provided": "Prevista",
      "remainingNet": "Ganancia Restante",
      "incomeRemaining": "Restantes",
      "amount": "Cantidad",
      // FLAGS
      "W": "B", // White Flag
      "R": "Rj", // Red Flag
      "O": "Nj", // Orange Flag
      "Y": "Am", // Yellow Flag
      "G": "V", // Green Flag
      "Bl": "Az", // Blue Flag
      "P": "Rs", // Pink Flag
      "Bk": "Ng", // Black Flag
      // REFERRAL PROFIT POPUP
      "referral": "Referido",
      "expenses": "Gastos",
      "totalexpenses": "Gastos totales",
      "goldenFee": "Costo del Golden",
      "goldenPackFee": "Coste Golden-Pack",
      "totalExpenses": "Total Gastos",
      "perRefPerDay": "por referido al día",
      "minimumAverage": "Promedio mínimo",
      "toBreakEven": "para cubrir costos",
      "grossIn": "Ingreso bruto",
      "grossOut": "Gastos brutos",
      "currentProfit": "Ganancia actual",
      "incl": "incl", // Including
      "recycle": "reciclaje",
      "netProfit": "Ganancia Neta",
      "daysToPayForOwnRecycle": "Días para pagar el reciclaje propio",
      "day": "dia",
      "hr": "hora",
      "hrs": "horas",
      "min": "minuto",
      "mins": "minutos",
      "per": "por",
      "day#": "Días que pasarán o han pasado para <br/>obtener el retonro de lo invertido <br/>y el pago por el reciclaje",
      "months": "meses",
      "chosendaily": "Di&aacute;rios",
      "renewal": "renova&ccedil;&atilde;o",
      "Renewals": "Renovaciones",
      "of": "de",
      "and": "y",
      // UPDATES
      "newUpdateFoundFor": "Encontrada una nueva Actualización para:",
      "updateDesc": "nota de Actualización",
      "updateNow": "Actualizar ahora",
      "remindMeLater": "Recordar más tarde",
      "dismiss": "Rechazar",
      "forUpdates": "para actualizaciones",
      "for": "for",
      "enableUpdates": "%s: Actualización activa",
      "disableUpdates": "no activa",
      "updates": "updates",
      "noUpdatesAvailableFor ": "No dispone actualizaciones para %s",
      "autoUpdates": "Actualización automatica",
      "newVersionAvailable": "Una nueva version de %s user script está disponible",
      "currentVersion": "Version actual: %s",
      "availableVersion": "Version disponible: %s",
      "notesAboutTheAvailableVersion": "Notas acerca de version disponible:\n%s",
      "doYouWishToUpdateTo": "Desea actualizar a v%s?",
      "doYouWishToTurnOffAutoUpdates": "¿Desea desactivar autoactualizar para este script?",
      "autoUpdatesCanBeReenabled": "Autoactualizar puede reactivarse para este script desde el submenú Comandos de script.",
      // MENUS
      "setAVGDays": "Entre valor para días intervalo de promedio",
      "avgDaysMsg": "Por favor entre el valor de días para Promedios.",
      "showSTD": "Mostrar Desviación Standard",
      "on": "On",
      "off": "Off",
      "error": "Error",
      "days": "días",
      "editUpdateFrequency": "Edite Frecuencia de Actualización",
      "checkForUpdates": "%s: Compruebe Actualizaciones",
        // WINDOWS SETTINGS
      "Settings": "Configuraciones",
      "Options": "Opciones",
      "MoreScripts": "Más Scripts Neobux en ",
      "SaveSettings": "Cerca",
      "NoteSave": "Nota: Los cambios se guardan inmediatamente. <br/>Es necesario refrescar la página para ver los cambios. <br/>Pulse la tecla Esc para salir.."
    }
  };

// Check if the Greasemonkey API functions are present
// If not, add/insert them
    var GM = {
        getValue: (function () {
            var testString;
            if (typeof GM_getValue === "function" &&
                    (typeof GM_getValue.toString !== "function" ||
                    GM_getValue.toString().indexOf("is not supported") === -1)) {
                    testString = "test" + (new Date()).getTime();
                    if (GM_getValue(testString, testString) === testString) {
                      return function (name, defaultValue) {
                        return GM_getValue(name, defaultValue);
                      };
                } else {
                return function (name, defaultValue) {
                    var value;
                    value = GM_getValue(name, defaultValue);
                    if (value === undefined) {
                        return defaultValue;
                    } else {
                        return value;
                    }
                };
                }
            } else if (typeof localStorage === "object" &&
                        typeof localStorage.getItem === "function") {
                return function (name, defaultValue) {
                    var value;
                    name = root + name;
                    value = localStorage.getItem(name);
                    if (value === null) {
                        return defaultValue;
                    } else {
                        return value;
                    }
                };
            } else {
                return function (name, defaultValue) {
                    return defaultValue;
                };
            }
        }()),
        setValue: (function () {
            if (typeof GM_setValue === "function" &&
                    (typeof GM_setValue.toString !== "function" ||
                    GM_setValue.toString().indexOf("is not supported") === -1)) {
                return function (name, value) {
                    return GM_setValue(name, value);
                };
            } else if (typeof localStorage === "object" &&
                        typeof localStorage.setItem === "function") {
                return function (name, value) {
                    name = root + name;
                    return localStorage.setItem(name, value);
                };
            } else {
                return function (name, value) {
                };
            }
        }()),
        addStyle: (function () {
            if (typeof GM_addStyle === "function" &&
                    (typeof GM_addStyle.toString !== "function" ||
                    GM_addStyle.toString().indexOf("is not supported") === -1)) {
                return function (css) {
                    return GM_addStyle(css);
                };
            } else {
                return function (css) {
                    var
                    parent,
                    style,
                    textNode;
                    parent = document.getElementsByTagName("head")[0];
                    if (!parent) {
                    parent = document.documentElement;
                    } 
                    style = document.createElement("style");
                    style.type = "text/css";
                    textNode = document.createTextNode(css);
                    style.appendChild(textNode);
                    parent.appendChild(style); 
                };
            }
        }()),
        xmlhttpRequest: (function () {
            if (typeof GM_xmlhttpRequest === "function" &&
                    (typeof GM_xmlhttpRequest.toString !== "function" ||
                    GM_xmlhttpRequest.toString().indexOf("is not supported") === -1)) {
                return function (details) {
                    return GM_xmlhttpRequest(details);
                };
            } else {
                return function (details) {
                };
            }
        }()),
        log: (function () {
            if (typeof GM_log === "function" &&
                    (typeof GM_log.toString !== "function" ||
                    GM_log.toString().indexOf("is not supported") === -1)) {
                return function (message) {
                    return GM_log(message);
                };
            } else if (typeof console === "object" &&
                    typeof console.log === "function") {
                return function (message) {
                    return console.log(message);
                };
            } else {
                return function (message) {
                };
            }
        }())
    };

    function manipulatePrefs(name, value, type) {
        if (type === "set") {
            return GM.setValue(name, value);
        } else if (type === "get") {
            return GM.getValue(name, value);
        } else {
            return value;
        }
    }

    function toBool(string) {
        if (string && string.toString().toLowerCase() === "true") {
            return true;
        } else {
            return false;
        }
    }

    function fix(number) {
        if (isNaN(number)) {
            return myAccount.preferences.nanString;
        } else {
            return number.toFixed(myAccount.preferences.decimalPrecision);
        }
    }

    function selectNode(xpathExpression) {
        return document.evaluate(xpathExpression, document, null,
                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function selectNodes(xpathExpression) {
        var
            i,
            nodes,
            snapshot;
        snapshot = document.evaluate(xpathExpression, document, null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        nodes = new Array(snapshot.snapshotLength);
        for (i = 0; i < snapshot.snapshotLength; i += 1) {
            nodes[i] = snapshot.snapshotItem(i);
        }
        return nodes;
    }

    function getCurrentPage(requestType) {
        customLogger("|| - getCurrentPage(requestType)", 2);
// Do not consider the URL hash (was causing problems: the hash was being included in the final variable value)
        var documentLocation = document.location.href.split("#")[0];
        if (requestType === "location") {
            var currentPage;
            if (documentLocation.indexOf("/c/rs/") > -1) {
                customLogger("/c/rs/, therefore referral statistics", 3);
                currentPage = "refStats";
            } else if (documentLocation.indexOf("/c/rl/") > -1) {
                customLogger("/c/rl/, therefore referral listings", 3);
                if (documentLocation.indexOf("ss3=1") > -1) {
                    customLogger("ss3=1, therefore direct referral listings", 3);
                    currentPage = "directRefListing";
                } else if (documentLocation.indexOf("ss3=2") > -1) {
                    customLogger("ss3=2, therefore rented referral listings", 3);
                    currentPage = "rentedRefListing";
                }
            } else {
                customLogger("unknown page", 3);
                currentPage = "unknown";
            }
            return currentPage;
        } else if (requestType === "language") {
            var languageIndex = document.body.innerHTML.indexOf("c0 f-") + 5;
            if (languageIndex > 4) {
                return document.body.innerHTML.substring(languageIndex, languageIndex + 2).toUpperCase();
            } else {
                return "US";
            }
        }
    }

// Definitions of Functions used by the script
// Functions used by classes

    function getAccountType(verbose) {
        var
            accountType,
            divs;
        divs = selectNodes("//div[@class='mbxm sb']");
        accountType = divs[divs.length - 1].textContent.replace(/^\s+|\s+$/g, "");
        if (verbose) {
            return accountType;
        } else {
            switch (accountType) {
            case "Standard":
            case "Pioneer":
                return 0;
            case "Golden":
                return 1;
            case "Emerald":
                return 2;
            case "Sapphire":
                return 3;
            case "Platinum":
                return 4;
            case "Diamond":
                return 5;
            case "Ultimate":
                return 6;
            default:
                return -1;
            }
        }
    }

    function getNumberOfRefs(refType) {
        var
            numberOfRefs,
            spanRefs;
        customLogger("||- getRefsFunction.. refType = " + refType, 2);
// If the current referrals page matches the requested "refType", grab the number of refs from the page and store the value
// Else the current page and requested "refType" are mismatched so grab the number of refs from the stored values
        if ((currentPage.name === "rentedRefListing" && refType === "Rented") ||
                (currentPage.name === "directRefListing" && refType === "Direct")) {
            spanRefs = selectNode("//span[@class='f_b']");
// If there are some digits on the page within <h1></h1> tags, grab them 
// Bugfix: This will match the '30' in the error message alerting the user that they must be at least 30 days old to have direct refs
// --> Added test for a colon ':' to prevent this happening
            if (spanRefs.textContent.match(/\d+/)) {
                numberOfRefs = parseInt(spanRefs.textContent.match(/\d+/), 10);
            } else {
// If digits cannot be found, set the number of refs to zero (0)
                numberOfRefs = 0;
            }
// Store the number of detected referrals
            manipulatePrefs("numberOf" + refType + "Refs", numberOfRefs.toString(), "set");
        }
// Now that the stored values have been updated / created, retrieve and return them
        switch (refType) {
        case "Rented":
            numberOfRefs = Number(manipulatePrefs("numberOfRentedRefs", 0, "get"));
            customLogger("getting numberOfRefs (" + refType + ") = " + numberOfRefs, "get");
            break;
        case "Direct":
            numberOfRefs = Number(manipulatePrefs("numberOfDirectRefs", 0, "get"));
            customLogger("getting numberOfRefs (" + refType + ") = " + numberOfRefs, "get");
            break;
        }
        return numberOfRefs;
    }

    function getAutoPayLimit(accountType) {
// Function that returns the autopay limit (minimum days left for autopay to apply) for each account type
        customLogger("||- getAutoPayLimit()", 2);
        customLogger("accountType = " + accountType, 2);
// 0 == Standard or Pioneer
// 1 == Golden
// 2 == Emerald
// 3 == Sapphire
// 4 == Platinum
// 5 == Diamond
// 6 == Ultimate
        switch (accountType) {
        case 0:
        case 1:
        case 2:
        case 4:
            return 20;
        case 3:
            return 18;
        case 5:
            return 14;
        case 6:
            return 10;
        }
    }

    function getRecycleCost(accountType) {
        var
            defaultRecycleCost,
            tmp;
// Set the defaults for each account type
        switch (accountType) {
        case 0:
        case 1:
        case 3:
        case 5:
            defaultRecycleCost = 0.07;
            break;
        case 2:
        case 4:
            defaultRecycleCost = 0.06;
            break;
        case 6:
            defaultRecycleCost = 0.04;
            break;
        default:
            defaultRecycleCost = 0.07;
        }
// If the current page is the rented referral listings,
// store the *actual* recycle cost
        if (currentPage.name === "rentedRefListing") {
            tmp = document.body.innerHTML.match(
                    /var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);
            if (tmp !== null) {
                recycleCost = tmp[2];
                manipulatePrefs("recycleCost", recycleCost, "set");
            }
        }
// If the varibable 'recycleCost' hasn't been set yet, this will return defaultRecycleCost
// --> if the referral listings pages haven't been viewed yet
// else this will return recycleCost (the actual recycle cost retrieved from the page)
        return Number(manipulatePrefs("recycleCost", defaultRecycleCost, "get"));
    }

    function getOwnClickValue(accountType) {
        switch (accountType) {
        case 0: // Standard, Pioneer
            return 0.001;
        case 1: // Golden
            return 0.010;
        case 2: // Emerald
        case 3: // Sapphire
            return 0.012;
        case 4: // Platinum
        case 5: // Diamond
            return 0.015;
        case 6: // Ultimate
            return 0.020;
        }
    }

    function getDirectReferralClickValue(accountType) {
        switch (accountType) {
        case 0: // Standard, Pioneer
            return 0.0005;
        case 1: // Golden
            return 0.005;
        case 2: // Emerald
        case 3: // Sapphire
        case 4: // Platinum
        case 5: // Diamond
        case 6: // Ultimate
            return 0.010;
        }
    }
    
    function getRentedReferralClickValue(accountType) {
        switch (accountType) {
        case 0: // Standard, Pioneer
            return 0.005;
        case 1: // Golden
        case 2: // Emerald
        case 3: // Sapphire
        case 4: // Platinum
        case 5: // Diamond
        case 6: // Ultimate
            return 0.010;
        }
    }
    
    function getRenewalFees(renewalPeriod) {
        var
            renewCost15,
            renewCost30,
            renewCost60,
            renewCost90,
            renewCost150,
            renewCost240,
            tmp;
        if (!renewalPeriod) {
            renewalPeriod = 240;
        }
        if (currentPage.name === "rentedRefListing") {
            tmp = document.body.innerHTML.match(
                    /var p\=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);
            if (tmp !== null) {
                renewCost15 = tmp[3];
                renewCost30 = tmp[4];
                renewCost60 = tmp[5];
                renewCost90 = tmp[6];
                renewCost150 = tmp[7];
                renewCost240 = tmp[8];
                manipulatePrefs("renewalFees_15days", renewCost15, "set");
                manipulatePrefs("renewalFees_30days", renewCost30, "set");
                manipulatePrefs("renewalFees_60days", renewCost60, "set");
                manipulatePrefs("renewalFees_90days", renewCost90, "set");
                manipulatePrefs("renewalFees_150days", renewCost150, "set");
                manipulatePrefs("renewalFees_240days", renewCost240, "set");
            }
        }
// Return the default renewal period
        if (renewalPeriod === 1) {
            return myAccount.autopayCost;
        } else {
            return Number(manipulatePrefs("renewalFees_" + renewalPeriod + "days", renewCost240, "get"));
        }
    }

    function getGoldenPackCost(accountType) {
// Function that returns the cost of purchasing each account type
// *** EXCLUDING COST OF GOLDEN ***
        switch (accountType) {
        case 0:
        case 1:
            return 0;
        case 2:
        case 3:
            return 290;
        case 4:
        case 5:
            return 490;
        case 6:
            return 890;
        }
    }

    function getAutoPayCost(accountType) {
// Function that returns the autopay cost (per referral) for each account type
        customLogger("||- getAutoPayCost()", 2);
        customLogger("accountType = " + accountType, 2);
        var totalRentedRefs = getNumberOfRefs("Rented");
        var perAutoPayCost = 0;
// 0 == Standard or Pioneer
// 1 == Golden
// 2 == Emerald
// 3 == Sapphire
// 4 == Platinum
// 5 == Diamond
// 6 == Ultimate
//
// CORRECT @ 05/Jul/2011
//
// Referrals,      Standard, Golden, Emerald, Sapphire, Platinum, Diamond, Ultimate
// 0 -> 250,       $0.20,    $0.20,  $0.20,   $0.20,    $0.20,    $0.20,   $0.20
// 251 -> 500,     $0.21,    $0.21,  $0.21,   $0.20,    $0.21,    $0.20,   $0.20
// 501 -> 750,     $0.22,    $0.22,  $0.22,   $0.21,    $0.22,    $0.20,   $0.20
// 751 -> 1000,    $0.23,    $0.23,  $0.23,   $0.22,    $0.23,    $0.21,   $0.20
// 1001 -> 1250,   $0.24,    $0.24,  $0.24,   $0.23,    $0.24,    $0.22,   $0.21
// 1251 -> 1500,   $0.25,    $0.25,  $0.25,   $0.24,    $0.25,    $0.23,   $0.22
// 1501 -> 1750,   $0.26,    $0.26,  $0.26,   $0.25,    $0.26,    $0.24,   $0.23
// over 1750,      $0.27,    $0.27,  $0.27,   $0.26,    $0.27,    $0.25,   $0.24
//
// Monthly Cost, AutoPay
// $0.20,        $0.0057
// $0.21,        $0.0060
// $0.22,        $0.0062
// $0.23,        $0.0065
// $0.24,        $0.0068
// $0.25,        $0.0071
// $0.26,        $0.0074
// $0.27,        $0.0077
        switch (accountType) {
        case 0: // Standard or Pioneer
        case 1: // Golden
        case 2: // Emerald
        case 4: // Platinum
            if (totalRentedRefs <= 250) {
                perAutoPayCost = 0.0057;
            } else if (totalRentedRefs <= 500) {
                perAutoPayCost = 0.0060;
            } else if (totalRentedRefs <= 750) {
                perAutoPayCost = 0.0062;
            } else if (totalRentedRefs <= 1000) {
                perAutoPayCost = 0.0065;
            } else if (totalRentedRefs <= 1250) {
                perAutoPayCost = 0.0068;
            } else if (totalRentedRefs <= 1500) {
                perAutoPayCost = 0.0071;
            } else if (totalRentedRefs <= 1750) {
                perAutoPayCost = 0.0074;
            } else {
                perAutoPayCost = 0.0077;
            }
            break;
        case 3: // Sapphire
            if (totalRentedRefs <= 500) {
                perAutoPayCost = 0.0057;
            } else if (totalRentedRefs <= 750) {
                perAutoPayCost = 0.0060;
            } else if (totalRentedRefs <= 1000) {
                perAutoPayCost = 0.0062;
            } else if (totalRentedRefs <= 1250) {
                perAutoPayCost = 0.0065;
            } else if (totalRentedRefs <= 1500) {
                perAutoPayCost = 0.0068;
            } else if (totalRentedRefs <= 1750) {
                perAutoPayCost = 0.0071;
            } else {
                perAutoPayCost = 0.0074;
            }
            break;
        case 5: // Diamond
            if (totalRentedRefs <= 750) {
                perAutoPayCost = 0.0057;
            } else if (totalRentedRefs <= 1000) {
                perAutoPayCost = 0.0060;
            } else if (totalRentedRefs <= 1250) {
                perAutoPayCost = 0.0062;
            } else if (totalRentedRefs <= 1500) {
                perAutoPayCost = 0.0065;
            } else if (totalRentedRefs <= 1750) {
                perAutoPayCost = 0.0068;
            } else {
                perAutoPayCost = 0.0071;
            }
            break;
        case 6: // Ultimate
            if (totalRentedRefs <= 1000) {
                perAutoPayCost = 0.0057;
            } else if (totalRentedRefs <= 1250) {
                perAutoPayCost = 0.0060;
            } else if (totalRentedRefs <= 1500) {
                perAutoPayCost = 0.0062;
            } else if (totalRentedRefs <= 1750) {
                perAutoPayCost = 0.0065;
            } else {
                perAutoPayCost = 0.0068;
            }
            break;
        }
        return perAutoPayCost;
    }

    /** Compares two objects using
     * built-in JavaScript operators. */
    function ascend(a, b) {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
        return 0;
    }

    /** Returns an object that contains the count, sum,
     * minimum, median, maximum, mean, variance, and
     * standard deviation of the series of numbers stored
     * in the specified array.  This function changes the
     * specified array by sorting its contents. */
    function Stats(data) {
        this.count = data.length;
    /* Sort the data so that all seemingly
     * insignificant values such as 0.000000003 will
     * be at the beginning of the array and their
     * contribution to the mean and variance of the
     * data will not be lost because of the precision
     * of the CPU. */
        data.sort(ascend);
    /* Since the data is now sorted, the minimum value
     * is at the beginning of the array, the median
     * value is in the middle of the array, and the
     * maximum value is at the end of the array. */
        this.min = data[0];
        var middle = Math.floor(data.length / 2);
        if ((data.length % 2) !== 0) {
            this.median = data[middle];
        } else {
            this.median = (data[middle - 1] + data[middle]) / 2;
        }
        this.max = data[data.length - 1];
    /* Compute the mean and variance using a
     * numerically stable algorithm. */
        var sqsum = 0;
        this.mean = data[0];
        for (var i = 1;  i < data.length;  i += 1) {
            var x = data[i];
            var delta = x - this.mean;
            var sweep = i + 1.0;
            this.mean += delta / sweep;
            sqsum += delta * delta * (i / sweep);
        }
        this.sum = this.mean * this.count;
        this.variance = sqsum / this.count;
        this.sdev = Math.sqrt(this.variance);
    }

    /** Returns a string that shows all the properties and
     * their values for this Stats object. */
    Stats.prototype.toString = function () {
        var s = "tu";
        for (var attr in this) {
            if (typeof(this[attr]) !== "function") {
                s += "  " + attr + " " + this[attr];
            }
        }
        return s;
    };

    function customLogger(logMessage, logType) {
        var
            i,
            override_disableLogging,
            override_enableLogging,
            showMessage;
        if (loggingLevel.indexOf(0) > -1) {
            override_disableLogging = true;
        } else if (loggingLevel.indexOf(1) > -1) {
            override_enableLogging = true;
        } else {
            for (i = 0; i < loggingLevel.length; i += 1) {
                if (logType.toString().indexOf(loggingLevel[i]) > -1) {
                    showMessage = true;
                }
            }
        }
        if ((showMessage && !override_disableLogging) || override_enableLogging) {
            GM.log("Log Message [type: " + logType + "]: \n" + logMessage);
      }
    }

    var Config = {
        tabs: {},
        data: {},
        callback: null,
        init: function (settings) {
            Config.settings = settings;
        },
        close: function () {
            document.body.removeChild(Config.$("ConfigBodyWrapper"));
            document.body.removeChild(Config.$("ConfigMask"));
            window.removeEventListener("keyup", Config.keyUpHandler, true);
            if (typeof(Config.callback) === "function") {
                Config.callback();
            }
        },
        show: function (callback) {
            Config.settings = typeof Config.settings !== "undefined" ? Config.settings : Config.tabs;
            Config.callback = typeof callback === "function" ? callback : null;
            if (typeof Config.styleDrawn === "undefined") { // apply styling
                GM.addStyle(
    "#ConfigMask { position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: #000; opacity: 0.7; z-index: 199000; } " +
    "#ConfigBodyWrapper { height: 100%; left: 0; padding: 0%; position: fixed; top: 0; white-space: normal; width: 100%; z-index: 199010;} " + 
    "#ConfigBody * { background: none; border: none; color: #333; font-family: Helvetica Neue,Arial,Helvetica,sans-serif; font-size: 12px; font-weight: normal !important; line-height: 1.2em; margin: 0 !important; padding: 0 !important; text-decoration: none; } " +
    "#ConfigBody { border-radius: 5px; background: #f9f9f9; border: 1px outset #333; color: #333; cursor: default; font-family: Verdana, Arial; font-size: 1.2em; height: 80%; margin: 5% auto !important; min-width: 30em; max-width: 55em; overflow: auto; padding: 1em !important; text-align: left; width: 600px; z-index: 199010; } " +
    "#ConfigBody strong, #ConfigContentBox strong { font-weight: bold !important; } " +
    "#ConfigBody h1 { background-color: #999; border-bottom: 1px solid #333; font-size: 1.1em !important; font-weight: bold !important; margin-bottom: 0.75em !important; padding: 0.5em !important; } " +
    "#ConfigBody h2 { font-weight: bold; margin: 0.5em 1em !important; } " +
    "#ConfigBody h1 { font-size: 13px; font-weight: bold; color: #fff; text-decoration: none; } " +
    "#ConfigBody h1 a:hover { text-decoration: underline; } " +
    "#ConfigBody li { list-style-type: circle; } " +
    "#ConfigBody p { font-size: 12px; font-weight: normal; margin-bottom: 1em !important; } " +
    "#ConfigContentPadding { display: block; height: 70%;  margin: 1em !important;} " +
    "#ConfigTabs { line-height: 1.5em !important; margin: 0.5em 0.5em -0.2em 0 !important; text-align: justify; } " +
    "#ConfigTabs span { border-radius: 5px 5px 0 0; background-color: #ddd; border: 1px solid #666; cursor: pointer; margin-right: -2px !important; padding: 2px 10px !important; position: relative; top: -2px; } " +    "#ConfigTabs span:hover { background-color: #eee; } " +
    "#ConfigTabs span:hover { background-color: #eee; } " +
    "#ConfigTabs span.active { background-color: #F9F9F9; cursor: inherit; border-bottom: none; font-weight: bold; padding-top: 3px !important; top: -1px; } " +
    "#ConfigTabs span.active:hover { background-color: #F9F9F9; } " +
    "#ConfigContentBox { border: 1px inset #666; height: 80%; overflow: auto; padding: 1.5em 1em 1em !important; } " +
    "#ConfigContentBox table { border-collapse: collapse !important; margin: 0 15px !important; min-width: 85%; } " +
    "#ConfigContentBox td { font-weight: normal; } " +
    "#ConfigContentBox input { border: 1px inset #666 !important; width: 4em !important; } " +
    "#ConfigContentBox td.fieldLabel { font-weight: bold !important; padding-right: 0.5em !important; text-align: right !important; } " +
    "#ConfigContentBox td select { border: 1px inset #666; min-width: 4em !important; } " +
    "#ConfigHistory { border: 1px inset #999; margin: 0 1em 1em 1em !important; max-height: 150px; overflow-y: auto; padding: 0 1em 1em !important; width: 448px; } " +
    "#ConfigHistory ul { margin-left: 2em !important; } " +
    "#ConfigClose { cursor: pointer; float: right; height: 14px; opacity: 0.5; } " +
    "#ConfigClose:hover { opacity: 0.9; } " +
    "#ConfigFooter { border: 1px solid; bottom: 0px; display: block; margin: 3% 5% !important; padding: 1em 2em !important; width: 80%; } " +
    "#ConfigFooter input { border-radius: 3px; background: no-repeat 4px center #eee; border: 1px outset #666; cursor: pointer; float: right; padding: 3px 5px 5px 20px !important; margin-left: 0.5em !important; width: 80px; text-align: center; } " +
    "#ConfigFooter input:hover { background-color: #f9f9f9; } " +
    "#ConfigFooter select { border: 1px inset #666; } " +
    "#ConfigContentBox #ConfigFieldTable td { border: 1px solid #555; padding: 3px !important; }");
                if ("undefined" !== typeof Config.css) {
                    GM.addStyle(Config.css);
                }
                Config.styleDrawn = true;
            }
// Create and insert config background mask
// noticeBg is needed because the reduced opacity is inherited by config area if applied to the noticeWrapper instead
            var noticeBg = document.createElement("div");
            noticeBg.id = "ConfigMask";
            noticeBg.style.height = "100%";
            noticeBg.style.width = "100%";
            document.body.appendChild(noticeBg);
// Create config window
            var noticeWrapper = document.createElement("div");
            noticeWrapper.id = "ConfigBodyWrapper";
            var notice = document.createElement("div");
            notice.id = "ConfigBody";
// Create heading
            var html = "<h1><img src='" + Config.icons.config + "' align='absmiddle' style='margin-top: -2px;'/>" +
                    (typeof Config.scriptName === "string" ? " " + Config.scriptName : "") + " Options <span><a href='http://userscripts.org/users/129562/scripts' style='float: right; color: #444499 !important; font-weight: bold !important; font-size: 1.2em;'><small>More scripts for NeoBux at</small> userscripts.org</a></span></h1>";
// Container for settings stuff
            html += "<div id='ConfigContentPadding'>";
// Tab bar
            html += "<div id='ConfigTabs'>";
// Draw tabs
            var i = 0;
            var firstTabId = "";
            var label;
            var id;
            for (label in Config.settings) {
                id = "configTab" + label.replace(/\s/g, "_");
                label = label.replace(" ", "&nbsp;");
                html += "<span id='" + id + "'>" + label + "</span> "; // Space after </span> is to fix tab-wrapping bug
                firstTabId = (i === 0 ? id : firstTabId);
                i += 1;
            }
            html += "</div>";
// Draw container for config to be inserted into later
            html += "<div id='ConfigContentBox'>";
            html += "</div>";
            html += "</div>";
// End actual config stuff
// Create footer
      html += "<div id='ConfigFooter'>" +
        "<input type='button' id='ConfigCloseButton' value='"+ localString("SaveSettings") + "' style='background-image: url(\"" + Config.icons.save + "\")'/>" +
        "<span style='font-size: 0.9em; font-style: italics;'>"+ localString('NoteSave') + "</span>" +
        "</div>";
// End configBody
            html += "</div>";
            notice.innerHTML = html;
            noticeWrapper.appendChild(notice);
            document.body.appendChild(noticeWrapper);
// Add tab change listeners
            for (label in Config.settings) {
                id = "configTab" + label.replace(/\s/g, "_");
                Config.$(id).addEventListener("click", function () { Config.activateTab(this.id); }, false);
            }
// Add escape key press and other listener
            Config.activateTab(firstTabId);
            window.addEventListener("keyup", Config.keyUpHandler, true);
            Config.$("ConfigCloseButton").addEventListener("click", Config.close, true);
        },
// -------------------------------- "private" methods -----------------------------------------
        activateTab: function (id) {
// deactivate current tab
            var elems = Config.$("ConfigTabs").getElementsByTagName("span");
            for (var i = 0; i < elems.length; i += 1) {
                elems[i].className = "";
            }
// set current tab
            Config.$(id).className = "active";
            var key = id.replace(/^configTab/, "").replace(/_/g, " ");
            var fields = Config.settings[key].fields;
//
            var html = (typeof Config.settings[key].html === "string" ? Config.settings[key].html : "");
            html += "<table id='ConfigFieldTable'>";
            for (var fieldName in fields) {
                var field = fields[fieldName];
                var type = typeof field.type !== "string" ? "html" : field.type;
                var tip = typeof field.tip === "string" ? field.tip : "";
                var width = typeof fields[fieldName].width !== "undefined" ? (fields[fieldName].width.toString().match(/em/) ? fields[fieldName].width : (fields[fieldName].width.toString().match(/px/) ? fields[fieldName].width : fields[fieldName].width + "px")) : false;
                var height = typeof fields[fieldName].height !== "undefined" ? (fields[fieldName].height.toString().match(/em/) ? fields[fieldName].height : (fields[fieldName].height.toString().match(/px/) ? fields[fieldName].height : fields[fieldName].height + "px")) : false;
                var fieldHTML = "";
                switch (type) {
                case "spacer":
                    html += "<tr title='" + tip + "'><td colspan='2' style='height: " + height + "; border: 0px none;'>";
                    break;
                case "html":
                    html += "<tr title='" + tip + "'><td colspan='2' style='height: " + height + "; border: 0px none;'>";
                    html += field.html;
                    break;
                case "select":
                    html += "<tr title='" + tip + "'><td colspan='1' class='fieldLabel'>" +
                            (typeof field.label === "string" ? field.label : "") +
                            "</td><td style='padding-top: 0px; padding-bottom: 0px;'>";
                    fieldHTML += "<select id='configInput_" + fieldName + "'>";
                    if (typeof field.options === "undefined") {
                        alert("Options Error: " + fieldName + " of type 'select' is missing the 'options' property");
                    } else {
                        for (var text in field.options) {
                            var val = field.options[text];
                            fieldHTML += "<option value='" + val + "'" + (Config.get(fieldName).toString() === val ? " selected" : "") + ">" + text + " &nbsp;</option>";
                        }
                    }
                    fieldHTML += "</select>";
                    break;
                case "password":
                case "text": 
                    html += "<tr title='" + tip + "'><td colspan='1' class='fieldLabel'>" +
                            (typeof field.label === "string" ? field.label : "") + "</td><td>";
                    fieldHTML += "<input id='configInput_" + fieldName + "' value='" + Config.get(fieldName) + "' style='" + (width ? "width: " + width + ";" : "") + " font-family: monospace, courier new;' type='" + type + "'/>";
                    break;
                case "checkbox":
                    html += "<tr title='" + tip + "'><td colspan='1' class='fieldLabel'>" +
                            (typeof field.label === "string" ? field.label : "") + "</td><td>";
                    fieldHTML += "<input id='configInput_" + fieldName + "' type='checkbox' style='position: relative; top: 2px;'" + (Config.get(fieldName) ? "checked" : "") + "/>";
                    break;
                }
                html += typeof fields[fieldName].text === "string" ? "<table><tr><td style='border: 0px none; margin: 0px;'>" + fieldHTML + "</td><td style='border: 0px none; margin: 0px;'> &nbsp; - " + (fields[fieldName].text) + "</td></tr></table>" : "";
                html += "</td></tr>";
            }
            html += "</table>";
// Insert config HTML
            Config.$("ConfigContentBox").innerHTML = html;
// Add event listeners -- will cause the settings to be edited immediately after change
            for (var fieldName in fields) {
                switch (fields[fieldName].type) {
                case "checkbox":
                    Config.$("configInput_" + fieldName).addEventListener("change",
                            function () {
                                Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.checked ? true : false);                                 
                            },
                            false);
                    break;
                case "select":
                    Config.$("configInput_" + fieldName).addEventListener("change",
                            function () {
                                Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.value);                                 
                            },
                            false);
                    break;
                case "password":
                case "text":
                    Config.$("configInput_" + fieldName).addEventListener("keyup",
                            function () {
                                Config.set(this.id.toString().match(/configInput_(.+)$/)[1], this.value);
                            },
                            false);
                    break;
                }
            }
        },
        keyUpHandler: function (e) {
// 'Escape' closes the config box
            if (e.keyCode === 27) {
                Config.close();
            }
        },
        icons: {
            config: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALvSURBVBgZBcFNaNUFAADw3//jbe/t6d6cc2/kUpeXsEgUsSSiKIzAQxDdvCgdulgagmBXLx4K7BgRWamnOgSDIj3EusRangwlbVvOyba25tvH23v/z36/oCxLcOr7uaO48sxA9Vg7LbTTQloUtrKihXUsI8cqVvAtfo4Biix78eDItmPnX90FADaTotFOisZqJx9NUta7udnlDT/+vXkc52KAIsua/T0BmHuSqwSBOCCK6a2E9vSGojBUiTg0WvNUoz74xeTjT0OAPE376zFZwXoSaKU86dLq0OqwssXSRg4uXn/o2Fjd80OVXTFAnqaD23tCm102O7kwDMSIIsKISCAKKBDka36bXnX7YetxDJAnSbNRi7S2Mu1uKQxLUUiYB6KQSCmKUEYW17o+u/lgDadigCxJ9jb7K1qdUgYlUR4IS+RsPfhFliaeGzkhr+SyJBv74aOX/wsB8qS7d6TRazMpBSFREAjWH0lmflV21lR7e/T19fl3acmbAw+9MzT7CQRlWXrr0k+1OArb3104bvKfVKEE6fSEffv2mZ+f12w2hWFodnbW6Oio8fFxRVHUY8i6ya56vSoMKKAkCAi279bpdCwvL5uYmFCr1Rw4cEC73Vav1786c+ZMO4Q86fbFCnFIFAYEoY17tzSiTcPDw+7fv+/1kxe9e/q8R/PzRkZG7N+///Tly5fL+JVz14dw6eizeyyslWYXc/UqnVZLFEWazabh4WG1Kv19lGVgfX3d3Nyc6elpcZ4kb+DEH3dnrG7FNrqlNC8V2UEjG/MGBxeMjY2ZHP/aVFDa8/RuKysr7ty58yUuxHmaHn77tRdqH598CQDkJde+mcKAhYUFRw4f1Ol0zMzMaDQa8F6tVns/ztN0ZmG55drNuwa21Qz0Vw3UezXqvQYGh1y9etUHH5419fukxcVFy2XTrVufl1mW3bxx40YeHDp5ZQjnsBc7sRM7sAONak+lUq1WHKrds7S05M/yyF84efva2Sn4HxcNUm7wsX3qAAAAAElFTkSuQmCC",
            close: "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D"
        },
        getField: function (key) {
            for (var tabName in Config.settings) {
                if (typeof Config.settings[tabName].fields === "object") {
                    var fields = Config.settings[tabName].fields;
                    for (var fieldName in fields) {
                        if (fieldName === key) {
                            return fields[fieldName];
                        }
                    }
                }
            }
            return false;
        },
        get: function (key) {
            var field = Config.getField(key);
            key = typeof Config.prefix === "string" ? Config.prefix + key : key;
            switch (field.type) {
            case "checkbox":
            if (typeof field.value === "undefined" || !field.value) {
                    return (typeof GM.getValue(key) !== "undefined" && GM.getValue(key) === "true") ? true : false; // false by default
                    } else {
                    return (typeof GM.getValue(key) !== "undefined" && GM.getValue(key) === "false") ? false : true; // true by default
                    }
                break;
            case "select":
            case "password": 
            case "text":
                return typeof GM.getValue(key) === "undefined" ? (typeof field.value !== "undefined" ?  field.value : "") : GM.getValue(key);
            default:
                return typeof GM.getValue(key) === "undefined" ? "" : GM.getValue(key);
            }
        },
        set: function (key, value) {
            key = typeof Config.prefix === "string" ? Config.prefix + key : key;
            GM.setValue(key, value.toString());
        },
        $: function (id) {
            return document.getElementById(id);
        }
    };

    function insertLogo() {
        var
            arrowImg,
            img,
            lastColumn,
            row,
            script,
            td;
        row = selectNode("//div[@class='mbxm sb'][1]/../..");
        lastColumn = selectNode("//div[@class='mbxm sb'][1]/..");
        td = document.createElement("td");
        row.insertBefore(td, lastColumn);
        img = document.createElement("img");
        img.id = "neobuxbr";
        img.src = "data: image;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABDdJREFUeNpiEGZnYFhSn7GHYUZZ+mMWBob/AAHEoC3Kx1AQHczAeO3q5f/KRw8zAAQQo7WmCoOKqtx/aTl1IC3LwPSHU4AhQF+RQfjkYQb+T5cZAAIARAC7/wMWFxoALhYHHggND/EA//4AAI5jRf8AAgT/HRwZ/5WAabACE/P3AOu4tACsqqoA5tnZTwQyTkzzh2tqDRYdHADkEQpVAgCEAHv/AQ8HAACDY1KqDwD6IvwSFTPb6u0AHBIiuBwQBv1mhpZMAE9HPhGqf2768eXj/92wsP8nGBb/5eDg/+iZlv9mXVNUBO719QsGDwkEOi8sAB8jEwDb9fQAWTMxAB1HPgAvHSI/ARAEAAA0NjMAQEBDMy0I+cbW6+IG6PAFbPv8/K2iqsLoAgAIAff+AxUMBwAMAQUABAD8AJR4aKwOFhDb+e3w6DU4NgDz8fAABPr8/AG1elL+zewGzNnm3jRMMChTIQkJmBAaHQvQzc9eApmAdcuw1OMAlrjGNPL9FABZf5cA4PT5aCUmGF0kJhsAAsHZ4ZJXIDcAtbO4AOHNygC5h4MAiZKaAPza5Pzf6usJAgnv5aEnAQQA2+HeANrc4wAQBgMA2+PiAAbl3gSRcXK1AKWOgsduaFv/MwwI/4tbPv8AAwf/PxAL/5+GducoJB4MA/n+BMGIPhduCv0PANzg5AA9BgkAQ2VSAEM/PQyptLd7AQ0AAABcYVkfDAcDOxkL+6UfChb+o8LJIcfS4eL49QAAAlRIN69JxgEcwL8/Xx81p4aK783p2MjVyHSDpjI65daKOgQjCnoZFR1i0KFTLyB1GfQfDDoIBb2ti6uNDSsaY7YHZblMUbdSdKmZOR+d2pPdP8cP+b+CJRyYjN1qHSW0J39svaP2K/W3vCMrNUFTv8djYRTr6rNLn0fD6/TqmZMnEMsXSSgUYgUCPohKIcPEqOPSmJk/u5JIw2y2IlenEN3agb2nD8IOCsU3Yew4t6MXZocbrUIRd+75RjbiqU/cg/0WuIYc1ymp1LEvXek0E0CmNGI7mQEdj4HejIIp1+C2DoD/vYTM3GtEdrOQHLAxkWwuwLl61pvgtSrXarEULt+fQbCnF9P+Z/DPB6D+S1DJFhB48RJPE9/waOMLLrwKwNQSQ1TL3fBdufiWPJw6/0DD/r67s9eAmt6GYmgYVbEUa8F5RFsMlmN5mEFwc/IcLHIF8sFFwH0Y0i4R6LJgmjidgzCoDZLj9v7HHGFrKvx8AZO7dSxqRVCpJGhEfgKUEJ46gzlKAvn4MSh5vIWZJ29OFytFhtss/0IymW7bLFrDeJ/K5TnlpVIDNrbE45AkoZDXKwGrHk3vGHtosLsmaVT/0Pm2PxT++p7ii1mi4APtNuByD0Mml0OvMyG4FoTnqPOISSa5LRKJuzLVhm9p+cOqkLSh0WjxcT2BUoEBl8vBP2Iqng+e/R48AAAAAElFTkSuQmCC";
        img.width = "16";
        img.height = "16";
        img.border = "0";
        img.style.cursor = "pointer";
      if ( (document.body.innerHTML.indexOf("f-us") < document.body.innerHTML.indexOf("f-pt")) && (document.body.innerHTML.indexOf("f-pt") < document.body.innerHTML.indexOf("f-es")) ) {
        img.alt = "NeoBux BR Greasemonkey Script Preferences";
      } 
      else if (document.body.innerHTML.indexOf("f-es") > document.body.innerHTML.indexOf("f-pt")) {
        img.alt = "Preferências do Greasemonkey Script NeoBux BR";
      } 
      else {
        img.alt = "Preferências do Greasemonkey Script NeoBux BR";
      }
      img.addEventListener("click", function() { showSettingsEditor(); }, false);
      td.appendChild(img);
      var script = document.createElement("script");
      if ( (document.body.innerHTML.indexOf("f-us") < document.body.innerHTML.indexOf("f-pt")) && (document.body.innerHTML.indexOf("f-pt") < document.body.innerHTML.indexOf("f-es")) ) {
      script.textContent = "mk_tt('neobuxbr', 'bottom', 'NeoBux BR<br/>Options');";
      } 
      else if (document.body.innerHTML.indexOf("f-es") > document.body.innerHTML.indexOf("f-pt")) {
      script.textContent = "mk_tt('neobuxbr', 'bottom', 'NeoBux BR<br/>Opções');";
      } 
      else {
      script.textContent = "mk_tt('neobuxbr', 'bottom', 'NeoBux BR<br/>Opciones');";
      }
      row.insertBefore(script, lastColumn);
        if (toBool(manipulatePrefs("firstRun", true, "get"))) {
// Code to run when the user first installs the script.
// Add the arrow pointing to the settings editor.
            arrowImg = document.createElement("img");
            arrowImg.src = "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAQCAYAAAGthlVmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcpJREFUeNpiuCXPw8B0+scfBoAAYrguyyXFdPXX/6cAAcSwQ4a3e0tM8H+GTmF2hqMyXP8BAojxpgynACMz8wemW3Ye7+/+Y+pjXCPO+f8nw39GJklWRoYnf/4zAAQQ43kpDoY38dn/GdnYGIRn9zOyPP3PyPBj1xYGBkYgDWSzPAYqU3z+mIGRgYHhHpDN9PTPPwZZFkYwfgJkAwQQI8g1z7n5V0l9/RjG9JyBKY+9qCb0KTNbBct7IfFYjtMnGH4IigQzMbx40vLt6kUGhqdPWpm+/fvP8O/2TYZv//8xMH3/x8DAz8zIAKKZvv3/z8DHxMDwHUgzfQdiISagDJAGCNAB2fMQEIRBePZ2jxMkVCjoFBKJRilRXmj8OoXSP1D5aOTUOh+JkCgVhMgdTriz5q7YbDLzPrvvDNaVNLZFE4tmdegM+tppNUabgox14ZQs223b00ytDv32IawUnocdMvNxT2mImZqPO/fLeWLmcvi6LqzVsgvDmKgrf9VCJfVxj0AqIAzxhEy+qCuXW0gmz/uvuAHNc6cW8FYeQySolqURDxHAKfyxt4ikmWaJWa5v0oiIKOCDNE1OC3z8UN8CvvCl6f3w8Uj+AesHuQv9i+2ZAAAAAElFTkSuQmCC";
            arrowImg.setAttribute("style", "position: relative; right: 12px; top: 20px;");
            td.appendChild(arrowImg);
        } else {
            td = document.createElement("td");
            td.innerHTML = "&nbsp;";
            row.insertBefore(td, lastColumn);
        }
    }

    function insertScriptVersion() {
        var
            cell,
            span;
        cell = selectNode("//body/div[1]/div[1]/table[1]/tbody/tr[2]/td[2]");
        span = document.createElement("span");
        span.setAttribute("style", "font-size: 9px !important;");
        span.innerHTML =
                "<a class='cinza' style='font-size: 9px;' " +
                "href='http://userscripts.org/scripts/show/67521'>" +
                "<span style='color: #000000'>NeoBux BR</span> " + version +
                "</a>&nbsp;&nbsp;&nbsp;&nbsp;";
        cell.appendChild(span);
    }

    function firstRun() {
    
    // code to run when the user first installs the script
    if ( (document.body.innerHTML.indexOf("f-us") < document.body.innerHTML.indexOf("f-pt")) && (document.body.innerHTML.indexOf("f-pt") < document.body.innerHTML.indexOf("f-es")) ) {
      alert("NeoBux BR:\nThank you for installing the NeoBux BR script for Greasemonkey.");
      alert("NeoBux BR:\nYou will now be asked three (3) questions to help get the script running as quickly as possible.\n\nIf you wish to change any of your answers later, or want to edit any of the other settings, click on the logo in the top-right of your screen next to the Referral statistics icon (indicated by the red arrow that will disappear after you leave this page).\n\n");
      var renewalLength = prompt("NeoBux BR:\nHow many days you renew your referrals for usually?\nNOTE: Enter number only.\n1 (AutoPay) or 15 or 30 or 60 or 90 or 150 or 240.");
    } 
    else if (document.body.innerHTML.indexOf("f-es") > document.body.innerHTML.indexOf("f-pt")) {
      alert('Neobux BR:\nObrigado por Instalar o script para Greasemonkey Neobux BR .');
      alert('Neobux BR:\nAgora responda as três (3) perguntas para ajudar o script a ser executado mais rapidamente.\n\nSe você depois quiser alterar qualquer das suas respostas, ou se quiser editar algum outro parâmetro, clique no logotipo no canto superior direito da tela ao lado do ícone FAQ \n(indicado pelo ponto vermelho grande, que desaparece quando você sair desta página)\n\n');
      var renewalLength = prompt('Neobux BR:\nPor quantos dias geralmente são renovados seus referidos.\nNOTA: Digite apenas um único número \n1 (Autopago) ou 15 ou 30 ou 60 ou 90 ou 150 ou 240');
    } 
    else {
      alert('Neobux BR:\nGracias por instalar el scripts para Greasemonkey Neobux BR.');
      alert('Neobux BR:\nAhora responde a los tres (3) preguntas para ayudar al script que se ejecutará en breve.\n\nSi a continuación desea cambiar alguna de sus respuestas, o si desea editar otro parámetro, haga clic en el logotipo en la esquina superior derecha de la pantalla junto al icono de  FAQ \n(Indicado por punto Rojo grande, que desaparece cuando se sale de esta página)\n\n');
      var renewalLength = prompt('Neobux BR:\nCuántos días suelen ser renovados sus referencias..\nNOTA: Ingrese sólo el número uno \n1 (AutoPay) o 15 o 30 o 60 o 90 o 150 o 240');
    }
    if (renewalLength) {
      renewalLength = parseInt(renewalLength, 10);
      if (renewalLength === 1 ||
          renewalLength === 15 || renewalLength === 30 ||
          renewalLength === 60 || renewalLength === 90 ||
          renewalLength === 150 || renewalLength === 240) {
          manipulatePrefs("renewalPeriod", renewalLength.toString(), "set");
      } else {
        if ( (document.body.innerHTML.indexOf("f-us") < document.body.innerHTML.indexOf("f-pt")) && (document.body.innerHTML.indexOf("f-pt") < document.body.innerHTML.indexOf("f-es")) ) {
          alert("NeoBux BR Error:\nThe value that you entered is not valid. The value has defaulted to 240 day renewals. If you wish to edit this value, use the settings editor.");
        } 
        else if (document.body.innerHTML.indexOf("f-es") > document.body.innerHTML.indexOf("f-pt")) {
          alert('Neobux BR Erro:\nValor digitado inválido. O dias de renovação por padrão serão 240 dias. \nSe você quiser editar este valor, utilize o editor de parâmetro.');
        }
        else {
          alert('Neobux BR Error:\nvalor es incorrecto. El día de la renovación por defecto será de 240 días. \nSi desea modificar este valor, utilice el parámetro editor.');
        }
      }
    }
    if ( (document.body.innerHTML.indexOf("f-us") < document.body.innerHTML.indexOf("f-pt")) && (document.body.innerHTML.indexOf("f-pt") < document.body.innerHTML.indexOf("f-es")) ) {
      var rentedRefs = prompt("NeoBux BR:\nHow many **RENTED** referrals do you have?\nIf you click cancel, the script will automatically detect this value the next time you visit your rented referrals page.");
    } 
    else if (document.body.innerHTML.indexOf("f-es") > document.body.innerHTML.indexOf("f-pt")) {
      var rentedRefs = prompt('Neobux BR:\nQuantos referidos **ALUGADOS** tens?\nSe você clicar em Cancelar, o script detectará automaticamente  essa quantidade \nna próxima vez que a página de suas referidos alugados for visitada.');
    } 
    else {
      var rentedRefs = prompt('Neobux BR:\nCuantos referidos **ALQUILADOS** tienes?\nSi hace clic en Cancelar, el script detecta automáticamente que \nla próxima vez que la página es visitada sus referidos alquilados.');
    }
    
    if (rentedRefs && !isNaN(rentedRefs)) {
        manipulatePrefs("numberOfRentedRefs", rentedRefs, "set");
    }
    
    if ( (document.body.innerHTML.indexOf("f-us") < document.body.innerHTML.indexOf("f-pt")) && (document.body.innerHTML.indexOf("f-pt") < document.body.innerHTML.indexOf("f-es")) ) {
      var directRefs = prompt("NeoBux BR:\nHow many **DIRECT** referrals do you have?\nIf you click cancel, the script will automatically detect this value the next time you visit your direct referrals page.");
    } 
    else if (document.body.innerHTML.indexOf("f-es") > document.body.innerHTML.indexOf("f-pt")) {
      var directRefs = prompt('Neobux BR:\nQuantos referidos **DIRETOS** tens?\nSe você clicar em Cancelar, o script detectará automaticamente  essa quantidade \nna próxima vez que a página de suas referidos diretos for visitada.');
    } 
    else {
      var directRefs = prompt('Neobux BR:\nCuantos referidos **DIRECTOS** tienes?\nSi hace clic en Cancelar, el script detecta automáticamente esta cantidad \nla próxima vez que la página se refiere directamente a su visita.');
    }
    if (directRefs && !isNaN(directRefs)) {
        manipulatePrefs("numberOfDirectRefs", directRefs, "set");
    }
// Inform the script that the initial setup is complete.
        manipulatePrefs("firstRun", false.toString(), "set"); 
    }

// DEFINE Classes used by the Script
    var currentPage = new function () {
// Information about the page currently being viewed:
        this.URL = document.location.href;
        this.name = getCurrentPage("location");
        this.language = getCurrentPage("language");
    };

// Store how large the graphs are expected to be
// Recent changes to graphs mean that those that show
// click data are only 10-days long
    var graphSettings = new function (getSet) {
        if (!getSet) {
            getSet = "get";
        }
        this.refGraphLength = Number(manipulatePrefs("refGraphLength", 10, getSet));
        this.regularGraphLength = Number(manipulatePrefs("regularGraphLength", 15, getSet));
    };

// Information about the users account
    var myAccount = new function () {
        this.name = document.getElementById("t_conta").textContent;
        this.rentedRefCount = getNumberOfRefs("Rented");
        this.directRefCount = getNumberOfRefs("Direct");
        this.expensePerRentedReferralCost = this.rentedRefCount;
        this.getTotalRefCount = this.rentedRefCount + this.directRefCount;
        this.accountType = getAccountType(false);
        this.autopayLimit = getAutoPayLimit(this.accountType);
        this.autopayCost = getAutoPayCost(this.accountType);
        this.recycleCost = getRecycleCost(this.accountType);
        this.renewalFee = function (renewalPeriod) { return getRenewalFees(renewalPeriod); };
        this.goldenPackCost = getGoldenPackCost(this.accountType);
        this.ownClickValue = getOwnClickValue(this.accountType);
        this.directReferralClickValue = getDirectReferralClickValue(this.accountType);
        this.rentedReferralClickValue = getRentedReferralClickValue(this.accountType);
        
// This will later be used to get & store a local copy of user statistics.
// this.avgSpentOnRecycles = the average amount spent on recycling each day
        this.stats = new function (getSet) {
            if (!getSet) {
                getSet = "get";
            }
// TODO: Fetch this value automatically
            this.avgSpentOnRecycles = 2.608;
        };
// Get user preferences
        this.preferences = new function (getSet) {
            if (!getSet) {
                getSet = "get";
            }
// Script Settings
            this.updateFrequency = Number(manipulatePrefs("updateFrequency", 86400000, getSet));
            this.updateLastCheck = Number(manipulatePrefs("updateLastCheck", 0, getSet));
// Referral Counts
            this.overrideRentedReferralCount = toBool(manipulatePrefs("overrideRentedReferralCount", false, getSet));
            this.manualRentedReferralCount = Number(manipulatePrefs("manualRentedReferralCount", 0, getSet));
            this.overrideDirectReferralCount = toBool(manipulatePrefs("overrideDirectReferralCount", false, getSet));
            this.manualDirectReferralCount = Number(manipulatePrefs("manualDirectReferralCount", 0, getSet));
// Decimal Precision
            this.decimalPrecision = Number(manipulatePrefs("decimalPrecision", 3, getSet));
            this.nanString = "-." + new Array(this.decimalPrecision + 1).join("-");
// Flags
            this.textifyFlag = toBool(manipulatePrefs("textifyFlag", false, getSet));
            this.textifyFlag_prefix = manipulatePrefs("textifyFlag_prefix", " | ", getSet);
// Account Settings
            this.renewalPeriod = Number(manipulatePrefs("renewalPeriod", 240, getSet)); // 1 (AutoPay) | 15 days | 30 days | 60 days | 90 days | 150 days | 240 days
// Shrinking the contents of the columns
            this.letterSpacing = manipulatePrefs("letterSpacing", "0.0px", getSet);
            this.wordSpacing = manipulatePrefs("wordSpacing", "0.0px", getSet);
// Referral Number column
            this.referralNumber_shrinkContents = toBool(manipulatePrefs("referralNumber_shrinkContents", true, getSet));
// Flag column
            this.flag_shrinkContents = toBool(manipulatePrefs("flag_shrinkContents", true, getSet));
// Referral Name column
            this.referralName_shrinkContents = toBool(manipulatePrefs("referralName_shrinkContents", true, getSet));
// Came From column
            this.cameFrom_shrinkContents = toBool(manipulatePrefs("cameFrom_shrinkContents", true, getSet));
// Owned Since column:
            this.referralSince_numerise = toBool(manipulatePrefs("referralSince_numerise", false, getSet));
            this.referralSince_fullerTimers = toBool(manipulatePrefs("referralSince_fullerTimers", false, getSet));
            this.ownedSinceTimer_shortFormat = toBool(manipulatePrefs("ownedSinceTimer_shortFormat", false, getSet));
            this.referralSince_replace = toBool(manipulatePrefs("referralSince_replace", false, getSet));
            this.ownedSince_shrinkContents = toBool(manipulatePrefs("ownedSince_shrinkContents", true, getSet));
// Next Payment column
            this.nextPayment_shrinkContents = toBool(manipulatePrefs("nextPayment_shrinkContents", true, getSet));
// Last Click column:
            this.lastClick_numerise = toBool(manipulatePrefs("lastClick_numerise", false, getSet));
            this.lastClick_fullerTimers = toBool(manipulatePrefs("lastClick_fullerTimers", false, getSet));
            this.lastClickTimer_shortFormat = toBool(manipulatePrefs("lastClickTimer_shortFormat", false, getSet));
            this.lastClick_replace = toBool(manipulatePrefs("lastClick_replace", false, getSet));
            this.lastClick_replaceNilClicks = toBool(manipulatePrefs("lastClick_replaceNilClicks", false, getSet));
            this.lastClick_shrinkContents = toBool(manipulatePrefs("lastClick_shrinkContents", true, getSet));
// Total Clicks column
            this.totalClicks_shrinkContents = toBool(manipulatePrefs("totalClicks_shrinkContents", true, getSet));
// Average column
            this.exactAverage_show = toBool(manipulatePrefs("exactAverage_show", false, getSet));
            this.exactAverage_seperator = manipulatePrefs("exactAverage_seperator", " | ", getSet);
            this.exactAverage_replace = toBool(manipulatePrefs("exactAverage_replace", false, getSet));
            this.columnPrefix_Average = manipulatePrefs("columnPrefix_Average", "", getSet);
            this.average_shrinkContents = toBool(manipulatePrefs("average_shrinkContents", true, getSet));
// Profit Column
            this.showColumn_Profit = toBool(manipulatePrefs("showColumn_Profit", false, getSet));
            this.includeRecycleCostInProfitColumn = toBool(manipulatePrefs("includeRecycleCostInProfitColumn", false, getSet));
            this.columnPrefix_Profit = manipulatePrefs("columnPrefix_Profit", "$", getSet);
            this.profitColumn_shrinkContents = toBool(manipulatePrefs("profitColumn_shrinkContents", true, getSet));
// Time Periods for 'smaller' 10day graphs
            this.timePeriod_s1 = Number(manipulatePrefs("timePeriod_s1", 5, getSet));
            this.timePeriod_s2 = Number(manipulatePrefs("timePeriod_s2", 7, getSet));
            this.timePeriod_s3 = Number(manipulatePrefs("timePeriod_s3", graphSettings.refGraphLength, getSet));
// Time Periods for 'larger' 15day graphs
            this.timePeriod_1 = Number(manipulatePrefs("timePeriod_1", 5, getSet));
            this.timePeriod_2 = Number(manipulatePrefs("timePeriod_2", 10, getSet));
            this.timePeriod_3 = Number(manipulatePrefs("timePeriod_3", graphSettings.regularGraphLength, getSet));
// Time Period for 'recent' section of the Referral statistics sidebar
            this.timePeriod_recent = Number(manipulatePrefs("timePeriod_recent", 10, getSet));
        }
// Get Preferences for Ultimate-Only Features
        this.ultimatePreferences = new function (getSet) {
            if (!getSet) {
                var getSet = "get";
            }
// Time Period for the 'average1' column (previously the A10 column)
            this.timePeriod_average1 = Number(manipulatePrefs("timePeriod_average1", 10, getSet));
// Time Period for the 'average2' column (previously the A7 column)
            this.timePeriod_average2 = Number(manipulatePrefs("timePeriod_average2", 7, getSet));
// Show Minigraph Average Footer
            this.showRecentAverage = toBool(manipulatePrefs("showRecentAverage", true, getSet));
            this.RA_shrinkContents = toBool(manipulatePrefs("RA_shrinkContents", true, getSet));
// Time Period for Minigraph Average
            this.minigraphAvgInterval = Number(manipulatePrefs("minigraphAvgInterval", 10, getSet));
// 'clickText' column
            this.showColumn_clickText = toBool(manipulatePrefs("showColumn_clickText", true, getSet));
            this.columnPrefix_clickText = manipulatePrefs("columnPrefix_clickText", "", getSet);    
            this.clickText_shrinkContents = toBool(manipulatePrefs("clickText_shrinkContents", true, getSet));
// 'average1' column (previously the A10 column)
            this.showColumn_Average1 = toBool(manipulatePrefs("showColumn_Average1", true, getSet));
            this.columnPrefix_Average1 = manipulatePrefs("columnPrefix_Average1", "", getSet);
            this.average1_shrinkContents = toBool(manipulatePrefs("average1_shrinkContents", true, getSet));
// 'average2' column (previously the A7 column)
            this.showColumn_Average2 = toBool(manipulatePrefs("showColumn_Average2", true, getSet));
            this.columnPrefix_Average2 = manipulatePrefs("columnPrefix_Average2", "", getSet);
            this.average2_shrinkContents = toBool(manipulatePrefs("average2_shrinkContents", true, getSet));
// Standard Deviation (SDEV / SD) Column
            this.showSDEVColumn = toBool(manipulatePrefs("showSDEVColumn", true, getSet));
            this.columnPrefix_SD = manipulatePrefs("columnPrefix_SD", "", getSet);
            this.SD_shrinkContents = toBool(manipulatePrefs("SD_shrinkContents", true, getSet));
// Ratio of Standard deviation and Average (RSA) Column
            this.showColumn_RSA = toBool(manipulatePrefs("showColumn_RSA", true, getSet));
            this.columnPrefix_RSA = manipulatePrefs("columnPrefix_RSA", "", getSet);
            this.RSA_shrinkContents = toBool(manipulatePrefs("RSA_shrinkContents", true, getSet));
        }
    };

    var numberOfRentedReferrals;
    var numberOfDirectReferrals;
    if (myAccount.preferences.overrideRentedReferralCount) {
        numberOfRentedReferrals = myAccount.preferences.manualRentedReferralCount;
    } else {
        numberOfRentedReferrals = myAccount.rentedRefCount;
    }
    if (myAccount.preferences.overrideDirectReferralCount) {
        numberOfDirectReferrals = myAccount.preferences.manualDirectReferralCount;
    } else {
        numberOfDirectReferrals = myAccount.directRefCount;
    }

// mathematical function.. calc num^2
    Math.square = function (num) {
      return num * num;
    };

// Functions used by script
    function getDaysTilPaidOwnRecycle(indivAvg, currentProfit, expensesPerRefPerDay) {
        var incomePerRefPerDay = indivAvg * myAccount.rentedReferralClickValue;
        var dayCounter = 0;
        var indivProfit = [];
        var dayLimit = 30;
        var profitNeeded = myAccount.recycleCost - currentProfit;
// Pre-Calculate the amount of profit that will be made after dayCounter days at indivAvg clicks per day
        do {
            dayCounter += 1;
            indivProfit[dayCounter] = dayCounter * (incomePerRefPerDay - expensesPerRefPerDay);
        } while (dayCounter < dayLimit);
// If currentProfit is less than the cost of recycling, return number of days until currentProfit > recycleCost
// Else return 'N/A' to signify that the referral has already generated enough profit to pay for its own recycle
        if (myAccount.recycleCost > currentProfit) {
// Find the point where projected individual profit will be equal to or greater than
// the amount of profit needed to pay for its own recycle
            var numberOfDays = 1;
            while (indivProfit[numberOfDays] < profitNeeded) {
                numberOfDays += 1;
            }
// Check whether the numberOfDays is unreasonably large
// If it is unreasonably large (default max: 30 days), then return a message saying this
            if (numberOfDays > dayLimit) {
      numberOfDays = localString('Morethan') + ' ' + dayLimit + ' ' + localString('days') ;
            }
            return numberOfDays;
        } else {
            return "0";
        }
    }

// Calculate the number of days since the date 'tmp'
// Will work with the words 'today' & 'yesterday' too
    function NumDaysSince(longDate, detail, fullerTimer, shortFormat) {
        if (!shortFormat) {
            shortFormat = false;
        }
// Clean the input string and split it to [0] = date, [1] = time
        longDate = longDate.replace("&nbsp;", "").split(" ");
// If longDate is a date with time (eg, 'owned since' column), longDate[1] === time
// If longDate is just a date (eg, 'last click' column), longDate.length === 1
        var i;
        for (i = 1; i < longDate.length; i += 1) {
            if (longDate[i].indexOf(":") > -1) {
                break;
            }
            longDate[0] += " " + longDate[i];
        }
        if (longDate[longDate.length - 1].indexOf(":") > -1) {
            longDate = [longDate[0], longDate[longDate.length - 1]];
        } else {
            longDate = [longDate[0], "00:00"];
        }
        var tt = longDate[1].split(":");
        var Since;
        if (longDate[0].match(neobuxString("today"))) {
            Since = new Date(Today.getFullYear(), Today.getMonth(), Today.getDate(), tt[0], tt[1]);
        } else if (longDate[0].match(neobuxString("yesterday"))) {
            Since = new Date(Yesterday.getFullYear(), Yesterday.getMonth(), Yesterday.getDate(), tt[0], tt[1]);
        } else {
            Since = new Date(longDate[0] + " " + longDate[1]);
        }
        var timeElapsed = "";
        var dateDiff = (Today - Since) / 86400000;
        var wholeDaysOwned = Math.floor(dateDiff);
        var wholeHoursOwned = Math.floor((dateDiff - wholeDaysOwned) * 24);
        var wholeMinsOwned = Math.floor((((dateDiff - wholeDaysOwned) * 24) - wholeHoursOwned) * 60 );
        if (fullerTimer || detail === "decimal") {
            if (detail === "decimal") {
                timeElapsed = dateDiff;
            } else if (detail !== "days" && detail !== "hrs" && detail !== "mins" && detail !== "wholeDays" && detail !== "decimal") {
                GM.log("Variable 'detail' not valid");
            } else {
                if (!shortFormat) {
          var day_text = " "+localString("day")+"";
          var days_text = " "+localString("days")+"";
          var hr_text = " "+localString("hr")+"";
          var hrs_text = " "+localString("hrs")+"";
          var min_text = " "+localString("min")+"";
          var mins_text = " "+localString("mins")+"";
                } else {
                    var day_text = "d";
                    var days_text = "d";
                    var hr_text = "h";
                    var hrs_text = "h";
                    var min_text = "m";
                    var mins_text = "m";
                }
                var spacer = " " + localString("and") + " ";
// Chrome bug: ""timeElapsed  +="" must be used repeatedly, else will append values in the wrong order
// eg, (d0, 2h, 48m) instead of (0d, 2h, 48m)
                if (detail === "days" || detail === "hrs" || detail === "mins") {
                    if (wholeDaysOwned !== 1) {
                        timeElapsed += wholeDaysOwned;
                        timeElapsed += days_text;
                    } else {
                        timeElapsed += wholeDaysOwned;
                        timeElapsed += day_text;
                    }
                }
                if (detail === "hrs" || detail === "mins") {
                    if (wholeHoursOwned !== 1) {
                        timeElapsed += spacer;
                        timeElapsed += wholeHoursOwned;
                        //timeElapsed += hrs_text;
                    } else {
                        timeElapsed += spacer;
                        timeElapsed += wholeHoursOwned;
                        //timeElapsed += hr_text;
                    }
                }
                if (detail === "mins") {
                    if (wholeMinsOwned !== 1) {
                        timeElapsed += ":";
                        timeElapsed += wholeMinsOwned;
                        //timeElapsed += mins_text;
                    } else {
                        timeElapsed += ":";
                        timeElapsed += wholeMinsOwned;
                        //timeElapsed += min_text;
                    }
                }
            }
        }
        if ((!fullerTimer || detail === "wholeDays") && detail !== "decimal") {
            timeElapsed = Math.floor(dateDiff);
        }
      return timeElapsed;
    }

    function showSettingsEditor() {
        Config.show(null);
    }

    function localString(key, text) {
        var string;
        var language = currentPage.language;
        if ("undefined" !== typeof scriptLangStrings[language]) {
            string = scriptLangStrings[language][key];
        } else if ("undefined" !== typeof scriptLangStrings["US"]) {
            string = scriptLangStrings["US"][key];
        } else {
            return key;
        }
        if (text) {
            string = string.replace("%s", text);
        }
        return string;
    }

    function neobuxString(key) {
        var pageLanguage = currentPage.language;
        if ("undefined" !== typeof neobuxLangStrings[pageLanguage]) {
            return neobuxLangStrings[pageLanguage][key];
        } else if ("undefined" !== typeof neobuxLangStrings["US"]) {
            return neobuxLangStrings["US"][key];
        } else {
            return key;
        }
    }

// Object that will hold the data about the current graph
    function graphProperties(values, totals) {
        this.value = new function () {
            var i = 1;
            var tmp = [0];
            do {
                tmp[i] = values[i - 1];
                if (isNaN(tmp[i]) || !isFinite(tmp[i])) {
                    tmp[i] = -1;
                }
            } while (i++ < values.length);
            return tmp;
        };
        this.totals = new function () {
            var i = 1;
            var tmp = [0];
            do {
                tmp[i] = tmp[i - 1] + parseFloat(values[i - 1]);
                if (isNaN(tmp[i]) || !isFinite(tmp[i])) {
                    tmp[i] = -1;
                }
            } while (i++ < values.length);
            return tmp;
        };
        this.today = values[0];
        this.yesterday = values[1];
        this.recent = totals[myAccount.preferences.timePeriod_recent - 1];
        this.mean = new function () {
            var i = 1;
            var tmp = [0];
            do {
                tmp[i] = totals[i - 1] / i;
                if (isNaN(tmp[i]) || !isFinite(tmp[i])) {
                    tmp[i] = -1;
                }
                customLogger("i = " + i + "\n" +
                        "totals[i] = " + totals[i] + "\n" +
                        "totals[i - 1] = " + totals[i - 1] + "\n" +
                        "totals[i - 2] = " + totals[i - 2] + "\n" +
                        "tmp[i] = " + tmp[i], 12);
            } while (i++ < totals.length);
            return tmp;
        };
        this.variance = new Stats(values).variance;
        this.sdev = new Stats(values).sdev;
        customLogger("values = " + values + "\n" +
                "totals = " + totals + "\n" +
                "this.today = " + this.today + "\n" +
                "this.yesterday = " + this.yesterday + "\n" +
                "this.value = " + this.value + "\n" +
                "this.totals = " + this.totals + "\n" +
                "this.mean = " + this.mean + "\n" +
                "this.variance = " + this.variance + "\n" +
                "this.sdev = " + this.sdev + "\n" +
                "totals.length = " + totals.length + "\n" +
                "this.value.length = " + this.value.length, [7, 10, 12]);
    }

    var Today = new Date();
    var Yesterday = new Date();
    Yesterday.setDate(Today.getDate() - 1);

    var today = new function () {};
    var yesterday = new function () {};
    var recent = new function () {};

  // Make spaces etc appear properly without needing to use &nbsp;
  // SETTINGS EDITING / CONFIG
  if ( (document.body.innerHTML.indexOf("f-us") < document.body.innerHTML.indexOf("f-pt")) && (document.body.innerHTML.indexOf("f-pt") < document.body.innerHTML.indexOf("f-es")) ) {
    Config.scriptName = "Neobux BR";
    Config.tabs = {
      "Account Details": {
        html: "<p>This page is purely for informational purposes only to display what the script believes about your account. These are not settings that can be altered.</p>",
        fields: {
          html: {
            type: "html",
            html: "<table style='border-collapse: collapse;'>" +
            "<tr><td>Your Username: </td><td style='font-weight: bold !important;'>" + myAccount.name + "</td></tr>" +
            "<tr><td>Your Account Type: </td><td style='font-weight: bold !important;'>" + getAccountType(true) + "</td></tr>" +
            "<tr><td>NeoBux Language: </td><td style='font-weight: bold !important;'>" + {
              "US": "English",
              "PT": "Portuguese",
              "ES": "Spanish",
                                "GR": "Greek",
                                "ID": "Indonesian",
                                "FI": "Finnish",
              "DE": "German",
              "FR": "French"
            }[currentPage.language] + "</td></tr>" +
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +
            "<tr><td># of rented referrals: </td><td style='font-weight: bold !important;'>" + myAccount.rentedRefCount + "</td></tr>" +
            "<tr><td># of direct referrals: </td><td style='font-weight: bold !important;'>" + myAccount.directRefCount + "</td></tr>" +
            "<tr><td>Total # of referrals: </td><td style='font-weight: bold !important;'>" + myAccount.getTotalRefCount + "</td></tr>" +
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +
            "<tr><td>Your AutoPay Limit (days): </td><td style='font-weight: bold !important;'>" + myAccount.autopayLimit + "</td></tr>" +
            "<tr><td>Your AutoPay Cost: </td><td style='font-weight: bold !important;'>$" + myAccount.autopayCost + "</td></tr>" +
            "<tr><td>Your Recycle Cost: </td><td style='font-weight: bold !important;'>$" + myAccount.recycleCost + "</td></tr>" +
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "<tr><td>The value of your clicks: </td><td style='font-weight: bold !important;'>$" + myAccount.ownClickValue + "</td></tr>" +
            "<tr><td>The value of your rented referrals' clicks: </td><td style='font-weight: bold !important;'>$" + myAccount.rentedReferralClickValue + "</td></tr>" +
            "<tr><td>The value of your direct referrals' clicks: </td><td style='font-weight: bold !important;'>$" + myAccount.directReferralClickValue + "</td></tr>" +
            "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" +
            "</table>"
          }
        }
      },
      "Account Settings": {
        html: "<p>These settings are related to how you choose to manage your account and what the script has stored regarding your account.</p>",
        fields: {
          renewalPeriod: {
            type: "select",
            label: "Renewal Period",
            options: {
              "AutoPay": "1",
              "15": "15",
              "30": "30",
              "60": "60",
              "90": "90",
              "150": "150",
              "240": "240"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>The number of days that you renew for.<br/>Recommended: 240 day renewals, AutoPay off.<br/>AutoPay, 15 days, 30 days, 60 days, 90 days, 150 days, 240 days</font>",
            value: myAccount.preferences.renewalPeriod
          },
          spacer_1: {
            type: "spacer",
            height: "15px"
          },
          overrideRentedReferralCount: {
            type: "checkbox",
            label: "Override",
            text: "<font style='font-size: x-small; font-style: italic;'>Do you want to override how many Rented referrals the script thinks that you have?</font>",
            value: myAccount.preferences.overrideRentedReferralCount
          },
          manualRentedReferralCount: {
            type: "text",
            label: "Rented Refs",
            text: "<font style='font-size: x-small; font-style: italic;'>How many rented referrals you have.</font>",
            value: myAccount.preferences.manualRentedReferralCount
          },
          spacer_2: {
            type: "spacer",
            height: "15px"
          },
          overrideDirectReferralCount: {
            type: "checkbox",
            label: "Override",
            text: "<font style='font-size: x-small; font-style: italic;'>Do you want to override how many Direct referrals the script thinks that you have?</font>",
            value: myAccount.preferences.overrideDirectReferralCount
          },
          manualDirectReferralCount: {
            type: "text",
            label: "Direct Refs",
            text: "<font style='font-size: x-small; font-style: italic;'>How many direct referrals you have.</font>",
            value: myAccount.preferences.manualDirectReferralCount
          },
          spacer_3: {
            type: "spacer",
            height: "15px"
          },
          decimalPrecision: {
            type: "select",
            label: "Decimal Precision",
            options: {
              "0.01": "2",
              "0.001": "3",
              "0.0001": "4"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>The number of digits following the point.<br/>Default: 0.0001</font>",
            value: myAccount.preferences.decimalPrecision
          }
        }
      },
      "Referral Listings": {
        html: "<p>These settings are used to control what happens on the referral listings pages.</p>",
        fields: {
          header_Spacing: {
            type: "html",
            html: "<p><b>Shrinking the contents of the columns:</b></p>"
          },
          letterSpacing: {
            type: "select",
            label: "Letter Spacing",
            options: {
              "-1.0px": "-1.0px",
              "-0.9px": "-0.9px",
              "-0.8px": "-0.8px",
              "-0.7px": "-0.7px",
              "-0.6px": "-0.6px",
              "-0.5px": "-0.5px",
              "-0.4px": "-0.4px",
              "-0.3px": "-0.3px",
              "-0.2px": "-0.2px",
              "-0.1px": "-0.1px",
              "0.0px": "0.0px",
              "0.1px": "0.1px",
              "0.2px": "0.2px",
              "0.3px": "0.3px",
              "0.4px": "0.4px",
              "0.5px": "0.5px",
              "0.6px": "0.6px",
              "0.7px": "0.7px",
              "0.8px": "0.8px",
              "0.9px": "0.9px",
              "1.0px": "1.0px"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>The space between characters.<br/>Default: 0.0px</font>",
            value: myAccount.preferences.letterSpacing
          },
          wordSpacing: {
            type: "select",
            label: "Word Spacing",
            options: {
              "-1.0px": "-1.0px",
              "-0.9px": "-0.9px",
              "-0.8px": "-0.8px",
              "-0.7px": "-0.7px",
              "-0.6px": "-0.6px",
              "-0.5px": "-0.5px",
              "-0.4px": "-0.4px",
              "-0.3px": "-0.3px",
              "-0.2px": "-0.2px",
              "-0.1px": "-0.1px",
              "0.0px": "0.0px",
              "0.1px": "0.1px",
              "0.2px": "0.2px",
              "0.3px": "0.3px",
              "0.4px": "0.4px",
              "0.5px": "0.5px",
              "0.6px": "0.6px",
              "0.7px": "0.7px",
              "0.8px": "0.8px",
              "0.9px": "0.9px",
              "1.0px": "1.0px"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>The white space between words.<br/>Default: 0.0px</font>",
            value: myAccount.preferences.wordSpacing
          },
          header_referralNumberColumn: {
            type: "html",
            html: "<br/><p><b>Referral Number Column:</b></p>"
          },
          referralNumber_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Referral Number column be shrunk?</font>",
            value: myAccount.preferences.referralNumber_shrinkContents
          },
          header_refFlags: {
            type: "html",
            html: "<br/><p><b>Referral Flags:</b></p>"
          },
          textifyFlag: {
            type: "checkbox",
            label: "Textify Flag",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the flags be textified?<br/>R = Red, O = Orange, Y = Yellow, G = Green, W = White, B = Blue</font>",
            value: myAccount.preferences.textifyFlag
          },
          textifyFlag_prefix: {
            type: "text",
            label: "Separator",
            text: "<font style='font-size: x-small; font-style: italic;'>What should seperate the flag & text?</font>",
            value: myAccount.preferences.textifyFlag_prefix
          },
          flag_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Flag column be shrunk?</font>",
            value: myAccount.preferences.flag_shrinkContents
          },
          header_referralNameColumn: {
            type: "html",
            html: "<br/><p><b>Referral Name Column:</b></p>"
          },
          referralName_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<span style='font-size: x-small; font-style: italic;'>Should the flags be textified?<br/>W = White, R = Red, O = Orange, Y = Yellow, G = Green, Bl = Blue, P = Pink, Bk = Black</span>",
            value: myAccount.preferences.referralName_shrinkContents
          },
          header_cameFromColumn: {
            type: "html",
            html: "<br/><p><b>Came From Column:</b></p>"
          },
          cameFrom_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Came From column be shrunk?</font>",
            value: myAccount.preferences.cameFrom_shrinkContents
          },
          header_ownedSinceColumn: {
            type: "html",
            html: "<br/><p><b>Owned Since Column:</b></p>"
          },
          /*referralSince_numerise: {
            type: "checkbox",
            label: "Numerise:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the date be turned to days/hrs/mins? If set to false, the settings below are ignored.</font>",
            value: myAccount.preferences.referralSince_numerise
          },
          referralSince_fullerTimers: {
            type: "checkbox",
            label: "Fuller:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the 'numerised' date be 'fuller'?<br/>TRUE == days/hours/mins, FALSE == days only</font>",
            value: myAccount.preferences.referralSince_fullerTimers
          },
          ownedSinceTimer_shortFormat: {
            type: "checkbox",
            label: "Short Format:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the 'numerised' date be shortened?<br/>TRUE == d/h/m, FALSE == days/hours/mins</font>",
            value: myAccount.preferences.ownedSinceTimer_shortFormat
          },
          referralSince_replace: {
            type: "checkbox",
            label: "Replace:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the 'numerised' date replace the text?<br/>TRUE == 10 days, 21 hrs, 16 mins, FALSE == 2009/12/21 17:20 (10 days, 21 hrs, 16 mins)</font>",
            value: myAccount.preferences.referralSince_replace
          },*/
          ownedSince_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Owned Since column be shrunk?</font>",
            value: myAccount.preferences.ownedSince_shrinkContents
          },
          header_nextPaymentColumn: {
            type: "html",
            html: "<br/><p><b>Next Payment Column:</b></p>"
          },
          nextPayment_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Next Payment column be shrunk?</font>",
            value: myAccount.preferences.nextPayment_shrinkContents
          },
          header_lastClickColumn: {
            type: "html",
            html: "<br/><p><b>Last Click Column:</b></p>"
          },
          /*lastClick_numerise: {
            type: "checkbox",
            label: "Numerise:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the date be turned to days/hrs/mins? If set to false, the settings below are ignored.</font>",
            value: myAccount.preferences.lastClick_numerise
          },
          lastClick_fullerTimers: {
            type: "checkbox",
            label: "Fuller:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the 'numerised' date be 'fuller'?<br/>TRUE == days/hours/mins, FALSE == days only</font>",
            value: myAccount.preferences.lastClick_fullerTimers
          },
          lastClickTimer_shortFormat: {
            type: "checkbox",
            label: "Short Format:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the 'numerised' date be shortened?<br/>TRUE == d/h/m, FALSE == days/hours/mins</font>",
            value: myAccount.preferences.lastClickTimer_shortFormat
          },
          lastClick_replace: {
            type: "checkbox",
            label: "Replace:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the 'numerised' date replace the text?<br/>TRUE == 6 days, FALSE == 2009/12/26 [6 days]</font>",
            value: myAccount.preferences.lastClick_replace
          },
          lastClick_replaceNilClicks: {
            type: "checkbox",
            label: "Replace Nil:",
            text: "<font style='font-size: x-small; font-style: italic;'>If the user has not clicked yet, should the 'No Clicks Yet' text be removed to narrow the column?</font>",
            value: myAccount.preferences.lastClick_replaceNilClicks
          },*/
          lastClick_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Last Click column be shrunk?</font>",
            value: myAccount.preferences.lastClick_shrinkContents
          },
          header_totalClicksColumn: {
            type: "html",
            html: "<br/><p><b>Total Clicks Column:</b></p>"
          },
          totalClicks_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Total Clicks column be shrunk?</font>",
            value: myAccount.preferences.totalClicks_shrinkContents
          },
          header_avgColumn: {
            type: "html",
            html: "<br/><p><b>Average Column:</b></p>"
          },
          /*exactAverage_show: {
            type: "checkbox",
            label: "Exact Average",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the exact average be shown? The regular average uses days.<br/>This 'exact' average is calculated using the age of the referral in minutes.</font>",
            value: myAccount.preferences.exactAverage_show
          },
          exactAverage_seperator: {
            type: "text",
            label: "Separator",
            text: "<font style='font-size: x-small; font-style: italic;'>What should seperate the normal & exact average?</font>",
            value: myAccount.preferences.exactAverage_seperator
          },
          columnPrefix_Average: {
            type: "text",
            label: "Prefix",
            text: "<font style='font-size: x-small; font-style: italic;'>What should be displayed before the regular average?</font>",
            value: myAccount.preferences.columnPrefix_Average
          },
          exactAverage_replace: {
            type: "checkbox",
            label: "Replace Average",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the exact average completely replace the regular average?</font>",
            value: myAccount.preferences.exactAverage_replace
          },*/
          average_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Average column be shrunk?</font>",
            value: myAccount.preferences.average_shrinkContents
          },
          /*header_profitColumn: {
            type: "html",
            html: "<br/><p><b>Profit Column:</b></p>"
          },
          showColumn_Profit: {
            type: "checkbox",
            label: "Show:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the profit column be shown?</font>",
            value: myAccount.preferences.showColumn_Profit
          },
          includeRecycleCostInProfitColumn: {
            type: "checkbox",
            label: "Recycle Cost:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the profit column deduct the recycle cost from the value to be shown?<br/>TRUE == display {profit}, FALSE == display {profit - cost of one recycle}</font>",
            value: myAccount.preferences.includeRecycleCostInProfitColumn
          },
          columnPrefix_Profit: {
            type: "text",
            label: "Separator",
            text: "<font style='font-size: x-small; font-style: italic;'>What should show before the profit value? eg, this can be used to make the script only show a number. Default: $</font>",
            value: myAccount.preferences.columnPrefix_Profit
          },
          profitColumn_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Profit column be shrunk?</font>",
            value: myAccount.preferences.profitColumn_shrinkContents
          }*/
        }
      },
      "Referral Listings 2": {
        html: "<p>These settings are used to control what happens on the referral listings pages.</p><p><strong>These settings affect Ultimate-members only:</strong></p>",
        fields: {
          columnHeader_clickText: {
            type: "html",
            html: "<br/><p><b>Click Text ('Clicks/day') Column:</b></p>"
          },
          showColumn_clickText: {
            type: "checkbox",
            label: "Show:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the 'Click-Text' column be shown?</font>",
            value: myAccount.ultimatePreferences.showColumn_clickText
          },
          columnPrefix_clickText: {
            type: "text",
            label: "Prefix",
            text: "<font style='font-size: x-small; font-style: italic;'>What should show before the 'Click-Text' value? Default: null</font>",
            value: myAccount.ultimatePreferences.columnPrefix_clickText
          },
          clickText_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Click Text ('Clicks/day') column be shrunk?</font>",
            value: myAccount.ultimatePreferences.clickText_shrinkContents
          },
          columnHeader_average1: {
            type: "html",
            html: "<br/><p><b>'average1' (A" + myAccount.ultimatePreferences.timePeriod_average1 + ") Column:</b></p>"
          },
          showColumn_Average1: {
            type: "checkbox",
            label: "Show:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the average1 column be shown?</font>",
            value: myAccount.ultimatePreferences.showColumn_Average1
          },
          columnPrefix_Average1: {
            type: "text",
            label: "Prefix",
            text: "<font style='font-size: x-small; font-style: italic;'>What should show before the average1 value? eg, this can be used to make the script only show a number. Default: null</font>",
            value: myAccount.ultimatePreferences.columnPrefix_Average1
          },
          average1_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the average1 column be shrunk?</font>",
            value: myAccount.ultimatePreferences.average1_shrinkContents
          },
          columnHeader_average2: {
            type: "html",
            html: "<br/><p><b>'average2' (A" + myAccount.ultimatePreferences.timePeriod_average2 + ") Column:</b></p>"
          },
          showColumn_Average2: {
            type:"checkbox",
            label:"Show:",
            text: '<font style="font-size: x-small; font-style: italic;">Should the average2 column be shown?</font>',
            value: myAccount.ultimatePreferences.showColumn_Average2
          },
          columnPrefix_Average2: {
            type:"text",
            label:"Prefix",
            text: '<font style="font-size: x-small; font-style: italic;">What should show before the average2 value? eg, this can be used to make the script only show a number. Default: null</font>',
            value: myAccount.ultimatePreferences.columnPrefix_Average2
          },
          average2_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the average2 column be shrunk?</font>",
            value: myAccount.ultimatePreferences.average2_shrinkContents
          },
          header_sdColumn: {
            type: "html",
            html: "<br/><p><b>Standard Deviation (SD) Column:</b></p>"
          },
          showSDEVColumn: {
            type: "checkbox",
            label: "Show:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the SD column be shown?</font>",
            value: myAccount.ultimatePreferences.showSDEVColumn
          },
          columnPrefix_SD: {
            type: "text",
            label: "Prefix",
            text: "<font style='font-size: x-small; font-style: italic;'>What should show before the SD value? eg, this can be used to make the script only show a number. Default: null</font>",
            value: myAccount.ultimatePreferences.columnPrefix_SD
          },
          SD_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the SDEV column be shrunk?</font>",
            value: myAccount.ultimatePreferences.SD_shrinkContents
          },
          header_rsaColumn: {
            type: "html",
            html: "<br/><p><b>Ratio of Standard deviation and Average (RSA) Column:</b></p>",
          },
          showColumn_RSA: {
            type: "checkbox",
            label: "Show:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should RSA column be shown?<br/>NOTE: RSA == Ratio of Standard deviation and Average</font>",
            value: myAccount.ultimatePreferences.showColumn_RSA
          },
          columnPrefix_RSA: {
            type: "text",
            label: "Prefix",
            text: "<font style='font-size: x-small; font-style: italic;'>What should show before the RSA value? eg, this can be used to make the script only show a number. Default: null</font>",
            value: myAccount.ultimatePreferences.columnPrefix_RSA
          },
          RSA_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the RSA column be shrunk?</font>",
            value: myAccount.ultimatePreferences.RSA_shrinkContents
          },
          header_maFooter: {
            type: "html",
            html: "<br/><p><b>Minigraph Average Footer:</b></p>"
          },
          showRecentAverage: {
            type: "checkbox",
            label: "Show:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should Minigraph Average footer be shown?</font>",
            value: myAccount.ultimatePreferences.showRecentAverage
          },
          RA_shrinkContents: {
            type: "checkbox",
            label: "Shrink:",
            text: "<font style='font-size: x-small; font-style: italic;'>Should the contents of the Minigraph Average footer be shrunk?</font>",
            value: myAccount.ultimatePreferences.RA_shrinkContents
          }
        }
      },
      "Time Periods": {
        html:"<p>These settings change what number of days that the averages are calculated for under the graphs.<br/></p>",
        fields: {
          spacer_1: {
            type: "html",
            html: "<br/><p>Time Periods for the smaller graphs:</p>"
          },
          timePeriod_s1: {
            type: "select",
            label: "Time Period 1",
            options: {
              "1": "1",
              "2": "2", 
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 5</font>",
            value: myAccount.preferences.timePeriod_s1
          },
          timePeriod_s2: {
            type: "select",
            label: "Time Period 2",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 7<br/>NOTE: Time Period 2 should be larger than Time Period 1</font>",
            value: myAccount.preferences.timePeriod_s2
          },
          timePeriod_s3: {
            type: "select",
            label: "Time Period 3",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 10<br/>NOTE: Time Period 3 should be larger than Time Period 2</font>",
            value: myAccount.preferences.timePeriod_s3
          },
          spacer_2: {
            type: "html",
            html: "<br/><p>Time Periods for the larger graphs:</p>"
          },
          timePeriod_1: {
            type: "select",
            label: "Time Period 1",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10",
              "11": "11",
              "12": "12",
              "13": "13"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 5</font>",
            value: myAccount.preferences.timePeriod_1
          },
          timePeriod_2: {
            type: "select",
            label: "Time Period 2",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10",
              "11": "11",
              "12": "12",
              "13": "13",
              "14": "14"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 10<br/>NOTE: Time Period 2 should be larger than Time Period 1</font>",
            value: myAccount.preferences.timePeriod_2
          },
          timePeriod_3: {
            type: "select",
            label: "Time Period 3",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10",
              "11": "11",
              "12": "12",
              "13": "13",
              "14": "14",
              "15": "15"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 15<br/>NOTE: Time Period 3 should be larger than Time Period 2</font>",
            value: myAccount.preferences.timePeriod_3
          },
          spacer_3: {
            type: "html",
            html: "<br/><p>Referral statistics sidebar:</p>"
          },
          timePeriod_recent: {
            type: "select",
            label: "Recent section",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 10</font>",
            value: myAccount.preferences.timePeriod_recent
          },
          spacer_4: {
            type: "html",
            html: "<br/><p>Ultimate-members only:</p>"
          },
          timePeriod_average1: {
            type: "select",
            label: "'Average1' column",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 10</font>",
            value: myAccount.ultimatePreferences.timePeriod_average1
          },
          timePeriod_average2: {
            type: "select",
            label: "'Average2' column",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 7</font>",
            value: myAccount.ultimatePreferences.timePeriod_average2
          },
          minigraphAvgInterval: {
            type: "select",
            label: "Minigraph Average",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 10</font>",
            value: myAccount.ultimatePreferences.minigraphAvgInterval
          }
        }
      },
      "Updater Settings": {
        html: "<p>Updater settings:</p>",
        fields: {
          updateFrequency: {
            type: "select",
            label: "Update Frequency",
            options: {
              "Daily": "86400000",
              "Weekly": "604800000",
              "Monthly": "2592000000",
              "Never": "0"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>How often should the script look for updates?<br/>Recommended: Daily</font>",
            value: myAccount.preferences.updateFrequency
          }
        }
      },
      "About": {
        html:'<p><strong>About the script:</strong></p>'+
        '<p>This script is designed to make managing your Neobux account as easy as possible and to put as much information under your fingertips as possible.</p>'+
        '<p><strong>Want to say thanks?</strong></p>'+
        '<p>Its always nice to hear from people who like the work I do - just head over to <a href="http://www.neobux.com/forum/?frmid=7&tpcid=78359">the Neobux forums</a> and a simple "i want to have your babies!" or "you are my superstar!" should suffice, but a generous post simply saying "thanks" will always be welcome too =]<br/><br/>'+
        'Incidentally, if you are sure that something isn\'t quite right and you have already checked that it isn\'t the flying spaghetti monster playing tricks on you, <a href="http://www.neobux.com/forum/?frmid=7&tpcid=78359">the Neobux forums</a> should be your first port of call for feature requests and complaints. </p><br/>'+
        '<p><strong>Other Scripts by Dobrin Dobrev</strong></p>'+
        '<p>If you like this script, take a look at my other scripts at <a href="http://userscripts.org/users/129562/scripts">userscripts.org</a><br/>Not all of them are as useful as this script and usually the description is good enough to figure out what it does, but any questions can be sent to the same place as above.</p>'+
        // '<p><strong>History of the script:</strong></p>'+
        // '<p>The Neobux 2+ script has had quite a few contributors during its lifetime. To my knowledge, it was originally created by uriburi206 and was later maintained and updated by oselamet (JM2T translated the script at some point too =] ).<br/><br/>Later kwah took over and rewrote the code, releasing it as version 3 (v3).</p>'+
        '',
        fields: {
        }
      }
    };
  } 
  else if (document.body.innerHTML.indexOf("f-es") > document.body.innerHTML.indexOf("f-pt")) {
    Config.scriptName = "Neobux BR";
    Config.tabs = {
      "Detalhes da Conta": {
        html:'<p>Esta p&aacute;gina &eacute; apenas para fins informativos e apenas para mostrar o que o script entende sobre sua conta. Estas n&atilde;o s&atilde;o configura&ccedil;&otilde;es que podem ser alteradas.</p>',
        fields: {
          html: {
            type:"html",
            html:"<table style='border-collapse: collapse;'>"+
              "<tr><td>Seu Nome de Utilizador: </td><td style='font-weight: bold !important;'>" + myAccount.name + "</td></tr>" + 
              "<tr><td>Seu tipo de Conta: </td><td style='font-weight: bold !important;'>" + getAccountType(true) + "</td></tr>" + 
              "<tr><td>Linguagem do NeoBux: </td><td style='font-weight: bold !important;'>" + {
                "US": "Inglês",
                "PT": "Português",
                "ES": "Espanhol",
                "GR": "Grego",
                                                "ID": "Indonesio",
                "FI": "Finlandês",
                "SE": "Sueco",
                "DE": "Alemão",
                "FR": "Francês"
              }[currentPage.language] + "</td></tr>" +
              "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
              "<tr><td>N&ordm; de referidos alugados: </td><td style='font-weight: bold !important;'>" + myAccount.rentedRefCount + "</td></tr>" + 
              "<tr><td>N&ordm; de referidos diretos: </td><td style='font-weight: bold !important;'>" + myAccount.directRefCount + "</td></tr>" + 
              "<tr><td>N&ordm; total de referidos: </td><td style='font-weight: bold !important;'>" + myAccount.getTotalRefCount + "</td></tr>" + 
              "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
              "<tr><td>Seu limite de AutoPagamento (dias): </td><td style='font-weight: bold !important;'>" + myAccount.autopayLimit + "</td></tr>" + 
              "<tr><td>Seu Custo de AutoPagamento: </td><td style='font-weight: bold !important;'>$" + myAccount.autopayCost.toFixed(5) + "</td></tr>" + 
              "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
              "<tr><td>Valor dos seus cliques: </td><td style='font-weight: bold !important;'>$" + myAccount.ownClickValue + "</td></tr>" + 
              "<tr><td>Valor dos cliques dos seus referidos alugados: </td><td style='font-weight: bold !important;'>$" + myAccount.rentedReferralClickValue + "</td></tr>" + 
              "<tr><td>Valor dos cliques dos seus referidos diretos: </td><td style='font-weight: bold !important;'>$" + myAccount.directReferralClickValue + "</td></tr>" + 
              "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "</table>",
          }
        }
      },
      "Configurações da Conta": {
      /*html:'<p>Estas configura&ccedil;&otilde;es est&atilde;o relacionadas ao per&iacute;odo de renova&ccedil;&atilde;o que voc&ecirc; optou por gerir em sua conta e como o script identificar&aacute; os totais de referidos em sua conta.</p>',*/
      html:'<p>Estas configura&ccedil;&otilde;es est&atilde;o relacionadas ao per&iacute;odo de renova&ccedil;&atilde;o que voc&ecirc; optou por gerir em sua conta.</p>',
        fields: {
          renewalPeriod: {
            type:"select",
            label:"Per&iacute;odo de Renova&ccedil;&atilde;o mais utilizado:",
            options: {
               "AutoPagto": "1",
               "15":"15",
               "30":"30",
               "60":"60",
               "90":"90",
               "150":"150",
               "240":"240",
            },
            text: '<font style="font-size: x-small; font-style: italic;">N&uacute;mero de dias que voc&ecirc; quer renovar. <br/>Recomendado: 240 dias de renova&ccedil;&otilde;es e AutoPagto desligado.<br/>Autopagto, 15 dias, 30 dias, 60 dias (equivalente ao AutoPagto), 90 dias, 150 dias e 240 dias.</font>',
            value:myAccount.preferences.renewalPeriod,
          },
          spacer_1: {
            type:"spacer",
            height:"15px",
          },
          overrideRentedReferralCount: {
            type:"checkbox",
            label:"Substituir Quantidade:",
            text: '<font style="font-size: x-small; font-style: italic;">Voc&ecirc; quer que o script substituia a quantidade de referidos alugados que pensa que voc&ecirc; tem?</font>',
            value: myAccount.preferences.overrideRentedReferralCount,
          },
          manualRentedReferralCount: {
            type:"text",
            label:"Referidos Alugados:",
            text: '<font style="font-size: x-small; font-style: italic;">Quantidade de referidos alugados que voc&ecirc; tem.</font>',
            value: myAccount.preferences.manualRentedReferralCount,
          },
          spacer_2: {
            type:"spacer",
            height:"15px",
          },
          overrideDirectReferralCount: {
            type:"checkbox",
            label:"Substituir Quantidade:",
            text: '<font style="font-size: x-small; font-style: italic;">Voc&ecirc; quer que o script substituia a quantidade de referidos diretos que pensa que voc&ecirc; tem?</font>',
            value: myAccount.preferences.overrideDirectReferralCount,
          },
          manualDirectReferralCount: {
            type:"text",
            label:"Referidos Diretos:",
            text: '<font style="font-size: x-small; font-style: italic;">Quantidade de referidos diretos que voc&ecirc; tem.</font>',
          value: myAccount.preferences.manualDirectReferralCount
        },
        spacer_3: {
          type: "spacer",
          height: "15px"
        },
        decimalPrecision: {
          type: "select",
          label: "Precisão Decimal:",
          options: {
            "0.01": "2",
            "0.001": "3",
            "0.0001": "4"
          },
          text: "<font style='font-size: x-small; font-style: italic;'>Número de dígitos após o ponto<br/>Padrão: 0.0001</font>",
          value: myAccount.preferences.decimalPrecision
        }
      }
    },
      "Lista de Referidos": {
      html:"<p>Essas configura&ccedil;&otilde;es s&atilde;o usadas para controlar o que acontece nas p&aacute;ginas de Listagem de Referidos.</p>",
      fields: {
        header_Spacing: {
          type: "html",
          html: "<p><b>Redução do conteúdo das colunas</b></p>"
        },
        letterSpacing: {
          type: "select",
          label: "Espaçamento entre Letras",
          options: {
            "-1.0px": "-1.0px",
            "-0.9px": "-0.9px",
            "-0.8px": "-0.8px",
            "-0.7px": "-0.7px",
            "-0.6px": "-0.6px",
            "-0.5px": "-0.5px",
            "-0.4px": "-0.4px",
            "-0.3px": "-0.3px",
            "-0.2px": "-0.2px",
            "-0.1px": "-0.1px",
            "0.0px": "0.0px",
            "0.1px": "0.1px",
            "0.2px": "0.2px",
            "0.3px": "0.3px",
            "0.4px": "0.4px",
            "0.5px": "0.5px",
            "0.6px": "0.6px",
            "0.7px": "0.7px",
            "0.8px": "0.8px",
            "0.9px": "0.9px",
            "1.0px": "1.0px"
          },
          text: "<font style='font-size: x-small; font-style: italic;'>O espaço entre caractes<br/>Padrão: 0.0px</font>",
          value: myAccount.preferences.letterSpacing
        },
          wordSpacing: {
            type: "select",
            label: "Espaçamento entre Palavras",
            options: {
              "-1.0px": "-1.0px",
              "-0.9px": "-0.9px",
              "-0.8px": "-0.8px",
              "-0.7px": "-0.7px",
              "-0.6px": "-0.6px",
              "-0.5px": "-0.5px",
              "-0.4px": "-0.4px",
              "-0.3px": "-0.3px",
              "-0.2px": "-0.2px",
              "-0.1px": "-0.1px",
              "0.0px": "0.0px",
              "0.1px": "0.1px",
              "0.2px": "0.2px",
              "0.3px": "0.3px",
              "0.4px": "0.4px",
              "0.5px": "0.5px",
              "0.6px": "0.6px",
              "0.7px": "0.7px",
              "0.8px": "0.8px",
              "0.9px": "0.9px",
              "1.0px": "1.0px"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>O espaço em branco entre as palavras.<br/>Padrão: 0.0px</font>",
            value: myAccount.preferences.wordSpacing
          },
          header_referralNumberColumn: {
            type: "html",
            html: "<br/><p><b>Coluna Nº do Referido:</b></p>"
          },
          referralNumber_shrinkContents: {
            type: "checkbox",
            label: "Retirar Espa&ccedil;os:",
            text: "<font style='font-size: x-small; font-style: italic;'>O conteúda da Coluna Nº do Referido deve ser reduzido?</font>",
            value: myAccount.preferences.referralNumber_shrinkContents
          },
          header_refFlags: {
            type:"html",
            html:"<br/><p><b>Bandeiras dos Referidos:</b></p>",
          },
          textifyFlag: {
            type:"checkbox",
            label:"Exibir Letras das Bandeiras:",
            text: '<font style="font-size: x-small; font-style: italic;">Exibir letras das bandeiras?<br/>Br = Branca, Vm = Vermelha, Lr = Laranja, Am = Amarela, Vd = Verde,  Az = Azul, Rs = Rosa, Pt = Preta</font>',
            value: myAccount.preferences.textifyFlag,
          },
          textifyFlag_prefix: {
            type:"text",
            label:"Separador:",
            text: '<font style="font-size: x-small; font-style: italic;">O que deve separar a bandeira e texto?</font>',
            value: myAccount.preferences.textifyFlag_prefix,
          },
          flag_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Bandeira?</font>',
            value: myAccount.preferences.flag_shrinkContents,
          },
          header_referralNameColumn: {
            type:"html",
            html:"<br/><p><b>Coluna Nome do Referido:</b></p>",
          },
          referralName_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Nome do Referido?</font>',
            value: myAccount.preferences.referralName_shrinkContents
          },
          header_cameFromColumn: {
            type: "html",
            html: "<br/><p><b>Coluna Veio De:</b></p>"
          },
          cameFrom_shrinkContents: {
            type: "checkbox",
            label: "Retirar Espa&ccedil;os:",
            text: "<font style='font-size: x-small; font-style: italic;'>O conteúdo da Coluna Veio De deve ser reduzido?</font>",
            value: myAccount.preferences.cameFrom_shrinkContents
          },
          header_ownedSinceColumn: {
            type:"html",
            html:"<br/><p><b>Coluna Referido Desde:</b></p>",
          },
          /*referralSince_numerise: {
            type:"checkbox",
            label:"Calcular dias cadastrado:",
            text: '<font style="font-size: x-small; font-style: italic;">A data deve ser exibida em dias, horas e minutos? <br/>Se definido para false, as defini&ccedil;&otilde;es abaixo ser&atilde;o ignoradas.</font>',
            value: myAccount.preferences.referralSince_numerise,
          },
          referralSince_fullerTimers: {
            type:"checkbox",
            label:"Exibir horas e minutos em dias cadastrado:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir horas e minutos <br/>no resultado do c&aacute;lculo de dias cadastrado?<br/>true = dias, horas, minutos, <br/>false = somente dias</font>',
            value: myAccount.preferences.referralSince_fullerTimers,
          },
          ownedSinceTimer_shortFormat: {
            type:"checkbox",
            label:"Usar Formato Reduzido:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir horas e minutos em formato reduzido <br/>no resultado do c&aacute;lculo de dias cadastrado?<br/>true = d, h, m, false = dias, horas, minutos</font>',
            value: myAccount.preferences.ownedSinceTimer_shortFormat,
          },
          referralSince_replace: {
            type:"checkbox",
            label:"Ocultar Data e Hor&aacute;rio do Cadastro:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir apenas resultado do c&aacute;lculo de dias cadastrado?<br/>true = 10 dias, 21 horas, 16 minutos, <br/>false = 2009/12/21 17:20 (10 dias, 21 horas, 16 minutos)</font>',
            value: myAccount.preferences.referralSince_replace,
          },*/
          ownedSince_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Referido Desde?</font>',
            value: myAccount.preferences.ownedSince_shrinkContents,
          },
          header_nextPaymentColumn: {
            type:"html",
            html:"<br/><p><b>Coluna Pr&oacute;ximo Pagamento:</b></p>",
          },
          nextPayment_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Pr&oacute;ximo Pagamento?</font>',
            value: myAccount.preferences.nextPayment_shrinkContents,
          },
          header_lastClickColumn: {
            type:"html",
            html:"<br/><p><b>Coluna &Uacute;ltimo Clique:</b></p>",
          },
          /*lastClick_numerise: {
            type:"checkbox",
            label:"Calcular dias sem clicar:",
            text: '<font style="font-size: x-small; font-style: italic;">Exibir data em dias, horas, minutos? <br/>Se definido para false, as defini&ccedil;&otilde;es abaixo ser&atilde;o ignoradas.</font>',
            value: myAccount.preferences.lastClick_numerise,
          },
          lastClick_fullerTimers: {
            type:"checkbox",
            label:"Exibir dias na qtde de dias sem clicar:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja que o resultado do c&aacute;lculo de dias sem clicar <br/>exiba horas e minutos?<br/>true = 2009/12/26 [6 dias], false = 2009/12/26 [6] </font>',
            value: myAccount.preferences.lastClick_fullerTimers,
          },
          lastClickTimer_shortFormat: {
            type:"checkbox",
            label:"Usar Formato Reduzido:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir horas e minutos em formato reduzido <br/>no resultado do c&aacute;lculo de dias sem clicar?<br/>true = d, false = dias</font>',
            value: myAccount.preferences.lastClickTimer_shortFormat,
          },
          lastClick_replace: {
            type:"checkbox",
            label:"Ocultar Data do &Uacute;lt. Clique:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja ocultar data e exibir apenas <br/>o resultado do c&aacute;lculo de dias sem clicar?<br/>true == 6 dias, false == 2009/12/26 [6 dias]</font>',
            value: myAccount.preferences.lastClick_replace,
          },
          lastClick_replaceNilClicks: {
            type:"checkbox",
            label:"Ocultar [Sem Cliques]:",
            text: '<font style="font-size: x-small; font-style: italic;">Caso o referido n&atilde;o tenha clicado ainda, <br/>o texto [Sem Cliques] deve ser removido para estreitar a coluna?</font>',
            value: myAccount.preferences.lastClick_replaceNilClicks,
          },*/
          lastClick_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna &Uacute;ltimo Clique?</font>',
          value: myAccount.preferences.lastClick_shrinkContents
          },
          header_totalClicksColumn: {
            type: "html",
            html: "<br/><p><b>Coluna Total de Cliques</b></p>"
          },
          totalClicks_shrinkContents: {
            type: "checkbox",
            label: "Retirar Espa&ccedil;os:",
            text: "<font style='font-size: x-small; font-style: italic;'>O conteúdo da Coluna Total de Cliques deve ser reduzido?</font>",
            value: myAccount.preferences.totalClicks_shrinkContents
          },
          header_avgColumn: {
            type:"html",
            html:"<br/><p><b>Coluna M&eacute;dia:</b></p>",
          },
          /*exactAverage_show: {
            type:"checkbox",
            label:"Exibir M&eacute;dia Exata:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja exibir M&eacute;dia Exata? A M&eacute;dia Aproximada usa dias.<br/>Esta M&eacute;dia Exata &eacute; calculada usando a idade do referido em minutos.</font>',
            value: myAccount.preferences.exactAverage_show,
          },
          exactAverage_seperator: {
            type:"text",
            label:"Separador:",
            text: '<font style="font-size: x-small; font-style: italic;">O que deve separa M&eacute;dia Aproximada da M&eacute;dia Exata?</font>',
            value: myAccount.preferences.exactAverage_seperator,
          },
          columnPrefix_Average: {
            type:"text",
            label:"Prefixo:",
            text: '<font style="font-size: x-small; font-style: italic;">O que deve ser exibido antes de M&eacute;dia Aproximada?</font>',
            value: myAccount.preferences.columnPrefix_Average,
          },
          exactAverage_replace: {
            type:"checkbox",
            label:"Exibir apenas M&eacute;dia Exata:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja que a M&eacute;dia Exata substitua completamente <br/>a M&eacute;dia Aproximada</font>',
            value: myAccount.preferences.exactAverage_replace,
          },*/
          average_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna M&eacute;dia?</font>',
            value: myAccount.preferences.average_shrinkContents,
          },
          /*header_profitColumn: {
            type:"html",
            html:"<br/><p><b>Coluna Lucro:</b></p>",
          },
          showColumn_Profit: {
            type:"checkbox",
            label:"Exibir Lucro:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna Lucro seja exibida?</font>',
            value: myAccount.preferences.showColumn_Profit,
          },
          includeRecycleCostInProfitColumn: {
            type:"checkbox",
            label:"Incluir Custo de Reciclagem:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja deduzir o Custo de Reciclagem no valor exibido em Lucro?<br/>true = exibo {lucro}, false = exibe {lucro - custo de uma reciclagem}</font>',
            value: myAccount.preferences.includeRecycleCostInProfitColumn,
          },
          columnPrefix_Profit: {
            type:"text",
            label:"Separador:",
            text: '<font style="font-size: x-small; font-style: italic;">O que deve ser exibido antes do valor do Lucro? por exemplo, isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. Padr&atilde;o: $</font>',
            value: myAccount.preferences.columnPrefix_Profit,
          },
          profitColumn_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Lucro?</font>',
            value: myAccount.preferences.profitColumn_shrinkContents,
          }*/
        }
      },
      "Lista de Referidos 2": {
        html:"<p>Essas configura&ccedil;&otilde;es s&atilde;o usadas para controlar o que acontece nas p&aacute;ginas de Listagem de Referidos.</p><p><strong>Estas defini&ccedil;&otilde;es afetam apenas membros Ultimate:</strong></p>",
        fields: {
          columnHeader_clickText: {
            type:"html",
            html:"<p><b>Coluna Cliques do Dia:</b></p>",
          },
          showColumn_clickText: {
            type:"checkbox",
            label:"Exibir Cliques do Dia:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna Cliques do Dia seja exibida?</font>',
            value: myAccount.ultimatePreferences.showColumn_clickText,
          },
          columnPrefix_clickText: {
            type:"text",
            label:"Prefixo",
            text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor de Cliques no Dia? <br/>Padr&atilde;o: vazio</font>',
            value: myAccount.ultimatePreferences.columnPrefix_clickText,
          },
          clickText_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna Cliques do Dia?</font>',
            value: myAccount.ultimatePreferences.clickText_shrinkContents,
          },
          columnHeader_average1: {
            type:"html",
            html:"<br/><p><b>Coluna 1&ordf; M&eacute;dia (A"+myAccount.preferences.timePeriod_average1+"):</b></p>",
          },
          showColumn_Average1: {
            type:"checkbox",
            label:"Exibir A"+myAccount.preferences.timePeriod_average1+":",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna 1&ordf; M&eacute;dia seja exibida?</font>',
            value: myAccount.ultimatePreferences.showColumn_Average1,
          },
          columnPrefix_Average1: {
            type:"text",
            label:"Prefixo:",
            text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor da 1&ordf; M&eacute;dia? por exemplo, isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. <br/>Padr&atilde;o: vazio</font>',
            value: myAccount.ultimatePreferences.columnPrefix_Average1,
          },
          average1_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna 1&ordf; M&eacute;dia?</font>',
            value: myAccount.ultimatePreferences.average1_shrinkContents,
          },
          columnHeader_average2: {
            type:"html",
            html:"<br/><p><b>Coluna 2&ordf; M&eacute;dia (A"+myAccount.preferences.timePeriod_average2+"):</b></p>",
          },
          showColumn_Average2: {
            type:"checkbox",
            label:"Exibir A"+myAccount.preferences.timePeriod_average2+":",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna 2&ordf; M&eacute;dia seja exibida?</font>',
            value: myAccount.ultimatePreferences.showColumn_Average2,
          },
          columnPrefix_Average2: {
            type:"text",
            label:"Prefixo:",
            text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor da 2&ordf; M&eacute;dia? por exemplo, isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. <br/>Padr&atilde;o: vazio</font>',
            value: myAccount.ultimatePreferences.columnPrefix_Average2,
          },
          average2_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna 2&ordf; M&eacute;dia?</font>',
            value: myAccount.ultimatePreferences.average2_shrinkContents,
          },
          header_sdColumn: {
            type:"html",
            html:"<br/><p><b>Coluna Desvio Padr&atilde;o (SD):</b></p>",
          },
          showSDEVColumn: {
            type:"checkbox",
            label:"Exibir SD:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna SD seja exibida?</font>',
            value: myAccount.ultimatePreferences.showSDEVColumn,
          },
          columnPrefix_SD: {
            type:"text",
            label:"Prefixo:",
            text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor SD? por exemplo, <br/>isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. <br/>Padr&atilde;o: vazio</font>',
            value: myAccount.ultimatePreferences.columnPrefix_SD,
          },
          SD_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna SDEV?</font>',
            value: myAccount.ultimatePreferences.SD_shrinkContents,
          },
          header_rsaColumn: {
            type:"html",
            html:"<br/><p><b>Coluna Quociente de Desvio Padr&atilde;o e M&eacute;dia (RSA):</b></p>",
          },
          showColumn_RSA: {
            type:"checkbox",
            label:"Exibir RSA:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja que a coluna RSA seja exibida?<br/>NOTA: RSA = Quociente de Desvio Padr&atilde;o e M&eacute;dia</font>',
            value: myAccount.ultimatePreferences.showColumn_RSA,
          },
          columnPrefix_RSA: {
            type:"text",
            label:"Prefixo:",
            text: '<font style="font-size: x-small; font-style: italic;">O que deve ser mostrado antes do valor RSA? por exemplo, <br/>isso pode ser usado para fazer o script s&oacute; mostrar um n&uacute;mero. <br/>Padr&atilde;o: vazio</font>',
            value: myAccount.ultimatePreferences.columnPrefix_RSA,
          },
          RSA_shrinkContents: {
            type:"checkbox",
            label:"Retirar Espa&ccedil;os:",
            text: '<font style="font-size: x-small; font-style: italic;">Deseja retirar espa&ccedil;os no texto da coluna RSA?</font>',
            value: myAccount.ultimatePreferences.RSA_shrinkContents,
        },
        header_maFooter: {
          type: "html",
          html: "<br/><p><b>Minigraph Average Footer:</b></p>"
        },
        showRecentAverage: {
          type: "checkbox",
          label: "Show:",
          text: "<font style='font-size: x-small; font-style: italic;'>Deseja exibir média de minigráfico no rodapé?</font>",
          value: myAccount.ultimatePreferences.showRecentAverage
        },
        RA_shrinkContents: {
          type: "checkbox",
          label: "Retirar Espa&ccedil;os:",
          text: "<font style='font-size: x-small; font-style: italic;'>O conteúdo da média no rodapé do minigráfico deve ser reduzido?</font>",
          value: myAccount.ultimatePreferences.RA_shrinkContents
        }
      }
    },
      "Periodos de Tempo": {
        html:'<p>Essas configura&ccedil;&otilde;es mudam o n&uacute;mero de dias utilizados para calcular as M&eacute;dias dentro dos gr&aacute;ficos.<br/></p>',
        fields: {
          spacer_1: {
            type:"html",
            html:"<p>Per&iacute;odos de Tempo dos Gr&aacute;ficos Menores:</p>",
          },
          timePeriod_s1: {
            type:"select",
            label:"1&ordm; Per&iacute;odo de Tempo:",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 5</font>',
            value:myAccount.preferences.timePeriod_s1,
          },
          timePeriod_s2: {
            type:"select",
            label:"2&ordm; Per&iacute;odo de Tempo:",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 7<br/>Nota: 2&ordm; Per&iacute;odo de Tempo deve ser superior <br/>ao 1&ordm; Per&iacute;odo de Tempo</font>',
            value:myAccount.preferences.timePeriod_s2,
          },
          timePeriod_s3: {
            type:"select",
            label:"3&ordm; Per&iacute;odo de Tempo:",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 10<br/>Nota: 3&ordm; Per&iacute;odo de Tempo deve ser superior <br/>ao 2&ordm; Per&iacute;odo de Tempo</font>',
            value:myAccount.preferences.timePeriod_s3,
          },
          spacer_2: {
            type:"html",
            html:"<br/><p>Per&iacute;odos de Tempo dos Gr&aacute;ficos Maiores</p>",
          },
          timePeriod_1: {
            type:"select",
            label:"1&ordm; Per&iacute;odo de Tempo:",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
              "11":"11", "12":"12", "13":"13",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 5</font>',
            value:myAccount.preferences.timePeriod_1,
          },
          timePeriod_2: {
            type:"select",
            label:"2&ordm; Per&iacute;odo de Tempo:",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
              "11":"11", "12":"12", "13":"13", "14":"14",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 10<br/>Nota: 2&ordm; Per&iacute;odo de Tempo deve ser superior <br/>ao 1&ordm; Per&iacute;odo de Tempo</font>',
            value:myAccount.preferences.timePeriod_2,
          },
          timePeriod_3: {
            type:"select",
            label:"3&ordm; Per&iacute;odo de Tempo:",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
              "11":"11", "12":"12", "13":"13", "14":"14", "15":"15",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 15<br/>Nota: 3&ordm; Per&iacute;odo de Tempo deve ser superior <br/>ao 2&ordm; Per&iacute;odo de Tempo</font>',
            value:myAccount.preferences.timePeriod_3,
          },
          spacer_3: {
            type:"html",
            html:"<br/><p><i>Per&iacute;odo Recente para Resumo dos &Uacute;ltimos dias <br/>e Minigr&aacute;fico de M&eacute;dias (Somente para Ultimates):</i></p>",
          },
          timePeriod_recent: {
            type:"select",
            label:"Per&iacute;odo Recente para <br/>Resumo dos &Uacute;ltimos dias <br/>e Minigr&aacute;fico de M&eacute;dias:",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Padr&atilde;o: 10<br/>Nota: Aqui voc&ecirc; pode escolher o n&ordm; de dias <br/>usados para calcular o Lucro dos &Uacute;ltimos dias <br/>e serve tamb&eacute;m para definir a quantidade de <br/>dias do c&aacute;lculo do Minigr&aacute;fico de M&eacute;dias <br/>(Somente para Ultimates)(</font>',
            value:myAccount.preferences.timePeriod_recent,
        spacer_4: {
          type: "html",
          html: "<br/><p>Ultimate-members only:</p>"
        },
        timePeriod_average1: {
          type: "select",
          label: "'Average1' column",
          options: {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10"
          },
          text: "<font style='font-size: x-small; font-style: italic;'>Padrão: 10</font>",
          value: myAccount.ultimatePreferences.timePeriod_average1
        },
        timePeriod_average2: {
          type: "select",
          label: "'Average2' column",
          options: {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10"
          },
          text: "<font style='font-size: x-small; font-style: italic;'>Padrão: 7</font>",
          value: myAccount.ultimatePreferences.timePeriod_average2
        },
        minigraphAvgInterval: {
          type: "select",
          label: "Média do Minigráfico",
          options: {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
            "6": "6",
            "7": "7",
            "8": "8",
            "9": "9",
            "10": "10"
          },
          text: "<font style='font-size: x-small; font-style: italic;'>Padrão: 10</font>",
          value: myAccount.ultimatePreferences.minigraphAvgInterval
        }
      }
    },
    },
      "Configurar Atualização": {
        html:'<p>defini&ccedil;&otilde;es do Atualizador:</p>',
        fields: {
          updateFrequency: {
          type: "select",
          label: "Intervalos de Atualização",
          options: {
            "Diária": "86400000",
            "Semanal": "604800000",
            "Mensal": "2592000000",
            "Nunca": "0"
          },
            text: '<font style="font-size: x-small; font-style: italic;">Quantas vezes o script deve buscar por atualiza&ccedil;&otilde;es (em minutos)?<br/>Recomendado: 120 minutos (NOTA: digitar apenas n&uacute;meros)</font>',
            value: myAccount.preferences.updateFrequency,
          }
        }
      },
      "Sobre": {
        html:'<p><strong>Sobre o Script:</strong></p>'+
        '<p>Este script foi concebido para tornar o gerenciamento de sua conta do Neobux o mais f&aacute;cil poss&iacute;vel e colocar o m&aacute;ximo de informa&ccedil;&otilde;es possiveis sob seu alcance.</p>'+
        '<p><strong>Quer dizer obrigado?</strong></p>'+
        '<p>&Eacute; sempre bom ouvir de pessoas que gostam do trabalho que eu fa&ccedil;o - apenas um t&oacute;pico sobre <a href="http://www.neobux.com/forum/?frmid=7&tpcid=78359">o f&oacute;rum Neobux</a> e um simples "Eu quero ter seus beb&ecirc;s!" ou "voc&ecirc; &eacute; minha maior estrela!" deveria ser suficiente, mas em um post generoso simplesmente dizer "obrigado" sempre ser&aacute; muito bem-vindo =]<br/><br/>'+
        'Ali&aacute;s, se voc&ecirc; tem certeza de que algo n&atilde;o est&aacute; certo e voc&ecirc; j&aacute; verificou que n&atilde;o &eacute; o Flying Spaghetti Monster brincando com voc&ecirc;? o <a href="http://www.neobux.com/forum/?frmid=7&tpcid=78359">f&oacute;rum Neobux</a> deve ser o seu primeiro porto de chamada para os pedidos de recursos e reclama&ccedil;&otilde;es. </p><br/>'+
        '<p><strong>Outros scripts do Dobrin Dobrev</strong></p>'+
        '<p>Se voc&ecirc; gostou deste script, d&ecirc; uma olhada em meus outros scripts <a href="http://userscripts.org/users/129562/scripts">userscripts.org</a><br/>Nem todos eles s&atilde;o t&atilde;o &uacute;teis quanto o script e, geralmente, a descri&ccedil;&atilde;o &eacute; boa o suficiente para descobrir o que faz, mas todas as perguntas podem ser enviadas para o mesmo lugar como acima.</p>'+
        // '<p><strong>Hist&oacute;ria do script:</strong></p>'+
        // '<p>O Neobux 2 + script teve bem poucos participantes durante sua vida. Que eu saiba, ele foi originalmente criado por uriburi206 e mais tarde foi mantido e actualizado por oselamet (JM2T traduziu o script em algum ponto tamb&eacute;m =] ).<br/><br/>Mais tarde Kwah assumiu e reescreveu o c&oacute;digo, liberando a vers&atilde;o 3 (v3).</p>'+
        '',
        fields: {
        }
      }
    };
  } 
  else {
    Config.scriptName = "Neobux BR";
    Config.tabs = {
      "Detalles Cuenta": {
        html:'<p>Esta página es puramente con objeto informativo, sólo para mostrar lo que el script cree sobre su cuenta. Éstos ajustes no pueden ser cambiados.</p>',
        fields: {
          html: {
            type:"html",
            html:"<table style='border-collapse: collapse;'>"+
              "<tr><td>Su Nombre de usuario: </td><td style='font-weight: bold !important;'>" + myAccount.name + "</td></tr>" + 
              "<tr><td>Su tipo de Cuenta: </td><td style='font-weight: bold !important;'>" + getAccountType(true) + "</td></tr>" + 
              "<tr><td>Lenguaje de lo NeoBux: </td><td style='font-weight: bold !important;'>" + {
                "US": "Inglés",
                "PT": "Portugués",
                "ES": "Español",
                "GR": "Griego",
                                                                "ID": "Indonesio",
                "FI": "Finlandés",
                "SE": "Sueco",
                "DE": "Alemán",
                "FR": "Francés"
              }[currentPage.language] + "</td></tr>" +
              "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
              "<tr><td>Nº de referidos rentados: </td><td style='font-weight: bold !important;'>" + myAccount.rentedRefCount + "</td></tr>" + 
              "<tr><td>Nº de referidos directos: </td><td style='font-weight: bold !important;'>" + myAccount.directRefCount + "</td></tr>" + 
              "<tr><td>Nº Total de referidos: </td><td style='font-weight: bold !important;'>" + myAccount.getTotalRefCount + "</td></tr>" + 
              "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
              "<tr><td>Su límite de Autopay (días): </td><td style='font-weight: bold !important;'>" + myAccount.autopayLimit + "</td></tr>" + 
              "<tr><td>Su coste de Autopay: </td><td style='font-weight: bold !important;'>$" + myAccount.autopayCost + "</td></tr>" + 
              "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
              "<tr><td>Valor de sus clicks: </td><td style='font-weight: bold !important;'>$" + myAccount.ownClickValue + "</td></tr>" + 
              "<tr><td>Valor de  clicks de sus referidos rentados: </td><td style='font-weight: bold !important;'>$" + myAccount.rentedReferralClickValue + "</td></tr>" + 
              "<tr><td>Valor de  clicks de sus referidos directos: </td><td style='font-weight: bold !important;'>$" + myAccount.directReferralClickValue + "</td></tr>" + 
              "<tr><td colspan='2' style='border: 0px none; height: 15px;'></td></tr>" + 
            "</table>",
          }
        }
      },
      "Config. Cuenta": {
        html:'<p>Estos ajustes se refieren a cómo usted elige administrar su cuenta y lo que el script ha almacenado sobre su cuenta.</p>',
        fields: {
          renewalPeriod: {
            type:"select",
            label:"Periodo Renovación",
            options: {
               "AutoPago": "1",
               "15":"15",
               "30":"30",
               "60":"60",
               "90":"90",
               "150":"150",
               "240":"240",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Nº de días que ud. renueva.<br/>Recomendado: renovar a 240 días, autopay off.<br/>15 dias, 30 días, 60 días [igual que autopay], 90 días, 150 dias i 240 dias</font>',
            value:myAccount.preferences.renewalPeriod,
          },
          spacer_1: {
            type:"spacer",
            height:"15px",
          },
          overrideRentedReferralCount: {
            type:"checkbox",
            label:"Corregir",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere corregir el nº de referidos rentados que el script cree que tiene?</font>',
            value: myAccount.preferences.overrideRentedReferralCount,
          },
          manualRentedReferralCount: {
            type:"text",
            label:"Referidos Rentados",
            text: '<font style="font-size: x-small; font-style: italic;">¿Cuántos referidos rentados tiene?</font>',
            value: myAccount.preferences.manualRentedReferralCount,
          },
          spacer_2: {
            type:"spacer",
            height:"15px",
          },
          overrideDirectReferralCount: {
            type:"checkbox",
            label:"Corregir",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere corregir el nº de referidos directos que el script cree que tiene?</font>',
            value: myAccount.preferences.overrideDirectReferralCount,
          },
          manualDirectReferralCount: {
            type:"text",
            label:"Referidos Directos",
            text: '<font style="font-size: x-small; font-style: italic;">¿Cuántos referidos directos tiene?</font>',
          value: myAccount.preferences.manualDirectReferralCount
          },
          spacer_3: {
            type: "spacer",
            height: "15px"
          },
          decimalPrecision: {
            type: "select",
            label: "Decimales de precisión",
            options: {
              "0.01": "2",
              "0.001": "3",
              "0.0001": "4"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>El número de dígitos después del punto.<br/>Por defecto: 0.0001</font>",
            value: myAccount.preferences.decimalPrecision
          }
        }
      },
      "Lista Referidos": {
        html:"<p>Estos parámetros se usan para configurar cómo se muestran las páginas de referidos.</p>",
        fields: {
          header_Spacing: {
            type: "html",
            html: "<p><b>Reducir el contenido de las columnas:</b></p>"
          },
          letterSpacing: {
            type: "select",
            label: "Espaciado entre letras",
            options: {
              "-1.0px": "-1.0px",
              "-0.9px": "-0.9px",
              "-0.8px": "-0.8px",
              "-0.7px": "-0.7px",
              "-0.6px": "-0.6px",
              "-0.5px": "-0.5px",
              "-0.4px": "-0.4px",
              "-0.3px": "-0.3px",
              "-0.2px": "-0.2px",
              "-0.1px": "-0.1px",
              "0.0px": "0.0px",
              "0.1px": "0.1px",
              "0.2px": "0.2px",
              "0.3px": "0.3px",
              "0.4px": "0.4px",
              "0.5px": "0.5px",
              "0.6px": "0.6px",
              "0.7px": "0.7px",
              "0.8px": "0.8px",
              "0.9px": "0.9px",
              "1.0px": "1.0px"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>El espacio entre caracteres.<br/>Por defecto: 0.0px</font>",
            value: myAccount.preferences.letterSpacing
          },
          wordSpacing: {
            type: "select",
            label: "Espacio entre palabras",
            options: {
              "-1.0px": "-1.0px",
              "-0.9px": "-0.9px",
              "-0.8px": "-0.8px",
              "-0.7px": "-0.7px",
              "-0.6px": "-0.6px",
              "-0.5px": "-0.5px",
              "-0.4px": "-0.4px",
              "-0.3px": "-0.3px",
              "-0.2px": "-0.2px",
              "-0.1px": "-0.1px",
              "0.0px": "0.0px",
              "0.1px": "0.1px",
              "0.2px": "0.2px",
              "0.3px": "0.3px",
              "0.4px": "0.4px",
              "0.5px": "0.5px",
              "0.6px": "0.6px",
              "0.7px": "0.7px",
              "0.8px": "0.8px",
              "0.9px": "0.9px",
              "1.0px": "1.0px"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>El espacio en blanco entre las palabras.<br/>Por defecto: 0.0px</font>",
            value: myAccount.preferences.wordSpacing
          },
          header_referralNumberColumn: {
            type: "html",
            html: "<br/><p><b>Columna Número lo Referido:</b></p>"
          },
          referralNumber_shrinkContents: {
            type: "checkbox",
            label: "Acortar:",
            text: "<font style='font-size: x-small; font-style: italic;'>Si el contenido de la columna Número de Referido se va a reducir?</font>",
            value: myAccount.preferences.referralNumber_shrinkContents
          },
          header_refFlags: {
            type:"html",
            html:"<br/><p><b> Banderas Referidos:</b></p>",
          },
          textifyFlag: {
            type:"checkbox",
            label:"Texto Bandera",
            text: '<font style="font-size: x-small; font-style: italic;">¿Deben las banderas tener texto?<br/>B = Blanca, Rj = Roja, Nj = Naranja, Am = Amarilla, V = Verde,  Az = Cian, Rs = Rosa, Ng = Negro</font>',
            value: myAccount.preferences.textifyFlag,
          },
          textifyFlag_prefix: {
            type:"text",
            label:"Separador",
            text: '<font style="font-size: x-small; font-style: italic;">¿Como quiere separar la bandera & texto?</font>',
            value: myAccount.preferences.textifyFlag_prefix,
          },
          flag_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Banderas?</font>',
            value: myAccount.preferences.flag_shrinkContents,
          },
          header_referralNameColumn: {
            type:"html",
            html:"<br/><p><b>Columna Nombre Referido:</b></p>",
          },
          referralName_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Nombre de Referido?</font>',
          value: myAccount.preferences.referralName_shrinkContents
          },
          header_cameFromColumn: {
            type: "html",
            html: "<br/><p><b>Columna Vino De:</b></p>"
          },
          cameFrom_shrinkContents: {
            type: "checkbox",
            label: "Acortar:",
            text: "<font style='font-size: x-small; font-style: italic;'>Si el contenido del Vino de la columna se va a reducir?</font>",
            value: myAccount.preferences.cameFrom_shrinkContents
          },
          header_ownedSinceColumn: {
            type:"html",
            html:"<br/><p><b>Columna Referido desde:</b></p>",
          },
          /*referralSince_numerise: {
            type:"checkbox",
            label:"Numerar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere poner la fecha en días/hrs/mins? Si selecciona no, el ajuste será ignorado.</font>',
            value: myAccount.preferences.referralSince_numerise,
          },
          referralSince_fullerTimers: {
            type:"checkbox",
            label:"Completo:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha completa?<br/>TRUE == días/horas/mins, FALSE == sólo días</font>',
            value: myAccount.preferences.referralSince_fullerTimers,
          },
          ownedSinceTimer_shortFormat: {
            type:"checkbox",
            label:"Formato corto:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha en formato corto?<br/>TRUE == d/h/m, FALSE == días/horas/mins</font>',
            value: myAccount.preferences.ownedSinceTimer_shortFormat,
          },
          referralSince_replace: {
            type:"checkbox",
            label:"Reemplazar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere reemplazar la fecha numérica por texto?<br/>TRUE == 10 días, 21 hrs, 16 mins, FALSE == 2009/12/21 17:20 (10 días, 21 hrs, 16 mins)</font>',
            value: myAccount.preferences.referralSince_replace,
          },*/
          ownedSince_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar la columna Poseído desde?</font>',
            value: myAccount.preferences.ownedSince_shrinkContents,
          },
          header_nextPaymentColumn: {
            type:"html",
            html:"<br/><p><b>Columna Próximo Pago:</b></p>",
          },
          nextPayment_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Next Payment?</font>',
            value: myAccount.preferences.nextPayment_shrinkContents,
          },
          header_lastClickColumn: {
            type:"html",
            html:"<br/><p><b>Columna Último clic:</b></p>",
          },
          /*lastClick_numerise: {
            type:"checkbox",
            label:"Numerica:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha en días/hrs/mins? Si no selecciona, Los ajustes siguientes serán ignorados.</font>',
            value: myAccount.preferences.lastClick_numerise,
          },
          lastClick_fullerTimers: {
            type:"checkbox",
            label:"Completo:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha numérica completa?<br/>TRUE == días/horas/mins, FALSE == sólo días</font>',
            value: myAccount.preferences.lastClick_fullerTimers,
          },
          lastClickTimer_shortFormat: {
            type:"checkbox",
            label:"Formato corto:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la fecha numérica en formaqto corto?<br/>TRUE == d/h/m, FALSE == días/horas/mins</font>',
            value: myAccount.preferences.lastClickTimer_shortFormat,
          },
          lastClick_replace: {
            type:"checkbox",
            label:"Reemplazar",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere cambiar la fecha numérica a texto?<br/>true == 6 dias y hh:ss </font>',
            value: myAccount.preferences.lastClick_replace,
          },
          lastClick_replaceNilClicks: {
            type:"checkbox",
            label:"Reemplazar No clicks:",
            text: '<font style="font-size: x-small; font-style: italic;">Si el usuario no ha hecho clicks, quiere eliminar el texto "No Clicks Yet" para  acortar la columna?</font>',
            value: myAccount.preferences.lastClick_replaceNilClicks,
          },*/
          lastClick_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Last Click?</font>',
            value: myAccount.preferences.lastClick_shrinkContents
          },
          header_totalClicksColumn: {
            type: "html",
            html: "<br/><p><b>Columna Total Clicks:</b></p>"
          },
          totalClicks_shrinkContents: {
            type: "checkbox",
            label: "Acortar:",
            text: "<font style='font-size: x-small; font-style: italic;'>Si el contenido de la columna total de Clicks se va a reducir?</font>",
            value: myAccount.preferences.totalClicks_shrinkContents
          },
          header_avgColumn: {
            type:"html",
            html:"<br/><p><b>Columna AVG:</b></p>",
          },
          /*exactAverage_show: {
            type:"checkbox",
            label:"AVG Exacto",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar el AVG exacto? El AVG normal usa días.<br/>Este AVG \'exacto\' es calculado usando la antigüedad del referido en minutos.</font>',
            value: myAccount.preferences.exactAverage_show,
          },
          exactAverage_seperator: {
            type:"text",
            label:"Separador",
            text: '<font style="font-size: x-small; font-style: italic;">¿Qué separador quiere usar entre AVG normal & exacto?</font>',
            value: myAccount.preferences.exactAverage_seperator,
          },
          columnPrefix_Average: {
            type:"text",
            label:"Prefijo",
            text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delante del AVG normal?</font>',
            value: myAccount.preferences.columnPrefix_Average,
          },
          exactAverage_replace: {
            type:"checkbox",
            label:"Reemplazar AVG",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere que el AVG exacto reemplace completamente al AVG normal?</font>',
            value: myAccount.preferences.exactAverage_replace,
          },*/
          average_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna AVG?</font>',
            value: myAccount.preferences.average_shrinkContents,
          },
          /*header_profitColumn: {
            type:"html",
            html:"<br/><p><b>Columna Ganancia:</b></p>",
          },
          showColumn_Profit: {
            type:"checkbox",
            label:"Mostrar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna Ganancia?</font>',
            value: myAccount.preferences.showColumn_Profit,
          },
          includeRecycleCostInProfitColumn: {
            type:"checkbox",
            label:"Coste Reciclaje:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere que la columna Ganancia deduzca el coste de reciclaje del valor mostrado?<br/>TRUE == display {profit}, FALSE == display {profit - cost of one recycle}</font>',
            value: myAccount.preferences.includeRecycleCostInProfitColumn,
          },
          columnPrefix_Profit: {
            type:"text",
            label:"Separador:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Qué quieremostrar antes del valor Ganancia? ej. puede usarse para hacer que el script muestre sólo el numero. Defecto: $</font>',
            value: myAccount.preferences.columnPrefix_Profit,
          },
          profitColumn_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna Ganancia?</font>',
            value: myAccount.preferences.profitColumn_shrinkContents,
          }*/
        }
      },
      "Lista Referidos 2": {
        html:"<p>Estos parámetros se usan para controlar lo que ocurre en las paginas de listas de referidos.</p><p><strong>Estos ajustes afectan sólo a miembros Ultimate:</strong></p>",
        fields: {
          columnHeader_clickText: {
            type:"html",
            html:"<br/><p><b>Columna Click Text ('Clicks/day'):</b></p>",
          },
          showColumn_clickText: {
            type:"checkbox",
            label:"Mostrar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna "Click-Text"?</font>',
            value: myAccount.ultimatePreferences.showColumn_clickText,
          },
          columnPrefix_clickText: {
            type:"text",
            label:"Prefijo",
            text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delaante del valor "Click-Text"? Defecto: nulo</font>',
            value: myAccount.ultimatePreferences.columnPrefix_clickText,
          },
          clickText_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columnae Click Text ("Clicks/day")?</font>',
            value: myAccount.ultimatePreferences.clickText_shrinkContents,
          },
          columnHeader_average1: {
            type:"html",
            html:"<br/><p><b>Columna 'Promedio 1' (A"+myAccount.preferences.timePeriod_average1+"):</b></p>",
          },
          showColumn_Average1: {
            type:"checkbox",
            label:"Mostrar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿quiere mostrar la columna promedio 1?</font>',
            value: myAccount.ultimatePreferences.showColumn_Average1,
          },
          columnPrefix_Average1: {
            type:"text",
            label:"Prefijo",
            text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar antes del valor promedio 1? ej. se puede usar parahacer que el script muestre sólo el número. Defecto: nulo</font>',
            value: myAccount.ultimatePreferences.columnPrefix_Average1,
          },
          average1_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de lacolumna promedio 1?</font>',
            value: myAccount.ultimatePreferences.average1_shrinkContents,
          },
          columnHeader_average2: {
            type:"html",
            html:"<br/><p><b>Columna 'Promedio 2' (A"+myAccount.preferences.timePeriod_average2+"):</b></p>",
          },
          showColumn_Average2: {
            type:"checkbox",
            label:"Mostrar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna promedio 2?</font>',
            value: myAccount.ultimatePreferences.showColumn_Average2,
          },
          columnPrefix_Average2: {
            type:"text",
            label:"Prefijo",
            text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delante del valor promedio 2? ej. se puede usar para hacer que el script muestre sólo el número. Defecto: nulo</font>',
            value: myAccount.ultimatePreferences.columnPrefix_Average2,
          },
          average2_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna promedio 2?</font>',
            value: myAccount.ultimatePreferences.average2_shrinkContents,
          },
          header_sdColumn: {
            type:"html",
            html:"<br/><p><b>Columna 'Desviación Standard' (SD):</b></p>",
          },
          showSDEVColumn: {
            type:"checkbox",
            label:"Mostrar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna SD?</font>',
            value: myAccount.ultimatePreferences.showSDEVColumn,
          },
          columnPrefix_SD: {
            type:"text",
            label:"Prefijo",
            text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delante del valor SD? ej. puede usarse para que el script muestre sólo el número. Defecto: nulo</font>',
            value: myAccount.ultimatePreferences.columnPrefix_SD,
          },
          SD_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna SDEV?</font>',
            value: myAccount.ultimatePreferences.SD_shrinkContents,
          },
          header_rsaColumn: {
            type:"html",
            html:"<br/><p><b>Columna 'Relación entre Desviación Standard y Promedio' (RSA):</b></p>",
          },
          showColumn_RSA: {
            type:"checkbox",
            label:"Mostrar RSA:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere mostrar la columna RSA?<br/>NOTA: RSA == Relación entre desviación Standard y AVG</font>',
            value: myAccount.ultimatePreferences.showColumn_RSA,
          },
          columnPrefix_RSA: {
            type:"text",
            label:"Prefijo",
            text: '<font style="font-size: x-small; font-style: italic;">¿Qué quiere mostrar delante del valor RSA? ej. puede usarse para hacer que el script sólo muestre el número. Defecto: nulo</font>',
            value: myAccount.ultimatePreferences.columnPrefix_RSA,
          },
          RSA_shrinkContents: {
            type:"checkbox",
            label:"Acortar:",
            text: '<font style="font-size: x-small; font-style: italic;">¿Quiere acortar el contenido de la columna RSA?</font>',
            value: myAccount.ultimatePreferences.RSA_shrinkContents,
          },
          header_maFooter: {
            type: "html",
            html: "<br/><p><b>Minigraph Average pie de la página:</b></p>"
          },
          showRecentAverage: {
            type: "checkbox",
            label: "Mostrar :",
            text: "<font style='font-size: x-small; font-style: italic;'>Desea que se muestre el Minigraph avg al pie de la página?</font>",
            value: myAccount.ultimatePreferences.showRecentAverage
          },
          RA_shrinkContents: {
            type: "checkbox",
            label: "Acortar:",
            text: "<font style='font-size: x-small; font-style: italic;'>Desea Acortar el contenido del pie de la página del Minigraph avg?</font>",
            value: myAccount.ultimatePreferences.RA_shrinkContents
          }
        }
      },
      "Periodo Tiempo": {
        html:'<p>Estos ajustes cambian el número de días para calcular los promedios bajo los gráficos.<br/></p>',
        fields: {
          spacer_1: {
            type:"html",
            html:"<br/><p>Periodos de tiempo para gráficos cortos:</p>",
          },
          timePeriod_s1: {
            type:"select",
            label:"Días Periodo 1",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Defecto: 4</font>',
            value:myAccount.preferences.timePeriod_s1,
          },
          timePeriod_s2: {
            type:"select",
            label:"Días Periodo 2",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Defecto: 7<br/>NOTA: El tiempo del Periodo 2 debe ser mayor que el tiempo del Periodo 1</font>',
            value:myAccount.preferences.timePeriod_s2,
          },
          timePeriod_s3: {
            type:"select",
            label:"Días Periodo 3",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Defecto: 10<br/>NOTA: El tiempo del Periodo 3 debe ser mayor que el tiempo del Periodo 2</font>',
            value:myAccount.preferences.timePeriod_s3,
          },
          spacer_2: {
            type:"html",
            html:"<br/><p>Periodos de tiempo para gráficos grandes:</p>",
          },
          timePeriod_1: {
            type:"select",
            label:"Días Periodo 1",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
              "11":"11", "12":"12", "13":"13",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Defecto: 5</font>',
            value:myAccount.preferences.timePeriod_1,
          },
          timePeriod_2: {
            type:"select",
            label:"Días Periodo 2",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
              "11":"11", "12":"12", "13":"13", "14":"14",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Defecto: 10<br/>NOTA: El tiempo del Periodo 2 debe ser mayor que el tiempo del Periodo 1</font>',
            value:myAccount.preferences.timePeriod_2,
          },
          timePeriod_3: {
            type:"select",
            label:"Días Periodo 3",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
              "11":"11", "12":"12", "13":"13", "14":"14", "15":"15",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Defecto: 15<br/>NOTA: El tiempo del Periodo 3 debe ser mayor que el tiempo del Periodo 2</font>',
            value:myAccount.preferences.timePeriod_3,
          },
          spacer_3: {
            type:"html",
            html:"<br/><p>(Sólo Ultimates):</p>",
          },
          timePeriod_recent: {
            type:"select",
            label:"Minigráfica AVG",
            options: {
              "1":"1", "2":"2", "3":"3", "4":"4", "5":"5", 
              "6":"6", "7":"7", "8":"8", "9":"9", "10":"10",
            },
            text: '<font style="font-size: x-small; font-style: italic;">Defecto: 7; sólo Ultimates;</font>',
            value:myAccount.preferences.timePeriod_recent,
          },
          spacer_4: {
            type: "html",
            html: "<br/><p>Ultimate-members only:</p>"
          },
          timePeriod_average1: {
            type: "select",
            label: "'Average1' column",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 10</font>",
            value: myAccount.ultimatePreferences.timePeriod_average1
          },
          timePeriod_average2: {
            type: "select",
            label: "'Average2' column",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 7</font>",
            value: myAccount.ultimatePreferences.timePeriod_average2
          },
          minigraphAvgInterval: {
            type: "select",
            label: "Minigraph Average",
            options: {
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              "9": "9",
              "10": "10"
            },
            text: "<font style='font-size: x-small; font-style: italic;'>Default: 10</font>",
            value: myAccount.ultimatePreferences.minigraphAvgInterval
          }
        }
      },
      "Conf. Actualización": {
        html:'<p>Parámetros de Actualización:</p>',
        fields: {
          updateFrequency: {
          type: "select",
          label: "Update Frequency",
          options: {
            "Todos los dias": "86400000",
            "Semanalmente": "604800000",
            "Mensualmente": "2592000000",
            "Nunca": "0"
          },
            text: '<font style="font-size: x-small; font-style: italic;">¿Con quéfrecuencia quiere que el script busque actualizaciones [minutos]?<br/>Recomendado: 120 [minutos] (NOTA: Entre sólo el número)</font>',
            value: myAccount.preferences.updateFrequency,
          }
        }
      },
      "Acerca de": {
        html:'<p><strong>Acerca del script:</strong></p>'+
        '<p>Este script se ha diseñado para hacer la gestión de su cuenta Neobux tan fácil como sea posible y poner la mayor cantidad de información posible a su alcance.</p>'+
        '<p><strong>¿Quiere agradecer?</strong></p>'+
        '<p>Siempre es agradable escuchar a las personas a quienes les gusta el trabajo que hago - basta con dirigirse a los <a href="http://www.neobux.com/forum/?frmid=7&tpcid=78359">forosNeobux</a> y un simple "Quiero un bebé tuyo!" o "tú eres mi super-estrella!" sería suficiente, pero un post generoso simplemente diciendo "gracias" también será bienvenido siempre =]<br/><br/>'+
        'Por cierto, si encuentra que algo no funciona bien y ya ha comprobado que los duendes no le hicieron una jugarreta, los <a href="http://www.neobux.com/forum/?frmid=7&tpcid=78359">foros Neobux</a> deben ser su primera escala para sus preguntas y quejas. </p><br/>'+
        '<p><strong>Otros Scripts de Dobrin Dobrev</strong></p>'+
        '<p>Si le gusta este script, eche un vistazo a mis otros scripts en <a href="http://userscripts.org/users/129562/scripts">userscripts.org</a><br/>No todos ellos son tan útiles como éste y normalmente la descripción es lo suficientemente buena como para averiguar lo que hace, pero pueden enviar las preguntas mismo lugar que el anterior.</p>'+
        // '<p><strong>Historia del script:</strong></p>'+
        // '<p>El script Neobux 2+ ha tenido bastantes contribuyentes durante su existencia. Que yo sepa, fue creado originalmente por uriburi206 y mantenido y actualizado después por oselamet (JM2T también tradujo el script en alguna ocasión =]).<br/><br/>Más tarde kwah se hizo cargo y reescribió el código, lanzándolo como la versión 3 (v3).</p>'+
        '',
        fields: {
        }
      }
    };
  }

    function refStatsPage() {
        var 
            chartData,
            i,
            net,
            newCol,
            newRow,
            row,
            spacer,
            table;
        chartData = selectNode("//script[contains(.,'eval(w(')]").textContent.split(" ");
        for (i = 0; i < chartData.length - 1; i += 1) {
            processChartData(chartData[i].split("'")[1]);
        }
// Insert the sidebar statistics area
        insertSidebar();
// Insert summary data at the very bottom of the page
        net = [];
        for (i = 1; i < rentedClicks.totals.length; i += 1) {
            net[i] = (myAccount.rentedReferralClickValue * rentedClicks.totals[i] +
                      myAccount.directReferralClickValue * directClicks.totals[i]) -
                    (recycleCost.totals[i] + autopayCost.totals[i] +
                    renewalCost.totals[i]);
        }
        newRow = document.createElement("tr");
        newCol = document.createElement("td");
        newCol.colSpan = 3;
        newCol.setAttribute("class", "f_r");
        newCol.style.backgroundColor = "#FFFFFF";
        newCol.style.border = "1px solid #888888";
        newCol.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
        newCol.style.borderRadius = "5px 5px 5px 5px";
        newCol.style.textAlign = "center";
        newCol.style.verticalAlign = "middle";
        newCol.style.whiteSpace = "nowrap";
        newRow.appendChild(newCol);
        spacer = "&nbsp;&nbsp;&nbsp;&nbsp;";
        newCol.innerHTML =
                localString("dailyNetIncome") + ": " +
                "(" + myAccount.preferences.timePeriod_s3 + ") <span class='f_b'>$" +
                fix(parseFloat(net[myAccount.preferences.timePeriod_s3])) + "</span>" +
                spacer +
                "(" + myAccount.preferences.timePeriod_s2 + ") <span class='f_b'>$" +
                fix(parseFloat(net[myAccount.preferences.timePeriod_s2])) + "</span>" +
                spacer +
                "(" + myAccount.preferences.timePeriod_s1 + ") <span class='f_b'>$" +
                fix(parseFloat(net[myAccount.preferences.timePeriod_s1])) + "</span>" +
                spacer +
                "(3) <span class='f_b'>$" + fix(parseFloat(net[3])) + "</span>" + spacer +
                "(2) <span class='f_b'>$" + fix(parseFloat(net[2])) + "</span>" + spacer +
                "(1) <span class='f_b'>$" + fix(parseFloat(net[1])) + "</span>";
        table = selectNode("//body/div[2]/div/table/tbody/tr/td[last()]/table/tbody/tr[last()]/td/table/tbody");
        row = selectNode("//body/div[2]/div/table/tbody/tr/td[last()]/table/tbody/tr[last()]/td/table/tbody/tr[last()]");
        table.insertBefore(newRow, row);
        newRow = document.createElement("tr");
        newCol = document.createElement("td");
        newCol.colSpan = 3;
        newCol.setAttribute("style", "height:6px;font-size:6px;padding:0px;");
        newCol.innerHTML = "&nbsp;";
        newRow.appendChild(newCol);
        table.insertBefore(newRow, row);
    }

// Function that extracts the data from each chart
    function processChartData(data) {
        var
            chartID,
            dates,
            i,
            projectedDirect,
            projectedRented,
            script,
            totals,
            values;
        script = atob(data);
        chartID = script.split("'")[1];
        customLogger("chartID = " + chartID, 6);
// Extract the dates and values from the chart data
        dates = script.split("[")[1].split("]", 1)[0].replace(/["']{1}/gi, "").split(",");
        values = script.split("[")[3].split("]", 1)[0].split(",");
        for (i = 0; i < values.length; i += 1) {
            values[i] = parseFloat(values[i]);
        }
// Reverse the order of the data so that the most recent data is first
// (unless the chart being processed is the scheduled rental payments chart)
        if (chartID.indexOf("ch_ext_schedule") === -1) {
            dates.reverse();
            values.reverse();
        }
// Calculate running totals for the data in the chart
        totals = [];
        for (i = 0; i < values.length; i += 1) {
            if (i === 0) {
                totals[i] = values[i];
            } else {
                totals[i] = totals[i - 1] + values[i];
            }
        }
// Attach the graphProperties to the relevant variable name
// Variable names for the Referral Statistics page
        if (chartID === "ch_cdd") { // Direct referrals clicks credited
            directClicks = new graphProperties(values, totals);
            projectedDirect = selectNodes("//span[@class='f_b']")[2].textContent;
            directClicks.today_projected = parseFloat(projectedDirect);
            customLogger("directClicks.today_projected = " + directClicks.today_projected, 5);
        } else if (chartID === "ch_cr") { // Rented referrals clicks credited
            rentedClicks = new graphProperties(values, totals);
            projectedRented = selectNodes("//span[@class='f_b']")[4].textContent;
            rentedClicks.today_projected = parseFloat(projectedRented);
            customLogger("rentedClicks.today_projected = " + rentedClicks.today_projected, 5);
        } else if (chartID === "ch_recycle") { // Recycle value
            recycleCost = new graphProperties(values, totals);
        } else if (chartID === "ch_trar") { // Automatic Recycling
            automaticRecycling = new graphProperties(values, totals);
        } else if (chartID === "ch_extensions") { // Extension value
            renewalCost = new graphProperties(values, totals);
        } else if (chartID === "ch_autopay") { // AutoPay value
            autopayCost = new graphProperties(values, totals);
        } else if (chartID === "ch_trpb") { // Transfers to Golden Pack Balance
            transfersToGoldenPackBalance = new graphProperties(values, totals);
        } else if (chartID === "ch_trrb") { // Transfers to Rental Balance
            transfersToRentalBalance = new graphProperties(values, totals);
        } else if (chartID.indexOf("ch_ext_schedule") > -1) { // Total number of referrals with scheduled rental payments
            rentalsDue = new graphProperties(values, totals);
        }
    }

// Function which inserts the 'Statistics Sidebar' to the side of the page
    function insertSidebar() {
// Location to insert the sidebar
        var locationToInsert = selectNode(
                "//td[@width='729']/table/tbody/tr[2]"); // right hand side
        today.projectedRentedClicks = rentedClicks.today_projected * numberOfRentedReferrals;
        today.projectedDirectClicks = directClicks.today_projected * numberOfDirectReferrals;
        today.projectedIncome = (myAccount.rentedReferralClickValue * today.projectedRentedClicks) + (myAccount.directReferralClickValue * today.projectedDirectClicks);
        today.income = (myAccount.rentedReferralClickValue * rentedClicks.today) + (myAccount.directReferralClickValue * directClicks.today);
        today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;
        today.netIncome = (today.income - today.expenses);
        yesterday.income = (myAccount.rentedReferralClickValue * rentedClicks.yesterday) + (myAccount.directReferralClickValue * directClicks.yesterday);
        yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;
        yesterday.netIncome = (yesterday.income - yesterday.expenses);
        recent.income = [];
        recent.expenses = [];
        recent.netIncome = [];
        customLogger("rentedClicks.totals.length = " + rentedClicks.totals.length, 5);
        for (var i = 0; i < rentedClicks.totals.length; i += 1) {
            recent.income[i] = (myAccount.rentedReferralClickValue * rentedClicks.totals[i]) + (myAccount.directReferralClickValue * directClicks.totals[i]);
            recent.expenses[i] = recycleCost.totals[i] + autopayCost.totals[i] + renewalCost.totals[i];
            recent.netIncome[i] = (recent.income[i] - recent.expenses[i]);
        }
        today.directAverage = (directClicks.today / numberOfDirectReferrals);
        yesterday.directAverage = (directClicks.yesterday / numberOfDirectReferrals);
        recent.directAverage = ((directClicks.recent / numberOfDirectReferrals) / myAccount.preferences.timePeriod_recent);
        if (!numberOfDirectReferrals > 0) {
            today.directAverage = "N/A";
            yesterday.directAverage = "N/A";
            recent.directAverage = "N/A";
        }
        today.rentedAverage = (rentedClicks.today / numberOfRentedReferrals);
        yesterday.rentedAverage = (rentedClicks.yesterday / numberOfRentedReferrals);
        recent.rentedAverage = ((rentedClicks.recent / numberOfRentedReferrals) / myAccount.preferences.timePeriod_recent);
        today.rentedRAverage = ((rentedClicks.today - (recycleCost.today * 100)) / numberOfRentedReferrals);
        yesterday.rentedRAverage = ((rentedClicks.yesterday - (recycleCost.yesterday * 100)) / numberOfRentedReferrals);
        recent.rentedRAverage = (((rentedClicks.recent - (recycleCost.recent * 100)) / numberOfRentedReferrals) / myAccount.preferences.timePeriod_recent);
        if (!numberOfRentedReferrals > 0) {
            today.rentedAverage = "N/A";
            today.rentedRAverage = "N/A";
            yesterday.rentedAverage = "N/A";
            yesterday.rentedRAverage = "N/A";
            recent.rentedAverage = "N/A";
            recent.rentedRAverage = "N/A";
        }
        today.totalRAverage = (((rentedClicks.today + directClicks.today) - (recycleCost.today * 100)) / (numberOfRentedReferrals + numberOfDirectReferrals));
        yesterday.totalRAverage = (((rentedClicks.yesterday + directClicks.yesterday) - (recycleCost.yesterday * 100)) / (numberOfRentedReferrals + numberOfDirectReferrals));
        recent.totalRAverage = (((rentedClicks.recent + directClicks.recent) - (recycleCost.recent * 100)) / (numberOfRentedReferrals + numberOfDirectReferrals) / myAccount.preferences.timePeriod_recent);
        if (numberOfDirectReferrals === 0 && numberOfRentedReferrals === 0) {
            today.totalRAverage = "N/A <small>(zero refs)</small>";
            yesterday.totalRAverage = "N/A <small>(zero refs)</small>";
            recent.totalRAverage = "N/A <small>(zero refs)</small>";
        }
        today.income = (rentedClicks.today * myAccount.rentedReferralClickValue) + (directClicks.today * myAccount.directReferralClickValue);
        today.expenses = recycleCost.today + autopayCost.today + renewalCost.today;
        yesterday.income = (rentedClicks.yesterday * myAccount.rentedReferralClickValue) + (directClicks.yesterday * myAccount.directReferralClickValue);
        yesterday.expenses = recycleCost.yesterday + autopayCost.yesterday + renewalCost.yesterday;
        recent.income = (rentedClicks.recent * myAccount.rentedReferralClickValue) + (directClicks.recent * myAccount.directReferralClickValue);
        recent.expenses = recycleCost.recent + autopayCost.recent + renewalCost.recent;
        var spacer = document.createElement("TD");
        spacer.setAttribute("style", "width: 6px; font-size: 6px; padding: 0px;");
        spacer.innerHTML = "&nbsp;";
        var infoLabel = document.createElement("TD");
        infoLabel.setAttribute("style", "background-color: #ffffff;");
        infoLabel.setAttribute("rowSpan", "3");
        infoLabel.style.border = "1px solid #888888";
        infoLabel.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
        infoLabel.style.borderRadius = "5px 5px 5px 5px";
        infoLabel.style.verticalAlign = "top";
        infoLabel.style.paddingTop = "0px";
        infoLabel.style.paddingBottom = "8px";
        infoLabel.style.paddingLeft = "8px";
        infoLabel.style.width = "182px";
        infoLabel.style.marginLeft = "5px";
        var sidebarStyle = document.createElement("style");
        sidebarStyle.innerHTML =
                "span.sidebarContent" +
                "{" +
                "  font-family: Verdana, sans-serif;" +
                "  font-size: x-small !important;" +
                "  text-align: left;" +
                "}" +
                "div.sidebarDetails" +
                "{" +
                "  font-size: 95%;" +
                "  margin-left: 5px;" +
                "}" +
                "h4" +
                "{" +
                "  color: #444;" +
                "  text-align: center;" +
                "  margin-top: 10px;" +
                "  margin-bottom:2px" +
                "}" +
                "h5" +
                "{" +
                "  margin-top: 7px;" +
                "  margin-bottom:2px" +
                "}" +
                "h6" +
                "{" +
                "  font-size: xx-small !important;" +
                "  margin-top: 2px;" +
                "  margin-bottom:2px" +
                "}" +
                ".bold" +
                "{" +
                "  font-weight: bold;" +
                "}" +
                ".grey" +
                "{" +
                "  color: #aaa;" +
                "}";
        infoLabel.innerHTML = (
                "<span class='sidebarContent'>" +
                "<span class='sidebarHeader'>" +
                "<h4 class='bold'>" + localString("statsSum") + "<br/>" +
                localString("totalReferrals") + " " + (numberOfRentedReferrals + numberOfDirectReferrals) + "</h4>" +
                "</span>" +
                "<h5 class='bold'><span class='grey'>[ " + localString("today") + " ]</span> - " + localString("net") + " : $" + fix(today.netIncome) + "</h5>" +
                "<hr width='170px' color='#CCCCCC'/>" +
                "<h6> - " + localString("income") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("rented") + ": " + rentedClicks.today.toFixed(0) + " / $" + fix(rentedClicks.today * myAccount.rentedReferralClickValue) + "<br/>" +
                "- " + localString("direct") + ": " + directClicks.today.toFixed(0) + " / $" + fix(directClicks.today * myAccount.directReferralClickValue) + "<br/>" +
                "<i>" + localString("projectedIncome") + ":</i><br/>" +
                "- " + localString("rented") + ": " + today.projectedRentedClicks.toFixed(0) + " / $" + fix(today.projectedRentedClicks * myAccount.rentedReferralClickValue) + "<br/>" +
                "- " + localString("direct") + ": " + today.projectedDirectClicks.toFixed(0) + " / $" + fix(today.projectedDirectClicks * myAccount.directReferralClickValue) + "<br/>" +
                "</div>" +
                "<h6> - " + localString("expenses") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("Recycle") + ": $" + fix(recycleCost.today) + "<br/>" +
                "- " + localString("autopay") + ": $" + fix(autopayCost.today) + "<br/>" +
                "- " + localString("renew") + ": $" + fix(renewalCost.today) + "<br/>" +
                "</div>" +
                "<h6> - " + localString("stats") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("rented") + " " + localString("avg") + ": " + fix(today.rentedAverage) + "<br/>" +
                "- " + localString("direct") + " " + localString("avg") + ": " + fix(today.directAverage) + "<br/>" +
                "- " + localString("raverage") + ": " + fix(today.totalRAverage) + "<br/>" +
                (myAccount.accountType > 0 ? "- " + localString("automaticRecycling") + ": " + automaticRecycling.today.toFixed(0) + "<br/>" : "") +
                "</div>" +
                "<h6> - " + localString("totals") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("income") + ": $" + fix(today.income) + "<br/>" +
                "- " + localString("expenses") + ": $" + fix(today.expenses) + "<br/>" +
                "- " + localString("net") + ": $" + fix(today.income - today.expenses) + "<br/>" +
                "- " + localString("projectedNet") + ": $" + fix(today.projectedIncome - today.expenses) + "<br/>" +
                "</div>" +
                "<h5 class='bold'><span class='grey'>[ " + localString("yesterday") + " ]</span> - " + localString("net") + " : $" + fix(yesterday.netIncome) + "</h5>" +
                "<hr width='170px' color='#CCCCCC'/>" +
                "<h6> - " + localString("income") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("rented") + ": " + rentedClicks.yesterday.toFixed(0) + " / $" + fix(rentedClicks.yesterday * myAccount.rentedReferralClickValue) + "<br/>" +
                "- " + localString("direct") + ": " + directClicks.yesterday.toFixed(0) + " / $" + fix(directClicks.yesterday * myAccount.directReferralClickValue) + "<br/>" +
                "</div>" +
                "<h6> - " + localString("expenses") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("Recycle") + ": $" + fix(recycleCost.yesterday)  + "<br/>" +
                "- " + localString("autopay") + ": $" + fix(autopayCost.yesterday)  + "<br/>" +
                "- " + localString("renew") + ": $" + fix(renewalCost.yesterday)  + "<br/>" +
                "</div>" +
                "<h6> - " + localString("stats") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("rented") + " " + localString("avg") + ": " + fix(yesterday.rentedAverage)  + "<br/>" +
                "- " + localString("direct") + " " + localString("avg") + ": " + fix(yesterday.directAverage)  + "<br/>" +
                "- " + localString("raverage") + ": " + fix(yesterday.totalRAverage)  + "<br/>" +
                (myAccount.accountType > 0 ? "- " + localString("automaticRecycling") + ": " + automaticRecycling.yesterday.toFixed(0) + "<br/>" : "") +
                "</div>" +
                "<h6> - " + localString("totals") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("income") + ": $" + fix(yesterday.income) + "<br/>" +
                "- " + localString("expenses") + ": $" + fix(yesterday.expenses) + "<br/>" +
                "- " + localString("net") + ": $" + fix(yesterday.income - yesterday.expenses) + "<br/>" +
                "</div>" +
                "<h5 class='bold'><span class='grey'>[" + localString("last") + " " + myAccount.preferences.timePeriod_recent + " " + localString("Days") + "]</span> - " + localString("net") + " : $" + fix(recent.netIncome[myAccount.preferences.timePeriod_recent]) + "</h5>" +
                "<hr width='170px' color='#CCCCCC'/>" +
                "<h6> - " + localString("income") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("rented") + ": " + rentedClicks.recent.toFixed(0) + " / $" + fix(rentedClicks.recent * myAccount.rentedReferralClickValue) + "<br/>" +
                "- " + localString("direct") + ": " + directClicks.recent.toFixed(0) + " / $" + fix(directClicks.recent * myAccount.directReferralClickValue) + "<br/>" +
                "</div>" +
                "<h6> - " + localString("expenses") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("Recycle") + ": $" + fix(recycleCost.recent)  + "<br/>" +
                "- " + localString("autopay") + ": $" + fix(autopayCost.recent)  + "<br/>" +
                "- " + localString("renew") + ": $" + fix(renewalCost.recent)  + "<br/>" +
                "</div>" +
                "<h6> - " + localString("stats") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("rented") + " " + localString("avg") + ": " + fix(recent.rentedAverage)  + "<br/>" +
                "- " + localString("direct") + " " + localString("avg") + ": " + fix(recent.directAverage)  + "<br/>" +
                "- " + localString("raverage") + ": " + fix(recent.totalRAverage)  + "<br/>" +
                (myAccount.accountType > 0 ? "- " + localString("automaticRecycling") + ": " + automaticRecycling.recent.toFixed(0) + "<br/>" : "") +
                "</div>" +
                "<h6> - " + localString("totals") + "</h6>" +
                "<div class='sidebarDetails'>" +
                "- " + localString("income") + ": $" + fix(recent.income) + "<br/>" +
                "- " + localString("expenses") + ": $" + fix(recent.expenses) + "<br/>" +
                "- " + localString("net") + ": $" + fix(recent.income - recent.expenses) + "<br/>" +
                "</div>" +
                "</span>");
        infoLabel.appendChild(sidebarStyle);
// *** INSERT STATISTICS SUMMARY INTO PAGE ***
        locationToInsert.appendChild(spacer);
        locationToInsert.appendChild(infoLabel);
// Enlarge the width of the page to accomodate the extra column and add a little padding to make it look nicer
        locationToInsert.parentNode.parentNode.parentNode.setAttribute("width", "927");
        var nodesSnapshot = selectNodes("//body/div[contains(@style,'margin')][not(@id='tiptip_holder')]");
        nodesSnapshot[nodesSnapshot.length - 1].setAttribute("align", "center");
        var i;
        for (i = 0; i < nodesSnapshot.length; i += 1) {
            nodesSnapshot[i].style.width = "100%";
            nodesSnapshot[i].children[0].style.width = "1100px";
        }
    }

    function setHeaderProperties(header) {
        header.setAttribute("class", "bgt");
        header.style.setProperty("font-family", "Arial,Helvetica,Verdana,sans-serif", "");
        header.style.setProperty("white-space", "nowrap", "");
        header.style.setProperty("text-align", "center", "");
    }

    function setFieldProperties(field) {
        field.setAttribute("class", "f_r cl");
        field.style.setProperty("white-space", "nowrap", "");
        field.style.setProperty("text-align", "right", "");
    }

    function shrinkContents(column) {
        column.style.setProperty("letter-spacing", myAccount.preferences.letterSpacing, "");
        column.style.setProperty("word-spacing", myAccount.preferences.wordSpacing, "");
    }

    function referralPage() {
// Function that runs on the Referral Listings pages
        var renewalPeriod = 0;
        var renewalCost = 0;
        var renewalCostPerRefPerDay = 0;
        var goldenFeePerRefPerDay = 0;
        var goldenPackFeePerRefPerDay = 0;
        var expensesPerRefPerDay = 0;
        var minBreakEvenAvgExcludingRecycles = 0;
        if (currentPage.name === "rentedRefListing") {
// Define the column indexes
            var col_NUMBER = 0;
            var col_FLAG = 1;
            var col_NAME = 2;           var colHeader_NAME = 1;
            var col_SINCE = 3;          var colHeader_SINCE = 2;
            var col_NEXTPAYMENT = 4;    var colHeader_NEXTPAYMENT = 3;
            var col_LAST = 5;           var colHeader_LAST = 4;
            var col_CLICKS = 6;         var colHeader_CLICKS = 5;     
            var col_AVG = 7;            var colHeader_AVG = 6;
// CALCULATE REFERRAL EXPENSES PER DAY AND MIN BREAK EVEN AVERAGE
            renewalPeriod = myAccount.preferences.renewalPeriod;
            renewalCost = myAccount.renewalFee(renewalPeriod); // Cost of renewing for the renewing period
// Cost of renewing, per ref per day
            renewalCostPerRefPerDay = renewalCost / renewalPeriod;
            if (myAccount.accountType > 0) {
// Cost of golden & golden packs per ref, per day
                goldenFeePerRefPerDay = (90 / 365) / numberOfRentedReferrals;
                goldenPackFeePerRefPerDay = (myAccount.goldenPackCost / 365) / numberOfRentedReferrals;
            }
// Calculate how much referrals cost per day
            expensesPerRefPerDay = renewalCostPerRefPerDay + goldenFeePerRefPerDay + goldenPackFeePerRefPerDay;
// Calculate the minimum average needed to pay for the expenses of each ref each day
            minBreakEvenAvgExcludingRecycles = expensesPerRefPerDay / myAccount.rentedReferralClickValue;
        } else if (currentPage.name === "directRefListing") {
// Define the column indexes
            var col_NUMBER = 0;
            var col_NAME = 1;           var colHeader_NAME = 1;
            var col_CAME_FROM = 2;      var colHeader_CAME_FROM = 2;
            var col_SINCE = 3;          var colHeader_SINCE = 3;
            var col_LAST = 4;           var colHeader_LAST = 4;
            var col_CLICKS = 5;         var colHeader_CLICKS = 5;
            var col_AVG = 6;            var colHeader_AVG = 6;
        } else {
            GM.log("Error defining column indexes - currentPage.name is unknown.");
        }
        var sumOfAverages = 0;
        var sumOfMinigraphClickAvgs = 0;
        var clickSum = 0;
        var refCount = -1;
        var todayClickers = 0;
        var ydayClickers = 0;
        var zeroClickers = 0;
        var otherClickers = 0;
        var currencySymbol_AVG = myAccount.preferences.columnPrefix_Average;
        var currencySymbol_clickText = myAccount.ultimatePreferences.columnPrefix_clickText;
        var currencySymbol_average1 = myAccount.ultimatePreferences.columnPrefix_Average1;
        var currencySymbol_average2 = myAccount.ultimatePreferences.columnPrefix_Average2;
        var currencySymbol_RSA = myAccount.ultimatePreferences.columnPrefix_RSA;
        var currencySymbol_SD = myAccount.ultimatePreferences.columnPrefix_SD;
        var currencySymbol_Profit = myAccount.preferences.columnPrefix_Profit;
        var minigraphs = [];
// mainTable = the table which shows the referrals are contained
        var mainTable = selectNode("//td[@class='bgt']/ancestor::tbody[1]");
        if (mainTable === null) {
            return;
        }
        var rows = mainTable.rows;
        var headerRow = rows[0];
        var lastHeader = headerRow.childNodes[colHeader_AVG + 1];
        if (myAccount.preferences.referralName_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_NAME]);
        }
        if (myAccount.preferences.ownedSince_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_SINCE]);
        }
        if (currentPage.name === "directRefListing" &&
                myAccount.preferences.cameFrom_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_CAME_FROM]);
        }
        if (currentPage.name === "rentedRefListing" &&
                myAccount.preferences.nextPayment_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_NEXTPAYMENT]);
        }
        if (myAccount.preferences.lastClick_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_LAST]);
        }
        if (myAccount.preferences.totalClicks_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_CLICKS]);
        }
    if(myAccount.preferences.exactAverage_replace == false && myAccount.preferences.exactAverage_show == true) {
      setHeaderProperties(headerRow.childNodes[colHeader_AVG]);
      headerRow.childNodes[colHeader_AVG].innerHTML += '<br/><small>'+localString('ExactAVG')+'</small>';
    }
    else if(myAccount.preferences.exactAverage_replace == true && myAccount.preferences.exactAverage_show == true) {
      setHeaderProperties(headerRow.childNodes[colHeader_AVG]);
      headerRow.childNodes[colHeader_AVG].innerHTML += '<br/><small>'+localString('Exact#')+'</small>';
    }
        if (myAccount.preferences.average_shrinkContents) {
            shrinkContents(headerRow.childNodes[colHeader_AVG]);
        }
// Ultimate-only columns
        if (myAccount.accountType === 6) {
// clickText column === A textual representation of the data in the mini click graphs
            if (myAccount.ultimatePreferences.showColumn_clickText === true) {
                var new_clickText = document.createElement("td");
                setHeaderProperties(new_clickText);
                new_clickText.innerHTML = "Clicks/day";
                headerRow.insertBefore(new_clickText, lastHeader);
                if (myAccount.ultimatePreferences.clickText_shrinkContents) {
                    shrinkContents(new_clickText);
                }
            }
// 'average1' column === Average for the last 10 days
            if (myAccount.ultimatePreferences.showColumn_Average1 === true) {
                var new_headerAvg_10 = document.createElement("td");
                setHeaderProperties(new_headerAvg_10);
                new_headerAvg_10.innerHTML = "A" + myAccount.ultimatePreferences.timePeriod_average1;
                headerRow.insertBefore(new_headerAvg_10, lastHeader);
                if (myAccount.ultimatePreferences.average1_shrinkContents) {
                    shrinkContents(new_headerAvg_10);
                }
            }
// 'average2' column === Average for the last 7 days
            if (myAccount.ultimatePreferences.showColumn_Average2 === true) {
                var new_headerAvg_7 = document.createElement("td");
                setHeaderProperties(new_headerAvg_7);
                new_headerAvg_7.innerHTML = "A" + myAccount.ultimatePreferences.timePeriod_average2;
                headerRow.insertBefore(new_headerAvg_7, lastHeader);
                if (myAccount.ultimatePreferences.average2_shrinkContents) {
                    shrinkContents(new_headerAvg_7);
                }
            }
// 'SDEV' column === Standard Deviation
            if (myAccount.ultimatePreferences.showSDEVColumn === true) {
                var new_headerSDEV = document.createElement("td");
                setHeaderProperties(new_headerSDEV);
                new_headerSDEV.innerHTML = "SD";
                headerRow.insertBefore(new_headerSDEV, lastHeader);
                if (myAccount.ultimatePreferences.SD_shrinkContents) {
                    shrinkContents(new_headerSDEV);
                }
            }
// 'RSA' column === Ratio of standard deviation / average (mean)
            if (myAccount.ultimatePreferences.showColumn_RSA === true) {
                var new_headerRSA = document.createElement("td");
                setHeaderProperties(new_headerRSA);
                new_headerRSA.innerHTML = "RSA";
                headerRow.insertBefore(new_headerRSA, lastHeader);
                if (myAccount.ultimatePreferences.RSA_shrinkContents) {
                    shrinkContents(new_headerRSA);
                }
            }
        }
// 'Profit' column can be viewed by all members
        if (myAccount.preferences.showColumn_Profit === true) {
            var new_headerPROFIT = document.createElement("td");
            setHeaderProperties(new_headerPROFIT);
            new_headerPROFIT.innerHTML = localString("Profit")
            headerRow.insertBefore(new_headerPROFIT, lastHeader);
            if (myAccount.preferences.profitColumn_shrinkContents) {
                shrinkContents(new_headerPROFIT);
            }
        }
// Fetch the script that contains referral listing data
        var xpathResults_mtx = selectNode("//script[contains(.,'mtx=')]");
// Fetch the useful part of the script and replace the '];' that got removed by split()
        var mtxCode = xpathResults_mtx.innerHTML.split("];")[0] + "];";
        mtxCode = mtxCode.replace(/([0-9]+\.*[0-9]*)([,|\]])/g, "'$1'$2");
        customLogger("xpathResults_mtx = " + xpathResults_mtx + "\n" +
                "mtxCode = " + mtxCode, 7);
// Run the code in mtxCode (var mtx=[...];)
        eval(mtxCode);
// Ultimate-only columns
        if (myAccount.accountType === 6) {
// mtx.length = # of referrals shown on current page
            for (var z = 0; z < mtx.length; z += 1) {
                var clickData = mtx[z][14].toString();
                var clickData_array = [];
                customLogger("clickData = " + clickData, 7);
// Make the minigraph data more useable by splitting it into an array
                if (clickData !== "0") {
                    clickData.split("");
                    for (var i = 0; i < clickData.length; i += 1) {
                        clickData_array[i] = parseInt(clickData[i], 10);
                    }
                } else {
                    clickData_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                }
// Now reverse the order of the array so that the most recent days are first ([0] == today, [1] == yesterday)
                clickData_array.reverse();
                customLogger("typeof clickData_array = " + typeof clickData_array + "\n" +
                        "clickData_array = " + clickData_array, 7);
// Extract the stats from the minigraph data
                var minigraphClickData = [];
                var minigraphClickSums = [];
                var minigraphClickAvgs = [];
                for (var m = 0; m < clickData_array.length; m += 1) {
                    minigraphClickData[m] = parseInt(clickData_array[m], 10);
                }
                for (var s = 0; s < minigraphClickData.length; s += 1) {
                    if (s === 0) {
                        minigraphClickSums[s] = minigraphClickData[s];
                    } else {
                        minigraphClickSums[s] = minigraphClickSums[s - 1] + minigraphClickData[s];
                    }
                    minigraphClickAvgs[s] = minigraphClickSums[s] / (s + 1);
                    customLogger("s = " + s + "\n" +
                            "minigraphClickData[s] = " + minigraphClickData[s] + "\n" +
                            "minigraphClickSums[s - 1] = " + minigraphClickSums[s - 1] + "\n" +
                            "minigraphClickSums[s] = " + minigraphClickSums[s] + "\n" +
                            "minigraphClickAvgs[s] = " + minigraphClickAvgs[s], 12);
                }
                minigraphs[z] = new graphProperties(minigraphClickData, minigraphClickSums);
            }
        }
// Loop through the displayed referrals
        for (var rowCounter = 1; rowCounter < (rows.length - 1); rowCounter += 1) {
            var currentRow = rows[rowCounter];
// If the row isn't blank, process it
            if (currentRow.textContent !== "" && currentRow.childNodes.length > 1) {
                refCount += 1;
                customLogger("rowCounter = " + rowCounter + "\n" +
                        "currentRow = " + currentRow + "\n" +
                        "refCount = " + refCount, 7);
                var lastColumn = currentRow.childNodes[col_AVG +1];
                var refFlag = currentRow.childNodes[col_FLAG];
                var refName = currentRow.childNodes[col_NAME];
                var refOwnedSince = currentRow.childNodes[col_SINCE];
                if (currentPage.name === "rentedRefListing") {
                    var refNextPayment = currentRow.childNodes[col_NEXTPAYMENT];
                }
                var refLastClick = currentRow.childNodes[col_LAST];
                var refTotalClicks = currentRow.childNodes[col_CLICKS];
                var refOverallAvg = currentRow.childNodes[col_AVG];
                if (currentPage.name === "rentedRefListing" &&
                        myAccount.preferences.flag_shrinkContents) {
                    shrinkContents(refFlag);
                }
                if (myAccount.preferences.referralNumber_shrinkContents) {
                    shrinkContents(currentRow.childNodes[col_NUMBER]);
                }
                if (myAccount.preferences.referralName_shrinkContents) {
                    shrinkContents(refName);
                }
                if (myAccount.preferences.ownedSince_shrinkContents) {
                    shrinkContents(refOwnedSince);
                }
                if (currentPage.name === "rentedRefListing" &&
                        myAccount.preferences.nextPayment_shrinkContents) {
                    shrinkContents(refNextPayment);
                }
                if (myAccount.preferences.lastClick_shrinkContents) {
                    shrinkContents(refLastClick);
                }
                if (myAccount.preferences.totalClicks_shrinkContents) {
                    shrinkContents(refTotalClicks);
                }
                if (myAccount.preferences.average_shrinkContents) {
                    shrinkContents(refOverallAvg);
                }
// Columns specific to the direct referrals page
                if (currentPage.name === "directRefListing" &&
                        myAccount.preferences.cameFrom_shrinkContents) {
                    shrinkContents(currentRow.childNodes[col_CAME_FROM]);
                }
                if (myAccount.preferences.textifyFlag && 
                        currentPage.name === "rentedRefListing") {
// Get the flag colour of the referral
                    var flagColour;
                    if (refFlag.innerHTML.indexOf("flag0.gif") > -1) {
                        flagColour = localString("W");
                    } else if (refFlag.innerHTML.indexOf("flag1.gif") > -1) {
                        flagColour = localString("R");
                    } else if (refFlag.innerHTML.indexOf("flag2.gif") > -1) {
                        flagColour = localString("O");
                    } else if (refFlag.innerHTML.indexOf("flag3.gif") > -1) {
                        flagColour = localString("Y");
                    } else if (refFlag.innerHTML.indexOf("flag4.gif") > -1) {
                        flagColour = localString("G");
                    } else if (refFlag.innerHTML.indexOf("flag5.gif") > -1) {
                        flagColour = localString("Bl");
                    } else if (refFlag.innerHTML.indexOf("flag6.gif") > -1) {
                        flagColour = localString("P");
                    } else if (refFlag.innerHTML.indexOf("flag7.gif") > -1) {
                        flagColour = localString("Bk");
                    }
                    refFlag.style.whiteSpace = "nowrap";
                    refFlag.innerHTML += myAccount.preferences.textifyFlag_prefix + flagColour;
                }
// Extract the 'wholeDays' data from the table
                var numDaysOwned_raw = refOwnedSince.innerHTML.replace("&nbsp;", "");
                var lastClick_raw = refLastClick.innerHTML.replace("&nbsp;", "");
// Calculate the number of days referral has been owned and convert this to a 'fuller' version [x days, y hours, z mins]
// If {column}_shortFormat === true, it will return [x d, y h, z m] instead
// If 'fullerSinceTimers' is set to false, NumDaysSince() will return only the whole number of days that have passed
                var numDaysOwned_summarised = NumDaysSince(numDaysOwned_raw, "mins", myAccount.preferences.referralSince_fullerTimers, myAccount.preferences.ownedSinceTimer_shortFormat);
// If the referral has not clicked yet, the referral has been inactive for as long as it has been owned
// Else the referral has been inactive since the date of its last click
                if (lastClick_raw.match(neobuxString("noClicks"))) {
                    var inactiveDays = NumDaysSince(numDaysOwned_raw, "days", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClickTimer_shortFormat);
                    var accurateLastClick = NumDaysSince(numDaysOwned_raw, "days", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClick_fullerTimers);
                } else  {
                    var inactiveDays = NumDaysSince(lastClick_raw , "days", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClickTimer_shortFormat);
                    var accurateLastClick = NumDaysSince(lastClick_raw, "days", myAccount.preferences.lastClick_fullerTimers, myAccount.preferences.lastClick_fullerTimers);
                }
// Insert the summarised date / 'time elapsed' to the cell
// If user preference is to not replace the whole cell, append to end of existing cell contents, else replace the cell contents
// 'Owned Since' column
                if (myAccount.preferences.referralSince_numerise) {
                    if (!myAccount.preferences.referralSince_replace) {
                        refOwnedSince.innerHTML = numDaysOwned_raw + "<small style='color: #666666;'> (" + numDaysOwned_summarised + ")</small>";
                    } else {
                        refOwnedSince.innerHTML = numDaysOwned_summarised;
                    }
                }
// 'Last Click' column
                if (myAccount.preferences.lastClick_numerise) {
                    if (myAccount.preferences.lastClick_replace || (myAccount.preferences.lastClick_replaceNilClicks && parseInt(refTotalClicks.textContent, 10) === 0)) {
                        refLastClick.innerHTML = inactiveDays;
                    } else {
                        refLastClick.innerHTML = lastClick_raw + "<small style='color: #666666;'> [" + inactiveDays + "]</small>";
                    }
                }
// Avg. column
                var accurateOwnedSince = NumDaysSince(numDaysOwned_raw, 'decimal', myAccount.preferences.referralSince_fullerTimers, false);
                var accurateAverage = parseInt(refTotalClicks.textContent, 10) / accurateOwnedSince;
                if (myAccount.preferences.exactAverage_show) {
// Replace the displayed average (accurate to a 24hour period) with one that that is more accurate
// (takes hours and minutes into account)
                    if (myAccount.preferences.exactAverage_replace) {
                        refOverallAvg.innerHTML = fix(accurateAverage);
                    } else {
                        refOverallAvg.innerHTML = refOverallAvg.innerHTML + "<span style='color: #666666;'>" + myAccount.preferences.exactAverage_seperator + fix(accurateAverage) + "</span>";
                    }
                }
                refOverallAvg.innerHTML = currencySymbol_AVG + "" + refOverallAvg.innerHTML; // + "" + is necessary to ensure that the vars are concatenated (as opposed to mathematical addition)
// Update the overall statistics for the single page of referrals (data used for bar at bottom of the referral listing page)
                if (parseFloat(refOverallAvg.textContent) > 0) {
                    sumOfAverages += parseFloat(refOverallAvg.textContent);
                    if (myAccount.accountType === 6) {
                        sumOfMinigraphClickAvgs += minigraphs[refCount].mean[myAccount.ultimatePreferences.minigraphAvgInterval];
                    }
                    clickSum += parseInt(refTotalClicks.textContent, 10);
                }
// Keep a tally of how many referrals clicked today / yesterday / never / other
                if (parseInt(refTotalClicks.textContent, 10) === 0) {
                    zeroClickers += 1;
                } else if (Math.floor(accurateLastClick) === 0) {
                    todayClickers += 1;
                } else if (Math.floor(accurateLastClick) === 1) {
                    ydayClickers += 1;
                } else {
                    otherClickers += 1;
                }
// INSERT EXTRA COLUMNS
// Ultimate-only columns
                if (myAccount.accountType === 6) {
// clickText column === A textual representation of the data in the mini click graphs
                    if (myAccount.ultimatePreferences.showColumn_clickText === true) {
                        var columnText_clickText = minigraphs[refCount].value[minigraphs[refCount].value.length - 1].toFixed(0);
                        for (var i = minigraphs[refCount].value.length - 2; i > 0; i -= 1) {
                            columnText_clickText += "|" + minigraphs[refCount].value[i].toFixed(0);
                        }
                        var newColumn_clickText = document.createElement("td");
                        setFieldProperties(newColumn_clickText);
                        newColumn_clickText.innerHTML = currencySymbol_clickText + columnText_clickText;
                        if (myAccount.ultimatePreferences.clickText_shrinkContents) {
                            shrinkContents(newColumn_clickText);
                        }
                        currentRow.insertBefore(newColumn_clickText, lastColumn);
                    }
// 'average1' column === Average for the last timePeriod_average1 days
                    if (myAccount.ultimatePreferences.showColumn_Average1 === true) {
                        var columnText_average1 = fix(minigraphs[refCount].mean[myAccount.ultimatePreferences.timePeriod_average1]);
                        var newColumn_average1 = document.createElement("td");
                        setFieldProperties(newColumn_average1);
                        newColumn_average1.innerHTML = currencySymbol_average1 + columnText_average1;
                        if (myAccount.ultimatePreferences.average1_shrinkContents) {
                            shrinkContents(newColumn_average1);
                        }
                        currentRow.insertBefore(newColumn_average1, lastColumn);
                    }
// 'average2' column === Average for the last timePeriod_average2 days
                    if (myAccount.ultimatePreferences.showColumn_Average2 === true) {
                        var columnText_average2 = fix(minigraphs[refCount].mean[myAccount.ultimatePreferences.timePeriod_average2]);
                        var newColumn_average2 = document.createElement("td");
                        setFieldProperties(newColumn_average2);
                        newColumn_average2.innerHTML = currencySymbol_average2 + columnText_average2;
                        if (myAccount.ultimatePreferences.average2_shrinkContents) {
                            shrinkContents(newColumn_average2);
                        }
                        currentRow.insertBefore(newColumn_average2, lastColumn);
                    }
// 'SDEV' column === Standard DEViation for the last 10 days
                    if (myAccount.ultimatePreferences.showSDEVColumn === true) {
                        var columnText_SDEV = fix(minigraphs[refCount].sdev);
                        var newColumn_SDEV = document.createElement("td");
                        setFieldProperties(newColumn_SDEV);
                        newColumn_SDEV.innerHTML = currencySymbol_SD + columnText_SDEV;
                        if (myAccount.ultimatePreferences.SD_shrinkContents) {
                            shrinkContents(newColumn_SDEV);
                        }
                        currentRow.insertBefore(newColumn_SDEV, lastColumn);
                    }
// 'RSA' column === Ratio of standard deviation / average (mean)
                    if (myAccount.ultimatePreferences.showColumn_RSA === true) {
                        var columnText_RSA = fix(minigraphs[refCount].sdev / minigraphs[refCount].mean[10]);
                        var newColumn_RSA = document.createElement("td");
                        setFieldProperties(newColumn_RSA);
                        newColumn_RSA.innerHTML = currencySymbol_RSA + columnText_RSA;
                        if (myAccount.ultimatePreferences.RSA_shrinkContents) {
                            shrinkContents(newColumn_RSA);
                        }
                        currentRow.insertBefore(newColumn_RSA, lastColumn);
                    }
                }
// 'Profit' column can be viewed by all members
                if (myAccount.preferences.showColumn_Profit) {
// Retrieve numerical version of numDaysOwned and other details about the current individual referral
                    var numDaysOwned_decimal = NumDaysSince(numDaysOwned_raw, "wholeDays", myAccount.preferences.lastClick_fullerTimers, false);
                    var refClicks = parseInt(refTotalClicks.innerHTML, 10);
                    var refID = refName.textContent.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
                    var indivAvg = accurateAverage;
// Calculate the gross income and expenses for the referral (accurate to the minute)
                    var grossOut;
                    if (currentPage.name === "rentedRefListing") {
                        var grossIn = refClicks * myAccount.rentedReferralClickValue;
                        grossOut = numDaysOwned_decimal * expensesPerRefPerDay;
                    } else if (currentPage.name === "directRefListing") {
                        var grossIn = refClicks * myAccount.directReferralClickValue;
                        grossOut = 0;
                    }
                    var netProfit_exclRecycles = grossIn - grossOut;
                    var netProfit_inclRecycles = (grossIn - grossOut) - myAccount.recycleCost;
                    var profitPerDay = (indivAvg * myAccount.rentedReferralClickValue) - expensesPerRefPerDay;
                    customLogger("currentPage.name = " + currentPage.name + "\n" +
                            "numDaysOwned_decimal = " + numDaysOwned_decimal + "\n" +
                            "expensesPerRefPerDay = " + expensesPerRefPerDay + "\n" +
                            "grossOut = " + grossOut + "\n" +
                            "grossIn = " + grossIn + "\n" +
                            "myAccount.recycleCost = " + myAccount.recycleCost + "\n" +
                            "netProfit_exclRecycles = " + netProfit_exclRecycles + "\n" +
                            "netProfit_inclRecycles = " + netProfit_inclRecycles, 7);
// Calculate the net income of the individual referral slot
// If the user wishes to include the cost of recycling in the profit column, include the recycle fee 
// in the gross expenses for the referral
                    var PROFIT;
                    if (!myAccount.preferences.includeRecycleCostInProfitColumn || (currentPage.name === "directRefListing")) {
                        PROFIT = netProfit_exclRecycles;
                    } else {
                        PROFIT = netProfit_inclRecycles;
                    }
// Create the new 'Profit' column
                    var newColumn_PROFIT = document.createElement("td");
                    setFieldProperties(newColumn_PROFIT);
                    newColumn_PROFIT.id = "Profit_" + refID; // This ID is used by 'prototip' as an anchor to attach the tooltip to
          // If the net profit is negative, format it differently
          if (currentPage.name == 'directRefListing') {
            if(PROFIT <= 0) {
              newColumn_PROFIT.innerHTML = "<font style='font-size:12px; background: #000000; color:#CC0000; '>" + "" + currencySymbol_Profit + fix(PROFIT) + "" + "</font>";
            }
            else if(PROFIT > 0) {
              newColumn_PROFIT.innerHTML = "<font style='font-size:12px; color:green; '>"  + currencySymbol_Profit + " " + fix(PROFIT) + "</font>";
            }
            else {
              newColumn_PROFIT.innerHTML = "<font style='font-size:12px; color:F88; '>"  + currencySymbol_Profit + " " + fix(PROFIT) + "</font>"; 
            }
          }
          if (currentPage.name == 'rentedRefListing') {
            if(PROFIT >= recycleCost) {
              newColumn_PROFIT.innerHTML = "<font style='font-size:12px; color:green; '>"  + currencySymbol_Profit + " " + fix(PROFIT) + "</font>";
            }
            else if(PROFIT >= 0) {
              newColumn_PROFIT.innerHTML = "<font style='font-size:12px; color:blue;'>"  + currencySymbol_Profit + " " + fix(PROFIT) + "</font>";
            }
            else if (PROFIT < 0 && profitPerDay <= 0 && fix(netProfit_inclRecycles) <= 0) {
              newColumn_PROFIT.innerHTML = "<font style='font-size:12px; color:#CC0000;'>" + "" + currencySymbol_Profit + fix(PROFIT) + "" + "</font>";
            }
            else if (PROFIT < 0 && (recycleCost / profitPerDay).toFixed(0) >= 31 || (daysTilPaidOwnRecycle + numDaysOwned_decimal) >= 31) {
              newColumn_PROFIT.innerHTML = "<font style='font-size:12px; color:lightslategray; '>" + "" + currencySymbol_Profit + fix(PROFIT) + "" + "</font>";
            }
            else {
              newColumn_PROFIT.innerHTML = "<font style='font-size:12px; color:#CC0000;'>" + "" + currencySymbol_Profit + fix(PROFIT) + "" + "</font>"; 
            }
          }
          // Insert the new 'Profit' column
          currentRow.insertBefore(newColumn_PROFIT, lastColumn);
          // If the current page is the rented referral listing page, create and insert the tooltips
          if(currentPage.name == 'rentedRefListing') {
 var profitPerDay = (indivAvg * myAccount.rentedReferralClickValue) - expensesPerRefPerDay;
// Calculate how many days it will take for the referral to pay for its own recycle
// --> Assumes that the referral has clicked consistently at the current average
// --> Odd results from this will be shown if the referral has vastly changing click patterns
// --> Will return 'More than '+dayLimit+' days' if it will take > dayLimit days to pay for own recycle (dayLimit: default = 30)
 var daysTilPaidOwnRecycle = getDaysTilPaidOwnRecycle(
   indivAvg, netProfit_exclRecycles,
   expensesPerRefPerDay);
   if (isNaN(daysTilPaidOwnRecycle) &&
     (parseFloat(indivAvg) < parseFloat(
     minBreakEvenAvgExcludingRecycles))) {
     daysTilPaidOwnRecycle = "Never";localString("Never");
   }
            var tipContent = "<p>" + localString("referral") + ": <b>" + refID + "</b></p>" + 
            '<hr>'+
            '<i><small>'+localString('expenses')+' ' +localString('chosendaily')+'</small></i><br/>'+
            '- '+localString('Renewals')+' <i><small>(  '+ (renewalPeriod === 1 ? localString('AutoPay') : (renewalPeriod +' '+localString('days')+' '+localString('of')+' '+localString('renewal')))+'  )</small></i> = <b>$'+fix(renewalCostPerRefPerDay)+'     </b><br/>';
            // Add Golden / Golden Pack-specific lines to the tooltip
            if(myAccount.accountType >= 1) { tipContent = tipContent + '- '+localString('goldenFee')+' <i><small>('+localString('perRefPerDay')+')</small></i> = <b>$'+fix(goldenFeePerRefPerDay)+'</b><br/>'; }
            if(myAccount.accountType > 1) { tipContent = tipContent + '- '+localString('goldenPackFee')+' <i><small>('+localString('perRefPerDay')+'</small></i> = <b>$'+fix(goldenPackFeePerRefPerDay)+'</b><br/>';}
            tipContent = tipContent + 
            localString('totalexpenses')+' <i><small>('+localString('perRefPerDay')+')</small></i> = <b>$'+fix(expensesPerRefPerDay)+'</b><br/>'+
            '<br/>'+
            '<i><small>'+localString('minimumAverage')+ ' '+localString('toBreakEven')+'</small></i> = <b>'+fix(minBreakEvenAvgExcludingRecycles)+'</b><br/>'+
            '<br/>'+
            localString('currentProfit')+' = <b>$'+fix(netProfit_exclRecycles)+'</b><br/>'+
            '<br/>'+
            '- '+localString('grossIn')+'   = <b>$'+fix(grossIn)+'</b><br/>'+
            '- '+localString('grossOut')+' = <b>$'+fix(grossOut)+'</b><br/>'+
            '<br/>'+
            localString('currentProfit')+' <i><small>('+localString('incl')+' '+recycleCost+' '+localString('for')+' '+localString('recycle')+')</small></i> = <b>$'+fix(netProfit_inclRecycles)+'</b><br/>'+
            '<br/>'+
            '<i><small>'+localString('avg')+' '+localString('Exact')+' = <b>'+fix(indivAvg)+'</b></small></i><br/>'+
            localString('netProfit')+' <i><small>('+localString('per')+' '+localString('day')+')</small></i>  = <b>$'+fix(profitPerDay)+'</b><br/>'+
            localString('netProfit')+' <i><small>('+localString('per')+' '+localString('months')+')</small></i> = <b>$'+fix((profitPerDay * 30))+'</b><br/>'+
            '<br/>'+
            localString('daysToPayForOwnRecycle')+' = <b>'+daysTilPaidOwnRecycle+'</b><br/><br/>';
            if(!isNaN(daysTilPaidOwnRecycle)) {
              tipContent = tipContent + '<i>'+localString('day#')+' = <b>'+(daysTilPaidOwnRecycle + numDaysOwned_decimal)+'</b></i>';
            }
            tipContent = tipContent + "<br/>";
// Create and insert a new script node for the prototip tooltip javascript code to be run from
                        var script = document.createElement("script");
                        var text = document.createTextNode("new mk_tt('Profit_" + refID + "', 'left', '" + tipContent + "')");
                        script.type = "text/javascript";
                        script.appendChild(text);
                        currentRow.appendChild(script);
                    }
                }
            }
        }
// Set the size of the bottom row to match the size of the header row to accomodate for extra columns that have been added
        var footerRow = rows[rows.length - 1];
        rows[1].childNodes[0].colSpan =
                rows[rows.length - 2].childNodes[0].colSpan =
                footerRow.childNodes[0].colSpan = rows[2].childNodes.length;
// SUMMARY ROW @ bottom of the referral listing table
        if (myAccount.ultimatePreferences.showRecentAverage) {
            var totalClickAvg = sumOfAverages / (refCount + 1);
            if (isNaN(totalClickAvg)) {
                totalClickAvg = 0;
            }
            var nbsp = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            var footerRow_text = nbsp +
                    localString("totalClicks") + ": " + clickSum +
                    nbsp + localString("totalClickAvg") + ": " + fix(totalClickAvg);
            if (myAccount.accountType === 6) {
                footerRow_text = footerRow_text + nbsp + localString("lastdaysClickAvg") +
                        " (" + myAccount.ultimatePreferences.minigraphAvgInterval + "): " +
                        fix(sumOfMinigraphClickAvgs / (refCount + 1));
            }
            setHeaderProperties(footerRow.childNodes[0]);
            footerRow.childNodes[0].style.setProperty("line-height", "14px", "");
            footerRow_text = footerRow_text + nbsp +
                    localString("clicked") + 
                          " (" + localString("today") + ": " + todayClickers +
                    ",&nbsp;" + localString("yesterday") + ": " + ydayClickers +
                    ",&nbsp;" + localString("others") + ": " + otherClickers +
                    ",&nbsp;" + localString("zeroClickers") + ": " + zeroClickers +
                          ")" + nbsp;
            footerRow.childNodes[0].innerHTML = footerRow_text;
            if (myAccount.ultimatePreferences.RA_shrinkContents) {
                shrinkContents(footerRow.childNodes[0]);
            }
        }
        var newWidth = parseInt(window.getComputedStyle(
                selectNode("//body/div[2]/div[1]/table"), null).width, 10);
        var nodesSnapshot = selectNodes("//body/div[contains(@style,'margin')][not(@id='tiptip_holder')]");
        nodesSnapshot[nodesSnapshot.length - 1].setAttribute("align", "center");
        var n;
        for (n = 0; n < nodesSnapshot.length; n += 1) {
            nodesSnapshot[n].style.width = "100%";
            nodesSnapshot[n].children[0].style.width = newWidth + "px";
        }
        var menuContainer = selectNode("//body/div[2]/div[1]/table/tbody/tr/td[1]");
        var menuContainerWidth = parseInt(window.getComputedStyle(menuContainer, null).width, 10);
        if (menuContainerWidth < parseFloat(menuContainer.width)) {
            newWidth += parseFloat(menuContainer.width) - menuContainerWidth;
            for (n = 0; n < nodesSnapshot.length; n += 1) {
                nodesSnapshot[n].children[0].style.width = newWidth + "px";
            }
        }
    }

// CUSTOM FUNCTION - Compares two version numbers
// Returns true if current version < other version
    function otherVerIsNewerVersion(currentVerInput, otherVerInput) {
        var
            currentVer,
            i,
            otherVer,
            otherVerIsNewer;
        currentVer = currentVerInput.split(".");
        otherVer = otherVerInput.split(".");
        for (i = 0; i < currentVer.length; i += 1) {
            currentVer[i] = Number(currentVer[i]);
            otherVer[i] = Number(otherVer[i]);
        }
        otherVerIsNewer = false;
        if (currentVer[0] < otherVer[0]) {
            otherVerIsNewer = true;
        } else if (currentVer[0] === otherVer[0]) {
            if (currentVer[1] < otherVer[1]) {
                otherVerIsNewer = true;
            } else if (currentVer[1] === otherVer[1]) {
                if (currentVer[2] < otherVer[2]) {
                    otherVerIsNewer = true;
                } else if (currentVer[2] === otherVer[2]) {
                    if (currentVer[3] < otherVer[3]) {
                        otherVerIsNewer = true;
                    }
                }
            }
        }
        return otherVerIsNewer;
    }

    function checkForUpdates() {
        var
            otherVersion,
            time;
        time = (new Date()).getTime();
        if (myAccount.preferences.updateFrequency > 0 &&
                    time > myAccount.preferences.updateLastCheck +
                    myAccount.preferences.updateFrequency) {
            GM.xmlhttpRequest({
                method: "GET",
        url: "http://userscripts.org/scripts/source/67521.meta.js",
                onload: function (response) {
                    manipulatePrefs("updateLastCheck", time.toString(), "set")
                    if (response.status === 200) {
                        otherVersion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(response.responseText)[1];
                        if (otherVerIsNewerVersion(version, otherVersion)) {
              if (confirm(localString("newVersionAvailable", "NeoBux BR") +
                                    "\n\n" + localString("currentVersion", version) +
                                    "\n" + localString("availableVersion", otherVersion) +
                                    "\n\n" + localString("doYouWishToUpdateTo", otherVersion))) {
                top.location.href = "http://userscripts.org/scripts/source/67521.user.js";
                            }
                        }
                    }
                }
            });
        }
    }

    function ubarPos() {
        var script;
        script = document.createElement("script");
        script.textContent = "try { ubar_pos(0); } catch(e) { }";
        selectNode("//body").appendChild(script);
    }

    function main() {
        checkForUpdates();
        insertScriptVersion();
        insertLogo();
        if (toBool(manipulatePrefs("firstRun", true, "get"))) {
            ubarPos();
            firstRun();
        }
        switch (currentPage.name) {
        case "rentedRefListing":
            if (numberOfRentedReferrals > 0) {
                referralPage();
            }
            break;
        case "directRefListing":
            if (numberOfDirectReferrals > 0) {
                referralPage();
            }
            break;
        case "refStats":
            refStatsPage();
            break;
        }
        ubarPos();
    }

    return function () {
        setTimeout(main, 1000);
    };
}())();