// ==UserScript==
// @name           Travian Culture Points Administrator
// @namespace      travian cp admin
// @description    Suggests which building should you build next, if you want to boost your CPs (price/performance calculated)
// @include        *travian.com/*
// ==/UserScript==

var culturePointsLine = new Array();
culturePointsLine[0]="Marketplace";
culturePointsLine[1]="Main";
culturePointsLine[2]="Academy";
culturePointsLine[3]="Embassy";
culturePointsLine[4]="Main";
culturePointsLine[5]="Stable";
culturePointsLine[6]="Earth";
culturePointsLine[7]="Warehouse";
culturePointsLine[8]="Rally";
culturePointsLine[9]="Blacksmith";
culturePointsLine[10]="Armoury";
culturePointsLine[11]="Granary";
culturePointsLine[12]="Workshop";
culturePointsLine[13]="Main";
culturePointsLine[14]="Academy";
culturePointsLine[15]="Embassy";
culturePointsLine[16]="Marketplace";
culturePointsLine[17]="Town";
culturePointsLine[18]="Barracks";
culturePointsLine[19]="Marketplace";
culturePointsLine[20]="Residence";
culturePointsLine[21]="Academy";
culturePointsLine[22]="Embassy";
culturePointsLine[23]="Academy";
culturePointsLine[24]="Main";
culturePointsLine[25]="Treasury";
culturePointsLine[26]="Stable";
culturePointsLine[27]="Embassy";
culturePointsLine[28]="Marketplace";
culturePointsLine[29]="Main";
culturePointsLine[30]="Academy";
culturePointsLine[31]="Embassy";
culturePointsLine[32]="Main";
culturePointsLine[33]="Tradeoffice";
culturePointsLine[34]="Armoury";
culturePointsLine[35]="Blacksmith";
culturePointsLine[36]="Marketplace";
culturePointsLine[37]="Earth";
culturePointsLine[38]="Main";
culturePointsLine[39]="Warehouse";
culturePointsLine[40]="Embassy";
culturePointsLine[41]="Marketplace";
culturePointsLine[42]="Rally";
culturePointsLine[43]="Embassy";
culturePointsLine[44]="Main";
culturePointsLine[45]="Embassy";
culturePointsLine[46]="Main";
culturePointsLine[47]="Academy";
culturePointsLine[48]="Main";
culturePointsLine[49]="Embassy";
culturePointsLine[50]="Marketplace";
culturePointsLine[51]="Main";
culturePointsLine[52]="Embassy";
culturePointsLine[53]="Academy";
culturePointsLine[54]="Marketplace";
culturePointsLine[55]="Academy";
culturePointsLine[56]="Marketplace";
culturePointsLine[57]="Embassy";
culturePointsLine[58]="Embassy";
culturePointsLine[59]="Marketplace";
culturePointsLine[60]="Academy";
culturePointsLine[61]="Residence";
culturePointsLine[62]="Embassy";
culturePointsLine[63]="Barracks";
culturePointsLine[64]="Academy";
culturePointsLine[65]="Hero's";
culturePointsLine[66]="Stable";
culturePointsLine[67]="Embassy";
culturePointsLine[68]="Stable";
culturePointsLine[69]="Earth";
culturePointsLine[70]="Warehouse";
culturePointsLine[71]="Rally";
culturePointsLine[72]="Blacksmith";
culturePointsLine[73]="Armoury";
culturePointsLine[74]="Blacksmith";
culturePointsLine[75]="Armoury";
culturePointsLine[76]="Stable";
culturePointsLine[77]="Earth";
culturePointsLine[78]="Stable";
culturePointsLine[79]="Warehouse";
culturePointsLine[80]="Workshop";
culturePointsLine[81]="Granary";
culturePointsLine[82]="Rally";
culturePointsLine[83]="Earth";
culturePointsLine[84]="Stable";
culturePointsLine[85]="Warehouse";
culturePointsLine[86]="Town";
culturePointsLine[87]="Blacksmith";
culturePointsLine[88]="Armoury";
culturePointsLine[89]="Granary";
culturePointsLine[90]="Workshop";
culturePointsLine[91]="Rally";
culturePointsLine[92]="Blacksmith";
culturePointsLine[93]="Armoury";
culturePointsLine[94]="Stable";
culturePointsLine[95]="Barracks";
culturePointsLine[96]="Armoury";
culturePointsLine[97]="Blacksmith";
culturePointsLine[98]="Stable";
culturePointsLine[99]="Earth";
culturePointsLine[100]="Residence";
culturePointsLine[101]="Granary";
culturePointsLine[102]="Workshop";
culturePointsLine[103]="Warehouse";
culturePointsLine[104]="Residence";
culturePointsLine[105]="Earth";
culturePointsLine[106]="Rally";
culturePointsLine[107]="Stable";
culturePointsLine[108]="Stable";
culturePointsLine[109]="Armoury";
culturePointsLine[110]="Blacksmith";
culturePointsLine[111]="Warehouse";
culturePointsLine[112]="Rally";
culturePointsLine[113]="Tournament";
culturePointsLine[114]="Town";
culturePointsLine[115]="Treasury";
culturePointsLine[116]="Armoury";
culturePointsLine[117]="Blacksmith";
culturePointsLine[118]="Stable";
culturePointsLine[119]="Town";
culturePointsLine[120]="Granary";
culturePointsLine[121]="Workshop";
culturePointsLine[122]="Blacksmith";
culturePointsLine[123]="Armoury";
culturePointsLine[124]="Barracks";
culturePointsLine[125]="Town";
culturePointsLine[126]="Earth";
culturePointsLine[127]="Blacksmith";
culturePointsLine[128]="Armoury";
culturePointsLine[129]="Treasury";
culturePointsLine[130]="Workshop";
culturePointsLine[131]="Granary";
culturePointsLine[132]="Barracks";
culturePointsLine[133]="Warehouse";
culturePointsLine[134]="Hero's";
culturePointsLine[135]="Earth";
culturePointsLine[136]="Rally";
culturePointsLine[137]="Armoury";
culturePointsLine[138]="Blacksmith";
culturePointsLine[139]="Residence";
culturePointsLine[140]="Warehouse";
culturePointsLine[141]="Town";
culturePointsLine[142]="Rally";
culturePointsLine[143]="Residence";
culturePointsLine[144]="Treasury";
culturePointsLine[145]="Treasury";
culturePointsLine[146]="Town";
culturePointsLine[147]="Workshop";
culturePointsLine[148]="Granary";
culturePointsLine[149]="Residence";
culturePointsLine[150]="Tradeoffice";
culturePointsLine[151]="Barracks";
culturePointsLine[152]="Tradeoffice";
culturePointsLine[153]="Treasury";
culturePointsLine[154]="Granary";
culturePointsLine[155]="Workshop";
culturePointsLine[156]="Barracks";
culturePointsLine[157]="Town";
culturePointsLine[158]="Residence";
culturePointsLine[159]="Granary";
culturePointsLine[160]="Workshop";
culturePointsLine[161]="Town";
culturePointsLine[162]="Residence";
culturePointsLine[163]="Granary";
culturePointsLine[164]="Workshop";
culturePointsLine[165]="Town";
culturePointsLine[166]="Town";
culturePointsLine[167]="Residence";
culturePointsLine[168]="Tradeoffice";
culturePointsLine[169]="Residence";
culturePointsLine[170]="Barracks";
culturePointsLine[171]="Town";
culturePointsLine[172]="Residence";
culturePointsLine[173]="Barracks";
culturePointsLine[174]="Town";
culturePointsLine[175]="Town";
culturePointsLine[176]="Tradeoffice";
culturePointsLine[177]="Tradeoffice";
culturePointsLine[178]="Tournament";
culturePointsLine[179]="Hero's";
culturePointsLine[180]="Tradeoffice";
culturePointsLine[181]="Tradeoffice";
culturePointsLine[182]="Tradeoffice";
culturePointsLine[183]="Tradeoffice";
culturePointsLine[184]="Hero's";
culturePointsLine[185]="Hero's";
culturePointsLine[186]="Hero's";
culturePointsLine[187]="Tournament";
culturePointsLine[188]="Hero's";
culturePointsLine[189]="Tournament";
culturePointsLine[190]="Tournament";
culturePointsLine[191]="Hero's";
culturePointsLine[192]="Hero's";
culturePointsLine[193]="Tournament";
culturePointsLine[194]="Tournament";
culturePointsLine[195]="Hero's";
culturePointsLine[196]="Tournament";
culturePointsLine[197]="Hero's";
culturePointsLine[198]="Tournament";
culturePointsLine[199]="Tournament";


