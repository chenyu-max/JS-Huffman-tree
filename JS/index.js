var hfmTreeObj = {
    hfmTreeArr: []
};

// 绑定事件函数
function bindEvent() {

    // 操作 部分的 dom结构
    var openHfmTreeBtn = document.getElementById('open-hfmTree');
    var createNewHfmTreeBtn = document.getElementById('create-new-hfmTree');
    var jsonSubmitBtn = document.getElementById('json-submit');

    // 生成新哈夫曼树 部分的 dom结构
    var inputMessageWrapper = document.getElementsByClassName('input-message')[0];
    var createTableBtn = document.getElementById('create-table');
    var create_hfmTreeBtn = document.getElementById('create-hfmTree');
    var saveHfmTreeBtn = document.getElementById('save-hfmTree');

    var canvas = document.getElementsByClassName('canvas-wrapper')[0];

    // 选择 coding or decoding
    var codingBtn = document.getElementById('coding');
    var decodingBtn = document.getElementById('decoding');

    // 哈夫曼编码 区域的 dom结构
    var hfmCodingWrapper = document.getElementsByClassName('hfm-coding')[0];
    var codingSubmitBtn = document.getElementById('coding-submit');
    var saveCodingBtn = document.getElementById('save-coding');
    // 哈夫曼译码 区域的 dom结构
    var hfmDecodingWrapper = document.getElementsByClassName('hfm-decoding')[0];
    var decodingSubmitBtn = document.getElementById('decoding-submit');
    var saveDecodingBtn = document.getElementById('save-decoding');


    var len = 0;
    var codingAnswer = null;
    var decodingAnswer = null;

    // 打开已有的哈夫曼树的操作
    openHfmTreeBtn.onclick = function() {
        var open_json = document.getElementById('open-json');
        var json_submit = document.getElementById('json-submit');
        this.style.display = 'none';
        createNewHfmTreeBtn.style.display = 'none';
        open_json.style.display = 'block';
        json_submit.style.display = 'block';
    }

    // 点击上传已有的哈夫曼编码树文件的操作
    jsonSubmitBtn.onclick = function() {
        var open_json = document.getElementById('open-json');
        var fileName = getFileName(open_json);
        // 获取文件的名字
        AJAX({
            method: 'GET',
            url: '../Data/hfmTree/' + fileName,
            isAsync: true,
            data: '',
            success: function(data) {
                hfmTreeObj = {
                    hfmTreeArr: []
                };
                hfmTreeObj = data;
                canvas.style.display = 'block';
                draw(hfmTreeObj.hfmTreeArr);
            }
        });
        this.parentNode.style.display = 'none';
        codingBtn.parentNode.style.display = 'block';
    }

    // 点击新创建一个 哈夫曼树操作
    createNewHfmTreeBtn.onclick = function() {
        inputMessageWrapper.style.display = 'block';
        this.parentNode.style.display = 'none';
    }

    // 生成 输入 哈夫曼编码字符的 表格
    createTableBtn.onclick = function() {
        var nodeNum = parseInt(document.getElementById('node-num').value);
        if (!nodeNum) {
            alert('请正确输入数字');
            return;
        } else {
            len = nodeNum;
        }
        var str1 = '<div>字符集</div>';
        var str2 = '<div>权重</div>';
        for (var i = 0; i < nodeNum; i++) {
            str1 += '<div><input type="text" class="char" data-id="char' + i + '"></div>';
            str2 += '<div><input type="text" class="weight" data-id="weight' + i + '"></div>';
        }

        var row1 = document.createElement('div');
        var row2 = document.createElement('div');
        row1.className = 'row';
        row2.className = 'row';

        row1.innerHTML = str1;
        row2.innerHTML = str2;

        var inputTable = document.getElementsByClassName('input-table')[0];
        inputTable.innerHTML = '';
        inputTable.appendChild(row1);
        inputTable.appendChild(row2);

        create_hfmTreeBtn.style.display = 'inline-block';
    }

    // 生成哈夫曼树按钮
    create_hfmTreeBtn.onclick = function() {
        hfmTreeObj = {
            hfmTreeArr: []
        };
        if (checkTable(len)) {
            saveHfmTreeBtn.style.display = 'inline-block';
            var input_table = document.getElementsByClassName('input-table')[0];
            var row1 = input_table.getElementsByClassName('char');
            var row2 = input_table.getElementsByClassName('weight');


            hfmTreeObj = {
                hfmTreeArr: []
            };
            for (var i = 0; i < len; i++) {
                hfmTreeObj.hfmTreeArr.push(new HfmTree(row1[i].value, parseInt(row2[i].value)));
            }
            hfmTreeObj.hfmTreeArr = createHfmTree(hfmTreeObj.hfmTreeArr);
            canvas.style.display = 'block';
            draw(hfmTreeObj.hfmTreeArr);
        }
    }

    // 保存哈夫曼树编码按钮
    saveHfmTreeBtn.onclick = function() {
        var fileName = prompt('请输入文件名，不得与Data/hfmTree 下的文件重名。（格式 ： “hfmTree1”）');
        save(hfmTreeObj, fileName + '.json');
        alert('下载完成后，请将json文件移动到 Data/hfmTree 文件夹下');
        this.parentNode.parentNode.style.display = 'none';
        codingBtn.parentNode.style.display = 'block';

    }

    // 显示 coding 编码 操作 部分 按钮
    codingBtn.onclick = function() {
        hfmCodingWrapper.style.display = 'block';
        this.parentNode.style.display = 'none';
    }

    // 显示 decoding 编码 操作 部分 按钮
    decodingBtn.onclick = function() {
        hfmDecodingWrapper.style.display = 'block';
        this.parentNode.style.display = 'none';
    }

    // 编码按钮 提交操作
    codingSubmitBtn.onclick = function() {
        var codingJson = document.getElementById('coding-json');
        var fileName = getFileName(codingJson);
        var str = '';
        AJAX({
            method: "GET",
            url: '../Data/ToBeTran/' + fileName,
            isAsync: true,
            data: '',
            success: function(data) {
                str = data['string'];
                // console.log(hfmCoding(str, hfmTreeObj.hfmTreeArr));
                codingAnswer = hfmCoding(str, hfmTreeObj.hfmTreeArr);
                codingSubmitBtn.nextElementSibling.innerHTML = str + '<br> 编码结果为：<br>' + codingAnswer;
                saveCodingBtn.style.display = 'inline-block';
            }
        });
    }

    // 保存 编码 按钮
    saveCodingBtn.onclick = function() {
        if (codingAnswer) {
            var fileName = prompt('请输入文件名，不得与Data/CodeFile 下的文件重名。（格式 ： “CodeFile1”）');
            save({ 'string': codingAnswer }, fileName + '.json');
            alert('下载完成后，请将json文件移动到 Data/CodeFile 文件夹下');
        }
    }

    // 译码按钮 提交操作
    decodingSubmitBtn.onclick = function() {
        var decodingJson = document.getElementById('decoding-json');
        var fileName = getFileName(decodingJson);
        var str = '';
        AJAX({
            method: "GET",
            url: '../Data/CodeFile/' + fileName,
            isAsync: true,
            data: '',
            success: function(data) {
                str = data['string'];
                // console.log(hfmCoding(str, hfmTreeObj.hfmTreeArr));
                decodingAnswer = hfmDecoding(str, hfmTreeObj.hfmTreeArr);
                decodingSubmitBtn.nextElementSibling.innerHTML = str + '<br> 译码结果为：<br>' + decodingAnswer;
                saveDecodingBtn.style.display = 'inline-block';
            }
        });
    }

    // 保存 译码结果
    saveDecodingBtn.onclick = function() {
        if (decodingAnswer) {
            var fileName = prompt('请输入文件名，不得与Data/Textfile 下的文件重名。（格式 ： “Textfile1”）');
            save({ 'string': decodingAnswer }, fileName + '.json');
            alert('下载完成后，请将json文件移动到 Data/Textfile 文件夹下');
        }
    }

}

// 判断表单输入的数据是否有误
function checkTable(len) {
    var input_table = document.getElementsByClassName('input-table')[0];
    var row1 = input_table.getElementsByClassName('char');
    var row2 = input_table.getElementsByClassName('weight');
    for (var i = 0; i < len; i++) {
        if (!row1[i].value.length || !row2[i].value.length) {
            alert("请完整的填写表格");
            return false;
        } else if (row1[i].value.length != 1) {
            alert("输入的字符集只能是单个字符");
            return false;
        } else if (isNaN(row2[i].value)) {
            alert("权重只能填写数字");
            return false;
        }
    }
    return true;
}
bindEvent();