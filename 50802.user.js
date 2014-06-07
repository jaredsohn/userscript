// ==UserScript==
// @name           Emoticons Pack for Ftalk
// @namespace      http://userscripts.org/scripts/show/48877
// @description    Easy to insert custom smiley (or emote) on Ftalk.
// @include        http://friendstertalk.com/*
// ==/UserScript==


// ********** Main Script ***********
var version_timestamp = 0;
var smileData = [];

smileData.push([
	'Ftalk',
	'http://friendstertalk.com/img/smilies/',
	[
	'smile.gif','nod.gif','neutral.gif','smirk.gif','frown.gif','cry.gif','tear.gif','biggrin.gif','badgrin.gif','lol.gif','eek.gif','shock.gif','wink.gif','slywink.gif','confused.gif','paranoid.gif','roll.gif','cool.gif','tongue.gif','mad.gif','angry.gif','disgust.gif','doubt.gif','evil.gif','redface.gif','unibrow.gif','retard.gif','wasted.gif','smoke.gif','ninja.gif','drool.gif','crybaby.gif','puke.gif','shit.gif','thumbsup.gif','thumbsdown.gif','arrow.gif','idea.gif','exclaim.gif','question.gif','rose.gif','norose.gif','kiss.gif','clock.gif','globe.gif','cake.gif','gift.gif','cloud.gif','thunder.gif','wow.gif','wallbash.gif','penguin.gif'
	],
	[
	':)','=)',':|','=|',':(',':cry:','=(',':D','=D',':lol:',':o',':O',';)',';]',':/',':paranoid:',':rolleyes:',':cool:',':P',':mad:',':angry:',':disgust:',':doubt:',':evil:',':redface:',':eh:',':retard:',':wasted:',':smoke:',':ninja:',':drool:',':crybaby:',':puke:','shit',':thumbsup:',':thumbsdown:',':arrow:',':idea:',':exclaim:',':question:',':rose:',':norose:',':kiss:',':clock:',':globe:',':cake:',':gift:',':cloud:',':thunder:',':wow:',':wallbash:',':penguin:'
	]
]);

smileData.push([
	'Smiley Lounge',
	'http://www.shoutoutlounge.com/images/smiley/',
	[
	'Smile.gif','Laugh.gif','HeeHee.gif','Wink.gif','Blek.gif','Bleh.gif','Nyek.gif','Angry.gif','Argue.gif','Sad.gif','Cry.gif','Touched.gif','Drool.gif','Shocked.gif','Scared.gif','Sweat.gif','Shy.gif','Wave.gif','Camwhore.gif','Onphone.gif','Hmm.gif','Eyebrown.gif','BigSmallEyes.gif','Notsure.gif','Confused.gif','Dunno.jpg','Aduh.gif','BangWall.gif','Rolleyes.gif.gif','Shifty.gif','Whistle.gif','Sing.gif','Cool.gif','Thumbsup.gif','Thumbsdown.gif','Nod.gif','Shake.gif','Yuck.gif','Yawn.gif','Sleep.gif','Tiphat.gif','Respect.gif','Clap.gif','Yahoo.gif','Whee.gif','Victory.gif','Success.gif','Strong.gif','MoneyFace.gif','Boxing.gif','Kungfu.gif','Punched.gif','InLove.gif','Sick.gif','Jab.gif','MondayBlue.gif','Study.gif','Console.gif','Sunbath.gif','Cuddle.gif','Friends.gif','bfgf.gif','Cheers.gif'
	],
	[
	':smile:',':laugh:',':hee:',':wink:',':blek:',':bleh:',':nyek:',':angry:',':argue:',':sad:',':crying:',':touched:',':drool:',':shocked:',':scared:',':sweat:',':shy:',':wave:',':camwhore:',':onphone:',':hmm:',':eyebrown:',':hypno:',':notsure:',':confused:',':dunno:',':aduh:',':bangwall:',':eyeroll:',':shifty:',':whistle:',':sing:',':kewl:',':good:',':bad:',':nod:',':shake:',':yuck:',':yawn:',':sleep:',':tiphat:',':respect:',':clap:',':yahoo:',':whee:',':v:',':success:',':strong:',':money:',':boxing:',':kungfu:',':punched:',':inlove:',':sick:',':jab:',':mblue:',':study:',':console:',':sunbath:',':cuddle:',':friends:',':bfgf:',':cheers:'
	]
]);

smileData.push([
	'Special',
	'http://i669.photobucket.com/albums/vv60/oriogami/',
	[
	'weee.gif','oath.png','blush.gif','ignore.gif','blah.gif','raiseroof.gif','boarder.gif','wahaha.gif','argh.gif','uhuh.gif','ewww.gif','yes_it_is.gif','faster.gif','poo.gif','bunny.gif','puke2.gif','peek.gif','rant.gif','rockon.gif','rules.gif'
	],
	[
	'(weee)','(oath)','(blush)','(ignore)','(blah)','(raiseroof)','(boarder)','(wahaha)','(argh)','(uhuh)','(ewww)','(yes_it_is)','(faster)','(poo)','(bunny)','(puke2)','(peek)','(rant)','(rockon)','(rules)'
	]
]);

