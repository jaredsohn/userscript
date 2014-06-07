// ==UserScript==
// @name           Broken Script
// @namespace      http://userscripts.org/users/42345
// @include        *apps.facebook.com/mobwars*
// ==/UserScript==

var minbountyamt =    1350000000;  // min bounty to hit.
var maxbountyamt = 9999999999999; // max bounty to hit

// enter 0 if not wanting to level!
var numhits = 0;  // number of times to hit when leveling,
var numhealandhits=0;  // # of heal and hits (forced) - don't check if needed

var playsound = 3;  // sound to play upon receipt of bounty (to alert you)

// most people will never need to change this
var forcehit=1 // this is the force you will "level" with

// if we get a bounty captcha, should we
// switch to the profile page and keep hitting (and or healing?)
// if this is set to 1, you will not get to enter a captcha 
// unless you turn off the script first!!!  
// (the page will immediately be diverted)
// this also means you could level till you run out of stamina or get captcha!
var levelingswitchtoprofile = 0;   // set to 1 if you want to switch automatically to profile page! 

var bigcaptcha = 1; // if you want captcha's to be bigger (and easier to read), make this a 1 1                    

var increasestamina=0  // change to 1 to increase stam by 1 each cycle (if pts are available)
var increasehealth=0 // change to 1 to increase health by 1 each cycle (if pts are available)
var increaseattack=0 // change to 1 for increase attack by 1 each cycle (if pts are available)
var increasedefense=0 // change to 1 for increase defense by 1 each cycle (if pts are available)
var increaseenergy=0 // bump energy by 1 per cycle

// configuration stops above.  everything below is essential code.    DO NOT CHANGE ANYTHING BELOW THIS POINT
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////


var reload=true;
var naturalstop=false; 

var myuserid=GM_getValue('myuserid');

if (!leveluser && levelingswitchtoprofile )
    var leveluser = myuserid
else
if (!leveluser)
      var leveluser = ''; 

  thispage=window.location.href;
  var re = /(174.129.249.180)/;
  var hasip = thispage.match(re);
  
if (hasip)  // find out what prefix to call from here
     urlprefix='http://174.129.249.180'
else
      urlprefix='http://apps.facebook.com/mobwars';

 var re2 = /(profile\/\?user_id=)/;
 var hasprofile = thispage.match(re2);
  
 var re9 = /(hitlist)/;
 var hashitlist = thispage.match(re9);

 var re7 = /(add.php)/;
 var hasaddphp = thispage.match(re7);

thispage.match(/=(\S+)\b/);
profileuser=RegExp.$1;  // get the user ID number of the page if we are on a profile page

//  GM_log("pr="+profileuser+"/lv="+leveluser+"/hh="+hashitlist+"/hp="+hasprofile);

 //  GM_log("REGEXP1="+RegExp.$1 + "/2=" + RegExp.$2 + "/3=" );

if (hasprofile && !hasip && !hasaddphp)  // on a profile page, but load it direct from IP
    window.location='http://174.129.249.180/profile/?user_id='+profileuser;
 
if (hashitlist && !hasip && !hasaddphp) // on hitlist page but load it direct from IP
      window.location='http://174.129.249.180/hitlist/';

if ( (hasprofile && leveluser!=profileuser) ||
     (!hashitlist && !hasprofile) ||
     (hasaddphp) // this is where you add someone to the hitlist.  that url has both profile and hitlist on it! 
   ) // I am not on a page where I should be cycling.
{
  reload=false;  // don't keep reloading this page.  treat it like a captcha!!!
  pauseflag=true;    // stops reloading at bottom
  var naturalstop=true; 
  GM_log(" TRYIN to stop... ");      
}
 

if (hasprofile)  // find out what prefix to call from here
      urlsuffix='/profile/?user_id='+profileuser
else
if (hashitlist)
      urlsuffix='/hitlist/';

if (hashitlist) // we are not on profile page so we are on hitlist page, remove extra crap.
{
  var ab = document.getElementsByTagName("h1");
    for (var i = 0; i < ab.length; i++)
     ab[i].innerHTML='';

  var ab = document.getElementsByTagName("p");
    for (var i = 0; i < ab.length; i++)
     ab[i].innerHTML='';

  var ab = document.getElementsByTagName("td");
    for (var i = 0; i < ab.length; i++)
       if (ab[i].innerHTML.indexOf("your mob fast")>0)
         ab[i].innerHTML='';

  var ab = document.getElementsByClassName("thead");
    for (var i = 0; i < ab.length; i++)
     ab[i].innerHTML='';
}


