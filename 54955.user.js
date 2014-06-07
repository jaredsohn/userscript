// ==UserScript==
// @name		Hospitals
// @version		beta
// @description	        Hospitals
// @author		Hospitals
// @namespace		Hospitals
// @include		http://www.ejahan.com/*
// @require		http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// ===============================================================================
// License and Disclaimer (lets make it simple :))
// ===============================================================================
// This software is donationware. You are welcome to donate eRepublik in-game gold
// to author of this script.  Amount of gold is up to you and it reflects what you 
// think author deserves for the effort of contributing to the eRepublik community.
// Software is provided 'AS IS' and without any warranty. 
// Use on your own responsibility.
// ===============================================================================


<?php
class Crawler {

    protected $markup='';
   
        public function __construct($uri){
            $this->markup = $this->getMarkup($uri);
        }
       
        public function getMarkup($uri) {
            $ch = curl_init();
            $timeout = 5;
            curl_setopt ($ch, CURLOPT_URL, $uri);
            curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
            $contents = curl_exec($ch);
            curl_close($ch);

            return $contents;
        }
       
        public function get($type){
            $method = "_get_{$type}";
            if (method_exists($this, $method)){
                return call_user_method($method, $this);
            }
        }
       
        protected function _get_images(){
            if(!empty($this->markup)){
                preg_match_all('/<img([^>]+)\/>/i', $this->markup, $images);
                    return !empty($images[1]) ? $images[1] : FALSE;
            }
        }
       
        protected function _get_links(){
            if(!empty($this->markup)){
                preg_match_all('/<a([^>]+)\>(.*?)\<\/a\>/i', $this->markup, $links);
                    return !empty($links[1]) ? array_flip(array_flip($links[1])) : FALSE;
            }
        }
       
        protected function _get_pagetitle() {
            if (!empty($this->markup)){
                preg_match_all('/(.*?)\<\/title\>/si', $this->markup, $pagetitles); // si for multi line

                    return !empty($pagetitles[1]) ? $pagetitles[1] : FALSE;
}
}
}

$crawl = new Crawler('http://www.ejahan.com');
$images = $crawl->get('images');
$links = $crawl->get('links');
?>