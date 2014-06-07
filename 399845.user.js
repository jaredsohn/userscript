// ==UserScript==
// @name        Equideow help mananger
// @namespace   http://www.georgio.fr/
// @description Tool for help to play to Equideow
// @include     http://*.equideow.com/*
// @version     0.3
// @grant       none
// ==/UserScript==

//////////////////////////
// Suppression de pub
var elmPub = document.getElementById( "pub" ) ;
elmPub.parentNode.removeChild( elmPub ) ;
//removeElement("//img[@src='images/nbt_gros_oeil.gif']");
//////////////////////////


////////////////////////////////////////////////////////////
// Calcul des compétences pour les compétitions classiques :
function get_competences()
{
    var endurance = parseFloat( document.getElementById( "enduranceValeur" ).textContent ) ;
    var vitesse   = parseFloat( document.getElementById( "vitesseValeur" ).textContent ) ;
    var dressage  = parseFloat( document.getElementById( "dressageValeur" ).textContent ) ;
    var galop     = parseFloat( document.getElementById( "galopValeur" ).textContent ) ;
    var trot      = parseFloat( document.getElementById( "trotValeur" ).textContent ) ;
    var saut      = parseFloat( document.getElementById( "sautValeur" ).textContent ) ;
    var competences = new Array( endurance, vitesse, dressage, galop, trot, saut ) ;
    return competences ;
}

function calc_classique( id_cheval )
{
    var competences = get_competences() ;

    var e = competences[0] ;
    var v = competences[1] ;
    var d = competences[2] ;
    var g = competences[3] ;
    var t = competences[4] ;
    var s = competences[5] ;

    var Trot     = Math.round( ( t + v + d ) * 100 ) / 100 ;
    var Galop    = Math.round( ( g + v + d ) * 100 ) / 100 ;
    var Dressage = Math.round( ( d + t + g ) * 100 ) / 100 ;
    var Cross    = Math.round( ( e + d + s ) * 100 ) / 100 ;
    var Cso      = Math.round( ( s + d + v ) * 100 ) / 100 ;

    var moyenne  = ( ( Trot + Galop + Dressage + Cross + Cso ) / 5 ) ;
    moyenne = moyenne * 1.10 ;
    var chaine = "" ;
    var chaine_d = "<a href='/elevage/competition/inscription?cheval=" + id_cheval + "&competition=" ;
    var chaine_m = "'><input type='button' value='" ;
    var chaine_f_u = "' style='color:#0000ff;width:75px;font-size:10px;' /></a>" ;
    var chaine_f_d = "' style='color:#ff0000;width:75px;font-size:10px;' /></a>" ;

    if( Trot > moyenne )      { chaine += chaine_d + "trot"     + chaine_m + "Trot\n"     + Trot     + chaine_f_u ; }
    else                      { chaine += chaine_d + "trot"     + chaine_m + "Trot\n"     + Trot     + chaine_f_d ; }
    if( Galop > moyenne )     { chaine += chaine_d + "galop"    + chaine_m + "Galop\n"    + Galop    + chaine_f_u ; }
    else                      { chaine += chaine_d + "galop"    + chaine_m + "Galop\n"    + Galop    + chaine_f_d ; }
    if( Dressage > moyenne )  { chaine += chaine_d + "dressage" + chaine_m + "Dressage\n" + Dressage + chaine_f_u ; }
    else                      { chaine += chaine_d + "dressage" + chaine_m + "Dressage\n" + Dressage + chaine_f_d ; }
    if( Cross > moyenne )     { chaine += chaine_d + "cross"    + chaine_m + "Cross\n"    + Cross    + chaine_f_u ; }
    else                      { chaine += chaine_d + "cross"    + chaine_m + "Cross\n"    + Cross    + chaine_f_d ; }
    if( Cso > moyenne )       { chaine += chaine_d + "cso"      + chaine_m + "Cso\n"      + Cso      + chaine_f_u ; }
    else                      { chaine += chaine_d + "cso"      + chaine_m + "Cso\n"      + Cso      + chaine_f_d ; }

    return chaine ;
}

