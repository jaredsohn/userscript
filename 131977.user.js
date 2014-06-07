// ==UserScript==
// @name          BuGil_Hider
// @namespace     http://userscripts.org/scripts/show/131977
// @description   Block thread bule gila di Computer Stuff
// @include       http://kaskus.co.id/forum/*
// @version       1
// @author        Boule, the ultimate junker nubitol
// ==/UserScript==
var whit = new Array();
var patB = new Array();
var patS = new Array();
var patI = new Array();

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
patB[39]=/racing/gi;
patB[40]=/guarda/gi;
patB[41]=/campion/gi;
patB[42]=/philad/gi;
patB[43]=/blogspot.com/gi;
patB[44]=/nolvadex/gi;
patB[45]=/hd tv/gi;
patB[46]=/ebook on/gi;
patB[47]=/kindle/gi;
patB[48]=/nba/gi;
patB[49]=/ice hockey/gi;
patB[50]=/nhl/gi;
patB[51]=/of origin/gi;
patB[52]=/regarder/gi;
patB[53]=/en /gi;
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
patS[64]=/anabatic/gi;
patS[65]=/BH/gi;
patS[66]=/Bening/gi;
patS[67]=/Bikini/gi;
patS[68]=/Cewe/gi;
patS[69]=/Foto Hot/gi;
patS[70]=/TOGE/gi;
patS[71]=/bokep/gi;
patS[72]=/make up/gi;
patS[73]=/temen SMA/gi;
patS[74]=/foto panas/gi;
patS[75]=/tante/gi;
patS[76]=/igo/gi;
patS[77]=/temen ane/gi;
patS[78]=/zakar/gi;
patS[79]=/cantik banget/gi;
patS[80]=/narsis/gi;
patS[81]=/Seksi/gi;
patS[82]=/maria ozawa/gi;
patS[83]=/cantik-cantik/gi;
patS[84]=/pose/gi;
patS[85]=/FHM/gi;
patS[86]=/cw/gi;
patS[87]=/Aura Kasih/gi;
patS[88]=/tangan jahil/gi;
patS[89]=/ml/gi;
patS[90]=/Payudara Seharga/gi;
patS[91]=/Gadis Maskot/gi;
patS[92]=/cherleders/gi;
patS[93]=/sama model/gi;
patS[94]=/sexy/gi;
patS[95]=/Jav/gi;
patS[96]=/cewk/gi;
patS[97]=/Charlie Ray/gi;
patS[98]=/abg/gi;
patS[99]=/Foto Model/gi;
patS[100]=/Ratu Felisha/gi;
patS[101]=/Piala dunia edisi 2010/gi;
patS[102]=/mantan model/gi;
patS[103]=/Luna Maya/gi;
patS[104]=/horny/gi;
patS[105]=/mantan/gi;
patS[106]=/Cosplay/gi;
patS[107]=/vagina/gi;
patS[108]=/Rina Suzuki/gi;
patS[109]=/Peragawati2/gi;
patS[110]=/Stripties/gi;
patS[111]=/Manis Manja/gi;
patS[112]=/Kesha Covered/gi;
patS[113]=/Bugil/gi;
patS[114]=/Kelakuannya/gi;
patS[115]=/Pria Bergairah/gi;
patS[116]=/Pedagang BB/gi;
patS[117]=/Dara The Virgin/gi;
patS[118]=/Keeley Hazell/gi;
patS[119]=/SMA jaman/gi;
patS[120]=/bosen sama guru/gi;
patS[121]=/karyawati/gi;
patS[122]=/silahkan nikmati/gi;
patS[123]=/ayam kampus/gi;
patS[124]=/Porno/gi;
patS[125]=/paling beruntung/gi;
patS[126]=/nozomi sasaki/gi;
patS[127]=/GRAVURE/gi;
patS[128]=/Pantai di Korea/gi;
patS[129]=/Ngakak Status FB/gi;
patS[130]=/aida saskia/gi;
patS[131]=/adult/gi;
patS[132]=/Updateee/gi;
patS[133]=/BØkep/gi;
patS[134]=/Üpdate/gi;
patS[135]=/unlock iphone to/gi;
patS[136]=/unlock iphone 3g for/gi;
patS[137]=/match is very interesting and enjoyable/gi;
patS[138]=/extreme rules 2012/gi;
patS[139]=/paulie malignaggi/gi;
patS[140]=/watch the Avengers 2012/gi;
patS[141]=/nhl playoff/gi;
patS[142]=/chalon-sur-saone/gi;
patS[143]=/manchester city v/gi;
patS[144]=/so you think you can dance review:/gi;
patS[145]=/finpecia/gi;
patS[146]=/broadcast on your pc tv/gi;
patS[147]=/Juaranya Selebriti/gi;
patS[148]=/pegawai bank/gi;
patS[149]=/cantik2/gi;
patS[150]=/artis jepang/gi;
patS[151]=/Hari Tanpa Rok/gi;
patS[152]=/Big Boobs/gi;
patS[153]=/penumpang seperti wanita/gi;
patS[154]=/Juaranya Selebriti Indonesia/gi;
patS[155]=/Foto Artis/gi;
patS[156]=/Song Hye Kyo/gi;
patS[157]=/Barbie/gi;
patS[158]=/Alisia/gi;
patS[159]=/foto2/gi;
patS[160]=/Lavigne/gi;
patS[161]=/Avril/gi;
patS[162]=/Kondom/gi;
patS[163]=/Manohara/gi;
patS[164]=/Pepek/gi;
patS[165]=/Kirana/gi;
patS[166]=/Elisha Cuthbert/gi;
patS[167]=/Cuthbert/gi;
patS[168]=/teman ane/gi;
patS[169]=/SPG/gi;
patS[170]=/Melvi pemeran Deswita/gi;
patS[171]=/Mahasiswi Trisakti Cantik/gi;
patS[172]=/Wanita Pakistan/gi;
patS[173]=/Mayu Oya/gi;
patS[174]=/Ababil/gi;
patS[175]=/Pussy/gi;
patS[176]=/The Hot Guys/gi;
patS[177]=/Viena Lopes/gi;
patS[178]=/Lopes/gi;
patS[179]=/Wajahnya/gi;
patS[180]=/Gadis Desa/gi;
patS[181]=/Jennifer Kurniawan/gi;
patS[182]=/Juri MasterChef/gi;
patS[183]=/Echa Paramitha/gi;
patS[184]=/American Pie/gi;
patS[185]=/Wanita Arab/gi;
patS[186]=/Lolita Putri Rizky/gi;
patS[187]=/Vicky Vette/gi;
patS[188]=/Vette/gi;
patS[189]=/cinta laura/gi;
patS[190]=/Ratu Arab/gi;
patS[191]=/Blue Film/gi;
patS[192]=/Hannah Quinlivan/gi;
patS[193]=/Melinda Dee/gi;
patS[194]=/Foto Lengkap/gi;
patS[195]=/Yuniza Icha/gi;
patS[196]=/masuk nyesel/gi;
patS[197]=/BØkÈp/gi;
patS[198]=/rok/gi;
patS[199]=/Vanessa Angel/gi;
patS[200]=/kermit, miss piggy/gi;
patS[201]=/primetime emmy awards/gi;
patS[202]=/how do you bypass windows/gi;
patS[203]=/Indonesia Girl/gi;
patS[204]=/Tetek/gi;
patS[205]=/payudara/gi;
patS[206]=/memek/gi;
patS[207]=/Jessica-Jane/gi;
patS[208]=/host new reality show/gi;
patS[209]=/rlialsm xvi/gi;
patS[210]=/valencia vs osasuna/gi;
patS[211]=/the whole picture less expensive:/gi;
patS[212]=/blackpool v birmingham live/gi;
patS[213]=/birmingham v blackpool live/gi;
patS[214]=/hbo-ppv/gi;
patS[215]=/spear, ountslje/gi;
patS[216]=/ekhon ei site/gi;
patS[217]=/hbo.ppv/gi;
patS[218]=/hbo-ppv/gi;
patS[219]=/floyd mayweather/gi;
patS[220]=/\$\$\$\$/gi;
patS[221]=/heibles/gi;
patS[222]=/Mami Sasazaki/gi;
patS[223]=/Lin Ke Tong/gi;
patS[224]=/Main Catur/gi;
patS[225]=/ngeremesnya/gi;
patS[226]=/liat fb-nya.../gi;
patS[227]=/ala BB/gi;
patS[228]=/Sasazaki/gi;
patS[229]=/aurah kasih/gi;
patS[230]=/Ke Tong/gi;
patS[231]=/katanya seh/gi;
patS[232]=/Belahan/gi;
patS[233]=/anak bandung/gi;
patS[234]=/anak kecil jgn masuk/gi;
patS[235]=/bsipak/gi;
patS[236]=/bispak/gi;
patS[237]=/3 bidadari/gi;
patS[238]=/asli apa palsu/gi;
patS[239]=/Angeliq/gi;
patS[240]=/kagak nyesel/gi;
patS[241]=/gan masup/gi;
patS[242]=/Haruna Ono/gi;
patS[243]=/live tv=/gi;
patS[244]=/serie a /gi;
patS[245]=/gratis ice hockey/gi;
patS[246]=/atletico/gi;
patS[247]=/bilbao/gi;
patS[248]=/binatang malu difoto/gi;
patS[249]=/haruna/gi;
patS[250]=/artis scandal/gi;
patS[251]=/konak/gi;
patS[252]=/bulunya banyak banget/gi;
patS[253]=/model gituan/gi;
patS[254]=/Babi Jenis/gi;
patS[255]=/ISABELLA/gi;
patS[256]=/Im Ji Hye/gi;
patS[257]=/Lebih Dari Kata Cantik/gi;
patS[258]=/Saingan Maria Ozowa/gi;
patS[259]=/Cute bgt/gi;
patS[260]=/Misa Campo/gi;
patS[261]=/stream gratis/gi;
patS[262]=/Child Custody Hurdles for Fathers/gi;
patS[263]=/milon/gi;
patS[264]=/parfaiteavezonc/gi;
patS[265]=/making money online/gi;
patS[266]=/viver livre/gi;
patS[267]=/washington vs ny/gi;
patS[268]=/HOT Foto/gi;
patS[269]=/Ellen Adarna/gi;
patS[270]=/menutupi TUBUH/gi;
patS[271]=/Salon yang bikin cowok betah/gi;
patS[272]=/Eva Celia/gi;
patS[273]=/sama-sama nakal/gi;
patS[274]=/Pevita Cleo Elieen Pearce/gi;
patS[275]=/Foto-Foto Prewedding/gi;
patS[276]=/Mano on Photoshoot/gi;
patS[277]=/Pevita Pearce/gi;
patS[278]=/Terapi Tanpa Busana/gi;
patS[279]=/miss A/gi;
patS[280]=/Ternyata Orang Jepang/gi;
patS[281]=/Gstring Doang/gi;
patS[282]=/Zhu Songhua,/gi;
patS[283]=/cewe cakep/gi;
patS[284]=/Rambut nya bagus banget.../gi;
patS[285]=/SNSD,Bigbang,SHINee,Suju,4minute,2NE1/gi;
patS[286]=/SNSD Jessica Photoshoot/gi;
patS[287]=/Ada anjing mirip/gi;
patS[288]=/Vega Ngatini/gi;
patS[289]=/bokong trepes/gi;
patS[290]=/meki/gi;
patS[291]=/Foto Nakal/gi;
patS[292]=/bugi/gi;
patS[293]=/neng aura/gi;
patS[294]=/bohay/gi;
patS[295]=/Angel Chibi/gi;
patS[296]=/Anita Hara/gi;
patS[297]=/Mirip Jennifer Bachdim/gi;
patS[298]=/GHEA IDOL season 3/gi;
patS[299]=/Adriyanti FIRDASARI Fans Club/gi;
patS[300]=/Kelly Brooke/gi;
patS[301]=/intipin/gi;
patS[302]=/istri soleha gan/gi;
patS[303]=/cantik apa biasa/gi;
patS[304]=/Fans-nya Ida Ayu/gi;
patS[305]=/Lalla Hirayama/gi;
patS[306]=/Hot Model/gi;
patS[307]=/mupeng/gi;
patS[308]=/Mischa/gi;
patS[309]=/ngentoot/gi;
patS[310]=/Jual Obat/gi;
patS[311]=/model baru/gi;
patS[312]=/ISSHIKI/gi;
patS[313]=/miyabi/gi;
patS[314]=/the bleesing of computer/gi;
patS[315]=/business advice that you can count on/gi;
patS[316]=/Nazomi Sasaki/gi;
patS[317]=/Av Idol/gi;
patS[318]=/Kirara Asuka/gi;
patS[319]=/Danamon/gi;
patS[320]=/rin sakuragi/gi;
patS[321]=/sell cvv good all country/gi;
patS[322]=/katso suomi/gi;
patS[323]=/Dumps/gi;
patS[324]=/CCV+/gi;
patS[325]=/Nurdin M/gi;
patS[326]=/video smu/gi;
patS[327]=/mesum/gi;
patS[328]=/Leah Dizon/gi;
patS[329]=/barang mantab/gi;
patS[330]=/bb artis dan model/gi;
patS[331]=/ngaceng/gi;
patS[332]=/Weitong/gi;
patS[333]=/♥Takase Nanami♥/gi;
patS[334]=/Coffey...cantik/gi;
patS[335]=/cwe/gi;
patS[336]=/Anak anjing/gi;
patS[337]=/Indo Hanya/gi;
patS[338]=/foto sexi/gi;
patS[339]=/mirip dengan boneka/gi;
patS[340]=/Iklan Celana Dalam/gi;
patS[341]=/TerLengkap dan TerUpdate/gi;
patS[342]=/on Mac!/gi;
patS[343]=/Model HOT/gi;
patS[344]=/MODEL JEPANG/gi;
patS[345]=/Model Thailand/gi;
patS[346]=/~~MIRANDA/gi;
patS[347]=/Teman Kantor/gi;
patS[348]=/Foto gadis kembar/gi;
patS[349]=/Larissa Riquelme/gi;
patS[350]=/Jennifer Kurosawa/gi;
patS[351]=/Sumpit My Bra/gi;
patS[352]=/gak pake BRA/gi;
patS[353]=/Hot!!/gi;
patS[354]=/Ilustrasi yang Cantik/gi;
patS[355]=/cantik se GBK/gi;
patS[356]=/Fukuoka Sayaka/gi;
patS[357]=/model iklan/gi;
patS[358]=/Primadona SMA/gi;
patS[359]=/japanese idol/gi;
patS[360]=/anak sma pegang toket/gi;
patS[361]=/dilukis telanjang/gi;
patS[362]=/Wanita Ngiler/gi;
patS[363]=/Model Cantik Favorif/gi;
patS[364]=/pamer CD,./gi;
patS[365]=/masih smp/gi;
patS[366]=/harrypotter806/gi;
patS[367]=/startfunny/gi;
patS[368]=/new csm desktop/gi;
patS[369]=/pctv/gi;
patS[370]=/rugby/gi;
patS[371]=/surjodoy/gi;
patS[372]=/jual KTP,IJAZAH S1/gi;
patS[373]=/BB\+\+/gi;
patS[374]=/Bb bgt gan/gi;
patS[375]=/janda/gi;
patS[376]=/Peterporn/gi;
patS[377]=/Emma Watson,/gi;
patS[378]=/gan masup/gi;
patS[379]=/Gak Nyangka TKW/gi;
patS[380]=/Favorit Ane Sepanjang Masa/gi;
patS[381]=/hentaindo/gi;
patS[382]=/Video Kekerasan Seks/gi;
patS[383]=/WANITA PANGGILAN/gi;
patS[384]=/Manami Oku/gi;
patS[385]=/Sekretaris Nakal/gi;
patS[386]=/Sandra dewi makan malem/gi;
patS[387]=/Bisnis Tiket Pesawat/gi;
patS[388]=/Cakepan Asmirandah/gi;
patS[389]=/cew bollywood/gi;
patS[390]=/Anri Sugihara/gi;
patS[391]=/arisa mizuhara/gi;
patS[392]=/Bahaya Model Cantik/gi;
patS[393]=/trio macam lagi mandi/gi;
patS[394]=/hentai/gi;
patS[395]=/foto BB/gi;
patS[396]=/made in vietnam/gi;
patS[397]=/stone hot/gi;
patS[398]=/kebodohan hansip/gi;
patS[399]=/trit cacat/gi;
patS[400]=/membawa nikmat/gi;
patS[401]=/top banget gan/gi;
patS[402]=/tobrut/gi;
patS[403]=/mandi si eneng/gi;
patS[404]=/sih anu/gi;
patS[405]=/masok/gi;
patS[406]=/cewek SMA/gi;
patS[407]=/cewek SMP/gi;
patS[408]=/CIMB/gi;
patS[409]=/Jual Film Bioskop/gi;
patS[410]=/perangsang wanita/gi;
patS[411]=/perangsang permen/gi;
patS[412]=/Potenzhol/gi;
patS[413]=/potenzol/gi;
patS[414]=/Pelangsing/gi;
patS[415]=/Obat kuat/gi;
patS[416]=/obat peninggi/gi;
patS[417]=/pembesar penis./gi;
patS[418]=/pembesar penis/gi;
patS[419]=/Vakum pembesar/gi;
patS[420]=/Alat Bantu Sex/gi;
patS[421]=/pembesar alat/gi;
patS[422]=/Soc cer fr ee/gi;
patS[423]=/search test/gi;
patS[424]=/Glee/gi;
patS[425]=/Sharena/gi;
patS[426]=/Smu NARZIZ/gi;
patS[427]=/mainan dawasa/gi;
patS[428]=/scandal/gi;
patS[429]=/Socialita edition/gi;
patS[430]=/suka pamer/gi;
patS[431]=/Taeyeon's/gi;
patS[432]=/Pemain Sex/gi;
patS[433]=/kelakuan/gi;
patS[434]=/Hot Kiki/gi;
patS[435]=/Foto mirip Agni/gi;
patS[436]=/Tsania Marwa/gi;
patS[437]=/Top Suporter/gi;
patS[438]=/putih bener/gi;
patS[439]=/Asti dan Lia Ananta/gi;
patS[440]=/Ane ketemuan sama kaskuserwati/gi;
patS[441]=/si cantik dari Paramore/gi;
patS[442]=/disambut yang beginian/gi;
patS[443]=/Ayu Anjani...woooww/gi;
patS[444]=/Cheers Leaders/gi;
patS[445]=/Polwan Paling/gi;
patS[446]=/Becandaan di kantor/gi;
patS[447]=/model Celana Dalam/gi;
patS[448]=/Mano erina/gi;
patS[449]=/Tika Putri/gi;
patS[450]=/Kecantikan Alami/gi;
patS[451]=/unexpossed/gi;
patS[452]=/difoto koq/gi;
patS[453]=/Sheila Marcia/gi;
patS[454]=/JapaneseFrench/gi;
patS[455]=/margareth wang/gi;
patS[456]=/cwe cakep/gi;
patS[457]=/ngahahahha/gi;
patS[458]=/Wanita Cantik Elegan/gi;
patS[459]=/Gaun Pink Eun Bin/gi;
patS[460]=/Cristine Reyes/gi;
patS[461]=/Jang Soo/gi;
patS[462]=/M0ntok/gi;
patS[463]=/Model from China/gi;
patS[464]=/garuk2 ketek/gi;
patS[465]=/SNSD pake BATIK/gi;
patS[466]=/Warnet di Malaysia/gi;
patS[467]=/Lee Ji Woo/gi;
patS[468]=/Amoy Liar/gi;
patS[469]=/Natsumi/gi;
patS[470]=/Orang Party/gi;
patS[471]=/om2/gi;
patS[472]=/melepas BRA/gi;
patS[473]=/pakai Handuk doang/gi;
patS[474]=/pembawa berita wanita/gi;
patS[475]=/LIAT UANG LOGAM/gi;
patS[476]=/Park Min Young/gi;
patS[477]=/beckham dan syahrini/gi;
patS[478]=/porn star favorite/gi;
patS[479]=/shakira is beautifull/gi;
patS[480]=/yang paling cantik/gi;
patS[481]=/5 Wanita/gi;
patS[482]=/HQ pict./gi;
patS[483]=/perfect woman/gi;
patS[484]=/kimpoi Dengan Anjing/gi;
patS[485]=/waaaawww/gi;
patS[486]=/SPA Plus+/gi;
patS[487]=/boneka apa orangnya/gi;
patS[488]=/pamer Toket/gi;
patS[489]=/cocok jadi model/gi;
patS[490]=/baju kayak gini/gi;
patS[491]=/ALIYA RAJASA/gi;
patS[492]=/Ane Beruntung Banget/gi;
patS[493]=/Bayar 100rb/gi;
patS[494]=/Pornstar yg agan2 suka/gi;
patS[495]=/presenter tengah malam/gi;
patS[496]=/BB17/gi;
patS[497]=/istri Ip man/gi;
patS[498]=/gan milih hayley/gi;
patS[499]=/novie amelia/gi;
patS[500]=/sebulan utk pijat/gi;
patS[501]=/liat wanita orgasme/gi;
patS[502]=/dibalik selimutmu/gi;
patS[503]=/Bintang Hot Jepang/gi;
patS[504]=/ebby Ayu nih/gi;
patS[505]=/Mana tahan gan/gi;
patS[506]=/Sora Aoi Photograph/gi;
patS[507]=/Stik PS keluaran/gi;
patS[508]=/Quinn Bikin/gi;
patS[509]=/quinn akhirnya/gi;
patS[510]=/siswi2 abad/gi;
patS[511]=/Miss GT/gi;
patS[512]=/another girl/gi;
patS[513]=/munak/gi;
patS[514]=/Cute Korean/gi;
patS[515]=/kalo lo MAHO/gi;
patS[516]=/Dramatisasi Sepakbola/gi;
patS[517]=/camilia belle/gi;
patS[518]=/Berperan Jadi Guru/gi;
patS[519]=/bikin sempit/gi;
patS[520]=/Hình/gi;
patS[521]=/Trinh/gi;
patS[522]=/Cute Babes/gi;
patS[523]=/Kelbin/gi;
patS[524]=/baju tembus/gi;
patS[525]=/wiwid gunawan/gi;
patS[526]=/nyesel deh/gi;
patS[527]=/Gadis-Gadis Bond/gi;
patS[528]=/Mobil Genewa 2010/gi;
patS[529]=/Kiper Tercantik/gi;
patS[530]=/Auryn/gi;
patS[531]=/foto terlarang/gi;
patS[532]=/Thread hargailah/gi;
patS[533]=/Adegan Bercumbu/gi;
patS[534]=/Olahraga Nikmat/gi;
patS[535]=/Nindy+Pict/gi;
patS[536]=/saingan Jojo/gi;
patS[537]=/saat naik roller/gi;
patS[538]=/kenalan di chat/gi;
patS[539]=/10 wanita indonesia/gi;
patS[540]=/cd anak sekolah/gi;
patS[541]=/Ariel-Luna Ditantang/gi;
patS[542]=/TV Di Jepang/gi;
patS[543]=/Tolak Tantangan Sumpah/gi;
patS[544]=/agak BB nih/gi;
patS[545]=/Eh Banjir/gi;
patS[546]=/Ayaka/gi;
patS[547]=/sapa nama/gi;
patS[548]=/Siap-Siap Nelenn/gi;
patS[549]=/Beauty Photoscenes/gi;
patS[550]=/gaane/gi;
patS[551]=/Ariel dengan teman2/gi;
patS[552]=/buah melon tp/gi;
patS[553]=/yang lagi ngerjakan tugas/gi;
patS[554]=/just cute/gi;
patS[555]=/napas aye/gi;
patS[556]=/Model smp/gi;
patS[557]=/Miss Universe Canada/gi;
patS[558]=/DXX/gi;
patS[559]=/Jade Marcela,/gi;
patS[560]=/Seram ala China/gi;
patS[561]=/Boleh Liat,/gi;
patS[562]=/eka fresya/gi;
patS[563]=/Park Si Yeon/gi;
patS[564]=/Model-Model Manis/gi;
patS[565]=/Nindy+Pict/gi;
patS[566]=/Selena Gomez pamer/gi;
patS[567]=/baju hitam transparan/gi;
patS[568]=/crot/gi;
patS[569]=/minta dipuasin/gi;
patS[570]=/Kenapa Pevita/gi;
patS[571]=/beautiful army girls/gi;
patS[572]=/Polisi Saat Ditilang/gi;
patS[573]=/lumayan buat pelampiasan/gi;
patS[574]=/boker sembarang/gi;
patS[575]=/Nakal Nikita/gi;
patS[576]=/Pembantu Baru/gi;
patS[577]=/Shinta Big Brother/gi;
patS[578]=/melet2/gi;
patS[579]=/gadis pantai neh/gi;
patS[580]=/Foto Vulgar Lady Gaga/gi;
patS[581]=/Pria Tercantik/gi;
patS[582]=/Trit Gaje/gi;
patS[583]=/Olympic 2012/gi;
patS[584]=/Obat Bius + Obat Tidur/gi;
patS[585]=/Smesco/gi;
patS[586]=/B0kong/gi;
patS[587]=/GIRL STUFFS/gi;
patS[585]=/Smesco/gi;
patS[586]=/B0kong/gi;
patS[587]=/GIRL STUFFS/gi;
patS[588]=/Permainan Cinta/gi;
patS[589]=/Cerita Dewasa/gi;
patS[590]=/Ngent0t/gi;
patS[591]=/Cerita Seks/gi;
patS[592]=/Susah2/gi;
patS[593]=/Le Hoang Bao Tran,/gi;
patS[594]=/Omas Wanita/gi;
patS[595]=/Cerita 53x/gi;
patS[596]=/Waktu Masih Gadis/gi;
patS[597]=/Ariel dicium wanita lain/gi;
patS[598]=/anaknye Bill Gates/gi;
patS[599]=/Paha melanie ricardo/gi;
patS[600]=/seksy/gi;
patS[601]=/Pasangan Ayu Ting Ting/gi;
patS[602]=/sepasang fans Bayern/gi;
patS[603]=/Foto-Foto Selingkuh/gi;
patS[604]=/FOTO Dea,/gi;
patS[605]=/Roopali/gi;
patS[606]=/Cherry belle/gi;
patS[607]=/Eneng/gi;
patS[608]=/Pornstar/gi;
patS[609]=/Sasha Grey,/gi;
patS[610]=/B4henol/gi;
patS[611]=/P4yudara/gi;
patS[612]=/tong fang/gi;
patS[613]=/tong pang/gi;
patS[614]=/tonfang/gi;
patS[615]=/tongpang/gi;
patS[616]=/Putri Konglomerat/gi;
patS[617]=/fang./gi;
patS[618]=/tong feng/gi;
patS[619]=/Thread BB/gi;
patS[620]=/pembantuku yang cantik/gi;
patS[621]=/sisca husein/gi;
patS[622]=/bencong tercantik/gi;
patS[623]=/bikin sesak/gi;
patS[624]=/D3wasa/gi;
patS[625]=/Wisata Sex/gi;
patS[626]=/Gadis amoy/gi;
patS[627]=/Model china/gi;
patS[628]=/Eksotis di Hollywood/gi;
patS[629]=/Jung Da Yeon/gi;
patS[630]=/Zhang/gi;
patS[631]=/B1kini/gi;
patS[632]=/53xy/gi;
patS[633]=/53k51/gi;
patS[634]=/Bir4hi/gi;
patS[635]=/Ter53k51/gi;
patS[636]=/Br4/gi;
patS[637]=/P4yud4r4/gi;
patS[638]=/Nhung Co/gi;
patS[639]=/Bot kaskus/gi;
patS[640]=/Tanah Panggang/gi;
patS[641]=/Thai Ha/gi;
patS[642]=/geje/gi;
patS[643]=/Gebetan ane/gi;
patS[644]=/Binal/gi;
patS[645]=/kemaluanku/gi;
patS[646]=/kemaluan/gi;
patS[647]=/B1k1ni/gi;
patS[648]=/S3ks1/gi;
patS[649]=/h0t/gi;
patS[650]=/toket/gi;
patS[651]=/S*ks/gi;
patS[652]=/PAHA MULUS/gi;
patS[653]=/Keloni/gi;
patS[654]=/Terseks/gi;
patS[655]=/Lupa Pakai Celana/gi;
patS[656]=/cantiknya minta/gi;
patS[657]=/Skripsi/gi;
//--------- patI Section ---------
patI[0]=/Naimur.Rahman/gi;
patI[1]=/rocalabs/gi;
patI[2]=/daynasona/gi;
patI[3]=/aslam/gi;
patI[4]=/reznikbon/gi;
patI[5]=/manoo/gi;
patI[6]=/muhibulah/gi;
patI[7]=/sakilamahipalfi/gi;
patI[8]=/mishusir/gi;
patI[9]=/sujaninfo/gi;
patI[10]=/ashraf1266/gi;
patI[11]=/sakilamahipal/gi;
patI[12]=/farrukh89/gi;
patI[13]=/zeekin/gi;
patI[14]=/manomizo/gi;
patI[15]=/johnmia62/gi;
patI[16]=/gatlyom/gi;
patI[17]=/vopam/gi;
patI[18]=/Rustam.Effendi/gi;
patI[19]=/Subaryanto/gi;
patI[20]=/ydelako/gi;
patI[21]=/ThisIsCult/gi;
patI[22]=/gregorius83/gi;
patI[23]=/.dagumen/gi;
patI[24]=/PeternakAvatar/gi;
patI[25]=/puasok/gi;
patI[26]=/muhas14/gi;
patI[27]=/black7688/gi;
patI[28]=/tgesek/gi;
patI[29]=/JasaLiatEmail/gi;
patI[30]=/blablablo88/gi;
patI[31]=/nusantara999/gi;
patI[32]=/SILITMU/gi;
//--------- end  Section ---------

