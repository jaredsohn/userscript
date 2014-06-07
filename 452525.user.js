// ==UserScript==
// @name       VELERI Studis - Student revealer
// @namespace  tteskac
// @version    0.1.0
// @description  Skripta koja u studisu prikazuje imena i prezimena studenata uz broj indeksa
// @include        https://www.veleri.hr/studisweb/main.php*
// @copyright  2014+, Tomislav Teskac
// ==/UserScript==

//funkcija koja uzima odabrane čvorove
function getElementsByClassName(classname_, node, tagName)  {
    var tagName=(typeof(tagName) === 'undefined')?"*":tagName;
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var classes = classname_.split(','); 
    
    for(cid in classes) {
    var classname = classes[cid];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName(tagName);
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    }
        
    return a;
}

function run() {

    //lista studenata
    var studenti = [
        
        //REDOVNI
        ['2422041314/13','BARIĆ ANA'],
        ['2422041382/13','ČENGIĆ DANIJEL'],
        ['2422039863/12','DADIĆ VINKO'],
        ['2422041398/13','DOKMANOVIĆ DENI'],
        ['2422041494/13','DUNAJ BRUNO'],
        ['2422039676/12','HAJDIN GORDAN'],
        ['2422041489/13','IVAŠTANIN ALEKSANDAR'],
        ['2422041377/13','JADRO BERTA'],
        ['2422041356/13','JEŠIĆ TAMARA'],
        ['2422041361/13','JURIĆ TATJANA'],
        ['2422037164/11','LEGIN DARKO'],
        ['2422041340/13','MARAVIĆ MILENA'],
        ['2422041452/13','MIŠKULIN TINA'],
        ['2422041335/13','OJDANIĆ BJANKA'],
        ['2422041447/13','PAĆELAT ADRIANA'],
        ['2422041468/13','PAVEŠIĆ LEON'],
        ['2422041309/13','PINTAR VANJA'],
        ['2422039629/12','PLEŠA KRISTIJAN'],
        ['2422041431/13','POŽEGA NIKOLINA'],
        ['2422041473/13','ROGIĆ HRVOJE'],
        ['2422041405/13','SETNIK ALEN'],
        ['2422041291/13','SOČKOVIĆ ADELA'],
        ['2422041426/13','TERZIĆ SABINA'],
        ['2422041410/13','TESKAČ TOMISLAV'],
        
        //IZVANREDNI
        ['2422039996/12','BAČIĆ IVAN'],
        ['2422041634/13','ĆURKOVIĆ ALBERT'],
        ['2422041538/13','DEKARIN KRISTIAN'],
        ['2422041613/13','GAŠPAR TOMISLAV'],
        ['2422041608/13','GLAVAN IVAN'],
        ['2422041725/13','GULIĆ MARKO'],
        ['2422041564/13','HASANI ARMEND'],
        ['2422041681/13','KOVAČIĆ ZVONIMIR'],
        ['2422041676/13','KUČAR SANJIN'],
        ['2422041590/13','MALNAR DOMINIK'],
        ['2422041660/13','MARATOVIĆ DANIEL'],
        ['2422041697/13','MIHELEC KREŠIMIR'],
        ['2422041543/13','MUSTAPIĆ ANTE'],
        ['2422041655/13','MUTAVDŽIJA PETAR'],
        ['2422041559/13','NAGLIĆ GORAN'],
        ['2422041704/13','PERAS TEREZIJA'],
        ['2422041629/13','PROLE PETAR'],
        ['2422039127/12','ROVČANIN LEJLA'],
        ['2422041501/13','SINKOVIĆ MARIO'],
        ['2422041517/13','VRKIĆ MATKO'],
        ['2422041522/13','ŽUPAN LUCIJA']
	];
    
    //ČVOROVI U KOJIMA SE NALAZE BROJEVI INDEKSA    
    var listaCvorova = getElementsByClassName("break_text", null, "span");
    
    
    for(var x = 0; x < listaCvorova.length; x++) {
        var cvor = listaCvorova[x]; 
        
        studenti.forEach(function(stud) {
            if(stud[0]==cvor.innerHTML) cvor.innerHTML = '<span style="color:grey">' + stud[0] + ' - ' + stud[1] + '</span>'; 
        });
        
        //cvor.innerHTML = '<b>' + cvor.innerHTML + '</b>';
        
        //cvor.parentNode.removeChild(cvor);
    }

}


setTimeout(run(), 1000);
//setInterval(run(), 1000);