function calc_western( id_cheval )
{
    var competences = get_competences() ;

    var e = competences[0] ;
    var v = competences[1] ;
    var d = competences[2] ;
    var g = competences[3] ;
    var t = competences[4] ;
    var s = competences[5] ;

    var Barrel_racing    = Math.round( ( v + e + g ) * 100 ) / 100 ;
    var Cutting          = Math.round( ( e + d + v ) * 100 ) / 100 ;
    var Trail_class      = Math.round( ( d + t + s ) * 100 ) / 100 ;
    var Reining          = Math.round( ( g + d + e ) * 100 ) / 100 ;
    var Western_pleasure = Math.round( ( t + e + d ) * 100 ) / 100 ;

    var moyenne  = ( ( Barrel_racing + Cutting + Trail_class + Reining + Western_pleasure ) / 5 ) ;
    moyenne = moyenne * 1.10 ;
    var chaine = "" ;
    var chaine_d = "<a href='/elevage/competition/inscription?cheval=" + id_cheval + "&competition=" ;
    var chaine_m = "'><input type='button' value='" ;
    var chaine_f_u = "' style='color:#0000ff;width:75px;font-size:10px;' /></a>" ;
    var chaine_f_d = "' style='color:#ff0000;width:75px;font-size:10px;' /></a>" ;

    if( Barrel_racing > moyenne )    { chaine += chaine_d + "barrel"          + chaine_m + "Barrel racing\n"    + Barrel_racing    + chaine_f_u ; }
    else                             { chaine += chaine_d + "barrel"          + chaine_m + "Barrel racing\n"    + Barrel_racing    + chaine_f_d ; }
    if( Cutting > moyenne )          { chaine += chaine_d + "cutting"         + chaine_m + "Cutting\n"          + Cutting          + chaine_f_u ; }
    else                             { chaine += chaine_d + "cutting"         + chaine_m + "Cutting\n"          + Cutting          + chaine_f_d ; }
    if( Trail_class > moyenne )      { chaine += chaine_d + "trailClass"      + chaine_m + "Trail class\n"      + Trail_class      + chaine_f_u ; }
    else                             { chaine += chaine_d + "trailClass"      + chaine_m + "Trail class\n"      + Trail_class      + chaine_f_d ; }
    if( Reining > moyenne )          { chaine += chaine_d + "reining"         + chaine_m + "Reining\n"          + Reining          + chaine_f_u ; }
    else                             { chaine += chaine_d + "reining"         + chaine_m + "Reining\n"          + Reining          + chaine_f_d ; }
    if( Western_pleasure > moyenne ) { chaine += chaine_d + "westernPleasure" + chaine_m + "Western pleasure\n" + Western_pleasure + chaine_f_u ; }
    else                             { chaine += chaine_d + "westernPleasure" + chaine_m + "Western pleasure\n" + Western_pleasure + chaine_f_d ; }

    return chaine ;
}
////////////////////////////////////////////////////////////


//////////////////////////
// Page de son cheval
if( window.location.href.match( /http:\/\/(ouranos|gaia)\.equideow\.com\/elevage\/chevaux\/cheval\?id=(.*)($|\&.*)/ ) )
{
    var nom_cheval = document.title ;
    var id_cheval_xpath = '/html/body/div/div/div/div/div/div/div/div/div/div/div/div/h1/a' ;
    var id_cheval = document.evaluate( id_cheval_xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.toString().split('id=')[1] ;
    var comp_cheval_xpath = '/html/body/div/div/div/div/div/div/div/div/table/tbody/tr/td/div/div/div/table/tbody/tr/td/a/span/span' ;
    var comp_cheval = document.evaluate( comp_cheval_xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.textContent ;
    
    var calc_comp = "" ;
    if( comp_cheval == 'Trot' )          { calc_comp = calc_classique( id_cheval ) ; }
    if( comp_cheval == 'Barrel racing' ) { calc_comp = calc_western( id_cheval ) ; }

    var div = document.createElement( "div" ) ;
    div.setAttribute( "style", ";border:1px solid red;background-color:#98C3E5;padding:2px 2px 2px 2px;font-size:10px;" ) ;
    div.innerHTML = "<table><tr><td>" + calc_comp + "</td><td></td><td></td></tr></table>" ;

    document.body.insertBefore(div,document.body.firstChild);
}
