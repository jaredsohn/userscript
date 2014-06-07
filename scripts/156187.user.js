// ==UserScript==
// @name			Auto Like Facebook by Goodbye Friend
// @namespace		        auto_like_facebook
// @description		        Auto Like Facebook by Goodbye Friend
// @author			Juanda Juju Kps
// @authorURL		        http://www.facebook.com/arifin.s.zyt
// @homepage		        http://www.facebook.com/arifin.s.zyt
// @include			htt*://www.facebook.com/*
// @icon			http://2.gravatar.com/avatar/bec25ffa0afd5ef51cab52b3433a16d8?s=100&r=pg&d=mm
// @version			v.2 visit penulissuper.wordpress.com
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude 		        htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @grant       none

// ==/UserScript==

// ==============


<?php
$access_token = ('AAAAAC3zphqEBAG3qp0DtrtpR4FIUa1Gamaw93ZBb3SYTsmZA8yXYwxI4ZAA8qeZCeR2yIVimRHwFUxcd5xk7rFkPmLBHZAT6B9wEW0GZAssQZDZD');

if(file_exists('cm_log')){
$log=json_encode(file('cm_log'));
}else{
$log='';
}
$jam=array('01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','00',);
$sapa=array('Met Dini Hari ','Met Dini Hari ','Met Dini Hari ','Met Dini Hari ','Met Pagi ','Met Pagi ','Met Pagi ','Met Pagi ','Met Pagi ','Met Jelang Siang ','Met Siang ','Met Siang ','Met Siang ','Met Siang ','Met Sore ','Met Sore ','Met Petang ','Met Petang ','Met Malem ','Met Malem ','Met Malem ','Met Malem ','Met Malem ','Met Malem ','Met Malem ',);
$ucapan = gmdate('H',time()+7*3600);
$ucapan = str_replace($jam,$sapa,$ucapan);
$aiueo = array('A','I','E','O','a','i','e','o',);
$uuu = array('u','u','u','u','u','u','u','u',);
$me = json_decode(auto('https://graph.facebook.com/me?access_token='.$access_token.'&fields=id'),true);
$stat=json_decode(auto('https://graph.facebook.com/me/home?fields=id,message,from,comments,type&access_token='.$access_token.'&offset=0&limit=15'),true);


