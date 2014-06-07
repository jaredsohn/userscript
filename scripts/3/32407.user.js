/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            UserScript Finder
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/32407
// @description     Find userscripts related to the current site on Userscripts.org
// @description     UserScript Finder v1.3.2 Beta
// @copyright       2008 Jerone
// @version         v1.3.2 Beta
// @versiontext     Updated framework.
// @browser         FF3
// @include         *
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
// - 24-08-2008 17:00 [v1 Alpha]:
//   [+] initial release;
// - 24-08-2008 17:30 [v1.1 Alpha]:
//   [*] minor improvements;
// - 02-09-2008 12:00 [v1.2 Beta]:
//   [/] fixed bug for GM_xmlhttpRequest on Firefox 3;
// - 03-09-2008 01:45 [v1.3 Beta]:
//   [+] added translation (US_language);
// - 21-11-2008 22:45 [v1.3.1 Beta]:
//   [*] removed global load event;
//   [/] fixed small bug in framework check;
// - 10-01-2009 17:45 [v1.3.2 Beta]:
//   [*] updated framework;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - 
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script does NOT work with it's framework:
//   - US Framework => http://userscripts.org/scripts/show/39678
//   - US Functions => http://userscripts.org/scripts/show/16142
//   - US Language => http://userscripts.org/scripts/show/16143
//   - US Options => http://userscripts.org/scripts/show/31458
//   - US Update => http://userscripts.org/scripts/show/16144
// - Google Error - We're sorry...
//   Use with care, as Google (where the results come from) might block the results.
//   When you think you don't get any results, click the link on fieldsets legend name.
//   If Google has blocked your results, you'll see a message. 
//   Filling the characters in the box below will give you access again.
/*//////////////////////////////////////////////////////////////////////////



//*** FRAMEWORK CHECK ***//
// Nothing to change here!!!
if(!window.US||!window.US.Framework){if(window.US!==null&&confirm("Something went wrong with the US Framework. \nMake sure it is installed correctly or reinstall the script. \n\nDo you want to go to the scripts homepage?"))GM_openInTab("http://userscripts.org/scripts/show/39678");window.US=null;return;}else if(!window.US.Framework())return;

var language=new US.Language({langMod:"browser",locals:{
	'en' : {
		'USF' : {
			'metadata'		: 'metadata',
			'source'		: 'source',
			'busy'			: 'Please wait, searching...',
			'nothing'		: 'No results found for this site.',
			'searched'		: 'Searched in the @a@:',
			'googled'		: 'Google in @b@'}},
	'nl':{'USF':{'metadata':'informatie (metadata)','source':'broncode (source)','busy':'Een ogenblik geduld, bezig met zoeken...','nothing':'Geen resultaten voor deze site.','searched':'Gezocht in @a@:','googled':'Gegoogled in @b@'
}}}});

new US.Update({check4Update:true,updateTime:1*60*60*1000,language:"browser",title:"UserScript Finder",thisVersion:'v1.3.2 Beta',versionUrl:32407,updateUrl:32407});

eval(US.Functions.prototype({Number:[],String:["truncate","strip"],Array:[],Object:[]}));



//*** USER SETTINGS ***//
const USFnumberResults	= 10;	// [Integer] Number of results;



