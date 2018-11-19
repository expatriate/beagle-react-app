import * as types from '../actionTypes.js';

const appState = { 
  loaded: false,
  cart: {
    items: [],
    bills: []
  },
  detail_page: {
    itemId: 1
  },
  tags: [],
  on_place: {
    itemId: 1
  },
  list: {
    items: []
  },
  chat: {
    items: []
  },
  shop: {
    items: [{
      id: 4,
      name: 'Samsung U1',
      type: 'tv',
      cost: '69 990',
      rating: '4',
      image: 'https://img.mvideo.ru/Pdb/10018598b.jpg',
      descr: 'Samsung NU7670 обладает превосходным дизайном, который бросает вызов его цене. У него изящно тонкая матовая рамка цвета серебристого титана. Изогнутый экран воспринимается более широким, более глубоким, захватывая и впечатляя независимо от просматриваемого контента. В силу своей кривизны экрана он не так напрягает зрение, смотрите ли вы футбольный марафон или сериал целиком за один присест.Удобная подставка V-типа, также серебристого цвета, довольно устойчива на поверхности, но при перемещении телевизора наблюдаются определённые вертикальные покачивания. Подставка снабжена специальными канавками для прокладки и вывода кабелей невидимо для глаз зрителя. Есть альтернативный способ установки – монтаж на стену. Для этого предусмотрены крепления стандарта VESA типоразмера 400 х 400.',
      options: [{
          value: '3840х2160',
          type: 'res',
          name: 'Разрешение',
        }, {
          value: '1900 PQI',
          type: 'tech',
          name: 'Технология',
        },{
          value: '16:9',
          type: 'format',
          name: 'Формат экрана'
        }, {
          value: '55"(139.6 см)',
          type: 'diag',
          name: 'Диагональ экрана'
        }, {
          value: 'Dolby Digital Plus',
          type: 'sound',
          name: 'Звук'
        }],
      tags: ['Samsung UE55NU7670U', 'телевизоры', 'tv', 'телевизор', 'самсунг', 'тв', 'изогнутый экран', 'u1'],
      tips: ['Самая распространенная ошибка тех, кто хочет купить современный телевизор – концентрация на каких-то технических характеристиках и новомодных функциях без четкого понимания фундаментальных принципов.','Обычный ли это эфир с упором на новости и развлекательные телепередачи, или, в основном, предпочитаете спорт. Возможно, берете голубой экран для просмотра фильмов в отличном качестве или планируете использовать его как монитор для игр или работы с графикой? Конечно телевизор нужен для всего – но нужно понять, что для Вас важнее, и в чем можно пойти на компромисс','Насколько светлое у Вас помещение, какое время суток основное для просмотра домашнего экрана, любите ли смотреть ночью без света, при просмотре находится ли вся семья строго перед экраном или кто-то будет сидеть сбоку, будет ли телевизор находится на уровне глаз при просмотре или на какой-то высокой тумбе без возможности наклона.'],
    },{
      id: 5,
      name: 'Samsung U2',
      type: 'tv',
      cost: '37 990',
      rating: '5',
      image: 'https://img.mvideo.ru/Pdb/10018481b.jpg',
      descr: 'Жидкокристаллический экран диагональю 42.5 дюйма (108 см) имеет соотношение сторон 16:9, это классический вариант для ТВ такого размера. Разрешение дисплея 3840×2160 px (4K UHD, HDR). Частота обновления 100 Гц.В этой модели реализована светодиодная подсветка Edge LED, светодиоды установлены по бокам ЖК-матрицы. Этот вариант позволяет делать более тонкие телевизоры, но при этом возможны засветы по краям экрана.',
      options: [{
          value: '3840х2160',
          type: 'res',
          name: 'Разрешение',
        }, {
          value: '1300 PQI',
          type: 'tech',
          name: 'Технология',
        },{
          value: '16:9',
          type: 'format',
          name: 'Формат экрана'
        }, {
          value: '43"(109.2 см)',
          type: 'diag',
          name: 'Диагональ экрана'
        }, {
          value: 'Dolby Digital Plus',
          type: 'sound',
          name: 'Звук'
        }],
      tags: ['Samsung UE43NU7170U', 'телевизоры', 'tv', 'телевизор', 'самсунг', 'тв', 'u2'],
      tips: ['Самая распространенная ошибка тех, кто хочет купить современный телевизор – концентрация на каких-то технических характеристиках и новомодных функциях без четкого понимания фундаментальных принципов.','Обычный ли это эфир с упором на новости и развлекательные телепередачи, или, в основном, предпочитаете спорт. Возможно, берете голубой экран для просмотра фильмов в отличном качестве или планируете использовать его как монитор для игр или работы с графикой? Конечно телевизор нужен для всего – но нужно понять, что для Вас важнее, и в чем можно пойти на компромисс','Насколько светлое у Вас помещение, какое время суток основное для просмотра домашнего экрана, любите ли смотреть ночью без света, при просмотре находится ли вся семья строго перед экраном или кто-то будет сидеть сбоку, будет ли телевизор находится на уровне глаз при просмотре или на какой-то высокой тумбе без возможности наклона.'],
    },{
      id: 6,
      name: 'LG OLED',
      type: 'tv',
      cost: '114 990',
      rating: '2',
      image: 'https://img.mvideo.ru/Pdb/10019010b.jpg',
      descr: 'Глубокий черный цвет обеспечивает безграничную контрастность изображения, расширяя возможности цветопередачи. Получите незабываемое кинематографическое изображение благодаря потрясающему уровню контраста, с которым все цвета становятся насыщенными а детали и текстуры изображений раскрываются.',
      options: [{
          value: '3840х2160',
          type: 'res',
          name: 'Разрешение',
        }, {
          value: 'OLED',
          type: 'tech',
          name: 'Технология',
        },{
          value: '16:9',
          type: 'format',
          name: 'Формат экрана'
        }, {
          value: '55"(139.6 см)',
          type: 'diag',
          name: 'Диагональ экрана'
        }, {
          value: 'OLED Surround',
          type: 'sound',
          name: 'Звук'
        }],
      tags: ['LG OLED55B8SLB', 'телевизоры', 'tv', 'телевизор', 'тв', 'lg', 'oled'],
      tips: ['Самая распространенная ошибка тех, кто хочет купить современный телевизор – концентрация на каких-то технических характеристиках и новомодных функциях без четкого понимания фундаментальных принципов.','Обычный ли это эфир с упором на новости и развлекательные телепередачи, или, в основном, предпочитаете спорт. Возможно, берете голубой экран для просмотра фильмов в отличном качестве или планируете использовать его как монитор для игр или работы с графикой? Конечно телевизор нужен для всего – но нужно понять, что для Вас важнее, и в чем можно пойти на компромисс','Насколько светлое у Вас помещение, какое время суток основное для просмотра домашнего экрана, любите ли смотреть ночью без света, при просмотре находится ли вся семья строго перед экраном или кто-то будет сидеть сбоку, будет ли телевизор находится на уровне глаз при просмотре или на какой-то высокой тумбе без возможности наклона.'],
    }]
  }
};

