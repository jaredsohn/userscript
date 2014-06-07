// ==UserScript==
// @id             WhutBBCode
// @name           WhutBBCode? for What.cd, Waffles, PTP, STP, BH5
// @namespace      hateradio)))
// @author         hateradio
// @version        2.6.1
// @description    This is a cross-browser BBCode helper--at least as far as Firefox, Chrome/Safari, and Opera are concerned. It works with both What.CD and Waffles.fm and other sites . . . CDs and waffles, mmm.
// @homepage       https://www.userscripts.org/scripts/show/89544
// @updateURL      https://userscripts.org/scripts/source/89544.meta.js
// @icon           data:image/png;base64,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
// @icon64         data:image/png;base64,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
// @screenshot     http://i.min.us/iMfJGx70.png

// @include        http*://*what.cd/*
// @exclude        http*://*what.cd/*logchecker*
// @exclude        http*://*what.cd/user.php?action=notify*
// @exclude        http*://*what.cd/reportsv2.php*

// @include        http*://*waffles.fm/forum/*
// @include        http*://*waffles.fm/details.php*
// @include        http*://*waffles.fm/my.php*
// @include        http*://*waffles.fm/bbcode.php*
// @include        http*://*waffles.fm/forums.php*
// @include        http*://*waffles.fm/upload.php*
                   
// @include        http*://tracker.beathau5.com/*
// @exclude        http*://*tracker.beathau5.com/*logchecker*
// @exclude        http*://*tracker.beathau5.com/user.php?action=notify*
// @exclude        http*://*tracker.beathau5.com/reportsv2.php*

// @include        http*://*stopthepress.es/*
// @exclude        http*://*stopthepress.es/upload.php*
// @exclude        http*://*stopthepress.es/user.php?action=notify*
// @exclude        http*://*stopthepress.es/reportsv2.php*

// @include        http*://*passthepopcorn.me/*

// @include        http*://*indietorrents.com/*
// @include        http*://*alphaomega.me/*

// @include        http://hateradio.no-ip.org/pubjs/temp/textarea.php

// @update         Dec 08 2011
// @since          Sep 30 2010
// 2010+, hateradio
// Please don't modify or edit my script and re-release it. D:
// Send me a message if you want something modified.
// ==/UserScript==

// S T O R A G E HANDLE
var strg = {
	on:(function(){ try { var s = window.localStorage; if(s.getItem&&s.setItem&&s.removeItem){return true;} } catch(e) {return false;} }()),
	read:function(key){ return this.on ? JSON.parse(window.localStorage.getItem(key)) : false; },
	save:function(key,dat){ return this.on ? !window.localStorage.setItem(key, JSON.stringify(dat)) : false; },
	wipe:function(key){ return this.on ? !window.localStorage.removeItem(key) : false; },
	zero:function(o){ var k; for(k in o){ if(o.hasOwnProperty(k)){ return false; } } return true; }
};

// U P D A T E HANDLE
var update = {
	name:'WhutBBCode?',
	version:2610,
	key:'ujs_WBB_UPDT_HR',
	callback:'wbbupdt',
	urij:'https://dl.dropbox.com/u/14626536/userscripts/updt/wbb/wbb.json',
	uric:'https://dl.dropbox.com/u/14626536/userscripts/updt/wbb/wbb.js',
	checkchrome:false,
	interval:5,
	day:(new Date()).getTime(),
	time:function(){return new Date(this.day + (1000*60*60*24*this.interval)).getTime();},
	top:document.head||document.getElementsByTagName('head')[0],
	css:function(t){
		if(!this.style){this.style = document.createElement('style'); this.style.type = 'text/css'; this.top.appendChild(this.style);} this.style.appendChild(document.createTextNode(t+'\n'));
	},
	js:function(t){
		var j = document.createElement('script'); j.type = 'text/javascript'; /^https?\:\/\//i.test(t) ? j.src = t : j.textContent = t; this.top.appendChild(j);
	},
	notification:function(j){
		if(j){if(this.version < j.version){window.localStorage.setItem(this.key,JSON.stringify({date:this.time(),version:j.version,page:j.page}));}else{return true;}}
		var a = document.createElement('a'), b = JSON.parse(window.localStorage.getItem(this.key)); a.href = b.page || '#'; a.id = 'userscriptupdater'; a.title = 'Update now.'; a.textContent = 'An update for '+this.name+' is available.'; document.body.appendChild(a); return true;
	},
	check:function(opt){
		if(typeof(GM_updatingEnabled) === 'boolean' || !strg.on){return;}
		var stored = strg.read(this.key), J, page;
		this.csstxt();
		if(opt || !stored || stored.date < this.day){
			page = stored && stored.page ? stored.page : '#';
			strg.save(this.key,{date:this.time(),version:this.version,page:page});
			if(!opt && typeof(GM_xmlhttpRequest) === 'function' && !this.chrome()){
				GM_xmlhttpRequest({method: 'GET', url: update.urij, onload: function(r){ update.notification(JSON.parse(r.responseText));}, onerror: function(){update.check(1);}});
			}else{
				J = this.notification.toString().replace('function','function '+this.callback).replace('this.version',this.version).replace(/(?:this\.key)/g,"'"+this.key+"'").replace('this.time()',this.time()).replace('this.name','j.name');
				this.js(J); this.js(this.uric);
			}
		}else if(this.version < stored.version){ this.notification(); }
	},
	chrome:function(){
		if(this.checkchrome === true && typeof(chrome) === 'object'){ return true; }
	},
	csstxt:function(){
		if(!this.pop){ this.pop = true; this.css('#userscriptupdater,#userscriptupdater:visited{-moz-box-shadow:0 0 6px #787878;-webkit-box-shadow:0 0 6px #787878;box-shadow:0 0 6px #787878;border:1px solid #777;-moz-border-radius:4px;border-radius:4px;cursor:pointer;color:#555;font-family:Arial, Verdana, sans-serif;font-size:11px;font-weight:700;text-align:justify;min-height:45px;position:fixed;z-index:999999;right:10px;top:10px;width:170px;background:#ebebeb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAACLCAYAAAD4QWAuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGN0Q1OEQyNjdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGN0Q1OEQyNTdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po6YcvQAAAQFSURBVHja7JzBSxRRHMdnp+gkiLdOgtshKGSljQVF8CK0biEErYfwFmT+BQpdA0MIBEFtTx2qSxESaAt5ioUQFDp5sjl06rbnumzfp7+VbZx5M+/Nb9wZ+f3g56wzO28//ua93/u9J/stdDodx2/P3o85llaFT8JvwlvwTfhf00a2Hv8IPO86PHYHvg//An8OfwRfg/9RfzvTZ7DBvoZXQq6p6D7MCuwT+N2I92zAB/sNO0yPO8quwxf7DasABmK+d0XTVVKHnYIvG96z1i9Ymw8ep/R2obAqNdkm41e2sFct71v1/f4BiXyOJpRpHKZ918s9527B5+FvLwJWDaoR3zmvZ/bZw2HPNyMeBOTeb/BfaXaDEuVMvx2G3QDQMkW21wZsUpkp7GbIeU9zz3TI+WXTVGYCW6XRbApb1lxbTwt2VVMltS1hVWRnuWFVqhoNudbW9NchHIpc+ToO7GDE49JFtRij/ZG4gy0O7CIVIjZWNuhiw0lhK1SA6GzI8ppxKouCjTNaOWC7qWzKFrYaNw/SQOKwNVtYk4KjyAQ7RpnHCHaeCg7ugZQon7sBj3RYM62mHdmTVAaGxbiRNVmqRM3/bUvgDQCX/CcLvZsceEOF1v82dgPTrkdVVp2iXU8Q4e9ob0IHu59gUecxdwdlMwBunusGAJ1NuPr0KLoFdYQ3GGBXAiMLWC9gBRDX2gTa9g3Wp7Rbk8TqaPfjWWRp9I0kaLARVCbiXMO/xLGwdfCd7Oa4eDGQdD0fYYcJ7z/bzXHpxbWEDRaddO1FF3aSobE6pazAawztX0H7465mXWVqB2hwqWdwFeFfGaM+Wlh4V/rkMO2fpmy3VWTf5AD0NzLLkYsfn53T7fUs21k2UPmw5jBs9qZgx/AH4Ns+VxvQwJg0rGXTMPUfnhYgj0MLmayb6+TIBFZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBTZzVrg3U+Nsz1iTo7m7c+GRFU2ONGBFkyMNWNHkSANWNDl0xqbJAZ+j1/nR5HBOv6zm/8JaPjQ5KKqiyRFVpORfk8PRf3NZq8lRrd3PhiaHc6pvcLk0ORDdfGlyAFg0OdKAPUlliG76mhyGUNaDLXOaHIjuJdXkoKVKXzU5wlJZZjU5AFyKKhErFkuVbjcoUo3Apcmhnu6Ebkcmc5oczd2dZlA3YNHkUAFwUtLkcJlWnm1a1ng94AvkbKnM1SxVTKwRMphYNDkAPNiFFU0OZuPV5NDMYiyaHOgKvJoc8CVftFk1ORRsi/FxvYR3yH9qZjYba+VGkwOTw5GCzZcmByzTmhyI6ra/kNkiz4wmByD/0+T4J8AAyDkZArebBxMAAAAASUVORK5CYII=) no-repeat 13px 15px;padding:12px 20px 10px 65px}#userscriptupdater:hover,#userscriptupdater:visited:hover{color:#55698c!important;background-position:13px -85px;border-color:#8f8d96}'); }
	}
};
update.check();

// WBB Constructor
function WhutBB(){
	var whut = this;
	this.bond = function(m,b,p){ var o = function(e){ if(p === true){ e.preventDefault(); } if(b !== true && e){e = e.currentTarget;} m.call(whut,e); }; return o; };
	this.A = document.createElement('a');
	this.D = document.createElement('div');
	this.F = this.D.cloneNode(false);
	this.L = this.D.cloneNode(false);
	this.W = this.D.cloneNode(false);
	this.BB = {};
}

