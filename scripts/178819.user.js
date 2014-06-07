// ==UserScript==
// @name        Zeman Block
// @namespace   namespace
// @description Nahrazuje Zemana
// @include     *
// @version     1
// ==/UserScript==    


//Tenhle vyraz odpovida vsem moznym variacim na zemana, vylucuje taky nektery jiny znamy lidi se jmenem zeman
//Vyraz je case sensitive - nefunguje na ZEMAN nebo zeman, pouze Zeman
var dezemanator = /(Milo[šs](?:e|ovi|i|em)?\s+Zeman|(?!Zdeněk\s|Karel\s)Zeman)(a|ovi|e|em)?/g;


//Projede cely dokument a na kazdem TEXT_NODE spusti callback
function recurse(element, callback)
{               
    //Pokud je to text node
    if(element.nodeType == Node.TEXT_NODE) 
        callback(element);
    //Jinak projedeme element 
    else if (element.childNodes.length > 0) {
        for (var i = 0; i < element.childNodes.length; i++)  {
                if(element.childNodes[i].nodeType == Node.TEXT_NODE) 
                   callback(element.childNodes[i]);
                //REKURZE!!!
                else {
                   //if(element.title != null)
                   //    element.title = element.title.replace(dezemanator,randomName);
                   recurse(element.childNodes[i],callback);
                }
        }
    }
}

//nahradi zemana v TEXT_NODE
function repZeman(elm) {
    elm.normalText = elm.data;
    //Random name je dalsi callback - viz nize
    elm.data = elm.data.replace(dezemanator,randomName);
}
//Jmena
var names = [
 ["Lhář",  true,0],
 ["Ožrala",false,2,"Ožral"],
 ["Podvodník",true,1],
 ["Vůl",false,1,"Vol"],
 ["Zloděj",true,0],
 ["Alkoholik",true,1],
 ["Zloděj",true,0],
];
//Tvary
var types = [
    ["e","ovi","i","em"],  //Muž
    ["a","ovi","e","em"],  //Pán
    ["y","ovi","o","ou"],  //Předseda
]
//Vytvori jmeno z nahodnych jmen
/*
    whatever = string, match regexpu "dezemanator"

*/
function randomName(whatever) {
    //console.log(whatever);
    //Vyberem nahodny index
    var name = Math.floor(names.length*Math.random());
    //vybereme koren
    var finalname = names[name][0];
    //Tohle uz nevim na co je
    var state = whatever.match(/Zeman(a|ovi|e|em)/);
    if(state!=null) {
        //console.log(state);
        var pad = pad_pan(state[1]);
        /*1.p jiny nez ostatni? */
        var base = names[name][1]?names[name][0]:names[name][3];
        
        finalname = base + types[names[name][2]][pad];
    }

    
    return finalname;

}
function pad_pan(koncovka) {
    switch(koncovka) {
        case "a"   : return 0;//return 1;
        case "ovi" : return 1;//return 3;
        case "e"   : return 2;//return 6;
        case "em"  : return 3;//return 7;
    }
    console.error("Neznama koncovka: '"+koncovka+"'!");
    return 0;
}
recurse(document.body, repZeman);
document.title =  document.title.replace(dezemanator,randomName);













