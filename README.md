Мобильное приложение Beagle
================


## Запуск проекта локально
 1. Перенести к себе проект с ветки `dev`.
 2. Установка пакетов и зависимостей
     `npm i`
 3. Запуск в режиме разработки
     `expo start`

Настоятельно рекомендуется использовать при установке пакетов флаг `--save-dev` или `--save`

- - -

## Разработка

Разработка ведется на react-native. 

Все гайды, компоненты, апи разобраны в [оф доках](https://facebook.github.io/react-native/docs/tutorial)

Для ускорения разработки и отладки можно использовать локальный туннель из обертки Metro (Запускается при `expo start`, достаточно переключить флажек в LAN,

подсоединить устройство для отладки к домашней сети и отсканить QR код)


- - -


## Запуск проекта для тестирования 

** Страница проекта на [Expo](https://expo.io/) **

** Expo приложение **

 1. Необходимо скачать клиент Expo для девайса [IOs](https://itunes.apple.com/app/apple-store/id982107779) , [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)
 2. Авторизоваться под учетной записью
 3. Найти в списке Expo приложений `Beagle-react-app`, запустить.

** Browserstack **

 1. Появится возможность после первой более менее адекватной сборки
 
- - -


## Порядок выпуска новых версий
 В конце каждого рабочего дня обновляется версия для тестирования, путем публикации через интерфейс разработчика `Publish or republish project…`