// WBB Static
var wbb = {
	site:false,
	emot:false,
	gaz:true,
	pass:/(?:\b(?:noWhutBB)\b)/i, // Ignore textareas with a class of "noWhutBB".
	web:[/(?:(what))\.cd/,/(?:(waffles)\.fm)/,/(?:(indietorrents)\.com)/,/\.(?:(passthepopcorn)\.me)/,/(?:(alphaomega)\.me)/],
	link:'https://www.userscripts.org/scripts/show/89544',
	max:39,
	width:560,
	butn:[[0,'b','b','Bold (CTRL+B)'],[0,'i','i','Italics (CTRL+I)'],[0,'u','u','Underline (CTRL+U)'],[0,'s','s','Strike (CTRL+S)'],[8],[0,'code','c','Inline Code'],[0,'important','!','Inline Important Text'],[8],[1,'color','o','Color (Name or Hexadecimal)','#'],[1,'size','±','Size','3'],[8],[1,'left','<','Align Left','left'],[1,'center','–','Align Center','center'],[1,'right','>','Align Right','right'],[8],[3,'#','#','Ordered List Item (CTRL+K)'],[3,'*','*','List Item (CTRL+L)'],[8],[1,'url','url','Link (CTRL+H)','http://'],[0,'img','img','Image (CTRL+M)'],[8],[1,'quote','q','Quote','author'],[0,'pre','pre','Preformatted Text'],[0,'src','</>','Source Code - [Quote] Around [Pre]'],[0,'hide','. . .','Hide Content or Spoilers'],[8],[0,'artist','a','Link To A Band Or Artist'],[0,'user','p','Link To A Person'],[4,'wiki','w','Link To A Wiki Article'],[8],[0,'tex','t','LaTeX'],[0,'plain','n','Disable BB tags.'],[8],[9,':]',':]','Emoticons'],[9,'?','?','WhutBBCode? Settings'],[8],[9,'del','del','Delete your message. (CTRL+D)']], // 0 [tag]text[/tag] 1 [tag=option]text[/tag] 2 [tag=text] 3 [tag]text 4 [[text]] 9 WBB Options
	optn:[[['Prompts','Disable prompt alerts.'],[['None','1'],['Some','2'],['All','3']]],[['Icons','Disable icons.'],[['Yes','1'],['No','2']]],[['Link','Remove the WhutBBCode? link.'],[['Yes','1'],['No','2']]],['Save','Y'],['Clear','Y'],[' ','Y','whutbbcon']],
	emod:[[':)','smile.gif'],[':(','sad.gif'],[':\'(','crying.gif'],[':o','ohshit.gif'],[':D','biggrin.gif'],[':lol:','laughing.gif'],[':omg:','omg.gif'],[':P','tongue.gif'],[':|','blank.gif'],[':frown:','frown.gif'],[':angry:','angry.gif'],[':paddle:','paddle.gif'],[':ohnoes:','ohnoes.gif'],[':worried:','worried.gif'],[':wink:','wink.gif'],[':creepy:','creepy.gif'],[':cool:','cool.gif'],[':wtf:','wtf.gif'],[':unsure:','hmm.gif'],[':no:','no.gif'],[':nod:','nod.gif'],['>.>','eyesright.gif'],[':wave:','wave.gif'],[':sick:','sick.gif'],[':blush:','blush.gif'],[':wub:','wub.gif'],['<3','heart.gif'],[':shifty:','shifty.gif'],[':ninja:','ninja.gif'],[':sorry:','sorry.gif'],[':thanks:','thanks.gif'],[':loveflac:','loveflac.gif'],[':whatlove:','ilu.gif'],[':a9love:','ila9-what.gif'],[':alderaanlove:','ilalderaan-what.gif'],[':anankelove:','ilananke-what.gif'],[':bionicsockslove:','ilbionicsocks-what.gif'],[':changleslove:','ilchangles-what.gif'],[':claptonlove:','ilclapton-what.gif'],[':emmlove:','ilemm-what.gif'],[':fzeroxlove:','ilfzerox-what.gif'],[':hothlove:','ilhoth-what.gif'],[':interstellarlove:','ilinterstellar-what.gif'],[':jowalove:','iljowa-what.gif'],[':kharonlove:','ilkharon-what.gif'],[':kopitiamlove:','ilkopitiam-what.gif'],[':marienbadlove:','ilmarienbad-what.gif'],[':marigoldslove:','ilmarigolds-what.gif'],[':mavericklove:','ilmaverick-what.gif'],[':mnlove:','ilmn-what.gif'],[':mre2melove:','ilmre2me-what.gif'],[':nandolove:','ilnando-what.gif'],[':nightoathlove:','ilnightoath-what.gif'],[':oinkmeuplove:','iloinkmeup-what.gif'],[':padutchlove:','ilpadutch-what.gif'],[':paintrainlove:','ilpaintrain-what.gif'],[':porkpielove:','ilporkpie-what.gif'],[':qmarklove:','ilqmark-what.gif'],[':sdfflove:','ilsdff-what.gif'],[':seraphiellove:','ilseraphiel-what.gif'],[':sisterraylove:','ilsisterray-what.gif'],[':spacireleilove:','ilspacirelei-what.gif'],[':stwlove:','ilstw-what.gif'],[':theseuslove:','iltheseus-what.gif'],[':whatmanlove:','ilwhatman-what.gif'],[':whynotmicelove:','ilwhynotmice-what.gif'],[':wtelove:','ilwte-what.gif'],[':xorianlove:','ilxorian-what.gif']],
	emow:[[':waffleslove:','wubwaffles.gif'],[':opplove:','opplove.gif'],[':-)','smile1.gif'],[':smile:','smile2.gif'],[':-D','grin.gif'],[':lol:','laugh.gif'],[':w00t:','w00t.gif'],[':think:','think.gif'],[':-P','tongue.gif'],[';-)','wink.gif'],[':-|','noexpression.gif'],[':-/','confused.gif'],[':-(','sad.gif'],[':cry:','cry.gif'],[':crybaby:','crybaby.gif'],[':weep:','weep.gif'],[':-O','ohmy.gif'],[':o)','clown.gif'],['8-)','cool1.gif'],['|-)','sleeping.gif'],[':bite:','bite.gif'],[':innocent:','innocent.gif'],[':whistle:','whistle.gif'],[':unsure:','unsure.gif'],[':closedeyes:','closedeyes.gif'],[':cool:','cool2.gif'],[':fun:','fun.gif'],[':thumbsup:','thumbsup.gif'],[':thumbsdown:','thumbsdown.gif'],[':blush:','blush.gif'],[':yes:','yes.gif'],[':no:','no.gif'],[':love:','love.gif'],[':?:','question.gif'],[':!:','excl.gif'],[':idea:','idea.gif'],[':arrow:','arrow.gif'],[':arrow2:','arrow2.gif'],[':hmm:','hmm.gif'],[':hmmm:','hmmm.gif'],[':huh:','huh.gif'],[':geek:','geek.gif'],[':look:','look.gif'],[':rolleyes:','rolleyes.gif'],[':kiss:','kiss.gif'],[':shifty:','shifty.gif'],[':blink:','blink.gif'],[':smartass:','smartass.gif'],[':sick:','sick.gif'],[':crazy:','crazy.gif'],[':orly:','orly.gif'],[':wacko:','wacko.gif'],[':alien:','alien.gif'],[':wizard:','wizard.gif'],[':wave:','wave.gif'],[':wavecry:','wavecry.gif'],[':baby:','baby.gif'],[':angry:','angry.gif'],[':ras:','ras.gif'],[':sly:','sly.gif'],[':devil:','devil.gif'],[':evil:','evil.gif'],[':evilmad:','evilmad.gif'],[':sneaky:','sneaky.gif'],[':axe:','axe.gif'],[':slap:','slap.gif'],[':wall:','wall.gif'],[':rant:','rant.gif'],[':jump:','jump.gif'],[':yucky:','yucky.gif'],[':nugget:','nugget.gif'],[':smart:','smart.gif'],[':shutup:','shutup.gif'],[':shutup2:','shutup2.gif'],[':crockett:','crockett.gif'],[':zorro:','zorro.gif'],[':snap:','snap.gif'],[':beer:','beer.gif'],[':beer2:','beer2.gif'],[':drunk:','drunk.gif'],[':strongbench:','strongbench.gif'],[':weakbench:','weakbench.gif'],[':dumbells:','dumbells.gif'],[':music:','music.gif'],[':stupid:','stupid.gif'],[':dots:','dots.gif'],[':offtopic:','offtopic.gif'],[':spam:','spam.gif'],[':oops:','oops.gif'],[':lttd:','lttd.gif'],[':please:','please.gif'],[':sorry:','sorry.gif'],[':hi:','hi.gif'],[':yay:','yay.gif'],[':cake:','cake.gif'],[':hbd:','hbd.gif'],[':band:','band.gif'],[':punk:','punk.gif'],[':rofl:','rofl.gif'],[':bounce:','bounce.gif'],[':mbounce:','mbounce.gif'],[':thankyou:','thankyou.gif'],[':gathering:','gathering.gif'],[':hang:','hang.gif'],[':chop:','chop.gif'],[':rip:','rip.gif'],[':whip:','whip.gif'],[':judge:','judge.gif'],[':chair:','chair.gif'],[':tease:','tease.gif']/*,[':box:','box.gif']*/,[':boxing:','boxing.gif'],[':guns:','guns.gif'],[':shoot:','shoot.gif'],[':shoot2:','shoot2.gif'],[':flowers:','flowers.gif'],[':wub:','wub.gif'],[':lovers:','lovers.gif'],[':kissing:','kissing.gif'],[':kissing2:','kissing2.gif'],[':console:','console.gif'],[':group:','group.gif'],[':hump:','hump.gif'],[':hooray:','hooray.gif'],[':happy2:','happy2.gif'],[':clap:','clap.gif'],[':clap2:','clap2.gif'],[':weirdo:','weirdo.gif'],[':yawn:','yawn.gif'],[':bow:','bow.gif'],[':dawgie:','dawgie.gif'],[':cylon:','cylon.gif'],[':book:','book.gif'],[':fish:','fish.gif'],[':mama:','mama.gif'],[':pepsi:','pepsi.gif'],[':medieval:','medieval.gif'],[':rambo:','rambo.gif'],[':ninja:','ninja.gif'],[':hannibal:','hannibal.gif'],[':party:','party.gif'],[':snorkle:','snorkle.gif'],[':evo:','evo.gif'],[':king:','king.gif'],[':chef:','chef.gif'],[':mario:','mario.gif'],[':pope:','pope.gif'],[':fez:','fez.gif'],[':cap:','cap.gif'],[':cowboy:','cowboy.gif'],[':pirate:','pirate.gif'],[':pirate2:','pirate2.gif'],[':rock:','rock.gif'],[':cigar:','cigar.gif'],[':icecream:','icecream.gif'],[':oldtimer:','oldtimer.gif'],[':trampoline:','trampoline.gif'],[':banana:','bananadance.gif'],[':smurf:','smurf.gif'],[':yikes:','yikes.gif'],[':osama:','osama.gif'],[':saddam:','saddam.gif'],[':santa:','santa.gif'],[':indian:','indian.gif'],[':pimp:','pimp.gif'],[':nuke:','nuke.gif'],[':jacko:','jacko.gif'],[':ike:','ike.gif'],[':greedy:','greedy.gif'],[':super:','super.gif'],[':wolverine:','wolverine.gif'],[':spidey:','spidey.gif'],[':spider:','spider.gif'],[':bandana:','bandana.gif'],[':construction:','construction.gif'],[':sheep:','sheep.gif'],[':police:','police.gif'],[':detective:','detective.gif'],[':bike:','bike.gif'],[':fishing:','fishing.gif'],[':clover:','clover.gif'],[':horse:','horse.gif'],[':shit:','shit.gif'],[':soldiers:','soldiers.gif'],[':search:','search.gif'],[':tinfoilhat:','tinfoilhat.gif'],[':moon1:','moon1.gif'],[':moon2:','moon2.gif'],[':user:','user.gif'],[':staff:','staff.gif'],[':eggo:','eggo.png']],
	emof:[[':-)','smile.gif'],[';-)','wink.gif'],[':-D','biggrin.gif'],[':-P','tongue.gif'],[':-(','sad.gif'],['>:-|','blank.gif'],[':-/','confused.gif'],[':-O','ohmy.gif'],[':o)','clown.gif'],['8-)','cool1.gif'],['|-)','sleeping.gif'],[':cupcake:','cupcake1.gif'],[':innocent:','innocent.gif'],[':whistle:','whistle.gif'],[':unsure:','hmm.gif'],[':closedeyes:','closedeyes.gif'],[':angry:','angry.gif'],[':smile:','smile2.gif'],[':lol:','laughing.gif'],[':cool:','cool.gif'],[':fun:','fun.gif'],[':thumbsup:','thumbsup.gif'],[':thumbsdown:','thumbsdown.gif'],[':blush:','blush.gif'],[':weep:','weep.gif'],[':yes:','yes.gif'],[':no:','no.gif'],[':love:','love.gif'],[':?:','question.gif'],[':!:','excl.gif'],[':idea:','idea.gif'],[':arrow:','arrow.gif'],[':hmm:','hmm.gif'],[':hmmm:','hmmm.gif'],[':huh:','huh.gif'],[':w00t:','w00t.gif'],[':geek:','geek.gif'],[':look:','look.gif'],[':rolleyes:','rolleyes.gif'],[':kiss:','kiss.gif'],[':shifty:','shifty.gif'],[':blink:','blink.gif'],[':smartass:','smartass.gif'],[':sick:','sick.gif'],[':crazy:','crazy.gif'],[':wacko:','wacko.gif'],[':alien:','alien.gif'],[':wizard:','wizard.gif'],[':wave:','wave.gif'],[':wavecry:','wavecry.gif'],[':baby:','baby.gif'],[':ras:','ras.gif'],[':sly:','sly.gif'],[':devil:','devil.gif'],[':evil:','evil.gif'],[':godisevil:','evil.gif'],[':evilmad:','evilmad.gif'],[':yucky:','yucky.gif'],[':nugget:','nugget.gif'],[':sneaky:','sneaky.gif'],[':smart:','smart.gif'],[':shutup:','shutup.gif'],[':shutup2:','shutup2.gif'],[':yikes:','yikes.gif'],[':flowers:','flowers.gif'],[':wub:','wub.gif'],[':osama:','osama.gif'],[':saddam:','saddam.gif'],[':santa:','santa.gif'],[':indian:','indian.gif'],[':guns:','guns.gif'],[':crockett:','crockett.gif'],[':zorro:','zorro.gif'],[':snap:','snap.gif'],[':beer:','beer.gif'],[':beer2:','beer2.gif'],[':drunk:','drunk.gif'],[':mama:','mama.gif'],[':pepsi:','pepsi.gif'],[':medieval:','medieval.gif'],[':rambo:','rambo.gif'],[':ninja:','ninja.gif'],[':hannibal:','hannibal.gif'],[':party:','party.gif'],[':snorkle:','snorkle.gif'],[':evo:','evo.gif'],[':king:','king.gif'],[':chef:','chef.gif'],[':mario:','mario.gif'],[':pope:','pope.gif'],[':fez:','fez.gif'],[':cap:','cap.gif'],[':cowboy:','cowboy.gif'],[':pirate:','pirate2.gif'],[':rock:','rock.gif'],[':cigar:','cigar.gif'],[':icecream:','icecream.gif'],[':oldtimer:','oldtimer.gif'],[':wolverine:','wolverine.gif'],[':strongbench:','strongbench.gif'],[':weakbench:','weakbench.gif'],[':bike:','bike.gif'],[':music:','music.gif'],[':book:','book.gif'],[':fish:','fish.gif'],[':stupid:','stupid.gif'],[':dots:','dots.gif'],[':kelso:','kelso.gif'],[':red:','red.gif'],[':dobbs:','bobdobbs.gif'],[':axe:','axe.gif'],[':hooray:','hooray.gif'],[':yay:','yay.gif'],[':cake:','cake.gif'],[':hbd:','hbd.gif'],[':hi:','hi.gif'],[':offtopic:','offtopic.gif'],[':band:','band.gif'],[':hump:','hump.gif'],[':punk:','punk.gif'],[':bounce:','bounce.gif'],[':mbounce:','mbounce.gif'],[':group:','group.gif'],[':console:','console.gif'],[':smurf:','smurf.gif'],[':soldiers:','soldiers.gif'],[':spidey:','spidey.gif'],[':rant:','rant.gif'],[':pimp:','pimp.gif'],[':nuke:','nuke.gif'],[':judge:','judge.gif'],[':jacko:','jacko.gif'],[':ike:','ike.gif'],[':greedy:','greedy.gif'],[':dumbells:','dumbells.gif'],[':clover:','clover.gif'],[':shit:','shit.gif'],[':thankyou:','thankyou.gif'],[':horse:','horse.gif'],[':box:','boxing.gif'],[':fight:','fighting05.gif'],[':gathering:','gathering.gif'],[':hang:','hang.gif'],[':chair:','chair.gif'],[':spam:','spam.gif'],[':bandana:','bandana.gif'],[':construction:','construction.gif'],[':oops:','oops.gif'],[':rip:','rip.gif'],[':sheep:','sheep.gif'],[':tease:','tease.gif'],[':spider:','spider.gif'],[':shoot:','shoot.gif'],[':shoot2:','shoot2.gif'],[':police:','police.gif'],[':lovers:','lovers.gif'],[':kissing:','kissing.gif'],[':kissing2:','kissing2.gif'],[':jump:','jump.gif'],[':happy2:','happy2.gif'],[':clap:','clap.gif'],[':clap2:','clap2.gif'],[':chop:','chop.gif'],[':lttd:','lttd.gif'],[':whip:','whip.gif'],[':yawn:','yawn.gif'],[':bow:','bow.gif'],[':slap:','slap.gif'],[':wall:','wall.gif'],[':please:','please.gif'],[':sorry:','sorry.gif'],[':finger:','finger.gif'],[':brown:','brownnoser.gif'],[':cloud9:','cloud9.gif'],[':pity:','mrt.gif'],[':mug:','mug.gif'],[':banned:','banned.gif'],[':tkfu:','ninja_hide.gif'],[':baldfresh:','baldy.png'],[':camera:','camera.gif'],[':loggeek:','log.jpg'],[':coleman83:','random'],[':locked:','lockd.gif'],[':tomjones1:','tomjones01.png'],[':tomjones2:','tomjones02.png'],[':D','biggrin.gif'],[':|','blank.gif'],[':\'(','crying.gif'],['>.>','eyesright.gif'],[':frown:','frown.gif'],['<3','heart.gif'],[':nod:','nod.gif'],[':ohno:','ohnoes.gif'],[':ohnoes:','ohnoes.gif'],[':omg:','omg.gif'],[':o','ohshit.gif'],[':O','ohshit.gif'],[':paddle:','paddle.gif'],[':(','sad.gif'],[':)','smile.gif'],[':thanks:','thanks.gif'],[':P','tongue.gif'],[':-p','tongue.gif'],[':wink:','wink.gif'],[':creepy:','creepy.gif'],[':worried:','worried.gif'],[':wtf:','wtf.gif'],[':lmgtfy:','lmgtfy.gif'],[':fart:','fart.gif'],[':hifi:','hifi.gif'],[':cheers:','cheers.gif'],[':jambox:','jambox.gif'],[':rimshot:','rimshot.gif'],[':rockout:','rockout.gif'],[':yourmom:','yourmom.gif'],[':bong:','bong.gif'],[':peace:','hippie.gif'],[':vinyl:','vinyl.gif'],['\\m/','horns.gif']],
	f:{ // Images by famfamfam, in base64.
		i         : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVCjPY/jPgB8yUFtBdkPqh4T/kR+CD+A0Ie5B5P/ABJwmxBiE//f/gMeKkAlB/90W4FHg88Dzv20ATgVeBq7/bT7g8YXjBJf/RgvwKLB4YPFfKwCnAjMH0/8a/3EGlEmD7gG1A/IHJDfQOC4wIQALYP87Y6unEgAAAABJRU5ErkJggg==',
		b         : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADCSURBVCjPY/jPgB8yUEtBeUL5+ZL/Be+z61PXJ7yPnB8sgGFCcX3m/6z9IFbE/JD/XucxFOTWp/5PBivwr/f77/gfQ0F6ffz/aKACXwG3+27/LeZjKEioj/wffN+n3vW8y3+z/Vh8EVEf/N8LLGEy3+K/2nl5ATQF/vW+/x3BCrQF1P7r/hcvQFPgVg+0GWq0zH/N/wL1aAps6x3+64M9J12g8p//PZcCigKbBJP1uvvV9sv3S/YL7+ft51SgelzghgBKWvx6E5D1XwAAAABJRU5ErkJggg==',
		u         : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACjSURBVCjPY/jPgB8yEKmgPKH8ffn/0n4IL3F99P+QAjQTyveX/IexIwWCz2NYUbw/7z/CYK/9GApy92cgKXDEVJC+PxFJgQWmgoT9kUgK9DEVROwPRFKghqnAv9/7v2MAhK3iINePocBNwf69xXlDhf8Myg4y58UUsISkmYL+fI39ivul+0UMSA/q/wza/1X+y/0X/y/0n+c/+3/m/6SbgAsCAM8i/W7eee6fAAAAAElFTkSuQmCC',
		s         : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfSURBVCjPY/jPgB8yUFNBiWDBzOy01PKEmZG7sSrIe5dVDqIjygP/Y1GQm5b2P7kDwvbAZkK6S8L/6P8hM32N/zPYu2C1InJ36P/A/x7/bc+YoSooLy3/D4Px/23+SyC5G8kEf0EIbZSmfdfov9wZDCvc0uzLYWyZ/2J3MRTYppn/14eaIvKOvxxDgUma7ju1M/LlkmnC5bwdNIoL7BAAWzr8P9A5d4gAAAAASUVORK5CYII=',
		code      : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHtSURBVDjLjZM9T9tQFIYpQ5eOMBKlW6eWIQipa8RfQKQghEAKqZgKFQgmFn5AWyVDCipVQZC2EqBWlEqdO2RCpAssQBRsx1+1ndix8wFvfW6wcUhQsfTI0j33PD7n+N4uAF2E+/S5RFwG/8Njl24/LyCIOI6j1+v1y0ajgU64cSSTybdBSVAwSMmmacKyLB/DMKBpGkRRZBJBEJBKpXyJl/yABLTBtm1Uq1X2JsrlMnRdhyRJTFCpVEAfSafTTUlQoFs1luxBAkoolUqQZbmtJTYTT/AoHInOfpcwtVtkwcSBgrkDGYph+60oisIq4Xm+VfB0+U/P0Lvj3NwPGfHPTcHMvoyFXwpe7UmQtAqTUCU0D1VVbwTPVk5jY19Fe3ZfQny7CE51WJDXqpjeEUHr45ki9rIqa4dmQiJfMLItGEs/FcQ2ucbRmdnSYy5vYWyLx/w3EaMfLmBaDpMQvuDJ65PY8Dpnz3wpYmLtApzcrIAqmfrEgdZH1grY/a36w6Xz0DKD8ES25/niYS6+wWE8mWfByY8cXmYEJFYLkHUHtVqNQcltAvoLD3v7o/FUHsNvzlnwxfsCEukC/ho3yUHaBN5Buo17Ojtyl+DqrnvQgUtfcC0ZcAdkUeA+ye7eMru9AUGIJPe4zh509UP/AAfNypi8oj/mAAAAAElFTkSuQmCC',
		important : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjLjZNPaxNBGIdrLwURLznWgkcvIrQhRw9FGgy01IY0TVsQ0q6GFkT0kwjJId9AP4AHP4Q9FO2hJ7El2+yf7OzMbja7Sf0578QdNybFLjwszLu/Z2femZkDMEfI54FkRVL4Dw8l8zqXEawMBgM2HA6vR6MRZiHraDabH7KSrKBA4SAIEIahxvd9eJ6HbrerJKZpotVqaUkavkMC+iCKIsRxrN6EEAKMMViWpQT9fh/0k3a7PZZkBUPmqXAKCSjAOYdt21NLUj1JBYW7C6vi6BC8vKWKQXUXQcNA5Nh6KY7jqJl0Op1JwY/Hi7mLp/lT/uoA/OX2WLC3C9FoQBwfILKulIRmQv1wXfevwHmyuMPXS5Fv1MHrFSTmhSomnUvw/Spo3C+vg3/+pJZDPSGRFvilNV+8PUZvoziKvn+d3LZvJ/BelMDevIZXK2EQCiUhtMDM53bY5rOIGXtwjU3EVz/HM5Az8eplqPFKEfzLR91cOg8TPTgr3MudFx+d9owK7KMNVfQOtyQ1OO9qiHsWkiRRUHhKQLuwfH9+1XpfhVVfU0V3//k4zFwdzjIlSA/Sv8jTOZObBL9uugczuNaCP5K8bFBIhduE5bdC3d6MYIkkt7jOKXT1l34DkIu9e0agZjoAAAAASUVORK5CYII=',
		center    : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB8SURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSYwMORk/54C0w2FOcemgmSIMyH1P7LNCHiLBDcEZ/+agqwXaFbOIxLc4P0f1e7fUPiZGDcw/AdD02z9/5r/Vf7L/Zf8L/Kf/z/3f/ZsiAwjxbEJAKUIVgAswNGVAAAAAElFTkSuQmCC',
		left      : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSYU/Ifphej8xbCLEaaAOBNS/yPbjIC3iHZD5P9faHqvk+gGbzQTYD76TLQbbP//hOqE6f5AvBsIRhYAysRMHy5Vf6kAAAAASUVORK5CYII=',
		right     : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVCjPY/zPgB8wMVCqgAVElP//x/AHDH+D4S8w/sWwl5GBgfE/MSZAQNL/31CdMHiGaBNS/yPbjIC3SHSD+3+EXoh5z4k2wfs/qt2/ofAziW7Q+v8brhsSrn+IMYFgZAEAE0hMH/VkcbsAAAAASUVORK5CYII=',
		font      : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHJSURBVDjLY/j//z8DJZiBZgY4tN9wcO6+0erZd2uKc+fNfoeWGxMcW27Msiq+3GWUdIZXL/okI14D7JqvB+csf3Rv4p6X//t3Pf/fvf35/8Ilj3471V3bph9zmougC6xrr8mETbu7q3jl40/FKx5+LVzy8Ltd+eUZBvGnOYjygk3llfKCZY++u3fcWutcd21B07on/61yz88kKgwsCi8qJc++9yhu2p37ppnnQ4C4oWblo/9WOReXEjTANOsCs1PD9VVZ8+9/N0k7m6Yfe5LLOPFMR+Wyh/9dqq5eUvc6xIbXALOs8zEZc+9/C+q+ddEw/rSfXuRxLfP0swuqgAYEt934pOq2nxenAUbJZ0TjJt9+Vbn80X+v5huXrbLOb7LMOLfVterqjcYVj/+Htd38qey4TxqrAQaxpxntSy7PBvnVPO0MSmCZJ5/ZWL7g/v+ozlv/lex2K2EYoB9zigsYPS6lSx7+j+i59UYn6JgtTIGK635hdY/D9dnT7vxP6L/9X9F+b4icxTYmFAMsMs6ti+2/9S9hwu3/Ac3X32oHHOlVdtoroGS/R0vb9/Aip8ILrwLrrv33rbn63zD02F5Zy22GtM8LdDMAACVPr6ZjGHxnAAAAAElFTkSuQmCC',
		size      : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK/SURBVDjLY/j//z8DJRiFozbrLk/aqkc76/a8eDft2Ou/Ew69+lm/8/n7pMUPTsuXXlAgaAAIK/fe9Kg7/ubmsaff/h99/O2/48y7q+Tyz2vKZJ5hJGiAUucNRv0JNycuuvLho/WU24tytz67aNl5fZFM8mlhoryg0HAlcePNz7+06670y2aftaja8fy224SbW6SzL1lrNt+aY95776BJ593dJq13dpu13jqoWXptGUJz1WXVkp0vrs48/e6NTNoZM+n4kzpTDr5+7T/l9gHpzAvOyhU3J/vMe/w5e+OL/5lrXvzXKb2xTjz2QhncAKOWqzM3X//0Z97Jdx8mHHj1YsbB128P3Pz0P3bW3TNiXgfk9BturQ+Y9+ifU+/du4nLnvyXiD7fLBZ+lo0BGEAswACKXXLm3We/aXf2SoYejZQIPBws7ncwb+qeF29TZt+9LJlwNiNmydP/tm13LwNtdY+Y+/i/TNT5XnAYAANIL3vN40uTDrx6JRF0xBDmIlHPvepJM+5czJh174Hb5Pvv3SbceykWdd4aaGtQ5MyH/1UTLywDG9Cx8/n3aQdf/W/e+uxL8ozb20CCIu57jIN7bpxcdujN/+hJ9/4nLnnyXyzibC1YLuS0d/jU+/+1ky9swZoOkDHQuTHR8x//T1705H/MnIf/ffvu/Q+ffO9/ytyH/7XiLmwR9DoijFtz9Hkz6/qbl716736Tizo/XSTgZIGw34kc9ajz65JnPvivF3/+oIDbYQ2cBmhmX1qTMO/Rf7Hgk83C/ie4YOKCnkeCXSpvfNCLPn+A3+WgEoZGYCAZi4aeKXZvu/PBo+3OV6CtwUI+x1nBmj2OKAJtbXCrvPbVNufSYz6nA/EYBrh33v3k23f3v2/Pnf8+HXf+G6VdPAa0lRMkZ5Zy8aJXzY1/QPzfq/rGf/fyaz8ZKM3OABiskbcwY1E6AAAAAElFTkSuQmCC',
		color     : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLjZPfS1NxGMbPjX9Bl/0PXqQzIYIEWWIpRFFBQwyNQqhG4VY0dUK0gXQh+KMhu2nKIAkpAu0wkBA0f0QRtoLuFgSbOmSbZ+estsf3+e6ssE7hxXNz4PM+7/d9nqMB0A6jr3Var2hJlBFZorKochhwUpQmkO65iC3/DWwP3sJO0Av59l/QI0qlmuux5buO7EMvcuM+5AInsRdqxo/5ART92j/hqMhIX7uMbOgudu+7YYRdsMaPozRZ1c/EIKwHmiM8KyptD9xEbsyHQvAYSjZozZyC+boDxbeXYKUmkF9vcHQu7QzdRn7KD/OxqwrGW1B8cx7GZheML1eVrO8R5N+5/nqzQWfC1miTgs1X7TA+eBT0bdOD5yudCCRaMPF+CEej2oEBKb6Za9ecTb0TRrIbewLPLnegd/4E2l824vSLBoQ3AjgypR2IqpJ9dAeF4cbfzgJnPnVhZLEVZ23wSsyHvkgcMf0jzvTP/RqQZlSF6D11ML6Za9OZcJuA555dQN+TOKb1JGb0z3i6kKwOsBtWZs6Miu7qYPbadCYcjCUUGJ5eQ09IJ2yKVjlgiQ1jSZgzo+K1eTC+mWvTmbB3dLEGumu344AM68mGqbdLznTntXkwvplr05nwn73hAIvdZj3V+lISDmBUyj1SdbfXdjsNKPPHYLdVPaVhLAlzZlS8tn0w06n2HFDhX8Ufg91mPdkwloQ589K2Vp0G7AOR2a7+EgKeFAAAAABJRU5ErkJggg==',
		'*'       : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVDjLY/j//z8DJZiBKgbkzH9cMHXX6wcgmiwDQJq3nv/4H0SD+OXl5dlA/L+kpOR/QUHB/+zs7P+pqan/ExIS/kdGRv4PDg7+T10XDHwgpsx8VNC56eWDkJ675Hmhbf3zB0uPvP1fuvQpOBDj4uKyIyIi/gcGBv738vL67+zs/N/Gxua/iYnJf11d3f9qamqogRjQcaugZPHjB66V14ZqINrmXyqIn3bvgXXeJfK8ANLcv+3lfxAN4hsZGWVra2v/V1FR+S8nJ/dfXFz8v5CQ0H8eHp7/7Ozs/5mZmVEDEWQzRS6gBAMAYBDQP57x26IAAAAASUVORK5CYII=',
		'#'       : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD3SURBVDjLY/j//z8DJRhM5Mx/rLLo8Lv/ZBsA0kyRATBDYOzy8vJsIP5fUlLyv6Cg4H92dvb/1NTU/wkJCf8jIyP/BwcH/8fqgkUHSXcFA1UCce7+t/9n7Xn9P2LiPRWyXRDae0+ld8tL8rwQ1HVHpXPTc7jmuLi47IiIiP+BgYH/vby8/js7O/+3sbH5b2Ji8l9XV/e/mpoaaiC2rX/+v3HN0/81q54OUCCWL3v8v3Tp4//Fix+T7wKQZuu8S+THAkgzzAVGRkbZ2tra/1VUVP7Lycn9FxcX/y8kJPSfh4fnPzs7+39mZmbUQARpBGG7oisddA9EAPd/1bRtLxctAAAAAElFTkSuQmCC',
		url       : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVCjPY/jPgB8y0EmBHXdWaeu7ef9rHuaY50jU3J33v/VdVqkdN1SBEZtP18T/L/7f/X/wf+O96kM3f9z9f+T/xP8+XUZsYAWGfsUfrr6L2Ob9J/X/pP+V/1P/e/+J2LbiYfEHQz+ICV1N3yen+3PZf977/9z/Q//X/rf/7M81Ob3pu1EXWIFuZvr7aSVBOx1/uf0PBEK3/46/gnZOK0l/r5sJVqCp6Xu99/2qt+v+T/9f+L8CSK77v+pt73vf65qaYAVqzPYGXvdTvmR/z/4ZHhfunP0p+3vKF6/79gZqzPQLSYoUAABKPQ+kpVV/igAAAABJRU5ErkJggg==',
		img       : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGWSURBVBgZpcE/a1NhGMbh3/OeN56cKq2Dp6AoCOKmk4uCn8DNycEOIojilr2TaBfRzVnESQR3Bz+FFDoWA2IjtkRqmpyc97k9qYl/IQV7XSaJw4g0VlZfP0m13dwepPbuiH85fyhyWCx4/ubxjU6kkdxWHt69VC6XpZlFBAhwJgwJJHAmRKorbj94ewvoRBrbuykvT5R2/+lLTp05Tp45STmEJYJBMAjByILxYeM9jzr3GCczGpHGYAQhRM6fO8uFy1fJQoaUwCKYEcwwC4QQaGUBd36KTDmQ523axTGQmEcIEBORKQfG1ZDxcA/MkBxXwj1ggCQyS9TVAMmZiUxJ8Ln/kS+9PmOvcSW+jrao0mmMH5bzHfa+9UGBmciUBJ+2Fmh1h+yTQCXSkJkdCrpd8btIwwEJQnaEkOXMk7XaiF8CUxL/JdKQOwb0Ntc5SG9zHXQNd/ZFGsaEeLa2ChjzXQcqZiKNxSL0vR4unVwwMENMCATib0ZdV+QtE41I42geXt1Ze3dlMNZFdw6Ut6CIvKBhkjiM79Pyq1YUmtkKAAAAAElFTkSuQmCC',
		quote     : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG/SURBVDjLjZK9T8JQFMVZTUyc3IyJg4mDi87+GyYu6qB/gcZdFxkkJM66qJMGSNRBxDzigJMRQ1jQ4EcQ+SgVKB+FtuL13EdJxNDq8Ev7Xu85797T51nwhqeAH5w6cAxWwDgReX7jwYfdaCIraroptB7NLlVQrOoiGEsL1G06GZyxuILicsMUH3VTlOqGKNUMUdTacj+j1Nng0NGAT2WxYosK1bbIVVoiW27J9V8G57WWKVSczMV5iK+Tudv1vVh5yXdlLQN+os4AFZss2Ob82CCgQmhYHSnmkzf2b6rIhTAaaT2aXZALIRdCLgRtkA1WfYG4iKcVYX52JIs7EYvFmJ8wGiEXQi6EXAhdyn2MxQaPcg68zIETTvzyLsPzWnwqixVbhFwI3RFykes+A9vkIBKX4jCoIxdCLrI4/0OcUXXK4/1dbbDBS088xGGCCzAJCsiF2lanT8xdKNhHXvRarLFBqmcwCrbAhL32+kP3lHguETKRsNlbqUFPeY2OoikW62DNM+jf2ibzQNN0g5ALC75AGiT59oIReQ+cDGyTB+TC4jaYGXiRXMTD3AFogVmnOjeDMRAC025duo7wH74BwZ8JlHrTPLcAAAAASUVORK5CYII=',
		pre       : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAChSURBVCjPpZExCgIxEEVfZI/jGWy8gFewX6w9h7C1V1iwXRsvYCN4DUEEJ3HzLbIRF4zNZsq8/+bDOPH/zZgKVABHASzdVj0vAp6A4bH60CBEp5s6iV9TZZWAjULO0rqvFekbdq7QQUQisFZKG08Mw+prMwL2JUOkJwIr2Sd/cSMgGdqyIZVcDIbUJBDqR+6QgFPJAGcA5spZz32A3eRrvgFwMGHf7+AlJwAAAABJRU5ErkJggg==',
		'src'     : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALESURBVBgZPcFLaJxlFIDh95zv+//MJZObITUUq/QSG42orcULSnQhgmRjQRCyqaC4qLqrLgQ34gV040JKcOGiEMS9C0E3iVGEWIu0pWClWAlpmsaZSRuTmfn+c8zY0ecRd6fr2XcXTpQH+mZVOAqUAKFLABdwI5n93tjw72Szfmrx9EybXeLudD3/wdLimTeOTqrKkEPA+Z87u5z1Wx3mlxtcu9r6++L5SyPfn55pRXo0yL15DEMXrhNUBATcoHAjJWe7U/D0oRqPTkR+svWK2+H69OtfDys9ItLv7iEPSqYQBYJCEBABRQBjfCBn5tg49xzsK8eB6hdKj4NstR0FVEBFUBFUBBVBg7D61zZ393e4b0R49fE7CFl4MdJjKB8tNGkWzqnHRvn0XIOYYHaqRgxC7srlDadtCbM2T+3vQ6ImZddDH14Z8YGxPGaKtkBFIEGtDGfONmm1nSwofXmglAdKeYajIIo++P6Vl6YOVVcm9/Vrs1HwyiMjqAgn7h9kvVFQKcPnP9dZ/m2LLCp5CPRFxQB30MkD5bl9tVBarXd4+UiF4VrEgeGKcnyixlozMV4Vlv7cQoCoQgxKYVAY6Lnlzdcur7Z2RvLA3GKTjUYHd2fjVuKrX+oMReWPtTZPjlfIVIkqBBVKmVAkRy99MvHl8lJ97/mLdSuVlM++uUZhMLdwg2pJ2dro8Ob0GE9MDeCAOTiQBSW1E+LudE2/88P2/jv3lm60oXJ4D62r62zehMGDo2gudLmDcdv8cxnPvLW4E+kxS7w3u4ePL+QcGVPswF0UDoWAOTjgDu7w6/WEm9PZSUR6UsssmXm7QH5cKTBxHKHLHATHHFwFNSFGsVRYivR0doq1ah5G336gXXV3xcG4bbAc6XKHciaIYFmQm0WyFXF3uo6d/PZk6vgLIvKw4xX+4+CA4/zL6doxs7MK8/8A73I7wFFcAY8AAAAASUVORK5CYII=',
		hide      : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHtSURBVDjLjZNLS9xQFMe138C9A/0OynyBUjeFQjduROi2MMtCEalS0ToLEdQMdEShoKDWRymKigWxII7PhaB9aBFUJjHJpHlnnvbfe27NJcVIDfwIyT3nd885cOoA1BHsaWQ0MZL/4SHjgciLCJpKpZJVrVava7Ua4mDnkCRpKCqJCpKU7HkefN8X2LYN0zShqiqXKIqCTCYjJGFyPQkooFgsolwu8zfhui4sy4KmaVwQBAHokmw2+1cSClpSUmr12MP7LQunii8klOA4DnRdv9USn0koePRiJDW+aTGBjcOLgAewlnjfYSuFQoFXIsvybQF9jG2avIKFPQtzOyZmcyZMtywkVAnNwzCMeMG7jV+YyFmQ1g30L2kYWitAWtZFJdQOzYREsYLhzwZGGF+OHez/9PD2k4aeeYUHVyoVPheSELGCwRUdA+zG/VMPeycu3iyo6J5WxDxIQFA1QtCauUwPrOpIPh/vSC+qSC/qPHn3u4uu2Su8nsrzZKqAoOR/BO2j+Q+DTPC0/2CdSu79qOLVlIyXk3l0zsjomJYxv6ELQYgQPOk7a2jpOnmcaG57tvuD3fzNxc5XB9sEm0XuyMb5VcCriBI7A/bz9117EMO1ENxImtmAfDq4TzKLdfn2RgQJktxjnUNo9RN/AFmTwlP7TY1uAAAAAElFTkSuQmCC',
		artist    : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJUSURBVDjLpZNbaJJhHMZHUES51SoiqssWm5SMQekoFwvnYR4RP02dh/yMMhJpW3PaFOuzURfNi8GUDusw3QGDgl0k0Y3QcbjVqtsY3cVAu9uMwqf3ey+EwXBFFw/vgef58X94eesA1P2P1r284DDfDp/ajUhHPQZOCuBr3wXWrLv/VwAf64pFtM0YO3sUN1U7MOo+gr4OAdzSA2Cd1pENASGjGKO2JgyQ0A3TIRJuQJw5DF/HXhha91Q2BJw/3ojLaiHGr2gwwp6A/VgjrhqbYW0/CKZtJ0b6zmyvCRhU7ltdfH4XxfcT+P76AeYf9ePrs2tYmB1DVLP/56eHF7fUBCQcre9Kc5NYLmSx8nGKaJruS/NTuOMRFWpWaJP7tkql0ux4oBPlwj2sfnlKtfIhg8mBTojF4iei0+e2rQtQKpUNKpWKU6vVSKVS6OnpwcQQQ6XRaOidTqfj93HiFawBkOCmYDB4izfypmQyCavVimw2i0wmA5PJhOHhYXg8HnR3d1dkMtkggWyuAkjwEsuySKfTMBgMMBqNsNvtyOVyyOfzsFgs0Gq1sNlsiEajcLvdFblc3lcFLAw1/16eHUQ4HAbHcdTkcDhAJqPjMwwDr9cLl8sFv9+PYi6Kt/0t5SpgMdJSKb24Tg2JRIKCSCVq5iv19vYiEAggHo9T2I+XHOaCwkoV8PmxPzQfavrldDqh1+upkVcsFqP9+an4M+mPrq4uLERFZZLh1rzC0rSvnnRsIs/4ivRdIuOXFQoFePEhshYlEskbs9ks/Dbjq6/5G/9FfwAGy37p9rgYIQAAAABJRU5ErkJggg==',
		user      : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ+SURBVDjLpZNdSJNRGMeFoC50flVXBV1EoF3YdzKYG0u30FTsY9bQnLpqrSg/5uZe29RtimvkxBbCTJupmzpLl8tNxfwObUxTF2RQRNJFGOqFYELx/nt7LwaCzKKLH5zz8Px/POccThCAoP9hy+LNq+nVJZzdULMZULBCIGVGQpye2vhXAqlYVK5OiYIhMQx6Cg0vFDJ2CLLj9kGcJTRuKyAuxKKGCiqokIwmFPmcCOScDkPa0T3ktgJZbDjZa1Liq9uAcZMEGaciIGLuhZC5H4Lj4TDKrgQHFJgzD6yuvn+F5Tct+PbagumnRfjk0OC7z43W6wfX5ptu7QwouC9ielY8Nix5O7E+20bRTq9Xpttgzj3iDXgEvuJZMPt23Wht4UVseBvw4103zfpbK+qJ82BdezDCL7AythSw8+yRPIW1kaN+gaahBRRo69BaKEBvVjxERDNV+4Az5S/Bl7c/ji+whW8SMItcO/LrxyxcdQ/d9GT4I5INQxh0TWBKkoUUjRN6hw/C2jGwS7pJbp7FyJXZd/kFScVWXcbDcTg8i0jQusDTuSHQ92E2Iwnz2WlIrhoAt8yJVMMw1B2zuFw9RPLzGqr8ghlV1K8lpxKEbQa6rnm6Sah3w5aaAlVuMc5VuJBpmoDAOApJ/SSW+0oxWRS94RfMqaPJlQEtBDWjeNS/ACUlkrd4kW8aQEJZD+5aPJA2TKGyy4fEij6sDurgKT5M+gW+5jvENHHo5yXjCOI1vajs9tGUdc7hbGU/PdWfPeeeAyxFB2ZKYzaojG7TK3xulzIk2saYkzfMi1zqouKILrCUz2mYcjtYcjt5LMe0JlaZT3zpkDIC/sZ/4TfeSKfmHj5WOQAAAABJRU5ErkJggg==',
		wiki      : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJwSURBVDjLjZPdT1JhHMetvyO3/gfLKy+68bLV2qIAq7UyG6IrdRPL5hs2U5FR0MJIAqZlh7BVViI1kkyyiPkCyUtztQYTYbwJE8W+Pc8pjofK1dk+OxfP+X3O83srAVBCIc8eQhmh/B/sJezm4niCsvX19cTm5uZWPp/H3yDnUKvVKr6ELyinwWtra8hkMhzJZBLxeBwrKyusJBwOQ6PRcJJC8K4DJ/dXM04DOswNqNOLybsRo9N6LCy7kUgkEIlEWEE2mwX9iVar/Smhglqd8IREKwya3qhg809gPLgI/XsrOp/IcXVMhqnFSayurv6RElsT6ZCoov5u1fzUVwvcKRdefVuEKRCA3OFHv2MOxtlBdFuaMf/ZhWg0yt4kFAoVCZS3Hd1gkpOwRt9h0LOES3YvamzPcdF7A6rlPrSbpbhP0kmlUmw9YrHYtoDku2T6pEZ/2ICXEQ8kTz+g2TkNceAKKv2nIHachn6qBx1MI5t/Op1mRXzBd31AiRafBp1vZyEcceGCzQ6p24yjEzocGT6LUacS0iExcrkcK6Fsp6AXLRnmFOjyPMIZixPHmAAOGxZQec2OQyo7zpm6cNN6GZ2kK1RAofPAr8GA4oUMrdNNkIw/wPFhDwSjX3Dwlg0CQy96HreiTlcFZsaAjY0NNvh3QUXtHeHcoKMNA7NjqLd8xHmzDzXDRvRO1KHtngTyhzL4SHeooAAnKMxBtUYQbGWa0Dc+AsWzSVy3qkjeItLCFsz4XoNMaRFFAm4SyTXbmQa2YHQSGacR/pAXO+zGFif4JdlHCpShBzstEz+YfJtmt5cnKKWS/1jnAnT1S38AGTynUFUTzJcAAAAASUVORK5CYII=',
		tex       : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD7SURBVDjLY/z//z8DJYCJgULAgi6gUvvEWEOVY6aqJJsxw79/DAxIDrxw+9ee/blirnhdYKjHtcpKmd1YiZ+JQZKbmeHivV97+j0EGEGaGf4T4QIZPiYlXhZGsM2g4Pn/FyL+/x+I/Ec4DEA2vv32jwEetjAa6B2YYXgNeHD/Z9iOM19XP3j3h+Hbz/9ATRBbwbH19z9hL9zrkn0PpMIUCh4Jaqpz7IZF8/8/DAwMWKIcZzQ+mCD3/tu3v+8Z/sC88h8aDgRcgAzAfoa54C9WB+A3AORnmCYw/ZdEA/4hO/kvAwMDyS74j4j6//+w6ifkBYQmXAmJccBzIwCU7Hm5Y0odkQAAAABJRU5ErkJggg==',
		plain     : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK9SURBVBgZBcFLiFVlAADg7//PuXdmGp3xMeIokk1USG8jKmlRYJJU1K6NRILQopXVImoVFBGBpLteu2gVLYyiUALFRSVk0aKC0nyE5uA43pm598495/zn7/tCzhns//LSQzh867rxXYO6NahbddsaNm0Py7iGhEUs4DMcKwHapnn4vtk1u157bBMA6Fft9KBqpxdX07aqZnmUnL+24tuz/T04WAK0TbN5qhvApRtJJwRloCgZ60Q3j0VFjDoFO7dN2Do9ueGT05cPRYBU11OTJU3LchX0am6M6K3SW2VhyPxKAm98ftGuuUl3z3Q2lQCprjes7Ub9Ef3VJMagRFEQCwpBEWgR0pIfzy06c7F3uQRIVbV5eqLQGzYGoyzGrIjEFBSRQlYUyIWrSyNHjv+9hP0lQFNV2zdPdfRWswYyRQpiRqKQlTlqM6mTNFUzd/SVR69HgFSNts9Oj+lXWYgUIYiICICQyZlmNJKqUYIS9r793URZxO5YJ6pSEmVkGUkAATFSp2SlP2iwBCU0o2rT5OS4GGghEwJRkDMh4ORHhic/9MO/f3lpfF1YU11/nea9ElI1uqmc7CojRQxSG8hZixBw4mNTf37hjucPGJu7y/C3Y8Xvp46/c/yJTr/4/sbtM21Kh3Y/uOPOua0zfjnfSG2WBUXMioLRpy+6/9kXTJw9IZz6QGd4XnfDlnjl3IUdZaqq3Xj65z/+sTgsrYyyOmWjOqiaVpNaB65eMD47x1OvAijf2qJowy1lqusHnnv83ok39z0CAFKmTlnVcOanrQa/fmPyq5eNhv8ZYHmpkAqXi9l79t62fnrymYXl2sX5vvmlVUuDWt1kRYy6naAbWv+cOip2grro6y1k567ElBrvh537Ds/gILZjIzZiPdZjerzb6YyPd+xJp+248rW1/QVVGeeL3Bx58ljz7v/pCEpK8wRGcAAAAABJRU5ErkJggg==',
		':]'      : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJnSURBVDjLpZPNS9RhEMc/z29t1d1tfSmhCAwjioqoKNYuYkRRFB300MWT3eooeMn6C4TunYoiOgSKkGAUhh0SjJCwsBdtfQMN17Ta2v39nueZ6WBtktGh5jLDMPPhC/Mdo6r8T5T93nCPTUqVDhVOi5BRBRVGRBhQ4drGc5pfO2/WKnCPTbMKN0x9Z4OpzqDxWlCPFnL45VHCd91ZEdprWnRoHcANmhatbu4JtrShiSr8t9dIuIS6IpgKgoqdGBsQztwj/DDUWndee0sAO2hqVZmO7b+bkuAzvpgF+wVxIeqLqxBRTHk9sfL9fBq+kBdh+9Y2/RgAqNARbO9KaRwkzIL7ymBfDiQCH/HkIYjN4z6P4cNJEnu6UuLpAAgARDhrahqRYhZ1BVQsx85UomJRb2lqzqMSojaPW3lOWfUuxHN2LWAv5WnErZSWVCzqItRHP2qL+ggJc0CI9zSUACoU1BXBOx71PmXq7dzqorc/csj05BKDD+ZQsaCKCLFfCjxZbAGIc7R5N+9ezTI7uYD6EBXLTHaZiTfLZBrTmCCB+DJsyETJSCL029zowaC6nkRynqNNDYw9m2L8xSx4S7LSkMlUkUzEKEsfoJCbxkb0l8643GPqRHifarydEvsGnx9HohXUhYj7eUaIJXdi0qeYvn8x7yw7Dl3WxQCgplUXRWj/NnELdBuxdCMmVouKgihBfDMb6k6gieMsvezDRrQfuqyL66w8f8ecFM/15N7OhvimfQQbAhCHCz1f59+yMNyddZZLh6/owB9/AWD2pkmJp1OE096TcRE4y4izDDhL95Grf3mmf4nvrQOLvcb/mlMAAAAASUVORK5CYII=',
		':P'      : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJpSURBVDjLpZM7aFRRFEXXffPyJokzmkSFWBiJiGBEDH5io8QmIIqFojbaaGkZSBVtbAOCpZU2IhhRLJSAEFELISIpRBB/wxgwakYnn5d5n3vvORZCjB8sdJeHw2Jzzt5GVfkfhb8O3ANTUmVQhQMi9KmCChMijKlwsXxY4+X7ZrkD98D0q3DFdA11m7Y+NOoA9WhSw9cnyV6PVEQ43X5EH/4GcOPmiLb13wo6T6Ktq/CNl0j2BXUpmGaC5k0YG5C9HyX79PDo2hN6ewlgx02HKtXCtuslCebxaQXsAuIy1KffIaKYYheF4jbmnpyJRdiw7qR+DQBUGAw2DJc0Askq4BYZv1MDycHnPLoPYmPc/HN89pbWLcMl8QwCBAAiHDLte5C0groEFcv+gy2oWNRb9vXHqGSojXGzzwjbNiOeQ0tfEKGH4kokmeVT9SstLdAUOUJy1OXYzJIuepJFWN1RAzK8p3sJoEKiLo3wjpmpORoLOXnqsVawVaEUBuAD4kTZe8qCKiIUfjjwVLBJL0T07G5HXYa6hM+VmNl3RdYYg00MU/UEE7QiPsRmvFl+g7u2NomJulAB9TnqLFGzJ2ukaJLjFhIkbBCu3E5Sq2Jz7v4AeC41XlyIcWWCaD2oQSWjvMrRtGWetzN1qvNzrD/ciRa3M/34QmwzLv0UpJkb5li4dmC0uesoFBZw9af45APqUkxYplDuxbOR+st71F+NHd8xrDd/i/L0NTMgnssreoa6o9VbCZoCEIfLPIvTr/j4ZKTiLGd3ntOxP3YBYOqqKYlnSIQD3tPncnCWCWcZc5aRXef/UqZ/0TcrHX7i2ZbMyQAAAABJRU5ErkJggg==',
		'?'       : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSSURBVCjPVVFNSwJhEF78Ad79Cf6PvXQRsotUlzKICosuRYmR2RJR0KE6lBFFZVEbpFBSqKu2rum6llFS9HHI4iUhT153n6ZtIWMOM+/MM88z7wwH7s9Ub16SJcnbmrNcxVm2q7Z8/QPvEOtntpj92NkCqITLepEpjix7xQtiLOoQ2b6+E7YAN/5nfOEJ2WbKqOIOJ4bYVMEQx4LfBBQDsvFMhUcCVU1/CxVXmDBGA5ZETrhDCQVcYAPbyEJBhvrnBVPiSpNr6cYDNCQwo4zzU/ySckkgDYuNuVpI42T9k4gLKGMPs/xPzzovQiY2hQYe0jlJfyNNhTqiWDYBq/wBMcSRpnyPzu1oS7WtxjVBSthU1vgVksiQ3Dn6Gp5ah2YOKQo5GiuHPA6xT1EKpxQNCNYejgIR457KKio0S56YckjSa9jo//3mrj+BV0QQagqGTOo+Y7gZIf1puP3WHoLhEb2PjTlCTCWGXtbp8DCX3hZuOdaIc9A+aQvWk4ihq95p67a7nP+u+Ws+r0dql9z/zv0NCYhdCPKZ7oYAAAAASUVORK5CYII=',
		youtube   : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZNPaBNBGMXfbrubzBqbg4kL0lJLgiVKE/AP6Kl6UUFQNAeDIAjVS08aELx59GQPAREV/4BeiqcqROpRD4pUNCJSS21OgloISWMEZ/aPb6ARdNeTCz92mO+9N9/w7RphGOJ/nsH+olqtvg+CYJR8q9VquThxuVz+oJTKeZ63Uq/XC38E0Jj3ff8+OVupVGLbolkzQw5HOqAxQU4wXWWnZrykmYD0QsgAOJe9hpEUcPr8i0GaJ8n2vs/sL2h8R66TpVfWTdETHWE6GRGKjGiiKNLii5BSLpN7pBHpgMYhMkm8tPUWz3sL2D1wFaY/jvnWcTTaE5DyjMfTT5J0XIAiTRYn3ASwZ1MKbTmN7z+KaHUOYqmb1fcPiNa4kQBuyvWAHYfcHGzDgYcx9NKrwJYHCAyF21JiPWBnXMAQOea6bmn+4ueYGZi8gtymNVobF7BG5prNpjd+eW6X4BSUD0gOdCpzA8MpA/v2v15kl4+pK0emwHSbjJGBlz+vYM1fQeDrYOBTdzOGvDf6EFNr+LYjHbBgsaCLxr+moNQjU2vYhRXpgIUOmSWWnsJRfjlOZhrexgtYDZ/gWbetNRbNs6QT10GJglNk64HMaGgbAkoMo5fiFNy7CKDQUGqE5r38YktxAfSqW7Zt33l66WtkAkACjuNsaLVaDxlw5HdJ/86aYrG4WCgUZD6fX+jv/U0ymfxoWVZomuZyf+8XqfGP49CCrBUAAAAASUVORK5CYII=',
		torrent   : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIbSURBVDjLjVPPaxNREJ79Qena1EO6u/GQ9CiFouCp5FQQET0KQvBQbA/tqf+BCEXoyauCl7KFHkoOvYimUpToRTyISVtsliImpCwkLUGqxvzY3bfOvO2+bOgljx32vdn5Zr4336wUBAGUy+V7f96/3PVaDnjNKty17DkYbZ1KpVLppu/7n5nbnVDAh7NXK3Bn4/tIaFVV59R8Pm9ns9nV8aOClZhCbwDguu5QIGMMiGn8rGlamCSXy80ggxfMXAAFPPj9qXipkizLHBQtSZJEQsFg7KBgTZroZGEArWc7TSAchXIA4w+sPdQH1xAMDGQgeXD+4aNIQODZjHaRILT9Wpt/Q8wwA3X/rXVVD3glkQD3h7V/vGrA8Bvz0Rf2AK/F7zRQoY8qIAPn+TLczx/xRPF709nzPOFHayeTyfkBg29vrEkj5BkFPdlu4NtHugH4wYUSqNBaziQGE5hXifXgMVfh115RdHr90TUOIkPNBZtutwvVahUURZFlYuA4zmqzsAl/v24BFhQSRXJFDYvAlUoFUqkU+VmMwSLIyKC1W4ypwISRr9PpgG3bkMlkQNf1YRXkL6+thIlN8y9PIDGgygROp9NgGMZgqOIqEIPa0yV4sPeDgwlIne/1etBoNHhV0zTjExn+Cxh041bl3c8rSY0PCzWIgGQRCxpnSlKv1/m+3++HSaKGLV2fmp9OjN122u7JxnHrYNTf+T+76nzVPsi2lQAAAABJRU5ErkJggg==',
		search    : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG8SURBVDjLjZNJS8NAGIarv0PBuzcV/4MHwYMHL/4CPQsexYvoSW2RioiguJ9cigtFKhpxqVtBXGqtVRO62TbJNFMb+zpfNKJVMQMPCWTeZ+YdMi4ALjGqBPWCxn+oEVRSxsb1IajnnGeLxeKraZr4DfEdbrd7sFxiCxoprOs6GGOf5HI5ZDIZxONxS6IoCjwezzcJjQoS0ATDMFAoFKwnoWkastksEomEJcjn86BFvF6vJfkhoLANCSigqiqSyeSPSh9nUvFNIGp8TqB36m1XSaVS1k5kWf5bUM5XCe2EziOdTjsXmGYRgVAMi9I1JrbuMbPzBF/wAS8F5kywfX6PlWAcNwrDXYpj/1bF2mkS/pOYM8G8JOPiUcNBNA8pwrArCMkcs9vR/wXUf9wfRTjBId3q2Anr8F9qCMY4pgKPzgSzovPFE0Pg+j1MHD1wjPqunFUIhBTsh1Uci9Be1MChWH35TIN3cgl97XU95YJSueBZ4zi8ecaCOIu5XRljm3cYmfQhtDYGabidTXfWttl3oUH8fUyE/rxMNpGD1dLReEcpsj4EX28TswXVJHFwnS26mqu6NwdajY3+FrwBN5GpoomTEloAAAAASUVORK5CYII=',
		del       : 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIJSURBVDjLpZM9SJVRGMd/532vetOswQgjSoW2gj4Gh4ZoiIKGwGi4EtQQ0VxLQhAOEW2NzUVLOQRBBioUakGT5CBiGhZe8aameLv3nPc9H0/DvX7hHQSf4ZzDgf/v/3/O4VEiwl4qYo+VWT/I7EdxxSVEUsRZxFvEpYhLEJ+ANXhnEKfBGg5ef6W2A7yj7lRuh4MIKKgugMBKX/fOBMlqnn0iSNCVCwUiAVAImwQVNSBW12jBOUK6gCt+g5Agklb2kEIwSDBI0NQf6iLYcg2ATwCHBANiq6KtYoOEMohD0hoJ3L/lSuRtzpoQTBWiIeiKiSvtBARvMD9GcMk0+BTE4c0a2bbDFedgEK9BQu038HoZt5Zn/5mbQCCkvyiOvUF8GaRMYXiawvAk5fm3RI2K7/2ZnssD7tkGQIlg/4yzMjTKgfN3UUoRxG6IS1OWs7mHNHScRI8PMDEy+GTwUl0p2vrfzZ23sauLrA4/r4oN4g1zQ2OcuHiD7Mxn1MtuGn++o72tJRYl9zcS4Awqjmg6dwc90U/x63viltNkWy9gl/rItnbA1QebvfceIQ6qXa0P0+LraxJsgjiDWI3TBSAiUoqpT3N0dt2i6fcHEr1AGSiuxUzOkFe7mcbR3NHe+uamR8daXCYTzVFcdMwWYm+NPFa7HecvueM9pb/z92Kv2nwseYEXVwbc0/9TqFA0aM0H7QAAAABJRU5ErkJggg==',
		table     :'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHISURBVDjLpVPNK0RRFP+9D98syMwUspHkm9I0YkFZWBFKkZ0s7a3Ewh+ilChK7FgoZCJFKYlYKB8zk2+Z5t0P577He29kQU7dd+6575zf+d1zztWklPiPmOozt/U4SThjXIoyIQS4AJjSXO0lGGlvcXAm6Vzsz4xUhm0AIeX4QLig+C+ZpxbOG1wGhGYHr1zMUmZGWRgs0ha3PE1nX/8mWmdgWTzLB+DUYbhm9FfZ35IEyrhXA3VXJfPbsV8B9LQUIeUHYJ8ASobag1jcucNgW8g9W4reYSDi2YnnZDoDiwCokDANct6NwTB0LEdj0HRA/wxa2SN25JNBEdWluUhZ366gqmAaGvrCAXKOozccTGPgt8+vn8GYSGcgyTYp3dpBnBg42nbQPRBTo5bTvqYkmxL6AQhNTWQGBXY3B7BxlEBXozcW64dxRKoKUZBju+P06gl5WaaviMJBM3TNDlbypemIZgHYOnlwASsCmW7nHADGnBoQ3c76YmweJ9BR5zFYjsbRHwm4tmJg6PhWA7pCXXk+bu7fURHKweXtq/sWaksz7SC/CCGFrwtyZ3r+rCnFRZ7qr1qc6mLZj4f9OEyPL8lVpbX/PucPv5QPKHB1TdEAAAAASUVORK5CYII=',
		tr        :'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI9SURBVDjLpZPNS5VBFIef+77X4lYayfVqpQY3XPiRGogp9rEpa2NRQpAELaJl5LKVJGSrFm36A6RMCpSilu5StETLaGcophTeNMyv+/rOmTMtrp87o4FhOOdwnvObHzMR5xz/s6IAz98vtDnHHeu0UFWxCqKKtYpVh1jdti1WHFZ1uONmSW0UQJ2721ybHf+XyQ9efqvcVGBV4wBvJjoRFcQKRgVjzdZpZbN2v74DY+zebYCMDy1lt3c1fSUQjNgtD6xVALr7U7sCXK7JJdwOkHUAwI3TCV4NzHK9IX8z1zM0S3PdVjy3GOxUYKyizhH1oWcwhe979A6liHjgrTfd6zpH2izRVP6aiqJDhCYD8Dau4ICoH6G5PkHUg2t1Ca7WJrhSmwDAOENhvJSu0YsEJkBEdypwClEP3o38wveh9cVZnBpCFUIRjuSWUFpwiqVghdbeKrJ5tg0ginOOLB8uncyjb2wO0ZAL5bewTrFqURw//kxzorCB5TDNyPcmKh8GBzMmakaO70XoG5sDIJAQ65Sp+XGMCqIGYw2La0tUF51h2azyYbJ/3gMQkYwHHpyvihP1IZAAsUJ+TjEFOcc4fDBJlh8jL/soo9MDfJz4ympIzZYHzlFRfICfv9Mcz4+RljU6Bx8TakggIcl4GXXJRoan+hmdGaMi9lR72ls+rz8kN9DePV4dWt1vxGLEEpNuolYRK+QAn2YaiXgxBsa/ULLnCQsribcAkd1+52RbZMWqvy+tNpl65CY38n8B/ZBP7EKNHesAAAAASUVORK5CYII=',
		th        :'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI4SURBVDjLlVJNaBNBFP52d2J+tB5iGjFpvUgJtaVGhIA/p+pBsRcRD4o38ejdQ5F66C235CKYg3goCh4KCh7sRVoETQwGhBhFCfgTG9GC2WazO7Pjm9E0S7CgDz7e23n7vvfeN2PcffrjhpS4KqQ/5vs+hA9w5YWKJTj5AQQEl3Tuv1i8PJEDGfOlvHY+N5LAf9jCvXcz/ZgRmy5efn+HOnPqwuGR94Q38HTWz10/ugjPE+EAgdTBpYNX/qm77RApFxgQqKXJllbXty1iooPwzwac6DjOHs/ADRLwPwTKLp5I4v7aV1w4lkSn09FnT161Edl8g6mZKdRqNXz8NIKItFEqlQ57nveBeURAQoJZwINn67AsE49W69jDNugmBBKUG5+cRCqVgrqlRqOO2TEbnO9+2Wq1VvQKSgVmGTiXG8Xy8zai7mdMZ3OIxWK6SIG6IZlMaujRGUOhUDipJ5C0BTOBh5U2TQB0u11dzDnXxZKmGPYKruvC9PjvgxAVzh0ZRYQZW4Vqhe28qlFTMfXqlFmmQYJ90zH3DfR6PR0Pdw/GegLVTWtAK5w6lNBihkMmHMfRPw53D5KoCUytAX1M79+FL9+7OLA3CnvTIS0smKap0d+5L14oFNKemgu6Bbl2c+lt1hX+TvXCFCZ2AIlKZatzJpNBPB5Hs9lEtVqFbdtaJ8Ito88ctGKxuI+Sp9WIBDOdTt/OZrMol8uo1+tzlNtQxITXfyUYtvn5+VkqWiGcyefzj4O5Xx9ItHsmdOWEAAAAAElFTkSuQmCC',
		td        :'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ6SURBVDjLpZNZSNRRGMV//2XGsjFrMg2z0so2K21xIFpepYUiAsGIICLffI8eWiBBeg3qQV+KwBYKLB8qpHUmrahcKLc0QsxldNSxdPz/79LD1ChBUXTh8sG93POdc75zDa01/7NsgGvPR09rzQmpVZZSCqlAKIWUCqk0QqoZWyKFRir1uvxIbsAGUFqXHQqkpP1L57M3Pm5MMJBKpQHUdF9BKIGQAlcJXOlOVykSdye3leO6MmkGQNyHw+uO/1X3bzGBK+S0B1IqAKqDg3986HeCZPffwvJtoNT7lOZLvUdtAPEDAKBkRzo3QwMUb89InN1uGGD3spdE214xe8MRUnM2MfppNW0Pqy7YAK5UKK2xLbhdP4hlmdxpGMQwwQT8ziNiI534c7cT6WrFazikzF2Eb8HS1IQEDdiWwcHAQmpehTkQSAcgNvSMiYFW5uUUMdV3HW+ywefGNqITJsbUUL75k4FWYJtQ+yaMZcXrk1ANk/33mbdiD7EvlRieETy+FJLkMFcjRRSW3emIAwiF1hqPBfu2LGSWbbA1uZ41SfWkrtxPrPcypsfFiWYzFGzGKTjFV28WEJeIUHETLdOgrmkI1VdHpCdEet5enP4qLK9mKrqMgedv6cyrAP+qxOTiUxAi7oEJi8frELoFoTLpa7nI/HQvscgSRt+0kV1SSW7qYtp7xrBMphm4Mi5h/VIfTcEq1u0oJaknSEdNiMYHET7UvcMpPEN31Ed7zxgASmk1I0g6dK66s8CRak5mVxjnfS05+TsZCw/T9baTx1nnGb47DrQksjE6HrsHYPz6nYt3+Sc3L8+wA2tz0J6pF5OD4WP7Kpq7f5fO79DfSxjdtCtDAAAAAElFTkSuQmCC'
	},
	fm:{
		font   :[1,'font','f','Custom Font',''],
		video  :[2,'youtube','you','YouTube Video ID'],
		url    :[2,'torrent','tor','Link to a torrent ID.'],
		raw    :[0,'raw','raw','Disable BBCodes.'],
		search :[1,'search','@','Enter a search term.'],
		table  :[0,'table','tbl','Table'],
		tr     :[0,'tr','tr','Table Row'],
		th     :[0,'th','th','Table Heading'],
		td     :[0,'td','td','Table Division']
	},
	ce:document.createEvent('HTMLEvents'),
	ctrl:function(c){ // ctrl key shortcuts | Don't use W, T, N, O (Chromium/IE Bugs).
		if(!c){return false;} //console.log('key'+c);
		switch(c){
			case 'b': return c;
			case 'i': return c;
			case 'u': return c;
			case 's': return c;
			case 'k': return wbb.oli === true ? '#' : false;
			case 'l': return '*';
			case 'h': return 'url';
			case 'm': return 'img';
			case 'd': return 'del';
			default:return false;
		}
	},
	css:function(){
		var x = '.bbcodes button::-moz-focus-inner{ padding:0px; border: 0px; }\n.bbcodes { padding: 3px; max-width: '+this.width+'px; text-align:center; margin: auto; font-size: 11px }\n.bbcodes button {float:none !important;overflow:hidden;background: #eee; color: #555; font-size: 11px; font-family: "Arial", sans-serif; cursor: pointer;margin: 0px 1px 3px;width:22px;height:21px;padding:1px 1px;text-shadow: #fff 1px 1px 1px;border-top: 1px solid #fff; border-left: 1px solid #fff; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; -moz-border-radius: 2px; border-radius: 2px }\n.bbcodes button img{margin:0!important}.bbcodes button, .bbcodes button img { -moz-transition-duration: .2s; -webkit-transition-duration: .2s; -o-transition-duration: .2s; transition-duration: .2s; }\n.bbcodes button:hover { background-color: #fff; color: #555; border-top: 1px solid #eee; border-left: 1px solid #eee; border-right: 1px solid #bbb; border-bottom: 1px solid #bbb; } #whutbb { padding: 2px 0px }\n#smilebb { } #smilebb img, #smilebb div, #bbopts .save { cursor: pointer }\n#bbopts { } .openbb { height: auto !important; padding: 3px 0px; }\n#smilebb, #bbopts { margin: auto; height: 0px; overflow: hidden; }\n#bbopts span { display: inline-block; margin: 0px 6px 0px 8px; }\n.pressed { background-color: #ddd !important; border-top: 1px solid #aaa !important; border-left: 1px solid #aaa !important; border-right: 1px solid #eee !important; border-bottom: 1px solid #eee !important; } #bbopts select { -moz-border-radius: 2px; border-radius: 2px} .whutbbcon { color: #d06620; display: block !important; padding: 3px 0px } div[over] { max-height:100px; overflow: auto !important; } div[over] img { padding: 1px } .bbcodes button:hover img { opacity: .8} textarea[id^="editbox"] { max-height: 400px; overflow: auto !important }\n#bbopts select { min-width: 60px; max-width: 80px; font-size: 11px !important; } .wbbarea{outline-color: lightblue; max-height: 300px !important; overflow: auto !important;display: block;margin: 3px auto 6px}';
		update.css(x);
	},
	init:function(){
		if(this.site){return false;}
		var i = 0;
		this.ce.initEvent('click', true, true);
		for(;i<this.web.length;i++){ if(document.domain.match(this.web[i])){ this.site = RegExp.lastParen; this.emot = true; break;} }
		if(!strg.on){this.butn.splice(34,1);}
		if(this.site === 'what'){
			this.width = 400;
			this.emotlink = '/static/common/smileys/';
			this.link = '/wiki.php?action=article&name=BBCode';
			this.oli = true;
		}else if(this.site === 'indietorrents'){
			this.width = 440;
			this.butn.splice(15,1); this.butn.splice(4,3); // -
			this.butn.splice(16,0,this.fm.video); this.butn.splice(23,0,[8]); this.butn.splice(23,0,this.fm.table); this.butn.splice(24,0,this.fm.tr); this.butn.splice(25,0,this.fm.td); this.butn.splice(26,0,this.fm.th); // +
			this.emod = this.emof;
			this.emotlink = '/static/common/smileys/'; // '/pic/smilies/';
		}else if(this.site === 'waffles'){
			this.f.raw = this.f.plain;
			this.butn[31] = this.fm.raw; this.butn[28] = this.fm.search; this.butn[26][0] = this.butn[27][0] = 2; // %
			this.butn.splice(30,1); this.butn.splice(24,1); this.butn.splice(10,6); this.butn.splice(4,3); // -
			this.butn.splice(11,0,this.fm.video); this.butn.splice(11,0,this.fm.url); this.butn.splice(6,0,this.fm.font); // +
			this.emod = this.emow;
			this.emotlink = '/pic/smilies/';
			this.link = '/bbcode.php';
		}else if(this.site==='alphaomega'){
			this.width = 400;
			this.emotlink = '/static/common/smileys/';
			this.link = '/wiki.php?action=article&name=bbcode';
			this.oli = true;
			this.emot = true;
			this.fm.video[0]=0;
			this.butn.splice(26,1);
			this.butn.splice(20,0,this.fm.video);
			this.emod.splice(31);
		}else{
			this.site = this.site || 'other';
			if(document.getElementById('userinfo')){this.emot = true; this.emod.splice(31); this.emotlink = '/static/common/smileys/';this.link = '/wiki.php?action=article&name=BBCode';}
			else{this.butn.splice(33,1); this.emot = this.emotlink = this.gaz = false;}
			this.butn.splice(10,0,this.butn[16]);
			this.butn.splice(15,3);
			this.butn.splice(5,2);
			this.width = 480;
			if(this.site==='passthepopcorn'){ this.fm.video[0]=0; this.butn.splice(16,0,this.fm.video); }
		}
		this.go();
	},
	go:function(){
		var A = document.getElementsByTagName('textarea'), B = 0, WBB; // Seeking all textareas . . .
		for(; B < A.length; B++){
			if(!A[B].className || !this.pass.test(A[B].className)){
				WBB = new WhutBB(); // A new WhutBBCode is born. <3
				WBB.q = A[B]; // Wrap to the textarea . . .
				WBB.q.className += ' wbbarea'; // WBB.q.classList.add('wbbarea');
				WBB.Y = B; // ID # . . .
				WBB.i(); // Done!
			}
		}
		if(wbb.gaz){ // for [Edit]
			A = document.querySelectorAll('#content a[onclick^="Edit_Form"]');
			B = A.length;
			while(B--){
				if(A[B].getAttribute('onclick').match(/(?:Edit_Form\('(\d*?)','\d+'\))/)){
					WBB = new WhutBB(); // new
					WBB.Al = A[B]; // wrap
					WBB.Y = RegExp.lastParen;
					WBB.Al.addEventListener('click', WBB.bond(WBB.EB), false);
				}
			}
		}
		if(WBB){this.css();}
	},
	s:strg.read('whutbbcodesettings')
};