var isinit = false;
var currInput = null;
var rplreg;
var pageState = location.href.split('/')[3];
addGlobalStyle('http://ct40.hammertorch.com/globalnav.css');

setTimeout(function()
{
        var selImgs = document.forms[0].getElementsByTagName('div')[3];
        if(selImgs.getElementsByTagName('a').length == 0){
        	selImgs = document.forms[0].getElementsByTagName('div')[4];
        }
        currInput = document.getElementsByName('req_message')[0];
        if(currInput.value != '') {
        	decodeSmile();
        }
        selImgs.innerHTML='<div id=\"emoticon_selecter\"><div id=\"emoticons_tabs\"><ul id=\"emoticons_show\"></ul><ul id=\"globalnav\"></ul></div></div>';
        
        var subm = document.getElementsByName('submit')[0];
        subm.addEventListener('click', function()
    	{
    		replaceSmile();
    	}, false);
    	var prevw = document.getElementsByName('preview')[0];
        prevw.addEventListener('click', function()
    	{
    		replaceSmile();
    	}, false);
        
        // create tabs
        isinit || setTimeout(init, 1000);
        ftalkUpdateCheck();
}, 2000);

function replaceSmile()
{
	var inptxt = currInput.value;
	for(var i=1; i<smileData.length; i++)
    {
    	var dta = smileData[i];
    	for(var z=0, dat = dta[3], imgs = dta[2]; z<dat.length; z++)
    	{
    		var burl = dta[1] + imgs[z];
    		inptxt = inptxt.replace(replaceReg(dat[z]),'[img]'+burl+'[/img]');
    	}
    }
    currInput.value = inptxt;
}

function decodeSmile()
{
	var inptxt = currInput.value;
	for(var i=1; i<smileData.length; i++)
    {
    	var dta = smileData[i];
    	for(var z=0, dat = dta[3], imgs = dta[2]; z<dat.length; z++)
    	{
    		var burl = dta[1] + imgs[z];
    		inptxt = inptxt.replace(new RegExp('\\[img\\]'+burl+'\\[/img\\]','gi'),dat[z]);
    	}
    }
    currInput.value = inptxt;
}

function replaceReg(altxt){
	altxt = altxt.replace(/\(/g,'\\(');
	altxt = altxt.replace(/\)/g,'\\)');
	altxt = altxt.replace(new RegExp('\\*','g'),'\\*');
	altxt = altxt.replace(new RegExp('\\|','g'),'\\|');
	altxt = altxt.replace(new RegExp('\\$','g'),'\\$');
	altxt = altxt.replace(new RegExp('\\^','g'),'\\^');
	
	areg = new RegExp(altxt,'gi');
	
	return areg;
}

// init
function init()
{
    isinit = true;
    // init contents
    for(var i=0; i<smileData.length; i++)
    {
        addTab(i, smileData[i]);
    }
    // init css
    getById('emoticons_show').style.width  = '100%';
    getById('emoticons_show').style.position = 'relative';
	getById('emoticons_show').style.paddingBottom = '0.81em';
}

function addTab(id, data)
{
    var myli = document.createElement('li');
    myli.className = 'emoticon_selecter';
    myli.id = 'smiletab'+id;
    myli.innerHTML = '<a href="javascript:void 0;" >'+data[0]+'</a>';
    myli.addEventListener('click', function()
    {
        addImages(this, id);
    }, false);

    getById('emoticons_tabs').getElementsByTagName('ul')[1].appendChild(myli);
    if(id==0) {
    	addImages(myli, id);
    }
}

function addImages(obj, ind)
{
    var showDiv = getById('emoticons_show');
    var lis = getById('emoticons_tabs').getElementsByTagName('li');
    for(var i=0; i<lis.length; i++)
        lis[i].className = 'emoticon_selecter';

    obj.className += ' current';

    var data = smileData[ind];
    var baseUrl = data[1];
    var str = '<li>';
    for(var i=0, dat = data[2], abv = data[3], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
		str += '<a href="javascript:insert_text(\''+abv[i]+'\', \'\');"><img src="'+_url+'" alt="'+abv[i]+'" style="padding-left:0.20em"/></a>';
    }
    str += '</li>';
    showDiv.innerHTML = str;
    
}

function getById(oid)
{
    return document.getElementById(oid);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    //style = document.createElement('style');
    style = document.createElement('link');
	style.href = css;
	style.type = 'text/css';
	style.rel = 'stylesheet';
    head.appendChild(style);
}

//
// Check for Updates (originally based on code by Jarett - http://userscripts.org/users/38602)
//
function ftalkUpdateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/50802?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " "). replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var upversion = parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]); if (upversion > version_timestamp) {showUpdatePopup(upversion);} else if (forced) {}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}}

function showUpdatePopup(upver) {
	input_box=confirm("A new update is available.\nClick OK to Install");
	if (input_box==true)
	{ 
		// Output when OK is clicked
		GM_openInTab('http://userscripts.org/scripts/source/50802.user.js');
	}
}