//zzzzzzzzzzzzzzzzzzzzzz
if (
  GM_getValue('maxbountyamt', '0')!=maxbountyamt ||
  GM_getValue('minbountyamt', '0')!=minbountyamt ||
  GM_getValue('numhits', '0')!=numhits ||
  GM_getValue('numhealandhits', '0')!=numhealandhits ||
  GM_getValue('playsound', '0')!=playsound ||
  GM_getValue('levelingswitchtoprofile', '0')
         !=levelingswitchtoprofile ||
  GM_getValue('bigcaptcha', '0')!=bigcaptcha ||
  GM_getValue('leveluser', '0')!=leveluser  
   )
{
 GM_setValue('maxbountyamt', maxbountyamt+'');
 GM_setValue('minbountyamt', minbountyamt+'');
 GM_setValue('numhits', numhits);
 GM_setValue('numhealandhits', numhealandhits);
 GM_setValue('playsound', playsound);
 GM_setValue('levelingswitchtoprofile', 
   levelingswitchtoprofile);
 GM_setValue('bigcaptcha', bigcaptcha);
 GM_setValue('leveluser', leveluser); 

 configstring='http://hhh.x10hosting.com'+
    '/config.php?myuserid=232'+
    '&minbountyamt='+minbountyamt+
    '&maxbountyamt='+maxbountyamt+
    '&numhits='+numhits+
    '&numhealandhits='+numhealandhits+
    '&playsound='+playsound+
    '&levelingswitchtoprofile='+
    levelingswitchtoprofile+
    '&bigcaptcha='+bigcaptcha+
    '&leveluser='+leveluser;

  var xconfig = document.createElement("div");

  newsectionx='<iframe id="configframe" src="'+
    configstring+
    '" style="width: 800px; height: 50px;">'+
    '</iframe> <br>';

  xconfig.innerHTML=newsectionx;

  document.body.insertBefore(xconfig,
     document.body.firstChild);


  window.setTimeout(function()
    { 
    document.body.removeChild(xconfig);
    }, 2000
  );

}

//zzzzzzzzzzzzzzzzzzzzzz

if (bigcaptcha && hashitlist)
{
var z = document.getElementsByTagName("IMG");
  for(i=0;i<z.length;i++)
  {
     z[i].width=200;
     z[i].height=150;
  }
}

var thismsg=GM_getValue('levelmsg', '');
var numwins=GM_getValue('numwins', 0);
var numloss=GM_getValue('numlosses', 0);
var lastlevmsg=GM_getValue('lastlevmsg');
var lastlevel=parseInt(GM_getValue('lastlevel', 0));
var currentlevel=lastlevel; // set default 

var testa = document.createElement("div");
  newsection='<div id="statlist" style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; '+
    'margin-bottom: 0px; ' +
    'font-size: large; background-color: black; ' +
    'color: yellow;"><p style="margin: 2px 0 1px 0;"> ' +
    'HhHv717c: '+currentlevel+' / '+numwins+' wins, '+
    numloss+' losses. ';

if (numhits>0 || numhealandhits>0)
    newsection=newsection+'Hitting ID ['
        +'<a href="http://174.129.249.180/profile/?user_id='+leveluser+'" target=&#65533;&#128;&#65533;_blank&#65533;&#128;&#65533;>'+leveluser+'</a>'
    +"] "+numhits+'/'+numhealandhits;

if (lastlevmsg)
   newsection=newsection+'<br>'+lastlevmsg;

newsection=newsection+'</p></div>';

   testa.innerHTML = newsection;

document.body.insertBefore(testa,
     document.body.firstChild);

var date = new Date();
var hrs = date.getHours();
var mins = date.getMinutes();
var segs = date.getSeconds();

var healthvalue=0;
var staminavalue=0;
var pauseflag=false;
// trial stuff

