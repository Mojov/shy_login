// url = "http://ql.sylu.edu.cn/demo/public/auth/login?";
// window.onload = initPage;
// //页面一开始就会加载的函数
// function initPage() {

// }
//检测浏览器是否支持创建请求
function createRequest() {
    try {
        request = new XMLHttpRequest(); //对于非Microsoft浏览器
    } catch (tryMS) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP"); //对于internet Explorer支持者
        } catch (otherMS) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP"); //对于internet Explorer支持者
            } catch (failed) {
                request = null;
            }
        }
    }
    return request;
}

function login() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    if (username.value == "") {

        alert("请输入用户名");

    } else if (password.value == "") {

        alert("请输入密码");

    } else if (username.value !== "" && password.value !== "") {

        getDetails();
    } else {
        alert("输入用户名或密码错误");
    }
}

function getDetails() {
    var request = createRequest();
    if (request == null) {
        alert("登录请求失败！无法登陆！");
        return;
    } else {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var data = {"userName" : username,
                    "password" : password, 
              }
        request.open("POST", "http://39.107.127.159:8081", true);
        data=JSON.stringify(data);            
        request.setRequestHeader("Content-type","application/json");
        request.send(data);
        request.onreadystatechange = displayDetails;

        // var Obj = {
        //     userName :"123456",
        //     password :"123456"
        // }; //创建一个对象
        // request.open("POST", "http://39.107.127.159:8081", true);

        // request.setRequestHeader("Content-type", "multipart/form-data");

        // request.send(JSON.stringify(Obj));// 要发送的参数，要转化为json字符串发送
    }
    // var url = 'http://39.107.127.159:8081?' + "userName=" + escape(document.getElementById("username").value) + "&password=" + escape(hex_md5(document.getElementById("password").value));
    // console.log(url);
    // request.onreadystatechange = displayDetails;
    // request.open("GET", url, true);
    // request.send();


    // xmlhttp.setRequestHeader("token","header-token-value"); // 可以定义请求头带给后端
    

}

function evil(fn) {
    var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}

function displayDetails() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            var check = request.responseText;
            console.log(check);
            console.log(check.loginStatus);
            alert("OK");
            // var user = eval('(' + request.responseText + ')');
            if (check == "ok") {

                //     var username=document.getElementById("username").value;
                //     console.log(username);
                //    var url_fistpage = "firstPage.html?obj="+username;
                //    url_fistpage=encodeURI(url_fistpage);
                //    window.open(url_fistpage,"_self");

            } else if (request.status == 500) {

                alert("用户名或密码错误");
            }
        }
    }
}