// ==UserScript==
// @name          AllyStats
// @author        Fabrice Michellonet
// @version       0.4'
// @namespace     http://mymemoryleaks.blogspot.com/
// @description   Adds graphs in the alliance page for a better evolution analysis
// @include       http://uni*.ogame.*/game/index.php?*page=allianzen*&a=4*
// ==/UserScript==


/* CHANGELOG */
/* V0.1                     :   Initial personal release
   V0.2                     :   First internal (U32 FreeGlad only) version.
   V0.3  [26/09/2008]       :   First official release.
   V0.3' [26/09/2008]       :   Bug fix in calling legacy ogs code.
   V0.4  [14/10/2009]       :   Added multi universe and country support.
                                Added support for chart background.
                                Added link to web site in HTML export.
                                Better chart size.
                                Corrected progression % in HTML export.
*/


/* TODO */
/*
    - Posibilidad de no fijar imagen justa la progresión + o-
    - Progresión total de la alianza.
    - En el momento de exportar el cuadro (tablero) debe poder contener la progresión en punto por nb día del período.
    - Indiquer la date depuis quand on suit l'évolution.
    - Posibilidad de almacenar diferentes puntos de progresión.
*/

var countries = new Object();
countries["com.br"] = 0;
countries["org"] = 1;
countries["com.cn"] = 2;
countries["cz"] = 3;
countries["de"] = 4;
countries["dk"] = 5;
countries["com.es"] = 6;
countries["fr"] = 7;
countries["gr"] = 8;
countries["hu"] = 9;
countries["it"] = 10;
countries["jp"] = 11;
countries["lt"] = 12;
countries["lv"] = 13;
countries["nl"] = 14;
countries["no"] = 15;
countries["pl"] = 16;
countries["com.pt"] = 17;
countries["ro"] = 18;
countries["ru"] = 19;
countries["sk"] = 20;
countries["se"] = 21;
countries["com.tr"] = 22;
countries["tw"] = 23;
countries["us"] = 24;

/* retrieve country and universe */
//var reg = new RegExp("http://uni(\\d+).ogame.(\\w+)");
var reg = new RegExp("http://uni(\\d+).ogame.((com.)*\\w+)");
var matches = reg.exec(document.location);

var uniNumber = matches[1];
var country = countries[matches[2]]; //GetCountryCode(matches[2]);

// Add json library into the page.
var script = document.createElement("script");
script.src = "http://www.json.org/json.js"
document.getElementsByTagName("head")[0].appendChild(script);

// wait for json lib to be loaded.
window.addEventListener("load", function(event) { init(); }, true);

// Player class.
var Player = function() {
Player.prototype.Name;
Player.prototype.Homeworld;
Player.prototype.Points;
}


var oldPlayersRanking = null;
var playersRanking = null;
var JSON = null;

var ress = new Array();
ress["CHART_BG_COLOR"] = 344566;
ress["NEW_MEMBER"] = "Nuevo jugador";
ress["PROGRESS_COLUMN_CAPTION"] = "Progresion";
ress["LOAD_RANKING_TOOLTIP"] = "Cargar una clasificacion anterior";
ress["STORE_CURRENT_TOOLTIP"] = "Utilizar la clasificacion actual como base de calculo para las proximas progresiones.";
ress["EXPORT_TOOLTIP"] = "Exportar en HTML";
// use http://www.codehouse.com/webmaster_tools/html_encoder/ to encode.
ress["PASTE_HERE"] = "Pegar la clasificacion anterior aqui.";
ress["SAVE"] = "Guardar";
ress["CANCEL"] = "Anular"
ress["CLOSE"] = "Cerrarse"
ress["INVALID_DATA"] = "Datos inválidos";
ress["EXPORT_START"] = "[center]"; 
ress["EXPORT_HEADER"] = "<table border='1' style='color:white;text-align:center;'><tr><td>Nro</td><td>Jugador</td><td>Puntos</td><td>Coords</td><td>Progreso</td></tr>"
ress["EXPORT_POSITIVE_PROGRESS"] = "[color=green]";
ress["EXPORT_NEGATIVE_PROGRESS"] = "[color=red]";
ress["EXPORT_END_HEADER"] = "</table><br/><br/><br/>";
ress["EXPORT_BEST_PROGRESS_PERCENT"] = "Mejor progresión en el %: ";
ress["EXPORT_WORSE_PROGRESS_PERCENT"] = "Peor progresión en el %: ";
ress["EXPORT_BEST_PROGRESS_POINT"] = "Mejor progresión en puntos: ";
ress["EXPORT_WORSE_PROGRESS_POINT"] = "Peor progresión en puntos: ";
ress["CONFIRM_SAVE_RANKING"] = "¿ Desea que se utilicese la clasificacion actual como base de calculo para los proximos?";
ress["EXPORT_END"] = "[/center]";

function init() {
    
    JSON = unsafeWindow["JSON"];

    var tmp = GM_getValue("ALLYSTATS_OLD_RANKING");
    //alert(tmp);

    // for the first time execution, we must verify if the variable exist.
    if (tmp != null) {
        tmp = JSON.parse(tmp);
        if(tmp[country] != null && tmp[country][uniNumber] != null)
            oldPlayersRanking = tmp[country][uniNumber];
    }
    
    playersRanking = ParseCurrentPlayers();

    if (oldPlayersRanking == null) {
        tmp = new Array();
        tmp[country] = new Array();
        tmp[country][uniNumber] = playersRanking;
        oldPlayersRanking = playersRanking;
        GM_setValue("ALLYSTATS_OLD_RANKING", JSON.stringify(tmp));
    }

    AddJSonLoader();

    AddExportSection();
        
    ModifyToolbox();

    AddEvolHeader();
        
    AddEvolutionGraph(oldPlayersRanking, playersRanking);

}