var culturePointsWord = new Array();
culturePointsWord[0]="Marketplace";
culturePointsWord[1]="Main Building";
culturePointsWord[2]="Academy";
culturePointsWord[3]="Embassy";
culturePointsWord[4]="Main Building";
culturePointsWord[5]="Stable";
culturePointsWord[6]="Earth Wall";
culturePointsWord[7]="Warehouse";
culturePointsWord[8]="Rally Point";
culturePointsWord[9]="Blacksmith";
culturePointsWord[10]="Armoury";
culturePointsWord[11]="Granary";
culturePointsWord[12]="Workshop";
culturePointsWord[13]="Main Building";
culturePointsWord[14]="Academy";
culturePointsWord[15]="Embassy";
culturePointsWord[16]="Marketplace";
culturePointsWord[17]="Town Hall";
culturePointsWord[18]="Barracks";
culturePointsWord[19]="Marketplace";
culturePointsWord[20]="Residence";
culturePointsWord[21]="Academy";
culturePointsWord[22]="Embassy";
culturePointsWord[23]="Academy";
culturePointsWord[24]="Main Building";
culturePointsWord[25]="Treasury";
culturePointsWord[26]="Stable";
culturePointsWord[27]="Embassy";
culturePointsWord[28]="Marketplace";
culturePointsWord[29]="Main Building";
culturePointsWord[30]="Academy";
culturePointsWord[31]="Embassy";
culturePointsWord[32]="Main Building";
culturePointsWord[33]="Tradeoffice";
culturePointsWord[34]="Armoury";
culturePointsWord[35]="Blacksmith";
culturePointsWord[36]="Marketplace";
culturePointsWord[37]="Earth Wall";
culturePointsWord[38]="Main Building";
culturePointsWord[39]="Warehouse";
culturePointsWord[40]="Embassy";
culturePointsWord[41]="Marketplace";
culturePointsWord[42]="Rally Point";
culturePointsWord[43]="Embassy";
culturePointsWord[44]="Main Building";
culturePointsWord[45]="Embassy";
culturePointsWord[46]="Main Building";
culturePointsWord[47]="Academy";
culturePointsWord[48]="Main Building";
culturePointsWord[49]="Embassy";
culturePointsWord[50]="Marketplace";
culturePointsWord[51]="Main Building";
culturePointsWord[52]="Embassy";
culturePointsWord[53]="Academy";
culturePointsWord[54]="Marketplace";
culturePointsWord[55]="Academy";
culturePointsWord[56]="Marketplace";
culturePointsWord[57]="Embassy";
culturePointsWord[58]="Embassy";
culturePointsWord[59]="Marketplace";
culturePointsWord[60]="Academy";
culturePointsWord[61]="Residence";
culturePointsWord[62]="Embassy";
culturePointsWord[63]="Barracks";
culturePointsWord[64]="Academy";
culturePointsWord[65]="Hero's";
culturePointsWord[66]="Stable";
culturePointsWord[67]="Embassy";
culturePointsWord[68]="Stable";
culturePointsWord[69]="Earth Wall";
culturePointsWord[70]="Warehouse";
culturePointsWord[71]="Rally Point";
culturePointsWord[72]="Blacksmith";
culturePointsWord[73]="Armoury";
culturePointsWord[74]="Blacksmith";
culturePointsWord[75]="Armoury";
culturePointsWord[76]="Stable";
culturePointsWord[77]="Earth Wall";
culturePointsWord[78]="Stable";
culturePointsWord[79]="Warehouse";
culturePointsWord[80]="Workshop";
culturePointsWord[81]="Granary";
culturePointsWord[82]="Rally Point";
culturePointsWord[83]="Earth Wall";
culturePointsWord[84]="Stable";
culturePointsWord[85]="Warehouse";
culturePointsWord[86]="Town Hall";
culturePointsWord[87]="Blacksmith";
culturePointsWord[88]="Armoury";
culturePointsWord[89]="Granary";
culturePointsWord[90]="Workshop";
culturePointsWord[91]="Rally Point";
culturePointsWord[92]="Blacksmith";
culturePointsWord[93]="Armoury";
culturePointsWord[94]="Stable";
culturePointsWord[95]="Barracks";
culturePointsWord[96]="Armoury";
culturePointsWord[97]="Blacksmith";
culturePointsWord[98]="Stable";
culturePointsWord[99]="Earth Wall";
culturePointsWord[100]="Residence";
culturePointsWord[101]="Granary";
culturePointsWord[102]="Workshop";
culturePointsWord[103]="Warehouse";
culturePointsWord[104]="Residence";
culturePointsWord[105]="Earth Wall";
culturePointsWord[106]="Rally Point";
culturePointsWord[107]="Stable";
culturePointsWord[108]="Stable";
culturePointsWord[109]="Armoury";
culturePointsWord[110]="Blacksmith";
culturePointsWord[111]="Warehouse";
culturePointsWord[112]="Rally Point";
culturePointsWord[113]="Tournament";
culturePointsWord[114]="Town Hall";
culturePointsWord[115]="Treasury";
culturePointsWord[116]="Armoury";
culturePointsWord[117]="Blacksmith";
culturePointsWord[118]="Stable";
culturePointsWord[119]="Town Hall";
culturePointsWord[120]="Granary";
culturePointsWord[121]="Workshop";
culturePointsWord[122]="Blacksmith";
culturePointsWord[123]="Armoury";
culturePointsWord[124]="Barracks";
culturePointsWord[125]="Town Hall";
culturePointsWord[126]="Earth Wall";
culturePointsWord[127]="Blacksmith";
culturePointsWord[128]="Armoury";
culturePointsWord[129]="Treasury";
culturePointsWord[130]="Workshop";
culturePointsWord[131]="Granary";
culturePointsWord[132]="Barracks";
culturePointsWord[133]="Warehouse";
culturePointsWord[134]="Hero's";
culturePointsWord[135]="Earth Wall";
culturePointsWord[136]="Rally Point";
culturePointsWord[137]="Armoury";
culturePointsWord[138]="Blacksmith";
culturePointsWord[139]="Residence";
culturePointsWord[140]="Warehouse";
culturePointsWord[141]="Town Hall";
culturePointsWord[142]="Rally Point";
culturePointsWord[143]="Residence";
culturePointsWord[144]="Treasury";
culturePointsWord[145]="Treasury";
culturePointsWord[146]="Town Hall";
culturePointsWord[147]="Workshop";
culturePointsWord[148]="Granary";
culturePointsWord[149]="Residence";
culturePointsWord[150]="Tradeoffice";
culturePointsWord[151]="Barracks";
culturePointsWord[152]="Tradeoffice";
culturePointsWord[153]="Treasury";
culturePointsWord[154]="Granary";
culturePointsWord[155]="Workshop";
culturePointsWord[156]="Barracks";
culturePointsWord[157]="Town Hall";
culturePointsWord[158]="Residence";
culturePointsWord[159]="Granary";
culturePointsWord[160]="Workshop";
culturePointsWord[161]="Town Hall";
culturePointsWord[162]="Residence";
culturePointsWord[163]="Granary";
culturePointsWord[164]="Workshop";
culturePointsWord[165]="Town Hall";
culturePointsWord[166]="Town Hall";
culturePointsWord[167]="Residence";
culturePointsWord[168]="Tradeoffice";
culturePointsWord[169]="Residence";
culturePointsWord[170]="Barracks";
culturePointsWord[171]="Town Hall";
culturePointsWord[172]="Residence";
culturePointsWord[173]="Barracks";
culturePointsWord[174]="Town Hall";
culturePointsWord[175]="Town Hall";
culturePointsWord[176]="Tradeoffice";
culturePointsWord[177]="Tradeoffice";
culturePointsWord[178]="Tournament";
culturePointsWord[179]="Hero's";
culturePointsWord[180]="Tradeoffice";
culturePointsWord[181]="Tradeoffice";
culturePointsWord[182]="Tradeoffice";
culturePointsWord[183]="Tradeoffice";
culturePointsWord[184]="Hero's";
culturePointsWord[185]="Hero's";
culturePointsWord[186]="Hero's";
culturePointsWord[187]="Tournament";
culturePointsWord[188]="Hero's";
culturePointsWord[189]="Tournament";
culturePointsWord[190]="Tournament";
culturePointsWord[191]="Hero's";
culturePointsWord[192]="Hero's";
culturePointsWord[193]="Tournament";
culturePointsWord[194]="Tournament";
culturePointsWord[195]="Hero's";
culturePointsWord[196]="Tournament";
culturePointsWord[197]="Hero's";
culturePointsWord[198]="Tournament";
culturePointsWord[199]="Tournament";


