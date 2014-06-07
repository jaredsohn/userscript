   <?php

// ==UserScript==
// @name          TESTING
// @namespace     http://www.readmore.ch
// @description   Warning when shop refresh 
// @include       http://www.neopets.com/objects.phtml?type=shop&obj_type=*
// ==/UserScript==
     
     set_time_limit(0);
     
     // START PHP WRAPPER
     
     class httpwrapper {
        private $cookies;
        private $lastpage;
        private $html;
        private $headers;

        function __construct() {
            $this->useproxy = false;
            $this->cookies = array();
            $this->lastpage = NULL;
        }

        public function getLastPage() {
            return $this->lastpage;
        }

        public function clearCookies() {
            $this->cookies = array();
        }

        public function req($type, $url, $postdata = NULL, $referer = NULL, $follow_location = true, $return_headers = false) {
            if($referer == NULL) {
                if($this->lastpage != NULL)
                    $r = "Referer: " . $this->lastpage . "\r\n";
            } else
                $r = "Referer: $referer\r\n";

            $url = str_replace("http://", "", $url);
            $host = $this->getHost($url);
            $path = $this->getPath($url);

            $agent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8";

            $type = strtoupper($type);
            if(!in_array($type,array("GET","POST"))) $type="GET";

            $f = fsockopen($host . ":80");
            if($f) {
                $h = "$type $path HTTP/1.1\r\n";
                $h .= "HOST: $host\r\n";
                $h .= "User-Agent: $agent\r\n";
                $h .= $this->cookieString();
                $h .= $r;
                if($type == "POST") {
                    $length = strlen($postdata);
                    $h .= "Content-Type: application/x-www-form-urlencoded\r\n";
                    $h .= "Content-Length: $length\r\n";
                }
                $h .= "Connection: close\r\n\r\n";

                if($type == "POST")
                    $h .= $postdata;

                fwrite($f,$h);
                while(!feof($f))
                    $data.=fgets($f,256);
                list($headers,$html) = explode("\r\n\r\n", $data, 2);
                //list($rand,$html) = explode("\r\n", $html, 2);
                $this->html = $html;
                $this->lastpage = "http://".$url;
                $this->process_headers($headers,$url,$follow_location,$return_headers);
                return ($return_headers) ? $this->headers : $this->html;
            }
        }

        private function getHost($url) {
            if(strpos($url,"/") === FALSE)
                return $url;
            else
                return $this->gsb("<".$url,"<","/");
        }

        private function getPath($url) {
            if(strpos($url,"/") === FALSE)
                return "/";
            else
                return "/".$this->gsb($url.">","/",">");
        }

        private function process_headers($headers,$url,$follow,$return) {
            $this->headers = $headers;
            $lines = explode("\n", $headers);
            foreach($lines AS $line) {
                if(substr($line,0,10) == "Set-Cookie") {
                    $cookie = $this->gsb($line, "Set-Cookie: ", ";");
                    list($key,$val) = explode("=", $cookie, 2);
                    $this->cookies[$key] = $val;
                } else if(substr($line,0,8) == "Location" && $follow == true) {
                    $location = $this->gsb($line.">>", "Location: ", ">>");
                    $this->req("GET", "http://".$this->getHost($url).$location, null, null, true, $return);
                }
            }
        }

        private function cookieString() {
            if(count($this->cookies) > 0) {
                $string = "Cookie:";
                foreach($this->cookies AS $k=>$v)
                    $string .= " $k=$v;";
                return $string."\r\n";
            }
        }

        private function gsb($search, $start, $end) {
            list($a,$b) = explode($start, $search, 2);
            list($a,$b) = explode($end, $b, 2);
            return $a;
        }
    }
    
    // END PHP WRAPPER
    
    $form = <<<FRM
    <html>
    <h2>Neopets Restock Alerter</h2>
    <form method="POST">
    Neopets Username: <input type="text" name="user" /><br />
    Neopets Password: <input type="password" name="pass" /><br /><br /><br />
    <h4>Restock Alerter Settings</h4>
    Refresh Time: <input type="text" name="min" size="2" /> - <input type="text" name="max" size="2" /><br /><br />
    Shop ID: <input type="text" maxlength="3" name="shopid" size="2" /><br /><br />
    Check for Restock Ban?: <input type="checkbox" name="restockban" /> <br />
    ------ Restock Ban Refresher (In Minutes)
    <input type="text" name="rmin" size="2" /> - <input type="text" name="rmax" size="2" /><br /><br />
    <input type="checkbox" name="pausetime" /> Pause every <input type="text" name="pminevery" size="2" /> - <input type="text" name="pmaxevery" size="2" /> minutes for <input type="text" name="pminfor" size="2" /> - <input type="text" name="pmaxfor" size="2" /> minutes.<br /><br />
    List Input
    <textarea name="itemlist"></textarea><br />
    <input type="submit" name="Submit" value="Submit" />
    </form>
    </html>
