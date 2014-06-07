// ==UserScript==
// @name           TBG DeAnonymizer
// @namespace      TBG
// @description    Visa namn pa anon
// @include        http://www.tbg.nu/news_show/*
// ==/UserScript==



window.addEventListener(
    'load', 
    function() { window.resizeTo( 800,800 ); },
    true);

var allParas = document.getElementsByTagName("td");

var state = 0;
var curURL;
var TableCellLinks;
var TableCellFonts;
var curIPKey;

for (var i = 0; i < allParas.length; i++)
{
  
  switch (state)
  {
      case 0:
        if (allParas[i].innerHTML.substring(0,9) == "Anonymous") 
        {
          TBGSavePostIdIpKeyMap(TBGPostURLToPostId(document.URL), TBGKetIPKeyFromInnerHTML(allParas[i].innerHTML));
          allParas[i].innerHTML = TBGFormatUserName(allParas[i].innerHTML);

          

        }

        if (allParas[i].innerHTML.substring(0,7) == "<b>INFO")
        {
                  state = 1;
        }
        break;
      case 1:
        TableCellLinks = allParas[i].getElementsByTagName("a");
        if (TableCellLinks.length > 0) 
        {
          curURL = TableCellLinks[0].href;
        }

        TableCellFonts = allParas[i].getElementsByTagName("font");
        if (TableCellFonts.length > 0) 
        {
          if (TableCellFonts[0].innerHTML == "Anonymous")
          {
                    curIPKey = TBGPostIdToIPKey(TBGPostURLToPostId(curURL));
                    if (curIPKey != null)
                      TableCellFonts[0].innerHTML = TBGIpKeyToName(curIPKey);
          }
        }

        break;
  }
}



////////////////////////////////////////////////////////

function TBGFormatUserName (TDInnerHtml)
{
  
  return (TBGIpKeyToName(TBGKetIPKeyFromInnerHTML(TDInnerHtml)));
}

function TBGKetIPKeyFromInnerHTML (TDInnerHtml)
{
// in: Anonymous <212.85.*.*>
// ut: 212.85
  var num1start = TDInnerHtml.indexOf("&lt;")+4;
  var num1end = TDInnerHtml.indexOf(".");

  var num2end = TDInnerHtml.indexOf(".",num1end+1 );

  return (TDInnerHtml.substring(num1start,num2end));

}

function TBGPostURLToPostId (url)
{
  //in: http://www.tbg.nu/news_show/147773/122
  //ut: 147773_122
  var parts = url.split("/");

  if (parts[parts.length-1] == "")
  {
    return (parts[parts.length-3] + "_" + parts[parts.length-2]);
  }
  else
  { 
    return (parts[parts.length-2] + "_" + parts[parts.length-1]);
  }
}


function TBGSavePostIdIpKeyMap (PostId, IPKey)
{
  GM_setValue(PostId, IPKey);
}

function TBGPostIdToIPKey(PostId)
{
  //in: 147773/115
  //ut: 212.85
  return(GM_getValue(PostId));
}


function TBGIpKeyToName (IPKey)
{
//in: 212.85
//ut: Karl-Flens
  return ("&lt;"+TBGIntToName(TBGIPKeyToInt(IPKey,0)) + "-" + TBGIntToName(TBGIPKeyToInt(IPKey,1)) + "&gt;");
}

function TBGIPKeyToInt(IPKey, partNumber)
{
  //in: 212.85
  //ut: 212 eller 85, beroende på partNumber
  return IPKey.split(".")[partNumber];
}


