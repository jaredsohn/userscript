// ==UserScript==
// @name           Avatars
// @namespace      GLB
// @include        http://test.goallineblitz.com/game/*
// ==/UserScript==

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
	return a;
};


function findId(test) {
	for (var i = 0; i < testsrv.length; i++) {
		if (test.innerHTML.indexOf('/game/user_pic.pl?user_id=' + testsrv[i], 0)>=0) {
			test.innerHTML = '<img height="75" width="75" src="http://goallineblitz.com/game/user_pic.pl?user_id=' +livesrv[i]+ '"/>'
			i = testsrv.length
		}
	}
}

var avatars = getElementsByClassName('user_avatar', document)
var testsrv = ['95', '96', '101', '90', '66', '98', '102', '97', '99', '103', '104', '81', '1"', '51', '53', '64', '59', '47', '44', '49', '50', '69', '80', '79', '77', '78', '68', '75', '72', '61', '43', '74', '62', '46', '73', '63', '41', '52', '65', '89', '85', '86', '91', '48', 94]
var livesrv = ['12326', '47620', '166733', '162810', '125583', '19047', '14554', '77041', '7129', '25628', '17609', '27825', '1', '354', '6581', '95635', '4053', '31092', '44366', '88', '60840', '41742', '4939', '11685', '173017', '179670', '14078', '57891', '83123', '1751', '18387', '4064', '211570', '20953', '65732', '43594', '40', '8093', '185161', '15911', '240281', '35283', '47254', '10', '371958']

for (var i = 0; i < avatars.length; i++) {
	findId(avatars[i])
}