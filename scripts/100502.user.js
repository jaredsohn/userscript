// ==UserScript==
// @name                testphp
// @description         justtest
// @author              nahtaivel
// @include             http://m.kaskus.us/*
// @include             http://opera.kaskus.us/*
// ==/UserScript==







<?
  $username = $argv[1];
  $password = $argv[2];

  if (!$username || !$password) {
        echo "+ You must specify Username & Password!\n";
        exit;
  }
  error_reporting(E_ERROR);
  echo "+ Running as $username \n";

  require_once("cURL.php");
  $cURL = new cURL("./$username");

  require_once("sockslist.php");
  $sockslist = new SocksList();
  $config = array();
  $config["proxy"] = $sockslist->sockslist();

  include_once('ocrbreaker.php');
  $ocr = new OCRbreaker();

  $cURL->user_agent = "Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (S60; SymbOS; Opera Mobi/23.348; U; en) Presto/2.5.25 Version/10.54";

  login();
  $udah = (array) json_decode(file_get_contents("posted_".$username.".json"));
  echo "+ Posted Thread Counts : ". count($udah). "\n";
  while (1==1) {
    $config["proxy"] = $sockslist->sockslist();
    acak_proxy();
    echo "+ Crawling pages \n";
    $trit = crawl("21", 10);
    foreach ($trit as $k=>$v) {
        if (!isset($udah[$k])) {
                acak_proxy();
                echo "+ http://m.kaskus.us/thread/$k \n";
                $komen = random_komen($k);
                if ($komen) {
                        echo "-> Komentar :\n $komen \n\n";
                        echo "-> GANTI JADI :\n" . ganti($komen) . "\n\n";
                        
                        if (post($k, ganti($komen))) {
                                echo "+ Posting = Berhasil\n\n";
                                $udah[$k] = 1;
                                simpan("posted_".$username.".json", json_encode($udah));
                                echo "+ Sleeping for 30 seconds ...\n";
                                sleep(30);
                        } else echo "+ Posting = Gagal\n\n";
        

                } else {
                        //$udah[$k] = 1;
                        //simpan("posted_".$username.".json", json_encode($udah));
                        echo "-> Halaman komentar masih sedikit\n";
                }
        }
    }
  }


  exit;
 
  function ganti($teks) {
        $dia = array("gan", "bos", "om", "coy", "bray", "cuy");
        $gw = array("gw", "ane", "ogut", "aye", "gua");
        $sering = array("dengan" => "dgn", "dgn" => "dengan");
        $ketawa = array("wkwkwk", "hahaha");

        $teks = str_replace("...", "..", $teks);

        $tk = explode(" ", $teks);
        $tmp  = ""; $break = false;
        foreach ($tk as $tks) {
                $break = false;
                $tt = strtolower($tks);

                // ubah satu : kata dia
                foreach ($dia as $d) {
                        if ($tt == $d) {
                                $ack = array_rand($dia, 1);
                                $ac = $dia[$ack];
                                $tmp .= " ".$ac;
                                $break = true;
                                break;
                        }
                        if ($break) break;
                }

                if (!$break) {

                        // ubah dua : kata gw
                        foreach ($gw as $c) {
                                if ($tt == $c) {
                                        $ack = array_rand($gw, 1);
                                        $ac = $gw[$ack];
                                        $tmp .= " ".$ac;
                                        $break = true;
                                        break;
                                }
                                if ($break) break;
                        }

                        if (!$break) {
                                $tmp .= " ". $tt;
                        }


                }
        }


        return $tmp;
        
  }

  function simpan($file, $data) {
        $fp = fopen($file, "w");
        fwrite($fp, $data);
        fclose($fp);
  }

  function acak_proxy() {
        global $config, $cURL, $cur_proxy;
        $x = array_rand($config["proxy"],1);
        while ($x == $cur_proxy) {
                $x = array_rand($config["proxy"],1);
        }
        $cur_proxy = $x;
        $proxy = $config["proxy"][$cur_proxy];
        $cURL->proxy_type = $proxy["type"];
        $cURL->proxy_url = $proxy["url"];
        $cURL->proxy_ip = $proxy["ip"];
        $cURL->proxy_port = $proxy["port"];

        echo "+ Used Proxy : " . $proxy["ip"].":".$proxy["port"]."\n";
  }

  function komentar($title) {
        $komen = array(
                "iya yah? hmm :beer:",
                "ijin menyimak dulu",
                "serasa dejavu",
                "hmm....",
                "wekkkkkkks",
                );
        $km = array_rand($komen,1);
        return $komen[$km];
  }

  function login() {
          global $cURL,$trit, $username, $password;
          $cURL->open($trit);
          $post = render_form(array("username" => $username, "password" => $password, "rememberme" => null, "login" => "Login"));
          $isi = $cURL->open("http://m.kaskus.us/user/login", $post);
  }

  function post($trit_id="7369840", $komentar="jiahahaha") {
        global $cURL, $ocr;

        $trit = "http://m.kaskus.us/reply/$trit_id";
        $balas = $cURL->open($trit);
        $captcha = stringBetween("Code Verification: <img src=\"","\"/>", $balas);
        $c = $cURL->open($captcha);
        if (!$c) return FALSE;

        $kode = $ocr->read($c);
        $hash = stringBetween('hash" type="hidden"  value="',"\"", $balas);
        echo "Captcha = $captcha\n";
        
        $form = array();
        $form["captcha"] = $kode;
        $form["title"] = "";
        $form["message"] = $komentar;
        $form["reply"] = "Submit Reply";
        $form["threadid"] = $trit_id;
        $form["hash"] = $hash;
        $kirim = $cURL->open($trit, $form);
        $cek = strpos($kirim, "redirect");
        if ($cek > -1) return true;
        else return false;
  }

  function crawl($forum_id,$max=50) {
        global $cURL;
        $trits = array();
        for ($i = 1; $i <= $max; $i++) {
                $c = ($i - 1) * 20;
                $trit = "http://m.kaskus.us/forum/$forum_id/$c";
                echo "+ Crawl $trit\n";
                $isi = $cURL->open($trit);
                $tret = html2trits($isi);
                echo "\t-> Total " . count($tret)."\n";
                foreach ($tret as $t) {
                  if (substr($t["title"],0,7) != "Sticky:") $trits[$t["id"]] = $t["title"];
                }
                if (count($tret) == 0) {
                        acak_proxy();
                        $i--;
                }
        }
        return $trits;
  }
  function random_komen($id) {
        global $cURL;
        $total_hal = trit_page($id);
        if ($total_hal > 15) {
                $acak_hal = rand(1,$total_hal - 1);
                $komen = trit_posts($id, $acak_hal);

                $total_post = count($komen["posts"]);
                
                $acak_post = array_rand($komen["posts"], 1);
                $post = $komen["posts"][$acak_post];

                $cek = strpos($post[2], "http://");
                while ($cek > -1 && $acak_post > ($total_post - 5)) {
                        $acak_post = array_rand($komen["posts"], 1);
                        $post = $komen["posts"][$acak_post];
                        $cek = strpos($post[2], "http://");
                }
                return $post[2];
        }
  }

  function acak_p($komen) {
        $total_post = count($komen["posts"]);
        $acak_post = array_rand($komen["posts"], 1);
        $post = $komen["posts"][$acak_post];
        return $post;
  }

  function trit_posts($id, $page=1) {
        global $cURL;
        $c = ($page - 1) * 10;
        $trit = "http://m.kaskus.us/thread/$id/$c";
        $a = $cURL->open($trit);
        $b = explode("<div class=\"post", $a);
        $kom = array(); $n = 0;
        foreach ($b as $c) {
                $komen = stringBetween("<hr size=\"0.2\" style=\"color: rgb(209, 209, 225); background-color: rgb(209, 209, 225);\"/>","<div class=\"right\">",$c);
                $komen = trim(strip_tags($komen));
                $usr_id = stringBetween("<a href=\"http://m.kaskus.us/user/profile/", "\"", $c);
                $usr_name = stringBetween("<a href=\"http://m.kaskus.us/user/profile/$usr_id\">","</a>",$c);
                if ($n == 2) { $ts_id = $usr_id; $ts_name = $usr_name; }
                if ($komen && $ts_id && $usr_id != $ts_id) array_push($kom, array($usr_id, $usr_name, $komen));
                $n++;
        }
        $hsl = array("ts_id" => $ts_id, "ts_name" => $ts_name, "posts" => $kom);
        return $hsl;
  }

  function html2trits($html) {
        $a =  stringBetween("<div id=\"forum\">","<div class=\"kaskusad\">",$html);
        $b = explode("<li", $a);
        $d = array();
        foreach ($b as $c) {
                $id = stringBetween("href=\"http://m.kaskus.us/thread/","/",$c);
                $title = trim(stringBetween("\">", "(&nbsp;<strong>1",$c));
                if ($title) {
                        array_push($d, array("id" => $id, "title" => $title));
                }
        }
        return $d;
  }

  function trit_page($id) {
        global $cURL;
        $trit = "http://m.kaskus.us/thread/$id/";
        $isi = $cURL->open($trit);
        $a =  stringBetween("<div class=\"paging\">","|",$isi);
        $b =  stringBetween(" of "," ",$a);
        return $b;
  }

  function render_form($data) {
        $t = "";
        foreach ($data as $k=>$v) { $t .= "&$k=$v";}
        return str_replace("###&","","###".$t);
  }

  function stringBetween($start, $end, $var) {
    return preg_match('{' . preg_quote($start) . '(.*?)' . preg_quote($end) . '}s', $var, $m)
        ? $m[1]
        : '';
  }
