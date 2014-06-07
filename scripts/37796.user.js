////////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Userscripts.org Search Extender
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/37796
// @description     Extend the search function on Userscripts.org
// @description     Userscripts.org Search Extender v1.3 Beta
// @copyright       2008 Jerone
// @version         v1.3 Beta
// @versiontext     Updated framework.
// @browser         FF3
// @include         http://userscripts.org/*/search
// @include         http://userscripts.org/*/search*
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
// - 29-11-2008 15:00 [v1 Alpha]:
//   [+] initial release;
// - 30-11-2008 15:00 [v1.1 Beta]:
//   [/] fixed small bug in multiple words;
//   [*] cleaned up code;
// - 01-12-2008 19:30 [v1.2 Beta]:
//   [+] added colored search highlight;
// - 05-12-2008 16:15 [v1.2.1 Beta]:
//   [/] fixed small bug in highlighting;
// - 10-01-2009 18:00 [v1.3 Beta]:
//   [*] updated framework;
////////////////////////////////////////////////////////////////////////////
// Todo:
//  - highlight on/off button;
//  - recognize nothing filled in;
//  - trim();
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

new US.Update({check4Update:true,updateTime:1*60*60*1000,title:"Userscripts.org Search Extender",thisVersion:'v1.3 Beta',versionUrl:37796,updateUrl:37796,language:"browser"});

eval(US.Functions.prototype({}));



//*** USERSCRIPT ***//
var USE = {
	init: function(){
		if((h1=$xs("id('content')/h1"))){
			var qForm=$ia(h1,$ce("FORM"));
			$sa(qForm,"method","get");
			$sa(qForm,"action","/"+(location.href.match("posts")?"posts":"scripts")+"/search");
			$sa(qForm,"style","margin-bottom:10px;");
			var qInput=$ac(qForm,$ce("LABEL"));
			$sa(qInput,"id","qLabel");
			$sa(qInput,"for","qInput");
			$ac(qInput,$ct("Search all "+(location.href.match("posts")?"posts":"scripts")));
			var qInput=$ac(qForm,$ce("INPUT"));
			$sa(qInput,"id","qInput");
			$sa(qInput,"type","text");
			$sa(qInput,"name","q");
			$sa(qInput,"value",!!Location.search().q?Location.search().q.replace(/\+/g," "):"");
			$sa(qInput,"style","width:200px;");
			var qSubmit=$ac(qForm,$ce("INPUT"));
			$sa(qSubmit,"type","submit");
			$sa(qSubmit,"value","Search again");
			var qOther=$ac(qForm,$ce("INPUT"));
			$sa(qOther,"type","button");
			$sa(qOther,"value","Search "+(location.href.match("posts")?"scripts":"posts"));
			$addEvent(qOther,"click",function(){
				if(qInput.value!=""){
					location.href="http://userscripts.org/"+(location.href.match("posts")?"scripts":"posts")+"/search?q="+escape(qInput.value);
			}	});
			var qGoogles=$ac(qForm,$ce("DIV"));
			$sa(qGoogles,"style","top:0; left:0; position:relative; display:inline;");
			$addEvent(qGoogles,"mouseover",function(){
				$hs(qGoogleX,1);
			});
			$addEvent(qGoogles,"mouseout",function(){
				$hs(qGoogleX,0);
			});
			var qGoogle=$ac(qGoogles,$ce("INPUT"));
			$sa(qGoogle,"type","button");
			$sa(qGoogle,"value","Search Google");
			$addEvent(qGoogle,"click",function(){
				if(qInput.value!=""){
					location.href="http://www.google.com/search?q=site:userscripts.org+"+escape(qInput.value);
			}	});
			var qGoogleX=$ac(qGoogles,$ce("DIV"));
			$sa(qGoogleX,"style","top:0; left:0; position:absolute; display:inline; margin-top:20px;");
			$hs(qGoogleX,0);
			var qGoogle1=$ac(qGoogleX,$ce("INPUT"));
			$sa(qGoogle1,"type","button");
			$sa(qGoogle1,"value","... only scripts");
			$addEvent(qGoogle1,"click",function(){
				if(qInput.value!=""){
					location.href="http://www.google.com/search?q=site:userscripts.org/scripts+"+escape(qInput.value);
			}	});
			var qGoogle2=$ac(qGoogleX,$ce("INPUT"));
			$sa(qGoogle2,"type","button");
			$sa(qGoogle2,"value","... only posts");
			$addEvent(qGoogle2,"click",function(){
				if(qInput.value!=""){
					location.href="http://www.google.com/search?q=site:userscripts.org/topics+"+escape(qInput.value);
			}	});
			
			var color=1;
			qInput.value.split(" ").forEach(function(q){
				USE.highLight($xs("id('content')/table"),q,color);
				color=(color>=5?0:color+1);
			});
			$addCSS(<><![CDATA[
				.USEhighlight_1{background-color:#FFFF00;}
				.USEhighlight_2{background-color:#00FFFF;}
				.USEhighlight_3{background-color:#FF00FF;}
				.USEhighlight_4{background-color:#7FFF00;}
				.USEhighlight_5{background-color:#1E90FF;}
			]]></>.toString());  // google colors;
			
			$addJS(<><![CDATA[try{if($('qInput')){$('qLabel').hide();Event.observe('qInput','focus',function(e){if(this.value==$('qLabel').innerHTML){this.value="";this.style.color=null;}});function q_show_label2(e){if(this.value==""||this.value==$('qLabel').innerHTML){this.value=$('qLabel').innerHTML;this.style.color="#888";}}Event.observe('qInput','blur',q_show_label2);q_show_label2.call($('qInput'));}}catch(e){}]]></>.toString());
	}	},
	
	highLight:function(node,str,color){
		if(node.hasChildNodes()){
			for(var i=0; i<node.childNodes.length; i++){
				USE.highLight(node.childNodes[i],str,color);
		}	}
		if(node.nodeType==3){  // text node;
			var tempNodeVal = node.nodeValue.toLowerCase();
			var tempWordVal = str.toLowerCase();
			if(tempNodeVal.indexOf(tempWordVal)!=-1 && !node.parentNode.className.match("USEhighlight")){
				$ib(node,$ct(node.nodeValue.substr(0,tempNodeVal.indexOf(tempWordVal))));
				var hiword = $ib(node,$ce("SPAN"));
				$sa(hiword,"class","USEhighlight_"+color);
				$ac(hiword,($ct(node.nodeValue.substr(tempNodeVal.indexOf(tempWordVal),str.length))));
				$ib(node,$ct(node.nodeValue.substr(tempNodeVal.indexOf(tempWordVal)+str.length)));
				$re(node);
}	}	}	}

USE.init();  // execute;



//*** STATISTICS ***//
// Chars (exclude spaces): 6.887
// Chars (include spaces): 7.708
// Chars (Chinese): 0
// Words: 554
// Lines: 181