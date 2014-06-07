// ==UserScript==
// @name           The Neopian Lottery
// @namespace      Cody Woolaver
// @description    Fills in the lotto boxes with random numbers
// @include        http://www.neopets.com/games/lottery.phtml
// ==/UserScript==

/*
	USE THIS AT YOUR OWN DECRESSION.
	CHEATING IS AGAINST THE NEOPETS
	TOS AND I WILL TAKE NO PERSONAL
	RESPONSIBILITY IF YOUR ACCOUNT
	GETS FROZEN DUE TO THIS PROGRAM.
*/

shuffle = function(o){ //v1.0
	for(var j, x, i = o.length;	i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function randRange(min, max){
	var randomNum = Math.round( Math.random() * (max - min) ) + min;
	return randomNum;
}

function str(x){
	return x+"";
}

function gen(){
	a=randRange(1,30);b=randRange(1,30);c=randRange(1,30);
	d=randRange(1,30);e=randRange(1,30);f=randRange(1,30);
	
	while (a == b || a == c || a == d || a == e || a == f){a=allNums[randRange(0,29)];}
	while (b == a || b == c || b == d || b == e || b == f){b=allNums[randRange(0,29)];}
	while (c == a || c == b || c == d || c == e || c == f){c=allNums[randRange(0,29)];}
	while (d == a || d == b || d == c || d == e || d == f){d=allNums[randRange(0,29)];}
	while (e == a || e == b || e == c || e == d || e == f){e=allNums[randRange(0,29)];}
	while (f == a || f == b || f == c || f == d || f == e){f=allNums[randRange(0,29)];}
	
	return [a,b,c,d,e,f];
}
var allNums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
for(i = 0; i < randRange(10,1000); i++){
	allNums = shuffle(allNums);
}
nums = gen();

document.getElementsByName("one")[0].value   = str( nums[0] );
document.getElementsByName("two")[0].value   = str( nums[1] );
document.getElementsByName("three")[0].value = str( nums[2] );
document.getElementsByName("four")[0].value  = str( nums[3] );
document.getElementsByName("five")[0].value  = str( nums[4] );
document.getElementsByName("six")[0].value   = str( nums[5] );