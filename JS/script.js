let choose_img_btn = document.querySelector(".choose_img button");
let choose_Input = document.querySelector(".choose_img input");
let imgSrc = document.querySelector(".view_img img");
let filter_buttons = document.querySelectorAll(".icon_room button");
let slider = document.querySelector(".slider input")
let filter_name = document.querySelector(".filter_info .name")
let slider_value = document.querySelector(".filter_info .value")
let rotate_btns = document.querySelectorAll('.icon_room1 button')
let reset = document.querySelector(".reset");
let save = document.querySelector(".save")

let brightness = 100,contrast = 100,saturate = 100 , invert = 0,blur= 0,
rotate = 0, flip_x= 1,flip_y= 1;


choose_img_btn.addEventListener("click",()=>{
    choose_Input.click()
})

choose_Input.addEventListener('change', ()=>{
    // console.log(choose_Input.files[0]);
    let file = choose_Input.files[0];
    if (!file) return; 
    imgSrc.src = URL.createObjectURL(file);
    imgSrc.addEventListener('load',()=>{
        document.querySelector(".container").classList.remove("disabled");
    });
});

filter_buttons.forEach((element)=>{
    element.addEventListener('click',()=>{
        // console.log(element);
        document.querySelector(".active").classList.remove("active")
        element.classList.add('active')
        filter_name.innerText = element.id;

        if(element.id === "brightness"){
            // console.log("haan ok");
            slider.max = "200";
            slider.value = brightness
            slider_value.innerText = `${brightness}`;
        }
        else if (element === "contrast") {
            slider.max = "200";
            slider.value = contrast
            slider_value.innerText = `${contrast}`;
        }
        else if (element === "saturate") {
            slider.max = "200";
            slider.value = saturate
            slider_value.innerText = `${saturate}`;
        }
        else if (element === "invert") {
            slider.max = "200";
            slider.value = invert
            slider_value.innerText = `${invert}`;
        }
        else if (element === "blur") {
            slider.max = "0.1";
            slider.value = blur
            slider_value.innerText = `${blur}`;
        }

        
    });
});



slider.addEventListener('input', ()=>{
    slider_value.innerText = `${slider.value}%`;
    let sliderState = document.querySelector(".icon_room .active");
    if(sliderState.id === "brightness"){
        brightness = slider.value;
    }
    else if (sliderState.id == "contrast") {
        contrast = slider.value;
    }
    else if (sliderState.id == "saturate") {
        saturate = slider.value;
    }
    else if (sliderState.id == "invert") {
        invert = slider.value;
    }
    else if (sliderState.id == "blur") {
        blur = slider.value;
    }
    imgSrc.style.filter =`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px) ` ;
})

rotate_btns.forEach((element)=>{
    element.addEventListener("click",()=>{
        console.log(element);
        if(element.id === "rotate-left"){
        rotate -=90;
        }
        else if(element.id === "rotate-right"){
            rotate +=90;
        }
        else if(element.id === "flip_x"){
            flip_x = flip_x === 1 ? -1:1;
        }
        else if(element.id === "flip_y"){
            flip_y = flip_y === 1 ? -1:1;
        }
        imgSrc.style.transform = `rotate(${rotate}deg)  scale(${flip_x}, ${flip_y})`;
    })
})

reset.addEventListener("click", ()=>{
    brightness = "100"
    saturate = "100";
    contrast ="100";
    invert = "0";
    blur = "0";
    rotate = "0";
    flip_x = "1";
    flip_y = "1";

    imgSrc.style.filter =`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px) ` ;


    imgSrc.style.transform = `rotate(${rotate}deg)  scale(${flip_x}, ${flip_y})`;
})


save.addEventListener('click',()=>{
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = imgSrc.naturalWidth;
    canvas.width = imgSrc.naturalHeight;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px) ` ;
    ctx.translate(canvas.width / 2, canvas.height / 2 );
    ctx.scale(flip_x,flip_y);
    ctx.drawImage(imgSrc , -canvas.width / 2, -canvas.height / 2, canvas.width,canvas.height);

    let link = document.createElement('a');
    link.download = "img.png";
    link.href = canvas.toDataURL();
    link.click();
});