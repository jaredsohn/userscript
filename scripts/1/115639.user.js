// ==UserScript==
// @name           bro3_custom_frame
// @version        1.0.2
// @namespace      http://example.com/
// @description    ブラウザ三国志のステータスのレイアウトを置き換えるスクリプトです
// @include        http*://*.3gokushi.jp/*
// @exclude        http://*.3gokushi.jp/card/busyobook_picture.php*
// @icon		
// ==/UserScript==
( function(){

	var status_frame = {

//ステータス枠を変更したくないカードは、対応するカードNoの行をコメントアウト（行頭にスラッシュ"/"を２つ付ける）か消去して下さい。
		"1001"	:	"custom_frame_b"	,
		"1002"	:	"custom_frame_b"	,
		"1003"	:	"custom_frame_b"	,
		"1004"	:	"custom_frame_b"	,
		"1005"	:	"custom_frame_b"	,
		"1006"	:	"custom_frame_b"	,
		"1007"	:	"custom_frame_b"	,
		"1008"	:	"custom_frame_b"	,
		"1009"	:	"custom_frame_b"	,
		"1010"	:	"custom_frame_b"	,
		"1011"	:	"custom_frame_b"	,
		"1012"	:	"custom_frame_b"	,
		"1013"	:	"custom_frame_b"	,
		"1014"	:	"custom_frame_b"	,
		"1015"	:	"custom_frame_b"	,
		"1016"	:	"custom_frame_b"	,
		"1017"	:	"custom_frame_b"	,
		"1018"	:	"custom_frame_b"	,
		"1019"	:	"custom_frame_b"	,
		"1020"	:	"custom_frame_b"	,
		"1021"	:	"custom_frame_b"	,
		"1022"	:	"custom_frame_b"	,
		"1023"	:	"custom_frame_b"	,
		"1024"	:	"custom_frame_b"	,
		"1025"	:	"custom_frame_b"	,
		"1026"	:	"custom_frame_b"	,
		"1027"	:	"custom_frame_b"	,
		"1028"	:	"custom_frame_b"	,
		"1029"	:	"custom_frame_b"	,
		"1030"	:	"custom_frame_b"	,
		"1031"	:	"custom_frame_b"	,
		"1032"	:	"custom_frame_b"	,
		"1033"	:	"custom_frame_b"	,
		"1034"	:	"custom_frame_b"	,
		"1035"	:	"custom_frame_b"	,
		"1036"	:	"custom_frame_b"	,
		"1037"	:	"custom_frame_b"	,
		"1038"	:	"custom_frame_b"	,
		"1039"	:	"custom_frame_b"	,
		"1040"	:	"custom_frame_b"	,
		"1041"	:	"custom_frame_b"	,
		"1042"	:	"custom_frame_b"	,
		"1043"	:	"custom_frame_b"	,
		"1044"	:	"custom_frame_b"	,
		"1045"	:	"custom_frame_b"	,
		"1046"	:	"custom_frame_b"	,
		"1047"	:	"custom_frame_b"	,
		"1048"	:	"custom_frame_b"	,
		"1049"	:	"custom_frame_b"	,
		"1050"	:	"custom_frame_b"	,
		"1051"	:	"custom_frame_b"	,
		"1052"	:	"custom_frame_b"	,
		"1053"	:	"custom_frame_b"	,
		"1054"	:	"custom_frame_b"	,
		"1055"	:	"custom_frame_b"	,
		"1056"	:	"custom_frame_b"	,
		"1057"	:	"custom_frame_b"	,
		"1058"	:	"custom_frame_b"	,
		"1059"	:	"custom_frame_b"	,
		"1060"	:	"custom_frame_b"	,
		"1061"	:	"custom_frame_b"	,
		"1062"	:	"custom_frame_b"	,
		"1063"	:	"custom_frame_b"	,
		"1064"	:	"custom_frame_b"	,
		"1065"	:	"custom_frame_b"	,
		"1066"	:	"custom_frame_b"	,
		"1067"	:	"custom_frame_b"	,
		"1068"	:	"custom_frame_b"	,
		"1069"	:	"custom_frame_b"	,
		"1070"	:	"custom_frame_b"	,
		"1071"	:	"custom_frame_b"	,
		"1072"	:	"custom_frame_b"	,
		"1073"	:	"custom_frame_b"	,
		"1074"	:	"custom_frame_b"	,
		"1075"	:	"custom_frame_b"	,
		"1076"	:	"custom_frame_b"	,
		"1077"	:	"custom_frame_b"	,
		"1078"	:	"custom_frame_b"	,
		"1079"	:	"custom_frame_b"	,
		"1080"	:	"custom_frame_b"	,
		"1081"	:	"custom_frame_b"	,
		"1082"	:	"custom_frame_b"	,
		"1083"	:	"custom_frame_b"	,
		"1084"	:	"custom_frame_b"	,
		"1085"	:	"custom_frame_b"	,
		"1086"	:	"custom_frame_b"	,
		"1087"	:	"custom_frame_b"	,
		"1088"	:	"custom_frame_b"	,
		"1089"	:	"custom_frame_b"	,
		"1090"	:	"custom_frame_b"	,
		"1091"	:	"custom_frame_b"	,
		"1092"	:	"custom_frame_b"	,
		"1093"	:	"custom_frame_b"	,
		"1094"	:	"custom_frame_b"	,
		"1095"	:	"custom_frame_b"	,
		"1096"	:	"custom_frame_b"	,
		"1097"	:	"custom_frame_b"	,
		"1098"	:	"custom_frame_b"	,
		"1099"	:	"custom_frame_b"	,
		"2001"	:	"custom_frame_b"	,
		"2002"	:	"custom_frame_b"	,
		"2003"	:	"custom_frame_b"	,
		"2004"	:	"custom_frame_b"	,
		"2005"	:	"custom_frame_b"	,
		"2006"	:	"custom_frame_b"	,
		"2007"	:	"custom_frame_b"	,
		"2008"	:	"custom_frame_b"	,
		"2009"	:	"custom_frame_b"	,
		"2010"	:	"custom_frame_b"	,
		"2011"	:	"custom_frame_b"	,
		"2012"	:	"custom_frame_b"	,
		"2013"	:	"custom_frame_b"	,
		"2014"	:	"custom_frame_b"	,
		"2015"	:	"custom_frame_b"	,
		"2016"	:	"custom_frame_b"	,
		"2017"	:	"custom_frame_b"	,
		"2018"	:	"custom_frame_b"	,
		"2019"	:	"custom_frame_b"	,
		"2020"	:	"custom_frame_b"	,
		"2021"	:	"custom_frame_b"	,
		"2022"	:	"custom_frame_b"	,
		"2023"	:	"custom_frame_b"	,
		"2024"	:	"custom_frame_b"	,
		"2025"	:	"custom_frame_b"	,
		"2026"	:	"custom_frame_b"	,
		"2027"	:	"custom_frame_b"	,
		"2028"	:	"custom_frame_b"	,
		"2029"	:	"custom_frame_b"	,
		"2030"	:	"custom_frame_b"	,
		"2031"	:	"custom_frame_b"	,
		"2032"	:	"custom_frame_b"	,
		"2033"	:	"custom_frame_b"	,
		"2034"	:	"custom_frame_b"	,
		"2035"	:	"custom_frame_b"	,
		"2036"	:	"custom_frame_b"	,
		"2037"	:	"custom_frame_b"	,
		"2038"	:	"custom_frame_b"	,
		"2039"	:	"custom_frame_b"	,
		"2040"	:	"custom_frame_b"	,
		"2041"	:	"custom_frame_b"	,
		"2042"	:	"custom_frame_b"	,
		"2043"	:	"custom_frame_b"	,
		"2044"	:	"custom_frame_b"	,
		"2045"	:	"custom_frame_b"	,
		"2046"	:	"custom_frame_b"	,
		"2047"	:	"custom_frame_b"	,
		"2048"	:	"custom_frame_b"	,
		"2049"	:	"custom_frame_b"	,
		"2050"	:	"custom_frame_b"	,
		"2051"	:	"custom_frame_b"	,
		"2052"	:	"custom_frame_b"	,
		"2053"	:	"custom_frame_b"	,
		"2054"	:	"custom_frame_b"	,
		"2055"	:	"custom_frame_b"	,
		"2056"	:	"custom_frame_b"	,
		"2057"	:	"custom_frame_b"	,
		"2058"	:	"custom_frame_b"	,
		"2059"	:	"custom_frame_b"	,
		"2060"	:	"custom_frame_b"	,
		"2061"	:	"custom_frame_b"	,
		"2062"	:	"custom_frame_b"	,
		"2063"	:	"custom_frame_b"	,
		"2064"	:	"custom_frame_b"	,
		"2065"	:	"custom_frame_b"	,
		"2066"	:	"custom_frame_b"	,
		"2067"	:	"custom_frame_b"	,
		"2068"	:	"custom_frame_b"	,
		"2069"	:	"custom_frame_b"	,
		"2070"	:	"custom_frame_b"	,
		"2071"	:	"custom_frame_b"	,
		"2072"	:	"custom_frame_b"	,
		"2073"	:	"custom_frame_b"	,
		"2074"	:	"custom_frame_b"	,
		"2075"	:	"custom_frame_b"	,
		"2076"	:	"custom_frame_b"	,
		"2077"	:	"custom_frame_b"	,
		"2078"	:	"custom_frame_b"	,
		"2079"	:	"custom_frame_b"	,
		"2080"	:	"custom_frame_b"	,
		"2081"	:	"custom_frame_b"	,
		"2082"	:	"custom_frame_b"	,
		"2083"	:	"custom_frame_b"	,
		"2084"	:	"custom_frame_b"	,
		"2085"	:	"custom_frame_b"	,
		"2086"	:	"custom_frame_b"	,
		"2087"	:	"custom_frame_b"	,
		"2088"	:	"custom_frame_b"	,
		"2089"	:	"custom_frame_b"	,
		"2090"	:	"custom_frame_b"	,
		"2091"	:	"custom_frame_b"	,
		"2092"	:	"custom_frame_b"	,
		"2093"	:	"custom_frame_b"	,
		"2094"	:	"custom_frame_b"	,
		"2095"	:	"custom_frame_b"	,
		"2096"	:	"custom_frame_b"	,
		"2097"	:	"custom_frame_b"	,
		"2098"	:	"custom_frame_b"	,
		"2099"	:	"custom_frame_b"	,
		"3001"	:	"custom_frame_b"	,
		"3002"	:	"custom_frame_b"	,
		"3003"	:	"custom_frame_b"	,
		"3004"	:	"custom_frame_b"	,
		"3005"	:	"custom_frame_b"	,
		"3006"	:	"custom_frame_b"	,
		"3007"	:	"custom_frame_b"	,
		"3008"	:	"custom_frame_b"	,
		"3009"	:	"custom_frame_b"	,
		"3010"	:	"custom_frame_b"	,
		"3011"	:	"custom_frame_b"	,
		"3012"	:	"custom_frame_b"	,
		"3013"	:	"custom_frame_b"	,
		"3014"	:	"custom_frame_b"	,
		"3015"	:	"custom_frame_b"	,
		"3016"	:	"custom_frame_b"	,
		"3017"	:	"custom_frame_b"	,
		"3018"	:	"custom_frame_b"	,
		"3019"	:	"custom_frame_b"	,
		"3020"	:	"custom_frame_b"	,
		"3021"	:	"custom_frame_b"	,
		"3022"	:	"custom_frame_b"	,
		"3023"	:	"custom_frame_b"	,
		"3024"	:	"custom_frame_b"	,
		"3025"	:	"custom_frame_b"	,
		"3026"	:	"custom_frame_b"	,
		"3027"	:	"custom_frame_b"	,
		"3028"	:	"custom_frame_b"	,
		"3029"	:	"custom_frame_b"	,
		"3030"	:	"custom_frame_b"	,
		"3031"	:	"custom_frame_b"	,
		"3032"	:	"custom_frame_b"	,
		"3033"	:	"custom_frame_b"	,
		"3034"	:	"custom_frame_b"	,
		"3035"	:	"custom_frame_b"	,
		"3036"	:	"custom_frame_b"	,
		"3037"	:	"custom_frame_b"	,
		"3038"	:	"custom_frame_b"	,
		"3039"	:	"custom_frame_b"	,
		"3040"	:	"custom_frame_b"	,
		"3041"	:	"custom_frame_b"	,
		"3042"	:	"custom_frame_b"	,
		"3043"	:	"custom_frame_b"	,
		"3044"	:	"custom_frame_b"	,
		"3045"	:	"custom_frame_b"	,
		"3046"	:	"custom_frame_b"	,
		"3047"	:	"custom_frame_b"	,
		"3048"	:	"custom_frame_b"	,
		"3049"	:	"custom_frame_b"	,
		"3050"	:	"custom_frame_b"	,
		"3051"	:	"custom_frame_b"	,
		"3052"	:	"custom_frame_b"	,
		"3053"	:	"custom_frame_b"	,
		"3054"	:	"custom_frame_b"	,
		"3055"	:	"custom_frame_b"	,
		"3056"	:	"custom_frame_b"	,
		"3057"	:	"custom_frame_b"	,
		"3058"	:	"custom_frame_b"	,
		"3059"	:	"custom_frame_b"	,
		"3060"	:	"custom_frame_b"	,
		"3061"	:	"custom_frame_b"	,
		"3062"	:	"custom_frame_b"	,
		"3063"	:	"custom_frame_b"	,
		"3064"	:	"custom_frame_b"	,
		"3065"	:	"custom_frame_b"	,
		"3066"	:	"custom_frame_b"	,
		"3067"	:	"custom_frame_b"	,
		"3068"	:	"custom_frame_b"	,
		"3069"	:	"custom_frame_b"	,
		"3070"	:	"custom_frame_b"	,
		"3071"	:	"custom_frame_b"	,
		"3072"	:	"custom_frame_b"	,
		"3073"	:	"custom_frame_b"	,
		"3074"	:	"custom_frame_b"	,
		"3075"	:	"custom_frame_b"	,
		"3076"	:	"custom_frame_b"	,
		"3077"	:	"custom_frame_b"	,
		"3078"	:	"custom_frame_b"	,
		"3079"	:	"custom_frame_b"	,
		"3080"	:	"custom_frame_b"	,
		"3081"	:	"custom_frame_b"	,
		"3082"	:	"custom_frame_b"	,
		"3083"	:	"custom_frame_b"	,
		"3084"	:	"custom_frame_b"	,
		"3085"	:	"custom_frame_b"	,
		"3086"	:	"custom_frame_b"	,
		"3087"	:	"custom_frame_b"	,
		"3088"	:	"custom_frame_b"	,
		"3089"	:	"custom_frame_b"	,
		"3090"	:	"custom_frame_b"	,
		"3091"	:	"custom_frame_b"	,
		"3092"	:	"custom_frame_b"	,
		"3093"	:	"custom_frame_b"	,
		"3094"	:	"custom_frame_b"	,
		"3095"	:	"custom_frame_b"	,
		"3096"	:	"custom_frame_b"	,
		"3097"	:	"custom_frame_b"	,
		"3098"	:	"custom_frame_b"	,
		"3099"	:	"custom_frame_b"	,
		"4001"	:	"custom_frame_b"	,
		"4002"	:	"custom_frame_b"	,
		"4003"	:	"custom_frame_b"	,
		"4004"	:	"custom_frame_b"	,
		"4005"	:	"custom_frame_b"	,
		"4006"	:	"custom_frame_b"	,
		"4007"	:	"custom_frame_b"	,
		"4008"	:	"custom_frame_b"	,
		"4009"	:	"custom_frame_b"	,
		"4010"	:	"custom_frame_b"	,
		"4011"	:	"custom_frame_b"	,
		"4012"	:	"custom_frame_b"	,
		"4013"	:	"custom_frame_b"	,
		"4014"	:	"custom_frame_b"	,
		"4015"	:	"custom_frame_b"	,
		"4016"	:	"custom_frame_b"	,
		"4017"	:	"custom_frame_b"	,
		"4018"	:	"custom_frame_b"	,
		"4019"	:	"custom_frame_b"	,
		"4020"	:	"custom_frame_b"	,
		"4021"	:	"custom_frame_b"	,
		"4022"	:	"custom_frame_b"	,
		"4023"	:	"custom_frame_b"	,
		"4024"	:	"custom_frame_b"	,
		"4025"	:	"custom_frame_b"	,
		"4026"	:	"custom_frame_b"	,
		"4027"	:	"custom_frame_b"	,
		"4028"	:	"custom_frame_b"	,
		"4029"	:	"custom_frame_b"	,
		"4030"	:	"custom_frame_b"	,
		"4031"	:	"custom_frame_b"	,
		"4032"	:	"custom_frame_b"	,
		"4033"	:	"custom_frame_b"	,
		"4034"	:	"custom_frame_b"	,
		"4035"	:	"custom_frame_b"	,
		"4036"	:	"custom_frame_b"	,
		"4037"	:	"custom_frame_b"	,
		"4038"	:	"custom_frame_b"	,
		"4039"	:	"custom_frame_b"	,
		"4040"	:	"custom_frame_b"	,
		"4041"	:	"custom_frame_b"	,
		"4042"	:	"custom_frame_b"	,
		"4043"	:	"custom_frame_b"	,
		"4044"	:	"custom_frame_b"	,
		"4045"	:	"custom_frame_b"	,
		"4046"	:	"custom_frame_b"	,
		"4047"	:	"custom_frame_b"	,
		"4048"	:	"custom_frame_b"	,
		"4049"	:	"custom_frame_b"	,
		"4050"	:	"custom_frame_b"	,
		"4051"	:	"custom_frame_b"	,
		"4052"	:	"custom_frame_b"	,
		"4053"	:	"custom_frame_b"	,
		"4054"	:	"custom_frame_b"	,
		"4055"	:	"custom_frame_b"	,
		"4056"	:	"custom_frame_b"	,
		"4057"	:	"custom_frame_b"	,
		"4058"	:	"custom_frame_b"	,
		"4059"	:	"custom_frame_b"	,
		"4060"	:	"custom_frame_b"	,
		"4061"	:	"custom_frame_b"	,
		"4062"	:	"custom_frame_b"	,
		"4063"	:	"custom_frame_b"	,
		"4064"	:	"custom_frame_b"	,
		"4065"	:	"custom_frame_b"	,
		"4066"	:	"custom_frame_b"	,
		"4067"	:	"custom_frame_b"	,
		"4068"	:	"custom_frame_b"	,
		"4069"	:	"custom_frame_b"	,
		"4070"	:	"custom_frame_b"	,
		"4071"	:	"custom_frame_b"	,
		"4072"	:	"custom_frame_b"	,
		"4073"	:	"custom_frame_b"	,
		"4074"	:	"custom_frame_b"	,
		"4075"	:	"custom_frame_b"	,
		"4076"	:	"custom_frame_b"	,
		"4077"	:	"custom_frame_b"	,
		"4078"	:	"custom_frame_b"	,
		"4079"	:	"custom_frame_b"	,
		"4080"	:	"custom_frame_b"	,
		"4081"	:	"custom_frame_b"	,
		"4082"	:	"custom_frame_b"	,
		"4083"	:	"custom_frame_b"	,
		"4084"	:	"custom_frame_b"	,
		"4085"	:	"custom_frame_b"	,
		"4086"	:	"custom_frame_b"	,
		"4087"	:	"custom_frame_b"	,
		"4088"	:	"custom_frame_b"	,
		"4089"	:	"custom_frame_b"	,
		"4090"	:	"custom_frame_b"	,
		"4091"	:	"custom_frame_b"	,
		"4092"	:	"custom_frame_b"	,
		"4093"	:	"custom_frame_b"	,
		"4094"	:	"custom_frame_b"	,
		"4095"	:	"custom_frame_b"	,
		"4096"	:	"custom_frame_b"	,
		"4097"	:	"custom_frame_b"	,
		"4098"	:	"custom_frame_b"	
	};

	var elements = document.getElementsByClassName('illust');
	for (i = 0; i < elements.length; i++) {
		// 大イラストの置き換え
		if (elements[i].nodeName == 'IMG') {
			var imgname = elements[i].src.substring(elements[i].src.lastIndexOf("/") + 1).substring(0, 4);
			if (status_frame[imgname] != undefined && status_frame[imgname] != null) {
				elements[i].nextSibling.nextSibling.id = status_frame[imgname];
			}
		}
	}
	
		GM_addStyle(""
	+"div#custom_frame_b{"
	+"    background-image: url(data:image/png;base64,"+
"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"	+")!important;}"
	+"div#custom_frame_b span.soltype {"
	+"    overflow: hidden;"
	+"    width: 21px;"
	+"  }"
	+"  div#custom_frame_b span.soltype img[title=\"歩兵\"] {"
	+"    padding-left: 21px !important;"
	+"    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLDRAHJeKondUAAAB+SURBVDjL7ZRLDcAgEAU3VYAEJCClUlYCTpCCBKQgYXqhKSQkTeje6FyAA5O3y0dkKwAHuHt9fJR5IIlItUgWgMxDshBWRry1MFsLKxB+4esl1jbaJARi21zMSgZO5qz3sImztVAnKUv/Wayc9PBSurlaSLXrcVxO2omDbMMFzUqIHQLCW5YAAAAASUVORK5CYII=);"
	+"  }"
	+"  div#custom_frame_b span.soltype img[title=\"槍兵\"] {"
	+"    padding-left: 21px !important;"
	+"    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLDRAIEt2NJBUAAABqSURBVDjL7dVBDcAgEERRJCChEpCABCRUAhJwgISVhoRK+L1sUtJrJykHRsDLZA+zIawaIAIFMBXYeTJUDed0BfpO/gqeE2ZAUYEX0ICkBJPihhvc4K+gj0NVNzQp6OhwtCnXuwLHsu/lBmr/F27RDUM7AAAAAElFTkSuQmCC);"
	+"  }"
	+"  div#custom_frame_b span.soltype img[title=\"騎兵\"] {"
	+"    padding-left: 21px !important;"
	+"    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLDRAJAtkhBTAAAAEOSURBVDjLrZTRdYJAEEXv5lgA6YB0QAlYgSmBDmIH0UosQVMBpAKSCrCDmAqeHw7njCgrCPcH2MO+ndmZN9BB0oa5kJRL2uhCNqdoy94OyOcQbnRNM1Vwrfvkzwpm6qd8RjCRVCtOOkZzASSA37S156dbKyUdgH+gAo4hhOOjaAuLNrvTCTFql+VfNKMRol12AC/MSxETTSe0ZjFFtFuoNyvyamyb+bVEUtna2u+P3WkKnNz3K7B0EWbu/WuMZXduHuxd+8k6JB/sup7063beepfZwZJUeEfdEEI4SVoCa1taAYkN8I8eR1VTZu1VYcxJzdBC+cgra5mWXxN8t9lx6A6UoaQuxR93LQDf/sczZwTjbOAAr2oAAAAASUVORK5CYII=);"
	+"  }"
	+"  div#custom_frame_b span.soltype img[title=\"弓兵\"] {"
	+"    padding-left: 21px !important;"
	+"    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLDRALCXzFvjoAAAD0SURBVDjLzVVbEYMwENx0KgAJSEBCJEQCDmohVRAJSEBC64A6QAJ1sP1JZm4gj2Paj94MP5e9Ze9uA8C/B8kOAK4NwADAivQTwMsY895hLYAbAAfA5Mh6khPrMZMcRM0j5XOEXhSukdzHZ4o5GYHkIF5kS4TL4XDXqlCWYiyBlyrgiJ+l4hIotbK1iAVOKraaglFzXl2ShjiXjzNO0Z0irnUgXOE0y0hEvjGSEEm99uqNsWCqYLwkvbSUAggA7gCc1m6/mmnQ2Mppt79bVFdSV716mQ5s1adR4UJy045GmH9otd6fmLneSkqrrcWPyTe/jlx8ACgZKRyNPXCcAAAAAElFTkSuQmCC);"
	+"  }"
	+"	div#custom_frame_b span.level_sr {"
	+"		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLDwoUN8tGQyIAAAB8SURBVBjTjZBRDYRADETfEAyshbPAScDCWlgLqwELZwEJnAUkLFaGn5Lcxy2hP02T1+lMsV1tTzwt2812ecoPHZFi+/UzT5eLoSM0AzngBGy3F4APUAPOwC5p7y5I+gJHwDkEABhv8q1AAZKkNexl2W5/4Hf0BiySluujJ6ZqNyE9R1fpAAAAAElFTkSuQmCC) no-repeat scroll left 8px transparent;"
	+"  }"
	+"	div#custom_frame_b span.level_r {"
	+"		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLDwoUN8tGQyIAAAB8SURBVBjTjZBRDYRADETfEAyshbPAScDCWlgLqwELZwEJnAUkLFaGn5Lcxy2hP02T1+lMsV1tTzwt2812ecoPHZFi+/UzT5eLoSM0AzngBGy3F4APUAPOwC5p7y5I+gJHwDkEABhv8q1AAZKkNexl2W5/4Hf0BiySluujJ6ZqNyE9R1fpAAAAAElFTkSuQmCC) no-repeat scroll left 8px transparent;"
	+"  }"
	+"	div#custom_frame_b span.level_uc {"
	+"		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLDwoUN8tGQyIAAAB8SURBVBjTjZBRDYRADETfEAyshbPAScDCWlgLqwELZwEJnAUkLFaGn5Lcxy2hP02T1+lMsV1tTzwt2812ecoPHZFi+/UzT5eLoSM0AzngBGy3F4APUAPOwC5p7y5I+gJHwDkEABhv8q1AAZKkNexl2W5/4Hf0BiySluujJ6ZqNyE9R1fpAAAAAElFTkSuQmCC) no-repeat scroll left 8px transparent;"
	+"  }"
	+"	div#custom_frame_b span.level_c {"
	+"		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLDwoUN8tGQyIAAAB8SURBVBjTjZBRDYRADETfEAyshbPAScDCWlgLqwELZwEJnAUkLFaGn5Lcxy2hP02T1+lMsV1tTzwt2812ecoPHZFi+/UzT5eLoSM0AzngBGy3F4APUAPOwC5p7y5I+gJHwDkEABhv8q1AAZKkNexl2W5/4Hf0BiySluujJ6ZqNyE9R1fpAAAAAElFTkSuQmCC) no-repeat scroll left 8px transparent;"
	+"  }"
	+"	div.cardWrapper2col div.card {"
	+"		 color:black;"
	+"  }"
	+"	div#custom_frame_b span.rarerity_ur, div#custom_frame_b span.rarerity_sr, div#custom_frame_b span.rarerity_r, div#custom_frame_b span.rarerity_uc, div#custom_frame_b span.rarerity_c {"
	+"		 top: 9px;"
	+"  }"
	+"div.cardWrapper2col div.cardStatus_rarerity_c,"
	+"div.cardWrapper2col div.cardStatus_rarerity_uc,"
	+"div.cardWrapper2col div.cardStatus_rarerity_r,"
	+"div.cardWrapper2col div.cardStatus_rarerity_sr {"
	+"		 padding-bottom: 2pt;"
	+"  }"

	+"	div.cardWrapper2col span.rarerity_ur,"
	+"	div.cardWrapper2col span.rarerity_sr,"
	+"	div.cardWrapper2col span.rarerity_r,"
	+"	div.cardWrapper2col span.rarerity_uc,"
	+"	div.cardWrapper2col span.rarerity_c {"
	+"		 top: 9pt;"
	+"  }"
	+"	div#custom_frame_b span.cost { top: 15px; }"
	+"	div#custom_frame_b span.status_hp { top: 47px; }"
	+"	div#custom_frame_b span.status_hp_bar { top: 61px; right: 5px; }"
	+"	div#custom_frame_b span.cardno { top: 4px; right: 92px;  }"
	+"	div#custom_frame_b span.name { top: 16px; }"
	+"	div#custom_frame_b span.level_r,span.level_uc,span.level_c { top: 19px; }"
	+"	div#custom_frame_b span.status_att { top: 233px; left: 20px; font-size: 11px; }"
	+"	div#custom_frame_b span.status_int { top: 252px; left: 20px; font-size: 11px; }"
	+"	div#custom_frame_b span.status_speed { top: 270px; left: 20px; font-size: 11px; }"
	+"	div#custom_frame_b span.status_wdef { top: 252px; left: 92px; font-size: 11px; }"
	+"	div#custom_frame_b span.status_sdef { top: 270px; left: 92px; font-size: 11px; }"
	+"	div#custom_frame_b span.status_bdef { top: 252px; left: 164px; font-size: 11px; }"
	+"	div#custom_frame_b span.status_rdef { top: 270px; left: 164x; font-size: 11px; }"
	+"	div#custom_frame_b span.status_levelup { top: 175px; right: 20px; }"
	);

}) ();