FRM;

    $banned = <<<FRM
    <script>alert('You have been restock banned! :(');</script>
FRM;

    if(!$_POST["user"] || !$_POST["pass"] || !$_POST['min'] || !$_POST['max'] || !$_POST['shopid'] || !$_POST['itemlist'])
        die($form);
    

    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $refreshTimeMin = $_POST['min'];
    $refreshTimeMax = $_POST['max'];
    $shop = $_POST['shopid'];
    $restockBanCheck = $_POST['restockban'];
    $restockBanMin = $_POST['rmin'] * 60;
    $restockBanMax = $_POST['rmax'] * 60;
    $pauseTimeCheck = $_POST['pausetime'];
    $pauseEveryMin = $_POST['pminevery'] * 60;
    $pauseEveryMax = $_POST['pmaxevery'] * 60;
    $pauseForMin = $_POST['pminfor'] * 60;
    $pauseForMax = $_POST['pmaxfor'] * 60;
    $itemList = $_POST['itemlist'];
    $items = explode("\r\n", $itemList);
    $soldOut = "Sorry, we are sold out of everything! We get restocked every eight minutes or so, so please come back soon.";
    $restock = <<<FRM
    <script type="text/javascript">
    var win = window.open().document;
    win.location = "http://www.neopets.com/objects.phtml?type=shop&obj_type=$shop";
    </script>
    Shop has restocked with one of the items that was on the list! Now restart this Refresher to continue!
FRM;

    $w = new httpwrapper();
    $login = $w->req("POST", "http://www.neopets.com/login.phtml", "username=$user&password=$pass&destination=%2Findex.phtml&x=".rand(0,100)."&y=".rand(0,30), "http://www.neopets.com/hi.phtml", false, true);

    if(strpos($login, "badpassword.phtml") !== FALSE)
        die("Bad Password!");
    elseif(strpos($login, "failed_bday") !== FALSE)
        die("Birthday Needed!");
    elseif(strpos($w->req("GET", "http://www.neopets.com/"), "Welcome, <a") === FALSE)
        die("Reason for error is unknown. You could possibly be frozen! ;-;");
        
    $time = time(); $time2 = $time;
    while(true) {
        $rsWait = rand($restockBanMin, $restockBanMax);
        $pauseWait = rand($pauseEveryMin, $pauseEveryMax);
        $pBetween = (time() - $time) / 60;
        $rBetween = (time() - $time2) / 60;

        if($pBetween >= $pauseWait) {
            sleep(rand($pauseForMin, $pauseForMax));
            $time = time();
        }

        $shophtml = $w->req("GET", "http://www.neopets.com/objects.phtml?type=shop&obj_type=$shop");

        if(strpos($shophtml, $soldOut) !== FALSE && $rBetween >= $rsWait) {
            $restockBanHTML = $w->req("GET", "http://www.neopets.com/objects.phtml?type=shop&obj_type=21");
            if(strpos($restockBanHTML, $soldOut) !== FALSE);
                die($banned);
            $time2 = time();
        }
        foreach($items AS $item) {
            if(strpos($shophtml, $item) !== FALSE) {
                die($restock);
            }
        }
     }
?> 