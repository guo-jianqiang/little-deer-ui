/** @format */

/**
 * @description 判空
 * @param obj
 */
export const isEmpty = (obj: any) => {
  let isEmpty = false
  if (obj === undefined || obj === null || obj === '') {
    isEmpty = true
  } else if (Array.isArray(obj) && obj.length === 0) {
    isEmpty = true
  } else if (obj.constructor === Object && Object.keys(obj).length === 0) {
    isEmpty = true
  }
  return isEmpty
}

// 广度优先
export function treeForeach(tree: Array<any>, func: (node: any) => void) {
  let node,
    list = [...tree]
  while ((node = list.shift())) {
    func(node)
    node.routes && list.push(...node.routes)
  }
}

/**
 * @author gjq
 * @description 获取当前节点路径
 * @param nodes
 * @param handler
 * @param key
 */

export function getTreePath(nodes: Array<any>, handler: (node: any) => {}, key = 'children') {
  nodes = !Array.isArray(nodes) ? [nodes] : [...nodes]
  let path: Array<any> = []
  let getPaths = (tree: Array<any>): any => {
    for (let i = 0; i < tree.length; i++) {
      const item = tree[i]
      path.push(item)
      if (handler(item)) {
        return path
      }
      if (item[key] && item[key].length) {
        const childrenPath = getPaths(item[key])
        if (childrenPath.length) return childrenPath
      }
      path.pop()
    }
    return []
  }
  return getPaths(nodes)
}

/**
 * 获取第一个非空路由
 * @param routes
 * @returns {*}
 */
export const getFirstRoute = (routes: Array<any>): any => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    if (!route.routes) {
      return route
    }
    if (route.routes && route.routes.length) {
      return getFirstRoute(route.routes)
    }
  }
}

/**
 * 建立一个可存取到该file的url
 * @param file
 */
export const getObjectURL = (file: File) => {
  let url = null
  if (window.URL !== undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

export function getPosition(el: any) {
  let xPosition = 0
  let yPosition = 0

  while (el) {
    if (el.tagName == 'BODY') {
      // deal with browser quirks with body/window/document and page scroll
      let xScrollPos = el.scrollLeft || document.documentElement.scrollLeft
      let yScrollPos = el.scrollTop || document.documentElement.scrollTop

      xPosition += el.offsetLeft - xScrollPos + el.clientLeft
      yPosition += el.offsetTop - yScrollPos + el.clientTop
    } else {
      xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft
      yPosition += el.offsetTop - el.scrollTop + el.clientTop
    }

    el = el.offsetParent
  }
  return {
    x: xPosition,
    y: yPosition,
  }
}
