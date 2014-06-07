// ==UserScript==
// @name          	Ody+ version 1
// @description 		A modified and enhanced Devo+ script for us to own DEVO!!!
// @version       	2.3
// @date        		2007-10-28
// @include		http://ev5.playevo.com/*
// @include		http://beta.ev5.playevo.com/*
// @author		Odysseus1
// ==/UserScript==
// 
//Change Log:
//	-2.3
//		-added recall decoys button
//		-updated highlighers
//	-2.2.3
//		-fixed post-launch ETA grabbing
//		-added "you have x unread messages" to cce-grid
//	-2.2.2
//		-fixed two-decoy launchlinks
//		-fixed post-launch data boxes
//		-updated highlighters
//	-2.2.1
//		-updated highlighters
//		-added att/def, ETA, and creature counts to post-launch info screen in the CCE-Grid
//		-added "you have x unread news items" box to CCE-Grid
//	- 2.2
//		-updated highlighters
//		-changed link names on left side-bar
//		-news display in launchgrid after launch
//		-javascript consolidated onto the local machine
//		-automatic generation of a ".cce launched" line after launching
//		-Flawless Updating (no more "uninstall to reinstall" BS)
//		-Fixed decoy-count checking
//		-Clarified code
//		-Minor javascript error has been squashed
//	- 2.1.1a
//		-updated highlighters
//		-updated side-bar links
//	- 2.1.1
//		-fixed problem with automatic fleet assignment 
//			only looking at the first number of the att^2
//	- 2.1.0
//		-rebuilt launchgrid code
//		-added ETA checking
//		-added automatic fleet assignment
//		-updated external links and name highlighters
//	- 2.0a
//		-updated external links
//	- 2.0
//		-added launchgrid/launchlink
//		-added modified external links
//		-updated name highlighters
//
// ***************************************************************************
// ** Global Variables
// ***************************************************************************														//NINJ4 will return once CCE+ 3.0 is complete!  FOR GREAT JUSTiCE

const scriptversion = '2.3 FINAL';
const scriptversionID = 'CCE+ ' + scriptversion;
const scriptTag = 'XXIII ';
GM_log(scriptversionID + " start");


// safegard
if(! unsafeWindow.evo_plus ) {
	alert("Improper installation. Please uninstall evo+ AND CCE+, then install:\n- evo+\n- CCE+\nIn that order.");
	return;
}

// page handlers
var pageHandlers = new Array();

var contents = null; // pointer to the 'content' node in the page

// imported vars
var units = unsafeWindow.evo_plus.units; // units :P
var pMetal = unsafeWindow.evo_plus.pMetal;
var pMineral = unsafeWindow.evo_plus.pMineral;
var pFood = unsafeWindow.evo_plus.pFood;
var pScore = unsafeWindow.evo_plus.pScore;
var eeb = Number(GM_getValue('eeb', 1)); // efficient breeding center ratio

// constants
var FOODCOST = 91;

// evo, devo?
var dEvo = /^http:\/\/evo-dev\./.test(document.location.href);

//
// ***************************************************************************
// ** Page handlers
// ***************************************************************************


const boostally = boostally;



(function() {  

contents = document.getElementById("content");
if( contents == null ) return;
var words = new Array();
var bgColors = new Array();
var fgColors = new Array();

/* Add your own "words" to this "list", in the same format.  The next word would be 
 * words[2] = "some word or phrase" 
 * add more colors, too
 * if there is no color corresponding to the word (no bgColors[4] for words[4]) the first (bgColors[0]) will be used
 * The words are should be written in all caps, but the word matching is not case sensitive */
 

words[0] = "[Tas"; 
//bgColors[0] = "blue";
fgColors[0] = "red";

words[1] = "[J4N]";
//bgColors[1] = "yellow";
fgColors[1] = "brown";


words[2] = "[TaS]";
//bgColors[2] = "blue";
fgColors[2] = "red";

// Leaders
words[3] = "ODYSSEUS1";
bgColors[3] = "blue";
fgColors[3] = "black";

words[4] = "Reincarnation";
bgColors[4]= "lightblue";
fgColors[4] = "Black";

//Officer Corps

words[7] = "INCOGNITO";
bgColors[7] = "White";
fgColors[7] = "Black";

words[8] = "THE1STVOICE";
bgColors[8] = "White";
fgColors[8] = "Red";

// Rebel Guard

words[11] = "ACHILLES1";
bgColors[11] = "Red";
fgColors[11] = "Black";

words[12] = "GEARJAMMER";
bgColors[12] = "White";
fgColors[12] = "Black";

words[13] = "MURF";
bgColors[13] = "White";
fgColors[13] = "Black";

words[14] = "KING STRATOS";
bgColors[14] = "White";
fgColors[14] = "Black";

words[15] = "PIPES6969";
bgColors[15] = "White";
fgColors[15] = "Black";

//Homeland Security
words[20] = "KING WOLF";
bgColors[20] = "White";
fgColors[20] = "Green";

//words[18] = "DRAGONIS";
//bgColors[18] = "White";
//fgColors[18] = "Green";

words[16] = "SKIPPER";
bgColors[16] = "White";
fgColors[16] = "Green";

words[10] = "PANGRA";
bgColors[10] = "White";
fgColors[10] = "Green";

//Logistics
words[9] = "NINJ4";
bgColors[9] = "White";
fgColors[9] = "Red";

words[6] = "BLUEGYPSY";
bgColors[6] = "White";
fgColors[6] = "Red";

//generals
words[21] = "DOOMBASHAR";
bgColors[21] = "White";
fgColors[21] = "Blue";

words[17] = "LEOJ";
bgColors[17] = "White";
fgColors[17] = "Blue";

words[5] = "ELFSTONE";
bgColors[5] = "White";
fgColors[5] = "Blue";

//lulz
words[19] = "[DAMN]";
//bgColors[19] = "White";
fgColors[19] = "pink";





 for(var i = 0; i < words.length; i++) { 
  var xpath = "//a[contains(translate(.,'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'"+words[i]+"')]";
  var results = document.evaluate(xpath, document, null, XPathResult.UNORDERED_SNAPSHOT_TYPE, null);
  var items = new Array();
  var thisItem = results.iterateNext();
  while(thisItem) { items.push(thisItem); thisItem = results.iterateNext(); }

  for(var ii = 0; ii < items.length; ii++) {  
   items[ii].style.backgroundColor = bgColors[i]?bgColors[i]:bgColors[0];
   items[ii].style.color = fgColors[i]?fgColors[i]:fgColors[0];
  }  
 }

})()



//we need this for 2.0 shit



