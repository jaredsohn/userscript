// ==UserScript==
// @name           SOPython saladizer
// @namespace      chat.stackoverflow.com
// @description    Saladizer plugin for SOPython chat room on stackoverflow
// @include        http://chat.stackoverflow.com/rooms/6/python
// ==/UserScript==

String.prototype.format = function(obj) {
	var t = this.toString();
	for(key in obj){
		var val = obj[key];
		t = t.replace( new RegExp( "\\b" + key + "\\b", "gm" ), val )
	}
	return t;
}
var salad = {
	'hi|back':'cbg',
	'hello':'Cabagge',
	'brb|afk':'rbrb',
	'goodbye':'Rhubarb',
	'How are you\\?':'potato?',
	'sorry':'sprouts',
	'good':'banana',
	'awesome':'bananas',
	'bad':'bean',
	'horrible':'beans',
	'fuck':'yam',
	'bitch':'tomato',
	'thanks|thank you':'melon',
	'you ?(a|\\\')re welcome':'watermelon',
	'ladies':'peaches',
	'gents|gentlemen':'pears',
	'(i )?dunno':'mushroom',
	'(i )?don\\\'t know':'mushrooms',
	'(i )?agree|(i )?like (it|that)|yes':'avocado',
	'no|(i )?disagree|(i )?do( not |nt |\\\'nt )?like(it|that)':'carrot',
	'assistance|help|how do i\\?':'asparagus',
	'brain fart|writers block|confus(ed|i(ng|on))|makes no sense':'[black eyed] peas',
	'what( do yo mean)?\\??':'lettuce?',
	'dafuq\\??|wtf\\??|are you (joking?|kidding?|serious)\\??':'artichoke'
};
var unsalad = {
	'cbg': 'hi',
	'cabbage': 'Hello',
	'rbrb':'afk',
	'rhubarb':'Goodbye',
	'potato\\?':'How are you?',
	'sprouts':'sorry',
	'banana':'good',
	'bananas':'awesome',
	'bean':'bad',
	'beans':'horrible',
	'yam':'fuck',
	'tomato':'bitch',
	'melon':'thank you',
	'watermelon':'you are welcome',
	'peaches':'ladies',
	'mushroom':'dunno',
	'mushrooms':'i don\'t know',
	'avocado':'i agree',
	'carrot':'i disagree',
	'asparagus':'assistance',
	'(black eyed )?peas':'that makes no sense',
	'lettuce\\?':'what do you mean',
	'artichoke\\?':'are you joking?'
};
var $bt, $input, $useSalad;
var setup = function(){
    $bt = $('#sayit-button');
    $input = $('#input');
    $useSalad = $('<input type="checkbox" />');
    $useSaladCont = $('<div><span class="check"></span>I am vegan!</div>');
    $useSaladCont.find('.check').append($useSalad);
    $('#chat-buttons').append($useSaladCont);
    prependEvent($bt,'click',function(e){
    	if(saladEnabled())toSalad();
    });
    
    prependEvent($input,'keydown',function(e){
    	if(e.keyCode == 13 && saladEnabled() )toSalad();
    });
    $('#chat').on('monologue-updated',function(e){
        if(!saladEnabled())return;
    	var msg = $(this).find('.messages:last .message:last .content');
    	var txt = msg.text();
    	msg.text(txt.format(unsalad));
    });
}
var toSalad = function(){
	var txt = $input.val();
	$input.val(txt.format(salad));
};
var prependEvent = function(obj,type,event){
	obj.bind(type,event);
	var events = obj.data('events');
	var e = events[type].splice(-1);
	events[type].unshift(e[0]);
	obj.data('events',events);
};
var saladEnabled = function(){
    return $useSalad.is(':checked');
}
setup();