const form = document.querySelector("form");
const loc = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(loc.value);
  fetch(`/weather?address=${loc.value}`).then((response) => {
    messageOne.innerHTML = "<h2>Loading...</h2>";
    messageOne.textContent = "";
    messageTwo.textContent = "";
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = Number(data.forcast).toFixed(2) + " degree";
      }
    })
  })
})