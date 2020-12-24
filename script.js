let cart = [];
let itemQt = 1;

//Listagem das Pizzas

pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.models .pizza_item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza_sizes').setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza_item-img').style.backgroundImage = `url(${item.img})`;
    pizzaItem.querySelector('.pizza_info-name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza_info-desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza_price').innerHTML = item.price[2].toFixed(2).replace('.',',');
    

    document.querySelector('.pizza_area').append(pizzaItem);
})

document.querySelectorAll('.size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        let key = size.getAttribute('data-key');
        let pizzaKey = size.parentNode.getAttribute('data-key');
        let prices = pizzaJson[pizzaKey].price[key];
        let pizzaArea = size.parentNode.nextElementSibling;

        size.parentNode.querySelector('.size.selected-size').classList.remove('selected-size');
        e.target.classList.add('selected-size');
        
        pizzaArea.innerHTML = prices.toFixed(2).replace('.',',');
    })
})

document.querySelectorAll('.pizza_add-btn').forEach((item, index)=>{
    item.addEventListener('click', (e)=>{
        e.preventDefault();
        let pizzaKey = item.parentNode.getAttribute('data-key');
        let size = parseInt(item.parentNode.querySelector('.size.selected-size').getAttribute('data-key'));
        let identifier = pizzaJson[pizzaKey].id+'@'+size;
        let key = cart.findIndex((item)=> item.identifier == identifier);
        let sizeName;
        switch(size){
            case 0:
                sizeName = 'P';
                break; 
            case 1:
                sizeName = 'M';
                break; 
            case 2:
                sizeName = 'G';
                break;
        }
        
        if(key > -1){
            cart[key].qt += itemQt; 
        }else{
            cart.push({
                identifier,
                img: pizzaJson[pizzaKey].img,
                name: pizzaJson[pizzaKey].name,
                sizeName,
                qt: itemQt,
                price: pizzaJson[pizzaKey].price[size]
            });
        }
        document.querySelector('.cart-openner span').innerHTML = cart.length;
    })
})

function updateCart(){
    document.querySelector('.cart').innerHTML = '';
    
    for(let i=0; i<cart.length; i++){
        
        let cartItem = document.querySelector('.models .cart_item').cloneNode(true);
        let item = cart[i];
        console.log(item);
        document.querySelector('.cart_item-img').style.backgroundImage = `url(${item.img})`;
        document.querySelector('.cart_item-namensize').innerHTML = `${item.name} (${item.sizeName})`;
        document.querySelector('.cart_item-qt').innerHTML = item.qt;
        document.querySelector('.cart_item-price').innerHTML = item.price;

        document.querySelector('.cart').append(cartItem);
    };
}


    
        

