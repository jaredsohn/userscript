////////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Msgpluslive.tld Help Links
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/40364
// @description     Add extra help links.
// @description     Msgpluslive.tld Help Links v1 Alpha
// @copyright       2008 Jerone
// @version         v1 Alpha
// @versiontext     Initial release.
// @browser         FF3
// @include         http://www.msgpluslive.tld/*
// ==/UserScript==
/*//////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - Framework Check
// - Userscript
// - Statistics
////////////////////////////////////////////////////////////////////////////
THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR `AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////////////////
// History:
// [+] = added; [-] = removed; [/] = fixed; [*] = updated;
// - 12-01-2009 23:00 [v1 Alpha]:
//   [+] initial release;
////////////////////////////////////////////////////////////////////////////
// Todo:
//  - 
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script does NOT work without it's framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** FRAMEWORK CHECK ***//
if(!window.US||!window.US.Framework){if(window.US!==null&&confirm(String.fromCharCode(83,111,109,101,116,104,105,110,103,32,119,101,110,116,32,119,114,111,110,103,32,119,105,116,104,32,116,104,101,32,85,83,32,70,114,97,109,101,119,111,114,107,46,32,92,110,77,97,107,101,32,115,117,114,101,32,105,116,32,105,115,32,105,110,115,116,97,108,108,101,100,32,99,111,114,114,101,99,116,108,121,32,111,114,32,114,101,105,110,115,116,97,108,108,32,116,104,101,32,115,99,114,105,112,116,46,32,92,110,92,110,68,111,32,121,111,117,32,119,97,110,116,32,116,111,32,103,111,32,116,111,32,116,104,101,32,115,99,114,105,112,116,115,32,104,111,109,101,112,97,103,101,63).replace(/\\n/g,"\n")))GM_openInTab("http://userscripts.org/scripts/show/39678");window.US=null;return;}else if(!window.US.Framework())return;

function getLanguage(){
	var lang="browser";
	if(!!location.href.match(/\?lang=en/)){  // English (default);
		lang="en";
	}else if(!!location.href.match(/\?lang=zh-cn/)){  // Chinese Simplified;
		lang="zh-cn";
	}else if(!!location.href.match("http://www.msgpluslive.com.tw")){  // Chinese Traditional;
		lang="zh-tw";
	}else if(!!location.href.match("http://www.msgpluslive.dk")){  // Dansk;
		lang="da";
	}else if(!!location.href.match("http://www.msgpluslive.de")){  // Deutsch;
		lang="de";
	}else if(!!location.href.match("http://www.msgpluslive.es")){  // Espanol;
		lang="es";
	}else if(!!location.href.match("http://www.msgpluslive.ee")){  // Eesti;
		lang="et";
	}else if(!!location.href.match("http://www.msgpluslive.fr")){  // Francais;
		lang="fr";
	}else if(!!location.href.match("http://www.msgpluslive.it")){  // Italiano;
		lang="it";
	}else if(!!location.href.match("http://www.msgpluslive.nl")){  // Dutch;
		lang="nl";
	}else if(!!location.href.match("http://www.msgpluslive.no")){  // Norsk;
		lang="no";
	}else if(!!location.href.match("http://www.msgpluslive.com.br")){  // Portugues;
		lang="br";
	}else if(!!location.href.match(/\?lang=sv/)){  // Svenska;
		lang="sv";
	}else if(!!location.href.match(/\?lang=th/)){  // Thai;
		lang="th";
	}else if(!!location.href.match(/\?lang=tr/)){  // Turkce;
		lang="tr";
	}else if($gi("lang")){
		lang=$gi("lang").value;
	}
	return lang.toLowerCase();
}

