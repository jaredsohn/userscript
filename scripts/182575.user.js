// ==UserScript==
// @name       Live mail generator
// @namespace  http://ctrlc.123.st/
// @version    0.1
// @description  Thông tin đăng ký outlook, hotmail sẽ được điền tự động, việc của bạn là nhập mã capcha và nhấn xác nhận.
// @match      https://signup.live.com/signup.aspx*
// @copyright  2013+, Zzbaivong
// ==/UserScript==

jQuery.noConflict();
(function ($) {

	$("#iliveswitch").hasClass("c_nobdr t_prs") || $("#iliveswitch").click();

	var mail = "gialangsangai@gmail.com";
	// Nên sửa gialangsangai@gmail.com thành email của bạn để dùng khi cần phục hồi mật khẩu.

	var password = "";
	// Để trống nếu muốn đặt pw tự động.
	// Nếu muốn đặt pw mặc định thì sửa thông số này, ví dụ muốn pw 123456pw thì sửa "" thành "123456pw". Lưu ý: ít nhất 8 ký tự, có chữ in hoa hoặc số.

	$("#idomain option[value='outlook.com']").prop("selected", true);
	// Đổi outlook.com thành hotmail.com nếu muốn.

	$("#iBirthYear option[value='1988']").prop("selected", true);
	// Đổi 1988 thành năm sinh khác nếu muốn.

	var ten = "Thanh Vinh Vu Hoa Sinh Trung Nhat Hoang Hoa Nga Van Hai Lan Nguyet Nam Phuc Hong Kiet Dung Triet Huy Hoang Linh Hung Vuong Thuy Ha Diep".split(" "),
		ho = "Le Nguyen Vu Tran Tu Dinh Hoang Mac Pham Bui Do Ho Duong Ly Vo Phan".split(" "),
		tenen = "paul paxton percivalpercy perry peter peyton philbert philip phineas pierce quade quenby quillan quimby quentin quinby quincy quinlan quinn ralph ramsey randolph raymond reginald renfred rex rhett richard ridley riley robertrobin roderick rodney roger roland rolf ronald rory ross roswell roy royce rufus rupert russell ryan maddox magnus malcolm melvin marcus markmarc marlon martin marvin matthew maurice maxmaxwell medwin melville merlin michael milburn miles monroe montague montgomery morgan morris morton murray nathanielnathan neal neville nicholas nigel noel norman norris olaf olin oliver orson oscar oswald otis owen jack jacob jamesjimmy jarvis jason jasper jed jeffrey jeremiahjeremy jerome jesse john jonathan josephjoeyjoe joshua justin kane keene keegan keaton keith kelsey kelvin kendall kendrick kennethken kent kenway kenyon kerry kerwin kevin kiefer kilby kilian kim kimball kingsley kirby kirk kit kody konrad kurt kyle lambert lamont lancelot landon landry lane lars laurence lee leith leonardleoleon leroy leslie lester lincoln lionel lloyd logan lombard louislewis lowell lucasluke luther lyndon gabriel gale galvin gardner garret garrick garth gavin george geraldgerardgerret gideon gifford gilbert giles gilroy glenn goddard godfrey godwin graham grant grayson gregory gresham griswaldgriswold grover guy hadden hadley hadwin hal halbert halden hale hall halsey hamlin hanley hardy harlanharland harley haroldharry harrisharrison hartley heathheathcliff hector henry herbert herman homer horacehoratio howard hubert hughhugo humphrey hunter ian igor irvinirving isaac isaiah ivan iverivar ives dale daley dalton damon daniel darcy darian darell darrel david davin dean declan delmar denley dennis derek dermot derwin des desmond dexter dillon dion dirk dixon dominic donald dorian douglas doyle drake drew driscoll dudley duncan durwin dwayne dwight dylan earl eaton ebenezer edan edgar edric edmond edmund edward eddie edwin efrain egan egbert egerton egil elbert eldon eldwin eli ely elijah elias eliot elliott ellery elmer elroy elton elvis emerson emery emmanuel emmett emrick enoch eric erik ernest errol erskine erwin esmond ethan ethanael ethen eugene evan everett ezra fabian fairfax falkner farley farrell felix fenton ferdinand fergal fergus ferguson ferris finbar fitzgerald fleming fletcher floyd forbes forrest foster fox francis frank frasier frederick freeman aaron abbott abel abner abraham adam addison adler adley adrian adrien aedan aiden aiken alan allan alastair albern albert albion alden aldis aldrich alexander alfie alfred algernon alston alton alvin ambrose amery amos andrew angus ansel anthony archer archibald arlen arnold arthur art arvel atwater atwood aubrey austin avery axel baird baldwin barclay barnaby baron barrett barry bartholomew basil benedict benjamin benton bernard bert bevis blaine blair blake bond boris bowen braden bradley brandan brendan brendon brent bret brett brian brice brigham brock broderick brooke bruce bruno bryant buck bud burgess burton byron cadman calvert caldwell caleb calvin carrick carl carlton carney carroll carter carver cary casey casper cecil cedric chad chadwick chalmers chandler channing chapman charles chatwin chester christian christopher clarence claude clayton clay clifford cliff clive clyde coleman colin collier conan connell connor conrad conroy conway corwin crispin crosby culbert culver curt curtis cuthbert craig cyril zea zelda zelene zera zoe yolanda yvette yvonne wanda wenda wendy whitney wilda willa willette willow wilona winifred winona wynne valda valerie vanessa vania veleda vera verda veronica victoria violet virginia vita vivian vivianne udele ula ulrica ulva una unity ursa ursula tabitha talia tamara tammy tanya tara tasha tatum teresa teri tess thalia thea thelma theodora thomasina thora tiffany tilda timothea tina tracy trina trista trixie trix tuesday tyne sabrina brina sacha sadie salena sally salome samantha sandra sapphire sarah scarlett selene selena serena shana shannon sharon sheila shirley sibley sibyl sybil silver simona simone sirena rachel ramona rebecca regina renata renee rhea rhoda rita roberta robin rosa rose rosalie rosalind rosanne rosemary rowena roxanne ruby ruth queen queenie quenna questa quinella quintana quintessa page pamela pandora pansy patience patricia patty paula paulette pearl peggy peg penelope philippa philomena phoebe phyllis polly primavera primrose priscilla prudence prunella octavia odette olga olivia olive opal ophelia oprah oriel orlena orlantha orva nadia nadine nancy naomi natalie nathania nell nerissa nerita nessa nessia nicolette nicole nina noelle nola nora norine norma nydia mabel madeline madge magda magdalene maggie maia maisie mandy marcia margaret margot maria marie marian marilyn marnia marissa marta martha martina mary matilda maude maura maureen mavis maxine megan melanie melinda melissa melody melvina mercy meris merle michelle mildred millicent minerva mirabelle miranda miriam misty moira molly mona monica mora morgan muriel myra myrtle lacey lane lara larina larissa laura laurel loralie lauren laverna leah leigh leanne lee lea leslie leticia lilah lillian lilly linda linette lindsay lisa liza livia lizzie lois lola lolita lorelei lorena lorraine louisa louise lucia luciana lucille lucinda lucy lulu luna lynn kacey kara karen karena kate katherine kathy kathleen katrina kay kayla kayleigh keely kelsey kendra kerri kirstyn kirsten kyla jacqueline jade jane janet janice jasmine jeanne jemima jennifer jessica jessie jewel jillian jill joan jocelyn joyce joanna josephine joy judith judy juliana julia julie juliet june justine ida idelle imogen imogene ingrid irene iris ivy ivory haley hayley hanna hannah harriet harley harmony hattie hazel heather helen helena henrietta hetty hilda holly honey hope hortense gabrielle gale gaye geneva genevieve georgette georgia georgiana geraldine germaine gertrude gilda gillian gladys gloria glynnis grace guinevere gwen gwendolyn gwynne faith fannie farrah fara fawn faye fedora felicia fern fiona flora frances francesca freda frida frederica echo eda edana edeline edith edlyn edna edwina effie eileen elaine eleanor elena elga elise eliza elizabeth ella ellen eloise elsie elvira emeline emily emma erika ernestine esmeralda erin estelle estra ethel eudora eugenia eunice eva eve evelyn danielle daphne darlene davida dawn deborah deirdre delilah denise diana diane dominica dominique donna dora doris drucilla caitlin camille carissa carla carly carmen carrie carol caroline cherise catherine charity charlene chelsea cheryl chloe christine claire clare clarissa coral courtney cynthia barbara bobbie beata beatrice beatrix becky belinda belle bella bernadette bernice bertha berta bertina beryl bess beth bethany bettina beverly bianca blair blanche blythe bonnie brenda briana brigid bridget brittany britney brooke abigail ada adelaide adrienne agatha agnes aileen aimee alanna alarice alda alexandra alice alina alison alma amanda amaryllis amber anastasia andrea angela angelica anita ann anne annabelle annette anthea april ariana arleen astrid audrey".split(" "),
		noi = "vs  love  width  as  that  and  kill ".split(" "),
		nam = [1980, "", 1981, "", 1982, "", 1983, "", 1984, "", 1985, "", 1986, "", 1987, "", 1988, "", 1989, "", 1990, ""],
		dauso = [90, 93, 120, 121, 122, 126, 128, 91, 94, 123, 124, 125, 127, 129, 97, 98, 163, 164, 165, 166, 167, 168, 169, 92, 188],
		chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
		string_length = 8,
		randomstring = "",
		charCount = 0,
		numCount = 0;

	$("#tou").parent().before('<div class="module" style="margin-bottom: 52px;"><p class="head">Email đã được tạo tự động:</p><div class="helparea"><input id="genlivemail" type="text" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off" class="spHipNoClear hipInputText primaryTextInput" style="float: left; width: 310px!important; margin-right: 2px;" /></div><p class="linkinline proofswitch">Nếu lỗi thông tin, hãy nhấn <a id="gennewmail" href="javascript:;" class="hipLinkText">tạo email khác</a>.</p></div>');

	function chonmot(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function chonop(name) {
		$("#" + name + " option").eq(1).prop("selected", true).end().prop("selected", function (i) {
			if (i == Math.floor(Math.random() * $(this).parent().children().length) && i != 0) {
				return true;
			}
		});
	}

    function newemail() {
    	$("#iLastName").val(chonmot(ten));
    	$("#iFirstName").val(chonmot(ho));
    	$("#imembernamelive").val(chonmot(tenen) + chonmot(noi) + chonmot(tenen) + chonmot(nam));
    	chonop("iBirthDay");
    	chonop("iBirthMonth");
    	chonop("iGender");
    	$("#iSMSCountry option[value='VN'], iCountry option[value='VN']").prop("selected", true);
    	$("#iZipCode").val(70000);
    	$("#iPhone").val(chonmot(dauso) + new Date().getTime().toString().substring(0, 7));
    	$("#iAltEmail").val(mail);
    	for (var i = 0; i < string_length; i++)
    		if (0 == Math.floor(2 * Math.random()) && 3 > numCount || 5 <= charCount) {
    			var rnum = Math.floor(10 * Math.random());
    			randomstring += rnum;
    			numCount += 1
    		} else rnum = Math.floor(Math.random() * chars.length), randomstring += chars.substring(rnum, rnum + 1), charCount += 1;
    	$("#iPwd, #iRetypePwd").val(function () {
    		return "" == password ? randomstring : password
    	});
    	$("#genlivemail").val($("#imembernamelive").val() + "@" + $("#idomain option:selected").val() + " " + $("#iPwd").val());
    	var saochep = '<object id="copymail" width="60" height="32"><param name="movie" value="http://www.lettersmarket.com/uploads/lettersmarket/lmcbutton/lmcbutton.swf" /><param name="FlashVars" value="txt=' + $("#genlivemail").val() + '" /><embed src="http://www.lettersmarket.com/uploads/lettersmarket/lmcbutton/lmcbutton.swf" flashvars="txt=' + $("#genlivemail").val() + '" width="60" height="32"></object>';
    	if ($("#copymail").length) {
    		$("#copymail").replaceWith(saochep)
    	} else {
    		$("#genlivemail").after(saochep)
    	}
        $("#c_base").scrollTop(3000);
    }
    
    newemail();
    
    $("#gennewmail").click(function(){
        randomstring = "";
		charCount = 0;
		numCount = 0;
        newemail();
    });
    
})(jQuery);