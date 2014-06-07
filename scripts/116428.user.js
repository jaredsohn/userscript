// ==UserScript==
// @id             org.userscripts.users.magnoz.GAThingy
// @name           Global Agenda Thingy
// @description    Adds links to offical Global Agenda stats page to matches on Agendastats.com
// @version        2011.10.26.4
// @author         magzorn
// @include        http*agendastats.com/*
// ==/UserScript==

/*
http://www.webtoolkit.info/sortable-html-table.html
http://codebase.es/riffwave/
*/


// load script and execute callback
// taken from here:
// http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome/6834930#6834930
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};


loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js", function() {
   var HiRezGAIconData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHaSURBVDhPpZM7rylhFIbHLcywd9xFS4S4RSV6UfsHCiEh0VEI8QOoRYFG9IQSP0C3E4WeTkMUonB591krmTl7Yp9T7D3JyqyZ73uftdb7zQj4c318bH8UpBVILIpvEARBCY1Gw7lWq4Wc013OaY00pGXAV7Gc/0v4de9/Afl8Hu12G51OB+VyGTqdTtUBgb4FUOVQKITdbofH44H7/Y7D4YBEIsEjkVDu7luAwWBAt9vF8/lkMUEoxuMxTCaTalwVQKanUimcTicWLZdLTKdTzi+XCzKZDFd/6UB+YbFYMJlMuPL5fEY6nUYymcTxeOSOVqsVrFbrK0A+rmw2i+v1yoB+vw+j0QgaiYykd7fbDblcjg19MdHhcGC9XnO7+/0epVIJ9XodjUYDhUIB2+2W1zabDbxeLxuqeEAjVCoVxbRqtYparcbPFM1mkyGU0yitVovHUAB+vx+9Xg+z2Qyj0Qgej4dbJRMXiwWKxSLsdjuGwyHm8zkGgwHC4fBfgCiK8Pl8CAaDCAQCPLfL5UI0GkUkEoHb7YZerwcVoj10N5vN6g+JKpCAgvxwOp2Ix+McBLPZbAyLxWL8rDJRkt7ZFDoiAtFm6oqqSJLEHxCtEZTW6BSUn+m3v/MnIxE4qFnmHbQAAAAASUVORK5CYII=';

   function dbg(msg) {
      console.log(msg);
   }

   // Agendastats (AS) -> Player Profile -> Recent Missions:
   // add a GA icon linking to the official match statistics at HiRez
   function setupASProfile() {
      dbg('setupASProfile');

      var missionBox = $('.player-box').filter(function(){ 
         return ($('th:contains(Recent Missions)', this).length == 1);
      }); 
      $.each($('a', missionBox), function() { 
         dbg('link found');
         var ASMissionLink, HiRezMissionLink, ASMissionUrl, HiRezMissionUrl, HiRezGAIcon;

         ASMissionLink = this;
         HiRezMissionLink = document.createElement('a');
         ASMissionUrl = $(ASMissionLink).attr('href');
         HiRezMissionUrl = ASMissionUrl.substring(ASMissionUrl.indexOf('=') + 1);
         
         alert('HiRezMissionUrl: ' + HiRezMissionUrl);
/*
         HiRezMissionUrl = 'https://account.hirezstudios.com/stats/missionstats.aspx?m=' + HiRezMissionUrl;
         ASMissionLink.parentNode.appendChild(HiRezMissionLink);
         $(HiRezMissionLink).attr('href', HiRezMissionUrl); 
         $(HiRezMissionLink).text('  ');

         HiRezGAIcon = document.createElement('img');
         $(HiRezGAIcon).attr('src', HiRezGAIconData);
         HiRezMissionLink.appendChild(HiRezGAIcon);
*/         
      }); 
   };

   function main() {
      dbg('main');
      
      var hostIsAgendaStats = (window.location.hostname.indexOf('agendastats.com') > -1);
      if (hostIsAgendaStats === true) {
         setupASProfile();
      }
   }

   main();
   
   dbg('done');
});

