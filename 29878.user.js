const SUpE_META=<><![CDATA[
// ==UserScript==
// @name        SelfUpdaterExample
// @shortname   SUpE
// @namespace   tag:GasBuddyPhilly@yahoo.com,2008-05:monkey
// @description Template for constructing self-updating user scripts.
// @released    2008/11/21 14:08:56
// @frequency   10 hours
// @releaseURL  http://userscripts.org/scripts/show/99999999
// @scriptURL   http://userscripts.org/scripts/source/29878.user.js
// @releaseURL  http://userscripts.org/scripts/source/29878.meta.js
// @scriptURL   http://userscripts.org/scripts/source/29878.user.js
// @releaseURL  http://userscripts.org/scripts/review/29878?format=txt
// @scriptURL   http://userscripts.org/scripts/source/29878.user.js
// @releaseURL  http://userscripts.org/scripts/source/29878.user.js?
// @scriptURL   http://userscripts.org/scripts/source/29878.user.js
// @include     *
// ==/UserScript==
]]></>.toString();

/*-=-=-=- Documentation

This script does nothing on its own - except keep itself updated!

This script is intended as a template; if you follow these instructions,
 and include the code from this script in your own scripts, your scripts
 will periodically (at an interval configured by the user, or, if not
 configured, specified as a default within the script) connect to one or
 more predefined locations, looking for more recent versions of itself;
 and, if one is found, it will offer to redirect the user to the new
 version's location, thereby triggering the standard Greasemonkey script
 installer.

The design goals for this were to create a self-updater routine that:
- works in Firefox 3.
- is more compact and less complex than the "User Script Updates" script
 at <http://userscripts.org/scripts/show/2296>.  (I'm not sure I
 succeeded on that second point, but this script is half the size of
 that one - and half of this one is this documentation!)
- is self-contained, i.e., doesn't require the installation of a second
 script to get the updating functionality. 
- leverages the existing method of specifying script metadata, as
 opposed to requiring that such data be duplicated in a JavaScript
 object.

I suggest you place this code in your script before any of your own code
 (other than setup statements for delayed actions, such as
 addEventListener() calls), because, for the most part, this script
 spends most of its time waiting for responses - either from the
 Internet, or from the user.  This way, the waiting time can be used by
 your script to do what it normally does, with minimal impact to the
 overall page load time.

//-=-=- Metadata

At the top of this script are the normal Greasemonkey ==UserScript==
 declarations, along with some new lines exclusive to this script.  In
 addition, the entire section is wrapped within a null XML tag, the
 contents of which are assigned (using E4X) to the SUpE_META constant.
 This is the trick that makes the metadata visible to the script;
 otherwise, these lines would be ignored at run time, like any other
 comments.  You must include these wrapper lines above and below your
 own script's metadata for this code to work.  (I thank Anthony
 Lieuallen and Johan Sundström for this bit of JavaScript wizardry.)
 When the script is run, the contents of this constant are parsed for
 the relevant keywords, which are:

@shortname - contains an abbreviated version of this script's name; used
 in the User Script Commands menu to distinguish the commands for this
 script from those of others that may also be running, without unduly
 increasing the menu's width.  Ideally, this should be no more than
 three or four characters; if it's not present, the full @name will be
 used.

@released - contains a full or partial date/time representing the
 release date of the currently running version of this script.
 ("Version numbers" are not used because parsing them would add
 complexity.)  The date can be in any format the Date object
 understands.  (Of course, you should change this to the release date
 for YOUR script.)

@frequency - contains the default interval at which the script should
 check for updates.  If more than this amount of time has passed since
 the last invocation of this script, the update check is triggered.  The
 format for this field is a positive integer, followed by whitespace,
 followed by one of "minute", "minutes", "hour", "hours", "day", "days",
 "week", "weeks", "month", or "months" (case insensitive).  The user may
 specify a different interval, either at the first invocation, or by
 selecting "Set Update Interval" from the User Script Commands.

@releaseURL and @scriptURL - normally only one of each would be
 specified, but the script provides for downloading from alternate
 locations, in case the primary location is unavailable.  The number of
 @releaseURLs specified should always be the same as the number of
 @scriptURLs.  The script will NOT cycle thru these; the second set, if
 present, will only be tried if the first one fails.  The script also
 assumes that if @releaseURL is valid, the corresponding @scriptURL will
 be, too.  (Again, you should change these to point to your own script's
 URLs.)

@releaseURL - specifies a location in which to look for update
 information for this script.  It can be a pointer to the script itself
 (in which case @scriptURL would be identical), but need not be; this is
 to allow for testing the currency of a script without inflating its
 download count, and without wasting time and bandwidth downloading the
 entirety of the script.  Any file allowing for text in the
 ==UserScript== format will do for this purpose - and the only
 information required in this file is the @released line.  If this is
 not found in the file, the update check will move on to the next URL
 pair; if there are no more pairs, it'll inform the user that it was
 unable to do the update check, and offer to let the user change the
 update interval.

@scriptURL - specifies a location at which the latest version of this
 script can be found.  If the corresponding @releaseURL shows that a
 newer version is available, this is where it will be downloaded from
 (if the user allows it).

All of these keywords are referenced only within the script itself, so
 they can be changed to anything you want, as long as all references to
 them are changed accordingly; however, they were chosen to avoid
 conflicts with other unofficial keywords already known to be used, so
 this should not be necessary.

The script expects all of these keywords, plus @name, to be present in
 the ==UserScript== block, and does little or no sanity checking on them
 (to keep it small and fast), so double check all of these entries
 before publishing your script.

//-=-=- Script Outline

The script code is largely uncommented, to make it easier to copy into
 your script, so a step by step explanation is provided here instead.

The first thing the script does is create string constants for the text
 used in menu items and dialog boxes; these can be translated into your
 preferred language, if desired.  (The end of the group for which l10n
 is encouraged is clearly marked.)

Next, the script parses the SUpE_META data, as explained above; then it
 adds two commands to the Greasemonkey menu ("Check For Update Now" and
 "Set Update Interval"), and looks for its configuration settings
 (SUpE_LastUpdateCheck and SUpE_UpdateFrequency).  If
 SUpE_LastUpdateCheck is missing or invalid, it'll assume that an update
 check is due immediately; if SUpE_UpdateFrequency is missing or
 invalid, it'll assume that this is the first time running the script,
 and prompt the user to either accept the script's interval, or enter a
 different one.

After this, it adds SUpE_UpdateFrequency to SUpE_LastUpdateCheck, and if
 the resulting point in time has already passed, it ends by calling the
 function that initiates the automatic update check - the same function
 called when the user manually requests a check.  (Note that since
 Internet data fetching must be done asynchronously within Greasemonkey,
 all further code must be contained within the check function - or, more
 specifically, within the callback function that's run when a data fetch
 is completed.)

If an update is called for (either manually or automatically), the first
 thing the update routine does is reset the update clock, so that other
 pages using this script that are loaded while the check is in progress
 don't attempt to do their own checks simultaneously.  Then, it passes
 control to the same routine that is used as the callback function when
 a fetch is (successfully or unsuccessfully) completed.

The remainder of the code is essentially self-documented, in that it
 carefully tests the response (if any) received from each URL request,
 and extensively logs those tests to the Error Console.

Finally, once the outcome of the update check is known (either "found
 newer", "found but not newer", or "not found"), the update variables
 are reset, just in case the user calls for another update check
 manually, before leaving this same page.

To avoid name collisions, the self-updater code is encapsulated in the
 SUpE_SelfUpdater function.  The only other names visible outside of
 this function are the SUpE_META constant created above, and the
 SUpE_LastUpdateCheck and SUpE_UpdateFrequency parameters (but
 Greasemonkey automatically prepends the @namespace and @name values to
 these before storing them, so name collisions here are almost
 impossible).

*/

