const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(1, 1)',
    'status|1': ['启用','未启用'],
    author: '@id',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    url: 'https://baidu.com'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
