// ==UserScript==
// @name           world-war alliance
// @namespace      ePi
// @description    Invites a whole bunch of people to your alliance
// @include        http://wwar.storm8.com/group.php*
// ==/UserScript==
var numClick = GM_getValue('autoclicknum', 0);
var codes = [ 
    'S3XN7V' , 'URVS3V' , '4V3CWH' , 'Y8595S' , '87AFBX' , 'XKWF9N' , '6KUJ4V' , '2F9WQG' , 'Q85JTF' , '77GQQS' , 'NXE4EN' , 'VFQJ5G' ,
    'PN838G' , 'BFTQQB' , 'GH7KGR' , 'RD8C5Q' , 'XAUS5P' , 'ATK3S3' , 'X6NTPK' , 'Y8PVPF' , '5RUFMF' , 'XWRME7' , 'Q6JXMQ' , 'G5PQPR' ,
    'FAT7KD' , 'STKHC3' , '2PUK5N' , 'JKH6FJ' , '4FBYB8' , 'WUDAGB' , 'WNS8W3' , 'XXXCTX' , 'T3AFNE' , 'W2QJE2' , 'R4EJBP' , 'CK2TP2' ,
    '2MGWXG' , '5VFFSN' , 'W3H594' , 'T47FY5' , 'PB3R59' , '5KY83X' , 'VYUF4W' , 'TXEH9K' , 'BJ6RD5' , 'KSTJXH' , 'MYQJ8H' , 'R9HBS9' ,
    'A9SC86' , 'Y2HCBQ' , 'WW9P6H' , 'PEBVB4' , 'S38CG4' , 'BKWKC9' , 'MFHKEN' , 'WM6PTR' , 'JYC4JX' , '76KRW8' , 'VG8DY8' , 'WHSTW8' ,
    'BTXD3F' , '4NFPCU' , 'BBSKKV' , '4RW3NW' , '3FX4XX' , '8UBYMK' , 'Q7UBUE' , '2ESSRG' , 'XBCVFH' , '4SNX6H' , 'G5QGDK' , 'BTJTN5' ,
    'JAE3V4' , 'XD5Y44' , 'HQQ5SS' , '5ESVCE' , 'YB74Y5' , '7WDMK8' , '62JG9A' , 'FAUSND' , 'PF3SBD' , 'NP429P' , 'BAGKM5' , 'KBMY6B' ,
    'FVEW2H' , 'YJNUFB' , 'VUMJ4W' , 'J7EY9D' , 'FDJB2U' , 'CARSPU' , 'S5MFF4' , '7Q7XGW' , 'PVWPS8' , 'BFEBKD' , '28KEN4' , 'UK2S3T' ,
    '449WBQ' , 'CUQ3H3' , '2CMCHM' , '9JER68' , 'PE5EP9' , 'F8W89C' , 'TCTHWB' , 'T45PWM' , 'TT9XBN' , 'GBTMEJ' , 'SYKRWD' , '79FKBM' ,
    'P4REUB' , 'D34QPX' , '7REF82' , '329C7F' , 'VRJ9B9' , '7BGJCV' , '3S7ECM' , 'PUYGG5' , '9E328G' , 'XU34W7' , 'GJH5JE' , 'VSVNCS' ,
    'NMACY9' , 'RHDMFD' , 'R73F6J' , '56DCWY' , 'NGBTJM' , '5PXRJX' , 'QNHCBR' , 'XT3REE' , 'PD97X7' , 'T6G5FM' , 'VA538M' , 'Y6WTMW' ,
    'NYJ7MF' , 'CXRKMU' , 'EJ833Q' , 'F824SH' , '99TMBK' , 'C98WE5' , 'FEWD2S' , 'MCWMJP' , 'N8E8C2' , 'M7XWV2' , 'KPS6FP' , 'VYPHR7' ,
    'HAXFYS' , '6EBUC7' , 'RKQVBG' , 'Q834DX' , '59EFUA' , 'TMJPHD' , '3KHSWQ' , '4M99T7' , 'DFYVTU' , 'AJCQMF' , 'T5JWF6' , '8QXNYM' ,
    '6PXYNR' , 'MBBCP3' , 'XX5F5C' , 'M92QH2' , '7CUX8C' , 'GSBA39' , 'WV7GMP' , 'AFGCBF' , '4KKV8A' , 'JWG8MT' , 'NBXYUK' , 'RMW8J2' ,
    '7JSWSC' , '66WFAN' , 'H6MJFV' , '6FPYFF' , 'BYADRU' , 'PKG5UQ' , 'E9D2X4' , '93E5P6' , 'HYF8T4' , 'UM5WW6' , 'XK9DC2' , '9RPG2T' ,
    '69GTQ7' , 'M9RHMQ' , 'WKPSVD' , 'WDQQSM' , 'U5MU6C' , '7H568N' , 'JV9QB3' , 'MJ6HPK' , '6BB3UG' , '8EJT47' , 'KW5VRS' , 'K55VRS' ,
    'XMCBCM' , 'C7ECQM' , '78QYAY' , 'KFGJF7' , 'UFQMWS' , 'AKQ8D6' , '68846E' , 'QEWVV5' , 'PW2CKU' , 'CNV5UT' , 'YXN2U2' , 'TT4XQW' ,
    'CAGACT' , 'WKB3A7' , 'GR2T65' , 'Y9VMQ6' , 'KTAAMY' , 'JA3W3Y' , 'T65SBS' , 'K4U24N' , 'R4S9PM' , '5BFJJ6' , 'UGXJ9H' , 'T2RJ6R' ,
    'XFMCQQ' , 'KYBBBR' , '45MVUY' , 'BNDWJC' , 'AFBH44' , 'H9XRUQ' , '723KFF' , 'H68XEU' , 'B4JWFQ' , '6824KS' , 'UJ5X9G' , '5XCQJB' ,
    '628RG7' , 'BRBB7K' , 'NXMXN3' , '3A5KRQ' , 'ERJV45' , 'V5V9MA' , '584KDV' , 'PC2TPP' , 'HWMQJR' , 'C6D6TE' , 'MG57SU' , 'DA85W5' ,
    '72PBRC' , 'CW6GP5' , '5JQ4NK' , 'A7CX77' , '4HGNVF' , 'WRJ3U8' , 'NAVDA2' , 'E7ERSR' , 'SG7P6U' , 'QBRDRW' , 'CCBF9M' , 'N2GQJS' ,
    'CABTYT' , 'W4EP3Y' , 'R5THBW' , '4UCCUX' , 'QFDR2V' , '7FDJJD' , 'V37VMH' , 'XD49W3' , 'N3QKKH' , 'YY4GBR' , '56FJ3B' , 'YN7R6V' ,
    'D3JVJG' , 'NGPXKC' , 'MH6FYM' , '7BMRUQ' , 'DA85W6' , 'N4BQ9W' , '8QV5HE' , 'WCWUGN' , 'QM3X65' , 'H9SEYW' , 'BUXS3N' , 'J7UVJ8' ,
    'D24P3U' , 'MS7JAG' , 'Y9XB3U' , 'MPKE62' , '5KWY2G' , '78XGHN' , 'RKP9PJ' , '728M4J' , 'DN8HCA' , 'T4MTVN' , 'EMF5PV' , 'DPQ9AQ' ,
    '9VKC4K' , 'WT8V9A' , 'AXKXNT' , '9X7VJT' , 'XCXGEW' , 'JRPKH2' , 'Q4726H' , '7HT6PB' , 'RV2MJ2' , 'AXCNPF' , 'E9XC2T' , 'SW27N7' ,
    'JADEHT' , 'MBDRDD' , '4U99BJ' , '7MDHG8' , '7B52R6' , 'QP9WJU' , 'RE232A' , '6M62S5' , 'NK3YPJ' , 'GAUB7W' , '4QW7FS' , '59VRYD' ,
    'RYUAPG' , '8QHURV' , '6YHAVS' , '85BYGK' , '9AVU32' , '4BJVDW' , '2JPBSG' , 'ECQCJH' , 'N37H7A' , '45BNG8' , '5QD9GC' , '5APFU9' ,
    '2YD9ET' , 'NMS5CJ' , 'BBQDG6' , 'GBAXQC' , 'EER4QT' , 'EC8YXS' , 'V7D634' , 'A667MW' , 'A4HQ88' , '6RRDKA' , 'MUDDSV' , 'X7ET3N' ,
    'H69XEU' , 'NEXPPX' , 'MUG7WB' , 'TVYFCM' , 'CMEPX6' , 'RV6BSK' , 'GRSXCP' , 'H4PMWY' , 'JKRKHU' , 'BFYW6N' , 'AY3A7E' , 'XSPB64' ,
    '3H6FM4' , 'EWTEA3' , 'EC3R5T' , 'R263EB' , 'CYYYNW' , 'EWBJMG' , 'G4S8VX' , '6R547S' , 'TPHBKR' , 'VAMKTR' , '37DWYY' , 'KVHBTS' ,
    'F9PNBG' , 'P4CETK' , '8S9D64' , 'WGPN2C' , 'QRYUJG' , 'GNYQGQ' , 'JDJK9D' , 'XT5FPP' , 'K77HN8' , 'BDSN69' , 'MC67P9' , 'CW8UT6' ,
    'CYWSGV' , 'KG5GB6' , '3S8EHS' , '6SJ6DF' , '9MECBU' , 'Y73THE' , 'DYPJTH' , '82D9SH' , 'TYMPKJ' , 'RCGP9S' , 'RCHP9S' , 'F2H53V' ,
    'JY8NPY' , '89J8MK' , '2WCMCQ' , '7PU48S' , 'YJCH46' , 'Q9SJM9' , 'H7X7C2' , '3UM6KC' , 'MQU56W' , '5MN2KE' , '3PAY7N' , 'VG5PJ3' ,
    '5UTKJ6' , '3FKXVQ' , 'J2QVKK' , 'E55SD7' , 'NAYYF5' , 'TGF8S9' , '2RRV4P' , 'K3AY5Y' , 'JDPJ8U' , 'QV96PK' , '3MQ78N' , 'N4M5NT' ,
    '5FN5PN' , 'M4PM9X' , 'M7BW9A' , 'E5C35C' , 'SJGYTU' , 'WKVHCY' , 'UBJ75B' , '4VDR43' , '8HFD76' , '2BSW3C' , '76CM3P' , 'RMVSJP' ,
    'JKKJCU' , 'H56RQN' , '3VRVXH' , '9EWT7V' , 'EC4BHE' , 'K9498E' , 'GRYPAW' , 'YGMHMR' , 'E5RRPW' , 'R9XUJY' , 'MF4YDT' , 'VDF5MH' ,
    '6DBJHE' , 'GSD9EA' , 'RG99C6' , 'DTQ2UQ' , 'PB8FK2' , 'ARMPXV' , '7MDWK8' , '5HW58T' , 'PMMFAN' , 'HP4UQM' , '834C9D' , 'CF6Q3Y' ,
    'WS4VT4' , 'BRRRAC' , 'YPXYRW' , '3TYMM4' , 'X4SBHY' , '3JSH53' , 'DTEK7T' , 'PDHGKS' , 'UJY2JB' , 'YTNRR8' , 'KBKEW3' , 'YPYP44' ,
    'PQ48J3' , 'D9C3VB' , '3R7X8V' , 'XGPNMC' , 'R7HFY6' , 'YVA9WF' , 'C35SAK' , 'YW2D8E' , 'T5QWCF' , 'NP6S4M' , '4559X9' , 'APVQTP' ,
    'EGH9WY' , 'T43G55' , 'X8GQ9E' , 'NJYT93' , 'D3JVHV' , 'S72A2D' , 'GBJQCF' , '4T6E4J' , 'ANXVXB' , 'UHPYCK' , '45PBGN' , '57R7K3' ,
    '9SGG4X' , 'EG43QC' , 'XGQQM2' , '2288MP' , '6MFD2H' , 'T54YKA' , 'ANT2JE' , 'ADPDYY' , 'U8B8T5' , 'UCQQET' , 'F658G6' , '3EJEWU' ,
    'TMS5A4' , 'HBRRE4' , '9JA4HH' , 'P22JDC' , 'KWDJHG' , 'BV333G' , 'N4BQD5' , 'VAC6Q7' , '896A5D' , '5FGBF7' , '4KT4PB' , 'U224VX' ,
    'WQAJR4' , 'MCQ5NV' , 'G3WTEM' , 'GG52AS' , 'ENT654' , 'D3JVHG' , '4SKMP6' , 'KUSFU6' , '46J68U' , 'BEV2DE' , 'KR3M7P' , 'W285DB' ,
    'W6TQA6' , 'K5VM7H' , 'EBR6AW' , 'Y2Y659' , 'A98CFC' , '3NJQ46' , 'GERMAG' , 'RK4VAP' , 'QK8E3G' , 'G68VTT' , 'QSQEHE' , '3U48M4' ,
    'YSTX5X' , '3CTNXP' , '86EN5Q' , 'RJ9SRK' , 'AUHPJ9' , 'GPP2D9' , 'KFWFY9' , '4RAWA8' , '2HQYQJ' , 'V3P4UA' , '9UT83J' , 'HAXKGH' ,
    'KMU7JU' , '86YN7P' , '4DTN87' , 'RPM7P8' , '49TQFD' , 'PD6VE2' , 'XQW8AP' , 'UM3J6N' , 'REC5KB' , 'SURAVN' , 'SFU5PG' , 'DV3CT6' ,
    '2XUPRV' , '32CK3N' , 'WX73J3' , '6HA46C' , 'UJJGWH' , 'B26ATN' , '85UM6B' , 'X9XN6U' , 'DAHBUT' , 'RXRYX2' , 'U9QJK3' , '8ED2Q3' ,
    'DWK9CS' , '5SB7TV' , 'VG8CK3' , '6824KZ' , 'VR9BMS' , 'EDVCDA' , 'VP3AH3' , 'Y4DAPT' , 'YQWAWJ' , 'MCQ9MG' , '353CFX' , 'YNRR24' ,
    '7CN9V5' , 'BDTNB5' , 'CE748B' , '756RCK' , '2AH3GP' , 'V5EGQF' , 'MYCJB4' , 'UNXJYC' , 'UPMS3S' , '3U22MG' , '6DBABH' , 'UJ7GJK' ,
    'HUJK44' , 'MJEYKY' , 'D7AX2C' , '982V2D' , '94PF8X' , 'N3BCNF' , '2M5T23' , '4TJEWQ' , 'UABTYT' , '4S3W83' , 'PKYC7R' , '4WNCT7' ,
    'RWKSDW' , 'GSAWET' , '9N3MJJ' , 'MRXQ5E' , 'GSUHHT' , 'BVKJPB' , '6JSRMB' , 'YPFTXG' , 'QFX659' , '3RS688' , 'H3UPSG' , 'RTBQ23' ,
    '33AXQM' , 'KWFRJD' , '8C48D6' , '7RF9NP' , 'FPJ8KP' , 'QUFHHH' , 'EH3XQJ' , 'CR6575' , '5SKBKS' , '7JYGCM' , '8RGR4A' , 'C6M6SR' ,
    '26HDW3' , 'XBVTET' , 'JCRRHA' , 'R5X99W' , 'J8Q52M' , 'NK78P2' , 'HTNDP5' , 'PH29MV' , 'B5F7FV' , 'MCNAFY' , 'KP7ARK' , 'YQ7NGF' ,
    'V85TDQ' , 'TWJVPJ' , '2GYCWN' , 'PISSED' , 'YHCFCY' , 'CTNFSY' , 'MX6MYF' , 'CPT5YX' , 'EYKG9H' , 'TDBAT5' , 'JAA6PH' , 'Q2H2QS' ,
    'HXU35M' , 'V3GNBK' , 'K4BQYX' , '5V2E55' , 'Y9TCWQ' , 'VHP5EH' , '6YX95C' , '6N9U28' , 'F6F4RD' , 'TCM3WS' , 'YBHWPC' , 'V3X3WF' ,
    'Y7USAD' , 'TBGF3J' , '2UJGEE' , '5T85XE' , 'KYABQ8' , '8J8ABB' , '6YQT9V' , '5RDAFV' , 'PW9WMD' , '6SNJBH' , 'H57R7N' , 'PR47KY' ,
    '6P9BTX' , 'QVBPMQ' , 'BA8TQW' , 'HTC4VE' , '66HF3W' , 'TR8U9S' , 'NXA5NE' , 'MF4GHP' , 'SH9WTD' , 'UMX7B6' , 'UY6EC6' , 'GEQWKN' ,
    'AGVAKK' , '69NJ6G' , 'H9SFVS' , '6S7WRE' , 'GP63QX' , 'RSCMCR' , 'CR3W55' , 'Y3FNS3' , 'HSKFNX' , 'QX9UDK' , 'WWBEFP' , 'XRKU2R' ,
    '4R793C' , 'VJSRW3' , '3E8RKT' , 'UKNHJE' , 'GPS9MR' , 'VVYSPS' , 'FD52TA' , '7NDER4' , '2FFMMR' , '5P5JYM' , 'W7QWQP' , 'DAQ6QH' ,
    'HQQQFC' , 'X7N87T' , '4M7XMJ' , '4M7XMS' , 'TUHF2Q' , 'W4AEV3' , 'A79J68' , 'FGWRAU' , 'RX9TF2' , 'B89YBR' , 'NH3NNM' , 'BBA43U' ,
    '3BKE5T' , '6PRSKP' , 'XR9R3V' , 'EPAHVU' , '9ME8YW' , 'BWQJ2H' , '3KFRXM' , 'UUFB3G' , '7NDWJ7' , '4C3C48' , 'BV25R5' , 'NYBXTE' ,
    'TGF475' , 'FRYGDB' , 'YJ266A' , 'BQSPV4' , 'DADENY' , 'DM7ATJ' , 'B84YW2' , 'DTVXC4' , 'HSJW7W' , 'P2VCWN' , 'SPJ4QF' , 'RB2H34' ,
    'HKDRDD' , '9E3FFP' , '6W54DP' , 'WRQXB4' , '2SU234' , '9GNCEU' , 'QAUXK8' , 'VUWH6F' , 'QC9CGM' , '3S3MCX' , 'VHMC26' , 'JPMBJK' ,
    '9GYHFJ' , 'TSGFQQ' , 'TAV2N6' , 'PV3N4D' , '9D27E5' , 'EJUCBQ' , 'KNHGJR' , '7H4V32' , '9YBJXN' , 'TYDHB9' , 'A6BSQH' , 'HWGK3E' ,
    'GA5XUX' , 'HB4QP9' , 'VXG29B' , 'TRTBHX' , 'CYRQNH' , 'FKTSU4' , '9X2M8T' , '8N468G' , 'Y3NXH7' , 'MSKAPE' , 'C3QSY4' , 'K4W2BF' ,
    'XABNBE' , '2ES45K' , 'GF7G95' , 'U25J8Y' , 'UW53B7' , 'VVC8U4' , '3FAPQU' , 'U8XENC' , 'HHTFQM' , 'XSMJAD' , 'JJDA2X' , 'HW5VYV' ,
    '66M23J' , 'U8DHEC' , 'AYJXHF' , 'MC6ME6' , 'EYN8DF' , '3S4RJ6' , 'A99J66' , 'TUGUH6' , 'FFTBFS' , 'AVEK3T' , 'U6YFH4' , '94G233' ,
    'PT63DG' , 'U4V869' , 'VM8TES' , 'HG5VED' , 'VHE5D9' , '8S78RV' , 'PCFTQA' , 'VGQSM4' , 'S3429P' , '3CWU6C' , 'MKA8F5' , 'GYAQTQ' ,
    '6YM7C9' , 'QKSRAJ' , 'E9G249' , 'HR7R7V' , 'G3MEKR' , 'BFUK3J' , 'NE8KTH' , 'XVBNGJ' , 'TM784N' , '2S4JK6' , 'M8SCPF' , 'UEJKYQ' ,
    'V33UFF' , 'WPMTF5' , 'DWWFDW' , '7PPMEF' , 'S58BG8' , '9V92BH' , 'H27632' , 'QUTSY9' , '7B4TS9' , 'NF3FXC' , 'HUTU5F' , 'GQ7USQ' ,
    'HQ9U6X' , '7QVCT7' , 'W44PWJ' , 'HK3SVE' , 'C247T7' , '8FVKU3' , 'EH4DKH' , 'F4UJYN' , '24UVVU' , 'YVSX85' , '953F7A' , 'QGYP4S' ,
    'C9SCTK' , 'G28V8Y' , 'UWXRY9' , 'QT38WN' , 'HRVBGR' , 'XRNDXU' , 'HDAM39' , 'UUWWJ7' , 'VDGGMH' , '4FCFP4' , 'CEYWXC' , 'DGKBBQ' ,
    '45KMF8' , '78RST6' , 'PSGXS3' , '5HWKAX' , 'YRA9XY' , '9YVDY6' , 'VP8VNK' , 'VTYV7Q' , 'XXXD29' , 'GXMJAS' , '7HSCBD' , 'S3GFH4' ,
    'HDHS78' , 'NDRPA9' , '4CNW4F' , 'S75WAU' , '57M8H7' , 'JTAHEU' , 'MS8QDD' , 'R6JUDA' , 'E895UN' , '473528' , 'VFAXGP' , 'UA9VAH' ,
    'Y2CGGM' , 'A7STR5' , '92AVU6' , '6UVPYX' , '4PNU1T' , '5C3BFJ' , 'VJFTJJ' , 'PUX27Y' , 'WVC23X' , 'YH3WMF' , 'W6YQ88' , 'XABDCQ' ,
    'AXDHDM' , 'W7U45M' , 'X4KW66' , 'BKXEAH' , 'N3R4YS' , 'UXP43M' , 'PRUS6T' , 'KE8BJK' , 'BTHWAU' , 'N63A4W' , 'KNVV68' , 'RVEANK' ,
    'R9ERUP' , '6SREUR' , 'MV2TW9' , 'HT3M5H' , '89Q3RD' , 'HKNK87' , 'NBY8NW' , 'VTZUNM' , 'FSRYWV' , 'T5BFGD' , 'C6RRKW' , 'RQ7QH4' ,
    'YSAB65' , '236CT4' , 'JHSH7Q' , 'NNYFPW' , 'A9PFHW' , 'JMPBJK' , '9FCBWB' , 'ES2XNS' , 'WMS5JQ' , 'MPMEDS' , 'NXKG5C' , 'RD3QQG' ,
    'GDJB3V' , '6R7UUM' , 'FNVAKS' , '3BEF9D' , 'DJQ9GY' , 'J8MF4S' , '2A5HKT' , 'GNHKUE' , '7YKRNF' , 'EU3CJM' , 'FFVNSD' , 'JXP76U' ,
    'FP7AU2' , 'N7GBP2' , 'PMCRVB' , '9JAM9E' , 'S5XVQX' , '3WF267' , '53A6U7' , 'R9JJKH' , '86BCRB' , 'W27RAU' , '6KF8RB' , 'EUTYMM' ,
    'PADCDT' , 'F947T3' , 'EDHDBM' , '36DRCW' , '4E3R7F' , 'W732CT' , '85U23M' , '6E2HU3' , 'HPC77N' , 'PYCVSS' , 'S4VFEK' , 'EUXWRU' ,
    'T7FSJR' , 'EUV8NV' , 'EVSNG5' , '2Y7DWA' , '9VU5VF' , '4T8JFD' , '2HWM35' , 'XMTMPT' , '25AUNC' , '7UKEPN' , 'A7E7KP' , 'V862WJ' ,
    'AHBQ78' , 'XMXBCM' , 'A42QTY' , 'MJA3HX' , 'PYKCJW' , '9DYEQP' , 'TNTTFU' , 'HPE62E' , '3HPW7G' , 'DDDVND' , 'XW9EYN' , 'YMV64G' ,
    'SDWFJ6' , 'URUNQU' , '9JG9KQ' , '7T79AB' , 'F6FFSD' , 'R75TGM' , 'TBJKC2' , '25MBTT' , 'TJNRN2' , '42NSFW' , '23EP24' , 'SHH4HN' ,
    'K22KQR' , 'JKAVA5' , 'R5RG56' , '98349N' , 'PK2S4W' , '3WFDJ9' , 'VKY8U5' , 'J6JERQ' , 'N6SYS6' , 'KD84SD' , 'HH59VF' , 'K3Q8M3' ,
    '9VTPWV' , 'M2YJE8' , 'U2NYBF' , 'T5AVDA' , 'WJCFNE' , 'HVQNKX' , 'VEDHH3' , '9GPWCS' , 'FCJMEF' , 'PPBBG8' , '6WR54R' , 'WUTKJB' ,
    'TBM2MH' , '3YXCJT' , 'MX3FT9' , 'KTNYJW' , 'GFF3MV' , '2XCQUT' , 'ETN6HR' , '275DFS' , 'QN982P' , 'EX2XU4' , 'Q48DC4' , '396VAU' ,
    'RFQ4CF' , 'MFKR6W' , 'H34QXP' , '72CXXN' , 'SE56XG' , 'EXJR5X' , 'YVH4RX' , 'XAQMQV' , 'J5DQ2X' , 'SABKE7' , '7SRU75' , '43NUR3' ,
    'HTQR8G' , 'MRTBKV' , 'PB3RHU' , '42NVJS' , '73EYGJ' , 'TF5KRF' , '44D8RS' , 'CK4WA8' , '9GD2HW' , '96P5DE' , 'PQBUTD' , 'G29KXK' ,
    'T653X2' , 'ARQ6SY' , 'EFPDCA' , '93NSEM' , '39RFNH' , 'F4NF5V' , 'WK94S7' , '32UJHY' , 'YTDSAU' , 'DPDA6P' , 'J9ACEK' , 'V5T6YG' ,
    'WN93YA' , '3W6G2B' , 'KM2UHE' , 'VCD6YM' , 'APMX9B' , 'H3GUHE' , 'PY9WTE' , '7S887K' , 'MA3MH7' , 'A3J7KJ' , 'VCRGV7' , 'T5DFGD' ,
    'RCHGJ6' , 'GMUKAT' , 'U4DFSC' , 'A58D62' , '5VW2D9' , 'UPS9X4' , 'G9XJ9B' , '9QNUEU' , 'KPRRAV' , 'QHWTX8' , 'S9R2U7' , 'FGP79A' ,
    'G74Y2P' , 'QVKETV' , 'GTG3GX' , 'NW3FX8' , 'EVMAF2' , '59CPRT' , 'TUEHYW' , 'YCAUNB' , '9JAJ79' , 'SRQYQ9' , 'KHXFYR' , 'BWC8SX' ,
    'V2EYQX' , 'VBXB3V' , 'BFRUQR' , 'BFRUQE' , 'CDBG84' , 'EDSBU5' , '77DQCS' , 'SER7Y2' , '6W5638' , 'TBBAWK' , 'N4TR2Q' , 'CS9Q8N' ,
    'J9DUCK' , '4XR84G' , 'PUW3PD' , 'WPX3XW' , 'U28EDS' , 'XGG4P2' , 'VKWBVF' , 'TDNKFP' , 'VP3STD' , 'PCV8XR' , 'FANNJR' , 'S6K6XB' ,
    'W3WBKC' , 'VBYEG7' , 'JB8XP8' , 'G4RM4J' , 'URQN5D' , 'GRPTQ4' , 'UHAT9K' , '7PPVKR' , '6NUEV2' , '7CYSC9' , 'B6TDBH' , 'WFHQAK' ,
    'XS8VNE' , 'C6J6M6' , 'YD7R7A' , 'SVCV2G' , '7UNNQV' , 'DUCE8P' , '9UUJSP' , 'HN2RHV' , '8EUX4P' , 'WAFRDC' , 'BMTKCX' , 'AJ256D' ,
    '4X6232' , 'MFR8U5' , 'EFAJSK' , 'J9GKD9' , 'W5FAQR' , 'RWN3HH' , 'HRDBNT']

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
