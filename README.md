# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Типы данных

type price = number | null - товар может быт с ценой, так и без нее (0)
type payment = 'cash' | 'card' - способы оплаты: карта или наличные

## Описание данных (интерфейсы)

Интерфейс карточки товара IProduct 

  id: string; - id карточки товара
  title: string; - название карточки товара
  category: string; - категория товара 
  description: string; - описание товара
  price: price; - цена товара (может быть с нулевым значением, так как есть бесценные товары)
  image: string; - изображение товара

  Интерфейс заказа IOrder

  payment: string; - способ оплаты
  mail: string; - электронный адрес
  phone: string; - телефон
  address: string; - адрес
  total: number; - итоговая сумма заказа
  items: string[] - массив товаров в заказе

  Интерфейс корзины IBasket 
  items: string[]; - массив товаро в корзине
  total: price; - итоговая стоимость (если в корзину добавлены только товары из категории "Бесценно" - стоимость 0)

Интерфейс результата заказа IOrderResult 
  id: string;
  total: price;


## Модели данных (классы)
