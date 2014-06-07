// ==UserScript==
// @name           CentSports New Bet
// @namespace      www.centsports.com
// @description    Adds a link directly to the Sport of your choice
// @include        http://*centsports.com/*
// @exclude        http://*centsports.com/forum
// ==/UserScript==

var betmenu = document.evaluate( "/html/body/table[1]/tbody/tr/td[2]/div[@class='tiny']/div/table/tbody/tr[3]/td",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var newBetLink = document.evaluate( "/html/body/table[1]/tbody/tr/td[2]/div[@class='tiny']/div/table/tbody/tr[3]/td/table/tbody/tr/td[3]/a", 
              document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


var newTD  = document.createElement('td')


betmenu.snapshotItem(0).parentNode.appendChild(newTD)
            

function ltrim(str) {
    for(var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);
    return str.substring(k, str.length);
}
function rtrim(str) {
    for(var j=str.length-1; j>=0 && isWhitespace(str.charAt(j)) ; j--) ;
    return str.substring(0,j+1);
}
function trim(str) {
    return ltrim(rtrim(str));
}
function isWhitespace(charToCheck) {
    var whitespaceChars = " \t\n\r\f";
    return (whitespaceChars.indexOf(charToCheck) != -1);
}
            

function getParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  
  var results = regex.exec( window.location.href );
  if( results == null ){
    return null;
  }
  else
    return results[1];
}            



var mySelect = document.createElement('Select')
//mySelect.setAttribute("id", "SportSelect")
mySelect.id =  "SportSelect"
newOption = document.createElement("option"); 
newOption.value = "BOX";
newOption.text =  "Boxing"
mySelect.add(newOption, null)

newOption = document.createElement("option"); 
newOption.value = "ATP";
newOption.text =  "Tennis"
mySelect.add(newOption, null)

newOption = document.createElement("option"); 
newOption.value = "WBA";
newOption.text =  "WNBA"
mySelect.add(newOption, null)

newOption = document.createElement("option"); 
newOption.value = "MLB";
newOption.text =  "MLB"
mySelect.add(newOption, null)

newOption = document.createElement("option"); 
newOption.value = "UFC"
newOption.text =  "MMA"
mySelect.add(newOption, null)

newOption = document.createElement("option"); 
newOption.value = "RAP";
newOption.text =  "Argintina Soccer"
mySelect.add(newOption, null)

newOption = document.createElement("option"); 
newOption.value = "RMP";
newOption.text =  "Mexican Soccer"
mySelect.add(newOption, null)

newOption = document.createElement("option"); 
newOption.value = "RMLS";
newOption.text =  "US Soccer"
mySelect.add(newOption, null)

newOption = document.createElement("option"); 
newOption.value = "REE";
newOption.text =  "Euro 2008 "
mySelect.add(newOption, null)

newTD.appendChild(mySelect)
betmenu.snapshotItem(0).parentNode.appendChild(newTD)

var newBet = newBetLink.snapshotItem(0)
function myFunc (){
  var sel = document.getElementById("SportSelect")
  var sport = sel.options[sel.selectedIndex].value
  window.location = 'new_bet.php?sport_code=' + sport;
}


var betButton = document.createElement('img')
betButton.src = "http://images.centsports.com/newbet.jpg"
betButton.style.backgroundColor = 'white'


newBetLink.snapshotItem(0).parentNode .appendChild(betButton)
newBetLink.snapshotItem(0).parentNode .removeChild(newBetLink.snapshotItem(0));
betButton.addEventListener("click", function () { myFunc()}, false)


/******************************************************************************
 *   Normal self plug header
******************************************************************************/ 
if( ! document.getElementById('poweredBy')) {
    var poweredBy = document.createElement('div')
    poweredBy.style.position = 'fixed'
    poweredBy.id = 'poweredBy'
    poweredBy.style.backgroundColor = 'transparent'
    poweredBy.innerHTML = 'Like my scripts?  Become my  <a href="http://www.centsports.com/crony_invite_action.php?master_id=19322"> cronie.</a> - Puttzy'
    document.body.insertBefore(poweredBy, document.body.firstChild);
}
