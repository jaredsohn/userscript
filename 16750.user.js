/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            Map24 Cleaner
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/16750
// @description     Removes adds, and hides fields.
// @description     Map24 Cleaner v1.7 Alpha
// @copyright       2007 - 2008 Jerone
// @version         v1.7 Alpha
// @versiontext     Updated code to latest layout and fixed some small issues.
// @browser         FF3
// @include         http://www.*.map24.com/*
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
// - 18-12-2007 15:00 [v1 Alpha]:
//   [+] initial release;
// - 19-12-2007 15:30 [v1.1 Beta]:
//   [*] works now on all languages;
// - 20-01-2008 15:00 [v1.2 Beta]:
//   [*] cleaned code
//   [+] added US_functions;
// - 14-03-2008 14:00 [v1.3 Beta]:
//   [+] added new ad;
// - 30-05-2008 19:00 [v1.4 Beta]:
//   [/] fixed framework check;
// - 10-08-2008 14:30 [v1.4.1 Beta]:
//   [*] cleaned up code;
// - 19-08-2008 12:00 [v1.5 Beta]:
//   [+] added hide "Book a hotel";
//   [+] added hide "Map24 Topnews";
//   [+] added hide "Channels";
//   [+] added hide JAVA info;
//   [+] added hide copyrights;
// - 20-08-2008 22:30 [v1.6 Alpha]:
//   [+] added settings window (US_options);
// - 27-11-2008 16:00 [v1.7 Alpha]:
//   [*] updated to new layout;
//   [+] added new ads;
//   [-] removed hide hotel;
//   [/] fixed small bug in framework check;
//   [*] improved code;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - auto login;
// - auto map choose;
// - auto language;
// - shouldn't 'cont_m24up' be $hs() ?
// - fix hide java box;
// - remove opties and book hotel nearby (id('cont_tabpage')/div[5]);
// - hide banners top right;
////////////////////////////////////////////////////////////////////////////
// Note:
// - This script does NOT work without my other scripts: 
//   - US_functions => http://userscripts.org/scripts/show/16142
//   - US_language => http://userscripts.org/scripts/show/16143
//   - US_options => http://userscripts.org/scripts/show/31458
//   - US_update => http://userscripts.org/scripts/show/16144
/*//////////////////////////////////////////////////////////////////////////



//*** FRAMEWORK CHECK ***//
(function(){
var name          = "Map24 Cleaner";  // current script name;
var US_functionsV = "1.10.1";  // minimum US_functions version;
var US_languageV  = "1.4.5";   // minimum US_language version;
var US_optionsV   = "1.9.2";   // minimum US_options version;
var US_updateV    = "1.7.1";   // minimum US_update version;
var m1="The following script doesn't exist, is disabled or something went wrong:\n	",m2=name+" only works with a newer version of the following script:\n	",m3="\n\nClick 'OK' to go to the homepage of that script to download the newest version:\n	",l1="http://userscripts.org/scripts/show/16142",l2="http://userscripts.org/scripts/show/16143",l3="http://userscripts.org/scripts/show/31458",l4="http://userscripts.org/scripts/show/16144",USf="US_functions",USl="US_language",USo="US_options",USu="US_update",u="undefined",f=false,t=true,o=null,w=window;if(!(w.US_frameworkOK)){function a(b,c,d){var e=confirm(((d==1)?m1:m2)+b+m3+c);if(e)GM_openInTab(c);if(d==1){w.US_functions=function(){};w.US_language=function(){};w.US_language.localise=function(){};w.US_language.all=function(){};w.US_language.current=function(){};w.US_options=function(){};w.US_update=function(){};w.US_update.all=function(){};w.US_update.names=function(){};}return;}
function g(h,i){var j=k=f,r=/([\d]+)/i;if(r.test(i)==f)return t;i.match(r);is=RegExp.$1.split(".");h.match(r);hs=RegExp.$1.split(".");for(var x=0;x<Math.max(is.length,hs.length);x++){var hx=hs[x],ix=is[x];if(hx==u||hx==""||hx==o)hx=0;if(ix==u||ix==""||ix==o)ix=0;if(ix<hx&&!k)j=t;if(ix>hx)k=t;}return j;}var fd=ld=od=ud=f;if(typeof US_functionsV!=u){if(!(w.US_functionsOK))a(USf,l1,1);else if(g(US_functionsV,US_functionsOK))a(USf,l1);fd=t;}if(typeof US_languageV!=u){if(!(w.US_languageOK))a(USl,l2,1);else if(g(US_languageV,US_languageOK))a(USl,l2);ld=t;}if(typeof US_optionsV!=u){if(!(w.US_optionsOK))a(USo,l3,1);else if(g(US_optionsV,US_optionsOK))a(USo,l3);od=t;}if(typeof US_updateV!=u){if(!(w.US_updateOK))a(USu,l4,1);else if(g(US_updateV,US_updateOK))a(USu,l4);ud=t;}if(fd&&ld&&od&&ud){w.US_frameworkOK=t;console.log('US_framework correct imported!');}else w.US_frameworkOK=f;}})();

