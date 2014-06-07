// ==UserScript==
// @name            NZ Hansard
// @namespace       kiwimp.sourceforge.net
// @description     Version 0.1: Makes NZ Hansard HTML from http://www.clerk.parliament.govt.nz/Content/Hansard/ more readable by improving formatting, adding images of MPs and adding links to related information.    Copyright 2005 Robert McKinnon (robmckinnon at users.sourceforge.net).    This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or any later version.  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details: http://www.gnu.org/licenses/gpl.txt
// @include         http://www.clerk.parliament.govt.nz/Content/Hansard/Final/FINAL_*.htm*
// @include         http://www.clerk.parliament.govt.nz/Content/Hansard/Advance/ADVANCE_*.htm*
// @include         http://uncorrectedtranscripts.clerk.govt.nz/Documents/*.htm*
// ==/UserScript==

var MarkUpHansard = {

  go: function() {
    this.changeCss();
    var mps = this.mps();
    var portfolios = this.portfolios();
    var electorates = this.electorates();
    var parties = this.parties();
    var sites = this.sites();
    var xpaths = [
      '/HTML[1]/BODY[1]//P/SPAN[@class="Name0"]',
      '/HTML[1]/BODY[1]//P/SPAN[@class="Name"]',
      '/HTML[1]/BODY[1]//P/SPAN[@class="name0"]',
      '/HTML[1]/BODY[1]//P/SPAN[@class="name"]',
      '/HTML[1]/BODY[1]//P[@class="subsquestion"]/B[1]/SPAN[1]/SPAN[@class="name"]'];

    var e;
    for (var i = 0; i < xpaths.length; i++) {
      var elements = document.evaluate(xpaths[i], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

      for (var j = 0; (e = elements.snapshotItem(j)); j++) {
        this.mark(e, mps, portfolios, electorates, parties, sites);
      }
    };
  },

  mark: function(e, mps, portfolios, electorates, parties, sites) {
    e.innerHTML = this.removeWhiteSpace(e.innerHTML);
    name = e.innerHTML;

    if (name.indexOf('(') != -1) {
      if(name.indexOf('Minister') != -1) {
        this.addMinisterialPortfolioLink(e, name, portfolios);
      } else {
        this.addElectorateLink(e, name, electorates);
        this.addPartyLink(e, name, parties, sites);
      }
    }

    if (name.indexOf('SPEAKER') != -1) {
      this.addSpeakerLink(e, name);

    } else if (name.indexOf('>:') == -1 && name.indexOf('>,') == -1 && name.indexOf('Hon Member') == -1 && name.indexOf('Government Member') == -1 && name.indexOf('Opposition Member') == -1) {
      name = this.cleanUpName(name);
      surname = name.substr(name.lastIndexOf(' ')+1);
      
      if (surname.indexOf('chairperson') == -1 && surname.indexOf('speaker') == -1) {
        this.addImageAndNameLink(mps, name, surname, e);
      } else {
        name = this.removeWhiteSpace(e.innerHTML);
        name = name.toLowerCase();
        name = name.substring(name.indexOf('(')+1, name.indexOf(')'));
        surname = name.substr(name.lastIndexOf(' ')+1);
        this.addImageAndNameLink(mps, name, surname, e);
      }
    }
  },

  addMinisterialPortfolioLink: function(e, name, portfolios) {
    for(var i = 0; i < portfolios.length; i++) {
      var portfolio = portfolios[i];
      if(name.indexOf(portfolio) != -1) {
        role = e.innerHTML.substring(e.innerHTML.indexOf('(')+1, e.innerHTML.indexOf(')'));
        page = portfolio.replace('Social Services', 'Social Development');
        page = page.replace('ori Affairs', 'Maori Affairs');
        page = page.replace('MaMaori Affairs', 'Maori Affairs');
        page = page.toLowerCase().replace("'", '').replace(',', '');
        while (page.indexOf(' ') != -1) {page = page.replace(' ', '-')};
        
        e.innerHTML = e.innerHTML.replace(role,
          '<a title="See more information about the ' + portfolio + ' Ministerial Portfolio"' +
          ' href="http://www.dpmc.govt.nz/cabinet/portfolios/'+page+'.asp">'+role+'</a>');
        break;
      }
    }
  },

  addElectorateLink: function(e, name, electorates) {
    for(var i = 0; i < electorates.length; i++) {
      var electorate = electorates[i];
      if(name.indexOf(electorate) != -1) {
        if(name.indexOf('East Coast') != -1 && name.indexOf('East Coast Bays') != -1) {
          electorate = 'East Coast Bays';
          i++;
        }
        e.innerHTML = e.innerHTML.replace(electorate,
          '<a href="http://www-ref.electionresults.org.nz/electorate-'+(i+1)+'.html" '+
          ' title="See more information about the '+electorate+' electorate">'+electorate+'</a>');
        break;
      }
    }
  },

  addPartyLink: function(e, name, parties, sites) {
    for(var i = 0; i < parties.length; i++) {
      var party = parties[i];
      if(name.indexOf(party) != -1) {
        e.innerHTML = e.innerHTML.replace(party, '<a href="'+sites[i]+'" '+
        ' title="See more information about the '+party+' party">'+party+'</a>');
        break;
      }
    }
  },

  addSpeakerLink: function(e, name) {
    if (name.indexOf('Mr DEPUTY ') != -1) {
      title = 'Mr DEPUTY';
    } else if (name.indexOf('Madam DEPUTY ') != -1) {
      title = 'Madam DEPUTY';
    } else if (name.indexOf('Mr ') != -1) {
      title = 'Mr';
    } else {
      title = 'Madam';
    }

    role = title + ' SPEAKER';
    e.innerHTML = e.innerHTML.replace(role, '<a href="http://www.speaker.parliament.govt.nz/Role.htm" '+
      ' title="See more information about the Role of Speaker">'+role+'</a>');
  },

  addImageAndNameLink: function(mps, name, surname, element) {
    name = this.removeNameTitle(name);
    data = ''+mps[name];
    split = data.indexOf(', ');
    page = data.substring(0, split);
    picture = data.substr(split+2);
    var formattedName = this.formatName(name);

    this.addNameLink(name, formattedName, page, element);
    this.addImage(formattedName, page, picture, element);
  },

  addImage: function(name, page, picture, element) {
    img = document.createElement('img');
    img.setAttribute("src", 'http://www.ps.parliament.govt.nz/gifs/mps/'+picture+'.jpg');
    img.setAttribute("class", 'portrait');
    img.setAttribute("height", '59');
    img.setAttribute("width", '49');

    a = document.createElement('a');
    a.setAttribute("href", 'http://www.ps.parliament.govt.nz/'+page);
    a.setAttribute("title", 'See more information about '+name);
    a.appendChild(img);
  
    parent = element.parentNode;
    parent.insertBefore(a, element);
  },

  addNameLink: function(name, formattedName, page, element) {
    var index = element.innerHTML.toLowerCase().indexOf(name);
    var length = name.length;

    if(index != -1) {
      person = element.innerHTML.substr(index, length);
      
      if (element.innerHTML.indexOf('Dr '+person) != -1) {
        index = index - 3;
        length = length + 3;
        person = element.innerHTML.substr(index, length);
      }
      if (element.innerHTML.indexOf('Hon '+person) != -1) {
        index = index - 4;
        length = length + 4;
        person = element.innerHTML.substr(index, length);
      }
      if (element.innerHTML.indexOf('Rt '+person) != -1) {
        index = index - 3;
        length = length + 3;
        person = element.innerHTML.substr(index, length);
      }
      element.innerHTML = element.innerHTML.replace(person,
          '<a title="See more information about ' + formattedName +
          '" href="http://www.ps.parliament.govt.nz/'+page+'">'+person+'</a>');
    }
  },

  cleanUpName: function(name) {
    name = name.toLowerCase();
    name = name.replace('<span class="spelle">','');
    name = name.replace('<span style="color: black;">','');
    name = name.replace('<span style="color: black;" lang="en-nz">', '');
      
    if (name.indexOf('(') != -1) {
      name = name.substring(0, name.indexOf('(')-1);
    }

    name = name.replace('</span>', '');
    if(name.indexOf('.') !=-1) {
      name = name.substr(name.indexOf('.')+1);
    }

    while (name.substring(0,1) == ' ') name = name.substring(1);
    while (name.substring(name.length-1, name.length) == ' ') name = name.substring(0, name.length-1);
    
    return name;
  },

  removeNameTitle: function(name) {
    if(name.indexOf('rt hon ') == 0) {
      name = name.substring('rt hon '.length);
    }
    if(name.indexOf('hon ') == 0) {
      name = name.substring('hon '.length);
    }
    if(name.indexOf('dr ') == 0) {
      name = name.substring('dr '.length);
    }
    return name;
  },

  formatName: function(unformatted_name) {
    unformatted_name = unformatted_name.replace('the hon ', '');
    names = unformatted_name.split(' ');
    name = '';
    for (var i = 0; i < names.length; i++) {
      part = names[i];
      if (part.length == 1) {
        part = part.toUpperCase();
      } else {
        part = part.substr(0,1).toUpperCase() + part.substr(1);
      }
      name = name + part + ' ';
    }
    
    name = name.substr(0, name.length-1);
    return name;
  },

  removeWhiteSpace: function(text) {
    text = text.replace('&nbsp;', ' ');
    text = text.replace('\n', ' ');
    text = text.replace('\r', ' ');
    text = text.replace('   ', ' ');
    text = text.replace('  ', ' ');
    return text;
  },

  portfolios: function() {
    var portfolios = ["ACC",
      "Agriculture",
      "Archives New Zealand",
      "Arts Culture and Heritage",
      "Attorney-General",
      "Auckland Issues",
      "Biosecurity",
      "Broadcasting",
      "Building Issues",
      "Civil Defence",
      "Climate Change",
      "Commerce",
      "Communications",
      "Community and Voluntary Sector",
      "Conservation",
      "Consumer Affairs",
      "Corrections",
      "Courts",
      "Crown Research Institutes",
      "Customs",
      "Defence",
      "Disability Issues",
      "Disarmament and Arms Control",
      "Economic Development",
      "Education",
      "Education Review Office",
      "Energy",
      "Environment",
      "Ethnic Affairs",
      "Finance",
      "Fisheries",
      "Food Safety",
      "Foreign Affairs and Trade",
      "Forestry",
      "Government Communications Security Bureau",
      "Health",
      "Housing",
      "Immigration",
      "Industry and Regional Development",
      "Information Technology",
      "Internal Affairs",
      "Justice",
      "Labour",
      "Land Information",
      "Law Commission",
      "Local Government",
      "Maori Affairs",
      "ori Affairs", // catches M?ori Affairs 
      "Ministerial Services",
      "National Library",
      "New Zealand Security Intelligence Service",
      "Pacific Island Affairs",
      "Police",
      "Prime Minister",
      "Public Trust",
      "Race Relations",
      "Racing",
      "Research, Science and Technology",
      "Revenue",
      "Rural Affairs",
      "Senior Citizens",
      "Small Business",
      "Social Development and Employment",
      "Social Services and Employment", // incorrect name?
      "Sport and Recreation",
      "State Owned Enterprises",
      "State Services",
      "Statistics",
      "Tourism",
      "Trade Negotiations",
      "Transport",
      "Transport Safety",
      "Treaty of Waitangi Negotiations",
      "Urban Affairs",
      "Veterans' Affairs",
      "Women's Affairs",
      "Youth Affairs"];
    return portfolios 
  },

  electorates: function() {
    var electorates = ["Aoraki",
      "Auckland Central",
      "Banks Peninsula",
      "Bay Of Plenty",
      "Christchurch Central",
      "Christchurch East",
      "Clevedon",
      "Clutha-Southland",
      "Coromandel",
      "Dunedin North",
      "Dunedin South",
      "East Coast",
      "East Coast Bays",
      "Epsom",
      "Hamilton East",
      "Hamilton West",
      "Helensville",
      "Hutt South",
      "Ilam",
      "Invercargill",
      "Kaikoura",
      "Mana",
      "Mangere",
      "Manukau East",
      "Manurewa",
      "Maungakiekie",
      "Mt Albert",
      "Mt Roskill",
      "Napier",
      "Nelson",
      "New Lynn",
      "New Plymouth",
      "North Shore",
      "Northcote",
      "Northland",
      "Ohariu-Belmont",
      "Otago",
      "Otaki",
      "Pakuranga",
      "Palmerston North",
      "Piako",
      "Port Waikato",
      "Rakaia",
      "Rangitikei",
      "Rimutaka",
      "Rodney",
      "Rongotai",
      "Rotorua",
      "Tamaki",
      "Taranaki-King Country",
      "Taupo",
      "Tauranga",
      "Te Atatu",
      "Tukituki",
      "Waimakariri",
      "Wairarapa",
      "Waitakere",
      "Wellington Central",
      "West Coast-Tasman",
      "Whanganui",
      "Whangarei",
      "Wigram",
      "Ikaroa-Rawhiti",
      "Tainui",
      "Tamaki Makaurau",
      "Te Tai Hauauru",
      "Te Tai Tokerau",
      "Te Tai Tonga",
      "Waiariki"];
    return electorates;
  },

  mps: function() {
    var mp = new Array();
    mp["paul adams"] = "mp154.htm, adams"
    mp["marc alexander"] = "mp155.htm, alexander"
    mp["jim anderton"] = "mp2.htm, anderton"
    mp["shane ardern"] = "mp10.htm, ardern"
    mp["larry baldock"] = "mp184.htm, baldock"
    mp["rick barker"] = "mp5.htm, barker"
    mp["tim barnett"] = "mp6.htm, barnett"
    mp["david benson-pope"] = "mp122.htm, benson-pope"
    mp["georgina beyer"] = "mp137.htm, beyer"
    mp["sue bradford"] = "mp144.htm, bradford_s"
    mp["don brash"] = "mp157.htm, brash"
    mp["peter brown"] = "mp13.htm, brown"
    mp["gerard brownlee"] = "mp14.htm, brownlee"
    mp["gerry brownlee"] = "mp14.htm, brownlee"
    mp["mark burton"] = "mp16.htm, burton"
    mp["chris carter"] = "mp139.htm, carterc"
    mp["david carter"] = "mp17.htm, carterd"
    mp["john carter"] = "mp18.htm, carterj"
    mp["brent catchpole"] = "mp158.htm, catchpole"
    mp["steve (stephanie) chadwick"] = "mp124.htm, chadwick"
    mp["steve chadwick"] = "mp124.htm, chadwick"
    mp["ashraf choudhary"] = "mp160.htm, choudhary"
    mp["helen clark"] = "mp19.htm, clark"
    mp["deborah coddington"] = "mp161.htm, coddington"
    mp["judith collins"] = "mp162.htm, collins"
    mp["brian connell"] = "mp163.htm, connell"
    mp["gordon copeland"] = "mp164.htm, copeland"
    mp["clayton cosgrove"] = "mp125.htm, cosgrove"
    mp["michael cullen"] = "mp22.htm, cullen"
    mp["david cunliffe"] = "mp126.htm, cunliffe"
    mp["lianne dalziel"] = "mp23.htm, dalziel"
    mp["rod donald"] = "mp25.htm, donald"
    mp["brian donnelly"] = "mp26.htm, donnelly"
    mp["helen duncan"] = "mp113.htm, duncan"
    mp["peter dunne"] = "mp27.htm, dunne"
    mp["harry duynhoven"] = "mp28.htm, duynhove"
    mp["ruth dyson"] = "mp29.htm, dyson"
    mp["gerrard eckhoff"] = "mp152.htm, eckhoff"
    mp["gerry eckhoff"] = "mp152.htm, eckhoff"
    mp["bill english"] = "mp32.htm, english"
    mp["ian ewen-street"] = "mp143.htm, ewenstreet"
    mp["russell fairbrother"] = "mp165.htm, fairbrother"
    mp["taito phillip field"] = "mp33.htm, field"
    mp["taito phillip hans (phillip) field"] = "mp33.htm, field"
    mp["jeanette fitzsimons"] = "mp34.htm, fitzsi"
    mp["stephen franks"] = "mp153.htm, franks"
    mp["martin gallagher"] = "mp127.htm, gallag"
    mp["phil goff"] = "mp37.htm, goff"
    mp["mark gosche"] = "mp39.htm, gosche"
    mp["sandra goudie"] = "mp166.htm, goudie"
    mp["bill gudgeon"] = "mp167.htm, gudgeon"
    mp["ann hartley"] = "mp128.htm, hartley"
    mp["george hawkins jp"] = "mp46.htm, hawkins"
    mp["phil heatley"] = "mp129.htm, heatley"
    mp["philip heatley"] = "mp129.htm, heatley"
    mp["dave hereora"] = "mp168.htm, hereora"
    mp["rodney hide"] = "mp49.htm, hide"
    mp["marian hobbs"] = "mp50.htm, hobbs"
    mp["pete hodgson"] = "mp51.htm, hodgson"
    mp["parekura horomia"] = "mp130.htm, horomia"
    mp["darren hughes"] = "mp169.htm, hughes"
    mp["paul hutchison"] = "mp138.htm, hutchison"
    mp["paul hutchison"] = "mp138.htm, hutchison"
    mp["dail jones"] = "mp170.htm, jones"
    mp["sue kedgley"] = "mp145.htm, kedgley"
    mp["john key"] = "mp171.htm, key"
    mp["annette king"] = "mp57.htm, king"
    mp["luamanuvao winnie laban"] = "mp151.htm, laban"
    mp["winnie laban"] = "mp151.htm, laban"
    mp["keith locke"] = "mp146.htm, locke"
    mp["murray mccully"] = "mp64.htm, mccully"
    mp["craig mcnair"] = "mp172.htm, mcnair"
    mp["janet mackey jp"] = "mp66.htm, mackey"
    mp["moana mackey"] = "mp186.htm, mackey_m"
    mp["steve maharey"] = "mp70.htm, maharey"
    mp["nanaia mahuta"] = "mp71.htm, mahuta"
    mp["trevor mallard"] = "mp72.htm, mallard"
    mp["wayne mapp"] = "mp73.htm, mapp"
    mp["ron mark"] = "mp74.htm, mark"
    mp["muriel newman"] = "mp81.htm, newman"
    mp["damien o'connor"] = "mp82.htm, o'connor"
    mp["bernie ogilvy"] = "mp173.htm, ogilvy"
    mp["mahara okeroa"] = "mp140.htm, okeroa"
    mp["pita paraone"] = "mp175.htm, paraone"
    mp["david parker"] = "mp174.htm, parker"
    mp["mark peck"] = "mp84.htm, peck"
    mp["edwin perry"] = "mp176.htm, perry"
    mp["edwin jock perry"] = "mp176.htm, perry"
    mp["jim peters"] = "mp177.htm, peters_j"
    mp["winston peters"] = "mp85.htm, peters"
    mp["jill pettis"] = "mp86.htm, pettis"
    mp["lynne pillay"] = "mp178.htm, pillay"
    mp["simon power"] = "mp131.htm, power"
    mp["richard prebble"] = "mp87.htm, prebble"
    mp["richard prebble cbe"] = "mp87.htm, prebble"
    mp["katherine rich"] = "mp156.htm, rich"
    mp["mita ririnui"] = "mp141.htm, ririnui"    
    mp["h v ross robertson"] = "mp90.htm, robertso"
    mp["ross robertson"] = "mp90.htm, robertso"
    mp["matt robson"] = "mp91.htm, robson"
    mp["heather roy"] = "mp179.htm, roy"
    mp["tony ryall"] = "mp93.htm, ryall"
    mp["dover samuels"] = "mp94.htm, samuels"
    mp["lynda scott"] = "mp132.htm, scott"
    mp["ken shirley"] = "mp97.htm, shirley"
    mp["clem simich"] = "mp99.htm, simich"
    mp["the hon lockwood smith"] = "mp100.htm, smithl"
    mp["murray smith"] = "mp180.htm, smith_m"
    mp["nick smith"] = "mp101.htm, smithn"
    mp["lesley soper"] = "mp188.htm, soper"
    mp["roger sowry"] = "mp102.htm, sowry"
    mp["barbara stewart"] = "mp181.htm, stewart"
    mp["jim sutton"] = "mp105.htm, sutton"
    mp["paul swain"] = "mp106.htm, swain"
    mp["john tamihere"] = "mp142.htm, tamihere"
    mp["nandor tanczos"] = "mp133.htm, tanzcos"
    mp["georgina te heuheu"] = "mp107.htm, teheuheu"
    mp["georgina te heu heu qso"] = "mp107.htm, teheuheu"
    mp["lindsay tisch"] = "mp134.htm, tisch"
    mp["judith tizard"] = "mp108.htm, tizard"
    mp["metiria turei"] = "mp182.htm, turei"
    mp["tariana turia"] = "mp109.htm, turia"
    mp["judy turner"] = "mp183.htm, turner"
    mp["kenneth wang"] = "mp187.htm, wang"
    mp["mike ward"] = "mp185.htm, ward"
    mp["maurice williamson"] = "mp114.htm, william"
    mp["margaret wilson"] = "mp149.htm, wilson"
    mp["pansy wong"] = "mp115.htm, wong"
    mp["doug woolerton"] = "mp116.htm, woolerto"
    mp["r doug woolerton"] = "mp116.htm, woolerto"
    mp["richard worth"] = "mp135.htm, worth"
    mp["dianne yates"] = "mp119.htm, yates"
    return mp
  },

  parties: function() {
    var parties = ["ACT NZ",
      "ACT",
      "Green",
      "NZ Labour",
      "Labour",
      "Maori Party",
      "NZ National",
      "National",
      "NZ First", 
      "Progressive",
      "United Future"];
    return parties;
  },

  sites: function() {
    var sites = ["http://www.act.org.nz/",
      "http://www.act.org.nz/",
      "http://www.greens.org.nz/",
      "http://www.labour.org.nz/",
      "http://www.labour.org.nz/",
      "http://www.maoriparty.com/",
      "http://www.national.org.nz/",
      "http://www.national.org.nz/",
      "http://www.nzfirst.org.nz/", 
      "http://www.progressive.org.nz/",
      "http://www.unitedfuture.org.nz/"];
    return sites;
  },

  injectCSS: function(css) {
    head = document.getElementsByTagName("head")[0];
    style = head.getElementsByTagName("style")[0];
    head.removeChild(style);
    style = document.createElement("style");
    style.setAttribute("type", 'text/css');
    style.innerHTML = css;
    head.appendChild(style);
  },

  changeCss: function() {
    this.injectCSS("body { font-size: 85%; margin: 0 10% 0 10%; }\n" +
    "table { padding: 0.5em; line-height: 1.5em; margin: 0; float: left; width: 66%; background: #F5FDEA; }\n" +
    "p     { padding: 0.5em; line-height: 1.5em; margin: 0; float: left; width: 66%; }\n" +
    "td { font-size: 80%; }\n" +
    ".Speech0 { background: #F5FDEA; margin: 1em 0 0 0; }\n" +
    ".Speech { background: #F5FDEA; margin: 1em 0 0 0; }\n" +
    ".a { background: #F5FDEA; }\n" +
    ".MsoToc1 { margin: .5em 0 0 0; padding: 0; }\n" +
    ".TOC, .MsoHyperlink, .MsoToc2, .MsoToc3, .MsoToc4, .MsoToc5, .MsoToc6, .MsoToc7, .MsoToc8, .MsoToc9 { margin: .1em 0 0 0; padding: 0; }\n" +
    ".MsoToc1, .Debate, .BillDebate, .BillDebate0, .Debatealone, .QOA { font-size: 140%; font-weight:bold; }\n" +
    ".indexdata, .billindex, .votenumber, .timedata, .nameiddata, .namedata, .indexname { display:none; }\n" +
    ".debateindex, .headingindex, .portfolio, .billeventdata, .NameIDData0, .TimeData0, .BillIndex0, .IndexData0 { display:none; }\n" +
    ".Heading0, .heading, .MarginHeading0, .marginheading, .MsoToc2, .QSubjectheadingalone, .subdebatealone, .SubDebate, .SubDebate0, .QType, .QSubjectHeading { font-size: 120%; font-weight:bold; }\n" +
    ".IndentMarginTextFollowing0, .indentmargintextfollowing { font-weight:bold; }\n" +
    ".indentmargintextfollowing, .clause-description, .clause-heading, .clause-subclause { background: #E8FDCB; }\n" +
    ".VoteReason, .VoteCount, .VoteText { background: #F5FDEA; }\n" +
    ".VoteReason { font-weight:bold; }\n" +
    ".VoteResult { background: #F5FDEA; }\n" +
    ".Interjection { background: #E8FDCB; }\n" +
    ".IndentMarginalone { background: #E8FDCB; }\n" +
    ".Intervention { background: #E8FDCB; }\n" +
    ".ContinueSpeech { background: #F5FDEA; }\n" +
    ".SubsQuestion { background: #F5FDEA; }\n" +
    ".SubsAnswer { background: #E8FDCB; }\n" +
    ".SupQuestion { background: #F5FDEA; }\n" +
    ".SupAnswer { background: #E8FDCB; }\n" +
    "img.portrait { border: none; float: left; margin: 0.3em 1em 1em 0; }\n" +
    ".BeginningOfDay0 { font-weight:bold; }\n");
  }

}

MarkUpHansard.go();
