// Na'vi'ongyu 
// version 0.1
// 2010-02-01
// Copyright (c) 2010, YomÃ¬heyu
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// expanded by 'eylan na'viyÃ¤
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Na'vi'ongyu_test
// @namespace     YomÃ¬heyu_test
// @description   replaces some words
// @include       http://forum.learnnavi.org/*
// ==/UserScript==

function navi (what,old,neww) {
    var eyaye,teylu;
    
    switch(what) {
    // really matches link -> almost clean
    case "link":    eyaye = "//a[.=\""+old+"\"]"; break;
    // if there is any button..
    case "button":  eyaye = "//input[@value=\""+old+"\"]"; break;
    // matches a lot -> carefull!
    case "text":    eyaye = "//span[contains(.,\""+old+"\")]"; break;
	
	// evtl ist fÃ¼r manche eintrÃ¤ge ein bold tag oder ein <div class="smalltext"> tag nÃ¶tig
	case "small":    eyaye = "//small[contains(.,\""+old+"\")]"; break;
	case "atable":    eyaye = "//td[contains(.,\""+old+"\")]"; break;
	case "span":    eyaye = "//span[contains(.,\""+old+"\")]"; break;
	case "div":    eyaye = "//div[contains(.,\""+old+"\")]"; break;
	
    default: return;
    }
    
    eyaye = document.evaluate(
        eyaye,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    
    for (var i = 0; i < eyaye.snapshotLength; i++) {
        teylu = eyaye.snapshotItem(i);
        
        switch(what) {
        case "link":    replace(teylu,">"+old+"<",">"+neww+"<"); break;
        case "button":  replace(teylu,"value=\""+old+"\"","value=\""+neww+"\""); break;
        case "text":    replace(teylu,old,neww); break;
        
		case "small":    replace(teylu,old,neww); break;
		case "atable":    replace(teylu,old,neww); break;
		case "span":    replace(teylu,old,neww); break;
		case "div":    replace(teylu,old,neww); break;
		}
    }
}

function replace (node,old,neww) {
    node.parentNode.innerHTML = node.parentNode.innerHTML.replace(old,neww);
}

//copy-paste-templates
//navi("","","")

//
/*
forum	        PÃ¤ngkxotseng
board		pamreltseng
childboard	'eveng lepamreltseng
topic		Txele
poll			Ã„txÃ¤le
post			tÃ¬fpe'

message		'upxare
answer		tÃ¬'eyng
news		ayfmawn

moderator	eyktan
member		tsmuk

*/

// global
////header
navi("text","Learn Na'vi Community","Olo' LÃ¬'fyayÃ¤ leNa'vi");
navi("link","Learn Na'vi Community","Olo' LÃ¬'fyayÃ¤ leNa'vi");
navi("text","Hello","KaltxÃ¬ ma");
navi("button","Search","Fwew");
navi("link","Show new replies to your posts.","mipa sÃ¬'eyngit sÃ¬pawmÃ¤ ngeyÃ¤ wÃ¬ntxu."); //"since" needed
navi("link","Show unread posts since last visit.","mipa sÃ¬pawm wÃ¬ntxu"); 
navi("text","Total time logged in:","trr nÃ¬wotx a tok fÃ¬tsengit:")
navi("text","days","a trr");
navi("text","hours","a swaw");
navi("text","minutes","a swawtsyÃ¬p");
navi("text","News","Fmawn")  //(works only partially)
////numbers --Fails...
//navi("text","1","Â°1");
//navi("text","2","Â°2");
//navi("text","3","Â°3");
//navi("text","4","Â°4");
//navi("text","5","Â°5");
//navi("text","6","Â°6");
//navi("text","7","Â°7");
//navi("text","8","Â°10");
//navi("text","9","Â°11");
//navi("text","10","Â°12");
//navi("text","11","Â°13");
//navi("text","12","Â°14");
//navi("text","13","Â°15");
//navi("text","14","Â°16");
//navi("text","15","Â°17");
//navi("text","16","Â°20");
//navi("text","17","Â°21");
//navi("text","18","Â°22");
//navi("text","19","Â°23");
//navi("text","20","Â°24");
//navi("text","21","Â°25");
//navi("text","22","Â°26");
//navi("text","23","Â°27");
//navi("text","24","Â°30");
//navi("text","25","Â°31");
//navi("text","26","Â°32");
//navi("text","27","Â°33");
//navi("text","28","Â°34");
//navi("text","29","Â°35");
//navi("text","30","Â°36");
//navi("text","31","Â°37");
//navi("text","32","Â°40");
//navi("text","33","Â°41");
//navi("text","34","Â°42");
//navi("text","35","Â°43");
//navi("text","36","Â°44");
//navi("text","37","Â°45");
//navi("text","38","Â°46");
//navi("text","39","Â°47");
//navi("text","40","Â°50");
//navi("text","41","Â°51");
//navi("text","42","Â°52");
//navi("text","43","Â°53");
//navi("text","44","Â°54");
//navi("text","45","Â°55");
//navi("text","46","Â°56");
//navi("text","47","Â°57");
//navi("text","48","Â°60");
//navi("text","49","Â°61");
//navi("text","50","Â°62");
//navi("text","51","Â°63");
//navi("text","52","Â°64");
//navi("text","53","Â°65");
//navi("text","54","Â°66");
//navi("text","55","Â°67");
//navi("text","56","Â°70");
//navi("text","57","Â°71");
//navi("text","58","Â°72");
//navi("text","59","Â°73");
////menu
navi("link","Home","Kelku");
navi("link","Help","Srung");
navi("link","Search","Fwew");
navi("link","Admin","Eyk");
navi("link","Profile","Oe");
navi("link","My Messages ","Ayupxare oeyÃ¤");//(Ay)upxare oeyÃ¤ ("news" kommt auf der seite schon oft vor)
navi("link","Calendar","TÃ¬hawl KrrÃ¤");
navi("link","Gallery","Reltseng");
navi("link","Members","Smuktu");
navi("link","Staff List","Ayeyktan");
navi("link","Logout","Hum");
////explanations
navi("atable"," Topic you have posted in"," Txele a tsengmÃ¬ ngal tÃ¬'eyngit tolÃ¬ng");
navi("atable"," Normal Topic"," Txele letrrtrr");
navi("atable"," Hot Topic (More than 25 replies)","Txele atsawl (pxevolawa tele)");
navi("atable"," Very Hot Topic (More than 50 replies)","Txele atsawl nÃ¬txan (puvomuna tele)");
navi("atable"," Locked Topic"," Txele le'i'a");
navi("atable"," Sticky Topic"," Txele leyÃ¬m");
navi("atable"," Poll"," Ã„txÃ¤le");

//home
////text
navi("atable","New Posts","mipa sÃ¬fpe'");
navi("atable","No New Posts","kea tÃ¬fpe' amip");
////tasks
navi("link","Mark ALL messages as read","Ziverok fra'upxaret na pum anawnÃ¬n" )

//board page
////general
navi("text","Child Boards","ayeveng lepamreltseng");
navi("atable","Child Boards","ayeveng lepamreltseng");
navi("small","Members and","Aysmuktu sÃ¬");
navi("small","Member and","Smuktu sÃ¬");
navi("small","Guests are viewing this board","Ayfrrtu nerÃ¬n fÃ¬pamreltseng");
navi("small","Guest are viewing this board","Frrtu nerÃ¬n fÃ¬pamreltseng");
navi("atable","Pages:","FtsengeyÃ¤ hapxÃ¬:");
navi("text","Moderators:","ayeyktan:");//not working
navi("text","Moderator:","eyktan:");//not working
////column names
navi("link","Subject","Txele");
navi("link","Started by","SngÃ¤'iyu");
navi("link","Replies","SÃ¬'eyng");
navi("link","Views","sÃ¬nÃ¬n");
navi("link","Last post ","hama tÃ¬'fpe'");
/////tasks
navi("link","Mark Read","ziverok na nawnÃ¬n");
navi("link","Notify","oer eykomum");
navi("link","Post new poll","ngop mipa Ã¤txÃ¤leti");
navi("link","Send this topic","Fpe' fÃ¬txeleti");
/////topics
navi("text","by ","ta ");
//navi("text","in ","mÃ¬ "); //too many false positives
navi("text","post","tÃ¬fpe'");
navi("text","Posts","sÃ¬fpe'");
navi("small","by ","ta ");
//navi("small","in ","mÃ¬ ");
navi("small","post","tÃ¬fpe'");
navi("small","Posts","sÃ¬fpe'");

navi("atable","Moderators:","ayeyktan:");
navi("atable","Moderator:","eyktan:");

// topic page
////tasks
//////general
navi("link","Reply","'Eyng");
navi("link","Mark unread","Zerok na ke nawnÃ¬n");
navi("link","New Topic","mipa txele");
navi("link","Print","Rel si"); //inconclusive
navi("link","Add poll","Sung Ã¤txÃ¤let");
///////own topic
navi("link","Remove Topic","Ska'a fÃ¬txeleti");
navi("link","Lock topic","fÃ¬txeleri tstu si");
////heading
navi("atable","Author","Ngopyu");
navi("atable","Topics","aytele");
navi("atable","Topic","Txele");
navi("atable","Read","NawnÃ¬n");
////bottom
navi("button","go","kÃ¤");
navi("text","Jump to","SpÃ¤ ne");
navi("link","next Â»","hay Â»");//(not working)
navi("link","Â« previous","Â« ham");//(not working) 

//Posts
navi("link","Quote","Leyn");
navi("link","Modify","Leykatem");
navi("link","Remove","Ska'a");
navi("text","Reply #","tÃ¬'eyng #");//  (does not work)
navi("text","Today","fÃ¬trr");//  (works only partially(in other positions))
//navi("text"," at "," ro ");//  (works only partially(in other positions)) // ro is only locative
navi("span","Posts:","AysÃ¬fpe':");//does not work
navi("link","Report to moderator","fpe' eyktanur");
navi("link","Logged","zawnong");
////Post Avatar
navi("div","Karma:","Meoauniaea:");//partially
navi("link","[applaud]","[irayo si]");
navi("link","[smite]","[kurakx]");
//navi("div","Online","Txen");//not working
//navi("div","Offline","Herahaw");//not working
navi("div","Posts:","SÃ¬fpe':");//partially

//Write
navi("button","Post","Fpe'");
navi("button","Preview","Fmetok");
navi("button","Save","Zong");

//board renaming
navi("link","Website-Related","Teri Olo'");
	navi("link","Website Info","TÃ¬omum Olo'Ã¤");
		//
	//
	navi("link","News","Fmawn");
	navi("text","Suggestions / Ideas","AysÃ¤fpÃ¬l");
	navi("link","Introductions","Plltxe san KaltxÃ¬");
	navi("link","Events","AysÃ¬len");	
	navi("link","Meetup","Ultxa si");
	navi("link","Classifieds","Ayuti tel fu tÃ¬ng");
navi("link","Learn Na'vi","Nume lÃ¬'fyati leNa'vi");
navi("link","Community Projects","SÃ¬kangkemvi Olo'Ã¤");
navi("link","LearnNavi Community","Olo' LÃ¬'fyayÃ¤ leNa'vi");
navi("link","International / Multilingual","Nume fa Lahea AylÃ¬'fya");
	navi("link","Beginners","AysngÃ¤'iyu");
		//
	navi("link","Intermediate","Nume nÃ¬'ul");
		//
	//Na'vi nÃ¬'aw
	navi("link","Language updates","LÃ¬'fyayÃ¤ ayfmawn teri sÃ¬latelm");
	//
	navi("link","Audio","Ayu teri pam");
	//
	navi("link","Project NgayNume","TÃ¬kangkemvi a NgayNume");
	navi("link","Na'vi Customs and Culture","Ayfya'o Na'viyÃ¤");
	navi("link","General Projects / Resources","AysÃ¬kangkemvi");
	navi("link","Learning Resources","AysÃ¤numvi");
	navi("link","Learn Na'vi (Multilingual/International)","Lahe aylÃ¬'fya");
	//language-names are from masempul.org
	navi("link","ä¸­æ–‡ (Chinese)","ä¸­æ–‡ (nÃ¬Nihongo)");
	navi("link","ÄŒesky (Czech)","ÄŒesky (nÃ¬TseskxÃ¬)");
	navi("link","Dansk (Danish)","Dansk (Danish)");//todo
	navi("link","Deutsch (German)","Deutsch (nÃ¬ToÃ¬tse)");
	navi("link","Nederlands (Dutch)","Nederlands (nÃ¬NeterlanzÃ¬)");
	navi("link","EspaÃ±ol (Spanish)","EspaÃ±ol (nÃ¬Espanyol)");
	navi("link","Esperanto (Esperanto)","Esperanto (Esperanto)");//todo
	navi("link","FranÃ§ais (French)","FranÃ§ais (nÃ¬Fransey)");
	navi("link","Magyarul (Hungarian)","Magyarul (Hungarian)");//todo
	navi("link","Italiano (Italian)","Italiano (nÃ¬Italiano)");
	navi("link","æ—¥æœ¬èªž (Japanese)","æ—¥æœ¬èªž (nÃ¬TsongWen)");
	navi("link","Polski (Polish)","Polski (nÃ¬Polskxi)");
	navi("link","PortuguÃªs (Portuguese)","PortuguÃªs (nÃ¬PortungesÃ¬)");
	navi("link","Ð ÑƒÑÑÐºÐ¸Ð¹ (Russian)","Ð ÑƒÑÑÐºÐ¸Ð¹ (nÃ¬Ruski)");
	navi("link","Suomi (Finnish)","Suomi (Finnish)");//todo
	navi("link","Svenska (Swedish)","Svenska (nÃ¬Swenskxa)");
	navi("link","TÃ¼rkÃ§e (Turkish)","TÃ¼rkÃ§e (Turkish)");//todo
	navi("link","tlhIngan Hol (Klingon)","tlhIngan Hol (Klingon)");//todo
navi("link","Avatar","UniltÃ¬rantokx");
	//
	navi("link","The Games","Ayuvan mÃ¬ eltu lefngap");
	navi("link","The Games","Ayuvan mÃ¬ eltu lefngap");
	//
//
navi("link","Off-Topic","Wrrpa txele");
	navi("link","Pictures of your Cat","ayrel ayngeyÃ¤ kÃ¤tÃ¤");
	navi("link","Spam","Sngel");

////german boards
navi("link","Vorstellungen","Plltxe KaltxÃ¬!");
navi("link","Na'vi Lernen","Nume lÃ¬'fyati leNa'vi");
navi("link","Avatar (Deutsch)","UniltÃ¬rantokx (leToitse)");
navi("link","Off-topic","Wrrpa txele");
navi("link","Roleplay","Uvan leronsem");
//navi("text","Off-topic","lahea ayu");
