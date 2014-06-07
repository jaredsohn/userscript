// ==UserScript==
// @name           Pet Feed Vnsharing
// @version        1.5
// @namespace      
// @author         
// @description    Tự động feed các pet của mình khi mở trang http://vnsharing.net/forum/vnsshop.php?do=pet
// @include        http://vnsharing.net/forum/vnsshop.php?do=pet
// @include        *vnsharing.net/forum/
// @include		   http://vnsharing.net/forum/index.php
// @include        http://vnsharing.net/forum/vnsshop.php
// @include     http://vnsharing.net/forum/member.php?u=*
// @updateUrl http://userscripts.org/scripts/source/187391.meta.js
// ==/UserScript==

console.log('Welcome');
$ = unsafeWindow.jQuery;

var maxSp = 366;
//var petData = []
var maxPetAmount = 0;

 function getHtml(url, action) {
            return $.ajax({
                type: "GET",
                url: url,
                dataType: "html",
                async: true,
                success: action
            });
        }

    $(document).ready(function() {
		setTimeout(function() {
				var petShop = 'http://vnsharing.net/forum/vnsshop.php?do=pet';
				getHtml(petShop, function(petData) {
					var temp = $(petData).find(".panel:eq(1) a[href*=feedpet]");
					//var temp = $(petData).find('.panel:eq(1) > fieldset > div[style*="text-align:center"]')					
					console.log(temp);
					var totalPet = temp.length;
					
					
					$(temp).each(function (i) {
    					var sp = $(this).parent().text();
    					console.log(sp);
    					sp = sp.substring(sp.lastIndexOf('SP:') + 4, sp.lastIndexOf('[Trò chuyện]'));                
    					
    					sp = parseInt(sp, 10);
    					
    					console.log(sp < maxSp ? 'Dưới 300 SP' : 'Trên 300 SP');
        					if(sp > maxSp){
        					   temp.splice(i, 1);
        					   maxPetAmount++;
        					}				
					   });
					
					if(temp.length > 0)
					{
					console.log(totalPet);
                    var r = confirm("Cho pet ăn chứ? Hiện có " + totalPet + " em chưa được feed. Và " + maxPetAmount + " đã trên 366 SP, sẽ bỏ qua.");
                    if (r == true)
                    {                    
                        var petList = temp;
                        
                        // Lấy danh sách các pet hiện có                        
                        //var petList = $(petData).find(".panel a:contains('Trò chuyện')");                        
                        var petName = $(petData).find(".panel legend > a").text();
                        
                        
                    	var total = $(petList).length;
                    	console.log('Tổng số: ' + total + ' pet.');
                    	
                        $(petList).each(function (index) {
                            // petskills.php?petid=6776
                            console.log('starting :' + index);
                            
                            // Cắt lấy số thứ tự của Pet
                            var url = $(this).attr('href');
							console.log(url);
							//url = url.split('=')[2];                            
                            
                            if (url != undefined) {
                                //url = 'http://vnsharing.net/forum/vnsshop.php?do=feedpet&petid=' + url;
                                setTimeout(function(){
									// 1 giây feed 1 pet
									
									getHtml(url, function() {
                                        // Feed pet và thông báo vào cửa sổ console.log của trình duyệt
                                        if(petName[index] != undefined) {
                                            console.log('Xong ' + petName[index]);
                                            
											document.title = 'Feeding... Xong số ' + (index + 1) + ' ' + petName[index];
                                        }
                                        
                                        if (index == (total - 1)) {
                        					// Thông báo đã thử feed hết các pet
											var v = confirm('Xong tổng số ' + total + ' pet. Vào VnSharing Shop kiểm tra không?');
											if (v == true)
											{
												window.location.href = petShop;
											}
                    					}
                                    });
									
                                }, 2000);  // 2 giây mỗi pet
                            }
                        });                                   
                    }   // End if Xác  nhận
                } // End If Tìm thấy pet
				
			});
		}, 2500);
	});