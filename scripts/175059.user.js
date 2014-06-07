// ==UserScript==
// @name           world-war auto invite alliance
// @namespace      Mike Jones
// @description    Invites a whole bunch of people to your alliance
// @include        http://wwar.storm8.com/group.php*
// ==/UserScript==
var numClick = GM_getValue('autoclicknum', 0);
var codes =
[ '87PQ2N' , '9BJF8C' , 'CGNCG8' , 'Q6B5N4' , '5YCQCU' , 'T4A967' , 'FHWCUV' , '92Y6E6' , 'GDFMWJ' , '8QMSQW' , 'JG6EW5' , '6F8X8A' , '3RKS4A' , 'RWUC69' , 'G3F2WU'
 , '7QT6GD' , 'TYMY8P' , 'KF8KVW' 
, 'DS3A7M' , 'KG8X3X' , 'B7NVV7' , '3394UX' , '2T8XT8' , '9NDSFB' , 'ANT2HB' , '295PJV' , 'KW8QN4' , 'X3TQ5J' , 'PM6GSD' , 'DU9JH4' , '2ET3DR' , 'NAKJJG' , 'KNF6UM' , '6DSYRS' , '57QS6S' , '5Y78K4' 
, '6YMEXJ' , 'QY78FF' , 'FNESJ6' , 'BDH6XW' , 'E7PYUE' , 'G5QF77' , 'UV3SPH' , 'AADK9A' , 'XNNF6B' , 'Y94NQV' , 'YMYVV7' , 'YDRSPT' , '8XGM24' , '36Y2WK' , '2XNHQS' , 'KB2QXF' , '9PSKMW' , 'GXG722' 
, 'G9NHG7' , 'M6WMUH' , 'TXBTX5' , 'VWC6BF' , 'RQ444S' , 'NYGR6Q' , 'MFRRGD' , 'pvdg8r' , '3396H4' , 'Y94NQV' , 'DR3NGQ' , 'VW9HFC' , 'SCEGM4' , 'YD69R8' , '7GUT7M' , 'YPAG89' , '4PS9GV' , 'H5QEFE' 
, '3GU9TK' , 'AYAFAF' , 'DEY9EB' , 'N7WYGP' , '2Q8DGS' , '97Y3U5' , 'YY9PGW' , 'FAUVJX' , 'PE2CRK' , '2PSGH7' , '6GGWJA' , 'EJS58B' , 'XRUAD8' , 'TB5KKK' , 'JNPY7K' , 'FFWEPN' , '6SUTQY' , 'FRC9EN' 
, '3Y2FAR' , 'G3F2WU' , 'FMENTA' , '9CD922' , 'CN544R' , 'F4SSQP' , 'UP2K57' , '42J62S' , 'JBU5KC' , 'FHP9HD' , 'FVBGXF' ,
 '948Y7J' , 'FKWY7R' , 'EJQ2JJ' , '5SA9RC' , '45MBSA' , 'AFQCRG' , '87RHC9' 
, '8Q8AHA' , 'XWDUCK' , 'JU2VN4' , 'VTACYN' , 'XFWAWM' , 'C2T8QE' , 'D7G4YC' , 'PJ7VQX' , 'AVQ32V' , 'VJV2A5' , 'Q95BQ6' , 'R7D8N5' , '2ME964' , 'K9SY52' , 'HU6MEH' , '5W7XPR' , 'GPU25A' , 'NWEVX9' 
, 'CDP556' , 'TW4GXB' , '43DB4P' , 'AENWSN' , '27SKNC' , 'AUSYND' , 'EVEJE9' , 'GFS4JC' , 'S4SDJX' , '2KQ9UU' , 'A3DBXD' , 'BSBQHW' , 'AEN82V' , 'KU5CNF' , 'KTDUSK' , 'XKN3QR' , 'UKFJF4' , 'TQSPG7' 
, '8XGM24' , 'EVNT6P' , 'PQ52D8' , '6XJ5HA' , '8HRQAY' , 'Q2MUPE' , 'FCE7M6' , 'BJNVV7' , 'CQRUPY' , 'TWRTMY' , 'UNDTBS' , 'YBN36M' , 'HV73QD' , '3AUX94' , 'GXG722' , 'AAT63U' , 'M6WMUH' , '89E5UN' 
, 'T95EGE' , 'FSAY8E' , 'WAR7WW' , '4PS9GV' , '6SSM6X' , 'XS54GM' , 'KXH4D9' , 'GU4U2C' , 'XVF4NB' , 'CWTP4S' , 'BWE7U4' , 'MBH777' , 'NF3D72' , 'QQ2462' , 'HT5GUY' , 'FJDRWB' , 'Y8PV29' , 'H6X65E' 
, 'CXQHPD' , '5JTFJF' , 'YVUV6A' , 'KJ4JGT' , '3QA2ME' , 'RDCUY6' , '5WU6QW' ,
 'BWE7U4' , 'UDJVDR' , 'JH92HU' , 'BR77FC' , '67WY3U' , 'Q94UBN' , 'R4ADV4' , 'RQUHBR' , 'QDUS46' , 'NAXU4X' , 'JW993A' 
, '45MBSA' , 'SCEGM4' , 'G9NHG7' , '6AFDYJ' , '2SGXG7' , '8J6MX5' , 'K9NN5X' , 'XS54GM' , 'A32J7R' , 'V4T5TX' , 'EPJXHU' , '6HY68W' , 'SNUPA7' , 'CNVESK' , 'MSRDQS' , 'Fjfd2v' , 'TD8XUU' , 'PTAXKD' 
, '5KB8PP' , '25Q5CX' , 'DCGKGH' , 'PWYFJ4' , 'EJG7GK' , 'WCC395' , 'C2XR68' , 'NGHJSD' , 'PXP9BY' , 'RSQ93K' , 'RE985A' , 'B4YY25' , '77D5TK' , '2S79EC' , 'MRT29A' , 'D9NPMK' , 'C5JW6K' , 'QBG94S' 
, 'GDXU54' , 'AB32N9' , 'Q6B5N4' , '5YCQCU' , 'T4A967' , 'JG6EW5' , 'J2DRWD' , 'HVQ2HV' , 'J334H2' , '952CQN' , '296ACD' , 'W3MSS8' , 'EU5A9H' , 'X4F9J7' , 'XV5CP7' , 'UQFUWN' , 'KS2WCM' , 'YKD4EQ' 
, 'N4T6FR' , 'GBBQQD' , 'XFNXV6' , 'JC7QJB' , 'QRC2T9' , 'X3M969' , 'XCXWSC' , 'CSTUFK' , 'T3SY5A' , '5UTTSM' , 'GFXUMT' , 'NHPMQC' , 'AYX77W' , '7RMWYG' , '9433A2' , '5XHPYK' , 'JU7HUG' , 'XRUAD8' 
, 'TVHANJ' , 'XU33WY' , 'DAPQEW' ,
 'BQUFVN' , '5R89ED' , 'MEACAW' , 'XJJQMQ' , 'ASPWEG' , 'KP9XYX' , '8HRVTD' , '3K9BD4' , 'G8XBYR' , 'vyqfgd' , 'qehygf' , 'ymvnjw' , 'maqcnx' , '3hvqk8' , 'xe3uw9' 
, 'jkfhar' , 'f36ukw' , 'jxabv2' , 'bywpgx' , 'hpjk6e' , 'datqdj' , 'cnpqp2' , '6s6e48' , 've2d9e' , 'wjmukg' , 'rc4spa' , 'nnd5x4' , '7g4dg3' , 'gf8huy' , 'sngjw2' , 'nrds66' , '8XGM24' , '14M3MM' 
, 'KXH4D9' , 'E45MQG' , 'KEMWVA' , 'VNJH3H' , '7EA8ER' , 'CWYT4J' , 'JDG235' , 'VVJHDX' , '4JWABK' , 'XBUP8B' , 'H239FD' , 'AYHEXP' , 'SU3AYT' , '83EKHX' , 'HRJSRF' , 'DS3A7M' , 'VCKA8X' , 'BJNVV7' 
, '39MUGY' , 'WT7GUJ' , 'PDPQEW' , 'WRCQTQ' , 'KJ48UV' , 'A9EH6H' , 'SB3JUK' , '2SGXG7' , '4MYHGF' , 'NWA5MS' , 'HBVEMR' , 'BSY3GM' , 'V3RWHK' , '3KFT85' , '28VNJ9' , '5868CT' , '99D4Y7' , 'XQXHNX' 
, 'YUH3JD' , '55FAT8' , '6WBC2X' , 'BSQCNQ' , 'ACN66B' , 'SGVB74' , 'GST6HB' , '6XPTXP' , '88V3RN' , 'NWHYCE' , '3A68M9' , 'E8BV5J' , 'D7G4YC' , 'SGY6HE' , 'C24QGP' , 'H5WYHA' , 'MMT642' ,
 'X5Q4R9' 
, 'WQVNP8' , '8WWMTW' , 'TRWVCY' , '9R85KH' , 'M6RH7T' , 'TCRKHU' , 'QAM7SV' , 'HNRWAE' , 'WJNPJU' , 'Y4NNTV' , '29EGPQ' , 'RYN84Y' , 'SFPUE8' , 'F7ARY5' , 'FE98RM' , 'NAVU5M' , 'r3rnhx' , '475ur8' 
, 'EVES4C' , 'SGVB74' , '7URF74' , 'TA2MM5' , 'F2YN5N' , '3A68M9' , 'A2RW5U' , 'R2FC7E' , '8WSN9T' , 'KG8X3X' , 'Enj5j2' , 'MBDGJH' , 'FFHHH7' , 'U56NWX' , '95BQKX' , '5pj6dc' , '3JB6Y7' , 'Vw9ncn' 
, '3p5upm' , 'Vukr58' , 'K5NN5X' , '968APQ' , '4TBN6A' , '59tsxp' , 'A79fq6' , '7sqmxn' , '9B2BTC' , 'Cjaycd' , '2BG8DR' , 'C6GQNW' , 'RUXVQK' , 'JA7Y56' , '4g96ab' , 'PBHD35' , 'Xnm63e' , 'T6FUTJ' 
, '5RQUEF' , 'HCCA9G' , 'TCAHPA' , '9jqgbj' , 'hr2rew' , '6w6ua5' , '3dn3qn' , '8teaf5' , 'Ujps6e' , 'Dvx82n' , 'Gmty5b' , '66WK4P' , 'qj22bg' , 'UQ6ST7' , 'e9djhm' , 'HST6KH' , 'Wtkrf8' , 'ER4P3T' 
, 'whsu3s' , 'CWQ7EN' , '7rgef5' , 'Tdb9g9' , 'Wwtrvm' , '89bkg3' , 'Uyapbc' , 'Jbker6' , '85shg4' , 'Wrdw3j' , 'Enmqgs' , 'Jtcbxj' , 'Dax772' ,
 'Ev45xk' , 'E9qgte' , 'T872hn' , '9gff5a' , 'Ny7uqt' 
, '89ddsy' , 'Rrx2f4' , 'Vyq55h' , 'Rachak' , 'T5jqad' , '6ggwja' , 'V46pc8' , 'Nvcjw2' , '7phbtf' , '4ke593' , '249bfd' , 'B7gq9u' , 'Ursb4r' , 'Enah5q' , 'Xxhw5n' , 'Y28ptq' , 'U48peb' , '65v9ca' 
, 'Jbu5kc' , 'Uphqkt' , 'D7dpc5' , '3cdthy' , '585du8' , 'Ybv5qs' , 'Mwrcr5' , 'Fwbbsp' , '4cta9y' , 'Wf7q6v' , 'Kgc6yc' , 'Xxu7mx' , 'Xccs96' , 'Rpb8tt' , '7sy3e7' , '2tmver' , 'Bnq6v6' , '3xg64s' 
, 'Ydbenc' , 'N55tnm' , 'Fvsh43' , 'Ey8r4x' , 'A85adr' , 'Rjxrk7' , '3r3wbm' , 'Praevf' , '5hvqht' , 'Erpran' , '74sfh4' , 'W7erfr' , 'yqvv8u' , 'dt384q' , '28r2wb' , 'mf9efv' , 'ydhdup' , 'cc37mb' 
, 'g3f2wu' , 'pj7vqx' , 'x7ar2k' , '6vwfkk' , 'untysw' , 'j5ncpn' , 'gfyw8y' , 'td4ssh' , 't3v8p4' , 'nrds66' , '6wtqrk' , 'ufhy4t' , '7srs7b' , '54c485' , 'ws3vgx' , '7y48v3' , 'gp9mw4' , '6g6ku7' 
, '84p926' , 'w9ntte' , 'u2s2wj' , 'bc8pp8' , '9km6xb' , 'wq4x8f' , 'g6t5e8' , 'mu96fj' , '6npwkc' ,
 'mvbrjq' , 'avvn64' , 'yd2v5c' , 'ar5nuh' , 'pmu6ed' , 'unyrrv' , 'q8rkme' , 'tw4c4c' , '2ghqsc' 
, '42wdsh' , 'pexfbg' , 'fanwy9' , 'v92v62' , '7svaqf' , 'e4udwk' , 'qpp79d' , 'shu2jp' , 'ej5vmh' , '8wykr8' , 'tn85n6' , '9xuq4s' , '3ehtvr' , '7dsdtf' , 'c35x77' , 'rvhvtu' , 'fe5v9b' , 'nwhwye' 
, 'sesn9w' , 'chw5ga' , 'gx3hcg' , 'j3n5we' , '86uekb' , 'pvjk2r' , '9ksqay' , 'urmtrf' , '2q8sbp' , 'vwqbfy' , 'jgj95x' , 'ptg9rj' , '8492wx' , 'w2rrqg' , '6sax7e' , 'feeky9' , 'f6uuse' , 'nfq2h3' 
, 'qsw5ea' , 'bt5yad' , 'j8fkum' , 'q569yf' , '267mw6' , 'n4w3p3' , 'njkdds' , '4pd4sq' , 'gmbvdt' , '67wygy' , 'u7khq9' , 'fytq4c' , 'ddw8q8' , 'g4mwvm' , 'jaekfr' , 'h8ek74' , 'hr496q' , 'eqr65w' 
, 'gye8c7' , 'vnmgtd' , 'rbqkw9' , 'pj8pfa' , 'nwrus3' , 'WURFSC' , 'QFD9HR' , '5UEMYA' , 'yc4yur' , 'ucw92y' , '9XHB9Q' , 'Qfjes2' , '92mu6n' , 'Yxp9jw' , 'a6ma9h' , 'ysgbut' , 'Te9ckk' , 'Wfxhmy' 
, 'CHFETJ' , 'Nrymv3' , 'fvg2tm' , 'Utcwfe' , 'yqwbbu' ,
 '9ktnms' , 'MGP2PT' , 'hnwfxd' , '8aax74' , 'S8agva' , 'SHNEW3' , '7dhbrp' , 'Mpjwv8' , 'YTAG95' , 'SAC7JP' , 'K562SA' , 'gragw7' , 'xsk9gj' 
, '9XTFWG' , 'RFDV84' , 'uhgjtu' , 'euvanw' , 'fuqsvs' , '6pvauh' , 'TTT6UM' , 'CKHFX8' , '3hvmj5' , 'Smsf2x' , 'Keuhtf' , 'CK82JT' , 'bchsts' , '6wyap4' , 'Grb66v' , 'N4b227' , '35BE2M' , 'Gfrqtg' 
, '6jggg9' , 'Tsf32t' , 'MCFRM6' , 'MUNCS9' , 'Ah94m3' , '9UTF7G' , 'QS4YUX' , '9MVSUV' , 'Tpaw3R' , 'FJSRTQ' , '9am8nn' , 'F7JRWN' , 'F94HDB' , 'EACWNS' , 'MT2DH5' , 'Pnk99m' , 'BBHH2X' , 'Gxw7cx' 
, 'Cdk343' , 'KV2K85' , 'Fj4mqb' , 'ANCVQK' , 'NAUUSA' , 'WBDSNB' , '546wuc' , 'a2pn39' , '8ennyp' , 'Gwuyhm' , 'NWP9UK' , '5SFV8P' , 'N66HJ9' , 'DPE6T3' , 'CRT4G5' , 'Xxduta' , 'MB9k6n' , 'Fw4dsh' 
, 'Hjavq5' , 'HT2FT9' , 'Jcq9eh' , '683wpp' , 'YPG4YR' , 'WFV5K9' , 'g5wjua' , '7uw4gy' , 'Mka34g' , '7M57DQ' , 'GBRJHD' , '27T8B4' , 'TSVC23' , 'K7XV46' , 'V7RWX2' , 'Smdsyt' , 'ENMQGS' , '6b4fnj' 
, 'M5jdwx' ,
 'E6yvdx' , '2RE2BS' , 'H4wkmy' , 'MNPJGK' , '9WYB22' , 'Cevmy8' , 'H5wqv2' , 'n7desm' , '98923t' , 'Sd3by4' , 'T8gb37' , 'K6t3P4' , '78QE35' , 'Ty8ku8' , 'Jrgars' , 'J9Y56H' , 'Q6UPB3' 
, '5WWF3K' , '23yawp' , 'Tuajg5' , 'T6CAUM' , '6FYTVH' , 'XUC8NR' , '7xb839' , 'TYQMD8' , 'Es5kcd' , '63ap29' , 'VFXUYB' , 'Xgw8rn' , '5k8gr9' , 'Hpxfue' , 'A7c48d' , 'UHGCAM' , '4mc3rs' , 'Awcq6k' 
, 'HA7VDC' , 'Wcax66' , '5BPNM2' , '99srha' , 'Gddfvj' , 'j6sa3s' , 'G6J3XM' , 'r6n3sa' , '73GXSU' , 'D8JSTT' , 'bus77m' , '5R59S6' , '76G777' , 'T97t3u' , 'Reh2h5' , '7CRY26' , '7PW7G4' , 'Tsp3v3' 
, 'MYF7S3' , '5X9XY7' , 'fux387' , '3644ag' , '3VR7G5' , 'GDECSB' , 'CD8WF5' , 'U3HSTP' , '9NBYMR' , 'C8Q9ED' , '5E3AF5' , 'Xggben' , '75a4a2' , '23m2er' , 'e3rygk' , '88jux4' , 'NFQ875' , 'XAPCA6' 
, 'PTG8QF' , '5trpu5' , 'VPRAPA' , 'FAG8MC' , '6n744t' , 'Wac2wc' , '8u6bp7' , 'Q3K4H5' , 'Bf9c7s' , 'PHYJBV' , 'EG9AAH' , '2UEW4A' , 'CEMVGP' , '54VMXD' , 'KGD343' ,
 'W2TUUA' , 'Wat2dw' , '33J3RR' 
, '7QB5Y2' , 'FF54B6' , 'g32jrk' , '6P5968' , 'vq4v9m' , 'f3gnvb' , 'PV898G' , 'gacy64' , 'Axbgey' , 'YRMDJU' , 'Q3WWRA' , '2S9TED' , 'Y2q8h7' , 'Dr55xf' , '5k4xxt' , 'FEE4JJ' , 'F96awg' , 'yqwbbu' 
, 'H9XEGM' , 'VSM5R8' , 'EMBWQX' , '5X9XY7' , 'ACUTGV' , 'CQBA2F' , 'NRDWV2' , 'FU8TX4' , 'KEK6FM' , 'JCH3YG' , 'GV2U6R' , 'EWCYED' , 'VF3R6U' , '6C8MA4' , 'P52E8N' , 'BHKBEA' , 'PK5CKM' , 'NTDS5N' 
, 'T54J54' , '7UWCVT' , 'VY4R5H' , 'PD5E9R' , 'HHTF3U' , 'A7XNU7' , 'V5NN8D' , 'SBCFSX' , 'UTCWFE' , 'XXMBMJ' , '7QR5HU' , '2B2DFH' , 'PSTY7P' , 'Y2V8TX' , 'BGW78D' , 'HGN2UB' , '82YK5G' , '72c8dr' 
, 'MQRT6J' , 'DKP7CG' , 'gc279s' , 'xsvgdw' , 'GUH636' , 'RNSF79' , '458537' , 'Xggben' , '8fwtus' , 'Qbav55' , '3svkjg' , 'ARXKPS' , '2U5SH7' , 's4g6dh' , 'D7G4MH' , 'DCW4CP' , 'E72BEG' , 'wda7x3' 
, 'Fwutfk' , 'Ssm6tg' , 'WPJGR7' , '7nmkke' , '28QPDU' , '836FUH' , '8XBVHY' , 'YCKKY3' , 'DFJJGF' , '66PNR9' , 'DETD9Q' ,
 'Aj6b3q' , '25skct' , 'D63qrh' , 'Xwd3wh' , 'YHFMC9' , '5JV2XB' , '8SXMGQ' 
, 'dxvsan' , 'y3rc33' , 'JMN74P' , 'N6QMAN' , 'SAAKKE' , 'agkcpj' , '5B9RJX' , '8fjtyn' , 'CCPTRX' , '74H52W' , 'Cdk343' , 'NWKPNP' , '6ytwsd' , 'T57G4T' , 'Y7xsf2' , 'R8d4us' , '45vajm' , 'y87dnb' 
, 'Dxr6r9' , 'Ruxcuk' , 'jmkebr' , 'Metft4' , '3U93U2' , 'VSQRXD' , 'Ak8exs' , 'XUVDGE' , 'Qmgbkx' , '5F4QS8' , '77qt28' , 'FSQ623' , 'HY5T4W' , 'WPJSDQ' , 'NTRXU9' , 'U5497G' , 'agfyuc' , '2p9554' 
, 'V4GXHB' , '35HNTP' , '2eqprq' , '57PUY4' , 'U4444D' , 'GQTDS7' , 'BQHQMJ' , 'JXQTCY' , 'RRVDM4' , 'G242UV' , 'W6jkca' , 'XJGKKY' , 'Rqpyq7' , 'B4PNNQ' , 'C9Y2BB' , 'USRPHS' , '37TDF8' , 'd286v8' 
, 'DQVXBH' , 'Dwryvp' , 'Ec64bs' , 'Q723GG' , 'PWAJMC' , 'U9j6pd' , '7qxg73' , '4kjwnd' , 'RX4NW7' , 'bukve7' , 'Xnws7s' , 'K26r2m' , 'Jrfs2f' , 'Pt6qyf' , 'Pt6qyf' 

    ]

