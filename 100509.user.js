// ==UserScript==
// @name                cURLphp
// @description         justtest
// @author              nahtaivel
// @include             http://m.kaskus.us/*
// @include             http://opera.kaskus.us/*
// ==/UserScript==



<?
  class cURL {
    var $user_agent = "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; Media Center PC 4.0)";
    var $proxy_ip = "";
    var $proxy_port = 0;
    var $proxy_url = "";
    var $proxy_type = "";
    var $status = 0;
    var $error = "";
    var $timeout = 30;
    var $cookies = "";
    var $last_url = "";
    var $fix_cookies = false;

    function __construct($cookies) {
        if (!$cookies) $cookies = tempnam("./", "CURLCOOKIE");
        $this->cookies = $cookies;
    }

    function open($url,$post="") {
        $ch = curl_init();
        if ($this->proxy_url != "") $url = str_replace("%s", str_replace("http://","",$url), $this->proxy_url);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        if ($post != "") {
                curl_setopt($ch, CURLOPT_POST,1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        }

        curl_setopt($ch, CURLOPT_USERAGENT, $this->user_agent);
        curl_setopt($ch,CURLOPT_TIMEOUT, $this->timeout); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch,CURLOPT_REFERER, $this->last_url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        //if ($this->last_url == "")
        curl_setopt ($ch, CURLOPT_COOKIEJAR, $this->cookies); 
        curl_setopt ($ch, CURLOPT_COOKIEFILE, $this->cookies);

        if ($this->proxy_ip != "") {
                curl_setopt($ch, CURLOPT_PROXYPORT, $this->proxy_port);
                curl_setopt($ch, CURLOPT_PROXYTYPE, 'HTTP');
                curl_setopt($ch, CURLOPT_PROXY, $this->proxy_ip);
                if ($this->proxy_type == "socks") curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5);
        }
        $data = curl_exec($ch);
        $this->status = curl_getinfo($ch,CURLINFO_HTTP_CODE);
        $this->error = curl_error($ch);
        $this->last_url = $url;
        curl_close($ch);
        return $data;
    }


  }