//*** USER SCRIPT ***//
var USF={
	init: function(){
		$addEvent(window,"keypress",function(e){USF.keyHandler(e);},false);
		GM_registerMenuCommand("Find UserScripts",function(){USF.results();});
	//	this.results();
	},

	host: function(){
		var host=window.location.host;
		return host.split(".");
	},

	results: function(crumb){
		if(!$gi("USFtempGoogleResults") && !$gi("USFresultContainer")){
			var searchFrame = $ac(document.body,$ce("DIV"));
			$sa(searchFrame,"id","USFtempGoogleResults");
			$sa(searchFrame,"name","USFtempGoogleResults");
			$hs(searchFrame,0);

			var USFresultContainer = $ac(document.body,$ce("DIV"));
			$sa(USFresultContainer,"id","USFresultContainer");
			$sa(USFresultContainer,"style","z-index:999999; position:absolute; font-size:10pt; left:1em; top:1em; width:20%; min-width:200px; background-color:#eeeeee; border:dotted 1px;");	

			var USFresultsHeader = $ac(USFresultContainer,$ce("DIV"));
			$sa(USFresultsHeader,"style","padding:3px; background-color:#ac1614; color:#ffffff; border-bottom:1px solid #909090;");
			
			var USFresultsHeaderX = $ac(USFresultsHeader,$ce("A"));
			$sa(USFresultsHeaderX,"href","javascript:void(0);");
			$sa(USFresultsHeaderX,"style","color:#ffffff; float:right;");
			$ih(USFresultsHeaderX,'X');
			USFresultsHeaderX.addEventListener("mousedown",function(e){$hs($gi("USFresultContainer"),0);},false);
			
			var USFresultsHeaderTitle = $ac(USFresultsHeader,$ce("DIV"));
			$ih(USFresultsHeaderTitle,'UserScript Finder');

			var USFbreadCrumbs = $ac(USFresultContainer,$ce("DIV"));
			$sa(USFbreadCrumbs,"style","padding:3px; background-color:white; color:#b4b4b4; border-bottom:1px solid #909090;");
			$ac(USFbreadCrumbs,$ct(window.location.protocol+"//"));
			var conditionCrumb=[];
			for(var i=0; i<this.host().length; i++){
				if(this.host()[i].match(/^www$/)){
					$ac(USFbreadCrumbs,$ct("www."));
				}
				else{
					var a = $ac(USFbreadCrumbs,$ce("A"));
					$sa(a,"href","javascript:void(0);");
					$ih(a,this.host()[i]);
					conditionCrumb[conditionCrumb.length]=this.host()[i];
					eval('$addEvent(a,"click",function(){USF.results("'+conditionCrumb.join(".").toString()+'")});');
					eval('$sa(a,"title","'+conditionCrumb.join(".").toString()+'");');
					if(i!=this.host().length-1){
						$ac(USFbreadCrumbs,$ct("."));
			}	}	}
			$ac(USFbreadCrumbs,$ct((window.location.pathname+window.location.search).truncate(10)));

			var USFreturnedResults = $ac(USFresultContainer,$ce("DIV"));
			$sa(USFreturnedResults,"id","USFreturnedResults");			
		}
		else{
			$hs($gi("USFresultContainer"),1);
			$ih($gi("USFreturnedResults"),"");  // clean up;
		}

		var conditionSearch = crumb || conditionCrumb.join(".").toString();

		this.request(language.localise(['USF','metadata']),'http://www.google.com/search?q=site:userscripts.org+inurl:scripts+inurl:show+' + conditionSearch + '&num=' + USFnumberResults);
		this.request(language.localise(['USF','source']),'http://www.google.com/search?q=site:userscripts.org+inurl:scripts+inurl:review+' + conditionSearch + '&num=' + USFnumberResults);
	},

	request: function(name,url){
		window.setTimeout(function(){
			var beenHereB4=false;  // fix for double run when o.readyState==1;
			GM_xmlhttpRequest({
				headers:			{"User-agent":"Mozilla/4.0(compatible) Greasemonkey"},
				method:				"GET",
				url:				url,
				onreadystatechange:	function(o){
					if(o.readyState==1 && beenHereB4!=true){  // loading...
						var field = $ac($gi("USFreturnedResults"),$ce("FIELDSET"));
						$sa(field,"id","searched"+name);
						$sa(field,"style","border:1px solid #909090; margin:2px;");
						$ih($ac(field,$ce("LEGEND")),language.localise(['USF','searched'],{"a":' <a href="'+url+'" title="'+language.localise(['USF','googled'],{"b":name})+'">'+name+'</a>'}));
						var scroller = $ac(field,$ce("DIV"));
						$sa(scroller,"id","scroller"+name);
						var status = $ac(scroller,$ce("P"));
						$sa(status,"id","status"+name);
						$ih(status,language.localise(['USF','busy']));
						beenHereB4=true;
					}
					if(o.readyState==4){
						var searchFrame = $gi("USFtempGoogleResults");
						$ih(searchFrame,o.responseText);
						var titles = document.evaluate("p/a[contains(@href,self)]", searchFrame, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						if(titles.snapshotLength<=0){
							$ih($gi("status"+name),'<b>'+language.localise(['USF','nothing'])+'</b>');
						}
						else{
							$gi("scroller"+name).removeChild($gi("status"+name));
							var ul = $ac($gi("scroller"+name),$ce("UL"));
							for(var i = 0; i<titles.snapshotLength; ++i){
								var node = titles.snapshotItem(i);
								var text = node.textContent;
								var li = $ac(ul,$ce("LI"));
								var a = $ac(li,$ce("A"));
								a.href = node.href.replace(/scripts\/review/,"scripts/show").strip(/\?format\=txt/);
								$ih(a,text.strip(/Source for \"/).strip(/\"? . Userscripts\.org/));
	}	}	}	}	});	},0); },

	keyHandler: function(e){
		if(e.altKey && e.ctrlKey && String.fromCharCode(e.charCode).toLowerCase()=="f"){
			USF.results();
	}	}
};

USF.init();  // execute;



//*** STATISTICS ***//
// Chars (exclude spaces): 8.334
// Chars (include spaces): 9.524
// Chars (Chinese): 0
// Words: 802
// Lines: 223