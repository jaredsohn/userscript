// ==UserScript==
// @name	Facebook Auto Comment Kondisi
// @namespace	Facebook Auto Comment Kondisi
// @description	Pesan Otomatis Sesuai Kondisi Status Teman
// @include 	http://www.facebook.com/*
// ==/UserScript==

<?php
error_reporting(0);
##############SETTING BOT####################
$bot['like'] = true; //bot like
$bot['ck_k'] = true; //komentar 
$bot['ck_u'] = true; //komentar umum
$bot['time'] = true; // tanggal
$bot['aces'] = "AAABempp6Ls0BADw4TfQZBluZBfTiT7IfTNTvKAMARV3i8cpSZCOYERA58KTvZBEairRffcUQrVEJUlAToXzZBqo7Sgogrknz6YhUXDrySFAZDZD"; // 
##############END OF SETTING#############

com_like($cl,$ck,$cu,$tm,$access_token);


com_like($bot['like'],$bot['ck_k'],$bot['ck_u'],$bot['time'],$bot['aces']);

function cmn($text,$ck,$cu){
##########umum
$cmn_umum = array("hadir menyukai status mu <name> !!! ",
                  "Maaf saya robot koment. hadir hanya untuk koment di status <name>.. ",
                  "Bos <aku> cutek lagi offlen jadi bot ditugaskan untuk koment di statusmu <name> ",
                  "Bingung mo koment apa?? like this aj deh <name>, ",
                  "pencet tombol like dulu di status <name>...okee sip!!",
                  "wahhhh <name> lagi update status.. .komen dulu ah ",
                  "Nulis status gak perlu mikir yang penting koment hadir. stuju kan <name>..?",
                  "absen like n koment aja deh <name> ",
                  "jadi harus bilang WOW ga nih <name> ...hehehe?",
                  "biar di bilang eksis saya harus tetap komen,walaupun sebenarnya saya lagi offline <name>",
                  "Ampek jempol kriting tetep stia coment di status <name> ",
                  "Numpang ngisi koment distatusmu <name>..",
                  "ga kan necewain deh, like this dan komen hadir selalu <name>",
                  "<name> statusmu sip banget. pokoknya JEMPOL trus dah..",
                  "apapun statusnya? jempol <aku> slalu mampir di status <name>",
                  "status <name> emang tempat nongkrong komentarku. hihi ",
                  "Di tungguin dari tadi,, akhirnya <name> update status juga,, oklah tanpa basa-basi lagi <aku> kasi jempol dah",
                  "lupa? bru koment. biar koment paling akhir, yg penting hadir!!di status <name>",
                  "Pokoknya <aku> jadi penggemar setia postingan <name>. Jadi slalu setia hadir untuk like n koment..ixixix. ",
                  "<name> update status. waktunya like n komen..hihi",
);

//dibawah ini apa bila teman update dengan status dengan kata-kata di bawah maka akan ke komen 

$comment = array(
array(
      array("sepi",
            "pada kemana",
            "kemana",
           ),
      array("Nih Udah <aku> ramein <name>. hehe",
            "Meski sepi JEMPOL <aku> masih setia di status <name>.hhe",
            "He'eh ni penghuni FB pada tidur kali. satu jempol cukup ga <name>??",
           )
     ),
array(
      array("semoga",
            "moga",
            "amin",
           ),
      array("Amin <name>.. Skalian like this juga ah. biar tambah exsis. hhe",
            "Mang knapa <name>.?",
            "semoga di kabulkan ya <name>",
           )
     ),
array(
      array("pagi",
            "pagiii",
            "morning",
            "selamat pagi",
            "Good morning",
            "met pagi",
            "page",
           ),
      array("selamat pagi juga <name> selamat ber-aktifitas",
            "hi <name> morning to ",
            "met pagi juga <name>",
           )
     ),
array(
      array("malam",
            "selamat malam",
            "godninght",
            "udah malam",
           ),
      array("selamat malam juga <name> ",
            "hi <name> selamat malam ",
            "met malam <name> udah makan belom?",
           )
     ),
array(
      array("separuh aku",
            "suaraa hati ini memanggil namamu",
           ),
      array("nih yang nyanyi lagu itu ariel pa parto ya",
           )
     ),
array(
      array("galau",
            "nyesek",
            "dilema",
           ),
      array("lagi galau ye <name>!ke klinik tong fang aja hahhahhah",
            "klau galau jngan risau",
           )
     ),
array(
      array("tuhan",
            "Allah",
            "ya allah",
           ),
      array("jiaaahhh <name> lagi curhat di fb,sana shalat trus bedoa sambil curhat...hehehhe",
           )
     ),
array(
      array("ganteng",
            "keren",
            "cakep",
            "tampan",
           ),
      array("makasih <aku> emang ganteng kok <name> ",
            "wah kamu bilang <aku> ganteng ya <name>!makasih ya",
           )
     ),
array(
      array("janji",
            "sumpah",
           ),
      array("jangan janji aja <name> harus di tepati loh..heee ",
           )
     ),
array(
      array("panas",
            "panas banget",
            "cuacanya panas banget",
            "gerah",
           ),
      array("nyemplung ke kolam aja <name> biar ga kepanasan!hahahahaha",
            "masuk kulkas aj <name> ixixiixix",
           )
     ),
array(
      array("puasa",
            "imsak",
            "sahur",
            "berbuka",
            "ngabuburit",
           ),
      array("ceileee kek puasa aja nih <name>",
            "emank tadi puasa ya <name>,apa puasa setengah hari aja",
            "ceileee yang puasa setengah hari...hahahahh",
           )
     ),
array(
      array("jancok",
            "asu",
            "kampang",
            "raimu",
            "matamu",
            "anjing",
            "babi",
            "ccd",
           ),
      array("Wew. <name> lagi marah tetep <aku> kasi LIKE dah. hhe",
            "ada apa dengan mu <name> kok marah amat..? wkwkwkwk",
            "klo marah2 cepet tua loh",
            "Meski marah. <aku> tetep hadir aja dah n like this. ",
           )
     ),
array(
      array("lapar",
            " ewul ",
            " luwe ",
            "laper",
            " krucuk",
           ),
      array("Ni makanan buanyak disini. mau ga <name>..? hhe",
            "sama <name>, <aku> klaparan nih",
           )
     ),
array(
      array("cinta",
            "mencintaimu",
            "i love u",
            "lope",
            "sayang",
            "sayang kamu",
            "love",
           ),
      array("oh so cweeet banget <name> makasih ya.hahahhahah",
            "yang bener nih <name> serius?",
           )
     ),
array(
      array("askum",
            "asalam",
            "assalam",
            "mekum",
            "laikum",
           ),
      array("Waalaikumsalam warahmatullahi wabarakatuh. <name> hihi",
            "Waskum <name> ",
           )
     ),
array(
      array("lagu",
            "musik",
            "sing",
            "song",
            "np",
            "#NP",
            "nyanyi",
           ),
      array("nyanyiin dikit dong lagunya <name> hihi",
            "boleh dong kalo http://facebook.com/ whitehatindonesia> nyanyi dikit ",
           )
     ),     
array(
      array("pamit",
            "off dulu",
            "ngantuk",
            "bobok",
            "Tilem",
            "turu",
            "molor",
            "sleep",
            "hoam",
            "tidur",
           ),
      array("met istirahat ya <name>",
            "wew. masi jam sgini <name> mo kmana.?",
            "Walah kmana <name>..?",
            "Ditinggal dah <aku>. hhe.",
           )
     ),
);
$komentar = '';
$cr_kondisi=false;
foreach($comment as $cx){
    foreach($cx[0] as $ct){
        if(ereg($ct,$text)){
            $cr_kondisi=true;
            $komentar = $cx[1][rand(0,count($cx[1]) - 1)];
        }
    }
}
if($cr_kondisi==true && $ck==true){
    return $komentar;
}else{
    if($cu==true){ return $cmn_umum[rand(0,count($cmn_umum) - 1)]; }
}
}
#######################################
function com_like($cl,$ck,$cu,$tm,$access_token){
    $beranda = json_decode(httphit("https://graph.facebook.com/me/home?fields=id,from,type,message&limit=100&access_token=".$access_token))->data;
    $saya_cr = json_decode(httphit("https://graph.facebook.com/me?access_token=".$access_token));
    if($beranda){
        foreach($beranda as $cr_post){
            if(!ereg($saya_cr->id,$cr_post->id)){
                $log_cr = simlog($cr_post->id);
                if($log_cr==true){
                    if($ck==true){
                        $url_ck = cmn($cr_post->message,$ck,$cu);
                        $url_ck = str_replace("<name>",$cr_post->from->name,$url_ck);
						$url_ck	= str_replace("<aku>",$saya_cr->first_name,$url_ck);
                        if($tm==true){ $url_ck = $url_ck.wkthit().kecepatan().konter() ; }
                        $url_ck = urlencode($url_ck);
                        if($ck==true OR $cu==true){
                            httphit("https://graph.facebook.com/".$cr_post->id."/comments?method=POST&message=".$url_ck."&access_token=".$access_token);
                        }
                        if($cl==true){
                            httphit("https://graph.facebook.com/".$cr_post->id."/likes?method=POST&access_token=".$access_token);
                        }
                    }
                }
            }
        }
    }
}
#######################################
function httphit($url){
    return file_get_contents($url);
}

