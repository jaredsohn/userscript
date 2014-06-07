// ==UserScript==
// @name            Menù Seafight
// @description     Aggiunge un menù a sinistra nella home per navigare più velocemente e trovare in maniera rapida tutte le funzioni principali.
// @include         http://it1.seafight.bigpoint.com/index.es*
// ==/UserScript==

/*--- Create a button in a container div.  It will be styled and positioned with CSS.
*/
var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">-->  Apri Menù  <--</button>';
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener ("click", ButtonClickAction, false);

function ButtonClickAction (zbutton)
{
    //--- For our dummy action, we'll just add a line of text to the top of the screen.
    var zNode       = document.createElement ('p');
    zNode.innerHTML = '<br><br><a href="javascript:location.reload(true)"><img src="http://i42.tinypic.com/2laeck3.jpg"></a><br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalCabin&subact=Logbook"><img src="http://i42.tinypic.com/352loch.jpg"></a> <br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalShipyard&subact=Repairing"><img src="http://i40.tinypic.com/w8tlbk.jpg"></a> <br> <a href="http://it1.seafight.bigpoint.com/index.es?action=internalMerchant&subact=Arms"><img src="http://i40.tinypic.com/r201ua.jpg"></a><br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalMarketplace&subact=Elite"><img src="http://i44.tinypic.com/ws4w2d.jpg"></a><br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalMarketplace&subact=Event"><img src="http://i41.tinypic.com/z7qqc.jpg"></a><br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalCity&subact=Spy"><img src="http://i43.tinypic.com/2mgmqad.jpg"></a><br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalCity&subact=Tavern"><img src="http://i42.tinypic.com/ejbjw4.jpg"></a><br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalShipyard&subact=Storage"><img src="http://i39.tinypic.com/351cpio.jpg"></a><br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalShipyard&subact=Castle"><img src="http://i42.tinypic.com/2zfs57o.jpg"></a><br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalMerchant&subact=StapleGoods"><img src="http://i39.tinypic.com/15x2cy.jpg"></a><br><a href="http://it1.seafight.bigpoint.com/index.es?action=internalHalloffame"><img src="http://i40.tinypic.com/16beh3c.jpg"></a><br><br><img src="http://i43.tinypic.com/1zna0pg.jpg">';
    document.getElementById ("myContainer").appendChild (zNode);
}

//--- Style our newly added elements using CSS.
GM_addStyle ( (<><![CDATA[
    #myContainer {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              20px;
        background:             #6B2C00;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        font-face:              verdana;
        font-size:              5px;
        color:                  black;
        background:             black;
    }
]]></>).toString () );