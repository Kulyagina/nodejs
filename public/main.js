const toCurrency = (price) => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency',
        maximumFractionDigits: 0,
    }).format(price)
}

document.querySelectorAll('.price').forEach((node) => {
    node.textContent = toCurrency(node.textContent)
})

document.querySelectorAll('.descr-small')
    .forEach((node) => {
        node.textContent = node.textContent.substr(0, 20).concat('...')
    })


const $cart = document.querySelector('#cart')
if ($cart) {
    $cart.addEventListener('click', (event) => {
        if (event.target.classList.contains('ajax-remove')) {
            const id = event.target.dataset.id

            fetch('/cart/remove/' + id, {
                method: 'delete',
            })
                .then((res) => res.json())
                .then((cart) => {
                    if (cart.goodses.length) {
                        const html = cart.goodses
                            .map((c) => {
                                return `
                     <tr>
                     <td>${c.title}</td>
                        <td>${c.count}</td>
                        <td class="price">${c.price}</td>
                        <td class="price mult">${c.count * c.price}</td>
                        <td>
                           <button class="uk-button-small uk-button-danger ajax-remove" data-id="${
                                    c._id
                                }">Удалить</button>
                        </td>
                     </tr>
                     `
                            })
                            .join('')
                        $cart.querySelector('tbody').innerHTML = html
                        let cartSum = 0
                        $cart.querySelectorAll('.mult').forEach((node) => {
                            cartSum += +node.innerHTML
                        })
                        document.querySelector('.sum').innerHTML = cartSum
                        $cart.querySelectorAll('.price').forEach((node) => {
                            node.textContent = toCurrency(node.textContent)
                        })

                    } else {
                        $cart.innerHTML = '<p>Корзина пуста</p>'
                        document.querySelector('.sum').innerHTML = toCurrency("0")
                    }
                })
        }
    })
}


const $goodses = document.querySelector('.catalog-items')
if ($goodses) {
    $goodses.addEventListener('click', (event) => {
        if (event.target.classList.contains('ajax-add')) {
            const id = event.target.dataset.id
            fetch('/cart/add/' + id, {
                method: 'post',
            }).then((res) => {
                console.log(res)
                UIkit.notification('Товар добавлен', 'success')
            })
        }
    })
}


