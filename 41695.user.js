// ==UserScript==
// @name          Download Video
// @namespace     http://1024k.de/bookmarklets/video-bookmarklets.html
// @description	  Save video clips from YouTube, Google Video, Myspace, Metacafe, Break.com, Putfile, Dailymotion and Sevenload.
// @include       http://*youtube.com/*
// @include       http://*video.google.*/*
// @include       http://*myspace.com/*
// @include       http://*metacafe.com/*
// @include       http://*break.com/*
// @include       http://*putfile.com/*
// @include       http://*dailymotion.com/*
// @include       http://*sevenload.com/*
// @include       http://*myvideo.de/*
// @include       http://*clipfish.de/*
// ==/UserScript==

function in2html(txt) {
 if (!txt) {
  return ''
 }
 var txthtml = txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 return (txthtml);
}

var backlink = in2html(loc),
    embmedia = new Array(),
    filetype = '',
    fileURL = new Array(),
    found = false,
    home = 'http:\/\/1024k.de\/bookmarklets\/video-bookmarklets.html',
    hometitle = 'title=\"Author\'s homepage\"',
    host = window.location.hostname,
    iframe,
    link,
    loc = window.location.href,
    logobottom,
    logobottomimgsrc = 'data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAfCAMAAAC\/IUHRAAAABGdBTUEAAK\/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADAUExURb3Lwuru7OXq56m9se3w7szX0JGtm2iWfOHn48bSy6W6rZixotri3dDa0\/T29Zy0pX6ijHSchd7l4Nbe2UeJZluQcsjTzPj5+fz9\/LLDuTyGYfL084WlksLPx4yqmOvv4\/r7+b7QoabAcd\/n1PDz6\/X38q7FhMzauLfLk9Pewubr6OXr3MbVrSyDW\/v8\/KzAtPHz8YinlLfHvZaxoLTFu6C3qfn6+ViPcLjIvpuzpJ62p4moldnjyySCWZy6V\/\/\/\/wovOL0AAAVRSURBVHjaYrAnCTCycnFzsTISpxgggBhIMlnOFgLkiDIdIIBIMZvXFgFQDRdiYLM1txLTQlUPEEAkmM0INFLKiIeDx0gK6HJkGROYjWIoGgACCGo2Cy8nyFI+HiNDW4gLxDk4xBHKtDg5tZhtbdlYIKqBhgshJGUQ3uFCNhsggMBmM4iCxHW5TXThigQgFBuDkJk9oyRMnAWqy8jWlgHF1cxM9uJC\/EAGJyciYAACCKTE2BYv4IKzrOztFXQUdeztmYC2wsMaKCEMYcraQtzIA+ECBBADxEsCksDYALkTlL7EhfRtbUW5uUUR5rMxgOSBwalpZ2cH1AYUkoaaLQl0NcwedqhyZjMQDyCAGMBeYgUx9fQFhGGKWKC+ZxKzsoUFszAfkFCEm21rCUorWpKQoLKxU9K2t+diYIC4URBkM0AAMUjowr1kL4EtefAxsyGJI5lta8trzwCiRIFBBRS2gSrRA\/ra1hxoOEAAMXBAgk7ZRgUsYaNhZ6ekrgBULS+vAPMEkGcD0qlqow00WwkYahy8IANswTHFD5SXB5qtYo8cBZb29gABxAAMf1mQl+yUgEapAE0GAQ0FewhLUVMVpFgByJO3V1ACOg4oBrUR7HmwyRD9QErFxgbsRi2wpwACiIHb1pYD4lV5exUlOyhQtIex7DSBdqqDpUGOQ5htz2ILiykFTbAWcEQDNQBFLGxtre0BAgjJbHsFNZCUGtgChDXAcFS1AzsL5Diw2dqKiqBgE4XElIKNEkSZMlSDOlBQxNbWDCCAEGargfSClICtsFFWVLexUUdoUgc7Sx0ooggWlbe35wYnPmUlmBNAUaWpAZEDJi8hgABiMLe1BeZtJZBzNKCRrQyPdBWQJlWwpdpgB4DiEgSUbMBuAyc+oLNswAYCCWWwUcBQEQPmXIAAAiUioDKgsA44iBWQzdZWgrBswO4GhYw8xGwdkDILNgZI4tMB65eHEMqQoAcmPwaAAAKaLWgP1mZjD3Gkvb0axFuQ8AMFnjY47aghzAbZLAHOFfJgx8rDzFYEJy9tcPaXBQggoNncEBU2YDPVob5ENhqc+MBAzV4REV32MLPVFCBmQxOwmjwk93MABBCy2eA40gHHqDLUaGheg6UaZZjZoBwAdIWNMih47ZR0wHI68DRrzwrMrRIAAYRstio82QFDUBWsCagbnD0VtG0UwbFhA0njYMNBydkGnlghyUlNBZijgRqAZTQLQAABzTaEpAd1e3gCBTnKBm4RNLNAcg04RYDjWE1VEeIiqFc0wUEHdI0ayNfAIowXIIAQ6QRUHkDSqrqCPYrZdvaIbK0CycDgeNWBBpq2DagUUoTGOUQQaC4nQACBikQme1BQKamCSyMbaKGlYKMJC1tgcmUCawR5QAPsCAVFYLiqQNOTPTgEQZLakJwNdBvQWC2AAGIAWmAELudUkMpVWPGtKi8PKQ5BGVBFHiKEUKgqr4pgQkpNFXl5aFmjaw8QQAzA8lAKVg2a8sEKYDYW1DYCqKxEKuH5kOQs2LkYMESBzpa0BwggBns5WL0CKtPZYBUHkCXGBPMFsIa31dcDVYhg2\/X02WWZ7JmY+cA1B0gxWJiFTU4YpMheWlgO3IIBCCAGcLMDWh9iAEFubkS1acgtAhYyRJIWRDBFoYrAqkDFtz1AADGgNJd0YRW1pC6qJcx42gEMnJhiUkCj7QECCBRU0PYHqO4HtnGgDQwtTrhPBCSF7HnAzrHmAtXkItw8QDk2MJudC9gIYgIzBSR5IW4W1OcFBzJAADEg2k1Y6mEDDg5E84qRQw8sxIgkbYBgikMVgVWBAUCAAQCu9UfS1XOUCQAAAABJRU5ErkJggg==',
    logotop,
    logotopimgsrc = 'data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABOCAMAAACNDREzAAAABGdBTUEAAK\/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADAUExURfn4966ml9Pe0cDSvYuHdbrMtk9GMXVlQenp47mkeMTVwol4Ui0nF8azjc\/bzODk3JaRghYRCKqVaXFpV9rX0cnFwJeEW7KdcWBZSauSYcnZx3x1ZLKaaoBvTL+4r6ObjGZZOayYbUQ6KDgwIKGKW2liU4J6a9bh1KWRZ8bXxNHNyaeTaKmYdW9gO626pJmjjbSxqFlQPqGOY2tfRriuph4ZEMrUwfLx7459WKSvmrPBq7uyqXZuXtfi1QYGBP\/\/\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\/LbgwkyKVU\/azlgGZKwaB9hEgACCG8toxwY2lh1kLA\/Q56bKEnbANpGNHTsoO7BCKl1NSA4GtkL4mMDhAColpbhY9VRNLRRBKcEGYixAACEZqwwxlh3sWm5OU1N5aWABBoxKTklTAWhdrgmsdGwhVS4kTYDqHT4uVksJYNNVUVsJ1l8ECCCEsaY87HBjeYCVOI+dgICaNIuaHTDlmLKAWjDAUOCCFDjQMIYUDCBj5dkMgY0aIWBBDTEWIIDgxsqZIlwLrB64OZUhtQ4wJBQ5edgsIYELrtL5wGEAL86BMcaqzyMBNFZD2U4Y0isBCCC4sVqmynDXAstxdqCxhiwscqbSpspCnMpK+qDmHLypADbWFhQc6lBjlYGlOChsDbXAJgIEEC5jjWWAbWcBaQNTFmVlI04lHhsrZoSx0KAAJzR1YJQxs8oDk622uAWwJQDp6gAEEANikMJUV1cXbqySiqwpqFljJ63MI8ZpzGNogNxWhLpYClIZc1mx2phyK2qAjDWEGAsQQAhjle0UdBUUFHQhxppaaCibAnODqQCwxBQHplxhVi5w2xNmLMhgENZkZtWzslRmE9MGG2ssAjYRIIDg3T4OJYixCuy6CuzAlje3DDC1qKoJCxgCUwUnp7GyhCUrq6UBCICateBmExfQElY9SwEWQyV2RSGwsTaQKAMIILhrOSRMDcHGgkwGGgtMYaaqbMaGbIbAFAbsQFiwKQM7wYbGoG6whKq0GguLgJoai4C+voAwGw+PArDbpyEOrHSguQwggBBdEmFTBVmouexsIGOVTYEdUCU2YIoQB3V0FNlMgb1QIOYBkjwgyhTUH2UDdlGVbMTFjYDGAlOCmjnYRIAAQhirCmx4AwMWHL4g18qw8YCb43Y8sjLADp+MuKQYt5ERsD0JbKvp6hoCARuoQ61kKGuhAez4aWgYAfsCsNoBIIAgZjOYm9tLgFv0CiCDddnsTLklgd06BTZQFFoA+6cqwK6pDLz\/C+6fgrp+YipGQsCeJASI6\/AoQZKtPUAAMYAGJJhEgEBVmcUG6DxlYJzpAqteCyNgLxHY3QUTkkYqIHPBnUpIxw7cyQYbDvS9EagLCeycagjChqYAAojB3lxECwhEgS0jOTl5G2WQk9kVTE1ljcSg3VOwkSCHQYwGGQIykxNsJpCjqCFkBOqxygLbFIaQ4tYeIIAY7DlApmrJGRjIGcjJyTEaA12syw40VkgF5kIVFUmImRDjxUCNdmDIKoFGK4BxBowDSCwAsw+0UWMPEEBA14IdawAyFojlDOSllU2VTIFdPA1gN19IBdhGNxLSlQW1JoGhzgbqVAL7m8jDI8BEATJfSVWVzU4N2EoEhS5AAIECQRRiLBQATQYpllBTVTBUUFDiAQEkU0DpSwnUiTaUEBZWlWYBNlWBwACIREUYTVX5zTlAQ0YAAcRgzyAiCgJySAazKNshA1MeNjYJY0Ng0wnY5ZUHAUYYgDsFCAxEDdQE5LSALR1ze4AAArqYA2ws0MFyMKPlDFRBfSc2YRYbG2Bukpc3gJoCDHu4aUjuALHBJovKyYkAa3p+BoAAAgWEFshUYFpAmCsqb6okCrRHVA4KDAxg5oF1A2MDmCS1wM4Bs2GEFqQ2tgcIIJCx5kyiUAAzV07e0AakSQ4moQUD\/OYgwAABYJY5PKMywCTs7QECCCzGAdIHsg1kLtR9EFdAAT\/EEUBA5MAdQAChjN8yacGNARkBdhd5Y4wAAYSijQPsLpB5lI5fAgQQ6ogo5eZBAUAAUXMiBwkABBgAk\/EvcGbprtcAAAAASUVORK5CYII=',
    mediahost = false,
    scriptmedia = new Array(),
    source,
    urlend,
    urlstart,
    urlstra = '<div class=\"filelink\"><a href=\"',
    urlstrb = '\" title=\"Download video from ',
    urlstrc = '">Download link</a> ',
    urlstrd = '</div>Right-click -&gt; \"Save Target As\"',
    videoid,
    xmlhttp = false,
    xmlhttp_url = false,
    xmlobject;

