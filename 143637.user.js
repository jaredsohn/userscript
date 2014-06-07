// ==UserScript==
// @name FrozenFaceSmiley for 纺大吧
// @version 3.0
// @description 在百度贴吧中使用自定义表情
// @include http://tieba.baidu.com/tb/editor/v2/smiley.html*
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


    var fangda_collection_name='纺大吧专用';
    var fangda_collection=[
'http://hiphotos.baidu.com/vincent_edu/pic/item/f16d44cca144ad34c0d91007d0a20cf430ad85a8.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/3ae1771e4bfbfbedb434a1ff78f0f736aec31fa4.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/291ada32dd54564e5d3773b9b3de9c82d0584f44.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/bd1a855f9258d109628f3e32d158ccbf6d814da6.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/d4c15f4594eef01ffb788f45e0fe9925bd317da6.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/07471a2c70cf3bc773665a6cd100baa1cc112aa8.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/aba1a5184b36acaf8c8c017c7cd98d1000e99ca6.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/b14760cf9c82d15818e4ce31800a19d8bd3e42a8.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/3762c2cea9ec8a13357dc060f703918fa1ecc0af.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/6cbd04db7bcb0a469d451cb96b63f6246a60afaf.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/1240dfe2d7ca7bcb642850afbe096b63f724a8bb.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/1bc74d400fb30f2451c97b83c895d143ac4b03ba.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/d94f9981f603738d9b269ba2b31bb051f919eca6.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/54d5d02a5bb5c9ea96959463d539b6003bf3b3a8.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/70768052fbf2b211034312ceca8065380dd78ea5.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/a3b32f129245d6882e7d2524a4c27d1ed31b2497.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/b97d1b84d143ad4bc942d14082025aafa50f06a5.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/8bb6c95d510fd9f9ad4ec2e9252dd42a2934a4b1.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/9c4d4154d688d43f7cc406727d1ed21b0ff43ba5.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/b1867497c9177f3e8f596b8d70cf3bc79e3d56a5.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/acf1bf90800a19d8646e138533fa828ba71e46a5.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/6a1b6008ebc4b7456af22096cffc1e178b8215af.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/f744e35f251f95ca35a60536c9177f3e660952bb.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/d94f9981f603738d9b139ba2b31bb051f919ecb1.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/18be2427afc379312f3111a9ebc4b74542a911b0.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/6cbae2bccbef7609eb660e1f2edda3cc7dd99ea5.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/aba1a5184b36acaf8cb3017c7cd98d1000e99cbb.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/ff732bcdd100baa13d53d03b4710b912c9fc2e97.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/966ab8710c3387449d96b8fc510fd9f9d62aa0bb.jpg',
'http://hiphotos.baidu.com/vincent_edu/pic/item/53b4519aa61ea8d32350e384970a304e241f58a4.jpg',
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

   

    setTimeout(function(){
        //表情名、表情URL数组、ContentID号，MenuID号，后两者包含的数字应大于16
        fun_UserDefinedSmiley(fangda_collection_name, fangda_collection, 'tab24', 'tab_24');        
        fun_UserDefinedSmiley(jinguanzhang_collection_name, jinguanzhang_collection, 'tab25', 'tab_25');
        fun_UserDefinedSmiley(yutumei_collection_name, yutumei_collection, 'tab27', 'tab_27');
        fun_UserDefinedSmiley(Luoxiaohei_collection_name, Luoxiaohei_collection, 'tab28', 'tab_28');
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