var index = parseInt(GM_getValue("index", 0));

console.log(index+'/'+codes.length);
if (index < codes.length - 1)
{
	var f = document.forms[0];
	f.getElementsByTagName('input')[0].value = codes[index];
	f.addEventListener('submit',submitHandler,false);
}
else
{
	GM_setValue('index',codes.length-1);
	index = codes.length-1;
	if (numClick > 0)
	{
		numClick = 0;
		GM_setValue('autoclicknum', 0);
		alert("no more codes!\nBug the author with a donation and tell him you need more ;)");
	}
}

function submitHandler()
{
	var nc = parseInt(document.getElementById("acdn").value);
	if (nc > 0)
		GM_setValue('autoclicknum', nc-1);
	if (index < codes.length - 1)
		if (f.getElementsByTagName('input')[0].value == codes[index])
			GM_setValue('index',index+1);
}
function include(arr,obj) {
	return (arr.indexOf(obj) != -1);
}

// auto-click mechanism
var wwash = document.getElementsByClassName('inviteSectionHeader')[0];
wwash.innerHTML += '<br><p style="font-size: 10px; color: #0f0; padding: 5px 0">AutoClick <input id="acdn" type="text" value="'+numClick+'" style="background: #000; color: #0f0; border: #0f0 1px solid; width: 30px"> times</p>';
wwash.style.height = 'auto';
if (numClick > 0)
	click(document.getElementsByClassName('btnInvite')[0]);

// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e) {return;}
if(typeof e=='string') e=document.getElementById(e);
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}