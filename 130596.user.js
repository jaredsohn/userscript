// ==UserScript==
// @name FrozenFaceSmiley
// @version 1.6
// @description 在百度贴吧中使用自定义表情
// @include http://tieba.baidu.com/tb/editor/v2/smiley.html*
// ==/UserScript==


(function(){


    //泉此方
    var konata_collection_name='泉此方¹';
    var konata_collection=[
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/5c0ffdc02f2eb938c2ce174dd5628535e7dd6fe3.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/9aad1d99d43f8794025c2591d21b0ef419d53ae3.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/8aea91bea40f4bfb3373f3eb034f78f0f53618e3.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/a1e987196e061d95fce45a877bf40ad160d9caed.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/ba1388076d224f4a2f041eac09f790529a22d1ed.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/73049ff636d12f2ee198c3df4fc2d562873568ed.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/d9b007ae6c81800a9878e4b1b13533fa808b47ed.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/f0341a11baa1cd11e92b1f9fb912c8fcc1ce2ded.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/fb367f9e8c5494ee9abc62a62df5e0fe9b257ee8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/b1e98181f603738d75c7619db31bb051fa19ecfe.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/6a3139c2572c11df575cd29c632762d0f503c2fe.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/394500fe76094b36e71e7652a3cc7cd98f109dfe.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/2df75edbd1c8a78659a627b16709c93d72cf50fe.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/d25c81fc2e738bd454addf8ea18b87d6257ff9ff.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/b896019165380cd7ae91cf52a144ad345b8281ff.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/8559000249540923aae60ec19258d109b1de49ff.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/7a638c01b912c8fc5c7c9b72fc039245d48821ff.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/31337dec5266d016ba96f397972bd40737fa35ff.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/d1111c3b6059252df39970bb349b033b59b5b9f8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/a5dc9293b2b7d0a24a476922cbef760949369af8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/535d02fb15ce36d3fa8fee8f3af33a87eb50b1fb.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/3b12499aa61ea8d375a719bb970a304e271f5885.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/dcd74c85a4c27d1e7aa3567b1bd5ad6edfc43885.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/7ae6c7e2d7ca7bcb12ffaa90be096b63f424a886.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/baf95802b07eca8058815458912397dda3448386.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/96c7cc1928381f30199de016a9014c086c06f087.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/c1ffb42f6709c93de47563489f3df8dcd3005487.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/5a8e1b070924ab1822918c8835fae6cd79890b87.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/043f5a3297dda144efe0010db2b7d0a20ef48699.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/8ddd2ecce71190ef1613ff60ce1b9d16fffa609a.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/4a4f1222c895d1436c9e899c73f0820258af079a.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/99676bfd08fa513d214101613d6d55fbb0fbd99b.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/68b1ee3cd42a28341d4d5bb45bb5c9ea17cebf9b.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/c3fb82450923dd542e96cad7d109b3de9e8248a5.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/516a79a6d0a20cf47677936076094b36aeaf99a7.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/7431460101e9390173e3e0817bec54e734d196a1.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/c6f35607fdfaaf519502ec008c5494eef21f7aa1.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/3b12499aa61ea8d375c319bb970a304e271f58a1.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/42783d12738da977e4fceb94b051f8198418e3bc.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/263568dd7cd98d105106618e213fb80e79ec90bc.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/b4d9977134a85edffe5e939c49540923df5475bc.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/dfc2ab48252dd42a00c56c14033b5bb5cbeab8be.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/99cb5ccca144ad341a73ea38d0a20cf433ad85be.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/47a2ebb5462309f782a1c0ad720e0cf3d5cad6b8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/535d02fb15ce36d3facaee8f3af33a87eb50b1b8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/baf95802b07eca8058cb5458912397dda34483b8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/d9b007ae6c81800a982be4b1b13533fa808b47b8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/16ff4193b9014a902cf02b02a9773912b11beeb9.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/bbf44c10a18b87d6cc8cc6a0070828381d30fdb9.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/49dc5c1b304e251f183e8947a786c9177d3e53b9.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/3c4095ce8db1cb133d5b50acdd54564e93584b5c.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/7b1849135aafa40f8df4a262ab64034f79f0195c.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/bfad88b88226cffccb18d30db9014a90f703ea5d.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/68b1ee3cd42a28341c8b5ab45bb5c9ea14cebf5d.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/8ddd2ecce71190ef29d6fe60ce1b9d16fcfa605d.jpg'
        ];
        
		//幸运星
    var lucky_star_collection_name='幸运星';
    var lucky_star_collection=[
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/0293c9197bf40ad1acf2765c572c11dfa8ecce71.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/fa3b9c3d11dfa9ec5954e7a862d0f703908fc115.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/d9b007ae6c81800a4c9038b1b13533fa838b4715.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/5a8e1b070924ab181e07508835fae6cd7a890b71.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/d52c9acb81cb39db32b5d6e9d0160924aa183015.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/07cc89b6d933c895450b29c4d11373f083020015.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/20d0d421e924b8996f2dc8876e061d950b7bf672.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/00129a2c269759eee025d174b2fb43166c22df16.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/04db4c55ebf81a4ca7475d76d72a6059242da616.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/9f356a55ad345982aa9a542d0cf431adcaef8472.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/9f356a55ad345982aafe542d0cf431adcaef8416.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/a447e5cca3cc7cd9ae5985663901213fb90e9116.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/f8f7f1382df5e0fedb6c38be5c6034a85fdf7216.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/9d221ad9a786c9171a13e386c93d70cf3ac75772.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/c1ffb42f6709c93d1886bf489f3df8dcd0005416.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/8a636d0fa8d3fd1f1c7b1385304e251f94ca5f1c.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/cb2608ecfc039245a1c750b08794a4c27c1e251c.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/75f6190a0ef41bd5d20c594b51da81cb38db3d2f.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/8aea91bea40f4bfb67a22feb034f78f0f636181c.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/a5a31a0273f08202c3cd20804bfbfbedaa641b2f.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/b1e98181f603738d1915bd9db31bb051f919ec28.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/0ae0b0e50ad162d93d9cd3a311dfa9ec8b13cd1d.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/47a2ebb5462309f7761d1cad720e0cf3d6cad61d.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/e310d15d510fd9f92f65e4d6252dd42a2934a41d.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/535d02fb15ce36d3d65a328f3af33a87e850b128.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/29d7731f7bec54e71c81aba1b9389b504ec26a1d.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/32c1e6e4e0fe9925ff52d8ef34a85edf8cb17128.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/c5f9b99a4710b912baac4741c3fdfc039345221d.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/d9e871b0cd11728b37733d9dc8fcc3cec2fd2c28.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/a58616d551da81cbbab832725266d01608243128.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/07cc89b6d933c895452029c4d11373f083020028.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/ffde64d279310a55177a6f4bb74543a983261028.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/826a72104a90f603dcee2df83912b31bb151ed29.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/04db4c55ebf81a4ca76c5d76d72a6059242da629.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/c102dedf36d3d539b264be7c3a87e950342ab029.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/5bab30e3b2119313bf1a4e0f65380cd790238d29.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/73049ff636d12f2e95691fdf4fc2d5628435681e.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/85f8caf83901213f9f6aff6354e736d12e2e9529.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/5ea65949d109b3deccd355d7ccbf6c81810a4c1e.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/b4d67a2433fa828bfc7a2c5cfd1f4134960a5a29.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/c01408dfc3fdfc03e4145207d43f8794a5c2261e.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/7a638c01b912c8fcb0aa4772fc039245d7882129.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/7b6562663912b31b03e37c968618367ad8b4e1f8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/f5126440f3deb48fb0f71061f01f3a292ff578e8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/c714d5068a82b901e723728c738da9773b12eff9.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/d52c9acb81cb39db325ed6e9d0160924a91830e8.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/3e9211a54aed2e73317737938701a18b85d6fae9.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/2dc51f3b2834349bfd88df3ac9ea15ce34d3bef9.jpg',
        'http://hiphotos.baidu.com/%B4%CB%B7%BD%B5%C4%B4%F4%C3%AB/pic/item/fa3b9c3d11dfa9ec59b0e7a862d0f703938fc1e9.jpg'
        ];


      //兔鱼妹
    var konata_collection_name='兔鱼妹';
    var konata_collection=['http://hiphotos.baidu.com/%C7%A7%C4%EA%B5%C4%B3%D9%B5%BD/pic/item/0190718264b66a9df11f36d7.jpg',
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
        ];
	 
    //金馆长
    var konata_collection_name='金馆长';
    var konata_collection=['http://hiphotos.baidu.com/sostuanyuan/pic/item/71dc1c13a8d3fd1ff1cec09a304e251f94ca5f34.jpg',
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

    var lucky_star_collection_name='彼尔德';
    var lucky_star_collection=[
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/8e4968160ef41bd57c72855451da81cb38db3dd6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/5ff894d0a3cc7cd9f81059793901213fb80e9132.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/71dc1c13a8d3fd1fee28cf9a304e251f94ca5fd6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/6fd56b55ccbf6c8126164148bc3eb13532fa40d6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/af378ea55edf8db1510f11c40923dd54574e74d6.jpg',
        'http://hiphotos.baidu.com/sostuanyuan/pic/item/ffa46dc77bcb0a46cd1fe6996b63f6246b60af32.jpg',
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
        fun_UserDefinedSmiley(konata_collection_name, konata_collection, 'tab24', 'tab_24');
        fun_UserDefinedSmiley(lucky_star_collection_name, lucky_star_collection, 'tab25', 'tab_25');
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