export default app = (state = appState, action) => {
    switch (action.type) {
      case types.APP_LOADED:
        return state = Object.assign({}, state, {loaded: true});
      break;
      case 'ADD_TO_CART':
        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.concat(action.payload),
            openBillsFirst: false
          }
        }
      break;
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.filter((el) => {return el.itemId != action.payload.itemId}),
            openBillsFirst: false
          }
        }
      break;
      case 'ADD_TO_LIST':
        return {
          ...state,
          list: {
            ...state.list,
            items: state.list.items.concat({itemId: action.payload.itemId, type: action.payload.type})
          }
        }
      break;
      case 'REMOVE_FROM_LIST':
        return {
          ...state,
          list: {
            ...state.list,
            items: state.list.items.filter((el) => {return el.itemId != action.payload.itemId})
          }
        }
      break;
      case 'ADD_TO_RESULT':
        return {
          ...state,
          detail_page: {
            itemId: action.payload.itemId
          }
        }
      break;
      case 'SUCCESS_PAY': {
        let sum = 0;
        let items = [];
        let tempitem = {};
        for (let i = 0; i < state.cart.items.length; i++) {
          for( let j = 0; j < state.shop.items.length; j++) {
            if (parseInt(state.shop.items[j].id) == parseInt(state.cart.items[i].itemId)) {
              tempitem = state.shop.items[j];
              sum += parseInt(state.shop.items[j].cost.replace(' ', ''));
            }
          }
          
          items.push({
            itemId: state.cart.items[i].itemId,
            name: tempitem.name,
            cost: tempitem.cost
          })
        }
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [],
            bills: state.cart.bills.concat({
              sum: sum,
              items: items,
              status: 'Оплачено',
            }),
            openBillsFirst: true
          }
        }
      }
      break;
      case 'ADD_TAGS':
        return {
          ...state,
          tags: action.payload.tags,
        }
      break;
      case 'SEND_USER_MESSAGE':
        let now = new Date();
        let hour = now.getHours();
        let min = now.getMinutes();
        min = min < 10 ? '0' + min : min;
        let formatted = hour+':'+min; 
        return {
          ...state,
          chat: {
            ...state.chat,
            items: state.chat.items.concat({
              id: state.chat.items.length + 1,
              type: 'user',
              text: action.payload.text,
              time: formatted,
            })
          }
        }
      break;
      case 'SEND_BOT_MESSAGE':
        let now1 = new Date();
        let hour1 = now1.getHours();
        let min1 = now1.getMinutes();
        min1 = min1 < 10 ? '0' + min1 : min1;
        let formatted1 = hour1+':'+min1; 
        return {
          ...state,
          chat: {
            ...state.chat,
            items: state.chat.items.concat({
              id: state.chat.items.length + 1,
              type: 'bot',
              text: action.payload.text,
              time: formatted1,
              variants: action.payload.variants
            })
          }
        }
      break;

      

      default:
          return state;
    }
};