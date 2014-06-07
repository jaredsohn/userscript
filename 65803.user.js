// ==UserScript==
// @name           VastUniverseTitleChanger
// @namespace      http://userscripts.org/users/125692
// @description    Alters page titles for Vast Universe game
// @include        *
// ==/UserScript==

//lol as if I know any javascript.

var danloc=""+location;
danloc=danloc.slice(30);

if (danloc=='colonies.hum'){
   document.title='Colonies';
}
else if (danloc=='fed/localization.hum'){
   document.title='Localisation Map';
}
else if (danloc=='fed/treasury/treasury_log.hum'){
   document.title='Treasury Log';
}
else if (danloc=='fed/treasury.hum'){
   document.title='Treasury';
}
else if (danloc=='empire.hum'){
   document.title='EMPIRE';
}
else if (danloc=='facilities.hum'){
   document.title='Facilities';
}
else if (danloc=='account.hum'){
   document.title='Account';
}
else if (danloc=='economy.hum'){
   document.title='Economy';
}
else if (danloc=='scan.hum'){
   document.title='Scanners';
}
else if (danloc=='battle.hum'){
   document.title='Reports';
}
else if ( (danloc+"").slice(0,13) == 'battle/index/' ){
   document.title="Report"
}
else if ( (danloc+"").slice(0,16) == 'espionage/index/' ){
   document.title="Spy Report"
}
else if ( (danloc+"").slice(0,10) == 'nav/index/'){
   var tempstring=danloc+"";
   if(tempstring.slice(-4)==".hum"){
      document.title=tempstring.slice(10,-4)
   }
   else{
      document.title="System "+tempstring.slice(10)    
   }	
}
else if (danloc=='technologies.hum'){
   document.title='Technologies';
}
else if (danloc=='nav.hum'){
   document.title='Navigation';
}
else if (danloc=='designs.hum'){
   document.title='Designs';
}
else if (danloc=='fleets.hum'){
   document.title='Fleets';
}
else if ( (danloc+"").slice(0,9) == 'messages/' ){
   document.title="Message"
}
else if ( (danloc+"").slice(0,4) == 'nav/' ){
   dansel = document.getElementsByClassName('bblue')[0];
   document.title=dansel.innerHTML;
}
else if ( danloc == 'boards.hum' ){
   document.title="Boards"
}
else if ( (danloc+"").slice(0,17) == 'fed/boards/index/' ){
   dansel = document.getElementsByClassName('bblue')[1];
   document.title="Board: "+dansel.innerHTML;
}
else if ( (danloc+"").slice(0,17) == 'federation/index/' ){
   document.title="Federation"
}
else if ( (danloc+"").slice(0,6) == 'ranks/' ){
   document.title="Player Rankings"
}
else if ( (danloc+"").slice(0,9) == 'batranks/' ){
   document.title="Battle Rankings"
}else if ( (danloc+"").slice(0,9) == 'fedranks/' ){
   document.title="Federation Rankings"
}
else if ( danloc == 'gazette.hum' ){
   document.title="Gazette"
}
else if ( (danloc+"").slice(0,8) == 'gazette/' ){
   document.title="Gazette"
}

else if ( (danloc+"").slice(0,13) == 'colony/index/' ){
    link = document.getElementsByTagName('SELECT')[0];
    if (link==undefined){//probably got someone elses colony
        document.title="Colony"
    }
    else{//probably got one of our colonies so try get name
        danvalue=link[link.selectedIndex].text;
        dansel = document.getElementsByClassName('selected')[0];
        document.title=danvalue+":"+dansel.firstChild.text;
    }

}

else{
    link = document.getElementsByTagName('SELECT')[0];
    danvalue=link[link.selectedIndex].text;
    dansel = document.getElementsByClassName('selected')[0];
    document.title=danvalue+":"+dansel.firstChild.text;
}
