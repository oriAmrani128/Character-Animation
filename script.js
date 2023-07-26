const addButton = document.querySelector(".add");
const animationWindow = document.querySelector(".animation_window");
const box = animationWindow.getBoundingClientRect();
let focusImageIndex = -1;
const images = [];
addButton.addEventListener("click", function () {
  const input = document.createElement("input");
  input.type = "file";
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const image = document.createElement("img");
      image.src = e.target.result;
      image.onload = (e) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("imageWrapper");
        const randX = Math.random() * (box.width - 100);
        const randY = Math.random() * (box.height - 100);
        imageWrapper.style.left = randX + "px";
        imageWrapper.style.top = randY + "px";
        imageWrapper.style.backgroundImage = `url(${image.src})`;
        animationWindow.appendChild(imageWrapper);
        images.push(imageWrapper);
        setFocusImage(images.length - 1);

        imageWrapper.addEventListener("click", function (e) {
          if (focusImageIndex >= 0) {
            images[focusImageIndex].classList.remove("focused");
          }
          imageWrapper.classList.add("focused");
          focusImageIndex = images.indexOf(imageWrapper);
        });
      };
    };
  };
  input.click();
});

function setFocusImage(index) {
  focusImageIndex = index;
  images.forEach((image, i) => {
    image.classList.toggle("focused", i === focusImageIndex);
  });
}
document.addEventListener("keydown", function (e) {
  if (focusImageIndex < 0) return;
  let selectedImage = images[focusImageIndex];
  switch (e.key) {
    case "ArrowUp":
      selectedImage.style.top = Math.max(selectedImage.offsetTop - 10, 0) + "px";
      break;
    case "ArrowDown":
      selectedImage.style.top =
        Math.min(selectedImage.offsetTop + 10, box.height - selectedImage.offsetHeight) + "px";
      break;
    case "ArrowLeft":
      selectedImage.style.left = Math.max(selectedImage.offsetLeft - 10, 0) + "px";
      break;

    case "ArrowRight":
      selectedImage.style.left =
        Math.min(selectedImage.offsetLeft + 10, box.width - selectedImage.offsetWidth) + "px";
      break;
  }
});