var language=new US_language({langMod:"browser",locals:{
	'en':{
		'MAP24C':{
			'options'		: 'Options',
			'display'		: 'Display',
			'hideadds'		: 'Hide all advertisements.',
			'hidetop'		: 'Hide top field.',
			'hideleft'		: 'Hide left field.',
			'hidechnl'		: 'Hide "Channels" field.',
			'hidenews'		: 'Hide "Map24 TopNews" field.',
			'hidejava'		: 'Hide JAVA info box.',
			'hidecopy'		: 'Hide Map24 copyrights.',

			'top1title'		: 'Show top field',
			'top2title'		: 'Hide top field',
			'left1title'	: 'Show left field',
			'left2title'	: 'Hide left field',
			'settitle'		: 'Show Settings Window',

			'nopagerefresh'	: 'Most settings change immediately and <em>don\'t</em> require a page <a href="javascript:top.window.location.reload(true)">refresh</a>.',
			'resetConfirm'	: "This will reset all settings you\'ve made on all tabs!\n\nAre you sure you want to reset all settings?",
			'help'			: 'Help'}},
	'nl':{'MAP24C':{'options':'Opties','display':'Weergave','hideadds':'Verberg alle advertenties.','hidetop':'Verberg boven veld.','hideleft':'Verberg linker veld.','hidechnl':'Verberg "Channels" veld.','hidenews':'Verberg "Map24 TopNews" veld.','hidejava':'Verberg JAVA informatie box.','hidecopy':'Verberg Map24 copyrights.','top1title':'Boven veld weergeven','top2title':'Verberg boven veld','left1title':'Linker veld weergeven','left2title':'Verberg linker veld','settitle':'Instellingen venster weergeven','nopagerefresh':'De meeste instellingen veranderen meteen en hebben <em>geen</em> pagina <a href="javascript:top.window.location.reload(true)">vernieuwen</a> nodig.','resetConfirm':"Dit zal alle instellingen op alle tabbladen herstellen!\n\nWeet u zeker dat u alle instellingen wilt herstellen?",'help':'Help'
}}}});

new US_update({check4Update:true,updateTime:1*60*60*1000,language:"browser",title:"Map24 Cleaner",thisVersion:'v1.7 Alpha',versionUrl:16750,updateUrl:16750,});



//*** USER SETTINGS ***//
const deleteAddsDefault		= true;		// [Boolean] delete the adds;
const hideTopBarDefault		= false;	// [Boolean] hide the top bar;
const hideLeftBarDefault	= false;	// [Boolean] hide the left bar;
const hideChannelsDefault	= true;		// [Boolean] hide Channels;
const hideTopNewsDefault	= true;		// [Boolean] hide Map24 Topnews;
const hideJavaInfoDefault	= false;	// [Boolean] hide the JAVA note;
const hideCopyrightsDefault	= true;		// [Boolean] hide Copyrights;



