/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            GeenStijl.nl Comment Exchanger
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/35698
// @description     Exchange GeenStijl.nl comment system.
// @description     GeenStijl.nl Comment Exchanger v1.5 Beta
// @copyright       2008 Jerone
// @version         v1.5 Beta
// @versiontext     Updated framework.
// @browser         FF3
// @include         http://www.geenstijl.nl/*
// @include         http://www.geenstijl.tv/*
// @include         http://www.spitsnieuws.nl/*
// @include         http://www.dumpert.nl/*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - Framework Check
// - User Settings
// - User Script
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
// - 19-10-2008 19:00 [v1 Alpha]:
//   [+] initial release;
// - 30-10-2008 01:30 [v1.1 Alpha]:
//   [+] added support for GeenStijl.tv & SpitsNieuws.nl & Dumpert.nl;
// - 30-10-2008 15:15 [v1.2 Alpha]:
//   [+] added premalink button;
//   [+] added premalink to reply;
//   [/] removed double spaces in reply;
// - 01-11-2008 14:30 [v1.3 Beta]:
//   [/] bug with padding & margin;
//   [+] added comment toolbar;
//   [+] added delete button;
//   [+] added pre-defined comments;
// - 01-11-2008 23:00 [v1.4 Beta];
//   [+] added top button;
// - 21-11-2008 21:30 [v1.4.1 Beta];
//   [/] fixed small bug in framework check;
// - 10-01-2009 18:00 [v1.5 Beta]:
//   [*] updated framework;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - Comment box on top;
// - Full dates;
// - Get working on http://www.gamert.nl/*
// - Put reactions on your comments below each other;
// - Add settings window;
// - Remove adds;
// - Split ## comments in tabs;
// - Color dates;
// - Add comments below article on homepage;
// - Reverse comments order;
// - Always show your own comments when logged in;
// - Open premalinks in reply in same window;
// - Number comments;
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script does NOT work with it's framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** FRAMEWORK CHECK ***//
if(!window.US||!window.US.Framework){if(window.US!==null&&confirm("Something went wrong with the US Framework. \nMake sure it is installed correctly or reinstall the script. \n\nDo you want to go to the scripts homepage?"))GM_openInTab("http://userscripts.org/scripts/show/39678");window.US=null;return;}else if(!window.US.Framework())return;

new US.Language({langMod:"browser"});

new US.Update({check4Update:true,updateTime:1*60*60*1000,language:"browser",title:"GeenStijl.nl Comment Exchanger",thisVersion:'v1.5 Beta',versionUrl:35698,updateUrl:35698});

eval(US.Functions.prototype({Number:[],String:["trim"],Array:[],Object:[]}));



//*** USER SETTINGS ***//
const addReplyBtn	= true;			// [Boolean] add reply button;
 const addPremaLink	= true;			// [Boolean] add also premalink after reply;
const addHiderBtn	= true;			// [Boolean] add hider button;
const addPremaBtn	= true;			// [Boolean] add premalink button;
const addTopBtn		= true;			// [Boolean] add top button;

const hideNewbies	= true;			// [Boolean] hide all newbie comments;
const hideNames = {					// [Object { String : Boolean },{...}] hide names;
	"userName1" : true,					// [String] user name;
	"userName2" : false,				// [Boolean] hide user comment or always show user comment (override hide newbies);
	"userName3" : true};

const highlightNames = {			// [Object { String : String },{...}] highlight names;
	"userName1" : "#FFDDFF",			// [String] user name;
	"userName2" : "#FFFFDD",			// [String COLOR] background color;
	"userName3" : "#DDFFFF"};

const showComBar	= true			// [Boolean] show comment toolbar;
 const addDelBtn	= true;			// [Boolean] add delete button;
 const addPreCom = [				// [Array [ String, ... ]] add pre-defined comments (use \n for new lines);
	"Hey, dit is vet",
	"+1 lkkr ding"];



