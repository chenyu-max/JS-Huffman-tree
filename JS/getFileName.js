// 读取文件时候 获取文件的文件名
function getFileName(dom) {
    var url = dom.value;
    if (!url) {
        alert("请正确上传文件");
        return;
    } else {
        url = url.split("\\");
        return url[url.length - 1];
    }
}