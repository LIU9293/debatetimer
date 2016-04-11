function boot(){
    var proname = document.getElementById('pro-name').value;
    var conname = document.getElementById('con-name').value;
    var protitle = document.getElementById('pro-title').value;
    var contitle = document.getElementById('con-title').value;
    var round = document.getElementById('round-name').value;
    console.log(proname,conname,protitle,contitle);
    document.getElementById('boots').style.display = "none";
    document.getElementById('main').style.display = "block";
    
    var pro_pic_src = "include/school/" + proname + ".png";
    var con_pic_src = "include/school/" + conname + ".png";
    
    var pro_school_name = school[proname];
    var con_school_name = school[conname];
    
    document.getElementById('pic-pro').src = pro_pic_src;
    document.getElementById('pic-con').src = con_pic_src;
    document.getElementById('name-pro').innerHTML = pro_school_name;
    document.getElementById('name-con').innerHTML = con_school_name;
    document.getElementById('title-pro').innerHTML = protitle;
    document.getElementById('title-con').innerHTML = contitle;
    document.getElementById('round').innerHTML = round;
    
}

var school = {
    "aoke":"澳门科技大学",
    "bnu":"北京师范大学",
    "dalian":"大连理工大学",
    "edinburg":"爱丁堡大学",
    "hku":"香港大学",
    "huazhong":"华中科技大学",
    "nash":"莫纳什大学",
    "nau":"南京审计大学",
    "nnu":"南京师范大学",
    "nus":"新加坡国立大学",
    "shangjiao":"上海交通大学",
    "shixin":"世新大学",
    "taylor":"泰莱大学",
    "tianjin":"天津大学",
    "xian":"西安电子科技大学",
    "zhongchuan":"中国传媒大学"
}