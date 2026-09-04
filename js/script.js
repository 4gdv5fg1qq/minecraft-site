    function changeImage() {
    let img = document.getElementById('img_cob');
    let current = parseInt(img.getAttribute('data-current')) || 0;

    current++;

    if(current > 10) {
    current = 0;

    if(game.pickaxelvl === 1) game.cobCounter += 1;
    else if(game.pickaxelvl === 2) game.cobCounter +=2;
    else if(game.pickaxelvl === 3) game.cobCounter +=3;
    else if(game.pickaxelvl === 4) game.cobCounter +=5;
    else if(game.pickaxelvl === 5) game.cobCounter +=7;
    else if(game.pickaxelvl === 6) game.cobCounter +=8;
    else if(game.pickaxelvl === 7) game.cobCounter +=10;
    game.updateCounter();
    }

    img.src = 'images/bul' + current + '.png';
    img.setAttribute('data-current', current);
}
// Открытие и закрытие интерфейса 
let isOpen = false;

function openSell(){
    const int = document.getElementById('interface');
    const but = document.getElementById('but_open');
    const img_but = document.getElementById('img_but');

    if(isOpen){
        //ЗАКРЫВАЕМ
        int.style.transform = "translateY(150%)";
        but.style.transform = "translateY(0)";
        img_but.src = ('images/button_open.png');
        isOpen = false;
    } else {
        //ОТКРЫВАЕМ
        int.style.transform = "translateY(0)";
        but.style.transform = "translateY(-550%)";
        img_but.src = 'images/button_close.png';
        isOpen = true;
    }
}

//Покупка предметов
const game = {
    cobCounter: 0,
    pickaxelvl: 1,
    worldlevel: 1,

    buyItem(price, level){
        if (level <= this.pickaxelvl) {
            alert('У тебя уже есть лучшая кирка! Текущий уровень: ' + this.pickaxelvl);
            return false;
        }
        if (this.cobCounter >= price){
            this.cobCounter -= price;
            this.pickaxelvl = level;
            this.BuyPickaxe();
            this.updateCounter();
            this.levelup();
            return true;
        } else{
            alert('Недостаточно булыжника!');
            return false;
        }
    },

    levelupgrade(price){
        if(this.cobCounter >= price){
            this.cobCounter -=price;
            this.worldlevel++;
            this.updateCounter();
            // this.updateworld();
        } else {
            alert("Недостаточно булыжника!");
        }
    },

    updateCounter(){
        document.getElementById('counter').textContent = this.cobCounter;
    },
    
    levelup(){
        document.getElementById('lvl').textContent = this.pickaxelvl;
    },

    BuyPickaxe(){

        document.body.classList.remove('pickaxe_lvl1', 'pickaxe_lvl2', 'pickaxe_lvl3', 'pickaxe_lvl4');
        console.log(`Куплена новая кирка${this.pickaxelvl} уровня`);

        document.body.classList.add(`pickaxe_lvl${this.pickaxelvl}`);
    }
}