function rev(str) {
 if (!str) {
  return ''
 }
 var revstr = '';
 for (i=str.length-1;i>=0;i--) {
  revstr += str.charAt(i)
 }
 return revstr;
}

function xmlhttp_request() {
 if (window.XMLHttpRequest) {
  try {
   xmlhttp = new XMLHttpRequest();
  }
  catch(e) {
   xmlhttp = false;
  }
 }
 return xmlhttp;
}

function outputxhtml() {
 if (logotopimgsrc !== false) {
  logotop = '<a href=\"' + backlink + '\" title=\"(back to ' + mediahost + ')\"><img alt=\"\" class=\"logoimgtop\" src=\"' + logotopimgsrc + '\" \/><\/a>';
 }
 else {
  logotop = '';
 }
 if (logobottomimgsrc !== false) {
  logobottom = '<a href=\"' + home + '\" ' + hometitle + '><img alt=\"\" class=\"logoimgbottom\" src=\"' + logobottomimgsrc + '\" \/><\/a>';
 }
 else {
  logobottom = '';
 }
 link = fileURL.join('<\/li><li>');
 document.write('<?xml version=\"1.0\" encoding=\"ISO-8859-15\"?><!DOCTYPE html PUBLIC \"-\/\/W3C\/\/DTD XHTML 1.0 Strict \/\/EN\" \"http:\/\/www.w3.org\/TR\/xhtml1\/DTD\/xhtml1-strict.dtd\"><html xmlns=\"http:\/\/www.w3.org\/1999\/xhtml\"><head><meta http-equiv=\"Content-Type\" content=\"text\/html; charset=iso-8859-15\"></meta><title>Video Download, '+host+'<\/title><style type=\"text\/css\"><!--body { margin:0;padding:0 11px;background-color:#818181;font:normal 12px arial,helvetica,sans-serif; }.pagebox { background-color:#FFFFFF;position:relative;min-width:458px;max-width:505px;margin:34px auto;padding:34px;border:1px solid #696969;-moz-border-radius:10px; }h1, h2 { border-bottom:1px solid #C8C8C8; }h1 { margin:0 15px 10px 75px;font-size:18px; }h2 { margin:0 15px 0 75px;padding:2px 15px 15px 0;font-weight:normal;font-size:15px; }ul { margin:12px 15px 5px 93px;padding:0;list-style:square; }.filelink { width:175px;float:left; }.backlink { margin:15px 15px 0 75px;padding:15px 15px 2px 0;border-top:1px solid #C8C8C8; }.link { position:absolute;right:10px;bottom:-22px;}a.linktext { font-weight:normal;font-size:11px;color:#4B4B4B;text-decoration:none; }.logotop { position:absolute;left:11px;top:28px;}.logoimgtop { width:86px;height78px;border:none; }.logobottom { position:absolute;right:10px;bottom:8px;}.logoimgbottom { width:91px;height31px;border:none; }.donation { width:69px;height38px;border:none;position:absolute;left:21px;top:118px; }--><\/style><\/head><body id="all-in-one-video-bookmarklet"><div class=\"pagebox\"><div class=\"logotop\">'+logotop+'<\/div><h1>Video Download, '+host+'<\/h1><h2>The following media has been found on the <span class=\"em\">'+mediahost+'<\/span> website.<\/h2><ul><li>'+link+'<\/li><\/ul><p class=\"backlink\">Return to <a href=\"'+backlink+'\" title=\"(back to '+mediahost+')\">'+mediahost+'<\/a> website<\/p><div class=\"link\"><a class=\"linktext\" href=\"'+home+'" '+hometitle+'>(script by 1024k.de)<\/a><\/div><div class=\"donation\"><form action=\"https:\/\/www.paypal.com\/cgi-bin\/webscr\" method=\"post\"><div><input type=\"hidden\" name=\"cmd\" value=\"_s-xclick\" \/><input type=\"hidden\" name=\"encrypted\" value=\"-----BEGIN PKCS7-----MIIHbwYJKoZIhvcNAQcEoIIHYDCCB1wCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYCekZyYz9kXtChhfaegGoEby\/tmMHl6b9yhg5s5iNBbnDWO8jCryDyS7JtIuHOr75xomvSSrXCbkjGbpN8R1ZL1GL3rZeLMryDDoID3fMwdqMYjpci\/K5MeWF31jFFRu\/7vAeMGQBPsQyrzIFjID0Uur+G2pv1jsITlO\/IlKNR5QzELMAkGBSsOAwIaBQAwgewGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQIF83h8MS89LmAgchENkJBb9GxkI1ss65w4gfknhhUk3+x5q1y0GcHR676eF6ikgFv+KMLyLeNzVGwxn5C2xUr1JjaEMI4Tw3WvHtPjGdp\/\/oBPWXfdxR5voeybNjpk1ncODeeSWODpslwrVpcybjxVgDzuMjuAW\/Ml+4bAfjuwzeeS6zGp1qMIjiaGqOZhevCsoMzN1WVrQJtB4QBbGE8HkNllUAxj2IxkKHiKis6LYWlstkna\/E8qgsi+5CazF707CQf4QpzRVrw7TvD0iTItYriIqCCA4cwggODMIIC7KADAgECAgEAMA0GCSqGSIb3DQEBBQUAMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTAeFw0wNDAyMTMxMDEzMTVaFw0zNTAyMTMxMDEzMTVaMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAwUdO3fxEzEtcnI7ZKZL412XvZPugoni7i7D7prCe0AtaHTc97CYgm7NsAtJyxNLixmhLV8pyIEaiHXWAh8fPKW+R017+EmXrr9EaquPmsVvTywAAE1PMNOKqo2kl4Gxiz9zZqIajOm1fZGWcGS0f5JQ2kBqNbvbg2\/Za+GJ\/qwUCAwEAAaOB7jCB6zAdBgNVHQ4EFgQUlp98u8ZvF71ZP1LXChvsENZklGswgbsGA1UdIwSBszCBsIAUlp98u8ZvF71ZP1LXChvsENZklGuhgZSkgZEwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQADgYEAgV86VpqAWuXvX6Oro4qJ1tYVIT5DgWpE692Ag422H7yRIr\/9j\/iKG4Thia\/Oflx4TdL+IFJBAyPK9v6zZNZtBgPBynXb048hsP16l2vi0k5Q2JKiPDsEfBhGI+HnxLXEaUWAcVfCsQFvd2A1sxRr67ip5y2wwBelUecP3AjJ+YcxggGaMIIBlgIBATCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTA2MDUwNzAyMDIwN1owIwYJKoZIhvcNAQkEMRYEFKjnbaP3QsS11LPmbMBzo6tXSEbaMA0GCSqGSIb3DQEBAQUABIGAA0YNnXb7IIWevF6vqVHXZ0HuPESp2us85qqQpNIFw8FNaCpXtyIloRBKhKyz08zt8XI7UyMc1QicUir1r+6\/Ds1dS92xRw60jlbw+wnYyXtD\/hhU0B3APlcVTcGC9VeR9aPYAjeiTpRMokw79BugM2xPMMhosp12eBDmzv3BrK4=-----END PKCS7-----\" \/><input type=\"image\" src=\"data:image\/gif;base64,R0lGODlhRQAmAMQfANXV2NRNKmFgYlBojens8QAEO\/6fE\/Xy8qGwwv\/63OO6t9ng5vutNa7B14eVrtiYk\/bk0P7GUPnSlT5ARZaWl8rKzerp6YOAgMYEA6WkpP6NAfr6+gMWThEQEP\/\/\/\/\/\/\/yH5BAEAAB8ALAAAAABFACYAAAX\/4CeOZGmeaKquplVlcCzPdG3fuIxYZSVQuaBweBN0MiOLYOFpOp\/QqHRKrUYBnYUoQ7F6v2Dv4SeidD2ctHrNbrs504Pi8VBAoAeIRAJJQC0AAhdlZxwNBwSJiouMjYkHCHB4DwEYlhgBDwceGxIMBhqhDBIbToCChE0cFQMFb69rBQMAkk4QlZe5ARARob6+Bncep4MfZqqsBcrLzM3OyrO1w7nUlgEBv9kad8SpaA0IEwPj5OXm5xMIDbUbuNXW16DaoQYb3caFCJwbBBYb\/xYOCOQX8B+\/AwY9RHKi4N27APLmSbh3DI2+JpEceHDAYcEEBwvUVNjIYUApjLXc\/z28dk2DAQbzIlDM5+RASQIFHDQosK6jg35pJmxC2eQAhjkPLFzDFEABS0xJFUSI8JJBBAUTAxWryOEip48DOBwIO7bAhSYDPk4g4GShh4YAKgBQQGEBAAgXFjywm2FBAwYB6iqosKACAQYzVXndEDYnmgGcHJi1wMFBJCZE32IA0GDuAwAXMgBo2mBJUwMGKjTQewsAYq3euj5pxWFDBZ4OHNAacMFVGgBtJR2gMEdBAwV6EdglHqACBgcWOhN+kMEChNeo8Cl+wnEkx7FpBlT4CGlVcCcXdAUQUKlSBsDYLmi4QF9DgAsBZMLWbnHfv03\/NUHAAqWwVVRCbmnmEP882IASkUuhZJUdVw30gtpLF35SFWoaYghKBOs40c6C8MzjCwP27EdhLya2mA2I0lhAoiUQzmPAJol9w6KLPML4h0rUSGUiYpzkyAEAGySg5JJMNumkkhuEOIlKmQDoiTwvkWKKioXA4qUbU9ijgB0niZgHBAj9wWUYbLb5RY5uxilnE3BS0cGddzqBZwdN5OmBn3\/yGeiegwIqRZ1T+JnnoozyqSieegoa6JtrWvHopJNCqmifkXbqBaJSXCrqnoIS2qekpFYBahSjnprpo4DGKqmqlVbR6quDYnqpq5\/WaqephfLKqLCoAnuor3MmC8Y99BVpwbPQRivttNRWa+1HtdBWEE4xFXQAQGEVhCvuuOSWa+656KYrLhcdVFCGEfTFK++89NZr77340mtEdltM4O+\/AAcs8MAEF2ywwEiwoPDCDDf8QQgAOw==\" name=\"submit\" alt=\"\" title=\"Thank you for your support!\" \/><\/div><\/form><\/div><div class=\"logobottom\">'+logobottom+'<\/div><\/div><\/body><\/html>');
 document.close();
}

