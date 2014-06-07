// ==UserScript==
// @name           Quick plunder/gossip
// @include  http://s2.piratesglory.com/*
// @exclude  http://s2.piratesglory.com/show_char2.php?feed=*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_addStyle
// ==/UserScript==



$("body").append ( '                \
    <div id="gmSomeID">             \
<table  border="2" bordercolor="black" width="142px" cellpadding="5" cellspacing="1";> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=13"> Aiora</a> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=14"> Thorakas</a></td> \
	</tr> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=11"> Tortuga</a></td> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=12"> Tzogoz</a></td> \
	</tr> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=10"> Seaglory</a></td> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=7"> Newland</a></td> \
	</tr> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=1"> Kanoni</a></td> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=2"> Baramas</a></td> \
	</tr> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=3"> St. Martins</a></td> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=4"> Pania</a></td> \
	</tr> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=5"> Regis</a></td> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=9"> Vaasburg</a></td> \
	</tr> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=6"> Goroum</a></td> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=16"> Neapolis</a></td> \
	</tr> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=8"> Hanes</a></td> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=18"> Prote</a></td> \
	</tr> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=17"> Caspian</a></td> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=20"> Psaral</a></td> \
	</tr> \
	<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=15"> Gasp</a></td> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=21"> Akrotiri</a></td> \
	</tr> \
		<tr> \
		<td><a href="http://s2.piratesglory.com/index.php?page=plunder&taction=switch_port&id=19"> Chalkos</a></td> \
		<td><a href="http://s2.piratesglory.com/?page=tavern&action=gossip"> Quick gossip </a></td> \
	</tr> \
</table> \
    </div>                           \
' );


GM_addStyle ( "                         \
    #gmSomeID {                         \
        position:       fixed;          \
		background: url(http://phillipkolbe.com/images/gradient_phillipkolbe.png) center top no-repeat; \
		border-width:1px;  \
		border-style:groove; \
        top:            150px;            \
        left:           0px;            \
    }                                   \
	    #gmSomeID1 {                         \
        position:       fixed;          \
		border-width:1px;  \
		border-style:groove; \
        top:            0px;            \
        left:           0px;            \
    }                                   \
" 
);




function init(){
window.open( "http://s2.piratesglory.com/?page=tavern&action=gossip",'_self' );
}


function KeyCheck(e)
{
    if (e.keyCode == 39) {
init()
       return false;}
}

window.addEventListener('keydown', KeyCheck, true);