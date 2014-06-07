// ==UserScript==
// @name       VietEasy
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Simplify Vietnamese for beginners learning
// @match      http://*/*
// @grant       none
// @copyright  2013 Liam Hahne
// modified ArabEasy 
// ==/UserScript==
var dico = new Array (
["song","yet"],
["chuyen gia","expert"],
["đơn phương","unilat"],
["đưa ra","given"],
["lương tam","conscience"],
["ngon vien","spokesman"],
["thong qua","adopt"],
["trung ương","central"],
["cong bàng","fair"],
["kinh hoàng","horrible"],
["tang cường","strengthen"],
["yeu càu","request"],
["chia rẽ","divided"],
["do đãng","incomplete"],
["phe chuãn","ratify"],
["phe nõi dạy","rebels"],
["qua ãi","to the end"],
["quan nõi dạy","rebel"],
["tranh cãi","controversy"],
["cam két","commit"],
["cong bó","publish"],
["đa só","maj"],
["gay gát","severe"],
["nang cáp","upgrade"],
["quan sát","obsvrs "],
["tay súng","gunmen"],
["tuyen bó","state"],
["xem xét","inspect"],
["can thiẹp","intervn"],
["do bị","due to"],
["giao nọp","submit"],
["keu gọi","calling"],
["nang lực","capacity"],
["nhan vạt","person"],
["quan sự","milit"],
["rieng biẹt","separate"],
["thu được","obtained"],
["tranh luạn","debate"],
["trong nọi","within"],
["giành","win"],
["lời","words"],
["nhàm","to"],
["ròi","then"],
["đièu tra","inquiry"],
["đòng minh","ally"],
["hò sơ","doc"],
["nguòn tin","source"],
["thành vien","member"],
["người từng","who"],
["gòm cã","incl"],
["nhièu khã","likely"],
["ròi cũng","discrete"],
["trì hoãn","delay"],
["bàng chứng","proof"],
["tìm cách","seek"],
["tình báo","intell"],
["chờ sự","wait"],
["đièu kiẹn","condn"],
["đòng nghiẹp","colleague"],
["đòng thuạn","consensus"],
["hành đọng","act"],
["kỳ cựu","veteran"],
["thừa nhạn","confirm"],
["thường trực","permant"],
["trừng phạt","punish"],
["trữ","store"],
["bão an","security"],
["diẽn ra","take place"],
["lãn phe","faction"],
["tõ ra","show"],
["vũ trang","arm"],
["biẽu tình","demonstrate"],
["dãn lời","quoted"],
["nghĩ hè","vacation"],
["thũ lĩnh","leader"],
["bõ phiéu","vote"],
["cãnh báo","warn"],
["chũ chót","key"],
["giãi phóng","free"],
["phãn đói","protest"],
["phãn ứng","reaction"],
["phũ quyét","veto"],
["tõ chức","organise"],
["vũ khí","weapon"],
["đõi lại","exchange"],
["lãnh đạo","leader"],
["nõ lực","effort"],
["sữ dụng","used"],
["ũng họ","support"],
["thãm định","expertise"],
["tõng lượng","totl amt"],
["chiém","occupy"],
["chién","war"],
["nhóm","group"],
["đáng tin","credible"],
["khó khan","hard"],
["phóng vien","reporter"],
["quyét tam","determd"],
["rút lui","withdraw"],
["tán cong","attack"],
["kéo dài","extent"],
["tién hành","execute"],
["phát biẽu","express"],
["tái diẽn","recur"],
["báo cáo","report"],
["bóng tói","shadow"],
["chién đáu","combat"],
["chính thức","official"],
["lá phiéu","ballot"],
["sáng suót","lucid"],
["ước tính","estimate"],
["chién dịch","campaign"],
["chién lược","strategy"],
["chính họ","themselves"],
["đói diẹn","opposite"],
["đói lạp","opposn"],
["hóa học","chem"],
["huán luyẹn","train"],
["ké hoạch","plan"],
["khí đọc","pois gas"],
["nhán mạnh","stress"],
["quóc họi","congress"],
["rót cuọc","evtly"],
["sức mạnh","strength"],
["tác đọng","influence"],
["thát vọng","disappt"],
["tiép tục","continue"],
["trái ngược","contrad"],
["buọc","force"],
["mạt","secret"],
["tạm","temp"],
["họi đòng","council"],
["bọ đãng","desert"],
["bọ trưỡng","minister"],
["nghị sĩ","MP"],
["thuọc đãng","party"],
["đọng thái","dynamics"],
["dự kién","expected"],
["gợi ý","recommend"],
["hạn ché","ltd"],
["nọi chién","civil war"],
["lực lượng","forces"],
["rọng lớn","wide"],
["tạo ra","create"],
["bọ phạn","parts"],
["hoạt đọng","action"],
["nọi vụ","interior"]
    );
