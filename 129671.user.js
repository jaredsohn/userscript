// ==UserScript==
// @name           Ninja Live Clan Code Auto
// @namespace      ePi
// @description    Invites a whole bunch of people to your clan
// @include        http://nl.storm8.com/group.php*
// ==/UserScript==
var numClick = GM_getValue('autoclicknum', 0);
var codes = [ 
			'YFK36' , 'K6UJR' , '3N38B' , '9DANR' , 'YVMCA' , 'GSMM4' , 'USR6T' , 'EHEUX' , '3DC8C' , '6GA8C' , 'ETT25' , '3H3HG' , 'A96GP' ,
			'U6D38' , '5DRXH' , 'YDHCF' , 'BM4PS' , '43HYB' , 'GYUTM' , 'G6TGQ' , 'VM9XQ' , 'R7A57' , 'JV5QC' , 'ABBXM' , '2GUX9' , 'GF48Q' ,
			'2J4QG' , 'YFHCF' , '92XWY' , 'HDEDT' , 'Q3VX4' , '6MVNR' , 'SWVT3' , 'YAHMT' , 'WUSVG' , 'YPS8M' , 'FCSGH' , 'HYYGH' , 'D3F9V' ,
			'RE4TQ' , 'VQ96M' , 'TF3YX' , 'N5XVB' , '7MX8W' , 'CY6T5' , 'FVW5X' , '8PRBF' , 'CKYYU' , 'TRDEW' , 'MU4WS' , 'ABTHB' , 'VYFHF' ,
			'S5Q64' , 'PJPM3' , 'DYGK7' , 'N6H5H' , 'YV7DA' , 'G3KNX' , 'H7SE3' , 'NRBPM' , 'YPET5' , '6X4TJ' , 'NC524' , 'XEMRQ' , '8YHKT' ,
			'HUJ68' , 'NXETY' , '8TSM7' , '4TG9X' , 'E7D2S' , 'WEGA2' , 'UKU3R' , 'WRSS6' , 'Q2QU2' , 'UWPUS' , 'J2SBW' , '4MGXG' , 'EQ33Q' ,
			'RH7B8' , 'XQ92Y' , '5FFJC' , 'PQJRV' , '7CU69' , 'YTXSG' , 'EEPPC' , 'R9HQC' , 'BUN67' , 'HYYGY' , 'YGGG7' , 'XMCCB' , 'A69C2' ,
			'M7HPK' , 'WJ2EF' , 'AY9XT' , '4NH72' , '7BB57' , 'AE6EH' , '5YSX4' , 'KR75H' , '33TA2' , '6DGK9' , 'HXV8T' , 'BXQBN' , 'X8QQU' ,
			'EURNM' , 'CVCF2' , 'D8Y28' , 'BXEEX' , 'E9NP3' , 'AMFV2' , 'A4HJB' , 'PS3KX' , 'UVBHD' , 'TSCUQ' , 'G2ASN' , '54FDB' , 'HCSQ8' ,
			'7SXAX' , 'EPR7R' , 'P2HKT' , 'PH64R' , '7FHY8' , 'YFR69' , 'VTC9S' , 'VGM45' , '97Y4T' , 'P8YRS' , 'S8GQ8' , 'VVYVE' , 'J6F7J' ,
			'NEVAC' , 'H8PSE' , '6DCMS' , 'SED2Y' , 'UXWQW' , 'CSTTN' , '8TGVN' , 'XQV9R' , 'FPMHC' , 'SK2X5' , 'SANCF' , 'R229W' , 'BDVRU' ,
			'AU2ST' , '8MMRR' , 'Y96JQ' , '5QKJK' , 'UWBR3' , 'KX7TF' , 'ECQ5D' , 'E97AG' , 'XQM24' , 'BQ6NA' , 'XV4TP' , '9FSY6' , 'AEKGE' ,
			'4NMSM' , 'VERE6' , 'SYPD5' , 'Y4TBN' , 'BA8QA' , '6SJ93' , 'NGCQP' , 'HJ67B' , 'Y2RT9' , 'VN9VQ' , 'JSE6U' , 'WBBVH' , '9FPUU' ,
			'HT38Q' , 'JV8F6' , 'CCYDJ' , 'YART9' , 'T3UQF' , 'JTXJX' , 'CN7JY' , 'TW57H' , 'PNDFB' , 'V3C4U' , 'WF59J' , 'BUY7C' , '3SRWH' ,
			'M7GMM' , 'F7SBY' , '4KDCY' , '5B44F' , '4SCVT' , 'YWDHV' , 'B9G3J' , 'R7YUQ' , '46VUA' , 'C73JT' , 'MQAXU' , 'E56SQ' , 'H3WCG' ,
			'6ANPG' , 'JUKJY' , 'QX7KA' , 'R66JR' , '58EDE' , 'P97QP' , '6MDAP' , '69NEY' , 'KQS2U' , 'Y33DN' , 'GQ7DJ' , 'RPABU' , 'A9BXF' ,
			'VNVC4' , 'A3CYQ' , 'CJGJ7' , 'P35UW' , 'GUJ5V' , '387UA' , 'KFK9Y' , 'PDRYP' , 'T867E' , 'C853V' , 'G7XYP' , 'QSP4D' , '2UYA8' ,
			'YHUB3' , '3X394' , 'HSHX7' , '2GQDX' , 'U8THN' , 'H54RC' , '7EBUC' , 'XNRRE' , '6ET3D' , 'HSFGN' , 'HUVT9' , 'X8XJE' , 'YDX4B' ,
			'6HMKQ' , 'R299W' , 'RTQC3' , '2KV4U' , 'FUJPW' , 'JP4W3' , 'SKP3U' , '9KM4Y' , '9ANWY' , '9XXJE' , 'X4RV5' , 'SUACV' , 'BFC8W' ,
			'NCBJD' , 'EYB8E' , '6PXSH' , 'UWQYX' , 'GXWPY' , 'R8KBS' , 'BYHB5' , 'P78J6' , 'GYBEK' , 'EFJUQ' , 'UNKTF' , '264AD' , '9J2FH' ,
			'6KYCB' , '3J6WK' , 'ANG7B' , 'JWE8T' , 'NEX7Y' , 'FAYPS' , 'TMAAK' , '5S563' , 'RMPXN' , '2NAYN' , 'K6G5V' , '4XWHK' , 'W8PAM' ,
			'A6AFD' , 'UURCC' , 'THNFX' , '6SXAA' , 'C63SQ' , '4G8NY' , 'MNF34' , 'Y5XU8' , 'M3NGA' , 'BY77G' , '5PGRK' , 'HE66M' , 'RBVMQ' ,
			'HC4QS' , 'MQ864' , 'WCAG9' , 'RCFBE' , 'SCRA4' , 'BN54T' , 'C2GSC' , 'MNNTE' , 'KCWYJ' , 'SMGSH' , 'YX4AR' , 'RM6SJ' , 'UER9A' ,
			'7EVGH' , '3BJAF' , 'EUPR5' , '7GS5D' , 'BGFMF' , 'T7TUQ' , 'P3BKQ' , 'CNMC2' , 'D45WD' , 'HPY9H' , 'Y8A22' , 'UGNVW' , '89TNX' ,
			'KXDPT' , 'J2J9H' , 'UQU8P' , '8CJK2' , 'WXG48' , 'AAD3E' , '4MPYA' , 'SU2F7' , 'SERFF' , 'K727W' , 'E4VT2' , 'Q63VV' , 'WG36U' ,
			'EKWTP' , '7XR4R' , '4B6AY' , 'HW9JR' , '4QCA7' , 'PF99W' , 'CU6WW' , '9K2VK' , 'DUJVS' , 'TY48X' , 'P2CR5' , 'G4J63' , '9KEP9' ,
			'QC4XD' , '4DR4U' , 'H7DJX' , 'GAFV3' , 'XXSQP' , 'UMAHM' , '4EB5E' , 'NYVR7' , 'W9AAB' , 'NPF6X' , 'HVCD8' , 'P6VFH' , 'BHSUG' ,
			'KXT2T' , 'TRKVA' , 'QYR85' , 'WSF8C' , '2F42E' , 'SNRM7' , 'U6YVN' , '5932A' , '7EFY8' , '3XP8X' , '5PFUW' , '8U4J6' , 'VMGD4' ,
			'5N6KX' , '5UCJ6' , 'T5H66' , 'JEUJT' , 'HWSPY' , 'QE8DM' , '89K2D' , '6686M' , 'J6P3J' , 'VS45C' , '7RYG4' , 'EHCJE' , 'WC575' ,
			'WU4B2' , '78JG6' , 'UJGCF' , 'WYVGD' , 'NVGFK' , 'XKMYW' , 'F63DR' , 'E2TH6' , 'J35AN' , 'DW2FM' , 'XKTYB' , 'YFEGD' , 'Q4TKQ' ,
			'8Y7EQ' , '42YH8' , 'EGUWN' , 'SUT3E' , '533AB' , '8QKB7' , 'PY5JP' , 'CMMEJ' , 'T47FY' , 'QKMSS' , '8JFMH' , '5PBVQ' , 'MGFW6' ,
			'BTG4E' , 'NSVS5' , '5U4BE' , 'A6H87' , 'Y7HTC' , 'V4GQN' , '4VD54' , 'QDJQR' , 'WV5SE' , 'GBUC2' , '2UMSV' , 'URVM2' , 'J6Y6E' ,
			'XPHBV' , 'WQJA3' , '7RPJN' , 'EBMR8' , 'DUC6N' , 'EPFRN' , '4G7US' , 'ER6DS' , '7SGNQ' , 'P59QH' , '2P2HT' , 'TRGC5' , '28KV3' ,
			'DH3EV' , '8PV7A' , 'RQKCW' , 'ETHHY' , 'JFK2V' , 'YTAH9' , '7W53W' , 'EAMVX' , 'A9G2C' , 'D9HWK' , 'P3N6K' , 'QTS2J' , 'N5AS2' ,
			'M9HUV' , '5BGJ3' , '4BQ45' , 'FEA7K' , 'NV3Q8' , 'ERCTP' , 'H474V' , 'X8SDQ' , '3T68A' , 'S5C3N' , '8WPQ9' , '672MM' , 'F53AC' ,
			'445WF' , 'PJQJG' , 'TCTED' , 'JB9KQ' , 'NVP2F' , 'E5EGK' , 'BEE56' , '9M8YY' , '6T8Y3' , 'Q6UBR' , 'YGXK3' , 'WHXVH' , 'ANJF6' ,
			'K9QNR' , '3MDNT' , '5D4JJ' , 'CAXCN' , 'PDC3F' , 'F5DTQ' , 'ADKBD' , '6972B' , '7P6X9' , 'FP93E' , 'K98UY' , 'G6JN3' , 'WW9PF' ,
			'ABB2H' , '9UH8X' , 'VEA56' , 'DJ9HA' , 'CTTXN' , 'U7QYN' , 'SH6R2' , 'FV88G' , '3FS97' , '8JHX5' , '6T8U3' , '3VR99' , 'RDQYH' ,
			'JG4EF' , 'RJ6WA' , 'TSDYX' , 'Y537J' , 'MBB2U' , 'P28WH' , '677WE' , 'BEQ2V' , 'CRJ54' , 'EX5EE' , '39N97' , 'XHT33' , 'SNN3H' ,
			'T52JD' , '47SJY' , 'YCXFC' , 'BAXPK' , 'X9JC5' , 'B57J9' , 'AHSR2' , 'CGTHG' , 'V4PET' , 'X2NWA' , 'BAW73' , 'RPGT3' , 'KNVPT' ,
			'EVDQM' , 'BEW2R' , 'WP4WC' , 'DDC6B' , '3RG3R' , 'Q5XKX' , '6Q4D2' , 'DKVDV' , '8T7B8' , '8W9EE' , '92C67' , '6XG2Y' , '5EN4T' ,
			'SQAHQ' , 'E9QH8' , '2YEP8' , 'AU8JK' , '7KT8G' , 'BARQC' , 'XSUHX' , 'HGYNK' , 'CNWJK' , '6ET6T' , 'Q6YXW' , 'XWM9R' , '3DD4D' ,
			'7447E' , 'AGCUK' , 'QTCQT' , 'CB5H7' , 'A5Q2N' , 'KTDB5' , 'STBY8' , 'GKMNN' , 'RB7KY' , 'UK8AN' , 'VSFHR' , 'FKY46' , 'URQ8F' ,
			'X3RT5' , 'XXUNT' , 'CPYF5' , 'A4DR5' , '94NEV' , 'RWQRC' , 'H8M6R' , 'XJGD9' , 'S9KX4' , 'UH5RW' , 'DX5GU' , 'HMK58' , '5YRTN' ,
			'6EG7K' , 'QFN87' , 'XTHHF' , '79D9A' , '32WPP' , 'EP8Y8' , 'TMR48' , '66DYD' , 'F99ED' , 'X46TN' , 'JFXH2' , 'WRDXQ' , 'A5QN2' ,
			'JCBYG' , 'KJ3YC' , 'WV59J' , 'F6T2W' , '5AK39' , '76BXV' , 'F8G24' , 'B6YY2' , 'XE6JF' , '7UUG6' , 'BHFVR' , 'MRT4U' , 'FNEXU' ,
			'BAFJ8' , 'RXNC3' , 'CMW94' , '3WW7H' , 'WYS4A' , 'XH3W5' , 'XBKPG' , 'B224P' , 'VMK8V' , 'BRVKF' , 'SU8F9' , 'ETFWC' , 'V6N8P' ,
			'ND922' , 'VTTAY' , 'GW9NT' , 'HJXGW' , '4W635' , '4KCBQ' , 'M8TMM' , 'CXHUQ' , 'XMKKN' , 'VHWQK' , 'SFR68' , 'NYRQT' , '6GMWX' ,
			'PXA8A' , '3TPQG' , 'T26DW' , 'VSK2G' , 'WHA44' , 'VBX9E' , 'V8PJY' , 'XWSGK' , 'FKHDH' , 'KJWG7' , 'MCKJT' , '32QQR' , '549PD' ,
			'GGJPE' , 'HAW53' , '6W64J' , 'D3A8X' , 'GNBS6' , 'K8YJS' , 'P4RPU' , 'J3GQM' , 'W2378' , 'VP8JY' , '4QH75' , 'BV5MT' , 'GJTKC' ,
			'E65QU' , 'VXETV' , 'F9T33' , 'BU5MJ' , 'FJ3VD' , '6QVC4' , 'EMJAA' , 'EW3PE' , 'JDH7G' , '6WVN6' , 'H3RHA' , 'JWADD' , 'MMDYT' ,
			'4YNWE' , '2N68Y' , '73YMA' , 'H9GNM' , '995PW' , '8PYX7' , 'JFDJ3' , '6RWPQ' , 'EY39J' , '9KQKU' , 'DXV7W' , 'KU8J2' , 'X54HE' ,
			'KJ23N' , 'QK3VW' , 'JS6EU' , 'YSJN9' , 'FGRCR' , 'R4358' , 'KW4QK' , '5SPYG' , '54VGU' , 'TCGJG' , 'WCPXK' , 'FBP9R' , '93JNK' ,
			'HRHV5' , 'MRHJK' , 'H92RA' , 'FACPS' , 'UN69C' , '54GNW' , '8KVJ6' , '3A7H4' , 'NJ5Q9' , 'KWGSV' , 'DQFH6' , '5VBCA' , 'KSD28' ,
			'SMY4P' , 'XC77C' , 'N6T7A' , 'XKDUX' , 'FJ7DF' , 'CFU6P' , 'XCD7B' , '4F7G4' , 'MBRBV' , '8KU4C' , 'SQNN3' , '36HVP' , 'T2WWK' ,
			'U73UP' , '6X3MY' , '8DQAP' , 'PHS5T' , 'R5TVA' , '4B7CW' , 'J26JG' , 'ABJM6' , 'G2M74' , '23SHN' , 'KX95B' , 'DU268' , 'TWV42' ,
			'CPKMY' , 'A7FDW' , 'CWNK6' , 'R7H8J' , 'N7AYB' , '7ATMW' , 'P8FSY' , 'V8W8C' , 'QFE8K' , 'QP69J' , 'VY9BR' , 'H5DAD' , 'RTHPG' ,
			'N295C' , '98BKS' , '3VWFE' , 'K95WB' , 'SR6M9' , 'ASYDF' , '5J2PX' , '85Y44' , 'RCGGK' , '98XV2' , 'HRWPJ' , 'M3E85' , 'YQX2M' ,
			'NTH8J' , 'GT27H' , '6NAJ8' , 'ESBPT' , '3U3GN' , 'FJJ8A' , '95EES' , 'VBVNC' , '9R3VN' , 'PAXH8' , '573SM' , '75SEN' , 'RTVUY' ,
			'3E4PK' , 'VBEGR' , 'BFK29' , '6ARYQ' , '4NP9Y' , 'DHUNV' , '34MB5' , 'YK7G2' , 'S84JF' , 'WMQE8' , 'D5T9C' , 'J9473' , 'D3SRE' ,
			'UXWWG' , 'MN2G8' , 'UUYXA' , 'V6B76' , 'KEY5J' , 'MMEXT' , 'X4RB2' , 'KU4QE' , '7WV9T' , '98MX7' , 'QME7K' , 'FV99G' , 'JKT94' ,
			'N9D9J' , '5FABW' , 'MK4A7' , 'TC3M9' , 'YBHS3' , 'RQKBD' , 'RDRXH' , 'APYTM' , 'TQJC4' , 'A2NXH' , 'RQ9QX' , '7QXUS' , 'CXBGV' ,
			'EWWWW' , 'FT3YK' , '78Q4F' , '6FDS5' , 'HEE4K' , 'DKUEH' , '7WUWV' , '4VG5M' , 'BYX44' , 'PANEG' , '7GNWK' , 'P6CBW' , 'SHJV6' ,
			'WYAG5' , 'F8FW7' , '4A94N' , '9Q6T3' , 'WUKX9' , 'RXQQV' , 'KDRSM' , '3623N' , 'AMCHB' , 'C7VTW' , 'KDWVD' , '252E8' , 'BYD59' ,
			'SDQUU' , 'U33HC' , '4PDCB' , 'C7XNX' , 'RGKEG' , 'UTKRS' , 'GXG2F' , 'N3MJA' , '8PXM4' , '396DH' , '74NTF' , 'BXSN7' , '23J7R' ,
			'W8DTP' , 'GN8G7' , '2M8BX' , 'PVDFD' , '9MF5R' , 'QU7U4' , '3P2EY' , 'PJK36' , '934YS' , 'TPRXX' , 'NA3TN' , 'TFUHF' , 'XQWS9' ,
			'SE9N8' , 'D9RC6' , 'AD9C9' , 'Y5R4Y' , 'E2GNA' , 'HD9CR' , 'U3GCT' , '3RFBQ' , 'GJSTH' , '3WSEQ' , 'NMMVF' , '4PV7G' , 'R4XUX' ,
			'M2K2S' , 'DXGR9' , 'TXRN7' , 'RQF9H' , 'X9VN5' , 'SYEEM' , 'KX9P3' , 'Y4PFV' , 'KC26B' , 'KY6G7' , 'TEU82' , 'TK9HG' , 'GHTGA' ,
			'S5VPD' , 'UU8N5' , 'XCXTT' , '684T4' , 'UTE38' , '5UKPG' , 'X4UHV' , 'GPTFE' , 'F2BYM' , 'WJ8X4' , 'J53F9' , '2HJUY' , 'YX82E' ,
			'85DAG' , 'KDVU9' , 'DCTCE' , 'K8B2J' , 'UMEM6' , 'U9QXG' , 'M8VHQ' , 'FC6BJ' , 'G3YKU' , 'E6RWD' , 'VY4BB' , '9AM85' , 'YPQBV' ,
			'9A4RV' , '478S8' , '58M3T' , 'QRC2N' , 'NYRE7' , 'BG47S' , 'NVSMY' , '4Y7EK' , 'DSAFK' , 'WRH8D' , 'JV48P' , 'BT47H' , 'A487E' ,
			'83NUJ' , 'RWKTN' , 'PDTCA' , 'BNJ5F' , 'HBVQE' , 'BKQWF' , 'HRFSR' , 'YY6MV' , 'MVUWB' , 'SYF8G' , 'R45SU' , 'AJ22M' , '4C7BM' ,
			'DXFYX' , 'G37BH' , '4VMK3' , '7VCPU' , 'BT5Y9' , 'F6FJP' , '688TV' , '276G8' , 'PHDSJ' , 'WNQFX' , 'BY3JC' , '5UJ9A' , 'QP8Q6' ,
			'FUX6W' , 'WAR2P' , 'N5SCS' , 'MUSCS' , '8KUPV' , 'MWBMM' , 'QP7CW' , 'KA5VS' , '6P9YN' , 'Q6XXB' , '57TFE' , 'JSSE3' , 'ADR6C' ,
			'FB794' , 'B993X' , 'D6WCW' , 'RDXPU' , 'XVY28' , 'XVY27' , 'ATGCK' , 'QVUWA' , 'BH565' , 'B5AQX' , 'WEFUV' , 'K3X6Y' , 'AEK4N' ,
			'64E3X' , '2AVHE' , 'SNXNA' , '5EWEQ' , '39UE8' , 'WPDDB' , '677NU' , '2JPF8' , 'AUPRW' , '22HVE' , 'KCQW4' , '4Y8RM' , 'H8QR4' ,
			'V3SCQ' , '76MC9' , 'SW5XM' , 'SMS2H' , 'AH7TK' , 'C82HJ' , 'KW596' , 'CTCR6' , '3HYM8' , '6CQ9R' , '4T75Y' , 'AAC9E' , '9XU7M' ,
			'WRY2K' , 'HFTXG' , 'PKYK9' , '7S68B' , '6T247' , 'T25MT' , 'BUP9J' , 'PUVEC' , 'GYEFM' , 'CURTH' , '3PD2E' , 'SXBQB' , 'YT5EJ' ,
			'JQXVX' , 'PKUAN' , 'CYGEV' , 'DNBCP' , 'JB7T7' , 'A4JBH' , 'XK95B' , 'FKMS8' , 'Q69VX' , 'U2U7E' , 'JHAUV' , 'NF48K' , 'NQG5G' ,
			'A4Q7V' , '4XD3C' , '2SSM6' , 'BHAW8' , 'Y24PD' , 'N8USJ' , 'QQT2M' , 'E6BW4' , 'F3X4R' , 'UR9NN' , '7K4WQ' , 'YVNDG' , 'QDGK9' ,
			'BHCMW' , 'J4YYS' , '5TFKB' , 'DBJCC' , 'XC6DF' , '3T69V' , '4SN8B' , '3V3HV' , 'MY7H7' , 'JSPC4' , 'PP7AH' , '6TNGK' , 'DW38G' ,
			'GX6Q8' , 'BWPTV' , 'YF2ES' , 'CE39M' , 'E7S5D' , 'HCJ3F' , 'X8TEC' , 'E32QH' , 'SKHBS' , 'W3NWJ' , '5WRU4' , 'DN9KR' , 'PW2KC' ,
			'RCGJ8' , 'BSHPS' , 'JCJ5S' , 'P7TYW' , '6XJ4D' , '7T4VV' , 'A9X54' , 'MV6D5' , 'WNNXJ' , '6F5ME' , 'S6J46' , '6HUV3' , 'S7A9B' ,
			'NJ73Y' , 'KHE9Y' , 'WM43T' , 'PQJQP' , '9RBTJ' , '5RDEF' , 'WRAJH' , 'E8GST' , 'DAVCQ' , 'BPXCT' , 'CEUHG' , '8D3QJ' , 'YGSN2' ,
			'K3XEB' , '5M4FP' , 'RB5X9' , '24ST4' , 'XT4QX' , 'UWQFY' , 'V5XD2' , '4J57A' , 'QA85A' , 'TDGSK' , '9NN3C' , 'N79G4' , 'B34HS' ,
			'82NA3' , 'FKDCD' , '62JPS' , 'V5NNM' , '27W4X' , 'BFR8A' , 'G5R63' , '6UR5K' , 'X2X25' , 'GJAKP' , 'NTYM8' , 'A2V7F' , 'P5WVK' ,
			'XU6Q7' , '66P97' , 'NJYAS' , 'FU6WU' , '4PPFE' , 'DTQWA' , 'EEF5A' , 'WCDW7' , 'VCQ7X' , 'TB64S' , 'MHG6C' , 'X84DA' , 'CY2R6' ,
			'5FEET' , 'XPYBB' , 'XQKM8' , 'F8URE' , '56FCS' , 'SFQJR' , '5AFUG' , 'NXAPA' , 'KACRG' , 'XEVSV' , '532CM' , '3NFBU' , 'FNEUQ' ,
			'7JE34' , 'SASWB' , '2R2TS' , 'DPG99' , 'NV36V' , 'WW75S' , 'T56W2' , 'XRVBS' , 'WMQEH' , '7KVC9' , 'NYTM8' , 'CU6KE' , '3EPDT' ,
			'HSJJB' , 'XKQM8' , 'Q9GVB' , 'HBGMV' , 'AUQYF' , 'FK24H' , 'VV54C' , '659PC' , 'FCHDF' , 'EWK52' , 'YJ7C5' , 'B5DYQ' , 'J2FND' ,
			'YPX2B' , 'XRHCT' , 'HUFDJ']


var index = parseInt(GM_getValue("index", 0));

console.log(index+ '/' +codes.length);
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
