// Current / max bounty script (by Meals?)
// modified to work with all languages by ondy1985
// ==UserScript==
// @name        Travian: current/max Bounty
// @description    Show current/max bounty etc.
// @include        http://*.travian.*/berichte.php?id=*
// ==/UserScript==

var bountyFindPattern = '//tr[@class="cbg1"]/td[@class="s7"]/text()';

var ids = [
['1', 40],            ['21', 30],             ['11', 60],
['2', 20],                ['22', 45],         ['12', 40],
['3', 50],                 ['23', 0],            ['13', 60],
['4', 0],             ['24', 75],    ['14', 0],
['5', 100],    ['25', 35],            ['15', 110],
['6', 70],         ['26', 65],            ['16', 80],
['7', 0],             ['27', 0],                    ['17', 0],
['8', 0],            ['28', 0],         ['18', 0],
['9', 0],                 ['29', 0],            ['19', 0],
['10', 3000],                 ['30', 3000],            ['20', 3000]];

//alert (t[2][0])
 

function getCapacity (unitname){
    var toReturn = 0;
    var reg = /([1-9][0-9]?).gif/i;
    var data = reg.exec(unitname);
    unitname = data[1];
    for (i=0; i<30; i++){
        if (unitname == ids[i][0]){
            toReturn = ids[i][1];
            //alert (t[i][1]);
            break;
        }
    }
//    alert (unitname);
//    alert (t[0][0]);
    return toReturn;
}



var runit = new Array(14);
var runitn = new Array(14);
var nunit = new Array(14);
var nunitn = new Array(14);
var cunit = new Array(14);
var cunitn = new Array(14);
var punit = new Array(14);
var punitn = new Array(14);
var lunit = new Array(14);
var funit = new Array(14);
var res = 0;
var cp = 0;
var offset = 0;

for (c=0;c<10;c++){
    cp = c+2
    offset = c+1
// Get units names from battle report and save them to runitn[c]
    runit[c] = "//table/tbody/tr[4]/td/table[1]/tbody/tr[2]/td["+ cp +"]/img/@src";
    runitn[c] = document.evaluate( runit[c], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
// Get initial units numbers from battle report and save them to nunitn[c]
    nunit[c] = "//table/tbody/tr[4]/td/table[1]/tbody/tr[3]/td["+ cp +"]/text()";
    nunitn[c] = document.evaluate( nunit[c], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
// Get casualties numbers from battle report and save them to cunitn[c]
    cunit[c] = "//table/tbody/tr[4]/td/table[1]/tbody/tr[4]/td["+ cp +"]/text()";
    cunitn[c] = document.evaluate( cunit[c], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}

punit[0] = "//table/tbody/tr[4]/td/table[1]/tbody/tr[5]/td[1]/text()";
punitn[0] = document.evaluate( punit[0], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for (c=1;c<11;c++){
// Get prisoners numbers from battle report and save them to punitn[c]
    cp = c+1
    punit[c] = "//table/tbody/tr[4]/td/table[1]/tbody/tr[5]/td["+ cp +"]/text()";
                //table/tbody/tr[4]/td/table[1]/tbody/tr[5]/td[1]
    punitn[c] = document.evaluate( punit[c], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
// Add losses: casualties + prisoners
    if ( punitn[0].snapshotItem( 0 ).nodeValue == "Prisoners"){
        lunit[c-1] = parseInt(cunitn[c-1].snapshotItem( 0 ).nodeValue) + parseInt(punitn[c].snapshotItem( 0 ).nodeValue);
        } else { lunit[c-1] = cunitn[c-1].snapshotItem( 0 ).nodeValue; }
// Subtract losses from initial number and save result to funit[c]
    funit[c-1] = nunitn[c-1].snapshotItem( 0 ).nodeValue - lunit[c-1];
// Calculate combined capacity and store it to res
    if (nunit[c-1] != 0){ res += funit[c-1] * getCapacity(runitn[c-1].snapshotItem( 0 ).nodeValue);}

}
//alert (runitn[0].snapshotItem( 0 ).nodeValue);


// document.addEventListener doesn't work in Firefox
window.addEventListener( 'load', function( e ) {
            
    var results = document.evaluate( bountyFindPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    //alert( results.snapshotLength );   
    //alert( results.snapshotItem( 0 ).data );
    
    if ( results.snapshotLength === 0 ) {
        return;
    }
 
    var i = 0;
    var bounty_total = 0;
    while (( t = results.snapshotItem( i )) !== null ) {
        //alert( t.data );
        bounty_total += parseInt( t.data );
        i++;
    }
    //alert( bounty_total );
    
    // create presentation
    var bounty_total_div = document.createElement( 'div' );
    bounty_total_div.style.cssFloat = "right";
    bounty_total_div.style.paddingRight = 4;
    bounty_total_div.innerHTML = "total: " + bounty_total.toString();
    
    var firstNumber = results.snapshotItem( 0 );
    
    //Check if the table is 10 or eleven cols long (contains a hero or not)
    var colxpath = "//table/tbody/tr[4]/td/table[1]/tbody/tr[1]/td[2]/@colspan";
    var colspan = document.evaluate( colxpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    //If it does, format it nicely
    if (colspan.snapshotItem(0).nodeValue == "10") {
        firstNumber.parentNode.setAttribute( 'colspan', '7' ); 
    } else { firstNumber.parentNode.setAttribute( 'colspan', '8' ) }
    var btt = document.createElement( 'td' );
    btt.className = "s7";
    btt.setAttribute( 'colspan', '3' );
    
    btt.innerHTML = bounty_total.toString() + "/" + res;
    firstNumber.parentNode.parentNode.appendChild( btt );
    //alert ( btt.innerHTML );
 
    
},false);
