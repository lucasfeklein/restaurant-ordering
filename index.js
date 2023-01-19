import { menuArray } from '/data.js'
let orderArray = []
let sum = 0
const buyerForm = document.getElementById('buyer-form')


document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addedToCart()
        getOrder(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    } else if(e.target.id === 'complete-btn'){
        document.getElementById('form-container').style.display = "block"
    } else if(e.target.id ==='pay-btn') {
        e.preventDefault()
        payed()
    }
})

function addedToCart(){
    const popUp = document.getElementById('pop-up')
    popUp.style.display = 'block'
    setTimeout(function(){
        popUp.style.display = 'none'
    }, 1000)
}

function getOrder(id){
    const getOrderObj = menuArray.filter(function(menu){
        return menu.id == id
    })[0]
    orderArray.unshift(getOrderObj)
    renderOrder()
}

function removeItem(id){
    const index = orderArray.map(e => e.id).indexOf(Number(id));
    sum -= orderArray[index].price
    orderArray.splice(index, 1)
    renderOrder()
}

function renderOrder(){
    let orderHtml = ''
    sum = 0
    document.getElementById('food-choice').innerHTML = ''
    document.getElementById('total-container').style.borderTop = 'none'
    document.getElementById('order-title').innerHTML = ''
    document.getElementById('total-container').innerHTML = ''
    document.getElementById('complete-container').innerHTML = ''
    
    if(orderArray.length > 0){
        orderArray.forEach(function(order){
            orderHtml += `
            <div class="order-menu">
                <p class="food">${order.name}</p>
                <button class="remove-btn" data-remove="${order.id}">remove</button>
                <p class="price order-price">$${order.price}</p>
            </div>
            `
            sum += order.price
        })
        document.getElementById('order-title').innerHTML = `
        <p class="order-title">Your order</p>
        `
        document.getElementById('food-choice').innerHTML += orderHtml
        
        document.getElementById('total-container').innerHTML = `
        <p class="total-price">Total price:</p>
        <p class="price order-price">$${sum}</p>
        `
        
        document.getElementById('total-container').style.borderTop = '2px solid #393333'
        
        document.getElementById('complete-container').innerHTML = `
        <button class="complete-btn" id="complete-btn">Complete order</button>
        `  
    }
}

function payed(){
    
    document.getElementById('form-container').style.display = "none"
    const buyerData = new FormData(buyerForm)
    document.getElementById('order-container').innerHTML = `
    <p class="thanks">Thanks, ${buyerData.get('buyerName')}! your order is on its way!</p>    
    `
}

function render(){
    document.getElementById('food-menu').innerHTML = getFoodHtml()
}

function getFoodHtml(){
    let foodHtml = ''
        
    menuArray.forEach(function(menu){
        foodHtml += `
        <div class="container">
                    <span class="emoji">${menu.emoji}</span>
                    <div>
                        <p class="food">${menu.name}</p>
                        <p class="ingredients">${menu.ingredients}</p>
                        <p class="price">$${menu.price}</p>
                    </div>
                    <button class="add-food" data-add="${menu.id}">+</button>
        </div>
        `
    })
    return foodHtml
}



render()