var language=new US.Language({
	langMod:getLanguage(),
	locals:{
		'en':{  // English (default);
			'msg+l':{
				'faq'	: 'FAQs',
				'forum'	: 'Forum',
				'chat'	: 'Chat'}},
		'zh-cn':{  // Chinese Simplified;
			'msg+l':{
				'faq'	: '&#24120;&#35265;&#38382;&#39064;',
				'forum'	: '&#35770;&#22363;&#31038;&#21306;',
				'chat'	: '&#32842;&#22825;&#23460;'}},
		'zh-tw':{  // Chinese Traditional;
			'msg+l':{
				'faq'	: '&#24120;&#35211;&#21839;&#38988;&#38598;',
				'forum'	: '&#35342;&#35542;&#21312;',
				'chat'	: '&#32842;&#22825;&#23460;'}},
		'da':{  // Dansk;
			'msg+l':{
				'faq'	: 'FAQ',
				'forum'	: 'Forummer',
				'chat'	: 'Chat'}},
		'de':{  // Deutsch;
			'msg+l':{
				'faq'	: 'FAQs',
				'forum'	: 'Forum',
				'chat'	: 'Chat'}},
		'es':{  // Espanol;
			'msg+l':{
				'faq'	: 'FAQs',
				'forum'	: 'Foros',
				'chat'	: 'Chat'}},
		'et':{  // Eesti;
			'msg+l':{
				'faq'	: 'KKK',
				'forum'	: 'Foorumid',
				'chat'	: 'Jututuba'}},
		'fr':{  // Francais;
			'msg+l':{
				'faq'	: 'FAQ',
				'forum'	: 'Forum',
				'chat'	: 'Chat'}},
		'it':{  // Italiano;
			'msg+l':{
				'faq'	: 'FAQ',
				'forum'	: 'Forum',
				'chat'	: 'Chat'}},
		'nl':{  // Dutch;
			'msg+l':{
				'faq'	: 'FAQs',
				'forum'	: 'Forum',
				'chat'	: 'Chat'}},
		'no':{  // Norsk;
			'msg+l':{
				'faq'	: 'FAQs',
				'forum'	: 'Forum',
				'chat'	: 'Chat'}},
		'br':{  // Portugues;
			'msg+l':{
				'faq'	: 'FAQs',
				'forum'	: 'Fóruns',
				'chat'	: 'Canal'}},
		'sv':{  // Svenska;
			'msg+l':{
				'faq'	: 'FAQn',
				'forum'	: 'Forumet',
				'chat'	: 'Chatten'}},
		'th':{  // Thai;
			'msg+l':{
				'faq'	: '&#3588;&#3635;&#3606;&#3634;&#3617;&#3607;&#3637;&#3656;&#3614;&#3610;&#3610;&#3656;&#3629;&#3618;',
				'forum'	: '&#3585;&#3619;&#3632;&#3604;&#3634;&#3609;&#3626;&#3609;&#3607;&#3609;&#3634;&#3651;&#3609;&#3594;&#3640;&#3617;&#3594;&#3609;',
				'chat'	: '&#3649;&#3594;&#3607;&#3626;&#3604;&#3654;'}},
		'tr':{  // Turkce;
			'msg+l':{
				'faq'	: 'SSS',
				'forum'	: 'Forumlar&#305;',
				'chat'	: 'Canl&#305;'
}}}});

new US.Update({check4Update:true,updateTime:1*60*60*1000,title:"Msgpluslive.tld Help Links",thisVersion:'v1 Alpha',versionUrl:40364,updateUrl:40364,language:getLanguage()});

eval(US.Functions.prototype({}));



//*** USERSCRIPT ***//
var MFL = {
	init: function(){
		if((help=$gi("navhelp"))){
			var ul=$ia(help.firstChild,$ce("UL"));
			$sa(ul,"id","newul");
			var li1a=$ac($ac(ul,$ce("LI")),$ce("A"));
			$ih(li1a,language.localise(["msg+l","faq"]));
			$sa(li1a,"href","/help/faq/");
			var li3a=$ac($ac(ul,$ce("LI")),$ce("A"));
			$ih(li3a,language.localise(["msg+l","forum"]));
			$sa(li3a,"href","http://www.msghelp.net/");
			var li4a=$ac($ac(ul,$ce("LI")),$ce("A"));
			$ih(li4a,language.localise(["msg+l","chat"]));
			$sa(li4a,"href","/help/chat/");
			
			$addCSS(<style><![CDATA[
				#newul{
					background:white none repeat scroll 0 0;
					list-style-type:none;
					margin:0;
					padding:6px 0 6px 10px;
					position:absolute;
					visibility:hidden;
				}
				body #container #header #navhelp #newul li a{
					background-color:white;
					border:0 none;
					color:#999999;
					font-size:11px;
					font-weight:normal;
					margin:0;
					padding: 3px 5px 3px 5px;
				}
				body #container #header #navhelp #newul li a:hover{
					color:#666;
				}
			]]></style>.toString(),false,top.document);
			
			$addJS(<script><![CDATA[(function(){
				var popup = $('newul');
				var downloadLink = $('navhelp');
			
				downloadLink.observe('mouseout', function(e){
					if(e.relatedTarget.descendantOf(this) || e.relatedTarget == this) return;
					Effect.Queues.get(popup.id).invoke('cancel');
					new Effect.Fade(popup, {
						duration : 0.5,
						delay : 0.2,
						queue : {position:'front', scope:popup.id}
					});
				}.bindAsEventListener(downloadLink));
				
				downloadLink.observe('mouseover', function(e){
					if(e.relatedTarget.descendantOf(this) || e.relatedTarget == this) return;
					Effect.Queues.get(popup.id).invoke('cancel');
					popup.showNextTo(this, 'bottom', 'Appear', {
						duration : 0.5,
						from : 0,
						to : 0.99,
						queue : {position:'front', scope:popup.id}
					});
				}.bindAsEventListener(downloadLink));
			})()]]></script>.toString());
}	}	}

MFL.init();  // execute;



//*** STATISTICS ***//
// Chars (exclude spaces): 7.636
// Chars (include spaces): 8.851
// Chars (Chinese): 0
// Words: 730
// Lines: 257