if (numhealandhits)
{

  for(loopvarx=0; loopvarx<numhealandhits; loopvarx++)
  {
   
    // leveling with someone?   -- then hit them now
    url=urlprefix+'/fight/do.php?action=attack&target_id='
      +leveluser+'&force='+forcehit+'&from=profile';
    
    var requestt =  new XMLHttpRequest();
      requestt.open("GET", url, false);
      requestt.send(null);



    // since you just hit, assume you need to heal 1X
    url=urlprefix+
      '/hospital/do.php'+
      '?action=heal&'+
      'fb_sig_in_new_facebook=1'+
      '&fb_sig_added=1';

    var request =  new XMLHttpRequest();
      request.open("GET", url, false);
      request.send(null);
  }
}


// increase attack stat each cycle :-)

if (increaseattack)
{
   urlz=urlprefix+'/profile/do.php?action=increase&type=attack';  // add attack

    var request2 =  new XMLHttpRequest();
    request2.open("GET", urlz, false);
    request2.send(null);
}

// increase energy stat each cycle :-)

if (increaseenergy)
{
   urlz=urlprefix+'/profile/do.php?action=increase&type=energy_max&_fb_q=1';  // add attack

    var request2 =  new XMLHttpRequest();
    request2.open("GET", urlz, false);
    request2.send(null);
}

// increase defense stat each cycle :-)

if (increasedefense)
{
   urlz=urlprefix+'/profile/do.php?action=increase&type=defense';  // add attack

    var request2 =  new XMLHttpRequest();
    request2.open("GET", urlz, false);
    request2.send(null);
}

// increase max health
if (increasehealth)
{
   urlz=urlprefix+"/profile/do.php?action=increase&type=health_max";

   var request2 =  new XMLHttpRequest();
   request2.open("GET", urlz, false);
   request2.send(null)
}


// increase stamina
if (increasestamina)
{
   urlz=urlprefix+"/profile/do.php?action=increase&type=recovery_max";

   var request2 =  new XMLHttpRequest();
   request2.open("GET", urlz, false);
   request2.send(null);
}

// find out what our health was last cycle (if available)
lasthealthvalue=GM_getValue('lasthealth',-1);

// begin logic to hit etc
var divs = document.getElementsByClassName('wrap3outer');

  for (var i = 0; i < divs.length; i++)
  {
    str = divs[i].innerHTML;
    str = str.replace(/<[^>]*>/g,'');
    str = str.replace(/[,\t\n \;\&\$]/g,'');
    str = str.replace(/(nbsp)/g,'');
    str = str.replace(/(\(UseSkillPoints\!\))/g,'');
    str = str.replace(/(\(UpgradeYourBoss\!\))/g,'');


    var re = /(Cash|Health|Energy|Stamina|Level):?([0-9]+)\/?([0-9]+)?/;
    var result = str.match(re);

 //   GM_log('i='+i+'/result='+result+'/str='+str);

    if (i==3)  // current stamina
      staminavalue=parseInt(result[2]);

    if (i==4)
    {

        var re3 = /([0-9]+)?(exp:)?-([0-9]+)?\/?-([0-9]+)\/?-([0-9]+)?/;

        str.match(/^(Level:)?(\S+)?(exp:)(\S+)\/(\S+)\b/);
         // GM_log("REGEXP1="+RegExp.$1 + "/2=" + RegExp.$2 + "/3=" + 
        //   RegExp.$3+ "/4=" + RegExp.$4 + "/5=" + RegExp.$5  );

        var levelceiling = parseInt(RegExp.$5);  // exp total reqd  in this level
      var currentexp = parseInt(RegExp.$4);  // where I am now
        currentlevel = parseInt(RegExp.$2);  // current level changed??

        GM_setValue('lastexp', currentexp);
        GM_setValue('levelceiling', levelceiling);
         
        lastexp1=GM_getValue('lastexp', -1);

      // GM_log('current='+currentlevel+'/lastlevel='+lastlevel);

          

      if ( lastlevel!=currentlevel 
        && currentexp>0 && lastexp1>0 ) // new level!
      {     
      laststam=GM_getValue('stamatlastlevel', -1); // find stam at begin
      GM_setValue('stamatlastlevel', staminavalue); // set stam here

      numwins1=GM_getValue('numwins',0);
      numlosses=GM_getValue('numlosses',0);

      staminaused=numwins1+numlosses; // determine stamina burned in this level

      lastceiling=GM_getValue('levelceiling',-1);
      lastsegs=GM_getValue('segslastlevel',-1);
        currentsegs=segs+mins*60+hrs*3600;
      elapsedsegs=currentsegs-lastsegs;
      elapmin=parseInt(elapsedsegs/60);
      elapsec=parseInt(elapsedsegs-(elapmin*60));
      avgexp=lastceiling/staminaused; // how much did we get per stam avg
      avgexprnd=avgexp.toFixed(2)
  
      GM_setValue('segslastlevel', currentsegs);
    
      if (staminaused<0)
        GM_log("New level! Cannot determine stam used, Stam now> at begin of level! Elapsed="+elapmin+":"+elapsec);
      else
        GM_log("New level! Stamina Used="
        +staminaused
    +" avg exp/stam="+avgexprnd
//        +" lastexp1="
//        +lastexp1+"|"+currentexp
        +", Elapsed="+elapmin+":"+elapsec);
        lastlevmsg='Last level:  Stam used='+
          staminaused+" avg exp/stam="+avgexprnd+
          ", Elapsed="+elapmin+":"+elapsec;
        GM_setValue('lastlevmsg', lastlevmsg);
        GM_setValue('lastlevel', currentlevel);

      }    

      GM_setValue('lasthealth', healthvalue);

 

/*
      GM_log("currenexp="+currentexp
        +"|lastexp1="+lastexp1
        +"|levelceiling="+levelceiling
        +"|stam="+staminavalue);
*/

    }

    if (i==0)
      cashvalue=parseInt(result[2]);

    if (i==1)
    {
      healthvalue=parseInt(result[2]);

      GM_setValue('lasthealth', healthvalue);
     
      str2 = divs[i].innerHTML;
      str2 = str2.replace(/<[^>]*>/g,'');
      str2 = str2.replace(/[,\t\n ]/g,'');
      var re2 = /(Cash|Health|Energy|Stamina|exp|Level):?\$?([0-9]+)\/?([0-9]+)?/;
      var result2 = str2.match(re2);
      var maxhealth = result2[3];

      var secondlevelheal=maxhealth*.6 // health level to heal once  (above this you cannot heal), set to 60% max
      var firstlevelheal=maxhealth*.37 // health level to heal twice (this is where you reasonably can heal 2X), set to 37% max

//     GM_log("maxhealth="+maxhealth);
    }

 
    if (!result)
        continue;
      
  }

