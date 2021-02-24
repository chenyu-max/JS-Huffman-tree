// 保存 文件 数据
function save(data, filename) {
    console.log(data);
    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4);
    }
    console.log(data);
    var blob = new Blob([data], {
        type: 'text/json'
    });
    var a = document.createElement('a');
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    a.click();
}