/* Parse the OGame ally page to create player object and store them in an array */
function ParseCurrentPlayers() {
    var players = new Array();

    var playerRows = document.evaluate('/html/body/div[4]/center/table/tbody/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 2; i < playerRows.snapshotLength; i++) {
        var playerRow = playerRows.snapshotItem(i);

        var _name = document.evaluate("./th[2]/text()", playerRow, null, XPathResult.STRING_TYPE, null).stringValue;
        var _points = document.evaluate("./th[5]/text()", playerRow, null, XPathResult.STRING_TYPE, null).stringValue.replace(/\./g, "");
        var _coord = document.evaluate("./th[6]/a/text()", playerRow, null, XPathResult.STRING_TYPE, null).stringValue;

        var p = new Player();
        p.Name = _name;
        p.Points = _points;
        p.Homeworld = _coord;

        players.push(p);
    }
    return players;
}

function AddEvolutionGraph(OldPlayersRanking, NewPlayersRanking) {
    var i = 0;
    var j = 0;
    
    for (i = 0; i < NewPlayersRanking.length; i++) {
        var percent;
        var graphValue;
        var graphUrl;

        var found = false;
        for (j = 0; j < OldPlayersRanking.length; j++) {
            if (NewPlayersRanking[i].Homeworld == OldPlayersRanking[j].Homeworld) {
                percent = ((NewPlayersRanking[i].Points - OldPlayersRanking[j].Points) / OldPlayersRanking[j].Points * 100).toFixed(2);
                graphValue = CalculateGomValue(percent);
                graphUrl = BuildGraphUrl(graphValue, percent + "%");
                found = true;
                //return;
            }
        }
        if (found) {
            AddEvolCell(NewPlayersRanking[i].Homeworld, graphUrl);
        }
        else
            AddNewPlayer(NewPlayersRanking[i].Homeworld);
    }

}

function CalculateGomValue(percent) {
    var graphValue;

    if (percent < -3)
        graphValue = 0;

    else if (percent > -3 && percent <= -1) 
        graphValue = 17;

    else if (percent > -1 && percent < 0) 
        graphValue = 34;

    else if (percent == 0)
        graphValue = 50;

    else if (percent > 0 && percent < 1) //{
        graphValue = 67;

    else if(percent >= 1 && percent < 2) //{
        graphValue = 84;

    else if (percent > 2)
        graphValue = 100;
        
    return graphValue;
}

function BuildGraphUrl(graphValue, label) {
    var width;
    var heigth;

    switch (graphValue) {
        case 0: case 17: case 84:case 100:
            width = 115;
            heigth = 39;
            break;
        case 34: case 50:case 67:
            width = 80;
            heigth = 48;
            break;
    }
    
    var url = "http://chart.apis.google.com/chart?chs=" + width + "x" + heigth + "&cht=gom&chd=t:" + graphValue + "&chl=" + label + "&chf=bg,s," + ress["CHART_BG_COLOR"];
    return url;
}

function AddEvolCell(homeWorld, url) {
    var playerCoordCell = document.evaluate("/html/body/div[4]/center/table/tbody/tr/th[6]/a[text()='" + homeWorld + "']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (playerCoordCell.snapshotItem(0).parentNode.parentNode != null) {
        var playerRow = playerCoordCell.snapshotItem(0).parentNode.parentNode;

        var inner = "<img src='" + url + "'/>";
        var cell = ogs_dom_NeuesElement("th", inner);

        playerRow.childNodes[5].parentNode.insertBefore(cell, playerRow.childNodes[5]);
        
    }
}

function AddNewPlayer(homeWorld) {
    var playerCoordCell = document.evaluate("/html/body/div[4]/center/table/tbody/tr/th[6]/a[text()='" + homeWorld + "']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (playerCoordCell.snapshotItem(0).parentNode.parentNode != null) {
        var playerRow = playerCoordCell.snapshotItem(0).parentNode.parentNode;

        var cell = ogs_dom_NeuesElement("th", ress["NEW_MEMBER"]);

        playerRow.childNodes[5].parentNode.insertBefore(cell, playerRow.childNodes[5]);

    }
}

