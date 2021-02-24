function draw(hfmTreeArr) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var deep = getDeepOfTree(hfmTreeArr[0]);

    // 设置 方块的宽度
    var unit = 30;
    if (deep >= 8) {
        alert('因为树形结构过于庞大，无法在页面中展示。但是，您可以进行接下去的其他操作');
        return;
    }
    // 根据树的深度 设置 画板的高度
    canvas.setAttribute('height', deep * unit * 3);
    var width = (Math.pow(2, deep - 1) * 3) * unit;
    canvas.setAttribute('width', width);
    // 根节点的位置信息 
    var mid = width / 2;
    var rootX = (width - 30) / 2,
        rootY = unit;

    preOrderTraverse(hfmTreeArr[0], rootX, rootY, mid);

    // 前序遍历 画出二叉树
    function preOrderTraverse(root, x, y, mid) {
        // console.log(root, x, y, mid);
        drawRect(root.value, root.charCode, x, y); // 绘制节点
        if (root.left) {
            drawLeftLine(x, y + unit, mid / 2 - 30);
            preOrderTraverse(root.left, x - (mid - 30) / 2, y + 2 * unit, mid / 2);
        }
        if (root.right) {
            drawRightLine(x + unit, y + unit, mid / 2 - 30);
            preOrderTraverse(root.right, x + (mid - 30) / 2, y + 2 * unit, mid / 2);
        }
    }

    function drawRect(value, charCode, x, y) {
        // 画方块
        ctx.fillStyle = '#000';
        ctx.fillRect(x, y, unit, unit);

        // 填充字符
        ctx.font = "14px Arial";
        ctx.fillStyle = '#f00';
        ctx.fillText(value, x + unit / 3, y + unit * 5 / 7);

        // 填充charcode
        ctx.font = "14px Arial";
        ctx.fillStyle = '#00f';
        ctx.fillText(charCode, x + unit * 1.2, y + unit);
    }

    // 画出左边的连接线
    function drawLeftLine(x, y, distance) {
        ctx.moveTo(x, y);
        ctx.lineTo(x - distance, y + unit);
        ctx.stroke();
    }

    // 画出右边的连接线
    function drawRightLine(x, y, distance) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + distance, y + unit);
        ctx.stroke();
    }

}