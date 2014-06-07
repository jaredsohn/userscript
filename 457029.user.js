// ==UserScript==
// @name       Poloniex Interactive Market Table
// @namespace  http://groff.co
// @version    0.2
// @description  Adds new features such as sorting and searching to the BTC market section
// @match      https://www.poloniex.com/exchange*
// @copyright  2012+, You
// ==/UserScript==

var COIN_LIST = [];

function renderStyles(){
    var style = [
        '<style type="text/css">',
        '.filterContainer{width:32%; float:left; padding:3px;}',
        '.filterContainer input, .filterContainer select{width:90%%;}',
        '#allFilters{height:40px}',
        'span.zeroPAdding{color:#999}',
        '#coinListContainer{max-height:300px; overflow:auto;}',
        '#newCoinList{font-family: arial; color:#333; font-size: 13px; width: 100%;}',
        '#newCoinList th{text-align:left;}',
        'td.increase{color:green;}',
        'td.decrease{color:red;}',
        '</style>'
    ];
    $("body").append(style.join("\n"))
}

function getText(div, number){
    return $.trim($("span:eq("+number+")", div).text());
}

function getName(coin){
    var coins = {};
    
    
    coins.ADN = "Aiden";
    coins.AIR = "AIRcoin";
    coins.APH = "Aphroditecoin";
    coins.AUR = "Auroracoin";
    coins.BC = "BlackCoin";
    coins.BNS = "BonusCoin";
    coins.BONES = "Bones";
    coins.BTC = "Bitcoin";
    coins.BTCS = "Bitcoin-sCrypt";
    coins.C2 = "Coin2";
    coins.CACH = "CACHeCoin";
    coins.CASH = "Cash";
    coins.CGA = "Cryptographic Anomaly";
    coins.CNOTE = "C-Note";
    coins.CON = "Coino";
    coins.CORG = "CorgiCoin";
    coins.DIEM = "CarpeDiemCoin";
    coins.DIME = "Dimecoin";
    coins.DOGE = "Dogecoin";
    coins.DRK = "DarkCoin";
    coins.EAC = "EarthCoin";
    coins.EBT = "EBTcoin";
    coins.ECC = "ECCoin";
    coins.EFL = "Electronic Gulden";
    coins.EMC2 = "Einsteinium";
    coins.EMO = "EmotiCoin";
    coins.eTOK = "eToken";
    coins.EXE = "Execoin";
    coins.FAC = "Faircoin";
    coins.FLAP = "FlappyCoin";
    coins.FLT = "FlutterCoin";
    coins.FOX = "FoxCoin";
    coins.FRK = "Franko";
    coins.FRQ = "FairQuark";
    coins.FZ = "Frozen";
    coins.GLB = "Globe";
    coins.GNS = "GenesisCoin";
    coins.GPUC = "GPU Coin";
    coins.GRC = "Gridcoin";
    coins.GRS = "GroestlCoin";
    coins.H2O = "H2O Coin";
    coins.HIC = "Hirocoin";
    coins.HOT = "Hotcoin";
    coins.HUC = "Huntercoin";
    coins.HVC = "Heavycoin";
    coins.ICN = "iCoin";
    coins.IFC = "Infinitecoin";
    coins.IXC = "iXcoin";
    coins.KDC = "KlondikeCoin";
    coins.LEAF = "Leafcoin";
    coins.LOVE = "LOVEcoin";
    coins.LTC = "Litecoin";
    coins.MAX = "MaxCoin";
    coins.MEC = "Megacoin";
    coins.MEOW = "KittehCoin";
    coins.MINT = "Mintcoin";
    coins.MMC = "MemoryCoin";
    coins.MRC = "microCoin";
    coins.MTS = "Metiscoin";
    coins.MYR = "Myriadcoin";
    coins.MZC = "MazaCoin";
    coins.NMC = "Namecoin";
    coins.NOBL = "NobleCoin";
    coins.NOTE = "DNotes";
    coins.NRS = "NoirShares";
    coins.NXT = "NXT";
    coins.OLY = "OlympicCoin";
    coins.PAND = "PandaCoin";
    coins.PAWN = "Pawncoin";
    coins.PIG = "PiggyCoin";
    coins.PMC = "Premine";
    coins.PPC = "Peercoin";
    coins.PRC = "ProsperCoin";
    coins.PTS = "Protoshares";
    coins.Q2C = "QubitCoin";
    coins.REDD = "Reddcoin";
    coins.RIC = "Riecoin";
    coins.SLR = "SolarCoin";
    coins.SMC = "SmartCoin";
    coins.SOC = "SocialCoin";
    coins.SPA = "Spaincoin";
    coins.SRG = "Surge";
    coins.SUN = "Suncoin";
    coins.SXC = "Sexcoin";
    coins.USDE = "USDE";
    coins.UTC = "UltraCoin";
    coins.VTC = "Vertcoin";
    coins.WDC = "Worldcoin";
    coins.WIKI = "WikiCoin";
    coins.WOLF = "InsanityCoin";
    coins.XBC = "BitcoinPlus";
    coins.XCP = "Counterparty";
    coins.XPM = "Primecoin";
    coins.XSV = "Silicon Valley Coin";
    coins.XXC = "CREDS";
    coins.YACC = "YACCoin";
    coins.YANG = "Yangcoin";
    coins.YIN = "Yincoin"; 
    
    if(coins[coin.symbol] === undefined){
        return "N/A";
    }
    
    return coins[coin.symbol];
}