//-=-=-=- Code (copy everything below this point into your script)
SUpE_SelfUpdater();
//Self-updater function is copyright <GasBuddyPhilly@yahoo.com>,
// located at <http://userscripts.org/scripts/show/29878>,
// and licensed under <http://gnu.org/licenses/gpl-3.0.html>,
// incorporated herein by reference.
function SUpE_SelfUpdater()
{//localizable strings
 const CKNOW='Check Now For ';
 const UPDTE=' Update';
 const SETTT='Set ';
 const UPIVL=' Update Interval';
 const ITAPP='It appears this is the first time you\'ve used\n'+
  'the ';
 const ISDES=' script.\n'+
  'This script is designed to automatically\n'+
  'check for updates every ';
 const CHIVL='.\n'+
  'Would you like to change this interval?'
 const HWLNG='How long would you like the ';
 const WAITB='\n'+
  'script to wait between update checks?\n'+
  'Enter an interval such as "12 hours" or "1 week".';
 const DIDNT='I didn\'t understand that.\n\n';
 const UPIN4='The update interval for the ';
 const REMAI='\n'+
  'script remains set at ';
 const UMAYS='.  You may\n'+
  'select "';
 const FRMTH='" from the\n'+
  '"User Script Commands..." menu at any time\n'+
  'to change this.';
 const THRIS='There is an update available for the\n';
 const GRSCR=' Greasemonkey script.';
 const INSIT='\n'+
  'Would you like to install it?';
 const UWILB='You will be reminded about this update again\n'+
  'in ';
 const THRNO='There is no update available for the\n';
 const SELFU='The self-updater for the ';
 const WASUN='\n'+
  'script was unable to locate any valid update\n'+
  'information.  This could mean that this\n'+
  'computer has lost its Internet connection, or\n'+
  'that the original site for this script has gone\n'+
  'down, moved, or disappeared.\n\n'+
  'This script will check again in '
 //l10n not recommended
 const S_LU='SUpE_LastUpdateCheck';
 const S_UF='SUpE_UpdateFrequency';
 const INVDT='Invalid Date';

 var parms=parseParms(SUpE_META);
 if(!parms.shortname)
 {parms.shortname=parms.name;
 };
 GM_registerMenuCommand
 (SETTT+parms.shortname+UPIVL,
  function()
  {GM_setValue(S_UF,askUF(parms,GM_getValue(S_UF)));
  }
 );
 GM_registerMenuCommand
 (CKNOW+parms.shortname+UPDTE,
  function()
  {parms.m=true;
   doUpCk();
  }
 );
 var LU=new Date(GM_getValue(S_LU,''));
 if(LU.toString()==INVDT)
 {LU=new Date(0);
  GM_setValue(S_LU,LU.toString());
 };
 var UF=GM_getValue(S_UF,'');
 if(!toMillis(UF))
 {if(!confirm(ITAPP+parms.name+ISDES+parms.frequency+CHIVL))
  {UF=parms.frequency;
   GM_setValue(S_UF,UF);
   alert(UPIN4+parms.name+REMAI+UF+UMAYS+SETTT+parms.shortname+UPIVL+
    FRMTH);
  }else
  {UF=askUF(parms,parms.frequency);
   GM_setValue(S_UF,UF);
  };
 };
 if(Number(new Date(LU))+toMillis(UF)<=new Date())
 {doUpCk();
 };
 function doUpCk()
 {LU=new Date();
  GM_setValue(S_LU,LU.toString());
  doXHRs();
 };
 function doXHRs(xhr)
 {var lyn,dte;
  GM_log('pass '+parms.i);
  if(!xhr)
  {GM_log('no response to look at - moving on');
   nextXHR(parms);
  }else
  {GM_log('response received');
   if(!xhr.status)
   {GM_log('no status found in response - moving on');
    nextXHR(parms);
   }else
   {GM_log('status code of "'+xhr.status+'" received');
    if(xhr.status!=200)
    {GM_log('error status received - moving on');
     nextXHR(parms);
    }else
    {GM_log('successful status received');
     if(!xhr.responseText)
     {GM_log('no response text received - moving on');
      nextXHR(parms);
     }else
     {GM_log(xhr.responseText.length+
       ' characters of response text received');
      lyn=xhr.responseText.
       match(/\/\/ \@released\s+([^\r\n<]+)\s*[\r\n<]/);
      if(!lyn||!lyn[1])
      {GM_log('no release date in response text - moving on');
       nextXHR(parms);
      }else
      {dte=new Date(lyn[1]);
       if(dte.toString()==INVDT)
       {GM_log('release date uninterpretable - moving on');
        nextXHR(parms);
       }else
       {GM_log('release date of "'+dte.toString()+
         '" found in response');
        GM_log('comparing to installed release - "'+
         parms.released.toString()+'"');
        if(parms.released<dte)
        {GM_log('release found is newer - '+
         'getting new release from '+parms.scriptURLs[parms.i-1]);
         if(confirm(THRIS+parms.name+GRSCR+INSIT))
         {GM_openInTab(parms.scriptURLs[parms.i-1]);
         }else
         {alert(UWILB+UF+UMAYS+SETTT+parms.shortname+UPIVL+FRMTH);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        }else
        {GM_log('release found is not newer - ending update check');
         if(parms.m)
         {alert(THRNO+parms.name+GRSCR);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        };//end if(parms.released<dte)
       };//end if(dte.toString()==INVDT)
      };//end if(!lyn||!lyn[1])
     };//end if(!xhr.responseText)
    };//end if(xhr.status!=200)
   };//end if(!xhr.status)
  };//end if(!xhr)
 };//end doXHRs()
 function nextXHR(pms)
 {if(pms.releaseURLs[pms.i])
  {GM_log('update check #'+(pms.i+1)+' - checking '+
    pms.releaseURLs[pms.i]);
   GM_xmlhttpRequest
   ({method:            'GET',
     url:               pms.releaseURLs[pms.i],
     headers:
     {'Cache-Control':  'no-cache',
      'Pragma':         'no-cache'
     },
     onerror:           doXHRs,
     onload:            doXHRs
    }
   );
   pms.i++;
  }else
  {GM_log('ran out of places to look for updates');
   if(confirm(SELFU+pms.name+WASUN+UF+CHIVL))
   {UF=askUF(pms,UF);
    GM_setValue(S_UF,UF);
   };
   //reset for next time (if any)
   pms.i=0;
   pms.m=false;
  };
 };

 //subroutines
 function parseParms(metaBlock)
 {var metalines=metaBlock.match(/^\/\/ \@\S+\s+.+$/gm);
  var metaparms=new ParmPack;
  var lineparts,i;
  for(i=0;i<metalines.length;i++)
  {lineparts=metalines[i].match(/^\/\/ \@(\S+)\s+(.+)$/);
   switch(lineparts[1])
   {case 'name':
    case 'shortname':
     metaparms[lineparts[1]]=lineparts[2];
     break;
    case 'released':
     metaparms[lineparts[1]]=new Date(lineparts[2]);
     break;
    case 'frequency':
     if(toMillis(lineparts[2]))
     {metaparms[lineparts[1]]=lineparts[2];
     };
     break;
    case 'releaseURL':
    case 'scriptURL':
     metaparms[lineparts[1]+'s'].push(lineparts[2]);
     break;
   };
  };
  return metaparms;
 };
 function toMillis(lyne)
 {if(!lyne)
  {return null;
  };
  var wurds=lyne.split(/\s+/);
  if(wurds.length!=2)
  {return null;
  };
  switch(wurds[1].toLowerCase())
  {case 'months':
   case 'month':
    wurds[0]*=4.4;//close enough
   case 'weeks':
   case 'week':
    wurds[0]*=7;
   case 'days':
   case 'day':
    wurds[0]*=24;
   case 'hours':
   case 'hour':
    wurds[0]*=60;
   case 'minutes':
   case 'minute':
    return wurds[0]*60*1000;
   default:
    return null;
  };
 };
 function askUF(pms,was)
 {var x=prompt(HWLNG+pms.name+WAITB,was);
  if(x==null)
  {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
    FRMTH);
   return was;
  }else
  {while(!toMillis(x))
   {x=prompt(DIDNT+HWLNG+pms.name+WAITB,was);
    if(x==null)
    {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
      FRMTH);
     return was;
    };
   };
   return x;
  };
 };

 //constructor
 function ParmPack()
 {this.name=null;
  this.shortname=null;
  this.released=null;
  this.frequency=null;
  this.releaseURLs=[];
  this.scriptURLs=[];
  this.i=0;
  this.m=false;
 };
};
