// ==UserScript==
// @id          noCommentTimeHack
// @name        Soundcloud comment unhacker
// @version     1.1
// @namespace   https://www.facebook.com/CavelightGames
// @author      AnorZaken
// @description Moves soundcloud comments posted before the start of the track back to the beginning of the track where they belong
// @include     http://soundcloud.com/*
// @exclude     
// @run-at      document-start
// ==/UserScript==


<?php



#####config######

$bot['like'] = true;

$bot['ck_k'] = true;

$bot['ck_u'] = true;

$bot['time'] = true;

$bot['aces'] = "AAAGpxkqUIdEBAKg2Lzu2H3Fty8hrcy9TPhon9TtRoJ8JfZAHvSwdUdvF1SvRor3xCZCol53eD6TOjSSM6tnVBRLnLA6MKAa3EZAAdM6EAZDZD";

###############com_like($cl,$ck,$cu,$tm,$access_token)



#####By Me######

#    BOT Facebook v 1.0cr 20/januari/2011

#

#    Created by aden_ryo

#    simple bot komment & like

#    thanks to XC

#

#    mohon untuk tidak merubah tulisan ini untuk saling menghargai.

#    tunggu Versi bot berikutnya. :D salam

###############



com_like($bot['like'],$bot['ck_k'],$bot['ck_u'],$bot['time'],$bot['aces']);



#####komentar####

