////////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name           Userscripts.org Comment Quote
// @author         Jerone UserScript Productions
// @namespace      http://userscripts.org/users/31497
// @homepage       http://userscripts.org/scripts/show/37987
// @description    Button to quote peoples comments
// @description    Userscripts.org Comment Quote v1.3 Beta
// @copyright      2008 Jerone
// @version        v1.3 Beta
// @versiontext    Fixed small error by site itself and updated framework.
// @browser        FF3
// @include        http://userscripts.org/topics/*
// @include        http://userscripts.org/articles/*
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
// - 03-12-2008 12:30 [v1 Alpha]:
//   [+] initial release;
// - 05-12-2008 16:00 [v1.1 Beta]:
//   [/] fixed quote for article's author;
//   [*] cleaned up code;
// - 22-12-2008 22:15 [v1.2 Beta]:
//   [+] added support for Userscripts Forum Signature from JoeSimmons;
// - 10-01-2009 17:45 [v1.3 Beta]:
//   [/] fixed small error by site itself;
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

new US.Update({check4Update:true,updateTime:1*60*60*1000,title:"Userscripts.org Comment Quote",thisVersion:'v1.3 Beta',versionUrl:37987,updateUrl:37987,language:"browser"});

eval(US.Functions.prototype({String:["trim","strip"]}));



//*** USERSCRIPT ***//
var UCQ = {
	init: function(){
		Array.forEach($x("//tr[contains(@class,'post')] | //div[contains(@class,'comment') and not(contains(@class,'comment-body'))]"),function(item){  // (forum/discussion | blog comment);
			if((edit=$xs(".//span[@class='edit']",item))){  // fix "Edit post" padding;
				var temp=edit.cloneNode(true);
				$ia(edit.parentNode,temp);
				$re(edit.parentNode);
			}
			var container=$xs(".//td[1] | .//div[@class='actions']",item);
			if(!!location.href.match("topics")) $ac(container,$ce("BR"));
			var span=$ac(container,$ce("DIV"));
			$sa(span,"class","edit");
			var a=$ac(span,$ce("A"));
			$sa(a,"href","javascript:void(0);");
			$sa(a,"class","utility");
			$sa(a,"style",'background:transparent url("data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIaSURBVDjLhZFNaBNRFIWzFdy6EIrQhdCFLlyJ4KLgShFciOhGTbVVUFf+rNxYEFPtmPhDKWI3diP2DxJF22mfirQrMVpbRKUohJi0SUwySZvJzBhOz32dlCimHfh4897cc+67ZwInQuNtJEyiTXhGzpIdAAL/EuCH+69nk6pUcZVVZ2WNIlkqVtTo9IJi3Y1mBjERF1icX3bV77KrsmVHZUuOWrKq+jyRKYvBYFMD6SrijC9aLFZVqmCrZN7W+80MnpdsV+XYWYrTFL+dS72/8ng6f8qY9E4TWVnnkIJPktyS/MRgJEeh49W0WDpfG5gpMhdwNFh1VtZgLmAuYC6gdlQMOo2RuIovZJT7p6Y52Wt6Iub84GhgLmAuYC7gLfU5xxKD73oOvuwnQ5L4xIeEzOtJVxFnfBFzAW8H5qL3fxn4Jk/MuBaPkzJzAXPRxekGcSJXQZrvv3LLYvCzLt4iYZJXZCdZZC6oerV18fC7IVx9FMS58BF03DmE/thDMfhaN9hGukmrvw+Fxz5i9kcWzATRmafoHu7Ai/k+fEqZiExewPHIbrRfPvAm8L9/65scI5ZVcRC8fRDRuXuIfnkAeYypLkSmzmPvxe12UwPf5BtzweHre/ByfgCNT+xznxhsKN4qNyD2vkstTq95BiEzqMWhieDmN6CwhYyRXSy8edRow12zU3eWVfY8NzYcoREW95CSXNtfe+R8FZtm9C3KURomAAAAAElFTkSuQmCCAA==") no-repeat scroll left center; padding-left:20px;');
			$ih(a,"Quote");
			$addEvent(a,"click",function(){
				unsafeWindow.$('reply').show();
				unsafeWindow.$('post_body').focus();
				var refer = '<a href="#' + item.id + '">@' + $xs(".//span[@class='fn']/a[contains(@href,'users/')] | .//div[@class='author']/a[@rel='nofollow']",item).textContent + '</a>';
				var quote = '<blockquote>' + $xs(".//*[contains(@class,'body')][contains(@id,'body')]",item).innerHTML.strip(/<!--[\w\W.]*-->[\n\t\s\r]*/).strip(/<div\scite="signature">(<hr\s?\/?>.*)<\/div>/).strip(/^\s{6}/gm).trim() + "</blockquote>\n";
				var old = $gi("post_body").value;
				$gi("post_body").value = refer + quote + (old==""?"":"\n"+old);
				return false;
		});	});
		$addCSS(<><![CDATA[a.utility{padding-top:3px;padding-bottom:3px;}]]></>.toString());  // fix "Delete" and "Edit" icons;
}	}

UCQ.init();  // execute;



//*** STATISTICS ***//
// Chars (exclude spaces): 5.459
// Chars (include spaces): 6.067
// Chars (Chinese): 0
// Words: 492
// Lines: 114