function getFiltersHtml(){
    var html = "";
    
    html += '<div class="filterContainer">';
    html += '<input type="text" id="searchCoins" placeholder="Search...">';
    html += '</div>';
    
    
    html += '<div class="filterContainer">';
    html += '<select id="filterBy">';
    html += '<option value="name">Sort By: Name</option>';
    html += '<option value="volume">Sort By: Volume</option>';
    html += '<option value="change">Sort By: Change</option>';
    html += '<option value="price">Sort By: Price</option>';
    html += '</select>';
    html += '</div>';
    
    
    html += '<div class="filterContainer">';
    html += '<select id="filterOrder">';
    html += '<option value="desc">Descending</option>';    
    html += '<option value="asc">Ascending</option>';
    html += '</select>';
    html += '</div>';
    
    return html;
}


function bindFilters(){
    $("#searchCoins").keyup(renderCoinList);
    $("#filterBy").change(renderCoinList);
    $("#filterOrder").change(renderCoinList);
}

function getCoinList(){
    var coinList = [];
    
    $("div.market", ".marketsTable:first").each(function(){
        var div = $(this), 
            coin = {},
            change = "",
            vol = "",
            marketInfo = $("#marketInfo"),
            popupHtml = "";
        
        div.trigger("mouseover");
        
        popupHtml = marketInfo.html();
        
        //console.log(popupHtml);
        
        coin.symbol = getText(div, 0);
        coin.price = getText(div, 2);
        
        vol = /Vol:\s*(\d*\.?\d*)/gm.exec(popupHtml) || ["", ""];
        change = /Change:\s*(-?\d*\.?\d*)/gm.exec(popupHtml) || ["", ""];
        
        coin.volume = parseFloat(vol[1]);
        coin.change = parseFloat(change[1]);
        
        coin.isFrozen = false;
        
        if($.trim(coin.price).toLowerCase() === 'frozen'){
            coin.isFrozen = true;
            coin.price = -1;
        }
        
        coin.name = getName(coin);
        
        coin.url = div.parent().attr("href");
        
        coinList.push(coin);
    });
    
    $("#marketInfo").hide();
    
    COIN_LIST = coinList;
    
    return coinList;
}

function sortList(list){
    var property = $("#filterBy").val(),
        order = $("#filterOrder").val(),
        sortFunction = function(a, b) {
            var textA = a.symbol.toUpperCase();
            var textB = b.symbol.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        };
    
    if(property != 'name'){
        sortFunction = function(a,b){
            return b[property]-a[property]
        };
    }
    
    list.sort(sortFunction);
    
    if(order === 'asc'){
        list.reverse();
    }
    return list;
};

function getPreppedCoinList(){
    var newList = [],
        search = $.trim($("#searchCoins").val()).toLowerCase(),
        fullName = "";
    
    
    $.each(COIN_LIST, function(i,coin){
        
        fullName = coin.symbol.toLowerCase() + ' ' + coin.name.toLowerCase();
        
        if(search.length === 0){
            newList.push(coin);
        }
        else {
            if(fullName.indexOf(search) !== -1){
                newList.push(coin);
            }
        }
    });
    
    newList = sortList(newList);
    
    return newList;
}

function displayPrice(coin){
    var price = coin.price;
    
    if(coin.isFrozen){
        return "Frozen";
    }
    
    var list = price.split(".");
    var zerosNeeded = 8 - list[1].length;
    var appendHtml = '';
    if(zerosNeeded > 0) {
        appendHtml = '<span class="zeroPadding">';
        for(var i = 0; i < zerosNeeded; i++){
            appendHtml += '0'
        }
        appendHtml += '</span>';
    }
    
    return list[0] + '.' + list[1] + appendHtml;
    
}

function renderCoinList(){
    var coinList = getPreppedCoinList(),
        changeClass = '',
        coinHtml = '<tr>'
    + '<th colspan="2">Name</th>'
    + '<th>Volume</th>'
    + '<th>Change</th>'
    + '<th>Price</th>'
    + '</tr>';
    
    $.each(coinList, function(i, coin){
        if(coin.change > 0){
            changeClass = "increase";
        }
        if(coin.change < 0){
            changeClass = "decrease";
        }
        
        coinHtml += '<tr>';
        coinHtml += '<td>';
        coinHtml += '<a href="'+coin.url+'">'+coin.symbol+'</a>';
        coinHtml += '</td>';
        coinHtml += '<td>';
        coinHtml += '<a href="'+coin.url+'">'+coin.name+'</a>';
        coinHtml += '</td>';
        coinHtml += '<td>' + coin.volume + ' BTC</td>';
        coinHtml += '<td class="'+changeClass+'">' + coin.change + '%</td>';
        coinHtml += '<td>' + displayPrice(coin) + '</td>';
        coinHtml += '</tr>';
    });
    
    $("#newCoinList").html(coinHtml);
}

function renderNewLayout(){
    var fullHtml = ''
    + '<div id="allFilters">'
    + getFiltersHtml()
    + '</div>'
    
    + '<div id="coinListContainer">'
    
    + '<table id="newCoinList">'
    + '</table>'
    + '</div>';
    
    $(".marketsTable:first").after(fullHtml);
    $(".marketsTable:first").hide();
    
    renderStyles();
    
    renderCoinList();
    
    bindFilters();
    
}

$(function(){
    
    setTimeout(function(){
        getCoinList();
        renderNewLayout();
    }, 800)
    
    setInterval(function(){
        getCoinList();
        renderCoinList();
    }, 75000)
});





