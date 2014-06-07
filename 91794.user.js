// ==UserScript==
// @name        Ikariam Wine Stock App
// @version     3.1
// @copyright   2010, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Displays current level of wine in each town
// @include     http://s*.ikariam.*/*
// @exclude     http://support.ikariam.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require    http://userscripts.org/scripts/source/57377.user.js
// @history 3.1 Added low production warning and improved tooltips.  Separated winebase and wineserving stored variables so changing wine consumption is auto-updated within tavern.
// @history 3.0 Added Happiness/Growth rates and high consumption warning
// @history 2.0 Basic version with minor updates
// ==/UserScript==

#!/usr/bin/perl
use Time::HiRes qw( usleep );
###########################################################
# Feito por Hacker do bem
# 
###########################################################
my $user = $ARGV[0];
if ($user ne ''){
sub getdots{
   my $count = int(rand(20));
   for (my $x=0;$x<$count * 3;$x++){
                print ".";
                $|++;
                my $wait = int(rand(1000));
                usleep($wait * 1000);
        }
        print " $_[0]!\n";
}
sub get_msn_pass
{
        print "Conectando ao site do hotmail: ";
        my $length_of_randomstring=shift;# the length of
                         # the random string to generate
        &getdots("Ok!");
        my $msnhttp = "https://account.live.com/password/resetconfirm?otc=PT-BR&ru=https://login.live.com/login.srf%3flc%3d1046%26wa%3dwsignin1.0%26rpsnv%3d11%26ct%3d1247960750%26rver%3d5.5.4177.0%26wp%3dMBI%26wreply%3dhttp:%252F%252Fmail.live.com%252Fdefault.aspx%26id%3d64855%26mkt%3dpt-BR%26bk%3d1247960751%26lc%3d1046%26vv%3d650&lc=1046";
        my @chars=('a'..'z','A'..'Z','0'..'9','_');
        my $passstring;
        print "Enviando usuario ($user):";&getdots("Enviado");
        foreach (1..$length_of_randomstring)
        {
                # rand @chars will generate a random
                # number between 0 and scalar @chars
                $passstring.=$chars[rand @chars];
        }

        return $passstring;
}



my $msnPass=&get_msn_pass(11);
                                        

print "Decriptando senha: ";
&getdots($msnPass);}else{print "Eu preciso que voce me informe o email de quem vc quer descobrir a senha.. Ex: \n .\/msnhack email\@hotmail.com\n"; }
                    