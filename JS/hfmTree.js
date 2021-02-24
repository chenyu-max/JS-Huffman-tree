function HfmTree(value, weight) {
    this.value = value;
    this.weight = weight;
    this.charCode = '';
    this.left = null;
    this.right = null;
    this.tag = 0; // 用于判断这个节点是否被标记过
}

// 初始化生成 哈夫曼树
function createHfmTree(obj) {
    var target = [];
    var n = obj.length;
    for (var i = 0; i < 2 * n - 1; i++) {
        target[i] = new HfmTree('');
    }
    for (var i = 0; i < n; i++) {
        target[i] = obj[i];
    }
    var i = 0;
    // 合并n-1次
    while (i < n - 1) {
        // leftIndex 和 rightIndex 是 每次循环后 找出的 最小权值 数组元素的下标
        var leftIndex = -1,
            rightIndex = -1;
        // minData1 和 minData1 是 每次循环后 找出的 最小的两个权值
        var minData1 = 9999999999999,
            minData2 = 9999999999999;

        for (j = 0; j < n + i; j++) {
            if (target[j].weight < minData1 && target[j].tag == 0) {
                minData2 = minData1;
                rightIndex = leftIndex;
                minData1 = target[j].weight;
                leftIndex = j;
            } else if (target[j].weight < minData2 && target[j].tag == 0) {
                minData2 = target[j].weight;
                rightIndex = j;
            }
        }

        // 每次循环之后 都找出了 两个 权值 最小的项，之后建立节点的关系
        target[n + i].weight = minData1 + minData2;
        target[n + i].left = target[leftIndex];
        target[n + i].right = target[rightIndex];

        // 标记最小节点
        target[leftIndex].tag = 1;

        target[rightIndex].tag = 1;
        i++;
    }

    buildRelationship(target[target.length - 1], '', 0);

    return target.reverse();
}

// 递归方式建立树的关系
function buildRelationship(node, charCode, level) {
    node.charCode = charCode;
    node.level = level;
    if (!node.left && !node.right) {
        return;
    }
    if (node.left) {
        buildRelationship(node.left, charCode + '0', level + 1);
    }
    if (node.right) {
        buildRelationship(node.right, charCode + '1', level + 1);
    }
}

// 递归方式获取树的高度
function getDeepOfTree(root) {
    if (!root) {
        return 0
    }
    let left = getDeepOfTree(root.left)
    let right = getDeepOfTree(root.right)
    return (left > right) ? left + 1 : right + 1
}

// 哈夫曼编码操作 获取 编码后的答案
function hfmCoding(str, tree) {
    var answer = '';
    var len = str.length;
    var treeLen = tree.length;
    console.log(tree, treeLen);
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < treeLen; j++) {
            if (str[i] == tree[j].value) {
                answer += tree[j].charCode;
            }
        }
    }
    return answer;
}

// 哈夫曼译码操作 获取 译码后的答案
function hfmDecoding(str, tree) {
    var answer = '';
    var treeLen = tree.length;
    var pos = 0; // 定义截取多少个
    var i = 0;
    while (i < str.length) {
        pos++;
        for (var j = 0; j < treeLen; j++) {
            if (tree[j].charCode == str.substring(i, pos) && (!tree[j].left && !tree[j].right)) {
                answer += tree[j].value;
                str = str.substring(pos);
                pos = 0;
                i = i + pos;
                break;
            }
        }
    }
    return answer;
}