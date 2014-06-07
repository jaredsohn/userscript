// ==UserScript==
// @name	smileys10
// @version	1.00
// @author	Devjmi
// @description	Use Animated emoticons(for www.frendz4m.com only) in community Forums. Just click on a smiley to insert. Enjoy
// @include        http://*.frendz4m.*/*reply.php*
// @include        http://*.frendz4m.*/*forum*/*showthreads*
// @include        http://*.frendz4m.*/*forum*/*index2.php*
// @include	   http://*.frendz4m.*/forum/index2.php*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();	
smileyarr["Colere_9"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHG1w7RqAI/AAAAAAAAAhY/TioU3JaJ14Q/Colere_9.gif";
smileyarr["Colere_8"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHG3QC32EI/AAAAAAAAAhc/2_yYOUCJiRI/Colere_8.gif";
smileyarr["Colere_70"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHG4bLumqI/AAAAAAAAAhg/NGwgDaDTGhA/Colere_70.gif";
smileyarr["Colere_7"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG4xC2Z7I/AAAAAAAAAhk/HorQ3DyZNCE/Colere_7.gif";
smileyarr["Colere_69"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG5nfTPrI/AAAAAAAAAho/Fp15c7iW5Ro/Colere_69.gif";
smileyarr["Colere_68"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHG6TEucNI/AAAAAAAAAhs/6HCUB2mPyII/Colere_68.gif";
smileyarr["Colere_67"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG7n1br9I/AAAAAAAAAhw/nfGRHTfldNI/Colere_67.gif";
smileyarr["Colere_66"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHG8YiLagI/AAAAAAAAAh0/ibsuh-ixavo/Colere_66.gif";
smileyarr["Colere_65"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHG9iCgdVI/AAAAAAAAAh4/4II5XEPh5zM/Colere_65.gif";
smileyarr["Colere_64"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG-L3R-BI/AAAAAAAAAh8/2tzqqicA3E4/Colere_64.gif";
smileyarr["Colere_63"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHG-qIh2xI/AAAAAAAAAiA/1JQeP0voxZc/Colere_63.gif";
smileyarr["Colere_62"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHG_izwopI/AAAAAAAAAiE/8-mu7WSouOA/Colere_62.gif";
smileyarr["Colere_61"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHAljT47I/AAAAAAAAAiI/b6IZqe_tOPw/Colere_61.gif";
smileyarr["Colere_60"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHBtOz6VI/AAAAAAAAAiM/uJCM7vIoRrI/Colere_60.gif";
smileyarr["Colere_6"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHCKVtXZI/AAAAAAAAAiQ/FHMdHo2E7eY/Colere_6.gif";
smileyarr["Colere_59"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHC_ibmUI/AAAAAAAAAiU/sli-pXrP02c/Colere_59.gif";
smileyarr["Colere_58"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHDnN64dI/AAAAAAAAAiY/YcyL8m_bgvg/Colere_58.gif";
smileyarr["Colere_57"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHEQXdFxI/AAAAAAAAAic/CAg6vpd1GG8/Colere_57.gif";
smileyarr["Colere_56"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHE42D3RI/AAAAAAAAAig/4vmb0auMK78/Colere_56.gif";
smileyarr["Colere_55"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHFfU0j3I/AAAAAAAAAik/5oZksOYuRFA/Colere_55.gif";
smileyarr["Colere_54"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHGKtnbGI/AAAAAAAAAio/lOc2_owZ5YQ/Colere_54.gif";
smileyarr["Colere_52"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHHbJfhyI/AAAAAAAAAis/5UVmfwr7-uM/Colere_52.gif";
smileyarr["Colere_51"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHJJlJn2I/AAAAAAAAAiw/ryTrv9Axvws/Colere_51.gif";
smileyarr["Colere_50"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHJ69d9_I/AAAAAAAAAi0/3RUcP7r8PKo/Colere_50.gif";
smileyarr["Colere_5"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHK4LmBaI/AAAAAAAAAi4/zsuhVdwHzNU/Colere_5.gif";
smileyarr["Colere_49"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHMaAPHMI/AAAAAAAAAi8/7gCV7f8fFgM/Colere_49.gif";
smileyarr["Colere_48"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHM9Hx4lI/AAAAAAAAAjA/HzlC1mlYTCA/Colere_48.gif";
smileyarr["Colere_47"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHNUz6eAI/AAAAAAAAAjE/LzoPKCutqDg/Colere_47.gif";
smileyarr["Colere_45"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHN4LeJoI/AAAAAAAAAjI/03xCeK1zIuk/Colere_45.gif";
smileyarr["Colere_44"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHOYlq4JI/AAAAAAAAAjM/6qh0KlKFAQw/Colere_44.gif";
smileyarr["Colere_43"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHO-lCzpI/AAAAAAAAAjQ/blGo6iRJIUI/Colere_43.gif";
smileyarr["Colere_42"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHPoqrFvI/AAAAAAAAAjU/qo0HRiD5mCg/Colere_42.gif";
smileyarr["Colere_41"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHQA-LIUI/AAAAAAAAAjY/GLLJFFiQWRQ/Colere_41.gif";
smileyarr["Colere_40"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHRsU3sNI/AAAAAAAAAjc/ul0gztj30CM/Colere_40.gif";
smileyarr["Colere_4"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHSoNu_oI/AAAAAAAAAjg/eKhaYqy6gZE/Colere_4.gif";
smileyarr["Colere_39"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHTahxVLI/AAAAAAAAAjk/QaqoKV-DR6w/Colere_39.gif";
smileyarr["Colere_38"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHUTbjsII/AAAAAAAAAjo/nEwNS6PG3DA/Colere_38.gif";
smileyarr["Colere_37"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHVNiI0SI/AAAAAAAAAjs/fLQuZxArYmE/Colere_37.gif";
smileyarr["Colere_36"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHWkXOeWI/AAAAAAAAAjw/VtuKyABS5t0/Colere_36.gif";
smileyarr["Colere_35"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHX1rtE0I/AAAAAAAAAj0/IRADUj1-uyI/Colere_35.gif";
smileyarr["Colere_34"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHY4Y5CPI/AAAAAAAAAj4/zSe_pM-dzGs/Colere_34.gif";
smileyarr["Colere_32"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHZninniI/AAAAAAAAAj8/G4cLFCXW-hs/Colere_32.gif";
smileyarr["Colere_31"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHawTum1I/AAAAAAAAAkA/eT17asZU46c/Colere_31.gif";
smileyarr["Colere_30"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHs_lx74I/AAAAAAAAAkE/XNDH1eXIQsk/Colere_30.gif";
smileyarr["Colere_3"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHuiYhpvI/AAAAAAAAAkI/GRnKXvWJffs/Colere_3.gif";
smileyarr["Colere_29"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHv9mO9gI/AAAAAAAAAkM/_cmTBMfwYOE/Colere_29.gif";
smileyarr["Colere_28"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHw3WJ__I/AAAAAAAAAkQ/HGjEvSDyHQY/Colere_28.gif";
smileyarr["Colere_27"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHxsLQkEI/AAAAAAAAAkU/MjbruWY_tQ0/Colere_27.gif";
smileyarr["Colere_26"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHy-8947I/AAAAAAAAAkY/Hy2eSt6t_zU/Colere_26.gif";
smileyarr["Colere_25"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHH0spmlsI/AAAAAAAAAkc/WGdvqRxtM28/Colere_25.gif";
smileyarr["Colere_24"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHH197wxdI/AAAAAAAAAkg/nQRfwuNzjz0/Colere_24.gif";
smileyarr["Colere_23"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHH3iRPjpI/AAAAAAAAAkk/sfW_Eh467JY/Colere_23.gif";
smileyarr["Colere_22"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHH45zBvSI/AAAAAAAAAko/8CYukqVo_Yc/Colere_22.gif";
smileyarr["Colere_21"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHH6H0l46I/AAAAAAAAAks/lKSffEpF5uQ/Colere_21.gif";
smileyarr["Colere_20"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHH90HrSlI/AAAAAAAAAkw/Mogb_6x8muk/Colere_20.gif";
smileyarr["Colere_2"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHH-XUUnLI/AAAAAAAAAk0/OtuyX4T4D00/Colere_2.gif";
smileyarr["Colere_19"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHIAZHM65I/AAAAAAAAAk4/vcprRyjaQ_U/Colere_19.gif";
smileyarr["Colere_18"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHICXJ-mXI/AAAAAAAAAk8/nPLqHtk2WCQ/Colere_18.gif";
smileyarr["Colere_17"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHICwMdYdI/AAAAAAAAAlA/MC18dLSp2xY/Colere_17.gif";
smileyarr["Colere_16"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHID7ivkEI/AAAAAAAAAlE/Yk2Qu5WXnUY/Colere_16.gif";
smileyarr["Colere_15"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHIEe6gxtI/AAAAAAAAAlI/-cuX0D3hv6g/Colere_15.gif";
smileyarr["Colere_14"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIE3NtrLI/AAAAAAAAAlM/foGlXjneQlM/Colere_14.gif";
smileyarr["Colere_13"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIF07NwoI/AAAAAAAAAlQ/-g5s3keIqNs/Colere_13.gif";
smileyarr["Colere_12"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIGiq6zEI/AAAAAAAAAlU/wmBoeqqGGn8/Colere_12.gif";
smileyarr["Colere_11"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHIHNTbP5I/AAAAAAAAAlY/mDTI7z84zCY/Colere_11.gif";
smileyarr["Colere_10"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIHnty_dI/AAAAAAAAAlc/iUo17jnPxCE/Colere_10.gif";
smileyarr["Colere_1"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHII713RzI/AAAAAAAAAlg/R43kO6fsSqI/Colere_1.gif";
smileyarr["Colere"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIJ0F9-pI/AAAAAAAAAlk/x76z_e0svMQ/Colere.gif";
	

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

// Auto Updator
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '45538', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
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