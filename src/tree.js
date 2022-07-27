// 用于测试的树形数据
const treeData = [
  {
    id: '1',
    name: '测试1',
    pId: '0',
    children: [
      {
        id: '11',
        name: '测试11',
        pId: '1',
        children: [
          {
            id: '111',
            name: '测试111',
            pId: '11',
            children: [
              {
                id: '1111',
                name: '测试1111',
                pId: '111',
              },
              {
                id: '1112',
                name: '测试1112',
                pId: '111',
              }
            ]
          },
          {
            id: '112',
            name: '测试112',
            pId: '11',
            children: [
              {
                id: '1121',
                name: '测试1121',
                pId: '112',
              }
            ]
          },
          {
            id: '113',
            name: '测试113',
            pId: '11',
          },
        ]
      },
      {
        id: '12',
        name: '测试12',
        pId: '1',
        children: [
          {
            id: '121',
            name: '测试121',
            pId: '12',
          }
        ]
      },
      {
        id: '13',
        name: '测试13',
        pId: '1'
      },
      {
        id: '14',
        name: '测试14',
        pId: '1'
      }
    ]
  },
  {
    id: '2',
    name: '测试2',
    pId: '0',
    children: [
      {
        id: '21',
        name: '测试21',
        pId: '2',
        children: [
          {
            id: '211',
            name: '测试211',
            pId: '21',
          },
          {
            id: '212',
            name: '测试212',
            pId: '21',
          }
        ]
      },
      {
        id: '22',
        name: '测试22',
        pId: '2'
      },
    ]
  }
]
// 1.递归查找当前节点
function findRecursion (data, key, callback) {
  data.forEach((item, index, arr) => {
    if (item.id === key) {
      return callback(item, index, arr)
    }
    if (item.children) {
      return findRecursion(item.children, key, callback)
    }
  })
}
// 查找 测试1112(1112)
findRecursion(treeData, '1112', (item, index, arr) => {
  console.log('1. 递归查找当前节点:', item, index, arr)
})
// 2.递归获取当前节点及以下的所有节点id
function getChildId (data, idArr) {
  data.forEach(item => {
    if (item.id) {
      idArr.push(item.id)
    }
    if (item.children) {
      getChildId(item.children, idArr)
    }
  })
  return idArr
}
// 获取 treeData此树以下的所有节点id
const idArr = getChildId(treeData, [])
console.log('2. 获取当前节点及以下的所有节点id', idArr)

// 3. 递归判断所有后代节点中有无此节点中的一个
function judgeChildrenHad (data, keys) {
  let mark = false
  const fn = (data, keys) => {
    for (let i = 0; i < data.length; i++) {
      if (keys.includes(data[i].id)) {
        mark = true
      } else if (data[i].children?.length) {
        fn(data[i].children, keys)
      }
    }
  }
  fn(data, keys)
  return mark
}
// 判断 treeData后代节点中有无 测试1112(1112)节点
const mark1 = judgeChildrenHad(treeData, ['1112'])
console.log('3. mark1', mark1)
// 判断 treeData后代节点中有无 测试1121(1121)节点
const mark2 = judgeChildrenHad(treeData, ['1121'])
console.log('3. mark2', mark2)
// 判断 treeData后代节点中有无 测试888(888)节点
const mark3 = judgeChildrenHad(treeData, ['888'])
console.log('3. mark3', mark3)

// 4. 递归树形数据扁平化
function treeToFlat (data) {
  const result = []
  data.forEach(item => {
    const obj = {
      name: item.name,
      id: item.id,
      pId: item.pId
    }
    result.push(obj)
    if (item.children?.length) {
      // console.log('------', item.name, treeToFlat(item.children, item.id))
      result.push(...treeToFlat(item.children, item.id))
    }
  })
  return result
}
const res1 = treeToFlat(treeData)
console.log('4. 树形数据扁平化', res1)

// 5. 扁平化数据转树形数据结构
function flatToTree (data) {
  const result = []
  const itemMap = {}
  for (const item of data) {
    const id = item.id
    const pId = item.pId
    
    if (itemMap[id]) {
      itemMap[id] = {
        ...itemMap[id],
        ...item
      }
    } else {
      itemMap[id] = { ...item }
    }

    const treeItem = itemMap[id]
    
    if (!pId || pId === '0') {
      result.push(treeItem)
    } else {
      if (!itemMap[pId]) {
        itemMap[pId] = {
          children: []
        }
      }
      if (!itemMap[pId].children) {
        itemMap[pId].children = []
      }
      itemMap[pId].children.push(treeItem)
    }
  }
  return result
}
const r = JSON.parse(JSON.stringify(res1))
r.unshift({
  id: '999',
  name: 'yyyyy',
  pId: '1'
})
const res2 = flatToTree(r)
console.log('5. 扁平化数据转树形数据结构', res2)

