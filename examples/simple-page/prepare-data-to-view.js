// Это обычная JS-функция, которая преобразует входные данные в BEMJSON.
// Здесь мы формируем входные данные, пригодные для шаблонизации:
// фактически мы описываем структуру страницы с точки зрения того, как она будет
// разбита на блоки и добавляем БЭМ cущности, на которые будут накладываться
// шаблоны BEMHTML.
module.exports = function prepareData(data) {
  return {
    block: 'page',
    title: data.name,
    content: [
      {
        block: 'user',
        name: data.name,
        username: data.username,
        position: data.position,
      },
      {
        block: 'avatar',
        avatar: data.avatar
      },
      {
        block: 'links',
        content: data.profiles.map(function(link) {
          return {
            elem: 'item',
            content: link.service,
            url: link.url
          };
        })
      }
    ]
  };
};
