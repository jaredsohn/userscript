scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           sinergiSideMenu
// @namespace      wejick@gmail.com
// @description    Show up sinergi side menu
// @version        2
// @include        https://175.45.185.199*
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below

var body = document.getElementsByTagName('body')[0];
var master =document.getElementById('master');
var jsmenu = document.createElement('script');
jsmenu.setAttribute('type','text/javascript');
jsmenu.setAttribute('src','http://www.javascriptkit.com/script/script2/cssverticalmenu.js');
var cssmenu = document.createElement('link');
cssmenu.setAttribute('rel','stylesheet')
cssmenu.setAttribute('href','http://www.javascriptkit.com/script/script2/cssverticalmenu.css');
var custCss = document.createElement('style');
custCss.innerHTML='div#menu {position:fixed}';
var menu = document.createElement('div');
menu.setAttribute('id','menu');
menu.innerHTML = '<ul id=verticalmenu class=glossymenu><li><a href="">Data Akademik</a><ul><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadAkademikController.jsp?akadType=DataSem">Lihat agenda semester</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadAkademikController.jsp?akadType=BiodataMhs">Update biodata mahasiswa</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadAkademikController.jsp?akadType=Kuisioner">Entri si kuesioner kuliah</a></li></ul></li><li><a href="">Data Silabus</a><ul><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadSilabusController.jsp?akadType=SilabusLihat">Lihat data</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadSilabusController.jsp?akadType=SilabusLihatPraktikum">Lihat data praktikum</a></li></ul></li><li><a href="">Data Rencana Studi</a><ul><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadRencanaController.jsp?akadType=EntriKRS">Entri krs</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadRencanaController.jsp?akadType=BtlTbhKRS">Batal tambah krs</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadRencanaController.jsp?akadType=LihatKRS">Lihat krs</a></li></ul></li><li><a href="">Data Hasil Studi</a><ul><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadHasilStudiController.jsp?akadType=LihatKHS">Lihat KHS</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadHasilStudiController.jsp?akadType=PrestasiAkademik">Lihat prestasi akademis</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadHasilStudiController.jsp?akadType=RekapStudi">Lihat Rekap Hasil Studi</a></li></ul></li><li><a href="">Data Perkuliahan</a><ul><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadKuliahController.jsp?akadType=LihatJadwal">Lihat jadwal kuliah</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadKuliahController.jsp?akadType=LihatJadwalUjian">Lihat jadwal ujian</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadKuliahController.jsp?akadType=LihatRuang">Lihat agenda ruang</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadKuliahController.jsp?akadType=LihatNilai">Lihat nilai komponen</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadKuliahController.jsp?akadType=LihatNilaiAkhir">Lihat nilai akhir</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/akadKuliahController.jsp?akadType=CekPresensi">Cek presensi</a></li></ul></li><li><a href="">Adm. User</a><ul><li><a href="https://175.45.185.199:8443/SinergiTEUB/userController.jsp?userType=GantiPwd">Ganti password</a></li></ul></li><li><a href="http://wejick.wordpress.com">Wejick</a></li><li><a href="https://175.45.185.199:8443/SinergiTEUB/requestController.jsp?requestLog=Out">Log Out</a></li></ul>';

//lets remove something annoying
var underb = master.getElementsByTagName('div')[3];
master.removeChild(underb);
//insert to document
body.insertBefore(menu,master);
var ul = document.getElementById('verticalmenu');
menu.insertBefore(jsmenu,ul);
menu.insertBefore(cssmenu,ul);
menu.insertBefore(custCss,ul);

////add this auto update script from sizzlemctwizzle
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '137266', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks


// Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