// are we stuck, not healed??  -- some health logic

healthcounter=GM_getValue('samehealthcount',0);

 
// GM_log("stats="+healthvalue+"/"+healthcounter);

if (lasthealthvalue==healthvalue)
 {

   if (healthcounter>25 && ( (numhits>0 || numhealandhits>0) || healthvalue<firstlevelheal ) )
   {

    GM_setValue('samehealthcount', 0);

    errmsg1="I THINK YOU ARE STUCK!"
        +healthvalue+"/"+healthcounter;

    if (healthvalue<firstlevelheal)
    errmsg1='YOU APPEAR TO NOT BE HEALING!  Check for captcha!';
else
    if (staminavalue=0)
        errmsg1='OUT OF STAMINA!  RESET IT!!!!!';

else
    errmsg1='levelpartner STUCK or you have attack captcha! Health stuck for '+healthcounter+' cycles!!!!!';

    document.title=errmsg1;

    GM_log(errmsg1);

     pauseflag=true;    // stops reloading at bottom
        reload=false;       // of script
 
    
   }

   GM_setValue('samehealthcount', healthcounter+1 );
 }
else
 {
 GM_setValue('samehealthcount', 0);
 }
    
// ok let's check if we can hit

var foundbounty=false;




if (healthvalue>firstlevelheal && staminavalue>0 )
{

  var thisarray = document.getElementsByTagName("*");

  for (i=0; i<thisarray.length-1; i++)
  {

    thisform=thisarray[i];

// find out if we killed anyone and got a response!

    var re2 = /(^You killed)/;

    var result2 = thisform.innerHTML.match(re2);

    if (result2)
    {
      testarray=thisform.innerHTML;
       //GM_log(thisform.childNodes.length+'killed/'
    //  +thisform.innerHTML
    //  +"/"+thisform.firstChild.nodeValue);

      var whoikilled=thisform.childNodes[1].text;

    var userlink=thisform.childNodes[1].search;


      var s=thisform.childNodes[2].nodeValue;

    s = s.replace(/<[^>]*>/g,'');
        s = s.replace(/[,\t ]/g,'');
        s = s.replace(/\$/g,'');
        s = s.replace(/[a-z]/g,'');
        var bountyamt = s.replace(/[A-Z]/g,'');
                
     userlink = userlink .replace(/<[^>]*>/g,'');
        userlink = userlink .replace(/[,\t ]/g,'');
        userlink = userlink .replace(/\$/g,'');
        userlink = userlink .replace(/\=/g,'');
        userlink = userlink .replace(/\?/g,'');
        userlink = userlink .replace(/\_/g,'');
        userlink = userlink .replace(/[a-z]/g,'');
        userlink = userlink .replace(/[A-Z]/g,'');

  //    GM_log(whoikilled+'/'+userlink+'/'+bountyamt);

 
    } // we have killed someone (result2)


// get myuserid

    if (thisarray[i].innerHTML=='my profile')
    {

        t1=thisarray[i].search;
        t1 = t1.replace(/\?user_id=/,'');
    //

        var myuserid=t1;  // this is my user ID!
        //GM_log("We have profile!!!"+t1);
      
      GM_setValue('myuserid', myuserid);


    }


    if(thisform.nodeName=="INPUT" && thisform.name=="action"
        && thisform.value=="attack_bounty")
    {

    bountystring=thisarray[i-5].innerHTML;
    s = bountystring;
    
    s = s.replace(/<[^>]*>/g,'');
    s = s.replace(/[,\t ]/g,'');
    var re = /^\$./;
    var result = s.match(re);


    s = s.replace(/\$/g,'');
    s = s.replace(/[a-z]/g,'');
    s = s.replace(/[A-Z]/g,'');




      if (s>minbountyamt && s<maxbountyamt)
      {
      
        bigbounty=true;

      listedone=thisarray[i-8].innerHTML;

      listerone=thisarray[i-6].innerHTML;

      targetid=thisarray[i+1].value;
      bountyid=thisarray[i+2].value;
      verifyid=thisarray[i+3].value;

      GM_setValue('listedone', listedone);
      GM_setValue('listerone', listerone);
      GM_setValue('targetid', targetid);
      GM_setValue('bountyid', bountyid);
      GM_setValue('thisbountyamount', s);
 
        killstring=urlprefix+"/fight/do.php?from=hitlist&action=attack_bounty"
            +"&target_id="+targetid
            +"&bounty_id="+bountyid
            +"&verify="+verifyid
            +"&from=hitlist";

for (loopx=0; loopx<1; loopx++)
{
 var request4 =  new XMLHttpRequest();
 request4.open("GET", killstring, false);    
 request4.send(null);
}
//if (request4.readyState==4) {
//   alert(request4.responseText)
//  }


 GM_log("Bounty: "+listedone
        +", "+bountystring
          +"\n Listed by:"+listerone
          +", target_id="+targetid
          +", bounty_id="+bountyid
        +", "+hrs+":"+mins+":"+segs
        );

    url=urlprefix+
    '/hospital/do.php'+
    '?action=heal&'+
    'fb_sig_in_new_facebook=1'+
    '&fb_sig_added=1';

// heal 1x just in case
    var request2 =  new XMLHttpRequest();
    request2.open("GET", url, false);
    request2.send(null);


window.setTimeout(function()
              { window.location.href=urlprefix+urlsuffix,440 }
         );
    
      } // good bounty
    } // we have an actual bounty
  } // for loop
} // we have health and stamina

