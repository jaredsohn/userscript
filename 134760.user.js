// ==UserScript==
// @name        cropped user script
// @namespace   maloi_user_script_ft
// @description test desciption
// @include     http://ftalk.us/*
// @version     1.0
// ==/UserScript==

// ********** Main Script ***********
addGlobalStyle('http://ct40.hammertorch.com/globalnav.css');
var script = document.createElement("script");
script.textContent = "var version_timestamp = 6;\nvar smileData = [];\nvar isinit = false;\nvar currInput = null;\nvar rplreg;\nvar pageState = location.href.split('/')[3];\n$(\".infldset\").find(\"a:first\").parent().html('<div id=\"emoticon_selecter\"><div id=\"emoticons_tabs\"><ul id=\"emoticons_show\"></ul><ul id=\"globalnav\"></ul></div></div>');\ninit();";
addScr(init);
addScr(addTab);
addScr(addImages);
addScr(getById);
document.body.appendChild(script);

function addScr(callback) {
	var script = document.createElement("script");
	script.textContent = callback.toString();
	document.body.appendChild(script);
}

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
alert('initializing');
smileData.push([
	'Ftalk',
	'http://ftalk.us/img/smilies/',
	[
	'smile.gif','nod.gif','neutral.gif','smirk.gif','frown.gif','cry.gif','tear.gif','biggrin.gif','badgrin.gif','lol.gif','eek.gif','shock.gif','wink.gif','slywink.gif','confused.gif','paranoid.gif','roll.gif','cool.gif','tongue.gif','mad.gif','angry.gif','disgust.gif','doubt.gif','evil.gif','redface.gif','unibrow.gif','retard.gif','wasted.gif','smoke.gif','ninja.gif','drool.gif','crybaby.gif','puke.gif','shit.gif','thumbsup.gif','thumbsdown.gif','arrow.gif','idea.gif','exclaim.gif','question.gif','rose.gif','norose.gif','kiss.gif','clock.gif','globe.gif','cake.gif','gift.gif','cloud.gif','thunder.gif','wow.gif','wallbash.gif','penguin.gif'
	],
	[
	':)','=)',':|','=|',':(',':cry:','=(',':D','=D',':lol:',':o',':O',';)',';]',':/',':paranoid:',':rolleyes:',':cool:',':P',':mad:',':angry:',':disgust:',':doubt:',':evil:',':redface:',':eh:',':retard:',':wasted:',':smoke:',':ninja:',':drool:',':crybaby:',':puke:','shit',':thumbsup:',':thumbsdown:',':arrow:',':idea:',':exclaim:',':question:',':rose:',':norose:',':kiss:',':clock:',':globe:',':cake:',':gift:',':cloud:',':thunder:',':wow:',':wallbash:',':penguin:'
	]
]);

smileData.push([
	'Plurkoy',
	'http://ct40.hammertorch.com/plurk/',
	[
	'joyful.gif','lol.gif','bleh.gif','woot.gif','surprised.gif','grr.gif','crying.gif','sick.gif','annoyed.gif','bye.gif','cool.gif','cozy.gif','fever.gif','tired.gif','goodluck.gif','griltongue.png','mmm.gif','hungry.gif','music.gif','tears.gif','tongue.gif','unsure.gif','doh.gif','brokenheart.gif','drinking.gif','girlkiss.jpg','money.gif','rock.gif','nottalking.gif','party.gif','sleeping.gif','bringit.gif','worship.gif','gym.gif','heart.gif','devil.gif','bigeyes.gif','funkydance.gif','lonely.gif','scenic.gif','hassle.gif','panic.gif','okok.gif','heartbeat.gif','ninja.gif','haha.gif','evilsmirk.gif','eyeroll.gif','yahoo.gif','lmao.gif','angry.gif','idiot.gif','dance.gif','banana_cool.gif','banana_rock.gif','headspin.gif'
	],
	[
	'(joyful)','(lol)','(bleh)','(woot)','(surprised)','(grr)','(crying)','(sick)','(annoyed)','(bye)','(cool)','(cozy)','(fever)','(tired)','(goodluck)','(griltongue)','(mmm)','(hungry)','(music)','(tears)','(tongue)','(unsure)','(doh)','(brokenheart)','(drinking)','(girlkiss)','(money)','(rock)','(nottalking)','(party)','(sleeping)','(bringit)','(worship)','(gym)','(heart)','(devil)','(bigeyes)','(funkydance)','(lonely)','(scenic)','(hassle)','(panic)','(okok)','(heartbeat)','(ninja)','(haha)','(evilsmirk)','(eyeroll)','(yahoo)','(lmao)','(angry)','(idiot)','(dance)','(banana_cool)','(banana_rock)','(headspin)'
	]
]);

smileData.push([
	'YM!',
	'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/',
	[
	'25.gif','1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','15.gif','42.gif','16.gif','18.gif','17.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','105.gif','28.gif','29.gif','30.gif','32.gif','38.gif','41.gif','43.gif','45.gif','47.gif','109.gif','113.gif','63.gif','65.gif','71.gif','77.gif','78.gif','67.gif','111.gif','106.gif','69.gif','102.gif','60.gif','108.gif','66.gif','114.gif','59.gif','46.gif','103.gif'
	],
	[
	'o:-)',':-)',':-(',';-)',':-D',';;)','>:D<',':-/',':x',':blush:',':-p',':-*','=((',':-o',':->',':-SS','B-)','#:-S',':-S','>:)',':((',':))',':-|','/:)','=))','8->','I-)','8-|','L-)',':-$','=p~','=D>','@-)',':-w','>:p','x_x',':-bd',':pray:',':whistle:',';))','^:)^',':-j',':peace:',':rock:',':idk:',':dancing:',':annoyed:',':jollibee:',':dog:',':faces:',':wasntme:',':skull:',':sigh:',':bye:'
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

    isinit = true;
    // init contents
    for(var i=0; i<smileData.length; i++)
    {
        addTab(i, smileData[i]);
    }
    // init css
    $('#emoticons_show').attr("style","width:100%;position:relative;paddingBottom:0.81em");
    // load container div and images
    $(".contentMain").append("<div class=\"tcatBar\"><div class=\"tcatLeft\"><div class=\"tcatRight\"><h2><span class=\"conr\"><a href=\"javascript:void(0);\" id=\"img_quick_post\">&nbsp;–&nbsp;</a></span><span>Plurk smileys</span></h2></div></div></div><div class=\"box\" id=\"box_smiley_container\" style=\"height: 200px;\"></div>");

    for(var i=0; i<smileData.length; i++)
    {
        addImages(smileData[i], i);
    }
}

function addTab(id, data)
{
    var myli = document.createElement('li');
    myli.className = 'emoticon_selecter';
    myli.id = 'smiletab'+id;
    myli.innerHTML = '<a href="javascript:void 0;" >'+data[0]+'</a>';
    myli.addEventListener('click', function()
    {
        alert('show div container here...');
    }, false);

    $("#globalnav").append(myli);
}

function addImages(obj, ind)
{
    var showDiv = getById('box_smiley_container');
    var lis = getById('emoticons_tabs').getElementsByTagName('li');
    for(var i=0; i<lis.length; i++)
        lis[i].className = 'emoticon_selecter';

    // obj.className += ' current';

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