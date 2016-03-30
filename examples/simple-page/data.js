// Это обычные данные, которые вы можете получать из бекендов, баз данных,
// сторонних API или читать из файлов.
// Эти данные обычно находятся в виде удобном для хранения, но неудобном для
// отображения в HTML. Поэтому в prepare-data-to-view.js мы преобразуем их
// в удобный для шаблонизации вид.
module.exports = {
  name: {
    first: 'Slava',
    last: 'Oliyanchuk',
  },
  username: 'miripiruni',
  position: 'Front-End Web Developer',
  avatar: {
    small: {
      url: 'http://miripiruni.org/i/miripiruni_moscow_27-03-2011-250x375.jpg',
      author: 'Patrick H. Lauke',
      authorUrl: 'http://www.splintered.co.uk/about/'
    },
    big: {
      url: 'http://miripiruni.org/i/miripiruni_moscow_27-03-2011.jpg',
      author: 'Patrick H. Lauke',
      authorUrl: 'http://www.splintered.co.uk/about/'
    },
  },
  email: 'mail@miripiruni.org',
  profiles: [
    {
      service: 'Soundcloud',
      url: 'https://soundcloud.com/miripiruni'
    },
    {
      service: 'Bandcamp',
      url: 'https://miripiruni.bandcamp.com'
    },
    {
      service: 'Github',
      url: 'https://github.com/miripiruni'
    },
    {
      url: 'https://twitter.com/miripiruni'
    },
    {
      url: 'https://facebook.com/miripiruni'
    },
    { service: 'Wantr' }
  ]
};
