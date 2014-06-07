////////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Userscripts.org Reviews Column
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/38596
// @description     Add extra column with scripts reviews in script management.
// @description     Userscripts.org Reviews Column v1.2 Beta
// @copyright       2008 Jerone
// @version         v1.2 Beta
// @versiontext     Updated framework.
// @browser         FF3
// @include         http://userscripts.org/home/scripts
// @include         http://userscripts.org/home/scripts*
// ==/UserScript==
/*//////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - Framework Check
// - User Settings
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
// - 13-12-2008 18:00 [v1 Alpha]:
//   [+] initial release;
// - 17-12-2008 17:30 [v1.1 Beta]:
//   [+] added sorting by reviews;
//   [*] cleaned up code;
// - 10-01-2009 18:00 [v1.2 Beta]:
//   [*] updated framework;
////////////////////////////////////////////////////////////////////////////
// Todo:
//  - 
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

new US.Update({check4Update:true,updateTime:1*60*60*1000,title:"Userscripts.org Reviews Column",thisVersion:'v1.2 Beta',versionUrl:38596,updateUrl:38596,language:"browser"});

eval(US.Functions.prototype({Element:['lastChild'],Function:['bind']}));



//*** USER SETTINGS ***//
const updateTime =	3*60*60*1000;	// [Number] update time (we don't want to flood userscripts.org);



//*** USERSCRIPT ***//
var URC = {
	init: function(){
		if((tr=$x("//table[@class='wide forums']/tbody/tr"))){
			var tds=[], reviews=eval(GM_getValue("URC.reviews",{}));
			tr.forEach(function(tr){
				if(!tr.id.match("scripts-")){  // header;
					var th = $ib([tr].lastChild(),$ce("TH"));
					$sa(th,"class","la");
					$sa(th,"width","1%");
					var a = $ac(th,$ce("A"));
					$sa(a,"href","/home/scripts?sort=reviews");
					$ih(a,"Reviews");
				}else{
					var nr = $ga(tr,"id").match(/\d+/);
					var td = $ib([tr].lastChild(),$ce("TD"));
					tds.push(td);
					$sa(td,"class","inv lp");
					$ih(td,"...");
					if(reviews[nr] && new Date().getTime()-Number(GM_getValue("URC.lastCheck",0))<updateTime){
						$ih(td,reviews[nr][0]+' (<ab'+'br title="Average out of 5 stars">'+Math.round(reviews[nr][1]*10)/10+'&nbsp;stars</ab'+'br>)');
					}else{
						GM_xmlhttpRequest({
							method:	"GET",
							url:	"http://userscripts.org/scripts/reviews/"+nr,
							onload:	countReviews.bind({td:td,nr:nr})
			});	}	}	});
			
			if(/scripts\?sort=reviews/i.test(location.href)){
				tds.sort(function(a,b){
					var aNr = $ga(a.parentNode,"id").match(/\d+/),
						bNr = $ga(b.parentNode,"id").match(/\d+/),
						aRs = reviews[aNr] ? reviews[aNr] : [0,0],
						bRs = reviews[bNr] ? reviews[bNr] : [0,0];
					return aRs[0]-bRs[0]!=0 ? aRs[0]-bRs[0] : (Math.round(aRs[1]*10)/10)-(Math.round(bRs[1]*10)/10);
				});
				for(var i=tds.length-1; i>=0; i--){
					$ia([tds[i].parentNode.parentNode].lastChild(),tds[i].parentNode);
		}	}	}
		
		function countReviews(x){
			var review=0, stars=0;
			if(/Reviews\s+\<span\>(\d+)\<\/span\>/.test(x.responseText)){
				var n=x.responseText.match(/Reviews\s+\<span\>(\d+)\<\/span\>/);
				if(!!n[1] && !isNaN(n[1])){
					review=Number(n[1]);
					if(review>0 && /\<span\>\d+\s+stars\<\/span\>/g.test(x.responseText)){
						x.responseText.match(/\<span\>\d+\s+stars\<\/span\>/g).forEach(function(star){
							stars+=Number(star.match(/\d+/));
						});
						stars=stars/review;
			}	}	}
			$ih(this.td,review+' (<ab'+'br title="Average out of 5 stars">'+Math.round(stars*10)/10+'&nbsp;stars</ab'+'br>)');
			reviews[this.nr]=[review,stars];
			GM_setValue("URC.reviews",reviews.toSource());
			GM_setValue("URC.lastCheck",new Date().getTime().toString());
}	}	}

URC.init();  // execute;



//*** STATISTICS ***//
// Chars (exclude spaces): 5.075
// Chars (include spaces): 5.852
// Chars (Chinese): 0
// Words: 525
// Lines: 145