var culturePointsLevel = new Array();
culturePointsLevel[0]=1;
culturePointsLevel[1]=1;
culturePointsLevel[2]=1;
culturePointsLevel[3]=1;
culturePointsLevel[4]=2;
culturePointsLevel[5]=1;
culturePointsLevel[6]=1;
culturePointsLevel[7]=1;
culturePointsLevel[8]=1;
culturePointsLevel[9]=1;
culturePointsLevel[10]=1;
culturePointsLevel[11]=1;
culturePointsLevel[12]=1;
culturePointsLevel[13]=8;
culturePointsLevel[14]=2;
culturePointsLevel[15]=2;
culturePointsLevel[16]=6;
culturePointsLevel[17]=1;
culturePointsLevel[18]=1;
culturePointsLevel[19]=7;
culturePointsLevel[20]=1;
culturePointsLevel[21]=5;
culturePointsLevel[22]=5;
culturePointsLevel[23]=6;
culturePointsLevel[24]=11;
culturePointsLevel[25]=1;
culturePointsLevel[26]=2;
culturePointsLevel[27]=6;
culturePointsLevel[28]=10;
culturePointsLevel[29]=12;
culturePointsLevel[30]=9;
culturePointsLevel[31]=9;
culturePointsLevel[32]=14;
culturePointsLevel[33]=1;
culturePointsLevel[34]=2;
culturePointsLevel[35]=2;
culturePointsLevel[36]=12;
culturePointsLevel[37]=3;
culturePointsLevel[38]=15;
culturePointsLevel[39]=3;
culturePointsLevel[40]=10;
culturePointsLevel[41]=14;
culturePointsLevel[42]=3;
culturePointsLevel[43]=11;
culturePointsLevel[44]=16;
culturePointsLevel[45]=12;
culturePointsLevel[46]=18;
culturePointsLevel[47]=15;
culturePointsLevel[48]=19;
culturePointsLevel[49]=13;
culturePointsLevel[50]=17;
culturePointsLevel[51]=20;
culturePointsLevel[52]=15;
culturePointsLevel[53]=16;
culturePointsLevel[54]=18;
culturePointsLevel[55]=17;
culturePointsLevel[56]=19;
culturePointsLevel[57]=16;
culturePointsLevel[58]=17;
culturePointsLevel[59]=20;
culturePointsLevel[60]=19;
culturePointsLevel[61]=2;
culturePointsLevel[62]=19;
culturePointsLevel[63]=3;
culturePointsLevel[64]=20;
culturePointsLevel[65]=1;
culturePointsLevel[66]=5;
culturePointsLevel[67]=20;
culturePointsLevel[68]=8;
culturePointsLevel[69]=7;
culturePointsLevel[70]=7;
culturePointsLevel[71]=7;
culturePointsLevel[72]=5;
culturePointsLevel[73]=5;
culturePointsLevel[74]=8;
culturePointsLevel[75]=8;
culturePointsLevel[76]=11;
culturePointsLevel[77]=12;
culturePointsLevel[78]=12;
culturePointsLevel[79]=12;
culturePointsLevel[80]=6;
culturePointsLevel[81]=6;
culturePointsLevel[82]=12;
culturePointsLevel[83]=13;
culturePointsLevel[84]=14;
culturePointsLevel[85]=13;
culturePointsLevel[86]=3;
culturePointsLevel[87]=11;
culturePointsLevel[88]=11;
culturePointsLevel[89]=7;
culturePointsLevel[90]=7;
culturePointsLevel[91]=13;
culturePointsLevel[92]=12;
culturePointsLevel[93]=12;
culturePointsLevel[94]=15;
culturePointsLevel[95]=7;
culturePointsLevel[96]=14;
culturePointsLevel[97]=14;
culturePointsLevel[98]=16;
culturePointsLevel[99]=14;
culturePointsLevel[100]=5;
culturePointsLevel[101]=10;
culturePointsLevel[102]=10;
culturePointsLevel[103]=14;
culturePointsLevel[104]=8;
culturePointsLevel[105]=18;
culturePointsLevel[106]=14;
culturePointsLevel[107]=18;
culturePointsLevel[108]=19;
culturePointsLevel[109]=15;
culturePointsLevel[110]=15;
culturePointsLevel[111]=18;
culturePointsLevel[112]=18;
culturePointsLevel[113]=1;
culturePointsLevel[114]=6;
culturePointsLevel[115]=2;
culturePointsLevel[116]=16;
culturePointsLevel[117]=16;
culturePointsLevel[118]=20;
culturePointsLevel[119]=7;
culturePointsLevel[120]=12;
culturePointsLevel[121]=12;
culturePointsLevel[122]=18;
culturePointsLevel[123]=18;
culturePointsLevel[124]=12;
culturePointsLevel[125]=9;
culturePointsLevel[126]=19;
culturePointsLevel[127]=19;
culturePointsLevel[128]=19;
culturePointsLevel[129]=4;
culturePointsLevel[130]=14;
culturePointsLevel[131]=14;
culturePointsLevel[132]=13;
culturePointsLevel[133]=19;
culturePointsLevel[134]=3;
culturePointsLevel[135]=20;
culturePointsLevel[136]=19;
culturePointsLevel[137]=20;
culturePointsLevel[138]=20;
culturePointsLevel[139]=11;
culturePointsLevel[140]=20;
culturePointsLevel[141]=10;
culturePointsLevel[142]=20;
culturePointsLevel[143]=12;
culturePointsLevel[144]=6;
culturePointsLevel[145]=7;
culturePointsLevel[146]=12;
culturePointsLevel[147]=17;
culturePointsLevel[148]=17;
culturePointsLevel[149]=14;
culturePointsLevel[150]=6;
culturePointsLevel[151]=14;
culturePointsLevel[152]=7;
culturePointsLevel[153]=10;
culturePointsLevel[154]=18;
culturePointsLevel[155]=18;
culturePointsLevel[156]=18;
culturePointsLevel[157]=14;
culturePointsLevel[158]=15;
culturePointsLevel[159]=19;
culturePointsLevel[160]=19;
culturePointsLevel[161]=15;
culturePointsLevel[162]=16;
culturePointsLevel[163]=20;
culturePointsLevel[164]=20;
culturePointsLevel[165]=16;
culturePointsLevel[166]=17;
culturePointsLevel[167]=18;
culturePointsLevel[168]=10;
culturePointsLevel[169]=19;
culturePointsLevel[170]=19;
culturePointsLevel[171]=18;
culturePointsLevel[172]=20;
culturePointsLevel[173]=20;
culturePointsLevel[174]=19;
culturePointsLevel[175]=20;
culturePointsLevel[176]=12;
culturePointsLevel[177]=14;
culturePointsLevel[178]=3;
culturePointsLevel[179]=7;
culturePointsLevel[180]=17;
culturePointsLevel[181]=18;
culturePointsLevel[182]=19;
culturePointsLevel[183]=20;
culturePointsLevel[184]=10;
culturePointsLevel[185]=12;
culturePointsLevel[186]=13;
culturePointsLevel[187]=7;
culturePointsLevel[188]=14;
culturePointsLevel[189]=12;
culturePointsLevel[190]=13;
culturePointsLevel[191]=17;
culturePointsLevel[192]=18;
culturePointsLevel[193]=14;
culturePointsLevel[194]=18;
culturePointsLevel[195]=19;
culturePointsLevel[196]=17;
culturePointsLevel[197]=20;
culturePointsLevel[198]=19;
culturePointsLevel[199]=20;
//
var Step = 0;
var StepNext = 1;
var StepPrevious = 0;
//
var previousStepStorage = document.createElement("input");
previousStepStorage.type = "HIDDEN";
previousStepStorage.setAttribute("id", "RHQCC9B");
previousStepStorage.value = 0;
//
function mainFunct()
{
   var divwindow = document.createElement("div");
   var divtext1 = document.createElement("div");
   var divtext2 = document.createElement("div");
   var divtext3 = document.createElement("div");
   var map = document.getElementsByName('map2')[0];
   var tajtliTokenz = map.getElementsByTagName("AREA")[0].title.split(" ");
   if (tajtliTokenz[0] == "Palisade	")
   {
      culturePointsLine[6]="Palisade	";
      culturePointsLine[37]="Palisade	";
      culturePointsLine[69]="Palisade	";
      culturePointsLine[77]="Palisade	";
      culturePointsLine[83]="Palisade	";
      culturePointsLine[99]="Palisade	";
      culturePointsLine[105]="Palisade	";
      culturePointsLine[126]="Palisade	";
      culturePointsLine[135]="Palisade	";
      
      culturePointsWord[6]="Palisade";
      culturePointsWord[37]="Palisade";
      culturePointsWord[69]="Palisade";
      culturePointsWord[77]="Palisade";
      culturePointsWord[83]="Palisade";
      culturePointsWord[99]="Palisade";
      culturePointsWord[105]="Palisade";
      culturePointsWord[126]="Palisade";
      culturePointsWord[135]="Palisade";
   }
   if (tajtliTokenz[0] == "City")
   {
      culturePointsLine[6]="City";
      culturePointsLine[37]="City";
      culturePointsLine[69]="City";
      culturePointsLine[77]="City";
      culturePointsLine[83]="City";
      culturePointsLine[99]="City";
      culturePointsLine[105]="City";
      culturePointsLine[126]="City";
      culturePointsLine[135]="City";
      
      culturePointsWord[6]="City Wall";
      culturePointsWord[37]="City Wall";
      culturePointsWord[69]="City Wall";
      culturePointsWord[77]="City Wall";
      culturePointsWord[83]="City Wall";
      culturePointsWord[99]="City Wall";
      culturePointsWord[105]="City Wall";
      culturePointsWord[126]="City Wall";
      culturePointsWord[135]="City Wall";
   }
   divwindow.id = 'CPadmin';
   divwindow.style.padding = '5px';
   divwindow.style.width = "290px";
   divwindow.style.height = "40px";
   divwindow.style.border = '1px solid #aaa';
   divwindow.style.position = 'absolute';
   divwindow.style.background = '#bce';
   divwindow.style.top = "600px";
   divwindow.style.fontSize="8pt";
   divwindow.style.left = "150px";
   //
   Step = getStep(0);
   StepNext = Step;
   StepPrevious = Step-1;
   //
   divtext1.innerHTML='<p style="color:#567;margin:0px;font-weight:600">Culture points administrator</p>';
   divtext2.id = "CPadminContent";
   divtext2.innerHTML = Step + ": <b>" + culturePointsWord[Step] + "</b> level " + culturePointsLevel[Step]
   divtext3.id = "CPadminPrevNext";
   divtext2.style.fontSize = "10pt";
   //
   var nextLink = document.createElement("a");
   nextLink.setAttribute('style', "color:#234;margin:0px;font-weight:600;cursor: pointer; cursor: hand;");
   nextLink.setAttribute('onClick', "CP_next();");
   var nextText = document.createTextNode(' next =>');
   nextLink.appendChild(nextText);
   //
   var prevLink = document.createElement("a");
   prevLink.setAttribute('id', 'kvajeno');
   prevLink.setAttribute('style', "color:#678;margin:0px;font-weight:600;");
   var prevText = document.createTextNode('<= previous ');
   prevLink.appendChild(prevText);
   var text = document.createTextNode(' || ');
   //
   divtext3.appendChild(prevLink);
   divtext3.appendChild(text);
   divtext3.appendChild(nextLink);
   divwindow.appendChild(divtext1);
   divwindow.appendChild(divtext2);
   divwindow.appendChild(divtext3);
   document.body.appendChild(divwindow);
}
//
unsafeWindow.CP_next = function()
{
   var text = document.getElementById('CPadminContent');
   document.getElementById("kvajeno").setAttribute('onClick', "CP_prev(" + StepNext + ");");
   StepNext = getStep(StepNext+1)
   text.innerHTML = StepNext + ": <b>" + culturePointsWord[StepNext] + "</b> level " + culturePointsLevel[StepNext]
   document.getElementById("kvajeno").setAttribute('style', "color:#234;margin:0px;font-weight:600;cursor: pointer; cursor: hand;");
}
unsafeWindow.CP_prev = function(step)
{
   var text = document.getElementById('CPadminContent');
   StepPrevious = step
   document.getElementById("kvajeno").setAttribute('style', "color:#678;margin:0px;font-weight:600;");
   text.innerHTML = StepPrevious + ": <b>" + culturePointsWord[StepPrevious] + "</b> level " + culturePointsLevel[StepPrevious]
   document.getElementById("kvajeno").setAttribute('onClick', "");
}
//
function getStep(start)
{
   var aliSmoPreskociliStep = start-1;
   var kontejner = document.getElementsByTagName("AREA");
   for (j=start;j<culturePointsLine.length;j++)
   {
      if (j != aliSmoPreskociliStep+1 && j>1)
         {
            if (culturePointsLevel[j-1] == 1)
            {
               if (IsThereEmptySpace())
               {
                  return j-1;
               }
            }
            else
            {
               return j-1;
            }
         }
      for (i=0;i<kontejner.length;i++)
      {
         if (kontejner[i].title)
         {
            var kontejnerTokenz = kontejner[i].title.split(" ");
            if (kontejnerTokenz[0] == culturePointsLine[j])
            {
               if (kontejnerTokenz[kontejnerTokenz.length - 1] >= culturePointsLevel[j])
               {
                  aliSmoPreskociliStep = j;
               }
            }
         }
      }
   }
}
//
function IsThereEmptySpace()
{
   var kontejner = document.getElementsByTagName("AREA");
      for (i=0;i<kontejner.length;i++)
      {
         if (kontejner[i].title)
         {
            var kontejnerTokenz = kontejner[i].title.split(" ");
            if(kontejnerTokenz[0]=="Building")
            {
               return 1;
            }
         }
      }
   return 0;
}
mainFunct();