//*** USER SCRIPT ***//
const imageTop		= "data:image/gif;base64,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"
const imageRight	= "data:image/gif;base64,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"
const imageBottom	= "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAK0lEQVR42mL8////fwYGBkYGBPjPBGMg00xIqmASjDCVjMg0E7IKKpkJGADBSQ0NswOgKwAAAABJRU5ErkJgggA="
const imageLeft		= "data:image/gif;base64,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"
const imageSettings	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAANf7bzMYAQAAACBjSFJNAABsmwAAcm8AAPauAACFgwAAbvcAAOhBAAAxdAAAF2yhti2bAAAD20lEQVR42mJgYGBgmDdv3hsGMzOzlwwMDAwAAAAA//9i0NPTM2JgYGBgnDlz5v8/f/4wAAAAAP//ACIA3f8AICAgKMfHx//h4eH/0dHR/wPw8PDsJycngAoKCgBJSUnPAAAA//8ARAC7/wMAAAAAOTk5MRAQEP/q6ur1Aerq6v/9/f0A+vr6AMPDwwADDAwMgF9fX279/f1J/f39AAAgICDGs7Oz/5eXl/8FBQWZAAAA//8swSEOwjAYgNFv0MoZgiEha3A7Q49AuEszwcTusGPMcIZmFtTsmB1ZU9MEVftjeI+/Xc5ZvPcSQpB1XaXrujfAvqqqm3NuVkoVwzB827a913V9NcYcp2m6FMC57/tPWZbEGDHGkFJiWRa2bXsCKODUNI0Ar3EcxVobtdYP4PCjcY5ZIoQCOID/xfMlmHDgKNEihIQ83xbXeEtztJxf4cY2/Ry3R28WEqFA3G44mlo0nMQnSIcg3KaB9Jpu/i0/9ZyglN5GUVRO09SZpkn6vv85G4IgeB+GQQohZJ7nUkopASgAoOx2u7/1eq0QQqCqKgghqOsajuNgtVrdq13XXbuuy9q2xWazea6qinmeZyRJgsPh8KJut9u3eZ7RNA3SNH0QQhwZY4/jOGKapqdFWZZfy+WSUUrBOZdt28IwDJxOJ2RZdrOI4/hD1/Vf3/fvbNuGZVkoigKc828ARwC41DTtlTEm9vu9BPAZhqEEcAXg4p8qMgZNIwzA6LtLIwkVarWSEwehcMtN4g1qRJE0NE5FyCIuEgpuNwmV4lI6daoQCMGldOji2OJkyEEFJZ06XA8KwSJF4WhFwTaSeurfJYX0jR88+OBxm4ODg5dnZ2eLk5OT74lE4t3V1ZUQQohcLteqVCo90zRX+Xz+WNf1zX+OBJDNZl/E4/EnlmX9rlar6Z2dHfx+PwBCCGRZZjqdMp/PqdVqnxRFmQwGgy/n5+fPpHA4HIhGox8KhcJuIBAgGAyysbGB4zg4joMQglAo9N9+fX1Nq9X61m6383fS6fRXwzAejEYjHMdhNpvR7/ep1+uV8Xj8GsDn8x0ZhvFG0zQWiwWyLFMqlR5KkmRKW1tbj1arVWFvb++ppmmSqqrYto3ruj+bzeZzIcSfw8PDV16vN6yqKsPhENu26XQ675fLZVMCosVi8bOu64xGI7a3t0mlUng8HiaTCTcPAOh2u7iui6Io2LZNo9FISbciyLFYrHt6epq4vLyk1+uRyWQQQnBxcUEymSQSiVAulzuWZT0GlsBKuilxF7gP3AN2gQUQ3d/fP1qv15Jpmm+BPrAJfARmwA/g198BAMwcmGFlQEkkAAAAAElFTkSuQmCCAA==";