//------ function setCookie() & getCookie() taken from www.w3schools.com ------
function setCookie(c_name,value,exdays)
{
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);

  var c_value=escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
};

function getCookie(c_name)
{
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0; i<ARRcookies.length; i++)
  {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g,"");

    if (x==c_name)
    {
      return unescape(y);
    };
  };
};
// ----------------------------------------------------------------------------

function stripHTMLtags(param)
{
  return param.replace(/<(?:.|\n)*?>/gm, " ").replace(/&[^;]+;/g, " ");
}

function getButtonValue()
{
  var combValue = getCookie("BuGil_Hider");

  if (combValue!=null && combValue!="")
  {
    var spltValue = combValue.split("");

    if(spltValue[0] == "1") { var convSF  = "Show subforum"; } else { var convSF  = "Hide subforum"; }
    if(spltValue[1] == "1") { var convStk = "Show sticky"; }   else { var convStk = "Hide sticky"; }
    if(spltValue[2] == "1") { var convBot = "Show bot"; }      else { var convBot = "Hide bot"; }

    if(btnSF.value  != convSF)  { btnSF.click(); }
    if(btnStk.value != convStk) { btnStk.click(); }
    if(btnBot.value != convBot) { btnBot.click(); }
  }
}


function putButtonValue()
{
  var combValue = "";

  if(btnSF.value == "Show subforum")
  {
    combValue += "1";
  }
  else
  {
    combValue += "0";
  }

  if(btnStk.value == "Show sticky")
  {
    combValue += "1";
  }
  else
  {
    combValue += "0";
  }

  if(btnBot.value == "Show bot")
  {
    combValue += "1";
  }
  else
  {
    combValue += "0";
  }

  setCookie("BuGil_Hider", combValue, 7);
}