var to_arabeasy = new Array (
	["Ả", "Ã"],
	["ả", "ã"],
	["Ă", "A"],
	["ă", "a"],
    ["Â", "A"],
	["â", "a"],
	["Ằ", "À"],
	["ằ", "à"],	
	["Ầ", "À"],
	["ầ", "à"],	
    ["Ẳ", "Ã"],
	["ẳ", "ã"],
    ["Ẩ", "Ã"],
	["ẩ", "ã"],
    ["Ẵ", "Ã"],
	["ẵ", "ã"],
    ["Ẫ", "Ã"],
	["ẫ", "ã"],
    ["Ắ", "Á"],
	["ắ", "á"],
    ["Ấ", "Á"],
	["ấ", "á"],
    ["Ặ", "Ạ"],
	["ặ", "ạ"],
    ["Ậ", "Ạ"],
	["ậ", "ạ"],    
	["Ẻ", "Ẽ"],
	["ẻ", "ẽ"],
    ["Ê", "E"],
	["ê", "e"],
    ["Ề", "È"],
	["ề", "è"],
    ["Ể", "Ẽ"],
	["ể", "ẽ"],
    ["Ễ", "Ẽ"],
	["ễ", "ẽ"],
    ["Ế", "É"],
	["ế", "é"],
    ["Ệ", "Ẹ"],
	["ệ", "ẹ"],
	["Ỉ", "Ĩ"],
	["ỉ", "ĩ"],
	["Ỏ", "Õ"],
	["ỏ", "õ"],
    ["Ô", "O"],
	["ô", "o"],
    ["Ồ", "Ò"],
	["ồ", "ò"],
    ["Ổ", "Õ"],
	["ổ", "õ"],
    ["Ỗ", "Õ"],
	["ỗ", "õ"],
    ["Ố", "Ó"],
	["ố", "ó"],
    ["Ộ", "Ọ"],
	["ộ", "ọ"],
	["Ủ", "Ũ"],
	["ủ", "ũ"],
	["Ỷ", "Ỹ"],
	["ỷ", "ỹ"],
	["Ở", "Ỡ"],
	["ở", "ỡ"],
	["Ử", "Ữ"],
	["ử", "ữ"]
);
function addviet(justviet, viet, engword){
    return justviet.replace(new RegExp(viet, "ig"), function (match) { return match.replace(/ /,"") +"("+ engword +")";    });
}
                            
function arabeasy(str, kC) {
	//store the orignal and altered html strings
	var altered_s = str;	
	var orig_s = str;	
	if(orig_s && altered_s){

        for(var x in to_arabeasy)   
			altered_s = altered_s.replace(new RegExp(to_arabeasy[x][0], "gm"), to_arabeasy[x][1]);
        			
        if (kC == 65)    
            for(var x in dico)  altered_s= addviet(altered_s,dico[x][0],dico[x][1]);
    	
        return altered_s;
      
	}		
}

function LoopTextNodesA(node, kC)
    {
        if (node.nodeType == 3)
        {          
          node.data= arabeasy(node.data, kC);  // textnode
        }
        else if (node.hasChildNodes())
        {
                for (var i = 0;i < node.childNodes.length;i++)
                {
                        LoopTextNodesA(node.childNodes[i], kC);
                }
        }
    }
     
// listen for ALT-A and ALT-X 

document.addEventListener('keydown', function(event) {
	if(event.altKey && event.keyCode ==88) { 
        LoopTextNodesA (document, event.keyCode);       		
	}
	else if(event.altKey && event.keyCode ==65) { 
        LoopTextNodesA (document, event.keyCode);       		
	}
}, true);



