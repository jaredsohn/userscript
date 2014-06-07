// ==UserScript==
// @name           YouTube Auto Series, Play Next Video Script
// @namespace      vidzbigger.com
// @description    Automatically plays the next video based on sequential titles, supporting increasing detail such as Season III Episode 4 Part B
// @include        http://www.youtube.com/watch*
// ==/UserScript==

var version = 0.08;

// Any comercial use of any functionality should be compensated
// If you compensate me for use of this functionality I will 
// share your payment with any contributions that are involved

var maxRomanNumeral = 30;
var checkDoneRate = 5000; //5000 = 5 seconds
var intervalSpacing = 1000; // for multi part numbers (season 999 episode 999), how large can each of them be before overlap

// the check done rate is used since it is less reliable to attempt
// to attach a state change listener since it will reload 
// the player in the process and interrupt video

function _ge(e){
  return document.getElementById(e);
}

//grab current video title
var metas=document.getElementsByTagName('meta'),author,tit;
for(var i=0,l=metas.length;i<l;i++){
  if(metas[i].name=='title'){
    tit=metas[i].content;
  }else if(metas[i].name=='attribution'){
  	author=metas[i].content;
  }
}
//http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
function deromanize( roman ) {
  var roman = roman.replace(/\s/g,'').toUpperCase(),
      lookup = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000},
      arabic = 0,
      i = roman.length;
  while (i--) {
    if ( lookup[roman[i]] < lookup[roman[i+1]] )
      arabic -= lookup[roman[i]];
    else
      arabic += lookup[roman[i]];
  }
  return arabic;
}
function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
      roman = '',
      i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}//thanks to Iván -DrSlump- Montes

function prepNumbers(a){
	var rn,rexp;
	a=a.toUpperCase()+' ';
	
	//since some inconsistency is expected turn all like things
	// into the same string
  a=a.replace(/PART/g,'PT');
  a=a.replace(/EPISODE/g,'EP');
  
  //turn roman numerals into integers
  rn=a.match(/[^A-z0-9](M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))/g);// adapted from http://stackoverflow.com/questions/267399/how-do-you-match-only-valid-roman-numerals-with-a-regular-expression
	if( rn && rn.length > 0 ){
	  for( i=maxRomanNumeral; i>0; i-- ){
	  	a=a.replace(new RegExp("[^A-z0-9]"+romanize(i),"g")," "+i);
		}
  }
  
  //turn standalone letters A,B,C... into integers
  for(var l = 65; l < 91; l++ ){
	  var rexp = new RegExp("(([^A-z0-9])["+String.fromCharCode(l)+"](?=[^A-z0-9]))","g");
	  a = a.replace(rexp,' '+(l-64));
	}
	return a;
}

function computeNumericalValue(rmisb){//of array of numbers
  var tnum=0;
  if(rmisb && rmisb.length > 0){
  	var len=rmisb.length;
	  if(!isNaN(rmisb[0])) tnum+=(rmisb[0]-0);
	  for(var i=1;i<len;i++){
			if(!isNaN(rmisb[i])) tnum+= (rmisb[i]-0)/((i)*intervalSpacing)
	  }
	}
	return tnum
}

var zmisa,rmisa,nmisa;

function presetCompare(a){
	zmisa=a.match(/[A-z]+/g);
	rmisa=a.match(/[.\d]+/g);
	nmisa=rmisa;
	rmisa=computeNumericalValue(rmisa)
}

//the letters in the strings should be preped first using prepNumbers
function compareLetters(b){
  var zmisb,rmisb,nmisb;
  
  zmisb=b.match(/[A-z]+/g);
  rmisb=b.match(/[.\d]+/g);
  nmisb=rmisb;
  rmisb=computeNumericalValue(rmisb)

  //console.log(zmisb + '=' + zmisa+'='+zmisb.indexOf(zmisa)+'='+zmisa.indexOf(zmisb));
  
  if(rmisa&&rmisb && 
     zmisa&&zmisb && 
     zmisb[0]==zmisa[0] &&
     rmisa < rmisb
  ){
  	
  	  // if ... is a number then we can't rely on lengths
  	  var matchingWordScore=nmisa.length-nmisb.length;//matching number of numbers bonus is initial value
		  //console.log('zzz'+nmisb.length+ ' = '+nmisa.length);
		  for(var i=0,l=zmisb.length,ac=0;i<l;i++){
		  	if(zmisa[ac]==zmisb[i]){
		  		matchingWordScore++;
		  		ac++;
		  	}else{
		  		matchingWordScore--;
		  	}
		  }
		  
		  //console.log(rex + '=' + matchingWordScore);
  	  //console.log(zmisb.join(' ')+ ' '+matchingWordScore);
     	return rmisb-matchingWordScore;
	}
  return false;
}

function finda(n){
  if(n.parentNode&&n.parentNode.tagName!='A'){
    return finda(n);
  }
  return n.parentNode;
}

var found=[],fc=0;
var ti=document.getElementsByClassName('title')

function seekNextTrack(){
	presetCompare(prepNumbers(tit));
	for(var i=0,l=ti.length;i<l;i++){
		var tid = ti[i].title;
		posb=compareLetters(prepNumbers(tid));
		if(typeof(posb)!='boolean'){
			var hrf=finda(ti[i]).href;
			hrf = hrf.substr(0,hrf.indexOf('&'));
			if(!found[hrf]){
				found.push({nid:posb,href:hrf,title:tid,elem:ti[i]});
				fc++;
			}
		}
	}
}

function getJSobj(p){if(typeof(p.wrappedJSObject)!='undefined')return p.wrappedJSObject;return p;}

var th1='';
function testReadyToNav(){
  if(_ge('movie_player') && getJSobj(_ge('movie_player')).getPlayerState()===0){
  	//console.log('navigating to next video '+th1);
    window.location=th1
    
  }else{
    setTimeout(testReadyToNav,checkDoneRate);
  }
}

function startListening(){
	if(!_ge('movie_player')){
		setTimeout(startListening,10000);
		return;
	}
	getJSobj(_ge('movie_player')).addEventListener("onStateChange", onytplayerStateChange,false);
	//console.log('try2');
	//_ge('movie_player').addEventListener("onStateChange", onytplayerStateChange,false);
	//console.log('try3');

}

function onytplayerStateChange(s){
	if( s === 0 ){
		console.log('psc readynave');
		//testReadyToNav();
		window.location=th1
	}
  console.log(s)
}

function sortfunction(a, b){
	return (a.nid - b.nid) //causes an array to be sorted numerically and ascending
}

seekNextTrack();

if( fc>0 ){
	
  found.sort(sortfunction);
	
	//for( i in found){console.log(found[i].nid,found[i].href,found[i].title);found[i].elem.style.border="1px solid blue";}
	
  for( i in found){
		//found.push({nid:posb,href:hrf,title:tid,elem:ti[i]});
   th1=found[i].href;
   found[i].elem.parentNode.style.border="1px solid #FAC";
   found[i].elem.title+=' [selected as Next in Series]';
   try{	
    console.log('next video in series: ' + th1 + ' ' +(found[i].title?found[i].title:''));
   }catch(e){}
   break;
  }
  setTimeout(testReadyToNav,10000);
  setTimeout(startListening,10001);

}else if( fc==0 ){
  console.log('no next video in series found');
  
  // possibly we do a search here...
  
  //http://google.about.com/od/googlepowersearches/qt/numrange.htm
  //allintitle:the title episode 1..999 season * part *
  //does not really work :/
  
}else{
  console.log('no next video in series identified, conficts exist, report this video to script author qufighter[at]gmail[dot]com include this URL: '+ window.location.href);
}
