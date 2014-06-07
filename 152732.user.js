// ==UserScript==
// @name        ETI Dice Roller
// @namespace   pendevin
// @description Makes it easy to roll dice and post the results on luelinks
// @include     http://endoftheinter.net/postmsg.php*
// @include     http://endoftheinter.net/inboxthread.php*
// @include     http://boards.endoftheinter.net/postmsg.php*
// @include     http://boards.endoftheinter.net/showmessages.php*
// @include     https://endoftheinter.net/postmsg.php*
// @include     https://endoftheinter.net/inboxthread.php*
// @include     https://boards.endoftheinter.net/postmsg.php*
// @include     https://boards.endoftheinter.net/showmessages.php*
// @include			http://rng.beginningoftheinter.net*
// @version     1
// ==/UserScript==

//xhtmlhttprequest handler
//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
var XHR={
	// r.doc is the returned page
	// r.respose is the response element
	createDoc:function(response,callback,optional){
		var doc=document.implementation.createDocument('','',null);
		var html=document.createElement("html");
		html.innerHTML=response.responseText;
		doc.appendChild(html);
		var r={};
		r.response=response;
		r.doc=doc;
		callback(r,optional);
	},

	//sends the XHR request, callback is the function to call on the returned page
	get:function(url,callback,optional){
		if(optional==undefined)optional=null;
		GM_xmlhttpRequest({
			method:'GET',
			url:url,
			headers:{
				'User-Agent': navigator.userAgent,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	}
}

//i totally improved this one
//variables that aren't present return null
//a variable with no value returns the true
function getUrlVars(urlz){
	//thanks for the function citizenray
	var vars=[];
	var hash="";
	var hashes=urlz.slice(urlz.indexOf('?')+1).split('&');
	for(var i=0;i<hashes.length;i++){
		hash=hashes[i].split('=');
		if(hash[1]!=null&&hash[1].indexOf("#")>=0)hash[1]=hash[1].substring(0,hash[1].indexOf("#"));
		if(hash[1]==undefined){
			hash[1]=true;
			if(hash[0].indexOf("#")>=0)hash[0]=hash[0].substring(0,hash[0].indexOf("#"));
		}
		vars.push(hash[0]);
		vars[hash[0]]=hash[1];
	}
	return vars;
}

//all the stuff that does things
function popomatic(){
	//handle the fun stuff
	function rollDice(){
		if(iterator>0){
			iterator--;
			XHR.get(url,function(r){
				var result={};
				result.value=r.doc.getElementById('box_index').textContent.match(/Your result: (\d+)/)[1];
				//ugh chrome
				var here=r.doc.getElementsByTagName('a')[0];
				if(here.href==''){
					document.getElementsByClassName('body')[0].appendChild(here);
					result.link='http://rng.beginningoftheinter.net/results.php#'+here.href.substring(44);
					here.parentNode.removeChild(here);
				}
				else
					result.link='http://rng.beginningoftheinter.net/'+r.doc.getElementsByTagName('a')[0].href;
				result.date=r.doc.getElementById('box_index').firstElementChild.textContent;
				unsafeWindow.console.log(0<result.value<values[2]+1);
				//results validation
				if(0<result.value<values[2]+1){
					results.push(result);
					total+=parseInt(result.value);
				}
				else
					iterator++;
				rollDice();
			});
		}
		//finish up
		else{
			//prepare the results
			var quick='';
			var dirty='';
			for(var i=0;i<results.length;i++){
				quick+='['+results[i].value+']';
				dirty+=results[i].date+' -> <b>'+results[i].value+'</b> ('+results[i].link+')\n';
			}
			//build the string
			var string=input+' -> <b>'+total+'</b> <spoiler caption="'+quick+(values[3]?values[3]:'')+'">\n'+dirty+'</spoiler>';

			//success junk
			roller.firstElementChild.value=string;
			roller.firstElementChild.focus();
			GM_setValue('lastRoll',input);
			roller.firstElementChild.placeholder=input;
			roller.lastChild.value='Clear';
			roller.lastChild.addEventListener('click',function clear(){
				roller.lastChild.removeEventListener('click',clear,false);
				roller.firstElementChild.value='';
				roller.firstElementChild.focus();
				roller.lastChild.value='Roll Dice';
				roller.lastChild.addEventListener('click',popomatic,false);
			},false);
		}
	}

	//we're loading
	roller.lastChild.value='Loading...';
	roller.lastChild.removeEventListener('click',popomatic,false);
	//parse input string
	var input=roller.firstElementChild.value==''?roller.firstElementChild.placeholder:roller.firstElementChild.value;
	//validation :3
	if(input.search(/^\d+d\d+(?:[\+-]\d+)?$/)==-1){
		roller.firstElementChild.value='Error Invalid Input!';roller.firstElementChild.placeholder=input;
		roller.lastChild.value='Clear';
		roller.lastChild.addEventListener('click',function clear(){
			roller.lastChild.removeEventListener('click',clear,false);
			roller.firstElementChild.value='';
			roller.firstElementChild.focus();
			roller.lastChild.value='Roll Dice';
			roller.lastChild.addEventListener('click',popomatic,false);
		},false);
	}
	else{
		//grab input values
		var values=input.match(/^(\d+)d(\d+)(?:([\+-]\d+))?$/);
		//build url
		var url='http://rng.beginningoftheinter.net/rng.php?user='+user+'&topicid='+topic+'&min=1&max='+values[2];
		//iterate the get requests
		var iterator=parseInt(values[1]);
		var results=[];
		var total=values[3]?parseInt(values[3]):0;
		rollDice();
	}
}

//insert the stuff
var roller=document.createElement('span');
roller.id='diceRoller';
roller.innerHTML='\
	<textarea rows="5" cols="20" wrap="off" id="diceRollerInput" style="width:136px;height:16px;margin:0;text-align:right;position:relative;top:3px;overflow-x:hidden;"></textarea>\
	<input type="button" id="diceRollerButton" value="Roll Dice">\
';
//default value is the last roll
roller.firstElementChild.placeholder=GM_getValue('lastRoll','1d20+0');
//the text box is in a different place on different pages
if(document.getElementsByClassName('quickpost-nub')[0])
	document.getElementsByClassName('quickpost-body')[0].appendChild(roller);
else if(document.getElementById('message'))
	document.getElementById('message').parentNode.appendChild(roller);

//get our permanent values and shit
var user=document.getElementsByClassName('userbar')[0].firstChild.textContent;
user=user.substring(0,user.indexOf(' ('));
var topic=getUrlVars(location.href)['topic'];

//time to roll the dice
roller.lastChild.addEventListener('click',popomatic,false);

//when you focus the text box, highlight everything
roller.firstElementChild.addEventListener('focus',function(e){
	e.target.selectionStart=0;
	e.target.selectionEnd=e.target.value.length;
	e.target.selectionDirection='backward';
},false);