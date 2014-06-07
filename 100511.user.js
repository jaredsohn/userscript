// ==UserScript==
// @name                sockslistphp
// @description         justtest
// @author              nahtaivel
// @include             http://m.kaskus.us/*
// @include             http://opera.kaskus.us/*
// ==/UserScript==









<?

  class SocksList {
        
    function sockslist() {
     $proxy = array(); 
     for ($i=1;$i<2;$i++) {
        $html = file_get_contents("http://sockslist.net/proxy/server-socks-hide-ip-address/$i");
        $matches = explode("t_ip", $html);
        $n = 0;

        foreach ($matches as $mt) {
                $ip = $this->stringBetween('">', "</td>", $mt);
                if ($n > 0 && $ip != "") {
                        $pt = explode(",", $this->stringBetween('t_port">', "</td>", $mt));
                        $port = "";
                        $kd = $this->stringBetween('fromCharCode(', '+parseInt', $html);
                        foreach ($pt as $p) {
                                $a = intval($p) + intval($kd);
                                $port .= chr($a);
                        }
                        if ($n > 0 && $ip != "") array_push($proxy, array("type" => "socks", "ip" => $ip, "port" => $port, "url" => ""));
                }
                $n++;
        }
      }
        return $proxy;
    }

    function stringBetween($start, $end, $var) {
      return preg_match('{' . preg_quote($start) . '(.*?)' . preg_quote($end) . '}s', $var, $m)
        ? $m[1]
        : '';
    }
  }
