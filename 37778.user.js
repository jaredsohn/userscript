// ==UserScript==
// @name			Tim
// ==/UserScript==

while (true) {
($first, @rest) = `curl "http://desc.shop.ebay.com/items/__holiday-doorbuster?LH_IncludeSIF=1&LH_BIN=1&LH_FS=1&LH_Tit leDesc=1&=&_dmd=1&_dmpt=Video_Games_Games&_fln=1&_ fromfsb=&_sop=12&_ssov=1&_trksid=p3286.c0.m282&_mP rRngCbx=1&_udlo=1&_udhi=1" -s | egrep "[0-9]{13}[880]" -o | egrep "[0-9]{13}" -o`;
print "done dling";
if ($first ne "") {
chop($first);
chop($first);
print $first;
exec("open \"http://offer.ebay.com/ws/eBayISAPI.dll?MfcISAPICommand=BinConfirm&item=" . $first . "&fb=1&pt=US_Gift_Certificates&uiid=1368064539&co_ partnerid=&quantity=1\"");
exit;
}
} 