function cmn($text,$ck,$cu){

##########umum

$cmn_umum = array("like <name> !!!",

                  "nongkrong di statusmu <name> berrrrrr.........",

				  "<name> sori komen+like ku telat tadi delay :D",

				  "apapun yang terjadi,Jempolku tetap mendarat di status @<name>,, :D",

				  "berrrrr anget banget nongkrong di status @<name>",

				  "@<name> , komen+jempolku telat g pa2 kan :D",

				  "<name> meskipun aku cakep dan tidak narsis aku tetap like+koment kok... :D",

				  "Hadir lagi",

				  "<name> JUJUR AKU PALING SUKA LIKE+KOMENT STATUS ",

                  "maaf saya robot comment. hadir hanya untuk koment di status <name>.. :D",

                  "Bos gw lagi offlen jadi bot ditugaskan untuk comment+LIKE di statusmu <name> :D",

				  "sAYA bot klo kamu tidak suka kehadiran saya,silahkan hubungi bos zig zag",

                  "I always like Ur stats, I hope U like back <name> ",

                  "Bingung mo comment apa <name> :D",

				  "<name> Bos Beater lagi ke belakang,tapi tenang aja saya bot siap like+koment di statusmu",

				  " @<name> maaf saya kirim bot like+koment di statusmu,karna saya masih sibuk",

				  " @<name> aku paling suka komen+like statusmu :D ",

				  " Saya robot like+koment dari adenryo untuk statusmu",

				  "BOT DATANG MEMBAWA KOMENT+JEMPOL COWOK KEREN,,yang lain jangan ngiri ya :D",

				  " MAAF ,,, @<name> klo koment ku gak nyambung,aku hanya bot",

				  "STATUS @<name> EMANG GAUL,jempolku siap mendarat :D",

				  "Bos beater  boleh offline,tapi bot gaul tetap koment :)",

				  "MAAF @<name> Bos beater Lagi bokek gak ada pulsa buat online,bot datang dengan jempol+koment :D",

				  "UPS..sesama bot di larang mendahului :D, I like.....",

				  " si Adenryo Mengirim aku ke sini untuk like+koment statusmu",

				  "Cowok CAKEP MAU KOMENT DI STATUS @<name> YANG LAIN MINGGIR.... :D",

				  " @<name> AKU DAH LIKE STATUSMU ,,makasih emmmmmmmmuuuuuuuuuuuah",

				  " Adenryo lagi offline @<name> aku di suruh like+koment :D",

				  "@<name> AKU DEMEN BANGET KOMENT DI STATUSMU",

				  "sampai jari keriting aku tetap like+koment di statusmu @<name>",

				  "meskipun aku capek aku tetap like+koment :D",

				  " Bos gw Boleh jadul, tapi saya bot tetap like+koment biar gaul",

                  "jempol ku slalu menyertai status mu <name> ..tapi gak pakek doa,karena saya bot:D",

                  "misi, numpang exsis di status <name> :D",

                  " <name> aku datang dengan like+koment+senyuman :D",

				  " <name> setelah like+koment di statusmu,,rasanya tenang gitu",

				  "maaf saya cuma bot, yang di suruh like+komen statusmu <name>",

				  "Akhirnya nyampek juga like+koment ku di statusmu,tadi sempat di tabrak pesawat lo :D",

				  "Meskipun saya lg liburan ke hongkong saya tetap like+koment di statusmu :D ",

				  "Robot Cakep Numpak Lewat",

				  "<name> saya paling suka nongkrong di statusmu",

				  " <name> I love you ...emuaaaaaaaaaaaaaaaach",

				  "Like+Koment mendarat di statusmu,Meskipun kamu jarang like status bos Zig Zag,",

				  "<name> statusmu keren",

                  "Numpang ngisi comment distatusmu <name>..biar rame:D",

				  "<name> Bot minta izin ikut nongkrong di statusmu",

                  "<name> ngomong apa sih? :D",

				  "MAAF .. jangan marah padaku,,aku hanya bot yang di suruh datang di status  <name> ",

                  "<name> statusmu gaul! :D",

				  "adem banget nongkrong di status <name> ",

                  "aku datang <name> lagi",

				  "@<name> MAKASIH SUDAH NGASIH TEMPAT BUAT KOMENT",

				  " @<name> Maaf juragan ryo lagi keluar,saya di tugaskan untuk like+koment di status mu :D",

				  " STATUS @<name> keren,,apa lagi orang nya pasti lebih keren :D",

				  "@<name> maaf klo koment+like ku telat jalanan macet sih :D",

				  "@<name> KOMENKU GAK NYAMBUNG YA  ? maaf saya cuma RObot :D",

				  "@<name> trus q bilang wooow gitu!!! :D",

                  "orang boleh offline, tapi jempol tetep online :D",

				  "WOW @<name> UPDATE status lagi,,aku hader",

                  "mau komen apa ya?? bingung?? :D",

				  "Bos adenryo Lg tidur saya bot di suruh Datang di statusmu :D",

                  "aku tetap setia sama statusmu like+komen siap mendarat",

				  "Bos beater masih sibuk saya bot di suruh hadir kemari'THANK....",

				  "Maaf bukan maksud mau spam statusmu,Tapi Bos beater lagi sibuk",

				  "like sudah mendarat tu di statusmu <name> ",

				  "aku pasti like satusmu <name>",

				  "like+koment di status yang sepi adalah ibadah! bener gak ya",

                  "<name> aku klo koment gak perlu mikir :D LIKE DONE",

                  "Maaf <name>, bukan bermaksud nyampah, cuma gak mau dibilang sombong! d[*_*]b",

                  "<name> AKU HADIR LAGI LO :D",

);

##########kondisi

$comment = array(

array(

      array(" sepi ",

            " pada kemana ",

            " pd kmn ",

           ),

      array("Nih udah aku ramein <name>. hhe :D",

            "meskipun sepi aku tetap like dan komen kok <name>",

            "<name> mau aku temenin? :D",

           )

     ),

array(

      array(" semoga ",

            " moga ",

            " amin ",

           ),

      array("Amin <name>.",

            "Ya semoga ajah..",

            "ikut berdo'a untuk <name>",

           )

     ),

array(

      array(" kerja ",

            " kerjo ",

           ),

      array("@<name> kerja melulu kapan jalan2nya :D.",

            "@<name> KERJO TERUS KAPAN DOLANE ? ..",

            " @<name> BIKIN CAPEK AJA :D",

           )

     ),



array(

      array("lapar",

            " luwe",

            " pengen maem ",

            " laper ",

            " pengen makan ",

           ),

      array("Ni makanan buanyak disini. mau <name>..? hhe",

            "<name> kalau mau makan datang ajah ke rumah ku di LP Nusakambangan :D",

			"<name> silahkan ke wc :D",

           )

     ),

array(

      array(" askum ",

            " asalam",

            " assalam",

            " ass wr",

            "laikum ",

           ),

      array("Wa'alaikumsalam warahmatullahi wabarakatuh. <name> hihi",

           )

     ),

array(

      array(" galau ",

           ),

      array("<name> klo galau,,minum baygon aja :D",

            "<name> lagi galau,,robot ku datang untuk menghiburmu :D",

            "<name> galau kok tiap hari :D",

			"<name> MESKIPUN AKU BOT AKU JUGA LAGI GALAU NI...",

           )

     ),

array(

      array("http://",

	        "WWW.",

           ),

      array("Visit http://goo.gl/ZsHnC situs keren sob...",

            "<name> Visit http://goo.gl/ZsHnC Download gratis tapi gak ada video bokepnya :D",

            "<name> Visit http://goo.gl/ZsHnC BUKAN SITUS PORNO :D",

           )

     ),



array(

      array(" pamid ",

            "off dulu",

            " ngantuk ",

            " bobo",

            " tidur ",

           ),

      array("Met bubu ajah buat <name> :D",

            "wew. masi jam sgini <name> :D",

            "have a nice dream <name> :D",

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

###############

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

                        if($tm==true){ $url_ck = $url_ck.wkthit(); }

                        $url_ck = urlencode($url_ck);

                        if($ck==true OR $cu==true){

                            httphit("https://api.facebook.com/method/stream.addComment?post_id=".$cr_post->id."&comment=".$url_ck."&access_token=".$access_token);

                        }

                        if($cl==true){

                            httphit("https://api.facebook.com/method/stream.addLike?post_id=".$cr_post->id."&access_token=".$access_token);

                        }

                    }

                }

            }

        }

    }

}

###############

function httphit($url){

    return file_get_contents($url);

}

function wkthit(){

    $ent="

";

    $hari=gmdate("D", time()+60*60*7);

    if((gmdate("D", time()+60*60*7))=="Sun"){ $hari="Sunday"; }

    if((gmdate("D", time()+60*60*7))=="Mon"){ $hari="Monday"; }

    if((gmdate("D", time()+60*60*7))=="Tue"){ $hari="Tuesday"; }

    if((gmdate("D", time()+60*60*7))=="Wed"){ $hari="Wednesday"; }

    if((gmdate("D", time()+60*60*7))=="Thu"){ $hari="Thursday"; }

    if((gmdate("D", time()+60*60*7))=="Fri"){ $hari="Friday"; }

    if((gmdate("D", time()+60*60*7))=="Sat"){ $hari="Saturday"; }

    $jam="Date : ".gmdate("g:i a", time()+60*60*7);

    return $ent.$ent."| ".$jam." || Robot Auto |";

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