// ==UserScript==
// @name          Bing Rewards Clicker
// @namespace     http://use.i.E.your.homepage/
// @version       0.1
// @description   Automagically click the links on the Bing.com homepage to get rewards.
// @updateURL     http://snowwolf.org/grease/bingclicker.js
// @downloadURL   http://snowwolf.org/grease/bingclicker.js
// @include       /^https?://.*bing\.com/(\?.*)?$/
// @include       /^https?://.*bing\.com/search(\?.*)?$/
// @include       /^https?://.*bing\.com/images/search(\?.*)?$/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @copyright     2013+, SnowWolf
// ==/UserScript==

function main() {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    document.body.appendChild(script);
    
    if (cookieIsDone()) {
        return;
    } else if (cookieIsRunning()) {
        window.setTimeout( runMainSearch, 2000 );
    } else {
        console.log("BINGer URL: " + document.URL);
        makeRunCookie();
        
        runExtraLinks();
        runFirstRandom();
    }
}

function runMainSearch() {
    console.log("BINGer: rMS");
    images = RegExp('bing.com\/images\/');
    search = RegExp('bing.com\/search\?');
    mains = RegExp('bing.com\/\??');
    if (images.test(document.URL)) {
        console.log('BINGer: rMS, Images variant')
        
        ll = $('#rr_rt>a')
        if (ll.length == 0) {
            console.log("BINGer: rMS; No image suggestions. Using random word");
            setRandomSearch();
            return;
        }
        
        llc = Math.floor(Math.random()*ll.length)
        lle = ll[ llc ]
        lls = lle.innerText.trim()
        llw = new Object;
        llw.Word = lls;
        RandomWordComplete(llw);
    } else if (search.test(document.URL)) {
        console.log('BINGer: rMS, Search variant');
        ul = $('.b_ans>.b_vList');
        console.log('ul type: '+typeof(ul))
        console.log('ul:')
        console.dir(ul)
        if ((ul != null) && ('children' in ul) && (ul.children.length > 0)) {
            ulc = ul.children();
            console.dir(ulc)
            ull = ulc[ Math.floor(Math.random()*ulc.length) ];
	        console.log('ull type: '+typeof(ull))
    	    console.log('ull:')
            console.dir(ull)
            // ula = ull.children[0];
            ulw = new Object;
            ulw.Word = ull.innerText;
            RandomWordComplete(ulw);
        } else {
            console.log("BINGer: rMS; No search suggestions. Using random word");
            setRandomSearch();
        }
        
    } else {
        console.log('BINGer: rMS, Unknown page');
    }
}

function runFirstRandom() {
    console.log("BINGer: rFR");
    setRandomSearch();
}

function runExtraLinks() {
    console.log("BINGer: rEL");
    try {
		bep = $('#bepfo')[0].getElementsByTagName('iframe')[0].contentDocument;
      	offers = bep.getElementsByClassName('offerwrapper');
        offer1 = offers[0].getElementsByClassName('offertitle')
        console.log('first bep');
    } catch (e) {
        console.log('retry bep');
      	$('#bep').click().click();
        window.setTimeout(runExtraLinks, 1500);
        return;
    }
    console.log('Offers: '+offers.length)
    for (var i=0;i<offers.length;i++) {
        // console.log(offers[i].innerHTML)
    	var offerName = offers[i].getElementsByClassName('offertitle')[0].innerText;
        var offerLink = offers[i].getElementsByTagName('a')[0].href;
        console.log('Offer '+i+': '+offerName);
        var nameRe = /Earn [0-9]+ credit/i;
        var nameRe2 = /done/i;
        var linkRe = /\/rewardsapp\/redirect/i;
        console.log('Name: '+offerName);
        if (linkRe.test(offerLink) & !nameRe2.test(offerName)) {
            jQuery('<iframe>', {src:offerLink}).appendTo(document.body);
            console.log('Appended: '+offerLink);
        }
        // /rewardsapp/redirect
    }
    
    console.log("BINGer: rEL");
}

function makeRunCookie() {
    setCookie("binger_running",1);
    console.log("BINGer: mRC");
}

function makeDoneCookie() {
    console.log("BINGer: mDC");
}

function cookieIsDone() {
    console.log("BINGer: cID");
}

function cookieIsRunning() {
    console.log("BINGer: cIR");
    coo = getCookie("binger_running");
    return coo == "1";
}


function setCookie(name,value,days) { 
    var date = new Date(); 
    if (days) { 
        date.setTime(date.getTime()+(days*24*60*60*1000)); 
    } else {
        date.setTime(date.getTime()+(24*60*60*1000));
        date.setHours(0);
        date.setMinutes(5); // 5 minutes after midnight
    }
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/"; 
}

function getCookie(name) { 
    var nameEQ = name + "="; 
    var ca = document.cookie.split(';'); 
    for(var i=0;i < ca.length;i++) { 
        var c = ca[i]; 
        while (c.charAt(0)==' ') c = c.substring(1,c.length); 
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); 
    } 
    return null; 
}

function deleteCookie(name) { 
    setCookie(name,"",-1); 
}

window.setRandomSearch = function() {

	var randomSource = "http://randomword.setgetgo.com/get.php";
    $.ajax({
                url: randomSource,
                jsonpCallback: 'window.RandomWordComplete',
                dataType: 'jsonp',
                success: function(json) {
                    var randomNumber = Math.floor(Math.random()*(15000-3000)) + 5000,
                        randomWord = json.Word.trim();
                    if($('.results').length < 1) {
                        randomNumber = 2000;
                    }
                    
                    console.log("BINGer: Word: " + randomWord + " Time: " + randomNumber);
                    
                    setTimeout(function(){
                        $("#sb_form_q").val(randomWord);
                        $("#sb_form_go").click();
                    }, randomNumber);
                },
                error: function(e) {
                    console.log(e.message);
                }
            });
}

function RandomWordComplete(data) {
    var randomNumber = Math.floor(Math.random()*(15000-3000)) + 5000
    var randomWord = data.Word.trim();
    console.log("BINGer: Word: " + randomWord + " Time: " + randomNumber);
    setTimeout(function(){
        $("#sb_form_q").val(randomWord);
        $("#sb_form_go").click();
    }, randomNumber);
}

var RWC = document.createElement('script');
RWC.setAttribute('type','text/javascript');
RWC.text = RandomWordComplete.toString()
document.body.appendChild(RWC);

main();