function insert_button() {
 if ((fileURL.length != 0) && (document.getElementById('all-in-one-video-bookmarklet')===null)) {
  document.getElementsByTagName('html')[0].setAttribute('style','margin-top:22px;');

  var gmnotice = document.createElement('div');
  gmnotice.setAttribute('id','gmnotice');
  gmnotice.setAttribute('style', 'cursor:pointer;position:fixed;top:0;right:0;width:100%;height:21px;padding:0 3px;background-color:#FFFA2F;border-bottom:1px solid #8C8C8C');

  var p = document.createElement('p');
  p.setAttribute('style','margin:0;padding:3px;font-family:arial,helvetica,sans-serif;color:#666666;font-size:12px;text-align:center;');
  p.setAttribute('id','gmnotice-p');

  var text = document.createTextNode('Get download link(s) to video(s)');

  document.getElementsByTagName('body')[0].appendChild(gmnotice);
  gmnotice.appendChild(p);
  p.appendChild(text);

  document.getElementById('gmnotice').addEventListener('click',outputxhtml,false);
 }
}

function extracturls() {

 if (host.match(/break\./i) != null)            {mediahost = 'Break.com'}
 else if (host.match(/clipfish\.de/i) != null)  {mediahost = 'Clipfish'}
 else if (host.match(/dailymotion\./i) != null) {mediahost = 'Dailymotion'}
 else if (host.match(/google\./i) != null)      {mediahost = 'Google'}
 else if (host.match(/metacafe\./i) != null)    {mediahost = 'Metacafe'}
 else if (host.match(/myspace\./i) != null)     {mediahost = 'Myspace'}
 else if (host.match(/myvideo\./i) != null)     {mediahost = 'MyVideo'}
 else if (host.match(/putfile\./i) != null)     {mediahost = 'Putfile'}
 else if (host.match(/sevenload\./i) != null)   {mediahost = 'Sevenload'}
 else if (host.match(/youtube\./i) != null)     {mediahost = 'YouTube'}

 switch (mediahost) {
 
  case 'Break.com':

   embmedia = document.getElementById('break_player');
   if (embmedia != null) {
    source = unescape(embmedia.getAttribute('flashvars'));
     if (source.match(/videoPath=/i) !== null) {
      urlstart = source.indexOf('videoPath=')+10;
      urlend = source.indexOf('.flv',urlstart)+4;
      source = in2html(source.substring(urlstart,urlend));
      filetype = '(.flv)';
      fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
      source = source.replace(/\.flv/,'.wmv');
      filetype = '(.wmv)';
      fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
     }
    }
   insert_button();
   break;

  case 'Clipfish':
  
   embmedia = document.getElementsByTagName('embed');
   if (embmedia.length == 0) {
    insert_button();
   }
   for (i=0;i<embmedia.length;++i) {
    if (embmedia[i].getAttribute('src') !== null) {
     videoid = unescape(embmedia[i].getAttribute('src'));
     if (videoid.indexOf('videoid=') != -1) {
      found = true;
      urlstart = videoid.indexOf('videoid=')+8;
      if (videoid.indexOf('&',urlstart) != -1) {
       urlend = videoid.indexOf('&',urlstart);
      }
      else {
       urlend = videoid.length;
      }
      videoid=videoid.substring(urlstart,urlend);
      xmlhttp_url = 'http://'+host+'/video_n.php?videoid=' + videoid;
      xmlhttp_request();
      if (xmlhttp !== false) {
       function clipfish_xmlhttp_response() {
        if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
         xmlobject = xmlhttp.responseText;
         source = in2html(xmlobject.substring(xmlobject.indexOf('&url=')+5,xmlobject.indexOf('.flv')+4));
         filetype = '(.flv)';
         if (source != '') {
          fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
         }
         insert_button();
        }
       }
       xmlhttp.onreadystatechange = clipfish_xmlhttp_response;
       xmlhttp.open("GET",xmlhttp_url,true);
       xmlhttp.send(null);
      }
      break;
     }
    }
    if ((i == (embmedia.length-1)) && (found !== true)) {
     insert_button();
    }
   }
   break;
   
  case 'Dailymotion':
  
   embmedia = document.getElementsByTagName('embed');
   for (i=0;i<embmedia.length;++i) {
    if (embmedia[i].getAttribute('flashvars') !== null) {
     source = unescape(embmedia[i].getAttribute('flashvars'));
     urlstart = source.indexOf('url=')+4;
     urlend = source.indexOf('&',urlstart);
     source = in2html(source.substring(urlstart,urlend));
     filetype = '(.flv)';
     fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
     break;
    }
   }
   insert_button();
   break;
  
  case 'Google':
   
   iframe=document.getElementById("3rdPartyFrame");
   if ((iframe != null) && (iframe.src.match(/google\./i) !== null)) {
    embmedia = iframe.contentDocument.getElementsByTagName('embed');
    for (i=0;i<embmedia.length;++i) {
     source = unescape(embmedia[i].getAttribute('src'));
     if (source.indexOf('videoUrl=') != -1) {
      source = in2html(source.substr(source.indexOf('videoUrl=')+9));
      filetype = '(.flv)';
      fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
      break;
     }
    }
    if (iframe.contentDocument.getElementById('macdownloadlink') !== null) {
     source = in2html(iframe.contentDocument.getElementById('macdownloadlink').href);
     filetype = '(.avi)';
     fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
    }
    if (iframe.contentDocument.getElementById('ipoddownloadlink') !== null) {
     source = in2html(iframe.contentDocument.getElementById('ipoddownloadlink').href);
     filetype = '(.mp4) (iPod)';
     fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
    }
    if (iframe.contentDocument.getElementById('pspdownloadlink') !== null) {
     source = in2html(iframe.contentDocument.getElementById('pspdownloadlink').href);
     filetype = '(.mp4) (PSP)';
     fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
    }
    insert_button();
   }
   break;

  case 'Metacafe':
  
   scriptmedia = document.getElementsByTagName('script');
   for (i=0;i<scriptmedia.length;++i) {
    if (scriptmedia[i].text.match(/itemID=[0-9]+/i) !== null) {
     found = true;
     xmlhttp_url = scriptmedia[i].text.match(/itemID=[0-9]+/i);
     xmlhttp_url = 'http://'+host+'/fplayer.php?itemID=' + String(xmlhttp_url).match(/[0-9]+/i) + '&t=embedded';
     xmlhttp_request();
     if (xmlhttp !== false) {
      function metacafe_xmlhttp_response() {
       if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
        xmlobject = (new DOMParser()).parseFromString(xmlhttp.responseText,"application/xml");
        source = in2html(xmlobject.getElementsByTagName('playlist')[0].childNodes[1].getAttribute('url'));
        filetype='(.flv)';
        if (source != '') {
         fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
        }
        insert_button();
       }
      }
      xmlhttp.onreadystatechange=metacafe_xmlhttp_response;
      xmlhttp.open("GET",xmlhttp_url,true);
      xmlhttp.send(null);
     }
     break;
    }
    if ((i == (scriptmedia.length-1)) && (found !== true)) {
     embmedia = document.getElementsByTagName('embed');
     for (j=0;j<embmedia.length;++j) {
      if (embmedia[j].getAttribute('src') !== false) {
       source = unescape(embmedia[j].getAttribute('src'));
       source = in2html(source.substring(73,source.indexOf('&')));
       fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
       break;
      }
     }
     insert_button();
    }
   }
   break;
   
  case 'Myspace':
  
   if (loc.match(/videoID=/i) !== null) {
    videoid = loc.match(/videoID=[0-9]+/i)[0].substr(8);
    source = in2html('http:\/\/content.movies.myspace.com\/' + Math.pow(10,7-(videoid.length-5)).toString().substr(1)+videoid.substr(0,videoid.length-5) + '\/' + rev(videoid.substring(videoid.length-2)) + '\/' + rev(videoid.substring(videoid.length-4,videoid.length-2)) + '\/' + videoid + '.flv');
    filetype = '(.flv)';
    fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
   }
   insert_button();
   break;
     
  case 'MyVideo':

   embmedia = document.getElementById('MFP_10');
   if (embmedia != null) {
    if (embmedia.getAttribute('flashvars') !== null) {
     source = unescape(embmedia.getAttribute('flashvars'));
     if (source.match(/videoid=/i) !== null) {
      videoid = source.substring(source.indexOf('videoid=')+8,source.indexOf('&',source.indexOf('videoid=')+8));
      embmedia = document.getElementsByTagName('a');
      for (i=0;i<embmedia.length;++i) {
       if (embmedia[i].getAttribute('onclick') !== null) {
        source = unescape(embmedia[i].getAttribute('onclick'));
        urlstart = source.indexOf('http');
        urlend = source.indexOf('/thumbs',urlstart)+1;
        source = in2html(source.substring(urlstart,urlend)+videoid+'.flv');
        filetype = '(.flv)';
        fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
        break;
       }
      }
     }
    }
   }
   insert_button();
   break;
   
  case 'Putfile':
  
   embmedia = document.getElementById('flvplayer');
   if (embmedia !== null) {
    if (embmedia.getAttribute('flashvars') !== null) {
     source = unescape(embmedia.getAttribute('flashvars'));
     urlstart = source.indexOf('flv=')+4;
     urlend = source.indexOf ('.flv',urlstart)+4;
     if ((urlstart !== -1) && (urlend !== -1)) {
      source = in2html(source.substring(urlstart,urlend));
      filetype = '(.flv)';
      fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
     }
    }
   }
   else {
    embmedia = document.getElementsByTagName('embed');
    for (i=0;i<embmedia.length;++i) {
     if (embmedia[i].getAttribute('src') !== null) {
      source = unescape(embmedia[i].getAttribute('src'));
      fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
      break;
     }
    }
   }
   insert_button();
   break;
   
  case 'Sevenload':
  
   scriptmedia=document.getElementsByTagName('script');
   if (scriptmedia.length == 0) {
    insert_button();
   }
   for(i=0;i<scriptmedia.length;++i) {
    videoid = scriptmedia[i].text.match(/var id\s*= '(.*)'/gi);
    if ((videoid !== null) && (RegExp.$1 !== '')) {
     found = true;
     xmlhttp_url = 'http://'+host+'/api/player/id/' + RegExp.$1;
     xmlhttp_request();
     if (xmlhttp !== false) {
      function sevenload_xmlhttp_response() {
       if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
        xmlobject = xmlhttp.responseXML;
        source = in2html(xmlobject.getElementsByTagName('video')[0].getAttribute('url'));
        filetype = '(.flv)';
        if (source != '') {
         fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
        }
        insert_button();
       }
      }
      xmlhttp.onreadystatechange = sevenload_xmlhttp_response;
      xmlhttp.open("GET",xmlhttp_url,true);
      xmlhttp.send(null);
     }
     break;
    }
    if ((i == (scriptmedia.length-1)) && (found !== true)) {
     insert_button();
    }
   }
   break;
     
  case 'YouTube':
  
   scriptmedia = document.getElementsByTagName('script');
   for (i=0;i<scriptmedia.length;++i) {
    if (scriptmedia[i].text.match(/video_id=\S+&.+&t=.+&f/i) !== null) {
     source = scriptmedia[i].text.match(/video_id=\S+&.+&t=.+&f/i);
     source = in2html(String(source).replace(/(video_id=\S+)&.+(&t=.+)&f/i,'http:\/\/www.youtube.com\/get_video?$1$2'));
     filetype = '(.flv)';
     fileURL[fileURL.length] = urlstra+source+urlstrb+mediahost+urlstrc+filetype+urlstrd;
     break;
    }
   }
   insert_button();
   break;
   
  default: break;

 }
}

if (host.match(/google\./i) !== null) {
 document.getElementById("3rdPartyFrame").addEventListener('load',extracturls,false)
}
else if (host.match(/dailymotion\./i) !== null) {
 window.addEventListener('load',extracturls,false);
}
else if ((top==self) || (top[0]==self)) {
 extracturls();
}