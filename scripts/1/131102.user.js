// ==UserScript==
// @name FrozenFaceSmiley for Windows8bar
// @version 2.0
// @description 在百度贴吧中使用自定义表情
// @include http://tieba.baidu.com/tb/editor/v2/smiley.html*
// @downloadURL https://userscripts.org/scripts/source/131102.user.js
// @updateURL https://userscripts.org/scripts/source/131102.meta.js
// ==/UserScript==


(function(){
		
    var Luoxiaohei_collection_name='罗小黑';
    var Luoxiaohei_collection=[

'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/d959651090ef76c6dda09a969d16fdfaae5167a6.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/0677b886e950352a881344b55343fbf2b3118ba6.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/7aa78bf6905298225f41587ed7ca7bcb0b46d4a6.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/4768d6e636d12f2edf41c4c64fc2d56284356851.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/081f813a5bb5c9ea2eb76945d539b6003bf3b351.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/7aa78bf69052982250775365d7ca7bcb0b46d451.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/f797cb550923dd54c700c6d5d109b3de9d8248a5.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/988bc9fafbedab64db372766f736afc378311e50.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/ed8438a0cd11728bed68e684c8fcc3cec2fd2c50.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/ce57d52d11dfa9ec925d37aa62d0f703908fc1a5.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/8585c891f603738d5c3a6d9fb31bb051f919eca5.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/9846ff1fd21b0ef4d898f9e3ddc451da80cb3ea4.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/d5a03a98a9014c086c7e42030a7b02087af4f450.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/777f79ecab64034fa187a8a0afc379310b551d57.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/ff797e029245d6886648d802a4c27d1ed31b2457.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/eddc4ebe6c81800a96afe3a8b13533fa838b4757.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/848af9ed54e736d14a59e6ae9b504fc2d4626957.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/27512f6fddc451da46876d56b6fd5266d116329b.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/1a13dbef3d6d55fbab8c1c806d224f4a21a4dd57.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/0afe58b54aed2e737fa2ec8a8701a18b86d6fa57.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/8a79d067d0160924696ec8bdd40735fae7cd3456.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/9b024b167f3e6709684b2f593bc79f3df9dc5556.jpg',
];

	
    var yutumei_collection_name='鱼兔妹';
    var yutumei_collection=[
	
	'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/0190718264b66a9df11f36d7.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/8f501716756bb7a7ac6e750a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/26714299dc5dd16cd31b700a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/4b5c0df1b2516f8ffd037f0a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/c9895a3091437d72bba1670a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/dfbb25f3d99610435d6008e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/01907182b6e7389cf11f36e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/4190598f9ec760cd6d81190a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/dd607c35b0e3e3b0d46225e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/cb4fe4329dbdd79e55e723e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/7e1a51e3cc80965b2cf5340a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/55a10b16a8895188ae51330a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/febaf4a0d15cda7b4a36d6e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/530a68394c311ec5d1a2d3e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/8e97481d23769573203f2e0a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/febaf4a0d170da7b4a36d60a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/444efffe3e344522342acce6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/a9fb0ce7ea7c9aa1d439c9e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/2584bec6e0f45e6dbf09e6e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/9f6c8a47c116ea5108f7efe6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/9169a7dd23b13dfda1ec9ce6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/d2ea832eea693c209922ed0a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/f835c705b146a6a363d986e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/f89fa7d43f4dfb5e10df9b0a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/5b4f8905a898b1e70b7b820a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/28fa8fe099c127a6b21cb1e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/799a76113d9f0df986d6b60a.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/81c36c7a96a01f69b151b9e6.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/09a36e699fd1d482f6365409.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/5f05141ee66e2e705baf5309.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/c7b423c0f01732230eb34509.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/24c61132f02608b07c1e71e5.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/234e7faca1a3def9461064e5.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/6d733dd1bb9e16d3cc116609.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/54506ddea781ed46960a1609.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/eb967933e4ab9f88838b1309.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/6ecc14559c21c0f3810a1809.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/7e1a51e3ccad965b2cf534e5.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/5d1f36d38d3d202695ee37e5.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/62a1b3cb945d62699c163de5.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/1793221ca171dab4a6ef3f09.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/89a291ea1e4f835cb8382009.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/5182b9d4ac8ead9b38012f09.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/b97869a230430fbe7dd92a09.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/fe99542e856f0d36ac34dee5.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/444efffe3e194522342acc09.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/c7640351188aff31faf2c0e5.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/19b6df41a592758bd62afc09.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/a3411cf4219bcc2b242df2e5.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/fbb9555f7dbfde7c0df3e309.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/d2ea832eea463c209922ede5.jpg',
];


    var yangcongtou_collection_name='洋葱头全集';
    var yangcongtou_collection=[
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/0a57431582b076c64bedbcfe.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/b8de330ede4705053812bbfe.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/6b6b793c1edb98da5fdf0eee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/8b7fcf5811d347b6b645aefe.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/55a10b16a8ad5188ae5133ee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/704c9fa23cc5e789faed50fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/a6a9f3dc0695154a9a5027ee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/1483be84129ba3c10e2444fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/5ee1ebd0bc77d0ab8c1029ee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/40f915af144f9ddfcaefd0ee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/9776c9da80983bafa044dfee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/600b1385a2f52be6a5c272fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/1b1ef027c1e7bc4a5243c1ee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/f1759eb83750b9bc37d3caee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/8d70a204acf7dcbd3ac763fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/00517b0486d95a566a60fbee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/bd04e5a9a499a5859152eeee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/fb6d18591c843e2ad00906fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/909e320e44350c9e09fa93ee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/ae2ef1a51a1521c3ca130cfd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/46c14959af245c6d3b2935fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/da76da3d2b9e14eba8018eee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/421f3d1435a29a08dbb4bdee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/78cc7c0ce12a5a71728da5ee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/3db2db1a233815734b90a7ee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/41572ec913ffefdb8326acee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/f101bdfd698c03b17831aaee.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/a10d3effb9db3f61b17ec5fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/2b7d0d9843f90139d0135eed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/2f8a94d7017195a9b7fd48ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/568cb813a8a1a2861ad576ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/40b5861bb2ebe33821a4e9fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/0a92140dd11b6163738b65ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/909e320e44460c9e09fa93fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/e3916ce15bdacf5563d09ffd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/909737de99e5bdada8ec9afd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/1b6a7d946dc8e07a6f068cfd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/d5315b22b8c1844a1e3089fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/395d8c5941997126574e00ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/dfbb25f3d99f10435d6008ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/c867e8f8df443557bd3109ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/01907182b6ee389cf11f36ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/70680af1b6de26f0b801a0fd.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/272c4038ca674b6391ef39ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/dd607c35b0eae3b0d46225ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/81be470fcd66087d4afb51fc.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/b0e91c3e595c7d31ac4b5ffc.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/84478e3bb11582afa2cc2bed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/40f915af144e9ddfcaefd0ed.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/4b5c0df1b2066f8ffd037ff3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/0a92140dd1696163738b65f3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/da7af196ff83f7c7c8eaf4ec.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/c1b44786fed604a1fc1f10f3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/9ecf45074a10104cb0351df3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/8985cf4b19a7127b6a63e5ec.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/6a6cb703eb4b7bb87acbe1ec.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/d2ea832eea4f3c209922edec.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/fab49430ff2ff59c3c6d97ec.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/848862e2fad33164fcfa3cf3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/89bacfdcae615ea1562c84ec.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/4ad76c0c89b0c2741c9583ec.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/7f5ec4e41ac98d4db90e2df3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/5ee1ebd0bc04d0ab8c1029f3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/febaf4a0d127da7b4a36d6f3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/5f7a9c8fa47f7cd00df4d2f3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/81c36c7a96aa1f69b151b9ec.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/a10d3effb9d93f61b17ec5f3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/f81b7614487c1b3742a9adec.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/c49d1034b4c896813b87cef3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/d7631127d2f398e9023bf6f3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/fdfdca29cd1f7541c99559e3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/c7b423c0f03132230eb345e3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/6c61c205e89cb342e8248810.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/799a76113da50df986d6b610.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/568cb813a8a3a2861ad576e3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/4b5c0df1b2766f8ffd037fe3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/78cc7c0ce1345a71728da510.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/0a92140dd1196163738b65e3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/f81b761448601b3742a9ad10.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/3b59ba3303b1654f71cf6ce3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/6544f5437ba739b8d0c86ae3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/c1b44786fea604a1fc1f10e3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/6ecc14559c07c0f3810a18e3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/2f1a9343d9e07d7bb2de05e3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/2649f0f76c69d7fb9f514617.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/2258cc292dbc3b59d5074217.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/dfbb25f3d99d10435d6008e3.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/75da61cf04ba7e690ff47717.jpg',
'http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/3c55581bcb420323f2de32e3.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/90806bff513d2697e22dd8fd55fbb2fb4216d802.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/2df9697e02087bf4a61a8749f2d3572c10dfcf0a.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/326418f10ad162d95c10b2bc11dfa9ec8b13cd02.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ae43640d28381f304aef5d09a9014c086f06f00a.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/991b5a17b31bb0516bd26388367adab44bede00a.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7afc9506738da977a9d9568bb051f8198718e30a.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8377d354f8198618a3b93f244aed2e738ad4e602.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8c52d23033fa828b9fdd4d43fd1f4134960a5a01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6622f15dd109b3deb34934c8ccbf6c81810a4c09.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/394fbe51564e9258fcc2564e9c82d158cdbf4e09.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/bddda81649540923f79fb3de9258d109b2de4909.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6c0c57ad5edf8db1ecd8acc40923dd54574e7409.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/394fbe51564e9258fcca564e9c82d158cdbf4e01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6eb3eeb4cb13495420e038c4564e9258d0094a01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/0a454ef0e0fe99259efab9f034a85edf8cb17109.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8c5d3f6534a85edfab722e8349540923dc547501.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1d9983fb9925bc317fa3d1385edf8db1ca137001.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/bc38f7ebf01f3a293236056e9925bc315d607c01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/84e3ef5194eef01f24eac865e0fe9925bd317d01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/d5b1841490ef76c6b3242b8b9d16fdfaae516709.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/46aac4eace1b9d16ea394ac1f3deb48f8d546401.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ab3c2cc7d5628535f516028190ef76c6a6ef6309.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/d5b1841490ef76c6b32c2b8b9d16fdfaae516701.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b55986d8e71190ef6505427fce1b9d16fcfa6001.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/06bd4c2bb9389b50420130f28535e5dde6116e01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/648b55d42f2eb9389793aa52d5628535e4dd6f01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/93a01fdc8d1001e93dcac4afb80e7bec55e79709.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/46652833acaf2edda30799498d1001e938019309.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1eb1c0c97cd98d10022adc91213fb80e7aec9001.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7b5acfaa2edda3cc7d1a688001e93901203f9201.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3c9852a8cbef7609b6f4493f2edda3cc7dd99e01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/c273dd0c6b63f624bbaae9a38744ebf81b4ca309.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3c5fe441ebf81a4c84cd3c69d72a6059242da601.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/5b0f95216b600c3355860e681a4c510fd8f9a101.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/399bf3579822720ec439325a7bcb0a46f31fab09.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/764f6af290529822b5c4e963d7ca7bcb0b46d409.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3c9fb4cf7bcb0a463edd5b996b63f6246a60af01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/829720136d224f4ae26ea3b309f790529922d109.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/764f6af290529822b5cce963d7ca7bcb0b46d401.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/737a0e274f4a20a485e1ec6790529822730ed001.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/534b01d5f703918f1726ed6a513d269758eec409.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/38963238269759ee81afb06bb2fb43166c22df01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/674072daa9ec8a13d0ed8740f703918fa1ecc009.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/90806bff513d2697e22cd8fd55fbb2fb4216d801.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a1e3c3e908fa513d9c55bc7e3d6d55fbb3fbd901.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/534b01d5f703918f172eed6a513d269758eec401.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/21b3cae98a136327d6121293918fa0ec09fac701.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3abd01dcf2d3572ca11d4c7c8a13632763d0c301.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3a17610d7bf40ad1cf1b1743572c11dfa8ecce01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/5e6a7e900a7b0208d036ef4162d9f2d3562cc801.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/88f5ca044c086e06b557efeb02087bf40bd1cb01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ae43640d28381f304ae65d09a9014c086f06f001.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b674557fdab44aedb6b96e44b31c8701a08bfb09.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/43e1ca723912b31b229b1d898618367adbb4e109.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/803d9b1c8618367a4c76af7d2e738bd4b21ce501.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b24aacf91e178a8232cbaf00f603738da877e809.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/872920ac8226cffc97dd6f12b9014a90f703ea09.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/baeeda044a90f603fd4f4ce73912b31bb151ed01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ff907d128a82b901c6521393738da9773812ef01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/73c5e123cffc1e1700405c914a90f603728de901.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/872920ac8226cffc97d56f12b9014a90f703ea01.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9b08604a78f0f7362f099ca10a55b319eac41308.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3a39d01cebc4b745c56b67b6cffc1e178b821500.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6ac3c70a4bfbfbedd7aee6df78f0f736aec31f08.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/cb81c861034f78f088f44a5379310a55b2191c00.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7b9798e8ab64034f063212a6afc379310b551d00.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/72cbba36c895d143d981348373f082025baf0708.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3f4821a2d933c895a28948dbd11373f083020008.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e12fce4ed11373f0f5c0bf3fa40f4bfbfaed0400.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/f8f9b246ad4bd113053267925aafa40f4afb0500.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e95fab90d143ad4ba4d1966082025aafa50f0600.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9b74f42ed40735fa8d079e199e510fb30e240808.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/620ab3130924ab18ffe1319735fae6cd7a890b08.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9783ad1e9d16fdfab79b164eb48f8c5495ee7b08.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/84e3ef5194eef01f24ebc865e0fe9925bd317d00.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/d5b1841490ef76c6b3252b8b9d16fdfaae516708.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ad7a9effaf51f3deae4d69c494eef01f3b297900.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7faeb6678535e5ddf6db757f76c6a7efcf1b6208.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9783ad1e9d16fdfab793164eb48f8c5495ee7b00.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8954f8554fc2d5628aff004de71190ef77c66c08.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/648b55d42f2eb938979aaa52d5628535e4dd6f08.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e50ee630e5dde711822d9356a7efce1b9c166100.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ab3c2cc7d5628535f51f028190ef76c6a6ef6300.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/096d423ab80e7bec5c2dd3412f2eb9389a506b08.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8954f8554fc2d5628af7004de71190ef77c66c00.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/06bd4c2bb9389b50420030f28535e5dde6116e00.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/4cb5ee1501e9390124f55d9e7bec54e737d19608.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/93a01fdc8d1001e93dcbc4afb80e7bec55e79708.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9cc34dd8a3cc7cd98fdae4793901213fb90e9108.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/096d423ab80e7bec5c25d3412f2eb9389a506b00.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fb83150c4b36acafd114465c7cd98d1000e99c08.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3c9852a8cbef7609b6ff493f2edda3cc7dd99e08.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/93a01fdc8d1001e93dc3c4afb80e7bec55e79700.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9cc34dd8a3cc7cd98fd2e4793901213fb90e9100.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/46652833acaf2edda30e99498d1001e938019300.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/01c1a8ea76094b36526ecb4da3cc7cd98c109d00.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a14ff4d8a144ad34af4b5727d0a20cf430ad8508.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/82dbb3a70cf431ad302e93994b36acaf2fdd9800.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8012a98565380cd763ea724da144ad3458828108.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a37fd37bca806538fd1e74b397dda144ac348208.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/cb9ed1149313b07e254980a80cd7912396dd8c08.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b2e7c51ba8d3fd1f7dfd729a304e251f94ca5f0f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/0396e18ea61ea8d3c6d6a4a4970a304e241f580f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fcd30f84800a19d889f754a533fa828ba71e460f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a234b20cb3de9c82e191292f6c81800a18d8430f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/394fbe51564e9258fcc0564e9c82d158cdbf4e0f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/bddda81649540923f795b3de9258d109b2de4907.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6eb3eeb4cb13495420e238c4564e9258d0094a07.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/bc38f7ebf01f3a293234056e9925bc315d607c07.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/d5b1841490ef76c6b3262b8b9d16fdfaae51670f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ab3c2cc7d5628535f514028190ef76c6a6ef630f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1f42da3d9b504fc2dbab60a5e5dde71191ef6d0f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8954f8554fc2d5628af4004de71190ef77c66c07.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1153db0b7bec54e73f18cabeb9389b504ec26a0f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/06bd4c2bb9389b50420330f28535e5dde6116e07.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/886218e954e736d125ef5ca89b504fc2d4626907.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/93a01fdc8d1001e93dc8c4afb80e7bec55e7970f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9cc34dd8a3cc7cd98fd9e4793901213fb90e910f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9cc34dd8a3cc7cd98fd1e4793901213fb90e9107.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fb83150c4b36acafd11d465c7cd98d1000e99c07.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/82dbb3a70cf431ad302f93994b36acaf2fdd9807.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8012a98565380cd763e3724da144ad3458828107.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/335738b0c9ea15ced71b30a9b6003af33b87b20f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1858579e033b5bb51622f05e36d3d539b700bc0f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1541b72f2834349bdef3be25c9ea15ce37d3be0f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/2a20320ad9f9d72ab891c0bdd42a2834359bbb0f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/5b0c6f368744ebf8ce84b49fd9f9d72a6159a70f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/db947949510fd9f900ea85c9252dd42a2934a407.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/c64808650c3387443838ffdc510fd9f9d62aa007.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/72cbba36c895d143d98b348373f082025baf0706.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3fdf6c2142a7d933ba5534d3ad4bd11372f00106.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9b74f42ed40735fa8d059e199e510fb30e24080e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3948c81d972bd4075f32035d7b899e510eb3090e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/620ab3130924ab18ffe3319735fae6cd7a890b0e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9b74f42ed40735fa8d0d9e199e510fb30e240806.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/61b6e2ce39dbb6fd36ae35860924ab18962b370e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/09b7d5f85266d0166fe44e88972bd40734fa3506.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/f3919f069245d68883ff6204a4c27d1ed31b2406.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/40a358c29f3df8dc9ac85f31cd11728b4610280e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/f97b1c3b6709c93d3707de579f3df8dcd000540e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/4f52040cc93d70cf73077aadf8dcd100bba12b06.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e1a4c483c9177f3e22c92cad70cf3bc79e3d5606.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1573f6cfd1c8a7868ad79aae6709c93d71cf5006.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b2e7c51ba8d3fd1f7dfc729a304e251f94ca5f0e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8c52d23033fa828b9fd64d43fd1f4134960a5a0e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/29b4df3bb13533faba43438ea8d3fd1f40345b0e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/815950ff828ba61e9213188f4134970a314e5906.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fcd30f84800a19d889f654a533fa828ba71e460e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fcd30f84800a19d889fe54a533fa828ba71e4606.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a234b20cb3de9c82e190292f6c81800a18d8430e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6eb3eeb4cb13495420eb38c4564e9258d0094a0e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8c5d3f6534a85edfab712e8349540923dc547506.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/c3b2d78a8c5494eeedd7dfb92df5e0fe98257e0e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/c073592c2df5e0feb8e559a15c6034a85fdf7206.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9f3d90dbb48f8c54882e158f3a292df5e1fe7f06.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7faeb6678535e5ddf6d9757f76c6a7efcf1b620e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/648b55d42f2eb9389798aa52d5628535e4dd6f0e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/93a01fdc8d1001e93dc9c4afb80e7bec55e7970e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/096d423ab80e7bec5c27d3412f2eb9389a506b06.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fb83150c4b36acafd11a465c7cd98d1000e99c0e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3c9852a8cbef7609b689493f2edda3cc7dd99e06.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/69eed1b2d0a20cf4cb122e7f76094b36adaf9906.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9128ce315982b2b7281de96431adcbef77099b06.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6163bafcd72a6059fc9331ba2834349b023bba05.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b55986d8e71190ef657d427fce1b9d16fcfa6079.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7faeb6678535e5ddf6aa757f76c6a7efcf1b6279.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a03efb27720e0cf31e749e5b0a46f21fbf09aa05.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/10c8252609f790525e9c979e0cf3d7ca7acbd505.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/bd7c62ec3901213fbeb59e7c54e736d12e2e9579.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7b5acfaa2edda3cc7d62688001e93901203f9279.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3c9852a8cbef7609b68c493f2edda3cc7dd99e79.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9d583a87b2b7d0a2f54ed43dcbef76094a369a79.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/55546fd2912397dd55fe48a45982b2b7d1a28779.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a37fd37bca806538fd6d74b397dda144ac348279.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/f630733d5343fbf25eab7683b07eca8064388f79.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/2f5c8a21b899a901eab68b961d950a7b0308f505.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/37644b3d1f30e9241c274c914c086e061c95f705.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/866c59f63a87e950d29023cc10385343faf2b479.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6bd9aaef15ce36d3378353903af33a87e850b179.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ead829e82e738bd429a26291a18b87d6267ff905.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e746035c252dd42af38ed10b033b5bb5c8eab879.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/73c5e123cffc1e17003c5c914a90f603728de905.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/dba8d44043a982264742fb878a82b9014b90eb05.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/495d6950b319ebc432fba6398226cffc1f171604.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7f2643a1462309f755e87db2720e0cf3d6cad679.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e12fce4ed11373f0f5b8bf3fa40f4bfbfaed0478.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a234b20cb3de9c82e1e6292f6c81800a18d84304.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/394fbe51564e9258fcb7564e9c82d158cdbf4e04.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/059685c87b899e516109eab442a7d933c9950d78.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6c0c57ad5edf8db1ecadacc40923dd54574e7404.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/620ab3130924ab18ff91319735fae6cd7a890b78.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b1a75adeb6fd5266b5acecb4ab18972bd5073678.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/cd96cc54f3deb48f97ea717ef01f3a292cf57804.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a229b58dd43f8794fd78988ed21b0ef41ad53a78.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8954f8554fc2d5628a8b004de71190ef77c66c04.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fd7d118e4710b9129946265ec3fdfc0393452278.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/97eaaa127f3e67098f87955f3bc79f3df9dc5578.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/46652833acaf2edda37299498d1001e938019304.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3c9852a8cbef7609b68b493f2edda3cc7dd99e04.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b2e7c51ba8d3fd1f7d8e729a304e251f94ca5f78.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b0667addbc3eb1350440671ba61ea8d3fc1f4478.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/827df016b07eca809585e947912397dda0448304.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/f630733d5343fbf25eac7683b07eca8064388f04.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/d93c562fc65c1038b9fe1e62b2119313b17e8904.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fb7f2a510923dd547df477c8d109b3de9d824878.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6c0c57ad5edf8db1eca9acc40923dd54574e7478.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/335738b0c9ea15ced76e30a9b6003af33b87b204.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7faeb6678535e5ddf6ab757f76c6a7efcf1b6278.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3c9fb4cf7bcb0a463ea25b996b63f6246a60af04.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/886218e954e736d125945ca89b504fc2d4626978.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/10c8252609f790525e9f979e0cf3d7ca7acbd504.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/4cb5ee1501e9390124855d9e7bec54e737d19678.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9cc34dd8a3cc7cd98faae4793901213fb90e9178.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/5d4e2c4f20a44623cd4e75c29822720e0df3d778.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/69825e6855fbb2fbfcaf88b24f4a20a44723dc78.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9d27b21673f082022212419f4bfbfbedaa641b7b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e95fab90d143ad4ba4ae966082025aafa50f067b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9980e916632762d042ba741fa0ec08fa503dc678.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/52b591d6572c11df18556f83632762d0f603c278.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3a17610d7bf40ad1cf601743572c11dfa8ecce78.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/86913163d0160924cca572bbd40735fae7cd347b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b1a75adeb6fd5266b5abecb4ab18972bd507367b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/88f5ca044c086e06b52cefeb02087bf40bd1cb78.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/37644b3d1f30e9241c204c914c086e061c95f778.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/c875e51d367adab4dd54cbe38bd4b31c8601e478.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7afc9506738da977a9ab568bb051f8198718e378.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ff907d128a82b901c6291393738da9773812ef78.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/73c5e123cffc1e17003b5c914a90f603728de978.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/33231bf5f736afc3f888efc5b319ebc4b645127f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/0396e18ea61ea8d3c6a2a4a4970a304e241f587b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ae3d6cb60f2442a7a88a2d05d143ad4bd013027f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/d6a1188c9e510fb3609da737d933c895d0430c7f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9b74f42ed40735fa8d749e199e510fb30e24087f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e07a6a21ab18972bbdbed06ae6cd7b899f510a7f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/eda832df81cb39dbd544b7f6d0160924aa18307f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8954f8554fc2d5628a88004de71190ef77c66c7b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/06bd4c2bb9389b50427f30f28535e5dde6116e7b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1eb1c0c97cd98d100254dc91213fb80e7aec907b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/46652833acaf2edda37199498d1001e93801937b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b2e7c51ba8d3fd1f7d8d729a304e251f94ca5f7f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a37fd37bca806538fd6b74b397dda144ac34827b.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e46b56ffe6cd7b89f3edea230f2442a7d8330e7a.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3948c81d972bd4075f46035d7b899e510eb3097a.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/88f5ca044c086e06b52defeb02087bf40bd1cb7f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b76dc28e87d6277f0197e29828381f30e824fc7f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/2e7be987b9014a907bbb961da9773912b21bee7f.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/98bf9e1a4134970a0ef2c08f95cad1c8a6865d7a.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b26e39aaa40f4bfb80554ef4034f78f0f636187e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e12fce4ed11373f0f5babf3fa40f4bfbfaed047e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/aceeb25dccbf6c81b3b6fc48bc3eb13532fa407a.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b1a75adeb6fd5266b5aeecb4ab18972bd507367e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/2bb9ce6bddc451dae073dc4bb6fd5266d116327e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9783ad1e9d16fdfab7ed164eb48f8c5495ee7b7a.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/af519bd9d100baa180a9971b4710b912c9fc2e7e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fd7d118e4710b912994c265ec3fdfc0393452276.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/0396e18ea61ea8d3c6a7a4a4970a304e241f587e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/cd732231970a304e1aaf705ad1c8a786c8175c76.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/29b4df3bb13533faba3b438ea8d3fd1f40345b76.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/5cede30f19d8bc3e8785d66a828ba61ea9d34576.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6622f15dd109b3deb33234c8ccbf6c81810a4c76.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/394fbe51564e9258fcb9564e9c82d158cdbf4e76.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/0a454ef0e0fe99259e89b9f034a85edf8cb1717e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6c0c57ad5edf8db1eca3acc40923dd54574e7476.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ad7a9effaf51f3deae3f69c494eef01f3b297976.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/ab3c2cc7d5628535f565028190ef76c6a6ef637e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a14ff4d8a144ad34af2d5727d0a20cf430ad8576.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e4464b31349b033b85022c7a15ce36d3d439bd7e.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6bd9aaef15ce36d3379653903af33a87e850b176.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/5b0c6f368744ebf8cee3b49fd9f9d72a6159a776.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/f8f9b246ad4bd113054767925aafa40f4afb057d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3f4821a2d933c895a2ec48dbd11373f083020075.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a747b70235fae6cd173e7bc10fb30f2443a70f7d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3948c81d972bd4075f4d035d7b899e510eb3097d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/86913163d0160924ccaf72bbd40735fae7cd347d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/eda832df81cb39dbd54ab7f6d0160924aa18307d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e1a4c483c9177f3e22be2cad70cf3bc79e3d567d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1573f6cfd1c8a7868aa09aae6709c93d71cf507d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/0022461a95cad1c8e5312c877f3e6709c83d517d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/0022461a95cad1c8e5292c877f3e6709c83d5175.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/394fbe51564e9258fcbe564e9c82d158cdbf4e7d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1d9983fb9925bc317fcfd1385edf8db1ca137075.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/0a454ef0e0fe99259e9eb9f034a85edf8cb17175.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/bc38f7ebf01f3a29325a056e9925bc315d607c75.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/d77df3ea76c6a7efdbac7886fdfaaf51f2de667d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fe77fe13fdfaaf51ea71511f8c5494eef11f7a75.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1f42da3d9b504fc2dbd560a5e5dde71191ef6d7d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/7faeb6678535e5ddf6be757f76c6a7efcf1b6275.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/a7b1c241ad345982451935320cf431adcaef8475.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/20543046fbf2b2117ea555eeca8065380dd78e7d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/827df016b07eca809596e947912397dda0448375.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6163bafcd72a6059fc8331ba2834349b023bba75.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/c76ff28aa0ec08fae88bc30759ee3d6d54fbda7d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/69825e6855fbb2fbfcb888b24f4a20a44723dc75.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3a17610d7bf40ad1cf6f1743572c11dfa8ecce7d.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/c2bf342911dfa9ec38bd86b762d0f703908fc175.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/4b9869d462d9f2d3f882f44fa9ec8a136227cc75.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/2f5c8a21b899a901eaa68b961d950a7b0308f575.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fcd30f84800a19d8898854a533fa828ba71e467c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/5cede30f19d8bc3e879bd66a828ba61ea9d34574.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8c5d3f6534a85edfab072e8349540923dc54757c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/394fbe51564e9258fca7564e9c82d158cdbf4e74.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/0a454ef0e0fe99259e87b9f034a85edf8cb1717c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8c5d3f6534a85edfab1f2e8349540923dc547574.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/cd96cc54f3deb48f97e2717ef01f3a292cf5787c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/c073592c2df5e0feb88b59a15c6034a85fdf7274.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b55986d8e71190ef6570427fce1b9d16fcfa607c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/4b8037e236d12f2eb28e7ec04fc2d5628435687c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/bd7c62ec3901213fbeb89e7c54e736d12e2e957c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/06bd4c2bb9389b50426c30f28535e5dde6116e74.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/82dbb3a70cf431ad305a93994b36acaf2fdd987c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/9128ce315982b2b72817e96431adcbef77099b7c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/46652833acaf2edda36299498d1001e938019374.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/fb83150c4b36acafd170465c7cd98d1000e99c74.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/f630733d5343fbf25ea47683b07eca8064388f7c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e555d5053af33a870fe5d0bac65c10385243b57c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/335738b0c9ea15ced76630a9b6003af33b87b27c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/e4464b31349b033b85002c7a15ce36d3d439bd7c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/335738b0c9ea15ced77e30a9b6003af33b87b274.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/1858579e033b5bb51647f05e36d3d539b700bc74.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/5b0c6f368744ebf8cef9b49fd9f9d72a6159a77c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/8e650866f6246b60dd8662d4ebf81a4c500fa27c.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/b72888fd1a4c510f0f5432ba6059252dd52aa574.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/5b0f95216b600c3355e90e681a4c510fd8f9a174.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/3a2a911abe096b6339898ef00c338744eaf8ac74.jpg',
'http://hiphotos.baidu.com/noe132/pic/item/6597d1fe43166d228effc534462309f79152d27c.jpg'
        ];





   //Windows8吧
    var windows8_collection_name='8吧专属';
    var windows8_collection=[
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/06036b51352ac65c408200cefbf2b21192138a09.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/cb87138ea0ec08fa7183751a59ee3d6d54fbda15.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/da49f9889e510fb3d999112ad933c895d0430c14.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/80ba333433fa828b06a3fb5efd1f4134960a5a14.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/3070b3accbef76092f8bff222edda3cc7dd99e14.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/9b6b4c1a9d16fdfadb01ad48b48f8c5495ee7ba8.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/0596311ab051f8197da465f7dab44aed2f73e714.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/708cec071d950a7b045825620ad162d9f3d3c9a8.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/6d5e03ca39dbb6fd92298e800924ab18962b37af.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/d5d4b72bc65c103802ffa87fb2119313b17e890b.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/9f48fed88d1001e9594e7fa9b80e7bec55e797af.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/36d13118ebc4b745ae12d1abcffc1e178b82150a.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/117162ff9925bc3123576a3e5edf8db1ca137097.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/d959651090ef76c6dc549d969d16fdfaae51670a.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/656abf6c55fbb2fb582133b44f4a20a44723dc97.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/6db9a49659ee3d6d7140e17643166d224e4ade0a.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/470d1c500fb30f248e9187a5c895d143ac4b0396.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/419a501a0ef41bd568d48e4951da81cb38db3d09.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/c17e2d50f3deb48f0eeec763f01f3a292cf57809.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/73cea2a5462309f7bc90cbaf720e0cf3d6cad611.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/b6063b004a90f603864cfafa3912b31bb151ed11.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/7669ac728bd4b31c7601c51d87d6277f9f2ff8d9.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/c17e2d50f3deb48f0e95c763f01f3a292cf57810.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/5005020b19d8bc3e23616d6c828ba61ea9d345b4.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/d5d4b72bc65c10381517a564b2119313b17e89b4.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/6ee252170924ab1858eb878a35fae6cd7a890b17.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/be86d8aea40f4bfb2cbef5f2034f78f0f63618ab.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/23b46b25b899a9014e5d30901d950a7b0308f5b5.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/405d0f1101e93901406ce6987bec54e737d196ab.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/c7692965034f78f01189fc4e79310a55b2191c16.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/a3b97addd100baa179ae21064710b912c9fc2e16.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/ff797e029245d688676dd902a4c27d1ed31b24aa.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/35a75f55564e9258585bed489c82d158cdbf4eaa.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/650630b6d0a20cf467ff957976094b36adaf99aa.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/ce57d52d11dfa9ec84413db162d0f703908fc1aa.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/cbb22dc279310a556c48b552b74543a9832610a9.jpg',
'http://hiphotos.baidu.com/%BB%D8%C7%B9%C9%A8%C8%BA%B5%D0_%B2%DF%C2%ED%B6%A8%CC%EC%CF%C2/pic/item/f593fd3f6709c93dd39e65519f3df8dcd00054a9.jpg'
       ];


    //金馆长
    var jinguanzhang_collection_name='金馆长';
    var jinguanzhang_collection=['http://hiphotos.baidu.com/sostuanyuan/pic/item/71dc1c13a8d3fd1ff1cec09a304e251f94ca5f34.jpg',

        'http://hiphotos.baidu.com/sostuanyuan/pic/item/49f6771c728b47107de19f6cc3cec3fdfd03232d.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/0e48fb39970a304e96ecc25ad1c8a786c8175c2d.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/fa746759564e925870fae44e9c82d158cdbf4e2d.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/13a92328bc315c60ac5b094f8db1cb134854772d.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/521317395982b2b7bc585b6431adcbef77099b34.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/4b59c1e154e736d151ddeea89b504fc2d462692d.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/741351f51a4c510f930380ba6059252dd52aa534.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/6305222f720e0cf3ea302c5b0a46f21fbf09aa34.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/a26a9c9a59ee3d6d6401e56b43166d224e4ade34.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/ff643d49ebf81a4c18fc8e69d72a6059242da62d.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/ec675329b899a90156f239961d950a7b0308f534.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/0b4e3c15367adab4411779e38bd4b31c8601e434.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/404e51c9b74543a979df986c1e178a82b801142b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/788309118701a18b962570ef9e2f07082938fe2d.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/5a20831fb31bb051ffead188367adab44bede02d.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/b0fe382bcffc1e177470ee914a90f603728de92d.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/5758f1f6fbedab64f2bd2f60f736afc378311e2c.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/3bab79c3c3fdfc035bbc8118d43f8794a5c2262b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/6c6a42d1d100baa10ce8251b4710b912c9fc2e2b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/229f1d8bc9177f3edef09ead70cf3bc79e3d562b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c8902530f8dcd1007a539a81728b4710b8122f2c.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/6a72063c5c6034a8c726da21cb1349540823762b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/9fd63a0719d8bc3e1bc7646a828ba61ea9d3452c.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c5869523b9389b50ce3b82f28535e5dde6116e2b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c2fa71e276094b36de56794da3cc7cd98c109d2b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/26353f38e5dde711161d2156a7efce1b9c16612c.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/455780fe3a87e9506ed391cc10385343faf2b42b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/41e06aaf0cf431ada41d21994b36acaf2fdd982c.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/4d5ed16ef6246b6049cad0d4ebf81a4c500fa22b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/e6998cded539b60062016d17e950352ac75cb72c.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/8159b6fed7ca7bcb35b4a58fbe096b63f724a82c.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/29e3f0e02e738bd4bde5d091a18b87d6267ff92b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/79d5030c4a90f6037174fee73912b31bb151ed2b.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/a9f81e024bfbfbed5b9c54df78f0f736aec31f2a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c6ad5cc07b899e51ed4b58b442a7d933c9950d2a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/2e93ebd781cb39db610505f6d0160924aa18302a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/30aa460e9245d6881fc7d004a4c27d1ed31b242a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/b1f0633ec895d14345ba868373f082025baf0723.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/54d1731a7f3e670973c5275f3bc79f3df9dc552a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/0f542848d688d43f4b65f3527d1ed21b0ff43b23.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/2e03ec439258d1091126cb12d158ccbf6d814d2a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/645d8a43251f95ca6439f016c9177f3e66095223.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/6e4147f7af51f3de3a77dbc494eef01f3b29792a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/dc7903359b504fc2579ad2a5e5dde71191ef6d2a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c97e97f8e0fe99252ac00bf034a85edf8cb17123.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/521317395982b2b7bc5a5b6431adcbef77099b2a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/88bbeeea36d12f2ec6c9ccc04fc2d56284356823.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/38b8cc044b36acaf5d2cf45c7cd98d1000e99c23.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/39d7df350cd79123f02cf6d4ad345982b3b78023.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/ffa46dc77bcb0a46b2e7e9996b63f6246a60af2a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/d5c0e3e33d6d55fb800314866d224f4a21a4dd2a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/0184ed2111dfa9ecaceb34b762d0f703908fc12a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/f45f92351f30e924a061fe914c086e061c95f72a.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/e28813e18a1363274a21a093918fa0ec09fac723.jpg',
'http://hiphotos.baidu.com/sostuanyuan/pic/item/bf5fd40b1d950a7b1cf92c640ad162d9f3d3c923.jpg',
'http://hiphotos.baidu.com/sostuanyuan/pic/item/404b3d0ca18b87d6358ec9bf070828381e30fd23.jpg',
'http://hiphotos.baidu.com/sostuanyuan/pic/item/79d5030c4a90f603717cfee73912b31bb151ed23.jpg',
'http://hiphotos.baidu.com/sostuanyuan/pic/item/309979f0fc0392451c7f83af8794a4c27c1e2529.jpg',
        ];

    var Bierde_collection_name='彼尔德';
    var Bierde_collection=[
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/8e4968160ef41bd57c72855451da81cb38db3dd6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/5ff894d0a3cc7cd9f81059793901213fb80e9132.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/71dc1c13a8d3fd1fee28cf9a304e251f94ca5fd6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/6fd56b55ccbf6c8126164148bc3eb13532fa40d6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/af378ea55edf8db1510f11c40923dd54574e74d6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/d5c0e3e33d6d55fb83fb1b866d224f4a20a4dd32.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/f986d8d4f2d3572c32dff17c8a13632762d0c332.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/dd2431d9b31c8701ae8bdf46277f9e2f0708ff32.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/930e9f20d42a28347b875bab5bb5c9ea14cebfd6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/8a66b058b319ebc44eba14398226cffc1f171631.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/88de245c0fb30f24a6588ea3c895d143ac4b0331.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/2e93ebd781cb39db610205f6d0160924aa183031.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/4a4572f1c3cec3fd34fcc5d5d688d43f86942731.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/4a56f09df603738dab6b6182b31bb051f919ecd6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/5c94c33c0a55b3191cdfefd543a98226cefc17d5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/7155e0a2a40f4bfb15f6f3f4034f78f0f63618d5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c6ad5cc07b899e51eea857b442a7d933c9950dd5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c6ad5cc07b899e51eea857b442a7d933c9950dd5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c2fa71e276094b36de50794da3cc7cd98c109d31.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/0e48fb39970a304e9704cd5ad1c8a786c8175cd5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/277d9239349b033b094a9e7a15ce36d3d439bd31.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/034880242df5e0fe0d3ee4a15c6034a85fdf72d5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/14462ae276c6a7ef4600c586fdfaaf51f2de66d5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/4b59c1e154e736d15235e1a89b504fc2d46269d5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/1a730294a9014c0875f94a050a7b02087af4f431.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/74561b8687d6277f8dd0509828381f30e824fc31.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/b9c74c0e738da9773dede48bb051f8198718e331.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/2aae6d276059252d993170a4349b033b5ab5b9d5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/faa02a5f9822720e37e88f5a7bcb0a46f31fabd5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/4bce130c4c086e06068e52eb02087bf40bd1cbd5.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c8902530f8dcd1007a5f9a81728b4710b8122f30.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c3199f1295cad1c811789e877f3e6709c83d5130.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/a5192855d109b3de3f7c86c8ccbf6c81810a4c30.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/fc73f8aad933c8953759f5dbd11373f0830200d4.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/26353f38e5dde71116112156a7efce1b9c166130.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/b86116a22edda3cc0927da8001e93901203f9230.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/60440a73ca8065386929c6b397dda144ac348230.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/426289f7828ba61e05c9a58f4134970a314e59d4.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/9fd63a0719d8bc3e182f6b6a828ba61ea9d345d4.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/13a92328bc315c60a3b2064f8db1cb13485477d4.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/bc1d9aa9462309f7a9accfb2720e0cf3d6cad630.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/26353f38e5dde71115f52e56a7efce1b9c1661d4.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/c5846f34b6003af3629db1c0352ac65c1138b6d4.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/247dda54252dd42a662e6c0b033b5bb5c8eab8d4.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/52dc3ddb277f9e2f13ff7fa81f30e924b999f329.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/b9c74c0e738da9773de5e48bb051f8198718e329.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/25df6e328794a4c2b3e3858b0ef41bd5ac6e3937.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/49f6771c728b47107def9f6cc3cec3fdfd032337.jpg',
'http://hiphotos.baidu.com/sostuanyuan/pic/item/645d8a43251f95ca6435f016c9177f3e66095237.jpg',
'http://hiphotos.baidu.com/sostuanyuan/pic/item/74c31ecf7d1ed21bde024c45ad6eddc450da3f28.jpg',
'http://hiphotos.baidu.com/sostuanyuan/pic/item/229f1d8bc9177f3edeff9ead70cf3bc79e3d5628.jpg'
        ];


    setTimeout(function(){
        //表情名、表情URL数组、ContentID号，MenuID号，后两者包含的数字应大于16
        fun_UserDefinedSmiley(yangcongtou_collection_name, yangcongtou_collection, 'tab24', 'tab_24');        
        fun_UserDefinedSmiley(jinguanzhang_collection_name, jinguanzhang_collection, 'tab25', 'tab_25');
        fun_UserDefinedSmiley(Bierde_collection_name, Bierde_collection, 'tab26', 'tab_26');
        fun_UserDefinedSmiley(yutumei_collection_name, yutumei_collection, 'tab27', 'tab_27');
        fun_UserDefinedSmiley(Luoxiaohei_collection_name, Luoxiaohei_collection, 'tab28', 'tab_28');
        fun_UserDefinedSmiley(windows8_collection_name, windows8_collection, 'tab29', 'tab_29');
    }, 0);


    function fun_UserDefinedSmiley(collection_name, collection, content_id, menu_id ){
        var f1=document.getElementById('tabContent');
        var f2=document.getElementById('tabMenu');
        if(f1&&f2){
            //添加自定义表情存储表格
            var node=document.createElement('div');
            node.id=content_id;
            node.setAttribute('style', 'display: none;');
            var text='<table cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse; " border="1" bordercolor="#B8B3FF" width="100%" height="100%"><tbody>';
            var number=0;
            for(var i=0; i<collection.length/7;i++){
                text+='<tr>';
                for(var j=0; j<7 ; j++){
                    var posflag=j>3?1:0;
                    var image_src=collection[number++];
                    if(image_src){
                        text+='<td border="1" width=35px style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF" onclick="FrozenFaceSmileyInsertSmiley(\''+image_src+'\')" onmouseover="FrozenFaceSmileyOver(this,\''+image_src+'\',\''+posflag+'\')" onmouseout="FrozenFaceSmileyOut(this)">';
                        text+='<img width=35px src="'+image_src+'">';
                        text+='</td>';
                    }else{
                        text+='<td width=35px bgcolor="#FFFFFF"></td>';
                    }
                }
                text+='</tr>';
            }
            text+='</tbody></table>';
            node.innerHTML=text;
            f1.appendChild(node);

            //添加自定义表情切换按钮
            var node=document.createElement('div');
            node.id=menu_id;
            node.setAttribute('class', 'menuDefault');
            node.setAttribute('onclick', 'FrozenFaceSwitchTab("'+content_id+'","'+menu_id+'");');
            node.innerHTML='<u>'+collection_name+'</u>';
            f2.appendChild(node);

            //设置预览框大小
            document.getElementById('faceReview').setAttribute('style', 'width:100px;height:100px;');
        }
    }
    unsafeWindow.FrozenFaceSwitchTab=function(content_id, menu_id){
        var f1=document.getElementById(content_id);
        if(f1){
            //显示自定义表情储存表格
            var f2=document.getElementById('tabContent');
            if(f2){
                for(var i=0; i<f2.children.length; i++){
                    if(f2.children[i].getAttribute('style')=='display: block;'||
                        f2.children[i].getAttribute('style')=='display: block; '){
                        f2.children[i].setAttribute('style', 'display:none;');
                    }
                }
            }
            f1.setAttribute('style', 'display: block;');

            //表情切换按钮调整
            var f3=document.getElementById('tabMenu');
            if(f3){
                for(var i=0; i<f3.children.length; i++){
                    var item=f3.children[i];
                    if(item.getAttribute('class')!='menuDefault disable'){
                        item.setAttribute('class', 'menuDefault');
                    }
                    var tab_number=item.id.match(/\d+/);
                    if(parseInt(tab_number)<16&&item.getAttribute('class')!='menuDefault disable'){    //假定16以下的序号已被百度贴吧占用，其他序号保留给小脸使用
                        item.setAttribute('onclick', 'document.getElementById("'+content_id+'").setAttribute("style", "display:none;");document.getElementById("'+menu_id+'").setAttribute("class", "menuDefault");switchTab('+tab_number+')');
                    }
                }
                document.getElementById(menu_id).setAttribute('class', 'menuFocus');
            }
        }
    }
    unsafeWindow.FrozenFaceSmileyInsertSmiley=function(image_src){
        var editorID=unsafeWindow.getSearchById('id');
        var editor=parent.wrappedJSObject.TED.Editor.getInstanceById(editorID);
        editor.execCommand('insertimage',  image_src);
        editor.overlay.close();
    }
    unsafeWindow.FrozenFaceSmileyOver=function(td, image_src, posflag){
        td.style.backgroundColor="#E8E8FD";
        document.getElementById('faceReview').setAttribute('src', image_src);
        if(posflag==1)
            document.getElementById("tabIconReview").className="show";
        document.getElementById("tabIconReview").style.display='block';
    }
    unsafeWindow.FrozenFaceSmileyOut=function(td){
        td.style.backgroundColor="#FFFFFF";
        document.getElementById('faceReview').setAttribute('src', 'http://static.tieba.baidu.com/tb/editor/images/default/0.gif');
        document.getElementById("tabIconReview").className="";
        document.getElementById("tabIconReview").style.display='none';
    }


})();
