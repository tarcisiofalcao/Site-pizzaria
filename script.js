let cart = [];
let itemQt = 1;
//--------------------------------------------------------------------------------------------------------
//listando as pizzas e inserindo ao documento
//--------------------------------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------------------------
//adicionando pizzas ao carrinho
//--------------------------------------------------------------------------------------------------------
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
        updateCart()
    })
})
//--------------------------------------------------------------------------------------------------------
//atualizando o carrinho
//--------------------------------------------------------------------------------------------------------
function updateCart(){
    document.querySelector('.cart').innerHTML = '';
    document.querySelector('.cart-openner span').innerHTML = cart.length;
    let subTotal = 0;
    for(let i in cart){
        let cartItem = document.querySelector('.models .cart_item').cloneNode(true);
        cartItem.querySelector('.cart_item-img').style.backgroundImage = `url(${cart[i].img})`;
        cartItem.querySelector('.cart_item-namensize').innerHTML = `${cart[i].name} (${cart[i].sizeName})`;
        cartItem.querySelector('.cart_item-qt').innerHTML = cart[i].qt;

        let itemTotalPrice = cart[i].price*cart[i].qt;
        subTotal += itemTotalPrice; 
        cartItem.querySelector('.cart_item-price').innerHTML = itemTotalPrice.toFixed(2).replace('.',',');
        document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2).replace('.',',')}`;
        //adicionando funcionalidade ao btn minus...
        cartItem.querySelector('.cart_item-minusBtn').addEventListener('click', (e)=>{
            if(cart[i].qt > 1){
                cart[i].qt--
            }else{
                cart.splice(i, 1);
                subTotal = 0;
            }
            
            updateCart();
        });
        //adicionando funcionalidade ao btn minus...
        cartItem.querySelector('.cart_item-plusBtn').addEventListener('click', (e)=>{
            cart[i].qt++
            updateCart();
        });
        document.querySelector('.cart').append(cartItem);
    }       
}
document.querySelector('.cart-openner').addEventListener('click', ()=>{
    
})