// WBB Prototype
WhutBB.prototype = {
	i:function(){
		if(!this.established){
			var x = 0, y = wbb.emod.length;
			this.Read();
			this.l();
			this.D.className = 'bbcodes'; this.D.id = 'bbcode'+this.Y; this.F.id = 'smilebb'; this.L.id = 'bbopts'; this.W.id = 'whutbb';
			if(y >= wbb.max){ y=wbb.max; }
			if(wbb.emot){for(;x<y;x++){this.v(wbb.emod[x]);} if(x === wbb.max){this.b();} }
			for(x=0; x < wbb.butn.length; x++){this.w(wbb.butn[x]);}
			for(x=0; x < wbb.optn.length; x++){this.u(wbb.optn[x]);}
			this.D.appendChild(this.L);
			this.D.appendChild(this.F);
			this.keys();
			this.established = true;
		}
		this.D.removeAttribute('style');
		wbb.gaz ? this.q.parentNode.insertBefore(this.D, this.q.nextSibling) : this.q.parentNode.insertBefore(this.D, this.q);
	},
	m:function(){
		this.Con.textContent = this.message;
	},
	u:function(t){
		var span = document.createElement('span'), L, i = -1, O; this.L.appendChild(span);
		if(t[1] === 'Y'){
			span.textContent = t[0]; span.className = 'save';
			if(t[2] === 'whutbbcon'){ span.className = 'whutbbcon'; this.Con = span; }
			else{
				if(t[0] === 'Save') { span.addEventListener('click',this.bond(this.Save), false); }
				else if(t[0] === 'Clear'){ span.addEventListener('click',this.bond(this.Clear), false); }
			}
		}else{
			span.textContent = t[0][0]; span.title = t[0][1];
			L = document.createElement('select'); L.name = t[0][0]; L.id = t[0][0]+'_'+this.Y;
			this.L.appendChild(L);
			while(++i<t[1].length){
				O = document.createElement('option');
				O.textContent = t[1][i][0];
				O.value = t[1][i][1];
				if( (t[0][0] === 'Prompts' && wbb.s.m === +O.value) || (t[0][0] === 'Icons' && wbb.s.n === +O.value) || (t[0][0] === 'Link' && wbb.s.o === +O.value) ){ O.setAttribute('selected','selected'); }
				L.appendChild(O);
			}
		}
	},
	v:function(t){
		if(!wbb.site){return false;}
		var I = document.createElement('img');
		I.title = I.alt = t[0];
		I.src = wbb.emotlink+t[1];
		I.addEventListener('click',this.bond(this.h), false);
		this.F.appendChild(I);
	},
	b:function(){
		this.emoticonplus = this.bond(this.c);
		this.TM = document.createElement('div');
		this.TM.textContent = '(Show All Emoticons)';
		this.TM.addEventListener('click',this.emoticonplus, false);
		this.F.appendChild(this.TM);
		this.F.setAttribute('over','true');
		wbb.emod = wbb.emod.slice(wbb.max);
	},
	c:function(){
		var i = -1, j = wbb.emod.length;
		while(++i<j){ this.v(wbb.emod[i]); }
		if(this.TM){ this.TM.removeEventListener('click',this.emoticonplus,false);  this.F.removeChild(this.TM); delete this.TM; }
	},
	w:function(t){
		var BU, I, bond;
		if(t[0] === 8){
			BU = document.createTextNode(' ');
		}else{
			BU = document.createElement('button');
			if(wbb.s.n === 1){
				I = document.createElement('img');
				I.src = 'data:image/png;base64,'+wbb.f[t[1]];
				I.alt = t[1];
				BU.appendChild(I);
			}else{ BU.textContent = t[2]; }
			if(t[4]){BU.value = t[4];}
			BU.name = t[1];
			BU.title = t[3];
			BU.setAttribute('type','button');
			BU.className = 'whutbbutton';
			BU.setAttribute('idn',t[0]);
			bond = t[0] !== 9 ? this.bond(this.p) : this.bond(this.k);
			BU.addEventListener('click',bond,false);
			this.BB[t[1]] = BU;
		}
		this.D.appendChild(BU);
	},
	k:function(e){
		if(/(?:\b(?:delete)\b)/i.test(e.title)){this.q.value = ''; this.q.focus(); return;}
		e.className = e.className === 'pressed' ? '' : 'pressed';
		if(e.title === 'Emoticons'){
			if(wbb.s.n === 2){ e.textContent = e.textContent === ':]' ? ':P' : ':]'; }
			else{
				if(e.firstChild.alt === ':]'){ e.firstChild.alt = ':P'; e.firstChild.src = 'data:image/png;base64,'+wbb.f[':P']; }
				else{ e.firstChild.alt = ':]'; e.firstChild.src = 'data:image/png;base64,'+wbb.f[':]']; }
			}
			this.F.hasAttribute('class') ? this.F.removeAttribute('class') : this.F.className = 'openbb';
		}else{
			this.L.hasAttribute('class') ? this.L.removeAttribute('class') : this.L.className = 'openbb';
		}
	},
	h:function(e){
		this.t = e.alt;
		this.j();
		this.pos = this.T+this.t.length+1; // s
		this.y(1);
	},
	p:function(e){
		var i = 0, n, rn, tag=e.name, tagtype=parseInt(e.getAttribute('idn'),10), opt='', m=false, a=false, equal; this.j(); this.pos = 0; // console.log(tagtype);
		if(tag === 'left' || tag === 'center' || tag === 'right'){ opt = tag; tag = 'align'; a=true; }
		if(tagtype === 1){ // Expects two user inputs: 1) option 2) text. [tag="option"]text[/tag]
			if(wbb.s.m < 2 || a){ opt = tag === 'color' || tag === 'size' || tag === 'font' ? e.value : opt; }
			else{
				if((opt = prompt(e.title, e.value)) === null){return false;}
				m = 'Type the text/data to be wrapped or press enter.';
			}
		}
		if(opt){this.pos = opt.length+1;}
		if(wbb.s.m < 3 || this.selection){this.t = this.selection;}else{ m = m || e.title; this.g = m ? '' : e.value; if((this.t = prompt(m, this.g)) === null){equal = false;return false;} }
		this.t = this.t || '';
		this.pos += this.t.length;
		this.pos += this.T+tag.length+2; // []
		switch(tagtype){
			case 0 : if(tag === 'src'){ this.t = '[quote=Code][pre]'+this.t+'[/pre][/quote]'; this.pos += 12; }else{ this.t = '['+tag+']'+this.t+'[/'+tag+']'; } break;
			case 1 : this.t = opt ? '['+tag+'='+opt+']'+this.t+'[/'+tag+']' : '['+tag+']'+this.t+'[/'+tag+']'; break;
			case 2 : this.t = '['+tag+'='+this.t+']'; break; // User text with no closing tag: [tag=text].
			case 3 :
				if(tag === '*' || tag === '#'){
					rn = this.t.split('\n');
					this.pos += this.t.length;
					if(rn.length === 1){ // n = this.pos > 3 ? "\n" : '';
						this.t = /* n+ */ '['+tag+']'+this.t; // if(n){this.pos++;}
					}else{
						this.t = '';
						for(; i < rn.length; i++){
							this.t += '['+tag+']'+rn[i];
							if(i < rn.length){ this.t += '\n'; }
							this.pos += (i * 3);
						}
					}
				}else{ this.t = '['+tag+']'+this.t; } break;
			case 4 : this.pos -= 4; this.t = '[['+this.t+']]'; break; // [[]] []
			default: return false;
		}
		this.selection = false;
		this.y();
	},
	j:function(){
		if(this.q.selectionStart >= 0){
			if(this.q.selectionEnd > this.q.value.length){ this.q.selectionEnd = this.q.value.length; } // work around Mozilla Bug #190382
			this.T = this.q.selectionStart || 0;
			this.E = this.q.selectionEnd || 0;
			this.selection = this.q.value.substr(this.T,this.E-this.T);
			this.selection = this.selection.length > 0 ? this.selection : ''; //console.log(this.T+'('+this.selection+')'+this.E);
		}
	},
	y:function(space){
		if(!this.t){return false;}
		if(this.q.value.length > 0 && space){ this.t = ' '+this.t; }
		this.q.value = this.q.value.substring(0, this.T) + this.t + this.q.value.substring(this.E, this.q.value.length);
		this.T !== null ? this.z() : (this.q.value += this.t);
		this.t = false;
	},
	z:function(){
		if(this.q.selectionStart >= 0){ this.q.focus(); this.q.setSelectionRange(this.pos-(this.E-this.T), this.pos); }
	},
	PU:function(e){
		var i = -1, j = this.inputs.length;
		e && e.value === 'Editor' ? this.D.removeAttribute('style') : this.D.style.display = 'none';
		while(++i<j){ this.ins = this.inputs[i]; this.ins.addEventListener('click',this.bond(this.PU), false); }
	},
	EB:function(){
		if(this.q = document.getElementById('editbox'+this.Y)){
			this.q.className += ' wbbarea'; // this.q.classList.add('wbbarea');
			this.q.removeAttribute('onkeyup');
			this.bar = document.getElementById('bar'+this.Y);
			this.inputs = this.bar.getElementsByTagName('input');
			this.PU();
			this.i();
			if(this.edit){this.keys();}
		}
		this.edit = true;
	},
	l:function(){
		if(wbb.s.o === 2){return false;}
		this.A.textContent = this.A.title = 'WhutBBCode?';
		this.A.href = wbb.link;
		if(wbb.site === 'waffles'){ this.A.textContent += ' Waffles Edition'; }
		this.W.appendChild(this.A);
		this.D.appendChild(this.W);
	},
	f:function(id){
		var el = this.BB[id];
		if(el){ if(el.click){ el.click(); } else { el.dispatchEvent(wbb.ce); } }
	},
	a:function(e){
		if(e.ctrlKey){
			var k = wbb.ctrl(String.fromCharCode(e.which).toLowerCase());
			if(k){
				e.preventDefault();
				if(e.type === 'keypress'){return;} // Firefox 4+ workaround
				this.f(k);
			}
		}
	},
	keys:function(){
		this.q.addEventListener('keydown' ,this.bond(this.a,true),false);
		this.q.addEventListener('keypress',this.bond(this.a,true),false); // Firefox 4+ workaround
	},
	Save:function(){
		this.M = document.getElementById('Prompts_'+this.Y);
		this.N = document.getElementById('Icons_'+this.Y);
		this.O = document.getElementById('Link_'+this.Y);
		this.M = this.M.options[this.M.selectedIndex].value;
		this.N = this.N.options[this.N.selectedIndex].value;
		this.O = this.O.options[this.O.selectedIndex].value;
		if(strg.on){
			wbb.s = {'m':this.M,'n':this.N,'o':this.O};
			strg.save('whutbbcodesettings',wbb.s);
			var whuts = wbb.site === 'waffles' ? 'Waffles' : 'What? CDs';
			this.Con.textContent = whuts+' & cookies! How nice of you. :3 (Refresh . . .)';
			this.message = ''; setTimeout(this.bond(this.m),3500);
		}else{ this.message = 'Saving settings has failed.'; setTimeout(this.bond(this.m),4000); }
	},
	Read:function(){
		wbb.s = strg.zero(wbb.s) ? {m:2,n:1,o:1} : {m:+wbb.s.m,n:+wbb.s.n,o:+wbb.s.o};
	},
	Clear:function(){
		strg.wipe('whutbbcodesettings');
		this.Con.textContent = 'My cookies are eaten! :\'( . . .'; this.message = ''; setTimeout(this.bond(this.m),3000);
	}
};

wbb.init();