function IsBot(param)
{
  for (var i=0; i<whit.length; i++)
  {
    if (param.match(whit[i]) != null)
    {
      return false;
    }
  }

  var foundStat = 0;
  for (var i=0; i<patB.length; i++)
  {
    if (param.match(patB[i]) != null)
    {
      foundStat++;

      if (foundStat == 2)
      {
        return true;
      }
    }
  }

  for (var i=0; i<patS.length; i++)
  {
    if (param.match(patS[i]) != null)
    {
      return true;
    }
  }

  for (var i=0; i<patI.length; i++)
  {
    if (param.match(patI[i]) != null)
    {
      return true;
    }
  }

  return false;
}

function DisplayProc()
{
  var blokirs = document.getElementsByTagName("tr");

  for (i=0; i<blokirs.length; i++)
  {
    if(blokirs[i].innerHTML.match(/td_threadtitle_/gi))
    {
      try
      {
        if(blokirs[i].innerHTML.match(/Sticky:/) && btnBot.value == "Show bot" && btnStk.value == "Show sticky")
        {
          blokirs[i].style.display = "none";
          continue;
        }     

        if (IsBot(stripHTMLtags(blokirs[i].innerHTML)) == true)
        {
          if(btnBot.value == "Show bot")
          {
            blokirs[i].style.display = "none";
          }
          else
          {
            blokirs[i].style.display = "";
          }
        }
        else
        {
          if(btnBot.value == "Show bot")
          {
            blokirs[i].style.display = "";
          }
          else
          {
            blokirs[i].style.display = "none";
          }
        }
      }
      catch (e) { };
    }
  }
}

