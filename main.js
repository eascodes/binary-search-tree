const NodeFactory = (data) => {
    data = data;
    left = right = null;
    return { data, left, right }
}

const TreeFactory = (arr) => {
    let sortedArr = arr.sort(compareNumbers);
    let reducedArr = removeDups(sortedArr);
    root = buildTree(reducedArr, 0, reducedArr.length - 1);

    const insertNode = (root, value) => {
        let node = NodeFactory(value);
        if (!root) {
            root = node;
            return;
        }
        let prev = null;
        let current = root;
        while (current) {
            if (current.data > value) {
                prev = current;
                current = current.left;
            } else if (current.data < value) {
                prev = current;
                current = current.right;
            }
        }
        if (prev.data > value) {
            prev.left = node;
        } else {
            prev.right = node;
        }
    }

    const deleteNode = (root, value) => {
        if (root == null) return root;

        if (value < root.data) {
            root.left = deleteNode(root.left, value);
        } else if (value > root.data) {
            root.right = deleteNode(root.right, value);
        } else {
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }

            root.data = minValue(root.right);
            root.right = deleteNode(root.right, root.data);
        }
        return root;
    }

    function minValue(root) {
        let minVal = root.data;
        while (root.left != null) {
            minVal = root.left.data;
            root = root.left;
        }
        return minVal;
    }

    const find = (root, value) => {
        if (root == null) return root;

        if (value < root.data) {
            return find(root.left, value);
        } else if (value > root.data) {
            return find(root.right, value);
        } else {
            return root;
        }
    }

    const levelOrder = ( root, func ) => {
        
        let result = [];
        let q = [root];
        let node;

        while (q.length >= 1) {
            for (let i=0; i < q.length; i++) {
                node = q.shift();
                if (node) {
                    if (func) {
                        func(node);
                    } else {
                        result.push(node.data);
                    }
                    q.push(node.left);
                    q.push(node.right);
                }
            }
        }
        if (!func) {
            return result;
        }
    }

    return { root, insertNode, deleteNode, find, levelOrder }
}

function removeDups(arr) {
    let seen = {};
    let result = [];
    let j = 0;
    for (let i=0; i < arr.length; i++) {
        let item = arr[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            result[j++] = item;
        }
    }
    return result;
}

function compareNumbers(a, b) {
    return a - b;
  }

function buildTree(arr, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let node = NodeFactory(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  let test = [1,1,9,2,3,8,8,4,5,6,6,7];
  test = TreeFactory(test);