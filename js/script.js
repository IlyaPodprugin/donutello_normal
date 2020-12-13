const products = [

    {
        id: 1,
        'name': 'Classic donut',
        'price': 120,
        'img': 'img/product-img.png',
        'extra': [
            {
                'name': 'Мёд',
                'price': 20,
            },
            {
                'name': 'Варёная сгущёнка',
                'price': 10,
            },
            {
                'name': 'Ванильный крем',
                'price': 15,
            },
            {
                'name': 'Яблочный джем',
                'price': 25,
            }
        ]
    },

    {
        id: 2,
        'name': 'Classic donut',
        'price': 120,
        'img': 'img/product-img.png',
        'extra': [
            {
                'name': 'Мёд',
                'price': 20,
            },
            {
                'name': 'Варёная сгущёнка',
                'price': 10,
            },
            {
                'name': 'Ванильный крем',
                'price': 15,
            },
            {
                'name': 'Яблочный джем',
                'price': 25,
            }
        ]
    },

    {
        id: 3,
        'name': 'Classic donut',
        'price': 120,
        'img': 'img/product-img.png',
        'extra': [
            {
                'name': 'Мёд',
                'price': 20,
            },
            {
                'name': 'Варёная сгущёнка',
                'price': 10,
            },
            {
                'name': 'Ванильный крем',
                'price': 15,
            },
            {
                'name': 'Яблочный джем',
                'price': 25,
            }
        ]
    }
]

let cart = []


function generateProducts() {
    const container = $('.products .container')

    for (const product of products) {
        container.append(`
        <div class="product">
            <img src="${product.img}" alt="">
            <div class="product__row product__row_mbottom">
                <h3 class="product__title">${product.name}</h3>
                <p class="product__price" data-base-price="${product.price}">${product.price}₽</p>
            </div>
            <div class="product__row">
                <div class="product__counter">
                    <button class="product__counter-btn dec">-</button>
                    <span class="product__counter-quantity">1</span>
                    <button class="product__counter-btn inc">+</button>
                </div>
                <select class="product__extra">
                    <option selected value="0">Без добавки</option>
                    ${product.extra.map((option) => {
            return `<option value="${option.price}">${option.name}</option>`
        })}                    
                </select>
                <button class="product__buy" data-product-id="${product.id}">В корзину</button>
            </div>
        </div>
        `)
    }
}

function addToCart(id, quantity) {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    const sameProductInCart = cart.find((product) => product.id === id);
    
    if (sameProductInCart) {
        cart = cart.map((c) => {
            if (c.id === id) {
                c.quantity = c.quantity + quantity;
            }
            console.log(c)
            return c;
        })
    } else {
        const item = products.find((obj) => obj.id === id)
        cart.push(
            {
                id: id,
                quantity: quantity,
                title: item.name,
                price: item.price,
                img: item.img
            }
        )
    }

    sessionStorage.setItem('cart', JSON.stringify(cart))

    console.log(cart)
}

$(document).ready(function () {
    generateProducts()

    if (sessionStorage.getItem('cart') === null) {
        sessionStorage.setItem('cart', JSON.stringify([]))
    }

    $('.product__counter-btn').on('click', function () {
        const product = $(this).closest('.product')
        const quantity = product.find('.product__counter-quantity')
        const quantityInt = +quantity.text();
        const price = product.find('.product__price')
        const priceInt = +price.text().slice(0, -1)
        const basePrice = priceInt / quantityInt

        if ($(this).hasClass('inc')) {
            quantity.text(quantityInt + 1)
            price.text(`${priceInt + basePrice}₽`)
        } else if ($(this).hasClass('dec') && quantity.text() != 1) {
            quantity.text(quantityInt - 1)
            price.text(`${priceInt - basePrice}₽`)
        }
    })

    $('.product__extra').on('change', function () {
        const product = $(this).closest('.product')
        const quantityInt = +product.find('.product__counter-quantity').text()
        const price = product.find('.product__price')
        const basePrice = +price.data('base-price')
        const extraVal = +$(this).val();
        price.text(`${(basePrice + extraVal) * quantityInt}₽`)
    })

    $('.product__buy').on('click', function() {
        addToCart($(this).data('product-id'), +$(this).closest('.product').find('.product__counter-quantity').text());
    })
})