function SearchProc(param)
{
  var blokirs = document.getElementsByTagName(param);

  for (i=0; i<blokirs.length; i++)
  {
    try
    {
      if (IsBot(stripHTMLtags(blokirs[i].innerHTML)) == true)
      {
        if(btnBot.value == "Show bot")
        {
          blokirs[i].style.display = "none";
        }
        else
        {
          blokirs[i].style.display = "";
        }
      }
      else
      {
        if(btnBot.value == "Show bot")
        {
          blokirs[i].style.display = "";
        }
        else
        {
          blokirs[i].style.display = "none";
        }
      }
    }
    catch (e) { };
  }
}

//------ Main proc ------
if (document.URL.match(/m.kaskus.co.id/gi) != null)
{
  var blokirs = document.getElementsByTagName("a");

  for (i=0; i<blokirs.length; i++)
  {
    if (IsBot(blokirs[i].innerHTML) == true)
    {
      blokirs[i].parentNode.style.display = "none";
    }
  }
}
else
{
  //---------- Index Page ----------
  if  ((document.URL.match(/forum/gi) != null) || (document.URL.match(/forum\//gi) != null))
  {
    if (document.URL.match(/www.kaskus.co.id/gi)
    {
      var tbl_frm = document.getElementById("JudulForumBlue");
      var subf_id = document.getElementById("lingForumIsifr_mid");
    }
    else
    {
      var tbl_frm = document.getElementById("header-forum");
      tbl_frm.innerHTML += "<p>&nbsp;<\/p><p>&nbsp;<\/p><p>&nbsp;<\/p><p>&nbsp;<\/p>";
      var subf_id = document.getElementById("subforum-table");
    }

    var btnSF = document.createElement("input");

    with(btnSF)
    {
      setAttribute("value", "Hide subforum" );
      setAttribute("type", "button" );
    }

    btnSF.onclick = function()
    {
      if(btnSF.value == "Hide subforum")
      {
        btnSF.value = "Show subforum";
        subf_id.style.display = "none";
      }
      else
      {
        btnSF.value = "Hide subforum";
        subf_id.style.display = "block";
      }

      putButtonValue();
    }

    var btnStk = document.createElement("input");

    with(btnStk)
    {
      setAttribute("value", "Hide sticky" );
      setAttribute("type", "button" );
    }

    btnStk.onclick = function()
    {
      if(btnStk.value == "Hide sticky")
      {
        btnStk.value = "Show sticky";
      }
      else
      {
        btnStk.value = "Hide sticky";
      }

      putButtonValue();

      DisplayProc();
    };

    var btnBot = document.createElement("input");

    with(btnBot)
    {
      setAttribute("value", "Show bot" );
      setAttribute("type", "button" );
    }

    btnBot.onclick = function()
    {
      if(btnBot.value == "Show bot")
      {
        btnBot.value = "Hide bot";
      }
      else
      {
        btnBot.value = "Show bot";
      }

      putButtonValue();

      DisplayProc();
    };

    try
    {
      tbl_frm.appendChild(btnSF);
      tbl_frm.appendChild(btnStk);
      tbl_frm.appendChild(btnBot);
    }
    catch (e) { };

    DisplayProc();

    getButtonValue();
  }

  //---------- Search Page ----------
  if (document.URL.match(/search/gi) != null)
  {
    if (document.URL.match(/www.kaskus.co.id/gi)
    {
      var topbar = document.getElementsByClassName("thead")[1];
	  var elType = "Span";
	  
	  var srch = document.getElementsByTagName("ul");
      for(i=0;i<=1;i++)
      {
        try
        {
          var tmpStr  = srch[i].innerHTML;
              tmpStr  = tmpStr.replace(/<li>/g, "</span><span><li>");
              tmpStr  = tmpStr.replace("</span>", "");
              tmpStr += "</span>";

          srch[i].innerHTML = tmpStr;
        }
        catch (e) { };
      }
    }
    else
    {
      var topbar = document.getElementsByClassName("header")[0];
	  var elType = "tr";	  
    }

    var btnBot = document.createElement("input");

    with(btnBot)
    {
      setAttribute("value", "Show bot" );
      setAttribute("type", "button" );
	}

    btnBot.onclick = function()
    {
      if(btnBot.value == "Show bot")
      {
        btnBot.value = "Hide bot";
      }
      else
      {
        btnBot.value = "Show bot";
      }

	  SearchProc(elType);
    }

    try
    {
	  topbar.innerHTML = "";
      topbar.appendChild(btnBot);
    }
    catch (e) { };

    SearchProc(elType);
  }
}