var MAP24C={
	init: function(){
		this.fixes();
		this.loadSettings();
		this.loadSettingsWindow();
		this.removeGarbage();
		this.addHiders();
	},
	
	fixes: function(){
		if(!!GM_getValue("MAP24C.hideBookAhotel",false)){  // removed setting;
			GM_setValue("MAP24C.hideBookAhotel","");
		}
		if($gi("cont_tabpage")){
			$gi("cont_tabpage").style.position="auto";
		}
		if((dynmenu=$gi("dynmenu"))){
			$sa($ia(dynmenu,$me(dynmenu.childNodes[11])),"id","dynmenu2").style.height="auto";
			dynmenu.style.height="auto";
			dynmenu.style.width="auto";
			$sa($ib(dynmenu,$ce("DIV")),"id","myMenu");
			$addCSS(<style><![CDATA[
				.navb0, .navb1{
					padding: 0px 10px !important;
					width: 0px !important;
				}
				.navb{
					border-left:1px solid white !important;
				}
				.MAP24C_btn{
					background:#007ABC none repeat scroll 0% 50%;
					height:21px;
					width:21px;
					float:left;
					border:none 0px;
					border-right:1px solid white;
					border-bottom:1px solid white;
					cursor:pointer;
				}
				.MAP24C_btnHover{
					background-color:#FF7020 !important;
				}
			]]></style>.toString(),false,top.document);
	}	},

	removeGarbage: function(){
		if(this.deleteAdds){  // adds;
			if($gi("skycont",top.document)){  // right banner;
				$hs($gi("skycont",top.document),0);
			}
			if($gi("cont_m24up",top.document)){  // top banner;
				$gi("cont_m24up",top.document).style.display="none";
			}
			if($gi("DCF203402227",top.document)){  // top banner 2;
				$hs($gi("DCF203402227",top.document),0);
			}
			if($gi("ebBannerDiv_0_9957060357499186",top.document)){  // another top banner;
				$hs($gi("ebBannerDiv_0_9957060357499186",top.document),0);
			}
			if($gi("m24RectangleAd",top.document)){  // left banner;
				$hs($gi("m24RectangleAd",top.document),0);
			}
			if($gi("m24rectangleHome",top.document)){  // left banner 2;
				$hs($gi("m24rectangleHome",top.document),0);
		}	}
		else{
			if($gi("skycont",top.document)){  // right banner;
				$hs($gi("skycont",top.document),1);
			}
			if($gi("cont_m24up",top.document)){  // top banner;
				$gi("cont_m24up",top.document).style.display="";
			}
			if($gi("DCF203402227",top.document)){  // top banner 2;
				$hs($gi("DCF203402227",top.document),1);
			}
			if($gi("ebBannerDiv_0_9957060357499186",top.document)){  // another top banner;
				$hs($gi("ebBannerDiv_0_9957060357499186",top.document),1);
			}
			if($gi("m24RectangleAd",top.document)){  // left banner;
				$hs($gi("m24RectangleAd",top.document),1);
			}
			if($gi("m24rectangleHome",top.document)){  // left banner 2;
				$hs($gi("m24rectangleHome",top.document),1);
		}	}
		
		if(channels=$gi("chbx1",top.document)){  // Channels;
			if(this.hideChannels){
				$hs(channels.previousSibling.previousSibling,0);
				$hs(channels,0);
			}
			else{
				$hs(channels.previousSibling.previousSibling,1);
				$hs(channels,1);
		}	}
		
		if(topNews=$xs("//table[@class='oh']",top.document)){  // Map24 TopNews;
			if(this.hideTopNews){
				$hs(topNews.previousSibling.previousSibling,0);
				$hs(topNews,0);
			}
			else{
				$hs(topNews.previousSibling.previousSibling,1);
				$hs(topNews,1);
		}	}
		
		if(this.hideJavaInfo){  // JAVA info box;
			window.setTimeout(function(){if(typeof(unsafeWindow.closeJavaInfo)=='function'){unsafeWindow.closeJavaInfo('x');}},0);
		}
		
		if(this.hideCopyrights){  // Copyrights;
			if($gi("footer",top.document)){
				$hs($gi("footer",top.document),0);
			}
			if(footer2=$xs("//div[@id='map24_displayer_maparea']/div[3]",top.document)){
				$hs(footer2,0);
				$gi("viewport_15",top.document).style.height="100%";
				$addCSS("#viewport_15{height:100% !important;}");
		}	}
		else{
			if($gi("footer",top.document)){
				$hs($gi("footer",top.document),1);
			}
			if(footer2=$xs("//div[@id='map24_displayer_maparea']/div[3]",top.document)){
				$hs(footer2,1);
				$gi("viewport_15",top.document).style.height="auto";
				$addCSS("#viewport_15{height:auto;}");
	}	}	},
	
	addHiders: function(){
		if($gi("dynmenu") && $gi("brand")){  // top header;
			var hiderTop = $ce("DIV");
			$sa(hiderTop,"id","hiderTop");
			$sa(hiderTop,"class","MAP24C_btn");
			var imagerTop = $ce("IMG");
			$sa(imagerTop,"id","imagerTop");
			$sa(imagerTop,"style","margin:6px 0 0 8px");
			if(this.hideTopBar){
				$hs($gi("brand"),0);
				$sa(hiderTop,"title",language.localise(["MAP24C","top1title"]));
				$sa(imagerTop,"src",imageBottom);
			}
			else{
				$hs($gi("brand"),1);
				$sa(hiderTop,"title",language.localise(["MAP24C","top2title"]));
				$sa(imagerTop,"src",imageTop);
			}
			$addEvent(hiderTop,"click",function(){
				$hs($gi("brand"),3);
				if($hs($gi("brand"),0,true)){
					$sa(hiderTop,"title",language.localise(["MAP24C","top1title"]));
					$sa(imagerTop,"src",imageBottom);
					MAP24C.hideTopBar=true;
				}
				else{
					$sa(hiderTop,"title",language.localise(["MAP24C","top2title"]));
					$sa(imagerTop,"src",imageTop);
					MAP24C.hideTopBar=false;
				}
				MAP24C.saveSettings();
				MAP24C.loadSettingsWindowValues();
			});
			$addEvent(hiderTop,"mouseover",function(){
				$sa(hiderTop,"class","MAP24C_btn MAP24C_btnHover");
			});
			$addEvent(hiderTop,"mouseout",function(){
				$sa(hiderTop,"class","MAP24C_btn");
			});
			$af($gi("myMenu"),hiderTop);
			$ac(hiderTop,imagerTop);
		}
		
		if($gi("dynmenu") && $gi("dynmenu2") && $gi("cont_tabpage")){  // left settings;
			var hiderLeft = $ce("DIV");
			$sa(hiderLeft,"id","hiderLeft");
			$sa(hiderLeft,"class","MAP24C_btn");
			var imagerLeft = $ce("IMG");
			$sa(imagerLeft,"id","imagerLeft");
			$sa(imagerLeft,"style","margin:8px 0 0 6px;");
			if(this.hideLeftBar){
				$hs($gi("dynmenu"),0);
				$hs($gi("dynmenu2"),0);
				$hs($gi("cont_tabpage"),0);
				$sa(hiderLeft,"title",language.localise(["MAP24C","left1title"]));
				$sa(imagerLeft,"src",imageRight);
				$gi("cont_tabpage").parentNode.style.backgroundColor="#007ABC";
			}
			else{
				$hs($gi("dynmenu"),1);
				$hs($gi("dynmenu2"),1);
				$hs($gi("cont_tabpage"),1);
				$sa(hiderLeft,"title",language.localise(["MAP24C","left2title"]));
				$sa(imagerLeft,"src",imageLeft);
				$gi("cont_tabpage").parentNode.style.backgroundColor="white";
			}
			$addEvent(hiderLeft,"click",function(){
				$hs($gi("dynmenu"),3);
				$hs($gi("dynmenu2"),3);
				$hs($gi("cont_tabpage"),3);
				if($hs($gi("dynmenu"),0,true) && $hs($gi("dynmenu2"),0,true) && $hs($gi("cont_tabpage"),0,true)){
					$sa(hiderLeft,"title",language.localise(["MAP24C","left1title"]));
					$sa(imagerLeft,"src",imageRight);
					MAP24C.hideLeftBar=true;
					$gi("cont_tabpage").parentNode.style.backgroundColor="#007ABC";
				}
				else{
					$sa(hiderLeft,"title",language.localise(["MAP24C","left2title"]));
					$sa(imagerLeft,"src",imageLeft);
					MAP24C.hideLeftBar=false;
					$gi("cont_tabpage").parentNode.style.backgroundColor="white";
				}
				MAP24C.saveSettings();
				MAP24C.loadSettingsWindowValues();
			});
			$addEvent(hiderLeft,"mouseover",function(){
				$sa(hiderLeft,"class","MAP24C_btn MAP24C_btnHover");
			});
			$addEvent(hiderLeft,"mouseout",function(){
				$sa(hiderLeft,"class","MAP24C_btn");
			});
			$af($gi("myMenu"),hiderLeft);
			$ac(hiderLeft,imagerLeft);
	}	},
	
	// SETTINGS
	settingsWindowName: "MAP24C",
	settingsWindowNode: function(){return $gi("USOwindow_"+this.settingsWindowName,top.document).contentDocument},
	loadSettingsWindow: function(){
		var settingsContent=<><![CDATA[
								<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /><title>Map24 Cleaner Settings Window</title>
									<style type="text/css">
									/* common */ body{color:CaptionText;font-family:Tahoma,Verdana,Arial;font-size:10pt;}input[type=checkbox]{margin:0px;}fieldset{border:1px solid ThreeDShadow;padding:5px 8px 10px 8px;}select option{height:16px;}a{color:#0088FF;}input[type=text],input[type=number]{border:1px solid ThreeDShadow;padding:2px 1px;}.USOinp{}.USObtn{}.required{background:Menu top right no-repeat url("data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAHklEQVQImWP4z8DwHx0DSSDGKogmgRBEkkAVhEoAAKhbO8Uz7uXSAAAAAElFTkSuQmCCAA==")}
									/*   tabs */ #USOtabs{display:table;width:100%;min-width:444px;height:24px;}.USOtab{display:inline;background:none;padding:5px 15px;border:1px solid ThreeDShadow;border-bottom:1px solid ThreeDShadow;margin-right:-1px;margin-bottom:-1px;float:left;font-size:8pt;font-weight:normal;font-style:normal;text-decoration:none;color:CaptionText;cursor:pointer;}.USOtab:hover{background:Highlight;color:HighlightText;}.USOtabActive{background:ActiveCaption;color:CaptionText;border-bottom:1px solid transparent;float:left;font-weight:bold;}
									/* fields */ #USOfields{padding:15px 10px 12px 10px;border:1px solid ThreeDShadow;border-bottom:0px none;min-width:422px;}
									/*   note */ #USOnote{border-left:1px solid ThreeDShadow;border-right:1px solid ThreeDShadow;background:none;padding:0px 11px 11px 11px;}
									/* submit */ #USOsubmit{border:1px solid ThreeDShadow;border-top:0px none;background:none;text-align:right;padding:0px 11px 11px 11px;min-width:420px;}#USOsubmit input{width:67px;font-size:11px;padding:2px;}</style></head>
								<body>
									<div id="USOtabs"></div>
									<div id="USOfields">
										<fieldset id="USOfield1">
											<legend>]]></>.toString()+language.localise(["MAP24C","options"])+<><![CDATA[</legend>
											<table width="400px" border="0" cellspacing="0" cellpadding="2"><tr><td colspan="2">
												<fieldset><legend>]]></>.toString()+language.localise(["MAP24C","display"])+<><![CDATA[:</legend>
													<table width="100%" border="0" cellspacing="0" cellpadding="2"><tr>
														<td width="20px" valign="middle"><input name="MAP24deleteAdds" type="checkbox" id="MAP24deleteAdds" class="USOinp" value="MAP24deleteAdds" /></td><td valign="middle"><label for="MAP24deleteAdds">]]></>.toString()+language.localise(["MAP24C","hideadds"])+<><![CDATA[</label></td></tr><tr>
														<td valign="middle"><input name="MAP24hideTopBar" type="checkbox" id="MAP24hideTopBar" class="USOinp" value="MAP24hideTopBar" /></td><td valign="middle"><label for="MAP24hideTopBar">]]></>.toString()+language.localise(["MAP24C","hidetop"])+<><![CDATA[</label></td></tr><tr>
														<td valign="middle"><input name="MAP24hideLeftBar" type="checkbox" id="MAP24hideLeftBar" class="USOinp" value="MAP24hideLeftBar" /></td><td valign="middle"><label for="MAP24hideLeftBar">]]></>.toString()+language.localise(["MAP24C","hideleft"])+<><![CDATA[</label></td></tr><tr>
															<td valign="middle" style="padding-left:10px;"><input name="MAP24hideChannels" type="checkbox" id="MAP24hideChannels" class="USOinp" value="MAP24hideChannels" /></td><td valign="middle" style="padding-left:10px;"><label for="MAP24hideChannels">]]></>.toString()+language.localise(["MAP24C","hidechnl"])+<><![CDATA[</label></td></tr><tr>
															<td valign="middle" style="padding-left:10px;"><input name="MAP24hideTopNews" type="checkbox" id="MAP24hideTopNews" class="USOinp" value="MAP24hideTopNews" /></td><td valign="middle" style="padding-left:10px;"><label for="MAP24hideTopNews">]]></>.toString()+language.localise(["MAP24C","hidenews"])+<><![CDATA[</label></td></tr>
														<td valign="middle"><input name="MAP24hideJavaInfo" type="checkbox" id="MAP24hideJavaInfo" class="USOinp" value="MAP24hideJavaInfo" /></td><td valign="middle"><label for="MAP24hideJavaInfo">]]></>.toString()+language.localise(["MAP24C","hidejava"])+<><![CDATA[</label></td></tr><tr>
														<td valign="middle"><input name="MAP24hideCopyrights" type="checkbox" id="MAP24hideCopyrights" class="USOinp" value="MAP24hideCopyrights" /></td><td valign="middle"><label for="MAP24hideCopyrights">]]></>.toString()+language.localise(["MAP24C","hidecopy"])+<><![CDATA[</label></td></tr></table></fieldset></td></tr></table></fieldset></div>
									<div id="USOnote"><small>]]></>.toString()+language.localise(["MAP24C","nopagerefresh"])+<><![CDATA[</small></div>
									<div id="USOsubmit"><input name="MAP24reset" type="submit" class="USObtn" id="MAP24reset" value="]]></>.toString()+language.localise(["common","reset"])+<><![CDATA[" style="float:left;" />&nbsp;&nbsp;&nbsp;<input name="MAP24ok" type="submit" class="USObtn" id="MAP24ok" value="]]></>.toString()+language.localise(["common","ok"])+<><![CDATA[" />&nbsp;&nbsp;&nbsp;<input name="MAP24cancel" type="submit" class="USObtn" id="MAP24cancel" value="]]></>.toString()+language.localise(["common","cancel"])+<><![CDATA[" />&nbsp;&nbsp;&nbsp;<input name="MAP24apply" type="submit" class="USObtn" id="MAP24apply" value="]]></>.toString()+language.localise(["common","apply"])+<><![CDATA[" /></div></body></html>
							]]></>.toString();
		US_optionsMAP24 = new US_options({
				   name : this.settingsWindowName,
				content : settingsContent,
				addFade : true,
				addTabs : true,
			activeTabNr : 0,
			showAtStart : false,
			endFunction : function(){
							MAP24C.loadSettingsWindowButtons();
							MAP24C.loadSettingsWindowValues();
						  }
		});
		
		if($gi("myMenu")){  // settings button;
			var hiderSet = $ce("DIV");
			$sa(hiderSet,"class","MAP24C_btn");
			$sa(hiderSet,"title",language.localise(["MAP24C","settitle"]));
			var imagerSet = $ce("IMG");
			$sa(imagerSet,"style","margin: 2px 0 0 2px");
			$sa(imagerSet,"src",imageSettings);
			$addEvent(hiderSet,"click",function(){
				US_optionsMAP24.open();
			});
			$addEvent(hiderSet,"mouseover",function(){
				$sa(hiderSet,"class","MAP24C_btn MAP24C_btnHover");
			});
			$addEvent(hiderSet,"mouseout",function(){
				$sa(hiderSet,"class","MAP24C_btn");
			});
			$ac($ac($gi("myMenu"),hiderSet),imagerSet);
	}	},
	closeSettingsWindow: function(){
		US_optionsMAP24.close();
	},
	loadSettingsWindowButtons: function(){
		$addEvent($gi('MAP24ok',    this.settingsWindowNode()),'click',function(){MAP24C.applySettings();MAP24C.closeSettingsWindow();});
		$addEvent($gi('MAP24apply', this.settingsWindowNode()),'click',function(){MAP24C.applySettings();});
		$addEvent($gi('MAP24cancel',this.settingsWindowNode()),'click',function(){MAP24C.closeSettingsWindow();MAP24C.loadSettings();MAP24C.loadSettingsWindowValues();});
		$addEvent($gi('MAP24reset', this.settingsWindowNode()),'click',function(){MAP24C.resetSettings();});
		
		$addEvent($gi('USOoverlayGray_'+MAP24C.settingsWindowName,top.document),'dblclick',function(){MAP24C.loadSettingsWindowValues();});
	},
	loadSettingsWindowValues: function(){
		$gi('MAP24deleteAdds',    this.settingsWindowNode()).checked = this.deleteAdds;
		$gi('MAP24hideTopBar',    this.settingsWindowNode()).checked = this.hideTopBar;
		$gi('MAP24hideLeftBar',   this.settingsWindowNode()).checked = this.hideLeftBar;
		$gi('MAP24hideChannels',  this.settingsWindowNode()).checked = this.hideChannels;
		$gi('MAP24hideTopNews',   this.settingsWindowNode()).checked = this.hideTopNews;
		$gi('MAP24hideJavaInfo',  this.settingsWindowNode()).checked = this.hideJavaInfo;
		$gi('MAP24hideCopyrights',this.settingsWindowNode()).checked = this.hideCopyrights;
	},
	loadSettings: function(){
		this.deleteAdds=(typeof(deleteAddsOverRide)=="boolean"?deleteAddsOverRide:GM_getValue("MAP24C.deleteAdds",deleteAddsDefault));
		this.hideTopBar=(typeof(hideTopBarOverRide)=="boolean"?hideTopBarOverRide:GM_getValue("MAP24C.hideTopBar",hideTopBarDefault));
		this.hideLeftBar=(typeof(hideLeftBarOverRide)=="boolean"?hideLeftBarOverRide:GM_getValue("MAP24C.hideLeftBar",hideLeftBarDefault));
		this.hideChannels=(typeof(hideChannelsOverRide)=="boolean"?hideChannelsOverRide:GM_getValue("MAP24C.hideChannels",hideChannelsDefault));
		this.hideTopNews=(typeof(hideTopNewsOverRide)=="boolean"?hideTopNewsOverRide:GM_getValue("MAP24C.hideTopNews",hideTopNewsDefault));
		this.hideJavaInfo=(typeof(hideJavaInfoOverRide)=="boolean"?hideJavaInfoOverRide:GM_getValue("MAP24C.hideJavaInfo",hideJavaInfoDefault));
		this.hideCopyrights=(typeof(hideCopyrightsOverRide)=="boolean"?hideCopyrightsOverRide:GM_getValue("MAP24C.hideCopyrights",hideCopyrightsDefault));
	},
	applySettings: function(){
		this.deleteAdds=    $gi('MAP24deleteAdds',    this.settingsWindowNode()).checked;
		this.hideTopBar=    $gi('MAP24hideTopBar',    this.settingsWindowNode()).checked;
		this.hideLeftBar=   $gi('MAP24hideLeftBar',   this.settingsWindowNode()).checked;
		this.hideChannels=  $gi('MAP24hideChannels',  this.settingsWindowNode()).checked;
		this.hideTopNews=   $gi('MAP24hideTopNews',   this.settingsWindowNode()).checked;
		this.hideJavaInfo=  $gi('MAP24hideJavaInfo',  this.settingsWindowNode()).checked;
		this.hideCopyrights=$gi('MAP24hideCopyrights',this.settingsWindowNode()).checked;

		this.saveSettings();
		this.executeSettings();
	},
	resetSettings: function(){
		if(confirm(language.localise(['MAP24C','resetConfirm']))===true){
			this.deleteAdds=(typeof(deleteAddsOverRide)=="boolean"?deleteAddsOverRide:deleteAddsDefault);
			this.hideTopBar=(typeof(hideTopBarOverRide)=="boolean"?hideTopBarOverRide:hideTopBarDefault);
			this.hideLeftBar=(typeof(hideLeftBarOverRide)=="boolean"?hideLeftBarOverRide:hideLeftBarDefault);
			this.hideChannels=(typeof(hideChannelsOverRide)=="boolean"?hideChannelsOverRide:hideChannelsDefault);
			this.hideTopNews=(typeof(hideTopNewsOverRide)=="boolean"?hideTopNewsOverRide:hideTopNewsDefault);
			this.hideJavaInfo=(typeof(hideJavaInfoOverRide)=="boolean"?hideJavaInfoOverRide:hideJavaInfoDefault);
			this.hideCopyrights=(typeof(hideCopyrightsOverRide)=="boolean"?hideCopyrightsOverRide:hideCopyrightsDefault);

			this.saveSettings();
			this.loadSettingsWindowValues();
			this.executeSettings();
	}	},
	saveSettings: function(){
		GM_setValue("MAP24C.deleteAdds",    this.deleteAdds);
		GM_setValue("MAP24C.hideTopBar",    this.hideTopBar);
		GM_setValue("MAP24C.hideLeftBar",   this.hideLeftBar);
		GM_setValue("MAP24C.hideChannels",  this.hideChannels);
		GM_setValue("MAP24C.hideTopNews",   this.hideTopNews);
		GM_setValue("MAP24C.hideJavaInfo",  this.hideJavaInfo);
		GM_setValue("MAP24C.hideCopyrights",this.hideCopyrights);
	},
	executeSettings: function(){
		this.removeGarbage();
		
		if($gi("dynmenu",top.document) && $gi("brand",top.document)){  // top header;
			var hiderTop=$gi("hiderTop",top.document);
			var imagerTop=$gi("imagerTop",top.document);
			var brand=$gi("brand",top.document);
			if(this.hideTopBar){
				$hs(brand,0);
				$sa(hiderTop,"title",language.localise(["MAP24C","top1title"]));
				$sa(imagerTop,"src",imageBottom);
			}
			else{
				$hs(brand,1);
				$sa(hiderTop,"title",language.localise(["MAP24C","top2title"]));
				$sa(imagerTop,"src",imageTop);
		}	}

		if($gi("dynmenu",top.document) && $gi("dynmenu2",top.document) && $gi("cont_tabpage",top.document)){  // left settings;
			var hiderLeft=$gi("hiderLeft",top.document);
			var imagerLeft=$gi("imagerLeft",top.document);
			var dynmenu=$gi("dynmenu",top.document);
			var dynmenu2=$gi("dynmenu2",top.document);
			var cont_tabpage=$gi("cont_tabpage",top.document);
			if(this.hideLeftBar){
				$hs(dynmenu,0);
				$hs(dynmenu2,0);
				$hs(cont_tabpage,0);
				$sa(hiderLeft,"title",language.localise(["MAP24C","left1title"]));
				$sa(imagerLeft,"src",imageRight);
				cont_tabpage.parentNode.style.backgroundColor="#007ABC";
			}
			else{
				$hs(dynmenu,1);
				$hs(dynmenu2,1);
				$hs(cont_tabpage,1);
				$sa(hiderLeft,"title",language.localise(["MAP24C","left2title"]));
				$sa(imagerLeft,"src",imageLeft);
				cont_tabpage.parentNode.style.backgroundColor="white";
}	}	}	}

MAP24C.init();  // execute;



//*** STATISTICS ***//
// Chars (exclude spaces): 41.436
// Chars (include spaces): 44.260
// Chars (Chinese): 0
// Words: 1.631
// Lines: 541