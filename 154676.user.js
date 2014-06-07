// ==UserScript==
// @name        animeka_derniers_animes
// @description Liste des derniers animes avec votes, moyennes et genre. Possibilité de trier et d'alimenter la liste.
// @author      turtpaw
// @namespace   http://userscripts.org/scripts/show/154676
// @version     1.3
// @grant		GM_getResourceText
// @grant		GM_addStyle
// @grant		GM_xmlhttpRequest 
// @include     http://www.animeka.com*
// @include     http://www.animeka.org*
// @include     http://animeka.com*
// @include     http://animeka.org*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require     http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js
// @resource	cnewCSS http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/css/jquery.dataTables.css
// ==/UserScript==
var lisLie = document.getElementById("date");
lisLie.innerHTML='[<a href="http://www.animeka.com/animes/derniers_animes.html" class="tooltip1" title="Derniers animes ::\
Générer une liste des derniers animes entrés." style="font-weight:bold;">Derniers animes</a> ]' + lisLie.innerHTML;
if(/\/animes\/derniers_animes\.html/g.test(document.location.href)){
    document.title=('Derniers animes');
    var imgLoa = '<div id = "indLoaA" style="width:300px;padding:1px;background-color:white;border:1px solid black;\
text-align:center"><div id="indLoaB" style="width:0px;background-color:#8AE65C;height:5px"></div></div>';
    var elemT = document.getElementById("rightpanel");
    elemT.innerHTML = '<img id="imgApe" style="position:absolute;z-index:5;left:480px"><div id="monDiv" style="width:820px;margin:5px;">\
<input type="submit" value="Ajouter" id="ajInp" disabled> au tableau les <select size="1" id="ajSel">\
<option value="50">50</option><option value="100">100</option><option value="200">200</option>\
<option value="500">500</option><option value="1000">1000</option></select> animes précédents.<img id="aniImg">\
<div style="height:6px;">'+imgLoa+'</div><table id="maTable" width=796></table>\
<canvas id="myCanvas" width="342" height="32" style="display:none;"></canvas></br>\
</br>(Le total peut être inférieur à la requête car certaines fiches sont manquantes.)</div>';
    $('#maTable').dataTable( {
        "iDisplayLength": -1,
        "sScrollY": "500px",
        "sDom": "frtiS",
        "bDeferRender": true,
        "bAutoWidth": false,
        // "iDisplayLength": 25,
        "aaSorting": [[4,'desc']],
        "aoColumns": [ {"sWidth": "32px", "sContentPadding": "00", "sTitle": "Votes"}, 
                      {"sWidth": "30px", "sContentPadding": "00", "sTitle": "Moye."}, 
                      {"sTitle": "Titre"}, {"bSortable": false, "sWidth": "280px", "sTitle": "Genre"},
                      {"sWidth": "30px", "sTitle": "Id"} ],
        "oLanguage": {"sInfo": "Total : _TOTAL_ animes","sSearch": "Chercher :",
                      "sInfoFiltered": " - sur _MAX_ non filtrés"}
    });
    var newCSS = GM_getResourceText ("cnewCSS");
    var cosCSS = newCSS.replace(/\.\.\//g,"http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/");
    GM_addStyle (cosCSS+"table.dataTable {table-layout: fixed;}table.dataTable th {text-align: center;}\
#maTable_previous, #maTable_next{padding-top: 3px}");
    //document.getElementById("leftpanel").removeChild(document.getElementById("sponsor"));
    var arrDat = new Array(9);
    var nbFor = 25;
    var curAni=0;
    var ajSel = document.getElementById("ajSel");
    document.getElementById("ajInp").onclick=function(){
        nbFor = parseInt(ajSel.options[ajSel.selectedIndex].value);
        document.getElementById("indLoaA").style.display="block";
        document.getElementById("ajInp").disabled = true;
        golgo(curAni);
    };
    
    berserk(0);
}
function berserk(i) {
    if(i>=4){alert("Dernier anime non trouvé.");return;}
    $.get('http://www.animeka.com/index.html', function(data) {
        var doc = document.createElement("div");
        doc.innerHTML = data;
        var derAni = doc.getElementsByClassName("sub")[5].getElementsByClassName("tooltip2")[i].href;
        $.get(derAni, function(data) {
            var doc = document.createElement("div");
            doc.innerHTML = data;
            if (doc.getElementsByClassName("animeslegendimg")[0].href!="undefined"){
                kenshin(/[\d]+/.exec(doc.getElementsByClassName("animeslegendimg")[0].href));  
            } else berserk(i++);
        }); 
    });
}
function kenshin(aniId){
    var ctx = document.getElementById('myCanvas').getContext('2d');
    var img = new Image();
    img.src = "http://www.animeka.com/animes/"+aniId+".png";
    img.addEventListener('load', function() {
        ctx.drawImage(img, 0, 0, 342, 32, 0, 0, 342, 32);
        for (i=0; i<=9; i++){arrDat[i] = ctx.getImageData(110+i*25,12+3,6,4).data;}
        golgo(aniId);
    }, false);
}
function cobra(i){
    var w = i*parseInt(document.getElementById("indLoaA").style.width)/nbFor;
    document.getElementById("indLoaB").style.width=w+"px";
}
function golgo(aniId){
    for (i=0; i<nbFor; i++){ fraggles(aniId-i,i);} 
}
function fraggles(aniId,k){
    var aniLie = "http://www.animeka.com/animes/detail/id_"+aniId+".html";
    var xhr = $.get(aniLie, function(data) {
        var doc = document.createElement("div");
        doc.innerHTML = data; 
        var aniTit = doc.getElementsByClassName("animestitle")[0].textContent;
        if(aniTit=="Aucune anime dans la catégorie.") return;
        //document.getElementById("ajInp").disabled = false;
        aniTit = '<a href="'+aniLie+'" target="_blank" onmouseover="\
var imgApe = document.getElementById(\'imgApe\');\
imgApe.style.display=\'block\';\
imgApe.src=\''+doc.getElementsByClassName("picture")[0].src+'\';\
var event = window.event || event;\
imgApe.style.top  = (event.pageY+1)+\'px\';imgApe.style.left  = (event.pageX+35)+\'px\';\
" onmouseout="document.getElementById(\'imgApe\').style.display=\'none\';">'+aniTit+'</a>';
        var aniGen = doc.getElementsByClassName("animestxt")[7];
        aniGen.removeChild(aniGen.firstChild);
        aniGen.removeChild(aniGen.lastChild);
        for (i=0;i<=aniGen.childNodes.length-1;i++){
            if(aniGen.childNodes[i].nodeType==3)aniGen.childNodes[i].nodeValue=", "; 
            else aniGen.childNodes[i].target="_blank";             
        }
        xhr.abort();//pas certain de l'utilité
        aniGen = aniGen.innerHTML.toLowerCase();
        var ctx = document.getElementById('myCanvas').getContext('2d');
        var img = new Image();
        img.src = "http://www.animeka.com/animes/"+aniId+".png";
        var votCha = "", moyCha = "";
        cobra(k);
        img.addEventListener('load', function() {
            ctx.drawImage(img, 0, 0, 342, 32, 0, 0, 342, 32);
            for (var i=0; i<=4; i++) {
                for (var j=0; j<=9; j++) {
                    if(scryed(ctx.getImageData(64+i*7,8+3,6,4).data, arrDat[j])) votCha += j;
                    if(scryed(ctx.getImageData(65+i*7,23+3,6,4).data, arrDat[j])) moyCha += j;
                }
            }
            if(moyCha.length>1 && moyCha!="10")moyCha=moyCha.slice(0,1)+"."+moyCha.slice(1,moyCha.length);
            if(votCha=="") {if(moyCha=="0") votCha="0"; else votCha="1";}
            //votCha = votCha||"0";
            $('#maTable').dataTable().fnAddData([votCha, moyCha, aniTit, aniGen, aniId],false);
            curAni = aniId;
            if(k>=nbFor-4){//en cas d'arrivée en désordre ou de return
                document.getElementById("indLoaB").style.width="0px";
                document.getElementById("indLoaA").style.display="none";
                document.getElementById("ajInp").disabled = false;
                $('#maTable').dataTable().fnDraw();
            } 
        }, false);
    });
}
function scryed (x, y) {
    for (a=0;a<=x.length;a++) {
        if (x[a]==255 && x[a+1]==0 && y[a]==51 && y[a+1]==51) {a+=3; continue;}
        if (x[a] != y[a]) return false;
    }
    return true;
}