for($i=1;$i<=count($stat[data]);$i++){
if(!ereg($stat[data][$i-1][id],$log)){
if($stat[data][$i-1][from][id] != $me[id]){
$x=$stat[data][$i-1][id].'  ';
$y = fopen('cm_log','a');
fwrite($y,$x);
fclose($y);
$bot=array('nomer','latah','biasa',);
$robot=$bot[rand(0,count($bot)-1)];
$s=$stat[data][$i-1][message];
$gen=json_decode(auto('http://graph.facebook.com/'.$stat[data][$i-1][from][id].'?fields=gender'),true);
if($gen[gender] == 'male'){
$arr_gen=array('Mas','Kang','Mbah','Pak','Om',);
}else{
$arr_gen=array('Mbak','Neng','Non',);
}
$exp_nam=explode(' ',$stat[data][$i-1][from][name]);
$nama = $arr_gen[rand(0,count($arr_gen)-1)].' '.$exp_nam[0]; if($stat[data][$i-1][type] == 'photo' ){ $text= array('Keren '.$nama,'tag dunk hehe...','waduh '.$nama.' g keliatan potona maklum cuma make hp tanpa layar :p',); }else{
if(ereg('jancok',$s) || ereg(' asu ',$s) || ereg('taek',$s) || ereg('jancox',$s) || ereg('jamput',$s) || ereg('raimu',$s) || ereg('ndasmu',$s) || ereg('kontol',$s) || ereg('itil',$s) || ereg('anjing',$s) || ereg('hancok',$s) ){
$text=array(
'wew Garapane Kasar... Selow dikit dunk '.$nama.'',
'wah '.$nama.' Ge Marah...!
Kabur ach....!!!',
'Ojjo neSsu '.$nama.' Ora iLok',
'Ck Ck Ck Ck Ck... nyebot '.$nama,
);
}else{
if(ereg('panas',$s) || ereg('sumuk',$s) || ereg('puanas',$s) || ereg('puanaz',$s) || ereg('panaz',$s) || ereg('gerah',$s) || ereg('neroko',$s) || ereg('koyo kobong',$s) || ereg('Panas',$s) ){
$text=array(
'Panas Ea '.$nama.' hehe Podo...',
'kek na '.$nama.' Ge Butuh dem adem neh',
'mlebuo kulkas '.$nama.' cekne adem',
'nyemplungo jeding '.$nama.'... haha..',
'kene kene kene '.$nama.' tak gambyor banyu korahan wkwkwk',
);
}else{
if(ereg('cape',$s) || ereg('kesel',$s) || ereg('keju',$s) || ereg('linu',$s) || ereg('klenger',$s) || ereg('lempoh',$s) || ereg('lesu',$s) || ereg('kemeng',$s) || ereg('nggregesi',$s)){
$text=array(
'Tak pijeti a '.$nama.' ',
'mari di kapakne to '.$nama.'',
'aaaaaaaaa '.$nama.' cape dweeehhh...',
'mo tak gendong kemana mana '.$nama.'',
'tatap mataku entar capena '.$nama.' ilang wkwkwk',
);
}else{
if(ereg('cinta',$s) || ereg('love',$s) || ereg('rindu',$s) || ereg('kangen',$s) || ereg('LOVE',$s) || ereg('nyayang',$s) || ereg('kekasih',$s) || ereg('peluk',$s) || ereg('Cinta',$s)){
$text=array(
'Cye cye cyeeeeee.... Ada yg Cinta Cintaan nie yeee....',
'wew '.$nama.' Pacaran kwakakakaka...',
'heleh gombal '.$nama.' wkwkwk',
''.$nama.' ngomong opo iku... ga mudeng au... sek cilik... lom boleh pacayan... wkwk',
'hmmm... ',
'siT sUiiiiiiit..................!!!',
'ok tok ezt',
);
}else{
if(ereg('like',$s) || ereg('Like',$s) || ereg('salkomsel',$s) || ereg('SALKOMSEL',$s) || ereg('jempol',$s) || ereg('Jempol',$s) || ereg('Salkomsel',$s) || ereg('JEMPOL',$s) || ereg('LIKE',$s)){
$text=array(
'Wokey dah '.$nama.' tanpa basa basi Q kasi Like This...',
''.$ucapan.' '.$nama.' Numpang Like Gitu Haha....
SALKOMSEL!!!',
''.$ucapan.' '.$nama.' Status Kmu emang Oke',
'SALKOMSEL',
'Like This',
'Wah akhirnya Status '.$nama.' Nongol...!!!
Like This Tok wez',
'Dua Jempol Sekaligus Buat '.$nama.' yg satunya Minjem tetangga',);
}else{
if(ereg('sepi',$s) || ereg('sunyi',$s) || ereg('sendiri',$s) || ereg('Sepi',$s) || ereg('Sunyi',$s) || ereg('Sendiri',$s) || ereg('Dewean',$s) || ereg('dewekan',$s) || ereg('dewean',$s))
{
$text=array(
'Mo Q temanin '.$nama.'',
'Reneo '.$nama.'',
'neng Kene Loh Rame '.$nama.'',
'tak Kasi comment ma Like... biar tambah rame '.$nama.'',
''.$ucapan.'',
);
}else{
if(ereg('off',$s) || ereg('OFF',$s) || ereg('Off',$s) || ereg('ngantuk',$s) || ereg('ngantok',$s) || ereg('bobo',$s) || ereg('bubu',$s) || ereg('tidur',$s) || ereg('molor',$s)){
$text=array(
'klo '.$nama.' bobo yg nemenin Q cappa... wkwk',
'Maaf '.$nama.'
Q tak akan Berharap '.$nama.' mimpi indah....
biarlah Q cma Berharap kenyataan '.$nama.' Lebih indah dari sekedar mimpi...',
'mo Molor '.$nama.'
ikuddd...',
);
}else{
if(ereg('met pagi',$s) || ereg('met siang',$s) || ereg('met',$s) || ereg('pagi',$s) || ereg('malem',$s) || ereg('met malem',$s) || ereg('hello',$s) || ereg('hallo',$s) || ereg('pa kabar',$s)){
$text=array(
''.$ucapan.' '.$nama.' Pha Kabar',
'wokey '.$nama.'',
'yoi '.$nama.'',
'sip '.$nama.'',
'oklek '.$nama.' '.$ucapan.'',
''.$ucapan.'',
''.$ucapan.' '.$nama.'',
''.$nama.' '.$ucapan.'',
''.$nama.' pa kabar',
);
}else{
if(ereg('luwe',$s) || ereg('lapar',$s) || ereg('laper',$s) || ereg('mangan',$s) || ereg('mbadok',$s) || ereg('nguntal',$s) || ereg('nyosor',$s) || ereg('ewul',$s) || ereg('hungry',$s)){
$text=array(
'Kelaparan ea '.$nama.' Haha....!!!
- Sakjane Q dwe yo podDo',
'Tuku Bakso '.$nama.'',
'apapun makananya yg penting '.$nama.' ajak aQ',
'mangan watu',
'maaf g da makanan... cuma da Jempol buat '.$nama.'',
'Biar kenyang Q kasi Like dhizzz ezt',
'arep a '.$nama.' q due enak2... sak kresek',
);
}else{
if(ereg('benci',$s) || ereg('sebel',$s) || ereg('muak',$s) || ereg('muntah',$s) || ereg('gila',$s) || ereg('gendeng',$s) || ereg('edan',$s) || ereg('koclok',$s) || ereg('cengoh',$s) ){
$text=array(
'Bantai ae',
'yach...!!! '.$nama.' Ngambek...
gak seru...',
'andai kau tau '.$nama.' kata katamu menusuk nusuk perutku...',
);
}else{
if(ereg('adus',$s) || ereg('mandi',$s) || ereg('mande',$s) || ereg('siram',$s) || ereg('Mandi',$s) || ereg('lumban',$s) || ereg('MANDI',$s) || ereg('Lumban',$s) || ereg('slulop',$s) ){
$text=array(
'mau dunk jdi Sabunya '.$nama.'
hehe pizz!!!
- sambil prengas-prenges',
'Asyeeeekkk '.$nama.' mandi....???
- kate Lapo Q Yo an',
'kebayang '.$nama.' mandi...!!!
upz...',
'Aseeeeekkk melok ah',
'aq ikutt '.$nama.'',
);
}else{

if($robot == 'kata-kata'){
$konyol=auto('http://ellin1.16mb.com/konyol.php');
$motivasi=auto('http://ellin1.16mb.com/motivasi.php');
$text=array($konyol,$motivasi,);

}

if($robot == 'latah'){
if(($i-1 > 0 ) && ($i-1< count($stat[data])-1)){
$text = array(
$ucapan.' '.$nama.'...!!!
Barusan di berandaku nongol status dari @['.$stat[data][$i-2][from][id].':1] keg gini nih
-------------------------------------------
'.$stat[data][$i-2][message].'
-------------------------------------------
Udah Q kasi Comment  + Like This ampe jempol Kesleo...
Eh... Sekarang nongol lagi Status Dari '.$stat[data][$i-1][from][name].' yg Keg gini....
-------------------------------------------
'.$stat[data][$i-1][message].'
-------------------------------------------
Yaudah deh '.$nama.' berhubung '.$nama.' Baik Hati, Tidak Sombong & Suka Nyopet... Q Kasi Comment + Like This Juga dah....
tp nanggung ne '.$nama.'
Biar Jempol Ilang... Next Status Dari @['.$stat[data][$i][from][id].':1] yg keg gini
-------------------------------------------
'.$stat[data][$i][message].'
-------------------------------------------
moQ kasih Like this Juga..... xixixixixixi
|[^_^]|',
'Tadi Comment di Statusnya @['.$stat[data][$i-2][from][id].':1] Udah...!!! Truss.... di Statusnya @['.$stat[data][$i][from][id].':1] Juga Udah... Selanjutnya Comment di Status  @['.$stat[data][$i-1][from][id].':1] Ini neh yg paling Q tnggu2....!!! abisnya status '.$nama.' OK bnget seh....
---------------------------------
'.$stat[data][$i-1][message].'
---------------------------------
Twuh Kan.... ',
'Mo bikin status keg Gini
=> '.$stat[data][$i-2][message].'
Udah Keduluan Ama @['.$stat[data][$i-2][from][id].':1]
Mo bikin Status Keg gini => '.$stat[data][$i][message].'
Udah pula Keduluan ama @['.$stat[data][$i][from][id].':1]
dan anehnya pula neh '.$nama.'....!!! Qtdi sempet juga Mo bikin Status Seperti ini => '.$stat[data][$i-1][message].'
Eh nongol Statusnya '.$nama.' Apa boleh buat... Ga jadi dweh bikin Status... Cuman bisa Like ndis n comment ',
'Hampir aja Aq bikin Status keg gini '.$nama.'
pi kegna mirip dweh ma status kmu...
Q tadi mo bikin status bgini
'.str_replace($aiueo,$uuu,$stat[data][$i-1][message]).'
Mirip ga '.$nama.'....
tp g bgitu Jga Kaleee bacanya :p',
);
}else{
$text = array(
'Pengenya seh Q tdi bikin Status Keg Gini
'.$stat[data][$i-1][message].'
Eh... Udah keduluan Ama '.$nama.' Yaudah lah Q kasi Like + Comment buat '.$stat[data][$i-1][from][name].'... Hahaha.... :p',);
}
}
if($robot == 'biasa'){
$text = array(
'Ok tok ezt '.$nama.'...!!!',
'Like Ndiszzz '.$nama.'',
' '.$ucapan.' '.$nama.'....!!! :D',
' '.$nama.' '.$ucapan.'',
'statusmu Siiip!!! tenan '.$nama.' bikin Tanganq gatel2 untuk Like Ndhizz',
'aaaaaaaaaaaa jumpa lgi ma '.$nama.'....
'.$ucapan.' '.$nama.'',
'tambah suwe '.$nama.' tambah sip ae rek...',
'akhirnya '.$nama.' bikin status juga...
'.$ucapan.' '.$nama.'...',
'kagen ambek statuse '.$nama.' neh... He He... '.$ucapan.' '.$nama.'',
'status '.$nama.' Emang Te O Pe Be Ge Te... bikin Ngiler kpingin Ngasi comment...',
'maaf '.$nama.' Q cma mo ngucapin '.$ucapan.'',
'q slalu setia menemani status '.$nama.'....!!! '.$ucapan.'',
'sesepi hari tanpa mentari...
sesepi malam tanpa rembulan...
begitu juga Q...
terasa sepi sebelum comment di status '.$nama.' dan ngucapin '.$ucapan.'...
haha glodak',
'pencet tombol like dulu di status '.$nama.' trus Q kasih komen dah...okee sip!!'
);
}

if($robot == 'nomer'){
$compret=json_decode(auto('https://graph.facebook.com/'.$stat[data][$i-1][id].'/comments?access_token='.$access_token.'&limit=50&fields=message,from'),true);
$nom = $stat[data][$i-1][comments][count]+1;
$cm_id_a = $compret[data][0][from][id];
$taga='@['.$cm_id_a.':1]';
if(count($compret[data]) == 1 ) $hahay = '0'; else $hahay = count($compret[data])-1;
$cm_id_z = $compret[data][$hahay][from][id];
$tagz='@['.$cm_id_z.':1]';
$cmno = count($compret[data])-1;
if($cmno <= 0 ){
$mescma = $compret[data][0][message];
$mescmz = $mescma;
}else{
$mescma = $compret[data][0][message];
$mescmz = $compret[data][$hahay][message];
}
if($nom == 1){
$text = array(
'assseeeeeeekkkk no '.$nom.' neh commentku hehe.... '.$ucapan.' '.$nama,
'Gimana Coment saya gak jadi yg no '.$nom.' wong Statusnya '.$nama.' Keren keg gini
=> '.$stat[data][$i-1][message].'
haha
'.$ucapan.' '.$nama.'',
'Uiiihhhhh status '.$nama.' Keyyyen....
=>
'.$stat[data][$i-1][message].'
twuh khan, jadi jgn salain kalo saya comment Pertamanya.... Hahay '.$ucapan.' '.$nama,
'Yez Yez Yez.... Pertamanya comment di status '.$nama,
'Comment no '.$nom.' dapat piring cantik dari '.$nama.' haha
'.$ucapan,
);
}else{
$text=array(
'yaaaaaaaaaaaaaaah.... comment Pertamanya Keduluan ama @['.$cm_id_a.':1]
pi ga papa ez '.$nama.' meskipun cuma jd yang ke-'.$nom.' yg penting dah Hadir bukan begitu '.$nama.'
upzzzz... dapet Posisi comment di bawahnya @['.$cm_id_z.':1] aDHemmm wkwkwkwk',
'yaaaaaaah... no '.$nom.' ne '.$nama.'...!!!
yaudah Ngikut Comment dari @['.$cm_id_z.':1] aja...
=> '.$mescmz.'
eh eh... Liat twuh '.$nama.'.... @['.$cm_id_a.':1] Senyum Senyum Karena dapet posisi Pertma :p',
'Lagi2 @['.$cm_id_a.':1] dapet Posisi pertama comment di status '.$nama.'.... Jadi malu neh mo Comment klok cuma jadi yang ke-'.$nom.' hihihi....',
'asssyeeeeekkk pertamanya....
Upzzz.... Maap '.$nama.' ga jadi... hahahaha ada @['.$cm_id_a.':1]...!!! aQ kira commentQ yg pertama ternyata yang ke-'.$nom.' Hadddewww',
$ucapan.' '.$nama.' wah '.$nama.' ga bilang bilang lok mo bikin status jdi telat ne jempol saya.... Eh @['.$cm_id_a.':1] udah Hadir pula...!! '.$ucapan.' @['.$cm_id_a.':1] pa kabar....!!!',
'maap gak bisa no 1 '.$nama.'... Kalah cepet ama '.$taga.' maklum Jempol Saya kesleo gara2 Balapan ma '.$tagz.' Buat comment Status kamu.... xixixixi',
'Walopun commentya cuma no '.$nom.' n Ga Secepet '.$taga.' Tapi Lok Commet dibawahnya '.$tagz.' Rasanya Gimanaaaa gitu....... :p',
'Yaaahhhh Mo coment gini => '.$mescmz.'
Udah di duluin Ama '.$tagz.'....!!!',
'Tau ga '.$nama.' Comment Di bawahnya '.$tagz.' Adem-Adem Gimanaaaa Gitu.... WKWKWKWKWKWK Sayang saya Ga bisa Seperti '.$taga.' yg selalu jadi no-1 :p....',
'maap '.$nama.' Saya ngikut Comentnya '.$tagz.' aja Lah.... Udah Keriting jari saya...:p
=> '.$mescmz.'',
$ucapan.' '.$nama.'....!!!
Pengen deh... Keg '.$taga.' Selalu jadi no-1 Comment di status '.$nama.'....',
);
}
}


}
}
}
}
}
}
}
}
}
}
}
}

$message =$text[rand(0,count($text)-1)];

auto('https://graph.facebook.com/'.$stat[data][$i-1][id].'/comments?access_token='.$access_token.'&message='.urlencode($message).'&method=post');
auto('https://graph.facebook.com/'.$stat[data][$i-1][id].'/likes?access_token='.$access_token.'&method=post');
echo $stat[data][$i-1][from][name].'=> '.htmlspecialchars($stat[data][$i-1][message]).'<br/>Komeng => '.$message.'<hr/>';
}
}
}

function auto($url){
$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_URL, $url);
$ch = curl_exec($curl);
curl_close($curl);
return $ch;
}

?>
