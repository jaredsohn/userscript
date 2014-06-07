// ==UserScript==
// @name         freePorn4all_direct_links
// @description      makes the links direct to anonym.to, shows in which web store is the file, remove advs
// @include     http://www.freeporn4all.org*
// ==/UserScript==

var debug = 0; //only for debug

/*remove the first adv*/
document.getElementsByTagName('BODY').item(0).innerHTML = 
  document.getElementsByTagName('BODY').item(0).innerHTML.replace(/<!-- START ADENGAGE.COM CODE 2.0 -->[\s\S]*?<!-- END ADENGAGE.COM CODE 2.0 -->/, '');

/*remove the first adv*/
document.getElementsByTagName('BODY').item(0).innerHTML = 
  document.getElementsByTagName('BODY').item(0).innerHTML.replace(/<!-- Inizio Codice Adult-ADV -->[\s\S]*?<!-- Fine Codice Adult-ADV -->/, '');


/*remove all other advs*/
document.getElementsByTagName('BODY').item(0).innerHTML = 
  document.getElementsByTagName('BODY').item(0).innerHTML.replace(/<!--adsbegin-->[\s\S]*?<!--adsstop-->/g, '');


/*changes all the links*/
allLinks = document.getElementsByTagName('A');

if(debug > 0) {
   alert("Debug Mode ON");
   BEFOREmsg = "links BEFORE changes:\n";
   AFTERmsg = "links AFTER changes:\n";
}

for (i = 0; i < allLinks.length; i ++ )
{
   curLink = allLinks.item(i);

   if(debug > 0) BEFOREmsg += curLink.href + "\n";
   
   /*makes the links direct to anonym.to*/
   curLink.href = curLink.href.replace('http://www.freeporn4all.org/goto.php?', 'http://anonym.to/?');

   /*shows in which web store is the file*/
   if(curLink.href.match(/http\:\/\/(www\.)?rapidshare\.[a-z]{2,3}(\/files\/)?/i)) curLink.innerHTML = curLink.innerHTML + " :RAPIDSHARE";
   else if(curLink.href.match(/http\:\/\/(www\.)?filefactory\./i)) curLink.innerHTML = curLink.innerHTML + " :FILEFACTORY";
   else if(curLink.href.match(/http\:\/\/(www\.)?megaupload\./i)) curLink.innerHTML = curLink.innerHTML + " :MEGAUPLOAD";
   else if(curLink.href.match(/http\:\/\/(www\.)?megarotic\./i)) curLink.innerHTML = curLink.innerHTML + " :MEGAROTIC";
   
   if(debug > 0) AFTERmsg += curLink.href + "\n";

}

if(debug > 0){
   alert(BEFOREmsg);
   alert(AFTERmsg);
}
