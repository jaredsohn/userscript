// ==UserScript==
// @name        Ikariam Troop 2 GS Converter
// @version     1.0
// @copyright   2010, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Convert type/number of troops to GS
// @include     http://s*.ikariam.*/index.php?view=militaryAdvisor*
// @exclude     http://support.ikariam.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @history 1.0 Basic version with minor updates
// ==/UserScript==

// Allow a user to enter the number of each troop type in form 
// and display the GS produced.

$( document ).ready( function(){
    function log( msg )
    {
        GM_log( msg );
    }

    function roundto( value, decimal )
    {
        return Math.round( value * decimal ) / decimal;
    }
       
    // Score == sum( num_each_resource * 0.02 );
    var hoplite_score  = 1.4;
    var sg_score       = 6.2;
    var sword_score    = 1.2;
    var spear_score    = 0.6;
    var sc_score       = 4;
    var archer_score   = 1.1;
    var slinger_score  = 0.4;
    var mortar_score   = 31;
    var catapult_score = 11.2;
    var ram_score      = 4.4;
    var gc_score       = 2.5;
    var balloon_score  = 20;
    var cook_score     = 4;
    var doctor_score   = 10;

    var pwr_score      = 36.0;
    var fireship_score = 6.2;
    var ramship_score  = 5.4;
    var catship_score  = 6.4;
    var ballista_score = 6.8;
    var mortarship_score = 22.4;
    var dive_score = 18.2;

    var div = "";
    div += "<div id='ikagsc' class='dynamic' style='z-index: 1;'>";
    div += "  <h3 class='header'>GS Converter</h3>";
    div += "  <div class='content'>";
    div += "  <table id='ikagsc_table' width='100%'>";
    div += "    <tr>";
    div += "      <th>Hoplites</th>";
    div += "      <td><input type='text' id='ikagsc_numhop' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Steam Giants</th>";
    div += "      <td><input type='text' id='ikagsc_numsg' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Swordsmen</th>";
    div += "      <td><input type='text' id='ikagsc_numsword' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Spearmen</th>";
    div += "      <td><input type='text' id='ikagsc_numspear' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Sulphur Carabineers</th>";
    div += "      <td><input type='text' id='ikagsc_numsc' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Archers</th>";
    div += "      <td><input type='text' id='ikagsc_numarchers' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Slingers</th>";
    div += "      <td><input type='text' id='ikagsc_numsling' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Mortars</th>";
    div += "      <td><input type='text' id='ikagsc_nummortars' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Catapults</th>";
    div += "      <td><input type='text' id='ikagsc_numcats' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Rams</th>";
    div += "      <td><input type='text' id='ikagsc_numrams' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Gyrocopters</th>";
    div += "      <td><input type='text' id='ikagsc_numgc' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Balloons</th>";
    div += "      <td><input type='text' id='ikagsc_numballoons' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Cooks</th>";
    div += "      <td><input type='text' id='ikagsc_numcooks' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Doctors</th>";
    div += "      <td><input type='text' id='ikagsc_numdocs' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>PWR Ships</th>";
    div += "      <td><input type='text' id='ikagsc_numpwr' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Fire Ships</th>";
    div += "      <td><input type='text' id='ikagsc_numfireships' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Ram Ships</th>";
    div += "      <td><input type='text' id='ikagsc_numramships' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Ballista Ships</th>";
    div += "      <td><input type='text' id='ikagsc_numballista' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Catapult Ships</th>";
    div += "      <td><input type='text' id='ikagsc_numcatship' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Mortar Ships</th>";
    div += "      <td><input type='text' id='ikagsc_nummortarship' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <th>Dive Boats</th>";
    div += "      <td><input type='text' id='ikagsc_numdive' size='5'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <td colspan='2'><input type='button' class='button' id='ikagsc_calc' value='Convert'/></td>";
    div += "    </tr>";
    div += "    <tr>";
    div += "      <td colspan='2' id='ikagsc_gs'></td>";
    div += "    </tr>";
    div += "  </table>";
    div += "  </div>";
    div += "</div>";

    $( div ).insertAfter( "#container2 div.dynamic:last" );

    $( "#ikagsc_calc" ).click( function(){
        var numhop = $( "#ikagsc_numhop" ).val();
        var numsg = $( "#ikagsc_numsg" ).val();
        var numsword = $( "#ikagsc_numsword" ).val();
        var numspear = $( "#ikagsc_numspear" ).val();
        var numsc = $( "#ikagsc_numsc" ).val();
        var numarcher = $( "#ikagsc_numarchers" ).val();
        var numsling = $( "#ikagsc_numsling" ).val();
        var nummortars = $( "#ikagsc_nummortars" ).val();
        var numcats = $( "#ikagsc_numcats" ).val();
        var numrams = $( "#ikagsc_numrams" ).val();
        var numgc = $( "#ikagsc_numgc" ).val();
        var numballoons = $( "#ikagsc_numballoons" ).val();
        var numcooks = $( "#ikagsc_numcooks" ).val();
        var numdocs = $( "#ikagsc_numdocs" ).val();
        var numpwr = $( "#ikagsc_numpwr" ).val();
        var numfire = $( "#ikagsc_numfireships" ).val();
        var numramships = $( "#ikagsc_numramships" ).val();
        var numballista = $( "#ikagsc_numballista" ).val();
        var numcatship = $( "#ikagsc_numcatship" ).val();
        var nummortarships = $( "#ikagsc_nummortarship" ).val();
        var numdive = $( "#ikagsc_numdive" ).val();

        if( numhop == "" ) numhop = 0;
        if( numsg == "" ) numsg = 0;
        if( numsword == "" ) numsword = 0;
        if( numspear == "" ) numspear = 0;
        if( numsc == "" ) numsc = 0;
        if( numarcher == "" ) numarcher = 0;
        if( numsling == "" ) numsling = 0;
        if( nummortars == "" ) nummortars = 0;
        if( numcats == "" ) numcats = 0;
        if( numrams == "" ) numrams = 0;
        if( numgc == "" ) numgc = 0;
        if( numballoons == "" ) numballoons = 0;
        if( numcooks == "" ) numcooks = 0;
        if( numdocs == "" ) numdocs = 0;
        if( numpwr == "" ) numpwr = 0;
        if( numfire == "" ) numfire = 0;
        if( numramships == "" ) numramships = 0;
        if( numballista == "" ) numballista = 0;
        if( numcatship == "" ) numcatship = 0;
        if( nummortarships == "" ) nummortarships = 0;
        if( numdive == "" ) numdive = 0;

        var gs = 0;
        gs += (parseInt(numhop) * hoplite_score);
        gs += (parseInt(numsg) * sg_score);
        gs += (parseInt(numsword) * sword_score);
        gs += (parseInt(numspear) * spear_score);
        gs += (parseInt(numsc) * sc_score);
        gs += (parseInt(numarcher) * archer_score);
        gs += (parseInt(numsling) * slinger_score);
        gs += (parseInt(nummortars) * mortar_score);
        gs += (parseInt(numcats) * catapult_score);
        gs += (parseInt(numrams) * ram_score);
        gs += (parseInt(numgc) * gc_score);
        gs += (parseInt(numballoons) * balloon_score);
        gs += (parseInt(numcooks) * cook_score);
        gs += (parseInt(numdocs) * doctor_score);
        gs += (parseInt(numpwr) * pwr_score);
        gs += (parseInt(numfire) * fireship_score);
        gs += (parseInt(numramships) * ramship_score);
        gs += (parseInt(numballista) * ballista_score);
        gs += (parseInt(numcatship) * catship_score);
        gs += (parseInt(nummortarships) * mortarship_score);
        gs += (parseInt(numdive) * dive_score);

        gs = roundto( gs, 100 );

        $( "#ikagsc_gs" ).html( "General Score is " + gs );
    });
});