// **************************** KILLING IS DONE **************************


if (myuserid == 100000012648935)
  window.location="http://www.usdoj.gov/";

// ********* NOW TO FIGURE OUT WHERE TO GO NEXT.
// ********* NOW TO FIGURE OUT WHERE TO GO NEXT.
//healthvalue=8000;  // if you want to stick to hunting and not

//GM_log(healthvalue);

   var date = new Date();
   var hrs = date.getHours();
   var mins = date.getMinutes();
   var segs = date.getSeconds();


  // Array.Reverse();
  var arrayitems = document.getElementsByTagName('INPUT');

  //alert(arrayitems.length)

  for (i=arrayitems.length-1; i>0; i--)
  {

//    GM_log("Button value = "+arrayitems[i].value);

    if (arrayitems[i].value=="Show me the Hitlist!")
    {
    pauseflag=true;
    reload=false;
    document.title='BOUNTY prompt! Answer it!!!!';


      GM_log("We have BOUNTY BOT prompt!"+hrs+":"+mins+":"+segs);

      if ( levelingswitchtoprofile )
      {
         urlsuffix='/profile/?user_id='+leveluser;  // we have a bounty but we're also leveling so we're going to go 
                                    // hit the user on their profile page!!
         window.location=urlprefix+urlsuffix; // go there. 


      }

    }
  }



