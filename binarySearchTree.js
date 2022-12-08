const Node = (data, left = null, right = null) => {
    return {
        data,
        left,
        right
    }
}

const Tree = () => {
    return {
        root: null,
        sortArray(arr) {
            return [...new Set(arr)].sort((a, b) => a - b)
        },
        buildTree(arr) {
            let sortArr = this.sortArray(arr)
            if (sortArr.length == 0) return null
            let mid = Math.floor((sortArr.length)/2)
            this.root = Node(sortArr[mid],
                this.buildTree(sortArr.slice(0, mid)),
                this.buildTree(sortArr.slice(mid + 1)))
            return this.root
        },
        insert(value, root = this.root) {
            if (root == null) {
                root = Node(value)
                return root
            }
            if (value < root.data) root.left = this.insert(value, root.left)
            else if (value > root.data) root.right = this.insert(value, root.right)
            return root
        },
        delete(value, root = this.root) {
            if (root === null) return root
            else if (value < root.data) root.left = this.delete(value, root.left)
            else if (value > root.data) root.right = this.delete(value, root.right)
            else {
                if (!root.left && !root.right) return null
                else if (root.left && !root.right) return root.left
                else if (root.right && !root.left) return root.right
                else {
                    root.data = this.minValue(root.right)
                    root.right = this.delete(root.data, root.right)
                }
            }
            return root
        },
        find(value, node = this.root) {
            if (node == null || node.data == value) return node
            return (node.data < value)
            ? this.find(value, node.right)
            : this.find(value, node.left)
        },
        minValue(root) {
            let minv = root.data
            while (root.left != null) {
                minv = root.left.data
                root = root.left
            }
            return minv
        },
        levelOrder(cb) {
            let queue = [this.root]
            let results = []
            while (queue.length != 0) {
                let tempNode = queue.shift()
                if (cb) results.push(cb(tempNode))
                else results.push(tempNode.data)
                
                if (tempNode.left != null) {
                    queue.push(tempNode.left)
                }
                if (tempNode.right != null) {
                    queue.push(tempNode.right)
                }
            }
            return results
        }, 
    // An array is also generate when callback exist. Just to see clearly in console
        inorder(cb, node = this.root, results = []) {
            if (!node) return null
            this.inorder(cb, node.left, results)
            if (cb) results.push(cb(node))
            else results.push(node.data)
            this.inorder(cb, node.right, results)
            return results
        },
    // An array is also generate when callback exist. Just to see clearly in console
        preorder(cb, node = this.root, results = []) {
            if (!node) return null
            if (cb) results.push(cb(node))
            else results.push(node.data)
            this.preorder(cb, node.left, results)
            this.preorder(cb, node.right, results)
            return results
        },
    // An array is also generate when callback exist. Just to see clearly in console
        postorder(cb, node = this.root, results = []) {
            if (!node) return null
            this.postorder(cb, node.left, results)
            this.postorder(cb, node.right, results)
            if (cb) results.push(cb(node))
            else results.push(node.data)
            return results
        },
        height(node) {
            if (!node) return -1
            const leftHeight = this.height(node.left)
            const rightHeight = this.height(node.right)
            return Math.max(leftHeight, rightHeight) + 1 
        },
        depth(value, root = this.root, level = 0) {
            if (root === null) return null
            if (value === root.data) return level
            return (value < root.data)
            ? this.depth(value, root.left, level + 1)
            : this.depth(value, root.right, level + 1)
        },
        isBalanced(node = this.root) {
            if (!node) return true
            return (Math.abs(this.height(node.left) - this.height(node.right)) < 2) 
        },
        reBalance() {
            return this.buildTree(this.inorder())
        },
        prettyPrint(node = this.root, prefix = '', isLeft = true) {
            if (node.right !== null) {
              this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            if (node.left !== null) {
              this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
        }
    }
}

const fillArr = (n) => {
    let arr = []
    for (let i = 0; i < n; i++){
        arr[i] = (Math.floor(Math.random()*500))
    }
    return arr
}

const list = Tree()
list.buildTree(fillArr(10))
list.prettyPrint()
console.log(list.isBalanced())
console.log(list.levelOrder())
console.log(list.inorder())
console.log(list.preorder())
console.log(list.postorder())
list.insert(125)
list.insert(150)
list.insert(175)
list.prettyPrint()
console.log(list.isBalanced())
list.reBalance()
list.prettyPrint()
console.log(list.isBalanced())
console.log(list.levelOrder())
console.log(list.inorder())
console.log(list.preorder())
console.log(list.postorder())