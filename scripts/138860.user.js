// ==UserScript==
// @id             9302
// @name           Shitpost Remover
// @version        1.0
// @namespace      shitpostremover
// @author         Sir Johnson
// @description    Removes shitposts.
// @include        https://boards.4chan.org/*
// @run-at         document-end
// ==/UserScript==

//Options
var DETECT_WEEABOOS = true;
var REPLACE_THUMBNAILS =false;
var REMOVE_TRIPCODES = true;

//Filter words
var shitpostWords= ['mericans clap','clap','lol',':DD','lmao','xD','XDD','autism','/reddit/',' le ','yuropoor','viral','amerifat'];
var weeabooWords =['kun','-kun','-san ','-tan ','kawaii','waifu','otaku'];
//
var words = ['Genius!','Incredible!','How splendid!','Good show.', 'What a pleasant surprise.', 'Exquisite.', 'Absolutely astounding.','Astonishing!'];
var names =['Sperg','Thed Ick','G.Entoo','Autisticus','Frederick',' George','Harold',' Jonathan',' Sherlock',' Albert',' Francis',' Theodore','William',' Richard',' Stanford',' Humphrey',' Nicholas',' Oswald',' Winston','Jeremy',' Leonard','Dudley'];
var prefixes = ['Sir ','King ','Lord ','Mr. ','Prof. ','Capt. ','Rev. ','Dr. ','Emperor ','','',''];
var suffixes =[' the Third',' the Second',' the Great',' of Autistica','',' the First',' the Magnificient',' the Fabulous',' the Wise',' the Fool'];
var insults = [' greasy eye-offending cutpurse!',' craven fat-kidneyed mammet!',' knavish fly-bitten maggot-pie!',' roguish toad-spotted rabbit-sucker!',' spleeny lean-witted pantaloon!',' sottish flap-mouthed mammet!',' currish tickle-brained snipe!',' vain fool-born minnow!',' fawning weather-bitten boar-pig!',' lewd lean-witted lout!',' gnarling white-livered miscreant!',' tottering lily-livered crutch!',' quailing motley-minded measle!',' jarring shrill-gorged clack-dish!',' puny ill-nurtured pumpion!',' clouted heavy-handed codpiece!',' surly motley-minded rampallion!',' bootless paper-faced minnow!',' pribbling ill-nurtured hedge-pig!',' roynish shrill-gorged giglet!',' saucy flap-mouthed rudesby!',' purpled shrill-gorged hedge-pig!',' queasy evil-eyed malt-worm!',' beslubbering empty-hearted malkin!',' mewling elf-skinned jolthead!',' impertinent folly-fallen nut-hook!',' infectious earth-vexing baggage!'];
//Get elements
var authors = document.getElementsByClassName("name");
var trips = document.getElementsByClassName("postertrip");
var messages = document.getElementsByClassName("postMessage");
var thumbs = document.getElementsByClassName("fileThumb");

//QUALITY FUNCTION NAME
function getWords()
{
    return words[Math.floor(Math.random()*words.length)];
}
//
function getInsult()
{
    return insults[Math.floor(Math.random()*insults.length)];
}
//
function generateName()
{
  var _s = prefixes[Math.floor(Math.random()*prefixes.length)];
  _s+=names[Math.floor(Math.random()*names.length)];
  _s+=suffixes[Math.floor(Math.random()*suffixes.length)];
  return _s;
}

//Replace all thumbnails
if (REPLACE_THUMBNAILS)
{
    for (var t =0;t<thumbs.length;++t)
    {
        var thumb = thumbs[t];
        thumb.innerHTML = '<img src="http://chanarchive.org/content/2_v/131489780/1330832070304.jpg" " style="height: 100px; width: 100px;"/>';
    }
}
//Detect shitposts
for (var i = 0; i < messages.length; i++)
{
	var msg = messages[i];
    var text = msg.innerHTML;
    text = text.toLowerCase();
    
    for (var j =0;j<shitpostWords.length;++j)
    {
     if (text.indexOf(shitpostWords[j])!=-1)
        {
	        msg.innerHTML= 'Good sir, I am a'+getInsult()+'<br>'+getWords()+'</br>';
	    }
	 }
	 if (DETECT_WEEABOOS)
	 {
    	for (var k =0;k<weeabooWords.length;++k)
        {
           if (text.indexOf(weeabooWords[k])!=-1)
           {
    	       msg.innerHTML= 'My good man, I am a weeaboo and a'+getInsult()+'.<br>'+getWords()+'</br>';
    	   }
    	}
    }
}

//Replace names
for (var j =0;j<authors.length;++j)
{
    var author = authors[j];  
if (author.innerHTML!='Anonymous')
{
author.innerHTML = generateName();
}
}
//Remove tripcodes
if (REMOVE_TRIPCODES)
{
    for (var h =0;h<trips.length;++h)
    {
        var trip = trips[h]; 
        trip.innerHTML = "";
    }
}