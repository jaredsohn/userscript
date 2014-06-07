// ==UserScript==
// @name       AUMAutoVisit
// @version    0.6.2
// @description  Effectuer une recherche sur adopte un mec, cliquer sur le bouton "Start Script" placé à côté de "Lancer la recherche"
// @include http://www.adopteunmec.com/mySearch*
// @copyright  2012+, Yremia
// @grant		   GM_getValue
// @grant		   GM_setValue
// @grant		   GM_deleteValue
// ==/UserScript==

var _currentPage = getURLParameter("page");
var _max = parseInt($('[class="pager-total"]:first').html());
var _curMax = parseInt($('[class="pager-max"]:first').html());
var _interval = 300;

function Profile(id){
    
    this.id = id;
    
    if(id && "" != id){
        // Find href, name, city, age, isInContact of the profil
        this.href = $('div[data-id="' + this.id + '"] .infos .actions .view a').attr('href');
        this.nickname = $('div[data-id="' + this.id + '"] h4').html();
        //this.city = $('div[data-id="' + this.id + '"] .city').html();
        //this.age = $('div[data-id="' + this.id + '"] .age').html();
        this.succed = false;
        this.contact = (1 == $('[data-id="' + this.id + '"] [class="favicon small"]').length) ? true : false;
        this.online = (1 == $('div[data-id="' + this.id + '"] a .pic span[class!="favicon small"]').length) ? true : false;
        
        this.setName = function(name){
        	$('div[data-id="' + this.id + '"] h4').html(name);
    	}
    } else {
        this = null;
    }
}

var _myArrayOfAnchor = {
    profiles: new Array(),
    currentIndex: 0,
    // Find Profils
    init: function(){
        var arrayOfProfiles = this.profiles = new Array();
        
        $('div[data-id]').each(function(i, e){
            arrayOfProfiles.push(new Profile($(e).attr('data-id')));
        });
        
        profiles = arrayOfProfiles;
        //console.log(arrayOfProfiles);
    },
    // Visit Next Profile
    visitNextProfile: function(){
        
        // AUMAutoVisit activated and current index < number of profiles
    	if(true == GM_getValue("AUMAutoVisit") && _myArrayOfAnchor.currentIndex < _myArrayOfAnchor.profiles.length){
            var profile = _myArrayOfAnchor.profiles[_myArrayOfAnchor.currentIndex];
            if(false == profile.contact && profile.online){ // If Not in contact, visit profil
                console.log(_myArrayOfAnchor.currentIndex + " : START " + profile.href);
                
                // SEND REQUEST FOR VISIT
            	var request = $.get(profile.href, _myArrayOfAnchor.visitedProfile);
                // IF REQUEST FAIL
                request.fail(_myArrayOfAnchor.visitNextProfile);
            } else { // If in contact or offline go to next contact
                console.log(profile);
                if(!profile.online){
                    profile.setName("OFFLINE !");
                } else if(profile.contact){
                    profile.setName("IN CONTACT !");
                }
            	_myArrayOfAnchor.currentIndex++;
                _myArrayOfAnchor.visitNextProfile();
            }
        } else {
            if(true == GM_getValue("AUMAutoVisit") && _curMax < _max){
                console.log("TODO NEXT PAGE !");
                _currentPage++;
                document.location = "http://www.adopteunmec.com/mySearch/?page=" + _currentPage;
            } else {
            	GM_setValue("AUMAutoVisit", false);
            }
        }
	},
    // After Visit a profil start visitNextProfile
    visitedProfile: function(){
        var profile = _myArrayOfAnchor.profiles[_myArrayOfAnchor.currentIndex];
        console.log(_myArrayOfAnchor.currentIndex + " : END " + profile.href);
        profile.succed = true;
        profile.setName("DONE !");
        _myArrayOfAnchor.currentIndex++;
        setTimeout(_myArrayOfAnchor.visitNextProfile, _interval);
    }
}

setTimeout(function(){
    
    if(_currentPage == 1){
    	GM_setValue("AUMAutoVisit", false);
    }
    
    // New Sarch
    if(false == GM_getValue("AUMAutoVisit") && _currentPage >= 1 && _curMax <= _max){
        _myArrayOfAnchor.init();
        $(".search-buttons").append('<button id="AUMAutovisitButton" type="button" class="btn medium"><span class="left"><span class="content">Start Script</span></span></button>');
        $('#AUMAutovisitButton').click(AUMAutovisitStart);
    } 
    // Page Between 1 AND 16
    else if(GM_getValue("AUMAutoVisit") && _currentPage >= 1 && _curMax <= _max){
        _myArrayOfAnchor.init();
        $(".search-buttons").append('<button id="AUMAutovisitButton" type="button" class="btn medium"><span class="left"><span class="content">Stop Script</span></span></button>');
        $('#AUMAutovisitButton').click(AUMAutovisitStop);
        _myArrayOfAnchor.visitNextProfile();
    } else {
        GM_setValue("AUMAutoVisit", false);
    }
}, 1000);


// On click button, Start Script
function AUMAutovisitStart(){
    GM_setValue("AUMAutoVisit", true);
    $('#AUMAutovisitButton').unbind('click').click(AUMAutovisitStop)
    $('#AUMAutovisitButton .content').html("Stop Script");
    _myArrayOfAnchor.visitNextProfile();
}

// On click button, Strop Script
function AUMAutovisitStop(){
    GM_setValue("AUMAutoVisit", false);
    $('#AUMAutovisitButton').unbind('click').click(AUMAutovisitStart);
    $('#AUMAutovisitButton .content').html("Start Script");
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}