function AddEvolHeader() {
    var tableHeaderResults = document.evaluate("/html/body/div[4]/center/table/tbody/tr[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var tableHeader = tableHeaderResults.snapshotItem(0);
    if (tableHeader != null) {
        var inner = ress["PROGRESS_COLUMN_CAPTION"];
        var cell = ogs_dom_NeuesElement("th", inner);
        tableHeader.insertBefore(cell, tableHeader.childNodes[5]);
    }
}

function ModifyToolbox() {
    var toolboxResults = document.evaluate("/html/body/div[4]/center/table/tbody/tr[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var toolbox = toolboxResults.snapshotItem(0);

    if (toolbox != null) {
        toolbox.childNodes[0].setAttribute("colspan", 8);

        var LoadImg = document.createElement("img");
        LoadImg.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%E0w%3D%F8%00%00%06%C6IDATx%DA%95V%7BPSW%1E%FE%9D%DC%DC%BCnr%F3%80%10%1E%11%82%0F%22q%D7h%B5%40%07g%3A%3Bj%D5%95%9D%CE.%B5H)V%AA%A2%88%BA%9DV%DC%ED%E8lm%A7%AEE%DA%5D%11%17v%17%04eY(%D6%FEQwZ%87%B5e%EA%ABu%B7%15%7C%D4v%C9%CAC%02%24!%04%84%BCsorznfut%D4%19%F7%FC%93L%EE%C9%EF%3B%DF%F7%FB%BE%DF%B9%08%9E%605%D4%FFIL%8BiJD%89%20%1A%8D%C6%B6%94o%E5%9E%E4%7F%C2B%8F%7B%F0%87%F7k%F4%0C%C3Lo%AD%D8%1E9r%F8%8F%FBg%A5%A7%EF%C2%18%C3%F8%F8%F8'%DB*%B6%97%09%7B%EA%8F%1EM%DB%BEc%C7%E8%FF%05%F0%B7%D6%13%12%BF%CF_%99a%CA%D8766%B6%7F%D3%E6-u%CDMM%D5%B9yy%7B%82%C1%20%F4%DF%BAu%AA%A8%B8x%DD_%FF%DC%B06%DBb%E9%B4%DB%ED%B5%08%D0%C1%E2%92%12%DF%13%01%1Cz%EF%60%FD%86%8De%DB%B4Z-%BAt%F1%C2%84%DB%ED%B6%10Yv%E7%E4%E6U%05%FC~40%D0%7F%8A0)%95J%A5%BD%22%8A%9A%AFP(%B0sl%AC%EB%C5%F5%C5k%9E%08%80%E8m%CE%C9%CD%ED%B5Z%17%C9%FD~%1F%FE%EC%D3O%CF%B2%2C%9B%B6%D0%BA%C8%12%08%04%D0%A4gb%D8%E5t%7DcHI%FE%95%D7%EBE%ACJ%15%B3%D9l%2B7%BC%B2%B1%FB%B1%00'Z%9Ai%F7%C4D%93R%A9l%20%FA%5E%3E%DE%D2%5C%F3b%D1%FA%DDb%B1%18%EE%DC%B9%03%82%F6%88%EC%0C%06%82%10%89D%20%16%8B%81%C3%E9%88%17%20r~%BC%B6%A0%E0%85%E3%CD%CD%D92%99l%2Fa%BB%B3%A4%B4t%EA%01%80%BA%23%B5%3BW%AFYSK4%C6%D7%AE%5Em%E7y~z%F9%8A%15%95iiF%ECv%8F%83%C7%E3A%22%91%08%8B)1%22%A08%C2E%84%DF%40%AB%D5%A1%C1%81%81S%E1ph%C4%60H%AE%8CD%C2b%A7%C3yx%FDK%2F%BD~%0F%E0%DDw%DE%D6%98%E7g%DBrrs%12%95J%15%A2(%0A%CF%CCL%83%5E%9F%84%86%86%860%C3(%E2%85B%04%9C%9C%0Eq%3C%8F%05F%12%9A%86%81%C1%01%94%98%A8%C7N%C2%C6%EF%F3!%F2%1C%93%BD%DC%F5k%D7%2C%15%95%95%FDq%80%9AC%D5%22%B9LV%98f4V%2F%7D%FA%E9L%96U%83%20%CD%ED%DBC%90%92%92%0A%1C%C7Ao%CF%95i%8E%E3%CF%CA%E5%F2Hbb%C2J%7D%92A%EF%9D%99%01V%CDB___%7C%0F%C9%09%F9%8C%B8GGG%DF%22u%1B7%96%BD%CA%3F%D0%E4%8E%BF%B7%C9B%A1p%CB%AA%D5%AB%8B%88%1E%40h%23%99L%8E%2F%9C%3Fw%8E8%E5%85%B5%05%BF%F0%08%FB%BE%FE%EA%2B%86%8BrM%A6%8C%CC%22%C2%0A%85%C3a%CCGy%20%3D%FC%DE%15%F0%AC-%7D%BE%F8%F6%03M%AE%AB%3D%5C%A3%D1h%D5%12%89%04t%3A%5D~%F6%02K%B6%DF%1F%20%A7OA%3D%3DW%7C%5C%24%92%B5%F2%B9U%8E%FB%FF%D4%FD%ED%F9B%BD6%A1%F3sW%2Fu%C3s%0B%87%A3%1C%18%95I%E8Y%83uZ4%C9%7D6%DC%3F8%25g%14U%A5E%2F%07%D0%87%1D%ED%8E%24%83%C1%40%E8%03%A3%60%90%E0kD%2C%A3KH%40W%7Bz%FE%F9%B3%E5%CBW%DD_%FC%D2%CD%7F%BF%F1%9F%F0%C8%7B%07%BFm%A3%88%2CHJK%B0%20C4%16C%DE%90%1F%E7%25g%C3%EB%99%85%FC%8D%E1%BE9%AF%16%94%D8%D1G'%3B%1DZ%9D.Y%60%C0(%14%20%93%2B%40%A3V%83T%26%03%12%AA%AE%9C%9C%DC%D5w%8B%7Fq%F3R%C1%00%E7%3C%7D%E0J%2B%D2%2BY%90P%00%7B%97%96%C3%3C%8D%09~%7D%BE%06%3C%A1)%08rQ0H5%F0%FB%9Fl9c%F79%0B%10%89%7C%0D%01PK%25R%D0'%25%E5%EB%F5%FAlF%A9%24%E50%0A%06C%BEI%8F'%8B4%DFq%E1%E6%25%B1F%AD%BB%F1%CB%EE%DF%9AM*%15hi%00F%8C%D1%9B9%FB%F0%3C%8D%196%7F%FE%06%0A%F2%E3x%9AC%E0%08%F2h%9Di%05%5E%225%15%DCk%F2%C9%CE%0Fed%5C%B6X%17%2FZ%8Fc%18%B4%3A-%88D%14%FC%D7f%3BG2P%88%94%C8%FC%AF%C8%8D%8B%E7F%CF%20%15-%01%96%16%83%8C%A2%A1%7Ca%15%98%D4Y%F0%DA%97%BF%01%1A%8D%83%8F%E7a*%8C%81%03%0C%BF%9B_%D5%81Z%8F%B7%88HL%0BSSS%AB%15%0C%93IB%86I%2F%80LO%14%23%BE%16%0B~%EF%EF%9F%A1%C4%D4%D0%99H%87UI%0D%E2%5C%E3.%60h5%C4p%14%CDQga%86V%C25%F7wH%84HFH%E1%D3%FD%9Dh*%D0%8B_%99%FD%BE%0D%D5%1F%AD%D3%FCt%A1%D5%E6%F3y%13%C9%F0%8A7%D9h%9C%15%0F%0Eq%15%16%EE%00bW%81)%FEK%DF%5E%94%20%19%C1E%96F%02%90H%CE%85P%3Cu%82%1D%EF%FB%5E%DBs%00M%06%CE%E3%E7%8D%07F%E3%12%B5%B5%B6%EE%9C3w%CE%11%8A%12%C7H*%DBC%A1%D0t%5E%DE3%953%5E%2F%08%EE%8A%12%DA4a%D2%EDm%03o%B0%0BXI%0AP%22%09i%B2%1AV%CC%DE%03%89%0A%134%5E%AF%06%19%BEI%CE%1F%85Q%DF0%F8%A2r(%9B%7B%E4r%1C%A0%B3%A3%9D%266k%0A%87B%0De%9B6_%3E%F5%D1%C9%9A%0C%93i%B706%D4l%DCQqf%FD%C1%EF%D0i%DB6L%A30%DC%3D%F5%06k%3B%9E%C5.%85%3D_%AEC%AC%E8j%9C%810%1A5%CC%CF%F1sI%9B%DE%7Dh%5C775%9A%E7e%99%7B9%9E%93%AB%94*l%B7%0F%9FU%C8%15i%8B%9Ez%CAB%E6%12j%EB%7B%13%BB%7D%5D%FF%2B%F3h%00%1E%12P%91%B9a%26%10%F0-x%08%E0Xcc%3DIs%85%DF%EF%17%A4%99p9%9D%16Z%22%D9%9D%9F%BFl%8F%92%D83%8C%FC%F0%8F%C1%B7%C0%E5%BBH%E6%0C%86L%ED%B3%20%17%EB%A1%D7%D5%0D%124I%9C%97%00%2Bg%EF%8F%B1%B1%A4%F2%EC%F4%25%C7%1E%02h%3Dq%5CB%86%17%19%D5i%FBF%EC%23%FB7%97%97%D75%1Fk%AA%CE_%B6%AC%8AU%B1%E8J%CF7_%E7%E4%2F%A5%7F%989%BB%E4%BA%EBc%E4%8F8%88%AB%A3%A4%1F*dd%F3p%5E%CA%86%00%1F%8A%BE67%CD%DA%F4%C8%1B%ED%EE%FA%A0%E6%90%9E4xz%FB%8E%9D%F1K%3F%3D%23c%17%B9%0F%60%CC1%FA%C9%82%C5%E6%AD%E9%A6%F4b%85%8C)%09G%03%0B%F8XX%22%13%AB%1C1%1Ewy%C3%9E%FAy%A9%8B%07%1F%7Be%3Ej%11%001%C9%03%25%CC(r%BD%C5**w%DC%7BmqM%DA)%E2NQrB%FA%23_e~%04v%F0%0F%C6!%5Ej%00%00%00%00%00IEND%AEB%60%82";
        LoadImg.addEventListener("click", LoadJSonEventHandler, true);
        LoadImg.style.marginLeft = "5px";
        ogs_addOverLib(LoadImg, "<a class='c'>" + ress["LOAD_RANKING_TOOLTIP"] + "</a>");
        
      
        var StoreImg = document.createElement("img");
        StoreImg.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%E0w%3D%F8%00%00%05%DAIDATx%DA%85V%5Bl%14e%14%3E%FF%CE%EC%CC%CEnw%B6%BB-%BD%D0n%A1E%CAB%05%14%C4%0B%12m%E4A%12y%D1%17x%906Qy2%3E%011%A9%97%07%2F%18%03%3E%19%9F%88%846%24%E2%8B%BE%A0%E1A%0C%18%D4p%0B%17)7%C1v%DB%D2m%BB%D7%D9%CB%CC%CE%F5%F7%FC%FFn%AB%80%95%C9%FE%ED%CCd%E6%7C%E7%7C%E7%FB%CE%3F%04%FE%E7%98%9C%9C%8C%3A%B6%BD%5D%10%C4%AD%A2_%EC%C3%5BK%80R%FC%D1%B4e%D9%A3%8E%EB%9C%14E%F1xwww~%B1%18%E4%BF%03OE%3D%D7%1D%0A%AB%E1%DDr%20%A0%A6%E62dz6C%2B%BA%CE%9E%A7%A1%60%10%DA%5B%9A%A1%7DI%13%D1%2Be%AD%A0i%870%89%FD%2BV%F4%E4%1F%090%3E%3E%DE%1F%0A%85F%E4%80%12%3Fs%E12%5C%1E%BD%0D%98)H%92%04%A2%20%F0g%1C%D7%05%CB%B2%F8%F5%13%7D%AB%60%F3%86uP)%15'K%E5%F2%40%22%918%B5(%402%99%DC%D1%14%8B%0D'Si%E9%87%9F%CF%10A%14%A8%DA%10%02%C9%EF'xP%F6%87U%80%07x%B8l%DB%26%C5R%992%C0%ED%2Fm!%EDM%8D%E6%EC%5Czp%F5%EA%C4%B7%0F%01LLL%F4%C7b%B1%13%D7%EF%26%A5%D3g%2FAS4B%94%40%80%0A%98%A5%E0%F3%11%FCQ%60%00%94w%01%A8%E7%81%EBy%C4q%5CjT%AB%90%CDk%A4%FF%99%0D%F4%B1x%9B5%97%CElK%24V%9DZ%00%98I%CDD%25Y%BA%92.%94%E2'~9%0BK%9A%A2%A0%C82%A7%80%01%F8%7C%3E%5Cd!%1FZk4%02%B8%E0%BA%1E8%8E%03%86iB%3A%9B%83m%2F%3C%07aY%984-%7B%7DOOw%9E%BF1%3D%3D%7D%40%8D4%EE9v%FC'%A2%86%1BhHQ%00%D5AD%A4%A8%06%82%15%90z%05%F3%14y%1C%80W%80%8B%81%90%8AaP%ADT%86%9D%AFl%25%B3%A9%D4%C1%95%BD%2B%F7%91%D9%D9%D9hPQ%C6%FE%B83%A1%26%EF%CD%90XD%A5~%C9%8F%BC%8B%C4%2F%8AH%11f%8FT%08%97.P%B8y%8D%D8%08%E0%25%FA%40xr%13P%84E%FE%A9%8D%15X%B6Cl%CB%A69%AD%08%CB%3A%DA%C8%CA%CE%16M7%8Cn%92J%A5v!%F7%23%3F%FEr%0E%82%81%00(%01%19d%04%C0%ECy%C2%BE%7C%16%A4%FD%1F%82%EF%D6u%F00%FD*%AE%12%D6a%F5%AE%81%C6%A1%8F%40%886!%226%1CA%90%16%60%FD%D0%8D*%BC%BCe%13%A4R%D3%03%24%93N%1F%B1%A9o%E0%E6%D8%24%84C%0Ao%A2%0F%B3%E6%8Aq%1D*%BF%FB%0E%08%B7n%10F%8C%87%F7L%3C)1%10%5C%DE%AA5d%E9%E7_R%F0q%F9%12%17%E9bm*U%0C%92%E8%8ESK%2F%8D%90B%A1p~6W%DCX%AC%18%A06%04%89aZ%9Cc%C2%3Az%EE7*%7F%3CT%3B%AF%03%18u%80Jm%91%D6%0F%3E%A3%EA%D3%9B9%00%3EG%03(%8Eb%B9B0%16%C5f_%24%85%7C~%3C%95%2Bv%99%B6%03!%25%C0%9B%88%CD%82%AAi%11r%F40%0D~%FF%0D0%B2%18%AA%83%00%3A%02%94%F1!%83%D6%00%82%AF%EE%A4%AD%BB%DE%84%80%24%11%14%07%97p%C5%A8%12%D9%2F%D2F%C5%3F%C1*%18O%17%CA%CBt%D3%C2%1E%C8L1h%20%07%0A%A8%06%FB%E8%D7%20%7Cw%0CD%86%8A%CB%AE%F7%A0%8AW%0C%40%C7%F3%C8k%3B%A1%F5%F5%B7%A01%CC%0D%C9%5D%AEWM%08%CA%124%C8B%92h%9Av%5E%AB%98%1B%B3%D8%FD%86%A0B%3C%D4%1F%8A%92K%B3%F8%EBi%9A~%7F%2F%F8%B8%01%B0%02%AC%C4%C6%FF%26%AD%81Xx%9D%F8%E4%20my%FEEn%3A%FE.z%A6%ACWIsc%98%FA%C1%BBHr%B9%DC%11%F0%89%83w%26S%08%10%E0%06%12%05%11%FC%A8%22%11%C3%FE%F9%F6%1BP%19%BD%CA%0D%E6%B29%84%C1%CDz5j%DFZx%EA%AB%C3%FC%1E%CB%DCF%3F0C%22%00%AC%88%B7%83%5E%2C%0C%93%F4%DC%DC%AEH4%3A%7C%F9%C6%5D%3Es0s%CA%24%EA%17%04%82%26%A3%5E!%077%DE%DBC%B4kW%A9%C7%94%82)%B8XP%A4o%1D%AC%FF%F4%0B%22Dc5%A3%B9.A%A9R%AC%84%7Bb%5D%EFr%8Af%1B%24%D9l6%8A3g%2C%95%D3%D4%9CV%22%12%9A%8B%01%60p%04C'%B31%81%96%CA%9D%FB%9D%16%AE%5D%E1%22%88%3C%BE%1Eb%9B%9E%05%0F%8D%E6%A2%D1%1C6.%10%80%99%0E%83CSc%98DC%01%CD%D0%D1h%AC%F4L%26s%A0!%AC%EE%BDz%FB%2F%3E%7F%E6%17k%B8%C0%E7%10.%26B%F2%E0%2C%F2%F8%2Cb3%89%838l6%B9%B0%B6w9%203%07%BB%BA%BA%F6%F17X%158%EF%AFTm7%3E65Cq%F7%02%CC%9C%D3U%0B%5E%9BE%18%FF%BEq%8D%3D%E5%8Du8P%8D%A2%9E%CEv%E4%D1%9Eb%C3%AE%A3ci~a%5C%23b%BF%AA%AA'2ZY%BA7%97%A9Q%E4%AB%03%F8Hm%3F%80%7F%86%5D%1D%84%60%15%9Cwt1%E9hm%A6%91%A0l%E5%F2%F9m%98%FD%A9%FB%F6%03%0E%92N%EFP%C3%E1%E1%92%5E%95%93%D3s%C8%3C%2C%D0C%EA%E9C%DD%13%F3%13%15%2B%E0%F7%97-mA%B3%89f%3E%9F%1F%8C%C7%E3%0Fo8%FF%AE%24%A0(%23%92%24%C7g29%9A%D5J%5C%E3%B5%0A%E6)b%20%94oD%B1H%98%B65GA%AFT%A6t%5D%1F%E8%EC%EC%5C%7C%CB%9C%3FXO0%CC%90%A2(%BB%FD%92%A42%EB%EB%86%C9%B6F%0E%C0%04%10Td%E6%7CbV%ABZ%B9R9%84%5D%DA%DF%DA%D6%FA%E8M%FFA%20%FC%BA%D8.%88%E2V%94l%1F%A6%CE%3F%5B%90%AF4~%CE%8CbSO%E2%FD%E3---%8B~%B6%FC%0D%FB%F4QB%20%10%40%A5%00%00%00%00IEND%AEB%60%82";
        StoreImg.addEventListener("click", StoreEventHandler, true);
        StoreImg.style.marginLeft = "5px";
        ogs_addOverLib(StoreImg, "<a class='c'>" + ress["STORE_CURRENT_TOOLTIP"] + "</a>");

        var ExportImg = document.createElement("img");
        ExportImg.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%E0w%3D%F8%00%00%04GIDATx%DA%95V%CFk%5Ce%14%BD%F7%BDy%F3%E6%F7DAbj%0B%0Am%AD.%ECJ%D3H%2C%0D%98%82%A0%E0N%2B%15%A1k7F%0A%EE%FD%03%5C%B9.%15%5C%E8V(%A2%22.%14%82%11%7F%24%B6%89%26%90%B6%A1IL%3A3If2%F3%E6%FD%FA%3C%F7%BE%99%C9L%92%C2%F4%837%EFc%DE7%F7%DC%7B%CE%B9%F7%0DWk%BB%C6u%D3%C6b%26%2C%F90%A4%1F%86%E386Q%14S%18E%5C%DB%ADo%E5%B3%99Kc%A3O-%D2c%2Cn%B6Z%26%ED8%1A%94%B1%0CV%FF%1E%20%14%84%11%CEy%C6%B2%F8%5E%CA%B6'%CB%A5%E2%83%A1%01Z%9E'%00%8F%3C%20x%A8%80%DA%ED%80%A28%A2%7C.%BB%E0%FB%C1T%B1%90%AF%0C%07%80%CC%1C'e%90%F0%40%05%F2%AC%BB%C7%8D%DB~%60P%05%8F%94%8B%A6%ED%FB%B3%BB%7B%8D%CB'%C7F%1BC%01%A4%D3G)%EA%07h%EC7%19Z%98%3A%EEA%18%9A0%8C%04%F6%D6H%A9%F8)h%23H%A5U%E2L%FD%D9S'%EE%1CK%11'%22%0FP%D3%5D%D5%9D%5D*%15%0A%24%C1%06%CE%C8%15%8B%09%D4%08%B4Wo%04%E0%E1%EA%C9%13%A3_%3FV%05%92y1%9F3%87%9E%F7%CE%CBWb%04%A9%CE%F3%DA~%26%E3%BEY.%16~8%A2%C1%80M%C1%7Bw%2F%14%15%FA%00%FA%AA%ED%01%C2m%EC%07%A1iym%82Nu%DC%A7K%85%FC%AF%C7%BA%A8%B6_%A3%95%8Dez%F9%F4%2BJ%15%00%08%AE%D1g%DF%FF%F5%1DM%9F%BF%7C%AC%DB%00%40%0F%AB%3B4R%12%3A%AD%CDF%B3y%89%F7%9B-%E3%F6QTmT%CC%DC%DDo%A9%E4%3E%CD%2F%9D%BA%A0%8D%E6%B5%DB%BD%0An%CD%DF0c%E5s4qf%8A%C4w%FD%94B%7Cq%18y~%A0%7D%83%1E%5Bc%D8%CDd%A4%93!%20%82%F3%8FK_%1A%CF%3C%20%C7%CEq%2CtXF%A1%11%C6%A0%0D%D8%E2%10w%A6g%CA%E34%F5%E2%5B%2C-%DF%0F%E0%07%01%F9%A2G%10(%5D%5C%A9%ED%A0%82%B4%A9%EE%3F%A4o%E6%3F%E7%BAw%DF%A4R%86l%C7%B0m%13%80%93%1F%C7%02%10J%106Q(%9C%B8%F4%C2%D8%EB%FC%C6%F9w!V%A2_%00%0D%FC0%84%E0%A1%EA%E1%09%C0%E6vE(%A2%ED%FA%26%DD%9C%FD%84j%8D%7B%E48L)%C8%02%00p%99%24hbB'3%85%01%11%92%84%A8L%AF%9E%B9B%EF%8C%7FH%B6e%8B%C8%AA%01%82%93%82%60%AF%00k%1B%5B%B0i%0A%C3%CE%A2%AD%BDu%BE1%3Bcj%8D%BB%94vSJq%C70J%05bp%1CEF%FAl%F2%ECUz%7F%E2%BA%1AK%0E%84%1D%9B%C2%AE%02%C0%A18%AA%0D%80%D5%B5u%B8(%954%1A%AE%ED%BD%0D%FAbn%86%9E%7Br%9C%A6%9F%BFF%D0%81%F2%19%97J%C5%82%22%CD%7Cu%91.%9E%BDB%EF%5D%F8X3%17%8D%C5%08%92%B94%9B%00%E8%1Ew%D5%E0%DF%D5%FB%C6I%1D%CC%22a%A3%D2%F8%8F%16%D6%7F%E1%D7N%BF%AD%D3%B4%98%CB2%1A%C7%D8%B6%C57%7F%FE%CC%7C0%F9Q%D7%9A%18%E9%C6H%60%19%E9%E8h%8C%91%B0W%0Dz%8E%F8%F6%F2*DM)%15%02%D1m%AE%D8%C4%EA%1C%C9%B0%94%CF2%9A%06%82%EB%5BC%93%E9%8C%09%8Ed%A4%CB%A8%C0%1E%200%40%02%A6%00%B0%2C%FF%B9%B8%02%00%5B%82S%FF8%92%C0%B1z%D3P%B9%98'%8C%0A%A5%B1%F3bRwJ%07%20%11%1DvQ2%EC%A8S%8DR%85%B1N%3C7%BF%88%D2%ED%8E%98%07%15%90%94%DF%993O%94%0A%9CG%A3Y%CC%3DQ%0F(%02%04%00dT%E0%7D%01%8A%E2%0E%5D%D2t%00%F8mai%A2CO2%89%A8%07%A1UHu%D9%8C%FBS.%93q%92%F8%D4%07%40%9A%84%E8%14%2BEx%C5b%1Fu%00%7C%3F%A4%C1%F9%FB%88ugy%B5%85%09%99I(%EA%1B%D5%86%94B%A1)J%AAP%9A%A2%1EMC%02%CC%2F%AD%B4%D2%E9%B4k%A9%D5%06%2BHXT%1D%40Q%F2'%01%97%D2%25%8D7%14%C0%EF%7F%FF%D3r%D2%8E%9B0t%14%201C%AC%00*8%F6%814%E4%B0%15%CC%FEq%BB%05-2%87%DFz%87%DD%D6%A5J%AB%88%13G%FD%0F%C5%91%7C%AE%A6f%5B%1A%00%00%00%00IEND%AEB%60%82";
        ExportImg.addEventListener("click", ExportEventHandler, true);
        ExportImg.style.marginLeft = "5px";
        ExportImg.style.marginRight = "5px";
        ogs_addOverLib(ExportImg, "<a class='c'>" + ress["EXPORT_TOOLTIP"] + "</a>");
        
        var cell = document.createElement("td");
        cell.appendChild(LoadImg);
        cell.appendChild(StoreImg);
        cell.appendChild(ExportImg);
        cell.setAttribute("class", "c");
                
        toolbox.appendChild(cell);
    }
}

function AddJSonLoader() {
    var tableHeaderResults = document.evaluate("/html/body/div[4]/center/table/tbody/tr[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var tableHeader = tableHeaderResults.snapshotItem(0);

    if (tableHeader != null) {
        var textArea = ogs_dom_NeuesElement("textarea", "");
        textArea.setAttribute("id", "jsonArea");
        textArea.setAttribute("width", "100%");
        textArea.value = ress["PASTE_HERE"];
        
        var firstCell = ogs_dom_NeuesElement("th", "");
        firstCell.setAttribute("colspan", 9);
        firstCell.appendChild(textArea);

        var saveButton = ogs_dom_NeuesElement("input", "");
        saveButton.setAttribute("type", "submit");
        saveButton.setAttribute("value", ress["SAVE"]);
        saveButton.addEventListener("click", SaveOldPlayerRankingEventHandler, true);
        

        var cancelButton = ogs_dom_NeuesElement("input", "");
        cancelButton.setAttribute("type", "submit");
        cancelButton.setAttribute("value", ress["CANCEL"]);
        cancelButton.setAttribute("onclick", 'document.getElementById("jsonloader").style.display = "none"');

        firstCell.appendChild(saveButton);
        firstCell.appendChild(cancelButton);

        var row = ogs_dom_NeuesElement("tr", "");
        row.setAttribute("id", "jsonloader");
        row.style.display = "none";
        row.appendChild(firstCell);
        
        tableHeader.parentNode.insertBefore(row, tableHeader.parentNode.childNodes[1]);
    }
}

function AddExportSection() {
    var tableHeaderResults = document.evaluate("/html/body/div[4]/center/table/tbody", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var tableHeader = tableHeaderResults.snapshotItem(0);

    if (tableHeader != null) {
        var textArea = ogs_dom_NeuesElement("textarea", "");
        textArea.setAttribute("id", "exportTextArea");
        textArea.setAttribute("width", "100%");

        var firstCell = ogs_dom_NeuesElement("th", "");
        firstCell.setAttribute("colspan", 9);
        firstCell.appendChild(textArea);

        var closeButton = ogs_dom_NeuesElement("input", "");
        closeButton.setAttribute("type", "submit");
        closeButton.setAttribute("value", ress["CLOSE"]);
        closeButton.addEventListener("click", CloseExportEventHandler, true);

        firstCell.appendChild(closeButton);

        var row = ogs_dom_NeuesElement("tr", "");
        row.setAttribute("id", "exportSection");
        row.style.display = "none";
        row.appendChild(firstCell);

        tableHeader.insertBefore(row, tableHeader.lastChild);
    }
}

/* Handle the click on the import img */
function LoadJSonEventHandler(){
    document.getElementById("jsonloader").style.display = "";
}

/* Handle the save button click */
function SaveOldPlayerRankingEventHandler() {
    try {
        var tmp = JSON.parse(GM_getValue("ALLYSTATS_OLD_RANKING"));
        tmp[country][uniNumber] = JSON.parse(document.getElementById("jsonArea").value);
        GM_setValue("ALLYSTATS_OLD_RANKING", JSON.stringify(tmp));
    }
    catch (Err) {
        alert(ress["INVALID_DATA"]);
    }
    document.getElementById("jsonloader").style.display = "none";
    document.location = document.location + "&b";
}

/* Handle the click on the Export img */
function ExportEventHandler() {
    var str = ress["EXPORT_START"];

    str += ress["EXPORT_HEADER"];

    var bestPercent = -100;
    var worsePercent = 100;
    var bestPoint = -1000000000;  
    var worsePoint = 1000000000;

    var bestPercentName;
    var bestPointName; 
    var worsePercentName;
    var worsePointName;    
    
    for (i = 0; i < playersRanking.length; i++) {
        
        var found = false;
        
        for (j = 0; j < oldPlayersRanking.length; j++) {
            if (playersRanking[i].Homeworld == oldPlayersRanking[j].Homeworld) {

                var progressionPercent = ((playersRanking[i].Points - oldPlayersRanking[j].Points) / oldPlayersRanking[j].Points * 100).toFixed(2);
                alert(playersRanking[i].Name + " = " + progressionPercent);
                
                var progressionPoint = (playersRanking[i].Points - oldPlayersRanking[j].Points);

                if (progressionPercent > bestPercent) {
                    bestPercent = progressionPercent;
                    bestPercentName = playersRanking[i].Name;
                }

                if (progressionPoint > bestPoint) {
                    bestPoint = progressionPoint;
                    bestPointName = playersRanking[i].Name;
                }

                if (progressionPercent < worsePercent) {
                    worsePercent = progressionPercent;
                    worsePercentName = playersRanking[i].Name;
                }

                if (progressionPoint < worsePoint) {
                    worsePoint = progressionPoint;
                    worsePointName = playersRanking[i].Name;
                }

                var progressionColorOpenTag = progressionPoint > 0 ? ress["EXPORT_POSITIVE_PROGRESS"] : progressionPoint == 0 ? "" : ress["EXPORT_NEGATIVE_PROGRESS"];
                var progressionColorCloseTag = progressionPoint == 0 ? "" : "[/color]";

                str += "<tr><td>" + parseInt(i + 1)
                + "</td><td>" + playersRanking[i].Name
                + "</td><td>" + addSeparators(playersRanking[i].Points)
                + "</td><td>" + playersRanking[i].Homeworld
                + "</td><td>" + progressionColorOpenTag + progressionPercent + "%  " + "(" + addSeparators(progressionPoint) + ")" + progressionColorCloseTag
                + "</td></tr>";
                
                found = true;
            }

        }
        if (!found) { 
            str += "<tr><td>" + parseInt(i + 1)
            + "</td><td>" + playersRanking[i].Name
            + "</td><td>" + addSeparators(playersRanking[i].Points)
            + "</td><td>" + playersRanking[i].Homeworld
            + "</td><td>" + ress["NEW_MEMBER"]
            + "</td></tr>";
        }
    }
    str += ress["EXPORT_END_HEADER"];

    str += ress["EXPORT_BEST_PROGRESS_PERCENT"] + bestPercentName;

    str += "<br/>";
    str += ress["EXPORT_WORSE_PROGRESS_PERCENT"] + worsePercentName;
    
    str += "<br/>"
    str += ress["EXPORT_BEST_PROGRESS_POINT"] + bestPointName;
    
    str += "<br/>";
    str += ress["EXPORT_WORSE_PROGRESS_POINT"] + worsePointName;

    str += "<br/>";
    str += "<br/>";

    str += ress["EXPORT_END"];
    
    document.getElementById("exportTextArea").value = str;
    document.getElementById("exportSection").style.display = "";
}

function StoreEventHandler() {
    if (confirm(ress["CONFIRM_SAVE_RANKING"])) {
        oldPlayersRanking = playersRanking;

        var tmp = GM_getValue("ALLYSTATS_OLD_RANKING");
        tmp[country][uniNumber] = playersRanking;
        GM_setValue("ALLYSTATS_OLD_RANKING", JSON.stringify(tmp));
        document.location = document.location + "&b";
    }
}

function CloseExportEventHandler() {
    document.getElementById("exportSection").style.display = "none";
}


/* Format scores with dot (.) separators */
function addSeparators(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

// OGS //

/* Copied from OGame Skript */
function ogs_dom_NeuesElement(Tag, Inhalt) {
    var Neu = document.createElement(Tag); // erste Zelle (Titel)

    if (Inhalt.indexOf('<') + 1 || Inhalt.indexOf('&') + 1) // falls Tags oder &;-Umschreibungen im Text sind
    {
        Neu.innerHTML = Inhalt; // Text als HTML-Code
    }
    else {
        if (Inhalt.length > 0) // ansonsten, und falls es ueberhaupt einen Text gibt
        {
            Neu.appendChild(document.createTextNode(Inhalt)); // Text als Attribut
        }
    }

    if (ogs_dom_NeuesElement.arguments.length > 2) // weitere Argumente der Funktion
    {
        for (var i = 2; i < ogs_dom_NeuesElement.arguments.length - 1; i += 2) // alle diese Argumente
        {
            if (!ogs_dom_NeuesElement.arguments[i + 1].length) { continue; }
            Neu.setAttribute(ogs_dom_NeuesElement.arguments[i], ogs_dom_NeuesElement.arguments[i + 1]); // dem Tag zuweisen
        }
    }

    return Neu; // zurueckgeben
}

/* Copied from OGame Skript */
function ogs_addOverLib(obj, code) {
    ogs_addEvent(obj, 'mouseout', unsafeWindow.nd, true);
    ogs_addEvent(obj, 'mouseover', eval('new Function(\'\',\"unsafeWindow.overlib(\\\"' + code + '\\\");\")'), true);
}

function ogs_addEvent(obj, type, func, cap) {
    if (obj.addEventListener) {
        obj.addEventListener(type, func, cap);
    }
    else if (obj.attachEvent) {
        obj.attachEvent('on' + type, func);
    }
}