//*** USER SCRIPT ***//
var index=0;
Array.forEach($x("//div[@class='comment'] | //div[@class='reactie']"),function(comment){
	// common;
	var commentContainer = $af(comment,$ce("DIV"));
	Array.forEach($x("p[not(@*)]",comment),function(p){
		$ac(commentContainer,p);
	});
	$sa(comment,"style","padding:7px; margin:0px;");
	
	// add reply button;
	if(addReplyBtn && $gi("loggedin") && $hs($gi("loggedin"),1,true)){
		var replyImg = "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABcSURBVChTjZBbDsAgCATl2PDFzW236RjqI+kmSsBxQS0i+q2GzKzVfBy8oOCj3L03bRIROjNHbQGBgRQx+TgC6ALQEawtGeNpzWNwETjD2xlVrGtp/et7ZpddfgEnfhsfVr//KQAAAABJRU5ErkJgggA=";
		var temp = null, addReplyBtnTemp = true;
		if((temp=$xs("*/span[@class='umod']",comment))){
			var quote = $ib(temp,$ce("SPAN"));
			$sa(quote,"class","umod");
			$sa(quote,"title","Beantwoorden");
			$sa(quote,"style","right:40px !important; background:url('"+replyImg+"') no-repeat scroll !important;");
			$addEvent(quote,"click",function(){
				$gi("text").value = "@" + this.parentNode.textContent.trim().replace(/\s{2}/," ") + (addPremaLink?" | "+location.href.split("#")[0]+"#"+this.parentNode.parentNode.id:"") + "\n";
				$gi("text").focus();
			});
		}
		else if((temp=$xs("*/img[@class='umod']",comment))){
			var quote = $ib(temp,$ce("IMG"));
			$sa(quote,"src",replyImg);
			$sa(quote,"alt","reply");
			$sa(quote,"class","umod");
			$sa(quote,"title","Beantwoorden");
			$sa(quote,"style","right:23px !important;");
			$addEvent(quote,"click",function(){
				$gi("text").value = "@" + this.parentNode.textContent.trim().replace(/\s{2}/," ") + (addPremaLink?" | "+location.href.split("#")[0]+"#"+this.parentNode.parentNode.id:"") + "\n";
				$gi("text").focus();
			});
	}	}
	else{
		addReplyBtnTemp = false;
	}
	
	// highlight names;
	if(highlightNames){
		for(var name in highlightNames){
			if($xs("p[@class='footer']",comment).textContent.match(name.toString())){
				$sa(comment,"style","padding:10px; margin:0px; background-color: " + highlightNames[name]);
	}	}	}
	
	// hide newbie;
	if(hideNewbies && $xs("*/span[@class='baby' and @title='newbie']",comment)){
		$hs(commentContainer,0);
	}
	
	// hide names;
	if(hideNames){
		for(var name in hideNames){
			if($xs("p[@class='footer']",comment).textContent.match(name.toString())){
				$hs(commentContainer,hideNames[name]?0:1);
	}	}	}
	
	// add hider button;
	if(addHiderBtn){
		$sa(commentContainer,"id","hide_"+comment.id);
		var temp = null;
		var imgPlus = "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABBSURBVChTY6yqqvoPBAwwwMjIyIDMh0tUVlaCFOIFIDUMtFPY0NDwHx0fOHAA7CQUq0GC2DBcIdTXA+UZkGMJYQC6IzmmL65/7AAAAABJRU5ErkJgggA=";
		var imgMin = "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABZSURBVChTnVBBDsAgCINnw4mn8TNnl5WoMXNZkyaipRTV3VuHEKoqY10PZgbhK6CRVRgRLTOnxn9COK2k8+SIS5CjWSPDLXy2rkyfM45O7N4us/unEuJw4gVP/jC+F5DigwAAAABJRU5ErkJgggA=";
		if((temp=$xs("*/span[@class='umod']",comment))){
			var hider = $ib(temp,$ce("SPAN"));
			$sa(hider,"class","umod");
			$sa(hider,"title","Reactie weergeven/verbergen");
			$sa(hider,"style","right:"+(addReplyBtnTemp?"60":"40")+"px !important; background:url(\'"+($hs(commentContainer,0,true)?imgMin:imgPlus)+"\') no-repeat scroll !important;");
			eval('$addEvent(hider,"click",function(){				'+
				'	$hs($gi("hide_'+comment.id+'"),3);				'+
				'	if($hs($gi("hide_'+comment.id+'"),0,true)){		'+
				'		$sa(hider,"style","right:"+(addReplyBtnTemp?"60":"40")+"px !important; background:url(\'"+imgMin+"\') no-repeat scroll !important;");	'+
				'	}												'+
				'	else{											'+
				'		$sa(hider,"style","right:"+(addReplyBtnTemp?"60":"40")+"px !important; background:url(\'"+imgPlus+"\') no-repeat scroll !important;");								'+
				'	}												'+
			'})');
		}
		else if((temp=$xs("*/img[@class='umod']",comment))){
			var hider = $ib(temp,$ce("IMG"));
			$sa(hider,"src",($hs(commentContainer,0,true)?imgMin:imgPlus));
			$sa(hider,"alt","showhide");
			$sa(hider,"class","umod");
			$sa(hider,"title","Reactie weergeven/verbergen");
			$sa(hider,"style","right:"+(addReplyBtnTemp?"43":"23")+"px !important;");
			eval('$addEvent(hider,"click",function(){												'+
				'	$hs($gi("hide_'+comment.id+'"),3);												'+
				'	if($hs($gi("hide_'+comment.id+'"),0,true)){										'+
				'		$sa(hider,"src",imgMin);													'+
				'		$sa(hider,"style","right:"+(addReplyBtnTemp?"43":"23")+"px !important;");	'+
				'	}																				'+
				'	else{																			'+
				'		$sa(hider,"src",imgPlus);													'+
				'		$sa(hider,"style","right:"+(addReplyBtnTemp?"43":"23")+"px !important;");	'+
				'	}																				'+
			'})');
	}	}
	
	// add premalinks button;
	if(addPremaBtn){
		var premaImg = "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABFSURBVChTY6yqqvoPBAwwwMjIyIDMh0tUVlaCFOIFIDUMtFfY0NDwH4QPHDgAdw5Wq3EqhPoarhtkEgzDBGnoGZDRhDAABYY8ncaLac0AAAAASUVORK5CYIIA";
		var temp = null;
		if((temp=$xs("*/span[@class='umod']",comment))){
			var prema = $ib(temp,$ce("SPAN"));
			$sa(prema,"class","umod");
			$sa(prema,"title","Premalink");
			$sa(prema,"style","right:"+(addReplyBtnTemp?addHiderBtn?"80":"60":addHiderBtn?"60":"40")+"px !important; background:url('"+premaImg+"') no-repeat scroll !important;");
			$addEvent(prema,"click",function(){
				var linkie = location.href.split("#")[0]+"#"+this.parentNode.parentNode.id;
				location.href = linkie;
				window.prompt("Premalink:",linkie);
			});
		}
		else if((temp=$xs("*/img[@class='umod']",comment))){
			var prema = $ib(temp,$ce("IMG"));
			$sa(prema,"src",premaImg);
			$sa(prema,"alt","prema");
			$sa(prema,"class","umod");
			$sa(prema,"title","Premalink");
			$sa(prema,"style","right:"+(addReplyBtnTemp?addHiderBtn?"63":"43":addHiderBtn?"43":"23")+"px !important;");
			$addEvent(prema,"click",function(){
				var linkie = location.href.split("#")[0]+"#"+this.parentNode.parentNode.id;
				location.href = linkie;
				window.prompt("Premalink:",linkie);
			});
	}	}
	
	// add top button;
	if(addTopBtn && index%8==0){
		var topImg = "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABKSURBVChTY6yqqvoPBAwwwMjIyIDMh0tUVlaCFOIFIDUM6ApB/AMHDqBoxFAIU4SuGEUhNkmYyaRZDfU12E20sRpbOMHdCGIQwgBR1S8sO8i4fAAAAABJRU5ErkJgggA=";
		var temp = null;
		if((temp=$xs("*/span[@class='umod']",comment))){
			var top = $ib(temp,$ce("SPAN"));
			$sa(top,"class","umod");
			$sa(top,"title","Top");
			$sa(top,"style","right:0px !important; background:url('"+topImg+"') no-repeat scroll !important;");
			$addEvent(top,"click",function(){
				location.href = location.href.split("#")[0]+"#container";
			});
		}
		else if((temp=$xs("*/img[@class='umod']",comment))){
			var top = $ib(temp,$ce("IMG"));
			$sa(top,"src",topImg);
			$sa(top,"alt","top");
			$sa(top,"class","umod");
			$sa(top,"title","Top");
			$sa(top,"style","right:-17px !important;");
			$addEvent(top,"click",function(){
				location.href = location.href.split("#")[0]+"#container";
			});
	}	}
	
	index++;
});

