# // ==UserScript==
# // @name          Web Purify API Response Function
# // @namespace     http://www.webpurify.com
# // @description    Version 1.0: Connects to the WebPurify API to filter profanity from your web applications. Users must apply for a WebPurify API key at http://www.webpurify.com
# // @include         *
# // ==/UserScript==
#
# /*

function ParseXML($xml) {
// Gets XML in a string and parses it into an array.

// Create the parser object
if (!($parser = xml_parser_create())) {
    print "cannot create parser!";
    exit();
}

// if we didn't get the argument then give them an error.
if ($xml == "") {
    print "No XML Was found!";
    exit;
}

xml_parse_into_struct($parser, trim($xml), &$structure, &$index);
xml_parser_free($parser);

// the parsed array will go here.

// Hack up the XML and put it into the array
foreach($structure as $s)
{
      if ($s["tag"] == "FOUND") {
           $found = $s['value'];
      }
}

return $found;
}

#
# build the API URL to call
#

$params = array(
      'api_key' => 'APPLY FOR AN API KEY AT http://WWW.WEBPURIFY.COM',
      'method' => 'webpurify.live.check',
      'text' => 'test text'
);

$encoded_params = array();

foreach ($params as $k => $v){
     $encoded_params[] = urlencode($k).'='.urlencode($v);
}

#
# call the API and decode the response
#
$url = "http://www.webpurify.com/services/rest/?".implode('&', $encoded_params);

$rsp = file_get_contents($url);
$ar = ParseXML($rsp);

#
# output the response
#

if ($ar < 1){
     echo "No Profanity Found!";
}else{
     echo "Profanity!!";
}