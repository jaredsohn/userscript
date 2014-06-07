// ==UserScript==
// @name       Babblesex Hide Fake Profiles
// @namespace  http://userscripts.org/users/477842
// @version    0.2.4
// @description  Removes known fake spam profiles from the babblesex.com profile list... 
// @match      http://www.babblesex.com/
// @match      http://www.babblesex.com/?page=*
// @match      http://www.babblesex.com/profiles?*
// @match      http://www.babblesex.com/members_browsing*
// @match      http://www.babblesex.com/members_chatting
// @copyright  none
// ==/UserScript==

function getElementsByXPath(expression, node){
  if (!node) { node = document; }
  var result = new Array();
  var xpathResult;
  var nsResolver = node.createNSResolver( node.ownerDocument == null ? node.documentElement : node.ownerDocument.documentElement);
  xpathResult = node.evaluate(expression, node, nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  var node;
  while (node = xpathResult.iterateNext()){
    result.push(node);
  }
  return result;
}

function hide(array){
    if (array.length > 0) {
    	for (var i = 0; i < array.length; i++) {
			array[i].style.display = "none";
		}
	}
}

function qAND(){

    var argumentsLength = arguments.length;
    var  output = " " + arguments[0];
    
    if(argumentsLength < 2){return arguments[0]; }
    
    for (var i=1; i < argumentsLength; i++) {
        output += "]  and descendant::text()[" + arguments[i];
    }
    return output + " ";
}

function qOR(){
    var argumentsLength = arguments.length;
    var  output = "( " + arguments[0];
    
    if(argumentsLength < 2){return arguments[0]; }
    
    for (var i=1; i < argumentsLength; i++) {
        output += " or " + arguments[i];
    }
        
    return output + " )";
}

function qContains(string){
    return "contains(.,'"+string+"') ";
}

function removeProfileByText(string){
    hide(getElementsByXPath("//dl[@class='message' and descendant::text()[contains(.,'"+string+"')]]/ancestor::div[starts-with(@id,'user_profile')]"));
}

function removeProfileByTextLogic(string){
    hide(getElementsByXPath("//dl[@class='message' and descendant::text()["+string+"]]/ancestor::div[starts-with(@id,'user_profile')]"));
}

function removeProfileByLink(string){
    hide(getElementsByXPath("//a[contains(@href, '"+string+"')]/ancestor::div[starts-with(@id,'user_profile')]"));
}

function removeProfileByBlock(){
    hide(getElementsByXPath("//button[starts-with(@id, 'user_action_block_button') and contains(.,'Unblock')]/ancestor::div[starts-with(@id,'user_profile')]"));
}

// remove the spam profiles...
// functions are casesensitive!
removeProfileByText('No credit card');
removeProfileByText('no credit card');
removeProfileByText('flagging me. All');
removeProfileByText('1nighters');
removeProfileByText('? "I believe in pink');
removeProfileByText('imaginative bloke who');
removeProfileByText('physicalhookups');
removeProfileByText('NAWTYLUVA4U');
removeProfileByText('peaches.bubble');
removeProfileByText('TIGHTWETPUSSY69');
removeProfileByText('like chatting (cam 2 cam is ok too) and talk. I’m here for 100% fun');

removeProfileByTextLogic(
	qOR( 
		qContains('18 f uk - sellin'), 
		qContains('Selling pics and show ~ Skype') 
	)
);

removeProfileByTextLogic(
	qOR( 
		qContains('Come, join me there if you'), 
		qContains('Come join me if you would') 
	)
);

removeProfileByTextLogic(
	qAND(
		qOR( qContains('WTF is actually goin'), qContains('WTF is goin on'), qContains('What the f**k is') ),
		qContains('do the same'),
		qOR( qContains('been deleted'), qContains('been de') , qContains('someone tell me just') , qContains('suddenly been'))
	)
);
 

removeProfileByLink('localdates');
removeProfileByLink('findadate');
removeProfileByLink('rude.69.mu');
removeProfileByLink('redlightcenter');
removeProfileByLink('sexxxprofiles');
removeProfileByLink('demosentialdesign');
removeProfileByLink('kinkydates');
removeProfileByLink('hookupnow');


// remove already blocked profiles
removeProfileByBlock();