// ==UserScript==
// @name           MyTractor
// @namespace      dlogan
// @version        2.03
// @description    Automatically submits battle reports and those under beginner's protection to www.traviantractor.com for organized farming.  
// @include        http://*.travian.*
// ==/UserScript==

// Note: This script originated from the source from Quick Travian Tractor. It has been hacked up, optimized, 
//       and modified so that submission is automatic using AJAX calls vs. form submission. Most everything has
//       been rewritten or heavily tweaked at this point.
//
//       Main differences from Quick Travian Tractor:
//             * Report is submitted to Travian Tractor automatically when you view a battle report where you were 
//               the attacker. It does not require any clicking to send it.
//             * Login system added so that you don't have to login to Travian Tractor's website first. 
//             * Beginner Protection village name is found via an Ajax call instead of requiring a hook to the villages
//               page, storing that into a Greasemonkey variable, and pulling it out.
//             * Referrenes to travilog removed, including all links in icons since its all automatic.

function MyTractorInit(e) {
  var logLevel = 0;

	var XPFirst   = XPathResult.FIRST_ORDERED_NODE_TYPE;        // Constant that returns the first element by XPath
	var XPList    = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;   // Constant that returns a list of elements by XPath
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;   // Constant returns an iterator of elements by XPath
	var sUID = getUID();
	
  var re = new RegExp("^http://(.+\.travian3?\.[a-zA-Z.]+)(\/.*)?$", "i");
	var server = re.exec(window.location.href);
  var sCurrentServer = server[1] + "_";
  log(1,"Server:" + sCurrentServer);
	                    

	
var imgTractor = 'data:image/gif;base64,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';

var imgTractorOn = 'data:image/gif;base64,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';                  
  
	function find(xpath, xpres, startnode){
		if (!startnode) {startnode = document;}
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}
	
	function log(level, text) {
		if (logLevel >= level)
			GM_log(text);
	}
	
	//Forces a logout to deal with multiple TravianTractor sessions with the same browser
	//fName gets passed to login to run after login
	function authenticate(fName){

    GM_xmlhttpRequest({ method: 'GET',     
                        url: 'http://www.traviantractor.com/index.php/me/logout', 
                        accept: 'text/xml,*/*',   
                        onload: function(responseDetails) {
                          login(fName);
                        }

                  });
	}
	
	//Logs in and then runs the function fName
	function login(fName){

    GM_xmlhttpRequest({     method: 'POST',     
                            url: 'http://www.traviantractor.com/index.php/home',     
                            headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
                            data:  'username=' + getVariable("TT_User", "") + '&password=' + 
                                    getVariable("TT_Pass", ""),  
                            onload: function(responseDetails) {
                                      log(2, "login - fname:" + fName);
                                      switch(fName){
                                        case 'submitReport':
                                          submitReport();
                                          break;
                                        case 'submitAttackBP':
                                          submitAttackBP();
                                          break;
                                        case 'submitMapBP':
                                          submitMapBP();
                                          break;
                                      }
                                    },
                      });
  }
  
  function getUID(){
      var lnkXPath = find("//a [substring(@href,1,7) ='spieler']", XPFirst);
      log(1, "getUID - lnkXPath:" + lnkXPath.href);                  

      var strUID = /spieler\.php\?uid=(\d*)/i.exec(lnkXPath.href)[1] + "_";

      log(1, "getUID:" + strUID);                  
      return strUID;
  }
  
  function getVariable(name, defaultValue) {
  
    if(!defaultValue) { var defaultValue = ''; }

    name = sCurrentServer + sUID + name;
    var data = GM_getValue(name, defaultValue);

    return data;
  }
  
  function setVariable(name, value) {
    name = sCurrentServer + sUID + name;
    GM_setValue(name, value);

    return true;
  }

  function addUserPass(){

      var rptDiv = document.getElementById("ce");

      rptDiv.innerHTML += "<div id='MyTractor_div' style='position:absolute;margin-left:60em;margin-top:2.4em;'>" +
                          '<MAP NAME="MyTractor_map">' + 
                          '<AREA id="MyTractor_go" HREF="http://www.traviantractor.com" ALT="Travian Tractor" TITLE="Travian Tractor"' +
                          ' SHAPE=RECT COORDS="0,0,40,35" target="_null">' +
                          '<AREA id="MyTracker_setup" HREF="#" ALT="MyTractor Userid/Password Setup" TITLE="MyTractor Userid/Password Setup"' +
                          'SHAPE=RECT COORDS="41,36,59,56" >' +
                          '<IMG id="MyTractor_imgmap" SRC="' + imgTractor +
                          '" ALT="MyTractor Links" USEMAP="#MyTractor_map" style="float:right;">' +
                          "<TABLE id='MyTractor_config' padding='2' style='background-color:white;width:13em;float:right;display:none;'>" +
                          "<TR><TD>Name:</TD><TD>" +
                            "<input id='TT_User' style='width:6em;' type='text' name='user' value='" + 
                              getVariable("TT_User", "") + "' /></TD></TR>" +
                          "<TR><TD>Password:</TD><TD><input id='TT_Pass'style='width:6em;' type='password' name='pass' value='"                  + getVariable("TT_Pass", "") + "' /></TD></TR>" +
                          "<TR><TD colspan=2 align='center'>" + 
                          "<input id='mytractor_save' type='button' value='save'  />" + 
                          "</TD></TR>" +
                      "</TABLE>" +
                          '<FORM id="TT_Form" target="tractor" action="http://www.traviantractor.com/index.php/home" method="POST">' +
                          '<INPUT type="hidden" name="username" value="' + getVariable("TT_User", "") + '"/>' +
                          '<INPUT type="hidden" name="password" value="' + getVariable("TT_Pass", "") + '"/>' +
                          '</FORM><iframe name="_null" id="_null" height=0 width=0 style="visibility:hidden;"></iframe>' + 
                          "</div>";
      var linka = document.getElementById("MyTractor_go");
            linka.addEventListener("click", function() { 
                                            document.getElementById('TT_Form').submit(); 
                                            }, false);
           
            
      var linkb = document.getElementById('MyTracker_setup');
            linkb.addEventListener("click", function() { 
                                                var hide = document.getElementById('MyTractor_imgmap');
                                                var unhide = document.getElementById('MyTractor_config');
                                                var divBlock = document.getElementById('MyTractor_div');
                                                hide.style.display = 'none';
                                                unhide.style.display = 'block';
                                                divBlock.style.borderStyle='solid';
                                                
                                             }, false);
      var submit = document.getElementById('mytractor_save');
          submit.addEventListener("click", function() { 
                                                var unhide = document.getElementById('MyTractor_imgmap');
                                                var hide = document.getElementById('MyTractor_config');
                                                var divBlock = document.getElementById('MyTractor_div');
                                                hide.style.display = 'none';
                                                unhide.style.display = 'block';
                                                divBlock.style.borderStyle='none';
                                                setVariable('TT_User', document.getElementById('TT_User').value);
                                                setVariable('TT_Pass', document.getElementById('TT_Pass').value);
                                             }, false );

   }

	function submitReport(){
		var playerLinks = find("//a[starts-with(@href,'spieler.php')]",XPList);

		var subj = find("//th", XPList);
		
		if (  subj.snapshotItem(1).innerHTML.indexOf("attacks") == -1 || // scout report
          playerLinks.snapshotItem(0).href != playerLinks.snapshotItem(1).href) //Player not on report
    { return false; }

    var strRpt = parseBattleReport(0);
    
    GM_xmlhttpRequest({     method: 'POST',     
                              url: 'http://www.traviantractor.com/index.php/me/enterReport',     
                              headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
                              data:  'report=' + strRpt,   
                              onload: function(responseDetails) {
                                        var img = document.getElementById('MyTractor_imgmap');
                                        img.src = imgTractorOn;
                                      }
    });
    

	}

	/* prepares the BattleReport for posting in format Tractor needs */
	function parseBattleReport(dontShowTroops){
		var brTxt;

    var attackStr = find("//table[@id='report_surround']/thead//th[not(@class)]", XPList).snapshotItem(1).innerHTML.replace('<span class="c">','').replace('</span>','');
    
		log(4, "attackStr:" + attackStr);
		var timeStr = find("//table[@id='report_surround']/thead//td[not(@class)]", XPFirst).innerHTML.replace(/<span>/g,"").replace(/<\/span>/g,"");
		log(4, "timeStr:" + timeStr);

		brTxt = "Subject: \t" + attackStr + "\nSent: \t" + timeStr + "\n\n";
		
		//Get Title to go with the report
		var tTitles = find("//table[@id='report_surround']//td[@class='report_content']/table//thead/tr", XPList);
		log(5, "tTitles length:" + tTitles.snapshotLength);
		
		//Get bodies of reports
		var tBodies = find("//table[@id='report_surround']//td[@class='report_content']/table//tbody[@class='units']", XPList);
    log(5, "tBodies length:" + tBodies.snapshotLength);
    
    for (var g=0; g < tBodies.snapshotLength;g++) {
      if(g == 1){ //Handle Infos Before inserting any defenders
        //Get Bounty List from page
        var tInfos = find("//table[@id='report_surround']//td[@class='report_content']/table//tbody[@class='goods']//tr", XPList);
        for(var j=0; j < tInfos.snapshotLength;j++){
          var tInfo = tInfos.snapshotItem(j);
          tInfo.innerHTML = tInfo.innerHTML.replace(/<\//g, " </");//Add space to catch plus bounty
          log(6, "tinfo.innerHTML " + tInfo.innerHTML);
          var tText = tInfo.textContent.replace(/\n/g, "");
          log(6, "tText from j#" + j + ":" + tText);
          
          if(tText.match(/[0-9]+ \+ [0-9]+ \+ [0-9]+ \+ [0-9]+ = [0-9]+/)){ //Test if Beyond3 Bounty
              var bounty = tText.substring(0,tText.indexOf("=")).replace(/\+/g, "").replace(/  /g," ");
              log(4, "Beyond3 Bounty:" + bounty);
              
          } else if (tText.match(/[0-9]+ \| [0-9]+ \| [0-9]+ \| [0-9]+/)){ //Regular Bounty
              var bounty = tText.replace(/[0-9]+\/[0-9]+/, "").replace(/\|/g, "").replace(/  /g," ");//Format & Handle Plus
              log(4, "Non-Beyond3 Bounty:" + bounty);
          } 
           brTxt += bounty.replace(/^\t/g, "") + "\n";
        }
      }
    
      var tTitle = tTitles.snapshotItem(g);
      var strTitle = tTitle.textContent.replace(/\n/g, "\t").replace(/\t\t/g, "\t").replace(/^\t/g,"");
      log(8, "tTitles #" + g + ":" + strTitle);
      brTxt += strTitle + "\n";
      
			var tBody = tBodies.snapshotItem(g);
      log(8, "tBodies #" + g + ":" + tBody.innerHTML);
      for(var h=0; h < tBody.childNodes.length;h++){
        var tRow = tBody.childNodes[h];
        if(tRow.innerHTML){
          log(5, "tBody Child#" + h + ":" + tRow.innerHTML);
          
          var rowType = /<th>([a-zA-Z0-9]*)</i.exec(tRow.innerHTML);
          log(6, "tRow type:" + (rowType === null));
          
          switch(rowType === null){
            case true:
              if(tRow.innerHTML.indexOf("Legionnaire") !== -1){
                var race = " \t[Legionnaire]\t[Praetorian]\t[Imperian]\t[Equites Legati]\t[Equites Imperatoris]\t[Equites Caesaris]\t[Ram]\t[Fire Catapult]\t[Senator]\t[Settler]\n";
              } else if(tRow.innerHTML.indexOf("Maceman") !== -1 ){
                var race = " \t[Maceman]\t[Spearman]\t[Axeman]\t[Scout]\t[Paladin]\t[Teutonic Knight]\t[Ram]\t[Catapult]\t[Chieftain]\t[Settler]\n";	
              } else if(tRow.innerHTML.indexOf("Phalanx") !== -1 ){
                var race = " \t[Phalanx] \t[Swordsman] \t[Pathfinder] \t[Theutates Thunder] \t[Druidrider] \t[Haeduan] \t[Battering Ram] \t[Trebuchet] \t[Chief] \t[Settler]\n";
              } else if(tRow.innerHTML.indexOf("Rat") !== -1){
                var race = " \t[Rat]\t[Spider]\t[Snake]\t[Bat]\t[Wild Boar]\t[Wolf]\t[Bear]\t[Crocodile]\t[Tiger]\t[Elephant]\n";
              } else if(tRow.innerHTML.indexOf("Pikeman") !== -1){
                var race = " \t[Pikeman]\t[Thorned warrior]\t[Guardsman]\t[Birds of Prey]\t[Axerider]\t[Natarian Knight]\t[Warelephant]\t[Ballista]\t[Natarian Emperor]\t[Settler]\n";
              }
              log(6, "race:" + race);
              brTxt += race;
              break;
            case false:
              var r  = document.createElement('tr');
              r.innerHTML = tRow.innerHTML.replace(/</g, "\t<").replace(/\t\t/g,"\t").replace(/^\t/g,"");
              brTxt += r.innerHTML + "\n";
              log(5, "rowData:" + r.innerHTML + "\n");
              break;
          }
        }
      }
      
		}

  brTxt = brTxt.replace(/\xA0/g, "").replace(/\r/g, "").replace(/\v/g,"").replace(/\f/g,""); //Clean up to not confuse TT
  
	log (1, brTxt);
	return brTxt;
	}
	
	
	function submitMapBP(){
    var bpDiv = find("//div[@id='map_details_actions']/table/tbody//td[@class='c']", XPFirst);
    
    
    if(!bpDiv) {
      log(2, "submitMapBP - Failed to find BP Bar");
      return false;
    } //If no matches, no BP
    
    m = /(\d\d\/\d\d\/\d\d) (\d\d:\d\d) (am|pm)/.exec(bpDiv.title);
    if(!m){ 
      log(2, "submitMapBP - Failed to match time");
      log(2, "submitMapBP - bpDiv.title:" + bpDiv.title );
      return false; 
    } //If no matches, no BP
    var strTime = m[1] + ' ' + m[2] + ':00 ' + m[3] ;
    log(1, "submitMapBP - strTime:" + strTime);
    
    var bpTown = find("//div[@id='map_details_info']/div", XPFirst);
    var strVillage = bpTown.innerHTML;
    log(1, "submitMapBP - strVillage:" + strVillage);
    
    GM_xmlhttpRequest({     method: 'POST',     
        url: 'http://www.traviantractor.com/index.php/me/beginners',     
        headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
        data: 'village=' + strVillage + '&until=' + strTime, 
        onload: function(responseDetails) {
          var img = document.getElementById('MyTractor_imgmap');
          img.src = imgTractorOn;
        }
    });
    
	}
	
  function submitAttackBP(){
    var bpDiv = document.evaluate(  "//div[@class='f10 e b']", document, null, 
                                      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                                      
    if(!bpDiv){ return false; } //If no matches, no BP
    
    var strText = bpDiv.snapshotItem(0).innerHTML;
    m = /(\d\d\/\d\d\/\d\d) at (\d\d:\d\d:\d\d).*(am|pm)/.exec(strText);
    
    if(!m){ return false; } //If no matches, no BP
    var strTime = m[1] + ' ' + m[2] + ' ' + m[3];
    
    
    var xyInputs = document.evaluate(  "//input[@name = 'x' or @name='y']", document, null, 
                                      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var zVal =  1 + (parseInt(xyInputs.snapshotItem(0).value) + 400) + 
                (801 * Math.abs(parseInt(xyInputs.snapshotItem(1).value) - 400));
    var URL = "http://s8.travian.us/karte.php?z=" + zVal;

    GM_xmlhttpRequest({ method: 'GET',     
                        url: URL, 
                        accept: 'text/xml,*/*',   
                        onload: function(responseDetails) {
                                    var rx = '<area.*title="(.*)" href="karte\\.php\\?d=' + zVal + '.*" />';
                                    var m = new RegExp(rx, "mgi").exec(responseDetails.responseText);
                                    
                                    var strVillage = m[1];
                                        GM_xmlhttpRequest({     method: 'POST',     
                                            url: 'http://www.traviantractor.com/index.php/me/beginners',     
                                            headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
                                            data: 'village=' + strVillage + '&until=' + strTime, 
                                            onload: function(responseDetails) {
                                              var img = document.getElementById('MyTractor_imgmap');
                                              img.src = imgTractorOn;
                                            }
                                        });
                                }

                  });  
  }

  addUserPass();
  switch(window.location.pathname){
    case '/berichte.php':
      if(window.location.search.length > 0){
        log(2, "berichte.php - submitReport()");
        authenticate('submitReport'); 
      }
      break;
    case '/a2b.php':
      log(2, "a2b.php - submitAttackBP()");
      authenticate('submitAttackBP');
      break;
    case '/karte.php':
      if(window.location.search.indexOf("d=") !== -1 && window.location.search.indexOf("c=" !== -1) ){
        log(2, "Karte.php - submitMapBP()");
        authenticate('submitMapBP');
      }
      break;
  }

}


if (window.addEventListener) {
	window.addEventListener('load', MyTractorInit, false);
} else {
	window.attachEvent('onload', MyTractorInit);
}