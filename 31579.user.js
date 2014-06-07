// ==UserScript==
// @name           Tibia Forum Report Comment Autofiller
// @description    Autofills the comment input when reporting posts. This only works for Senior Tutors.
// @author         Pnoexz (pnoexz@hotmail.com)
// @include        http://forum.tibia.com/forum/?action=report_post&postid=*
// @version        1
// ==/UserScript==


document.getElementsByTagName('select')[0].addEventListener('change',autoFill,false);

function autoFill() {
  var val = document.getElementsByTagName('select')[0].value;
  if (val == "STATEMENT_INSULTING") { var inp = "Please remember that offensive statements are a violation of the rule 2a."; }
  if (val == "STATEMENT_SPAMMING") { var inp = "Please remember that spamming is a violation of the rule 2b."; }
  if (val == "STATEMENT_ADVERTISING") { var inp = "Please remember that illegal advertisements are a violation of the rule 2c."; }
  if (val == "STATEMENT_CHANNEL_OFFTOPIC") { var inp = "Please remember that off-topic statements are a violation of the rule 2d."; }
  if (val == "STATEMENT_NON_ENGLISH") { var inp = "Please remember that non-English statements are a violation of the rule 2e."; }
  if (val == "STATEMENT_VIOLATION_INCITING") { var inp = "Please remember that inciting to break a rule is a violation of the rule 2f."; }
  if (val == "CHEATING_BUG_ABUSE") { var inp = "Please remember that abusing a bug is a violation of the rule 3a."; }
  if (val == "CHEATING_GAME_WEAKNESS") { var inp = "Please remember that abusing a game weakness is a violation of the rule 3b."; }
  if (val == "CHEATING_MODIFIED_CLIENT") { var inp = "Please remember that playing with a modified client is a violation of the rule 3c."; }
  if (val == "CHEATING_HACKING") { var inp = "Please remember that stealing other players' account data is a violation of the rule 3d."; }
  if (val == "CHEATING_MULTI_CLIENT") { var inp = "Please remember that the use of multi-client is a violation of the rule 3e."; }
  if (val == "CHEATING_TRADING_SHARING") { var inp = "Please remember that sharing or trading an account is a violation of the rule 3f."; }
  if (val == "GAMEMASTER_THREATENING") { var inp = "Please remember that threatening a gamemaster is a violation of the rule 4a."; }
  if (val == "GAMEMASTER_ENFORCEMENT") { var inp = "Please remember that pretending to have influence on a rule enforcer is a violation of the rule 4b."; }
  if (val == "GAMEMASTER_FALSE_REPORTS") { var inp = "Please remember that intentionally giving false reports to rule enforcers is a violation of the rule 4c."; }
  if (val == "DESTRUCTIVE_BEHAVIOUR") { var inp = ""; }

  var ainp = document.getElementsByTagName('input');
  for (var i=0;i < ainp.length;i++) { if (ainp[i].name == "comment") { ainp[i].value = inp } }
}