function TBGIntToName (Num)
{
  switch(Num)
  {
case '0': return('Lucas');
case '1': return('Oscar');
case '2': return('William');
case '3': return('Elias');
case '4': return('Hugo');
case '5': return('Alexander');
case '6': return('Erik');
case '7': return('Isak');
case '8': return('Filip');
case '9': return('Emil');
case '10': return('Viktor');
case '11': return('Oliver');
case '12': return('Liam');
case '13': return('Anton');
case '14': return('Axel');
case '15': return('Leo');
case '16': return('Gustav');
case '17': return('Albin');
case '18': return('Edvin');
case '19': return('Simon');
case '20': return('Noah');
case '21': return('Ludvig');
case '22': return('Melvin');
case '23': return('Theo');
case '24': return('Max');
case '25': return('Linus');
case '26': return('Arvid');
case '27': return('Viggo');
case '28': return('Vincent');
case '29': return('Jonathan');
case '30': return('Alvin');
case '31': return('Adam');
case '32': return('Kevin');
case '33': return('Elliot');
case '34': return('Wilmer');
case '35': return('Felix');
case '36': return('Olle');
case '37': return('Jakob');
case '38': return('Rasmus');
case '39': return('Carl');
case '40': return('David');
case '41': return('Gabriel');
case '42': return('Benjamin');
case '43': return('Sebastian');
case '44': return('Casper');
case '45': return('Nils');
case '46': return('Alfred');
case '47': return('Leon');
case '48': return('Theodor');
case '49': return('Hampus');
case '50': return('Ville');
case '51': return('Noel');
case '52': return('Samuel');
case '53': return('Malte');
case '54': return('Joel');
case '55': return('Melker');
case '56': return('Alex');
case '57': return('Adrian');
case '58': return('Marcus');
case '59': return('Sixten');
case '60': return('Neo');
case '61': return('Charlie');
case '62': return('Tim');
case '63': return('Josef');
case '64': return('Jack');
case '65': return('Daniel');
case '66': return('Robin');
case '67': return('Mohammed');
case '68': return('M&aring;ns');
case '69': return('Wilhelm');
case '70': return('Valter');
case '71': return('Vilgot');
case '72': return('Love');
case '73': return('Maximilian');
case '74': return('Fabian');
case '75': return('Sigge');
case '76': return('Hannes');
case '77': return('Milton');
case '78': return('Vidar');
case '79': return('Elis');
case '80': return('Otto');
case '81': return('Mattias');
case '82': return('Johan');
case '83': return('John');
case '84': return('August');
case '85': return('Jesper');
case '86': return('Milo');
case '87': return('Aron');
case '88': return('Loke');
case '89': return('Dennis');
case '90': return('Martin');
case '91': return('Svante');
case '92': return('Sam');
case '93': return('Pontus');
case '94': return('Hjalmar');
case '95': return('Ali');
case '96': return('Johannes');
case '97': return('Harry');
case '98': return('Christoffer');
case '99': return('Eddie');
case '100': return('Maja');
case '101': return('Emma');
case '102': return('Julia');
case '103': return('Ella');
case '104': return('Elsa');
case '105': return('Alice');
case '106': return('Alva');
case '107': return('Linnea');
case '108': return('Wilma');
case '109': return('Klara');
case '110': return('Nellie');
case '111': return('Ida');
case '112': return('Elin');
case '113': return('Ebba');
case '114': return('Amanda');
case '115': return('Isabelle');
case '116': return('Agnes');
case '117': return('Molly');
case '118': return('Hanna');
case '119': return('Emilia');
case '120': return('Moa');
case '121': return('Olivia');
case '122': return('Sara');
case '123': return('Ellen');
case '124': return('Nova');
case '125': return('Saga');
case '126': return('Felicia');
case '127': return('Matilda');
case '128': return('Alma');
case '129': return('Alicia');
case '130': return('Tuva');
case '131': return('Tindra');
case '132': return('Isabella');
case '133': return('Elvira');
case '134': return('Thea');
case '135': return('Nathalie');
case '136': return('Lovisa');
case '137': return('Nora');
case '138': return('Filippa');
case '139': return('Emelie');
case '140': return('Freja');
case '141': return('Tyra');
case '142': return('Tilde');
case '143': return('Stella');
case '144': return('Tilda');
case '145': return('Selma');
case '146': return('Lova');
case '147': return('Astrid');
case '148': return('Vera');
case '149': return('Sofia');
case '150': return('Ester');
case '151': return('Lilly');
case '152': return('Meja');
case '153': return('Siri');
case '154': return('Lea');
case '155': return('Signe');
case '156': return('Stina');
case '157': return('Cornelia');
case '158': return('Jasmine');
case '159': return('Frida');
case '160': return('Linn');
case '161': return('Lisa');
case '162': return('Mira');
case '163': return('Emmy');
case '164': return('Engla');
case '165': return('Evelina');
case '166': return('Rebecka');
case '167': return('Josefine');
case '168': return('Liv');
case '169': return('Inez');
case '170': return('Ronja');
case '171': return('Anna');
case '172': return('Ingrid');
case '173': return('Hilda');
case '174': return('Edith');
case '175': return('Elina');
case '176': return('Kajsa');
case '177': return('Leia');
case '178': return('Lina');
case '179': return('Svea');
case '180': return('Fanny');
case '181': return('Iris');
case '182': return('Victoria');
case '183': return('Miranda');
case '184': return('Sofie');
case '185': return('M&auml;rta');
case '186': return('Melissa');
case '187': return('Johanna');
case '188': return('Hedda');
case '189': return('Joline');
case '190': return('Annie');
case '191': return('Alexandra');
case '192': return('Elise');
case '193': return('Irma');
case '194': return('Livia');
case '195': return('Ellie');
case '196': return('Maria');
case '197': return('Majken');
case '198': return('Vendela');
case '199': return('Jennifer');
case '200': return('Ebbe');
case '201': return('Donald');
case '202': return('Eliard');
case '203': return('Elov');
case '204': return('Gert');
case '205': return('Stj&auml;rt');
case '206': return('Neger');
case '207': return('Greger');
case '208': return('Flens');
case '209': return('Seth');
case '210': return('Roy');
case '211': return('Osama');
case '212': return('Sonny');
case '213': return('Ronny');
case '214': return('Conny');
case '215': return('Kenny');
case '216': return('R&ouml;v');
case '217': return('Snorre');
case '218': return('Orvar');
case '219': return('Apa');
case '220': return('Ove');
case '221': return('Knacker');
case '222': return('B&ouml;g');
case '223': return('Paki');
case '224': return('Detector');
case '225': return('Block');
case '226': return('Cock');
case '227': return('Piggie');
case '228': return('Stan');
case '229': return('Kyle');
case '230': return('Sport');
case '231': return('Runk');
case '232': return('As');
case '233': return('Ingvar');
case '234': return('Sport');
case '235': return('Snobb');
case '236': return('Dank');
case '237': return('Hat');
case '238': return('S&ouml;ren');
case '239': return('Korv');
case '240': return('Stek');
case '241': return('K&ouml;tt');
case '242': return('Fisk');
case '243': return('&auml;gg');
case '244': return('Potatis');
case '245': return('Mj&ouml;l');
case '246': return('Br&ouml;d');
case '247': return('Sm&ouml;r');
case '248': return('Gr&auml;dde');
case '249': return('Salt');
case '250': return('Peppar');
case '251': return('Lax');
case '252': return('Torsk');
case '253': return('Str&ouml;mming');
case '254': return('Kabel');
case '255': return('Jumper');



    default: return(Num); break;
  }
}

