// ==UserScript==
// @name          Travian Crop Calc
// @namespace     http://yannimanni-productions.co.de/
// @copyright     Manuel Mannhardt < manuel_mannhardt@web.de >
// @description   Calculates how long you have corn to feed your troops
// @include       http://*.travian.de/*
// ==/UserScript==

// Fetches the needed informations
var crop = document.getElementById("l4").innerHTML;
var production = document.getElementById("l5").innerHTML;

// Splits the informations
var pieces_crop = crop.split("/");
var pieces_prod = production.split("/");

// crop production
var prod = 0

// empty
var empty = 0;

if(pieces_prod[0] > pieces_prod[1])
{
    prod = pieces_prod[0] - pieces_prod[1];
    time = round_number(pieces_crop[0] / prod, 2) * 3600;
    time = format_time(time);
    
    document.getElementById("l5").style.cssFloat = "left";
    document.getElementById("l5").innerHTML = pieces_prod[0] + "/" + pieces_prod[1] + "<br />Leer: " + time;
}
else
{
    prod = pieces_prod[1] - pieces_prod[0];
    empty = pieces_crop[1] - pieces_crop[0];
    time = round_number(empty / prod, 2) * 3600;   
    time = format_time(time);    
    
    document.getElementById("l5").style.cssFloat = "left";    
    document.getElementById("l5").innerHTML = pieces_prod[0] + "/" + pieces_prod[1] + "<br />Voll: " + time;
}


/**
 * rounds a integer
 *
 * @param integer  number
 * @param integer  decimals
 * @return double
 */
function round_number(num, dec) 
{
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

/**
 * formats the time
 * 
 * @param integer  time in seconds
 * @return string  formated time
 */
function format_time(time) 
{
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = time - (h*3600 + m*60);

    h = Math.round(h);
    m = Math.round(m);
    s = Math.round(s);        

    s = ((s < 10) ? '0' : '') + s;
    m = ((m < 10) ? '0' : '') + m;  

    if(s == '0') 
    {
        s = '00';
    }
  
    if(m == '0') 
    {
        m = '00';
    }

    if(h == '0') 
    {
        h = '00';
    }
  
    return h + ':' + m + ':' + s;
} 