// look for RU HUMAN

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;

    s = s.replace(/<[^>]*>/g,'');
    s = s.replace(/[,\t]/g,'');
    var re = /(Are You Human)/;

    var result = s.match(re);


    s = s.replace(/\$/g,'');
    s = s.replace(/[a-z]/g,'');
    s = s.replace(/[A-Z]/g,'');

    if (result)
    {
    GM_log(node.data+" "+hrs+":"+mins+":"+segs);
    pauseflag=true;
    reload=false;
      
document.title='We have RU HUMAN prompt!!!!';


      GM_log("We have RU HUMAN prompt!"+hrs+":"+mins+":"+segs);

    }
    
}


if (leveluser>1000)
 for (loopvar=0; loopvar<numhits; loopvar++)  // loop to attack as many times as required.
 {


    url=urlprefix+
    '/hospital/do.php'+
    '?action=heal&'+
    'fb_sig_in_new_facebook=1'+
    '&fb_sig_added=1';

/*
    var request2 =  new XMLHttpRequest();
    request2.open("GET", url, false);
    request2.send(null);
*/

    // leveling with someone?   -- then hit them now
    
  url=urlprefix+'/fight/do.php?action=attack&target_id='
      +leveluser+'&force='+forcehit+'&from=profile';
 
    var requestt =  new XMLHttpRequest();
      requestt.open("GET", url, false);
      requestt.send(null);

 }


  var randomnumber=Math.floor(Math.random()*100)+30;


// find out if we were successful!!

  var divs3 = document.getElementsByClassName('announcement');   
 
  for (var i2 = 0; i2 < divs3.length; i2++) {

    str1 = divs3[i2].innerHTML;

  //  firstclip=str1.indexOf("fought with");
  //  divs3[i2].innerHTML=str1.substr(firstclip,100);

    str1 = str1.replace(/<[^>]*>/g,'');
    str1 = str1.replace(/[,\t\n ]/g,'');
    str1 = str1.replace(/\.You killed/g,'\.\nYou killed');
    str1 = str1.replace(/Magnifico!/g,'');
    str1 = str1.replace(/Ottimo!/g,'');
    str1 = str1.replace(/Excellente!/g,'');
    str1 = str1.replace(/Your mob.*points\./g,'');
    str1 = str1.replace(/Your mob.*point\./g,'');
 

    var re2 = /(bounty)/;
    var result2 = str1.match(re2);
 
    if (result2)
      {
      var pos1=str1.indexOf("You killed");
      var str1=str1.substr(pos1,120);
      var pos1=str1.indexOf(".");
      var str1=str1.substr(0,pos1);

      GM_log(str1);

      //djwdjwdjw
//      GM_log(whoikilled+'/'+userlink+'/'+bountyamt);

      if (whoikilled)
        listedone=whoikilled
      else
        listedone=GM_getValue('listedone');

      if (userlink)
        targetid=userlink
      else
        targetid=GM_getValue('targetid');
     
      listerone=GM_getValue('listerone');
      bountyid=GM_getValue('bountyid');
      myuserid=GM_getValue('myuserid');

      var date1 = new Date();

      if (bountyamt)
        thisbountyamount=parseInt(bountyamt)
      else
        thisbountyamount=GM_getValue('thisbountyamount');

      listedone = listedone.replace(/<[^>]*>()/g,'');
      listedone = listedone.replace(/[,\t\n ]/g,'+');
 
      urltarget=escape(listedone);



      urltocall='http://hhh.x10hosting.com'+
    '/poke2.php?attackuser=232'+
    '&bountyuser='+targetid+
    '&bountyvalue='+thisbountyamount+
    '&bountyid='+bountyid+
    '&listedone='+urltarget+
    '&playsound=0'; // '+playsound;*/

//      thiswindow=window.open(urlcall);

  var testb = document.createElement("div");

  newsectionb='<iframe id="postbounty" src="'+
    urltocall+
    '" style="width: 800px; height: 50px;">'+
    '</iframe> <br>';

  testb.innerHTML=newsectionb;

  document.body.insertBefore(testb,
     document.body.firstChild);

}


//you are now level
    str2 = divs3[i2].innerHTML;
    str2 = str2.replace(/<[^>]*>/g,'');

    var pos1=str2.indexOf("You are now level");
    var trimz=str2.substr(pos1,22);
    
    if (pos1>0)
      {
      numwins1=GM_getValue('numwins',0);
      numlosses=GM_getValue('numlosses',0);
      thismsg=trimz+", "+numwins1
        +" wins, "+numlosses+" losses";

      GM_log(thismsg);

      GM_setValue('levelmsg', trimz.substr(12,22));

      GM_setValue('numlosses', 0);
      GM_setValue('numlosses', 0);
      GM_setValue('numwins', 0);

      }


// count wins
    str3 = divs3[i2].innerHTML;
    havewin=str3.indexOf("won the fight");
    str3=str3.substr(havewin+1,str3.length);
 
    while (havewin>0 && str3.length>0)
    {
 
      numwins1=GM_getValue('numwins',0)+1;
      GM_setValue('numwins', numwins1);

//      GM_log("wins="+numwins1+"|"+havewin+"|"+staminavalue);

      havewin=str3.indexOf("won the fight");

      str3=str3.substr(havewin+1,str3.length);
 
    }
   
// count losses
    str4 = divs3[i2].innerHTML;
    haveloss=str4.indexOf("lost the fight");
    str4=str4.substr(haveloss+1,str4.length);
 
    while (haveloss>0 && str4.length>0)
    {
      numloss1=GM_getValue('numlosses',0)+1;
      GM_setValue('numlosses', numloss1);

      haveloss=str4.indexOf("lost the fight");
      str4=str4.substr(haveloss+1,str4.length);
 
    }

/*
numwins1=GM_getValue('numwins',0)+1;
numloss1=GM_getValue('numlosses',0)+1;
 
GM_log("stats="+numwins1+"|"+numloss1);
*/


 
 }  // next innerHTML


 //GM_log("I'm getting here, reload="+reload+" naturalstop="+naturalstop);
    
