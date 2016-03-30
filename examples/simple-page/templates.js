module.exports = function() {
  // 1. Генерируем костяк HTML-страницы:
  // — доктайп
  // — html, head, meta, title, body
  block('page')(
    tag()('section'),

    wrap()(function() {
      var ctx = this.ctx;
      return [
        '<!DOCTYPE html>',
        {
          block: 'page',
          elem: 'html',
          content: [
            {
              elem: 'head',
              content: [
                { elem: 'meta-utf' },
                {
                  elem: 'title',
                  name: ctx.title
                }
              ]
            },
            {
              elem: 'body',
              content: ctx
            }
          ]
        }
      ];
    }),

    elem('html')(
      bem()(false),
      tag()('html'),
      attrs()({ lang: 'en-US' })
    ),

    elem('head')(
      bem()(false),
      tag()('head')
    ),

    elem('meta-utf')(
      tag()('meta'),
      bem()(false),
      attrs()({ charset: 'utf-8' })
    ),

    elem('title')(
      tag()('title'),
      bem()(false),
      content()(function() {
        var name = this.ctx.name;
        return [
          name.first,
          name.last,
          'profile'
        ].join(' ');
      })
    ),

    elem('body')(
      bem()(false),
      tag()('body'),
      cls()('vcard'),
      attrs()({
        itemscope: true,
        itemtype: 'http://schema.org/Person'
      })
    )
  );


  // 2. Генерируем блок пользователя
  // — имя
  // — username (необязательное поле)
  // — должность (необязательное поле)
  block('user')(
    tag()('h1'),
    content()(function() {
      var name = this.ctx.name;
      return [
        name.first,
        name.last
      ].join(' ');
    }),

    match(function() {
      return this.ctx.username;
    })
    .content()(function() {
      return [
        applyNext(),
        'aka',
        this.ctx.username
      ].join(' ');
    }),

    match(function() {
      return this.ctx.position;
    })
    .content()(function() {
      return [
        applyNext(),
        this.ctx.position
      ].join(', ');
    })
  );


  // 3. Генерируем аватар пользователя
  block('avatar').replace()(function() {
    var avatar = this.ctx.avatar;
    return [
      {
        block: 'link',
        url: avatar.big.url,
        content: {
          block: 'image',
          url: this.ctx.avatar.small.url
        }
      },
      {
        block: 'para',
        content: 'Photo by ' + avatar.small.author
      }
    ];
  });

  block('image')(
    tag()('img'),
    attrs()(function() {
      return {
        height: '200',
        src: this.ctx.url
      };
    })
  );


  // 4. Генерируем ссылки на разные профили пользователя
  // — имя сервиса (необязательное поле)
  // — ссылка (тоже необязательное поле)
  block('links')(
    tag()('ul'),
    elem('item')(
      tag()('li'),
      content()(function() {
        return {
          block: 'link',
          url: this.ctx.url,
          content: applyNext()
        };
      })
    )
  );

  block('link')(
    tag()('span'),
    // Чтобы вывести ссылку для начала проверяем, что у данных есть поле url.
    // Иначе это не ссылка, а просто span как указано выше.
    match(function() { return this.ctx.url; })(
      tag()('a'),
      attrs()(function() {
        return {
          href: this.ctx.url,
          target: '_blank',
          rel: 'me'
        };
      }),

      // Если в данных нет названия сервиса, то пробуем его нарисовать из ссылки
      match(function() {
        return !this.ctx.content;
      }).content()(function() {
        return this.ctx.url.replace(/^https?:\/\//, '');
      })
    )
  );
};
