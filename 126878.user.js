// ==UserScript==
// @name					ETI Ketchup
// @namespace			pendevin
// @description		Helps you catch up in topics by searching for phrases in a user-defined wordlist. Based on shaldengeki's script.
// @include				http://boards.endoftheinter.net/showmessages.php*
// @include				https://boards.endoftheinter.net/showmessages.php*
// ==/UserScript==

//
//BEGIN USER DEFINED VARIABLES
//

//separate the terms you want to search for by a comma followed by a space (", ")
//this isn't case sensitive
//e.g. 'picked up, i am a giant faggot, fuck, douchecock'
const SEARCHTERMS='';

//separate the user names you want to catch up to with a comma followed by a space (", ")
//this isn't case sensitive
//e.g. 'llamaguy, big cow, alveron, shaldengeki, pendevin'
const USERNAMES='';

//set to true to ignore headers of quoted messages
const IGNOREQUOTEHEADS=true;

//set to true to ignore entire quote text (includes headers)
const IGNOREQUOTES=false;

//set to true to ignore signatures
const IGNORESIGS=true;

//
//END USER DEFINED VARIABLES
//


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

//escapes strings for the RegExp constructor
function reEscape(str){
	var specials=new RegExp("[.*+?|()\\[\\]{}\\\\]","g"); // .*+?|()[]{}\
	return str.replace(specials,"\\$&");
}

//executes a function with the document as its parameter, and adds a listener for a livelinks post which executes the function with that post as a parameter
//the only parameter of the function you feed this should be a DOM node
function livelinks(func){
	document.addEventListener(
		'DOMNodeInserted',
		function(e){if(e.target.firstChild&&e.target.firstChild.className=='message-container')func(e.target);},
		false
	);
	func(document);
}

//marks posts that match the search terms
function processPage(place){
	var terms=SEARCHTERMS.split(', ');
	var users=USERNAMES.split(', ');
	var messages=place.getElementsByClassName('message');
	for(var i=0;i<messages.length;i++){
		//remove sigs
		if(IGNORESIGS)
			var messageText=messages[i].textContent.match(/([\s\S]+)\n---\n/)?messages[i].textContent.match(/([\s\S]+)\n---\n/)[1]:messages[i].textContent;
		//quotes
		var quotes=messages[i].getElementsByClassName('quoted-message');
		for(var j=0;j<quotes.length;j++){
			//remove quote message and header
			if(IGNOREQUOTES)
				messageText=messageText.replace(quotes[j].textContent,'');
			//remove quote header
			if(IGNOREQUOTEHEADS)
				messageText=messageText.replace(quotes[j].firstChild.textContent,'');
		}
		//search terms filter
		for(var j=0;j<terms.length;j++){
			//if you clicked on the (+xx) link, this ignores messages before your starting point
			if(location.hash.match(/#m\d+/)&&parseInt(messages[i].parentNode.parentNode.parentNode.parentNode.id.substring(1))<parseInt(location.hash.substring(2)))
				break;
			if(messageText.match(new RegExp('\\b'+reEscape(terms[j])+'\\b','i'))){
				ketchupPosts.push(messages[i]);
				break;
			}
		}
		//user names filter
		if(ketchupPosts[ketchupPosts.length-1]!==messages[i]){
			for(var j=0;j<users.length;j++){
				if(messages[i].parentNode.parentNode.parentNode.parentNode.firstChild.firstElementChild.nextElementSibling.textContent.match(new RegExp('^'+users[j],'i'))){
					ketchupPosts.push(messages[i]);
					break;
				}
			}
		}
	}
}

function initKetchup(){
	//create menubar
	ketchup.className='menubar';
	ketchup.id='ketchupBar';
	ketchup.innerHTML='<span id="ketchupClose">Finish Ketchup</span> | <span id="ketchupNext">Next Post</span>';
	document.getElementsByClassName('body')[0].appendChild(ketchup);
	document.getElementById('ketchupClose').addEventListener('click',finishKetchup,false);
	document.getElementById('ketchupNext').addEventListener('click',nextPost,false);
	//create indicator arrow
	arrow.id='ketchupArrow';
	arrow.innerHTML='\u21db';
	arrow.style.display='none';
	document.getElementsByClassName('message-top')[0].appendChild(arrow);
	//are we continuing?
	if(catching.match(new RegExp(get['topic']+', ')))
		nextPost();
	else
		GM_setValue('catching',catching+get['topic']+', ');
}

function finishKetchup(){
	//remove ketchup bar
	ketchup.parentNode.removeChild(ketchup);
	//remove indicator arrow
	arrow.parentNode.removeChild(arrow);
	//remove topic id from catching
	var caught=GM_getValue('catching','').replace(get['topic']+', ','');
	GM_setValue('catching',caught);
	catching=caught;
	//reset catchup position
	currentPost=0;
}

function nextPost(){
	if(currentPost<ketchupPosts.length){
		var messageTop=ketchupPosts[currentPost].parentNode.parentNode.parentNode.parentNode.firstChild;
		//scroll currentPost into view
		messageTop.scrollIntoView(true);
		//move indicator arrow '\u21d3'
		arrow.parentNode.removeChild(arrow);
		messageTop.appendChild(arrow);
		arrow.style.display='inline';
		//and increment currentPost
		currentPost++;
	}
	//else if it's the last on the page, advance page or finish ketchup
	else{
		var nextPage=document.getElementById('u0_3').lastChild;
		//if we're advancing the page
		if(nextPage.nodeName=='A')
			window.location=(get['page']?window.location.href.replace(/page=\d+/,'page='+(parseInt(get['page'])+1)):window.location.href+'&page=2').replace(location.hash,'');
		//else if we're done
		else if(nextPage.nodeName=='#text'){
			//scroll to the bottom of the page
			if(document.body.scrollHeight-window.innerHeight>0)
				window.scrollTo(0,document.body.scrollHeight-window.innerHeight);
			finishKetchup();
		}
	}
}

var get=getUrlVars(location.href);
var ketchupPosts=[];
var ketchup=document.createElement('div');
var arrow=document.createElement('span');
var currentPost=0;
var catching=GM_getValue('catching','');
livelinks(processPage);
if(catching.match(new RegExp(get['topic']+', '))||location.hash.match(/#m\d+/))
	initKetchup();
GM_registerMenuCommand('Start ETI Ketchup on This Page',initKetchup,'K');

var css='\
		#ketchupBar{\
			position:fixed;\
			bottom:7px;\
			width:-moz-available;\
			margin-right:9px;\
		}\
		#ketchupClose, #ketchupNext{\
			cursor:pointer;\
			text-decoration:underline;\
		}\
		#ketchupArrow{\
			position:absolute;\
			left:1px;\
			margin-top:-2px;\
			font-weight:bold;\
		}\
	';
GM_addStyle(css);