function do_platypus_script() {

	html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[4]/DIV[2]/UL[1]/LI[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<li><a href="http://www.ccofevo.com/" target="_blank">Off-Site Forum</a></li><li><a href="http://ev5.neondragon.net/_/600770-Confederated-Continents-Of-Evolution">On-Site Forum</a></li>',true,false);

	html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[3]/DIV[2]/UL[1]/LI[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'				<li><a href="/fleets?cce=t">CCE-Grid</a></li>				<li><a href="/fleets?makeurl=t">Make LaunchLink</a></li>				<li><a href="http://www.ccofevo.com/toolz/Launch_Grid.htm" target="_top">LaunchGrid</a></li>',true,false);
	
	
//<script type="text/javascript">loadAccordion('navpanelcontent','navpanelheader',2);</script>



	/*///test scans page lawl  << This is teh b0rk3d >
	var isscans = ( xpath( "id('content')/h1[contains(.,'Scans')]",document,true ) == null ) ? 'Error' : xpath( "id('content')/h1[contains(.,'Scans')]",document,true);
	if ( isscans != 'Error' ) {
		if ( xpath( "id('content')/form/div",document,true ) != null ) {
			node = xpath( "id('content')/form/div",document,true );
			temp = node.innerHTML;
			if ( temp.indexOf( '<input name="launch_scan" value="Launch" type="submit">' ) > 0 ) {
				//take out the "launch scans" button, then put it at the bottom.
				var cutindex = temp.indexOf( '<input name="launch_scan" value="Launch" type="submit">' );
				var beginning = temp.substring( 0,cutindex );
				var theend = temp.substring( cutindex + 55 );
				temp = beginning + theend;
				//do the same thing with "All scans except..."
				cutindex = temp.indexOf( 'All scans except the Land' );
				beginning = temp.substring( 0,cutindex );
				temp = beginning;
			}
			var jsadd = '<script type="text/javascript">'
						+	'scangrid = "";'
						+ 'function makeScanVar() {'
						+ '	var temp = document.evaluate( "id(\'content\')/form/div", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;'
						+ '	temp = temp.innerHTML;'
						+ '	if ( temp.indexOf( \'<input name="launch_scan" value="Launch" type="submit">\' ) > 0 ) {'
						+ '		var cutindex = temp.indexOf( \'<input name="launch_scan" value="Launch" type="submit">\' );'
						+ '		var beginning = temp.substring( 0,cutindex );'
						+ '		var theend = temp.substring( cutindex + 55 );'
						+ '		temp = beginning + theend;'
						+ '		cutindex = temp.indexOf( \'All scans except the Land\' );'
						+ '		beginning = temp.substring( 0,cutindex );'
						+ '		temp = beginning;'
						+ '	}'
						+	'	scangrid = temp;'
						+	'}'
						+ 'function addScan() {'
						+ '	if ( scangrid == "" ) makeScanVar();'
						+ '	document.getElementById( "addscans" ).innerHTML += \'<div align="center">\' + scangrid + \'</div>\';'
						+ '}'
						+ '</script>';
			html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,jsadd,true,false);
			node.innerHTML = '<div align="center">' + temp + '</div><span id="addscans"></a>';
			node.innerHTML += 'All scans except the Land Scan require a target continent to be specified.<br />'
			node.innerHTML += '<input value="Scan Another" type="button" onclick="addScan();"><p><input name="launch_scan" value="Launch" type="submit"></p>';
		}
	}//*/
	
	//add a "recall decoys" button.
	var isfleets = ( xpath( "id('content')/h1[contains(.,'Fleet Organisation')]",document,true ) == null ) ? 'Error' : xpath( "id('content')/h1[contains(.,'Fleet Organisation')]",document,true );
	if ( ( isfleets != 'Error' ) && ( gup( 'makeurl' ) == "" ) && ( gup( 'cce' ) == "" ) ) {
		var attfinder = "";
		var locatatt = "";
		var i=0;
		while ( attfinder.indexOf( "Attack" ) < 0 ) {
			i++
			locatatt = "id('content')/table[1]/tbody/tr[" + i + "]/td[1]"
			node = document.evaluate(locatatt, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			attfinder = node.innerHTML;
		}
		locatatt = "id('content')/table[1]/tbody/tr[" + i + "]/td[";
		
		//grab our fleet atts and defs for auto detecting and exporting
		var att1, att2, att3;
		var node = document.evaluate(locatatt + "2]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		att1 = node.innerHTML;
		node = document.evaluate(locatatt + "3]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		att2 = node.innerHTML;
		node = document.evaluate(locatatt + "4]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		att3 = node.innerHTML;
		
		att1 = Number ( ( ( att1.replace( "," , "" ) ).replace( "," , "" ) ).replace( "," , "" ) );
		att2 = Number ( ( ( att2.replace( "," , "" ) ).replace( "," , "" ) ).replace( "," , "" ) );
		att3 = Number ( ( ( att3.replace( "," , "" ) ).replace( "," , "" ) ).replace( "," , "" ) );
		
		var mainfleet = ( att1 > att2 ) ? ( ( att1 > att3 ) ? 1 : 3 ) : ( ( att2 > att3 ) ? 2 : 3 );
		node = xpath( "id('content')/table[2]/tbody/tr[1]/td[6]",document,true );
		var temp = '<form name="launchform" method="post"><input value="Recall Decoys" style="color: rgb(0, 0, 255);" type="submit"><a href="##" onclick="alert(\'This recalls all fleets except your main fleet (The fleet with the most att^2)\');">?</span>';
		if ( mainfleet != 1 ) temp += '<input type="hidden" name="f_return[1]">';
		if ( mainfleet != 2 ) temp += '<input type="hidden" name="f_return[2]">';
		if ( mainfleet != 3 ) temp += '<input type="hidden" name="f_return[3]">';
		temp += '</form>';
		node.innerHTML = temp;
	}
	

		
	//fleets page h4x -NIN
	if ( !gup( 'makeurl' ) == "" ) {
		document.title = 'evolution :: CCE LaunchLink Creator';
		
		var temp = "";
		
		temp = 
			"<script type=\"text/javascript\">"
		+	"function makeURL() {"
		+	"	var rtd = document.getElementById( 'fleetx1' ).value;"
		+	"	var rtg = document.getElementById( 'fleety1' ).value;"
		+	"	var rtp = document.getElementById( 'fleetz1' ).value;"
		+	"	var rtc = document.getElementById( 'fleetc1' ).value;"
			
		+	"	var d1d = document.getElementById( 'fleetx2' ).value;"
		+	"	var d1g = document.getElementById( 'fleety2' ).value;" 
		+	"	var d1p = document.getElementById( 'fleetz2' ).value;" 
		+	"	var d1c = document.getElementById( 'fleetc2' ).value;"
			
		+	"	var d2d = document.getElementById( 'fleetx3' ).value;" 
		+	"	var d2g = document.getElementById( 'fleety3' ).value;" 
		+	"	var d2p = document.getElementById( 'fleetz3' ).value;" 
		+	"	var d2c = document.getElementById( 'fleetc3' ).value;"
		
		+	"	var tick = document.getElementById( 'fleettick' ).value;"
		
		+	"	var finalurl = \"http://ev5.neondragon.net/fleets?cce=t&at=\" + tick;"
		
		+	"	if ( ( rtd != \"\" ) && ( rtd != null ) )"
		+	"		finalurl += \"&rtd=\" + rtd + \"&rtg=\" + rtg + \"&rtp=\" + rtp + \"&rtc=\" + rtc;"
		
		+	"	if ( ( d1d != \"\" ) && ( d1d != null ) )"
		+	"		finalurl += \"&d1d=\" + d1d + \"&d1g=\" + d1g + \"&d1p=\" + d1p + \"&d1c=\" + d1c;"
		
		+	"	if ( ( d2d != \"\" ) && ( d2d != null ) )"
		+	"		finalurl += \"&d2d=\" + d2d + \"&d2g=\" + d2g + \"&d2p=\" + d2p + \"&d2c=\" + d2c;"
		
		+	"	document.getElementById( 'finalurl' ).innerHTML = \"<a href=\\\"\" + finalurl + \"\\\" target=\\\"_blank\\\">\" + finalurl + \"</a>\"; "
		+	"}"
		+	"</script>";
		html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,temp,true,false);
		
		
		document.getElementById( 'content' ).innerHTML = "<table border=\"0\" cellspacing=\"1\" cellpadding=\"0\" width=\"100%\" class=\"t_little b\"><tbody><tr><td class=\"alt1\">Heading</td></tr><tr class=\"red_bg row1\"><span id=\"primary\"></span></tr><tr class=\"yellow_bg row1\"><span id=\"decoy1\"></span></tr><tr class=\"green_bg row1\"><span id=\"decoy2\"></span></tr></tbody></table>Arrival Tick: <input id=\"fleettick\" size=\"4\" maxlength=\"5\" type=\"text\">(i.e. if ETA 8 launches at 1234, arrival tick would be 1242)<br /><br /><input type=\"submit\" onclick=\"makeURL();\" value=\"Create URL\"><br /><br /><br />This launch\'s URL is: <span id=\"finalurl\"></span>";
		
		document.getElementById( 'primary' ).innerHTML = "<td>Primary Fleet</td><td>(<input size=\"2\" maxlength=\"3\" name=\"f_x[1]\" id=\"fleetx1\" type=\"text\">,<input size=\"2\" maxlength=\"2\" name=\"f_y[1]\" id=\"fleety1\" type=\"text\">,<input size=\"2\" maxlength=\"2\" name=\"f_z[1]\" id=\"fleetz1\" type=\"text\">:<input id=\"fleetc1\" size=\"1\" maxlength=\"1\" name=\"f_c[1]\" type=\"text\">)</td>";
		
		document.getElementById( 'decoy1' ).innerHTML = "<td>Decoy Fleet 1</td><td>(<input size=\"2\" maxlength=\"3\" name=\"f_x[2]\" id=\"fleetx2\" type=\"text\">,<input size=\"2\" maxlength=\"2\" name=\"f_y[2]\" id=\"fleety2\" type=\"text\">,<input size=\"2\" maxlength=\"2\" name=\"f_z[2]\" id=\"fleetz2\" type=\"text\">:<input id=\"fleetc2\" size=\"1\" maxlength=\"1\" name=\"f_c[2]\" type=\"text\">)</td>";
		
		document.getElementById( 'decoy2' ).innerHTML = "<td>Decoy Fleet 2</td><td>(<input size=\"2\" maxlength=\"3\" name=\"f_x[3]\" id=\"fleetx3\" type=\"text\">,<input size=\"2\" maxlength=\"2\" name=\"f_y[3]\" id=\"fleety3\" type=\"text\">,<input size=\"2\" maxlength=\"2\" name=\"f_z[3]\" id=\"fleetz3\" type=\"text\">:<input id=\"fleetc3\" size=\"1\" maxlength=\"1\" name=\"f_c[3]\" type=\"text\">)</td>";

	}
	if ( !gup( 'cce' ) == "" ) {
		document.title = 'evolution :: CCE LaunchGrid';
		
		
		
		//launchgrid parameters
		var rtd_param = gup( 'rtd' );
		var d1d_param = gup( 'd1d' );
		var d2d_param = gup( 'd2d' );
		var rtg_param = gup( 'rtg' );
		var d1g_param = gup( 'd1g' );
		var d2g_param = gup( 'd2g' );
		var rtp_param = gup( 'rtp' );
		var d1p_param = gup( 'd1p' );
		var d2p_param = gup( 'd2p' );
		var rtc_param = gup( 'rtc' );
		var d1c_param = gup( 'd1c' );
		var d2c_param = gup( 'd2c' );
		var arrivetick = gup( 'at' );
		
		//count decoys
		var decoys = 0;
		if ( d1c_param != "" )
			decoys++;
		if ( d2c_param != "" )
			decoys++
		
		//warning displays
		var warnings = "";
		
		//mainfleet number
		var mainfleet = 0;
		
		//search for the fleet counts...
		var i = 0;
		var locat;
		var fleetfinder = "";
		while ( fleetfinder.indexOf( "More" ) < 0 ) {
			i++
			locat = "id('content')/table[1]/tbody/tr[" + i + "]/td[3]";
			node = document.evaluate(locat, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			fleetfinder = node.innerHTML;
		}
		//assign a fleet count
		locat = "id('content')/table[1]/tbody/tr[" + ( i + 1 )+ "]/td[";
		
		//find att/def rows
		var attfinder = "";
		var locatatt = ""; var locatdef = "";
		while ( attfinder.indexOf( "Attack" ) < 0 ) {
			i++
			locatatt = "id('content')/table[1]/tbody/tr[" + i + "]/td[1]"
			node = document.evaluate(locatatt, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			attfinder = node.innerHTML;
		}
		locatatt = "id('content')/table[1]/tbody/tr[" + i + "]/td[";
		i++;
		locatdef = "id('content')/table[1]/tbody/tr[" + i + "]/td[";
		
		//grab our fleet atts and defs for auto detecting and exporting
		var att1, def1, att2, def2, att3, def3;
		var node = document.evaluate(locatatt + "2]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		att1 = node.innerHTML;
		node = document.evaluate(locatatt + "3]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		att2 = node.innerHTML;
		node = document.evaluate(locatatt + "4]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		att3 = node.innerHTML;
		node = document.evaluate(locatdef + "2]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		def1 = node.innerHTML;
		node = document.evaluate(locatdef + "3]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		def2 = node.innerHTML;
		node = document.evaluate(locatdef + "4]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		def3 = node.innerHTML;	
		
		att1 = Number ( ( ( att1.replace( "," , "" ) ).replace( "," , "" ) ).replace( "," , "" ) );
		att2 = Number ( ( ( att2.replace( "," , "" ) ).replace( "," , "" ) ).replace( "," , "" ) );
		att3 = Number ( ( ( att3.replace( "," , "" ) ).replace( "," , "" ) ).replace( "," , "" ) );
		def1 = Number ( ( ( def1.replace( "," , "" ) ).replace( "," , "" ) ).replace( "," , "" ) );
		def2 = Number ( ( ( def2.replace( "," , "" ) ).replace( "," , "" ) ).replace( "," , "" ) );
		def3 = Number ( ( ( def3.replace( "," , "" ) ).replace( "," , "" ) ).replace( "," , "" ) );


		//decoy matcher
		var fleet1, fleet2, fleet3;
		node = document.evaluate(locat + "3]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		fleet1 = node.innerHTML;
		node = document.evaluate(locat + "4]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		fleet2 = node.innerHTML;
		node = document.evaluate(locat + "5]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		fleet3 = node.innerHTML;
		
		//att comparison
		var realatt, realdef, realcount;
		if ( att1 > att2 ) {
			if ( att1 > att3 ) {
				mainfleet = 1;
				realcount = fleet1;
				realatt = att1;
				realdef = def1;
			}
			else {
				mainfleet = 3;
				realcount = fleet3;
				realatt = att3;
				realdef = def3;
			}
		}
		else if ( att2 > att3 ) {
			mainfleet = 2;
			realcount = fleet2;
			realatt = att2;
			realdef = def2;
		}
		else {
			mainfleet = 3;
			realcount = fleet3;
			realatt = att3;
			realdef = def3;
		}
		//set up our IRC tracker line
		var ccelaunched = ".cce launched " + realatt + " " + realdef;
			
		
		
		//we need these to match up decoys to respective fleets, just gotta check to make sure everything's lined up.
		var fleet1match = false; var fleet2match = false; var fleet3match = false;
			
		var dac_warn = false; //if we don't have enough decoys that match, this will turn true.
			//yeah, I suck, I'm doing the decoy checking by a point system.
			if ( decoys > 0 ) {
				if ( ( fleet1 != fleet2 ) || ( fleet1 != fleet3 ) || ( fleet2 != fleet3 ) ) {
					if ( decoys == 1 ) {
						i = 0;
						if ( realcount == fleet1 ) {
							fleet1match = true;
							i++
						}
						if ( realcount == fleet2 ) {
							fleet2match = true;
							i++
						}
						if ( realcount == fleet3 ) {
							fleet3match = true;
							i++
						}
						
						if ( i < 2 ) dac_warn = true;
					}
					else if ( decoys > 1 ) {
						dac_warn = true;
						fleet1match = false;
					}
				}
				else {
					fleet1match = true;
					fleet2match = true;
					fleet3match = true;
				}
			}
		
		//fleet assignments
		var launches = 1;
		if ( d1d_param != "" ) {
			launches++;
		}
		if ( d2d_param != "" ) {
			launches++;
		}
		var launch1 = "";
		var launch2 = "";
		var launch3 = "";
		var f1d_param = ""; var f1g_param = ""; var f1p_param = ""; var f1c_param = "";
		var f2d_param = ""; var f2g_param = ""; var f2p_param = ""; var f2c_param = "";
		var f3d_param = ""; var f3g_param = ""; var f3p_param = ""; var f3c_param = "";
		var f1l_param = false; var f2l_param = false; var f3l_param = false;
		
		//realfleet coords assignment
		if ( rtd_param != "" ) {
			if ( mainfleet == 1 ) { 
				f1l_param = true;
				launch1 = "checked=\"checked\"";
				f1d_param = rtd_param;
				f1g_param = rtg_param;
				f1p_param = rtp_param;
				f1c_param = rtc_param;
			}
			else if ( mainfleet == 2 ) { 
				f2l_param = true;
				launch2 = "checked=\"checked\"";
				f2d_param = rtd_param;
				f2g_param = rtg_param;
				f2p_param = rtp_param;
				f2c_param = rtc_param;
			}
			else if ( mainfleet == 3 ) { 
				f3l_param = true;
				launch3 = "checked=\"checked\"";
				f3d_param = rtd_param;
				f3g_param = rtg_param;
				f3p_param = rtp_param;
				f3c_param = rtc_param;
			}
			launches--;
		}
		
		
		var decoy1 = 0;
		//decoy 1 assignment at random
		var assigned = true;
			if ( ( d1d_param != "" ) && ( launches != 0 ) ) {
				var d1fleet = Math.round( Math.random() );
				var flag = 0; 
				if ( mainfleet == 1 ) {
					flag = 0;
					while ( ( assigned ) && ( flag <= 1 ) ) {
						if ( d1fleet == 0 ) {
							if ( fleet2match == true ) { 
								f2d_param = d1d_param;
								f2g_param = d1g_param;
								f2p_param = d1p_param;
								f2c_param = d1c_param;
								launch2 = "checked=\"checked\"";
								assigned = false;
								decoy1 = 2;
							}
							else { 
								flag++;
								d1fleet++;
							}
						}
						if ( d1fleet == 1 ) {
							if ( fleet3match == true ) { 
								f3d_param = d1d_param;
								f3g_param = d1g_param;
								f3p_param = d1p_param;
								f3c_param = d1c_param;
								launch3 = "checked=\"checked\"";
								assigned = false;
								decoy1 = 3;
							}
							else {
								d1fleet--;
								flag++;
							}
						}
					}
					if ( flag > 1 ) dac_warn = true;
				}
				if ( mainfleet == 2 ) {
					flag = 0;
					assigned = true;
					while ( ( assigned ) && ( flag <= 1 ) ) {
						if ( d1fleet == 0 ) {
							if ( fleet1match == true ) { 
								f1d_param = d1d_param;
								f1g_param = d1g_param;
								f1p_param = d1p_param;
								f1c_param = d1c_param;
								launch1 = "checked=\"checked\"";
								assigned = false;
								decoy1 = 1;
							}
							else { 
								flag++;
								d1fleet++;
							}
						}
						if ( d1fleet == 1 ) {
							if ( fleet3match == true ) { 
								f3d_param = d1d_param;
								f3g_param = d1g_param;
								f3p_param = d1p_param;
								f3c_param = d1c_param;
								launch3 = "checked=\"checked\"";
								assigned = false;
								decoy1 = 3;
							}
							else {
								d1fleet--;
								flag++;
							}
						}
					}
					if ( flag > 1 ) dac_warn = true;
				}
				if ( mainfleet == 3 ) {
					flag = 0;
					assigned = true;
					while ( ( assigned ) && ( flag <= 1 ) ) {
						if ( d1fleet == 0 ) {
							if ( fleet1match == true ) {
								f1d_param = d1d_param;
								f1g_param = d1g_param;
								f1p_param = d1p_param;
								f1c_param = d1c_param;
								launch1 = "checked=\"checked\"";
								assigned = false;
								decoy1 = 1;
							}
							else {
								flag++;
								d1fleet++;
							}
						}
						if ( d1fleet == 1 ) {
							if ( fleet2match == true ) { 
								f2d_param = d1d_param;
								f2g_param = d1g_param;
								f2p_param = d1p_param;
								f2c_param = d1c_param;
								launch2 = "checked=\"checked\"";
								assigned = false;
								decoy1 = 2;
							}
							else {
								d1fleet--;
								flag++;
							}
						}
					}
					if ( flag > 1 ) dac_warn = true;
				}
				launches--;
			}
			
			///*///
			
		//assign the remaining fleet the second decoy.
		//luckily, this will be MUCH easier.
		var decoy2 = 0;
		if ( ( d2d_param != "" ) && ( launches != 0 ) ) {
			if ( f1d_param == "" ) {
				if ( fleet1match == true ) {
					f1d_param = d2d_param;
					f1g_param = d2g_param;
					f1p_param = d2p_param;
					f1c_param = d2c_param;
					launch1 = "checked=\"checked\"";
					decoy2 = 1;
				}
				else dac_warn = true;
			}
			else if ( f2d_param == "" ) {
				if ( fleet2match == true ) {
					f2d_param = d2d_param;
					f2g_param = d2g_param;
					f2p_param = d2p_param;
					f2c_param = d2c_param;
					launch2 = "checked=\"checked\"";
					decoy2 = 2;
				}
				else dac_warn = true;
			}
			else if ( f3d_param == "" ) {
				if ( fleet3match == true ) {
					f3d_param = d2d_param;
					f3g_param = d2g_param;
					f3p_param = d2p_param;
					f3c_param = d2c_param;
					launch3 = "checked=\"checked\"";
					decoy2 = 3;
				}
				else dac_warn = true;
			}
			launches--;
		}
		
		
		
		
		//And this, ladies and gents, is where the magic happens.
		//well, not yet, at least not until I decide to do the research
		//that will need to be done for 3.0.
		
				var msglook = ( ( xpath( 'id("content")/div[contains(.,"unread message")]',document,true ) == null ) ? 'Error' : xpath( 'id("content")/div[contains(.,"unread message")]',document,true ) );
		var msgbox = "";
		if ( msglook != 'Error' ) {
			msgbox = '<div class="notificationmessage">' + msglook.innerHTML + '</div>';
		}
		
		//the launched info should be @ xpath id('content')/div[2]
		var newslook = ( ( xpath( 'id("content")/div[contains(.,"unread news item")]',document,true ) == null ) ? 'Error' : xpath( 'id("content")/div[contains(.,"unread news item")]',document,true ) );
		var newsbox = "";
		if ( newslook != 'Error' ) {
			newsbox = '<div class="notificationmessage">' + newslook.innerHTML + '</div>';
		}
		
		
		//keep an eye on this section in later versions, you will not be disappointed.
		var theBox = ( ( xpath( 'id("content")/div[contains(.,"has been launched!")]',document,true ) == null ) ? 'Error' : xpath( 'id("content")/div[contains(.,"has been launched!")]',document,false ) );
		var launched = false;
		var launchedinfo = "";
		if ( theBox != 'Error' ) {
			launched = true;
			var stuff;
			var i;
			for (i=0; (stuff = theBox.snapshotItem(i)); i++){
				temp = stuff.innerHTML;
				
				//first, find out which fleet we are:
				var temp2 = (temp.indexOf( "Fleet " ) + 6);
				var temp2 = Number( temp.substr( temp2,1 ) );
				fnum = temp2;
				temp2 = ( temp2 == 1 ) ? fleet1 : ( ( temp2 == 2) ? fleet2 : fleet3 );
				
				//next, add how many creatures we launched with by using the counts we made earlier:
				var cutindex = temp.indexOf( "!" );
				var beginning = temp.substring( 0,cutindex );
				var theend = temp.substring( cutindex );
				var temp = beginning + " has been launched with " + temp2 + " creatures" + theend;
		
				//a cosmetic change ;D
				cutindex = temp.indexOf( " | " );
				beginning = temp.substring( 0,cutindex );
				theend = temp.substring( cutindex + 3 );
				temp = beginning + "<br />" + theend;
			
				//nao, add in how many ticks it will take to get there.
				var n = 0;
				node = 'Error';
				//this had me for a while... It turns out that neon is trying to insert maps under the fleets-in-transit, like he does to the overview page.
				//However, unlike the ones on the overview page, these don't even pretend to work.  Poor IE users have a red X every time they launch.
				if ( fnum > 1 ) {
					do { 
						n++;
						temp2 = "id('content')/table[2]/tbody/tr[" + ( fnum + n ) + "]/td[1]";
						node = ( document.evaluate(temp2, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue == null ) ?
							'Error' : document.evaluate(temp2, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
						if ( node != 'Error' ) temp2 = node.innerHTML;
						else temp2 = 'Error';
					} while ( temp2 != ( "Fleet " + fnum ) )
					node = document.evaluate("id('content')/table[2]/tbody/tr[" + ( fnum + n ) + "]/td[5]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				}
				else {
					node = ( document.evaluate("id('content')/table[2]/tbody/tr[2]/td[5]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue == null ) ?
						'Error' : document.evaluate("id('content')/table[2]/tbody/tr[2]/td[5]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				}
				
				temp2 = Number( node.innerHTML );
				temp += " ETA: " + temp2 + " ticks, ";
				
				//add a little section about the att/def of this fleet.
				temp2 = locatatt + ( fnum + 1 ) + "]";
				node = document.evaluate(temp2, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				temp2 = node.innerHTML;
				temp += "Fleet Stats: <strong>" + temp2 + "/";
				temp2 = locatdef + ( fnum + 1 ) + "]";
				node = document.evaluate(temp2, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
				temp2 = node.innerHTML;
				temp += temp2 + "</strong>";
			
				//now put it all together and what've you got?
				launchedinfo += '<div class="helpmessage">' + temp + '</div>';
			}
			
			launchedinfo += "<p>Copy this line into IRC to use the tracker:<br /><font color=\"red\">" + ccelaunched + "</font></p>";
			
		}
		
		

		
		////WARNING SECTION!
		
		
		//decoy count warning
		//we need to alarm the user if there aren't enough decoy fleets. 
		if ( dac_warn ) { 
			warnings += "<font color=\"#ff0000\">WARNING:</font> Some of your fleets are mismatched.  Please check this on your <a href=\"http://ev5.neondragon.net/fleets\">fleets page</a>."; 
		}
			
		
		
		
				//write a whole fleets page using javascript!  Surely you must be joking!
		document.getElementById( 'content' ).innerHTML = 
			"<span id=\"fleetchoice\"></span>"
		+	"<br /><br /><p>"
		+  ( ( launched ) ? msgbox + newsbox + launchedinfo + "<br />" : msgbox + newsbox + "<br />" )
		+	"	<span id=\"warnings\"></span>"
		+	"	<span id=\"etawarning\"></span>"
		+	"</p>"
		+	"<table class=\"t_little b\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\" width=\"100%\">"
		+	"	<span id=\"form1\"></span>"
		+	"	<p>"
		+	"		<span id=\"launched\"></span>"
		+	"	</p>"
		+	"</table>";
		

		
		
				//I'm not joking, and don't call me shirley.
		document.getElementById( 'form1' ).innerHTML = 
		"<form name=\"launchform\" method=\"post\">"
		+ "<tr><td></td><td class=\"alt1\">Heading</td>"
		+ "	<td class=\"alt1\">Objective</td><td class=\"alt1\">Ticks left</td><td class=\"alt1\">&nbsp;</td>"
		+ "</tr>"
		+ "<tr class=\"red_bg row1\"><td>Fleet 1</td>"
		+ "	<td><a id=\"f1_coords\">("
		+ "	<input size=\"2\" maxlength=\"3\" name=\"f_x[1]\" onkeyup=\"updateETA(1)\" id=\"fleetx1\" type=\"text\" value=\"" + f1d_param + "\">"
		+ "	,<input size=\"2\" maxlength=\"2\" name=\"f_y[1]\" onkeyup=\"updateETA(1)\" id=\"fleety1\" type=\"text\" value=\"" + f1g_param + "\">"
		+ "	,<input size=\"2\" maxlength=\"2\" name=\"f_z[1]\" onkeyup=\"updateETA(1)\" id=\"fleetz1\" type=\"text\" value=\"" + f1p_param + "\">"
		+ "	:<input size=\"1\" maxlength=\"1\" name=\"f_c[1]\" type=\"text\" value=\"" + f1c_param + "\">"
		+ "	)</a></td>"
		+ "	<td><a id=\"f1_select\"><select name=\"f_mission[1]\">"
		+ "	<option selected=\"selected\" value=\"\">Select</option>"
		+ "	<option value=\"att1\" id=\"f1d\" style=\"background-color: darkred; color: white;\">1 tick Attack</option>"
		+ "	<option value=\"att2\" style=\"background-color: darkred; color: white;\">2 tick Attack</option>"
		+ "	<option value=\"att3\" id=\"f1m\" style=\"background-color: darkred; color: white;\">3 tick Attack</option>"
		+ "				<option value=\"def1\" style=\"background-color: darkgreen; color: white;\">1 tick Defense</option>"
		+ "				<option value=\"def2\" style=\"background-color: darkgreen; color: white;\">2 tick Defense</option>"
		+ "				<option value=\"def3\" style=\"background-color: darkgreen; color: white;\">3 tick Defense</option>"
		+ "				<option value=\"def4\" style=\"background-color: darkgreen; color: white;\">4 tick Defense</option>"
		+ "				<option value=\"def5\" style=\"background-color: darkgreen; color: white;\">5 tick Defense</option>"
		+ "				<option value=\"def6\" style=\"background-color: darkgreen; color: white;\">6 tick Defense</option></select></a>"
		+ "	</td>"
		+ "	<td><span id=\"fleet_1\"></span></td>"//eta
		+ "	<td><span id=\"f1_box\">"
		+ "		<input name=\"f_submit[1]\" value=\"Launch\" " + launch1 + " type=\"checkbox\">Launch"
		+ "	</span></td>"
		+ "</tr>"
		+ "<tr class=\"yellow_bg row1\"><td>Fleet 2</td>"
		+ "	<td>"
		+ "		<a id=\"f2_coords\">("
		+ "			<input size=\"2\" maxlength=\"3\" name=\"f_x[2]\" onkeyup=\"updateETA(2)\" id=\"fleetx2\" type=\"text\" value=\"" + f2d_param + "\">"
		+ "			,<input size=\"2\" maxlength=\"2\" name=\"f_y[2]\" onkeyup=\"updateETA(2)\" id=\"fleety2\" type=\"text\" value=\"" + f2g_param + "\">"
		+ "			,<input size=\"2\" maxlength=\"2\" name=\"f_z[2]\" onkeyup=\"updateETA(2)\" id=\"fleetz2\" type=\"text\" value=\"" + f2p_param + "\">"
		+ "			:<input size=\"1\" maxlength=\"1\" name=\"f_c[2]\" type=\"text\" value=\"" + f2c_param + "\"> )"
		+ "		</a>"
		+ "	</td>"
		+ "	<td>"
		+ "		<a id=\"f2_select\">"
		+ "			<select name=\"f_mission[2]\">"
		+ "				<option selected=\"selected\" value=\"\">Select</option>"
		+ "				<option value=\"att1\" id=\"f2d\" style=\"background-color: darkred; color: white;\">1 tick Attack</option>"
		+ "				<option value=\"att2\" style=\"background-color: darkred; color: white;\">2 tick Attack</option>"
		+ "				<option value=\"att3\" id=\"f2m\" style=\"background-color: darkred; color: white;\">3 tick Attack</option>"
		+ "				<option value=\"def1\" style=\"background-color: darkgreen; color: white;\">1 tick Defense</option>"
		+ "				<option value=\"def2\" style=\"background-color: darkgreen; color: white;\">2 tick Defense</option>"
		+ "				<option value=\"def3\" style=\"background-color: darkgreen; color: white;\">3 tick Defense</option>"
		+ "				<option value=\"def4\" style=\"background-color: darkgreen; color: white;\">4 tick Defense</option>"
		+ "				<option value=\"def5\" style=\"background-color: darkgreen; color: white;\">5 tick Defense</option>"
		+ "				<option value=\"def6\" style=\"background-color: darkgreen; color: white;\">6 tick Defense</option>"
		+ "			</select>"
		+ "		</a>"
		+ "	</td>"
		+ "	<td>"
		+ "		<span id=\"fleet_2\"></span>"//eta
		+ "	</td>"
		+ "	<td>"
		+ "		<span id=\"f2_box\"><input name=\"f_submit[2]\" value=\"Launch\" " + launch2 + " type=\"checkbox\">Launch</span>"
		+ "	</td>"
		+ "</tr>"
		+ "<tr class=\"green_bg row1\">"
		+ "	<td>Fleet 3</td>"
		+ "	<td>"
		+ "		<a id=\"f3_coords\">("
		+ "			<input size=\"2\" maxlength=\"3\" name=\"f_x[3]\" onkeyup=\"updateETA(3)\" id=\"fleetx3\" type=\"text\" value=\"" + f3d_param + "\">"
		+ "			,<input size=\"2\" maxlength=\"2\" name=\"f_y[3]\" onkeyup=\"updateETA(3)\" id=\"fleety3\" type=\"text\" value=\"" + f3g_param + "\">"
		+ "			,<input size=\"2\" maxlength=\"2\" name=\"f_z[3]\" onkeyup=\"updateETA(3)\" id=\"fleetz3\" type=\"text\" value=\"" + f3p_param + "\">"
		+ "			:<input size=\"1\" maxlength=\"1\" name=\"f_c[3]\" type=\"text\" value=\"" + f3c_param + "\"> )"
		+ "		</a>"
		+ "	</td>"
		+ "	<td>"
		+ "		<a id=\"f3_select\">"
		+ "			<select name=\"f_mission[3]\">"
		+ "				<option selected=\"selected\" value=\"\">Select</option>"
		+ "				<option value=\"att1\" id=\"f3d\" style=\"background-color: darkred; color: white;\">1 tick Attack</option>"
		+ "				<option value=\"att2\" style=\"background-color: darkred; color: white;\">2 tick Attack</option>"
		+ "				<option value=\"att3\" id=\"f3m\" style=\"background-color: darkred; color: white;\">3 tick Attack</option>"
		+ "				<option value=\"def1\" style=\"background-color: darkgreen; color: white;\">1 tick Defense</option>"
		+ "				<option value=\"def2\" style=\"background-color: darkgreen; color: white;\">2 tick Defense</option>"
		+ "				<option value=\"def3\" style=\"background-color: darkgreen; color: white;\">3 tick Defense</option>"
		+ "				<option value=\"def4\" style=\"background-color: darkgreen; color: white;\">4 tick Defense</option>"
		+ "				<option value=\"def5\" style=\"background-color: darkgreen; color: white;\">5 tick Defense</option>"
		+ "				<option value=\"def6\" style=\"background-color: darkgreen; color: white;\">6 tick Defense</option>"
		+ "			</select>"
		+ "		</a>"
		+ "	</td>"
		+ "	<td>"
		+ "		<span id=\"fleet_3\"></span>"//eta
		+ "	</td>"
		+ "	<td>"
		+ "		<span id=\"f3_box\"><input name=\"f_submit[3]\" value=\"Launch\" " + launch3 + " type=\"checkbox\">Launch</span>"
		+ "	</td>"
		+ "</tr>"
		+ "<p><a id=\"launch\">"
		+ "	<input value=\"Recheck Launch\" onclick=\"window.location.reload()\" type=\"button\">"
		+ "	<input name=\"\" value=\"Launch Selected Fleets\" type=\"submit\">"
		+ "</a></p></form>";
		

		
		//assign the missions...
		document.getElementById("f" + mainfleet + "m").selected=true;
		if ( decoy1 > 0 ) {
			document.getElementById("f" + decoy1 + "d").selected=true;
		}
		if ( decoy2 > 0 ) {
			document.getElementById("f" + decoy2 + "d").selected=true;
		}
		
		
		//check the ETAs and the Arrival Tick		
		var arrivetick = gup( 'at' );
		var thistick = Number( xpath("//div/span/strong",document, true).innerHTML );

		//javascript injected into the DOM page
		//eta warnings are handled here
		var temp = 
			"<script type=\"text/javascript\">"
		+	"	for ( var n = 1 ; n < 4 ; n++ ) updateETA(n);"
		+	"	var warnings = \"\";"
		+	"	var div = 0;"
		+	"	var total = 0;"
		+	"	if ( " + ( launch1 != "" ) + " == true ) {"
		+	"		total += parseInt( document.getElementById(\"fleet_1\").innerHTML, 10 );"
		+	"		div = total;"
		+	"	}"
		+	"	else"
		+	"		document.getElementById(\"fleet_1\").innerHTML = \"\";"
		+	"	if ( " + ( launch2 != "" ) + " == true ) { "
		+	"		total += parseInt( document.getElementById(\"fleet_2\").innerHTML, 10 );"
		+	"		div = parseInt( document.getElementById(\"fleet_2\").innerHTML, 10 );"
		+	"	}"
		+	"	else"
		+	"		document.getElementById(\"fleet_2\").innerHTML = \"\";"
		+	"	if ( " + ( launch3 != "" ) + " == true ) {"
		+	"		total += parseInt( document.getElementById(\"fleet_3\").innerHTML, 10 );"
		+	"		div = parseInt( document.getElementById(\"fleet_3\").innerHTML, 10 );"
		+	"	}"
		+	"	else"
		+	"		document.getElementById(\"fleet_3\").innerHTML = \"\";"
		+	"	if ( ( total / div ) != Math.round( total / div ) )"
		+	"		warnings += \"<br /><font color=\\\"#FFFF00\\\">Caution:</font> Some of your launching fleets have differing ETAs.  Please double check before launching.\";"
		+	"	if ( warnings == \"\" ) { "
		+	"		if ( " + ( ( arrivetick != "" ) && ( arrivetick != null ) ) + " ) {"
		+	"			if ( ( ( " + thistick + " ) + div ) != " + arrivetick + " ) { "
		+	"				warnings += \"<br /><font color=\\\"#ff0000\\\">WARNING:</font>\";"
		+	"				var mtime = ( " + arrivetick + " - ( " + thistick + " + div ) );"
		+	"				if ( mtime > 0 )"
		+	"					warnings += \"You will not arrive at the specified Arrival Tick.  Please attempt to launch again in \" + mtime + \" Ticks.\";"
		+	"				else"
		+	"					warnings += \"You are too late to participate in this launch\";"
		+	"			}"
		+	"		}"
		+	"	}"
		+	"	document.getElementById(\"etawarning\").innerHTML = warnings;"
		+	"</script>";
				
				
			//	
		html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue, temp ,true,false);
		document.getElementById( 'warnings' ).innerHTML = warnings;
	}
//	html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<script type=\"text/javascript\">loadAccordion(\'navpanelcontent\',\'navpanelheader\',2);</script>',true,false);
}; // Ends do_platypus_script


//
//
///NINJ4 Functions:
//
//

function xpath(query, domspace, single) {
	if (!single) {
		return document.evaluate(query, domspace, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	} else {
		return document.evaluate(query, domspace, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	}
}

function gup( name )
{
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var tmpURL = window.location.href;
  var results = regex.exec( tmpURL );
  if( results == null )
    return "";
  else
    return results[1];
}
//
//
///End NINJ4 Functions
//
//
	
window.addEventListener("load", function() { do_platypus_script() }, false);





//

//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner

//  Short, uncommented file containing all the code to implement Platypus

//  actions.  Can be "included" into the Platypus script.

//

// 

// 

	

function walk_down(node, func) {

  if (node.nodeType == 1) {

    if (node.tagName != "IMG") func(node);

    if (node.childNodes.length != 0)

      for (var i=0; i<node.childNodes.length; i++)

walk_down(node.childNodes.item(i),func);

  }

}

function make_bw(doc, node) {

  walk_down(node,

            function (node) {

      if (node.tagName != 'A') {

  node.bgcolor = "white";

  node.color = "black";

  node.style.backgroundColor = "white";

  node.style.color = "black";

  node.style.backgroundImage = "";

      }});

}

function center_it(doc, node) {

  var center_node = doc.createElement ("CENTER");

  node.parentNode.insertBefore(center_node, node);

  node.parentNode.removeChild(node);  

  center_node.appendChild(node);

  return center_node;

};

function erase_it(doc, node) {

  var offset_height = node.offsetHeight;

  var offset_width = node.offsetWidth;

  var replacement_div = doc.createElement ("DIV");

  replacement_div.setAttribute('style',

       "height: "+offset_height+"; width: "+offset_width+";");

  node.parentNode.insertBefore(replacement_div, node);

  node.style.display = "none";

  return replacement_div;

};

function smart_remove(doc, node) {

    if (node.parentNode.childNodes.length == 1) {

smart_remove(doc, node.parentNode);

    } else {

remove_it(doc, node);

    };

};

function remove_it(doc, node) {

  if (doc == null || node == null) return;

  if (!node.parentNode) return;

  node.style.display = "none";

  doc.last_removed_node = node;

};

function script_paste(doc, where, what) {

    var new_node = what.cloneNode(true);

    new_node.style.display = "";

    where.parentNode.insertBefore(new_node, where);

};

function isolate(doc, node) {

  if (!node.parentNode) return;

  node.parentNode.removeChild(node);

  while (doc.body.childNodes.length > 0) {

    doc.body.removeChild(doc.body.childNodes[0]);

  };

  var replacement_div = doc.createElement ("DIV");

  replacement_div.setAttribute('style',

       "margin: 0 2%; text-align: left");

  replacement_div.appendChild(node);

  doc.body.appendChild(replacement_div);

};

function set_style_script(doc, element, new_style) {

    element.setAttribute('style', new_style);

};

function modify_single_url(doc, match_re, replace_string, node) {

    if (node.href) {

node.href = node.href.replace(match_re, replace_string);

    };

};

function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {

    match_re = new RegExp(match_re);

    if (global_flag) {

var allurls = doc.getElementsByTagName('A');

for(var i = 0, url; url = allurls[i]; i++)

  modify_single_url(doc, match_re, replace_string, url);

    } else {

modify_single_url(doc, match_re, replace_string, node);

    };

};

function do_modify_html_it(doc, element, match_re, replace_string) {

    match_re = new RegExp(match_re);

    if (element.innerHTML) {

element.innerHTML = element.innerHTML.replace(match_re, replace_string);

    };

};

function relax(doc, node) {

  walk_down(node, function (node) {

      node.style.width = 'auto';

      node.style.marginLeft = '0pt';

      node.style.marginRight = '0pt';

      if (node.width) node.width = null; });

}

function fix_page_it(doc, node) {

    doc.background = null;

    doc.bgColor = "white";

    if (doc.style) {

      doc.style.backgroundColor = "white";

      doc.style.backgroundImage = "none";

      if (doc.style.color == "white") {

doc.style.color = "black";

      };

      if (doc.text == "white") {

doc.text = "black";

      };

    };

    doc.body.background = null;

    doc.body.bgColor = "white";

    if (doc.body.style) {

      doc.body.style.backgroundColor = "white";

      doc.body.style.backgroundImage = "none";

      if (doc.body.style.color == "white") {

doc.body.style.color = "black";

      };

      if (doc.body.text == "white") {

doc.body.text = "black";

      };

    };

};

function insertAfter(newNode, target) {

    var parent = target.parentNode;

    var refChild = target.nextSibling;

    if(refChild != null)

parent.insertBefore(newNode, refChild);

    else

parent.appendChild(newNode);

};

function html_insert_it(doc, element, new_html, before, insert_as_block) {

  var new_element;

  if (insert_as_block) {

    new_element = doc.createElement ("DIV");

  } else {

    new_element = doc.createElement ("SPAN");

  };

  new_element.innerHTML = new_html;

  if (before) {

      element.parentNode.insertBefore(new_element, element);

  } else {

      insertAfter(new_element, element);

  };

};

function auto_repair_it(doc, node) {

  var biggest_elem = find_biggest_elem(doc);

  isolate(doc, biggest_elem);

  relax(doc, biggest_elem);

  make_bw(doc, biggest_elem);

  fix_page_it(doc, biggest_elem);

};

function find_biggest_elem(doc) {

  const big_element_limit = 0.25;

  var size_of_doc = doc.documentElement.offsetHeight *

      doc.documentElement.offsetWidth;

  var body = doc.body;

  var size_of_body = body.offsetHeight * body.offsetWidth;

  if (size_of_body < (0.80 * size_of_doc)) {

      size_of_body = size_of_doc;

  };

  var max_size = 0;

  var max_elem = doc;

  var allElems = document.evaluate("//*",

 doc.body, null,

 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

 null);

  for (var i = 0; i < allElems.snapshotLength; i++) {

    var thisElem = allElems.snapshotItem(i);

    var thisElem_size = thisElem.offsetHeight * thisElem.offsetWidth;



    if (thisElem_size < size_of_body &&

thisElem_size > max_size &&

!contains_big_element(thisElem, size_of_body * big_element_limit)) {

      max_size = thisElem_size;

      max_elem = thisElem;

    };

  };

  return max_elem;

};



function contains_big_element(node, limit) {

    if (node.childNodes.length != 0)

for (var i=0; i<node.childNodes.length; i++) {

    var child = node.childNodes.item(i);

    var child_size = child.offsetHeight * child.offsetWidth;

    if (child_size > limit) return true;

};

    return false;

};



function platypus_do(win, func_name, o, other, other2, other3) {

    var func = eval(func_name);

    var doc = null;

    if (func == null) return;

    if (!o) {

Warning("Platypus couldn't find a page element when executing the command "+

func_name+".  This usually happens when running a script -- maybe the"+

" web page the script is running on has changed.");

    };

    doc = win.document;

    func(doc, o, other, other2, other3);

};

//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
(function () {
	var node;

	// Initialization
	// -----------------------------------------------------------------------
	// contents node
	contents = document.getElementById("content");

	// get out of the bloody forums message editor
	if( contents == null ) return;

	// Dispatch
	// -----------------------------------------------------------------------
	for(var i = 0; i < pageHandlers.length; i++ ) {
		if( pageHandlers[i].urlRegEx == null || pageHandlers[i].urlRegEx.test(document.location.pathname) )
			pageHandlers[i].handler();
	}

	node = document.getElementById('evomagik');
	if (node){
	node.appendChild(document.createElement('br'));
	node.appendChild(document.createTextNode(scriptversionID));
	}
	// fix a bug in evo with non existent adverts that prevent the use of the top panel 
	if(! (node = document.getElementById('advert')) ) {
		node = document.createElement('span');
		node.id = 'advert';
		contents.appendChild(node);
	}
}) ();

// ***************************************************************************
// ** Helper functions
// ***************************************************************************

function evoLayoutChanged() {
	alert('Oops.. Page layout was not recognized, Neon probably changed the page :(');
}

function evoNumber2String(num) {
	var re = /(\d+)(\d{3})/g;

	num = String(num);
	var decimalIdx = num.indexOf('.');
	var part1 = '1', part2="";
	if( decimalIdx != -1 ) {
		part1 = num.substring(0, decimalIdx);
		part2 = num.substring(decimalIdx + 1, num.length);
	}
	else
		part1 = num;

	while( re.test(part1) )
		part1 = part1.replace(re, '$1,$2');

	return part2 == "" ? part1 : part1 + "." + part2;
}

function evoString2Number(num) {
	return Number(num.replace(/,/g,''));
}

function evoFromatNumberZ(num, zeros) {
	var str = "0000" + Math.floor(Math.abs(num));
	return str.substr(-zeros);
}

//

// ***************************************************************************
// ** Objects
// ***************************************************************************

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
	this.urlRegEx = urlRegEx;
	this.handler = handler;
}
function regPageHandler(urlRegEx, handler) {
	pageHandlers.push(new pageHandler(urlRegEx,  handler));
}


//
// ***************************************************************************
// ** MISC
// ***************************************************************************

// GM implementation of cookies :)
function evoSetCookie(name, value, hours) {
	GM_setValue('cv_' + name, value);
	var expire = new Date();
	expire.setUTCHours(expire.getUTCHours() + hours);
	GM_setValue('cx_' + name, expire.toGMTString());
}

function evoGetCookie(name) {
	var value = GM_getValue('cv_' + name);
	var expire = GM_getValue('cx_' + name);
	if( value != null && expire != null ) {
		expire = new Date(expire);
		if( expire.valueOf() >= Date.now() ) return value;
	}
	return null;
}