// comments toolbar;
if(showComBar){
	if((addPreCom.length>0 || addDelBtn) && $gi("text") && $gi("loggedin") && $hs($gi("loggedin"),1,true)){
		var container = $ib($gi("text"),$ce("DIV"));
		$sa(container,"style","position:relative;");
		
		var textArea = $ac(container,$me($gi("text")));
		var toolsbar = $ia(textArea,$ce("DIV"));
		if(location.href.toLowerCase().match("geenstijl")){
			$sa(toolsbar,"style","position:absolute; right:0px; top:2px;");
		}
		else if(location.href.toLowerCase().match("dumpert")){
			$sa(toolsbar,"style","position:absolute; right:6px; top:1px;");
		}
		else if(location.href.toLowerCase().match("spitsnieuws")){
			$sa(toolsbar,"style","position:absolute; right:-2px; top:2px;");
		}
		
		// delete button;
		if(addDelBtn){
			var delImg = "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVDhP7VNBDsAgCNNn8zt+xtYlGGEgxl3XxHCAVsDa5Ub7AghEYGYhIkFcoc1JEKrjxYYAiDvwdUagul3z81ivEdCFFvioOykFtM0o+qWGHfwC8pgJOF5iZqjI2uYV1P+ZoaJ/YQR2rJz+hRMyOBefkU9eTdQPxQAAAABJRU5ErkJgggA=";
			var btn = $ac(toolsbar,$ce("IMG"));
			$sa(btn,"src",delImg);
			$sa(btn,"alt","delete");
			$sa(btn,"title","Opnieuw beginnen");
			$sa(btn,"class","toolBarItem");
			$addEvent(btn,"click",function(){
				$gi("text").value = "";
				$gi("text").focus();
			});
		}
		
		// pre-defined comments;
		if(addPreCom.length>0){
			var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
				char = 0;
			Array.forEach(addPreCom,function(txt){
				if(txt=="") return;
				var btn = $ac(toolsbar,$ce("DIV"));
				$sa(btn,"title","Tekst toevoegen: " + txt.toString());
				$sa(btn,"class","toolBarItem");
				$ih(btn,alpha.split("")[char]);
				$addEvent(btn,"click",function(){
					$gi("text").value += txt.toString() + "\n";
					$gi("text").focus();
				});
				char++;
			});
		}
		
		$addCSS(<><![CDATA[
			.toolBarItem{
				background-color: white;
				margin:			1px 0px;
				border:			1px solid #787878;
				display:		block;
				cursor:			pointer;
				height:			16px;
				width:			16px;
				color:			#787878;
				text-align:		center;
				font-weight:	bold;
			}
			.toolBarItem:hover{
				border-color:	black;
			}
		]]></>.toString());
}	}



//*** STATISTICS ***//
// Chars (exclude spaces): 13.043
// Chars (include spaces): 14.897
// Chars (Chinese): 0
// Words: 1.206
// Lines: 358