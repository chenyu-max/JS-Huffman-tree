/**
*  @params {Object} options
            method  请求方式
            url     请求地址
            isAsync 是否异步
            data        请求参数（发送的数据）
            callback   拿到数据之后的回调函数
*/

function AJAX(options) {
    var method = options.method.toUpperCase();
    var url = options.url;
    var isAsync = options.isAsync;
    var data = options.data;
    var dataStr = '';
    var success = options.success || function() {};
    var xhr = null;


    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
        // 兼容性写法，兼容IE6 以下， 括号内的参数 是 固定参数
    } else {
        return alert('当前浏览器不支持XMLHTTPRequest');
    }

    // 判断传递过来的数据是否是对象类型的  如果是对象类型的转换成字符串  key=value&key1=value1
    if (typeof data === 'object') {
        for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
                dataStr += prop + '=' + data[prop] + '&';
            }
        }
    } else {
        dataStr = data.toString();
    }


    xhr.onreadystatechange = function() {
        // console.log(xhr.readyState)
        if (xhr.readyState === 4) {
            // xhr.status
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText))
            }
        }
    }

    // 将请求方式全部转换成大写
    var method = options.method.toUpperCase();
    // 判断请求方式为get类型   GET类型的特点：数据拼接在地址当中
    if (method === 'GET') {
        // 建立连接
        xhr.open(method, url + '?' + dataStr, isAsync);
        // 发送数据
        xhr.send();
    } else {
        // 请求方式为非get请求的   那么需要单独传递请求参数（数据） 就需要告诉对方你的数据编码方式（通过请求头设置） 
        xhr.open(method, url, isAsync);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(dataStr);
    }

}