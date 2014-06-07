scr_meta=<><![CDATA[
// ==UserScript==
// @name	Animated Smilies For Orkut ScrapBook and HTML Communities
// @version	2.0.0
// @author	AliMan
// @namespace	AliMan
// @description	Use Animated smileys in your ScrapBook and HTML community Forums. Just click on a smiley to insert. Enjoy
// @include       http://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==
]]></>;

/**********************************************************************************************************************************************************
// Smilies collected from Forum based website
// Modified By Ali Mansoor for better smiley
***********************************************************************************************************************************************************/

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	
	
smileyarr["1"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SYXNiTYnxEI/AAAAAAAAAGs/3f30npkuW24/hide1.gif";
smileyarr["2"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sj4mmvfC4GI/AAAAAAAAAs8/P-PKvuqtLWw/cry.gif";
smileyarr["3"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SYhqmnc8uoI/AAAAAAAAAH8/AFUatCKhlWw/2guns.gif";
smileyarr["4"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SYhqm99kVNI/AAAAAAAAAIE/3bkGYKZGBOc/blink.gif";
smileyarr["5"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SYhqm00an1I/AAAAAAAAAIM/zIUyZtILodM/book5.gif";
smileyarr["6"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SYhqm67UlkI/AAAAAAAAAIU/xvMwT_jmV1k/clap.gif";
smileyarr["7"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SYhqnOJLceI/AAAAAAAAAIc/x38wTP46Ksw/clap2.gif";
smileyarr["8"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SYhq4hdoZNI/AAAAAAAAAIk/B2h43n5yfUE/depressed.gif";
smileyarr["9"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SYhq5OBxbMI/AAAAAAAAAJE/Nwoe_IMzaUQ/icon_rolleyes.gif";
smileyarr["10"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SYhrSu7yMmI/AAAAAAAAAJM/40m-cBN1fDQ/lol.gif";
smileyarr["11"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SYhrUgoF5nI/AAAAAAAAAJU/aDtXZP2eIg0/love1.gif";
smileyarr["12"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sxd0hkYA-2I/AAAAAAAABC4/Beh9ETTBYFA/drvita.gif";
smileyarr["13"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SnVbyv4ADzI/AAAAAAAAA4M/enpQivyoQrM/flowers.gif";
smileyarr["14"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sj4mnGQXnmI/AAAAAAAAAtI/zp1wqajy3Ec/secret.gif";
smileyarr["15"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sxd0hN0akmI/AAAAAAAABCo/4Zyji9hfKp8/angle.gif";
smileyarr["16"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sxd1ZBMfpjI/AAAAAAAABEE/R0OhIfFpqhY/weight_lift.gif";
smileyarr["17"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sxd1YvwO4GI/AAAAAAAABD4/0X160RW0KAo/thumbup1.gif";
smileyarr["18"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sxd1Y7GuV-I/AAAAAAAABEA/WfsDUM7rqMM/vibrate.gif";
smileyarr["19"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sxd1Y6HXQ0I/AAAAAAAABD8/RHCGseGPto8/tooth.gif";
smileyarr["20"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SYhrUirj_4I/AAAAAAAAAJc/uw1X2_jXIGs/no.gif";
smileyarr["21"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SYhrUzPTPkI/AAAAAAAAAJk/xc4cN1VDpgs/sagar.gif";
smileyarr["22"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SYhrU-fVakI/AAAAAAAAAJs/OAY-x8_jHRo/shock.gif";
smileyarr["23"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SYhrhqIgAwI/AAAAAAAAAJ8/p81C7C2hgr8/thumbup.gif";
smileyarr["24"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SY1Bz7cDLtI/AAAAAAAAALY/6PW1PTxXVc8/icon_cry.gif";
smileyarr["25"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SY1xWYmT-XI/AAAAAAAAAMY/f0LaCSoyekM/angry.gif";
smileyarr["26"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SYhrhqghdNI/AAAAAAAAAKE/yh-jcjADTIQ/wallbash.gif";
smileyarr["27"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SZ7So1sx2gI/AAAAAAAAAWU/Eq670sGKk1g/sm12.gif";
smileyarr["28"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SY1xXD1mwfI/AAAAAAAAAMo/m8zGJPaudM0/anger3.gif";
smileyarr["29"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1eOzHetpI/AAAAAAAAAkQ/DGm1DpENUt0/13.gif";
smileyarr["30"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SY1xWlebaGI/AAAAAAAAAMg/UFG9jEK_XMU/icon_lol.gif";
smileyarr["31"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SYhrhijI11I/AAAAAAAAAKM/eqLWZe1s_jc/yahoo.gif";
smileyarr["32"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sj4nR3gFFRI/AAAAAAAAAtY/pd08lcNbAmU/tongue2.gif";
smileyarr["33"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SY1xXOVJ_vI/AAAAAAAAAM4/MZkYP_44-rw/boxer.gif";
smileyarr["34"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SY1yXLE5WSI/AAAAAAAAANA/orQfnS25_hU/bash.gif";
smileyarr["35"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SY1yXZ7bzII/AAAAAAAAANI/JBOrbegjmiQ/lff3.gif";
smileyarr["36"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SY1yXkTONPI/AAAAAAAAANQ/BiOjHK7Ps6E/nono.gif";
smileyarr["37"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SY1yYCJ49VI/AAAAAAAAANY/gYpLoasznZQ/roulette.gif";
smileyarr["38"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SY1zslk-75I/AAAAAAAAANg/9FwQ82VVH4c/wallbash1.gif";
smileyarr["39"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SZ7ReID5-TI/AAAAAAAAAVM/NYHbl7F0-Ho/sm0.gif";
smileyarr["40"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sxd0hW0eWpI/AAAAAAAABCs/hv8-VvuHtYs/artist.gif";
smileyarr["41"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SZ7SpCSinxI/AAAAAAAAAWc/Envjv3CWgsU/sm28.gif";
smileyarr["42"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SZ7SpHExDVI/AAAAAAAAAWk/ozpNYo8OVzI/sm31.gif";
smileyarr["43"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/SZ7T-rw2gfI/AAAAAAAAAW8/g8KlKKELHkE/sm47.gif";
smileyarr["44"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sxd1MHrLe0I/AAAAAAAABDk/ykQbxj1lZCA/fallenangel.gif";
smileyarr["45"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sxd1MN8YyVI/AAAAAAAABDo/T3BdMczUFJk/girlie.gif";
smileyarr["46"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1ladxEdAI/AAAAAAAAAmg/8SHZdzePG_w/diya.gif";
smileyarr["47"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sa1lKs7WLtI/AAAAAAAAAmI/Twpy-UFJ6Aw/AEOM.gif";
smileyarr["48"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1lK71-K0I/AAAAAAAAAmQ/DblhRzalY5s/beee.gif";
smileyarr["49"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SZ7T-kQRbSI/AAAAAAAAAXE/jjjZ8Q4usAE/sm50.gif";
smileyarr["50"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SZ7T-y4SOOI/AAAAAAAAAXc/JSnxW5Oki2c/sm59.gif";
smileyarr["51"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1eOsGdM8I/AAAAAAAAAkI/IsaqxTspupg/8.gif";
smileyarr["52"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sj4mm6rnDOI/AAAAAAAAAtA/e48yNAA4gok/knight.gif";
smileyarr["53"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1ej6eI8jI/AAAAAAAAAkw/ZzeDZpCvGmY/18.gif";
smileyarr["54"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sa1ekEdO4JI/AAAAAAAAAk4/gJ0BaEIOXZo/26.gif";
smileyarr["55"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sa1ekI1mEFI/AAAAAAAAAlA/b9W3jQfMTLU/28.gif";
smileyarr["56"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sa1ekR4Jo5I/AAAAAAAAAlI/4pbNTWBtcCs/34.gif";
smileyarr["57"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1eks29RbI/AAAAAAAAAlQ/r1EhtWkSn6A/49.gif";
smileyarr["58"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1lJfsuUXI/AAAAAAAAAlw/eVbsDunXH4c/76.gif";
smileyarr["59"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1lJ4-MgrI/AAAAAAAAAl4/BCUcpRYoKKE/77.gif";
smileyarr["60"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sa1lKfnjoJI/AAAAAAAAAmA/inf5rEbi-C4/87.gif";
smileyarr["61"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sxd0hgabPLI/AAAAAAAABC0/foY8T5ly3-4/couple.gif";
smileyarr["62"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1ePXeUojI/AAAAAAAAAko/t5_vFpcNJZM/17.gif";
smileyarr["63"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sj4mnJdR7kI/AAAAAAAAAtE/OCOBKBqTy0A/mareez.gif";
smileyarr["64"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sj4nRsqeOvI/AAAAAAAAAtQ/gyGQx4xK5UA/smash.gif";
smileyarr["65"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1laJapfZI/AAAAAAAAAmY/jG4o-M145P8/charsi.gif";
smileyarr["66"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1lalXBybI/AAAAAAAAAmo/np_XpIVJ4iA/dwarf.gif";
smileyarr["67"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sxd1My447pI/AAAAAAAABD0/1p1w5Q9uzUc/orc.gif";
smileyarr["68"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1lbaQYZrI/AAAAAAAAAm4/GHRGJ-Eg2gs/fool.gif";
smileyarr["69"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sa1lxcdbxDI/AAAAAAAAAnA/drPkXOzFTPg/helpsmilie.gif";
smileyarr["70"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sa1lxSSlABI/AAAAAAAAAnI/eWOop_fkaf0/kungfu.gif";
smileyarr["71"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1lxliDNiI/AAAAAAAAAnQ/WYnRqDQNRUo/maharani.gif";
smileyarr["72"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sa1lyDMID3I/AAAAAAAAAng/iLbAMg2ntOk/punk.gif";
smileyarr["73"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1mCooHjOI/AAAAAAAAAno/K826zQWEfWY/scooter.gif";
smileyarr["74"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sa1mDLBiD7I/AAAAAAAAAnw/zfiAlEA763c/sleep1.gif";
smileyarr["75"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sa1mDNM2jCI/AAAAAAAAAn4/KGH16EtE72U/sneaky2.gif";
smileyarr["76"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1mDZfWvOI/AAAAAAAAAoA/8ZFhgymiquU/spiteful.gif";
smileyarr["77"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1mDUpqGGI/AAAAAAAAAoI/jovZDe0at14/sweatdrop.gif";
smileyarr["78"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1mO_l-0tI/AAAAAAAAAoQ/hHVlmR--fZw/whip3.gif";
smileyarr["79"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sa1mO_3JsZI/AAAAAAAAAoY/_nGzEBg_mPw/winkiss.gif";
smileyarr["80"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sa1mPKduAUI/AAAAAAAAAog/NM3Afa2ychU/yawn.gif";
smileyarr["81"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SZ7ReYx2iRI/AAAAAAAAAVc/8IbcYE0ea2w/sm5.gif";
smileyarr["82"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sa1eO_-9YhI/AAAAAAAAAkY/mXnPqabkCJA/15.gif";
smileyarr["83"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sa1ePCc1BXI/AAAAAAAAAkg/N-BXoX3yqnw/16.gif";
smileyarr["84"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sa1lbNmCU5I/AAAAAAAAAmw/9gyGXlZmi6w/fight.gif";
smileyarr["85"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/Sa1lx8Y08jI/AAAAAAAAAnY/v3QkV5NqMdI/majnu.gif";
smileyarr["86"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SZ_ahowY-jI/AAAAAAAAAYw/EVpyKE42hok/sm32.gif";
smileyarr["87"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SZ_np3H6OtI/AAAAAAAAAY8/OJXco7wcpmI/sm27.gif";
smileyarr["88"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SZ7SFGRy7-I/AAAAAAAAAWM/4DnpQQtXUio/sm24.gif";
smileyarr["89"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SZ7SE0W6WOI/AAAAAAAAAWE/MlglyFXwZg8/sm16.gif";
smileyarr["90"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SZ7ReIjvsoI/AAAAAAAAAVU/rldkO-R7uvQ/sm2.gif";
smileyarr["91"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SZ7RepbNFfI/AAAAAAAAAVs/xc5Y0CkhRXc/sm10.gif";
smileyarr["92"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SZ7ReVdxz6I/AAAAAAAAAVk/oqU4IA4PwbE/sm6.gif";
smileyarr["93"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SZ7SE34cIpI/AAAAAAAAAV8/OaYihhXtjAI/sm13.gif";
smileyarr["94"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sj4nRjui6zI/AAAAAAAAAtU/42KcoiqGcUw/taz.gif";
smileyarr["95"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/SZ7SpewKhVI/AAAAAAAAAW0/AFnI445tq3k/sm46.gif";
smileyarr["96"]="http://lh5.ggpht.com/_WUkykBFkZ3Y/SZ7T-2v_UHI/AAAAAAAAAXU/5AMGcP0QwgM/sm52.gif";
smileyarr["97"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sj_K1d5KqBI/AAAAAAAAAuU/xH5eDifD5R8/sSig_youtheman.gif";
smileyarr["98"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/Sxd0hQt_HaI/AAAAAAAABCw/ffc55Jc7Tgg/birthday.gif";
smileyarr["99"]="http://lh6.ggpht.com/_WUkykBFkZ3Y/Sxd1MV-FKnI/AAAAAAAABDw/lgGzA9dFdnc/newbie.gif";
smileyarr["100"]="http://lh4.ggpht.com/_WUkykBFkZ3Y/SZ7T-lgP3LI/AAAAAAAAAXM/54eCTxJR9dc/sm51.gif";
smileyarr["101"]="http://lh3.ggpht.com/_WUkykBFkZ3Y/Sxd1MfUSK1I/AAAAAAAABDs/dKkKQqgB9AI/miss.gif";

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);



//////////////////
//Auto Updater///
////////////////
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '43532', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();