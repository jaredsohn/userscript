// TD Canada Trust EasyWeb Repair - a Greasemonkey user script
//
// Version 0.2, 2007-04-28
// Copyright (c) 2007 GossamerGremlin
//
// Released under the GNU Lesser General Public License:
// http://www.gnu.org/copyleft/lesser.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and reopen this script. The Greasemonkey
// installation dialog box should appear. Click the Install button to
// accept script installation.
//
// To uninstall, use Tools -> Greasemonkey -> Manage User Scripts,
// select "TD Canada Trust EasyWeb Repair", and click Uninstall.
//
// Note that the TD Canada Trust EasyWeb site is framed with the main
// window here:
//   https://easyweb.tdcanadatrust.com/
// and the individual frames loaded from seemingly random subdomains
// currently with this pattern:
//   https://easyweb[0-9][0-9][a-z].tdcanadatrust.com/*
// As the frame and top window scripting domains are not the same,
// a user script running in the top window context cannot access the
// frames and the script must run in each frame context instead.
//
// Reporting Chronology (1-866-222-3456, option 0):
//   2007-04-26 EasyWeb staff first informed of the problem.
//   2007-05-07 EasyWeb staff, "Cleo" and "Adrian", given detailed
//              explanation of the problem and told that this script
//              will be made public if fix not soon forthcoming. 48-hour
//              callback from the Customer Care department promised with
//              assurances that information will be passed on to
//              technical staff.
//   2007-05-10 EasyWeb Support person, "Kevin Tokarz", called asking
//              for more detailed information. Emailed him details,
//              including exact code fixes required.
//   2007-05-14 Kevin Tokarz of EasyWeb responds by email, expressing
//              thanks for information sent on May 10th and saying that
//              he will pass on information to technical department and
//              respond again with results.
//   2007-05-19 Nothing from EasyWeb staff yet and no change to EasyWeb
//              website. Sent another email to Kevin Tokarz asking for
//              an update.
//   2007-05-23 Apologies from Kevin Tokarz who claims no response from
//              Web Development department. Says he will follow up with
//              them today and get back to me.
//   2007-06-01 Nothing from Kevin Tokarz yet. Sent request for update
//              and escalation of the problem to Kevin.
//   2007-06-06 Kevin Tokarz claims that he continues to receive no
//              response from technical department, has requested a
//              follow up again, and attempts to assure me that my
//              feedback will be reviewed. Warns me that there is no
//              guarantee my "feedback will be introduced in future
//              EasyWeb enhancements". I respond, pointing out that the
//              "feedback" is actually a fix for a bug that was added
//              in their last update - it is NOT an enhancement.
//   2007-06-08 Kevin Tokarz responds saying that the EasyWeb technical
//              department has finally responded. They admit to the
//              problem but try to explain it as a bug in Firefox. This
//              is not true, but it's moot since they've agreed to fix
//              the problem in EasyWeb. No timeline commitment. I've
//              responded by insisting on a timeline.
//   2007-06-13 Kevin Tokarz now claims the technical department has
//              responded. He refers to the bug fix as a "major
//              upgrade" and says it will appear in either the November
//              2007 or January 2008 EasyWeb upgrade.
//   2007-06-14 Submitted a formal request to the TD Ombudsman by email
//              to investigate the lack of action. Also emailed Kevin
//              Tokarz separately to respond to his preposterous email
//              and to let him know that a complaint was filed with the
//              TD Ombudsman.
//   2007-06-14 David M. Fisher, Ombudsman for TD, acknowledged receipt
//              of complaint. He claimed that the complaint has been
//              forwarded to the eBank Customer Experience Group and
//              that a District Vice President was to be asked to
//              review the issue.
//   2007-06-14 Quick email to David Fisher to straighten out his
//              confusion with my name (Who is Mr. Shenoy?).
//   2007-06-15 Email from Kevin Tokarz saying that Ombudsman had
//              contacted them.
//   2007-06-15 Brief email from David Fisher apologizing for name
//              confusion.
//   2007-06-20 Hardcopy letter received from Joseph Pyne, Senior
//              Manager for TD Canada Trust EasyWeb Internet Banking.
//              Letter was dated 2007-06-15, indicating little or no
//              investigation. He apologizes with minimal specificity,
//              claims they design their systems for "Browsers set at
//              the 'Default' level", and essentially reiterates that
//              they will release a fix in the "Fall of 2007".
//   2007-06-22 Since Joseph Pyne provided no email address, I sent an
//              email to David Fisher acknowledging receipt and letting
//              him know that Pyne's letter made it clear he is not
//              taking the problem seriously at all.
//   2007-06-26 Email acknowledged by David Fisher, but it is now clear
//              that this and his 2007-06-14 email are nearly identical
//              template responses.
//   2007-06-26 Second email of the day from David Fisher. Claims that
//              Mr. Panagiotis Kallias, Senior Product Analyst, TDCT
//              Electronic Channels assures him that Mr. Pyne not only
//              did complete a full investigation, but now makes the
//              preposterous claim that the bug recently introduced was
//              in fact not a recent addition. He reiterates the
//              "default level" absurdity and states that Mr. Kallias
//              claims no other customer complaints.
//   2007-06-28 My email to David Fisher pointed out the distinction
//              between the two bug locations, only the first of which
//              had been longstanding. Indicated I was not surprised by
//              the lack of other customer complaints given that it
//              took no less than 6 weeks and at least 9 phone calls
//              and emails to get EasyWeb technical staff to take a
//              preliminary look at the problem. It is clear that David
//              Fisher has no influence.
//   2007-09-10 TD Canada Trust has yet to do anything visible to fix
//              their EasyWeb bugs. Their disingenuous statements and
//              behaviours clearly demonstrate a total disregard for
//              customer concerns and a most remarkable lack of
//              technical competence. This script is now available for
//              download by all TD Canada Trust victims.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TD Canada Trust EasyWeb Repair
// @namespace     tag:GossamerGremlin,2007-04-28:Repair
// @description   Repair TD Canada Trust EasyWeb website.
// @include       https://easyweb*.tdcanadatrust.com/*
// @exclude       
// ==/UserScript==

var scriptName = "TD Canada Trust EasyWeb Repair";

// The above @include pattern is overbroad because it exposes this
// user script to potential attacks from URLs such as this:
//   https://easyweb.evil.example.com/not.tdcanadatrust.com/bad.html
// The following check eliminates such possibilities:
if (location.href.match(/^https:\/\/easyweb\d\d[a-z].tdcanadatrust.com\//))
  {
  // Visibly mark page to remind that this script is in use.
  if (document.body)
    {
    host = document.location.host;
    dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = '<div><span style="color: red">Greased by: ' +
                       scriptName + ' (' + host + ')</span></div>';
    document.body.insertBefore(dummyDiv.firstChild, document.body.firstChild);
    }
  unsafeWindow.navigator.__defineGetter__("cookieEnabled", canStoreCookieFixed);
  }
  
// canStoreCookieFixed()
//   TD's version relies on navigator.cookieEnabled, which is not set
//   if customer has cookie manager, even when cookies are allowed for
//   EasyWeb. The only reliable check for enabled cookies is to actually
//   test if session cookie settings succeed, as done in this function
//   replacement.
function canStoreCookieFixed()
  {
  var testSessionCookie ="testSessionCookie=Enabled";
  document.cookie = testSessionCookie;
  return (document.cookie.indexOf(testSessionCookie) != -1);
  }
