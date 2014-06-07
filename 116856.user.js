// ==UserScript==
// @name           Spooky Hunter
// @description    Hunts all the spooky pumpkins
// @author         913
// @version        0.4
// @include        http://ncore.cc*
// ==/UserScript==


function startSpookyHunter(){
    client.addEvent('raw_postmsg', function(raw, pipe){
	if(raw.data.message['type']=='spo0ky'){
		console.log('Spooky!');
		var apeSID = raw.data.message['sid'];
        var apeSalt = raw.data.message['salt'];
        var apeEvent = raw.data.message['event'];
        var apeName = raw.data.message['name'];
        if(apeEvent=="good"){
        	spookyAjaxSubmit(apeSID, apeSalt);
        	console.log('Good spooky submitted.');
        }
	}
    });
}
setTimeout(startSpookyHunter,3000);