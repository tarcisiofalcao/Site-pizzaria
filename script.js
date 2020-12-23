//Listagem das Pizzas

pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.models .pizza_item').cloneNode(true);
    let pizzaSize = document.querySelectorAll('.size');

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza_sizes').setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza_item-img').style.backgroundImage = `url(${item.img})`;
    pizzaItem.querySelector('.pizza_info-name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza_info-desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza_price').innerHTML = item.price[2];
    

    document.querySelector('.pizza_area').append(pizzaItem);
})

document.querySelectorAll('.size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        let key = size.getAttribute('data-key');
        let pizzaKey = size.parentNode.getAttribute('data-key');
        let prices = pizzaJson[pizzaKey].price[key];
        let pizzaArea = size.parentNode.nextElementSibling;
        
        pizzaArea.innerHTML = prices;
    })
})