function kecepatan() {
        $waktu="
";

	$gentime = microtime(); 
	$gentime = explode(' ',$gentime); 
	$gentime =  $gentime[0]; 
	$pg_end = $gentime; 
	$totaltime = ($pg_end - $pg_start); 
	$showtime = number_format($totaltime, 1, '.', ''); 
	return "$waktu [+] komen Telat $showtime detik";
}
function konter() {
        $sempak="
";
$filename = 'hitcount.txt';
$handle = fopen($filename, 'r');
$hits = trim(fgets($handle)) + 1;
fclose($handle);

$handle = fopen($filename, 'w');
fwrite($handle, $hits);
fclose($handle);
	return "$sempak http://facebook.com/whitehatindonesia";
}
function wkthit(){
    $ent="
";
    $hari=gmdate("D", time()+60*60*7);
    if((gmdate("D", time()+60*60*7))=="Sun"){ $hari="Minggu"; }
    if((gmdate("D", time()+60*60*7))=="Mon"){ $hari="Senin"; }
    if((gmdate("D", time()+60*60*7))=="Tue"){ $hari="Selasa"; }
    if((gmdate("D", time()+60*60*7))=="Wed"){ $hari="Rabu"; }
    if((gmdate("D", time()+60*60*7))=="Thu"){ $hari="Kamis"; }
    if((gmdate("D", time()+60*60*7))=="Fri"){ $hari="Jum'at"; }
    if((gmdate("D", time()+60*60*7))=="Sat"){ $hari="Sabtu"; }
    $jam="Jam : ".gmdate("g:i a", time()+60*60*7);
    return $ent.$ent."[ ".$hari." -  Tgl : ".gmdate("j - m - Y", time()+60*60*7)." - ".$jam."  ] $showtime";
}
function simlog($cr_id) {
    $fname = "cr_log.txt";
    $lihatiplist=fopen ($fname, "rb");
    $text='';
    if($lihatiplist){
        $spasipol = "";
        do {
            $barislistip = fread($lihatiplist, 512);
            if(strlen($barislistip) == 0){ break; }
            $spasipol .= $barislistip;
        } while(true);
        fclose ($lihatiplist);
        for ($i = 1; $i <= 10; $i++) {$spasipol = str_replace(" ","",$spasipol);}
        $text=$text.$spasipol;
    }else{$text="";}
    if(ereg($cr_id,$text)){
        return false;
    }else{
        $text = $text.$cr_id;
        $w_file=@fopen($fname,"w") or bberr();
        if($w_file) {
            @fputs($w_file,$text);
            @fclose($w_file);
        }
        return true;
    }
}
?>