// ==UserScript==
// @name          BuGil_Hider_v1xx
// @namespace     http://userscripts.org/scripts/show/128596
// @description   Block thread bule gila di Computer Stuff, versi 1.xx
// @include       http://www.kaskus.us/forumdisplay.php?*
// @include       http://www.kaskus.com/forumdisplay.php?*
// @include       http://www.kaskus.co.id/forumdisplay.php?*
// @include       http://livebeta.kaskus.co.id/forum*
// @version       1.1.71
// @author        Boule, the ultimate junker nubitol
// ==/UserScript==
var whit = new Array();
var patB = new Array();
var patS = new Array();

//--------- whit Section ---------
whit[0]=/\[ask\]/gi;
whit[1]=/\[help\]/gi;
whit[2]=/\[share\]/gi;
whit[3]=/\Sticky:/gi;
whit[4]=/Manager League - Online Footbal Manager/gi;
whit[5]=/Blue HTV Online/gi;
whit[6]=/IHSG news Update/gi;
whit[7]=/Western Digital bayar/;
whit[8]=/Carona/;
whit[9]=/Unboxing and Review/;
whit[10]=/Komputer Kecil \$25/;
whit[11]=/Membuat TV online \/ streaming sendiri/;
whit[12]=/Mencari Uang Dengan Mudah !! sampai \$3000\/Bulan !!/;
whit[13]=/Agan2 yang mengerti bahasa program game online server side masuk dunk/;
whit[14]=/VSAT ipstar/;
whit[15]=/AllMyTube for Mac/;
whit[16]=/WD MYBOOK WORLD VS WD MYBOOK LIVE/;
whit[17]=/The Great Merchant Online [Maho Will Live Forever]/;
whit[18]=/core 2 quad vs core i3/;
whit[19]=/Aplikasi harga emas antam online/;
whit[20]=/michaelyanpetra/;
whit[21]=/Microsoft Dynamics AX Community/gi;
whit[22]=/12 Stones \[Official Thread\]/gi;
//--------- patB Section ---------
patB[0]=/live/gi;
patB[1]=/watch/gi;
patB[2]=/vs/gi;
patB[3]=/online/gi;
patB[4]=/soccer/gi;
patB[5]=/golf/gi;
patB[6]=/boxing/gi;
patB[7]=/champions/gi;
patB[8]=/league/gi;
patB[9]=/discount/gi;
patB[10]=/cheap/gi;
patB[11]=/sopcast/gi;
patB[12]=/american/gi;
patB[13]=/prescription/gi;
patB[14]=/viagra/gi;
patB[15]=/purse/gi;
patB[16]=/chanel/gi;
patB[17]=/stream/gi;
patB[18]=/cup/gi;
patB[19]=/preview/gi;
patB[20]=/federer/gi;
patB[21]=/del potro/gi;
patB[22]=/broadcasting/gi;
patB[23]=/gatorade/gi;
patB[24]=/daytona/gi;
patB[25]=/kartenlegen/gi;
patB[26]=/w@tch/gi;
patB[27]=/enjoy/gi;
patB[28]=/formula 1/gi;
patB[29]=/grand prix/gi;
patB[30]=/ncaa/gi;
patB[31]=/basketball tv/gi;
patB[32]=/handbags/gi;
patB[33]=/@/gi;
patB[34]=/tv feed/gi;
patB[35]=/hd quality/gi;
patB[36]=/episode/gi;
patB[37]=/regarder/gi;
patB[38]=/racing/gi;
patB[39]=/guarda/gi;
patB[40]=/campione/gi;
patB[41]=/philad/gi;
patB[42]=/blogspot.com/gi;
patB[43]=/nolvadex/gi;
patB[44]=/hurricanes/gi;
patB[45]=/premiership/gi;
patB[46]=/pc tv/gi;
patB[47]=/pc hd/gi;
patB[48]=/500/gi;
patB[49]=/hd tv/gi;
patB[50]=/ebook on/gi;
patB[51]=/kindle/gi;
patB[52]=/nba/gi;
patB[53]=/ice hockey/gi;
patB[54]=/nhl/gi;
patB[55]=/of origin/gi;
patB[56]=/regarder/gi;
patB[57]=/ en /gi;
patB[58]=/pctv/gi;
patB[59]=/rugby/gi;
patB[60]=/the ultimate fighter/gi;
patB[61]=/euro 2012/gi;
patB[62]=/tv link/gi;
patB[63]=/vission/gi;
//--------- patS Section ---------
patS[0]=/\$\d/gi;
patS[1]=/w~a~t~c~h/gi;
patS[2]=/e~n~j~o~y/gi;
patS[3]=/{UTV}/gi;
patS[4]=/online video/gi;
patS[5]=/TV!!PC/gi;
patS[6]=/cigaret/gi;
patS[7]=/tobacco/gi;
patS[8]=/dunhill/gi;
patS[9]=/kent /gi;
patS[10]=/lucky strike/gi;
patS[11]=/pall mall/gi;
patS[12]=/apollo soyuz/gi;
patS[13]=/benson/gi;
patS[14]=/bond street/gi;
patS[15]=/cambridge/gi;
patS[16]=/caro /gi;
patS[17]=/chesterfield/gi;
patS[18]=/kazakstan/gi;
patS[19]=/klubowe/gi;
patS[20]=/l&m/gi;
patS[21]=/lark /gi;
patS[22]=/longbeach/gi;
patS[23]=/marlboro/gi;
patS[24]=/merit/gi;
patS[25]=/multifilter/gi;
patS[26]=/muratti/gi;
patS[27]=/parliament/gi;
patS[28]=/peter jackson/gi;
patS[29]=/petra/gi;
patS[30]=/philip morris/gi;
patS[31]=/polyot/gi;
patS[32]=/vatra/gi;
patS[33]=/virginia slims/gi;
patS[34]=/ear candle/gi;
patS[35]=/kindle book/gi;
patS[36]=/soccer tv!!/gi;
patS[37]=/hd tv\^\^\^/gi;
patS[38]=/dvd iphho santosa/gi;
patS[39]=/dvd tung desem waringin/gi;
patS[40]=/dvd bong/gi;
patS[41]=/%%~Click~%%/gi;
patS[42]=/500@@2012/;
patS[43]=/International Friendly Football/;
patS[44]=/toyar matha/gi;
patS[45]=/lion tv/gi;
patS[46]=/tv fox/gi;
patS[47]=/hello lover/gi;
patS[48]=/padtype\(tm\)/gi;
patS[49]=/sunbritetv/gi;
patS[50]=/hurricanes vs crusaders/gi;
patS[51]=/el clasico/gi;
patS[52]=/ufc 145/gi;
patS[53]=/hd tv link/gi;
patS[54]=/en vivo/gi;
patS[55]=/burberry/gi;
patS[56]=/bondhu/gi;
patS[57]=/nascar/gi;
patS[58]=/register.php/gi;
patS[59]=/polsat/gi;
patS[60]=/best sex dating/gi;
patS[61]=/discount dvd/gi;
patS[62]=/results 2012/gi;
patS[63]=/shuihcuissc/gi;
patS[64]=/unlock iphone to/gi;
patS[65]=/unlock iphone 3g for/gi;
patS[66]=/match is very interesting and enjoyable/gi;
patS[67]=/extreme rules 2012/gi;
patS[68]=/paulie malignaggi/gi;
patS[69]=/watch the Avengers 2012/gi;
patS[70]=/nhl playoff/gi;
patS[71]=/chalon-sur-saone/gi;
patS[72]=/manchester city v/gi;
patS[73]=/so you think you can dance review:/gi;
patS[74]=/finpecia/gi;
patS[75]=/broadcast on your pc tv/gi;
patS[76]=/kermit, miss piggy/gi;
patS[77]=/primetime emmy awards/gi;
patS[78]=/how do you bypass windows/gi;
patS[79]=/valencia vs osasuna/gi;
patS[80]=/rlialsm xvi/gi;
patS[81]=/host new reality show/gi;
patS[82]=/birmingham v blackpool live/gi;
patS[83]=/blackpool v birmingham live/gi;
patS[84]=/the whole picture less expensive:/gi;
patS[85]=/spear, ountslje/gi;
patS[86]=/hbo.ppv/gi;
patS[87]=/ekhon ei site/gi;
patS[88]=/royal challengers bangalore/gi;
patS[89]=/heibles/gi;
patS[90]=/\$\$\$\$/gi;
patS[91]=/live tv=/gi;
patS[92]=/serie a \d/gi;
patS[93]=/atletico/gi;
patS[94]=/bilbao/gi;
patS[95]=/gratis ice hockey/gi;
patS[96]=/stream gratis/gi;
patS[97]=/milon/gi;
patS[98]=/Child Custody Hurdles for Fathers/gi;
patS[99]=/viver livre/gi;
patS[100]=/making money online/gi;
patS[101]=/parfaiteavezonc/gi;
patS[102]=/washington vs ny/gi;
patS[103]=/soccer madness/gi;
patS[104]=/make money online now/gi;
patS[105]=/the bleesing of computer/gi;
patS[106]=/business advice that you can count on/gi;
patS[107]=/sell cvv good all country/gi;
patS[108]=/katso suomi/gi;
patS[109]=/new csm desktop/gi;
patS[109]=/nfl/gi;
patS[110]=/coding 24 hours/gi;
patS[111]=/fight live/gi;
patS[112]=/carl froch/gi;
patS[113]=/pacquiao/gi;
patS[114]=/ao vivo/gi;
//--------- end  Section ---------

var blokirs = document.getElementsByTagName("a");
var foundStat = 0;

for (i=0; i<blokirs.length; i++)
{
  foundStat = 0;

  for (j=0; j<whit.length; j++)
  {
    if (blokirs[i].innerHTML.match(whit[j]) != null)
    {
      foundStat++;

      if (foundStat == 1)
      {
        break;
      }
    }
  }
  if (foundStat == 1)
  {
    continue;
  }

  foundStat = 0;

  for (j=0; j<patB.length; j++)
  {
    if (blokirs[i].innerHTML.match(patB[j]) != null)
    {
      foundStat++;

      if (foundStat >= 2)
      {
        blokirs[i].innerHTML = "-";
        break;
      }
    }
  }
  if (foundStat >= 2)
  {
    continue;
  }

  for (j=0; j<patS.length; j++)
  {
    if (blokirs[i].innerHTML.match(patS[j]) != null)
    {
      blokirs[i].innerHTML = "-";
      foundStat = 1;
      break;
    }
  }

}