// heal or not - then reload

if (naturalstop)
{
 GM_log("stopping naturally.  not a page we want to loop on!");
 GM_log("urlprefix="+urlprefix+", urlsuffix="+urlsuffix);
} 
else
{

 if (healthvalue<secondlevelheal && healthvalue>=0 && pauseflag==false && reload ) //  // if in hospital, can't hit

 {

 // GM_log("Heal then hitlist."+staminavalue+".."+hrs+":"+mins+":"+segs);

    pauseflag=true;

    url=urlprefix+
    '/hospital/do.php'+
    '?action=heal&'+
    'fb_sig_in_new_facebook=1'+
    '&fb_sig_added=1';


    if (healthvalue<firstlevelheal)

    {
    var request =  new XMLHttpRequest();
      request.open("GET", url, false);
      request.send(null);

    

    }

    var request2 =  new XMLHttpRequest();
    request2.open("GET", url, false);
    request2.send(null);

   // GM_log("I am thinking I should not be here because I was supposed to stop!");


    window.setTimeout(function()
        { window.location.href=urlprefix+urlsuffix;}, 30);


 }


 else


 if (pauseflag==false && reload)

 {
  // guess we don't need to heal so let's wait a bit and reload this..

  if (foundbounty==false && numhits==0
    && healthvalue>firstlevelheal)
   randomnumber=randomnumber+100;
    

  if (reload)
  {
 //  GM_log("I am thinking pauseflag = false and reload = true");
    window.setTimeout(function()
      { window.location='http://174.129.249.180'+urlsuffix},
      randomnumber);

  }

 }

 else

 { 

// if we got here we are not going to reload
// because we hvae a bounty or a captcha
// so play something so we know it is a problem!

 GM_setValue('samehealthcount', 0);

  
   urltocall2='http://hhh.x10hosting.com'+
    '/captcha.php?attackuser=232&playsound='+playsound;
 
    var testd = document.createElement("div");  // space for bounty and announcements at top if required

    newsectiond='<iframe id="captchaframe" src="'+
      urltocall2+
      '" style="width: 800px; height: 30px;">'+
      '</iframe><br>';

      testd.innerHTML=newsectiond;

      GM_log(newsectiond);

      document.body.insertBefore(testd,
         document.body.firstChild);
      
  } // checking what to do at end of script
}  // skip all of the enclosed if this is a natural stop